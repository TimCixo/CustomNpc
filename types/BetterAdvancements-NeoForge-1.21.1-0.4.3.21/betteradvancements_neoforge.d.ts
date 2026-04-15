declare module 'betteradvancements.neoforge.api.event' {
  import { Event } from 'net.neoforged.bus.api';
  import { IAdvancementDrawConnectionsEvent, IAdvancementMovedEvent } from 'betteradvancements.common.api.event';
  import { AdvancementNode, AdvancementHolder } from 'net.minecraft.advancements';
  import { List } from 'java.util';
  import { IBetterAdvancementEntryGui } from 'betteradvancements.common.api';

  interface AdvancementDrawConnectionsEvent extends IAdvancementDrawConnectionsEvent, Event {}
  class AdvancementDrawConnectionsEvent extends IAdvancementDrawConnectionsEvent {
    constructor(advancement: AdvancementNode);
    get advancement(): AdvancementNode;
    get extraConnections(): AdvancementHolder[];
  }


  interface AdvancementMovedEvent extends IAdvancementMovedEvent, Event {}
  class AdvancementMovedEvent extends IAdvancementMovedEvent {
    constructor(gui: IBetterAdvancementEntryGui);
    get advancement(): AdvancementNode;
    get x(): number;
    get y(): number;
  }

}

declare module 'betteradvancements.neoforge' {
  import { ModContainer } from 'net.neoforged.fml';
  import { IAdvancementVisitor, IEventHelper, IPlatformHelper } from 'betteradvancements.common.platform';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { Function, BiFunction } from 'java.util.function';
  import { Path } from 'java.nio.file';
  import { Boolean } from 'java.lang';
  import { IAdvancementMovedEvent, IAdvancementDrawConnectionsEvent } from 'betteradvancements.common.api.event';
  import { IBetterAdvancementEntryGui } from 'betteradvancements.common.api';
  import { AdvancementNode } from 'net.minecraft.advancements';

  class BetterAdvancements {
    constructor(container: ModContainer);
  }


  interface NeoForgeAdvancementVisitor extends IAdvancementVisitor {}
  class NeoForgeAdvancementVisitor extends IAdvancementVisitor {
    findAdvancements(location: ResourceLocation, serverLevel: ServerLevel, preprocessor: Function<Path, boolean>, processor: BiFunction<Path, Path, boolean>, defaultUnfoundRoot: boolean, visitAllFiles: boolean): boolean;
  }


  interface NeoForgeEventHelper extends IEventHelper {}
  class NeoForgeEventHelper extends IEventHelper {
    postAdvancementDrawConnectionsEvent(advancement: AdvancementNode): IAdvancementDrawConnectionsEvent;
    postAdvancementMovementEvent(gui: IBetterAdvancementEntryGui): IAdvancementMovedEvent;
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get advancementVisitor(): NeoForgeAdvancementVisitor;
    get eventHelper(): IEventHelper;
    get platformName(): string;
  }

}

declare module 'betteradvancements.neoforge.config' {
  import { ModConfigSpec } from 'net.neoforged.neoforge.common';
  import { Loading, Reloading } from 'ModConfigEvent';
  import { ConfigValue, BooleanValue, IntValue } from 'ModConfigSpec';

  class Config {
    static instance: Config;
    static readonly CLIENT: ModConfigSpec;
    onFileChange(configEvent: Reloading): void;
    onLoad(configEvent: Loading): void;
  }


  class ConfigValues {
    static defaultUncompletedIconColor: ConfigValue;
    static defaultUncompletedTitleColor: ConfigValue;
    static defaultCompletedIconColor: ConfigValue;
    static defaultCompletedTitleColor: ConfigValue;
    static doFade: BooleanValue;
    static showDebugCoordinates: BooleanValue;
    static orderTabsAlphabetically: BooleanValue;
    static uiScaling: IntValue;
    static detailLevel: ConfigValue;
    static requiresShift: BooleanValue;
    static addToInventory: BooleanValue;
    static defaultDrawDirectLines: BooleanValue;
    static defaultHideLines: BooleanValue;
    static defaultCompletedLineColor: ConfigValue;
    static defaultUncompletedLineColor: ConfigValue;
    static onlyUseAboveAdvancementTabs: BooleanValue;
    static build(): ModConfigSpec;
    static pushChanges(): void;
  }

}

declare module 'betteradvancements.neoforge.handler' {
  import { Opening } from 'ScreenEvent';
  import { Post, Pre } from 'ScreenEvent.Init';

  class GuiOpenHandler {
    static readonly instance: GuiOpenHandler;
    onGuiAboutToOpen(event: Pre): void;
    onGuiOpen(event: Opening): void;
    onGuiOpened(event: Post): void;
  }

}