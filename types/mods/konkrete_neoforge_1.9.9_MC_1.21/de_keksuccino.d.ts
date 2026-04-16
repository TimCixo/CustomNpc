declare module 'de.keksuccino.konkrete.command' {
  import { Runnable } from 'java.lang';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, SuggestionsBuilder } from 'com.mojang.brigadier.suggestion';

  class ClientExecutor {
    static execute(task: Runnable): void;
    static onClientTick(): void;
  }


  class CommandUtils {
    static getStringSuggestions(suggestionsBuilder: SuggestionsBuilder, ...suggestions: string[]): CompletableFuture<Suggestions>;
  }

}

declare module 'de.keksuccino.konkrete.config' {
  import { List } from 'java.util';
  import { Integer, Double, Long, Float, Boolean } from 'java.lang';
  import { EntryType } from 'de.keksuccino.konkrete.config.ConfigEntry';

  class Config {
    constructor(path: string);
    clearUnusedValues(): void;
    get allAsEntry(): ConfigEntry[];
    get categories(): string[];
    get categorys(): string[];
    get configName(): string;
    getAsEntry(name: string): ConfigEntry;
    getBoolean(name: string): boolean;
    getDouble(name: string): number;
    getEntriesForCategory(category: string): ConfigEntry[];
    getEntrysForCategory(category: string): ConfigEntry[];
    getFloat(name: string): number;
    getInteger(name: string): number;
    getLong(name: string): Long;
    getOrDefault<T>(valueName: string, defaultValue: T): T;
    getString(name: string): string;
    registerValue(uniqueName: string, defaultValue: number, category: string): void;
    registerValue(uniqueName: string, defaultValue: number, category: string): void;
    registerValue(uniqueName: string, defaultValue: Long, category: string): void;
    registerValue(uniqueName: string, defaultValue: number, category: string): void;
    registerValue(uniqueName: string, defaultValue: boolean, category: string): void;
    registerValue(uniqueName: string, defaultValue: string, category: string): void;
    registerValue(uniqueName: string, defaultValue: number, category: string, description: string): void;
    registerValue(uniqueName: string, defaultValue: number, category: string, description: string): void;
    registerValue(uniqueName: string, defaultValue: number, category: string, description: string): void;
    registerValue(uniqueName: string, defaultValue: Long, category: string, description: string): void;
    registerValue(uniqueName: string, defaultValue: boolean, category: string, description: string): void;
    registerValue(uniqueName: string, defaultValue: string, category: string, description: string): void;
    set configName(name: string);
    setCategory(valueName: string, category: string): void;
    setDescription(valueName: string, description: string): void;
    setValue(name: string, value: string): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: boolean): void;
    setValue(name: string, value: boolean): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: number): void;
    setValue(name: string, value: Long): void;
    setValue(name: string, value: number): void;
    syncConfig(): void;
    unregisterValue(name: string): void;
    valueExists(name: string): boolean;
  }


  class ConfigEntry {
    constructor(name: string, value: string, type: EntryType, category: string, description: string);
    get category(): string;
    get description(): string;
    get name(): string;
    get type(): EntryType;
    get value(): string;
    set category(category: string);
    set description(description: string);
    set value(value: string);
  }

}

declare module 'de.keksuccino.konkrete.config.ConfigEntry' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EntryType extends Enum<EntryType> {}
  class EntryType extends Enum<EntryType> {
    static readonly INTEGER: EntryType;
    static readonly STRING: EntryType;
    static readonly DOUBLE: EntryType;
    static readonly LONG: EntryType;
    static readonly FLOAT: EntryType;
    static readonly BOOLEAN: EntryType;
    static valueOf(name: string): EntryType;
    static values(): EntryType[];
  }

}

declare module 'de.keksuccino.konkrete.config.exceptions' {
  import { Exception } from 'java.lang';

  interface InvalidValueException extends Exception {}
  class InvalidValueException extends Exception {
    constructor(msg: string);
  }

}

declare module 'de.keksuccino.konkrete.file' {
  import { File } from 'java.io';
  import { List } from 'java.util';

  class FileUtils {
    static compressToZip(pathToCompare: string, zipFile: string): void;
    static compressToZip(filePathsToCompare: string[], zipFile: string): void;
    static copyFile(from: File, to: File): boolean;
    static generateAvailableFilename(dir: string, baseName: string, extension: string): string;
    static getFileLines(file: File): string[];
    static getFilenames(path: string, includeExtension: boolean): string[];
    static getFiles(path: string): string[];
    static moveFile(from: File, to: File): boolean;
    static unpackZip(zipPath: string, outputDir: string): void;
    static writeTextToFile(file: File, append: boolean, ...text: string[]): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.content' {
  import { Button, EditBox } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Color } from 'java.awt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ExternalTextureResourceLocation } from 'de.keksuccino.konkrete.resources';
  import { IAnimationRenderer } from 'de.keksuccino.konkrete.rendering.animation';
  import { CharacterFilter, KeyboardData, CharData } from 'de.keksuccino.konkrete.input';
  import { IMixinEditBox } from 'de.keksuccino.konkrete.mixin.mixins.client';
  import { IAdvancedWidgetBase } from 'de.keksuccino.konkrete.gui.content.handling';
  import { Component } from 'net.minecraft.network.chat';

  interface AdvancedButton extends Button {}
  class AdvancedButton extends Button {
    ignoreBlockedInput: boolean;
    ignoreLeftMouseDownClickBlock: boolean;
    enableRightclick: boolean;
    labelScale: number;
    renderLabel: boolean;
    loopBackgroundAnimations: boolean;
    restartBackgroundAnimationsOnHover: boolean;
    constructor(x: number, y: number, widthIn: number, heightIn: number, buttonText: string, onPress: OnPress);

    constructor(x: number, y: number, widthIn: number, heightIn: number, buttonText: string, handleClick: boolean, onPress: OnPress);
    get description(): string[];
    get fGColor(): number;
    get messageString(): string;
    get width(): number;
    get x(): number;
    get y(): number;
    hasBorder(): boolean;
    hasColorBackground(): boolean;
    hasCustomBackground(): boolean;
    hasCustomBackgroundHover(): boolean;
    hasCustomBackgroundNormal(): boolean;
    hasCustomTextureBackground(): boolean;
    static isAnyButtonLeftClicked(): boolean;
    isUseable(): boolean;
    keyPressed(p_keyPressed_1_: number, p_keyPressed_2_: number, p_keyPressed_3_: number): boolean;
    mouseClicked(p_mouseClicked_1_: number, p_mouseClicked_3_: number, p_mouseClicked_5_: number): boolean;
    onPress(): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set description(...desc: string[]);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setBackgroundColor(idle: Color, hovered: Color, idleBorder: Color, hoveredBorder: Color, borderWidth: number): void;
    setBackgroundColor(idle: Color, hovered: Color, idleBorder: Color, hoveredBorder: Color, borderWidth: number): void;
    setBackgroundHover(texture: ResourceLocation): void;
    setBackgroundHover(animation: IAnimationRenderer): void;
    setBackgroundNormal(texture: ResourceLocation): void;
    setBackgroundNormal(animation: IAnimationRenderer): void;
    setBackgroundTexture(normal: ResourceLocation, hovered: ResourceLocation): void;
    setBackgroundTexture(normal: ExternalTextureResourceLocation, hovered: ExternalTextureResourceLocation): void;
    setClickSound(key: string): void;
    setHandleClick(b: boolean): void;
    setHovered(b: boolean): void;
    setLabelShadow(shadow: boolean): void;
    setMessage(msg: string): void;
    setPressAction(press: OnPress): void;
    setUseable(b: boolean): void;
  }


  class AdvancedButtonHandler {
    static onDrawScreen(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    static setActiveDescriptionButton(btn: AdvancedButton): void;
  }


  interface AdvancedImageButton extends AdvancedButton {}
  class AdvancedImageButton extends AdvancedButton {
    constructor(x: number, y: number, widthIn: number, heightIn: number, image: ResourceLocation, handleClick: boolean, onPress: OnPress);

    constructor(x: number, y: number, widthIn: number, heightIn: number, image: ResourceLocation, onPress: OnPress);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    setImage(image: ResourceLocation): void;
  }


  interface AdvancedTextField extends ExtendedEditBox {}
  class AdvancedTextField extends ExtendedEditBox {
    constructor(font: Font, x: number, y: number, width: number, height: number, handleSelf: boolean, characterFilter: CharacterFilter);
    get accessor(): IMixinEditBox;
    get maxStringLength(): number;
    get selectionEnd(): number;
    isEditable(): boolean;
    isEnabled(): boolean;
    isHoveredOrFocused(): boolean;
    isLeftClicked(): boolean;
  }


  interface ContextMenu extends IMenu {}
  class ContextMenu extends IMenu {
    menuScale: number;
    constructor(width: number, buttonHeight: number, space: number);
    addChild(menu: ContextMenu): void;
    addContent(button: AdvancedButton): void;
    autoCloseChilds(autoclose: boolean): void;
    closeChilds(): void;
    closeMenu(): void;
    get lastHeight(): number;
    get parentButton(): AdvancedButton;
    get scaledWidth(): number;
    get width(): number;
    isHovered(): boolean;
    isLeftClicked(): boolean;
    isOpen(): boolean;
    isRenderedLeft(): boolean;
    isRenderedUp(): boolean;
    isUseable(): boolean;
    openMenuAt(x: number, y: number, screenWidth: number, screenHeight: number): void;
    openMenuAt(x: number, y: number): void;
    removeChild(menu: ContextMenu): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, screenWidth: number, screenHeight: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    set parentButton(parent: AdvancedButton);
    set width(width: number);
    setAlignment(up: boolean, left: boolean): void;
    setAlwaysOnTop(b: boolean): void;
    setAutoAlignment(autoalign: boolean): void;
    setAutoclose(b: boolean): void;
    setButtonHeight(height: number): void;
    setUseable(b: boolean): void;
  }


  interface DropdownMenu extends IMenu {}
  class DropdownMenu extends IMenu {
    constructor(label: string, width: number, height: number, x: number, y: number, space: number);
    addContent(button: AdvancedButton): void;
    closeMenu(): void;
    get dropdownParent(): AdvancedButton;
    isHovered(): boolean;
    isOpen(): boolean;
    isUseable(): boolean;
    openMenu(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    setAutoclose(b: boolean): void;
    setLabel(text: string): void;
    setUseable(b: boolean): void;
  }


  interface ExtendedEditBox extends IAdvancedWidgetBase, EditBox {}
  class ExtendedEditBox extends IAdvancedWidgetBase {
    constructor(font: Font, x: number, y: number, width: number, height: number, hint: Component, handleSelf: boolean);

    constructor(font: Font, x: number, y: number, width: number, height: number, editBox: EditBox, hint: Component, handleSelf: boolean);
    charTyped(character: string, modifiers: number): boolean;
    get characterFilter(): CharacterFilter;
    insertText(textToWrite: string): void;
    keyPressed(p_94132_: number, p_94133_: number, p_94134_: number): boolean;
    onCharTyped(d: CharData): void;
    onKeyPress(d: KeyboardData): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set characterFilter(characterFilter: CharacterFilter);
  }


  class HorizontalSwitcher {
    constructor(displayWidth: number, ignoreBlockedInput: boolean, ...values: string[]);
    addValue(value: string): void;
    get height(): number;
    get selectedValue(): string;
    get totalWidth(): number;
    removeValue(value: string): void;
    render(graphics: GuiGraphics, x: number, y: number): void;
    set selectedValue(value: string);
    setButtonColor(idle: Color, hovered: Color, idleBorder: Color, hoveredBorder: Color, borderWidth: number): void;
    setValueBackgroundColor(color: Color): void;
    setValueColor(color: Color): void;
  }


  class IMenu {
    closeMenu(): void;
    isOpen(): boolean;
    isUseable(): boolean;
    setUseable(var1: boolean): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.content.handling' {
  import { KeyboardData, CharData } from 'de.keksuccino.konkrete.input';

  class AdvancedWidgetsHandler {
    static handleWidget(widget: IAdvancedWidgetBase): void;
    static onClientTick(): void;
    static onOpenScreen(): void;
    static onScreenCharTyped(character: string, modifiers: number): void;
    static onScreenKeyPressed(keyCode: number, scanCode: number, modifiers: number): void;
  }


  class IAdvancedWidgetBase {
    onCharTyped(var1: CharData): void;
    onKeyPress(var1: KeyboardData): void;
    onKeyReleased(d: KeyboardData): void;
    onMouseClicked(mouseX: number, mouseY: number, mouseButton: number): void;
    onTick(): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.content.scrollarea' {
  import { Color } from 'java.awt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';

  class LegacyScrollAreaCompat {
    static notifyCallbacks(scrollDelta: number): void;
  }


  class ScrollArea {
    backgroundColor: Color;
    grabberColorNormal: Color;
    grabberColorHover: Color;
    grabberTextureNormal: ResourceLocation;
    grabberTextureHover: ResourceLocation;
    x: number;
    y: number;
    width: number;
    height: number;
    grabberheight: number;
    grabberwidth: number;
    enableScrolling: boolean;
    constructor(x: number, y: number, width: number, height: number);
    addEntry(e: ScrollAreaEntry): void;
    get entries(): ScrollAreaEntry[];
    get stackedEntryHeight(): number;
    isAreaHovered(): boolean;
    isGrabberHovered(): boolean;
    isGrabberPressed(): boolean;
    onMouseScrollPre(scrollDelta: number): void;
    removeEntry(e: ScrollAreaEntry): void;
    render(graphics: GuiGraphics): void;
  }


