declare module 'de.keksuccino.fancymenu.commands' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Map } from 'java.util';

  class CloseGuiScreenCommand {
    static register(d: CommandDispatcher<CommandSourceStack>): void;
  }


  class Commands {
    static registerAll(dispatcher: CommandDispatcher<CommandSourceStack>): void;
  }


  class LayoutCommand {
    static readonly CACHED_LAYOUT_SUGGESTIONS: Map;
    static register(d: CommandDispatcher<CommandSourceStack>): void;
  }


  class OpenGuiScreenCommand {
    static register(d: CommandDispatcher<CommandSourceStack>): void;
  }


  class VariableCommand {
    static readonly CACHED_VARIABLE_SUGGESTIONS: Map;
    static register(d: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'de.keksuccino.fancymenu' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { File } from 'java.io';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { Post } from 'ScreenEvent.KeyPressed';
  import { Post as screenevent_keyreleased_Post } from 'ScreenEvent.KeyReleased';
  import { LoggingIn } from 'ClientPlayerNetworkEvent';
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { PlayerLoggedInEvent } from 'PlayerEvent';
  import { LegacyCheckList } from 'de.keksuccino.fancymenu.LegacyHandler';
  import { AbstractOptions } from 'de.keksuccino.fancymenu.util';
  import { Option } from 'de.keksuccino.fancymenu.util.AbstractOptions';
  import { Post as de_keksuccino_fancymenu_events_screen_renderscreenevent_Post } from 'de.keksuccino.fancymenu.events.screen.RenderScreenEvent';
  import { InitOrResizeScreenCompletedEvent } from 'de.keksuccino.fancymenu.events.screen';

  class Compat {
    static isAudioExtensionLoaded(): boolean;
    static isOptiFineLoaded(): boolean;
    static isVideoExtensionLoaded(): boolean;
    static printInfoLog(): void;
  }


  interface CreditsScreen extends Screen {}
  class CreditsScreen extends Screen {
    constructor(parent: Screen);
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    shouldCloseOnEsc(): boolean;
  }


  class FancyMenu {
    static readonly VERSION: string;
    static readonly MOD_LOADER: string;
    static readonly MOD_ID: string;
    static readonly MOD_DIR: File;
    static readonly INSTANCE_DATA_DIR: File;
    static readonly TEMP_DATA_DIR: File;
    static readonly CACHE_DIR: File;
    static get minecraftVersion(): string;
    static get options(): Options;
    static init(): void;
    static lateClientInit(): void;
    static reloadOptions(): void;
  }


  class FancyMenuNeoForge {
    constructor(eventBus: IEventBus);
  }


  class FancyMenuNeoForgeClientEvents {
    afterScreenKeyPress(e: Post): void;
    afterScreenKeyRelease(e: screenevent_keyreleased_Post): void;
    onClientLoggedIn(e: LoggingIn): void;
    static registerAll(): void;
  }


  class FancyMenuNeoForgeServerEvents {
    onPlayerLoggedIn(e: PlayerLoggedInEvent): void;
    onRegisterServerCommands(e: RegisterCommandsEvent): void;
    static registerAll(): void;
  }


  class LegacyHandler {
    static get checkList(): LegacyCheckList;
    static updateCheckList(): void;
  }


  interface Options extends AbstractOptions {}
  class Options extends AbstractOptions {
    readonly playVanillaMenuMusic: Option;
    readonly defaultGuiScale: Option;
    readonly forceFullscreen: Option;
    readonly advancedCustomizationMode: Option;
    readonly showCustomizationOverlay: Option;
    readonly modpackMode: Option;
    readonly gameIntroAnimation: Option;
    readonly gameIntroAllowSkip: Option;
    readonly gameIntroFadeOut: Option;
    readonly gameIntroCustomSkipText: Option;
    readonly preLoadResources: Option;
    readonly showCustomWindowIcon: Option;
    readonly customWindowIcon16: Option;
    readonly customWindowIcon32: Option;
    readonly customWindowIconMacOS: Option;
    readonly customWindowTitle: Option;
    readonly showMultiplayerScreenServerIcons: Option;
    readonly showSingleplayerScreenWorldIcons: Option;
    readonly showLayoutEditorGrid: Option;
    readonly layoutEditorGridSize: Option;
    readonly layoutEditorGridSnapping: Option;
    readonly layoutEditorGridSnappingStrength: Option;
    readonly showAllAnchorOverlayConnections: Option;
    readonly anchorOverlayChangeAnchorOnAreaHover: Option;
    readonly anchorOverlayChangeAnchorOnElementHover: Option;
    readonly invertAnchorOverlayColor: Option;
    readonly anchorOverlayOpacityPercentageNormal: Option;
    readonly anchorOverlayOpacityPercentageBusy: Option;
    readonly anchorOverlayColorBaseOverride: Option;
    readonly anchorOverlayColorBorderOverride: Option;
    readonly anchorOverlayVisibilityMode: Option;
    readonly anchorOverlayHoverChargingTimeSeconds: Option;
    readonly enableBuddy: Option;
    readonly enableElementRotationControls: Option;
    readonly enableElementTiltingControls: Option;
    readonly uiScale: Option;
    readonly playUiClickSounds: Option;
    readonly enableUiTextShadow: Option;
    readonly contextMenuHoverOpenSpeed: Option;
    readonly uiTheme: Option;
    readonly showDebugOverlay: Option;
    readonly debugOverlayShowBasicScreenCategory: Option;
    readonly debugOverlayShowAdvancedScreenCategory: Option;
    readonly debugOverlayShowResourcesCategory: Option;
    readonly debugOverlayShowSystemCategory: Option;
    readonly showWelcomeScreen: Option;
    readonly arrowKeysMovePreview: Option;
    readonly placeholderCachingDurationMs: Option;
    readonly requirementCachingDurationMs: Option;
    constructor();
  }


  class Test {
    onInitScreenPost(e: InitOrResizeScreenCompletedEvent): void;
    onRenderPost(e: de_keksuccino_fancymenu_events_screen_renderscreenevent_Post): void;
  }


  interface WelcomeScreen extends Screen {}
  class WelcomeScreen extends Screen {
    constructor(parent: Screen);
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action' {
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { Component } from 'net.minecraft.network.chat';
  import { List, Set, Map } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { File } from 'java.io';
  import { Supplier } from 'java.util.function';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  class Action {
    static readonly EMPTY: Action;
    constructor(uniqueIdentifier: string);
    canRunAsync(): boolean;
    checkAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(var1: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get identifier(): string;
    get valueDisplayName(): Component;
    get valueExample(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    hasValue(): boolean;
    isDeprecated(): boolean;
    shouldShowUpInEditorActionMenu(editor: LayoutEditorScreen): boolean;
  }


  class ActionFavoritesManager {
    static readonly FAVORITES_FILE: File;
    static addFavorite(identifier: string): void;
    static get favorites(): string[];
    static isFavorite(identifier: string): boolean;
    static removeFavorite(identifier: string): void;
    static retainFavorites(validIdentifiers: Set<string>): void;
    static toggleFavorite(identifier: string): void;
  }


  interface ActionInstance extends Executable, ValuePlaceholderHolder {}
  class ActionInstance extends Executable {
    action: Action;
    value: string;
    identifier: string;
    constructor(action: Action, value: string);
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    copy(unique: boolean): ActionInstance;
    static deserializeAll(serialized: PropertyContainer): ActionInstance[];
    execute(): void;
    get identifier(): string;
    get valuePlaceholders(): Map<string, Supplier<string>>;
    serialize(): PropertyContainer;
  }


  class ActionRegistry {
    static get actions(): Action[];
    static getAction(identifier: string): Action;
    static register(action: Action): void;
  }


  class Executable {
    copy(var1: boolean): Executable;
    execute(): void;
    get identifier(): string;
    serialize(): PropertyContainer;
    serializeToExistingPropertyContainer(container: PropertyContainer): void;
  }


  class ValuePlaceholderHolder {
    static readonly VALUE_PLACEHOLDER_PREFIX: string;
    addValuePlaceholder(var1: string, var2: Supplier<string>): void;
    get valuePlaceholders(): Map<string, Supplier<string>>;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions' {
  import { SetVariableAction, ClearVariablesAction } from 'de.keksuccino.fancymenu.customization.action.actions.variables';
  import { PasteToChatAction, SendMessageAction, QuitGameAction, OpenLinkAction, ReloadFancyMenuAction, CopyToClipboardAction, MimicButtonAction, MimicKeybindAction, EditMinecraftOptionAction, SendHttpRequestAction, PrintToLogAction, DisplayInChatClientSideAction, ShowToastAction, ManageResourcePackAction, ReloadResourcePacksAction } from 'de.keksuccino.fancymenu.customization.action.actions.other';
  import { ToggleLayoutAction, EnableLayoutAction, DisableLayoutAction } from 'de.keksuccino.fancymenu.customization.action.actions.layout';
  import { JoinServerAction, EnterWorldAction, JoinLastWorldServerAction, DisconnectAction } from 'de.keksuccino.fancymenu.customization.action.actions.level';
  import { OpenScreenAction, CloseScreenAction, UpdateScreenAction, BackToLastScreenAction } from 'de.keksuccino.fancymenu.customization.action.actions.screen';
  import { SetAudioElementVolumeAction, NextTrackAction, PreviousTrackAction, TogglePlayTrackAction } from 'de.keksuccino.fancymenu.customization.action.actions.audio';
  import { SetVideoElementVolumeAction, ToggleVideoElementPauseStateAction } from 'de.keksuccino.fancymenu.customization.action.actions.video.element';
  import { SetVideoMenuBackgroundVolumeAction, ToggleVideoMenuBackgroundPauseStateAction } from 'de.keksuccino.fancymenu.customization.action.actions.video.background';
  import { ToggleElementAnimatorAction, EnableElementAnimatorAction, DisableElementAnimatorAction, ResetElementAnimatorAction } from 'de.keksuccino.fancymenu.customization.action.actions.animation';
  import { DeleteFileAction, MoveFileAction, CopyFileAction, RenameFileAction, DownloadFileAction, WriteFileAction, CreateFileAction, SelectFileAction } from 'de.keksuccino.fancymenu.customization.action.actions.file';

  class Actions {
    static readonly SET_VARIABLE: SetVariableAction;
    static readonly CLEAR_VARIABLES: ClearVariablesAction;
    static readonly PASTE_TO_CHAT: PasteToChatAction;
    static readonly TOGGLE_LAYOUT: ToggleLayoutAction;
    static readonly ENABLE_LAYOUT: EnableLayoutAction;
    static readonly DISABLE_LAYOUT: DisableLayoutAction;
    static readonly SEND_MESSAGE: SendMessageAction;
    static readonly QUIT_GAME: QuitGameAction;
    static readonly JOIN_SERVER: JoinServerAction;
    static readonly ENTER_WORLD: EnterWorldAction;
    static readonly JOIN_LAST_WORLD_SERVER: JoinLastWorldServerAction;
    static readonly DISCONNECT: DisconnectAction;
    static readonly OPEN_SCREEN: OpenScreenAction;
    static readonly CLOSE_SCREEN: CloseScreenAction;
    static readonly UPDATE_SCREEN: UpdateScreenAction;
    static readonly OPEN_LINK: OpenLinkAction;
    static readonly RELOAD_FANCYMENU: ReloadFancyMenuAction;
    static readonly COPY_TO_CLIPBOARD: CopyToClipboardAction;
    static readonly MIMIC_BUTTON: MimicButtonAction;
    static readonly MIMIC_KEYBIND: MimicKeybindAction;
    static readonly EDIT_MINECRAFT_OPTION: EditMinecraftOptionAction;
    static readonly SET_AUDIO_ELEMENT_VOLUME: SetAudioElementVolumeAction;
    static readonly NEXT_AUDIO_ELEMENT_TRACK: NextTrackAction;
    static readonly PREVIOUS_AUDIO_ELEMENT_TRACK: PreviousTrackAction;
    static readonly TOGGLE_PLAY_AUDIO_ELEMENT_TRACK: TogglePlayTrackAction;
    static readonly BACK_TO_LAST_SCREEN: BackToLastScreenAction;
    static readonly SET_VIDEO_ELEMENT_VOLUME: SetVideoElementVolumeAction;
    static readonly TOGGLE_VIDEO_ELEMENT_PAUSE_STATE: ToggleVideoElementPauseStateAction;
    static readonly SET_VIDEO_MENU_BACKGROUND_VOLUME: SetVideoMenuBackgroundVolumeAction;
    static readonly TOGGLE_VIDEO_MENU_BACKGROUND_PAUSE_STATE: ToggleVideoMenuBackgroundPauseStateAction;
    static readonly TOGGLE_ELEMENT_ANIMATOR: ToggleElementAnimatorAction;
    static readonly ENABLE_ELEMENT_ANIMATOR: EnableElementAnimatorAction;
    static readonly DISABLE_ELEMENT_ANIMATOR: DisableElementAnimatorAction;
    static readonly RESET_ELEMENT_ANIMATOR: ResetElementAnimatorAction;
    static readonly SEND_HTTP_REQUEST: SendHttpRequestAction;
    static readonly PRINT_TO_LOG: PrintToLogAction;
    static readonly DISPLAY_IN_CHAT_CLIENT_SIDE: DisplayInChatClientSideAction;
    static readonly SHOW_TOAST: ShowToastAction;
    static readonly DELETE_FILE: DeleteFileAction;
    static readonly MOVE_FILE: MoveFileAction;
    static readonly COPY_FILE: CopyFileAction;
    static readonly RENAME_FILE: RenameFileAction;
    static readonly DOWNLOAD_FILE: DownloadFileAction;
    static readonly WRITE_FILE: WriteFileAction;
    static readonly CREATE_FILE: CreateFileAction;
    static readonly SELECT_FILE: SelectFileAction;
    static readonly MANAGE_RESOURCE_PACK: ManageResourcePackAction;
    static readonly RELOAD_RESOURCE_PACKS: ReloadResourcePacksAction;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.animation' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface DisableElementAnimatorAction extends Action {}
  class DisableElementAnimatorAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface EnableElementAnimatorAction extends Action {}
  class EnableElementAnimatorAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ResetElementAnimatorAction extends Action {}
  class ResetElementAnimatorAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ToggleElementAnimatorAction extends Action {}
  class ToggleElementAnimatorAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.audio' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface NextTrackAction extends Action {}
  class NextTrackAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface PreviousTrackAction extends Action {}
  class PreviousTrackAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface SetAudioElementVolumeAction extends Action {}
  class SetAudioElementVolumeAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface TogglePlayTrackAction extends Action {}
  class TogglePlayTrackAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.file' {
  import { Action, ActionInstance } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { FileVisitResult, Path } from 'java.nio.file';
  import { BasicFileAttributes } from 'java.nio.file.attribute';
  import { IOException } from 'java.io';

  interface CopyFileAction extends Action {}
  class CopyFileAction extends Action {
    constructor();
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
    preVisitDirectory(dir: Path, attrs: BasicFileAttributes): FileVisitResult;
    visitFile(file: Path, attrs: BasicFileAttributes): FileVisitResult;
  }


  interface CreateFileAction extends Action {}
  class CreateFileAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface DeleteFileAction extends Action {}
  class DeleteFileAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
    postVisitDirectory(dir: Path, exc: IOException): FileVisitResult;
    visitFile(file: Path, attrs: BasicFileAttributes): FileVisitResult;
  }


  interface DownloadFileAction extends Action {}
  class DownloadFileAction extends Action {
    constructor();
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface MoveFileAction extends Action {}
  class MoveFileAction extends Action {
    constructor();
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface RenameFileAction extends Action {}
  class RenameFileAction extends Action {
    constructor();
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface SelectFileAction extends Action {}
  class SelectFileAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface WriteFileAction extends Action {}
  class WriteFileAction extends Action {
    constructor();
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.file.SelectFileAction' {
  import { List } from 'java.util';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  class SelectFileConfig {
    targetPath: string;
    filterDescription: string;
    extensionsRaw: string;
    overwriteExisting: boolean;
    buildFilterPatterns(): string[];
    get effectiveFilterDescription(): string;
    hasValidTargetPath(): boolean;
    static parse(value: string): SelectFileConfig;
    serialize(): string;
  }


  interface SelectFileActionValueScreen extends CellScreen {}
  class SelectFileActionValueScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.file.WriteFileAction' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  class WriteFileConfig {
    targetPath: string;
    content: string;
    appendMode: boolean;
    static parse(value: string): WriteFileConfig;
    serialize(): string;
  }


  interface WriteFileActionValueScreen extends CellScreen {}
  class WriteFileActionValueScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.layout' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface DisableLayoutAction extends Action {}
  class DisableLayoutAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface EnableLayoutAction extends Action {}
  class EnableLayoutAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ToggleLayoutAction extends Action {}
  class ToggleLayoutAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.level' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface DisconnectAction extends Action {}
  class DisconnectAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface EnterWorldAction extends Action {}
  class EnterWorldAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface JoinLastWorldServerAction extends Action {}
  class JoinLastWorldServerAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface JoinServerAction extends Action {}
  class JoinServerAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other' {
  import { Action, ActionInstance } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface CopyToClipboardAction extends Action {}
  class CopyToClipboardAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface DisplayInChatClientSideAction extends Action {}
  class DisplayInChatClientSideAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface EditMinecraftOptionAction extends Action {}
  class EditMinecraftOptionAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ManageResourcePackAction extends Action {}
  class ManageResourcePackAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface MimicButtonAction extends Action {}
  class MimicButtonAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface MimicKeybindAction extends Action {}
  class MimicKeybindAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface OpenLinkAction extends Action {}
  class OpenLinkAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface PasteToChatAction extends Action {}
  class PasteToChatAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface PrintToLogAction extends Action {}
  class PrintToLogAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface QuitGameAction extends Action {}
  class QuitGameAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ReloadFancyMenuAction extends Action {}
  class ReloadFancyMenuAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ReloadResourcePacksAction extends Action {}
  class ReloadResourcePacksAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface SendMessageAction extends Action {}
  class SendMessageAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ShowToastAction extends Action {}
  class ShowToastAction extends Action {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, instance: ActionInstance): void;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other.EditMinecraftOptionAction' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface EditMinecraftOptionActionValueScreen extends StringBuilderScreen {}
  class EditMinecraftOptionActionValueScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other.ManageResourcePackAction' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface ResourcePackMode extends Enum<ResourcePackMode> {}
  class ResourcePackMode extends Enum<ResourcePackMode> {
    static readonly ENABLE: ResourcePackMode;
    static readonly DISABLE: ResourcePackMode;
    static readonly TOGGLE: ResourcePackMode;
    static byName(name: string): ResourcePackMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): ResourcePackMode[];
    getByNameInternal(name: string): ResourcePackMode;
    static valueOf(name: string): ResourcePackMode;
    static values(): ResourcePackMode[];
  }


  interface ManageResourcePackActionValueScreen extends StringBuilderScreen {}
  class ManageResourcePackActionValueScreen extends StringBuilderScreen {
    allowDone(): boolean;
    buildString(): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other.MimicKeybindAction' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MimicKeybindActionValueScreen extends StringBuilderScreen {}
  class MimicKeybindActionValueScreen extends StringBuilderScreen {
    allowDone(): boolean;
    buildString(): string;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other.PasteToChatAction' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface PasteToChatActionValueScreen extends StringBuilderScreen {}
  class PasteToChatActionValueScreen extends StringBuilderScreen {
    buildString(): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.other.ShowToastAction' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  class ToastConfig {
    width: number;
    durationMs: number;
    title: string;
    message: string;
    iconSource: string;
    backgroundSource: string;
    static defaultConfig(): ToastConfig;
    normalize(): void;
    static parse(value: string): ToastConfig;
    serialize(): string;
  }


  interface ShowToastActionValueScreen extends CellScreen {}
  class ShowToastActionValueScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.screen' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';
  import { CloseScreenEvent } from 'de.keksuccino.fancymenu.events.screen';

  interface BackToLastScreenAction extends Action {}
  class BackToLastScreenAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
    onCloseScreen(e: CloseScreenEvent): void;
  }


  interface CloseScreenAction extends Action {}
  class CloseScreenAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface OpenScreenAction extends Action {}
  class OpenScreenAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface UpdateScreenAction extends Action {}
  class UpdateScreenAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.variables' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface ClearVariablesAction extends Action {}
  class ClearVariablesAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface SetVariableAction extends Action {}
  class SetVariableAction extends Action {
    constructor();
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.video.background' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface SetVideoMenuBackgroundVolumeAction extends Action {}
  class SetVideoMenuBackgroundVolumeAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ToggleVideoMenuBackgroundPauseStateAction extends Action {}
  class ToggleVideoMenuBackgroundPauseStateAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.actions.video.element' {
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { Component } from 'net.minecraft.network.chat';

  interface SetVideoElementVolumeAction extends Action {}
  class SetVideoElementVolumeAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }


  interface ToggleVideoElementPauseStateAction extends Action {}
  class ToggleVideoElementPauseStateAction extends Action {
    constructor();
    canRunAsync(): boolean;
    execute(value: string): void;
    get actionDescription(): Component[];
    get actionDisplayName(): Component;
    get valueDisplayName(): Component;
    get valueExample(): string;
    hasValue(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.blocks' {
  import { Executable, ValuePlaceholderHolder } from 'de.keksuccino.fancymenu.customization.action';
  import { Supplier } from 'java.util.function';
  import { Map, List } from 'java.util';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  interface AbstractExecutableBlock extends Executable, ValuePlaceholderHolder {}
  class AbstractExecutableBlock extends Executable {
    identifier: string;
    addExecutable(executable: Executable): AbstractExecutableBlock;
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    clearExecutables(): AbstractExecutableBlock;
    execute(): void;
    get appendedBlock(): AbstractExecutableBlock;
    get blockType(): string;
    get executables(): Executable[];
    get identifier(): string;
    get valuePlaceholders(): Map<string, Supplier<string>>;
    removeExecutable(executable: Executable): AbstractExecutableBlock;
    serialize(): PropertyContainer;
    set appendedBlock(appended: AbstractExecutableBlock);
  }


  class ExecutableBlockDeserializer {
    static deserializeAll(serialized: PropertyContainer): AbstractExecutableBlock[];
    static deserializeEmptyWithTypeAndIdentifier(serialized: PropertyContainer, type: string, identifier: string): AbstractExecutableBlock;
    static deserializeWithIdentifier(serialized: PropertyContainer, identifier: string): AbstractExecutableBlock;
  }


  interface FolderExecutableBlock extends AbstractExecutableBlock {}
  class FolderExecutableBlock extends AbstractExecutableBlock {
    static readonly DEFAULT_NAME: string;
    copy(unique: boolean): FolderExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): FolderExecutableBlock;
    get blockType(): string;
    get name(): string;
    isCollapsed(): boolean;
    serialize(): PropertyContainer;
    set name(name: string);
    setCollapsed(collapsed: boolean): void;
  }


  interface GenericExecutableBlock extends AbstractExecutableBlock {}
  class GenericExecutableBlock extends AbstractExecutableBlock {
    copy(unique: boolean): GenericExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): GenericExecutableBlock;
    get blockType(): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.blocks.statements' {
  import { AbstractExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { Supplier } from 'java.util.function';

  interface ElseExecutableBlock extends AbstractExecutableBlock {}
  class ElseExecutableBlock extends AbstractExecutableBlock {
    copy(unique: boolean): ElseExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): ElseExecutableBlock;
    get blockType(): string;
  }


  interface ElseIfExecutableBlock extends AbstractExecutableBlock {}
  class ElseIfExecutableBlock extends AbstractExecutableBlock {
    condition: LoadingRequirementContainer;
    constructor();

    constructor(condition: LoadingRequirementContainer);
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    check(): boolean;
    copy(unique: boolean): ElseIfExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): ElseIfExecutableBlock;
    execute(): void;
    get appendedBlock(): AbstractExecutableBlock;
    get blockType(): string;
    serialize(): PropertyContainer;
    set appendedBlock(appended: AbstractExecutableBlock);
  }


  interface IfExecutableBlock extends AbstractExecutableBlock {}
  class IfExecutableBlock extends AbstractExecutableBlock {
    condition: LoadingRequirementContainer;
    constructor();

    constructor(condition: LoadingRequirementContainer);
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    check(): boolean;
    copy(unique: boolean): IfExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): IfExecutableBlock;
    execute(): void;
    get appendedBlock(): AbstractExecutableBlock;
    get blockType(): string;
    isCollapsed(): boolean;
    serialize(): PropertyContainer;
    set appendedBlock(appended: AbstractExecutableBlock);
    setCollapsed(collapsed: boolean): void;
  }


  interface WhileExecutableBlock extends AbstractExecutableBlock {}
  class WhileExecutableBlock extends AbstractExecutableBlock {
    condition: LoadingRequirementContainer;
    constructor();

    constructor(condition: LoadingRequirementContainer);
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    check(): boolean;
    copy(unique: boolean): WhileExecutableBlock;
    static deserializeEmptyWithIdentifier(serialized: PropertyContainer, identifier: string): WhileExecutableBlock;
    execute(): void;
    get blockType(): string;
    isCollapsed(): boolean;
    serialize(): PropertyContainer;
    setCollapsed(collapsed: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.ui' {
  import { QueueableNotificationScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.queueable';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { InitialWidgetFocusScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { ActionInstance } from 'de.keksuccino.fancymenu.customization.action';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AsyncActionErrorScreen extends QueueableNotificationScreen {}
  class AsyncActionErrorScreen extends QueueableNotificationScreen {
    constructor(actionName: Component);
  }


  interface ChooseActionScreen extends InitialWidgetFocusScreen, Screen {}
  class ChooseActionScreen extends InitialWidgetFocusScreen {
    isEdit: boolean;
    constructor(instanceToEdit: ActionInstance, callback: Consumer<ActionInstance>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.action.ui.ChooseActionScreen' {
  import { TextListScrollAreaEntry, ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { Action } from 'de.keksuccino.fancymenu.customization.action';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { Consumer } from 'java.util.function';

  interface ActionScrollEntry extends TextListScrollAreaEntry {}
  class ActionScrollEntry extends TextListScrollAreaEntry {
    action: Action;
    constructor(parent: ScrollArea, action: Action, onClick: Consumer<TextListScrollAreaEntry>);
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.color' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface ColorMenuBackground extends MenuBackground {}
  class ColorMenuBackground extends MenuBackground {
    color: DrawableColor;
    constructor(builder: MenuBackgroundBuilder<ColorMenuBackground>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ColorMenuBackgroundBuilder extends MenuBackgroundBuilder<ColorMenuBackground> {}
  class ColorMenuBackgroundBuilder extends MenuBackgroundBuilder<ColorMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: ColorMenuBackground, backgroundConsumer: Consumer<ColorMenuBackground>): void;
    deserializeBackground(serializedMenuBackground: SerializedMenuBackground): ColorMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    serializedBackground(background: ColorMenuBackground): SerializedMenuBackground;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.image' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface ImageMenuBackground extends MenuBackground {}
  class ImageMenuBackground extends MenuBackground {
    textureSupplier: ResourceSupplier;
    fallbackTextureSupplier: ResourceSupplier;
    slideLeftRight: boolean;
    repeat: boolean;
    parallaxEnabled: boolean;
    parallaxIntensityString: string;
    lastParallaxIntensity: number;
    invertParallax: boolean;
    restartAnimatedOnMenuLoad: boolean;
    constructor(builder: MenuBackgroundBuilder<ImageMenuBackground>);
    onOpenScreen(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ImageMenuBackgroundBuilder extends MenuBackgroundBuilder<ImageMenuBackground> {}
  class ImageMenuBackgroundBuilder extends MenuBackgroundBuilder<ImageMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: ImageMenuBackground, backgroundConsumer: Consumer<ImageMenuBackground>): void;
    deserializeBackground(serializedMenuBackground: SerializedMenuBackground): ImageMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    serializedBackground(background: ImageMenuBackground): SerializedMenuBackground;
  }


  interface ImageMenuBackgroundConfigScreen extends CellScreen {}
  class ImageMenuBackgroundConfigScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds' {
  import { ImageMenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background.backgrounds.image';
  import { SlideshowMenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background.backgrounds.slideshow';
  import { PanoramaMenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background.backgrounds.panorama';
  import { ColorMenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background.backgrounds.color';
  import { MCEFVideoMenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background.backgrounds.video.mcef';

  class MenuBackgrounds {
    static readonly IMAGE: ImageMenuBackgroundBuilder;
    static readonly SLIDESHOW: SlideshowMenuBackgroundBuilder;
    static readonly PANORAMA: PanoramaMenuBackgroundBuilder;
    static readonly COLOR: ColorMenuBackgroundBuilder;
    static readonly VIDEO_MCEF: MCEFVideoMenuBackgroundBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.panorama' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface PanoramaMenuBackground extends MenuBackground {}
  class PanoramaMenuBackground extends MenuBackground {
    panoramaName: string;
    constructor(builder: MenuBackgroundBuilder<PanoramaMenuBackground>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface PanoramaMenuBackgroundBuilder extends MenuBackgroundBuilder<PanoramaMenuBackground> {}
  class PanoramaMenuBackgroundBuilder extends MenuBackgroundBuilder<PanoramaMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: PanoramaMenuBackground, backgroundConsumer: Consumer<PanoramaMenuBackground>): void;
    deserializeBackground(serializedMenuBackground: SerializedMenuBackground): PanoramaMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    serializedBackground(background: PanoramaMenuBackground): SerializedMenuBackground;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.slideshow' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface SlideshowMenuBackground extends MenuBackground {}
  class SlideshowMenuBackground extends MenuBackground {
    slideshowName: string;
    constructor(builder: MenuBackgroundBuilder<SlideshowMenuBackground>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface SlideshowMenuBackgroundBuilder extends MenuBackgroundBuilder<SlideshowMenuBackground> {}
  class SlideshowMenuBackgroundBuilder extends MenuBackgroundBuilder<SlideshowMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: SlideshowMenuBackground, backgroundConsumer: Consumer<SlideshowMenuBackground>): void;
    deserializeBackground(serializedMenuBackground: SerializedMenuBackground): SlideshowMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    serializedBackground(background: SlideshowMenuBackground): SerializedMenuBackground;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.video' {
  class IVideoMenuBackground {
    get duration(): number;
    get playTime(): number;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.backgrounds.video.mcef' {
  import { MenuBackground, MenuBackgroundBuilder, SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { IVideoMenuBackground } from 'de.keksuccino.fancymenu.customization.background.backgrounds.video';
  import { ResourceSource } from 'de.keksuccino.fancymenu.util.resource';
  import { SoundSource } from 'net.minecraft.sounds';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface MCEFVideoMenuBackground extends IVideoMenuBackground, MenuBackground {}
  class MCEFVideoMenuBackground extends IVideoMenuBackground {
    rawVideoUrlSource: ResourceSource;
    loop: boolean;
    volume: number;
    soundSource: SoundSource;
    parallaxEnabled: boolean;
    parallaxIntensityString: string;
    lastParallaxIntensity: number;
    invertParallax: boolean;
    constructor(builder: MenuBackgroundBuilder<MCEFVideoMenuBackground>);
    disposePlayer(): void;
    get controllerPausedState(): boolean;
    get controllerVolume(): number;
    get duration(): number;
    get playTime(): number;
    onAfterEnable(): void;
    onCloseScreen(closedScreen: Screen, newScreen: Screen): void;
    onCloseScreen(): void;
    onDisableOrRemove(): void;
    onOpenScreen(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetBackground(): void;
  }


  interface MCEFVideoMenuBackgroundBuilder extends MenuBackgroundBuilder<MCEFVideoMenuBackground> {}
  class MCEFVideoMenuBackgroundBuilder extends MenuBackgroundBuilder<MCEFVideoMenuBackground> {
    constructor();
    buildNewOrEditInstance(currentScreen: Screen, backgroundToEdit: MCEFVideoMenuBackground, backgroundConsumer: Consumer<MCEFVideoMenuBackground>): void;
    deserializeBackground(serialized: SerializedMenuBackground): MCEFVideoMenuBackground;
    get description(): Component[];
    get displayName(): Component;
    serializedBackground(background: MCEFVideoMenuBackground): SerializedMenuBackground;
  }


  interface MCEFVideoMenuBackgroundConfigScreen extends CellScreen {}
  class MCEFVideoMenuBackgroundConfigScreen extends CellScreen {
    allowDone(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.background' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { RuntimePropertyContainer, PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';
  import { NarrationPriority } from 'NarratableEntry';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface ChooseMenuBackgroundScreen extends Screen {}
  class ChooseMenuBackgroundScreen extends Screen {
    static readonly NO_BACKGROUND: MenuBackground;
    constructor(backgroundToEdit: MenuBackground, addResetBackgroundEntry: boolean, callback: Consumer<MenuBackground>);
    keyPressed(button: number, $$1: number, $$2: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface MenuBackground extends Renderable, GuiEventListener, NarratableEntry, NavigatableWidget {}
  class MenuBackground extends Renderable {
    readonly builder: MenuBackgroundBuilder;
    opacity: number;
    keepBackgroundAspectRatio: boolean;
    constructor(builder: MenuBackgroundBuilder<any>);
    copy(): MenuBackground;
    get instanceIdentifier(): string;
    get memory(): RuntimePropertyContainer;
    get parentLayout(): Layout;
    static get screenHeight(): number;
    static get screenWidth(): number;
    static isEditor(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isNavigatable(): boolean;
    narrationPriority(): NarrationPriority;
    onAfterEnable(): void;
    onAfterResizeScreen(): void;
    onBeforeResizeScreen(): void;
    onCloseScreen(closedScreen: Screen, newScreen: Screen): void;
    onCloseScreen(): void;
    onDisableOrRemove(): void;
    onOpenScreen(): void;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    setFocusable(focusable: boolean): void;
    setFocused(var1: boolean): void;
    setNavigatable(navigatable: boolean): void;
    tick(): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
  }


  class MenuBackgroundBuilder<T extends MenuBackground = any> {
    constructor(uniqueIdentifier: string);
    buildNewOrEditInstance(var1: Screen, var2: T, var3: Consumer<T>): void;
    buildNewOrEditInstanceInternal(currentScreen: Screen, backgroundToEdit: MenuBackground, backgroundConsumer: Consumer<MenuBackground>): void;
    deserializeBackground(var1: SerializedMenuBackground): T;
    deserializeBackgroundInternal(serializedMenuBackground: SerializedMenuBackground): T;
    get description(): Component[];
    get displayName(): Component;
    get identifier(): string;
    isDeprecated(): boolean;
    serializedBackground(var1: T): SerializedMenuBackground;
    serializedBackgroundInternal(background: MenuBackground): SerializedMenuBackground;
    shouldShowUpInEditorBackgroundMenu(editor: LayoutEditorScreen): boolean;
  }


  class MenuBackgroundRegistry {
    static get builders(): MenuBackgroundBuilder<any>[];
    static getBuilder(identifier: string): MenuBackgroundBuilder<any>;
    static register(builder: MenuBackgroundBuilder<any>): void;
  }


  interface SerializedMenuBackground extends PropertyContainer {}
  class SerializedMenuBackground extends PropertyContainer {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.customization.background.ChooseMenuBackgroundScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { MenuBackgroundBuilder } from 'de.keksuccino.fancymenu.customization.background';
  import { Supplier, Consumer } from 'java.util.function';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface BackgroundTypeScrollEntry extends TextListScrollAreaEntry {}
  class BackgroundTypeScrollEntry extends TextListScrollAreaEntry {
    backgroundType: MenuBackgroundBuilder;
    tooltipSupplier: Supplier;
    constructor(parent: ScrollArea, backgroundType: MenuBackgroundBuilder<any>, onClick: Consumer<TextListScrollAreaEntry>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.customgui' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { File } from 'java.io';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { Map, List } from 'java.util';
  import { Runnable } from 'java.lang';

  interface BuildCustomGuiScreen extends CellScreen {}
  class BuildCustomGuiScreen extends CellScreen {
    allowDone(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class CustomGui {
    static isCurrentlyRenderingPopupBackgroundScreen: boolean;
    identifier: string;
    title: string;
    allowEsc: boolean;
    worldBackground: boolean;
    worldBackgroundOverlay: boolean;
    pauseGame: boolean;
    popupMode: boolean;
    popupModeBackgroundOverlay: boolean;
    copy(): CustomGui;
    static deserialize(serialized: PropertyContainer): CustomGui;
    serialize(): PropertyContainer;
  }


  interface CustomGuiBaseScreen extends Screen {}
  class CustomGuiBaseScreen extends Screen {
    constructor(customGui: CustomGui, parentScreen: Screen, overrideScreen: Screen);
    get guiMetadata(): CustomGui;
    get identifier(): string;
    get overriddenScreen(): Screen;
    get parentScreen(): Screen;
    get titleString(): string;
    isPauseScreen(): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    shouldCloseOnEsc(): boolean;
  }


  class CustomGuiHandler {
    static readonly CUSTOM_GUIS_FILE: File;
    static addGui(gui: CustomGui): void;
    static beforeSetScreen(screen: Screen): Screen;
    static constructInstance(customGui: CustomGui, parentScreen: Screen, overrideScreen: Screen): CustomGuiBaseScreen;
    static constructInstance(identifier: string, parentScreen: Screen, overrideScreen: Screen): CustomGuiBaseScreen;
    static get guiIdentifiers(): string[];
    static get guis(): CustomGui[];
    static get overriddenScreens(): Map<string, string>;
    static getGui(identifier: string): CustomGui;
    static getGuiForOverriddenScreen(screen: Screen): CustomGui;
    static guiExists(identifier: string): boolean;
    static init(): void;
    onReloadFancyMenu(e: ModReloadEvent): void;
    static overrideScreenWithCustomGui(targetMenuIdentifier: string, customGuiIdentifier: string): void;
    static reload(): void;
    static removeGui(identifier: string): void;
    static removeScreenOverrideFor(menuIdentifier: string): void;
    static saveChanges(): void;
  }


  interface ManageCustomGuisScreen extends CellScreen {}
  class ManageCustomGuisScreen extends CellScreen {
    constructor(onClose: Runnable);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ManageOverriddenGuisScreen extends CellScreen {}
  class ManageOverriddenGuisScreen extends CellScreen {
    constructor(onClose: Runnable);
  }

}

declare module 'de.keksuccino.fancymenu.customization.customgui.ManageCustomGuisScreen' {
  import { LabelCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { ManageCustomGuisScreen, CustomGui } from 'de.keksuccino.fancymenu.customization.customgui';

  interface CustomGuiCell extends LabelCell {}
  class CustomGuiCell extends LabelCell {
    constructor(this$0: ManageCustomGuisScreen, gui: CustomGui);
  }

}

declare module 'de.keksuccino.fancymenu.customization.customlocals' {
  import { File } from 'java.io';

  class CustomLocalsHandler {
    static readonly CUSTOM_LOCALS_DIR: File;
    static loadLocalizations(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { ElementAnchorPoint } from 'de.keksuccino.fancymenu.customization.element.anchor';
  import { Integer } from 'java.lang';
  import { AppearanceDelay, Fading } from 'de.keksuccino.fancymenu.customization.element.AbstractElement';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { RuntimePropertyContainer, PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { NarrationPriority } from 'NarratableEntry';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { ResourceFile } from 'de.keksuccino.fancymenu.util.file';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';

  interface AbstractElement extends Renderable, GuiEventListener, NarratableEntry, NavigatableWidget {}
  class AbstractElement extends Renderable {
    static readonly EMPTY_ELEMENT: AbstractElement;
    static readonly STAY_ON_SCREEN_EDGE_ZONE_SIZE: number;
    readonly builder: ElementBuilder;
    anchorPoint: ElementAnchorPoint;
    posOffsetX: number;
    posOffsetY: number;
    baseWidth: number;
    baseHeight: number;
    advancedX: string;
    cachedAdvancedX: number;
    lastAdvancedXParse: number;
    advancedY: string;
    cachedAdvancedY: number;
    lastAdvancedYParse: number;
    advancedWidth: string;
    cachedAdvancedWidth: number;
    lastAdvancedWidthParse: number;
    advancedHeight: string;
    cachedAdvancedHeight: number;
    lastAdvancedHeightParse: number;
    stretchX: boolean;
    stretchY: boolean;
    stayOnScreen: boolean;
    visible: boolean;
    appearanceDelay: AppearanceDelay;
    appearanceDelayInSeconds: number;
    appearanceDelayEndTime: number;
    fadeIn: Fading;
    fadeOut: Fading;
    fadeInSpeed: number;
    fadeOutSpeed: number;
    shouldDoFadeInIfNeeded: boolean;
    fadeInStarted: boolean;
    fadeInFinished: boolean;
    shouldDoFadeOutIfNeeded: boolean;
    fadeOutStarted: boolean;
    fadeOutFinished: boolean;
    lastFadeInTick: number;
    lastFadeOutTick: number;
    opacity: number;
    baseOpacity: string;
    lastBaseOpacity: number;
    lastBaseOpacityParse: number;
    cachedBaseOpacity: number;
    becameVisible: boolean;
    becameInvisible: boolean;
    isNewMenu: boolean;
    fadeInElementJustCreated: boolean;
    fadeOutElementJustCreated: boolean;
    appearanceDelayElementJustCreated: boolean;
    lastTickAppearanceDelayed: boolean;
    autoSizing: boolean;
    autoSizingBaseScreenWidth: number;
    autoSizingBaseScreenHeight: number;
    autoSizingLastTickScreenWidth: number;
    autoSizingLastTickScreenHeight: number;
    autoSizingWidth: number;
    autoSizingHeight: number;
    stickyAnchor: boolean;
    animatedOffsetX: number;
    animatedOffsetY: number;
    customGuiScale: number;
    loadingRequirementContainer: LoadingRequirementContainer;
    customElementLayerName: string;
    enableParallax: boolean;
    invertParallax: boolean;
    parallaxIntensityString: string;
    lastParallaxIntensity: number;
    loadOncePerSession: boolean;
    inEditorColor: DrawableColor;
    layerHiddenInEditor: boolean;
    rotationDegrees: number;
    advancedRotationMode: boolean;
    advancedRotationDegrees: string;
    verticalTiltDegrees: number;
    horizontalTiltDegrees: number;
    advancedVerticalTiltMode: boolean;
    advancedVerticalTiltDegrees: string;
    advancedHorizontalTiltMode: boolean;
    advancedHorizontalTiltDegrees: string;
    constructor(builder: ElementBuilder<any, any>);
    _onOpenScreen(): void;
    afterConstruction(): void;
    applyAppearanceDelay(): void;
    static buildComponent(serializedComponentOrPlainText: string): Component;
    static fixBackslashPath(path: string): string;
    get absoluteHeight(): number;
    get absoluteWidth(): number;
    get absoluteX(): number;
    get absoluteY(): number;
    get anchorPointElementIdentifier(): string;
    get baseOpacity(): number;
    get childElementAnchorPointX(): number;
    get childElementAnchorPointY(): number;
    get displayName(): Component;
    get elementAnchorPointParent(): AbstractElement;
    get horizontalTiltDegrees(): number;
    get instanceIdentifier(): string;
    get memory(): RuntimePropertyContainer;
    get parentLayout(): Layout;
    get rotationDegrees(): number;
    static get screen(): Screen;
    static get screenHeight(): number;
    static get screenWidth(): number;
    get verticalTiltDegrees(): number;
    get widgetsToRegister(): GuiEventListener[];
    static getElementByInstanceIdentifier(identifier: string): AbstractElement;
    isAppearanceDelayed(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isNavigatable(): boolean;
    loadingRequirementsMet(): boolean;
    narrationPriority(): NarrationPriority;
    onBecomeInvisible(): void;
    onBecomeVisible(): void;
    onBeforeResizeScreen(): void;
    onCloseScreen(closedScreen: Screen, newScreen: Screen): void;
    onCloseScreen(): void;
    onDestroyElement(): void;
    onOpenScreen(): void;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    renderInternal(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderTick_Head(): void;
    renderTick_Inner_Stage_1(): void;
    renderTick_Inner_Stage_2(): void;
    renderTick_Tail(): void;
    resetToDefaultAnchor(): void;
    set anchorPointElementIdentifier(anchorPointElementIdentifier: string);
    set elementAnchorPointParent(element: AbstractElement);
    set instanceIdentifier(id: string);
    set parentLayout(parentLayout: Layout);
    setAutoSizingBaseWidthAndHeight(): void;
    setFocusable(focusable: boolean): void;
    setFocused(var1: boolean): void;
    setHideOncePerSessionElement(): void;
    setNavigatable(navigatable: boolean): void;
    shouldHideOncePerSessionElement(): boolean;
    shouldRender(): boolean;
    supportsRotation(): boolean;
    supportsTilting(): boolean;
    tick(): void;
    tickAppearanceDelay(shouldRender: boolean): void;
    tickBaseOpacity(): void;
    tickFadeInOut(shouldRender: boolean): void;
    tickVisibleInvisible(): void;
    updateAutoSizing(ignoreLastTickScreenSize: boolean): void;
    updateNarration(narrationElementOutput: NarrationElementOutput): void;
    updateOpacity(): void;
  }


  class ElementBuilder<E extends AbstractElement = any, L extends AbstractEditorElement = any> {
    constructor(uniqueElementIdentifier: string);
    buildDefaultInstance(): E;
    static deserializeAudioResourceSupplier(resourceSource: string): ResourceSupplier<IAudio>;
    deserializeElement(var1: SerializedElement): E;
    deserializeElementInternal(serialized: SerializedElement): E;
    static deserializeImageResourceSupplier(resourceSource: string): ResourceSupplier<ITexture>;
    static deserializeResourceFile(gameDirectoryFilePath: string): ResourceFile;
    static deserializeTextResourceSupplier(resourceSource: string): ResourceSupplier<IText>;
    static deserializeVideoResourceSupplier(resourceSource: string): ResourceSupplier<IVideo>;
    get identifier(): string;
    getDescription(var1: AbstractElement): Component[];
    getDisplayName(var1: AbstractElement): Component;
    isDeprecated(): boolean;
    serializeElementInternal(element: AbstractElement): SerializedElement;
    shouldShowUpInEditorElementMenu(editor: LayoutEditorScreen): boolean;
    wrapIntoEditorElement(var1: E, var2: LayoutEditorScreen): L;
    wrapIntoEditorElementInternal(element: AbstractElement, editor: LayoutEditorScreen): L;
  }


  class ElementMemories {
    static clearMemories(): void;
    static getMemory(elementInstanceIdentifier: string): RuntimePropertyContainer;
    static init(): void;
    onReloadMod(e: ModReloadEvent): void;
  }


  class ElementRegistry {
    static get builders(): ElementBuilder<any, any>[];
    static getBuilder(identifier: string): ElementBuilder<any, any>;
    static hasBuilder(identifier: string): boolean;
    static register(builder: ElementBuilder<any, any>): void;
  }


  class ElementStacker<E extends AbstractElement = any> {
    stackElements(var1: E, var2: E): void;
    stackElementsInternal(stack: AbstractElement, ...elements: AbstractElement[]): E;
    stackElementsSingleInternal(e: AbstractElement, stack: AbstractElement): void;
  }


  class ExecutableElement {
    get executableBlock(): GenericExecutableBlock;
  }


  class HideableElement {
    isHidden(): boolean;
    setHidden(var1: boolean): void;
  }


  interface SerializedElement extends PropertyContainer {}
  class SerializedElement extends PropertyContainer {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.AbstractElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AppearanceDelay extends Enum<AppearanceDelay> {}
  class AppearanceDelay extends Enum<AppearanceDelay> {
    static readonly NO_DELAY: AppearanceDelay;
    static readonly FIRST_TIME: AppearanceDelay;
    static readonly EVERY_TIME: AppearanceDelay;
    static getByName(name: string): AppearanceDelay;
    static valueOf(name: string): AppearanceDelay;
    static values(): AppearanceDelay[];
  }


  interface Fading extends Enum<Fading> {}
  class Fading extends Enum<Fading> {
    static readonly NO_FADING: Fading;
    static readonly FIRST_TIME: Fading;
    static readonly EVERY_TIME: Fading;
    get name(): string;
    static getByName(name: string): Fading;
    static valueOf(name: string): Fading;
    static values(): Fading[];
  }


  interface Alignment extends Enum<Alignment> {}
  class Alignment extends Enum<Alignment> {
    static readonly LEFT: Alignment;
    static readonly RIGHT: Alignment;
    static readonly CENTERED: Alignment;
    static getByName(name: string): Alignment;
    static valueOf(name: string): Alignment;
    static values(): Alignment[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.anchor' {
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractElement } from 'de.keksuccino.fancymenu.customization.element';
  import { ResizeGrabberType } from 'de.keksuccino.fancymenu.customization.element.editor.AbstractEditorElement';
  import { List } from 'java.util';

  class ElementAnchorPoint {
    constructor(name: string);
    get displayName(): Component;
    get name(): string;
    getElementPositionX(element: AbstractElement): number;
    getElementPositionY(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
    getResizePositionOffsetX(element: AbstractElement, mouseTravelX: number, resizeGrabberType: ResizeGrabberType): number;
    getResizePositionOffsetY(element: AbstractElement, mouseTravelY: number, resizeGrabberType: ResizeGrabberType): number;
    getStickyResizePositionCorrectionX(element: AbstractElement, mouseTravelX: number, oldOffsetX: number, newOffsetX: number, oldPosX: number, newPosX: number, oldWidth: number, newWidth: number, resizeGrabberType: ResizeGrabberType): number;
    getStickyResizePositionCorrectionY(element: AbstractElement, mouseTravelY: number, oldOffsetY: number, newOffsetY: number, oldPosY: number, newPosY: number, oldHeight: number, newHeight: number, resizeGrabberType: ResizeGrabberType): number;
  }


  class ElementAnchorPoints {
    static readonly ELEMENT: ElementAnchorPoint;
    static readonly VANILLA: ElementAnchorPoint;
    static readonly TOP_LEFT: ElementAnchorPoint;
    static readonly MID_LEFT: ElementAnchorPoint;
    static readonly BOTTOM_LEFT: ElementAnchorPoint;
    static readonly TOP_CENTERED: ElementAnchorPoint;
    static readonly MID_CENTERED: ElementAnchorPoint;
    static readonly BOTTOM_CENTERED: ElementAnchorPoint;
    static readonly TOP_RIGHT: ElementAnchorPoint;
    static readonly MID_RIGHT: ElementAnchorPoint;
    static readonly BOTTOM_RIGHT: ElementAnchorPoint;
    static get anchorPoints(): ElementAnchorPoint[];
    static getAnchorPointByName(name: string): ElementAnchorPoint;
    static registerAnchorPoint(anchorPoint: ElementAnchorPoint): ElementAnchorPoint;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.anchor.ElementAnchorPoint' {
  import { ElementAnchorPoint } from 'de.keksuccino.fancymenu.customization.element.anchor';
  import { AbstractElement } from 'de.keksuccino.fancymenu.customization.element';

  interface AnchorElement extends ElementAnchorPoint {}
  class AnchorElement extends ElementAnchorPoint {
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorVanilla extends ElementAnchorPoint {}
  class AnchorVanilla extends ElementAnchorPoint {
  }


  interface AnchorBottomRight extends ElementAnchorPoint {}
  class AnchorBottomRight extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getElementPositionY(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorMidRight extends ElementAnchorPoint {}
  class AnchorMidRight extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getElementPositionY(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorTopRight extends ElementAnchorPoint {}
  class AnchorTopRight extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
  }


  interface AnchorBottomCenter extends ElementAnchorPoint {}
  class AnchorBottomCenter extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getElementPositionY(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorMidCenter extends ElementAnchorPoint {}
  class AnchorMidCenter extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getElementPositionY(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorTopCenter extends ElementAnchorPoint {}
  class AnchorTopCenter extends ElementAnchorPoint {
    getElementPositionX(element: AbstractElement): number;
    getOriginX(element: AbstractElement): number;
  }


  interface AnchorBottomLeft extends ElementAnchorPoint {}
  class AnchorBottomLeft extends ElementAnchorPoint {
    getElementPositionY(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorMidLeft extends ElementAnchorPoint {}
  class AnchorMidLeft extends ElementAnchorPoint {
    getElementPositionY(element: AbstractElement): number;
    getOriginY(element: AbstractElement): number;
  }


  interface AnchorTopLeft extends ElementAnchorPoint {}
  class AnchorTopLeft extends ElementAnchorPoint {
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.editor' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { AbstractElement } from 'de.keksuccino.fancymenu.customization.element';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { List } from 'java.util';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ElementAnchorPoint } from 'de.keksuccino.fancymenu.customization.element.anchor';
  import { AnchorPointArea } from 'de.keksuccino.fancymenu.customization.layout.editor.AnchorPointOverlay';
  import { ResizeGrabber, RotationGrabber, VerticalTiltGrabber, HorizontalTiltGrabber } from 'de.keksuccino.fancymenu.customization.element.editor.AbstractEditorElement';
  import { DisplayPosition } from 'de.keksuccino.fancymenu.customization.element.editor.EditorElementBorderDisplay';
  import { Supplier } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface AbstractEditorElement extends Renderable, GuiEventListener {}
  class AbstractEditorElement extends Renderable {
    element: AbstractElement;
    readonly settings: EditorElementSettings;
    rightClickMenu: ContextMenu;
    topLeftDisplay: EditorElementBorderDisplay;
    bottomRightDisplay: EditorElementBorderDisplay;
    editor: LayoutEditorScreen;
    renderMovingNotAllowedTime: number;
    recentlyMovedByDragging: boolean;
    recentlyLeftClickSelected: boolean;
    recentlyResized: boolean;
    movingCrumpleZonePassed: boolean;
    constructor(element: AbstractElement, editor: LayoutEditorScreen, settings: EditorElementSettings);

    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    deleteElement(): boolean;
    get height(): number;
    get hoveredHorizontalTiltGrabber(): HorizontalTiltGrabber;
    get hoveredResizeGrabber(): ResizeGrabber;
    get hoveredRotationGrabber(): RotationGrabber;
    get hoveredVerticalTiltGrabber(): VerticalTiltGrabber;
    get width(): number;
    get x(): number;
    get y(): number;
    init(): void;
    isDragged(): boolean;
    isElementAnchorAndParentIsSelected(): boolean;
    isFocused(): boolean;
    isGettingHorizontalTilted(): boolean;
    isGettingResized(): boolean;
    isGettingRotated(): boolean;
    isGettingTilted(): boolean;
    isGettingVerticalTilted(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isMultiSelected(): boolean;
    isPressed(): boolean;
    isSelected(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    onSettingsChanged(): void;
    openMenuAt(x: number, y: number, entryPath: string[]): ContextMenu;
    openMenuAt(x: number, y: number): ContextMenu;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetElementStates(): void;
    setAnchorPoint(newAnchor: ElementAnchorPoint, resetElementStates: boolean): void;
    setAnchorPoint(newAnchor: ElementAnchorPoint, oldAbsX: number, oldAbsY: number, resetElementStates: boolean): void;
    setAnchorPointViaOverlay(anchor: AnchorPointArea, mouseX: number, mouseY: number): void;
    setFocused(var1: boolean): void;
    setMultiSelected(multiSelected: boolean): void;
    setSelected(selected: boolean): void;
    updateLeftMouseDownCachedValues(mouseX: number, mouseY: number): void;
    updateMovingStartPos(mouseX: number, mouseY: number): void;
    updateResizingStartPos(mouseX: number, mouseY: number): void;
  }


  interface EditorElementBorderDisplay extends Renderable {}
  class EditorElementBorderDisplay extends Renderable {
    readonly editorElement: AbstractEditorElement;
    font: Font;
    readonly defaultPosition: DisplayPosition;
    readonly alternativePositions: List;
    currentPosition: DisplayPosition;
    constructor(editorElement: AbstractEditorElement, defaultPosition: DisplayPosition, ...alternativePositions: DisplayPosition[]);
    addLine(identifier: string, lineSupplier: Supplier<Component>): void;
    clearLines(): void;
    get height(): number;
    get width(): number;
    hasLine(identifier: string): boolean;
    removeLine(identifier: string): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class EditorElementSettings {
    isAdvancedPositioningSupported(): boolean;
    isAdvancedSizingSupported(): boolean;
    isAnchorPointChangeable(): boolean;
    isAutoSizingAllowed(): boolean;
    isCopyable(): boolean;
    isDelayable(): boolean;
    isDestroyable(): boolean;
    isElementAnchorPointAllowed(): boolean;
    isFadeable(): boolean;
    isIdentifierCopyable(): boolean;
    isInEditorColorSupported(): boolean;
    isLoadingRequirementsEnabled(): boolean;
    isMovable(): boolean;
    isOpacityChangeable(): boolean;
    isOrderable(): boolean;
    isParallaxAllowed(): boolean;
    isResizeable(): boolean;
    isResizeableX(): boolean;
    isResizeableY(): boolean;
    isStayOnScreenAllowed(): boolean;
    isStickyAnchorAllowed(): boolean;
    isStretchable(): boolean;
    isVanillaAnchorPointAllowed(): boolean;
    setAdvancedPositioningSupported(supported: boolean): void;
    setAdvancedSizingSupported(supported: boolean): void;
    setAnchorPointChangeable(changeable: boolean): void;
    setAutoSizingAllowed(autoSizingAllowed: boolean): void;
    setCopyable(copyable: boolean): void;
    setDelayable(delayable: boolean): void;
    setDestroyable(destroyable: boolean): void;
    setElementAnchorPointAllowed(allow: boolean): void;
    setFadeable(fadeable: boolean): void;
    setHideInsteadOfDestroy(hideInsteadOfDestroy: boolean): void;
    setIdentifierCopyable(copyable: boolean): void;
    setInEditorColorSupported(inEditorColorSupported: boolean): void;
    setLoadingRequirementsEnabled(enabled: boolean): void;
    setMovable(movable: boolean): void;
    setOpacityChangeable(changeable: boolean): void;
    setOrderable(orderable: boolean): void;
    setParallaxAllowed(parallaxAllowed: boolean): void;
    setResizeable(resizeable: boolean): void;
    setResizeableX(resizeableX: boolean): void;
    setResizeableY(resizeableY: boolean): void;
    setSkipReInitAfterSettingsChanged(skip: boolean): void;
    setStayOnScreenAllowed(stayOnScreenAllowed: boolean): void;
    setStickyAnchorAllowed(stickyAnchorAllowed: boolean): void;
    setStretchable(stretchable: boolean): void;
    setVanillaAnchorPointAllowed(allow: boolean): void;
    settingsChanged(): void;
    shouldHideInsteadOfDestroy(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.editor.AbstractEditorElement' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ResizeGrabber extends Renderable {}
  class ResizeGrabber extends Renderable {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ResizeGrabberType extends Enum<ResizeGrabberType> {}
  class ResizeGrabberType extends Enum<ResizeGrabberType> {
    static readonly TOP: ResizeGrabberType;
    static readonly RIGHT: ResizeGrabberType;
    static readonly BOTTOM: ResizeGrabberType;
    static readonly LEFT: ResizeGrabberType;
    static valueOf(name: string): ResizeGrabberType;
    static values(): ResizeGrabberType[];
  }


  interface RotationGrabber extends Renderable {}
  class RotationGrabber extends Renderable {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface VerticalTiltGrabber extends Renderable {}
  class VerticalTiltGrabber extends Renderable {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface HorizontalTiltGrabber extends Renderable {}
  class HorizontalTiltGrabber extends Renderable {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.editor.EditorElementBorderDisplay' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DisplayPosition extends Enum<DisplayPosition> {}
  class DisplayPosition extends Enum<DisplayPosition> {
    static readonly TOP_LEFT: DisplayPosition;
    static readonly TOP_RIGHT: DisplayPosition;
    static readonly RIGHT_TOP: DisplayPosition;
    static readonly RIGHT_BOTTOM: DisplayPosition;
    static readonly BOTTOM_LEFT: DisplayPosition;
    static readonly BOTTOM_RIGHT: DisplayPosition;
    static readonly LEFT_TOP: DisplayPosition;
    static readonly LEFT_BOTTOM: DisplayPosition;
    static valueOf(name: string): DisplayPosition;
    static values(): DisplayPosition[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { AnimationControllerState } from 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.AnimationControllerStateController';
  import { Cloneable } from 'java.lang';
  import { ElementAnchorPoint } from 'de.keksuccino.fancymenu.customization.element.anchor';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer, Predicate } from 'java.util.function';
  import { AnimationControllerMetadata } from 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.KeyframeManagerScreen';
  import { TargetElement } from 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.AnimationControllerElement';

  interface AnimationControllerEditorElement extends AbstractEditorElement {}
  class AnimationControllerEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
  }


  interface AnimationControllerElement extends AbstractElement {}
  class AnimationControllerElement extends AbstractElement {
    keyframes: List;
    targetElements: List;
    loop: boolean;
    offsetMode: boolean;
    ignoreSize: boolean;
    ignorePosition: boolean;
    constructor(builder: ElementBuilder<any, any>);
    get keyframes(): AnimationKeyframe[];
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface AnimationControllerElementBuilder extends ElementBuilder<AnimationControllerElement, AnimationControllerEditorElement> {}
  class AnimationControllerElementBuilder extends ElementBuilder<AnimationControllerElement, AnimationControllerEditorElement> {
    constructor();
    buildDefaultInstance(): AnimationControllerElement;
    deserializeElement(serialized: SerializedElement): AnimationControllerElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: AnimationControllerElement, editor: LayoutEditorScreen): AnimationControllerEditorElement;
  }


  class AnimationControllerHandler {
    static applyAnimation(controller: AnimationControllerElement, targetElement: AbstractElement): boolean;
    static clearMemory(): void;
    static isAnimating(targetElementId: string): boolean;
    static isFinished(targetElementId: string): boolean;
    static resetAnimationState(targetElementId: string): void;
    static resetController(controller: AnimationControllerElement): void;
    static stopAllAnimations(): void;
    static stopAnimation(targetElementId: string): void;
    static tick(): void;
    static wasAnimatedInThePast(targetElementId: string): boolean;
  }


  class AnimationControllerStateController {
    static readonly STATES_FILE: File;
    static getState(elementIdentifier: string): AnimationControllerState;
    static hasStateFor(elementIdentifier: string): boolean;
    static isPlaying(elementIdentifier: string): boolean;
    static putState(elementIdentifier: string, state: AnimationControllerState): void;
    static setPlaying(elementIdentifier: string, playing: boolean): boolean;
    static syncChanges(): void;
    static togglePlaying(elementIdentifier: string): boolean;
  }


  interface AnimationKeyframe extends Cloneable {}
  class AnimationKeyframe extends Cloneable {
    timestamp: number;
    posOffsetX: number;
    posOffsetY: number;
    baseWidth: number;
    baseHeight: number;
    anchorPoint: ElementAnchorPoint;
    stickyAnchor: boolean;
    uniqueIdentifier: string;
    constructor();

    constructor(timestamp: number, posOffsetX: number, posOffsetY: number, baseWidth: number, baseHeight: number, anchorPoint: ElementAnchorPoint, stickyAnchor: boolean);
    toString(): string;
  }


  interface ElementSelectorScreen extends CellScreen {}
  class ElementSelectorScreen extends CellScreen {
    constructor(layoutEditor: LayoutEditorScreen, parent: Screen, elementIds: string[], callback: Consumer<AbstractEditorElement>);

    constructor(layoutEditor: LayoutEditorScreen, parent: Screen, elementIds: string[], callback: Consumer<AbstractEditorElement>, filter: Predicate<AbstractEditorElement>);
    allowDone(): boolean;
  }


  interface KeyframeManagerScreen extends Screen {}
  class KeyframeManagerScreen extends Screen {
    constructor(controller: AnimationControllerElement, resultCallback: Consumer<AnimationControllerMetadata>);
    displayNotification(message: Component, durationMs: number): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    shouldCloseOnEsc(): boolean;
  }


  interface TargetElementManagerScreen extends CellScreen {}
  class TargetElementManagerScreen extends CellScreen {
    constructor(editorElement: AnimationControllerEditorElement, callback: Consumer<TargetElement[]>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.AnimationControllerElement' {
  class TargetElement {
    targetElementId: string;
    animationApplied: boolean;
    constructor();

    constructor(targetElementId: string);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.AnimationControllerStateController' {
  class AnimationControllerState {
    element_identifier: string;
    playing: boolean;
    constructor(element_identifier: string, playing: boolean);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller.ElementSelectorScreen' {
  import { LabelCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { ElementSelectorScreen } from 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';

  interface ElementCell extends LabelCell {}
  class ElementCell extends LabelCell {
    constructor(this$0: ElementSelectorScreen, element: AbstractEditorElement);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.audio' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { List } from 'java.util';
  import { AudioInstance, PlayMode } from 'de.keksuccino.fancymenu.customization.element.elements.audio.AudioElement';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { SoundSource } from 'net.minecraft.sounds';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Pre } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';
  import { InitOrResizeScreenStartingEvent, InitOrResizeScreenCompletedEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { AudioElementMeta } from 'de.keksuccino.fancymenu.customization.element.elements.audio.AudioElementController';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface AudioEditorElement extends AbstractEditorElement {}
  class AudioEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): AudioElement;
    init(): void;
  }


  interface AudioElement extends AbstractElement {}
  class AudioElement extends AbstractElement {
    audios: List;
    currentAudioIndex: number;
    currentAudioInstance: AudioInstance;
    currentAudio: IAudio;
    constructor(builder: ElementBuilder<any, any>);
    afterConstruction(): void;
    clearCacheForElement(): void;
    get controllerVolume(): number;
    get playMode(): PlayMode;
    get soundSource(): SoundSource;
    get volume(): number;
    goToNextAudio(): void;
    goToPreviousAudio(): void;
    isLooping(): boolean;
    pickNextAudio(ignorePaused: boolean): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderTick(): void;
    renderTick_Inner_Stage_1(): void;
    resetAudioElementKeepAudios(): void;
    set controllerVolume(volume: number);
    set soundSource(soundSource: SoundSource);
    set volume(volume: number);
    setLooping(loop: boolean, resetElement: boolean): void;
    setPlayMode(mode: PlayMode, resetElement: boolean): void;
    skipToNextAudio(forceRestartIfEndReached: boolean): void;
    updateVolume(): void;
  }


  interface AudioElementBuilder extends ElementBuilder<AudioElement, AudioEditorElement> {}
  class AudioElementBuilder extends ElementBuilder<AudioElement, AudioEditorElement> {
    constructor();
    buildDefaultInstance(): AudioElement;
    deserializeElement(serialized: SerializedElement): AudioElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    onClientTickPre(e: Pre): void;
    onInitOrResizeScreenCompleted(e: InitOrResizeScreenCompletedEvent): void;
    onInitOrResizeStarting(e: InitOrResizeScreenStartingEvent): void;
    onModReload(e: ModReloadEvent): void;
    static stopAllActiveAudios(): void;
    wrapIntoEditorElement(element: AudioElement, editor: LayoutEditorScreen): AudioEditorElement;
  }


  class AudioElementController {
    static readonly METAS_FILE: File;
    static getMeta(elementIdentifier: string): AudioElementMeta;
    static hasMetaFor(elementIdentifier: string): boolean;
    static putMeta(elementIdentifier: string, meta: AudioElementMeta): void;
    static syncChanges(): void;
  }


  interface ManageAudiosScreen extends CellScreen {}
  class ManageAudiosScreen extends CellScreen {
  }


  interface SetAudioVolumeScreen extends CellScreen {}
  class SetAudioVolumeScreen extends CellScreen {
  }


  interface SetAudioWeightScreen extends CellScreen {}
  class SetAudioWeightScreen extends CellScreen {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.audio.AudioElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  interface PlayMode extends Enum<PlayMode> {}
  class PlayMode extends Enum<PlayMode> {
    static readonly NORMAL: PlayMode;
    static readonly SHUFFLE: PlayMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): PlayMode[];
    static getByName(name: string): PlayMode;
    getByNameInternal(name: string): PlayMode;
    static valueOf(name: string): PlayMode;
    static values(): PlayMode[];
  }


  class AudioInstance {
    supplier: ResourceSupplier;
    constructor(supplier: ResourceSupplier<IAudio>);

    constructor(supplier: ResourceSupplier<IAudio>, weight: number);
    static deserializeAllOfContainer(container: PropertyContainer): AudioInstance[];
    static serializeAllToExistingContainer(instances: AudioInstance[], container: PropertyContainer): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.audio.AudioElementController' {
  class AudioElementMeta {
    element_identifier: string;
    volume: number;
    constructor(element_identifier: string, volume: number);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.browser' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { WrappedMCEFBrowser } from 'de.keksuccino.fancymenu.util.mcef';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface BrowserEditorElement extends AbstractEditorElement {}
  class BrowserEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): BrowserElement;
    init(): void;
  }


  interface BrowserElement extends AbstractElement {}
  class BrowserElement extends AbstractElement {
    url: string;
    interactable: boolean;
    hideVideoControls: boolean;
    loopVideos: boolean;
    muteMedia: boolean;
    mediaVolume: number;
    browser: WrappedMCEFBrowser;
    lastTickWidth: number;
    lastTickHeight: number;
    lastLeftClickTime: number;
    constructor(builder: ElementBuilder<any, any>);
    afterConstruction(): void;
    get lastTickUrl(): string;
    get widgetsToRegister(): GuiEventListener[];
    onCloseScreen(closedScreen: Screen, newScreen: Screen): void;
    onCloseScreen(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set lastTickUrl(url: string);
  }


  interface BrowserElementBuilder extends ElementBuilder<BrowserElement, BrowserEditorElement> {}
  class BrowserElementBuilder extends ElementBuilder<BrowserElement, BrowserEditorElement> {
    constructor();
    buildDefaultInstance(): BrowserElement;
    deserializeElement(serialized: SerializedElement): BrowserElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: BrowserElement, editor: LayoutEditorScreen): BrowserEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ExecutableElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { TemplateSharing } from 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton.ButtonElement';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';

  interface ButtonEditorElement extends AbstractEditorElement {}
  class ButtonEditorElement extends AbstractEditorElement {
    showTemplateOptions: boolean;
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
  }


  interface ButtonElement extends ExecutableElement, AbstractElement {}
  class ButtonElement extends ExecutableElement {
    clickSound: ResourceSupplier;
    hoverSound: ResourceSupplier;
    label: string;
    hoverLabel: string;
    tooltip: string;
    backgroundTextureNormal: ResourceSupplier;
    backgroundTextureHover: ResourceSupplier;
    backgroundTextureInactive: ResourceSupplier;
    restartBackgroundAnimationsOnHover: boolean;
    nineSliceCustomBackground: boolean;
    nineSliceBorderX: number;
    nineSliceBorderY: number;
    navigatable: boolean;
    actionExecutor: GenericExecutableBlock;
    activeStateSupplier: LoadingRequirementContainer;
    isTemplate: boolean;
    templateApplyWidth: boolean;
    templateApplyHeight: boolean;
    templateApplyPosX: boolean;
    templateApplyPosY: boolean;
    templateApplyOpacity: boolean;
    templateApplyVisibility: boolean;
    templateApplyLabel: boolean;
    templateShareWith: TemplateSharing;
    sliderBackgroundTextureNormal: ResourceSupplier;
    sliderBackgroundTextureHighlighted: ResourceSupplier;
    nineSliceSliderHandle: boolean;
    nineSliceSliderHandleBorderX: number;
    nineSliceSliderHandleBorderY: number;
    constructor(builder: ElementBuilder<ButtonElement, ButtonEditorElement>);
    afterConstruction(): void;
    get absoluteHeight(): number;
    get absoluteWidth(): number;
    get absoluteX(): number;
    get absoluteY(): number;
    get executableBlock(): GenericExecutableBlock;
    get hoverLabel(): string;
    get label(): string;
    get opacity(): number;
    get propertySource(): ButtonElement;
    get widget(): AbstractWidget;
    get widgetsToRegister(): GuiEventListener[];
    static getTopActiveTemplateElement(forSlider: boolean): ButtonElement;
    isButton(): boolean;
    isSlider(): boolean;
    isTemplateActive(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static resetTemplateCache(): void;
    set widget(widget: AbstractWidget);
    shouldRender(): boolean;
    tick(): void;
    tickVisibleInvisible(): void;
    updateWidget(): void;
    updateWidgetActiveState(): void;
    updateWidgetAlpha(): void;
    updateWidgetClickSound(): void;
    updateWidgetHoverSound(): void;
    updateWidgetLabels(): void;
    updateWidgetNavigatable(): void;
    updateWidgetPosition(): void;
    updateWidgetSize(): void;
    updateWidgetTexture(): void;
    updateWidgetTooltip(): void;
    updateWidgetVisibility(): void;
  }


  interface ButtonElementBuilder extends ElementBuilder<ButtonElement, ButtonEditorElement> {}
  class ButtonElementBuilder extends ElementBuilder<ButtonElement, ButtonEditorElement> {
    constructor();
    buildDefaultInstance(): ButtonElement;
    deserializeElement(serialized: SerializedElement): ButtonElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: ButtonElement, editor: LayoutEditorScreen): ButtonEditorElement;
  }


  class WidgetTemplate {
    get templateShareWith(): TemplateSharing;
    isTemplate(): boolean;
    isTemplateApplyHeight(): boolean;
    isTemplateApplyLabel(): boolean;
    isTemplateApplyOpacity(): boolean;
    isTemplateApplyPosX(): boolean;
    isTemplateApplyPosY(): boolean;
    isTemplateApplyVisibility(): boolean;
    isTemplateApplyWidth(): boolean;
    set templateShareWith(var1: TemplateSharing);
    setIsTemplate(var1: boolean): void;
    setTemplateApplyHeight(var1: boolean): void;
    setTemplateApplyLabel(var1: boolean): void;
    setTemplateApplyOpacity(var1: boolean): void;
    setTemplateApplyPosX(var1: boolean): void;
    setTemplateApplyPosY(var1: boolean): void;
    setTemplateApplyVisibility(var1: boolean): void;
    setTemplateApplyWidth(var1: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton.ButtonElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface TemplateSharing extends Enum<TemplateSharing> {}
  class TemplateSharing extends Enum<TemplateSharing> {
    static readonly BUTTONS: TemplateSharing;
    static readonly SLIDERS: TemplateSharing;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): TemplateSharing[];
    static getByName(name: string): TemplateSharing;
    getByNameInternal(name: string): TemplateSharing;
    static valueOf(name: string): TemplateSharing;
    static values(): TemplateSharing[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.button.vanillawidget' {
  import { ButtonEditorElement, ButtonElement, ButtonElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton';
  import { HideableElement, AbstractElement, ElementBuilder, ElementStacker, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { AnchorPointArea } from 'de.keksuccino.fancymenu.customization.layout.editor.AnchorPointOverlay';
  import { WidgetMeta } from 'de.keksuccino.fancymenu.customization.widget';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';

  interface VanillaWidgetEditorElement extends HideableElement, ButtonEditorElement {}
  class VanillaWidgetEditorElement extends HideableElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): VanillaWidgetElement;
    init(): void;
    isCopyrightButton(): boolean;
    isHidden(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, $$3: number, $$4: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    setAnchorPointViaOverlay(anchor: AnchorPointArea, mouseX: number, mouseY: number): void;
    setHidden(hidden: boolean): void;
    setSelected(selected: boolean): void;
  }


  interface VanillaWidgetElement extends HideableElement, ButtonElement {}
  class VanillaWidgetElement extends HideableElement {
    widgetMeta: WidgetMeta;
    vanillaButtonHidden: boolean;
    automatedButtonClicks: number;
    constructor(builder: ElementBuilder<ButtonElement, ButtonEditorElement>);
    get baseOpacity(): number;
    get instanceIdentifier(): string;
    get widgetsToRegister(): GuiEventListener[];
    isCopyrightButton(): boolean;
    isHidden(): boolean;
    mirrorVanillaWidgetPosition(): void;
    mirrorVanillaWidgetSize(): void;
    mirrorVanillaWidgetSizeAndPosition(): void;
    resetVanillaWidgetSizeAndPosition(): void;
    setHidden(hidden: boolean): void;
    setVanillaWidget(data: WidgetMeta, mirrorWidgetSizeAndPos: boolean): void;
    tick(): void;
    updateWidgetActiveState(): void;
    updateWidgetLabels(): void;
    updateWidgetNavigatable(): void;
    updateWidgetPosition(): void;
    updateWidgetSize(): void;
    updateWidgetVisibility(): void;
  }


  interface VanillaWidgetElementBuilder extends ElementStacker<VanillaWidgetElement>, ButtonElementBuilder {}
  class VanillaWidgetElementBuilder extends ElementStacker<VanillaWidgetElement> {
    static readonly INSTANCE: VanillaWidgetElementBuilder;
    buildDefaultInstance(): VanillaWidgetElement;
    deserializeElement(serialized: SerializedElement): VanillaWidgetElement;
    deserializeElementInternal(serialized: SerializedElement): VanillaWidgetElement;
    get identifier(): string;
    getDescription(element: AbstractElement): Component[];
    serializeElementInternal(elementAbstract: AbstractElement): SerializedElement;
    stackElements(e: VanillaWidgetElement, stack: VanillaWidgetElement): void;
    stackElementsInternal(stack: AbstractElement, ...elements: AbstractElement[]): VanillaWidgetElement;
    stackElementsSingleInternal(e: AbstractElement, stack: AbstractElement): void;
    wrapIntoEditorElement(element: ButtonElement, editor: LayoutEditorScreen): VanillaWidgetEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.checkbox' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ExecutableElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';

  interface CheckboxEditorElement extends AbstractEditorElement {}
  class CheckboxEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
  }


  interface CheckboxElement extends ExecutableElement, AbstractElement {}
  class CheckboxElement extends ExecutableElement {
    tooltip: string;
    checkmarkTexture: ResourceSupplier;
    backgroundTextureNormal: ResourceSupplier;
    backgroundTextureHover: ResourceSupplier;
    backgroundTextureInactive: ResourceSupplier;
    hoverSound: ResourceSupplier;
    clickSound: ResourceSupplier;
    navigatable: boolean;
    actionExecutor: GenericExecutableBlock;
    activeStateSupplier: LoadingRequirementContainer;
    constructor(builder: ElementBuilder<any, any>);
    afterConstruction(): void;
    get executableBlock(): GenericExecutableBlock;
    get widgetsToRegister(): GuiEventListener[];
    prepareExecutableBlock(): void;
    prepareLoadingRequirementContainer(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface CheckboxElementBuilder extends ElementBuilder<CheckboxElement, CheckboxEditorElement> {}
  class CheckboxElementBuilder extends ElementBuilder<CheckboxElement, CheckboxEditorElement> {
    constructor();
    buildDefaultInstance(): CheckboxElement;
    deserializeElement(serialized: SerializedElement): CheckboxElement;
    deserializeElementInternal(serialized: SerializedElement): CheckboxElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: CheckboxElement, editor: LayoutEditorScreen): CheckboxEditorElement;
  }


  class CheckboxStatesHandler {
    static getForCheckboxElement(element: CheckboxElement): boolean;
    static setForCheckboxElement(element: CheckboxElement, state: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.cursor' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface CursorEditorElement extends AbstractEditorElement {}
  class CursorEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): CursorElement;
    init(consumes: E, cursorEditorElement: E, iTextureResourceSupplier: ResourceSupplier<R>): void;
    init(): void;
  }


  interface CursorElement extends AbstractElement {}
  class CursorElement extends AbstractElement {
    hotspotX: number;
    hotspotY: number;
    editorPreviewMode: boolean;
    textureSupplier: ResourceSupplier;
    constructor(builder: ElementBuilder<any, any>);
    forceRebuildCursor(): void;
    get cursorName(): string;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    updateCursor(): void;
  }


  interface CursorElementBuilder extends ElementBuilder<CursorElement, CursorEditorElement> {}
  class CursorElementBuilder extends ElementBuilder<CursorElement, CursorEditorElement> {
    constructor();
    buildDefaultInstance(): CursorElement;
    deserializeElement(serialized: SerializedElement): CursorElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: CursorElement, editor: LayoutEditorScreen): CursorEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.dragger' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { DraggerMeta } from 'de.keksuccino.fancymenu.customization.element.elements.dragger.DraggerElementHandler';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { DraggingCallback, MouseCallback } from 'de.keksuccino.fancymenu.customization.element.elements.dragger.DraggerWidget';
  import { SoundManager } from 'net.minecraft.client.sounds';

  interface DraggerEditorElement extends AbstractEditorElement {}
  class DraggerEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): DraggerElement;
    init(): void;
  }


  interface DraggerElement extends AbstractElement {}
  class DraggerElement extends AbstractElement {
    readonly widget: DraggerWidget;
    userDragOffsetX: number;
    userDragOffsetY: number;
    saveDragOffset: boolean;
    constructor(builder: ElementBuilder<any, any>);
    checkIsValidStayOnScreenX(x: number): boolean;
    checkIsValidStayOnScreenY(y: number): boolean;
    get absoluteX(): number;
    get absoluteY(): number;
    get widgetsToRegister(): GuiEventListener[];
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    tick(): void;
  }


  interface DraggerElementBuilder extends ElementBuilder<DraggerElement, DraggerEditorElement> {}
  class DraggerElementBuilder extends ElementBuilder<DraggerElement, DraggerEditorElement> {
    constructor();
    buildDefaultInstance(): DraggerElement;
    deserializeElement(serialized: SerializedElement): DraggerElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: DraggerElement, editor: LayoutEditorScreen): DraggerEditorElement;
  }


  class DraggerElementHandler {
    static readonly DRAGGER_METAS_FILE: File;
    static getMeta(elementIdentifier: string): DraggerMeta;
    static putMeta(elementIdentifier: string, meta: DraggerMeta): void;
    static putMeta(elementIdentifier: string, offsetX: number, offsetY: number): void;
  }


  interface DraggerWidget extends AbstractWidget {}
  class DraggerWidget extends AbstractWidget {
    draggingCallback: DraggingCallback;
    mouseCallback: MouseCallback;
    constructor(x: number, y: number, width: number, height: number, draggingCallback: DraggingCallback, mouseCallback: MouseCallback);
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    playDownSound(soundManager: SoundManager): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.dragger.DraggerElementHandler' {
  class DraggerMeta {
    offsetX: number;
    offsetY: number;
    constructor(x: number, y: number);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.dragger.DraggerWidget' {
  class DraggingCallback {
    onDrag(var1: number, var3: number, var5: number, var7: number): void;
  }


  class MouseCallback {
    onClickOrRelease(var1: number, var3: number, var5: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements' {
  import { ButtonElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton';
  import { InputFieldElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.inputfield';
  import { SliderElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.slider.v2';
  import { CheckboxElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.checkbox';
  import { TextElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.text.v2';
  import { TooltipElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.tooltip';
  import { TickerElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.ticker';
  import { PlayerEntityElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1';
  import { PlayerEntityElementBuilder as de_keksuccino_fancymenu_customization_element_elements_playerentity_PlayerEntityElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity';
  import { ImageElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.image';
  import { SplashTextElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.splash';
  import { SlideshowElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.slideshow';
  import { ShapeElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.shape';
  import { CursorElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.cursor';
  import { ProgressBarElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.progressbar';
  import { AudioElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.audio';
  import { MusicControllerElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.musiccontroller';
  import { DraggerElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.dragger';
  import { BrowserElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.browser';
  import { ItemElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.item';
  import { AnimationControllerElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.animationcontroller';
  import { MCEFVideoElementBuilder } from 'de.keksuccino.fancymenu.customization.element.elements.video.mcef';

  class Elements {
    static readonly BUTTON: ButtonElementBuilder;
    static readonly INPUT_FIELD: InputFieldElementBuilder;
    static readonly SLIDER_V2: SliderElementBuilder;
    static readonly CHECKBOX: CheckboxElementBuilder;
    static readonly TEXT_V2: TextElementBuilder;
    static readonly TOOLTIP: TooltipElementBuilder;
    static readonly TICKER: TickerElementBuilder;
    static readonly PLAYER_ENTITY_V1: PlayerEntityElementBuilder;
    static readonly PLAYER_ENTITY_V2: de_keksuccino_fancymenu_customization_element_elements_playerentity_PlayerEntityElementBuilder;
    static readonly IMAGE: ImageElementBuilder;
    static readonly SPLASH_TEXT: SplashTextElementBuilder;
    static readonly SLIDESHOW: SlideshowElementBuilder;
    static readonly SHAPE: ShapeElementBuilder;
    static readonly CURSOR: CursorElementBuilder;
    static readonly PROGRESS_BAR: ProgressBarElementBuilder;
    static readonly AUDIO_V2: AudioElementBuilder;
    static readonly MUSIC_CONTROLLER: MusicControllerElementBuilder;
    static readonly DRAGGER: DraggerElementBuilder;
    static readonly BROWSER: BrowserElementBuilder;
    static readonly ITEM: ItemElementBuilder;
    static readonly ANIMATION_CONTROLLER: AnimationControllerElementBuilder;
    static readonly MCEF_VIDEO: MCEFVideoElementBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.image' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { Component } from 'net.minecraft.network.chat';

  interface ImageEditorElement extends AbstractEditorElement {}
  class ImageEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): ImageElement;
    init(): void;
  }


  interface ImageElement extends AbstractElement {}
  class ImageElement extends AbstractElement {
    textureSupplier: ResourceSupplier;
    repeat: boolean;
    nineSlice: boolean;
    nineSliceBorderX: number;
    nineSliceBorderY: number;
    restartAnimatedOnMenuLoad: boolean;
    imageTint: string;
    lastImageTint: string;
    constructor(builder: ElementBuilder<any, any>);
    get textureResource(): ITexture;
    onOpenScreen(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    restoreAspectRatio(): void;
  }


  interface ImageElementBuilder extends ElementBuilder<ImageElement, ImageEditorElement> {}
  class ImageElementBuilder extends ElementBuilder<ImageElement, ImageEditorElement> {
    constructor();
    buildDefaultInstance(): ImageElement;
    deserializeElement(serialized: SerializedElement): ImageElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: ImageElement, editor: LayoutEditorScreen): ImageEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.inputfield' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { InputFieldType } from 'de.keksuccino.fancymenu.customization.element.elements.inputfield.InputFieldElement';
  import { ExtendedEditBox } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Component } from 'net.minecraft.network.chat';

  interface InputFieldEditorElement extends AbstractEditorElement {}
  class InputFieldEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): InputFieldElement;
    init(): void;
  }


  interface InputFieldElement extends AbstractElement {}
  class InputFieldElement extends AbstractElement {
    linkedVariable: string;
    type: InputFieldType;
    maxTextLength: number;
    editBox: ExtendedEditBox;
    lastValue: string;
    navigatable: boolean;
    constructor(builder: ElementBuilder<InputFieldElement, InputFieldEditorElement>);
    get widgetsToRegister(): GuiEventListener[];
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface InputFieldElementBuilder extends ElementBuilder<InputFieldElement, InputFieldEditorElement> {}
  class InputFieldElementBuilder extends ElementBuilder<InputFieldElement, InputFieldEditorElement> {
    constructor();
    buildDefaultInstance(): InputFieldElement;
    deserializeElement(serialized: SerializedElement): InputFieldElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: InputFieldElement, editor: LayoutEditorScreen): InputFieldEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.inputfield.InputFieldElement' {
  import { Enum } from 'java.lang';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';
  import { List } from 'java.util';

  interface InputFieldType extends Enum<InputFieldType> {}
  class InputFieldType extends Enum<InputFieldType> {
    static readonly INTEGER_ONLY: InputFieldType;
    static readonly DECIMAL_ONLY: InputFieldType;
    static readonly URL: InputFieldType;
    static readonly TEXT: InputFieldType;
    get filter(): CharacterFilter;
    get name(): string;
    static getByName(name: string): InputFieldType;
    static valueOf(name: string): InputFieldType;
    static values(): InputFieldType[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.item' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Consumer } from 'java.util.function';
  import { DataComponentPatch } from 'net.minecraft.core.component';

  interface ItemEditorElement extends AbstractEditorElement {}
  class ItemEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): ItemElement;
    init(): void;
  }


  interface ItemElement extends AbstractElement {}
  class ItemElement extends AbstractElement {
    cachedStack: ItemStack;
    itemKey: string;
    enchanted: boolean;
    itemCount: string;
    lore: string;
    itemName: string;
    showTooltip: boolean;
    nbtData: string;
    constructor(builder: ElementBuilder<any, any>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ItemElementBuilder extends ElementBuilder<ItemElement, ItemEditorElement> {}
  class ItemElementBuilder extends ElementBuilder<ItemElement, ItemEditorElement> {
    constructor();
    buildDefaultInstance(): ItemElement;
    deserializeElement(serialized: SerializedElement): ItemElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: ItemElement, editor: LayoutEditorScreen): ItemEditorElement;
  }


  interface ItemKeyScreen extends StringBuilderScreen {}
  class ItemKeyScreen extends StringBuilderScreen {
    constructor(value: string, callback: Consumer<string>);
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class NBTBuilder {
    static buildNbtFromString(target: ItemStack, nbtJson: string): DataComponentPatch;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.musiccontroller' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { Post } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';

  interface MusicControllerEditorElement extends AbstractEditorElement {}
  class MusicControllerEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): MusicControllerElement;
    init(): void;
  }


  interface MusicControllerElement extends AbstractElement {}
  class MusicControllerElement extends AbstractElement {
    playMenuMusic: boolean;
    playWorldMusic: boolean;
    constructor(builder: ElementBuilder<any, any>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    tick(): void;
  }


  interface MusicControllerElementBuilder extends ElementBuilder<MusicControllerElement, MusicControllerEditorElement> {}
  class MusicControllerElementBuilder extends ElementBuilder<MusicControllerElement, MusicControllerEditorElement> {
    constructor();
    buildDefaultInstance(): MusicControllerElement;
    deserializeElement(serialized: SerializedElement): MusicControllerElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: MusicControllerElement, editor: LayoutEditorScreen): MusicControllerEditorElement;
  }


  class MusicControllerHandler {
    static init(): void;
    static notify(controller: MusicControllerElement): void;
    onClientTickPost(e: Post): void;
    static shouldPlayMenuMusic(): boolean;
    static shouldPlayWorldMusic(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { PlayerPose, Wearable } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.PlayerEntityElement';
  import { SkinResourceSupplier, CapeResourceSupplier } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.textures';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface PlayerEntityEditorElement extends AbstractEditorElement {}
  class PlayerEntityEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): PlayerEntityElement;
    init(): void;
  }


  interface PlayerEntityElement extends AbstractElement {}
  class PlayerEntityElement extends AbstractElement {
    copyClientPlayer: boolean;
    playerName: string;
    showPlayerName: boolean;
    pose: PlayerPose;
    bodyMovement: boolean;
    hasParrotOnShoulder: boolean;
    parrotOnLeftShoulder: boolean;
    isBaby: boolean;
    headFollowsMouse: boolean;
    bodyFollowsMouse: boolean;
    slim: boolean;
    autoSkin: boolean;
    autoCape: boolean;
    skinTextureSupplier: SkinResourceSupplier;
    capeTextureSupplier: CapeResourceSupplier;
    bodyXRot: string;
    bodyYRot: string;
    bodyZRot: string;
    headXRot: string;
    headYRot: string;
    headZRot: string;
    leftArmXRot: string;
    leftArmYRot: string;
    leftArmZRot: string;
    rightArmXRot: string;
    rightArmYRot: string;
    rightArmZRot: string;
    leftLegXRot: string;
    leftLegYRot: string;
    leftLegZRot: string;
    rightLegXRot: string;
    rightLegYRot: string;
    rightLegZRot: string;
    bodyXRotAdvancedMode: boolean;
    bodyYRotAdvancedMode: boolean;
    bodyZRotAdvancedMode: boolean;
    headXRotAdvancedMode: boolean;
    headYRotAdvancedMode: boolean;
    headZRotAdvancedMode: boolean;
    leftArmXRotAdvancedMode: boolean;
    leftArmYRotAdvancedMode: boolean;
    leftArmZRotAdvancedMode: boolean;
    rightArmXRotAdvancedMode: boolean;
    rightArmYRotAdvancedMode: boolean;
    rightArmZRotAdvancedMode: boolean;
    leftLegXRotAdvancedMode: boolean;
    leftLegYRotAdvancedMode: boolean;
    leftLegZRotAdvancedMode: boolean;
    rightLegXRotAdvancedMode: boolean;
    rightLegYRotAdvancedMode: boolean;
    rightLegZRotAdvancedMode: boolean;
    leftHandWearable: Wearable;
    rightHandWearable: Wearable;
    headWearable: Wearable;
    chestWearable: Wearable;
    legsWearable: Wearable;
    feetWearable: Wearable;
    constructor(builder: ElementBuilder<any, any>);
    afterConstruction(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setCapeByPlayerName(): void;
    setCapeBySource(resourceSource: string): void;
    setCopyClientPlayer(copyClientPlayer: boolean): void;
    setHasParrotOnShoulder(hasParrot: boolean, onLeftShoulder: boolean): void;
    setIsBaby(isBaby: boolean): void;
    setPlayerName(playerName: string): void;
    setShowPlayerName(showName: boolean): void;
    setSkinByPlayerName(): void;
    setSkinBySource(resourceSource: string): void;
  }


  interface PlayerEntityElementBuilder extends ElementBuilder<PlayerEntityElement, PlayerEntityEditorElement> {}
  class PlayerEntityElementBuilder extends ElementBuilder<PlayerEntityElement, PlayerEntityEditorElement> {
    constructor();
    buildDefaultInstance(): PlayerEntityElement;
    deserializeElement(serialized: SerializedElement): PlayerEntityElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: PlayerEntityElement, editor: LayoutEditorScreen): PlayerEntityEditorElement;
  }


  interface PlayerEntityPoseScreen extends CellScreen {}
  class PlayerEntityPoseScreen extends CellScreen {
    bodyXRot: string;
    bodyYRot: string;
    bodyZRot: string;
    headXRot: string;
    headYRot: string;
    headZRot: string;
    leftArmXRot: string;
    leftArmYRot: string;
    leftArmZRot: string;
    rightArmXRot: string;
    rightArmYRot: string;
    rightArmZRot: string;
    leftLegXRot: string;
    leftLegYRot: string;
    leftLegZRot: string;
    rightLegXRot: string;
    rightLegYRot: string;
    rightLegZRot: string;
    bodyXRotAdvancedMode: boolean;
    bodyYRotAdvancedMode: boolean;
    bodyZRotAdvancedMode: boolean;
    headXRotAdvancedMode: boolean;
    headYRotAdvancedMode: boolean;
    headZRotAdvancedMode: boolean;
    leftArmXRotAdvancedMode: boolean;
    leftArmYRotAdvancedMode: boolean;
    leftArmZRotAdvancedMode: boolean;
    rightArmXRotAdvancedMode: boolean;
    rightArmYRotAdvancedMode: boolean;
    rightArmZRotAdvancedMode: boolean;
    leftLegXRotAdvancedMode: boolean;
    leftLegYRotAdvancedMode: boolean;
    leftLegZRotAdvancedMode: boolean;
    rightLegXRotAdvancedMode: boolean;
    rightLegYRotAdvancedMode: boolean;
    rightLegZRotAdvancedMode: boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.PlayerEntityElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  interface PlayerPose extends Enum<PlayerPose> {}
  class PlayerPose extends Enum<PlayerPose> {
    static readonly STANDING: PlayerPose;
    static readonly CROUCHING: PlayerPose;
    static readonly SLEEPING: PlayerPose;
    static readonly SWIMMING: PlayerPose;
    static readonly DYING: PlayerPose;
    static readonly SPIN_ATTACK: PlayerPose;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): PlayerPose[];
    static getByName(name: string): PlayerPose;
    getByNameInternal(name: string): PlayerPose;
    static valueOf(name: string): PlayerPose;
    static values(): PlayerPose[];
  }


  class Wearable {
    static readonly WEARABLE_EMPTY_KEY: string;
    itemKey: string;
    enchanted: boolean;
    cachedStack: ItemStack;
    static deserialize(serialized: string): Wearable;
    static empty(): Wearable;
    get wearable(): ItemStack;
    isEmpty(): boolean;
    serialize(): string;
    setEmpty(): void;
    update(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.PlayerEntityPoseScreen' {
  import { RenderCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ExtendedButton, CycleButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';
  import { RangeSliderButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v1';
  import { Supplier, Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface RotationCell extends RenderCell {}
  class RotationCell extends RenderCell {
    activeWidget: AbstractWidget;
    rotationStringButton: ExtendedButton;
    rotationSlider: RangeSliderButton;
    toggleModeButton: CycleButton;
    constructor(localizationKeySuffix: string, rotationValueGetter: Supplier<string>, rotationValueSetter: Consumer<string>, advancedModeGetter: Supplier<boolean>, advancedModeSetter: Consumer<boolean>);
    get sliderMessageWithoutPrefixSuffix(): string;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.textures' {
  import { ResourceSupplier, ResourceSourceType } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture, PngTexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CapeResourceSupplier extends ResourceSupplier<ITexture> {}
  class CapeResourceSupplier extends ResourceSupplier<ITexture> {
    static readonly DEFAULT_CAPE_LOCATION: ResourceLocation;
    static readonly DEFAULT_CAPE: PngTexture;
    constructor(source: string, sourceIsPlayerName: boolean);
    get (): ITexture;
    get capeLocation(): ResourceLocation;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    hasNoCape(): boolean;
    setSource(source: string): void;
  }


  interface SkinResourceSupplier extends ResourceSupplier<ITexture> {}
  class SkinResourceSupplier extends ResourceSupplier<ITexture> {
    static readonly DEFAULT_SKIN_LOCATION: ResourceLocation;
    static readonly DEFAULT_SKIN: PngTexture;
    constructor(source: string, sourceIsPlayerName: boolean);
    get (): ITexture;
    get skinLocation(): ResourceLocation;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    isSlimPlayerNameSkin(): boolean;
    setSource(source: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.model.layers' {
  import { PlayerEntityProperties, PlayerEntityElementRenderer } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.model';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Entity } from 'net.minecraft.world.entity';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { EntityModelSet } from 'net.minecraft.client.model.geom';

  interface PlayerEntityCapeLayer extends PlayerEntityRenderLayer {}
  class PlayerEntityCapeLayer extends PlayerEntityRenderLayer {
    readonly properties: PlayerEntityProperties;
    readonly renderer: PlayerEntityElementRenderer;
    constructor(renderer: PlayerEntityElementRenderer, properties: PlayerEntityProperties);
    render(matrix: PoseStack, p_116616_: MultiBufferSource, p_116617_: number, entity: Entity, p_116619_: number, p_116620_: number, p_116621_: number, p_116622_: number, p_116623_: number, p_116624_: number): void;
  }


  interface PlayerEntityRenderLayer extends RenderLayer {}
  class PlayerEntityRenderLayer extends RenderLayer {
    constructor(p_117346_: RenderLayerParent);
  }


  interface PlayerEntityShoulderParrotLayer extends PlayerEntityRenderLayer {}
  class PlayerEntityShoulderParrotLayer extends PlayerEntityRenderLayer {
    readonly properties: PlayerEntityProperties;
    constructor(renderer: PlayerEntityElementRenderer, modelSet: EntityModelSet, properties: PlayerEntityProperties);
    render(p_117307_: PoseStack, p_117308_: MultiBufferSource, p_117309_: number, entity: Entity, p_117311_: number, p_117312_: number, p_117313_: number, p_117314_: number, p_117315_: number, p_117316_: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.model' {
  import { PlayerRenderer } from 'net.minecraft.client.renderer.entity.player';
  import { EntityModelSet, ModelPart } from 'net.minecraft.client.model.geom';
  import { Context } from 'EntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { Component } from 'net.minecraft.network.chat';
  import { PlayerModelPart } from 'net.minecraft.world.entity.player';
  import { HumanoidArm, Pose, EntityType, EntityDimensions } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { InteractionHand } from 'net.minecraft.world';
  import { Direction } from 'net.minecraft.core';

  interface PlayerEntityElementRenderer extends PlayerRenderer {}
  class PlayerEntityElementRenderer extends PlayerRenderer {
    static readonly ENTITY_MODEL_SET: EntityModelSet;
    static readonly RENDER_CONTEXT: Context;
    readonly properties: PlayerEntityProperties;
    readonly playerModel: PlayerEntityModel;
    constructor(slim: boolean);
    getRenderOffset(entity: AbstractClientPlayer, f11: number): Vec3;
    getTextureLocation(entity: AbstractClientPlayer): ResourceLocation;
    renderPlayerEntityItem(d11: number, d12: number, d13: number, f11: number, f12: number, matrix: PoseStack, bufferSource: MultiBufferSource, i11: number): void;
  }


  interface PlayerEntityModel extends PlayerModel {}
  class PlayerEntityModel extends PlayerModel {
    readonly properties: PlayerEntityProperties;
    constructor(modelPart: ModelPart, slim: boolean, properties: PlayerEntityProperties);
    setupAnimWithoutEntity(animationSpeed: number, animationSpeedOld: number, someFloatThatsAlways1: number, headRotY: number, headRotX: number): void;
  }


  class PlayerEntityProperties {
    xo: number;
    yo: number;
    zo: number;
    xRot: number;
    xRotO: number;
    yRot: number;
    yBodyRot: number;
    yBodyRotO: number;
    yHeadRot: number;
    yHeadRotO: number;
    xCloak: number;
    xCloakO: number;
    yCloak: number;
    yCloakO: number;
    zCloak: number;
    zCloakO: number;
    headZRot: number;
    leftArmXRot: number;
    leftArmYRot: number;
    leftArmZRot: number;
    rightArmXRot: number;
    rightArmYRot: number;
    rightArmZRot: number;
    leftLegXRot: number;
    leftLegYRot: number;
    leftLegZRot: number;
    rightLegXRot: number;
    rightLegYRot: number;
    rightLegZRot: number;
    bob: number;
    oBob: number;
    animationSpeedOld: number;
    animationSpeed: number;
    animationPosition: number;
    tickCount: number;
    shouldSit: boolean;
    isBaby: boolean;
    crouching: boolean;
    spectator: boolean;
    invisible: boolean;
    glowing: boolean;
    hasParrotOnShoulder: boolean;
    shoulderParrotVariant: number;
    parrotOnLeftShoulder: boolean;
    showDisplayName: boolean;
    displayName: Component;
    constructor(slim: boolean);
    get bedOrientation(): Direction;
    get capeTextureLocation(): ResourceLocation;
    get dimensions(): EntityDimensions;
    get mainArm(): HumanoidArm;
    get offhandItem(): ItemStack;
    get skinTextureLocation(): ResourceLocation;
    get type(): EntityType;
    get useItemRemainingTicks(): number;
    get usedItemHand(): InteractionHand;
    getEyeHeight(pose: Pose): number;
    getItemInHand(hand: InteractionHand): ItemStack;
    hasPose(pose: Pose): boolean;
    isCrouching(): boolean;
    isModelPartShown(part: PlayerModelPart): boolean;
    isSlim(): boolean;
    isSpectator(): boolean;
    set capeTextureLocation(loc: ResourceLocation);
    set skinTextureLocation(loc: ResourceLocation);
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { PlayerEntityElementRenderer, PlayerEntityProperties } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.model';
  import { SkinResourceSupplier, CapeResourceSupplier } from 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.textures';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface PlayerEntityEditorElement extends AbstractEditorElement {}
  class PlayerEntityEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): PlayerEntityElement;
    init(): void;
  }


  interface PlayerEntityElement extends AbstractElement {}
  class PlayerEntityElement extends AbstractElement {
    readonly normalRenderer: PlayerEntityElementRenderer;
    readonly slimRenderer: PlayerEntityElementRenderer;
    copyClientPlayer: boolean;
    playerName: string;
    showPlayerName: boolean;
    hasParrotOnShoulder: boolean;
    parrotOnLeftShoulder: boolean;
    crouching: boolean;
    isBaby: boolean;
    scale: string;
    headFollowsMouse: boolean;
    bodyFollowsMouse: boolean;
    slim: boolean;
    autoSkin: boolean;
    autoCape: boolean;
    skinTextureSupplier: SkinResourceSupplier;
    capeTextureSupplier: CapeResourceSupplier;
    bodyXRot: string;
    bodyYRot: string;
    headXRot: string;
    headYRot: string;
    headZRot: string;
    leftArmXRot: string;
    leftArmYRot: string;
    leftArmZRot: string;
    rightArmXRot: string;
    rightArmYRot: string;
    rightArmZRot: string;
    leftLegXRot: string;
    leftLegYRot: string;
    leftLegZRot: string;
    rightLegXRot: string;
    rightLegYRot: string;
    rightLegZRot: string;
    bodyXRotAdvancedMode: boolean;
    bodyYRotAdvancedMode: boolean;
    headXRotAdvancedMode: boolean;
    headYRotAdvancedMode: boolean;
    headZRotAdvancedMode: boolean;
    leftArmXRotAdvancedMode: boolean;
    leftArmYRotAdvancedMode: boolean;
    leftArmZRotAdvancedMode: boolean;
    rightArmXRotAdvancedMode: boolean;
    rightArmYRotAdvancedMode: boolean;
    rightArmZRotAdvancedMode: boolean;
    leftLegXRotAdvancedMode: boolean;
    leftLegYRotAdvancedMode: boolean;
    leftLegZRotAdvancedMode: boolean;
    rightLegXRotAdvancedMode: boolean;
    rightLegYRotAdvancedMode: boolean;
    rightLegZRotAdvancedMode: boolean;
    constructor(builder: ElementBuilder<any, any>);
    get activeEntityProperties(): PlayerEntityProperties;
    get activeRenderer(): PlayerEntityElementRenderer;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setCapeByPlayerName(): void;
    setCapeBySource(resourceSource: string): void;
    setCopyClientPlayer(copyClientPlayer: boolean): void;
    setCrouching(crouching: boolean): void;
    setHasParrotOnShoulder(hasParrot: boolean, onLeftShoulder: boolean): void;
    setIsBaby(isBaby: boolean): void;
    setPlayerName(playerName: string): void;
    setShowPlayerName(showName: boolean): void;
    setSkinByPlayerName(): void;
    setSkinBySource(resourceSource: string): void;
  }


  interface PlayerEntityElementBuilder extends ElementBuilder<PlayerEntityElement, PlayerEntityEditorElement> {}
  class PlayerEntityElementBuilder extends ElementBuilder<PlayerEntityElement, PlayerEntityEditorElement> {
    constructor();
    buildDefaultInstance(): PlayerEntityElement;
    deserializeElement(serialized: SerializedElement): PlayerEntityElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    isDeprecated(): boolean;
    wrapIntoEditorElement(element: PlayerEntityElement, editor: LayoutEditorScreen): PlayerEntityEditorElement;
  }


  interface PlayerEntityPoseScreen extends CellScreen {}
  class PlayerEntityPoseScreen extends CellScreen {
    bodyXRot: string;
    bodyYRot: string;
    headXRot: string;
    headYRot: string;
    headZRot: string;
    leftArmXRot: string;
    leftArmYRot: string;
    leftArmZRot: string;
    rightArmXRot: string;
    rightArmYRot: string;
    rightArmZRot: string;
    leftLegXRot: string;
    leftLegYRot: string;
    leftLegZRot: string;
    rightLegXRot: string;
    rightLegYRot: string;
    rightLegZRot: string;
    bodyXRotAdvancedMode: boolean;
    bodyYRotAdvancedMode: boolean;
    headXRotAdvancedMode: boolean;
    headYRotAdvancedMode: boolean;
    headZRotAdvancedMode: boolean;
    leftArmXRotAdvancedMode: boolean;
    leftArmYRotAdvancedMode: boolean;
    leftArmZRotAdvancedMode: boolean;
    rightArmXRotAdvancedMode: boolean;
    rightArmYRotAdvancedMode: boolean;
    rightArmZRotAdvancedMode: boolean;
    leftLegXRotAdvancedMode: boolean;
    leftLegYRotAdvancedMode: boolean;
    leftLegZRotAdvancedMode: boolean;
    rightLegXRotAdvancedMode: boolean;
    rightLegYRotAdvancedMode: boolean;
    rightLegZRotAdvancedMode: boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.PlayerEntityPoseScreen' {
  import { RenderCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ExtendedButton, CycleButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';
  import { RangeSliderButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v1';
  import { Supplier, Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface RotationCell extends RenderCell {}
  class RotationCell extends RenderCell {
    activeWidget: AbstractWidget;
    rotationStringButton: ExtendedButton;
    rotationSlider: RangeSliderButton;
    toggleModeButton: CycleButton;
    constructor(localizationKeySuffix: string, rotationValueGetter: Supplier<string>, rotationValueSetter: Consumer<string>, advancedModeGetter: Supplier<boolean>, advancedModeSetter: Consumer<boolean>);
    get sliderMessageWithoutPrefixSuffix(): string;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.playerentity.v1.textures' {
  import { ResourceSupplier, ResourceSourceType } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture, PngTexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface CapeResourceSupplier extends ResourceSupplier<ITexture> {}
  class CapeResourceSupplier extends ResourceSupplier<ITexture> {
    static readonly DEFAULT_CAPE_LOCATION: ResourceLocation;
    static readonly DEFAULT_CAPE: PngTexture;
    constructor(source: string, sourceIsPlayerName: boolean);
    get (): ITexture;
    get capeLocation(): ResourceLocation;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    hasNoCape(): boolean;
    setSource(source: string): void;
  }


  interface SkinResourceSupplier extends ResourceSupplier<ITexture> {}
  class SkinResourceSupplier extends ResourceSupplier<ITexture> {
    static readonly DEFAULT_SKIN_LOCATION: ResourceLocation;
    static readonly DEFAULT_SKIN: PngTexture;
    constructor(source: string, sourceIsPlayerName: boolean);
    get (): ITexture;
    get skinLocation(): ResourceLocation;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    isSlimPlayerNameSkin(): boolean;
    setSource(source: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.progressbar' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { BarDirection, ProgressValueMode } from 'de.keksuccino.fancymenu.customization.element.elements.progressbar.ProgressBarElement';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface ProgressBarEditorElement extends AbstractEditorElement {}
  class ProgressBarEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): ProgressBarElement;
    init(): void;
  }


  interface ProgressBarElement extends AbstractElement {}
  class ProgressBarElement extends AbstractElement {
    direction: BarDirection;
    barColor: DrawableColor;
    barTextureSupplier: ResourceSupplier;
    backgroundColor: DrawableColor;
    backgroundTextureSupplier: ResourceSupplier;
    useProgressForElementAnchor: boolean;
    progressSource: string;
    progressValueMode: ProgressValueMode;
    smoothFillingAnimation: boolean;
    constructor(builder: ElementBuilder<any, any>);
    get childElementAnchorPointX(): number;
    get childElementAnchorPointY(): number;
    get currentProgress(): number;
    get progressHeight(): number;
    get progressWidth(): number;
    get progressX(): number;
    get progressY(): number;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ProgressBarElementBuilder extends ElementBuilder<ProgressBarElement, ProgressBarEditorElement> {}
  class ProgressBarElementBuilder extends ElementBuilder<ProgressBarElement, ProgressBarEditorElement> {
    constructor();
    buildDefaultInstance(): ProgressBarElement;
    deserializeElement(serialized: SerializedElement): ProgressBarElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: ProgressBarElement, editor: LayoutEditorScreen): ProgressBarEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.progressbar.ProgressBarElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface BarDirection extends Enum<BarDirection> {}
  class BarDirection extends Enum<BarDirection> {
    static readonly LEFT: BarDirection;
    static readonly RIGHT: BarDirection;
    static readonly UP: BarDirection;
    static readonly DOWN: BarDirection;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): BarDirection[];
    static getByName(name: string): BarDirection;
    getByNameInternal(name: string): BarDirection;
    static valueOf(name: string): BarDirection;
    static values(): BarDirection[];
  }


  interface ProgressValueMode extends Enum<ProgressValueMode> {}
  class ProgressValueMode extends Enum<ProgressValueMode> {
    static readonly PERCENTAGE: ProgressValueMode;
    static readonly FLOATING_POINT: ProgressValueMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): ProgressValueMode[];
    static getByName(name: string): ProgressValueMode;
    getByNameInternal(name: string): ProgressValueMode;
    static valueOf(name: string): ProgressValueMode;
    static values(): ProgressValueMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.shape' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { Shape } from 'de.keksuccino.fancymenu.customization.element.elements.shape.ShapeElement';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface ShapeEditorElement extends AbstractEditorElement {}
  class ShapeEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): ShapeElement;
    init(): void;
  }


  interface ShapeElement extends AbstractElement {}
  class ShapeElement extends AbstractElement {
    shape: Shape;
    colorRaw: string;
    color: DrawableColor;
    constructor(builder: ElementBuilder<any, any>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ShapeElementBuilder extends ElementBuilder<ShapeElement, ShapeEditorElement> {}
  class ShapeElementBuilder extends ElementBuilder<ShapeElement, ShapeEditorElement> {
    constructor();
    buildDefaultInstance(): ShapeElement;
    deserializeElement(serialized: SerializedElement): ShapeElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: ShapeElement, editor: LayoutEditorScreen): ShapeEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.shape.ShapeElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Shape extends Enum<Shape> {}
  class Shape extends Enum<Shape> {
    static readonly RECTANGLE: Shape;
    static getByName(name: string): Shape;
    static valueOf(name: string): Shape;
    static values(): Shape[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.slider.v2' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ExecutableElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { AbstractExtendedSlider } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v2';
  import { SliderType } from 'de.keksuccino.fancymenu.customization.element.elements.slider.v2.SliderElement';
  import { List } from 'java.util';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ButtonElement } from 'de.keksuccino.fancymenu.customization.element.elements.button.custombutton';
  import { Component } from 'net.minecraft.network.chat';

  interface SliderEditorElement extends AbstractEditorElement {}
  class SliderEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): SliderElement;
    init(): void;
  }


  interface SliderElement extends ExecutableElement, AbstractElement {}
  class SliderElement extends ExecutableElement {
    static readonly VALUE_PLACEHOLDER: string;
    slider: AbstractExtendedSlider;
    type: SliderType;
    preSelectedValue: string;
    listValues: List;
    minRangeValue: number;
    maxRangeValue: number;
    roundingDecimalPlace: number;
    label: string;
    tooltip: string;
    handleTextureNormal: ResourceSupplier;
    handleTextureHover: ResourceSupplier;
    handleTextureInactive: ResourceSupplier;
    sliderBackgroundTextureNormal: ResourceSupplier;
    sliderBackgroundTextureHighlighted: ResourceSupplier;
    restartBackgroundAnimationsOnHover: boolean;
    nineSliceCustomBackground: boolean;
    nineSliceBorderX: number;
    nineSliceBorderY: number;
    nineSliceSliderHandle: boolean;
    nineSliceSliderHandleBorderX: number;
    nineSliceSliderHandleBorderY: number;
    navigatable: boolean;
    executableBlock: GenericExecutableBlock;
    activeStateSupplier: LoadingRequirementContainer;
    hoverSound: ResourceSupplier;
    constructor(builder: ElementBuilder<any, any>);
    buildSlider(): void;
    get absoluteHeight(): number;
    get absoluteWidth(): number;
    get absoluteX(): number;
    get absoluteY(): number;
    get executableBlock(): GenericExecutableBlock;
    get handleTextureHover(): ResourceSupplier<ITexture>;
    get handleTextureInactive(): ResourceSupplier<ITexture>;
    get handleTextureNormal(): ResourceSupplier<ITexture>;
    get hoverSound(): ResourceSupplier<IAudio>;
    get label(): string;
    get nineSliceBorderX(): number;
    get nineSliceBorderY(): number;
    get nineSliceSliderHandleBorderX(): number;
    get nineSliceSliderHandleBorderY(): number;
    get opacity(): number;
    get propertySource(): ButtonElement;
    get sliderBackgroundTextureHighlighted(): ResourceSupplier<ITexture>;
    get sliderBackgroundTextureNormal(): ResourceSupplier<ITexture>;
    get widgetsToRegister(): GuiEventListener[];
    isNineSliceCustomBackground(): boolean;
    isNineSliceSliderHandle(): boolean;
    isRestartBackgroundAnimationsOnHover(): boolean;
    isTemplateActive(): boolean;
    prepareExecutableBlock(): void;
    prepareLoadingRequirementContainer(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    shouldRender(): boolean;
    updateWidget(): void;
    updateWidgetActiveState(): void;
    updateWidgetHoverSound(): void;
    updateWidgetTexture(): void;
    updateWidgetTooltip(): void;
  }


  interface SliderElementBuilder extends ElementBuilder<SliderElement, SliderEditorElement> {}
  class SliderElementBuilder extends ElementBuilder<SliderElement, SliderEditorElement> {
    constructor();
    buildDefaultInstance(): SliderElement;
    deserializeElement(serialized: SerializedElement): SliderElement;
    deserializeElementInternal(serialized: SerializedElement): SliderElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: SliderElement, editor: LayoutEditorScreen): SliderEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.slider.v2.SliderElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SliderType extends Enum<SliderType> {}
  class SliderType extends Enum<SliderType> {
    static readonly LIST: SliderType;
    static readonly INTEGER_RANGE: SliderType;
    static readonly DECIMAL_RANGE: SliderType;
    get localizationKeyBase(): string;
    get name(): string;
    get values(): SliderType[];
    static getByName(name: string): SliderType;
    getByNameInternal(name: string): SliderType;
    static valueOf(name: string): SliderType;
    static values(): SliderType[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.slideshow' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface SlideshowEditorElement extends AbstractEditorElement {}
  class SlideshowEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
  }


  interface SlideshowElement extends AbstractElement {}
  class SlideshowElement extends AbstractElement {
    slideshowName: string;
    constructor(builder: ElementBuilder<any, any>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    restoreAspectRatio(): void;
  }


  interface SlideshowElementBuilder extends ElementBuilder<SlideshowElement, SlideshowEditorElement> {}
  class SlideshowElementBuilder extends ElementBuilder<SlideshowElement, SlideshowEditorElement> {
    constructor();
    buildDefaultInstance(): SlideshowElement;
    deserializeElement(serialized: SerializedElement): SlideshowElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: SlideshowElement, editor: LayoutEditorScreen): SlideshowEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.splash' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { SourceMode } from 'de.keksuccino.fancymenu.customization.element.elements.splash.SplashTextElement';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { Map } from 'java.util';
  import { InitOrResizeScreenStartingEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { Component } from 'net.minecraft.network.chat';

  interface SplashTextEditorElement extends AbstractEditorElement {}
  class SplashTextEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): SplashTextElement;
    init(): void;
  }


  interface SplashTextElement extends AbstractElement {}
  class SplashTextElement extends AbstractElement {
    sourceMode: SourceMode;
    source: string;
    textFileSupplier: ResourceSupplier;
    scale: number;
    shadow: boolean;
    bounce: boolean;
    rotation: number;
    baseColor: DrawableColor;
    refreshOnMenuReload: boolean;
    font: Font;
    constructor(builder: ElementBuilder<any, any>);
    refresh(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface SplashTextElementBuilder extends ElementBuilder<SplashTextElement, SplashTextEditorElement> {}
  class SplashTextElementBuilder extends ElementBuilder<SplashTextElement, SplashTextEditorElement> {
    readonly splashCache: Map;
    isNewMenu: boolean;
    constructor();
    buildDefaultInstance(): SplashTextElement;
    deserializeElement(serialized: SerializedElement): SplashTextElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    onInitScreenPre(e: InitOrResizeScreenStartingEvent): void;
    onModReloaded(e: ModReloadEvent): void;
    wrapIntoEditorElement(element: SplashTextElement, editor: LayoutEditorScreen): SplashTextEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.splash.SplashTextElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SourceMode extends Enum<SourceMode> {}
  class SourceMode extends Enum<SourceMode> {
    static readonly DIRECT_TEXT: SourceMode;
    static readonly TEXT_FILE: SourceMode;
    static readonly VANILLA: SourceMode;
    get name(): string;
    static getByName(name: string): SourceMode;
    static valueOf(name: string): SourceMode;
    static values(): SourceMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.text.v2' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { MarkdownRenderer } from 'de.keksuccino.fancymenu.util.rendering.text.markdown';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { SourceMode } from 'de.keksuccino.fancymenu.customization.element.elements.text.v2.TextElement';
  import { Component } from 'net.minecraft.network.chat';

  interface TextEditorElement extends AbstractEditorElement {}
  class TextEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface TextElement extends AbstractElement {}
  class TextElement extends AbstractElement {
    textResourceSupplier: ResourceSupplier;
    verticalScrollGrabberTextureNormal: ResourceSupplier;
    verticalScrollGrabberTextureHover: ResourceSupplier;
    horizontalScrollGrabberTextureNormal: ResourceSupplier;
    horizontalScrollGrabberTextureHover: ResourceSupplier;
    scrollGrabberColorHexNormal: string;
    scrollGrabberColorHexHover: string;
    enableScrolling: boolean;
    interactable: boolean;
    markdownRenderer: MarkdownRenderer;
    scrollArea: ScrollArea;
    constructor(builder: ElementBuilder<any, any>);
    get widgetsToRegister(): GuiEventListener[];
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderInternal(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setSource(sourceMode: SourceMode, source: string): void;
    updateContent(): void;
    updateScrollArea(): void;
  }


  interface TextElementBuilder extends ElementBuilder<TextElement, TextEditorElement> {}
  class TextElementBuilder extends ElementBuilder<TextElement, TextEditorElement> {
    constructor();
    buildDefaultInstance(): TextElement;
    deserializeElement(serialized: SerializedElement): TextElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: TextElement, editor: LayoutEditorScreen): TextEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.text.v2.TextElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface SourceMode extends Enum<SourceMode> {}
  class SourceMode extends Enum<SourceMode> {
    static readonly DIRECT: SourceMode;
    static readonly RESOURCE: SourceMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): SourceMode[];
    static getByName(name: string): SourceMode;
    getByNameInternal(name: string): SourceMode;
    static valueOf(name: string): SourceMode;
    static values(): SourceMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.ticker' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ExecutableElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { TickMode } from 'de.keksuccino.fancymenu.customization.element.elements.ticker.TickerElement';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { Post } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { Component } from 'net.minecraft.network.chat';

  interface TickerEditorElement extends AbstractEditorElement {}
  class TickerEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    init(): void;
  }


  interface TickerElement extends ExecutableElement, AbstractElement {}
  class TickerElement extends ExecutableElement {
    actionExecutor: GenericExecutableBlock;
    tickDelayMs: number;
    isAsync: boolean;
    tickMode: TickMode;
    constructor(builder: ElementBuilder<any, any>);
    get executableBlock(): GenericExecutableBlock;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface TickerElementBuilder extends ElementBuilder<TickerElement, TickerEditorElement> {}
  class TickerElementBuilder extends ElementBuilder<TickerElement, TickerEditorElement> {
    static cachedThreadControllers: List;
    static cachedOncePerSessionItems: List;
    constructor();
    buildDefaultInstance(): TickerElement;
    deserializeElement(serialized: SerializedElement): TickerElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    onClientTickPost(e: Post): void;
    onModReload(e: ModReloadEvent): void;
    wrapIntoEditorElement(element: TickerElement, editor: LayoutEditorScreen): TickerEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.ticker.TickerElement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TickMode extends Enum<TickMode> {}
  class TickMode extends Enum<TickMode> {
    static readonly NORMAL: TickMode;
    static readonly ONCE_PER_SESSION: TickMode;
    static readonly ON_MENU_LOAD: TickMode;
    static getByName(name: string): TickMode;
    static valueOf(name: string): TickMode;
    static values(): TickMode[];
  }


  class TickerElementThreadController {
    running: boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.tooltip' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { MarkdownRenderer } from 'de.keksuccino.fancymenu.util.rendering.text.markdown';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SourceMode } from 'de.keksuccino.fancymenu.customization.element.elements.tooltip.TooltipElement';
  import { Component } from 'net.minecraft.network.chat';

  interface TooltipEditorElement extends AbstractEditorElement {}
  class TooltipEditorElement extends AbstractEditorElement {
    constructor(element: TooltipElement, editor: LayoutEditorScreen);
    get element(): TooltipElement;
    init(): void;
  }


  interface TooltipElement extends AbstractElement {}
  class TooltipElement extends AbstractElement {
    textResourceSupplier: ResourceSupplier;
    backgroundTexture: ResourceSupplier;
    nineSliceBorderTop: number;
    nineSliceBorderRight: number;
    nineSliceBorderBottom: number;
    nineSliceBorderLeft: number;
    mouseFollowing: boolean;
    interactable: boolean;
    markdownRenderer: MarkdownRenderer;
    constructor(builder: ElementBuilder<any, any>);
    get absoluteHeight(): number;
    get absoluteX(): number;
    get absoluteY(): number;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderInternal(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setSource(sourceMode: SourceMode, source: string): void;
    updateContent(): void;
  }


  interface TooltipElementBuilder extends ElementBuilder<TooltipElement, TooltipEditorElement> {}
  class TooltipElementBuilder extends ElementBuilder<TooltipElement, TooltipEditorElement> {
    constructor();
    buildDefaultInstance(): TooltipElement;
    deserializeElement(serialized: SerializedElement): TooltipElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: TooltipElement, editor: LayoutEditorScreen): TooltipEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.tooltip.TooltipElement' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface SourceMode extends Enum<SourceMode> {}
  class SourceMode extends Enum<SourceMode> {
    static readonly DIRECT: SourceMode;
    static readonly RESOURCE: SourceMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): SourceMode[];
    static getByName(name: string): SourceMode;
    getByNameInternal(name: string): SourceMode;
    static valueOf(name: string): SourceMode;
    static values(): SourceMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.video' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Consumer } from 'java.util.function';
  import { Float } from 'java.lang';
  import { File } from 'java.io';
  import { VideoElementMeta } from 'de.keksuccino.fancymenu.customization.element.elements.video.VideoElementController';

  class IVideoElement {
    get duration(): number;
    get playTime(): number;
  }


  interface SetVideoVolumeScreen extends CellScreen {}
  class SetVideoVolumeScreen extends CellScreen {
    constructor(preset: number, callback: Consumer<number>);
  }


  class VideoElementController {
    static readonly METAS_FILE: File;
    static getMeta(elementIdentifier: string): VideoElementMeta;
    static hasMetaFor(elementIdentifier: string): boolean;
    static putMeta(elementIdentifier: string, meta: VideoElementMeta): void;
    static syncChanges(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.video.mcef' {
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { AbstractElement, ElementBuilder, SerializedElement } from 'de.keksuccino.fancymenu.customization.element';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { Component } from 'net.minecraft.network.chat';

  interface MCEFVideoEditorElement extends AbstractEditorElement {}
  class MCEFVideoEditorElement extends AbstractEditorElement {
    constructor(element: AbstractElement, editor: LayoutEditorScreen);
    get element(): MCEFVideoElement;
    init(): void;
  }


  interface MCEFVideoElementBuilder extends ElementBuilder<MCEFVideoElement, MCEFVideoEditorElement> {}
  class MCEFVideoElementBuilder extends ElementBuilder<MCEFVideoElement, MCEFVideoEditorElement> {
    constructor();
    buildDefaultInstance(): MCEFVideoElement;
    deserializeElement(serialized: SerializedElement): MCEFVideoElement;
    getDescription(element: AbstractElement): Component[];
    getDisplayName(element: AbstractElement): Component;
    wrapIntoEditorElement(element: MCEFVideoElement, editor: LayoutEditorScreen): MCEFVideoEditorElement;
  }

}

declare module 'de.keksuccino.fancymenu.customization.element.elements.video.VideoElementController' {
  class VideoElementMeta {
    element_identifier: string;
    volume: number;
    paused: boolean;
    constructor(element_identifier: string, volume: number, paused: boolean);
  }

}

declare module 'de.keksuccino.fancymenu.customization.gameintro' {
  import { PlayableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { Overlay, Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class GameIntroHandler {
    static introPlayed: boolean;
    static get intro(): PlayableResource;
    static shouldPlayIntro(): boolean;
  }


  interface GameIntroOverlay extends Overlay {}
  class GameIntroOverlay extends Overlay {
    constructor(fadeTo: Screen, intro: PlayableResource);
    keyPressed(keycode: number, scancode: number, modifiers: number): void;
    mouseClicked(button: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layer' {
  import { List, Map } from 'java.util';
  import { WidgetMeta } from 'de.keksuccino.fancymenu.customization.widget';
  import { Layout, LayoutBase } from 'de.keksuccino.fancymenu.customization.layout';
  import { OrderedElementCollection } from 'de.keksuccino.fancymenu.customization.layout.Layout';
  import { VanillaWidgetElement } from 'de.keksuccino.fancymenu.customization.element.elements.button.vanillawidget';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TabNavigationBar } from 'net.minecraft.client.gui.components.tabs';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { OpenScreenEvent, OpenScreenPostInitEvent, CloseScreenEvent, RenderedScreenBackgroundEvent, InitOrResizeScreenStartingEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Pre, Post } from 'de.keksuccino.fancymenu.events.screen.InitOrResizeScreenEvent';
  import { Post as de_keksuccino_fancymenu_events_screen_screentickevent_Post } from 'de.keksuccino.fancymenu.events.screen.ScreenTickEvent';
  import { Pre as de_keksuccino_fancymenu_events_screen_renderscreenevent_Pre, Post as de_keksuccino_fancymenu_events_screen_renderscreenevent_Post } from 'de.keksuccino.fancymenu.events.screen.RenderScreenEvent';
  import { RenderedGuiListHeaderFooterEvent } from 'de.keksuccino.fancymenu.events.widget';
  import { Pre as de_keksuccino_fancymenu_events_widget_rendertabnavigationbarheaderbackgroundevent_Pre } from 'de.keksuccino.fancymenu.events.widget.RenderTabNavigationBarHeaderBackgroundEvent';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractElement } from 'de.keksuccino.fancymenu.customization.element';
  import { MenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Class } from 'java.lang';

  class ElementFactory {
    constructElementInstances(screenIdentifier: string, vanillaWidgetMetaList: WidgetMeta[], layouts: Layout[], normalElements: OrderedElementCollection, vanillaWidgetElements: VanillaWidgetElement[]): void;
    constructElementInstances(menuIdentifier: string, vanillaWidgetMetaList: WidgetMeta[], layout: Layout, normalElements: OrderedElementCollection, vanillaWidgetElements: VanillaWidgetElement[]): void;
  }


  interface ScreenCustomizationLayer extends ElementFactory {}
  class ScreenCustomizationLayer extends ElementFactory {
    static readonly MENU_BACKGROUND: ResourceLocation;
    static readonly INWORLD_MENU_BACKGROUND: ResourceLocation;
    layoutBase: LayoutBase;
    allElements: List;
    normalElements: OrderedElementCollection;
    vanillaWidgetElements: List;
    randomLayoutGroups: Map;
    activeLayouts: List;
    delayAppearanceFirstTime: List;
    delayThreads: List;
    backgroundDrawable: boolean;
    forceDisableCustomMenuTitle: boolean;
    backgroundOpacity: number;
    cachedLayoutWideLoadingRequirements: Map;
    cachedScreenWidgetMetas: List;
    cachedTabNavigationBar: TabNavigationBar;
    loadEarly: boolean;
    static cachedOriginalMenuTitles: Map;
    constructor(screenIdentifier: string);
    drawToBackground(e: RenderedScreenBackgroundEvent): void;
    get screenIdentifier(): string;
    getElementByInstanceIdentifier(instanceIdentifier: string): AbstractElement;
    getMenuBackgroundByInstanceIdentifier(identifier: string): MenuBackground;
    onCloseScreen(e: CloseScreenEvent): void;
    onInitOrResizeScreenPost(e: Post): void;
    onInitOrResizeScreenPre(e: Pre): void;
    onModReload(e: ModReloadEvent): void;
    onOpenScreen(e: OpenScreenEvent): void;
    onOpenScreenPostInit(e: OpenScreenPostInitEvent): void;
    onRenderListHeaderFooterPre(e: RenderedGuiListHeaderFooterEvent): void;
    onRenderPost(e: de_keksuccino_fancymenu_events_screen_renderscreenevent_Post): void;
    onRenderPre(e: de_keksuccino_fancymenu_events_screen_renderscreenevent_Pre): void;
    onRenderTabNavigationBarHeaderBackgroundPre(e: de_keksuccino_fancymenu_events_widget_rendertabnavigationbarheaderbackgroundevent_Pre): void;
    onScreenTickPre(e: de_keksuccino_fancymenu_events_screen_screentickevent_Post): void;
    static renderBackgroundOverlay(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    resetLayer(): void;
  }


  class ScreenCustomizationLayerHandler {
    static get activeLayer(): ScreenCustomizationLayer;
    static getLayer(screenIdentifier: string): ScreenCustomizationLayer;
    static getLayerOfScreen(screen: Screen): ScreenCustomizationLayer;
    static getLayerOfScreen(screenClass: Class<Screen>): ScreenCustomizationLayer;
    static init(): void;
    static isBeforeFinishInitialMinecraftReload(): boolean;
    static isLayerRegistered(screenIdentifier: string): boolean;
    static isMinecraftCurrentlyReloading(): boolean;
    onScreenInitOrResizeStarting(e: InitOrResizeScreenStartingEvent): void;
    static registerLayer(layer: ScreenCustomizationLayer): void;
    static registerLayer(screenIdentifier: string, layer: ScreenCustomizationLayer): void;
    static registerScreen(screen: Screen): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layer.ScreenCustomizationLayer' {
  import { Map, List } from 'java.util';
  import { ScreenCustomizationLayer } from 'de.keksuccino.fancymenu.customization.layer';
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';

  class RandomLayoutContainer {
    static readonly CACHED_PICKS: Map;
    readonly id: string;
    parent: ScreenCustomizationLayer;
    constructor(id: string, parent: ScreenCustomizationLayer);
    addLayout(layout: Layout): void;
    addLayouts(layouts: Layout[]): void;
    clearLayouts(): void;
    garbageCollectInvalidLayouts(): void;
    get groupIdentifier(): string;
    get layouts(): Layout[];
    get randomLayout(): Layout;
    isOnlyFirstTime(): boolean;
    isUniversalGroup(): boolean;
    reset(keepValidLayouts: boolean): void;
  }


  class ThreadCaller {
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { AnchorOverlayVisibilityMode } from 'de.keksuccino.fancymenu.customization.layout.editor.AnchorPointOverlay';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { Snapshot } from 'de.keksuccino.fancymenu.customization.layout.editor.LayoutEditorHistory';
  import { ElementFactory } from 'de.keksuccino.fancymenu.customization.layer';
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';
  import { List } from 'java.util';
  import { MenuBar } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';

  interface AnchorPointOverlay extends Renderable, GuiEventListener {}
  class AnchorPointOverlay extends Renderable {
    constructor(editor: LayoutEditorScreen);
    get overlayColorBase(): DrawableColor;
    get overlayColorBaseOverride(): DrawableColor;
    get overlayColorBorder(): DrawableColor;
    get overlayColorBorderOverride(): DrawableColor;
    get overlayHoverChargingTimeMs(): number;
    get overlayHoverChargingTimeSeconds(): number;
    get overlayOpacity(): number;
    get overlayOpacityBusy(): number;
    get overlayOpacityNormal(): number;
    get visibilityMode(): AnchorOverlayVisibilityMode;
    invertOverlayColors(): boolean;
    isFocused(): boolean;
    isOverlayBusy(): boolean;
    isOverlayVisible(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    keyReleased(keycode: number, scancode: number, modifiers: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetAreaHoverCache(): void;
    resetOverlay(): void;
    setFocused(var1: boolean): void;
  }


  interface AutoScalingScreen extends CellScreen {}
  class AutoScalingScreen extends CellScreen {
    allowDone(): boolean;
  }


  interface ChooseAnimationScreen extends Screen {}
  class ChooseAnimationScreen extends Screen {
    constructor(preSelectedAnimation: string, callback: Consumer<string>);
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }


  interface ChoosePanoramaScreen extends Screen {}
  class ChoosePanoramaScreen extends Screen {
    constructor(preSelectedPanorama: string, callback: Consumer<string>);
    keyPressed(button: number, $$1: number, $$2: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ChooseSlideshowScreen extends Screen {}
  class ChooseSlideshowScreen extends Screen {
    constructor(preSelectedSlideshow: string, callback: Consumer<string>);
    keyPressed(button: number, $$1: number, $$2: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class LayoutEditorHistory {
    constructor(editor: LayoutEditorScreen);
    createSnapshot(): Snapshot;
    saveSnapshot(): void;
    saveSnapshot(snap: Snapshot): void;
    setPreventSnapshotSaving(preventSaving: boolean): void;
    stepBack(): void;
    stepForward(): void;
  }


  interface LayoutEditorScreen extends ElementFactory, Screen {}
  class LayoutEditorScreen extends ElementFactory {
    static readonly FORCE_DISABLE_BUDDY: boolean;
    static readonly ELEMENT_DRAG_CRUMPLE_ZONE: number;
    layoutTargetScreen: Screen;
    layout: Layout;
    normalEditorElements: List;
    vanillaWidgetEditorElements: List;
    history: LayoutEditorHistory;
    menuBar: MenuBar;
    anchorPointOverlay: AnchorPointOverlay;
    rightClickMenu: ContextMenu;
    activeElementContextMenu: ContextMenu;
    layoutEditorWidgets: List;
    leftMouseDownPosX: number;
    leftMouseDownPosY: number;
    readonly cachedVanillaWidgetMetas: List;
    unsavedChanges: boolean;
    justOpened: boolean;
    constructor(layout: Layout);

    constructor(layoutTargetScreen: Screen, layout: Layout);
    allSelectedElementsMovable(): boolean;
    canMoveLayerDown(element: AbstractEditorElement): boolean;
    canMoveLayerUp(element: AbstractEditorElement): boolean;
    closeActiveElementMenu(forceClose: boolean): void;
    closeActiveElementMenu(): void;
    closeEditor(): void;
    closeRightClickMenu(): void;
    copyElementsToClipboard(...elements: AbstractEditorElement[]): void;
    deleteElement(element: AbstractEditorElement): boolean;
    deselectAllElements(): void;
    get allElements(): AbstractEditorElement[];
    static get currentInstance(): LayoutEditorScreen;
    get currentlyDraggedElements(): AbstractEditorElement[];
    get hoveredElements(): AbstractEditorElement[];
    get selectedElements(): AbstractEditorElement[];
    get topHoveredElement(): AbstractEditorElement;
    getElementByInstanceIdentifier(instanceIdentifier: string): AbstractEditorElement;
    isUserNavigatingInElementMenu(): boolean;
    isUserNavigatingInRightClickMenu(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    keyReleased(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, $$3: number, $$4: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    moveLayerDown(element: AbstractEditorElement): AbstractEditorElement;
    moveLayerToPosition(element: AbstractEditorElement, targetIndex: number): boolean;
    moveLayerUp(element: AbstractEditorElement): AbstractEditorElement;
    onUpdateSelectedElements(): void;
    openElementContextMenuAtMouseIfPossible(): void;
    openRightClickMenuAtMouse(mouseX: number, mouseY: number): void;
    pasteElementsFromClipboard(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static renderGrid(graphics: GuiGraphics, screenWidth: number, screenHeight: number): void;
    saveLayout(): void;
    saveLayoutAs(): void;
    saveWidgetSettings(): void;
    selectAllElements(): void;
    setAsCurrentInstance(): LayoutEditorScreen;
    shouldCloseOnEsc(): boolean;
    tick(): void;
  }


  class LayoutEditorUI {
    static buildEditorWidgetsContextMenu(editor: LayoutEditorScreen): ContextMenu;
    static buildElementContextMenu(editor: LayoutEditorScreen): ContextMenu;
    static buildHiddenVanillaElementsContextMenu(editor: LayoutEditorScreen): ContextMenu;
    static buildMenuBar(editor: LayoutEditorScreen, expanded: boolean): MenuBar;
    static buildOpenLayoutContextMenu(editor: LayoutEditorScreen): ContextMenu;
    static buildRightClickContextMenu(editor: LayoutEditorScreen): ContextMenu;
    static buildScrollListCustomizationsContextMenu(editor: LayoutEditorScreen): ContextMenu;
    openMenuAt(x: number, y: number): ContextMenu;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.AnchorPointOverlay' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ElementAnchorPoint } from 'de.keksuccino.fancymenu.customization.element.anchor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';

  interface AnchorPointArea extends Renderable, GuiEventListener {}
  class AnchorPointArea extends Renderable {
    readonly anchorPoint: ElementAnchorPoint;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setFocused(var1: boolean): void;
    toString(): string;
  }


  interface AnchorOverlayVisibilityMode extends Enum<AnchorOverlayVisibilityMode> {}
  class AnchorOverlayVisibilityMode extends Enum<AnchorOverlayVisibilityMode> {
    static readonly DISABLED: AnchorOverlayVisibilityMode;
    static readonly ALWAYS: AnchorOverlayVisibilityMode;
    static readonly DRAGGING: AnchorOverlayVisibilityMode;
    static readonly KEYBIND: AnchorOverlayVisibilityMode;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): AnchorOverlayVisibilityMode[];
    static getByName(name: string): AnchorOverlayVisibilityMode;
    getByNameInternal(name: string): AnchorOverlayVisibilityMode;
    static valueOf(name: string): AnchorOverlayVisibilityMode;
    static values(): AnchorOverlayVisibilityMode[];
  }


  interface ElementAnchorPointArea extends AnchorPointArea {}
  class ElementAnchorPointArea extends AnchorPointArea {
    readonly elementIdentifier: string;
    get element(): AbstractEditorElement;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    toString(): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.animation' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';
  import { List } from 'java.util';

  class AnimationState {
    static readonly TEXTURE_ATLAS: ResourceLocation;
    static readonly SPRITE_WIDTH: number;
    static readonly SPRITE_HEIGHT: number;
    static readonly ATLAS_COLUMNS: number;
    static readonly ATLAS_ROWS: number;
    allowsHopping(): boolean;
    allowsMovement(): boolean;
    canActivate(buddy: Buddy): boolean;
    get atlasIndex(): number;
    get cooldown(): number;
    get maxDuration(): number;
    get minDuration(): number;
    get name(): string;
    get priority(): number;
    getAnimationSpeed(buddy: Buddy): number;
    getCurrentWalkingSpeed(buddy: Buddy): number;
    getRandomizedDuration(buddy: Buddy): number;
    isTemporaryState(): boolean;
    onActivate(buddy: Buddy): void;
    onDeactivate(buddy: Buddy): void;
    shouldIgnoreLockedState(): boolean;
    shouldLockStateUntilFinished(): boolean;
    toString(): string;
  }


  class AnimationStates {
    static readonly PEEKING: AnimationState;
    static readonly POOPING_STANDING: AnimationState;
    static readonly SLEEPING: AnimationState;
    static readonly GRUMPY_STANDING: AnimationState;
    static readonly EATING_STANDING: AnimationState;
    static readonly BEING_PET: AnimationState;
    static readonly PLAYING_WITH_BALL_STANDING: AnimationState;
    static readonly CHASING_BALL: AnimationState;
    static readonly YAWNING_STANDING: AnimationState;
    static readonly WAVING_STANDING: AnimationState;
    static readonly SITTING: AnimationState;
    static readonly LOOKING_AROUND_STANDING: AnimationState;
    static readonly STANDING_SAD: AnimationState;
    static readonly STRETCHING_STANDING: AnimationState;
    static readonly STANDING: AnimationState;
    static readonly WALKING_SAD: AnimationState;
    static readonly WALKING_SLEEPY: AnimationState;
    static readonly WALKING_EXCITED: AnimationState;
    static readonly RUNNING: AnimationState;
    static readonly WALKING: AnimationState;
    static findFirstValidStateFor(buddy: Buddy): AnimationState;
    static get states(): AnimationState[];
    static getStateByName(name: string): AnimationState;
    static registerState(state: AnimationState): AnimationState;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.animation.AnimationState' {
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';
  import { AnimationState } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.animation';
  import { Predicate } from 'java.util.function';

  class AnimationSpeedSupplier {
    speed(var1: Buddy, var2: AnimationState): number;
  }


  class DurationRandomizer {
    randomize(var1: Buddy, var2: AnimationState): number;
  }


  class WalkingSpeedSupplier {
    speed(var1: Buddy, var2: AnimationState): number;
  }


  class StateEndAction {
    onDeactivate(var1: Buddy, var2: AnimationState): void;
  }


  class Builder {
    constructor(name: string, atlasIndex: number);
    activationCondition(activationCondition: Predicate<Buddy>): Builder;
    allowsHopping(allowsHopping: boolean): Builder;
    allowsMovement(allowsMovement: boolean): Builder;
    animationSpeed(animationSpeed: AnimationSpeedSupplier): Builder;
    build(): AnimationState;
    cooldown(cooldownMillis: number): Builder;
    duration(minDuration: number, maxDuration: number): Builder;
    durationRandomizer(durationRandomizer: DurationRandomizer): Builder;
    ignoresLockedState(ignoresLockedState: boolean): Builder;
    lockStateUntilFinished(lock: boolean): Builder;
    onDeactivate(onDeactivate: StateEndAction): Builder;
    preventionCondition(preventionCondition: Predicate<Buddy>): Builder;
    priority(priority: number): Builder;
    temporaryState(isTemporary: boolean): Builder;
    walkingSpeed(walkingSpeed: WalkingSpeedSupplier): Builder;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy' {
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { FancyMenuUiComponent } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AnimationState } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.animation';
  import { Random, List } from 'java.util';
  import { FoodItem, PlayBall, Poop } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.items';
  import { BuddyStatusScreen } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.gui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { LevelingManager } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.leveling';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface Buddy extends Renderable, FancyMenuUiComponent, AbstractContainerEventHandler {}
  class Buddy extends Renderable {
    static readonly LOGGER: Logger;
    static readonly TEXTURE_ICON_WANTS_BEING_PET: ResourceLocation;
    static readonly TEXTURE_ICON_WANTS_TO_PLAY: ResourceLocation;
    static readonly TEXTURE_THOUGHT_BUBBLE: ResourceLocation;
    buddyPosX: number;
    buddyPosY: number;
    screenWidth: number;
    screenHeight: number;
    facingLeft: boolean;
    isDisabled: boolean;
    isOffScreen: boolean;
    currentState: AnimationState;
    currentStateDuration: number;
    currentFrame: number;
    animationRenderTicks: number;
    hopAnimationCounter: number;
    hopAnimationSpeed: number;
    hopAnimationDuration: number;
    hunger: number;
    happiness: number;
    energy: number;
    funLevel: number;
    needsFood: boolean;
    needsPet: boolean;
    needsPlay: boolean;
    isBeingPet: boolean;
    isEating: boolean;
    isPlaying: boolean;
    isSleeping: boolean;
    isChasingBall: boolean;
    isHoldingBall: boolean;
    isSleepy: boolean;
    isStanding: boolean;
    isHopping: boolean;
    isLookingAround: boolean;
    isStretching: boolean;
    isExcited: boolean;
    isGrumpy: boolean;
    isSitting: boolean;
    isWaving: boolean;
    isYawning: boolean;
    isPeeking: boolean;
    hasBeenAwakened: boolean;
    isActivelyPeeking: boolean;
    peekTimer: number;
    peekDuration: number;
    stateChangeTimer: number;
    random: Random;
    pixelsSinceLastDirectionChange: number;
    minWalkDistance: number;
    maxWalkDistance: number;
    standChancePercentage: number;
    hopChancePercentage: number;
    lookChancePercentage: number;
    stretchChancePercentage: number;
    excitedChancePercentage: number;
    droppedFood: FoodItem;
    playBall: PlayBall;
    poops: List;
    isPooping: boolean;
    timeSinceLastPoop: number;
    poopingInterval: number;
    poopChancePercentage: number;
    static readonly MAX_POOPS_BEFORE_SAD: number;
    wasDisabled: boolean;
    wasOffScreen: boolean;
    statusScreen: BuddyStatusScreen;
    readonly children: List;
    constructor(screenWidth: number, screenHeight: number);
    chanceCheck(percentage: number): boolean;
    children(): GuiEventListener[];
    cleanupInvalidPoops(): void;
    decideNextBehavior(): void;
    dropPoop(): void;
    eatFood(): void;
    gainExperience(source: string, amount: number, cooldownMs: number): void;
    get animationRenderTicks(): number;
    get buddyPosX(): number;
    get buddyPosY(): number;
    get currentFrame(): number;
    get droppedFood(): FoodItem;
    get energy(): number;
    get funLevel(): number;
    get happiness(): number;
    get hunger(): number;
    get levelingManager(): LevelingManager;
    get playBall(): PlayBall;
    get poops(): Poop[];
    get rectangle(): ScreenRectangle;
    get screenHeight(): number;
    get screenWidth(): number;
    get spriteHeight(): number;
    get spriteWidth(): number;
    grabBall(): void;
    increaseFunLevel(amount: number): void;
    isChasingBall(): boolean;
    isFacingLeft(): boolean;
    isMouseOverBuddy(mouseX: number, mouseY: number): boolean;
    isPlaying(): boolean;
    isSad(): boolean;
    isSleeping(): boolean;
    loadState(): boolean;
    lockedInState(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    openLevelingScreen(): void;
    performRandomAction(): void;
    pet(): void;
    refuseSleep(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    renderNeedsIndicator(graphics: GuiGraphics): void;
    renderPoops(graphics: GuiGraphics): void;
    resetAnimationFrame(): void;
    saveState(): void;
    set droppedFood(food: FoodItem);
    set energy(energy: number);
    set funLevel(funLevel: number);
    set happiness(happiness: number);
    set hunger(hunger: number);
    set playBall(ball: PlayBall);
    set poops(poops: Poop[]);
    setAttributeEffects(hungerMultiplier: number, happinessMultiplier: number, energyMultiplier: number, happinessGainMultiplier: number, experienceMultiplier: number, needsUnderstandingBonus: number, luckBonus: number): void;
    setChasingBall(chasingBall: boolean): void;
    setCurrentStateDuration(duration: number): void;
    setHoldingBall(holdingBall: boolean): void;
    setPlaying(playing: boolean): void;
    setScreenSize(width: number, height: number): void;
    setState(state: AnimationState): void;
    startActivelyPeeking(): void;
    startExcitement(): void;
    startGrumpyState(): void;
    startHopping(): void;
    startLookingAround(): void;
    startPeeking(): void;
    startPooping(): void;
    startSitting(): void;
    startSleeping(): void;
    startStanding(): void;
    startStretching(): void;
    startWaving(): void;
    startYawning(): void;
    stopActivelyPeeking(): void;
    stopAllStandingActions(): void;
    tick(): void;
    updateMovement(): void;
    updateStatsAndNeeds(): void;
    updateVisualState(): void;
  }


  class BuddySerializer {
    static loadBuddy(buddy: Buddy): boolean;
    static saveBuddy(buddy: Buddy): void;
  }


  interface BuddyWidget extends Renderable, NarratableEntry, FancyMenuUiComponent, AbstractContainerEventHandler {}
  class BuddyWidget extends Renderable {
    constructor(screenWidth: number, screenHeight: number);
    children(): GuiEventListener[];
    cleanup(): void;
    get rectangle(): ScreenRectangle;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    setScreenSize(width: number, height: number): void;
    tick(): void;
    updateNarration(var1: NarrationElementOutput): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.gui' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';
  import { ButtonNameSupplier } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.gui.BuddyGuiButton';
  import { Runnable } from 'java.lang';
  import { BooleanSupplier } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { LevelingManager } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.leveling';

  interface BuddyGuiButton extends Renderable {}
  class BuddyGuiButton extends Renderable {
    static readonly DEFAULT_BUTTON_NORMAL: ResourceLocation;
    static readonly DEFAULT_BUTTON_HOVER: ResourceLocation;
    static readonly DEFAULT_BUTTON_INACTIVE: ResourceLocation;
    static readonly BUTTON_CLOSE_NORMAL: ResourceLocation;
    static readonly BUTTON_CLOSE_HOVER: ResourceLocation;
    constructor(buddy: Buddy, x: number, y: number, width: number, height: number, nameSupplier: ButtonNameSupplier, action: Runnable, activeCondition: BooleanSupplier);

    constructor(buddy: Buddy, x: number, y: number, nameSupplier: ButtonNameSupplier, action: Runnable, activeCondition: BooleanSupplier);

    constructor(buddy: Buddy, nameSupplier: ButtonNameSupplier, action: Runnable, activeCondition: BooleanSupplier);
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    isActive(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    onClick(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setCloseButtonTextures(): BuddyGuiButton;
    setDefaultButtonTextures(): BuddyGuiButton;
    setPosition(x: number, y: number): BuddyGuiButton;
    setSize(width: number, height: number): BuddyGuiButton;
    setTextures(normal: ResourceLocation, hover: ResourceLocation, inactive: ResourceLocation): BuddyGuiButton;
    updateActiveState(): void;
  }


  interface BuddyStatusScreen extends Renderable {}
  class BuddyStatusScreen extends Renderable {
    sleepButtonCooldownEnd: number;
    constructor(buddy: Buddy, levelingManager: LevelingManager);
    hide(): void;
    isVisible(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    show(screenWidth: number, screenHeight: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.gui.BuddyGuiButton' {
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';

  class ButtonNameSupplier {
    name(var1: Buddy): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.items' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Random } from 'java.util';

  class FoodItem {
    static readonly TEXTURE_FOOD: ResourceLocation;
    x: number;
    y: number;
    isDragged: boolean;
    lifetime: number;
    readonly size: number;
    stickToCursor: boolean;
    justCreated: boolean;
    readonly buddy: Buddy;
    constructor(x: number, y: number, buddy: Buddy);
    drop(mouseX: number, mouseY: number): void;
    get x(): number;
    get y(): number;
    isBeingDragged(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isNearBuddy(buddyX: number, buddyY: number): boolean;
    pickup(mouseX: number, mouseY: number): void;
    render(graphics: GuiGraphics): void;
    setBeingDragged(dragged: boolean): void;
    setPosition(x: number, y: number): void;
    shouldRemove(): boolean;
    tick(): void;
  }


  class PlayBall {
    static readonly TEXTURE_BALL: ResourceLocation;
    static readonly CATCH_DISTANCE: number;
    static readonly INACTIVITY_TIMEOUT: number;
    static readonly USER_INACTIVITY_TIMEOUT: number;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    inactivityTimer: number;
    userInactivityTimer: number;
    readonly size: number;
    kickCooldown: number;
    isUp: boolean;
    isRolling: boolean;
    isGrabbedByBuddy: boolean;
    wasKickedByUser: boolean;
    isDragged: boolean;
    gravity: number;
    groundY: number;
    holdTimer: number;
    playBouncePhase: number;
    playBounceSpeed: number;
    static readonly VELOCITY_SAMPLE_SIZE: number;
    recentMouseX: number[];
    recentMouseY: number[];
    recentMouseTimes: number[];
    mouseSampleIndex: number;
    hasFullSamples: boolean;
    readonly buddy: Buddy;
    readonly random: Random;
    stickToCursor: boolean;
    justCreated: boolean;
    constructor(x: number, y: number, buddy: Buddy);
    buddyThrowBallUp(): void;
    get x(): number;
    get y(): number;
    isBeingDragged(): boolean;
    isGrabbedByBuddy(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isNearBuddy(buddyX: number, buddyY: number): boolean;
    pickup(mouseX: number, mouseY: number): void;
    render(graphics: GuiGraphics): void;
    resetInactivityTimer(): void;
    resetUserInactivityTimer(): void;
    setBeingDragged(dragged: boolean): void;
    setGrabbedByBuddy(grabbedByBuddy: boolean): void;
    setPosition(x: number, y: number): void;
    shouldRemove(): boolean;
    throwBall(mouseX: number, mouseY: number): void;
    tick(): void;
    updateDragPosition(mouseX: number, mouseY: number): void;
  }


  class Poop {
    static readonly TEXTURE_POOP: ResourceLocation;
    x: number;
    y: number;
    readonly size: number;
    isBeingCleaned: boolean;
    cleaningAnimation: number;
    static readonly CLEANING_DURATION: number;
    relativeX: number;
    relativeY: number;
    readonly buddy: Buddy;
    constructor(x: number, y: number, buddy: Buddy);
    get x(): number;
    get y(): number;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    render(graphics: GuiGraphics): void;
    shouldRemove(): boolean;
    startCleaning(): void;
    tick(): void;
    updatePosition(screenWidth: number, screenHeight: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.leveling' {
  import { AchievementType } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy.leveling.BuddyAchievement';
  import { Consumer } from 'java.util.function';
  import { Buddy } from 'de.keksuccino.fancymenu.customization.layout.editor.buddy';
  import { List, Map } from 'java.util';
  import { Integer } from 'java.lang';

  class BuddyAchievement {
    constructor(type: AchievementType, description: string, experienceReward: number, customRewardAction: Consumer<LevelingManager>);
    get description(): string;
    get experienceReward(): number;
    get type(): AchievementType;
    get unlockTimestamp(): number;
    isUnlocked(): boolean;
    reset(): void;
    unlock(levelingManager: LevelingManager): boolean;
  }


  class LevelingManager {
    constructor(buddy: Buddy);
    addExperience(amount: number): number[];
    applyLevelEffects(): void;
    checkStatAchievements(): void;
    get achievements(): Map<AchievementType, BuddyAchievement>;
    get currentLevel(): number;
    get experience(): number;
    get experienceForNextLevel(): number;
    get feedCount(): number;
    get layoutCreationCount(): number;
    get levelProgressPercentage(): number;
    get petCount(): number;
    get playCount(): number;
    get poopCleanCount(): number;
    get totalSessionTime(): number;
    incrementFeedCount(): void;
    incrementLayoutCreationCount(): void;
    incrementPetCount(): void;
    incrementPlayCount(): void;
    incrementPoopCleanCount(): void;
    loadState(): boolean;
    saveState(): boolean;
    unlockAchievement(type: AchievementType): boolean;
    updateSessionTime(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.buddy.leveling.BuddyAchievement' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AchievementType extends Enum<AchievementType> {}
  class AchievementType extends Enum<AchievementType> {
    static readonly FIRST_STEPS: AchievementType;
    static readonly FRIENDLY_TOUCH: AchievementType;
    static readonly CARETAKER: AchievementType;
    static readonly PLAYFUL_FRIEND: AchievementType;
    static readonly CLEANUP_CREW: AchievementType;
    static readonly BEST_BUDDIES: AchievementType;
    static readonly WELL_FED: AchievementType;
    static readonly ENERGIZER: AchievementType;
    static readonly FUN_TIMES: AchievementType;
    static readonly MARATHON_SESSION: AchievementType;
    static readonly MASTER_TRAINER: AchievementType;
    static readonly COMPLETION_COLLECTOR: AchievementType;
    static readonly MIDNIGHT_COMPANION: AchievementType;
    static readonly DESIGN_MARATHON: AchievementType;
    static readonly LOYAL_FRIEND: AchievementType;
    static readonly PERFECT_HARMONY: AchievementType;
    static readonly ACHIEVEMENT_HUNTER: AchievementType;
    get defaultDescription(): string;
    get name(): string;
    get tier(): number;
    static valueOf(name: string): AchievementType;
    static values(): AchievementType[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.ChooseAnimationScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { Consumer } from 'java.util.function';

  interface AnimationScrollEntry extends TextListScrollAreaEntry {}
  class AnimationScrollEntry extends TextListScrollAreaEntry {
    animation: string;
    constructor(parent: ScrollArea, animation: string, onClick: Consumer<TextListScrollAreaEntry>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.ChoosePanoramaScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { Consumer } from 'java.util.function';

  interface PanoramaScrollEntry extends TextListScrollAreaEntry {}
  class PanoramaScrollEntry extends TextListScrollAreaEntry {
    panorama: string;
    constructor(parent: ScrollArea, panorama: string, onClick: Consumer<TextListScrollAreaEntry>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.ChooseSlideshowScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { Consumer } from 'java.util.function';

  interface SlideshowScrollEntry extends TextListScrollAreaEntry {}
  class SlideshowScrollEntry extends TextListScrollAreaEntry {
    slideshow: string;
    constructor(parent: ScrollArea, slideshow: string, onClick: Consumer<TextListScrollAreaEntry>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.LayoutEditorHistory' {
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';

  class Snapshot {
    snapshot: Layout;
    preSnapshotState: Snapshot;
    constructor(editor: LayoutEditorScreen);
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget' {
  import { UIComponent } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { File } from 'java.io';
  import { WidgetSettings } from 'de.keksuccino.fancymenu.customization.layout.editor.widget.AbstractLayoutEditorWidgetBuilder';

  interface AbstractLayoutEditorWidget extends UIComponent {}
  class AbstractLayoutEditorWidget extends UIComponent {
    constructor(editor: LayoutEditorScreen, builder: AbstractLayoutEditorWidgetBuilder<any>);
    editorElementAdded(element: AbstractEditorElement): void;
    editorElementOrderChanged(element: AbstractEditorElement, movedUp: boolean): void;
    editorElementRemovedOrHidden(element: AbstractEditorElement): void;
    get allWidgetsExceptThis(): AbstractLayoutEditorWidget[];
    get bodyHeight(): number;
    get bodyWidth(): number;
    get borderThickness(): number;
    get builder(): AbstractLayoutEditorWidgetBuilder<any>;
    get combinedHeaderButtonWidth(): number;
    get displayLabel(): Component;
    get headerHeight(): number;
    get height(): number;
    get realBodyX(): number;
    get realBodyY(): number;
    get translatedX(): number;
    get translatedY(): number;
    get unscaledWidgetOffsetX(): number;
    get unscaledWidgetOffsetY(): number;
    get width(): number;
    isExpanded(): boolean;
    isHeaderButtonHovered(): boolean;
    isHeaderHovered(): boolean;
    isHovered(): boolean;
    isMouseOverHeader(): boolean;
    refresh(): void;
    renderComponent(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set bodyHeight(innerHeight: number);
    set bodyWidth(innerWidth: number);
    setExpanded(expanded: boolean): AbstractLayoutEditorWidget;
    setUnscaledWidgetOffsetX(offsetX: number, forceSet: boolean): void;
    setUnscaledWidgetOffsetY(offsetY: number, forceSet: boolean): void;
    tick(): void;
  }


  class AbstractLayoutEditorWidgetBuilder<T extends AbstractLayoutEditorWidget = any> {
    static readonly WIDGET_SETTINGS_DIR: File;
    constructor(identifier: string);
    applySettings(var1: LayoutEditorScreen, var2: WidgetSettings, var3: T): void;
    buildDefaultInstance(var1: LayoutEditorScreen): T;
    buildWithSettingsInternal(editor: LayoutEditorScreen): AbstractLayoutEditorWidget;
    get identifier(): string;
    get settingsFile(): File;
    readSettingsInternal(): WidgetSettings;
    writeSettings(var1: WidgetSettings, var2: T): void;
    writeSettingsInternal(widgetInstance: AbstractLayoutEditorWidget): void;
  }


  class LayoutEditorWidgetRegistry {
    static buildWidgetInstances(editor: LayoutEditorScreen): AbstractLayoutEditorWidget[];
    static get builders(): AbstractLayoutEditorWidgetBuilder<any>[];
    static getBuilder(identifier: string): AbstractLayoutEditorWidgetBuilder<any>;
    static isBuilderRegistered(identifier: string): boolean;
    static register(widgetBuilder: AbstractLayoutEditorWidgetBuilder<any>): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget.AbstractLayoutEditorWidget' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SnappingSide extends Enum<SnappingSide> {}
  class SnappingSide extends Enum<SnappingSide> {
    static readonly TOP_LEFT: SnappingSide;
    static readonly TOP_RIGHT: SnappingSide;
    static getByName(name: string): SnappingSide;
    static valueOf(name: string): SnappingSide;
    static values(): SnappingSide[];
  }


  interface ResizingEdge extends Enum<ResizingEdge> {}
  class ResizingEdge extends Enum<ResizingEdge> {
    static readonly LEFT: ResizingEdge;
    static readonly RIGHT: ResizingEdge;
    static readonly TOP: ResizingEdge;
    static readonly BOTTOM: ResizingEdge;
    static valueOf(name: string): ResizingEdge;
    static values(): ResizingEdge[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget.AbstractLayoutEditorWidgetBuilder' {
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  interface WidgetSettings extends PropertyContainer {}
  class WidgetSettings extends PropertyContainer {
    constructor();
    static convertContainerToSettings(container: PropertyContainer): WidgetSettings;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget.widgets.layer' {
  import { AbstractLayoutEditorWidget, AbstractLayoutEditorWidgetBuilder } from 'de.keksuccino.fancymenu.customization.layout.editor.widget';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { WidgetSettings } from 'de.keksuccino.fancymenu.customization.layout.editor.widget.AbstractLayoutEditorWidgetBuilder';

  interface LayerLayoutEditorWidget extends AbstractLayoutEditorWidget {}
  class LayerLayoutEditorWidget extends AbstractLayoutEditorWidget {
    constructor(editor: LayoutEditorScreen, builder: AbstractLayoutEditorWidgetBuilder<any>);
    editorElementAdded(element: AbstractEditorElement): void;
    editorElementOrderChanged(element: AbstractEditorElement, movedUp: boolean): void;
    editorElementRemovedOrHidden(element: AbstractEditorElement): void;
    refresh(): void;
    updateList(keepScroll: boolean): void;
    updateScrollArea(): void;
  }


  interface LayerLayoutEditorWidgetBuilder extends AbstractLayoutEditorWidgetBuilder<LayerLayoutEditorWidget> {}
  class LayerLayoutEditorWidgetBuilder extends AbstractLayoutEditorWidgetBuilder<LayerLayoutEditorWidget> {
    constructor();
    applySettings(editor: LayoutEditorScreen, settings: WidgetSettings, applyTo: LayerLayoutEditorWidget): void;
    buildDefaultInstance(editor: LayoutEditorScreen): LayerLayoutEditorWidget;
    writeSettings(settings: WidgetSettings, widgetInstance: LayerLayoutEditorWidget): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget.widgets.layer.LayerLayoutEditorWidget' {
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { LayerLayoutEditorWidget } from 'de.keksuccino.fancymenu.customization.layout.editor.widget.widgets.layer';
  import { AbstractEditorElement } from 'de.keksuccino.fancymenu.customization.element.editor';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface LayerElementEntry extends ScrollAreaEntry {}
  class LayerElementEntry extends ScrollAreaEntry {
    constructor(parent: ScrollArea, layerWidget: LayerLayoutEditorWidget, element: AbstractEditorElement);
    get buttonHeight(): number;
    get buttonWidth(): number;
    get eyeButtonHeight(): number;
    get eyeButtonWidth(): number;
    get eyeButtonX(): number;
    get eyeButtonY(): number;
    get layerName(): string;
    get layerNameX(): number;
    get layerNameY(): number;
    get maxLayerNameWidth(): number;
    isEyeButtonHovered(): boolean;
    isEyeButtonMouseOver(mouseX: number, mouseY: number): boolean;
    isLayerNameHovered(): boolean;
    isLayerNameMouseOver(mouseX: number, mouseY: number): boolean;
    isMoveDownButtonHovered(): boolean;
    isMoveDownButtonMouseOver(mouseX: number, mouseY: number): boolean;
    isMoveUpButtonHovered(): boolean;
    isMoveUpButtonMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    layerMouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    layerMouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    renderEntry(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface VanillaLayerElementEntry extends ScrollAreaEntry {}
  class VanillaLayerElementEntry extends ScrollAreaEntry {
    constructor(parent: ScrollArea, layerWidget: LayerLayoutEditorWidget);
    get buttonHeight(): number;
    get buttonWidth(): number;
    isMoveTopBottomButtonHovered(): boolean;
    isMoveTopBottomButtonHovered(mouseX: number, mouseY: number): boolean;
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    renderEntry(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface SeparatorEntry extends ScrollAreaEntry {}
  class SeparatorEntry extends ScrollAreaEntry {
    constructor(parent: ScrollArea);
    isMouseOver(mouseX: number, mouseY: number): boolean;
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    renderEntry(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.editor.widget.widgets' {
  import { LayerLayoutEditorWidgetBuilder } from 'de.keksuccino.fancymenu.customization.layout.editor.widget.widgets.layer';

  class LayoutEditorWidgets {
    static readonly LAYERS: LayerLayoutEditorWidgetBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout' {
  import { File } from 'java.io';
  import { List } from 'java.util';
  import { LoadingRequirementContainer } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { PropertyContainerSet, PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { LayoutStatus, OrderedElementCollection } from 'de.keksuccino.fancymenu.customization.layout.Layout';
  import { VanillaWidgetElement } from 'de.keksuccino.fancymenu.customization.element.elements.button.vanillawidget';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { SerializedMenuBackground } from 'de.keksuccino.fancymenu.customization.background';
  import { UniversalLayoutInclusionRule } from 'de.keksuccino.fancymenu.customization.layout.LayoutHandler';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Layout extends LayoutBase {}
  class Layout extends LayoutBase {
    static readonly UNIVERSAL_LAYOUT_IDENTIFIER: string;
    readonly runtimeLayoutIdentifier: string;
    screenIdentifier: string;
    layoutFile: File;
    lastEditedTime: number;
    layoutIndex: number;
    renderElementsBehindVanilla: boolean;
    randomMode: boolean;
    randomGroup: string;
    randomOnlyFirstTime: boolean;
    universalLayoutMenuWhitelist: List;
    universalLayoutMenuBlacklist: List;
    layoutWideLoadingRequirementContainer: LoadingRequirementContainer;
    serializedElements: List;
    serializedVanillaButtonElements: List;
    serializedDeepElements: List;
    legacyLayout: boolean;
    constructor();

    constructor(screen: Screen);

    constructor(screenIdentifier: string);
    buildElementInstances(): OrderedElementCollection;
    static buildForScreen(screen: Screen): Layout;
    static buildForScreen(screenIdentifier: string): Layout;
    static buildUniversal(): Layout;
    buildVanillaButtonElementInstances(): VanillaWidgetElement[];
    copy(): Layout;
    delete(reInitCurrentScreen: boolean): void;
    static deserialize(serialized: PropertyContainerSet, layoutFile: File): Layout;
    get layoutName(): string;
    get status(): LayoutStatus;
    isEnabled(): boolean;
    isUniversalLayout(): boolean;
    layoutWideLoadingRequirementsMet(): boolean;
    saveToFileIfPossible(): boolean;
    serialize(): PropertyContainerSet;
    setEnabled(enabled: boolean, reInitCurrentScreen: boolean): Layout;
    setScreenIdentifier(screenIdentifier: string): Layout;
    setToUniversalLayout(): Layout;
    updateLastEditedTime(): Layout;
  }


  class LayoutBase {
    readonly menuBackgrounds: List;
    preserveBackgroundAspectRatio: boolean;
    openAudio: ResourceSupplier;
    closeAudio: ResourceSupplier;
    forcedScale: number;
    autoScalingWidth: number;
    autoScalingHeight: number;
    customMenuTitle: string;
    preserveScrollListHeaderFooterAspectRatio: boolean;
    repeatScrollListHeaderTexture: boolean;
    repeatScrollListFooterTexture: boolean;
    scrollListHeaderTexture: ResourceSupplier;
    scrollListFooterTexture: ResourceSupplier;
    renderScrollListHeaderShadow: boolean;
    renderScrollListFooterShadow: boolean;
    showScrollListHeaderFooterPreviewInEditor: boolean;
    showScreenBackgroundOverlayOnCustomBackground: boolean;
    applyVanillaBackgroundBlur: boolean;
    readonly openScreenExecutableBlocks: List;
    readonly closeScreenExecutableBlocks: List;
    static convertSectionToBackground(section: PropertyContainer): SerializedMenuBackground;
    static stackLayoutBases(...layouts: LayoutBase[]): LayoutBase;
  }


  class LayoutHandler {
    static readonly LAYOUT_DIR: File;
    static readonly ASSETS_DIR: File;
    static addLayout(layout: Layout, saveToFile: boolean): void;
    static deleteLayout(layout: Layout, reInitCurrentScreen: boolean): void;
    static deserializeLayout(serialized: PropertyContainerSet, layoutFile: File): Layout;
    static deserializeLayoutFilesInDirectory(directory: File): Layout[];
    static get allLayouts(): Layout[];
    static get disabledLayouts(): Layout[];
    static get enabledLayouts(): Layout[];
    static getAllLayoutsForScreenIdentifier(screenIdentifier: string, includeUniversalLayouts: boolean): Layout[];
    static getDisabledLayoutsForScreenIdentifier(screenIdentifier: string): Layout[];
    static getEnabledLayoutsForScreenIdentifier(screenIdentifier: string, includeUniversalLayouts: boolean): Layout[];
    static getLayout(name: string): Layout;
    static init(): void;
    static isLayoutLoaded(runtimeLayoutIdentifier: string): boolean;
    static openLayoutEditor(layout: Layout, layoutTargetScreen: Screen): void;
    static registerUniversalLayoutInclusionRule(rule: UniversalLayoutInclusionRule): string;
    static reloadLayouts(): void;
    static saveLayoutToFile(layout: Layout, saveTo: string): boolean;
    static sortLayoutListByLastEdited(layouts: Layout[], removeNeverEdited: boolean): Layout[];
    static sortLayoutListByLastEdited(layouts: Layout[], removeNeverEdited: boolean, maxLayouts: number): Layout[];
    static sortLayoutListByName(layouts: Layout[]): Layout[];
    static sortLayoutListByStatus(layouts: Layout[], disabledFirst: boolean): Layout[];
    static unregisterUniversalLayoutInclusionRule(identifier: string): void;
  }


  interface ManageLayoutsScreen extends Screen {}
  class ManageLayoutsScreen extends Screen {
    constructor(layouts: Layout[], layoutTargetScreen: Screen, callback: Consumer<Layout[]>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.Layout' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface LayoutStatus extends Enum<LayoutStatus> {}
  class LayoutStatus extends Enum<LayoutStatus> {
    static readonly ENABLED: LayoutStatus;
    static readonly DISABLED: LayoutStatus;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): LayoutStatus[];
    static getByName(name: string): LayoutStatus;
    getByNameInternal(name: string): LayoutStatus;
    static valueOf(name: string): LayoutStatus;
    static values(): LayoutStatus[];
  }


  class OrderedElementCollection {
    foregroundElements: List;
    backgroundElements: List;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.LayoutHandler' {
  class UniversalLayoutInclusionRule {
    includeUniversalLayouts(var1: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.layout.ManageLayoutsScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { Layout } from 'de.keksuccino.fancymenu.customization.layout';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { Consumer } from 'java.util.function';

  interface LayoutScrollEntry extends TextListScrollAreaEntry {}
  class LayoutScrollEntry extends TextListScrollAreaEntry {
    layout: Layout;
    constructor(parent: ScrollArea, layout: Layout, onClick: Consumer<TextListScrollAreaEntry>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener' {
  import { List } from 'java.util';
  import { CustomVariable } from 'de.keksuccino.fancymenu.customization.listener.AbstractListener';
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { GenericExecutableBlock } from 'de.keksuccino.fancymenu.customization.action.blocks';
  import { PropertyContainer, PropertyContainerSet } from 'de.keksuccino.fancymenu.util.properties';

  class AbstractListener {
    constructor(identifier: string);
    createFreshInstance(): ListenerInstance;
    get customVariables(): CustomVariable[];
    get description(): Component[];
    get displayName(): Component;
    get identifier(): string;
    registerInstance(instance: ListenerInstance): void;
    unregisterInstance(identifier: string): void;
    unregisterInstance(instance: ListenerInstance): void;
  }


  class ListenerHandler {
    static readonly LISTENERS_FILE: File;
    static canRegisterListeners: boolean;
    static addInstance(instance: ListenerInstance): void;
    static assertInitialized(): void;
    static get instances(): ListenerInstance[];
    static getInstance(identifier: string): ListenerInstance;
    static init(): void;
    static removeInstance(identifier: string): void;
    static syncChanges(): void;
  }


  class ListenerInstance {
    instanceIdentifier: string;
    readonly parent: AbstractListener;
    constructor(parent: AbstractListener);
    static deserialize(serialized: PropertyContainer): ListenerInstance;
    static deserializeAllFromSet(propertyContainerSet: PropertyContainerSet): ListenerInstance[];
    get actionScript(): GenericExecutableBlock;
    get displayName(): string;
    registerSelfToParent(): void;
    serialize(): PropertyContainer;
    set actionScript(actionScript: GenericExecutableBlock);
    set displayName(displayName: string);
  }


  class ListenerRegistry {
    static get listeners(): AbstractListener[];
    static getListener(identifier: string): AbstractListener;
    static register(listener: AbstractListener): void;
    static registerLegacyIdentifier(legacyIdentifier: string, targetIdentifier: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.gui' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Consumer } from 'java.util.function';
  import { AbstractListener } from 'de.keksuccino.fancymenu.customization.listener';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Boolean } from 'java.lang';

  interface ChooseListenerTypeScreen extends Screen {}
  class ChooseListenerTypeScreen extends Screen {
    constructor(callback: Consumer<AbstractListener>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ManageListenersScreen extends CellScreen {}
  class ManageListenersScreen extends CellScreen {
    constructor(callback: Consumer<boolean>);
    allowEnterForDone(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    shouldCloseOnEsc(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.gui.ChooseListenerTypeScreen' {
  import { TextListScrollAreaEntry, ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { AbstractListener } from 'de.keksuccino.fancymenu.customization.listener';
  import { ChooseListenerTypeScreen } from 'de.keksuccino.fancymenu.customization.listener.gui';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { Component } from 'net.minecraft.network.chat';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Consumer } from 'java.util.function';
  import { Runnable } from 'java.lang';

  interface ListenerScrollEntry extends TextListScrollAreaEntry {}
  class ListenerScrollEntry extends TextListScrollAreaEntry {
    listener: AbstractListener;
    constructor(this$0: ChooseListenerTypeScreen, parent: ScrollArea, text: Component, listDotColor: DrawableColor, onClick: Consumer<TextListScrollAreaEntry>);
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    setDoubleClickAction(action: Runnable): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.gui.ManageListenersScreen' {
  import { RenderCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { ListenerInstance } from 'de.keksuccino.fancymenu.customization.listener';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ListenerInstanceCell extends RenderCell {}
  class ListenerInstanceCell extends RenderCell {
    constructor(instance: ListenerInstance);
    charTyped(codePoint: string, modifiers: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.listeners.helpers' {
  import { List } from 'java.util';
  import { MusicTrackInfo } from 'de.keksuccino.fancymenu.customization.listener.listeners.helpers.MusicTrackInfoHelper';
  import { Sound } from 'net.minecraft.client.resources.sounds';
  import { Minecraft } from 'net.minecraft.client';

  class MusicTrackInfoHelper {
    static extractTrackResourceLocation(sound: Sound): string;
    static findTrackInfo(trackResourceLocation: string, eventResourceLocation: string): MusicTrackInfo;
    static get infoForAllMusicTracks(): MusicTrackInfo[];
  }


  class WorldSessionTracker {
    static captureSnapshot(minecraft: Minecraft): void;
    static clearSession(): void;
    static handleWorldEntered(minecraft: Minecraft): void;
    static handleWorldLeft(minecraft: Minecraft): void;
    static hasPendingEntry(): boolean;
    static prepareSession(worldName: string, worldSavePath: string, iconPath: string, isFirstJoin: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.listeners.helpers.MusicTrackInfoHelper' {
  class MusicTrackInfo {
    resource_location: string;
    display_name: string;
    artist: string;
    duration: string;
    get artist(): string;
    get displayName(): string;
    get durationMillis(): number;
    get normalizedResourcePath(): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.listener.listeners' {
  import { AbstractListener } from 'de.keksuccino.fancymenu.customization.listener';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Component } from 'net.minecraft.network.chat';
  import { List, UUID } from 'java.util';
  import { ScreenCharTypedEvent, ScreenMouseMoveEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Long, Double } from 'java.lang';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Level } from 'net.minecraft.world.level';
  import { Biome } from 'net.minecraft.world.level.biome';
  import { Entity } from 'net.minecraft.world.entity';
  import { EntitySightData } from 'de.keksuccino.fancymenu.customization.listener.listeners.OnEntityStartsBeingInSightListener';
  import { Pre } from 'de.keksuccino.fancymenu.events.screen.ScreenMouseScrollEvent';
  import { Vec3, BlockHitResult } from 'net.minecraft.world.phys';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { LookedBlockData } from 'de.keksuccino.fancymenu.customization.listener.listeners.OnStartLookingAtBlockListener';
  import { LookedEntityData } from 'de.keksuccino.fancymenu.customization.listener.listeners.OnStartLookingAtEntityListener';
  import { SoundInstance } from 'net.minecraft.client.resources.sounds';

  class Listeners {
    static readonly ON_KEY_PRESSED: OnKeyPressedListener;
    static readonly ON_KEY_RELEASED: OnKeyReleasedListener;
    static readonly ON_CHAR_TYPED: OnCharTypedListener;
    static readonly ON_MOUSE_MOVED: OnMouseMovedListener;
    static readonly ON_MOUSE_BUTTON_CLICKED: OnMouseButtonClickedListener;
    static readonly ON_MOUSE_BUTTON_RELEASED: OnMouseButtonReleasedListener;
    static readonly ON_MOUSE_SCROLLED: OnMouseScrolledListener;
    static readonly ON_OPEN_SCREEN: OnOpenScreenListener;
    static readonly ON_CLOSE_SCREEN: OnCloseScreenListener;
    static readonly ON_QUIT_MINECRAFT: OnQuitMinecraftListener;
    static readonly ON_DEATH: OnDeathListener;
    static readonly ON_VARIABLE_UPDATED: OnVariableUpdatedListener;
    static readonly ON_FILE_DOWNLOADED: OnFileDownloadedListener;
    static readonly ON_FILE_SELECTED: OnFileSelectedListener;
    static readonly ON_CHAT_MESSAGE_RECEIVED: OnChatMessageReceivedListener;
    static readonly ON_CHAT_MESSAGE_SENT: OnChatMessageSentListener;
    static readonly ON_EFFECT_GAINED: OnEffectGainedListener;
    static readonly ON_EFFECT_LOST: OnEffectLostListener;
    static readonly ON_EXPERIENCE_CHANGED: OnExperienceChangedListener;
    static readonly ON_DAMAGE_TAKEN: OnDamageTakenListener;
    static readonly ON_STARTED_FREEZING: OnStartedFreezingListener;
    static readonly ON_STOPPED_FREEZING: OnStoppedFreezingListener;
    static readonly ON_FULLY_FROZEN: OnFullyFrozenListener;
    static readonly ON_START_LOOKING_AT_BLOCK: OnStartLookingAtBlockListener;
    static readonly ON_STOP_LOOKING_AT_BLOCK: OnStopLookingAtBlockListener;
    static readonly ON_START_LOOKING_AT_ENTITY: OnStartLookingAtEntityListener;
    static readonly ON_STOP_LOOKING_AT_ENTITY: OnStopLookingAtEntityListener;
    static readonly ON_ENTITY_SPAWNED: OnEntitySpawnedListener;
    static readonly ON_ENTITY_DIED: OnEntityDiedListener;
    static readonly ON_ENTITY_STOPS_BEING_IN_SIGHT: OnEntityStopsBeingInSightListener;
    static readonly ON_ENTITY_STARTS_BEING_IN_SIGHT: OnEntityStartsBeingInSightListener;
    static readonly ON_INTERACTED_WITH_ENTITY: OnInteractedWithEntityListener;
    static readonly ON_ENTITY_MOUNTED: OnEntityMountedListener;
    static readonly ON_ENTITY_UNMOUNTED: OnEntityUnmountedListener;
    static readonly ON_BLOCK_BROKE: OnBlockBrokeListener;
    static readonly ON_BLOCK_PLACED: OnBlockPlacedListener;
    static readonly ON_INTERACTED_WITH_BLOCK: OnInteractedWithBlockListener;
    static readonly ON_STEPPING_ON_BLOCK: OnSteppingOnBlockListener;
    static readonly ON_ENTER_BIOME: OnEnterBiomeListener;
    static readonly ON_LEAVE_BIOME: OnLeaveBiomeListener;
    static readonly ON_ENTER_STRUCTURE: OnEnterStructureListener;
    static readonly ON_LEAVE_STRUCTURE: OnLeaveStructureListener;
    static readonly ON_ENTER_STRUCTURE_HIGH_PRECISION: OnEnterStructureHighPrecisionListener;
    static readonly ON_LEAVE_STRUCTURE_HIGH_PRECISION: OnLeaveStructureHighPrecisionListener;
    static readonly ON_DIMENSION_ENTERED: OnDimensionEnteredListener;
    static readonly ON_START_SWIMMING: OnStartSwimmingListener;
    static readonly ON_STOP_SWIMMING: OnStopSwimmingListener;
    static readonly ON_START_TOUCHING_FLUID: OnStartTouchingFluidListener;
    static readonly ON_STOP_TOUCHING_FLUID: OnStopTouchingFluidListener;
    static readonly ON_MUSIC_TRACK_STARTED: OnMusicTrackStartedListener;
    static readonly ON_MUSIC_TRACK_STOPPED: OnMusicTrackStoppedListener;
    static readonly ON_WORLD_SOUND_TRIGGERED: OnWorldSoundTriggeredListener;
    static readonly ON_WEATHER_CHANGED: OnWeatherChangedListener;
    static readonly ON_STARTED_BURNING: OnStartedBurningListener;
    static readonly ON_STOPPED_BURNING: OnStoppedBurningListener;
    static readonly ON_STARTED_DROWNING: OnStartedDrowningListener;
    static readonly ON_POSITION_CHANGED: OnPositionChangedListener;
    static readonly ON_STARTED_RUNNING: OnStartedRunningListener;
    static readonly ON_STOPPED_RUNNING: OnStoppedRunningListener;
    static readonly ON_JUMP: OnJumpListener;
    static readonly ON_SERVER_JOINED: OnServerJoinedListener;
    static readonly ON_SERVER_LEFT: OnServerLeftListener;
    static readonly ON_WORLD_ENTERED: OnWorldEnteredListener;
    static readonly ON_WORLD_LEFT: OnWorldLeftListener;
    static readonly ON_OTHER_PLAYER_JOINED_WORLD: OnOtherPlayerJoinedWorldListener;
    static readonly ON_OTHER_PLAYER_LEFT_WORLD: OnOtherPlayerLeftWorldListener;
    static readonly ON_OTHER_PLAYER_DIED: OnOtherPlayerDiedListener;
    static readonly ON_ITEM_PICKED_UP: OnItemPickedUpListener;
    static readonly ON_ITEM_DROPPED: OnItemDroppedListener;
    static readonly ON_ITEM_CONSUMED: OnItemConsumedListener;
    static readonly ON_ITEM_USED: OnItemUsedListener;
    static readonly ON_ITEM_BROKE: OnItemBrokeListener;
    static registerAll(): void;
  }


  interface OnBlockBrokeListener extends AbstractListener {}
  class OnBlockBrokeListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onBlockBroke(blockPos: BlockPos, blockState: BlockState, brokeWithItemKey: string): void;
  }


  interface OnBlockPlacedListener extends AbstractListener {}
  class OnBlockPlacedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onBlockPlaced(blockPos: BlockPos, blockState: BlockState): void;
  }


  interface OnCharTypedListener extends AbstractListener {}
  class OnCharTypedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onCharTyped(e: ScreenCharTypedEvent): void;
  }


  interface OnChatMessageReceivedListener extends AbstractListener {}
  class OnChatMessageReceivedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onChatMessageReceived(message: Component, senderUuid: UUID, senderName: Component): void;
  }


  interface OnChatMessageSentListener extends AbstractListener {}
  class OnChatMessageSentListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onChatMessageSent(message: Component): void;
  }


  interface OnCloseScreenListener extends AbstractListener {}
  class OnCloseScreenListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onScreenClosed(screen: Screen): void;
  }


  interface OnDamageTakenListener extends AbstractListener {}
  class OnDamageTakenListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onDamageTaken(damageAmount: number, damageType: string, isFatal: boolean, damageSource: string): void;
  }


  interface OnDeathListener extends AbstractListener {}
  class OnDeathListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    get lastDeathReasonComponent(): string;
    get lastDeathReasonString(): string;
    onDeath(deathReason: Component, daysSurvived: Long, posX: number, posY: number, posZ: number): void;
  }


  interface OnDimensionEnteredListener extends AbstractListener {}
  class OnDimensionEnteredListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onDimensionEntered(dimensionKey: ResourceKey<Level>): void;
  }


  interface OnEffectGainedListener extends AbstractListener {}
  class OnEffectGainedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEffectGained(effectKey: string, effectType: string, effectDurationTicks: number): void;
  }


  interface OnEffectLostListener extends AbstractListener {}
  class OnEffectLostListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEffectLost(effectKey: string, effectType: string): void;
  }


  interface OnEnterBiomeListener extends AbstractListener {}
  class OnEnterBiomeListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onBiomeChanged(biomeKey: ResourceKey<Biome>): void;
  }


  interface OnEnterStructureHighPrecisionListener extends AbstractListener {}
  class OnEnterStructureHighPrecisionListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStructureEntered(structureKey: string): void;
  }


  interface OnEnterStructureListener extends AbstractListener {}
  class OnEnterStructureListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStructureEntered(structureKey: string): void;
  }


  interface OnEntityDiedListener extends AbstractListener {}
  class OnEntityDiedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntityDied(entityKey: string, entityUuid: UUID, posX: number, posY: number, posZ: number, levelKey: string, killerName: string, killerKey: string, killerUuid: string, damageType: string): void;
  }


  interface OnEntityMountedListener extends AbstractListener {}
  class OnEntityMountedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntityMounted(entity: Entity): void;
  }


  interface OnEntitySpawnedListener extends AbstractListener {}
  class OnEntitySpawnedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntitySpawned(entityKey: string, entityUuid: UUID, posX: number, posY: number, posZ: number, levelKey: string): void;
  }


  interface OnEntityStartsBeingInSightListener extends AbstractListener {}
  class OnEntityStartsBeingInSightListener extends AbstractListener {
    constructor(stopListener: OnEntityStopsBeingInSightListener);
    get description(): Component[];
    get displayName(): Component;
    onEntityVisible(entity: Entity, distanceToPlayer: number): void;
    onRenderFrameEnd(): void;
    onRenderFrameStart(): void;
  }


  interface OnEntityStopsBeingInSightListener extends AbstractListener {}
  class OnEntityStopsBeingInSightListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntityStopped(data: EntitySightData): void;
  }


  interface OnEntityUnmountedListener extends AbstractListener {}
  class OnEntityUnmountedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntityUnmounted(entity: Entity): void;
  }


  interface OnExperienceChangedListener extends AbstractListener {}
  class OnExperienceChangedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onExperienceChanged(oldExperience: number, newExperience: number, isLevelUp: boolean): void;
  }


  interface OnFileDownloadedListener extends AbstractListener {}
  class OnFileDownloadedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onFileDownloaded(downloadUrl: string, targetFilePath: string, successful: boolean): void;
  }


  interface OnFileSelectedListener extends AbstractListener {}
  class OnFileSelectedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onFileSelectionResult(selectedFilePath: string, targetFilePath: string, successful: boolean, cancelled: boolean, failureReason: string): void;
  }


  interface OnFullyFrozenListener extends AbstractListener {}
  class OnFullyFrozenListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onFullyFrozen(): void;
  }


  interface OnInteractedWithBlockListener extends AbstractListener {}
  class OnInteractedWithBlockListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onBlockInteracted(blockPos: BlockPos, blockState: BlockState): void;
  }


  interface OnInteractedWithEntityListener extends AbstractListener {}
  class OnInteractedWithEntityListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onEntityInteracted(entity: Entity): void;
  }


  interface OnItemBrokeListener extends AbstractListener {}
  class OnItemBrokeListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onItemBroke(itemKey: string, itemType: string): void;
  }


  interface OnItemConsumedListener extends AbstractListener {}
  class OnItemConsumedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onItemConsumed(itemKey: string): void;
  }


  interface OnItemDroppedListener extends AbstractListener {}
  class OnItemDroppedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onItemDropped(itemKey: string): void;
  }


  interface OnItemPickedUpListener extends AbstractListener {}
  class OnItemPickedUpListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onItemPickedUp(itemKey: string): void;
  }


  interface OnItemUsedListener extends AbstractListener {}
  class OnItemUsedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onItemUsed(itemKey: string, usedOnType: string, entityKey: string, blockKey: string, targetPosX: string, targetPosY: string, targetPosZ: string): void;
  }


  interface OnJumpListener extends AbstractListener {}
  class OnJumpListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onJump(): void;
  }


  interface OnKeyPressedListener extends AbstractListener {}
  class OnKeyPressedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    handleKeyPressed(keycode: number, scancode: number, modifiers: number): void;
  }


  interface OnKeyReleasedListener extends AbstractListener {}
  class OnKeyReleasedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    handleKeyReleased(keycode: number, scancode: number, modifiers: number): void;
  }


  interface OnLeaveBiomeListener extends AbstractListener {}
  class OnLeaveBiomeListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onBiomeLeft(biomeKey: ResourceKey<Biome>): void;
  }


  interface OnLeaveStructureHighPrecisionListener extends AbstractListener {}
  class OnLeaveStructureHighPrecisionListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStructureLeft(structureKey: string): void;
  }


  interface OnLeaveStructureListener extends AbstractListener {}
  class OnLeaveStructureListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStructureLeft(structureKey: string): void;
  }


  interface OnMouseButtonClickedListener extends AbstractListener {}
  class OnMouseButtonClickedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMouseButtonClicked(button: number, mouseX: number, mouseY: number): void;
  }


  interface OnMouseButtonReleasedListener extends AbstractListener {}
  class OnMouseButtonReleasedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMouseButtonReleased(button: number, mouseX: number, mouseY: number): void;
  }


  interface OnMouseMovedListener extends AbstractListener {}
  class OnMouseMovedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMouseMoved(event: ScreenMouseMoveEvent): void;
  }


  interface OnMouseScrolledListener extends AbstractListener {}
  class OnMouseScrolledListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMouseScrolled(event: Pre): void;
  }


  interface OnMusicTrackStartedListener extends AbstractListener {}
  class OnMusicTrackStartedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMusicTrackStarted(trackResourceLocation: string, trackEventLocation: string): void;
  }


  interface OnMusicTrackStoppedListener extends AbstractListener {}
  class OnMusicTrackStoppedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onMusicTrackStopped(trackResourceLocation: string, trackEventLocation: string): void;
  }


  interface OnOpenScreenListener extends AbstractListener {}
  class OnOpenScreenListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onScreenOpened(screen: Screen): void;
  }


  interface OnOtherPlayerDiedListener extends AbstractListener {}
  class OnOtherPlayerDiedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onOtherPlayerDied(playerName: string, playerUuid: UUID, deathPosition: Vec3): void;
  }


  interface OnOtherPlayerJoinedWorldListener extends AbstractListener {}
  class OnOtherPlayerJoinedWorldListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onOtherPlayerJoined(playerName: string, playerUuid: UUID): void;
  }


  interface OnOtherPlayerLeftWorldListener extends AbstractListener {}
  class OnOtherPlayerLeftWorldListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onOtherPlayerLeft(playerName: string, playerUuid: UUID): void;
  }


  interface OnPositionChangedListener extends AbstractListener {}
  class OnPositionChangedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onPositionChanged(oldPosition: BlockPos, newPosition: BlockPos): void;
  }


  interface OnQuitMinecraftListener extends AbstractListener {}
  class OnQuitMinecraftListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onQuitMinecraft(): void;
  }


  interface OnServerJoinedListener extends AbstractListener {}
  class OnServerJoinedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onServerJoined(serverIp: string): void;
  }


  interface OnServerLeftListener extends AbstractListener {}
  class OnServerLeftListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onServerLeft(serverIp: string): void;
  }


  interface OnStartedBurningListener extends AbstractListener {}
  class OnStartedBurningListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartedBurning(): void;
  }


  interface OnStartedDrowningListener extends AbstractListener {}
  class OnStartedDrowningListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartedDrowning(): void;
  }


  interface OnStartedFreezingListener extends AbstractListener {}
  class OnStartedFreezingListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartedFreezing(intensity: number): void;
  }


  interface OnStartedRunningListener extends AbstractListener {}
  class OnStartedRunningListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartedRunning(): void;
  }


  interface OnStartLookingAtBlockListener extends AbstractListener {}
  class OnStartLookingAtBlockListener extends AbstractListener {
    static readonly MAX_LOOK_DISTANCE: number;
    constructor();
    clearCurrentBlock(): void;
    get currentBlockData(): LookedBlockData;
    get description(): Component[];
    get displayName(): Component;
    onLookAtBlock(level: ClientLevel, hitResult: BlockHitResult, distance: number): boolean;
  }


  interface OnStartLookingAtEntityListener extends AbstractListener {}
  class OnStartLookingAtEntityListener extends AbstractListener {
    constructor();
    clearCurrentEntity(): void;
    get currentEntityData(): LookedEntityData;
    get currentEntityUuid(): UUID;
    get description(): Component[];
    get displayName(): Component;
    onLookAtEntity(entity: Entity, distanceToPlayer: number): boolean;
  }


  interface OnStartSwimmingListener extends AbstractListener {}
  class OnStartSwimmingListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartSwimming(fluidKey: string): void;
  }


  interface OnStartTouchingFluidListener extends AbstractListener {}
  class OnStartTouchingFluidListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStartTouchingFluid(fluidKey: string): void;
  }


  interface OnSteppingOnBlockListener extends AbstractListener {}
  class OnSteppingOnBlockListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onSteppedOnBlock(blockPos: BlockPos, blockState: BlockState): void;
  }


  interface OnStopLookingAtBlockListener extends AbstractListener {}
  class OnStopLookingAtBlockListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStopLooking(data: LookedBlockData): void;
  }


  interface OnStopLookingAtEntityListener extends AbstractListener {}
  class OnStopLookingAtEntityListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStopLooking(data: LookedEntityData): void;
  }


  interface OnStoppedBurningListener extends AbstractListener {}
  class OnStoppedBurningListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStoppedBurning(): void;
  }


  interface OnStoppedFreezingListener extends AbstractListener {}
  class OnStoppedFreezingListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStoppedFreezing(): void;
  }


  interface OnStoppedRunningListener extends AbstractListener {}
  class OnStoppedRunningListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStoppedRunning(): void;
  }


  interface OnStopSwimmingListener extends AbstractListener {}
  class OnStopSwimmingListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStopSwimming(fluidKey: string): void;
  }


  interface OnStopTouchingFluidListener extends AbstractListener {}
  class OnStopTouchingFluidListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onStopTouchingFluid(fluidKey: string): void;
  }


  interface OnVariableUpdatedListener extends AbstractListener {}
  class OnVariableUpdatedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onVariableUpdated(varName: string, oldValue: string, newValue: string): void;
  }


  interface OnWeatherChangedListener extends AbstractListener {}
  class OnWeatherChangedListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onWeatherChanged(weatherType: string, canSnow: boolean, canRain: boolean): void;
  }


  interface OnWorldEnteredListener extends AbstractListener {}
  class OnWorldEnteredListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onWorldEntered(worldName: string, worldSavePath: string, worldDifficultyKey: string, cheatsAllowed: string, worldIconPath: string, isFirstJoin: boolean): void;
  }


  interface OnWorldLeftListener extends AbstractListener {}
  class OnWorldLeftListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onWorldLeft(worldName: string, worldSavePath: string, worldDifficultyKey: string, cheatsAllowed: string, worldIconPath: string): void;
  }


  interface OnWorldSoundTriggeredListener extends AbstractListener {}
  class OnWorldSoundTriggeredListener extends AbstractListener {
    constructor();
    get description(): Component[];
    get displayName(): Component;
    onWorldSoundTriggered(sound: SoundInstance, subtitle: Component, audibleRange: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.internal' {
  import { ValuePlaceholderHolder } from 'de.keksuccino.fancymenu.customization.action';
  import { GroupMode } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal.LoadingRequirementGroup';
  import { List, Map } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { RequirementMode } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal.LoadingRequirementInstance';

  interface LoadingRequirementContainer extends ValuePlaceholderHolder {}
  class LoadingRequirementContainer extends ValuePlaceholderHolder {
    identifier: string;
    addGroup(group: LoadingRequirementGroup): boolean;
    addInstance(instance: LoadingRequirementInstance): boolean;
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    copy(unique: boolean): LoadingRequirementContainer;
    createAndAddGroup(identifier: string, mode: GroupMode): LoadingRequirementGroup;
    static deserializeAll(serialized: PropertyContainer): LoadingRequirementContainer[];
    static deserializeToSingleContainer(serialized: PropertyContainer): LoadingRequirementContainer;
    static deserializeWithIdentifier(identifier: string, serialized: PropertyContainer): LoadingRequirementContainer;
    equals(o: any): boolean;
    forceRequirementsMet(forceMet: boolean): LoadingRequirementContainer;
    forceRequirementsNotMet(forceNotMet: boolean): LoadingRequirementContainer;
    get groups(): LoadingRequirementGroup[];
    get instances(): LoadingRequirementInstance[];
    static get requirementCachingDurationMs(): number;
    get valuePlaceholders(): Map<string, Supplier<string>>;
    getGroup(identifier: string): LoadingRequirementGroup;
    groupExists(identifier: string): boolean;
    static isCachingRequirements(): boolean;
    isEmpty(): boolean;
    removeGroup(group: LoadingRequirementGroup): boolean;
    removeGroupByIdentifier(identifier: string): boolean;
    removeInstance(instance: LoadingRequirementInstance): boolean;
    requirementsMet(): boolean;
    serialize(): PropertyContainer;
    serializeToExistingPropertyContainer(target: PropertyContainer): void;
    static stackContainers(...containers: LoadingRequirementContainer[]): LoadingRequirementContainer;
  }


  interface LoadingRequirementGroup extends ValuePlaceholderHolder {}
  class LoadingRequirementGroup extends ValuePlaceholderHolder {
    parent: LoadingRequirementContainer;
    identifier: string;
    mode: GroupMode;
    constructor(identifier: string, mode: GroupMode, parent: LoadingRequirementContainer);
    addInstance(instance: LoadingRequirementInstance): void;
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    copy(unique: boolean): LoadingRequirementGroup;
    static deserializeRequirementGroup(key: string, value: string, parent: LoadingRequirementContainer): LoadingRequirementGroup;
    equals(o: any): boolean;
    get instances(): LoadingRequirementInstance[];
    get valuePlaceholders(): Map<string, Supplier<string>>;
    removeInstance(instance: LoadingRequirementInstance): LoadingRequirementInstance;
    requirementsMet(): boolean;
    static serializeRequirementGroup(group: LoadingRequirementGroup): PropertyContainer;
  }


  interface LoadingRequirementInstance extends ValuePlaceholderHolder {}
  class LoadingRequirementInstance extends ValuePlaceholderHolder {
    parent: LoadingRequirementContainer;
    requirement: LoadingRequirement;
    value: string;
    group: LoadingRequirementGroup;
    mode: RequirementMode;
    instanceIdentifier: string;
    constructor(requirement: LoadingRequirement, value: string, mode: RequirementMode, parent: LoadingRequirementContainer);
    addValuePlaceholder(placeholder: string, replaceWithSupplier: Supplier<string>): void;
    copy(unique: boolean): LoadingRequirementInstance;
    static deserializeRequirementInstance(key: string, value: string, parent: LoadingRequirementContainer): LoadingRequirementInstance;
    equals(o: any): boolean;
    get valuePlaceholders(): Map<string, Supplier<string>>;
    requirementMet(): boolean;
    static serializeRequirementInstance(instance: LoadingRequirementInstance): string[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.internal.LoadingRequirementGroup' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface GroupMode extends Enum<GroupMode> {}
  class GroupMode extends Enum<GroupMode> {
    static readonly AND: GroupMode;
    static readonly OR: GroupMode;
    static getByName(name: string): GroupMode;
    static valueOf(name: string): GroupMode;
    static values(): GroupMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.internal.LoadingRequirementInstance' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RequirementMode extends Enum<RequirementMode> {}
  class RequirementMode extends Enum<RequirementMode> {
    static readonly IF: RequirementMode;
    static readonly IF_NOT: RequirementMode;
    static getByName(name: string): RequirementMode;
    static valueOf(name: string): RequirementMode;
    static values(): RequirementMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement' {
  import { List, LinkedHashMap } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LoadingRequirementInstance } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';

  class LoadingRequirement {
    constructor(uniqueRequirementIdentifier: string);
    canRunAsync(): boolean;
    checkAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get currentInstance(): LoadingRequirementInstance;
    get description(): string[];
    get displayName(): string;
    get identifier(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(var1: string): boolean;
    set currentInstance(instance: LoadingRequirementInstance);
    shouldShowUpInEditorRequirementMenu(editor: LayoutEditorScreen): boolean;
  }


  class LoadingRequirementRegistry {
    static get requirements(): LoadingRequirement[];
    static get requirementsOrderedByCategories(): LinkedHashMap<string, LoadingRequirement[]>;
    static get requirementsWithoutCategory(): LoadingRequirement[];
    static getRequirement(requirementIdentifier: string): LoadingRequirement;
    static register(requirement: LoadingRequirement): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.gui' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LoadingRequirementInstance } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { Key } from 'InputConstants';

  interface IsAnyButtonHoveredRequirement extends LoadingRequirement {}
  class IsAnyButtonHoveredRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsAnyElementHoveredRequirement extends LoadingRequirement {}
  class IsAnyElementHoveredRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsAnyScreenOpenRequirement extends LoadingRequirement {}
  class IsAnyScreenOpenRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsButtonActiveRequirement extends LoadingRequirement {}
  class IsButtonActiveRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsElementFocusedRequirement extends LoadingRequirement {}
  class IsElementFocusedRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsElementHoveredRequirement extends LoadingRequirement {}
  class IsElementHoveredRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsGuiScaleRequirement extends LoadingRequirement {}
  class IsGuiScaleRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsKeyPressedRequirement extends LoadingRequirement {}
  class IsKeyPressedRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    static getKey(keyCode: number): Key;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsLayoutEnabledRequirement extends LoadingRequirement {}
  class IsLayoutEnabledRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsMenuTitleRequirement extends LoadingRequirement {}
  class IsMenuTitleRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.gui.IsKeyPressedRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface IsKeyPressedValueConfigScreen extends StringBuilderScreen {}
  class IsKeyPressedValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.gui.IsMenuTitleRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsMenuTitleValueConfigScreen extends StringBuilderScreen {}
  class IsMenuTitleValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LoadingRequirementInstance } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { IsElementHoveredRequirement, IsElementFocusedRequirement, IsAnyElementHoveredRequirement, IsAnyButtonHoveredRequirement, IsLayoutEnabledRequirement, IsGuiScaleRequirement, IsButtonActiveRequirement, IsMenuTitleRequirement, IsKeyPressedRequirement, IsAnyScreenOpenRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.gui';
  import { IsRealTimeDayRequirement, IsRealTimeHourRequirement, IsRealTimeMinuteRequirement, IsRealTimeMonthRequirement, IsRealTimeSecondRequirement, IsRealTimeWeekDayRequirement, IsRealTimeYearRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.realtime';
  import { FileExistsRequirement, IsOsLinuxRequirement, IsOsMacOSRequirement, IsOsWindowsRequirement, IsInternetConnectionAvailableRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.system';
  import { IsFullscreenRequirement, IsWindowWidthRequirement, IsWindowHeightRequirement, IsWindowWidthBiggerThanRequirement, IsWindowHeightBiggerThanRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.window';
  import { IsAdventureRequirement, IsCreativeRequirement, IsSpectatorRequirement, IsSurvivalRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.gamemode';
  import { IsMultiplayerRequirement, IsSingleplayerRequirement, IsWorldLoadedRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world';
  import { HasPlayerPermissionLevelRequirement, IsPlayerRunningRequirement, IsPlayerSneakingRequirement, IsPlayerSwimmingRequirement, IsPlayerJumpingRequirement, IsPlayerUnderWaterRequirement, IsPlayerInWaterRequirement, IsPlayerInLavaRequirement, IsPlayerInFluidRequirement, IsPlayerRidingEntityRequirement, IsPlayerRidingJumpableEntityRequirement, IsPlayerRidingEntityWithHealthRequirement, IsPlayerInPowderSnowRequirement, WasPlayerInPowderSnowRequirement, IsPlayerWearingPumpkinRequirement, IsPlayerFlyingWithElytraRequirement, IsPlayerCreativeFlyingRequirement, HasPlayerAbsorptionHeartsRequirement, IsPlayerWitheredRequirement, IsPlayerFullyFrozenRequirement, IsPlayerPoisonedRequirement, IsPlayerInBiomeRequirement, IsPlayerInDimensionRequirement, IsEntityNearbyRequirement, IsEffectActiveRequirement, IsAnyEffectActiveRequirement, IsGameModeRequirement, IsDifficultyRequirement, IsRainingRequirement, IsThunderingRequirement, IsClearWeatherRequirement, IsSnowingRequirement, IsPlayerLeftHandedRequirement, IsInventorySlotFilledRequirement, IsHotbarSlotActiveRequirement, IsAttackStrengthWeakenedRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player';

  interface IsLanguageRequirement extends LoadingRequirement {}
  class IsLanguageRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsMcefLoadedRequirement extends LoadingRequirement {}
  class IsMcefLoadedRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsModLoadedRequirement extends LoadingRequirement {}
  class IsModLoadedRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsNumberRequirement extends LoadingRequirement {}
  class IsNumberRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsResourcePackEnabledRequirement extends LoadingRequirement {}
  class IsResourcePackEnabledRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsServerIpRequirement extends LoadingRequirement {}
  class IsServerIpRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsServerOnlineRequirement extends LoadingRequirement {}
  class IsServerOnlineRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsTextRequirement extends LoadingRequirement {}
  class IsTextRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsVariableValueRequirement extends LoadingRequirement {}
  class IsVariableValueRequirement extends LoadingRequirement {
    constructor();
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  class LoadingRequirements {
    static readonly IS_ELEMENT_HOVERED: IsElementHoveredRequirement;
    static readonly IS_ELEMENT_FOCUSED: IsElementFocusedRequirement;
    static readonly IS_ANY_ELEMENT_HOVERED: IsAnyElementHoveredRequirement;
    static readonly IS_ANY_BUTTON_HOVERED: IsAnyButtonHoveredRequirement;
    static readonly IS_LAYOUT_ENABLED: IsLayoutEnabledRequirement;
    static readonly IS_GUI_SCALE: IsGuiScaleRequirement;
    static readonly IS_BUTTON_ACTIVE: IsButtonActiveRequirement;
    static readonly IS_MENU_TITLE: IsMenuTitleRequirement;
    static readonly IS_REAL_TIME_DAY: IsRealTimeDayRequirement;
    static readonly IS_REAL_TIME_HOUR: IsRealTimeHourRequirement;
    static readonly IS_REAL_TIME_MINUTE: IsRealTimeMinuteRequirement;
    static readonly IS_REAL_TIME_MONTH: IsRealTimeMonthRequirement;
    static readonly IS_REAL_TIME_SECOND: IsRealTimeSecondRequirement;
    static readonly IS_REAL_TIME_WEEK_DAY: IsRealTimeWeekDayRequirement;
    static readonly IS_REAL_TIME_YEAR: IsRealTimeYearRequirement;
    static readonly FILE_EXISTS: FileExistsRequirement;
    static readonly IS_OS_LINUX: IsOsLinuxRequirement;
    static readonly IS_OS_MAC_OS: IsOsMacOSRequirement;
    static readonly IS_OS_WINDOWS: IsOsWindowsRequirement;
    static readonly IS_FULLSCREEN: IsFullscreenRequirement;
    static readonly IS_WINDOW_WIDTH: IsWindowWidthRequirement;
    static readonly IS_WINDOW_HEIGHT: IsWindowHeightRequirement;
    static readonly IS_WINDOW_WIDTH_BIGGER_THAN: IsWindowWidthBiggerThanRequirement;
    static readonly IS_WINDOW_HEIGHT_BIGGER_THAN: IsWindowHeightBiggerThanRequirement;
    static readonly IS_ADVENTURE: IsAdventureRequirement;
    static readonly IS_CREATIVE: IsCreativeRequirement;
    static readonly IS_SPECTATOR: IsSpectatorRequirement;
    static readonly IS_SURVIVAL: IsSurvivalRequirement;
    static readonly IS_MULTIPLAYER: IsMultiplayerRequirement;
    static readonly IS_SINGLEPLAYER: IsSingleplayerRequirement;
    static readonly IS_WORLD_LOADED: IsWorldLoadedRequirement;
    static readonly IS_LANGUAGE: IsLanguageRequirement;
    static readonly IS_MOD_LOADED: IsModLoadedRequirement;
    static readonly IS_NUMBER: IsNumberRequirement;
    static readonly IS_TEXT: IsTextRequirement;
    static readonly IS_SERVER_IP: IsServerIpRequirement;
    static readonly IS_SERVER_ONLINE: IsServerOnlineRequirement;
    static readonly IS_RESOURCE_PACK_ENABLED: IsResourcePackEnabledRequirement;
    static readonly HAS_PLAYER_PERMISSION_LEVEL: HasPlayerPermissionLevelRequirement;
    static readonly IS_VARIABLE_VALUE: IsVariableValueRequirement;
    static readonly IS_PLAYER_RUNNING: IsPlayerRunningRequirement;
    static readonly IS_PLAYER_SNEAKING: IsPlayerSneakingRequirement;
    static readonly IS_PLAYER_SWIMMING: IsPlayerSwimmingRequirement;
    static readonly IS_PLAYER_JUMPING: IsPlayerJumpingRequirement;
    static readonly IS_PLAYER_UNDER_WATER: IsPlayerUnderWaterRequirement;
    static readonly IS_PLAYER_IN_WATER: IsPlayerInWaterRequirement;
    static readonly IS_PLAYER_IN_LAVA: IsPlayerInLavaRequirement;
    static readonly IS_PLAYER_IN_FLUID: IsPlayerInFluidRequirement;
    static readonly IS_PLAYER_RIDING_ENTITY: IsPlayerRidingEntityRequirement;
    static readonly IS_PLAYER_RIDING_JUMPABLE_ENTITY: IsPlayerRidingJumpableEntityRequirement;
    static readonly IS_PLAYER_RIDING_ENTITY_WITH_HEALTH: IsPlayerRidingEntityWithHealthRequirement;
    static readonly IS_PLAYER_IN_POWDER_SNOW: IsPlayerInPowderSnowRequirement;
    static readonly WAS_PLAYER_IN_POWDER_SNOW: WasPlayerInPowderSnowRequirement;
    static readonly IS_PLAYER_WEARING_PUMPKIN: IsPlayerWearingPumpkinRequirement;
    static readonly IS_PLAYER_FLYING_WITH_ELYTRA: IsPlayerFlyingWithElytraRequirement;
    static readonly IS_PLAYER_CREATIVE_FLYING: IsPlayerCreativeFlyingRequirement;
    static readonly HAS_PLAYER_ABSORPTION_HEARTS: HasPlayerAbsorptionHeartsRequirement;
    static readonly IS_PLAYER_WITHERED: IsPlayerWitheredRequirement;
    static readonly IS_PLAYER_FULLY_FROZEN: IsPlayerFullyFrozenRequirement;
    static readonly IS_PLAYER_POISONED: IsPlayerPoisonedRequirement;
    static readonly IS_PLAYER_IN_BIOME: IsPlayerInBiomeRequirement;
    static readonly IS_PLAYER_IN_DIMENSION: IsPlayerInDimensionRequirement;
    static readonly IS_ENTITY_NEARBY: IsEntityNearbyRequirement;
    static readonly IS_EFFECT_ACTIVE: IsEffectActiveRequirement;
    static readonly IS_ANY_EFFECT_ACTIVE: IsAnyEffectActiveRequirement;
    static readonly IS_GAME_MODE: IsGameModeRequirement;
    static readonly IS_DIFFICULTY: IsDifficultyRequirement;
    static readonly IS_RAINING: IsRainingRequirement;
    static readonly IS_THUNDERING: IsThunderingRequirement;
    static readonly IS_CLEAR_WEATHER: IsClearWeatherRequirement;
    static readonly IS_SNOWING: IsSnowingRequirement;
    static readonly IS_PLAYER_LEFT_HANDED: IsPlayerLeftHandedRequirement;
    static readonly IS_INVENTORY_SLOT_FILLED: IsInventorySlotFilledRequirement;
    static readonly IS_HOTBAR_SLOT_ACTIVE: IsHotbarSlotActiveRequirement;
    static readonly IS_ATTACK_STRENGTH_WEAKENED: IsAttackStrengthWeakenedRequirement;
    static readonly IS_KEY_PRESSED: IsKeyPressedRequirement;
    static readonly ONLY_ONCE_PER_SESSION: OncePerSessionRequirement;
    static readonly MOUSE_CLICKED: MouseClickedRequirement;
    static readonly IS_INTERNET_CONNECTION_AVAILABLE: IsInternetConnectionAvailableRequirement;
    static readonly IS_MCEF_LOADED: IsMcefLoadedRequirement;
    static readonly IS_ANY_SCREEN_OPEN: IsAnyScreenOpenRequirement;
    static registerAll(): void;
  }


  interface MouseClickedRequirement extends LoadingRequirement {}
  class MouseClickedRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface OncePerSessionRequirement extends LoadingRequirement {}
  class OncePerSessionRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.IsLanguageRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsLanguageValueConfigScreen extends StringBuilderScreen {}
  class IsLanguageValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.IsModLoadedRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsModLoadedValueConfigScreen extends StringBuilderScreen {}
  class IsModLoadedValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.IsNumberRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface IsNumberValueConfigScreen extends StringBuilderScreen {}
  class IsNumberValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
  }


  interface NumberCompareMode extends Enum<NumberCompareMode> {}
  class NumberCompareMode extends Enum<NumberCompareMode> {
    static readonly EQUALS: NumberCompareMode;
    static readonly BIGGER_THAN: NumberCompareMode;
    static readonly SMALLER_THAN: NumberCompareMode;
    static readonly BIGGER_THAN_OR_EQUALS: NumberCompareMode;
    static readonly SMALLER_THAN_OR_EQUALS: NumberCompareMode;
    static getByKey(key: string): NumberCompareMode;
    static valueOf(name: string): NumberCompareMode;
    static values(): NumberCompareMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.IsTextRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface IsTextValueConfigScreen extends StringBuilderScreen {}
  class IsTextValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
  }


  interface TextCompareMode extends Enum<TextCompareMode> {}
  class TextCompareMode extends Enum<TextCompareMode> {
    static readonly EQUALS: TextCompareMode;
    static readonly CONTAINS: TextCompareMode;
    static readonly STARTS_WITH: TextCompareMode;
    static readonly ENDS_WITH: TextCompareMode;
    static getByKey(key: string): TextCompareMode;
    static valueOf(name: string): TextCompareMode;
    static values(): TextCompareMode[];
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.IsVariableValueRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsVariableValueConfigScreen extends StringBuilderScreen {}
  class IsVariableValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.realtime' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';

  interface IsRealTimeDayRequirement extends LoadingRequirement {}
  class IsRealTimeDayRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeHourRequirement extends LoadingRequirement {}
  class IsRealTimeHourRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeMinuteRequirement extends LoadingRequirement {}
  class IsRealTimeMinuteRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeMonthRequirement extends LoadingRequirement {}
  class IsRealTimeMonthRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeSecondRequirement extends LoadingRequirement {}
  class IsRealTimeSecondRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeWeekDayRequirement extends LoadingRequirement {}
  class IsRealTimeWeekDayRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRealTimeYearRequirement extends LoadingRequirement {}
  class IsRealTimeYearRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.system' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';

  interface FileExistsRequirement extends LoadingRequirement {}
  class FileExistsRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsInternetConnectionAvailableRequirement extends LoadingRequirement {}
  class IsInternetConnectionAvailableRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsOsLinuxRequirement extends LoadingRequirement {}
  class IsOsLinuxRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    static isMacOS(): boolean;
    isRequirementMet(value: string): boolean;
    static isWindows(): boolean;
  }


  interface IsOsMacOSRequirement extends LoadingRequirement {}
  class IsOsMacOSRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsOsWindowsRequirement extends LoadingRequirement {}
  class IsOsWindowsRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.window' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';

  interface IsFullscreenRequirement extends LoadingRequirement {}
  class IsFullscreenRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsWindowHeightBiggerThanRequirement extends LoadingRequirement {}
  class IsWindowHeightBiggerThanRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsWindowHeightRequirement extends LoadingRequirement {}
  class IsWindowHeightRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsWindowWidthBiggerThanRequirement extends LoadingRequirement {}
  class IsWindowWidthBiggerThanRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsWindowWidthRequirement extends LoadingRequirement {}
  class IsWindowWidthRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.gamemode' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';

  interface IsAdventureRequirement extends LoadingRequirement {}
  class IsAdventureRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsCreativeRequirement extends LoadingRequirement {}
  class IsCreativeRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsSpectatorRequirement extends LoadingRequirement {}
  class IsSpectatorRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsSurvivalRequirement extends LoadingRequirement {}
  class IsSurvivalRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';

  interface IsMultiplayerRequirement extends LoadingRequirement {}
  class IsMultiplayerRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsSingleplayerRequirement extends LoadingRequirement {}
  class IsSingleplayerRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsWorldLoadedRequirement extends LoadingRequirement {}
  class IsWorldLoadedRequirement extends LoadingRequirement {
    constructor();
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player' {
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { List } from 'java.util';
  import { TextEditorFormattingRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LoadingRequirementInstance } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';

  interface HasPlayerAbsorptionHeartsRequirement extends LoadingRequirement {}
  class HasPlayerAbsorptionHeartsRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface HasPlayerPermissionLevelRequirement extends LoadingRequirement {}
  class HasPlayerPermissionLevelRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsAnyEffectActiveRequirement extends LoadingRequirement {}
  class IsAnyEffectActiveRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsAttackStrengthWeakenedRequirement extends LoadingRequirement {}
  class IsAttackStrengthWeakenedRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsClearWeatherRequirement extends LoadingRequirement {}
  class IsClearWeatherRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsDifficultyRequirement extends LoadingRequirement {}
  class IsDifficultyRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsEffectActiveRequirement extends LoadingRequirement {}
  class IsEffectActiveRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsEntityNearbyRequirement extends LoadingRequirement {}
  class IsEntityNearbyRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsGameModeRequirement extends LoadingRequirement {}
  class IsGameModeRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsHotbarSlotActiveRequirement extends LoadingRequirement {}
  class IsHotbarSlotActiveRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsInventorySlotFilledRequirement extends LoadingRequirement {}
  class IsInventorySlotFilledRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerCreativeFlyingRequirement extends LoadingRequirement {}
  class IsPlayerCreativeFlyingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerFlyingWithElytraRequirement extends LoadingRequirement {}
  class IsPlayerFlyingWithElytraRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerFullyFrozenRequirement extends LoadingRequirement {}
  class IsPlayerFullyFrozenRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInBiomeRequirement extends LoadingRequirement {}
  class IsPlayerInBiomeRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInDimensionRequirement extends LoadingRequirement {}
  class IsPlayerInDimensionRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    editValue(parentScreen: Screen, requirementInstance: LoadingRequirementInstance): void;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInFluidRequirement extends LoadingRequirement {}
  class IsPlayerInFluidRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInLavaRequirement extends LoadingRequirement {}
  class IsPlayerInLavaRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInPowderSnowRequirement extends LoadingRequirement {}
  class IsPlayerInPowderSnowRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerInWaterRequirement extends LoadingRequirement {}
  class IsPlayerInWaterRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerJumpingRequirement extends LoadingRequirement {}
  class IsPlayerJumpingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerLeftHandedRequirement extends LoadingRequirement {}
  class IsPlayerLeftHandedRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerPoisonedRequirement extends LoadingRequirement {}
  class IsPlayerPoisonedRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerRidingEntityRequirement extends LoadingRequirement {}
  class IsPlayerRidingEntityRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerRidingEntityWithHealthRequirement extends LoadingRequirement {}
  class IsPlayerRidingEntityWithHealthRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerRidingJumpableEntityRequirement extends LoadingRequirement {}
  class IsPlayerRidingJumpableEntityRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerRunningRequirement extends LoadingRequirement {}
  class IsPlayerRunningRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerSneakingRequirement extends LoadingRequirement {}
  class IsPlayerSneakingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerSwimmingRequirement extends LoadingRequirement {}
  class IsPlayerSwimmingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerUnderWaterRequirement extends LoadingRequirement {}
  class IsPlayerUnderWaterRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerWearingPumpkinRequirement extends LoadingRequirement {}
  class IsPlayerWearingPumpkinRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsPlayerWitheredRequirement extends LoadingRequirement {}
  class IsPlayerWitheredRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsRainingRequirement extends LoadingRequirement {}
  class IsRainingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsSnowingRequirement extends LoadingRequirement {}
  class IsSnowingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface IsThunderingRequirement extends LoadingRequirement {}
  class IsThunderingRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }


  interface WasPlayerInPowderSnowRequirement extends LoadingRequirement {}
  class WasPlayerInPowderSnowRequirement extends LoadingRequirement {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueDisplayName(): string;
    get valueFormattingRules(): TextEditorFormattingRule[];
    get valuePreset(): string;
    hasValue(): boolean;
    isRequirementMet(value: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsDifficultyRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsDifficultyValueConfigScreen extends StringBuilderScreen {}
  class IsDifficultyValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsEffectActiveRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsEffectActiveValueConfigScreen extends StringBuilderScreen {}
  class IsEffectActiveValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsEntityNearbyRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsEntityNearbyValueConfigScreen extends StringBuilderScreen {}
  class IsEntityNearbyValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsGameModeRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsGameModeValueConfigScreen extends StringBuilderScreen {}
  class IsGameModeValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsPlayerInBiomeRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsPlayerInBiomeValueConfigScreen extends StringBuilderScreen {}
  class IsPlayerInBiomeValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.requirements.world.player.IsPlayerInDimensionRequirement' {
  import { StringBuilderScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface IsPlayerInDimensionValueConfigScreen extends StringBuilderScreen {}
  class IsPlayerInDimensionValueConfigScreen extends StringBuilderScreen {
    buildString(): string;
    keyPressed($$0: number, $$1: number, $$2: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number, $$1: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.ui' {
  import { QueueableNotificationScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.queueable';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { LoadingRequirementContainer, LoadingRequirementGroup, LoadingRequirementInstance } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AsyncRequirementErrorScreen extends QueueableNotificationScreen {}
  class AsyncRequirementErrorScreen extends QueueableNotificationScreen {
    constructor(requirementName: Component);
  }


  interface BuildRequirementGroupScreen extends Screen {}
  class BuildRequirementGroupScreen extends Screen {
    constructor(parentScreen: Screen, parent: LoadingRequirementContainer, groupToEdit: LoadingRequirementGroup, callback: Consumer<LoadingRequirementGroup>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface BuildRequirementScreen extends Screen {}
  class BuildRequirementScreen extends Screen {
    constructor(parentScreen: Screen, parent: LoadingRequirementContainer, instanceToEdit: LoadingRequirementInstance, callback: Consumer<LoadingRequirementInstance>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ManageRequirementsScreen extends Screen {}
  class ManageRequirementsScreen extends Screen {
    constructor(container: LoadingRequirementContainer, callback: Consumer<LoadingRequirementContainer>);
    onClose(): void;
    render(graphics: GuiGraphics, p_93658_: number, p_93659_: number, p_93660_: number): void;
    render(graphics: GuiGraphics, p_93658_: number, p_93659_: number, p_93660_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.ui.BuildRequirementScreen' {
  import { TextListScrollAreaEntry, ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { LoadingRequirement } from 'de.keksuccino.fancymenu.customization.loadingrequirement';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { Component } from 'net.minecraft.network.chat';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Consumer } from 'java.util.function';

  interface RequirementScrollEntry extends TextListScrollAreaEntry {}
  class RequirementScrollEntry extends TextListScrollAreaEntry {
    requirement: LoadingRequirement;
    constructor(parent: ScrollArea, text: Component, listDotColor: DrawableColor, onClick: Consumer<TextListScrollAreaEntry>);
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.loadingrequirement.ui.ManageRequirementsScreen' {
  import { ScrollAreaEntry, TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { LoadingRequirementInstance, LoadingRequirementGroup } from 'de.keksuccino.fancymenu.customization.loadingrequirement.internal';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';

  interface RequirementInstanceEntry extends ScrollAreaEntry {}
  class RequirementInstanceEntry extends ScrollAreaEntry {
    static readonly HEADER_FOOTER_HEIGHT: number;
    instance: LoadingRequirementInstance;
    readonly lineHeight: number;
    font: Font;
    constructor(parent: ScrollArea, instance: LoadingRequirementInstance, lineHeight: number);
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface RequirementGroupEntry extends TextListScrollAreaEntry {}
  class RequirementGroupEntry extends TextListScrollAreaEntry {
    static readonly HEADER_FOOTER_HEIGHT: number;
    group: LoadingRequirementGroup;
    constructor(parent: ScrollArea, group: LoadingRequirementGroup);
  }

}

declare module 'de.keksuccino.fancymenu.customization.overlay' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Boolean, Integer } from 'java.lang';
  import { InitOrResizeScreenCompletedEvent, AfterScreenRenderingEvent, ScreenKeyPressedEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { MenuBar } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Supplier } from 'java.util.function';
  import { DebugOverlaySpacerLine, LinePosition, DebugOverlayLine } from 'de.keksuccino.fancymenu.customization.overlay.DebugOverlay';
  import { Component } from 'net.minecraft.network.chat';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { NarrationPriority } from 'NarratableEntry';
  import { List } from 'java.util';

  class CustomizationOverlay {
    static get currentDebugOverlayInstance(): DebugOverlay;
    static get currentMenuBarInstance(): CustomizationOverlayMenuBar;
    static init(): void;
    static isOverlayVisible(currentScreen: Screen): boolean;
    onInitScreenPost(e: InitOrResizeScreenCompletedEvent): void;
    onRenderPost(e: AfterScreenRenderingEvent): void;
    onScreenKeyPressed(e: ScreenKeyPressedEvent): void;
    static rebuildDebugOverlay(): void;
    static rebuildOverlay(): void;
    static registerOverlayVisibilityController(visibilityController: ConsumingSupplier<Screen, boolean>): string;
    static unregisterOverlayVisibilityController(identifier: string): void;
  }


  interface CustomizationOverlayMenuBar extends MenuBar {}
  class CustomizationOverlayMenuBar extends MenuBar {
    allowRender: boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface DebugOverlay extends Renderable, NarratableEntry, ContainerEventHandler {}
  class DebugOverlay extends Renderable {
    allowRender: boolean;
    constructor();
    addLine(identifier: string, position: LinePosition, textSupplier: ConsumingSupplier<DebugOverlayLine, Component>): DebugOverlayLine;
    addLine<T extends DebugOverlayLine>(line: T): T;
    addLineAfter(addAfterIdentifier: string, identifier: string, position: LinePosition, textSupplier: ConsumingSupplier<DebugOverlayLine, Component>): DebugOverlayLine;
    addLineAfter<T extends DebugOverlayLine>(addAfterIdentifier: string, line: T): T;
    addLineAt(index: number, identifier: string, position: LinePosition, textSupplier: ConsumingSupplier<DebugOverlayLine, Component>): DebugOverlayLine;
    addLineAt<T extends DebugOverlayLine>(index: number, line: T): T;
    addLineBefore(addBeforeIdentifier: string, identifier: string, position: LinePosition, textSupplier: ConsumingSupplier<DebugOverlayLine, Component>): DebugOverlayLine;
    addLineBefore<T extends DebugOverlayLine>(addBeforeIdentifier: string, line: T): T;
    addSpacerLine(identifier: string, position: LinePosition, height: number): DebugOverlaySpacerLine;
    addSpacerLineAfter(addAfterIdentifier: string, identifier: string, position: LinePosition, height: number): DebugOverlaySpacerLine;
    addSpacerLineAt(index: number, identifier: string, position: LinePosition, height: number): DebugOverlaySpacerLine;
    addSpacerLineBefore(addBeforeIdentifier: string, identifier: string, position: LinePosition, height: number): DebugOverlaySpacerLine;
    children(): GuiEventListener[];
    closeRightClickContextMenu(): DebugOverlay;
    get focused(): GuiEventListener;
    getLine(identifier: string): DebugOverlayLine;
    indexOfLine(identifier: string): number;
    isDragging(): boolean;
    isFocused(): boolean;
    lineExists(identifier: string): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narrationPriority(): NarrationPriority;
    openRightClickContextMenu(menu: ContextMenu): DebugOverlay;
    removeLine(identifier: string): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetOverlay(): DebugOverlay;
    set focused(var1: boolean);
    setBottomYOffsetSupplier(yOffsetSupplier: Supplier<number>): DebugOverlay;
    setDragging(var1: boolean): void;
    setFocused(var1: GuiEventListener): void;
    setFont(font: Font): DebugOverlay;
    setLineBackgroundColor(color: DrawableColor): DebugOverlay;
    setLineBorderWidth(width: number): DebugOverlay;
    setLineSpacerHeight(height: number): DebugOverlay;
    setLineTextColor(color: DrawableColor): DebugOverlay;
    setLineTextShadow(shadow: boolean): DebugOverlay;
    setTopYOffsetSupplier(yOffsetSupplier: Supplier<number>): DebugOverlay;
    updateNarration(var1: NarrationElementOutput): void;
  }


  class DebugOverlayBuilder {
    static buildDebugOverlay(menuBar: MenuBar): DebugOverlay;
  }

}

declare module 'de.keksuccino.fancymenu.customization.overlay.DebugOverlay' {
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class DebugOverlayLine {
    get identifier(): string;
    get position(): LinePosition;
    get textSupplier(): ConsumingSupplier<DebugOverlayLine, Component>;
    isHovered(): boolean;
    recentlyClicked(): boolean;
    set position(position: LinePosition);
    set textSupplier(textSupplier: ConsumingSupplier<DebugOverlayLine, Component>);
    setClickAction(clickAction: Consumer<DebugOverlayLine>): DebugOverlayLine;
  }


  interface LinePosition extends Enum<LinePosition> {}
  class LinePosition extends Enum<LinePosition> {
    static readonly TOP_LEFT: LinePosition;
    static readonly TOP_RIGHT: LinePosition;
    static readonly BOTTOM_LEFT: LinePosition;
    static readonly BOTTOM_RIGHT: LinePosition;
    static valueOf(name: string): LinePosition;
    static values(): LinePosition[];
  }


  interface DebugOverlaySpacerLine extends DebugOverlayLine {}
  class DebugOverlaySpacerLine extends DebugOverlayLine {
  }

}

declare module 'de.keksuccino.fancymenu.customization.panorama' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { File } from 'java.io';
  import { List } from 'java.util';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';

  interface LocalTexturePanoramaRenderer extends Renderable {}
  class LocalTexturePanoramaRenderer extends Renderable {
    propertiesFile: File;
    panoramaImageDir: File;
    overlayImageFile: File;
    readonly panoramaImageSuppliers: List;
    overlayTextureSupplier: ResourceSupplier;
    opacity: number;
    static build(propertiesFile: File, panoramaImageDir: File, overlayImageFile: File): LocalTexturePanoramaRenderer;
    get name(): string;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setAngle(angle: number): void;
    setFov(fov: number): void;
    setSpeed(speed: number): void;
  }


  class PanoramaHandler {
    static readonly PANORAMA_DIR: File;
    static get panoramaNames(): string[];
    static get panoramas(): LocalTexturePanoramaRenderer[];
    static getPanorama(name: string): LocalTexturePanoramaRenderer;
    static init(): void;
    onMenuReload(e: ModReloadEvent): void;
    static panoramaExists(name: string): boolean;
    static updatePanoramas(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder' {
  import { QueueableScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.queueable';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { HashMap, Map, List } from 'java.util';
  import { LayoutEditorScreen } from 'de.keksuccino.fancymenu.customization.layout.editor';
  import { ParsedPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.PlaceholderParser';

  interface AsyncPlaceholderErrorScreen extends QueueableScreen {}
  class AsyncPlaceholderErrorScreen extends QueueableScreen {
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }


  class DeserializedPlaceholderString {
    placeholderIdentifier: string;
    values: HashMap;
    placeholderString: string;
    constructor();

    constructor(placeholderIdentifier: string, values: HashMap<string, string>, placeholderString: string);
    static build(placeholderIdentifier: string, values: Map<string, string>): DeserializedPlaceholderString;
    toString(): string;
  }


  class Placeholder {
    constructor(id: string);
    canRunAsync(): boolean;
    checkAsync(): boolean;
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get identifier(): string;
    get valueNames(): string[];
    getReplacementFor(var1: DeserializedPlaceholderString): string;
    onRegistered(): void;
    shouldShowUpInPlaceholderMenu(editor: LayoutEditorScreen): boolean;
  }


  class PlaceholderParser {
    static containsPlaceholders(inParameter: string, checkForVariableReferences: boolean, checkForFormattingCodes: boolean): boolean;
    static containsPlaceholders(inParameter: string, checkForVariableReferences: boolean): boolean;
    static findPlaceholders(inParameter: string, parsed: HashMap<string, string>, replaceFormattingCodes: boolean): ParsedPlaceholder[];
    static get placeholderCachingDurationMs(): number;
    static isCachingPlaceholders(): boolean;
    static replacePlaceholders(inParameter: string): string;
    static replacePlaceholders(inParameter: string, replaceFormattingCodes: boolean): string;
    static replaceVariableReferences(inParameter: string): string;
  }


  class PlaceholderRegistry {
    static get placeholders(): Placeholder[];
    static getPlaceholder(identifier: string): Placeholder;
    static register(placeholder: Placeholder): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.PlaceholderParser' {
  import { HashMap } from 'java.util';
  import { Placeholder } from 'de.keksuccino.fancymenu.customization.placeholder';

  class ParsedPlaceholder {
    readonly placeholderString: string;
    readonly startIndex: number;
    readonly endIndex: number;
    equals(obj: any): boolean;
    get identifier(): string;
    get placeholder(): Placeholder;
    get replacement(): string;
    get values(): HashMap<string, string>;
    hasValues(): boolean;
    hashCode(): number;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.advanced' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';

  interface AbsoluteNumberPlaceholder extends Placeholder {}
  class AbsoluteNumberPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface CalculatorPlaceholder extends Placeholder {}
  class CalculatorPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ClientSideNbtDataGetPlaceholder extends Placeholder {}
  class ClientSideNbtDataGetPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface CropTextPlaceholder extends Placeholder {}
  class CropTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface FileMd5Placeholder extends Placeholder {}
  class FileMd5Placeholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface FileSizePlaceholder extends Placeholder {}
  class FileSizePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface FileTextPlaceholder extends Placeholder {}
  class FileTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface GetVariablePlaceholder extends Placeholder {}
  class GetVariablePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface JsonPlaceholder extends Placeholder {}
  class JsonPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
    static onReload(e: ModReloadEvent): void;
    run(): void;
  }


  interface LocalizationPlaceholder extends Placeholder {}
  class LocalizationPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface LowercaseTextPlaceholder extends Placeholder {}
  class LowercaseTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathCeilPlaceholder extends Placeholder {}
  class MathCeilPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathCoshPlaceholder extends Placeholder {}
  class MathCoshPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathCosPlaceholder extends Placeholder {}
  class MathCosPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathFloorPlaceholder extends Placeholder {}
  class MathFloorPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathPiPlaceholder extends Placeholder {}
  class MathPiPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathRoundPlaceholder extends Placeholder {}
  class MathRoundPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathSignPlaceholder extends Placeholder {}
  class MathSignPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathSinhPlaceholder extends Placeholder {}
  class MathSinhPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathSinPlaceholder extends Placeholder {}
  class MathSinPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathTanhPlaceholder extends Placeholder {}
  class MathTanhPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MathTanPlaceholder extends Placeholder {}
  class MathTanPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MaxNumberPlaceholder extends Placeholder {}
  class MaxNumberPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MinNumberPlaceholder extends Placeholder {}
  class MinNumberPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface NegateNumberPlaceholder extends Placeholder {}
  class NegateNumberPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface NumberBaseConvertPlaceholder extends Placeholder {}
  class NumberBaseConvertPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RandomNumberPlaceholder extends Placeholder {}
  class RandomNumberPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ReplaceTextPlaceholder extends Placeholder {}
  class ReplaceTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ServerSideNbtDataGetPlaceholder extends Placeholder {}
  class ServerSideNbtDataGetPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
    static handleServerResponse(placeholderKey: string, value: string): void;
  }


  interface SplitTextPlaceholder extends Placeholder {}
  class SplitTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface StringifyPlaceholder extends Placeholder {}
  class StringifyPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface SwitchCasePlaceholder extends Placeholder {}
  class SwitchCasePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface TrimTextPlaceholder extends Placeholder {}
  class TrimTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface UppercaseTextPlaceholder extends Placeholder {}
  class UppercaseTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.audio' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface AudioDurationPlaceholder extends Placeholder {}
  class AudioDurationPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AudioElementVolumePlaceholder extends Placeholder {}
  class AudioElementVolumePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AudioPlayingStatePlaceholder extends Placeholder {}
  class AudioPlayingStatePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AudioPlaytimePlaceholder extends Placeholder {}
  class AudioPlaytimePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AudioTrackPlaceholder extends Placeholder {}
  class AudioTrackPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.client' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface LastWorldOrServerPlaceholder extends Placeholder {}
  class LastWorldOrServerPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface LoadedModsPlaceholder extends Placeholder {}
  class LoadedModsPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MinecraftOptionValuePlaceholder extends Placeholder {}
  class MinecraftOptionValuePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MinecraftVersionPlaceholder extends Placeholder {}
  class MinecraftVersionPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ModLoaderNamePlaceholder extends Placeholder {}
  class ModLoaderNamePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ModLoaderVersionPlaceholder extends Placeholder {}
  class ModLoaderVersionPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ModVersionPlaceholder extends Placeholder {}
  class ModVersionPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface TotalModsPlaceholder extends Placeholder {}
  class TotalModsPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldLoadProgressPlaceholder extends Placeholder {}
  class WorldLoadProgressPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.gui' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface CurrentScreenIdentifierPlaceholder extends Placeholder {}
  class CurrentScreenIdentifierPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ElementHeightPlaceholder extends Placeholder {}
  class ElementHeightPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ElementPosXPlaceholder extends Placeholder {}
  class ElementPosXPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ElementPosYPlaceholder extends Placeholder {}
  class ElementPosYPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ElementWidthPlaceholder extends Placeholder {}
  class ElementWidthPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface GuiScalePlaceholder extends Placeholder {}
  class GuiScalePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MousePosXPlaceholder extends Placeholder {}
  class MousePosXPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MousePosYPlaceholder extends Placeholder {}
  class MousePosYPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScreenHeightPlaceholder extends Placeholder {}
  class ScreenHeightPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScreenWidthPlaceholder extends Placeholder {}
  class ScreenWidthPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VanillaButtonLabelPlaceholder extends Placeholder {}
  class VanillaButtonLabelPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List, Map } from 'java.util';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';

  interface AbsolutePathPlaceholder extends Placeholder {}
  class AbsolutePathPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ClipboardContentPlaceholder extends Placeholder {}
  class ClipboardContentPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface FpsPlaceholder extends Placeholder {}
  class FpsPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface GpuInfoPlaceholder extends Placeholder {}
  class GpuInfoPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface JavaVersionPlaceholder extends Placeholder {}
  class JavaVersionPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface JvmNamePlaceholder extends Placeholder {}
  class JvmNamePlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface OpenGLVersionPlaceholder extends Placeholder {}
  class OpenGLVersionPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface OSNamePlaceholder extends Placeholder {}
  class OSNamePlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RandomTextPlaceholder extends Placeholder {}
  class RandomTextPlaceholder extends Placeholder {
    static randomTextIntervals: Map;
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface TextCharacterCountPlaceholder extends Placeholder {}
  class TextCharacterCountPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface TextWidthPlaceholder extends Placeholder {}
  class TextWidthPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface UptimeDurationPlaceholder extends Placeholder {}
  class UptimeDurationPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
    onRegistered(): void;
  }


  interface WebTextPlaceholder extends Placeholder {}
  class WebTextPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
    static onReload(e: ModReloadEvent): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other.cpu' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface CpuInfoPlaceholder extends Placeholder {}
  class CpuInfoPlaceholder extends Placeholder {
    constructor();
    get alternativeIdentifiers(): string[];
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface JvmCpuUsagePlaceholder extends Placeholder {}
  class JvmCpuUsagePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface OsCpuUsagePlaceholder extends Placeholder {}
  class OsCpuUsagePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other.ram' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface MaxRamPlaceholder extends Placeholder {}
  class MaxRamPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PercentRamPlaceholder extends Placeholder {}
  class PercentRamPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface UsedRamPlaceholder extends Placeholder {}
  class UsedRamPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other.RandomTextPlaceholder' {
  class RandomTextPackage {
    currentText: string;
    lastChange: number;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders' {
  import { MinecraftVersionPlaceholder, ModLoaderVersionPlaceholder, ModLoaderNamePlaceholder, ModVersionPlaceholder, LoadedModsPlaceholder, TotalModsPlaceholder, WorldLoadProgressPlaceholder, MinecraftOptionValuePlaceholder, LastWorldOrServerPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.client';
  import { ScreenWidthPlaceholder, ScreenHeightPlaceholder, CurrentScreenIdentifierPlaceholder, ElementWidthPlaceholder, ElementHeightPlaceholder, ElementPosXPlaceholder, ElementPosYPlaceholder, MousePosXPlaceholder, MousePosYPlaceholder, GuiScalePlaceholder, VanillaButtonLabelPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.gui';
  import { PlayerNamePlaceholder, PlayerUuidPlaceholder, LastDeathMessagePlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.player';
  import { ServerMotdPlaceholder, ServerPingPlaceholder, ServerVersionPlaceholder, ServerPlayerCountPlaceholder, ServerStatusPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.server';
  import { RealtimeYearPlaceholder, RealtimeMonthPlaceholder, RealtimeDayPlaceholder, RealtimeHourPlaceholder, RealtimeMinutePlaceholder, RealtimeSecondPlaceholder, UnixTimestampPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.realtime';
  import { StringifyPlaceholder, JsonPlaceholder, GetVariablePlaceholder, LocalizationPlaceholder, CalculatorPlaceholder, RandomNumberPlaceholder, MaxNumberPlaceholder, MinNumberPlaceholder, AbsoluteNumberPlaceholder, NegateNumberPlaceholder, MathPiPlaceholder, MathSinPlaceholder, MathSinhPlaceholder, MathCosPlaceholder, MathCoshPlaceholder, MathTanPlaceholder, MathTanhPlaceholder, SplitTextPlaceholder, TrimTextPlaceholder, UppercaseTextPlaceholder, LowercaseTextPlaceholder, CropTextPlaceholder, MathCeilPlaceholder, MathFloorPlaceholder, MathRoundPlaceholder, NumberBaseConvertPlaceholder, MathSignPlaceholder, SwitchCasePlaceholder, ReplaceTextPlaceholder, ClientSideNbtDataGetPlaceholder, ServerSideNbtDataGetPlaceholder, FileTextPlaceholder, FileSizePlaceholder, FileMd5Placeholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.advanced';
  import { PercentRamPlaceholder, UsedRamPlaceholder, MaxRamPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other.ram';
  import { RandomTextPlaceholder, WebTextPlaceholder, AbsolutePathPlaceholder, FpsPlaceholder, GpuInfoPlaceholder, JavaVersionPlaceholder, JvmNamePlaceholder, OpenGLVersionPlaceholder, OSNamePlaceholder, UptimeDurationPlaceholder, TextCharacterCountPlaceholder, TextWidthPlaceholder, ClipboardContentPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other';
  import { JvmCpuUsagePlaceholder, OsCpuUsagePlaceholder, CpuInfoPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.other.cpu';
  import { ActiveHotbarSlotPlaceholder, CurrentPlayerHealthPlaceholder, GameTimePlaceholder, SlotItemPlaceholder, WorldDayTimePlaceholder, WorldDayTimeHourPlaceholder, WorldDayTimeMinutePlaceholder, WorldDifficultyPlaceholder, MaxPlayerHealthPlaceholder, CurrentPlayerHealthPercentagePlaceholder, CurrentPlayerAbsorptionHealthPlaceholder, MaxPlayerAbsorptionHealthPlaceholder, CurrentPlayerAbsorptionHealthPercentagePlaceholder, CurrentPlayerHungerPlaceholder, MaxPlayerHungerPlaceholder, CurrentPlayerHungerPercentagePlaceholder, CurrentPlayerArmorPlaceholder, MaxPlayerArmorPlaceholder, CurrentPlayerArmorPercentagePlaceholder, CurrentPlayerExpProgressPlaceholder, CurrentPlayerExperiencePlaceholder, CurrentPlayerLevelPlaceholder, CurrentMountHealthPlaceholder, MaxMountHealthPlaceholder, CurrentMountHealthPercentagePlaceholder, CurrentMountJumpMeterPlaceholder, CurrentBossHealthPlaceholder, BossNamePlaceholder, BossCountPlaceholder, ActiveEffectsCountPlaceholder, ActiveEffectPlaceholder, CurrentTitlePlaceholder, PlayerXCoordinatePlaceholder, PlayerYCoordinatePlaceholder, PlayerZCoordinatePlaceholder, CurrentServerIpPlaceholder, PlayerAttackStrengthPercentagePlaceholder, PlayerGamemodePlaceholder, PlayerViewDirectionPlaceholder, CurrentPlayerOxygenPlaceholder, MaxPlayerOxygenPlaceholder, CurrentPlayerOxygenPercentagePlaceholder, WorldPlayersListPlaceholder, PlayerHasTagPlaceholder, PlayerTagsListPlaceholder, WorldSaveNamesPlaceholder, WorldSaveDataPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.world';
  import { AudioElementVolumePlaceholder, AudioTrackPlaceholder, AudioDurationPlaceholder, AudioPlaytimePlaceholder, AudioPlayingStatePlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.audio';
  import { VideoElementVolumePlaceholder, VideoElementDurationPlaceholder, VideoElementPausedStatePlaceholder, VideoElementPlaytimePlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.video.element';
  import { VideoMenuBackgroundVolumePlaceholder, VideoMenuBackgroundDurationPlaceholder, VideoMenuBackgroundPausedStatePlaceholder, VideoMenuBackgroundPlaytimePlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.video.background';
  import { ScoreboardPlayerTeamPlaceholder, ScoreboardScorePlaceholder, ScoreboardObjectivesListPlaceholder, ScoreboardTrackedPlayersPlaceholder, ScoreboardDisplaySlotPlaceholder, ScoreboardHasScorePlaceholder, ScoreboardObjectiveDisplayNamePlaceholder, ScoreboardObjectiveCriteriaPlaceholder, ScoreboardObjectiveRenderTypePlaceholder, ScoreboardPlayerScoresListPlaceholder, ScoreboardObjectiveCountPlaceholder } from 'de.keksuccino.fancymenu.customization.placeholder.placeholders.scoreboard';

  class Placeholders {
    static readonly MINECRAFT_VERSION: MinecraftVersionPlaceholder;
    static readonly MOD_LOADER_VERSION: ModLoaderVersionPlaceholder;
    static readonly MOD_LOADER_NAME: ModLoaderNamePlaceholder;
    static readonly MOD_VERSION: ModVersionPlaceholder;
    static readonly LOADED_MODS: LoadedModsPlaceholder;
    static readonly TOTAL_MODS: TotalModsPlaceholder;
    static readonly WORLD_LOAD_PROGRESS: WorldLoadProgressPlaceholder;
    static readonly MINECRAFT_OPTION_VALUE: MinecraftOptionValuePlaceholder;
    static readonly SCREEN_WIDTH: ScreenWidthPlaceholder;
    static readonly SCREEN_HEIGHT: ScreenHeightPlaceholder;
    static readonly CURRENT_SCREEN_IDENTIFIER: CurrentScreenIdentifierPlaceholder;
    static readonly ELEMENT_WIDTH: ElementWidthPlaceholder;
    static readonly ELEMENT_HEIGHT: ElementHeightPlaceholder;
    static readonly ELEMENT_POS_X: ElementPosXPlaceholder;
    static readonly ELEMENT_POS_Y: ElementPosYPlaceholder;
    static readonly MOUSE_POS_X: MousePosXPlaceholder;
    static readonly MOUSE_POS_Y: MousePosYPlaceholder;
    static readonly GUI_SCALE: GuiScalePlaceholder;
    static readonly VANILLA_BUTTON_LABEL: VanillaButtonLabelPlaceholder;
    static readonly PLAYER_NAME: PlayerNamePlaceholder;
    static readonly PLAYER_UUID: PlayerUuidPlaceholder;
    static readonly LAST_DEATH_MESSAGE: LastDeathMessagePlaceholder;
    static readonly SERVER_MOTD: ServerMotdPlaceholder;
    static readonly SERVER_PING: ServerPingPlaceholder;
    static readonly SERVER_VERSION: ServerVersionPlaceholder;
    static readonly SERVER_PLAYER_COUNT: ServerPlayerCountPlaceholder;
    static readonly SERVER_STATUS: ServerStatusPlaceholder;
    static readonly REALTIME_YEAR: RealtimeYearPlaceholder;
    static readonly REALTIME_MONTH: RealtimeMonthPlaceholder;
    static readonly REALTIME_DAY: RealtimeDayPlaceholder;
    static readonly REALTIME_HOUR: RealtimeHourPlaceholder;
    static readonly REALTIME_MINUTE: RealtimeMinutePlaceholder;
    static readonly REALTIME_SECOND: RealtimeSecondPlaceholder;
    static readonly UNIX_TIMESTAMP: UnixTimestampPlaceholder;
    static readonly STRINGIFY: StringifyPlaceholder;
    static readonly JSON: JsonPlaceholder;
    static readonly GET_VARIABLE: GetVariablePlaceholder;
    static readonly LOCALIZATION: LocalizationPlaceholder;
    static readonly CALCULATOR: CalculatorPlaceholder;
    static readonly RANDOM_NUMBER: RandomNumberPlaceholder;
    static readonly MAX_NUMBER: MaxNumberPlaceholder;
    static readonly MIN_NUMBER: MinNumberPlaceholder;
    static readonly ABSOLUTE_NUMBER: AbsoluteNumberPlaceholder;
    static readonly NEGATE_NUMBER: NegateNumberPlaceholder;
    static readonly MATH_PI: MathPiPlaceholder;
    static readonly MATH_SIN: MathSinPlaceholder;
    static readonly MATH_SINH: MathSinhPlaceholder;
    static readonly MATH_COS: MathCosPlaceholder;
    static readonly MATH_COSH: MathCoshPlaceholder;
    static readonly MATH_TAN: MathTanPlaceholder;
    static readonly MATH_TANH: MathTanhPlaceholder;
    static readonly PERCENT_RAM: PercentRamPlaceholder;
    static readonly USED_RAM: UsedRamPlaceholder;
    static readonly MAX_RAM: MaxRamPlaceholder;
    static readonly RANDOM_TEXT: RandomTextPlaceholder;
    static readonly WEB_TEXT: WebTextPlaceholder;
    static readonly ABSOLUTE_PATH: AbsolutePathPlaceholder;
    static readonly JVM_CPU_USAGE: JvmCpuUsagePlaceholder;
    static readonly OS_CPU_USAGE: OsCpuUsagePlaceholder;
    static readonly CPU_INFO: CpuInfoPlaceholder;
    static readonly FPS: FpsPlaceholder;
    static readonly GPU_INFO: GpuInfoPlaceholder;
    static readonly JAVA_VERSION: JavaVersionPlaceholder;
    static readonly JVM_NAME: JvmNamePlaceholder;
    static readonly OPEN_GL_VERSION: OpenGLVersionPlaceholder;
    static readonly OS_NAME: OSNamePlaceholder;
    static readonly UPTIME_DURATION: UptimeDurationPlaceholder;
    static readonly ACTIVE_HOTBAR_SLOT: ActiveHotbarSlotPlaceholder;
    static readonly CURRENT_PLAYER_HEALTH: CurrentPlayerHealthPlaceholder;
    static readonly GAME_TIME: GameTimePlaceholder;
    static readonly SLOT_ITEM: SlotItemPlaceholder;
    static readonly WORLD_DAY_TIME: WorldDayTimePlaceholder;
    static readonly WORLD_DAY_TIME_HOUR: WorldDayTimeHourPlaceholder;
    static readonly WORLD_DAY_TIME_MINUTE: WorldDayTimeMinutePlaceholder;
    static readonly WORLD_DIFFICULTY: WorldDifficultyPlaceholder;
    static readonly MAX_PLAYER_HEALTH: MaxPlayerHealthPlaceholder;
    static readonly CURRENT_PLAYER_HEALTH_PERCENTAGE: CurrentPlayerHealthPercentagePlaceholder;
    static readonly CURRENT_PLAYER_ABSORPTION_HEALTH: CurrentPlayerAbsorptionHealthPlaceholder;
    static readonly MAX_PLAYER_ABSORPTION_HEALTH: MaxPlayerAbsorptionHealthPlaceholder;
    static readonly CURRENT_PLAYER_ABSORPTION_HEALTH_PERCENTAGE: CurrentPlayerAbsorptionHealthPercentagePlaceholder;
    static readonly CURRENT_PLAYER_HUNGER: CurrentPlayerHungerPlaceholder;
    static readonly MAX_PLAYER_HUNGER: MaxPlayerHungerPlaceholder;
    static readonly CURRENT_PLAYER_HUNGER_PERCENTAGE: CurrentPlayerHungerPercentagePlaceholder;
    static readonly CURRENT_PLAYER_ARMOR: CurrentPlayerArmorPlaceholder;
    static readonly MAX_PLAYER_ARMOR: MaxPlayerArmorPlaceholder;
    static readonly CURRENT_PLAYER_ARMOR_PERCENTAGE: CurrentPlayerArmorPercentagePlaceholder;
    static readonly CURRENT_PLAYER_EXP_PROGRESS: CurrentPlayerExpProgressPlaceholder;
    static readonly CURRENT_PLAYER_EXPERIENCE: CurrentPlayerExperiencePlaceholder;
    static readonly CURRENT_PLAYER_LEVEL: CurrentPlayerLevelPlaceholder;
    static readonly CURRENT_MOUNT_HEALTH: CurrentMountHealthPlaceholder;
    static readonly MAX_MOUNT_HEALTH: MaxMountHealthPlaceholder;
    static readonly CURRENT_MOUNT_HEALTH_PERCENTAGE: CurrentMountHealthPercentagePlaceholder;
    static readonly CURRENT_MOUNT_JUMP_METER: CurrentMountJumpMeterPlaceholder;
    static readonly CURRENT_BOSS_HEALTH: CurrentBossHealthPlaceholder;
    static readonly BOSS_NAME: BossNamePlaceholder;
    static readonly BOSS_COUNT: BossCountPlaceholder;
    static readonly ACTIVE_EFFECTS_COUNT: ActiveEffectsCountPlaceholder;
    static readonly ACTIVE_EFFECT: ActiveEffectPlaceholder;
    static readonly CURRENT_TITLE: CurrentTitlePlaceholder;
    static readonly PLAYER_X_COORDINATE: PlayerXCoordinatePlaceholder;
    static readonly PLAYER_Y_COORDINATE: PlayerYCoordinatePlaceholder;
    static readonly PLAYER_Z_COORDINATE: PlayerZCoordinatePlaceholder;
    static readonly CURRENT_SERVER_IP: CurrentServerIpPlaceholder;
    static readonly PLAYER_ATTACK_STRENGTH_PERCENTAGE: PlayerAttackStrengthPercentagePlaceholder;
    static readonly PLAYER_GAMEMODE: PlayerGamemodePlaceholder;
    static readonly PLAYER_VIEW_DIRECTION: PlayerViewDirectionPlaceholder;
    static readonly AUDIO_ELEMENT_VOLUME: AudioElementVolumePlaceholder;
    static readonly SPLIT_TEXT: SplitTextPlaceholder;
    static readonly TRIM_TEXT: TrimTextPlaceholder;
    static readonly UPPERCASE_TEXT: UppercaseTextPlaceholder;
    static readonly LOWERCASE_TEXT: LowercaseTextPlaceholder;
    static readonly CROP_TEXT: CropTextPlaceholder;
    static readonly MATH_CEIL: MathCeilPlaceholder;
    static readonly MATH_FLOOR: MathFloorPlaceholder;
    static readonly MATH_ROUND: MathRoundPlaceholder;
    static readonly NUMBER_BASE_CONVERT: NumberBaseConvertPlaceholder;
    static readonly MATH_SIGN: MathSignPlaceholder;
    static readonly SWITCH_CASE: SwitchCasePlaceholder;
    static readonly REPLACE_TEXT: ReplaceTextPlaceholder;
    static readonly AUDIO_ELEMENT_TRACK: AudioTrackPlaceholder;
    static readonly AUDIO_ELEMENT_DURATION: AudioDurationPlaceholder;
    static readonly AUDIO_ELEMENT_PLAYTIME: AudioPlaytimePlaceholder;
    static readonly AUDIO_ELEMENT_PLAYING_STATE: AudioPlayingStatePlaceholder;
    static readonly CURRENT_PLAYER_OXYGEN: CurrentPlayerOxygenPlaceholder;
    static readonly MAX_PLAYER_OXYGEN: MaxPlayerOxygenPlaceholder;
    static readonly CURRENT_PLAYER_OXYGEN_PERCENTAGE: CurrentPlayerOxygenPercentagePlaceholder;
    static readonly LAST_WORLD_OR_SERVER: LastWorldOrServerPlaceholder;
    static readonly VIDEO_ELEMENT_VOLUME: VideoElementVolumePlaceholder;
    static readonly VIDEO_ELEMENT_DURATION: VideoElementDurationPlaceholder;
    static readonly VIDEO_ELEMENT_PAUSED_STATE: VideoElementPausedStatePlaceholder;
    static readonly VIDEO_ELEMENT_PLAYTIME: VideoElementPlaytimePlaceholder;
    static readonly VIDEO_MENU_BACKGROUND_VOLUME: VideoMenuBackgroundVolumePlaceholder;
    static readonly VIDEO_MENU_BACKGROUND_DURATION: VideoMenuBackgroundDurationPlaceholder;
    static readonly VIDEO_MENU_BACKGROUND_PAUSED_STATE: VideoMenuBackgroundPausedStatePlaceholder;
    static readonly VIDEO_MENU_BACKGROUND_PLAYTIME: VideoMenuBackgroundPlaytimePlaceholder;
    static readonly TEXT_CHARACTER_COUNT: TextCharacterCountPlaceholder;
    static readonly TEXT_WIDTH: TextWidthPlaceholder;
    static readonly CLIPBOARD_CONTENT: ClipboardContentPlaceholder;
    static readonly SCOREBOARD_PLAYER_TEAM: ScoreboardPlayerTeamPlaceholder;
    static readonly NBT_DATA_GET: ClientSideNbtDataGetPlaceholder;
    static readonly NBT_DATA_GET_SERVER: ServerSideNbtDataGetPlaceholder;
    static readonly WORLD_PLAYERS_LIST: WorldPlayersListPlaceholder;
    static readonly SCOREBOARD_SCORE: ScoreboardScorePlaceholder;
    static readonly SCOREBOARD_OBJECTIVES_LIST: ScoreboardObjectivesListPlaceholder;
    static readonly SCOREBOARD_TRACKED_PLAYERS: ScoreboardTrackedPlayersPlaceholder;
    static readonly SCOREBOARD_DISPLAY_SLOT: ScoreboardDisplaySlotPlaceholder;
    static readonly SCOREBOARD_HAS_SCORE: ScoreboardHasScorePlaceholder;
    static readonly SCOREBOARD_OBJECTIVE_DISPLAY_NAME: ScoreboardObjectiveDisplayNamePlaceholder;
    static readonly SCOREBOARD_OBJECTIVE_CRITERIA: ScoreboardObjectiveCriteriaPlaceholder;
    static readonly SCOREBOARD_OBJECTIVE_RENDER_TYPE: ScoreboardObjectiveRenderTypePlaceholder;
    static readonly SCOREBOARD_PLAYER_SCORES_LIST: ScoreboardPlayerScoresListPlaceholder;
    static readonly SCOREBOARD_OBJECTIVE_COUNT: ScoreboardObjectiveCountPlaceholder;
    static readonly PLAYER_HAS_TAG: PlayerHasTagPlaceholder;
    static readonly PLAYER_TAGS_LIST: PlayerTagsListPlaceholder;
    static readonly FILE_TEXT: FileTextPlaceholder;
    static readonly LEVEL_SAVE_NAMES: WorldSaveNamesPlaceholder;
    static readonly LEVEL_SAVE_DATA: WorldSaveDataPlaceholder;
    static readonly FILE_SIZE: FileSizePlaceholder;
    static readonly FILE_MD5: FileMd5Placeholder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.player' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface LastDeathMessagePlaceholder extends Placeholder {}
  class LastDeathMessagePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerNamePlaceholder extends Placeholder {}
  class PlayerNamePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerUuidPlaceholder extends Placeholder {}
  class PlayerUuidPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.realtime' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface RealtimeDayPlaceholder extends Placeholder {}
  class RealtimeDayPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RealtimeHourPlaceholder extends Placeholder {}
  class RealtimeHourPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RealtimeMinutePlaceholder extends Placeholder {}
  class RealtimeMinutePlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RealtimeMonthPlaceholder extends Placeholder {}
  class RealtimeMonthPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RealtimeSecondPlaceholder extends Placeholder {}
  class RealtimeSecondPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface RealtimeYearPlaceholder extends Placeholder {}
  class RealtimeYearPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface UnixTimestampPlaceholder extends Placeholder {}
  class UnixTimestampPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.scoreboard' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface ScoreboardDisplaySlotPlaceholder extends Placeholder {}
  class ScoreboardDisplaySlotPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardHasScorePlaceholder extends Placeholder {}
  class ScoreboardHasScorePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardObjectiveCountPlaceholder extends Placeholder {}
  class ScoreboardObjectiveCountPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardObjectiveCriteriaPlaceholder extends Placeholder {}
  class ScoreboardObjectiveCriteriaPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardObjectiveDisplayNamePlaceholder extends Placeholder {}
  class ScoreboardObjectiveDisplayNamePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardObjectiveRenderTypePlaceholder extends Placeholder {}
  class ScoreboardObjectiveRenderTypePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardObjectivesListPlaceholder extends Placeholder {}
  class ScoreboardObjectivesListPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardPlayerScoresListPlaceholder extends Placeholder {}
  class ScoreboardPlayerScoresListPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardPlayerTeamPlaceholder extends Placeholder {}
  class ScoreboardPlayerTeamPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardScorePlaceholder extends Placeholder {}
  class ScoreboardScorePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ScoreboardTrackedPlayersPlaceholder extends Placeholder {}
  class ScoreboardTrackedPlayersPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.server' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface ServerMotdPlaceholder extends Placeholder {}
  class ServerMotdPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ServerPingPlaceholder extends Placeholder {}
  class ServerPingPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ServerPlayerCountPlaceholder extends Placeholder {}
  class ServerPlayerCountPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ServerStatusPlaceholder extends Placeholder {}
  class ServerStatusPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ServerVersionPlaceholder extends Placeholder {}
  class ServerVersionPlaceholder extends Placeholder {
    constructor();
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.video.background' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface VideoMenuBackgroundDurationPlaceholder extends Placeholder {}
  class VideoMenuBackgroundDurationPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoMenuBackgroundPausedStatePlaceholder extends Placeholder {}
  class VideoMenuBackgroundPausedStatePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoMenuBackgroundPlaytimePlaceholder extends Placeholder {}
  class VideoMenuBackgroundPlaytimePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoMenuBackgroundVolumePlaceholder extends Placeholder {}
  class VideoMenuBackgroundVolumePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.video.element' {
  import { Placeholder, DeserializedPlaceholderString } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface VideoElementDurationPlaceholder extends Placeholder {}
  class VideoElementDurationPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoElementPausedStatePlaceholder extends Placeholder {}
  class VideoElementPausedStatePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoElementPlaytimePlaceholder extends Placeholder {}
  class VideoElementPlaytimePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface VideoElementVolumePlaceholder extends Placeholder {}
  class VideoElementVolumePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.placeholder.placeholders.world' {
  import { DeserializedPlaceholderString, Placeholder } from 'de.keksuccino.fancymenu.customization.placeholder';
  import { List } from 'java.util';

  interface AbstractWorldFloatPlaceholder extends AbstractWorldPlaceholder {}
  class AbstractWorldFloatPlaceholder extends AbstractWorldPlaceholder {
    constructor(identifier: string);
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AbstractWorldIntegerPlaceholder extends AbstractWorldPlaceholder {}
  class AbstractWorldIntegerPlaceholder extends AbstractWorldPlaceholder {
    constructor(identifier: string);
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AbstractWorldPercentagePlaceholder extends AbstractWorldPlaceholder {}
  class AbstractWorldPercentagePlaceholder extends AbstractWorldPlaceholder {
    constructor(identifier: string);
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface AbstractWorldPlaceholder extends Placeholder {}
  class AbstractWorldPlaceholder extends Placeholder {
    constructor(identifier: string);
    canRunAsync(): boolean;
    get category(): string;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
  }


  interface ActiveEffectPlaceholder extends Placeholder {}
  class ActiveEffectPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface ActiveEffectsCountPlaceholder extends AbstractWorldIntegerPlaceholder {}
  class ActiveEffectsCountPlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface ActiveHotbarSlotPlaceholder extends Placeholder {}
  class ActiveHotbarSlotPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface BossCountPlaceholder extends Placeholder {}
  class BossCountPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface BossNamePlaceholder extends Placeholder {}
  class BossNamePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface CurrentBossHealthPlaceholder extends Placeholder {}
  class CurrentBossHealthPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface CurrentMountHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentMountHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentMountHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentMountHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentMountJumpMeterPlaceholder extends AbstractWorldIntegerPlaceholder {}
  class CurrentMountJumpMeterPlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface CurrentPlayerAbsorptionHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentPlayerAbsorptionHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentPlayerAbsorptionHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerAbsorptionHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentPlayerArmorPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentPlayerArmorPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentPlayerArmorPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerArmorPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentPlayerExperiencePlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerExperiencePlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentPlayerExpProgressPlaceholder extends AbstractWorldIntegerPlaceholder {}
  class CurrentPlayerExpProgressPlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface CurrentPlayerHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentPlayerHealthPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentPlayerHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentPlayerHungerPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentPlayerHungerPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentPlayerHungerPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerHungerPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentPlayerLevelPlaceholder extends AbstractWorldIntegerPlaceholder {}
  class CurrentPlayerLevelPlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface CurrentPlayerOxygenPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {}
  class CurrentPlayerOxygenPercentagePlaceholder extends AbstractWorldPercentagePlaceholder {
    constructor();
  }


  interface CurrentPlayerOxygenPlaceholder extends AbstractWorldFloatPlaceholder {}
  class CurrentPlayerOxygenPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface CurrentServerIpPlaceholder extends Placeholder {}
  class CurrentServerIpPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface CurrentTitlePlaceholder extends Placeholder {}
  class CurrentTitlePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface GameTimePlaceholder extends Placeholder {}
  class GameTimePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface MaxMountHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxMountHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface MaxPlayerAbsorptionHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxPlayerAbsorptionHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface MaxPlayerArmorPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxPlayerArmorPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface MaxPlayerHealthPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxPlayerHealthPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface MaxPlayerHungerPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxPlayerHungerPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface MaxPlayerOxygenPlaceholder extends AbstractWorldFloatPlaceholder {}
  class MaxPlayerOxygenPlaceholder extends AbstractWorldFloatPlaceholder {
    constructor();
  }


  interface PlayerAttackStrengthPercentagePlaceholder extends AbstractWorldIntegerPlaceholder {}
  class PlayerAttackStrengthPercentagePlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface PlayerGamemodePlaceholder extends Placeholder {}
  class PlayerGamemodePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerHasTagPlaceholder extends Placeholder {}
  class PlayerHasTagPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerTagsListPlaceholder extends Placeholder {}
  class PlayerTagsListPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerViewDirectionPlaceholder extends Placeholder {}
  class PlayerViewDirectionPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface PlayerXCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {}
  class PlayerXCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface PlayerYCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {}
  class PlayerYCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface PlayerZCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {}
  class PlayerZCoordinatePlaceholder extends AbstractWorldIntegerPlaceholder {
    constructor();
  }


  interface SlotItemPlaceholder extends Placeholder {}
  class SlotItemPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldDayTimeHourPlaceholder extends Placeholder {}
  class WorldDayTimeHourPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldDayTimeMinutePlaceholder extends Placeholder {}
  class WorldDayTimeMinutePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldDayTimePlaceholder extends Placeholder {}
  class WorldDayTimePlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldDifficultyPlaceholder extends Placeholder {}
  class WorldDifficultyPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldPlayersListPlaceholder extends Placeholder {}
  class WorldPlayersListPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldSaveDataPlaceholder extends Placeholder {}
  class WorldSaveDataPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }


  interface WorldSaveNamesPlaceholder extends Placeholder {}
  class WorldSaveNamesPlaceholder extends Placeholder {
    constructor();
    canRunAsync(): boolean;
    get category(): string;
    get defaultPlaceholderString(): DeserializedPlaceholderString;
    get description(): string[];
    get displayName(): string;
    get valueNames(): string[];
    getReplacementFor(dps: DeserializedPlaceholderString): string;
  }

}

declare module 'de.keksuccino.fancymenu.customization.screen.dummyscreen' {
  import { Component } from 'net.minecraft.network.chat';
  import { Supplier } from 'java.util.function';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';

  class DummyScreenBuilder {
    constructor(screenIdentifier: string, screenDisplayName: Component, screenProvider: Supplier<Screen>);
    get screenDescriptionSupplier(): Supplier<Component[]>;
    get screenDisplayName(): Component;
    get screenIdentifier(): string;
    get screenProvider(): Supplier<Screen>;
    set screenDescriptionSupplier(description: Supplier<Component[]>);
    tryConstruct(): Screen;
  }


  class DummyScreenRegistry {
    static get builders(): DummyScreenBuilder[];
    static getBuilderFor(screenIdentifier: string): DummyScreenBuilder;
    static register(builder: DummyScreenBuilder): void;
  }


  class DummyScreens {
    static readonly LEVEL_LOADING_SCREEN_DUMMY: DummyScreenBuilder;
    static readonly GENERIC_DIRT_MESSAGE_SCREEN_DUMMY: DummyScreenBuilder;
    static readonly PROGRESS_SCREEN_DUMMY: DummyScreenBuilder;
    static readonly CONNECT_SCREEN_DUMMY: DummyScreenBuilder;
    static readonly RECEIVING_LEVEL_SCREEN_DUMMY: DummyScreenBuilder;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Supplier } from 'java.util.function';

  interface ExecuteOnRenderScreen extends Screen {}
  class ExecuteOnRenderScreen extends Screen {
    render($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }


  class ScreenInstanceFactory {
    static getScreenProvider(screenClassPath: string): Supplier<Screen>;
    static registerScreenProvider(screenClassPath: string, provider: Supplier<Screen>): void;
    static tryConstruct(screenClassPathOrIdentifier: string): Screen;
  }

}

declare module 'de.keksuccino.fancymenu.customization.screen.identifier' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';

  class ScreenIdentifierHandler {
    static equalIdentifiers(firstScreenIdentifier: string, secondScreenIdentifier: string): boolean;
    static getBestIdentifier(screenIdentifier: string): string;
    static getIdentifierOfScreen(screen: Screen): string;
    static isIdentifierOfScreen(screenIdentifier: string, screen: Screen): boolean;
    static isValidIdentifier(screenIdentifier: string): boolean;
    static tryConvertToNonUniversal(screenIdentifier: string): string;
    static tryFixInvalidIdentifierWithNonUniversal(potentiallyInvalidScreenIdentifier: string): string;
  }


  class UniversalScreenIdentifierRegistry {
    static get universalIdentifiers(): string[];
    static getScreenForUniversalIdentifier(universalIdentifier: string): string;
    static getUniversalIdentifierFor(screenClassPath: string): string;
    static getUniversalIdentifierFor(screen: Screen): string;
    static register(universalIdentifier: string, targetScreenClassPath: string): void;
    static tryGetUniversalIdentifierFor(screenClassPath: string): string;
    static universalIdentifierExists(identifier: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization' {
  import { File } from 'java.io';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScreenBlacklistRule } from 'de.keksuccino.fancymenu.customization.ScreenCustomization';
  import { List } from 'java.util';
  import { ModReloadEvent, ScreenReloadEvent } from 'de.keksuccino.fancymenu.events';
  import { CloseScreenEvent, InitOrResizeScreenStartingEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Pre } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';

  class ScreenCustomization {
    static readonly CUSTOMIZABLE_MENUS_FILE: File;
    static addScreenBlacklistRule(rule: ScreenBlacklistRule): void;
    static disableCustomizationForAllScreens(): void;
    static generateUniqueIdentifier(): string;
    static get screenBlacklistRules(): ScreenBlacklistRule[];
    static getAbsoluteGameDirectoryPath(path: string): string;
    static getPathWithoutGameDirectory(path: string): string;
    static init(): void;
    static isCustomizationEnabledForScreen(screen: Screen): boolean;
    static isCustomizationEnabledForScreen(screen: Screen, ignoreAllowScreenCustomization: boolean): boolean;
    static isExistingGameDirectoryPath(path: string): boolean;
    static isNewMenu(): boolean;
    static isScreenBlacklisted(screen: Screen): boolean;
    static isScreenBlacklisted(screenClassPath: string): boolean;
    static isScreenCustomizationEnabled(): boolean;
    static onPreGameRenderTick(): void;
    static onSwitchingToNewScreenType(newScreen: Screen, lastScreen: Screen): void;
    static reInitCurrentScreen(): void;
    static reInitCurrentScreen(resetScale: boolean, setScreenOnFirstInit: boolean): void;
    static readCustomizableScreensFromFile(): void;
    static reloadCurrentScreen(): void;
    static reloadFancyMenu(): void;
    static setCustomizationForScreenEnabled(screen: Screen, enabled: boolean): void;
    static setIsNewMenu(b: boolean): void;
    static setScreenCustomizationEnabled(enabled: boolean): void;
  }


  class ScreenCustomizationEvents {
    onCloseScreen(e: CloseScreenEvent): void;
    onInitStarting(e: InitOrResizeScreenStartingEvent): void;
    onModReloaded(e: ModReloadEvent): void;
    onSoftReload(e: ScreenReloadEvent): void;
    onTick(e: Pre): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.ScreenCustomization' {
  class ScreenBlacklistRule {
    isScreenBlacklisted(var1: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.server' {
  import { ServerData } from 'net.minecraft.client.multiplayer';

  class ServerCache {
    static cacheServer(server: ServerData, serverUpdated: ServerData): void;
    static clear(): void;
    static getServer(ip: string): ServerData;
    static init(): void;
    static pingServers(): void;
    static removeServer(ip: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.slideshow' {
  import { List } from 'java.util';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { File } from 'java.io';
  import { ModReloadEvent } from 'de.keksuccino.fancymenu.events';

  class ExternalTextureSlideshowRenderer {
    images: List;
    overlayTexture: ResourceSupplier;
    dir: string;
    width: number;
    height: number;
    x: number;
    y: number;
    slideshowOpacity: number;
    constructor(slideshowDir: string);
    get imageCount(): number;
    get imageHeight(): number;
    get imageWidth(): number;
    get name(): string;
    isReady(): boolean;
    prepareSlideshow(): void;
    render(graphics: GuiGraphics): void;
    setDuration(duration: number): void;
    setFadeSpeed(speed: number): void;
  }


  class SlideshowHandler {
    static readonly SLIDESHOW_DIR: File;
    static get slideshowNames(): string[];
    static get slideshows(): ExternalTextureSlideshowRenderer[];
    static getSlideshow(identifier: string): ExternalTextureSlideshowRenderer;
    static init(): void;
    onMenuReload(e: ModReloadEvent): void;
    static slideshowExists(identifier: string): boolean;
    static updateSlideshows(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.variables' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { InitialWidgetFocusScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  interface ManageVariablesScreen extends InitialWidgetFocusScreen, Screen {}
  class ManageVariablesScreen extends InitialWidgetFocusScreen {
    constructor(callback: Consumer<Variable[]>);
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  class Variable {
    constructor(name: string);
    static deserialize(c: PropertyContainer): Variable;
    get name(): string;
    get value(): string;
    isResetOnLaunch(): boolean;
    serialize(): PropertyContainer;
    set value(value: string);
    setResetOnLaunch(resetOnLaunch: boolean): void;
  }


  class VariableHandler {
    static clearVariables(): void;
    static get variableNames(): string[];
    static get variables(): Variable[];
    static getVariable(name: string): Variable;
    static init(): void;
    static removeVariable(name: string): void;
    static setVariable(name: string, value: string): void;
    static variableExists(name: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.customization.variables.ManageVariablesScreen' {
  import { TextListScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { Variable } from 'de.keksuccino.fancymenu.customization.variables';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { Consumer } from 'java.util.function';

  interface VariableScrollEntry extends TextListScrollAreaEntry {}
  class VariableScrollEntry extends TextListScrollAreaEntry {
    variable: Variable;
    constructor(parent: ScrollArea, variable: Variable, onClick: Consumer<TextListScrollAreaEntry>);
  }

}

declare module 'de.keksuccino.fancymenu.customization.widget.identification.identificationcontext.contexts' {
  import { WidgetIdentificationContext } from 'de.keksuccino.fancymenu.customization.widget.identification.identificationcontext';
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface DeathScreenWidgetIdentificationContext extends WidgetIdentificationContext {}
  class DeathScreenWidgetIdentificationContext extends WidgetIdentificationContext {
    constructor();
    get targetScreen(): Class<Screen>;
  }


  interface PauseScreenWidgetIdentificationContext extends WidgetIdentificationContext {}
  class PauseScreenWidgetIdentificationContext extends WidgetIdentificationContext {
    constructor();
    get targetScreen(): Class<Screen>;
  }


  interface TitleScreenWidgetIdentificationContext extends WidgetIdentificationContext {}
  class TitleScreenWidgetIdentificationContext extends WidgetIdentificationContext {
    constructor();
    get targetScreen(): Class<Screen>;
  }


  class WidgetIdentificationContexts {
    static readonly TITLE_SCREEN_CONTEXT: TitleScreenWidgetIdentificationContext;
    static readonly DEATH_SCREEN_CONTEXT: DeathScreenWidgetIdentificationContext;
    static readonly PAUSE_SCREEN_CONTEXT: PauseScreenWidgetIdentificationContext;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.widget.identification.identificationcontext' {
  import { Class } from 'java.lang';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { WidgetMeta } from 'de.keksuccino.fancymenu.customization.widget';
  import { List } from 'java.util';

  class WidgetIdentificationContext {
    addUniversalIdentifierProvider(provider: ConsumingSupplier<WidgetMeta, string>): void;
    get targetScreen(): Class<Screen>;
    getUniversalIdentifierForWidget(meta: WidgetMeta): string;
  }


  class WidgetIdentificationContextRegistry {
    static get contexts(): WidgetIdentificationContext[];
    static getContextForScreen(screenClass: Class<Screen>): WidgetIdentificationContext;
    static register(context: WidgetIdentificationContext): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.widget.identification' {
  import { WidgetMeta } from 'de.keksuccino.fancymenu.customization.widget';

  class WidgetIdentifierHandler {
    static getUniversalIdentifierForWidgetMeta(meta: WidgetMeta): string;
    static isIdentifierOfWidget(widgetIdentifier: string, meta: WidgetMeta): boolean;
    static setUniversalIdentifierOfWidgetMeta(meta: WidgetMeta): void;
  }

}

declare module 'de.keksuccino.fancymenu.customization.widget' {
  import { List } from 'java.util';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  class ScreenWidgetDiscoverer {
    static getWidgetsOfScreen(screen: Screen): WidgetMeta[];
    static getWidgetsOfScreen(screen: Screen, updateScreenSize: boolean): WidgetMeta[];
    static getWidgetsOfScreen(screen: Screen, newWidth: number, newHeight: number): WidgetMeta[];
  }


  class WidgetLocatorHandler {
    static clearCache(): void;
    static getWidget(widgetLocator: string): WidgetMeta;
    static invokeWidgetOnClick(widgetLocator: string): boolean;
    static invokeWidgetOnClick(meta: WidgetMeta): boolean;
  }


  class WidgetMeta {
    label: Component;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(widget: AbstractWidget, longIdentifier: number, parentScreen: Screen);
    get identifier(): string;
    get locator(): string;
    get longIdentifier(): number;
    get screen(): Screen;
    get universalIdentifier(): string;
    get widget(): AbstractWidget;
    get widgetLocalizationKey(): string;
    set universalIdentifier(identifier: string);
  }

}

declare module 'de.keksuccino.fancymenu.customization.world' {
  import { File } from 'java.io';

  class LastWorldHandler {
    static readonly LAST_WORLD_SAVE_FILE: File;
    static get lastWorld(): string;
    static init(): void;
    static isLastWorldServer(): boolean;
    static setLastWorld(world: string, isServer: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.events' {
  import { EventBase } from 'de.keksuccino.fancymenu.util.event.acara';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { UIColorTheme } from 'de.keksuccino.fancymenu.util.rendering.ui.theme';
  import { List } from 'java.util';
  import { WidgetMeta } from 'de.keksuccino.fancymenu.customization.widget';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface ModReloadEvent extends EventBase {}
  class ModReloadEvent extends EventBase {
    constructor(screen: Screen);
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface ScreenReloadEvent extends EventBase {}
  class ScreenReloadEvent extends EventBase {
    constructor(screen: Screen);
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface UIColorThemeChangedEvent extends EventBase {}
  class UIColorThemeChangedEvent extends EventBase {
    constructor(scheme: UIColorTheme);
    get scheme(): UIColorTheme;
    isCancelable(): boolean;
  }


  interface WidgetCacheUpdatedEvent extends EventBase {}
  class WidgetCacheUpdatedEvent extends EventBase {
    constructor(screen: Screen, widgetList: WidgetMeta[], updated: boolean);
    addWidgetToScreen(widget: GuiEventListener): void;
    cacheUpdated(): boolean;
    get cachedWidgetMetaList(): WidgetMeta[];
    get cachedWidgetsList(): AbstractWidget[];
    get screen(): Screen;
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.screen' {
  import { EventBase } from 'de.keksuccino.fancymenu.util.event.acara';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { List } from 'java.util';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { InitializationPhase } from 'de.keksuccino.fancymenu.events.screen.InitOrResizeScreenEvent';

  interface AfterScreenRenderingEvent extends EventBase {}
  class AfterScreenRenderingEvent extends EventBase {
    constructor(screen: Screen, graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get graphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get narratables(): NarratableEntry[];
    get partial(): number;
    get renderables(): Renderable[];
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface CloseScreenEvent extends EventBase {}
  class CloseScreenEvent extends EventBase {
    constructor(closedScreen: Screen, newScreen: Screen);
    get closedScreen(): Screen;
    get newScreen(): Screen;
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface InitOrResizeScreenCompletedEvent extends EventBase {}
  class InitOrResizeScreenCompletedEvent extends EventBase {
    constructor(screen: Screen, phase: InitializationPhase);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get initializationPhase(): InitializationPhase;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface InitOrResizeScreenEvent extends EventBase {}
  class InitOrResizeScreenEvent extends EventBase {
    get initializationPhase(): InitializationPhase;
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface InitOrResizeScreenStartingEvent extends EventBase {}
  class InitOrResizeScreenStartingEvent extends EventBase {
    constructor(screen: Screen, phase: InitializationPhase);
    get initializationPhase(): InitializationPhase;
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface OpenScreenEvent extends EventBase {}
  class OpenScreenEvent extends EventBase {
    constructor(screen: Screen);
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface OpenScreenPostInitEvent extends EventBase {}
  class OpenScreenPostInitEvent extends EventBase {
    constructor(screen: Screen);
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface RenderedScreenBackgroundEvent extends EventBase {}
  class RenderedScreenBackgroundEvent extends EventBase {
    constructor(screen: Screen, graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get graphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get narratables(): NarratableEntry[];
    get partial(): number;
    get renderables(): Renderable[];
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface RenderScreenEvent extends EventBase {}
  class RenderScreenEvent extends EventBase {
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get graphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get narratables(): NarratableEntry[];
    get partial(): number;
    get renderables(): Renderable[];
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface ScreenCharTypedEvent extends EventBase {}
  class ScreenCharTypedEvent extends EventBase {
    constructor(screen: Screen, character: string);
    get character(): string;
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface ScreenKeyPressedEvent extends EventBase {}
  class ScreenKeyPressedEvent extends EventBase {
    constructor(screen: Screen, keycode: number, scancode: number, modifiers: number);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get keyName(): string;
    get keycode(): number;
    get modifiers(): number;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get scancode(): number;
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface ScreenKeyReleasedEvent extends EventBase {}
  class ScreenKeyReleasedEvent extends EventBase {
    constructor(screen: Screen, keycode: number, scancode: number, modifiers: number);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get keyName(): string;
    get keycode(): number;
    get modifiers(): number;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get scancode(): number;
    get screen(): Screen;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface ScreenMouseMoveEvent extends EventBase {}
  class ScreenMouseMoveEvent extends EventBase {
    constructor(screen: Screen, mouseX: number, mouseY: number, deltaX: number, deltaY: number);
    get deltaX(): number;
    get deltaY(): number;
    get mouseX(): number;
    get mouseY(): number;
    get screen(): Screen;
    isCancelable(): boolean;
  }


  interface ScreenMouseScrollEvent extends EventBase {}
  class ScreenMouseScrollEvent extends EventBase {
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get mouseX(): number;
    get mouseY(): number;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get screen(): Screen;
    get scrollDeltaX(): number;
    get scrollDeltaY(): number;
    get widgets(): GuiEventListener[];
    isCancelable(): boolean;
  }


  interface ScreenTickEvent extends EventBase {}
  class ScreenTickEvent extends EventBase {
    constructor(screen: Screen);
    get screen(): Screen;
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.screen.InitOrResizeScreenEvent' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { InitOrResizeScreenEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { Renderable } from 'net.minecraft.client.gui.components';

  interface InitializationPhase extends Enum<InitializationPhase> {}
  class InitializationPhase extends Enum<InitializationPhase> {
    static readonly INIT: InitializationPhase;
    static readonly RESIZE: InitializationPhase;
    static valueOf(name: string): InitializationPhase;
    static values(): InitializationPhase[];
  }


  interface Post extends InitOrResizeScreenEvent {}
  class Post extends InitOrResizeScreenEvent {
    constructor(screen: Screen, phase: InitializationPhase);
    addRenderableWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    addWidget<T extends GuiEventListener & NarratableEntry>(widget: T): void;
    get narratables(): NarratableEntry[];
    get renderables(): Renderable[];
    get widgets(): GuiEventListener[];
  }


  interface Pre extends InitOrResizeScreenEvent {}
  class Pre extends InitOrResizeScreenEvent {
    constructor(screen: Screen, phase: InitializationPhase);
  }

}

declare module 'de.keksuccino.fancymenu.events.screen.RenderScreenEvent' {
  import { RenderScreenEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Post extends RenderScreenEvent {}
  class Post extends RenderScreenEvent {
    constructor(screen: Screen, graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number);
  }


  interface Pre extends RenderScreenEvent {}
  class Pre extends RenderScreenEvent {
    constructor(screen: Screen, graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number);
  }

}

declare module 'de.keksuccino.fancymenu.events.screen.ScreenMouseScrollEvent' {
  import { ScreenMouseScrollEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface Post extends ScreenMouseScrollEvent {}
  class Post extends ScreenMouseScrollEvent {
    constructor(screen: Screen, mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number);
  }


  interface Pre extends ScreenMouseScrollEvent {}
  class Pre extends ScreenMouseScrollEvent {
    constructor(screen: Screen, mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number);
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.screen.ScreenTickEvent' {
  import { ScreenTickEvent } from 'de.keksuccino.fancymenu.events.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface Post extends ScreenTickEvent {}
  class Post extends ScreenTickEvent {
    constructor(screen: Screen);
  }


  interface Pre extends ScreenTickEvent {}
  class Pre extends ScreenTickEvent {
    constructor(screen: Screen);
  }

}

declare module 'de.keksuccino.fancymenu.events.ticking' {
  import { EventBase } from 'de.keksuccino.fancymenu.util.event.acara';

  interface ClientTickEvent extends EventBase {}
  class ClientTickEvent extends EventBase {
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent' {
  import { ClientTickEvent } from 'de.keksuccino.fancymenu.events.ticking';

  interface Post extends ClientTickEvent {}
  class Post extends ClientTickEvent {
  }


  interface Pre extends ClientTickEvent {}
  class Pre extends ClientTickEvent {
  }

}

declare module 'de.keksuccino.fancymenu.events.widget' {
  import { EventBase } from 'de.keksuccino.fancymenu.util.event.acara';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractSelectionList, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { TabNavigationBar } from 'net.minecraft.client.gui.components.tabs';

  interface RenderedGuiListHeaderFooterEvent extends EventBase {}
  class RenderedGuiListHeaderFooterEvent extends EventBase {
    constructor(graphics: GuiGraphics, list: AbstractSelectionList<any>);
    get graphics(): GuiGraphics;
    get list(): AbstractSelectionList<any>;
    isCancelable(): boolean;
  }


  interface RenderTabNavigationBarHeaderBackgroundEvent extends EventBase {}
  class RenderTabNavigationBarHeaderBackgroundEvent extends EventBase {
    get graphics(): GuiGraphics;
    get headerHeight(): number;
    get headerWidth(): number;
    get tabNavigationBar(): TabNavigationBar;
    isCancelable(): boolean;
  }


  interface RenderWidgetEvent extends EventBase {}
  class RenderWidgetEvent extends EventBase {
    constructor(graphics: GuiGraphics, widget: AbstractWidget, alpha: number);
    get alpha(): number;
    get graphics(): GuiGraphics;
    get widget(): AbstractWidget;
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.widget.RenderTabNavigationBarHeaderBackgroundEvent' {
  import { RenderTabNavigationBarHeaderBackgroundEvent } from 'de.keksuccino.fancymenu.events.widget';
  import { TabNavigationBar } from 'net.minecraft.client.gui.components.tabs';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Post extends RenderTabNavigationBarHeaderBackgroundEvent {}
  class Post extends RenderTabNavigationBarHeaderBackgroundEvent {
    constructor(tabNavigationBar: TabNavigationBar, graphics: GuiGraphics, headerWidth: number, headerHeight: number);
  }


  interface Pre extends RenderTabNavigationBarHeaderBackgroundEvent {}
  class Pre extends RenderTabNavigationBarHeaderBackgroundEvent {
    constructor(tabNavigationBar: TabNavigationBar, graphics: GuiGraphics, headerWidth: number, headerHeight: number);
    isCancelable(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.events.widget.RenderWidgetEvent' {
  import { RenderWidgetEvent } from 'de.keksuccino.fancymenu.events.widget';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';

  interface Post extends RenderWidgetEvent {}
  class Post extends RenderWidgetEvent {
    constructor(graphics: GuiGraphics, widget: AbstractWidget, alpha: number);
    isCancelable(): boolean;
  }


  interface Pre extends RenderWidgetEvent {}
  class Pre extends RenderWidgetEvent {
    constructor(graphics: GuiGraphics, widget: AbstractWidget, alpha: number);
    setAlpha(alpha: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.LegacyHandler' {
  import { AbstractOptions } from 'de.keksuccino.fancymenu.util';
  import { Option } from 'de.keksuccino.fancymenu.util.AbstractOptions';

  interface LegacyCheckList extends AbstractOptions {}
  class LegacyCheckList extends AbstractOptions {
    readonly customGuisPorted: Option;
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface FMMixinPlugin extends IMixinConfigPlugin {}
  class FMMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.mixin.mixins.common.client' {
  import { Component } from 'net.minecraft.network.chat';
  import { Map, UUID, List, Set } from 'java.util';
  import { LerpingBossEvent, EditBox, Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { OnPress } from 'Button';
  import { ParseResults } from 'com.mojang.brigadier';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions, Suggestion } from 'com.mojang.brigadier.suggestion';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { SuggestionsList } from 'CommandSuggestions';
  import { ConnectScreen, Screen } from 'net.minecraft.client.gui.screens';
  import { BiFunction, Consumer } from 'java.util.function';
  import { Integer, Boolean, Runnable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { PostChain, Rect2i } from 'net.minecraft.client.renderer';
  import { BufferSource } from 'MultiBufferSource';
  import { StoringChunkProgressListener } from 'net.minecraft.server.level.progress';
  import { ResourceLoadStateTracker } from 'net.minecraft.client';
  import { SoundInstance } from 'net.minecraft.client.resources.sounds';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Format } from 'NativeImage';
  import { WritableByteChannel } from 'java.nio.channels';
  import { PlayerModelPart } from 'net.minecraft.world.entity.player';
  import { FieldAccess } from 'Options';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry } from 'net.minecraft.client.gui.narration';
  import { ServerData, ClientLevel } from 'net.minecraft.client.multiplayer';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { CustomizableSlider, CustomizableWidget, UniqueWidget, UniqueLabeledSwitchCycleButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { RenderableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { CustomBackgroundResetBehavior } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.CustomizableWidget';
  import { GridLayoutTab } from 'net.minecraft.client.gui.components.tabs';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { CustomizableScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  class IMixinAbstractSliderButton {
    get canChangeValueFancyMenu(): boolean;
  }


  class IMixinAbstractWidget {
    get alphaFancyMenu(): number;
    setHeightFancyMenu(var1: number): void;
    setMessageFieldFancyMenu(var1: Component): void;
  }


  class IMixinBossHealthOverlay {
    get _events_FancyMenu(): Map<UUID, LerpingBossEvent>;
  }


  class IMixinButton {
    setPressActionFancyMenu(var1: OnPress): void;
  }


  class IMixinChatScreen {
    get inputFancyMenu(): EditBox;
  }


  class IMixinClientLanguage {
    get storageFancyMenu(): Map<string, string>;
  }


  class IMixinCommandSuggestions {
    get allowSuggestionsFancyMenu(): boolean;
    get commandUsageFancyMenu(): FormattedCharSequence[];
    get currentParseFancyMenu(): ParseResults<SharedSuggestionProvider>;
    get keepSuggestionsFancyMenu(): boolean;
    get pendingSuggestionsFancyMenu(): CompletableFuture<Suggestions>;
    get suggestionsFancyMenu(): SuggestionsList;
    invokeSortSuggestionsFancyMenu(var1: Suggestions): Suggestion[];
    invokeUpdateUsageInfoFancyMenu(): void;
    set currentParseFancyMenu(var1: ParseResults<SharedSuggestionProvider>);
    set pendingSuggestionsFancyMenu(var1: CompletableFuture<Suggestions>);
    set suggestionsFancyMenu(var1: SuggestionsList);
  }


  class IMixinConnectScreen {
    static invokeConstructFancyMenu(parent: Screen, connectFailedTitle: Component): ConnectScreen;
  }


  class IMixinEditBox {
    get borderedFancyMenu(): boolean;
    get displayPosFancyMenu(): number;
    get focusedTimeFancyMenu(): number;
    get formatterFancyMenu(): BiFunction<string, number, FormattedCharSequence>;
    get highlightPosFancyMenu(): number;
    get hintFancyMenu(): Component;
    get isEditableFancyMenu(): boolean;
    get maxLengthFancyMenu(): number;
    get suggestionFancyMenu(): string;
    get textColorFancyMenu(): number;
    get textColorUneditableFancyMenu(): number;
    invokeDeleteTextFancyMenu(var1: number): void;
    invokeRenderHighlightFancyMenu(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number): void;
    set displayPosFancyMenu(var1: number);
  }


  class IMixinGameRenderer {
    get blurEffect_FancyMenu(): PostChain;
  }


  class IMixinGui {
    get _subtitle_FancyMenu(): Component;
    get _title_FancyMenu(): Component;
  }


  class IMixinGuiGraphics {
    get bufferSource_FancyMenu(): BufferSource;
  }


  class IMixinLevelLoadingScreen {
    get progressListenerFancyMenu(): StoringChunkProgressListener;
  }


  class IMixinMinecraft {
    get reloadStateTrackerFancyMenu(): ResourceLoadStateTracker;
    openChatScreenFancyMenu(var1: string): void;
  }


  class IMixinMusicManager {
    get currentMusic_FancyMenu(): SoundInstance;
  }


  class IMixinNativeImage {
    get _pixels_FancyMenu(): number;
    static invoke_class_constructor_FancyMenu(format: Format, width: number, height: number, useStbFree: boolean, pixels: number): NativeImage;
    invoke_writeToChannel_FancyMenu(var1: WritableByteChannel): boolean;
  }


  class IMixinOptions {
    get modelPartsFancyMenu(): Set<PlayerModelPart>;
    invokeProcessOptionsFancyMenu(var1: FieldAccess): void;
  }


  class IMixinPlayerModel {
    get cloakFancyMenu(): ModelPart;
  }


  class IMixinProgressScreen {
    get progressFancyMenu(): number;
  }


  class IMixinRealmsNotificationsScreen {
    get _hasUnreadNews_FancyMenu(): boolean;
    get _hasUnseenNotifications(): boolean;
    get _numberOfPendingInvites_FancyMenu(): number;
    get _trialAvailable_FancyMenu(): boolean;
    get _validClient_FancyMenu(): CompletableFuture<boolean>;
  }


  class IMixinReceivingLevelScreen {
    setCreatedAtFancyMenu(var1: number): void;
  }


  class IMixinScreen {
    get _initialized_FancyMenu(): boolean;
    get childrenFancyMenu(): GuiEventListener[];
    get narratablesFancyMenu(): NarratableEntry[];
    get renderablesFancyMenu(): Renderable[];
    invokeRemoveWidgetFancyMenu(var1: GuiEventListener): void;
    invoke_init_FancyMenu(): void;
  }


  class IMixinServerList {
    get serverListFancyMenu(): ServerData[];
  }


  class IMixinSplashRenderer {
    get splashFancyMenu(): string;
  }


  class IMixinSuggestionsList {
    get currentFancyMenu(): number;
    get lastMouseFancyMenu(): Vec2;
    get offsetFancyMenu(): number;
    get rectFancyMenu(): Rect2i;
    set lastMouseFancyMenu(var1: Vec2);
  }


  class MixinAbstractButton {
  }


  interface MixinAbstractContainerEventHandler extends ContainerEventHandler {}
  class MixinAbstractContainerEventHandler extends ContainerEventHandler {
  }


  interface MixinAbstractContainerScreen extends Screen {}
  class MixinAbstractContainerScreen extends Screen {
  }


  class MixinAbstractSelectionList {
  }


  interface MixinAbstractSliderButton extends CustomizableSlider, AbstractWidget {}
  class MixinAbstractSliderButton extends CustomizableSlider {
    constructor($$0: number, $$1: number, $$2: number, $$3: number, $$4: Component);
    get customSliderBackgroundHighlightedFancyMenu(): RenderableResource;
    get customSliderBackgroundNormalFancyMenu(): RenderableResource;
    get nineSliceSliderBackgroundBorderX_FancyMenu(): number;
    get nineSliceSliderBackgroundBorderY_FancyMenu(): number;
    get nineSliceSliderHandleBorderX_FancyMenu(): number;
    get nineSliceSliderHandleBorderY_FancyMenu(): number;
    isNineSliceCustomSliderBackground_FancyMenu(): boolean;
    isNineSliceCustomSliderHandle_FancyMenu(): boolean;
    set customSliderBackgroundHighlightedFancyMenu(background: RenderableResource);
    set customSliderBackgroundNormalFancyMenu(background: RenderableResource);
    set nineSliceSliderBackgroundBorderX_FancyMenu(nineSliceSliderBorderX_FancyMenu: number);
    set nineSliceSliderBackgroundBorderY_FancyMenu(nineSliceSliderBorderY_FancyMenu: number);
    set nineSliceSliderHandleBorderX_FancyMenu(nineSliceSliderHandleBorderX_FancyMenu: number);
    set nineSliceSliderHandleBorderY_FancyMenu(nineSliceSliderHandleBorderY_FancyMenu: number);
    setNineSliceCustomSliderBackground_FancyMenu(nineSlice: boolean): void;
    setNineSliceCustomSliderHandle_FancyMenu(nineSlice: boolean): void;
  }


  interface MixinAbstractWidget extends CustomizableWidget, UniqueWidget {}
  class MixinAbstractWidget extends CustomizableWidget {
    visible: boolean;
    active: boolean;
    addFocusStateListenerFancyMenu(listener: Consumer<boolean>): void;
    addHoverOrFocusStateListenerFancyMenu(listener: Consumer<boolean>): void;
    addHoverStateListenerFancyMenu(listener: Consumer<boolean>): void;
    addResetCustomizationsListenerFancyMenu(listener: Runnable): void;
    get customBackgroundHoverFancyMenu(): RenderableResource;
    get customBackgroundInactiveFancyMenu(): RenderableResource;
    get customBackgroundNormalFancyMenu(): RenderableResource;
    get customBackgroundResetBehaviorFancyMenu(): CustomBackgroundResetBehavior;
    get customClickSoundFancyMenu(): IAudio;
    get customHeightFancyMenu(): number;
    get customLabelFancyMenu(): Component;
    get customWidthFancyMenu(): number;
    get customXFancyMenu(): number;
    get customYFancyMenu(): number;
    get focusStateListenersFancyMenu(): Consumer<boolean>[];
    get hoverLabelFancyMenu(): Component;
    get hoverOrFocusStateListenersFancyMenu(): Consumer<boolean>[];
    get hoverSoundFancyMenu(): IAudio;
    get hoverStateListenersFancyMenu(): Consumer<boolean>[];
    get lastFocusStateFancyMenu(): boolean;
    get lastHoverOrFocusStateFancyMenu(): boolean;
    get lastHoverStateFancyMenu(): boolean;
    get nineSliceCustomBackgroundBorderX_FancyMenu(): number;
    get nineSliceCustomBackgroundBorderY_FancyMenu(): number;
    get resetCustomizationsListenersFancyMenu(): Runnable[];
    get widgetIdentifierFancyMenu(): string;
    get x(): number;
    get y(): number;
    isFocused(): boolean;
    isHiddenFancyMenu(): boolean;
    isHoveredOrFocused(): boolean;
    isNineSliceCustomBackgroundTexture_FancyMenu(): boolean;
    resetWidgetCustomizationsFancyMenu(): void;
    resetWidgetSizeAndPositionFancyMenu(): void;
    set customBackgroundHoverFancyMenu(background: RenderableResource);
    set customBackgroundInactiveFancyMenu(background: RenderableResource);
    set customBackgroundNormalFancyMenu(background: RenderableResource);
    set customBackgroundResetBehaviorFancyMenu(resetBehavior: CustomBackgroundResetBehavior);
    set customClickSoundFancyMenu(sound: IAudio);
    set customHeightFancyMenu(customHeightFancyMenu: number);
    set customLabelFancyMenu(customLabelFancyMenu: Component);
    set customWidthFancyMenu(customWidthFancyMenu: number);
    set customXFancyMenu(customXFancyMenu: number);
    set customYFancyMenu(customYFancyMenu: number);
    set hoverLabelFancyMenu(hoverLabelFancyMenu: Component);
    set hoverSoundFancyMenu(sound: IAudio);
    set lastFocusStateFancyMenu(focused: boolean);
    set lastHoverOrFocusStateFancyMenu(hoveredOrFocused: boolean);
    set lastHoverStateFancyMenu(hovered: boolean);
    set widgetIdentifierFancyMenu(identifier: string);
    setFocused(var1: boolean): void;
    setHiddenFancyMenu(hiddenFancyMenu: boolean): void;
    setNineSliceBorderX_FancyMenu(borderX: number): void;
    setNineSliceBorderY_FancyMenu(borderY: number): void;
    setNineSliceCustomBackground_FancyMenu(repeat: boolean): void;
  }


  class MixinChatListener {
  }


  class MixinClientPacketListener {
  }


  interface MixinConnectScreen extends Screen {}
  class MixinConnectScreen extends Screen {
  }


  interface MixinCreateWorldScreen extends Screen {}
  class MixinCreateWorldScreen extends Screen {
  }


  class MixinCreateWorldScreen_GameTab {
  }


  class MixinCreateWorldScreen_MoreTab {
  }


  interface MixinCreateWorldScreen_WorldTab extends GridLayoutTab {}
  class MixinCreateWorldScreen_WorldTab extends GridLayoutTab {
    constructor($$0: Component);
  }


  interface MixinCreativeModeInventoryScreen extends Screen {}
  class MixinCreativeModeInventoryScreen extends Screen {
  }


  interface MixinCycleButton extends UniqueLabeledSwitchCycleButton {}
  class MixinCycleButton extends UniqueLabeledSwitchCycleButton {
    get labeledSwitchComponentLabel_FancyMenu(): Component;
    set labeledSwitchComponentLabel_FancyMenu(label: Component);
  }


  interface MixinDeathScreen extends Screen {}
  class MixinDeathScreen extends Screen {
  }


  interface MixinDisconnectedScreen extends Screen {}
  class MixinDisconnectedScreen extends Screen {
  }


  class MixinGameLoadCookie {
  }


  class MixinGameRenderer {
  }


  interface MixinGenericMessageScreen extends Screen {}
  class MixinGenericMessageScreen extends Screen {
  }


  class MixinGuiGraphics {
  }


  class MixinImageButton {
  }


  class MixinKeyboardHandler {
  }


  interface MixinLevelLoadingScreen extends Screen {}
  class MixinLevelLoadingScreen extends Screen {
  }


  class MixinLevelLoadStatusManager {
    levelReady(): boolean;
  }


  class MixinLevelRenderer {
  }


  class MixinLevelStorageAccess {
  }


  class MixinLivingEntity {
  }


  class MixinLoadingOverlay {
  }


  class MixinLocalPlayer {
  }


  class MixinMinecraft {
    screen: Screen;
    level: ClientLevel;
    player: LocalPlayer;
  }


  class MixinMouseHandler {
  }


  class MixinMultiPlayerGameMode {
  }


  class MixinMusicManager {
    stopPlaying(): void;
  }


  class MixinOnlineServerEntry {
  }


  class MixinOptions {
  }


  interface MixinPauseScreen extends Screen {}
  class MixinPauseScreen extends Screen {
  }


  class MixinPlayer {
  }


  interface MixinProgressScreen extends Screen {}
  class MixinProgressScreen extends Screen {
  }


  class MixinQuickPlay {
  }


  class MixinRealmsNotificationsScreen {
  }


  interface MixinReceivingLevelScreen extends Screen {}
  class MixinReceivingLevelScreen extends Screen {
  }


  class MixinRenderSystem {
  }


  class MixinResourceLoadStateTracker {
  }


  interface MixinScreen extends CustomizableScreen {}
  class MixinScreen extends CustomizableScreen {
    removeOnInitChildrenFancyMenu(): GuiEventListener[];
  }


  class MixinSoundEngine {
  }


  class MixinSoundManager {
  }


  class MixinStringDecomposer {
  }


  class MixinSwitchGrid_SwitchBuilder {
  }


  class MixinTabNavigationBar {
  }


  interface MixinTitleScreen extends Screen {}
  class MixinTitleScreen extends Screen {
    fading: boolean;
  }


  class MixinWorldListEntry {
  }

}

declare module 'de.keksuccino.fancymenu.mixin.mixins.common.server' {
  class MixinLivingEntity {
  }


  class MixinServerLevel {
  }


  class MixinServerPlayer {
  }

}

declare module 'de.keksuccino.fancymenu.mixin.mixins.neoforge.client' {
  class MixinNeoForgeGameRenderer {
  }


  class MixinNeoForgeKeyboardHandler {
  }


  class MixinNeoForgeLoadingOverlay {
  }


  class MixinNeoForgeMouseHandler {
  }


  class MixinNeoForgeTitleScreen {
  }

}

declare module 'de.keksuccino.fancymenu.networking.bridge' {
  import { PacketPayloadBaseNeoForge } from 'de.keksuccino.fancymenu.networking';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PacketDirection } from 'de.keksuccino.fancymenu.networking.PacketHandler';

  interface BridgePacketPayloadNeoForge extends CustomPacketPayload, PacketPayloadBaseNeoForge {}
  class BridgePacketPayloadNeoForge extends CustomPacketPayload {
    static readonly TYPE: Type;
    static readonly CODEC: StreamCodec;
    dataWithIdentifier: string;
    constructor(direction: string, dataWithIdentifier: string);

    constructor(byteBuf: FriendlyByteBuf);
    handle(sender: ServerPlayer, direction: PacketDirection): void;
    type(): Type<BridgePacketPayloadNeoForge>;
    write(byteBuf: FriendlyByteBuf): void;
  }

}

declare module 'de.keksuccino.fancymenu.networking' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { Class } from 'java.lang';
  import { MinecraftServer } from 'net.minecraft.server';
  import { Consumer, BiConsumer } from 'java.util.function';
  import { PacketDirection } from 'de.keksuccino.fancymenu.networking.PacketHandler';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { List } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  class ClientPacketUtils {
    static get connectedServerIp(): string;
  }


  class Packet {
    processPacket(var1: ServerPlayer): boolean;
    sendChatFeedback(message: MutableComponent, failure: boolean): void;
  }


  class PacketCodec<T extends Packet = any> {
    constructor(packetIdentifier: string, type: Class<T>);
    deserialize(dataWithoutIdentifier: string): T;
    get packetIdentifier(): string;
    get type(): Class<T>;
    serialize(packet: T): string;
  }


  class PacketData<T extends Packet = any> {
    identifier: string;
    packet: T;
  }


  class PacketHandler {
    static addFancyMenuClient(playerUUID: string): void;
    static addFancyMenuServer(serverIp: string): void;
    static isFancyMenuClient(player: ServerPlayer): boolean;
    static onPacketReceived(sender: ServerPlayer, direction: PacketDirection, dataWithIdentifier: string): void;
    static sendHandshakeToClient(player: ServerPlayer): void;
    static sendHandshakeToServer(): void;
    static sendToAllFancyMenuClients<T extends Packet>(server: MinecraftServer, packet: T): void;
    static sendToClient<T extends Packet>(toPlayer: ServerPlayer, packet: T): void;
    static sendToServer<T extends Packet>(packet: T): void;
    static setSendToClientLogic(playerAndDataConsumer: BiConsumer<ServerPlayer, string>): void;
    static setSendToServerLogic(dataConsumer: Consumer<string>): void;
  }


  class PacketHandlerNeoForge {
    static sendToClient(packet: CustomPacketPayload, toPlayer: ServerPlayer): void;
    static sendToServer(packet: CustomPacketPayload): void;
  }


  class PacketPayloadBaseNeoForge {
    direction: string;
  }


  class PacketRegistry {
    static endRegistrationPhase(): void;
    static get codecs(): PacketCodec<any>[];
    static getCodec(identifier: string): PacketCodec<any>;
    static getCodecFor<T extends Packet>(packet: T): PacketCodec<T>;
    static register(codec: PacketCodec<any>): void;
  }


  class PacketsNeoForge {
    static init(eventBus: IEventBus): void;
    static registerBridgePacketNeoForge(e: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'de.keksuccino.fancymenu.networking.PacketHandler' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PacketDirection extends Enum<PacketDirection> {}
  class PacketDirection extends Enum<PacketDirection> {
    static readonly TO_SERVER: PacketDirection;
    static readonly TO_CLIENT: PacketDirection;
    static valueOf(name: string): PacketDirection;
    static values(): PacketDirection[];
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.closegui' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideCloseGuiCommandPacketLogic {
  }


  interface CloseGuiCommandPacket extends Packet {}
  class CloseGuiCommandPacket extends Packet {
    processPacket(sender: ServerPlayer): boolean;
  }


  interface CloseGuiCommandPacketCodec extends PacketCodec<CloseGuiCommandPacket> {}
  class CloseGuiCommandPacketCodec extends PacketCodec<CloseGuiCommandPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.layout.command' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideLayoutCommandPacketLogic {
  }


  interface LayoutCommandPacket extends Packet {}
  class LayoutCommandPacket extends Packet {
    layout_name: string;
    enabled: boolean;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface LayoutCommandPacketCodec extends PacketCodec<LayoutCommandPacket> {}
  class LayoutCommandPacketCodec extends PacketCodec<LayoutCommandPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.layout.suggestions' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { List } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Post } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';

  interface LayoutCommandSuggestionsPacket extends Packet {}
  class LayoutCommandSuggestionsPacket extends Packet {
    layout_suggestions: List;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface LayoutCommandSuggestionsPacketCodec extends PacketCodec<LayoutCommandSuggestionsPacket> {}
  class LayoutCommandSuggestionsPacketCodec extends PacketCodec<LayoutCommandSuggestionsPacket> {
    constructor();
    onClientTick(e: Post): void;
  }


  class ServerSideLayoutCommandSuggestionsPacketLogic {
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.opengui' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideOpenGuiCommandPacketLogic {
  }


  interface OpenGuiCommandPacket extends Packet {}
  class OpenGuiCommandPacket extends Packet {
    screen_identifier: string;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface OpenGuiCommandPacketCodec extends PacketCodec<OpenGuiCommandPacket> {}
  class OpenGuiCommandPacketCodec extends PacketCodec<OpenGuiCommandPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.variable.command' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideVariableCommandPacketLogic {
  }


  interface VariableCommandPacket extends Packet {}
  class VariableCommandPacket extends Packet {
    set: boolean;
    variable_name: string;
    set_to_value: string;
    feedback: boolean;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface VariableCommandPacketCodec extends PacketCodec<VariableCommandPacket> {}
  class VariableCommandPacketCodec extends PacketCodec<VariableCommandPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.commands.variable.suggestions' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { List } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Post } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';

  class ServerSideVariableCommandSuggestionsPacketLogic {
  }


  interface VariableCommandSuggestionsPacket extends Packet {}
  class VariableCommandSuggestionsPacket extends Packet {
    variable_suggestions: List;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface VariableCommandSuggestionsPacketCodec extends PacketCodec<VariableCommandSuggestionsPacket> {}
  class VariableCommandSuggestionsPacketCodec extends PacketCodec<VariableCommandSuggestionsPacket> {
    constructor();
    onClientTick(e: Post): void;
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.entities' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { EntityEventType } from 'de.keksuccino.fancymenu.networking.packets.entities.EntityEventPacket';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideEntityEventPacketLogic {
  }


  interface EntityEventPacket extends Packet {}
  class EntityEventPacket extends Packet {
    event_type: EntityEventType;
    entity_key: string;
    entity_uuid: string;
    killer_name: string;
    killer_key: string;
    killer_uuid: string;
    damage_type: string;
    pos_x: number;
    pos_y: number;
    pos_z: number;
    level_identifier: string;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface EntityEventPacketCodec extends PacketCodec<EntityEventPacket> {}
  class EntityEventPacketCodec extends PacketCodec<EntityEventPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.entities.EntityEventPacket' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EntityEventType extends Enum<EntityEventType> {}
  class EntityEventType extends Enum<EntityEventType> {
    static readonly SPAWN: EntityEventType;
    static readonly DEATH: EntityEventType;
    static valueOf(name: string): EntityEventType;
    static values(): EntityEventType[];
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.handshake' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideHandshakePacketLogic {
  }


  interface HandshakePacket extends Packet {}
  class HandshakePacket extends Packet {
    processPacket(sender: ServerPlayer): boolean;
  }


  interface HandshakePacketCodec extends PacketCodec<HandshakePacket> {}
  class HandshakePacketCodec extends PacketCodec<HandshakePacket> {
    constructor();
  }


  class ServerSideHandshakePacketLogic {
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets' {
  import { CloseGuiCommandPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.closegui';
  import { OpenGuiCommandPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.opengui';
  import { VariableCommandPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.variable.command';
  import { VariableCommandSuggestionsPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.variable.suggestions';
  import { LayoutCommandSuggestionsPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.layout.suggestions';
  import { LayoutCommandPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.commands.layout.command';
  import { HandshakePacketCodec } from 'de.keksuccino.fancymenu.networking.packets.handshake';
  import { StructureEventPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.structures';
  import { EntityEventPacketCodec } from 'de.keksuccino.fancymenu.networking.packets.entities';
  import { ServerNbtDataRequestPacketCodec, ServerNbtDataResponsePacketCodec } from 'de.keksuccino.fancymenu.networking.packets.placeholders.nbt';

  class Packets {
    static readonly CLOSE_GUI_COMMAND_PACKET_CODEC: CloseGuiCommandPacketCodec;
    static readonly OPEN_GUI_COMMAND_PACKET_CODEC: OpenGuiCommandPacketCodec;
    static readonly VARIABLE_COMMAND_PACKET_CODEC: VariableCommandPacketCodec;
    static readonly VARIABLE_COMMAND_SUGGESTIONS_PACKET_CODEC: VariableCommandSuggestionsPacketCodec;
    static readonly LAYOUT_COMMAND_SUGGESTIONS_PACKET_CODEC: LayoutCommandSuggestionsPacketCodec;
    static readonly LAYOUT_COMMAND_PACKET_CODEC: LayoutCommandPacketCodec;
    static readonly HANDSHAKE_PACKET_CODEC: HandshakePacketCodec;
    static readonly STRUCTURE_EVENT_PACKET_CODEC: StructureEventPacketCodec;
    static readonly ENTITY_EVENT_PACKET_CODEC: EntityEventPacketCodec;
    static readonly SERVER_NBT_DATA_REQUEST_PACKET_CODEC: ServerNbtDataRequestPacketCodec;
    static readonly SERVER_NBT_DATA_RESPONSE_PACKET_CODEC: ServerNbtDataResponsePacketCodec;
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.placeholders.nbt' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { Double } from 'java.lang';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResultType } from 'de.keksuccino.fancymenu.networking.packets.placeholders.nbt.ServerNbtDataResponsePacket';

  class ClientSideServerNbtDataResponsePacketLogic {
  }


  interface ServerNbtDataRequestPacket extends Packet {}
  class ServerNbtDataRequestPacket extends Packet {
    placeholder: string;
    source_type: string;
    entity_selector: string;
    block_pos: string;
    storage_id: string;
    nbt_path: string;
    return_type: string;
    scale: number;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface ServerNbtDataRequestPacketCodec extends PacketCodec<ServerNbtDataRequestPacket> {}
  class ServerNbtDataRequestPacketCodec extends PacketCodec<ServerNbtDataRequestPacket> {
    constructor();
  }


  interface ServerNbtDataResponsePacket extends Packet {}
  class ServerNbtDataResponsePacket extends Packet {
    placeholder: string;
    data: string;
    resultType: ResultType;
    constructor();

    constructor(placeholder: string, data: string, resultType: ResultType);
    processPacket(sender: ServerPlayer): boolean;
  }


  interface ServerNbtDataResponsePacketCodec extends PacketCodec<ServerNbtDataResponsePacket> {}
  class ServerNbtDataResponsePacketCodec extends PacketCodec<ServerNbtDataResponsePacket> {
    constructor();
  }


  class ServerSideServerNbtDataRequestPacketLogic {
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.placeholders.nbt.ServerNbtDataResponsePacket' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ResultType extends Enum<ResultType> {}
  class ResultType extends Enum<ResultType> {
    static readonly SUCCESS: ResultType;
    static readonly EMPTY: ResultType;
    static valueOf(name: string): ResultType;
    static values(): ResultType[];
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.structures' {
  import { Packet, PacketCodec } from 'de.keksuccino.fancymenu.networking';
  import { StructureEventType } from 'de.keksuccino.fancymenu.networking.packets.structures.StructureEventPacket';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ClientSideStructureEventPacketLogic {
  }


  interface StructureEventPacket extends Packet {}
  class StructureEventPacket extends Packet {
    event_type: StructureEventType;
    structure_identifier: string;
    processPacket(sender: ServerPlayer): boolean;
  }


  interface StructureEventPacketCodec extends PacketCodec<StructureEventPacket> {}
  class StructureEventPacketCodec extends PacketCodec<StructureEventPacket> {
    constructor();
  }

}

declare module 'de.keksuccino.fancymenu.networking.packets.structures.StructureEventPacket' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface StructureEventType extends Enum<StructureEventType> {}
  class StructureEventType extends Enum<StructureEventType> {
    static readonly ENTER: StructureEventType;
    static readonly LEAVE: StructureEventType;
    static readonly ENTER_HIGH_PRECISION: StructureEventType;
    static readonly LEAVE_HIGH_PRECISION: StructureEventType;
    static valueOf(name: string): StructureEventType;
    static values(): StructureEventType[];
  }

}

declare module 'de.keksuccino.fancymenu.platform' {
  import { IPlatformCompatibilityLayer, IPlatformHelper } from 'de.keksuccino.fancymenu.platform.services';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { EntityType } from 'net.minecraft.world.entity';
  import { UniversalModContainer } from 'de.keksuccino.fancymenu.util.mod';
  import { Class } from 'java.lang';

  interface NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {}
  class NeoForgeCompatibilityLayer extends IPlatformCompatibilityLayer {
    get titleScreenBrandingLines(): Component[];
  }


  interface NeoForgePlatformHelper extends IPlatformHelper {}
  class NeoForgePlatformHelper extends IPlatformHelper {
    get loadedModIds(): string[];
    get loadedMods(): UniversalModContainer[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getEffectKey(effect: MobEffect): ResourceLocation;
    getEntityKey(type: EntityType<any>): ResourceLocation;
    getItemKey(item: Item): ResourceLocation;
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

declare module 'de.keksuccino.fancymenu.platform.services' {
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { Key } from 'InputConstants';
  import { KeyMapping } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Item } from 'net.minecraft.world.item';
  import { MobEffect } from 'net.minecraft.world.effect';
  import { EntityType } from 'net.minecraft.world.entity';
  import { UniversalModContainer } from 'de.keksuccino.fancymenu.util.mod';

  class IPlatformCompatibilityLayer {
    get titleScreenBrandingLines(): Component[];
  }


  class IPlatformHelper {
    get environmentName(): string;
    get loadedModIds(): string[];
    get loadedMods(): UniversalModContainer[];
    get loaderVersion(): string;
    get platformDisplayName(): string;
    get platformName(): string;
    getEffectKey(var1: MobEffect): ResourceLocation;
    getEntityKey(var1: EntityType<any>): ResourceLocation;
    getItemKey(var1: Item): ResourceLocation;
    getKeyMappingKey(var1: KeyMapping): Key;
    getLoadedMod(id: string): UniversalModContainer;
    getModVersion(var1: string): string;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    isOnClient(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util' {
  import { AutoCloseable, Boolean, Class, Number, Runnable } from 'java.lang';
  import { LevelSummary } from 'net.minecraft.world.level.storage';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { MathUtils as de_keksuccino_konkrete_math_MathUtils } from 'de.keksuccino.konkrete.math';
  import { Consumer, Supplier } from 'java.util.function';
  import { ReloadAction } from 'de.keksuccino.fancymenu.util.MinecraftResourceReloadObserver';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { ResourceFile } from 'de.keksuccino.fancymenu.util.file';
  import { Task } from 'de.keksuccino.fancymenu.util.TaskExecutor';
  import { TimeUnit } from 'java.util.concurrent';
  import { InputStream } from 'java.io';

  class AbstractOptions {
  }


  class CloseableUtils {
    static closeQuietly(closeable: AutoCloseable): void;
  }


  class ConsumingSupplier<C = any, R = any> {
    get(var1: C): R;
  }


  class LevelData {
    file_name: string;
    display_name: string;
    requires_manual_conversion: boolean;
    locked: boolean;
    experimental: boolean;
    icon_path: string;
    game_type: string;
    difficulty: string;
    allow_commands: boolean;
    settings_level_name: string;
    last_played: number;
    level_data_version: number;
    minecraft_version_name: string;
    snapshot: boolean;
    can_edit: boolean;
    can_recreate: boolean;
    can_delete: boolean;
    static deserialize(json: string): LevelData;
    static fromLevelSummary(summary: LevelSummary): LevelData;
    serialize(): string;
  }


  class ListUtils {
    static allInListEqual(list: any[]): boolean;
    static changeIndexOf<T>(list: T[], object: T, newIndex: number): void;
    static contentEqualIgnoreOrder<T>(list1: T[], list2: T[]): boolean;
    static filterList<T>(listToFilter: T[], filter: ConsumingSupplier<T, boolean>): T[];
    static getLast<T>(list: T[]): T;
    static mergeLists<T>(...lists: T[][]): T[];
    static of<T>(...entries: T[]): T[];
    static offsetIndexOf<T>(list: T[], object: T, indexOffset: number): void;
  }


  class LocalizationUtils {
    static get localizationKeys(): string[];
    static getComponentLocalizationKey(component: Component): string;
    static isLocalizationKey(key: string): boolean;
    static splitLocalizedLines(localizationKey: string, ...placeholderReplacements: string[]): Component[];
    static splitLocalizedStringLines(localizationKey: string, ...placeholderReplacements: string[]): string[];
  }


  class LocalPlayerUtils {
    static sendPlayerChatMessage(player: LocalPlayer, message: string): void;
    static sendPlayerCommand(player: LocalPlayer, command: string): void;
  }


  interface MathUtils extends de_keksuccino_konkrete_math_MathUtils {}
  class MathUtils extends de_keksuccino_konkrete_math_MathUtils {
    static round(value: number, places: number): number;
  }


  class MinecraftResourceReloadObserver {
    static addReloadListener(listener: Consumer<ReloadAction>): number;
    static get reloadListeners(): Consumer<ReloadAction>[];
    static removeReloadListener(id: number): void;
  }


  class ObjectHolder<T = any> {
    get (): T;
    static of<T>(object: T): ObjectHolder<T>;
    set (object: T);
  }


  class ObjectUtils {
    static build<T>(builder: Supplier<T>): T;
    static getOfAll<O, F>(getType: Class<F>, objects: O[], getter: ConsumingSupplier<O, F>): F[];
    static getOfAllUnsafe(objects: any[], getter: ConsumingSupplier<any, any>): any[];
    static isFalseForAll<T>(objects: T[], checkFor: ConsumingSupplier<T, boolean>): boolean;
    static isTrueForAll<T>(objects: T[], checkFor: ConsumingSupplier<T, boolean>): boolean;
    static isTrueOrFalseForAll<T>(objects: T[], checkFor: ConsumingSupplier<T, boolean>): boolean;
  }


  class OSUtils {
    static isLinux(): boolean;
    static isMacOS(): boolean;
    static isWindows(): boolean;
  }


  class Pair<L = any, R = any> {
    get key(): L;
    get value(): R;
    static of<L, R>(key: L, value: R): Pair<L, R>;
    set key(key: L);
    set value(value: R);
  }


  class PerformanceUtils {
    static get jvmCpuUsage(): number;
    static get osCpuUsage(): number;
  }


  class ScreenTitleUtils {
    static getTitleLocalizationKeyOfScreen(screen: Screen): string;
    static getTitleOfScreen(screen: Screen): Component;
    static setScreenTitle(screen: Screen, title: Component): void;
  }


  class ScreenUtils {
    static get screen(): Screen;
    static get screenCenterX(): number;
    static get screenCenterY(): number;
    static get screenHeight(): number;
    static get screenWidth(): number;
  }


  class SerializationUtils {
    static deserializeAssetResourceFile(gameDirectoryFilePath: string): ResourceFile;
    static deserializeAudioResourceSupplier(resourceSource: string): ResourceSupplier<IAudio>;
    static deserializeBoolean(fallbackValue: boolean, serialized: string): boolean;
    static deserializeImageResourceSupplier(resourceSource: string): ResourceSupplier<ITexture>;
    static deserializeNumber<T extends Number>(type: Class<T>, fallbackValue: T, serialized: string): T;
    static deserializeResourceFile(gameDirectoryFilePath: string): ResourceFile;
    static deserializeTextResourceSupplier(resourceSource: string): ResourceSupplier<IText>;
    static deserializeVideoResourceSupplier(resourceSource: string): ResourceSupplier<IVideo>;
  }


  class TaskExecutor {
    static execute(task: Runnable, executeInMainThread: boolean): void;
    static schedule(task: Task, delay: number, unit: TimeUnit, executeInMainThread: boolean): void;
    static scheduleAtFixedRate(task: Task, initialDelay: number, period: number, unit: TimeUnit, executeInMainThread: boolean): void;
  }


  class ThreadUtils {
    static sleep(millis: number): void;
  }


  class Trio<F = any, S = any, T = any> {
    get first(): F;
    get second(): S;
    get third(): T;
    static of<F, S, T>(first: F, second: S, third: T): Trio<F, S, T>;
    set first(first: F);
    set second(second: S);
    set third(third: T);
  }


  class WebUtils {
    static getMimeType(url: string): string;
    static init(): void;
    static isInternetAvailable(): boolean;
    static isValidUrl(url: string): boolean;
    static openResourceStream(resourceURL: string): InputStream;
    static openWebLink(url: string): void;
  }


  class WorldUtils {
    static get levels(): LevelSummary[];
    static get levelsAsData(): LevelData[];
    static isMultiplayer(): boolean;
    static isSingleplayer(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.AbstractOptions' {
  import { RuntimeException } from 'java.lang';
  import { Config } from 'de.keksuccino.konkrete.config';

  interface UnsupportedOptionTypeException extends RuntimeException {}
  class UnsupportedOptionTypeException extends RuntimeException {
    constructor();

    constructor(msg: string);
  }


  class Option<T = any> {
    constructor(config: Config, key: string, defaultValue: T, category: string);
    get defaultValue(): T;
    get key(): string;
    get value(): T;
    resetToDefault(): Option<T>;
    set value(value: T);
  }

}

declare module 'de.keksuccino.fancymenu.util.auth' {
  import { Exception } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface AuthException extends Exception {}
  class AuthException extends Exception {
    constructor(message: string, exception: Exception);

    constructor(message: string);
  }


  class ModValidator {
    static isFancyMenuDescription(): boolean;
    static isFancyMenuDisplayName(): boolean;
    static isFancyMenuLicense(): boolean;
    static isFancyMenuLoaded(): boolean;
    static isFancyMenuMetadataValid(): boolean;
    static printInfo(): void;
    static renderInvalidError(graphics: GuiGraphics): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.cycle' {
  import { CycleOnOff, CycleEnabledDisabled } from 'de.keksuccino.fancymenu.util.cycle.CommonCycles';
  import { List } from 'java.util';
  import { MutableComponent, Style } from 'net.minecraft.network.chat';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Consumer } from 'java.util.function';
  import { LocalizedEnum } from 'de.keksuccino.fancymenu.util.enums';

  class CommonCycles {
    static cycle<T>(cycleLocalizationKey: string, values: T[]): LocalizedGenericValueCycle<T>;
    static cycle<T>(cycleLocalizationKey: string, values: T[], selectedValue: T): LocalizedGenericValueCycle<T>;
    static cycleEnabledDisabled(cycleLocalizationKey: string): LocalizedEnumValueCycle<CycleEnabledDisabled>;
    static cycleEnabledDisabled(cycleLocalizationKey: string, selectedValue: CycleEnabledDisabled): LocalizedEnumValueCycle<CycleEnabledDisabled>;
    static cycleEnabledDisabled(cycleLocalizationKey: string, selectedValue: boolean): LocalizedEnumValueCycle<CycleEnabledDisabled>;
    static cycleOnOff(cycleLocalizationKey: string): LocalizedEnumValueCycle<CycleOnOff>;
    static cycleOnOff(cycleLocalizationKey: string, selectedValue: CycleOnOff): LocalizedEnumValueCycle<CycleOnOff>;
    static cycleOnOff(cycleLocalizationKey: string, selectedValue: boolean): LocalizedEnumValueCycle<CycleOnOff>;
    static cycleOrangeValue<T>(cycleLocalizationKey: string, values: T[]): LocalizedGenericValueCycle<T>;
    static cycleOrangeValue<T>(cycleLocalizationKey: string, values: T[], selectedValue: T): LocalizedGenericValueCycle<T>;
  }


  interface ILocalizedValueCycle<T = any> extends IValueCycle<T> {}
  class ILocalizedValueCycle<T = any> extends IValueCycle<T> {
    get currentValueComponent(): MutableComponent;
    get cycleComponent(): MutableComponent;
    get cycleLocalizationKey(): string;
    setCycleComponentStyleSupplier(var1: ConsumingSupplier<T, Style>): ILocalizedValueCycle<T>;
  }


  class IValueCycle<T = any> {
    addCycleListener(var1: Consumer<T>): IValueCycle<T>;
    clearCycleListeners(): IValueCycle<T>;
    current(): T;
    get values(): T[];
    next(): T;
    removeValue(var1: T): IValueCycle<T>;
    setCurrentValue(var1: T, var2: boolean): IValueCycle<T>;
    setCurrentValue(var1: T): IValueCycle<T>;
    setCurrentValueByIndex(var1: number, var2: boolean): IValueCycle<T>;
    setCurrentValueByIndex(var1: number): IValueCycle<T>;
  }


  interface LocalizedEnumValueCycle<E extends LocalizedEnum<any> = any> extends ILocalizedValueCycle<E>, ValueCycle<E> {}
  class LocalizedEnumValueCycle<E extends LocalizedEnum<any> = any> extends ILocalizedValueCycle<E> {
    addCycleListener(listener: Consumer<E>): LocalizedEnumValueCycle<E>;
    get currentValueComponent(): MutableComponent;
    get cycleComponent(): MutableComponent;
    get cycleLocalizationKey(): string;
    static ofArray<E extends LocalizedEnum<any>>(cycleLocalizationKey: string, ...values: E[]): LocalizedEnumValueCycle<E>;
    static ofList<E extends LocalizedEnum<any>>(cycleLocalizationKey: string, values: E[]): LocalizedEnumValueCycle<E>;
    setCycleComponentStyleSupplier(supplier: ConsumingSupplier<E, Style>): LocalizedEnumValueCycle<E>;
  }


  interface LocalizedGenericValueCycle<T = any> extends ILocalizedValueCycle<T>, ValueCycle<T> {}
  class LocalizedGenericValueCycle<T = any> extends ILocalizedValueCycle<T> {
    addCycleListener(listener: Consumer<T>): LocalizedGenericValueCycle<T>;
    get currentValueComponent(): MutableComponent;
    get cycleComponent(): MutableComponent;
    get cycleLocalizationKey(): string;
    static of<T>(cycleLocalizationKey: string, ...values: T[]): LocalizedGenericValueCycle<T>;
    setCycleComponentStyleSupplier(supplier: ConsumingSupplier<T, Style>): LocalizedGenericValueCycle<T>;
    setValueComponentStyleSupplier(supplier: ConsumingSupplier<T, Style>): LocalizedGenericValueCycle<T>;
    setValueNameSupplier(supplier: ConsumingSupplier<T, string>): LocalizedGenericValueCycle<T>;
  }


  interface ValueCycle<T = any> extends IValueCycle<T> {}
  class ValueCycle<T = any> extends IValueCycle<T> {
    addCycleListener(listener: Consumer<T>): ValueCycle<T>;
    clearCycleListeners(): ValueCycle<T>;
    current(): T;
    static fromArray<T>(...values: T[]): ValueCycle<T>;
    static fromList<T>(values: T[]): ValueCycle<T>;
    get values(): T[];
    next(): T;
    removeValue(value: T): ValueCycle<T>;
    setCurrentValue(value: T, notifyListeners: boolean): ValueCycle<T>;
    setCurrentValue(value: T): ValueCycle<T>;
    setCurrentValueByIndex(index: number, notifyListeners: boolean): ValueCycle<T>;
    setCurrentValueByIndex(index: number): ValueCycle<T>;
  }

}

declare module 'de.keksuccino.fancymenu.util.cycle.CommonCycles' {
  import { Enum } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface CycleOnOff extends Enum<CycleOnOff> {}
  class CycleOnOff extends Enum<CycleOnOff> {
    static readonly ON: CycleOnOff;
    static readonly OFF: CycleOnOff;
    get asBoolean(): boolean;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): CycleOnOff[];
    static getByBoolean(b: boolean): CycleOnOff;
    static getByName(name: string): CycleOnOff;
    getByNameInternal(name: string): CycleOnOff;
    static valueOf(name: string): CycleOnOff;
    static values(): CycleOnOff[];
  }


  interface CycleEnabledDisabled extends Enum<CycleEnabledDisabled> {}
  class CycleEnabledDisabled extends Enum<CycleEnabledDisabled> {
    static readonly ENABLED: CycleEnabledDisabled;
    static readonly DISABLED: CycleEnabledDisabled;
    get asBoolean(): boolean;
    get localizationKeyBase(): string;
    get name(): string;
    get valueComponentStyle(): Style;
    get values(): CycleEnabledDisabled[];
    static getByBoolean(b: boolean): CycleEnabledDisabled;
    static getByName(name: string): CycleEnabledDisabled;
    getByNameInternal(name: string): CycleEnabledDisabled;
    static valueOf(name: string): CycleEnabledDisabled;
    static values(): CycleEnabledDisabled[];
  }

}

declare module 'de.keksuccino.fancymenu.util.enums' {
  import { MutableComponent, Style } from 'net.minecraft.network.chat';
  import { LocalizedGenericValueCycle } from 'de.keksuccino.fancymenu.util.cycle';
  import { Supplier } from 'java.util.function';

  interface LocalizedCycleEnum<E = any> extends LocalizedEnum<E> {}
  class LocalizedCycleEnum<E = any> extends LocalizedEnum<E> {
    cycle(selected: E): LocalizedGenericValueCycle<E>;
    cycle(): LocalizedGenericValueCycle<E>;
    get cycleComponent(): MutableComponent;
    get cycleComponentStyle(): Style;
  }


  interface LocalizedEnum<E = any> extends NamedEnum<E> {}
  class LocalizedEnum<E = any> extends NamedEnum<E> {
    static readonly SUCCESS_TEXT_STYLE: Supplier;
    static readonly WARNING_TEXT_STYLE: Supplier;
    static readonly ERROR_TEXT_STYLE: Supplier;
    get localizationKeyBase(): string;
    get valueComponent(): MutableComponent;
    get valueComponentStyle(): Style;
    get valueLocalizationKey(): string;
  }


  class NamedEnum<E = any> {
    get name(): string;
    get values(): E[];
    getByNameInternal(var1: string): E;
  }

}

declare module 'de.keksuccino.fancymenu.util.event.acara' {
  import { Exception, Class } from 'java.lang';
  import { Consumer } from 'java.util.function';

  class EventBase {
    isCancelable(): boolean;
    isCanceled(): boolean;
    setCanceled(b: boolean): void;
  }


  interface EventCancellationException extends Exception {}
  class EventCancellationException extends Exception {
    constructor(msg: string);
  }


  class EventHandler {
    static readonly INSTANCE: EventHandler;
    eventsRegisteredForType(eventType: Class<EventBase>): boolean;
    postEvent(event: EventBase): void;
    registerListener(listener: Consumer<EventBase>, eventType: Class<EventBase>): void;
    registerListener(listener: Consumer<EventBase>, eventType: Class<EventBase>, priority: number): void;
    registerListenersOf(clazz: Class<any>): void;
    registerListenersOf(object: any): void;
  }


  class EventPriority {
    static readonly VERY_LOW: number;
    static readonly LOWER: number;
    static readonly LOW: number;
    static readonly NORMAL: number;
    static readonly HIGH: number;
    static readonly HIGHER: number;
    static readonly VERY_HIGH: number;
  }

}

declare module 'de.keksuccino.fancymenu.util.file' {
  import { Path } from 'java.nio.file';
  import { File, InputStream } from 'java.io';
  import { Comparator, List } from 'java.util';
  import { FileUtils as de_keksuccino_konkrete_file_FileUtils } from 'de.keksuccino.konkrete.file';
  import { ResourceSourceType } from 'de.keksuccino.fancymenu.util.resource';
  import { FileType, FileMediaType } from 'de.keksuccino.fancymenu.util.file.type';

  class DotMinecraftUtils {
    static convertToShortenedDotMinecraftPath(path: string): string;
    static get minecraftDirectory(): Path;
    static get minecraftDirectoryAsFile(): File;
    static isInsideMinecraftDirectory(path: Path): boolean;
    static isInsideMinecraftDirectory(file: File): boolean;
    static isInsideMinecraftDirectory(pathString: string): boolean;
    static isShortenedDotMinecraftPath(path: string): boolean;
    static resolveMinecraftPath(path: Path): Path;
    static resolveMinecraftPath(file: File): File;
    static resolveMinecraftPath(pathString: string): string;
  }


  class FileFilter {
    static readonly RESOURCE_NAME_FILTER: FileFilter;
    static readonly IMAGE_FILE_FILTER: FileFilter;
    static readonly AUDIO_FILE_FILTER: FileFilter;
    static readonly VIDEO_FILE_FILTER: FileFilter;
    static readonly TEXT_FILE_FILTER: FileFilter;
    checkFile(var1: File): boolean;
  }


  interface FilenameComparator extends Comparator<string> {}
  class FilenameComparator extends Comparator<string> {
    compare(o1: string, o2: string): number;
  }


  interface FileUtils extends de_keksuccino_konkrete_file_FileUtils {}
  class FileUtils extends de_keksuccino_konkrete_file_FileUtils {
    static createDirectory(directory: File): File;
    static generateUniqueFileName(fileOrFolder: File, isDirectory: boolean): File;
    static openFile(file: File): void;
    static readTextLinesFrom(inParameter: InputStream): string[];
    static readTextLinesFrom(file: File): string[];
  }


  class GameDirectoryUtils {
    static get gameDirectory(): File;
    static getAbsoluteGameDirectoryPath(path: string): string;
    static getPathWithoutGameDirectory(path: string): string;
    static isExistingGameDirectoryPath(path: string): boolean;
  }


  class ResourceFile {
    static readonly ASSETS_DIR: File;
    static asset(gameDirectoryFile: File): ResourceFile;
    static asset(gameDirectoryFilePath: string): ResourceFile;
    exists(): boolean;
    get absolutePath(): string;
    get asResourceSource(): string;
    get file(): File;
    get fileExtension(): string;
    get fileName(): string;
    get fileNameWithoutExtension(): string;
    get mediaType(): FileMediaType;
    get resourceSourceType(): ResourceSourceType;
    get shortPath(): string;
    get type(): FileType<any>;
    isAsset(): boolean;
    isDirectory(): boolean;
    isExistingAsset(): boolean;
    isFile(): boolean;
    static of(gameDirectoryFile: File): ResourceFile;
    static of(gameDirectoryFilePath: string): ResourceFile;
  }

}

declare module 'de.keksuccino.fancymenu.util.file.type' {
  import { Class, Enum } from 'java.lang';
  import { InputStream, File } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { ResourceSource } from 'de.keksuccino.fancymenu.util.resource';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  class FileCodec<T = any> {
    static advanced<T>(type: Class<T>, streamReader: ConsumingSupplier<InputStream, T>, locationReader: ConsumingSupplier<ResourceLocation, T>, fileReader: ConsumingSupplier<File, T>, urlReader: ConsumingSupplier<string, T>, inParameter: InputStream | null, location: ResourceLocation | null, file: File | null, fileUrl: string | null): FileCodec<T>;
    static basic<T>(type: Class<T>, streamReader: ConsumingSupplier<InputStream, T>, locationReader: ConsumingSupplier<ResourceLocation, T>, inParameter: InputStream | null, location: ResourceLocation | null, file: File | null, fileUrl: string | null): FileCodec<T>;
    static basicWithLocal<T>(type: Class<T>, streamReader: ConsumingSupplier<InputStream, T>, locationReader: ConsumingSupplier<ResourceLocation, T>, fileReader: ConsumingSupplier<File, T>, inParameter: InputStream | null, location: ResourceLocation | null, file: File | null, fileUrl: string | null): FileCodec<T>;
    static basicWithWeb<T>(type: Class<T>, streamReader: ConsumingSupplier<InputStream, T>, locationReader: ConsumingSupplier<ResourceLocation, T>, urlReader: ConsumingSupplier<string, T>, inParameter: InputStream | null, location: ResourceLocation | null, file: File | null, fileUrl: string | null): FileCodec<T>;
    static empty<T>(type: Class<T>, inParameter: InputStream | null, location: ResourceLocation | null, file: File | null, fileUrl: string | null): FileCodec<T>;
    static generic<T>(type: Class<T>, streamReader: ConsumingSupplier<InputStream, T>): FileCodec<T>;
    read(var1: InputStream): T;
    read(resourceSource: ResourceSource): T;
    readLocal(var1: File): T;
    readLocation(var1: ResourceLocation): T;
    readWeb(var1: string): T;
  }


  interface FileMediaType extends Enum<FileMediaType> {}
  class FileMediaType extends Enum<FileMediaType> {
    static readonly IMAGE: FileMediaType;
    static readonly VIDEO: FileMediaType;
    static readonly AUDIO: FileMediaType;
    static readonly TEXT: FileMediaType;
    static readonly OTHER: FileMediaType;
    static valueOf(name: string): FileMediaType;
    static values(): FileMediaType[];
  }


  class FileType<T = any> {
    addExtension(extension: string): FileType<T>;
    get codec(): FileCodec<T>;
    get displayName(): Component;
    get extensions(): string[];
    get mediaType(): FileMediaType;
    get mimeType(): string;
    isFileType(resourceSource: ResourceSource, doAdvancedWebChecks: boolean): boolean;
    isFileTypeLocal(file: File): boolean;
    isFileTypeLocation(location: ResourceLocation): boolean;
    isFileTypeWeb(fileUrl: string): boolean;
    isFileTypeWebAdvanced(fileUrl: string): boolean;
    isLocalAllowed(): boolean;
    isLocationAllowed(): boolean;
    isWebAllowed(): boolean;
    removeExtension(extension: string): FileType<T>;
    set codec(codec: FileCodec<T>);
    setCustomDisplayName(name: Component): FileType<T>;
    setLocalAllowed(allowLocal: boolean): FileType<T>;
    setLocationAllowed(allowLocation: boolean): FileType<T>;
    setWebAllowed(allowWeb: boolean): FileType<T>;
    toString(): string;
  }


  class FileTypeRegistry {
    static get fileTypes(): FileType<any>[];
    static getFileType(fileTypeName: string): FileType<any>;
    static register(fileTypeName: string, fileType: FileType<any>): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.file.type.groups' {
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { FileType } from 'de.keksuccino.fancymenu.util.file.type';
  import { Resource } from 'de.keksuccino.fancymenu.util.resource';

  class FileTypeGroup<T extends FileType<any> = any> {
    constructor(typeSupplier: Supplier<T[]>);

    constructor(typeSupplier: Supplier<T[]>, displayName: Component);
    static allSupported(): FileTypeGroup<FileType<Resource>>;
    get displayName(): Component;
    get fileTypes(): T[];
    get typeSupplier(): Supplier<T[]>;
    static of<T extends FileType<any>>(...types: T[]): FileTypeGroup<T>;
    set displayName(displayName: Component);
    set typeSupplier(typeSupplier: Supplier<T[]>);
  }


  class FileTypeGroups {
    static readonly IMAGE_GROUP_COMPONENT: Component;
    static readonly AUDIO_GROUP_COMPONENT: Component;
    static readonly VIDEO_GROUP_COMPONENT: Component;
    static readonly TEXT_GROUP_COMPONENT: Component;
    static readonly IMAGE_TYPES: FileTypeGroup;
    static readonly AUDIO_TYPES: FileTypeGroup;
    static readonly VIDEO_TYPES: FileTypeGroup;
    static readonly TEXT_TYPES: FileTypeGroup;
  }

}

declare module 'de.keksuccino.fancymenu.util.file.type.types' {
  import { FileType, FileCodec } from 'de.keksuccino.fancymenu.util.file.type';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File } from 'java.io';
  import { ResourceSource } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';

  interface AudioFileType extends FileType<IAudio> {}
  class AudioFileType extends FileType<IAudio> {
    constructor(codec: FileCodec<IAudio>, mimeType: string, ...extensions: string[]);
    addExtension(extension: string): AudioFileType;
    removeExtension(extension: string): AudioFileType;
    setCodec(codec: FileCodec<IAudio>): AudioFileType;
    setCustomDisplayName(name: Component): AudioFileType;
    setLocalAllowed(allowLocal: boolean): AudioFileType;
    setLocationAllowed(allowLocation: boolean): AudioFileType;
    setWebAllowed(allowWeb: boolean): AudioFileType;
  }


  class FileTypes {
    static readonly UNKNOWN: FileType;
    static readonly JPEG_IMAGE: ImageFileType;
    static readonly PNG_IMAGE: ImageFileType;
    static readonly GIF_IMAGE: ImageFileType;
    static readonly APNG_IMAGE: ImageFileType;
    static readonly FMA_IMAGE: ImageFileType;
    static readonly OGG_AUDIO: AudioFileType;
    static readonly WAV_AUDIO: AudioFileType;
    static readonly MP4_VIDEO: VideoFileType;
    static readonly TXT_TEXT: TextFileType;
    static readonly MARKDOWN_TEXT: TextFileType;
    static readonly JSON_TEXT: TextFileType;
    static readonly LOG_TEXT: TextFileType;
    static readonly LANG_TEXT: TextFileType;
    static readonly LOCAL_TEXT: TextFileType;
    static readonly PROPERTIES_TEXT: TextFileType;
    static readonly XML_TEXT: TextFileType;
    static readonly JAVASCRIPT_TEXT: TextFileType;
    static readonly HTML_TEXT: TextFileType;
    static readonly CSS_TEXT: TextFileType;
    static readonly CSV_TEXT: TextFileType;
    static get allAnimatedImageFileTypes(): ImageFileType[];
    static get allAudioFileTypes(): AudioFileType[];
    static get allImageFileTypes(): ImageFileType[];
    static get allTextFileTypes(): TextFileType[];
    static get allVideoFileTypes(): VideoFileType[];
    static getLocalType(file: File): FileType<any>;
    static getLocationType(location: ResourceLocation): FileType<any>;
    static getType(resourceSource: ResourceSource, doAdvancedWebChecks: boolean): FileType<any>;
    static getWebType(fileUrl: string, doAdvancedWebChecks: boolean): FileType<any>;
    static registerAll(): void;
  }


  interface ImageFileType extends FileType<ITexture> {}
  class ImageFileType extends FileType<ITexture> {
    constructor(codec: FileCodec<ITexture>, mimeType: string, ...extensions: string[]);
    addExtension(extension: string): ImageFileType;
    isAnimated(): boolean;
    removeExtension(extension: string): ImageFileType;
    setAnimated(animated: boolean): ImageFileType;
    setCodec(codec: FileCodec<ITexture>): ImageFileType;
    setCustomDisplayName(name: Component): ImageFileType;
    setLocalAllowed(allowLocal: boolean): ImageFileType;
    setLocationAllowed(allowLocation: boolean): ImageFileType;
    setWebAllowed(allowWeb: boolean): ImageFileType;
  }


  interface TextFileType extends FileType<IText> {}
  class TextFileType extends FileType<IText> {
    constructor(codec: FileCodec<IText>, mimeType: string, ...extensions: string[]);
    addExtension(extension: string): TextFileType;
    removeExtension(extension: string): TextFileType;
    setCodec(codec: FileCodec<IText>): TextFileType;
    setCustomDisplayName(name: Component): TextFileType;
    setLocalAllowed(allowLocal: boolean): TextFileType;
    setLocationAllowed(allowLocation: boolean): TextFileType;
    setWebAllowed(allowWeb: boolean): TextFileType;
  }


  interface VideoFileType extends FileType<IVideo> {}
  class VideoFileType extends FileType<IVideo> {
    constructor(codec: FileCodec<IVideo>, mimeType: string, ...extensions: string[]);
    addExtension(extension: string): VideoFileType;
    removeExtension(extension: string): VideoFileType;
    setCodec(codec: FileCodec<IVideo>): VideoFileType;
    setCustomDisplayName(name: Component): VideoFileType;
    setLocalAllowed(allowLocal: boolean): VideoFileType;
    setLocationAllowed(allowLocation: boolean): VideoFileType;
    setWebAllowed(allowWeb: boolean): VideoFileType;
  }

}

declare module 'de.keksuccino.fancymenu.util.input' {
  import { CharacterFilter as de_keksuccino_konkrete_input_CharacterFilter } from 'de.keksuccino.konkrete.input';
  import { InputConstants as com_mojang_blaze3d_platform_InputConstants } from 'com.mojang.blaze3d.platform';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';

  class CharacterFilter {
    addAllowedCharacters(...chars: string[]): void;
    addAllowedCharacters(...chars: string[]): void;
    addAllowedCharacters(...chars: string[]): void;
    addAllowedCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    addForbiddenCharacters(...chars: string[]): void;
    static buildDecimalFiler(): CharacterFilter;
    static buildIntegerFiler(): CharacterFilter;
    static buildLowercaseAndUppercaseFileNameFilter(): CharacterFilter;
    static buildOnlyLowercaseFileNameFilter(): CharacterFilter;
    static buildResourceNameFilter(): CharacterFilter;
    static buildUrlFilter(): CharacterFilter;
    convertToLegacyFilter(): de_keksuccino_konkrete_input_CharacterFilter;
    filterForAllowedChars(text: string): string;
    filterForAllowedChars(text: string): string;
    isAllowed(c: string): boolean;
    isAllowed(charString: string): boolean;
    isAllowedChar(c: string): boolean;
    isAllowedChar(charAsString: string): boolean;
    isAllowedText(text: string): boolean;
  }


  interface InputConstants extends com_mojang_blaze3d_platform_InputConstants {}
  class InputConstants extends com_mojang_blaze3d_platform_InputConstants {
    static readonly KEY_ENTER: number;
  }


  class InputUtils {
    static getKeyName(keycode: number, scancode: number): string;
  }


  class TextValidators {
    static readonly NO_EMPTY_STRING_TEXT_VALIDATOR: ConsumingSupplier;
    static readonly NO_EMPTY_STRING_SPACES_ALLOWED_TEXT_VALIDATOR: ConsumingSupplier;
    static readonly BASIC_URL_TEXT_VALIDATOR: ConsumingSupplier;
    static readonly HEX_COLOR_TEXT_VALIDATOR: ConsumingSupplier;
    static readonly INTEGER_TEXT_VALIDATOR: ConsumingSupplier;
    static readonly DOUBLE_TEXT_VALIDATOR: ConsumingSupplier;
  }

}

declare module 'de.keksuccino.fancymenu.util.level' {
  import { ServerLevel } from 'net.minecraft.server.level';
  import { BlockPos, RegistryAccess } from 'net.minecraft.core';
  import { ResourceKey, ResourceLocation } from 'net.minecraft.resources';
  import { Structure } from 'net.minecraft.world.level.levelgen.structure';
  import { List, Optional } from 'java.util';

  class StructureUtils {
    static convertStructureKeysToStrings(keys: ResourceKey<Structure>[]): string[];
    static findStructureKey(registryAccess: RegistryAccess, structureName: string): Optional<ResourceKey<Structure>>;
    static getAllStructureKeys(registryAccess: RegistryAccess): ResourceKey<Structure>[];
    static getAllStructuresAt(level: ServerLevel, pos: BlockPos): ResourceKey<Structure>[];
    static getStructureKey(structureId: string): ResourceKey<Structure>;
    static getStructureKey(location: ResourceLocation): ResourceKey<Structure>;
    static isInStructure(level: ServerLevel, pos: BlockPos, structure: ResourceKey<Structure>): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.mcef' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CefMessageRouterHandlerAdapter, CefLoadHandler } from 'org.cef.handler';
  import { CefBrowser, CefFrame } from 'org.cef.browser';
  import { CefQueryCallback } from 'org.cef.callback';
  import { ActionInstance } from 'de.keksuccino.fancymenu.customization.action';
  import { AbstractTexture, TextureManager } from 'net.minecraft.client.renderer.texture';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Executor } from 'java.util.concurrent';
  import { SoundSource } from 'net.minecraft.sounds';
  import { Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Closeable } from 'java.io';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuUiComponent } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { MCEFBrowser } from 'com.cinemamod.mcef';

  class ActionBridge {
    static readonly LOGGER: Logger;
    static readonly JAVASCRIPT_API: string;
    static createMessageHandler(): CefMessageRouterHandlerAdapter;
    static dispose(): void;
    static executeAction(action: ActionInstance): void;
    static initialize(): void;
    onQuery(browser: CefBrowser, frame: CefFrame, query_id: number, request: string, persistent: boolean, callback: CefQueryCallback): boolean;
    static parseBrowserAction(actionString: string): ActionInstance;
  }


  interface BrowserFrameTexture extends AbstractTexture {}
  class BrowserFrameTexture extends AbstractTexture {
    constructor(id: number);
    bind(): void;
    get id(): number;
    load(var1: ResourceManager): void;
    releaseId(): void;
    reset($$0: TextureManager, $$1: ResourceManager, $$2: ResourceLocation, $$3: Executor): void;
    set id(id: number);
    setFilter($$0: boolean, $$1: boolean): void;
  }


  class BrowserHandler {
    static initialized: boolean;
    static get(identifier: string): WrappedMCEFBrowser;
    static init(): void;
    static mouseMoved(mouseX: number, mouseY: number): void;
    static notifyHandler(identifier: string, browser: WrappedMCEFBrowser): void;
    static onVolumeUpdated(soundSource: SoundSource, newVolume: number): void;
    static remove(identifier: string, close: boolean): void;
    static tick(): void;
  }


  class BrowserLoadEventListenerManager {
    get globalHandler(): CefLoadHandler;
    static get instance(): BrowserLoadEventListenerManager;
    getIdByCefBrowser(cefBrowser: CefBrowser): string;
    registerListenerForBrowser(browser: WrappedMCEFBrowser, onLoadListener: Consumer<boolean>): void;
    registerPersistentListenerForBrowser(browser: WrappedMCEFBrowser, onLoadListener: Consumer<boolean>): void;
    unregisterAllListenersForBrowser(browserId: string): void;
  }


  class MCEFUtil {
    static MCEF_critical_failure: boolean;
    static MCEF_initialized: boolean;
    static isMCEFLoaded(): boolean;
  }


  interface WrappedMCEFBrowser extends Closeable, NavigatableWidget, FancyMenuUiComponent, AbstractWidget {}
  class WrappedMCEFBrowser extends Closeable {
    static build(url: string, transparent: boolean, autoHandle: boolean, loadListener: Consumer<boolean>): WrappedMCEFBrowser;
    static build(url: string, transparent: boolean, autoHandle: boolean, x: number, y: number, width: number, height: number, loadListener: Consumer<boolean>): WrappedMCEFBrowser;
    charTyped(codePoint: string, modifiers: number): boolean;
    close(): void;
    get actualVolume(): number;
    get browser(): MCEFBrowser;
    get frameLocation(): ResourceLocation;
    get identifier(): string;
    get url(): string;
    get volume(): number;
    goBack(): void;
    goForward(): void;
    isAutoHandle(): boolean;
    isAutoPlayAllVideosOnLoad(): boolean;
    isFocusable(): boolean;
    isFullscreenAllVideos(): boolean;
    isHideVideoControls(): boolean;
    isInteractable(): boolean;
    isLoopAllVideos(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isMuteAllMediaOnLoad(): boolean;
    isNavigatable(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseMoved(mouseX: number, mouseY: number): void;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollX: number, scrollY: number): boolean;
    onVolumeUpdated(soundSource: SoundSource, newVolume: number): void;
    reload(): void;
    set url(url: string);
    set volume(volume: number);
    setAutoHandle(autoHandle: boolean): void;
    setAutoPlayAllVideosOnLoad(autoPlayAllVideosOnLoad: boolean): void;
    setFocusable(focusable: boolean): void;
    setFullscreenAllVideos(fullscreenAllVideos: boolean): void;
    setHeight(height: number): void;
    setHideVideoControls(hideVideoControls: boolean): void;
    setInteractable(interactable: boolean): void;
    setLoopAllVideos(loopAllVideos: boolean): void;
    setMuteAllMediaOnLoad(muteAllMediaOnLoad: boolean): void;
    setNavigatable(navigatable: boolean): void;
    setOpacity(opacity: number): void;
    setSize(width: number, height: number): void;
    setWidth(width: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.media' {
  import { Optional } from 'java.util';
  import { MediaInfo } from 'de.keksuccino.fancymenu.util.media.GsmtcNowPlaying';

  class GsmtcNowPlaying {
    static get currentSession(): Optional<MediaInfo>;
  }

}

declare module 'de.keksuccino.fancymenu.util.media.GsmtcNowPlaying' {
  import { Integer, Double } from 'java.lang';
  import { Instant } from 'java.time';

  class MediaInfo {
    equals(obj: any): boolean;
    get album(): string;
    get albumArtist(): string;
    get appId(): string;
    get artist(): string;
    get durationSeconds(): number;
    get genres(): string;
    get lastUpdatedInstant(): Instant;
    get lastUpdatedRaw(): string;
    get playback(): string;
    get playbackRate(): number;
    get positionSeconds(): number;
    get thumbnail(): string;
    get thumbnailBytes(): number;
    get thumbnailContentType(): string;
    get title(): string;
    get trackNumber(): number;
    hashCode(): number;
    isPlaying(): boolean;
    toString(): string;
  }

}

declare module 'de.keksuccino.fancymenu.util.media.GsmtcNowPlaying.PersistentPowerShell' {
  class PersistentEnvelope {
  }

}

declare module 'de.keksuccino.fancymenu.util.minecraftoptions' {
  import { OptionInstance, KeyMapping } from 'net.minecraft.client';
  import { PlayerModelPart } from 'net.minecraft.world.entity.player';
  import { Map } from 'java.util';
  import { Function } from 'java.util.function';

  class MinecraftOption {
    get (): string;
    get name(): string;
    get optionInstance(): OptionInstance<any>;
    static of(name: string, optionInstance: OptionInstance<any>): MinecraftOption;
    static of(keyMapping: KeyMapping): MinecraftOption;
    static of(modelPart: PlayerModelPart): MinecraftOption;
    set (value: string);
  }


  class MinecraftOptions {
    static get options(): Map<string, MinecraftOption>;
    static getOption(name: string): MinecraftOption;
    process<T>(name: string, instance: OptionInstance<T>): void;
    process(s: string, i: number): number;
    process(s: string, b: boolean): boolean;
    process(s: string, s1: string): string;
    process(s: string, v: number): number;
    process<T>(s: string, t: T, functionParameter: Function<string, T>, function1: Function<T, string>): T;
    static save(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.MinecraftResourceReloadObserver' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ReloadAction extends Enum<ReloadAction> {}
  class ReloadAction extends Enum<ReloadAction> {
    static readonly STARTING: ReloadAction;
    static readonly FINISHED: ReloadAction;
    static valueOf(name: string): ReloadAction;
    static values(): ReloadAction[];
  }

}

declare module 'de.keksuccino.fancymenu.util.minecraftuser.v2' {
  import { MinecraftProfileTexture, MinecraftProfileTextures } from 'com.mojang.authlib.minecraft';
  import { Type } from 'MinecraftProfileTexture';
  import { UUID } from 'java.util';

  class MinecraftUsers {
    static readonly UNKNOWN_USER_PROFILE: UserProfile;
    static readonly MISSING_SKIN_TEXTURE: MinecraftProfileTexture;
    static readonly MISSING_CAPE_TEXTURE: MinecraftProfileTexture;
    static readonly MISSING_ELYTRA_TEXTURE: MinecraftProfileTexture;
    static readonly MISSING_PROFILE_TEXTURES: MinecraftProfileTextures;
    static getProfileTexture(playerName: string, type: Type): MinecraftProfileTexture;
    static getProfileTextures(playerName: string): MinecraftProfileTextures;
    static getUserProfile(playerName: string): UserProfile;
  }


  class UserProfile {
    get name(): string;
    get uUID(): UUID;
  }

}

declare module 'de.keksuccino.fancymenu.util.properties' {
  import { InputStream } from 'java.io';
  import { List, Map } from 'java.util';
  import { Boolean, Integer, Class } from 'java.lang';

  class PropertiesParser {
    static buildFancyStringFromList(list: string[]): string;
    static deserializeSetFromFancyString(serializedFancyString: string): PropertyContainerSet;
    static deserializeSetFromFile(filePath: string): PropertyContainerSet;
    static deserializeSetFromStream(inParameter: InputStream): PropertyContainerSet;
    static serializeContainerToFancyString(container: PropertyContainer): string;
    static serializeSetToFancyString(set: PropertyContainerSet): string;
    static serializeSetToFile(set: PropertyContainerSet, filePath: string): void;
    static stringifyFancyString(fancyString: string): string;
    static unstringify(stringified: string): string;
  }


  class PropertyContainer {
    constructor(type: string);
    get properties(): Map<string, string>;
    get type(): string;
    getValue(name: string): string;
    hasProperty(name: string): boolean;
    putProperty(name: string, value: string): void;
    removeProperty(name: string): void;
    set type(type: string);
    toString(): string;
  }


  class PropertyContainerSet {
    constructor(type: string);
    get containers(): PropertyContainer[];
    get type(): string;
    getContainersOfType(type: string): PropertyContainer[];
    getFirstContainerOfType(type: string): PropertyContainer;
    putContainer(data: PropertyContainer): void;
    set type(type: string);
  }


  class RuntimePropertyContainer {
    clear(): void;
    getBooleanProperty(key: string): boolean;
    getIntegerProperty(key: string): number;
    getProperty<T>(key: string, propertyType: Class<T>): T;
    getStringProperty(key: string): string;
    hasProperty(key: string): boolean;
    putProperty<T>(key: string, value: T): RuntimePropertyContainer;
    putPropertyIfAbsent<T>(key: string, value: T): RuntimePropertyContainer;
    putPropertyIfAbsentAndGet<T>(key: string, value: T): T;
    removeProperty(key: string): RuntimePropertyContainer;
  }

}

declare module 'de.keksuccino.fancymenu.util.properties.RuntimePropertyContainer' {
  class RuntimeProperty<T = any> {
    value: T;
    constructor(value: T);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering' {
  import { Color } from 'java.awt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { FloatColor } from 'de.keksuccino.fancymenu.util.rendering.DrawableColor';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DeferredScreenRenderingTask } from 'de.keksuccino.fancymenu.util.rendering.RenderingUtils';
  import { List } from 'java.util';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';
  import { Matrix4f } from 'org.joml';

  class AspectRatio {
    constructor(originalWidth: number, originalHeight: number);
    get inputHeight(): number;
    get inputWidth(): number;
    getAspectRatioHeight(givenWidth: number): number;
    getAspectRatioSizeByMaximumSize(givenWidth: number, givenHeight: number): number[];
    getAspectRatioSizeByMinimumSize(givenWidth: number, givenHeight: number): number[];
    getAspectRatioWidth(givenHeight: number): number;
  }


  class DrawableColor {
    static readonly EMPTY: DrawableColor;
    static readonly WHITE: DrawableColor;
    static readonly BLACK: DrawableColor;
    copy(): DrawableColor;
    get asFloats(): FloatColor;
    get color(): Color;
    get colorInt(): number;
    get hex(): string;
    getColorIntWithAlpha(alpha: number): number;
    static of(color: number): DrawableColor;
    static of(color: Color): DrawableColor;
    static of(hex: string): DrawableColor;
    static of(r: number, g: number, b: number): DrawableColor;
    static of(r: number, g: number, b: number, a: number): DrawableColor;
    resetShaderColor(graphics: GuiGraphics): void;
    setAsShaderColor(graphics: GuiGraphics, alpha: number): void;
    setAsShaderColor(graphics: GuiGraphics): void;
  }


  class RenderingUtils {
    static readonly MISSING_TEXTURE_COLOR_MAGENTA: DrawableColor;
    static readonly MISSING_TEXTURE_COLOR_BLACK: DrawableColor;
    static readonly FULLY_TRANSPARENT_TEXTURE: ResourceLocation;
    static addDeferredScreenRenderingTask(task: DeferredScreenRenderingTask): void;
    static blitF(graphics: GuiGraphics, location: ResourceLocation, x: number, y: number, f3: number, f4: number, width: number, height: number, width2: number, height2: number, color: number): void;
    static blitF(graphics: GuiGraphics, location: ResourceLocation, x: number, y: number, f3: number, f4: number, width: number, height: number, width2: number, height2: number): void;
    static blitMirrored(graphics: GuiGraphics, atlasLocation: ResourceLocation, x: number, y: number, u: number, v: number, spriteWidth: number, spriteHeight: number, textureWidth: number, textureHeight: number): void;
    static blitMirrored(graphics: GuiGraphics, atlasLocation: ResourceLocation, x: number, y: number, u: number, v: number, spriteWidth: number, spriteHeight: number, textureWidth: number, textureHeight: number, colorTint: number): void;
    static blitMirroredScaled(graphics: GuiGraphics, atlasLocation: ResourceLocation, x: number, y: number, u: number, v: number, spriteWidth: number, spriteHeight: number, renderWidth: number, renderHeight: number, textureWidth: number, textureHeight: number, color: number): void;
    static blitNineSlicedTexture(graphics: GuiGraphics, texture: ResourceLocation, x: number, y: number, width: number, height: number, textureWidth: number, textureHeight: number, borderTop: number, borderRight: number, borderBottom: number, borderLeft: number): void;
    static blitRepeat(graphics: GuiGraphics, location: ResourceLocation, x: number, y: number, areaRenderWidth: number, areaRenderHeight: number, texWidth: number, texHeight: number): void;
    static disableScissor(graphics: GuiGraphics): void;
    static enableScissor(graphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number): void;
    static executeAndClearDeferredScreenRenderingTasks(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static fillF(graphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, color: number): void;
    static fillF(graphics: GuiGraphics, minX: number, minY: number, maxX: number, maxY: number, z: number, color: number): void;
    static get deferredScreenRenderingTasks(): DeferredScreenRenderingTask[];
    static get overrideBackgroundBlurRadius(): number;
    static get partialTick(): number;
    static isDepthTestLocked(): boolean;
    static isMatrixIdentity(matrix: Matrix4f): boolean;
    static isMenuBlurringBlocked(): boolean;
    static isTooltipRenderingBlocked(): boolean;
    static isXYInArea(targetX: number, targetY: number, x: number, y: number, width: number, height: number): boolean;
    static isXYInArea(targetX: number, targetY: number, x: number, y: number, width: number, height: number): boolean;
    static renderMissing(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    static replaceAlphaInColor(color: number, newAlpha: number): number;
    static replaceAlphaInColor(color: number, newAlpha: number): number;
    static resetGuiScale(): void;
    static resetOverrideBackgroundBlurRadius(): void;
    static resetShaderColor(graphics: GuiGraphics): void;
    static set overrideBackgroundBlurRadius(radius: number);
    static setDepthTestLocked(locked: boolean): void;
    static setMenuBlurringBlocked(blocked: boolean): void;
    static setShaderColor(graphics: GuiGraphics, color: DrawableColor): void;
    static setShaderColor(graphics: GuiGraphics, color: DrawableColor, alpha: number): void;
    static setShaderColor(graphics: GuiGraphics, color: number, alpha: number): void;
    static setShaderColor(graphics: GuiGraphics, color: number): void;
    static setTooltipRenderingBlocked(blocked: boolean): void;
    static shouldOverrideBackgroundBlurRadius(): boolean;
    static transformAxisAligned(toTransform: ScreenRectangle, pose: Matrix4f): ScreenRectangle;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.entity' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { Rotation } from 'it.crystalnest.fancy_entity_renderer.api';
  import { PlayerSkin } from 'net.minecraft.client.resources';
  import { Pose } from 'net.minecraft.world.entity';
  import { RenderMode } from 'it.crystalnest.fancy_entity_renderer.api.entity';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Variant } from 'Parrot';
  import { Item, ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { UUID } from 'java.util';

  class FancyEntityRendererUtils {
    static isFerLoaded(): boolean;
  }


  interface WrappedFancyPlayerWidget extends NavigatableWidget, AbstractWidget {}
  class WrappedFancyPlayerWidget extends NavigatableWidget {
    static build(x: number, y: number, width: number, height: number): WrappedFancyPlayerWidget;
    copyLocalPlayer(): WrappedFancyPlayerWidget;
    copyPlayer(profileName: string): WrappedFancyPlayerWidget;
    copyPlayer(profileId: UUID): WrappedFancyPlayerWidget;
    isCopyingPlayer(): boolean;
    isFocusable(): boolean;
    isNavigatable(): boolean;
    setBaby(isBaby: boolean): WrappedFancyPlayerWidget;
    setBodyFollowsMouse(followsMouse: boolean): WrappedFancyPlayerWidget;
    setBodyMovement(shouldMove: boolean): WrappedFancyPlayerWidget;
    setBodyRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setBodyRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setChestWearable(item: string, provider: Provider): WrappedFancyPlayerWidget;
    setChestWearable(item: Item): WrappedFancyPlayerWidget;
    setChestWearable(item: ItemStack): WrappedFancyPlayerWidget;
    setFeetWearable(item: string, provider: Provider): WrappedFancyPlayerWidget;
    setFeetWearable(item: Item): WrappedFancyPlayerWidget;
    setFeetWearable(item: ItemStack): WrappedFancyPlayerWidget;
    setFocusable(focusable: boolean): void;
    setGlowing(isGlowing: boolean): WrappedFancyPlayerWidget;
    setHeadFollowsMouse(followsMouse: boolean): WrappedFancyPlayerWidget;
    setHeadRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setHeadRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setHeadWearable(item: string, provider: Provider): WrappedFancyPlayerWidget;
    setHeadWearable(item: Item): WrappedFancyPlayerWidget;
    setHeadWearable(item: ItemStack): WrappedFancyPlayerWidget;
    setHeight(height: number): void;
    setLeftArmRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setLeftArmRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setLeftHandItem(item: Item): WrappedFancyPlayerWidget;
    setLeftHandItem(item: ItemStack): WrappedFancyPlayerWidget;
    setLeftLegRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setLeftLegRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setLegsWearable(item: string, provider: Provider): WrappedFancyPlayerWidget;
    setLegsWearable(item: Item): WrappedFancyPlayerWidget;
    setLegsWearable(item: ItemStack): WrappedFancyPlayerWidget;
    setMoving(isMoving: boolean): WrappedFancyPlayerWidget;
    setName(name: string): WrappedFancyPlayerWidget;
    setNavigatable(navigatable: boolean): void;
    setOnFire(onFire: boolean): WrappedFancyPlayerWidget;
    setOnFire(onFire: boolean, fireType: ResourceLocation): WrappedFancyPlayerWidget;
    setParrots(leftParrot: Variant, rightParrot: Variant): WrappedFancyPlayerWidget;
    setPose(pose: Pose): WrappedFancyPlayerWidget;
    setRenderMode(renderMode: RenderMode): WrappedFancyPlayerWidget;
    setRightArmRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setRightArmRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setRightHandItem(item: Item): WrappedFancyPlayerWidget;
    setRightHandItem(item: ItemStack): WrappedFancyPlayerWidget;
    setRightLegRotation(rotation: Rotation): WrappedFancyPlayerWidget;
    setRightLegRotation(x: number, y: number, z: number): WrappedFancyPlayerWidget;
    setShowName(showName: boolean): WrappedFancyPlayerWidget;
    setSize(width: number, height: number): void;
    setSkin(skin: PlayerSkin): WrappedFancyPlayerWidget;
    setSlim(isSlim: boolean): WrappedFancyPlayerWidget;
    setUpsideDown(isUpsideDown: boolean): WrappedFancyPlayerWidget;
    setWidth(width: number): void;
    setX(x: number): void;
    setY(y: number): void;
    uncopyPlayer(): WrappedFancyPlayerWidget;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.RenderingUtils' {
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class DeferredScreenRenderingTask {
    render(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.color.colors' {
  class TextColorFormatters {
    static registerAll(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.color' {
  import { Supplier } from 'java.util.function';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Style } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  interface DynamicTextColorFormatter extends TextColorFormatter {}
  class DynamicTextColorFormatter extends TextColorFormatter {
    constructor(code: string, colorSupplier: Supplier<DrawableColor>);
    get color(): DrawableColor;
  }


  class TextColorFormatter {
    constructor(code: string, color: DrawableColor);
    get code(): string;
    get codeString(): string;
    get color(): DrawableColor;
    get style(): Style;
  }


  class TextColorFormatterRegistry {
    static get formatters(): TextColorFormatter[];
    static getByCode(code: string): TextColorFormatter;
    static getFormatter(identifier: string): TextColorFormatter;
    static register(identifier: string, formatter: TextColorFormatter): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text' {
  import { Component, MutableComponent, FormattedText } from 'net.minecraft.network.chat';
  import { List } from 'java.util';

  class ComponentParser {
    static fromJsonOrPlainText(serializedComponentOrPlainText: string): Component;
    static toJson(component: Component): string;
  }


  class TextFormattingUtils {
    static convertComponentToString(textComponent: Component): string;
    static convertFormattedTextToComponent(text: FormattedText): MutableComponent;
    static lineWrapComponents<C extends Component>(lines: C[], maxLength: number): MutableComponent[];
    static lineWrapComponents<C extends Component>(lines: C, maxLength: number): MutableComponent[];
    static replaceFormattingCodes(inParameter: string, oldPrefix: string, newPrefix: string): string;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown' {
  import { List, Map } from 'java.util';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { FocuslessContainerEventHandler } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Boolean, Float } from 'java.lang';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { TextCase, MarkdownLineAlignment } from 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownRenderer';
  import { NarrationPriority } from 'NarratableEntry';
  import { GuiEventListener, ContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { HeadlineType, Hyperlink, QuoteContext, CodeBlockContext, TableContext } from 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextFragment';
  import { TableCellAlignment } from 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextBuilder';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';

  class MarkdownParser {
    static parse(renderer: MarkdownRenderer, markdownText: string, parseMarkdown: boolean): MarkdownTextFragment[];
  }


  interface MarkdownRenderer extends Renderable, FocuslessContainerEventHandler, NarratableEntry, NavigatableWidget {}
  class MarkdownRenderer extends Renderable {
    skipRefresh: boolean;
    constructor();
    addLineRenderValidator(validator: ConsumingSupplier<MarkdownTextLine, boolean>): MarkdownRenderer;
    children(): MarkdownTextFragment[];
    get border(): number;
    get bulletListDotColor(): DrawableColor;
    get bulletListIndent(): number;
    get bulletListSpacing(): number;
    get codeBlockMultiLineColor(): DrawableColor;
    get codeBlockSingleLineColor(): DrawableColor;
    get headlineUnderlineColor(): DrawableColor;
    get hyperlinkColor(): DrawableColor;
    get lineSpacing(): number;
    get optimalWidth(): number;
    get parentRenderScale(): number;
    get quoteColor(): DrawableColor;
    get quoteIndent(): number;
    get realHeight(): number;
    get realWidth(): number;
    get separationLineColor(): DrawableColor;
    get tableAlternateRowColor(): DrawableColor;
    get tableCellPadding(): number;
    get tableHeaderBackgroundColor(): DrawableColor;
    get tableLineColor(): DrawableColor;
    get tableLineThickness(): number;
    get tableMargin(): number;
    get tableRowBackgroundColor(): DrawableColor;
    get text(): string;
    get textBaseColor(): DrawableColor;
    get textBaseScale(): number;
    get textCase(): TextCase;
    get textOpacity(): number;
    get x(): number;
    get y(): number;
    isAutoLineBreakingEnabled(): boolean;
    isDragging(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isNavigatable(): boolean;
    isParseMarkdown(): boolean;
    isQuoteItalic(): boolean;
    isRemoveHtmlBreaks(): boolean;
    isTableAlternateRowColors(): boolean;
    isTableShowHeader(): boolean;
    isTextShadow(): boolean;
    narrationPriority(): NarrationPriority;
    refreshRenderer(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetHovered(): void;
    set border(border: number);
    set bulletListDotColor(bulletListDotColor: DrawableColor);
    set bulletListIndent(bulletListIndent: number);
    set bulletListSpacing(bulletListSpacing: number);
    set codeBlockMultiLineColor(codeBlockMultiLineColor: DrawableColor);
    set codeBlockSingleLineColor(codeBlockSingleLineColor: DrawableColor);
    set hyperlinkColor(hyperlinkColor: DrawableColor);
    set lineSpacing(lineSpacing: number);
    set optimalWidth(width: number);
    set parentRenderScale(parentRenderScale: number);
    set quoteColor(quoteColor: DrawableColor);
    set quoteIndent(quoteIndent: number);
    set separationLineColor(separationLineColor: DrawableColor);
    set tableAlternateRowColor(tableAlternateRowColor: DrawableColor);
    set tableCellPadding(tableCellPadding: number);
    set tableHeaderBackgroundColor(tableHeaderBackgroundColor: DrawableColor);
    set tableLineColor(tableLineColor: DrawableColor);
    set tableLineThickness(tableLineThickness: number);
    set tableMargin(tableMargin: number);
    set tableRowBackgroundColor(tableRowBackgroundColor: DrawableColor);
    set text(text: string);
    set textBaseColor(textBaseColor: DrawableColor);
    set textBaseScale(textBaseScale: number);
    set textCase(textCase: TextCase);
    set textOpacity(opacity: number);
    set x(x: number);
    set y(y: number);
    setAutoLineBreakingEnabled(enabled: boolean): MarkdownRenderer;
    setDragging(dragging: boolean): void;
    setFocusable(focusable: boolean): void;
    setFocused(var1: boolean): void;
    setFocused(var1: GuiEventListener): void;
    setHeadlineLineColor(headlineUnderlineColor: DrawableColor): MarkdownRenderer;
    setNavigatable(navigatable: boolean): void;
    setParseMarkdown(parseMarkdown: boolean): void;
    setQuoteItalic(quoteItalic: boolean): MarkdownRenderer;
    setRemoveHtmlBreaks(removeHtmlBreaks: boolean): MarkdownRenderer;
    setTableAlternateRowColors(tableAlternateRowColors: boolean): MarkdownRenderer;
    setTableShowHeader(tableShowHeader: boolean): MarkdownRenderer;
    setTextShadow(textShadow: boolean): MarkdownRenderer;
    tick(): void;
    updateNarration(var1: NarrationElementOutput): void;
    updateSize(): void;
  }


  class MarkdownTextBuilder {
    addEmptyLine(): MarkdownTextBuilder;
    addHeadline(headlineType: HeadlineType, headline: string): MarkdownTextBuilder;
    addLine(line: string): MarkdownTextBuilder;
    addLocalizedHeadline(headlineType: HeadlineType, key: string, ...placeholders: any[]): MarkdownTextBuilder;
    addLocalizedLine(key: string, ...placeholders: any[]): MarkdownTextBuilder;
    addSimpleTable(data: String[][]): MarkdownTextBuilder;
    addTable(rows: string[][], alignments: TableCellAlignment[]): MarkdownTextBuilder;
    build(): string;
    static create(): MarkdownTextBuilder;
    toString(): string;
  }


  interface MarkdownTextFragment extends Renderable, GuiEventListener {}
  class MarkdownTextFragment extends Renderable {
    readonly parent: MarkdownRenderer;
    parentLine: MarkdownTextLine;
    text: string;
    x: number;
    y: number;
    unscaledTextWidth: number;
    unscaledTextHeight: number;
    startOfRenderLine: boolean;
    naturalLineBreakAfter: boolean;
    autoLineBreakAfter: boolean;
    endOfWord: boolean;
    imageSupplier: ResourceSupplier;
    separationLine: boolean;
    textColor: DrawableColor;
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    bulletListItemStart: boolean;
    bulletListLevel: number;
    alignment: MarkdownLineAlignment;
    hyperlink: Hyperlink;
    headlineType: HeadlineType;
    quoteContext: QuoteContext;
    codeBlockContext: CodeBlockContext;
    plainText: boolean;
    font: ResourceLocation;
    hovered: boolean;
    tableContext: TableContext;
    constructor(parent: MarkdownRenderer, text: string);
    get renderHeight(): number;
    get renderWidth(): number;
    get scale(): number;
    get textHeight(): number;
    get textRenderHeight(): number;
    get textRenderWidth(): number;
    get textRenderX(): number;
    get textRenderY(): number;
    get textWidth(): number;
    get textX(): number;
    get textY(): number;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isTable(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setFocused(var1: boolean): void;
  }


  interface MarkdownTextLine extends Renderable {}
  class MarkdownTextLine extends Renderable {
    parent: MarkdownRenderer;
    offsetX: number;
    offsetY: number;
    containsMultilineCodeBlockFragments: boolean;
    alignment: MarkdownLineAlignment;
    bulletListItemStartLine: boolean;
    readonly singleLineCodeBlockStartEndPairs: Map;
    readonly fragments: List;
    constructor(parent: MarkdownRenderer);
    get lineHeight(): number;
    get lineWidth(): number;
    isAlignmentAllowed(alignment: MarkdownLineAlignment): boolean;
    prepareFragments(): void;
    prepareLine(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ScrollableMarkdownRenderer extends Renderable, ContainerEventHandler, NarratableEntry {}
  class ScrollableMarkdownRenderer extends Renderable {
    constructor(x: number, y: number, width: number, height: number);
    children(): GuiEventListener[];
    get focused(): GuiEventListener;
    get markdownRenderer(): MarkdownRenderer;
    get scrollArea(): ScrollArea;
    isDragging(): boolean;
    isScrollingAllowed(): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    rebuild(x: number, y: number, width: number, height: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set focused(var1: GuiEventListener);
    setDragging(dragging: boolean): void;
    setScrollingAllowed(allowed: boolean): ScrollableMarkdownRenderer;
    setText(text: string): ScrollableMarkdownRenderer;
    updateNarration(var1: NarrationElementOutput): void;
    updateScrollArea(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownRenderer' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TextCase extends Enum<TextCase> {}
  class TextCase extends Enum<TextCase> {
    static readonly NORMAL: TextCase;
    static readonly ALL_LOWER: TextCase;
    static readonly ALL_UPPER: TextCase;
    static valueOf(name: string): TextCase;
    static values(): TextCase[];
  }


  interface MarkdownLineAlignment extends Enum<MarkdownLineAlignment> {}
  class MarkdownLineAlignment extends Enum<MarkdownLineAlignment> {
    static readonly LEFT: MarkdownLineAlignment;
    static readonly CENTERED: MarkdownLineAlignment;
    static readonly RIGHT: MarkdownLineAlignment;
    static valueOf(name: string): MarkdownLineAlignment;
    static values(): MarkdownLineAlignment[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextBuilder' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TableCellAlignment extends Enum<TableCellAlignment> {}
  class TableCellAlignment extends Enum<TableCellAlignment> {
    static readonly LEFT: TableCellAlignment;
    static readonly CENTER: TableCellAlignment;
    static readonly RIGHT: TableCellAlignment;
    static valueOf(name: string): TableCellAlignment;
    static values(): TableCellAlignment[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextFragment' {
  import { List } from 'java.util';
  import { Enum } from 'java.lang';
  import { MarkdownTextFragment, MarkdownRenderer } from 'de.keksuccino.fancymenu.util.rendering.text.markdown';
  import { TableCellAlignment } from 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextFragment.TableCell';

  class Hyperlink {
    link: string;
    readonly hyperlinkFragments: List;
    isHovered(): boolean;
  }


  interface HeadlineType extends Enum<HeadlineType> {}
  class HeadlineType extends Enum<HeadlineType> {
    static readonly NONE: HeadlineType;
    static readonly BIG: HeadlineType;
    static readonly BIGGER: HeadlineType;
    static readonly BIGGEST: HeadlineType;
    static valueOf(name: string): HeadlineType;
    static values(): HeadlineType[];
  }


  class QuoteContext {
    readonly quoteFragments: List;
    get quoteEnd(): MarkdownTextFragment;
    get quoteStart(): MarkdownTextFragment;
  }


  class CodeBlockContext {
    readonly codeBlockFragments: List;
    singleLine: boolean;
    get blockEnd(): MarkdownTextFragment;
    get blockStart(): MarkdownTextFragment;
  }


  class TableContext {
    readonly rows: List;
    readonly columnWidths: List;
    hasHeader: boolean;
    totalWidth: number;
    x: number;
    y: number;
    calculateColumnWidths(renderer: MarkdownRenderer): void;
    getRowHeight(row: TableRow): number;
  }


  class TableRow {
    readonly cells: List;
    isHeader: boolean;
    parent: MarkdownRenderer;
    constructor(parent: MarkdownRenderer);
  }


  class TableCell {
    readonly fragments: List;
    alignment: TableCellAlignment;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextFragment.TableCell' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TableCellAlignment extends Enum<TableCellAlignment> {}
  class TableCellAlignment extends Enum<TableCellAlignment> {
    static readonly LEFT: TableCellAlignment;
    static readonly CENTER: TableCellAlignment;
    static readonly RIGHT: TableCellAlignment;
    static valueOf(name: string): TableCellAlignment;
    static values(): TableCellAlignment[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.text.markdown.MarkdownTextLine' {
  class SingleLineCodeBlockPart {
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuUiComponent } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SubMenuContextMenuEntry, SeparatorContextMenuEntry, ValueCycleContextMenuEntry, ClickableContextMenuEntry, ContextMenuEntry, SubMenuOpeningSide } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu';
  import { Component } from 'net.minecraft.network.chat';
  import { ILocalizedValueCycle } from 'de.keksuccino.fancymenu.util.cycle';
  import { ClickAction } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu.ClickableContextMenuEntry';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';

  interface ContextMenu extends Renderable, GuiEventListener, NarratableEntry, NavigatableWidget, FancyMenuUiComponent {}
  class ContextMenu extends Renderable {
    addClickableEntry(identifier: string, label: Component, clickAction: ClickAction): ClickableContextMenuEntry<any>;
    addClickableEntryAfter(addAfterIdentifier: string, identifier: string, label: Component, clickAction: ClickAction): ClickableContextMenuEntry<any>;
    addClickableEntryAt(index: number, identifier: string, label: Component, clickAction: ClickAction): ClickableContextMenuEntry<any>;
    addClickableEntryBefore(addBeforeIdentifier: string, identifier: string, label: Component, clickAction: ClickAction): ClickableContextMenuEntry<any>;
    addEntry<T extends ContextMenuEntry<any>>(entry: T): T;
    addEntryAfter<T extends ContextMenuEntry<any>>(identifier: string, entry: T): T;
    addEntryAt<T extends ContextMenuEntry<any>>(index: number, entry: T): T;
    addEntryBefore<T extends ContextMenuEntry<any>>(identifier: string, entry: T): T;
    addSeparatorEntry(identifier: string): SeparatorContextMenuEntry;
    addSeparatorEntryAfter(addAfterIdentifier: string, identifier: string): SeparatorContextMenuEntry;
    addSeparatorEntryAt(index: number, identifier: string): SeparatorContextMenuEntry;
    addSeparatorEntryBefore(addBeforeIdentifier: string, identifier: string): SeparatorContextMenuEntry;
    addSubMenuEntry(identifier: string, label: Component, subContextMenu: ContextMenu): SubMenuContextMenuEntry;
    addSubMenuEntryAfter(addAfterIdentifier: string, identifier: string, label: Component, subContextMenu: ContextMenu): SubMenuContextMenuEntry;
    addSubMenuEntryAt(index: number, identifier: string, label: Component, subContextMenu: ContextMenu): SubMenuContextMenuEntry;
    addSubMenuEntryBefore(addBeforeIdentifier: string, identifier: string, label: Component, subContextMenu: ContextMenu): SubMenuContextMenuEntry;
    addValueCycleEntry<T>(identifier: string, valueCycle: ILocalizedValueCycle<T>): ValueCycleContextMenuEntry<T>;
    addValueCycleEntryAfter<T>(addAfterIdentifier: string, identifier: string, valueCycle: ILocalizedValueCycle<T>): ValueCycleContextMenuEntry<T>;
    addValueCycleEntryAt<T>(index: number, identifier: string, valueCycle: ILocalizedValueCycle<T>): ValueCycleContextMenuEntry<T>;
    addValueCycleEntryBefore<T>(addBeforeIdentifier: string, identifier: string, valueCycle: ILocalizedValueCycle<T>): ValueCycleContextMenuEntry<T>;
    clearEntries(): ContextMenu;
    closeMenu(): ContextMenu;
    closeSubMenus(): ContextMenu;
    get borderThickness(): number;
    get entries(): ContextMenuEntry<any>[];
    get height(): number;
    get heightWithBorder(): number;
    get parentEntry(): SubMenuContextMenuEntry;
    get scale(): number;
    get scaledBorderThickness(): number;
    get scaledHeight(): number;
    get scaledHeightWithBorder(): number;
    get scaledWidth(): number;
    get scaledWidthWithBorder(): number;
    get subMenuOpeningSide(): SubMenuOpeningSide;
    get width(): number;
    get widthWithBorder(): number;
    get x(): number;
    get y(): number;
    getEntry(identifier: string): ContextMenuEntry<any>;
    getEntryIndex(identifier: string): number;
    hasEntry(identifier: string): boolean;
    hasShadow(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isForceDefaultTooltipStyle(): boolean;
    isForceRawXY(): boolean;
    isForceSide(): boolean;
    isForceSideSubMenus(): boolean;
    isForceUIScale(): boolean;
    isHovered(): boolean;
    isKeepDistanceToEdges(): boolean;
    isMouseOver($$0: number, $$1: number): boolean;
    isMouseOverMenu(mouseX: number, mouseY: number): boolean;
    isNavigatable(): boolean;
    isOpen(): boolean;
    isSubMenu(): boolean;
    isSubMenuHovered(): boolean;
    isSubMenuOpen(): boolean;
    isUserNavigatingInMenu(): boolean;
    isUserNavigatingInSubMenu(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    openMenuAt(x: number, y: number, entryPath: string[]): ContextMenu;
    openMenuAt(x: number, y: number): ContextMenu;
    openMenuAtMouse(entryPath: string[]): ContextMenu;
    openMenuAtMouse(): ContextMenu;
    removeEntry(identifier: string): ContextMenu;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set scale(scale: number);
    set subMenuOpeningSide(subMenuOpeningSide: SubMenuOpeningSide);
    setFocusable(focusable: boolean): void;
    setFocused(var1: boolean): void;
    setForceDefaultTooltipStyle(forceDefaultTooltipStyle: boolean): ContextMenu;
    setForceRawXY(forceRawXY: boolean): ContextMenu;
    setForceSide(forceSide: boolean): ContextMenu;
    setForceSideSubMenus(forceSideSubMenus: boolean): ContextMenu;
    setForceUIScale(forceUIScale: boolean): ContextMenu;
    setKeepDistanceToEdges(keepDistanceToEdges: boolean): ContextMenu;
    setNavigatable(navigatable: boolean): void;
    setShadow(shadow: boolean): ContextMenu;
    static stackContextMenus(menusToStack: ContextMenu[]): ContextMenu;
    static stackContextMenus(...menusToStack: ContextMenu[]): ContextMenu;
    updateNarration(var1: NarrationElementOutput): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu' {
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ClickAction } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu.ClickableContextMenuEntry';
  import { Enum, Boolean } from 'java.lang';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { EntryTask } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu.ContextMenuEntry';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ILocalizedValueCycle } from 'de.keksuccino.fancymenu.util.cycle';
  import { RuntimePropertyContainer } from 'de.keksuccino.fancymenu.util.properties';

  interface SubMenuContextMenuEntry extends ClickableContextMenuEntry<SubMenuContextMenuEntry> {}
  class SubMenuContextMenuEntry extends ClickableContextMenuEntry<SubMenuContextMenuEntry> {
    constructor(identifier: string, parent: ContextMenu, label: Component, subContextMenu: ContextMenu, menu: ContextMenu, entry: ClickableContextMenuEntry<any>);
    copy(): SubMenuContextMenuEntry;
    get minWidth(): number;
    get subContextMenu(): ContextMenu;
    get subMenuOpeningSide(): SubMenuOpeningSide;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    openSubMenu(entryPath: string[]): void;
    openSubMenu(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set subContextMenu(subContextMenu: ContextMenu);
    set subMenuOpeningSide(subMenuOpeningSide: SubMenuOpeningSide);
    setClickAction(clickAction: ClickAction): SubMenuContextMenuEntry;
    setShortcutTextSupplier(shortcutTextSupplier: Supplier<Component>): SubMenuContextMenuEntry;
  }


  interface SubMenuOpeningSide extends Enum<SubMenuOpeningSide> {}
  class SubMenuOpeningSide extends Enum<SubMenuOpeningSide> {
    static readonly LEFT: SubMenuOpeningSide;
    static readonly RIGHT: SubMenuOpeningSide;
    static valueOf(name: string): SubMenuOpeningSide;
    static values(): SubMenuOpeningSide[];
  }


  interface SpacerContextMenuEntry extends ContextMenuEntry<SpacerContextMenuEntry> {}
  class SpacerContextMenuEntry extends ContextMenuEntry<SpacerContextMenuEntry> {
    constructor(identifier: string, parent: ContextMenu);
    copy(): SpacerContextMenuEntry;
    get minWidth(): number;
    isFocused(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setFocused(var1: boolean): void;
  }


  interface ContextMenuEntry<T extends ContextMenuEntry<T> = any> extends Renderable, GuiEventListener {}
  class ContextMenuEntry<T extends ContextMenuEntry<T> = any> extends Renderable {
    constructor(identifier: string, parent: ContextMenu);
    addIsActiveSupplier(activeStateSupplier: BooleanSupplier): T;
    addIsVisibleSupplier(visibleStateSupplier: BooleanSupplier): T;
    copy(): ContextMenuEntry<any>;
    get height(): number;
    get identifier(): string;
    get minWidth(): number;
    get parent(): ContextMenu;
    get stackMeta(): ContextMenuStackMeta;
    get tooltip(): Tooltip;
    isActive(): boolean;
    isChangeBackgroundColorOnHover(): boolean;
    isHovered(): boolean;
    isStackable(): boolean;
    isVisible(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    set height(height: number);
    setChangeBackgroundColorOnHover(changeColor: boolean): T;
    setHoverAction(hoverAction: EntryTask): T;
    setIsActiveSupplier(activeStateSupplier: BooleanSupplier): T;
    setIsVisibleSupplier(visibleStateSupplier: BooleanSupplier): T;
    setStackable(stackable: boolean): T;
    setTickAction(tickAction: EntryTask): T;
    setTooltipSupplier(tooltipSupplier: Supplier<Tooltip>): T;
  }


  interface ClickableContextMenuEntry<T extends ClickableContextMenuEntry<T> = any> extends ContextMenuEntry<T> {}
  class ClickableContextMenuEntry<T extends ClickableContextMenuEntry<T> = any> extends ContextMenuEntry<T> {
    constructor(identifier: string, parent: ContextMenu, label: Component, clickAction: ClickAction);
    copy(): ClickableContextMenuEntry<T>;
    get icon(): ResourceLocation;
    get label(): Component;
    get minWidth(): number;
    get shortcutText(): Component;
    isClickSoundEnabled(): boolean;
    isFocused(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set icon(icon: ResourceLocation);
    setClickAction(clickAction: ClickAction): T;
    setClickSoundEnabled(enabled: boolean): T;
    setFocused(var1: boolean): void;
    setLabelSupplier(labelSupplier: Supplier<Component>): T;
    setShortcutTextSupplier(shortcutTextSupplier: Supplier<Component>): T;
  }


  interface SeparatorContextMenuEntry extends ContextMenuEntry<SeparatorContextMenuEntry> {}
  class SeparatorContextMenuEntry extends ContextMenuEntry<SeparatorContextMenuEntry> {
    constructor(identifier: string, parent: ContextMenu);
    copy(): SeparatorContextMenuEntry;
    get minWidth(): number;
    isFocused(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setFocused(var1: boolean): void;
  }


  interface ValueCycleContextMenuEntry<V = any> extends ClickableContextMenuEntry<ValueCycleContextMenuEntry> {}
  class ValueCycleContextMenuEntry<V = any> extends ClickableContextMenuEntry<ValueCycleContextMenuEntry> {
    constructor(identifier: string, parent: ContextMenu, valueCycle: ILocalizedValueCycle<V>);
    copy(): ValueCycleContextMenuEntry<V>;
    get valueCycle(): ILocalizedValueCycle<V>;
    setClickAction(clickAction: ClickAction): ValueCycleContextMenuEntry<V>;
    setLabelSupplier(labelSupplier: Supplier<Component>): ValueCycleContextMenuEntry<V>;
  }


  class ContextMenuStackMeta {
    get properties(): RuntimePropertyContainer;
    isFirstInStack(): boolean;
    isLastInStack(): boolean;
    isPartOfStack(): boolean;
    isStackable(): boolean;
    setStackable(stackable: boolean): void;
  }


  class IconFactory {
    static getIcon(iconName: string): ResourceLocation;
  }


  interface BooleanSupplier extends Supplier<boolean> {}
  class BooleanSupplier extends Supplier<boolean> {
    getBoolean(menu: ContextMenu, entry: ContextMenuEntry<any>): boolean;
  }


  class Supplier<T = any> {
    get(var1: ContextMenu, var2: ContextMenuEntry<any>): T;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu.ContextMenuEntry' {
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { ContextMenuEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu';

  class EntryTask {
    run(var1: ContextMenu, var2: ContextMenuEntry<any>, var3: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu.ClickableContextMenuEntry' {
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { ClickableContextMenuEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu';

  class ClickAction {
    onClick(var1: ContextMenu, var2: ClickableContextMenuEntry<any>): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.cursor' {
  import { CustomCursor } from 'de.keksuccino.fancymenu.util.rendering.ui.cursor.CursorHandler';
  import { Pre } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';

  class CursorHandler {
    static readonly CURSOR_RESIZE_HORIZONTAL: number;
    static readonly CURSOR_RESIZE_VERTICAL: number;
    static readonly CURSOR_RESIZE_ALL: number;
    static readonly CURSOR_WRITING: number;
    static readonly CURSOR_POINTING_HAND: number;
    static readonly CURSOR_NORMAL: number;
    static getCustomCursor(cursorName: string): CustomCursor;
    static init(): void;
    onClientTickPre(e: Pre): void;
    static registerCustomCursor(uniqueCursorName: string, cursor: CustomCursor): void;
    static setClientTickCursor(cursor: number): void;
    static setClientTickCursor(customCursorName: string): void;
    static unregisterCustomCursor(cursorName: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.cursor.CursorHandler' {
  import { PngTexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';

  class CustomCursor {
    readonly id_long: number;
    readonly hotspotX: number;
    readonly hotspotY: number;
    readonly texture: PngTexture;
    readonly textureName: string;
    static create(texture: PngTexture, hotspotX: number, hotspotY: number, textureName: string): CustomCursor;
    destroy(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui' {
  import { ContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { ClickableContextMenuEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2.ContextMenu';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { ResourceSupplier, Resource } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { Supplier, Consumer, BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { FileFilter } from 'de.keksuccino.fancymenu.util.file';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { ResourceChooserScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.resource';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { FileTypeGroup } from 'de.keksuccino.fancymenu.util.file.type.groups';
  import { FileType } from 'de.keksuccino.fancymenu.util.file.type';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { File } from 'java.io';
  import { Double, Boolean, Integer, Float, Long } from 'java.lang';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { RenderingUtils, DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Color } from 'java.awt';
  import { UIColorTheme } from 'de.keksuccino.fancymenu.util.rendering.ui.theme';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';

  class FancyMenuUiComponent {
  }


  interface FocuslessContainerEventHandler extends ContainerEventHandler {}
  class FocuslessContainerEventHandler extends ContainerEventHandler {
    charTyped(c: string, $$1: number): boolean;
    get focused(): GuiEventListener;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    keyReleased(keycode: number, scancode: number, modifiers: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, $$3: number, $$4: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    set focused(var1: GuiEventListener);
    setFocused($$0: boolean): void;
  }


  class NonStackableOverlayUI {
    static addAudioResourceChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, defaultValue: ResourceSupplier<IAudio>, targetFieldGetter: Supplier<ResourceSupplier<IAudio>>, targetFieldSetter: Consumer<ResourceSupplier<IAudio>>, label: Component, addResetOption: boolean, fileFilter: FileFilter, allowLocation: boolean, allowLocal: boolean, allowWeb: boolean): ClickableContextMenuEntry<any>;
    static addDoubleInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>): ClickableContextMenuEntry<any>;
    static addDoubleInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>, onCloseEditor: BiConsumer<Screen, string>): ClickableContextMenuEntry<any>;
    static addFileChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<string>, setter: Consumer<string>, addResetOption: boolean, defaultValue: string, fileFilter: FileFilter): ClickableContextMenuEntry<any>;
    static addFileChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<string>, setter: Consumer<string>, addResetOption: boolean, defaultValue: string, fileFilter: FileFilter, fileTypes: FileTypeGroup<any>): ClickableContextMenuEntry<any>;
    static addFileChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<string>, setter: Consumer<string>, addResetOption: boolean, defaultValue: string, fileFilter: FileFilter, fileTypes: FileTypeGroup<any>, onCloseFileChooser: BiConsumer<Screen, File>): ClickableContextMenuEntry<any>;
    static addFloatInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>): ClickableContextMenuEntry<any>;
    static addFloatInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>, onCloseEditor: BiConsumer<Screen, string>): ClickableContextMenuEntry<any>;
    static addGenericInputContextMenuEntryTo<T>(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<T>, setter: Consumer<T>, addResetOption: boolean, defaultValue: T, inputLogic: Consumer<Consumer<T>>): ClickableContextMenuEntry<any>;
    static addGenericResourceChooserContextMenuEntryTo<R extends Resource, F extends FileType<R>>(addTo: ContextMenu, entryIdentifier: string, resourceChooserScreenBuilder: Supplier<ResourceChooserScreen<R, F>>, resourceSupplierBuilder: ConsumingSupplier<string, ResourceSupplier<R>>, defaultValue: ResourceSupplier<R>, targetFieldGetter: Supplier<ResourceSupplier<R>>, targetFieldSetter: Consumer<ResourceSupplier<R>>, label: Component, addResetOption: boolean, fileTypes: FileTypeGroup<F>, fileFilter: FileFilter, allowLocation: boolean, allowLocal: boolean, allowWeb: boolean): ClickableContextMenuEntry<any>;
    static addImageResourceChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, defaultValue: ResourceSupplier<ITexture>, targetFieldGetter: Supplier<ResourceSupplier<ITexture>>, targetFieldSetter: Consumer<ResourceSupplier<ITexture>>, label: Component, addResetOption: boolean, fileFilter: FileFilter, allowLocation: boolean, allowLocal: boolean, allowWeb: boolean): ClickableContextMenuEntry<any>;
    static addInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<string>, setter: Consumer<string>, addResetOption: boolean, defaultValue: string, inputCharacterFilter: CharacterFilter, multiLineInput: boolean, allowPlaceholders: boolean, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>): ClickableContextMenuEntry<any>;
    static addInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<string>, setter: Consumer<string>, addResetOption: boolean, defaultValue: string, inputCharacterFilter: CharacterFilter, multiLineInput: boolean, allowPlaceholders: boolean, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>, onCloseEditor: BiConsumer<Screen, string>): ClickableContextMenuEntry<any>;
    static addIntegerInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>): ClickableContextMenuEntry<any>;
    static addIntegerInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>, onCloseEditor: BiConsumer<Screen, string>): ClickableContextMenuEntry<any>;
    static addLongInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<Long>, setter: Consumer<Long>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>): ClickableContextMenuEntry<any>;
    static addLongInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<Long>, setter: Consumer<Long>, addResetOption: boolean, defaultValue: number, textValidator: ConsumingSupplier<string, boolean>, textValidatorUserFeedback: ConsumingSupplier<string, Tooltip>, onCloseEditor: BiConsumer<Screen, string>): ClickableContextMenuEntry<any>;
    static addRangeSliderInputContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, label: Component, getter: Supplier<number>, setter: Consumer<number>, addResetOption: boolean, defaultValue: number, minSliderValue: number, maxSliderValue: number, sliderLabelSupplier: ConsumingSupplier<number, Component>): ClickableContextMenuEntry<any>;
    static addTextResourceChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, defaultValue: ResourceSupplier<IText>, targetFieldGetter: Supplier<ResourceSupplier<IText>>, targetFieldSetter: Consumer<ResourceSupplier<IText>>, label: Component, addResetOption: boolean, fileFilter: FileFilter, allowLocation: boolean, allowLocal: boolean, allowWeb: boolean): ClickableContextMenuEntry<any>;
    static addVideoResourceChooserContextMenuEntryTo(addTo: ContextMenu, entryIdentifier: string, defaultValue: ResourceSupplier<IVideo>, targetFieldGetter: Supplier<ResourceSupplier<IVideo>>, targetFieldSetter: Consumer<ResourceSupplier<IVideo>>, label: Component, addResetOption: boolean, fileFilter: FileFilter, allowLocation: boolean, allowLocal: boolean, allowWeb: boolean): ClickableContextMenuEntry<any>;
  }


  interface UIBase extends RenderingUtils {}
  class UIBase extends RenderingUtils {
    static readonly ELEMENT_BORDER_THICKNESS: number;
    static readonly VERTICAL_SCROLL_BAR_WIDTH: number;
    static readonly VERTICAL_SCROLL_BAR_HEIGHT: number;
    static readonly HORIZONTAL_SCROLL_BAR_WIDTH: number;
    static readonly HORIZONTAL_SCROLL_BAR_HEIGHT: number;
    static applyDefaultWidgetSkinTo<T>(widget: T): T;
    static calculateFixedScale(fixedScale: number): number;
    static drawElementLabel(graphics: GuiGraphics, font: Font, text: Component, x: number, y: number): number;
    static drawElementLabel(graphics: GuiGraphics, font: Font, text: string, x: number, y: number): number;
    static drawElementLabel(graphics: GuiGraphics, font: Font, text: Component, x: number, y: number, baseColor: number): number;
    static drawElementLabel(graphics: GuiGraphics, font: Font, text: string, x: number, y: number, baseColor: number): number;
    static get fixedUIScale(): number;
    static get uIColorTheme(): UIColorTheme;
    static get uIScale(): number;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: DrawableColor, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: Color, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: number, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderListingDot(graphics: GuiGraphics, x: number, y: number, color: number): void;
    static renderListingDot(graphics: GuiGraphics, x: number, y: number, color: Color): void;
  }


  interface UIComponent extends FocuslessContainerEventHandler, Renderable, NarratableEntry, UIBase {}
  class UIComponent extends FocuslessContainerEventHandler {
    posZ: number;
    children(): GuiEventListener[];
    get componentScale(): number;
    get fixedComponentScale(): number;
    get height(): number;
    get realMouseX(): number;
    get realMouseY(): number;
    get translatedMouseX(): number;
    get translatedMouseY(): number;
    get translatedX(): number;
    get translatedY(): number;
    get width(): number;
    isDragging(): boolean;
    isFocused(): boolean;
    isHovered(): boolean;
    isMouseOver(): boolean;
    isMouseOver(ignoredMouseX: number, ignoredMouseY: number): boolean;
    isVisible(): boolean;
    mouseClicked(ignoredMouseX: number, ignoredMouseY: number, button: number): boolean;
    mouseDragged(ignoredMouseX: number, ignoredMouseY: number, button: number, d1: number, d2: number): boolean;
    mouseMoved(ignoredMouseX: number, ignoredMouseY: number): void;
    mouseReleased(ignoredMouseX: number, ignoredMouseY: number, button: number): boolean;
    mouseScrolled(ignoredMouseX: number, ignoredMouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, ignoredMouseX: number, ignoredMouseY: number, partial: number): void;
    renderComponent(var1: GuiGraphics, var2: number, var4: number, var6: number): void;
    setDragging(dragging: boolean): void;
    setFocused(var1: boolean): void;
    setVisible(visible: boolean): void;
    updateNarration(var1: NarrationElementOutput): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2' {
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SpacerMenuBarEntry, Side, SeparatorMenuBarEntry, ContextMenuBarEntry, ClickableMenuBarEntry, MenuBarEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar';
  import { Component } from 'net.minecraft.network.chat';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';
  import { ClickAction } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar.ClickableMenuBarEntry';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';

  interface MenuBar extends Renderable, GuiEventListener, NarratableEntry, NavigatableWidget {}
  class MenuBar extends Renderable {
    constructor();
    addClickableEntry(side: Side, identifier: string, label: Component, clickAction: ClickAction): ClickableMenuBarEntry;
    addClickableEntryAfter(addAfterIdentifier: string, identifier: string, label: Component, clickAction: ClickAction): ClickableMenuBarEntry;
    addClickableEntryAt(index: number, side: Side, identifier: string, label: Component, clickAction: ClickAction): ClickableMenuBarEntry;
    addClickableEntryBefore(addBeforeIdentifier: string, identifier: string, label: Component, clickAction: ClickAction): ClickableMenuBarEntry;
    addContextMenuEntry(identifier: string, label: Component, contextMenu: ContextMenu): ContextMenuBarEntry;
    addContextMenuEntryAfter(addAfterIdentifier: string, identifier: string, label: Component, contextMenu: ContextMenu): ContextMenuBarEntry;
    addContextMenuEntryAt(index: number, identifier: string, label: Component, contextMenu: ContextMenu): ContextMenuBarEntry;
    addContextMenuEntryBefore(addBeforeIdentifier: string, identifier: string, label: Component, contextMenu: ContextMenu): ContextMenuBarEntry;
    addEntry<T extends MenuBarEntry>(side: Side, entry: T): T;
    addEntryAfter<T extends MenuBarEntry>(addAfterIdentifier: string, entry: T): T;
    addEntryAt<T extends MenuBarEntry>(index: number, side: Side, entry: T): T;
    addEntryBefore<T extends MenuBarEntry>(addBeforeIdentifier: string, entry: T): T;
    addSeparatorEntry(side: Side, identifier: string): SeparatorMenuBarEntry;
    addSeparatorEntryAfter(addAfterIdentifier: string, identifier: string): SeparatorMenuBarEntry;
    addSeparatorEntryAt(index: number, side: Side, identifier: string): SeparatorMenuBarEntry;
    addSeparatorEntryBefore(addBeforeIdentifier: string, identifier: string): SeparatorMenuBarEntry;
    addSpacerEntry(side: Side, identifier: string): SpacerMenuBarEntry;
    addSpacerEntryAfter(addAfterIdentifier: string, identifier: string): SpacerMenuBarEntry;
    addSpacerEntryAt(index: number, side: Side, identifier: string): SpacerMenuBarEntry;
    addSpacerEntryBefore(addBeforeIdentifier: string, identifier: string): SpacerMenuBarEntry;
    clearEntries(): MenuBar;
    clearLeftEntries(): MenuBar;
    clearRightEntries(): MenuBar;
    closeAllContextMenus(): MenuBar;
    get bottomLineThickness(): number;
    get entries(): MenuBarEntry[];
    get height(): number;
    get leftEntries(): MenuBarEntry[];
    get rightEntries(): MenuBarEntry[];
    get scale(): number;
    getEntry(identifier: string): MenuBarEntry;
    getEntryIndex(identifier: string): number;
    getEntrySide(identifier: string): Side;
    hasEntry(identifier: string): boolean;
    isEntryContextMenuOpen(): boolean;
    isExpanded(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isForceUIScale(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isNavigatable(): boolean;
    isUserNavigatingInMenuBar(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    removeEntry(identifier: string): MenuBar;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set height(height: number);
    set scale(scale: number);
    setExpanded(expanded: boolean): MenuBar;
    setFocusable(focusable: boolean): void;
    setFocused(var1: boolean): void;
    setForceUIScale(forceUIScale: boolean): MenuBar;
    setNavigatable(navigatable: boolean): void;
    updateNarration(var1: NarrationElementOutput): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { MenuBar } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2';
  import { Component } from 'net.minecraft.network.chat';
  import { ClickAction } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar.ClickableMenuBarEntry';
  import { MenuBarEntryBooleanSupplier, MenuBarEntrySupplier } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar.MenuBarEntry';
  import { Supplier } from 'java.util.function';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { ContextMenu } from 'de.keksuccino.fancymenu.util.rendering.ui.contextmenu.v2';

  interface Side extends Enum<Side> {}
  class Side extends Enum<Side> {
    static readonly LEFT: Side;
    static readonly RIGHT: Side;
    static valueOf(name: string): Side;
    static values(): Side[];
  }


  interface ClickableMenuBarEntry extends MenuBarEntry {}
  class ClickableMenuBarEntry extends MenuBarEntry {
    constructor(identifier: string, menuBar: MenuBar, label: Component, clickAction: ClickAction);
    get clickAction(): ClickAction;
    get iconTextureSupplier(): MenuBarEntrySupplier<ITexture>;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    set clickAction(clickAction: ClickAction);
    set iconTextureSupplier(iconTextureSupplier: MenuBarEntrySupplier<ITexture>);
    setActive(active: boolean): ClickableMenuBarEntry;
    setActiveSupplier(activeSupplier: MenuBarEntryBooleanSupplier): ClickableMenuBarEntry;
    setIconTexture(iconTexture: ITexture): ClickableMenuBarEntry;
    setIconTextureColor(iconTextureColor: Supplier<DrawableColor>): ClickableMenuBarEntry;
    setLabel(label: Component): ClickableMenuBarEntry;
    setLabelSupplier(labelSupplier: MenuBarEntrySupplier<Component>): ClickableMenuBarEntry;
    setVisible(visible: boolean): ClickableMenuBarEntry;
    setVisibleSupplier(visibleSupplier: MenuBarEntryBooleanSupplier): ClickableMenuBarEntry;
  }


  interface MenuBarEntry extends Renderable, GuiEventListener {}
  class MenuBarEntry extends Renderable {
    constructor(identifier: string, parent: MenuBar);
    get identifier(): string;
    isActive(): boolean;
    isFocused(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isVisible(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setActive(active: boolean): MenuBarEntry;
    setActiveSupplier(activeSupplier: MenuBarEntryBooleanSupplier): MenuBarEntry;
    setFocused(var1: boolean): void;
    setTooltipSupplier(tooltipSupplier: ConsumingSupplier<MenuBarEntry, Tooltip>): MenuBarEntry;
    setVisible(visible: boolean): MenuBarEntry;
    setVisibleSupplier(visibleSupplier: MenuBarEntryBooleanSupplier): MenuBarEntry;
  }


  interface SpacerMenuBarEntry extends MenuBarEntry {}
  class SpacerMenuBarEntry extends MenuBarEntry {
    constructor(identifier: string, menuBar: MenuBar);
    setActive(active: boolean): SpacerMenuBarEntry;
    setActiveSupplier(activeSupplier: MenuBarEntryBooleanSupplier): SpacerMenuBarEntry;
    setVisible(visible: boolean): SpacerMenuBarEntry;
    setVisibleSupplier(visibleSupplier: MenuBarEntryBooleanSupplier): SpacerMenuBarEntry;
    setWidth(width: number): SpacerMenuBarEntry;
  }


  interface ContextMenuBarEntry extends ClickableMenuBarEntry {}
  class ContextMenuBarEntry extends ClickableMenuBarEntry {
    constructor(identifier: string, menuBar: MenuBar, label: Component, contextMenu: ContextMenu, bar: MenuBar, entry: MenuBarEntry);
    get contextMenu(): ContextMenu;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    openContextMenu(): void;
    openContextMenu(entryPath: string[]): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setActive(active: boolean): ContextMenuBarEntry;
    setActiveSupplier(activeSupplier: MenuBarEntryBooleanSupplier): ContextMenuBarEntry;
    setClickAction(clickAction: ClickAction): ContextMenuBarEntry;
    setIconTexture(iconTexture: ITexture): ContextMenuBarEntry;
    setIconTextureSupplier(iconTextureSupplier: MenuBarEntrySupplier<ITexture>): ContextMenuBarEntry;
    setLabel(label: Component): ContextMenuBarEntry;
    setLabelSupplier(labelSupplier: MenuBarEntrySupplier<Component>): ContextMenuBarEntry;
    setVisible(visible: boolean): ContextMenuBarEntry;
    setVisibleSupplier(visibleSupplier: MenuBarEntryBooleanSupplier): ContextMenuBarEntry;
  }


  interface SeparatorMenuBarEntry extends MenuBarEntry {}
  class SeparatorMenuBarEntry extends MenuBarEntry {
    constructor(identifier: string, parent: MenuBar);
    get color(): DrawableColor;
    set color(color: DrawableColor);
    setActive(active: boolean): SeparatorMenuBarEntry;
    setActiveSupplier(activeSupplier: MenuBarEntryBooleanSupplier): SeparatorMenuBarEntry;
    setVisible(visible: boolean): SeparatorMenuBarEntry;
    setVisibleSupplier(visibleSupplier: MenuBarEntryBooleanSupplier): SeparatorMenuBarEntry;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar.ClickableMenuBarEntry' {
  import { MenuBar } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2';
  import { MenuBarEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar';

  class ClickAction {
    onClick(var1: MenuBar, var2: MenuBarEntry): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar.MenuBarEntry' {
  import { MenuBar } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2';
  import { MenuBarEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.menubar.v2.MenuBar';

  class MenuBarEntryBooleanSupplier {
    get(var1: MenuBar, var2: MenuBarEntry): boolean;
  }


  class MenuBarEntrySupplier<T = any> {
    get(var1: MenuBar, var2: MenuBarEntry): T;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ArrowNavigation, TabNavigation } from 'FocusNavigationEvent';
  import { ScreenDirection } from 'net.minecraft.client.gui.navigation';
  import { Consumer } from 'java.util.function';
  import { Boolean, Runnable, Double } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';
  import { Pair, ConsumingSupplier, ObjectHolder } from 'de.keksuccino.fancymenu.util';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { ScreenRenderContext } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.ScreenRenderUtils';

  interface CellScreen extends InitialWidgetFocusScreen, Screen {}
  class CellScreen extends InitialWidgetFocusScreen {
    scrollArea: ScrollArea;
    allowDone(): boolean;
    allowEnterForDone(): boolean;
    createArrowEvent($$0: ScreenDirection): ArrowNavigation;
    createTabEvent(): TabNavigation;
    get rightSideDefaultSpaceBetweenWidgets(): number;
    get rightSideWidgetWidth(): number;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    onClose(): void;
    rebuild(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    tick(): void;
  }


  interface ConfirmationScreen extends Screen {}
  class ConfirmationScreen extends Screen {
    static critical(callback: Consumer<boolean>, ...textLines: Component[]): ConfirmationScreen;
    static critical(callback: Consumer<boolean>, ...textLines: string[]): ConfirmationScreen;
    get headlineColor(): DrawableColor;
    isHeadlineBold(): boolean;
    keyPressed(button: number, p_96553_: number, p_96554_: number): boolean;
    static ofComponents(callback: Consumer<boolean>, ...textLines: Component[]): ConfirmationScreen;
    static ofComponents(callback: Consumer<boolean>, textLines: Component[]): ConfirmationScreen;
    static ofStrings(callback: Consumer<boolean>, ...textLines: string[]): ConfirmationScreen;
    static ofStrings(callback: Consumer<boolean>, textLines: string[]): ConfirmationScreen;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set headlineColor(headlineColor: DrawableColor);
    setDelay(delay: number): ConfirmationScreen;
    setHeadlineBold(headlineBold: boolean): ConfirmationScreen;
    static warning(callback: Consumer<boolean>, ...textLines: Component[]): ConfirmationScreen;
    static warning(callback: Consumer<boolean>, ...textLines: string[]): ConfirmationScreen;
  }


  class CustomizableScreen {
    removeOnInitChildrenFancyMenu(): GuiEventListener[];
  }


  interface DualTextInputScreen extends Screen {}
  class DualTextInputScreen extends Screen {
    constructor(title: Component, firstInputLabel: Component, secondInputLabel: Component, filter: CharacterFilter, callback: Consumer<Pair<string, string>>);
    static build(title: Component, firstInputLabel: Component, secondInputLabel: Component, filter: CharacterFilter, callback: Consumer<Pair<string, string>>): DualTextInputScreen;
    get firstText(): string;
    get secondText(): string;
    isAllowPlaceholders(): boolean;
    keyPressed(button: number, p_96553_: number, p_96554_: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set firstText(text: string);
    set secondText(text: string);
    setAllowPlaceholders(allowPlaceholders: boolean): DualTextInputScreen;
    setTextValidator(textValidator: ConsumingSupplier<DualTextInputScreen, boolean>): DualTextInputScreen;
    setTextValidatorUserFeedback(feedback: Tooltip): DualTextInputScreen;
  }


  class InitialWidgetFocusScreen {
    static readonly doInitialWidgetFocusAction: ObjectHolder;
    static readonly parentScreenOfInitialFocusWidget: ObjectHolder;
    static readonly initialFocusWidget: ObjectHolder;
    performInitialWidgetFocusActionInRender(): void;
    setupInitialFocusWidget(parentScreen: Screen, widget: GuiEventListener): void;
  }


  interface LogicExecutorScreen extends Screen {}
  class LogicExecutorScreen extends Screen {
    static build(taskToExecuteOnScreenInit: Runnable): LogicExecutorScreen;
  }


  interface NotificationScreen extends Screen {}
  class NotificationScreen extends Screen {
    static error(callback: Consumer<boolean>, ...textLines: Component[]): NotificationScreen;
    static error(callback: Consumer<boolean>, ...textLines: string[]): NotificationScreen;
    get headlineColor(): DrawableColor;
    isHeadlineBold(): boolean;
    keyPressed(button: number, p_96553_: number, p_96554_: number): boolean;
    static notificationWithHeadline(callback: Consumer<boolean>, ...textLines: Component[]): NotificationScreen;
    static notificationWithHeadline(callback: Consumer<boolean>, ...textLines: string[]): NotificationScreen;
    static ofComponents(callback: Consumer<boolean>, ...textLines: Component[]): NotificationScreen;
    static ofComponents(callback: Consumer<boolean>, textLines: Component[]): NotificationScreen;
    static ofStrings(callback: Consumer<boolean>, ...textLines: string[]): NotificationScreen;
    static ofStrings(callback: Consumer<boolean>, textLines: string[]): NotificationScreen;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set headlineColor(headlineColor: DrawableColor);
    setHeadlineBold(headlineBold: boolean): NotificationScreen;
    static warning(callback: Consumer<boolean>, ...textLines: Component[]): NotificationScreen;
    static warning(callback: Consumer<boolean>, ...textLines: string[]): NotificationScreen;
  }


  interface RangeSliderScreen extends CellScreen {}
  class RangeSliderScreen extends CellScreen {
    constructor(title: Component, minValue: number, maxValue: number, valuePreset: number, labelSupplier: ConsumingSupplier<number, Component>, callback: Consumer<number>);
  }


  class ScreenRenderUtils {
    static executeAllPostRenderTasks(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static executeAllPreRenderTasks(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static postPostRenderTask(context: ScreenRenderContext): void;
    static postPreRenderTask(context: ScreenRenderContext): void;
  }


  interface StringBuilderScreen extends CellScreen {}
  class StringBuilderScreen extends CellScreen {
    buildString(): string;
  }


  interface StringListChooserScreen extends CellScreen {}
  class StringListChooserScreen extends CellScreen {
    constructor(title: Component, stringList: string[], callback: Consumer<string>);
    allowDone(): boolean;
  }


  interface TextInputScreen extends Screen {}
  class TextInputScreen extends Screen {
    constructor(title: Component, filter: CharacterFilter, callback: Consumer<string>);
    static build(title: Component, filter: CharacterFilter, callback: Consumer<string>): TextInputScreen;
    get text(): string;
    keyPressed(button: number, p_96553_: number, p_96554_: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: string);
    setTextValidator(textValidator: ConsumingSupplier<TextInputScreen, boolean>): TextInputScreen;
    setTextValidatorUserFeedback(feedback: Tooltip): TextInputScreen;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen' {
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Supplier, BiConsumer, Consumer } from 'java.util.function';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { NarrationPriority } from 'NarratableEntry';
  import { TextScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { ExtendedEditBox } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox';
  import { ExtendedButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface RenderCell extends Renderable, NarratableEntry, AbstractContainerEventHandler {}
  class RenderCell extends Renderable {
    children(): GuiEventListener[];
    get descriptionSupplier(): Supplier<Component[]>;
    get height(): number;
    get searchString(): string;
    get searchStringSupplier(): Supplier<string>;
    get topBottomSpace(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    getMemoryValue(key: string): string;
    isHovered(): boolean;
    isSelectable(): boolean;
    isSelected(): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseDragged($$0: number, $$1: number, $$2: number, $$3: number, $$4: number): boolean;
    mouseReleased($$0: number, $$1: number, $$2: number): boolean;
    narrationPriority(): NarrationPriority;
    putMemoryValue(key: string, value: string): RenderCell;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderCell(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    set descriptionSupplier(descriptionSupplier: Supplier<Component[]>);
    set height(height: number);
    set searchStringSupplier(searchStringSupplier: Supplier<string>);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setHoverColorSupplier(hoverColorSupplier: Supplier<DrawableColor>): RenderCell;
    setIgnoreSearch(): RenderCell;
    setSelectable(selectable: boolean): RenderCell;
    setSelected(selected: boolean): RenderCell;
    tick(): void;
    updateNarration(var1: NarrationElementOutput): void;
  }


  interface SpacerScrollAreaEntry extends TextScrollAreaEntry {}
  class SpacerScrollAreaEntry extends TextScrollAreaEntry {
    constructor(parent: ScrollArea, height: number);
    get height(): number;
    set height(height: number);
  }


  interface TextInputCell extends RenderCell {}
  class TextInputCell extends RenderCell {
    editBox: ExtendedEditBox;
    openEditorButton: ExtendedButton;
    readonly allowEditor: boolean;
    constructor(characterFilter: CharacterFilter, allowEditor: boolean, allowEditorPlaceholders: boolean);
    get text(): string;
    isEditorMultiLineMode(): boolean;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: string);
    setEditListener(listener: Consumer<string>): TextInputCell;
    setEditorCallback(callback: BiConsumer<string, TextInputCell>): TextInputCell;
    setEditorMultiLineMode(editorMultiLineMode: boolean): TextInputCell;
    setEditorPresetTextSupplier(supplier: ConsumingSupplier<TextInputCell, string>): TextInputCell;
  }


  interface LabelCell extends RenderCell {}
  class LabelCell extends RenderCell {
    constructor(this$0: CellScreen, label: Component);
    get text(): Component;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: Component);
  }


  interface SpacerCell extends RenderCell {}
  class SpacerCell extends RenderCell {
    constructor(this$0: CellScreen, height: number);
    get topBottomSpace(): number;
    isSelectable(): boolean;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setSelectable(selectable: boolean): RenderCell;
  }


  interface SeparatorCell extends RenderCell {}
  class SeparatorCell extends RenderCell {
    constructor();

    constructor(height: number);
    get separatorColorSupplier(): Supplier<DrawableColor>;
    get separatorThickness(): number;
    get topBottomSpace(): number;
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set separatorColorSupplier(separatorColorSupplier: Supplier<DrawableColor>);
    set separatorThickness(separatorThickness: number);
  }


  interface WidgetCell extends RenderCell {}
  class WidgetCell extends RenderCell {
    readonly widget: AbstractWidget;
    constructor(widget: AbstractWidget, applyDefaultSkin: boolean);
    renderCell(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Component } from 'net.minecraft.network.chat';
  import { File } from 'java.io';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { FileFilter } from 'de.keksuccino.fancymenu.util.file';
  import { FileTypeGroup } from 'de.keksuccino.fancymenu.util.file.type.groups';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';

  interface AbstractFileBrowserScreen extends Screen {}
  class AbstractFileBrowserScreen extends Screen {
    constructor(title: Component, rootDirectory: File, startDirectory: File, callback: Consumer<File>);
    blockResourceUnfriendlyFileNames(): boolean;
    get fileFilter(): FileFilter;
    get fileTypes(): FileTypeGroup<any>;
    get visibleDirectoryLevelsAboveRoot(): number;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set fileFilter(fileFilter: FileFilter);
    set fileTypes(typeGroup: FileTypeGroup<any>);
    set visibleDirectoryLevelsAboveRoot(visibleDirectoryLevelsAboveRoot: number);
    setBlockResourceUnfriendlyFileNames(blockResourceUnfriendlyFileNames: boolean): AbstractFileBrowserScreen;
    setDirectory(newDirectory: File, playSound: boolean): AbstractFileBrowserScreen;
    setShowBlockedResourceUnfriendlyFiles(showBlockedResourceUnfriendlyFiles: boolean): AbstractFileBrowserScreen;
    setShowSubDirectories(showSubDirectories: boolean): AbstractFileBrowserScreen;
    shouldShowFile(file: File): boolean;
    showBlockedResourceUnfriendlyFileNames(): boolean;
    showSubDirectories(): boolean;
    updateFileTypeScrollArea(): void;
    updatePreview(file: File): void;
  }


  interface ChooseFileScreen extends AbstractFileBrowserScreen {}
  class ChooseFileScreen extends AbstractFileBrowserScreen {
    constructor(rootDirectory: File, startDirectory: File, callback: Consumer<File>);
    static build(rootDirectory: File, callback: Consumer<File>): ChooseFileScreen;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface SaveFileScreen extends AbstractFileBrowserScreen {}
  class SaveFileScreen extends AbstractFileBrowserScreen {
    constructor(rootDirectory: File, startDirectory: File, fileNamePreset: string, forcedFileExtension: string, callback: Consumer<File>);
    static build(rootDirectory: File, fileNamePreset: string, forcedFileExtension: string, callback: Consumer<File>): SaveFileScreen;
    forceResourceFriendlyFileNames(): boolean;
    get fileNameCharacterFilter(): CharacterFilter;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set fileNameCharacterFilter(characterFilter: CharacterFilter);
    setFileFilter(fileFilter: FileFilter): AbstractFileBrowserScreen;
    setFileName(fileName: string): SaveFileScreen;
    setForceResourceFriendlyFileNames(forceResourceFriendlyFileNames: boolean): SaveFileScreen;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser.AbstractFileBrowserScreen' {
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { File } from 'java.io';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { AbstractFileBrowserScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';

  interface AbstractFileScrollAreaEntry extends ScrollAreaEntry {}
  class AbstractFileScrollAreaEntry extends ScrollAreaEntry {
    file: File;
    font: Font;
    constructor(this$0: AbstractFileBrowserScreen, parent: ScrollArea, file: File);
    onClick(var1: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }


  interface ParentDirScrollAreaEntry extends ScrollAreaEntry {}
  class ParentDirScrollAreaEntry extends ScrollAreaEntry {
    font: Font;
    constructor(parent: ScrollArea);
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser.ChooseFileScreen' {
  import { AbstractFileScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser.AbstractFileBrowserScreen';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { File } from 'java.io';
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';

  interface FileScrollAreaEntry extends AbstractFileScrollAreaEntry {}
  class FileScrollAreaEntry extends AbstractFileScrollAreaEntry {
    constructor(parent: ScrollArea, file: File);
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser.SaveFileScreen' {
  import { AbstractFileScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.filebrowser.AbstractFileBrowserScreen';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { File } from 'java.io';
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';

  interface SaveFileScrollAreaEntry extends AbstractFileScrollAreaEntry {}
  class SaveFileScrollAreaEntry extends AbstractFileScrollAreaEntry {
    constructor(parent: ScrollArea, file: File);
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.queueable' {
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { Consumer } from 'java.util.function';

  interface QueueableNotificationScreen extends QueueableScreen {}
  class QueueableNotificationScreen extends QueueableScreen {
    constructor(text: Component);
    keyPressed(key: number, scancode: number, modifiers: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
  }


  interface QueueableScreen extends Screen {}
  class QueueableScreen extends Screen {
    assertQueueableSetUpCorrectly(): void;
    onClose(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resize(mc: Minecraft, width: number, height: number): void;
    setCloseCallback(closeCallback: Consumer<QueueableScreen>): void;
  }


  class QueueableScreenHandler {
    static addToQueue(screen: QueueableScreen): void;
    static clearQueue(): void;
    static clearQueue(clearCached: boolean): void;
    static get cachedOriginalScreen(): Screen;
    static get currentScreen(): QueueableScreen;
    static get queueSize(): number;
    static hasScreenCached(): boolean;
    static isScreenActive(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.resource' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Component } from 'net.minecraft.network.chat';
  import { FileTypeGroup } from 'de.keksuccino.fancymenu.util.file.type.groups';
  import { FileFilter } from 'de.keksuccino.fancymenu.util.file';
  import { Consumer } from 'java.util.function';
  import { Resource } from 'de.keksuccino.fancymenu.util.resource';
  import { FileType } from 'de.keksuccino.fancymenu.util.file.type';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ImageFileType, AudioFileType, VideoFileType, TextFileType } from 'de.keksuccino.fancymenu.util.file.type.types';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ResourceChooserScreen<R extends Resource = any, F extends FileType<R> = any> extends CellScreen {}
  class ResourceChooserScreen<R extends Resource = any, F extends FileType<R> = any> extends CellScreen {
    constructor(title: Component, allowedFileTypes: FileTypeGroup<F>, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>);
    allowDone(): boolean;
    static audio(title: Component, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IAudio, AudioFileType>;
    static audio(fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IAudio, AudioFileType>;
    static generic(fileTypes: FileTypeGroup<FileType<Resource>>, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<Resource, FileType<Resource>>;
    static generic(title: Component, fileTypes: FileTypeGroup<FileType<Resource>>, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<Resource, FileType<Resource>>;
    static image(title: Component, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<ITexture, ImageFileType>;
    static image(fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<ITexture, ImageFileType>;
    isLocalSourceAllowed(): boolean;
    isLocationSourceAllowed(): boolean;
    isWebSourceAllowed(): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setAllowedFileTypes(allowedFileTypes: FileTypeGroup<F>): ResourceChooserScreen<R, F>;
    setFileFilter(fileFilter: FileFilter): ResourceChooserScreen<R, F>;
    setLocalSourceAllowed(allowLocal: boolean): ResourceChooserScreen<R, F>;
    setLocationSourceAllowed(allowLocation: boolean): ResourceChooserScreen<R, F>;
    setResourceSourceCallback(resourceSourceCallback: Consumer<string>): ResourceChooserScreen<R, F>;
    setSource(resourceSource: string, updateScreen: boolean): ResourceChooserScreen<R, F>;
    setWebSourceAllowed(allowWeb: boolean): ResourceChooserScreen<R, F>;
    static text(title: Component, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IText, TextFileType>;
    static text(fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IText, TextFileType>;
    static video(title: Component, fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IVideo, VideoFileType>;
    static video(fileFilter: FileFilter, resourceSourceCallback: Consumer<string>): ResourceChooserScreen<IVideo, VideoFileType>;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.ScreenRenderUtils' {
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ScreenRenderContext {
    render(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.scrollnormalizer' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { AbstractSelectionList, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { ScrollableScreenBlacklistRule } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.scrollnormalizer.ScrollScreenNormalizer';

  class ScrollScreenNormalizer {
    static addScrollableScreenBlacklistRule(rule: ScrollableScreenBlacklistRule): void;
    static extractAllScrollListsOfScreen(screen: Screen): AbstractSelectionList<any>[];
    static extractAllWidgetsFromScrollListsOfScreen(screen: Screen): AbstractWidget[];
    static isBlacklisted(screen: Screen): boolean;
    static normalizeScrollableScreen(screen: Screen): Screen;
  }


  class ScrollScreenNormalizerHandler {
    static setForScreen(screen: Screen, normalize: boolean): void;
    static shouldNormalize(screen: Screen): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.scrollnormalizer.ScrollScreenNormalizer' {
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ScrollableScreenBlacklistRule {
    isBlacklisted(var1: Screen): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.StringListChooserScreen' {
  import { LabelCell } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.CellScreen';
  import { StringListChooserScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';

  interface StringCell extends LabelCell {}
  class StringCell extends LabelCell {
    string: string;
    constructor(this$0: StringListChooserScreen, string: string);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor.formattingrules.brackets' {
  import { TextEditorFormattingRule, TextEditorScreen, TextEditorLine } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Style } from 'net.minecraft.network.chat';

  interface HighlightAngleBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {}
  class HighlightAngleBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {
  }


  interface HighlightBracketsFormattingRuleBase extends TextEditorFormattingRule {}
  class HighlightBracketsFormattingRuleBase extends TextEditorFormattingRule {
    getStyle(atCharacterInLine: string, atCharacterIndexInLine: number, cursorPosInLine: number, inLine: TextEditorLine, atCharacterIndexTotal: number, editor: TextEditorScreen): Style;
    resetRule(editor: TextEditorScreen): void;
  }


  interface HighlightCurlyBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {}
  class HighlightCurlyBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {
  }


  interface HighlightRoundBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {}
  class HighlightRoundBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {
  }


  interface HighlightSquareBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {}
  class HighlightSquareBracketsFormattingRule extends HighlightBracketsFormattingRuleBase {
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor.formattingrules' {
  import { TextEditorFormattingRule, TextEditorScreen, TextEditorLine } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Style } from 'net.minecraft.network.chat';
  import { Class } from 'java.lang';
  import { List } from 'java.util';

  interface HighlightPlaceholdersFormattingRule extends TextEditorFormattingRule {}
  class HighlightPlaceholdersFormattingRule extends TextEditorFormattingRule {
    constructor();
    getStyle(atCharacterInLine: string, atCharacterIndexInLine: number, cursorPosInLine: number, inLine: TextEditorLine, atCharacterIndexTotal: number, editor: TextEditorScreen): Style;
    resetRule(editor: TextEditorScreen): void;
  }


  class TextEditorFormattingRules {
    static addRuleAtBottom(rule: Class<TextEditorFormattingRule>): void;
    static addRuleAtTop(rule: Class<TextEditorFormattingRule>): void;
    static get rules(): TextEditorFormattingRule[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Style, Component } from 'net.minecraft.network.chat';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { CharacterFilter } from 'de.keksuccino.konkrete.input';
  import { Consumer } from 'java.util.function';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Boolean } from 'java.lang';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { EditBox } from 'net.minecraft.client.gui.components';

  class IndentationGuideRenderer {
    constructor(editor: TextEditorScreen);
    markDirty(): void;
    render(graphics: GuiGraphics): void;
  }


  class TextEditorFormattingRule {
    getStyle(var1: string, var2: number, var3: number, var4: TextEditorLine, var5: number, var6: TextEditorScreen): Style;
    resetRule(var1: TextEditorScreen): void;
  }


  class TextEditorHistory {
    saveSnapshot(): void;
    stepBack(): void;
    stepForward(): void;
  }


  interface TextEditorScreen extends Screen {}
  class TextEditorScreen extends Screen {
    static readonly NEWLINE_CODE: string;
    static readonly SPACE_CODE: string;
    formattingRules: List;
    constructor(characterFilter: CharacterFilter, callback: Consumer<string>);

    constructor(title: Component, characterFilter: CharacterFilter, callback: Consumer<string>);
    addLine(): TextEditorLine;
    addLineAtIndex(index: number): TextEditorLine;
    areIndentationGuidesVisible(): boolean;
    static build(title: Component, characterFilter: CharacterFilter, callback: Consumer<string>): TextEditorScreen;
    charTyped(character: string, modifiers: number): boolean;
    static clearCompiledSingleLineCache(): void;
    static compileSingleLineString(s: string): string;
    correctXScroll(line: TextEditorLine): void;
    correctYScroll(lineCountOffsetAfterRemovingAdding: number): void;
    cutHighlightedText(): string;
    deleteHighlightedText(): void;
    get copyOfLines(): TextEditorLine[];
    get editorAreaHeight(): number;
    get editorAreaWidth(): number;
    get editorAreaX(): number;
    get editorAreaY(): number;
    get focusedLine(): TextEditorLine;
    get focusedLineIndex(): number;
    get highlightedText(): string;
    get hoveredLine(): TextEditorLine;
    get lineCount(): number;
    get lineRenderOffsetX(): number;
    get lineRenderOffsetY(): number;
    get lines(): TextEditorLine[];
    get placeholderAreaHeight(): number;
    get placeholderAreaWidth(): number;
    get placeholderAreaX(): number;
    get placeholderAreaY(): number;
    get placeholderEntriesRenderOffsetX(): number;
    get placeholderEntriesRenderOffsetY(): number;
    get text(): string;
    get textAfterCursor(): string;
    get textBeforeCursor(): string;
    get totalLineHeight(): number;
    get totalPlaceholderEntriesHeight(): number;
    get totalPlaceholderEntriesWidth(): number;
    get totalScrollHeight(): number;
    get totalScrollWidth(): number;
    getEditBoxCursorX(editBox: EditBox): number;
    getLine(index: number): TextEditorLine;
    getLineAfter(line: TextEditorLine): TextEditorLine;
    getLineBefore(line: TextEditorLine): TextEditorLine;
    getLineIndex(inputBox: TextEditorLine): number;
    getLinesBetweenIndexes(startIndex: number, endIndex: number): TextEditorLine[];
    goDownLine(isNewLine: boolean): void;
    goUpLine(): void;
    init(): void;
    isAtLeastOneLineInHighlightMode(): boolean;
    isBoldTitle(): boolean;
    isHighlightedTextHovered(): boolean;
    isInMouseHighlightingMode(): boolean;
    isLineFocused(): boolean;
    isMouseInsideEditorArea(): boolean;
    isMouseInteractingWithGrabbers(): boolean;
    isMouseInteractingWithPlaceholderGrabbers(): boolean;
    isMultilineMode(): boolean;
    isTextHighlighted(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    keyReleased(i1: number, i2: number, i3: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    pasteText(text: string): void;
    placeholdersAllowed(): boolean;
    removeLastLine(): void;
    removeLineAtIndex(index: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetHighlighting(): void;
    scrollToLine(lineIndex: number, bottom: boolean): void;
    scrollToLine(lineIndex: number, offset: number): void;
    set focusedLine(index: number);
    set text(text: string);
    setBoldTitle(boldTitle: boolean): TextEditorScreen;
    setMultilineMode(multilineMode: boolean): TextEditorScreen;
    setPlaceholdersAllowed(allowed: boolean): TextEditorScreen;
    setTextValidator(textValidator: ConsumingSupplier<TextEditorScreen, boolean>): TextEditorScreen;
    setTextValidatorUserFeedback(feedback: Tooltip): TextEditorScreen;
    tick(): void;
    toggleIndentationGuides(): void;
    updateCurrentLineWidth(): void;
    updateLines(doAfterEachLineUpdate: Consumer<TextEditorLine>): void;
    updatePlaceholderEntries(category: string, clearList: boolean, addBackButton: boolean): void;
    updateRightClickContextMenu(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor.TextEditorScreen' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { TextEditorScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen.texteditor';
  import { Component } from 'net.minecraft.network.chat';
  import { Runnable } from 'java.lang';
  import { ExtendedButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';

  interface PlaceholderMenuEntry extends UIBase {}
  class PlaceholderMenuEntry extends UIBase {
    parent: TextEditorScreen;
    readonly label: Component;
    clickAction: Runnable;
    x: number;
    y: number;
    readonly labelWidth: number;
    buttonBase: ExtendedButton;
    font: Font;
    constructor(this$0: TextEditorScreen, parent: TextEditorScreen, label: Component, clickAction: Runnable);
    get height(): number;
    get width(): number;
    isHovered(): boolean;
    isHoveredOrFocused(): boolean;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, p_93658_: number, p_93659_: number, p_93660_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setDescription(...desc: string[]): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea';
  import { AdvancedButton } from 'de.keksuccino.konkrete.gui.content';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Color } from 'java.awt';
  import { Component } from 'net.minecraft.network.chat';
  import { Consumer } from 'java.util.function';

  interface ScrollAreaEntry extends Renderable, UIBase {}
  class ScrollAreaEntry extends Renderable {
    parent: ScrollArea;
    buttonBase: AdvancedButton;
    deselectOtherEntriesOnSelect: boolean;
    selectOnClick: boolean;
    index: number;
    constructor(parent: ScrollArea, width: number, height: number);
    get backgroundColorHover(): Color;
    get backgroundColorIdle(): Color;
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    isHovered(): boolean;
    isHoveredOrFocused(): boolean;
    isPlayClickSound(): boolean;
    isSelectable(): boolean;
    isSelected(): boolean;
    onClick(p_93371_: number, p_93372_: number): void;
    onClick(var1: ScrollAreaEntry): void;
    playDownSound(p_93665_: SoundManager): void;
    render(graphics: GuiGraphics, p_93658_: number, p_93659_: number, p_93660_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundColorHover(backgroundColorHover: Color);
    set backgroundColorIdle(backgroundColorIdle: Color);
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setPlayClickSound(playClickSound: boolean): void;
    setSelectable(selectable: boolean): void;
    setSelected(selected: boolean): void;
    setTooltip(...tooltipLines: string[]): void;
    updateEntry(): void;
  }


  interface TextListScrollAreaEntry extends ScrollAreaEntry {}
  class TextListScrollAreaEntry extends ScrollAreaEntry {
    listDotColor: Color;
    font: Font;
    constructor(parent: ScrollArea, text: Component, listDotColor: Color, onClick: Consumer<TextListScrollAreaEntry>);
    get text(): Component;
    get textWidth(): number;
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: Component);
  }


  interface TextScrollAreaEntry extends ScrollAreaEntry {}
  class TextScrollAreaEntry extends ScrollAreaEntry {
    font: Font;
    constructor(parent: ScrollArea, text: Component, onClick: Consumer<TextScrollAreaEntry>);
    get text(): Component;
    get textWidth(): number;
    onClick(entry: ScrollAreaEntry): void;
    onClick(p_93371_: number, p_93372_: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: Component);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { ScrollBar } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollbar';
  import { Color } from 'java.awt';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Supplier, Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollarea.entry';
  import { List } from 'java.util';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';

  interface ScrollArea extends UIBase {}
  class ScrollArea extends UIBase {
    verticalScrollBar: ScrollBar;
    horizontalScrollBar: ScrollBar;
    backgroundColor: Color;
    borderColor: Color;
    makeEntriesWidthOfArea: boolean;
    minimumEntryWidthIsAreaWidth: boolean;
    overriddenTotalScrollWidth: number;
    overriddenTotalScrollHeight: number;
    correctYOnAddingRemovingEntries: boolean;
    customGuiScale: number;
    constructor(x: number, y: number, width: number, height: number);
    addEntry(entry: ScrollAreaEntry): void;
    addEntryAtIndex(entry: ScrollAreaEntry, index: number): void;
    clearEntries(): void;
    correctYScrollAfterAddingOrRemovingEntries(removed: boolean, ...addedOrRemovedEntries: ScrollAreaEntry[]): void;
    get borderThickness(): number;
    get entries(): ScrollAreaEntry[];
    get entryCount(): number;
    get entryRenderOffsetX(): number;
    get entryRenderOffsetY(): number;
    get focusedEntry(): ScrollAreaEntry;
    get focusedEntryIndex(): number;
    get heightWithBorder(): number;
    get innerHeight(): number;
    get innerWidth(): number;
    get innerX(): number;
    get innerY(): number;
    get totalEntryHeight(): number;
    get totalEntryWidth(): number;
    get totalScrollHeight(): number;
    get totalScrollWidth(): number;
    get widthWithBorder(): number;
    get xWithBorder(): number;
    get yWithBorder(): number;
    getEntry(index: number): ScrollAreaEntry;
    getEntryRenderOffsetX(totalScrollWidth: number): number;
    getEntryRenderOffsetY(totalScrollHeight: number): number;
    getIndexOfEntry(entry: ScrollAreaEntry): number;
    isMouseInsideArea(): boolean;
    isMouseInteractingWithGrabbers(): boolean;
    makeCurrentEntriesSameWidth(): void;
    removeEntry(entry: ScrollAreaEntry): void;
    removeEntryAtIndex(index: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBorder(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: DrawableColor, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: Color, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: number, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    renderEntries(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetScrollOnFit(): void;
    set borderThickness(borderThickness: number);
    setAllowScrollWheelSupplier(supplier: Supplier<boolean>): ScrollArea;
    setHeight(height: number, respectBorder: boolean): void;
    setHeight(height: number): void;
    setWidth(width: number, respectBorder: boolean): void;
    setWidth(width: number): void;
    setX(x: number, respectBorder: boolean): void;
    setX(x: number): void;
    setY(y: number, respectBorder: boolean): void;
    setY(y: number): void;
    updateEntries(doAfterEachEntryUpdate: Consumer<ScrollAreaEntry>): void;
    updateScrollArea(): void;
    updateWheelScrollSpeed(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollbar' {
  import { Color } from 'java.awt';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier, Consumer } from 'java.util.function';
  import { ScrollBarDirection } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollbar.ScrollBar';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Post } from 'de.keksuccino.fancymenu.events.ticking.ClientTickEvent';
  import { Pre } from 'de.keksuccino.fancymenu.events.screen.ScreenMouseScrollEvent';

  class ScrollBar {
    grabberWidth: number;
    grabberHeight: number;
    scrollAreaStartX: number;
    scrollAreaStartY: number;
    scrollAreaEndX: number;
    scrollAreaEndY: number;
    idleBarColor: Color;
    hoverBarColor: Color;
    idleBarTexture: ResourceLocation;
    hoverBarTexture: ResourceLocation;
    active: boolean;
    allowScrollWheelSupplier: Supplier;
    constructor(direction: ScrollBarDirection, grabberWidth: number, grabberHeight: number, scrollAreaStartX: number, scrollAreaStartY: number, scrollAreaEndX: number, scrollAreaEndY: number, idleBarColor: Color, hoverBarColor: Color);

    constructor(direction: ScrollBarDirection, grabberWidth: number, grabberHeight: number, scrollAreaStartX: number, scrollAreaStartY: number, scrollAreaEndX: number, scrollAreaEndY: number, idleBarTexture: ResourceLocation, hoverBarTexture: ResourceLocation);
    get direction(): ScrollBarDirection;
    get grabberScrollSpeed(): number;
    get scroll(): number;
    get wheelScrollSpeed(): number;
    isGrabberGrabbed(): boolean;
    isGrabberHovered(): boolean;
    isMouseInsideScrollArea(ignoreGrabber: boolean): boolean;
    isScrollWheelAllowed(): boolean;
    registerScrollListener(listener: Consumer<ScrollBar>): void;
    render(graphics: GuiGraphics): void;
    set grabberScrollSpeed(speed: number);
    set scroll(scroll: number);
    set wheelScrollSpeed(speed: number);
    setScroll(scroll: number, informScrollListeners: boolean): void;
    setScrollWheelAllowed(allowed: boolean): void;
  }


  class ScrollBarHandler {
    static handleScrollBar(scrollBar: ScrollBar): void;
    onClientTick(e: Post): void;
    onMouseScrollPre(e: Pre): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v1.scrollbar.ScrollBar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ScrollBarDirection extends Enum<ScrollBarDirection> {}
  class ScrollBarDirection extends Enum<ScrollBarDirection> {
    static readonly HORIZONTAL: ScrollBarDirection;
    static readonly VERTICAL: ScrollBarDirection;
    static valueOf(name: string): ScrollBarDirection;
    static values(): ScrollBarDirection[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { ScrollArea } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Supplier, Consumer } from 'java.util.function';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { Component } from 'net.minecraft.network.chat';

  interface ScrollAreaEntry extends Renderable, UIBase {}
  class ScrollAreaEntry extends Renderable {
    parent: ScrollArea;
    deselectOtherEntriesOnSelect: boolean;
    selectOnClick: boolean;
    index: number;
    constructor(parent: ScrollArea, width: number, height: number);
    get backgroundColorHover(): Supplier<DrawableColor>;
    get backgroundColorNormal(): Supplier<DrawableColor>;
    get height(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    isClickable(): boolean;
    isHovered(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isPlayClickSound(): boolean;
    isSelectable(): boolean;
    isSelected(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClick(var1: ScrollAreaEntry, var2: number, var4: number, var6: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderEntry(var1: GuiGraphics, var2: number, var3: number, var4: number): void;
    set backgroundColorHover(backgroundColorHover: Supplier<DrawableColor>);
    set backgroundColorNormal(backgroundColorNormal: Supplier<DrawableColor>);
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setClickable(clickable: boolean): void;
    setPlayClickSound(playClickSound: boolean): void;
    setSelectable(selectable: boolean): void;
    setSelected(selected: boolean): void;
    setTooltip(tooltip: Tooltip): void;
  }


  interface TextListScrollAreaEntry extends ScrollAreaEntry {}
  class TextListScrollAreaEntry extends ScrollAreaEntry {
    listDotColor: DrawableColor;
    font: Font;
    constructor(parent: ScrollArea, text: Component, listDotColor: DrawableColor, onClick: Consumer<TextListScrollAreaEntry>);
    get labelRenderOffsetY(): number;
    get text(): Component;
    get textBaseColor(): number;
    get textWidth(): number;
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    renderEntry(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set labelRenderOffsetY(labelRenderOffsetY: number);
    set text(text: Component);
    set textBaseColor(textBaseColor: number);
  }


  interface TextScrollAreaEntry extends ScrollAreaEntry {}
  class TextScrollAreaEntry extends ScrollAreaEntry {
    font: Font;
    constructor(parent: ScrollArea, text: Component, onClick: Consumer<TextScrollAreaEntry>);
    get text(): Component;
    get textBaseColor(): number;
    get textWidth(): number;
    onClick(entry: ScrollAreaEntry, mouseX: number, mouseY: number, button: number): void;
    renderEntry(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set text(text: Component);
    set textBaseColor(textBaseColor: number);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { ScrollBar } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollbar';
  import { Supplier, Consumer } from 'java.util.function';
  import { Float } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ScrollAreaEntry } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollarea.entry';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Color } from 'java.awt';

  interface ScrollArea extends GuiEventListener, Renderable, NarratableEntry, UIBase {}
  class ScrollArea extends GuiEventListener {
    verticalScrollBar: ScrollBar;
    horizontalScrollBar: ScrollBar;
    backgroundColor: Supplier;
    borderColor: Supplier;
    makeEntriesWidthOfArea: boolean;
    minimumEntryWidthIsAreaWidth: boolean;
    makeAllEntriesWidthOfWidestEntry: boolean;
    overriddenTotalScrollWidth: number;
    overriddenTotalScrollHeight: number;
    correctYOnAddingRemovingEntries: boolean;
    renderScale: number;
    constructor(x: number, y: number, width: number, height: number);
    addEntry(entry: ScrollAreaEntry): void;
    addEntryAtIndex(entry: ScrollAreaEntry, index: number): void;
    clearEntries(): void;
    correctYScrollAfterAddingOrRemovingEntries(removed: boolean, ...addedOrRemovedEntries: ScrollAreaEntry[]): void;
    get borderThickness(): number;
    get entries(): ScrollAreaEntry[];
    get entryCount(): number;
    get entryRenderOffsetX(): number;
    get entryRenderOffsetY(): number;
    get focusedEntry(): ScrollAreaEntry;
    get focusedEntryIndex(): number;
    get heightWithBorder(): number;
    get innerHeight(): number;
    get innerWidth(): number;
    get innerX(): number;
    get innerY(): number;
    get totalEntryHeight(): number;
    get totalEntryWidth(): number;
    get totalScrollHeight(): number;
    get totalScrollWidth(): number;
    get widthWithBorder(): number;
    get xWithBorder(): number;
    get yWithBorder(): number;
    getEntry(index: number): ScrollAreaEntry;
    getEntryRenderOffsetX(totalScrollWidth: number): number;
    getEntryRenderOffsetY(totalScrollHeight: number): number;
    getIndexOfEntry(entry: ScrollAreaEntry): number;
    isApplyScissor(): boolean;
    isFocused(): boolean;
    isHovered(): boolean;
    isInnerAreaHovered(): boolean;
    isMouseInteractingWithGrabbers(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isMouseOverInnerArea(mouseX: number, mouseY: number): boolean;
    makeCurrentEntriesSameWidth(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, $$3: number, $$4: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    removeEntry(entry: ScrollAreaEntry): void;
    removeEntryAtIndex(index: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBackground(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderBorder(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: DrawableColor, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: Color, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    static renderBorder(graphics: GuiGraphics, xMin: number, yMin: number, xMax: number, yMax: number, borderThickness: number, borderColor: number, renderTop: boolean, renderLeft: boolean, renderRight: boolean, renderBottom: boolean): void;
    renderEntries(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    resetScrollOnFit(): void;
    set borderThickness(borderThickness: number);
    setApplyScissor(apply: boolean): void;
    setFocused(var1: boolean): void;
    setHeight(height: number, respectBorder: boolean): void;
    setHeight(height: number): void;
    setWidth(width: number, respectBorder: boolean): void;
    setWidth(width: number): void;
    setX(x: number, respectBorder: boolean): void;
    setX(x: number): void;
    setY(y: number, respectBorder: boolean): void;
    setY(y: number): void;
    updateEntries(doAfterEachEntryUpdate: Consumer<ScrollAreaEntry>): void;
    updateNarration(var1: NarrationElementOutput): void;
    updateScrollArea(): void;
    updateWheelScrollSpeed(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollbar' {
  import { UIBase } from 'de.keksuccino.fancymenu.util.rendering.ui';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Supplier, Consumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ScrollBarDirection } from 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollbar.ScrollBar';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NarrationPriority } from 'NarratableEntry';

  interface ScrollBar extends GuiEventListener, Renderable, NarratableEntry, UIBase {}
  class ScrollBar extends GuiEventListener {
    grabberWidth: number;
    grabberHeight: number;
    scrollAreaStartX: number;
    scrollAreaStartY: number;
    scrollAreaEndX: number;
    scrollAreaEndY: number;
    idleBarColor: Supplier;
    hoverBarColor: Supplier;
    idleBarTexture: ResourceLocation;
    hoverBarTexture: ResourceLocation;
    active: boolean;
    constructor(direction: ScrollBarDirection, grabberWidth: number, grabberHeight: number, scrollAreaStartX: number, scrollAreaStartY: number, scrollAreaEndX: number, scrollAreaEndY: number, idleBarColor: Supplier<DrawableColor>, hoverBarColor: Supplier<DrawableColor>);

    constructor(direction: ScrollBarDirection, grabberWidth: number, grabberHeight: number, scrollAreaStartX: number, scrollAreaStartY: number, scrollAreaEndX: number, scrollAreaEndY: number, idleBarTexture: ResourceLocation, hoverBarTexture: ResourceLocation);
    get direction(): ScrollBarDirection;
    get grabberScrollSpeed(): number;
    get scroll(): number;
    get wheelScrollSpeed(): number;
    isFocused(): boolean;
    isGrabberGrabbed(): boolean;
    isGrabberHovered(): boolean;
    isMouseInsideScrollArea(mouseX: number, mouseY: number, ignoreGrabber: boolean): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    isMouseOverGrabber(mouseX: number, mouseY: number): boolean;
    isScrollWheelAllowed(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, $$3: number, $$4: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, scrollDeltaX: number, scrollDeltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    registerScrollListener(listener: Consumer<ScrollBar>): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set grabberScrollSpeed(speed: number);
    set scroll(scroll: number);
    set wheelScrollSpeed(speed: number);
    setFocused(var1: boolean): void;
    setScroll(scroll: number, informScrollListeners: boolean): void;
    setScrollWheelAllowed(allowed: boolean): void;
    updateNarration(var1: NarrationElementOutput): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.scroll.v2.scrollbar.ScrollBar' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ScrollBarDirection extends Enum<ScrollBarDirection> {}
  class ScrollBarDirection extends Enum<ScrollBarDirection> {
    static readonly HORIZONTAL: ScrollBarDirection;
    static readonly VERTICAL: ScrollBarDirection;
    static valueOf(name: string): ScrollBarDirection;
    static values(): ScrollBarDirection[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.theme.themes' {
  import { UIColorTheme } from 'de.keksuccino.fancymenu.util.rendering.ui.theme';
  import { File } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface DarkUIColorTheme extends UIColorTheme {}
  class DarkUIColorTheme extends UIColorTheme {
    constructor();
  }


  interface LightUIColorTheme extends UIColorTheme {}
  class LightUIColorTheme extends UIColorTheme {
    constructor();
  }


  class UIColorThemes {
    static readonly THEME_DIR: File;
    static readonly DARK: DarkUIColorTheme;
    static readonly LIGHT: LightUIColorTheme;
    static readonly OLED_PURPLE_THEME_LOCATION: ResourceLocation;
    static readonly NETHER_THEME_LOCATION: ResourceLocation;
    static readonly BUTTER_DARK_THEME_LOCATION: ResourceLocation;
    static readonly BUTTER_OLED_THEME_LOCATION: ResourceLocation;
    static readonly DEFAULT_THEMES: UIColorTheme[];
    static registerAll(): void;
    static reloadThemes(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.theme' {
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { TypeAdapter } from 'com.google.gson';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File } from 'java.io';

  class UIColorTheme {
    menu_bar_bottom_line_color: DrawableColor;
    layout_editor_mouse_selection_rectangle_color: DrawableColor;
    layout_editor_grid_color_normal: DrawableColor;
    layout_editor_grid_color_center: DrawableColor;
    layout_editor_element_border_color_normal: DrawableColor;
    layout_editor_element_border_color_selected: DrawableColor;
    layout_editor_element_border_rotation_controls_color: DrawableColor;
    layout_editor_element_border_vertical_tilting_controls_color: DrawableColor;
    layout_editor_element_border_horizontal_tilting_controls_color: DrawableColor;
    layout_editor_element_dragging_not_allowed_color: DrawableColor;
    layout_editor_element_border_display_line_background_color: DrawableColor;
    layout_editor_element_border_display_line_text_color: DrawableColor;
    layout_editor_anchor_point_overlay_color_base: DrawableColor;
    layout_editor_anchor_point_overlay_color_border: DrawableColor;
    layout_editor_close_icon_color: DrawableColor;
    scroll_grabber_color_normal: DrawableColor;
    scroll_grabber_color_hover: DrawableColor;
    screen_background_color: DrawableColor;
    screen_background_color_darker: DrawableColor;
    element_border_color_normal: DrawableColor;
    element_border_color_hover: DrawableColor;
    element_background_color_normal: DrawableColor;
    element_background_color_hover: DrawableColor;
    slider_handle_color_normal: DrawableColor;
    slider_handle_color_hover: DrawableColor;
    area_background_color: DrawableColor;
    edit_box_background_color: DrawableColor;
    edit_box_border_color_normal: DrawableColor;
    edit_box_border_color_focused: DrawableColor;
    list_entry_color_selected_hovered: DrawableColor;
    actions_entry_background_color_action: DrawableColor;
    actions_entry_background_color_action_hover: DrawableColor;
    actions_entry_background_color_if: DrawableColor;
    actions_entry_background_color_if_hover: DrawableColor;
    actions_entry_background_color_else_if: DrawableColor;
    actions_entry_background_color_else_if_hover: DrawableColor;
    actions_entry_background_color_else: DrawableColor;
    actions_entry_background_color_else_hover: DrawableColor;
    actions_entry_background_color_while: DrawableColor;
    actions_entry_background_color_while_hover: DrawableColor;
    actions_entry_background_color_folder: DrawableColor;
    actions_entry_background_color_folder_hover: DrawableColor;
    actions_entry_background_color_generic_block: DrawableColor;
    actions_entry_background_color_generic_block_hover: DrawableColor;
    actions_chain_indicator_color: DrawableColor;
    actions_chain_indicator_hovered_color: DrawableColor;
    actions_chain_indicator_selected_color: DrawableColor;
    actions_minimap_background_color: DrawableColor;
    actions_minimap_border_color: DrawableColor;
    actions_minimap_viewport_color: DrawableColor;
    actions_minimap_viewport_border_color: DrawableColor;
    actions_minimap_tooltip_border_color: DrawableColor;
    text_editor_sidebar_color: DrawableColor;
    text_editor_line_number_text_color_normal: DrawableColor;
    text_editor_line_number_text_color_selected: DrawableColor;
    listing_dot_color_1: DrawableColor;
    listing_dot_color_2: DrawableColor;
    listing_dot_color_3: DrawableColor;
    suggestions_background_color: DrawableColor;
    suggestions_text_color_normal: DrawableColor;
    suggestions_text_color_selected: DrawableColor;
    ui_texture_color: DrawableColor;
    generic_text_base_color: DrawableColor;
    element_label_color_normal: DrawableColor;
    element_label_color_inactive: DrawableColor;
    edit_box_text_color_normal: DrawableColor;
    edit_box_text_color_uneditable: DrawableColor;
    edit_box_suggestion_text_color: DrawableColor;
    description_area_text_color: DrawableColor;
    text_editor_text_color: DrawableColor;
    success_text_color: DrawableColor;
    error_text_color: DrawableColor;
    warning_text_color: DrawableColor;
    text_editor_text_formatting_nested_text_color_1: DrawableColor;
    text_editor_text_formatting_nested_text_color_2: DrawableColor;
    text_editor_text_formatting_nested_text_color_3: DrawableColor;
    text_editor_text_formatting_nested_text_color_4: DrawableColor;
    text_editor_text_formatting_nested_text_color_5: DrawableColor;
    text_editor_text_formatting_nested_text_color_6: DrawableColor;
    text_editor_text_formatting_nested_text_color_7: DrawableColor;
    text_editor_text_formatting_nested_text_color_8: DrawableColor;
    text_editor_text_formatting_nested_text_color_9: DrawableColor;
    text_editor_text_formatting_nested_text_color_10: DrawableColor;
    text_editor_text_formatting_nested_text_color_11: DrawableColor;
    text_editor_text_formatting_nested_text_color_12: DrawableColor;
    text_editor_text_formatting_brackets_color: DrawableColor;
    constructor(identifier: string, display_name: string);
    get displayName(): Component;
    get identifier(): string;
    setUITextureShaderColor(graphics: GuiGraphics, alpha: number): void;
  }


  class UIColorThemeRegistry {
    static clearThemes(): void;
    static get activeTheme(): UIColorTheme;
    static get themes(): UIColorTheme[];
    static getTheme(identifier: string): UIColorTheme;
    static register(theme: UIColorTheme): void;
    static set activeTheme(identifier: string);
  }


  class UIColorThemeSerializer {
    static readonly DRAWABLE_COLOR_TYPE_ADAPTER: TypeAdapter;
    static deserializeTheme(json: string): UIColorTheme;
    static deserializeThemeFromFile(file: File): UIColorTheme;
    static deserializeThemeFromResource(resource: ResourceLocation): UIColorTheme;
    static serializeTheme(theme: UIColorTheme): string;
    static serializeThemeToFile(theme: UIColorTheme, file: File): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.toast' {
  import { Toast, ToastComponent } from 'net.minecraft.client.gui.components.toasts';
  import { Icon } from 'de.keksuccino.fancymenu.util.rendering.ui.toast.SimpleToast';
  import { Component } from 'net.minecraft.network.chat';
  import { Visibility } from 'Toast';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';

  interface SimpleToast extends Toast {}
  class SimpleToast extends Toast {
    static readonly PROGRESS_BAR_WIDTH: number;
    static readonly PROGRESS_BAR_HEIGHT: number;
    static readonly PROGRESS_BAR_X: number;
    static readonly PROGRESS_BAR_Y: number;
    constructor(icon: Icon, title: Component, message: Component, progressable: boolean);
    height(): number;
    hide(): void;
    render(graphics: GuiGraphics, toastComponent: ToastComponent, progressTime: number): Visibility;
    setCustomBackground(texture: ResourceSupplier<ITexture>): SimpleToast;
    setHeight(height: number): SimpleToast;
    setWidth(width: number): SimpleToast;
    updateProgress(progress: number): void;
    width(): number;
  }


  class ToastHandler {
    static showToast(toast: SimpleToast, durationMs: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.toast.SimpleToast' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class Icon {
    constructor(textureLocation: ResourceLocation);

    constructor(textureSupplier: ResourceSupplier<ITexture>);
    render(graphics: GuiGraphics, x: number, y: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.tooltip' {
  import { Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { TooltipTextAlignment } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip.Tooltip';
  import { Integer, Float } from 'java.lang';
  import { Post } from 'de.keksuccino.fancymenu.events.screen.RenderScreenEvent';
  import { Pre } from 'de.keksuccino.fancymenu.events.screen.InitOrResizeScreenEvent';
  import { HandledTooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip.TooltipHandler';
  import { BooleanSupplier } from 'java.util.function';

  interface Tooltip extends Renderable {}
  class Tooltip extends Renderable {
    constructor();
    copyStyleOf(tooltip: Tooltip): Tooltip;
    static empty(): Tooltip;
    get backgroundColor(): DrawableColor;
    get backgroundTexture(): ITexture;
    get borderColor(): DrawableColor;
    get customX(): number;
    get customY(): number;
    get font(): Font;
    get mouseOffset(): number;
    get scale(): number;
    get textAlignment(): TooltipTextAlignment;
    get textBaseColor(): DrawableColor;
    get textBorderSize(): number;
    get tooltip(): Component[];
    hasTextShadow(): boolean;
    isEmpty(): boolean;
    isVanillaLike(): boolean;
    keepBackgroundAspectRatio(): boolean;
    static of(...tooltip: string[]): Tooltip;
    static of(...tooltip: Component[]): Tooltip;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundTexture(texture: ITexture);
    set customX(x: number);
    set customY(y: number);
    set font(font: Font);
    set mouseOffset(offset: number);
    set scale(scale: number);
    set textAlignment(textAlignment: TooltipTextAlignment);
    set textBaseColor(textBaseColor: DrawableColor);
    set textBorderSize(size: number);
    setBackgroundColor(backgroundColor: DrawableColor, borderColor: DrawableColor): Tooltip;
    setDefaultStyle(): Tooltip;
    setKeepBackgroundAspectRatio(keepBackgroundAspectRatio: boolean): Tooltip;
    setTextShadow(textShadow: boolean): Tooltip;
    setTooltipText(...lines: string[]): Tooltip;
    setTooltipText(...lines: Component[]): Tooltip;
    setTooltipText(lines: Component[]): Tooltip;
    setVanillaLike(vanillaLike: boolean): Tooltip;
  }


  class TooltipHandler {
    static readonly INSTANCE: TooltipHandler;
    constructor();
    addTooltip(tooltip: Tooltip, shouldRender: BooleanSupplier, removeOnScreenInitOrResize: boolean, removeAfterScreenRender: boolean): HandledTooltip;
    addWidgetTooltip(widget: AbstractWidget, tooltip: Tooltip, removeOnScreenInitOrResize: boolean, removeAfterScreenRender: boolean): HandledTooltip;
    onScreenInitResizePre(e: Pre): void;
    onScreenRenderPost(e: Post): void;
    removeTooltip(tooltip: HandledTooltip): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.tooltip.Tooltip' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TooltipTextAlignment extends Enum<TooltipTextAlignment> {}
  class TooltipTextAlignment extends Enum<TooltipTextAlignment> {
    static readonly LEFT: TooltipTextAlignment;
    static readonly RIGHT: TooltipTextAlignment;
    static readonly CENTERED: TooltipTextAlignment;
    static valueOf(name: string): TooltipTextAlignment;
    static values(): TooltipTextAlignment[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.tooltip.TooltipHandler' {
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { BooleanSupplier } from 'java.util.function';

  class HandledTooltip {
    readonly tooltip: Tooltip;
    readonly shouldRender: BooleanSupplier;
    readonly removeOnScreenInitOrResize: boolean;
    readonly removeAfterScreenRender: boolean;
    remove(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget' {
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { RenderableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { AbstractSliderButton, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { Component, Style } from 'net.minecraft.network.chat';
  import { Runnable, Boolean, Integer } from 'java.lang';
  import { List } from 'java.util';
  import { Consumer } from 'java.util.function';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { CustomBackgroundResetBehavior } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.CustomizableWidget';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RealmsNotificationsScreen } from 'com.mojang.realmsclient.gui.screens';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { RendererWidgetBody } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.RendererWidget';
  import { SoundManager } from 'net.minecraft.client.sounds';
  import { TextAlignment } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.TextWidget';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class BrandingRenderer {
    constructor(screenHeight: number);
    get defaultPositionX(): number;
    get defaultPositionY(): number;
    get totalHeight(): number;
    get totalWidth(): number;
    render(graphics: GuiGraphics): void;
    render(graphics: GuiGraphics, x: number, y: number): void;
    setOpacity(opacity: number): BrandingRenderer;
  }


  class CustomizableSlider {
    get customSliderBackgroundHighlightedFancyMenu(): RenderableResource;
    get customSliderBackgroundNormalFancyMenu(): RenderableResource;
    get nineSliceSliderBackgroundBorderX_FancyMenu(): number;
    get nineSliceSliderBackgroundBorderY_FancyMenu(): number;
    get nineSliceSliderHandleBorderX_FancyMenu(): number;
    get nineSliceSliderHandleBorderY_FancyMenu(): number;
    isNineSliceCustomSliderBackground_FancyMenu(): boolean;
    isNineSliceCustomSliderHandle_FancyMenu(): boolean;
    renderSliderBackgroundFancyMenu(graphics: GuiGraphics, widget: AbstractSliderButton, canChangeValue: boolean): boolean;
    set customSliderBackgroundHighlightedFancyMenu(var1: RenderableResource);
    set customSliderBackgroundNormalFancyMenu(var1: RenderableResource);
    set nineSliceSliderBackgroundBorderX_FancyMenu(var1: number);
    set nineSliceSliderBackgroundBorderY_FancyMenu(var1: number);
    set nineSliceSliderHandleBorderX_FancyMenu(var1: number);
    set nineSliceSliderHandleBorderY_FancyMenu(var1: number);
    setNineSliceCustomSliderBackground_FancyMenu(var1: boolean): void;
    setNineSliceCustomSliderHandle_FancyMenu(var1: boolean): void;
  }


  class CustomizableWidget {
    addFocusStateListenerFancyMenu(var1: Consumer<boolean>): void;
    addHoverOrFocusStateListenerFancyMenu(var1: Consumer<boolean>): void;
    addHoverStateListenerFancyMenu(var1: Consumer<boolean>): void;
    addResetCustomizationsListenerFancyMenu(var1: Runnable): void;
    get customBackgroundHoverFancyMenu(): RenderableResource;
    get customBackgroundInactiveFancyMenu(): RenderableResource;
    get customBackgroundNormalFancyMenu(): RenderableResource;
    get customBackgroundResetBehaviorFancyMenu(): CustomBackgroundResetBehavior;
    get customClickSoundFancyMenu(): IAudio;
    get customHeightFancyMenu(): number;
    get customLabelFancyMenu(): Component;
    get customWidthFancyMenu(): number;
    get customXFancyMenu(): number;
    get customYFancyMenu(): number;
    get focusStateListenersFancyMenu(): Consumer<boolean>[];
    get hoverLabelFancyMenu(): Component;
    get hoverOrFocusStateListenersFancyMenu(): Consumer<boolean>[];
    get hoverSoundFancyMenu(): IAudio;
    get hoverStateListenersFancyMenu(): Consumer<boolean>[];
    get lastFocusStateFancyMenu(): boolean;
    get lastHoverOrFocusStateFancyMenu(): boolean;
    get lastHoverStateFancyMenu(): boolean;
    get nineSliceCustomBackgroundBorderX_FancyMenu(): number;
    get nineSliceCustomBackgroundBorderY_FancyMenu(): number;
    get originalMessageFancyMenu(): Component;
    get resetCustomizationsListenersFancyMenu(): Runnable[];
    isHiddenFancyMenu(): boolean;
    isNineSliceCustomBackgroundTexture_FancyMenu(): boolean;
    renderCustomBackgroundFancyMenu(widget: AbstractWidget, graphics: GuiGraphics, x: number, y: number, width: number, height: number): boolean;
    resetWidgetCustomizationsFancyMenu(): void;
    resetWidgetSizeAndPositionFancyMenu(): void;
    set customBackgroundHoverFancyMenu(var1: RenderableResource);
    set customBackgroundInactiveFancyMenu(var1: RenderableResource);
    set customBackgroundNormalFancyMenu(var1: RenderableResource);
    set customBackgroundResetBehaviorFancyMenu(var1: CustomBackgroundResetBehavior);
    set customClickSoundFancyMenu(var1: IAudio);
    set customHeightFancyMenu(var1: number);
    set customLabelFancyMenu(var1: Component);
    set customWidthFancyMenu(var1: number);
    set customXFancyMenu(var1: number);
    set customYFancyMenu(var1: number);
    set hoverLabelFancyMenu(var1: Component);
    set hoverSoundFancyMenu(var1: IAudio);
    set lastFocusStateFancyMenu(var1: boolean);
    set lastHoverOrFocusStateFancyMenu(var1: boolean);
    set lastHoverStateFancyMenu(var1: boolean);
    setHiddenFancyMenu(var1: boolean): void;
    setNineSliceBorderX_FancyMenu(var1: number): void;
    setNineSliceBorderY_FancyMenu(var1: number): void;
    setNineSliceCustomBackground_FancyMenu(var1: boolean): void;
    stopCustomClickSoundFancyMenu(): void;
    stopHoverSoundFancyMenu(): void;
    tickFocusStateListenersFancyMenu(focused: boolean): void;
    tickHoverOrFocusStateListenersFancyMenu(hoveredOrFocused: boolean): void;
    tickHoverStateListenersFancyMenu(hovered: boolean): void;
  }


  class IExtendedWidget {
    renderScrollingLabel(widget: AbstractWidget, graphics: GuiGraphics, font: Font, spaceLeftRight: number, labelShadow: boolean, textColor: number): void;
    renderScrollingLabelInternal(graphics: GuiGraphics, font: Font, text: Component, xMin: number, yMin: number, xMax: number, yMax: number, labelShadow: boolean, textColor: number): void;
  }


  class MinecraftLogoRenderer {
    static readonly DEFAULT_INSTANCE: MinecraftLogoRenderer;
    static readonly MINECRAFT_LOGO: ResourceLocation;
    static readonly EASTER_EGG_LOGO: ResourceLocation;
    static readonly MINECRAFT_EDITION: ResourceLocation;
    static readonly LOGO_WIDTH: number;
    static readonly LOGO_HEIGHT: number;
    static readonly DEFAULT_HEIGHT_OFFSET: number;
    constructor(keepLogoThroughFade: boolean);
    get height(): number;
    get width(): number;
    renderLogo(guiGraphics: GuiGraphics, screenWidth: number, transparency: number): void;
    renderLogo(guiGraphics: GuiGraphics, screenWidth: number, transparency: number, height: number): void;
    renderLogoAtPosition(guiGraphics: GuiGraphics, x: number, y: number, transparency: number): void;
  }


  class MinecraftSplashRenderer {
    static readonly DEFAULT_INSTANCE: MinecraftSplashRenderer;
    static readonly WIDTH_OFFSET: number;
    static readonly HEIGHT_OFFSET: number;
    constructor(splash: string);
    get defaultPositionY(): number;
    get splash(): string;
    getDefaultPositionX(screenWidth: number): number;
    render(guiGraphics: GuiGraphics, screenWidth: number, font: Font, color: number): void;
    renderAt(guiGraphics: GuiGraphics, x: number, y: number, font: Font, color: number): void;
  }


  class NavigatableWidget {
    isFocusable(): boolean;
    isNavigatable(): boolean;
    setFocusable(var1: boolean): void;
    setNavigatable(var1: boolean): void;
  }


  class RealmsNotificationRenderer {
    constructor(screen: RealmsNotificationsScreen, screenWidth: number, screenHeight: number);
    get defaultPositionX(): number;
    get defaultPositionY(): number;
    get numberOfPendingInvites(): number;
    get totalHeight(): number;
    get totalWidth(): number;
    hasUnreadNews(): boolean;
    hasUnseenNotifications(): boolean;
    isTrialAvailable(): boolean;
    renderIcons(guiGraphics: GuiGraphics, x: number, y: number, color: number): void;
    renderIcons(guiGraphics: GuiGraphics, color: number): void;
    shouldShowOldNotifications(): boolean;
  }


  interface RendererWidget extends UniqueWidget, NavigatableWidget, FancyMenuWidget, AbstractWidget {}
  class RendererWidget extends UniqueWidget {
    constructor(x: number, y: number, width: number, height: number, body: RendererWidgetBody);
    get alpha(): number;
    get widgetIdentifierFancyMenu(): string;
    isFocusable(): boolean;
    isNavigatable(): boolean;
    playDownSound($$0: SoundManager): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set widgetIdentifierFancyMenu(identifier: string);
    setBody(body: RendererWidgetBody): RendererWidget;
    setFocusable(focusable: boolean): void;
    setNavigatable(navigatable: boolean): void;
  }


  interface TextWidget extends UniqueWidget, NavigatableWidget, FancyMenuWidget, AbstractWidget {}
  class TextWidget extends UniqueWidget {
    constructor(x: number, y: number, width: number, height: number, font: Font, text: Component);
    centerWidget(parent: Screen): TextWidget;
    static empty(x: number, y: number, width: number): TextWidget;
    get baseColor(): DrawableColor;
    get font(): Font;
    get renderX(): number;
    get renderY(): number;
    get scale(): number;
    get scaledTextHeight(): number;
    get scaledTextWidth(): number;
    get textAlignment(): TextAlignment;
    get textWidth(): number;
    get widgetIdentifierFancyMenu(): string;
    getStyleAtMouseX(mouseX: number): Style;
    isFocusable(): boolean;
    isNavigatable(): boolean;
    isShadowEnabled(): boolean;
    isTextHovered(mouseX: number, mouseY: number): boolean;
    static of(text: Component, x: number, y: number, width: number): TextWidget;
    static of(text: string, x: number, y: number, width: number): TextWidget;
    playDownSound($$0: SoundManager): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set baseColor(baseColor: DrawableColor);
    set font(font: Font);
    set scale(scale: number);
    set textAlignment(alignment: TextAlignment);
    set widgetIdentifierFancyMenu(identifier: string);
    setFocusable(focusable: boolean): void;
    setNavigatable(navigatable: boolean): void;
    setShadowEnabled(enabled: boolean): TextWidget;
  }


  class UniqueLabeledSwitchCycleButton {
    get labeledSwitchComponentLabel_FancyMenu(): Component;
    set labeledSwitchComponentLabel_FancyMenu(var1: Component);
  }


  class UniqueWidget {
    get widgetIdentifierFancyMenu(): string;
    set widgetIdentifierFancyMenu(var1: string);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.button' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StateChangedAction } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button.CheckboxButton';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ILocalizedValueCycle } from 'de.keksuccino.fancymenu.util.cycle';
  import { CycleButtonClickFeedback } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button.CycleButton';
  import { Button, WidgetSprites } from 'net.minecraft.client.gui.components';
  import { IExtendedWidget, UniqueWidget, NavigatableWidget, CustomizableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { OnPress, CreateNarration } from 'Button';
  import { Component } from 'net.minecraft.network.chat';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Boolean } from 'java.lang';
  import { RenderableResource } from 'de.keksuccino.fancymenu.util.resource';

  interface CheckboxButton extends ExtendedButton {}
  class CheckboxButton extends ExtendedButton {
    static readonly CHECKBOX_BACKGROUND_TEXTURE_NORMAL_DEFAULT: ResourceLocation;
    static readonly CHECKBOX_BACKGROUND_TEXTURE_HOVER_DEFAULT: ResourceLocation;
    static readonly CHECKBOX_BACKGROUND_TEXTURE_INACTIVE_DEFAULT: ResourceLocation;
    static readonly CHECKBOX_CHECKMARK_TEXTURE_DEFAULT: ResourceLocation;
    constructor(x: number, y: number, width: number, height: number, onStateChanged: StateChangedAction);
    get checkboxBackground(): ResourceLocation;
    get checkboxBackgroundTextureHover(): ResourceLocation;
    get checkboxBackgroundTextureInactive(): ResourceLocation;
    get checkboxBackgroundTextureNormal(): ResourceLocation;
    get checkboxCheckmarkTexture(): ResourceLocation;
    get checkboxState(): boolean;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    setCheckboxState(state: boolean, callOnStateChanged: boolean): void;
    setCustomBackgroundTextureHover(customBackgroundTextureHover: ITexture): void;
    setCustomBackgroundTextureInactive(customBackgroundTextureInactive: ITexture): void;
    setCustomBackgroundTextureNormal(customBackgroundTextureNormal: ITexture): void;
    setCustomCheckboxCheckmarkTexture(customCheckmarkTexture: ITexture): void;
  }


  interface CycleButton<T = any> extends ExtendedButton {}
  class CycleButton<T = any> extends ExtendedButton {
    constructor(x: number, y: number, width: number, height: number, cycle: ILocalizedValueCycle<T>, clickFeedback: CycleButtonClickFeedback<T>);
    click(): void;
    get selectedValue(): T;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set selectedValue(value: T);
  }


  interface ExtendedButton extends IExtendedWidget, UniqueWidget, NavigatableWidget, FancyMenuWidget, Button {}
  class ExtendedButton extends IExtendedWidget {
    static readonly SPRITES: WidgetSprites;
    constructor(x: number, y: number, width: number, height: number, label: string, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, label: string, onPress: OnPress, narration: CreateNarration);

    constructor(x: number, y: number, width: number, height: number, label: Component, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, label: Component, onPress: OnPress, narration: CreateNarration);
    get backgroundColorHover(): DrawableColor;
    get backgroundColorInactive(): DrawableColor;
    get backgroundColorNormal(): DrawableColor;
    get backgroundHover(): RenderableResource;
    get backgroundInactive(): RenderableResource;
    get backgroundNormal(): RenderableResource;
    get borderColorHover(): DrawableColor;
    get borderColorInactive(): DrawableColor;
    get borderColorNormal(): DrawableColor;
    get extendedAsCustomizableWidget(): CustomizableWidget;
    get isActiveSupplier(): ConsumingSupplier<ExtendedButton, boolean>;
    get label(): Component;
    get labelBaseColorInactive(): DrawableColor;
    get labelBaseColorNormal(): DrawableColor;
    get labelSupplier(): ConsumingSupplier<ExtendedButton, Component>;
    get message(): Component;
    get pressAction(): OnPress;
    get tooltipFancyMenu(): Tooltip;
    get tooltipSupplier(): ConsumingSupplier<ExtendedButton, Tooltip>;
    get widgetIdentifierFancyMenu(): string;
    isFocusable(): boolean;
    isFocused(): boolean;
    isForceDefaultTooltipStyle(): boolean;
    isLabelEnabled(): boolean;
    isLabelShadowEnabled(): boolean;
    isNavigatable(): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundColorHover(backgroundColorHover: DrawableColor);
    set backgroundColorInactive(backgroundColorInactive: DrawableColor);
    set backgroundColorNormal(backgroundColorNormal: DrawableColor);
    set backgroundHover(background: RenderableResource);
    set backgroundInactive(background: RenderableResource);
    set backgroundNormal(background: RenderableResource);
    set borderColorHover(borderColorHover: DrawableColor);
    set borderColorInactive(borderColorInactive: DrawableColor);
    set borderColorNormal(borderColorNormal: DrawableColor);
    set isActiveSupplier(isActiveSupplier: ConsumingSupplier<ExtendedButton, boolean>);
    set label(label: Component);
    set labelBaseColorInactive(labelBaseColorInactive: DrawableColor);
    set labelBaseColorNormal(labelBaseColorNormal: DrawableColor);
    set labelSupplier(labelSupplier: ConsumingSupplier<ExtendedButton, Component>);
    set message(msg: Component);
    set pressAction(pressAction: OnPress);
    set tooltipSupplier(tooltipSupplier: ConsumingSupplier<ExtendedButton, Tooltip>);
    set widgetIdentifierFancyMenu(identifier: string);
    setBackgroundColor(backgroundColorNormal: DrawableColor, backgroundColorHover: DrawableColor, backgroundColorInactive: DrawableColor, borderColorNormal: DrawableColor, borderColorHover: DrawableColor, borderColorInactive: DrawableColor): void;
    setFocusable(focusable: boolean): void;
    setFocused($$0: boolean): void;
    setForceDefaultTooltipStyle(forceDefaultTooltipStyle: boolean): ExtendedButton;
    setHeight(height: number): void;
    setLabel(label: string): ExtendedButton;
    setLabelEnabled(enabled: boolean): ExtendedButton;
    setLabelShadowEnabled(enabled: boolean): ExtendedButton;
    setNavigatable(navigatable: boolean): void;
    setTooltip(tooltip: Tooltip): ExtendedButton;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.button.CheckboxButton' {
  import { CheckboxButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';

  class StateChangedAction {
    onStateChanged(var1: CheckboxButton, var2: boolean): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.button.CycleButton' {
  import { CycleButton } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.button';

  class CycleButtonClickFeedback<T = any> {
    onClick(var1: T, var2: CycleButton<T>): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.component' {
  import { AbstractWidget } from 'net.minecraft.client.gui.components';
  import { NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { Consumer } from 'java.util.function';

  interface ComponentWidget extends NavigatableWidget, FancyMenuWidget, AbstractWidget {}
  class ComponentWidget extends NavigatableWidget {
    append(child: ComponentWidget): ComponentWidget;
    static empty(x: number, y: number): ComponentWidget;
    get baseColor(): DrawableColor;
    get baseColorSupplier(): ConsumingSupplier<ComponentWidget, DrawableColor>;
    get children(): ComponentWidget[];
    get height(): number;
    get message(): Component;
    get parent(): ComponentWidget;
    get text(): MutableComponent;
    get textSupplier(): ConsumingSupplier<ComponentWidget, MutableComponent>;
    get width(): number;
    hasShadow(): boolean;
    isFocusable(): boolean;
    isNavigatable(): boolean;
    static literal(text: string, x: number, y: number): ComponentWidget;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    static of(component: MutableComponent, x: number, y: number): ComponentWidget;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set baseColor(baseColor: DrawableColor);
    set baseColorSupplier(baseColorSupplier: ConsumingSupplier<ComponentWidget, DrawableColor>);
    set message(content: Component);
    set text(text: MutableComponent);
    set textSupplier(textSupplier: ConsumingSupplier<ComponentWidget, MutableComponent>);
    setFocusable(focusable: boolean): void;
    setNavigatable(navigatable: boolean): void;
    setOnClick(onClick: Consumer<ComponentWidget>): ComponentWidget;
    setOnHoverOrFocusEnd(onHoverOrFocusEnd: Consumer<ComponentWidget>): ComponentWidget;
    setOnHoverOrFocusStart(onHoverOrFocusStart: Consumer<ComponentWidget>): ComponentWidget;
    setShadow(shadow: boolean): ComponentWidget;
    static translatable(key: string, x: number, y: number): ComponentWidget;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.CustomizableWidget' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CustomBackgroundResetBehavior extends Enum<CustomBackgroundResetBehavior> {}
  class CustomBackgroundResetBehavior extends Enum<CustomBackgroundResetBehavior> {
    static readonly RESET_NEVER: CustomBackgroundResetBehavior;
    static readonly RESET_ON_HOVER: CustomBackgroundResetBehavior;
    static readonly RESET_ON_UNHOVER: CustomBackgroundResetBehavior;
    static readonly RESET_ON_HOVER_AND_UNHOVER: CustomBackgroundResetBehavior;
    static valueOf(name: string): CustomBackgroundResetBehavior;
    static values(): CustomBackgroundResetBehavior[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox' {
  import { CommandSuggestions, EditBox } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { SuggestionsRenderPosition } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox.EditBoxSuggestions';
  import { List } from 'java.util';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { SuggestionsList } from 'CommandSuggestions';
  import { CompletableFuture } from 'java.util.concurrent';
  import { Suggestions } from 'com.mojang.brigadier.suggestion';
  import { ParseResults } from 'com.mojang.brigadier';
  import { SharedSuggestionProvider } from 'net.minecraft.commands';
  import { IMixinCommandSuggestions } from 'de.keksuccino.fancymenu.mixin.mixins.common.client';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { UniqueWidget, NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { Component } from 'net.minecraft.network.chat';
  import { CharacterFilter } from 'de.keksuccino.fancymenu.util.input';
  import { CharacterRenderFormatter } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox.ExtendedEditBox';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Boolean } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Tooltip } from 'de.keksuccino.fancymenu.util.rendering.ui.tooltip';

  interface EditBoxSuggestions extends CommandSuggestions {}
  class EditBoxSuggestions extends CommandSuggestions {
    constructor(mc: Minecraft, parentScreen: Screen, targetEditBox: EditBox, font: Font, commandsOnly: boolean, onlyShowIfCursorPastError: boolean, lineStartOffset: number, suggestionLineLimit: number, anchorToBottom: boolean);
    autoSuggestionsEnabled(): boolean;
    static createWithCustomSuggestions(screen: Screen, editBox: EditBox, renderPosition: SuggestionsRenderPosition, suggestions: string[]): EditBoxSuggestions;
    enableOnlyCustomSuggestionsMode(enable: boolean): void;
    get accessor(): IMixinCommandSuggestions;
    get backgroundColor(): DrawableColor;
    get commandUsage(): FormattedCharSequence[];
    get currentParse(): ParseResults<SharedSuggestionProvider>;
    get normalTextColor(): DrawableColor;
    get pendingSuggestions(): CompletableFuture<Suggestions>;
    get selectedTextColor(): DrawableColor;
    get suggestions(): SuggestionsList;
    get suggestionsRenderPosition(): SuggestionsRenderPosition;
    isAllowRenderUsage(): boolean;
    isKeepSuggestions(): boolean;
    isOnlyCustomSuggestionsMode(): boolean;
    isTextShadow(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked($$0: number, $$1: number, $$2: number): boolean;
    mouseScrolled($$0: number): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    renderUsage(graphics: GuiGraphics): void;
    set backgroundColor(backgroundColor: DrawableColor);
    set currentParse(currentParse: ParseResults<SharedSuggestionProvider>);
    set normalTextColor(normalTextColor: DrawableColor);
    set pendingSuggestions(pendingSuggestions: CompletableFuture<Suggestions>);
    set selectedTextColor(selectedTextColor: DrawableColor);
    set suggestions(suggestions: SuggestionsList);
    set suggestionsRenderPosition(position: SuggestionsRenderPosition);
    setAllowRenderUsage(allow: boolean): void;
    setAutoSuggestionsEnabled(enabled: boolean): void;
    setCustomSuggestions(customSuggestions: string[]): void;
    setTextShadow(textShadow: boolean): void;
    showSuggestions(someNarratingRelatedBoolean: boolean): void;
    suggestionsAllowed(): boolean;
    updateCommandInfo(): void;
  }


  interface ExtendedEditBox extends UniqueWidget, NavigatableWidget, FancyMenuWidget, EditBox {}
  class ExtendedEditBox extends UniqueWidget {
    constructor(font: Font, x: number, y: number, width: number, height: number, narrationMessage: Component);

    constructor(font: Font, x: number, y: number, width: number, height: number, editBox: EditBox, narrationMessage: Component);
    applyInputPrefixSuffixCharacterRenderFormatter(): ExtendedEditBox;
    canConsumeUserInput(): boolean;
    charTyped(character: string, modifiers: number): boolean;
    deleteChars(i: number): void;
    deleteText(i: number): void;
    get backgroundColor(): DrawableColor;
    get borderFocusedColor(): DrawableColor;
    get borderNormalColor(): DrawableColor;
    get characterFilter(): CharacterFilter;
    get characterRenderFormatter(): CharacterRenderFormatter;
    get displayPosition(): number;
    get highlightPosition(): number;
    get inputPrefix(): string;
    get inputSuffix(): string;
    get suggestionTextColor(): DrawableColor;
    get textColor(): DrawableColor;
    get textColorUneditable(): DrawableColor;
    get valueWithoutPrefixSuffix(): string;
    get widgetIdentifierFancyMenu(): string;
    hasTextShadow(): boolean;
    insertText(textToWrite: string): void;
    isDeleteAllAllowed(): boolean;
    isFocusable(): boolean;
    isFocused(): boolean;
    isForceDefaultTooltipStyle(): boolean;
    isInPrefixSuffix(index: number, prefixIndexOffset: number, suffixIndexOffset: number): boolean;
    isNavigatable(): boolean;
    keyPressed(keycode: number, scancode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundColor(backgroundColor: DrawableColor);
    set borderFocusedColor(borderFocusedColor: DrawableColor);
    set borderNormalColor(borderNormalColor: DrawableColor);
    set characterFilter(characterFilter: CharacterFilter);
    set characterRenderFormatter(characterRenderFormatter: CharacterRenderFormatter);
    set displayPosition(position: number);
    set inputPrefix(inputPrefix: string);
    set inputSuffix(inputSuffix: string);
    set suggestionTextColor(suggestionTextColor: DrawableColor);
    set textColor(textColor: DrawableColor);
    set textColorUneditable(textColorUneditable: DrawableColor);
    set widgetIdentifierFancyMenu(identifier: string);
    setCanConsumeUserInput(canConsumeUserInput: boolean): ExtendedEditBox;
    setDeleteAllAllowed(allowed: boolean): ExtendedEditBox;
    setFocusable(focusable: boolean): void;
    setFocused(focused: boolean): void;
    setForceDefaultTooltipStyle(forceDefaultTooltipStyle: boolean): void;
    setHeight(height: number): void;
    setHintFancyMenu(hint: ConsumingSupplier<ExtendedEditBox, Component>): ExtendedEditBox;
    setIsActiveSupplier(isActiveSupplier: ConsumingSupplier<ExtendedEditBox, boolean>): void;
    setIsVisibleSupplier(isVisibleSupplier: ConsumingSupplier<ExtendedEditBox, boolean>): void;
    setNavigatable(navigatable: boolean): void;
    setTextColor(color: number): void;
    setTextColorUneditable(color: number): void;
    setTextShadow_FancyMenu(textShadow: boolean): ExtendedEditBox;
    setTooltip(tooltip: Supplier<Tooltip>): ExtendedEditBox;
    setValue(value: string): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox.EditBoxSuggestions' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { SuggestionsList } from 'CommandSuggestions';
  import { Suggestion } from 'com.mojang.brigadier.suggestion';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { Vec2 } from 'net.minecraft.world.phys';
  import { IMixinSuggestionsList } from 'de.keksuccino.fancymenu.mixin.mixins.common.client';

  interface SuggestionsRenderPosition extends Enum<SuggestionsRenderPosition> {}
  class SuggestionsRenderPosition extends Enum<SuggestionsRenderPosition> {
    static readonly VANILLA: SuggestionsRenderPosition;
    static readonly ABOVE_EDIT_BOX: SuggestionsRenderPosition;
    static readonly BELOW_EDIT_BOX: SuggestionsRenderPosition;
    static valueOf(name: string): SuggestionsRenderPosition;
    static values(): SuggestionsRenderPosition[];
  }


  interface EditBoxSuggestionsList extends SuggestionsList {}
  class EditBoxSuggestionsList extends SuggestionsList {
    constructor(x: number, y: number, width: number, suggestionList: Suggestion[], someNarratingRelatedBoolean: boolean);
    get accessor(): IMixinSuggestionsList;
    get current(): number;
    get lastMouse(): Vec2;
    get offset(): number;
    get rect(): Rect2i;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number): void;
    set lastMouse(lastMouse: Vec2);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox.ExtendedEditBox' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { ExtendedEditBox } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.editbox';

  class CharacterRenderFormatter {
    formatComponent(var1: ExtendedEditBox, var2: MutableComponent, var3: number, var4: string, var5: string, var6: string): MutableComponent;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.RendererWidget' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { RendererWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';

  class RendererWidgetBody {
    render(var1: GuiGraphics, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number, var9: RendererWidget): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider' {
  class FancyMenuWidget {
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v1' {
  import { AbstractSliderButton } from 'net.minecraft.client.gui.components';
  import { UniqueWidget, NavigatableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { IMixinAbstractSliderButton } from 'de.keksuccino.fancymenu.mixin.mixins.common.client';
  import { List } from 'java.util';

  interface ExtendedSliderButton extends UniqueWidget, NavigatableWidget, FancyMenuWidget, AbstractSliderButton {}
  class ExtendedSliderButton extends UniqueWidget {
    static readonly SLIDER_SPRITE: ResourceLocation;
    static readonly HIGHLIGHTED_SPRITE: ResourceLocation;
    static readonly SLIDER_HANDLE_SPRITE: ResourceLocation;
    static readonly SLIDER_HANDLE_HIGHLIGHTED_SPRITE: ResourceLocation;
    handleClick: boolean;
    enableRightClick: boolean;
    ignoreBlockedInput: boolean;
    ignoreGlobalLeftMouseDown: boolean;
    constructor(x: number, y: number, width: number, height: number, handleClick: boolean, value: number, applyValueCallback: Consumer<ExtendedSliderButton>);
    canChangeValue(): boolean;
    get accessor(): IMixinAbstractSliderButton;
    get backgroundColor(): DrawableColor;
    get borderColor(): DrawableColor;
    get handleColorHover(): DrawableColor;
    get handleColorNormal(): DrawableColor;
    get handleSprite(): ResourceLocation;
    get labelColorInactive(): DrawableColor;
    get labelColorNormal(): DrawableColor;
    get sliderMessageWithoutPrefixSuffix(): string;
    get sprite(): ResourceLocation;
    get value(): number;
    get widgetIdentifierFancyMenu(): string;
    isFocusable(): boolean;
    isFocused(): boolean;
    isLabelShadow(): boolean;
    isNavigatable(): boolean;
    onClick(mouseX: number, mouseY: number): void;
    onRelease(mouseX: number, mouseY: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundColor(backgroundColor: DrawableColor);
    set borderColor(borderColor: DrawableColor);
    set handleColorHover(handleColorHover: DrawableColor);
    set handleColorNormal(handleColorNormal: DrawableColor);
    set labelColorInactive(labelColorInactive: DrawableColor);
    set labelColorNormal(labelColorNormal: DrawableColor);
    set value(value: number);
    set widgetIdentifierFancyMenu(identifier: string);
    setFocusable(focusable: boolean): void;
    setFocused(focused: boolean): void;
    setLabelPrefix(prefix: string): void;
    setLabelShadow(labelShadow: boolean): void;
    setLabelSuffix(suffix: string): void;
    setNavigatable(navigatable: boolean): void;
    updateMessage(): void;
  }


  interface ListSliderButton extends ExtendedSliderButton {}
  class ListSliderButton extends ExtendedSliderButton {
    values: List;
    constructor(x: number, y: number, width: number, height: number, handleClick: boolean, values: string[], selectedIndex: number, applyValueCallback: Consumer<ExtendedSliderButton>);
    get selectedIndex(): number;
    get selectedListValue(): string;
    get sliderMessageWithoutPrefixSuffix(): string;
    set selectedIndex(index: number);
  }


  interface RangeSliderButton extends ExtendedSliderButton {}
  class RangeSliderButton extends ExtendedSliderButton {
    minValue: number;
    maxValue: number;
    constructor(x: number, y: number, width: number, height: number, handleClick: boolean, minRangeValue: number, maxRangeValue: number, selectedRangeValue: number, applyValueCallback: Consumer<ExtendedSliderButton>);
    get selectedRangeDoubleValue(): number;
    get selectedRangeValue(): number;
    get sliderMessageWithoutPrefixSuffix(): string;
    set selectedRangeValue(rangeValue: number);
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v2' {
  import { AbstractSliderButton } from 'net.minecraft.client.gui.components';
  import { IExtendedWidget, NavigatableWidget, CustomizableSlider, CustomizableWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget';
  import { FancyMenuWidget } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SliderValueUpdateListener } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v2.AbstractExtendedSlider';
  import { ConsumingSupplier } from 'de.keksuccino.fancymenu.util';
  import { Boolean } from 'java.lang';
  import { RenderableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { DrawableColor } from 'de.keksuccino.fancymenu.util.rendering';
  import { IMixinAbstractSliderButton } from 'de.keksuccino.fancymenu.mixin.mixins.common.client';
  import { List } from 'java.util';

  interface AbstractExtendedSlider extends IExtendedWidget, NavigatableWidget, FancyMenuWidget, AbstractSliderButton {}
  class AbstractExtendedSlider extends IExtendedWidget {
    static readonly SLIDER_SPRITE: ResourceLocation;
    static readonly HIGHLIGHTED_SPRITE: ResourceLocation;
    static readonly SLIDER_HANDLE_SPRITE: ResourceLocation;
    static readonly SLIDER_HANDLE_HIGHLIGHTED_SPRITE: ResourceLocation;
    constructor(x: number, y: number, width: number, height: number, label: Component, value: number);
    get accessor(): IMixinAbstractSliderButton;
    get asCustomizableSlider(): CustomizableSlider;
    get asCustomizableWidget(): CustomizableWidget;
    get backgroundTextureHighlighted(): RenderableResource;
    get backgroundTextureNormal(): RenderableResource;
    get handleSprite(): ResourceLocation;
    get handleTextureHover(): RenderableResource;
    get handleTextureInactive(): RenderableResource;
    get handleTextureNormal(): RenderableResource;
    get handleWidth(): number;
    get handleX(): number;
    get labelColorInactive(): DrawableColor;
    get labelColorNormal(): DrawableColor;
    get labelSupplier(): ConsumingSupplier<AbstractExtendedSlider, Component>;
    get sliderBackgroundColorHighlighted(): DrawableColor;
    get sliderBackgroundColorNormal(): DrawableColor;
    get sliderBorderColorHighlighted(): DrawableColor;
    get sliderBorderColorNormal(): DrawableColor;
    get sliderHandleColorHover(): DrawableColor;
    get sliderHandleColorInactive(): DrawableColor;
    get sliderHandleColorNormal(): DrawableColor;
    get sprite(): ResourceLocation;
    get value(): number;
    get valueDisplayText(): string;
    isFocusable(): boolean;
    isLabelShadow(): boolean;
    isNavigatable(): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    render($$0: GuiGraphics, $$1: number, $$2: number, $$3: number): void;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partial: number): void;
    set backgroundTextureHighlighted(texture: RenderableResource);
    set backgroundTextureNormal(texture: RenderableResource);
    set handleTextureHover(texture: RenderableResource);
    set handleTextureInactive(texture: RenderableResource);
    set handleTextureNormal(texture: RenderableResource);
    set labelColorInactive(labelColorInactive: DrawableColor);
    set labelColorNormal(labelColorNormal: DrawableColor);
    set labelSupplier(labelSupplier: ConsumingSupplier<AbstractExtendedSlider, Component>);
    set sliderBackgroundColorHighlighted(sliderBackgroundColorHighlighted: DrawableColor);
    set sliderBackgroundColorNormal(sliderBackgroundColorNormal: DrawableColor);
    set sliderBorderColorHighlighted(sliderBorderColorHighlighted: DrawableColor);
    set sliderBorderColorNormal(sliderBorderColorNormal: DrawableColor);
    set sliderHandleColorHover(sliderHandleColorHover: DrawableColor);
    set sliderHandleColorInactive(sliderHandleColorInactive: DrawableColor);
    set sliderHandleColorNormal(sliderHandleColorNormal: DrawableColor);
    set value(value: number);
    setFocusable(focusable: boolean): void;
    setIsActiveSupplier(supplier: ConsumingSupplier<AbstractExtendedSlider, boolean>): AbstractExtendedSlider;
    setLabelShadow(labelShadow: boolean): AbstractExtendedSlider;
    setNavigatable(navigatable: boolean): void;
    setSliderValueUpdateListener(listener: SliderValueUpdateListener): AbstractExtendedSlider;
    updateMessage(): void;
  }


  interface ListSlider<T = any> extends AbstractExtendedSlider {}
  class ListSlider<T = any> extends AbstractExtendedSlider {
    constructor(x: number, y: number, width: number, height: number, label: Component, listValues: T[], preSelectedIndex: number);
    get selectedIndex(): number;
    get selectedListValue(): T;
    get valueDisplayText(): string;
    set selectedIndex(index: number);
    setListValueStringSupplier(supplier: ConsumingSupplier<T, string>): void;
  }


  interface RangeSlider extends AbstractExtendedSlider {}
  class RangeSlider extends AbstractExtendedSlider {
    constructor(x: number, y: number, width: number, height: number, label: Component, minRangeValue: number, maxRangeValue: number, preSelectedRangeValue: number);
    get integerRangeValue(): number;
    get maxRangeValue(): number;
    get minRangeValue(): number;
    get rangeValue(): number;
    get roundingDecimalPlace(): number;
    get valueDisplayText(): string;
    set maxRangeValue(maxRangeValue: number);
    set minRangeValue(minRangeValue: number);
    set rangeValue(rangeValue: number);
    set roundingDecimalPlace(decimalPlace: number);
    setShowAsInteger(showAsInteger: boolean): RangeSlider;
    showAsInteger(): boolean;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v2.AbstractExtendedSlider' {
  import { AbstractExtendedSlider } from 'de.keksuccino.fancymenu.util.rendering.ui.widget.slider.v2';

  class SliderValueUpdateListener {
    update(var1: AbstractExtendedSlider, var2: string, var3: number): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.ui.widget.TextWidget' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TextAlignment extends Enum<TextAlignment> {}
  class TextAlignment extends Enum<TextAlignment> {
    static readonly LEFT: TextAlignment;
    static readonly RIGHT: TextAlignment;
    static readonly CENTER: TextAlignment;
    static valueOf(name: string): TextAlignment;
    static values(): TextAlignment[];
  }

}

declare module 'de.keksuccino.fancymenu.util.rendering.video.mcef' {
  import { ScheduledExecutorService, CompletableFuture } from 'java.util.concurrent';
  import { Map } from 'java.util';
  import { CefBrowser } from 'org.cef.browser';
  import { LogSeverity } from 'CefSettings';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { WrappedMCEFBrowser } from 'de.keksuccino.fancymenu.util.mcef';

  class MCEFVideoManager {
    static readonly EXECUTOR: ScheduledExecutorService;
    static initialized: boolean;
    createPlayer(): string;
    createPlayer(x: number, y: number, width: number, height: number): string;
    disposeAll(): void;
    static get instance(): MCEFVideoManager;
    static get pendingJsResults(): Map<string, CompletableFuture<string>>;
    getPlayer(playerId: string): MCEFVideoPlayer;
    initialize(): void;
    isVideoPlaybackAvailable(): boolean;
    onConsoleMessage(browser: CefBrowser, level: LogSeverity, message: string, source: string, line: number): boolean;
    removePlayer(playerId: string): void;
  }


  class MCEFVideoPlayer {
    constructor();

    constructor(x: number, y: number, width: number, height: number);
    dispose(): void;
    get browser(): WrappedMCEFBrowser;
    get currentTime(): number;
    get currentTimeMillis(): number;
    get detailedFormattedCurrentTime(): string;
    get detailedFormattedDuration(): string;
    get detailedFormattedTimeInfo(): string;
    get duration(): number;
    get durationMillis(): number;
    get formattedCurrentTime(): string;
    get formattedDuration(): string;
    get formattedTimeInfo(): string;
    get height(): number;
    get muted(): boolean;
    get progressPercentage(): number;
    get videoHeight(): number;
    get videoWidth(): number;
    get volume(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    initialize(): void;
    isFillScreen(): boolean;
    isLooping(): boolean;
    isPlaying(): boolean;
    loadVideo(videoPath: string): void;
    pause(): void;
    play(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): void;
    seekBackward(seconds: number): void;
    seekForward(seconds: number): void;
    set currentTime(seconds: number);
    set currentTimeMillis(milliseconds: number);
    set muted(muted: boolean);
    set volume(volume: number);
    setFillScreen(fillScreen: boolean): void;
    setLooping(looping: boolean): void;
    setOpacity(opacity: number): void;
    setPosition(x: number, y: number): void;
    setSize(width: number, height: number): void;
    stop(): void;
    toggleMuted(): void;
    togglePlayPause(): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AspectRatio } from 'de.keksuccino.fancymenu.util.rendering';
  import { Closeable, InputStream } from 'java.io';
  import { List } from 'java.util';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { ImageFileType, AudioFileType, VideoFileType, TextFileType } from 'de.keksuccino.fancymenu.util.file.type.types';
  import { IAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { IVideo } from 'de.keksuccino.fancymenu.util.resource.resources.video';
  import { IText } from 'de.keksuccino.fancymenu.util.resource.resources.text';
  import { Enum, Class } from 'java.lang';
  import { Style } from 'net.minecraft.network.chat';
  import { FileMediaType } from 'de.keksuccino.fancymenu.util.file.type';
  import { BiConsumer, Consumer } from 'java.util.function';

  interface PlayableResource extends Resource {}
  class PlayableResource extends Resource {
    isPaused(): boolean;
    isPlaying(): boolean;
    pause(): void;
    play(): void;
    stop(): void;
  }


  interface RenderableResource extends Resource {}
  class RenderableResource extends Resource {
    static readonly MISSING_TEXTURE_LOCATION: ResourceLocation;
    static readonly FULLY_TRANSPARENT_TEXTURE: ResourceLocation;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    reset(): void;
  }


  interface Resource extends Closeable {}
  class Resource extends Closeable {
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isReady(): boolean;
    open(): InputStream;
    waitForLoadingCompletedOrFailed(timeoutMs: number): void;
    waitForReady(timeoutMs: number): void;
  }


  class ResourceHandler<R extends Resource = any, F extends FileType<R> = any> {
    get(resourceSource: string): R;
    get(resourceSource: ResourceSource): R;
    get allowedFileTypes(): F[];
    get fallbackFileType(): F;
    getIfRegistered(key: string): R;
    hasResource(key: string): boolean;
    registerIfKeyAbsent(key: string, resource: R): void;
    release(key: string, isKeyResourceSource: boolean): void;
    release(resource: R): void;
    releaseAll(): void;
  }


  class ResourceHandlers {
    static findHandlerForSource(source: ResourceSource, doAdvancedWebChecks: boolean): ResourceHandler<any, any>;
    static get audioHandler(): ResourceHandler<IAudio, AudioFileType>;
    static get handlers(): ResourceHandler<any, any>[];
    static get imageHandler(): ResourceHandler<ITexture, ImageFileType>;
    static get textHandler(): ResourceHandler<IText, TextFileType>;
    static get videoHandler(): ResourceHandler<IVideo, VideoFileType>;
    static reloadAll(): void;
    static set audioHandler(audioHandler: ResourceHandler<IAudio, AudioFileType>);
    static set imageHandler(imageHandler: ResourceHandler<ITexture, ImageFileType>);
    static set textHandler(textHandler: ResourceHandler<IText, TextFileType>);
    static set videoHandler(videoHandler: ResourceHandler<IVideo, VideoFileType>);
  }


  class ResourceSource {
    get serializationSource(): string;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    isDotMinecraftSource(): boolean;
    static of(resourceSource: string, sourceType: ResourceSourceType): ResourceSource;
    static of(resourceSource: string): ResourceSource;
    toString(): string;
  }


  interface ResourceSourceType extends Enum<ResourceSourceType> {}
  class ResourceSourceType extends Enum<ResourceSourceType> {
    static readonly LOCATION: ResourceSourceType;
    static readonly LOCAL: ResourceSourceType;
    static readonly WEB: ResourceSourceType;
    get localizationKeyBase(): string;
    get name(): string;
    get sourcePrefix(): string;
    get valueComponentStyle(): Style;
    get values(): ResourceSourceType[];
    static getByName(name: string): ResourceSourceType;
    getByNameInternal(name: string): ResourceSourceType;
    static getSourceTypeOf(resourceSource: string): ResourceSourceType;
    static getWithoutSourcePrefix(resourceSource: string): string;
    static hasSourcePrefix(resourceSource: string): boolean;
    static valueOf(name: string): ResourceSourceType;
    static values(): ResourceSourceType[];
  }


  class ResourceSupplier<R extends Resource = any> {
    constructor(resourceType: Class<R>, mediaType: FileMediaType, source: string);
    static audio(source: string): ResourceSupplier<IAudio>;
    static empty<R extends Resource>(resourceType: Class<R>, mediaType: FileMediaType): ResourceSupplier<R>;
    forRenderable(task: BiConsumer<R, ResourceLocation>): void;
    get (): R;
    get mediaType(): FileMediaType;
    get resourceHandler(): ResourceHandler<any, any>;
    get resourceType(): Class<R>;
    get sourceType(): ResourceSourceType;
    get sourceWithPrefix(): string;
    get sourceWithoutPrefix(): string;
    static image(source: string): ResourceSupplier<ITexture>;
    isEmpty(): boolean;
    setOnUpdateResourceTask(oldResourceConsumer: Consumer<R>): ResourceSupplier<R>;
    setSource(source: string): void;
    static text(source: string): ResourceSupplier<IText>;
    static video(source: string): ResourceSupplier<IVideo>;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.preload' {
  import { CellScreen } from 'de.keksuccino.fancymenu.util.rendering.ui.screen';
  import { Consumer } from 'java.util.function';
  import { Boolean } from 'java.lang';
  import { List } from 'java.util';
  import { ResourceSource } from 'de.keksuccino.fancymenu.util.resource';

  interface ManageResourcePreLoadScreen extends CellScreen {}
  class ManageResourcePreLoadScreen extends CellScreen {
    constructor(callback: Consumer<boolean>);
  }


  class ResourcePreLoader {
    static readonly CUBIC_PANORAMA_SOURCE_PREFIX: string;
    static readonly SLIDESHOW_SOURCE_PREFIX: string;
    static addResourceSource(source: ResourceSource, serialized: string, syncToConfig: boolean): string;
    static buildSourceFromString(resourceSource: string): ResourceSource;
    static getRegisteredResourceSources(serialized: string): ResourceSource[];
    static isResourceSourceRegistered(source: ResourceSource, serialized: string): boolean;
    static preLoadAll(waitForCompletedMillis: number): void;
    static removeResourceSource(source: ResourceSource, serialized: string, syncToConfig: boolean): string;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.preload.ResourcePreLoader' {
  import { ResourceSource } from 'de.keksuccino.fancymenu.util.resource';

  interface CubicPanoramaSource extends ResourceSource {}
  class CubicPanoramaSource extends ResourceSource {
    get panoramaName(): string;
    get serializationSource(): string;
    get sourceWithPrefix(): string;
  }


  interface SlideshowSource extends ResourceSource {}
  class SlideshowSource extends ResourceSource {
    get serializationSource(): string;
    get slideshowName(): string;
    get sourceWithPrefix(): string;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.audio' {
  import { ResourceHandler, PlayableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { AudioFileType } from 'de.keksuccino.fancymenu.util.file.type.types';
  import { List } from 'java.util';
  import { SoundSource } from 'net.minecraft.sounds';

  class ALAudio {
    get aLSource(): number;
  }


  class AudioPlayTimeTracker {
    get currentPlayTime(): number;
    onPause(): void;
    onPlay(): void;
    onStop(): void;
    reset(): void;
  }


  interface AudioResourceHandler extends ResourceHandler<IAudio, AudioFileType> {}
  class AudioResourceHandler extends ResourceHandler<IAudio, AudioFileType> {
    static readonly INSTANCE: AudioResourceHandler;
    get allowedFileTypes(): AudioFileType[];
    get fallbackFileType(): AudioFileType;
  }


  interface IAudio extends PlayableResourceWithAudio {}
  class IAudio extends PlayableResourceWithAudio {
    get duration(): number;
    get playTime(): number;
    get soundChannel(): SoundSource;
    play(): void;
    set soundChannel(var1: SoundSource);
  }


  interface PlayableResourceWithAudio extends PlayableResource {}
  class PlayableResourceWithAudio extends PlayableResource {
    get volume(): number;
    set volume(var1: number);
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.audio.ogg' {
  import { IAudio, ALAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File, InputStream } from 'java.io';
  import { ALAudioClip } from 'de.keksuccino.melody.resources.audio.openal';
  import { SoundSource } from 'net.minecraft.sounds';

  interface OggAudio extends IAudio, ALAudio {}
  class OggAudio extends IAudio {
    close(): void;
    get aLSource(): number;
    get clip(): ALAudioClip;
    get duration(): number;
    get playTime(): number;
    get soundChannel(): SoundSource;
    get volume(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isReady(): boolean;
    isValidOpenAlSource(): boolean;
    static local(oggAudioFile: File): OggAudio;
    static local(oggAudioFile: File, writeTo: OggAudio): OggAudio;
    static location(location: ResourceLocation): OggAudio;
    static location(location: ResourceLocation, writeTo: OggAudio): OggAudio;
    static of(inParameter: InputStream, oggAudioName: string, writeTo: OggAudio, clip: ALAudioClip): OggAudio;
    static of(inParameter: InputStream): OggAudio;
    open(): InputStream;
    pause(): void;
    play(): void;
    set soundChannel(channel: SoundSource);
    set volume(volume: number);
    stop(): void;
    static web(oggAudioURL: string): OggAudio;
    static web(oggAudioURL: string, writeTo: OggAudio): OggAudio;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.audio.wav' {
  import { IAudio, ALAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File, InputStream } from 'java.io';
  import { ALAudioClip } from 'de.keksuccino.melody.resources.audio.openal';
  import { SoundSource } from 'net.minecraft.sounds';

  interface WavAudio extends IAudio, ALAudio {}
  class WavAudio extends IAudio {
    close(): void;
    get aLSource(): number;
    get clip(): ALAudioClip;
    get duration(): number;
    get playTime(): number;
    get soundChannel(): SoundSource;
    get volume(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isReady(): boolean;
    isValidOpenAlSource(): boolean;
    static local(wavAudioFile: File): WavAudio;
    static local(wavAudioFile: File, writeTo: WavAudio): WavAudio;
    static location(location: ResourceLocation): WavAudio;
    static location(location: ResourceLocation, writeTo: WavAudio): WavAudio;
    static of(inParameter: InputStream, wavAudioName: string, writeTo: WavAudio, clip: ALAudioClip): WavAudio;
    static of(inParameter: InputStream): WavAudio;
    open(): InputStream;
    pause(): void;
    play(): void;
    set soundChannel(channel: SoundSource);
    set volume(volume: number);
    stop(): void;
    static web(wavAudioURL: string): WavAudio;
    static web(wavAudioURL: string, writeTo: WavAudio): WavAudio;
  }


  class WavHeader {
    get bitsPerSample(): number;
    get channels(): number;
    get dataSize(): number;
    get durationInSeconds(): number;
    get sampleRate(): number;
    static read(inputStream: InputStream): WavHeader;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.text' {
  import { Resource, ResourceHandler } from 'de.keksuccino.fancymenu.util.resource';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File, InputStream } from 'java.io';
  import { TextFileType } from 'de.keksuccino.fancymenu.util.file.type.types';

  interface IText extends Resource {}
  class IText extends Resource {
    get textLines(): string[];
  }


  interface PlainText extends IText {}
  class PlainText extends IText {
    close(): void;
    get textLines(): string[];
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isReady(): boolean;
    static local(textFile: File): PlainText;
    static local(textFile: File, writeTo: PlainText): PlainText;
    static location(location: ResourceLocation): PlainText;
    static location(location: ResourceLocation, writeTo: PlainText): PlainText;
    static of(inParameter: InputStream): PlainText;
    static of(inParameter: InputStream, textSourceName: string, writeTo: PlainText): PlainText;
    open(): InputStream;
    static web(textFileUrl: string): PlainText;
    static web(textFileUrl: string, writeTo: PlainText): PlainText;
  }


  interface TextResourceHandler extends ResourceHandler<IText, TextFileType> {}
  class TextResourceHandler extends ResourceHandler<IText, TextFileType> {
    static readonly INSTANCE: TextResourceHandler;
    get allowedFileTypes(): TextFileType[];
    get fallbackFileType(): TextFileType;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture' {
  import { PlayableResource, ResourceHandler, RenderableResource, ResourceSupplier } from 'de.keksuccino.fancymenu.util.resource';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { File, InputStream } from 'java.io';
  import { AspectRatio } from 'de.keksuccino.fancymenu.util.rendering';
  import { DecodedApngImage, ApngFrame } from 'de.keksuccino.fancymenu.util.resource.resources.texture.ApngTexture';
  import { Argb8888BitmapSequence } from 'net.ellerton.japng.argb8888';
  import { Consumer } from 'java.util.function';
  import { DecodedGifImage, GifFrame } from 'de.keksuccino.fancymenu.util.resource.resources.texture.GifTexture';
  import { GifDecoder } from 'com.madgag.gif.fmsware';
  import { ImageFileType } from 'de.keksuccino.fancymenu.util.file.type.types';
  import { List } from 'java.util';
  import { NativeImage } from 'com.mojang.blaze3d.platform';

  interface ApngTexture extends ITexture, PlayableResource {}
  class ApngTexture extends ITexture {
    close(): void;
    static decodeApng(inParameter: InputStream, apngName: string): DecodedApngImage;
    static decodeApng(sequence: Argb8888BitmapSequence): DecodedApngImage;
    static deliverApngFrames(sequence: Argb8888BitmapSequence, apngName: string, includeFirstFrame: boolean, frameDelivery: Consumer<ApngFrame>): void;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isReady(): boolean;
    static local(apngFile: File): ApngTexture;
    static local(apngFile: File, writeTo: ApngTexture): ApngTexture;
    static location(location: ResourceLocation): ApngTexture;
    static location(location: ResourceLocation, writeTo: ApngTexture): ApngTexture;
    static of(inParameter: InputStream, apngTextureName: string, writeTo: ApngTexture): ApngTexture;
    static of(inParameter: InputStream): ApngTexture;
    open(): InputStream;
    pause(): void;
    play(): void;
    reset(): void;
    stop(): void;
    static web(apngUrl: string): ApngTexture;
    static web(apngUrl: string, writeTo: ApngTexture): ApngTexture;
  }


  interface GifTexture extends ITexture, PlayableResource {}
  class GifTexture extends ITexture {
    close(): void;
    static decodeGif(inParameter: InputStream, gifName: string): DecodedGifImage;
    static deliverGifFrames(decoder: GifDecoder, gifName: string, frameDelivery: Consumer<GifFrame>): void;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isReady(): boolean;
    static local(apngFile: File): GifTexture;
    static local(gifFile: File, writeTo: GifTexture): GifTexture;
    static location(location: ResourceLocation): GifTexture;
    static location(location: ResourceLocation, writeTo: GifTexture): GifTexture;
    static of(inParameter: InputStream, gifTextureName: string, writeTo: GifTexture): GifTexture;
    static of(inParameter: InputStream): GifTexture;
    open(): InputStream;
    pause(): void;
    play(): void;
    reset(): void;
    stop(): void;
    static web(apngUrl: string): GifTexture;
    static web(gifUrl: string, writeTo: GifTexture): GifTexture;
  }


  interface ImageResourceHandler extends ResourceHandler<ITexture, ImageFileType> {}
  class ImageResourceHandler extends ResourceHandler<ITexture, ImageFileType> {
    static readonly INSTANCE: ImageResourceHandler;
    get allowedFileTypes(): ImageFileType[];
    get fallbackFileType(): ImageFileType;
  }


  interface ITexture extends RenderableResource {}
  class ITexture extends RenderableResource {
  }


  interface JpegTexture extends ITexture {}
  class JpegTexture extends ITexture {
    close(): void;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isReady(): boolean;
    static local(textureFile: File): JpegTexture;
    static local(textureFile: File, writeTo: JpegTexture): JpegTexture;
    static location(location: ResourceLocation): JpegTexture;
    static location(location: ResourceLocation, writeTo: JpegTexture): JpegTexture;
    static of(inParameter: InputStream, textureName: string, writeTo: JpegTexture): JpegTexture;
    static of(inParameter: InputStream): JpegTexture;
    static of(nativeImage: NativeImage): JpegTexture;
    open(): InputStream;
    reset(): void;
    static web(textureURL: string): JpegTexture;
    static web(textureURL: string, writeTo: JpegTexture): JpegTexture;
  }


  interface PngTexture extends ITexture {}
  class PngTexture extends ITexture {
    static readonly FULLY_TRANSPARENT_PNG_TEXTURE_SUPPLIER: ResourceSupplier;
    close(): void;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isReady(): boolean;
    static local(textureFile: File): PngTexture;
    static local(textureFile: File, writeTo: PngTexture): PngTexture;
    static location(location: ResourceLocation): PngTexture;
    static location(location: ResourceLocation, writeTo: PngTexture): PngTexture;
    static of(inParameter: InputStream, textureName: string, writeTo: PngTexture): PngTexture;
    static of(inParameter: InputStream): PngTexture;
    static of(nativeImage: NativeImage): PngTexture;
    open(): InputStream;
    reset(): void;
    static web(textureURL: string): PngTexture;
    static web(textureURL: string, writeTo: PngTexture): PngTexture;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture.ApngTexture' {
  class ApngFrame {
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture.fma' {
  import { Closeable, InputStream, File } from 'java.io';
  import { FmaMetadata } from 'de.keksuccino.fancymenu.util.resource.resources.texture.fma.FmaDecoder';
  import { BufferedImage } from 'java.awt.image';
  import { ITexture } from 'de.keksuccino.fancymenu.util.resource.resources.texture';
  import { PlayableResource } from 'de.keksuccino.fancymenu.util.resource';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AspectRatio } from 'de.keksuccino.fancymenu.util.rendering';
  import { DecodedFmaImage, FmaFrame } from 'de.keksuccino.fancymenu.util.resource.resources.texture.fma.FmaTexture';
  import { Consumer } from 'java.util.function';

  interface FmaDecoder extends Closeable {}
  class FmaDecoder extends Closeable {
    close(): void;
    get backgroundImage(): InputStream;
    get firstFrame(): InputStream;
    get firstFrameAsBufferedImage(): BufferedImage;
    get frameCount(): number;
    get introFrameCount(): number;
    get metadata(): FmaMetadata;
    getFrame(index: number): InputStream;
    getIntroFrame(index: number): InputStream;
    hasIntroFrames(): boolean;
    read(inParameter: InputStream): void;
    read(fmaFile: File): void;
  }


  interface FmaTexture extends ITexture, PlayableResource {}
  class FmaTexture extends ITexture {
    close(): void;
    static decodeFma(inParameter: InputStream, fmaName: string): DecodedFmaImage;
    static deliverFmaFrames(decoder: FmaDecoder, fmaName: string, frameDelivery: Consumer<FmaFrame>): void;
    static deliverFmaIntroFrames(decoder: FmaDecoder, fmaName: string, frameDelivery: Consumer<FmaFrame>): void;
    get aspectRatio(): AspectRatio;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    isClosed(): boolean;
    isLoadingCompleted(): boolean;
    isLoadingFailed(): boolean;
    isPaused(): boolean;
    isPlaying(): boolean;
    isReady(): boolean;
    static local(fmaFile: File): FmaTexture;
    static local(fmaFile: File, writeTo: FmaTexture): FmaTexture;
    static location(location: ResourceLocation): FmaTexture;
    static location(location: ResourceLocation, writeTo: FmaTexture): FmaTexture;
    static of(inParameter: InputStream, gifTextureName: string, writeTo: FmaTexture): FmaTexture;
    static of(inParameter: InputStream): FmaTexture;
    open(): InputStream;
    pause(): void;
    play(): void;
    reset(): void;
    stop(): void;
    static web(fmaUrl: string): FmaTexture;
    static web(fmaUrl: string, writeTo: FmaTexture): FmaTexture;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture.fma.FmaDecoder' {
  import { Map } from 'java.util';
  import { Integer, Long } from 'java.lang';

  class FmaMetadata {
    get customFrameTimes(): Map<number, Long>;
    get customFrameTimesIntro(): Map<number, Long>;
    get frameTime(): number;
    get frameTimeIntro(): number;
    get loopCount(): number;
    getFrameTimeForFrame(frame: number, isIntroFrame: boolean): number;
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture.fma.FmaTexture' {
  class FmaFrame {
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.texture.GifTexture' {
  class GifFrame {
  }

}

declare module 'de.keksuccino.fancymenu.util.resource.resources.video' {
  import { RenderableResource, ResourceHandler } from 'de.keksuccino.fancymenu.util.resource';
  import { PlayableResourceWithAudio } from 'de.keksuccino.fancymenu.util.resource.resources.audio';
  import { VideoFileType } from 'de.keksuccino.fancymenu.util.file.type.types';
  import { List } from 'java.util';

  interface IVideo extends RenderableResource, PlayableResourceWithAudio {}
  class IVideo extends RenderableResource {
  }


  interface VideoResourceHandler extends ResourceHandler<IVideo, VideoFileType> {}
  class VideoResourceHandler extends ResourceHandler<IVideo, VideoFileType> {
    static readonly INSTANCE: VideoResourceHandler;
    get allowedFileTypes(): VideoFileType[];
    get fallbackFileType(): VideoFileType;
  }

}

declare module 'de.keksuccino.fancymenu.util.TaskExecutor' {
  import { ScheduledFuture } from 'java.util.concurrent';

  class Task {
    run(var1: ScheduledFuture<any>): void;
  }

}

declare module 'de.keksuccino.fancymenu.util.terminal' {
  class PowerShellUtils {
    static locatePowerShell(): string;
  }

}

declare module 'de.keksuccino.fancymenu.util.threading' {
  import { Runnable } from 'java.lang';
  import { ExecuteTiming } from 'de.keksuccino.fancymenu.util.threading.MainThreadTaskExecutor';
  import { List } from 'java.util';

  class MainThreadTaskExecutor {
    static executeInMainThread(task: Runnable, when: ExecuteTiming): void;
    static getAndClearQueue(executeTiming: ExecuteTiming): Runnable[];
  }

}

declare module 'de.keksuccino.fancymenu.util.threading.MainThreadTaskExecutor' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ExecuteTiming extends Enum<ExecuteTiming> {}
  class ExecuteTiming extends Enum<ExecuteTiming> {
    static readonly PRE_CLIENT_TICK: ExecuteTiming;
    static readonly POST_CLIENT_TICK: ExecuteTiming;
    static valueOf(name: string): ExecuteTiming;
    static values(): ExecuteTiming[];
  }

}

declare module 'de.keksuccino.fancymenu.util.window' {
  import { File } from 'java.io';

  class WindowHandler {
    static allCustomWindowIconsSetAndFound(): boolean;
    static get customWindowIcon16(): File;
    static get customWindowIcon32(): File;
    static get customWindowIconMacOS(): File;
    static get customWindowTitle(): string;
    static handleForceFullscreen(): void;
    static isCustomWindowIconEnabled(): boolean;
    static resetWindowIcon(): void;
    static updateCustomWindowIcon(): void;
    static updateWindowTitle(): void;
  }

}