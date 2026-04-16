declare module 'com.blamejared.crafttweaker.api.action.base' {
  import { Logger } from 'org.apache.logging.log4j';
  import { IScriptLoadSource, IScriptLoader } from 'com.blamejared.crafttweaker.api.zencode';
  import { CodePosition } from 'org.openzen.zencode.shared';

  class IAction {
    apply(): void;
    assertLoader(loader: IScriptLoader, logger: Logger): boolean;
    describe(): string;
    get declaredScriptPosition(): CodePosition;
    logger(): Logger;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    systemName(): string;
    validate(logger: Logger): boolean;
  }


  interface IRuntimeAction extends IAction {}
  class IRuntimeAction extends IAction {
  }


  interface IUndoableAction extends IRuntimeAction {}
  class IUndoableAction extends IRuntimeAction {
    describeUndo(): string;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.block' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Block } from 'net.minecraft.world.level.block';
  import { Consumer, Function } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionSetBlockProperty<T = any> extends IUndoableAction, CraftTweakerAction {}
  class ActionSetBlockProperty<T = any> extends IUndoableAction {
    constructor(block: Block, propertyName: string, newValue: T, oldValue: T, valueSetter: Consumer<T>);

    constructor(block: Block, propertyName: string, newValue: T, oldValue: T, valueSetter: Consumer<T>, valueNameGetter: Function<T, string>);

    constructor(blockState: BlockState, propertyName: string, newValue: T, oldValue: T, valueSetter: Consumer<T>, valueNameGetter: Function<T, string>);

    constructor(blockState: BlockState, propertyName: string, newValue: T, oldValue: T, valueSetter: Consumer<T>);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    get targetCommandString(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.entity' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Predicate } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { INameTagFunction } from 'com.blamejared.crafttweaker.api.entity';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionSetNameTag extends IUndoableAction, CraftTweakerAction {}
  class ActionSetNameTag extends IUndoableAction {
    constructor(predicate: Predicate<Entity>, functionParameter: INameTagFunction);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.event' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { TypeToken } from 'com.google.common.reflect';
  import { Consumer, BiFunction } from 'java.util.function';
  import { IEventBus, IHandlerToken } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionRegisterEvent<T = any> extends IUndoableAction, CraftTweakerAction {}
  class ActionRegisterEvent<T = any> extends IUndoableAction {
    apply(): void;
    describe(): string;
    describeUndo(): string;
    static of<T>(token: TypeToken<T>, consumer: Consumer<T>, registrationFunction: BiFunction<IEventBus<T>, Consumer<T>, IHandlerToken<T>>): ActionRegisterEvent<T>;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.internal' {
  import { IAction } from 'com.blamejared.crafttweaker.api.action.base';

  interface CraftTweakerAction extends IAction {}
  class CraftTweakerAction extends IAction {
    constructor();
    systemName(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.item' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { RecipeType } from 'net.minecraft.world.item.crafting';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';
  import { Item } from 'net.minecraft.world.item';
  import { DataComponentType } from 'net.minecraft.core.component';

  interface ActionSetBurnTime extends IUndoableAction, CraftTweakerAction {}
  class ActionSetBurnTime extends IUndoableAction {
    constructor(ingredient: IIngredient, newBurnTime: number);

    constructor(ingredient: IIngredient, newBurnTime: number, type: RecipeType<any>);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }


  interface ActionSetItemProperty<T = any> extends IUndoableAction, CraftTweakerAction {}
  class ActionSetItemProperty<T = any> extends IUndoableAction {
    constructor(item: Item, component: DataComponentType<T>, newValue: T);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.item.tooltip' {
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipFunction } from 'com.blamejared.crafttweaker.api.item.tooltip';
  import { Pattern } from 'java.util.regex';
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { LinkedList } from 'java.util';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionAddShiftedTooltip extends ActionTooltipBase {}
  class ActionAddShiftedTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, content: Component, showMessage: Component);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionAddTooltip extends ActionTooltipBase {}
  class ActionAddTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, content: Component);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionClearTooltip extends ActionTooltipBase {}
  class ActionClearTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, leaveName: boolean);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionModifyShiftedTooltip extends ActionTooltipBase {}
  class ActionModifyShiftedTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, shiftedFunction: ITooltipFunction, unshiftedFunction: ITooltipFunction);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionModifyTooltip extends ActionTooltipBase {}
  class ActionModifyTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, functionParameter: ITooltipFunction);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionRemoveRegexTooltip extends ActionTooltipBase {}
  class ActionRemoveRegexTooltip extends ActionTooltipBase {
    constructor(stack: IIngredient, regex: Pattern);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionTooltipBase extends IUndoableAction, CraftTweakerAction {}
  class ActionTooltipBase extends IUndoableAction {
    constructor(stack: IIngredient);
    get tooltip(): LinkedList<ITooltipFunction>;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.loot' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IRuntimeAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier, Predicate } from 'java.util.function';
  import { ILootModifier } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { Map } from 'java.util';
  import { Entry } from 'Map';

  interface ActionLootModifier extends IRuntimeAction, CraftTweakerAction {}
  class ActionLootModifier extends IRuntimeAction {
    validate(logger: Logger): boolean;
  }


  interface ActionRegisterLootModifier extends ActionLootModifier {}
  class ActionRegisterLootModifier extends ActionLootModifier {
    constructor(name: ResourceLocation, modifierCreator: Supplier<ILootModifier>, mapGetter: Supplier<Map<ResourceLocation, ILootModifier>>);
    apply(): void;
    describe(): string;
    validate(logger: Logger): boolean;
  }


  interface ActionRemoveLootModifier extends ActionLootModifier {}
  class ActionRemoveLootModifier extends ActionLootModifier {
    constructor(description: string, predicate: Predicate<Entry<ResourceLocation, ILootModifier>>, mapGetter: Supplier<Map<ResourceLocation, ILootModifier>>);
    apply(): void;
    describe(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.misc' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { InteractionMap } from 'CauldronInteraction';
  import { Item } from 'net.minecraft.world.item';
  import { CauldronInteraction } from 'net.minecraft.core.cauldron';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionSetCauldronInteraction extends IUndoableAction, CraftTweakerAction {}
  class ActionSetCauldronInteraction extends IUndoableAction {
    constructor(map: InteractionMap, key: Item, interaction: CauldronInteraction);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
  }


  interface ActionSetCompostable extends IUndoableAction, CraftTweakerAction {}
  class ActionSetCompostable extends IUndoableAction {
    constructor(stack: IItemStack, newValue: number);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.network' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { CTNetworkReceiver } from 'com.blamejared.crafttweaker.api.network';
  import { IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionAddDataReceiver extends IUndoableAction, CraftTweakerAction {}
  class ActionAddDataReceiver extends IUndoableAction {
    constructor(id: string, receiver: CTNetworkReceiver);
    apply(): void;
    describe(): string;
    describeUndo(): string;
    shouldApplyOn(source: IScriptLoadSource, logger: Logger): boolean;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.recipe' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RecipeHolder, RecipeType } from 'net.minecraft.world.item.crafting';
  import { Function, Predicate } from 'java.util.function';
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IRuntimeAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { RecipeList } from 'com.blamejared.crafttweaker.api.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Logger } from 'org.apache.logging.log4j';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';

  interface ActionAddRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionAddRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(recipeManager: IRecipeManager<T>, holder: RecipeHolder<T>, subType: string);

    constructor(recipeManager: IRecipeManager<T>, holder: RecipeHolder<T>);
    apply(): void;
    describe(): string;
    outputDescriber(describeOutputsFunction: Function<RecipeHolder<T>, string>): ActionAddRecipe<T>;
  }


  interface ActionRecipeBase<T extends Recipe<any> = any> extends IRuntimeAction, CraftTweakerAction {}
  class ActionRecipeBase<T extends Recipe<any> = any> extends IRuntimeAction {
    constructor(manager: IRecipeManager<T>);
    get manager(): IRecipeManager<T>;
    get recipeMutator(): RecipeList<T>;
    get recipeType(): RecipeType<T>;
    get recipeTypeName(): ResourceLocation;
  }


  interface ActionRemoveAll<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveAll<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>);
    apply(): void;
    describe(): string;
  }


  interface ActionRemoveRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveRecipe<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>, removePredicate: Predicate<RecipeHolder<T>>);

    constructor(manager: IRecipeManager<T>, removePredicate: Predicate<RecipeHolder<T>>, describeFunction: Function<ActionRecipeBase<T>, string>);
    apply(): void;
    describe(): string;
    describeDefaultRemoval(output: CommandStringDisplayable): ActionRemoveRecipe<T>;
  }


  interface ActionRemoveRecipeByModid<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveRecipeByModid<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>, modid: string, exclude: Predicate<string>);
    apply(): void;
    describe(): string;
  }


  interface ActionRemoveRecipeByName<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveRecipeByName<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>, name: ResourceLocation);

    constructor(manager: IRecipeManager<T>, ...names: ResourceLocation[]);
    apply(): void;
    describe(): string;
    validate(logger: Logger): boolean;
  }


  interface ActionRemoveRecipeByOutput<T extends Recipe<any> = any> extends ActionRemoveRecipe<T> {}
  class ActionRemoveRecipeByOutput<T extends Recipe<any> = any> extends ActionRemoveRecipe<T> {
    constructor(manager: IRecipeManager<T>, output: IIngredient, recipe: RecipeHolder<T>);
    validate(logger: Logger): boolean;
  }


  interface ActionRemoveRecipeByOutputInput<T extends Recipe<any> = any> extends ActionRemoveRecipe<T> {}
  class ActionRemoveRecipeByOutputInput<T extends Recipe<any> = any> extends ActionRemoveRecipe<T> {
    constructor(manager: IRecipeManager<T>, output: IIngredient, input: IIngredient, holder: RecipeHolder<T>, action: ActionRecipeBase<T>);
    validate(logger: Logger): boolean;
  }


  interface ActionRemoveRecipeByRegex<T extends Recipe<any> = any> extends ActionRecipeBase<T> {}
  class ActionRemoveRecipeByRegex<T extends Recipe<any> = any> extends ActionRecipeBase<T> {
    constructor(manager: IRecipeManager<T>, regex: string, exclude: Predicate<string>);
    apply(): void;
    describe(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.recipe.generic' {
  import { Predicate, Supplier } from 'java.util.function';
  import { RecipeHolder, Recipe, RecipeInput } from 'net.minecraft.world.item.crafting';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IRuntimeAction } from 'com.blamejared.crafttweaker.api.action.base';

  interface ActionRemoveAllGenericRecipes extends ActionWholeRegistryBase {}
  class ActionRemoveAllGenericRecipes extends ActionWholeRegistryBase {
    apply(): void;
    describe(): string;
  }


  interface ActionRemoveGenericRecipe extends ActionRemoveGenericRecipeBase {}
  class ActionRemoveGenericRecipe extends ActionRemoveGenericRecipeBase {
    constructor(removePredicate: Predicate<RecipeHolder<Recipe<RecipeInput>>>);

    constructor(removePredicate: Predicate<RecipeHolder<Recipe<RecipeInput>>>, describeFunction: Supplier<string>);
    describe(): string;
  }


  interface ActionRemoveGenericRecipeBase extends ActionWholeRegistryBase {}
  class ActionRemoveGenericRecipeBase extends ActionWholeRegistryBase {
    apply(): void;
  }


  interface ActionRemoveGenericRecipeByModId extends ActionRemoveGenericRecipeBase {}
  class ActionRemoveGenericRecipeByModId extends ActionRemoveGenericRecipeBase {
    constructor(modId: string, exclude: Predicate<string>);
    describe(): string;
  }


  interface ActionRemoveGenericRecipeByName extends ActionRemoveGenericRecipeBase {}
  class ActionRemoveGenericRecipeByName extends ActionRemoveGenericRecipeBase {
    constructor(name: string);

    constructor(names: ResourceLocation[]);
    describe(): string;
  }


  interface ActionRemoveGenericRecipeByOutput extends ActionRemoveGenericRecipeBase {}
  class ActionRemoveGenericRecipeByOutput extends ActionRemoveGenericRecipeBase {
    constructor(output: IIngredient);
    describe(): string;
  }


  interface ActionRemoveGenericRecipeByRegex extends ActionRemoveGenericRecipeBase {}
  class ActionRemoveGenericRecipeByRegex extends ActionRemoveGenericRecipeBase {
    constructor(regex: string);
    describe(): string;
  }


  interface ActionWholeRegistryBase extends IRuntimeAction, CraftTweakerAction {}
  class ActionWholeRegistryBase extends IRuntimeAction {
  }

}

declare module 'com.blamejared.crafttweaker.api.action.recipe.replace' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IRuntimeAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Collection } from 'java.util';
  import { IFilteringRule, ReplacementRequest } from 'com.blamejared.crafttweaker.api.recipe.replacement';

  interface ActionBatchReplacement extends IRuntimeAction, CraftTweakerAction {}
  class ActionBatchReplacement extends IRuntimeAction {
    apply(): void;
    describe(): string;
    static of(targetingRules: Collection<IFilteringRule>, requests: Collection<ReplacementRequest<any>>): ActionBatchReplacement;
  }


  interface ActionReplaceRecipe<T extends Recipe<any> = any> extends IRuntimeAction, CraftTweakerAction {}
  class ActionReplaceRecipe<T extends Recipe<any> = any> extends IRuntimeAction {
    apply(): void;
    describe(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.tag' {
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IRuntimeAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionTag<T extends MCTag = any, U extends ITagManager<T> = any> extends IRuntimeAction, CraftTweakerAction {}
  class ActionTag<T extends MCTag = any, U extends ITagManager<T> = any> extends IRuntimeAction {
    constructor(mcTag: T);
    get type(): string;
    id(): ResourceLocation;
    manager(): U;
    mcTag(): T;
    validate(logger: Logger): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.tag.known' {
  import { ActionTag } from 'com.blamejared.crafttweaker.api.action.tag';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { KnownTagManager } from 'com.blamejared.crafttweaker.api.tag.manager.type';
  import { Collection, List } from 'java.util';
  import { Holder } from 'net.minecraft.core';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionKnownTag<T = any> extends ActionTag<KnownTag, KnownTagManager> {}
  class ActionKnownTag<T = any> extends ActionTag<KnownTag, KnownTagManager> {
    constructor(mcTag: KnownTag<T>);
    tag(): Collection<Holder<T>>;
  }


  interface ActionKnownTagAdd<T = any> extends ActionKnownTagModify<T> {}
  class ActionKnownTagAdd<T = any> extends ActionKnownTagModify<T> {
    constructor(mcTag: KnownTag<T>, values: T[]);
    apply(): void;
    describe(): string;
  }


  interface ActionKnownTagClear<T = any> extends ActionKnownTag<T> {}
  class ActionKnownTagClear<T = any> extends ActionKnownTag<T> {
    constructor(mcTag: KnownTag<T>);
    apply(): void;
    describe(): string;
  }


  interface ActionKnownTagCreate<T = any> extends ActionKnownTag<T> {}
  class ActionKnownTagCreate<T = any> extends ActionKnownTag<T> {
    constructor(theTag: KnownTag<T>);
    apply(): void;
    describe(): string;
    validate(logger: Logger): boolean;
  }


  interface ActionKnownTagModify<T = any> extends ActionKnownTag<T> {}
  class ActionKnownTagModify<T = any> extends ActionKnownTag<T> {
    constructor(mcTag: KnownTag<T>, values: T[]);
    describeValues(): string;
    validate(logger: Logger): boolean;
    values(): T[];
  }


  interface ActionKnownTagRemove<T = any> extends ActionKnownTagModify<T> {}
  class ActionKnownTagRemove<T = any> extends ActionKnownTagModify<T> {
    constructor(mcTag: KnownTag<T>, values: T[]);
    apply(): void;
    describe(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.tag.unknown' {
  import { ActionTag } from 'com.blamejared.crafttweaker.api.action.tag';
  import { UnknownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { UnknownTagManager } from 'com.blamejared.crafttweaker.api.tag.manager.type';
  import { Collection, List } from 'java.util';
  import { Holder } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Logger } from 'org.apache.logging.log4j';

  interface ActionUnknownTag extends ActionTag<UnknownTag, UnknownTagManager> {}
  class ActionUnknownTag extends ActionTag<UnknownTag, UnknownTagManager> {
    constructor(mcTag: UnknownTag);
    tag(): Collection<Holder<any>>;
  }


  interface ActionUnknownTagAdd extends ActionUnknownTagModify {}
  class ActionUnknownTagAdd extends ActionUnknownTagModify {
    constructor(mcTag: UnknownTag, values: ResourceLocation[]);
    apply(): void;
    describe(): string;
  }


  interface ActionUnknownTagClear extends ActionUnknownTag {}
  class ActionUnknownTagClear extends ActionUnknownTag {
    constructor(mcTag: UnknownTag);
    apply(): void;
    describe(): string;
  }


  interface ActionUnknownTagCreate extends ActionUnknownTag {}
  class ActionUnknownTagCreate extends ActionUnknownTag {
    constructor(theTag: UnknownTag);
    apply(): void;
    describe(): string;
    validate(logger: Logger): boolean;
  }


  interface ActionUnknownTagModify extends ActionUnknownTag {}
  class ActionUnknownTagModify extends ActionUnknownTag {
    constructor(mcTag: UnknownTag, values: ResourceLocation[]);
    describeValues(): string;
    validate(logger: Logger): boolean;
    values(): ResourceLocation[];
  }


  interface ActionUnknownTagRemove extends ActionUnknownTagModify {}
  class ActionUnknownTagRemove extends ActionUnknownTagModify {
    constructor(mcTag: UnknownTag, values: ResourceLocation[]);
    apply(): void;
    describe(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.action.villager' {
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { ItemListing } from 'VillagerTrades';
  import { List } from 'java.util';
  import { ITradeRemover } from 'com.blamejared.crafttweaker.api.villager';
  import { CraftTweakerAction } from 'com.blamejared.crafttweaker.api.action.internal';
  import { IUndoableAction } from 'com.blamejared.crafttweaker.api.action.base';

  interface ActionAddTrade extends ActionTradeBase {}
  class ActionAddTrade extends ActionTradeBase {
    constructor(profession: VillagerProfession, level: number, trade: ItemListing);
    apply(): void;
    apply(tradeList: ItemListing[]): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
    undo(tradeList: ItemListing[]): void;
  }


  interface ActionAddWanderingTrade extends ActionTradeBase {}
  class ActionAddWanderingTrade extends ActionTradeBase {
    constructor(level: number, trade: ItemListing);
    apply(): void;
    apply(tradeList: ItemListing[]): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
    undo(tradeList: ItemListing[]): void;
  }


  interface ActionRemoveTrade extends ActionTradeBase {}
  class ActionRemoveTrade extends ActionTradeBase {
    constructor(profession: VillagerProfession, level: number, tradeRemover: ITradeRemover);
    apply(): void;
    apply(tradeList: ItemListing[]): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
    undo(tradeList: ItemListing[]): void;
  }


  interface ActionRemoveWanderingTrade extends ActionTradeBase {}
  class ActionRemoveWanderingTrade extends ActionTradeBase {
    constructor(level: number, tradeRemover: ITradeRemover);
    apply(): void;
    apply(tradeList: ItemListing[]): void;
    describe(): string;
    describeUndo(): string;
    undo(): void;
    undo(tradeList: ItemListing[]): void;
  }


  interface ActionTradeBase extends IUndoableAction, CraftTweakerAction {}
  class ActionTradeBase extends IUndoableAction {
    constructor(level: number);

    constructor(profession: VillagerProfession, level: number);
    apply(var1: ItemListing[]): void;
    apply(): void;
    get level(): number;
    get profession(): VillagerProfession;
    undo(var1: ItemListing[]): void;
    undo(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.block' {
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TagKey } from 'net.minecraft.tags';
  import { Function, BiFunction } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { Stream } from 'java.util.stream';

  interface CTBlockIngredient extends CommandStringDisplayable {}
  class CTBlockIngredient extends CommandStringDisplayable {
    asCompound(other: CTBlockIngredient): CTBlockIngredient;
    get commandString(): string;
    mapTo<T>(var1: Function<Block, T>, var2: Function<BlockState, T>, var3: BiFunction<TagKey<Block>, number, T>, var4: Function<Stream<T>, T>): T;
    matches(var1: Block): boolean;
    matches(var1: Block, var2: number): boolean;
    matches(var1: BlockState): boolean;
    matches(var1: BlockState, var2: number): boolean;
    matches(var1: TagKey<Block>): boolean;
    matches(var1: TagKey<Block>, var2: number): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.block.CTBlockIngredient' {
  import { CTBlockIngredient } from 'com.blamejared.crafttweaker.api.block';
  import { List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TagKey } from 'net.minecraft.tags';
  import { Function, BiFunction } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Many } from 'com.blamejared.crafttweaker.api.util';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';

  interface CompoundBlockIngredient extends CTBlockIngredient {}
  class CompoundBlockIngredient extends CTBlockIngredient {
    constructor(elements: CTBlockIngredient[]);
    get commandString(): string;
    mapTo<T>(blockMapper: Function<Block, T>, blockStateMapper: Function<BlockState, T>, tagMapper: BiFunction<TagKey<Block>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(block: Block): boolean;
    matches(block: Block, amount: number): boolean;
    matches(blockState: BlockState): boolean;
    matches(blockState: BlockState, amount: number): boolean;
    matches(tag: TagKey<Block>): boolean;
    matches(tag: TagKey<Block>, amount: number): boolean;
  }


  interface BlockTagWithAmountIngredient extends CTBlockIngredient {}
  class BlockTagWithAmountIngredient extends CTBlockIngredient {
    constructor(tag: Many<KnownTag<Block>>);
    get commandString(): string;
    mapTo<T>(blockMapper: Function<Block, T>, blockStateMapper: Function<BlockState, T>, tagMapper: BiFunction<TagKey<Block>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(block: Block): boolean;
    matches(block: Block, amount: number): boolean;
    matches(blockState: BlockState): boolean;
    matches(blockState: BlockState, amount: number): boolean;
    matches(tag: TagKey<Block>): boolean;
    matches(tag: TagKey<Block>, amount: number): boolean;
  }


  interface BlockStateIngredient extends CTBlockIngredient {}
  class BlockStateIngredient extends CTBlockIngredient {
    constructor(blockState: BlockState);
    get commandString(): string;
    mapTo<T>(blockMapper: Function<Block, T>, blockStateMapper: Function<BlockState, T>, tagMapper: BiFunction<TagKey<Block>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(block: Block): boolean;
    matches(block: Block, amount: number): boolean;
    matches(blockState: BlockState): boolean;
    matches(blockState: BlockState, amount: number): boolean;
    matches(tag: TagKey<Block>): boolean;
    matches(tag: TagKey<Block>, amount: number): boolean;
  }


  interface BlockIngredient extends CTBlockIngredient {}
  class BlockIngredient extends CTBlockIngredient {
    constructor(block: Block);
    get commandString(): string;
    mapTo<T>(blockMapper: Function<Block, T>, blockStateMapper: Function<BlockState, T>, tagMapper: BiFunction<TagKey<Block>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(block: Block): boolean;
    matches(block: Block, amount: number): boolean;
    matches(blockState: BlockState): boolean;
    matches(blockState: BlockState, amount: number): boolean;
    matches(tag: TagKey<Block>): boolean;
    matches(tag: TagKey<Block>, amount: number): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.bracket' {
  import { Collection } from 'java.util';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Function } from 'java.util.function';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Block } from 'net.minecraft.world.level.block';
  import { IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { VillagerProfession, VillagerType } from 'net.minecraft.world.entity.npc';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { BannerPattern, DecoratedPotPattern } from 'net.minecraft.world.level.block.entity';
  import { Instrument } from 'net.minecraft.world.item';
  import { TrimPattern, TrimMaterial } from 'net.minecraft.world.item.armortrim';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { AttachmentType } from 'net.neoforged.neoforge.attachment';

  class BracketDumpers {
    static dumpRegistry<T>(key: ResourceKey<Registry<T>>, toString: Function<T, string>): Collection<string>;
    static get attributeDump(): Collection<string>;
    static get bannerPatterns(): Collection<string>;
    static get blockDump(): Collection<string>;
    static get componentTypes(): Collection<string>;
    static get decoratedPotPatterns(): Collection<string>;
    static get effectDump(): Collection<string>;
    static get enchantmentDump(): Collection<string>;
    static get entityTypeDump(): Collection<string>;
    static get fluidStackDump(): Collection<string>;
    static get instruments(): Collection<string>;
    static get itemBracketDump(): Collection<string>;
    static get potionTypeDump(): Collection<string>;
    static get professionDump(): Collection<string>;
    static get soundEventDump(): Collection<string>;
    static get targetingStrategyDump(): Collection<string>;
    static get trimMaterials(): Collection<string>;
    static get trimPatterns(): Collection<string>;
  }


  class BracketHandlers {
    static getAttribute(tokens: string): Attribute;
    static getBannerPattern(tokens: string): BannerPattern;
    static getBlock(tokens: string): Block;
    static getBlockState(tokens: string): BlockState;
    static getBlockState(name: string, properties: string): BlockState;
    static getBlockState(block: Block, properties: string): BlockState;
    static getComponentType(tokens: string): DataComponentType;
    static getDecoratedPotPattern(tokens: string): DecoratedPotPattern;
    static getEnchantment(tokens: string): Enchantment;
    static getEntityType(tokens: string): EntityType<Entity>;
    static getFluidStack(tokens: string): IFluidStack;
    static getInstrument(tokens: string): Instrument;
    static getItem(tokens: string): IItemStack;
    static getMobEffect(tokens: string): MobEffect;
    static getPotion(tokens: string): Potion;
    static getProfession(tokens: string): VillagerProfession;
    static getRecipeManager(tokens: string): IRecipeManager<any>;
    static getRegistry<T>(tokens: string, registry: ResourceKey<Registry<T>>): T;
    static getRegistry<T>(tokens: string, registry: ResourceKey<Registry<T>>, includeTypeNamespace: boolean): T;
    static getSoundEvent(tokens: string): SoundEvent;
    static getTargetingStrategy(tokens: string): ITargetingStrategy;
    static getTrimMaterial(tokens: string): TrimMaterial;
    static getTrimPattern(tokens: string): TrimPattern;
    static getVillagerType(tokens: string): VillagerType;
  }


  class BracketValidators {
    static validateBannerPattern(tokens: string): boolean;
    static validateBlockBracket(tokens: string): boolean;
    static validateBlockStateMaterialBracket(tokens: string): boolean;
    static validateBracket(bracketName: string, tokens: string, bracketMethod: Function<string, any>, logError: boolean): boolean;
    static validateBracket(bracketName: string, tokens: string, bracketMethod: Function<string, any>): boolean;
    static validateComponentType(tokens: string): boolean;
    static validateDecoratedPotPattern(tokens: string): boolean;
    static validateEffectBracket(tokens: string): boolean;
    static validateEnchantment(tokens: string): boolean;
    static validateEntityType(tokens: string): boolean;
    static validateFluidStack(tokens: string): boolean;
    static validateInstrument(tokens: string): boolean;
    static validateItemBracket(tokens: string): boolean;
    static validateProfessionBracket(tokens: string): boolean;
    static validateResourceBracket(tokens: string): boolean;
    static validateSoundEvent(tokens: string): boolean;
    static validateTargetingStrategy(tokens: string): boolean;
    static validateTrimMaterial(tokens: string): boolean;
    static validateTrimPattern(tokens: string): boolean;
  }


  class CommandStringDisplayable {
    get commandString(): string;
  }


  class NeoForgeBracketDumpers {
    static get blockDump(): Collection<string>;
    static get itemAbilityDump(): Collection<string>;
  }


  class NeoForgeBracketHandlers {
    static getAttachmentType(tokens: string): AttachmentType<any>;
    static getItemAbility(tokens: string): ItemAbility;
  }


  class NeoForgeBracketValidators {
    static validateItemAbilityBracket(tokens: string): boolean;
  }


  class ResourceLocationBracketHandler {
    static getResourceLocation(tokens: string): ResourceLocation;
  }

}

declare module 'com.blamejared.crafttweaker.api.bracket.custom' {
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { Supplier } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection } from 'java.util';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { Recipe, RecipeInput, RecipeType } from 'net.minecraft.world.item.crafting';

  interface EnumConstantBracketHandler extends BracketExpressionParser {}
  class EnumConstantBracketHandler extends BracketExpressionParser {
    static get dumperData(): Supplier<Stream<string>>;
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface RecipeComponentBracketHandler extends BracketExpressionParser {}
  class RecipeComponentBracketHandler extends BracketExpressionParser {
    static bracket<T>(name: ResourceLocation): IRecipeComponent<T>;
    static get dumperData(): Supplier<Stream<string>>;
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface RecipeTypeBracketHandler extends BracketExpressionParser {}
  class RecipeTypeBracketHandler extends BracketExpressionParser {
    constructor();
    static get dumperData(): Supplier<Stream<string>>;
    static get managerInstances(): Collection<IRecipeManager<Recipe<RecipeInput>>>;
    static getOrDefault(location: ResourceLocation): IRecipeManager<Recipe<any>>;
    static getOrDefault(type: RecipeType): IRecipeManager<Recipe<any>>;
    static getRecipeManager<T extends IRecipeManager<any>>(location: string): T;
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface TagBracketHandler extends BracketExpressionParser {}
  class TagBracketHandler extends BracketExpressionParser {
    static get dumperData(): Supplier<Stream<string>>;
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface TagManagerBracketHandler extends BracketExpressionParser {}
  class TagManagerBracketHandler extends BracketExpressionParser {
    static get dumperData(): Supplier<Stream<string>>;
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }

}

declare module 'com.blamejared.crafttweaker.api.capability' {
  import { BlockCapability, EntityCapability, ItemCapability } from 'net.neoforged.neoforge.capabilities';

  class EnergyStorageCaps {
    static readonly BLOCK: BlockCapability;
    static readonly ENTITY: EntityCapability;
    static readonly ITEM: ItemCapability;
  }


  class FluidHandlerCaps {
    static readonly BLOCK: BlockCapability;
    static readonly ENTITY: EntityCapability;
    static readonly ITEM: ItemCapability;
  }


  class ItemHandlerCaps {
    static readonly BLOCK: BlockCapability;
    static readonly ENTITY: EntityCapability;
    static readonly ENTITY_AUTOMATION: EntityCapability;
    static readonly ITEM: ItemCapability;
  }

}

declare module 'com.blamejared.crafttweaker.api.command.argument' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StringReader } from 'com.mojang.brigadier';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { Collection } from 'java.util';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';

  interface IItemStackArgument extends ArgumentType<IItemStack> {}
  class IItemStackArgument extends ArgumentType<IItemStack> {
    static readonly ID: ResourceLocation;
    static get (): IItemStackArgument;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): IItemStack;
  }


  interface RecipeTypeArgument extends ArgumentType<IRecipeManager> {}
  class RecipeTypeArgument extends ArgumentType<IRecipeManager> {
    static readonly ID: ResourceLocation;
    static get (): RecipeTypeArgument;
    get examples(): Collection<string>;
    listSuggestions<S>(context: CommandContext<S>, builder: SuggestionsBuilder): CompletableFuture<Suggestions>;
    parse(reader: StringReader): IRecipeManager;
  }

}

declare module 'com.blamejared.crafttweaker.api.command' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';

  class CommandUtilities {
    static readonly COMMAND_LOGGER: Logger;
    static copy(source: CommandSourceStack, toCopy: string): void;
    static copy(base: MutableComponent, toCopy: string): Component;
    static get formattedLogFile(): MutableComponent;
    static makeNoticeable(text: MutableComponent): MutableComponent;
    static makeNoticeable(text: string): MutableComponent;
    static open(source: CommandSourceStack, path: string): void;
    static open(source: CommandSourceStack, chat: Component, hover: Component, path: string): void;
    static openLogFile(source: CommandSourceStack, chat: Component, hover: Component): void;
    static openLogFile(source: CommandSourceStack, chat: Component): void;
    static openLogfile(source: CommandSourceStack): void;
    static openingUrl(base: MutableComponent, url: string): Component;
    static run(base: MutableComponent, command: string): Component;
    static send(source: CommandSourceStack, component: Component): void;
    static sendCopying(source: CommandSourceStack, component: MutableComponent, toCopy: string): void;
    static sendCopyingAndCopy(source: CommandSourceStack, component: MutableComponent, toCopy: string): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.command.type' {
  import { Command } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Stream } from 'java.util.stream';

  interface IBracketDumperInfo extends Command<CommandSourceStack> {}
  class IBracketDumperInfo extends Command<CommandSourceStack> {
    description(): MutableComponent;
    dumpedFileName(): string;
    subCommandName(): string;
    values(): Stream<string>;
  }

}

declare module 'com.blamejared.crafttweaker.api.component' {
  import { CustomData, Unbreakable, ItemLore, ItemAttributeModifiers, CustomModelData, Tool, DyedItemColor, MapItemColor, MapDecorations, MapPostProcessing, ChargedProjectiles, BundleContents, SuspiciousStewEffects, WritableBookContent, WrittenBookContent, DebugStickState, LodestoneTracker, FireworkExplosion, Fireworks, ResolvableProfile, ItemContainerContents, BlockItemStateProperties, SeededContainerLoot } from 'net.minecraft.world.item.component';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { Component } from 'net.minecraft.network.chat';
  import { List, Map } from 'java.util';
  import { Rarity, AdventureModePredicate, Instrument, DyeColor, Item } from 'net.minecraft.world.item';
  import { ItemEnchantments, Enchantment } from 'net.minecraft.world.item.enchantment';
  import { BlockPredicate } from 'net.minecraft.advancements.critereon';
  import { Entry } from 'ItemAttributeModifiers';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { Rule } from 'Tool';
  import { MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { Entry as mapdecorations_Entry } from 'MapDecorations';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { PotionContents, Potion } from 'net.minecraft.world.item.alchemy';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { Entry as suspicioussteweffects_Entry } from 'SuspiciousStewEffects';
  import { Filterable } from 'net.minecraft.server.network';
  import { ArmorTrim } from 'net.minecraft.world.item.armortrim';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { BannerPatternLayers, PotDecorations } from 'net.minecraft.world.level.block.entity';
  import { Layer } from 'BannerPatternLayers';
  import { Occupant } from 'BeehiveBlockEntity';
  import { LockCode } from 'net.minecraft.world';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { DataComponentType } from 'net.minecraft.core.component';

  class ComponentAccess<T extends ComponentAccess<T> = any> {
    _get<U>(var1: DataComponentType<U>): U;
    _has<U>(var1: DataComponentType<U>): boolean;
    _with<U>(var1: DataComponentType<U>, var2: U): T;
    _without<U>(var1: DataComponentType<U>): T;
    creativeSlotLock(): boolean;
    get attributeModifiers(): ItemAttributeModifiers;
    get bannerPatterns(): BannerPatternLayers;
    get baseColor(): DyeColor;
    get bees(): Occupant[];
    get blockEntityData(): CustomData;
    get blockState(): BlockItemStateProperties;
    get bucketEntityData(): CustomData;
    get bundleContents(): BundleContents;
    get canBreak(): AdventureModePredicate;
    get canPlaceOn(): AdventureModePredicate;
    get chargedProjectiles(): ChargedProjectiles;
    get container(): ItemContainerContents;
    get containerLoot(): SeededContainerLoot;
    get customData(): CustomData;
    get customModelData(): CustomModelData;
    get customName(): Component;
    get damage(): number;
    get debugStickState(): DebugStickState;
    get dyedColor(): DyedItemColor;
    get enchantmentGlintOverride(): boolean;
    get enchantments(): ItemEnchantments;
    get entityData(): CustomData;
    get fireworkExplosion(): FireworkExplosion;
    get fireworks(): Fireworks;
    get food(): FoodProperties;
    get instrument(): Instrument;
    get itemName(): Component;
    get lock(): LockCode;
    get lodestoneTracker(): LodestoneTracker;
    get lore(): ItemLore;
    get mapColor(): MapItemColor;
    get mapDecorations(): MapDecorations;
    get mapId(): MapId;
    get mapPostProcessing(): MapPostProcessing;
    get maxDamage(): number;
    get maxStackSize(): number;
    get noteBlockSound(): ResourceLocation;
    get ominousBottleAmplifier(): number;
    get potDecorations(): PotDecorations;
    get potionContents(): PotionContents;
    get profile(): ResolvableProfile;
    get rarity(): Rarity;
    get recipes(): ResourceLocation[];
    get storedEnchantments(): ItemEnchantments;
    get suspiciousStewEffects(): SuspiciousStewEffects;
    get tool(): Tool;
    get trim(): ArmorTrim;
    get unbreakable(): Unbreakable;
    get writableBookContent(): WritableBookContent;
    get writtenBookContent(): WrittenBookContent;
    hasAttributeModifiers(): boolean;
    hasBannerPatterns(): boolean;
    hasBaseColor(): boolean;
    hasBees(): boolean;
    hasBlockEntityData(): boolean;
    hasBlockState(): boolean;
    hasBucketEntityData(): boolean;
    hasBundleContents(): boolean;
    hasCanBreak(): boolean;
    hasCanPlaceOn(): boolean;
    hasChargedProjectiles(): boolean;
    hasContainer(): boolean;
    hasContainerLoot(): boolean;
    hasCustomData(): boolean;
    hasCustomModelData(): boolean;
    hasCustomName(): boolean;
    hasDamage(): boolean;
    hasDebugStickState(): boolean;
    hasDyedColor(): boolean;
    hasEnchantmentGlintOverride(): boolean;
    hasEnchantments(): boolean;
    hasEntityData(): boolean;
    hasFireworkExplosion(): boolean;
    hasFireworks(): boolean;
    hasFood(): boolean;
    hasInstrument(): boolean;
    hasItemName(): boolean;
    hasLock(): boolean;
    hasLodestoneTracker(): boolean;
    hasLore(): boolean;
    hasMapColor(): boolean;
    hasMapDecorations(): boolean;
    hasMapId(): boolean;
    hasMapPostProcessing(): boolean;
    hasMaxDamage(): boolean;
    hasMaxStackSize(): boolean;
    hasNoteBlockSound(): boolean;
    hasOminousBottleAmplifier(): boolean;
    hasPotDecorations(): boolean;
    hasPotionContents(): boolean;
    hasProfile(): boolean;
    hasRarity(): boolean;
    hasRecipes(): boolean;
    hasRepairCost(): boolean;
    hasStoredEnchantments(): boolean;
    hasSuspiciousStewEffects(): boolean;
    hasTool(): boolean;
    hasTrim(): boolean;
    hasUnbreakable(): boolean;
    hasWritableBookContent(): boolean;
    hasWrittenBookContent(): boolean;
    hideAdditionalTooltip(): boolean;
    hideTooltip(): boolean;
    isFireResistant(): boolean;
    isIntangibleProjectile(): boolean;
    repairCost(): number;
    withAttributeModifiers(modifiers: ItemAttributeModifiers): T;
    withAttributeModifiers(modifier: Entry, showInTooltip: boolean): T;
    withAttributeModifiers(modifiers: Entry[], showInTooltip: boolean): T;
    withBannerPatterns(layers: Layer[]): T;
    withBannerPatterns(layers: BannerPatternLayers): T;
    withBaseColor(color: DyeColor): T;
    withBees(occupants: Occupant[]): T;
    withBlockEntityData(data: MapData): T;
    withBlockEntityData(data: CustomData): T;
    withBlockState(properties: BlockItemStateProperties): T;
    withBucketEntityData(data: MapData): T;
    withBucketEntityData(data: CustomData): T;
    withBundleContents(contents: IItemStack[]): T;
    withBundleContents(contents: BundleContents): T;
    withCanBreak(predicates: BlockPredicate[], showInTooltip: boolean): T;
    withCanBreak(predicate: AdventureModePredicate): T;
    withCanPlaceOn(predicates: BlockPredicate[], showInTooltip: boolean): T;
    withCanPlaceOn(predicate: AdventureModePredicate): T;
    withChargedProjectiles(item: IItemStack): T;
    withChargedProjectiles(items: IItemStack[]): T;
    withChargedProjectiles(chargedProjectiles: ChargedProjectiles): T;
    withContainer(contents: IItemStack[]): T;
    withContainer(contents: ItemContainerContents): T;
    withContainerLoot(lootTable: ResourceKey<LootTable>, seed: number): T;
    withContainerLoot(loot: SeededContainerLoot): T;
    withCreativeSlotLock(): T;
    withCustomData(customData: MapData): T;
    withCustomData(customData: CustomData): T;
    withCustomModelData(value: number): T;
    withCustomModelData(data: CustomModelData): T;
    withCustomName(name: Component): T;
    withDamage(damage: number): T;
    withDebugStickState(state: DebugStickState): T;
    withDyedColor(rgb: number, showInTooltip: boolean): T;
    withDyedColor(color: DyedItemColor): T;
    withEnchantment(enchantment: Enchantment, level: number): T;
    withEnchantmentGlintOverride(value: boolean): T;
    withEnchantments(enchantments: ItemEnchantments): T;
    withEntityData(data: MapData): T;
    withEntityData(data: CustomData): T;
    withFireResistant(): T;
    withFireworkExplosion(explosion: FireworkExplosion): T;
    withFireworks(flightDuration: number, explosions: FireworkExplosion[]): T;
    withFireworks(fireworks: Fireworks): T;
    withFood(food: FoodProperties): T;
    withHideAdditionalTooltip(): T;
    withHideTooltip(): T;
    withInstrument(instrument: Instrument): T;
    withIntangibleProjectile(): T;
    withItemName(name: Component): T;
    withLock(code: string): T;
    withLock(lock: LockCode): T;
    withLodestoneTracker(tracker: LodestoneTracker): T;
    withLore(components: Component[]): T;
    withLore(components: Component): T;
    withLore(lore: ItemLore): T;
    withMapColor(rgb: number): T;
    withMapColor(color: MapItemColor): T;
    withMapDecorations(decorations: Map<string, mapdecorations_Entry>): T;
    withMapDecorations(decorations: MapDecorations): T;
    withMapId(id: number): T;
    withMapId(mapId: MapId): T;
    withMapPostProcessing(value: MapPostProcessing): T;
    withMaxDamage(maxDamage: number): T;
    withMaxStackSize(maxStackSize: number): T;
    withNoteBlockSound(sound: ResourceLocation): T;
    withOminousBottleAmplifier(amplifier: number): T;
    withPotDecorations(back: Item, left: Item, right: Item, front: Item): T;
    withPotDecorations(decorations: PotDecorations): T;
    withPotionContents(potion: Potion): T;
    withPotionContents(potion: Potion, customEffects: MobEffectInstance[]): T;
    withPotionContents(potion: Potion, customColor: number, customEffects: MobEffectInstance[]): T;
    withPotionContents(contents: PotionContents): T;
    withProfile(profile: ResolvableProfile): T;
    withRarity(rarity: Rarity): T;
    withRecipes(recipes: ResourceLocation[]): T;
    withRepairCost(cost: number): T;
    withStoredEnchantments(enchantments: ItemEnchantments): T;
    withSuspiciousStewEffects(effects: suspicioussteweffects_Entry[]): T;
    withSuspiciousStewEffects(suspiciousStewEffects: SuspiciousStewEffects): T;
    withTool(rules: Rule[], defaultMiningSpeed: number, damagePerBlock: number): T;
    withTool(tool: Tool): T;
    withTrim(trim: ArmorTrim): T;
    withUnbreakable(showInTooltip: boolean): T;
    withUnbreakable(unbreakable: Unbreakable): T;
    withWritableBookContent(pages: Filterable<string>[]): T;
    withWritableBookContent(content: WritableBookContent): T;
    withWrittenBookContent(content: WrittenBookContent): T;
    withoutAttributeModifiers(): T;
    withoutBannerPatterns(): T;
    withoutBaseColor(): T;
    withoutBees(): T;
    withoutBlockEntityData(): T;
    withoutBlockState(): T;
    withoutBucketEntityData(): T;
    withoutBundleContents(): T;
    withoutCanBreak(): T;
    withoutCanPlaceOn(): T;
    withoutChargedProjectiles(): T;
    withoutContainer(): T;
    withoutContainerLoot(): T;
    withoutCreativeSlotLock(): T;
    withoutCustomData(): T;
    withoutCustomModelData(): T;
    withoutCustomName(): T;
    withoutDamage(): T;
    withoutDebugStickState(): T;
    withoutDyedColor(): T;
    withoutEnchantment(enchantment: Enchantment): T;
    withoutEnchantmentGlintOverride(): T;
    withoutEnchantments(): T;
    withoutEntityDate(): T;
    withoutFireResistant(): T;
    withoutFireworkExplosion(): T;
    withoutFireworks(): T;
    withoutFood(): T;
    withoutHideAdditionalTooltip(): T;
    withoutHideTooltip(): T;
    withoutInstrument(): T;
    withoutIntangibleProjectile(): T;
    withoutItemName(): T;
    withoutLock(): T;
    withoutLodestoneTracker(): T;
    withoutLore(): T;
    withoutMapColor(): T;
    withoutMapDecorations(): T;
    withoutMapId(): T;
    withoutMapPostProcessing(): T;
    withoutMaxDamage(): T;
    withoutMaxStackSize(): T;
    withoutNoteBlockSound(): T;
    withoutOminousBottleAmplifier(): T;
    withoutPotDecorations(): T;
    withoutPotionContents(): T;
    withoutProfile(): T;
    withoutRarity(): T;
    withoutRecipes(): T;
    withoutRepairCost(): T;
    withoutStoredEnchantments(): T;
    withoutSuspiciousStewEffects(): T;
    withoutTool(): T;
    withoutTrim(): T;
    withoutUnbreakable(): T;
    withoutWritableBookContent(): T;
    withoutWrittenBookContent(): T;
  }

}

declare module 'com.blamejared.crafttweaker.api' {
  import { IAccessibleElementsProvider } from 'com.blamejared.crafttweaker.platform.helper';
  import { IScriptRunManager, IScriptRunModuleConfigurator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { ILoggerRegistry } from 'com.blamejared.crafttweaker.api.logging';
  import { Path } from 'java.nio.file';
  import { IAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Logger } from 'org.apache.logging.log4j';
  import { UUID, Collection, Map, List, Optional, Set } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { IScriptLoader, IScriptLoadSource, IZenClassRegistry, IPreprocessor } from 'com.blamejared.crafttweaker.api.zencode';
  import { IBracketDumperInfo } from 'com.blamejared.crafttweaker.api.command.type';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { Recipe, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { Class, Enum } from 'java.lang';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { TagManagerFactory, ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { Registry } from 'net.minecraft.core';
  import { IReplacerRegistry } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { IEventRegistry } from 'com.blamejared.crafttweaker.api.event';

  class CraftTweakerAPI {
    static apply(action: IAction): void;
    static get accessibleElementsProvider(): IAccessibleElementsProvider;
    static get loggerRegistry(): ILoggerRegistry;
    static get registry(): ICraftTweakerRegistry;
    static get scriptRunManager(): IScriptRunManager;
    static get scriptsDirectory(): Path;
    static getLogger(systemName: string): Logger;
  }


  class CraftTweakerConstants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG_NAME: string;
    static readonly LOG_PATH: string;
    static readonly ALL_LOADERS_MARKER: string;
    static readonly INIT_LOADER_NAME: string;
    static readonly DEFAULT_LOADER_NAME: string;
    static readonly TAGS_LOADER_NAME: string;
    static readonly NETWORK_VERSION: number;
    static readonly NETWORK_VERSION_STRING: string;
    static readonly CRAFTTWEAKER_UUID: UUID;
    static readonly RELOAD_LISTENER_SOURCE_ID: ResourceLocation;
    static readonly CLIENT_RECIPES_UPDATED_SOURCE_ID: ResourceLocation;
    static readonly ENV_FORWARD_LOG_TO_LATEST_LOG: string;
    static readonly ENV_SCRIPTS_DIRECTORY: string;
    static rl(path: string): ResourceLocation;
    static scriptsDir(): Path;
  }


  class ICraftTweakerRegistry {
    findLoadSource(var1: ResourceLocation): IScriptLoadSource;
    findLoader(var1: string): IScriptLoader;
    findRecipeComponent<T>(var1: ResourceLocation): IRecipeComponent<T>;
    get allLoaders(): Collection<IScriptLoader>;
    get allRecipeComponents(): Collection<IRecipeComponent<any>>;
    get eventRegistry(): IEventRegistry;
    get preprocessors(): IPreprocessor[];
    get replacerRegistry(): IReplacerRegistry;
    get zenClassRegistry(): IZenClassRegistry;
    getAllEnumStringsForEnumBracket(var1: IScriptLoader): Set<string>;
    getBracketDumpers(var1: IScriptLoader): Map<string, IBracketDumperInfo>;
    getBracketHandlers(var1: IScriptLoader, var2: string): Map<string, BracketExpressionParser>;
    getConfiguratorFor(var1: IScriptLoader): IScriptRunModuleConfigurator;
    getEnumBracketFor<T extends Enum<T>>(var1: IScriptLoader, var2: ResourceLocation): Optional<Class<T>>;
    getEnumBracketValue<T extends Enum<T>>(var1: IScriptLoader, var2: ResourceLocation, var3: string): T;
    getRecipeHandlerFor<T extends Recipe<any>>(var1: T): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(holder: RecipeHolder<T>): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(var1: Class<T>): IRecipeHandler<T>;
    getTaggableElementFactory<T>(var1: ResourceKey<Registry<T>>): TagManagerFactory<T, ITagManager<any>>;
    getTaggableElementFor<T>(var1: ResourceKey<T>): Optional<Class<T>>;
  }

}

declare module 'com.blamejared.crafttweaker.api.data' {
  import { ByteTag, ByteArrayTag, DoubleTag, Tag, FloatTag, IntArrayTag, IntTag, ListTag, LongArrayTag, LongTag, ShortTag, StringTag } from 'net.minecraft.nbt';
  import { DataVisitor } from 'com.blamejared.crafttweaker.api.data.visitor';
  import { Type } from 'com.blamejared.crafttweaker.api.data.IData';
  import { List, Iterator, Map, Set } from 'java.util';
  import { Comparable, Iterable } from 'java.lang';
  import { Function } from 'java.util.function';

  interface BoolData extends IData {}
  class BoolData extends IData {
    static readonly TRUE: BoolData;
    static readonly FALSE: BoolData;
    constructor(internalValue: boolean);
    accept<T>(visitor: DataVisitor<T>): T;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get byteData(): ByteData;
    get internal(): ByteTag;
    get type(): Type;
    hashCode(): number;
    not(): IData;
    or(other: IData): IData;
    toString(): string;
    xor(other: IData): IData;
  }


  interface ByteArrayData extends IData {}
  class ByteArrayData extends IData {
    constructor(internal: ByteArrayTag);

    constructor(internal: number[]);
    accept<T>(visitor: DataVisitor<T>): T;
    asByteArray(): number[];
    asIntArray(): number[];
    asList(): IData[];
    asLongArray(): number[];
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): ByteArrayData;
    copyInternal(): ByteArrayData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): ByteArrayTag;
    get type(): Type;
    getAt(index: number): IData;
    getAt(key: string): IData;
    hashCode(): number;
    isListable(): boolean;
    iterator(): Iterator<IData>;
    length(): number;
    put(index: string, value: IData): void;
    remove(index: number): void;
    remove(key: string): void;
    toString(): string;
  }


  interface ByteData extends IData {}
  class ByteData extends IData {
    constructor(internal: ByteTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): ByteTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    or(other: IData): IData;
    sub(other: IData): IData;
    toString(): string;
    xor(other: IData): IData;
  }


  interface DoubleData extends IData {}
  class DoubleData extends IData {
    constructor(internal: DoubleTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): DoubleTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    sub(other: IData): IData;
    toString(): string;
  }


  interface EmptyData extends IData {}
  class EmptyData extends IData {
    static readonly INSTANCE: EmptyData;
    accept<T>(visitor: DataVisitor<T>): T;
    copy(): IData;
    copyInternal(): IData;
    get internal(): Tag;
    get type(): Type;
    toString(): string;
  }


  interface FloatData extends IData {}
  class FloatData extends IData {
    constructor(internal: FloatTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): FloatTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    sub(other: IData): IData;
    toString(): string;
  }


  interface IData extends Comparable<IData>, Iterable<IData> {}
  class IData extends Comparable<IData> {
    accept<T>(var1: DataVisitor<T>): T;
    add(other: IData): IData;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asByteArray(): number[];
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asIntArray(): number[];
    asList(): IData[];
    asLong(): number;
    asLongArray(): number[];
    asMap(): Map<string, IData>;
    asShort(): number;
    asString(): string;
    cat(other: IData): IData;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    containsList(dataValues: IData[]): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    get id(): number;
    get internal(): Tag;
    get keys(): Set<string>;
    get type(): Type;
    getAsString(): string;
    getAt(index: number): IData;
    getAt(key: string): IData;
    isEmpty(): boolean;
    isListable(): boolean;
    isMappable(): boolean;
    iterator(): Iterator<IData>;
    length(): number;
    static listOf(...members: IData[]): IData;
    map(operation: Function<IData, IData>): IData;
    merge(other: IData): IData;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    not(): IData;
    or(other: IData): IData;
    put(index: string, value: IData): void;
    remove(index: number): void;
    remove(key: string): void;
    setAt(name: string, data: IData): void;
    shl(other: IData): IData;
    shr(other: IData): IData;
    sub(other: IData): IData;
    xor(other: IData): IData;
  }


  interface IntArrayData extends IData {}
  class IntArrayData extends IData {
    constructor(internal: IntArrayTag);

    constructor(internal: number[]);
    accept<T>(visitor: DataVisitor<T>): T;
    asByteArray(): number[];
    asIntArray(): number[];
    asList(): IData[];
    asLongArray(): number[];
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IntArrayData;
    copyInternal(): IntArrayData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): IntArrayTag;
    get type(): Type;
    getAt(index: number): IData;
    getAt(key: string): IData;
    hashCode(): number;
    isListable(): boolean;
    iterator(): Iterator<IData>;
    length(): number;
    put(index: string, value: IData): void;
    remove(index: number): void;
    remove(key: string): void;
    toString(): string;
  }


  interface IntData extends IData {}
  class IntData extends IData {
    constructor(internal: IntTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): IntTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    or(other: IData): IData;
    shl(other: IData): IData;
    shr(other: IData): IData;
    sub(other: IData): IData;
    toString(): string;
    xor(other: IData): IData;
  }


  interface ListData extends IData {}
  class ListData extends IData {
    constructor(internal: ListTag);

    constructor();

    constructor(list: IData[]);

    constructor(array: IData[]);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    asByteArray(): number[];
    asIntArray(): number[];
    asList(): IData[];
    asLongArray(): number[];
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): ListTag;
    get keys(): Set<string>;
    get type(): Type;
    getAt(index: number): IData;
    getAt(key: string): IData;
    hashCode(): number;
    isListable(): boolean;
    iterator(): Iterator<IData>;
    length(): number;
    put(index: string, value: IData): void;
    remove(index: number): void;
    remove(key: string): void;
    toString(): string;
  }


  interface LongArrayData extends IData {}
  class LongArrayData extends IData {
    constructor(internal: LongArrayTag);

    constructor(internal: number[]);
    accept<T>(visitor: DataVisitor<T>): T;
    asByteArray(): number[];
    asIntArray(): number[];
    asList(): IData[];
    asLongArray(): number[];
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): LongArrayTag;
    get type(): Type;
    getAt(index: number): IData;
    getAt(key: string): IData;
    hashCode(): number;
    isListable(): boolean;
    iterator(): Iterator<IData>;
    length(): number;
    put(index: string, value: IData): void;
    remove(index: number): void;
    remove(key: string): void;
    toString(): string;
  }


  interface LongData extends IData {}
  class LongData extends IData {
    constructor(internal: LongTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): LongTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    or(other: IData): IData;
    shl(other: IData): IData;
    shr(other: IData): IData;
    sub(other: IData): IData;
    toString(): string;
    xor(other: IData): IData;
  }


  interface ShortData extends IData {}
  class ShortData extends IData {
    constructor(internal: ShortTag);

    constructor(internal: number);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    and(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    div(other: IData): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): ShortTag;
    get type(): Type;
    hashCode(): number;
    mod(other: IData): IData;
    mul(other: IData): IData;
    neg(): IData;
    or(other: IData): IData;
    shl(other: IData): IData;
    shr(other: IData): IData;
    sub(other: IData): IData;
    toString(): string;
    xor(other: IData): IData;
  }


  interface StringData extends IData {}
  class StringData extends IData {
    constructor(internal: StringTag);

    constructor(internal: string);
    accept<T>(visitor: DataVisitor<T>): T;
    add(other: IData): IData;
    asBool(): boolean;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    cat(other: IData): IData;
    compareTo(other: IData): number;
    contains(other: IData): boolean;
    copy(): IData;
    copyInternal(): IData;
    equalTo(other: IData): boolean;
    equals(o: any): boolean;
    get internal(): StringTag;
    get type(): Type;
    hashCode(): number;
    length(): number;
    toString(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.data.converter' {
  import { IData, MapData } from 'com.blamejared.crafttweaker.api.data';
  import { JsonElement, JsonObject } from 'com.google.gson';

  class JSONConverter {
    static convert(json: JsonElement): IData;
    static convert(jsonObject: JsonObject): MapData;
  }


  class StringConverter {
    static convert(expression: string): IData;
  }

}

declare module 'com.blamejared.crafttweaker.api.data.converter.tag' {
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Tag, TagVisitor, StringTag, ByteTag, ShortTag, IntTag, LongTag, FloatTag, DoubleTag, ByteArrayTag, IntArrayTag, LongArrayTag, ListTag, CompoundTag, EndTag } from 'net.minecraft.nbt';

  class TagToDataConverter {
    static convert(tag: Tag): IData;
  }


  interface TagToDataVisitor extends TagVisitor {}
  class TagToDataVisitor extends TagVisitor {
    get value(): IData;
    visit(tag: Tag): IData;
    visitByte(tag: ByteTag): void;
    visitByteArray(tag: ByteArrayTag): void;
    visitCompound(tag: CompoundTag): void;
    visitDouble(tag: DoubleTag): void;
    visitEnd(tag: EndTag): void;
    visitFloat(tag: FloatTag): void;
    visitInt(tag: IntTag): void;
    visitIntArray(tag: IntArrayTag): void;
    visitList(tag: ListTag): void;
    visitLong(tag: LongTag): void;
    visitLongArray(tag: LongArrayTag): void;
    visitShort(tag: ShortTag): void;
    visitString(tag: StringTag): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.data.IData' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly BOOL: Type;
    static readonly BYTE_ARRAY: Type;
    static readonly BYTE: Type;
    static readonly DOUBLE: Type;
    static readonly FLOAT: Type;
    static readonly INT_ARRAY: Type;
    static readonly INT: Type;
    static readonly LIST: Type;
    static readonly LONG_ARRAY: Type;
    static readonly LONG: Type;
    static readonly MAP: Type;
    static readonly SHORT: Type;
    static readonly STRING: Type;
    static readonly EMPTY: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'com.blamejared.crafttweaker.api.data.op' {
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { ListBuilder, DynamicOps, DataResult, Encoder, RecordBuilder, Lifecycle, MapLike, Decoder } from 'com.mojang.serialization';
  import { UnaryOperator, Consumer, BiConsumer, Function } from 'java.util.function';
  import { Iterable, Number, Boolean } from 'java.lang';
  import { RegistryOps } from 'net.minecraft.resources';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Stream, IntStream, LongStream } from 'java.util.stream';
  import { Pair } from 'com.mojang.datafixers.util';
  import { List, Map } from 'java.util';
  import { ByteBuffer } from 'java.nio';

  interface AnyTypeListDataAdapter extends ListDataAdapter {}
  class AnyTypeListDataAdapter extends ListDataAdapter {
    apply(data: IData): ListDataAdapter;
    finish(): IData;
    toString(): string;
  }


  interface DecidingListDataAdapter extends ListDataAdapter {}
  class DecidingListDataAdapter extends ListDataAdapter {
    apply(data: IData): ListDataAdapter;
    finish(): IData;
    static of(): DecidingListDataAdapter;
    toString(): string;
  }


  interface IDataListBuilder extends ListBuilder<IData> {}
  class IDataListBuilder extends ListBuilder<IData> {
    add(value: IData): ListBuilder<IData>;
    add(value: DataResult<IData>): ListBuilder<IData>;
    add<E>(value: E, encoder: Encoder<E>): ListBuilder<IData>;
    addAll<E>(values: Iterable<E>, encoder: Encoder<E>): ListBuilder<IData>;
    build(prefix: IData): DataResult<IData>;
    build(prefix: DataResult<IData>): DataResult<IData>;
    mapError(onError: UnaryOperator<string>): ListBuilder<IData>;
    ops(): DynamicOps<IData>;
    toString(): string;
    withErrorsFrom(result: DataResult<any>): ListBuilder<IData>;
  }


  interface IDataMapBuilder extends RecordBuilder<IData> {}
  class IDataMapBuilder extends RecordBuilder<IData> {
    add(key: IData, value: IData): RecordBuilder<IData>;
    add(key: IData, value: DataResult<IData>): RecordBuilder<IData>;
    add(key: DataResult<IData>, value: DataResult<IData>): RecordBuilder<IData>;
    add(key: string, value: IData): RecordBuilder<IData>;
    add(key: string, value: DataResult<IData>): RecordBuilder<IData>;
    add<E>(key: string, value: E, encoder: Encoder<E>): RecordBuilder<IData>;
    build(prefix: IData): DataResult<IData>;
    build(prefix: DataResult<IData>): DataResult<IData>;
    mapError(onError: UnaryOperator<string>): RecordBuilder<IData>;
    ops(): DynamicOps<IData>;
    setLifecycle(lifecycle: Lifecycle): RecordBuilder<IData>;
    toString(): string;
    withErrorsFrom(result: DataResult<any>): RecordBuilder<IData>;
  }


  interface IDataOps extends DynamicOps<IData> {}
  class IDataOps extends DynamicOps<IData> {
    static readonly INSTANCE: IDataOps;
    convertList<U>(outOps: DynamicOps<U>, input: IData): U;
    convertMap<U>(outOps: DynamicOps<U>, input: IData): U;
    convertTo<U>(outOps: DynamicOps<U>, input: IData): U;
    createBoolean(value: boolean): IData;
    createByte(value: number): IData;
    createByteList(input: ByteBuffer): IData;
    createDouble(value: number): IData;
    createFloat(value: number): IData;
    createInt(value: number): IData;
    createIntList(input: IntStream): IData;
    createList(input: Stream<IData>): IData;
    createLong(value: number): IData;
    createLongList(input: LongStream): IData;
    createMap(map: Stream<Pair<IData, IData>>): IData;
    createMap(map: Map<IData, IData>): IData;
    createNumeric(i: Number): IData;
    createShort(value: number): IData;
    createString(value: string): IData;
    empty(): IData;
    emptyList(): IData;
    emptyMap(): IData;
    get(input: IData, key: string): DataResult<IData>;
    getBooleanValue(input: IData): DataResult<boolean>;
    getByteBuffer(input: IData): DataResult<ByteBuffer>;
    getGeneric(input: IData, key: IData): DataResult<IData>;
    getIntStream(input: IData): DataResult<IntStream>;
    getList(input: IData): DataResult<Consumer<Consumer<IData>>>;
    getLongStream(input: IData): DataResult<LongStream>;
    getMap(input: IData): DataResult<MapLike<IData>>;
    getMapEntries(input: IData): DataResult<Consumer<BiConsumer<IData, IData>>>;
    getMapValues(input: IData): DataResult<Stream<Pair<IData, IData>>>;
    getNumberValue(input: IData): DataResult<Number>;
    getNumberValue(input: IData, defaultValue: Number): Number;
    getStream(input: IData): DataResult<Stream<IData>>;
    getStringValue(input: IData): DataResult<string>;
    listBuilder(): ListBuilder<IData>;
    mapBuilder(): RecordBuilder<IData>;
    mergeToList(list: IData, value: IData): DataResult<IData>;
    mergeToList(list: IData, values: IData[]): DataResult<IData>;
    mergeToMap(map: IData, key: IData, value: IData): DataResult<IData>;
    mergeToMap(map: IData, values: Map<IData, IData>): DataResult<IData>;
    mergeToMap(map: IData, values: MapLike<IData>): DataResult<IData>;
    mergeToPrimitive(prefix: IData, value: IData): DataResult<IData>;
    remove(input: IData, key: string): IData;
    set(input: IData, key: string, value: IData): IData;
    toString(): string;
    update(input: IData, key: string, functionParameter: Function<IData, IData>): IData;
    updateGeneric(input: IData, key: IData, functionParameter: Function<IData, IData>): IData;
    withDecoder<E>(decoder: Decoder<E>): Function<IData, DataResult<Pair<E, IData>>>;
    withEncoder<E>(encoder: Encoder<E>): Function<E, DataResult<IData>>;
    withParser<E>(decoder: Decoder<E>): Function<IData, DataResult<E>>;
    withRegistryAccess(): RegistryOps<IData>;
    withRegistryAccess(access: RegistryAccess): RegistryOps<IData>;
    withTagAddingRegistryAccess(): RegistryOps<IData>;
  }


  interface ListDataAdapter extends Function<IData, ListDataAdapter> {}
  class ListDataAdapter extends Function<IData, ListDataAdapter> {
    finish(): IData;
  }


  interface MapLikeMapData extends MapLike<IData> {}
  class MapLikeMapData extends MapLike<IData> {
    entries(): Stream<Pair<IData, IData>>;
    get(key: IData): IData;
    get(key: string): IData;
    toString(): string;
  }


  class OpUtils {
  }


  interface SameTypeListDataAdapter<T extends IData = any> extends ListDataAdapter {}
  class SameTypeListDataAdapter<T extends IData = any> extends ListDataAdapter {
    apply(data: IData): ListDataAdapter;
    finish(): IData;
    toString(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.data.visitor' {
  import { Enum } from 'java.lang';
  import { IData, BoolData, ByteArrayData, ByteData, DoubleData, FloatData, IntArrayData, IntData, ListData, LongArrayData, LongData, MapData, ShortData, StringData, EmptyData } from 'com.blamejared.crafttweaker.api.data';
  import { List, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface DataToJsonStringVisitor extends Enum<DataToJsonStringVisitor> {}
  class DataToJsonStringVisitor extends Enum<DataToJsonStringVisitor> {
    static readonly INSTANCE: DataToJsonStringVisitor;
    static valueOf(name: string): DataToJsonStringVisitor;
    static values(): DataToJsonStringVisitor[];
    visit(data: IData): string;
    visitBool(data: BoolData): string;
    visitByte(data: ByteData): string;
    visitByteArray(data: ByteArrayData): string;
    visitDouble(data: DoubleData): string;
    visitEmpty(data: EmptyData): string;
    visitFloat(data: FloatData): string;
    visitInt(data: IntData): string;
    visitIntArray(data: IntArrayData): string;
    visitList(data: ListData): string;
    visitLong(data: LongData): string;
    visitLongArray(data: LongArrayData): string;
    visitMap(data: MapData): string;
    visitShort(data: ShortData): string;
    visitString(data: StringData): string;
  }


  interface DataToStringVisitor extends Enum<DataToStringVisitor> {}
  class DataToStringVisitor extends Enum<DataToStringVisitor> {
    static readonly PLAIN: DataToStringVisitor;
    static readonly ESCAPE: DataToStringVisitor;
    static valueOf(name: string): DataToStringVisitor;
    static values(): DataToStringVisitor[];
    visit(data: IData): string;
    visitBool(data: BoolData): string;
    visitByte(data: ByteData): string;
    visitByteArray(data: ByteArrayData): string;
    visitDouble(data: DoubleData): string;
    visitEmpty(data: EmptyData): string;
    visitFloat(data: FloatData): string;
    visitInt(data: IntData): string;
    visitIntArray(data: IntArrayData): string;
    visitList(data: ListData): string;
    visitLong(data: LongData): string;
    visitLongArray(data: LongArrayData): string;
    visitMap(data: MapData): string;
    visitShort(data: ShortData): string;
    visitString(data: StringData): string;
  }


  interface DataToTextComponentVisitor extends DataVisitor<Component> {}
  class DataToTextComponentVisitor extends DataVisitor<Component> {
    static readonly DATA_TO_COMPONENT: Map;
    constructor(indentation: string, depth: number);
    visit(data: IData): Component;
    visitBool(data: BoolData): Component;
    visitByte(data: ByteData): Component;
    visitByteArray(data: ByteArrayData): Component;
    visitDouble(data: DoubleData): Component;
    visitEmpty(data: EmptyData): Component;
    visitFloat(data: FloatData): Component;
    visitInt(data: IntData): Component;
    visitIntArray(data: IntArrayData): Component;
    visitList(data: ListData): Component;
    visitLong(data: LongData): Component;
    visitLongArray(data: LongArrayData): Component;
    visitMap(data: MapData): Component;
    visitShort(data: ShortData): Component;
    visitString(data: StringData): Component;
  }


  class DataVisitor<T = any> {
    visitBool(var1: BoolData): T;
    visitByte(var1: ByteData): T;
    visitByteArray(var1: ByteArrayData): T;
    visitDouble(var1: DoubleData): T;
    visitEmpty(var1: EmptyData): T;
    visitFloat(var1: FloatData): T;
    visitInt(var1: IntData): T;
    visitIntArray(var1: IntArrayData): T;
    visitList(var1: ListData): T;
    visitLong(var1: LongData): T;
    visitLongArray(var1: LongArrayData): T;
    visitMap(var1: MapData): T;
    visitShort(var1: ShortData): T;
    visitString(var1: StringData): T;
  }

}

declare module 'com.blamejared.crafttweaker.api.entity' {
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { TagKey } from 'net.minecraft.tags';
  import { Function, BiFunction } from 'java.util.function';
  import { Integer, Boolean } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Component } from 'net.minecraft.network.chat';

  interface CTEntityIngredient extends CommandStringDisplayable {}
  class CTEntityIngredient extends CommandStringDisplayable {
    asCompound(other: CTEntityIngredient): CTEntityIngredient;
    get commandString(): string;
    mapTo<T>(var1: Function<EntityType<any>, T>, var2: BiFunction<TagKey<EntityType<any>>, number, T>, var3: Function<Stream<T>, T>): T;
    matches(var1: EntityType<any>): boolean;
    matches(var1: EntityType<any>, var2: number): boolean;
    matches(var1: TagKey<EntityType<any>>): boolean;
    matches(var1: TagKey<EntityType<any>>, var2: number): boolean;
  }


  class INameTagFunction {
    apply(var1: Entity, var2: NameTagResult): void;
  }


  class NameTagResult {
    constructor(result: boolean, content: Component, originalContent: Component);
    alwaysRender(): void;
    get content(): Component;
    get originalContent(): Component;
    get result(): boolean;
    noRender(): void;
    set content(content: Component);
    setDefault(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.entity.CTEntityIngredient' {
  import { CTEntityIngredient } from 'com.blamejared.crafttweaker.api.entity';
  import { List } from 'java.util';
  import { EntityType } from 'net.minecraft.world.entity';
  import { TagKey } from 'net.minecraft.tags';
  import { Function, BiFunction } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Many } from 'com.blamejared.crafttweaker.api.util';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';

  interface CompoundEntityIngredient extends CTEntityIngredient {}
  class CompoundEntityIngredient extends CTEntityIngredient {
    constructor(elements: CTEntityIngredient[]);
    get commandString(): string;
    mapTo<T>(typeMapper: Function<EntityType<any>, T>, tagMapper: BiFunction<TagKey<EntityType<any>>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(type: EntityType<any>): boolean;
    matches(type: EntityType<any>, amount: number): boolean;
    matches(tag: TagKey<EntityType<any>>): boolean;
    matches(tag: TagKey<EntityType<any>>, amount: number): boolean;
  }


  interface EntityTagWithAmountIngredient extends CTEntityIngredient {}
  class EntityTagWithAmountIngredient extends CTEntityIngredient {
    constructor(tag: Many<KnownTag<EntityType<any>>>);
    get commandString(): string;
    mapTo<T>(typeMapper: Function<EntityType<any>, T>, tagMapper: BiFunction<TagKey<EntityType<any>>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(type: EntityType<any>): boolean;
    matches(type: EntityType<any>, amount: number): boolean;
    matches(tag: TagKey<EntityType<any>>): boolean;
    matches(tag: TagKey<EntityType<any>>, amount: number): boolean;
  }


  interface EntityTypeIngredient extends CTEntityIngredient {}
  class EntityTypeIngredient extends CTEntityIngredient {
    constructor(entityType: EntityType<any>);
    get commandString(): string;
    mapTo<T>(typeMapper: Function<EntityType<any>, T>, tagMapper: BiFunction<TagKey<EntityType<any>>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(type: EntityType<any>): boolean;
    matches(type: EntityType<any>, amount: number): boolean;
    matches(tag: TagKey<EntityType<any>>): boolean;
    matches(tag: TagKey<EntityType<any>>, amount: number): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.event.bus' {
  import { RuntimeException, Throwable, Class } from 'java.lang';
  import { Function, BiConsumer, Consumer } from 'java.util.function';
  import { TypeToken } from 'com.google.common.reflect';
  import { IEventCancellationCarrier, Phase } from 'com.blamejared.crafttweaker.api.event';

  class ArrayBackedDispatcher<T = any> {
    dispatch(event: T): void;
    register(dispatcher: IEventDispatcher<T>): IHandlerToken<T>;
    unregister(token: IHandlerToken<T>): void;
  }


  interface BusHandlingException extends RuntimeException {}
  class BusHandlingException extends RuntimeException {
    original(): Throwable;
  }


  interface CancelingEventBus<T = any> extends PhasedEventBus<T> {}
  class CancelingEventBus<T = any> extends PhasedEventBus<T> {
  }


  interface CommonAdaptingEventBusWire<P = any, C = any> extends IEventBusWire {}
  class CommonAdaptingEventBusWire<P = any, C = any> extends IEventBusWire {
    static of<C, P>(delegate: IEventBusWire, commonBus: IEventBus<C>, platformToCommon: Function<P, C>): IEventBusWire;
    static of<C, P>(delegate: IEventBusWire, commonBus: IEventBus<C>, platformToCommon: Function<P, C>, commonToPlatform: BiConsumer<C, P>): IEventBusWire;
    registerBusForDispatch<T>(eventType: TypeToken<T>, bus: IEventBus<T>): void;
  }


  interface CommonWirelessEventBusWire extends IEventBusWire {}
  class CommonWirelessEventBusWire extends IEventBusWire {
    static of(): IEventBusWire;
    registerBusForDispatch<T>(eventType: TypeToken<T>, bus: IEventBus<T>): void;
  }


  interface DirectEventBus<T = any> extends PhasedEventBus<T> {}
  class DirectEventBus<T = any> extends PhasedEventBus<T> {
  }


  class IEventBus<T = any> {
    static cancelable<T>(clazz: Class<T>, wire: IEventBusWire, carrier: IEventCancellationCarrier<T>): IEventBus<T>;
    static cancelable<T>(token: TypeToken<T>, wire: IEventBusWire, carrier: IEventCancellationCarrier<T>): IEventBus<T>;
    static direct<T>(clazz: Class<T>, wire: IEventBusWire): IEventBus<T>;
    static direct<T>(token: TypeToken<T>, wire: IEventBusWire): IEventBus<T>;
    eventType(): TypeToken<T>;
    post(var1: T): T;
    post(var1: Phase, var2: T): T;
    postCatching(var1: T, var2: Consumer<BusHandlingException>): T;
    postCatching(var1: Phase, var2: T, var3: Consumer<BusHandlingException>): T;
    registerHandler(var1: Consumer<T>): IHandlerToken<T>;
    registerHandler(var1: Phase, var2: Consumer<T>): IHandlerToken<T>;
    registerHandler(var1: boolean, var2: Consumer<T>): IHandlerToken<T>;
    registerHandler(var1: Phase, var2: boolean, var3: Consumer<T>): IHandlerToken<T>;
    unregisterHandler(var1: IHandlerToken<T>): void;
  }


  class IEventBusWire {
    registerBusForDispatch<T>(var1: TypeToken<T>, var2: IEventBus<T>): void;
  }


  class IEventDispatcher<T = any> {
    dispatch(var1: T): void;
  }


  class IHandlerToken<T = any> {
  }


  interface NeoForgeEventBusWire extends IEventBusWire {}
  class NeoForgeEventBusWire extends IEventBusWire {
    static of(): IEventBusWire;
    registerBusForDispatch<T>(eventType: TypeToken<T>, bus: IEventBus<T>): void;
  }


  interface PhasedEventBus<T = any> extends IEventBus<T> {}
  class PhasedEventBus<T = any> extends IEventBus<T> {
    eventType(): TypeToken<T>;
    post(event: T): T;
    post(phase: Phase, event: T): T;
    postCatching(event: T, exceptionHandler: Consumer<BusHandlingException>): T;
    postCatching(phase: Phase, event: T, exceptionHandler: Consumer<BusHandlingException>): T;
    registerHandler(handler: Consumer<T>): IHandlerToken<T>;
    registerHandler(phase: Phase, handler: Consumer<T>): IHandlerToken<T>;
    registerHandler(listenToCanceled: boolean, handler: Consumer<T>): IHandlerToken<T>;
    registerHandler(phase: Phase, listenToCanceled: boolean, handler: Consumer<T>): IHandlerToken<T>;
    unregisterHandler(token: IHandlerToken<T>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.event' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { TypeToken } from 'com.google.common.reflect';
  import { Class, Enum } from 'java.lang';
  import { List } from 'java.util';

  class IEventCancellationCarrier<T = any> {
    cancel(var1: T): void;
    isCanceled(var1: T): boolean;
  }


  class IEventRegistry {
    busOf<T>(var1: TypeToken<T>): IEventBus<T>;
    busOf<T>(clazz: Class<T>): IEventBus<T>;
  }


  interface NeoForgeEventCancellationCarrier<T extends ICancellableEvent = any> extends IEventCancellationCarrier<T> {}
  class NeoForgeEventCancellationCarrier<T extends ICancellableEvent = any> extends IEventCancellationCarrier<T> {
    cancel(event: T): void;
    isCanceled(event: T): boolean;
    static of<T>(): IEventCancellationCarrier<T>;
  }


  interface Phase extends Enum<Phase> {}
  class Phase extends Enum<Phase> {
    static readonly EARLIEST: Phase;
    static readonly NORMAL: Phase;
    static readonly LATEST: Phase;
    static valueOf(name: string): Phase;
    static values(): Phase[];
  }

}

declare module 'com.blamejared.crafttweaker.api.fluid' {
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Supplier, Function, BiFunction, UnaryOperator } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Integer } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { List } from 'java.util';
  import { DataComponentHolder, DataComponentPatch, PatchedDataComponentMap, DataComponentType, DataComponentMap } from 'net.minecraft.core.component';
  import { ComponentAccess } from 'com.blamejared.crafttweaker.api.component';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Codec } from 'com.mojang.serialization';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';

  interface CTFluidIngredient extends CommandStringDisplayable {}
  class CTFluidIngredient extends CommandStringDisplayable {
    static readonly EMPTY: Supplier;
    asCompound(other: CTFluidIngredient): CTFluidIngredient;
    contains(other: CTFluidIngredient): boolean;
    get commandString(): string;
    get matchingStacks(): IFluidStack[];
    mapTo<T>(var1: Function<IFluidStack, T>, var2: BiFunction<TagKey<Fluid>, number, T>, var3: Function<Stream<T>, T>): T;
    matches(var1: Fluid): boolean;
    matches(var1: IFluidStack): boolean;
    matches(var1: TagKey<Fluid>): boolean;
    matches(var1: TagKey<Fluid>, var2: number): boolean;
  }


  class FluidStackConstants {
  }


  interface IFluidStack extends CommandStringDisplayable, DataComponentHolder, ComponentAccess<IFluidStack> {}
  class IFluidStack extends CommandStringDisplayable {
    _get<U>(componentType: DataComponentType<U>): U;
    _has<U>(componentType: DataComponentType<U>): boolean;
    _with<U>(componentType: DataComponentType<U>, value: U): IFluidStack;
    _without<U>(componentType: DataComponentType<U>): IFluidStack;
    applyComponents(var1: DataComponentMap): IFluidStack;
    applyComponents(var1: DataComponentPatch): IFluidStack;
    asFluidIngredient(): CTFluidIngredient;
    asIData(): IData;
    asImmutable(): IFluidStack;
    asList(other: CTFluidIngredient): CTFluidIngredient;
    asMutable(): IFluidStack;
    codec(): Codec<IFluidStack>;
    copy(): IFluidStack;
    static empty(): IFluidStack;
    get amount(): number;
    get commandString(): string;
    get components(): PatchedDataComponentMap;
    get fluid(): Fluid;
    get immutableInternal<T>(): T;
    get internal<T>(): T;
    get registryName(): ResourceLocation;
    isEmpty(): boolean;
    isFluidEqual(other: IFluidStack): boolean;
    isImmutable(): boolean;
    matches(other: IFluidStack): boolean;
    static of<T>(convertable: T): IFluidStack;
    static of(fluid: Fluid, amount: number): IFluidStack;
    static of(fluid: Fluid, amount: number, components: DataComponentPatch): IFluidStack;
    static of<T>(convertable: T, mutable: boolean): IFluidStack;
    static of(fluid: Fluid, amount: number, mutable: boolean): IFluidStack;
    static of(fluid: Fluid, amount: number, components: DataComponentPatch, mutable: boolean): IFluidStack;
    static ofMutable<T>(convertable: T): IFluidStack;
    static ofMutable(fluid: Fluid, amount: number): IFluidStack;
    static ofMutable(fluid: Fluid, amount: number, components: DataComponentPatch): IFluidStack;
    remove<T>(var1: DataComponentType<T>): IFluidStack;
    set amount(var1: number);
    update<T, U>(var1: DataComponentType<T>, var2: T, var3: U, var4: BiFunction<T, U, T>): IFluidStack;
    update<T>(var1: DataComponentType<T>, var2: T, var3: UnaryOperator<T>): IFluidStack;
    with<T>(var1: DataComponentType<T>, var2: T): IFluidStack;
    withJsonComponent(var1: DataComponentType, var2: IData): IFluidStack;
    withJsonComponents(var1: IData): IFluidStack;
    without<T>(type: DataComponentType<T>): IFluidStack;
  }


  interface MCFluidStack extends IFluidStack {}
  class MCFluidStack extends IFluidStack {
    constructor(fluidStack: FluidStack);
    applyComponents(map: DataComponentMap): IFluidStack;
    applyComponents(patch: DataComponentPatch): IFluidStack;
    asIData(): IData;
    codec(): Codec<IFluidStack>;
    equals(o: any): boolean;
    get amount(): number;
    get components(): PatchedDataComponentMap;
    get fluid(): Fluid;
    get immutableInternal(): FluidStack;
    get immutableInternal<T>(): T;
    get internal(): FluidStack;
    get internal<T>(): T;
    hashCode(): number;
    isEmpty(): boolean;
    isImmutable(): boolean;
    remove<T>(type: DataComponentType<T>): IFluidStack;
    set amount(amount: number);
    update<T, U>(type: DataComponentType<T>, defaultValue: T, data: U, operator: BiFunction<T, U, T>): IFluidStack;
    update<T>(type: DataComponentType<T>, defaultValue: T, operator: UnaryOperator<T>): IFluidStack;
    with<T>(type: DataComponentType<T>, value: T): IFluidStack;
    withJsonComponent(type: DataComponentType, value: IData): IFluidStack;
    withJsonComponents(value: IData): IFluidStack;
  }


  interface MCFluidStackMutable extends IFluidStack {}
  class MCFluidStackMutable extends IFluidStack {
    constructor(stack: FluidStack);
    applyComponents(map: DataComponentMap): IFluidStack;
    applyComponents(patch: DataComponentPatch): IFluidStack;
    codec(): Codec<IFluidStack>;
    equals(o: any): boolean;
    get amount(): number;
    get components(): PatchedDataComponentMap;
    get fluid(): Fluid;
    get immutableInternal(): FluidStack;
    get immutableInternal<T>(): T;
    get internal(): FluidStack;
    get internal<T>(): T;
    hashCode(): number;
    isEmpty(): boolean;
    isImmutable(): boolean;
    remove<T>(type: DataComponentType<T>): IFluidStack;
    set amount(amount: number);
    update<T, U>(type: DataComponentType<T>, defaultValue: T, data: U, operator: BiFunction<T, U, T>): IFluidStack;
    update<T>(type: DataComponentType<T>, defaultValue: T, operator: UnaryOperator<T>): IFluidStack;
    with<T>(type: DataComponentType<T>, value: T): IFluidStack;
    withJsonComponent(type: DataComponentType, value: IData): IFluidStack;
    withJsonComponents(value: IData): IFluidStack;
  }

}

declare module 'com.blamejared.crafttweaker.api.fluid.CTFluidIngredient' {
  import { CTFluidIngredient, IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { List } from 'java.util';
  import { Function, BiFunction } from 'java.util.function';
  import { TagKey } from 'net.minecraft.tags';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Integer } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Many } from 'com.blamejared.crafttweaker.api.util';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';

  interface CompoundFluidIngredient extends CTFluidIngredient {}
  class CompoundFluidIngredient extends CTFluidIngredient {
    constructor(elements: CTFluidIngredient[]);
    get commandString(): string;
    get elements(): CTFluidIngredient[];
    get matchingStacks(): IFluidStack[];
    mapTo<T>(fluidMapper: Function<IFluidStack, T>, tagMapper: BiFunction<TagKey<Fluid>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(fluid: Fluid): boolean;
    matches(fluidStack: IFluidStack): boolean;
    matches(fluidTag: TagKey<Fluid>): boolean;
    matches(fluidTag: TagKey<Fluid>, amount: number): boolean;
  }


  interface FluidStackIngredient extends CTFluidIngredient {}
  class FluidStackIngredient extends CTFluidIngredient {
    constructor(fluidStack: IFluidStack);
    get commandString(): string;
    get matchingStacks(): IFluidStack[];
    mapTo<T>(fluidMapper: Function<IFluidStack, T>, tagMapper: BiFunction<TagKey<Fluid>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(fluid: Fluid): boolean;
    matches(fluidStack: IFluidStack): boolean;
    matches(fluidTag: TagKey<Fluid>): boolean;
    matches(fluidTag: TagKey<Fluid>, amount: number): boolean;
  }


  interface FluidTagWithAmountIngredient extends CTFluidIngredient {}
  class FluidTagWithAmountIngredient extends CTFluidIngredient {
    constructor(tag: Many<KnownTag<Fluid>>);
    get commandString(): string;
    get matchingStacks(): IFluidStack[];
    mapTo<T>(fluidMapper: Function<IFluidStack, T>, tagMapper: BiFunction<TagKey<Fluid>, number, T>, compoundMapper: Function<Stream<T>, T>): T;
    matches(fluid: Fluid): boolean;
    matches(fluidStack: IFluidStack): boolean;
    matches(fluidTag: TagKey<Fluid>): boolean;
    matches(fluidTag: TagKey<Fluid>, amount: number): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.game' {
  import { Collection } from 'java.util';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { EntityType } from 'net.minecraft.world.entity';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';

  class Game {
    static readonly INSTANCE: Game;
    get blockStates(): Collection<BlockState>;
    get blocks(): Collection<Block>;
    get enchantments(): Collection<Enchantment>;
    get entityTypes(): Collection<EntityType>;
    get fluids(): Collection<Fluid>;
    get itemStacks(): Collection<IItemStack>;
    get mobEffects(): Collection<MobEffect>;
    get potions(): Collection<Potion>;
    get recipeTypes(): Collection<IRecipeManager>;
    get villagerProfessions(): Collection<VillagerProfession>;
    localize(translationKey: string): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.condition' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Predicate } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { List } from 'java.util';

  class IIngredientCondition {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    componentFilter(): Predicate<DataComponentType<any>>;
    get serializer(): IIngredientConditionSerializer<IIngredientCondition>;
    get type(): ResourceLocation;
    getCommandString(var1: string): string;
    matches(var1: IItemStack): boolean;
  }


  class IIngredientConditionSerializer<T extends IIngredientCondition = any> {
    static readonly CODEC: Codec;
    codec(): MapCodec<T>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }


  interface IngredientConditions extends Predicate<IItemStack> {}
  class IngredientConditions extends Predicate<IItemStack> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static EMPTY: IngredientConditions;
    constructor();

    constructor(conditions: IIngredientCondition[]);
    add(transformer: IIngredientCondition): void;
    componentFilter(): Predicate<DataComponentType<any>>;
    conditions(): IIngredientCondition[];
    copy(): IngredientConditions;
    equals(o: any): boolean;
    getCommandString(base: string): string;
    hashCode(): number;
    isEmpty(): boolean;
    test(stack: IItemStack): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.condition.serializer' {
  import { IIngredientConditionSerializer } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { ConditionAnyDamage, ConditionCustom, ConditionDamagedAtLeast, ConditionDamagedAtMost, ConditionDamaged } from 'com.blamejared.crafttweaker.api.ingredient.condition.type';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ConditionAnyDamagedSerializer extends IIngredientConditionSerializer<ConditionAnyDamage> {}
  class ConditionAnyDamagedSerializer extends IIngredientConditionSerializer<ConditionAnyDamage> {
    static readonly INSTANCE: ConditionAnyDamagedSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConditionAnyDamage>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConditionAnyDamage>;
  }


  interface ConditionCustomSerializer extends IIngredientConditionSerializer<ConditionCustom> {}
  class ConditionCustomSerializer extends IIngredientConditionSerializer<ConditionCustom> {
    static readonly INSTANCE: ConditionCustomSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConditionCustom>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConditionCustom>;
  }


  interface ConditionDamagedAtLeastSerializer extends IIngredientConditionSerializer<ConditionDamagedAtLeast> {}
  class ConditionDamagedAtLeastSerializer extends IIngredientConditionSerializer<ConditionDamagedAtLeast> {
    static readonly INSTANCE: ConditionDamagedAtLeastSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConditionDamagedAtLeast>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConditionDamagedAtLeast>;
  }


  interface ConditionDamagedAtMostSerializer extends IIngredientConditionSerializer<ConditionDamagedAtMost> {}
  class ConditionDamagedAtMostSerializer extends IIngredientConditionSerializer<ConditionDamagedAtMost> {
    static readonly INSTANCE: ConditionDamagedAtMostSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConditionDamagedAtMost>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConditionDamagedAtMost>;
  }


  interface ConditionDamagedSerializer extends IIngredientConditionSerializer<ConditionDamaged> {}
  class ConditionDamagedSerializer extends IIngredientConditionSerializer<ConditionDamaged> {
    static readonly INSTANCE: ConditionDamagedSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ConditionDamaged>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ConditionDamaged>;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.condition.type' {
  import { IIngredientCondition } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Predicate } from 'java.util.function';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { ConditionAnyDamagedSerializer, ConditionCustomSerializer, ConditionDamagedSerializer } from 'com.blamejared.crafttweaker.api.ingredient.condition.serializer';

  interface ConditionAnyDamage extends IIngredientCondition {}
  class ConditionAnyDamage extends IIngredientCondition {
    static readonly INSTANCE: ConditionAnyDamage;
    componentFilter(): Predicate<DataComponentType<any>>;
    equals(o: any): boolean;
    get serializer(): ConditionAnyDamagedSerializer;
    getCommandString(base: string): string;
    hashCode(): number;
    matches(stack: IItemStack): boolean;
  }


  interface ConditionCustom extends IIngredientCondition {}
  class ConditionCustom extends IIngredientCondition {
    constructor(uid: string);

    constructor(uid: string, functionParameter: Predicate<IItemStack>);
    equals(o: any): boolean;
    get serializer(): ConditionCustomSerializer;
    get uid(): string;
    getCommandString(base: string): string;
    hashCode(): number;
    matches(stack: IItemStack): boolean;
  }


  interface ConditionDamaged extends IIngredientCondition {}
  class ConditionDamaged extends IIngredientCondition {
    static readonly INSTANCE: ConditionDamaged;
    componentFilter(): Predicate<DataComponentType<any>>;
    equals(o: any): boolean;
    get serializer(): ConditionDamagedSerializer;
    getCommandString(base: string): string;
    hashCode(): number;
    matches(stack: IItemStack): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient' {
  import { IData, MapData } from 'com.blamejared.crafttweaker.api.data';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipFunction } from 'com.blamejared.crafttweaker.api.item.tooltip';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Operation } from 'AttributeModifier';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { UUID } from 'java.util';
  import { IIngredientList } from 'com.blamejared.crafttweaker.api.ingredient.type';
  import { IngredientTransformers, IIngredientTransformer } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { Function, Predicate } from 'java.util.function';
  import { IngredientConditions, IIngredientCondition } from 'com.blamejared.crafttweaker.api.ingredient.condition';

  class ExpandIIngredientArray {
    static asIData(instance: IIngredient[]): IData;
  }


  interface IIngredient extends CommandStringDisplayable {}
  class IIngredient extends CommandStringDisplayable {
    static readonly INGREDIENT_ID: ResourceLocation;
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    addGlobalAttributeModifier(attribute: Attribute, id: ResourceLocation, value: number, operation: Operation, slotTypes: EquipmentSlot[]): void;
    addShiftTooltip(content: Component, showMessage: Component): void;
    addTooltip(content: Component): void;
    anyDamage(): IIngredient;
    asIData(): IData;
    asIIngredientWithAmount(): IIngredientWithAmount;
    asMapData(): MapData;
    asVanillaIngredient(): Ingredient;
    clearTooltip(leaveName: boolean): void;
    condition(condition: IIngredientCondition): IIngredient;
    conditions(): IngredientConditions;
    contains(ingredient: IIngredient): boolean;
    static fromIngredient(ingredient: Ingredient): IIngredient;
    get commandString(): string;
    get items(): IItemStack[];
    getRemainingItem(stack: IItemStack): IItemStack;
    isEmpty(): boolean;
    matches(var1: IItemStack): boolean;
    modifyShiftTooltip(shiftedFunction: ITooltipFunction, unshiftedFunction: ITooltipFunction): void;
    modifyTooltip(functionParameter: ITooltipFunction): void;
    mul(amount: number): IIngredientWithAmount;
    onlyDamaged(): IIngredient;
    onlyDamagedAtLeast(minDamage: number): IIngredient;
    onlyDamagedAtMost(maxDamage: number): IIngredient;
    onlyIf(uid: string, functionParameter: Predicate<IItemStack>): IIngredient;
    or(other: IIngredient): IIngredientList;
    removeGlobalAttribute(attribute: Attribute, slotTypes: EquipmentSlot[]): void;
    removeGlobalAttributeModifier(uuid: string, slotTypes: EquipmentSlot[]): void;
    removeGlobalAttributeModifier(uuid: UUID, slotTypes: EquipmentSlot[]): void;
    removeTooltip(regex: string): void;
    reuse(): IIngredient;
    setBurnTime(time: number): void;
    transform(transformer: IIngredientTransformer): IIngredient;
    transformCustom(uid: string, functionParameter: Function<IItemStack, IItemStack>): IIngredient;
    transformDamage(amount: number): IIngredient;
    transformReplace(replaceWith: IItemStack): IIngredient;
    transformers(): IngredientTransformers;
  }


  interface IIngredientWithAmount extends CommandStringDisplayable {}
  class IIngredientWithAmount extends CommandStringDisplayable {
    amount(): number;
    asIData(): IData;
    ingredient(): IIngredient;
  }


  class IngredientCacheBuster {
    static claim(): void;
    static claimed(): boolean;
    static release(): void;
    static store(ingredient: Ingredient): void;
  }


  class IngredientConverter {
    static fromIngredient(ingredient: Ingredient): IIngredient;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.transformer' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UnaryOperator } from 'java.util.function';
  import { List } from 'java.util';

  class IIngredientTransformer {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    get serializer(): IIngredientTransformerSerializer<any>;
    getCommandString(var1: string): string;
    transform(var1: IItemStack): IItemStack;
  }


  class IIngredientTransformerSerializer<T extends IIngredientTransformer = any> {
    static readonly CODEC: Codec;
    codec(): MapCodec<T>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }


  interface IngredientTransformers extends UnaryOperator<IItemStack> {}
  class IngredientTransformers extends UnaryOperator<IItemStack> {
    static readonly CODEC: Codec;
    static readonly STREAM_CODEC: StreamCodec;
    static readonly EMPTY: IngredientTransformers;
    constructor();

    constructor(transformers: IIngredientTransformer[]);
    add(transformer: IIngredientTransformer): void;
    apply(inParameter: IItemStack): IItemStack;
    copy(): IngredientTransformers;
    equals(o: any): boolean;
    getCommandString(base: string): string;
    hashCode(): number;
    isEmpty(): boolean;
    transformers(): IIngredientTransformer[];
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.transformer.serializer' {
  import { IIngredientTransformerSerializer } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { TransformCustom, TransformDamage, TransformReplace, TransformReuse } from 'com.blamejared.crafttweaker.api.ingredient.transformer.type';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface TransformCustomSerializer extends IIngredientTransformerSerializer<TransformCustom> {}
  class TransformCustomSerializer extends IIngredientTransformerSerializer<TransformCustom> {
    static readonly INSTANCE: TransformCustomSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<TransformCustom>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, TransformCustom>;
  }


  interface TransformDamageSerializer extends IIngredientTransformerSerializer<TransformDamage> {}
  class TransformDamageSerializer extends IIngredientTransformerSerializer<TransformDamage> {
    static readonly INSTANCE: TransformDamageSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<TransformDamage>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, TransformDamage>;
  }


  interface TransformReplaceSerializer extends IIngredientTransformerSerializer<TransformReplace> {}
  class TransformReplaceSerializer extends IIngredientTransformerSerializer<TransformReplace> {
    static readonly INSTANCE: TransformReplaceSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<TransformReplace>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, TransformReplace>;
  }


  interface TransformReuseSerializer extends IIngredientTransformerSerializer<TransformReuse> {}
  class TransformReuseSerializer extends IIngredientTransformerSerializer<TransformReuse> {
    static readonly INSTANCE: TransformReuseSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<TransformReuse>;
    get type(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, TransformReuse>;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.transformer.type' {
  import { IIngredientTransformer } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { Map } from 'java.util';
  import { Function } from 'java.util.function';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { TransformCustomSerializer, TransformReuseSerializer } from 'com.blamejared.crafttweaker.api.ingredient.transformer.serializer';

  interface TransformCustom extends IIngredientTransformer {}
  class TransformCustom extends IIngredientTransformer {
    static readonly KNOWN_TRANSFORMERS: Map;
    constructor(uid: string);

    constructor(uid: string, functionParameter: Function<IItemStack, IItemStack>);
    equals(o: any): boolean;
    get serializer(): TransformCustomSerializer;
    get uid(): string;
    getCommandString(base: string): string;
    hashCode(): number;
    transform(stack: IItemStack): IItemStack;
  }


  interface TransformReuse extends IIngredientTransformer {}
  class TransformReuse extends IIngredientTransformer {
    static readonly INSTANCE: TransformReuse;
    get serializer(): TransformReuseSerializer;
    getCommandString(base: string): string;
    transform(stack: IItemStack): IItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.type' {
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IIngredientTransformer, IngredientTransformers } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { IIngredientCondition, IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { Predicate } from 'java.util.function';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { Value } from 'Ingredient';
  import { TagKey } from 'net.minecraft.tags';

  interface IIngredientAny extends IIngredient {}
  class IIngredientAny extends IIngredient {
    static readonly ID: ResourceLocation;
    static readonly INSTANCE: IIngredientAny;
    asVanillaIngredient(): Ingredient;
    condition(condition: IIngredientCondition): IIngredient;
    conditions(): IngredientConditions;
    get commandString(): string;
    static get instance(): IIngredientAny;
    get items(): IItemStack[];
    matches(stack: IItemStack): boolean;
    transform(transformer: IIngredientTransformer): IIngredient;
    transformers(): IngredientTransformers;
  }


  interface IIngredientEmpty extends IIngredient {}
  class IIngredientEmpty extends IIngredient {
    static readonly INSTANCE: IIngredientEmpty;
    asVanillaIngredient(): Ingredient;
    condition(condition: IIngredientCondition): IIngredient;
    conditions(): IngredientConditions;
    get commandString(): string;
    static get instance(): IIngredientEmpty;
    get items(): IItemStack[];
    isEmpty(): boolean;
    matches(stack: IItemStack): boolean;
    transform(transformer: IIngredientTransformer): IIngredient;
    transformers(): IngredientTransformers;
  }


  interface IIngredientList extends IIngredient {}
  class IIngredientList extends IIngredient {
    static readonly ID: ResourceLocation;
    constructor(ingredients: IIngredient[]);
    asVanillaIngredient(): Ingredient;
    condition(condition: IIngredientCondition): IIngredient;
    conditions(): IngredientConditions;
    equals(o: any): boolean;
    get commandString(): string;
    get ingredients(): IIngredient[];
    get items(): IItemStack[];
    getRemainingItem(stack: IItemStack): IItemStack;
    hashCode(): number;
    isEmpty(): boolean;
    matches(stack: IItemStack): boolean;
    or(other: IIngredient): IIngredientList;
    toString(): string;
    transform(transformer: IIngredientTransformer): IIngredient;
    transformers(): IngredientTransformers;
  }


  interface IngredientCraftTweakerBase extends Predicate<ItemStack> {}
  class IngredientCraftTweakerBase extends Predicate<ItemStack> {
    get crTIngredient(): IIngredient;
    static getValues(items: IItemStack[]): Stream<Value>;
    isSimple(): boolean;
    test(stack: ItemStack): boolean;
  }


  interface TagIngredient extends IIngredient {}
  class TagIngredient extends IIngredient {
    constructor(key: TagKey<Item>);
    asVanillaIngredient(): Ingredient;
    conditions(): IngredientConditions;
    get commandString(): string;
    get items(): IItemStack[];
    key(): TagKey<Item>;
    matches(stack: IItemStack): boolean;
    toString(): string;
    transformers(): IngredientTransformers;
  }


  interface WrappingIIngredient extends IIngredient {}
  class WrappingIIngredient extends IIngredient {
    constructor(ingredient: Ingredient, commandString: string);
    asVanillaIngredient(): Ingredient;
    conditions(): IngredientConditions;
    get commandString(): string;
    get items(): IItemStack[];
    isEmpty(): boolean;
    matches(stack: IItemStack): boolean;
    transformers(): IngredientTransformers;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.vanilla' {
  class CraftTweakerIngredients {
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.vanilla.CraftTweakerIngredients' {
  import { IngredientType, ICustomIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { List } from 'java.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';

  class Types {
    static readonly ANY: IngredientType;
    static readonly LIST: IngredientType;
    static readonly CRAFTTWEAKER: IngredientType;
    static readonly IITEMSTACK: IngredientType;
  }


  class Ingredients {
    static any(): ICustomIngredient;
    static crafttweaker<T extends IIngredient>(internal: T): ICustomIngredient;
    static iitemstack(internal: IItemStack): ICustomIngredient;
    static list(children: Ingredient[]): ICustomIngredient;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.vanilla.serializer' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { IngredientAny, IngredientCraftTweaker, IngredientIItemStack, IngredientList } from 'com.blamejared.crafttweaker.api.ingredient.vanilla.type';

  class CraftTweakerVanillaIngredientSerializer<T extends CraftTweakerVanillaIngredient = any> {
    codec(): MapCodec<T>;
    get id(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
  }


  interface IngredientAnySerializer extends CraftTweakerVanillaIngredientSerializer<IngredientAny> {}
  class IngredientAnySerializer extends CraftTweakerVanillaIngredientSerializer<IngredientAny> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    static INSTANCE: IngredientAnySerializer;
    codec(): MapCodec<IngredientAny>;
    get id(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, IngredientAny>;
  }


  interface IngredientCraftTweakerSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientCraftTweaker> {}
  class IngredientCraftTweakerSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientCraftTweaker> {
    static readonly INSTANCE: IngredientCraftTweakerSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<IngredientCraftTweaker<any>>;
    get id(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, IngredientCraftTweaker<any>>;
  }


  interface IngredientIItemStackSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientIItemStack> {}
  class IngredientIItemStackSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientIItemStack> {
    static readonly INSTANCE: IngredientIItemStackSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<IngredientIItemStack>;
    get id(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, IngredientIItemStack>;
  }


  interface IngredientListSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientList> {}
  class IngredientListSerializer extends CraftTweakerVanillaIngredientSerializer<IngredientList> {
    static readonly INSTANCE: IngredientListSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<IngredientList>;
    get id(): ResourceLocation;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, IngredientList>;
  }

}

declare module 'com.blamejared.crafttweaker.api.ingredient.vanilla.type' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { CraftTweakerVanillaIngredientSerializer, IngredientAnySerializer, IngredientCraftTweakerSerializer, IngredientIItemStackSerializer, IngredientListSerializer } from 'com.blamejared.crafttweaker.api.ingredient.vanilla.serializer';
  import { Stream } from 'java.util.stream';
  import { Value } from 'Ingredient';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IngredientCraftTweakerBase } from 'com.blamejared.crafttweaker.api.ingredient.type';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class CraftTweakerVanillaIngredient {
    get matchingStacks(): ItemStack[];
    isEmpty(): boolean;
    requiresTesting(): boolean;
    serializer<T extends CraftTweakerVanillaIngredient>(): CraftTweakerVanillaIngredientSerializer<T>;
    singleton(): boolean;
    test(var1: ItemStack): boolean;
    values(): Stream<Value>;
  }


  interface IngredientAny extends CraftTweakerVanillaIngredient {}
  class IngredientAny extends CraftTweakerVanillaIngredient {
    get matchingStacks(): ItemStack[];
    static ingredient(): Ingredient;
    isEmpty(): boolean;
    static of(): IngredientAny;
    requiresTesting(): boolean;
    serializer(): IngredientAnySerializer;
    serializer<T extends CraftTweakerVanillaIngredient>(): CraftTweakerVanillaIngredientSerializer<T>;
    test(stack: ItemStack): boolean;
  }


  interface IngredientCraftTweaker<T extends IIngredient = any> extends CraftTweakerVanillaIngredient, IngredientCraftTweakerBase {}
  class IngredientCraftTweaker<T extends IIngredient = any> extends CraftTweakerVanillaIngredient {
    equals(o: any): boolean;
    get crTIngredient(): T;
    get matchingStacks(): ItemStack[];
    hashCode(): number;
    static ingredient<T extends IIngredient>(internal: T): Ingredient;
    isEmpty(): boolean;
    static of<T extends IIngredient>(crtIngredient: T): IngredientCraftTweaker<T>;
    requiresTesting(): boolean;
    serializer(): IngredientCraftTweakerSerializer;
    serializer<T extends CraftTweakerVanillaIngredient>(): CraftTweakerVanillaIngredientSerializer<T>;
    test(stack: ItemStack): boolean;
  }


  interface IngredientIItemStack extends CraftTweakerVanillaIngredient, IngredientCraftTweakerBase {}
  class IngredientIItemStack extends CraftTweakerVanillaIngredient {
    get crTIngredient(): IItemStack;
    get matchingStacks(): ItemStack[];
    static ingredient(internal: IItemStack): Ingredient;
    isEmpty(): boolean;
    static of(crtIngredient: IItemStack): IngredientIItemStack;
    requiresTesting(): boolean;
    serializer(): IngredientIItemStackSerializer;
    serializer<T extends CraftTweakerVanillaIngredient>(): CraftTweakerVanillaIngredientSerializer<T>;
    test(stack: ItemStack): boolean;
    toString(): string;
  }


  interface IngredientList extends CraftTweakerVanillaIngredient {}
  class IngredientList extends CraftTweakerVanillaIngredient {
    equals(o: any): boolean;
    get children(): Ingredient[];
    get matchingStacks(): ItemStack[];
    hashCode(): number;
    static ingredient(children: Ingredient[]): Ingredient;
    isEmpty(): boolean;
    static of(children: Ingredient[]): IngredientList;
    requiresTesting(): boolean;
    serializer(): IngredientListSerializer;
    serializer<T extends CraftTweakerVanillaIngredient>(): CraftTweakerVanillaIngredientSerializer<T>;
    test(stack: ItemStack): boolean;
    toString(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.item.attribute' {
  import { Multimap } from 'com.google.common.collect';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { Collection } from 'java.util';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';

  class ItemAttributeModifierBase {
    addModifier(var1: Attribute, var2: AttributeModifier): boolean;
    clearModifiers(): void;
    get itemStack(): ItemStack;
    get modifiers(): Multimap<Attribute, AttributeModifier>;
    get originalModifiers(): Multimap<Attribute, AttributeModifier>;
    get slotType(): EquipmentSlot;
    removeAttribute(var1: Attribute): Collection<AttributeModifier>;
    removeModifier(var1: Attribute, var2: AttributeModifier): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.item' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { NullableT } from '@ZenCodeType';
  import { Class, Void } from 'java.lang';
  import { ItemCapability } from 'net.neoforged.neoforge.capabilities';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { IngredientTransformers } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { Consumer } from 'java.util.function';

  class ExpandIItemStackNeoForge {
    static canPerformAction(internal: IItemStack, action: ItemAbility): boolean;
    static getBurnTime(internal: IItemStack, manager: IRecipeManager<any>): number;
    static getCapability<T>(internal: IItemStack, tClass: Class<T>, cap: ItemCapability<T, Void>): NullableT;
    static getCapabilityWithContext<T, C>(internal: IItemStack, tClass: Class<T>, cClass: Class<C>, cap: ItemCapability<T, C>, context: C): NullableT;
    static setBurnTime(internal: IItemStack, time: number, manager: IRecipeManager<any>): void;
  }


  class IItemStackConstants {
  }


  interface MCItemStack extends NeoForgeItemStack {}
  class MCItemStack extends NeoForgeItemStack {
    constructor(internal: ItemStack);

    constructor(internal: ItemStack, conditions: IngredientConditions, transformers: IngredientTransformers);
    asImmutable(): IItemStack;
    asMutable(): IItemStack;
    conditions(): IngredientConditions;
    copy(): IItemStack;
    equals(o: any): boolean;
    get internal(): ItemStack;
    get items(): IItemStack[];
    hashCode(): number;
    isImmutable(): boolean;
    modify(stackModifier: Consumer<ItemStack>): IItemStack;
    modifyThis(modifier: Consumer<IItemStack>): IItemStack;
    toString(): string;
    transformers(): IngredientTransformers;
  }


  interface MCItemStackMutable extends NeoForgeItemStack {}
  class MCItemStackMutable extends NeoForgeItemStack {
    constructor(internal: ItemStack);

    constructor(internal: ItemStack, conditions: IngredientConditions, transformers: IngredientTransformers);
    asImmutable(): IItemStack;
    asMutable(): IItemStack;
    conditions(): IngredientConditions;
    copy(): IItemStack;
    equals(o: any): boolean;
    get internal(): ItemStack;
    get items(): IItemStack[];
    hashCode(): number;
    isImmutable(): boolean;
    modify(stackModifier: Consumer<ItemStack>): IItemStack;
    modifyThis(modifier: Consumer<IItemStack>): IItemStack;
    toString(): string;
    transformers(): IngredientTransformers;
  }


  interface NeoForgeItemStack extends IItemStack {}
  class NeoForgeItemStack extends IItemStack {
    getBurnTime(manager: IRecipeManager<any>): number;
    setBurnTime(time: number, manager: IRecipeManager<any>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.item.tooltip' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipContext } from 'Item';
  import { TooltipFlag } from 'net.minecraft.world.item';

  class ITooltipFunction {
    apply(var1: IItemStack, var2: Component[], var3: TooltipContext, var4: TooltipFlag): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.level' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { MapData, IData } from 'com.blamejared.crafttweaker.api.data';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface CraftTweakerSavedData extends SavedData {}
  class CraftTweakerSavedData extends SavedData {
    constructor();

    constructor(data: MapData);
    get data(): IData;
    isDirty(): boolean;
    static load(tag: CompoundTag, lookup: Provider): CraftTweakerSavedData;
    save(tag: CompoundTag, lookup: Provider): CompoundTag;
    set data(data: MapData);
    updateData(data: IData): void;
  }


  class CraftTweakerSavedDataHolder {
    crafttweaker$getSavedData(): CraftTweakerSavedData;
  }

}

declare module 'com.blamejared.crafttweaker.api.logging' {
  import { Logger } from 'org.apache.logging.log4j';

  class CommonLoggers {
    static api(): Logger;
    static commands(): Logger;
    static zenCode(): Logger;
  }


  class ILoggerRegistry {
    getLoggerFor(var1: string): Logger;
  }

}

declare module 'com.blamejared.crafttweaker.api.loot.condition' {
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Builder } from 'LootItemCondition';
  import { Predicate } from 'java.util.function';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';

  class LootConditions {
    static allOf(...conditions: LootItemCondition[]): LootConditions;
    static allOf(...builders: Builder[]): LootConditions;
    static anyOf(...builders: Builder[]): LootConditions;
    gather(): Predicate<LootContext>;
    static none(): LootConditions;
    static noneOf(...conditions: LootItemCondition[]): LootConditions;
    static noneOf(...builders: Builder[]): LootConditions;
    static notAllOf(...builders: Builder[]): LootConditions;
    static only(condition: LootItemCondition): LootConditions;
    static only(builder: Builder): LootConditions;
    static randomlyIn(percentageChance: number): LootConditions;
  }

}

declare module 'com.blamejared.crafttweaker.api.loot' {
  import { LootModifierManager } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { LootTableManager } from 'com.blamejared.crafttweaker.api.loot.table';

  class LootManager {
    static readonly INSTANCE: LootManager;
    get modifierManager(): LootModifierManager;
    get tableManager(): LootTableManager;
  }

}

declare module 'com.blamejared.crafttweaker.api.loot.modifier' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Percentaged } from 'com.blamejared.crafttweaker.api.util.random';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { IIngredient, IIngredientWithAmount } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Map, List } from 'java.util';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootConditions } from 'com.blamejared.crafttweaker.api.loot.condition';
  import { ResourceLocation } from 'net.minecraft.resources';

  class CommonLootModifiers {
    static add(stack: IItemStack): ILootModifier;
    static addAll(...stacks: IItemStack[]): ILootModifier;
    static addAllWithBinomialBonus(enchantment: Enchantment, extra: number, p: number, ...stacks: IItemStack[]): ILootModifier;
    static addAllWithChance(...stacks: Percentaged<IItemStack>[]): ILootModifier;
    static addAllWithOreDropsBonus(enchantment: Enchantment, ...stacks: IItemStack[]): ILootModifier;
    static addAllWithUniformBonus(enchantment: Enchantment, multiplier: number, ...stacks: IItemStack[]): ILootModifier;
    static addWithBinomialBonus(enchantment: Enchantment, extra: number, p: number, stack: IItemStack): ILootModifier;
    static addWithChance(stack: Percentaged<IItemStack>): ILootModifier;
    static addWithOreDropsBonus(enchantment: Enchantment, stack: IItemStack): ILootModifier;
    static addWithRandomAmount(stack: IItemStack, min: number, max: number): ILootModifier;
    static addWithUniformBonus(enchantment: Enchantment, multiplier: number, stack: IItemStack): ILootModifier;
    static chaining(...modifiers: ILootModifier[]): ILootModifier;
    static clearLoot(): ILootModifier;
    static clearing(...modifiers: ILootModifier[]): ILootModifier;
    static remove(target: IIngredient): ILootModifier;
    static removeAll(...targets: IIngredient[]): ILootModifier;
    static removeExactly(target: IIngredientWithAmount): ILootModifier;
    static removeExactlyAll(...targets: IIngredientWithAmount[]): ILootModifier;
    static replaceAllStacksWith(replacementMap: Map<IIngredientWithAmount, IItemStack>): ILootModifier;
    static replaceAllWith(replacementMap: Map<IIngredient, IItemStack>): ILootModifier;
    static replaceStackWith(target: IIngredientWithAmount, replacement: IItemStack): ILootModifier;
    static replaceWith(target: IIngredient, replacement: IItemStack): ILootModifier;
  }


  class ILootModifier {
    static readonly DEFAULT: ILootModifier;
    doApply(loot: ObjectArrayList<ItemStack>, context: LootContext): ObjectArrayList<ItemStack>;
    modify(var1: IItemStack[], var2: LootContext): IItemStack[];
  }


  class LootModifierManager {
    static readonly INSTANCE: LootModifierManager;
    get all(): ILootModifier[];
    get allNames(): ResourceLocation[];
    getByName(name: string): ILootModifier;
    register(name: string, conditions: LootConditions, modifier: ILootModifier): void;
    removeAll(): void;
    removeByModId(modId: string): void;
    removeByName(name: string): void;
    removeByRegex(regex: string): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.loot.table' {
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set } from 'java.util';

  class LootTableManager {
    static readonly INSTANCE: LootTableManager;
    get ids(): Set<ResourceLocation>;
    getTable(name: ResourceLocation): LootTable;
  }

}

declare module 'com.blamejared.crafttweaker.api.misc' {
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Block } from 'net.minecraft.world.level.block';
  import { InteractionMap } from 'CauldronInteraction';
  import { ItemInteractionResult, InteractionHand } from 'net.minecraft.world';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class CTCauldron {
    static readonly INSTANCE: CTCauldron;
    addEmptyInteraction(item: Item, interaction: CTCauldronInteraction): void;
    addInteraction(cauldronBlock: Block, item: Item, interaction: CTCauldronInteraction): void;
    addInteraction(map: InteractionMap, item: Item, interaction: CTCauldronInteraction): void;
    addLavaInteraction(item: Item, interaction: CTCauldronInteraction): void;
    addPowderSnowInteraction(item: Item, interaction: CTCauldronInteraction): void;
    addWaterInteraction(item: Item, interaction: CTCauldronInteraction): void;
    get fillLavaInteraction(): CTCauldronInteraction;
    get fillPowderSnowInteraction(): CTCauldronInteraction;
    get fillWaterInteraction(): CTCauldronInteraction;
    removeEmptyInteraction(item: Item): void;
    removeInteraction(cauldronBlock: Block, item: Item): void;
    removeInteraction(map: InteractionMap, item: Item): void;
    removeLavaInteraction(item: Item): void;
    removePowderSnowInteraction(item: Item): void;
    removeWaterInteraction(item: Item): void;
  }


  class CTCauldronInteraction {
    interact(var1: BlockState, var2: Level, var3: BlockPos, var4: Player, var5: InteractionHand, var6: ItemStack): ItemInteractionResult;
  }


  class CTComposter {
    static readonly INSTANCE: CTComposter;
    setValue(stack: IItemStack, amount: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.mod' {
  import { Collection, List } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Block } from 'net.minecraft.world.level.block';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Path } from 'java.nio.file';

  class Mod {
    constructor(id: string, displayName: string, version: string);
    displayName(): string;
    equals(obj: any): boolean;
    get attributes(): Collection<Attribute>;
    get blocks(): Collection<Block>;
    get enchantments(): Collection<Enchantment>;
    get fluids(): Collection<Fluid>;
    get itemStacks(): Collection<IItemStack>;
    get items(): Collection<Item>;
    get mobEffects(): Collection<MobEffect>;
    get potions(): Collection<Potion>;
    get soundEvents(): Collection<SoundEvent>;
    get villagerProfessions(): Collection<VillagerProfession>;
    hashCode(): number;
    id(): string;
    toString(): string;
    version(): string;
  }


  class Mods {
    static readonly INSTANCE: Mods;
    get mods(): Mod[];
    get size(): number;
    getMod(modid: string): Mod;
    getModByIndex(modid: string): Mod;
    isModLoaded(modid: string): boolean;
  }


  class PlatformMod {
    file(path: string): Path;
    id(): string;
    mod(): Mod;
    modFile(): Path;
    modRoot(): Path;
    version(): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.natives' {
  import { Class } from 'java.lang';
  import { Optional, Collection } from 'java.util';
  import { Constructor, Method } from 'java.lang.reflect';
  import { Annotation } from 'java.lang.annotation';

  class IBakedTypeInfo {
    findMethod(var1: Constructor<any>): Optional<IExecutableReferenceInfo>;
    findMethod(var1: Method): Optional<IExecutableReferenceInfo>;
    nativeClass(): Class<any>;
    zenName(): string;
  }


  class IExecutableReferenceInfo {
    getAnnotation<T extends Annotation>(var1: Class<T>): Optional<T>;
  }


  class INativeTypeRegistry {
    get bakedTypeInfo(): Collection<IBakedTypeInfo>;
    getBakedTypeInfoFor(var1: Class<any>): Optional<IBakedTypeInfo>;
    getExecutableReferenceInfoFor(var1: Constructor<any>): Optional<IExecutableReferenceInfo>;
    getExecutableReferenceInfoFor(var1: Method): Optional<IExecutableReferenceInfo>;
    getZenNameFor(var1: Class<any>): Optional<string>;
  }

}

declare module 'com.blamejared.crafttweaker.api.network' {
  import { Map } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Player } from 'net.minecraft.world.entity.player';

  class CTNetwork {
    static readonly INSTANCE: CTNetwork;
    readonly clientReceivers: Map;
    onData(id: string, receiver: CTNetworkReceiver): void;
    receive(id: string, data: IData, player: Player): void;
    sendTo(player: ServerPlayer, id: string, data: IData): void;
  }


  class CTNetworkContext {
    constructor(id: string, player: Player);
    id(): string;
    player(): Player;
  }


  class CTNetworkReceiver {
    receive(var1: IData, var2: CTNetworkContext): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.plugin' {
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { DumperData } from 'com.blamejared.crafttweaker.api.plugin.IBracketParserRegistrationHandler';
  import { Method } from 'java.lang.reflect';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Class, Enum, Runnable } from 'java.lang';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { CommandBuilder } from 'com.blamejared.crafttweaker.api.plugin.ICommandRegistrationHandler';
  import { TypeToken } from 'com.google.common.reflect';
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { NativeTypeInfo } from 'com.blamejared.crafttweaker.api.natives';
  import { ZenTypeInfo, IPreprocessor } from 'com.blamejared.crafttweaker.api.zencode';
  import { Consumer, Function } from 'java.util.function';
  import { ScriptRunConfiguration, IScriptRunModuleConfigurator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { Recipe } from 'net.minecraft.world.item.crafting';
  import { ITargetingFilter, ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { Registry } from 'net.minecraft.core';
  import { TagManagerFactory, ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { CTTradeObject } from 'com.blamejared.crafttweaker.api.villager';
  import { ItemListing } from 'VillagerTrades';

  class IBracketParserRegistrationHandler {
    registerEnumForBracket<T extends Enum<T>>(var1: string, var2: ResourceLocation, var3: Class<T>): void;
    registerParserFor(var1: string, var2: string, var3: BracketExpressionParser, var4: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: BracketExpressionParser): void;
    registerParserFor(var1: string, var2: string, var3: Method, var4: Method, var5: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: Method, dumper: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: Method, validator: Method): void;
    registerParserFor(loader: string, parserName: string, parser: Method): void;
  }


  class ICommandRegistrationHandler {
    registerDump(var1: string, var2: MutableComponent, var3: CommandBuilder): void;
    registerRootCommand(var1: string, var2: MutableComponent, var3: CommandBuilder): void;
    registerSubCommand(var1: string, var2: string, var3: MutableComponent, var4: CommandBuilder): void;
  }


  class ICraftTweakerPlugin {
    initialize(): void;
    manageJavaNativeIntegration(handler: IJavaNativeIntegrationRegistrationHandler): void;
    registerBracketParsers(handler: IBracketParserRegistrationHandler): void;
    registerCommands(handler: ICommandRegistrationHandler): void;
    registerEvents(handler: IEventRegistrationHandler): void;
    registerListeners(handler: IListenerRegistrationHandler): void;
    registerLoadSource(handler: IScriptLoadSourceRegistrationHandler): void;
    registerLoaders(handler: ILoaderRegistrationHandler): void;
    registerModuleConfigurators(handler: IScriptRunModuleConfiguratorRegistrationHandler): void;
    registerRecipeComponents(handler: IRecipeComponentRegistrationHandler): void;
    registerRecipeHandlers(handler: IRecipeHandlerRegistrationHandler): void;
    registerReplacerComponents(handler: IReplacerComponentRegistrationHandler): void;
    registerTaggableElements(handler: ITaggableElementRegistrationHandler): void;
    registerVillagerTradeConverters(handler: IVillagerTradeRegistrationHandler): void;
  }


  class IEventRegistrationHandler {
    registerEventMapping<T>(var1: TypeToken<T>, var2: IEventBus<T>): void;
  }


  class IJavaNativeIntegrationRegistrationHandler {
    registerGlobalsIn(var1: string, var2: Class<any>, var3: ZenTypeInfo): void;
    registerNativeType(var1: string, var2: Class<any>, var3: NativeTypeInfo): void;
    registerPreprocessor(var1: IPreprocessor): void;
    registerZenClass(var1: string, var2: Class<any>, var3: ZenTypeInfo): void;
  }


  class IListenerRegistrationHandler {
    onCraftTweakerLoadCompletion(var1: Runnable): void;
    onExecuteRun(var1: Consumer<ScriptRunConfiguration>): void;
    onZenDataRegistrationCompletion(var1: Runnable): void;
  }


  class ILoaderRegistrationHandler {
    registerLoader(var1: string, ...var2: string[]): void;
  }


  class IRecipeComponentRegistrationHandler {
    registerRecipeComponent<T>(var1: IRecipeComponent<T>): void;
  }


  class IRecipeHandlerRegistrationHandler {
    registerRecipeHandler<T extends Recipe<any>>(var1: Class<T>, var2: IRecipeHandler<T>): void;
  }


  class IReplacerComponentRegistrationHandler {
    registerTargetingFilter(var1: ITargetingFilter): void;
    registerTargetingStrategy(var1: ResourceLocation, var2: ITargetingStrategy): void;
  }


  class IScriptLoadSourceRegistrationHandler {
    registerLoadSource(var1: ResourceLocation): void;
  }


  class IScriptRunModuleConfiguratorRegistrationHandler {
    registerConfigurator(var1: string, var2: IScriptRunModuleConfigurator): void;
  }


  class ITaggableElementRegistrationHandler {
    registerManager<T, U extends ITagManager<any>>(var1: ResourceKey<Registry<T>>, var2: TagManagerFactory<T, U>): void;
    registerTaggableElement<T>(var1: ResourceKey<Registry<T>>, var2: Class<T>): void;
  }


  class IVillagerTradeRegistrationHandler {
    registerTradeConverter<T extends ItemListing>(var1: Class<T>, var2: Function<T, CTTradeObject>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.plugin.ICommandRegistrationHandler' {
  import { Consumer } from 'java.util.function';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface CommandBuilder extends Consumer<LiteralArgumentBuilder> {}
  class CommandBuilder extends Consumer<LiteralArgumentBuilder> {
    buildCommand(builder: LiteralArgumentBuilder<CommandSourceStack>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.component' {
  import { List, Set, Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TypeToken } from 'com.google.gson.reflect';
  import { BiPredicate, Function } from 'java.util.function';
  import { IIngredient, IIngredientWithAmount } from 'com.blamejared.crafttweaker.api.ingredient';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Percentaged } from 'com.blamejared.crafttweaker.api.util.random';
  import { Number } from 'java.lang';
  import { CTFluidIngredient, IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';

  class BuiltinRecipeComponents {
  }


  class DecomposedRecipeBuilder {
    build(): IDecomposedRecipe;
    with<C>(component: IRecipeComponent<C>, object: C): DecomposedRecipeBuilder;
    with<C>(component: IRecipeComponent<C>, object: C[]): DecomposedRecipeBuilder;
  }


  class IDecomposedRecipe {
    static builder(): DecomposedRecipeBuilder;
    components(): Set<IRecipeComponent<any>>;
    get<C>(var1: IRecipeComponent<C>): C[];
    getOrThrow<C>(component: IRecipeComponent<C>): C[];
    getOrThrowSingle<C>(component: IRecipeComponent<C>): C;
    set<C>(var1: IRecipeComponent<C>, var2: C[]): void;
    set<C>(component: IRecipeComponent<C>, object: C): void;
  }


  class IRecipeComponent<T = any> {
    static composite<T>(id: ResourceLocation, objectType: TypeToken<T>, matcher: BiPredicate<T, T>, unwrappingFunction: Function<T, Collection<T>>, wrapper: Function<Collection<T>, T>): IRecipeComponent<T>;
    static find<T>(id: ResourceLocation): IRecipeComponent<T>;
    get commandString(): string;
    id(): ResourceLocation;
    match(var1: T, var2: T): boolean;
    objectType(): TypeToken<T>;
    static simple<T>(id: ResourceLocation, objectType: TypeToken<T>, matcher: BiPredicate<T, T>): IRecipeComponent<T>;
    unwrap(var1: T): Collection<T>;
    wrap(var1: Collection<T>): T;
  }


  interface ListRecipeComponent<T = any> extends IRecipeComponent<T> {}
  class ListRecipeComponent<T = any> extends IRecipeComponent<T> {
    id(): ResourceLocation;
    match(oracle: T, object: T): boolean;
    objectType(): TypeToken<T>;
    toString(): string;
    unwrap(object: T): Collection<T>;
    wrap(objects: Collection<T>): T;
  }


  class RecipeComponentEqualityCheckers {
    static areFluidIngredientsEqual(a: CTFluidIngredient, b: CTFluidIngredient): boolean;
    static areFluidStacksEqual(a: IFluidStack, b: IFluidStack): boolean;
    static areIngredientsEqual(a: IIngredient, b: IIngredient): boolean;
    static areIngredientsEqual(a: IIngredientWithAmount, b: IIngredientWithAmount): boolean;
    static areNumbersEqual<T extends Number>(a: T, b: T): boolean;
    static areStacksEqual(a: IItemStack, b: IItemStack): boolean;
    static areStacksEqual(a: Percentaged<IItemStack>, b: Percentaged<IItemStack>): boolean;
    static notComparable<T>(a: T, b: T): boolean;
  }


  interface SimpleRecipeComponent<T = any> extends IRecipeComponent<T> {}
  class SimpleRecipeComponent<T = any> extends IRecipeComponent<T> {
    id(): ResourceLocation;
    match(oracle: T, object: T): boolean;
    objectType(): TypeToken<T>;
    toString(): string;
    unwrap(object: T): Collection<T>;
    wrap(objects: Collection<T>): T;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.component.BuiltinRecipeComponents' {
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';

  class Output {
    static readonly CHANCED_ITEMS: IRecipeComponent;
    static readonly EXPERIENCE: IRecipeComponent;
    static readonly FLUIDS: IRecipeComponent;
    static readonly ITEMS: IRecipeComponent;
  }


  class Processing {
    static readonly FUNCTION_0D: IRecipeComponent;
    static readonly FUNCTION_1D: IRecipeComponent;
    static readonly FUNCTION_2D: IRecipeComponent;
    static readonly TIME: IRecipeComponent;
  }


  class Input {
    static readonly INGREDIENTS: IRecipeComponent;
    static readonly INGREDIENTS_WITH_AMOUNTS: IRecipeComponent;
    static readonly FLUID_INGREDIENTS: IRecipeComponent;
  }


  class Metadata {
    static readonly GROUP: IRecipeComponent;
    static readonly COOKING_BOOK_CATEGORY: IRecipeComponent;
    static readonly CRAFTING_BOOK_CATEGORY: IRecipeComponent;
    static readonly MIRROR_AXIS: IRecipeComponent;
    static readonly SHAPE_SIZE_2D: IRecipeComponent;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.fun' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class RecipeFunction0D {
    process(var1: IItemStack, var2: IItemStack): IItemStack;
  }


  class RecipeFunction1D {
    process(var1: IItemStack, var2: IItemStack[]): IItemStack;
  }


  class RecipeFunction2D {
    process(var1: IItemStack, var2: IItemStack[][]): IItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.handler.helper' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { Recipe } from 'net.minecraft.world.item.crafting';

  class CraftingTableRecipeConflictChecker {
    static checkConflicts(manager: IRecipeManager<any>, first: Recipe<any>, second: Recipe<any>): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.handler' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RegistryAccess } from 'net.minecraft.core';
  import { RecipeHolder, Recipe } from 'net.minecraft.world.item.crafting';
  import { Optional } from 'java.util';
  import { IDecomposedRecipe } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { Class } from 'java.lang';

  class IRecipeHandler<T extends Recipe<any> = any> {
    decompose(var1: IRecipeManager<T>, var2: RegistryAccess, var3: T): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(var1: IRecipeManager<T>, var2: T, var3: U): boolean;
    dumpToCommandString(var1: IRecipeManager<T>, var2: RegistryAccess, var3: RecipeHolder<T>): string;
    recompose(var1: IRecipeManager<T>, var2: RegistryAccess, var3: IDecomposedRecipe): Optional<T>;
  }


  class IRecipeHandlerRegistry {
    static getHandlerFor<T extends Recipe<any>>(recipe: T): IRecipeHandler<T>;
    static getHandlerFor<T extends Recipe<any>>(recipe: RecipeHolder<T>): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(var1: T): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(var1: Class<T>): IRecipeHandler<T>;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.manager.base' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { CookingBookCategory, RecipeHolder, RecipeType } from 'net.minecraft.world.item.crafting';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Iterable } from 'java.lang';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { List, Map, Collection, Iterator } from 'java.util';
  import { Predicate, Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeList } from 'com.blamejared.crafttweaker.api.recipe';

  interface ICookingRecipeManager<T extends AbstractCookingRecipe = any> extends IRecipeManager<T> {}
  class ICookingRecipeManager<T extends AbstractCookingRecipe = any> extends IRecipeManager<T> {
    addRecipe(name: string, output: IItemStack, input: IIngredient, xp: number, cookTime: number): void;
    addRecipe(name: string, category: CookingBookCategory, output: IItemStack, input: IIngredient, xp: number, cookTime: number): void;
    makeRecipe(var1: string, var2: CookingBookCategory, var3: IItemStack, var4: IIngredient, var5: number, var6: number): RecipeHolder<T>;
    removeRecipe(output: IItemStack, input: IIngredient): void;
  }


  interface IRecipeManager<T extends Recipe<any> = any> extends CommandStringDisplayable, Iterable<RecipeHolder> {}
  class IRecipeManager<T extends Recipe<any> = any> extends CommandStringDisplayable {
    addJsonRecipe(name: string, mapData: MapData): void;
    createHolder(id: ResourceLocation, recipe: T): RecipeHolder<T>;
    fixRecipeId(name: string): ResourceLocation;
    fixRecipeId(name: string, idMaker: Function<string, ResourceLocation>): ResourceLocation;
    fixRecipeName(name: string): string;
    get allRecipes(): RecipeHolder<T>[];
    get bracketResourceLocation(): ResourceLocation;
    get commandString(): string;
    get recipeList(): RecipeList<T>;
    get recipeMap(): Map<ResourceLocation, RecipeHolder<T>>;
    get recipeType(): RecipeType<T>;
    get recipes(): Collection<RecipeHolder<T>>;
    getRecipeByName(name: string): RecipeHolder<T>;
    getRecipesByOutput(output: IIngredient): RecipeHolder<T>[];
    getRecipesMatching(predicate: Predicate<RecipeHolder<T>>): RecipeHolder<T>[];
    iterator(): Iterator<RecipeHolder<T>>;
    remove(output: IIngredient): void;
    removeAll(): void;
    removeByInput(input: IItemStack): void;
    removeByModid(modid: string, exclude: Predicate<string>): void;
    removeByName(...names: string[]): void;
    removeByRegex(regex: string, exclude: Predicate<string>): void;
    removeMatching(predicate: Predicate<RecipeHolder<T>>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.manager' {
  import { ICookingRecipeManager, IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { BlastingRecipe, RecipeHolder, CookingBookCategory, RecipeType, CampfireCookingRecipe, CraftingRecipe, SmeltingRecipe, Recipe, RecipeInput, SmithingRecipe, SmokingRecipe, StonecutterRecipe } from 'net.minecraft.world.item.crafting';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { RecipeFunction2D, RecipeFunction1D } from 'com.blamejared.crafttweaker.api.recipe.fun';
  import { Map, List } from 'java.util';
  import { MirrorAxis } from 'com.blamejared.crafttweaker.api.recipe';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { Predicate } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface BlastFurnaceRecipeManager extends ICookingRecipeManager<BlastingRecipe> {}
  class BlastFurnaceRecipeManager extends ICookingRecipeManager<BlastingRecipe> {
    static readonly INSTANCE: BlastFurnaceRecipeManager;
    get recipeType(): RecipeType<BlastingRecipe>;
    makeRecipe(name: string, category: CookingBookCategory, output: IItemStack, input: IIngredient, xp: number, cookTime: number): RecipeHolder<BlastingRecipe>;
  }


  interface CampFireRecipeManager extends ICookingRecipeManager<CampfireCookingRecipe> {}
  class CampFireRecipeManager extends ICookingRecipeManager<CampfireCookingRecipe> {
    static readonly INSTANCE: CampFireRecipeManager;
    get recipeType(): RecipeType<CampfireCookingRecipe>;
    makeRecipe(name: string, category: CookingBookCategory, output: IItemStack, input: IIngredient, xp: number, cookTime: number): RecipeHolder<CampfireCookingRecipe>;
  }


  interface CraftingTableRecipeManager extends IRecipeManager<CraftingRecipe> {}
  class CraftingTableRecipeManager extends IRecipeManager<CraftingRecipe> {
    static readonly INSTANCE: CraftingTableRecipeManager;
    addShaped(recipeName: string, output: IItemStack, ingredients: IIngredient[][], recipeFunction: RecipeFunction2D): void;
    addShapedMirrored(recipeName: string, mirrorAxis: MirrorAxis, output: IItemStack, ingredients: IIngredient[][], recipeFunction: RecipeFunction2D): void;
    addShapedPattern(recipeName: string, output: IItemStack, pattern: string[], keys: Map<string, IIngredient>, recipeFunction: RecipeFunction2D): void;
    addShapeless(recipeName: string, output: IItemStack, ingredients: IIngredient[], recipeFunction: RecipeFunction1D): void;
    get recipeType(): RecipeType<CraftingRecipe>;
  }


  interface FurnaceRecipeManager extends ICookingRecipeManager<SmeltingRecipe> {}
  class FurnaceRecipeManager extends ICookingRecipeManager<SmeltingRecipe> {
    static readonly INSTANCE: FurnaceRecipeManager;
    get recipeType(): RecipeType<SmeltingRecipe>;
    makeRecipe(name: string, category: CookingBookCategory, output: IItemStack, input: IIngredient, xp: number, cookTime: number): RecipeHolder<SmeltingRecipe>;
  }


  class GenericRecipesManager {
    static readonly INSTANCE: GenericRecipesManager;
    addJsonRecipe(name: string, data: MapData): void;
    get allManagers(): IRecipeManager<any>[];
    get allRecipes(): RecipeHolder<Recipe<RecipeInput>>[];
    get allRecipesRaw(): RecipeHolder<any>[];
    get recipeMap(): Map<ResourceLocation, RecipeHolder<Recipe<RecipeInput>>>;
    getRecipeByName(name: string): RecipeHolder<Recipe<RecipeInput>>;
    getRecipesByOutput(output: IIngredient): RecipeHolder<Recipe<RecipeInput>>[];
    getRecipesMatching(predicate: Predicate<RecipeHolder<Recipe<RecipeInput>>>): RecipeHolder<Recipe<RecipeInput>>[];
    remove(output: IIngredient): void;
    removeAll(): void;
    removeByInput(input: IItemStack): void;
    removeByModid(modId: string): void;
    removeByModid(modId: string, exclude: Predicate<string>): void;
    removeByName(...names: string[]): void;
    removeByRegex(regex: string): void;
    removeMatching(predicate: Predicate<RecipeHolder<Recipe<RecipeInput>>>): void;
  }


  interface RecipeManagerWrapper extends IRecipeManager<Recipe> {}
  class RecipeManagerWrapper extends IRecipeManager<Recipe> {
    constructor(recipeType: RecipeType<Recipe<any>>);
    equals(o: any): boolean;
    get recipeType(): RecipeType<Recipe<any>>;
    hashCode(): number;
    static makeOrNull(recipeType: RecipeType<Recipe<any>>): RecipeManagerWrapper;
  }


  interface SmithingRecipeManager extends IRecipeManager<SmithingRecipe> {}
  class SmithingRecipeManager extends IRecipeManager<SmithingRecipe> {
    static readonly INSTANCE: SmithingRecipeManager;
    addTransformRecipe(recipeName: string, result: IItemStack, template: IIngredient, base: IIngredient, addition: IIngredient): void;
    addTrimRecipe(recipeName: string, template: IIngredient, base: IIngredient, addition: IIngredient): void;
    get recipeType(): RecipeType<SmithingRecipe>;
  }


  interface SmokerRecipeManager extends ICookingRecipeManager<SmokingRecipe> {}
  class SmokerRecipeManager extends ICookingRecipeManager<SmokingRecipe> {
    static readonly INSTANCE: SmokerRecipeManager;
    get recipeType(): RecipeType<SmokingRecipe>;
    makeRecipe(name: string, category: CookingBookCategory, output: IItemStack, input: IIngredient, xp: number, cookTime: number): RecipeHolder<SmokingRecipe>;
  }


  interface StoneCutterManager extends IRecipeManager<StonecutterRecipe> {}
  class StoneCutterManager extends IRecipeManager<StonecutterRecipe> {
    static readonly INSTANCE: StoneCutterManager;
    addRecipe(recipeName: string, output: IItemStack, input: IIngredient): void;
    get recipeType(): RecipeType<StonecutterRecipe>;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe' {
  import { Enum } from 'java.lang';
  import { List, Collection, Map } from 'java.util';
  import { RecipeType, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Predicate } from 'java.util.function';

  interface MirrorAxis extends Enum<MirrorAxis> {}
  class MirrorAxis extends Enum<MirrorAxis> {
    static readonly ALL: MirrorAxis;
    static readonly DIAGONAL: MirrorAxis;
    static readonly HORIZONTAL: MirrorAxis;
    static readonly NONE: MirrorAxis;
    static readonly VERTICAL: MirrorAxis;
    get serializedName(): string;
    isDiagonal(): boolean;
    isHorizontal(): boolean;
    isMirrored(): boolean;
    isVertical(): boolean;
    static valueOf(name: string): MirrorAxis;
    static values(): MirrorAxis[];
  }


  class RecipeList<T extends Recipe<any> = any> {
    constructor(recipeType: RecipeType<T>, recipes: Collection<RecipeHolder<T>>, byName: Map<ResourceLocation, RecipeHolder<any>>);
    add(id: ResourceLocation, recipe: RecipeHolder<T>): void;
    get(id: ResourceLocation): RecipeHolder<T>;
    get(id: string): RecipeHolder<T>;
    get byName(): Map<ResourceLocation, RecipeHolder<T>>;
    get recipeType(): RecipeType<T>;
    get recipes(): Collection<RecipeHolder<T>>;
    get size(): number;
    getRecipesByOutput(output: IIngredient): RecipeHolder<T>[];
    getRecipesMatching(predicate: Predicate<RecipeHolder<T>>): RecipeHolder<T>[];
    has(id: ResourceLocation): boolean;
    has(id: string): boolean;
    remove(id: ResourceLocation): void;
    removeAll(): void;
    removeByIdTest(idPredicate: Predicate<ResourceLocation>): void;
    removeByIdTest(idPredicate: Predicate<ResourceLocation>, exclusions: Predicate<string>): void;
    removeByRecipeTest(recipePredicate: Predicate<RecipeHolder<T>>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.replacement' {
  import { Predicate, UnaryOperator, Function } from 'java.util.function';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { NullableT } from '@ZenCodeType';

  interface DescriptivePredicate<T = any> extends Predicate<T> {}
  class DescriptivePredicate<T = any> extends Predicate<T> {
    describe(): string;
    static of<T>(predicate: Predicate<T>, description: string): DescriptivePredicate<T>;
    test(t: T): boolean;
    static wrap<T>(predicate: Predicate<T>): DescriptivePredicate<T>;
  }


  interface DescriptiveUnaryOperator<T = any> extends UnaryOperator<T> {}
  class DescriptiveUnaryOperator<T = any> extends UnaryOperator<T> {
    apply(t: T): T;
    describe(): string;
    static of<T>(operator: UnaryOperator<T>, description: string): DescriptiveUnaryOperator<T>;
    static wrap<T>(operator: UnaryOperator<T>): DescriptiveUnaryOperator<T>;
  }


  interface IFilteringRule extends ITargetingFilter {}
  class IFilteringRule extends ITargetingFilter {
    describe(): string;
  }


  class IReplacerRegistry {
    allStrategyNames(): Collection<ResourceLocation>;
    filters(): Collection<ITargetingFilter>;
    findStrategy(var1: ResourceLocation): ITargetingStrategy;
  }


  class ITargetingFilter {
    castFilter(var1: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
  }


  interface ITargetingStrategy extends CommandStringDisplayable {}
  class ITargetingStrategy extends CommandStringDisplayable {
    static readonly DEFAULT_STRATEGY_ID: ResourceLocation;
    castStrategy<T>(var1: IRecipeComponent<T>, var2: T, var3: Function<T, NullableT>): T;
    static find(id: ResourceLocation): ITargetingStrategy;
    get commandString(): string;
  }


  class Replacer {
    static create(): Replacer;
    execute(): void;
    filter(rule: IFilteringRule): Replacer;
    replace<T>(component: IRecipeComponent<T>, toReplace: T, withParameter: T): Replacer;
    replace<T>(component: IRecipeComponent<T>, strategy: ITargetingStrategy, toReplace: T, withParameter: T): Replacer;
    replace<T>(component: IRecipeComponent<T>, strategy: ITargetingStrategy, toReplace: T, withParameter: Function<T, T>): Replacer;
    replace<T>(component: IRecipeComponent<T>, strategy: ITargetingStrategy, toReplace: Predicate<T>, withParameter: Function<T, T>): Replacer;
    replace<T>(component: IRecipeComponent<T>, toReplace: Predicate<T>, withParameter: Function<T, T>): Replacer;
    replace<T>(component: IRecipeComponent<T>, withParameter: Function<T, T>): Replacer;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.replacement.type' {
  import { IFilteringRule, ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { Predicate, BiPredicate } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { RecipeHolder, Recipe, RecipeInput } from 'net.minecraft.world.item.crafting';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { Mod } from 'com.blamejared.crafttweaker.api.mod';

  interface ComponentFilteringRule<T = any> extends IFilteringRule {}
  class ComponentFilteringRule<T = any> extends IFilteringRule {
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    describe(): string;
    static of<T>(component: IRecipeComponent<T>): ComponentFilteringRule<T>;
    static of<T>(component: IRecipeComponent<T>, content: T): ComponentFilteringRule<T>;
    static of<T>(component: IRecipeComponent<T>, content: T, checkStrategy: ITargetingStrategy, it: T): ComponentFilteringRule<T>;
    static of<T>(component: IRecipeComponent<T>, content: Predicate<T>, checkStrategy: ITargetingStrategy): ComponentFilteringRule<T>;
  }


  interface CustomFilteringRule extends IFilteringRule {}
  class CustomFilteringRule extends IFilteringRule {
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    describe(): string;
    static of(predicate: Predicate<RecipeHolder<any>>): CustomFilteringRule;
    static of(predicate: BiPredicate<IRecipeManager<any>, RecipeHolder<any>>): CustomFilteringRule;
    static ofZen(predicate: Predicate<RecipeHolder<Recipe<RecipeInput>>>): CustomFilteringRule;
    static ofZen(predicate: BiPredicate<IRecipeManager<Recipe<RecipeInput>>, RecipeHolder<Recipe<RecipeInput>>>): CustomFilteringRule;
  }


  interface ModsFilteringRule extends IFilteringRule {}
  class ModsFilteringRule extends IFilteringRule {
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    describe(): string;
    static of(...modIds: string[]): IFilteringRule;
    static of(...mods: Mod[]): IFilteringRule;
  }


  interface NameFilteringRule extends IFilteringRule {}
  class NameFilteringRule extends IFilteringRule {
    static anyOf(...exactNames: string[]): NameFilteringRule;
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    static containing(contents: string): NameFilteringRule;
    describe(): string;
    static regex(regex: string): NameFilteringRule;
  }


  interface NotFilteringRule extends IFilteringRule {}
  class NotFilteringRule extends IFilteringRule {
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    describe(): string;
    static of(rule: IFilteringRule): NotFilteringRule;
  }


  interface TypeFilteringRule extends IFilteringRule {}
  class TypeFilteringRule extends IFilteringRule {
    castFilter(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    describe(): string;
    static of(...managers: IRecipeManager<any>[]): IFilteringRule;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.serializer' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { CTShapedRecipe, CTShapelessRecipe } from 'com.blamejared.crafttweaker.api.recipe.type';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface CTShapedRecipeSerializer extends RecipeSerializer<CTShapedRecipe> {}
  class CTShapedRecipeSerializer extends RecipeSerializer<CTShapedRecipe> {
    static readonly INSTANCE: CTShapedRecipeSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CTShapedRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CTShapedRecipe>;
  }


  interface CTShapelessRecipeSerializer extends RecipeSerializer<CTShapelessRecipe> {}
  class CTShapelessRecipeSerializer extends RecipeSerializer<CTShapelessRecipe> {
    static readonly INSTANCE: CTShapelessRecipeSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<CTShapelessRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CTShapelessRecipe>;
  }

}

declare module 'com.blamejared.crafttweaker.api.recipe.type' {
  import { ShapedRecipe, CraftingBookCategory, CraftingInput, RecipeSerializer, ShapelessRecipe, Ingredient } from 'net.minecraft.world.item.crafting';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { MirrorAxis } from 'com.blamejared.crafttweaker.api.recipe';
  import { RecipeFunction2D, RecipeFunction1D } from 'com.blamejared.crafttweaker.api.recipe.fun';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { NonNullList } from 'net.minecraft.core';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Integer } from 'java.lang';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CTShapedRecipe extends ShapedRecipe {}
  class CTShapedRecipe extends ShapedRecipe {
    constructor(output: IItemStack, ingredients: IIngredient[][], mirrorAxis: MirrorAxis);

    constructor(output: IItemStack, ingredients: IIngredient[][], mirrorAxis: MirrorAxis, functionParameter: RecipeFunction2D);

    constructor(category: CraftingBookCategory, output: IItemStack, ingredients: IIngredient[][], mirrorAxis: MirrorAxis, functionParameter: RecipeFunction2D);
    assemble(container: CraftingInput, lookup: Provider): ItemStack;
    equals(o: any): boolean;
    get ctIngredients(): IIngredient[][];
    get ctOutput(): IItemStack;
    get flatCtIngredients(): NonNullList<IIngredient>;
    get function(): RecipeFunction2D;
    get mirrorAxis(): MirrorAxis;
    get serializer(): RecipeSerializer<CTShapedRecipe>;
    getRemainingItems(inv: CraftingInput): NonNullList<ItemStack>;
    getRemainingItems(inv: CraftingInput, offsetPair: Pair<number, number>, ingredients: IIngredient[][]): NonNullList<ItemStack>;
    getResultItem(lookup: Provider): ItemStack;
    hashCode(): number;
    isIncomplete(): boolean;
    isMirrored(): boolean;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }


  interface CTShapelessRecipe extends ShapelessRecipe {}
  class CTShapelessRecipe extends ShapelessRecipe {
    constructor(output: IItemStack, ingredients: IIngredient[]);

    constructor(output: IItemStack, ingredients: IIngredient[], functionParameter: RecipeFunction1D);

    constructor(category: CraftingBookCategory, output: IItemStack, ingredients: IIngredient[], functionParameter: RecipeFunction1D);
    assemble(inv: CraftingInput, lookup: Provider): ItemStack;
    static checkEmptyIngredient(name: ResourceLocation, ingredients: IIngredient[]): boolean;
    equals(o: any): boolean;
    get ctIngredients(): IIngredient[];
    get ctOutput(): IItemStack;
    get flatCtIngredients(): NonNullList<IIngredient>;
    get function(): RecipeFunction1D;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<CTShapelessRecipe>;
    getRemainingItems(inv: CraftingInput): NonNullList<ItemStack>;
    getResultItem(lookup: Provider): ItemStack;
    hashCode(): number;
    matches(inv: CraftingInput, worldIn: Level): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.registry' {
  import { Provider, RegistryLookup } from 'HolderLookup';
  import { RegistryAccess, Registry } from 'net.minecraft.core';
  import { Stream } from 'java.util.stream';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Optional } from 'java.util';

  interface TagAddingRegistryLookup extends Provider {}
  class TagAddingRegistryLookup extends Provider {
    constructor(delegate: RegistryAccess);
    listRegistries(): Stream<ResourceKey<Registry<any>>>;
    lookup<T>(key: ResourceKey<Registry<T>>): Optional<RegistryLookup<T>>;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag' {
  import { ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { Class, Comparable } from 'java.lang';
  import { Collection, Optional, Map, List, Comparator } from 'java.util';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, Holder } from 'net.minecraft.core';
  import { KnownTagManager } from 'com.blamejared.crafttweaker.api.tag.manager.type';
  import { TagManager, TagKey } from 'net.minecraft.tags';
  import { NetworkPayload } from 'TagNetworkSerialization';
  import { BindContext } from 'com.blamejared.crafttweaker.api.tag.CraftTweakerTagRegistry';
  import { LoadResult } from 'TagManager';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';

  class CraftTweakerTagRegistry {
    static readonly GLOBAL_NAME: string;
    static readonly INSTANCE: CraftTweakerTagRegistry;
    addManager(cls: Class<ITagManager<any>>): ITagManager<any>;
    addManager(manager: ITagManager<any>): ITagManager<any>;
    bind(tagManager: TagManager): void;
    bind(tags: Map<ResourceKey<Registry<any>>, NetworkPayload>): void;
    bind(tags: Map<ResourceKey<Registry<any>>, NetworkPayload>, context: BindContext): void;
    bind(results: LoadResult<any>[]): void;
    bind(results: LoadResult<any>[], context: BindContext): void;
    findKnownManager<T>(key: ResourceKey<Registry<T>>): Optional<KnownTagManager<T>>;
    findManager<T>(key: ResourceKey<Registry<T>>): Optional<ITagManager<any>>;
    isKnownManager(key: ResourceKey<Registry<any>>): boolean;
    isKnownManager(tagFolder: ResourceLocation): boolean;
    isServerOnly(tagFolder: ResourceLocation): boolean;
    knownManagers(): Collection<ResourceKey<Registry<any>>>;
    knownTagManager<T>(key: ResourceKey<Registry<T>>): KnownTagManager<T>;
    makeTagFolder(key: ResourceKey<Registry<any>>): string;
    managers(): Collection<ITagManager<any>>;
    tagManager<T>(key: ResourceKey<Registry<T>>): ITagManager<any>;
    tagManager<T extends ITagManager<any>>(registryLocation: ResourceLocation): T;
    tagManagerFromFolder<T>(tagFolder: ResourceLocation): Optional<ITagManager<any>>;
  }


  interface MCTag extends CommandStringDisplayable, Comparable<MCTag> {}
  class MCTag extends CommandStringDisplayable {
    static readonly COMPARATOR: Comparator;
    add(...tags: MCTag[]): void;
    addId(...elements: ResourceLocation[]): void;
    clear(): void;
    compareTo(o: MCTag): number;
    contains(id: ResourceLocation): boolean;
    equals(other: MCTag): boolean;
    exists(): boolean;
    get commandString(): string;
    get internal<T extends Collection<Holder<any>>>(): T;
    get tagKey<T extends TagKey<any>>(): T;
    id(): ResourceLocation;
    idElements(): ResourceLocation[];
    manager(): ITagManager<any>;
    remove(...tags: MCTag[]): void;
    removeId(...elements: ResourceLocation[]): void;
  }


  class MutableLoadResult<T = any> {
    constructor();

    constructor(result: LoadResult<T>);
    addTag(id: ResourceLocation, tag: Collection<Holder<T>>): void;
    bind(result: LoadResult<T>): void;
    key(): ResourceKey<Registry<T>>;
    result(): LoadResult<T>;
    tagMap(): Map<ResourceLocation, Collection<Holder<T>>>;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag.expand' {
  import { CTBlockIngredient } from 'com.blamejared.crafttweaker.api.block';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { Block } from 'net.minecraft.world.level.block';
  import { Many } from 'com.blamejared.crafttweaker.api.util';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { CTEntityIngredient } from 'com.blamejared.crafttweaker.api.entity';
  import { CTFluidIngredient } from 'com.blamejared.crafttweaker.api.fluid';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { IIngredient, IIngredientWithAmount } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Item } from 'net.minecraft.world.item';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { List } from 'java.util';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandBlockTag {
    static asBlockIngredient(internal: KnownTag<Block>): CTBlockIngredient;
    static asList(internal: KnownTag<Block>, other: CTBlockIngredient): CTBlockIngredient;
  }


  class ExpandEntityTypeTag {
    static asEntityIngredient(internal: KnownTag<EntityType<Entity>>): CTEntityIngredient;
    static asList(internal: KnownTag<EntityType<Entity>>, other: CTEntityIngredient): CTEntityIngredient;
    static asManyTag(internal: KnownTag<EntityType<Entity>>): Many<KnownTag<EntityType<Entity>>>;
  }


  class ExpandFluidTag {
    static asFluidIngredient(internal: KnownTag<Fluid>): CTFluidIngredient;
    static asList(internal: KnownTag<Fluid>, other: CTFluidIngredient): CTFluidIngredient;
  }


  class ExpandItemTag {
    static add(internal: KnownTag<Item>, items: IItemStack[]): void;
    static asIData(internal: KnownTag<Item>): IData;
    static asIIngredient(internal: KnownTag<Item>): IIngredient;
    static asIIngredientWithAmount(_this: KnownTag<Item>): IIngredientWithAmount;
  }


  class ExpandManyBlockTag {
    static asIngredient(internal: Many<KnownTag<Block>>): CTBlockIngredient;
    static asList(internal: Many<KnownTag<Block>>, other: CTBlockIngredient): CTBlockIngredient;
  }


  class ExpandManyEntityTypeTag {
    static asEntityIngredient(internal: Many<KnownTag<EntityType<Entity>>>): CTEntityIngredient;
    static asList(internal: Many<KnownTag<EntityType<Entity>>>, other: CTEntityIngredient): CTEntityIngredient;
  }


  class ExpandManyFluidTag {
    static asFluidIngredient(internal: Many<KnownTag<Fluid>>): CTFluidIngredient;
    static asList(internal: Many<KnownTag<Fluid>>, other: CTFluidIngredient): CTFluidIngredient;
  }


  class ExpandManyItemTag {
    static asIData(internal: Many<KnownTag<Item>>): IData;
    static asIngredient(internal: Many<KnownTag<Item>>): IIngredientWithAmount;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag.manager.factory' {
  import { TagManagerFactory } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { EntityTypeTagManager } from 'com.blamejared.crafttweaker.api.tag.manager.type';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { Class } from 'java.lang';

  interface EntityTypeTagManagerFactory extends TagManagerFactory<EntityType, EntityTypeTagManager> {}
  class EntityTypeTagManagerFactory extends TagManagerFactory<EntityType, EntityTypeTagManager> {
    apply(resourceKey: ResourceKey<Registry<EntityType<Entity>>>, entityTypeClass: Class<EntityType<Entity>>): EntityTypeTagManager;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag.manager' {
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Iterable, Comparable, Class } from 'java.lang';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Map, List, Collection, Optional, Iterator } from 'java.util';
  import { Holder, Registry } from 'net.minecraft.core';
  import { LoadResult } from 'TagManager';
  import { TagKey } from 'net.minecraft.tags';

  interface ITagManager<T extends MCTag = any> extends CommandStringDisplayable, Iterable<T>, Comparable<ITagManager> {}
  class ITagManager<T extends MCTag = any> extends CommandStringDisplayable {
    addId(var1: T, ...var2: ResourceLocation[]): void;
    addTag<U>(var1: ResourceLocation, var2: Collection<Holder<U>>): void;
    bind(var1: LoadResult<any>): void;
    clear(var1: T): void;
    compareTo(o: ITagManager<any>): number;
    elementClass(): Optional<Class<any>>;
    exists(id: string): boolean;
    exists(id: ResourceLocation): boolean;
    exists(tag: T): boolean;
    get commandString(): string;
    getInternalRaw(var1: T): Collection<Holder<any>>;
    getTagsFor(element: ResourceLocation): T[];
    idElements(of: T): ResourceLocation[];
    internalTags(): Map<ResourceLocation, Collection<Holder<any>>>;
    iterator(): Iterator<T>;
    recalculate(): void;
    removeId(var1: T, ...var2: ResourceLocation[]): void;
    resourceKey(): ResourceKey<Registry<any>>;
    tag(var1: string): T;
    tag(var1: ResourceLocation): T;
    tag(key: TagKey<any>): T;
    tagFolder(): string;
    tagKeys(): ResourceLocation[];
    tagMap(): Map<ResourceLocation, T>;
    tags(): T[];
  }


  class TagManagerFactory<T = any, U extends ITagManager<any> = any> {
    apply(var1: ResourceKey<Registry<T>>, var2: Class<T>): U;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag.manager.type' {
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Registry, Holder } from 'net.minecraft.core';
  import { Class } from 'java.lang';
  import { ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { KnownTag, UnknownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { Optional, List, Map, Collection } from 'java.util';
  import { LoadResult } from 'TagManager';

  interface EntityTypeTagManager extends KnownTagManager<EntityType> {}
  class EntityTypeTagManager extends KnownTagManager<EntityType> {
    constructor(resourceKey: ResourceKey<Registry<EntityType<Entity>>>, elementClass: Class<EntityType<Entity>>);
  }


  interface KnownTagManager<T = any> extends ITagManager<KnownTag> {}
  class KnownTagManager<T = any> extends ITagManager<KnownTag> {
    constructor(resourceKey: ResourceKey<Registry<T>>, elementClass: Class<T>);
    addElements(to: KnownTag<T>, ...values: T[]): void;
    addId(to: KnownTag<T>, ...values: ResourceLocation[]): void;
    addTag<U>(id: ResourceLocation, tag: Collection<Holder<U>>): void;
    bind(result: LoadResult<any>): void;
    clear(from: KnownTag<T>): void;
    elementClass(): Optional<Class<any>>;
    elements(of: KnownTag<T>): T[];
    getInternal(tag: KnownTag<T>): Collection<Holder<T>>;
    getInternalRaw(tag: KnownTag<T>): Collection<Holder<any>>;
    getTagsFor(element: T): KnownTag<T>[];
    internalTags(): Map<ResourceLocation, Collection<Holder<any>>>;
    recalculate(): void;
    removeElements(from: KnownTag<T>, ...values: T[]): void;
    removeId(from: KnownTag<T>, ...values: ResourceLocation[]): void;
    resourceKey(): ResourceKey<Registry<T>>;
    tag(id: string): KnownTag<T>;
    tag(id: ResourceLocation): KnownTag<T>;
    tagKeys(): ResourceLocation[];
    tagMap(): Map<ResourceLocation, KnownTag<T>>;
  }


  interface UnknownTagManager extends ITagManager<UnknownTag> {}
  class UnknownTagManager extends ITagManager<UnknownTag> {
    constructor(resourceKey: ResourceKey<Registry<any>>);
    addId(to: UnknownTag, ...values: ResourceLocation[]): void;
    addTag<U>(id: ResourceLocation, tag: Collection<Holder<U>>): void;
    bind(result: LoadResult<any>): void;
    clear(from: UnknownTag): void;
    getInternalRaw(tag: UnknownTag): Collection<Holder<any>>;
    internalTags(): Map<ResourceLocation, Collection<Holder<any>>>;
    recalculate(): void;
    removeId(from: UnknownTag, ...values: ResourceLocation[]): void;
    resourceKey(): ResourceKey<Registry<any>>;
    tag(id: string): UnknownTag;
    tag(id: ResourceLocation): UnknownTag;
    tagKeys(): ResourceLocation[];
    tagMap(): Map<ResourceLocation, UnknownTag>;
  }

}

declare module 'com.blamejared.crafttweaker.api.tag.type' {
  import { MCTag } from 'com.blamejared.crafttweaker.api.tag';
  import { Iterable } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { KnownTagManager, UnknownTagManager } from 'com.blamejared.crafttweaker.api.tag.manager.type';
  import { Collection, List, Iterator } from 'java.util';
  import { Holder } from 'net.minecraft.core';
  import { Many } from 'com.blamejared.crafttweaker.api.util';

  interface KnownTag<T = any> extends MCTag, Iterable<T> {}
  class KnownTag<T = any> extends MCTag {
    constructor(id: ResourceLocation, manager: KnownTagManager<T>);
    add(...elements: T[]): void;
    add(...tags: MCTag[]): void;
    asTagWithAmount(): Many<KnownTag<T>>;
    contains(element: T): boolean;
    contains(id: ResourceLocation): boolean;
    elements(): T[];
    equals(o: any): boolean;
    equals(other: MCTag): boolean;
    get internal<U extends Collection<Holder<any>>>(): U;
    get internal<T extends Collection<Holder<any>>>(): T;
    hashCode(): number;
    id(): ResourceLocation;
    iterator(): Iterator<T>;
    manager(): KnownTagManager<T>;
    remove(...elements: T[]): void;
    remove(...tags: MCTag[]): void;
    toString(): string;
    withAmount(amount: number): Many<KnownTag<T>>;
  }


  interface UnknownTag extends MCTag {}
  class UnknownTag extends MCTag {
    constructor(id: ResourceLocation, manager: UnknownTagManager);
    asTagWithAmount(): Many<UnknownTag>;
    equals(o: any): boolean;
    equals(other: MCTag): boolean;
    hashCode(): number;
    id(): ResourceLocation;
    manager(): UnknownTagManager;
    toString(): string;
    withAmount(amount: number): Many<UnknownTag>;
  }

}

declare module 'com.blamejared.crafttweaker.api.util' {
  import { NonNullList } from 'net.minecraft.core';
  import { Supplier, Function, Consumer, Predicate, BiPredicate, BiConsumer } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { Class } from 'java.lang';
  import { PlatformMod } from 'com.blamejared.crafttweaker.api.mod';
  import { Annotation } from 'java.lang.annotation';
  import { Either } from 'com.mojang.datafixers.util';
  import { Map, List } from 'java.util';
  import { MethodHandle, VarHandle } from 'java.lang.invoke';
  import { AccessType, Names, MethodHandleInvoker, MethodHandleVoidInvoker } from 'com.blamejared.crafttweaker.api.util.HandleUtil';
  import { Ingredient, ShapedRecipePattern } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { ZSTokenParser, ZSTokenType } from 'org.openzen.zenscript.lexer';
  import { Path } from 'java.nio.file';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';

  class ArrayUtil {
    static copy<T>(array: T[]): T[];
    static copyOf<T>(original: T[], newLength: number, defaultValue: T): T[];
    static flattenToNNL<T, U>(array: T[][], empty: Supplier<U>, converter: Function<T, U>): NonNullList<U>;
    static flattenToNNL<T, U>(width: number, height: number, array: T[][], empty: Supplier<U>, converter: Function<T, U>): NonNullList<U>;
    static getMaxWidth<T>(array: T[][]): number;
    static mirror<T>(array: T[]): T[];
    static replaceNulls<T>(arr: T[], defaultValue: T): void;
  }


  class ClassUtil {
    static findClassesWithAnnotation<T extends Annotation>(annotationClass: Class<T>, it: PlatformMod): Stream<Class<any>>;
    static findClassesWithAnnotation<T extends Annotation>(annotationClass: Class<T>, classProviderConsumer: Consumer<PlatformMod>): Stream<Class<any>>;
    static findClassesWithAnnotation<T extends Annotation>(annotationClass: Class<T>, annotationFilter: Predicate<Either<T, Map<string, any>>>): Stream<Class<any>>;
    static findClassesWithAnnotation<T extends Annotation>(annotationClass: Class<T>, classProviderConsumer: Consumer<PlatformMod>, annotationFilter: Predicate<Either<T, Map<string, any>>>): Stream<Class<any>>;
  }


  class GenericUtil {
    static uncheck<T>(o: any): T;
    static uncheckFunc<T, U, V>(func: Function<U, V>): Function<U, T>;
  }


  class HandleUtil {
    static invoke<R>(invoker: MethodHandleInvoker<R>): R;
    static invokeVoid(invoker: MethodHandleVoidInvoker): void;
    static linkField(owner: Class<any>, accessType: AccessType, fieldName: string, type: Class<any>): VarHandle;
    static linkField(owner: Class<any>, accessType: AccessType, fieldNames: Names, type: Class<any>): VarHandle;
    static linkMethod(type: Class<any>, accessType: AccessType, methodName: string, returnType: Class<any>, ...arguments: Class<any>[]): MethodHandle;
    static linkMethod(type: Class<any>, accessType: AccessType, methodNames: Names, returnType: Class<any>, ...arguments: Class<any>[]): MethodHandle;
  }


  class IngredientUtil {
    static canConflict(a: Ingredient, b: Ingredient): boolean;
    static canConflict<T extends Predicate<U>, U>(a: T, b: T, isEmpty: Predicate<T>, elements: Function<T, U[]>, compare: BiPredicate<U, U>): boolean;
    static doIngredientsConflict(first: Ingredient[], second: Ingredient[]): boolean;
    static doIngredientsConflict<T extends Predicate<U>, U>(first: T[], second: T[], isEmpty: Predicate<T>, elements: Function<T, U[]>, compare: BiPredicate<U, U>): boolean;
    static findIntersection(a: Ingredient, b: Ingredient): ItemStack[];
    static findIntersection<T extends Predicate<U>, U>(a: T, b: T, isEmpty: Predicate<T>, elements: Function<T, U[]>, compare: BiPredicate<U, U>): U[];
  }


  class InstantiationUtil {
    static getOrCreateInstance<T>(cls: Class<T>): T;
  }


  class ItemStackUtil {
    static areStacksTheSame(first: ItemStack, second: ItemStack): boolean;
    static areStacksTheSame(first: ItemStack, second: ItemStack, conditions: IngredientConditions): boolean;
    static getCommandString(itemLike: ItemLike): string;
    static getCommandString(stack: ItemStack): string;
    static getCommandString(stack: ItemStack, mutable: boolean): string;
  }


  interface Many<T = any> extends CommandStringDisplayable {}
  class Many<T = any> extends CommandStringDisplayable {
    constructor(data: T, amount: number, commandStringFunc: Function<T, string>);
    get amount(): number;
    get commandString(): string;
    get commandStringFunc(): Function<T, string>;
    get data(): T;
  }


  class NameUtil {
    static fixing(input: string): string;
    static fixing(input: string, mistakeHandler: BiConsumer<string, string[]>): string;
    static fromFixedName(input: string): ResourceLocation;
    static fromFixedName(input: string, mistakeHandler: BiConsumer<string, string[]>): ResourceLocation;
    static generateNameFrom(discriminator: string, name: string): ResourceLocation;
    static isAutogeneratedName(name: ResourceLocation): boolean;
  }


  class ParseUtil {
    static createResourceLocationArgument(position: CodePosition, location: ResourceLocation): ParsedExpression;
    static readBracketContent(position: CodePosition, tokens: ZSTokenParser): string;
    static readContent(position: CodePosition, tokens: ZSTokenParser, endType: ZSTokenType): string;
    static readParsedType(name: string, position: CodePosition): IParsedType;
    static staticMemberExpression(position: CodePosition, name: string): ParsedExpression;
  }


  class PathUtil {
    static findFromGameDirectory(other: string): Path;
    static findFromGameDirectory(other: Path): Path;
    static makeRelativeToGameDirectory(other: string): Path;
    static makeRelativeToGameDirectory(other: Path): Path;
    static makeSameFileSystemPath(original: Path, other: string): Path;
  }


  class RecipeUtil {
    static createPattern(ingredients: IIngredient[][]): ShapedRecipePattern;
    static createPattern(flatIngredients: NonNullList<Ingredient>, width: number, height: number): ShapedRecipePattern;
    static dissolvePattern(pattern: string[], keys: Map<string, IIngredient>, width: number, height: number): IIngredient[][];
    static flatten(ingredients: IIngredient[][], width: number, height: number): IIngredient[];
    static inflate(flattened: IIngredient[], width: number, height: number): IIngredient[][];
    static shrink(ingredients: IIngredient[][]): IIngredient[][];
  }


  class StringUtil {
    static matchesRegex(string: string, regex: string): boolean;
    static quoteAndEscape(location: ResourceLocation): string;
    static quoteAndEscape(str: string): string;
    static wrap(str: string, withParameter: string, escape: boolean): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.util.HandleUtil' {
  import { Iterable, Enum, RuntimeException } from 'java.lang';
  import { Iterator, List } from 'java.util';

  interface Names extends Iterable<string> {}
  class Names extends Iterable<string> {
    iterator(): Iterator<string>;
    static of(...names: string[]): Names;
    toString(): string;
  }


  interface AccessType extends Enum<AccessType> {}
  class AccessType extends Enum<AccessType> {
    static readonly VIRTUAL: AccessType;
    static readonly STATIC: AccessType;
    static valueOf(name: string): AccessType;
    static values(): AccessType[];
  }


  interface UnableToLinkHandleException extends RuntimeException {}
  class UnableToLinkHandleException extends RuntimeException {
  }


  class MethodHandleInvoker<R = any> {
    invoke(): R;
  }


  interface FailedInvocationException extends RuntimeException {}
  class FailedInvocationException extends RuntimeException {
  }


  class MethodHandleVoidInvoker {
    invoke(): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.util.random' {
  import { CommandStringDisplayable } from 'com.blamejared.crafttweaker.api.bracket';
  import { Function } from 'java.util.function';

  interface Percentaged<T = any> extends CommandStringDisplayable {}
  class Percentaged<T = any> extends CommandStringDisplayable {
    constructor(data: T, percentage: number, commandStringFunc: Function<T, string>);
    equals(o: any): boolean;
    get commandString(): string;
    get data(): T;
    get percentage(): number;
    hashCode(): number;
  }

}

declare module 'com.blamejared.crafttweaker.api.util.sequence' {
  import { Supplier, Predicate, BiPredicate, Consumer, BiConsumer } from 'java.util.function';
  import { Queue, Map, List } from 'java.util';
  import { ISequenceTask } from 'com.blamejared.crafttweaker.api.util.sequence.task';

  class Sequence<T = any, U = any> {
    constructor(actor: Supplier<T>, data: U, timeline: Queue<ISequenceTask<T, U>>);
    get context(): SequenceContext<T, U>;
    isComplete(): boolean;
    isStopped(): boolean;
    stop(): void;
    tick(): void;
  }


  class SequenceBuilder<T = any, U = any> {
    constructor(type: SequenceType, actor: Supplier<T>, data: U);
    addTask(task: ISequenceTask<T, U>): SequenceBuilder<T, U>;
    run(functionParameter: Consumer<T>): SequenceBuilder<T, U>;
    run(functionParameter: BiConsumer<T, SequenceContext<T, U>>): SequenceBuilder<T, U>;
    sleep(ticks: number): SequenceBuilder<T, U>;
    sleepUntil(condition: Predicate<T>): SequenceBuilder<T, U>;
    sleepUntil(condition: BiPredicate<T, SequenceContext<T, U>>): SequenceBuilder<T, U>;
    start(): Sequence<T, U>;
    then(functionParameter: Consumer<T>): SequenceBuilder<T, U>;
    then(functionParameter: BiConsumer<T, SequenceContext<T, U>>): SequenceBuilder<T, U>;
  }


  class SequenceContext<T = any, U = any> {
    constructor(sequence: Sequence<T, U>, data: U);
    get data(): U;
    stop(): void;
  }


  class SequenceManager {
    static addSequence(type: SequenceType, sequence: Sequence<any, any>): void;
    static clearSequences(): void;
    static clearSequences(type: SequenceType): void;
    static get sequences(): Map<SequenceType, Sequence<any, any>[]>;
    static removeSequence(type: SequenceType, sequence: Sequence<any, any>): void;
    static tick(type: SequenceType): void;
  }


  class SequenceType {
    static readonly SERVER_THREAD_LEVEL: SequenceType;
    static readonly CLIENT_THREAD_LEVEL: SequenceType;
    constructor(name: string);
  }

}

declare module 'com.blamejared.crafttweaker.api.util.sequence.task' {
  import { SequenceContext } from 'com.blamejared.crafttweaker.api.util.sequence';

  class ISequenceTask<T = any, U = any> {
    isComplete(var1: T, var2: SequenceContext<T, U>): boolean;
    tick(var1: T, var2: SequenceContext<T, U>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.util.sequence.task.type' {
  import { ISequenceTask } from 'com.blamejared.crafttweaker.api.util.sequence.task';
  import { Consumer, BiConsumer, Predicate, BiPredicate } from 'java.util.function';
  import { SequenceContext } from 'com.blamejared.crafttweaker.api.util.sequence';

  interface InstantTask<T = any, U = any> extends ISequenceTask<T, U> {}
  class InstantTask<T = any, U = any> extends ISequenceTask<T, U> {
    constructor(actorConsumer: Consumer<T>);

    constructor(actorConsumer: BiConsumer<T, SequenceContext<T, U>>);
    isComplete(actor: T, data: SequenceContext<T, U>): boolean;
    tick(actor: T, data: SequenceContext<T, U>): void;
  }


  interface SleepTask<T = any, U = any> extends ISequenceTask<T, U> {}
  class SleepTask<T = any, U = any> extends ISequenceTask<T, U> {
    constructor(sleepTime: number);
    isComplete(actor: T, data: SequenceContext<T, U>): boolean;
    tick(actor: T, data: SequenceContext<T, U>): void;
  }


  interface SleepUntilTask<T = any, U = any> extends ISequenceTask<T, U> {}
  class SleepUntilTask<T = any, U = any> extends ISequenceTask<T, U> {
    constructor(condition: Predicate<T>);

    constructor(condition: BiPredicate<T, SequenceContext<T, U>>);
    isComplete(actor: T, data: SequenceContext<T, U>): boolean;
    tick(actor: T, data: SequenceContext<T, U>): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.villager' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { List, Map } from 'java.util';
  import { VillagerProfession } from 'net.minecraft.world.entity.npc';
  import { BiFunction } from 'java.util.function';
  import { Entity } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { NullableMerchantOffer } from '@ZenCodeType';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { ItemListing } from 'VillagerTrades';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';

  class CTTradeObject {
    constructor(buyingStack: IItemStack, buyingStackSecond: IItemStack, sellingStack: IItemStack);
    get buyingStack(): IItemStack;
    get buyingStackSecond(): IItemStack;
    get sellingStack(): IItemStack;
    toString(): string;
  }


  class CTVillagerTrades {
    static readonly INSTANCE: CTVillagerTrades;
    static readonly ACTIONS_VILLAGER_TRADES: List;
    static readonly ACTION_WANDERING_TRADES: List;
    static readonly TRADE_CONVERTER: Map;
    addTrade(profession: VillagerProfession, villagerLevel: number, offerGenerator: BiFunction<Entity, RandomSource, NullableMerchantOffer>): void;
    addTrade(profession: VillagerProfession, villagerLevel: number, emeralds: number, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number): void;
    addTrade(profession: VillagerProfession, villagerLevel: number, input1: ItemStack, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number): void;
    addTrade(profession: VillagerProfession, villagerLevel: number, input1: ItemStack, input2: ItemStack, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number): void;
    addTrade(profession: VillagerProfession, villagerLevel: number, trade: ItemListing): void;
    addWanderingTrade(rarity: number, trade: ItemListing): void;
    addWanderingTrade(rarity: number, emeralds: number, forSale: ItemStack, maxTrades: number, xp: number): void;
    addWanderingTrade(rarity: number, price: IItemStack, forSale: IItemStack, maxTrades: number, xp: number): void;
    static clear(): void;
    removeAllTrades(profession: VillagerProfession, villagerLevel: number): void;
    removeAllWanderingTrades(rarity: number): void;
    removeBasicTrade(profession: VillagerProfession, villagerLevel: number, forSale: IItemStack, price: IItemStack, price2: IItemStack): void;
    removeDyedArmorForEmeraldsTrade(profession: VillagerProfession, villagerLevel: number, buyingItem: Item): void;
    removeEmeraldForItemsTrade(profession: VillagerProfession, villagerLevel: number, tradeFor: IItemStack): void;
    removeEnchantBookForEmeraldsTrade(profession: VillagerProfession, villagerLevel: number): void;
    removeEnchantedItemForEmeraldsTrade(profession: VillagerProfession, villagerLevel: number, buyingItem: IItemStack): void;
    removeItemsAndEmeraldsToItemsTrade(profession: VillagerProfession, villagerLevel: number, sellingItem: IItemStack, buyingItem: IItemStack): void;
    removeItemsForEmeraldsTrade(profession: VillagerProfession, villagerLevel: number, sellingItem: IItemStack): void;
    removeSuspiciousStewForEmeraldTrade(profession: VillagerProfession, villagerLevel: number): void;
    removeTippedArrowForItemsAndEmeraldsTrade(profession: VillagerProfession, villagerLevel: number, potionStack: IItemStack, sellingItem: Item): void;
    removeTrade(profession: VillagerProfession, villagerLevel: number, buying: IIngredient, selling: IIngredient, secondBuying: IIngredient): void;
    removeTradesBuying(profession: VillagerProfession, villagerLevel: number, buying: IIngredient): void;
    removeTradesBuying(profession: VillagerProfession, villagerLevel: number, buying: IIngredient, secondBuying: IIngredient): void;
    removeTradesSelling(profession: VillagerProfession, villagerLevel: number, selling: IIngredient): void;
    removeTreasureMapForEmeraldsTrade(profession: VillagerProfession, villagerLevel: number): void;
    removeWanderingTrade(rarity: number, tradeFor: IIngredient): void;
  }


  class ITradeRemover {
    shouldRemove(var1: ItemListing): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.villager.trade.type' {
  import { ItemListing } from 'VillagerTrades';
  import { ItemStack } from 'net.minecraft.world.item';
  import { MerchantOffer } from 'net.minecraft.world.item.trading';
  import { Entity } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { BiFunction } from 'java.util.function';

  interface BasicTradeListing extends ItemListing, IBasicItemListing {}
  class BasicTradeListing extends ItemListing {
    constructor(price: ItemStack, price2: ItemStack, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number);

    constructor(price: ItemStack, forSale: ItemStack, maxTrades: number, xp: number, priceMult: number);

    constructor(emeralds: number, forSale: ItemStack, maxTrades: number, xp: number, mult: number);

    constructor(emeralds: number, forSale: ItemStack, maxTrades: number, xp: number);
    get forSale(): ItemStack;
    get maxTrades(): number;
    get price(): ItemStack;
    get price2(): ItemStack;
    get priceMult(): number;
    get xp(): number;
    getOffer(trader: Entity, rand: RandomSource): MerchantOffer;
  }


  interface CustomTradeListing extends ItemListing {}
  class CustomTradeListing extends ItemListing {
    constructor(offerGenerator: BiFunction<Entity, RandomSource, MerchantOffer>);
    getOffer(entity: Entity, random: RandomSource): MerchantOffer;
  }


  class IBasicItemListing {
    get forSale(): ItemStack;
    get maxTrades(): number;
    get price(): ItemStack;
    get price2(): ItemStack;
    get priceMult(): number;
    get xp(): number;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode' {
  import { Comparator, List, Collection, Optional, Set } from 'java.util';
  import { IScriptFile, IMutableScriptRunInfo } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { Pattern } from 'java.util.regex';
  import { Logger } from 'org.apache.logging.log4j';
  import { Match } from 'com.blamejared.crafttweaker.api.zencode.IPreprocessor';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { IClassData } from 'com.blamejared.crafttweaker.api.zencode.IZenClassRegistry';
  import { INativeTypeRegistry } from 'com.blamejared.crafttweaker.api.natives';

  class CraftTweakerGlobals {
    static print(msg: string): void;
    static println(msg: string): void;
  }


  interface IPreprocessor extends Comparator<IScriptFile> {}
  class IPreprocessor extends Comparator<IScriptFile> {
    static readonly PREPROCESSOR_PATTERN: Pattern;
    static readonly PREPROCESSOR_LOGGER: Logger;
    apply(var1: IScriptFile, var2: string[], var3: IMutableScriptRunInfo, var4: Match[]): boolean;
    compare(a: IScriptFile, b: IScriptFile): number;
    defaultValue(): string;
    preprocessorEndMarker(): string;
    priority(): number;
  }


  class IScriptLoader {
    allInheritedLoaders(): Collection<IScriptLoader>;
    static find(name: string): IScriptLoader;
    inheritedLoaders(): Collection<IScriptLoader>;
  }


  class IScriptLoadSource {
    static find(id: ResourceLocation): IScriptLoadSource;
    id(): ResourceLocation;
  }


  class IZenClassRegistry {
    getClassData(var1: IScriptLoader): IClassData;
    getClassesInPackage(var1: IScriptLoader, var2: string): Class<any>[];
    getGlobalsInPackage(var1: IScriptLoader, var2: string): Class<any>[];
    getImplementationsOf<T>(var1: IScriptLoader, var2: Class<T>): Class<T>[];
    getNameFor(var1: IScriptLoader, var2: Class<any>): Optional<string>;
    getNativeTypeRegistry(var1: IScriptLoader): INativeTypeRegistry;
    getRootPackages(var1: IScriptLoader): Set<string>;
    isBlacklisted(var1: Class<any>): boolean;
    isRegistered(var1: IScriptLoader, var2: Class<any>): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.expand' {
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Map, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { ParsedExpressionArray, ParsedExpressionMap } from 'org.openzen.zenscript.parser.expression';
  import { ExpressionScope } from 'org.openzen.zenscript.codemodel.scope';

  class ExpandArray {
    static asData(values: IData[]): IData;
  }


  class ExpandBool {
    static asData(_this: boolean): IData;
  }


  class ExpandByte {
    static asData(value: number): IData;
  }


  class ExpandByteArray {
    static asData(value: number[]): IData;
  }


  class ExpandDouble {
    static asData(value: number): IData;
  }


  class ExpandFloat {
    static asData(value: number): IData;
  }


  class ExpandInt {
    static asData(value: number): IData;
  }


  class ExpandIntArray {
    static asData(value: number[]): IData;
  }


  class ExpandLong {
    static asData(value: number): IData;
  }


  class ExpandLongArray {
    static asData(value: number[]): IData;
  }


  class ExpandMap {
    static asData(map: Map<string, IData>): IData;
  }


  class ExpandShort {
    static asData(value: number): IData;
  }


  class ExpandString {
    static asComponent(value: string): Component;
    static asData(value: string): IData;
    static asDouble(value: string): number;
    static asInt(value: string): number;
  }


  class IDataRewrites {
    static readonly IDATA_NAME: List;
    static readonly LIST_DATA_NAME: List;
    static readonly MAP_DATA_NAME: List;
    static rewriteArray(parsedExpressionArray: ParsedExpressionArray, expressionScope: ExpressionScope): IPartialExpression;
    static rewriteMap(parsedExpressionMap: ParsedExpressionMap, expressionScope: ExpressionScope): IPartialExpression;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.expand.ExpandMap' {
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Map } from 'java.util';

  class ExpandMapString {
    static asData(map: Map<string, string>): IData;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.IZenClassRegistry' {
  import { List } from 'java.util';
  import { Class } from 'java.lang';
  import { BiMap, Multimap } from 'com.google.common.collect';

  class IClassData {
    classes(): BiMap<string, Class<any>>;
    expansions(): Multimap<string, Class<any>>;
    globals(): BiMap<string, Class<any>>;
    registeredClasses(): Class<any>[];
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.scriptrun' {
  import { List, Optional, Collection } from 'java.util';
  import { SourceFile } from 'org.openzen.zencode.shared';
  import { Match } from 'com.blamejared.crafttweaker.api.zencode.IPreprocessor';
  import { IPreprocessor, IScriptLoader, IScriptLoadSource } from 'com.blamejared.crafttweaker.api.zencode';
  import { IAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Path } from 'java.nio.file';
  import { JavaNativeModule } from 'org.openzen.zencode.java.module';
  import { ICraftTweakerRegistry } from 'com.blamejared.crafttweaker.api';
  import { ModuleCreator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun.IScriptRunModuleConfigurator';

  interface IMutableScriptRunInfo extends IScriptRunInfo {}
  class IMutableScriptRunInfo extends IScriptRunInfo {
    displayBranding(var1: boolean): void;
    displayBranding(): boolean;
    dumpClasses(var1: boolean): void;
    dumpClasses(): boolean;
  }


  class IScriptFile {
    fileContents(): string[];
    hasMatchesFor(preprocessor: IPreprocessor): boolean;
    matchesFor(var1: IPreprocessor): Match[];
    preprocessedContents(): string[];
    toSourceFile(): Optional<SourceFile>;
  }


  class IScriptRun {
    execute(): void;
    specificRunInfo(): IScriptRunInfo;
  }


  class IScriptRunInfo {
    appliedActions(): IAction[];
    configuration(): ScriptRunConfiguration;
    displayBranding(): boolean;
    dumpClasses(): boolean;
    invalidActions(): IAction[];
    isFirstRun(): boolean;
    loadSource(): IScriptLoadSource;
    loader(): IScriptLoader;
  }


  class IScriptRunManager {
    applyAction(var1: IAction): void;
    createScriptRun(var1: ScriptRunConfiguration): IScriptRun;
    createScriptRun(var1: Path, var2: ScriptRunConfiguration): IScriptRun;
    createScriptRun(var1: Path, var2: ScriptDiscoveryConfiguration, var3: ScriptRunConfiguration): IScriptRun;
    createScriptRun(var1: Path, var2: Path[], var3: ScriptRunConfiguration): IScriptRun;
    createScriptRun(var1: SourceFile[], var2: ScriptRunConfiguration): IScriptRun;
    currentRunInfo(): IScriptRunInfo;
  }


  class IScriptRunModuleConfigurator {
    static createDefault(basePackage: string): IScriptRunModuleConfigurator;
    populateModules(var1: ICraftTweakerRegistry, var2: ScriptRunConfiguration, var3: ModuleCreator): Collection<JavaNativeModule>;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.scriptrun.IScriptRunModuleConfigurator' {
  import { JavaNativeModule } from 'org.openzen.zencode.java.module';
  import { List } from 'java.util';
  import { Consumer } from 'java.util.function';

  class ModuleCreator {
    createNativeModule(var1: string, var2: string, var3: JavaNativeModule[], var4: Consumer<JavaNativeModule>): JavaNativeModule;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.scriptrun.ScriptDiscoveryConfiguration' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';

  interface SuspiciousNamesBehavior extends Enum<SuspiciousNamesBehavior> {}
  class SuspiciousNamesBehavior extends Enum<SuspiciousNamesBehavior> {
    static readonly IGNORE: SuspiciousNamesBehavior;
    static readonly WARN: SuspiciousNamesBehavior;
    static valueOf(name: string): SuspiciousNamesBehavior;
    static values(): SuspiciousNamesBehavior[];
  }


  class DiscoveryRetainer {
    retain(var1: Path, var2: Path[]): void;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.scriptrun.ScriptRunConfiguration' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RunKind extends Enum<RunKind> {}
  class RunKind extends Enum<RunKind> {
    static readonly SYNTAX_CHECK: RunKind;
    static readonly FORMAT: RunKind;
    static readonly EXECUTE: RunKind;
    static readonly GAME_TEST: RunKind;
    static valueOf(name: string): RunKind;
    static values(): RunKind[];
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.util' {
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { StackTraceElement } from 'java.lang';

  class PositionUtil {
    static get zCScriptPositionFromStackTrace(): CodePosition;
    static getZCScriptPositionFromStackTrace(stackTrace: StackTraceElement[]): CodePosition;
  }


  class ZenKeywordUtil {
    static isKeyword(string: string): boolean;
    static sanitize(string: string): string;
  }

}

declare module 'com.blamejared.crafttweaker.api.zencode.ZenTypeInfo' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TypeKind extends Enum<TypeKind> {}
  class TypeKind extends Enum<TypeKind> {
    static readonly CLASS: TypeKind;
    static readonly EXPANSION: TypeKind;
    static valueOf(name: string): TypeKind;
    static values(): TypeKind[];
  }

}

declare module 'com.blamejared.crafttweaker' {
  import { PluginManager } from 'com.blamejared.crafttweaker.impl.plugin.core';
  import { Logger } from 'org.apache.logging.log4j';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { Set } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Registry } from 'net.minecraft.core';

  class CraftTweakerCommon {
    static get patronList(): Set<string>;
    static get pluginManager(): PluginManager;
    static init(): void;
    static loadInitScripts(): void;
    static logger(): Logger;
    static registerCommands(dispatcher: CommandDispatcher<CommandSourceStack>, environment: CommandSelection): void;
  }


  class CraftTweakerNeoForge {
    constructor(bus: IEventBus);
  }


  class CraftTweakerRegistries {
    static TRANSFORMER_SERIALIZER: Registry;
    static CONDITIONER_SERIALIZER: Registry;
    static init(): void;
  }

}

declare module 'com.blamejared.crafttweaker.CraftTweakerRegistries' {
  import { ResourceKey } from 'net.minecraft.resources';

  class Keys {
    static TRANSFORMER_SERIALIZER: ResourceKey;
    static CONDITIONER_SERIALIZER: ResourceKey;
  }

}

declare module 'com.blamejared.crafttweaker.gametest' {
  import { List } from 'java.util';
  import { TestFunction } from 'net.minecraft.gametest.framework';

  class CraftTweakerGameTests {
    static get tests(): TestFunction[];
  }

}

declare module 'com.blamejared.crafttweaker.gametest.logging.appender' {
  import { AbstractAppender } from 'org.apache.logging.log4j.core.appender';
  import { LogEvent, Filter, Layout } from 'org.apache.logging.log4j.core';
  import { Serializable } from 'java.io';
  import { QueryableLog } from 'com.blamejared.crafttweaker.gametest.logging.appender.GameTestLoggerAppender';

  interface GameTestLoggerAppender extends AbstractAppender {}
  class GameTestLoggerAppender extends AbstractAppender {
    append(event: LogEvent): void;
    claim(): void;
    static createAppender(name: string, filter: Filter, layout: Layout<Serializable>): GameTestLoggerAppender;
    query(): QueryableLog;
  }

}

declare module 'com.blamejared.crafttweaker.gametest.logging.appender.GameTestLoggerAppender' {
  import { List } from 'java.util';

  class QueryableLog {
    assertNoErrors(): void;
    assertNoWarnings(): void;
    assertOutput(index: number, message: string): void;
    assertOutputContains(index: number, message: string): void;
    dump(): void;
    static mock(mockMessages: string[]): QueryableLog;
  }

}

declare module 'com.blamejared.crafttweaker.gametest.util' {
  import { List } from 'java.util';
  import { TestFunction } from 'net.minecraft.gametest.framework';

  class ICraftTweakerGameTester {
    collectTests(): TestFunction[];
  }

}

declare module 'com.blamejared.crafttweaker.impl.command' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { CommandBuilder } from 'com.blamejared.crafttweaker.api.plugin.ICommandRegistrationHandler';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { CommandSelection } from 'Commands';
  import { Map } from 'java.util';

  class CtCommands {
    commands(): Map<string, CommandImpl>;
    finalizeCommands(): void;
    static get (): CtCommands;
    registerCommand(id: string, desc: MutableComponent, builder: CommandBuilder): void;
    registerCommandsTo(dispatcher: CommandDispatcher<CommandSourceStack>, environment: CommandSelection): void;
    registerDump(dumpId: string, description: MutableComponent, builder: CommandBuilder): void;
    registerSubCommand(parent: string, id: string, desc: MutableComponent, builder: CommandBuilder): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.command.type.conflict' {
  import { ICommandRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';
  import { Predicate } from 'java.util.function';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { OfLong } from 'PrimitiveIterator';

  class ConflictCommand {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }


  interface DescriptiveFilter extends Predicate<RecipeHolder> {}
  class DescriptiveFilter extends Predicate<RecipeHolder> {
    test(recipe: RecipeHolder<any>): boolean;
  }


  interface RecipeLongIterator extends OfLong {}
  class RecipeLongIterator extends OfLong {
    hasNext(): boolean;
    nextLong(): number;
  }

}

declare module 'com.blamejared.crafttweaker.impl.command.type' {
  import { ICommandRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';
  import { CtCommands } from 'com.blamejared.crafttweaker.impl.command';

  class DumpCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
    static registerDumpers(handler: ICommandRegistrationHandler): void;
  }


  class HandCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }


  class HelpCommand {
    static registerCommandIfRequired(instance: CtCommands): void;
  }


  class InventoryCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }


  class MiscCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }


  class ModCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }


  class RecipeCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.command.type.script' {
  import { ICommandRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';

  class ScriptCommands {
    static registerCommands(handler: ICommandRegistrationHandler): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl' {
  class CraftTweakerEarlyInit {
    static run(): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.datamap' {
  import { Map, List } from 'java.util';
  import { DataMapType, DataMapFile } from 'net.neoforged.neoforge.registries.datamaps';

  class LoadResultGetter {
    results(): Map<DataMapType<any, any>, DataMapFile<any, any>[]>;
  }

}

declare module 'com.blamejared.crafttweaker.impl.event' {
  import { RecipesUpdatedEvent, RenderNameTagEvent } from 'net.neoforged.neoforge.client.event';
  import { ItemTooltipEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Pre } from 'LevelTickEvent';
  import { RightClickBlock, EntityInteract } from 'PlayerInteractEvent';
  import { WandererTradesEvent, VillagerTradesEvent } from 'net.neoforged.neoforge.event.village';
  import { FurnaceFuelBurnTimeEvent } from 'net.neoforged.neoforge.event.furnace';
  import { PlayerLoggedInEvent, PlayerLoggedOutEvent } from 'PlayerEvent';
  import { RegisterCommandsEvent, AddReloadListenerEvent, RegisterGameTestsEvent } from 'net.neoforged.neoforge.event';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { GatherDataEvent } from 'net.neoforged.neoforge.data.event';
  import { Class, Enum } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { List } from 'java.util';

  class CTClientEventHandler {
    static handleTooltips(e: ItemTooltipEvent): void;
    static nameTag(e: RenderNameTagEvent): void;
    static onRecipesUpdated(event: RecipesUpdatedEvent): void;
  }


  class CTCommonEventHandler {
    static blockInteract(e: RightClickBlock): void;
    static burnTimeTweaker(e: FurnaceFuelBurnTimeEvent): void;
    static entityInteract(e: EntityInteract): void;
    static playerLogin(event: PlayerLoggedInEvent): void;
    static playerLogout(event: PlayerLoggedOutEvent): void;
    static registerCommands(event: RegisterCommandsEvent): void;
    static resourceReload(event: AddReloadListenerEvent): void;
    static villagerTradesTweaker(e: VillagerTradesEvent): void;
    static wanderingTradesTweaker(e: WandererTradesEvent): void;
    static worldTick(e: Pre): void;
  }


  class CTModEventHandler {
    static gatherData(event: GatherDataEvent): void;
    static onRegisterGameTests(event: RegisterGameTestsEvent): void;
    static registerPackets(event: RegisterPayloadHandlersEvent): void;
  }


  class ZenEventManager {
    static readonly EVENTS: ZenEventManager;
    register<T>(typeOfT: Class<T>, consumer: Consumer<T>): void;
    register<T>(typeOfT: Class<T>, phase: ZenEventPhase, consumer: Consumer<T>): void;
    register<T>(typeOfT: Class<T>, listenToCanceled: boolean, consumer: Consumer<T>): void;
    register<T>(typeOfT: Class<T>, phase: ZenEventPhase, listenToCanceled: boolean, consumer: Consumer<T>): void;
  }


  interface ZenEventPhase extends Enum<ZenEventPhase> {}
  class ZenEventPhase extends Enum<ZenEventPhase> {
    static readonly EARLIEST: ZenEventPhase;
    static readonly NORMAL: ZenEventPhase;
    static readonly LATEST: ZenEventPhase;
    static valueOf(name: string): ZenEventPhase;
    static values(): ZenEventPhase[];
  }

}

declare module 'com.blamejared.crafttweaker.impl.helper' {
  import { IAccessibleClientElementsProvider, IAccessibleElementsProvider, IAccessibleServerElementsProvider } from 'com.blamejared.crafttweaker.platform.helper';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Consumer, Function } from 'java.util.function';
  import { TagAddingRegistryLookup } from 'com.blamejared.crafttweaker.api.registry';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { AccessRecipeManager } from 'com.blamejared.crafttweaker.mixin.common.access.recipe';
  import { ReloadableServerResources } from 'net.minecraft.server';
  import { AccessReloadableServerResources } from 'com.blamejared.crafttweaker.mixin.common.access.server';
  import { SimpleFileVisitor, Path, FileVisitor, PathMatcher, FileVisitResult } from 'java.nio.file';
  import { BasicFileAttributes } from 'java.nio.file.attribute';

  interface AccessibleClientElementsProvider extends IAccessibleClientElementsProvider {}
  class AccessibleClientElementsProvider extends IAccessibleClientElementsProvider {
    hasRegistryAccess(): boolean;
    registryAccess(): RegistryAccess;
    registryAccess(registryAccess: RegistryAccess): void;
    runWithRegistryAccess(consumer: Consumer<RegistryAccess>): void;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }


  interface AccessibleElementsProvider extends IAccessibleElementsProvider {}
  class AccessibleElementsProvider extends IAccessibleElementsProvider {
    accessibleRecipeManager(): AccessRecipeManager;
    client(): IAccessibleClientElementsProvider;
    static get (): IAccessibleElementsProvider;
    hasRegistryAccess(): boolean;
    recipeManager(): RecipeManager;
    recipeManager(manager: RecipeManager): void;
    registryAccess(): RegistryAccess;
    registryAccess<T>(func: Function<RegistryAccess, T>): T;
    server(): IAccessibleServerElementsProvider;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }


  interface AccessibleServerElementsProvider extends IAccessibleServerElementsProvider {}
  class AccessibleServerElementsProvider extends IAccessibleServerElementsProvider {
    accessibleResources(): AccessReloadableServerResources;
    hasRegistryAccess(): boolean;
    hasResources(): boolean;
    registryAccess(): RegistryAccess;
    registryAccess(registryAccess: RegistryAccess): void;
    resources(): ReloadableServerResources;
    resources(resources: ReloadableServerResources): void;
    runWithRegistryAccess(consumer: Consumer<RegistryAccess>): void;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }


  interface FileGathererHelper extends SimpleFileVisitor<Path> {}
  class FileGathererHelper extends SimpleFileVisitor<Path> {
    static of(matcher: PathMatcher, onFileDiscovered: Consumer<Path>): FileVisitor<Path>;
    static of(onFileDiscovered: Consumer<Path>): FileVisitor<Path>;
    visitFile(file: Path, attrs: BasicFileAttributes): FileVisitResult;
  }

}

declare module 'com.blamejared.crafttweaker.impl.logging' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { QueryableLog } from 'com.blamejared.crafttweaker.gametest.logging.appender.GameTestLoggerAppender';
  import { Logger, Level, Marker, LogBuilder } from 'org.apache.logging.log4j';
  import { Throwable, CharSequence, StackTraceElement } from 'java.lang';
  import { Message, MessageFactory, FlowMessageFactory, EntryMessage } from 'org.apache.logging.log4j.message';
  import { MessageSupplier, Supplier } from 'org.apache.logging.log4j.util';
  import { ILoggerRegistry } from 'com.blamejared.crafttweaker.api.logging';
  import { AbstractAppender } from 'org.apache.logging.log4j.core.appender';
  import { Filter, Layout, LogEvent } from 'org.apache.logging.log4j.core';
  import { Serializable } from 'java.io';

  class CraftTweakerLog4jEditor {
    static addPlayer(player: Player): void;
    static claimGameTestLogger(): void;
    static clearPreviousMessages(): void;
    static edit(): void;
    static queryGameTestLogger(): QueryableLog;
    static removePlayer(player: Player): void;
  }


  interface ForwardingLogger extends Logger {}
  class ForwardingLogger extends Logger {
    always(): LogBuilder;
    atDebug(): LogBuilder;
    atError(): LogBuilder;
    atFatal(): LogBuilder;
    atInfo(): LogBuilder;
    atLevel(level: Level): LogBuilder;
    atTrace(): LogBuilder;
    atWarn(): LogBuilder;
    catching(level: Level, throwable: Throwable): void;
    catching(throwable: Throwable): void;
    debug(marker: Marker, message: Message): void;
    debug(marker: Marker, message: Message, throwable: Throwable): void;
    debug(marker: Marker, messageSupplier: MessageSupplier): void;
    debug(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    debug(marker: Marker, message: CharSequence): void;
    debug(marker: Marker, message: CharSequence, throwable: Throwable): void;
    debug(marker: Marker, message: any): void;
    debug(marker: Marker, message: any, throwable: Throwable): void;
    debug(marker: Marker, message: string): void;
    debug(marker: Marker, message: string, ...params: any[]): void;
    debug(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    debug(marker: Marker, message: string, throwable: Throwable): void;
    debug(marker: Marker, messageSupplier: Supplier<any>): void;
    debug(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    debug(message: Message): void;
    debug(message: Message, throwable: Throwable): void;
    debug(messageSupplier: MessageSupplier): void;
    debug(messageSupplier: MessageSupplier, throwable: Throwable): void;
    debug(message: CharSequence): void;
    debug(message: CharSequence, throwable: Throwable): void;
    debug(message: any): void;
    debug(message: any, throwable: Throwable): void;
    debug(message: string): void;
    debug(message: string, ...params: any[]): void;
    debug(message: string, ...paramSuppliers: Supplier<any>[]): void;
    debug(message: string, throwable: Throwable): void;
    debug(messageSupplier: Supplier<any>): void;
    debug(messageSupplier: Supplier<any>, throwable: Throwable): void;
    debug(marker: Marker, message: string, p0: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    debug(message: string, p0: any): void;
    debug(message: string, p0: any, p1: any): void;
    debug(message: string, p0: any, p1: any, p2: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    entry(): void;
    entry(...params: any[]): void;
    error(marker: Marker, message: Message): void;
    error(marker: Marker, message: Message, throwable: Throwable): void;
    error(marker: Marker, messageSupplier: MessageSupplier): void;
    error(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    error(marker: Marker, message: CharSequence): void;
    error(marker: Marker, message: CharSequence, throwable: Throwable): void;
    error(marker: Marker, message: any): void;
    error(marker: Marker, message: any, throwable: Throwable): void;
    error(marker: Marker, message: string): void;
    error(marker: Marker, message: string, ...params: any[]): void;
    error(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    error(marker: Marker, message: string, throwable: Throwable): void;
    error(marker: Marker, messageSupplier: Supplier<any>): void;
    error(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    error(message: Message): void;
    error(message: Message, throwable: Throwable): void;
    error(messageSupplier: MessageSupplier): void;
    error(messageSupplier: MessageSupplier, throwable: Throwable): void;
    error(message: CharSequence): void;
    error(message: CharSequence, throwable: Throwable): void;
    error(message: any): void;
    error(message: any, throwable: Throwable): void;
    error(message: string): void;
    error(message: string, ...params: any[]): void;
    error(message: string, ...paramSuppliers: Supplier<any>[]): void;
    error(message: string, throwable: Throwable): void;
    error(messageSupplier: Supplier<any>): void;
    error(messageSupplier: Supplier<any>, throwable: Throwable): void;
    error(marker: Marker, message: string, p0: any): void;
    error(marker: Marker, message: string, p0: any, p1: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    error(message: string, p0: any): void;
    error(message: string, p0: any, p1: any): void;
    error(message: string, p0: any, p1: any, p2: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    exit(): void;
    exit<R>(result: R): R;
    fatal(marker: Marker, message: Message): void;
    fatal(marker: Marker, message: Message, throwable: Throwable): void;
    fatal(marker: Marker, messageSupplier: MessageSupplier): void;
    fatal(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    fatal(marker: Marker, message: CharSequence): void;
    fatal(marker: Marker, message: CharSequence, throwable: Throwable): void;
    fatal(marker: Marker, message: any): void;
    fatal(marker: Marker, message: any, throwable: Throwable): void;
    fatal(marker: Marker, message: string): void;
    fatal(marker: Marker, message: string, ...params: any[]): void;
    fatal(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    fatal(marker: Marker, message: string, throwable: Throwable): void;
    fatal(marker: Marker, messageSupplier: Supplier<any>): void;
    fatal(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    fatal(message: Message): void;
    fatal(message: Message, throwable: Throwable): void;
    fatal(messageSupplier: MessageSupplier): void;
    fatal(messageSupplier: MessageSupplier, throwable: Throwable): void;
    fatal(message: CharSequence): void;
    fatal(message: CharSequence, throwable: Throwable): void;
    fatal(message: any): void;
    fatal(message: any, throwable: Throwable): void;
    fatal(message: string): void;
    fatal(message: string, ...params: any[]): void;
    fatal(message: string, ...paramSuppliers: Supplier<any>[]): void;
    fatal(message: string, throwable: Throwable): void;
    fatal(messageSupplier: Supplier<any>): void;
    fatal(messageSupplier: Supplier<any>, throwable: Throwable): void;
    fatal(marker: Marker, message: string, p0: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    fatal(message: string, p0: any): void;
    fatal(message: string, p0: any, p1: any): void;
    fatal(message: string, p0: any, p1: any, p2: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    get flowMessageFactory(): FlowMessageFactory;
    get level(): Level;
    get messageFactory<MF extends MessageFactory>(): MF;
    get name(): string;
    info(marker: Marker, message: Message): void;
    info(marker: Marker, message: Message, throwable: Throwable): void;
    info(marker: Marker, messageSupplier: MessageSupplier): void;
    info(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    info(marker: Marker, message: CharSequence): void;
    info(marker: Marker, message: CharSequence, throwable: Throwable): void;
    info(marker: Marker, message: any): void;
    info(marker: Marker, message: any, throwable: Throwable): void;
    info(marker: Marker, message: string): void;
    info(marker: Marker, message: string, ...params: any[]): void;
    info(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    info(marker: Marker, message: string, throwable: Throwable): void;
    info(marker: Marker, messageSupplier: Supplier<any>): void;
    info(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    info(message: Message): void;
    info(message: Message, throwable: Throwable): void;
    info(messageSupplier: MessageSupplier): void;
    info(messageSupplier: MessageSupplier, throwable: Throwable): void;
    info(message: CharSequence): void;
    info(message: CharSequence, throwable: Throwable): void;
    info(message: any): void;
    info(message: any, throwable: Throwable): void;
    info(message: string): void;
    info(message: string, ...params: any[]): void;
    info(message: string, ...paramSuppliers: Supplier<any>[]): void;
    info(message: string, throwable: Throwable): void;
    info(messageSupplier: Supplier<any>): void;
    info(messageSupplier: Supplier<any>, throwable: Throwable): void;
    info(marker: Marker, message: string, p0: any): void;
    info(marker: Marker, message: string, p0: any, p1: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    info(message: string, p0: any): void;
    info(message: string, p0: any, p1: any): void;
    info(message: string, p0: any, p1: any, p2: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    isDebugEnabled(): boolean;
    isDebugEnabled(marker: Marker): boolean;
    isEnabled(level: Level): boolean;
    isEnabled(level: Level, marker: Marker): boolean;
    isErrorEnabled(): boolean;
    isErrorEnabled(marker: Marker): boolean;
    isFatalEnabled(): boolean;
    isFatalEnabled(marker: Marker): boolean;
    isInfoEnabled(): boolean;
    isInfoEnabled(marker: Marker): boolean;
    isTraceEnabled(): boolean;
    isTraceEnabled(marker: Marker): boolean;
    isWarnEnabled(): boolean;
    isWarnEnabled(marker: Marker): boolean;
    log(level: Level, marker: Marker, message: Message): void;
    log(level: Level, marker: Marker, message: Message, throwable: Throwable): void;
    log(level: Level, marker: Marker, messageSupplier: MessageSupplier): void;
    log(level: Level, marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: CharSequence): void;
    log(level: Level, marker: Marker, message: CharSequence, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: any): void;
    log(level: Level, marker: Marker, message: any, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: string): void;
    log(level: Level, marker: Marker, message: string, ...params: any[]): void;
    log(level: Level, marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    log(level: Level, marker: Marker, message: string, throwable: Throwable): void;
    log(level: Level, marker: Marker, messageSupplier: Supplier<any>): void;
    log(level: Level, marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    log(level: Level, message: Message): void;
    log(level: Level, message: Message, throwable: Throwable): void;
    log(level: Level, messageSupplier: MessageSupplier): void;
    log(level: Level, messageSupplier: MessageSupplier, throwable: Throwable): void;
    log(level: Level, message: CharSequence): void;
    log(level: Level, message: CharSequence, throwable: Throwable): void;
    log(level: Level, message: any): void;
    log(level: Level, message: any, throwable: Throwable): void;
    log(level: Level, message: string): void;
    log(level: Level, message: string, ...params: any[]): void;
    log(level: Level, message: string, ...paramSuppliers: Supplier<any>[]): void;
    log(level: Level, message: string, throwable: Throwable): void;
    log(level: Level, messageSupplier: Supplier<any>): void;
    log(level: Level, messageSupplier: Supplier<any>, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: string, p0: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    log(level: Level, message: string, p0: any): void;
    log(level: Level, message: string, p0: any, p1: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    logMessage(level: Level, marker: Marker, fqcn: string, location: StackTraceElement, message: Message, throwable: Throwable): void;
    printf(level: Level, marker: Marker, format: string, ...params: any[]): void;
    printf(level: Level, format: string, ...params: any[]): void;
    throwing<T extends Throwable>(level: Level, throwable: T): T;
    throwing<T extends Throwable>(throwable: T): T;
    trace(marker: Marker, message: Message): void;
    trace(marker: Marker, message: Message, throwable: Throwable): void;
    trace(marker: Marker, messageSupplier: MessageSupplier): void;
    trace(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    trace(marker: Marker, message: CharSequence): void;
    trace(marker: Marker, message: CharSequence, throwable: Throwable): void;
    trace(marker: Marker, message: any): void;
    trace(marker: Marker, message: any, throwable: Throwable): void;
    trace(marker: Marker, message: string): void;
    trace(marker: Marker, message: string, ...params: any[]): void;
    trace(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    trace(marker: Marker, message: string, throwable: Throwable): void;
    trace(marker: Marker, messageSupplier: Supplier<any>): void;
    trace(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    trace(message: Message): void;
    trace(message: Message, throwable: Throwable): void;
    trace(messageSupplier: MessageSupplier): void;
    trace(messageSupplier: MessageSupplier, throwable: Throwable): void;
    trace(message: CharSequence): void;
    trace(message: CharSequence, throwable: Throwable): void;
    trace(message: any): void;
    trace(message: any, throwable: Throwable): void;
    trace(message: string): void;
    trace(message: string, ...params: any[]): void;
    trace(message: string, ...paramSuppliers: Supplier<any>[]): void;
    trace(message: string, throwable: Throwable): void;
    trace(messageSupplier: Supplier<any>): void;
    trace(messageSupplier: Supplier<any>, throwable: Throwable): void;
    trace(marker: Marker, message: string, p0: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    trace(message: string, p0: any): void;
    trace(message: string, p0: any, p1: any): void;
    trace(message: string, p0: any, p1: any, p2: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    traceEntry(): EntryMessage;
    traceEntry(format: string, ...params: any[]): EntryMessage;
    traceEntry(...paramSuppliers: Supplier<any>[]): EntryMessage;
    traceEntry(format: string, ...paramSuppliers: Supplier<any>[]): EntryMessage;
    traceEntry(message: Message): EntryMessage;
    traceExit(): void;
    traceExit<R>(result: R): R;
    traceExit<R>(format: string, result: R): R;
    traceExit(message: EntryMessage): void;
    traceExit<R>(message: EntryMessage, result: R): R;
    traceExit<R>(message: Message, result: R): R;
    warn(marker: Marker, message: Message): void;
    warn(marker: Marker, message: Message, throwable: Throwable): void;
    warn(marker: Marker, messageSupplier: MessageSupplier): void;
    warn(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    warn(marker: Marker, message: CharSequence): void;
    warn(marker: Marker, message: CharSequence, throwable: Throwable): void;
    warn(marker: Marker, message: any): void;
    warn(marker: Marker, message: any, throwable: Throwable): void;
    warn(marker: Marker, message: string): void;
    warn(marker: Marker, message: string, ...params: any[]): void;
    warn(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    warn(marker: Marker, message: string, throwable: Throwable): void;
    warn(marker: Marker, messageSupplier: Supplier<any>): void;
    warn(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    warn(message: Message): void;
    warn(message: Message, throwable: Throwable): void;
    warn(messageSupplier: MessageSupplier): void;
    warn(messageSupplier: MessageSupplier, throwable: Throwable): void;
    warn(message: CharSequence): void;
    warn(message: CharSequence, throwable: Throwable): void;
    warn(message: any): void;
    warn(message: any, throwable: Throwable): void;
    warn(message: string): void;
    warn(message: string, ...params: any[]): void;
    warn(message: string, ...paramSuppliers: Supplier<any>[]): void;
    warn(message: string, throwable: Throwable): void;
    warn(messageSupplier: Supplier<any>): void;
    warn(messageSupplier: Supplier<any>, throwable: Throwable): void;
    warn(marker: Marker, message: string, p0: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    warn(message: string, p0: any): void;
    warn(message: string, p0: any, p1: any): void;
    warn(message: string, p0: any, p1: any, p2: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
  }


  interface LoggerRegistry extends ILoggerRegistry {}
  class LoggerRegistry extends ILoggerRegistry {
    static get (): LoggerRegistry;
    getLoggerFor(system: string): Logger;
  }


  interface PlayerAppender extends AbstractAppender {}
  class PlayerAppender extends AbstractAppender {
    append(event: LogEvent): void;
    static createAppender(name: string, filter: Filter, layout: Layout<Serializable>): PlayerAppender;
  }


  interface SystemLogger extends Logger {}
  class SystemLogger extends Logger {
    always(): LogBuilder;
    atDebug(): LogBuilder;
    atError(): LogBuilder;
    atFatal(): LogBuilder;
    atInfo(): LogBuilder;
    atLevel(level: Level): LogBuilder;
    atTrace(): LogBuilder;
    atWarn(): LogBuilder;
    catching(level: Level, throwable: Throwable): void;
    catching(throwable: Throwable): void;
    debug(marker: Marker, message: Message): void;
    debug(marker: Marker, message: Message, throwable: Throwable): void;
    debug(marker: Marker, messageSupplier: MessageSupplier): void;
    debug(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    debug(marker: Marker, message: CharSequence): void;
    debug(marker: Marker, message: CharSequence, throwable: Throwable): void;
    debug(marker: Marker, message: any): void;
    debug(marker: Marker, message: any, throwable: Throwable): void;
    debug(marker: Marker, message: string): void;
    debug(marker: Marker, message: string, ...params: any[]): void;
    debug(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    debug(marker: Marker, message: string, throwable: Throwable): void;
    debug(marker: Marker, messageSupplier: Supplier<any>): void;
    debug(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    debug(message: Message): void;
    debug(message: Message, throwable: Throwable): void;
    debug(messageSupplier: MessageSupplier): void;
    debug(messageSupplier: MessageSupplier, throwable: Throwable): void;
    debug(message: CharSequence): void;
    debug(message: CharSequence, throwable: Throwable): void;
    debug(message: any): void;
    debug(message: any, throwable: Throwable): void;
    debug(message: string): void;
    debug(message: string, ...params: any[]): void;
    debug(message: string, ...paramSuppliers: Supplier<any>[]): void;
    debug(message: string, throwable: Throwable): void;
    debug(messageSupplier: Supplier<any>): void;
    debug(messageSupplier: Supplier<any>, throwable: Throwable): void;
    debug(marker: Marker, message: string, p0: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    debug(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    debug(message: string, p0: any): void;
    debug(message: string, p0: any, p1: any): void;
    debug(message: string, p0: any, p1: any, p2: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    debug(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    entry(): void;
    entry(...params: any[]): void;
    error(marker: Marker, message: Message): void;
    error(marker: Marker, message: Message, throwable: Throwable): void;
    error(marker: Marker, messageSupplier: MessageSupplier): void;
    error(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    error(marker: Marker, message: CharSequence): void;
    error(marker: Marker, message: CharSequence, throwable: Throwable): void;
    error(marker: Marker, message: any): void;
    error(marker: Marker, message: any, throwable: Throwable): void;
    error(marker: Marker, message: string): void;
    error(marker: Marker, message: string, ...params: any[]): void;
    error(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    error(marker: Marker, message: string, throwable: Throwable): void;
    error(marker: Marker, messageSupplier: Supplier<any>): void;
    error(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    error(message: Message): void;
    error(message: Message, throwable: Throwable): void;
    error(messageSupplier: MessageSupplier): void;
    error(messageSupplier: MessageSupplier, throwable: Throwable): void;
    error(message: CharSequence): void;
    error(message: CharSequence, throwable: Throwable): void;
    error(message: any): void;
    error(message: any, throwable: Throwable): void;
    error(message: string): void;
    error(message: string, ...params: any[]): void;
    error(message: string, ...paramSuppliers: Supplier<any>[]): void;
    error(message: string, throwable: Throwable): void;
    error(messageSupplier: Supplier<any>): void;
    error(messageSupplier: Supplier<any>, throwable: Throwable): void;
    error(marker: Marker, message: string, p0: any): void;
    error(marker: Marker, message: string, p0: any, p1: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    error(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    error(message: string, p0: any): void;
    error(message: string, p0: any, p1: any): void;
    error(message: string, p0: any, p1: any, p2: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    error(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    exit(): void;
    exit<R>(result: R): R;
    fatal(marker: Marker, message: Message): void;
    fatal(marker: Marker, message: Message, throwable: Throwable): void;
    fatal(marker: Marker, messageSupplier: MessageSupplier): void;
    fatal(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    fatal(marker: Marker, message: CharSequence): void;
    fatal(marker: Marker, message: CharSequence, throwable: Throwable): void;
    fatal(marker: Marker, message: any): void;
    fatal(marker: Marker, message: any, throwable: Throwable): void;
    fatal(marker: Marker, message: string): void;
    fatal(marker: Marker, message: string, ...params: any[]): void;
    fatal(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    fatal(marker: Marker, message: string, throwable: Throwable): void;
    fatal(marker: Marker, messageSupplier: Supplier<any>): void;
    fatal(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    fatal(message: Message): void;
    fatal(message: Message, throwable: Throwable): void;
    fatal(messageSupplier: MessageSupplier): void;
    fatal(messageSupplier: MessageSupplier, throwable: Throwable): void;
    fatal(message: CharSequence): void;
    fatal(message: CharSequence, throwable: Throwable): void;
    fatal(message: any): void;
    fatal(message: any, throwable: Throwable): void;
    fatal(message: string): void;
    fatal(message: string, ...params: any[]): void;
    fatal(message: string, ...paramSuppliers: Supplier<any>[]): void;
    fatal(message: string, throwable: Throwable): void;
    fatal(messageSupplier: Supplier<any>): void;
    fatal(messageSupplier: Supplier<any>, throwable: Throwable): void;
    fatal(marker: Marker, message: string, p0: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    fatal(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    fatal(message: string, p0: any): void;
    fatal(message: string, p0: any, p1: any): void;
    fatal(message: string, p0: any, p1: any, p2: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    fatal(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    get flowMessageFactory(): FlowMessageFactory;
    get level(): Level;
    get messageFactory<MF extends MessageFactory>(): MF;
    get name(): string;
    info(marker: Marker, message: Message): void;
    info(marker: Marker, message: Message, throwable: Throwable): void;
    info(marker: Marker, messageSupplier: MessageSupplier): void;
    info(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    info(marker: Marker, message: CharSequence): void;
    info(marker: Marker, message: CharSequence, throwable: Throwable): void;
    info(marker: Marker, message: any): void;
    info(marker: Marker, message: any, throwable: Throwable): void;
    info(marker: Marker, message: string): void;
    info(marker: Marker, message: string, ...params: any[]): void;
    info(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    info(marker: Marker, message: string, throwable: Throwable): void;
    info(marker: Marker, messageSupplier: Supplier<any>): void;
    info(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    info(message: Message): void;
    info(message: Message, throwable: Throwable): void;
    info(messageSupplier: MessageSupplier): void;
    info(messageSupplier: MessageSupplier, throwable: Throwable): void;
    info(message: CharSequence): void;
    info(message: CharSequence, throwable: Throwable): void;
    info(message: any): void;
    info(message: any, throwable: Throwable): void;
    info(message: string): void;
    info(message: string, ...params: any[]): void;
    info(message: string, ...paramSuppliers: Supplier<any>[]): void;
    info(message: string, throwable: Throwable): void;
    info(messageSupplier: Supplier<any>): void;
    info(messageSupplier: Supplier<any>, throwable: Throwable): void;
    info(marker: Marker, message: string, p0: any): void;
    info(marker: Marker, message: string, p0: any, p1: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    info(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    info(message: string, p0: any): void;
    info(message: string, p0: any, p1: any): void;
    info(message: string, p0: any, p1: any, p2: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    info(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    isDebugEnabled(): boolean;
    isDebugEnabled(marker: Marker): boolean;
    isEnabled(level: Level): boolean;
    isEnabled(level: Level, marker: Marker): boolean;
    isErrorEnabled(): boolean;
    isErrorEnabled(marker: Marker): boolean;
    isFatalEnabled(): boolean;
    isFatalEnabled(marker: Marker): boolean;
    isInfoEnabled(): boolean;
    isInfoEnabled(marker: Marker): boolean;
    isTraceEnabled(): boolean;
    isTraceEnabled(marker: Marker): boolean;
    isWarnEnabled(): boolean;
    isWarnEnabled(marker: Marker): boolean;
    log(level: Level, marker: Marker, message: Message): void;
    log(level: Level, marker: Marker, message: Message, throwable: Throwable): void;
    log(level: Level, marker: Marker, messageSupplier: MessageSupplier): void;
    log(level: Level, marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: CharSequence): void;
    log(level: Level, marker: Marker, message: CharSequence, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: any): void;
    log(level: Level, marker: Marker, message: any, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: string): void;
    log(level: Level, marker: Marker, message: string, ...params: any[]): void;
    log(level: Level, marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    log(level: Level, marker: Marker, message: string, throwable: Throwable): void;
    log(level: Level, marker: Marker, messageSupplier: Supplier<any>): void;
    log(level: Level, marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    log(level: Level, message: Message): void;
    log(level: Level, message: Message, throwable: Throwable): void;
    log(level: Level, messageSupplier: MessageSupplier): void;
    log(level: Level, messageSupplier: MessageSupplier, throwable: Throwable): void;
    log(level: Level, message: CharSequence): void;
    log(level: Level, message: CharSequence, throwable: Throwable): void;
    log(level: Level, message: any): void;
    log(level: Level, message: any, throwable: Throwable): void;
    log(level: Level, message: string): void;
    log(level: Level, message: string, ...params: any[]): void;
    log(level: Level, message: string, ...paramSuppliers: Supplier<any>[]): void;
    log(level: Level, message: string, throwable: Throwable): void;
    log(level: Level, messageSupplier: Supplier<any>): void;
    log(level: Level, messageSupplier: Supplier<any>, throwable: Throwable): void;
    log(level: Level, marker: Marker, message: string, p0: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    log(level: Level, marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    log(level: Level, message: string, p0: any): void;
    log(level: Level, message: string, p0: any, p1: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    log(level: Level, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    logMessage(level: Level, marker: Marker, fqcn: string, location: StackTraceElement, message: Message, throwable: Throwable): void;
    printf(level: Level, marker: Marker, format: string, ...params: any[]): void;
    printf(level: Level, format: string, ...params: any[]): void;
    throwing<T extends Throwable>(level: Level, throwable: T): T;
    throwing<T extends Throwable>(throwable: T): T;
    trace(marker: Marker, message: Message): void;
    trace(marker: Marker, message: Message, throwable: Throwable): void;
    trace(marker: Marker, messageSupplier: MessageSupplier): void;
    trace(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    trace(marker: Marker, message: CharSequence): void;
    trace(marker: Marker, message: CharSequence, throwable: Throwable): void;
    trace(marker: Marker, message: any): void;
    trace(marker: Marker, message: any, throwable: Throwable): void;
    trace(marker: Marker, message: string): void;
    trace(marker: Marker, message: string, ...params: any[]): void;
    trace(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    trace(marker: Marker, message: string, throwable: Throwable): void;
    trace(marker: Marker, messageSupplier: Supplier<any>): void;
    trace(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    trace(message: Message): void;
    trace(message: Message, throwable: Throwable): void;
    trace(messageSupplier: MessageSupplier): void;
    trace(messageSupplier: MessageSupplier, throwable: Throwable): void;
    trace(message: CharSequence): void;
    trace(message: CharSequence, throwable: Throwable): void;
    trace(message: any): void;
    trace(message: any, throwable: Throwable): void;
    trace(message: string): void;
    trace(message: string, ...params: any[]): void;
    trace(message: string, ...paramSuppliers: Supplier<any>[]): void;
    trace(message: string, throwable: Throwable): void;
    trace(messageSupplier: Supplier<any>): void;
    trace(messageSupplier: Supplier<any>, throwable: Throwable): void;
    trace(marker: Marker, message: string, p0: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    trace(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    trace(message: string, p0: any): void;
    trace(message: string, p0: any, p1: any): void;
    trace(message: string, p0: any, p1: any, p2: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    trace(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    traceEntry(): EntryMessage;
    traceEntry(format: string, ...params: any[]): EntryMessage;
    traceEntry(...paramSuppliers: Supplier<any>[]): EntryMessage;
    traceEntry(format: string, ...paramSuppliers: Supplier<any>[]): EntryMessage;
    traceEntry(message: Message): EntryMessage;
    traceExit(): void;
    traceExit<R>(result: R): R;
    traceExit<R>(format: string, result: R): R;
    traceExit(message: EntryMessage): void;
    traceExit<R>(message: EntryMessage, result: R): R;
    traceExit<R>(message: Message, result: R): R;
    warn(marker: Marker, message: Message): void;
    warn(marker: Marker, message: Message, throwable: Throwable): void;
    warn(marker: Marker, messageSupplier: MessageSupplier): void;
    warn(marker: Marker, messageSupplier: MessageSupplier, throwable: Throwable): void;
    warn(marker: Marker, message: CharSequence): void;
    warn(marker: Marker, message: CharSequence, throwable: Throwable): void;
    warn(marker: Marker, message: any): void;
    warn(marker: Marker, message: any, throwable: Throwable): void;
    warn(marker: Marker, message: string): void;
    warn(marker: Marker, message: string, ...params: any[]): void;
    warn(marker: Marker, message: string, ...paramSuppliers: Supplier<any>[]): void;
    warn(marker: Marker, message: string, throwable: Throwable): void;
    warn(marker: Marker, messageSupplier: Supplier<any>): void;
    warn(marker: Marker, messageSupplier: Supplier<any>, throwable: Throwable): void;
    warn(message: Message): void;
    warn(message: Message, throwable: Throwable): void;
    warn(messageSupplier: MessageSupplier): void;
    warn(messageSupplier: MessageSupplier, throwable: Throwable): void;
    warn(message: CharSequence): void;
    warn(message: CharSequence, throwable: Throwable): void;
    warn(message: any): void;
    warn(message: any, throwable: Throwable): void;
    warn(message: string): void;
    warn(message: string, ...params: any[]): void;
    warn(message: string, ...paramSuppliers: Supplier<any>[]): void;
    warn(message: string, throwable: Throwable): void;
    warn(messageSupplier: Supplier<any>): void;
    warn(messageSupplier: Supplier<any>, throwable: Throwable): void;
    warn(marker: Marker, message: string, p0: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    warn(marker: Marker, message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
    warn(message: string, p0: any): void;
    warn(message: string, p0: any, p1: any): void;
    warn(message: string, p0: any, p1: any, p2: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;
    warn(message: string, p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;
  }


  interface SystemMarker extends Marker {}
  class SystemMarker extends Marker {
    addParents(...markers: Marker[]): Marker;
    get name(): string;
    get parents(): Marker[];
    hasParents(): boolean;
    isInstanceOf(m: Marker): boolean;
    isInstanceOf(name: string): boolean;
    remove(marker: Marker): boolean;
    set parents(...markers: Marker[]);
  }

}

declare module 'com.blamejared.crafttweaker.impl.loot' {
  import { IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { MapCodec } from 'com.mojang.serialization';
  import { AbstractSet, Iterator, AbstractMap, Map, Set, List, Collection, AbstractCollection } from 'java.util';
  import { Entry } from 'Map';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ILootModifier } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  interface CraftTweakerLootModifierAdapter extends IGlobalLootModifier {}
  class CraftTweakerLootModifierAdapter extends IGlobalLootModifier {
    apply(generatedLoot: ObjectArrayList<ItemStack>, context: LootContext): ObjectArrayList<ItemStack>;
    codec(): MapCodec<IGlobalLootModifier>;
  }


  interface CraftTweakerPrivilegedLootModifierEntrySet extends AbstractSet<Entry> {}
  class CraftTweakerPrivilegedLootModifierEntrySet extends AbstractSet<Entry> {
    add(entry: Entry<ResourceLocation, IGlobalLootModifier>): boolean;
    clear(): void;
    contains(o: any): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<Entry<ResourceLocation, IGlobalLootModifier>>;
    remove(o: any): boolean;
    size(): number;
  }


  interface CraftTweakerPrivilegedLootModifierEntrySetIterator extends Iterator<Entry> {}
  class CraftTweakerPrivilegedLootModifierEntrySetIterator extends Iterator<Entry> {
    hasNext(): boolean;
    next(): Entry<ResourceLocation, IGlobalLootModifier>;
    remove(): void;
  }


  interface CraftTweakerPrivilegedLootModifierMap extends AbstractMap<ResourceLocation, IGlobalLootModifier> {}
  class CraftTweakerPrivilegedLootModifierMap extends AbstractMap<ResourceLocation, IGlobalLootModifier> {
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<ResourceLocation, IGlobalLootModifier>>;
    get(key: any): IGlobalLootModifier;
    static of(clone: Map<ResourceLocation, IGlobalLootModifier>): Map<ResourceLocation, IGlobalLootModifier>;
    put(key: ResourceLocation, value: IGlobalLootModifier): IGlobalLootModifier;
    remove(key: any): IGlobalLootModifier;
    size(): number;
  }


  class ILootTableIdHolder {
    static readonly CRAFTTWEAKER$UNKNOWN_TABLE_ID: ResourceLocation;
    crafttweaker$tableId(): ResourceLocation;
  }


  interface NeoForgeLootModifierAdapter extends ILootModifier {}
  class NeoForgeLootModifierAdapter extends ILootModifier {
    doApply(loot: ObjectArrayList<ItemStack>, context: LootContext): ObjectArrayList<ItemStack>;
    modify(loot: IItemStack[], context: LootContext): IItemStack[];
  }


  interface NeoForgeLootModifierIteratorAdapter<T = any, U = any> extends Iterator<T> {}
  class NeoForgeLootModifierIteratorAdapter<T = any, U = any> extends Iterator<T> {
    hasNext(): boolean;
    next(): T;
    remove(): void;
  }


  interface NeoForgeLootModifierMapAdapter extends AbstractMap<ResourceLocation, ILootModifier> {}
  class NeoForgeLootModifierMapAdapter extends AbstractMap<ResourceLocation, ILootModifier> {
    static adapt(map: Map<ResourceLocation, IGlobalLootModifier>): Map<ResourceLocation, ILootModifier>;
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<ResourceLocation, ILootModifier>>;
    get(key: any): ILootModifier;
    isEmpty(): boolean;
    keySet(): Set<ResourceLocation>;
    put(key: ResourceLocation, value: ILootModifier): ILootModifier;
    remove(key: any): ILootModifier;
    size(): number;
    values(): Collection<ILootModifier>;
  }


  interface NeoForgeLootModifierMapEntrySetAdapter extends AbstractSet<Entry> {}
  class NeoForgeLootModifierMapEntrySetAdapter extends AbstractSet<Entry> {
    add(entry: Entry<ResourceLocation, ILootModifier>): boolean;
    clear(): void;
    contains(o: any): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<Entry<ResourceLocation, ILootModifier>>;
    remove(o: any): boolean;
    size(): number;
  }


  interface NeoForgeLootModifierValuesCollectionAdapter extends AbstractCollection<ILootModifier> {}
  class NeoForgeLootModifierValuesCollectionAdapter extends AbstractCollection<ILootModifier> {
    add(lootModifier: ILootModifier): boolean;
    clear(): void;
    contains(o: any): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<ILootModifier>;
    remove(o: any): boolean;
    size(): number;
  }

}

declare module 'com.blamejared.crafttweaker.impl.loot.ILootTableIdHolder' {
  import { ILootTableIdHolder } from 'com.blamejared.crafttweaker.impl.loot';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface Mutable extends ILootTableIdHolder {}
  class Mutable extends ILootTableIdHolder {
    crafttweaker$tableId(var1: ResourceLocation): void;
    crafttweaker$tableId(): ResourceLocation;
  }

}

declare module 'com.blamejared.crafttweaker.impl.network.packet' {
  import { Enum } from 'java.lang';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { List } from 'java.util';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface ClientBoundPackets extends Enum<ClientBoundPackets> {}
  class ClientBoundPackets extends Enum<ClientBoundPackets> {
    static readonly COPY: ClientBoundPackets;
    static readonly OPEN_FILE: ClientBoundPackets;
    static readonly DATA: ClientBoundPackets;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, CraftTweakerPacket>;
    type(): Type<CraftTweakerPacket>;
    static valueOf(name: string): ClientBoundPackets;
    static values(): ClientBoundPackets[];
  }


  interface CraftTweakerPacket extends CustomPacketPayload {}
  class CraftTweakerPacket extends CustomPacketPayload {
    handle(): void;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'com.blamejared.crafttweaker.impl.plugin.core' {
  import { IBracketParserRegistrationHandler, ICommandRegistrationHandler, IEventRegistrationHandler, IJavaNativeIntegrationRegistrationHandler, IListenerRegistrationHandler, ILoaderRegistrationHandler, IScriptLoadSourceRegistrationHandler, IRecipeComponentRegistrationHandler, IRecipeHandlerRegistrationHandler, IReplacerComponentRegistrationHandler, IScriptRunModuleConfiguratorRegistrationHandler, ITaggableElementRegistrationHandler, IVillagerTradeRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { DumperData } from 'com.blamejared.crafttweaker.api.plugin.IBracketParserRegistrationHandler';
  import { Method } from 'java.lang.reflect';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Class, Enum, Runnable } from 'java.lang';
  import { Consumer, Function } from 'java.util.function';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { CommandBuilder } from 'com.blamejared.crafttweaker.api.plugin.ICommandRegistrationHandler';
  import { TypeToken } from 'com.google.common.reflect';
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Collection } from 'java.util';
  import { IScriptLoader, IScriptLoadSource, IPreprocessor, ZenTypeInfo } from 'com.blamejared.crafttweaker.api.zencode';
  import { IScriptRunModuleConfigurator, ScriptRunConfiguration } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { NativeTypeInfo } from 'com.blamejared.crafttweaker.api.natives';
  import { TagManagerFactory, ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { Recipe } from 'net.minecraft.world.item.crafting';
  import { ITargetingFilter, ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { Registry } from 'net.minecraft.core';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { CTTradeObject } from 'com.blamejared.crafttweaker.api.villager';
  import { ItemListing } from 'VillagerTrades';

  interface BracketParserRegistrationHandler extends IBracketParserRegistrationHandler {}
  class BracketParserRegistrationHandler extends IBracketParserRegistrationHandler {
    registerEnumForBracket<T extends Enum<T>>(loader: string, id: ResourceLocation, enumClass: Class<T>): void;
    registerParserFor(loader: string, parserName: string, parser: BracketExpressionParser, parserDumper: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: Method, validator: Method, dumper: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: BracketExpressionParser): void;
    registerParserFor(loader: string, parserName: string, parser: Method, dumper: DumperData): void;
    registerParserFor(loader: string, parserName: string, parser: Method, validator: Method): void;
    registerParserFor(loader: string, parserName: string, parser: Method): void;
  }


  interface CommandRegistrationHandler extends ICommandRegistrationHandler {}
  class CommandRegistrationHandler extends ICommandRegistrationHandler {
    static gather(consumer: Consumer<ICommandRegistrationHandler>): void;
    registerDump(dumpId: string, description: MutableComponent, builder: CommandBuilder): void;
    registerRootCommand(commandId: string, description: MutableComponent, builder: CommandBuilder): void;
    registerSubCommand(parentCommand: string, commandId: string, description: MutableComponent, builder: CommandBuilder): void;
  }


  interface EventRegistrationHandler extends IEventRegistrationHandler {}
  class EventRegistrationHandler extends IEventRegistrationHandler {
    registerEventMapping<T>(event: TypeToken<T>, bus: IEventBus<T>): void;
  }


  class IPluginRegistryAccess {
    applyInheritanceRules(): void;
    registerBracket(var1: IScriptLoader, var2: string, var3: BracketExpressionParser, var4: DumperData): void;
    registerComponents(var1: Collection<IRecipeComponent<any>>): void;
    registerEnum<T extends Enum<T>>(var1: IScriptLoader, var2: ResourceLocation, var3: Class<T>): void;
    registerEventBusMapping<T>(var1: TypeToken<T>, var2: IEventBus<T>): void;
    registerHandler<T extends Recipe<any>>(var1: Class<T>, var2: IRecipeHandler<T>): void;
    registerLoadSources(var1: Collection<IScriptLoadSource>): void;
    registerLoaders(var1: Collection<IScriptLoader>): void;
    registerNativeType(var1: IScriptLoader, var2: NativeTypeInfo): void;
    registerPreprocessor(var1: IPreprocessor): void;
    registerRunModuleConfigurator(var1: IScriptLoader, var2: IScriptRunModuleConfigurator): void;
    registerTaggableElement<T>(var1: ResourceKey<T>, var2: Class<T>): void;
    registerTaggableElementManager<T, U extends ITagManager<any>>(var1: ResourceKey<T>, var2: TagManagerFactory<T, U>): void;
    registerTargetingFilters(var1: Collection<ITargetingFilter>): void;
    registerTargetingStrategy(var1: ResourceLocation, var2: ITargetingStrategy): void;
    registerZenType(var1: IScriptLoader, var2: Class<any>, var3: ZenTypeInfo, var4: boolean): void;
    verifyProperRegistration(): void;
  }


  interface JavaNativeIntegrationRegistrationHandler extends IJavaNativeIntegrationRegistrationHandler {}
  class JavaNativeIntegrationRegistrationHandler extends IJavaNativeIntegrationRegistrationHandler {
    registerGlobalsIn(loader: string, clazz: Class<any>, info: ZenTypeInfo): void;
    registerNativeType(loader: string, clazz: Class<any>, info: NativeTypeInfo): void;
    registerPreprocessor(preprocessor: IPreprocessor): void;
    registerZenClass(loader: string, clazz: Class<any>, info: ZenTypeInfo): void;
  }


  interface ListenerRegistrationHandler extends IListenerRegistrationHandler {}
  class ListenerRegistrationHandler extends IListenerRegistrationHandler {
    onCraftTweakerLoadCompletion(runnable: Runnable): void;
    onExecuteRun(executionConsumer: Consumer<ScriptRunConfiguration>): void;
    onZenDataRegistrationCompletion(runnable: Runnable): void;
  }


  interface LoaderRegistrationHandler extends ILoaderRegistrationHandler {}
  class LoaderRegistrationHandler extends ILoaderRegistrationHandler {
    registerLoader(name: string, ...inheritedLoaders: string[]): void;
  }


  interface LoadSourceRegistrationHandler extends IScriptLoadSourceRegistrationHandler {}
  class LoadSourceRegistrationHandler extends IScriptLoadSourceRegistrationHandler {
    registerLoadSource(id: ResourceLocation): void;
  }


  class PluginManager {
    broadcastRunExecution(configuration: ScriptRunConfiguration): void;
    broadcastSetupEnd(): void;
    loadPlugins(): void;
    static of(): PluginManager;
  }


  interface RecipeComponentRegistrationHandler extends IRecipeComponentRegistrationHandler {}
  class RecipeComponentRegistrationHandler extends IRecipeComponentRegistrationHandler {
    registerRecipeComponent<T>(component: IRecipeComponent<T>): void;
  }


  interface RecipeHandlerRegistrationHandler extends IRecipeHandlerRegistrationHandler {}
  class RecipeHandlerRegistrationHandler extends IRecipeHandlerRegistrationHandler {
    registerRecipeHandler<T extends Recipe<any>>(recipe: Class<T>, handler: IRecipeHandler<T>): void;
  }


  interface ReplacerComponentsRegistrationHandler extends IReplacerComponentRegistrationHandler {}
  class ReplacerComponentsRegistrationHandler extends IReplacerComponentRegistrationHandler {
    registerTargetingFilter(filter: ITargetingFilter): void;
    registerTargetingStrategy(id: ResourceLocation, strategy: ITargetingStrategy): void;
  }


  interface ScriptRunModuleConfiguratorRegistrationHandler extends IScriptRunModuleConfiguratorRegistrationHandler {}
  class ScriptRunModuleConfiguratorRegistrationHandler extends IScriptRunModuleConfiguratorRegistrationHandler {
    registerConfigurator(loader: string, configurator: IScriptRunModuleConfigurator): void;
  }


  interface TaggableElementsRegistrationHandler extends ITaggableElementRegistrationHandler {}
  class TaggableElementsRegistrationHandler extends ITaggableElementRegistrationHandler {
    registerManager<T, U extends ITagManager<any>>(key: ResourceKey<Registry<T>>, factory: TagManagerFactory<T, U>): void;
    registerTaggableElement<T>(key: ResourceKey<Registry<T>>, elementClass: Class<T>): void;
  }


  interface ValidatedEscapableBracketParser extends BracketExpressionParser {}
  class ValidatedEscapableBracketParser extends BracketExpressionParser {
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface VillagerTradeConverterRegistrationHandler extends IVillagerTradeRegistrationHandler {}
  class VillagerTradeConverterRegistrationHandler extends IVillagerTradeRegistrationHandler {
    registerTradeConverter<T extends ItemListing>(tradeClass: Class<T>, tradeConverter: Function<T, CTTradeObject>): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.plugin.core.PluginManager' {
  class Req {
  }

}

declare module 'com.blamejared.crafttweaker.impl.plugin.crafttweaker' {
  import { ICraftTweakerPlugin, ILoaderRegistrationHandler, IScriptLoadSourceRegistrationHandler, IScriptRunModuleConfiguratorRegistrationHandler, IBracketParserRegistrationHandler, IRecipeComponentRegistrationHandler, IVillagerTradeRegistrationHandler, ICommandRegistrationHandler, IReplacerComponentRegistrationHandler, IJavaNativeIntegrationRegistrationHandler, IRecipeHandlerRegistrationHandler, ITaggableElementRegistrationHandler, IEventRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';

  class AnnotationsToApiConverters {
  }


  class BracketParserRegistrationManager {
  }


  interface CommonCraftTweakerPlugin extends ICraftTweakerPlugin {}
  class CommonCraftTweakerPlugin extends ICraftTweakerPlugin {
    registerBracketParsers(handler: IBracketParserRegistrationHandler): void;
    registerCommands(handler: ICommandRegistrationHandler): void;
    registerLoadSource(handler: IScriptLoadSourceRegistrationHandler): void;
    registerLoaders(handler: ILoaderRegistrationHandler): void;
    registerModuleConfigurators(handler: IScriptRunModuleConfiguratorRegistrationHandler): void;
    registerRecipeComponents(handler: IRecipeComponentRegistrationHandler): void;
    registerReplacerComponents(handler: IReplacerComponentRegistrationHandler): void;
    registerVillagerTradeConverters(handler: IVillagerTradeRegistrationHandler): void;
  }


  interface CompatibilityCraftTweakerPlugin extends ICraftTweakerPlugin {}
  class CompatibilityCraftTweakerPlugin extends ICraftTweakerPlugin {
    initialize(): void;
    manageJavaNativeIntegration(handler: IJavaNativeIntegrationRegistrationHandler): void;
    registerBracketParsers(handler: IBracketParserRegistrationHandler): void;
    registerEvents(handler: IEventRegistrationHandler): void;
    registerRecipeHandlers(handler: IRecipeHandlerRegistrationHandler): void;
    registerTaggableElements(handler: ITaggableElementRegistrationHandler): void;
  }


  class CraftTweakerModList {
  }


  class EnumBracketParserRegistrationManager {
  }


  class EventRegistrationManager {
  }


  class RecipeHandlerGatherer {
  }


  class TaggableElementsRegistrationManager {
  }


  class ZenClassGatherer {
  }


  class ZenClassRegistrationManager {
  }

}

declare module 'com.blamejared.crafttweaker.impl.plugin' {
  import { ICraftTweakerPlugin, IVillagerTradeRegistrationHandler } from 'com.blamejared.crafttweaker.api.plugin';

  interface NeoForgeCraftTweakerPlugin extends ICraftTweakerPlugin {}
  class NeoForgeCraftTweakerPlugin extends ICraftTweakerPlugin {
    registerVillagerTradeConverters(handler: IVillagerTradeRegistrationHandler): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.preprocessor' {
  import { IPreprocessor } from 'com.blamejared.crafttweaker.api.zencode';
  import { IScriptFile, IMutableScriptRunInfo } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { List } from 'java.util';
  import { Match } from 'com.blamejared.crafttweaker.api.zencode.IPreprocessor';

  interface DebugPreprocessor extends IPreprocessor {}
  class DebugPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface LoaderPreprocessor extends IPreprocessor {}
  class LoaderPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface LoadFirstPreprocessor extends IPreprocessor {}
  class LoadFirstPreprocessor extends IPreprocessor {
    static readonly INSTANCE: LoadFirstPreprocessor;
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    compare(a: IScriptFile, b: IScriptFile): number;
    defaultValue(): string;
    priority(): number;
  }


  interface LoadLastPreprocessor extends IPreprocessor {}
  class LoadLastPreprocessor extends IPreprocessor {
    static readonly INSTANCE: LoadLastPreprocessor;
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    compare(a: IScriptFile, b: IScriptFile): number;
    defaultValue(): string;
    priority(): number;
  }


  interface ModLoadedPreprocessor extends IPreprocessor {}
  class ModLoadedPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface ModLoaderPreprocessor extends IPreprocessor {}
  class ModLoaderPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface ModNotLoadedPreprocessor extends IPreprocessor {}
  class ModNotLoadedPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface NoBrandPreprocessor extends IPreprocessor {}
  class NoBrandPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface NoLoadPreprocessor extends IPreprocessor {}
  class NoLoadPreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface PriorityPreprocessor extends IPreprocessor {}
  class PriorityPreprocessor extends IPreprocessor {
    static readonly INSTANCE: PriorityPreprocessor;
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    compare(a: IScriptFile, b: IScriptFile): number;
    defaultValue(): string;
    priority(): number;
  }


  interface ReplacePreprocessor extends IPreprocessor {}
  class ReplacePreprocessor extends IPreprocessor {
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }

}

declare module 'com.blamejared.crafttweaker.impl.preprocessor.onlyif' {
  import { IPreprocessor } from 'com.blamejared.crafttweaker.api.zencode';
  import { IScriptFile, IMutableScriptRunInfo } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { List } from 'java.util';
  import { Match } from 'com.blamejared.crafttweaker.api.zencode.IPreprocessor';
  import { SourceFile, CodePosition } from 'org.openzen.zencode.shared';
  import { Reader } from 'java.io';

  interface EndIfPreprocessor extends IPreprocessor {}
  class EndIfPreprocessor extends IPreprocessor {
    static readonly INSTANCE: EndIfPreprocessor;
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
  }


  interface FakeSourceFile extends SourceFile {}
  class FakeSourceFile extends SourceFile {
    get filename(): string;
    open(): Reader;
    update(content: string): void;
  }


  class OnlyIfMatch {
    end(): CodePosition;
    end(end: CodePosition): void;
    parent(): OnlyIfMatch;
    remove(fileContents: string[]): void;
    start(): CodePosition;
  }


  class OnlyIfParameter {
    constructor(name: string);
    isHit(var1: string[]): OnlyIfParameterHit;
  }


  class OnlyIfParameterHit {
    static basedOn(conditionMet: boolean, numberOfConsumedArguments: number): OnlyIfParameterHit;
    static conditionFailed(numberOfConsumedArguments: number): OnlyIfParameterHit;
    conditionMet(): boolean;
    static conditionPassed(numberOfConsumedArguments: number): OnlyIfParameterHit;
    static invalid(): OnlyIfParameterHit;
    numberOfConsumedArguments(): number;
    validArguments(): boolean;
  }


  interface OnlyIfPreprocessor extends IPreprocessor {}
  class OnlyIfPreprocessor extends IPreprocessor {
    static readonly INSTANCE: OnlyIfPreprocessor;
    static readonly NAME: string;
    addParameter(parameter: OnlyIfParameter): void;
    apply(file: IScriptFile, preprocessedContents: string[], runInfo: IMutableScriptRunInfo, matches: Match[]): boolean;
    defaultValue(): string;
    preprocessorEndMarker(): string;
    priority(): number;
  }

}

declare module 'com.blamejared.crafttweaker.impl.preprocessor.onlyif.parameter' {
  import { OnlyIfParameter, OnlyIfParameterHit } from 'com.blamejared.crafttweaker.impl.preprocessor.onlyif';

  interface OnlyIfParameterFalse extends OnlyIfParameter {}
  class OnlyIfParameterFalse extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }


  interface OnlyIfParameterModLoaded extends OnlyIfParameter {}
  class OnlyIfParameterModLoaded extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }


  interface OnlyIfParameterModLoader extends OnlyIfParameter {}
  class OnlyIfParameterModLoader extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }


  interface OnlyIfParameterModNotLoaded extends OnlyIfParameter {}
  class OnlyIfParameterModNotLoaded extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }


  interface OnlyIfParameterSide extends OnlyIfParameter {}
  class OnlyIfParameterSide extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }


  interface OnlyIfParameterTrue extends OnlyIfParameter {}
  class OnlyIfParameterTrue extends OnlyIfParameter {
    constructor();
    isHit(additionalArguments: string[]): OnlyIfParameterHit;
  }

}

declare module 'com.blamejared.crafttweaker.impl.recipe.handler.helper' {
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { SmithingRecipe } from 'net.minecraft.world.item.crafting';

  class SmithingRecipeConflictChecker {
    static doesConflict(manager: IRecipeManager<any>, first: SmithingRecipe, second: SmithingRecipe): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.impl.recipe.handler.type.crafttweaker' {
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { CTShapedRecipe, CTShapelessRecipe } from 'com.blamejared.crafttweaker.api.recipe.type';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RegistryAccess } from 'net.minecraft.core';
  import { RecipeHolder, Recipe } from 'net.minecraft.world.item.crafting';
  import { Optional } from 'java.util';
  import { IDecomposedRecipe } from 'com.blamejared.crafttweaker.api.recipe.component';

  interface CTShapedRecipeHandler extends IRecipeHandler<CTShapedRecipe> {}
  class CTShapedRecipeHandler extends IRecipeHandler<CTShapedRecipe> {
    decompose(manager: IRecipeManager<CTShapedRecipe>, registryAccess: RegistryAccess, recipe: CTShapedRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<CTShapedRecipe>, firstRecipe: CTShapedRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<CTShapedRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<CTShapedRecipe>): string;
    recompose(manager: IRecipeManager<CTShapedRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<CTShapedRecipe>;
  }


  interface CTShapelessRecipeHandler extends IRecipeHandler<CTShapelessRecipe> {}
  class CTShapelessRecipeHandler extends IRecipeHandler<CTShapelessRecipe> {
    decompose(manager: IRecipeManager<CTShapelessRecipe>, registryAccess: RegistryAccess, recipe: CTShapelessRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<CTShapelessRecipe>, firstRecipe: CTShapelessRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<CTShapelessRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<CTShapelessRecipe>): string;
    recompose(manager: IRecipeManager<CTShapelessRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<CTShapelessRecipe>;
  }

}

declare module 'com.blamejared.crafttweaker.impl.recipe.handler.type.vanilla' {
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { AbstractCookingRecipe, RecipeHolder, Recipe, ShapedRecipe, ShapelessRecipe, SmithingTransformRecipe, SmithingTrimRecipe, StonecutterRecipe } from 'net.minecraft.world.item.crafting';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Optional } from 'java.util';
  import { IDecomposedRecipe } from 'com.blamejared.crafttweaker.api.recipe.component';

  interface CookingRecipeHandler extends IRecipeHandler<AbstractCookingRecipe> {}
  class CookingRecipeHandler extends IRecipeHandler<AbstractCookingRecipe> {
    decompose(manager: IRecipeManager<AbstractCookingRecipe>, registryAccess: RegistryAccess, recipe: AbstractCookingRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<AbstractCookingRecipe>, firstRecipe: AbstractCookingRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<AbstractCookingRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<AbstractCookingRecipe>): string;
    recompose(manager: IRecipeManager<AbstractCookingRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<AbstractCookingRecipe>;
  }


  interface ShapedRecipeHandler extends IRecipeHandler<ShapedRecipe> {}
  class ShapedRecipeHandler extends IRecipeHandler<ShapedRecipe> {
    decompose(manager: IRecipeManager<ShapedRecipe>, registryAccess: RegistryAccess, recipe: ShapedRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<ShapedRecipe>, firstRecipe: ShapedRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<ShapedRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<ShapedRecipe>): string;
    recompose(manager: IRecipeManager<ShapedRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<ShapedRecipe>;
  }


  interface ShapelessRecipeHandler extends IRecipeHandler<ShapelessRecipe> {}
  class ShapelessRecipeHandler extends IRecipeHandler<ShapelessRecipe> {
    decompose(manager: IRecipeManager<ShapelessRecipe>, registryAccess: RegistryAccess, recipe: ShapelessRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<ShapelessRecipe>, firstRecipe: ShapelessRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<ShapelessRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<ShapelessRecipe>): string;
    recompose(manager: IRecipeManager<ShapelessRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<ShapelessRecipe>;
  }


  interface SmithingTransformRecipeHandler extends IRecipeHandler<SmithingTransformRecipe> {}
  class SmithingTransformRecipeHandler extends IRecipeHandler<SmithingTransformRecipe> {
    decompose(manager: IRecipeManager<SmithingTransformRecipe>, registryAccess: RegistryAccess, recipe: SmithingTransformRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<SmithingTransformRecipe>, firstRecipe: SmithingTransformRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<SmithingTransformRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<SmithingTransformRecipe>): string;
    recompose(manager: IRecipeManager<SmithingTransformRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<SmithingTransformRecipe>;
  }


  interface SmithingTrimRecipeHandler extends IRecipeHandler<SmithingTrimRecipe> {}
  class SmithingTrimRecipeHandler extends IRecipeHandler<SmithingTrimRecipe> {
    decompose(manager: IRecipeManager<SmithingTrimRecipe>, registryAccess: RegistryAccess, recipe: SmithingTrimRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<SmithingTrimRecipe>, firstRecipe: SmithingTrimRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<SmithingTrimRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<SmithingTrimRecipe>): string;
    recompose(manager: IRecipeManager<SmithingTrimRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<SmithingTrimRecipe>;
  }


  interface StoneCutterRecipeHandler extends IRecipeHandler<StonecutterRecipe> {}
  class StoneCutterRecipeHandler extends IRecipeHandler<StonecutterRecipe> {
    decompose(manager: IRecipeManager<StonecutterRecipe>, registryAccess: RegistryAccess, recipe: StonecutterRecipe): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<StonecutterRecipe>, firstRecipe: StonecutterRecipe, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<StonecutterRecipe>, registryAccess: RegistryAccess, holder: RecipeHolder<StonecutterRecipe>): string;
    recompose(manager: IRecipeManager<StonecutterRecipe>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<StonecutterRecipe>;
  }

}

declare module 'com.blamejared.crafttweaker.impl.recipe.replacement' {
  import { Stream } from 'java.util.stream';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { NullableT } from '@ZenCodeType';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { Function } from 'java.util.function';
  import { IReplacerRegistry, ITargetingFilter, ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class DefaultTargetingFilters {
    static scripts(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
    static vanillaSpecial(allRecipes: Stream<RecipeHolder<any>>): Stream<RecipeHolder<any>>;
  }


  class DefaultTargetingStrategies {
    static deep<T>(component: IRecipeComponent<T>, object: T, replacer: Function<T, NullableT>): NullableT;
    static shallow<T>(component: IRecipeComponent<T>, object: T, replacer: Function<T, NullableT>): NullableT;
  }


  interface ReplacerRegistry extends IReplacerRegistry {}
  class ReplacerRegistry extends IReplacerRegistry {
    allStrategyNames(): Collection<ResourceLocation>;
    castedFilters(filters: Collection<ITargetingFilter>): void;
    filters(): Collection<ITargetingFilter>;
    findStrategy(id: ResourceLocation): ITargetingStrategy;
    strategy(id: ResourceLocation, strategy: ITargetingStrategy): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.registry' {
  import { ICraftTweakerRegistry } from 'com.blamejared.crafttweaker.api';
  import { IPluginRegistryAccess } from 'com.blamejared.crafttweaker.impl.plugin.core';
  import { Req } from 'com.blamejared.crafttweaker.impl.plugin.core.PluginManager';
  import { IScriptLoader, IScriptLoadSource, IZenClassRegistry, IPreprocessor, ZenTypeInfo } from 'com.blamejared.crafttweaker.api.zencode';
  import { Collection, Map, List, Optional, Set } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { IScriptRunModuleConfigurator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { IBracketDumperInfo } from 'com.blamejared.crafttweaker.api.command.type';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { IRecipeHandler } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { Recipe, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { Class, Enum } from 'java.lang';
  import { IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { TagManagerFactory, ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { Registry } from 'net.minecraft.core';
  import { IReplacerRegistry, ITargetingFilter, ITargetingStrategy } from 'com.blamejared.crafttweaker.api.recipe.replacement';
  import { IEventRegistry } from 'com.blamejared.crafttweaker.api.event';
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { TypeToken } from 'com.google.common.reflect';
  import { NativeTypeInfo } from 'com.blamejared.crafttweaker.api.natives';
  import { DumperData } from 'com.blamejared.crafttweaker.api.plugin.IBracketParserRegistrationHandler';

  interface CraftTweakerRegistry extends ICraftTweakerRegistry {}
  class CraftTweakerRegistry extends ICraftTweakerRegistry {
    findLoadSource(id: ResourceLocation): IScriptLoadSource;
    findLoader(name: string): IScriptLoader;
    findRecipeComponent<T>(id: ResourceLocation): IRecipeComponent<T>;
    static get (): ICraftTweakerRegistry;
    get allLoaders(): Collection<IScriptLoader>;
    get allRecipeComponents(): Collection<IRecipeComponent<any>>;
    get eventRegistry(): IEventRegistry;
    get preprocessors(): IPreprocessor[];
    get replacerRegistry(): IReplacerRegistry;
    get zenClassRegistry(): IZenClassRegistry;
    getAllEnumStringsForEnumBracket(loader: IScriptLoader): Set<string>;
    getBracketDumpers(loader: IScriptLoader): Map<string, IBracketDumperInfo>;
    getBracketHandlers(loader: IScriptLoader, rootPackage: string): Map<string, BracketExpressionParser>;
    getConfiguratorFor(loader: IScriptLoader): IScriptRunModuleConfigurator;
    getEnumBracketFor<T extends Enum<T>>(loader: IScriptLoader, type: ResourceLocation): Optional<Class<T>>;
    getEnumBracketValue<T extends Enum<T>>(loader: IScriptLoader, type: ResourceLocation, value: string): T;
    getRecipeHandlerFor<T extends Recipe<any>>(recipe: T): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(recipeClazz: Class<T>): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(holder: RecipeHolder<T>): IRecipeHandler<T>;
    getTaggableElementFactory<T>(key: ResourceKey<Registry<T>>): TagManagerFactory<T, ITagManager<any>>;
    getTaggableElementFor<T>(key: ResourceKey<T>): Optional<Class<T>>;
    static pluginAccess(req: Req): IPluginRegistryAccess;
  }


  interface EventRegistry extends IEventRegistry {}
  class EventRegistry extends IEventRegistry {
    busOf<T>(eventType: TypeToken<T>): IEventBus<T>;
    busOf<T>(clazz: Class<T>): IEventBus<T>;
  }


  class LoaderRegistry {
  }


  class LoadSourceRegistry {
  }


  interface PluginRegistryAccess extends IPluginRegistryAccess {}
  class PluginRegistryAccess extends IPluginRegistryAccess {
    applyInheritanceRules(): void;
    registerBracket(loader: IScriptLoader, name: string, bracketParser: BracketExpressionParser, dumperData: DumperData): void;
    registerComponents(components: Collection<IRecipeComponent<any>>): void;
    registerEnum<T extends Enum<T>>(loader: IScriptLoader, id: ResourceLocation, enumClass: Class<T>): void;
    registerEventBusMapping<T>(token: TypeToken<T>, bus: IEventBus<T>): void;
    registerHandler<T extends Recipe<any>>(clazz: Class<T>, handler: IRecipeHandler<T>): void;
    registerLoadSources(sources: Collection<IScriptLoadSource>): void;
    registerLoaders(loader: Collection<IScriptLoader>): void;
    registerNativeType(loader: IScriptLoader, info: NativeTypeInfo): void;
    registerPreprocessor(preprocessor: IPreprocessor): void;
    registerRunModuleConfigurator(loader: IScriptLoader, configurator: IScriptRunModuleConfigurator): void;
    registerTaggableElement<T>(key: ResourceKey<T>, elementClass: Class<T>): void;
    registerTaggableElementManager<T, U extends ITagManager<any>>(key: ResourceKey<T>, factory: TagManagerFactory<T, U>): void;
    registerTargetingFilters(filters: Collection<ITargetingFilter>): void;
    registerTargetingStrategy(id: ResourceLocation, strategy: ITargetingStrategy): void;
    registerZenType(loader: IScriptLoader, clazz: Class<any>, info: ZenTypeInfo, globals: boolean): void;
    verifyProperRegistration(): void;
  }


  class ScriptRunModuleConfiguratorRegistry {
  }

}

declare module 'com.blamejared.crafttweaker.impl.registry.natives' {
  import { IExecutableReferenceInfo, INativeTypeRegistry, NativeTypeInfo, IBakedTypeInfo } from 'com.blamejared.crafttweaker.api.natives';
  import { Optional, Collection } from 'java.util';
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';
  import { Constructor, Method } from 'java.lang.reflect';

  class ExecutableReferenceGroupInfo {
  }


  interface ExecutableReferenceInfo extends IExecutableReferenceInfo {}
  class ExecutableReferenceInfo extends IExecutableReferenceInfo {
    getAnnotation<T extends Annotation>(annotationClass: Class<T>): Optional<T>;
  }


  interface NativeTypeRegistry extends INativeTypeRegistry {}
  class NativeTypeRegistry extends INativeTypeRegistry {
    addNativeType(info: NativeTypeInfo): void;
    get bakedTypeInfo(): Collection<IBakedTypeInfo>;
    getBakedTypeInfoFor(clazz: Class<any>): Optional<IBakedTypeInfo>;
    getExecutableReferenceInfoFor(constructor: Constructor<any>): Optional<IExecutableReferenceInfo>;
    getExecutableReferenceInfoFor(method: Method): Optional<IExecutableReferenceInfo>;
    getZenNameFor(clazz: Class<any>): Optional<string>;
    inheritFrom(other: NativeTypeRegistry): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.registry.natives.ExecutableReferenceInfo' {
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';

  class AnnotationCreator {
    annotationType(): Class<Annotation>;
    annotationType(): Class<Annotation>;
    annotationType(): Class<Annotation>;
    annotationType(): Class<Annotation>;
    value(): string;
    value(): string;
    value(): string;
  }

}

declare module 'com.blamejared.crafttweaker.impl.registry.recipe' {
  import { IRecipeHandler, IRecipeHandlerRegistry } from 'com.blamejared.crafttweaker.api.recipe.handler';
  import { Recipe, RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { RegistryAccess } from 'net.minecraft.core';
  import { Optional, Collection } from 'java.util';
  import { IDecomposedRecipe, IRecipeComponent } from 'com.blamejared.crafttweaker.api.recipe.component';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';

  interface DefaultRecipeHandler extends IRecipeHandler<Recipe> {}
  class DefaultRecipeHandler extends IRecipeHandler<Recipe> {
    decompose(manager: IRecipeManager<Recipe<any>>, registryAccess: RegistryAccess, recipe: Recipe<any>): Optional<IDecomposedRecipe>;
    doesConflict<U extends Recipe<any>>(manager: IRecipeManager<Recipe<any>>, firstRecipe: Recipe<any>, secondRecipe: U): boolean;
    dumpToCommandString(manager: IRecipeManager<Recipe<any>>, registryAccess: RegistryAccess, holder: RecipeHolder<Recipe<any>>): string;
    recompose(manager: IRecipeManager<Recipe<any>>, registryAccess: RegistryAccess, recipe: IDecomposedRecipe): Optional<Recipe<any>>;
  }


  class RecipeComponentRegistry {
    allComponents(): Collection<IRecipeComponent<any>>;
    find<T>(id: ResourceLocation): IRecipeComponent<T>;
    registerComponents(components: Collection<IRecipeComponent<any>>): void;
  }


  interface RecipeHandlerRegistry extends IRecipeHandlerRegistry {}
  class RecipeHandlerRegistry extends IRecipeHandlerRegistry {
    getRecipeHandlerFor<T extends Recipe<any>>(recipe: T): IRecipeHandler<T>;
    getRecipeHandlerFor<T extends Recipe<any>>(recipeClass: Class<T>): IRecipeHandler<T>;
    register<T extends Recipe<any>>(clazz: Class<T>, handler: IRecipeHandler<T>): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.registry.zencode' {
  import { IBracketDumperInfo } from 'com.blamejared.crafttweaker.api.command.type';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Stream } from 'java.util.stream';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { IScriptLoader, IPreprocessor, IZenClassRegistry, ZenTypeInfo } from 'com.blamejared.crafttweaker.api.zencode';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { DumperData } from 'com.blamejared.crafttweaker.api.plugin.IBracketParserRegistrationHandler';
  import { Collection, Map, Optional, List, Set } from 'java.util';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Class, Enum } from 'java.lang';
  import { TagManagerFactory, ITagManager } from 'com.blamejared.crafttweaker.api.tag.manager';
  import { Registry } from 'net.minecraft.core';
  import { IClassData } from 'com.blamejared.crafttweaker.api.zencode.IZenClassRegistry';
  import { INativeTypeRegistry, NativeTypeInfo } from 'com.blamejared.crafttweaker.api.natives';

  interface BracketDumperInfo extends IBracketDumperInfo {}
  class BracketDumperInfo extends IBracketDumperInfo {
    description(): MutableComponent;
    dumpedFileName(): string;
    run(context: CommandContext<CommandSourceStack>): number;
    subCommandName(): string;
    values(): Stream<string>;
  }


  class BracketResolverRegistry {
    applyInheritanceRules(): void;
    fillLoaderData(loader: Collection<IScriptLoader>): void;
    getBracketDumpers(loader: IScriptLoader): Map<string, IBracketDumperInfo>;
    getBracketResolvers(loader: IScriptLoader): Map<string, BracketExpressionParser>;
    registerBracket(loader: IScriptLoader, name: string, bracketParser: BracketExpressionParser, dumperData: DumperData): void;
  }


  class EnumBracketRegistry {
    applyInheritanceRules(): void;
    fillLoaderData(loader: Collection<IScriptLoader>): void;
    getEnum<T extends Enum<T>>(loader: IScriptLoader, type: ResourceLocation): Optional<Class<T>>;
    getEnums(loader: IScriptLoader): Map<ResourceLocation, Class<Enum<any>>>;
    register<T extends Enum<T>>(loader: IScriptLoader, id: ResourceLocation, clazz: Class<T>): void;
  }


  class LoaderSpecificZenClassRegistry {
  }


  class PreprocessorRegistry {
    get preprocessors(): IPreprocessor[];
    register(preprocessor: IPreprocessor): void;
  }


  class TaggableElementRegistry {
    get managers(): Map<ResourceKey<any>, TagManagerFactory<any, any>>;
    get taggableElements(): Map<ResourceKey<any>, Class<any>>;
    getManagerFactory<T>(key: ResourceKey<Registry<T>>): Optional<TagManagerFactory<T, ITagManager<any>>>;
    getTaggableElement<T>(key: ResourceKey<T>): Optional<Class<T>>;
    registerElement<T>(id: ResourceKey<T>, clazz: Class<T>): void;
    registerManager<T, U extends ITagManager<any>>(id: ResourceKey<T>, factory: TagManagerFactory<T, U>): void;
  }


  interface ZenClassRegistry extends IZenClassRegistry {}
  class ZenClassRegistry extends IZenClassRegistry {
    applyInheritanceRules(): void;
    fillLoaderData(loaders: Collection<IScriptLoader>): void;
    getClassData(loader: IScriptLoader): IClassData;
    getClassesInPackage(loader: IScriptLoader, packageName: string): Class<any>[];
    getGlobalsInPackage(loader: IScriptLoader, packageName: string): Class<any>[];
    getImplementationsOf<T>(loader: IScriptLoader, checkFor: Class<T>): Class<T>[];
    getNameFor(loader: IScriptLoader, clazz: Class<any>): Optional<string>;
    getNativeTypeRegistry(loader: IScriptLoader): INativeTypeRegistry;
    getRootPackages(loader: IScriptLoader): Set<string>;
    isBlacklisted(cls: Class<any>): boolean;
    isRegistered(loader: IScriptLoader, clazz: Class<any>): boolean;
    registerNativeType(loader: IScriptLoader, info: NativeTypeInfo): void;
    registerZenType(loader: IScriptLoader, clazz: Class<any>, info: ZenTypeInfo, globals: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.recipefs' {
  import { DirectoryStream, Path, FileStore, FileSystem, PathMatcher, WatchService, OpenOption, CopyOption, AccessMode, LinkOption, WatchKey } from 'java.nio.file';
  import { Iterator, Set, Map } from 'java.util';
  import { BasicFileAttributes, FileTime, BasicFileAttributeView, FileAttributeView, FileStoreAttributeView, UserPrincipalLookupService, FileAttribute } from 'java.nio.file.attribute';
  import { FileChannel, WritableByteChannel, ReadableByteChannel, FileLock, SeekableByteChannel, AsynchronousFileChannel } from 'java.nio.channels';
  import { ByteBuffer, MappedByteBuffer } from 'java.nio';
  import { MapMode } from 'FileChannel';
  import { Class, Iterable } from 'java.lang';
  import { FileSystemProvider } from 'java.nio.file.spi';
  import { URI } from 'java.net';
  import { Filter } from 'DirectoryStream';
  import { InputStream, OutputStream } from 'java.io';
  import { ExecutorService } from 'java.util.concurrent';
  import { Logger } from 'org.apache.logging.log4j';
  import { ScriptRecipe } from 'com.blamejared.crafttweaker.impl.script';
  import { Bound } from 'com.blamejared.crafttweaker.impl.script.recipefs.RecipeFsResolver';
  import { Kind, Modifier } from 'WatchEvent';

  interface RecipeDirectoryStream extends DirectoryStream<Path> {}
  class RecipeDirectoryStream extends DirectoryStream<Path> {
    close(): void;
    iterator(): Iterator<Path>;
  }


  interface RecipeFileAttributes extends BasicFileAttributes {}
  class RecipeFileAttributes extends BasicFileAttributes {
    creationTime(): FileTime;
    fileKey(): any;
    isDirectory(): boolean;
    isOther(): boolean;
    isRegularFile(): boolean;
    isSymbolicLink(): boolean;
    lastAccessTime(): FileTime;
    lastModifiedTime(): FileTime;
    size(): number;
  }


  interface RecipeFileAttributeView extends BasicFileAttributeView {}
  class RecipeFileAttributeView extends BasicFileAttributeView {
    readAttributes(): BasicFileAttributes;
    setTimes(lastModifiedTime: FileTime, lastAccessTime: FileTime, createTime: FileTime): void;
  }


  interface RecipeFileChannel extends FileChannel {}
  class RecipeFileChannel extends FileChannel {
    force(metaData: boolean): void;
    lock(position: number, size: number, shared: boolean): FileLock;
    map(mode: MapMode, position: number, size: number): MappedByteBuffer;
    position(): number;
    position(newPosition: number): FileChannel;
    read(dst: ByteBuffer): number;
    read(dsts: ByteBuffer[], offset: number, length: number): number;
    read(dst: ByteBuffer, position: number): number;
    size(): number;
    transferFrom(src: ReadableByteChannel, position: number, count: number): number;
    transferTo(position: number, count: number, target: WritableByteChannel): number;
    truncate(size: number): FileChannel;
    tryLock(position: number, size: number, shared: boolean): FileLock;
    write(src: ByteBuffer): number;
    write(srcs: ByteBuffer[], offset: number, length: number): number;
    write(src: ByteBuffer, position: number): number;
  }


  interface RecipeFileStore extends FileStore {}
  class RecipeFileStore extends FileStore {
    get totalSpace(): number;
    get unallocatedSpace(): number;
    get usableSpace(): number;
    getAttribute(attribute: string): any;
    getFileStoreAttributeView<V extends FileStoreAttributeView>(type: Class<V>): V;
    isReadOnly(): boolean;
    supportsFileAttributeView(type: Class<FileAttributeView>): boolean;
    supportsFileAttributeView(name: string): boolean;
    type(): string;
  }


  interface RecipeFileSystem extends FileSystem {}
  class RecipeFileSystem extends FileSystem {
    close(): void;
    get fileStores(): Iterable<FileStore>;
    get rootDirectories(): Iterable<Path>;
    get separator(): string;
    get userPrincipalLookupService(): UserPrincipalLookupService;
    getPath(first: string, ...more: string[]): Path;
    getPathMatcher(syntaxAndPattern: string): PathMatcher;
    isOpen(): boolean;
    isReadOnly(): boolean;
    newWatchService(): WatchService;
    provider(): FileSystemProvider;
    supportedFileAttributeViews(): Set<string>;
  }


  interface RecipeFileSystemProvider extends FileSystemProvider {}
  class RecipeFileSystemProvider extends FileSystemProvider {
    static readonly SCHEME: string;
    static readonly FILE_SYSTEM_NAME: string;
    checkAccess(path: Path, ...modes: AccessMode[]): void;
    copy(source: Path, target: Path, ...options: CopyOption[]): void;
    createDirectory(dir: Path, ...attrs: FileAttribute<any>[]): void;
    createLink(link: Path, existing: Path): void;
    createSymbolicLink(link: Path, target: Path, ...attrs: FileAttribute<any>[]): void;
    delete(path: Path): void;
    deleteIfExists(path: Path): boolean;
    get scheme(): string;
    getFileAttributeView<V extends FileAttributeView>(path: Path, type: Class<V>, ...options: LinkOption[]): V;
    getFileStore(path: Path): FileStore;
    getFileSystem(uri: URI): FileSystem;
    getPath(uri: URI): Path;
    isHidden(path: Path): boolean;
    isSameFile(path: Path, path2: Path): boolean;
    move(source: Path, target: Path, ...options: CopyOption[]): void;
    newAsynchronousFileChannel(path: Path, options: Set<OpenOption>, executor: ExecutorService, ...attrs: FileAttribute<any>[]): AsynchronousFileChannel;
    newByteChannel(path: Path, options: Set<OpenOption>, ...attrs: FileAttribute<any>[]): SeekableByteChannel;
    newDirectoryStream(dir: Path, filter: Filter<Path>): DirectoryStream<Path>;
    newFileChannel(path: Path, options: Set<OpenOption>, ...attrs: FileAttribute<any>[]): FileChannel;
    newFileSystem(uri: URI, env: Map<string, any>): FileSystem;
    newFileSystem(path: Path, env: Map<string, any>): FileSystem;
    newInputStream(path: Path, ...options: OpenOption[]): InputStream;
    newOutputStream(path: Path, ...options: OpenOption[]): OutputStream;
    readAttributes<A extends BasicFileAttributes>(path: Path, type: Class<A>, ...options: LinkOption[]): A;
    readAttributes(path: Path, attributes: string, ...options: LinkOption[]): Map<string, any>;
    readSymbolicLink(link: Path): Path;
    setAttribute(path: Path, attribute: string, value: any, ...options: LinkOption[]): void;
  }


  class RecipeFileSystemProviderInjector {
    static inject(logger: Logger): void;
  }


  class RecipeFsResolver {
    bind(path: RecipePath): Bound;
    resolve(var1: RecipePath): ScriptRecipe;
    resolveContents(path: RecipePath): string;
  }


  interface RecipePath extends Path {}
  class RecipePath extends Path {
    compareTo(other: Path): number;
    endsWith(other: Path): boolean;
    equals(obj: any): boolean;
    get fileName(): Path;
    get fileSystem(): FileSystem;
    get nameCount(): number;
    get parent(): Path;
    get root(): Path;
    getName(index: number): Path;
    hashCode(): number;
    isAbsolute(): boolean;
    normalize(): Path;
    register(watcher: WatchService, events: Kind<any>, ...modifiers: Modifier[]): WatchKey;
    relativize(other: Path): Path;
    resolve(other: Path): Path;
    startsWith(other: Path): boolean;
    subpath(beginIndex: number, endIndex: number): Path;
    toAbsolutePath(): Path;
    toRealPath(...options: LinkOption[]): Path;
    toString(): string;
    toUri(): URI;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.recipefs.RecipeFsResolver' {
  import { ScriptRecipe } from 'com.blamejared.crafttweaker.impl.script';

  class Bound {
    resolve(): ScriptRecipe;
    resolveContents(): string;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script' {
  import { UpdatedState } from 'com.blamejared.crafttweaker.impl.script.RecipeManagerScriptLoader';
  import { Supplier, Consumer } from 'java.util.function';
  import { RecipeManager, Recipe, RecipeInput, RecipeSerializer, RecipeType } from 'net.minecraft.world.item.crafting';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { SimplePreparableReloadListener } from 'net.minecraft.server.packs.resources';
  import { Void } from 'java.lang';
  import { ReloadableServerResources } from 'net.minecraft.server';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  class RecipeManagerScriptLoader {
    static loadScriptsFromManager(manager: RecipeManager): void;
    static updateState(state: UpdatedState, managerSupplier: Supplier<RecipeManager>): void;
  }


  interface ScriptRecipe extends Recipe<RecipeInput> {}
  class ScriptRecipe extends Recipe<RecipeInput> {
    constructor(fileName: string, content: string);
    assemble(var1: RecipeInput, var2: Provider): ItemStack;
    canCraftInDimensions(i: number, i1: number): boolean;
    equals(o: any): boolean;
    get content(): string;
    get fileName(): string;
    get id(): ResourceLocation;
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
    getResultItem(var1: Provider): ItemStack;
    hashCode(): number;
    matches(container: RecipeInput, level: Level): boolean;
    toString(): string;
  }


  interface ScriptRecipeType extends RecipeType<ScriptRecipe> {}
  class ScriptRecipeType extends RecipeType<ScriptRecipe> {
    static readonly INSTANCE: ScriptRecipeType;
    id(): ResourceLocation;
    toString(): string;
  }


  interface ScriptReloadListener extends SimplePreparableReloadListener<Void> {}
  class ScriptReloadListener extends SimplePreparableReloadListener<Void> {
    constructor(managerSupplier: ReloadableServerResources, feedbackConsumer: Consumer<MutableComponent>);
  }


  interface ScriptSerializer extends RecipeSerializer<ScriptRecipe> {}
  class ScriptSerializer extends RecipeSerializer<ScriptRecipe> {
    static readonly INSTANCE: ScriptSerializer;
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<ScriptRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, ScriptRecipe>;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.RecipeManagerScriptLoader' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface UpdatedState extends Enum<UpdatedState> {}
  class UpdatedState extends Enum<UpdatedState> {
    static readonly NONE: UpdatedState;
    static readonly RECIPES: UpdatedState;
    static readonly TAGS: UpdatedState;
    static readonly ALL: UpdatedState;
    hasAll(): boolean;
    hasRecipes(): boolean;
    hasTags(): boolean;
    merge(other: UpdatedState): UpdatedState;
    static of(hasRecipes: boolean, hasTags: boolean): UpdatedState;
    static valueOf(name: string): UpdatedState;
    static values(): UpdatedState[];
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.ScriptReloadListener' {
  import { DiscoveryRetainer } from 'com.blamejared.crafttweaker.api.zencode.scriptrun.ScriptDiscoveryConfiguration';
  import { Path } from 'java.nio.file';
  import { List } from 'java.util';

  interface Retainer extends DiscoveryRetainer {}
  class Retainer extends DiscoveryRetainer {
    retain(root: Path, discoveryResults: Path[]): void;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.scriptrun' {
  import { Enum, Throwable } from 'java.lang';
  import { List, Collection, Optional, Iterator, ListIterator, Comparator, Spliterator } from 'java.util';
  import { IScriptRunModuleConfigurator, ScriptRunConfiguration, IMutableScriptRunInfo, IScriptRunInfo, IScriptFile, IScriptRun, IScriptRunManager, ScriptDiscoveryConfiguration } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { JavaNativeModule } from 'org.openzen.zencode.java.module';
  import { ICraftTweakerRegistry } from 'com.blamejared.crafttweaker.api';
  import { ModuleCreator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun.IScriptRunModuleConfigurator';
  import { SourceFile, CompileException } from 'org.openzen.zencode.shared';
  import { IAction } from 'com.blamejared.crafttweaker.api.action.base';
  import { Reader } from 'java.io';
  import { Match } from 'com.blamejared.crafttweaker.api.zencode.IPreprocessor';
  import { IPreprocessor } from 'com.blamejared.crafttweaker.api.zencode';
  import { ScriptingEngineLogger } from 'org.openzen.zencode.java.logger';
  import { ValidationLogEntry } from 'org.openzen.zenscript.validator';
  import { Path } from 'java.nio.file';
  import { UnaryOperator, IntFunction, Predicate, Consumer } from 'java.util.function';
  import { Stream } from 'java.util.stream';

  interface DecoratedRunKind extends Enum<DecoratedRunKind> {}
  class DecoratedRunKind extends Enum<DecoratedRunKind> {
    static readonly SYNTAX: DecoratedRunKind;
    static readonly FORMAT: DecoratedRunKind;
    static readonly EXECUTE: DecoratedRunKind;
    static readonly GAME_TEST: DecoratedRunKind;
    static valueOf(name: string): DecoratedRunKind;
    static values(): DecoratedRunKind[];
  }


  interface DefaultScriptRunModuleConfigurator extends IScriptRunModuleConfigurator {}
  class DefaultScriptRunModuleConfigurator extends IScriptRunModuleConfigurator {
    static of(basePackage: string): IScriptRunModuleConfigurator;
    populateModules(registry: ICraftTweakerRegistry, configuration: ScriptRunConfiguration, creator: ModuleCreator): Collection<JavaNativeModule>;
  }


  interface GameTestScriptRunLogger extends ScriptRunLogger {}
  class GameTestScriptRunLogger extends ScriptRunLogger {
    logSourceFile(file: SourceFile): void;
  }


  interface MutableRunInfo extends IMutableScriptRunInfo {}
  class MutableRunInfo extends IMutableScriptRunInfo {
    appliedActions(): IAction[];
    configuration(): ScriptRunConfiguration;
    displayBranding(displayBranding: boolean): void;
    displayBranding(): boolean;
    dumpClasses(dumpClasses: boolean): void;
    dumpClasses(): boolean;
    invalidActions(): IAction[];
    isFirstRun(): boolean;
  }


  interface PreprocessedSourceFile extends SourceFile {}
  class PreprocessedSourceFile extends SourceFile {
    get filename(): string;
    get order(): number;
    open(): Reader;
    update(content: string): void;
  }


  interface RunInfo extends IScriptRunInfo {}
  class RunInfo extends IScriptRunInfo {
    appliedActions(): IAction[];
    configuration(): ScriptRunConfiguration;
    displayBranding(): boolean;
    dumpClasses(): boolean;
    invalidActions(): IAction[];
    isFirstRun(): boolean;
  }


  class RunInfoQueue {
  }


  interface ScriptFile extends IScriptFile {}
  class ScriptFile extends IScriptFile {
    fileContents(): string[];
    matchesFor(preprocessor: IPreprocessor): Match[];
    preprocessedContents(): string[];
    toSourceFile(): Optional<SourceFile>;
  }


  interface ScriptRun extends IScriptRun {}
  class ScriptRun extends IScriptRun {
    execute(): void;
    specificRunInfo(): IScriptRunInfo;
  }


  interface ScriptRunLogger extends ScriptingEngineLogger, GameTestScriptRunLogger {}
  class ScriptRunLogger extends ScriptingEngineLogger {
    debug(message: string): void;
    error(message: string): void;
    info(message: string): void;
    logCompileException(exception: CompileException): void;
    logSourceFile(file: SourceFile): void;
    logValidationError(errorEntry: ValidationLogEntry): void;
    logValidationWarning(warningEntry: ValidationLogEntry): void;
    throwingErr(message: string, throwable: Throwable): void;
    throwingWarn(message: string, throwable: Throwable): void;
    trace(message: string): void;
    warning(message: string): void;
  }


  interface ScriptRunManager extends IScriptRunManager {}
  class ScriptRunManager extends IScriptRunManager {
    applyAction(action: IAction): void;
    createScriptRun(configuration: ScriptRunConfiguration): IScriptRun;
    createScriptRun(root: Path, configuration: ScriptRunConfiguration): IScriptRun;
    createScriptRun(root: Path, discoveryConfiguration: ScriptDiscoveryConfiguration, runConfiguration: ScriptRunConfiguration): IScriptRun;
    createScriptRun(root: Path, files: Path[], configuration: ScriptRunConfiguration): IScriptRun;
    createScriptRun(sources: SourceFile[], configuration: ScriptRunConfiguration): IScriptRun;
    currentRunInfo(): IScriptRunInfo;
    static get (): ScriptRunManager;
  }


  interface SuspiciousAwarePathList extends List<Path> {}
  class SuspiciousAwarePathList extends List<Path> {
    add(path: Path): boolean;
    add(index: number, element: Path): void;
    addAll(c: Collection<Path>): boolean;
    addAll(index: number, c: Collection<Path>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    forEach(action: Consumer<Path>): void;
    get(index: number): Path;
    indexOf(o: any): number;
    isEmpty(): boolean;
    iterator(): Iterator<Path>;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator<Path>;
    listIterator(index: number): ListIterator<Path>;
    parallelStream(): Stream<Path>;
    remove(o: any): boolean;
    remove(index: number): Path;
    removeAll(c: Collection<any>): boolean;
    removeIf(filter: Predicate<Path>): boolean;
    replaceAll(operator: UnaryOperator<Path>): void;
    retainAll(c: Collection<any>): boolean;
    set(index: number, element: Path): Path;
    size(): number;
    sort(c: Comparator<Path>): void;
    spliterator(): Spliterator<Path>;
    stream(): Stream<Path>;
    subList(fromIndex: number, toIndex: number): Path[];
    toArray(): any[];
    toArray<T>(a: T[]): T[];
    toArray<T>(generator: IntFunction<T[]>): T[];
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.scriptrun.natives' {
  import { JavaNativeClassConverter, JavaNativeConverter, JavaNativeConverterBuilder, JavaNativePackageInfo, JavaNativeTypeConverter, JavaNativeHeaderConverter, JavaNativeMemberConverter, JavaNativeExpansionConverter } from 'org.openzen.zencode.java.module.converters';
  import { Class } from 'java.lang';
  import { HighLevelDefinition, FunctionParameter } from 'org.openzen.zenscript.codemodel';
  import { IScriptRunInfo } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { IZenClassRegistry } from 'com.blamejared.crafttweaker.api.zencode';
  import { JavaNativeTypeConversionContext } from 'org.openzen.zencode.java.module';
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { Parameter } from 'java.lang.reflect';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';

  interface CtJavaNativeClassConverter extends JavaNativeClassConverter {}
  class CtJavaNativeClassConverter extends JavaNativeClassConverter {
    getNameForScripts(cls: Class<any>): string;
    shouldLoadClass(cls: Class<any>): boolean;
  }


  interface CtJavaNativeConverter extends JavaNativeConverter {}
  class CtJavaNativeConverter extends JavaNativeConverter {
    addClass(cls: Class<any>): HighLevelDefinition;
  }


  interface CtJavaNativeConverterBuilder extends JavaNativeConverterBuilder {}
  class CtJavaNativeConverterBuilder extends JavaNativeConverterBuilder {
    constructor(info: IScriptRunInfo, registry: IZenClassRegistry);
    getClassConverter(packageInfo: JavaNativePackageInfo, typeConversionContext: JavaNativeTypeConversionContext, typeConverter: JavaNativeTypeConverter, headerConverter: JavaNativeHeaderConverter, memberConverter: JavaNativeMemberConverter): JavaNativeClassConverter;
    reinitializeLazyHeaderValues(): void;
  }


  interface CtJavaNativeExpansionConverter extends JavaNativeExpansionConverter {}
  class CtJavaNativeExpansionConverter extends JavaNativeExpansionConverter {
  }


  interface CtJavaNativeHeaderConverter extends JavaNativeHeaderConverter {}
  class CtJavaNativeHeaderConverter extends JavaNativeHeaderConverter {
    getDefaultValue(parameter: Parameter, type: TypeID, functionParameter: FunctionParameter): Expression;
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.scriptrun.runner' {
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { CodePosition, SourceFile } from 'org.openzen.zencode.shared';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { IScriptRunInfo } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { List } from 'java.util';
  import { ScriptingEngineLogger } from 'org.openzen.zencode.java.logger';

  interface ExecutingScriptRunner extends ScriptRunner {}
  class ExecutingScriptRunner extends ScriptRunner {
  }


  interface FormattingScriptRunner extends ScriptRunner {}
  class FormattingScriptRunner extends ScriptRunner {
  }


  interface GameTestScriptRunner extends ScriptRunner {}
  class GameTestScriptRunner extends ScriptRunner {
  }


  interface IgnorePrefixCasingBracketParser extends BracketExpressionParser {}
  class IgnorePrefixCasingBracketParser extends BracketExpressionParser {
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  class IScriptRunner {
    static of(info: IScriptRunInfo, sources: SourceFile[], logger: ScriptingEngineLogger): IScriptRunner;
    run(): void;
  }


  interface ScriptRunner extends IScriptRunner, ExecutingScriptRunner, FormattingScriptRunner, SyntaxCheckScriptRunner, GameTestScriptRunner {}
  class ScriptRunner extends IScriptRunner {
    static of(info: IScriptRunInfo, sources: SourceFile[], logger: ScriptingEngineLogger): ScriptRunner;
    run(): void;
  }


  interface SyntaxCheckScriptRunner extends ScriptRunner {}
  class SyntaxCheckScriptRunner extends ScriptRunner {
  }

}

declare module 'com.blamejared.crafttweaker.impl.script.scriptrun.ScriptRun' {
  import { BiFunction, Function } from 'java.util.function';
  import { Logger } from 'org.apache.logging.log4j';
  import { ScriptingEngineLogger } from 'org.openzen.zencode.java.logger';

  interface Constructor extends BiFunction<Logger, Function, ScriptingEngineLogger> {}
  class Constructor extends BiFunction<Logger, Function, ScriptingEngineLogger> {
  }

}

declare module 'com.blamejared.crafttweaker.impl.service' {
  import { IBridgeService } from 'com.blamejared.crafttweaker.platform.services';
  import { ICraftTweakerRegistry } from 'com.blamejared.crafttweaker.api';
  import { IScriptRunManager, IScriptRunModuleConfigurator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { IAccessibleElementsProvider } from 'com.blamejared.crafttweaker.platform.helper';
  import { ILoggerRegistry } from 'com.blamejared.crafttweaker.api.logging';

  interface BridgeService extends IBridgeService {}
  class BridgeService extends IBridgeService {
    accessibleElementsProvider(): IAccessibleElementsProvider;
    defaultScriptRunModuleConfigurator(basePackage: string): IScriptRunModuleConfigurator;
    loggerRegistry(): ILoggerRegistry;
    registry(): ICraftTweakerRegistry;
    scriptRunManager(): IScriptRunManager;
  }

}

declare module 'com.blamejared.crafttweaker.mixin' {
  import { BiMap } from 'com.google.common.collect';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootContextParamSet } from 'net.minecraft.world.level.storage.loot.parameters';

  class AccessLootContextParamSets {
    static crafttweaker$getREGISTRY(): BiMap<ResourceLocation, LootContextParamSet>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.client.transform.multiplayer' {
  import { Frozen } from 'RegistryAccess';

  class MixinClientPacketListener {
    registryAccess(): Frozen;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.block' {
  import { InteractionMap } from 'CauldronInteraction';

  class AccessAbstractCauldronBlock {
    crafttweaker$getInteractions(): InteractionMap;
  }


  class AccessBlockBehaviour {
    crafttweaker$getExplosionResistance(): number;
    crafttweaker$getFriction(): number;
    crafttweaker$getHasCollision(): boolean;
    crafttweaker$getJumpFactor(): number;
    crafttweaker$getSpeedFactor(): number;
    crafttweaker$setExplosionResistance(var1: number): void;
    crafttweaker$setFriction(var1: number): void;
    crafttweaker$setHasCollision(var1: boolean): void;
    crafttweaker$setJumpFactor(var1: number): void;
    crafttweaker$setSpeedFactor(var1: number): void;
  }


  class AccessBlockStateBase {
    crafttweaker$getDestroySpeed(): number;
    crafttweaker$getLightEmission(): number;
    crafttweaker$isCanOcclude(): boolean;
    crafttweaker$isIsAir(): boolean;
    crafttweaker$isRequiresCorrectToolForDrops(): boolean;
    crafttweaker$isUseShapeForLightOcclusion(): boolean;
    crafttweaker$setCanOcclude(var1: boolean): void;
    crafttweaker$setDestroySpeed(var1: number): void;
    crafttweaker$setIsAir(var1: boolean): void;
    crafttweaker$setLightEmission(var1: number): void;
    crafttweaker$setRequiresCorrectToolForDrops(var1: boolean): void;
    crafttweaker$setUseShapeForLightOcclusion(var1: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.brewing' {
  import { List } from 'java.util';
  import { Mix } from 'PotionBrewing';
  import { Potion } from 'net.minecraft.world.item.alchemy';

  class AccessPotionBrewing {
    crafttweaker$getPotionMixes(): Mix<Potion>[];
    crafttweaker$setPotionMixes(var1: Mix<Potion>[]): void;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.entity' {
  import { Map } from 'java.util';
  import { GameProfile } from 'com.mojang.authlib';
  import { FakePlayer } from 'net.neoforged.neoforge.common.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class AccessFakePlayerFactory {
    static crafttweaker$getFakePlayers(): Map<GameProfile, FakePlayer>;
    static crafttweaker$getMINECRAFT(): GameProfile;
  }


  class AccessFallingBlockEntity {
    crafttweaker$setBlockState(var1: BlockState): void;
  }


  class AccessLightningBolt {
    crafttweaker$isVisualOnly(): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.item' {
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Stream } from 'java.util.stream';
  import { Value } from 'Ingredient';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DataComponentMap } from 'net.minecraft.core.component';

  class AccessIngredient {
    static crafttweaker$callFromValues(param0: Stream<Value>): Ingredient;
    crafttweaker$getValues(): Value[];
    crafttweaker$setItemStacks(var1: ItemStack[]): void;
  }


  class AccessItem {
    crafttweaker$getComponents(): DataComponentMap;
    crafttweaker$setComponents(var1: DataComponentMap): void;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.level' {
  import { DamageSource } from 'net.minecraft.world.damagesource';

  class AccessExplosion {
    crafttweaker$getDamageSource(): DamageSource;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.level.damage' {
  import { Registry } from 'net.minecraft.core';
  import { DamageType } from 'net.minecraft.world.damagesource';

  class AccessDamageSources {
    crafttweaker$getDamageTypes(): Registry<DamageType>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.loot' {
  import { LootParams, LootContext } from 'net.minecraft.world.level.storage.loot';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGlobalLootModifier } from 'net.neoforged.neoforge.common.loot';
  import { ObjectArrayList } from 'it.unimi.dsi.fastutil.objects';
  import { ItemStack } from 'net.minecraft.world.item';

  class AccessLootContext {
    crafttweaker$getParams(): LootParams;
  }


  class AccessLootContextBuilder {
    crafttweaker$getParams(): LootParams;
  }


  class AccessLootModifierManager {
    crafttweaker$getModifiers(): Map<ResourceLocation, IGlobalLootModifier>;
    crafttweaker$setModifiers(var1: Map<ResourceLocation, IGlobalLootModifier>): void;
  }


  class AccessLootTable {
    crafttweaker$callGetRandomItems(var1: LootContext): ObjectArrayList<ItemStack>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.neoforge' {
  import { Map } from 'java.util';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry } from 'net.minecraft.core';
  import { LoadResultGetter } from 'com.blamejared.crafttweaker.impl.datamap';
  import { DataMapLoader } from 'net.neoforged.neoforge.registries';
  import { LootModifierManager } from 'net.neoforged.neoforge.common.loot';

  class AccessDataMapLoader {
    results(): Map<ResourceKey<Registry<any>>, LoadResultGetter>;
  }


  interface AccessDataMapLoaderResult extends LoadResultGetter {}
  class AccessDataMapLoaderResult extends LoadResultGetter {
  }


  class AccessNeoForgeInternalHandler {
    static crafttweaker$getDataMap(): DataMapLoader;
    static crafttweaker$getLootModifierManager(): LootModifierManager;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.predicate' {
  import { Builder } from 'ImmutableList';
  import { PropertyMatcher } from 'StatePropertiesPredicate';

  class AccessStatePropertiesPredicateBuilder {
    crafttweaker$getMatchers(): Builder<PropertyMatcher>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.recipe' {
  import { Multimap } from 'com.google.common.collect';
  import { RecipeType, RecipeHolder, Ingredient, SmithingTrimRecipe } from 'net.minecraft.world.item.crafting';
  import { Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AccessRecipeManager {
    crafttweaker$getByName(): Map<ResourceLocation, RecipeHolder<any>>;
    crafttweaker$getByType(): Multimap<RecipeType<any>, RecipeHolder<any>>;
    crafttweaker$setByName(var1: Map<ResourceLocation, RecipeHolder<any>>): void;
    crafttweaker$setByType(var1: Multimap<RecipeType<any>, RecipeHolder<any>>): void;
  }


  class AccessSmithingTransformRecipe {
    crafttweaker$getAddition(): Ingredient;
    crafttweaker$getBase(): Ingredient;
    crafttweaker$getTemplate(): Ingredient;
  }


  class AccessSmithingTrimRecipe {
    static crafttweaker$createSmithingTrimRecipe($$0: Ingredient, $$1: Ingredient, $$2: Ingredient): SmithingTrimRecipe;
    crafttweaker$getAddition(): Ingredient;
    crafttweaker$getBase(): Ingredient;
    crafttweaker$getTemplate(): Ingredient;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.registry' {
  import { Stream } from 'java.util.stream';
  import { RegistryEntry } from 'RegistryAccess';
  import { RegistryAccess } from 'net.minecraft.core';

  class AccessMappedRegistry {
    crafttweaker$isFrozen(): boolean;
    crafttweaker$setFrozen(var1: boolean): void;
  }


  class AccessRegistrySynchronization {
    static crafttweaker$callOwnedNetworkableRegistries($$0: RegistryAccess): Stream<RegistryEntry<any>>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.server' {
  import { ReloadableResources } from 'MinecraftServer';
  import { TagManager } from 'net.minecraft.tags';

  class AccessMinecraftServer {
    crafttweaker$getResources(): ReloadableResources;
  }


  class AccessReloadableServerResources {
    crafttweaker$getTagManager(): TagManager;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.tag' {
  import { RegistryAccess, Registry } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { NetworkPayload, TagOutput } from 'TagNetworkSerialization';

  class AccessTagManager {
    crafttweaker$getRegistryAccess(): RegistryAccess;
  }


  class AccessTagNetworkSerialization {
    static crafttweaker$$callDeserializeTagsFromNetwork<T>($$0: ResourceKey<Registry<T>>, $$1: Registry<T>, $$2: NetworkPayload, $$3: TagOutput<T>): void;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.access.villager' {
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { ItemCost } from 'net.minecraft.world.item.trading';

  class AccessBasicTrade {
    crafttweaker$getForSale(): ItemStack;
    crafttweaker$getMaxTrades(): number;
    crafttweaker$getPrice(): ItemStack;
    crafttweaker$getPrice2(): ItemStack;
    crafttweaker$getPriceMult(): number;
    crafttweaker$getXp(): number;
  }


  class AccessDyedArmorForEmeralds {
    crafttweaker$getItem(): Item;
  }


  class AccessEmeraldForItems {
    crafttweaker$getItemStack(): ItemCost;
  }


  class AccessEnchantedItemForEmeralds {
    crafttweaker$getItemStack(): ItemStack;
  }


  class AccessItemsAndEmeraldsToItems {
    crafttweaker$getFromItem(): ItemCost;
    crafttweaker$getToItem(): ItemStack;
  }


  class AccessItemsForEmeralds {
    crafttweaker$getItemStack(): ItemStack;
  }


  class AccessTippedArrowForItemsAndEmeralds {
    crafttweaker$getFromItem(): Item;
    crafttweaker$getToItem(): ItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.item.attribute' {
  import { ItemAttributeModifierBase } from 'com.blamejared.crafttweaker.api.item.attribute';

  interface MixinItemAttributeModifierEvent extends ItemAttributeModifierBase {}
  class MixinItemAttributeModifierEvent extends ItemAttributeModifierBase {
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.item' {
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Collection } from 'java.util';

  class MixinIngredient {
    crafttweaker$storeDissolve(cir: CallbackInfoReturnable<ItemStack[]>): void;
  }


  class MixinIngredientTagValue {
    crafttweaker$injectTags(cir: CallbackInfoReturnable<Collection<ItemStack>>): void;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.loot' {
  import { Mutable } from 'com.blamejared.crafttweaker.impl.loot.ILootTableIdHolder';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface MixinLootContext extends Mutable {}
  class MixinLootContext extends Mutable {
    crafttweaker$tableId(id: ResourceLocation): void;
    crafttweaker$tableId(): ResourceLocation;
  }


  class MixinLootTable {
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.tags' {
  import { Consumer } from 'java.util.function';

  class MixinTagManager {
    crafttweaker$appendConsumer<T>(action: Consumer<T>): Consumer<T>;
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.villager' {
  import { IBasicItemListing } from 'com.blamejared.crafttweaker.api.villager.trade.type';

  interface MixinBasicTrade extends IBasicItemListing {}
  class MixinBasicTrade extends IBasicItemListing {
  }

}

declare module 'com.blamejared.crafttweaker.mixin.common.transform.world.level' {
  import { Level } from 'net.minecraft.world.level';
  import { CraftTweakerSavedDataHolder, CraftTweakerSavedData } from 'com.blamejared.crafttweaker.api.level';
  import { DimensionDataStorage, ServerLevelData } from 'net.minecraft.world.level.storage';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Executor } from 'java.util.concurrent';
  import { LevelStorageAccess } from 'LevelStorageSource';
  import { ResourceKey } from 'net.minecraft.resources';
  import { LevelStem } from 'net.minecraft.world.level.dimension';
  import { ChunkProgressListener } from 'net.minecraft.server.level.progress';
  import { List } from 'java.util';
  import { RandomSequences } from 'net.minecraft.world';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface MixinServerLevel extends CraftTweakerSavedDataHolder, Level {}
  class MixinServerLevel extends CraftTweakerSavedDataHolder {
    crafttweaker$crafttweakerSavedData: CraftTweakerSavedData;
    crafttweaker$getSavedData(): CraftTweakerSavedData;
    crafttweaker$init($$0: MinecraftServer, $$1: Executor, $$2: LevelStorageAccess, $$3: ServerLevelData, $$4: ResourceKey, $$5: LevelStem, $$6: ChunkProgressListener, $$7: boolean, $$8: number, $$9: List, $$10: boolean, $$11: RandomSequences, ci: CallbackInfo): void;
    get dataStorage(): DimensionDataStorage;
  }

}

declare module 'com.blamejared.crafttweaker.natives.advancement' {
  import { Advancement, DisplayInfo, AdvancementRewards, Criterion, AdvancementRequirements, AdvancementHolder, AdvancementProgress, CriterionProgress, AdvancementType } from 'net.minecraft.advancements';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map, List, Set, Collection } from 'java.util';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Predicate } from 'java.util.function';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ChatFormatting } from 'net.minecraft';
  import { ItemStack } from 'net.minecraft.world.item';
  import { PlayerAdvancements, ServerAdvancementManager } from 'net.minecraft.server';

  class ExpandAdvancement {
    static criteria(internal: Advancement): Map<string, Criterion>;
    static display(internal: Advancement): DisplayInfo;
    static isRoot(internal: Advancement): boolean;
    static name(internal: Advancement): Component;
    static parent(internal: Advancement): ResourceLocation;
    static requirements(internal: Advancement): AdvancementRequirements;
    static rewards(internal: Advancement): AdvancementRewards;
    static sendsTelemetryEvent(internal: Advancement): boolean;
  }


  class ExpandAdvancementHolder {
    static id(internal: AdvancementHolder): ResourceLocation;
    static value(internal: AdvancementHolder): Advancement;
  }


  class ExpandAdvancementProgress {
    static getCompletedCriteria(internal: AdvancementProgress): string[];
    static getCriterion(internal: AdvancementProgress, criterionName: string): CriterionProgress;
    static getPercent(internal: AdvancementProgress): number;
    static getProgressText(internal: AdvancementProgress): Component;
    static getRemainingCriteria(internal: AdvancementProgress): string[];
    static grantProgress(internal: AdvancementProgress, criterionName: string): boolean;
    static hasProgress(internal: AdvancementProgress): boolean;
    static isDone(internal: AdvancementProgress): boolean;
    static revokeProgress(internal: AdvancementProgress, criterionName: string): boolean;
  }


  class ExpandAdvancementRequirements {
    static count(internal: AdvancementRequirements, test: Predicate<string>): number;
    static isEmpty(internal: AdvancementRequirements): boolean;
    static names(internal: AdvancementRequirements): Set<string>;
    static requirements(internal: AdvancementRequirements): string[][];
    static size(internal: AdvancementRequirements): number;
    static test(internal: AdvancementRequirements, test: Predicate<string>): boolean;
  }


  class ExpandAdvancementRewards {
    static getRecipes(internal: AdvancementRewards): ResourceLocation[];
    static grant(internal: AdvancementRewards, player: ServerPlayer): void;
  }


  class ExpandAdvancementType {
    static createAnnouncement(internal: AdvancementType, advancement: AdvancementHolder, serverPlayer: ServerPlayer): MutableComponent;
    static getChatColor(internal: AdvancementType): ChatFormatting;
    static getDisplayName(internal: AdvancementType): Component;
    static getName(internal: AdvancementType): string;
  }


  class ExpandCriterion {
  }


  class ExpandCriterionProgress {
    static grant(internal: CriterionProgress): void;
    static isDone(internal: CriterionProgress): boolean;
    static revoke(internal: CriterionProgress): void;
  }


  class ExpandDisplayInfo {
    static getBackground(internal: DisplayInfo): ResourceLocation;
    static getDescription(internal: DisplayInfo): Component;
    static getFrame(internal: DisplayInfo): AdvancementType;
    static getIcon(internal: DisplayInfo): ItemStack;
    static getTitle(internal: DisplayInfo): Component;
    static getX(internal: DisplayInfo): number;
    static getY(internal: DisplayInfo): number;
    static isHidden(internal: DisplayInfo): boolean;
    static setLocation(internal: DisplayInfo, x: number, y: number): void;
    static shouldAnnounceChat(internal: DisplayInfo): boolean;
    static shouldShowToast(internal: DisplayInfo): boolean;
  }


  class ExpandPlayerAdvancements {
    static award(internal: PlayerAdvancements, advancement: AdvancementHolder, criteria: string): boolean;
    static flushDirty(internal: PlayerAdvancements, player: ServerPlayer): void;
    static getOrStartProgress(internal: PlayerAdvancements, advancement: AdvancementHolder): AdvancementProgress;
    static revoke(internal: PlayerAdvancements, advancement: AdvancementHolder, criteria: string): boolean;
  }


  class ExpandServerAdvancementManager {
    static getAdvancement(internal: ServerAdvancementManager, id: ResourceLocation): AdvancementHolder;
    static getAllAdvancements(internal: ServerAdvancementManager): Collection<AdvancementHolder>;
  }

}

declare module 'com.blamejared.crafttweaker.natives.attachment' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AttachmentType, IAttachmentHolder } from 'net.neoforged.neoforge.attachment';
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { NullableT } from '@ZenCodeType';

  class ExpandAttachmentHolder {
  }


  class ExpandAttachmentType {
    static getCommandString(internal: AttachmentType): string;
    static getRegistryName(internal: AttachmentType): ResourceLocation;
  }


  class ExpandIAttachmentHolder {
    static getAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: AttachmentType<T>): T;
    static getAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: Supplier<AttachmentType<T>>): T;
    static hasAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: AttachmentType<T>): boolean;
    static hasAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: Supplier<AttachmentType<T>>): boolean;
    static setAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: AttachmentType<T>, data: T): NullableT;
    static setAttachmentData<T>(internal: IAttachmentHolder, tClass: Class<T>, type: Supplier<AttachmentType<T>>, data: T): NullableT;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.entity' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BannerPattern, BannerPatternLayers, BlockEntity, DecoratedPotPattern } from 'net.minecraft.world.level.block.entity';
  import { List } from 'java.util';
  import { Layer } from 'BannerPatternLayers';
  import { Level } from 'net.minecraft.world.level';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ExpandBannerPattern {
    static assetId(internal: BannerPattern): ResourceLocation;
    static getCommandString(internal: BannerPattern): string;
    static getRegistryName(internal: BannerPattern): ResourceLocation;
    static translationKey(internal: BannerPattern): string;
  }


  class ExpandBannerPatternLayers {
    static layers(internal: BannerPatternLayers): Layer[];
    static of(layers: Layer[]): BannerPatternLayers;
    static removeLast(internal: BannerPatternLayers): BannerPatternLayers;
  }


  class ExpandBlockEntity {
    static getBlockPos(internal: BlockEntity): BlockPos;
    static getBlockState(internal: BlockEntity): BlockState;
    static getData(internal: BlockEntity): IData;
    static getLevel(internal: BlockEntity): Level;
    static getRegistryName(internal: BlockEntity): ResourceLocation;
    static hasLevel(internal: BlockEntity): boolean;
    static setData(internal: BlockEntity, data: IData): void;
    static updateData(internal: BlockEntity, data: IData): void;
  }


  class ExpandDecoratedPotPattern {
    static assetId(internal: DecoratedPotPattern): ResourceLocation;
    static getCommandString(internal: DecoratedPotPattern): string;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.entity.ExpandBannerPatternLayers' {
  import { Layer, Builder } from 'BannerPatternLayers';
  import { BannerPattern, BannerPatternLayers } from 'net.minecraft.world.level.block.entity';
  import { DyeColor } from 'net.minecraft.world.item';
  import { MutableComponent } from 'net.minecraft.network.chat';

  class ExpandBannerPatternLayersLayer {
    static color(internal: Layer): DyeColor;
    static description(internal: Layer): MutableComponent;
    static of(pattern: BannerPattern, color: DyeColor): Layer;
    static pattern(internal: Layer): BannerPattern;
  }


  class ExpandBannerPatternLayersBuilder {
    static add(internal: Builder, pattern: BannerPattern, color: DyeColor): Builder;
    static add(internal: Builder, layer: Layer): Builder;
    static addAll(internal: Builder, layers: BannerPatternLayers): Builder;
    static build(internal: Builder): BannerPatternLayers;
    static of(): Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.entity.type' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { DecoratedPotBlockEntity, PotDecorations } from 'net.minecraft.world.level.block.entity';

  class ExpandBeehiveBlockEntity {
  }


  class ExpandDecoratedPotBlockEntity {
    static getDecorations(internal: DecoratedPotBlockEntity): PotDecorations;
    static getPotAsItem(internal: DecoratedPotBlockEntity): ItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.entity.type.ExpandBeehiveBlockEntity' {
  import { Occupant } from 'BeehiveBlockEntity';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { CustomData } from 'net.minecraft.world.item.component';

  class ExpandBeehiveBlockEntityOccupant {
    static create(ticksInHive: number): Occupant;
    static createEntity(internal: Occupant, level: Level, pos: BlockPos): Entity;
    static entityData(internal: Occupant): CustomData;
    static minTicksInHive(internal: Occupant): number;
    static of(entity: Entity): Occupant;
    static ticksInHive(internal: Occupant): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block, SoundType, Rotation } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { List, Map } from 'java.util';
  import { Item } from 'net.minecraft.world.item';
  import { CTBlockIngredient } from 'com.blamejared.crafttweaker.api.block';

  class ExpandBlock {
    static asBlockIngredient(internal: Block): CTBlockIngredient;
    static asItem(internal: Block): Item;
    static asList(internal: Block, other: CTBlockIngredient): CTBlockIngredient;
    static getCommandString(internal: Block): string;
    static getDefaultState(internal: Block): BlockState;
    static getDescriptionId(internal: Block): string;
    static getExplosionResistance(internal: Block): number;
    static getFriction(internal: Block): number;
    static getJumpFactor(internal: Block): number;
    static getLootTable(internal: Block): string;
    static getName(internal: Block): MutableComponent;
    static getPossibleStates(internal: Block): BlockState[];
    static getRegistryName(internal: Block): ResourceLocation;
    static getSpeedFactor(internal: Block): number;
    static hasCollision(internal: Block): boolean;
    static hasDynamicShape(internal: Block): boolean;
    static isPossibleToRespawnInThis(internal: Block, state: BlockState): boolean;
    static matches(internal: Block, other: Block): boolean;
    static setExplosionResistance(internal: Block, resistance: number): void;
    static setFriction(internal: Block, friction: number): void;
    static setHasCollision(internal: Block, canCollide: boolean): void;
    static setJumpFactor(internal: Block, jumpFactor: number): void;
    static setSpeedFactor(internal: Block, speedFactor: number): void;
  }


  class ExpandBlockState {
    static asBlockIngredient(internal: BlockState): CTBlockIngredient;
    static asList(internal: BlockState, other: CTBlockIngredient): CTBlockIngredient;
    static asString(internal: BlockState): string;
    static canOcclude(internal: BlockState): boolean;
    static equals(internal: BlockState, other: BlockState): boolean;
    static getAllowedValuesForProperty(internal: BlockState, name: string): string[];
    static getBlock(internal: BlockState): Block;
    static getCommandString(internal: BlockState): string;
    static getDestroySpeed(internal: BlockState): number;
    static getLightEmission(internal: BlockState): number;
    static getProperties(internal: BlockState): Map<string, string>;
    static getPropertyNames(internal: BlockState): string[];
    static getPropertyValue(internal: BlockState, name: string): string;
    static getSoundType(internal: BlockState): SoundType;
    static hasBlockEntity(internal: BlockState): boolean;
    static hasProperty(internal: BlockState, name: string): boolean;
    static isRandomlyTicking(internal: BlockState): boolean;
    static isSignalSource(internal: BlockState): boolean;
    static matches(internal: BlockState, other: BlockState): boolean;
    static rotate(internal: BlockState, rotation: Rotation): BlockState;
    static setDestroySpeed(internal: BlockState, destroySpeed: number): void;
    static withProperty(internal: BlockState, name: string, value: string): BlockState;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.material' {
  class ExpandPushReaction {
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.type.cauldron' {
  import { AbstractCauldronBlock } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';

  class ExpandAbstractCauldronBlock {
    static isFull(internal: AbstractCauldronBlock, blockState: BlockState): boolean;
  }


  class ExpandCauldronBlock {
  }


  class ExpandLavaCauldronBlock {
  }


  class ExpandLayeredCauldronBlock {
    static lowerFillLevel(blockState: BlockState, level: Level, position: BlockPos): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.type.falling' {
  import { Fallable, FallingBlock } from 'net.minecraft.world.level.block';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Entity } from 'net.minecraft.world.entity';

  class ExpandFallable {
    static getFallDamageSource(internal: Fallable, entity: Entity): DamageSource;
    static onBrokenAfterFall(internal: Fallable, level: Level, pos: BlockPos, fallingEntity: FallingBlockEntity): void;
    static onLand(internal: Fallable, level: Level, pos: BlockPos, fallingState: BlockState, placeState: BlockState, fallingEntity: FallingBlockEntity): void;
  }


  class ExpandFallingBlock {
    static getDustColor(internal: FallingBlock, state: BlockState, level: Level, pos: BlockPos): number;
    static isFree(state: BlockState): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.block.type.piston' {
  import { AABB } from 'net.minecraft.world.phys';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { PistonStructureResolver } from 'net.minecraft.world.level.block.piston';
  import { List } from 'java.util';

  class ExpandPistonMath {
    static getMovementArea(area: AABB, direction: Direction, progress: number): AABB;
  }


  class ExpandPistonStructureResolver {
    static getPushDirection(internal: PistonStructureResolver): Direction;
    static getToDestroy(internal: PistonStructureResolver): BlockPos[];
    static getToPush(internal: PistonStructureResolver): BlockPos[];
    static resolve(internal: PistonStructureResolver): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.capability' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BaseCapability, BlockCapability, EntityCapability, ItemCapability } from 'net.neoforged.neoforge.capabilities';
  import { NullableT } from '@ZenCodeType';
  import { Class } from 'java.lang';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Entity } from 'net.minecraft.world.entity';
  import { FluidAction } from 'IFluidHandler';
  import { IEnergyStorage } from 'net.neoforged.neoforge.energy';
  import { IFluidHandler, IFluidHandlerItem } from 'net.neoforged.neoforge.fluids.capability';
  import { IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemHandler } from 'net.neoforged.neoforge.items';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandBaseCapability {
    static name(internal: BaseCapability): ResourceLocation;
  }


  class ExpandBlockCapability {
    static getCapability<T, U>(internal: BlockCapability, tClass: Class<T>, uClass: Class<U>, level: Level, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, context: U): NullableT;
  }


  class ExpandEntityCapability {
    static getCapability<T, U>(internal: EntityCapability, entity: Entity, context: U): NullableT;
  }


  class ExpandFluidHandlerAction {
    static execute(internal: FluidAction): boolean;
    static simulate(internal: FluidAction): boolean;
  }


  class ExpandIEnergyStorage {
    static canExtract(internal: IEnergyStorage): boolean;
    static canReceive(internal: IEnergyStorage): boolean;
    static extractEnergy(internal: IEnergyStorage, maxExtract: number, simulate: boolean): number;
    static getEnergyStored(internal: IEnergyStorage): number;
    static getMaxEnergyStored(internal: IEnergyStorage): number;
    static receiveEnergy(internal: IEnergyStorage, maxReceive: number, simulate: boolean): number;
  }


  class ExpandIFluidHandler {
    static drain(internal: IFluidHandler, resource: IFluidStack, action: FluidAction): IFluidStack;
    static drain(internal: IFluidHandler, maxDrain: number, action: FluidAction): IFluidStack;
    static fill(internal: IFluidHandler, resource: IFluidStack, action: FluidAction): number;
    static getFluidInTank(internal: IFluidHandler, tank: number): IFluidStack;
    static getTankCapacity(internal: IFluidHandler, tank: number): number;
    static getTanks(internal: IFluidHandler): number;
    static isFluidValid(internal: IFluidHandler, tank: number, stack: IFluidStack): boolean;
  }


  class ExpandIFluidHandlerItem {
    static getContainer(internal: IFluidHandlerItem): ItemStack;
  }


  class ExpandIItemHandler {
    static extractItem(internal: IItemHandler, slot: number, amount: number, simulate: boolean): IItemStack;
    static getSlotLimit(internal: IItemHandler, slot: number): number;
    static getSlots(internal: IItemHandler): number;
    static getStackInSlot(internal: IItemHandler, slot: number): IItemStack;
    static insertItem(internal: IItemHandler, slot: number, stack: IItemStack, simulate: boolean): IItemStack;
    static isItemValid(internal: IItemHandler, slot: number, stack: IItemStack): boolean;
  }


  class ExpandItemCapability {
    static getCapability<T, U>(internal: ItemCapability, entity: ItemStack, context: U): NullableT;
  }

}

declare module 'com.blamejared.crafttweaker.natives.command' {
  import { CommandSource } from 'net.minecraft.commands';
  import { Component } from 'net.minecraft.network.chat';

  class ExpandCommandSource {
    static acceptsFailure(internal: CommandSource): boolean;
    static acceptsSuccess(internal: CommandSource): boolean;
    static alwaysAccepts(internal: CommandSource): boolean;
    static sendMessage(internal: CommandSource, component: Component): void;
    static shouldInformAdmins(internal: CommandSource): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.component' {
  import { DataComponentMap, DataComponentHolder, DataComponentType, TypedDataComponent, DataComponentPatch, PatchedDataComponentMap } from 'net.minecraft.core.component';
  import { Class } from 'java.lang';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { NullableTypedDataComponent, NullableT } from '@ZenCodeType';
  import { List, Set } from 'java.util';
  import { Builder } from 'DataComponentMap';
  import { Builder as datacomponentpatch_Builder, SplitResult } from 'DataComponentPatch';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { MutableDataComponentHolder } from 'net.neoforged.neoforge.common';
  import { UnaryOperator, BiFunction } from 'java.util.function';

  class ExpandDataComponentHolder {
    static getComponent<T>(internal: DataComponentHolder, tClass: Class<T>, type: DataComponentType<T>): T;
    static getComponents(internal: DataComponentHolder): DataComponentMap;
    static getJsonComponent(internal: DataComponentHolder, type: DataComponentType): IData;
    static getOrDefault<T>(internal: DataComponentHolder, tClass: Class<T>, type: DataComponentType<T>, defaultValue: T): T;
    static has(internal: DataComponentHolder, type: DataComponentType<any>): boolean;
  }


  class ExpandDataComponentMap {
    static builder(): Builder;
    static composite(a: DataComponentMap, b: DataComponentMap): DataComponentMap;
    static getComponent<T>(internal: DataComponentMap, tClass: Class<T>, type: DataComponentType<T>): NullableT;
    static getOrDefault<T>(internal: DataComponentMap, tClass: Class<T>, type: DataComponentType<T>, defaultValue: T): T;
    static getTyped<T>(internal: DataComponentMap, tClass: Class<T>, type: DataComponentType<T>): NullableTypedDataComponent<T>;
    static has(internal: DataComponentMap, type: DataComponentType<any>): boolean;
    static isEmpty(internal: DataComponentMap): boolean;
    static keySet(internal: DataComponentMap): Set<DataComponentType<any>>;
    static list(internal: DataComponentMap): TypedDataComponent<any>[];
    static size(internal: DataComponentMap): number;
  }


  class ExpandDataComponentPatch {
    static builder(): datacomponentpatch_Builder;
    static forget<T>(internal: DataComponentPatch, tClass: Class<T>, component: DataComponentType<T>): DataComponentPatch;
    static getComponent<T>(internal: DataComponentPatch, type: DataComponentType<T>): NullableT;
    static isEmpty(internal: DataComponentPatch): boolean;
    static size(internal: DataComponentPatch): number;
    static split(internal: DataComponentPatch): SplitResult;
  }


  class ExpandDataComponents {
    static commonItemComponents(): DataComponentMap;
  }


  class ExpandDataComponentType {
    static getCommandString(internal: DataComponentType): string;
    static getRegistryName(internal: DataComponentType): ResourceLocation;
    static isTransient(internal: DataComponentType): boolean;
  }


  class ExpandMutableDataComponentHolder {
    static applyComponents(internal: MutableDataComponentHolder, components: DataComponentMap): void;
    static applyComponents(internal: MutableDataComponentHolder, patch: DataComponentPatch): void;
    static copyFrom(internal: MutableDataComponentHolder, src: DataComponentHolder, ...componentTypes: DataComponentType<any>[]): void;
    static remove<T>(internal: MutableDataComponentHolder, componentType: DataComponentType<T>): NullableT;
    static setComponent<T>(internal: MutableDataComponentHolder, componentType: DataComponentType<T>, value: T): NullableT;
    static update<T>(internal: MutableDataComponentHolder, componentType: DataComponentType<T>, value: T, updater: UnaryOperator<T>): NullableT;
    static update<T, U>(internal: MutableDataComponentHolder, componentType: DataComponentType<T>, value: T, updateContext: U, updater: BiFunction<T, U, T>): NullableT;
  }


  class ExpandTypedDataComponent {
    static applyTo<T>(internal: TypedDataComponent<T>, tClass: Class<T>, patchedMap: PatchedDataComponentMap): void;
    static asIData(internal: TypedDataComponent): IData;
    static getRegistryName(internal: TypedDataComponent): ResourceLocation;
    static of<T>(tClass: Class<T>, type: DataComponentType<T>, value: T): TypedDataComponent<T>;
    static type<T>(internal: TypedDataComponent<T>, tClass: Class<T>): DataComponentType<T>;
    static value<T>(internal: TypedDataComponent<T>, tClass: Class<T>): T;
  }

}

declare module 'com.blamejared.crafttweaker.natives.component.ExpandDataComponentMap' {
  import { Builder } from 'DataComponentMap';
  import { Class } from 'java.lang';
  import { DataComponentType, DataComponentMap } from 'net.minecraft.core.component';

  class ExpandDataComponentMapBuilder {
    static addAll(internal: Builder, other: DataComponentMap): Builder;
    static build(internal: Builder): DataComponentMap;
    static setComponent<T>(internal: Builder, tClass: Class<T>, type: DataComponentType<T>, value: T): Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.component.ExpandDataComponentPatch' {
  import { DataComponentMap, DataComponentType, TypedDataComponent, DataComponentPatch } from 'net.minecraft.core.component';
  import { SplitResult, Builder } from 'DataComponentPatch';
  import { Set } from 'java.util';
  import { Class } from 'java.lang';

  class ExpandDataComponentPatchSplitResult {
    static added(internal: SplitResult): DataComponentMap;
    static removed(internal: SplitResult): Set<DataComponentType<any>>;
  }


  class ExpandDataComponentPatchBuilder {
    static build(internal: Builder): DataComponentPatch;
    static remove<T>(internal: Builder, tClass: Class<T>, type: DataComponentType<T>): Builder;
    static setComponent<T>(internal: Builder, tClass: Class<T>, type: DataComponentType<T>, value: T): Builder;
    static setComponent<T>(internal: Builder, tClass: Class<T>, type: TypedDataComponent<T>): Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.attribute' {
  import { Attribute, AttributeInstance, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Operation } from 'AttributeModifier';

  class ExpandAttribute {
    static getCommandString(internal: Attribute): string;
    static getDefaultValue(internal: Attribute): number;
    static getRegistryName(internal: Attribute): ResourceLocation;
    static isClientSyncable(internal: Attribute): boolean;
    static sanitizeValue(internal: Attribute, value: number): number;
  }


  class ExpandAttributeInstance {
    static addPermanentModifier(internal: AttributeInstance, modifier: AttributeModifier): void;
    static addTransientModifier(internal: AttributeInstance, modifier: AttributeModifier): void;
    static getBaseValue(internal: AttributeInstance): number;
    static getModifier(internal: AttributeInstance, id: ResourceLocation): AttributeModifier;
    static getModifiers(internal: AttributeInstance): AttributeModifier[];
    static getValue(internal: AttributeInstance): number;
    static hasModifier(internal: AttributeInstance, id: ResourceLocation): boolean;
    static removeModifier(internal: AttributeInstance, id: ResourceLocation): void;
    static setBaseValue(internal: AttributeInstance, value: number): void;
  }


  class ExpandAttributeModifier {
    static amount(internal: AttributeModifier): number;
    static create(id: ResourceLocation, amount: number, operation: Operation): AttributeModifier;
    static id(internal: AttributeModifier): ResourceLocation;
    static operation(internal: AttributeModifier): Operation;
  }


  class ExpandAttributeOperation {
    static id(internal: Operation): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.effect' {
  import { MobEffect, MobEffectCategory, MobEffectInstance } from 'net.minecraft.world.effect';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { Component } from 'net.minecraft.network.chat';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Operation } from 'AttributeModifier';
  import { Map } from 'java.util';
  import { ChatFormatting } from 'net.minecraft';
  import { Runnable } from 'java.lang';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';

  class ExpandInstantenousMobEffect {
  }


  class ExpandMobEffect {
    static addAttributeModifier(internal: MobEffect, attribute: Attribute, id: ResourceLocation, value: number, operation: Operation): MobEffect;
    static applyEffectTick(internal: MobEffect, entity: LivingEntity, amplifier: number): void;
    static applyInstantenousEffect(internal: MobEffect, source: Entity, indirectSource: Entity, target: LivingEntity, amplifier: number, effectiveness: number): void;
    static getAttributeModifiers(internal: MobEffect, amplifier: number): Map<Attribute, AttributeModifier>;
    static getCategory(internal: MobEffect): MobEffectCategory;
    static getColor(internal: MobEffect): number;
    static getCommandString(internal: MobEffect): string;
    static getDescriptionId(internal: MobEffect): string;
    static getDisplayName(internal: MobEffect): Component;
    static getRegistryName(internal: MobEffect): ResourceLocation;
    static isBeneficial(internal: MobEffect): boolean;
    static isInstantenous(internal: MobEffect): boolean;
    static shouldApplyEffectTickThisTick(internal: MobEffect, duration: number, amplifier: number): boolean;
  }


  class ExpandMobEffectCategory {
    static getTooltipFormatting(internal: MobEffectCategory): ChatFormatting;
  }


  class ExpandMobEffectInstance {
    static compareTo(internal: MobEffectInstance, other: MobEffectInstance): number;
    static getAmplifier(internal: MobEffectInstance): number;
    static getDescriptionId(internal: MobEffectInstance): string;
    static getDuration(internal: MobEffectInstance): number;
    static getEffect(internal: MobEffectInstance): MobEffect;
    static isAmbient(internal: MobEffectInstance): boolean;
    static isVisible(internal: MobEffectInstance): boolean;
    static load(data: MapData): MobEffectInstance;
    static of(mobEffect: MobEffect, duration: number, amplifier: number, ambient: boolean, visible: boolean, showIcon: boolean, hiddenEffect: MobEffectInstance): MobEffectInstance;
    static save(internal: MobEffectInstance): MapData;
    static showIcon(internal: MobEffectInstance): boolean;
    static tick(internal: MobEffectInstance, entity: LivingEntity, onFinish: Runnable): boolean;
    static update(internal: MobEffectInstance, instance: MobEffectInstance): boolean;
  }


  class ExpandMobEffectUtil {
    static formatDuration(instance: MobEffectInstance, durationFactor: number, ticksPerSecond: number): Component;
    static getDigSpeedAmplification(entity: LivingEntity): number;
    static hasDigSpeed(entity: LivingEntity): boolean;
    static hasWaterBreathing(entity: LivingEntity): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.equipment' {
  import { Type } from 'EquipmentSlot';
  import { EquipmentSlot, EquipmentSlotGroup } from 'net.minecraft.world.entity';

  class ExpandEquipmentSlot {
    static getCommandString(internal: EquipmentSlot): string;
    static getIndex(internal: EquipmentSlot): number;
    static getName(internal: EquipmentSlot): string;
    static getType(internal: EquipmentSlot): Type;
  }


  class ExpandEquipmentSlotGroup {
    static bySlot(slot: EquipmentSlot): EquipmentSlotGroup;
    static test(internal: EquipmentSlotGroup, slot: EquipmentSlot): boolean;
  }


  class ExpandEquipmentSlotType {
    static getCommandString(internal: Type): string;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity' {
  import { Entity, EntityType, EntityDimensions, MobSpawnType, MobCategory, HumanoidArm, LivingEntity, EquipmentSlot, Shearable, Targeting } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Set, List, UUID, Collection, Map } from 'java.util';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Component } from 'net.minecraft.network.chat';
  import { Predicate, Consumer } from 'java.util.function';
  import { PushReaction, Fluid } from 'net.minecraft.world.level.material';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { EntityAccess, EntityTypeTest } from 'net.minecraft.world.level.entity';
  import { RemovalReason } from 'Entity';
  import { NullableT } from '@ZenCodeType';
  import { Class, Void, Iterable } from 'java.lang';
  import { EntityCapability } from 'net.neoforged.neoforge.capabilities';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { CTEntityIngredient, INameTagFunction } from 'com.blamejared.crafttweaker.api.entity';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { RandomSource } from 'net.minecraft.util';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { InteractionHand } from 'net.minecraft.world';
  import { AttributeInstance, Attribute } from 'net.minecraft.world.entity.ai.attributes';

  class ExpandEntity {
    static addTag(internal: Entity, tagName: string): boolean;
    static blockPosition(internal: Entity): BlockPos;
    static canBeCollidedWith(internal: Entity): boolean;
    static canCollideWith(internal: Entity, other: Entity): boolean;
    static canFreeze(internal: Entity): boolean;
    static clearFire(internal: Entity): void;
    static closerThan(internal: Entity, other: Entity, distance: number): boolean;
    static dampensVibrations(internal: Entity): boolean;
    static discard(internal: Entity): void;
    static dismountsUnderwater(internal: Entity): boolean;
    static distanceTo(internal: Entity, entity: Entity): number;
    static distanceToSqr(internal: Entity, x: number, y: number, z: number): number;
    static distanceToSqr(internal: Entity, entity: Entity): number;
    static distanceToSqr(internal: Entity, vec: Vec3): number;
    static ejectPassengers(internal: Entity): void;
    static fireImmune(internal: Entity): boolean;
    static getAirSupply(internal: Entity): number;
    static getBbHeight(internal: Entity): number;
    static getBbWidth(internal: Entity): number;
    static getBlockX(internal: Entity): number;
    static getBlockY(internal: Entity): number;
    static getBlockZ(internal: Entity): number;
    static getBoundingBoxForCulling(internal: Entity): AABB;
    static getCommandSenderWorld(internal: Entity): Level;
    static getControllingPassenger(internal: Entity): Entity;
    static getCustomData(internal: Entity): MapData;
    static getCustomName(internal: Entity): Component;
    static getData(internal: Entity): MapData;
    static getDeltaMovement(internal: Entity): Vec3;
    static getDimensionChangingDelay(internal: Entity): number;
    static getDirection(internal: Entity): Direction;
    static getDisplayName(internal: Entity): Component;
    static getEyeHeight(internal: Entity): number;
    static getEyePosition(internal: Entity): Vec3;
    static getEyePosition(internal: Entity, partialTicks: number): Vec3;
    static getEyeY(internal: Entity): number;
    static getFirstPassenger(internal: Entity): Entity;
    static getFluidJumpThreshold(internal: Entity): number;
    static getForward(internal: Entity): Vec3;
    static getInBlockState(internal: Entity): BlockState;
    static getLevel(internal: Entity): Level;
    static getLookAngle(internal: Entity): Vec3;
    static getMaxAirSupply(internal: Entity): number;
    static getMaxFallDistance(internal: Entity): number;
    static getMotionDirection(internal: Entity): Direction;
    static getName(internal: Entity): Component;
    static getOnPos(internal: Entity): BlockPos;
    static getPassengers(internal: Entity): Entity[];
    static getPercentFrozen(internal: Entity): number;
    static getPistonPushReaction(internal: Entity): PushReaction;
    static getPosition(internal: Entity, partialTicks: number): Vec3;
    static getRegistryName(internal: Entity): ResourceLocation;
    static getRemainingFireTicks(internal: Entity): number;
    static getRootVehicle(internal: Entity): Entity;
    static getSoundSource(internal: Entity): SoundSource;
    static getStringUUID(internal: Entity): string;
    static getTags(internal: Entity): Set<string>;
    static getTeamColor(internal: Entity): number;
    static getTicksFrozen(internal: Entity): number;
    static getTicksRequiredToFreeze(internal: Entity): number;
    static getType(internal: Entity): EntityType<Entity>;
    static getUpVector(internal: Entity, partialTicks: number): Vec3;
    static getVehicle(internal: Entity): Entity;
    static getViewVector(internal: Entity, partialTicks: number): Vec3;
    static getX(internal: Entity): number;
    static getX(internal: Entity, scale: number): number;
    static getY(internal: Entity): number;
    static getY(internal: Entity, scale: number): number;
    static getZ(internal: Entity): number;
    static getZ(internal: Entity, scale: number): number;
    static hasCustomName(internal: Entity): boolean;
    static hasExactlyOnePlayerPassenger(internal: Entity): boolean;
    static hasGlowingTag(internal: Entity): boolean;
    static hasIndirectPassenger(internal: Entity, entity: Entity): boolean;
    static hasPassenger(internal: Entity, entity: Entity): boolean;
    static hasPassenger(internal: Entity, predicate: Predicate<Entity>): boolean;
    static hurt(internal: Entity, source: DamageSource, amount: number): boolean;
    static isAlive(internal: Entity): boolean;
    static isAttackable(internal: Entity): boolean;
    static isColliding(internal: Entity, pos: BlockPos, state: BlockState): boolean;
    static isCrouching(internal: Entity): boolean;
    static isCurrentlyGlowing(internal: Entity): boolean;
    static isCustomNameVisible(internal: Entity): boolean;
    static isDescending(internal: Entity): boolean;
    static isDiscrete(internal: Entity): boolean;
    static isFree(internal: Entity, x: number, y: number, z: number): boolean;
    static isFullyFrozen(internal: Entity): boolean;
    static isInLava(internal: Entity): boolean;
    static isInWall(internal: Entity): boolean;
    static isInWater(internal: Entity): boolean;
    static isInWaterOrBubble(internal: Entity): boolean;
    static isInWaterOrRain(internal: Entity): boolean;
    static isInWaterRainOrBubble(internal: Entity): boolean;
    static isInvisible(internal: Entity): boolean;
    static isInvisibleTo(internal: Entity, player: Player): boolean;
    static isInvulnerable(internal: Entity): boolean;
    static isInvulnerableTo(internal: Entity, source: DamageSource): boolean;
    static isNoGravity(internal: Entity): boolean;
    static isOnFire(internal: Entity): boolean;
    static isOnPortalCooldown(internal: Entity): boolean;
    static isPassenger(internal: Entity): boolean;
    static isPassengerOfSameVehicle(internal: Entity, entity: Entity): boolean;
    static isPickable(internal: Entity): boolean;
    static isPushable(internal: Entity): boolean;
    static isPushedByFluid(internal: Entity): boolean;
    static isRemoved(internal: Entity): boolean;
    static isShiftKeyDown(internal: Entity): boolean;
    static isSilent(internal: Entity): boolean;
    static isSpectator(internal: Entity): boolean;
    static isSprinting(internal: Entity): boolean;
    static isSteppingCarefully(internal: Entity): boolean;
    static isSuppressingBounce(internal: Entity): boolean;
    static isSwimming(internal: Entity): boolean;
    static isUnderWater(internal: Entity): boolean;
    static isVehicle(internal: Entity): boolean;
    static isVisuallyCrawling(internal: Entity): boolean;
    static isVisuallySwimming(internal: Entity): boolean;
    static kill(internal: Entity): void;
    static lavaHurt(internal: Entity): void;
    static moveRelative(internal: Entity, amount: number, relative: Vec3): void;
    static moveTo(internal: Entity, vec: Vec3): void;
    static moveTo(internal: Entity, x: number, y: number, z: number): void;
    static moveTo(internal: Entity, pos: BlockPos, yaw: number, pitch: number): void;
    static moveTo(internal: Entity, x: number, y: number, z: number, yaw: number, pitch: number): void;
    static onGround(internal: Entity): boolean;
    static playSound(internal: Entity, sound: SoundEvent, volume: number, pitch: number): void;
    static position(internal: Entity): Vec3;
    static positionRider(internal: Entity, entity: Entity): void;
    static removeTag(internal: Entity, tagName: string): boolean;
    static removeVehicle(internal: Entity): void;
    static setAirSupply(internal: Entity, air: number): void;
    static setCustomName(internal: Entity, name: Component): void;
    static setCustomNameVisible(internal: Entity, visible: boolean): void;
    static setDeltaMovement(internal: Entity, deltaMovement: Vec3): void;
    static setDeltaMovement(internal: Entity, xDelta: number, yDelta: number, zDelta: number): void;
    static setGlowingTag(internal: Entity, glowing: boolean): void;
    static setInvisible(internal: Entity, invisible: boolean): void;
    static setInvulnerable(internal: Entity, invulnerable: boolean): void;
    static setIsInPowderSnow(internal: Entity, inPowderSnow: boolean): void;
    static setNoGravity(internal: Entity, noGravity: boolean): void;
    static setOldPosAndRot(internal: Entity): void;
    static setOnGround(internal: Entity, onGround: boolean): void;
    static setPortalCooldown(internal: Entity): void;
    static setPos(internal: Entity, position: Vec3): void;
    static setPos(internal: Entity, x: number, y: number, z: number): void;
    static setPosRaw(internal: Entity, x: number, y: number, z: number): void;
    static setRemainingFireTicks(internal: Entity, ticks: number): void;
    static setShiftKeyDown(internal: Entity, keyDown: boolean): void;
    static setSilent(internal: Entity, silent: boolean): void;
    static setSprinting(internal: Entity, sprinting: boolean): void;
    static setSwimming(internal: Entity, swimming: boolean): void;
    static setTicksFrozen(internal: Entity, ticks: number): void;
    static shouldShowName(internal: Entity): boolean;
    static showVehicleHealth(internal: Entity): boolean;
    static startRiding(internal: Entity, entity: Entity): boolean;
    static startRiding(internal: Entity, entity: Entity, force: boolean): boolean;
    static stopRiding(internal: Entity): void;
    static teleportTo(internal: Entity, x: number, y: number, z: number): void;
    static turn(internal: Entity, yaw: number, pitch: number): void;
    static unRide(internal: Entity): void;
    static updateCustomData(internal: Entity, data: MapData): void;
    static updateCustomEntityTag(internal: Entity, level: Level, player: Player, data: MapData): void;
    static updateData(internal: Entity, data: MapData): void;
  }


  class ExpandEntityAccess {
    static blockPosition(internal: EntityAccess): BlockPos;
    static getBoundingBox(internal: EntityAccess): AABB;
    static getId(internal: EntityAccess): number;
    static getUUID(internal: EntityAccess): UUID;
    static isAlwaysTicking(internal: EntityAccess): boolean;
    static setRemoved(internal: EntityAccess, var1: RemovalReason): void;
    static shouldBeSaved(internal: EntityAccess): boolean;
  }


  class ExpandEntityDimensions {
    static makeBoundingBox(internal: EntityDimensions, vec: Vec3): AABB;
    static makeBoundingBox(internal: EntityDimensions, x: number, y: number, z: number): AABB;
    static scale(internal: EntityDimensions, factor: number): EntityDimensions;
    static scale(internal: EntityDimensions, widthFactor: number, heightFactor: number): EntityDimensions;
  }


  class ExpandEntityNeoForge {
    static getCapability<T>(internal: Entity, tClass: Class<T>, cap: EntityCapability<T, Void>): NullableT;
    static getCapabilityWithContext<T, C>(internal: Entity, tClass: Class<T>, cClass: Class<C>, cap: EntityCapability<T, C>, context: C): NullableT;
  }


  class ExpandEntityRemovalReason {
    static shouldDestroy(internal: RemovalReason): boolean;
  }


  class ExpandEntityType {
    static asEntityIngredient(internal: EntityType<Entity>): CTEntityIngredient;
    static asList(internal: EntityType<Entity>, other: CTEntityIngredient): CTEntityIngredient;
    static canSpawnFarFromPlayer(internal: EntityType<Entity>): boolean;
    static canSummon(internal: EntityType<Entity>): boolean;
    static create(internal: EntityType<Entity>, level: Level): Entity;
    static fireImmune(internal: EntityType<Entity>): boolean;
    static getCategory(internal: EntityType<Entity>): MobCategory;
    static getCommandString(internal: EntityType<Entity>): string;
    static getDefaultLootTable(internal: EntityType<Entity>): ResourceLocation;
    static getDescription(internal: EntityType<Entity>): Component;
    static getDescriptionId(internal: EntityType<Entity>): string;
    static getDimensions(internal: EntityType<Entity>): EntityDimensions;
    static getHeight(internal: EntityType<Entity>): number;
    static getRegistryName(internal: EntityType<Entity>): ResourceLocation;
    static getWidth(internal: EntityType<Entity>): number;
    static isBlockDangerous(internal: EntityType<Entity>, state: BlockState): boolean;
    static isIn(internal: EntityType<Entity>, tag: KnownTag<EntityType<Entity>>): boolean;
    static rawGetCommandString(internal: EntityType<any>): string;
    static spawn(internal: EntityType<Entity>, level: ServerLevel, spawnStack: IItemStack, spawningPlayer: Player, position: BlockPos, spawnType: MobSpawnType, alignPosition: boolean, invertY: boolean): Entity;
    static spawn(internal: EntityType<Entity>, level: ServerLevel, position: BlockPos, spawnType: MobSpawnType): Entity;
    static spawn(internal: EntityType<Entity>, level: ServerLevel, onSpawn: Consumer<Entity>, position: BlockPos, spawnType: MobSpawnType, alignPosition: boolean, invertY: boolean): Entity;
    static toShortString(internal: EntityType<Entity>): string;
  }


  class ExpandEntityTypeNeoForge {
    static setNameTag(internal: EntityType<Entity>, functionParameter: INameTagFunction): void;
  }


  class ExpandEntityTypeTest {
    static readonly ANY: EntityTypeTest;
  }


  class ExpandHumanoidArm {
    static getKey(internal: HumanoidArm): string;
    static getOpposite(internal: HumanoidArm): HumanoidArm;
  }


  class ExpandLivingEntity {
    static addEffect(internal: LivingEntity, effectInstance: MobEffectInstance): boolean;
    static addEffect(internal: LivingEntity, effectInstance: MobEffectInstance, entity: Entity): boolean;
    static attackable(internal: LivingEntity): boolean;
    static canAttack(internal: LivingEntity, target: LivingEntity): boolean;
    static canBeAffected(internal: LivingEntity, effectInstance: MobEffectInstance): boolean;
    static canBeSeenAsEnemy(internal: LivingEntity): boolean;
    static canBeSeenByAnyone(internal: LivingEntity): boolean;
    static canBreatheUnderwater(internal: LivingEntity): boolean;
    static canStandOnFluid(internal: LivingEntity, fluid: Fluid): boolean;
    static canTakeItem(internal: LivingEntity, stack: ItemStack): boolean;
    static clearSleepingPos(internal: LivingEntity): void;
    static die(internal: LivingEntity, source: DamageSource): void;
    static doHurtTarget(internal: LivingEntity, entity: Entity): boolean;
    static eat(internal: LivingEntity, level: Level, stack: ItemStack): ItemStack;
    static forceAddEffect(internal: LivingEntity, effectInstance: MobEffectInstance, entity: Entity): void;
    static getAbsorptionAmount(internal: LivingEntity): number;
    static getActiveEffects(internal: LivingEntity): Collection<MobEffectInstance>;
    static getActiveEffectsMap(internal: LivingEntity): Map<MobEffect, MobEffectInstance>;
    static getAllSlots(internal: LivingEntity): Iterable<ItemStack>;
    static getArmorCoverPercentage(internal: LivingEntity): number;
    static getArmorSlots(internal: LivingEntity): Iterable<ItemStack>;
    static getArmorValue(internal: LivingEntity): number;
    static getArrowCount(internal: LivingEntity): number;
    static getAttribute(internal: LivingEntity, attribute: Attribute): AttributeInstance;
    static getAttributeBaseValue(internal: LivingEntity, attribute: Attribute): number;
    static getAttributeValue(internal: LivingEntity, attribute: Attribute): number;
    static getBedOrientation(internal: LivingEntity): Direction;
    static getEffect(internal: LivingEntity, effect: MobEffect): MobEffectInstance;
    static getFallFlyingTicks(internal: LivingEntity): number;
    static getHandSlots(internal: LivingEntity): Iterable<ItemStack>;
    static getHealth(internal: LivingEntity): number;
    static getItemBySlot(internal: LivingEntity, slot: EquipmentSlot): ItemStack;
    static getItemInHand(internal: LivingEntity, hand: InteractionHand): ItemStack;
    static getJumpBoostPower(internal: LivingEntity): number;
    static getKillCredit(internal: LivingEntity): LivingEntity;
    static getLastClimbablePos(internal: LivingEntity): BlockPos;
    static getLastDamageSource(internal: LivingEntity): DamageSource;
    static getLastHurtByMob(internal: LivingEntity): LivingEntity;
    static getLastHurtByMobTimestamp(internal: LivingEntity): number;
    static getLastHurtMob(internal: LivingEntity): LivingEntity;
    static getLastHurtMobTimestamp(internal: LivingEntity): number;
    static getLootTable(internal: LivingEntity): ResourceLocation;
    static getLootTableSeed(internal: LivingEntity): number;
    static getMainArm(internal: LivingEntity): HumanoidArm;
    static getMainHandItem(internal: LivingEntity): ItemStack;
    static getMaxHealth(internal: LivingEntity): number;
    static getNoActionTime(internal: LivingEntity): number;
    static getOffhandItem(internal: LivingEntity): ItemStack;
    static getRandom(internal: LivingEntity): RandomSource;
    static getScale(internal: LivingEntity): number;
    static getSleepingPos(internal: LivingEntity): BlockPos;
    static getSpeed(internal: LivingEntity): number;
    static getStingerCount(internal: LivingEntity): number;
    static getSwimAmount(internal: LivingEntity, partialTicks: number): number;
    static getTicksUsingItem(internal: LivingEntity): number;
    static getUseItem(internal: LivingEntity): ItemStack;
    static getUseItemRemainingTicks(internal: LivingEntity): number;
    static getUsedItemHand(internal: LivingEntity): InteractionHand;
    static getVisibilityPercent(internal: LivingEntity, lookingEntity: Entity): number;
    static getVoicePitch(internal: LivingEntity): number;
    static hasEffect(internal: LivingEntity, effect: MobEffect): boolean;
    static hasItemInSlot(internal: LivingEntity, slot: EquipmentSlot): boolean;
    static hasLineOfSight(internal: LivingEntity, entity: Entity): boolean;
    static heal(internal: LivingEntity, amount: number): void;
    static isAffectedByPotions(internal: LivingEntity): boolean;
    static isAutoSpinAttack(internal: LivingEntity): boolean;
    static isBaby(internal: LivingEntity): boolean;
    static isBlocking(internal: LivingEntity): boolean;
    static isCurrentlyGlowing(internal: LivingEntity): boolean;
    static isDamageSourceBlocked(internal: LivingEntity, source: DamageSource): boolean;
    static isDeadOrDying(internal: LivingEntity): boolean;
    static isFallFlying(internal: LivingEntity): boolean;
    static isHolding(internal: LivingEntity, item: Item): boolean;
    static isHolding(internal: LivingEntity, predicate: Predicate<ItemStack>): boolean;
    static isInvertedHealAndHarm(internal: LivingEntity): boolean;
    static isSensitiveToWater(internal: LivingEntity): boolean;
    static isSleeping(internal: LivingEntity): boolean;
    static isSuppressingSlidingDownLadder(internal: LivingEntity): boolean;
    static isUsingItem(internal: LivingEntity): boolean;
    static isVisuallySwimming(internal: LivingEntity): boolean;
    static knockback(internal: LivingEntity, x: number, y: number, z: number): void;
    static releaseUsingItem(internal: LivingEntity): void;
    static removeAllEffects(internal: LivingEntity): boolean;
    static removeEffect(internal: LivingEntity, effect: MobEffect): boolean;
    static removeEffectNoUpdate(internal: LivingEntity, effect: MobEffect): MobEffectInstance;
    static setAbsorptionAmount(internal: LivingEntity, absorption: number): void;
    static setArrowCount(internal: LivingEntity, count: number): void;
    static setDiscardFriction(internal: LivingEntity, discardFriction: boolean): void;
    static setHealth(internal: LivingEntity, health: number): void;
    static setItemInHand(internal: LivingEntity, hand: InteractionHand, stack: ItemStack): void;
    static setItemSlot(internal: LivingEntity, slot: EquipmentSlot, stack: ItemStack): void;
    static setJumping(internal: LivingEntity, jumping: boolean): void;
    static setLastHurtByMob(internal: LivingEntity, entity: LivingEntity): void;
    static setLastHurtByPlayer(internal: LivingEntity, player: Player): void;
    static setLastHurtMob(internal: LivingEntity, entity: Entity): void;
    static setNoActionTime(internal: LivingEntity, idleTime: number): void;
    static setSleepingPos(internal: LivingEntity, pos: BlockPos): void;
    static setSpeed(internal: LivingEntity, speed: number): void;
    static setStingerCount(internal: LivingEntity, count: number): void;
    static shouldDiscardFriction(internal: LivingEntity): boolean;
    static startSleeping(internal: LivingEntity, pos: BlockPos): void;
    static startUsingItem(internal: LivingEntity, hand: InteractionHand): void;
    static stopSleeping(internal: LivingEntity): void;
    static stopUsingItem(internal: LivingEntity): void;
    static swing(internal: LivingEntity, hand: InteractionHand): void;
    static swing(internal: LivingEntity, hand: InteractionHand, updateSelf: boolean): void;
    static travel(internal: LivingEntity, vec: Vec3): void;
  }


  class ExpandMobCategory {
    static getDespawnDistance(internal: MobCategory): number;
    static getMaxInstancesPerChunk(internal: MobCategory): number;
    static getName(internal: MobCategory): string;
    static getNoDespawnDistance(internal: MobCategory): number;
    static isFriendly(internal: MobCategory): boolean;
    static isPersistent(internal: MobCategory): boolean;
  }


  class ExpandMobSpawnType {
  }


  class ExpandShearable {
    static readyForShearing(internal: Shearable): boolean;
    static shear(internal: Shearable, source: SoundSource): void;
  }


  class ExpandTargeting {
    static getTarget(internal: Targeting): LivingEntity;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.animal' {
  import { Animal, Sheep } from 'net.minecraft.world.entity.animal';
  import { ItemStack, DyeColor } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer, ServerLevel } from 'net.minecraft.server.level';
  import { AgeableMob } from 'net.minecraft.world.entity';

  class ExpandAnimal {
    static canFallInLove(internal: Animal): boolean;
    static canMate(internal: Animal, other: Animal): boolean;
    static finalizeSpawnChildFromBreeding(internal: Animal, level: ServerLevel, otherParent: Animal, child: AgeableMob): void;
    static getInLoveTime(internal: Animal): number;
    static getLoveCause(internal: Animal): ServerPlayer;
    static isFood(internal: Animal, stack: ItemStack): boolean;
    static isInLove(internal: Animal): boolean;
    static resetLove(internal: Animal): void;
    static setInLove(internal: Animal, loveCause: Player): void;
    static setInLoveTime(internal: Animal, inLove: number): void;
    static spawnChildFromBreeding(internal: Animal, level: ServerLevel, otherParent: Animal): void;
  }


  class ExpandSheep {
    static getColor(internal: Sheep): DyeColor;
    static getHeadEatAngleScale(internal: Sheep, partialTick: number): number;
    static getHeadEatPositionScale(internal: Sheep, partialTick: number): number;
    static isSheared(internal: Sheep): boolean;
    static setColor(internal: Sheep, color: DyeColor): void;
    static setSheared(internal: Sheep, sheared: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.item' {
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandItemEntity {
    static getItem(itemEntity: ItemEntity): IItemStack;
    static hasPickUpDelay(internal: ItemEntity): boolean;
    static setDefaultPickUpDelay(internal: ItemEntity): void;
    static setItem(itemEntity: ItemEntity, stack: IItemStack): void;
    static setNeverPickUp(internal: ItemEntity): void;
    static setNoPickUpDelay(internal: ItemEntity): void;
    static setPickUpDelay(internal: ItemEntity, ticks: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.misc' {
  import { ExperienceOrb, LightningBolt, Mob, LivingEntity, EquipmentSlot, Entity, MobSpawnType } from 'net.minecraft.world.entity';
  import { FallingBlockEntity } from 'net.minecraft.world.entity.item';
  import { Level, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ProjectileWeaponItem, ItemStack } from 'net.minecraft.world.item';

  class ExpandAgeableMob {
  }


  class ExpandExperienceOrb {
    static getIcon(internal: ExperienceOrb): number;
    static getValue(internal: ExperienceOrb): number;
  }


  class ExpandFallingBlockEntity {
    static callOnBrokenAfterFall(internal: FallingBlockEntity, fallableBlock: Block, position: BlockPos): void;
    static fall(level: Level, pos: BlockPos, state: BlockState): FallingBlockEntity;
    static getBlockState(internal: FallingBlockEntity): BlockState;
    static getStartPos(internal: FallingBlockEntity): BlockPos;
    static setBlockState(internal: FallingBlockEntity, state: BlockState): void;
    static setHurtsEntities(internal: FallingBlockEntity, damagePerDistance: number, maxDamage: number): void;
    static setStartPos(internal: FallingBlockEntity, pos: BlockPos): void;
  }


  class ExpandLightningBolt {
    static getBlocksSetOnFire(internal: LightningBolt): number;
    static getCause(internal: LightningBolt): ServerPlayer;
    static isVisualOnly(internal: LightningBolt): boolean;
    static setVisualOnly(internal: LightningBolt, visualOnly: boolean): void;
  }


  class ExpandMob {
    static ate(internal: Mob): void;
    static canBeLeashed(internal: Mob): boolean;
    static canFireProjectileWeapon(internal: Mob, weapon: ProjectileWeaponItem): boolean;
    static canHoldItem(internal: Mob, stack: ItemStack): boolean;
    static canPickUpLoot(internal: Mob): boolean;
    static canReplaceEqualItem(internal: Mob, toReplace: ItemStack, withParameter: ItemStack): boolean;
    static checkSpawnObstruction(internal: Mob, level: LevelReader): boolean;
    static checkSpawnRules(internal: Mob, level: LevelAccessor, spawnType: MobSpawnType): boolean;
    static clearRestriction(internal: Mob): void;
    static dropLeash(internal: Mob, broadcastPacket: boolean, dropLeash: boolean): void;
    static equipItemIfPossible(internal: Mob, stack: ItemStack): ItemStack;
    static getAmbientSoundInterval(internal: Mob): number;
    static getHeadRotSpeed(internal: Mob): number;
    static getLeashHolder(internal: Mob): Entity;
    static getMaxHeadXRot(internal: Mob): number;
    static getMaxHeadYRot(internal: Mob): number;
    static getMaxSpawnClusterSize(internal: Mob): number;
    static getRestrictCenter(internal: Mob): BlockPos;
    static getRestrictRadius(internal: Mob): number;
    static hasRestriction(internal: Mob): boolean;
    static isAggressive(internal: Mob): boolean;
    static isLeashed(internal: Mob): boolean;
    static isLeftHanded(internal: Mob): boolean;
    static isMaxGroupSizeReached(internal: Mob, size: number): boolean;
    static isNoAi(internal: Mob): boolean;
    static isPersistenceRequired(internal: Mob): boolean;
    static isWithinMeleeAttackRange(internal: Mob, entity: LivingEntity): boolean;
    static isWithinRestriction(internal: Mob): boolean;
    static isWithinRestriction(internal: Mob, position: BlockPos): boolean;
    static lookAt(internal: Mob, entity: Entity, maxXRotIncrease: number, maxYRotIncrease: number): void;
    static playAmbientSound(internal: Mob): void;
    static restrictTo(internal: Mob, restrictCenter: BlockPos, restrictRadius: number): void;
    static setAggressive(internal: Mob, value: boolean): void;
    static setBaby(internal: Mob, value: boolean): void;
    static setCanPickUpLoot(internal: Mob, value: boolean): void;
    static setDropChance(internal: Mob, slot: EquipmentSlot, chance: number): void;
    static setGuaranteedDrop(internal: Mob, slot: EquipmentSlot): void;
    static setLeashedTo(internal: Mob, leashHolder: Entity, broadcastPacket: boolean): void;
    static setLeftHanded(internal: Mob, value: boolean): void;
    static setNoAi(internal: Mob, value: boolean): void;
    static setPersistenceRequired(internal: Mob): void;
    static setTarget(internal: Mob, target: LivingEntity): void;
    static wantsToPickUp(internal: Mob, stack: ItemStack): boolean;
  }


  class ExpandPathfinderMob {
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.player' {
  import { Abilities, Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack, Item, ItemCooldowns } from 'net.minecraft.world.item';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Entity, HumanoidArm } from 'net.minecraft.world.entity';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FoodData } from 'net.minecraft.world.food';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { BedSleepingProblem } from 'Player';
  import { PlayerAdvancements } from 'net.minecraft.server';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ExpandAbilities {
    static getFlyingSpeed(internal: Abilities): number;
    static getWalkingSpeed(internal: Abilities): number;
    static setFlyingSpeed(internal: Abilities, param0: number): void;
    static setWalkingSpeed(internal: Abilities, param0: number): void;
  }


  class ExpandInventory {
    static add(internal: Inventory, stack: ItemStack): boolean;
    static add(internal: Inventory, index: number, stack: ItemStack): boolean;
    static contains(internal: Inventory, stack: ItemStack): boolean;
    static contains(internal: Inventory, tag: KnownTag<Item>): boolean;
    static dropAll(internal: Inventory): void;
    static findSlotMatchingItem(internal: Inventory, stack: ItemStack): number;
    static findSlotMatchingUnusedItem(internal: Inventory, stack: ItemStack): number;
    static getArmor(internal: Inventory, armorIndex: number): ItemStack;
    static getFreeSlot(internal: Inventory): number;
    static getSelected(internal: Inventory): ItemStack;
    static getSlotWithRemainingSpace(internal: Inventory, stack: ItemStack): number;
    static getSuitableHotbarSlot(internal: Inventory): number;
    static getTimesChanged(internal: Inventory): number;
    static pickSlot(internal: Inventory, index: number): void;
    static removeItem(internal: Inventory, stack: ItemStack): void;
    static setPickedItem(internal: Inventory, stack: ItemStack): void;
  }


  class ExpandPlayer {
    static addItem(internal: Player, stack: ItemStack): boolean;
    static attack(internal: Player, entity: Entity): void;
    static awardStat(internal: Player, stat: ResourceLocation): void;
    static awardStat(internal: Player, stat: ResourceLocation, amount: number): void;
    static canEat(internal: Player, ignoreHunger: boolean): boolean;
    static canHarmPlayer(internal: Player, player: Player): boolean;
    static canUseGameMasterBlocks(internal: Player): boolean;
    static causeFoodExhaustion(internal: Player, exhaustion: number): void;
    static crit(internal: Player, entity: Entity): void;
    static disableShield(internal: Player): void;
    static displayClientMessage(internal: Player, component: Component, actionBar: boolean): void;
    static drop(internal: Player, stack: ItemStack, traceItem: boolean): ItemEntity;
    static getAbilities(internal: Player): Abilities;
    static getCooldowns(internal: Player): ItemCooldowns;
    static getCurrentItemAttackStrengthDelay(internal: Player): number;
    static getDestroySpeed(internal: Player, state: BlockState): number;
    static getEnchantmentSeed(internal: Player): number;
    static getExperienceLevel(internal: Player): number;
    static getFoodData(internal: Player): FoodData;
    static getInventory(internal: Player): Inventory;
    static getLuck(internal: Player): number;
    static getMainArm(internal: Player): HumanoidArm;
    static getScore(internal: Player): number;
    static getShoulderEntityLeft(internal: Player): MapData;
    static getShoulderEntityRight(internal: Player): MapData;
    static getSleepTimer(internal: Player): number;
    static getXpNeededForNextLevel(internal: Player): number;
    static give(internal: Player, stack: IItemStack, slot: number): void;
    static giveExperienceLevels(internal: Player, levels: number): void;
    static giveExperiencePoints(internal: Player, amount: number): void;
    static hasCorrectToolForDrops(internal: Player, state: BlockState): boolean;
    static increaseScore(internal: Player, score: number): void;
    static isCreative(internal: Player): boolean;
    static isFakePlayer(internal: Player): boolean;
    static isHurt(internal: Player): boolean;
    static isLocalPlayer(internal: Player): boolean;
    static isReducedDebugInfo(internal: Player): boolean;
    static isScoping(internal: Player): boolean;
    static isSecondaryUseActive(internal: Player): boolean;
    static isSleepingLongEnough(internal: Player): boolean;
    static jumpFromGround(internal: Player): void;
    static magicCrit(internal: Player, entity: Entity): void;
    static mayBuild(internal: Player): boolean;
    static playNotifySound(internal: Player, event: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
    static respawn(internal: Player): void;
    static sendMessage(internal: Player, text: Component): void;
    static setEntityOnShoulder(internal: Player, entityData: MapData): boolean;
    static setExperienceLevel(internal: Player, level: number): void;
    static setMainArm(internal: Player, arm: HumanoidArm): void;
    static setReducedDebugInfo(internal: Player, reducedDebugInfo: boolean): void;
    static setScore(internal: Player, score: number): void;
    static stopSleeping(internal: Player): void;
    static sweepAttack(internal: Player): void;
  }


  class ExpandPlayerBedSleepingProblem {
    static getMessage(internal: BedSleepingProblem): Component;
  }


  class ExpandServerPlayer {
    static getAdvancements(internal: ServerPlayer): PlayerAdvancements;
    static getPersistentData(internal: ServerPlayer): MapData;
    static updatePersistentData(internal: ServerPlayer, data: MapData): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.projectile.arrow' {
  import { AbstractArrow, AbstractHurtingProjectile } from 'net.minecraft.world.entity.projectile';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandAbstractArrow {
    static getBaseDamage(internal: AbstractArrow): number;
    static getPierceLevel(internal: AbstractArrow): number;
    static getWeaponItem(internal: AbstractArrow): IItemStack;
    static isCritArrow(internal: AbstractArrow): boolean;
    static isNoPhysics(internal: AbstractArrow): boolean;
    static setBaseDamage(internal: AbstractArrow, damage: number): void;
    static setCritArrow(internal: AbstractArrow, crit: boolean): void;
    static setNoPhysics(internal: AbstractArrow, noPhysics: boolean): void;
    static setSoundEvent(internal: AbstractArrow, event: SoundEvent): void;
  }


  class ExpandAbstractHurtingProjectile {
    static getAccelerationPower(internal: AbstractHurtingProjectile): number;
    static setAccelerationPower(internal: AbstractHurtingProjectile, accelerationPower: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.projectile' {
  import { FireworkRocketEntity, ItemSupplier, Projectile, ThrowableItemProjectile, WitherSkull } from 'net.minecraft.world.entity.projectile';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Entity } from 'net.minecraft.world.entity';

  class ExpandFireworkRocketEntity {
    static isShotAtAngle(internal: FireworkRocketEntity): boolean;
  }


  class ExpandFishingHook {
  }


  class ExpandItemSupplier {
    static getItem(internal: ItemSupplier): ItemStack;
  }


  class ExpandProjectile {
    static getEffectSource(internal: Projectile): Entity;
    static getOwner(internal: Projectile): Entity;
    static setOwner(internal: Projectile, entity: Entity): void;
    static shoot(internal: Projectile, x: number, y: number, z: number, velocity: number, innacuracy: number): void;
    static shootFromRotation(internal: Projectile, projectile: Entity, x: number, y: number, z: number, velocity: number, innacuracy: number): void;
  }


  class ExpandThrowableItemProjectile {
    static setItem(internal: ThrowableItemProjectile, stack: ItemStack): void;
  }


  class ExpandThrowableProjectile {
  }


  class ExpandThrownEnderpearl {
  }


  class ExpandWitherSkull {
    static isDangerous(internal: WitherSkull): boolean;
    static setDangerous(internal: WitherSkull, dangerous: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.projectile.fireball' {
  import { Fireball } from 'net.minecraft.world.entity.projectile';
  import { ItemStack } from 'net.minecraft.world.item';

  class ExpandFireball {
    static setItem(internal: Fireball, stack: ItemStack): void;
  }


  class ExpandLargeFireball {
  }


  class ExpandSmallFireball {
  }

}

declare module 'com.blamejared.crafttweaker.natives.entity.type.villager' {
  import { AbstractVillager } from 'net.minecraft.world.entity.npc';
  import { Merchant, MerchantOffers, MerchantOffer } from 'net.minecraft.world.item.trading';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Component } from 'net.minecraft.network.chat';

  class ExpandAbstractVillager {
    static getUnhappyCounter(internal: AbstractVillager): number;
    static isTrading(internal: AbstractVillager): boolean;
    static playCelebrateSound(internal: AbstractVillager): void;
    static setUnhappyCounter(internal: AbstractVillager, unhappyCounter: number): void;
  }


  class ExpandMerchant {
    static canRestock(internal: Merchant): boolean;
    static getNotifyTradeSound(internal: Merchant): SoundEvent;
    static getOffers(internal: Merchant): MerchantOffers;
    static getTradingPlayer(internal: Merchant): Player;
    static getVillagerXp(internal: Merchant): number;
    static isClientSide(internal: Merchant): boolean;
    static notifyTrade(internal: Merchant, offer: MerchantOffer): void;
    static notifyTradeUpdated(internal: Merchant, stack: ItemStack): void;
    static openTradingScreen(internal: Merchant, player: Player, displayName: Component, level: number): void;
    static setTradingPlayer(internal: Merchant, player: Player): void;
    static showProgressBar(internal: Merchant): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.anvil' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { AnvilRepairEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { AnvilUpdateEvent } from 'net.neoforged.neoforge.event';
  import { Player } from 'net.minecraft.world.entity.player';

  class ExpandAnvilRepairEvent {
    static readonly BUS: IEventBus;
    static getBreakChance(internal: AnvilRepairEvent): number;
    static getLeft(internal: AnvilRepairEvent): IItemStack;
    static getOutput(internal: AnvilRepairEvent): IItemStack;
    static getRight(internal: AnvilRepairEvent): IItemStack;
    static setBreakChance(internal: AnvilRepairEvent, breakChance: number): void;
  }


  class ExpandAnvilUpdateEvent {
    static readonly BUS: IEventBus;
    static getCost(internal: AnvilUpdateEvent): number;
    static getLeft(internal: AnvilUpdateEvent): IItemStack;
    static getMaterialCost(internal: AnvilUpdateEvent): number;
    static getName(internal: AnvilUpdateEvent): string;
    static getOutput(internal: AnvilUpdateEvent): IItemStack;
    static getPlayer(internal: AnvilUpdateEvent): Player;
    static getRight(internal: AnvilUpdateEvent): IItemStack;
    static setCost(internal: AnvilUpdateEvent, cost: number): void;
    static setMaterialCost(internal: AnvilUpdateEvent, materialCost: number): void;
    static setOutput(internal: AnvilUpdateEvent, output: IItemStack): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block.crop' {
  class ExpandCropGrowEvent {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block.crop.ExpandCropGrowEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Post } from 'CropGrowEvent';

  class ExpandCropGrowPostEvent {
    static readonly BUS: IEventBus;
    static getOriginalState(internal: Post): BlockState;
  }


  class ExpandCropGrowPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BreakEvent, BlockToolModificationEvent, EntityPlaceEvent, FarmlandTrampleEvent, NeighborNotifyEvent } from 'BlockEvent';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { BlockEvent } from 'net.neoforged.neoforge.event.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Entity } from 'net.minecraft.world.entity';
  import { Set } from 'java.util';

  class ExpandBlockBreakEvent {
    static readonly BUS: IEventBus;
    static getPlayer(internal: BreakEvent): Player;
  }


  class ExpandBlockEvent {
    static getLevel(internal: BlockEvent): LevelAccessor;
    static getPos(internal: BlockEvent): BlockPos;
    static getState(internal: BlockEvent): BlockState;
  }


  class ExpandBlockToolModificationEvent {
    static readonly BUS: IEventBus;
    static getContext(internal: BlockToolModificationEvent): UseOnContext;
    static getFinalState(internal: BlockToolModificationEvent): BlockState;
    static getHeldItemStack(internal: BlockToolModificationEvent): IItemStack;
    static getItemAbility(internal: BlockToolModificationEvent): ItemAbility;
    static getPlayer(internal: BlockToolModificationEvent): Player;
    static isSimulated(internal: BlockToolModificationEvent): boolean;
    static setFinalState(internal: BlockToolModificationEvent, state: BlockState): void;
  }


  class ExpandEntityPlaceBlockEvent {
    static readonly BUS: IEventBus;
    static getEntity(internal: EntityPlaceEvent): Entity;
    static getPlacedAgainst(internal: EntityPlaceEvent): BlockState;
    static getPlacedBlock(internal: EntityPlaceEvent): BlockState;
  }


  class ExpandFarmlandTrampleEvent {
    static readonly BUS: IEventBus;
    static getEntity(internal: FarmlandTrampleEvent): Entity;
    static getFallDistance(internal: FarmlandTrampleEvent): number;
  }


  class ExpandNeighborBlockNotifyEvent {
    static readonly BUS: IEventBus;
    static getForceRedstoneUpdate(internal: NeighborNotifyEvent): boolean;
    static getNotifiedSides(internal: NeighborNotifyEvent): Set<Direction>;
  }


  class ExpandPortalSpawnEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block.fluid' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Level } from 'net.minecraft.world.level';
  import { CreateFluidSourceEvent } from 'net.neoforged.neoforge.event.level.block';
  import { BlockPos } from 'net.minecraft.core';
  import { FluidPlaceBlockEvent } from 'BlockEvent';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class ExpandCreateFluidSourceEvent {
    static readonly BUS: IEventBus;
    static getLevel(internal: CreateFluidSourceEvent): Level;
    static getPos(internal: CreateFluidSourceEvent): BlockPos;
  }


  class ExpandFluidPlaceBlockEvent {
    static readonly BUS: IEventBus;
    static getLiquidPos(internal: FluidPlaceBlockEvent): BlockPos;
    static getNewState(internal: FluidPlaceBlockEvent): BlockState;
    static getOriginalState(internal: FluidPlaceBlockEvent): BlockState;
    static setNewState(internal: FluidPlaceBlockEvent, state: BlockState): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block.piston' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockEvent, PistonEvent } from 'net.neoforged.neoforge.event.level';
  import { Direction, BlockPos } from 'net.minecraft.core';
  import { PistonMoveType } from 'PistonEvent';
  import { PistonStructureResolver } from 'net.minecraft.world.level.block.piston';

  class ExpandPistonEvent {
    static getDirection(internal: PistonEvent): Direction;
    static getFaceOffsetPos(internal: PistonEvent): BlockPos;
    static getLevel(internal: BlockEvent): Level;
    static getPistonMoveType(internal: PistonEvent): PistonMoveType;
    static getStructureHelper(internal: PistonEvent): PistonStructureResolver;
  }


  class ExpandPistonEventMoveType {
    static isExtend(internal: PistonMoveType): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.block.piston.ExpandPistonEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandPistonEventPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandPistonEventPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.brewing' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { PlayerBrewedPotionEvent, PotionBrewEvent } from 'net.neoforged.neoforge.event.brewing';

  class ExpandPlayerBrewedPotionEvent {
    static readonly BUS: IEventBus;
    static getStack(internal: PlayerBrewedPotionEvent): IItemStack;
  }


  class ExpandPotionBrewEvent {
    static getItem(internal: PotionBrewEvent, index: number): IItemStack;
    static getLength(internal: PotionBrewEvent): number;
    static setItem(internal: PotionBrewEvent, index: number, stack: IItemStack): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.brewing.ExpandPotionBrewEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandPotionBrewPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandPotionBrewPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.enchantment' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Level } from 'net.minecraft.world.level';
  import { EnchantmentLevelSetEvent } from 'net.neoforged.neoforge.event.enchanting';
  import { BlockPos } from 'net.minecraft.core';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandEnchantmentLevelSetEvent {
    static readonly BUS: IEventBus;
    static getEnchantLevel(internal: EnchantmentLevelSetEvent): number;
    static getEnchantRow(internal: EnchantmentLevelSetEvent): number;
    static getItem(internal: EnchantmentLevelSetEvent): IItemStack;
    static getLevel(internal: EnchantmentLevelSetEvent): Level;
    static getOriginalLevel(internal: EnchantmentLevelSetEvent): number;
    static getPos(internal: EnchantmentLevelSetEvent): BlockPos;
    static getPower(internal: EnchantmentLevelSetEvent): number;
    static setEnchantLevel(internal: EnchantmentLevelSetEvent, level: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.advancement' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { AdvancementHolder, AdvancementProgress } from 'net.minecraft.advancements';
  import { AdvancementEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { AdvancementProgressEvent } from 'AdvancementEvent';
  import { ProgressType } from 'AdvancementEvent.AdvancementProgressEvent';

  class ExpandAdvancementEarnEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandAdvancementEvent {
    static readonly BUS: IEventBus;
    static getAdvancement(internal: AdvancementEvent): AdvancementHolder;
  }


  class ExpandAdvancementProgressEvent {
    static readonly BUS: IEventBus;
    static getAdvancementProgress(internal: AdvancementProgressEvent): AdvancementProgress;
    static getCriterionName(internal: AdvancementProgressEvent): string;
    static getProgressType(internal: AdvancementProgressEvent): ProgressType;
  }


  class ExpandAdvancementProgressEventType {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.arrow' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ArrowLooseEvent, ArrowNockEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Level } from 'net.minecraft.world.level';
  import { InteractionHand, InteractionResultHolder } from 'net.minecraft.world';

  class ExpandArrowLooseEvent {
    static readonly BUS: IEventBus;
    static getBow(internal: ArrowLooseEvent): IItemStack;
    static getCharge(internal: ArrowLooseEvent): number;
    static getLevel(internal: ArrowLooseEvent): Level;
    static hasAmmo(internal: ArrowLooseEvent): boolean;
    static setCharge(internal: ArrowLooseEvent, charge: number): void;
  }


  class ExpandArrowNockEvent {
    static readonly BUS: IEventBus;
    static getAction(internal: ArrowNockEvent): InteractionResultHolder<IItemStack>;
    static getBow(internal: ArrowNockEvent): IItemStack;
    static getHand(internal: ArrowNockEvent): InteractionHand;
    static getLevel(internal: ArrowNockEvent): Level;
    static hasAmmo(internal: ArrowNockEvent): boolean;
    static setAction(internal: ArrowNockEvent, action: InteractionResultHolder<IItemStack>): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.conversion' {
  class ExpandLivingConversionEvent {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.conversion.ExpandLivingConversionEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { LivingEntity, EntityType, Entity } from 'net.minecraft.world.entity';
  import { Post, Pre } from 'LivingConversionEvent';

  class ExpandLivingConversionPostEvent {
    static readonly BUS: IEventBus;
    static getOutcome(internal: Post): LivingEntity;
  }


  class ExpandLivingConversionPreEvent {
    static readonly BUS: IEventBus;
    static getOutcome(internal: Pre): EntityType<Entity>;
    static setConversionTimer(internal: Pre, ticks: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity' {
  import { Entity, LightningBolt } from 'net.minecraft.world.entity';
  import { EntityEvent, EntityJoinLevelEvent, EntityLeaveLevelEvent, EntityMountEvent, EntityStruckByLightningEvent, EntityTravelToDimensionEvent, ProjectileImpactEvent } from 'net.neoforged.neoforge.event.entity';
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Level } from 'net.minecraft.world.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { HitResult } from 'net.minecraft.world.phys';
  import { Projectile } from 'net.minecraft.world.entity.projectile';

  class ExpandEntityEvent {
    static getEntity(internal: EntityEvent): Entity;
  }


  class ExpandEntityJoinLevelEvent {
    static readonly BUS: IEventBus;
    static getLevel(internal: EntityJoinLevelEvent): Level;
    static loadedFromDisk(internal: EntityJoinLevelEvent): boolean;
  }


  class ExpandEntityLeaveLevelEvent {
    static readonly BUS: IEventBus;
    static getLevel(internal: EntityLeaveLevelEvent): Level;
  }


  class ExpandEntityMobGriefingEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandEntityMountEvent {
    static readonly BUS: IEventBus;
    static getEntityBeingMounted(internal: EntityMountEvent): Entity;
    static getEntityMounting(internal: EntityMountEvent): Entity;
    static getLevel(internal: EntityMountEvent): Level;
    static isDismounting(internal: EntityMountEvent): boolean;
    static isMounting(internal: EntityMountEvent): boolean;
  }


  class ExpandEntityStruckByLightningEvent {
    static readonly BUS: IEventBus;
    static getLightning(internal: EntityStruckByLightningEvent): LightningBolt;
  }


  class ExpandEntityTravelToDimensionEvent {
    static readonly BUS: IEventBus;
    static getDimension(internal: EntityTravelToDimensionEvent): ResourceLocation;
  }


  class ExpandProjectileImpactEvent {
    static readonly BUS: IEventBus;
    static getHitResult(internal: ProjectileImpactEvent): HitResult;
    static getProjectile(internal: ProjectileImpactEvent): Projectile;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living.effect' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';
  import { Added, Remove } from 'MobEffectEvent';
  import { Entity } from 'net.minecraft.world.entity';
  import { MobEffectEvent } from 'net.neoforged.neoforge.event.entity.living';

  class ExpandMobEffectAddedEvent {
    static readonly BUS: IEventBus;
    static getEffectInstance(internal: Added): MobEffectInstance;
    static getEffectSource(internal: Added): Entity;
    static getOldEffectInstance(internal: Added): MobEffectInstance;
  }


  class ExpandMobEffectApplicableEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandMobEffectEvent {
    static getEffectInstance(internal: MobEffectEvent): MobEffectInstance;
  }


  class ExpandMobEffectExpiredEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandMobEffectRemoveEvent {
    static readonly BUS: IEventBus;
    static getEffect(internal: Remove): MobEffect;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Animal } from 'net.minecraft.world.entity.animal';
  import { AnimalTameEvent, BabyEntitySpawnEvent, LivingDeathEvent, LivingDestroyBlockEvent, LivingDropsEvent, LivingEquipmentChangeEvent, LivingEvent, LivingFallEvent, LivingHealEvent, LivingIncomingDamageEvent, LivingKnockBackEvent, LivingUseTotemEvent, LivingShieldBlockEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Mob, AgeableMob, EquipmentSlot, LivingEntity } from 'net.minecraft.world.entity';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockPos } from 'net.minecraft.core';
  import { List } from 'java.util';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Reduction } from 'DamageContainer';
  import { IReductionFunction, DamageContainer } from 'net.neoforged.neoforge.common.damagesource';
  import { InteractionHand } from 'net.minecraft.world';

  class ExpandAnimalTameEvent {
    static readonly BUS: IEventBus;
    static getEntity(internal: AnimalTameEvent): Animal;
    static getTamer(internal: AnimalTameEvent): Player;
  }


  class ExpandBabyEntitySpawnEvent {
    static readonly BUS: IEventBus;
    static getCausedByPlayer(internal: BabyEntitySpawnEvent): Player;
    static getChild(internal: BabyEntitySpawnEvent): AgeableMob;
    static getParentA(internal: BabyEntitySpawnEvent): Mob;
    static getParentB(internal: BabyEntitySpawnEvent): Mob;
    static setChild(internal: BabyEntitySpawnEvent, proposedChild: AgeableMob): void;
  }


  class ExpandLivingDamageEvent {
  }


  class ExpandLivingDeathEvent {
    static readonly BUS: IEventBus;
    static getSource(internal: LivingDeathEvent): DamageSource;
  }


  class ExpandLivingDestroyBlockEvent {
    static readonly BUS: IEventBus;
    static getPos(internal: LivingDestroyBlockEvent): BlockPos;
    static getState(internal: LivingDestroyBlockEvent): BlockState;
  }


  class ExpandLivingDropsEvent {
    static readonly BUS: IEventBus;
    static addDrop(internal: LivingDropsEvent, stack: IItemStack): void;
    static getDrops(internal: LivingDropsEvent): IItemStack[];
    static getSource(internal: LivingDropsEvent): DamageSource;
    static isRecentlyHit(internal: LivingDropsEvent): boolean;
    static removeDrop(internal: LivingDropsEvent, ingredient: IIngredient): void;
    static setDrops(internal: LivingDropsEvent, drops: IItemStack[]): void;
  }


  class ExpandLivingEquipmentChangeEvent {
    static readonly BUS: IEventBus;
    static getFrom(internal: LivingEquipmentChangeEvent): IItemStack;
    static getSlot(internal: LivingEquipmentChangeEvent): EquipmentSlot;
    static getTo(internal: LivingEquipmentChangeEvent): IItemStack;
  }


  class ExpandLivingEvent {
    static getEntity(internal: LivingEvent): LivingEntity;
  }


  class ExpandLivingFallEvent {
    static readonly BUS: IEventBus;
    static getDamageMultiplier(internal: LivingFallEvent): number;
    static getDistance(internal: LivingFallEvent): number;
    static setDamageMultiplier(internal: LivingFallEvent, damageMultiplier: number): void;
    static setDistance(internal: LivingFallEvent, distance: number): void;
  }


  class ExpandLivingHealEvent {
    static readonly BUS: IEventBus;
    static getAmount(internal: LivingHealEvent): number;
    static setAmount(internal: LivingHealEvent, amount: number): void;
  }


  class ExpandLivingIncomingDamageEvent {
    static readonly BUS: IEventBus;
    static addReductionModifier(internal: LivingIncomingDamageEvent, type: Reduction, reductionFunc: IReductionFunction): void;
    static getAmount(internal: LivingIncomingDamageEvent): number;
    static getContainer(internal: LivingIncomingDamageEvent): DamageContainer;
    static getOriginalAmount(internal: LivingIncomingDamageEvent): number;
    static getSource(internal: LivingIncomingDamageEvent): DamageSource;
    static setAmount(internal: LivingIncomingDamageEvent, newDamage: number): void;
    static setInvulnerabilityTicks(internal: LivingIncomingDamageEvent, ticks: number): void;
  }


  class ExpandLivingJumpEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandLivingKnockBackEvent {
    static readonly BUS: IEventBus;
    static getOriginalRatioX(internal: LivingKnockBackEvent): number;
    static getOriginalRatioZ(internal: LivingKnockBackEvent): number;
    static getOriginalStrength(internal: LivingKnockBackEvent): number;
    static getRatioX(internal: LivingKnockBackEvent): number;
    static getRatioZ(internal: LivingKnockBackEvent): number;
    static getStrength(internal: LivingKnockBackEvent): number;
    static setRatioX(internal: LivingKnockBackEvent, ratioX: number): void;
    static setRatioZ(internal: LivingKnockBackEvent, ratioZ: number): void;
    static setStrength(internal: LivingKnockBackEvent, strength: number): void;
  }


  class ExpandLivingUseTotemEvent {
    static readonly BUS: IEventBus;
    static getHoldingHand(internal: LivingUseTotemEvent): InteractionHand;
    static getSource(internal: LivingUseTotemEvent): DamageSource;
    static getTotem(internal: LivingUseTotemEvent): IItemStack;
  }


  class ExpandShieldBlockEvent {
    static readonly BUS: IEventBus;
    static getBlocked(internal: LivingShieldBlockEvent): boolean;
    static getBlockedDamage(internal: LivingShieldBlockEvent): number;
    static getDamageContainer(internal: LivingShieldBlockEvent): DamageContainer;
    static getDamageSource(internal: LivingShieldBlockEvent): DamageSource;
    static getOriginalBlock(internal: LivingShieldBlockEvent): boolean;
    static getOriginalBlockedDamage(internal: LivingShieldBlockEvent): number;
    static setBlocked(internal: LivingShieldBlockEvent, isBlocked: boolean): void;
    static setBlockedDamage(internal: LivingShieldBlockEvent, blocked: number): void;
    static setShieldDamage(internal: LivingShieldBlockEvent, damage: number): void;
    static shieldDamage(internal: LivingShieldBlockEvent): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living.ExpandLivingDamageEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Post, Pre } from 'LivingDamageEvent';
  import { Reduction } from 'DamageContainer';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { DamageContainer } from 'net.neoforged.neoforge.common.damagesource';

  class ExpandLivingPostDamageEvent {
    static readonly BUS: IEventBus;
    static getBlockedDamage(internal: Post): number;
    static getNewDamage(internal: Post): number;
    static getOriginalDamage(internal: Post): number;
    static getPostAttackInvulnerabilityTicks(internal: Post): number;
    static getReduction(internal: Post, reduction: Reduction): number;
    static getShieldDamage(internal: Post): number;
    static getSource(internal: Post): DamageSource;
  }


  class ExpandLivingPreDamageEvent {
    static readonly BUS: IEventBus;
    static getContainer(internal: Pre): DamageContainer;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living.spawn' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { DifficultyInstance } from 'net.minecraft.world';
  import { FinalizeSpawnEvent, MobDespawnEvent, MobSpawnEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { MobSpawnType, Entity, Mob } from 'net.minecraft.world.entity';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Result } from 'MobDespawnEvent';
  import { ServerLevelAccessor } from 'net.minecraft.world.level';

  class ExpandFinalizeSpawnEvent {
    static readonly BUS: IEventBus;
    static getBlockEntitySpawner(internal: FinalizeSpawnEvent): BlockEntity;
    static getDifficulty(internal: FinalizeSpawnEvent): DifficultyInstance;
    static getEntitySpawner(internal: FinalizeSpawnEvent): Entity;
    static getSpawnType(internal: FinalizeSpawnEvent): MobSpawnType;
    static isSpawnCancelled(internal: FinalizeSpawnEvent): boolean;
    static setDifficulty(internal: FinalizeSpawnEvent, inst: DifficultyInstance): void;
    static setSpawnCancelled(internal: FinalizeSpawnEvent, cancel: boolean): void;
  }


  class ExpandMobDespawnEvent {
    static readonly BUS: IEventBus;
    static getResult(internal: MobDespawnEvent): Result;
    static setResult(internal: MobDespawnEvent, result: Result): void;
  }


  class ExpandMobSpawnEvent {
    static getEntity(internal: MobSpawnEvent): Mob;
    static getLevel(internal: MobSpawnEvent): ServerLevelAccessor;
    static getX(internal: MobSpawnEvent): number;
    static getY(internal: MobSpawnEvent): number;
    static getZ(internal: MobSpawnEvent): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living.spawn.ExpandMobDespawnEvent' {
  class ExpandMobAllowDespawnEventResult {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.living.target' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { LivingChangeTargetEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { ILivingTargetType } from 'LivingChangeTargetEvent';

  class ExpandILivingTargetType {
  }


  class ExpandLivingChangeTargetEvent {
    static readonly BUS: IEventBus;
    static getNewAboutToBeSetTarget(internal: LivingChangeTargetEvent): LivingEntity;
    static getOriginalAboutToBeSetTarget(internal: LivingChangeTargetEvent): LivingEntity;
    static getTargetType(internal: LivingChangeTargetEvent): ILivingTargetType;
    static setNewAboutToBeSetTarget(internal: LivingChangeTargetEvent, newTarget: LivingEntity): void;
  }


  class ExpandLivingTargetType {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.player' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Entity } from 'net.minecraft.world.entity';
  import { AttackEntityEvent, BonemealEvent, CriticalHitEvent, PlayerEvent, PlayerFlyableFallEvent, PlayerSetSpawnEvent, CanPlayerSleepEvent, PlayerWakeUpEvent, CanContinueSleepingEvent, TradeWithVillagerEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { Level, GameType } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { BreakSpeed, PlayerChangedDimensionEvent, PlayerChangeGameModeEvent, Clone, HarvestCheck, NameFormat, PlayerRespawnEvent, TabListNameFormat } from 'PlayerEvent';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { BedSleepingProblem } from 'Player';
  import { MerchantOffer } from 'net.minecraft.world.item.trading';
  import { AbstractVillager } from 'net.minecraft.world.entity.npc';

  class ExpandAttackEntityEvent {
    static readonly BUS: IEventBus;
    static getTarget(internal: AttackEntityEvent): Entity;
  }


  class ExpandBonemealEvent {
    static readonly BUS: IEventBus;
    static getLevel(internal: BonemealEvent): Level;
    static getPos(internal: BonemealEvent): BlockPos;
    static getStack(internal: BonemealEvent): IItemStack;
    static getState(internal: BonemealEvent): BlockState;
  }


  class ExpandCriticalHitEvent {
    static readonly BUS: IEventBus;
    static getDamageMultiplier(internal: CriticalHitEvent): number;
    static getTarget(internal: CriticalHitEvent): Entity;
    static getVanillaMultiplier(internal: CriticalHitEvent): number;
    static isVanillaCritical(internal: CriticalHitEvent): boolean;
    static setDamageMultiplier(internal: CriticalHitEvent, mult: number): void;
  }


  class ExpandPlayerBreakSpeedEvent {
    static readonly BUS: IEventBus;
    static getNewSpeed(internal: BreakSpeed): number;
    static getOriginalSpeed(internal: BreakSpeed): number;
    static getPosition(internal: BreakSpeed): BlockPos;
    static getState(internal: BreakSpeed): BlockState;
    static setNewSpeed(internal: BreakSpeed, newSpeed: number): void;
  }


  class ExpandPlayerChangedDimensionEvent {
    static readonly BUS: IEventBus;
    static getFrom(internal: PlayerChangedDimensionEvent): ResourceLocation;
    static getTo(internal: PlayerChangedDimensionEvent): ResourceLocation;
  }


  class ExpandPlayerChangeGameModeEvent {
    static readonly BUS: IEventBus;
    static getCurrentGameMode(internal: PlayerChangeGameModeEvent): GameType;
    static getNewGameMode(internal: PlayerChangeGameModeEvent): GameType;
    static setNewGameMode(internal: PlayerChangeGameModeEvent, newGameMode: GameType): void;
  }


  class ExpandPlayerCloneEvent {
    static readonly BUS: IEventBus;
    static getOriginal(internal: Clone): Player;
    static isWasDeath(internal: Clone): boolean;
  }


  class ExpandPlayerEvent {
    static getEntity(internal: PlayerEvent): Player;
  }


  class ExpandPlayerFlyableFallEvent {
    static readonly BUS: IEventBus;
    static getDistance(internal: PlayerFlyableFallEvent): number;
    static getMultiplier(internal: PlayerFlyableFallEvent): number;
    static setDistance(internal: PlayerFlyableFallEvent, distance: number): void;
    static setMultiplier(internal: PlayerFlyableFallEvent, multiplier: number): void;
  }


  class ExpandPlayerHarvestCheckEvent {
    static readonly BUS: IEventBus;
    static canHarvest(internal: HarvestCheck): boolean;
    static getTargetBlock(internal: HarvestCheck): BlockState;
    static setCanHarvest(internal: HarvestCheck, success: boolean): void;
  }


  class ExpandPlayerLoggedInEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandPlayerLoggedOutEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandPlayerNameFormatEvent {
    static readonly BUS: IEventBus;
    static getDisplayName(internal: NameFormat): Component;
    static getUsername(internal: NameFormat): Component;
    static setDisplayName(internal: NameFormat, displayname: Component): void;
  }


  class ExpandPlayerRespawnEvent {
    static readonly BUS: IEventBus;
    static isEndConquered(internal: PlayerRespawnEvent): boolean;
  }


  class ExpandPlayerSetSpawnEvent {
    static readonly BUS: IEventBus;
    static getNewSpawn(internal: PlayerSetSpawnEvent): BlockPos;
    static getSpawnLevel(internal: PlayerSetSpawnEvent): ResourceLocation;
    static isForced(internal: PlayerSetSpawnEvent): boolean;
  }


  class ExpandPlayerSleepInBedEvent {
    static readonly BUS: IEventBus;
    static getEntity(internal: CanPlayerSleepEvent): ServerPlayer;
    static getLevel(internal: CanPlayerSleepEvent): Level;
    static getPos(internal: CanPlayerSleepEvent): BlockPos;
    static getProblem(internal: CanPlayerSleepEvent): BedSleepingProblem;
    static getState(internal: CanPlayerSleepEvent): BlockState;
    static getVanillaProblem(internal: CanPlayerSleepEvent): BedSleepingProblem;
    static setProblem(internal: CanPlayerSleepEvent, problem: BedSleepingProblem): void;
  }


  class ExpandPlayerTabListNameFormatEvent {
    static readonly BUS: IEventBus;
    static getDisplayName(internal: TabListNameFormat): Component;
    static setDisplayName(internal: TabListNameFormat, displayName: Component): void;
  }


  class ExpandPlayerWakeUpEvent {
    static readonly BUS: IEventBus;
    static updateLevel(internal: PlayerWakeUpEvent): boolean;
    static wakeImmediately(internal: PlayerWakeUpEvent): boolean;
  }


  class ExpandSleepingLocationCheckEvent {
    static readonly BUS: IEventBus;
    static getProblem(internal: CanContinueSleepingEvent): BedSleepingProblem;
    static mayContinueSleeping(internal: CanContinueSleepingEvent): boolean;
    static setContinueSleeping(internal: CanContinueSleepingEvent, sleeping: boolean): void;
  }


  class ExpandTradeWithVillagerEvent {
    static readonly BUS: IEventBus;
    static getAbstractVillager(internal: TradeWithVillagerEvent): AbstractVillager;
    static getMerchantOffer(internal: TradeWithVillagerEvent): MerchantOffer;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.teleport' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ChorusFruit, EnderEntity, EnderPearl } from 'EntityTeleportEvent';
  import { ThrownEnderpearl } from 'net.minecraft.world.entity.projectile';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { HitResult, Vec3 } from 'net.minecraft.world.phys';
  import { EntityTeleportEvent } from 'net.neoforged.neoforge.event.entity';

  class ExpandChorusFruitTeleportEvent {
    static readonly BUS: IEventBus;
    static getEntityLiving(internal: ChorusFruit): LivingEntity;
  }


  class ExpandEnderEntityTeleportEvent {
    static readonly BUS: IEventBus;
    static getEntity(internal: EnderEntity): LivingEntity;
  }


  class ExpandEnderPearlTeleportEvent {
    static readonly BUS: IEventBus;
    static getAttackDamage(internal: EnderPearl): number;
    static getHitResult(internal: EnderPearl): HitResult;
    static getPearlEntity(internal: EnderPearl): ThrownEnderpearl;
    static getPlayer(internal: EnderPearl): ServerPlayer;
    static setAttackDamage(internal: EnderPearl, attackDamage: number): void;
  }


  class ExpandEntityCommandTeleportEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandEntitySpreadPlayersCommandEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandEntityTeleportEvent {
    static getPrev(internal: EntityTeleportEvent): Vec3;
    static getPrevX(internal: EntityTeleportEvent): number;
    static getPrevY(internal: EntityTeleportEvent): number;
    static getPrevZ(internal: EntityTeleportEvent): number;
    static getTarget(internal: EntityTeleportEvent): Vec3;
    static getTargetX(internal: EntityTeleportEvent): number;
    static getTargetY(internal: EntityTeleportEvent): number;
    static getTargetZ(internal: EntityTeleportEvent): number;
    static setTargetX(internal: EntityTeleportEvent, targetX: number): void;
    static setTargetY(internal: EntityTeleportEvent, targetY: number): void;
    static setTargetZ(internal: EntityTeleportEvent, targetZ: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.entity.use' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { LivingEntityUseItemEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Finish } from 'LivingEntityUseItemEvent';

  class ExpandLivingEntityUseItemEvent {
    static getDuration(internal: LivingEntityUseItemEvent): number;
    static getItem(internal: LivingEntityUseItemEvent): IItemStack;
    static setDuration(internal: LivingEntityUseItemEvent, duration: number): void;
  }


  class ExpandLivingEntityUseItemFinishEvent {
    static readonly BUS: IEventBus;
    static getResultStack(internal: Finish): IItemStack;
    static setResultStack(internal: Finish, stack: IItemStack): void;
  }


  class ExpandLivingEntityUseItemStartEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandLivingEntityUseItemStopEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandLivingEntityUseItemTickEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { Difficulty } from 'net.minecraft.world';
  import { DifficultyChangeEvent } from 'net.neoforged.neoforge.event';
  import { Level, Explosion } from 'net.minecraft.world.level';
  import { ExplosionEvent } from 'net.neoforged.neoforge.event.level';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { FurnaceFuelBurnTimeEvent } from 'net.neoforged.neoforge.event.furnace';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { Recipe, RecipeInput } from 'net.minecraft.world.item.crafting';
  import { ICancellableEvent } from 'net.neoforged.bus.api';

  class ExpandDifficultyChangeEvent {
    static readonly BUS: IEventBus;
    static getDifficulty(internal: DifficultyChangeEvent): Difficulty;
    static getOldDifficulty(internal: DifficultyChangeEvent): Difficulty;
  }


  class ExpandEvent {
  }


  class ExpandExplosionEvent {
    static getExplosion(internal: ExplosionEvent): Explosion;
    static getLevel(internal: ExplosionEvent): Level;
  }


  class ExpandFurnaceFuelBurnTimeEvent {
    static readonly BUS: IEventBus;
    static getBurnTime(internal: FurnaceFuelBurnTimeEvent): number;
    static getItemStack(internal: FurnaceFuelBurnTimeEvent): IItemStack;
    static getRecipeType(internal: FurnaceFuelBurnTimeEvent): IRecipeManager<Recipe<RecipeInput>>;
    static setBurnTime(internal: FurnaceFuelBurnTimeEvent, burnTime: number): void;
  }


  class ExpandICancellableEvent {
    static cancel(internal: ICancellableEvent): void;
    static isCanceled(internal: ICancellableEvent): boolean;
    static setCanceled(internal: ICancellableEvent, cancel: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.ExpandExplosionEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { List } from 'java.util';
  import { BlockPos } from 'net.minecraft.core';
  import { Detonate } from 'ExplosionEvent';
  import { Entity } from 'net.minecraft.world.entity';

  class ExpandDetonateExplosionEvent {
    static readonly BUS: IEventBus;
    static getAffectedBlocks(internal: Detonate): BlockPos[];
    static getAffectedEntities(internal: Detonate): Entity[];
  }


  class ExpandStartExplosionEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.grindstone' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { GrindstoneEvent } from 'net.neoforged.neoforge.event';

  class ExpandGrindStoneEvent {
    static getBottomItem(internal: GrindstoneEvent): IItemStack;
    static getTopItem(internal: GrindstoneEvent): IItemStack;
    static getXp(internal: GrindstoneEvent): number;
    static setXp(internal: GrindstoneEvent, xp: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.grindstone.ExpandGrindStoneEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { OnTakeItem, OnPlaceItem } from 'GrindstoneEvent';

  class ExpandGrindstoneOnTakeItemEvent {
    static readonly BUS: IEventBus;
    static getNewBottomItem(internal: OnTakeItem): IItemStack;
    static getNewTopItem(internal: OnTakeItem): IItemStack;
    static getXp(internal: OnTakeItem): number;
    static setNewBottomItem(internal: OnTakeItem, newBottom: IItemStack): void;
    static setNewTopItem(internal: OnTakeItem, newTop: IItemStack): void;
  }


  class ExpandGrindstoneOnPlaceItemEvent {
    static readonly BUS: IEventBus;
    static getOutput(internal: OnPlaceItem): IItemStack;
    static setOutput(internal: OnPlaceItem, output: IItemStack): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.interact' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { LeftClickBlock, EntityInteract, EntityInteractSpecific, RightClickBlock, RightClickItem } from 'PlayerInteractEvent';
  import { TriState } from 'net.neoforged.neoforge.common.util';
  import { Action } from 'PlayerInteractEvent.LeftClickBlock';
  import { Entity } from 'net.minecraft.world.entity';
  import { InteractionResult, InteractionHand } from 'net.minecraft.world';
  import { Vec3, BlockHitResult } from 'net.minecraft.world.phys';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { PlayerInteractEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandLeftClickBlockEvent {
    static readonly BUS: IEventBus;
    static getAction(internal: LeftClickBlock): Action;
    static getUseBlock(internal: LeftClickBlock): TriState;
    static getUseItem(internal: LeftClickBlock): TriState;
    static setCanceled(internal: LeftClickBlock, canceled: boolean): void;
    static setUseBlock(internal: LeftClickBlock, triggerBlock: TriState): void;
    static setUseItem(internal: LeftClickBlock, triggerItem: TriState): void;
  }


  class ExpandLeftClickEmptyEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandPlayerEntityInteractEvent {
    static readonly BUS: IEventBus;
    static getCancellationResult(internal: EntityInteract): InteractionResult;
    static getTarget(internal: EntityInteract): Entity;
    static setCancellationResult(internal: EntityInteract, result: InteractionResult): void;
  }


  class ExpandPlayerEntityInteractSpecificEvent {
    static readonly BUS: IEventBus;
    static getCancellationResult(internal: EntityInteractSpecific): InteractionResult;
    static getLocalPos(internal: EntityInteractSpecific): Vec3;
    static getTarget(internal: EntityInteractSpecific): Entity;
    static setCancellationResult(internal: EntityInteractSpecific, result: InteractionResult): void;
  }


  class ExpandPlayerInteractEvent {
    static getBlockPos(internal: PlayerInteractEvent): BlockPos;
    static getFace(internal: PlayerInteractEvent): Direction;
    static getHand(internal: PlayerInteractEvent): InteractionHand;
    static getItemStack(internal: PlayerInteractEvent): IItemStack;
  }


  class ExpandRightClickBlockEvent {
    static readonly BUS: IEventBus;
    static getCancellationResult(internal: RightClickBlock): InteractionResult;
    static getHitVec(internal: RightClickBlock): BlockHitResult;
    static getUseBlock(internal: RightClickBlock): TriState;
    static getUseItem(internal: RightClickBlock): TriState;
    static setCanceled(internal: RightClickBlock, canceled: boolean): void;
    static setCancellationResult(internal: RightClickBlock, result: InteractionResult): void;
    static setUseBlock(internal: RightClickBlock, triggerBlock: TriState): void;
    static setUseItem(internal: RightClickBlock, triggerItem: TriState): void;
  }


  class ExpandRightClickEmptyEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandRightClickItemEvent {
    static readonly BUS: IEventBus;
    static getCancellationResult(internal: RightClickItem): InteractionResult;
    static setCancellationResult(internal: RightClickItem, result: InteractionResult): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.interact.ExpandLeftClickBlockEvent' {
  class ExpandLeftClickBlockEventAction {
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.item' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ItemCraftedEvent, ItemSmeltedEvent } from 'PlayerEvent';
  import { Container, InteractionHand } from 'net.minecraft.world';
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { ItemEntityPickupEvent, ItemFishedEvent, ItemTooltipEvent, PlayerDestroyItemEvent } from 'net.neoforged.neoforge.event.entity.player';
  import { ItemEvent, ItemExpireEvent, ItemTossEvent } from 'net.neoforged.neoforge.event.entity.item';
  import { List } from 'java.util';
  import { FishingHook } from 'net.minecraft.world.entity.projectile';
  import { TooltipFlag } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Player } from 'net.minecraft.world.entity.player';

  class ExpandItemCraftedEvent {
    static readonly BUS: IEventBus;
    static getCrafting(internal: ItemCraftedEvent): IItemStack;
    static getInventory(internal: ItemCraftedEvent): Container;
  }


  class ExpandItemEntityPickupEvent {
    static getItemEntity(internal: ItemEntityPickupEvent): ItemEntity;
  }


  class ExpandItemEvent {
    static getEntity(internal: ItemEvent): ItemEntity;
  }


  class ExpandItemExpireEvent {
    static readonly BUS: IEventBus;
    static getExtraLife(internal: ItemExpireEvent): number;
    static setExtraLife(internal: ItemExpireEvent, extraLife: number): void;
  }


  class ExpandItemFishedEvent {
    static readonly BUS: IEventBus;
    static getDrops(internal: ItemFishedEvent): IItemStack[];
    static getHookEntity(internal: ItemFishedEvent): FishingHook;
    static getRodDamage(internal: ItemFishedEvent): number;
    static setDrops(internal: ItemFishedEvent, drops: IItemStack[]): void;
    static setRodDamage(internal: ItemFishedEvent, rodDamage: number): void;
  }


  class ExpandItemSmeltedEvent {
    static readonly BUS: IEventBus;
    static getSmelting(internal: ItemSmeltedEvent): IItemStack;
  }


  class ExpandItemTooltipEvent {
    static readonly BUS: IEventBus;
    static getFlags(internal: ItemTooltipEvent): TooltipFlag;
    static getItemStack(internal: ItemTooltipEvent): IItemStack;
    static getPlayer(internal: ItemTooltipEvent): Player;
    static getToolTip(internal: ItemTooltipEvent): Component[];
  }


  class ExpandItemTossEvent {
    static readonly BUS: IEventBus;
    static getPlayer(internal: ItemTossEvent): Player;
  }


  class ExpandPlayerDestroyItemEvent {
    static readonly BUS: IEventBus;
    static getHand(internal: PlayerDestroyItemEvent): InteractionHand;
    static getOriginal(internal: PlayerDestroyItemEvent): IItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.item.ExpandItemEntityPickupEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Post, Pre } from 'ItemEntityPickupEvent';
  import { TriState } from 'net.neoforged.neoforge.common.util';

  class ExpandItemEntityPickupEventPost {
    static readonly BUS: IEventBus;
    static getCurrentStack(internal: Post): ItemStack;
    static getOriginalStack(internal: Post): ItemStack;
  }


  class ExpandItemEntityPickupEventPre {
    static readonly BUS: IEventBus;
    static canPickup(internal: Pre): TriState;
    static setCanPickup(internal: Pre, state: TriState): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.level' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { ServerLevelData } from 'net.minecraft.world.level.storage';
  import { CreateSpawnPosition } from 'LevelEvent';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { LevelEvent } from 'net.neoforged.neoforge.event.level';

  class ExpandCreateSpawnPositionEvent {
    static readonly BUS: IEventBus;
    static getSettings(internal: CreateSpawnPosition): ServerLevelData;
  }


  class ExpandLevelEvent {
    static getLevel(internal: LevelEvent): LevelAccessor;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick' {
  import { LevelTickEvent, ServerTickEvent } from 'net.neoforged.neoforge.event.tick';
  import { Level } from 'net.minecraft.world.level';
  import { MinecraftServer } from 'net.minecraft.server';

  class ExpandClientTickEvent {
  }


  class ExpandEntityTickEvent {
  }


  class ExpandLevelTickEvent {
    static getLevel(internal: LevelTickEvent): Level;
    static hasTime(internal: LevelTickEvent): boolean;
  }


  class ExpandPlayerTickEvent {
  }


  class ExpandServerTickEvent {
    static getServer(internal: ServerTickEvent): MinecraftServer;
    static hasTime(internal: ServerTickEvent): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick.ExpandClientTickEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandServerTickPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandServerTickPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick.ExpandEntityTickEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandServerTickPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandServerTickPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick.ExpandLevelTickEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandServerTickPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandServerTickPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick.ExpandPlayerTickEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandServerTickPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandServerTickPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.tick.ExpandServerTickEvent' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';

  class ExpandServerTickPostEvent {
    static readonly BUS: IEventBus;
  }


  class ExpandServerTickPreEvent {
    static readonly BUS: IEventBus;
  }

}

declare module 'com.blamejared.crafttweaker.natives.event.xp' {
  import { IEventBus } from 'com.blamejared.crafttweaker.api.event.bus';
  import { LivingExperienceDropEvent } from 'net.neoforged.neoforge.event.entity.living';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ExperienceOrb } from 'net.minecraft.world.entity';
  import { PickupXp, XpChange, LevelChange } from 'PlayerXpEvent';

  class ExpandLivingExperienceDropEvent {
    static readonly BUS: IEventBus;
    static getAttackingPlayer(internal: LivingExperienceDropEvent): Player;
    static getDroppedExperience(internal: LivingExperienceDropEvent): number;
    static getOriginalExperience(internal: LivingExperienceDropEvent): number;
    static setDroppedExperience(internal: LivingExperienceDropEvent, droppedExperience: number): void;
  }


  class ExpandPlayerPickupXpEvent {
    static readonly BUS: IEventBus;
    static getOrb(internal: PickupXp): ExperienceOrb;
  }


  class ExpandPlayerXpChangeEvent {
    static readonly BUS: IEventBus;
    static getAmount(internal: XpChange): number;
    static setAmount(internal: XpChange, amount: number): void;
  }


  class ExpandPlayerXpEvent {
  }


  class ExpandPlayerXpLevelChangeEvent {
    static readonly BUS: IEventBus;
    static getLevels(internal: LevelChange): number;
    static setLevels(internal: LevelChange, levels: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.fluid' {
  import { IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Item } from 'net.minecraft.world.item';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandFluid {
    static getBucket(internal: Fluid): Item;
    static getCommandString(internal: Fluid): string;
    static getRegistryName(internal: Fluid): ResourceLocation;
    static isIn(internal: Fluid, tag: KnownTag<Fluid>): boolean;
    static isSame(internal: Fluid, other: Fluid): boolean;
    static makeStack(internal: Fluid, amount: number): IFluidStack;
    static multiply(internal: Fluid, amount: number): IFluidStack;
  }

}

declare module 'com.blamejared.crafttweaker.natives.food' {
  import { FoodData, FoodProperties } from 'net.minecraft.world.food';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { List } from 'java.util';
  import { PossibleEffect } from 'FoodProperties';
  import { MobEffectInstance, MobEffect } from 'net.minecraft.world.effect';

  class ExpandFoodData {
    static addExhaustion(internal: FoodData, exhaustion: number): void;
    static eat(internal: FoodData, foodLevelModifier: number, saturationLevelModifier: number): void;
    static eat(internal: FoodData, foodProperties: FoodProperties): void;
    static getExhaustionLevel(internal: FoodData): number;
    static getFoodLevel(internal: FoodData): number;
    static getLastFoodLevel(internal: FoodData): number;
    static getSaturationLevel(internal: FoodData): number;
    static needsFood(internal: FoodData): boolean;
    static setExhaustion(internal: FoodData, exhaustionLevel: number): void;
    static setFoodLevel(internal: FoodData, foodLevel: number): void;
    static setSaturation(internal: FoodData, saturationLevel: number): void;
  }


  class ExpandFoodProperties {
    static canAlwaysEat(internal: FoodProperties): boolean;
    static create(nutrition: number, saturation: number, canAlwaysEat: boolean, eatSeconds: number): FoodProperties;
    static create(nutrition: number, saturation: number, canAlwaysEat: boolean, eatSeconds: number, usingConvertsTo: IItemStack): FoodProperties;
    static create(nutrition: number, saturation: number, canAlwaysEat: boolean, eatSeconds: number, usingConvertsTo: IItemStack, effects: PossibleEffect[]): FoodProperties;
    static eatSeconds(internal: FoodProperties): number;
    static getEffects(internal: FoodProperties): PossibleEffect[];
    static nutrition(internal: FoodProperties): number;
    static saturation(internal: FoodProperties): number;
    static usingConvertsTo(internal: FoodProperties): IItemStack;
    static withCanAlwaysEat(internal: FoodProperties, canAlwaysEat: boolean): FoodProperties;
    static withEatSeconds(internal: FoodProperties, eatSeconds: number): FoodProperties;
    static withEffect(internal: FoodProperties, effect: MobEffectInstance, probability: number): FoodProperties;
    static withEffect(internal: FoodProperties, effect: PossibleEffect): FoodProperties;
    static withEffects(internal: FoodProperties, effects: PossibleEffect[]): FoodProperties;
    static withNutrition(internal: FoodProperties, nutrition: number): FoodProperties;
    static withSaturation(internal: FoodProperties, saturation: number): FoodProperties;
    static withUsingConvertsTo(internal: FoodProperties, usingConvertsTo: IItemStack): FoodProperties;
    static withoutEffect(internal: FoodProperties, effect: MobEffect): FoodProperties;
    static withoutEffect(internal: FoodProperties, effect: PossibleEffect): FoodProperties;
  }

}

declare module 'com.blamejared.crafttweaker.natives.food.ExpandFoodProperties' {
  import { PossibleEffect, Builder } from 'FoodProperties';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { FoodProperties } from 'net.minecraft.world.food';

  class ExpandFoodPropertiesPossibleEffect {
    static effect(internal: PossibleEffect): MobEffectInstance;
    static of(effect: MobEffectInstance, probability: number): PossibleEffect;
    static probability(internal: PossibleEffect): number;
  }


  class ExpandFoodPropertiesBuilder {
    static alwaysEdible(internal: Builder): Builder;
    static build(internal: Builder): FoodProperties;
    static effect(internal: Builder, effect: MobEffectInstance, probability: number): Builder;
    static fast(internal: Builder): Builder;
    static nutrition(internal: Builder, nutrition: number): Builder;
    static of(): Builder;
    static saturationModifier(internal: Builder, saturationModifier: number): Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.game' {
  import { Dist } from 'net.neoforged.api.distmarker';
  import { LogicalSide } from 'net.neoforged.fml';
  import { ServerAdvancementManager, MinecraftServer } from 'net.minecraft.server';
  import { PlayerList } from 'net.minecraft.server.players';
  import { CraftTweakerSavedData } from 'com.blamejared.crafttweaker.api.level';
  import { GameType } from 'net.minecraft.world.level';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { Iterable } from 'java.lang';
  import { Difficulty } from 'net.minecraft.world';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';

  class ExpandDist {
    static isClient(internal: Dist): boolean;
    static isDedicatedServer(internal: Dist): boolean;
  }


  class ExpandLogicalSide {
    static isClient(internal: LogicalSide): boolean;
    static isServer(internal: LogicalSide): boolean;
  }


  class ExpandServer {
    static areNpcsEnabled(internal: MinecraftServer): boolean;
    static executeCommand(internal: MinecraftServer, command: string, silent: boolean): void;
    static executeCommand(internal: MinecraftServer, command: string, player: Player, silent: boolean): void;
    static getAbsoluteMaxWorldSize(internal: MinecraftServer): number;
    static getAdvancements(internal: MinecraftServer): ServerAdvancementManager;
    static getAllLevels(internal: MinecraftServer): Iterable<ServerLevel>;
    static getCurrentSmoothedTickTime(internal: MinecraftServer): number;
    static getDefaultGameType(internal: MinecraftServer): GameType;
    static getForcedGameType(internal: MinecraftServer): GameType;
    static getLevel(internal: MinecraftServer, location: ResourceLocation): ServerLevel;
    static getMaxPlayers(internal: MinecraftServer): number;
    static getModdedStatus(internal: MinecraftServer): string;
    static getMotd(internal: MinecraftServer): string;
    static getOperatorUserPermissionLevel(internal: MinecraftServer): number;
    static getOverworldData(internal: MinecraftServer): CraftTweakerSavedData;
    static getPlayerCount(internal: MinecraftServer): number;
    static getPlayerList(internal: MinecraftServer): PlayerList;
    static getPlayerNames(internal: MinecraftServer): string[];
    static getServerModName(internal: MinecraftServer): string;
    static getServerVersion(internal: MinecraftServer): string;
    static getSpawnProtectionRadius(internal: MinecraftServer): number;
    static getSpawnRadius(internal: MinecraftServer, level: ServerLevel): number;
    static getTickCount(internal: MinecraftServer): number;
    static isCommandBlockEnabled(internal: MinecraftServer): boolean;
    static isDedicatedServer(internal: MinecraftServer): boolean;
    static isEnforceWhitelist(internal: MinecraftServer): boolean;
    static isFlightAllowed(internal: MinecraftServer): boolean;
    static isHardcore(internal: MinecraftServer): boolean;
    static isPvpAllowed(internal: MinecraftServer): boolean;
    static isReady(internal: MinecraftServer): boolean;
    static isRunning(internal: MinecraftServer): boolean;
    static isShutdown(internal: MinecraftServer): boolean;
    static isSingleplayer(internal: MinecraftServer): boolean;
    static isSpawningAnimals(internal: MinecraftServer): boolean;
    static isSpawningMonsters(internal: MinecraftServer): boolean;
    static isStopped(internal: MinecraftServer): boolean;
    static isUnderSpawnProtection(internal: MinecraftServer, level: ServerLevel, pos: BlockPos, player: Player): boolean;
    static levelKeys(internal: MinecraftServer): ResourceLocation[];
    static overworld(internal: MinecraftServer): ServerLevel;
    static setDefaultGameType(internal: MinecraftServer, gameType: GameType): void;
    static setDifficulty(internal: MinecraftServer, difficulty: Difficulty, force: boolean): void;
    static setDifficultyLocked(internal: MinecraftServer, locked: boolean): void;
    static setEnforceWhitelist(internal: MinecraftServer, enforceWhitelist: boolean): void;
    static setFlightAllowed(internal: MinecraftServer, flightAllowed: boolean): void;
    static setMotd(internal: MinecraftServer, motd: string): void;
    static setPvpAllowed(internal: MinecraftServer, pvpAllowed: boolean): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.ingredient' {
  import { FluidIngredient, SizedFluidIngredient } from 'net.neoforged.neoforge.fluids.crafting';
  import { CTFluidIngredient, IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { SizedIngredient } from 'net.neoforged.neoforge.common.crafting';
  import { IIngredientWithAmount, IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Item } from 'net.minecraft.world.item';
  import { ItemLike } from 'net.minecraft.world.level';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandCTFluidIngredientNeoForge {
    static asFluidIngredient(internal: CTFluidIngredient): FluidIngredient;
    static asSizedFluidIngredient(internal: CTFluidIngredient): SizedFluidIngredient;
  }


  class ExpandFluidIngredient {
    static asCTFluidIngredient(internal: FluidIngredient): CTFluidIngredient;
    static asCTFluidIngredient(internal: FluidIngredient, amount: number): CTFluidIngredient;
    static getStacks(internal: FluidIngredient): FluidStack[];
    static hasNoFluids(internal: FluidIngredient): boolean;
    static isEmpty(internal: FluidIngredient): boolean;
    static isSimple(internal: FluidIngredient): boolean;
    static of(): FluidIngredient;
    static of(...fluids: IFluidStack[]): FluidIngredient;
    static of(...fluids: Fluid[]): FluidIngredient;
    static single(stack: IFluidStack): FluidIngredient;
    static single(fluid: Fluid): FluidIngredient;
    static tag(tag: KnownTag<Fluid>): FluidIngredient;
    static test(internal: FluidIngredient, fluidStack: FluidStack): boolean;
  }


  class ExpandIIngredientWithAmountNeoForge {
    static asSizedIngredient(internal: IIngredientWithAmount): SizedIngredient;
  }


  class ExpandIngredient {
    static asIIngredient(internal: Ingredient): IIngredient;
  }


  class ExpandSizedFluidIngredient {
    static amount(internal: SizedFluidIngredient): number;
    static asCTFluidIngredient(internal: SizedFluidIngredient): CTFluidIngredient;
    static getFluids(internal: SizedFluidIngredient): IFluidStack[];
    static ingredient(internal: SizedFluidIngredient): FluidIngredient;
    static of(fluid: Fluid, amount: number): SizedFluidIngredient;
    static of(stack: FluidStack): SizedFluidIngredient;
    static of(tag: KnownTag<Fluid>, amount: number): SizedFluidIngredient;
    static test(internal: SizedFluidIngredient, stack: IFluidStack): boolean;
  }


  class ExpandSizedIngredient {
    static asIIngredientWithAmount(internal: SizedIngredient): IIngredientWithAmount;
    static count(internal: SizedIngredient): number;
    static getItems(internal: SizedIngredient): IItemStack[];
    static ingredient(internal: SizedIngredient): IIngredient;
    static of(tag: KnownTag<Item>, count: number): SizedIngredient;
    static of(item: ItemLike, count: number): SizedIngredient;
    static of(ingredient: IIngredient, count: number): SizedIngredient;
    static test(internal: SizedIngredient, stack: IItemStack): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.alchemy' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { List } from 'java.util';
  import { MobEffectInstance } from 'net.minecraft.world.effect';

  class ExpandPotion {
    static getCommandString(internal: Potion): string;
    static getEffects(internal: Potion): MobEffectInstance[];
    static getName(prefix: string, potion: Potion): string;
    static getRegistryName(internal: Potion): ResourceLocation;
    static hasInstantEffects(internal: Potion): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.armortrim' {
  import { ArmorTrim, TrimMaterial, TrimPattern } from 'net.minecraft.world.item.armortrim';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ArmorMaterial, Item } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Map } from 'java.util';

  class ExpandArmorTrim {
    static hasPatternAndMaterial(internal: ArmorTrim, pattern: TrimPattern, material: TrimMaterial): boolean;
    static innerTexture(internal: ArmorTrim, material: ArmorMaterial): ResourceLocation;
    static material(internal: ArmorTrim): TrimMaterial;
    static of(material: TrimMaterial, pattern: TrimPattern, showInTooltip: boolean): ArmorTrim;
    static outerTexture(internal: ArmorTrim, material: ArmorMaterial): ResourceLocation;
    static pattern(internal: ArmorTrim): TrimPattern;
    static withTooltip(internal: ArmorTrim, withTooltip: boolean): ArmorTrim;
  }


  class ExpandTrimMaterial {
    static assetName(internal: TrimMaterial): string;
    static description(internal: TrimMaterial): Component;
    static getCommandString(internal: TrimMaterial): string;
    static ingredient(internal: TrimMaterial): Item;
    static itemModelIndex(internal: TrimMaterial): number;
    static overrideArmorMaterials(internal: TrimMaterial): Map<ArmorMaterial, string>;
  }


  class ExpandTrimPattern {
    static assetId(internal: TrimPattern): ResourceLocation;
    static copyWithStyle(internal: TrimPattern, material: TrimMaterial): Component;
    static decal(internal: TrimPattern): boolean;
    static description(internal: TrimPattern): Component;
    static getCommandString(internal: TrimPattern): string;
    static getRegistryName(internal: TrimPattern): ResourceLocation;
    static templateItem(internal: TrimPattern): Item;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component' {
  import { AdventureModePredicate, ItemStack, Item, DyeColor, Instrument } from 'net.minecraft.world.item';
  import { List, Map, Set, Optional, UUID } from 'java.util';
  import { BlockPredicate } from 'net.minecraft.advancements.critereon';
  import { Block } from 'net.minecraft.world.level.block';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { BlockItemStateProperties, BookContent, BundleContents, ChargedProjectiles, CustomData, CustomModelData, DyedItemColor, FireworkExplosion, Fireworks, ItemAttributeModifiers, ItemContainerContents, ItemLore, LodestoneTracker, MapDecorations, MapItemColor, MapPostProcessing, ResolvableProfile, SeededContainerLoot, SuspiciousStewEffects, Tool, Unbreakable, WritableBookContent, WrittenBookContent } from 'net.minecraft.world.item.component';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Filterable } from 'net.minecraft.server.network';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Iterable, Integer } from 'java.lang';
  import { MapData } from 'com.blamejared.crafttweaker.api.data';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Consumer, BiConsumer } from 'java.util.function';
  import { Shape } from 'FireworkExplosion';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Entry, Builder } from 'ItemAttributeModifiers';
  import { EquipmentSlot, EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { ItemEnchantments, Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Component } from 'net.minecraft.network.chat';
  import { LockCode } from 'net.minecraft.world';
  import { GlobalPos } from 'net.minecraft.core';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Entry as mapdecorations_Entry } from 'MapDecorations';
  import { MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { PotDecorations } from 'net.minecraft.world.level.block.entity';
  import { PotionContents, Potion } from 'net.minecraft.world.item.alchemy';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { GameProfile } from 'com.mojang.authlib';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { Entry as suspicioussteweffects_Entry } from 'SuspiciousStewEffects';
  import { Rule } from 'Tool';

  class ExpandAdventureModePredicate {
    static of(predicates: BlockPredicate[], showInTooltip: boolean): AdventureModePredicate;
    static ofBlocks(predicates: Block[], showInTooltip: boolean): AdventureModePredicate;
    static ofTags(predicates: KnownTag<Block>[], showInTooltip: boolean): AdventureModePredicate;
    static showInTooltip(internal: AdventureModePredicate): boolean;
    static withTooltip(internal: AdventureModePredicate, tooltip: boolean): AdventureModePredicate;
  }


  class ExpandBlockItemStateProperties {
    static apply(internal: BlockItemStateProperties, state: BlockState): BlockState;
    static isEmpty(internal: BlockItemStateProperties): boolean;
    static of(properties: Map<string, string>): BlockItemStateProperties;
    static properties(internal: BlockItemStateProperties): Map<string, string>;
  }


  class ExpandBookContent {
    static pages<T, C>(internal: BookContent<T, C>): Filterable<T>[];
    static withReplacedPages<T, C>(internal: BookContent<T, C>, list: Filterable<T>[]): C;
  }


  class ExpandBundleContents {
    static isEmpty(internal: BundleContents): boolean;
    static items(internal: BundleContents): Iterable<ItemStack>;
    static of(items: IItemStack[]): BundleContents;
    static size(internal: BundleContents): number;
  }


  class ExpandChargedProjectiles {
    static contains(internal: ChargedProjectiles, item: Item): boolean;
    static getItems(internal: ChargedProjectiles): IItemStack[];
    static isEmpty(internal: ChargedProjectiles): boolean;
    static of(stack: IItemStack): ChargedProjectiles;
    static of(stacks: IItemStack[]): ChargedProjectiles;
  }


  class ExpandCustomData {
    static contains(internal: CustomData, key: string): boolean;
    static copyTag(internal: CustomData): CompoundTag;
    static isEmpty(internal: CustomData): boolean;
    static matchedBy(internal: CustomData, tag: MapData): boolean;
    static of(tag: MapData): CustomData;
    static size(internal: CustomData): number;
    static update(internal: CustomData, updater: Consumer<MapData>): CustomData;
  }


  class ExpandCustomModelData {
    static of(value: number): CustomModelData;
    static value(internal: CustomModelData): number;
  }


  class ExpandDebugStickState {
  }


  class ExpandDyeColor {
    static getFireworkColor(internal: DyeColor): number;
    static getTextColor(internal: DyeColor): number;
  }


  class ExpandDyedItemColor {
    static of(rgb: number, showInTooltip: boolean): DyedItemColor;
    static rgb(internal: DyedItemColor): number;
    static showInTooltip(internal: DyedItemColor): boolean;
    static withTooltip(internal: DyedItemColor, tooltip: boolean): DyedItemColor;
  }


  class ExpandFireworkExplosion {
    static colors(internal: FireworkExplosion): number[];
    static fadeColors(internal: FireworkExplosion): number[];
    static hasTrail(internal: FireworkExplosion): boolean;
    static hasTwinkle(internal: FireworkExplosion): boolean;
    static of(shape: Shape, colors: number[], fadeColors: number[], hasTrail: boolean, hasTwinkle: boolean): FireworkExplosion;
    static shape(internal: FireworkExplosion): Shape;
    static withFadeColors(internal: FireworkExplosion, colors: number[]): FireworkExplosion;
  }


  class ExpandFireworks {
    static explosions(internal: Fireworks): FireworkExplosion[];
    static flightDuration(internal: Fireworks): number;
    static of(flightDuration: number, explosions: FireworkExplosion[]): Fireworks;
  }


  class ExpandInstrument {
    static getCommandString(internal: Instrument): string;
    static getRegistryName(internal: Instrument): ResourceLocation;
    static range(internal: Instrument): number;
    static soundEvent(internal: Instrument): SoundEvent;
    static useDuration(internal: Instrument): number;
  }


  class ExpandItemAttributeModifiers {
    static builder(): Builder;
    static compute(internal: ItemAttributeModifiers, baseValue: number, slot: EquipmentSlot): number;
    static forEach(internal: ItemAttributeModifiers, slot: EquipmentSlot, consumer: BiConsumer<Attribute, AttributeModifier>): void;
    static modifiers(internal: ItemAttributeModifiers): Entry[];
    static of(modifiers: Entry[], showInTooltip: boolean): ItemAttributeModifiers;
    static showInTooltip(internal: ItemAttributeModifiers): boolean;
    static withModifierAdded(internal: ItemAttributeModifiers, attribute: Attribute, modifier: AttributeModifier, slot: EquipmentSlotGroup): ItemAttributeModifiers;
    static withTooltip(internal: ItemAttributeModifiers, showInTooltip: boolean): ItemAttributeModifiers;
  }


  class ExpandItemContainerContents {
    static copyInto(internal: ItemContainerContents, stacks: IItemStack[]): void;
    static copyOne(internal: ItemContainerContents): IItemStack;
    static empty(): ItemContainerContents;
    static nonEmptyItemsCopy(internal: ItemContainerContents): IItemStack[];
    static of(items: IItemStack[]): ItemContainerContents;
    static stream(internal: ItemContainerContents): IItemStack[];
  }


  class ExpandItemEnchantments {
    static empty(): ItemEnchantments;
    static entries(internal: ItemEnchantments): Map<Enchantment, number>;
    static getLevel(internal: ItemEnchantments, enchantment: Enchantment): number;
    static isEmpty(internal: ItemEnchantments): boolean;
    static keySet(internal: ItemEnchantments): Set<Enchantment>;
    static size(internal: ItemEnchantments): number;
    static withTooltip(internal: ItemEnchantments, withTooltip: boolean): ItemEnchantments;
  }


  class ExpandItemLore {
    static lines(internal: ItemLore): Component[];
    static of(lines: Component[]): ItemLore;
    static of(lines: Component[], styledLines: Component[]): ItemLore;
    static styledLines(internal: ItemLore): Component[];
    static withLineAdded(internal: ItemLore, line: Component): ItemLore;
  }


  class ExpandLockCode {
    static getKey(internal: LockCode): string;
    static of(name: string): LockCode;
    static of(item: IItemStack): LockCode;
  }


  class ExpandLodestoneTracker {
    static of(target: GlobalPos, tracked: boolean): LodestoneTracker;
    static target(internal: LodestoneTracker): Optional<GlobalPos>;
    static tick(internal: LodestoneTracker, level: ServerLevel): LodestoneTracker;
    static tracked(internal: LodestoneTracker): boolean;
  }


  class ExpandMapDecorations {
    static decorations(internal: MapDecorations): Map<string, mapdecorations_Entry>;
    static of(decorations: Map<string, mapdecorations_Entry>): MapDecorations;
    static withDecoration(internal: MapDecorations, name: string, entry: mapdecorations_Entry): MapDecorations;
  }


  class ExpandMapId {
    static getId(internal: MapId): number;
    static of(value: number): MapId;
  }


  class ExpandMapItemColor {
    static defaultColor(): MapItemColor;
    static of(rgb: number): MapItemColor;
    static rgb(internal: MapItemColor): number;
  }


  class ExpandMapPostProcessing {
    static id(internal: MapPostProcessing): number;
  }


  class ExpandPotDecorations {
    static back(internal: PotDecorations): Item;
    static front(internal: PotDecorations): Item;
    static left(internal: PotDecorations): Item;
    static of(back: Item, left: Item, right: Item, front: Item): PotDecorations;
    static ordered(internal: PotDecorations): Item[];
    static right(internal: PotDecorations): Item;
  }


  class ExpandPotionContents {
    static getColor(internal: PotionContents): number;
    static getCustomEffects(internal: PotionContents): MobEffectInstance[];
    static hasEffects(internal: PotionContents): boolean;
    static of(potion: Potion, customColour: number, customEffects: MobEffectInstance[]): PotionContents;
    static of(potion: Potion): PotionContents;
    static withEffectAdded(internal: PotionContents, effectInstance: MobEffectInstance): PotionContents;
  }


  class ExpandResolvableProfile {
    static gameProfile(internal: ResolvableProfile): GameProfile;
    static id(internal: ResolvableProfile): UUID;
    static isResolved(internal: ResolvableProfile): boolean;
    static name(internal: ResolvableProfile): string;
  }


  class ExpandSeededContainerLoot {
    static lootTable(internal: SeededContainerLoot): ResourceKey<LootTable>;
    static of(lootTable: ResourceKey<LootTable>, seed: number): SeededContainerLoot;
    static seed(internal: SeededContainerLoot): number;
  }


  class ExpandSuspiciousStewEffects {
    static effects(internal: SuspiciousStewEffects): suspicioussteweffects_Entry[];
    static of(entries: suspicioussteweffects_Entry[]): SuspiciousStewEffects;
    static withEffectAdded(internal: SuspiciousStewEffects, entry: suspicioussteweffects_Entry): SuspiciousStewEffects;
  }


  class ExpandTool {
    static damagePerBlock(internal: Tool): number;
    static defaultMiningSpeed(internal: Tool): number;
    static getMiningSpeed(internal: Tool, state: BlockState): number;
    static isCorrectForDrops(internal: Tool, state: BlockState): boolean;
    static of(rules: Rule[], defaultMiningSpeed: number, damagePerBlock: number): Tool;
    static rules(internal: Tool): Rule[];
  }


  class ExpandUnbreakable {
    static of(showInTooltip: boolean): Unbreakable;
    static showInTooltip(internal: Unbreakable): boolean;
    static withTooltip(internal: Unbreakable, showInTooltip: boolean): Unbreakable;
  }


  class ExpandWritableBookContent {
    static getPages(internal: WritableBookContent, filtered: boolean): string[];
    static of(pages: Filterable<string>[]): WritableBookContent;
    static pages(internal: WritableBookContent): Filterable<string>[];
    static withReplacedPages(internal: WritableBookContent, pages: Filterable<string>[]): WritableBookContent;
  }


  class ExpandWrittenBookContent {
    static author(internal: WrittenBookContent): string;
    static generation(internal: WrittenBookContent): number;
    static getPages(internal: WrittenBookContent, filtered: boolean): Component[];
    static markResolved(internal: WrittenBookContent): WrittenBookContent;
    static pages(internal: WrittenBookContent): Filterable<Component>[];
    static resolved(internal: WrittenBookContent): boolean;
    static title(internal: WrittenBookContent): Filterable<string>;
    static tryCraftCopy(internal: WrittenBookContent): WrittenBookContent;
    static withReplacedPages(internal: WrittenBookContent, pages: Filterable<Component>[]): WrittenBookContent;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandBundleContents' {
  import { Mutable } from 'BundleContents';
  import { BundleContents } from 'net.minecraft.world.item.component';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandBundleContentsMutable {
    static clearItems(internal: Mutable): Mutable;
    static of(contents: BundleContents): Mutable;
    static removeOne(internal: Mutable): IItemStack;
    static toImmutable(internal: Mutable): BundleContents;
    static tryInsert(internal: Mutable, stack: ItemStack): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandFireworkExplosion' {
  import { Shape } from 'FireworkExplosion';
  import { MutableComponent } from 'net.minecraft.network.chat';

  class ExpandFireworkExplosionShape {
    static getId(internal: Shape): number;
    static getName(internal: Shape): MutableComponent;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandItemAttributeModifiers' {
  import { Builder, Entry } from 'ItemAttributeModifiers';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { ItemAttributeModifiers } from 'net.minecraft.world.item.component';

  class ExpandItemAttributeModifiersBuilder {
    static add(internal: Builder, attribute: Attribute, modifier: AttributeModifier, slot: EquipmentSlotGroup): Builder;
    static build(internal: Builder): ItemAttributeModifiers;
  }


  class ExpandItemAttributeModifiersEntry {
    static attribute(internal: Entry): Attribute;
    static modifier(internal: Entry): AttributeModifier;
    static of(attribute: Attribute, modifier: AttributeModifier, slot: EquipmentSlotGroup): Entry;
    static slot(internal: Entry): EquipmentSlotGroup;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandItemEnchantments' {
  import { Mutable } from 'ItemEnchantments';
  import { ItemEnchantments, Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Set } from 'java.util';
  import { Predicate } from 'java.util.function';

  class ExpandItemEnchantmentsMutable {
    static getLevel(internal: Mutable, enchantment: Enchantment): number;
    static keySet(internal: Mutable): Set<Enchantment>;
    static of(enchantments: ItemEnchantments): Mutable;
    static removeIf(internal: Mutable, predicate: Predicate<Enchantment>): void;
    static setEnchantment(internal: Mutable, enchantment: Enchantment, level: number): void;
    static toImmutable(internal: Mutable): ItemEnchantments;
    static upgrade(internal: Mutable, enchantment: Enchantment, level: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandMapDecorations' {
  import { MapDecorationType } from 'net.minecraft.world.level.saveddata.maps';
  import { Entry } from 'MapDecorations';

  class ExpandMapDecorationsEntry {
    static rotation(internal: Entry): number;
    static type(internal: Entry): MapDecorationType;
    static x(internal: Entry): number;
    static z(internal: Entry): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandSuspiciousStewEffects' {
  import { Entry } from 'SuspiciousStewEffects';
  import { MobEffect, MobEffectInstance } from 'net.minecraft.world.effect';

  class ExpandSuspiciousStewEffectsEntry {
    static createEffectInstance(internal: Entry): MobEffectInstance;
    static duration(internal: Entry): number;
    static effect(internal: Entry): MobEffect;
    static of(effect: MobEffect, duration: number): Entry;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.component.ExpandTool' {
  import { Rule } from 'Tool';
  import { Float } from 'java.lang';
  import { List } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';

  class ExpandToolRule {
    static blocks(internal: Rule): Block[];
    static correctForDrops(internal: Rule): boolean;
    static deniesDrops(tag: KnownTag<Block>): Rule;
    static hasCorrectToolForDrops(internal: Rule): boolean;
    static minesAndDrops(tag: KnownTag<Block>, speed: number): Rule;
    static minesAndDrops(blocks: Block[], speed: number): Rule;
    static overrideSpeed(blocks: Block[], speed: number): Rule;
    static overrideSpeed(tag: KnownTag<Block>, speed: number): Rule;
    static speed(internal: Rule): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.enchantment' {
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { EnchantmentDefinition, Cost } from 'Enchantment';
  import { Component } from 'net.minecraft.network.chat';
  import { Map, List } from 'java.util';
  import { EquipmentSlot, LivingEntity, EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Item } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandEnchantment {
    static canEnchant(internal: Enchantment, stack: IItemStack): boolean;
    static definition(internal: Enchantment): EnchantmentDefinition;
    static description(internal: Enchantment): Component;
    static exclusiveSet(internal: Enchantment): Enchantment[];
    static getAnvilCost(internal: Enchantment): number;
    static getCommandString(internal: Enchantment): string;
    static getMaxCost(internal: Enchantment, level: number): number;
    static getMaxLevel(internal: Enchantment): number;
    static getMinCost(internal: Enchantment, level: number): number;
    static getMinLevel(internal: Enchantment): number;
    static getRegistryName(internal: Enchantment): ResourceLocation;
    static getSlotItems(internal: Enchantment, entity: LivingEntity): Map<EquipmentSlot, IItemStack>;
    static getSupportedItems(internal: Enchantment): Item[];
    static getWeight(internal: Enchantment): number;
    static isPrimaryItem(internal: Enchantment, stack: IItemStack): boolean;
    static isSupportedItem(internal: Enchantment, stack: IItemStack): boolean;
    static matchingSlot(internal: Enchantment, slot: EquipmentSlot): boolean;
  }


  class ExpandEnchantmentCost {
    static base(internal: Cost): number;
    static calculate(internal: Cost, level: number): number;
    static perLevelAboveFirst(internal: Cost): number;
  }


  class ExpandEnchantmentDefinition {
    static anvilCost(internal: EnchantmentDefinition): number;
    static maxCost(internal: EnchantmentDefinition): Cost;
    static maxLevel(internal: EnchantmentDefinition): number;
    static minCost(internal: EnchantmentDefinition): Cost;
    static primaryItems(internal: EnchantmentDefinition): Item[];
    static slots(internal: EnchantmentDefinition): EquipmentSlotGroup[];
    static supportedItems(internal: EnchantmentDefinition): Item[];
    static weight(internal: EnchantmentDefinition): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.enchantment.provider' {
  import { EnchantmentProvider } from 'net.minecraft.world.item.enchantment.providers';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Mutable } from 'ItemEnchantments';
  import { RandomSource } from 'net.minecraft.util';
  import { DifficultyInstance } from 'net.minecraft.world';

  class ExpandEnchantmentProvider {
    static enchant(internal: EnchantmentProvider, stack: ItemStack, enchantments: Mutable, random: RandomSource, difficulty: DifficultyInstance): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.enchantment.provider.type' {
  import { EnchantmentsByCost, EnchantmentsByCostWithDifficulty, SingleEnchantment } from 'net.minecraft.world.item.enchantment.providers';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { IntProvider } from 'net.minecraft.util.valueproviders';

  class ExpandEnchantmentByCost {
    static cost(internal: EnchantmentsByCost): IntProvider;
    static enchantment(internal: EnchantmentsByCost): Enchantment[];
    static of(enchantments: Enchantment[], cost: IntProvider): EnchantmentsByCost;
  }


  class ExpandEnchantmentByCostWithDifficulty {
    static enchantment(internal: EnchantmentsByCostWithDifficulty): Enchantment[];
    static maxCostSpan(internal: EnchantmentsByCostWithDifficulty): number;
    static minCost(internal: EnchantmentsByCostWithDifficulty): number;
    static of(enchantments: Enchantment[], minCost: number, maxCostSpan: number): EnchantmentsByCostWithDifficulty;
  }


  class ExpandSingleEnchantment {
    static enchantment(internal: SingleEnchantment): Enchantment;
    static level(internal: SingleEnchantment): IntProvider;
    static of(enchantment: Enchantment, level: IntProvider): SingleEnchantment;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item' {
  import { DataComponentMap, DataComponentType } from 'net.minecraft.core.component';
  import { Item, Rarity, AdventureModePredicate, Instrument, DyeColor, ItemCooldowns, ItemStack } from 'net.minecraft.world.item';
  import { Class } from 'java.lang';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { CustomData, Unbreakable, ItemLore, ItemAttributeModifiers, CustomModelData, Tool, DyedItemColor, MapItemColor, MapDecorations, MapPostProcessing, ChargedProjectiles, BundleContents, SuspiciousStewEffects, WritableBookContent, WrittenBookContent, DebugStickState, LodestoneTracker, FireworkExplosion, Fireworks, ResolvableProfile, ItemContainerContents, BlockItemStateProperties, SeededContainerLoot } from 'net.minecraft.world.item.component';
  import { Component } from 'net.minecraft.network.chat';
  import { ItemEnchantments, Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Attribute, AttributeModifier } from 'net.minecraft.world.entity.ai.attributes';
  import { EquipmentSlotGroup } from 'net.minecraft.world.entity';
  import { FoodProperties } from 'net.minecraft.world.food';
  import { MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { PotionContents } from 'net.minecraft.world.item.alchemy';
  import { ArmorTrim } from 'net.minecraft.world.item.armortrim';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BannerPatternLayers, PotDecorations } from 'net.minecraft.world.level.block.entity';
  import { Occupant } from 'BeehiveBlockEntity';
  import { LockCode, InteractionHand } from 'net.minecraft.world';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Level } from 'net.minecraft.world.level';

  class ExpandEquipable {
  }


  class ExpandItem {
    static addAttributeModifier(internal: Item, attribute: Attribute, modifier: AttributeModifier, slot: EquipmentSlotGroup): void;
    static addEnchantment(internal: Item, enchantment: Enchantment, level: number): void;
    static commonItemComponents(): DataComponentMap;
    static getCommandString(internal: Item): string;
    static getDefaultInstance(internal: Item): IItemStack;
    static getRegistryName(internal: Item): ResourceLocation;
    static remove(internal: Item, type: DataComponentType): void;
    static setAttributeModifiers(internal: Item, modifiers: ItemAttributeModifiers): void;
    static setBannerPatterns(internal: Item, patterns: BannerPatternLayers): void;
    static setBaseColor(internal: Item, baseColor: DyeColor): void;
    static setBees(internal: Item, occupants: Occupant[]): void;
    static setBlockEntityData(internal: Item, data: CustomData): void;
    static setBlockState(internal: Item, blockState: BlockItemStateProperties): void;
    static setBucketEntityData(internal: Item, data: CustomData): void;
    static setBundleContents(internal: Item, bundleContents: BundleContents): void;
    static setCanBreak(internal: Item, predicate: AdventureModePredicate): void;
    static setCanPlaceOn(internal: Item, predicate: AdventureModePredicate): void;
    static setChargedProjectiles(internal: Item, chargedProjectiles: ChargedProjectiles): void;
    static setComponent<T>(internal: Item, type: DataComponentType<T>, value: T): void;
    static setComponent<T>(internal: Item, clazz: Class<T>, type: DataComponentType<T>, value: T): void;
    static setContainer(internal: Item, container: ItemContainerContents): void;
    static setContainerLoot(internal: Item, containerLoot: SeededContainerLoot): void;
    static setCreativeSlotLock(internal: Item, creativeSlotLock: boolean): void;
    static setCustomData(internal: Item, customData: CustomData): void;
    static setCustomModelData(internal: Item, modelData: CustomModelData): void;
    static setCustomName(internal: Item, component: Component): void;
    static setDebugStickState(internal: Item, debugStickState: DebugStickState): void;
    static setDyedColor(internal: Item, color: DyedItemColor): void;
    static setEnchantmentGlintOverride(internal: Item, value: boolean): void;
    static setEnchantments(internal: Item, enchantments: ItemEnchantments): void;
    static setEntityData(internal: Item, data: CustomData): void;
    static setFireResistant(internal: Item, intangibleProjectile: boolean): void;
    static setFireworkExplosion(internal: Item, explosion: FireworkExplosion): void;
    static setFireworks(internal: Item, fireworks: Fireworks): void;
    static setFood(internal: Item, food: FoodProperties): void;
    static setHideAdditionalTooltip(internal: Item, hideAdditionalTooltip: boolean): void;
    static setHideTooltip(internal: Item, hideTooltip: boolean): void;
    static setInstrument(internal: Item, instrument: Instrument): void;
    static setIntangibleProjectile(internal: Item, intangibleProjectile: boolean): void;
    static setItemName(internal: Item, component: Component): void;
    static setJsonComponent(internal: Item, type: DataComponentType, value: IData): void;
    static setLockCode(internal: Item, code: LockCode): void;
    static setLodestoneTracker(internal: Item, tracker: LodestoneTracker): void;
    static setLore(internal: Item, lore: ItemLore): void;
    static setMapColor(internal: Item, mapColor: MapItemColor): void;
    static setMapDecorations(internal: Item, mapDecorations: MapDecorations): void;
    static setMapId(internal: Item, id: MapId): void;
    static setMapPostProcessing(internal: Item, mapPostProcessing: MapPostProcessing): void;
    static setMaxDamage(internal: Item, maxDamage: number): void;
    static setMaxStackSize(internal: Item, maxStackSize: number): void;
    static setNoteBlockSound(internal: Item, sound: ResourceLocation): void;
    static setOminousBottleAmplifier(internal: Item, amplifier: number): void;
    static setPotDecorations(internal: Item, decorations: PotDecorations): void;
    static setPotionContents(internal: Item, potionContents: PotionContents): void;
    static setProfile(internal: Item, profile: ResolvableProfile): void;
    static setRarity(internal: Item, rarity: Rarity): void;
    static setRecipes(internal: Item, recipes: ResourceLocation[]): void;
    static setRepairCost(internal: Item, cost: number): void;
    static setStoredEnchantments(internal: Item, storedEnchantments: ItemEnchantments): void;
    static setSuspiciousStewEffects(internal: Item, suspiciousStewEffects: SuspiciousStewEffects): void;
    static setTool(internal: Item, tool: Tool): void;
    static setTrim(internal: Item, trim: ArmorTrim): void;
    static setUnbreakable(internal: Item, unbreakable: Unbreakable): void;
    static setWritableBookContent(internal: Item, writableBookContent: WritableBookContent): void;
    static setWrittenBookContent(internal: Item, writtenBookContent: WrittenBookContent): void;
  }


  class ExpandItemCooldowns {
    static addCooldown(internal: ItemCooldowns, item: Item, ticks: number): void;
    static getCooldownPercent(internal: ItemCooldowns, item: Item, partialTicks: number): number;
    static isOnCooldown(internal: ItemCooldowns, item: Item): boolean;
    static removeCooldown(internal: ItemCooldowns, item: Item): void;
  }


  class ExpandItemStack {
    static asIIngredient(internal: ItemStack): IIngredient;
    static asIItemStack(internal: ItemStack): IItemStack;
  }


  class ExpandToolAction {
    static getCommandString(internal: ItemAbility): string;
    static name(internal: ItemAbility): string;
  }


  class ExpandUseOnContext {
    static getClickLocation(internal: UseOnContext): Vec3;
    static getClickedFace(internal: UseOnContext): Direction;
    static getClickedPos(internal: UseOnContext): BlockPos;
    static getHand(internal: UseOnContext): InteractionHand;
    static getHorizontalDirection(internal: UseOnContext): Direction;
    static getItemInHand(internal: UseOnContext): ItemStack;
    static getLevel(internal: UseOnContext): Level;
    static getPlayer(internal: UseOnContext): Player;
    static getRotation(internal: UseOnContext): number;
    static isInside(internal: UseOnContext): boolean;
    static isSecondaryUseActive(internal: UseOnContext): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.property' {
  import { ChatFormatting } from 'net.minecraft';
  import { Rarity } from 'net.minecraft.world.item';

  class ExpandRarity {
    static color(internal: Rarity): ChatFormatting;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.type.armor' {
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { ArmorItem, ArmorMaterial } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Type } from 'ArmorItem';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandArmorItem {
    static getDefense(internal: ArmorItem): number;
    static getEquipSound(internal: ArmorItem): SoundEvent;
    static getEquipmentSlot(internal: ArmorItem): EquipmentSlot;
    static getMaterial(internal: ArmorItem): ArmorMaterial;
    static getToughness(internal: ArmorItem): number;
  }


  class ExpandArmorItemType {
    static getName(internal: Type): string;
    static getSlot(internal: Type): EquipmentSlot;
  }


  class ExpandArmorMaterial {
    static enchantmentValue(internal: ArmorMaterial): number;
    static equipSound(internal: ArmorMaterial): SoundEvent;
    static getDefense(internal: ArmorMaterial, type: Type): number;
    static getName(internal: ArmorMaterial): ResourceLocation;
    static knockbackResistance(internal: ArmorMaterial): number;
    static repairIngredient(internal: ArmorMaterial): IIngredient;
    static toughness(internal: ArmorMaterial): number;
  }


  class ExpandArmorMaterials {
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.type.block' {
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockItem } from 'net.minecraft.world.item';

  class ExpandBlockItem {
    static getBlock(internal: BlockItem): Block;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.type.projectileweapon' {
  import { CrossbowItem, ItemStack, ProjectileWeaponItem } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { InteractionHand } from 'net.minecraft.world';
  import { Predicate } from 'java.util.function';

  class ExpandBowItem {
    static getPowerForTime(charge: number): number;
  }


  class ExpandCrossBowItem {
    static getChargeDuration(crossbowStack: ItemStack, entity: LivingEntity): number;
    static isCharged(crossbowStack: ItemStack): boolean;
    static performShooting(internal: CrossbowItem, level: Level, shooter: LivingEntity, hand: InteractionHand, stack: ItemStack, power: number, accuracy: number, target: LivingEntity): void;
  }


  class ExpandProjectileWeaponItem {
    static ARROW_ONLY(): Predicate<ItemStack>;
    static ARROW_OR_FIREWORK(): Predicate<ItemStack>;
    static getAllSupportedProjectiles(internal: ProjectileWeaponItem): Predicate<ItemStack>;
    static getDefaultProjectileRange(internal: ProjectileWeaponItem): number;
    static getSupportedHeldProjectiles(internal: ProjectileWeaponItem): Predicate<ItemStack>;
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.type.sword' {
  class ExpandSwordItem {
  }

}

declare module 'com.blamejared.crafttweaker.natives.item.type.tiered' {
  import { Tier, TieredItem } from 'net.minecraft.world.item';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';

  class ExpandTier {
    static getAttackDamageBonus(internal: Tier): number;
    static getEnchantmentValue(internal: Tier): number;
    static getRepairIngredient(internal: Tier): IIngredient;
    static getSpeed(internal: Tier): number;
    static getUses(internal: Tier): number;
  }


  class ExpandTieredItem {
    static getTier(internal: TieredItem): Tier;
  }


  class ExpandTiers {
  }

}

declare module 'com.blamejared.crafttweaker.natives.level' {
  import { NullableT } from '@ZenCodeType';
  import { ILevelExtension } from 'net.neoforged.neoforge.common.extensions';
  import { Class } from 'java.lang';
  import { BlockCapability } from 'net.neoforged.neoforge.capabilities';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  class ExpandILevelExtension {
    static getCapability<T, C>(internal: ILevelExtension, tClass: Class<T>, cClass: Class<C>, cap: BlockCapability<T, C>, pos: BlockPos, context: C): NullableT;
    static getCapability<T, C>(internal: ILevelExtension, tClass: Class<T>, cClass: Class<C>, cap: BlockCapability<T, C>, pos: BlockPos, state: BlockState, blockEntity: BlockEntity, context: C): NullableT;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot.condition.builder' {
  import { Builder } from 'AllOfCondition';
  import { Builder as lootitemcondition_Builder } from 'LootItemCondition';
  import { Builder as anyofcondition_Builder } from 'AnyOfCondition';
  import { Builder as entityhasscorecondition_Builder } from 'EntityHasScoreCondition';
  import { IntRange } from 'net.minecraft.world.level.storage.loot';
  import { Builder as lootitemblockstatepropertycondition_Builder } from 'LootItemBlockStatePropertyCondition';
  import { Builder as statepropertiespredicate_Builder } from 'StatePropertiesPredicate';
  import { LootItemCondition } from 'net.minecraft.world.level.storage.loot.predicates';
  import { Builder as timecheck_Builder } from 'TimeCheck';
  import { Builder as weathercheck_Builder } from 'WeatherCheck';
  import { Boolean } from 'java.lang';

  class ExpandAllOfConditionBuilder {
    static and(internal: Builder, condition: lootitemcondition_Builder): Builder;
  }


  class ExpandAnyOfConditionBuilder {
    static or(internal: anyofcondition_Builder, condition: lootitemcondition_Builder): anyofcondition_Builder;
  }


  class ExpandEntityHasScoreConditionBuilder {
    static withScore(internal: entityhasscorecondition_Builder, name: string, range: IntRange): entityhasscorecondition_Builder;
  }


  class ExpandLootItemBlockStatePropertyConditionBuilder {
    static properties(builder: lootitemblockstatepropertycondition_Builder, predicate: statepropertiespredicate_Builder): lootitemblockstatepropertycondition_Builder;
  }


  class ExpandLootItemConditionBuilder {
    static and(internal: lootitemcondition_Builder, other: lootitemcondition_Builder): Builder;
    static build(internal: lootitemcondition_Builder): LootItemCondition;
    static invert(internal: lootitemcondition_Builder): lootitemcondition_Builder;
    static or(internal: lootitemcondition_Builder, other: lootitemcondition_Builder): anyofcondition_Builder;
  }


  class ExpandTimeCheckBuilder {
    static period(internal: timecheck_Builder, period: number): timecheck_Builder;
  }


  class ExpandWeatherCheckBuilder {
    static raining(internal: weathercheck_Builder, raining: boolean): weathercheck_Builder;
    static thundering(internal: weathercheck_Builder, thundering: boolean): weathercheck_Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot.condition' {
  import { Builder } from 'AllOfCondition';
  import { Builder as anyofcondition_Builder } from 'AnyOfCondition';
  import { Builder as lootitemcondition_Builder } from 'LootItemCondition';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { ItemAbility } from 'net.neoforged.neoforge.common';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Builder as damagesourcepredicate_Builder } from 'DamageSourcePredicate';
  import { Builder as entityhasscorecondition_Builder } from 'EntityHasScoreCondition';
  import { EntityTarget } from 'LootContext';
  import { Builder as locationpredicate_Builder } from 'LocationPredicate';
  import { BlockPos } from 'net.minecraft.core';
  import { Builder as lootitemblockstatepropertycondition_Builder } from 'LootItemBlockStatePropertyCondition';
  import { Block } from 'net.minecraft.world.level.block';
  import { Builder as entitypredicate_Builder } from 'EntityPredicate';
  import { Builder as itempredicate_Builder } from 'ItemPredicate';
  import { Builder as timecheck_Builder } from 'TimeCheck';
  import { IntRange } from 'net.minecraft.world.level.storage.loot';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';
  import { Builder as weathercheck_Builder } from 'WeatherCheck';

  class ExpandAllOfCondition {
    create(): Builder;
  }


  class ExpandAnyOfCondition {
    create(): anyofcondition_Builder;
  }


  class ExpandBonusLevelTableCondition {
    static create(enchantment: Enchantment, ...values: number[]): lootitemcondition_Builder;
  }


  class ExpandCanToolPerformAction {
    static create(action: ItemAbility): lootitemcondition_Builder;
  }


  class ExpandConditionReference {
    static create(name: ResourceLocation): lootitemcondition_Builder;
    static create(name: string): lootitemcondition_Builder;
  }


  class ExpandDamageSourceCondition {
    static create(predicate: damagesourcepredicate_Builder): lootitemcondition_Builder;
  }


  class ExpandEntityHasScoreCondition {
    static create(target: EntityTarget): entityhasscorecondition_Builder;
  }


  class ExpandExplosionCondition {
    static create(): lootitemcondition_Builder;
  }


  class ExpandInvertedLootItemCondition {
    static create(builder: lootitemcondition_Builder): lootitemcondition_Builder;
  }


  class ExpandLocationCheck {
    static create(predicate: locationpredicate_Builder): lootitemcondition_Builder;
    static create(predicate: locationpredicate_Builder, offset: BlockPos): lootitemcondition_Builder;
    static create(predicate: locationpredicate_Builder, xOffset: number, yOffset: number, zOffset: number): lootitemcondition_Builder;
  }


  class ExpandLootItemBlockStatePropertyCondition {
    static create(block: Block): lootitemblockstatepropertycondition_Builder;
  }


  class ExpandLootItemCondition {
  }


  class ExpandLootItemEntityPropertyCondition {
    static create(target: EntityTarget): lootitemcondition_Builder;
    static create(target: EntityTarget, predicate: entitypredicate_Builder): lootitemcondition_Builder;
  }


  class ExpandLootItemKilledByPlayerCondition {
    static create(): lootitemcondition_Builder;
  }


  class ExpandLootItemRandomChanceCondition {
    static create(probability: number): lootitemcondition_Builder;
  }


  class ExpandLootTableIdCondition {
    static create(id: ResourceLocation): lootitemcondition_Builder;
  }


  class ExpandLootTableIdRegexCondition {
    static create(regex: string): lootitemcondition_Builder;
  }


  class ExpandMatchTool {
    static create(predicate: itempredicate_Builder): lootitemcondition_Builder;
  }


  class ExpandTimeCheck {
    static create(range: IntRange): timecheck_Builder;
  }


  class ExpandValueCheckCondition {
    static create(provider: NumberProvider, range: IntRange): lootitemcondition_Builder;
  }


  class ExpandWeatherCheck {
    static create(): weathercheck_Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot' {
  import { IntRange, LootContext, LootParams } from 'net.minecraft.world.level.storage.loot';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { RandomSource } from 'net.minecraft.util';
  import { Builder, EntityTarget } from 'LootContext';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { NumberProvider } from 'net.minecraft.world.level.storage.loot.providers.number';

  class ExpandEntityTarget {
  }


  class ExpandIntRange {
    static atLeast(min: number): IntRange;
    static atMost(max: number): IntRange;
    static between(min: number, max: number): IntRange;
    static exactly(value: number): IntRange;
  }


  class ExpandLootContext {
    static getAttackingEntity(internal: LootContext): Entity;
    static getBlockState(internal: LootContext): BlockState;
    static getDamageSource(internal: LootContext): DamageSource;
    static getDirectAttackingEntity(internal: LootContext): Entity;
    static getExplosionRadius(internal: LootContext): number;
    static getLastDamagePlayer(internal: LootContext): Player;
    static getLuck(internal: LootContext): number;
    static getOrigin(internal: LootContext): Vec3;
    static getRandom(internal: LootContext): RandomSource;
    static getThisEntity(internal: LootContext): Entity;
    static getTileEntity(internal: LootContext): BlockEntity;
    static getTool(internal: LootContext): IItemStack;
    static getWorld(internal: LootContext): ServerLevel;
  }


  class ExpandLootContextBuilder {
    static copy(context: LootContext): Builder;
    static create(params: LootParams): Builder;
    static create(internal: Builder, key: ResourceLocation): LootContext;
    static getLevel(internal: Builder): ServerLevel;
    static withOptionalRandomSeed(internal: Builder, seed: number): Builder;
  }


  class ExpandNumberProvider {
    static between(min: number, max: number): NumberProvider;
    static binomial(n: number, p: number): NumberProvider;
    static exactly(value: number): NumberProvider;
    static scoreboard(target: EntityTarget, score: string, scale: number): NumberProvider;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot.modifier' {
  import { Block } from 'net.minecraft.world.level.block';
  import { ILootModifier } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { Builder } from 'StatePropertiesPredicate';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';

  class ModifierSpecificExpandBlock {
    static addLootModifier(internal: Block, name: string, modifier: ILootModifier): void;
    static addNoSilkTouchLootModifier(internal: Block, name: string, modifier: ILootModifier): void;
    static addStateLootModifier(internal: Block, name: string, statePredicate: Builder, modifier: ILootModifier): void;
    static addToolLootModifier(internal: Block, name: string, tool: IItemStack, modifier: ILootModifier): void;
    static addToolLootModifier(internal: Block, name: string, tool: IItemStack, matchComponents: boolean, modifier: ILootModifier): void;
  }


  class ModifierSpecificExpandBlockState {
    static addBlockLootModifier(internal: BlockState, name: string, modifier: ILootModifier): void;
    static addNoSilkTouchLootModifier(internal: BlockState, name: string, modifier: ILootModifier): void;
    static addTargetedLootModifier(internal: BlockState, name: string, modifier: ILootModifier): void;
    static addToolLootModifier(internal: BlockState, name: string, tool: IItemStack, modifier: ILootModifier): void;
    static addToolLootModifier(internal: BlockState, name: string, tool: IItemStack, matchComponents: boolean, modifier: ILootModifier): void;
  }


  class ModifierSpecificExpandEntityType {
    static addLootModifier(internal: EntityType<Entity>, name: string, modifier: ILootModifier): void;
    static addPlayerOnlyLootModifier(internal: EntityType<Entity>, name: string, modifier: ILootModifier): void;
    static addWeaponAndPlayerOnlyLootModifier(internal: EntityType<Entity>, name: string, weapon: IItemStack, modifier: ILootModifier): void;
    static addWeaponAndPlayerOnlyLootModifier(internal: EntityType<Entity>, name: string, weapon: IItemStack, matchComponents: boolean, modifier: ILootModifier): void;
    static addWeaponOnlyLootModifier(internal: EntityType<Entity>, name: string, weapon: IItemStack, modifier: ILootModifier): void;
    static addWeaponOnlyLootModifier(internal: EntityType<Entity>, name: string, weapon: IItemStack, matchComponents: boolean, modifier: ILootModifier): void;
  }


  class ModifierSpecificExpandLootTable {
    static addLootModifier(internal: LootTable, name: string, modifier: ILootModifier): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot.param' {
  import { DynamicDrop, Builder } from 'LootParams';
  import { Consumer } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootContextParam, LootContextParamSet } from 'net.minecraft.world.level.storage.loot.parameters';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { Float, Class } from 'java.lang';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { LootParams } from 'net.minecraft.world.level.storage.loot';
  import { NullableT } from '@ZenCodeType';

  class ExpandDynamicDrop {
    static add(internal: DynamicDrop, drop: Consumer<ItemStack>): void;
  }


  class ExpandLootContextParam {
    static getName(internal: LootContextParam): ResourceLocation;
  }


  class ExpandLootContextParams {
    static attackingEntity(): LootContextParam<Entity>;
    static blockEntity(): LootContextParam<BlockEntity>;
    static blockState(): LootContextParam<BlockState>;
    static damageSource(): LootContextParam<DamageSource>;
    static directAttackingEntity(): LootContextParam<Entity>;
    static explosionRadius(): LootContextParam<number>;
    static getOrCreate<T>(name: ResourceLocation, tClass: Class<T>): LootContextParam<T>;
    static lastDamagePlayer(): LootContextParam<Player>;
    static origin(): LootContextParam<Vec3>;
    static thisEntity(): LootContextParam<Entity>;
    static tool(): LootContextParam<ItemStack>;
  }


  class ExpandLootContextParamSet {
  }


  class ExpandLootContextParamSets {
    static advancementEntity(): LootContextParamSet;
    static advancementLocation(): LootContextParamSet;
    static advancementReward(): LootContextParamSet;
    static allParams(): LootContextParamSet;
    static block(): LootContextParamSet;
    static chest(): LootContextParamSet;
    static command(): LootContextParamSet;
    static empty(): LootContextParamSet;
    static entity(): LootContextParamSet;
    static fishing(): LootContextParamSet;
    static get(name: ResourceLocation): LootContextParamSet;
    static gift(): LootContextParamSet;
    static piglinBarter(): LootContextParamSet;
    static selector(): LootContextParamSet;
  }


  class ExpandLootParams {
    static addDynamicDrops(internal: LootParams, key: ResourceLocation, drop: Consumer<ItemStack>): void;
    static getLevel(internal: LootParams): ServerLevel;
    static getLuck(internal: LootParams): number;
    static getOptionalParameter<T>(internal: LootParams, tClass: Class<T>, param: LootContextParam<T>): NullableT;
    static getParamOrNull<T>(internal: LootParams, tClass: Class<T>, param: LootContextParam<T>): NullableT;
    static getParameter<T>(internal: LootParams, tClass: Class<T>, param: LootContextParam<T>): T;
    static hasParam<T>(internal: LootParams, tClass: Class<T>, param: LootContextParam<T>): boolean;
  }


  class ExpandLootParamsBuilder {
    static build(internal: Builder, params: LootContextParamSet): LootParams;
    static create(level: ServerLevel): Builder;
    static getLevel(internal: Builder): ServerLevel;
    static getOptionalParameter<T>(internal: Builder, tClass: Class<T>, param: LootContextParam<T>): NullableT;
    static getParameter<T>(internal: Builder, tClass: Class<T>, param: LootContextParam<T>): T;
    static withDynamicDrop(internal: Builder, key: ResourceLocation, drop: DynamicDrop): Builder;
    static withLuck(internal: Builder, luck: number): Builder;
    static withOptionalParameter<T>(internal: Builder, tClass: Class<T>, param: LootContextParam<T>, value: T): Builder;
    static withParameter<T>(internal: Builder, tClass: Class<T>, param: LootContextParam<T>, value: T): Builder;
  }

}

declare module 'com.blamejared.crafttweaker.natives.loot.table' {
  import { LootTable, LootContext, LootParams } from 'net.minecraft.world.level.storage.loot';
  import { Consumer } from 'java.util.function';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { List } from 'java.util';
  import { LootContextParamSet } from 'net.minecraft.world.level.storage.loot.parameters';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Container } from 'net.minecraft.world';

  class ExpandLootTable {
    static fill(internal: LootTable, container: Container, params: LootParams, seed: number): void;
    static getId(internal: LootTable): ResourceLocation;
    static getParamSet(internal: LootTable): LootContextParamSet;
    static getRandomItems(internal: LootTable, context: LootContext, stackConsumer: Consumer<IItemStack>, itemStack: T): void;
    static getRandomItems(internal: LootTable, context: LootContext): IItemStack[];
    static getRandomItems(internal: LootTable, params: LootParams): IItemStack[];
    static getRandomItemsRaw(internal: LootTable, context: LootContext, stackConsumer: Consumer<IItemStack>): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.predicate.builder' {
  import { Builder } from 'BlockPredicate';
  import { Block } from 'net.minecraft.world.level.block';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { MapData, IData } from 'com.blamejared.crafttweaker.api.data';
  import { Builder as statepropertiespredicate_Builder } from 'StatePropertiesPredicate';
  import { BlockPredicate, TagPredicate, DamageSourcePredicate, EntityEquipmentPredicate, EntityFlagsPredicate, EntityTypePredicate, DistancePredicate, NbtPredicate, EntitySubPredicate, EntityPredicate, StatePropertiesPredicate, FluidPredicate, EnchantmentPredicate, ItemPredicate, LightPredicate, LocationPredicate, GameTypePredicate, PlayerPredicate } from 'net.minecraft.advancements.critereon';
  import { Builder as damagesourcepredicate_Builder } from 'DamageSourcePredicate';
  import { DamageType } from 'net.minecraft.world.damagesource';
  import { Builder as entitypredicate_Builder } from 'EntityPredicate';
  import { DataComponentPredicate, DataComponentType } from 'net.minecraft.core.component';
  import { Builder as datacomponentpredicate_Builder } from 'DataComponentPredicate';
  import { Class, Boolean } from 'java.lang';
  import { Builder as entityequipmentpredicate_Builder } from 'EntityEquipmentPredicate';
  import { Builder as itempredicate_Builder } from 'ItemPredicate';
  import { Builder as entityflagspredicate_Builder } from 'EntityFlagsPredicate';
  import { Builder as locationpredicate_Builder } from 'LocationPredicate';
  import { Builder as mobeffectspredicate_Builder } from 'MobEffectsPredicate';
  import { Builder as playerpredicate_Builder } from 'PlayerPredicate';
  import { Builder as fluidpredicate_Builder } from 'FluidPredicate';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Item } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Ints, Doubles } from 'MinMaxBounds';
  import { Potion } from 'net.minecraft.world.item.alchemy';
  import { Builder as lightpredicate_Builder } from 'LightPredicate';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map } from 'java.util';

  class ExpandBlockPredicateBuilder {
    static blocks(internal: Builder, ...blocks: Block[]): Builder;
    static build(internal: Builder): BlockPredicate;
    static nbt(internal: Builder, tag: MapData): Builder;
    static nbt(internal: Builder, tag: IData): Builder;
    static properties(internal: Builder, predicate: statepropertiespredicate_Builder): Builder;
    static tag(internal: Builder, tag: KnownTag<Block>): Builder;
  }


  class ExpandDamageSourcePredicateBuilder {
    static build(internal: damagesourcepredicate_Builder): DamageSourcePredicate;
    static direct(internal: damagesourcepredicate_Builder, entityPredicate: entitypredicate_Builder): damagesourcepredicate_Builder;
    static source(internal: damagesourcepredicate_Builder, entityPredicate: entitypredicate_Builder): damagesourcepredicate_Builder;
    static tag(internal: damagesourcepredicate_Builder, tag: TagPredicate<DamageType>): damagesourcepredicate_Builder;
  }


  class ExpandDataComponentPredicateBuilder {
    static build(internal: datacomponentpredicate_Builder): DataComponentPredicate;
    static empty(): DataComponentPredicate;
    static expect<T>(internal: datacomponentpredicate_Builder, tClass: Class<T>, type: DataComponentType<T>, value: T): datacomponentpredicate_Builder;
  }


  class ExpandEntityEquipmentPredicateBuilder {
    static build(internal: entityequipmentpredicate_Builder): EntityEquipmentPredicate;
    static chest(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
    static feet(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
    static head(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
    static legs(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
    static mainHand(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
    static offHand(internal: entityequipmentpredicate_Builder, predicate: itempredicate_Builder): entityequipmentpredicate_Builder;
  }


  class ExpandEntityFlagsPredicateBuilder {
    static baby(internal: entityflagspredicate_Builder, baby: boolean): entityflagspredicate_Builder;
    static build(internal: entityflagspredicate_Builder): EntityFlagsPredicate;
    static crouching(internal: entityflagspredicate_Builder, crouching: boolean): entityflagspredicate_Builder;
    static onFire(internal: entityflagspredicate_Builder, onFire: boolean): entityflagspredicate_Builder;
    static sprinting(internal: entityflagspredicate_Builder, sprinting: boolean): entityflagspredicate_Builder;
    static swimming(internal: entityflagspredicate_Builder, swimming: boolean): entityflagspredicate_Builder;
  }


  class ExpandEntityPredicateBuilder {
    static build(internal: entitypredicate_Builder): EntityPredicate;
    static distance(internal: entitypredicate_Builder, predicate: DistancePredicate): entitypredicate_Builder;
    static effects(internal: entitypredicate_Builder, predicate: mobeffectspredicate_Builder): entitypredicate_Builder;
    static entityType(internal: entitypredicate_Builder, predicate: EntityTypePredicate): entitypredicate_Builder;
    static equipment(internal: entitypredicate_Builder, predicate: EntityEquipmentPredicate): entitypredicate_Builder;
    static equipment(internal: entitypredicate_Builder, predicate: entityequipmentpredicate_Builder): entitypredicate_Builder;
    static flags(internal: entitypredicate_Builder, predicate: entityflagspredicate_Builder): entitypredicate_Builder;
    static located(internal: entitypredicate_Builder, predicate: locationpredicate_Builder): entitypredicate_Builder;
    static nbt(internal: entitypredicate_Builder, predicate: NbtPredicate): entitypredicate_Builder;
    static passenger(internal: entitypredicate_Builder, predicate: entitypredicate_Builder): entitypredicate_Builder;
    static steppingOn(internal: entitypredicate_Builder, predicate: locationpredicate_Builder): entitypredicate_Builder;
    static subPredicate(internal: entitypredicate_Builder, predicate: EntitySubPredicate): entitypredicate_Builder;
    static subPredicate(internal: entitypredicate_Builder, predicate: playerpredicate_Builder): entitypredicate_Builder;
    static target(internal: entitypredicate_Builder, predicate: entitypredicate_Builder): entitypredicate_Builder;
    static team(internal: entitypredicate_Builder, team: string): entitypredicate_Builder;
    static vehicle(internal: entitypredicate_Builder, predicate: entitypredicate_Builder): entitypredicate_Builder;
  }


  class ExpandFluidPredicateBuilder {
    static blocks(internal: fluidpredicate_Builder, fluid: Fluid): fluidpredicate_Builder;
    static build(internal: fluidpredicate_Builder): FluidPredicate;
    static properties(internal: fluidpredicate_Builder, predicate: StatePropertiesPredicate): fluidpredicate_Builder;
    static tag(internal: fluidpredicate_Builder, tag: KnownTag<Fluid>): fluidpredicate_Builder;
  }


  class ExpandItemPredicateBuilder {
    static amount(internal: itempredicate_Builder, amount: Ints): itempredicate_Builder;
    static build(internal: itempredicate_Builder): ItemPredicate;
    static customData(internal: itempredicate_Builder, nbt: MapData): itempredicate_Builder;
    static customData(internal: itempredicate_Builder, nbt: IData): itempredicate_Builder;
    static durability(internal: itempredicate_Builder, durability: Ints): itempredicate_Builder;
    static enchantedWith(internal: itempredicate_Builder, predicate: EnchantmentPredicate): itempredicate_Builder;
    static items(internal: itempredicate_Builder, ...items: Item[]): itempredicate_Builder;
    static items(internal: itempredicate_Builder, ...items: IItemStack[]): itempredicate_Builder;
    static potion(internal: itempredicate_Builder, potion: Potion): itempredicate_Builder;
    static storingEnchantment(internal: itempredicate_Builder, predicate: EnchantmentPredicate): itempredicate_Builder;
    static tag(internal: itempredicate_Builder, tag: KnownTag<Item>): itempredicate_Builder;
  }


  class ExpandLightPredicateBuilder {
    static build(internal: lightpredicate_Builder): LightPredicate;
    static composite(internal: lightpredicate_Builder, composite: Ints): lightpredicate_Builder;
  }


  class ExpandLocationPredicateBuilder {
    static biome(internal: locationpredicate_Builder, biome: ResourceLocation): locationpredicate_Builder;
    static biome(internal: locationpredicate_Builder, biome: string): locationpredicate_Builder;
    static block(internal: locationpredicate_Builder, predicate: Builder): locationpredicate_Builder;
    static build(internal: locationpredicate_Builder): LocationPredicate;
    static dimension(internal: locationpredicate_Builder, dimension: ResourceLocation): locationpredicate_Builder;
    static dimension(internal: locationpredicate_Builder, dimension: string): locationpredicate_Builder;
    static fluid(internal: locationpredicate_Builder, predicate: fluidpredicate_Builder): locationpredicate_Builder;
    static light(internal: locationpredicate_Builder, predicate: lightpredicate_Builder): locationpredicate_Builder;
    static smokey(internal: locationpredicate_Builder, smokey: boolean): locationpredicate_Builder;
    static structure(internal: locationpredicate_Builder, structure: ResourceLocation): locationpredicate_Builder;
    static structure(internal: locationpredicate_Builder, structure: string): locationpredicate_Builder;
    static x(internal: locationpredicate_Builder, x: Doubles): locationpredicate_Builder;
    static y(internal: locationpredicate_Builder, y: Doubles): locationpredicate_Builder;
    static z(internal: locationpredicate_Builder, z: Doubles): locationpredicate_Builder;
  }


  class ExpandPlayerPredicateBuilder {
    static advancement(internal: playerpredicate_Builder, name: ResourceLocation, completed: boolean): playerpredicate_Builder;
    static advancement(internal: playerpredicate_Builder, name: string, completed: boolean): playerpredicate_Builder;
    static advancementCriteria(internal: playerpredicate_Builder, name: ResourceLocation, criteria: Map<string, boolean>): playerpredicate_Builder;
    static advancementCriteria(internal: playerpredicate_Builder, name: string, criteria: Map<string, boolean>): playerpredicate_Builder;
    static advancementCriterion(internal: playerpredicate_Builder, name: ResourceLocation, criterion: string, completed: boolean): playerpredicate_Builder;
    static advancementCriterion(internal: playerpredicate_Builder, name: string, criterion: string, completed: boolean): playerpredicate_Builder;
    static build(internal: playerpredicate_Builder): PlayerPredicate;
    static gameType(internal: playerpredicate_Builder, predicate: GameTypePredicate): playerpredicate_Builder;
    static level(internal: playerpredicate_Builder, level: Ints): playerpredicate_Builder;
    static lookingAt(internal: playerpredicate_Builder, predicate: entitypredicate_Builder): playerpredicate_Builder;
    static recipe(internal: playerpredicate_Builder, name: ResourceLocation, unlocked: boolean): playerpredicate_Builder;
    static recipe(internal: playerpredicate_Builder, name: string, unlocked: boolean): playerpredicate_Builder;
    static statistic(internal: playerpredicate_Builder, type: ResourceLocation, name: ResourceLocation, value: Ints): playerpredicate_Builder;
    static statistic(internal: playerpredicate_Builder, type: ResourceLocation, name: string, value: Ints): playerpredicate_Builder;
    static statistic(internal: playerpredicate_Builder, type: string, name: ResourceLocation, value: Ints): playerpredicate_Builder;
    static statistic(internal: playerpredicate_Builder, type: string, name: string, value: Ints): playerpredicate_Builder;
  }


  class ExpandStatePropertiesPredicateBuilder {
    static build(internal: statepropertiespredicate_Builder): StatePropertiesPredicate;
  }

}

declare module 'com.blamejared.crafttweaker.natives.predicate' {
  import { Builder } from 'BlockPredicate';
  import { Block } from 'net.minecraft.world.level.block';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { BlockPredicate, DamageSourcePredicate, DistancePredicate, EnchantmentPredicate, EntityEquipmentPredicate, EntityFlagsPredicate, EntityPredicate, EntitySubPredicate, EntityTypePredicate, FishingHookPredicate, FluidPredicate, GameTypePredicate, ItemPredicate, LightningBoltPredicate, LightPredicate, LocationPredicate, MobEffectsPredicate, NbtPredicate, PlayerPredicate, SlimePredicate, StatePropertiesPredicate, TagPredicate } from 'net.minecraft.advancements.critereon';
  import { ServerLevel, ServerPlayer } from 'net.minecraft.server.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Builder as damagesourcepredicate_Builder } from 'DamageSourcePredicate';
  import { DamageSource } from 'net.minecraft.world.damagesource';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Builder as datacomponentpredicate_Builder } from 'DataComponentPredicate';
  import { DataComponentPredicate, DataComponentMap } from 'net.minecraft.core.component';
  import { Doubles, Ints } from 'MinMaxBounds';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Builder as entityequipmentpredicate_Builder } from 'EntityEquipmentPredicate';
  import { Entity, EntityType } from 'net.minecraft.world.entity';
  import { Builder as entityflagspredicate_Builder } from 'EntityFlagsPredicate';
  import { Builder as entitypredicate_Builder } from 'EntityPredicate';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Builder as fluidpredicate_Builder } from 'FluidPredicate';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { GameType } from 'net.minecraft.world.level';
  import { Builder as itempredicate_Builder } from 'ItemPredicate';
  import { Item } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Builder as lightpredicate_Builder } from 'LightPredicate';
  import { Builder as locationpredicate_Builder } from 'LocationPredicate';
  import { Map } from 'java.util';
  import { MobEffect, MobEffectInstance } from 'net.minecraft.world.effect';
  import { MobEffectInstancePredicate } from 'MobEffectsPredicate';
  import { Boolean, Class } from 'java.lang';
  import { MapData, IData } from 'com.blamejared.crafttweaker.api.data';
  import { Builder as playerpredicate_Builder } from 'PlayerPredicate';
  import { Builder as statepropertiespredicate_Builder } from 'StatePropertiesPredicate';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { MCTag } from 'com.blamejared.crafttweaker.api.tag';

  class ExpandBlockPredicate {
    static create(): Builder;
    static create(...blocks: Block[]): Builder;
    static create(tag: KnownTag<Block>): Builder;
    static matches(internal: BlockPredicate, level: ServerLevel, pos: BlockPos): boolean;
  }


  class ExpandDamageSourcePredicate {
    static create(): damagesourcepredicate_Builder;
    static matches(internal: DamageSourcePredicate, player: ServerPlayer, source: DamageSource): boolean;
    static matches(internal: DamageSourcePredicate, level: ServerLevel, pos: Vec3, source: DamageSource): boolean;
  }


  class ExpandDataComponentPredicate {
    static allOf(map: DataComponentMap): DataComponentPredicate;
    static create(): datacomponentpredicate_Builder;
  }


  class ExpandDistancePredicate {
    static absoluteDistance(bounds: Doubles): DistancePredicate;
    static create(x: Doubles, y: Doubles, z: Doubles, horizontal: Doubles, absolute: Doubles): DistancePredicate;
    static horizontalDistance(bounds: Doubles): DistancePredicate;
    static verticalDistance(bounds: Doubles): DistancePredicate;
    static xyz(x: Doubles, y: Doubles, z: Doubles): DistancePredicate;
  }


  class ExpandEnchantmentPredicate {
    static create(enchantment: Enchantment): EnchantmentPredicate;
    static create(level: Ints): EnchantmentPredicate;
    static create(enchantment: Enchantment, level: Ints): EnchantmentPredicate;
  }


  class ExpandEntityEquipmentPredicate {
    static captain(): EntityEquipmentPredicate;
    static create(): entityequipmentpredicate_Builder;
    static matches(internal: EntityEquipmentPredicate, entity: Entity): boolean;
  }


  class ExpandEntityFlagsPredicate {
    static create(): entityflagspredicate_Builder;
    static matches(internal: EntityFlagsPredicate, entity: Entity): boolean;
  }


  class ExpandEntityPredicate {
    static create(): entitypredicate_Builder;
    static create(entityType: EntityType<any>): entitypredicate_Builder;
    static create(entityTag: KnownTag<EntityType<any>>): entitypredicate_Builder;
    static matches(internal: EntityPredicate, player: ServerPlayer, entity: Entity): boolean;
    static matches(internal: EntityPredicate, level: ServerLevel, pos: Vec3, entity: Entity): boolean;
  }


  class ExpandEntitySubPredicate {
  }


  class ExpandEntitySubPredicates {
    static catVariant(...variants: ResourceLocation[]): EntitySubPredicate;
    static frogVariant(...variants: ResourceLocation[]): EntitySubPredicate;
    static paintingVariant(...variants: ResourceLocation[]): EntitySubPredicate;
    static wolfVariant(...variants: ResourceLocation[]): EntitySubPredicate;
  }


  class ExpandEntityTypePredicate {
    static create(type: EntityType<any>): EntityTypePredicate;
    static create(type: KnownTag<EntityType<any>>): EntityTypePredicate;
    static matches(internal: EntityTypePredicate, type: EntityType<any>): boolean;
  }


  class ExpandFishingHookPredicate {
    static any(): FishingHookPredicate;
    static inOpenWaters(inOpenWaters: boolean): FishingHookPredicate;
    static matches(internal: FishingHookPredicate, entity: Entity, level: ServerLevel, pos: Vec3): boolean;
  }


  class ExpandFluidPredicate {
    static create(): fluidpredicate_Builder;
    static create(fluid: Fluid): fluidpredicate_Builder;
    static create(tag: KnownTag<Fluid>): fluidpredicate_Builder;
    static matches(internal: FluidPredicate, level: ServerLevel, pos: BlockPos): boolean;
  }


  class ExpandGameTypePredicate {
    static create(...gameTypes: GameType[]): GameTypePredicate;
  }


  class ExpandItemPredicate {
    static create(): itempredicate_Builder;
    static create(...items: Item[]): itempredicate_Builder;
    static create(...items: IItemStack[]): itempredicate_Builder;
    static create(tag: KnownTag<Item>): itempredicate_Builder;
    static test(internal: ItemPredicate, stack: IItemStack): boolean;
  }


  class ExpandLightningBoltPredicate {
    static create(blocksSetOnFire: Ints): LightningBoltPredicate;
    static create(struckEntity: EntityPredicate): LightningBoltPredicate;
    static create(blocksSetOnFire: Ints, struckEntity: EntityPredicate): LightningBoltPredicate;
    static create(blockSetOnFire: Ints, struckEntity: entitypredicate_Builder): LightningBoltPredicate;
    static matches(internal: LightningBoltPredicate, entity: Entity, level: ServerLevel, pos: Vec3): boolean;
  }


  class ExpandLightPredicate {
    static create(): lightpredicate_Builder;
    static create(level: Ints): lightpredicate_Builder;
    static matches(internal: LightPredicate, level: ServerLevel, pos: BlockPos): boolean;
  }


  class ExpandLocationPredicate {
    static at(x: Doubles, y: Doubles, z: Doubles): LocationPredicate;
    static create(): locationpredicate_Builder;
  }


  class ExpandMinMaxBoundsDoubles {
    static any(): Doubles;
    static atLeast(min: number): Doubles;
    static atMost(max: number): Doubles;
    static between(min: number, max: number): Doubles;
    static exactly(value: number): Doubles;
    static matches(internal: Doubles, value: number): boolean;
    static matchesSqr(internal: Doubles, value: number): boolean;
  }


  class ExpandMinMaxBoundsInts {
    static any(): Ints;
    static atLeast(min: number): Ints;
    static atMost(max: number): Ints;
    static between(min: number, max: number): Ints;
    static exactly(value: number): Ints;
    static matches(internal: Ints, value: number): boolean;
    static matchesSqr(internal: Ints, value: number): boolean;
  }


  class ExpandMobEffectsPredicate {
    static create(map: Map<MobEffect, MobEffectInstancePredicate>): MobEffectsPredicate;
    static create(effect: MobEffect, predicate: MobEffectInstancePredicate): MobEffectsPredicate;
    static matches(internal: MobEffectsPredicate, entity: Entity): boolean;
  }


  class ExpandMobEffectsPredicateMobEffectInstancePredicate {
    static ambient(): MobEffectInstancePredicate;
    static amplifier(amplifier: Ints): MobEffectInstancePredicate;
    static any(): MobEffectInstancePredicate;
    static create(amplifier: Ints, duration: Ints, ambient: boolean, visible: boolean): MobEffectInstancePredicate;
    static create(amplifier: Ints, duration: Ints, ambient: boolean): MobEffectInstancePredicate;
    static create(amplifier: Ints, duration: Ints): MobEffectInstancePredicate;
    static duration(duration: Ints): MobEffectInstancePredicate;
    static matches(internal: MobEffectInstancePredicate, instance: MobEffectInstance): boolean;
  }


  class ExpandNbtPredicate {
    static create(data: MapData): NbtPredicate;
    static create(data: IData): NbtPredicate;
    static matches(internal: NbtPredicate, data: IItemStack): boolean;
    static matches(internal: NbtPredicate, data: Entity): boolean;
    static matches(internal: NbtPredicate, data: IData): boolean;
  }


  class ExpandPlayerPredicate {
    static any(): PlayerPredicate;
    static create(): playerpredicate_Builder;
    static matches(internal: PlayerPredicate, entity: Entity, level: ServerLevel, pos: Vec3): boolean;
  }


  class ExpandSlimePredicate {
    static create(size: Ints): SlimePredicate;
    static matches(internal: SlimePredicate, entity: Entity, level: ServerLevel, pos: Vec3): boolean;
  }


  class ExpandStatePropertiesPredicate {
    static create(): statepropertiespredicate_Builder;
    static matches(internal: StatePropertiesPredicate, state: BlockState): boolean;
  }


  class ExpandTagPredicate {
    static isIn<T>(tClass: Class<T>, tag: MCTag): TagPredicate<T>;
    static isNotIn<T>(tClass: Class<T>, tag: MCTag): TagPredicate<T>;
  }

}

declare module 'com.blamejared.crafttweaker.natives.recipe.category' {
  class ExpandCookingBookCategory {
  }


  class ExpandCraftingBookCategory {
  }

}

declare module 'com.blamejared.crafttweaker.natives.recipe' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeHolder, Recipe, RecipeInput } from 'net.minecraft.world.item.crafting';

  class ExpandRecipeHolder {
    static id(internal: RecipeHolder<Recipe<RecipeInput>>): ResourceLocation;
    static value(internal: RecipeHolder<Recipe<RecipeInput>>): Recipe<RecipeInput>;
  }

}

declare module 'com.blamejared.crafttweaker.natives.recipe.input' {
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { RecipeInput } from 'net.minecraft.world.item.crafting';

  class ExpandRecipeInput {
    static getItem(internal: RecipeInput, slot: number): IItemStack;
    static isEmpty(internal: RecipeInput): boolean;
    static size(internal: RecipeInput): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.recipe.input.type' {
  import { CraftingInput, SingleRecipeInput, SmithingRecipeInput } from 'net.minecraft.world.item.crafting';
  import { List } from 'java.util';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ItemStack } from 'net.minecraft.world.item';

  class ExpandCraftingInput {
    static getItem(internal: CraftingInput, col: number, row: number): ItemStack;
    static height(internal: CraftingInput): number;
    static ingredientCount(internal: CraftingInput): number;
    static items(internal: CraftingInput): IItemStack[];
    static of(width: number, height: number, items: IItemStack[]): CraftingInput;
    static width(internal: CraftingInput): number;
  }


  class ExpandSingleRecipeInput {
    static item(internal: SingleRecipeInput): IItemStack;
    static of(item: IItemStack): SingleRecipeInput;
  }


  class ExpandSmithingRecipeInput {
    static addition(internal: SmithingRecipeInput): ItemStack;
    static base(internal: SmithingRecipeInput): ItemStack;
    static of(template: IItemStack, base: IItemStack, addition: IItemStack): SmithingRecipeInput;
    static template(internal: SmithingRecipeInput): ItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.natives.recipe.type' {
  import { AbstractCookingRecipe, Recipe, ShapedRecipe, ShapelessRecipe } from 'net.minecraft.world.item.crafting';
  import { List } from 'java.util';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  class ExpandAbstractCookingRecipe {
    static getCookingTime(internal: AbstractCookingRecipe): number;
    static getExperience(internal: AbstractCookingRecipe): number;
  }


  class ExpandBlastingRecipe {
  }


  class ExpandCampfireCookingRecipe {
  }


  class ExpandCraftingRecipe {
  }


  class ExpandRecipe {
    static canCraftInDimensions(internal: Recipe, var1: number, var2: number): boolean;
    static getGroup(internal: Recipe): string;
    static getIngredients(internal: Recipe): IIngredient[];
    static getResultItem(internal: Recipe): IItemStack;
    static getToastSymbol(internal: Recipe): ItemStack;
    static isIncomplete(internal: Recipe): boolean;
    static isSpecial(internal: Recipe): boolean;
  }


  class ExpandShapedRecipe {
    static getHeight(internal: ShapedRecipe): number;
    static getIngredientArray(internal: ShapedRecipe): IIngredient[][];
    static getWidth(internal: ShapedRecipe): number;
  }


  class ExpandShapelessRecipe {
    static getIngredientArray(internal: ShapelessRecipe): IIngredient[];
  }


  class ExpandSingleItemRecipe {
  }


  class ExpandSmeltingRecipe {
  }


  class ExpandSmokingRecipe {
  }


  class ExpandStonecutterRecipe {
  }


  class ExpandUpgradeRecipe {
  }

}

declare module 'com.blamejared.crafttweaker.natives.resource' {
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { IData } from 'com.blamejared.crafttweaker.api.data';

  class ExpandResourceKey {
    static create(base: ResourceKey, location: ResourceLocation): ResourceKey;
    static createRegistryKey(location: ResourceLocation): ResourceKey;
    static location(internal: ResourceKey): ResourceLocation;
    static registry(internal: ResourceKey): ResourceLocation;
  }


  class ExpandResourceLocation {
    static readonly ZC_CLASS_NAME: string;
    static asData(internal: ResourceLocation): IData;
    static compareTo(internal: ResourceLocation, other: ResourceLocation): number;
    static equals(internal: ResourceLocation, other: any): boolean;
    static fromNamespaceAndPath(namespace: string, path: string): ResourceLocation;
    static getCommandString(internal: ResourceLocation): string;
    static getNamespace(internal: ResourceLocation): string;
    static getPath(internal: ResourceLocation): string;
    static hashCode(internal: ResourceLocation): number;
    static parse(id: string): ResourceLocation;
    static toString(internal: ResourceLocation): string;
  }

}

declare module 'com.blamejared.crafttweaker.natives.server' {
  import { Filterable } from 'net.minecraft.server.network';
  import { NullableT } from '@ZenCodeType';
  import { Optional, List, UUID } from 'java.util';
  import { Function } from 'java.util.function';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PlayerList } from 'net.minecraft.server.players';
  import { MinecraftServer } from 'net.minecraft.server';

  class ExpandFilterable {
    static filtered<T>(internal: Filterable<T>): NullableT;
    static getFiltered<T>(internal: Filterable<T>, filtered: boolean): T;
    static map<T, U>(internal: Filterable<T>, mapper: Function<T, U>): Filterable<U>;
    static of<T>(raw: T, filtered: T): Filterable<T>;
    static raw<T>(internal: Filterable<T>): T;
    static resolve<T, U>(internal: Filterable<T>, resolver: Function<T, Optional<U>>): Optional<Filterable<U>>;
  }


  class ExpandPlayerList {
    static getMaxPlayers(internal: PlayerList): number;
    static getPlayer(internal: PlayerList, uuid: UUID): ServerPlayer;
    static getPlayerByName(internal: PlayerList, name: string): ServerPlayer;
    static getPlayerCount(internal: PlayerList): number;
    static getPlayers(internal: PlayerList): ServerPlayer[];
    static getServer(internal: PlayerList): MinecraftServer;
    static getSimulationDistance(internal: PlayerList): number;
    static getViewDistance(internal: PlayerList): number;
    static isAllowCommandsForAllPlayers(internal: PlayerList): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.sound' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { SoundType } from 'net.minecraft.world.level.block';

  class ExpandSoundEvent {
    static getCommandString(internal: SoundEvent): string;
    static getLocation(internal: SoundEvent): ResourceLocation;
    static getRegistryName(internal: SoundEvent): ResourceLocation;
  }


  class ExpandSoundSource {
    static getName(internal: SoundSource): string;
  }


  class ExpandSoundType {
    static getBreakSound(internal: SoundType): SoundEvent;
    static getFallSound(internal: SoundType): SoundEvent;
    static getHitSound(internal: SoundType): SoundEvent;
    static getPitch(internal: SoundType): number;
    static getPlaceSound(internal: SoundType): SoundEvent;
    static getStepSound(internal: SoundType): SoundEvent;
    static getVolume(internal: SoundType): number;
  }

}

declare module 'com.blamejared.crafttweaker.natives.text.content' {
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { Collection } from 'java.util';

  class ExpandCommonComponents {
    static readonly EMPTY: Component;
    static readonly OPTION_ON: Component;
    static readonly OPTION_OFF: Component;
    static readonly GUI_DONE: Component;
    static readonly GUI_CANCEL: Component;
    static readonly GUI_YES: Component;
    static readonly GUI_NO: Component;
    static readonly GUI_OK: Component;
    static readonly GUI_PROCEED: Component;
    static readonly GUI_CONTINUE: Component;
    static readonly GUI_BACK: Component;
    static readonly GUI_TO_TITLE: Component;
    static readonly GUI_ACKNOWLEDGE: Component;
    static readonly GUI_OPEN_IN_BROWSER: Component;
    static readonly GUI_COPY_LINK_TO_CLIPBOARD: Component;
    static readonly GUI_DISCONNECT: Component;
    static readonly CONNECT_FAILED: Component;
    static readonly NEW_LINE: Component;
    static readonly NARRATION_SEPARATOR: Component;
    static readonly ELLIPSIS: Component;
    static readonly SPACE: Component;
    static days(days: number): MutableComponent;
    static hours(hours: number): MutableComponent;
    static joinForNarration(...components: Component[]): MutableComponent;
    static joinLines(...components: Component[]): Component;
    static joinLines(components: Collection<Component>): Component;
    static minutes(minutes: number): MutableComponent;
    static optionNameValue(option: Component, value: Component): MutableComponent;
    static optionStatus(status: boolean): Component;
    static optionStatus(option: Component, status: boolean): MutableComponent;
    static space(): MutableComponent;
  }

}

declare module 'com.blamejared.crafttweaker.natives.text.content.type' {
  import { KeybindContents, NbtContents, PlainTextContents, ScoreContents, SelectorContents, TranslatableContents } from 'net.minecraft.network.chat.contents';
  import { Component } from 'net.minecraft.network.chat';

  class ExpandKeybindContents {
    static getName(internal: KeybindContents): string;
  }


  class ExpandLiteralContents {
  }


  class ExpandNbtContents {
    static getNbtPath(internal: NbtContents): string;
    static getSeparator(internal: NbtContents): Component;
    static isInterpreting(internal: NbtContents): boolean;
  }


  class ExpandPlainTextContents {
    static text(internal: PlainTextContents): string;
  }


  class ExpandScoreContents {
    static getName(internal: ScoreContents): string;
    static getObjective(internal: ScoreContents): string;
  }


  class ExpandSelectorContents {
    static getPattern(internal: SelectorContents): string;
    static getSeparator(internal: SelectorContents): Component;
  }


  class ExpandTranslatableContents {
    static getArgs(internal: TranslatableContents): string[];
    static getKey(internal: TranslatableContents): string;
  }

}

declare module 'com.blamejared.crafttweaker.natives.text' {
  import { ChatFormatting } from 'net.minecraft';
  import { Integer, Boolean } from 'java.lang';
  import { Style, Component, MutableComponent, ComponentContents, TextColor } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { Message } from 'com.mojang.brigadier';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandChatFormatting {
    static asStyle(internal: ChatFormatting): Style;
    static getChar(internal: ChatFormatting): string;
    static getColor(internal: ChatFormatting): number;
    static getId(internal: ChatFormatting): number;
    static getName(internal: ChatFormatting): string;
    static isColor(internal: ChatFormatting): boolean;
    static isFormat(internal: ChatFormatting): boolean;
    static toString(internal: ChatFormatting): string;
  }


  class ExpandComponent {
    static asIData(internal: Component): IData;
    static copy(internal: Component): MutableComponent;
    static empty(): MutableComponent;
    static getContents(internal: Component): ComponentContents;
    static getSiblings(internal: Component): Component[];
    static getString(internal: Component, maxLength: number): string;
    static getStyle(internal: Component): Style;
    static keybind(name: string): MutableComponent;
    static literal(content: string): MutableComponent;
    static nullToEmpty(content: string): Component;
    static plainCopy(internal: Component): MutableComponent;
    static score(name: string, objective: string): MutableComponent;
    static selector(pattern: string, separator: Component): MutableComponent;
    static translatable(content: string, ...args: string[]): MutableComponent;
    static translatable(content: string, ...args: Component[]): MutableComponent;
  }


  class ExpandFormattedText {
  }


  class ExpandMessage {
    static getString(internal: Message): string;
  }


  class ExpandMutableComponent {
    static append(internal: MutableComponent, content: string): MutableComponent;
    static append(internal: MutableComponent, component: Component): MutableComponent;
    static append(internal: MutableComponent, component: MutableComponent): MutableComponent;
    static opAddComponent(internal: MutableComponent, content: Component): MutableComponent;
    static opAddMutableComponent(internal: MutableComponent, content: MutableComponent): MutableComponent;
    static opAddString(internal: MutableComponent, content: string): MutableComponent;
    static opCatComponent(internal: MutableComponent, content: Component): MutableComponent;
    static opCatMutableComponent(internal: MutableComponent, content: MutableComponent): MutableComponent;
    static opCatString(internal: MutableComponent, content: string): MutableComponent;
    static opShiftLeftComponent(internal: MutableComponent, content: Component): MutableComponent;
    static opShiftLeftMutableComponent(internal: MutableComponent, content: MutableComponent): MutableComponent;
    static opShiftLeftString(internal: MutableComponent, content: string): MutableComponent;
    static setStyle(internal: MutableComponent, style: Style): MutableComponent;
    static withStyle(internal: MutableComponent, styleOperator: Function<Style, Style>): MutableComponent;
    static withStyle(internal: MutableComponent, style: Style): MutableComponent;
    static withStyle(internal: MutableComponent, ...formatting: ChatFormatting[]): MutableComponent;
  }


  class ExpandStyle {
    static applyFormat(internal: Style, format: ChatFormatting): Style;
    static applyFormats(internal: Style, ...formattings: ChatFormatting[]): Style;
    static applyLegacyFormat(internal: Style, format: ChatFormatting): Style;
    static applyTo(internal: Style, style: Style): Style;
    static empty(): Style;
    static getColor(internal: Style): TextColor;
    static getFont(internal: Style): ResourceLocation;
    static getInsertion(internal: Style): string;
    static isBold(internal: Style): boolean;
    static isEmpty(internal: Style): boolean;
    static isItalic(internal: Style): boolean;
    static isObfuscated(internal: Style): boolean;
    static isStrikethrough(internal: Style): boolean;
    static isUnderlined(internal: Style): boolean;
    static setBold(internal: Style): Style;
    static setItalic(internal: Style): Style;
    static setObfuscated(internal: Style): Style;
    static setStrikethrough(internal: Style): Style;
    static setUnderlined(internal: Style): Style;
    static withBold(internal: Style, value: boolean): Style;
    static withColor(internal: Style, textColor: TextColor): Style;
    static withColor(internal: Style, formatting: ChatFormatting): Style;
    static withColor(internal: Style, color: number): Style;
    static withFont(internal: Style, fontId: ResourceLocation): Style;
    static withInsertion(internal: Style, content: string): Style;
    static withItalic(internal: Style, value: boolean): Style;
    static withObfuscated(internal: Style, value: boolean): Style;
    static withStrikethrough(internal: Style, value: boolean): Style;
    static withUnderlined(internal: Style, value: boolean): Style;
  }


  class ExpandTextColor {
    static getValue(internal: TextColor): number;
    static serialize(internal: TextColor): string;
  }

}

declare module 'com.blamejared.crafttweaker.natives.tooltip' {
  import { TooltipContext } from 'Item';
  import { Level } from 'net.minecraft.world.level';
  import { MapItemSavedData, MapId } from 'net.minecraft.world.level.saveddata.maps';
  import { TooltipFlag } from 'net.minecraft.world.item';

  class ExpandTooltipComponent {
  }


  class ExpandTooltipContext {
    static mapData(internal: TooltipContext, var1: MapId): MapItemSavedData;
    static of(level: Level): TooltipContext;
    static tickRate(internal: TooltipContext): number;
  }


  class ExpandTooltipFlag {
    static isAdvanced(internal: TooltipFlag): boolean;
    static isCreative(internal: TooltipFlag): boolean;
    static of(advanced: boolean, creative: boolean): TooltipFlag;
  }

}

declare module 'com.blamejared.crafttweaker.natives.util.collection' {
  class ExpandCollection {
  }

}

declare module 'com.blamejared.crafttweaker.natives.util.direction' {
  import { Axis, Plane, AxisDirection } from 'Direction';
  import { Direction, Vec3i } from 'net.minecraft.core';
  import { Quaternionf, Vector3f } from 'org.joml';
  import { RandomSource } from 'net.minecraft.util';
  import { Iterator } from 'java.util';

  class ExpandAxis {
    static choose(internal: Axis, x: number, y: number, z: number): number;
    static choose(internal: Axis, x: number, y: number, z: number): number;
    static getName(internal: Axis): string;
    static getPlane(internal: Axis): Plane;
    static isHorizontal(internal: Axis): boolean;
    static isVertical(internal: Axis): boolean;
    static test(internal: Axis, direction: Direction): boolean;
  }


  class ExpandAxisDirection {
    static getName(internal: AxisDirection): string;
    static getStep(internal: AxisDirection): number;
    static opposite(internal: AxisDirection): AxisDirection;
  }


  class ExpandDirection {
    static getAxis(internal: Direction): Axis;
    static getAxisDirection(internal: Direction): AxisDirection;
    static getClockWise(internal: Direction, axis: Axis): Direction;
    static getClockWise(internal: Direction): Direction;
    static getCounterClockWise(internal: Direction, axis: Axis): Direction;
    static getCounterClockWise(internal: Direction): Direction;
    static getName(internal: Direction): string;
    static getNormal(internal: Direction): Vec3i;
    static getOpposite(internal: Direction): Direction;
    static getRotation(internal: Direction): Quaternionf;
    static getStepX(internal: Direction): number;
    static getStepY(internal: Direction): number;
    static getStepZ(internal: Direction): number;
    static isFacingAngle(internal: Direction, degrees: number): boolean;
    static step(internal: Direction): Vector3f;
    static toYRot(internal: Direction): number;
  }


  class ExpandPlane {
    static getRandomAxis(internal: Plane, random: RandomSource): Axis;
    static getRandomDirection(internal: Plane, random: RandomSource): Direction;
    static iterator(internal: Plane): Iterator<Direction>;
    static test(internal: Plane, direction: Direction): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.util' {
  import { BlockHitResult, EntityHitResult, HitResult, Vec3 } from 'net.minecraft.world.phys';
  import { Direction, BlockPos, GlobalPos, Position } from 'net.minecraft.core';
  import { Type } from 'HitResult';
  import { Entity } from 'net.minecraft.world.entity';
  import { UUID } from 'java.util';
  import { GameProfile } from 'com.mojang.authlib';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Class } from 'java.lang';
  import { StringRepresentable } from 'net.minecraft.util';
  import { TriState } from 'net.neoforged.neoforge.common.util';

  class ExpandBlockHitResult {
    static getBlockPos(internal: BlockHitResult): BlockPos;
    static getDirection(internal: BlockHitResult): Direction;
    static getType(internal: BlockHitResult): Type;
    static isInside(internal: BlockHitResult): boolean;
    static withDirection(internal: BlockHitResult, param0: Direction): BlockHitResult;
    static withPosition(internal: BlockHitResult, param0: BlockPos): BlockHitResult;
  }


  class ExpandEntityHitResult {
    static getEntity(internal: EntityHitResult): Entity;
    static getType(internal: EntityHitResult): Type;
  }


  class ExpandGameProfile {
    static getId(internal: GameProfile): UUID;
    static getName(internal: GameProfile): string;
  }


  class ExpandGlobalPos {
    static dimension(internal: GlobalPos): ResourceKey<Level>;
    static of($$0: ResourceKey<Level>, $$1: BlockPos): GlobalPos;
    static pos(internal: GlobalPos): BlockPos;
  }


  class ExpandHitResult {
    static distanceTo(internal: HitResult, entity: Entity): number;
    static getLocation(internal: HitResult): Vec3;
    static getType(internal: HitResult): Type;
  }


  class ExpandHitResultType {
  }


  class ExpandInteractionHand {
  }


  class ExpandPair {
    static of<F, S>(fClass: Class<F>, sClass: Class<S>, first: F, second: S): Pair<F, S>;
  }


  class ExpandPosition {
    static x(internal: Position): number;
    static y(internal: Position): number;
    static z(internal: Position): number;
  }


  class ExpandStringRepresentable {
    static getSerializedName(internal: StringRepresentable): string;
  }


  class ExpandTriState {
    static isDefault(internal: TriState): boolean;
    static isFalse(internal: TriState): boolean;
    static isTrue(internal: TriState): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.util.math' {
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { Axis } from 'Direction';
  import { BlockPos, AxisCycle, Position, Vec3i, Direction, FrontAndTop } from 'net.minecraft.core';
  import { Rotation } from 'net.minecraft.world.level.block';
  import { MutableBlockPos } from 'BlockPos';
  import { Matrix3f, Matrix3fc, Matrix4x3fc, Matrix4fc, Matrix2fc, AxisAngle4f, AxisAngle4d, Quaternionfc, Quaterniondc, Vector3fc, Matrix4f, Quaternionf, Quaterniond, Vector3f } from 'org.joml';
  import { NumberFormat } from 'java.text';
  import { FloatBuffer, ByteBuffer } from 'java.nio';
  import { ObjectOutput, ObjectInput } from 'java.io';
  import { OctahedralGroup } from 'com.mojang.math';
  import { Random } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';

  class ExpandAABB {
    static clip(internal: AABB, minVec: Vec3, maxVec: Vec3): Vec3;
    static contains(internal: AABB, other: Vec3): boolean;
    static contains(internal: AABB, x: number, y: number, z: number): boolean;
    static contract(internal: AABB, x: number, y: number, z: number): AABB;
    static deflate(internal: AABB, x: number, y: number, z: number): AABB;
    static deflate(internal: AABB, scalar: number): AABB;
    static expandTowards(internal: AABB, vec: Vec3): AABB;
    static expandTowards(internal: AABB, x: number, y: number, z: number): AABB;
    static getCenter(internal: AABB): Vec3;
    static getSize(internal: AABB): number;
    static getXsize(internal: AABB): number;
    static getYsize(internal: AABB): number;
    static getZsize(internal: AABB): number;
    static hasNaN(internal: AABB): boolean;
    static inflate(internal: AABB, x: number, y: number, z: number): AABB;
    static inflate(internal: AABB, scalar: number): AABB;
    static intersect(internal: AABB, other: AABB): AABB;
    static intersects(internal: AABB, other: AABB): boolean;
    static intersects(internal: AABB, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    static intersects(internal: AABB, minVec: Vec3, maxVec: Vec3): boolean;
    static max(internal: AABB, direction: Axis): number;
    static min(internal: AABB, direction: Axis): number;
    static minmax(internal: AABB, other: AABB): AABB;
    static move(internal: AABB, x: number, y: number, z: number): AABB;
    static move(internal: AABB, pos: BlockPos): AABB;
    static move(internal: AABB, vec: Vec3): AABB;
    static setMaxX(internal: AABB, maxX: number): AABB;
    static setMaxY(internal: AABB, maxY: number): AABB;
    static setMaxZ(internal: AABB, maxZ: number): AABB;
    static setMinX(internal: AABB, minX: number): AABB;
    static setMinY(internal: AABB, minY: number): AABB;
    static setMinZ(internal: AABB, minZ: number): AABB;
  }


  class ExpandAxisCycle {
    static cycle(internal: AxisCycle, x: number, y: number, z: number, axis: Axis): number;
    static cycle(internal: AxisCycle, x: number, y: number, z: number, axis: Axis): number;
    static cycle(internal: AxisCycle, axis: Axis): Axis;
    static inverse(internal: AxisCycle): AxisCycle;
  }


  class ExpandBlockPos {
    static above(internal: BlockPos): BlockPos;
    static above(internal: BlockPos, distance: number): BlockPos;
    static asImmutable(internal: BlockPos): BlockPos;
    static asLong(internal: BlockPos): number;
    static asMutable(internal: BlockPos): MutableBlockPos;
    static atY(internal: BlockPos, value: number): BlockPos;
    static below(internal: BlockPos): BlockPos;
    static below(internal: BlockPos, distance: number): BlockPos;
    static containing(x: number, y: number, z: number): BlockPos;
    static containing(position: Position): BlockPos;
    static cross(internal: BlockPos, other: Vec3i): BlockPos;
    static east(internal: BlockPos): BlockPos;
    static east(internal: BlockPos, distance: number): BlockPos;
    static multiply(internal: BlockPos, scalar: number): BlockPos;
    static north(internal: BlockPos): BlockPos;
    static north(internal: BlockPos, distance: number): BlockPos;
    static offset(internal: BlockPos, x: number, y: number, z: number): BlockPos;
    static offset(internal: BlockPos, other: Vec3i): BlockPos;
    static relative(internal: BlockPos, direction: Direction): BlockPos;
    static relative(internal: BlockPos, direction: Direction, distance: number): BlockPos;
    static relative(internal: BlockPos, axis: Axis, distance: number): BlockPos;
    static rotate(internal: BlockPos, rotation: Rotation): BlockPos;
    static south(internal: BlockPos): BlockPos;
    static south(internal: BlockPos, distance: number): BlockPos;
    static subtract(internal: BlockPos, other: Vec3i): BlockPos;
    static west(internal: BlockPos): BlockPos;
    static west(internal: BlockPos, distance: number): BlockPos;
  }


  class ExpandFrontAndTop {
    static front(internal: FrontAndTop): Direction;
    static top(internal: FrontAndTop): Direction;
  }


  class ExpandMatrix3f {
    static add(other: Matrix3fc): Matrix3f;
    static add(other: Matrix3fc, dest: Matrix3f): Matrix3f;
    static cofactor(): Matrix3f;
    static cofactor(dest: Matrix3f): Matrix3f;
    static determinant(): number;
    static equals(m: Matrix3fc, delta: number): boolean;
    static get(dest: Matrix3f): Matrix3f;
    static get(dest: Matrix4f): Matrix4f;
    static get(buffer: FloatBuffer): FloatBuffer;
    static get(index: number, buffer: FloatBuffer): FloatBuffer;
    static get(buffer: ByteBuffer): ByteBuffer;
    static get(index: number, buffer: ByteBuffer): ByteBuffer;
    static get(arr: number[], offset: number): number[];
    static get(arr: number[]): number[];
    static get(column: number, row: number): number;
    static get3x4(buffer: FloatBuffer): FloatBuffer;
    static get3x4(index: number, buffer: FloatBuffer): FloatBuffer;
    static get3x4(buffer: ByteBuffer): ByteBuffer;
    static get3x4(index: number, buffer: ByteBuffer): ByteBuffer;
    static getColumn(column: number, dest: Vector3f): Vector3f;
    static getEulerAnglesXYZ(dest: Vector3f): Vector3f;
    static getEulerAnglesZYX(dest: Vector3f): Vector3f;
    static getNormalizedRotation(dest: Quaternionf): Quaternionf;
    static getNormalizedRotation(dest: Quaterniond): Quaterniond;
    static getRotation(dest: AxisAngle4f): AxisAngle4f;
    static getRow(row: number, dest: Vector3f): Vector3f;
    static getRowColumn(row: number, column: number): number;
    static getScale(dest: Vector3f): Vector3f;
    static getToAddress(address: number): Matrix3fc;
    static getTransposed(buffer: FloatBuffer): FloatBuffer;
    static getTransposed(index: number, buffer: FloatBuffer): FloatBuffer;
    static getTransposed(buffer: ByteBuffer): ByteBuffer;
    static getTransposed(index: number, buffer: ByteBuffer): ByteBuffer;
    static getUnnormalizedRotation(dest: Quaternionf): Quaternionf;
    static getUnnormalizedRotation(dest: Quaterniond): Quaterniond;
    static identity(): Matrix3f;
    static invert(): Matrix3f;
    static invert(dest: Matrix3f): Matrix3f;
    static isFinite(): boolean;
    static lerp(other: Matrix3fc, t: number): Matrix3f;
    static lerp(other: Matrix3fc, t: number, dest: Matrix3f): Matrix3f;
    static lookAlong(dir: Vector3fc, up: Vector3fc): Matrix3f;
    static lookAlong(dir: Vector3fc, up: Vector3fc, dest: Matrix3f): Matrix3f;
    static lookAlong(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number, dest: Matrix3f): Matrix3f;
    static lookAlong(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number): Matrix3f;
    static m00(): number;
    static m00(m00: number): Matrix3f;
    static m01(): number;
    static m01(m01: number): Matrix3f;
    static m02(): number;
    static m02(m02: number): Matrix3f;
    static m10(): number;
    static m10(m10: number): Matrix3f;
    static m11(): number;
    static m11(m11: number): Matrix3f;
    static m12(): number;
    static m12(m12: number): Matrix3f;
    static m20(): number;
    static m20(m20: number): Matrix3f;
    static m21(): number;
    static m21(m21: number): Matrix3f;
    static m22(): number;
    static m22(m22: number): Matrix3f;
    static mapXZY(): Matrix3f;
    static mapXZY(dest: Matrix3f): Matrix3f;
    static mapXZnY(): Matrix3f;
    static mapXZnY(dest: Matrix3f): Matrix3f;
    static mapXnYnZ(): Matrix3f;
    static mapXnYnZ(dest: Matrix3f): Matrix3f;
    static mapXnZY(): Matrix3f;
    static mapXnZY(dest: Matrix3f): Matrix3f;
    static mapXnZnY(): Matrix3f;
    static mapXnZnY(dest: Matrix3f): Matrix3f;
    static mapYXZ(): Matrix3f;
    static mapYXZ(dest: Matrix3f): Matrix3f;
    static mapYXnZ(): Matrix3f;
    static mapYXnZ(dest: Matrix3f): Matrix3f;
    static mapYZX(): Matrix3f;
    static mapYZX(dest: Matrix3f): Matrix3f;
    static mapYZnX(): Matrix3f;
    static mapYZnX(dest: Matrix3f): Matrix3f;
    static mapYnXZ(): Matrix3f;
    static mapYnXZ(dest: Matrix3f): Matrix3f;
    static mapYnXnZ(): Matrix3f;
    static mapYnXnZ(dest: Matrix3f): Matrix3f;
    static mapYnZX(): Matrix3f;
    static mapYnZX(dest: Matrix3f): Matrix3f;
    static mapYnZnX(): Matrix3f;
    static mapYnZnX(dest: Matrix3f): Matrix3f;
    static mapZXY(): Matrix3f;
    static mapZXY(dest: Matrix3f): Matrix3f;
    static mapZXnY(): Matrix3f;
    static mapZXnY(dest: Matrix3f): Matrix3f;
    static mapZYX(): Matrix3f;
    static mapZYX(dest: Matrix3f): Matrix3f;
    static mapZYnX(): Matrix3f;
    static mapZYnX(dest: Matrix3f): Matrix3f;
    static mapZnXY(): Matrix3f;
    static mapZnXY(dest: Matrix3f): Matrix3f;
    static mapZnXnY(): Matrix3f;
    static mapZnXnY(dest: Matrix3f): Matrix3f;
    static mapZnYX(): Matrix3f;
    static mapZnYX(dest: Matrix3f): Matrix3f;
    static mapZnYnX(): Matrix3f;
    static mapZnYnX(dest: Matrix3f): Matrix3f;
    static mapnXYnZ(): Matrix3f;
    static mapnXYnZ(dest: Matrix3f): Matrix3f;
    static mapnXZY(): Matrix3f;
    static mapnXZY(dest: Matrix3f): Matrix3f;
    static mapnXZnY(): Matrix3f;
    static mapnXZnY(dest: Matrix3f): Matrix3f;
    static mapnXnYZ(): Matrix3f;
    static mapnXnYZ(dest: Matrix3f): Matrix3f;
    static mapnXnYnZ(): Matrix3f;
    static mapnXnYnZ(dest: Matrix3f): Matrix3f;
    static mapnXnZY(): Matrix3f;
    static mapnXnZY(dest: Matrix3f): Matrix3f;
    static mapnXnZnY(): Matrix3f;
    static mapnXnZnY(dest: Matrix3f): Matrix3f;
    static mapnYXZ(): Matrix3f;
    static mapnYXZ(dest: Matrix3f): Matrix3f;
    static mapnYXnZ(): Matrix3f;
    static mapnYXnZ(dest: Matrix3f): Matrix3f;
    static mapnYZX(): Matrix3f;
    static mapnYZX(dest: Matrix3f): Matrix3f;
    static mapnYZnX(): Matrix3f;
    static mapnYZnX(dest: Matrix3f): Matrix3f;
    static mapnYnXZ(): Matrix3f;
    static mapnYnXZ(dest: Matrix3f): Matrix3f;
    static mapnYnXnZ(): Matrix3f;
    static mapnYnXnZ(dest: Matrix3f): Matrix3f;
    static mapnYnZX(): Matrix3f;
    static mapnYnZX(dest: Matrix3f): Matrix3f;
    static mapnYnZnX(): Matrix3f;
    static mapnYnZnX(dest: Matrix3f): Matrix3f;
    static mapnZXY(): Matrix3f;
    static mapnZXY(dest: Matrix3f): Matrix3f;
    static mapnZXnY(): Matrix3f;
    static mapnZXnY(dest: Matrix3f): Matrix3f;
    static mapnZYX(): Matrix3f;
    static mapnZYX(dest: Matrix3f): Matrix3f;
    static mapnZYnX(): Matrix3f;
    static mapnZYnX(dest: Matrix3f): Matrix3f;
    static mapnZnXY(): Matrix3f;
    static mapnZnXY(dest: Matrix3f): Matrix3f;
    static mapnZnXnY(): Matrix3f;
    static mapnZnXnY(dest: Matrix3f): Matrix3f;
    static mapnZnYX(): Matrix3f;
    static mapnZnYX(dest: Matrix3f): Matrix3f;
    static mapnZnYnX(): Matrix3f;
    static mapnZnYnX(dest: Matrix3f): Matrix3f;
    static mul(right: Matrix3fc): Matrix3f;
    static mul(right: Matrix3fc, dest: Matrix3f): Matrix3f;
    static mulComponentWise(other: Matrix3fc): Matrix3f;
    static mulComponentWise(other: Matrix3fc, dest: Matrix3f): Matrix3f;
    static mulLocal(left: Matrix3fc): Matrix3f;
    static mulLocal(left: Matrix3fc, dest: Matrix3f): Matrix3f;
    static negateX(): Matrix3f;
    static negateX(dest: Matrix3f): Matrix3f;
    static negateY(): Matrix3f;
    static negateY(dest: Matrix3f): Matrix3f;
    static negateZ(): Matrix3f;
    static negateZ(dest: Matrix3f): Matrix3f;
    static normal(): Matrix3f;
    static normal(dest: Matrix3f): Matrix3f;
    static normalizedPositiveX(dir: Vector3f): Vector3f;
    static normalizedPositiveY(dir: Vector3f): Vector3f;
    static normalizedPositiveZ(dir: Vector3f): Vector3f;
    static obliqueZ(a: number, b: number): Matrix3f;
    static obliqueZ(a: number, b: number, dest: Matrix3f): Matrix3f;
    static positiveX(dir: Vector3f): Vector3f;
    static positiveY(dir: Vector3f): Vector3f;
    static positiveZ(dir: Vector3f): Vector3f;
    static quadraticFormProduct(x: number, y: number, z: number): number;
    static quadraticFormProduct(v: Vector3fc): number;
    static readExternal(inParameter: ObjectInput): void;
    static reflect(nx: number, ny: number, nz: number, dest: Matrix3f): Matrix3f;
    static reflect(nx: number, ny: number, nz: number): Matrix3f;
    static reflect(normal: Vector3fc): Matrix3f;
    static reflect(orientation: Quaternionfc): Matrix3f;
    static reflect(orientation: Quaternionfc, dest: Matrix3f): Matrix3f;
    static reflect(normal: Vector3fc, dest: Matrix3f): Matrix3f;
    static reflection(nx: number, ny: number, nz: number): Matrix3f;
    static reflection(normal: Vector3fc): Matrix3f;
    static reflection(orientation: Quaternionfc): Matrix3f;
    static rotate(ang: number, x: number, y: number, z: number): Matrix3f;
    static rotate(ang: number, x: number, y: number, z: number, dest: Matrix3f): Matrix3f;
    static rotate(quat: Quaternionfc): Matrix3f;
    static rotate(quat: Quaternionfc, dest: Matrix3f): Matrix3f;
    static rotate(axisAngle: AxisAngle4f): Matrix3f;
    static rotate(axisAngle: AxisAngle4f, dest: Matrix3f): Matrix3f;
    static rotate(angle: number, axis: Vector3fc): Matrix3f;
    static rotate(angle: number, axis: Vector3fc, dest: Matrix3f): Matrix3f;
    static rotateLocal(ang: number, x: number, y: number, z: number, dest: Matrix3f): Matrix3f;
    static rotateLocal(ang: number, x: number, y: number, z: number): Matrix3f;
    static rotateLocal(quat: Quaternionfc, dest: Matrix3f): Matrix3f;
    static rotateLocal(quat: Quaternionfc): Matrix3f;
    static rotateLocalX(ang: number, dest: Matrix3f): Matrix3f;
    static rotateLocalX(ang: number): Matrix3f;
    static rotateLocalY(ang: number, dest: Matrix3f): Matrix3f;
    static rotateLocalY(ang: number): Matrix3f;
    static rotateLocalZ(ang: number, dest: Matrix3f): Matrix3f;
    static rotateLocalZ(ang: number): Matrix3f;
    static rotateTowards(direction: Vector3fc, up: Vector3fc, dest: Matrix3f): Matrix3f;
    static rotateTowards(direction: Vector3fc, up: Vector3fc): Matrix3f;
    static rotateTowards(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number): Matrix3f;
    static rotateTowards(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number, dest: Matrix3f): Matrix3f;
    static rotateX(ang: number, dest: Matrix3f): Matrix3f;
    static rotateX(ang: number): Matrix3f;
    static rotateXYZ(angles: Vector3f): Matrix3f;
    static rotateXYZ(angleX: number, angleY: number, angleZ: number): Matrix3f;
    static rotateXYZ(angleX: number, angleY: number, angleZ: number, dest: Matrix3f): Matrix3f;
    static rotateY(ang: number, dest: Matrix3f): Matrix3f;
    static rotateY(ang: number): Matrix3f;
    static rotateYXZ(angles: Vector3f): Matrix3f;
    static rotateYXZ(angleY: number, angleX: number, angleZ: number): Matrix3f;
    static rotateYXZ(angleY: number, angleX: number, angleZ: number, dest: Matrix3f): Matrix3f;
    static rotateZ(ang: number, dest: Matrix3f): Matrix3f;
    static rotateZ(ang: number): Matrix3f;
    static rotateZYX(angles: Vector3f): Matrix3f;
    static rotateZYX(angleZ: number, angleY: number, angleX: number): Matrix3f;
    static rotateZYX(angleZ: number, angleY: number, angleX: number, dest: Matrix3f): Matrix3f;
    static rotation(angle: number, axis: Vector3fc): Matrix3f;
    static rotation(axisAngle: AxisAngle4f): Matrix3f;
    static rotation(angle: number, x: number, y: number, z: number): Matrix3f;
    static rotation(quat: Quaternionfc): Matrix3f;
    static rotationTowards(dir: Vector3fc, up: Vector3fc): Matrix3f;
    static rotationTowards(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number): Matrix3f;
    static rotationX(ang: number): Matrix3f;
    static rotationXYZ(angleX: number, angleY: number, angleZ: number): Matrix3f;
    static rotationY(ang: number): Matrix3f;
    static rotationYXZ(angleY: number, angleX: number, angleZ: number): Matrix3f;
    static rotationZ(ang: number): Matrix3f;
    static rotationZYX(angleZ: number, angleY: number, angleX: number): Matrix3f;
    static scale(xyz: Vector3fc, dest: Matrix3f): Matrix3f;
    static scale(xyz: Vector3fc): Matrix3f;
    static scale(x: number, y: number, z: number, dest: Matrix3f): Matrix3f;
    static scale(x: number, y: number, z: number): Matrix3f;
    static scale(xyz: number, dest: Matrix3f): Matrix3f;
    static scale(xyz: number): Matrix3f;
    static scaleLocal(x: number, y: number, z: number, dest: Matrix3f): Matrix3f;
    static scaleLocal(x: number, y: number, z: number): Matrix3f;
    static scaling(factor: number): Matrix3f;
    static scaling(x: number, y: number, z: number): Matrix3f;
    static scaling(xyz: Vector3fc): Matrix3f;
    static set(m: Matrix3fc): Matrix3f;
    static set(m: Matrix4x3fc): Matrix3f;
    static set(mat: Matrix4fc): Matrix3f;
    static set(mat: Matrix2fc): Matrix3f;
    static set(axisAngle: AxisAngle4f): Matrix3f;
    static set(axisAngle: AxisAngle4d): Matrix3f;
    static set(q: Quaternionfc): Matrix3f;
    static set(q: Quaterniondc): Matrix3f;
    static set(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Matrix3f;
    static set(m: number[]): Matrix3f;
    static set(col0: Vector3fc, col1: Vector3fc, col2: Vector3fc): Matrix3f;
    static set(buffer: FloatBuffer): Matrix3f;
    static set(buffer: ByteBuffer): Matrix3f;
    static set(index: number, buffer: FloatBuffer): Matrix3f;
    static set(index: number, buffer: ByteBuffer): Matrix3f;
    static set(column: number, row: number, value: number): Matrix3f;
    static setColumn(column: number, src: Vector3fc): Matrix3f;
    static setColumn(column: number, x: number, y: number, z: number): Matrix3f;
    static setFromAddress(address: number): Matrix3f;
    static setLookAlong(dir: Vector3fc, up: Vector3fc): Matrix3f;
    static setLookAlong(dirX: number, dirY: number, dirZ: number, upX: number, upY: number, upZ: number): Matrix3f;
    static setRow(row: number, src: Vector3fc): Matrix3f;
    static setRow(row: number, x: number, y: number, z: number): Matrix3f;
    static setRowColumn(row: number, column: number, value: number): Matrix3f;
    static setSkewSymmetric(a: number, b: number, c: number): Matrix3f;
    static setTransposed(m: Matrix3fc): Matrix3f;
    static sub(subtrahend: Matrix3fc): Matrix3f;
    static sub(subtrahend: Matrix3fc, dest: Matrix3f): Matrix3f;
    static swap(other: Matrix3f): Matrix3f;
    static toString(formatter: NumberFormat): string;
    static transform(v: Vector3f): Vector3f;
    static transform(v: Vector3fc, dest: Vector3f): Vector3f;
    static transform(x: number, y: number, z: number, dest: Vector3f): Vector3f;
    static transformTranspose(v: Vector3f): Vector3f;
    static transformTranspose(v: Vector3fc, dest: Vector3f): Vector3f;
    static transformTranspose(x: number, y: number, z: number, dest: Vector3f): Vector3f;
    static transpose(): Matrix3f;
    static transpose(dest: Matrix3f): Matrix3f;
    static writeExternal(out: ObjectOutput): void;
    static zero(): Matrix3f;
  }


  class ExpandMutableBlockPos {
    static clamp(internal: MutableBlockPos, axis: Axis, min: number, max: number): MutableBlockPos;
    static move(internal: MutableBlockPos, direction: Direction): MutableBlockPos;
    static move(internal: MutableBlockPos, direction: Direction, distance: number): MutableBlockPos;
    static move(internal: MutableBlockPos, x: number, y: number, z: number): MutableBlockPos;
    static move(internal: MutableBlockPos, other: Vec3i): MutableBlockPos;
    static mutable(internal: MutableBlockPos): MutableBlockPos;
    static setValue(internal: MutableBlockPos, x: number, y: number, z: number): MutableBlockPos;
    static setValue(internal: MutableBlockPos, x: number, y: number, z: number): MutableBlockPos;
    static setValue(internal: MutableBlockPos, value: Vec3i): MutableBlockPos;
    static setValue(internal: MutableBlockPos, value: number): MutableBlockPos;
    static setValue(internal: MutableBlockPos, axisCycle: AxisCycle, x: number, y: number, z: number): MutableBlockPos;
    static setWithOffset(internal: MutableBlockPos, other: Vec3i, direction: Direction): MutableBlockPos;
    static setWithOffset(internal: MutableBlockPos, other: Vec3i, x: number, y: number, z: number): MutableBlockPos;
    static setWithOffset(internal: MutableBlockPos, other: Vec3i, offset: Vec3i): MutableBlockPos;
    static setX(internal: MutableBlockPos, x: number): MutableBlockPos;
    static setY(internal: MutableBlockPos, y: number): MutableBlockPos;
    static setZ(internal: MutableBlockPos, z: number): MutableBlockPos;
  }


  class ExpandOctahedralGroup {
    static compose(internal: OctahedralGroup, group: OctahedralGroup): OctahedralGroup;
    static inverse(internal: OctahedralGroup): OctahedralGroup;
    static inverts(internal: OctahedralGroup, axis: Axis): boolean;
    static rotate(internal: OctahedralGroup, direction: Direction): Direction;
    static rotate(internal: OctahedralGroup, frontAndTop: FrontAndTop): FrontAndTop;
    static transformation(internal: OctahedralGroup): Matrix3f;
  }


  class ExpandQuaternion {
  }


  class ExpandQuaternionfc {
  }


  class ExpandRandom {
    static nextBoolean(internal: Random): boolean;
    static nextDouble(internal: Random): number;
    static nextFloat(internal: Random): number;
    static nextInt(internal: Random): number;
    static nextInt(internal: Random, bound: number): number;
  }


  class ExpandRandomSource {
    static nextBoolean(internal: RandomSource): boolean;
    static nextDouble(internal: RandomSource): number;
    static nextFloat(internal: RandomSource): number;
    static nextGaussian(internal: RandomSource): number;
    static nextInt(internal: RandomSource): number;
    static nextInt(internal: RandomSource, bound: number): number;
    static nextInt(internal: RandomSource, bound: number, origin: number): number;
    static nextIntBetweenInclusive(internal: RandomSource, origin: number, bound: number): number;
    static nextLong(internal: RandomSource): number;
  }


  class ExpandRotation {
    static getRotated(internal: Rotation, rotation: Rotation): Rotation;
    static rotate(internal: Rotation, direction: Direction): Direction;
    static rotate(internal: Rotation, rotation: number, positionCount: number): number;
    static rotation(internal: Rotation): OctahedralGroup;
  }


  class ExpandVec3 {
    static add(internal: Vec3, other: Vec3): Vec3;
    static add(internal: Vec3, x: number, y: number, z: number): Vec3;
    static closerThan(internal: Vec3, position: Position, maxDistance: number): boolean;
    static cross(internal: Vec3, other: Vec3): Vec3;
    static distanceTo(internal: Vec3, other: Vec3): number;
    static distanceToSqr(internal: Vec3, other: Vec3): number;
    static distanceToSqr(internal: Vec3, x: number, y: number, z: number): number;
    static dot(internal: Vec3, other: Vec3): number;
    static getValue(internal: Vec3, axis: Axis): number;
    static horizontalDistance(internal: Vec3): number;
    static horizontalDistanceSqr(internal: Vec3): number;
    static length(internal: Vec3): number;
    static lengthSqr(internal: Vec3): number;
    static lerp(internal: Vec3, other: Vec3, value: number): Vec3;
    static multiply(internal: Vec3, other: Vec3): Vec3;
    static multiply(internal: Vec3, x: number, y: number, z: number): Vec3;
    static normalize(internal: Vec3): Vec3;
    static reverse(internal: Vec3): Vec3;
    static scale(internal: Vec3, scalar: number): Vec3;
    static subtract(internal: Vec3, other: Vec3): Vec3;
    static subtract(internal: Vec3, x: number, y: number, z: number): Vec3;
    static vectorTo(internal: Vec3, other: Vec3): Vec3;
    static xRot(internal: Vec3, pitch: number): Vec3;
    static yRot(internal: Vec3, yaw: number): Vec3;
    static zRot(internal: Vec3, roll: number): Vec3;
  }


  class ExpandVec3i {
    static above(internal: Vec3i): Vec3i;
    static above(internal: Vec3i, distance: number): Vec3i;
    static below(internal: Vec3i): Vec3i;
    static below(internal: Vec3i, distance: number): Vec3i;
    static closerThan(internal: Vec3i, other: Vec3i, maxDistance: number): boolean;
    static compareTo(internal: Vec3i, other: Vec3i): number;
    static cross(internal: Vec3i, other: Vec3i): Vec3i;
    static distManhattan(internal: Vec3i, other: Vec3i): number;
    static distSqr(internal: Vec3i, other: Vec3i): number;
    static distToCenterSqr(internal: Vec3i, position: Position): number;
    static distToCenterSqr(internal: Vec3i, x: number, y: number, z: number): number;
    static east(internal: Vec3i): Vec3i;
    static east(internal: Vec3i, distance: number): Vec3i;
    static getValue(internal: Vec3i, axis: Axis): number;
    static getX(internal: Vec3i): number;
    static getY(internal: Vec3i): number;
    static getZ(internal: Vec3i): number;
    static multiply(internal: Vec3i, scalar: number): Vec3i;
    static north(internal: Vec3i): Vec3i;
    static north(internal: Vec3i, distance: number): Vec3i;
    static offset(internal: Vec3i, x: number, y: number, z: number): Vec3i;
    static offset(internal: Vec3i, other: Vec3i): Vec3i;
    static relative(internal: Vec3i, direction: Direction): Vec3i;
    static relative(internal: Vec3i, direction: Direction, distance: number): Vec3i;
    static relative(internal: Vec3i, axis: Axis, distanec: number): Vec3i;
    static south(internal: Vec3i): Vec3i;
    static south(internal: Vec3i, distance: number): Vec3i;
    static subtract(internal: Vec3i, other: Vec3i): Vec3i;
    static toShortString(internal: Vec3i): string;
    static west(internal: Vec3i): Vec3i;
    static west(internal: Vec3i, distance: number): Vec3i;
  }


  class ExpandVector3f {
  }


  class ExpandVector3fc {
  }

}

declare module 'com.blamejared.crafttweaker.natives.util.valueprovider' {
  import { BiasedToBottomInt, ClampedInt, IntProvider, ClampedNormalFloat, ClampedNormalInt, ConstantFloat, ConstantInt, FloatProvider, MultipliedFloats, SampledFloat, TrapezoidFloat, UniformFloat, UniformInt } from 'net.minecraft.util.valueproviders';
  import { RandomSource } from 'net.minecraft.util';

  class ExpandBiasedToBottomInt {
    static of(minInclusive: number, maxInclusive: number): BiasedToBottomInt;
  }


  class ExpandClampedInt {
    static of(delegate: IntProvider, minInclusive: number, maxInclusive: number): ClampedInt;
  }


  class ExpandClampedNormalFloat {
    static of(mean: number, deviation: number, min: number, max: number): ClampedNormalFloat;
  }


  class ExpandClampedNormalInt {
    static of(mean: number, deviation: number, minInclusive: number, maxInclusive: number): ClampedNormalInt;
  }


  class ExpandConstantFloat {
    static of(value: number): ConstantFloat;
  }


  class ExpandConstantInt {
    static getValue(internal: ConstantInt): number;
    static of(value: number): ConstantInt;
  }


  class ExpandFloatProvider {
    static getMaxValue(internal: FloatProvider): number;
    static getMinValue(internal: FloatProvider): number;
  }


  class ExpandIntProvider {
    static getMaxValue(internal: IntProvider): number;
    static getMinValue(internal: IntProvider): number;
    static sample(internal: IntProvider, var1: RandomSource): number;
  }


  class ExpandMultipliedFloats {
    static of(...values: SampledFloat[]): MultipliedFloats;
  }


  class ExpandSampledFloat {
    static sample(internal: SampledFloat, random: RandomSource): number;
  }


  class ExpandTrapezoidFloat {
    static of(min: number, max: number, plateau: number): TrapezoidFloat;
  }


  class ExpandUniformFloat {
    static of(minInclusive: number, maxExclusive: number): UniformFloat;
  }


  class ExpandUniformInt {
    static of(minInclusive: number, maxInclusive: number): UniformInt;
  }

}

declare module 'com.blamejared.crafttweaker.natives.villager' {
  import { ItemCost, MerchantOffer, MerchantOffers } from 'net.minecraft.world.item.trading';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { DataComponentPredicate } from 'net.minecraft.core.component';
  import { UnaryOperator } from 'java.util.function';
  import { Builder } from 'DataComponentPredicate';
  import { Item } from 'net.minecraft.world.item';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { VillagerProfession, VillagerType } from 'net.minecraft.world.entity.npc';
  import { Set } from 'java.util';
  import { Block } from 'net.minecraft.world.level.block';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandItemCost {
    static components(internal: ItemCost): DataComponentPredicate;
    static count(internal: ItemCost): number;
    static item(internal: ItemCost): Item;
    static itemStack(internal: ItemCost): IItemStack;
    static of(stack: IItemStack): ItemCost;
    static of(stack: IItemStack, predicate: DataComponentPredicate): ItemCost;
    static test(internal: ItemCost, stack: IItemStack): boolean;
    static withComponents(internal: ItemCost, operator: UnaryOperator<Builder>): ItemCost;
  }


  class ExpandMerchantOffer {
    static addToSpecialPriceDiff(internal: MerchantOffer, specialPriceDiff: number): void;
    static assemble(internal: MerchantOffer): IItemStack;
    static createTag(internal: MerchantOffer): IData;
    static getBaseCostA(internal: MerchantOffer): IItemStack;
    static getCostA(internal: MerchantOffer): IItemStack;
    static getCostB(internal: MerchantOffer): IItemStack;
    static getDemand(internal: MerchantOffer): number;
    static getMaxUses(internal: MerchantOffer): number;
    static getPriceMultiplier(internal: MerchantOffer): number;
    static getResult(internal: MerchantOffer): IItemStack;
    static getSpecialPriceDiff(internal: MerchantOffer): number;
    static getUses(internal: MerchantOffer): number;
    static getXp(internal: MerchantOffer): number;
    static increaseUses(internal: MerchantOffer): void;
    static isOutOfStock(internal: MerchantOffer): boolean;
    static needsRestock(internal: MerchantOffer): boolean;
    static of(baseCostA: ItemCost, result: IItemStack, maxUses: number, xp: number, priceMultiplier: number): MerchantOffer;
    static of(baseCostA: ItemCost, costB: ItemCost, result: IItemStack, maxUses: number, xp: number, priceMultiplier: number): MerchantOffer;
    static of(baseCostA: ItemCost, costB: ItemCost, result: IItemStack, uses: number, maxUses: number, xp: number, priceMultiplier: number): MerchantOffer;
    static of(baseCostA: ItemCost, costB: ItemCost, result: IItemStack, uses: number, maxUses: number, xp: number, priceMultiplier: number, demand: number): MerchantOffer;
    static resetSpecialPriceDiff(internal: MerchantOffer): void;
    static resetUses(internal: MerchantOffer): void;
    static satisfiedBy(internal: MerchantOffer, a: IItemStack, b: IItemStack): boolean;
    static setSpecialPriceDiff(internal: MerchantOffer, specialPriceDiff: number): void;
    static setToOutOfStock(internal: MerchantOffer): void;
    static shouldRewardExp(internal: MerchantOffer): boolean;
    static take(internal: MerchantOffer, a: IItemStack, b: IItemStack): boolean;
    static updateDemand(internal: MerchantOffer): void;
  }


  class ExpandMerchantOffers {
    static createTag(internal: MerchantOffers): IData;
  }


  class ExpandVillagerProfession {
    static getCommandString(internal: VillagerProfession): string;
    static getRegistryName(internal: VillagerProfession): ResourceLocation;
    static name(internal: VillagerProfession): string;
    static requestedItems(internal: VillagerProfession): Set<Item>;
    static secondaryPoi(internal: VillagerProfession): Set<Block>;
    static workSound(internal: VillagerProfession): SoundEvent;
  }


  class ExpandVillagerType {
    static getRegistryName(internal: VillagerType): ResourceLocation;
  }

}

declare module 'com.blamejared.crafttweaker.natives.villager.trade' {
  import { MerchantOffer } from 'net.minecraft.world.item.trading';
  import { ItemListing } from 'VillagerTrades';
  import { Entity } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';

  class ExpandItemListing {
    static getOffer(internal: ItemListing, traderEntity: Entity, random: RandomSource): MerchantOffer;
  }

}

declare module 'com.blamejared.crafttweaker.natives.villager.trade.type' {
  import { EmeraldsForVillagerTypeItem, ItemsAndEmeraldsToItems, SuspiciousStewForEmerald, TreasureMapForEmeralds } from 'VillagerTrades';
  import { Map } from 'java.util';
  import { VillagerType } from 'net.minecraft.world.entity.npc';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ItemCost } from 'net.minecraft.world.item.trading';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { EnchantmentProvider } from 'net.minecraft.world.item.enchantment.providers';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { SuspiciousStewEffects } from 'net.minecraft.world.item.component';
  import { MapDecorationType } from 'net.minecraft.world.level.saveddata.maps';

  class ExpandBasicItemListing {
  }


  class ExpandDyedArmorForEmeralds {
  }


  class ExpandEmeraldForItems {
  }


  class ExpandEmeraldsForVillagerTypeItem {
    static create(cost: number, maxUses: number, villagerXp: number, trades: Map<VillagerType, IItemStack>): EmeraldsForVillagerTypeItem;
  }


  class ExpandEnchantedItemForEmeralds {
  }


  class ExpandItemsAndEmeraldsToItems {
    static of(fromItem: ItemCost, emeraldCost: number, toItem: ItemStack, maxUses: number, villagerXp: number, priceMultiplier: number, enchantmentProvider: ResourceKey<EnchantmentProvider>): ItemsAndEmeraldsToItems;
  }


  class ExpandItemsForEmeralds {
  }


  class ExpandSuspiciousStewForEmerald {
    static of(effect: MobEffect, duration: number, xp: number): SuspiciousStewForEmerald;
    static of(effects: SuspiciousStewEffects, xp: number, priceMultiplier: number): SuspiciousStewForEmerald;
  }


  class ExpandTippedArrowForItemsAndEmeralds {
  }


  class ExpandTreasureMapForEmeralds {
    static create(emeraldCost: number, destination: ResourceLocation, displayName: string, destinationType: MapDecorationType, maxUses: number, villagerXp: number): TreasureMapForEmeralds;
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.biome' {
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandBiome {
    static getCommandString(internal: Biome): string;
    static getRegistryName(internal: Biome): ResourceLocation;
    static getWaterFloat(internal: Biome): number;
    static getWaterFogColor(internal: Biome): number;
    static shouldFreeze(internal: Biome, world: Level, pos: BlockPos): boolean;
    static shouldFreeze(internal: Biome, world: Level, pos: BlockPos, mustBeAtEdge: boolean): boolean;
    static shouldSnow(internal: Biome, world: Level, pos: BlockPos): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.clip' {
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ClipContext } from 'net.minecraft.world.level';

  class ExpandClipContext {
    static getFrom(internal: ClipContext): Vec3;
    static getTo(internal: ClipContext): Vec3;
  }


  class ExpandClipContextBlock {
  }


  class ExpandClipContextFluid {
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.damage' {
  import { DamageContainer, IReductionFunction } from 'net.neoforged.neoforge.common.damagesource';
  import { DamageSource, DamageEffects, DamageType, DamageSources, DamageScaling, DeathMessageType } from 'net.minecraft.world.damagesource';
  import { Reduction } from 'DamageContainer';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Component } from 'net.minecraft.network.chat';
  import { KnownTag } from 'com.blamejared.crafttweaker.api.tag.type';
  import { Player } from 'net.minecraft.world.entity.player';
  import { AbstractArrow, FireworkRocketEntity, Fireball, WitherSkull } from 'net.minecraft.world.entity.projectile';
  import { Explosion } from 'net.minecraft.world.level';
  import { BiFunction } from 'java.util.function';
  import { Float } from 'java.lang';

  class ExpandDamageContainer {
    static addModifier(internal: DamageContainer, type: Reduction, reductionFunction: IReductionFunction): void;
    static getBlockedDamage(internal: DamageContainer): number;
    static getNewDamage(internal: DamageContainer): number;
    static getOriginalDamage(internal: DamageContainer): number;
    static getPostAttackInvulnerabilityTicks(internal: DamageContainer): number;
    static getReduction(internal: DamageContainer, type: Reduction): number;
    static getShieldDamage(internal: DamageContainer): number;
    static getSource(internal: DamageContainer): DamageSource;
    static of(source: DamageSource, originalDamage: number): DamageContainer;
    static setNewDamage(internal: DamageContainer, damage: number): void;
    static setPostAttackInvulnerabilityTicks(internal: DamageContainer, ticks: number): void;
  }


  class ExpandDamageEffects {
    static sound(internal: DamageEffects): SoundEvent;
  }


  class ExpandDamageScaling {
  }


  class ExpandDamageSource {
    static create(type: DamageType, directEntity: Entity, causingEntity: Entity): DamageSource;
    static create(type: DamageType, damageSourcePosition: Vec3): DamageSource;
    static getDirectEntity(internal: DamageSource): Entity;
    static getEntity(internal: DamageSource): Entity;
    static getFoodExhaustion(internal: DamageSource): number;
    static getLocalizedDeathMessage(internal: DamageSource, entity: LivingEntity): Component;
    static getMsgId(internal: DamageSource): string;
    static getSourcePosition(internal: DamageSource): Vec3;
    static isCreativePlayer(internal: DamageSource): boolean;
    static isDirect(internal: DamageSource): boolean;
    static isIn(internal: DamageSource, tag: KnownTag<DamageType>): boolean;
    static scalesWithDifficulty(internal: DamageSource): boolean;
    static sourcePositionRaw(internal: DamageSource): Vec3;
    static type(internal: DamageSource): DamageType;
  }


  class ExpandDamageSources {
    static anvil(internal: DamageSources, entity: Entity): DamageSource;
    static arrow(internal: DamageSources, arrow: AbstractArrow, cause: Entity): DamageSource;
    static badRespawnPointExplosion(internal: DamageSources, position: Vec3): DamageSource;
    static cactus(internal: DamageSources): DamageSource;
    static cramming(internal: DamageSources): DamageSource;
    static dragonBreath(internal: DamageSources): DamageSource;
    static drown(internal: DamageSources): DamageSource;
    static dryOut(internal: DamageSources): DamageSource;
    static explosion(internal: DamageSources, explosion: Explosion): DamageSource;
    static explosion(internal: DamageSources, entity: Entity, cause: Entity): DamageSource;
    static fall(internal: DamageSources): DamageSource;
    static fallingBlock(internal: DamageSources, entity: Entity): DamageSource;
    static fallingStalactite(internal: DamageSources, entity: Entity): DamageSource;
    static fellOutOfWorld(internal: DamageSources): DamageSource;
    static fireball(internal: DamageSources, entity: Fireball, cause: Entity): DamageSource;
    static fireworks(internal: DamageSources, entity: FireworkRocketEntity, cause: Entity): DamageSource;
    static flyIntoWall(internal: DamageSources): DamageSource;
    static freeze(internal: DamageSources): DamageSource;
    static generic(internal: DamageSources): DamageSource;
    static genericKill(internal: DamageSources): DamageSource;
    static hotFloor(internal: DamageSources): DamageSource;
    static inFire(internal: DamageSources): DamageSource;
    static inWall(internal: DamageSources): DamageSource;
    static indirectMagic(internal: DamageSources, entity: Entity, cause: Entity): DamageSource;
    static lava(internal: DamageSources): DamageSource;
    static lightningBolt(internal: DamageSources): DamageSource;
    static magic(internal: DamageSources): DamageSource;
    static mobAttack(internal: DamageSources, entity: LivingEntity): DamageSource;
    static mobProjectile(internal: DamageSources, entity: Entity, cause: LivingEntity): DamageSource;
    static noAggroMobAttack(internal: DamageSources, entity: LivingEntity): DamageSource;
    static onFire(internal: DamageSources): DamageSource;
    static outOfBorder(internal: DamageSources): DamageSource;
    static playerAttack(internal: DamageSources, player: Player): DamageSource;
    static sonicBoom(internal: DamageSources, entity: Entity): DamageSource;
    static stalagmite(internal: DamageSources): DamageSource;
    static starve(internal: DamageSources): DamageSource;
    static sting(internal: DamageSources, entity: LivingEntity): DamageSource;
    static sweetBerryBush(internal: DamageSources): DamageSource;
    static thorns(internal: DamageSources, entity: Entity): DamageSource;
    static thrown(internal: DamageSources, entity: Entity, cause: Entity): DamageSource;
    static trident(internal: DamageSources, entity: Entity, cause: Entity): DamageSource;
    static wither(internal: DamageSources): DamageSource;
    static witherSkull(internal: DamageSources, entity: WitherSkull, cause: Entity): DamageSource;
  }


  class ExpandDamageType {
    static deathMessageType(internal: DamageType): DeathMessageType;
    static effects(internal: DamageType): DamageEffects;
    static exhaustion(internal: DamageType): number;
    static msgId(internal: DamageType): string;
    static scaling(internal: DamageType): DamageScaling;
  }


  class ExpandDeathMessageType {
  }


  class ExpandIReductionFunction {
    static modify(internal: IReductionFunction, container: DamageContainer, reductionIn: number): number;
    static of(func: BiFunction<DamageContainer, number, number>): IReductionFunction;
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.damage.ExpandDamageContainer' {
  class ExpandDamageContainerReduction {
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.data' {
  import { LevelData, ServerLevelData, WritableLevelData } from 'net.minecraft.world.level.storage';
  import { Difficulty } from 'net.minecraft.world';
  import { GameType } from 'net.minecraft.world.level';
  import { Settings } from 'WorldBorder';
  import { BlockPos } from 'net.minecraft.core';

  class ExpandLevelData {
    static getDayTime(internal: LevelData): number;
    static getDifficulty(internal: LevelData): Difficulty;
    static getGameTime(internal: LevelData): number;
    static getSpawnAngle(internal: LevelData): number;
    static isDifficultyLocked(internal: LevelData): boolean;
    static isHardcore(internal: LevelData): boolean;
    static isRaining(internal: LevelData): boolean;
    static isThundering(internal: LevelData): boolean;
    static setRaining(internal: LevelData, raining: boolean): void;
  }


  class ExpandServerLevelData {
    static getClearWeatherTime(internal: ServerLevelData): number;
    static getGameType(internal: ServerLevelData): GameType;
    static getLevelName(internal: ServerLevelData): string;
    static getRainTime(internal: ServerLevelData): number;
    static getThunderTime(internal: ServerLevelData): number;
    static getWanderingTraderSpawnChance(internal: ServerLevelData): number;
    static getWanderingTraderSpawnDelay(internal: ServerLevelData): number;
    static getWorldBorder(internal: ServerLevelData): Settings;
    static isAllowCommands(internal: ServerLevelData): boolean;
    static isInitialized(internal: ServerLevelData): boolean;
    static setClearWeatherTime(internal: ServerLevelData, time: number): void;
    static setDayTime(internal: ServerLevelData, time: number): void;
    static setGameTime(internal: ServerLevelData, time: number): void;
    static setGameType(internal: ServerLevelData, gameType: GameType): void;
    static setRainTime(internal: ServerLevelData, time: number): void;
    static setThunderTime(internal: ServerLevelData, time: number): void;
    static setThundering(internal: ServerLevelData, thundering: boolean): void;
    static setWanderingTraderSpawnChance(internal: ServerLevelData, chance: number): void;
    static setWanderingTraderSpawnDelay(internal: ServerLevelData, delay: number): void;
    static setWorldBorder(internal: ServerLevelData, border: Settings): void;
  }


  class ExpandWritableLevelData {
    static setSpawn(internal: WritableLevelData, pos: BlockPos, spawnAngle: number): void;
  }

}

declare module 'com.blamejared.crafttweaker.natives.world' {
  import { BaseSpawner, Level, BlockGetter, Explosion, GameType, ItemLike, LevelAccessor, LevelReader, LevelWriter, ServerLevelAccessor } from 'net.minecraft.world.level';
  import { EntityType, Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockContainerSingleItem } from 'ContainerSingleItem';
  import { ContainerSingleItem } from 'net.minecraft.world.ticks';
  import { Player, Abilities } from 'net.minecraft.world.entity.player';
  import { IData } from 'com.blamejared.crafttweaker.api.data';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Clearable, Container, Difficulty, DifficultyInstance, InteractionResult, InteractionResultHolder, ItemInteractionResult, Nameable, RandomizableContainer } from 'net.minecraft.world';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Set, Map, List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { DamageSource, DamageSources } from 'net.minecraft.world.damagesource';
  import { Vec3, BlockHitResult } from 'net.minecraft.world.phys';
  import { Class } from 'java.lang';
  import { SequenceBuilder } from 'com.blamejared.crafttweaker.api.util.sequence';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { Predicate } from 'java.util.function';
  import { Block, Fluid } from 'ClipContext';
  import { LevelData } from 'net.minecraft.world.level.storage';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { CraftTweakerSavedData } from 'com.blamejared.crafttweaker.api.level';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { MinecraftServer } from 'net.minecraft.server';

  class ExpandBaseSpawner {
    static getOrCreateDisplayEntity(internal: BaseSpawner, level: Level, position: BlockPos): Entity;
    static getSpin(internal: BaseSpawner): number;
    static getoSpin(internal: BaseSpawner): number;
    static setEntityId(internal: BaseSpawner, type: EntityType<Entity>, level: Level, random: RandomSource, position: BlockPos): void;
  }


  class ExpandBlockAndTintGetter {
  }


  class ExpandBlockContainerSingleItem {
    static getContainerBlockEntity(internal: BlockContainerSingleItem): BlockEntity;
    static stillValid(internal: ContainerSingleItem, player: Player): boolean;
  }


  class ExpandBlockGetter {
    static getBlockEntityData(internal: BlockGetter, pos: BlockPos): IData;
    static getBlockFloorHeight(internal: BlockGetter, pos: BlockPos): number;
    static getBlockState(internal: BlockGetter, pos: BlockPos): BlockState;
    static getLightEmission(internal: BlockGetter, pos: BlockPos): number;
    static getMaxLightLevel(internal: BlockGetter): number;
  }


  class ExpandClearable {
    static clearContent(internal: Clearable): void;
  }


  class ExpandCommonLevelAccessor {
  }


  class ExpandContainer {
    static canPlaceItem(internal: Container, index: number, stack: ItemStack): boolean;
    static countItem(internal: Container, item: Item): number;
    static countStack(internal: Container, item: IItemStack): number;
    static getContainerSize(internal: Container): number;
    static getItem(internal: Container, index: number): ItemStack;
    static getMaxStackSize(internal: Container): number;
    static hasAnyOf(internal: Container, items: Set<Item>): boolean;
    static isEmpty(internal: Container): boolean;
    static removeItem(internal: Container, var1: number, var2: number): ItemStack;
    static removeItemNoUpdate(internal: Container, index: number): ItemStack;
    static setChanged(internal: Container): void;
    static setItem(internal: Container, index: number, stack: ItemStack): void;
    static startOpen(internal: Container, player: Player): void;
    static stillValid(internal: Container, player: Player): boolean;
    static stopOpen(internal: Container, player: Player): void;
  }


  class ExpandContainerSingleItem {
    static getTheItem(internal: ContainerSingleItem): ItemStack;
    static removeTheItem(internal: ContainerSingleItem): ItemStack;
    static setTheItem(internal: ContainerSingleItem, stack: ItemStack): void;
    static splitTheItem(internal: ContainerSingleItem, amount: number): ItemStack;
  }


  class ExpandDifficulty {
    static getDisplayName(internal: Difficulty): Component;
    static getId(internal: Difficulty): number;
    static getKey(internal: Difficulty): string;
  }


  class ExpandDifficultyInstance {
    static getDifficulty(internal: DifficultyInstance): Difficulty;
    static getEffectiveDifficulty(internal: DifficultyInstance): number;
    static getSpecialMultiplier(internal: DifficultyInstance): number;
    static isHard(internal: DifficultyInstance): boolean;
    static isHarderThan(internal: DifficultyInstance, difficulty: number): boolean;
  }


  class ExpandExplosion {
    static clearToBlow(internal: Explosion): void;
    static explode(internal: Explosion): void;
    static finalizeExplosion(internal: Explosion, spawnParticles: boolean): void;
    static getDamageSource(internal: Explosion): DamageSource;
    static getHitPlayers(internal: Explosion): Map<Player, Vec3>;
    static getIndirectSourceEntity(internal: Explosion): LivingEntity;
    static getToBlow(internal: Explosion): BlockPos[];
  }


  class ExpandExplosionBlockInteraction {
  }


  class ExpandGameType {
    static getId(internal: GameType): number;
    static getLongDisplayName(internal: GameType): Component;
    static getName(internal: GameType): string;
    static getShortDisplayName(internal: GameType): Component;
    static isBlockPlacingRestricted(internal: GameType): boolean;
    static isCreative(internal: GameType): boolean;
    static isSurvival(internal: GameType): boolean;
    static updatePlayerAbilities(internal: GameType, abilities: Abilities): void;
  }


  class ExpandInteractionResult {
    static consumesAction(internal: InteractionResult): boolean;
    static indicateItemUse(internal: InteractionResult): boolean;
    static shouldSwing(internal: InteractionResult): boolean;
    static sidedSuccess(successSide: boolean): InteractionResult;
  }


  class ExpandInteractionResultHolder {
    static consume<T>(tClass: Class<T>, object: T): InteractionResultHolder<T>;
    static fail<T>(tClass: Class<T>, object: T): InteractionResultHolder<T>;
    static getObject<T>(internal: InteractionResultHolder<T>, tClass: Class<T>): T;
    static getResult(internal: InteractionResultHolder): InteractionResult;
    static pass<T>(tClass: Class<T>, object: T): InteractionResultHolder<T>;
    static sidedSuccess<T>(tClass: Class<T>, object: T, success: boolean): InteractionResultHolder<T>;
    static success<T>(tClass: Class<T>, object: T): InteractionResultHolder<T>;
  }


  class ExpandItemInteractionResult {
    static consumesAction(internal: ItemInteractionResult): boolean;
    static result(internal: ItemInteractionResult): InteractionResult;
    static sidedSuccess(successSide: boolean): ItemInteractionResult;
  }


  class ExpandItemLike {
    static asItem(internal: ItemLike): Item;
  }


  class ExpandLevel {
    static destroyBlockProgress(internal: Level, breakerId: number, pos: BlockPos, progress: number): void;
    static getBestNeighborSignal(internal: Level, pos: BlockPos): number;
    static getBlockEntity(internal: Level, pos: BlockPos): BlockEntity;
    static getDayTime(internal: Level): number;
    static getDimension(internal: Level): ResourceLocation;
    static getDirectSignalTo(internal: Level, pos: BlockPos): number;
    static getEntities(internal: Level, excludingEntity: Entity, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, predicate: Predicate<Entity>): Entity[];
    static getEntitiesInArea<T extends Entity>(internal: Level, typeOfT: Class<T>, pos1: BlockPos, pos2: BlockPos): T[];
    static getEntitiesInAreaExcluding(internal: Level, excludingEntity: Entity, predicate: Predicate<Entity>, pos1: BlockPos, pos2: BlockPos): Entity[];
    static getEntitiesOfClass<T extends Entity>(internal: Level, typeOfT: Class<T>, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): T[];
    static getGametime(internal: Level): number;
    static getSignal(internal: Level, pos: BlockPos, direction: Direction): number;
    static globalLevelEvent(internal: Level, eventId: number, pos: BlockPos, data: number): void;
    static hasNeighborSignal(internal: Level, pos: BlockPos): boolean;
    static isDay(internal: Level): boolean;
    static isLoaded(internal: Level, pos: BlockPos): boolean;
    static isNight(internal: Level): boolean;
    static isRaining(internal: Level): boolean;
    static isRainingAt(internal: Level, pos: BlockPos): boolean;
    static isThundering(internal: Level): boolean;
    static rayTraceBlocks(internal: Level, startVec: Vec3, endVec: Vec3, blockMode: Block, fluidMode: Fluid, entity: Entity): BlockHitResult;
    static sequence(internal: Level, data: IData): SequenceBuilder<Level, IData>;
    static sequence<T>(internal: Level, dataClass: Class<T>, data: T): SequenceBuilder<Level, T>;
    static setBlockAndUpdate(internal: Level, pos: BlockPos, state: BlockState): boolean;
    static setRainingLevel(internal: Level, level: number): void;
  }


  class ExpandLevelAccessor {
    static getCurrentDifficultyAt(internal: LevelAccessor, position: BlockPos): DifficultyInstance;
    static getDifficulty(internal: LevelAccessor): Difficulty;
    static getLevelData(internal: LevelAccessor): LevelData;
    static getRandom(internal: LevelAccessor): RandomSource;
    static levelEvent(internal: LevelAccessor, excluded: Player, event: number, position: BlockPos, extra: number): void;
    static levelEvent(internal: LevelAccessor, event: number, position: BlockPos, extra: number): void;
    static playSound(internal: LevelAccessor, player: Player, position: BlockPos, event: SoundEvent, source: SoundSource): void;
    static playSound(internal: LevelAccessor, player: Player, position: BlockPos, event: SoundEvent, source: SoundSource, volume: number, pitch: number): void;
  }


  class ExpandLevelEventConstants {
    static readonly SOUND_DISPENSER_DISPENSE: number;
    static readonly SOUND_DISPENSER_FAIL: number;
    static readonly SOUND_DISPENSER_PROJECTILE_LAUNCH: number;
    static readonly SOUND_FIREWORK_SHOOT: number;
    static readonly SOUND_EXTINGUISH_FIRE: number;
    static readonly SOUND_PLAY_JUKEBOX_SONG: number;
    static readonly SOUND_STOP_JUKEBOX_SONG: number;
    static readonly SOUND_GHAST_WARNING: number;
    static readonly SOUND_GHAST_FIREBALL: number;
    static readonly SOUND_DRAGON_FIREBALL: number;
    static readonly SOUND_BLAZE_FIREBALL: number;
    static readonly SOUND_ZOMBIE_WOODEN_DOOR: number;
    static readonly SOUND_ZOMBIE_IRON_DOOR: number;
    static readonly SOUND_ZOMBIE_DOOR_CRASH: number;
    static readonly SOUND_WITHER_BLOCK_BREAK: number;
    static readonly SOUND_WITHER_BOSS_SPAWN: number;
    static readonly SOUND_WITHER_BOSS_SHOOT: number;
    static readonly SOUND_BAT_LIFTOFF: number;
    static readonly SOUND_ZOMBIE_INFECTED: number;
    static readonly SOUND_ZOMBIE_CONVERTED: number;
    static readonly SOUND_DRAGON_DEATH: number;
    static readonly SOUND_ANVIL_BROKEN: number;
    static readonly SOUND_ANVIL_USED: number;
    static readonly SOUND_ANVIL_LAND: number;
    static readonly SOUND_PORTAL_TRAVEL: number;
    static readonly SOUND_CHORUS_GROW: number;
    static readonly SOUND_CHORUS_DEATH: number;
    static readonly SOUND_BREWING_STAND_BREW: number;
    static readonly SOUND_END_PORTAL_SPAWN: number;
    static readonly SOUND_PHANTOM_BITE: number;
    static readonly SOUND_ZOMBIE_TO_DROWNED: number;
    static readonly SOUND_HUSK_TO_ZOMBIE: number;
    static readonly SOUND_GRINDSTONE_USED: number;
    static readonly SOUND_PAGE_TURN: number;
    static readonly SOUND_SMITHING_TABLE_USED: number;
    static readonly SOUND_POINTED_DRIPSTONE_LAND: number;
    static readonly SOUND_DRIP_LAVA_INTO_CAULDRON: number;
    static readonly SOUND_DRIP_WATER_INTO_CAULDRON: number;
    static readonly SOUND_SKELETON_TO_STRAY: number;
    static readonly SOUND_CRAFTER_CRAFT: number;
    static readonly SOUND_CRAFTER_FAIL: number;
    static readonly SOUND_WIND_CHARGE_SHOOT: number;
    static readonly COMPOSTER_FILL: number;
    static readonly LAVA_FIZZ: number;
    static readonly REDSTONE_TORCH_BURNOUT: number;
    static readonly END_PORTAL_FRAME_FILL: number;
    static readonly DRIPSTONE_DRIP: number;
    static readonly PARTICLES_AND_SOUND_PLANT_GROWTH: number;
    static readonly PARTICLES_SHOOT_SMOKE: number;
    static readonly PARTICLES_DESTROY_BLOCK: number;
    static readonly PARTICLES_SPELL_POTION_SPLASH: number;
    static readonly PARTICLES_EYE_OF_ENDER_DEATH: number;
    static readonly PARTICLES_MOBBLOCK_SPAWN: number;
    static readonly PARTICLES_DRAGON_FIREBALL_SPLASH: number;
    static readonly PARTICLES_INSTANT_POTION_SPLASH: number;
    static readonly PARTICLES_DRAGON_BLOCK_BREAK: number;
    static readonly PARTICLES_WATER_EVAPORATING: number;
    static readonly PARTICLES_SHOOT_WHITE_SMOKE: number;
    static readonly ANIMATION_END_GATEWAY_SPAWN: number;
    static readonly ANIMATION_DRAGON_SUMMON_ROAR: number;
    static readonly PARTICLES_ELECTRIC_SPARK: number;
    static readonly PARTICLES_AND_SOUND_WAX_ON: number;
    static readonly PARTICLES_WAX_OFF: number;
    static readonly PARTICLES_SCRAPE: number;
    static readonly PARTICLES_SCULK_CHARGE: number;
    static readonly PARTICLES_SCULK_SHRIEK: number;
    static readonly PARTICLES_AND_SOUND_BRUSH_BLOCK_COMPLETE: number;
    static readonly PARTICLES_EGG_CRACK: number;
    static readonly PARTICLES_TRIAL_SPAWNER_SPAWN: number;
    static readonly PARTICLES_TRIAL_SPAWNER_SPAWN_MOB_AT: number;
    static readonly PARTICLES_TRIAL_SPAWNER_DETECT_PLAYER: number;
    static readonly ANIMATION_TRIAL_SPAWNER_EJECT_ITEM: number;
  }


  class ExpandLevelReader {
    static canSeeSkyFromBelowWater(internal: LevelReader, pos: BlockPos): boolean;
    static getBiome(internal: LevelReader, pos: BlockPos): Biome;
    static getSeaLevel(internal: LevelReader): number;
    static getSkyDarken(internal: LevelReader): number;
    static hasChunk(internal: LevelReader, x: number, z: number): boolean;
    static isClientSide(internal: LevelReader): boolean;
    static isEmptyBlock(internal: LevelReader, pos: BlockPos): boolean;
    static isWaterAt(internal: LevelReader, pos: BlockPos): boolean;
  }


  class ExpandLevelSimulatedRW {
  }


  class ExpandLevelWriter {
    static addFreshEntity(internal: LevelWriter, entity: Entity): boolean;
    static destroyBlock(internal: LevelWriter, pos: BlockPos, doDrops: boolean): boolean;
    static destroyBlock(internal: LevelWriter, pos: BlockPos, doDrops: boolean, breaker: Entity): boolean;
    static destroyBlock(internal: LevelWriter, pos: BlockPos, dropBlock: boolean, entity: Entity, recursionLeft: number): boolean;
    static removeBlock(internal: LevelWriter, pos: BlockPos, isMoving: boolean): boolean;
    static setBlock(internal: LevelWriter, pos: BlockPos, state: BlockState, flags: number, recursionLeft: number): boolean;
    static setBlock(internal: LevelWriter, pos: BlockPos, state: BlockState, flags: number): boolean;
  }


  class ExpandNameable {
    static getCustomName(internal: Nameable): Component;
    static getDisplayName(internal: Nameable): Component;
    static getName(internal: Nameable): Component;
    static hasCustomName(internal: Nameable): boolean;
  }


  class ExpandRandomizableContainer {
    static getLootTable(internal: RandomizableContainer): ResourceKey<LootTable>;
    static getLootTableSeed(internal: RandomizableContainer): number;
    static setLootTable(internal: RandomizableContainer, lootTable: ResourceKey<LootTable>): void;
    static setLootTable(internal: RandomizableContainer, lootTable: ResourceKey<LootTable>, seed: number): void;
    static setLootTable(internal: RandomizableContainer, lootTable: ResourceLocation): void;
    static setLootTable(internal: RandomizableContainer, lootTable: ResourceLocation, seed: number): void;
    static setLootTableSeed(internal: RandomizableContainer, seed: number): void;
  }


  class ExpandSavedData {
  }


  class ExpandServerLevel {
    static damageSources(level: ServerLevel): DamageSources;
    static getCustomData(internal: ServerLevel): CraftTweakerSavedData;
    static getEntities(internal: ServerLevel, predicate: Predicate<Entity>, type: EntityType<Entity>): Entity[];
    static getSeed(internal: ServerLevel): number;
    static getServer(internal: ServerLevel): MinecraftServer;
    static isRaided(internal: ServerLevel, pos: BlockPos): boolean;
    static isSlimeChunk(internal: ServerLevel, pos: BlockPos): boolean;
    static isVillage(internal: ServerLevel, pos: BlockPos): boolean;
    static setDayTime(internal: ServerLevel, time: number): void;
    static setTimeToDay(internal: ServerLevel): void;
    static setTimeToMidnight(internal: ServerLevel): void;
    static setTimeToNight(internal: ServerLevel): void;
    static setTimeToNoon(internal: ServerLevel): void;
  }


  class ExpandServerLevelAccessor {
    static addFreshEntityWithPassengers(internal: ServerLevelAccessor, entity: Entity): void;
    static getLevel(internal: ServerLevelAccessor): ServerLevel;
  }

}

declare module 'com.blamejared.crafttweaker.natives.world.map' {
  import { MapDecorationType } from 'net.minecraft.world.level.saveddata.maps';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ExpandMapDecorationType {
    static assetId(internal: MapDecorationType): ResourceLocation;
    static explorationMapElement(internal: MapDecorationType): boolean;
    static hasMapColor(internal: MapDecorationType): boolean;
    static mapColor(internal: MapDecorationType): number;
    static showOnItemFrame(internal: MapDecorationType): boolean;
    static trackCount(internal: MapDecorationType): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.platform.client' {
  import { IClientHelper } from 'com.blamejared.crafttweaker.platform.services';
  import { KeyMapping } from 'net.minecraft.client';

  interface NeoForgeClientHelper extends IClientHelper {}
  class NeoForgeClientHelper extends IClientHelper {
    isKeyDown(keyBinding: KeyMapping): boolean;
    isKeyDownExtra(keyBinding: KeyMapping): boolean;
  }

}

declare module 'com.blamejared.crafttweaker.platform.event' {
  import { IEventHelper } from 'com.blamejared.crafttweaker.platform.services';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';

  interface NeoForgeEventHelper extends IEventHelper {}
  class NeoForgeEventHelper extends IEventHelper {
    getBurnTime(stack: IItemStack): number;
  }

}

declare module 'com.blamejared.crafttweaker.platform.helper' {
  import { RegistryAccess, Registry } from 'net.minecraft.core';
  import { Consumer, Function } from 'java.util.function';
  import { TagAddingRegistryLookup } from 'com.blamejared.crafttweaker.api.registry';
  import { RecipeManager } from 'net.minecraft.world.item.crafting';
  import { AccessRecipeManager } from 'com.blamejared.crafttweaker.mixin.common.access.recipe';
  import { RegistryLookup } from 'HolderLookup';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ReloadableServerResources } from 'net.minecraft.server';
  import { AccessReloadableServerResources } from 'com.blamejared.crafttweaker.mixin.common.access.server';

  class IAccessibleClientElementsProvider {
    hasRegistryAccess(): boolean;
    registryAccess(): RegistryAccess;
    registryAccess(var1: RegistryAccess): void;
    runWithRegistryAccess(var1: Consumer<RegistryAccess>): void;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }


  class IAccessibleElementsProvider {
    accessibleRecipeManager(): AccessRecipeManager;
    client(): IAccessibleClientElementsProvider;
    hasRegistryAccess(): boolean;
    lookupOrThrow<T>(key: ResourceKey<Registry<T>>): RegistryLookup<T>;
    recipeManager(): RecipeManager;
    recipeManager(var1: RecipeManager): void;
    registryAccess(): RegistryAccess;
    registryAccess<T>(func: Function<RegistryAccess, T>): T;
    server(): IAccessibleServerElementsProvider;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }


  class IAccessibleServerElementsProvider {
    accessibleResources(): AccessReloadableServerResources;
    hasRegistryAccess(): boolean;
    hasResources(): boolean;
    registryAccess(): RegistryAccess;
    registryAccess(var1: RegistryAccess): void;
    resources(): ReloadableServerResources;
    resources(var1: ReloadableServerResources): void;
    runWithRegistryAccess(var1: Consumer<RegistryAccess>): void;
    tagAddingRegistryLookup(): TagAddingRegistryLookup;
  }

}

declare module 'com.blamejared.crafttweaker.platform.helper.inventory' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { OptionalInt } from 'java.util';
  import { IItemHandler } from 'net.neoforged.neoforge.items';

  class IInventoryWrapper {
    canFitInSlot(var1: number, var2: ItemStack): boolean;
    get containerSize(): number;
    getItem(var1: number): ItemStack;
    getSlotFor(stack: ItemStack): OptionalInt;
    insertItem(var1: number, var2: ItemStack, var3: boolean): ItemStack;
  }


  interface IItemHandlerWrapper extends IInventoryWrapper {}
  class IItemHandlerWrapper extends IInventoryWrapper {
    constructor(handler: IItemHandler);
    canFitInSlot(slot: number, stack: ItemStack): boolean;
    get containerSize(): number;
    getItem(slot: number): ItemStack;
    insertItem(slot: number, stack: ItemStack, simulate: boolean): ItemStack;
  }

}

declare module 'com.blamejared.crafttweaker.platform' {
  import { IDistributionHelper, IPlatformHelper, IRegistryHelper, IBridgeService, IClientHelper, IEventHelper, INetworkHelper } from 'com.blamejared.crafttweaker.platform.services';
  import { DistributionType } from 'com.blamejared.crafttweaker.platform.sides';
  import { Supplier, Function, Consumer, Predicate } from 'java.util.function';
  import { List, Optional, Map, Set } from 'java.util';
  import { Mod, PlatformMod } from 'com.blamejared.crafttweaker.api.mod';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { ItemStack, BucketItem } from 'net.minecraft.world.item';
  import { IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { IngredientTransformers } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { Path } from 'java.nio.file';
  import { Stream } from 'java.util.stream';
  import { Class, Float } from 'java.lang';
  import { Either } from 'com.mojang.datafixers.util';
  import { Annotation } from 'java.lang.annotation';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { ILootModifier } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { IItemHandlerWrapper } from 'com.blamejared.crafttweaker.platform.helper.inventory';
  import { Player } from 'net.minecraft.world.entity.player';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { InteractionHand } from 'net.minecraft.world';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { GameProfile } from 'com.mojang.authlib';
  import { IBasicItemListing } from 'com.blamejared.crafttweaker.api.villager.trade.type';
  import { PossibleEffect } from 'FoodProperties';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Registry } from 'net.minecraft.core';

  interface NeoForgeDistributionHelper extends IDistributionHelper {}
  class NeoForgeDistributionHelper extends IDistributionHelper {
    get distributionType(): DistributionType;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    readonly modList: Supplier;
    readonly modFinder: Function;
    createFluidStack(fluid: Fluid, amount: number, patch: DataComponentPatch): IFluidStack;
    createFluidStack<T>(stack: T): IFluidStack;
    createFluidStackMutable(fluid: Fluid, amount: number, patch: DataComponentPatch): IFluidStack;
    createFluidStackMutable<T>(stack: T): IFluidStack;
    createItemStack(stack: ItemStack, conditions: IngredientConditions, transformers: IngredientTransformers): IItemStack;
    createItemStackMutable(stack: ItemStack, conditions: IngredientConditions, transformers: IngredientTransformers): IItemStack;
    createPossibleEffect(effect: MobEffectInstance, probability: number): PossibleEffect;
    doesIngredientRequireTesting(ingredient: Ingredient): boolean;
    fakePlayers(): Stream<GameProfile>;
    findClassesWithAnnotation<T extends Annotation>(annotationClass: Class<T>, classProviderConsumer: Consumer<PlatformMod>, annotationFilter: Predicate<Either<T, Map<string, any>>>): Stream<Class<any>>;
    get gameDirectory(): Path;
    get ingredientAny(): Ingredient;
    get logFormat(): string;
    get lootModifiersMap(): Map<ResourceLocation, ILootModifier>;
    get mods(): Mod[];
    get platformName(): string;
    getBasicTradeForSale(internal: IBasicItemListing): ItemStack;
    getBasicTradeMaxTrades(internal: IBasicItemListing): number;
    getBasicTradePrice(internal: IBasicItemListing): ItemStack;
    getBasicTradePrice2(internal: IBasicItemListing): ItemStack;
    getBasicTradePriceMult(internal: IBasicItemListing): number;
    getBasicTradeXp(internal: IBasicItemListing): number;
    getBucketContent(item: BucketItem): Fluid;
    getCraftTweakerIngredient(internal: IIngredient): Ingredient;
    getCustomData(entity: Entity): CompoundTag;
    getFluidsForDump(stack: ItemStack, player: Player, hand: InteractionHand): Set<MutableComponent>;
    getIItemStackIngredient(internal: IItemStack): Ingredient;
    getIngredientList(children: Ingredient[]): Ingredient;
    getMod(modid: string): Optional<Mod>;
    getPersistentData(player: ServerPlayer): CompoundTag;
    getPlayerInventory(player: Player): IItemHandlerWrapper;
    getRemainingItem(stack: ItemStack): IItemStack;
    isCustomIngredient(ingredient: Ingredient): boolean;
    isDataGen(): boolean;
    isDevelopmentEnvironment(): boolean;
    isFakePlayer(player: Player): boolean;
    isModLoaded(modId: string): boolean;
    setCompostable(stack: IItemStack, value: Optional<number>, undoing: boolean): void;
  }


  interface NeoForgeRegistryHelper extends IRegistryHelper {}
  class NeoForgeRegistryHelper extends IRegistryHelper {
    static init(modBus: IEventBus): void;
    makeRegistry<T>(resourceKey: ResourceKey<Registry<T>>): Registry<T>;
  }


  class Services {
    static readonly BRIDGE: IBridgeService;
    static readonly PLATFORM: IPlatformHelper;
    static readonly DISTRIBUTION: IDistributionHelper;
    static readonly CLIENT: IClientHelper;
    static readonly EVENT: IEventHelper;
    static readonly NETWORK: INetworkHelper;
    static readonly REGISTRY: IRegistryHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'com.blamejared.crafttweaker.platform.network' {
  import { INetworkHelper } from 'com.blamejared.crafttweaker.platform.services';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CraftTweakerPacket } from 'com.blamejared.crafttweaker.impl.network.packet';

  interface NeoForgeNetworkHelper extends INetworkHelper {}
  class NeoForgeNetworkHelper extends INetworkHelper {
    sendPacket<T extends CraftTweakerPacket>(target: ServerPlayer, packet: T): void;
  }

}

declare module 'com.blamejared.crafttweaker.platform.registry' {
  import { Optional, Set } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Registry } from 'net.minecraft.core';

  class RegistryWrapper<T = any> {
    containsKey(var1: ResourceLocation): boolean;
    get(var1: ResourceLocation): T;
    getForNamespace(namespace: string): Stream<T>;
    getKey(var1: T): ResourceLocation;
    getOptional(var1: ResourceLocation): Optional<T>;
    keySet(): Set<ResourceLocation>;
    keyStream(): Stream<ResourceLocation>;
    stream(): Stream<T>;
  }


  interface VanillaRegistryWrapper<T = any> extends RegistryWrapper<T> {}
  class VanillaRegistryWrapper<T = any> extends RegistryWrapper<T> {
    constructor(registry: Registry<T>);
    containsKey(location: ResourceLocation): boolean;
    get(location: ResourceLocation): T;
    getKey(object: T): ResourceLocation;
    getOptional(location: ResourceLocation): Optional<T>;
    keySet(): Set<ResourceLocation>;
    stream(): Stream<T>;
  }

}

declare module 'com.blamejared.crafttweaker.platform.services' {
  import { ICraftTweakerRegistry } from 'com.blamejared.crafttweaker.api';
  import { IScriptRunManager, IScriptRunModuleConfigurator } from 'com.blamejared.crafttweaker.api.zencode.scriptrun';
  import { IAccessibleElementsProvider } from 'com.blamejared.crafttweaker.platform.helper';
  import { ILoggerRegistry } from 'com.blamejared.crafttweaker.api.logging';
  import { Map, LinkedList, List, Optional, Set } from 'java.util';
  import { KeyMapping } from 'net.minecraft.client';
  import { IIngredient } from 'com.blamejared.crafttweaker.api.ingredient';
  import { ITooltipFunction } from 'com.blamejared.crafttweaker.api.item.tooltip';
  import { ItemStack, TooltipFlag, BucketItem } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { DistributionType } from 'com.blamejared.crafttweaker.platform.sides';
  import { Supplier, Consumer, Predicate } from 'java.util.function';
  import { Runnable, Integer, Class, Float } from 'java.lang';
  import { Callable } from 'java.util.concurrent';
  import { RecipeType, Recipe, Ingredient } from 'net.minecraft.world.item.crafting';
  import { IItemStack } from 'com.blamejared.crafttweaker.api.item';
  import { Pair, Either } from 'com.mojang.datafixers.util';
  import { ItemAttributeModifierBase } from 'com.blamejared.crafttweaker.api.item.attribute';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CraftTweakerPacket } from 'com.blamejared.crafttweaker.impl.network.packet';
  import { Mod, PlatformMod } from 'com.blamejared.crafttweaker.api.mod';
  import { IngredientConditions } from 'com.blamejared.crafttweaker.api.ingredient.condition';
  import { IngredientTransformers } from 'com.blamejared.crafttweaker.api.ingredient.transformer';
  import { IFluidStack } from 'com.blamejared.crafttweaker.api.fluid';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { Path } from 'java.nio.file';
  import { Stream } from 'java.util.stream';
  import { Annotation } from 'java.lang.annotation';
  import { ResourceLocation, ResourceKey } from 'net.minecraft.resources';
  import { ILootModifier } from 'com.blamejared.crafttweaker.api.loot.modifier';
  import { IInventoryWrapper } from 'com.blamejared.crafttweaker.platform.helper.inventory';
  import { IRecipeManager } from 'com.blamejared.crafttweaker.api.recipe.manager.base';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { GameProfile } from 'com.mojang.authlib';
  import { IBasicItemListing } from 'com.blamejared.crafttweaker.api.villager.trade.type';
  import { PossibleEffect } from 'FoodProperties';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { Registry, Holder } from 'net.minecraft.core';
  import { Biome } from 'net.minecraft.world.level.biome';

  class IBridgeService {
    accessibleElementsProvider(): IAccessibleElementsProvider;
    defaultScriptRunModuleConfigurator(var1: string): IScriptRunModuleConfigurator;
    loggerRegistry(): ILoggerRegistry;
    registry(): ICraftTweakerRegistry;
    scriptRunManager(): IScriptRunManager;
  }


  class IClientHelper {
    static readonly TOOLTIPS: Map;
    static readonly NAMETAGS: Map;
    applyTooltips(stack: ItemStack, context: TooltipContext, flag: TooltipFlag, lines: Component[]): void;
    get tooltips(): Map<IIngredient, LinkedList<ITooltipFunction>>;
    isKeyDown(var1: KeyMapping): boolean;
    isKeyDownExtra(var1: KeyMapping): boolean;
    isSingleplayer(): boolean;
  }


  class IDistributionHelper {
    callOn<T>(dist: DistributionType, toCall: Supplier<Callable<T>>): Optional<T>;
    callOn<T>(client: Supplier<Supplier<T>>, server: Supplier<Supplier<T>>): Optional<T>;
    get distributionType(): DistributionType;
    isClient(): boolean;
    isServer(): boolean;
    runOn(dist: DistributionType, runnable: Supplier<Runnable>): void;
    runOn(client: Supplier<Runnable>, server: Supplier<Runnable>): void;
  }


  class IEventHelper {
    static readonly BURN_TIMES: Map;
    static readonly BLOCK_INFO_PLAYERS: Set;
    static readonly ENTITY_INFO_PLAYERS: Set;
    static readonly ATTRIBUTE_MODIFIERS: Map;
    get attributeModifiers(): Map<IIngredient, Consumer<ItemAttributeModifierBase>[]>;
    get burnTimes(): Map<RecipeType<any>, Pair<IIngredient, number>[]>;
    getBurnTime(var1: IItemStack): number;
    onBlockInteract(player: Player, hand: InteractionHand, hitResult: BlockHitResult): boolean;
    onEntityInteract(player: Player, hand: InteractionHand, target: Entity): boolean;
    setBurnTime(ingredient: IIngredient, burnTime: number, type: RecipeType<any>): void;
  }


  class INetworkHelper {
    sendPacket<T extends CraftTweakerPacket>(var1: ServerPlayer, var2: T): void;
  }


  class IPlatformHelper {
    createFluidStack(var1: Fluid, var2: number, var4: DataComponentPatch): IFluidStack;
    createFluidStack<T>(var1: T): IFluidStack;
    createFluidStackMutable(var1: Fluid, var2: number, var4: DataComponentPatch): IFluidStack;
    createFluidStackMutable<T>(var1: T): IFluidStack;
    createItemStack(var1: ItemStack, var2: IngredientConditions, var3: IngredientTransformers): IItemStack;
    createItemStackMutable(var1: ItemStack, var2: IngredientConditions, var3: IngredientTransformers): IItemStack;
    createPossibleEffect(var1: MobEffectInstance, var2: number): PossibleEffect;
    doCraftingTableRecipesConflict(manager: IRecipeManager<any>, first: Recipe<any>, second: Recipe<any>): boolean;
    doesIngredientRequireTesting(var1: Ingredient): boolean;
    fakePlayers(): Stream<GameProfile>;
    findClassesWithAnnotation<T extends Annotation>(var1: Class<T>, var2: Consumer<PlatformMod>, var3: Predicate<Either<T, Map<string, any>>>): Stream<Class<any>>;
    findMappedFieldName(clazz: Class<any>, fieldName: string, fieldType: Class<any>): string;
    findMappedMethodName(clazz: Class<any>, methodName: string, returnType: Class<any>, ...parameterTypes: Class<any>[]): string;
    get gameDirectory(): Path;
    get ingredientAny(): Ingredient;
    get logFormat(): string;
    get lootModifiersMap(): Map<ResourceLocation, ILootModifier>;
    get mods(): Mod[];
    get platformName(): string;
    getBasicTradeForSale(internal: IBasicItemListing): ItemStack;
    getBasicTradeMaxTrades(internal: IBasicItemListing): number;
    getBasicTradePrice(internal: IBasicItemListing): ItemStack;
    getBasicTradePrice2(internal: IBasicItemListing): ItemStack;
    getBasicTradePriceMult(internal: IBasicItemListing): number;
    getBasicTradeXp(internal: IBasicItemListing): number;
    getBucketContent(var1: BucketItem): Fluid;
    getCraftTweakerIngredient(var1: IIngredient): Ingredient;
    getCustomData(var1: Entity): CompoundTag;
    getCustomIngredientItems(ingredient: Ingredient): Stream<ItemStack>;
    getFluidsForDump(var1: ItemStack, var2: Player, var3: InteractionHand): Set<MutableComponent>;
    getIItemStackIngredient(var1: IItemStack): Ingredient;
    getIngredientList(var1: Ingredient[]): Ingredient;
    getMod(var1: string): Optional<Mod>;
    getPersistentData(var1: ServerPlayer): CompoundTag;
    getPlayerInventory(var1: Player): IInventoryWrapper;
    getRemainingItem(stack: ItemStack): IItemStack;
    invalidateIngredients(ingredients: Ingredient[]): void;
    isCustomIngredient(var1: Ingredient): boolean;
    isDataGen(): boolean;
    isDevelopmentEnvironment(): boolean;
    isFakePlayer(var1: Player): boolean;
    isModLoaded(var1: string): boolean;
    setCompostable(stack: IItemStack, value: Optional<number>, undoing: boolean): void;
  }


  class IRegistryHelper {
    biomes(): Registry<Biome>;
    getOrThrow<T>(registry: ResourceKey<Registry<T>>, key: ResourceKey<T>): T;
    holderFromLocationOrThrow<T>(registry: ResourceKey<any>, location: ResourceLocation): Holder<T>;
    holderOrThrow<T>(registry: ResourceKey<any>, thing: T): Holder<T>;
    holderOrThrow<T>(registry: ResourceKey<Registry<T>>, location: ResourceLocation): Holder<T>;
    key<T>(registry: ResourceKey<Registry<T>>, thing: T): Optional<ResourceLocation>;
    keyOrThrow<T>(registry: ResourceKey<Registry<T>>, thing: T): ResourceLocation;
    makeHolder<T>(resourceKey: ResourceKey<any>, objectOrKey: Either<T, ResourceLocation>): Holder<T>;
    makeRegistry<T>(resourceKey: ResourceKey<Registry<T>>): Registry<T>;
    registryOrThrow<T>(registry: ResourceKey<Registry<T>>): Registry<T>;
    resourceKeyOrThrow<T>(registry: ResourceKey<Registry<T>>, thing: T): ResourceKey<T>;
    serverOnlyRegistries(): Set<ResourceKey<Registry<any>>>;
  }

}

declare module 'com.blamejared.crafttweaker.platform.sides' {
  import { Enum } from 'java.lang';
  import { Set, List } from 'java.util';

  interface DistributionType extends Enum<DistributionType> {}
  class DistributionType extends Enum<DistributionType> {
    static readonly CLIENT: DistributionType;
    static readonly SERVER: DistributionType;
    static from(other: Enum<any>): DistributionType;
    get names(): Set<string>;
    isClient(): boolean;
    isServer(): boolean;
    matches(name: string): boolean;
    toString(): string;
    static valueOf(name: string): DistributionType;
    static values(): DistributionType[];
  }

}