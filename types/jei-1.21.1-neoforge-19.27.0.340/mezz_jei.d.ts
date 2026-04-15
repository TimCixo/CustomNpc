declare module 'mezz.jei.api.constants' {
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';

  class ModIds {
    static readonly JEI_ID: string;
    static readonly JEI_NAME: string;
    static readonly MINECRAFT_ID: string;
    static readonly MINECRAFT_NAME: string;
  }


  class RecipeTypes {
    static readonly CRAFTING: RecipeType;
    static readonly STONECUTTING: RecipeType;
    static readonly SMELTING: RecipeType;
    static readonly SMOKING: RecipeType;
    static readonly BLASTING: RecipeType;
    static readonly CAMPFIRE_COOKING: RecipeType;
    static readonly FUELING: RecipeType;
    static readonly BREWING: RecipeType;
    static readonly ANVIL: RecipeType;
    static readonly GRINDSTONE: RecipeType;
    static readonly SMITHING: RecipeType;
    static readonly COMPOSTING: RecipeType;
    static readonly INFORMATION: RecipeType;
  }


  class Tags {
    static readonly HIDDEN_FROM_RECIPE_VIEWERS: ResourceLocation;
  }


  class VanillaTypes {
    static readonly ITEM_STACK: IIngredientTypeWithSubtypes;
  }

}

declare module 'mezz.jei.api.gui.builder' {
  import { IBuilder } from 'mezz.jei.api.gui.builder.IClickableIngredientFactory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ITypedIngredient, IIngredientType, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { List, Optional, Collection } from 'java.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemLike } from 'net.minecraft.world.level';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { ISlottedWidgetFactory } from 'mezz.jei.api.gui.widgets';
  import { IPlaceable } from 'mezz.jei.api.gui.placement';
  import { IRecipeSlotTooltipCallback, IRecipeSlotRichTooltipCallback } from 'mezz.jei.api.gui.ingredient';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { FormattedText, Component } from 'net.minecraft.network.chat';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { IJeiKeyMapping } from 'mezz.jei.api.runtime';
  import { Either } from 'com.mojang.datafixers.util';

  class IClickableIngredientFactory {
    createBuilder(itemStack: ItemStack): IBuilder<ItemStack>;
    createBuilder<T>(var1: ITypedIngredient<T>): IBuilder<T>;
    createBuilder<T>(var1: IIngredientType<T>, var2: T): IBuilder<T>;
  }


  interface IIngredientAcceptor<THIS extends IIngredientAcceptor<THIS> = any> extends IIngredientConsumer {}
  class IIngredientAcceptor<THIS extends IIngredientAcceptor<THIS> = any> extends IIngredientConsumer {
    addFluidStack(var1: Fluid): THIS;
    addFluidStack(var1: Fluid, var2: number): THIS;
    addFluidStack(var1: Fluid, var2: number, var4: DataComponentPatch): THIS;
    addIngredient<I>(var1: IIngredientType<I>, var2: I): THIS;
    addIngredients<I>(var1: IIngredientType<I>, var2: I[]): THIS;
    addIngredients(ingredient: Ingredient): THIS;
    addIngredientsUnsafe(var1: any[]): THIS;
    addItemLike(itemLike: ItemLike): IIngredientConsumer;
    addItemStack(itemStack: ItemStack): THIS;
    addItemStacks(itemStacks: ItemStack[]): THIS;
    addOptionalTypedIngredients(var1: Optional<ITypedIngredient<any>>[]): THIS;
    addTypedIngredient<I>(typedIngredient: ITypedIngredient<I>): THIS;
    addTypedIngredients(var1: ITypedIngredient<any>[]): THIS;
  }


  class IIngredientConsumer {
    addFluidStack(var1: Fluid): IIngredientConsumer;
    addFluidStack(var1: Fluid, var2: number): IIngredientConsumer;
    addFluidStack(var1: Fluid, var2: number, var4: DataComponentPatch): IIngredientConsumer;
    addIngredient<I>(var1: IIngredientType<I>, var2: I): IIngredientConsumer;
    addIngredients<I>(var1: IIngredientType<I>, var2: I[]): IIngredientConsumer;
    addIngredients(ingredient: Ingredient): IIngredientConsumer;
    addIngredientsUnsafe(var1: any[]): IIngredientConsumer;
    addItemLike(itemLike: ItemLike): IIngredientConsumer;
    addItemStack(itemStack: ItemStack): IIngredientConsumer;
    addItemStacks(itemStacks: ItemStack[]): IIngredientConsumer;
    addOptionalTypedIngredients(var1: Optional<ITypedIngredient<any>>[]): IIngredientConsumer;
    addTypedIngredient<I>(typedIngredient: ITypedIngredient<I>): IIngredientConsumer;
    addTypedIngredients(var1: ITypedIngredient<any>[]): IIngredientConsumer;
  }


  class IRecipeLayoutBuilder {
    addInputSlot(x: number, y: number): IRecipeSlotBuilder;
    addInputSlot(): IRecipeSlotBuilder;
    addInvisibleIngredients(var1: RecipeIngredientRole): IIngredientAcceptor<any>;
    addOutputSlot(x: number, y: number): IRecipeSlotBuilder;
    addOutputSlot(): IRecipeSlotBuilder;
    addSlot(role: RecipeIngredientRole, x: number, y: number): IRecipeSlotBuilder;
    addSlot(var1: RecipeIngredientRole): IRecipeSlotBuilder;
    addSlotToWidget(var1: RecipeIngredientRole, var2: ISlottedWidgetFactory<any>): IRecipeSlotBuilder;
    createFocusLink(...var1: IIngredientAcceptor<any>[]): void;
    moveRecipeTransferButton(var1: number, var2: number): void;
    setShapeless(): void;
    setShapeless(var1: number, var2: number): void;
  }


  interface IRecipeSlotBuilder extends IIngredientAcceptor<IRecipeSlotBuilder>, IPlaceable<IRecipeSlotBuilder> {}
  class IRecipeSlotBuilder extends IIngredientAcceptor<IRecipeSlotBuilder> {
    addFluidStack(var1: Fluid, var2: number): IRecipeSlotBuilder;
    addFluidStack(var1: Fluid, var2: number, var4: DataComponentPatch): IRecipeSlotBuilder;
    addFluidStack(var1: Fluid): THIS;
    addRichTooltipCallback(var1: IRecipeSlotRichTooltipCallback): IRecipeSlotBuilder;
    addTooltipCallback(var1: IRecipeSlotTooltipCallback): IRecipeSlotBuilder;
    setBackground(var1: IDrawable, var2: number, var3: number): IRecipeSlotBuilder;
    setCustomRenderer<T>(var1: IIngredientType<T>, var2: IIngredientRenderer<T>): IRecipeSlotBuilder;
    setFluidRenderer(var1: number, var3: boolean, var4: number, var5: number): IRecipeSlotBuilder;
    setOutputSlotBackground(): IRecipeSlotBuilder;
    setOverlay(var1: IDrawable, var2: number, var3: number): IRecipeSlotBuilder;
    setSlotName(var1: string): IRecipeSlotBuilder;
    setStandardSlotBackground(): IRecipeSlotBuilder;
  }


  class ITooltipBuilder {
    add(var1: FormattedText): void;
    add(var1: TooltipComponent): void;
    addAll(var1: Collection<FormattedText>): void;
    addKeyUsageComponent(var1: string, var2: IJeiKeyMapping): void;
    clear(): void;
    clearIngredient(): void;
    get lines(): Either<FormattedText, TooltipComponent>[];
    removeAll(var1: Component[]): void;
    setIngredient(var1: ITypedIngredient<any>): void;
    toLegacyToComponents(): Component[];
  }

}

declare module 'mezz.jei.api.gui.builder.IClickableIngredientFactory' {
  import { Optional } from 'java.util';
  import { IClickableIngredient } from 'mezz.jei.api.runtime';
  import { Rect2i } from 'net.minecraft.client.renderer';

  class IBuilder<T = any> {
    buildWithArea(var1: number, var2: number, var3: number, var4: number): Optional<IClickableIngredient<T>>;
    buildWithArea(var1: Rect2i): Optional<IClickableIngredient<T>>;
  }

}

declare module 'mezz.jei.api.gui.buttons' {
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect2i } from 'net.minecraft.client.renderer';

  class IButtonState {
    setActive(var1: boolean): void;
    setForcePressed(var1: boolean): void;
    setIcon(var1: IDrawable): void;
    setVisible(var1: boolean): void;
  }


  class IIconButtonController {
    drawExtras(guiGraphics: GuiGraphics, buttonArea: Rect2i, mouseX: number, mouseY: number, partialTicks: number): void;
    getTooltips(tooltip: ITooltipBuilder): void;
    initState(state: IButtonState): void;
    onPress(var1: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }

}

declare module 'mezz.jei.api.gui.drawable' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { StartDirection } from 'mezz.jei.api.gui.drawable.IDrawableAnimated';
  import { ITickTimer } from 'mezz.jei.api.gui';
  import { Rect2i } from 'net.minecraft.client.renderer';

  class IDrawable {
    draw(guiGraphics: GuiGraphics): void;
    draw(var1: GuiGraphics, var2: number, var3: number): void;
    get height(): number;
    get width(): number;
  }


  interface IDrawableAnimated extends IDrawable {}
  class IDrawableAnimated extends IDrawable {
  }


  class IDrawableBuilder {
    addPadding(var1: number, var2: number, var3: number, var4: number): IDrawableBuilder;
    build(): IDrawableStatic;
    buildAnimated(var1: number, var2: StartDirection, var3: boolean): IDrawableAnimated;
    buildAnimated(var1: ITickTimer, var2: StartDirection): IDrawableAnimated;
    setTextureSize(var1: number, var2: number): IDrawableBuilder;
    trim(var1: number, var2: number, var3: number, var4: number): IDrawableBuilder;
  }


  interface IDrawableStatic extends IDrawable {}
  class IDrawableStatic extends IDrawable {
    draw(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void;
    draw(guiGraphics: GuiGraphics): void;
    draw(var1: GuiGraphics, var2: number, var3: number): void;
  }


  class IScalableDrawable {
    draw(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
    draw(guiGraphics: GuiGraphics, area: Rect2i): void;
  }

}

declare module 'mezz.jei.api.gui.drawable.IDrawableAnimated' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface StartDirection extends Enum<StartDirection> {}
  class StartDirection extends Enum<StartDirection> {
    static readonly TOP: StartDirection;
    static readonly BOTTOM: StartDirection;
    static readonly LEFT: StartDirection;
    static readonly RIGHT: StartDirection;
    static valueOf(name: string): StartDirection;
    static values(): StartDirection[];
  }

}

declare module 'mezz.jei.api.gui.handlers' {
  import { List, Collection, Optional } from 'java.util';
  import { Target } from 'mezz.jei.api.gui.handlers.IGhostIngredientHandler';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { IClickableIngredient, IRecipesGui } from 'mezz.jei.api.runtime';
  import { IClickableIngredientFactory, ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { Component } from 'net.minecraft.network.chat';
  import { IFocusFactory, RecipeType } from 'mezz.jei.api.recipe';
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Function } from 'java.util.function';

  class IGhostIngredientHandler<T extends Screen = any> {
    getTargetsTyped<I>(var1: T, var2: ITypedIngredient<I>, var3: boolean): Target<I>[];
    onComplete(): void;
    shouldHighlightTargets(): boolean;
  }


  class IGlobalGuiHandler {
    get guiExtraAreas(): Collection<Rect2i>;
    getClickableIngredientUnderMouse(builder: IClickableIngredientFactory, mouseX: number, mouseY: number): Optional<IClickableIngredient<any>>;
    getClickableIngredientUnderMouse(mouseX: number, mouseY: number): Optional<IClickableIngredient<any>>;
  }


  class IGuiClickableArea {
    static createBasic(xPos: number, yPos: number, width: number, height: number, ...recipeTypes: RecipeType<any>[]): IGuiClickableArea;
    get area(): Rect2i;
    get tooltipStrings(): Component[];
    getTooltip(tooltip: ITooltipBuilder): void;
    isTooltipEnabled(): boolean;
    onClick(var1: IFocusFactory, var2: IRecipesGui): void;
  }


  class IGuiContainerHandler<T extends AbstractContainerScreen<any> = any> {
    getClickableIngredientUnderMouse(builder: IClickableIngredientFactory, containerScreen: T, mouseX: number, mouseY: number): Optional<IClickableIngredient<any>>;
    getClickableIngredientUnderMouse(containerScreen: T, mouseX: number, mouseY: number): Optional<IClickableIngredient<any>>;
    getGuiClickableAreas(containerScreen: T, guiMouseX: number, guiMouseY: number): Collection<IGuiClickableArea>;
    getGuiExtraAreas(containerScreen: T): Rect2i[];
  }


  class IGuiProperties {
    guiLeft(): number;
    guiTop(): number;
    guiXSize(): number;
    guiYSize(): number;
    screenClass(): Class<Screen>;
    screenHeight(): number;
    screenWidth(): number;
  }


  interface IScreenHandler<T extends Screen = any> extends Function<T, IGuiProperties> {}
  class IScreenHandler<T extends Screen = any> extends Function<T, IGuiProperties> {
    apply(var1: T): IGuiProperties;
  }

}

declare module 'mezz.jei.api.gui.handlers.IGhostIngredientHandler' {
  import { Consumer } from 'java.util.function';
  import { Rect2i } from 'net.minecraft.client.renderer';

  interface Target<I = any> extends Consumer<I> {}
  class Target<I = any> extends Consumer<I> {
    accept(var1: I): void;
    get area(): Rect2i;
  }

}

declare module 'mezz.jei.api.gui.ingredient' {
  import { List, Optional } from 'java.util';
  import { IRecipeSlotBuilder, IRecipeLayoutBuilder, ITooltipBuilder, IIngredientConsumer } from 'mezz.jei.api.gui.builder';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { Stream } from 'java.util.stream';

  class ICraftingGridHelper {
    createAndSetIngredients(var1: IRecipeLayoutBuilder, var2: Ingredient[], var3: number, var4: number): void;
    createAndSetInputs(builder: IRecipeLayoutBuilder, inputs: ItemStack[][], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetInputs<T>(var1: IRecipeLayoutBuilder, var2: IIngredientType<T>, var3: T[][], var4: number, var5: number): IRecipeSlotBuilder[];
    createAndSetNamedIngredients(var1: IRecipeLayoutBuilder, var2: Pair<string, Ingredient>[], var3: number, var4: number): IRecipeSlotBuilder[];
    createAndSetNamedInputs(builder: IRecipeLayoutBuilder, namedInputs: Pair<string, ItemStack[]>[], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetNamedInputs<T>(var1: IRecipeLayoutBuilder, var2: IIngredientType<T>, var3: Pair<string, T[]>[], var4: number, var5: number): IRecipeSlotBuilder[];
    createAndSetOutputs(builder: IRecipeLayoutBuilder, outputs: ItemStack[]): IRecipeSlotBuilder;
    createAndSetOutputs<T>(var1: IRecipeLayoutBuilder, var2: IIngredientType<T>, var3: T[]): IRecipeSlotBuilder;
    setInputs<T>(var1: IRecipeSlotBuilder[], var2: IIngredientType<T>, var3: T[][], var4: number, var5: number): void;
  }


  interface IRecipeSlotDrawable extends IRecipeSlotView {}
  class IRecipeSlotDrawable extends IRecipeSlotView {
    addTooltipCallback(tooltipCallback: IRecipeSlotTooltipCallback): void;
    clearDisplayOverrides(): void;
    createDisplayOverrides(): IIngredientConsumer;
    draw(var1: GuiGraphics): void;
    drawHoverOverlays(var1: GuiGraphics): void;
    drawTooltip(var1: GuiGraphics, var2: number, var3: number): void;
    get areaIncludingBackground(): Rect2i;
    get rect(): Rect2i;
    get tooltip(): Component[];
    getTooltip(var1: ITooltipBuilder): void;
    isMouseOver(var1: number, var3: number): boolean;
    setPosition(var1: number, var2: number): void;
  }


  class IRecipeSlotDrawablesView {
    findSlotByName(slotName: string): Optional<IRecipeSlotDrawable>;
    get slots(): IRecipeSlotDrawable[];
    getSlots(role: RecipeIngredientRole): IRecipeSlotDrawable[];
  }


  class IRecipeSlotRichTooltipCallback {
    onRichTooltip(var1: IRecipeSlotView, var2: ITooltipBuilder): void;
  }


  class IRecipeSlotsView {
    findSlotByName(slotName: string): Optional<IRecipeSlotView>;
    get slotViews(): IRecipeSlotView[];
    getSlotViews(role: RecipeIngredientRole): IRecipeSlotView[];
  }


  class IRecipeSlotTooltipCallback {
    onRichTooltip(recipeSlotView: IRecipeSlotView, tooltip: ITooltipBuilder): void;
    onTooltip(var1: IRecipeSlotView, var2: Component[]): void;
  }


  class IRecipeSlotView {
    drawHighlight(var1: GuiGraphics, var2: number): void;
    get allIngredients(): Stream<ITypedIngredient<any>>;
    get allIngredientsList(): ITypedIngredient<any>[];
    get displayedIngredient(): Optional<ITypedIngredient<any>>;
    get displayedItemStack(): Optional<ItemStack>;
    get itemStacks(): Stream<ItemStack>;
    get role(): RecipeIngredientRole;
    get slotName(): Optional<string>;
    getDisplayedIngredient<T>(ingredientType: IIngredientType<T>): Optional<T>;
    getIngredients<T>(ingredientType: IIngredientType<T>): Stream<T>;
    isEmpty(): boolean;
  }

}

declare module 'mezz.jei.api.gui.inputs' {
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { IJeiKeyMapping } from 'mezz.jei.api.runtime';

  class IJeiGuiEventListener {
    get area(): ScreenRectangle;
    keyPressed(mouseX: number, mouseY: number, keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
  }


  class IJeiInputHandler {
    get area(): ScreenRectangle;
    handleInput(mouseX: number, mouseY: number, input: IJeiUserInput): boolean;
    handleMouseDragged(mouseX: number, mouseY: number, mouseKey: Key, dragX: number, dragY: number): boolean;
    handleMouseMoved(mouseX: number, mouseY: number): void;
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
  }


  class IJeiUserInput {
    get key(): Key;
    get modifiers(): number;
    is(var1: KeyMapping): boolean;
    is(var1: IJeiKeyMapping): boolean;
    isSimulate(): boolean;
  }

}

declare module 'mezz.jei.api.gui' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Optional } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientType } from 'mezz.jei.api.ingredients';
  import { IRecipeSlotDrawable, IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { RecipeSlotUnderMouse, IJeiInputHandler } from 'mezz.jei.api.gui.inputs';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';

  class IRecipeLayoutDrawable<R = any> {
    drawOverlays(var1: GuiGraphics, var2: number, var3: number): void;
    drawRecipe(var1: GuiGraphics, var2: number, var3: number): void;
    get inputHandler(): IJeiInputHandler;
    get recipe(): R;
    get recipeBookmarkButtonArea(): Rect2i;
    get recipeCategory(): IRecipeCategory<R>;
    get recipeSlotsView(): IRecipeSlotsView;
    get recipeTransferButtonArea(): Rect2i;
    get rect(): Rect2i;
    get rectWithBorder(): Rect2i;
    getIngredientUnderMouse<T>(var1: number, var2: number, var3: IIngredientType<T>): Optional<T>;
    getItemStackUnderMouse(mouseX: number, mouseY: number): Optional<ItemStack>;
    getRecipeSlotUnderMouse(var1: number, var3: number): Optional<IRecipeSlotDrawable>;
    getSideButtonArea(var1: number): Rect2i;
    getSlotUnderMouse(var1: number, var3: number): Optional<RecipeSlotUnderMouse>;
    isMouseOver(var1: number, var3: number): boolean;
    setPosition(var1: number, var2: number): void;
    tick(): void;
  }


  class ITickTimer {
    get maxValue(): number;
    get value(): number;
  }

}

declare module 'mezz.jei.api.gui.placement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HorizontalAlignment extends Enum<HorizontalAlignment> {}
  class HorizontalAlignment extends Enum<HorizontalAlignment> {
    static readonly LEFT: HorizontalAlignment;
    static readonly CENTER: HorizontalAlignment;
    static readonly RIGHT: HorizontalAlignment;
    getXPos(var1: number, var2: number): number;
    static valueOf(name: string): HorizontalAlignment;
    static values(): HorizontalAlignment[];
  }


  class IPlaceable<THIS extends IPlaceable<THIS> = any> {
    get height(): number;
    get width(): number;
    setPosition(var1: number, var2: number): THIS;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): THIS;
  }


  interface VerticalAlignment extends Enum<VerticalAlignment> {}
  class VerticalAlignment extends Enum<VerticalAlignment> {
    static readonly TOP: VerticalAlignment;
    static readonly CENTER: VerticalAlignment;
    static readonly BOTTOM: VerticalAlignment;
    getYPos(var1: number, var2: number): number;
    static valueOf(name: string): VerticalAlignment;
    static values(): VerticalAlignment[];
  }

}

declare module 'mezz.jei.api.gui.widgets' {
  import { IRecipeSlotDrawablesView, IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IPlaceable, HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';
  import { List, Optional } from 'java.util';
  import { IJeiInputHandler, IJeiGuiEventListener, RecipeSlotUnderMouse } from 'mezz.jei.api.gui.inputs';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { ScreenPosition, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';

  class IRecipeExtrasBuilder {
    addAnimatedRecipeArrow(ticksPerCycle: number, xPos: number, yPos: number): void;
    addAnimatedRecipeArrow(var1: number): IPlaceable<any>;
    addAnimatedRecipeFlame(cookTime: number, xPos: number, yPos: number): void;
    addAnimatedRecipeFlame(var1: number): IPlaceable<any>;
    addDrawable(var1: IDrawable, var2: number, var3: number): void;
    addDrawable(var1: IDrawable): IPlaceable<any>;
    addGuiEventListener(var1: IJeiGuiEventListener): void;
    addInputHandler(var1: IJeiInputHandler): void;
    addRecipeArrow(xPos: number, yPos: number): void;
    addRecipeArrow(): IPlaceable<any>;
    addRecipePlusSign(xPos: number, yPos: number): void;
    addRecipePlusSign(): IPlaceable<any>;
    addScrollBoxWidget(var1: number, var2: number, var3: number, var4: number): IScrollBoxWidget;
    addScrollGridWidget(var1: IRecipeSlotDrawable[], var2: number, var3: number): IScrollGridWidget;
    addSlottedWidget(var1: ISlottedRecipeWidget, var2: IRecipeSlotDrawable[]): void;
    addText(text: FormattedText, maxWidth: number, maxHeight: number): ITextWidget;
    addText(var1: FormattedText[], var2: number, var3: number): ITextWidget;
    addText(text: FormattedText, xPos: number, yPos: number, maxWidth: number, maxHeight: number): ITextWidget;
    addText(text: FormattedText[], xPos: number, yPos: number, maxWidth: number, maxHeight: number): ITextWidget;
    addWidget(var1: IRecipeWidget): void;
    get recipeSlots(): IRecipeSlotDrawablesView;
  }


  class IRecipeWidget {
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get position(): ScreenPosition;
    getTooltip(tooltip: ITooltipBuilder, mouseX: number, mouseY: number): void;
    tick(): void;
  }


  interface IScrollBoxWidget extends IRecipeWidget, IJeiInputHandler {}
  class IScrollBoxWidget extends IRecipeWidget {
    get contentAreaHeight(): number;
    get contentAreaWidth(): number;
    setContents(var1: IDrawable): IScrollBoxWidget;
    setContents(var1: FormattedText[]): IScrollBoxWidget;
  }


  interface IScrollGridWidget extends ISlottedRecipeWidget, IPlaceable<IScrollGridWidget> {}
  class IScrollGridWidget extends ISlottedRecipeWidget {
    get screenRectangle(): ScreenRectangle;
  }


  interface IScrollGridWidgetFactory<R = any> extends ISlottedWidgetFactory<R> {}
  class IScrollGridWidgetFactory<R = any> extends ISlottedWidgetFactory<R> {
    get area(): ScreenRectangle;
    setPosition(var1: number, var2: number): void;
  }


  interface ISlottedRecipeWidget extends IRecipeWidget {}
  class ISlottedRecipeWidget extends IRecipeWidget {
    getSlotUnderMouse(var1: number, var3: number): Optional<RecipeSlotUnderMouse>;
  }


  class ISlottedWidgetFactory<R = any> {
    createWidgetForSlots(var1: IRecipeExtrasBuilder, var2: R, var3: IRecipeSlotDrawable[]): void;
  }


  interface ITextWidget extends IPlaceable<ITextWidget> {}
  class ITextWidget extends IPlaceable<ITextWidget> {
    alignHorizontalCenter(): ITextWidget;
    alignHorizontalLeft(): ITextWidget;
    alignHorizontalRight(): ITextWidget;
    alignVerticalBottom(): ITextWidget;
    alignVerticalCenter(): ITextWidget;
    alignVerticalTop(): ITextWidget;
    setColor(var1: number): ITextWidget;
    setFont(var1: Font): ITextWidget;
    setLineSpacing(var1: number): ITextWidget;
    setShadow(var1: boolean): ITextWidget;
    setTextAlignment(var1: HorizontalAlignment): ITextWidget;
    setTextAlignment(var1: VerticalAlignment): ITextWidget;
  }

}

declare module 'mezz.jei.api.helpers' {
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { IIngredientType, ITypedIngredient, IIngredientHelper, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { RecipeType, IRecipeManager, IFocusFactory } from 'mezz.jei.api.recipe';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { List, Optional, Set } from 'java.util';
  import { Integer, Class } from 'java.lang';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IDrawableStatic, IDrawableBuilder, IDrawableAnimated, IDrawable } from 'mezz.jei.api.gui.drawable';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StartDirection } from 'mezz.jei.api.gui.drawable.IDrawableAnimated';
  import { ITickTimer } from 'mezz.jei.api.gui';
  import { ItemLike } from 'net.minecraft.world.level';
  import { ICraftingGridHelper } from 'mezz.jei.api.gui.ingredient';
  import { IScrollGridWidgetFactory, IScrollBoxWidget, IRecipeWidget } from 'mezz.jei.api.gui.widgets';
  import { Stream } from 'java.util.stream';
  import { IIngredientManager, IIngredientVisibility } from 'mezz.jei.api.runtime';
  import { IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { Component } from 'net.minecraft.network.chat';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Holder } from 'net.minecraft.core';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { UidContext } from 'mezz.jei.api.ingredients.subtypes';

  class ICodecHelper {
    get ingredientTypeCodec(): Codec<IIngredientType<any>>;
    get recipeHolderCodec<T extends RecipeHolder<any>>(): Codec<T>;
    get typedIngredientCodec(): MapCodec<ITypedIngredient<any>>;
    getRecipeTypeCodec(var1: IRecipeManager): Codec<RecipeType<any>>;
    getSlowRecipeCategoryCodec<T>(var1: IRecipeCategory<T>, var2: IRecipeManager): Codec<T>;
    getTypedIngredientCodec<T>(var1: IIngredientType<T>): Codec<ITypedIngredient<T>>;
  }


  class IColorHelper {
    getClosestColorName(var1: number): string;
    getColors(var1: TextureAtlasSprite, var2: number, var3: number): number[];
    getColors(var1: ItemStack, var2: number): number[];
  }


  class IGuiHelper {
    createAnimatedDrawable(var1: IDrawableStatic, var2: number, var3: StartDirection, var4: boolean): IDrawableAnimated;
    createAnimatedDrawable(var1: IDrawableStatic, var2: ITickTimer, var3: StartDirection): IDrawableAnimated;
    createAnimatedRecipeArrow(var1: number): IDrawableAnimated;
    createAnimatedRecipeFlame(var1: number): IDrawableAnimated;
    createBlankDrawable(var1: number, var2: number): IDrawableStatic;
    createCraftingGridHelper(): ICraftingGridHelper;
    createDrawable(resourceLocation: ResourceLocation, u: number, v: number, width: number, height: number): IDrawableStatic;
    createDrawableIngredient<V>(var1: IIngredientType<V>, var2: V): IDrawable;
    createDrawableIngredient<V>(var1: ITypedIngredient<V>): IDrawable;
    createDrawableItemLike(itemLike: ItemLike): IDrawable;
    createDrawableItemStack(ingredient: ItemStack): IDrawable;
    createScrollBoxWidget(var1: IDrawable, var2: number, var3: number, var4: number): IScrollBoxWidget;
    createScrollBoxWidget(var1: number, var2: number, var3: number, var4: number): IScrollBoxWidget;
    createScrollGridFactory(var1: number, var2: number): IScrollGridWidgetFactory<any>;
    createTickTimer(var1: number, var2: number, var3: boolean): ITickTimer;
    createWidgetFromDrawable(var1: IDrawable, var2: number, var3: number): IRecipeWidget;
    drawableBuilder(var1: ResourceLocation, var2: number, var3: number, var4: number, var5: number): IDrawableBuilder;
    get outputSlot(): IDrawableStatic;
    get recipeArrow(): IDrawableStatic;
    get recipeArrowFilled(): IDrawableStatic;
    get recipeFlameEmpty(): IDrawableStatic;
    get recipeFlameFilled(): IDrawableStatic;
    get recipePlusSign(): IDrawableStatic;
    get scrollBoxScrollbarExtraWidth(): number;
    get slotDrawable(): IDrawableStatic;
  }


  class IJeiHelpers {
    get allRecipeTypes(): Stream<RecipeType<any>>;
    get codecHelper(): ICodecHelper;
    get colorHelper(): IColorHelper;
    get focusFactory(): IFocusFactory;
    get guiHelper(): IGuiHelper;
    get ingredientManager(): IIngredientManager;
    get ingredientVisibility(): IIngredientVisibility;
    get modIdHelper(): IModIdHelper;
    get platformFluidHelper(): IPlatformFluidHelper<any>;
    get stackHelper(): IStackHelper;
    get vanillaRecipeFactory(): IVanillaRecipeFactory;
    getRecipeType<T>(var1: ResourceLocation, var2: Class<T>): Optional<RecipeType<T>>;
    getRecipeType(var1: ResourceLocation): Optional<RecipeType<any>>;
  }


  class IModIdHelper {
    addModNameToIngredientTooltip<T>(var1: Component[], var2: T, var3: IIngredientHelper<T>): Component[];
    addModNameToIngredientTooltip<T>(var1: Component[], var2: ITypedIngredient<T>): Component[];
    getFormattedModNameForModId(var1: string): string;
    getModAliases(var1: string): Set<string>;
    getModNameForModId(var1: string): string;
    getModNameForTooltip<T>(var1: ITypedIngredient<T>): Optional<Component>;
    isDisplayingModNameEnabled(): boolean;
  }


  class IPlatformFluidHelper<T = any> {
    bucketVolume(): number;
    create(var1: Holder<Fluid>, var2: number, var4: DataComponentPatch): T;
    create(var1: Holder<Fluid>, var2: number): T;
    get fluidIngredientType(): IIngredientTypeWithSubtypes<Fluid, T>;
  }


  class IStackHelper {
    getUidForStack(var1: ItemStack, var2: UidContext): any;
    getUidForStack(var1: ITypedIngredient<ItemStack>, var2: UidContext): any;
    getUniqueIdentifierForStack(var1: ItemStack, var2: UidContext): string;
    isEquivalent(var1: ItemStack, var2: ItemStack, var3: UidContext): boolean;
  }

}

declare module 'mezz.jei.api' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ISubtypeRegistration, IModIngredientRegistration, IExtraIngredientRegistration, IIngredientAliasRegistration, IModInfoRegistration, IRecipeCategoryRegistration, IVanillaCategoryExtensionRegistration, IRecipeRegistration, IRecipeTransferRegistration, IRecipeCatalystRegistration, IGuiHandlerRegistration, IAdvancedRegistration, IRuntimeRegistration } from 'mezz.jei.api.registration';
  import { IPlatformFluidHelper } from 'mezz.jei.api.helpers';
  import { IJeiRuntime } from 'mezz.jei.api.runtime';
  import { IJeiConfigManager } from 'mezz.jei.api.runtime.config';

  class IModPlugin {
    get pluginUid(): ResourceLocation;
    onConfigManagerAvailable(configManager: IJeiConfigManager): void;
    onRuntimeAvailable(jeiRuntime: IJeiRuntime): void;
    onRuntimeUnavailable(): void;
    registerAdvanced(registration: IAdvancedRegistration): void;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerExtraIngredients(registration: IExtraIngredientRegistration): void;
    registerFluidSubtypes<T>(registration: ISubtypeRegistration, platformFluidHelper: IPlatformFluidHelper<T>): void;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerIngredientAliases(registration: IIngredientAliasRegistration): void;
    registerIngredients(registration: IModIngredientRegistration): void;
    registerItemSubtypes(registration: ISubtypeRegistration): void;
    registerModInfo(modAliasRegistration: IModInfoRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipeTransferHandlers(registration: IRecipeTransferRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
    registerRuntime(registration: IRuntimeRegistration): void;
    registerVanillaCategoryExtensions(registration: IVanillaCategoryExtensionRegistration): void;
  }

}

declare module 'mezz.jei.api.ingredients' {
  import { UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { Iterable, Integer, Class } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { Optional, Collection, List } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { BatchRenderElement } from 'mezz.jei.api.ingredients.rendering';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { Minecraft } from 'net.minecraft.client';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';

  class IIngredientHelper<V = any> {
    copyIngredient(var1: V): V;
    copyWithAmount(ingredient: V, amount: number): V;
    get ingredientType(): IIngredientType<V>;
    getAmount(ingredient: V): number;
    getCheatItemStack(ingredient: V): ItemStack;
    getColors(ingredient: V): Iterable<number>;
    getDisplayModId(ingredient: V): string;
    getDisplayName(var1: V): string;
    getErrorInfo(var1: V): string;
    getGroupingUid(ingredient: V): any;
    getGroupingUid(typedIngredient: ITypedIngredient<V>): any;
    getResourceLocation(var1: V): ResourceLocation;
    getTagEquivalent(ingredients: Collection<V>): Optional<ResourceLocation>;
    getTagKeyEquivalent(ingredients: Collection<V>): Optional<TagKey<any>>;
    getTagStream(ingredient: V): Stream<ResourceLocation>;
    getUid(ingredient: V, context: UidContext): any;
    getUid(typedIngredient: ITypedIngredient<V>, context: UidContext): any;
    getUniqueId(var1: V, var2: UidContext): string;
    getWildcardId(ingredient: V): string;
    hasSubtypes(ingredient: V): boolean;
    isHiddenFromRecipeViewersByTags(ingredient: V): boolean;
    isHiddenFromRecipeViewersByTags(ingredient: ITypedIngredient<V>): boolean;
    isIngredientOnServer(ingredient: V): boolean;
    isValidIngredient(ingredient: V): boolean;
    normalizeIngredient(ingredient: V): V;
  }


  class IIngredientRenderer<T = any> {
    get height(): number;
    get width(): number;
    getFontRenderer(minecraft: Minecraft, ingredient: T): Font;
    getTooltip(var1: T, var2: TooltipFlag): Component[];
    getTooltip(tooltip: ITooltipBuilder, ingredient: T, tooltipFlag: TooltipFlag): void;
    render(var1: GuiGraphics, var2: T): void;
    render(guiGraphics: GuiGraphics, ingredient: T, posX: number, posY: number): void;
    renderBatch(guiGraphics: GuiGraphics, elements: BatchRenderElement<T>[]): void;
  }


  class IIngredientSupplier {
    getIngredients(var1: RecipeIngredientRole): ITypedIngredient<any>[];
  }


  class IIngredientType<T = any> {
    castIngredient(ingredient: any): Optional<T>;
    get ingredientClass(): Class<T>;
    get uid(): string;
    getCastIngredient(ingredient: any): T;
  }


  interface IIngredientTypeWithSubtypes<B = any, I = any> extends IIngredientType<I> {}
  class IIngredientTypeWithSubtypes<B = any, I = any> extends IIngredientType<I> {
    get ingredientBaseClass(): Class<B>;
    get ingredientClass(): Class<I>;
    getBase(var1: I): B;
    getDefaultIngredient(base: B): I;
  }


  class ITypedIngredient<T = any> {
    cast<V>(ingredientType: IIngredientType<V>): ITypedIngredient<V>;
    castToItemStackType(): ITypedIngredient<ItemStack>;
    get ingredient(): T;
    get itemStack(): Optional<ItemStack>;
    get type(): IIngredientType<T>;
    getBaseIngredient<B>(ingredientType: IIngredientTypeWithSubtypes<B, T>): B;
    getCastIngredient<V>(ingredientType: IIngredientType<V>): V;
    getIngredient<V>(ingredientType: IIngredientType<V>): Optional<V>;
  }

}

declare module 'mezz.jei.api.ingredients.subtypes' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientTypeWithSubtypes, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class IIngredientSubtypeInterpreter<T = any> {
    static readonly NONE: string;
    apply(var1: T, var2: UidContext): string;
  }


  class ISubtypeInterpreter<T = any> {
    getLegacyStringSubtypeInfo(var1: T, var2: UidContext): string;
    getSubtypeData(var1: T, var2: UidContext): any;
  }


  class ISubtypeManager {
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
    getSubtypeData<T>(var1: IIngredientTypeWithSubtypes<any, T>, var2: T, var3: UidContext): any;
    getSubtypeData<B, T>(var1: IIngredientTypeWithSubtypes<B, T>, var2: ITypedIngredient<T>, var3: UidContext): any;
    getSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    getSubtypeInfo<T>(var1: IIngredientTypeWithSubtypes<any, T>, var2: T, var3: UidContext): string;
    hasSubtypes(ingredient: ItemStack): boolean;
    hasSubtypes<T, B>(var1: IIngredientTypeWithSubtypes<B, T>, var2: T): boolean;
  }


  interface UidContext extends Enum<UidContext> {}
  class UidContext extends Enum<UidContext> {
    static readonly Ingredient: UidContext;
    static readonly Recipe: UidContext;
    static valueOf(name: string): UidContext;
    static values(): UidContext[];
  }

}

declare module 'mezz.jei.api.neoforge' {
  import { IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';

  class NeoForgeTypes {
    static readonly FLUID_STACK: IIngredientTypeWithSubtypes;
  }

}

declare module 'mezz.jei.api.recipe.advanced' {
  import { IIconButtonController } from 'mezz.jei.api.gui.buttons';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { List } from 'java.util';
  import { RecipeType, IFocus } from 'mezz.jei.api.recipe';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';

  class IRecipeButtonControllerFactory {
    createButtonController<T>(var1: IRecipeLayoutDrawable<T>): IIconButtonController;
  }


  class IRecipeManagerPlugin {
    getRecipeTypes<V>(var1: IFocus<V>): RecipeType<any>[];
    getRecipes<T, V>(var1: IRecipeCategory<T>, var2: IFocus<V>): T[];
    getRecipes<T>(var1: IRecipeCategory<T>): T[];
  }


  class IRecipeManagerPluginHelper {
    isRecipeCatalyst(var1: RecipeType<any>, var2: IFocus<any>): boolean;
  }


  class ISimpleRecipeManagerPlugin<T = any> {
    get allRecipes(): T[];
    getRecipesForInput(var1: ITypedIngredient<any>): T[];
    getRecipesForOutput(var1: ITypedIngredient<any>): T[];
    isHandledInput(var1: ITypedIngredient<any>): boolean;
    isHandledOutput(var1: ITypedIngredient<any>): boolean;
  }

}

declare module 'mezz.jei.api.recipe.category' {
  import { RecipeType, IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder, ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { IRecipeSlotsView, IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';
  import { ICodecHelper } from 'mezz.jei.api.helpers';

  interface AbstractRecipeCategory<T = any> extends IRecipeCategory<T> {}
  class AbstractRecipeCategory<T = any> extends IRecipeCategory<T> {
    constructor(recipeType: RecipeType<T>, title: Component, icon: IDrawable, width: number, height: number);
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<T>;
    get title(): Component;
    get width(): number;
  }


  class IRecipeCategory<T = any> {
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: T, recipeSlotsView: IRecipeSlotsView, focuses: IFocusGroup): void;
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: T, focuses: IFocusGroup): void;
    draw(recipe: T, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get background(): IDrawable;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<T>;
    get title(): Component;
    get width(): number;
    getCodec(codecHelper: ICodecHelper, recipeManager: IRecipeManager): Codec<T>;
    getRegistryName(recipe: T): ResourceLocation;
    getTooltip(tooltip: ITooltipBuilder, recipe: T, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): void;
    getTooltipStrings(recipe: T, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    handleInput(recipe: T, mouseX: number, mouseY: number, input: Key): boolean;
    isHandled(recipe: T): boolean;
    needsRecipeBorder(): boolean;
    onDisplayedIngredientsUpdate(recipe: T, recipeSlots: IRecipeSlotDrawable[], focuses: IFocusGroup): void;
    setRecipe(var1: IRecipeLayoutBuilder, var2: T, var3: IFocusGroup): void;
  }

}

declare module 'mezz.jei.api.recipe.category.extensions' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Class } from 'java.lang';
  import { Function, Predicate } from 'java.util.function';
  import { IRecipeSlotsView, ICraftingGridHelper } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { Key } from 'InputConstants';

  interface IExtendableRecipeCategory<T = any, W extends IRecipeCategoryExtension<T> = any> extends IRecipeCategory<T> {}
  class IExtendableRecipeCategory<T = any, W extends IRecipeCategoryExtension<T> = any> extends IRecipeCategory<T> {
    addCategoryExtension<R extends T>(var1: Class<R>, var2: Function<R, W>): void;
    addCategoryExtension<R extends T>(var1: Class<R>, var2: Predicate<R>, var3: Function<R, W>): void;
  }


  class IRecipeCategoryDecorator<T = any> {
    decorateExistingTooltips(tooltips: Component[], recipe: T, recipeCategory: IRecipeCategory<T>, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): Component[];
    decorateTooltips(tooltip: ITooltipBuilder, recipe: T, recipeCategory: IRecipeCategory<T>, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): void;
    draw(recipe: T, recipeCategory: IRecipeCategory<T>, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
  }


  class IRecipeCategoryExtension<T = any> {
    createRecipeExtras(recipe: T, builder: IRecipeExtrasBuilder, recipeSlotsView: IRecipeSlotsView, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
    createRecipeExtras(recipe: T, builder: IRecipeExtrasBuilder, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
    drawInfo(recipe: T, recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawInfo(recipeWidth: number, recipeHeight: number, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getTooltip(tooltip: ITooltipBuilder, recipe: T, mouseX: number, mouseY: number): void;
    getTooltipStrings(recipe: T, mouseX: number, mouseY: number): Component[];
    getTooltipStrings(mouseX: number, mouseY: number): Component[];
    handleInput(recipe: T, mouseX: number, mouseY: number, input: Key): boolean;
    handleInput(mouseX: number, mouseY: number, input: Key): boolean;
    isHandled(recipe: T): boolean;
  }

}

declare module 'mezz.jei.api.recipe.category.extensions.vanilla.crafting' {
  import { IRecipeCategoryExtension } from 'mezz.jei.api.recipe.category.extensions';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { ICraftingGridHelper, IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { List, Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';

  interface ICraftingCategoryExtension<R extends CraftingRecipe = any> extends IRecipeCategoryExtension<RecipeHolder> {}
  class ICraftingCategoryExtension<R extends CraftingRecipe = any> extends IRecipeCategoryExtension<RecipeHolder> {
    get height(): number;
    get registryName(): ResourceLocation;
    get width(): number;
    getHeight(recipeHolder: RecipeHolder<R>): number;
    getRegistryName(recipeHolder: RecipeHolder<R>): Optional<ResourceLocation>;
    getWidth(recipeHolder: RecipeHolder<R>): number;
    onDisplayedIngredientsUpdate(recipeHolder: RecipeHolder<R>, recipeSlots: IRecipeSlotDrawable[], focuses: IFocusGroup): void;
    setRecipe(recipeHolder: RecipeHolder<R>, builder: IRecipeLayoutBuilder, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
  }


  class IExtendableCraftingRecipeCategory {
    addExtension<R extends CraftingRecipe>(var1: Class<R>, var2: ICraftingCategoryExtension<R>): void;
  }

}

declare module 'mezz.jei.api.recipe.category.extensions.vanilla.smithing' {
  import { Class } from 'java.lang';
  import { SmithingRecipe } from 'net.minecraft.world.item.crafting';
  import { IIngredientAcceptor } from 'mezz.jei.api.gui.builder';
  import { IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { IFocusGroup } from 'mezz.jei.api.recipe';

  class IExtendableSmithingRecipeCategory {
    addExtension<R extends SmithingRecipe>(var1: Class<R>, var2: ISmithingCategoryExtension<R>): void;
  }


  class ISmithingCategoryExtension<R extends SmithingRecipe = any> {
    onDisplayedIngredientsUpdate(recipe: R, templateSlot: IRecipeSlotDrawable, baseSlot: IRecipeSlotDrawable, additionSlot: IRecipeSlotDrawable, outputSlot: IRecipeSlotDrawable, focuses: IFocusGroup): void;
    setAddition<T extends IIngredientAcceptor<T>>(var1: R, var2: T): void;
    setBase<T extends IIngredientAcceptor<T>>(var1: R, var2: T): void;
    setOutput<T extends IIngredientAcceptor<T>>(recipe: R, ingredientAcceptor: T): void;
    setTemplate<T extends IIngredientAcceptor<T>>(var1: R, var2: T): void;
  }

}

declare module 'mezz.jei.api.recipe' {
  import { ITypedIngredient, IIngredientType, IIngredientSupplier } from 'mezz.jei.api.ingredients';
  import { Optional, Collection, List, Set } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { IScalableDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { Integer, Class, Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeButtonControllerFactory } from 'mezz.jei.api.recipe.advanced';
  import { RecipeHolder, RecipeType as net_minecraft_world_item_crafting_RecipeType, Recipe } from 'net.minecraft.world.item.crafting';
  import { Supplier } from 'java.util.function';

  class IFocus<V = any> {
    checkedCast<T>(var1: IIngredientType<T>): Optional<IFocus<T>>;
    get role(): RecipeIngredientRole;
    get typedValue(): ITypedIngredient<V>;
  }


  class IFocusFactory {
    createFocus<V>(var1: RecipeIngredientRole, var2: IIngredientType<V>, var3: V): IFocus<V>;
    createFocus<V>(var1: RecipeIngredientRole, var2: ITypedIngredient<V>): IFocus<V>;
    createFocusGroup(var1: Collection<IFocus<any>>): IFocusGroup;
    get emptyFocusGroup(): IFocusGroup;
  }


  class IFocusGroup {
    get allFocuses(): IFocus<any>[];
    get itemStackFocuses(): Stream<IFocus<ItemStack>>;
    getFocuses(var1: RecipeIngredientRole): Stream<IFocus<any>>;
    getFocuses<T>(var1: IIngredientType<T>): Stream<IFocus<T>>;
    getFocuses<T>(var1: IIngredientType<T>, var2: RecipeIngredientRole): Stream<IFocus<T>>;
    getItemStackFocuses(role: RecipeIngredientRole): Stream<IFocus<ItemStack>>;
    isEmpty(): boolean;
  }


  class IRecipeCatalystLookup {
    get<S>(var1: IIngredientType<S>): Stream<S>;
    get (): Stream<ITypedIngredient<any>>;
    get itemStack(): Stream<ItemStack>;
    includeHidden(): IRecipeCatalystLookup;
  }


  class IRecipeCategoriesLookup {
    get (): Stream<IRecipeCategory<any>>;
    includeHidden(): IRecipeCategoriesLookup;
    limitFocus(var1: Collection<IFocus<any>>): IRecipeCategoriesLookup;
    limitTypes(var1: Collection<RecipeType<any>>): IRecipeCategoriesLookup;
  }


  class IRecipeLookup<R = any> {
    get (): Stream<R>;
    includeHidden(): IRecipeLookup<R>;
    limitFocus(var1: Collection<IFocus<any>>): IRecipeLookup<R>;
  }


  class IRecipeManager {
    addRecipes<T>(var1: RecipeType<T>, var2: T[]): void;
    createRecipeCatalystLookup(var1: RecipeType<any>): IRecipeCatalystLookup;
    createRecipeCategoryLookup(): IRecipeCategoriesLookup;
    createRecipeLayoutDrawable<T>(var1: IRecipeCategory<T>, var2: T, var3: IFocusGroup): Optional<IRecipeLayoutDrawable<T>>;
    createRecipeLayoutDrawable<T>(var1: IRecipeCategory<T>, var2: T, var3: IFocusGroup, var4: IScalableDrawable, var5: number): Optional<IRecipeLayoutDrawable<T>>;
    createRecipeLayoutDrawableOrShowError<T>(var1: IRecipeCategory<T>, var2: T, var3: IFocusGroup): IRecipeLayoutDrawable<T>;
    createRecipeLookup<R>(var1: RecipeType<R>): IRecipeLookup<R>;
    createRecipeSlotDrawable(var1: RecipeIngredientRole, var2: Optional<ITypedIngredient<any>>[], var3: Set<number>, var4: number): IRecipeSlotDrawable;
    createRecipeSlotDrawable(role: RecipeIngredientRole, ingredients: Optional<ITypedIngredient<any>>[], focusedIngredients: Set<number>, xPos: number, yPos: number, ingredientCycleOffset: number): IRecipeSlotDrawable;
    get recipeButtonControllerFactories(): IRecipeButtonControllerFactory[];
    getRecipeCategory<T>(var1: RecipeType<T>): IRecipeCategory<T>;
    getRecipeIngredients<T>(var1: IRecipeCategory<T>, var2: T): IIngredientSupplier;
    getRecipeType<T>(var1: ResourceLocation, var2: Class<T>): Optional<RecipeType<T>>;
    getRecipeType(var1: ResourceLocation): Optional<RecipeType<any>>;
    hideRecipeCategory(var1: RecipeType<any>): void;
    hideRecipes<T>(var1: RecipeType<T>, var2: Collection<T>): void;
    unhideRecipeCategory(var1: RecipeType<any>): void;
    unhideRecipes<T>(var1: RecipeType<T>, var2: Collection<T>): void;
  }


  interface RecipeIngredientRole extends Enum<RecipeIngredientRole> {}
  class RecipeIngredientRole extends Enum<RecipeIngredientRole> {
    static readonly INPUT: RecipeIngredientRole;
    static readonly OUTPUT: RecipeIngredientRole;
    static readonly CATALYST: RecipeIngredientRole;
    static readonly RENDER_ONLY: RecipeIngredientRole;
    static valueOf(name: string): RecipeIngredientRole;
    static values(): RecipeIngredientRole[];
  }


  class RecipeType<T = any> {
    constructor(uid: ResourceLocation, recipeClass: Class<T>);
    static create<T>(nameSpace: string, path: string, recipeClass: Class<T>): RecipeType<T>;
    static createFromDeferredVanilla<R extends Recipe<any>>(deferredVanillaRecipeType: Supplier<net_minecraft_world_item_crafting_RecipeType<R>>): Supplier<RecipeType<RecipeHolder<R>>>;
    static createFromVanilla<R extends Recipe<any>>(vanillaRecipeType: net_minecraft_world_item_crafting_RecipeType<R>): RecipeType<RecipeHolder<R>>;
    static createRecipeHolderType<R extends Recipe<any>>(uid: ResourceLocation): RecipeType<RecipeHolder<R>>;
    equals(obj: any): boolean;
    get recipeClass(): Class<T>;
    get uid(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'mezz.jei.api.recipe.transfer' {
  import { Type } from 'mezz.jei.api.recipe.transfer.IRecipeTransferError';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IRecipeSlotsView, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { List, Optional, Collection, Map } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { Class, Integer } from 'java.lang';
  import { MenuType, AbstractContainerMenu, Slot } from 'net.minecraft.world.inventory';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Ingredient, RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';

  class IRecipeTransferError {
    get buttonHighlightColor(): number;
    get missingCountHint(): number;
    get tooltip(): Component[];
    get type(): Type;
    getTooltip(tooltip: ITooltipBuilder): void;
    showError(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, recipeSlotsView: IRecipeSlotsView, recipeX: number, recipeY: number): void;
  }


  class IRecipeTransferHandler<C extends AbstractContainerMenu = any, R = any> {
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    get recipeType(): RecipeType<R>;
    transferRecipe(var1: C, var2: R, var3: IRecipeSlotsView, var4: Player, var5: boolean, var6: boolean): IRecipeTransferError;
  }


  class IRecipeTransferHandlerHelper {
    createBasicRecipeTransferInfo<C extends AbstractContainerMenu, R>(var1: Class<C>, var2: MenuType<C>, var3: RecipeType<R>, var4: number, var5: number, var6: number, var7: number): IRecipeTransferInfo<C, R>;
    createInternalError(): IRecipeTransferError;
    createRecipeSlotsView(var1: IRecipeSlotView[]): IRecipeSlotsView;
    createUnregisteredRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: IRecipeTransferInfo<C, R>): IRecipeTransferHandler<C, R>;
    createUserErrorForMissingSlots(var1: Component, var2: Collection<IRecipeSlotView>): IRecipeTransferError;
    createUserErrorWithTooltip(var1: Component): IRecipeTransferError;
    getGuiSlotIndexToIngredientMap(var1: RecipeHolder<CraftingRecipe>): Map<number, Ingredient>;
    recipeTransferHasServerSupport(): boolean;
  }


  class IRecipeTransferInfo<C extends AbstractContainerMenu = any, R = any> {
    canHandle(var1: C, var2: R): boolean;
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    get recipeType(): RecipeType<R>;
    getHandlingError(container: C, recipe: R): IRecipeTransferError;
    getInventorySlots(var1: C, var2: R): Slot[];
    getRecipeSlots(var1: C, var2: R): Slot[];
    requireCompleteSets(container: C, recipe: R): boolean;
  }


  class IRecipeTransferManager {
    getRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: C, var2: IRecipeCategory<R>): Optional<IRecipeTransferHandler<C, R>>;
  }


  class IUniversalRecipeTransferHandler<C extends AbstractContainerMenu = any> {
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    transferRecipe(var1: C, var2: any, var3: IRecipeSlotsView, var4: Player, var5: boolean, var6: boolean): IRecipeTransferError;
  }

}

declare module 'mezz.jei.api.recipe.transfer.IRecipeTransferError' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly INTERNAL: Type;
    static readonly USER_FACING: Type;
    static readonly COSMETIC: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'mezz.jei.api.recipe.vanilla' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { Character } from 'java.lang';
  import { Ingredient, CraftingRecipe, CraftingBookCategory } from 'net.minecraft.world.item.crafting';

  class IJeiAnvilRecipe {
    get leftInputs(): ItemStack[];
    get outputs(): ItemStack[];
    get rightInputs(): ItemStack[];
    get uid(): ResourceLocation;
  }


  class IJeiBrewingRecipe {
    get brewingSteps(): number;
    get ingredients(): ItemStack[];
    get potionInputs(): ItemStack[];
    get potionOutput(): ItemStack;
    get uid(): ResourceLocation;
  }


  class IJeiCompostingRecipe {
    get chance(): number;
    get inputs(): ItemStack[];
    get uid(): ResourceLocation;
  }


  class IJeiFuelingRecipe {
    get burnTime(): number;
    get inputs(): ItemStack[];
  }


  class IJeiGrindstoneRecipe {
    get bottomInputs(): ItemStack[];
    get maxXpReward(): number;
    get minXpReward(): number;
    get outputs(): ItemStack[];
    get topInputs(): ItemStack[];
    get uid(): ResourceLocation;
    isOutputRenderOnly(): boolean;
  }


  class IJeiIngredientInfoRecipe {
    get description(): FormattedText[];
    get ingredients(): ITypedIngredient<any>[];
  }


  class IJeiShapedRecipeBuilder {
    build(): CraftingRecipe;
    define(var1: string, var2: Ingredient): IJeiShapedRecipeBuilder;
    group(var1: string): IJeiShapedRecipeBuilder;
    pattern(var1: string): IJeiShapedRecipeBuilder;
  }


  class IVanillaRecipeFactory {
    createAnvilRecipe(var1: ItemStack, var2: ItemStack[], var3: ItemStack[], var4: ResourceLocation): IJeiAnvilRecipe;
    createAnvilRecipe(var1: ItemStack[], var2: ItemStack[], var3: ItemStack[], var4: ResourceLocation): IJeiAnvilRecipe;
    createAnvilRecipe(var1: ItemStack, var2: ItemStack[], var3: ItemStack[]): IJeiAnvilRecipe;
    createAnvilRecipe(var1: ItemStack[], var2: ItemStack[], var3: ItemStack[]): IJeiAnvilRecipe;
    createBrewingRecipe(var1: ItemStack[], var2: ItemStack, var3: ItemStack, var4: ResourceLocation): IJeiBrewingRecipe;
    createBrewingRecipe(var1: ItemStack[], var2: ItemStack[], var3: ItemStack, var4: ResourceLocation): IJeiBrewingRecipe;
    createBrewingRecipe(var1: ItemStack[], var2: ItemStack, var3: ItemStack): IJeiBrewingRecipe;
    createBrewingRecipe(var1: ItemStack[], var2: ItemStack[], var3: ItemStack): IJeiBrewingRecipe;
    createGrindstoneRecipe(var1: ItemStack[], var2: ItemStack[], var3: ItemStack[], var4: number, var5: number, var6: ResourceLocation): IJeiGrindstoneRecipe;
    createShapedRecipeBuilder(var1: CraftingBookCategory, var2: ItemStack[]): IJeiShapedRecipeBuilder;
  }

}

declare module 'mezz.jei.api.registration' {
  import { IJeiHelpers, IColorHelper } from 'mezz.jei.api.helpers';
  import { IRecipeManagerPluginHelper, IRecipeManagerPlugin, ISimpleRecipeManagerPlugin, IRecipeButtonControllerFactory } from 'mezz.jei.api.recipe.advanced';
  import { RecipeType, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { IJeiFeatures, IIngredientManager, IIngredientVisibility, IIngredientListOverlay, IBookmarkOverlay, IRecipesGui, IIngredientFilter, IScreenHelper, IEditModeConfig } from 'mezz.jei.api.runtime';
  import { Collection, List } from 'java.util';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { IIngredientType, ITypedIngredient, IIngredientHelper, IIngredientRenderer, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { Class } from 'java.lang';
  import { IGuiContainerHandler, IScreenHandler, IGlobalGuiHandler, IGhostIngredientHandler } from 'mezz.jei.api.gui.handlers';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ISubtypeManager, ISubtypeInterpreter, IIngredientSubtypeInterpreter } from 'mezz.jei.api.ingredients.subtypes';
  import { Codec } from 'com.mojang.serialization';
  import { ItemLike } from 'net.minecraft.world.level';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { Component } from 'net.minecraft.network.chat';
  import { IRecipeTransferHandlerHelper, IRecipeTransferInfo, IRecipeTransferHandler, IUniversalRecipeTransferHandler, IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { IExtendableCraftingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.crafting';
  import { IExtendableSmithingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.smithing';

  class IAdvancedRegistration {
    addRecipeButtonFactory(var1: IRecipeButtonControllerFactory): void;
    addRecipeCategoryDecorator<T>(var1: RecipeType<T>, var2: IRecipeCategoryDecorator<T>): void;
    addRecipeManagerPlugin(var1: IRecipeManagerPlugin): void;
    addTypedRecipeManagerPlugin<T>(var1: RecipeType<T>, var2: ISimpleRecipeManagerPlugin<T>): void;
    get jeiFeatures(): IJeiFeatures;
    get jeiHelpers(): IJeiHelpers;
    get recipeManagerPluginHelper(): IRecipeManagerPluginHelper;
  }


  class IExtraIngredientRegistration {
    addExtraIngredients<V>(var1: IIngredientType<V>, var2: Collection<V>): void;
    addExtraItemStacks(extraItemStacks: Collection<ItemStack>): void;
  }


  class IGuiHandlerRegistration {
    addGenericGuiContainerHandler<T extends AbstractContainerScreen<any>>(var1: Class<T>, var2: IGuiContainerHandler<any>): void;
    addGhostIngredientHandler<T extends Screen>(var1: Class<T>, var2: IGhostIngredientHandler<T>): void;
    addGlobalGuiHandler(var1: IGlobalGuiHandler): void;
    addGuiContainerHandler<T extends AbstractContainerScreen<any>>(var1: Class<T>, var2: IGuiContainerHandler<T>): void;
    addGuiScreenHandler<T extends Screen>(var1: Class<T>, var2: IScreenHandler<T>): void;
    addRecipeClickArea<T extends AbstractContainerScreen<any>>(containerScreenClass: Class<T>, xPos: number, yPos: number, width: number, height: number, ...recipeTypes: RecipeType<any>[], containerScreen: T, mouseX: number, mouseY: number): void;
    get jeiHelpers(): IJeiHelpers;
  }


  class IIngredientAliasRegistration {
    addAlias(itemStack: ItemStack, alias: string): void;
    addAlias<I>(var1: IIngredientType<I>, var2: I, var3: string): void;
    addAlias<I>(var1: ITypedIngredient<I>, var2: string): void;
    addAliases<I>(var1: IIngredientType<I>, var2: I, var3: Collection<string>): void;
    addAliases<I>(var1: ITypedIngredient<I>, var2: Collection<string>): void;
    addAliases<I>(var1: IIngredientType<I>, var2: Collection<I>, var3: string): void;
    addAliases<I>(var1: Collection<ITypedIngredient<I>>, var2: string): void;
    addAliases<I>(var1: IIngredientType<I>, var2: Collection<I>, var3: Collection<string>): void;
    addAliases<I>(var1: Collection<ITypedIngredient<I>>, var2: Collection<string>): void;
  }


  class IModInfoRegistration {
    addModAliases(var1: string, var2: Collection<string>): void;
    addModAliases(modId: string, ...aliases: string[]): void;
  }


  class IModIngredientRegistration {
    get colorHelper(): IColorHelper;
    get subtypeManager(): ISubtypeManager;
    register<V>(var1: IIngredientType<V>, var2: Collection<V>, var3: IIngredientHelper<V>, var4: IIngredientRenderer<V>, var5: Codec<V>): void;
    register<V>(var1: IIngredientType<V>, var2: Collection<V>, var3: IIngredientHelper<V>, var4: IIngredientRenderer<V>): void;
  }


  class IRecipeCatalystRegistration {
    addRecipeCatalyst(itemLike: ItemLike, ...recipeTypes: RecipeType<any>[]): void;
    addRecipeCatalyst(ingredient: ItemStack, ...recipeTypes: RecipeType<any>[]): void;
    addRecipeCatalyst<T>(var1: IIngredientType<T>, var2: T, ...var3: RecipeType<any>[]): void;
    addRecipeCatalysts(var1: RecipeType<any>, ...var2: ItemLike[]): void;
    addRecipeCatalysts(recipeType: RecipeType<any>, ...ingredients: ItemStack[]): void;
    addRecipeCatalysts<T>(var1: RecipeType<any>, var2: IIngredientType<T>, var3: T[]): void;
    get ingredientManager(): IIngredientManager;
    get jeiHelpers(): IJeiHelpers;
  }


  class IRecipeCategoryRegistration {
    addRecipeCategories(...var1: IRecipeCategory<any>[]): void;
    get jeiHelpers(): IJeiHelpers;
  }


  class IRecipeRegistration {
    addIngredientInfo<T>(var1: T, var2: IIngredientType<T>, ...var3: Component[]): void;
    addIngredientInfo<T>(var1: T[], var2: IIngredientType<T>, ...var3: Component[]): void;
    addIngredientInfo(itemLike: ItemLike, ...descriptionComponents: Component[]): void;
    addItemStackInfo(ingredient: ItemStack, ...descriptionComponents: Component[]): void;
    addItemStackInfo(ingredients: ItemStack[], ...descriptionComponents: Component[]): void;
    addRecipes<T>(var1: RecipeType<T>, var2: T[]): void;
    get ingredientManager(): IIngredientManager;
    get ingredientVisibility(): IIngredientVisibility;
    get jeiHelpers(): IJeiHelpers;
    get vanillaRecipeFactory(): IVanillaRecipeFactory;
  }


  class IRecipeTransferRegistration {
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: Class<C>, var2: MenuType<C>, var3: RecipeType<R>, var4: number, var5: number, var6: number, var7: number): void;
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: IRecipeTransferInfo<C, R>): void;
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: IRecipeTransferHandler<C, R>, var2: RecipeType<R>): void;
    addUniversalRecipeTransferHandler<C extends AbstractContainerMenu>(var1: IUniversalRecipeTransferHandler<C>): void;
    addUniversalRecipeTransferHandler<C extends AbstractContainerMenu, R>(var1: IRecipeTransferHandler<C, R>): void;
    get jeiHelpers(): IJeiHelpers;
    get transferHelper(): IRecipeTransferHandlerHelper;
  }


  class IRuntimeRegistration {
    get editModeConfig(): IEditModeConfig;
    get ingredientManager(): IIngredientManager;
    get ingredientVisibility(): IIngredientVisibility;
    get jeiHelpers(): IJeiHelpers;
    get recipeManager(): IRecipeManager;
    get recipeTransferManager(): IRecipeTransferManager;
    get screenHelper(): IScreenHelper;
    setBookmarkOverlay(var1: IBookmarkOverlay): void;
    setIngredientFilter(var1: IIngredientFilter): void;
    setIngredientListOverlay(var1: IIngredientListOverlay): void;
    setRecipesGui(var1: IRecipesGui): void;
  }


  class ISubtypeRegistration {
    registerSubtypeInterpreter<B, I>(var1: IIngredientTypeWithSubtypes<B, I>, var2: B, var3: ISubtypeInterpreter<I>): void;
    registerSubtypeInterpreter(item: Item, interpreter: ISubtypeInterpreter<ItemStack>): void;
    registerSubtypeInterpreter<B, I>(var1: IIngredientTypeWithSubtypes<B, I>, var2: B, var3: IIngredientSubtypeInterpreter<I>): void;
    registerSubtypeInterpreter(item: Item, interpreter: IIngredientSubtypeInterpreter<ItemStack>): void;
  }


  class IVanillaCategoryExtensionRegistration {
    get craftingCategory(): IExtendableCraftingRecipeCategory;
    get jeiHelpers(): IJeiHelpers;
    get smithingCategory(): IExtendableSmithingRecipeCategory;
  }

}

declare module 'mezz.jei.api.runtime.config' {
  import { Collection, List, Optional } from 'java.util';
  import { Path } from 'java.nio.file';
  import { Component } from 'net.minecraft.network.chat';
  import { IDeserializeResult } from 'mezz.jei.api.runtime.config.IJeiConfigValueSerializer';

  class IJeiConfigCategory {
    get configValues(): Collection<IJeiConfigValue<any>>;
    get name(): string;
  }


  class IJeiConfigFile {
    get categories(): IJeiConfigCategory[];
    get path(): Path;
  }


  interface IJeiConfigListValueSerializer<T = any> extends IJeiConfigValueSerializer<List> {}
  class IJeiConfigListValueSerializer<T = any> extends IJeiConfigValueSerializer<List> {
    get listValueSerializer(): IJeiConfigValueSerializer<T>;
  }


  class IJeiConfigManager {
    get configFiles(): Collection<IJeiConfigFile>;
  }


  class IJeiConfigValue<T = any> {
    get defaultValue(): T;
    get description(): string;
    get localizedDescription(): Component;
    get localizedName(): Component;
    get name(): string;
    get serializer(): IJeiConfigValueSerializer<T>;
    get value(): T;
    set(var1: T): boolean;
  }


  class IJeiConfigValueSerializer<T = any> {
    deserialize(var1: string): IDeserializeResult<T>;
    get allValidValues(): Optional<Collection<T>>;
    get validValuesDescription(): string;
    isValid(var1: T): boolean;
    serialize(var1: T): string;
  }

}

declare module 'mezz.jei.api.runtime.config.IJeiConfigValueSerializer' {
  import { Optional, List } from 'java.util';

  class IDeserializeResult<T = any> {
    get errors(): string[];
    get result(): Optional<T>;
  }

}

declare module 'mezz.jei.api.runtime' {
  import { Optional, Set, List, Collection } from 'java.util';
  import { ITypedIngredient, IIngredientType, IIngredientHelper, IIngredientRenderer, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { HideMode } from 'mezz.jei.api.runtime.IEditModeConfig';
  import { Codec } from 'com.mojang.serialization';
  import { Class } from 'java.lang';
  import { IClickableIngredientFactory } from 'mezz.jei.api.gui.builder';
  import { IIngredientListener } from 'mezz.jei.api.runtime.IIngredientManager';
  import { IListener } from 'mezz.jei.api.runtime.IIngredientVisibility';
  import { Key } from 'InputConstants';
  import { Component } from 'net.minecraft.network.chat';
  import { IRecipeManager, IFocus, RecipeType } from 'mezz.jei.api.recipe';
  import { IJeiHelpers } from 'mezz.jei.api.helpers';
  import { IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { IJeiConfigManager } from 'mezz.jei.api.runtime.config';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Stream } from 'java.util.stream';
  import { IGuiProperties, IGuiClickableArea, IGhostIngredientHandler } from 'mezz.jei.api.gui.handlers';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  class IBookmarkOverlay {
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    get itemStackUnderMouse(): ItemStack;
    getIngredientUnderMouse<T>(var1: IIngredientType<T>): T;
  }


  class IClickableIngredient<T = any> {
    get area(): Rect2i;
    get ingredient(): T;
    get ingredientType(): IIngredientType<T>;
    get typedIngredient(): ITypedIngredient<T>;
  }


  class IEditModeConfig {
    getIngredientHiddenUsingConfigFile<V>(var1: ITypedIngredient<V>): Set<HideMode>;
    hideIngredientUsingConfigFile<V>(var1: ITypedIngredient<V>, var2: HideMode): void;
    isIngredientHiddenUsingConfigFile<V>(var1: ITypedIngredient<V>): boolean;
    showIngredientUsingConfigFile<V>(var1: ITypedIngredient<V>, var2: HideMode): void;
  }


  class IIngredientFilter {
    get filterText(): string;
    get filteredItemStacks(): ItemStack[];
    getFilteredIngredients<T>(var1: IIngredientType<T>): T[];
    set filterText(var1: string);
  }


  class IIngredientListOverlay {
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    getIngredientUnderMouse<T>(var1: IIngredientType<T>): T;
    getVisibleIngredients<T>(var1: IIngredientType<T>): T[];
    hasKeyboardFocus(): boolean;
    isListDisplayed(): boolean;
  }


  class IIngredientManager {
    addIngredientsAtRuntime<V>(var1: IIngredientType<V>, var2: Collection<V>): void;
    createClickableIngredient<V>(var1: IIngredientType<V>, var2: V, var3: Rect2i, var4: boolean): Optional<IClickableIngredient<V>>;
    createClickableIngredient<V>(ingredient: V, area: Rect2i, normalize: boolean): Optional<IClickableIngredient<V>>;
    createTypedIngredient<V>(var1: IIngredientType<V>, var2: V, var3: boolean): Optional<ITypedIngredient<V>>;
    createTypedIngredient<T>(ingredient: T, normalize: boolean): Optional<ITypedIngredient<T>>;
    createTypedIngredient<V>(ingredientType: IIngredientType<V>, ingredient: V): Optional<ITypedIngredient<V>>;
    createTypedIngredient<V>(ingredient: V): Optional<ITypedIngredient<V>>;
    get allItemStacks(): Collection<ItemStack>;
    get clickableIngredientFactory(): IClickableIngredientFactory;
    get registeredIngredientTypes(): Collection<IIngredientType<any>>;
    getAllIngredients<V>(var1: IIngredientType<V>): Collection<V>;
    getAllTypedIngredients<V>(var1: IIngredientType<V>): Collection<ITypedIngredient<V>>;
    getIngredientAliases(var1: ITypedIngredient<any>): Collection<string>;
    getIngredientByUid<V>(var1: IIngredientType<V>, var2: string): Optional<V>;
    getIngredientCodec<V>(var1: IIngredientType<V>): Codec<V>;
    getIngredientHelper<V>(var1: V): IIngredientHelper<V>;
    getIngredientHelper<V>(var1: IIngredientType<V>): IIngredientHelper<V>;
    getIngredientRenderer<V>(var1: V): IIngredientRenderer<V>;
    getIngredientRenderer<V>(var1: IIngredientType<V>): IIngredientRenderer<V>;
    getIngredientType<V>(var1: V): IIngredientType<V>;
    getIngredientTypeChecked<V>(var1: V): Optional<IIngredientType<V>>;
    getIngredientTypeChecked<V>(var1: Class<V>): Optional<IIngredientType<V>>;
    getIngredientTypeForUid(var1: string): Optional<IIngredientType<any>>;
    getIngredientTypeWithSubtypesFromBase<B, I>(var1: B): Optional<IIngredientTypeWithSubtypes<B, I>>;
    getTypedIngredientByUid<V>(var1: IIngredientType<V>, var2: string): Optional<ITypedIngredient<V>>;
    normalizeTypedIngredient<V>(var1: ITypedIngredient<V>): ITypedIngredient<V>;
    registerIngredientListener(var1: IIngredientListener): void;
    removeIngredientsAtRuntime<V>(var1: IIngredientType<V>, var2: Collection<V>): void;
  }


  class IIngredientVisibility {
    isIngredientVisible<V>(var1: IIngredientType<V>, var2: V): boolean;
    isIngredientVisible<V>(var1: ITypedIngredient<V>): boolean;
    registerListener(var1: IListener): void;
  }


  class IJeiFeatures {
    disableInventoryEffectRendererGuiHandler(): void;
  }


  class IJeiKeyMapping {
    get translatedKeyMessage(): Component;
    isActiveAndMatches(var1: Key): boolean;
    isUnbound(): boolean;
  }


  class IJeiKeyMappings {
    get showRecipe(): IJeiKeyMapping;
    get showUses(): IJeiKeyMapping;
  }


  class IJeiRuntime {
    get bookmarkOverlay(): IBookmarkOverlay;
    get configManager(): IJeiConfigManager;
    get editModeConfig(): IEditModeConfig;
    get ingredientFilter(): IIngredientFilter;
    get ingredientListOverlay(): IIngredientListOverlay;
    get ingredientManager(): IIngredientManager;
    get ingredientVisibility(): IIngredientVisibility;
    get jeiHelpers(): IJeiHelpers;
    get keyMappings(): IJeiKeyMappings;
    get recipeManager(): IRecipeManager;
    get recipeTransferManager(): IRecipeTransferManager;
    get recipesGui(): IRecipesGui;
    get screenHelper(): IScreenHelper;
  }


  class IRecipesGui {
    get parentScreen(): Optional<Screen>;
    getIngredientUnderMouse<T>(var1: IIngredientType<T>): Optional<T>;
    show<V>(focus: IFocus<V>): void;
    show(var1: IFocus<any>[]): void;
    showRecipes<T>(var1: IRecipeCategory<T>, var2: T[], var3: IFocus<any>[]): void;
    showTypes(var1: RecipeType<any>[]): void;
  }


  class IScreenHelper {
    getClickableIngredientUnderMouse(var1: Screen, var2: number, var4: number): Stream<IClickableIngredient<any>>;
    getGhostIngredientHandler<T extends Screen>(guiScreen: T): Optional<IGhostIngredientHandler<T>>;
    getGhostIngredientHandlers<T extends Screen>(var1: T): IGhostIngredientHandler<T>[];
    getGuiClickableArea(var1: AbstractContainerScreen<any>, var2: number, var4: number): Stream<IGuiClickableArea>;
    getGuiExclusionAreas(var1: Screen): Stream<Rect2i>;
    getGuiProperties<T extends Screen>(var1: T): Optional<IGuiProperties>;
  }

}

declare module 'mezz.jei.api.runtime.IEditModeConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface HideMode extends Enum<HideMode> {}
  class HideMode extends Enum<HideMode> {
    static readonly SINGLE: HideMode;
    static readonly WILDCARD: HideMode;
    static valueOf(name: string): HideMode;
    static values(): HideMode[];
  }

}

declare module 'mezz.jei.api.runtime.IIngredientManager' {
  import { IIngredientHelper, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Collection } from 'java.util';

  class IIngredientListener {
    onIngredientsAdded<V>(var1: IIngredientHelper<V>, var2: Collection<ITypedIngredient<V>>): void;
    onIngredientsRemoved<V>(var1: IIngredientHelper<V>, var2: Collection<ITypedIngredient<V>>): void;
  }

}

declare module 'mezz.jei.api.runtime.IIngredientVisibility' {
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';

  class IListener {
    onIngredientVisibilityChanged<V>(var1: ITypedIngredient<V>, var2: boolean): void;
  }

}

declare module 'mezz.jei.common.codecs' {
  import { Codec, DataResult, DynamicOps, MapCodec } from 'com.mojang.serialization';
  import { Class, Enum } from 'java.lang';
  import { Pair } from 'com.mojang.datafixers.util';
  import { IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { IIngredientManager } from 'mezz.jei.api.runtime';

  class EnumCodec {
    static create<T extends Enum<T>>(enumClass: Class<T>): Codec<T>;
  }


  interface TupleCodec<F = any, S = any> extends Codec<Pair> {}
  class TupleCodec<F = any, S = any> extends Codec<Pair> {
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<Pair<F, S>, T>>;
    encode<T>(input: Pair<F, S>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    equals(o: any): boolean;
    hashCode(): number;
    static of<F, S>(first: Codec<F>, second: Codec<S>): TupleCodec<F, S>;
    toString(): string;
  }


  class TypedIngredientCodecs {
    static getIngredientCodec(ingredientManager: IIngredientManager): MapCodec<ITypedIngredient<any>>;
    static getIngredientCodec<T>(ingredientType: IIngredientType<T>, ingredientManager: IIngredientManager): Codec<ITypedIngredient<T>>;
    static getIngredientTypeCodec(ingredientManager: IIngredientManager): Codec<IIngredientType<any>>;
  }

}

declare module 'mezz.jei.common.config' {
  import { Enum, Boolean } from 'java.lang';
  import { List, Set, Collection } from 'java.util';
  import { IConfigSchemaBuilder, IConfigListener, ConfigSchema, FileWatcher } from 'mezz.jei.common.config.file';
  import { IEditModeListener } from 'mezz.jei.common.config.IClientToggleState';
  import { IJeiConfigManager, IJeiConfigFile } from 'mezz.jei.api.runtime.config';
  import { SearchMode } from 'mezz.jei.core.search';
  import { HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';
  import { NavigationVisibility } from 'mezz.jei.common.util';
  import { Supplier } from 'java.util.function';
  import { Path } from 'java.nio.file';

  interface BookmarkTooltipFeature extends Enum<BookmarkTooltipFeature> {}
  class BookmarkTooltipFeature extends Enum<BookmarkTooltipFeature> {
    static readonly PREVIEW: BookmarkTooltipFeature;
    static readonly INGREDIENTS: BookmarkTooltipFeature;
    static valueOf(name: string): BookmarkTooltipFeature;
    static values(): BookmarkTooltipFeature[];
  }


  interface ClientConfig extends IClientConfig {}
  class ClientConfig extends IClientConfig {
    constructor(schema: IConfigSchemaBuilder);
    addLookupHistoryDisplaySideListener(listener: IConfigListener<HistoryDisplaySide>): void;
    addLookupHistoryEnabledListener(listener: IConfigListener<boolean>): void;
    disableRecipeSorterStage(stage: RecipeSorterStage): void;
    enableRecipeSorterStage(stage: RecipeSorterStage): void;
    get bookmarkTooltipFeatures(): BookmarkTooltipFeature[];
    get dragDelayMs(): number;
    get giveMode(): GiveMode;
    get hideSingleTagContentTooltipEnabled(): boolean;
    get ingredientSorterStages(): IngredientSortStage[];
    static get instance(): IClientConfig;
    get lookupHistoryDisplaySide(): HistoryDisplaySide;
    get maxLookupHistoryIngredients(): number;
    get maxLookupHistoryRows(): number;
    get maxRecipeGuiHeight(): number;
    get recipeSorterStages(): Set<RecipeSorterStage>;
    get showHiddenIngredients(): boolean;
    get smoothScrollRate(): number;
    isAddingBookmarksToFrontEnabled(): boolean;
    isCatchRenderErrorsEnabled(): boolean;
    isCenterSearchBarEnabled(): boolean;
    isCheatToHotbarUsingHotkeysEnabled(): boolean;
    isDragToRearrangeBookmarksEnabled(): boolean;
    isHoldShiftToShowBookmarkTooltipFeaturesEnabled(): boolean;
    isIngredientsSummaryEnabled(): boolean;
    isLookupBlockTagsEnabled(): boolean;
    isLookupFluidContentsEnabled(): boolean;
    isLookupHistoryEnabled(): boolean;
    isLowMemorySlowSearchEnabled(): boolean;
    isShowCreativeTabNamesEnabled(): boolean;
    isShowTagRecipesEnabled(): boolean;
    isTagContentTooltipEnabled(): boolean;
    setLookupHistoryEnabled(enabled: boolean): void;
  }


  interface ClientToggleState extends IClientToggleState {}
  class ClientToggleState extends IClientToggleState {
    addEditModeToggleListener(listener: IEditModeListener): void;
    isBookmarkOverlayEnabled(): boolean;
    isCheatItemsEnabled(): boolean;
    isEditModeEnabled(): boolean;
    isOverlayEnabled(): boolean;
    setBookmarkEnabled(value: boolean): void;
    setCheatItemsEnabled(value: boolean): void;
    toggleBookmarkEnabled(): void;
    toggleCheatItemsEnabled(): void;
    toggleEditModeEnabled(): void;
    toggleOverlayEnabled(): void;
  }


  interface ConfigManager extends IJeiConfigManager {}
  class ConfigManager extends IJeiConfigManager {
    get configFiles(): Collection<IJeiConfigFile>;
    onJeiStarted(): void;
    registerConfigFile(configFile: ConfigSchema): void;
  }


  class DebugConfig {
    static create(schema: IConfigSchemaBuilder): void;
    static isCrashingTestIngredientsEnabled(): boolean;
    static isCrashingTestRecipesEnabled(): boolean;
    static isDebugGuisEnabled(): boolean;
    static isDebugInfoTooltipsEnabled(): boolean;
    static isDebugInputsEnabled(): boolean;
    static isDebugModeEnabled(): boolean;
    static isLogSuffixTreeStatsEnabled(): boolean;
  }


  interface GiveMode extends Enum<GiveMode> {}
  class GiveMode extends Enum<GiveMode> {
    static readonly INVENTORY: GiveMode;
    static readonly MOUSE_PICKUP: GiveMode;
    static valueOf(name: string): GiveMode;
    static values(): GiveMode[];
  }


  interface HistoryDisplaySide extends Enum<HistoryDisplaySide> {}
  class HistoryDisplaySide extends Enum<HistoryDisplaySide> {
    static readonly LEFT: HistoryDisplaySide;
    static readonly RIGHT: HistoryDisplaySide;
    static valueOf(name: string): HistoryDisplaySide;
    static values(): HistoryDisplaySide[];
  }


  class IClientConfig {
    static readonly minRecipeGuiHeight: number;
    static readonly defaultRecipeGuiHeight: number;
    static readonly defaultCenterSearchBar: boolean;
    addLookupHistoryDisplaySideListener(var1: IConfigListener<HistoryDisplaySide>): void;
    addLookupHistoryEnabledListener(var1: IConfigListener<boolean>): void;
    disableRecipeSorterStage(var1: RecipeSorterStage): void;
    enableRecipeSorterStage(var1: RecipeSorterStage): void;
    get bookmarkTooltipFeatures(): BookmarkTooltipFeature[];
    get dragDelayMs(): number;
    get giveMode(): GiveMode;
    get hideSingleTagContentTooltipEnabled(): boolean;
    get ingredientSorterStages(): IngredientSortStage[];
    get lookupHistoryDisplaySide(): HistoryDisplaySide;
    get maxLookupHistoryIngredients(): number;
    get maxLookupHistoryRows(): number;
    get maxRecipeGuiHeight(): number;
    get recipeSorterStages(): Set<RecipeSorterStage>;
    get showHiddenIngredients(): boolean;
    get smoothScrollRate(): number;
    isAddingBookmarksToFrontEnabled(): boolean;
    isCatchRenderErrorsEnabled(): boolean;
    isCenterSearchBarEnabled(): boolean;
    isCheatToHotbarUsingHotkeysEnabled(): boolean;
    isDragToRearrangeBookmarksEnabled(): boolean;
    isHoldShiftToShowBookmarkTooltipFeaturesEnabled(): boolean;
    isIngredientsSummaryEnabled(): boolean;
    isLookupBlockTagsEnabled(): boolean;
    isLookupFluidContentsEnabled(): boolean;
    isLookupHistoryEnabled(): boolean;
    isLowMemorySlowSearchEnabled(): boolean;
    isShowCreativeTabNamesEnabled(): boolean;
    isShowTagRecipesEnabled(): boolean;
    isTagContentTooltipEnabled(): boolean;
    setLookupHistoryEnabled(var1: boolean): void;
  }


  class IClientToggleState {
    addEditModeToggleListener(var1: IEditModeListener): void;
    isBookmarkOverlayEnabled(): boolean;
    isCheatItemsEnabled(): boolean;
    isEditModeEnabled(): boolean;
    isOverlayEnabled(): boolean;
    setBookmarkEnabled(var1: boolean): void;
    setCheatItemsEnabled(var1: boolean): void;
    toggleBookmarkEnabled(): void;
    toggleCheatItemsEnabled(): void;
    toggleEditModeEnabled(): void;
    toggleOverlayEnabled(): void;
  }


  class IIngredientFilterConfig {
    get colorSearchMode(): SearchMode;
    get creativeTabSearchMode(): SearchMode;
    get modNameSearchMode(): SearchMode;
    get resourceLocationSearchMode(): SearchMode;
    get searchAdvancedTooltips(): boolean;
    get searchIngredientAliases(): boolean;
    get searchModAliases(): boolean;
    get searchModIds(): boolean;
    get searchShortModNames(): boolean;
    get tagSearchMode(): SearchMode;
    get tooltipSearchMode(): SearchMode;
  }


  class IIngredientGridConfig {
    drawBackground(): boolean;
    get buttonNavigationVisibility(): NavigationVisibility;
    get horizontalAlignment(): HorizontalAlignment;
    get maxColumns(): number;
    get maxRows(): number;
    get minColumns(): number;
    get minRows(): number;
    get verticalAlignment(): VerticalAlignment;
  }


  class IJeiClientConfigs {
    get bookmarkListConfig(): IIngredientGridConfig;
    get clientConfig(): IClientConfig;
    get ingredientFilterConfig(): IIngredientFilterConfig;
    get ingredientListConfig(): IIngredientGridConfig;
  }


  interface IngredientFilterConfig extends IIngredientFilterConfig {}
  class IngredientFilterConfig extends IIngredientFilterConfig {
    readonly modNameSearchMode: Supplier;
    readonly tooltipSearchMode: Supplier;
    readonly tagSearchMode: Supplier;
    readonly colorSearchMode: Supplier;
    readonly resourceLocationSearchMode: Supplier;
    readonly creativeTabSearchMode: Supplier;
    readonly searchAdvancedTooltips: Supplier;
    readonly searchModIds: Supplier;
    readonly searchModAliases: Supplier;
    readonly searchShortModNames: Supplier;
    readonly searchIngredientAliases: Supplier;
    constructor(builder: IConfigSchemaBuilder);
    get colorSearchMode(): SearchMode;
    get creativeTabSearchMode(): SearchMode;
    get modNameSearchMode(): SearchMode;
    get resourceLocationSearchMode(): SearchMode;
    get searchAdvancedTooltips(): boolean;
    get searchIngredientAliases(): boolean;
    get searchModAliases(): boolean;
    get searchModIds(): boolean;
    get searchShortModNames(): boolean;
    get tagSearchMode(): SearchMode;
    get tooltipSearchMode(): SearchMode;
  }


  interface IngredientGridConfig extends IIngredientGridConfig {}
  class IngredientGridConfig extends IIngredientGridConfig {
    constructor(categoryName: string, builder: IConfigSchemaBuilder, defaultHorizontalAlignment: HorizontalAlignment);
    drawBackground(): boolean;
    get buttonNavigationVisibility(): NavigationVisibility;
    get horizontalAlignment(): HorizontalAlignment;
    get maxColumns(): number;
    get maxRows(): number;
    get minColumns(): number;
    get minRows(): number;
    get verticalAlignment(): VerticalAlignment;
  }


  interface IngredientSortStage extends Enum<IngredientSortStage> {}
  class IngredientSortStage extends Enum<IngredientSortStage> {
    static readonly MOD_NAME: IngredientSortStage;
    static readonly INGREDIENT_TYPE: IngredientSortStage;
    static readonly ALPHABETICAL: IngredientSortStage;
    static readonly CREATIVE_MENU: IngredientSortStage;
    static readonly TAG: IngredientSortStage;
    static readonly ARMOR: IngredientSortStage;
    static readonly MAX_DURABILITY: IngredientSortStage;
    static valueOf(name: string): IngredientSortStage;
    static values(): IngredientSortStage[];
  }


  class IServerConfig {
    isCheatModeEnabledForCreative(): boolean;
    isCheatModeEnabledForGive(): boolean;
    isCheatModeEnabledForOp(): boolean;
  }


  interface JeiClientConfigs extends IJeiClientConfigs {}
  class JeiClientConfigs extends IJeiClientConfigs {
    constructor(configFile: Path);
    get bookmarkListConfig(): IIngredientGridConfig;
    get clientConfig(): IClientConfig;
    get ingredientFilterConfig(): IIngredientFilterConfig;
    get ingredientListConfig(): IIngredientGridConfig;
    register(fileWatcher: FileWatcher, configManager: ConfigManager): void;
  }


  interface RecipeSorterStage extends Enum<RecipeSorterStage> {}
  class RecipeSorterStage extends Enum<RecipeSorterStage> {
    static readonly BOOKMARKED: RecipeSorterStage;
    static readonly CRAFTABLE: RecipeSorterStage;
    static valueOf(name: string): RecipeSorterStage;
    static values(): RecipeSorterStage[];
  }

}

declare module 'mezz.jei.common.config.file' {
  import { IJeiConfigCategory, IJeiConfigValueSerializer, IJeiConfigValue, IJeiConfigFile } from 'mezz.jei.api.runtime.config';
  import { List, Optional, Collection, Set } from 'java.util';
  import { Boolean, Enum, Integer, Runnable, Thread, RuntimeException } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { ConfigManager } from 'mezz.jei.common.config';
  import { Supplier, Consumer, BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { BufferedWriter, BufferedReader } from 'java.io';
  import { Codec, DynamicOps } from 'com.mojang.serialization';
  import { JsonElement } from 'com.google.gson';
  import { Error } from 'DataResult';
  import { Pair } from 'com.mojang.datafixers.util';

  interface ConfigCategory extends IJeiConfigCategory {}
  class ConfigCategory extends IJeiConfigCategory {
    constructor(name: string, values: ConfigValue<any>[]);
    get configValues(): Collection<ConfigValue<any>>;
    get name(): string;
    get valueNames(): Set<string>;
    getConfigValue(configValueName: string): Optional<ConfigValue<any>>;
  }


  interface ConfigCategoryBuilder extends IConfigCategoryBuilder {}
  class ConfigCategoryBuilder extends IConfigCategoryBuilder {
    constructor(localizationPath: string, name: string);
    addBoolean(name: string, defaultValue: boolean): ConfigValue<boolean>;
    addEnum<T extends Enum<T>>(name: string, defaultValue: T): ConfigValue<T>;
    addInteger(name: string, defaultValue: number, minValue: number, maxValue: number): ConfigValue<number>;
    addList<T>(name: string, defaultValue: T[], listSerializer: IJeiConfigValueSerializer<T[]>): ConfigValue<T[]>;
    addValue<T>(value: ConfigValue<T>): ConfigValue<T>;
    build(schema: ConfigSchema): ConfigCategory;
    get name(): string;
  }


  interface ConfigSchema extends IConfigSchema {}
  class ConfigSchema extends IConfigSchema {
    constructor(path: Path, categoryBuilders: ConfigCategoryBuilder[]);
    get categories(): ConfigCategory[];
    get path(): Path;
    loadIfNeeded(): void;
    markDirty(): void;
    register(fileWatcher: FileWatcher, configManager: ConfigManager): void;
  }


  interface ConfigSchemaBuilder extends IConfigSchemaBuilder {}
  class ConfigSchemaBuilder extends IConfigSchemaBuilder {
    constructor(configFile: Path, localizationPath: string);
    addCategory(name: string): IConfigCategoryBuilder;
    build(): IConfigSchema;
  }


  class ConfigSerializer {
    static load(path: Path, categories: ConfigCategory[]): void;
    static save(path: Path, categories: ConfigCategory[]): void;
  }


  interface ConfigValue<T = any> extends IJeiConfigValue<T>, Supplier<T> {}
  class ConfigValue<T = any> extends IJeiConfigValue<T> {
    constructor(localizationPath: string, name: string, defaultValue: T, serializer: IJeiConfigValueSerializer<T>);
    addListener(listener: IConfigListener<T>): void;
    get (): T;
    get defaultValue(): T;
    get description(): string;
    get localizedDescription(): Component;
    get localizedName(): Component;
    get name(): string;
    get serializer(): IJeiConfigValueSerializer<T>;
    get value(): T;
    set (value: T);
    setFromSerializedValue(value: string): string[];
    setSchema(schema: IConfigSchema): void;
  }


  class FileWatcher {
    constructor(threadName: string);
    addCallback(path: Path, callback: Runnable): void;
    start(): void;
  }


  interface FileWatcherThread extends Thread {}
  class FileWatcherThread extends Thread {
    constructor(name: string);
    addCallback(path: Path, callback: Runnable): void;
    run(): void;
  }


  class IConfigCategoryBuilder {
    addBoolean(var1: string, var2: boolean): ConfigValue<boolean>;
    addEnum<T extends Enum<T>>(var1: string, var2: T): ConfigValue<T>;
    addInteger(var1: string, var2: number, var3: number, var4: number): ConfigValue<number>;
    addList<T>(var1: string, var2: T[], var3: IJeiConfigValueSerializer<T[]>): ConfigValue<T[]>;
  }


  class IConfigListener<T = any> {
    onConfigValueChanged(var1: T): void;
  }


  interface IConfigSchema extends IJeiConfigFile {}
  class IConfigSchema extends IJeiConfigFile {
    loadIfNeeded(): void;
    markDirty(): void;
    register(var1: FileWatcher, var2: ConfigManager): void;
  }


  class IConfigSchemaBuilder {
    addCategory(var1: string): IConfigCategoryBuilder;
    build(): IConfigSchema;
  }


  class JsonArrayFileHelper {
    static read<T>(reader: BufferedReader, version: number, codec: Codec<T>, registryOps: DynamicOps<JsonElement>, ifElementError: BiConsumer<JsonElement, Error<Pair<T, JsonElement>>>, ifElementException: BiConsumer<JsonElement, RuntimeException>): T[];
    static write<T>(out: BufferedWriter, version: number, elements: Collection<T>, codec: Codec<T>, registryOps: DynamicOps<JsonElement>, ifElementError: Consumer<Error<JsonElement>>, ifElementException: BiConsumer<T, RuntimeException>): void;
  }


  class JsonArrayWriter {
    add(line: JsonElement): void;
    end(): void;
    static start(out: BufferedWriter): JsonArrayWriter;
  }

}

declare module 'mezz.jei.common.config.file.serializers' {
  import { IJeiConfigValueSerializer, IJeiConfigListValueSerializer } from 'mezz.jei.api.runtime.config';
  import { Boolean, Class, Integer } from 'java.lang';
  import { Optional, Collection, List } from 'java.util';
  import { IDeserializeResult } from 'mezz.jei.api.runtime.config.IJeiConfigValueSerializer';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';

  interface BooleanSerializer extends IJeiConfigValueSerializer<boolean> {}
  class BooleanSerializer extends IJeiConfigValueSerializer<boolean> {
    static readonly INSTANCE: BooleanSerializer;
    deserialize(string: string): DeserializeResult<boolean>;
    get allValidValues(): Optional<Collection<boolean>>;
    get validValuesDescription(): string;
    isValid(value: boolean): boolean;
    serialize(value: boolean): string;
  }


  interface DeserializeResult<T = any> extends IDeserializeResult<T> {}
  class DeserializeResult<T = any> extends IDeserializeResult<T> {
    constructor(result: T);

    constructor(result: T, error: string);

    constructor(result: T, errors: string[]);
    get errors(): string[];
    get result(): Optional<T>;
  }


  interface EnumSerializer<T extends Enum<T> = any> extends IJeiConfigValueSerializer<T> {}
  class EnumSerializer<T extends Enum<T> = any> extends IJeiConfigValueSerializer<T> {
    constructor(enumClass: Class<T>);
    deserialize(string: string): DeserializeResult<T>;
    get allValidValues(): Optional<Collection<T>>;
    get validValuesDescription(): string;
    isValid(value: T): boolean;
    serialize(value: T): string;
  }


  interface IntegerSerializer extends IJeiConfigValueSerializer<number> {}
  class IntegerSerializer extends IJeiConfigValueSerializer<number> {
    constructor(min: number, max: number);
    deserialize(string: string): DeserializeResult<number>;
    get allValidValues(): Optional<Collection<number>>;
    get validValuesDescription(): string;
    isValid(value: number): boolean;
    serialize(value: number): string;
  }


  class LegacyTypedIngredientSerializer {
    constructor(ingredientManager: IIngredientManager);
    deserialize(string: string): IDeserializeResult<ITypedIngredient<any>>;
  }


  interface ListSerializer<T = any> extends IJeiConfigListValueSerializer<T> {}
  class ListSerializer<T = any> extends IJeiConfigListValueSerializer<T> {
    constructor(valueSerializer: IJeiConfigValueSerializer<T>);
    deserialize(string: string): DeserializeResult<T[]>;
    get allValidValues(): Optional<Collection<T[]>>;
    get listValueSerializer(): IJeiConfigValueSerializer<T>;
    get validValuesDescription(): string;
    isValid(value: T[]): boolean;
    serialize(values: T[]): string;
  }

}

declare module 'mezz.jei.common.config.IClientToggleState' {
  class IEditModeListener {
    onEditModeChanged(): void;
  }

}

declare module 'mezz.jei.common.config.sorting' {
  import { Path } from 'java.nio.file';
  import { ISortingSerializer } from 'mezz.jei.common.config.sorting.serializers';
  import { Function } from 'java.util.function';
  import { Comparator, Collection } from 'java.util';

  interface MappedSortingConfig<T = any, V = any> extends SortingConfig<V> {}
  class MappedSortingConfig<T = any, V = any> extends SortingConfig<V> {
    constructor(path: Path, serializer: ISortingSerializer<V>, mapping: Function<T, V>);
    getComparator(allValues: Collection<T>): Comparator<T>;
    getComparatorFromMappedValues(allMappedValues: Collection<V>): Comparator<T>;
  }


  class SortingConfig<T = any> {
    constructor(path: Path, serializer: ISortingSerializer<T>);
    getComparator<V>(allValues: Collection<T>, mapping: Function<V, T>): Comparator<V>;
  }

}

declare module 'mezz.jei.common.config.sorting.serializers' {
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';

  class ISortingSerializer<T = any> {
    read(var1: Path): T[];
    write(var1: Path, var2: T[]): void;
  }


  class SortingSerializers {
    static readonly STRING: ISortingSerializer;
  }

}

declare module 'mezz.jei.common' {
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Textures } from 'mezz.jei.common.gui.textures';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { IClientToggleState, IJeiClientConfigs } from 'mezz.jei.common.config';
  import { Optional } from 'java.util';
  import { IJeiRuntime, IJeiFeatures } from 'mezz.jei.api.runtime';

  class Constants {
    static readonly UNIVERSAL_RECIPE_TRANSFER_TYPE: RecipeType;
    static readonly LOCATION_JEI_GUI_TEXTURE_ATLAS: ResourceLocation;
  }


  class Internal {
    static get clientToggleState(): IClientToggleState;
    static get jeiClientConfigs(): IJeiClientConfigs;
    static get jeiFeatures(): JeiFeatures;
    static get jeiRuntime(): IJeiRuntime;
    static get keyMappings(): IInternalKeyMappings;
    static get optionalJeiClientConfigs(): Optional<IJeiClientConfigs>;
    static get serverConnection(): IConnectionToServer;
    static get textures(): Textures;
    static set jeiClientConfigs(jeiClientConfigs: IJeiClientConfigs);
    static set keyMappings(keyMappings: IInternalKeyMappings);
    static set serverConnection(serverConnection: IConnectionToServer);
    static setRuntime(jeiRuntime: IJeiRuntime): void;
  }


  interface JeiFeatures extends IJeiFeatures {}
  class JeiFeatures extends IJeiFeatures {
    disableInventoryEffectRendererGuiHandler(): void;
    get inventoryEffectRendererGuiHandlerEnabled(): boolean;
  }

}

declare module 'mezz.jei.common.gui.elements' {
  import { IDrawableAnimated, IDrawableStatic, IDrawable, IScalableDrawable } from 'mezz.jei.api.gui.drawable';
  import { StartDirection } from 'mezz.jei.api.gui.drawable.IDrawableAnimated';
  import { ITickTimer } from 'mezz.jei.api.gui';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ITypedIngredient, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { JeiSpriteUploader } from 'mezz.jei.common.gui.textures';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { IPlaceable, HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';
  import { ITextWidget, IRecipeWidget } from 'mezz.jei.api.gui.widgets';
  import { ScreenPosition } from 'net.minecraft.client.gui.navigation';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';

  interface DrawableAnimated extends IDrawableAnimated {}
  class DrawableAnimated extends IDrawableAnimated {
    constructor(drawable: IDrawableStatic, ticksPerCycle: number, startDirection: StartDirection, inverted: boolean);

    constructor(drawable: IDrawableStatic, tickTimer: ITickTimer, startDirection: StartDirection);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface DrawableCombined extends IDrawableAnimated {}
  class DrawableCombined extends IDrawableAnimated {
    constructor(...drawables: IDrawable[]);

    constructor(drawables: IDrawable[]);
    draw(guiGraphics: GuiGraphics): void;
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    get height(): number;
    get width(): number;
  }


  interface DrawableIngredient<V = any> extends IDrawable {}
  class DrawableIngredient<V = any> extends IDrawable {
    constructor(typedIngredient: ITypedIngredient<V>, ingredientRenderer: IIngredientRenderer<V>);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface DrawableNineSliceTexture extends IScalableDrawable {}
  class DrawableNineSliceTexture extends IScalableDrawable {
    constructor(spriteUploader: JeiSpriteUploader, location: ResourceLocation, width: number, height: number, left: number, right: number, top: number, bottom: number);
    draw(guiGraphics: GuiGraphics, area: ImmutableRect2i): void;
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number, width: number, height: number): void;
    draw(guiGraphics: GuiGraphics, area: Rect2i): void;
  }


  interface DrawableResource extends IDrawableStatic {}
  class DrawableResource extends IDrawableStatic {
    constructor(resourceLocation: ResourceLocation, u: number, v: number, width: number, height: number, paddingTop: number, paddingBottom: number, paddingLeft: number, paddingRight: number, textureWidth: number, textureHeight: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number, maskTop: number, maskBottom: number, maskLeft: number, maskRight: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface DrawableSprite extends IDrawableStatic {}
  class DrawableSprite extends IDrawableStatic {
    constructor(spriteUploader: JeiSpriteUploader, location: ResourceLocation, width: number, height: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number, maskTop: number, maskBottom: number, maskLeft: number, maskRight: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
    trim(left: number, right: number, top: number, bottom: number): DrawableSprite;
  }


  interface DrawableText extends IDrawable {}
  class DrawableText extends IDrawable {
    constructor(text: string, width: number, height: number, color: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface DrawableWrappedText extends IDrawable {}
  class DrawableWrappedText extends IDrawable {
    constructor(text: FormattedText[], maxWidth: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface HighResolutionDrawable extends IDrawable {}
  class HighResolutionDrawable extends IDrawable {
    constructor(drawable: IDrawable, scale: number);
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get height(): number;
    get width(): number;
  }


  interface OffsetDrawable extends IDrawable, IPlaceable<OffsetDrawable> {}
  class OffsetDrawable extends IDrawable {
    constructor(drawable: IDrawable, xOffset: number, yOffset: number);
    static create(drawable: IDrawable, xOffset: number, yOffset: number): IDrawable;
    draw(guiGraphics: GuiGraphics, xOffset: number, yOffset: number): void;
    draw(guiGraphics: GuiGraphics): void;
    get area(): ImmutableRect2i;
    get height(): number;
    get width(): number;
    setPosition(xPos: number, yPos: number): OffsetDrawable;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): THIS;
  }


  interface TextWidget extends ITextWidget, IRecipeWidget {}
  class TextWidget extends ITextWidget {
    constructor(text: FormattedText[], xPos: number, yPos: number, maxWidth: number, maxHeight: number);
    drawWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get position(): ScreenPosition;
    get width(): number;
    getTooltip(tooltip: ITooltipBuilder, mouseX: number, mouseY: number): void;
    setColor(color: number): ITextWidget;
    setFont(font: Font): ITextWidget;
    setLineSpacing(lineSpacing: number): ITextWidget;
    setPosition(xPos: number, yPos: number): TextWidget;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): THIS;
    setShadow(shadow: boolean): ITextWidget;
    setTextAlignment(horizontalAlignment: HorizontalAlignment): TextWidget;
    setTextAlignment(verticalAlignment: VerticalAlignment): TextWidget;
  }

}

declare module 'mezz.jei.common.gui' {
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { FormattedText, MutableComponent, Component } from 'net.minecraft.network.chat';
  import { ITypedIngredient, IIngredientRenderer, IIngredientType } from 'mezz.jei.api.ingredients';
  import { IJeiKeyMapping, IIngredientManager } from 'mezz.jei.api.runtime';
  import { Collection, List, Optional } from 'java.util';
  import { Either } from 'com.mojang.datafixers.util';
  import { IJeiInputHandler, IJeiUserInput, RecipeSlotUnderMouse } from 'mezz.jei.api.gui.inputs';
  import { Supplier } from 'java.util.function';
  import { ScreenPosition, ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Key } from 'InputConstants';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IScalableDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeSlotDrawable, IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { Rect2i } from 'net.minecraft.client.renderer';

  interface IngredientsTooltipComponent extends ClientTooltipComponent, TooltipComponent {}
  class IngredientsTooltipComponent extends ClientTooltipComponent {
    constructor(layout: IRecipeLayoutDrawable<any>);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, x: number, y: number, guiGraphics: GuiGraphics): void;
  }


  interface JeiTooltip extends ITooltipBuilder {}
  class JeiTooltip extends ITooltipBuilder {
    add(formattedText: FormattedText): void;
    add(component: TooltipComponent): void;
    addAll(components: Collection<FormattedText>): void;
    addAll(tooltip: JeiTooltip): void;
    addKeyUsageComponent(translationKey: string, keyMapping: IJeiKeyMapping): void;
    addKeyUsageComponent(translationKey: string, keyMapping: MutableComponent): void;
    clearIngredient(): void;
    draw(guiGraphics: GuiGraphics, x: number, y: number): void;
    draw<T>(guiGraphics: GuiGraphics, x: number, y: number, typedIngredient: ITypedIngredient<T>, ingredientRenderer: IIngredientRenderer<T>, ingredientManager: IIngredientManager): void;
    get legacyComponents(): Component[];
    get lines(): Either<FormattedText, TooltipComponent>[];
    isEmpty(): boolean;
    removeAll(components: Component[]): void;
    setIngredient(typedIngredient: ITypedIngredient<any>): void;
    toLegacyToComponents(): Component[];
    toString(): string;
  }


  interface OffsetJeiInputHandler extends IJeiInputHandler {}
  class OffsetJeiInputHandler extends IJeiInputHandler {
    constructor(inputHandler: IJeiInputHandler, offset: Supplier<ScreenPosition>);
    get area(): ScreenRectangle;
    handleInput(mouseX: number, mouseY: number, input: IJeiUserInput): boolean;
    handleMouseDragged(mouseX: number, mouseY: number, mouseKey: Key, dragX: number, dragY: number): boolean;
    handleMouseMoved(mouseX: number, mouseY: number): void;
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
  }


  interface RecipeLayoutDrawableErrored<R = any> extends IRecipeLayoutDrawable<R> {}
  class RecipeLayoutDrawableErrored<R = any> extends IRecipeLayoutDrawable<R> {
    constructor(recipeCategory: IRecipeCategory<R>, recipe: R, background: IScalableDrawable, borderPadding: number);
    drawOverlays(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawRecipe(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get inputHandler(): IJeiInputHandler;
    get recipe(): R;
    get recipeCategory(): IRecipeCategory<R>;
    get recipeSlotsView(): IRecipeSlotsView;
    get rect(): Rect2i;
    get rectWithBorder(): Rect2i;
    getIngredientUnderMouse<T>(mouseX: number, mouseY: number, ingredientType: IIngredientType<T>): Optional<T>;
    getRecipeSlotUnderMouse(mouseX: number, mouseY: number): Optional<IRecipeSlotDrawable>;
    getSideButtonArea(buttonIndex: number): Rect2i;
    getSlotUnderMouse(mouseX: number, mouseY: number): Optional<RecipeSlotUnderMouse>;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    setPosition(posX: number, posY: number): void;
    tick(): void;
  }

}

declare module 'mezz.jei.common.gui.textures' {
  import { TextureAtlasHolder } from 'net.minecraft.client.resources';
  import { TextureManager, TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IDrawableStatic } from 'mezz.jei.api.gui.drawable';
  import { HighResolutionDrawable, DrawableNineSliceTexture } from 'mezz.jei.common.gui.elements';

  interface JeiSpriteUploader extends TextureAtlasHolder {}
  class JeiSpriteUploader extends TextureAtlasHolder {
    constructor(textureManager: TextureManager);
    getSprite(location: ResourceLocation): TextureAtlasSprite;
  }


  class Textures {
    constructor(spriteUploader: JeiSpriteUploader);
    get arrowNext(): IDrawableStatic;
    get arrowPrevious(): IDrawableStatic;
    get bookmarkButtonDisabledIcon(): IDrawableStatic;
    get bookmarkButtonEnabledIcon(): IDrawableStatic;
    get bookmarkListBackground(): DrawableNineSliceTexture;
    get bookmarkListSlotBackground(): DrawableNineSliceTexture;
    get bookmarksFirst(): IDrawableStatic;
    get brewingStandArrow(): IDrawableStatic;
    get brewingStandBackground(): IDrawableStatic;
    get brewingStandBlazeHeat(): IDrawableStatic;
    get brewingStandBubbles(): IDrawableStatic;
    get catalystTab(): DrawableNineSliceTexture;
    get configButtonCheatIcon(): IDrawableStatic;
    get configButtonIcon(): IDrawableStatic;
    get craftableFirst(): IDrawableStatic;
    get flameEmptyIcon(): IDrawableStatic;
    get flameIcon(): IDrawableStatic;
    get historyButtonDisabledIcon(): IDrawableStatic;
    get historyButtonEnabledIcon(): IDrawableStatic;
    get infoIcon(): IDrawableStatic;
    get ingredientListBackground(): DrawableNineSliceTexture;
    get ingredientListSlotBackground(): DrawableNineSliceTexture;
    get outputSlot(): IDrawableStatic;
    get recipeArrow(): IDrawableStatic;
    get recipeArrowFilled(): IDrawableStatic;
    get recipeBackground(): DrawableNineSliceTexture;
    get recipeBookmark(): IDrawableStatic;
    get recipeCatalystSlotBackground(): DrawableNineSliceTexture;
    get recipeGuiBackground(): DrawableNineSliceTexture;
    get recipeOptionsTab(): DrawableNineSliceTexture;
    get recipePlusSign(): IDrawableStatic;
    get recipePreviewBackground(): DrawableNineSliceTexture;
    get recipeTransfer(): IDrawableStatic;
    get scrollbarBackground(): DrawableNineSliceTexture;
    get scrollbarMarker(): DrawableNineSliceTexture;
    get searchBackground(): DrawableNineSliceTexture;
    get shapelessIcon(): HighResolutionDrawable;
    get slot(): IDrawableStatic;
    get spriteUploader(): JeiSpriteUploader;
    get tabSelected(): IDrawableStatic;
    get tabUnselected(): IDrawableStatic;
    getButtonForState(pressed: boolean, enabled: boolean, hovered: boolean): DrawableNineSliceTexture;
  }

}

declare module 'mezz.jei.common.input' {
  import { IClickableIngredient, IIngredientManager, IJeiKeyMappings, IJeiKeyMapping } from 'mezz.jei.api.runtime';
  import { ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { IClickableIngredientFactory } from 'mezz.jei.api.gui.builder';
  import { IBuilder } from 'mezz.jei.api.gui.builder.IClickableIngredientFactory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { Key } from 'InputConstants';

  interface ClickableIngredient<V = any> extends IClickableIngredient<V> {}
  class ClickableIngredient<V = any> extends IClickableIngredient<V> {
    constructor(value: ITypedIngredient<V>, area: ImmutableRect2i);
    get area(): Rect2i;
    get ingredient(): V;
    get ingredientType(): IIngredientType<V>;
    get typedIngredient(): ITypedIngredient<V>;
  }


  interface ClickableIngredientFactory extends IClickableIngredientFactory {}
  class ClickableIngredientFactory extends IClickableIngredientFactory {
    constructor(ingredientManager: IIngredientManager);
    createBuilder<T>(value: ITypedIngredient<T>): IBuilder<T>;
    createBuilder<T>(ingredientType: IIngredientType<T>, ingredient: T): IBuilder<T>;
    createBuilder(itemStack: ItemStack): IBuilder<ItemStack>;
  }


  interface IInternalKeyMappings extends IJeiKeyMappings {}
  class IInternalKeyMappings extends IJeiKeyMappings {
    get bookmark(): IJeiKeyMapping;
    get cheatItemStack(): IJeiKeyMapping;
    get cheatOneItem(): IJeiKeyMapping;
    get closeRecipeGui(): IJeiKeyMapping;
    get copyRecipeId(): IJeiKeyMapping;
    get enterKey(): IJeiKeyMapping;
    get escapeKey(): IJeiKeyMapping;
    get focusSearch(): IJeiKeyMapping;
    get hoveredClearSearchBar(): IJeiKeyMapping;
    get leftClick(): IJeiKeyMapping;
    get maxTransferRecipeBookmark(): IJeiKeyMapping;
    get nextCategory(): IJeiKeyMapping;
    get nextPage(): IJeiKeyMapping;
    get nextRecipePage(): IJeiKeyMapping;
    get nextSearch(): IJeiKeyMapping;
    get previousCategory(): IJeiKeyMapping;
    get previousPage(): IJeiKeyMapping;
    get previousRecipePage(): IJeiKeyMapping;
    get previousSearch(): IJeiKeyMapping;
    get recipeBack(): IJeiKeyMapping;
    get rightClick(): IJeiKeyMapping;
    get showRecipe(): IJeiKeyMapping;
    get showUses(): IJeiKeyMapping;
    get toggleBookmarkOverlay(): IJeiKeyMapping;
    get toggleCheatMode(): IJeiKeyMapping;
    get toggleCheatModeConfigButton(): IJeiKeyMapping;
    get toggleEditMode(): IJeiKeyMapping;
    get toggleHideIngredient(): IJeiKeyMapping;
    get toggleOverlay(): IJeiKeyMapping;
    get toggleWildcardHideIngredient(): IJeiKeyMapping;
    get transferRecipeBookmark(): IJeiKeyMapping;
  }


  class KeyNameUtil {
    static getKeyDisplayName(key: Key): Component;
  }

}

declare module 'mezz.jei.common.input.keys' {
  import { IJeiKeyMapping } from 'mezz.jei.api.runtime';
  import { Key } from 'InputConstants';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';
  import { KeyMapping } from 'net.minecraft.client';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AbstractJeiKeyMappingBuilder extends IJeiKeyMappingBuilder {}
  class AbstractJeiKeyMappingBuilder extends IJeiKeyMappingBuilder {
    buildMouseLeft(): IJeiKeyMappingInternal;
    buildMouseMiddle(): IJeiKeyMappingInternal;
    buildMouseRight(): IJeiKeyMappingInternal;
    buildUnbound(): IJeiKeyMappingInternal;
  }


  class IJeiKeyMappingBuilder {
    buildKeyboardKey(var1: number): IJeiKeyMappingInternal;
    buildMouseLeft(): IJeiKeyMappingInternal;
    buildMouseMiddle(): IJeiKeyMappingInternal;
    buildMouseRight(): IJeiKeyMappingInternal;
    buildUnbound(): IJeiKeyMappingInternal;
    setContext(var1: JeiKeyConflictContext): IJeiKeyMappingBuilder;
    setModifier(var1: JeiKeyModifier): IJeiKeyMappingBuilder;
  }


  class IJeiKeyMappingCategoryBuilder {
    createMapping(var1: string): IJeiKeyMappingBuilder;
  }


  interface IJeiKeyMappingInternal extends IJeiKeyMapping {}
  class IJeiKeyMappingInternal extends IJeiKeyMapping {
    get translatedKeyMessage(): Component;
    isActiveAndMatches(var1: Key): boolean;
    isUnbound(): boolean;
    register(var1: Consumer<KeyMapping>): IJeiKeyMapping;
  }


  interface JeiKeyConflictContext extends Enum<JeiKeyConflictContext> {}
  class JeiKeyConflictContext extends Enum<JeiKeyConflictContext> {
    static readonly UNIVERSAL: JeiKeyConflictContext;
    static readonly GUI: JeiKeyConflictContext;
    static readonly IN_GAME: JeiKeyConflictContext;
    static readonly JEI_GUI_HOVER: JeiKeyConflictContext;
    static readonly JEI_GUI_HOVER_CHEAT_MODE: JeiKeyConflictContext;
    static readonly JEI_GUI_HOVER_CONFIG_BUTTON: JeiKeyConflictContext;
    static readonly JEI_GUI_HOVER_SEARCH: JeiKeyConflictContext;
    conflicts(other: JeiKeyConflictContext): boolean;
    isActive(): boolean;
    static valueOf(name: string): JeiKeyConflictContext;
    static values(): JeiKeyConflictContext[];
  }


  interface JeiKeyModifier extends Enum<JeiKeyModifier> {}
  class JeiKeyModifier extends Enum<JeiKeyModifier> {
    static readonly CONTROL_OR_COMMAND: JeiKeyModifier;
    static readonly SHIFT: JeiKeyModifier;
    static readonly ALT: JeiKeyModifier;
    static readonly NONE: JeiKeyModifier;
    getCombinedName(var1: Key): Component;
    isActive(var1: JeiKeyConflictContext): boolean;
    static valueOf(name: string): JeiKeyModifier;
    static values(): JeiKeyModifier[];
  }


  interface JeiMultiKeyMapping extends IJeiKeyMapping {}
  class JeiMultiKeyMapping extends IJeiKeyMapping {
    constructor(...mappings: IJeiKeyMapping[]);
    get translatedKeyMessage(): Component;
    isActiveAndMatches(key: Key): boolean;
    isUnbound(): boolean;
  }

}

declare module 'mezz.jei.common.network.codecs' {
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { Class } from 'java.lang';

  interface EnumStreamCodec<T extends Enum<T> = any> extends StreamCodec<FriendlyByteBuf, T> {}
  class EnumStreamCodec<T extends Enum<T> = any> extends StreamCodec<FriendlyByteBuf, T> {
    constructor(enumClass: Class<T>);
    decode(buf: FriendlyByteBuf): T;
    encode(buf: FriendlyByteBuf, e: T): void;
  }

}

declare module 'mezz.jei.common.network' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PlayToClientPacket, PlayToServerPacket } from 'mezz.jei.common.network.packets';

  class IConnectionToClient {
    sendPacketToClient<T extends PlayToClientPacket<T>>(var1: T, var2: ServerPlayer): void;
  }


  class IConnectionToServer {
    isJeiOnServer(): boolean;
    sendPacketToServer<T extends PlayToServerPacket<T>>(var1: T): void;
  }

}

declare module 'mezz.jei.common.network.packets.handlers' {
  import { ClientPacketContext } from 'mezz.jei.common.network';
  import { List } from 'java.util';

  class ClientCheatPermissionHandler {
    static handleHasCheatPermission(context: ClientPacketContext, hasPermission: boolean, allowedCheatingMethods: string[]): void;
  }

}

declare module 'mezz.jei.common.network.packets' {
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { IServerConfig, GiveMode } from 'mezz.jei.common.config';
  import { List } from 'java.util';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ClientPacketContext, ServerPacketContext } from 'mezz.jei.common.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TransferOperation } from 'mezz.jei.common.transfer';
  import { Integer } from 'java.lang';
  import { Slot } from 'net.minecraft.world.inventory';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';

  interface PacketCheatPermission extends PlayToClientPacket<PacketCheatPermission> {}
  class PacketCheatPermission extends PlayToClientPacket<PacketCheatPermission> {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(hasPermission: boolean, serverConfig: IServerConfig);

    constructor(hasPermission: boolean, allowedCheatingMethods: string[]);
    process(context: ClientPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketCheatPermission>;
    type(): Type<PacketCheatPermission>;
  }


  interface PacketDeletePlayerItem extends PlayToServerPacket<PacketDeletePlayerItem> {}
  class PacketDeletePlayerItem extends PlayToServerPacket<PacketDeletePlayerItem> {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(itemStack: ItemStack);
    process(context: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketDeletePlayerItem>;
    type(): Type<PacketDeletePlayerItem>;
  }


  interface PacketGiveItemStack extends PlayToServerPacket<PacketGiveItemStack> {}
  class PacketGiveItemStack extends PlayToServerPacket<PacketGiveItemStack> {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(itemStack: ItemStack, giveMode: GiveMode);
    process(context: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketGiveItemStack>;
    type(): Type<PacketGiveItemStack>;
  }


  interface PacketRecipeTransfer extends PlayToServerPacket<PacketRecipeTransfer> {}
  class PacketRecipeTransfer extends PlayToServerPacket<PacketRecipeTransfer> {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    readonly transferOperations: List;
    readonly craftingSlots: List;
    readonly inventorySlots: List;
    constructor(transferOperations: TransferOperation[], craftingSlots: number[], inventorySlots: number[], maxTransfer: boolean, requireCompleteSets: boolean);
    static fromSlots(transferOperations: TransferOperation[], craftingSlots: Slot[], inventorySlots: Slot[], maxTransfer: boolean, requireCompleteSets: boolean): PacketRecipeTransfer;
    process(context: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketRecipeTransfer>;
    type(): Type<PacketRecipeTransfer>;
  }


  interface PacketRequestCheatPermission extends PlayToServerPacket<PacketRequestCheatPermission> {}
  class PacketRequestCheatPermission extends PlayToServerPacket<PacketRequestCheatPermission> {
    static readonly INSTANCE: PacketRequestCheatPermission;
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    process(context: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketRequestCheatPermission>;
    type(): Type<PacketRequestCheatPermission>;
  }


  interface PacketSetHotbarItemStack extends PlayToServerPacket<PacketSetHotbarItemStack> {}
  class PacketSetHotbarItemStack extends PlayToServerPacket<PacketSetHotbarItemStack> {
    static readonly TYPE: Type;
    static readonly STREAM_CODEC: StreamCodec;
    constructor(itemStack: ItemStack, hotbarSlot: number);
    process(context: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, PacketSetHotbarItemStack>;
    type(): Type<PacketSetHotbarItemStack>;
  }


  interface PlayToClientPacket<T extends PlayToClientPacket<T> = any> extends CustomPacketPayload {}
  class PlayToClientPacket<T extends PlayToClientPacket<T> = any> extends CustomPacketPayload {
    process(var1: ClientPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    type(): Type<T>;
  }


  interface PlayToServerPacket<T extends PlayToServerPacket<T> = any> extends CustomPacketPayload {}
  class PlayToServerPacket<T extends PlayToServerPacket<T> = any> extends CustomPacketPayload {
    process(var1: ServerPacketContext): void;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, T>;
    type(): Type<T>;
  }

}

declare module 'mezz.jei.common.platform' {
  import { Path } from 'java.nio.file';
  import { Optional, List } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IPlatformFluidHelper } from 'mezz.jei.api.helpers';
  import { IIngredientRenderer, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { TooltipFlag, DyeColor, ItemStack } from 'net.minecraft.world.item';
  import { Codec } from 'com.mojang.serialization';
  import { Ingredient, SmithingRecipe } from 'net.minecraft.world.item.crafting';
  import { PotionBrewing } from 'net.minecraft.world.item.alchemy';
  import { Stream } from 'java.util.stream';
  import { KeyMapping, Minecraft } from 'net.minecraft.client';
  import { Key } from 'InputConstants';
  import { IJeiKeyMappingCategoryBuilder } from 'mezz.jei.common.input.keys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { GrindstoneMenu, Slot } from 'net.minecraft.world.inventory';
  import { IJeiBrewingRecipe, IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { Holder } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Either } from 'com.mojang.datafixers.util';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { TagKey } from 'net.minecraft.tags';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { RecipeUpdateListener, RecipeBookTabButton, RecipeBookComponent } from 'net.minecraft.client.gui.screens.recipebook';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { Class } from 'java.lang';

  class IPlatformConfigHelper {
    createJeiConfigDir(): Path;
    get configScreen(): Optional<Screen>;
    get modConfigDir(): Path;
  }


  interface IPlatformFluidHelperInternal<T = any> extends IPlatformFluidHelper<T> {}
  class IPlatformFluidHelperInternal<T = any> extends IPlatformFluidHelper<T> {
    copy(var1: T): T;
    copyWithAmount(var1: T, var2: number): T;
    createRenderer(var1: number, var3: boolean, var4: number, var5: number): IIngredientRenderer<T>;
    get codec(): Codec<T>;
    getAmount(var1: T): number;
    getColorTint(var1: T): number;
    getComponentsPatch(var1: T): DataComponentPatch;
    getContainedFluid(var1: ITypedIngredient<any>): Optional<T>;
    getDisplayName(var1: T): Component;
    getStillFluidSprite(var1: T): Optional<TextureAtlasSprite>;
    getTooltip(var1: Component[], var2: T, var3: TooltipFlag): void;
    normalize(var1: T): T;
  }


  class IPlatformHelper {
    get configHelper(): IPlatformConfigHelper;
    get fluidHelper(): IPlatformFluidHelperInternal<any>;
    get ingredientHelper(): IPlatformIngredientHelper;
    get inputHelper(): IPlatformInputHelper;
    get itemStackHelper(): IPlatformItemStackHelper;
    get modHelper(): IPlatformModHelper;
    get recipeHelper(): IPlatformRecipeHelper;
    get renderHelper(): IPlatformRenderHelper;
    get screenHelper(): IPlatformScreenHelper;
  }


  class IPlatformIngredientHelper {
    createShulkerDyeIngredient(var1: DyeColor): Ingredient;
    getCompostValue(itemStack: ItemStack): number;
    getPotionContainers(var1: PotionBrewing): Ingredient[];
    getPotionIngredients(var1: PotionBrewing): Stream<Ingredient>;
  }


  class IPlatformInputHelper {
    createKeyMappingCategoryBuilder(var1: string): IJeiKeyMappingCategoryBuilder;
    getClientTooltipFlag(tooltipFlag: TooltipFlag): TooltipFlag;
    isActiveAndMatches(var1: KeyMapping, var2: Key): boolean;
  }


  class IPlatformItemStackHelper {
    getBurnTime(var1: ItemStack): number;
    getCreatorModId(var1: ItemStack): Optional<string>;
    getTestTooltip(var1: Player, var2: ItemStack): Component[];
    isBookEnchantable(var1: ItemStack, var2: ItemStack): boolean;
  }


  class IPlatformModHelper {
    getModNameForModId(var1: string): string;
    isInDev(): boolean;
  }


  class IPlatformRecipeHelper {
    getAddition(var1: SmithingRecipe): Ingredient;
    getBase(var1: SmithingRecipe): Ingredient;
    getBrewingRecipes(var1: IIngredientManager, var2: IVanillaRecipeFactory, var3: PotionBrewing): IJeiBrewingRecipe[];
    getGrindstoneResult(var1: GrindstoneMenu, var2: ItemStack, var3: ItemStack): ItemStack;
    getTemplate(var1: SmithingRecipe): Ingredient;
    isItemEnchantable(var1: ItemStack, var2: Holder<Enchantment>): boolean;
  }


  class IPlatformRenderHelper {
    createLimitedQuadItemModel(var1: BakedModel): BakedModel;
    get itemColors(): ItemColors;
    getFontRenderer(var1: Minecraft, var2: ItemStack): Font;
    getMainImage(var1: TextureAtlasSprite): Optional<NativeImage>;
    getName(var1: TagKey<any>): Component;
    getParticleIcon(var1: BakedModel): TextureAtlasSprite;
    renderTooltip(var1: GuiGraphics, var2: Either<FormattedText, TooltipComponent>[], var3: number, var4: number, var5: Font, var6: ItemStack): void;
    shouldRender(var1: MobEffectInstance): boolean;
  }


  class IPlatformScreenHelper {
    canLoseFocus(var1: EditBox): boolean;
    get toastsArea(): ImmutableRect2i;
    getBookArea(var1: RecipeUpdateListener): ImmutableRect2i;
    getGuiLeft(var1: AbstractContainerScreen<any>): number;
    getGuiTop(var1: AbstractContainerScreen<any>): number;
    getSlotUnderMouse(var1: AbstractContainerScreen<any>): Optional<Slot>;
    getTabButtons(var1: RecipeBookComponent): RecipeBookTabButton[];
    getXSize(var1: AbstractContainerScreen<any>): number;
    getYSize(var1: AbstractContainerScreen<any>): number;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(serviceClass: Class<T>): T;
  }

}

declare module 'mezz.jei.common.transfer' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { IRecipeTransferError } from 'mezz.jei.api.recipe.transfer';
  import { Type } from 'mezz.jei.api.recipe.transfer.IRecipeTransferError';

  class BasicRecipeTransferHandlerServer {
    static setItems(player: Player, transferOperations: TransferOperation[], craftingSlots: Slot[], inventorySlots: Slot[], maxTransfer: boolean, requireCompleteSets: boolean): void;
  }


  interface RecipeTransferErrorInternal extends IRecipeTransferError {}
  class RecipeTransferErrorInternal extends IRecipeTransferError {
    static readonly INSTANCE: RecipeTransferErrorInternal;
    get type(): Type;
  }


  class RecipeTransferOperationsResult {
    readonly results: List;
    readonly missingItems: List;
  }

}

declare module 'mezz.jei.common.util' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { ChatFormatting, CrashReport } from 'net.minecraft';
  import { Duration } from 'java.time';
  import { Runnable, Iterable, Throwable, Void, Enum, Boolean, Integer } from 'java.lang';
  import { Future } from 'java.util.concurrent';
  import { IIngredientType, ITypedIngredient, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Collection, Optional, List, Locale } from 'java.util';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutDrawable, ITickTimer } from 'mezz.jei.api.gui';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { StyledContentConsumer } from 'FormattedText';
  import { Style, FormattedText, Component } from 'net.minecraft.network.chat';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { Matrix4f } from 'org.joml';
  import { Supplier, Function } from 'java.util.function';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Direction, Registry, RegistryAccess } from 'net.minecraft.core';
  import { ResourceKey } from 'net.minecraft.resources';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { Default } from 'TooltipFlag';
  import { BatchRenderElement } from 'mezz.jei.api.ingredients.rendering';
  import { IServerConfig, GiveMode } from 'mezz.jei.common.config';
  import { ServerPacketContext } from 'mezz.jei.common.network';
  import { Path } from 'java.nio.file';
  import { IStackHelper } from 'mezz.jei.api.helpers';
  import { ISubtypeManager, UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { Pair } from 'mezz.jei.core.util';
  import { TagKey } from 'net.minecraft.tags';
  import { Stream } from 'java.util.stream';
  import { Named } from 'HolderSet';

  class ChatUtil {
    static writeChatMessage(player: Player, translationKey: string, color: ChatFormatting): void;
  }


  class DeduplicatingRunner {
    constructor(delay: Duration);

    constructor(delay: Duration, executor: IDelayedExecutor);
    run(runnable: Runnable): void;
  }


  interface DelayedExecutor extends IDelayedExecutor {}
  class DelayedExecutor extends IDelayedExecutor {
    static get instance(): DelayedExecutor;
    schedule(command: Runnable, delay: Duration): Future<any>;
  }


  class ErrorUtil {
    static assertMainThread(): void;
    static checkNotEmpty(itemStack: ItemStack, name: string): void;
    static checkNotEmpty<T>(values: T[], name: string): void;
    static checkNotEmpty(values: Collection<any>, name: string): void;
    static checkNotNull<T>(object: T, name: string): void;
    static checkNotNull(values: Collection<any>, name: string): void;
    static createIngredientCrashReport<T>(throwable: Throwable, title: string, ingredientManager: IIngredientManager, typedIngredient: ITypedIngredient<T>): CrashReport;
    static createIngredientCrashReport<T>(throwable: Throwable, title: string, ingredientManager: IIngredientManager, ingredientType: IIngredientType<T>, ingredient: T): CrashReport;
    static getIngredientInfo<T>(ingredient: T, ingredientType: IIngredientType<T>, ingredientManager: IIngredientManager): string;
    static getItemStackInfo(itemStack: ItemStack): string;
    static getRecipeInfo<T>(recipeLayoutDrawable: IRecipeLayoutDrawable<T>): string;
    static getRecipeInfo<T>(recipeCategory: IRecipeCategory<T>, recipe: T): string;
    static logIngredientCrash<T>(throwable: Throwable, title: string, ingredientManager: IIngredientManager, ingredientType: IIngredientType<T>, ingredient: T): void;
    static validateRecipes<T>(recipeType: RecipeType<T>, recipes: Iterable<T>): void;
  }


  interface ExpandNewLineTextAcceptor extends StyledContentConsumer<Void> {}
  class ExpandNewLineTextAcceptor extends StyledContentConsumer<Void> {
    accept(style: Style, line: string): Optional<Void>;
    addLinesTo(descriptionLinesExpanded: FormattedText[]): void;
  }


  class IDelayedExecutor {
    schedule(var1: Runnable, var2: Duration): Future<any>;
  }


  class MathUtil {
    static centerArea(outer: ImmutableRect2i, width: number, height: number): ImmutableRect2i;
    static centerTextArea(outer: ImmutableRect2i, fontRenderer: Font, text: string): ImmutableRect2i;
    static centerTextArea(outer: ImmutableRect2i, fontRenderer: Font, text: FormattedCharSequence): ImmutableRect2i;
    static contains(rect: ImmutableRect2i, x: number, y: number): boolean;
    static contains(rect: Rect2i, x: number, y: number): boolean;
    static contains(rect: ScreenRectangle, x: number, y: number): boolean;
    static distance(start: Vec2, end: Vec2): number;
    static divideCeil(numerator: number, denominator: number): number;
    static intersects(areas: Collection<ImmutableRect2i>, comparisonArea: ImmutableRect2i): boolean;
    static transform(rect: ImmutableRect2i, pose: Matrix4f): ScreenRectangle;
    static union(rect1: ImmutableRect2i, rect2: ImmutableRect2i): ImmutableRect2i;
  }


  interface MinecraftLocaleSupplier extends Supplier<Locale> {}
  class MinecraftLocaleSupplier extends Supplier<Locale> {
    get (): Locale;
  }


  interface NavigationVisibility extends Enum<NavigationVisibility> {}
  class NavigationVisibility extends Enum<NavigationVisibility> {
    static readonly ENABLED: NavigationVisibility;
    static readonly AUTO_HIDE: NavigationVisibility;
    static readonly DISABLED: NavigationVisibility;
    static valueOf(name: string): NavigationVisibility;
    static values(): NavigationVisibility[];
  }


  class QuadUtil {
    static getQuadsFacingDirection(quads: BakedQuad[], poseStack: PoseStack, facing: Direction): BakedQuad[];
  }


  class RectDebugger {
    static readonly INSTANCE: RectDebugger;
    add(rect: ImmutableRect2i, color: number, id: string): void;
    draw(guiGraphics: GuiGraphics): void;
  }


  class RegistryUtil {
    static get registryAccess(): RegistryAccess;
    static getRegistry<T>(key: ResourceKey<Registry<T>>): Registry<T>;
    static set registryAccess(registryAccess: RegistryAccess);
  }


  class SafeIngredientUtil {
    static getPlainTooltipForSearch<T>(ingredientManager: IIngredientManager, ingredientRenderer: IIngredientRenderer<T>, typedIngredient: ITypedIngredient<T>, tooltipFlag: Default): Component[];
    static getRichTooltip<T>(tooltip: ITooltipBuilder, ingredientManager: IIngredientManager, ingredientRenderer: IIngredientRenderer<T>, typedIngredient: ITypedIngredient<T>): void;
    static getRichTooltip<T>(tooltip: ITooltipBuilder, ingredientManager: IIngredientManager, ingredientRenderer: IIngredientRenderer<T>, typedIngredient: ITypedIngredient<T>, tooltipFlag: TooltipFlag): void;
    static render<T>(guiGraphics: GuiGraphics, ingredientRenderer: IIngredientRenderer<T>, typedIngredient: ITypedIngredient<T>, x: number, y: number): void;
    static render<T>(guiGraphics: GuiGraphics, ingredientRenderer: IIngredientRenderer<T>, ingredientType: IIngredientType<T>, element: BatchRenderElement<T>): void;
    static render<T>(guiGraphics: GuiGraphics, ingredientRenderer: IIngredientRenderer<T>, ingredientType: IIngredientType<T>, ingredient: T, x: number, y: number): void;
    static renderBatch<T>(guiGraphics: GuiGraphics, ingredientType: IIngredientType<T>, ingredientRenderer: IIngredientRenderer<T>, elements: BatchRenderElement<T>[]): void;
  }


  class ServerCommandUtil {
    static canStack(a: ItemStack, b: ItemStack): boolean;
    static executeGive(context: ServerPacketContext, itemStack: ItemStack, giveMode: GiveMode): void;
    static hasPermissionForCheatMode(sender: Player, serverConfig: IServerConfig): boolean;
    static mousePickupItemStack(sender: Player, itemStack: ItemStack): void;
    static setHotbarSlot(context: ServerPacketContext, itemStack: ItemStack, hotbarSlot: number): void;
  }


  class ServerConfigPathUtil {
    static getWorldPath(basePath: Path): Optional<Path>;
  }


  interface StackHelper extends IStackHelper {}
  class StackHelper extends IStackHelper {
    constructor(subtypeManager: ISubtypeManager);
    static getRegistryNameForStack(stack: ItemStack): string;
    getUidForStack(stack: ItemStack, context: UidContext): any;
    getUidForStack(typedIngredient: ITypedIngredient<ItemStack>, context: UidContext): any;
    getUniqueIdentifierForStack(stack: ItemStack, context: UidContext): string;
    hasSubtypes(stack: ItemStack): boolean;
    isEquivalent(lhs: ItemStack, rhs: ItemStack, context: UidContext): boolean;
  }


  class StringUtil {
    static drawCenteredStringWithShadow(guiGraphics: GuiGraphics, font: Font, string: string, area: ImmutableRect2i): void;
    static drawCenteredStringWithShadow(guiGraphics: GuiGraphics, font: Font, text: FormattedCharSequence, area: ImmutableRect2i): void;
    static expandNewlines(...descriptionComponents: Component[]): FormattedText[];
    static intsToString(indexes: Collection<number>): string;
    static removeChatFormatting(string: string): string;
    static splitLines(font: Font, lines: FormattedText[], width: number, maxLines: number): Pair<FormattedText[], boolean>;
    static stripStyling(textComponent: Component): Component;
    static truncateStringToWidth(text: FormattedText, width: number, font: Font): FormattedText;
  }


  class TagUtil {
    static getTagEquivalent<VALUE, STACK>(stacks: Collection<STACK>, stackToValue: Function<STACK, VALUE>, tagSupplier: Supplier<Stream<Pair<TagKey<VALUE>, Named<VALUE>>>>): Optional<TagKey<any>>;
  }


  interface TickTimer extends ITickTimer {}
  class TickTimer extends ITickTimer {
    constructor(ticksPerCycle: number, maxValue: number, countDown: boolean);
    get maxValue(): number;
    get value(): number;
    static getValue(startTime: number, currentTime: number, maxValue: number, msPerCycle: number, countDown: boolean): number;
  }


  class Translator {
    static setLocaleSupplier(localeSupplier: Supplier<Locale>): void;
    static toLowercaseWithLocale(string: string): string;
    static translateToLocal(key: string): string;
    static translateToLocalFormatted(key: string, ...format: any[]): string;
  }

}

declare module 'mezz.jei.core.collect' {
  import { List, Map, Collection, Set } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { ImmutableListMultimap, ImmutableMultimap, ImmutableSetMultimap, ImmutableTable } from 'com.google.common.collect';
  import { Entry } from 'Map';

  interface ListMultiMap<K = any, V = any> extends MultiMap<K, V, List> {}
  class ListMultiMap<K = any, V = any> extends MultiMap<K, V, List> {
    constructor();

    constructor(collectionSupplier: Supplier<V[]>);

    constructor(map: Map<K, V[]>, collectionSupplier: Supplier<V[]>);
    get(key: K): V[];
    toImmutable(): ImmutableListMultimap<K, V>;
  }


  class MultiMap<K = any, V = any, T extends Collection<V> = any> {
    constructor(collectionSupplier: Supplier<T>);

    constructor(map: Map<K, T>, collectionSupplier: Supplier<T>);
    allValues(): Collection<V>;
    clear(): void;
    contains(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    entrySet(): Set<Entry<K, T>>;
    get(key: K): Collection<V>;
    keySet(): Set<K>;
    put(key: K, value: V): boolean;
    putAll(key: K, values: Collection<V>): boolean;
    remove(key: K, value: V): boolean;
    toImmutable(): ImmutableMultimap<K, V>;
  }


  interface SetMultiMap<K = any, V = any> extends MultiMap<K, V, Set> {}
  class SetMultiMap<K = any, V = any> extends MultiMap<K, V, Set> {
    constructor();

    constructor(collectionSupplier: Supplier<Set<V>>);

    constructor(map: Map<K, Set<V>>, collectionSupplier: Supplier<Set<V>>);
    get(key: K): Set<V>;
    toImmutable(): ImmutableSetMultimap<K, V>;
  }


  class Table<R = any, C = any, V = any> {
    constructor(table: Map<R, Map<C, V>>, rowSupplier: Supplier<Map<C, V>>);
    clear(): void;
    computeIfAbsent(row: R, col: C, valueSupplier: Supplier<V>): V;
    contains(row: R, col: C): boolean;
    get(row: R, col: C): V;
    getRow(row: R): Map<C, V>;
    static hashBasedTable<R, C, V>(): Table<R, C, V>;
    static identityHashBasedTable<R, C, V>(): Table<R, C, V>;
    put(row: R, col: C, val: V): V;
    toImmutable(): ImmutableTable<R, C, V>;
  }

}

declare module 'mezz.jei.core.search' {
  import { Consumer, Supplier } from 'java.util.function';
  import { Collection, List } from 'java.util';
  import { IModeGetter, IStringsGetter } from 'mezz.jei.core.search.PrefixInfo';
  import { Enum } from 'java.lang';

  interface CombinedSearchables<T = any> extends ISearchable<T> {}
  class CombinedSearchables<T = any> extends ISearchable<T> {
    addSearchable(searchable: ISearchable<T>): void;
    getAllElements(resultsConsumer: Consumer<Collection<T>>): void;
    getSearchResults(word: string, resultsConsumer: Consumer<Collection<T>>): void;
  }


  class ISearchable<T = any> {
    get mode(): SearchMode;
    getAllElements(var1: Consumer<Collection<T>>): void;
    getSearchResults(var1: string, var2: Consumer<Collection<T>>): void;
  }


  class ISearchStorage<T = any> {
    getAllElements(var1: Consumer<Collection<T>>): void;
    getSearchResults(var1: string, var2: Consumer<Collection<T>>): void;
    put(var1: string, var2: T): void;
    statistics(): string;
  }


  interface LimitedStringStorage<T = any> extends ISearchStorage<T> {}
  class LimitedStringStorage<T = any> extends ISearchStorage<T> {
    getAllElements(resultsConsumer: Consumer<Collection<T>>): void;
    getSearchResults(token: string, resultsConsumer: Consumer<Collection<T>>): void;
    put(key: string, value: T): void;
    statistics(): string;
  }


  interface PrefixedSearchable<T = any, I = any> extends ISearchable<I> {}
  class PrefixedSearchable<T = any, I = any> extends ISearchable<I> {
    constructor(searchStorage: ISearchStorage<I>, prefixInfo: PrefixInfo<T, I>);
    get mode(): SearchMode;
    get searchStorage(): ISearchStorage<I>;
    getAllElements(resultsConsumer: Consumer<Collection<I>>): void;
    getSearchResults(token: string, resultsConsumer: Consumer<Collection<I>>): void;
    getStrings(element: T): Collection<string>;
  }


  class PrefixInfo<T = any, I = any> {
    constructor(prefix: string, modeGetter: IModeGetter, stringsGetter: IStringsGetter<T>, storageSupplier: Supplier<ISearchStorage<I>>);
    createStorage(): ISearchStorage<I>;
    get mode(): SearchMode;
    get prefix(): string;
    getStrings(element: T): Collection<string>;
    toString(): string;
  }


  interface SearchMode extends Enum<SearchMode> {}
  class SearchMode extends Enum<SearchMode> {
    static readonly ENABLED: SearchMode;
    static readonly REQUIRE_PREFIX: SearchMode;
    static readonly DISABLED: SearchMode;
    static valueOf(name: string): SearchMode;
    static values(): SearchMode[];
  }

}

declare module 'mezz.jei.core.search.PrefixInfo' {
  import { SearchMode } from 'mezz.jei.core.search';
  import { Collection } from 'java.util';

  class IModeGetter {
    get mode(): SearchMode;
  }


  class IStringsGetter<T = any> {
    getStrings(var1: T): Collection<string>;
  }

}

declare module 'mezz.jei.core.search.suffixtree' {
  import { ISearchStorage } from 'mezz.jei.core.search';
  import { Consumer } from 'java.util.function';
  import { Collection, IntSummaryStatistics } from 'java.util';
  import { PrintWriter } from 'java.io';
  import { SubString } from 'mezz.jei.core.util';

  interface GeneralizedSuffixTree<T = any> extends ISearchStorage<T> {}
  class GeneralizedSuffixTree<T = any> extends ISearchStorage<T> {
    getAllElements(resultsConsumer: Consumer<Collection<T>>): void;
    getSearchResults(word: string, resultsConsumer: Consumer<Collection<T>>): void;
    printTree(out: PrintWriter, includeSuffixLinks: boolean): void;
    put(key: string, value: T): void;
    statistics(): string;
  }


  interface Node<T = any> extends SubString {}
  class Node<T = any> extends SubString {
    getData(resultsConsumer: Consumer<Collection<T>>): void;
    nodeEdgeStats(): string;
    nodeSizeStats(): IntSummaryStatistics;
    printTree(out: PrintWriter, includeSuffixLinks: boolean): void;
    toString(): string;
  }


  interface RootNode<T = any> extends Node<T> {}
  class RootNode<T = any> extends Node<T> {
    constructor();
  }

}

declare module 'mezz.jei.core.util.function' {
  import { Function, Supplier } from 'java.util.function';

  interface CachedFunction<T = any, R = any> extends Function<T, R> {}
  class CachedFunction<T = any, R = any> extends Function<T, R> {
    constructor(functionParameter: Function<T, R>);
    apply(currentValue: T): R;
  }


  interface CachedSupplierTransformer<T = any, R = any> extends Supplier<R> {}
  class CachedSupplierTransformer<T = any, R = any> extends Supplier<R> {
    constructor(supplier: Supplier<T>, functionParameter: Function<T, R>);
    get (): R;
  }


  interface LazySupplier<T = any> extends Supplier<T> {}
  class LazySupplier<T = any> extends Supplier<T> {
    constructor(supplier: Supplier<T>);
    get (): T;
  }

}

declare module 'mezz.jei.core.util' {
  import { Logger, Level } from 'org.apache.logging.log4j';
  import { Duration } from 'java.time';
  import { Consumer } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { Iterable, CharSequence, Class } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { Optional } from 'java.util';
  import { Direction } from 'mezz.jei.core.util.TextHistory';

  class LimitedLogger {
    constructor(logger: Logger, timeBetweenLogging: Duration);
    log(level: Level, key: string, message: string, ...params: any[]): void;
    log(level: Level, key: string, loggerConsumer: Consumer<Logger>): void;
  }


  class LoggedTimer {
    start(message: string): void;
    stop(): void;
  }


  class PathUtil {
    static moveAtomicReplace(source: Path, target: Path): void;
    static sanitizePathName(filename: string): string;
    static writeUsingTempFile(path: Path, lines: Iterable<CharSequence>): void;
  }


  class ReflectionUtil {
    getFieldWithClass<T>(object: any, fieldClass: Class<T>): Stream<T>;
  }


  class SubString {
    constructor(string: string);

    constructor(subString: SubString);

    constructor(string: string, offset: number);

    constructor(string: string, offset: number, length: number);
    append(newChar: string): SubString;
    charAt(index: number): string;
    isEmpty(): boolean;
    isPrefix(other: SubString): boolean;
    length(): number;
    regionMatches(toffset: number, other: string, ooffset: number, len: number): boolean;
    regionMatches(word: SubString, lenToMatch: number): boolean;
    set(other: SubString): void;
    shorten(amount: number): SubString;
    startsWith(other: SubString): boolean;
    substring(offset: number): SubString;
    toString(): string;
  }


  class TextHistory {
    add(currentText: string): boolean;
    get(direction: Direction, currentText: string): Optional<string>;
    getNext(currentText: string): Optional<string>;
    getPrevious(currentText: string): Optional<string>;
  }


  class TimeUtil {
    static toHumanString(duration: Duration): string;
  }


  interface WeakConsumer<T = any> extends Consumer<T> {}
  class WeakConsumer<T = any> extends Consumer<T> {
    constructor(consumer: Consumer<T>);
    accept(t: T): void;
  }


  class WeakList<T = any> {
    add(item: T): void;
    forEach(consumer: Consumer<T>): void;
    isEmpty(): boolean;
  }

}

declare module 'mezz.jei.core.util.TextHistory' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Direction extends Enum<Direction> {}
  class Direction extends Enum<Direction> {
    static readonly NEXT: Direction;
    static readonly PREVIOUS: Direction;
    static valueOf(name: string): Direction;
    static values(): Direction[];
  }

}

declare module 'mezz.jei.gui.bookmarks' {
  import { MapCodec, Codec } from 'com.mojang.serialization';
  import { ICodecHelper, IGuiHelper } from 'mezz.jei.api.helpers';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { IRecipeManager, IFocusFactory, RecipeType } from 'mezz.jei.api.recipe';
  import { RegistryAccess } from 'net.minecraft.core';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { IIngredientGridSource } from 'mezz.jei.gui.overlay';
  import { IBookmarkConfig } from 'mezz.jei.gui.config';
  import { IClientConfig } from 'mezz.jei.common.config';
  import { IElement } from 'mezz.jei.gui.overlay.elements';
  import { UserInput } from 'mezz.jei.gui.input';
  import { BookmarkOverlay } from 'mezz.jei.gui.overlay.bookmarks';
  import { List } from 'java.util';
  import { SourceListChangedListener } from 'mezz.jei.gui.overlay.IIngredientGridSource';
  import { Enum } from 'java.lang';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';

  class BookmarkCodec {
    static create(codecHelper: ICodecHelper, ingredientManager: IIngredientManager, recipeManager: IRecipeManager, bookmarkFactory: BookmarkFactory): MapCodec<IBookmark>;
  }


  class BookmarkFactory {
    constructor(codecHelper: ICodecHelper, registryAccess: RegistryAccess, ingredientManager: IIngredientManager);
    create<T>(typedIngredient: ITypedIngredient<T>): IngredientBookmark<T>;
  }


  interface BookmarkList extends IIngredientGridSource {}
  class BookmarkList extends IIngredientGridSource {
    constructor(recipeManager: IRecipeManager, focusFactory: IFocusFactory, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, bookmarkConfig: IBookmarkConfig, clientConfig: IClientConfig, guiHelper: IGuiHelper, codecHelper: ICodecHelper, bookmarkFactory: BookmarkFactory, bookmarkCodec: Codec<IBookmark>);
    add(value: IBookmark): boolean;
    addSourceListChangedListener(listener: SourceListChangedListener): void;
    contains(value: IBookmark): boolean;
    get elements(): IElement<any>[];
    getMatchingBookmark<R>(recipeType: RecipeType<R>, recipe: R): RecipeBookmark<R, any>;
    isEmpty(): boolean;
    moveBookmark(previousBookmark: IBookmark, newBookmark: IBookmark, offset: number): void;
    onElementBookmarked<T>(element: IElement<T>, input: UserInput, bookmarkOverlay: BookmarkOverlay): boolean;
    remove(ingredient: IBookmark): boolean;
    setFromConfigFile(bookmarks: IBookmark[]): void;
    toggleBookmark(bookmark: IBookmark): void;
  }


  interface BookmarkType extends Enum<BookmarkType> {}
  class BookmarkType extends Enum<BookmarkType> {
    static readonly INGREDIENT: BookmarkType;
    static readonly RECIPE: BookmarkType;
    static valueOf(name: string): BookmarkType;
    static values(): BookmarkType[];
  }


  class IBookmark {
    get element(): IElement<any>;
    get type(): BookmarkType;
    isVisible(): boolean;
    setVisible(var1: boolean): void;
  }


  interface IngredientBookmark<T = any> extends IBookmark {}
  class IngredientBookmark<T = any> extends IBookmark {
    equals(obj: any): boolean;
    get element(): IElement<any>;
    get ingredient(): ITypedIngredient<T>;
    get type(): BookmarkType;
    hashCode(): number;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    toString(): string;
  }


  interface RecipeBookmark<R = any, I = any> extends IBookmark {}
  class RecipeBookmark<R = any, I = any> extends IBookmark {
    constructor(recipeCategory: IRecipeCategory<R>, recipe: R, recipeUid: ResourceLocation, displayIngredient: ITypedIngredient<I>, displayIsOutput: boolean);
    static create<T>(recipeLayoutDrawable: IRecipeLayoutDrawable<T>, ingredientManager: IIngredientManager): RecipeBookmark<T, any>;
    equals(obj: any): boolean;
    get displayIngredient(): ITypedIngredient<I>;
    get element(): IElement<any>;
    get recipe(): R;
    get recipeCategory(): IRecipeCategory<R>;
    get type(): BookmarkType;
    hashCode(): number;
    isDisplayIsOutput(): boolean;
    isRecipe<T>(otherType: RecipeType<T>, otherRecipe: T): boolean;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    toString(): string;
  }

}

declare module 'mezz.jei.gui.config' {
  import { Path } from 'java.nio.file';
  import { IRecipeManager, IFocusFactory } from 'mezz.jei.api.recipe';
  import { IGuiHelper, ICodecHelper } from 'mezz.jei.api.helpers';
  import { IIngredientManager, IJeiKeyMapping } from 'mezz.jei.api.runtime';
  import { RegistryAccess } from 'net.minecraft.core';
  import { List, Optional } from 'java.util';
  import { IBookmark, BookmarkList, BookmarkFactory } from 'mezz.jei.gui.bookmarks';
  import { Codec } from 'com.mojang.serialization';
  import { MappedSortingConfig } from 'mezz.jei.common.config.sorting';
  import { IListElementInfo } from 'mezz.jei.gui.ingredients';
  import { IIngredientType } from 'mezz.jei.api.ingredients';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { Consumer } from 'java.util.function';
  import { KeyMapping } from 'net.minecraft.client';

  interface BookmarkJsonConfig extends IBookmarkConfig {}
  class BookmarkJsonConfig extends IBookmarkConfig {
    constructor(jeiConfigurationDir: Path);
    loadBookmarks(recipeManager: IRecipeManager, focusFactory: IFocusFactory, guiHelper: IGuiHelper, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, bookmarkList: BookmarkList, codecHelper: ICodecHelper, bookmarkCodec: Codec<IBookmark>, bookmarkFactory: BookmarkFactory): void;
    saveBookmarks(recipeManager: IRecipeManager, focusFactory: IFocusFactory, guiHelper: IGuiHelper, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, codecHelper: ICodecHelper, bookmarks: IBookmark[], bookmarkCodec: Codec<IBookmark>): boolean;
  }


  class IBookmarkConfig {
    loadBookmarks(var1: IRecipeManager, var2: IFocusFactory, var3: IGuiHelper, var4: IIngredientManager, var5: RegistryAccess, var6: BookmarkList, var7: ICodecHelper, var8: Codec<IBookmark>, var9: BookmarkFactory): void;
    saveBookmarks(var1: IRecipeManager, var2: IFocusFactory, var3: IGuiHelper, var4: IIngredientManager, var5: RegistryAccess, var6: ICodecHelper, var7: IBookmark[], var8: Codec<IBookmark>): boolean;
  }


  class ILookupHistoryConfig {
    load(var1: IRecipeManager, var2: IIngredientManager, var3: RegistryAccess, var4: ICodecHelper, var5: Codec<IBookmark>): IBookmark[];
    save(var1: IRecipeManager, var2: IIngredientManager, var3: RegistryAccess, var4: ICodecHelper, var5: IBookmark[], var6: Codec<IBookmark>): void;
  }


  interface IngredientTypeSortingConfig extends MappedSortingConfig<IListElementInfo, string> {}
  class IngredientTypeSortingConfig extends MappedSortingConfig<IListElementInfo, string> {
    constructor(path: Path);
    static getIngredientTypeString(info: IListElementInfo<any>): string;
    static getIngredientTypeString(ingredientType: IIngredientType<any>): string;
  }


  interface InternalKeyMappings extends IInternalKeyMappings {}
  class InternalKeyMappings extends IInternalKeyMappings {
    constructor(registerMethod: Consumer<KeyMapping>);
    get bookmark(): IJeiKeyMapping;
    get cheatItemStack(): IJeiKeyMapping;
    get cheatOneItem(): IJeiKeyMapping;
    get closeRecipeGui(): IJeiKeyMapping;
    get copyRecipeId(): IJeiKeyMapping;
    get enterKey(): IJeiKeyMapping;
    get escapeKey(): IJeiKeyMapping;
    get focusSearch(): IJeiKeyMapping;
    get hoveredClearSearchBar(): IJeiKeyMapping;
    get leftClick(): IJeiKeyMapping;
    get maxTransferRecipeBookmark(): IJeiKeyMapping;
    get nextCategory(): IJeiKeyMapping;
    get nextPage(): IJeiKeyMapping;
    get nextRecipePage(): IJeiKeyMapping;
    get nextSearch(): IJeiKeyMapping;
    get previousCategory(): IJeiKeyMapping;
    get previousPage(): IJeiKeyMapping;
    get previousRecipePage(): IJeiKeyMapping;
    get previousSearch(): IJeiKeyMapping;
    get recipeBack(): IJeiKeyMapping;
    get rightClick(): IJeiKeyMapping;
    get showRecipe(): IJeiKeyMapping;
    get showUses(): IJeiKeyMapping;
    get toggleBookmarkOverlay(): IJeiKeyMapping;
    get toggleCheatMode(): IJeiKeyMapping;
    get toggleCheatModeConfigButton(): IJeiKeyMapping;
    get toggleEditMode(): IJeiKeyMapping;
    get toggleHideIngredient(): IJeiKeyMapping;
    get toggleOverlay(): IJeiKeyMapping;
    get toggleWildcardHideIngredient(): IJeiKeyMapping;
    get transferRecipeBookmark(): IJeiKeyMapping;
  }


  class LegacyBookmarkConfig {
    constructor(jeiConfigurationDir: Path);
    static getPath(jeiConfigurationDir: Path): Optional<Path>;
    loadBookmarks(recipeManager: IRecipeManager, focusFactory: IFocusFactory, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, bookmarkFactory: BookmarkFactory): IBookmark[];
  }


  interface LookupHistoryJsonConfig extends ILookupHistoryConfig {}
  class LookupHistoryJsonConfig extends ILookupHistoryConfig {
    constructor(jeiConfigurationDir: Path);
    load(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, codecHelper: ICodecHelper, bookmarkCodec: Codec<IBookmark>): IBookmark[];
    save(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, codecHelper: ICodecHelper, bookmarks: IBookmark[], bookmarkCodec: Codec<IBookmark>): void;
  }


  interface ModNameSortingConfig extends MappedSortingConfig<IListElementInfo, string> {}
  class ModNameSortingConfig extends MappedSortingConfig<IListElementInfo, string> {
    constructor(path: Path);
  }

}

declare module 'mezz.jei.gui.config.file.serializers' {
  import { IRecipeManager, IFocusFactory } from 'mezz.jei.api.recipe';
  import { LegacyTypedIngredientSerializer } from 'mezz.jei.common.config.file.serializers';
  import { IDeserializeResult } from 'mezz.jei.api.runtime.config.IJeiConfigValueSerializer';
  import { RecipeBookmark } from 'mezz.jei.gui.bookmarks';

  class LegacyRecipeBookmarkSerializer {
    constructor(recipeManager: IRecipeManager, focusFactory: IFocusFactory, ingredientSerializer: LegacyTypedIngredientSerializer);
    deserialize(string: string): IDeserializeResult<RecipeBookmark<any, any>>;
  }

}

declare module 'mezz.jei.gui.elements' {
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IUserInputHandler } from 'mezz.jei.gui.input';
  import { Button } from 'net.minecraft.client.gui.components';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';

  class IconButton {
    constructor(controller: IIconButtonController);

    constructor(controller: IIconButtonController, area: ImmutableRect2i);
    createInputHandler(): IUserInputHandler;
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get area(): ImmutableRect2i;
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isVisible(): boolean;
    tick(): void;
    updateBounds(area: ImmutableRect2i): void;
  }


  interface InternalIconButton extends IButtonState, Button {}
  class InternalIconButton extends IButtonState {
    constructor();
    clicked(x: number, y: number): boolean;
    isValidClickButton(mouseButton: number): boolean;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setActive(value: boolean): void;
    setForcePressed(forcePressed: boolean): void;
    setHeight(value: number): void;
    setIcon(icon: IDrawable): void;
    setPressed(pressed: boolean): void;
    setVisible(value: boolean): void;
    updateBounds(area: ImmutableRect2i): void;
  }

}

declare module 'mezz.jei.gui.events' {
  import { IScreenHelper } from 'mezz.jei.api.runtime';
  import { BookmarkOverlay } from 'mezz.jei.gui.overlay.bookmarks';
  import { IngredientListOverlay } from 'mezz.jei.gui.overlay';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class GuiEventHandler {
    constructor(screenHelper: IScreenHelper, bookmarkOverlay: BookmarkOverlay, ingredientListOverlay: IngredientListOverlay);
    onDrawForeground(screen: AbstractContainerScreen<any>, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onDrawScreenPost(screen: Screen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    onGuiInit(screen: Screen): void;
    onGuiOpen(screen: Screen): void;
    renderCompactPotionIndicators(): boolean;
  }

}

declare module 'mezz.jei.gui.filter' {
  import { Listener } from 'mezz.jei.gui.filter.IFilterTextSource';

  interface FilterTextSource extends IFilterTextSource {}
  class FilterTextSource extends IFilterTextSource {
    addListener(listener: Listener): void;
    get filterText(): string;
    set filterText(filterText: string);
  }


  class IFilterTextSource {
    addListener(var1: Listener): void;
    get filterText(): string;
    set filterText(var1: string);
  }

}

declare module 'mezz.jei.gui.filter.IFilterTextSource' {
  class Listener {
    onChange(var1: string): void;
  }

}

declare module 'mezz.jei.gui.ghost' {
  import { List, Optional } from 'java.util';
  import { HandlerData } from 'mezz.jei.gui.ghost.GhostIngredientDrag';
  import { IIngredientRenderer, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { UserInput, IRecipeFocusSource, IDragHandler } from 'mezz.jei.gui.input';
  import { IScreenHelper, IIngredientManager } from 'mezz.jei.api.runtime';
  import { IClientToggleState } from 'mezz.jei.common.config';
  import { Minecraft } from 'net.minecraft.client';

  class GhostIngredientDrag<T = any> {
    constructor(handlersData: HandlerData<T>[], ingredientRenderer: IIngredientRenderer<T>, ingredient: ITypedIngredient<T>, mouseX: number, mouseY: number, origin: ImmutableRect2i);
    static canStart(drag: GhostIngredientDrag<any>, mouseX: number, mouseY: number): boolean;
    drawItem(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawTargets(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    static drawTargets(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, targetAreas: Rect2i[]): void;
    get ingredient(): ITypedIngredient<T>;
    get ingredientRenderer(): IIngredientRenderer<T>;
    get origin(): ImmutableRect2i;
    onClick(input: UserInput): boolean;
    stop(): void;
  }


  class GhostIngredientDragManager {
    constructor(source: IRecipeFocusSource, screenHelper: IScreenHelper, ingredientManager: IIngredientManager, toggleState: IClientToggleState);
    createDragHandler(): IDragHandler;
    drawOnForeground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    stopDrag(): void;
  }


  class GhostIngredientReturning<T = any> {
    static create<T>(ghostIngredientDrag: GhostIngredientDrag<T>, mouseX: number, mouseY: number): Optional<GhostIngredientReturning<T>>;
    drawItem(guiGraphics: GuiGraphics): void;
    isComplete(): boolean;
  }

}

declare module 'mezz.jei.gui.ingredients' {
  import { IIngredientHelper, ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { List, Set, Collection, Comparator } from 'java.util';
  import { IIngredientFilterConfig, IClientConfig, IClientToggleState, IngredientSortStage } from 'mezz.jei.common.config';
  import { IIngredientManager, IIngredientVisibility, IIngredientFilter } from 'mezz.jei.api.runtime';
  import { Stream } from 'java.util.stream';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Iterable, Integer } from 'java.lang';
  import { IIngredientGridSource } from 'mezz.jei.gui.overlay';
  import { IIngredientListener } from 'mezz.jei.api.runtime.IIngredientManager';
  import { IListener } from 'mezz.jei.api.runtime.IIngredientVisibility';
  import { IEditModeListener } from 'mezz.jei.common.config.IClientToggleState';
  import { IFilterTextSource } from 'mezz.jei.gui.filter';
  import { IModIdHelper, IColorHelper } from 'mezz.jei.api.helpers';
  import { IElement } from 'mezz.jei.gui.overlay.elements';
  import { SourceListChangedListener } from 'mezz.jei.gui.overlay.IIngredientGridSource';
  import { ModNameSortingConfig, IngredientTypeSortingConfig } from 'mezz.jei.gui.config';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';

  class DisplayNameUtil {
    static getLowercaseDisplayNameForSearch<T>(ingredient: T, ingredientHelper: IIngredientHelper<T>): string;
  }


  class GuiIngredientProperties {
    static getHeight(padding: number): number;
    static getWidth(padding: number): number;
  }


  class IListElement<V = any> {
    get createdIndex(): number;
    get sortedIndex(): number;
    get typedIngredient(): ITypedIngredient<V>;
    isVisible(): boolean;
    set sortedIndex(var1: number);
    setVisible(var1: boolean): void;
  }


  class IListElementInfo<V = any> {
    get createdIndex(): number;
    get element(): IListElement<V>;
    get modIds(): string[];
    get modNameForSorting(): string;
    get modNames(): string[];
    get names(): string[];
    get resourceLocation(): ResourceLocation;
    get typedIngredient(): ITypedIngredient<V>;
    getColors(var1: IIngredientManager): Iterable<number>;
    getCreativeTabsStrings(var1: IIngredientManager): Collection<string>;
    getTagIds(var1: IIngredientManager): Stream<ResourceLocation>;
    getTagStrings(var1: IIngredientManager): Collection<string>;
    getTooltipStrings(var1: IIngredientFilterConfig, var2: IIngredientManager): Set<string>;
  }


  interface IngredientFilter extends IIngredientGridSource, IIngredientListener, IListener, IEditModeListener {}
  class IngredientFilter extends IIngredientGridSource {
    constructor(filterTextSource: IFilterTextSource, clientConfig: IClientConfig, config: IIngredientFilterConfig, ingredientManager: IIngredientManager, ingredientComparator: Comparator<IListElement<any>>, ingredients: IListElementInfo<any>[], modIdHelper: IModIdHelper, ingredientVisibility: IIngredientVisibility, colorHelper: IColorHelper, clientToggleState: IClientToggleState);
    addIngredient<V>(info: IListElementInfo<V>): void;
    addSourceListChangedListener(listener: SourceListChangedListener): void;
    get elements(): IElement<any>[];
    getFilteredIngredients<T>(ingredientType: IIngredientType<T>): T[];
    invalidateCache(): void;
    onEditModeChanged(): void;
    onIngredientVisibilityChanged<V>(ingredient: ITypedIngredient<V>, visible: boolean): void;
    onIngredientsAdded<V>(ingredientHelper: IIngredientHelper<V>, ingredients: Collection<ITypedIngredient<V>>): void;
    onIngredientsRemoved<V>(ingredientHelper: IIngredientHelper<V>, ingredients: Collection<ITypedIngredient<V>>): void;
    rebuildItemFilter(): void;
    updateHidden(): void;
  }


  interface IngredientFilterApi extends IIngredientFilter {}
  class IngredientFilterApi extends IIngredientFilter {
    constructor(ingredientFilter: IngredientFilter, filterTextSource: IFilterTextSource);
    get filterText(): string;
    getFilteredIngredients<T>(ingredientType: IIngredientType<T>): T[];
    set filterText(filterText: string);
  }


  class IngredientListElementFactory {
    static createBaseList(ingredientManager: IIngredientManager, modIdHelper: IModIdHelper): IListElementInfo<any>[];
    static createTestList<V>(ingredientManager: IIngredientManager, ingredientType: IIngredientType<V>, ingredients: Collection<V>, modIdHelper: IModIdHelper): IListElementInfo<V>[];
    static rebuildList(ingredientManager: IIngredientManager, elements: Collection<IListElement<any>>, modIdHelper: IModIdHelper): IListElementInfo<any>[];
  }


  class IngredientSorter {
    static sortIngredients(clientConfig: IClientConfig, modNameSortingConfig: ModNameSortingConfig, ingredientTypeSortingConfig: IngredientTypeSortingConfig, ingredientManager: IIngredientManager, ingredients: IListElementInfo<any>[]): Comparator<IListElement<any>>;
  }


  class IngredientSorterComparators {
    constructor(ingredientManager: IIngredientManager, modNameSortingConfig: ModNameSortingConfig, ingredientTypeSortingConfig: IngredientTypeSortingConfig, modNames: Set<string>);
    get default(): Comparator<IListElementInfo<any>>;
    getComparator(ingredientSorterStages: IngredientSortStage[]): Comparator<IListElementInfo<any>>;
    getComparator(ingredientSortStage: IngredientSortStage): Comparator<IListElementInfo<any>>;
    static getItemStack<V>(ingredientInfo: IListElementInfo<V>): ItemStack;
  }


  interface ListElement<V = any> extends IListElement<V> {}
  class ListElement<V = any> extends IListElement<V> {
    constructor(ingredient: ITypedIngredient<V>, createdIndex: number);
    get createdIndex(): number;
    get sortedIndex(): number;
    get typedIngredient(): ITypedIngredient<V>;
    isVisible(): boolean;
    set sortedIndex(sortIndex: number);
    setVisible(visible: boolean): void;
  }


  interface ListElementInfo<V = any> extends IListElementInfo<V> {}
  class ListElementInfo<V = any> extends IListElementInfo<V> {
    static create<V>(value: ITypedIngredient<V>, ingredientManager: IIngredientManager, modIdHelper: IModIdHelper): IListElementInfo<V>;
    static createFromElement<V>(element: IListElement<V>, ingredientManager: IIngredientManager, modIdHelper: IModIdHelper): IListElementInfo<V>;
    get createdIndex(): number;
    get element(): IListElement<V>;
    get modIds(): string[];
    get modNameForSorting(): string;
    get modNames(): string[];
    get names(): string[];
    get resourceLocation(): ResourceLocation;
    get typedIngredient(): ITypedIngredient<V>;
    getColors(ingredientManager: IIngredientManager): Iterable<number>;
    getCreativeTabsStrings(ingredientManager: IIngredientManager): Collection<string>;
    static getStrings(tooltip: Component[]): Set<string>;
    getTagIds(ingredientManager: IIngredientManager): Stream<ResourceLocation>;
    getTagStrings(ingredientManager: IIngredientManager): Collection<string>;
    getTooltipStrings(config: IIngredientFilterConfig, ingredientManager: IIngredientManager): Set<string>;
  }

}

declare module 'mezz.jei.gui.input' {
  import { IElement } from 'mezz.jei.gui.overlay.elements';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientManager, IScreenHelper, IJeiKeyMapping } from 'mezz.jei.api.runtime';
  import { List, Optional } from 'java.util';
  import { UserInputRouter, DragRouter } from 'mezz.jei.gui.input.handlers';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Stream } from 'java.util.stream';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { BooleanSupplier } from 'java.util.function';
  import { Direction } from 'mezz.jei.core.util.TextHistory';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { MouseClickable, KeyPressable } from 'mezz.jei.gui.input.UserInput';

  interface ClickableIngredientInternal<V = any> extends IClickableIngredientInternal<V> {}
  class ClickableIngredientInternal<V = any> extends IClickableIngredientInternal<V> {
    constructor(element: IElement<V>, mouseOverable: IMouseOverable, allowsCheating: boolean, canClickToFocus: boolean);
    canClickToFocus(): boolean;
    get element(): IElement<V>;
    get typedIngredient(): ITypedIngredient<V>;
    getCheatItemStack(ingredientManager: IIngredientManager): ItemStack;
    isMouseOver(mouseX: number, mouseY: number): boolean;
  }


  class ClientInputHandler {
    constructor(charTypedHandlers: ICharTypedHandler[], inputRouter: UserInputRouter, dragRouter: DragRouter, keybindings: IInternalKeyMappings, screenHelper: IScreenHelper);
    onGuiMouseClicked(screen: Screen, input: UserInput): boolean;
    onGuiMouseReleased(screen: Screen, input: UserInput): boolean;
    onGuiMouseScroll(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    onInitGui(): void;
    onKeyboardCharTypedPost(screen: Screen, codePoint: string, modifiers: number): void;
    onKeyboardCharTypedPre(screen: Screen, codePoint: string, modifiers: number): boolean;
    onKeyboardKeyPressedPost(screen: Screen, input: UserInput): boolean;
    onKeyboardKeyPressedPre(screen: Screen, input: UserInput): boolean;
  }


  class CombinedRecipeFocusSource {
    constructor(...handlers: IRecipeFocusSource[]);
    getIngredientUnderMouse(input: UserInput, keyBindings: IInternalKeyMappings): Stream<IClickableIngredientInternal<any>>;
  }


  interface DraggableIngredientInternal<V = any> extends IDraggableIngredientInternal<V> {}
  class DraggableIngredientInternal<V = any> extends IDraggableIngredientInternal<V> {
    constructor(element: IElement<V>, area: ImmutableRect2i);
    get area(): ImmutableRect2i;
    get element(): IElement<V>;
    get typedIngredient(): ITypedIngredient<V>;
  }


  interface GuiContainerWrapper extends IRecipeFocusSource {}
  class GuiContainerWrapper extends IRecipeFocusSource {
    constructor(screenHelper: IScreenHelper);
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
  }


  interface GuiTextFieldFilter extends EditBox {}
  class GuiTextFieldFilter extends EditBox {
    constructor(filterEmpty: BooleanSupplier);
    createInputHandler(): IUserInputHandler;
    getHistory(direction: Direction): Optional<string>;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setFocused(keyboardFocus: boolean): void;
    setValue(filterText: string): void;
    updateBounds(area: ImmutableRect2i): void;
  }


  class ICharTypedHandler {
    hasKeyboardFocus(): boolean;
    onCharTyped(var1: string, var2: number): boolean;
  }


  class IClickableIngredientInternal<T = any> {
    canClickToFocus(): boolean;
    get element(): IElement<T>;
    get typedIngredient(): ITypedIngredient<T>;
    getCheatItemStack(var1: IIngredientManager): ItemStack;
    isMouseOver(var1: number, var3: number): boolean;
  }


  class IDraggableIngredientInternal<T = any> {
    get area(): ImmutableRect2i;
    get element(): IElement<T>;
    get typedIngredient(): ITypedIngredient<T>;
  }


  class IDragHandler {
    handleDragCanceled(): void;
    handleDragComplete(var1: Screen, var2: UserInput): boolean;
    handleDragStart(var1: Screen, var2: UserInput): Optional<IDragHandler>;
  }


  class IMouseOverable {
    isMouseOver(var1: number, var3: number): boolean;
  }


  interface InputType extends Enum<InputType> {}
  class InputType extends Enum<InputType> {
    static readonly SIMULATE: InputType;
    static readonly EXECUTE: InputType;
    static readonly IMMEDIATE: InputType;
    static valueOf(name: string): InputType;
    static values(): InputType[];
  }


  class IPaged {
    get pageCount(): number;
    get pageNumber(): number;
    hasNext(): boolean;
    hasPrevious(): boolean;
    nextPage(): boolean;
    previousPage(): boolean;
  }


  class IRecipeFocusSource {
    getDraggableIngredientUnderMouse(var1: number, var3: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(var1: number, var3: number): Stream<IClickableIngredientInternal<any>>;
  }


  class IUserInputHandler {
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): Optional<IUserInputHandler>;
    handleUserInput(var1: Screen, var2: UserInput, var3: IInternalKeyMappings): Optional<IUserInputHandler>;
    unfocus(): void;
  }


  class MouseUtil {
    static get x(): number;
    static get y(): number;
  }


  interface UserInput extends IJeiUserInput {}
  class UserInput extends IJeiUserInput {
    constructor(key: Key, mouseX: number, mouseY: number, modifiers: number, inputType: InputType);
    callVanilla(mouseOverable: IMouseOverable, mouseClickable: MouseClickable): boolean;
    callVanilla(keyPressable: KeyPressable): boolean;
    callVanilla(mouseOverable: IMouseOverable, mouseClickable: MouseClickable, keyPressable: KeyPressable): boolean;
    static fromVanilla(keyCode: number, scanCode: number, modifiers: number, inputType: InputType): UserInput;
    static fromVanilla(mouseX: number, mouseY: number, mouseButton: number, inputType: InputType): Optional<UserInput>;
    get inputType(): InputType;
    get key(): Key;
    get modifiers(): number;
    get mouseX(): number;
    get mouseY(): number;
    is(keyMapping: IJeiKeyMapping): boolean;
    is(keyMapping: KeyMapping): boolean;
    isAllowedChatCharacter(): boolean;
    isSimulate(): boolean;
    toString(): string;
  }

}

declare module 'mezz.jei.gui.input.focus' {
  import { EditBox } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface EditBoxFocusHandler extends IFocusHandler {}
  class EditBoxFocusHandler extends IFocusHandler {
    constructor(editBox: EditBox);
    focus(): void;
    unFocus(): void;
  }


  interface GuiEventListenerFocusHandler extends IFocusHandler {}
  class GuiEventListenerFocusHandler extends IFocusHandler {
    static create(guiEventListener: GuiEventListener): IFocusHandler;
    focus(): void;
    unFocus(): void;
  }


  class IFocusHandler {
    focus(): void;
    unFocus(): void;
  }


  interface ScreenFocusHandler extends IFocusHandler {}
  class ScreenFocusHandler extends IFocusHandler {
    constructor(screen: Screen, focusedElement: IFocusHandler, storedInScreenFocus: GuiEventListener);
    static create(screen: Screen): ScreenFocusHandler;
    focus(): void;
    unFocus(): void;
  }

}

declare module 'mezz.jei.gui.input.handlers' {
  import { IUserInputHandler, CombinedRecipeFocusSource, UserInput, IDragHandler, IMouseOverable, GuiTextFieldFilter } from 'mezz.jei.gui.input';
  import { BookmarkList } from 'mezz.jei.gui.bookmarks';
  import { BookmarkOverlay } from 'mezz.jei.gui.overlay.bookmarks';
  import { Optional } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { IIngredientGrid } from 'mezz.jei.gui.overlay';
  import { IClientToggleState, IClientConfig } from 'mezz.jei.common.config';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { IIngredientManager, IEditModeConfig, IRecipesGui, IScreenHelper } from 'mezz.jei.api.runtime';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Minecraft } from 'net.minecraft.client';
  import { FocusUtil } from 'mezz.jei.gui.util';
  import { IFocusFactory } from 'mezz.jei.api.recipe';
  import { Supplier } from 'java.util.function';

  interface BookmarkInputHandler extends IUserInputHandler {}
  class BookmarkInputHandler extends IUserInputHandler {
    constructor(focusSource: CombinedRecipeFocusSource, bookmarkList: BookmarkList, bookmarkOverlay: BookmarkOverlay);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface CombinedDragHandler extends IDragHandler {}
  class CombinedDragHandler extends IDragHandler {
    constructor(...dragHandlers: IDragHandler[]);
    handleDragCanceled(): void;
    handleDragComplete(screen: Screen, input: UserInput): boolean;
    handleDragStart(screen: Screen, input: UserInput): Optional<IDragHandler>;
  }


  interface DeleteItemInputHandler extends IUserInputHandler {}
  class DeleteItemInputHandler extends IUserInputHandler {
    constructor(ingredientGrid: IIngredientGrid, toggleState: IClientToggleState, clientConfig: IClientConfig, serverConnection: IConnectionToServer, ingredientManager: IIngredientManager);
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    handleUserInput(screen: Screen, userInput: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
    shouldDeleteItemOnClick(minecraft: Minecraft, mouseX: number, mouseY: number): boolean;
  }


  class DragRouter {
    constructor(...handlers: IDragHandler[]);
    cancelDrag(): void;
    completeDrag(screen: Screen, input: UserInput): boolean;
    handleGuiChange(): void;
    startDrag(screen: Screen, input: UserInput): boolean;
  }


  interface EditInputHandler extends IUserInputHandler {}
  class EditInputHandler extends IUserInputHandler {
    constructor(focusSource: CombinedRecipeFocusSource, toggleState: IClientToggleState, editModeConfig: IEditModeConfig);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface FocusInputHandler extends IUserInputHandler {}
  class FocusInputHandler extends IUserInputHandler {
    constructor(focusSource: CombinedRecipeFocusSource, recipesGui: IRecipesGui, focusUtil: FocusUtil, clientConfig: IClientConfig, ingredientManager: IIngredientManager, toggleState: IClientToggleState, serverConnection: IConnectionToServer);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface GlobalInputHandler extends IUserInputHandler {}
  class GlobalInputHandler extends IUserInputHandler {
    constructor(toggleState: IClientToggleState);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface GuiAreaInputHandler extends IUserInputHandler {}
  class GuiAreaInputHandler extends IUserInputHandler {
    constructor(screenHelper: IScreenHelper, recipesGui: IRecipesGui, focusFactory: IFocusFactory);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface NullDragHandler extends IDragHandler {}
  class NullDragHandler extends IDragHandler {
    static readonly INSTANCE: NullDragHandler;
    handleDragComplete(screen: Screen, input: UserInput): boolean;
    handleDragStart(screen: Screen, input: UserInput): Optional<IDragHandler>;
  }


  interface NullInputHandler extends IUserInputHandler {}
  class NullInputHandler extends IUserInputHandler {
    static readonly INSTANCE: NullInputHandler;
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
  }


  interface ProxyDragHandler extends IDragHandler {}
  class ProxyDragHandler extends IDragHandler {
    constructor(source: Supplier<IDragHandler>);
    handleDragCanceled(): void;
    handleDragComplete(screen: Screen, input: UserInput): boolean;
    handleDragStart(screen: Screen, input: UserInput): Optional<IDragHandler>;
  }


  interface ProxyInputHandler extends IUserInputHandler {}
  class ProxyInputHandler extends IUserInputHandler {
    constructor(source: Supplier<IUserInputHandler>);
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): Optional<IUserInputHandler>;
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
    toString(): string;
    unfocus(): void;
  }


  interface SameElementInputHandler extends IUserInputHandler {}
  class SameElementInputHandler extends IUserInputHandler {
    constructor(handler: IUserInputHandler, mouseOverable: IMouseOverable);
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): Optional<IUserInputHandler>;
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
    unfocus(): void;
  }


  interface TextFieldInputHandler extends IUserInputHandler {}
  class TextFieldInputHandler extends IUserInputHandler {
    constructor(textFieldFilter: GuiTextFieldFilter);
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
    unfocus(): void;
  }


  class UserInputRouter {
    constructor(debugName: string, ...inputHandlers: IUserInputHandler[]);
    handleGuiChange(): void;
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): boolean;
    toString(): string;
  }

}

declare module 'mezz.jei.gui.input.UserInput' {
  class MouseClickable {
    mouseClicked(var1: number, var3: number, var5: number): boolean;
  }


  class KeyPressable {
    keyPressed(var1: number, var2: number, var3: number): boolean;
  }

}

declare module 'mezz.jei.gui.overlay.bookmarks' {
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { BookmarkList, IBookmark } from 'mezz.jei.gui.bookmarks';
  import { IClientToggleState, IClientConfig } from 'mezz.jei.common.config';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { List, Optional } from 'java.util';
  import { IIngredientRenderer, ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { UserInput, IDragHandler, IRecipeFocusSource, IClickableIngredientInternal, IDraggableIngredientInternal, IUserInputHandler } from 'mezz.jei.gui.input';
  import { IBookmarkOverlay, IScreenHelper } from 'mezz.jei.api.runtime';
  import { IngredientGridWithNavigation } from 'mezz.jei.gui.overlay';
  import { LookupHistoryOverlay } from 'mezz.jei.gui.overlay.bookmarks.history';
  import { Updater } from 'mezz.jei.gui.overlay.ScreenPropertiesCache';
  import { Minecraft } from 'net.minecraft.client';
  import { Stream } from 'java.util.stream';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';

  interface BookmarkButtonController extends IIconButtonController {}
  class BookmarkButtonController extends IIconButtonController {
    constructor(bookmarkOverlay: BookmarkOverlay, bookmarkList: BookmarkList, toggleState: IClientToggleState, keyBindings: IInternalKeyMappings);
    getTooltips(tooltip: ITooltipBuilder): void;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }


  class BookmarkDrag<T = any> {
    constructor(bookmarkOverlay: BookmarkOverlay, targets: IBookmarkDragTarget[], ingredientRenderer: IIngredientRenderer<T>, ingredient: ITypedIngredient<T>, bookmark: IBookmark, mouseX: number, mouseY: number, origin: ImmutableRect2i);
    static canStart(drag: BookmarkDrag<any>, mouseX: number, mouseY: number): boolean;
    drawItem(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): boolean;
    onClick(input: UserInput): boolean;
    stop(): void;
    update(mouseX: number, mouseY: number): void;
  }


  class BookmarkDragManager {
    constructor(bookmarkOverlay: BookmarkOverlay);
    createDragHandler(): IDragHandler;
    drawDraggedItem(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): boolean;
    stopDrag(): void;
    updateDrag(mouseX: number, mouseY: number): void;
  }


  interface BookmarkOverlay extends IRecipeFocusSource, IBookmarkOverlay {}
  class BookmarkOverlay extends IRecipeFocusSource {
    constructor(bookmarkList: BookmarkList, contents: IngredientGridWithNavigation, lookupHistoryOverlay: LookupHistoryOverlay, toggleState: IClientToggleState, clientConfig: IClientConfig, screenHelper: IScreenHelper, keyBindings: IInternalKeyMappings);
    createBookmarkDragTargets(): IBookmarkDragTarget[];
    createDragHandler(): IDragHandler;
    createInputHandler(): IUserInputHandler;
    drawOnForeground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawScreen(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    get screenPropertiesUpdater(): Updater;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): T;
    hasRoom(): boolean;
    isListDisplayed(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
  }


  class IBookmarkDragTarget {
    accept(var1: IBookmark): void;
    get area(): ImmutableRect2i;
  }


  interface PreviewTooltipComponent<R = any> extends ClientTooltipComponent, TooltipComponent {}
  class PreviewTooltipComponent<R = any> extends ClientTooltipComponent {
    constructor(drawable: IRecipeLayoutDrawable<R>);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, x: number, y: number, guiGraphics: GuiGraphics): void;
  }

}

declare module 'mezz.jei.gui.overlay.bookmarks.BookmarkOverlay' {
  import { IBookmarkDragTarget } from 'mezz.jei.gui.overlay.bookmarks';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { IBookmark, BookmarkList } from 'mezz.jei.gui.bookmarks';
  import { Runnable } from 'java.lang';

  interface DragTarget extends IBookmarkDragTarget {}
  class DragTarget extends IBookmarkDragTarget {
    constructor(area: ImmutableRect2i, bookmark: IBookmark, bookmarkList: BookmarkList, offset: number);
    accept(bookmark: IBookmark): void;
    get area(): ImmutableRect2i;
  }


  interface ActionDragTarget extends DragTarget {}
  class ActionDragTarget extends DragTarget {
    constructor(area: ImmutableRect2i, bookmark: IBookmark, bookmarkList: BookmarkList, offset: number, action: Runnable);
    accept(bookmark: IBookmark): void;
  }

}

declare module 'mezz.jei.gui.overlay.bookmarks.history' {
  import { IIngredientGridSource } from 'mezz.jei.gui.overlay';
  import { IRecipeManager } from 'mezz.jei.api.recipe';
  import { IIngredientManager, IScreenHelper } from 'mezz.jei.api.runtime';
  import { RegistryAccess } from 'net.minecraft.core';
  import { ICodecHelper, IColorHelper } from 'mezz.jei.api.helpers';
  import { Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { ILookupHistoryConfig } from 'mezz.jei.gui.config';
  import { Codec } from 'com.mojang.serialization';
  import { IBookmark } from 'mezz.jei.gui.bookmarks';
  import { List, Set } from 'java.util';
  import { IElement } from 'mezz.jei.gui.overlay.elements';
  import { SourceListChangedListener } from 'mezz.jei.gui.overlay.IIngredientGridSource';
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { IClientConfig, IIngredientGridConfig, IIngredientFilterConfig, HistoryDisplaySide, IClientToggleState } from 'mezz.jei.common.config';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { IRecipeFocusSource, IClickableIngredientInternal, IDraggableIngredientInternal, IDragHandler } from 'mezz.jei.gui.input';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { ImmutableRect2i, ImmutablePoint2i } from 'mezz.jei.common.util';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Stream } from 'java.util.stream';

  interface LookupHistory extends IIngredientGridSource {}
  class LookupHistory extends IIngredientGridSource {
    constructor(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, registryAccess: RegistryAccess, codecHelper: ICodecHelper, maxElements: Supplier<number>, lookupHistoryConfig: ILookupHistoryConfig, bookmarkCodec: Codec<IBookmark>);
    add(element: IBookmark): void;
    addSourceListChangedListener(listener: SourceListChangedListener): void;
    get elements(): IElement<any>[];
  }


  interface LookupHistoryButtonController extends IIconButtonController {}
  class LookupHistoryButtonController extends IIconButtonController {
    constructor(clientConfig: IClientConfig);
    getTooltips(tooltip: ITooltipBuilder): void;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }


  interface LookupHistoryOverlay extends IRecipeFocusSource {}
  class LookupHistoryOverlay extends IRecipeFocusSource {
    static readonly SLOT_HEIGHT: number;
    constructor(ingredientManager: IIngredientManager, lookupHistory: IIngredientGridSource, keyMappings: IInternalKeyMappings, historyListConfig: IIngredientGridConfig, ingredientFilterConfig: IIngredientFilterConfig, clientConfig: IClientConfig, ownerDisplaySide: HistoryDisplaySide, toggleState: IClientToggleState, screenHelper: IScreenHelper, serverConnection: IConnectionToServer, colorHelper: IColorHelper);
    close(): void;
    createDragHandler(): IDragHandler;
    draw(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawOnForeground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get area(): ImmutableRect2i;
    get lookupHistory(): IIngredientGridSource;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    isListDisplayed(): boolean;
    isOnSide(): boolean;
    updateBounds(availableArea: ImmutableRect2i, guiExclusionAreas: Set<ImmutableRect2i>, mouseExclusionPoint: ImmutablePoint2i): void;
    updateLayout(): void;
  }

}

declare module 'mezz.jei.gui.overlay' {
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { BooleanSupplier } from 'java.util.function';
  import { IClientToggleState, IIngredientGridConfig, IIngredientFilterConfig, IClientConfig } from 'mezz.jei.common.config';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { IRecipeFocusSource, IUserInputHandler, IClickableIngredientInternal, IDraggableIngredientInternal, IPaged, IDragHandler, ICharTypedHandler } from 'mezz.jei.gui.input';
  import { List, Set, Optional } from 'java.util';
  import { IElement } from 'mezz.jei.gui.overlay.elements';
  import { SourceListChangedListener } from 'mezz.jei.gui.overlay.IIngredientGridSource';
  import { IIngredientManager, IScreenHelper, IIngredientListOverlay } from 'mezz.jei.api.runtime';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { IColorHelper } from 'mezz.jei.api.helpers';
  import { ImmutableRect2i, ImmutablePoint2i, ImmutableSize2i } from 'mezz.jei.common.util';
  import { SlotInfo } from 'mezz.jei.gui.overlay.IngredientGrid';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Stream } from 'java.util.stream';
  import { IIngredientType, ITypedIngredient, IIngredientRenderer, IIngredientHelper } from 'mezz.jei.api.ingredients';
  import { JeiTooltip } from 'mezz.jei.common.gui';
  import { DrawableNineSliceTexture } from 'mezz.jei.common.gui.elements';
  import { IFilterTextSource } from 'mezz.jei.gui.filter';
  import { LookupHistoryOverlay } from 'mezz.jei.gui.overlay.bookmarks.history';
  import { Updater } from 'mezz.jei.gui.overlay.ScreenPropertiesCache';
  import { Runnable } from 'java.lang';
  import { IGuiProperties } from 'mezz.jei.api.gui.handlers';

  interface ConfigButtonController extends IIconButtonController {}
  class ConfigButtonController extends IIconButtonController {
    constructor(isListDisplayed: BooleanSupplier, toggleState: IClientToggleState, keyBindings: IInternalKeyMappings);
    getTooltips(tooltip: ITooltipBuilder): void;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }


  interface IIngredientGrid extends IRecipeFocusSource {}
  class IIngredientGrid extends IRecipeFocusSource {
    isMouseOver(var1: number, var3: number): boolean;
  }


  class IIngredientGridSource {
    addSourceListChangedListener(var1: SourceListChangedListener): void;
    get elements(): IElement<any>[];
  }


  interface IngredientGrid extends IRecipeFocusSource, IIngredientGrid {}
  class IngredientGrid extends IRecipeFocusSource {
    static readonly INGREDIENT_WIDTH: number;
    static readonly INGREDIENT_HEIGHT: number;
    constructor(ingredientManager: IIngredientManager, gridConfig: IIngredientGridConfig, ingredientFilterConfig: IIngredientFilterConfig, clientConfig: IClientConfig, toggleState: IClientToggleState, serverConnection: IConnectionToServer, keyBindings: IInternalKeyMappings, colorHelper: IColorHelper, searchable: boolean);
    static calculateBlockedSlotPercentage(config: IIngredientGridConfig, availableArea: ImmutableRect2i, exclusionAreas: Set<ImmutableRect2i>): SlotInfo;
    static calculateBounds(config: IIngredientGridConfig, availableArea: ImmutableRect2i): ImmutableRect2i;
    static calculateSize(config: IIngredientGridConfig, availableArea: ImmutableRect2i): ImmutableSize2i;
    draw(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    static drawHighlight(guiGraphics: GuiGraphics, area: ImmutableRect2i): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get area(): ImmutableRect2i;
    get inputHandler(): IUserInputHandler;
    get slots(): Stream<IngredientListSlot>;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    getVisibleIngredients<T>(ingredientType: IIngredientType<T>): Stream<T>;
    hasRoom(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    set(firstItemIndex: number, ingredientList: IElement<any>[]): void;
    size(): number;
    updateBounds(availableArea: ImmutableRect2i, guiExclusionAreas: Set<ImmutableRect2i>, mouseExclusionPoint: ImmutablePoint2i): void;
  }


  class IngredientGridTooltipHelper {
    constructor(ingredientManager: IIngredientManager, ingredientFilterConfig: IIngredientFilterConfig, toggleState: IClientToggleState, keyBindings: IInternalKeyMappings, colorHelper: IColorHelper);
    getIngredientTooltip<T>(tooltip: JeiTooltip, typedIngredient: ITypedIngredient<T>, ingredientRenderer: IIngredientRenderer<T>, ingredientHelper: IIngredientHelper<T>): void;
  }


  interface IngredientGridWithNavigation extends IRecipeFocusSource {}
  class IngredientGridWithNavigation extends IRecipeFocusSource {
    constructor(debugName: string, ingredientSource: IIngredientGridSource, ingredientGrid: IngredientGrid, toggleState: IClientToggleState, clientConfig: IClientConfig, serverConnection: IConnectionToServer, gridConfig: IIngredientGridConfig, background: DrawableNineSliceTexture, slotBackground: DrawableNineSliceTexture, screenHelper: IScreenHelper, ingredientManager: IIngredientManager);
    close(): void;
    createDragHandler(): IDragHandler;
    createInputHandler(): IUserInputHandler;
    draw(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawOnForeground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get backButtonArea(): ImmutableRect2i;
    get backgroundArea(): ImmutableRect2i;
    get nextPageButtonArea(): ImmutableRect2i;
    get pageDelegate(): IPaged;
    get slotBackgroundArea(): ImmutableRect2i;
    get slots(): Stream<IngredientListSlot>;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    getVisibleIngredients<T>(ingredientType: IIngredientType<T>): Stream<T>;
    hasRoom(): boolean;
    isEmpty(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    size(): number;
    updateBounds(availableArea: ImmutableRect2i, guiExclusionAreas: Set<ImmutableRect2i>, mouseExclusionPoint: ImmutablePoint2i): void;
    updateLayout(resetToFirstPage: boolean): void;
  }


  interface IngredientListOverlay extends IIngredientListOverlay, IRecipeFocusSource, ICharTypedHandler {}
  class IngredientListOverlay extends IIngredientListOverlay {
    constructor(ingredientGridSource: IIngredientGridSource, filterTextSource: IFilterTextSource, screenHelper: IScreenHelper, contents: IngredientGridWithNavigation, lookupHistoryOverlay: LookupHistoryOverlay, clientConfig: IClientConfig, toggleState: IClientToggleState, keyBindings: IInternalKeyMappings);
    createDragHandler(): IDragHandler;
    createInputHandler(): IUserInputHandler;
    drawOnForeground(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawScreen(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    get screenPropertiesUpdater(): Updater;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): T;
    getVisibleIngredients<T>(ingredientType: IIngredientType<T>): T[];
    hasKeyboardFocus(): boolean;
    isListDisplayed(): boolean;
    onCharTyped(codePoint: string, modifiers: number): boolean;
  }


  class IngredientListRenderer {
    constructor(ingredientManager: IIngredientManager, searchable: boolean);
    add(ingredientListSlot: IngredientListSlot): void;
    clear(): void;
    get slots(): Stream<IngredientListSlot>;
    render(guiGraphics: GuiGraphics): void;
    set(startIndex: number, ingredientList: IElement<any>[]): void;
    size(): number;
  }


  class IngredientListSlot {
    constructor(xPosition: number, yPosition: number, width: number, height: number, padding: number);
    clear(): void;
    get area(): ImmutableRect2i;
    get clickableIngredient(): Optional<IClickableIngredientInternal<any>>;
    get draggableIngredient(): Optional<IDraggableIngredientInternal<any>>;
    get element(): IElement<any>;
    get optionalElement(): Optional<IElement<any>>;
    get padding(): number;
    get renderArea(): ImmutableRect2i;
    isBlocked(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    set element(element: IElement<any>);
    setBlocked(blocked: boolean): void;
  }


  class ScreenPropertiesCache {
    constructor(screenHelper: IScreenHelper);
    get guiExclusionAreas(): Set<ImmutableRect2i>;
    get guiProperties(): Optional<IGuiProperties>;
    get mouseExclusionArea(): ImmutablePoint2i;
    getUpdater(onChange: Runnable): Updater;
    hasValidScreen(): boolean;
  }

}

declare module 'mezz.jei.gui.overlay.elements' {
  import { ITypedIngredient, IIngredientRenderer, IIngredientHelper } from 'mezz.jei.api.ingredients';
  import { Optional, List } from 'java.util';
  import { IBookmark, IngredientBookmark, RecipeBookmark } from 'mezz.jei.gui.bookmarks';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipesGui } from 'mezz.jei.api.runtime';
  import { FocusUtil } from 'mezz.jei.gui.util';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { JeiTooltip } from 'mezz.jei.common.gui';
  import { IngredientGridTooltipHelper } from 'mezz.jei.gui.overlay';
  import { UserInput } from 'mezz.jei.gui.input';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';

  class IElement<T = any> {
    createRenderOverlay(): IDrawable;
    get bookmark(): Optional<IBookmark>;
    get typedIngredient(): ITypedIngredient<T>;
    getTooltip(var1: JeiTooltip, var2: IngredientGridTooltipHelper, var3: IIngredientRenderer<T>, var4: IIngredientHelper<T>): void;
    handleClick(input: UserInput, keyBindings: IInternalKeyMappings): boolean;
    isVisible(): boolean;
    show(var1: IRecipesGui, var2: FocusUtil, var3: RecipeIngredientRole[]): void;
  }


  interface IngredientBookmarkElement<T = any> extends IElement<T> {}
  class IngredientBookmarkElement<T = any> extends IElement<T> {
    constructor(bookmark: IngredientBookmark<T>);
    createRenderOverlay(): IDrawable;
    get bookmark(): Optional<IBookmark>;
    get typedIngredient(): ITypedIngredient<T>;
    getTooltip(tooltip: JeiTooltip, tooltipHelper: IngredientGridTooltipHelper, ingredientRenderer: IIngredientRenderer<T>, ingredientHelper: IIngredientHelper<T>): void;
    isVisible(): boolean;
    show(recipesGui: IRecipesGui, focusUtil: FocusUtil, roles: RecipeIngredientRole[]): void;
  }


  interface IngredientElement<T = any> extends IElement<T> {}
  class IngredientElement<T = any> extends IElement<T> {
    constructor(ingredient: ITypedIngredient<T>);
    createRenderOverlay(): IDrawable;
    get bookmark(): Optional<IBookmark>;
    get typedIngredient(): ITypedIngredient<T>;
    getTooltip(tooltip: JeiTooltip, tooltipHelper: IngredientGridTooltipHelper, ingredientRenderer: IIngredientRenderer<T>, ingredientHelper: IIngredientHelper<T>): void;
    isVisible(): boolean;
    show(recipesGui: IRecipesGui, focusUtil: FocusUtil, roles: RecipeIngredientRole[]): void;
  }


  interface RecipeBookmarkElement<R = any, I = any> extends IElement<I> {}
  class RecipeBookmarkElement<R = any, I = any> extends IElement<I> {
    constructor(recipeBookmark: RecipeBookmark<R, I>);
    createRenderOverlay(): IDrawable;
    get bookmark(): Optional<IBookmark>;
    get typedIngredient(): ITypedIngredient<I>;
    getTooltip(tooltip: JeiTooltip, tooltipHelper: IngredientGridTooltipHelper, ingredientRenderer: IIngredientRenderer<I>, ingredientHelper: IIngredientHelper<I>): void;
    handleClick(input: UserInput, keyBindings: IInternalKeyMappings): boolean;
    isVisible(): boolean;
    show(recipesGui: IRecipesGui, focusUtil: FocusUtil, roles: RecipeIngredientRole[]): void;
  }

}

declare module 'mezz.jei.gui.overlay.IIngredientGridSource' {
  class SourceListChangedListener {
    onSourceListChanged(): void;
  }

}

declare module 'mezz.jei.gui.overlay.ScreenPropertiesCache' {
  import { ScreenPropertiesCache } from 'mezz.jei.gui.overlay';
  import { Runnable } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Set } from 'java.util';
  import { ImmutableRect2i, ImmutablePoint2i } from 'mezz.jei.common.util';

  class Updater {
    constructor(cache: ScreenPropertiesCache, onChange: Runnable);
    update(): void;
    updateExclusionAreas(updatedGuiExclusionAreas: Set<ImmutableRect2i>): Updater;
    updateMouseExclusionArea(mouseExclusionArea: ImmutablePoint2i): Updater;
    updateScreen(guiScreen: Screen): Updater;
  }

}

declare module 'mezz.jei.gui' {
  import { IPaged, IUserInputHandler } from 'mezz.jei.gui.input';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { IButtonState } from 'mezz.jei.api.gui.buttons';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class PageNavigation {
    constructor(paged: IPaged, hideOnSinglePage: boolean);
    createInputHandler(): IUserInputHandler;
    draw(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    get backButtonArea(): ImmutableRect2i;
    get nextButtonArea(): ImmutableRect2i;
    initState(state: IButtonState): void;
    initState(state: IButtonState): void;
    onPress(b: IJeiUserInput): boolean;
    onPress(b: IJeiUserInput): boolean;
    updateBounds(area: ImmutableRect2i): void;
    updatePageNumber(): void;
  }

}

declare module 'mezz.jei.gui.plugins' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHandlerRegistration } from 'mezz.jei.api.registration';

  interface JeiGuiPlugin extends IModPlugin {}
  class JeiGuiPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
  }

}

declare module 'mezz.jei.gui.recipes' {
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IFocusGroup, RecipeType, IRecipeManager, IFocusFactory, IFocus } from 'mezz.jei.api.recipe';
  import { IFocusedRecipes } from 'mezz.jei.gui.recipes.lookups';
  import { List, Optional, Comparator } from 'java.util';
  import { Stream } from 'java.util.stream';
  import { ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { BookmarkList, IBookmark, BookmarkFactory, RecipeBookmark } from 'mezz.jei.gui.bookmarks';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { IUserInputHandler, IRecipeFocusSource, IClickableIngredientInternal, IDraggableIngredientInternal, UserInput, IPaged } from 'mezz.jei.gui.input';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { JeiTooltip } from 'mezz.jei.common.gui';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Key } from 'InputConstants';
  import { IIngredientManager, IRecipesGui } from 'mezz.jei.api.runtime';
  import { LookupHistory } from 'mezz.jei.gui.overlay.bookmarks.history';
  import { IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { Minecraft } from 'net.minecraft.client';
  import { IRecipeButtonControllerFactory } from 'mezz.jei.api.recipe.advanced';
  import { Runnable } from 'java.lang';
  import { IGuiProperties } from 'mezz.jei.api.gui.handlers';
  import { RecipeSorterStage } from 'mezz.jei.common.config';

  class IRecipeGuiLogic {
    back(): boolean;
    clearHistory(): void;
    get pageString(): string;
    get recipeCatalysts(): Stream<ITypedIngredient<any>>;
    get recipeCategories(): IRecipeCategory<any>[];
    get recipesPerPage(): number;
    get selectedRecipeCategory(): IRecipeCategory<any>;
    getRecipeCatalysts(var1: IRecipeCategory<any>): Stream<ITypedIngredient<any>>;
    getVisibleRecipeLayoutsWithButtons(var1: number, var2: number, var3: AbstractContainerMenu, var4: BookmarkList, var5: RecipesGui): IRecipeLayoutWithButtons<any>[];
    goToFirstPage(): void;
    hasAllCategories(): boolean;
    hasMultipleCategories(): boolean;
    hasMultiplePages(): boolean;
    nextPage(): boolean;
    nextRecipeCategory(): boolean;
    previousPage(): boolean;
    previousRecipeCategory(): boolean;
    setRecipeCategory(var1: IRecipeCategory<any>): void;
    showAllRecipes(): boolean;
    showCategories(var1: RecipeType<any>[]): boolean;
    showFocus(var1: IFocusGroup): boolean;
    showRecipes(var1: IFocusedRecipes<any>, var2: IFocusGroup): boolean;
    tick(): void;
  }


  class IRecipeLayoutWithButtons<R = any> {
    createUserInputHandler(): IUserInputHandler;
    draw(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    drawTooltips(var1: GuiGraphics, var2: number, var3: number): void;
    get missingCountHint(): number;
    get recipeLayout(): IRecipeLayoutDrawable<R>;
    tick(): void;
    totalWidth(): number;
    updateBounds(var1: number, var2: number): void;
  }


  class IRecipeLogicStateListener {
    onStateChange(): void;
  }


  interface RecipeBookmarkButtonController extends IIconButtonController {}
  class RecipeBookmarkButtonController extends IIconButtonController {
    constructor(bookmarks: BookmarkList, recipeBookmark: IBookmark);
    drawExtras(guiGraphics: GuiGraphics, buttonArea: Rect2i, mouseX: number, mouseY: number, partialTicks: number): void;
    getTooltips(tooltip: ITooltipBuilder): void;
    initState(state: IButtonState): void;
    isBookmarked(): boolean;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }


  interface RecipeCatalysts extends IRecipeFocusSource {}
  class RecipeCatalysts extends IRecipeFocusSource {
    constructor(recipeManager: IRecipeManager);
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): Optional<IRecipeSlotDrawable>;
    get width(): number;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    isEmpty(): boolean;
    updateLayout(ingredients: ITypedIngredient<any>[], recipeArea: ImmutableRect2i, optionButtonsArea: ImmutableRect2i): void;
  }


  class RecipeCategoryIconUtil {
    static create<T>(recipeCategory: IRecipeCategory<T>, recipeManager: IRecipeManager, guiHelper: IGuiHelper): IDrawable;
  }


  interface RecipeCategoryTab extends RecipeGuiTab {}
  class RecipeCategoryTab extends RecipeGuiTab {
    constructor(logic: IRecipeGuiLogic, category: IRecipeCategory<any>, x: number, y: number, recipeManager: IRecipeManager, guiHelper: IGuiHelper);
    draw(selected: boolean, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get tooltip(): JeiTooltip;
    handleUserInput(screen: Screen, input: UserInput, keyBindings: IInternalKeyMappings): Optional<IUserInputHandler>;
    isSelected(selectedCategory: IRecipeCategory<any>): boolean;
  }


  class RecipeCategoryTitle {
    constructor();

    constructor(visibleString: FormattedCharSequence, tooltipString: Component, area: ImmutableRect2i);
    static create(recipeCategory: IRecipeCategory<any>, font: Font, availableArea: ImmutableRect2i): RecipeCategoryTitle;
    draw(guiGraphics: GuiGraphics, font: Font): void;
    getTooltip(tooltip: JeiTooltip): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
  }


  class RecipeGuiLayouts {
    createInputHandler(): IUserInputHandler;
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): Optional<IRecipeLayoutDrawable<any>>;
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get width(): number;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    mouseDragged(mouseX: number, mouseY: number, input: Key, dragX: number, dragY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    setRecipeLayoutsWithButtons(recipeLayoutsWithButtons: IRecipeLayoutWithButtons<any>[]): void;
    tick(): void;
    updateLayout(recipeLayoutsArea: ImmutableRect2i, recipesPerPage: number): void;
  }


  interface RecipeGuiLogic extends IRecipeGuiLogic {}
  class RecipeGuiLogic extends IRecipeGuiLogic {
    constructor(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, lookupHistory: LookupHistory, recipeTransferManager: IRecipeTransferManager, stateListener: IRecipeLogicStateListener, focusFactory: IFocusFactory, bookmarkFactory: BookmarkFactory);
    back(): boolean;
    clearHistory(): void;
    get pageString(): string;
    get recipeCatalysts(): Stream<ITypedIngredient<any>>;
    get recipeCategories(): IRecipeCategory<any>[];
    get recipesPerPage(): number;
    get selectedRecipeCategory(): IRecipeCategory<any>;
    getRecipeCatalysts(recipeCategory: IRecipeCategory<any>): Stream<ITypedIngredient<any>>;
    getVisibleRecipeLayoutsWithButtons(availableHeight: number, minRecipePadding: number, container: AbstractContainerMenu, bookmarkList: BookmarkList, recipesGui: RecipesGui): IRecipeLayoutWithButtons<any>[];
    goToFirstPage(): void;
    hasAllCategories(): boolean;
    hasMultipleCategories(): boolean;
    hasMultiplePages(): boolean;
    nextPage(): boolean;
    nextRecipeCategory(): boolean;
    previousPage(): boolean;
    previousRecipeCategory(): boolean;
    setRecipeCategory(category: IRecipeCategory<any>): void;
    showAllRecipes(): boolean;
    showCategories(recipeTypes: RecipeType<any>[]): boolean;
    showFocus(focuses: IFocusGroup): boolean;
    showRecipes(focusedRecipes: IFocusedRecipes<any>, focuses: IFocusGroup): boolean;
    tick(): void;
  }


  interface RecipeGuiTab extends IUserInputHandler {}
  class RecipeGuiTab extends IUserInputHandler {
    static readonly TAB_HEIGHT: number;
    static readonly TAB_WIDTH: number;
    constructor(x: number, y: number);
    draw(selected: boolean, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get tooltip(): JeiTooltip;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isSelected(var1: IRecipeCategory<any>): boolean;
  }


  interface RecipeGuiTabs extends IPaged {}
  class RecipeGuiTabs extends IPaged {
    constructor(recipeGuiLogic: IRecipeGuiLogic, recipeManager: IRecipeManager, guiHelper: IGuiHelper);
    createInputHandler(): IUserInputHandler;
    draw(minecraft: Minecraft, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    get pageCount(): number;
    get pageNumber(): number;
    hasNext(): boolean;
    hasPrevious(): boolean;
    initLayout(recipeGuiArea: ImmutableRect2i): void;
    nextPage(): boolean;
    previousPage(): boolean;
  }


  interface RecipeLayoutWithButtons<R = any> extends IRecipeLayoutWithButtons<R> {}
  class RecipeLayoutWithButtons<R = any> extends IRecipeLayoutWithButtons<R> {
    static create<T>(recipeLayoutDrawable: IRecipeLayoutDrawable<T>, recipeBookmark: RecipeBookmark<any, any>, bookmarks: BookmarkList, recipesGui: RecipesGui, extraButtonControllerFactories: IRecipeButtonControllerFactory[]): IRecipeLayoutWithButtons<T>;
    createUserInputHandler(): IUserInputHandler;
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get missingCountHint(): number;
    get recipeLayout(): IRecipeLayoutDrawable<R>;
    tick(): void;
    totalWidth(): number;
    updateBounds(recipeXOffset: number, recipeYOffset: number): void;
  }


  interface RecipeLayoutWithButtonsErrored<R = any> extends IRecipeLayoutWithButtons<R> {}
  class RecipeLayoutWithButtonsErrored<R = any> extends IRecipeLayoutWithButtons<R> {
    constructor(brokenRecipeLayout: IRecipeLayoutDrawable<R>);
    createUserInputHandler(): IUserInputHandler;
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get missingCountHint(): number;
    get recipeLayout(): IRecipeLayoutDrawable<R>;
    tick(): void;
    totalWidth(): number;
    updateBounds(recipeXOffset: number, recipeYOffset: number): void;
  }


  class RecipeOptionButtons {
    constructor(onValueChanged: Runnable);
    createInputHandler(): IUserInputHandler;
    draw(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    drawTooltips(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get area(): ImmutableRect2i;
    get width(): number;
    tick(): void;
    updateLayout(recipeArea: ImmutableRect2i): void;
  }


  interface RecipesGui extends IRecipesGui, IRecipeFocusSource, Screen {}
  class RecipesGui extends IRecipesGui {
    constructor(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, recipeTransferManager: IRecipeTransferManager, keyBindings: IInternalKeyMappings, focusFactory: IFocusFactory, bookmarks: BookmarkList, lookupHistory: LookupHistory, guiHelper: IGuiHelper, bookmarkFactory: BookmarkFactory);
    back(): void;
    get area(): ImmutableRect2i;
    get leftSideExtraWidth(): number;
    get parentContainerMenu(): AbstractContainerMenu;
    get parentScreen(): Optional<Screen>;
    get properties(): IGuiProperties;
    getDraggableIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IDraggableIngredientInternal<any>>;
    getIngredientUnderMouse(mouseX: number, mouseY: number): Stream<IClickableIngredientInternal<any>>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): Optional<T>;
    init(): void;
    initState(state: IButtonState): void;
    initState(state: IButtonState): void;
    initState(state: IButtonState): void;
    initState(state: IButtonState): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isOpen(): boolean;
    isPauseScreen(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, mouseButton: number, dragX: number, dragY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseReleased(mouseX: number, mouseY: number, mouseButton: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onClose(): void;
    onPress(input: IJeiUserInput): boolean;
    onPress(input: IJeiUserInput): boolean;
    onPress(input: IJeiUserInput): boolean;
    onPress(input: IJeiUserInput): boolean;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    show(focuses: IFocus<any>[]): void;
    show<V>(focus: IFocus<V>): void;
    showRecipes<T>(recipeCategory: IRecipeCategory<T>, recipes: T[], focuses: IFocus<any>[]): void;
    showTypes(recipeTypes: RecipeType<any>[]): void;
    tick(): void;
    updateState(state: IButtonState): void;
    updateState(state: IButtonState): void;
    updateState(state: IButtonState): void;
    updateState(state: IButtonState): void;
  }


  interface RecipeSortStateButtonController extends IIconButtonController {}
  class RecipeSortStateButtonController extends IIconButtonController {
    constructor(recipeSorterStage: RecipeSorterStage, offIcon: IDrawable, onIcon: IDrawable, disabledTooltip: Component, enabledTooltip: Component, onValueChanged: Runnable);
    getTooltips(tooltip: ITooltipBuilder): void;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }


  class RecipeSortUtil {
    static get comparator(): Comparator<IRecipeLayoutWithButtons<any>>;
    static sortRecipeCategories(recipeCategories: IRecipeCategory<any>[], recipeTransferManager: IRecipeTransferManager): IRecipeCategory<any>[];
  }


  interface RecipeTransferButtonController extends IIconButtonController {}
  class RecipeTransferButtonController extends IIconButtonController {
    constructor(recipeLayout: IRecipeLayoutDrawable<any>, recipesGui: RecipesGui);
    drawExtras(guiGraphics: GuiGraphics, buttonArea: Rect2i, mouseX: number, mouseY: number, partialTicks: number): void;
    get missingCountHint(): number;
    getTooltips(tooltip: ITooltipBuilder): void;
    initState(state: IButtonState): void;
    onPress(input: IJeiUserInput): boolean;
    updateState(state: IButtonState): void;
  }

}

declare module 'mezz.jei.gui.recipes.layouts' {
  import { Set, List, Optional } from 'java.util';
  import { RecipeSorterStage } from 'mezz.jei.common.config';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { IFocusedRecipes } from 'mezz.jei.gui.recipes.lookups';
  import { IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { BookmarkList } from 'mezz.jei.gui.bookmarks';
  import { RecipesGui, IRecipeLayoutWithButtons } from 'mezz.jei.gui.recipes';

  class IRecipeLayoutList {
    static create(recipeSorterStages: Set<RecipeSorterStage>, container: AbstractContainerMenu, selectedRecipes: IFocusedRecipes<any>, focusGroup: IFocusGroup, bookmarkList: BookmarkList, recipeManager: IRecipeManager, recipesGui: RecipesGui): IRecipeLayoutList;
    findFirst(): Optional<IRecipeLayoutWithButtons<any>>;
    size(): number;
    subList(var1: number, var2: number): IRecipeLayoutWithButtons<any>[];
    tick(): void;
  }


  interface LazyRecipeLayoutList<T = any> extends IRecipeLayoutList {}
  class LazyRecipeLayoutList<T = any> extends IRecipeLayoutList {
    constructor(recipeSorterStages: Set<RecipeSorterStage>, container: AbstractContainerMenu, selectedRecipes: IFocusedRecipes<T>, bookmarkList: BookmarkList, recipeManager: IRecipeManager, recipesGui: RecipesGui, focusGroup: IFocusGroup);
    findFirst(): Optional<IRecipeLayoutWithButtons<any>>;
    size(): number;
    subList(from: number, to: number): IRecipeLayoutWithButtons<any>[];
    tick(): void;
  }

}

declare module 'mezz.jei.gui.recipes.lookups' {
  import { IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { List } from 'java.util';
  import { IRecipeLayoutWithButtons } from 'mezz.jei.gui.recipes';
  import { IRecipeLayoutList } from 'mezz.jei.gui.recipes.layouts';
  import { IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';

  interface FocusedRecipes<T = any> extends IFocusedRecipes<T> {}
  class FocusedRecipes<T = any> extends IFocusedRecipes<T> {
    static create<T>(focuses: IFocusGroup, recipeManager: IRecipeManager, recipeCategory: IRecipeCategory<T>): IFocusedRecipes<T>;
    get recipeCategory(): IRecipeCategory<T>;
    get recipes(): T[];
  }


  class IFocusedRecipes<T = any> {
    get recipeCategory(): IRecipeCategory<T>;
    get recipes(): T[];
  }


  class ILookupState {
    get focusedRecipes(): IFocusedRecipes<any>;
    get focuses(): IFocusGroup;
    get recipeCategories(): IRecipeCategory<any>[];
    get recipeIndex(): number;
    get recipesPerPage(): number;
    getVisible(recipes: IRecipeLayoutList): IRecipeLayoutWithButtons<any>[];
    goToFirstPage(): void;
    moveToRecipeCategory(var1: IRecipeCategory<any>): boolean;
    nextPage(): boolean;
    nextRecipeCategory(): boolean;
    pageCount(): number;
    previousPage(): boolean;
    previousRecipeCategory(): boolean;
    set recipesPerPage(var1: number);
  }


  interface IngredientLookupState extends ILookupState {}
  class IngredientLookupState extends ILookupState {
    static create(recipeManager: IRecipeManager, focusGroup: IFocusGroup, recipeCategories: IRecipeCategory<any>[], recipeTransferManager: IRecipeTransferManager): ILookupState;
    get focusedRecipes(): IFocusedRecipes<any>;
    get focuses(): IFocusGroup;
    get recipeCategories(): IRecipeCategory<any>[];
    get recipeCategoryIndex(): number;
    get recipeIndex(): number;
    get recipesPerPage(): number;
    goToFirstPage(): void;
    moveToRecipeCategory(recipeCategory: IRecipeCategory<any>): boolean;
    nextPage(): boolean;
    nextRecipeCategory(): boolean;
    pageCount(): number;
    previousPage(): boolean;
    previousRecipeCategory(): boolean;
    recipeCount(): number;
    set recipesPerPage(recipesPerPage: number);
  }


  interface SingleCategoryLookupState extends ILookupState {}
  class SingleCategoryLookupState extends ILookupState {
    constructor(focusedRecipes: IFocusedRecipes<any>, focusGroup: IFocusGroup);
    get focusedRecipes(): IFocusedRecipes<any>;
    get focuses(): IFocusGroup;
    get recipeCategories(): IRecipeCategory<any>[];
    get recipeIndex(): number;
    get recipesPerPage(): number;
    goToFirstPage(): void;
    moveToRecipeCategory(recipeCategory: IRecipeCategory<any>): boolean;
    nextPage(): boolean;
    nextRecipeCategory(): boolean;
    pageCount(): number;
    previousPage(): boolean;
    previousRecipeCategory(): boolean;
    recipeCount(): number;
    set recipesPerPage(recipesPerPage: number);
  }

}

declare module 'mezz.jei.gui.search' {
  import { PrefixInfo } from 'mezz.jei.core.search';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { IIngredientFilterConfig } from 'mezz.jei.common.config';
  import { IColorHelper, IModIdHelper } from 'mezz.jei.api.helpers';
  import { Collection, Optional, Set, List } from 'java.util';
  import { IListElement, IListElementInfo } from 'mezz.jei.gui.ingredients';
  import { TokenInfo } from 'mezz.jei.gui.search.ElementPrefixParser';
  import { ITypedIngredient, IIngredientHelper } from 'mezz.jei.api.ingredients';

  class ElementPrefixParser {
    static readonly NO_PREFIX: PrefixInfo;
    constructor(ingredientManager: IIngredientManager, config: IIngredientFilterConfig, colorHelper: IColorHelper, modIdHelper: IModIdHelper);
    allPrefixInfos(): Collection<PrefixInfo<IListElementInfo<any>, IListElement<any>>>;
    parseToken(token: string): Optional<TokenInfo>;
  }


  interface ElementSearch extends IElementSearch {}
  class ElementSearch extends IElementSearch {
    constructor(elementPrefixParser: ElementPrefixParser);
    add<T>(info: IListElementInfo<T>, ingredientManager: IIngredientManager): void;
    addAll(infos: Collection<IListElementInfo<any>>, ingredientManager: IIngredientManager): void;
    findElement<T>(ingredient: ITypedIngredient<T>, ingredientHelper: IIngredientHelper<T>): IListElement<T>;
    get allIngredients(): Collection<IListElement<any>>;
    getSearchResults(tokenInfo: TokenInfo): Set<IListElement<any>>;
    logStatistics(): void;
  }


  interface ElementSearchLowMem extends IElementSearch {}
  class ElementSearchLowMem extends IElementSearch {
    add<T>(info: IListElementInfo<T>, ingredientManager: IIngredientManager): void;
    addAll(infos: Collection<IListElementInfo<any>>, ingredientManager: IIngredientManager): void;
    findElement<T>(typedIngredient: ITypedIngredient<T>, ingredientHelper: IIngredientHelper<T>): IListElement<T>;
    get allIngredients(): IListElement<any>[];
    getSearchResults(tokenInfo: TokenInfo): Set<IListElement<any>>;
    logStatistics(): void;
  }


  class IElementSearch {
    add<T>(var1: IListElementInfo<T>, var2: IIngredientManager): void;
    addAll(var1: Collection<IListElementInfo<any>>, var2: IIngredientManager): void;
    findElement<T>(var1: ITypedIngredient<T>, var2: IIngredientHelper<T>): IListElement<T>;
    get allIngredients(): Collection<IListElement<any>>;
    getSearchResults(var1: TokenInfo): Set<IListElement<any>>;
    logStatistics(): void;
  }

}

declare module 'mezz.jei.gui.startup' {
  import { IRuntimeRegistration } from 'mezz.jei.api.registration';
  import { IngredientGridWithNavigation, IIngredientGridSource, IngredientListOverlay } from 'mezz.jei.gui.overlay';
  import { IIngredientManager, IScreenHelper } from 'mezz.jei.api.runtime';
  import { IIngredientGridConfig, IIngredientFilterConfig, IClientConfig, IClientToggleState } from 'mezz.jei.common.config';
  import { DrawableNineSliceTexture } from 'mezz.jei.common.gui.elements';
  import { IInternalKeyMappings } from 'mezz.jei.common.input';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { IColorHelper } from 'mezz.jei.api.helpers';
  import { IFilterTextSource } from 'mezz.jei.gui.filter';
  import { Textures } from 'mezz.jei.common.gui.textures';
  import { BookmarkOverlay } from 'mezz.jei.gui.overlay.bookmarks';
  import { BookmarkList } from 'mezz.jei.gui.bookmarks';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { IngredientFilter } from 'mezz.jei.gui.ingredients';

  class JeiGuiStarter {
    static start(registration: IRuntimeRegistration): JeiEventHandlers;
  }


  class OverlayHelper {
    static createBookmarkOverlay(ingredientManager: IIngredientManager, screenHelper: IScreenHelper, bookmarkList: BookmarkList, lookupHistory: IIngredientGridSource, keyMappings: IInternalKeyMappings, bookmarkListConfig: IIngredientGridConfig, ingredientFilterConfig: IIngredientFilterConfig, clientConfig: IClientConfig, toggleState: IClientToggleState, serverConnection: IConnectionToServer, textures: Textures, colorHelper: IColorHelper): BookmarkOverlay;
    static createIngredientGridWithNavigation(debugName: string, ingredientFilter: IIngredientGridSource, ingredientManager: IIngredientManager, ingredientGridConfig: IIngredientGridConfig, background: DrawableNineSliceTexture, slotBackground: DrawableNineSliceTexture, keyMappings: IInternalKeyMappings, ingredientFilterConfig: IIngredientFilterConfig, clientConfig: IClientConfig, toggleState: IClientToggleState, serverConnection: IConnectionToServer, colorHelper: IColorHelper, screenHelper: IScreenHelper, supportsEditMode: boolean): IngredientGridWithNavigation;
    static createIngredientListOverlay(ingredientManager: IIngredientManager, screenHelper: IScreenHelper, ingredientFilter: IIngredientGridSource, historyList: IIngredientGridSource, filterTextSource: IFilterTextSource, keyMappings: IInternalKeyMappings, ingredientGridConfig: IIngredientGridConfig, clientConfig: IClientConfig, toggleState: IClientToggleState, serverConnection: IConnectionToServer, ingredientFilterConfig: IIngredientFilterConfig, textures: Textures, colorHelper: IColorHelper): IngredientListOverlay;
  }


  interface ResourceReloadHandler extends ResourceManagerReloadListener {}
  class ResourceReloadHandler extends ResourceManagerReloadListener {
    constructor(ingredientListOverlay: IngredientListOverlay, ingredientFilter: IngredientFilter);
    onResourceManagerReload(resourceManager: ResourceManager): void;
  }

}

declare module 'mezz.jei.gui.util' {
  import { ImmutableRect2i, ImmutableSize2i } from 'mezz.jei.common.util';
  import { HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';
  import { IClientConfig } from 'mezz.jei.common.config';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IFocusFactory, IFocus, RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { List, Collection } from 'java.util';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Enum } from 'java.lang';
  import { Stream } from 'java.util.stream';

  class AlignmentUtil {
    static align(size: ImmutableSize2i, availableArea: ImmutableRect2i, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): ImmutableRect2i;
  }


  class CommandUtil {
    constructor(clientConfig: IClientConfig, serverConnection: IConnectionToServer);
    giveStack(itemStack: ItemStack, giveAmount: GiveAmount): void;
    setHotbarStack(itemStack: ItemStack, hotbarSlot: number): void;
  }


  class FocusUtil {
    constructor(focusFactory: IFocusFactory, clientConfig: IClientConfig, ingredientManager: IIngredientManager);
    createFocuses(ingredient: ITypedIngredient<any>, roles: RecipeIngredientRole[]): IFocus<any>[];
  }


  interface GiveAmount extends Enum<GiveAmount> {}
  class GiveAmount extends Enum<GiveAmount> {
    static readonly ONE: GiveAmount;
    static readonly MAX: GiveAmount;
    getAmountForStack(itemStack: ItemStack): number;
    static valueOf(name: string): GiveAmount;
    static values(): GiveAmount[];
  }


  class MaximalRectangle {
    static getLargestRectangles(area: ImmutableRect2i, exclusionAreas: Collection<ImmutableRect2i>, samplingScale: number): Stream<ImmutableRect2i>;
  }

}

declare module 'mezz.jei.library.color' {
  import { List } from 'java.util';
  import { Integer } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { IColorHelper } from 'mezz.jei.api.helpers';
  import { ColorNameConfig } from 'mezz.jei.library.config';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { CMap } from 'mezz.jei.library.color.MMCQ';

  class ColorGetter {
    getColors(itemStack: ItemStack, colorCount: number): number[];
    getColors(textureAtlasSprite: TextureAtlasSprite, renderColor: number, colorCount: number): number[];
  }


  interface ColorHelper extends IColorHelper {}
  class ColorHelper extends IColorHelper {
    constructor(colorNameConfig: ColorNameConfig);
    getClosestColorName(color: number): string;
    getColors(textureAtlasSprite: TextureAtlasSprite, renderColor: number, colorCount: number): number[];
    getColors(itemStack: ItemStack, colorCount: number): number[];
  }


  class ColorThief {
    static getColorMap(sourceImage: NativeImage, colorCount: number, quality: number, ignoreWhite: boolean): CMap;
    static getPalette(sourceImage: NativeImage, colorCount: number, quality: number, ignoreWhite: boolean): int[][];
  }


  class ColorUtil {
    static fastPerceptualColorDistanceSquared(color1: number[], color2: number[]): number;
    static slowPerceptualColorDistanceSquared(color1: number, color2: number): number;
  }


  class MMCQ {
    static quantize(pixels: int[][], maxcolors: number): CMap;
  }

}

declare module 'mezz.jei.library.color.MMCQ' {
  import { ArrayList } from 'java.util';
  import { int[] } from 'mezz.jei.library.color';

  class VBox {
    constructor(r1: number, r2: number, g1: number, g2: number, b1: number, b2: number, histo: number[]);
    avg(force: boolean): number[];
    clone(): VBox;
    contains(pixel: number[]): boolean;
    count(force: boolean): number;
    toString(): string;
    volume(force: boolean): number;
  }


  class CMap {
    readonly vboxes: ArrayList;
    map(color: number[]): number[];
    nearest(color: number[]): number[];
    palette(): int[][];
    push(box: VBox): void;
    size(): number;
  }

}

declare module 'mezz.jei.library.config' {
  import { IConfigSchemaBuilder } from 'mezz.jei.common.config.file';
  import { IEditModeConfig, IIngredientManager } from 'mezz.jei.api.runtime';
  import { ISerializer } from 'mezz.jei.library.config.EditModeConfig';
  import { ITypedIngredient, IIngredientHelper } from 'mezz.jei.api.ingredients';
  import { HideMode } from 'mezz.jei.api.runtime.IEditModeConfig';
  import { Set } from 'java.util';
  import { IngredientVisibility } from 'mezz.jei.library.ingredients';
  import { MappedSortingConfig } from 'mezz.jei.common.config.sorting';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { Path } from 'java.nio.file';

  class ColorNameConfig {
    constructor(schema: IConfigSchemaBuilder);
    getClosestColorName(color: number): string;
  }


  interface EditModeConfig extends IEditModeConfig {}
  class EditModeConfig extends IEditModeConfig {
    constructor(serializer: ISerializer, ingredientManager: IIngredientManager);
    addIngredientToConfigBlacklist<V>(typedIngredient: ITypedIngredient<V>, blacklistType: HideMode, ingredientHelper: IIngredientHelper<V>): void;
    getIngredientHiddenUsingConfigFile<V>(ingredient: ITypedIngredient<V>): Set<HideMode>;
    hideIngredientUsingConfigFile<V>(ingredient: ITypedIngredient<V>, hideMode: HideMode): void;
    isIngredientHiddenUsingConfigFile<V>(ingredient: ITypedIngredient<V>): boolean;
    isIngredientOnConfigBlacklist<V>(typedIngredient: ITypedIngredient<V>, ingredientHelper: IIngredientHelper<V>): boolean;
    isIngredientOnConfigBlacklist<V>(typedIngredient: ITypedIngredient<V>, blacklistType: HideMode, ingredientHelper: IIngredientHelper<V>): boolean;
    registerListener(ingredientVisibility: IngredientVisibility): void;
    showIngredientUsingConfigFile<V>(ingredient: ITypedIngredient<V>, hideMode: HideMode): void;
  }


  class IModIdFormatConfig {
    get modNameFormat(): string;
    isModNameFormatOverrideActive(): boolean;
  }


  interface ModIdFormatConfig extends IModIdFormatConfig {}
  class ModIdFormatConfig extends IModIdFormatConfig {
    static readonly MOD_NAME_FORMAT_CODE: string;
    constructor(builder: IConfigSchemaBuilder);
    get modNameFormat(): string;
    isModNameFormatOverrideActive(): boolean;
  }


  interface RecipeCategorySortingConfig extends MappedSortingConfig<RecipeType, string> {}
  class RecipeCategorySortingConfig extends MappedSortingConfig<RecipeType, string> {
    constructor(path: Path);
  }

}

declare module 'mezz.jei.library.config.EditModeConfig' {
  import { EditModeConfig } from 'mezz.jei.library.config';
  import { Path } from 'java.nio.file';
  import { RegistryAccess } from 'net.minecraft.core';
  import { ICodecHelper } from 'mezz.jei.api.helpers';

  class ISerializer {
    initialize(var1: EditModeConfig): void;
    load(var1: EditModeConfig): void;
    save(var1: EditModeConfig): void;
  }


  interface FileSerializer extends ISerializer {}
  class FileSerializer extends ISerializer {
    constructor(path: Path, registryAccess: RegistryAccess, codecHelper: ICodecHelper);
    initialize(config: EditModeConfig): void;
    load(config: EditModeConfig): void;
    save(config: EditModeConfig): void;
  }

}

declare module 'mezz.jei.library.config.serializers' {
  import { IJeiConfigListValueSerializer, IJeiConfigValueSerializer } from 'mezz.jei.api.runtime.config';
  import { ChatFormatting } from 'net.minecraft';
  import { List, Optional, Collection } from 'java.util';
  import { DeserializeResult } from 'mezz.jei.common.config.file.serializers';
  import { ColorName } from 'mezz.jei.library.color';

  interface ChatFormattingSerializer extends IJeiConfigListValueSerializer<ChatFormatting> {}
  class ChatFormattingSerializer extends IJeiConfigListValueSerializer<ChatFormatting> {
    static readonly INSTANCE: ChatFormattingSerializer;
    deserialize(string: string): DeserializeResult<ChatFormatting[]>;
    get allValidValues(): Optional<Collection<ChatFormatting[]>>;
    get listValueSerializer(): IJeiConfigValueSerializer<ChatFormatting>;
    get validValuesDescription(): string;
    isValid(value: ChatFormatting[]): boolean;
    serialize(value: ChatFormatting[]): string;
  }


  interface ColorNameSerializer extends IJeiConfigValueSerializer<ColorName> {}
  class ColorNameSerializer extends IJeiConfigValueSerializer<ColorName> {
    static readonly INSTANCE: ColorNameSerializer;
    deserialize(string: string): DeserializeResult<ColorName>;
    get allValidValues(): Optional<Collection<ColorName>>;
    get validValuesDescription(): string;
    isValid(value: ColorName): boolean;
    serialize(value: ColorName): string;
  }

}

declare module 'mezz.jei.library.focus' {
  import { IFocus, IFocusGroup, RecipeIngredientRole, IFocusFactory } from 'mezz.jei.api.recipe';
  import { ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { Optional, List, Collection } from 'java.util';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { Stream } from 'java.util.stream';

  interface Focus<V = any> extends IFocus<V>, IFocusGroup {}
  class Focus<V = any> extends IFocus<V> {
    constructor(role: RecipeIngredientRole, value: ITypedIngredient<V>);
    static checkOne<V>(focus: IFocus<V>, ingredientManager: IIngredientManager): Focus<V>;
    checkedCast<T>(ingredientType: IIngredientType<T>): Optional<IFocus<T>>;
    static createFromApi<V>(ingredientManager: IIngredientManager, role: RecipeIngredientRole, ingredientType: IIngredientType<V>, value: V): Focus<V>;
    static createFromApi<V>(ingredientManager: IIngredientManager, role: RecipeIngredientRole, typedIngredient: ITypedIngredient<V>): Focus<V>;
    get allFocuses(): IFocus<any>[];
    get role(): RecipeIngredientRole;
    get typedValue(): ITypedIngredient<V>;
    getFocuses(role: RecipeIngredientRole): Stream<IFocus<any>>;
    getFocuses<T>(ingredientType: IIngredientType<T>): Stream<IFocus<T>>;
    getFocuses<T>(ingredientType: IIngredientType<T>, role: RecipeIngredientRole): Stream<IFocus<T>>;
    isEmpty(): boolean;
  }


  interface FocusFactory extends IFocusFactory {}
  class FocusFactory extends IFocusFactory {
    constructor(ingredientManager: IIngredientManager);
    createFocus<V>(role: RecipeIngredientRole, ingredientType: IIngredientType<V>, ingredient: V): IFocus<V>;
    createFocus<V>(role: RecipeIngredientRole, typedIngredient: ITypedIngredient<V>): IFocus<V>;
    createFocusGroup(focuses: Collection<IFocus<any>>): IFocusGroup;
    get emptyFocusGroup(): IFocusGroup;
  }


  interface FocusGroup extends IFocusGroup {}
  class FocusGroup extends IFocusGroup {
    static readonly EMPTY: IFocusGroup;
    static create(focuses: Collection<IFocus<any>>, ingredientManager: IIngredientManager): IFocusGroup;
    get allFocuses(): IFocus<any>[];
    getFocuses(role: RecipeIngredientRole): Stream<IFocus<any>>;
    getFocuses<T>(ingredientType: IIngredientType<T>): Stream<IFocus<T>>;
    getFocuses<T>(ingredientType: IIngredientType<T>, role: RecipeIngredientRole): Stream<IFocus<T>>;
    isEmpty(): boolean;
  }

}

declare module 'mezz.jei.library.gui' {
  import { IBookmarkOverlay, IIngredientListOverlay } from 'mezz.jei.api.runtime';
  import { Optional, List } from 'java.util';
  import { ITypedIngredient, IIngredientType } from 'mezz.jei.api.ingredients';
  import { Class } from 'java.lang';
  import { IGuiContainerHandler, IGuiClickableArea } from 'mezz.jei.api.gui.handlers';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Stream } from 'java.util.stream';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';

  interface BookmarkOverlayDummy extends IBookmarkOverlay {}
  class BookmarkOverlayDummy extends IBookmarkOverlay {
    static readonly INSTANCE: IBookmarkOverlay;
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): T;
  }


  class GuiContainerHandlers {
    add<T extends AbstractContainerScreen<any>>(containerClass: Class<T>, handler: IGuiContainerHandler<T>): void;
    getActiveGuiHandlerStream<T extends AbstractContainerScreen<any>>(guiContainer: T): Stream<IGuiContainerHandler<T>>;
    getGuiClickableArea<T extends AbstractContainerScreen<any>>(guiContainer: T, guiMouseX: number, guiMouseY: number): Stream<IGuiClickableArea>;
    getGuiExtraAreas<C extends AbstractContainerMenu, T extends AbstractContainerScreen<C>>(guiContainer: T): Stream<Rect2i>;
  }


  interface IngredientListOverlayDummy extends IIngredientListOverlay {}
  class IngredientListOverlayDummy extends IIngredientListOverlay {
    static readonly INSTANCE: IIngredientListOverlay;
    get ingredientUnderMouse(): Optional<ITypedIngredient<any>>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): T;
    getVisibleIngredients<T>(ingredientType: IIngredientType<T>): T[];
    hasKeyboardFocus(): boolean;
    isListDisplayed(): boolean;
  }

}

declare module 'mezz.jei.library.gui.elements' {
  import { IDrawableBuilder, IDrawableStatic, IDrawableAnimated } from 'mezz.jei.api.gui.drawable';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StartDirection } from 'mezz.jei.api.gui.drawable.IDrawableAnimated';
  import { ITickTimer } from 'mezz.jei.api.gui';

  interface DrawableBuilder extends IDrawableBuilder {}
  class DrawableBuilder extends IDrawableBuilder {
    constructor(resourceLocation: ResourceLocation, u: number, v: number, width: number, height: number);
    addPadding(paddingTop: number, paddingBottom: number, paddingLeft: number, paddingRight: number): IDrawableBuilder;
    build(): IDrawableStatic;
    buildAnimated(ticksPerCycle: number, startDirection: StartDirection, inverted: boolean): IDrawableAnimated;
    buildAnimated(tickTimer: ITickTimer, startDirection: StartDirection): IDrawableAnimated;
    setTextureSize(width: number, height: number): IDrawableBuilder;
    trim(trimTop: number, trimBottom: number, trimLeft: number, trimRight: number): IDrawableBuilder;
  }

}

declare module 'mezz.jei.library.gui.helpers' {
  import { ICraftingGridHelper } from 'mezz.jei.api.gui.ingredient';
  import { List, Map, Optional } from 'java.util';
  import { IRecipeSlotBuilder, IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Ingredient, RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Integer, Class } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { IIngredientManager, IScreenHelper, IClickableIngredient } from 'mezz.jei.api.runtime';
  import { IDrawableBuilder, IDrawableAnimated, IDrawableStatic, IDrawable } from 'mezz.jei.api.gui.drawable';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StartDirection } from 'mezz.jei.api.gui.drawable.IDrawableAnimated';
  import { ITickTimer } from 'mezz.jei.api.gui';
  import { IRecipeWidget, IScrollGridWidgetFactory, IScrollBoxWidget } from 'mezz.jei.api.gui.widgets';
  import { IGlobalGuiHandler, IGhostIngredientHandler, IScreenHandler, IGuiProperties, IGuiClickableArea } from 'mezz.jei.api.gui.handlers';
  import { GuiContainerHandlers } from 'mezz.jei.library.gui';
  import { ListMultiMap } from 'mezz.jei.core.collect';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Stream } from 'java.util.stream';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  interface CraftingGridHelper extends ICraftingGridHelper {}
  class CraftingGridHelper extends ICraftingGridHelper {
    static readonly INSTANCE: CraftingGridHelper;
    createAndSetIngredients(builder: IRecipeLayoutBuilder, ingredients: Ingredient[], width: number, height: number): void;
    createAndSetInputs<T>(builder: IRecipeLayoutBuilder, ingredientType: IIngredientType<T>, inputs: T[][], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetInputs(builder: IRecipeLayoutBuilder, inputs: ItemStack[][], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetNamedIngredients(builder: IRecipeLayoutBuilder, namedIngredients: Pair<string, Ingredient>[], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetNamedInputs<T>(builder: IRecipeLayoutBuilder, ingredientType: IIngredientType<T>, namedInputs: Pair<string, T[]>[], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetNamedInputs(builder: IRecipeLayoutBuilder, namedInputs: Pair<string, ItemStack[]>[], width: number, height: number): IRecipeSlotBuilder[];
    createAndSetOutputs<T>(builder: IRecipeLayoutBuilder, ingredientType: IIngredientType<T>, outputs: T[]): IRecipeSlotBuilder;
    createAndSetOutputs(builder: IRecipeLayoutBuilder, outputs: ItemStack[]): IRecipeSlotBuilder;
    static getGuiSlotToIngredientMap(recipeHolder: RecipeHolder<CraftingRecipe>, width: number, height: number): Map<number, Ingredient>;
    setIngredients(slotBuilders: IRecipeSlotBuilder[], ingredients: Ingredient[], width: number, height: number): void;
    setInputs<T>(slotBuilders: IRecipeSlotBuilder[], ingredientType: IIngredientType<T>, inputs: T[][], width: number, height: number): void;
  }


  interface GuiHelper extends IGuiHelper {}
  class GuiHelper extends IGuiHelper {
    constructor(ingredientManager: IIngredientManager);
    createAnimatedDrawable(drawable: IDrawableStatic, ticksPerCycle: number, startDirection: StartDirection, inverted: boolean): IDrawableAnimated;
    createAnimatedDrawable(drawable: IDrawableStatic, tickTimer: ITickTimer, startDirection: StartDirection): IDrawableAnimated;
    createAnimatedRecipeArrow(ticksPerCycle: number): IDrawableAnimated;
    createAnimatedRecipeFlame(ticksPerCycle: number): IDrawableAnimated;
    createBlankDrawable(width: number, height: number): IDrawableStatic;
    createCraftingGridHelper(): ICraftingGridHelper;
    createDrawableIngredient<V>(type: IIngredientType<V>, ingredient: V): IDrawable;
    createDrawableIngredient<V>(ingredient: ITypedIngredient<V>): IDrawable;
    createScrollBoxWidget(contents: IDrawable, visibleHeight: number, xPos: number, yPos: number): IScrollBoxWidget;
    createScrollBoxWidget(width: number, height: number, xPos: number, yPos: number): IScrollBoxWidget;
    createScrollGridFactory(columns: number, visibleRows: number): IScrollGridWidgetFactory<any>;
    createTickTimer(ticksPerCycle: number, maxValue: number, countDown: boolean): ITickTimer;
    createWidgetFromDrawable(drawable: IDrawable, xPos: number, yPos: number): IRecipeWidget;
    drawableBuilder(resourceLocation: ResourceLocation, u: number, v: number, width: number, height: number): IDrawableBuilder;
    get outputSlot(): IDrawableStatic;
    get recipeArrow(): IDrawableStatic;
    get recipeArrowFilled(): IDrawableStatic;
    get recipeFlameEmpty(): IDrawableStatic;
    get recipeFlameFilled(): IDrawableStatic;
    get recipePlusSign(): IDrawableStatic;
    get scrollBoxScrollbarExtraWidth(): number;
    get slotDrawable(): IDrawableStatic;
  }


  interface ScreenHelper extends IScreenHelper {}
  class ScreenHelper extends IScreenHelper {
    constructor(ingredientManager: IIngredientManager, globalGuiHandlers: IGlobalGuiHandler[], guiContainerHandlers: GuiContainerHandlers, ghostIngredientHandlers: ListMultiMap<Class<any>, IGhostIngredientHandler<any>>, guiScreenHandlers: Map<Class<any>, IScreenHandler<any>>);
    getClickableIngredientUnderMouse(screen: Screen, mouseX: number, mouseY: number): Stream<IClickableIngredient<any>>;
    getGhostIngredientHandlers<T extends Screen>(guiScreen: T): IGhostIngredientHandler<T>[];
    getGuiClickableArea(guiContainer: AbstractContainerScreen<any>, guiMouseX: number, guiMouseY: number): Stream<IGuiClickableArea>;
    getGuiExclusionAreas(screen: Screen): Stream<Rect2i>;
    getGuiProperties<T extends Screen>(screen: T): Optional<IGuiProperties>;
  }

}

declare module 'mezz.jei.library.gui.ingredients' {
  import { Optional, List } from 'java.util';
  import { IRecipeSlotView, IRecipeSlotDrawable, IRecipeSlotRichTooltipCallback, IRecipeSlotTooltipCallback } from 'mezz.jei.api.gui.ingredient';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { ITypedIngredient, IIngredientType, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { OffsetDrawable } from 'mezz.jei.common.gui.elements';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { Stream } from 'java.util.stream';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { ITooltipBuilder, IIngredientConsumer } from 'mezz.jei.api.gui.builder';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { ClientTooltipComponent } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';

  interface CycleTicker extends ICycler {}
  class CycleTicker extends ICycler {
    static createWithRandomOffset(): CycleTicker;
    getCycled<T>(list: T[]): Optional<T>;
    tick(): boolean;
  }


  interface CycleTimer extends ICycler {}
  class CycleTimer extends ICycler {
    static create(offset: number): CycleTimer;
    static createWithRandomOffset(): CycleTimer;
    getCycled<T>(list: T[]): Optional<T>;
  }


  class ICycler {
    getCycled<T>(var1: T[]): Optional<T>;
  }


  interface RecipeSlot extends IRecipeSlotView, IRecipeSlotDrawable {}
  class RecipeSlot extends IRecipeSlotView {
    constructor(role: RecipeIngredientRole, rect: ImmutableRect2i, cycler: ICycler, tooltipCallbacks: IRecipeSlotRichTooltipCallback[], allIngredients: ITypedIngredient<any>[], focusedIngredients: ITypedIngredient<any>[], background: OffsetDrawable, overlay: IDrawable, slotName: string, rendererOverrides: RendererOverrides);
    addTooltipCallback(tooltipCallback: IRecipeSlotTooltipCallback): void;
    clearDisplayOverrides(): void;
    createDisplayOverrides(): IIngredientConsumer;
    draw(guiGraphics: GuiGraphics): void;
    drawHighlight(guiGraphics: GuiGraphics, color: number): void;
    drawHoverOverlays(guiGraphics: GuiGraphics): void;
    drawTooltip(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get allIngredients(): Stream<ITypedIngredient<any>>;
    get allIngredientsList(): ITypedIngredient<any>[];
    get areaIncludingBackground(): Rect2i;
    get displayedIngredient(): Optional<ITypedIngredient<any>>;
    get rect(): Rect2i;
    get role(): RecipeIngredientRole;
    get slotName(): Optional<string>;
    get tooltip(): Component[];
    getDisplayedIngredient<T>(ingredientType: IIngredientType<T>): Optional<T>;
    getTooltip(tooltipBuilder: ITooltipBuilder): void;
    isEmpty(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    setPosition(x: number, y: number): void;
    toString(): string;
  }


  class RendererOverrides {
    addOverride<T>(ingredientType: IIngredientType<T>, ingredientRenderer: IIngredientRenderer<T>): void;
    get ingredientHeight(): number;
    get ingredientWidth(): number;
    getIngredientRenderer<T>(ingredientType: IIngredientType<T>): Optional<IIngredientRenderer<T>>;
  }


  interface TagContentTooltipComponent<T = any> extends ClientTooltipComponent, TooltipComponent {}
  class TagContentTooltipComponent<T = any> extends ClientTooltipComponent {
    constructor(renderer: IIngredientRenderer<T>, ingredients: T[]);
    get height(): number;
    getWidth(font: Font): number;
    renderImage(font: Font, x: number, y: number, guiGraphics: GuiGraphics): void;
  }

}

declare module 'mezz.jei.library.gui.recipes' {
  import { IRecipeSlotRichTooltipCallback, IRecipeSlotView, IRecipeSlotDrawable, IRecipeSlotsView, IRecipeSlotDrawablesView } from 'mezz.jei.api.gui.ingredient';
  import { Supplier } from 'java.util.function';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeType, IFocusGroup, RecipeIngredientRole, IFocus } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder, IRecipeWidget, ISlottedRecipeWidget, IScrollBoxWidget, IScrollGridWidget, ITextWidget } from 'mezz.jei.api.gui.widgets';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Collection, List, Optional, Map } from 'java.util';
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { IScalableDrawable, IDrawable } from 'mezz.jei.api.gui.drawable';
  import { ImmutablePoint2i } from 'mezz.jei.common.util';
  import { CycleTicker } from 'mezz.jei.library.gui.ingredients';
  import { IIngredientManager, IRecipesGui } from 'mezz.jei.api.runtime';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { IIngredientType, IIngredientSupplier, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { RecipeSlotUnderMouse, IJeiInputHandler, IJeiGuiEventListener, IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { IPlaceable } from 'mezz.jei.api.gui.placement';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { IngredientSlotBuilder } from 'mezz.jei.library.gui.recipes.supplier.builder';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Key } from 'InputConstants';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { JeiTooltip } from 'mezz.jei.common.gui';

  interface IngredientsTooltipCallback extends IRecipeSlotRichTooltipCallback {}
  class IngredientsTooltipCallback extends IRecipeSlotRichTooltipCallback {
    constructor(supplier: Supplier<IRecipeLayoutDrawable<any>>);
    onRichTooltip(recipeSlotView: IRecipeSlotView, tooltip: ITooltipBuilder): void;
  }


  interface OutputSlotTooltipCallback extends IRecipeSlotRichTooltipCallback {}
  class OutputSlotTooltipCallback extends IRecipeSlotRichTooltipCallback {
    constructor(recipeName: ResourceLocation, recipeType: RecipeType<any>);
    onRichTooltip(recipeSlotView: IRecipeSlotView, tooltip: ITooltipBuilder): void;
  }


  interface RecipeLayout<R = any> extends IRecipeLayoutDrawable<R>, IRecipeExtrasBuilder {}
  class RecipeLayout<R = any> extends IRecipeLayoutDrawable<R> {
    static readonly RECIPE_BUTTON_SIZE: number;
    static readonly RECIPE_BUTTON_SPACING: number;
    constructor(recipeCategory: IRecipeCategory<R>, recipeCategoryDecorators: Collection<IRecipeCategoryDecorator<R>>, recipe: R, recipeBackground: IScalableDrawable, recipeBorderPadding: number, shapelessIcon: ShapelessIcon, recipeTransferButtonPos: ImmutablePoint2i, recipeCategorySlots: IRecipeSlotDrawable[], allSlots: IRecipeSlotDrawable[], cycleTicker: CycleTicker, focuses: IFocusGroup);
    addAnimatedRecipeArrow(ticksPerCycle: number): IPlaceable<any>;
    addAnimatedRecipeArrow(ticksPerCycle: number, xPos: number, yPos: number): void;
    addAnimatedRecipeFlame(cookTime: number): IPlaceable<any>;
    addAnimatedRecipeFlame(cookTime: number, xPos: number, yPos: number): void;
    addDrawable(drawable: IDrawable, xPos: number, yPos: number): void;
    addDrawable(drawable: IDrawable): IPlaceable<any>;
    addGuiEventListener(guiEventListener: IJeiGuiEventListener): void;
    addInputHandler(inputHandler: IJeiInputHandler): void;
    addRecipeArrow(): IPlaceable<any>;
    addRecipeArrow(xPos: number, yPos: number): void;
    addRecipePlusSign(): IPlaceable<any>;
    addRecipePlusSign(xPos: number, yPos: number): void;
    addScrollBoxWidget(width: number, height: number, xPos: number, yPos: number): IScrollBoxWidget;
    addScrollGridWidget(slots: IRecipeSlotDrawable[], columns: number, visibleRows: number): IScrollGridWidget;
    addSlottedWidget(widget: ISlottedRecipeWidget, slots: IRecipeSlotDrawable[]): void;
    addText(text: FormattedText[], maxWidth: number, maxHeight: number): ITextWidget;
    addText(text: FormattedText, maxWidth: number, maxHeight: number): ITextWidget;
    addText(text: FormattedText, xPos: number, yPos: number, maxWidth: number, maxHeight: number): ITextWidget;
    addText(text: FormattedText[], xPos: number, yPos: number, maxWidth: number, maxHeight: number): ITextWidget;
    addWidget(widget: IRecipeWidget): void;
    static create<T>(recipeCategory: IRecipeCategory<T>, decorators: Collection<IRecipeCategoryDecorator<T>>, recipe: T, focuses: IFocusGroup, ingredientManager: IIngredientManager, recipeBackground: IScalableDrawable, recipeBorderPadding: number): Optional<IRecipeLayoutDrawable<T>>;
    drawOverlays(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    drawRecipe(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    ensureRecipeExtrasAreCreated(): void;
    get inputHandler(): IJeiInputHandler;
    get recipe(): R;
    get recipeCategory(): IRecipeCategory<R>;
    get recipeSlots(): IRecipeSlotDrawablesView;
    get recipeSlotsView(): IRecipeSlotsView;
    get rect(): Rect2i;
    get rectWithBorder(): Rect2i;
    getIngredientUnderMouse<T>(mouseX: number, mouseY: number, ingredientType: IIngredientType<T>): Optional<T>;
    getRecipeSlotUnderMouse(mouseX: number, mouseY: number): Optional<IRecipeSlotDrawable>;
    getSideButtonArea(buttonIndex: number): Rect2i;
    getSlotUnderMouse(mouseX: number, mouseY: number): Optional<RecipeSlotUnderMouse>;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    setPosition(posX: number, posY: number): void;
    tick(): void;
  }


  interface RecipeLayoutIngredientSupplier extends IIngredientSupplier {}
  class RecipeLayoutIngredientSupplier extends IIngredientSupplier {
    constructor(ingredientSlotBuilders: Map<RecipeIngredientRole, IngredientSlotBuilder>);
    getIngredients(role: RecipeIngredientRole): ITypedIngredient<any>[];
  }


  interface RecipeLayoutInputHandler<T = any> extends IJeiInputHandler {}
  class RecipeLayoutInputHandler<T = any> extends IJeiInputHandler {
    constructor(recipeLayout: RecipeLayout<T>);
    addGuiEventListener(guiEventListener: IJeiGuiEventListener): void;
    addInputHandler(inputHandler: IJeiInputHandler): void;
    get area(): ScreenRectangle;
    handleInput(mouseX: number, mouseY: number, userInput: IJeiUserInput): boolean;
    handleMouseDragged(mouseX: number, mouseY: number, mouseKey: Key, dragX: number, dragY: number): boolean;
    handleMouseMoved(mouseX: number, mouseY: number): void;
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
  }


  interface RecipesGuiDummy extends IRecipesGui {}
  class RecipesGuiDummy extends IRecipesGui {
    static readonly INSTANCE: IRecipesGui;
    get parentScreen(): Optional<Screen>;
    getIngredientUnderMouse<T>(ingredientType: IIngredientType<T>): Optional<T>;
    show(focuses: IFocus<any>[]): void;
    show<V>(focus: IFocus<V>): void;
    showRecipes<T>(recipeCategory: IRecipeCategory<T>, recipes: T[], focuses: IFocus<any>[]): void;
    showTypes(recipeTypes: RecipeType<any>[]): void;
  }


  class ShapelessIcon {
    constructor(icon: IDrawable, x: number, y: number);
    addTooltip(tooltip: JeiTooltip): void;
    draw(guiGraphics: GuiGraphics): void;
    isMouseOver(mouseX: number, mouseY: number): boolean;
  }

}

declare module 'mezz.jei.library.gui.recipes.layout.builder' {
  import { IIngredientAcceptor, ITooltipBuilder, IRecipeLayoutBuilder, IRecipeSlotBuilder } from 'mezz.jei.api.gui.builder';
  import { List, Optional, Collection, Set } from 'java.util';
  import { IIngredientType, ITypedIngredient, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { IRecipeSlotRichTooltipCallback, IRecipeSlotTooltipCallback, IRecipeSlotView, IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { RecipeIngredientRole, IFocusGroup } from 'mezz.jei.api.recipe';
  import { ISlottedWidgetFactory } from 'mezz.jei.api.gui.widgets';
  import { RecipeLayout } from 'mezz.jei.library.gui.recipes';
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { IScalableDrawable, IDrawable } from 'mezz.jei.api.gui.drawable';
  import { Pair } from 'mezz.jei.core.util';
  import { Integer } from 'java.lang';
  import { ICycler } from 'mezz.jei.library.gui.ingredients';
  import { IntSet } from 'it.unimi.dsi.fastutil.ints';
  import { DisplayIngredientAcceptor } from 'mezz.jei.library.ingredients';
  import { HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';

  interface IngredientAcceptorVoid extends IIngredientAcceptor<IngredientAcceptorVoid> {}
  class IngredientAcceptorVoid extends IIngredientAcceptor<IngredientAcceptorVoid> {
    static readonly INSTANCE: IngredientAcceptorVoid;
    addFluidStack(fluid: Fluid): IngredientAcceptorVoid;
    addFluidStack(fluid: Fluid, amount: number): IngredientAcceptorVoid;
    addFluidStack(fluid: Fluid, amount: number, componentPatch: DataComponentPatch): IngredientAcceptorVoid;
    addIngredient<I>(ingredientType: IIngredientType<I>, ingredient: I): IngredientAcceptorVoid;
    addIngredients<I>(ingredientType: IIngredientType<I>, ingredients: I[]): IngredientAcceptorVoid;
    addIngredients(ingredient: Ingredient): THIS;
    addIngredientsUnsafe(ingredients: any[]): IngredientAcceptorVoid;
    addOptionalTypedIngredients(ingredients: Optional<ITypedIngredient<any>>[]): IngredientAcceptorVoid;
    addTypedIngredients(ingredients: ITypedIngredient<any>[]): IngredientAcceptorVoid;
  }


  interface LegacyTooltipCallbackAdapter extends IRecipeSlotRichTooltipCallback {}
  class LegacyTooltipCallbackAdapter extends IRecipeSlotRichTooltipCallback {
    constructor(callback: IRecipeSlotTooltipCallback);
    onRichTooltip(recipeSlotView: IRecipeSlotView, tooltip: ITooltipBuilder): void;
  }


  interface RecipeLayoutBuilder<T = any> extends IRecipeLayoutBuilder {}
  class RecipeLayoutBuilder<T = any> extends IRecipeLayoutBuilder {
    constructor(recipeCategory: IRecipeCategory<T>, recipe: T, ingredientManager: IIngredientManager);
    addInvisibleIngredients(role: RecipeIngredientRole): IIngredientAcceptor<any>;
    addSlot(role: RecipeIngredientRole): IRecipeSlotBuilder;
    addSlot(role: RecipeIngredientRole, x: number, y: number): IRecipeSlotBuilder;
    addSlotToWidget(role: RecipeIngredientRole, widgetFactory: ISlottedWidgetFactory<any>): IRecipeSlotBuilder;
    buildRecipeLayout(focuses: IFocusGroup, decorators: Collection<IRecipeCategoryDecorator<T>>, recipeBackground: IScalableDrawable, recipeBorderPadding: number): RecipeLayout<T>;
    createFocusLink(...slots: IIngredientAcceptor<any>[]): void;
    moveRecipeTransferButton(posX: number, posY: number): void;
    setShapeless(): void;
    setShapeless(posX: number, posY: number): void;
  }


  interface RecipeSlotBuilder extends IRecipeSlotBuilder {}
  class RecipeSlotBuilder extends IRecipeSlotBuilder {
    constructor(ingredientManager: IIngredientManager, slotIndex: number, role: RecipeIngredientRole);
    addFluidStack(fluid: Fluid): IRecipeSlotBuilder;
    addFluidStack(fluid: Fluid, amount: number): IRecipeSlotBuilder;
    addFluidStack(fluid: Fluid, amount: number, componentPatch: DataComponentPatch): IRecipeSlotBuilder;
    addIngredient<I>(ingredientType: IIngredientType<I>, ingredient: I): IRecipeSlotBuilder;
    addIngredients<I>(ingredientType: IIngredientType<I>, ingredients: I[]): IRecipeSlotBuilder;
    addIngredients(ingredient: Ingredient): THIS;
    addIngredientsUnsafe(ingredients: any[]): IRecipeSlotBuilder;
    addOptionalTypedIngredients(ingredients: Optional<ITypedIngredient<any>>[]): IRecipeSlotBuilder;
    addRichTooltipCallback(tooltipCallback: IRecipeSlotRichTooltipCallback): IRecipeSlotBuilder;
    addTooltipCallback(tooltipCallback: IRecipeSlotTooltipCallback): IRecipeSlotBuilder;
    addTypedIngredients(ingredients: ITypedIngredient<any>[]): IRecipeSlotBuilder;
    assignToWidgetFactory(widgetFactory: ISlottedWidgetFactory<any>): RecipeSlotBuilder;
    build(focusGroup: IFocusGroup, cycler: ICycler): Pair<number, IRecipeSlotDrawable>;
    build(focusMatches: Set<number>, cycler: ICycler): Pair<number, IRecipeSlotDrawable>;
    get assignedWidget(): ISlottedWidgetFactory<any>;
    get height(): number;
    get ingredientAcceptor(): DisplayIngredientAcceptor;
    get role(): RecipeIngredientRole;
    get width(): number;
    getMatches(focuses: IFocusGroup): IntSet;
    setBackground(background: IDrawable, xOffset: number, yOffset: number): IRecipeSlotBuilder;
    setCustomRenderer<T>(ingredientType: IIngredientType<T>, ingredientRenderer: IIngredientRenderer<T>): IRecipeSlotBuilder;
    setFluidRenderer(capacity: number, showCapacity: boolean, width: number, height: number): IRecipeSlotBuilder;
    setOutputSlotBackground(): IRecipeSlotBuilder;
    setOverlay(overlay: IDrawable, xOffset: number, yOffset: number): IRecipeSlotBuilder;
    setPosition(xPos: number, yPos: number): IRecipeSlotBuilder;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): THIS;
    setSlotName(slotName: string): IRecipeSlotBuilder;
    setStandardSlotBackground(): IRecipeSlotBuilder;
  }

}

declare module 'mezz.jei.library.gui.recipes.layout.builder.RecipeLayoutBuilder' {
  import { Supplier } from 'java.util.function';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';

  interface LayoutSupplier extends Supplier<IRecipeLayoutDrawable> {}
  class LayoutSupplier extends Supplier<IRecipeLayoutDrawable> {
    get (): IRecipeLayoutDrawable<any>;
  }

}

declare module 'mezz.jei.library.gui.recipes.supplier.builder' {
  import { IRecipeSlotBuilder, IRecipeLayoutBuilder, IIngredientAcceptor } from 'mezz.jei.api.gui.builder';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { IIngredientType, ITypedIngredient, IIngredientRenderer, IIngredientSupplier } from 'mezz.jei.api.ingredients';
  import { List, Optional } from 'java.util';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeSlotTooltipCallback, IRecipeSlotRichTooltipCallback } from 'mezz.jei.api.gui.ingredient';
  import { HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { ISlottedWidgetFactory } from 'mezz.jei.api.gui.widgets';

  interface IngredientSlotBuilder extends IRecipeSlotBuilder {}
  class IngredientSlotBuilder extends IRecipeSlotBuilder {
    constructor(ingredientManager: IIngredientManager);
    addFluidStack(fluid: Fluid): IRecipeSlotBuilder;
    addFluidStack(fluid: Fluid, amount: number): IRecipeSlotBuilder;
    addFluidStack(fluid: Fluid, amount: number, componentPatch: DataComponentPatch): IRecipeSlotBuilder;
    addIngredient<I>(ingredientType: IIngredientType<I>, ingredient: I): IRecipeSlotBuilder;
    addIngredients<I>(ingredientType: IIngredientType<I>, ingredients: I[]): IRecipeSlotBuilder;
    addIngredients(ingredient: Ingredient): THIS;
    addIngredientsUnsafe(ingredients: any[]): IRecipeSlotBuilder;
    addOptionalTypedIngredients(ingredients: Optional<ITypedIngredient<any>>[]): IRecipeSlotBuilder;
    addRichTooltipCallback(tooltipCallback: IRecipeSlotRichTooltipCallback): IRecipeSlotBuilder;
    addTooltipCallback(tooltipCallback: IRecipeSlotTooltipCallback): IRecipeSlotBuilder;
    addTypedIngredients(ingredients: ITypedIngredient<any>[]): IRecipeSlotBuilder;
    get allIngredients(): ITypedIngredient<any>[];
    get height(): number;
    get width(): number;
    setBackground(background: IDrawable, xOffset: number, yOffset: number): IRecipeSlotBuilder;
    setCustomRenderer<T>(ingredientType: IIngredientType<T>, ingredientRenderer: IIngredientRenderer<T>): IRecipeSlotBuilder;
    setFluidRenderer(capacity: number, showCapacity: boolean, width: number, height: number): IRecipeSlotBuilder;
    setOutputSlotBackground(): IRecipeSlotBuilder;
    setOverlay(overlay: IDrawable, xOffset: number, yOffset: number): IRecipeSlotBuilder;
    setPosition(xPos: number, yPos: number): IRecipeSlotBuilder;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): IRecipeSlotBuilder;
    setSlotName(slotName: string): IRecipeSlotBuilder;
    setStandardSlotBackground(): IRecipeSlotBuilder;
  }


  interface IngredientSupplierBuilder extends IRecipeLayoutBuilder {}
  class IngredientSupplierBuilder extends IRecipeLayoutBuilder {
    constructor(ingredientManager: IIngredientManager);
    addInvisibleIngredients(role: RecipeIngredientRole): IIngredientAcceptor<any>;
    addSlot(role: RecipeIngredientRole, x: number, y: number): IRecipeSlotBuilder;
    addSlot(role: RecipeIngredientRole): IRecipeSlotBuilder;
    addSlotToWidget(role: RecipeIngredientRole, widgetFactory: ISlottedWidgetFactory<any>): IRecipeSlotBuilder;
    buildIngredientSupplier(): IIngredientSupplier;
    createFocusLink(...slots: IIngredientAcceptor<any>[]): void;
    moveRecipeTransferButton(posX: number, posY: number): void;
    setShapeless(): void;
    setShapeless(posX: number, posY: number): void;
  }

}

declare module 'mezz.jei.library.gui.widgets' {
  import { IRecipeWidget, IScrollBoxWidget, IScrollGridWidget, ISlottedRecipeWidget, IScrollGridWidgetFactory, IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { IJeiInputHandler, IJeiUserInput, RecipeSlotUnderMouse } from 'mezz.jei.api.gui.inputs';
  import { ImmutableRect2i, ImmutableSize2i } from 'mezz.jei.common.util';
  import { ScreenRectangle, ScreenPosition } from 'net.minecraft.client.gui.navigation';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Key } from 'InputConstants';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { List, Optional } from 'java.util';
  import { FormattedText } from 'net.minecraft.network.chat';
  import { IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { HorizontalAlignment, VerticalAlignment } from 'mezz.jei.api.gui.placement';

  interface AbstractScrollWidget extends IRecipeWidget, IJeiInputHandler {}
  class AbstractScrollWidget extends IRecipeWidget {
    constructor(area: ImmutableRect2i);
    drawWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get area(): ScreenRectangle;
    get position(): ScreenPosition;
    static get scrollBoxScrollbarExtraWidth(): number;
    handleInput(mouseX: number, mouseY: number, userInput: IJeiUserInput): boolean;
    handleMouseDragged(mouseX: number, mouseY: number, mouseKey: Key, dragX: number, dragY: number): boolean;
    handleMouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
  }


  interface DrawableWidget extends IRecipeWidget {}
  class DrawableWidget extends IRecipeWidget {
    constructor(drawable: IDrawable, xPos: number, yPos: number);
    drawWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get position(): ScreenPosition;
  }


  interface ScrollBoxRecipeWidget extends IScrollBoxWidget, IJeiInputHandler, AbstractScrollWidget {}
  class ScrollBoxRecipeWidget extends IScrollBoxWidget {
    constructor(width: number, height: number, xPos: number, yPos: number);
    get contentAreaHeight(): number;
    get contentAreaWidth(): number;
    setContents(contents: IDrawable): IScrollBoxWidget;
    setContents(text: FormattedText[]): IScrollBoxWidget;
  }


  interface ScrollGridRecipeWidget extends IScrollGridWidget, ISlottedRecipeWidget, IJeiInputHandler, AbstractScrollWidget {}
  class ScrollGridRecipeWidget extends IScrollGridWidget {
    constructor(area: ImmutableRect2i, columns: number, visibleRows: number, slots: IRecipeSlotDrawable[]);
    static calculateSize(columns: number, visibleRows: number): ImmutableSize2i;
    static create(slots: IRecipeSlotDrawable[], columns: number, visibleRows: number): ScrollGridRecipeWidget;
    get height(): number;
    get screenRectangle(): ScreenRectangle;
    get width(): number;
    getSlotUnderMouse(mouseX: number, mouseY: number): Optional<RecipeSlotUnderMouse>;
    setPosition(xPos: number, yPos: number): ScrollGridRecipeWidget;
    setPosition(areaX: number, areaY: number, areaWidth: number, areaHeight: number, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): THIS;
  }


  interface ScrollGridWidgetFactory<R = any> extends IScrollGridWidgetFactory<R> {}
  class ScrollGridWidgetFactory<R = any> extends IScrollGridWidgetFactory<R> {
    constructor(columns: number, visibleRows: number);
    createWidgetForSlots(builder: IRecipeExtrasBuilder, recipe: R, slots: IRecipeSlotDrawable[]): void;
    get area(): ScreenRectangle;
    setPosition(x: number, y: number): void;
  }

}

declare module 'mezz.jei.library.helpers' {
  import { ICodecHelper, IModIdHelper } from 'mezz.jei.api.helpers';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { IFocusFactory, IRecipeManager, RecipeType } from 'mezz.jei.api.recipe';
  import { Codec, MapCodec } from 'com.mojang.serialization';
  import { IIngredientType, ITypedIngredient, IIngredientHelper } from 'mezz.jei.api.ingredients';
  import { RecipeHolder } from 'net.minecraft.world.item.crafting';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IModIdFormatConfig } from 'mezz.jei.library.config';
  import { ImmutableSetMultimap } from 'com.google.common.collect';
  import { List, Optional, Set } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface CodecHelper extends ICodecHelper {}
  class CodecHelper extends ICodecHelper {
    constructor(ingredientManager: IIngredientManager, focusFactory: IFocusFactory);
    get ingredientTypeCodec(): Codec<IIngredientType<any>>;
    get recipeHolderCodec<T extends RecipeHolder<any>>(): Codec<T>;
    get typedIngredientCodec(): MapCodec<ITypedIngredient<any>>;
    getRecipeTypeCodec(recipeManager: IRecipeManager): Codec<RecipeType<any>>;
    getSlowRecipeCategoryCodec<T>(recipeCategory: IRecipeCategory<T>, recipeManager: IRecipeManager): Codec<T>;
    getTypedIngredientCodec<T>(ingredientType: IIngredientType<T>): Codec<ITypedIngredient<T>>;
  }


  interface ModIdHelper extends IModIdHelper {}
  class ModIdHelper extends IModIdHelper {
    constructor(modIdFormattingConfig: IModIdFormatConfig, ingredientManager: IIngredientManager, modAliases: ImmutableSetMultimap<string, string>);
    addModNameToIngredientTooltip<T>(tooltip: Component[], ingredient: T, ingredientHelper: IIngredientHelper<T>): Component[];
    addModNameToIngredientTooltip<T>(tooltip: Component[], typedIngredient: ITypedIngredient<T>): Component[];
    getFormattedModNameForModId(modId: string): string;
    getModAliases(modId: string): Set<string>;
    getModNameForModId(modId: string): string;
    getModNameForTooltip<T>(typedIngredient: ITypedIngredient<T>): Optional<Component>;
    isDisplayingModNameEnabled(): boolean;
  }

}

declare module 'mezz.jei.library.ingredients' {
  import { IIngredientAcceptor, IClickableIngredientFactory } from 'mezz.jei.api.gui.builder';
  import { IIngredientManager, IIngredientFilter, IClickableIngredient, IIngredientVisibility } from 'mezz.jei.api.runtime';
  import { List, Optional, Collection, AbstractSet, Iterator, SequencedMap } from 'java.util';
  import { IIngredientType, ITypedIngredient, IIngredientHelper, IIngredientRenderer, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { Ingredient } from 'net.minecraft.world.item.crafting';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { IntSet } from 'it.unimi.dsi.fastutil.ints';
  import { IFocusGroup, RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { IIngredientListener } from 'mezz.jei.api.runtime.IIngredientManager';
  import { Codec } from 'com.mojang.serialization';
  import { Class } from 'java.lang';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { IClientToggleState } from 'mezz.jei.common.config';
  import { EditModeConfig } from 'mezz.jei.library.config';
  import { IListener } from 'mezz.jei.api.runtime.IIngredientVisibility';
  import { ItemStack } from 'net.minecraft.world.item';

  interface DisplayIngredientAcceptor extends IIngredientAcceptor<DisplayIngredientAcceptor> {}
  class DisplayIngredientAcceptor extends IIngredientAcceptor<DisplayIngredientAcceptor> {
    constructor(ingredientManager: IIngredientManager);
    addFluidStack(fluid: Fluid): DisplayIngredientAcceptor;
    addFluidStack(fluid: Fluid, amount: number): DisplayIngredientAcceptor;
    addFluidStack(fluid: Fluid, amount: number, componentPatch: DataComponentPatch): DisplayIngredientAcceptor;
    addIngredient<T>(ingredientType: IIngredientType<T>, ingredient: T): DisplayIngredientAcceptor;
    addIngredient<I>(var1: IIngredientType<I>, var2: I): THIS;
    addIngredients<T>(ingredientType: IIngredientType<T>, ingredients: T[]): DisplayIngredientAcceptor;
    addIngredients(ingredient: Ingredient): DisplayIngredientAcceptor;
    addIngredients<I>(var1: IIngredientType<I>, var2: I[]): THIS;
    addIngredientsUnsafe(ingredients: any[]): DisplayIngredientAcceptor;
    addOptionalTypedIngredients(ingredients: Optional<ITypedIngredient<any>>[]): DisplayIngredientAcceptor;
    addTypedIngredient<I>(typedIngredient: ITypedIngredient<I>): DisplayIngredientAcceptor;
    addTypedIngredients(ingredients: ITypedIngredient<any>[]): DisplayIngredientAcceptor;
    get allIngredients(): ITypedIngredient<any>[];
    getMatches(focusGroup: IFocusGroup, role: RecipeIngredientRole): IntSet;
  }


  interface IngredientBlacklistInternal extends IIngredientListener {}
  class IngredientBlacklistInternal extends IIngredientListener {
    addIngredientToBlacklist<V>(typedIngredient: ITypedIngredient<V>, ingredientHelper: IIngredientHelper<V>): void;
    isIngredientBlacklistedByApi<V>(typedIngredient: ITypedIngredient<V>, ingredientHelper: IIngredientHelper<V>): boolean;
    onIngredientsAdded<V>(ingredientHelper: IIngredientHelper<V>, ingredients: Collection<ITypedIngredient<V>>): void;
    onIngredientsRemoved<V>(ingredientHelper: IIngredientHelper<V>, ingredients: Collection<ITypedIngredient<V>>): void;
    registerListener(ingredientVisibility: IngredientVisibility): void;
    removeIngredientFromBlacklist<V>(typedIngredient: ITypedIngredient<V>, ingredientHelper: IIngredientHelper<V>): void;
  }


  interface IngredientFilterApiDummy extends IIngredientFilter {}
  class IngredientFilterApiDummy extends IIngredientFilter {
    static readonly INSTANCE: IIngredientFilter;
    get filterText(): string;
    getFilteredIngredients<T>(ingredientType: IIngredientType<T>): T[];
    set filterText(filterText: string);
  }


  class IngredientInfo<T = any> {
    constructor(ingredientType: IIngredientType<T>, ingredients: Collection<ITypedIngredient<T>>, ingredientHelper: IIngredientHelper<T>, ingredientRenderer: IIngredientRenderer<T>, ingredientCodec: Codec<T>);
    addIngredientAlias(ingredient: T, alias: string): void;
    addIngredientAlias(ingredient: ITypedIngredient<T>, alias: string): void;
    addIngredientAliases(ingredient: T, aliases: Collection<string>): void;
    addIngredientAliases(ingredient: ITypedIngredient<T>, aliases: Collection<string>): void;
    addIngredients(ingredients: Collection<ITypedIngredient<T>>): void;
    get allIngredients(): Collection<T>;
    get allTypedIngredients(): Collection<ITypedIngredient<T>>;
    get ingredientCodec(): Codec<T>;
    get ingredientHelper(): IIngredientHelper<T>;
    get ingredientRenderer(): IIngredientRenderer<T>;
    get ingredientType(): IIngredientType<T>;
    getIngredientAliases(ingredient: ITypedIngredient<T>): Collection<string>;
    getIngredientByLegacyUid(uid: string): Optional<T>;
    removeIngredients(ingredients: Collection<ITypedIngredient<T>>): void;
  }


  interface IngredientManager extends IIngredientManager {}
  class IngredientManager extends IIngredientManager {
    constructor(registeredIngredients: RegisteredIngredients);
    addIngredientsAtRuntime<V>(ingredientType: IIngredientType<V>, ingredients: Collection<V>): void;
    createClickableIngredient<V>(ingredientType: IIngredientType<V>, ingredient: V, area: Rect2i, normalize: boolean): Optional<IClickableIngredient<V>>;
    createClickableIngredient<V>(ingredient: V, area: Rect2i, normalize: boolean): Optional<IClickableIngredient<V>>;
    createTypedIngredient<V>(ingredientType: IIngredientType<V>, ingredient: V, normalize: boolean): Optional<ITypedIngredient<V>>;
    createTypedIngredient<T>(ingredient: T, normalize: boolean): Optional<ITypedIngredient<T>>;
    createTypedIngredient<V>(ingredientType: IIngredientType<V>, ingredient: V): Optional<ITypedIngredient<V>>;
    createTypedIngredient<V>(ingredient: V): Optional<ITypedIngredient<V>>;
    get clickableIngredientFactory(): IClickableIngredientFactory;
    get registeredIngredientTypes(): Collection<IIngredientType<any>>;
    getAllIngredients<V>(ingredientType: IIngredientType<V>): Collection<V>;
    getAllTypedIngredients<V>(ingredientType: IIngredientType<V>): Collection<ITypedIngredient<V>>;
    getIngredientAliases(ingredient: ITypedIngredient<any>): Collection<string>;
    getIngredientByUid<V>(ingredientType: IIngredientType<V>, ingredientUuid: string): Optional<V>;
    getIngredientCodec<V>(ingredientType: IIngredientType<V>): Codec<V>;
    getIngredientHelper<V>(ingredient: V): IIngredientHelper<V>;
    getIngredientHelper<V>(ingredientType: IIngredientType<V>): IIngredientHelper<V>;
    getIngredientRenderer<V>(ingredient: V): IIngredientRenderer<V>;
    getIngredientRenderer<V>(ingredientType: IIngredientType<V>): IIngredientRenderer<V>;
    getIngredientType<V>(ingredient: V): IIngredientType<V>;
    getIngredientTypeChecked<V>(ingredient: V): Optional<IIngredientType<V>>;
    getIngredientTypeChecked<V>(ingredientClass: Class<V>): Optional<IIngredientType<V>>;
    getIngredientTypeForUid(ingredientTypeUid: string): Optional<IIngredientType<any>>;
    getIngredientTypeWithSubtypesFromBase<B, I>(baseIngredient: B): Optional<IIngredientTypeWithSubtypes<B, I>>;
    getTypedIngredientByUid<V>(ingredientType: IIngredientType<V>, ingredientUuid: string): Optional<ITypedIngredient<V>>;
    normalizeTypedIngredient<V>(typedIngredient: ITypedIngredient<V>): ITypedIngredient<V>;
    registerIngredientListener(listener: IIngredientListener): void;
    removeIngredientsAtRuntime<V>(ingredientType: IIngredientType<V>, ingredients: Collection<V>): void;
  }


  interface IngredientSet<V = any> extends AbstractSet<V> {}
  class IngredientSet<V = any> extends AbstractSet<V> {
    constructor(ingredientHelper: IIngredientHelper<V>, context: UidContext);
    add(value: V): boolean;
    clear(): void;
    contains(o: any): boolean;
    getByLegacyUid(uid: string): Optional<V>;
    iterator(): Iterator<V>;
    remove(value: any): boolean;
    removeAll(c: Collection<any>): boolean;
    size(): number;
  }


  interface IngredientVisibility extends IIngredientVisibility {}
  class IngredientVisibility extends IIngredientVisibility {
    constructor(blacklist: IngredientBlacklistInternal, toggleState: IClientToggleState, editModeConfig: EditModeConfig, ingredientManager: IIngredientManager);
    isIngredientVisible<V>(typedIngredient: ITypedIngredient<V>): boolean;
    isIngredientVisible<V>(ingredientType: IIngredientType<V>, ingredient: V): boolean;
    isIngredientVisible<V>(typedIngredient: ITypedIngredient<V>, ingredientHelper: IIngredientHelper<V>): boolean;
    notifyListeners<V>(ingredient: ITypedIngredient<V>, visible: boolean): void;
    registerListener(listener: IListener): void;
  }


  class RegisteredIngredients {
    constructor(ingredientInfoList: SequencedMap<IIngredientType<any>, IngredientInfo<any>>);
    get ingredientTypes(): IIngredientType<any>[];
    getIngredientInfo<V>(ingredientType: IIngredientType<V>): IngredientInfo<V>;
    getIngredientType<V>(ingredient: V): IIngredientType<V>;
    getIngredientType<V>(ingredientClass: Class<V>): IIngredientType<V>;
    getIngredientTypeWithSubtypesFromBase<I, B>(baseIngredient: B): Optional<IIngredientTypeWithSubtypes<B, I>>;
  }


  interface SimpleIngredientAcceptor extends IIngredientAcceptor<SimpleIngredientAcceptor> {}
  class SimpleIngredientAcceptor extends IIngredientAcceptor<SimpleIngredientAcceptor> {
    constructor(ingredientManager: IIngredientManager);
    addFluidStack(fluid: Fluid): SimpleIngredientAcceptor;
    addFluidStack(fluid: Fluid, amount: number): SimpleIngredientAcceptor;
    addFluidStack(fluid: Fluid, amount: number, component: DataComponentPatch): SimpleIngredientAcceptor;
    addIngredient<T>(ingredientType: IIngredientType<T>, ingredient: T): SimpleIngredientAcceptor;
    addIngredient<I>(var1: IIngredientType<I>, var2: I): THIS;
    addIngredients<T>(ingredientType: IIngredientType<T>, ingredients: T[]): SimpleIngredientAcceptor;
    addIngredients<I>(var1: IIngredientType<I>, var2: I[]): THIS;
    addIngredients(ingredient: Ingredient): THIS;
    addIngredientsUnsafe(ingredients: any[]): SimpleIngredientAcceptor;
    addOptionalTypedIngredients(ingredients: Optional<ITypedIngredient<any>>[]): SimpleIngredientAcceptor;
    addTypedIngredient<I>(typedIngredient: ITypedIngredient<I>): SimpleIngredientAcceptor;
    addTypedIngredients(ingredients: ITypedIngredient<any>[]): SimpleIngredientAcceptor;
    get allIngredients(): ITypedIngredient<any>[];
  }


  interface TypedIngredient<T = any> extends ITypedIngredient<T> {}
  class TypedIngredient<T = any> extends ITypedIngredient<T> {
    static createAndFilterInvalid<T>(ingredientManager: IIngredientManager, ingredient: T, normalize: boolean): ITypedIngredient<any>;
    static createAndFilterInvalid<T>(ingredientManager: IIngredientManager, ingredientType: IIngredientType<T>, ingredient: T, normalize: boolean): ITypedIngredient<T>;
    static createAndFilterInvalid<T>(ingredientHelper: IIngredientHelper<T>, ingredientType: IIngredientType<T>, ingredient: T, normalize: boolean): ITypedIngredient<T>;
    static createAndFilterInvalidList<T>(ingredientManager: IIngredientManager, ingredientType: IIngredientType<T>, ingredients: T[], normalize: boolean): ITypedIngredient<T>[];
    static createAndFilterInvalidList(ingredientManager: IIngredientManager, ingredient: Ingredient, normalize: boolean): ITypedIngredient<ItemStack>[];
    static createAndFilterInvalidNonnullList<T>(ingredientManager: IIngredientManager, ingredientType: IIngredientType<T>, ingredients: Collection<T>, normalize: boolean): ITypedIngredient<T>[];
    static createUnvalidated<T>(ingredientType: IIngredientType<T>, ingredient: T): ITypedIngredient<T>;
    static defensivelyCopyTypedIngredientFromApi<T>(ingredientManager: IIngredientManager, value: ITypedIngredient<T>): ITypedIngredient<T>;
    get ingredient(): T;
    get type(): IIngredientType<T>;
    getIngredient<V>(ingredientType: IIngredientType<V>): Optional<V>;
    static normalize<T>(typedIngredient: ITypedIngredient<T>, ingredientHelper: IIngredientHelper<T>): ITypedIngredient<T>;
    toString(): string;
  }


  interface TypedIngredientSet<T = any> extends AbstractSet<ITypedIngredient> {}
  class TypedIngredientSet<T = any> extends AbstractSet<ITypedIngredient> {
    constructor(ingredientHelper: IIngredientHelper<T>, context: UidContext);
    add(value: ITypedIngredient<T>): boolean;
    addAll(c: Collection<ITypedIngredient<T>>): boolean;
    clear(): void;
    contains(value: any): boolean;
    getByLegacyUid(uid: string): Optional<ITypedIngredient<T>>;
    iterator(): Iterator<ITypedIngredient<T>>;
    remove(value: any): boolean;
    removeAll(c: Collection<any>): boolean;
    size(): number;
  }

}

declare module 'mezz.jei.library.ingredients.itemStacks' {
  import { Holder } from 'net.minecraft.core';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { ITypedIngredient, IIngredientTypeWithSubtypes, IIngredientType } from 'mezz.jei.api.ingredients';
  import { Optional } from 'java.util';

  interface FullTypedItemStack extends TypedItemStack {}
  class FullTypedItemStack extends TypedItemStack {
    constructor(itemHolder: Holder<Item>, dataComponentPatch: DataComponentPatch, count: number);
    toString(): string;
  }


  interface NormalizedTypedItem extends TypedItemStack {}
  class NormalizedTypedItem extends TypedItemStack {
    get normalized(): TypedItemStack;
    toString(): string;
  }


  interface NormalizedTypedItemStack extends TypedItemStack {}
  class NormalizedTypedItemStack extends TypedItemStack {
    constructor(itemHolder: Holder<Item>, dataComponentPatch: DataComponentPatch);
    get normalized(): TypedItemStack;
    toString(): string;
  }


  interface TypedItemStack extends ITypedIngredient<ItemStack> {}
  class TypedItemStack extends ITypedIngredient<ItemStack> {
    static create(ingredient: ItemStack): ITypedIngredient<ItemStack>;
    get ingredient(): ItemStack;
    get itemStack(): Optional<ItemStack>;
    get type(): IIngredientType<ItemStack>;
    getBaseIngredient<B>(ingredientType: IIngredientTypeWithSubtypes<B, ItemStack>): B;
    getIngredient<V>(ingredientType: IIngredientType<V>): Optional<V>;
    static normalize(typedIngredient: ITypedIngredient<ItemStack>): ITypedIngredient<ItemStack>;
  }

}

declare module 'mezz.jei.library.ingredients.subtypes' {
  import { ISubtypeInterpreter, IIngredientSubtypeInterpreter, UidContext, ISubtypeManager } from 'mezz.jei.api.ingredients.subtypes';
  import { IIngredientTypeWithSubtypes, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { ItemStack } from 'net.minecraft.world.item';

  interface LegacyInterpreterAdapter<T = any> extends ISubtypeInterpreter<T> {}
  class LegacyInterpreterAdapter<T = any> extends ISubtypeInterpreter<T> {
    constructor(legacyInterpreter: IIngredientSubtypeInterpreter<T>);
    getLegacyStringSubtypeInfo(ingredient: T, context: UidContext): string;
    getSubtypeData(ingredient: T, context: UidContext): any;
  }


  class SubtypeInterpreters {
    addInterpreter<B, I>(type: IIngredientTypeWithSubtypes<B, I>, base: B, interpreter: ISubtypeInterpreter<I>): boolean;
    addInterpreter<B, I>(type: IIngredientTypeWithSubtypes<B, I>, base: B, interpreter: IIngredientSubtypeInterpreter<I>): boolean;
    contains<B, T>(type: IIngredientTypeWithSubtypes<B, T>, ingredient: T): boolean;
    get<B, I>(type: IIngredientTypeWithSubtypes<B, I>, ingredient: I): ISubtypeInterpreter<I>;
    getFromBase<B, I>(type: IIngredientTypeWithSubtypes<B, I>, ingredientBase: B): ISubtypeInterpreter<I>;
  }


  interface SubtypeManager extends ISubtypeManager {}
  class SubtypeManager extends ISubtypeManager {
    constructor(interpreters: SubtypeInterpreters);
    getSubtypeData<T>(ingredientType: IIngredientTypeWithSubtypes<any, T>, ingredient: T, context: UidContext): any;
    getSubtypeData<B, T>(ingredientType: IIngredientTypeWithSubtypes<B, T>, typedIngredient: ITypedIngredient<T>, context: UidContext): any;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
    getSubtypeInfo<T>(ingredientType: IIngredientTypeWithSubtypes<any, T>, ingredient: T, context: UidContext): string;
    getSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    hasSubtypes<T, B>(ingredientType: IIngredientTypeWithSubtypes<B, T>, ingredient: T): boolean;
    hasSubtypes(ingredient: ItemStack): boolean;
  }

}

declare module 'mezz.jei.library.load' {
  import { List, Optional } from 'java.util';
  import { IModPlugin } from 'mezz.jei.api';
  import { Consumer } from 'java.util.function';
  import { AutoCloseable, Class } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { VanillaPlugin } from 'mezz.jei.library.plugins.vanilla';
  import { JeiInternalPlugin } from 'mezz.jei.library.plugins.jei';
  import { SubtypeManager } from 'mezz.jei.library.ingredients.subtypes';
  import { StartData } from 'mezz.jei.library.startup';
  import { IIngredientManager, IScreenHelper } from 'mezz.jei.api.runtime';
  import { IColorHelper, IJeiHelpers } from 'mezz.jei.api.helpers';
  import { IIngredientFilterConfig } from 'mezz.jei.common.config';
  import { ImmutableSetMultimap } from 'com.google.common.collect';
  import { JeiHelpers } from 'mezz.jei.library.runtime';
  import { IModIdFormatConfig, EditModeConfig, RecipeCategorySortingConfig } from 'mezz.jei.library.config';
  import { FocusFactory } from 'mezz.jei.library.focus';
  import { CodecHelper } from 'mezz.jei.library.helpers';
  import { IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { RecipeManager } from 'mezz.jei.library.recipes';

  class PluginCaller {
    static callOnPlugins(title: string, plugins: IModPlugin[], func: Consumer<IModPlugin>): void;
  }


  interface PluginCallerTimer extends AutoCloseable {}
  class PluginCallerTimer extends AutoCloseable {
    constructor();
    begin(title: string, pluginUid: ResourceLocation): void;
    close(): void;
    end(): void;
  }


  class PluginCallerTimerRunnable {
    constructor(title: string, pluginUid: ResourceLocation);
    check(): void;
    stop(): void;
  }


  class PluginHelper {
    static getPluginWithClass<T extends IModPlugin>(pluginClass: Class<T>, modPlugins: IModPlugin[]): Optional<T>;
    static sortPlugins(plugins: IModPlugin[], vanillaPlugin: VanillaPlugin, jeiInternalPlugin: JeiInternalPlugin): void;
  }


  class PluginLoader {
    static createGuiScreenHelper(plugins: IModPlugin[], jeiHelpers: IJeiHelpers, ingredientManager: IIngredientManager): IScreenHelper;
    static createJeiHelpers(modAliases: ImmutableSetMultimap<string, string>, modIdFormatConfig: IModIdFormatConfig, colorHelper: IColorHelper, editModeConfig: EditModeConfig, focusFactory: FocusFactory, codecHelper: CodecHelper, ingredientManager: IIngredientManager, subtypeManager: SubtypeManager): JeiHelpers;
    static createRecipeManager(plugins: IModPlugin[], vanillaPlugin: VanillaPlugin, recipeCategorySortingConfig: RecipeCategorySortingConfig, jeiHelpers: JeiHelpers, ingredientManager: IIngredientManager): RecipeManager;
    static createRecipeTransferManager(vanillaPlugin: VanillaPlugin, plugins: IModPlugin[], jeiHelpers: JeiHelpers, connectionToServer: IConnectionToServer): IRecipeTransferManager;
    static registerIngredients(data: StartData, subtypeManager: SubtypeManager, colorHelper: IColorHelper, ingredientFilterConfig: IIngredientFilterConfig): IIngredientManager;
    static registerModAliases(data: StartData, ingredientFilterConfig: IIngredientFilterConfig): ImmutableSetMultimap<string, string>;
    static registerSubtypes(data: StartData): SubtypeManager;
  }

}

declare module 'mezz.jei.library.load.registration' {
  import { IAdvancedRegistration, IGuiHandlerRegistration, IModIngredientRegistration, IIngredientAliasRegistration, IExtraIngredientRegistration, IModInfoRegistration, IRecipeCatalystRegistration, IRecipeCategoryRegistration, IRecipeRegistration, IRecipeTransferRegistration, IRuntimeRegistration, ISubtypeRegistration, IVanillaCategoryExtensionRegistration } from 'mezz.jei.api.registration';
  import { IJeiHelpers, IColorHelper, IStackHelper } from 'mezz.jei.api.helpers';
  import { IJeiFeatures, IScreenHelper, IIngredientManager, IEditModeConfig, IIngredientListOverlay, IBookmarkOverlay, IRecipesGui, IIngredientFilter } from 'mezz.jei.api.runtime';
  import { IRecipeManagerPluginHelper, IRecipeManagerPlugin, ISimpleRecipeManagerPlugin, IRecipeButtonControllerFactory } from 'mezz.jei.api.recipe.advanced';
  import { RecipeType, IFocus, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { List, Collection } from 'java.util';
  import { ImmutableListMultimap, ImmutableSetMultimap } from 'com.google.common.collect';
  import { Class } from 'java.lang';
  import { IGuiContainerHandler, IGlobalGuiHandler, IScreenHandler, IGhostIngredientHandler } from 'mezz.jei.api.gui.handlers';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ISubtypeManager, ISubtypeInterpreter, IIngredientSubtypeInterpreter } from 'mezz.jei.api.ingredients.subtypes';
  import { IIngredientType, IIngredientHelper, IIngredientRenderer, ITypedIngredient, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { Codec } from 'com.mojang.serialization';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { IngredientInfo } from 'mezz.jei.library.ingredients';
  import { ItemLike } from 'net.minecraft.world.level';
  import { JeiHelpers } from 'mezz.jei.library.runtime';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { RecipeManagerInternal } from 'mezz.jei.library.recipes';
  import { IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { Component } from 'net.minecraft.network.chat';
  import { IRecipeTransferHandlerHelper, IRecipeTransferInfo, IRecipeTransferHandler, IUniversalRecipeTransferHandler, IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { SubtypeInterpreters } from 'mezz.jei.library.ingredients.subtypes';
  import { IExtendableCraftingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.crafting';
  import { IExtendableSmithingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.smithing';

  interface AdvancedRegistration extends IAdvancedRegistration {}
  class AdvancedRegistration extends IAdvancedRegistration {
    constructor(jeiHelpers: IJeiHelpers, jeiFeatures: IJeiFeatures, pluginHelper: IRecipeManagerPluginHelper);
    addRecipeButtonFactory(recipeButtonControllerFactory: IRecipeButtonControllerFactory): void;
    addRecipeCategoryDecorator<T>(recipeType: RecipeType<T>, decorator: IRecipeCategoryDecorator<T>): void;
    addRecipeManagerPlugin(recipeManagerPlugin: IRecipeManagerPlugin): void;
    addTypedRecipeManagerPlugin<T>(recipeType: RecipeType<T>, recipeManagerPlugin: ISimpleRecipeManagerPlugin<T>): void;
    get jeiFeatures(): IJeiFeatures;
    get jeiHelpers(): IJeiHelpers;
    get recipeButtonControllerFactories(): IRecipeButtonControllerFactory[];
    get recipeCategoryDecorators(): ImmutableListMultimap<RecipeType<any>, IRecipeCategoryDecorator<any>>;
    get recipeManagerPluginHelper(): IRecipeManagerPluginHelper;
    get recipeManagerPlugins(): IRecipeManagerPlugin[];
  }


  interface GuiHandlerRegistration extends IGuiHandlerRegistration {}
  class GuiHandlerRegistration extends IGuiHandlerRegistration {
    constructor(jeiHelpers: IJeiHelpers);
    addGenericGuiContainerHandler<T extends AbstractContainerScreen<any>>(guiClass: Class<T>, guiHandler: IGuiContainerHandler<any>): void;
    addGhostIngredientHandler<T extends Screen>(guiClass: Class<T>, handler: IGhostIngredientHandler<T>): void;
    addGlobalGuiHandler(globalGuiHandler: IGlobalGuiHandler): void;
    addGuiContainerHandler<T extends AbstractContainerScreen<any>>(guiClass: Class<T>, guiHandler: IGuiContainerHandler<T>): void;
    addGuiScreenHandler<T extends Screen>(guiClass: Class<T>, handler: IScreenHandler<T>): void;
    createGuiScreenHelper(ingredientManager: IIngredientManager): IScreenHelper;
    get jeiHelpers(): IJeiHelpers;
  }


  interface IngredientManagerBuilder extends IModIngredientRegistration, IIngredientAliasRegistration, IExtraIngredientRegistration {}
  class IngredientManagerBuilder extends IModIngredientRegistration {
    constructor(subtypeManager: ISubtypeManager, colorHelper: IColorHelper);
    addAlias<I>(type: IIngredientType<I>, ingredient: I, alias: string): void;
    addAlias<I>(typedIngredient: ITypedIngredient<I>, alias: string): void;
    addAlias(itemStack: ItemStack, alias: string): void;
    addAliases<I>(type: IIngredientType<I>, ingredient: I, aliases: Collection<string>): void;
    addAliases<I>(typedIngredient: ITypedIngredient<I>, aliases: Collection<string>): void;
    addAliases<I>(type: IIngredientType<I>, ingredients: Collection<I>, alias: string): void;
    addAliases<I>(typedIngredients: Collection<ITypedIngredient<I>>, alias: string): void;
    addAliases<I>(type: IIngredientType<I>, ingredients: Collection<I>, aliases: Collection<string>): void;
    addAliases<I>(typedIngredients: Collection<ITypedIngredient<I>>, aliases: Collection<string>): void;
    addExtraIngredients<V>(ingredientType: IIngredientType<V>, extraIngredients: Collection<V>): void;
    build(): IIngredientManager;
    get colorHelper(): IColorHelper;
    get subtypeManager(): ISubtypeManager;
    register<V>(ingredientType: IIngredientType<V>, allIngredients: Collection<V>, ingredientHelper: IIngredientHelper<V>, ingredientRenderer: IIngredientRenderer<V>): void;
    register<V>(ingredientType: IIngredientType<V>, allIngredients: Collection<V>, ingredientHelper: IIngredientHelper<V>, ingredientRenderer: IIngredientRenderer<V>, ingredientCodec: Codec<V>): void;
  }


  class LegacyUidCodec {
    static create<T>(ingredientInfo: IngredientInfo<T>): Codec<T>;
  }


  interface ModInfoRegistration extends IModInfoRegistration {}
  class ModInfoRegistration extends IModInfoRegistration {
    addModAliases(modId: string, aliases: Collection<string>): void;
    addModAliases(modId: string, ...aliases: string[]): void;
    get modAliases(): ImmutableSetMultimap<string, string>;
  }


  interface RecipeCatalystRegistration extends IRecipeCatalystRegistration {}
  class RecipeCatalystRegistration extends IRecipeCatalystRegistration {
    constructor(ingredientManager: IIngredientManager, jeiHelpers: IJeiHelpers);
    addRecipeCatalyst<T>(ingredientType: IIngredientType<T>, ingredient: T, ...recipeTypes: RecipeType<any>[]): void;
    addRecipeCatalysts(recipeType: RecipeType<any>, ...ingredients: ItemLike[]): void;
    addRecipeCatalysts<T>(recipeType: RecipeType<any>, ingredientType: IIngredientType<T>, ingredients: T[]): void;
    get ingredientManager(): IIngredientManager;
    get jeiHelpers(): IJeiHelpers;
    get recipeCatalysts(): ImmutableListMultimap<RecipeType<any>, ITypedIngredient<any>>;
  }


  interface RecipeCategoryRegistration extends IRecipeCategoryRegistration {}
  class RecipeCategoryRegistration extends IRecipeCategoryRegistration {
    constructor(jeiHelpers: JeiHelpers);
    addRecipeCategories(...recipeCategories: IRecipeCategory<any>[]): void;
    get jeiHelpers(): IJeiHelpers;
    get recipeCategories(): IRecipeCategory<any>[];
  }


  interface RecipeManagerPluginHelper extends IRecipeManagerPluginHelper {}
  class RecipeManagerPluginHelper extends IRecipeManagerPluginHelper {
    constructor(recipeManager: RecipeManagerInternal);
    isRecipeCatalyst(recipeType: RecipeType<any>, focus: IFocus<any>): boolean;
  }


  interface RecipeRegistration extends IRecipeRegistration {}
  class RecipeRegistration extends IRecipeRegistration {
    constructor(jeiHelpers: IJeiHelpers, ingredientManager: IIngredientManager, recipeManager: RecipeManagerInternal);
    addIngredientInfo<T>(ingredient: T, ingredientType: IIngredientType<T>, ...descriptionComponents: Component[]): void;
    addIngredientInfo<T>(ingredients: T[], ingredientType: IIngredientType<T>, ...descriptionComponents: Component[]): void;
    addIngredientInfo(itemLike: ItemLike, ...descriptionComponents: Component[]): void;
    addRecipes<T>(recipeType: RecipeType<T>, recipes: T[]): void;
    get ingredientManager(): IIngredientManager;
    get jeiHelpers(): IJeiHelpers;
    get vanillaRecipeFactory(): IVanillaRecipeFactory;
  }


  interface RecipeTransferRegistration extends IRecipeTransferRegistration {}
  class RecipeTransferRegistration extends IRecipeTransferRegistration {
    constructor(stackHelper: IStackHelper, handlerHelper: IRecipeTransferHandlerHelper, jeiHelpers: IJeiHelpers, serverConnection: IConnectionToServer);
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(containerClass: Class<C>, menuType: MenuType<C>, recipeType: RecipeType<R>, recipeSlotStart: number, recipeSlotCount: number, inventorySlotStart: number, inventorySlotCount: number): void;
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(recipeTransferInfo: IRecipeTransferInfo<C, R>): void;
    addRecipeTransferHandler<C extends AbstractContainerMenu, R>(recipeTransferHandler: IRecipeTransferHandler<C, R>, recipeType: RecipeType<R>): void;
    addUniversalRecipeTransferHandler<C extends AbstractContainerMenu>(universalRecipeTransferHandler: IUniversalRecipeTransferHandler<C>): void;
    addUniversalRecipeTransferHandler<C extends AbstractContainerMenu, R>(recipeTransferHandler: IRecipeTransferHandler<C, R>): void;
    createRecipeTransferManager(): IRecipeTransferManager;
    get jeiHelpers(): IJeiHelpers;
    get transferHelper(): IRecipeTransferHandlerHelper;
  }


  interface RuntimeRegistration extends IRuntimeRegistration {}
  class RuntimeRegistration extends IRuntimeRegistration {
    constructor(recipeManager: IRecipeManager, jeiHelpers: IJeiHelpers, editModeConfig: IEditModeConfig, ingredientManager: IIngredientManager, recipeTransferManager: IRecipeTransferManager, screenHelper: IScreenHelper);
    get bookmarkOverlay(): IBookmarkOverlay;
    get editModeConfig(): IEditModeConfig;
    get ingredientFilter(): IIngredientFilter;
    get ingredientListOverlay(): IIngredientListOverlay;
    get ingredientManager(): IIngredientManager;
    get jeiHelpers(): IJeiHelpers;
    get recipeManager(): IRecipeManager;
    get recipeTransferManager(): IRecipeTransferManager;
    get recipesGui(): IRecipesGui;
    get screenHelper(): IScreenHelper;
    set bookmarkOverlay(bookmarkOverlay: IBookmarkOverlay);
    set ingredientFilter(ingredientFilter: IIngredientFilter);
    set ingredientListOverlay(ingredientListOverlay: IIngredientListOverlay);
    set recipesGui(recipesGui: IRecipesGui);
  }


  interface SubtypeRegistration extends ISubtypeRegistration {}
  class SubtypeRegistration extends ISubtypeRegistration {
    get interpreters(): SubtypeInterpreters;
    registerSubtypeInterpreter<B, I>(type: IIngredientTypeWithSubtypes<B, I>, base: B, interpreter: ISubtypeInterpreter<I>): void;
    registerSubtypeInterpreter<B, I>(type: IIngredientTypeWithSubtypes<B, I>, base: B, interpreter: IIngredientSubtypeInterpreter<I>): void;
    registerSubtypeInterpreter(item: Item, interpreter: ISubtypeInterpreter<ItemStack>): void;
    registerSubtypeInterpreter(item: Item, interpreter: IIngredientSubtypeInterpreter<ItemStack>): void;
  }


  interface TypedRecipeManagerPluginAdapter<T = any> extends IRecipeManagerPlugin {}
  class TypedRecipeManagerPluginAdapter<T = any> extends IRecipeManagerPlugin {
    constructor(helper: IRecipeManagerPluginHelper, recipeType: RecipeType<T>, plugin: ISimpleRecipeManagerPlugin<T>);
    getRecipeTypes<V>(focus: IFocus<V>): RecipeType<any>[];
    getRecipes<T2, V>(recipeCategory: IRecipeCategory<T2>, focus: IFocus<V>): T2[];
    getRecipes<T2>(recipeCategory: IRecipeCategory<T2>): T2[];
    getRecipes<T, V>(var1: IRecipeCategory<T>, var2: IFocus<V>): T[];
    getRecipes<T>(var1: IRecipeCategory<T>): T[];
  }


  interface VanillaCategoryExtensionRegistration extends IVanillaCategoryExtensionRegistration {}
  class VanillaCategoryExtensionRegistration extends IVanillaCategoryExtensionRegistration {
    constructor(craftingCategory: IExtendableCraftingRecipeCategory, smithingCategory: IExtendableSmithingRecipeCategory, jeiHelpers: JeiHelpers);
    get craftingCategory(): IExtendableCraftingRecipeCategory;
    get jeiHelpers(): IJeiHelpers;
    get smithingCategory(): IExtendableSmithingRecipeCategory;
  }

}

declare module 'mezz.jei.library.plugins.debug' {
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { IRecipeCategory, AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IRecipeSlotsView, IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { RecipeType, IFocusGroup } from 'mezz.jei.api.recipe';
  import { IPlatformFluidHelper, IGuiHelper, IJeiHelpers } from 'mezz.jei.api.helpers';
  import { Component } from 'net.minecraft.network.chat';
  import { IDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeLayoutBuilder, ITooltipBuilder, IClickableIngredientFactory } from 'mezz.jei.api.gui.builder';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGhostIngredientHandler } from 'mezz.jei.api.gui.handlers';
  import { IIngredientManager, IJeiRuntime, IClickableIngredient } from 'mezz.jei.api.runtime';
  import { List, Optional } from 'java.util';
  import { Target } from 'mezz.jei.api.gui.handlers.IGhostIngredientHandler';
  import { ITypedIngredient, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { Button } from 'net.minecraft.client.gui.components';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ISimpleRecipeManagerPlugin } from 'mezz.jei.api.recipe.advanced';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { CrashType } from 'mezz.jei.library.plugins.debug.ErrorRecipe';
  import { ISubtypeInterpreter, UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { IModPlugin } from 'mezz.jei.api';
  import { IModIngredientRegistration, IExtraIngredientRegistration, IIngredientAliasRegistration, IModInfoRegistration, IRecipeCategoryRegistration, IRecipeRegistration, IGuiHandlerRegistration, ISubtypeRegistration, IRecipeCatalystRegistration, IAdvancedRegistration } from 'mezz.jei.api.registration';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { BrewingStandScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { IIconButtonController, IButtonState } from 'mezz.jei.api.gui.buttons';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { Textures } from 'mezz.jei.common.gui.textures';

  interface DebugCategoryDecorator<T = any> extends IRecipeCategoryDecorator<T> {}
  class DebugCategoryDecorator<T = any> extends IRecipeCategoryDecorator<T> {
    draw(recipe: T, recipeCategory: IRecipeCategory<T>, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    static get instance<T>(): DebugCategoryDecorator<T>;
  }


  interface DebugFocusRecipeCategory<F = any> extends IRecipeCategory<DebugRecipe> {}
  class DebugFocusRecipeCategory<F = any> extends IRecipeCategory<DebugRecipe> {
    static readonly TYPE: RecipeType;
    static readonly RECIPE_WIDTH: number;
    static readonly RECIPE_HEIGHT: number;
    constructor(platformFluidHelper: IPlatformFluidHelper<F>);
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<DebugRecipe>;
    get title(): Component;
    get width(): number;
    getRegistryName(recipe: DebugRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: DebugRecipe, focuses: IFocusGroup): void;
  }


  interface DebugGhostIngredientHandler<T extends AbstractContainerScreen<any> = any> extends IGhostIngredientHandler<T> {}
  class DebugGhostIngredientHandler<T extends AbstractContainerScreen<any> = any> extends IGhostIngredientHandler<T> {
    constructor(ingredientManager: IIngredientManager);
    getTargetsTyped<I>(gui: T, typedIngredient: ITypedIngredient<I>, doStart: boolean): Target<I>[];
    onComplete(): void;
  }


  interface DebugGhostIngredientHandlerTwo<T extends AbstractContainerScreen<any> = any> extends IGhostIngredientHandler<T> {}
  class DebugGhostIngredientHandlerTwo<T extends AbstractContainerScreen<any> = any> extends IGhostIngredientHandler<T> {
    constructor(ingredientManager: IIngredientManager);
    getTargetsTyped<I>(gui: T, typedIngredient: ITypedIngredient<I>, doStart: boolean): Target<I>[];
    onComplete(): void;
  }


  class DebugRecipe {
    constructor();
    checkHover(mouseX: number, mouseY: number): boolean;
    get button(): Button;
    get registryName(): ResourceLocation;
  }


  interface DebugRecipeCategory<F = any> extends IRecipeCategory<DebugRecipe> {}
  class DebugRecipeCategory<F = any> extends IRecipeCategory<DebugRecipe> {
    static readonly TYPE: RecipeType;
    static readonly RECIPE_WIDTH: number;
    static readonly RECIPE_HEIGHT: number;
    constructor(guiHelper: IGuiHelper, platformFluidHelper: IPlatformFluidHelper<F>, ingredientManager: IIngredientManager);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: DebugRecipe, focuses: IFocusGroup): void;
    draw(recipe: DebugRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    get height(): number;
    get icon(): IDrawable;
    get recipeType(): RecipeType<DebugRecipe>;
    get title(): Component;
    get width(): number;
    getRegistryName(recipe: DebugRecipe): ResourceLocation;
    getTooltip(tooltip: ITooltipBuilder, recipe: DebugRecipe, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): void;
    needsRecipeBorder(): boolean;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: DebugRecipe, focuses: IFocusGroup): void;
    setRuntime(runtime: IJeiRuntime): void;
  }


  interface DebugSimpleRecipeManagerPlugin extends ISimpleRecipeManagerPlugin<RecipeHolder> {}
  class DebugSimpleRecipeManagerPlugin extends ISimpleRecipeManagerPlugin<RecipeHolder> {
    constructor(jeiHelpers: IJeiHelpers);
    get allRecipes(): RecipeHolder<CraftingRecipe>[];
    getRecipesForInput(input: ITypedIngredient<any>): RecipeHolder<CraftingRecipe>[];
    getRecipesForOutput(output: ITypedIngredient<any>): RecipeHolder<CraftingRecipe>[];
    isHandledInput(input: ITypedIngredient<any>): boolean;
    isHandledOutput(output: ITypedIngredient<any>): boolean;
  }


  class ErrorRecipe {
    constructor(type: CrashType);
    get type(): CrashType;
  }


  interface ErrorRecipeCategory extends AbstractRecipeCategory<ErrorRecipe> {}
  class ErrorRecipeCategory extends AbstractRecipeCategory<ErrorRecipe> {
    static readonly TYPE: RecipeType;
    constructor();
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: ErrorRecipe, focuses: IFocusGroup): void;
    draw(recipe: ErrorRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getRegistryName(recipe: ErrorRecipe): ResourceLocation;
    getTooltip(tooltip: ITooltipBuilder, recipe: ErrorRecipe, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): void;
    onDisplayedIngredientsUpdate(recipe: ErrorRecipe, recipeSlots: IRecipeSlotDrawable[], focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: ErrorRecipe, focuses: IFocusGroup): void;
  }


  interface FluidSubtypeHandlerTest<T = any> extends ISubtypeInterpreter<T> {}
  class FluidSubtypeHandlerTest<T = any> extends ISubtypeInterpreter<T> {
    constructor(fluidType: IIngredientTypeWithSubtypes<Fluid, T>);
    getLegacyStringSubtypeInfo(fluidStack: T, context: UidContext): string;
    getSubtypeData(ingredient: T, context: UidContext): any;
  }


  interface JeiDebugPlugin extends IModPlugin {}
  class JeiDebugPlugin extends IModPlugin {
    createButtonController<T>(recipeLayoutDrawable: IRecipeLayoutDrawable<T>, state: IButtonState, input: IJeiUserInput, tooltip: ITooltipBuilder): IIconButtonController;
    get pluginUid(): ResourceLocation;
    getClickableIngredientUnderMouse(factory: IClickableIngredientFactory, containerScreen: BrewingStandScreen, mouseX: number, mouseY: number): Optional<IClickableIngredient<any>>;
    getGuiExtraAreas(containerScreen: BrewingStandScreen): Rect2i[];
    onRuntimeAvailable(jeiRuntime: IJeiRuntime): void;
    registerAdvanced(registration: IAdvancedRegistration): void;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerExtraIngredients(registration: IExtraIngredientRegistration): void;
    registerFluidSubtypes<T>(registration: ISubtypeRegistration, platformFluidHelper: IPlatformFluidHelper<T>): void;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerIngredientAliases(registration: IIngredientAliasRegistration): void;
    registerIngredients(registration: IModIngredientRegistration): void;
    registerModInfo(registration: IModInfoRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }


  interface ObnoxiouslyLargeCategory extends AbstractRecipeCategory<ObnoxiouslyLargeRecipe> {}
  class ObnoxiouslyLargeCategory extends AbstractRecipeCategory<ObnoxiouslyLargeRecipe> {
    static readonly TYPE: RecipeType;
    constructor(helper: IGuiHelper, textures: Textures, ingredientManager: IIngredientManager);
    getRegistryName(recipe: ObnoxiouslyLargeRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: ObnoxiouslyLargeRecipe, focuses: IFocusGroup): void;
  }


  class ObnoxiouslyLargeRecipe {
    constructor();
    get recipeId(): ResourceLocation;
  }

}

declare module 'mezz.jei.library.plugins.debug.DebugRecipeCategory' {
  import { IJeiInputHandler, IJeiUserInput } from 'mezz.jei.api.gui.inputs';
  import { DebugRecipe } from 'mezz.jei.library.plugins.debug';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';

  interface JeiInputHandler extends IJeiInputHandler {}
  class JeiInputHandler extends IJeiInputHandler {
    constructor(recipe: DebugRecipe, area: ScreenRectangle);
    get area(): ScreenRectangle;
    handleInput(mouseX: number, mouseY: number, userInput: IJeiUserInput): boolean;
  }

}

declare module 'mezz.jei.library.plugins.debug.ErrorRecipe' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CrashType extends Enum<CrashType> {}
  class CrashType extends Enum<CrashType> {
    static readonly Draw: CrashType;
    static readonly SetRecipe: CrashType;
    static readonly CreateRecipeExtras: CrashType;
    static readonly OnDisplayedIngredientsUpdate: CrashType;
    static readonly GetTooltip: CrashType;
    static valueOf(name: string): CrashType;
    static values(): CrashType[];
  }

}

declare module 'mezz.jei.library.plugins.debug.ingredients' {
  import { IIngredientHelper, IIngredientType, IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection, List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipFlag } from 'net.minecraft.world.item';

  interface DebugIngredientHelper extends IIngredientHelper<DebugIngredient> {}
  class DebugIngredientHelper extends IIngredientHelper<DebugIngredient> {
    copyIngredient(ingredient: DebugIngredient): DebugIngredient;
    get ingredientType(): IIngredientType<DebugIngredient>;
    getDisplayName(ingredient: DebugIngredient): string;
    getErrorInfo(ingredient: DebugIngredient): string;
    getGroupingUid(ingredient: DebugIngredient): any;
    getResourceLocation(ingredient: DebugIngredient): ResourceLocation;
    getUid(ingredient: DebugIngredient, context: UidContext): any;
    getUniqueId(ingredient: DebugIngredient, context: UidContext): string;
    getWildcardId(ingredient: DebugIngredient): string;
  }


  class DebugIngredientListFactory {
    static create(start: number, end: number): Collection<DebugIngredient>;
  }


  interface DebugIngredientRenderer extends IIngredientRenderer<DebugIngredient> {}
  class DebugIngredientRenderer extends IIngredientRenderer<DebugIngredient> {
    constructor(ingredientHelper: IIngredientHelper<DebugIngredient>);
    getTooltip(ingredient: DebugIngredient, tooltipFlag: TooltipFlag): Component[];
    render(guiGraphics: GuiGraphics, ingredient: DebugIngredient): void;
  }


  interface ErrorIngredientHelper extends IIngredientHelper<ErrorIngredient> {}
  class ErrorIngredientHelper extends IIngredientHelper<ErrorIngredient> {
    copyIngredient(ingredient: ErrorIngredient): ErrorIngredient;
    get ingredientType(): IIngredientType<ErrorIngredient>;
    getDisplayName(ingredient: ErrorIngredient): string;
    getErrorInfo(ingredient: ErrorIngredient): string;
    getGroupingUid(ingredient: ErrorIngredient): any;
    getResourceLocation(ingredient: ErrorIngredient): ResourceLocation;
    getUid(ingredient: ErrorIngredient, context: UidContext): any;
    getUniqueId(ingredient: ErrorIngredient, context: UidContext): string;
    getWildcardId(ingredient: ErrorIngredient): string;
  }


  class ErrorIngredientListFactory {
    static create(): Collection<ErrorIngredient>;
  }


  interface ErrorIngredientRenderer extends IIngredientRenderer<ErrorIngredient> {}
  class ErrorIngredientRenderer extends IIngredientRenderer<ErrorIngredient> {
    constructor(ingredientHelper: IIngredientHelper<ErrorIngredient>);
    getTooltip(ingredient: ErrorIngredient, tooltipFlag: TooltipFlag): Component[];
    render(guiGraphics: GuiGraphics, ingredient: ErrorIngredient): void;
  }

}

declare module 'mezz.jei.library.plugins.debug.ingredients.ErrorIngredient' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CrashType extends Enum<CrashType> {}
  class CrashType extends Enum<CrashType> {
    static readonly RenderBreakVertexBufferCrash: CrashType;
    static readonly TooltipCrash: CrashType;
    static valueOf(name: string): CrashType;
    static values(): CrashType[];
  }

}

declare module 'mezz.jei.library.plugins.jei.info' {
  import { IJeiIngredientInfoRecipe } from 'mezz.jei.api.recipe.vanilla';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { List } from 'java.util';
  import { IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Textures } from 'mezz.jei.common.gui.textures';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface IngredientInfoRecipe extends IJeiIngredientInfoRecipe {}
  class IngredientInfoRecipe extends IJeiIngredientInfoRecipe {
    static create<T>(ingredientManager: IIngredientManager, ingredients: T[], ingredientType: IIngredientType<T>, ...descriptionComponents: Component[]): IJeiIngredientInfoRecipe;
    get description(): FormattedText[];
    get ingredients(): ITypedIngredient<any>[];
  }


  interface IngredientInfoRecipeCategory extends AbstractRecipeCategory<IJeiIngredientInfoRecipe> {}
  class IngredientInfoRecipeCategory extends AbstractRecipeCategory<IJeiIngredientInfoRecipe> {
    constructor(textures: Textures);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiIngredientInfoRecipe, focuses: IFocusGroup): void;
    getRegistryName(recipe: IJeiIngredientInfoRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiIngredientInfoRecipe, focuses: IFocusGroup): void;
  }

}

declare module 'mezz.jei.library.plugins.jei' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeCategoryRegistration, IRecipeRegistration } from 'mezz.jei.api.registration';

  interface JeiInternalPlugin extends IModPlugin {}
  class JeiInternalPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
  }

}

declare module 'mezz.jei.library.plugins.jei.tags' {
  import { TagKey } from 'net.minecraft.tags';
  import { List } from 'java.util';
  import { ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';

  class ITagInfoRecipe {
    get tag(): TagKey<any>;
    get typedIngredients(): ITypedIngredient<any>[];
  }


  interface TagInfoRecipe<B = any, I = any> extends ITagInfoRecipe {}
  class TagInfoRecipe<B = any, I = any> extends ITagInfoRecipe {
    constructor(tag: TagKey<B>, ingredients: ITypedIngredient<I>[]);
    get tag(): TagKey<B>;
    get typedIngredients(): ITypedIngredient<any>[];
  }


  interface TagInfoRecipeCategory<R extends ITagInfoRecipe = any, T extends RecipeType<R> = any> extends AbstractRecipeCategory<R> {}
  class TagInfoRecipeCategory<R extends ITagInfoRecipe = any, T extends RecipeType<R> = any> extends AbstractRecipeCategory<R> {
    constructor(guiHelper: IGuiHelper, recipeType: T, registryLocation: ResourceLocation);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: R, focuses: IFocusGroup): void;
    getRegistryName(recipe: R): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: R, focuses: IFocusGroup): void;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.anvil' {
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IJeiAnvilRecipe, IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { IGuiHelper, ICodecHelper } from 'mezz.jei.api.helpers';
  import { IRecipeLayoutBuilder, IIngredientAcceptor } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ISmithingCategoryExtension, IExtendableSmithingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.smithing';
  import { IPlatformRecipeHelper } from 'mezz.jei.common.platform';
  import { RecipeHolder, SmithingRecipe, SmithingTransformRecipe, SmithingTrimRecipe } from 'net.minecraft.world.item.crafting';
  import { IRecipeSlotDrawable } from 'mezz.jei.api.gui.ingredient';
  import { Codec } from 'com.mojang.serialization';
  import { Class } from 'java.lang';

  interface AnvilRecipeCategory extends AbstractRecipeCategory<IJeiAnvilRecipe> {}
  class AnvilRecipeCategory extends AbstractRecipeCategory<IJeiAnvilRecipe> {
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiAnvilRecipe, focuses: IFocusGroup): void;
    getRegistryName(recipe: IJeiAnvilRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiAnvilRecipe, focuses: IFocusGroup): void;
  }


  class AnvilRecipeMaker {
    static findLevelsCost(leftStack: ItemStack, rightStack: ItemStack): number;
    static getAnvilRecipes(vanillaRecipeFactory: IVanillaRecipeFactory, ingredientManager: IIngredientManager): IJeiAnvilRecipe[];
  }


  interface SmithingCategoryExtension<R extends SmithingRecipe = any> extends ISmithingCategoryExtension<R> {}
  class SmithingCategoryExtension<R extends SmithingRecipe = any> extends ISmithingCategoryExtension<R> {
    constructor(recipeHelper: IPlatformRecipeHelper);
    setAddition<T extends IIngredientAcceptor<T>>(recipe: R, ingredientAcceptor: T): void;
    setBase<T extends IIngredientAcceptor<T>>(recipe: R, ingredientAcceptor: T): void;
    setOutput<T extends IIngredientAcceptor<T>>(recipe: R, ingredientAcceptor: T): void;
    setTemplate<T extends IIngredientAcceptor<T>>(recipe: R, ingredientAcceptor: T): void;
  }


  interface SmithingRecipeCategory extends IExtendableSmithingRecipeCategory, AbstractRecipeCategory<RecipeHolder> {}
  class SmithingRecipeCategory extends IExtendableSmithingRecipeCategory {
    constructor(guiHelper: IGuiHelper);
    addExtension<R extends SmithingRecipe>(recipeClass: Class<R>, extension: ISmithingCategoryExtension<R>): void;
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: RecipeHolder<SmithingRecipe>, focuses: IFocusGroup): void;
    getCodec(codecHelper: ICodecHelper, recipeManager: IRecipeManager): Codec<RecipeHolder<SmithingRecipe>>;
    getRegistryName(recipe: RecipeHolder<SmithingRecipe>): ResourceLocation;
    isHandled(recipeHolder: RecipeHolder<SmithingRecipe>): boolean;
    onDisplayedIngredientsUpdate(recipeHolder: RecipeHolder<SmithingRecipe>, recipeSlots: IRecipeSlotDrawable[], focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, recipeHolder: RecipeHolder<SmithingRecipe>, focuses: IFocusGroup): void;
  }


  interface SmithingTransformCategoryExtension extends SmithingCategoryExtension<SmithingTransformRecipe> {}
  class SmithingTransformCategoryExtension extends SmithingCategoryExtension<SmithingTransformRecipe> {
    constructor(recipeHelper: IPlatformRecipeHelper);
  }


  interface SmithingTrimCategoryExtension extends SmithingCategoryExtension<SmithingTrimRecipe> {}
  class SmithingTrimCategoryExtension extends SmithingCategoryExtension<SmithingTrimRecipe> {
    constructor(recipeHelper: IPlatformRecipeHelper);
    onDisplayedIngredientsUpdate(recipe: SmithingTrimRecipe, templateSlot: IRecipeSlotDrawable, baseSlot: IRecipeSlotDrawable, additionSlot: IRecipeSlotDrawable, outputSlot: IRecipeSlotDrawable, focuses: IFocusGroup): void;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.brewing' {
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IJeiBrewingRecipe } from 'mezz.jei.api.recipe.vanilla';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientHelper } from 'mezz.jei.api.ingredients';
  import { List } from 'java.util';

  interface BrewingRecipeCategory extends AbstractRecipeCategory<IJeiBrewingRecipe> {}
  class BrewingRecipeCategory extends AbstractRecipeCategory<IJeiBrewingRecipe> {
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiBrewingRecipe, focuses: IFocusGroup): void;
    draw(recipe: IJeiBrewingRecipe, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getRegistryName(recipe: IJeiBrewingRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiBrewingRecipe, focuses: IFocusGroup): void;
  }


  class BrewingRecipeUtil {
    static readonly POTION: ItemStack;
    static readonly WATER_BOTTLE: ItemStack;
    constructor(itemStackHelper: IIngredientHelper<ItemStack>);
    addRecipe(inputPotions: ItemStack[], outputPotion: ItemStack): void;
    getBrewingSteps(outputPotion: ItemStack): number;
  }


  interface JeiBrewingRecipe extends IJeiBrewingRecipe {}
  class JeiBrewingRecipe extends IJeiBrewingRecipe {
    constructor(ingredients: ItemStack[], potionInputs: ItemStack[], potionOutput: ItemStack, uid: ResourceLocation, brewingRecipeUtil: BrewingRecipeUtil);
    equals(obj: any): boolean;
    get brewingSteps(): number;
    get ingredients(): ItemStack[];
    get potionInputs(): ItemStack[];
    get potionOutput(): ItemStack;
    get uid(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.compostable' {
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IJeiCompostingRecipe } from 'mezz.jei.api.recipe.vanilla';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { IIngredientManager } from 'mezz.jei.api.runtime';

  interface CompostableRecipeCategory extends AbstractRecipeCategory<IJeiCompostingRecipe> {}
  class CompostableRecipeCategory extends AbstractRecipeCategory<IJeiCompostingRecipe> {
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiCompostingRecipe, focuses: IFocusGroup): void;
    getRegistryName(recipe: IJeiCompostingRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiCompostingRecipe, focuses: IFocusGroup): void;
  }


  interface CompostingRecipe extends IJeiCompostingRecipe {}
  class CompostingRecipe extends IJeiCompostingRecipe {
    constructor(input: ItemStack, chance: number, uid: ResourceLocation);
    get chance(): number;
    get inputs(): ItemStack[];
    get uid(): ResourceLocation;
  }


  class CompostingRecipeMaker {
    static getRecipes(ingredientManager: IIngredientManager): IJeiCompostingRecipe[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.cooking' {
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { RecipeHolder, BlastingRecipe, CampfireCookingRecipe, SmeltingRecipe, SmokingRecipe } from 'net.minecraft.world.item.crafting';
  import { IGuiHelper, ICodecHelper } from 'mezz.jei.api.helpers';
  import { RecipeType, IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { Block } from 'net.minecraft.world.level.block';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';

  interface AbstractCookingCategory<T extends AbstractCookingRecipe = any> extends AbstractRecipeCategory<RecipeHolder> {}
  class AbstractCookingCategory<T extends AbstractCookingRecipe = any> extends AbstractRecipeCategory<RecipeHolder> {
    constructor(guiHelper: IGuiHelper, recipeType: RecipeType<RecipeHolder<T>>, icon: Block, translationKey: string, regularCookTime: number);

    constructor(guiHelper: IGuiHelper, recipeType: RecipeType<RecipeHolder<T>>, icon: Block, translationKey: string, regularCookTime: number, width: number, height: number);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipeHolder: RecipeHolder<T>, focuses: IFocusGroup): void;
    getCodec(codecHelper: ICodecHelper, recipeManager: IRecipeManager): Codec<RecipeHolder<T>>;
    getRegistryName(recipe: RecipeHolder<T>): ResourceLocation;
    isHandled(recipeHolder: RecipeHolder<T>): boolean;
    setRecipe(builder: IRecipeLayoutBuilder, recipeHolder: RecipeHolder<T>, focuses: IFocusGroup): void;
  }


  interface BlastingCategory extends AbstractCookingCategory<BlastingRecipe> {}
  class BlastingCategory extends AbstractCookingCategory<BlastingRecipe> {
    constructor(guiHelper: IGuiHelper);
  }


  interface CampfireCookingCategory extends AbstractCookingCategory<CampfireCookingRecipe> {}
  class CampfireCookingCategory extends AbstractCookingCategory<CampfireCookingRecipe> {
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipeHolder: RecipeHolder<CampfireCookingRecipe>, focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, recipeHolder: RecipeHolder<CampfireCookingRecipe>, focuses: IFocusGroup): void;
  }


  interface FurnaceSmeltingCategory extends AbstractCookingCategory<SmeltingRecipe> {}
  class FurnaceSmeltingCategory extends AbstractCookingCategory<SmeltingRecipe> {
    constructor(guiHelper: IGuiHelper);
  }


  interface SmokingCategory extends AbstractCookingCategory<SmokingRecipe> {}
  class SmokingCategory extends AbstractCookingCategory<SmokingRecipe> {
    constructor(guiHelper: IGuiHelper);
  }

}

declare module 'mezz.jei.library.plugins.vanilla.cooking.fuel' {
  import { IJeiFuelingRecipe } from 'mezz.jei.api.recipe.vanilla';
  import { Collection, List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Textures } from 'mezz.jei.common.gui.textures';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface FuelingRecipe extends IJeiFuelingRecipe {}
  class FuelingRecipe extends IJeiFuelingRecipe {
    constructor(input: Collection<ItemStack>, burnTime: number);
    get burnTime(): number;
    get inputs(): ItemStack[];
  }


  class FuelRecipeMaker {
    static getFuelRecipes(ingredientManager: IIngredientManager): IJeiFuelingRecipe[];
  }


  interface FurnaceFuelCategory extends AbstractRecipeCategory<IJeiFuelingRecipe> {}
  class FurnaceFuelCategory extends AbstractRecipeCategory<IJeiFuelingRecipe> {
    constructor(textures: Textures);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiFuelingRecipe, focuses: IFocusGroup): void;
    static createSmeltCountText(burnTime: number): Component;
    getRegistryName(recipe: IJeiFuelingRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiFuelingRecipe, focuses: IFocusGroup): void;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.crafting' {
  import { IRecipeCategory, AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { RecipeHolder, CraftingRecipe, CraftingBookCategory, ShapedRecipePattern, RecipeSerializer, Ingredient, CraftingInput, StonecutterRecipe, SmeltingRecipe, SmokingRecipe, BlastingRecipe, CampfireCookingRecipe, SmithingRecipe } from 'net.minecraft.world.item.crafting';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ICraftingCategoryExtension, IExtendableCraftingRecipeCategory } from 'mezz.jei.api.recipe.category.extensions.vanilla.crafting';
  import { IRecipeLayoutBuilder, ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { ICraftingGridHelper, IRecipeSlotDrawable, IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { Optional, List, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IGuiHelper, ICodecHelper } from 'mezz.jei.api.helpers';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Key } from 'InputConstants';
  import { Class, Character, Boolean } from 'java.lang';
  import { Codec } from 'com.mojang.serialization';
  import { ImmutableSize2i } from 'mezz.jei.common.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { NonNullList } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { IJeiShapedRecipeBuilder } from 'mezz.jei.api.recipe.vanilla';

  class CategoryRecipeValidator<T extends Recipe<any> = any> {
    constructor(recipeCategory: IRecipeCategory<RecipeHolder<T>>, ingredientManager: IIngredientManager, maxInputs: number);
    isRecipeHandled(recipeHolder: RecipeHolder<T>): boolean;
    isRecipeValid(recipeHolder: RecipeHolder<T>): boolean;
  }


  interface CraftingCategoryExtension extends ICraftingCategoryExtension<CraftingRecipe> {}
  class CraftingCategoryExtension extends ICraftingCategoryExtension<CraftingRecipe> {
    get height(): number;
    get registryName(): ResourceLocation;
    get width(): number;
    getHeight(recipeHolder: RecipeHolder<CraftingRecipe>): number;
    getRegistryName(recipeHolder: RecipeHolder<CraftingRecipe>): Optional<ResourceLocation>;
    getWidth(recipeHolder: RecipeHolder<CraftingRecipe>): number;
    isHandled(recipeHolder: RecipeHolder<CraftingRecipe>): boolean;
    setRecipe(recipeHolder: RecipeHolder<CraftingRecipe>, builder: IRecipeLayoutBuilder, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, craftingGridHelper: ICraftingGridHelper, focuses: IFocusGroup): void;
  }


  interface CraftingRecipeCategory extends IExtendableCraftingRecipeCategory, AbstractRecipeCategory<RecipeHolder> {}
  class CraftingRecipeCategory extends IExtendableCraftingRecipeCategory {
    static readonly width: number;
    static readonly height: number;
    constructor(guiHelper: IGuiHelper);
    addExtension<R extends CraftingRecipe>(recipeClass: Class<R>, extension: ICraftingCategoryExtension<R>): void;
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipeHolder: RecipeHolder<CraftingRecipe>, focuses: IFocusGroup): void;
    draw(recipeHolder: RecipeHolder<CraftingRecipe>, recipeSlotsView: IRecipeSlotsView, guiGraphics: GuiGraphics, mouseX: number, mouseY: number): void;
    getCodec(codecHelper: ICodecHelper, recipeManager: IRecipeManager): Codec<RecipeHolder<CraftingRecipe>>;
    getRecipeSize(recipeHolder: RecipeHolder<CraftingRecipe>): ImmutableSize2i;
    getRegistryName(recipeHolder: RecipeHolder<CraftingRecipe>): ResourceLocation;
    getTooltip(tooltip: ITooltipBuilder, recipeHolder: RecipeHolder<CraftingRecipe>, recipeSlotsView: IRecipeSlotsView, mouseX: number, mouseY: number): void;
    handleInput(recipeHolder: RecipeHolder<CraftingRecipe>, mouseX: number, mouseY: number, input: Key): boolean;
    isHandled(recipeHolder: RecipeHolder<CraftingRecipe>): boolean;
    onDisplayedIngredientsUpdate(recipeHolder: RecipeHolder<CraftingRecipe>, recipeSlots: IRecipeSlotDrawable[], focuses: IFocusGroup): void;
    setRecipe(builder: IRecipeLayoutBuilder, recipeHolder: RecipeHolder<CraftingRecipe>, focuses: IFocusGroup): void;
  }


  interface JeiShapedRecipe extends CraftingRecipe {}
  class JeiShapedRecipe extends CraftingRecipe {
    constructor(group: string, category: CraftingBookCategory, pattern: ShapedRecipePattern, results: ItemStack[]);
    assemble(input: CraftingInput, registries: Provider): ItemStack;
    canCraftInDimensions(width: number, height: number): boolean;
    category(): CraftingBookCategory;
    get group(): string;
    get height(): number;
    get ingredients(): NonNullList<Ingredient>;
    get serializer(): RecipeSerializer<any>;
    get width(): number;
    getResultItem(registries: Provider): ItemStack;
    isIncomplete(): boolean;
    matches(input: CraftingInput, level: Level): boolean;
    showNotification(): boolean;
  }


  interface JeiShapedRecipeBuilder extends IJeiShapedRecipeBuilder {}
  class JeiShapedRecipeBuilder extends IJeiShapedRecipeBuilder {
    constructor(category: CraftingBookCategory, results: ItemStack[]);
    build(): CraftingRecipe;
    define($$0: string, $$1: Ingredient): JeiShapedRecipeBuilder;
    group($$0: string): JeiShapedRecipeBuilder;
    pattern($$0: string): JeiShapedRecipeBuilder;
  }


  class VanillaRecipes {
    constructor(ingredientManager: IIngredientManager);
    getBlastingRecipes(blastingCategory: IRecipeCategory<RecipeHolder<BlastingRecipe>>): RecipeHolder<BlastingRecipe>[];
    getCampfireCookingRecipes(campfireCategory: IRecipeCategory<RecipeHolder<CampfireCookingRecipe>>): RecipeHolder<CampfireCookingRecipe>[];
    getCraftingRecipes(craftingCategory: IRecipeCategory<RecipeHolder<CraftingRecipe>>): Map<boolean, RecipeHolder<CraftingRecipe>[]>;
    getFurnaceRecipes(furnaceCategory: IRecipeCategory<RecipeHolder<SmeltingRecipe>>): RecipeHolder<SmeltingRecipe>[];
    getSmithingRecipes(smithingCategory: IRecipeCategory<RecipeHolder<SmithingRecipe>>): RecipeHolder<SmithingRecipe>[];
    getSmokingRecipes(smokingCategory: IRecipeCategory<RecipeHolder<SmokingRecipe>>): RecipeHolder<SmokingRecipe>[];
    getStonecuttingRecipes(stonecuttingCategory: IRecipeCategory<RecipeHolder<StonecutterRecipe>>): RecipeHolder<StonecutterRecipe>[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.crafting.JeiShapedRecipe' {
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { JeiShapedRecipe } from 'mezz.jei.library.plugins.vanilla.crafting';
  import { MapCodec } from 'com.mojang.serialization';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface Serializer extends RecipeSerializer<JeiShapedRecipe> {}
  class Serializer extends RecipeSerializer<JeiShapedRecipe> {
    static readonly CODEC: MapCodec;
    static readonly STREAM_CODEC: StreamCodec;
    codec(): MapCodec<JeiShapedRecipe>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, JeiShapedRecipe>;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.crafting.replacers' {
  import { List } from 'java.util';
  import { RecipeHolder, CraftingRecipe } from 'net.minecraft.world.item.crafting';
  import { IJeiHelpers } from 'mezz.jei.api.helpers';

  class ShieldDecorationRecipeMaker {
    static createRecipes(): RecipeHolder<CraftingRecipe>[];
  }


  class ShulkerBoxColoringRecipeMaker {
    static createRecipes(): RecipeHolder<CraftingRecipe>[];
  }


  class SuspiciousStewRecipeMaker {
    static createRecipes(): RecipeHolder<CraftingRecipe>[];
  }


  class TippedArrowRecipeMaker {
    static createRecipes(jeiHelpers: IJeiHelpers): RecipeHolder<CraftingRecipe>[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.grindstone' {
  import { IJeiGrindstoneRecipe } from 'mezz.jei.api.recipe.vanilla';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IGuiHelper } from 'mezz.jei.api.helpers';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { IPlatformRecipeHelper } from 'mezz.jei.common.platform';

  interface GrindstoneRecipe extends IJeiGrindstoneRecipe {}
  class GrindstoneRecipe extends IJeiGrindstoneRecipe {
    constructor(topInputs: ItemStack[], bottomInputs: ItemStack[], outputs: ItemStack[], minXpReward: number, maxXpReward: number, uid: ResourceLocation);
    get bottomInputs(): ItemStack[];
    get maxXpReward(): number;
    get minXpReward(): number;
    get outputs(): ItemStack[];
    get topInputs(): ItemStack[];
    get uid(): ResourceLocation;
    isOutputRenderOnly(): boolean;
  }


  interface GrindstoneRecipeCategory extends AbstractRecipeCategory<IJeiGrindstoneRecipe> {}
  class GrindstoneRecipeCategory extends AbstractRecipeCategory<IJeiGrindstoneRecipe> {
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: IJeiGrindstoneRecipe, focuses: IFocusGroup): void;
    getRegistryName(recipe: IJeiGrindstoneRecipe): ResourceLocation;
    setRecipe(builder: IRecipeLayoutBuilder, recipe: IJeiGrindstoneRecipe, focuses: IFocusGroup): void;
  }


  class GrindstoneRecipeMaker {
    static getGrindstoneRecipes(ingredientManager: IIngredientManager, platformHelper: IPlatformRecipeHelper): IJeiGrindstoneRecipe[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.gui' {
  import { IGuiContainerHandler, IGlobalGuiHandler } from 'mezz.jei.api.gui.handlers';
  import { EffectRenderingInventoryScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { List, Collection } from 'java.util';
  import { Rect2i } from 'net.minecraft.client.renderer';

  interface InventoryEffectRendererGuiHandler<T extends AbstractContainerMenu = any> extends IGuiContainerHandler<EffectRenderingInventoryScreen> {}
  class InventoryEffectRendererGuiHandler<T extends AbstractContainerMenu = any> extends IGuiContainerHandler<EffectRenderingInventoryScreen> {
    getGuiExtraAreas(containerScreen: EffectRenderingInventoryScreen<T>): Rect2i[];
  }


  interface RecipeBookGuiHandler<C extends AbstractContainerMenu = any, T extends AbstractContainerScreen<C> = any> extends IGuiContainerHandler<T> {}
  class RecipeBookGuiHandler<C extends AbstractContainerMenu = any, T extends AbstractContainerScreen<C> = any> extends IGuiContainerHandler<T> {
    getGuiExtraAreas(containerScreen: T): Rect2i[];
  }


  interface ToastGuiHandler extends IGlobalGuiHandler {}
  class ToastGuiHandler extends IGlobalGuiHandler {
    get guiExtraAreas(): Collection<Rect2i>;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.ingredients.fluid' {
  import { IIngredientHelper, IIngredientTypeWithSubtypes } from 'mezz.jei.api.ingredients';
  import { ISubtypeManager, UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { IColorHelper, IPlatformFluidHelper } from 'mezz.jei.api.helpers';
  import { IPlatformFluidHelperInternal } from 'mezz.jei.common.platform';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { Iterable, Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Stream } from 'java.util.stream';
  import { Optional, Collection, List } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';
  import { Registry } from 'net.minecraft.core';

  interface FluidIngredientHelper<T = any> extends IIngredientHelper<T> {}
  class FluidIngredientHelper<T = any> extends IIngredientHelper<T> {
    constructor(subtypeManager: ISubtypeManager, colorHelper: IColorHelper, platformFluidHelper: IPlatformFluidHelperInternal<T>);
    copyIngredient(ingredient: T): T;
    copyWithAmount(ingredient: T, amount: number): T;
    get ingredientType(): IIngredientTypeWithSubtypes<Fluid, T>;
    getAmount(ingredient: T): number;
    getCheatItemStack(ingredient: T): ItemStack;
    getColors(ingredient: T): Iterable<number>;
    getDisplayName(ingredient: T): string;
    getErrorInfo(ingredient: T): string;
    getGroupingUid(ingredient: T): any;
    getResourceLocation(ingredient: T): ResourceLocation;
    getTagKeyEquivalent(ingredients: Collection<T>): Optional<TagKey<any>>;
    getTagStream(ingredient: T): Stream<ResourceLocation>;
    getUid(ingredient: T, context: UidContext): any;
    getUniqueId(ingredient: T, context: UidContext): string;
    getWildcardId(ingredient: T): string;
    isHiddenFromRecipeViewersByTags(ingredient: T): boolean;
    isIngredientOnServer(ingredient: T): boolean;
    normalizeIngredient(ingredient: T): T;
  }


  class FluidStackListFactory {
    static create<T>(registry: Registry<Fluid>, helper: IPlatformFluidHelper<T>): T[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.ingredients' {
  import { IIngredientHelper, IIngredientType, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { ItemStack } from 'net.minecraft.world.item';
  import { StackHelper } from 'mezz.jei.common.util';
  import { IColorHelper } from 'mezz.jei.api.helpers';
  import { UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { Iterable, Integer } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';
  import { Optional, Collection, List } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';

  interface ItemStackHelper extends IIngredientHelper<ItemStack> {}
  class ItemStackHelper extends IIngredientHelper<ItemStack> {
    constructor(stackHelper: StackHelper, colorHelper: IColorHelper);
    copyIngredient(ingredient: ItemStack): ItemStack;
    copyWithAmount(ingredient: ItemStack, amount: number): ItemStack;
    get ingredientType(): IIngredientType<ItemStack>;
    getAmount(ingredient: ItemStack): number;
    getCheatItemStack(ingredient: ItemStack): ItemStack;
    getColors(ingredient: ItemStack): Iterable<number>;
    getDisplayModId(ingredient: ItemStack): string;
    getDisplayName(ingredient: ItemStack): string;
    getErrorInfo(ingredient: ItemStack): string;
    getGroupingUid(typedIngredient: ITypedIngredient<ItemStack>): any;
    getGroupingUid(ingredient: ItemStack): any;
    getResourceLocation(ingredient: ItemStack): ResourceLocation;
    getTagKeyEquivalent(ingredients: Collection<ItemStack>): Optional<TagKey<any>>;
    getTagStream(ingredient: ItemStack): Stream<ResourceLocation>;
    getUid(ingredient: ItemStack, context: UidContext): any;
    getUid(typedIngredient: ITypedIngredient<ItemStack>, context: UidContext): any;
    getUniqueId(ingredient: ItemStack, context: UidContext): string;
    getWildcardId(ingredient: ItemStack): string;
    hasSubtypes(ingredient: ItemStack): boolean;
    isHiddenFromRecipeViewersByTags(ingredient: ItemStack): boolean;
    isHiddenFromRecipeViewersByTags(ingredient: ITypedIngredient<ItemStack>): boolean;
    isIngredientOnServer(ingredient: ItemStack): boolean;
    isValidIngredient(ingredient: ItemStack): boolean;
    normalizeIngredient(ingredient: ItemStack): ItemStack;
  }


  class ItemStackListFactory {
    static create(stackHelper: StackHelper, itemStackHelper: ItemStackHelper): ItemStack[];
  }

}

declare module 'mezz.jei.library.plugins.vanilla.ingredients.subtypes' {
  import { ISubtypeInterpreter, UidContext } from 'mezz.jei.api.ingredients.subtypes';
  import { ItemStack } from 'net.minecraft.world.item';

  interface EnchantedBookSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class EnchantedBookSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: EnchantedBookSubtypeInterpreter;
    getLegacyStringSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    getStringName(itemStack: ItemStack): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface FireworkRocketSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class FireworkRocketSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: FireworkRocketSubtypeInterpreter;
    getLegacyStringSubtypeInfo(itemStack: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface InstrumentSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class InstrumentSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: InstrumentSubtypeInterpreter;
    getLegacyStringSubtypeInfo(itemStack: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface LightSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class LightSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: LightSubtypeInterpreter;
    getLegacyStringSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface OminousBottleSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class OminousBottleSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: OminousBottleSubtypeInterpreter;
    getLegacyStringSubtypeInfo(itemStack: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface PaintingSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class PaintingSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: PaintingSubtypeInterpreter;
    getLegacyStringSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface PotionSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class PotionSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: PotionSubtypeInterpreter;
    getLegacyStringSubtypeInfo(ingredient: ItemStack, context: UidContext): string;
    getStringName(itemStack: ItemStack): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }


  interface SuspiciousStewSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {}
  class SuspiciousStewSubtypeInterpreter extends ISubtypeInterpreter<ItemStack> {
    static readonly INSTANCE: SuspiciousStewSubtypeInterpreter;
    getLegacyStringSubtypeInfo(itemStack: ItemStack, context: UidContext): string;
    getSubtypeData(ingredient: ItemStack, context: UidContext): any;
  }

}

declare module 'mezz.jei.library.plugins.vanilla.stonecutting' {
  import { AbstractRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { RecipeHolder, StonecutterRecipe } from 'net.minecraft.world.item.crafting';
  import { IGuiHelper, ICodecHelper } from 'mezz.jei.api.helpers';
  import { IRecipeLayoutBuilder } from 'mezz.jei.api.gui.builder';
  import { IFocusGroup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IRecipeExtrasBuilder } from 'mezz.jei.api.gui.widgets';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Codec } from 'com.mojang.serialization';

  interface StoneCuttingRecipeCategory extends AbstractRecipeCategory<RecipeHolder> {}
  class StoneCuttingRecipeCategory extends AbstractRecipeCategory<RecipeHolder> {
    static readonly width: number;
    static readonly height: number;
    constructor(guiHelper: IGuiHelper);
    createRecipeExtras(builder: IRecipeExtrasBuilder, recipe: RecipeHolder<StonecutterRecipe>, focuses: IFocusGroup): void;
    getCodec(codecHelper: ICodecHelper, recipeManager: IRecipeManager): Codec<RecipeHolder<StonecutterRecipe>>;
    getRegistryName(recipe: RecipeHolder<StonecutterRecipe>): ResourceLocation;
    isHandled(recipeHolder: RecipeHolder<StonecutterRecipe>): boolean;
    setRecipe(builder: IRecipeLayoutBuilder, recipeHolder: RecipeHolder<StonecutterRecipe>, focuses: IFocusGroup): void;
  }

}

declare module 'mezz.jei.library.plugins.vanilla' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ISubtypeRegistration, IModIngredientRegistration, IModInfoRegistration, IRecipeCategoryRegistration, IVanillaCategoryExtensionRegistration, IRecipeRegistration, IGuiHandlerRegistration, IRecipeTransferRegistration, IRecipeCatalystRegistration } from 'mezz.jei.api.registration';
  import { Optional, List } from 'java.util';
  import { CraftingRecipeCategory } from 'mezz.jei.library.plugins.vanilla.crafting';
  import { SmithingRecipeCategory, AnvilRecipe } from 'mezz.jei.library.plugins.vanilla.anvil';
  import { IVanillaRecipeFactory, IJeiAnvilRecipe, IJeiBrewingRecipe, IJeiShapedRecipeBuilder } from 'mezz.jei.api.recipe.vanilla';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GrindstoneRecipe } from 'mezz.jei.library.plugins.vanilla.grindstone';
  import { CraftingBookCategory } from 'net.minecraft.world.item.crafting';

  interface VanillaPlugin extends IModPlugin {}
  class VanillaPlugin extends IModPlugin {
    get craftingCategory(): Optional<CraftingRecipeCategory>;
    get pluginUid(): ResourceLocation;
    get smithingCategory(): Optional<SmithingRecipeCategory>;
    registerCategories(registration: IRecipeCategoryRegistration): void;
    registerGuiHandlers(registration: IGuiHandlerRegistration): void;
    registerIngredients(registration: IModIngredientRegistration): void;
    registerItemSubtypes(registration: ISubtypeRegistration): void;
    registerModInfo(registration: IModInfoRegistration): void;
    registerRecipeCatalysts(registration: IRecipeCatalystRegistration): void;
    registerRecipeTransferHandlers(registration: IRecipeTransferRegistration): void;
    registerRecipes(registration: IRecipeRegistration): void;
    registerVanillaCategoryExtensions(registration: IVanillaCategoryExtensionRegistration): void;
  }


  interface VanillaRecipeFactory extends IVanillaRecipeFactory {}
  class VanillaRecipeFactory extends IVanillaRecipeFactory {
    constructor(ingredientManager: IIngredientManager);
    createAnvilRecipe(leftInput: ItemStack, rightInputs: ItemStack[], outputs: ItemStack[], uid: ResourceLocation): IJeiAnvilRecipe;
    createAnvilRecipe(leftInput: ItemStack, rightInputs: ItemStack[], outputs: ItemStack[]): AnvilRecipe;
    createAnvilRecipe(leftInputs: ItemStack[], rightInputs: ItemStack[], outputs: ItemStack[], uid: ResourceLocation): AnvilRecipe;
    createAnvilRecipe(leftInputs: ItemStack[], rightInputs: ItemStack[], outputs: ItemStack[]): AnvilRecipe;
    createBrewingRecipe(ingredients: ItemStack[], potionInput: ItemStack, potionOutput: ItemStack, uid: ResourceLocation): IJeiBrewingRecipe;
    createBrewingRecipe(ingredients: ItemStack[], potionInput: ItemStack, potionOutput: ItemStack): IJeiBrewingRecipe;
    createBrewingRecipe(ingredients: ItemStack[], potionInputs: ItemStack[], potionOutput: ItemStack, uid: ResourceLocation): IJeiBrewingRecipe;
    createBrewingRecipe(ingredients: ItemStack[], potionInputs: ItemStack[], potionOutput: ItemStack): IJeiBrewingRecipe;
    createGrindstoneRecipe(topInputs: ItemStack[], bottomInputs: ItemStack[], outputs: ItemStack[], minXp: number, maxXp: number, uid: ResourceLocation): GrindstoneRecipe;
    createShapedRecipeBuilder(category: CraftingBookCategory, results: ItemStack[]): IJeiShapedRecipeBuilder;
  }

}

declare module 'mezz.jei.library.recipes.collect' {
  import { Collection, List, Comparator, Set, Optional } from 'java.util';
  import { RecipeType, RecipeIngredientRole } from 'mezz.jei.api.recipe';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { Stream } from 'java.util.stream';
  import { ITypedIngredient, IIngredientSupplier } from 'mezz.jei.api.ingredients';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { ImmutableListMultimap } from 'com.google.common.collect';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';

  class IngredientToRecipesMap<R = any> {
    add(recipe: R, ingredientUids: Collection<any>): void;
    compact(): void;
    get(ingredientUid: any): R[];
  }


  class RecipeIngredientTable {
    add<V>(recipe: V, recipeType: RecipeType<V>, ingredientUids: Collection<any>): void;
    compact(): void;
    get<V>(recipeType: RecipeType<V>, ingredientUid: any): @UnmodifiableViewList<V>;
  }


  class RecipeMap {
    constructor(recipeTypeComparator: Comparator<RecipeType<any>>, ingredientManager: IIngredientManager, role: RecipeIngredientRole);
    addCatalystForCategory<T>(recipeType: RecipeType<any>, ingredient: ITypedIngredient<T>): void;
    addRecipe<T>(recipeType: RecipeType<T>, recipe: T, ingredientSupplier: IIngredientSupplier): void;
    compact(): void;
    getRecipeTypes<T>(ingredient: ITypedIngredient<T>): Stream<RecipeType<any>>;
    getRecipes<T>(recipeType: RecipeType<T>, ingredient: ITypedIngredient<any>): @UnmodifiableViewList<T>;
    isCatalystForRecipeCategory<T>(recipeType: RecipeType<T>, ingredient: ITypedIngredient<any>): boolean;
  }


  class RecipeTypeData<T = any> {
    constructor(recipeCategory: IRecipeCategory<T>, recipeCategoryCatalysts: ITypedIngredient<any>[]);
    addRecipes(recipes: Collection<T>): void;
    get hiddenRecipes(): Set<T>;
    get recipeCategory(): IRecipeCategory<T>;
    get recipeCategoryCatalysts(): ITypedIngredient<any>[];
    get recipes(): T[];
  }


  class RecipeTypeDataMap {
    constructor(recipeCategories: IRecipeCategory<any>[], recipeCategoryCatalystsMap: ImmutableListMultimap<IRecipeCategory<any>, ITypedIngredient<any>>);
    get<T>(recipeType: RecipeType<T>): RecipeTypeData<T>;
    getType(recipeTypeUid: ResourceLocation): Optional<RecipeType<any>>;
    getType<T>(recipeTypeUid: ResourceLocation, recipeClass: Class<T>): Optional<RecipeType<T>>;
    validate(recipeType: RecipeType<any>): void;
  }

}

declare module 'mezz.jei.library.recipes' {
  import { Class, Integer } from 'java.lang';
  import { ICraftingCategoryExtension } from 'mezz.jei.api.recipe.category.extensions.vanilla.crafting';
  import { CraftingRecipe, RecipeHolder, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { Optional, EnumMap, List, Collection, Set } from 'java.util';
  import { IRecipeManagerPlugin, IRecipeButtonControllerFactory } from 'mezz.jei.api.recipe.advanced';
  import { IIngredientManager, IIngredientVisibility } from 'mezz.jei.api.runtime';
  import { RecipeTypeDataMap, RecipeMap, RecipeTypeData } from 'mezz.jei.library.recipes.collect';
  import { RecipeIngredientRole, RecipeType, IFocus, IFocusGroup, IRecipeCatalystLookup, IRecipeCategoriesLookup, IRecipeLookup, IRecipeManager } from 'mezz.jei.api.recipe';
  import { Stream } from 'java.util.stream';
  import { ITypedIngredient, IIngredientType, IIngredientSupplier } from 'mezz.jei.api.ingredients';
  import { ImmutableListMultimap, ImmutableTable } from 'com.google.common.collect';
  import { IRecipeCategoryDecorator } from 'mezz.jei.api.recipe.category.extensions';
  import { IRecipeLayoutDrawable } from 'mezz.jei.api.gui';
  import { IScalableDrawable } from 'mezz.jei.api.gui.drawable';
  import { IRecipeSlotDrawable, IRecipeSlotsView } from 'mezz.jei.api.gui.ingredient';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RecipeCategorySortingConfig } from 'mezz.jei.library.config';
  import { Supplier } from 'java.util.function';
  import { IRecipeTransferManager, IRecipeTransferHandler, IUniversalRecipeTransferHandler, IRecipeTransferError } from 'mezz.jei.api.recipe.transfer';
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { Player } from 'net.minecraft.world.entity.player';

  class CraftingExtensionHelper {
    addRecipeExtension<T extends CraftingRecipe>(recipeClass: Class<T>, recipeExtension: ICraftingCategoryExtension<T>): void;
    getOptionalRecipeExtension<R extends CraftingRecipe>(recipeHolder: RecipeHolder<R>): Optional<ICraftingCategoryExtension<R>>;
    getRecipeExtension<R extends CraftingRecipe>(recipeCategory: IRecipeCategory<RecipeHolder<R>>, recipeHolder: RecipeHolder<R>): ICraftingCategoryExtension<R>;
  }


  interface InternalRecipeManagerPlugin extends IRecipeManagerPlugin {}
  class InternalRecipeManagerPlugin extends IRecipeManagerPlugin {
    constructor(ingredientManager: IIngredientManager, recipeCategoriesMap: RecipeTypeDataMap, recipeMaps: EnumMap<RecipeIngredientRole, RecipeMap>);
    getRecipeTypes<V>(focus: IFocus<V>): RecipeType<any>[];
    getRecipes<T, V>(recipeCategory: IRecipeCategory<T>, focus: IFocus<V>): T[];
    getRecipes<T>(recipeCategory: IRecipeCategory<T>): T[];
  }


  class PluginManager {
    constructor(internalRecipeManagerPlugin: IRecipeManagerPlugin);
    addAll(plugins: IRecipeManagerPlugin[]): void;
    getRecipeTypes(focusGroup: IFocusGroup): Stream<RecipeType<any>>;
    getRecipes<T>(recipeTypeData: RecipeTypeData<T>, focusGroup: IFocusGroup, includeHidden: boolean): Stream<T>;
  }


  class RecipeCatalystBuilder {
    constructor(recipeCatalystMap: RecipeMap);
    addCategoryCatalysts(recipeCategory: IRecipeCategory<any>, categoryCatalystIngredients: ITypedIngredient<any>[]): void;
    buildRecipeCategoryCatalysts(): ImmutableListMultimap<IRecipeCategory<any>, ITypedIngredient<any>>;
  }


  interface RecipeCatalystLookup extends IRecipeCatalystLookup {}
  class RecipeCatalystLookup extends IRecipeCatalystLookup {
    constructor(recipeType: RecipeType<any>, recipeManager: RecipeManagerInternal);
    get<V>(ingredientType: IIngredientType<V>): Stream<V>;
    get<S>(var1: IIngredientType<S>): Stream<S>;
    get (): Stream<ITypedIngredient<any>>;
    includeHidden(): IRecipeCatalystLookup;
  }


  interface RecipeCategoriesLookup extends IRecipeCategoriesLookup {}
  class RecipeCategoriesLookup extends IRecipeCategoriesLookup {
    constructor(recipeManager: RecipeManagerInternal, ingredientManager: IIngredientManager);
    get (): Stream<IRecipeCategory<any>>;
    includeHidden(): IRecipeCategoriesLookup;
    limitFocus(focuses: Collection<IFocus<any>>): IRecipeCategoriesLookup;
    limitTypes(recipeTypes: Collection<RecipeType<any>>): IRecipeCategoriesLookup;
  }


  interface RecipeLookup<R = any> extends IRecipeLookup<R> {}
  class RecipeLookup<R = any> extends IRecipeLookup<R> {
    constructor(recipeType: RecipeType<R>, recipeManager: RecipeManagerInternal, ingredientManager: IIngredientManager);
    get (): Stream<R>;
    includeHidden(): IRecipeLookup<R>;
    limitFocus(focuses: Collection<IFocus<any>>): IRecipeLookup<R>;
  }


  interface RecipeManager extends IRecipeManager {}
  class RecipeManager extends IRecipeManager {
    constructor(internal: RecipeManagerInternal, ingredientManager: IIngredientManager, recipeCategoryDecorators: ImmutableListMultimap<RecipeType<any>, IRecipeCategoryDecorator<any>>, recipeButtonControllerFactories: IRecipeButtonControllerFactory[]);
    addRecipes<T>(recipeType: RecipeType<T>, recipes: T[]): void;
    createRecipeCatalystLookup(recipeType: RecipeType<any>): IRecipeCatalystLookup;
    createRecipeCategoryLookup(): IRecipeCategoriesLookup;
    createRecipeLayoutDrawable<T>(recipeCategory: IRecipeCategory<T>, recipe: T, focusGroup: IFocusGroup): Optional<IRecipeLayoutDrawable<T>>;
    createRecipeLayoutDrawable<T>(recipeCategory: IRecipeCategory<T>, recipe: T, focusGroup: IFocusGroup, background: IScalableDrawable, borderSize: number): Optional<IRecipeLayoutDrawable<T>>;
    createRecipeLayoutDrawableOrShowError<T>(recipeCategory: IRecipeCategory<T>, recipe: T, focusGroup: IFocusGroup): IRecipeLayoutDrawable<T>;
    createRecipeLookup<R>(recipeType: RecipeType<R>): IRecipeLookup<R>;
    createRecipeSlotDrawable(role: RecipeIngredientRole, ingredients: Optional<ITypedIngredient<any>>[], focusedIngredients: Set<number>, ingredientCycleOffset: number): IRecipeSlotDrawable;
    get recipeButtonControllerFactories(): IRecipeButtonControllerFactory[];
    getRecipeCategory<T>(recipeType: RecipeType<T>): IRecipeCategory<T>;
    getRecipeIngredients<T>(recipeCategory: IRecipeCategory<T>, recipe: T): IIngredientSupplier;
    getRecipeType<T>(recipeUid: ResourceLocation, recipeClass: Class<T>): Optional<RecipeType<T>>;
    getRecipeType(recipeUid: ResourceLocation): Optional<RecipeType<any>>;
    hideRecipeCategory(recipeType: RecipeType<any>): void;
    hideRecipes<T>(recipeType: RecipeType<T>, recipes: Collection<T>): void;
    unhideRecipeCategory(recipeType: RecipeType<any>): void;
    unhideRecipes<T>(recipeType: RecipeType<T>, recipes: Collection<T>): void;
  }


  class RecipeManagerInternal {
    constructor(recipeCategories: IRecipeCategory<any>[], recipeCatalysts: ImmutableListMultimap<RecipeType<any>, ITypedIngredient<any>>, ingredientManager: IIngredientManager, recipeCategorySortingConfig: RecipeCategorySortingConfig, ingredientVisibility: IIngredientVisibility);
    addPlugins(plugins: IRecipeManagerPlugin[]): void;
    addRecipes<T>(recipeType: RecipeType<T>, recipes: T[]): void;
    compact(): void;
    getRecipeCatalystStream<T>(recipeType: RecipeType<T>, includeHidden: boolean): Stream<ITypedIngredient<any>>;
    getRecipeCategoriesForTypes(recipeTypes: Collection<RecipeType<any>>, focuses: IFocusGroup, includeHidden: boolean): Stream<IRecipeCategory<any>>;
    getRecipeCategory<T>(recipeType: RecipeType<T>): IRecipeCategory<T>;
    getRecipeType<T>(recipeUid: ResourceLocation, recipeClass: Class<T>): Optional<RecipeType<T>>;
    getRecipeType(recipeUid: ResourceLocation): Optional<RecipeType<any>>;
    getRecipesStream<T>(recipeType: RecipeType<T>, focuses: IFocusGroup, includeHidden: boolean): Stream<T>;
    hideRecipeCategory(recipeType: RecipeType<any>): void;
    hideRecipes<T>(recipeType: RecipeType<T>, recipes: Collection<T>): void;
    isCategoryHidden(recipeCategory: IRecipeCategory<any>, focuses: IFocusGroup): boolean;
    isRecipeCatalyst(recipeType: RecipeType<any>, focus: IFocus<any>): boolean;
    unhideRecipeCategory(recipeType: RecipeType<any>): void;
    unhideRecipes<T>(recipeType: RecipeType<T>, recipes: Collection<T>): void;
  }


  class RecipeSerializers {
    static get jeiShapedRecipeSerializer(): RecipeSerializer<any>;
    static register(jeiShapedRecipeSerializer: Supplier<RecipeSerializer<any>>): void;
  }


  interface RecipeTransferManager extends IRecipeTransferManager {}
  class RecipeTransferManager extends IRecipeTransferManager {
    constructor(recipeTransferHandlers: ImmutableTable<Class<AbstractContainerMenu>, RecipeType<any>, IRecipeTransferHandler<any, any>>);
    getRecipeTransferHandler<C extends AbstractContainerMenu, R>(container: C, recipeCategory: IRecipeCategory<R>): Optional<IRecipeTransferHandler<C, R>>;
  }


  interface UniversalRecipeTransferHandlerAdapter<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferHandler<C, R> {}
  class UniversalRecipeTransferHandlerAdapter<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferHandler<C, R> {
    constructor(universalRecipeTransferHandler: IUniversalRecipeTransferHandler<C>);
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    get recipeType(): RecipeType<R>;
    transferRecipe(container: C, recipe: R, recipeSlots: IRecipeSlotsView, player: Player, maxTransfer: boolean, doTransfer: boolean): IRecipeTransferError;
  }

}

declare module 'mezz.jei.library.render.batch' {
  import { Minecraft } from 'net.minecraft.client';
  import { List } from 'java.util';
  import { BatchRenderElement } from 'mezz.jei.api.ingredients.rendering';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemRenderer } from 'net.minecraft.client.renderer.entity';
  import { ItemStackRenderer } from 'mezz.jei.library.render';

  class ItemStackBatchRenderer {
    constructor(minecraft: Minecraft, elements: BatchRenderElement<ItemStack>[]);
    render(guiGraphics: GuiGraphics, minecraft: Minecraft, itemRenderer: ItemRenderer, itemStackRenderer: ItemStackRenderer): void;
  }


  class ItemStackBatchRendererCache {
    renderBatch(guiGraphics: GuiGraphics, itemStackRenderer: ItemStackRenderer, elements: BatchRenderElement<ItemStack>[]): void;
  }

}

declare module 'mezz.jei.library.render' {
  import { IIngredientRenderer } from 'mezz.jei.api.ingredients';
  import { IPlatformFluidHelperInternal } from 'mezz.jei.common.platform';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { TooltipFlag, ItemStack } from 'net.minecraft.world.item';
  import { BatchRenderElement } from 'mezz.jei.api.ingredients.rendering';
  import { Minecraft } from 'net.minecraft.client';

  interface FluidTankRenderer<T = any> extends IIngredientRenderer<T> {}
  class FluidTankRenderer<T = any> extends IIngredientRenderer<T> {
    constructor(fluidHelper: IPlatformFluidHelperInternal<T>);

    constructor(fluidHelper: IPlatformFluidHelperInternal<T>, capacity: number, showCapacity: boolean, width: number, height: number);
    get height(): number;
    get width(): number;
    getTooltip(fluidStack: T, tooltipFlag: TooltipFlag): Component[];
    render(guiGraphics: GuiGraphics, fluidStack: T): void;
    render(guiGraphics: GuiGraphics, ingredient: T, posX: number, posY: number): void;
  }


  interface ItemStackRenderer extends IIngredientRenderer<ItemStack> {}
  class ItemStackRenderer extends IIngredientRenderer<ItemStack> {
    get height(): number;
    get width(): number;
    getFontRenderer(minecraft: Minecraft, ingredient: ItemStack): Font;
    getTooltip(ingredient: ItemStack, tooltipFlag: TooltipFlag): Component[];
    render(guiGraphics: GuiGraphics, ingredient: ItemStack): void;
    render(guiGraphics: GuiGraphics, ingredient: ItemStack, posX: number, posY: number): void;
    renderBatch(guiGraphics: GuiGraphics, batchRenderElements: BatchRenderElement<ItemStack>[]): void;
  }

}

declare module 'mezz.jei.library.render.FluidTankRenderer' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TooltipMode extends Enum<TooltipMode> {}
  class TooltipMode extends Enum<TooltipMode> {
    static readonly SHOW_AMOUNT: TooltipMode;
    static readonly SHOW_AMOUNT_AND_CAPACITY: TooltipMode;
    static readonly ITEM_LIST: TooltipMode;
    static valueOf(name: string): TooltipMode;
    static values(): TooltipMode[];
  }

}

declare module 'mezz.jei.library.runtime' {
  import { IJeiHelpers, IStackHelper, IModIdHelper, IColorHelper, ICodecHelper, IGuiHelper, IPlatformFluidHelper } from 'mezz.jei.api.helpers';
  import { GuiHelper } from 'mezz.jei.library.gui.helpers';
  import { IFocusFactory, RecipeType, IRecipeManager } from 'mezz.jei.api.recipe';
  import { IIngredientManager, IIngredientVisibility, IJeiRuntime, IJeiKeyMappings, IScreenHelper, IEditModeConfig, IIngredientListOverlay, IBookmarkOverlay, IRecipesGui, IIngredientFilter } from 'mezz.jei.api.runtime';
  import { IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { Collection, Optional } from 'java.util';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { Stream } from 'java.util.stream';
  import { IRecipeTransferManager } from 'mezz.jei.api.recipe.transfer';
  import { IJeiConfigManager } from 'mezz.jei.api.runtime.config';

  interface JeiHelpers extends IJeiHelpers {}
  class JeiHelpers extends IJeiHelpers {
    constructor(guiHelper: GuiHelper, stackHelper: IStackHelper, modIdHelper: IModIdHelper, focusFactory: IFocusFactory, colorHelper: IColorHelper, ingredientManager: IIngredientManager, vanillaRecipeFactory: IVanillaRecipeFactory, codecHelper: ICodecHelper, ingredientVisibility: IIngredientVisibility);
    get allRecipeTypes(): Stream<RecipeType<any>>;
    get codecHelper(): ICodecHelper;
    get colorHelper(): IColorHelper;
    get focusFactory(): IFocusFactory;
    get guiHelper(): IGuiHelper;
    get ingredientManager(): IIngredientManager;
    get ingredientVisibility(): IIngredientVisibility;
    get modIdHelper(): IModIdHelper;
    get platformFluidHelper(): IPlatformFluidHelper<any>;
    get stackHelper(): IStackHelper;
    get vanillaRecipeFactory(): IVanillaRecipeFactory;
    getRecipeType<T>(uid: ResourceLocation, recipeClass: Class<T>): Optional<RecipeType<T>>;
    getRecipeType(uid: ResourceLocation): Optional<RecipeType<any>>;
    setRecipeCategories(recipeCategories: Collection<IRecipeCategory<any>>): void;
  }


  interface JeiRuntime extends IJeiRuntime {}
  class JeiRuntime extends IJeiRuntime {
    constructor(recipeManager: IRecipeManager, ingredientManager: IIngredientManager, keyMappings: IJeiKeyMappings, jeiHelpers: IJeiHelpers, screenHelper: IScreenHelper, recipeTransferManager: IRecipeTransferManager, editModeConfig: IEditModeConfig, ingredientListOverlay: IIngredientListOverlay, bookmarkOverlay: IBookmarkOverlay, recipesGui: IRecipesGui, ingredientFilter: IIngredientFilter, configManager: IJeiConfigManager);
    get bookmarkOverlay(): IBookmarkOverlay;
    get configManager(): IJeiConfigManager;
    get editModeConfig(): IEditModeConfig;
    get ingredientFilter(): IIngredientFilter;
    get ingredientListOverlay(): IIngredientListOverlay;
    get ingredientManager(): IIngredientManager;
    get jeiHelpers(): IJeiHelpers;
    get keyMappings(): IJeiKeyMappings;
    get recipeManager(): IRecipeManager;
    get recipeTransferManager(): IRecipeTransferManager;
    get recipesGui(): IRecipesGui;
    get screenHelper(): IScreenHelper;
  }

}

declare module 'mezz.jei.library.startup' {
  class JeiStarter {
    constructor(data: StartData);
    start(): void;
    stop(): void;
  }

}

declare module 'mezz.jei.library.transfer' {
  import { IRecipeTransferHandler, IRecipeTransferHandlerHelper, IRecipeTransferInfo, IRecipeTransferError } from 'mezz.jei.api.recipe.transfer';
  import { IConnectionToServer } from 'mezz.jei.common.network';
  import { IStackHelper } from 'mezz.jei.api.helpers';
  import { Class, Integer } from 'java.lang';
  import { Optional, List, Set, Collection, Map } from 'java.util';
  import { MenuType, Slot, AbstractContainerMenu, InventoryMenu } from 'net.minecraft.world.inventory';
  import { RecipeType } from 'mezz.jei.api.recipe';
  import { IRecipeSlotsView, IRecipeSlotView } from 'mezz.jei.api.gui.ingredient';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InventoryState } from 'mezz.jei.library.transfer.BasicRecipeTransferHandler';
  import { RecipeHolder, CraftingRecipe, Ingredient } from 'net.minecraft.world.item.crafting';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Type } from 'mezz.jei.api.recipe.transfer.IRecipeTransferError';
  import { ITooltipBuilder } from 'mezz.jei.api.gui.builder';
  import { CraftingRecipeCategory } from 'mezz.jei.library.plugins.vanilla.crafting';

  interface BasicRecipeTransferHandler<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferHandler<C, R> {}
  class BasicRecipeTransferHandler<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferHandler<C, R> {
    constructor(serverConnection: IConnectionToServer, stackHelper: IStackHelper, handlerHelper: IRecipeTransferHandlerHelper, transferInfo: IRecipeTransferInfo<C, R>);
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    get recipeType(): RecipeType<R>;
    static getInventoryState<C extends AbstractContainerMenu, R>(craftingSlots: Collection<Slot>, inventorySlots: Collection<Slot>, player: Player, container: C, transferInfo: IRecipeTransferInfo<C, R>): InventoryState;
    static slotIndexes(slots: Collection<Slot>): Set<number>;
    transferRecipe(container: C, recipe: R, recipeSlotsView: IRecipeSlotsView, player: Player, maxTransfer: boolean, doTransfer: boolean): IRecipeTransferError;
    static validateRecipeView<C extends AbstractContainerMenu, R>(transferInfo: IRecipeTransferInfo<C, R>, container: C, craftingSlots: Slot[], inputSlots: IRecipeSlotView[]): boolean;
    static validateTransferInfo<C extends AbstractContainerMenu, R>(transferInfo: IRecipeTransferInfo<C, R>, container: C, craftingSlots: Slot[], inventorySlots: Slot[]): boolean;
  }


  interface BasicRecipeTransferInfo<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferInfo<C, R> {}
  class BasicRecipeTransferInfo<C extends AbstractContainerMenu = any, R = any> extends IRecipeTransferInfo<C, R> {
    constructor(containerClass: Class<C>, menuType: MenuType<C>, recipeType: RecipeType<R>, recipeSlotStart: number, recipeSlotCount: number, inventorySlotStart: number, inventorySlotCount: number);
    canHandle(container: C, recipe: R): boolean;
    get containerClass(): Class<C>;
    get menuType(): Optional<MenuType<C>>;
    get recipeType(): RecipeType<R>;
    getInventorySlots(container: C, recipe: R): Slot[];
    getRecipeSlots(container: C, recipe: R): Slot[];
  }


  interface PlayerRecipeTransferHandler extends IRecipeTransferHandler<InventoryMenu, RecipeHolder> {}
  class PlayerRecipeTransferHandler extends IRecipeTransferHandler<InventoryMenu, RecipeHolder> {
    constructor(handlerHelper: IRecipeTransferHandlerHelper);
    get containerClass(): Class<InventoryMenu>;
    get menuType(): Optional<MenuType<InventoryMenu>>;
    get recipeType(): RecipeType<RecipeHolder<CraftingRecipe>>;
    transferRecipe(container: InventoryMenu, recipe: RecipeHolder<CraftingRecipe>, recipeSlotsView: IRecipeSlotsView, player: Player, maxTransfer: boolean, doTransfer: boolean): IRecipeTransferError;
  }


  interface RecipeTransferErrorMissingSlots extends RecipeTransferErrorTooltip {}
  class RecipeTransferErrorMissingSlots extends RecipeTransferErrorTooltip {
    constructor(message: Component, slots: Collection<IRecipeSlotView>);
    get missingCountHint(): number;
    showError(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, recipeSlotsView: IRecipeSlotsView, recipeX: number, recipeY: number): void;
  }


  interface RecipeTransferErrorTooltip extends IRecipeTransferError {}
  class RecipeTransferErrorTooltip extends IRecipeTransferError {
    constructor(message: Component);
    get tooltip(): Component[];
    get type(): Type;
    getTooltip(tooltip: ITooltipBuilder): void;
  }


  interface RecipeTransferHandlerHelper extends IRecipeTransferHandlerHelper {}
  class RecipeTransferHandlerHelper extends IRecipeTransferHandlerHelper {
    constructor(stackHelper: IStackHelper, craftingRecipeCategory: CraftingRecipeCategory);
    createBasicRecipeTransferInfo<C extends AbstractContainerMenu, R>(containerClass: Class<C>, menuType: MenuType<C>, recipeType: RecipeType<R>, recipeSlotStart: number, recipeSlotCount: number, inventorySlotStart: number, inventorySlotCount: number): IRecipeTransferInfo<C, R>;
    createInternalError(): IRecipeTransferError;
    createRecipeSlotsView(slotViews: IRecipeSlotView[]): IRecipeSlotsView;
    createUnregisteredRecipeTransferHandler<C extends AbstractContainerMenu, R>(recipeTransferInfo: IRecipeTransferInfo<C, R>): IRecipeTransferHandler<C, R>;
    createUserErrorForMissingSlots(tooltipMessage: Component, missingItemSlots: Collection<IRecipeSlotView>): IRecipeTransferError;
    createUserErrorWithTooltip(tooltipMessage: Component): IRecipeTransferError;
    getGuiSlotIndexToIngredientMap(recipeHolder: RecipeHolder<CraftingRecipe>): Map<number, Ingredient>;
    recipeTransferHasServerSupport(): boolean;
  }

}

declare module 'mezz.jei.library.util' {
  import { IIngredientSupplier } from 'mezz.jei.api.ingredients';
  import { IRecipeCategory } from 'mezz.jei.api.recipe.category';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Recipe, RecipeInput } from 'net.minecraft.world.item.crafting';

  class IngredientSupplierHelper {
    static getIngredientSupplier<T>(recipe: T, recipeCategory: IRecipeCategory<T>, ingredientManager: IIngredientManager): IIngredientSupplier;
  }


  class RecipeDebugUtil {
    static getDebugInfoFromRecipe<T>(recipe: T, recipeCategory: IRecipeCategory<T>, ingredientManager: IIngredientManager): string;
  }


  class RecipeUtil {
    static assembleResultItem<I extends RecipeInput>(input: I, recipe: Recipe<I>): ItemStack;
    static getResultItem(recipe: Recipe<any>): ItemStack;
  }


  class ResourceLocationUtil {
    static sanitizePath(path: string): string;
  }

}

declare module 'mezz.jei.neoforge.config' {
  import { IServerConfig } from 'mezz.jei.common.config';
  import { ModLoadingContext } from 'net.neoforged.fml';

  interface ServerConfig extends IServerConfig {}
  class ServerConfig extends IServerConfig {
    isCheatModeEnabledForCreative(): boolean;
    isCheatModeEnabledForGive(): boolean;
    isCheatModeEnabledForOp(): boolean;
    static register(modLoadingContext: ModLoadingContext): IServerConfig;
  }

}

declare module 'mezz.jei.neoforge.events' {
  import { IEventBus, Event } from 'net.neoforged.bus.api';
  import { Class } from 'java.lang';
  import { Consumer } from 'java.util.function';

  class EventSubscription<T extends Event = any> {
    static register<T extends Event>(eventBus: IEventBus, eventType: Class<T>, listener: Consumer<T>): EventSubscription<T>;
    unregister(): void;
  }


  class PermanentEventSubscriptions {
    constructor(eventBus: IEventBus, modEventBus: IEventBus);
    get modEventBus(): IEventBus;
    register<T extends Event>(eventType: Class<T>, listener: Consumer<T>): void;
  }


  class RuntimeEventSubscriptions {
    constructor(eventBus: IEventBus);
    clear(): void;
    isEmpty(): boolean;
    register<T extends Event>(eventType: Class<T>, listener: Consumer<T>): void;
  }

}

declare module 'mezz.jei.neoforge.input' {
  import { AbstractJeiKeyMappingBuilder, IJeiKeyMappingBuilder, JeiKeyConflictContext, JeiKeyModifier, IJeiKeyMappingInternal, IJeiKeyMappingCategoryBuilder } from 'mezz.jei.common.input.keys';
  import { UserInput } from 'mezz.jei.gui.input';
  import { KeyPressed, MouseButtonPressed, MouseButtonReleased } from 'ScreenEvent';
  import { Optional, List } from 'java.util';
  import { Enum } from 'java.lang';
  import { KeyMapping } from 'net.minecraft.client';
  import { Key } from 'InputConstants';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';

  interface ForgeJeiKeyMappingBuilder extends AbstractJeiKeyMappingBuilder {}
  class ForgeJeiKeyMappingBuilder extends AbstractJeiKeyMappingBuilder {
    constructor(category: string, description: string);
    buildKeyboardKey(key: number): IJeiKeyMappingInternal;
    setContext(context: JeiKeyConflictContext): IJeiKeyMappingBuilder;
    setModifier(modifier: JeiKeyModifier): IJeiKeyMappingBuilder;
  }


  interface ForgeJeiKeyMappingCategoryBuilder extends IJeiKeyMappingCategoryBuilder {}
  class ForgeJeiKeyMappingCategoryBuilder extends IJeiKeyMappingCategoryBuilder {
    constructor(category: string);
    createMapping(description: string): IJeiKeyMappingBuilder;
  }


  class ForgeUserInput {
    static fromEvent(keyEvent: KeyPressed): UserInput;
    static fromEvent(event: MouseButtonPressed): Optional<UserInput>;
    static fromEvent(event: MouseButtonReleased): Optional<UserInput>;
  }


  interface JeiForgeKeyConflictContexts extends Enum<JeiForgeKeyConflictContexts> {}
  class JeiForgeKeyConflictContexts extends Enum<JeiForgeKeyConflictContexts> {
    static readonly JEI_GUI_HOVER: JeiForgeKeyConflictContexts;
    static readonly JEI_GUI_HOVER_CHEAT_MODE: JeiForgeKeyConflictContexts;
    static readonly JEI_GUI_HOVER_CONFIG_BUTTON: JeiForgeKeyConflictContexts;
    static readonly JEI_GUI_HOVER_SEARCH: JeiForgeKeyConflictContexts;
    static valueOf(name: string): JeiForgeKeyConflictContexts;
    static values(): JeiForgeKeyConflictContexts[];
  }


  interface NeoForgeJeiKeyMapping extends IJeiKeyMappingInternal {}
  class NeoForgeJeiKeyMapping extends IJeiKeyMappingInternal {
    constructor(keyMapping: KeyMapping);
    get translatedKeyMessage(): Component;
    isActiveAndMatches(key: Key): boolean;
    isUnbound(): boolean;
    register(registerMethod: Consumer<KeyMapping>): IJeiKeyMappingInternal;
  }

}

declare module 'mezz.jei.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Dist } from 'net.neoforged.api.distmarker';
  import { NetworkHandler } from 'mezz.jei.neoforge.network';
  import { PermanentEventSubscriptions } from 'mezz.jei.neoforge.events';

  class JustEnoughItems {
    constructor(modEventBus: IEventBus, dist: Dist);
  }


  class JustEnoughItemsClient {
    constructor(networkHandler: NetworkHandler, subscriptions: PermanentEventSubscriptions);
    register(): void;
  }


  class JustEnoughItemsClientSafeRunner {
    constructor(networkHandler: NetworkHandler, subscriptions: PermanentEventSubscriptions);
    registerClient(): void;
  }

}

declare module 'mezz.jei.neoforge.network' {
  import { IConnectionToClient, IConnectionToServer } from 'mezz.jei.common.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PlayToClientPacket, PlayToServerPacket } from 'mezz.jei.common.network.packets';
  import { IServerConfig } from 'mezz.jei.common.config';
  import { PermanentEventSubscriptions } from 'mezz.jei.neoforge.events';

  interface ConnectionToClient extends IConnectionToClient {}
  class ConnectionToClient extends IConnectionToClient {
    sendPacketToClient<T extends PlayToClientPacket<T>>(packet: T, player: ServerPlayer): void;
  }


  interface ConnectionToServer extends IConnectionToServer {}
  class ConnectionToServer extends IConnectionToServer {
    isJeiOnServer(): boolean;
    sendPacketToServer<T extends PlayToServerPacket<T>>(packet: T): void;
  }


  class NetworkHandler {
    constructor(protocolVersion: string, serverConfig: IServerConfig);
    get connectionToServer(): IConnectionToServer;
    registerPacketHandlers(subscriptions: PermanentEventSubscriptions): void;
  }

}

declare module 'mezz.jei.neoforge.platform' {
  import { List, Optional } from 'java.util';
  import { IJeiBrewingRecipe, IVanillaRecipeFactory } from 'mezz.jei.api.recipe.vanilla';
  import { IIngredientManager } from 'mezz.jei.api.runtime';
  import { PotionBrewing } from 'net.minecraft.world.item.alchemy';
  import { IPlatformConfigHelper, IPlatformFluidHelperInternal, IPlatformIngredientHelper, IPlatformInputHelper, IPlatformItemStackHelper, IPlatformModHelper, IPlatformHelper, IPlatformRecipeHelper, IPlatformRenderHelper, IPlatformScreenHelper } from 'mezz.jei.common.platform';
  import { Path } from 'java.nio.file';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { FluidStack } from 'net.neoforged.neoforge.fluids';
  import { IIngredientTypeWithSubtypes, IIngredientRenderer, ITypedIngredient } from 'mezz.jei.api.ingredients';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { DataComponentPatch } from 'net.minecraft.core.component';
  import { Component, FormattedText } from 'net.minecraft.network.chat';
  import { TooltipFlag, DyeColor, ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Holder, Direction } from 'net.minecraft.core';
  import { Codec } from 'com.mojang.serialization';
  import { Ingredient, SmithingRecipe } from 'net.minecraft.world.item.crafting';
  import { Stream } from 'java.util.stream';
  import { KeyMapping, Minecraft } from 'net.minecraft.client';
  import { Key } from 'InputConstants';
  import { IJeiKeyMappingCategoryBuilder } from 'mezz.jei.common.input.keys';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BakedModelWrapper } from 'net.neoforged.neoforge.client.model';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { RandomSource } from 'net.minecraft.util';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { GrindstoneMenu, Slot } from 'net.minecraft.world.inventory';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { MobEffectInstance } from 'net.minecraft.world.effect';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Either } from 'com.mojang.datafixers.util';
  import { TooltipComponent } from 'net.minecraft.world.inventory.tooltip';
  import { TagKey } from 'net.minecraft.tags';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { ImmutableRect2i } from 'mezz.jei.common.util';
  import { RecipeUpdateListener, RecipeBookTabButton, RecipeBookComponent } from 'net.minecraft.client.gui.screens.recipebook';
  import { EditBox } from 'net.minecraft.client.gui.components';

  class BrewingRecipeMaker {
    static getBrewingRecipes(ingredientManager: IIngredientManager, vanillaRecipeFactory: IVanillaRecipeFactory, potionBrewing: PotionBrewing): IJeiBrewingRecipe[];
  }


  interface ConfigHelper extends IPlatformConfigHelper {}
  class ConfigHelper extends IPlatformConfigHelper {
    get configScreen(): Optional<Screen>;
    get modConfigDir(): Path;
  }


  interface FluidHelper extends IPlatformFluidHelperInternal<FluidStack> {}
  class FluidHelper extends IPlatformFluidHelperInternal<FluidStack> {
    bucketVolume(): number;
    copy(ingredient: FluidStack): FluidStack;
    copyWithAmount(ingredient: FluidStack, amount: number): FluidStack;
    create(fluid: Holder<Fluid>, amount: number, components: DataComponentPatch): FluidStack;
    create(fluid: Holder<Fluid>, amount: number): FluidStack;
    createRenderer(capacity: number, showCapacity: boolean, width: number, height: number): IIngredientRenderer<FluidStack>;
    get codec(): Codec<FluidStack>;
    get fluidIngredientType(): IIngredientTypeWithSubtypes<Fluid, FluidStack>;
    getAmount(ingredient: FluidStack): number;
    getColorTint(ingredient: FluidStack): number;
    getComponentsPatch(ingredient: FluidStack): DataComponentPatch;
    getContainedFluid(ingredient: ITypedIngredient<any>): Optional<FluidStack>;
    getDisplayName(ingredient: FluidStack): Component;
    getStillFluidSprite(fluidStack: FluidStack): Optional<TextureAtlasSprite>;
    getTooltip(tooltip: Component[], ingredient: FluidStack, tooltipFlag: TooltipFlag): void;
    normalize(ingredient: FluidStack): FluidStack;
  }


  interface IngredientHelper extends IPlatformIngredientHelper {}
  class IngredientHelper extends IPlatformIngredientHelper {
    createShulkerDyeIngredient(color: DyeColor): Ingredient;
    getCompostValue(itemStack: ItemStack): number;
    getPotionContainers(potionBrewing: PotionBrewing): Ingredient[];
    getPotionIngredients(potionBrewing: PotionBrewing): Stream<Ingredient>;
  }


  interface InputHelper extends IPlatformInputHelper {}
  class InputHelper extends IPlatformInputHelper {
    createKeyMappingCategoryBuilder(name: string): IJeiKeyMappingCategoryBuilder;
    getClientTooltipFlag(tooltipFlag: TooltipFlag): TooltipFlag;
    isActiveAndMatches(keyMapping: KeyMapping, key: Key): boolean;
  }


  interface ItemStackHelper extends IPlatformItemStackHelper {}
  class ItemStackHelper extends IPlatformItemStackHelper {
    getBurnTime(itemStack: ItemStack): number;
    getCreatorModId(stack: ItemStack): Optional<string>;
    getTestTooltip(player: Player, itemStack: ItemStack): Component[];
    isBookEnchantable(stack: ItemStack, book: ItemStack): boolean;
  }


  interface ModHelper extends IPlatformModHelper {}
  class ModHelper extends IPlatformModHelper {
    getModNameForModId(modId: string): string;
    isInDev(): boolean;
  }


  interface NeoForgeLimitedQuadItemModel extends BakedModelWrapper<BakedModel> {}
  class NeoForgeLimitedQuadItemModel extends BakedModelWrapper<BakedModel> {
    applyTransform(cameraTransformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    getQuads(blockState: BlockState, direction: Direction, randomSource: RandomSource): BakedQuad[];
    getQuads(blockState: BlockState, direction: Direction, randomSource: RandomSource, extraData: ModelData, renderType: RenderType): BakedQuad[];
    getRenderPasses(itemStack: ItemStack, fabulous: boolean): BakedModel[];
    static wrap(model: BakedModel): BakedModel;
  }


  interface PlatformHelper extends IPlatformHelper {}
  class PlatformHelper extends IPlatformHelper {
    get configHelper(): ConfigHelper;
    get fluidHelper(): IPlatformFluidHelperInternal<any>;
    get ingredientHelper(): IngredientHelper;
    get inputHelper(): InputHelper;
    get itemStackHelper(): ItemStackHelper;
    get modHelper(): ModHelper;
    get recipeHelper(): RecipeHelper;
    get renderHelper(): RenderHelper;
    get screenHelper(): ScreenHelper;
  }


  interface RecipeHelper extends IPlatformRecipeHelper {}
  class RecipeHelper extends IPlatformRecipeHelper {
    getAddition(recipe: SmithingRecipe): Ingredient;
    getBase(recipe: SmithingRecipe): Ingredient;
    getBrewingRecipes(ingredientManager: IIngredientManager, vanillaRecipeFactory: IVanillaRecipeFactory, potionBrewing: PotionBrewing): IJeiBrewingRecipe[];
    getGrindstoneResult(grindstoneMenu: GrindstoneMenu, input1: ItemStack, input2: ItemStack): ItemStack;
    getTemplate(recipe: SmithingRecipe): Ingredient;
    isItemEnchantable(stack: ItemStack, enchantment: Holder<Enchantment>): boolean;
  }


  interface RenderHelper extends IPlatformRenderHelper {}
  class RenderHelper extends IPlatformRenderHelper {
    createLimitedQuadItemModel(bakedModel: BakedModel): BakedModel;
    get itemColors(): ItemColors;
    getFontRenderer(minecraft: Minecraft, itemStack: ItemStack): Font;
    getMainImage(sprite: TextureAtlasSprite): Optional<NativeImage>;
    getName(tagKey: TagKey<any>): Component;
    getParticleIcon(bakedModel: BakedModel): TextureAtlasSprite;
    renderTooltip(guiGraphics: GuiGraphics, elements: Either<FormattedText, TooltipComponent>[], x: number, y: number, font: Font, stack: ItemStack): void;
    shouldRender(potionEffect: MobEffectInstance): boolean;
  }


  interface ScreenHelper extends IPlatformScreenHelper {}
  class ScreenHelper extends IPlatformScreenHelper {
    canLoseFocus(editBox: EditBox): boolean;
    get toastsArea(): ImmutableRect2i;
    getBookArea(containerScreen: RecipeUpdateListener): ImmutableRect2i;
    getGuiLeft(containerScreen: AbstractContainerScreen<any>): number;
    getGuiTop(containerScreen: AbstractContainerScreen<any>): number;
    getSlotUnderMouse(containerScreen: AbstractContainerScreen<any>): Optional<Slot>;
    getTabButtons(recipeBookComponent: RecipeBookComponent): RecipeBookTabButton[];
    getXSize(containerScreen: AbstractContainerScreen<any>): number;
    getYSize(containerScreen: AbstractContainerScreen<any>): number;
  }

}

declare module 'mezz.jei.neoforge.plugins.neoforge' {
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IRuntimeRegistration } from 'mezz.jei.api.registration';
  import { Optional } from 'java.util';
  import { ResourceReloadHandler } from 'mezz.jei.gui.startup';

  interface NeoForgeGuiPlugin extends IModPlugin {}
  class NeoForgeGuiPlugin extends IModPlugin {
    get pluginUid(): ResourceLocation;
    static get resourceReloadHandler(): Optional<ResourceReloadHandler>;
    onRuntimeUnavailable(): void;
    registerRuntime(registration: IRuntimeRegistration): void;
  }

}

declare module 'mezz.jei.neoforge.startup' {
  import { RuntimeEventSubscriptions, PermanentEventSubscriptions } from 'mezz.jei.neoforge.events';
  import { JeiEventHandlers } from 'mezz.jei.gui.startup';
  import { GuiEventHandler } from 'mezz.jei.gui.events';
  import { List } from 'java.util';
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceManagerReloadListener, ResourceManager } from 'net.minecraft.server.packs.resources';
  import { Runnable } from 'java.lang';

  class EventRegistration {
    static registerEvents(subscriptions: RuntimeEventSubscriptions, eventHandlers: JeiEventHandlers): void;
    static registerGuiHandler(subscriptions: RuntimeEventSubscriptions, guiEventHandler: GuiEventHandler): void;
  }


  class ForgePluginFinder {
    static get modPlugins(): IModPlugin[];
  }


  interface StartEventObserver extends ResourceManagerReloadListener {}
  class StartEventObserver extends ResourceManagerReloadListener {
    constructor(startRunnable: Runnable, stopRunnable: Runnable);
    onResourceManagerReload(pResourceManager: ResourceManager): void;
    register(subscriptions: PermanentEventSubscriptions): void;
  }

}