  class ScrollAreaEntry {
    x: number;
    y: number;
    readonly parent: ScrollArea;
    constructor(parent: ScrollArea);
    get height(): number;
    get width(): number;
    isHovered(): boolean;
    isVisible(): boolean;
    render(graphics: GuiGraphics): void;
    renderEntry(var1: GuiGraphics): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.content.widget' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  class WidgetUtils {
    static setHeight(widget: AbstractWidget, height: number): AbstractWidget;
  }

}

declare module 'de.keksuccino.konkrete.gui.screens' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Config } from 'de.keksuccino.konkrete.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ConfigScreen extends Screen {}
  class ConfigScreen extends Screen {
    constructor(config: Config, title: string, parent: Screen);
    onClose(): void;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    renderBackground(guiGraphics: GuiGraphics, i: number, j: number, f: number): void;
    setCategoryDisplayName(categoryName: string, displayName: string): void;
    setValueDescription(valueName: string, desc: string): void;
    setValueDisplayName(valueName: string, displayName: string): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'de.keksuccino.konkrete.gui.screens.popup' {
  import { Color } from 'java.awt';
  import { File } from 'java.io';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { KeyboardData, CharacterFilter } from 'de.keksuccino.konkrete.input';
  import { Runnable, Boolean } from 'java.lang';
  import { List } from 'java.util';
  import { AdvancedButton } from 'de.keksuccino.konkrete.gui.content';

  interface FilePickerPopup extends Popup {}
  class FilePickerPopup extends Popup {
    overlayColor: Color;
    home: File;
    directory: File;
    constructor(directory: string, home: string, fallback: Popup, checkForLastPath: boolean, callback: Consumer<File>, ...filetypes: string[]);

    constructor(directory: string, home: string, fallback: Popup, checkForLastPath: boolean, callback: Consumer<File>);
    onEnterPressed(d: KeyboardData): void;
    onEscapePressed(d: KeyboardData): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, renderIn: Screen): void;
    updateFileList(): void;
  }


  interface NotificationPopup extends Popup {}
  class NotificationPopup extends Popup {
    constructor(width: number, color: Color, backgroundAlpha: number, callback: Runnable, ...text: string[]);
    onEnterOrEscapePressed(d: KeyboardData): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, renderIn: Screen): void;
    setNotificationText(...text: string[]): void;
  }


  class Popup {
    constructor(backgroundAlpha: number);
    get buttons(): AdvancedButton[];
    isDisplayed(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, renderIn: Screen): void;
    setDisplayed(b: boolean): void;
  }


  class PopupHandler {
    static displayPopup(p: Popup): void;
    static get currentPopup(): Popup;
    static isPopupActive(): boolean;
  }


  interface TextInputPopup extends Popup {}
  class TextInputPopup extends Popup {
    constructor(color: Color, title: string, filter: CharacterFilter, alpha: number);

    constructor(color: Color, title: string, filter: CharacterFilter, backgroundAlpha: number, callback: Consumer<string>);
    get input(): string;
    onEnterPressed(d: KeyboardData): void;
    onEscapePressed(d: KeyboardData): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, renderIn: Screen): void;
    setText(text: string): void;
  }


