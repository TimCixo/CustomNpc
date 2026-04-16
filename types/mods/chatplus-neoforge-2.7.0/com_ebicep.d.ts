declare module 'com.ebicep.chatplus' {
  import { Logger } from 'org.apache.logging.log4j';
  import { Component } from 'net.minecraft.network.chat';

  class ChatPlus {
    static readonly INSTANCE: ChatPlus;
    doTest(): void;
    get initialized(): boolean;
    get lOGGER(): Logger;
    init(): void;
    isEnabled(): boolean;
    sendMessage(component: Component): void;
    set initialized(bl: boolean);
  }


  class ChatPlusKt {
    static readonly MOD_ID: string;
    static readonly MOD_COLOR: number;
  }


  class ChatPlusPlatformInit {
    static readonly INSTANCE: ChatPlusPlatformInit;
    static platformInit(): void;
  }


  class IChatScreen {
    get chatPlusWidth(): number;
    set chatPlusWidth(var1: number);
  }

}

declare module 'com.ebicep.chatplus.config' {
  import { Path } from 'java.nio.file';
  import { Json } from 'kotlinx.serialization.json';
  import { Companion } from 'com.ebicep.chatplus.config.ConfigVariables';
  import { TimestampSettings } from 'TimestampMessages';
  import { InputOverFlowAutoFillSettings } from 'InputOverFlowAutoFill';
  import { MessageImagePreviewSettings } from 'MessageImagePreview';
  import { KeyWithModifier } from 'com.ebicep.chatplus.config.serializers';
  import { CompactComparatorMode, CompactMessageCustomSettings } from 'CompactMessages';
  import { Key } from 'InputConstants';
  import { TabNotificationSettings } from 'com.ebicep.chatplus.features.chattabs';
  import { InputBoxSettings } from 'MovableChat';
  import { NoteClickMode, NoteSelectMode } from 'SendNote';
  import { List } from 'java.util';
  import { Filter } from 'FilterMessages';
  import { HighlightMode } from 'HoverHighlight';
  import { MessageFilterFormatted, MessageFilter } from 'com.ebicep.chatplus.features.internal';
  import { FindMode } from 'FindMessage';
  import { F3DMode } from 'DeleteMessages';
  import { ScreenshotUploadSettings, ScreenshotMode, ScreenshotBackgroundMode, ScreenshotWindowsMode } from 'ScreenshotChat';
  import { SpeechToTextReplace } from 'MicrophoneThread';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { ChatWindow } from 'com.ebicep.chatplus.features.chatwindows';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { KSerializer } from 'kotlinx.serialization';
  import { Component } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { Companion as com_ebicep_chatplus_config_jumptomessagemode_Companion } from 'com.ebicep.chatplus.config.JumpToMessageMode';
  import { EnumEntries } from 'kotlin.enums';
  import { Companion as com_ebicep_chatplus_config_messagedirection_Companion } from 'com.ebicep.chatplus.config.MessageDirection';
  import { Companion as com_ebicep_chatplus_config_soundwrapper_Companion } from 'com.ebicep.chatplus.config.SoundWrapper';
  import { SoundSource } from 'net.minecraft.sounds';

  class Config {
    static readonly INSTANCE: Config;
    get loaded(): boolean;
    get values(): ConfigVariables;
    load(): void;
    save(): void;
    set loaded(bl: boolean);
    set values(configVariables: ConfigVariables);
  }


  class ConfigDirectory {
    static readonly INSTANCE: ConfigDirectory;
    static get configDirectory(): Path;
  }


  class ConfigKt {
    static readonly CONFIG_VERSION: string;
    static readonly CONFIG_NAME: string;
    static get configDirectoryPath(): string;
    static get json(): Json;
    static get queueUpdateConfig(): boolean;
    static set queueUpdateConfig(bl: boolean);
  }


  class ConfigVariables {
    static readonly Companion: Companion;
    constructor(globalizedConfig: boolean, enabled: boolean, addMessagesIfDisabled: boolean, showVanillaWhenUnfocused: boolean, vanillaInputBox: boolean, saveInputBoxMessage: boolean, wrappedMessageLineIndent: number, maxMessages: number, maxCommandSuggestions: number, jumpToMessageMode: JumpToMessageMode, selectChatLinePriority: number, selectChatColor: number, timestampSettings: TimestampSettings, inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings, messageImagePreviewSettings: MessageImagePreviewSettings, hideChatEnabled: boolean, hideChatShowWhenFocused: boolean, hideChatShowHiddenOnScreen: boolean, hideChatToggleKey: KeyWithModifier, alwaysShowChat: boolean, alwaysShowChatToggleKey: KeyWithModifier, compactMessagesEnabled: boolean, compactMessagesFormat: string, compactMessagesSendAsNew: boolean, compactMessagesDeleteDuplicate: boolean, compactMessagesRefreshAddedTime: boolean, compactMessagesSearchAmount: number, compactMessageComparatorMode: CompactComparatorMode, compactMessageSettings: CompactMessageCustomSettings, keyNoScroll: Key, keyFineScroll: Key, keyLargeScroll: Key, invertedScrolling: boolean, scrollbarEnabled: boolean, scrollbarColor: number, scrollbarWidth: number, keyPeekChat: Key, peekChatScrollingEnabled: boolean, animationEnabled: boolean, animationDisableOnFocus: boolean, animationNewMessageTransitionTime: number, tabEditorScreen: boolean, windowEditorScreen: boolean, scrollCycleTabEnabled: boolean, arrowCycleTabEnabled: boolean, moveToTabWhenCycling: boolean, inputBoxAutoAdjustChatWindowEnabled: boolean, tabNotificationSettings: TabNotificationSettings, movableChatEnabled: boolean, movableChatShowEnabledOnScreen: boolean, movableChatKey: KeyWithModifier, movableChatColor: number, movableChatSelectedColor: number, movableChatToggleTextBarElement: boolean, inputBoxSettings: InputBoxSettings, sendNoteEnabled: boolean, sendNoteKey: KeyWithModifier, sendNoteClickMode: NoteClickMode, sendNoteSelectMode: NoteSelectMode, sendNoteSelectKey: Key, sendNoteSelectModeKey: NoteSelectMode, sendNoteTextBarElementEnabled: boolean, filterMessagesEnabled: boolean, filterMessagesLinePriority: number, filterMessagesPatterns: Filter[], hoverHighlightEnabled: boolean, hoverHighlightLinePriority: number, hoverHighlightMode: HighlightMode, hoverHighlightColor: number, bookmarkEnabled: boolean, bookmarkLinePriority: number, bookmarkColor: number, bookmarkKey: KeyWithModifier, bookmarkTextBarElementEnabled: boolean, bookmarkTextBarElementKey: KeyWithModifier, autoBookMarkPatterns: MessageFilterFormatted[], findMessageEnabled: boolean, findMessageHighlightInputBox: boolean, findMessageHighlightMatchedText: boolean, findMessageIgnoreCase: boolean, findMessageLinePriority: number, findMessageKey: KeyWithModifier, findMessageDefaultMode: FindMode, findMessageTextBarElementEnabled: boolean, copyMessageKey: KeyWithModifier, copyMessageLinePriority: number, copyWholeMessage: boolean, copyNoFormatting: boolean, copyMessageFormattingSymbolOverride: string, copyMessageSeparator: string, deleteMessageEnabled: boolean, deleteMessageKey: KeyWithModifier, deleteMessageF3DMode: F3DMode, screenshotChatEnabled: boolean, screenshotChatScale: number, screenshotChatCopyToClipboard: boolean, screenshotChatSaveToFile: boolean, screenshotChatAutoUpload: boolean, screenshotChatAutoUploadSettings: ScreenshotUploadSettings, screenshotChatLinePriority: number, screenshotChatKey: KeyWithModifier, screenshotDefaultScreenShotMode: ScreenshotMode, screenshotDefaultScreenBackgroundMode: ScreenshotBackgroundMode, screenshotDefaultScreenShotWindowsMode: ScreenshotWindowsMode, screenshotChatTextBarElementEnabled: boolean, playerHeadChatDisplayEnabled: boolean, playerHeadChatDisplayShowOnWrapped: boolean, playerHeadChatDisplayOffsetNonHeadMessages: boolean, playerHeadChatDisplayOffsetNonHeadMessagesShowOnWrapped: boolean, translatorEnabled: boolean, translatorTextBarElementEnabled: boolean, translatorRegexes: MessageFilter[], translateTo: string, translateSelf: string, translateSpeak: string, translateKeepOnAfterChatClose: boolean, translateKey: KeyWithModifier, translateToggleKey: KeyWithModifier, translateClickEnabled: boolean, speechToTextEnabled: boolean, speechToTextToInputBox: boolean, speechToTextCharset: string, speechToTextMicrophoneKey: Key, speechToTextQuickSendKey: Key, speechToTextTranslateEnabled: boolean, speechToTextTranslateToInputBox: boolean, speechToTextTranslateLang: string, speechToTextAutoReplacePlayers: boolean, speechToTextAutoReplacePlayersMaxSearchDepth: number, speechToTextReplace: SpeechToTextReplace[]);

