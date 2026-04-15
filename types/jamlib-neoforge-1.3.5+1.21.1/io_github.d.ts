declare module 'io.github.jamalam360.jamlib.client.config.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConfigManager } from 'io.github.jamalam360.jamlib.config';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ContainerObjectSelectionList, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { Entry } from 'ContainerObjectSelectionList';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';

  interface ConfigScreen<T = any> extends Screen {}
  class ConfigScreen<T = any> extends Screen {
    constructor(manager: ConfigManager<T>, parent: Screen);
    static createTranslationKey(modId: string, configName: string, path: string): string;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    tick(): void;
  }


  interface SelectConfigScreen extends Screen {}
  class SelectConfigScreen extends Screen {
    constructor(parent: Screen, modId: string);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface SelectionList extends ContainerObjectSelectionList<SelectionListEntry> {}
  class SelectionList extends ContainerObjectSelectionList<SelectionListEntry> {
    constructor(minecraft: Minecraft, width: number, height: number, y: number, itemHeight: number);
    get rowWidth(): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface SelectionListEntry extends Entry<SelectionListEntry> {}
  class SelectionListEntry extends Entry<SelectionListEntry> {
    constructor(title: Component, tooltip: FormattedCharSequence[], widgets: AbstractWidget[]);
    children(): GuiEventListener[];
    get tooltip(): FormattedCharSequence[];
    narratables(): NarratableEntry[];
    render(graphics: GuiGraphics, i: number, y: number, x: number, width: number, height: number, mouseX: number, mouseY: number, hovered: boolean, delta: number): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client.config.gui.entry' {
  import { Boolean, Class } from 'java.lang';
  import { List } from 'java.util';
  import { AbstractWidget, Button, AbstractSliderButton } from 'net.minecraft.client.gui.components';
  import { Field } from 'java.lang.reflect';
  import { Component } from 'net.minecraft.network.chat';
  import { ConfigManager } from 'io.github.jamalam360.jamlib.config';
  import { Annotation } from 'java.lang.annotation';

  interface BooleanConfigEntry<T = any> extends ConfigEntry<T, boolean> {}
  class BooleanConfigEntry<T = any> extends ConfigEntry<T, boolean> {
    constructor(modId: string, configName: string, field: ConfigField<T, boolean>);
    createElementWidgets(left: number, width: number): AbstractWidget[];
    onChange(): void;
  }


  class ConfigEntry<T = any, V = any> {
    constructor(modId: string, configName: string, field: ConfigField<T, V>);
    createElementWidgets(var1: number, var2: number): AbstractWidget[];
    static createFromField<T, V>(modId: string, configName: string, field: Field): ConfigEntry<T, V>;
    createWidgets(width: number): AbstractWidget[];
    get name(): Component;
    getNewWidgets(width: number): AbstractWidget[];
    hasChanged(): boolean;
    isValid(): boolean;
    onChange(): void;
    recreateWidgetsNextTick(): void;
  }


  class ConfigField<T = any, V = any> {
    get backingField(): Field;
    get elementType(): Class<V>;
    get name(): string;
    getAnnotation<A extends Annotation>(var1: Class<A>): A;
    getValue(var1: ConfigManager<T>): V;
    isAnnotationPresent(var1: Class<Annotation>): boolean;
    setValue(var1: ConfigManager<T>, var2: V): void;
  }


  interface EnumButton<E extends Enum<E> = any> extends Button {}
  class EnumButton<E extends Enum<E> = any> extends Button {
  }


  interface EnumConfigEntry<T = any, V extends Enum<V> = any> extends ConfigEntry<T, V> {}
  class EnumConfigEntry<T = any, V extends Enum<V> = any> extends ConfigEntry<T, V> {
    constructor(modId: string, configName: string, field: ConfigField<T, V>);
    createElementWidgets(left: number, width: number): AbstractWidget[];
    onChange(): void;
  }


  interface FieldConfigField<T = any, V = any> extends ConfigField<T, V> {}
  class FieldConfigField<T = any, V = any> extends ConfigField<T, V> {
    constructor(field: Field);
    get backingField(): Field;
    get elementType(): Class<V>;
    get name(): string;
    getAnnotation<T1 extends Annotation>(annotationClass: Class<T1>): T1;
    getAnnotation<A extends Annotation>(var1: Class<A>): A;
    getValue(manager: ConfigManager<T>): V;
    isAnnotationPresent(annotationClass: Class<Annotation>): boolean;
    setValue(manager: ConfigManager<T>, value: V): void;
  }


  interface ListConfigEntry<T = any, E = any> extends ConfigEntry<T, List> {}
  class ListConfigEntry<T = any, E = any> extends ConfigEntry<T, List> {
    constructor(modId: string, configName: string, field: ConfigField<T, E[]>);
    createElementWidgets(left: number, width: number): AbstractWidget[];
    isValid(): boolean;
  }


  interface ListMemberConfigField<T = any, V = any> extends ConfigField<T, V> {}
  class ListMemberConfigField<T = any, V = any> extends ConfigField<T, V> {
    constructor(listField: Field, elementClass: Class<V>, index: number);
    get backingField(): Field;
    get elementType(): Class<V>;
    get name(): string;
    getAnnotation<T1 extends Annotation>(annotationClass: Class<T1>): T1;
    getAnnotation<A extends Annotation>(var1: Class<A>): A;
    getValue(manager: ConfigManager<T>): V;
    isAnnotationPresent(annotationClass: Class<Annotation>): boolean;
    setValue(manager: ConfigManager<T>, value: V): void;
  }


  interface NumberConfigEntry<T = any, V extends Number = any> extends ConfigEntry<T, V> {}
  class NumberConfigEntry<T = any, V extends Number = any> extends ConfigEntry<T, V> {
    constructor(modId: string, configName: string, field: ConfigField<T, V>);
    createElementWidgets(left: number, width: number): AbstractWidget[];
    resetToDefault(): void;
  }


  interface SliderButton extends AbstractSliderButton {}
  class SliderButton extends AbstractSliderButton {
    setValue(value: number): void;
  }


  interface StringConfigEntry<T = any> extends ConfigEntry<T, string> {}
  class StringConfigEntry<T = any> extends ConfigEntry<T, string> {
    constructor(modId: string, configName: string, field: ConfigField<T, string>);
    createElementWidgets(left: number, width: number): AbstractWidget[];
    resetToDefault(): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client.gui' {
  import { StringWidget, ContainerObjectSelectionList, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { Entry } from 'io.github.jamalam360.jamlib.client.gui.WidgetList';
  import { Minecraft } from 'net.minecraft.client';
  import { List } from 'java.util';

  interface ScrollingStringWidget extends StringWidget {}
  class ScrollingStringWidget extends StringWidget {
    constructor(x: number, y: number, width: number, height: number, component: Component, font: Font);
    renderWidget(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }


  interface WidgetList extends ContainerObjectSelectionList<Entry> {}
  class WidgetList extends ContainerObjectSelectionList<Entry> {
    static readonly PADDING: number;
    constructor(minecraft: Minecraft, width: number, height: number, y: number);
    addWidgetGroup(widgets: AbstractWidget[]): void;
    get rowWidth(): number;
    getRealEntryAtPosition(mouseX: number, mouseY: number): Entry;
    getRowBottom(index: number): number;
    getRowTop(index: number): number;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    updateWidgetGroup(index: number, widgets: AbstractWidget[]): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client.gui.WidgetList' {
  import { Entry as containerobjectselectionlist_Entry } from 'ContainerObjectSelectionList';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';

  interface Entry extends containerobjectselectionlist_Entry<Entry> {}
  class Entry extends containerobjectselectionlist_Entry<Entry> {
    children(): GuiEventListener[];
    get height(): number;
    narratables(): NarratableEntry[];
    render(guiGraphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, hovering: boolean, partialTick: number): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client' {
  class JamLibClient {
    static init(): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client.mixin' {
  import { MutableSpriteImageWidget$Sprite } from 'io.github.jamalam360.jamlib.client.mixinsupport';
  import { ResourceLocation } from 'net.minecraft.resources';

  class AbstractSelectionListMixin {
  }


  interface ImageWidget$SpriteMixin extends MutableSpriteImageWidget$Sprite {}
  class ImageWidget$SpriteMixin extends MutableSpriteImageWidget$Sprite {
    setSprite(sprite: ResourceLocation): void;
  }

}

declare module 'io.github.jamalam360.jamlib.client.mixin.event' {
  class ClientPacketListenerMixin {
  }


  class ConnectionMixin {
  }

}

declare module 'io.github.jamalam360.jamlib.client.mixinsupport' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class MutableSpriteImageWidget$Sprite {
    setSprite(var1: ResourceLocation): void;
  }

}

declare module 'io.github.jamalam360.jamlib.config' {
  import { List, Map } from 'java.util';
  import { Link, ValidationError, FieldValidationInfo } from 'io.github.jamalam360.jamlib.config.ConfigExtensions';
  import { Class } from 'java.lang';

  class ConfigExtensions<T = any> {
    afterSave(): void;
    get links(): Link[];
    getValidationErrors(manager: ConfigManager<T>, info: FieldValidationInfo): ValidationError[];
  }


  class ConfigManager<T = any> {
    static readonly MANAGERS: Map;
    constructor(modId: string, configClass: Class<T>);

    constructor(modId: string, configName: string, configClass: Class<T>);
    get (): T;
    get configClass(): Class<T>;
    get configName(): string;
    get modId(): string;
    reloadFromDisk(): void;
    save(): void;
  }

}

declare module 'io.github.jamalam360.jamlib.config.ConfigExtensions.ValidationError' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly WARNING: Type;
    static readonly ERROR: Type;
    get texture(): ResourceLocation;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'io.github.jamalam360.jamlib.config.ConfigExtensions' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { URL } from 'java.net';

  class Link {
    static readonly DISCORD: ResourceLocation;
    static readonly GENERIC_LINK: ResourceLocation;
    static readonly GITHUB: ResourceLocation;
    constructor(texture: ResourceLocation, url: string, tooltip: Component);

    constructor(texture: ResourceLocation, url: URL, tooltip: Component);
    get texture(): ResourceLocation;
    get tooltip(): Component;
    get url(): URL;
  }

}

declare module 'io.github.jamalam360.jamlib.events.client' {
  import { Event } from 'dev.architectury.event';

  class ClientPlayLifecycleEvents {
    static readonly JOIN: Event;
    static readonly DISCONNECT: Event;
  }

}

declare module 'io.github.jamalam360.jamlib.events.client.ClientPlayLifecycleEvents' {
  import { Minecraft } from 'net.minecraft.client';

  class Join {
    onJoin(var1: Minecraft): void;
  }


  class Leave {
    onLeave(var1: Minecraft): void;
  }

}

declare module 'io.github.jamalam360.jamlib' {
  import { Logger } from 'org.slf4j';
  import { Class } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Platform } from 'io.github.jamalam360.jamlib.JamLibPlatform';
  import { List } from 'java.util';

  class JamLib {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOGGER: Logger;
    static readonly JAR_RENAMING_CHECKER: JarRenamingChecker;
    static checkForJarRenaming(anyModClass: Class<any>): void;
    static id(path: string): ResourceLocation;
    static init(): void;
  }


  class JamLibPlatform {
    static get platform(): Platform;
  }


  class JarRenamingChecker {
    constructor();
    afterNotify(): void;
    checkJar(clazz: Class<any>): void;
    get suspiciousJarsToNotifyAbout(): string[];
  }

}

declare module 'io.github.jamalam360.jamlib.JamLibPlatform' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Platform extends Enum<Platform> {}
  class Platform extends Enum<Platform> {
    static readonly FABRIC: Platform;
    static readonly NEOFORGE: Platform;
    static readonly QUILT: Platform;
    isFabric(): boolean;
    isFabricLike(): boolean;
    isNeoForge(): boolean;
    isQuilt(): boolean;
    toString(): string;
    static valueOf(name: string): Platform;
    static values(): Platform[];
  }

}

declare module 'io.github.jamalam360.jamlib.neoforge' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class JamLibNeoForge {
    constructor();
  }


  class JamLibNeoForgeClient {
    constructor(bus: IEventBus);
  }

}