  interface YesNoPopup extends Popup {}
  class YesNoPopup extends Popup {
    constructor(width: number, color: Color, backgroundAlpha: number, callback: Consumer<boolean>, ...text: string[]);
    onEnterPressed(d: KeyboardData): void;
    onEscapePressed(d: KeyboardData): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, renderIn: Screen): void;
    setNotificationText(...text: string[]): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.screens.popup.FilePickerPopup' {
  import { ScrollAreaEntry } from 'de.keksuccino.konkrete.gui.content.scrollarea';
  import { File } from 'java.io';
  import { Type } from 'de.keksuccino.konkrete.gui.screens.popup.FilePickerPopup.FileChooserEntry';
  import { FilePickerPopup } from 'de.keksuccino.konkrete.gui.screens.popup';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface FileChooserEntry extends ScrollAreaEntry {}
  class FileChooserEntry extends ScrollAreaEntry {
    file: File;
    type: Type;
    filechooser: FilePickerPopup;
    constructor(file: File, filechooser: FilePickerPopup, type: Type);
    get height(): number;
    onClick(): void;
    render(graphics: GuiGraphics): void;
    renderEntry(graphics: GuiGraphics): void;
  }

}

declare module 'de.keksuccino.konkrete.gui.screens.popup.FilePickerPopup.FileChooserEntry' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly FILE: Type;
    static readonly FOLDER: Type;
    static readonly BACK: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'de.keksuccino.konkrete.input' {
  import { Consumer } from 'java.util.function';

  class CharacterFilter {
    addAllowedCharacters(...chars: string[]): void;
    addAllowedCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    filterForAllowedChars(text: string): string;
    static get basicFilenameCharacterFilter(): CharacterFilter;
    static get doubleCharacterFiler(): CharacterFilter;
    static get filenameFilterWithUppercaseSupport(): CharacterFilter;
    static get integerCharacterFiler(): CharacterFilter;
    static get urlCharacterFilter(): CharacterFilter;
    isAllowed(c: string): boolean;
    isAllowed(charString: string): boolean;
  }


  class CharData {
    readonly typedChar: string;
    readonly modfiers: number;
    constructor(c: string, modifiers: number);
  }


  class KeyboardData {
    readonly keycode: number;
    readonly scancode: number;
    readonly modfiers: number;
    constructor(keycode: number, scancode: number, modifiers: number);
  }


  class KeyboardHandler {
    static addCharTypedListener(c: Consumer<CharData>): number;
    static addKeyPressedListener(c: Consumer<KeyboardData>): number;
    static addKeyReleasedListener(c: Consumer<KeyboardData>): number;
    static get currentChar(): string;
    static get currentCharModifiers(): number;
    static get currentKeyCode(): number;
    static get currentKeyModifiers(): number;
    static get currentKeyScanCode(): number;
    static isAltPressed(): boolean;
    static isCtrlPressed(): boolean;
    static isKeyPressed(): boolean;
    static removeCharTypedListener(id: number): void;
    static removeKeyPressedListener(id: number): void;
    static removeKeyReleasedListener(id: number): void;
  }


  class MouseInput {
    static mouseHandler_screenLeftMouseDown: boolean;
    static mouseHandler_screenRightMouseDown: boolean;
    static blockVanillaInput(category: string): void;
    static get activeMouseButton(): number;
    static get mouseX(): number;
    static get mouseY(): number;
    static ignoreBlockedVanillaInput(ignore: boolean): void;
    static isLeftMouseDown(): boolean;
    static isRightMouseDown(): boolean;
    static isVanillaInputBlocked(): boolean;
    static resetRenderScale(): void;
    static setRenderScale(scale: number): void;
    static unblockVanillaInput(category: string): void;
  }


  class StringUtils {
    static convertFormatCodes(input: string, oldPrefix: string, newPrefix: string): string;
    static replaceAllExceptOf(inParameter: string, replaceWith: string, ...keepChars: string[]): string;
    static splitLines(inParameter: string, separator: string): string[];
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath' {
  import { Defaults, ConfigurationBuilder } from 'de.keksuccino.konkrete.json.jsonpath.Configuration';
  import { Collection, Set, List } from 'java.util';
  import { JsonProvider } from 'de.keksuccino.konkrete.json.jsonpath.spi.json';
  import { MappingProvider } from 'de.keksuccino.konkrete.json.jsonpath.spi.mapper';
  import { PredicateContext } from 'de.keksuccino.konkrete.json.jsonpath.Predicate';
  import { Path } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { Pattern } from 'java.util.regex';
  import { Class, Throwable, RuntimeException, Enum, Comparable } from 'java.lang';
  import { EvaluationContinuation, FoundResult } from 'de.keksuccino.konkrete.json.jsonpath.EvaluationListener';
  import { URL } from 'java.net';
  import { File, InputStream } from 'java.io';
  import { Type } from 'java.lang.reflect';

  class Configuration {
    addEvaluationListeners(...evaluationListener: EvaluationListener[]): Configuration;
    addOptions(...options: Option[]): Configuration;
    static builder(): ConfigurationBuilder;
    containsOption(option: Option): boolean;
    static defaultConfiguration(): Configuration;
    equals(o: any): boolean;
    get evaluationListeners(): Collection<EvaluationListener>;
    get options(): Set<Option>;
    jsonProvider(newJsonProvider: JsonProvider): Configuration;
    jsonProvider(): JsonProvider;
    mappingProvider(newMappingProvider: MappingProvider): Configuration;
    mappingProvider(): MappingProvider;
    set evaluationListeners(...evaluationListener: EvaluationListener[]);
    set options(...options: Option[]);
    static setDefaults(defaults: Defaults): void;
  }


  interface Criteria extends Predicate {}
  class Criteria extends Predicate {
    all(...o: any[]): Criteria;
    all(c: Collection<any>): Criteria;
    and(key: string): Criteria;
    anyof(...o: any[]): Criteria;
    anyof(c: Collection<any>): Criteria;
    apply(ctx: PredicateContext): boolean;
    contains(o: any): Criteria;
    static create(left: string, operator: string, right: string): Criteria;
    empty(empty: boolean): Criteria;
    eq(o: any): Criteria;
    exists(shouldExist: boolean): Criteria;
    gt(o: any): Criteria;
    gte(o: any): Criteria;
    in(...o: any[]): Criteria;
    in(c: Collection<any>): Criteria;
    is(o: any): Criteria;
    lt(o: any): Criteria;
    lte(o: any): Criteria;
    matches(p: Predicate): Criteria;
    ne(o: any): Criteria;
    nin(...o: any[]): Criteria;
    nin(c: Collection<any>): Criteria;
    noneof(...o: any[]): Criteria;
    noneof(c: Collection<any>): Criteria;
    notEmpty(): Criteria;
    static parse(criteria: string): Criteria;
    regex(pattern: Pattern): Criteria;
    size(size: number): Criteria;
    subsetof(...o: any[]): Criteria;
    subsetof(c: Collection<any>): Criteria;
    toString(): string;
    type(clazz: Class<any>): Criteria;
    static where(key: Path): Criteria;
    static where(key: string): Criteria;
  }


  interface DocumentContext extends ReadContext, WriteContext {}
  class DocumentContext extends ReadContext {
  }


  class EvaluationListener {
    resultFound(var1: FoundResult): EvaluationContinuation;
  }


  interface Filter extends Predicate {}
  class Filter extends Predicate {
    and(other: Predicate): Filter;
    apply(var1: PredicateContext): boolean;
    static filter(predicate: Predicate): Filter;
    static filter(predicates: Collection<Predicate>): Filter;
    or(other: Predicate): Filter;
    static parse(filter: string): Filter;
  }


  interface InvalidCriteriaException extends JsonPathException {}
  class InvalidCriteriaException extends JsonPathException {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  interface InvalidJsonException extends JsonPathException {}
  class InvalidJsonException extends JsonPathException {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);

    constructor(cause: Throwable, json: string);
    get json(): string;
  }


  interface InvalidModificationException extends JsonPathException {}
  class InvalidModificationException extends JsonPathException {
    constructor(message: string);
  }


  interface InvalidPathException extends JsonPathException {}
  class InvalidPathException extends JsonPathException {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  class JsonPath {
    add<T>(jsonObject: any, value: any, configuration: Configuration): T;
    static compile(jsonPath: string, ...filters: Predicate[]): JsonPath;
    delete<T>(jsonObject: any, configuration: Configuration): T;
    get path(): string;
    isDefinite(): boolean;
    static isPathDefinite(path: string): boolean;
    map<T>(jsonObject: any, mapFunction: MapFunction, configuration: Configuration): T;
    static parse(json: any): DocumentContext;
    static parse(json: string): DocumentContext;
    static parse(json: InputStream): DocumentContext;
    static parse(json: File): DocumentContext;
    static parse(json: URL): DocumentContext;
    static parse(json: any, configuration: Configuration): DocumentContext;
    static parse(json: string, configuration: Configuration): DocumentContext;
    static parse(json: InputStream, configuration: Configuration): DocumentContext;
    static parse(json: File, configuration: Configuration): DocumentContext;
    static parse(json: URL, configuration: Configuration): DocumentContext;
    put<T>(jsonObject: any, key: string, value: any, configuration: Configuration): T;
    read<T>(jsonObject: any): T;
    read<T>(jsonObject: any, configuration: Configuration): T;
    read<T>(json: string): T;
    read<T>(json: string, configuration: Configuration): T;
    read<T>(jsonURL: URL): T;
    read<T>(jsonFile: File): T;
    read<T>(jsonFile: File, configuration: Configuration): T;
    read<T>(jsonInputStream: InputStream): T;
    read<T>(jsonInputStream: InputStream, configuration: Configuration): T;
    read<T>(jsonInputStream: InputStream, charset: string, configuration: Configuration): T;
    static read<T>(json: any, jsonPath: string, ...filters: Predicate[]): T;
    static read<T>(json: string, jsonPath: string, ...filters: Predicate[]): T;
    static read<T>(jsonURL: URL, jsonPath: string, ...filters: Predicate[]): T;
    static read<T>(jsonFile: File, jsonPath: string, ...filters: Predicate[]): T;
    static read<T>(jsonInputStream: InputStream, jsonPath: string, ...filters: Predicate[]): T;
    renameKey<T>(jsonObject: any, oldKeyName: string, newKeyName: string, configuration: Configuration): T;
    set<T>(jsonObject: any, newVal: any, configuration: Configuration): T;
    static using(configuration: Configuration): ParseContext;
    static using(provider: JsonProvider): ParseContext;
  }


  interface JsonPathException extends RuntimeException {}
  class JsonPathException extends RuntimeException {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
  }


  class MapFunction {
    map(var1: any, var2: Configuration): any;
  }


  interface Option extends Enum<Option> {}
  class Option extends Enum<Option> {
    static readonly DEFAULT_PATH_LEAF_TO_NULL: Option;
    static readonly ALWAYS_RETURN_LIST: Option;
    static readonly AS_PATH_LIST: Option;
    static readonly SUPPRESS_EXCEPTIONS: Option;
    static readonly REQUIRE_PROPERTIES: Option;
    static valueOf(name: string): Option;
    static values(): Option[];
  }


  class ParseContext {
    parse(var1: string): DocumentContext;
    parse(var1: any): DocumentContext;
    parse(var1: InputStream): DocumentContext;
    parse(var1: InputStream, var2: string): DocumentContext;
    parse(var1: File): DocumentContext;
    parse(var1: URL): DocumentContext;
    parseUtf8(var1: number[]): DocumentContext;
  }


  interface PathNotFoundException extends InvalidPathException {}
  class PathNotFoundException extends InvalidPathException {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);
    fillInStackTrace(): Throwable;
  }


  class Predicate {
    apply(var1: PredicateContext): boolean;
  }


  class ReadContext {
    configuration(): Configuration;
    json<T>(): T;
    jsonString(): string;
    limit(var1: number): ReadContext;
    read<T>(var1: string, ...var2: Predicate[]): T;
    read<T>(var1: string, var2: Class<T>, ...var3: Predicate[]): T;
    read<T>(var1: JsonPath): T;
    read<T>(var1: JsonPath, var2: Class<T>): T;
    read<T>(var1: JsonPath, var2: TypeRef<T>): T;
    read<T>(var1: string, var2: TypeRef<T>): T;
    withListeners(...var1: EvaluationListener[]): ReadContext;
  }


  interface TypeRef<T = any> extends Comparable<TypeRef> {}
  class TypeRef<T = any> extends Comparable<TypeRef> {
    compareTo(o: TypeRef<T>): number;
    get type(): Type;
  }


  interface ValueCompareException extends JsonPathException {}
  class ValueCompareException extends JsonPathException {
    constructor();

    constructor(left: any, right: any);

    constructor(message: string);

    constructor(message: string, cause: Throwable);
  }


  class WriteContext {
    add(var1: string, var2: any, ...var3: Predicate[]): DocumentContext;
    add(var1: JsonPath, var2: any): DocumentContext;
    configuration(): Configuration;
    delete(var1: string, ...var2: Predicate[]): DocumentContext;
    delete(var1: JsonPath): DocumentContext;
    json<T>(): T;
    jsonString(): string;
    map(var1: string, var2: MapFunction, ...var3: Predicate[]): DocumentContext;
    map(var1: JsonPath, var2: MapFunction): DocumentContext;
    put(var1: string, var2: string, var3: any, ...var4: Predicate[]): DocumentContext;
    put(var1: JsonPath, var2: string, var3: any): DocumentContext;
    renameKey(var1: string, var2: string, var3: string, ...var4: Predicate[]): DocumentContext;
    renameKey(var1: JsonPath, var2: string, var3: string): DocumentContext;
    set(var1: string, var2: any, ...var3: Predicate[]): DocumentContext;
    set(var1: JsonPath, var2: any): DocumentContext;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.Configuration' {
  import { JsonProvider } from 'de.keksuccino.konkrete.json.jsonpath.spi.json';
  import { Set, Collection } from 'java.util';
  import { Option, EvaluationListener, Configuration } from 'de.keksuccino.konkrete.json.jsonpath';
  import { MappingProvider } from 'de.keksuccino.konkrete.json.jsonpath.spi.mapper';

  class Defaults {
    jsonProvider(): JsonProvider;
    mappingProvider(): MappingProvider;
    options(): Set<Option>;
  }


  class ConfigurationBuilder {
    build(): Configuration;
    evaluationListener(...listener: EvaluationListener[]): ConfigurationBuilder;
    evaluationListener(listeners: Collection<EvaluationListener>): ConfigurationBuilder;
    jsonProvider(provider: JsonProvider): ConfigurationBuilder;
    mappingProvider(provider: MappingProvider): ConfigurationBuilder;
    options(...flags: Option[]): ConfigurationBuilder;
    options(options: Set<Option>): ConfigurationBuilder;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.EvaluationListener' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class FoundResult {
    index(): number;
    path(): string;
    result(): any;
  }


  interface EvaluationContinuation extends Enum<EvaluationContinuation> {}
  class EvaluationContinuation extends Enum<EvaluationContinuation> {
    static readonly CONTINUE: EvaluationContinuation;
    static readonly ABORT: EvaluationContinuation;
    static valueOf(name: string): EvaluationContinuation;
    static values(): EvaluationContinuation[];
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal' {
  import { CharSequence, RuntimeException, Throwable, Class, Comparable, Iterable } from 'java.lang';
  import { Configuration, DocumentContext, Predicate, JsonPath, TypeRef, ReadContext, EvaluationListener, MapFunction } from 'de.keksuccino.konkrete.json.jsonpath';
  import { List, Collection } from 'java.util';
  import { Closeable } from 'java.io';

  class CharacterIndex {
    constructor(charSequence: CharSequence);
    charAt(idx: number): string;
    charAtOr(postition: number, defaultChar: string): string;
    charSequence(): CharSequence;
    currentChar(): string;
    currentCharIs(c: string): boolean;
    currentIsTail(): boolean;
    decrementEndPosition(charCount: number): number;
    hasMoreCharacters(): boolean;
    hasSignificantSubSequence(s: CharSequence): boolean;
    inBounds(idx: number): boolean;
    inBounds(): boolean;
    incrementPosition(charCount: number): number;
    indexOfClosingBracket(startPosition: number, skipStrings: boolean, skipRegex: boolean): number;
    indexOfClosingSquareBracket(startPosition: number): number;
    indexOfMatchingCloseChar(startPosition: number, openChar: string, closeChar: string, skipStrings: boolean, skipRegex: boolean): number;
    indexOfNextSignificantChar(c: string): number;
    indexOfNextSignificantChar(startPosition: number, c: string): number;
    indexOfPreviousSignificantChar(startPosition: number): number;
    indexOfPreviousSignificantChar(): number;
    isNumberCharacter(readPosition: number): boolean;
    isOutOfBounds(idx: number): boolean;
    lastCharIs(c: string): boolean;
    length(): number;
    nextCharIs(c: string): boolean;
    nextIndexOf(c: string): number;
    nextIndexOf(startPosition: number, c: string): number;
    nextIndexOfUnescaped(c: string): number;
    nextIndexOfUnescaped(startPosition: number, c: string): number;
    nextSignificantChar(): string;
    nextSignificantChar(startPosition: number): string;
    nextSignificantCharIs(startPosition: number, c: string): boolean;
    nextSignificantCharIs(c: string): boolean;
    position(): number;
    previousSignificantChar(startPosition: number): string;
    previousSignificantChar(): string;
    readSignificantChar(c: string): void;
    setPosition(newPosition: number): number;
    skipBlanks(): CharacterIndex;
    subSequence(start: number, end: number): CharSequence;
    toString(): string;
    trim(): CharacterIndex;
  }


  interface EvaluationAbortException extends RuntimeException {}
  class EvaluationAbortException extends RuntimeException {
    fillInStackTrace(): Throwable;
  }


  class EvaluationContext {
    configuration(): Configuration;
    get path<T>(): T;
    get pathList(): string[];
    get value<T>(): T;
    getValue<T>(var1: boolean): T;
    rootDocument(): any;
    updateOperations(): Collection<PathRef>;
  }


  interface JsonContext extends DocumentContext {}
  class JsonContext extends DocumentContext {
    add(path: string, value: any, ...filters: Predicate[]): DocumentContext;
    add(path: JsonPath, value: any): DocumentContext;
    configuration(): Configuration;
    delete(path: string, ...filters: Predicate[]): DocumentContext;
    delete(path: JsonPath): DocumentContext;
    json(): any;
    json<T>(): T;
    jsonString(): string;
    limit(maxResults: number): ReadContext;
    map(path: string, mapFunction: MapFunction, ...filters: Predicate[]): DocumentContext;
    map(path: JsonPath, mapFunction: MapFunction): DocumentContext;
    put(path: string, key: string, value: any, ...filters: Predicate[]): DocumentContext;
    put(path: JsonPath, key: string, value: any): DocumentContext;
    read<T>(path: string, ...filters: Predicate[]): T;
    read<T>(path: string, type: Class<T>, ...filters: Predicate[]): T;
    read<T>(path: JsonPath): T;
    read<T>(path: JsonPath, type: Class<T>): T;
    read<T>(path: JsonPath, type: TypeRef<T>): T;
    read<T>(path: string, type: TypeRef<T>): T;
    renameKey(path: string, oldKeyName: string, newKeyName: string, ...filters: Predicate[]): DocumentContext;
    renameKey(path: JsonPath, oldKeyName: string, newKeyName: string): DocumentContext;
    set(path: string, newValue: any, ...filters: Predicate[]): DocumentContext;
    set(path: JsonPath, newValue: any): DocumentContext;
    withListeners(...listener: EvaluationListener[]): ReadContext;
  }


  class JsonFormatter {
    static prettyPrint(input: string): string;
  }


  class Path {
    evaluate(var1: any, var2: any, var3: Configuration): EvaluationContext;
    evaluate(var1: any, var2: any, var3: Configuration, var4: boolean): EvaluationContext;
    isDefinite(): boolean;
    isFunctionPath(): boolean;
    isRootPath(): boolean;
  }


  interface PathRef extends Comparable<PathRef> {}
  class PathRef extends Comparable<PathRef> {
    static readonly NO_OP: PathRef;
    add(var1: any, var2: Configuration): void;
    compareTo(o: PathRef): number;
    convert(var1: MapFunction, var2: Configuration): void;
    static create(obj: any, property: string): PathRef;
    static create(obj: any, properties: Collection<string>): PathRef;
    static create(array: any, index: number): PathRef;
    static createRoot(root: any): PathRef;
    delete(var1: Configuration): void;
    put(var1: string, var2: any, var3: Configuration): void;
    renameKey(var1: string, var2: string, var3: Configuration): void;
    set(var1: any, var2: Configuration): void;
  }


  class Utils {
    static closeQuietly(closeable: Closeable): void;
    static concat(...strings: CharSequence[]): string;
    static escape(str: string, escapeSingleQuote: boolean): string;
    static hex(ch: string): string;
    static isEmpty(cs: CharSequence): boolean;
    static isTrue(expression: boolean, message: string): void;
    static join(delimiter: string, wrap: string, objs: Iterable<any>): string;
    static join(delimiter: string, objs: Iterable<any>): string;
    static notEmpty<T extends CharSequence>(chars: T, message: string): T;
    static notEmpty(bytes: number[], message: string): number[];
    static notEmpty<T extends CharSequence>(chars: T, message: string, ...values: any[]): T;
    static notNull<T>(object: T, message: string): T;
    static notNull<T>(object: T, message: string, ...values: any[]): T;
    static onlyOneIsTrue(message: string, ...expressions: boolean[]): void;
    static onlyOneIsTrueNonThrow(...expressions: boolean[]): boolean;
    static toString(o: any): string;
    static unescape(str: string): string;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.filter' {
  import { PredicateContext } from 'de.keksuccino.konkrete.json.jsonpath.Predicate';
  import { Predicate, Filter } from 'de.keksuccino.konkrete.json.jsonpath';
  import { Collection, List } from 'java.util';
  import { Enum, Class, CharSequence } from 'java.lang';
  import { PatternNode, PathNode, NumberNode, StringNode, BooleanNode, JsonNode, PredicateNode, ValueListNode, NullNode, UndefinedNode, ClassNode, OffsetDateTimeNode } from 'de.keksuccino.konkrete.json.jsonpath.internal.filter.ValueNodes';
  import { Pattern } from 'java.util.regex';
  import { Path } from 'de.keksuccino.konkrete.json.jsonpath.internal';

  class Evaluator {
    evaluate(var1: ValueNode, var2: ValueNode, var3: PredicateContext): boolean;
  }


  class EvaluatorFactory {
    static createEvaluator(operator: RelationalOperator): Evaluator;
  }


  interface ExpressionNode extends Predicate {}
  class ExpressionNode extends Predicate {
    static createExpressionNode(right: ExpressionNode, operator: LogicalOperator, left: ExpressionNode): ExpressionNode;
  }


  class FilterCompiler {
    static compile(filterString: string): Filter;
    compile(): Predicate;
  }


  interface LogicalExpressionNode extends ExpressionNode {}
  class LogicalExpressionNode extends ExpressionNode {
    and(other: LogicalExpressionNode): LogicalExpressionNode;
    append(expressionNode: ExpressionNode): LogicalExpressionNode;
    apply(ctx: PredicateContext): boolean;
    static createLogicalAnd(left: ExpressionNode, right: ExpressionNode): LogicalExpressionNode;
    static createLogicalAnd(operands: Collection<ExpressionNode>): LogicalExpressionNode;
    static createLogicalNot(op: ExpressionNode): ExpressionNode;
    static createLogicalOr(left: ExpressionNode, right: ExpressionNode): LogicalExpressionNode;
    static createLogicalOr(operands: Collection<ExpressionNode>): LogicalExpressionNode;
    get operator(): LogicalOperator;
    or(other: LogicalExpressionNode): LogicalExpressionNode;
    toString(): string;
  }


  interface LogicalOperator extends Enum<LogicalOperator> {}
  class LogicalOperator extends Enum<LogicalOperator> {
    static readonly AND: LogicalOperator;
    static readonly NOT: LogicalOperator;
    static readonly OR: LogicalOperator;
    static fromString(operatorString: string): LogicalOperator;
    get operatorString(): string;
    toString(): string;
    static valueOf(name: string): LogicalOperator;
    static values(): LogicalOperator[];
  }


  interface PatternFlag extends Enum<PatternFlag> {}
  class PatternFlag extends Enum<PatternFlag> {
    static readonly UNIX_LINES: PatternFlag;
    static readonly CASE_INSENSITIVE: PatternFlag;
    static readonly COMMENTS: PatternFlag;
    static readonly MULTILINE: PatternFlag;
    static readonly DOTALL: PatternFlag;
    static readonly UNICODE_CASE: PatternFlag;
    static readonly UNICODE_CHARACTER_CLASS: PatternFlag;
    static parseFlags(flags: string[]): number;
    static parseFlags(flags: number): string;
    static valueOf(name: string): PatternFlag;
    static values(): PatternFlag[];
  }


  interface RelationalExpressionNode extends ExpressionNode {}
  class RelationalExpressionNode extends ExpressionNode {
    constructor(left: ValueNode, relationalOperator: RelationalOperator, right: ValueNode);
    apply(ctx: PredicateContext): boolean;
    toString(): string;
  }


  interface RelationalOperator extends Enum<RelationalOperator> {}
  class RelationalOperator extends Enum<RelationalOperator> {
    static readonly GTE: RelationalOperator;
    static readonly LTE: RelationalOperator;
    static readonly EQ: RelationalOperator;
    static readonly TSEQ: RelationalOperator;
    static readonly NE: RelationalOperator;
    static readonly TSNE: RelationalOperator;
    static readonly LT: RelationalOperator;
    static readonly GT: RelationalOperator;
    static readonly REGEX: RelationalOperator;
    static readonly NIN: RelationalOperator;
    static readonly IN: RelationalOperator;
    static readonly CONTAINS: RelationalOperator;
    static readonly ALL: RelationalOperator;
    static readonly SIZE: RelationalOperator;
    static readonly EXISTS: RelationalOperator;
    static readonly TYPE: RelationalOperator;
    static readonly MATCHES: RelationalOperator;
    static readonly EMPTY: RelationalOperator;
    static readonly SUBSETOF: RelationalOperator;
    static readonly ANYOF: RelationalOperator;
    static readonly NONEOF: RelationalOperator;
    static fromString(operatorString: string): RelationalOperator;
    toString(): string;
    static valueOf(name: string): RelationalOperator;
    static values(): RelationalOperator[];
  }


  class ValueNode {
    asBooleanNode(): BooleanNode;
    asClassNode(): ClassNode;
    asJsonNode(): JsonNode;
    asNullNode(): NullNode;
    asNumberNode(): NumberNode;
    asOffsetDateTimeNode(): OffsetDateTimeNode;
    asPathNode(): PathNode;
    asPatternNode(): PatternNode;
    asPredicateNode(): PredicateNode;
    asStringNode(): StringNode;
    asUndefinedNode(): UndefinedNode;
    asValueListNode(): ValueListNode;
    static createBooleanNode(charSequence: CharSequence): BooleanNode;
    static createClassNode(clazz: Class<any>): ClassNode;
    static createJsonNode(json: CharSequence): JsonNode;
    static createJsonNode(parsedJson: any): JsonNode;
    static createNullNode(): NullNode;
    static createNumberNode(charSequence: CharSequence): NumberNode;
    static createOffsetDateTimeNode(charSequence: CharSequence): OffsetDateTimeNode;
    static createPathNode(path: CharSequence, existsCheck: boolean, shouldExists: boolean): PathNode;
    static createPathNode(path: Path): ValueNode;
    static createPatternNode(pattern: CharSequence): PatternNode;
    static createPatternNode(pattern: Pattern): PatternNode;
    static createStringNode(charSequence: CharSequence, escape: boolean): StringNode;
    static createUndefinedNode(): UndefinedNode;
    isBooleanNode(): boolean;
    isClassNode(): boolean;
    isJsonNode(): boolean;
    isNullNode(): boolean;
    isNumberNode(): boolean;
    isOffsetDateTimeNode(): boolean;
    isPathNode(): boolean;
    isPatternNode(): boolean;
    isPredicateNode(): boolean;
    isStringNode(): boolean;
    isUndefinedNode(): boolean;
    isValueListNode(): boolean;
    static toValueNode(o: any): ValueNode;
    type(var1: PredicateContext): Class<any>;
  }


  class ValueNodes {
    static readonly NULL_NODE: NullNode;
    static readonly TRUE: BooleanNode;
    static readonly FALSE: BooleanNode;
    static readonly UNDEFINED: UndefinedNode;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.filter.ValueNodes' {
  import { ValueNode } from 'de.keksuccino.konkrete.json.jsonpath.internal.filter';
  import { Class, Iterable } from 'java.lang';
  import { PredicateContext } from 'de.keksuccino.konkrete.json.jsonpath.Predicate';
  import { Path } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { Collection, List, Iterator } from 'java.util';
  import { Predicate } from 'de.keksuccino.konkrete.json.jsonpath';
  import { OffsetDateTime } from 'java.time';
  import { BigDecimal } from 'java.math';

  interface NullNode extends ValueNode {}
  class NullNode extends ValueNode {
    asNullNode(): NullNode;
    equals(o: any): boolean;
    isNullNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface BooleanNode extends ValueNode {}
  class BooleanNode extends ValueNode {
    asBooleanNode(): BooleanNode;
    equals(o: any): boolean;
    get boolean(): boolean;
    isBooleanNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface UndefinedNode extends ValueNode {}
  class UndefinedNode extends ValueNode {
    asUndefinedNode(): UndefinedNode;
    equals(o: any): boolean;
    isUndefinedNode(): boolean;
    type(ctx: PredicateContext): Class<any>;
  }


  interface PathNode extends ValueNode {}
  class PathNode extends ValueNode {
    asExistsCheck(shouldExist: boolean): PathNode;
    asPathNode(): PathNode;
    evaluate(ctx: PredicateContext): ValueNode;
    get path(): Path;
    isExistsCheck(): boolean;
    isPathNode(): boolean;
    shouldExists(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface ValueListNode extends Iterable<ValueNode>, ValueNode {}
  class ValueListNode extends Iterable<ValueNode> {
    constructor(values: Collection<any>);
    asValueListNode(): ValueListNode;
    contains(node: ValueNode): boolean;
    equals(o: any): boolean;
    get nodes(): ValueNode[];
    isValueListNode(): boolean;
    iterator(): Iterator<ValueNode>;
    subsetof(right: ValueListNode): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface PredicateNode extends ValueNode {}
  class PredicateNode extends ValueNode {
    constructor(predicate: Predicate);
    asPredicateNode(): PredicateNode;
    equals(o: any): boolean;
    get predicate(): Predicate;
    isPredicateNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface ClassNode extends ValueNode {}
  class ClassNode extends ValueNode {
    asClassNode(): ClassNode;
    equals(o: any): boolean;
    get clazz(): Class;
    isClassNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface OffsetDateTimeNode extends ValueNode {}
  class OffsetDateTimeNode extends ValueNode {
    asOffsetDateTimeNode(): OffsetDateTimeNode;
    asStringNode(): StringNode;
    equals(o: any): boolean;
    get date(): OffsetDateTime;
    isOffsetDateTimeNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface NumberNode extends ValueNode {}
  class NumberNode extends ValueNode {
    static NAN: NumberNode;
    asNumberNode(): NumberNode;
    asStringNode(): StringNode;
    equals(o: any): boolean;
    get number(): BigDecimal;
    isNumberNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface StringNode extends ValueNode {}
  class StringNode extends ValueNode {
    asNumberNode(): NumberNode;
    asStringNode(): StringNode;
    contains(str: string): boolean;
    equals(o: any): boolean;
    get string(): string;
    isEmpty(): boolean;
    isStringNode(): boolean;
    length(): number;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface JsonNode extends ValueNode {}
  class JsonNode extends ValueNode {
    asJsonNode(): JsonNode;
    asValueListNode(ctx: PredicateContext): ValueNode;
    asValueListNode(): ValueListNode;
    equals(jsonNode: JsonNode, ctx: PredicateContext): boolean;
    equals(o: any): boolean;
    get json(): any;
    isArray(ctx: PredicateContext): boolean;
    isEmpty(ctx: PredicateContext): boolean;
    isJsonNode(): boolean;
    isMap(ctx: PredicateContext): boolean;
    isParsed(): boolean;
    length(ctx: PredicateContext): number;
    parse(ctx: PredicateContext): any;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }


  interface PatternNode extends ValueNode {}
  class PatternNode extends ValueNode {
    asPatternNode(): PatternNode;
    equals(o: any): boolean;
    isPatternNode(): boolean;
    toString(): string;
    type(ctx: PredicateContext): Class<any>;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.function.json' {
  import { PathFunction, Parameter } from 'de.keksuccino.konkrete.json.jsonpath.internal.function';
  import { PathRef, EvaluationContext } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { List } from 'java.util';

  interface Append extends PathFunction {}
  class Append extends PathFunction {
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }


  interface KeySetFunction extends PathFunction {}
  class KeySetFunction extends PathFunction {
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.function.latebinding' {
  import { JsonProvider } from 'de.keksuccino.konkrete.json.jsonpath.spi.json';
  import { Parameter } from 'de.keksuccino.konkrete.json.jsonpath.internal.function';
  import { Path } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { Configuration } from 'de.keksuccino.konkrete.json.jsonpath';

  class ILateBindingValue {
    get (): any;
  }


  interface JsonLateBindingValue extends ILateBindingValue {}
  class JsonLateBindingValue extends ILateBindingValue {
    constructor(jsonProvider: JsonProvider, jsonParameter: Parameter);
    get (): any;
  }


  interface PathLateBindingValue extends ILateBindingValue {}
  class PathLateBindingValue extends ILateBindingValue {
    constructor(path: Path, rootDocument: any, configuration: Configuration);
    equals(o: any): boolean;
    get (): any;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.function.numeric' {
  import { PathFunction, Parameter } from 'de.keksuccino.konkrete.json.jsonpath.internal.function';
  import { PathRef, EvaluationContext } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { List } from 'java.util';

  interface AbstractAggregation extends PathFunction {}
  class AbstractAggregation extends PathFunction {
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }


  interface Average extends AbstractAggregation {}
  class Average extends AbstractAggregation {
  }


  interface Max extends AbstractAggregation {}
  class Max extends AbstractAggregation {
  }


  interface Min extends AbstractAggregation {}
  class Min extends AbstractAggregation {
  }


  interface StandardDeviation extends AbstractAggregation {}
  class StandardDeviation extends AbstractAggregation {
  }


  interface Sum extends AbstractAggregation {}
  class Sum extends AbstractAggregation {
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.function' {
  import { Path, EvaluationContext, PathRef } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { ILateBindingValue } from 'de.keksuccino.konkrete.json.jsonpath.internal.function.latebinding';
  import { Boolean, Class, Enum } from 'java.lang';
  import { List, Collection, Map } from 'java.util';

  class Parameter {
    constructor();

    constructor(json: string);

    constructor(path: Path);
    static consume(expectedType: Class, ctx: EvaluationContext, collection: Collection, value: any): void;
    get iLateBingValue(): ILateBindingValue;
    get json(): string;
    get path(): Path;
    get type(): ParamType;
    get value(): any;
    hasEvaluated(): boolean;
    set json(json: string);
    set path(path: Path);
    set type(type: ParamType);
    setEvaluated(evaluated: boolean): void;
    setLateBinding(lateBinding: ILateBindingValue): void;
    static toList<T>(type: Class<T>, ctx: EvaluationContext, parameters: Parameter[]): T[];
  }


  interface ParamType extends Enum<ParamType> {}
  class ParamType extends Enum<ParamType> {
    static readonly JSON: ParamType;
    static readonly PATH: ParamType;
    static valueOf(name: string): ParamType;
    static values(): ParamType[];
  }


  interface PassthruPathFunction extends PathFunction {}
  class PassthruPathFunction extends PathFunction {
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }


  class PathFunction {
    invoke(var1: string, var2: PathRef, var3: any, var4: EvaluationContext, var5: Parameter[]): any;
  }


  class PathFunctionFactory {
    static readonly FUNCTIONS: Map;
    static newFunction(name: string): PathFunction;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.function.text' {
  import { PathFunction, Parameter } from 'de.keksuccino.konkrete.json.jsonpath.internal.function';
  import { PathRef, EvaluationContext } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { List } from 'java.util';

  interface Concatenate extends PathFunction {}
  class Concatenate extends PathFunction {
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }


  interface Length extends PathFunction {}
  class Length extends PathFunction {
    static readonly TOKEN_NAME: string;
    invoke(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContext, parameters: Parameter[]): any;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.path' {
  import { List, Collection } from 'java.util';
  import { Integer } from 'java.lang';
  import { PathRef, Path, EvaluationContext } from 'de.keksuccino.konkrete.json.jsonpath.internal';
  import { Operation } from 'de.keksuccino.konkrete.json.jsonpath.internal.path.ArraySliceOperation';
  import { Configuration, Predicate } from 'de.keksuccino.konkrete.json.jsonpath';
  import { Parameter, PathFunction } from 'de.keksuccino.konkrete.json.jsonpath.internal.function';
  import { Predicate as de_keksuccino_konkrete_json_jsonpath_internal_path_scanpathtoken_Predicate } from 'de.keksuccino.konkrete.json.jsonpath.internal.path.ScanPathToken';

  class ArrayIndexOperation {
    indexes(): number[];
    isSingleIndexOperation(): boolean;
    static parse(operation: string): ArrayIndexOperation;
    toString(): string;
  }


  interface ArrayIndexToken extends ArrayPathToken {}
  class ArrayIndexToken extends ArrayPathToken {
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    isTokenDefinite(): boolean;
  }


  interface ArrayPathToken extends PathToken {}
  class ArrayPathToken extends PathToken {
  }


  class ArraySliceOperation {
    from(): number;
    operation(): Operation;
    static parse(operation: string): ArraySliceOperation;
    to(): number;
    toString(): string;
  }


  interface ArraySliceToken extends ArrayPathToken {}
  class ArraySliceToken extends ArrayPathToken {
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    isTokenDefinite(): boolean;
  }


  interface CompiledPath extends Path {}
  class CompiledPath extends Path {
    constructor(root: RootPathToken, isRootPath: boolean);
    evaluate(document: any, rootDocument: any, configuration: Configuration, forUpdate: boolean): EvaluationContext;
    evaluate(document: any, rootDocument: any, configuration: Configuration): EvaluationContext;
    get root(): RootPathToken;
    isDefinite(): boolean;
    isFunctionPath(): boolean;
    isRootPath(): boolean;
    toString(): string;
  }


  interface FunctionPathToken extends PathToken {}
  class FunctionPathToken extends PathToken {
    constructor(pathFragment: string, parameters: Parameter[]);
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get functionName(): string;
    get parameters(): Parameter[];
    get pathFragment(): string;
    isTokenDefinite(): boolean;
    set parameters(parameters: Parameter[]);
  }


  class PathCompiler {
    static compile(path: string, ...filters: Predicate[]): Path;
    static fail(message: string): boolean;
  }


  class PathToken {
    equals(obj: any): boolean;
    evaluate(var1: string, var2: PathRef, var3: any, var4: EvaluationContextImpl): void;
    get next(): PathToken;
    get tokenCount(): number;
    hashCode(): number;
    invoke(pathFunction: PathFunction, currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    isPathDefinite(): boolean;
    isTokenDefinite(): boolean;
    set next(next: PathToken);
    setUpstreamArrayIndex(idx: number): void;
    toString(): string;
  }


  class PathTokenAppender {
    appendPathToken(var1: PathToken): PathTokenAppender;
  }


  class PathTokenFactory {
    static crateScanToken(): PathToken;
    static createFunctionPathToken(functionParameter: string, parameters: Parameter[]): PathToken;
    static createIndexArrayPathToken(arrayIndexOperation: ArrayIndexOperation): PathToken;
    static createPredicatePathToken(predicates: Collection<Predicate>): PathToken;
    static createPredicatePathToken(predicate: Predicate): PathToken;
    static createPropertyPathToken(properties: string[], stringDelimiter: string): PathToken;
    static createRootPathToken(token: string): RootPathToken;
    static createSinglePropertyPathToken(property: string, stringDelimiter: string): PathToken;
    static createSliceArrayPathToken(arraySliceOperation: ArraySliceOperation): PathToken;
    static createWildCardPathToken(): PathToken;
  }


  interface PredicatePathToken extends PathToken {}
  class PredicatePathToken extends PathToken {
    accept(obj: any, root: any, configuration: Configuration, evaluationContext: EvaluationContextImpl): boolean;
    evaluate(currentPath: string, ref: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    isTokenDefinite(): boolean;
  }


  interface PropertyPathToken extends PathToken {}
  class PropertyPathToken extends PathToken {
    constructor(properties: string[], stringDelimiter: string);
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    get properties(): string[];
    isTokenDefinite(): boolean;
    multiPropertyIterationCase(): boolean;
    multiPropertyMergeCase(): boolean;
    singlePropertyCase(): boolean;
  }


  interface RootPathToken extends PathToken {}
  class RootPathToken extends PathToken {
    append(next: PathToken): RootPathToken;
    appendPathToken(next: PathToken): PathTokenAppender;
    evaluate(currentPath: string, pathRef: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    get pathTokenAppender(): PathTokenAppender;
    get tail(): PathToken;
    get tokenCount(): number;
    isFunctionPath(): boolean;
    isTokenDefinite(): boolean;
    set tail(token: PathToken);
  }


  interface ScanPathToken extends PathToken {}
  class ScanPathToken extends PathToken {
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    isTokenDefinite(): boolean;
    static walk(pt: PathToken, currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl, predicate: de_keksuccino_konkrete_json_jsonpath_internal_path_scanpathtoken_Predicate): void;
    static walkArray(pt: PathToken, currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl, predicate: de_keksuccino_konkrete_json_jsonpath_internal_path_scanpathtoken_Predicate): void;
    static walkObject(pt: PathToken, currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl, predicate: de_keksuccino_konkrete_json_jsonpath_internal_path_scanpathtoken_Predicate): void;
  }


  interface WildcardPathToken extends PathToken {}
  class WildcardPathToken extends PathToken {
    evaluate(currentPath: string, parent: PathRef, model: any, ctx: EvaluationContextImpl): void;
    get pathFragment(): string;
    isTokenDefinite(): boolean;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.internal.path.ArraySliceOperation' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Operation extends Enum<Operation> {}
  class Operation extends Enum<Operation> {
    static readonly SLICE_FROM: Operation;
    static readonly SLICE_TO: Operation;
    static readonly SLICE_BETWEEN: Operation;
    static valueOf(name: string): Operation;
    static values(): Operation[];
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.Predicate' {
  import { Class } from 'java.lang';
  import { Configuration } from 'de.keksuccino.konkrete.json.jsonpath';

  class PredicateContext {
    configuration(): Configuration;
    item(): any;
    item<T>(var1: Class<T>): T;
    root(): any;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.spi.cache' {
  import { JsonPath } from 'de.keksuccino.konkrete.json.jsonpath';

  class Cache {
    get(var1: string): JsonPath;
    put(var1: string, var2: JsonPath): void;
  }


  class CacheProvider {
    static get cache(): Cache;
    static set cache(cache: Cache);
  }


  interface LRUCache extends Cache {}
  class LRUCache extends Cache {
    constructor(limit: number);
    get(key: string): JsonPath;
    getSilent(key: string): JsonPath;
    put(key: string, value: JsonPath): void;
    remove(key: string): void;
    size(): number;
    toString(): string;
  }


  interface NOOPCache extends Cache {}
  class NOOPCache extends Cache {
    get(key: string): JsonPath;
    put(key: string, value: JsonPath): void;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.spi.json' {
  import { Collection } from 'java.util';
  import { Iterable } from 'java.lang';
  import { Gson } from 'com.google.gson';
  import { InputStream } from 'java.io';

  interface AbstractJsonProvider extends JsonProvider {}
  class AbstractJsonProvider extends JsonProvider {
    getArrayIndex(obj: any, idx: number): any;
    getArrayIndex(obj: any, idx: number, unwrap: boolean): any;
    getMapValue(obj: any, key: string): any;
    getPropertyKeys(obj: any): Collection<string>;
    isArray(obj: any): boolean;
    isMap(obj: any): boolean;
    length(obj: any): number;
    removeProperty(obj: any, key: any): void;
    setArrayIndex(array: any, index: number, newValue: any): void;
    setProperty(obj: any, key: any, value: any): void;
    toIterable(obj: any): Iterable<any>;
    unwrap(obj: any): any;
  }


  interface GsonJsonProvider extends AbstractJsonProvider {}
  class GsonJsonProvider extends AbstractJsonProvider {
    constructor();

    constructor(gson: Gson);
    createArray(): any;
    createMap(): any;
    getArrayIndex(obj: any, idx: number): any;
    getArrayIndex(obj: any, idx: number, unwrap: boolean): any;
    getMapValue(obj: any, key: string): any;
    getPropertyKeys(obj: any): Collection<string>;
    isArray(obj: any): boolean;
    isMap(obj: any): boolean;
    length(obj: any): number;
    parse(json: string): any;
    parse(jsonStream: InputStream, charset: string): any;
    parse(json: number[]): any;
    removeProperty(obj: any, key: any): void;
    setArrayIndex(array: any, index: number, newValue: any): void;
    setProperty(obj: any, key: any, value: any): void;
    toIterable(obj: any): Iterable<any>;
    toJson(obj: any): string;
    unwrap(o: any): any;
  }


  class JsonProvider {
    static readonly UNDEFINED: any;
    createArray(): any;
    createMap(): any;
    getArrayIndex(var1: any, var2: number): any;
    getArrayIndex(var1: any, var2: number, var3: boolean): any;
    getMapValue(var1: any, var2: string): any;
    getPropertyKeys(var1: any): Collection<string>;
    isArray(var1: any): boolean;
    isMap(var1: any): boolean;
    length(var1: any): number;
    parse(var1: string): any;
    parse(json: number[]): any;
    parse(var1: InputStream, var2: string): any;
    removeProperty(var1: any, var2: any): void;
    setArrayIndex(var1: any, var2: number, var3: any): void;
    setProperty(var1: any, var2: any, var3: any): void;
    toIterable(var1: any): Iterable<any>;
    toJson(var1: any): string;
    unwrap(var1: any): any;
  }

}

declare module 'de.keksuccino.konkrete.json.jsonpath.spi.mapper' {
  import { Gson } from 'com.google.gson';
  import { Callable } from 'java.util.concurrent';
  import { Class, Throwable } from 'java.lang';
  import { Configuration, TypeRef, JsonPathException } from 'de.keksuccino.konkrete.json.jsonpath';

  interface GsonMappingProvider extends MappingProvider {}
  class GsonMappingProvider extends MappingProvider {
    constructor(gson: Gson);

    constructor(factory: Callable<Gson>);

    constructor();
    call(): Gson;
    call(): Gson;
    map<T>(source: any, targetType: Class<T>, configuration: Configuration): T;
    map<T>(source: any, targetType: TypeRef<T>, configuration: Configuration): T;
  }


  interface MappingException extends JsonPathException {}
  class MappingException extends JsonPathException {
    constructor(cause: Throwable);

    constructor(message: string);
  }


  class MappingProvider {
    map<T>(var1: any, var2: Class<T>, var3: Configuration): T;
    map<T>(var1: any, var2: TypeRef<T>, var3: Configuration): T;
  }

}

declare module 'de.keksuccino.konkrete.json' {
  import { List } from 'java.util';
  import { File } from 'java.io';
  import { URL } from 'java.net';

  class JsonUtils {
    static getJsonValueByPath(jsonString: string, jsonParsingPath: string): string[];
    static getJsonValueByPath(jsonFile: File, jsonParsingPath: string): string[];
    static getJsonValueByPath(jsonWebURL: URL, jsonParsingPath: string): string[];
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.asm' {
  import { Class, Iterable, Integer, Short, Long, Byte, Float, Double, Character, Boolean, ClassLoader } from 'java.lang';
  import { Field, Type, Method } from 'java.lang.reflect';
  import { MethodVisitor, Label } from 'org.objectweb.asm';
  import { HashMap, TimeZone, Date } from 'java.util';

  class Accessor {
    constructor(c: Class<any>, field: Field, filter: FieldFilter);
    get genericType(): Type;
    get index(): number;
    get name(): string;
    get type(): Class<any>;
    isEnum(): boolean;
    isPublic(): boolean;
    isReadable(): boolean;
    isUsable(): boolean;
    isWritable(): boolean;
  }


  class ASMUtil {
    static autoBoxing(mv: MethodVisitor, clz: Class<any>): void;
    static getAccessors(type: Class<any>, filter: FieldFilter): Accessor[];
    static getGetterName(key: string): string;
    static getIsName(key: string): string;
    static getSetterName(key: string): string;
    static newLabels(cnt: number): Label[];
  }


  interface BasicFiledFilter extends FieldFilter {}
  class BasicFiledFilter extends FieldFilter {
    static readonly SINGLETON: BasicFiledFilter;
    canRead(field: Field): boolean;
    canUse(field: Field): boolean;
    canUse(field: Field, method: Method): boolean;
    canWrite(field: Field): boolean;
  }


  class BeansAccess<T = any> {
    static get<P>(type: Class<P>): BeansAccess<P>;
    static get<P>(type: Class<P>, filter: FieldFilter): BeansAccess<P>;
    get(var1: T, var2: number): any;
    get(object: T, methodName: string): any;
    get accessors(): Accessor[];
    get map(): HashMap<string, Accessor>;
    getIndex(name: string): number;
    newInstance(): T;
    set(var1: T, var2: number, var3: any): void;
    set(object: T, methodName: string, value: any): void;
  }


  class BeansAccessBuilder {
    constructor(type: Class<any>, accs: Accessor[], loader: DynamicClassLoader);
    addConversion(conv: Iterable<Class<any>>): void;
    addConversion(conv: Class<any>): void;
    bulid(): Class<any>;
  }


  class BeansAccessConfig {
    static addTypeMapper(clz: Class<any>, mapper: Class<any>): void;
  }


  class ConvertDate {
    static defaultTimeZone: TimeZone;
    static convertToDate(obj: any): Date;
    static getMonth(month: string): number;
  }


  class DefaultConverter {
    static convertToBool(obj: any): boolean;
    static convertToByte(obj: any): number;
    static convertToChar(obj: any): string;
    static convertToDouble(obj: any): number;
    static convertToFloat(obj: any): number;
    static convertToInt(obj: any): number;
    static convertToLong(obj: any): Long;
    static convertToShort(obj: any): number;
    static convertTobool(obj: any): boolean;
    static convertTobyte(obj: any): number;
    static convertTochar(obj: any): string;
    static convertTodouble(obj: any): number;
    static convertTofloat(obj: any): number;
    static convertToint(obj: any): number;
    static convertTolong(obj: any): number;
    static convertToshort(obj: any): number;
  }


  interface DynamicClassLoader extends ClassLoader {}
  class DynamicClassLoader extends ClassLoader {
    static directInstance<T>(parent: Class<T>, clsName: string, clsData: number[]): T;
    static directLoad<T>(parent: Class<T>, clsName: string, clsData: number[]): Class<T>;
  }


  class FieldFilter {
    canRead(var1: Field): boolean;
    canUse(var1: Field): boolean;
    canUse(var1: Field, var2: Method): boolean;
    canWrite(var1: Field): boolean;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.asm.ConvertDate' {
  import { Comparator } from 'java.util';

  interface StringCmpNS extends Comparator<string> {}
  class StringCmpNS extends Comparator<string> {
    compare(o1: string, o2: string): number;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.asm.ex' {
  import { RuntimeException } from 'java.lang';

  interface ConvertException extends RuntimeException {}
  class ConvertException extends RuntimeException {
    constructor();

    constructor(message: string);
  }


  interface NoSuchFieldException extends RuntimeException {}
  class NoSuchFieldException extends RuntimeException {
    constructor();

    constructor(message: string);
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json' {
  import { ArrayList, List, Collection, HashMap, Map } from 'java.util';
  import { Iterable, Appendable, Class, Integer, Number, Double, Float, Long, Boolean } from 'java.lang';
  import { JsonReaderI, JsonReader } from 'de.keksuccino.konkrete.json.minidev.json.writer';
  import { JsonSmartFieldFilter } from 'de.keksuccino.konkrete.json.minidev.json.JSONUtil';
  import { JsonWriter, JsonWriterI } from 'de.keksuccino.konkrete.json.minidev.json.reader';
  import { InputStream, Reader } from 'java.io';
  import { MPSimple, MPTrue, MPAgressive, EscapeLT, Escape4Web } from 'de.keksuccino.konkrete.json.minidev.json.JStylerObj';

  interface JSONArray extends List<any>, JSONAwareEx, JSONStreamAwareEx, ArrayList<any> {}
  class JSONArray extends List<any> {
    constructor();

    constructor(initialCapacity: number);
    appendElement(element: any): JSONArray;
    merge(o2: any): void;
    static toJSONString(list: any[]): string;
    static toJSONString(list: any[], compression: JSONStyle): string;
    toJSONString(): string;
    toJSONString(compression: JSONStyle): string;
    toString(): string;
    toString(compression: JSONStyle): string;
    static writeJSONString(list: Iterable<any>, out: Appendable, compression: JSONStyle): void;
    static writeJSONString(list: any[], out: Appendable): void;
    writeJSONString(out: Appendable): void;
    writeJSONString(out: Appendable, compression: JSONStyle): void;
  }


  class JSONAware {
    toJSONString(): string;
  }


  interface JSONAwareEx extends JSONAware {}
  class JSONAwareEx extends JSONAware {
    toJSONString(var1: JSONStyle): string;
    toJSONString(): string;
  }


  class JSONNavi<T = any> {
    constructor(mapper: JsonReaderI<T>);

    constructor(json: string);

    constructor(json: string, mapper: JsonReaderI<T>);

    constructor(json: string, mapTo: Class<T>);
    add(...values: any[]): JSONNavi<T>;
    array(): JSONNavi<T>;
    asBoolean(): boolean;
    asBooleanObj(): boolean;
    asDouble(): number;
    asDoubleObj(): number;
    asFloat(): number;
    asFloatObj(): number;
    asInt(): number;
    asIntegerObj(): number;
    asLong(): number;
    asLongObj(): Long;
    asString(): string;
    at(key: string): JSONNavi<any>;
    at(index: number): JSONNavi<any>;
    atNext(): JSONNavi<any>;
    get(key: string): any;
    get(index: number): any;
    get currentObject(): any;
    get jPath(): string;
    get keys(): Collection<string>;
    get size(): number;
    getDouble(key: string): number;
    getInt(key: string): number;
    getInteger(key: string): number;
    getRoot(): T;
    getString(key: string): string;
    hasFailure(): boolean;
    hasKey(key: string): boolean;
    isArray(): boolean;
    isObject(): boolean;
    static newInstance(): JSONNavi<JSONAwareEx>;
    static newInstanceArray(): JSONNavi<JSONArray>;
    static newInstanceObject(): JSONNavi<JSONObject>;
    object(): JSONNavi<T>;
    root(): JSONNavi<T>;
    set(key: string, value: string): JSONNavi<T>;
    set(key: string, value: Number): JSONNavi<T>;
    set(key: string, value: number): JSONNavi<T>;
    set(key: string, value: number): JSONNavi<T>;
    set(key: string, value: number): JSONNavi<T>;
    set(key: string, value: number): JSONNavi<T>;
    set(num: Number): JSONNavi<T>;
    set(bool: boolean): JSONNavi<T>;
    set(text: string): JSONNavi<T>;
    toString(): string;
    toString(compression: JSONStyle): string;
    up(level: number): JSONNavi<any>;
    up(): JSONNavi<any>;
  }


  interface JSONObject extends JSONAwareEx, JSONStreamAwareEx, HashMap<string, any> {}
  class JSONObject extends JSONAwareEx {
    constructor();

    constructor(initialCapacity: number);

    constructor(map: Map<string, any>);
    appendField(fieldName: string, fieldValue: any): JSONObject;
    static escape(s: string): string;
    getAsNumber(key: string): Number;
    getAsString(key: string): string;
    merge(o2: any): void;
    static toJSONString(map: Map<string, any>): string;
    static toJSONString(map: Map<string, any>, compression: JSONStyle): string;
    toJSONString(): string;
    toJSONString(compression: JSONStyle): string;
    toString(compression: JSONStyle): string;
    toString(): string;
    static writeJSON(map: Map<string, any>, out: Appendable): void;
    static writeJSON(map: Map<string, any>, out: Appendable, compression: JSONStyle): void;
    static writeJSONKV(key: string, value: any, out: Appendable, compression: JSONStyle): void;
    writeJSONString(out: Appendable): void;
    writeJSONString(out: Appendable, compression: JSONStyle): void;
  }


  class JSONStreamAware {
    writeJSONString(var1: Appendable): void;
  }


  interface JSONStreamAwareEx extends JSONStreamAware {}
  class JSONStreamAwareEx extends JSONStreamAware {
    writeJSONString(var1: Appendable, var2: JSONStyle): void;
    writeJSONString(var1: Appendable): void;
  }


  class JSONStyle {
    static readonly FLAG_PROTECT_KEYS: number;
    static readonly FLAG_PROTECT_4WEB: number;
    static readonly FLAG_PROTECT_VALUES: number;
    static readonly FLAG_AGRESSIVE: number;
    static readonly FLAG_IGNORE_NULL: number;
    static readonly NO_COMPRESS: JSONStyle;
    static readonly MAX_COMPRESS: JSONStyle;
    static readonly LT_COMPRESS: JSONStyle;
    constructor(FLAG: number);

    constructor();
    arrayNextElm(out: Appendable): void;
    arrayObjectEnd(out: Appendable): void;
    arrayStart(out: Appendable): void;
    arrayStop(out: Appendable): void;
    arrayfirstObject(out: Appendable): void;
    escape(s: string, out: Appendable): void;
    ignoreNull(): boolean;
    indent(): boolean;
    mustProtectKey(s: string): boolean;
    mustProtectValue(s: string): boolean;
    objectElmStop(out: Appendable): void;
    objectEndOfKey(out: Appendable): void;
    objectFirstStart(out: Appendable): void;
    objectNext(out: Appendable): void;
    objectStart(out: Appendable): void;
    objectStop(out: Appendable): void;
    protect4Web(): boolean;
    protectKeys(): boolean;
    protectValues(): boolean;
    writeString(out: Appendable, value: string): void;
  }


  class JSONUtil {
    static readonly JSON_SMART_FIELD_FILTER: JsonSmartFieldFilter;
    static convertToStrict(obj: any, dest: Class<any>): any;
    static convertToX(obj: any, dest: Class<any>): any;
    static getGetterName(key: string): string;
    static getIsName(key: string): string;
    static getSetterName(key: string): string;
  }


  class JSONValue {
    static COMPRESSION: JSONStyle;
    static readonly defaultWriter: JsonWriter;
    static readonly defaultReader: JsonReader;
    static compress(input: string, style: JSONStyle): string;
    static compress(input: string): string;
    static escape(s: string): string;
    static escape(s: string, compression: JSONStyle): string;
    static escape(s: string, ap: Appendable): void;
    static escape(s: string, ap: Appendable, compression: JSONStyle): void;
    static isValidJson(inParameter: Reader): boolean;
    static isValidJson(s: string): boolean;
    static isValidJsonStrict(inParameter: Reader): boolean;
    static isValidJsonStrict(s: string): boolean;
    static parse(inParameter: InputStream): any;
    static parse(inParameter: number[]): any;
    static parse<T>(inParameter: InputStream, mapTo: Class<T>): T;
    static parse(inParameter: Reader): any;
    static parse<T>(inParameter: number[], mapTo: Class<T>): T;
    static parse<T>(inParameter: Reader, mapTo: Class<T>): T;
    static parse<T>(inParameter: Reader, toUpdate: T): T;
    static parse<T>(inParameter: string, mapTo: Class<T>): T;
    static parse<T>(inParameter: InputStream, toUpdate: T): T;
    static parse<T>(inParameter: string, toUpdate: T): T;
    static parse(s: string): any;
    static parseKeepingOrder(inParameter: Reader): any;
    static parseKeepingOrder(inParameter: string): any;
    static parseStrict(inParameter: Reader): any;
    static parseStrict(s: string): any;
    static parseWithException(inParameter: number[]): any;
    static parseWithException(inParameter: InputStream): any;
    static parseWithException(inParameter: Reader): any;
    static parseWithException(input: string): any;
    static parseWithException<T>(inParameter: string, mapTo: Class<T>): T;
    static registerReader<T>(type: Class<T>, mapper: JsonReaderI<T>): void;
    static registerWriter<T>(cls: Class<any>, writer: JsonWriterI<T>): void;
    static remapField<T>(type: Class<T>, jsonFieldName: string, javaFieldName: string): void;
    static toJSONString(value: any): string;
    static toJSONString(value: any, compression: JSONStyle): string;
    static uncompress(input: string): string;
    static writeJSONString(value: any, out: Appendable): void;
    static writeJSONString(value: any, out: Appendable, compression: JSONStyle): void;
  }


  class JStylerObj {
    static readonly MP_SIMPLE: MPSimple;
    static readonly MP_TRUE: MPTrue;
    static readonly MP_AGGRESIVE: MPAgressive;
    static readonly ESCAPE_LT: EscapeLT;
    static readonly ESCAPE4Web: Escape4Web;
    static isKeyword(s: string): boolean;
    static isSpace(c: string): boolean;
    static isSpecial(c: string): boolean;
    static isSpecialChar(c: string): boolean;
    static isSpecialClose(c: string): boolean;
    static isSpecialOpen(c: string): boolean;
    static isUnicode(c: string): boolean;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.JSONUtil' {
  import { FieldFilter } from 'de.keksuccino.konkrete.json.minidev.asm';
  import { Field, Method } from 'java.lang.reflect';

  interface JsonSmartFieldFilter extends FieldFilter {}
  class JsonSmartFieldFilter extends FieldFilter {
    canRead(field: Field): boolean;
    canUse(field: Field): boolean;
    canUse(field: Field, method: Method): boolean;
    canWrite(field: Field): boolean;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.JStylerObj' {
  import { Appendable } from 'java.lang';

  class StringProtector {
    escape(var1: string, var2: Appendable): void;
  }


  class MustProtect {
    mustBeProtect(var1: string): boolean;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.parser' {
  import { JsonReaderI } from 'de.keksuccino.konkrete.json.minidev.json.writer';
  import { Class, Exception, Throwable } from 'java.lang';
  import { InputStream, Reader } from 'java.io';

  class JSONParser {
    static readonly ACCEPT_SIMPLE_QUOTE: number;
    static readonly ACCEPT_NON_QUOTE: number;
    static readonly ACCEPT_NAN: number;
    static readonly IGNORE_CONTROL_CHAR: number;
    static readonly USE_INTEGER_STORAGE: number;
    static readonly ACCEPT_LEADING_ZERO: number;
    static readonly ACCEPT_USELESS_COMMA: number;
    static readonly USE_HI_PRECISION_FLOAT: number;
    static readonly ACCEPT_TAILLING_DATA: number;
    static readonly ACCEPT_TAILLING_SPACE: number;
    static readonly REJECT_127_CHAR: number;
    static readonly BIG_DIGIT_UNRESTRICTED: number;
    static readonly MODE_PERMISSIVE: number;
    static readonly MODE_RFC4627: number;
    static readonly MODE_JSON_SIMPLE: number;
    static readonly MODE_STRICTEST: number;
    static DEFAULT_PERMISSIVE_MODE: number;
    constructor();

    constructor(permissifMode: number);
    parse(inParameter: number[]): any;
    parse<T>(inParameter: number[], mapper: JsonReaderI<T>): T;
    parse<T>(inParameter: number[], mapTo: Class<T>): T;
    parse(inParameter: InputStream): any;
    parse<T>(inParameter: InputStream, mapper: JsonReaderI<T>): T;
    parse<T>(inParameter: InputStream, mapTo: Class<T>): T;
    parse(inParameter: Reader): any;
    parse<T>(inParameter: Reader, mapper: JsonReaderI<T>): T;
    parse<T>(inParameter: Reader, mapTo: Class<T>): T;
    parse(inParameter: string): any;
    parse<T>(inParameter: string, mapper: JsonReaderI<T>): T;
    parse<T>(inParameter: string, mapTo: Class<T>): T;
  }


  class JSONParserBase {
    static readonly EOI: number;
    constructor(permissiveMode: number);
    checkControleChar(): void;
    checkLeadinZero(): void;
  }


  interface JSONParserByteArray extends JSONParserMemory {}
  class JSONParserByteArray extends JSONParserMemory {
    constructor(permissiveMode: number);
    parse(inParameter: number[]): any;
    parse<T>(inParameter: number[], mapper: JsonReaderI<T>): T;
  }


  interface JSONParserInputStream extends JSONParserReader {}
  class JSONParserInputStream extends JSONParserReader {
    constructor(permissiveMode: number);
    parse(inParameter: InputStream): any;
    parse<T>(inParameter: InputStream, mapper: JsonReaderI<T>): T;
    parse(inParameter: Reader): any;
    parse<T>(inParameter: Reader, mapper: JsonReaderI<T>): T;
  }


  interface JSONParserMemory extends JSONParserBase {}
  class JSONParserMemory extends JSONParserBase {
    constructor(permissiveMode: number);
  }


  interface JSONParserReader extends JSONParserStream {}
  class JSONParserReader extends JSONParserStream {
    constructor(permissiveMode: number);
    parse(inParameter: Reader): any;
    parse<T>(inParameter: Reader, mapper: JsonReaderI<T>): T;
  }


  interface JSONParserStream extends JSONParserBase {}
  class JSONParserStream extends JSONParserBase {
    constructor(permissiveMode: number);
  }


  interface JSONParserString extends JSONParserMemory {}
  class JSONParserString extends JSONParserMemory {
    constructor(permissiveMode: number);
    parse(inParameter: string): any;
    parse<T>(inParameter: string, mapper: JsonReaderI<T>): T;
  }


  interface ParseException extends Exception {}
  class ParseException extends Exception {
    static readonly ERROR_UNEXPECTED_CHAR: number;
    static readonly ERROR_UNEXPECTED_TOKEN: number;
    static readonly ERROR_UNEXPECTED_EXCEPTION: number;
    static readonly ERROR_UNEXPECTED_EOF: number;
    static readonly ERROR_UNEXPECTED_UNICODE: number;
    static readonly ERROR_UNEXPECTED_DUPLICATE_KEY: number;
    static readonly ERROR_UNEXPECTED_LEADING_0: number;
    constructor(position: number, errorType: number, unexpectedObject: any);

    constructor(position: number, cause: Throwable);
    get errorType(): number;
    get position(): number;
    get unexpectedObject(): any;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.parser.JSONParserBase' {
  class MSB {
    constructor(size: number);
    append(c: string): void;
    append(c: number): void;
    clear(): void;
    toString(): string;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.reader' {
  import { Appendable, Class, Double, Float } from 'java.lang';
  import { JSONStyle } from 'de.keksuccino.konkrete.json.minidev.json';
  import { Date } from 'java.util';

  interface ArrayWriter extends JsonWriterI<any> {}
  class ArrayWriter extends JsonWriterI<any> {
    writeJSONString<E>(value: E, out: Appendable, compression: JSONStyle): void;
    writeJSONString<E extends T>(var1: E, var2: Appendable, var3: JSONStyle): void;
  }


  interface BeansWriter extends JsonWriterI<any> {}
  class BeansWriter extends JsonWriterI<any> {
    writeJSONString<E>(value: E, out: Appendable, compression: JSONStyle): void;
    writeJSONString<E extends T>(var1: E, var2: Appendable, var3: JSONStyle): void;
  }


  interface BeansWriterASM extends JsonWriterI<any> {}
  class BeansWriterASM extends JsonWriterI<any> {
    writeJSONString<E>(value: E, out: Appendable, compression: JSONStyle): void;
    writeJSONString<E extends T>(var1: E, var2: Appendable, var3: JSONStyle): void;
  }


  interface BeansWriterASMRemap extends JsonWriterI<any> {}
  class BeansWriterASMRemap extends JsonWriterI<any> {
    renameField(source: string, dest: string): void;
    writeJSONString<E>(value: E, out: Appendable, compression: JSONStyle): void;
    writeJSONString<E extends T>(var1: E, var2: Appendable, var3: JSONStyle): void;
  }


  class JsonWriter {
    static readonly JSONStreamAwareWriter: JsonWriterI;
    static readonly JSONStreamAwareExWriter: JsonWriterI;
    static readonly JSONJSONAwareExWriter: JsonWriterI;
    static readonly JSONJSONAwareWriter: JsonWriterI;
    static readonly JSONIterableWriter: JsonWriterI;
    static readonly EnumWriter: JsonWriterI;
    static readonly JSONMapWriter: JsonWriterI;
    static readonly beansWriterASM: JsonWriterI;
    static readonly beansWriter: JsonWriterI;
    static readonly arrayWriter: JsonWriterI;
    static readonly toStringWriter: JsonWriterI;
    constructor();
    addInterfaceWriterFirst(interFace: Class<any>, writer: JsonWriterI<any>): void;
    addInterfaceWriterLast(interFace: Class<any>, writer: JsonWriterI<any>): void;
    getWrite(cls: Class): JsonWriterI;
    getWriterByInterface(clazz: Class<any>): JsonWriterI;
    init(): void;
    registerWriter<T>(writer: JsonWriterI<T>, ...cls: Class<any>[]): void;
    registerWriterInterface(interFace: Class<any>, writer: JsonWriterI<any>): void;
    registerWriterInterfaceFirst(interFace: Class<any>, writer: JsonWriterI<any>): void;
    registerWriterInterfaceLast(interFace: Class<any>, writer: JsonWriterI<any>): void;
    remapField<T>(type: Class<T>, fromJava: string, toJson: string): void;
    static writeJSONKV(key: string, value: any, out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: string, out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number, out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: Date, out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number, out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number[], out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number[], out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number[], out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number[], out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: number[], out: Appendable, compression: JSONStyle): void;
    writeJSONString(value: boolean[], out: Appendable, compression: JSONStyle): void;
  }


  class JsonWriterI<T = any> {
    writeJSONString<E extends T>(var1: E, var2: Appendable, var3: JSONStyle): void;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.reader.JsonWriter' {
  import { Class } from 'java.lang';
  import { JsonWriterI } from 'de.keksuccino.konkrete.json.minidev.json.reader';

  class WriterByInterface {
    _interface: Class;
    _writer: JsonWriterI;
    constructor(_interface: Class<any>, _writer: JsonWriterI<any>);
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.writer' {
  import { Appendable, Boolean, Class } from 'java.lang';
  import { JSONStyle, JSONAwareEx } from 'de.keksuccino.konkrete.json.minidev.json';
  import { Type, ParameterizedType } from 'java.lang.reflect';

  interface ArraysMapper<T = any> extends JsonReaderI<T> {}
  class ArraysMapper<T = any> extends JsonReaderI<T> {
    static MAPPER_PRIM_INT: JsonReaderI;
    static MAPPER_INT: JsonReaderI;
    static MAPPER_PRIM_SHORT: JsonReaderI;
    static MAPPER_SHORT: JsonReaderI;
    static MAPPER_PRIM_BYTE: JsonReaderI;
    static MAPPER_BYTE: JsonReaderI;
    static MAPPER_PRIM_CHAR: JsonReaderI;
    static MAPPER_CHAR: JsonReaderI;
    static MAPPER_PRIM_LONG: JsonReaderI;
    static MAPPER_LONG: JsonReaderI;
    static MAPPER_PRIM_FLOAT: JsonReaderI;
    static MAPPER_FLOAT: JsonReaderI;
    static MAPPER_PRIM_DOUBLE: JsonReaderI;
    static MAPPER_DOUBLE: JsonReaderI;
    static MAPPER_PRIM_BOOL: JsonReaderI;
    static MAPPER_BOOL: JsonReaderI;
    constructor(base: JsonReader);
    addValue(current: any, value: any): void;
    convert(current: any): T;
    createArray(): any;
  }


  interface BeansMapper<T = any> extends JsonReaderI<T> {}
  class BeansMapper<T = any> extends JsonReaderI<T> {
    static MAPPER_DATE: JsonReaderI;
    constructor(base: JsonReader);
    getValue(var1: any, var2: string): any;
  }


  class CollectionMapper {
  }


  interface CompessorMapper extends JsonReaderI<CompessorMapper> {}
  class CompessorMapper extends JsonReaderI<CompessorMapper> {
    constructor(base: JsonReader, out: Appendable, compression: JSONStyle);

    constructor(base: JsonReader, out: Appendable, compression: JSONStyle, isObj: boolean);
    addValue(current: any, value: any): void;
    convert(current: any): CompessorMapper;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface DefaultMapper<T = any> extends JsonReaderI<T> {}
  class DefaultMapper<T = any> extends JsonReaderI<T> {
    addValue(current: any, value: any): void;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<JSONAwareEx>;
    startObject(key: string): JsonReaderI<JSONAwareEx>;
  }


  interface DefaultMapperCollection<T = any> extends JsonReaderI<T> {}
  class DefaultMapperCollection<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, clz: Class<T>);
    addValue(current: any, value: any): void;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<T>;
    startObject(key: string): JsonReaderI<T>;
  }


  interface DefaultMapperOrdered extends JsonReaderI<JSONAwareEx> {}
  class DefaultMapperOrdered extends JsonReaderI<JSONAwareEx> {
    addValue(current: any, value: any): void;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<JSONAwareEx>;
    startObject(key: string): JsonReaderI<JSONAwareEx>;
  }


  interface FakeMapper extends JsonReaderI<any> {}
  class FakeMapper extends JsonReaderI<any> {
    static DEFAULT: JsonReaderI;
    addValue(current: any, value: any): void;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  class JsonReader {
    DEFAULT: JsonReaderI;
    DEFAULT_ORDERED: JsonReaderI;
    constructor();
    getMapper<T>(type: Type): JsonReaderI<T>;
    getMapper<T>(type: Class<T>): JsonReaderI<T>;
    getMapper<T>(type: ParameterizedType): JsonReaderI<T>;
    registerReader<T>(type: Class<T>, mapper: JsonReaderI<T>): void;
    remapField<T>(type: Class<T>, fromJson: string, toJava: string): void;
  }


  class JsonReaderI<T = any> {
    readonly base: JsonReader;
    constructor(base: JsonReader);
    addValue(current: any, value: any): void;
    convert(current: any): T;
    createArray(): any;
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface MapperRemapped<T = any> extends JsonReaderI<T> {}
  class MapperRemapped<T = any> extends JsonReaderI<T> {
    constructor(parent: JsonReaderI<T>);
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    renameField(source: string, dest: string): void;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface UpdaterMapper<T = any> extends JsonReaderI<T> {}
  class UpdaterMapper<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, obj: T);

    constructor(base: JsonReader, obj: T, type: Type);
    addValue(current: any, value: any): void;
    convert(current: any): T;
    createArray(): any;
    createObject(): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.writer.ArraysMapper' {
  import { ArraysMapper, JsonReader, JsonReaderI } from 'de.keksuccino.konkrete.json.minidev.json.writer';
  import { Class } from 'java.lang';

  interface GenericMapper<T = any> extends ArraysMapper<T> {}
  class GenericMapper<T = any> extends ArraysMapper<T> {
    constructor(base: JsonReader, type: Class<T>);
    convert(current: any): T;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.writer.BeansMapper' {
  import { JsonReaderI, JsonReader } from 'de.keksuccino.konkrete.json.minidev.json.writer';
  import { Class } from 'java.lang';
  import { Type } from 'java.lang.reflect';

  interface BeanNoConv<T = any> extends JsonReaderI<T> {}
  class BeanNoConv<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, clz: Class<T>);
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface Bean<T = any> extends JsonReaderI<T> {}
  class Bean<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, clz: Class<T>);
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }

}

declare module 'de.keksuccino.konkrete.json.minidev.json.writer.CollectionMapper' {
  import { JsonReaderI, JsonReader } from 'de.keksuccino.konkrete.json.minidev.json.writer';
  import { Class } from 'java.lang';
  import { ParameterizedType, Type } from 'java.lang.reflect';

  interface ListClass<T = any> extends JsonReaderI<T> {}
  class ListClass<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, clazz: Class<any>);
    addValue(current: any, value: any): void;
    createArray(): any;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface ListType<T = any> extends JsonReaderI<T> {}
  class ListType<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, type: ParameterizedType);
    addValue(current: any, value: any): void;
    createArray(): any;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface MapClass<T = any> extends JsonReaderI<T> {}
  class MapClass<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, type: Class<any>);
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }


  interface MapType<T = any> extends JsonReaderI<T> {}
  class MapType<T = any> extends JsonReaderI<T> {
    constructor(base: JsonReader, type: ParameterizedType);
    createObject(): any;
    getType(key: string): Type;
    getValue(current: any, key: string): any;
    setValue(current: any, key: string, value: any): void;
    startArray(key: string): JsonReaderI<any>;
    startObject(key: string): JsonReaderI<any>;
  }

}

declare module 'de.keksuccino.konkrete' {
  import { Runnable } from 'java.lang';
  import { IEventBus } from 'net.neoforged.bus.api';

  class Konkrete {
    static readonly MOD_ID: string;
    static readonly VERSION: string;
    static readonly MOD_LOADER: string;
    static isOptifineLoaded: boolean;
    static addPostClientInitTask(modId: string, task: Runnable): void;
    static addPostLoadingEvent(modId: string, task: Runnable): void;
    static init(): void;
    static onGameInitCompleted(): void;
  }


  class KonkreteNeoForge {
    constructor(eventBus: IEventBus);
  }


  class PostClientInitTaskExecutor {
  }


  class Test {
  }

}

declare module 'de.keksuccino.konkrete.localization' {
  import { File } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';

  class LocaleUtils {
    static getKeyForString(s: string): string;
  }


  class LocalizationPackage {
    addLocalizedString(key: string, value: string): void;
    containsKey(key: string): boolean;
    get language(): string;
    getLocalizedString(key: string): string;
    isEmpty(): boolean;
    removeLocalizedString(key: string): void;
  }


  class Locals {
    static copyLocalsFileToDir(file: ResourceLocation, language: string, saveDirWithoutFilename: string): void;
    static getLocalsFromDir(dir: string): void;
    static getLocalsFromFile(file: string): void;
    static getLocalsFromFile(f: File): void;
    static getPackage(language: string): LocalizationPackage;
    static localize(key: string, ...dynamicValues: string[]): string;
    static localizeTo(key: string, language: string, ...dynamicValues: string[]): string;
  }

}

declare module 'de.keksuccino.konkrete.math' {
  class MathUtils {
    static calculateFromString(inParameter: string): number;
    static getRandomNumberInRange(min: number, max: number): number;
    static isCalculateableString(inParameter: string): boolean;
    static isDouble(value: string): boolean;
    static isFloat(value: string): boolean;
    static isInteger(value: string): boolean;
    static isIntegerOrDouble(value: string): boolean;
    static isLong(value: string): boolean;
  }

}

declare module 'de.keksuccino.konkrete.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface KonkreteMixinPlugin extends IMixinConfigPlugin {}
  class KonkreteMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'de.keksuccino.konkrete.mixin.mixins.client' {
  import { Map, List } from 'java.util';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Font } from 'net.minecraft.client.gui';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';

  class IMixinAbstractWidget {
    setHeightKonkrete(var1: number): void;
  }


  class IMixinClientLanguage {
    get storageKonkrete(): Map<string, string>;
  }


  class IMixinClientPacketListener {
    get commandsKonkrete(): CommandDispatcher<SharedSuggestionProvider>;
    set commandsKonkrete(var1: CommandDispatcher<SharedSuggestionProvider>);
  }


  class IMixinDynamicTexture {
    get pixelsKonkrete(): NativeImage;
    set pixelsKonkrete(var1: NativeImage);
  }


  class IMixinEditBox {
    get hightlightPosKonkrete(): number;
    get isEditableKonkrete(): boolean;
    get maxLengthKonkrete(): number;
    onValueChangeKonkrete(var1: string): void;
  }


  class IMixinLocalPlayer {
    get permissionLevelKonkrete(): number;
  }


  class IMixinMouseHandler {
    get activeButtonKonkrete(): number;
  }


  class IMixinScreen {
    get childrenKonkrete(): GuiEventListener[];
    get renderablesKonkrete(): Renderable[];
    invokeAddRenderableWidgetKonkrete<T extends GuiEventListener & Renderable>(var1: T): T;
    invokeAddWidgetKonkrete<T extends GuiEventListener & NarratableEntry>(var1: T): T;
    setFontKonkrete(var1: Font): void;
  }


  class MixinKeyboardHandler {
  }


  class MixinMinecraft {
  }


  class MixinMouseHandler {
  }

}

declare module 'de.keksuccino.konkrete.mixin.mixins.neoforge.client' {
  class MixinGameRenderer {
  }

}

declare module 'de.keksuccino.konkrete.objecthunter.exp4j' {
  import { Map, Set, List } from 'java.util';
  import { Double } from 'java.lang';
  import { Future, ExecutorService } from 'java.util.concurrent';
  import { Function } from 'de.keksuccino.konkrete.objecthunter.exp4j.function';
  import { Operator } from 'de.keksuccino.konkrete.objecthunter.exp4j.operator';

  class ArrayStack {
  }


  class Expression {
    constructor(existing: Expression);
    clearVariables(): Expression;
    evaluate(): number;
    evaluateAsync(executor: ExecutorService): Future<number>;
    get variableNames(): Set<string>;
    setVariable(name: string, value: number): Expression;
    setVariables(variables: Map<string, number>): Expression;
    validate(checkVariablesSet: boolean): ValidationResult;
    validate(): ValidationResult;
  }


  class ExpressionBuilder {
    constructor(expression: string);
    build(): Expression;
    function(functionParameter: Function): ExpressionBuilder;
    functions(...functions: Function[]): ExpressionBuilder;
    functions(functions: Function[]): ExpressionBuilder;
    implicitMultiplication(enabled: boolean): ExpressionBuilder;
    operator(operator: Operator): ExpressionBuilder;
    operator(...operators: Operator[]): ExpressionBuilder;
    operator(operators: Operator[]): ExpressionBuilder;
    variable(variableName: string): ExpressionBuilder;
    variables(variableNames: Set<string>): ExpressionBuilder;
    variables(...variableNames: string[]): ExpressionBuilder;
  }


  class ValidationResult {
    static readonly SUCCESS: ValidationResult;
    constructor(valid: boolean, errors: string[]);
    get errors(): string[];
    isValid(): boolean;
  }

}

declare module 'de.keksuccino.konkrete.objecthunter.exp4j.function' {
  class Function {
    constructor(name: string, numArguments: number);

    constructor(name: string);
    apply(...var1: number[]): number;
    static get allowedFunctionCharacters(): string[];
    get name(): string;
    get numArguments(): number;
    static isValidFunctionName(name: string): boolean;
  }


  class Functions {
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    static getBuiltinFunction(name: string): Function;
  }

}

declare module 'de.keksuccino.konkrete.objecthunter.exp4j.operator' {
  class Operator {
    static readonly PRECEDENCE_ADDITION: number;
    static readonly PRECEDENCE_SUBTRACTION: number;
    static readonly PRECEDENCE_MULTIPLICATION: number;
    static readonly PRECEDENCE_DIVISION: number;
    static readonly PRECEDENCE_MODULO: number;
    static readonly PRECEDENCE_POWER: number;
    static readonly PRECEDENCE_UNARY_MINUS: number;
    static readonly PRECEDENCE_UNARY_PLUS: number;
    static readonly ALLOWED_OPERATOR_CHARS: string[];
    constructor(symbol: string, numberOfOperands: number, leftAssociative: boolean, precedence: number);
    apply(...var1: number[]): number;
    get numOperands(): number;
    get precedence(): number;
    get symbol(): string;
    static isAllowedOperatorChar(ch: string): boolean;
    isLeftAssociative(): boolean;
  }


  class Operators {
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    apply(...args: number[]): number;
    static getBuiltinOperator(symbol: string, numArguments: number): Operator;
  }

}

declare module 'de.keksuccino.konkrete.objecthunter.exp4j.shuntingyard' {
  import { Token } from 'de.keksuccino.konkrete.objecthunter.exp4j.tokenizer';
  import { Map, Set } from 'java.util';
  import { Function } from 'de.keksuccino.konkrete.objecthunter.exp4j.function';
  import { Operator } from 'de.keksuccino.konkrete.objecthunter.exp4j.operator';

  class ShuntingYard {
    static convertToRPN(expression: string, userFunctions: Map<string, Function>, userOperators: Map<string, Operator>, variableNames: Set<string>, implicitMultiplication: boolean): Token[];
  }

}

declare module 'de.keksuccino.konkrete.objecthunter.exp4j.tokenizer' {
  import { Function } from 'de.keksuccino.konkrete.objecthunter.exp4j.function';
  import { Operator } from 'de.keksuccino.konkrete.objecthunter.exp4j.operator';
  import { Map, Set } from 'java.util';
  import { IllegalArgumentException } from 'java.lang';

  interface ArgumentSeparatorToken extends Token {}
  class ArgumentSeparatorToken extends Token {
  }


  interface CloseParenthesesToken extends Token {}
  class CloseParenthesesToken extends Token {
  }


  interface FunctionToken extends Token {}
  class FunctionToken extends Token {
    constructor(functionParameter: Function);
    get function(): Function;
  }


  interface NumberToken extends Token {}
  class NumberToken extends Token {
    constructor(value: number);
    get value(): number;
  }


  interface OpenParenthesesToken extends Token {}
  class OpenParenthesesToken extends Token {
  }


  interface OperatorToken extends Token {}
  class OperatorToken extends Token {
    constructor(op: Operator);
    get operator(): Operator;
  }


  class Token {
    static readonly TOKEN_NUMBER: number;
    static readonly TOKEN_OPERATOR: number;
    static readonly TOKEN_FUNCTION: number;
    static readonly TOKEN_PARENTHESES_OPEN: number;
    static readonly TOKEN_PARENTHESES_CLOSE: number;
    static readonly TOKEN_VARIABLE: number;
    static readonly TOKEN_SEPARATOR: number;
    get type(): number;
  }


  class Tokenizer {
    constructor(expression: string, userFunctions: Map<string, Function>, userOperators: Map<string, Operator>, variableNames: Set<string>, implicitMultiplication: boolean);

    constructor(expression: string, userFunctions: Map<string, Function>, userOperators: Map<string, Operator>, variableNames: Set<string>);
    hasNext(): boolean;
    static isAlphabetic(codePoint: number): boolean;
    static isVariableOrFunctionCharacter(codePoint: number): boolean;
    nextToken(): Token;
  }


  interface UnknownFunctionOrVariableException extends IllegalArgumentException {}
  class UnknownFunctionOrVariableException extends IllegalArgumentException {
    constructor(expression: string, position: number, length: number);
    get expression(): string;
    get message(): string;
    get position(): number;
    get token(): string;
  }


  interface VariableToken extends Token {}
  class VariableToken extends Token {
    constructor(name: string);
    get name(): string;
  }

}

declare module 'de.keksuccino.konkrete.platform' {
  import { IPlatformCompatibilityLayer, IPlatformHelper } from 'de.keksuccino.konkrete.platform.services';
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { Class } from 'java.lang';

  interface NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {}
  class NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(keyMapping: KeyMapping): Key;
    getModVersion(modId: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    isOnClient(): boolean;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static readonly COMPAT: IPlatformCompatibilityLayer;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'de.keksuccino.konkrete.platform.services' {
  import { List } from 'java.util';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';

  class IPlatformCompatibilityLayer {
  }


  class IPlatformHelper {
    get environmentName(): string;
    get loadedModIds(): string[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getKeyMappingKey(var1: KeyMapping): Key;
    getModVersion(var1: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isOnClient(): boolean;
  }

}

declare module 'de.keksuccino.konkrete.properties' {
  import { Map, List } from 'java.util';

  class PropertiesSection {
    constructor(sectionType: string);
    addEntry(name: string, value: string): void;
    get entries(): Map<string, string>;
    get sectionType(): string;
    getEntryValue(name: string): string;
    hasEntry(name: string): boolean;
    removeEntry(name: string): void;
  }


  class PropertiesSerializer {
    static getProperties(filePath: string): PropertiesSet;
    static writeProperties(propertiesSet: PropertiesSet, filePath: string): void;
  }


  class PropertiesSet {
    constructor(propertiesType: string);
    addProperties(data: PropertiesSection): void;
    get properties(): PropertiesSection[];
    get propertiesType(): string;
    getPropertiesOfType(type: string): PropertiesSection[];
  }

}

declare module 'de.keksuccino.konkrete.reflection' {
  import { Field, Method } from 'java.lang.reflect';
  import { Class } from 'java.lang';

  class ReflectionHelper {
    static findField(c: Class<any>, ...names: string[]): Field;
    static findMethod(c: Class<any>, deobfName: string, obfName: string, ...args: Class<any>[]): Method;
  }

}

declare module 'de.keksuccino.konkrete.rendering.animation' {
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AnimationRenderer extends IAnimationRenderer {}
  class AnimationRenderer extends IAnimationRenderer {
    constructor(resourceDir: string, fps: number, loop: boolean, posX: number, posY: number, width: number, height: number, modid: string);
    animationFrames(): number;
    currentFrame(): number;
    get fPS(): number;
    get height(): number;
    get path(): string;
    get posX(): number;
    get posY(): number;
    get width(): number;
    isFinished(): boolean;
    isGettingLooped(): boolean;
    isReady(): boolean;
    isStretchedToStreensize(): boolean;
    prepareAnimation(): void;
    render(graphics: GuiGraphics): void;
    resetAnimation(): void;
    set fPS(fps: number);
    set height(height: number);
    set posX(x: number);
    set posY(y: number);
    set width(width: number);
    setHideAfterLastFrame(b: boolean): void;
    setLooped(b: boolean): void;
    setOpacity(opacity: number): void;
    setStretchImageToScreensize(b: boolean): void;
  }


  interface ExternalGifAnimationRenderer extends IAnimationRenderer {}
  class ExternalGifAnimationRenderer extends IAnimationRenderer {
    constructor(resourcePath: string, loop: boolean, posX: number, posY: number, width: number, height: number);
    animationFrames(): number;
    currentFrame(): number;
    get fPS(): number;
    get height(): number;
    get opacity(): number;
    get path(): string;
    get posX(): number;
    get posY(): number;
    get width(): number;
    isFinished(): boolean;
    isGettingLooped(): boolean;
    isReady(): boolean;
    isStretchedToStreensize(): boolean;
    prepareAnimation(): void;
    render(graphics: GuiGraphics): void;
    resetAnimation(): void;
    set fPS(fps: number);
    set height(height: number);
    set opacity(opacity: number);
    set posX(x: number);
    set posY(y: number);
    set width(width: number);
    setHideAfterLastFrame(b: boolean): void;
    setLooped(b: boolean): void;
    setStretchImageToScreensize(b: boolean): void;
  }


  interface ExternalTextureAnimationRenderer extends IAnimationRenderer {}
  class ExternalTextureAnimationRenderer extends IAnimationRenderer {
    constructor(resourceDir: string, fps: number, loop: boolean, posX: number, posY: number, width: number, height: number);

    constructor(fps: number, loop: boolean, posX: number, posY: number, width: number, height: number, ...resourcePaths: string[]);
    animationFrames(): number;
    compare(o1: string, o2: string): number;
    currentFrame(): number;
    get fPS(): number;
    get height(): number;
    get opacity(): number;
    get path(): string;
    get posX(): number;
    get posY(): number;
    get width(): number;
    isFinished(): boolean;
    isGettingLooped(): boolean;
    isReady(): boolean;
    isStretchedToStreensize(): boolean;
    prepareAnimation(): void;
    render(graphics: GuiGraphics): void;
    resetAnimation(): void;
    set fPS(fps: number);
    set height(height: number);
    set opacity(opacity: number);
    set posX(x: number);
    set posY(y: number);
    set width(width: number);
    setHideAfterLastFrame(b: boolean): void;
    setLooped(b: boolean): void;
    setStretchImageToScreensize(b: boolean): void;
  }


  class IAnimationRenderer {
    animationFrames(): number;
    currentFrame(): number;
    get fPS(): number;
    get height(): number;
    get path(): string;
    get posX(): number;
    get posY(): number;
    get width(): number;
    isFinished(): boolean;
    isGettingLooped(): boolean;
    isReady(): boolean;
    isStretchedToStreensize(): boolean;
    prepareAnimation(): void;
    render(var1: GuiGraphics): void;
    resetAnimation(): void;
    set fPS(var1: number);
    set height(var1: number);
    set posX(var1: number);
    set posY(var1: number);
    set width(var1: number);
    setHideAfterLastFrame(var1: boolean): void;
    setLooped(var1: boolean): void;
    setOpacity(var1: number): void;
    setStretchImageToScreensize(var1: boolean): void;
  }

}

declare module 'de.keksuccino.konkrete.rendering.animation.ExternalGifAnimationRenderer' {
  import { ByteArrayInputStream } from 'java.io';

  class GifFramePackage {
    constructor(gif: ByteArrayInputStream, delay: number);
  }

}

declare module 'de.keksuccino.konkrete.rendering' {
  import { GifImage } from 'de.keksuccino.konkrete.rendering.GifDecoder';
  import { InputStream } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Color } from 'java.awt';

  class GifDecoder {
    static read(inParameter: number[]): GifImage;
    static read(is: InputStream): GifImage;
  }


  class RenderUtils {
    static bindTexture(texture: ResourceLocation, depthTest: boolean): void;
    static bindTexture(texture: ResourceLocation): void;
    static doubleBlit(x: number, y: number, f1: number, f2: number, w: number, h: number): void;
    static fill(graphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, color: number, opacity: number): void;
    static fill(graphics: PoseStack, minX: number, minY: number, maxX: number, maxY: number, color: number, opacity: number): void;
    static get blankImageResource(): ResourceLocation;
    static get whiteImageResource(): ResourceLocation;
    static getColorFromHexString(hex: string): Color;
    static innerDoubleBlit(x: number, xEnd: number, y: number, yEnd: number, z: number, f1: number, f2: number, f3: number, f4: number): void;
    static postScale(graphics: GuiGraphics): void;
    static postScale(graphics: PoseStack): void;
    static setScale(graphics: GuiGraphics, scale: number): void;
    static setScale(graphics: PoseStack, scale: number): void;
    static setZLevelPost(graphics: GuiGraphics): void;
    static setZLevelPost(graphics: PoseStack): void;
    static setZLevelPre(graphics: GuiGraphics, zLevel: number): void;
    static setZLevelPre(graphics: PoseStack, zLevel: number): void;
  }

}

declare module 'de.keksuccino.konkrete.rendering.GifDecoder' {
  import { GifDecoder } from 'de.keksuccino.konkrete.rendering';
  import { BufferedImage } from 'java.awt.image';

  class GifImage {
    header: string;
    hasGlobColTbl: boolean;
    colorResolution: number;
    sortFlag: boolean;
    sizeOfGlobColTbl: number;
    bgColIndex: number;
    pxAspectRatio: number;
    globalColTbl: number[];
    appId: string;
    appAuthCode: string;
    repetitions: number;
    constructor(this$0: GifDecoder);
    get backgroundColor(): number;
    get frameCount(): number;
    get height(): number;
    get width(): number;
    getDelay(index: number): number;
    getFrame(index: number): BufferedImage;
  }


  class GifFrame {
  }


  class CodeTable {
  }


  class BitReader {
  }

}

declare module 'de.keksuccino.konkrete.resources' {
  import { InputStream } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DynamicTexture } from 'net.minecraft.client.renderer.texture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ExternalGifAnimationRenderer } from 'de.keksuccino.konkrete.rendering.animation';

  interface ExternalTextureResourceLocation extends ITextureResourceLocation {}
  class ExternalTextureResourceLocation extends ITextureResourceLocation {
    constructor(path: string);

    constructor(inParameter: InputStream);

    constructor(inParameter: InputStream, isJpeg: boolean);
    get height(): number;
    get path(): string;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isReady(): boolean;
    loadTexture(): void;
  }


  class ITextureResourceLocation {
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isReady(): boolean;
    loadTexture(): void;
  }


  interface SelfcleaningDynamicTexture extends DynamicTexture {}
  class SelfcleaningDynamicTexture extends DynamicTexture {
    constructor(nativeImageIn: NativeImage);
    upload(): void;
  }


  class TextureHandler {
    static getGifResource(path: string): ExternalGifAnimationRenderer;
    static getResource(path: string): ExternalTextureResourceLocation;
    static getWebResource(url: string): WebTextureResourceLocation;
    static getWebResource(url: string, loadTexture: boolean): WebTextureResourceLocation;
    static removeResource(path: string): void;
  }


  interface WebTextureResourceLocation extends ITextureResourceLocation {}
  class WebTextureResourceLocation extends ITextureResourceLocation {
    constructor(url: string);
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get uRL(): string;
    get width(): number;
    isReady(): boolean;
    loadTexture(): void;
  }

}

declare module 'de.keksuccino.konkrete.sound' {
  class SoundHandler {
    static init(): void;
    static isPlaying(key: string): boolean;
    static playSound(key: string): void;
    static registerSound(key: string, path: string): void;
    static resetSound(key: string): void;
    static setLooped(key: string, looped: boolean): void;
    static soundExists(key: string): boolean;
    static stopSound(key: string): void;
    static unregisterSound(key: string): void;
    static updateVolume(): void;
  }

}

declare module 'de.keksuccino.konkrete.web' {
  import { List } from 'java.util';
  import { URL } from 'java.net';

  class WebUtils {
    static filterURL(url: string): string;
    static getPlainTextContentOfPage(webLink: URL): string[];
    static isValidUrl(url: string): boolean;
  }

}