    constructor(bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, bl5: boolean, bl6: boolean, n: number, n2: number, n3: number, jumpToMessageMode: JumpToMessageMode, n4: number, n5: number, timestampSettings: TimestampSettings, inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings, messageImagePreviewSettings: MessageImagePreviewSettings, bl7: boolean, bl8: boolean, bl9: boolean, keyWithModifier: KeyWithModifier, bl10: boolean, keyWithModifier2: KeyWithModifier, bl11: boolean, string: string, bl12: boolean, bl13: boolean, bl14: boolean, n6: number, compactComparatorMode: CompactComparatorMode, compactMessageCustomSettings: CompactMessageCustomSettings, key: Key, key2: Key, key3: Key, bl15: boolean, bl16: boolean, n7: number, n8: number, key4: Key, bl17: boolean, bl18: boolean, bl19: boolean, n9: number, bl20: boolean, bl21: boolean, bl22: boolean, bl23: boolean, bl24: boolean, bl25: boolean, tabNotificationSettings: TabNotificationSettings, bl26: boolean, bl27: boolean, keyWithModifier3: KeyWithModifier, n10: number, n11: number, bl28: boolean, inputBoxSettings: InputBoxSettings, bl29: boolean, keyWithModifier4: KeyWithModifier, noteClickMode: NoteClickMode, noteSelectMode: NoteSelectMode, key5: Key, noteSelectMode2: NoteSelectMode, bl30: boolean, bl31: boolean, n12: number, list: List, bl32: boolean, n13: number, highlightMode: HighlightMode, n14: number, bl33: boolean, n15: number, n16: number, keyWithModifier5: KeyWithModifier, bl34: boolean, keyWithModifier6: KeyWithModifier, list2: List, bl35: boolean, bl36: boolean, bl37: boolean, bl38: boolean, n17: number, keyWithModifier7: KeyWithModifier, findMode: FindMode, bl39: boolean, keyWithModifier8: KeyWithModifier, n18: number, bl40: boolean, bl41: boolean, string2: string, string3: string, bl42: boolean, keyWithModifier9: KeyWithModifier, f3DMode: F3DMode, bl43: boolean, f: number, bl44: boolean, bl45: boolean, bl46: boolean, screenshotUploadSettings: ScreenshotUploadSettings, n19: number, keyWithModifier10: KeyWithModifier, screenshotMode: ScreenshotMode, screenshotBackgroundMode: ScreenshotBackgroundMode, screenshotWindowsMode: ScreenshotWindowsMode, bl47: boolean, bl48: boolean, bl49: boolean, bl50: boolean, bl51: boolean, bl52: boolean, bl53: boolean, list3: List, string4: string, string5: string, string6: string, bl54: boolean, keyWithModifier11: KeyWithModifier, keyWithModifier12: KeyWithModifier, bl55: boolean, bl56: boolean, bl57: boolean, string7: string, key6: Key, key7: Key, bl58: boolean, bl59: boolean, string8: string, bl60: boolean, n20: number, list4: List, n21: number, n22: number, n23: number, n24: number, n25: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, seen1: number, seen2: number, seen3: number, seen4: number, globalizedConfig: boolean, enabled: boolean, addMessagesIfDisabled: boolean, showVanillaWhenUnfocused: boolean, vanillaInputBox: boolean, saveInputBoxMessage: boolean, wrappedMessageLineIndent: number, maxMessages: number, maxCommandSuggestions: number, jumpToMessageMode: JumpToMessageMode, selectChatLinePriority: number, selectChatColor: number, timestampSettings: TimestampSettings, inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings, messageImagePreviewSettings: MessageImagePreviewSettings, hideChatEnabled: boolean, hideChatShowWhenFocused: boolean, hideChatShowHiddenOnScreen: boolean, hideChatToggleKey: KeyWithModifier, alwaysShowChat: boolean, alwaysShowChatToggleKey: KeyWithModifier, compactMessagesEnabled: boolean, compactMessagesFormat: string, compactMessagesSendAsNew: boolean, compactMessagesDeleteDuplicate: boolean, compactMessagesRefreshAddedTime: boolean, compactMessagesSearchAmount: number, compactMessageComparatorMode: CompactComparatorMode, compactMessageSettings: CompactMessageCustomSettings, keyNoScroll: Key, keyFineScroll: Key, keyLargeScroll: Key, invertedScrolling: boolean, scrollbarEnabled: boolean, scrollbarColor: number, scrollbarWidth: number, keyPeekChat: Key, peekChatScrollingEnabled: boolean, animationEnabled: boolean, animationDisableOnFocus: boolean, animationNewMessageTransitionTime: number, tabEditorScreen: boolean, windowEditorScreen: boolean, scrollCycleTabEnabled: boolean, arrowCycleTabEnabled: boolean, moveToTabWhenCycling: boolean, inputBoxAutoAdjustChatWindowEnabled: boolean, tabNotificationSettings: TabNotificationSettings, movableChatEnabled: boolean, movableChatShowEnabledOnScreen: boolean, movableChatKey: KeyWithModifier, movableChatColor: number, movableChatSelectedColor: number, movableChatToggleTextBarElement: boolean, inputBoxSettings: InputBoxSettings, sendNoteEnabled: boolean, sendNoteKey: KeyWithModifier, sendNoteClickMode: NoteClickMode, sendNoteSelectMode: NoteSelectMode, sendNoteSelectKey: Key, sendNoteSelectModeKey: NoteSelectMode, sendNoteTextBarElementEnabled: boolean, filterMessagesEnabled: boolean, filterMessagesLinePriority: number, filterMessagesPatterns: List, hoverHighlightEnabled: boolean, hoverHighlightLinePriority: number, hoverHighlightMode: HighlightMode, hoverHighlightColor: number, bookmarkEnabled: boolean, bookmarkLinePriority: number, bookmarkColor: number, bookmarkKey: KeyWithModifier, bookmarkTextBarElementEnabled: boolean, bookmarkTextBarElementKey: KeyWithModifier, autoBookMarkPatterns: List, findMessageEnabled: boolean, findMessageHighlightInputBox: boolean, findMessageHighlightMatchedText: boolean, findMessageIgnoreCase: boolean, findMessageLinePriority: number, findMessageKey: KeyWithModifier, findMessageDefaultMode: FindMode, findMessageTextBarElementEnabled: boolean, copyMessageKey: KeyWithModifier, copyMessageLinePriority: number, copyWholeMessage: boolean, copyNoFormatting: boolean, copyMessageFormattingSymbolOverride: string, copyMessageSeparator: string, deleteMessageEnabled: boolean, deleteMessageKey: KeyWithModifier, deleteMessageF3DMode: F3DMode, screenshotChatEnabled: boolean, screenshotChatScale: number, screenshotChatCopyToClipboard: boolean, screenshotChatSaveToFile: boolean, screenshotChatAutoUpload: boolean, screenshotChatAutoUploadSettings: ScreenshotUploadSettings, screenshotChatLinePriority: number, screenshotChatKey: KeyWithModifier, screenshotDefaultScreenShotMode: ScreenshotMode, screenshotDefaultScreenBackgroundMode: ScreenshotBackgroundMode, screenshotDefaultScreenShotWindowsMode: ScreenshotWindowsMode, screenshotChatTextBarElementEnabled: boolean, playerHeadChatDisplayEnabled: boolean, playerHeadChatDisplayShowOnWrapped: boolean, playerHeadChatDisplayOffsetNonHeadMessages: boolean, playerHeadChatDisplayOffsetNonHeadMessagesShowOnWrapped: boolean, translatorEnabled: boolean, translatorTextBarElementEnabled: boolean, translatorRegexes: List, translateTo: string, translateSelf: string, translateSpeak: string, translateKeepOnAfterChatClose: boolean, translateKey: KeyWithModifier, translateToggleKey: KeyWithModifier, translateClickEnabled: boolean, speechToTextEnabled: boolean, speechToTextToInputBox: boolean, speechToTextCharset: string, speechToTextMicrophoneKey: Key, speechToTextQuickSendKey: Key, speechToTextTranslateEnabled: boolean, speechToTextTranslateToInputBox: boolean, speechToTextTranslateLang: string, speechToTextAutoReplacePlayers: boolean, speechToTextAutoReplacePlayersMaxSearchDepth: number, speechToTextReplace: List, chatWindows: List, speechToTextSampleRate: number, speechToTextMicrophone: string, speechToTextSelectedAudioModel: string, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    component1(): boolean;
    component10(): JumpToMessageMode;
    component100(): number;
    component101(): KeyWithModifier;
    component102(): ScreenshotMode;
    component103(): ScreenshotBackgroundMode;
    component104(): ScreenshotWindowsMode;
    component105(): boolean;
    component106(): boolean;
    component107(): boolean;
    component108(): boolean;
    component109(): boolean;
    component11(): number;
    component110(): boolean;
    component111(): boolean;
    component112(): MessageFilter[];
    component113(): string;
    component114(): string;
    component115(): string;
    component116(): boolean;
    component117(): KeyWithModifier;
    component118(): KeyWithModifier;
    component119(): boolean;
    component12(): number;
    component120(): boolean;
    component121(): boolean;
    component122(): string;
    component123(): Key;
    component124(): Key;
    component125(): boolean;
    component126(): boolean;
    component127(): string;
    component128(): boolean;
    component129(): number;
    component13(): TimestampSettings;
    component130(): SpeechToTextReplace[];
    component14(): InputOverFlowAutoFillSettings;
    component15(): MessageImagePreviewSettings;
    component16(): boolean;
    component17(): boolean;
    component18(): boolean;
    component19(): KeyWithModifier;
    component2(): boolean;
    component20(): boolean;
    component21(): KeyWithModifier;
    component22(): boolean;
    component23(): string;
    component24(): boolean;
    component25(): boolean;
    component26(): boolean;
    component27(): number;
    component28(): CompactComparatorMode;
    component29(): CompactMessageCustomSettings;
    component3(): boolean;
    component30(): Key;
    component31(): Key;
    component32(): Key;
    component33(): boolean;
    component34(): boolean;
    component35(): number;
    component36(): number;
    component37(): Key;
    component38(): boolean;
    component39(): boolean;
    component4(): boolean;
    component40(): boolean;
    component41(): number;
    component42(): boolean;
    component43(): boolean;
    component44(): boolean;
    component45(): boolean;
    component46(): boolean;
    component47(): boolean;
    component48(): TabNotificationSettings;
    component49(): boolean;
    component5(): boolean;
    component50(): boolean;
    component51(): KeyWithModifier;
    component52(): number;
    component53(): number;
    component54(): boolean;
    component55(): InputBoxSettings;
    component56(): boolean;
    component57(): KeyWithModifier;
    component58(): NoteClickMode;
    component59(): NoteSelectMode;
    component6(): boolean;
    component60(): Key;
    component61(): NoteSelectMode;
    component62(): boolean;
    component63(): boolean;
    component64(): number;
    component65(): Filter[];
    component66(): boolean;
    component67(): number;
    component68(): HighlightMode;
    component69(): number;
    component7(): number;
    component70(): boolean;
    component71(): number;
    component72(): number;
    component73(): KeyWithModifier;
    component74(): boolean;
    component75(): KeyWithModifier;
    component76(): MessageFilterFormatted[];
    component77(): boolean;
    component78(): boolean;
    component79(): boolean;
    component8(): number;
    component80(): boolean;
    component81(): number;
    component82(): KeyWithModifier;
    component83(): FindMode;
    component84(): boolean;
    component85(): KeyWithModifier;
    component86(): number;
    component87(): boolean;
    component88(): boolean;
    component89(): string;
    component9(): number;
    component90(): string;
    component91(): boolean;
    component92(): KeyWithModifier;
    component93(): F3DMode;
    component94(): boolean;
    component95(): number;
    component96(): boolean;
    component97(): boolean;
    component98(): boolean;
    component99(): ScreenshotUploadSettings;
    copy(globalizedConfig: boolean, enabled: boolean, addMessagesIfDisabled: boolean, showVanillaWhenUnfocused: boolean, vanillaInputBox: boolean, saveInputBoxMessage: boolean, wrappedMessageLineIndent: number, maxMessages: number, maxCommandSuggestions: number, jumpToMessageMode: JumpToMessageMode, selectChatLinePriority: number, selectChatColor: number, timestampSettings: TimestampSettings, inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings, messageImagePreviewSettings: MessageImagePreviewSettings, hideChatEnabled: boolean, hideChatShowWhenFocused: boolean, hideChatShowHiddenOnScreen: boolean, hideChatToggleKey: KeyWithModifier, alwaysShowChat: boolean, alwaysShowChatToggleKey: KeyWithModifier, compactMessagesEnabled: boolean, compactMessagesFormat: string, compactMessagesSendAsNew: boolean, compactMessagesDeleteDuplicate: boolean, compactMessagesRefreshAddedTime: boolean, compactMessagesSearchAmount: number, compactMessageComparatorMode: CompactComparatorMode, compactMessageSettings: CompactMessageCustomSettings, keyNoScroll: Key, keyFineScroll: Key, keyLargeScroll: Key, invertedScrolling: boolean, scrollbarEnabled: boolean, scrollbarColor: number, scrollbarWidth: number, keyPeekChat: Key, peekChatScrollingEnabled: boolean, animationEnabled: boolean, animationDisableOnFocus: boolean, animationNewMessageTransitionTime: number, tabEditorScreen: boolean, windowEditorScreen: boolean, scrollCycleTabEnabled: boolean, arrowCycleTabEnabled: boolean, moveToTabWhenCycling: boolean, inputBoxAutoAdjustChatWindowEnabled: boolean, tabNotificationSettings: TabNotificationSettings, movableChatEnabled: boolean, movableChatShowEnabledOnScreen: boolean, movableChatKey: KeyWithModifier, movableChatColor: number, movableChatSelectedColor: number, movableChatToggleTextBarElement: boolean, inputBoxSettings: InputBoxSettings, sendNoteEnabled: boolean, sendNoteKey: KeyWithModifier, sendNoteClickMode: NoteClickMode, sendNoteSelectMode: NoteSelectMode, sendNoteSelectKey: Key, sendNoteSelectModeKey: NoteSelectMode, sendNoteTextBarElementEnabled: boolean, filterMessagesEnabled: boolean, filterMessagesLinePriority: number, filterMessagesPatterns: Filter[], hoverHighlightEnabled: boolean, hoverHighlightLinePriority: number, hoverHighlightMode: HighlightMode, hoverHighlightColor: number, bookmarkEnabled: boolean, bookmarkLinePriority: number, bookmarkColor: number, bookmarkKey: KeyWithModifier, bookmarkTextBarElementEnabled: boolean, bookmarkTextBarElementKey: KeyWithModifier, autoBookMarkPatterns: MessageFilterFormatted[], findMessageEnabled: boolean, findMessageHighlightInputBox: boolean, findMessageHighlightMatchedText: boolean, findMessageIgnoreCase: boolean, findMessageLinePriority: number, findMessageKey: KeyWithModifier, findMessageDefaultMode: FindMode, findMessageTextBarElementEnabled: boolean, copyMessageKey: KeyWithModifier, copyMessageLinePriority: number, copyWholeMessage: boolean, copyNoFormatting: boolean, copyMessageFormattingSymbolOverride: string, copyMessageSeparator: string, deleteMessageEnabled: boolean, deleteMessageKey: KeyWithModifier, deleteMessageF3DMode: F3DMode, screenshotChatEnabled: boolean, screenshotChatScale: number, screenshotChatCopyToClipboard: boolean, screenshotChatSaveToFile: boolean, screenshotChatAutoUpload: boolean, screenshotChatAutoUploadSettings: ScreenshotUploadSettings, screenshotChatLinePriority: number, screenshotChatKey: KeyWithModifier, screenshotDefaultScreenShotMode: ScreenshotMode, screenshotDefaultScreenBackgroundMode: ScreenshotBackgroundMode, screenshotDefaultScreenShotWindowsMode: ScreenshotWindowsMode, screenshotChatTextBarElementEnabled: boolean, playerHeadChatDisplayEnabled: boolean, playerHeadChatDisplayShowOnWrapped: boolean, playerHeadChatDisplayOffsetNonHeadMessages: boolean, playerHeadChatDisplayOffsetNonHeadMessagesShowOnWrapped: boolean, translatorEnabled: boolean, translatorTextBarElementEnabled: boolean, translatorRegexes: MessageFilter[], translateTo: string, translateSelf: string, translateSpeak: string, translateKeepOnAfterChatClose: boolean, translateKey: KeyWithModifier, translateToggleKey: KeyWithModifier, translateClickEnabled: boolean, speechToTextEnabled: boolean, speechToTextToInputBox: boolean, speechToTextCharset: string, speechToTextMicrophoneKey: Key, speechToTextQuickSendKey: Key, speechToTextTranslateEnabled: boolean, speechToTextTranslateToInputBox: boolean, speechToTextTranslateLang: string, speechToTextAutoReplacePlayers: boolean, speechToTextAutoReplacePlayersMaxSearchDepth: number, speechToTextReplace: SpeechToTextReplace[]): ConfigVariables;
    static copy$default(configVariables: ConfigVariables, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, bl5: boolean, bl6: boolean, n: number, n2: number, n3: number, jumpToMessageMode: JumpToMessageMode, n4: number, n5: number, timestampSettings: TimestampSettings, inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings, messageImagePreviewSettings: MessageImagePreviewSettings, bl7: boolean, bl8: boolean, bl9: boolean, keyWithModifier: KeyWithModifier, bl10: boolean, keyWithModifier2: KeyWithModifier, bl11: boolean, string: string, bl12: boolean, bl13: boolean, bl14: boolean, n6: number, compactComparatorMode: CompactComparatorMode, compactMessageCustomSettings: CompactMessageCustomSettings, key: Key, key2: Key, key3: Key, bl15: boolean, bl16: boolean, n7: number, n8: number, key4: Key, bl17: boolean, bl18: boolean, bl19: boolean, n9: number, bl20: boolean, bl21: boolean, bl22: boolean, bl23: boolean, bl24: boolean, bl25: boolean, tabNotificationSettings: TabNotificationSettings, bl26: boolean, bl27: boolean, keyWithModifier3: KeyWithModifier, n10: number, n11: number, bl28: boolean, inputBoxSettings: InputBoxSettings, bl29: boolean, keyWithModifier4: KeyWithModifier, noteClickMode: NoteClickMode, noteSelectMode: NoteSelectMode, key5: Key, noteSelectMode2: NoteSelectMode, bl30: boolean, bl31: boolean, n12: number, list: List, bl32: boolean, n13: number, highlightMode: HighlightMode, n14: number, bl33: boolean, n15: number, n16: number, keyWithModifier5: KeyWithModifier, bl34: boolean, keyWithModifier6: KeyWithModifier, list2: List, bl35: boolean, bl36: boolean, bl37: boolean, bl38: boolean, n17: number, keyWithModifier7: KeyWithModifier, findMode: FindMode, bl39: boolean, keyWithModifier8: KeyWithModifier, n18: number, bl40: boolean, bl41: boolean, string2: string, string3: string, bl42: boolean, keyWithModifier9: KeyWithModifier, f3DMode: F3DMode, bl43: boolean, f: number, bl44: boolean, bl45: boolean, bl46: boolean, screenshotUploadSettings: ScreenshotUploadSettings, n19: number, keyWithModifier10: KeyWithModifier, screenshotMode: ScreenshotMode, screenshotBackgroundMode: ScreenshotBackgroundMode, screenshotWindowsMode: ScreenshotWindowsMode, bl47: boolean, bl48: boolean, bl49: boolean, bl50: boolean, bl51: boolean, bl52: boolean, bl53: boolean, list3: List, string4: string, string5: string, string6: string, bl54: boolean, keyWithModifier11: KeyWithModifier, keyWithModifier12: KeyWithModifier, bl55: boolean, bl56: boolean, bl57: boolean, string7: string, key6: Key, key7: Key, bl58: boolean, bl59: boolean, string8: string, bl60: boolean, n20: number, list4: List, n21: number, n22: number, n23: number, n24: number, n25: number, object: any): ConfigVariables;
    equals(other: any): boolean;
    get addMessagesIfDisabled(): boolean;
    get alwaysShowChat(): boolean;
    get alwaysShowChatToggleKey(): KeyWithModifier;
    get animationDisableOnFocus(): boolean;
    get animationEnabled(): boolean;
    get animationNewMessageTransitionTime(): number;
    get arrowCycleTabEnabled(): boolean;
    get autoBookMarkPatterns(): MessageFilterFormatted[];
    get bookmarkColor(): number;
    get bookmarkEnabled(): boolean;
    get bookmarkKey(): KeyWithModifier;
    get bookmarkLinePriority(): number;
    get bookmarkTextBarElementEnabled(): boolean;
    get bookmarkTextBarElementKey(): KeyWithModifier;
    get chatWindows(): ChatWindow[];
    get compactMessageComparatorMode(): CompactComparatorMode;
    get compactMessageSettings(): CompactMessageCustomSettings;
    get compactMessagesDeleteDuplicate(): boolean;
    get compactMessagesEnabled(): boolean;
    get compactMessagesFormat(): string;
    get compactMessagesRefreshAddedTime(): boolean;
    get compactMessagesSearchAmount(): number;
    get compactMessagesSendAsNew(): boolean;
    get copyMessageFormattingSymbolOverride(): string;
    get copyMessageKey(): KeyWithModifier;
    get copyMessageLinePriority(): number;
    get copyMessageSeparator(): string;
    get copyNoFormatting(): boolean;
    get copyWholeMessage(): boolean;
    get deleteMessageEnabled(): boolean;
    get deleteMessageF3DMode(): F3DMode;
    get deleteMessageKey(): KeyWithModifier;
    get enabled(): boolean;
    get filterMessagesEnabled(): boolean;
    get filterMessagesLinePriority(): number;
    get filterMessagesPatterns(): Filter[];
    get findMessageDefaultMode(): FindMode;
    get findMessageEnabled(): boolean;
    get findMessageHighlightInputBox(): boolean;
    get findMessageHighlightMatchedText(): boolean;
    get findMessageIgnoreCase(): boolean;
    get findMessageKey(): KeyWithModifier;
    get findMessageLinePriority(): number;
    get findMessageTextBarElementEnabled(): boolean;
    get globalizedConfig(): boolean;
    get hideChatEnabled(): boolean;
    get hideChatShowHiddenOnScreen(): boolean;
    get hideChatShowWhenFocused(): boolean;
    get hideChatToggleKey(): KeyWithModifier;
    get hoverHighlightColor(): number;
    get hoverHighlightEnabled(): boolean;
    get hoverHighlightLinePriority(): number;
    get hoverHighlightMode(): HighlightMode;
    get inputBoxAutoAdjustChatWindowEnabled(): boolean;
    get inputBoxSettings(): InputBoxSettings;
    get inputOverFlowAutoFillSettings(): InputOverFlowAutoFillSettings;
    get invertedScrolling(): boolean;
    get jumpToMessageMode(): JumpToMessageMode;
    get keyFineScroll(): Key;
    get keyLargeScroll(): Key;
    get keyNoScroll(): Key;
    get keyPeekChat(): Key;
    get maxCommandSuggestions(): number;
    get maxMessages(): number;
    get messageImagePreviewSettings(): MessageImagePreviewSettings;
    get movableChatColor(): number;
    get movableChatEnabled(): boolean;
    get movableChatKey(): KeyWithModifier;
    get movableChatSelectedColor(): number;
    get movableChatShowEnabledOnScreen(): boolean;
    get movableChatToggleTextBarElement(): boolean;
    get moveToTabWhenCycling(): boolean;
    get peekChatScrollingEnabled(): boolean;
    get playerHeadChatDisplayEnabled(): boolean;
    get playerHeadChatDisplayOffsetNonHeadMessages(): boolean;
    get playerHeadChatDisplayOffsetNonHeadMessagesShowOnWrapped(): boolean;
    get playerHeadChatDisplayShowOnWrapped(): boolean;
    get saveInputBoxMessage(): boolean;
    get screenshotChatAutoUpload(): boolean;
    get screenshotChatAutoUploadSettings(): ScreenshotUploadSettings;
    get screenshotChatCopyToClipboard(): boolean;
    get screenshotChatEnabled(): boolean;
    get screenshotChatKey(): KeyWithModifier;
    get screenshotChatLinePriority(): number;
    get screenshotChatSaveToFile(): boolean;
    get screenshotChatScale(): number;
    get screenshotChatTextBarElementEnabled(): boolean;
    get screenshotDefaultScreenBackgroundMode(): ScreenshotBackgroundMode;
    get screenshotDefaultScreenShotMode(): ScreenshotMode;
    get screenshotDefaultScreenShotWindowsMode(): ScreenshotWindowsMode;
    get scrollCycleTabEnabled(): boolean;
    get scrollbarColor(): number;
    get scrollbarEnabled(): boolean;
    get scrollbarWidth(): number;
    get selectChatColor(): number;
    get selectChatLinePriority(): number;
    get sendNoteClickMode(): NoteClickMode;
    get sendNoteEnabled(): boolean;
    get sendNoteKey(): KeyWithModifier;
    get sendNoteSelectKey(): Key;
    get sendNoteSelectMode(): NoteSelectMode;
    get sendNoteSelectModeKey(): NoteSelectMode;
    get sendNoteTextBarElementEnabled(): boolean;
    get showVanillaWhenUnfocused(): boolean;
    get speechToTextAutoReplacePlayers(): boolean;
    get speechToTextAutoReplacePlayersMaxSearchDepth(): number;
    get speechToTextCharset(): string;
    get speechToTextEnabled(): boolean;
    get speechToTextMicrophone(): string;
    get speechToTextMicrophoneKey(): Key;
    get speechToTextQuickSendKey(): Key;
    get speechToTextReplace(): SpeechToTextReplace[];
    get speechToTextSampleRate(): number;
    get speechToTextSelectedAudioModel(): string;
    get speechToTextToInputBox(): boolean;
    get speechToTextTranslateEnabled(): boolean;
    get speechToTextTranslateLang(): string;
    get speechToTextTranslateToInputBox(): boolean;
    get tabEditorScreen(): boolean;
    get tabNotificationSettings(): TabNotificationSettings;
    get timestampSettings(): TimestampSettings;
    get translateClickEnabled(): boolean;
    get translateKeepOnAfterChatClose(): boolean;
    get translateKey(): KeyWithModifier;
    get translateSelf(): string;
    get translateSpeak(): string;
    get translateTo(): string;
    get translateToggleKey(): KeyWithModifier;
    get translatorEnabled(): boolean;
    get translatorRegexes(): MessageFilter[];
    get translatorTextBarElementEnabled(): boolean;
    get vanillaInputBox(): boolean;
    get windowEditorScreen(): boolean;
    get wrappedMessageLineIndent(): number;
    hashCode(): number;
    set addMessagesIfDisabled(bl: boolean);
    set alwaysShowChat(bl: boolean);
    set alwaysShowChatToggleKey(keyWithModifier: KeyWithModifier);
    set animationDisableOnFocus(bl: boolean);
    set animationEnabled(bl: boolean);
    set animationNewMessageTransitionTime(n: number);
    set arrowCycleTabEnabled(bl: boolean);
    set autoBookMarkPatterns(list: MessageFilterFormatted[]);
    set bookmarkColor(n: number);
    set bookmarkEnabled(bl: boolean);
    set bookmarkKey(keyWithModifier: KeyWithModifier);
    set bookmarkLinePriority(n: number);
    set bookmarkTextBarElementEnabled(bl: boolean);
    set bookmarkTextBarElementKey(keyWithModifier: KeyWithModifier);
    set chatWindows(value: ChatWindow[]);
    set compactMessageComparatorMode(compactComparatorMode: CompactComparatorMode);
    set compactMessageSettings(compactMessageCustomSettings: CompactMessageCustomSettings);
    set compactMessagesDeleteDuplicate(bl: boolean);
    set compactMessagesEnabled(bl: boolean);
    set compactMessagesFormat(string: string);
    set compactMessagesRefreshAddedTime(bl: boolean);
    set compactMessagesSearchAmount(n: number);
    set compactMessagesSendAsNew(bl: boolean);
    set copyMessageFormattingSymbolOverride(string: string);
    set copyMessageKey(keyWithModifier: KeyWithModifier);
    set copyMessageLinePriority(n: number);
    set copyMessageSeparator(string: string);
    set copyNoFormatting(bl: boolean);
    set copyWholeMessage(bl: boolean);
    set deleteMessageEnabled(bl: boolean);
    set deleteMessageF3DMode(f3DMode: F3DMode);
    set deleteMessageKey(keyWithModifier: KeyWithModifier);
    set enabled(bl: boolean);
    set filterMessagesEnabled(bl: boolean);
    set filterMessagesLinePriority(n: number);
    set filterMessagesPatterns(list: Filter[]);
    set findMessageDefaultMode(findMode: FindMode);
    set findMessageEnabled(bl: boolean);
    set findMessageHighlightInputBox(bl: boolean);
    set findMessageHighlightMatchedText(bl: boolean);
    set findMessageIgnoreCase(bl: boolean);
    set findMessageKey(keyWithModifier: KeyWithModifier);
    set findMessageLinePriority(n: number);
    set findMessageTextBarElementEnabled(bl: boolean);
    set globalizedConfig(bl: boolean);
    set hideChatEnabled(bl: boolean);
    set hideChatShowHiddenOnScreen(bl: boolean);
    set hideChatShowWhenFocused(bl: boolean);
    set hideChatToggleKey(keyWithModifier: KeyWithModifier);
    set hoverHighlightColor(n: number);
    set hoverHighlightEnabled(bl: boolean);
    set hoverHighlightLinePriority(n: number);
    set hoverHighlightMode(highlightMode: HighlightMode);
    set inputBoxAutoAdjustChatWindowEnabled(bl: boolean);
    set inputBoxSettings(inputBoxSettings: InputBoxSettings);
    set inputOverFlowAutoFillSettings(inputOverFlowAutoFillSettings: InputOverFlowAutoFillSettings);
    set invertedScrolling(bl: boolean);
    set jumpToMessageMode(jumpToMessageMode: JumpToMessageMode);
    set keyFineScroll(key: Key);
    set keyLargeScroll(key: Key);
    set keyNoScroll(key: Key);
    set keyPeekChat(key: Key);
    set maxCommandSuggestions(n: number);
    set maxMessages(n: number);
    set messageImagePreviewSettings(messageImagePreviewSettings: MessageImagePreviewSettings);
    set movableChatColor(n: number);
    set movableChatEnabled(bl: boolean);
    set movableChatKey(keyWithModifier: KeyWithModifier);
    set movableChatSelectedColor(n: number);
    set movableChatShowEnabledOnScreen(bl: boolean);
    set movableChatToggleTextBarElement(bl: boolean);
    set moveToTabWhenCycling(bl: boolean);
    set peekChatScrollingEnabled(bl: boolean);
    set playerHeadChatDisplayEnabled(bl: boolean);
    set playerHeadChatDisplayOffsetNonHeadMessages(bl: boolean);
    set playerHeadChatDisplayOffsetNonHeadMessagesShowOnWrapped(bl: boolean);
    set playerHeadChatDisplayShowOnWrapped(bl: boolean);
    set saveInputBoxMessage(bl: boolean);
    set screenshotChatAutoUpload(bl: boolean);
    set screenshotChatAutoUploadSettings(screenshotUploadSettings: ScreenshotUploadSettings);
    set screenshotChatCopyToClipboard(bl: boolean);
    set screenshotChatEnabled(bl: boolean);
    set screenshotChatKey(keyWithModifier: KeyWithModifier);
    set screenshotChatLinePriority(n: number);
    set screenshotChatSaveToFile(bl: boolean);
    set screenshotChatScale(f: number);
    set screenshotChatTextBarElementEnabled(bl: boolean);
    set screenshotDefaultScreenBackgroundMode(screenshotBackgroundMode: ScreenshotBackgroundMode);
    set screenshotDefaultScreenShotMode(screenshotMode: ScreenshotMode);
    set screenshotDefaultScreenShotWindowsMode(screenshotWindowsMode: ScreenshotWindowsMode);
    set scrollCycleTabEnabled(bl: boolean);
    set scrollbarColor(n: number);
    set scrollbarEnabled(bl: boolean);
    set scrollbarWidth(n: number);
    set selectChatColor(n: number);
    set selectChatLinePriority(n: number);
    set sendNoteClickMode(noteClickMode: NoteClickMode);
    set sendNoteEnabled(bl: boolean);
    set sendNoteKey(keyWithModifier: KeyWithModifier);
    set sendNoteSelectKey(key: Key);
    set sendNoteSelectMode(noteSelectMode: NoteSelectMode);
    set sendNoteSelectModeKey(noteSelectMode: NoteSelectMode);
    set sendNoteTextBarElementEnabled(bl: boolean);
    set showVanillaWhenUnfocused(bl: boolean);
    set speechToTextAutoReplacePlayers(bl: boolean);
    set speechToTextAutoReplacePlayersMaxSearchDepth(n: number);
    set speechToTextCharset(string: string);
    set speechToTextEnabled(bl: boolean);
    set speechToTextMicrophone(value: string);
    set speechToTextMicrophoneKey(key: Key);
    set speechToTextQuickSendKey(key: Key);
    set speechToTextReplace(list: SpeechToTextReplace[]);
    set speechToTextSampleRate(value: number);
    set speechToTextSelectedAudioModel(value: string);
    set speechToTextToInputBox(bl: boolean);
    set speechToTextTranslateEnabled(bl: boolean);
    set speechToTextTranslateLang(string: string);
    set speechToTextTranslateToInputBox(bl: boolean);
    set tabEditorScreen(bl: boolean);
    set tabNotificationSettings(tabNotificationSettings: TabNotificationSettings);
    set timestampSettings(timestampSettings: TimestampSettings);
    set translateClickEnabled(bl: boolean);
    set translateKeepOnAfterChatClose(bl: boolean);
    set translateKey(keyWithModifier: KeyWithModifier);
    set translateSelf(string: string);
    set translateSpeak(string: string);
    set translateTo(string: string);
    set translateToggleKey(keyWithModifier: KeyWithModifier);
    set translatorEnabled(bl: boolean);
    set translatorRegexes(list: MessageFilter[]);
    set translatorTextBarElementEnabled(bl: boolean);
    set vanillaInputBox(bl: boolean);
    set windowEditorScreen(bl: boolean);
    set wrappedMessageLineIndent(n: number);
    toString(): string;
    static write$Self$chatplus_common(self: ConfigVariables, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class EnumTranslatableName {
    get translatableName(): Component;
  }


  interface JumpToMessageMode extends EnumTranslatableName, Enum<JumpToMessageMode> {}
  class JumpToMessageMode extends EnumTranslatableName {
    static readonly Companion: com_ebicep_chatplus_config_jumptomessagemode_Companion;
    static readonly TOP: JumpToMessageMode;
    static readonly MIDDLE: JumpToMessageMode;
    static readonly BOTTOM: JumpToMessageMode;
    static readonly CURSOR: JumpToMessageMode;
    static get entries(): EnumEntries<JumpToMessageMode>;
    get translatable(): Component;
    get translatableName(): Component;
    static valueOf(value: string): JumpToMessageMode;
    static values(): JumpToMessageMode[];
  }


  interface MessageDirection extends EnumTranslatableName, Enum<MessageDirection> {}
  class MessageDirection extends EnumTranslatableName {
    static readonly Companion: com_ebicep_chatplus_config_messagedirection_Companion;
    static readonly TOP_DOWN: MessageDirection;
    static readonly BOTTOM_UP: MessageDirection;
    static get entries(): EnumEntries<MessageDirection>;
    get translatable(): Component;
    get translatableName(): Component;
    static valueOf(value: string): MessageDirection;
    static values(): MessageDirection[];
  }


  class SoundWrapper {
    static readonly Companion: com_ebicep_chatplus_config_soundwrapper_Companion;
    constructor();

    constructor(seen0: number, sound: string, source: SoundSource, volume: number, pitch: number, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    get pitch(): number;
    get sound(): string;
    get source(): SoundSource;
    get volume(): number;
    set pitch(f: number);
    set sound(string: string);
    set source(soundSource: SoundSource);
    set volume(f: number);
    static write$Self$chatplus_common(self: SoundWrapper, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }

}

declare module 'com.ebicep.chatplus.config.ConfigVariables' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { ConfigVariables } from 'com.ebicep.chatplus.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<ConfigVariables>;
  }

}

declare module 'com.ebicep.chatplus.config.JumpToMessageMode' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { JumpToMessageMode } from 'com.ebicep.chatplus.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<JumpToMessageMode>;
  }

}

declare module 'com.ebicep.chatplus.config.MessageDirection' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { MessageDirection } from 'com.ebicep.chatplus.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<MessageDirection>;
  }

}

