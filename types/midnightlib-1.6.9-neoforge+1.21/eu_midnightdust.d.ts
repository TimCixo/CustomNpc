declare module 'eu.midnightdust.core.config' {
  import { MidnightConfig } from 'eu.midnightdust.lib.config';
  import { ConfigButton } from 'eu.midnightdust.core.config.MidnightLibConfig';

  interface MidnightLibConfig extends MidnightConfig {}
  class MidnightLibConfig extends MidnightConfig {
    static readonly HAS_MODMENU: boolean;
    static config_screen_list: ConfigButton;
    static shouldShowButton(): boolean;
  }

}

declare module 'eu.midnightdust.core.config.MidnightLibConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ConfigButton extends Enum<ConfigButton> {}
  class ConfigButton extends Enum<ConfigButton> {
    static readonly TRUE: ConfigButton;
    static readonly FALSE: ConfigButton;
    static readonly MODMENU: ConfigButton;
    static valueOf(name: string): ConfigButton;
    static values(): ConfigButton[];
  }

}

declare module 'eu.midnightdust.core' {
  import { List } from 'java.util';
  import { Logger } from 'org.slf4j';

  class MidnightLib {
    static hiddenMods: List;
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static onInitializeClient(): void;
    static registerAutoCommand(): void;
  }

}

declare module 'eu.midnightdust.core.mixin' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';

  interface MixinOptionsScreen extends Screen {}
  class MixinOptionsScreen extends Screen {
    midnightlib$onInit(ci: CallbackInfo): void;
    midnightlib$onResize(ci: CallbackInfo): void;
    midnightlib$setButtonPos(): void;
  }

}

declare module 'eu.midnightdust.core.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MidnightConfigOverviewScreen extends Screen {}
  class MidnightConfigOverviewScreen extends Screen {
    constructor(parent: Screen);
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'eu.midnightdust.lib.config' {
  import { Field } from 'java.lang.reflect';
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Map } from 'java.util';
  import { Class } from 'java.lang';
  import { Tooltip } from 'net.minecraft.client.gui.components';
  import { EntryInfo } from 'eu.midnightdust.lib.config.MidnightConfig';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class AutoCommand {
    constructor(field: Field, modid: string);
    get argType(): ArgumentType<any>;
    setValueFromArg(context: CommandContext<CommandSourceStack>, action: string): number;
  }


  class MidnightConfig {
    static readonly configClass: Map;
    static getClass(modid: string): MidnightConfig;
    static getDefaultValue(modid: string, entry: string): any;
    static getScreen(parent: Screen, modid: string): Screen;
    static getTooltip(info: EntryInfo, isButton: boolean): Tooltip;
    static getUnderlyingType(field: Field): Class<any>;
    static init(modid: string, config: Class<MidnightConfig>): void;
    static write(modid: string): void;
    writeChanges(modid: string): void;
  }

}

declare module 'eu.midnightdust.lib.config.MidnightConfig' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { TabManager, Tab, TabNavigationBar } from 'net.minecraft.client.gui.components.tabs';
  import { Map, List } from 'java.util';
  import { Button, AbstractSliderButton, MultiLineTextWidget, AbstractWidget, ContainerObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ExclusionStrategy, FieldAttributes } from 'com.google.gson';
  import { Class } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { Entry } from 'ContainerObjectSelectionList';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Minecraft } from 'net.minecraft.client';

  class EntryInfo {
    setValue(value: any): void;
    toTemporaryValue(): string;
    writeList<T>(index: number, value: T): void;
  }


  interface MidnightConfigScreen extends Screen {}
  class MidnightConfigScreen extends Screen {
    readonly translationPrefix: string;
    readonly modid: string;
    readonly parent: Screen;
    list: MidnightConfigListWidget;
    tabManager: TabManager;
    tabs: Map;
    prevTab: Tab;
    tabNavigation: TabNavigationBar;
    done: Button;
    scrollProgress: number;
    fillList(): void;
    init(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    loadValues(): void;
    onClose(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    tick(): void;
    updateButtons(): void;
  }


  interface HiddenAnnotationExclusionStrategy extends ExclusionStrategy {}
  class HiddenAnnotationExclusionStrategy extends ExclusionStrategy {
    shouldSkipClass(clazz: Class<any>): boolean;
    shouldSkipField(fieldAttributes: FieldAttributes): boolean;
  }


  interface MidnightSliderWidget extends AbstractSliderButton {}
  class MidnightSliderWidget extends AbstractSliderButton {
    constructor(x: number, y: number, width: number, height: number, text: Component, value: number, info: EntryInfo);
    applyValue(): void;
    updateMessage(): void;
  }


  interface ButtonEntry extends Entry<ButtonEntry> {}
  class ButtonEntry extends Entry<ButtonEntry> {
    readonly text: Component;
    readonly buttons: List;
    readonly info: EntryInfo;
    centered: boolean;
    title: MultiLineTextWidget;
    constructor(buttons: AbstractWidget[], text: Component, info: EntryInfo);
    children(): GuiEventListener[];
    narratables(): NarratableEntry[];
    render(context: GuiGraphics, index: number, y: number, x: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, hovered: boolean, tickDelta: number): void;
  }


  interface MidnightConfigListWidget extends ContainerObjectSelectionList<ButtonEntry> {}
  class MidnightConfigListWidget extends ContainerObjectSelectionList<ButtonEntry> {
    renderHeaderSeparator: boolean;
    constructor(client: Minecraft, width: number, height: number, y: number, itemHeight: number);
    addButton(buttons: AbstractWidget[], text: Component, info: EntryInfo): void;
    clear(): void;
    get rowWidth(): number;
    get scrollbarPosition(): number;
  }

}

declare module 'eu.midnightdust.lib.util' {
  import { Color } from 'java.awt';
  import { Path } from 'java.nio.file';
  import { LiteralArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class MidnightColorUtil {
    static hex2Rgb(colorStr: string): Color;
  }


  class PlatformFunctions {
    static get configDirectory(): Path;
    static get platformName(): string;
    static isClientEnv(): boolean;
    static isModLoaded(modid: string): boolean;
    static registerCommand(command: LiteralArgumentBuilder<CommandSourceStack>): void;
  }

}

declare module 'eu.midnightdust.neoforge' {
  import { List } from 'java.util';

  class MidnightLibNeoForge {
    static commands: List;
    constructor();
  }

}

declare module 'eu.midnightdust.neoforge.MidnightLibNeoForge' {
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';

  class MidnightLibEvents {
    static registerCommands(event: RegisterCommandsEvent): void;
  }


  class MidnightLibBusEvents {
    static onPostInit(event: FMLClientSetupEvent): void;
  }

}