declare module 'com.ebicep.chatplus.config.migration' {
  import { File } from 'java.io';
  import { KSerializer } from 'kotlinx.serialization';
  import { Companion } from 'com.ebicep.chatplus.config.migration.SchemaV0TranslatorRegex';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Companion as com_ebicep_chatplus_config_migration_schemav1_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV1';
  import { MessageDirection } from 'com.ebicep.chatplus.config';
  import { List } from 'java.util';
  import { ChatTab, AutoTabCreator } from 'com.ebicep.chatplus.features.chattabs';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_1_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_1';
  import { Key } from 'InputConstants';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_1_chattab_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_1_ChatTab';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_1_chatwindow_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_1_ChatWindow';
  import { GeneralSettings, OutlineSettings, Padding } from 'com.ebicep.chatplus.features.chatwindows';
  import { ChatRenderer } from 'com.ebicep.chatplus.hud';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_1_tabsettings_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_1_TabSettings';
  import { Position } from 'TabSettings';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_5_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_5';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_5_chattab_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_5_ChatTab';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_5_chatwindow_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_5_ChatWindow';
  import { MessageFilter, MessageFilterFormatted } from 'com.ebicep.chatplus.features.internal';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_5_servertabpattern_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_5_ServerTabPattern';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_5_tabsettings_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_5_TabSettings';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_chattab_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_ChatTab';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_chatwindow_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_ChatWindow';
  import { Companion as com_ebicep_chatplus_config_migration_schemav2_tabsettings_Companion } from 'com.ebicep.chatplus.config.migration.SchemaV2_TabSettings';

  class MigrationManager {
    static readonly INSTANCE: MigrationManager;
    copyFile(file: File, newFile: File): void;
    tryMigration(configDirectory: File, currentConfig: File): boolean;
  }


  class Migrator<T = any> {
    get fileNameVersion(): string;
    get serializer(): KSerializer<T>;
    migrate(var1: T): void;
  }


  class SchemaV0TranslatorRegex {
    static readonly Companion: Companion;
    constructor(match: string, senderNameGroupIndex: number);

    constructor(string: string, n: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, match: string, senderNameGroupIndex: number, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    component1(): string;
    component2(): number;
    copy(match: string, senderNameGroupIndex: number): SchemaV0TranslatorRegex;
    static copy$default(schemaV0TranslatorRegex: SchemaV0TranslatorRegex, string: string, n: number, n2: number, object: any): SchemaV0TranslatorRegex;
    equals(other: any): boolean;
    get match(): string;
    get senderNameGroupIndex(): number;
    hashCode(): number;
    toString(): string;
    static write$Self$chatplus_common(self: SchemaV0TranslatorRegex, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV1 {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav1_Companion;
    constructor(x: number, y: number, width: number, height: number, scale: number, textOpacity: number, backgroundOpacity: number, unfocusedHeight: number, lineSpacing: number, messageDirection: MessageDirection, chatTabs: ChatTab[], translatorRegexes: SchemaV0TranslatorRegex[], compactMessagesIgnoreTimestamps: boolean);

    constructor(n: number, n2: number, n3: number, n4: number, f: number, f2: number, f3: number, f4: number, f5: number, messageDirection: MessageDirection, list: List, list2: List, bl: boolean, n5: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, x: number, y: number, width: number, height: number, scale: number, textOpacity: number, backgroundOpacity: number, unfocusedHeight: number, lineSpacing: number, messageDirection: MessageDirection, chatTabs: List, translatorRegexes: List, compactMessagesIgnoreTimestamps: boolean, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    component1(): number;
    component10(): MessageDirection;
    component11(): ChatTab[];
    component12(): SchemaV0TranslatorRegex[];
    component13(): boolean;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): number;
    component7(): number;
    component8(): number;
    component9(): number;
    copy(x: number, y: number, width: number, height: number, scale: number, textOpacity: number, backgroundOpacity: number, unfocusedHeight: number, lineSpacing: number, messageDirection: MessageDirection, chatTabs: ChatTab[], translatorRegexes: SchemaV0TranslatorRegex[], compactMessagesIgnoreTimestamps: boolean): SchemaV1;
    static copy$default(schemaV1: SchemaV1, n: number, n2: number, n3: number, n4: number, f: number, f2: number, f3: number, f4: number, f5: number, messageDirection: MessageDirection, list: List, list2: List, bl: boolean, n5: number, object: any): SchemaV1;
    equals(other: any): boolean;
    get backgroundOpacity(): number;
    get chatTabs(): ChatTab[];
    get compactMessagesIgnoreTimestamps(): boolean;
    get height(): number;
    get lineSpacing(): number;
    get messageDirection(): MessageDirection;
    get scale(): number;
    get textOpacity(): number;
    get translatorRegexes(): SchemaV0TranslatorRegex[];
    get unfocusedHeight(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    hashCode(): number;
    set backgroundOpacity(f: number);
    set chatTabs(list: ChatTab[]);
    set compactMessagesIgnoreTimestamps(bl: boolean);
    set height(n: number);
    set lineSpacing(f: number);
    set messageDirection(messageDirection: MessageDirection);
    set scale(f: number);
    set textOpacity(f: number);
    set translatorRegexes(list: SchemaV0TranslatorRegex[]);
    set unfocusedHeight(f: number);
    set width(n: number);
    set x(n: number);
    set y(n: number);
    toString(): string;
    static write$Self$chatplus_common(self: SchemaV1, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2 {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_Companion;
    constructor(compactMessagesIgnoreTimestamps: boolean, chatWindows: SchemaV2_ChatWindow[]);

    constructor(bl: boolean, list: List, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, compactMessagesIgnoreTimestamps: boolean, chatWindows: List, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    component1(): boolean;
    component2(): SchemaV2_ChatWindow[];
    copy(compactMessagesIgnoreTimestamps: boolean, chatWindows: SchemaV2_ChatWindow[]): SchemaV2;
    static copy$default(schemaV2: SchemaV2, bl: boolean, list: List, n: number, object: any): SchemaV2;
    equals(other: any): boolean;
    get chatWindows(): SchemaV2_ChatWindow[];
    get compactMessagesIgnoreTimestamps(): boolean;
    hashCode(): number;
    set chatWindows(list: SchemaV2_ChatWindow[]);
    set compactMessagesIgnoreTimestamps(bl: boolean);
    toString(): string;
    static write$Self$chatplus_common(self: SchemaV2, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_1 {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_1_Companion;
    constructor(movableChatToggleKey: Key, chatWindows: SchemaV2_1_ChatWindow[]);

    constructor(key: Key, list: List, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, movableChatToggleKey: Key, chatWindows: List, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    component1(): Key;
    component2(): SchemaV2_1_ChatWindow[];
    copy(movableChatToggleKey: Key, chatWindows: SchemaV2_1_ChatWindow[]): SchemaV2_1;
    static copy$default(schemaV2_1: SchemaV2_1, key: Key, list: List, n: number, object: any): SchemaV2_1;
    equals(other: any): boolean;
    get chatWindows(): SchemaV2_1_ChatWindow[];
    get movableChatToggleKey(): Key;
    hashCode(): number;
    set chatWindows(list: SchemaV2_1_ChatWindow[]);
    set movableChatToggleKey(key: Key);
    toString(): string;
    static write$Self$chatplus_common(self: SchemaV2_1, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_1_ChatTab {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_1_chattab_Companion;
    constructor();

    constructor(seen0: number, pattern: string, formatted: boolean, name: string, autoPrefix: string, priority: number, alwaysAdd: boolean, skipOthers: boolean, commandsOverrideAutoPrefix: boolean, serializationConstructorMarker: SerializationConstructorMarker);
    get alwaysAdd(): boolean;
    get autoPrefix(): string;
    get commandsOverrideAutoPrefix(): boolean;
    get formatted(): boolean;
    get name(): string;
    get pattern(): string;
    get priority(): number;
    get skipOthers(): boolean;
    set alwaysAdd(bl: boolean);
    set autoPrefix(string: string);
    set commandsOverrideAutoPrefix(bl: boolean);
    set formatted(bl: boolean);
    set name(string: string);
    set pattern(string: string);
    set priority(n: number);
    set skipOthers(bl: boolean);
    static write$Self$chatplus_common(self: SchemaV2_1_ChatTab, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_1_ChatWindow {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_1_chatwindow_Companion;
    constructor();

    constructor(seen0: number, tabSettings: SchemaV2_1_TabSettings, generalSettings: GeneralSettings, outlineSettings: OutlineSettings, padding: Padding, renderer: ChatRenderer, autoTabCreator: AutoTabCreator, serializationConstructorMarker: SerializationConstructorMarker);
    get autoTabCreator(): AutoTabCreator;
    get generalSettings(): GeneralSettings;
    get outlineSettings(): OutlineSettings;
    get padding(): Padding;
    get renderer(): ChatRenderer;
    get tabSettings(): SchemaV2_1_TabSettings;
    set autoTabCreator(autoTabCreator: AutoTabCreator);
    set generalSettings(generalSettings: GeneralSettings);
    set outlineSettings(outlineSettings: OutlineSettings);
    set padding(padding: Padding);
    set tabSettings(schemaV2_1_TabSettings: SchemaV2_1_TabSettings);
    static write$Self$chatplus_common(self: SchemaV2_1_ChatWindow, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_1_TabSettings {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_1_tabsettings_Companion;
    constructor();

    constructor(seen0: number, tabs: List, selectedTabIndex: number, startRenderTabIndex: number, hideTabs: boolean, showTabsWhenChatNotOpen: boolean, position: Position, tabTextColorSelected: number, tabTextColorUnselected: number, unfocusedTabOpacityMultiplier: number, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    get hideTabs(): boolean;
    get position(): Position;
    get selectedTabIndex(): number;
    get showTabsWhenChatNotOpen(): boolean;
    get startRenderTabIndex(): number;
    get tabTextColorSelected(): number;
    get tabTextColorUnselected(): number;
    get tabs(): SchemaV2_1_ChatTab[];
    get unfocusedTabOpacityMultiplier(): number;
    set hideTabs(bl: boolean);
    set position(position: Position);
    set selectedTabIndex(n: number);
    set showTabsWhenChatNotOpen(bl: boolean);
    set startRenderTabIndex(n: number);
    set tabTextColorSelected(n: number);
    set tabTextColorUnselected(n: number);
    set tabs(list: SchemaV2_1_ChatTab[]);
    set unfocusedTabOpacityMultiplier(f: number);
    static write$Self$chatplus_common(self: SchemaV2_1_TabSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_5 {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_5_Companion;
    constructor(chatWindows: SchemaV2_5_ChatWindow[]);

    constructor(list: List, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, chatWindows: List, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    component1(): SchemaV2_5_ChatWindow[];
    copy(chatWindows: SchemaV2_5_ChatWindow[]): SchemaV2_5;
    static copy$default(schemaV2_5: SchemaV2_5, list: List, n: number, object: any): SchemaV2_5;
    equals(other: any): boolean;
    get chatWindows(): SchemaV2_5_ChatWindow[];
    hashCode(): number;
    set chatWindows(list: SchemaV2_5_ChatWindow[]);
    toString(): string;
    static write$Self$chatplus_common(self: SchemaV2_5, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_5_ChatTab {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_5_chattab_Companion;
    constructor();

    constructor(seen0: number, pattern: string, formatted: boolean, name: string, autoPrefix: string, serverTabPatterns: List, priority: number, alwaysAdd: boolean, skipOthers: boolean, commandsOverrideAutoPrefix: boolean, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    get alwaysAdd(): boolean;
    get autoPrefix(): string;
    get commandsOverrideAutoPrefix(): boolean;
    get formatted(): boolean;
    get name(): string;
    get pattern(): string;
    get priority(): number;
    get serverTabPatterns(): SchemaV2_5_ServerTabPattern[];
    get skipOthers(): boolean;
    set alwaysAdd(bl: boolean);
    set autoPrefix(string: string);
    set commandsOverrideAutoPrefix(bl: boolean);
    set formatted(bl: boolean);
    set name(string: string);
    set pattern(string: string);
    set priority(n: number);
    set serverTabPatterns(list: SchemaV2_5_ServerTabPattern[]);
    set skipOthers(bl: boolean);
    static write$Self$chatplus_common(self: SchemaV2_5_ChatTab, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_5_ChatWindow {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_5_chatwindow_Companion;
    constructor();

    constructor(seen0: number, tabSettings: SchemaV2_5_TabSettings, generalSettings: GeneralSettings, outlineSettings: OutlineSettings, padding: Padding, renderer: ChatRenderer, autoTabCreator: AutoTabCreator, serializationConstructorMarker: SerializationConstructorMarker);
    get autoTabCreator(): AutoTabCreator;
    get generalSettings(): GeneralSettings;
    get outlineSettings(): OutlineSettings;
    get padding(): Padding;
    get renderer(): ChatRenderer;
    get tabSettings(): SchemaV2_5_TabSettings;
    set autoTabCreator(autoTabCreator: AutoTabCreator);
    set generalSettings(generalSettings: GeneralSettings);
    set outlineSettings(outlineSettings: OutlineSettings);
    set padding(padding: Padding);
    set tabSettings(schemaV2_5_TabSettings: SchemaV2_5_TabSettings);
    static write$Self$chatplus_common(self: SchemaV2_5_ChatWindow, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  interface SchemaV2_5_ServerTabPattern extends MessageFilter {}
  class SchemaV2_5_ServerTabPattern extends MessageFilter {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_5_servertabpattern_Companion;
    constructor(pattern: string, autoPrefix: string);

    constructor(seen0: number, pattern: string, chatPattern: MessageFilterFormatted, autoPrefix: string, serializationConstructorMarker: SerializationConstructorMarker);
    get autoPrefix(): string;
    get chatPattern(): MessageFilterFormatted;
    set autoPrefix(string: string);
    set chatPattern(messageFilterFormatted: MessageFilterFormatted);
    static write$Self$chatplus_common(self: SchemaV2_5_ServerTabPattern, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_5_TabSettings {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_5_tabsettings_Companion;
    constructor();

    constructor(seen0: number, tabs: List, selectedTabIndex: number, startRenderTabIndex: number, hideTabs: boolean, showTabsWhenChatNotOpen: boolean, position: Position, tabTextColorSelected: number, tabTextColorUnselected: number, unfocusedTabOpacityMultiplier: number, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    get hideTabs(): boolean;
    get position(): Position;
    get selectedTabIndex(): number;
    get showTabsWhenChatNotOpen(): boolean;
    get startRenderTabIndex(): number;
    get tabTextColorSelected(): number;
    get tabTextColorUnselected(): number;
    get tabs(): SchemaV2_5_ChatTab[];
    get unfocusedTabOpacityMultiplier(): number;
    set hideTabs(bl: boolean);
    set position(position: Position);
    set selectedTabIndex(n: number);
    set showTabsWhenChatNotOpen(bl: boolean);
    set startRenderTabIndex(n: number);
    set tabTextColorSelected(n: number);
    set tabTextColorUnselected(n: number);
    set tabs(list: SchemaV2_5_ChatTab[]);
    set unfocusedTabOpacityMultiplier(f: number);
    static write$Self$chatplus_common(self: SchemaV2_5_TabSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_ChatTab {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_chattab_Companion;
    constructor();

    constructor(seen0: number, pattern: string, formatted: boolean, name: string, autoPrefix: string, priority: number, alwaysAdd: boolean, skipOthers: boolean, commandsOverrideAutoPrefix: boolean, serializationConstructorMarker: SerializationConstructorMarker);
    get alwaysAdd(): boolean;
    get autoPrefix(): string;
    get commandsOverrideAutoPrefix(): boolean;
    get formatted(): boolean;
    get name(): string;
    get pattern(): string;
    get priority(): number;
    get skipOthers(): boolean;
    set alwaysAdd(bl: boolean);
    set autoPrefix(string: string);
    set commandsOverrideAutoPrefix(bl: boolean);
    set formatted(bl: boolean);
    set name(string: string);
    set pattern(string: string);
    set priority(n: number);
    set skipOthers(bl: boolean);
    static write$Self$chatplus_common(self: SchemaV2_ChatTab, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_ChatWindow {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_chatwindow_Companion;
    constructor();

    constructor(seen0: number, tabSettings: SchemaV2_TabSettings, generalSettings: GeneralSettings, outlineSettings: OutlineSettings, padding: Padding, renderer: ChatRenderer, autoTabCreator: AutoTabCreator, serializationConstructorMarker: SerializationConstructorMarker);
    get autoTabCreator(): AutoTabCreator;
    get generalSettings(): GeneralSettings;
    get outlineSettings(): OutlineSettings;
    get padding(): Padding;
    get renderer(): ChatRenderer;
    get tabSettings(): SchemaV2_TabSettings;
    set autoTabCreator(autoTabCreator: AutoTabCreator);
    set generalSettings(generalSettings: GeneralSettings);
    set outlineSettings(outlineSettings: OutlineSettings);
    set padding(padding: Padding);
    set tabSettings(schemaV2_TabSettings: SchemaV2_TabSettings);
    static write$Self$chatplus_common(self: SchemaV2_ChatWindow, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class SchemaV2_TabSettings {
    static readonly Companion: com_ebicep_chatplus_config_migration_schemav2_tabsettings_Companion;
    constructor();

    constructor(seen0: number, tabs: List, selectedTabIndex: number, startRenderTabIndex: number, hideTabs: boolean, showTabsWhenChatNotOpen: boolean, position: Position, tabTextColorSelected: number, tabTextColorUnselected: number, unfocusedTabOpacityMultiplier: number, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    get hideTabs(): boolean;
    get position(): Position;
    get selectedTabIndex(): number;
    get showTabsWhenChatNotOpen(): boolean;
    get startRenderTabIndex(): number;
    get tabTextColorSelected(): number;
    get tabTextColorUnselected(): number;
    get tabs(): SchemaV2_ChatTab[];
    get unfocusedTabOpacityMultiplier(): number;
    set hideTabs(bl: boolean);
    set position(position: Position);
    set selectedTabIndex(n: number);
    set showTabsWhenChatNotOpen(bl: boolean);
    set startRenderTabIndex(n: number);
    set tabTextColorSelected(n: number);
    set tabTextColorUnselected(n: number);
    set tabs(list: SchemaV2_ChatTab[]);
    set unfocusedTabOpacityMultiplier(f: number);
    static write$Self$chatplus_common(self: SchemaV2_TabSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV0TranslatorRegex' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV0TranslatorRegex } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV0TranslatorRegex>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV1' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV1 } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV1>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2 } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_1' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_1 } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_1>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_1_ChatTab' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_1_ChatTab } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_1_ChatTab>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_1_ChatWindow' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_1_ChatWindow } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_1_ChatWindow>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_1_TabSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_1_TabSettings } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_1_TabSettings>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_5' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_5 } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_5>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_5_ChatTab' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_5_ChatTab } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_5_ChatTab>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_5_ChatWindow' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_5_ChatWindow } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_5_ChatWindow>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_5_ServerTabPattern' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_5_ServerTabPattern } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_5_ServerTabPattern>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_5_TabSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_5_TabSettings } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_5_TabSettings>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_ChatTab' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_ChatTab } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_ChatTab>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_ChatWindow' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_ChatWindow } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_ChatWindow>;
  }

}

declare module 'com.ebicep.chatplus.config.migration.SchemaV2_TabSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SchemaV2_TabSettings } from 'com.ebicep.chatplus.config.migration';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SchemaV2_TabSettings>;
  }

}

declare module 'com.ebicep.chatplus.config.serializers' {
  import { KSerializer } from 'kotlinx.serialization';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Key } from 'InputConstants';
  import { Decoder, Encoder } from 'kotlinx.serialization.encoding';

  interface KeySerializer extends KSerializer<Key> {}
  class KeySerializer extends KSerializer<Key> {
    static readonly INSTANCE: KeySerializer;
    deserialize(decoder: Decoder): Key;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, value: Key): void;
  }

}

declare module 'com.ebicep.chatplus.config.SoundWrapper' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SoundWrapper } from 'com.ebicep.chatplus.config';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SoundWrapper>;
  }

}

declare module 'com.ebicep.chatplus.events' {
  interface ChatPlusMinuteEvent extends Event {}
  class ChatPlusMinuteEvent extends Event {
    constructor(minute: number);
    component1(): number;
    copy(minute: number): ChatPlusMinuteEvent;
    static copy$default(chatPlusMinuteEvent: ChatPlusMinuteEvent, l: number, n: number, object: any): ChatPlusMinuteEvent;
    equals(other: any): boolean;
    get minute(): number;
    hashCode(): number;
    toString(): string;
  }


  interface ChatPlusSecondEvent extends Event {}
  class ChatPlusSecondEvent extends Event {
    constructor(second: number);
    component1(): number;
    copy(second: number): ChatPlusSecondEvent;
    static copy$default(chatPlusSecondEvent: ChatPlusSecondEvent, l: number, n: number, object: any): ChatPlusSecondEvent;
    equals(other: any): boolean;
    get second(): number;
    hashCode(): number;
    toString(): string;
  }


  interface ChatPlusTickEvent extends Event {}
  class ChatPlusTickEvent extends Event {
    constructor(tick: number);
    component1(): number;
    copy(tick: number): ChatPlusTickEvent;
    static copy$default(chatPlusTickEvent: ChatPlusTickEvent, l: number, n: number, object: any): ChatPlusTickEvent;
    equals(other: any): boolean;
    get tick(): number;
    hashCode(): number;
    toString(): string;
  }


  class Event {
  }


  class Events {
    static readonly INSTANCE: Events;
    get currentTick(): number;
    set currentTick(l: number);
  }

}

declare module 'com.ebicep.chatplus.events.neoforge' {
  import { RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';

  class ClientCommandRegistration {
    static readonly INSTANCE: ClientCommandRegistration;
    registerCommands(event: RegisterClientCommandsEvent): void;
  }

}

declare module 'com.ebicep.chatplus.features' {
  import { ChatTab } from 'com.ebicep.chatplus.features.chattabs';
  import { ChatWindow } from 'com.ebicep.chatplus.features.chatwindows';

  class AlternatingColorBackgroundKt {
    static main(): void;
    static main(args: string[]): void;
  }


  class MovableChatCreateNewWindowEvent {
    constructor(chatTab: ChatTab, chatWindow: ChatWindow);
    component1(): ChatTab;
    component2(): ChatWindow;
    copy(chatTab: ChatTab, chatWindow: ChatWindow): MovableChatCreateNewWindowEvent;
    static copy$default(movableChatCreateNewWindowEvent: MovableChatCreateNewWindowEvent, chatTab: ChatTab, chatWindow: ChatWindow, n: number, object: any): MovableChatCreateNewWindowEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    hashCode(): number;
    toString(): string;
  }


  class MovableChatRemoveTabFromWindowEvent {
    constructor(chatTab: ChatTab, chatWindow: ChatWindow, deleted: boolean);
    component1(): ChatTab;
    component2(): ChatWindow;
    component3(): boolean;
    copy(chatTab: ChatTab, chatWindow: ChatWindow, deleted: boolean): MovableChatRemoveTabFromWindowEvent;
    static copy$default(movableChatRemoveTabFromWindowEvent: MovableChatRemoveTabFromWindowEvent, chatTab: ChatTab, chatWindow: ChatWindow, bl: boolean, n: number, object: any): MovableChatRemoveTabFromWindowEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get deleted(): boolean;
    hashCode(): number;
    toString(): string;
  }


  class MovableChatTabToWindowEvent {
    constructor(chatTab: ChatTab, chatWindow: ChatWindow);
    component1(): ChatTab;
    component2(): ChatWindow;
    copy(chatTab: ChatTab, chatWindow: ChatWindow): MovableChatTabToWindowEvent;
    static copy$default(movableChatTabToWindowEvent: MovableChatTabToWindowEvent, chatTab: ChatTab, chatWindow: ChatWindow, n: number, object: any): MovableChatTabToWindowEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.ebicep.chatplus.features.chattabs' {
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';
  import { Event } from 'com.ebicep.chatplus.events';
  import { MutableComponent, Component, MessageSignature } from 'net.minecraft.network.chat';
  import { UUID, List } from 'java.util';
  import { GuiMessageTag } from 'net.minecraft.client';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ChatWindow } from 'com.ebicep.chatplus.features.chatwindows';
  import { ChatPlusGuiMessage, ChatPlusGuiMessageLine } from 'ChatTab';
  import { Predicate } from 'com.google.common.base';
  import { Companion, SuggestionMode } from 'com.ebicep.chatplus.features.chattabs.ServerChatTabCommandSuggestion';
  import { MessageFilter, MessageFilterFormatted } from 'com.ebicep.chatplus.features.internal';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { KSerializer } from 'kotlinx.serialization';
  import { Companion as com_ebicep_chatplus_features_chattabs_serverchattabnotificationsettings_Companion } from 'com.ebicep.chatplus.features.chattabs.ServerChatTabNotificationSettings';
  import { Companion as com_ebicep_chatplus_features_chattabs_tabnotificationsettings_Companion } from 'com.ebicep.chatplus.features.chattabs.TabNotificationSettings';

  interface AddDisplayMessageType extends Enum<AddDisplayMessageType> {}
  class AddDisplayMessageType extends Enum<AddDisplayMessageType> {
    static readonly TAB: AddDisplayMessageType;
    static readonly COMPACT: AddDisplayMessageType;
    static get entries(): EnumEntries<AddDisplayMessageType>;
    static valueOf(value: string): AddDisplayMessageType;
    static values(): AddDisplayMessageType[];
  }


  interface AddNewMessageEvent extends Event {}
  class AddNewMessageEvent extends Event {
    constructor(mutableComponent: MutableComponent, rawComponent: Component, senderUUID: UUID, signature: MessageSignature, addedTime: number, tag: GuiMessageTag, returnFunction: boolean);

    constructor(mutableComponent: MutableComponent, component: Component, uUID: UUID, messageSignature: MessageSignature, n: number, guiMessageTag: GuiMessageTag, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): MutableComponent;
    component2(): Component;
    component3(): UUID;
    component4(): MessageSignature;
    component5(): number;
    component6(): GuiMessageTag;
    component7(): boolean;
    copy(mutableComponent: MutableComponent, rawComponent: Component, senderUUID: UUID, signature: MessageSignature, addedTime: number, tag: GuiMessageTag, returnFunction: boolean): AddNewMessageEvent;
    static copy$default(addNewMessageEvent: AddNewMessageEvent, mutableComponent: MutableComponent, component: Component, uUID: UUID, messageSignature: MessageSignature, n: number, guiMessageTag: GuiMessageTag, bl: boolean, n2: number, object: any): AddNewMessageEvent;
    equals(other: any): boolean;
    get addedTime(): number;
    get mutableComponent(): MutableComponent;
    get rawComponent(): Component;
    get returnFunction(): boolean;
    get senderUUID(): UUID;
    get signature(): MessageSignature;
    get tag(): GuiMessageTag;
    hashCode(): number;
    set mutableComponent(mutableComponent: MutableComponent);
    set returnFunction(bl: boolean);
    set senderUUID(uUID: UUID);
    toString(): string;
  }


  interface ChatTabAddDisplayMessageEvent extends Event {}
  class ChatTabAddDisplayMessageEvent extends Event {
    constructor(addDisplayMessageType: AddDisplayMessageType, chatWindow: ChatWindow, chatTab: ChatTab, component: MutableComponent, addedTime: number, tag: GuiMessageTag, linkedMessage: ChatPlusGuiMessage, maxWidth: number, addMessage: boolean, filtered: boolean);

    constructor(addDisplayMessageType: AddDisplayMessageType, chatWindow: ChatWindow, chatTab: ChatTab, mutableComponent: MutableComponent, n: number, guiMessageTag: GuiMessageTag, chatPlusGuiMessage: ChatPlusGuiMessage, n2: number, bl: boolean, bl2: boolean, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): AddDisplayMessageType;
    component10(): boolean;
    component2(): ChatWindow;
    component3(): ChatTab;
    component4(): MutableComponent;
    component5(): number;
    component6(): GuiMessageTag;
    component7(): ChatPlusGuiMessage;
    component8(): number;
    component9(): boolean;
    copy(addDisplayMessageType: AddDisplayMessageType, chatWindow: ChatWindow, chatTab: ChatTab, component: MutableComponent, addedTime: number, tag: GuiMessageTag, linkedMessage: ChatPlusGuiMessage, maxWidth: number, addMessage: boolean, filtered: boolean): ChatTabAddDisplayMessageEvent;
    static copy$default(chatTabAddDisplayMessageEvent: ChatTabAddDisplayMessageEvent, addDisplayMessageType: AddDisplayMessageType, chatWindow: ChatWindow, chatTab: ChatTab, mutableComponent: MutableComponent, n: number, guiMessageTag: GuiMessageTag, chatPlusGuiMessage: ChatPlusGuiMessage, n2: number, bl: boolean, bl2: boolean, n3: number, object: any): ChatTabAddDisplayMessageEvent;
    equals(other: any): boolean;
    get addDisplayMessageType(): AddDisplayMessageType;
    get addMessage(): boolean;
    get addedTime(): number;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get component(): MutableComponent;
    get filtered(): boolean;
    get linkedMessage(): ChatPlusGuiMessage;
    get maxWidth(): number;
    get tag(): GuiMessageTag;
    hashCode(): number;
    set addMessage(bl: boolean);
    set filtered(bl: boolean);
    set maxWidth(n: number);
    toString(): string;
  }


  interface ChatTabAddNewMessageEvent extends Event {}
  class ChatTabAddNewMessageEvent extends Event {
    constructor(addNewMessageEvent: AddNewMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, mutableComponent: MutableComponent, rawComponent: Component, signature: MessageSignature, addedTime: number, tag: GuiMessageTag, returnFunction: boolean);

    constructor(addNewMessageEvent: AddNewMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, mutableComponent: MutableComponent, component: Component, messageSignature: MessageSignature, n: number, guiMessageTag: GuiMessageTag, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): AddNewMessageEvent;
    component10(): boolean;
    component2(): ChatWindow;
    component3(): ChatTab;
    component4(): ChatPlusGuiMessage;
    component5(): MutableComponent;
    component6(): Component;
    component7(): MessageSignature;
    component8(): number;
    component9(): GuiMessageTag;
    copy(addNewMessageEvent: AddNewMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, mutableComponent: MutableComponent, rawComponent: Component, signature: MessageSignature, addedTime: number, tag: GuiMessageTag, returnFunction: boolean): ChatTabAddNewMessageEvent;
    static copy$default(chatTabAddNewMessageEvent: ChatTabAddNewMessageEvent, addNewMessageEvent: AddNewMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, mutableComponent: MutableComponent, component: Component, messageSignature: MessageSignature, n: number, guiMessageTag: GuiMessageTag, bl: boolean, n2: number, object: any): ChatTabAddNewMessageEvent;
    equals(other: any): boolean;
    get addNewMessageEvent(): AddNewMessageEvent;
    get addedTime(): number;
    get chatPlusGuiMessage(): ChatPlusGuiMessage;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get mutableComponent(): MutableComponent;
    get rawComponent(): Component;
    get returnFunction(): boolean;
    get signature(): MessageSignature;
    get tag(): GuiMessageTag;
    hashCode(): number;
    set mutableComponent(mutableComponent: MutableComponent);
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatTabGetMessageAtEvent extends Event {}
  class ChatTabGetMessageAtEvent extends Event {
    constructor(chatTab: ChatTab, messageAtType: MessageAtType, chatWindow: ChatWindow, mouseOperators: OperatorXY[], chatOperators: OperatorXY[], finalMouse: ValuesXY, finalChat: ValuesXY, returnFunction: boolean);

    constructor(chatTab: ChatTab, messageAtType: MessageAtType, chatWindow: ChatWindow, list: List, list2: List, valuesXY: ValuesXY, valuesXY2: ValuesXY, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    addChatOperator(operator: OperatorXY): void;
    addMouseOperator(operator: OperatorXY): void;
    calculateFinalPositions(mX: number, mY: number): void;
    component1(): ChatTab;
    component2(): MessageAtType;
    component3(): ChatWindow;
    component4(): OperatorXY[];
    component5(): OperatorXY[];
    component6(): ValuesXY;
    component7(): ValuesXY;
    component8(): boolean;
    copy(chatTab: ChatTab, messageAtType: MessageAtType, chatWindow: ChatWindow, mouseOperators: OperatorXY[], chatOperators: OperatorXY[], finalMouse: ValuesXY, finalChat: ValuesXY, returnFunction: boolean): ChatTabGetMessageAtEvent;
    static copy$default(chatTabGetMessageAtEvent: ChatTabGetMessageAtEvent, chatTab: ChatTab, messageAtType: MessageAtType, chatWindow: ChatWindow, list: List, list2: List, valuesXY: ValuesXY, valuesXY2: ValuesXY, bl: boolean, n: number, object: any): ChatTabGetMessageAtEvent;
    equals(other: any): boolean;
    get chatOperators(): OperatorXY[];
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get finalChat(): ValuesXY;
    get finalMouse(): ValuesXY;
    get messageAtType(): MessageAtType;
    get mouseOperators(): OperatorXY[];
    get returnFunction(): boolean;
    hashCode(): number;
    set chatOperators(list: OperatorXY[]);
    set finalChat(valuesXY: ValuesXY);
    set finalMouse(valuesXY: ValuesXY);
    set mouseOperators(list: OperatorXY[]);
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatTabRefreshDisplayMessages extends Event {}
  class ChatTabRefreshDisplayMessages extends Event {
    constructor(chatWindow: ChatWindow, chatTab: ChatTab, rescale: boolean, predicates: Predicate<ChatPlusGuiMessage>[]);

    constructor(chatWindow: ChatWindow, chatTab: ChatTab, bl: boolean, list: List, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatWindow;
    component2(): ChatTab;
    component3(): boolean;
    component4(): Predicate<ChatPlusGuiMessage>[];
    copy(chatWindow: ChatWindow, chatTab: ChatTab, rescale: boolean, predicates: Predicate<ChatPlusGuiMessage>[]): ChatTabRefreshDisplayMessages;
    static copy$default(chatTabRefreshDisplayMessages: ChatTabRefreshDisplayMessages, chatWindow: ChatWindow, chatTab: ChatTab, bl: boolean, list: List, n: number, object: any): ChatTabRefreshDisplayMessages;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get predicates(): Predicate<ChatPlusGuiMessage>[];
    get rescale(): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ChatTabRemoveDisplayMessageEvent extends Event {}
  class ChatTabRemoveDisplayMessageEvent extends Event {
    constructor(chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, returnFunction: boolean);

    constructor(chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatWindow;
    component2(): ChatTab;
    component3(): ChatPlusGuiMessageLine;
    component4(): boolean;
    copy(chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, returnFunction: boolean): ChatTabRemoveDisplayMessageEvent;
    static copy$default(chatTabRemoveDisplayMessageEvent: ChatTabRemoveDisplayMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, bl: boolean, n: number, object: any): ChatTabRemoveDisplayMessageEvent;
    equals(other: any): boolean;
    get chatPlusGuiMessageLine(): ChatPlusGuiMessageLine;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get returnFunction(): boolean;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatTabRemoveMessageEvent extends Event {}
  class ChatTabRemoveMessageEvent extends Event {
    constructor(chatWindow: ChatWindow, chatTab: ChatTab, guiMessage: ChatPlusGuiMessage, returnFunction: boolean);

    constructor(chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatWindow;
    component2(): ChatTab;
    component3(): ChatPlusGuiMessage;
    component4(): boolean;
    copy(chatWindow: ChatWindow, chatTab: ChatTab, guiMessage: ChatPlusGuiMessage, returnFunction: boolean): ChatTabRemoveMessageEvent;
    static copy$default(chatTabRemoveMessageEvent: ChatTabRemoveMessageEvent, chatWindow: ChatWindow, chatTab: ChatTab, chatPlusGuiMessage: ChatPlusGuiMessage, bl: boolean, n: number, object: any): ChatTabRemoveMessageEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    get guiMessage(): ChatPlusGuiMessage;
    get returnFunction(): boolean;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatTabRescale extends Event {}
  class ChatTabRescale extends Event {
    constructor(chatWindow: ChatWindow, chatTab: ChatTab);
    component1(): ChatWindow;
    component2(): ChatTab;
    copy(chatWindow: ChatWindow, chatTab: ChatTab): ChatTabRescale;
    static copy$default(chatTabRescale: ChatTabRescale, chatWindow: ChatWindow, chatTab: ChatTab, n: number, object: any): ChatTabRescale;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    hashCode(): number;
    toString(): string;
  }


  interface ChatTabRewrapDisplayMessages extends Event {}
  class ChatTabRewrapDisplayMessages extends Event {
    constructor(chatWindow: ChatWindow, chatTab: ChatTab);
    component1(): ChatWindow;
    component2(): ChatTab;
    copy(chatWindow: ChatWindow, chatTab: ChatTab): ChatTabRewrapDisplayMessages;
    static copy$default(chatTabRewrapDisplayMessages: ChatTabRewrapDisplayMessages, chatWindow: ChatWindow, chatTab: ChatTab, n: number, object: any): ChatTabRewrapDisplayMessages;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get chatWindow(): ChatWindow;
    hashCode(): number;
    toString(): string;
  }


  class ChatTabsManagerKt {
    static readonly CHAT_TAB_HEIGHT: number;
    static readonly CHAT_TAB_Y_OFFSET: number;
    static readonly CHAT_TAB_X_SPACE: number;
  }


  class MessageAtResult {
    constructor(messageAtEvent: ChatTabGetMessageAtEvent, messageLine: ChatPlusGuiMessageLine);
    component1(): ChatTabGetMessageAtEvent;
    component2(): ChatPlusGuiMessageLine;
    copy(messageAtEvent: ChatTabGetMessageAtEvent, messageLine: ChatPlusGuiMessageLine): MessageAtResult;
    static copy$default(messageAtResult: MessageAtResult, chatTabGetMessageAtEvent: ChatTabGetMessageAtEvent, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, n: number, object: any): MessageAtResult;
    equals(other: any): boolean;
    get messageAtEvent(): ChatTabGetMessageAtEvent;
    get messageLine(): ChatPlusGuiMessageLine;
    hashCode(): number;
    toString(): string;
  }


  interface MessageAtType extends Enum<MessageAtType> {}
  class MessageAtType extends Enum<MessageAtType> {
    static readonly HOVER: MessageAtType;
    static readonly COMPONENT: MessageAtType;
    static readonly INDEX: MessageAtType;
    static readonly ADJUSTED: MessageAtType;
    static get entries(): EnumEntries<MessageAtType>;
    static valueOf(value: string): MessageAtType;
    static values(): MessageAtType[];
  }


  class OperatorXY {
    apply(var1: ValuesXY, var2: ValuesXY): void;
  }


  class ServerChatTabCommandSuggestion {
    static readonly Companion: Companion;
    constructor(commandMatcher: MessageFilter, suggestionMatcher: MessageFilter, mode: SuggestionMode);

    constructor(messageFilter: MessageFilter, messageFilter2: MessageFilter, suggestionMode: SuggestionMode, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, commandMatcher: MessageFilter, suggestionMatcher: MessageFilter, mode: SuggestionMode, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): KSerializer[];
    clone(): ServerChatTabCommandSuggestion;
    component1(): MessageFilter;
    component2(): MessageFilter;
    component3(): SuggestionMode;
    copy(commandMatcher: MessageFilter, suggestionMatcher: MessageFilter, mode: SuggestionMode): ServerChatTabCommandSuggestion;
    static copy$default(serverChatTabCommandSuggestion: ServerChatTabCommandSuggestion, messageFilter: MessageFilter, messageFilter2: MessageFilter, suggestionMode: SuggestionMode, n: number, object: any): ServerChatTabCommandSuggestion;
    equals(other: any): boolean;
    get commandMatcher(): MessageFilter;
    get mode(): SuggestionMode;
    get suggestionMatcher(): MessageFilter;
    hashCode(): number;
    set mode(suggestionMode: SuggestionMode);
    toString(): string;
    updateRegex(): void;
    static write$Self$chatplus_common(self: ServerChatTabCommandSuggestion, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class ServerChatTabNotificationSettings {
    static readonly Companion: com_ebicep_chatplus_features_chattabs_serverchattabnotificationsettings_Companion;
    constructor(disableNotifications: boolean, notificationMatch: MessageFilterFormatted);

    constructor(bl: boolean, messageFilterFormatted: MessageFilterFormatted, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, disableNotifications: boolean, notificationMatch: MessageFilterFormatted, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    clone(): ServerChatTabNotificationSettings;
    component1(): boolean;
    component2(): MessageFilterFormatted;
    copy(disableNotifications: boolean, notificationMatch: MessageFilterFormatted): ServerChatTabNotificationSettings;
    static copy$default(serverChatTabNotificationSettings: ServerChatTabNotificationSettings, bl: boolean, messageFilterFormatted: MessageFilterFormatted, n: number, object: any): ServerChatTabNotificationSettings;
    equals(other: any): boolean;
    get disableNotifications(): boolean;
    get notificationMatch(): MessageFilterFormatted;
    hashCode(): number;
    set disableNotifications(bl: boolean);
    set notificationMatch(messageFilterFormatted: MessageFilterFormatted);
    toString(): string;
    static write$Self$chatplus_common(self: ServerChatTabNotificationSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  interface SkipNewMessageEvent extends Event {}
  class SkipNewMessageEvent extends Event {
    constructor(mutableComponent: MutableComponent, rawComponent: Component, senderUUID: UUID, signature: MessageSignature, addedTime: number, tag: GuiMessageTag);
    component1(): MutableComponent;
    component2(): Component;
    component3(): UUID;
    component4(): MessageSignature;
    component5(): number;
    component6(): GuiMessageTag;
    copy(mutableComponent: MutableComponent, rawComponent: Component, senderUUID: UUID, signature: MessageSignature, addedTime: number, tag: GuiMessageTag): SkipNewMessageEvent;
    static copy$default(skipNewMessageEvent: SkipNewMessageEvent, mutableComponent: MutableComponent, component: Component, uUID: UUID, messageSignature: MessageSignature, n: number, guiMessageTag: GuiMessageTag, n2: number, object: any): SkipNewMessageEvent;
    equals(other: any): boolean;
    get addedTime(): number;
    get mutableComponent(): MutableComponent;
    get rawComponent(): Component;
    get senderUUID(): UUID;
    get signature(): MessageSignature;
    get tag(): GuiMessageTag;
    hashCode(): number;
    set mutableComponent(mutableComponent: MutableComponent);
    set senderUUID(uUID: UUID);
    toString(): string;
  }


  class TabNotificationSettings {
    static readonly Companion: com_ebicep_chatplus_features_chattabs_tabnotificationsettings_Companion;
    constructor(enabled: boolean, showCount: boolean, countColor: number, scale: number);

    constructor(bl: boolean, bl2: boolean, n: number, f: number, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, enabled: boolean, showCount: boolean, countColor: number, scale: number, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    component1(): boolean;
    component2(): boolean;
    component3(): number;
    component4(): number;
    copy(enabled: boolean, showCount: boolean, countColor: number, scale: number): TabNotificationSettings;
    static copy$default(tabNotificationSettings: TabNotificationSettings, bl: boolean, bl2: boolean, n: number, f: number, n2: number, object: any): TabNotificationSettings;
    equals(other: any): boolean;
    get countColor(): number;
    get enabled(): boolean;
    get scale(): number;
    get showCount(): boolean;
    hashCode(): number;
    set countColor(n: number);
    set enabled(bl: boolean);
    set scale(f: number);
    set showCount(bl: boolean);
    toString(): string;
    static write$Self$chatplus_common(self: TabNotificationSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class ValuesXY {
    constructor(x: number, y: number);
    component1(): number;
    component2(): number;
    copy(x: number, y: number): ValuesXY;
    static copy$default(valuesXY: ValuesXY, d: number, d2: number, n: number, object: any): ValuesXY;
    equals(other: any): boolean;
    get x(): number;
    get y(): number;
    hashCode(): number;
    set x(d: number);
    set y(d: number);
    toString(): string;
  }

}

declare module 'com.ebicep.chatplus.features.chattabs.ServerChatTabCommandSuggestion' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { ServerChatTabCommandSuggestion } from 'com.ebicep.chatplus.features.chattabs';
  import { Enum } from 'java.lang';
  import { EnumTranslatableName } from 'com.ebicep.chatplus.config';
  import { Companion as com_ebicep_chatplus_features_chattabs_serverchattabcommandsuggestion_suggestionmode_Companion } from 'com.ebicep.chatplus.features.chattabs.ServerChatTabCommandSuggestion.SuggestionMode';
  import { Component } from 'net.minecraft.network.chat';
  import { EnumEntries } from 'kotlin.enums';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<ServerChatTabCommandSuggestion>;
  }


  interface SuggestionMode extends EnumTranslatableName, Enum<SuggestionMode> {}
  class SuggestionMode extends EnumTranslatableName {
    static readonly Companion: com_ebicep_chatplus_features_chattabs_serverchattabcommandsuggestion_suggestionmode_Companion;
    static readonly FILTER: SuggestionMode;
    static readonly SORT: SuggestionMode;
    static get entries(): EnumEntries<SuggestionMode>;
    get key(): string;
    get translatable(): Component;
    get translatableName(): Component;
    static valueOf(value: string): SuggestionMode;
    static values(): SuggestionMode[];
  }

}

declare module 'com.ebicep.chatplus.features.chattabs.ServerChatTabCommandSuggestion.SuggestionMode' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { SuggestionMode } from 'com.ebicep.chatplus.features.chattabs.ServerChatTabCommandSuggestion';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<SuggestionMode>;
  }

}

declare module 'com.ebicep.chatplus.features.chattabs.ServerChatTabNotificationSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { ServerChatTabNotificationSettings } from 'com.ebicep.chatplus.features.chattabs';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<ServerChatTabNotificationSettings>;
  }

}

declare module 'com.ebicep.chatplus.features.chattabs.TabNotificationSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { TabNotificationSettings } from 'com.ebicep.chatplus.features.chattabs';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<TabNotificationSettings>;
  }

}

declare module 'com.ebicep.chatplus.features.chatwindows' {
  import { ChatTab, AutoTabCreator } from 'com.ebicep.chatplus.features.chattabs';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Companion } from 'com.ebicep.chatplus.features.chatwindows.ChatWindow';
  import { ChatRenderer } from 'com.ebicep.chatplus.hud';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Companion as com_ebicep_chatplus_features_chatwindows_generalsettings_Companion } from 'com.ebicep.chatplus.features.chatwindows.GeneralSettings';
  import { Alignment } from 'AlignMessage';
  import { MessageDirection } from 'com.ebicep.chatplus.config';
  import { KSerializer } from 'kotlinx.serialization';
  import { Companion as com_ebicep_chatplus_features_chatwindows_padding_Companion } from 'com.ebicep.chatplus.features.chatwindows.Padding';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class ChatTabClickedEvent {
    constructor(chatTab: ChatTab, mouseX: number, mouseY: number, tabXStart: number, tabYStart: number);
    component1(): ChatTab;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    copy(chatTab: ChatTab, mouseX: number, mouseY: number, tabXStart: number, tabYStart: number): ChatTabClickedEvent;
    static copy$default(chatTabClickedEvent: ChatTabClickedEvent, chatTab: ChatTab, d: number, d2: number, d3: number, d4: number, n: number, object: any): ChatTabClickedEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get mouseX(): number;
    get mouseY(): number;
    get tabXStart(): number;
    get tabYStart(): number;
    hashCode(): number;
    toString(): string;
  }


  class ChatTabRenderEvent {
    constructor(guiGraphics: GuiGraphics, chatTab: ChatTab, tabWidth: number, xStart: number, yStart: number);
    component1(): GuiGraphics;
    component2(): ChatTab;
    component3(): number;
    component4(): number;
    component5(): number;
    copy(guiGraphics: GuiGraphics, chatTab: ChatTab, tabWidth: number, xStart: number, yStart: number): ChatTabRenderEvent;
    static copy$default(chatTabRenderEvent: ChatTabRenderEvent, guiGraphics: GuiGraphics, chatTab: ChatTab, n: number, n2: number, n3: number, n4: number, object: any): ChatTabRenderEvent;
    equals(other: any): boolean;
    get chatTab(): ChatTab;
    get guiGraphics(): GuiGraphics;
    get tabWidth(): number;
    get xStart(): number;
    get yStart(): number;
    hashCode(): number;
    set xStart(n: number);
    set yStart(n: number);
    toString(): string;
  }


  class ChatTabSwitchEvent {
    constructor(oldTab: ChatTab, newTab: ChatTab);
    component1(): ChatTab;
    component2(): ChatTab;
    copy(oldTab: ChatTab, newTab: ChatTab): ChatTabSwitchEvent;
    static copy$default(chatTabSwitchEvent: ChatTabSwitchEvent, chatTab: ChatTab, chatTab2: ChatTab, n: number, object: any): ChatTabSwitchEvent;
    equals(other: any): boolean;
    get newTab(): ChatTab;
    get oldTab(): ChatTab;
    hashCode(): number;
    toString(): string;
  }


  class ChatWindow {
    static readonly Companion: Companion;
    constructor();

    constructor(seen0: number, generalSettings: GeneralSettings, outlineSettings: OutlineSettings, padding: Padding, renderer: ChatRenderer, tabSettings: TabSettings, autoTabCreator: AutoTabCreator, serializationConstructorMarker: SerializationConstructorMarker);
    clone(): ChatWindow;
    get autoTabCreator(): AutoTabCreator;
    get generalSettings(): GeneralSettings;
    get outlineSettings(): OutlineSettings;
    get padding(): Padding;
    get renderer(): ChatRenderer;
    get tabSettings(): TabSettings;
    set autoTabCreator(autoTabCreator: AutoTabCreator);
    set generalSettings(generalSettings: GeneralSettings);
    set outlineSettings(outlineSettings: OutlineSettings);
    set padding(padding: Padding);
    set renderer(chatRenderer: ChatRenderer);
    set tabSettings(tabSettings: TabSettings);
    toString(): string;
    updateWindowReference(): void;
    static write$Self$chatplus_common(self: ChatWindow, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class GeneralSettings {
    static readonly Companion: com_ebicep_chatplus_features_chatwindows_generalsettings_Companion;
    chatWindow: ChatWindow;
    constructor();

    constructor(seen0: number, disabled: boolean, backgroundColor: number, unfocusedBackgroundColorOpacityMultiplier: number, scale: number, textOpacity: number, textShadow: boolean, unfocusedTextOpacityMultiplier: number, unfocusedHeight: number, lineSpacing: number, messageAlignment: Alignment, messageDirection: MessageDirection, topDownDirectionWrapInOrder: boolean, resetScrollPositionOnClose: boolean, serializationConstructorMarker: SerializationConstructorMarker);
    static access$get$childSerializers$cp(): KSerializer[];
    clone(): GeneralSettings;
    get backgroundColor(): number;
    get chatWindow(): ChatWindow;
    static get chatWindow$annotations(): void;
    get disabled(): boolean;
    get lineSpacing(): number;
    get messageAlignment(): Alignment;
    get messageDirection(): MessageDirection;
    get resetScrollPositionOnClose(): boolean;
    get scale(): number;
    get textOpacity(): number;
    get textShadow(): boolean;
    get topDownDirectionWrapInOrder(): boolean;
    get unfocusedBackgroundColorOpacityMultiplier(): number;
    get unfocusedHeight(): number;
    get unfocusedTextOpacityMultiplier(): number;
    get updatedBackgroundColor(): number;
    get updatedTextOpacity(): number;
    set backgroundColor(n: number);
    set chatWindow(chatWindow: ChatWindow);
    set disabled(bl: boolean);
    set lineSpacing(f: number);
    set messageAlignment(alignment: Alignment);
    set messageDirection(messageDirection: MessageDirection);
    set resetScrollPositionOnClose(bl: boolean);
    set scale(f: number);
    set textOpacity(f: number);
    set textShadow(bl: boolean);
    set topDownDirectionWrapInOrder(bl: boolean);
    set unfocusedBackgroundColorOpacityMultiplier(f: number);
    set unfocusedHeight(f: number);
    set unfocusedTextOpacityMultiplier(f: number);
    static write$Self$chatplus_common(self: GeneralSettings, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class OutlineSettingsKt {
  }


  class Padding {
    static readonly Companion: com_ebicep_chatplus_features_chatwindows_padding_Companion;
    constructor(left: number, right: number, bottom: number);

    constructor(n: number, n2: number, n3: number, n4: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, left: number, right: number, bottom: number, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    clone(): Padding;
    component1(): number;
    component2(): number;
    component3(): number;
    copy(left: number, right: number, bottom: number): Padding;
    static copy$default(padding: Padding, n: number, n2: number, n3: number, n4: number, object: any): Padding;
    equals(other: any): boolean;
    get bottom(): number;
    get left(): number;
    get right(): number;
    hashCode(): number;
    set bottom(n: number);
    set left(n: number);
    set right(n: number);
    toString(): string;
    static write$Self$chatplus_common(self: Padding, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class RenderWindowsPostEvent {
    constructor(guiGraphics: GuiGraphics);
    component1(): GuiGraphics;
    copy(guiGraphics: GuiGraphics): RenderWindowsPostEvent;
    static copy$default(renderWindowsPostEvent: RenderWindowsPostEvent, guiGraphics: GuiGraphics, n: number, object: any): RenderWindowsPostEvent;
    equals(other: any): boolean;
    get guiGraphics(): GuiGraphics;
    hashCode(): number;
    toString(): string;
  }


  class RenderWindowsPreEvent {
    constructor(guiGraphics: GuiGraphics);
    component1(): GuiGraphics;
    copy(guiGraphics: GuiGraphics): RenderWindowsPreEvent;
    static copy$default(renderWindowsPreEvent: RenderWindowsPreEvent, guiGraphics: GuiGraphics, n: number, object: any): RenderWindowsPreEvent;
    equals(other: any): boolean;
    get guiGraphics(): GuiGraphics;
    hashCode(): number;
    toString(): string;
  }


  class WindowSwitchEvent {
    constructor(oldWindow: ChatWindow, newWindow: ChatWindow);
    component1(): ChatWindow;
    component2(): ChatWindow;
    copy(oldWindow: ChatWindow, newWindow: ChatWindow): WindowSwitchEvent;
    static copy$default(windowSwitchEvent: WindowSwitchEvent, chatWindow: ChatWindow, chatWindow2: ChatWindow, n: number, object: any): WindowSwitchEvent;
    equals(other: any): boolean;
    get newWindow(): ChatWindow;
    get oldWindow(): ChatWindow;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.ebicep.chatplus.features.chatwindows.ChatWindow' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { ChatWindow } from 'com.ebicep.chatplus.features.chatwindows';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<ChatWindow>;
  }

}

declare module 'com.ebicep.chatplus.features.chatwindows.GeneralSettings' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { GeneralSettings } from 'com.ebicep.chatplus.features.chatwindows';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<GeneralSettings>;
  }

}

declare module 'com.ebicep.chatplus.features.chatwindows.Padding' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { Padding } from 'com.ebicep.chatplus.features.chatwindows';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<Padding>;
  }

}

declare module 'com.ebicep.chatplus.features.internal' {
  import { Companion } from 'com.ebicep.chatplus.features.internal.MessageFilter';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { Regex, MatchResult } from 'kotlin.text';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Companion as com_ebicep_chatplus_features_internal_messagefilterformatted_Companion } from 'com.ebicep.chatplus.features.internal.MessageFilterFormatted';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Component } from 'net.minecraft.network.chat';
  import { ChatPlusGuiMessageLine } from 'ChatTab';
  import { Companion as com_ebicep_chatplus_features_internal_messagefilterwithstring_Companion } from 'com.ebicep.chatplus.features.internal.MessageFilterWithString';
  import { Event } from 'com.ebicep.chatplus.events';
  import { List } from 'java.util';

  class FeatureManager {
    static readonly INSTANCE: FeatureManager;
  }


  class MessageFilter {
    static readonly Companion: Companion;
    constructor(pattern: string);

    constructor(seen0: number, pattern: string, serializationConstructorMarker: SerializationConstructorMarker);
    get pattern(): string;
    get regex(): Regex;
    static get regex$annotations(): void;
    matches(message: string): boolean;
    set pattern(value: string);
    set regex(regex: Regex);
    updateRegex(): void;
    static write$Self(self: MessageFilter, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  interface MessageFilterFormatted extends MessageFilter {}
  class MessageFilterFormatted extends MessageFilter {
    static readonly Companion: com_ebicep_chatplus_features_internal_messagefilterformatted_Companion;
    constructor(pattern: string, formatted: boolean);

    constructor(string: string, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(seen0: number, pattern: string, formatted: boolean, serializationConstructorMarker: SerializationConstructorMarker);
    find(message: string): MatchResult;
    get formatted(): boolean;
    matches(message: string, coloredMessage: string): boolean;
    matches(message: Component): boolean;
    matches(message: ChatPlusGuiMessageLine): boolean;
    matches(message: string): boolean;
    set formatted(bl: boolean);
    static write$Self(self: MessageFilterFormatted, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
    static write$Self(self: MessageFilter, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  interface MessageFilterWithString extends MessageFilter {}
  class MessageFilterWithString extends MessageFilter {
    static readonly Companion: com_ebicep_chatplus_features_internal_messagefilterwithstring_Companion;
    constructor(pattern: string, str: string);

    constructor(seen0: number, pattern: string, str: string, serializationConstructorMarker: SerializationConstructorMarker);
    get str(): string;
    set str(string: string);
    static write$Self(self: MessageFilterWithString, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
    static write$Self(self: MessageFilter, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  interface OnScreenDisplayEvent extends Event {}
  class OnScreenDisplayEvent extends Event {
    constructor(components: Component[]);

    constructor(list: List, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    component1(): Component[];
    copy(components: Component[]): OnScreenDisplayEvent;
    static copy$default(onScreenDisplayEvent: OnScreenDisplayEvent, list: List, n: number, object: any): OnScreenDisplayEvent;
    equals(other: any): boolean;
    get components(): Component[];
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.ebicep.chatplus.features.internal.MessageFilter' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { MessageFilter } from 'com.ebicep.chatplus.features.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<MessageFilter>;
  }

}

declare module 'com.ebicep.chatplus.features.internal.MessageFilterFormatted' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { MessageFilterFormatted } from 'com.ebicep.chatplus.features.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<MessageFilterFormatted>;
  }

}

declare module 'com.ebicep.chatplus.features.internal.MessageFilterWithString' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { MessageFilterWithString } from 'com.ebicep.chatplus.features.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<MessageFilterWithString>;
  }

}

declare module 'com.ebicep.chatplus.features.speechtotext' {
  import { Companion } from 'com.ebicep.chatplus.features.speechtotext.ALMicrophone';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Companion as com_ebicep_chatplus_features_speechtotext_javaxmicrophone_Companion } from 'com.ebicep.chatplus.features.speechtotext.JavaxMicrophone';
  import { TargetDataLine } from 'javax.sound.sampled';
  import { Exception } from 'java.lang';

  interface ALMicrophone extends Microphone {}
  class ALMicrophone extends Microphone {
    static readonly Companion: Companion;
    constructor(sampleRate: number, bufferSize: number, device: string, line: number);

    constructor(n: number, n2: number, string: string, l: number, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    close(): void;
    dataAvailable(): number;
    isActive(): boolean;
    isOpen(): boolean;
    open(): void;
    read(): number[];
    startRecording(): void;
    stopRecording(): void;
  }


  class ALMicrophoneKt {
    static checkALCError(device: number): boolean;
    static getALCError(i: number): string;
  }


  interface JavaxMicrophone extends Microphone {}
  class JavaxMicrophone extends Microphone {
    static readonly Companion: com_ebicep_chatplus_features_speechtotext_javaxmicrophone_Companion;
    constructor(sampleRate: number, device: string, dataLine: TargetDataLine);

    constructor(n: number, string: string, targetDataLine: TargetDataLine, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    close(): void;
    dataAvailable(): number;
    isActive(): boolean;
    isOpen(): boolean;
    open(): void;
    read(): number[];
    startRecording(): void;
    stopRecording(): void;
  }


  class Microphone {
    close(): void;
    dataAvailable(): number;
    isActive(): boolean;
    isOpen(): boolean;
    open(): void;
    read(): number[];
    startRecording(): void;
    stopRecording(): void;
  }


  interface MicrophoneException extends Exception {}
  class MicrophoneException extends Exception {
    constructor(message: string);
    get message(): string;
  }

}

declare module 'com.ebicep.chatplus.features.speechtotext.ALMicrophone' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { List } from 'java.util';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get microphoneNames(): string[];
  }

}

declare module 'com.ebicep.chatplus.features.speechtotext.JavaxMicrophone' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { List } from 'java.util';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get microphoneNames(): string[];
  }

}

declare module 'com.ebicep.chatplus.features.textbarelements' {
  import { Event } from 'com.ebicep.chatplus.events';
  import { ChatScreen } from 'net.minecraft.client.gui.screens';
  import { List } from 'java.util';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ChatScreenMouseClickedEvent } from 'com.ebicep.chatplus.hud';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { ScreenshotSettings } from 'ScreenshotChat';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  interface AddTextBarElementEvent extends Event {}
  class AddTextBarElementEvent extends Event {
    constructor(screen: ChatScreen, elements: TextBarElement[]);
    component1(): ChatScreen;
    component2(): TextBarElement[];
    copy(screen: ChatScreen, elements: TextBarElement[]): AddTextBarElementEvent;
    static copy$default(addTextBarElementEvent: AddTextBarElementEvent, chatScreen: ChatScreen, list: List, n: number, object: any): AddTextBarElementEvent;
    equals(other: any): boolean;
    get elements(): TextBarElement[];
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface FindTextBarElement extends TextBarElement {}
  class FindTextBarElement extends TextBarElement {
    constructor(chatPlusScreen: ChatScreen);
    drawCenteredString(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    fill(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    get paddedWidth(): number;
    get text(): string;
    get width(): number;
    init(): void;
    onClick(button: number): void;
    onClickEvent(event: ChatScreenMouseClickedEvent): void;
    onHover(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number): void;
    onRender(guiGraphics: GuiGraphics, currentX: number, currentY: number, mouseX: number, mouseY: number, partialTick: number): void;
    renderOutline(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    tooltip(translatable: string): FormattedCharSequence[];
  }


  interface FindToggleEvent extends Event {}
  class FindToggleEvent extends Event {
    constructor(enabled: boolean);
    component1(): boolean;
    copy(enabled: boolean): FindToggleEvent;
    static copy$default(findToggleEvent: FindToggleEvent, bl: boolean, n: number, object: any): FindToggleEvent;
    equals(other: any): boolean;
    get enabled(): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface MovableChatToggleTextBarElement extends TextBarElement {}
  class MovableChatToggleTextBarElement extends TextBarElement {
    constructor(chatPlusScreen: ChatScreen);
    drawCenteredString(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    fill(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    get paddedWidth(): number;
    get text(): string;
    get width(): number;
    init(): void;
    onClick(button: number): void;
    onClickEvent(event: ChatScreenMouseClickedEvent): void;
    onHover(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number): void;
    onRender(guiGraphics: GuiGraphics, currentX: number, currentY: number, mouseX: number, mouseY: number, partialTick: number): void;
    renderOutline(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    tooltip(translatable: string): FormattedCharSequence[];
  }


  interface ScreenShotChatEvent extends Event {}
  class ScreenShotChatEvent extends Event {
    constructor(screenshotSettings: ScreenshotSettings);

    constructor(screenshotSettings: ScreenshotSettings, n: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    get screenshotSettings(): ScreenshotSettings;
  }


  interface SendNoteEvent extends Event {}
  class SendNoteEvent extends Event {
    constructor(message: string);
    component1(): string;
    copy(message: string): SendNoteEvent;
    static copy$default(sendNoteEvent: SendNoteEvent, string: string, n: number, object: any): SendNoteEvent;
    equals(other: any): boolean;
    get message(): string;
    hashCode(): number;
    toString(): string;
  }


  interface ShowBookmarksBarElement extends TextBarElement {}
  class ShowBookmarksBarElement extends TextBarElement {
    constructor(chatPlusScreen: ChatScreen);
    drawCenteredString(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    fill(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    get paddedWidth(): number;
    get text(): string;
    get width(): number;
    init(): void;
    onClick(button: number): void;
    onClickEvent(event: ChatScreenMouseClickedEvent): void;
    onHover(guiGraphics: GuiGraphics, pMouseX: number, pMouseY: number): void;
    onRender(guiGraphics: GuiGraphics, currentX: number, currentY: number, mouseX: number, mouseY: number, partialTick: number): void;
    renderOutline(guiGraphics: GuiGraphics, currentX: number, currentY: number, color: number): void;
    tooltip(translatable: string): FormattedCharSequence[];
  }


  interface ShowBookmarksToggleEvent extends Event {}
  class ShowBookmarksToggleEvent extends Event {
    constructor(enabled: boolean);
    component1(): boolean;
    copy(enabled: boolean): ShowBookmarksToggleEvent;
    static copy$default(showBookmarksToggleEvent: ShowBookmarksToggleEvent, bl: boolean, n: number, object: any): ShowBookmarksToggleEvent;
    equals(other: any): boolean;
    get enabled(): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface TranslateToggleEvent extends Event {}
  class TranslateToggleEvent extends Event {
    constructor(enabled: boolean);
    component1(): boolean;
    copy(enabled: boolean): TranslateToggleEvent;
    static copy$default(translateToggleEvent: TranslateToggleEvent, bl: boolean, n: number, object: any): TranslateToggleEvent;
    equals(other: any): boolean;
    get enabled(): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'com.ebicep.chatplus.hud' {
  import { Event } from 'com.ebicep.chatplus.events';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ChatWindow } from 'com.ebicep.chatplus.features.chatwindows';
  import { ChatPlusGuiMessageLine } from 'ChatTab';
  import { Line } from 'GuiMessage';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { ChatScreen } from 'net.minecraft.client.gui.screens';
  import { Key } from 'InputConstants';
  import { KeyWithModifier } from 'com.ebicep.chatplus.config.serializers';
  import { List } from 'java.util';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  class ChatManagerKt {
    static readonly MIN_HEIGHT: number;
    static readonly MIN_WIDTH: number;
  }


  interface ChatRenderLineEvent extends Event {}
  class ChatRenderLineEvent extends Event {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, verticalChatOffset: number, verticalTextOffset: number);
    get chatPlusGuiMessageLine(): ChatPlusGuiMessageLine;
    get chatWindow(): ChatWindow;
    get guiGraphics(): GuiGraphics;
    get line(): Line;
    get verticalChatOffset(): number;
    get verticalTextOffset(): number;
  }


  interface ChatRenderLineTextEvent extends ChatRenderLineEvent {}
  class ChatRenderLineTextEvent extends ChatRenderLineEvent {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, fadeOpacity: number, textColor: number, backgroundColor: number, verticalChatOffset: number, verticalTextOffset: number, text: string, index: number);
    get backgroundColor(): number;
    get fadeOpacity(): number;
    get index(): number;
    get text(): string;
    get textColor(): number;
  }


  interface ChatRenderPostLinesEvent extends Event {}
  class ChatRenderPostLinesEvent extends Event {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, displayMessageIndex: number, returnFunction: boolean);

    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, n: number, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): GuiGraphics;
    component2(): ChatWindow;
    component3(): number;
    component4(): boolean;
    copy(guiGraphics: GuiGraphics, chatWindow: ChatWindow, displayMessageIndex: number, returnFunction: boolean): ChatRenderPostLinesEvent;
    static copy$default(chatRenderPostLinesEvent: ChatRenderPostLinesEvent, guiGraphics: GuiGraphics, chatWindow: ChatWindow, n: number, bl: boolean, n2: number, object: any): ChatRenderPostLinesEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get displayMessageIndex(): number;
    get guiGraphics(): GuiGraphics;
    get returnFunction(): boolean;
    hashCode(): number;
    set displayMessageIndex(n: number);
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatRenderPreLineAppearanceEvent extends ChatRenderLineEvent {}
  class ChatRenderPreLineAppearanceEvent extends ChatRenderLineEvent {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, chatPlusGuiMessageLine: ChatPlusGuiMessageLine, verticalChatOffset: number, verticalTextOffset: number, textColor: number, backgroundColor: number);
    get backgroundColor(): number;
    get textColor(): number;
    set backgroundColor(n: number);
    set textColor(n: number);
  }


  interface ChatRenderPreLinesEvent extends Event {}
  class ChatRenderPreLinesEvent extends Event {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, chatFocused: boolean, returnFunction: boolean);

    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, bl: boolean, bl2: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): GuiGraphics;
    component2(): ChatWindow;
    component3(): boolean;
    component4(): boolean;
    copy(guiGraphics: GuiGraphics, chatWindow: ChatWindow, chatFocused: boolean, returnFunction: boolean): ChatRenderPreLinesEvent;
    static copy$default(chatRenderPreLinesEvent: ChatRenderPreLinesEvent, guiGraphics: GuiGraphics, chatWindow: ChatWindow, bl: boolean, bl2: boolean, n: number, object: any): ChatRenderPreLinesEvent;
    equals(other: any): boolean;
    get chatFocused(): boolean;
    get chatWindow(): ChatWindow;
    get guiGraphics(): GuiGraphics;
    get returnFunction(): boolean;
    hashCode(): number;
    set chatFocused(bl: boolean);
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatRenderPreLinesRenderEvent extends Event {}
  class ChatRenderPreLinesRenderEvent extends Event {
    constructor(guiGraphics: GuiGraphics, chatWindow: ChatWindow, guiTicks: number);
    component1(): GuiGraphics;
    component2(): ChatWindow;
    component3(): number;
    copy(guiGraphics: GuiGraphics, chatWindow: ChatWindow, guiTicks: number): ChatRenderPreLinesRenderEvent;
    static copy$default(chatRenderPreLinesRenderEvent: ChatRenderPreLinesRenderEvent, guiGraphics: GuiGraphics, chatWindow: ChatWindow, n: number, n2: number, object: any): ChatRenderPreLinesRenderEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get guiGraphics(): GuiGraphics;
    get guiTicks(): number;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenCloseEvent extends Event {}
  class ChatScreenCloseEvent extends Event {
    constructor(screen: ChatScreen);
    component1(): ChatScreen;
    copy(screen: ChatScreen): ChatScreenCloseEvent;
    static copy$default(chatScreenCloseEvent: ChatScreenCloseEvent, chatScreen: ChatScreen, n: number, object: any): ChatScreenCloseEvent;
    equals(other: any): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenInitPostEvent extends Event {}
  class ChatScreenInitPostEvent extends Event {
    constructor(screen: ChatScreen);
    component1(): ChatScreen;
    copy(screen: ChatScreen): ChatScreenInitPostEvent;
    static copy$default(chatScreenInitPostEvent: ChatScreenInitPostEvent, chatScreen: ChatScreen, n: number, object: any): ChatScreenInitPostEvent;
    equals(other: any): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenInitPreEvent extends Event {}
  class ChatScreenInitPreEvent extends Event {
    constructor(screen: ChatScreen);
    component1(): ChatScreen;
    copy(screen: ChatScreen): ChatScreenInitPreEvent;
    static copy$default(chatScreenInitPreEvent: ChatScreenInitPreEvent, chatScreen: ChatScreen, n: number, object: any): ChatScreenInitPreEvent;
    equals(other: any): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenInputBoxEditEvent extends Event {}
  class ChatScreenInputBoxEditEvent extends Event {
    constructor(screen: ChatScreen, str: string, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, string: string, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): string;
    component3(): boolean;
    copy(screen: ChatScreen, str: string, returnFunction: boolean): ChatScreenInputBoxEditEvent;
    static copy$default(chatScreenInputBoxEditEvent: ChatScreenInputBoxEditEvent, chatScreen: ChatScreen, string: string, bl: boolean, n: number, object: any): ChatScreenInputBoxEditEvent;
    equals(other: any): boolean;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    get str(): string;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  class ChatScreenInputEvent {
    constructor(inputEvent: InputEvent);
    checkRelease(keyWithModifier: KeyWithModifier, checkKeyDown: boolean): boolean;
    checkRelease(inputCooldownKey: any, key: Key, checkKeyDown: boolean): boolean;
    checkRelease(inputCooldownKey: any, value: number): boolean;
    static checkRelease$default(chatScreenInputEvent: ChatScreenInputEvent, keyWithModifier: KeyWithModifier, bl: boolean, n: number, object: any): boolean;
    static checkRelease$default(chatScreenInputEvent: ChatScreenInputEvent, object: any, key: Key, bl: boolean, n: number, object2: any): boolean;
    get inputEvent(): InputEvent;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    isRelease(): boolean;
    isRelease(key: Key): boolean;
    isRelease(value: number): boolean;
    set returnFunction(value: boolean);
  }


  interface ChatScreenKeyPressedEvent extends InputEvent {}
  class ChatScreenKeyPressedEvent extends InputEvent {
    constructor(screen: ChatScreen, keyCode: number, scanCode: number, modifiers: number, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, n: number, n2: number, n3: number, bl: boolean, n4: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): boolean;
    copy(screen: ChatScreen, keyCode: number, scanCode: number, modifiers: number, returnFunction: boolean): ChatScreenKeyPressedEvent;
    static copy$default(chatScreenKeyPressedEvent: ChatScreenKeyPressedEvent, chatScreen: ChatScreen, n: number, n2: number, n3: number, bl: boolean, n4: number, object: any): ChatScreenKeyPressedEvent;
    equals(other: any): boolean;
    get keyCode(): number;
    get modifiers(): number;
    get returnFunction(): boolean;
    get scanCode(): number;
    get screen(): ChatScreen;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatScreenKeyReleasedEvent extends InputEvent {}
  class ChatScreenKeyReleasedEvent extends InputEvent {
    constructor(screen: ChatScreen, keyCode: number, scanCode: number, modifiers: number, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, n: number, n2: number, n3: number, bl: boolean, n4: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): boolean;
    copy(screen: ChatScreen, keyCode: number, scanCode: number, modifiers: number, returnFunction: boolean): ChatScreenKeyReleasedEvent;
    static copy$default(chatScreenKeyReleasedEvent: ChatScreenKeyReleasedEvent, chatScreen: ChatScreen, n: number, n2: number, n3: number, bl: boolean, n4: number, object: any): ChatScreenKeyReleasedEvent;
    equals(other: any): boolean;
    get keyCode(): number;
    get modifiers(): number;
    get returnFunction(): boolean;
    get scanCode(): number;
    get screen(): ChatScreen;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatScreenMouseClickedEvent extends InputEvent {}
  class ChatScreenMouseClickedEvent extends InputEvent {
    constructor(screen: ChatScreen, mouseX: number, mouseY: number, button: number, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, d: number, d2: number, n: number, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): boolean;
    copy(screen: ChatScreen, mouseX: number, mouseY: number, button: number, returnFunction: boolean): ChatScreenMouseClickedEvent;
    static copy$default(chatScreenMouseClickedEvent: ChatScreenMouseClickedEvent, chatScreen: ChatScreen, d: number, d2: number, n: number, bl: boolean, n2: number, object: any): ChatScreenMouseClickedEvent;
    equals(other: any): boolean;
    get button(): number;
    get mouseX(): number;
    get mouseY(): number;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatScreenMouseDraggedEvent extends Event {}
  class ChatScreenMouseDraggedEvent extends Event {
    constructor(screen: ChatScreen, mouseX: number, mouseY: number, button: number, dragX: number, dragY: number);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): number;
    copy(screen: ChatScreen, mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): ChatScreenMouseDraggedEvent;
    static copy$default(chatScreenMouseDraggedEvent: ChatScreenMouseDraggedEvent, chatScreen: ChatScreen, d: number, d2: number, n: number, d3: number, d4: number, n2: number, object: any): ChatScreenMouseDraggedEvent;
    equals(other: any): boolean;
    get button(): number;
    get dragX(): number;
    get dragY(): number;
    get mouseX(): number;
    get mouseY(): number;
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenMouseReleasedEvent extends InputEvent {}
  class ChatScreenMouseReleasedEvent extends InputEvent {
    constructor(screen: ChatScreen, mouseX: number, mouseY: number, button: number, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, d: number, d2: number, n: number, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): boolean;
    copy(screen: ChatScreen, mouseX: number, mouseY: number, button: number, returnFunction: boolean): ChatScreenMouseReleasedEvent;
    static copy$default(chatScreenMouseReleasedEvent: ChatScreenMouseReleasedEvent, chatScreen: ChatScreen, d: number, d2: number, n: number, bl: boolean, n2: number, object: any): ChatScreenMouseReleasedEvent;
    equals(other: any): boolean;
    get button(): number;
    get mouseX(): number;
    get mouseY(): number;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatScreenMouseScrolledEvent extends Event {}
  class ChatScreenMouseScrolledEvent extends Event {
    constructor(screen: ChatScreen, mouseX: number, mouseY: number, amountX: number, amountY: number, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, d: number, d2: number, d3: number, d4: number, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): number;
    component3(): number;
    component4(): number;
    component5(): number;
    component6(): boolean;
    copy(screen: ChatScreen, mouseX: number, mouseY: number, amountX: number, amountY: number, returnFunction: boolean): ChatScreenMouseScrolledEvent;
    static copy$default(chatScreenMouseScrolledEvent: ChatScreenMouseScrolledEvent, chatScreen: ChatScreen, d: number, d2: number, d3: number, d4: number, bl: boolean, n: number, object: any): ChatScreenMouseScrolledEvent;
    equals(other: any): boolean;
    get amountX(): number;
    get amountY(): number;
    get mouseX(): number;
    get mouseY(): number;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface ChatScreenRenderEvent extends Event {}
  class ChatScreenRenderEvent extends Event {
    constructor(screen: ChatScreen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number);
    component1(): ChatScreen;
    component2(): GuiGraphics;
    component3(): number;
    component4(): number;
    component5(): number;
    copy(screen: ChatScreen, guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTick: number): ChatScreenRenderEvent;
    static copy$default(chatScreenRenderEvent: ChatScreenRenderEvent, chatScreen: ChatScreen, guiGraphics: GuiGraphics, n: number, n2: number, f: number, n3: number, object: any): ChatScreenRenderEvent;
    equals(other: any): boolean;
    get guiGraphics(): GuiGraphics;
    get mouseX(): number;
    get mouseY(): number;
    get partialTick(): number;
    get screen(): ChatScreen;
    hashCode(): number;
    toString(): string;
  }


  interface ChatScreenSendMessagePostEvent extends Event {}
  class ChatScreenSendMessagePostEvent extends Event {
    constructor(screen: ChatScreen, message: string, sentMessage: string, messageToSend: string, normalizeChatMessage: string, messages: string[], dontSendMessage: boolean);

    constructor(chatScreen: ChatScreen, string: string, string2: string, string3: string, string4: string, list: List, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): string;
    component3(): string;
    component4(): string;
    component5(): string;
    component6(): string[];
    component7(): boolean;
    copy(screen: ChatScreen, message: string, sentMessage: string, messageToSend: string, normalizeChatMessage: string, messages: string[], dontSendMessage: boolean): ChatScreenSendMessagePostEvent;
    static copy$default(chatScreenSendMessagePostEvent: ChatScreenSendMessagePostEvent, chatScreen: ChatScreen, string: string, string2: string, string3: string, string4: string, list: List, bl: boolean, n: number, object: any): ChatScreenSendMessagePostEvent;
    equals(other: any): boolean;
    get dontSendMessage(): boolean;
    get message(): string;
    get messageToSend(): string;
    get messages(): string[];
    get normalizeChatMessage(): string;
    get screen(): ChatScreen;
    get sentMessage(): string;
    hashCode(): number;
    set dontSendMessage(bl: boolean);
    set message(string: string);
    set sentMessage(string: string);
    toString(): string;
  }


  interface ChatScreenSendMessagePreEvent extends Event {}
  class ChatScreenSendMessagePreEvent extends Event {
    constructor(screen: ChatScreen, message: string, returnFunction: boolean);

    constructor(chatScreen: ChatScreen, string: string, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ChatScreen;
    component2(): string;
    component3(): boolean;
    copy(screen: ChatScreen, message: string, returnFunction: boolean): ChatScreenSendMessagePreEvent;
    static copy$default(chatScreenSendMessagePreEvent: ChatScreenSendMessagePreEvent, chatScreen: ChatScreen, string: string, bl: boolean, n: number, object: any): ChatScreenSendMessagePreEvent;
    equals(other: any): boolean;
    get message(): string;
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    hashCode(): number;
    set message(string: string);
    set returnFunction(bl: boolean);
    toString(): string;
  }


  interface GetDefaultYEvent extends Event {}
  class GetDefaultYEvent extends Event {
    constructor(chatWindow: ChatWindow, y: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, y: number): GetDefaultYEvent;
    static copy$default(getDefaultYEvent: GetDefaultYEvent, chatWindow: ChatWindow, n: number, n2: number, object: any): GetDefaultYEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get y(): number;
    hashCode(): number;
    set chatWindow(chatWindow: ChatWindow);
    set y(n: number);
    toString(): string;
  }


  class GetHeightEvent {
    constructor(chatWindow: ChatWindow, startingHeight: number, heightType: HeightType);
    component1(): ChatWindow;
    component2(): number;
    component3(): HeightType;
    copy(chatWindow: ChatWindow, startingHeight: number, heightType: HeightType): GetHeightEvent;
    static copy$default(getHeightEvent: GetHeightEvent, chatWindow: ChatWindow, n: number, heightType: HeightType, n2: number, object: any): GetHeightEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get heightType(): HeightType;
    get startingHeight(): number;
    hashCode(): number;
    set startingHeight(n: number);
    toString(): string;
  }


  interface GetMaxHeightEvent extends Event {}
  class GetMaxHeightEvent extends Event {
    constructor(chatWindow: ChatWindow, heightType: HeightType, maxHeight: number);
    component1(): ChatWindow;
    component2(): HeightType;
    component3(): number;
    copy(chatWindow: ChatWindow, heightType: HeightType, maxHeight: number): GetMaxHeightEvent;
    static copy$default(getMaxHeightEvent: GetMaxHeightEvent, chatWindow: ChatWindow, heightType: HeightType, n: number, n2: number, object: any): GetMaxHeightEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get heightType(): HeightType;
    get maxHeight(): number;
    hashCode(): number;
    set chatWindow(chatWindow: ChatWindow);
    set maxHeight(n: number);
    toString(): string;
  }


  interface GetMaxWidthEvent extends Event {}
  class GetMaxWidthEvent extends Event {
    constructor(chatWindow: ChatWindow, maxWidth: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, maxWidth: number): GetMaxWidthEvent;
    static copy$default(getMaxWidthEvent: GetMaxWidthEvent, chatWindow: ChatWindow, n: number, n2: number, object: any): GetMaxWidthEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get maxWidth(): number;
    hashCode(): number;
    set chatWindow(chatWindow: ChatWindow);
    set maxWidth(n: number);
    toString(): string;
  }


  interface GetMaxYEvent extends Event {}
  class GetMaxYEvent extends Event {
    constructor(chatWindow: ChatWindow, maxY: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, maxY: number): GetMaxYEvent;
    static copy$default(getMaxYEvent: GetMaxYEvent, chatWindow: ChatWindow, n: number, n2: number, object: any): GetMaxYEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get maxY(): number;
    hashCode(): number;
    set chatWindow(chatWindow: ChatWindow);
    set maxY(n: number);
    toString(): string;
  }


  class GetMinHeightEvent {
    constructor(chatWindow: ChatWindow, minHeight: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, minHeight: number): GetMinHeightEvent;
    static copy$default(getMinHeightEvent: GetMinHeightEvent, chatWindow: ChatWindow, n: number, n2: number, object: any): GetMinHeightEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get minHeight(): number;
    hashCode(): number;
    set minHeight(n: number);
    toString(): string;
  }


  interface GetMinYEvent extends Event {}
  class GetMinYEvent extends Event {
    constructor(chatWindow: ChatWindow, minY: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, minY: number): GetMinYEvent;
    static copy$default(getMinYEvent: GetMinYEvent, chatWindow: ChatWindow, n: number, n2: number, object: any): GetMinYEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get minY(): number;
    hashCode(): number;
    set chatWindow(chatWindow: ChatWindow);
    set minY(n: number);
    toString(): string;
  }


  class GetTotalLineHeightEvent {
    constructor(chatWindow: ChatWindow, totalLineHeight: number);
    component1(): ChatWindow;
    component2(): number;
    copy(chatWindow: ChatWindow, totalLineHeight: number): GetTotalLineHeightEvent;
    static copy$default(getTotalLineHeightEvent: GetTotalLineHeightEvent, chatWindow: ChatWindow, f: number, n: number, object: any): GetTotalLineHeightEvent;
    equals(other: any): boolean;
    get chatWindow(): ChatWindow;
    get totalLineHeight(): number;
    hashCode(): number;
    set totalLineHeight(f: number);
    toString(): string;
  }


  interface HeightType extends Enum<HeightType> {}
  class HeightType extends Enum<HeightType> {
    static readonly RAW: HeightType;
    static readonly ADJUSTED: HeightType;
    static readonly RENDERED_LINES: HeightType;
    static get entries(): EnumEntries<HeightType>;
    static valueOf(value: string): HeightType;
    static values(): HeightType[];
  }


  interface InputEvent extends Event {}
  class InputEvent extends Event {
    get returnFunction(): boolean;
    get screen(): ChatScreen;
    set returnFunction(var1: boolean);
  }


  class RenderValidateYEvent {
    constructor(renderer: ChatRenderer, internalY: number);
    component1(): ChatRenderer;
    component2(): number;
    copy(renderer: ChatRenderer, internalY: number): RenderValidateYEvent;
    static copy$default(renderValidateYEvent: RenderValidateYEvent, chatRenderer: ChatRenderer, n: number, n2: number, object: any): RenderValidateYEvent;
    equals(other: any): boolean;
    get internalY(): number;
    get renderer(): ChatRenderer;
    hashCode(): number;
    set internalY(n: number);
    toString(): string;
  }


  class UpdateWidth {
    constructor(status: UpdateWidthStatus, newWidth: number);
    component1(): UpdateWidthStatus;
    component2(): number;
    copy(status: UpdateWidthStatus, newWidth: number): UpdateWidth;
    static copy$default(updateWidth: UpdateWidth, updateWidthStatus: UpdateWidthStatus, n: number, n2: number, object: any): UpdateWidth;
    equals(other: any): boolean;
    get newWidth(): number;
    get status(): UpdateWidthStatus;
    hashCode(): number;
    toString(): string;
  }


  interface UpdateWidthStatus extends Enum<UpdateWidthStatus> {}
  class UpdateWidthStatus extends Enum<UpdateWidthStatus> {
    static readonly LOWER_MIN_WITH_SPACE: UpdateWidthStatus;
    static readonly LESS_THAN_ZERO: UpdateWidthStatus;
    static readonly GREATER_THAN_GUI_WIDTH: UpdateWidthStatus;
    static readonly SUCCESS: UpdateWidthStatus;
    static get entries(): EnumEntries<UpdateWidthStatus>;
    static valueOf(value: string): UpdateWidthStatus;
    static values(): UpdateWidthStatus[];
  }

}

declare module 'com.ebicep.chatplus.mixin' {
  import { EditBox, CommandSuggestions } from 'net.minecraft.client.gui.components';
  import { BufferSource } from 'MultiBufferSource';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { WidthProvider } from 'StringSplitter';
  import { CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Component, MessageSignature } from 'net.minecraft.network.chat';
  import { GuiMessageTag, GuiMessage } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { IChatScreen } from 'com.ebicep.chatplus';

  class AWTHackMixin {
  }


  class IMixinChatScreen {
    get commandSuggestions(): CommandSuggestions;
    get historyBuffer(): string;
    get historyPos(): number;
    get initial(): string;
    get input(): EditBox;
    set historyBuffer(var1: string);
    set historyPos(var1: number);
    set initial(var1: string);
  }


  class IMixinGuiGraphics {
    callFlushIfUnmanaged(): void;
    get bufferSource(): BufferSource;
  }


  class IMixinScreen {
    callAddWidget<T extends GuiEventListener>(var1: T): T;
    callRebuildWidgets(): void;
    callSetInitialFocus(var1: GuiEventListener): void;
    get font(): Font;
  }


  class IMixinStringSplitter {
    callGetWidthProvider(): WidthProvider;
  }


  class MixinChatComponent {
    addMessage(component: Component, messageSignature: MessageSignature, guiMessageTag: GuiMessageTag, ci: CallbackInfo, guiMessage: GuiMessage): void;
    render(guiGraphics: GuiGraphics, i: number, j: number, k: number, bl: boolean, ci: CallbackInfo): void;
  }


  interface MixinChatScreen extends IMixinChatScreen, IChatScreen, Screen {}
  class MixinChatScreen extends IMixinChatScreen {
    chatPlus$getChatPlusWidth(): number;
    chatPlus$setChatPlusWidth(chatPlus$w: number): void;
    keyReleased(i: number, j: number, k: number): boolean;
    mouseDragged(mouseX: number, mouseY: number, button: number, deltaX: number, deltaY: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
  }


  class MixinCommandSuggestions {
  }


  interface MixinGuiGraphics extends IMixinGuiGraphics {}
  class MixinGuiGraphics extends IMixinGuiGraphics {
  }


  class MixinKeyboardHandler {
  }


  class MixinMouseHandler {
  }


  interface MixinScreen extends IMixinScreen {}
  class MixinScreen extends IMixinScreen {
  }


  class MixinServerList {
  }


  class MixinTitleScreen {
  }


  class NativeImagePointerAccessor {
    size(): number;
  }

}

declare module 'com.ebicep.chatplus.neoforge' {
  class ChatPlusForge {
    static readonly INSTANCE: ChatPlusForge;
  }

}

declare module 'com.ebicep.chatplus.translator' {
  import { Companion } from 'com.ebicep.chatplus.translator.GoogleRequester';
  import { List } from 'java.util';
  import { Companion as com_ebicep_chatplus_translator_regexmatch_Companion } from 'com.ebicep.chatplus.translator.RegexMatch';
  import { SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { Thread } from 'java.lang';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class GoogleRequester {
    static readonly Companion: Companion;
    static readonly BASE_URL: string;
    performTranslationRequest(message: string, from: Language, to: Language): RequestResult;
    translateAuto(message: string, to: Language): RequestResult;
  }


  class Language {
    constructor(name: string, nameUnicode: string, googleCode: string);
    component1(): string;
    component2(): string;
    component3(): string;
    copy(name: string, nameUnicode: string, googleCode: string): Language;
    static copy$default(language: Language, string: string, string2: string, string3: string, n: number, object: any): Language;
    equals(other: any): boolean;
    get googleCode(): string;
    get name(): string;
    get nameUnicode(): string;
    hashCode(): number;
    toString(): string;
  }


  class LanguageManager {
    static readonly INSTANCE: LanguageManager;
    findLanguageFromGoogle(googleCode: string): Language;
    findLanguageFromName(name: string): Language;
    get autoLang(): Language;
    get languageSelf(): Language;
    get languageSpeak(): Language;
    get languageSpeakEnabled(): boolean;
    get languageTo(): Language;
    get languages(): Language[];
    set languageSelf(language: Language);
    set languageSpeak(language: Language);
    set languageSpeakEnabled(bl: boolean);
    set languageTo(language: Language);
    set languages(list: Language[]);
    updateTranslateLanguages(): void;
  }


  class RegexMatch {
    static readonly Companion: com_ebicep_chatplus_translator_regexmatch_Companion;
    constructor(match: string, senderNameGroupIndex: number);

    constructor(seen0: number, match: string, senderNameGroupIndex: number, serializationConstructorMarker: SerializationConstructorMarker);
    component1(): string;
    component2(): number;
    copy(match: string, senderNameGroupIndex: number): RegexMatch;
    static copy$default(regexMatch: RegexMatch, string: string, n: number, n2: number, object: any): RegexMatch;
    equals(other: any): boolean;
    get match(): string;
    get senderNameGroupIndex(): number;
    hashCode(): number;
    set match(string: string);
    set senderNameGroupIndex(n: number);
    toString(): string;
    static write$Self$chatplus_common(self: RegexMatch, output: CompositeEncoder, serialDesc: SerialDescriptor): void;
  }


  class RequestResult {
    constructor(code: number, message: string, from: Language, to: Language);
    component1(): number;
    component2(): string;
    component3(): Language;
    component4(): Language;
    copy(code: number, message: string, from: Language, to: Language): RequestResult;
    static copy$default(requestResult: RequestResult, n: number, string: string, language: Language, language2: Language, n2: number, object: any): RequestResult;
    equals(other: any): boolean;
    get code(): number;
    get from(): Language;
    get message(): string;
    get to(): Language;
    hashCode(): number;
    toString(): string;
  }


  class Response {
    constructor(responseCode: number, entity: string);
    component1(): number;
    component2(): string;
    copy(responseCode: number, entity: string): Response;
    static copy$default(response: Response, n: number, string: string, n2: number, object: any): Response;
    equals(other: any): boolean;
    get entity(): string;
    get responseCode(): number;
    hashCode(): number;
    toString(): string;
  }


  interface SelfTranslator extends Thread {}
  class SelfTranslator extends Thread {
    constructor(toTranslate: string, prefix: string);
    get prefix(): string;
    get toTranslate(): string;
    run(): void;
  }


  interface Timeout extends Thread {}
  class Timeout extends Thread {
    run(): void;
  }


  class TranslateResult {
    constructor(translatedText: string, from: Language);
    component1(): string;
    component2(): Language;
    copy(translatedText: string, from: Language): TranslateResult;
    static copy$default(translateResult: TranslateResult, string: string, language: Language, n: number, object: any): TranslateResult;
    equals(other: any): boolean;
    get from(): Language;
    get translatedText(): string;
    hashCode(): number;
    toString(): string;
  }


  interface Translator extends Thread {}
  class Translator extends Thread {
    constructor(message: string, from: Language, to: Language, filtered: boolean);

    constructor(string: string, language: Language, language2: Language, bl: boolean, n: number, defaultConstructorMarker: DefaultConstructorMarker);
    get filtered(): boolean;
    get from(): Language;
    get message(): string;
    get to(): Language;
    onTranslate(matchedRegex: string, translatedMessage: TranslateResult, fromLanguage: string): void;
    onTranslateSameMessage(): void;
    run(): void;
    translate(text: string): TranslateResult;
  }

}

declare module 'com.ebicep.chatplus.translator.GoogleRequester' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    get accessDenied(): boolean;
    set accessDenied(bl: boolean);
  }

}

declare module 'com.ebicep.chatplus.translator.RegexMatch' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { KSerializer } from 'kotlinx.serialization';
  import { RegexMatch } from 'com.ebicep.chatplus.translator';

  class Companion {
    constructor($constructor_marker: DefaultConstructorMarker);
    serializer(): KSerializer<RegexMatch>;
  }

}

declare module 'com.ebicep.chatplus.util' {
  import { MutableComponent, Component, HoverEvent, Style } from 'net.minecraft.network.chat';
  import { LiteralIgnoredType } from 'com.ebicep.chatplus.util.ComponentUtil';
  import { ChatFormatting } from 'net.minecraft';
  import { List, Collection } from 'java.util';
  import { Integer, Float, Boolean, Enum } from 'java.lang';
  import { Pair, Unit } from 'kotlin';
  import { FormattedCharSequence } from 'net.minecraft.util';
  import { Regex } from 'kotlin.text';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Function0, Function2 } from 'kotlin.jvm.functions';
  import { GuiForwardType } from 'com.ebicep.chatplus.util.GraphicsUtil';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Key } from 'InputConstants';
  import { ChatScreenInputEvent, ChatRenderPreLineAppearanceEvent } from 'com.ebicep.chatplus.hud';
  import { Color } from 'java.awt';
  import { EnumEntries } from 'kotlin.enums';
  import { ChatPlusGuiMessageLine, ChatPlusGuiMessage } from 'ChatTab';

  class ComponentUtil {
    static readonly INSTANCE: ComponentUtil;
    append($this$append: MutableComponent, text: string, color: ChatFormatting): MutableComponent;
    componentIsType(component: Component, type: LiteralIgnoredType): boolean;
    formatString(input: string, defaultColor: string): string;
    getColoredString($this$getColoredString: FormattedCharSequence): string;
    getColoredString($this$getColoredString: Component): string;
    getString($this$getString: Style): string;
    getWidthRange(sequence: FormattedCharSequence, originalString: string, substring: string): Pair<number, number>[];
    getWidthRanges(sequence: FormattedCharSequence, originalString: string, regex: Regex): Pair<number, number>[];
    isCompactContents(it: Component): boolean;
    isTimestampContents(it: Component): boolean;
    literal(text: string, color: ChatFormatting, hoverEvent: HoverEvent): MutableComponent;
    static literal$default(componentUtil: ComponentUtil, string: string, chatFormatting: ChatFormatting, hoverEvent: HoverEvent, n: number, object: any): MutableComponent;
    literalIgnored(string: string, ignoredType: LiteralIgnoredType): MutableComponent;
    splitLines(component: MutableComponent, maxWidth: number): Component[];
    static splitLines$default(componentUtil: ComponentUtil, mutableComponent: MutableComponent, n: number, n2: number, object: any): List;
    translatable(text: string, color: ChatFormatting, hoverEvent: HoverEvent): MutableComponent;
    static translatable$default(componentUtil: ComponentUtil, string: string, chatFormatting: ChatFormatting, hoverEvent: HoverEvent, n: number, object: any): MutableComponent;
    withColor($this$withColor: MutableComponent, color: number, alpha: boolean): MutableComponent;
    static withColor$default(componentUtil: ComponentUtil, mutableComponent: MutableComponent, n: number, bl: boolean, n2: number, object: any): MutableComponent;
  }


  class GraphicsUtil {
    static readonly INSTANCE: GraphicsUtil;
    createPose($this$createPose: PoseStack, fn: Function0<Unit>): void;
    drawHorizontalLine($this$drawHorizontalLine: GuiGraphics, x1: number, x2: number, y: number, color: number): void;
    drawHorizontalLine($this$drawHorizontalLine: GuiGraphics, x1: number, x2: number, y: number, color: number, thickness: number): void;
    drawHorizontalLine($this$drawHorizontalLine: GuiGraphics, x1: number, x2: number, y: number, color: number, thickness: number): void;
    static drawHorizontalLine$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, f: number, f2: number, f3: number, n: number, f4: number, n2: number, object: any): void;
    static drawHorizontalLine$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, object: any): void;
    drawImage($this$drawImage: GuiGraphics, resources: Resources): void;
    drawImage($this$drawImage: GuiGraphics, resourceLocation: ResourceLocation, width: number, height: number): void;
    drawImage($this$drawImage: GuiGraphics, resourceLocation: ResourceLocation, width: number, height: number): void;
    drawString0($this$drawString0: GuiGraphics, string: string, i: number, j: number, k: number): number;
    drawString0($this$drawString0: GuiGraphics, string: string, x: number, y: number, color: number): number;
    drawString0($this$drawString0: GuiGraphics, formattedCharSequence: FormattedCharSequence, x: number, y: number, color: number): number;
    drawString0($this$drawString0: GuiGraphics, formattedCharSequence: FormattedCharSequence, x: number, y: number, color: number, bl: boolean): number;
    drawVerticalLine($this$drawVerticalLine: GuiGraphics, x: number, y1: number, y2: number, color: number, thickness: number): void;
    static drawVerticalLine$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, object: any): void;
    fill0($this$fill0: GuiGraphics, i: number, j: number, k: number, l: number, n: number): void;
    fill0($this$fill0: GuiGraphics, renderType: RenderType, i: number, j: number, k: number, l: number, m: number, n: number): void;
    guiForward<T>($this$guiForward: PoseStack, guiForwardType: GuiForwardType<T>, modifier: Function0<T>): void;
    guiForward($this$guiForward: PoseStack, guiForwardType: GuiForwardType<Unit>): void;
    guiForward($this$guiForward: PoseStack, guiForwardType: GuiForwardType<boolean>, backwards: boolean): void;
    static guiForward$default(graphicsUtil: GraphicsUtil, poseStack: PoseStack, guiForwardType: GuiForwardType, bl: boolean, n: number, object: any): void;
    playerFaceRendererDraw(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number): void;
    playerFaceRendererDraw(guiGraphics: GuiGraphics, resourceLocation: ResourceLocation, i: number, j: number, k: number, renderHat: boolean, renderUpsideDown: boolean): void;
    renderOutline($this$renderOutline: GuiGraphics, startX: number, startY: number, width: number, height: number, color: number, thickness: number, top: boolean, bottom: boolean, left: boolean, right: boolean): void;
    renderOutline($this$renderOutline: GuiGraphics, startX: number, startY: number, width: number, height: number, color: number, thickness: number, top: boolean, bottom: boolean, left: boolean, right: boolean): void;
    static renderOutline$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, f: number, f2: number, f3: number, f4: number, n: number, f5: number, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, n2: number, object: any): void;
    static renderOutline$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, n7: number, object: any): void;
    renderOutlineSetPos($this$renderOutlineSetPos: GuiGraphics, startX: number, startY: number, endX: number, endY: number, color: number, thickness: number, top: boolean, bottom: boolean, left: boolean, right: boolean): void;
    renderOutlineSetPos($this$renderOutlineSetPos: GuiGraphics, startX: number, startY: number, endX: number, endY: number, color: number, thickness: number, top: boolean, bottom: boolean, left: boolean, right: boolean): void;
    static renderOutlineSetPos$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, f: number, f2: number, f3: number, f4: number, n: number, f5: number, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, n2: number, object: any): void;
    static renderOutlineSetPos$default(graphicsUtil: GraphicsUtil, guiGraphics: GuiGraphics, n: number, n2: number, n3: number, n4: number, n5: number, n6: number, bl: boolean, bl2: boolean, bl3: boolean, bl4: boolean, n7: number, object: any): void;
    translate0($this$translate0: PoseStack, x: number, y: number, z: number): void;
    translate0($this$translate0: PoseStack, x: number, y: number, z: number): void;
    translate0($this$translate0: PoseStack, x: number, y: number, z: number): void;
    static translate0$default(graphicsUtil: GraphicsUtil, poseStack: PoseStack, d: number, d2: number, d3: number, n: number, object: any): void;
    static translate0$default(graphicsUtil: GraphicsUtil, poseStack: PoseStack, f: number, f2: number, f3: number, n: number, object: any): void;
    static translate0$default(graphicsUtil: GraphicsUtil, poseStack: PoseStack, n: number, n2: number, n3: number, n4: number, object: any): void;
  }


  class KeyUtil {
    static readonly INSTANCE: KeyUtil;
    getDisplayName($this$getDisplayName: Key, parentheses: boolean): Component;
    isAlt($this$isAlt: Key): boolean;
    isAlt(value: number): boolean;
    isControl($this$isControl: Key): boolean;
    isControl(value: number): boolean;
    isDown($this$isDown: Key): boolean;
    isDown($this$isDown: Key, event: ChatScreenInputEvent): boolean;
    isModifier($this$isModifier: Key): boolean;
    isModifier(value: number): boolean;
    isMouseButton($this$isMouseButton: Key): boolean;
    isMouseButton(value: number): boolean;
    isShift($this$isShift: Key): boolean;
    isShift(value: number): boolean;
  }


  class KotlinUtil {
    static readonly INSTANCE: KotlinUtil;
    areListsEqual<T>(list1: T[], list2: T[], comparator: Function2<T, T, boolean>): boolean;
    brighter2($this$brighter2: Color): Color;
    containsReference<E>($this$containsReference: Collection<E>, element: E): boolean;
    reduceAlpha($this$reduceAlpha: Color, percentage: number): Color;
    reduceAlpha(color: number, percentage: number): number;
    reduceAlpha(color: number, percentage: number): number;
  }


  interface Resources extends Enum<Resources> {}
  class Resources extends Enum<Resources> {
    static readonly NOTIFICATION_BADGE: Resources;
    static get entries(): EnumEntries<Resources>;
    get height(): number;
    get resourceLocation(): ResourceLocation;
    get width(): number;
    set height(n: number);
    set resourceLocation(resourceLocation: ResourceLocation);
    set width(n: number);
    static valueOf(value: string): Resources;
    static values(): Resources[];
  }


  class Timestamped {
    constructor(expiryTick: number);
    get expiryTick(): number;
    matches(var1: ChatRenderPreLineAppearanceEvent): boolean;
  }


  interface TimeStampedLines extends Timestamped {}
  class TimeStampedLines extends Timestamped {
    constructor(lines: ChatPlusGuiMessageLine[], expiryTick: number);
    get lines(): ChatPlusGuiMessageLine[];
    matches(event: ChatRenderPreLineAppearanceEvent): boolean;
  }


  interface TimeStampedMessages extends Timestamped {}
  class TimeStampedMessages extends Timestamped {
    constructor(lines: ChatPlusGuiMessage[], expiryTick: number);
    get lines(): ChatPlusGuiMessage[];
    matches(event: ChatRenderPreLineAppearanceEvent): boolean;
  }

}

declare module 'com.ebicep.chatplus.util.ComponentUtil' {
  import { PlainTextContents } from 'net.minecraft.network.chat.contents';
  import { Optional } from 'java.util';
  import { ContentConsumer, StyledContentConsumer } from 'FormattedText';
  import { Style } from 'net.minecraft.network.chat';
  import { Enum } from 'java.lang';
  import { EnumEntries } from 'kotlin.enums';

  interface LiteralContentsIgnored extends PlainTextContents {}
  class LiteralContentsIgnored extends PlainTextContents {
    constructor(text: string, ignoredType: LiteralIgnoredType);
    equals(other: any): boolean;
    getText(): string;
    hashCode(): number;
    isType(type: LiteralIgnoredType): boolean;
    text(): string;
    toString(): string;
    visit<T>(arg: ContentConsumer<T>): Optional<T>;
    visit<T>(arg: StyledContentConsumer<T>, arg2: Style): Optional<T>;
  }


  interface LiteralIgnoredType extends Enum<LiteralIgnoredType> {}
  class LiteralIgnoredType extends Enum<LiteralIgnoredType> {
    static readonly TIMESTAMP: LiteralIgnoredType;
    static readonly COMPACT: LiteralIgnoredType;
    static readonly TRANSLATE: LiteralIgnoredType;
    static get entries(): EnumEntries<LiteralIgnoredType>;
    static valueOf(value: string): LiteralIgnoredType;
    static values(): LiteralIgnoredType[];
  }

}

declare module 'com.ebicep.chatplus.util.GraphicsUtil' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Function0 } from 'kotlin.jvm.functions';

  class GuiForwardType<T = any> {
    constructor(amount: number, $constructor_marker: DefaultConstructorMarker);
    get amount(): number;
    getAmount(modifier: Function0<T>): number;
  }

}

declare module 'com.ebicep.chatplus.util.GraphicsUtil.GuiForwardType' {
  import { GuiForwardType } from 'com.ebicep.chatplus.util.GraphicsUtil';
  import { Unit } from 'kotlin';
  import { Boolean, Integer } from 'java.lang';
  import { Function0 } from 'kotlin.jvm.functions';

  interface ChatRendererDebug extends GuiForwardType<Unit> {}
  class ChatRendererDebug extends GuiForwardType<Unit> {
    static readonly INSTANCE: ChatRendererDebug;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ChatTabNotificationBadge extends GuiForwardType<Unit> {}
  class ChatTabNotificationBadge extends GuiForwardType<Unit> {
    static readonly INSTANCE: ChatTabNotificationBadge;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ChatWindowOutline extends GuiForwardType<boolean> {}
  class ChatWindowOutline extends GuiForwardType<boolean> {
    static readonly INSTANCE: ChatWindowOutline;
    equals(other: any): boolean;
    get amount(): number;
    getAmount(modifier: Function0<boolean>): number;
    hashCode(): number;
    toString(): string;
  }


  interface ChatWindowTab extends GuiForwardType<boolean> {}
  class ChatWindowTab extends GuiForwardType<boolean> {
    static readonly INSTANCE: ChatWindowTab;
    equals(other: any): boolean;
    get amount(): number;
    getAmount(modifier: Function0<boolean>): number;
    hashCode(): number;
    toString(): string;
  }


  interface ChatWindows extends GuiForwardType<number> {}
  class ChatWindows extends GuiForwardType<number> {
    static readonly INSTANCE: ChatWindows;
    equals(other: any): boolean;
    get amount(): number;
    getAmount(modifier: Function0<number>): number;
    hashCode(): number;
    toString(): string;
  }


  interface Debug extends GuiForwardType<Unit> {}
  class Debug extends GuiForwardType<Unit> {
    static readonly INSTANCE: Debug;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface Default extends GuiForwardType<boolean> {}
  class Default extends GuiForwardType<boolean> {
    static readonly INSTANCE: Default;
    equals(other: any): boolean;
    get amount(): number;
    getAmount(modifier: Function0<boolean>): number;
    hashCode(): number;
    toString(): string;
  }


  interface MovableChatDebug extends GuiForwardType<Unit> {}
  class MovableChatDebug extends GuiForwardType<Unit> {
    static readonly INSTANCE: MovableChatDebug;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface MovableChatMoving extends GuiForwardType<Unit> {}
  class MovableChatMoving extends GuiForwardType<Unit> {
    static readonly INSTANCE: MovableChatMoving;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface OnScreenDisplay extends GuiForwardType<Unit> {}
  class OnScreenDisplay extends GuiForwardType<Unit> {
    static readonly INSTANCE: OnScreenDisplay;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ScreenshotChatFull extends GuiForwardType<Unit> {}
  class ScreenshotChatFull extends GuiForwardType<Unit> {
    static readonly INSTANCE: ScreenshotChatFull;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ScreenshotChatLines extends GuiForwardType<Unit> {}
  class ScreenshotChatLines extends GuiForwardType<Unit> {
    static readonly INSTANCE: ScreenshotChatLines;
    equals(other: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}