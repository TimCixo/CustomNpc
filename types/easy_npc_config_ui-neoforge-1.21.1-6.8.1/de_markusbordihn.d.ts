declare module 'de.markusbordihn.easynpc.configui.client.renderer.manager' {
  import { Level } from 'net.minecraft.world.level';

  class EntityTypeValidator {
    static validateUnknownEntityTypes(level: Level): void;
    static validateUnknownEntityTypes(level: Level, batchSize: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.renderer.screen' {
  import { EntityScreenRenderer } from 'de.markusbordihn.easynpc.client.renderer.screen';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { EntityRenderConfig } from 'de.markusbordihn.easynpc.data.render';

  interface EntityConfigScreenRenderer extends EntityScreenRenderer {}
  class EntityConfigScreenRenderer extends EntityScreenRenderer {
    static renderEntity(guiGraphics: GuiGraphics, easyNPC: EasyNPC<any>, config: EntityRenderConfig, mouseX: number, mouseY: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen' {
  import { RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Logger } from 'org.apache.logging.log4j';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { AdditionalScreenData } from 'de.markusbordihn.easynpc.configui.data.screen';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { Screen, ScreenInterface as de_markusbordihn_easynpc_client_screen_ScreenInterface } from 'de.markusbordihn.easynpc.client.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { BaseAttributes } from 'de.markusbordihn.easynpc.data.attribute';
  import { ConfigurationDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { ObjectiveDataSet } from 'de.markusbordihn.easynpc.data.objective';
  import { Screen as net_minecraft_client_gui_screens_Screen } from 'net.minecraft.client.gui.screens';

  class ClientScreens {
    static registerScreens(event: RegisterMenuScreensEvent): void;
  }


  interface ContainerScreen<T extends ConfigUIMenu = any> extends ScreenInterface, AbstractContainerScreen<T> {}
  class ContainerScreen<T extends ConfigUIMenu = any> extends ScreenInterface {
    static readonly log: Logger;
    get additionalScreenData(): AdditionalScreenData;
    get easyNPC(): EasyNPC<any>;
    get screenData(): ScreenData;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    removed(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CustomScreen<T extends AbstractContainerMenu = any, D extends AdditionalScreenDataInterface = any> extends Screen<T, D> {}
  class CustomScreen<T extends AbstractContainerMenu = any, D extends AdditionalScreenDataInterface = any> extends Screen<T, D> {
    get font(): Font;
    renderBackground(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface EditorScreen<T extends ConfigUIMenu = any> extends ScreenInterface, Screen<T, AdditionalScreenData> {}
  class EditorScreen<T extends ConfigUIMenu = any> extends ScreenInterface {
    constructor(menu: T, inventory: Inventory, component: Component);
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  class EntityGuiScaling {
    static getScaling(entity: any): number;
  }


  interface ScreenInterface extends de_markusbordihn_easynpc_client_screen_ScreenInterface<AdditionalScreenData> {}
  class ScreenInterface extends de_markusbordihn_easynpc_client_screen_ScreenInterface<AdditionalScreenData> {
    get baseAttributes(): BaseAttributes;
    get configurationData(): ConfigurationDataCapable<any>;
    get objectiveDataSet(): ObjectiveDataSet;
    isSwitchingToAnotherEasyNPCScreen(newScreen: net_minecraft_client_gui_screens_Screen): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.components' {
  import { SpriteButton, CustomButton, SpinButton, MultiStateToggleButton } from 'de.markusbordihn.easynpc.client.screen.components';
  import { OnPress } from 'Button';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DyeColor } from 'net.minecraft.world.item';
  import { PriorityValue } from 'de.markusbordihn.easynpc.configui.client.screen.components.DialogPriorityButton';
  import { OnChange } from 'SpinButton';
  import { NameVisibilityType } from 'de.markusbordihn.easynpc.data.display';
  import { OnVisibilityChange } from 'de.markusbordihn.easynpc.configui.client.screen.components.NameVisibilityToggleButton';

  interface ActionButton extends SpriteButton {}
  class ActionButton extends SpriteButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly SPRITE_HEIGHT: number;
    static readonly SPRITE_OFFSET_X: number;
    static readonly SPRITE_OFFSET_Y: number;
    static readonly SPRITE_WIDTH: number;
    static readonly SPRITE_X: number;
    static readonly SPRITE_Y: number;
    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface ActionsButton extends SpriteButton {}
  class ActionsButton extends SpriteButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly SPRITE_HEIGHT: number;
    static readonly SPRITE_OFFSET_X: number;
    static readonly SPRITE_OFFSET_Y: number;
    static readonly SPRITE_WIDTH: number;
    static readonly SPRITE_X: number;
    static readonly SPRITE_Y: number;
    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface ColorButton extends CustomButton {}
  class ColorButton extends CustomButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly DEFAULT_WIDTH: number;
    constructor(x: number, y: number, onPress: OnPress);

    constructor(x: number, y: number, width: number, height: number, onPress: OnPress);
    get color(): DyeColor;
    get colorValue(): number;
    onClick(x: number, y: number): void;
    renderButton(guiGraphics: GuiGraphics, left: number, top: number, partialTicks: number): void;
    set color(color: DyeColor);
  }


  interface DialogButton extends SpriteButton {}
  class DialogButton extends SpriteButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly SPRITE_HEIGHT: number;
    static readonly SPRITE_OFFSET_X: number;
    static readonly SPRITE_OFFSET_Y: number;
    static readonly SPRITE_WIDTH: number;
    static readonly SPRITE_X: number;
    static readonly SPRITE_Y: number;
    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface DialogButtonButton extends SpriteButton {}
  class DialogButtonButton extends SpriteButton {
    static readonly DEFAULT_HEIGHT: number;
    static readonly SPRITE_HEIGHT: number;
    static readonly SPRITE_OFFSET_X: number;
    static readonly SPRITE_OFFSET_Y: number;
    static readonly SPRITE_WIDTH: number;
    static readonly SPRITE_X: number;
    static readonly SPRITE_Y: number;
    constructor(left: number, top: number, width: number, label: string, onPress: OnPress);
  }


  interface DialogPriorityButton extends SpinButton<PriorityValue> {}
  class DialogPriorityButton extends SpinButton<PriorityValue> {
    constructor(x: number, y: number, width: number, height: number, initialPriority: number, onChange: OnChange<PriorityValue>);
    get priority(): number;
    isCustom(): boolean;
  }


  interface NameVisibilityToggleButton extends MultiStateToggleButton {}
  class NameVisibilityToggleButton extends MultiStateToggleButton {
    static readonly SPRITE_OFFSET_X: number;
    static readonly SPRITE_OFFSET_Y_NEVER: number;
    static readonly SPRITE_OFFSET_Y_MID: number;
    static readonly SPRITE_OFFSET_Y_NEAR: number;
    static readonly SPRITE_OFFSET_Y_MOUSE_OVER: number;
    static readonly SPRITE_OFFSET_Y_ALWAYS: number;
    constructor(left: number, top: number, initialType: NameVisibilityType, onVisibilityChange: OnVisibilityChange);

    constructor(left: number, top: number, width: number, height: number, initialType: NameVisibilityType, onVisibilityChange: OnVisibilityChange);
    get visibilityType(): NameVisibilityType;
    set visibilityType(type: NameVisibilityType);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.components.DialogPriorityButton' {
  class PriorityValue {
    readonly value: number;
    readonly isCustom: boolean;
    constructor(value: number);

    constructor(value: number, isCustom: boolean);
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.components.NameVisibilityToggleButton' {
  import { NameVisibilityToggleButton } from 'de.markusbordihn.easynpc.configui.client.screen.components';
  import { NameVisibilityType } from 'de.markusbordihn.easynpc.data.display';

  class OnVisibilityChange {
    onVisibilityChange(var1: NameVisibilityToggleButton, var2: NameVisibilityType): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.actions' {
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { BasicActionConfigurationMenuWrapper, DialogActionConfigurationMenuWrapper, DistanceActionConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.action';

  interface ActionConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ActionConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface BasicActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {}
  class BasicActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface BasicActionConfigurationScreenWrapper extends BasicActionConfigurationScreen<BasicActionConfigurationMenuWrapper> {}
  class BasicActionConfigurationScreenWrapper extends BasicActionConfigurationScreen<BasicActionConfigurationMenuWrapper> {
    constructor(menu: BasicActionConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DialogActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {}
  class DialogActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface DialogActionConfigurationScreenWrapper extends DialogActionConfigurationScreen<DialogActionConfigurationMenuWrapper> {}
  class DialogActionConfigurationScreenWrapper extends DialogActionConfigurationScreen<DialogActionConfigurationMenuWrapper> {
    constructor(menu: DialogActionConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DistanceActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {}
  class DistanceActionConfigurationScreen<T extends ConfigurationMenu = any> extends ActionConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface DistanceActionConfigurationScreenWrapper extends DistanceActionConfigurationScreen<DistanceActionConfigurationMenuWrapper> {}
  class DistanceActionConfigurationScreenWrapper extends DistanceActionConfigurationScreen<DistanceActionConfigurationMenuWrapper> {
    constructor(menu: DistanceActionConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.attribute' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AbilitiesAttributeConfigurationMenuWrapper, BaseAttributeConfigurationMenuWrapper, CombatAttributeConfigurationMenuWrapper, DisplayAttributeConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.attribute';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface AbilitiesAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {}
  class AbilitiesAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface AbilitiesAttributeConfigurationScreenWrapper extends AbilitiesAttributeConfigurationScreen<AbilitiesAttributeConfigurationMenuWrapper> {}
  class AbilitiesAttributeConfigurationScreenWrapper extends AbilitiesAttributeConfigurationScreen<AbilitiesAttributeConfigurationMenuWrapper> {
    constructor(menu: AbilitiesAttributeConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface AttributeConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class AttributeConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface BaseAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {}
  class BaseAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface BaseAttributeConfigurationScreenWrapper extends BaseAttributeConfigurationScreen<BaseAttributeConfigurationMenuWrapper> {}
  class BaseAttributeConfigurationScreenWrapper extends BaseAttributeConfigurationScreen<BaseAttributeConfigurationMenuWrapper> {
    constructor(menu: BaseAttributeConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface CombatAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {}
  class CombatAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CombatAttributeConfigurationScreenWrapper extends CombatAttributeConfigurationScreen<CombatAttributeConfigurationMenuWrapper> {}
  class CombatAttributeConfigurationScreenWrapper extends CombatAttributeConfigurationScreen<CombatAttributeConfigurationMenuWrapper> {
    constructor(menu: CombatAttributeConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DisplayAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {}
  class DisplayAttributeConfigurationScreen<T extends ConfigurationMenu = any> extends AttributeConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DisplayAttributeConfigurationScreenWrapper extends DisplayAttributeConfigurationScreen<DisplayAttributeConfigurationMenuWrapper> {}
  class DisplayAttributeConfigurationScreenWrapper extends DisplayAttributeConfigurationScreen<DisplayAttributeConfigurationMenuWrapper> {
    constructor(menu: DisplayAttributeConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration' {
  import { ContainerScreen, ScreenInterface } from 'de.markusbordihn.easynpc.configui.client.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Screen } from 'de.markusbordihn.easynpc.client.screen';
  import { AdditionalScreenData } from 'de.markusbordihn.easynpc.configui.data.screen';

  interface ConfigurationContainerScreen<T extends ConfigUIMenu = any> extends ContainerScreen<T> {}
  class ConfigurationContainerScreen<T extends ConfigUIMenu = any> extends ContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    showMainScreen(): void;
  }


  interface ConfigurationScreen<T extends ConfigUIMenu = any> extends ScreenInterface, Screen<T, AdditionalScreenData> {}
  class ConfigurationScreen<T extends ConfigUIMenu = any> extends ScreenInterface {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    keyPressed(keyCode: number, unused1: number, unused2: number): boolean;
    showMainScreen(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.dialog' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AdvancedDialogConfigurationMenuWrapper, BasicDialogConfigurationMenuWrapper, NoneDialogConfigurationMenuWrapper, YesNoDialogConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.dialog';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface AdvancedDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {}
  class AdvancedDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface AdvancedDialogConfigurationScreenWrapper extends AdvancedDialogConfigurationScreen<AdvancedDialogConfigurationMenuWrapper> {}
  class AdvancedDialogConfigurationScreenWrapper extends AdvancedDialogConfigurationScreen<AdvancedDialogConfigurationMenuWrapper> {
    constructor(menu: AdvancedDialogConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface BasicDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {}
  class BasicDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface BasicDialogConfigurationScreenWrapper extends BasicDialogConfigurationScreen<BasicDialogConfigurationMenuWrapper> {}
  class BasicDialogConfigurationScreenWrapper extends BasicDialogConfigurationScreen<BasicDialogConfigurationMenuWrapper> {
    constructor(menu: BasicDialogConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DialogConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class DialogConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface NoneDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {}
  class NoneDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface NoneDialogConfigurationScreenWrapper extends NoneDialogConfigurationScreen<NoneDialogConfigurationMenuWrapper> {}
  class NoneDialogConfigurationScreenWrapper extends NoneDialogConfigurationScreen<NoneDialogConfigurationMenuWrapper> {
    constructor(menu: NoneDialogConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface YesNoDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {}
  class YesNoDialogConfigurationScreen<T extends ConfigurationMenu = any> extends DialogConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface YesNoDialogConfigurationScreenWrapper extends YesNoDialogConfigurationScreen<YesNoDialogConfigurationMenuWrapper> {}
  class YesNoDialogConfigurationScreenWrapper extends YesNoDialogConfigurationScreen<YesNoDialogConfigurationMenuWrapper> {
    constructor(menu: YesNoDialogConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.dialog.AdvancedDialogConfigurationScreen' {
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Entry } from 'de.markusbordihn.easynpc.configui.client.screen.configuration.dialog.AdvancedDialogConfigurationScreen.DialogList';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface DialogList extends ObjectSelectionList<Entry> {}
  class DialogList extends ObjectSelectionList<Entry> {
    renderSelectionList(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.dialog.AdvancedDialogConfigurationScreen.DialogList' {
  import { Entry as objectselectionlist_Entry } from 'ObjectSelectionList';
  import { DialogDataEntry } from 'de.markusbordihn.easynpc.data.dialog';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface Entry extends objectselectionlist_Entry<Entry> {}
  class Entry extends objectselectionlist_Entry<Entry> {
    constructor(dialogData: DialogDataEntry);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, entryId: number, top: number, left: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isSelected: boolean, partialTicks: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.equipment' {
  import { ConfigurationContainerScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { EquipmentConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration.equipment';

  interface EquipmentConfigurationContainerScreen<T extends ConfigurationMenu = any> extends ConfigurationContainerScreen<T> {}
  class EquipmentConfigurationContainerScreen<T extends ConfigurationMenu = any> extends ConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface EquipmentConfigurationScreenWrapper extends EquipmentConfigurationContainerScreen<EquipmentConfigurationMenu> {}
  class EquipmentConfigurationScreenWrapper extends EquipmentConfigurationContainerScreen<EquipmentConfigurationMenu> {
    constructor(menu: EquipmentConfigurationMenu, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.main' {
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { MainConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.main';

  interface MainConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class MainConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    static readonly BUTTON_HEIGHT: number;
    static readonly BUTTON_WIDTH: number;
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface MainConfigurationScreenWrapper extends MainConfigurationScreen<MainConfigurationMenuWrapper> {}
  class MainConfigurationScreenWrapper extends MainConfigurationScreen<MainConfigurationMenuWrapper> {
    constructor(menu: MainConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.model' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CustomModelConfigurationMenuWrapper, DefaultModelConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.model';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface CustomModelConfigurationScreen<T extends ConfigurationMenu = any> extends ModelConfigurationScreen<T> {}
  class CustomModelConfigurationScreen<T extends ConfigurationMenu = any> extends ModelConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CustomModelConfigurationScreenWrapper extends CustomModelConfigurationScreen<CustomModelConfigurationMenuWrapper> {}
  class CustomModelConfigurationScreenWrapper extends CustomModelConfigurationScreen<CustomModelConfigurationMenuWrapper> {
    constructor(menu: CustomModelConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DefaultModelConfigurationScreen<T extends ConfigurationMenu = any> extends ModelConfigurationScreen<T> {}
  class DefaultModelConfigurationScreen<T extends ConfigurationMenu = any> extends ModelConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DefaultModelConfigurationScreenWrapper extends DefaultModelConfigurationScreen<DefaultModelConfigurationMenuWrapper> {}
  class DefaultModelConfigurationScreenWrapper extends DefaultModelConfigurationScreen<DefaultModelConfigurationMenuWrapper> {
    constructor(menu: DefaultModelConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ModelConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ModelConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.objective' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { AttackObjectiveConfigurationMenuWrapper, BasicObjectiveConfigurationMenuWrapper, FollowObjectiveConfigurationMenuWrapper, LookObjectiveConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.objective';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface AttackObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {}
  class AttackObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface AttackObjectiveConfigurationScreenWrapper extends AttackObjectiveConfigurationScreen<AttackObjectiveConfigurationMenuWrapper> {}
  class AttackObjectiveConfigurationScreenWrapper extends AttackObjectiveConfigurationScreen<AttackObjectiveConfigurationMenuWrapper> {
    constructor(menu: AttackObjectiveConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface BasicObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {}
  class BasicObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface BasicObjectiveConfigurationScreenWrapper extends BasicObjectiveConfigurationScreen<BasicObjectiveConfigurationMenuWrapper> {}
  class BasicObjectiveConfigurationScreenWrapper extends BasicObjectiveConfigurationScreen<BasicObjectiveConfigurationMenuWrapper> {
    constructor(menu: BasicObjectiveConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface FollowObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {}
  class FollowObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface FollowObjectiveConfigurationScreenWrapper extends FollowObjectiveConfigurationScreen<FollowObjectiveConfigurationMenuWrapper> {}
  class FollowObjectiveConfigurationScreenWrapper extends FollowObjectiveConfigurationScreen<FollowObjectiveConfigurationMenuWrapper> {
    constructor(menu: FollowObjectiveConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface LookObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {}
  class LookObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ObjectiveConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface LookObjectiveConfigurationScreenWrapper extends LookObjectiveConfigurationScreen<LookObjectiveConfigurationMenuWrapper> {}
  class LookObjectiveConfigurationScreenWrapper extends LookObjectiveConfigurationScreen<LookObjectiveConfigurationMenuWrapper> {
    constructor(menu: LookObjectiveConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ObjectiveConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.pose' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AdvancedPoseConfigurationMenuWrapper, BasicPoseConfigurationMenuWrapper, CustomPoseConfigurationMenuWrapper, DefaultPoseConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.pose';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface AdvancedPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {}
  class AdvancedPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface AdvancedPoseConfigurationScreenWrapper extends AdvancedPoseConfigurationScreen<AdvancedPoseConfigurationMenuWrapper> {}
  class AdvancedPoseConfigurationScreenWrapper extends AdvancedPoseConfigurationScreen<AdvancedPoseConfigurationMenuWrapper> {
    constructor(menu: AdvancedPoseConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface BasicPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {}
  class BasicPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface BasicPoseConfigurationScreenWrapper extends BasicPoseConfigurationScreen<BasicPoseConfigurationMenuWrapper> {}
  class BasicPoseConfigurationScreenWrapper extends BasicPoseConfigurationScreen<BasicPoseConfigurationMenuWrapper> {
    constructor(menu: BasicPoseConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface CustomPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {}
  class CustomPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CustomPoseConfigurationScreenWrapper extends CustomPoseConfigurationScreen<CustomPoseConfigurationMenuWrapper> {}
  class CustomPoseConfigurationScreenWrapper extends CustomPoseConfigurationScreen<CustomPoseConfigurationMenuWrapper> {
    constructor(menu: CustomPoseConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DefaultPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {}
  class DefaultPoseConfigurationScreen<T extends ConfigurationMenu = any> extends PoseConfigurationScreen<T> {
    static readonly BUTTON_WIDTH: number;
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DefaultPoseConfigurationScreenWrapper extends DefaultPoseConfigurationScreen<DefaultPoseConfigurationMenuWrapper> {}
  class DefaultPoseConfigurationScreenWrapper extends DefaultPoseConfigurationScreen<DefaultPoseConfigurationMenuWrapper> {
    constructor(menu: DefaultPoseConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface PoseConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class PoseConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.position' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DefaultPositionConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.position';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface DefaultPositionConfigurationScreen<T extends ConfigurationMenu = any> extends PositionConfigurationScreen<T> {}
  class DefaultPositionConfigurationScreen<T extends ConfigurationMenu = any> extends PositionConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DefaultPositionConfigurationScreenWrapper extends DefaultPositionConfigurationScreen<DefaultPositionConfigurationMenuWrapper> {}
  class DefaultPositionConfigurationScreenWrapper extends DefaultPositionConfigurationScreen<DefaultPositionConfigurationMenuWrapper> {
    constructor(menu: DefaultPositionConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface PositionConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class PositionConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    renderDefaultScreenBg(guiGraphics: GuiGraphics, leftPos: number, topPos: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.preset' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ExportCustomPresetConfigurationMenuWrapper, ExportWorldPresetConfigurationMenuWrapper, ImportCustomPresetConfigurationMenuWrapper, ImportDefaultPresetConfigurationMenuWrapper, ImportLocalPresetConfigurationMenuWrapper, ImportWorldPresetConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.preset';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  interface ExportCustomPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ExportPresetConfigurationScreen<T> {}
  class ExportCustomPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ExportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface ExportCustomPresetConfigurationScreenWrapper extends ExportCustomPresetConfigurationScreen<ExportCustomPresetConfigurationMenuWrapper> {}
  class ExportCustomPresetConfigurationScreenWrapper extends ExportCustomPresetConfigurationScreen<ExportCustomPresetConfigurationMenuWrapper> {
    constructor(menu: ExportCustomPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ExportPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ExportPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }


  interface ExportWorldPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ExportPresetConfigurationScreen<T> {}
  class ExportWorldPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ExportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ExportWorldPresetConfigurationScreenWrapper extends ExportWorldPresetConfigurationScreen<ExportWorldPresetConfigurationMenuWrapper> {}
  class ExportWorldPresetConfigurationScreenWrapper extends ExportWorldPresetConfigurationScreen<ExportWorldPresetConfigurationMenuWrapper> {
    constructor(menu: ExportWorldPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ImportCustomPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {}
  class ImportCustomPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    loadPreset(resourceLocation: ResourceLocation): void;
  }


  interface ImportCustomPresetConfigurationScreenWrapper extends ImportCustomPresetConfigurationScreen<ImportCustomPresetConfigurationMenuWrapper> {}
  class ImportCustomPresetConfigurationScreenWrapper extends ImportCustomPresetConfigurationScreen<ImportCustomPresetConfigurationMenuWrapper> {
    constructor(menu: ImportCustomPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ImportDefaultPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {}
  class ImportDefaultPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    loadPreset(resourceLocation: ResourceLocation): void;
  }


  interface ImportDefaultPresetConfigurationScreenWrapper extends ImportDefaultPresetConfigurationScreen<ImportDefaultPresetConfigurationMenuWrapper> {}
  class ImportDefaultPresetConfigurationScreenWrapper extends ImportDefaultPresetConfigurationScreen<ImportDefaultPresetConfigurationMenuWrapper> {
    constructor(menu: ImportDefaultPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ImportLocalPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {}
  class ImportLocalPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    loadPreset(resourceLocation: ResourceLocation): void;
  }


  interface ImportLocalPresetConfigurationScreenWrapper extends ImportLocalPresetConfigurationScreen<ImportLocalPresetConfigurationMenuWrapper> {}
  class ImportLocalPresetConfigurationScreenWrapper extends ImportLocalPresetConfigurationScreen<ImportLocalPresetConfigurationMenuWrapper> {
    constructor(menu: ImportLocalPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ImportPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ImportPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    static get presets(): ResourceLocation[];
    getPresetFileName(resourceLocation: ResourceLocation): string;
    static hasNoPresets(): boolean;
    init(): void;
    loadPreset(resourceLocation: ResourceLocation): void;
    loadPresetConfirm(resourceLocation: ResourceLocation): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    static updatePresets(presets: ResourceLocation[]): void;
    static updateSelectedPreset(resourceLocation: ResourceLocation): void;
  }


  interface ImportWorldPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {}
  class ImportWorldPresetConfigurationScreen<T extends ConfigurationMenu = any> extends ImportPresetConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    loadPreset(resourceLocation: ResourceLocation): void;
  }


  interface ImportWorldPresetConfigurationScreenWrapper extends ImportWorldPresetConfigurationScreen<ImportWorldPresetConfigurationMenuWrapper> {}
  class ImportWorldPresetConfigurationScreenWrapper extends ImportWorldPresetConfigurationScreen<ImportWorldPresetConfigurationMenuWrapper> {
    constructor(menu: ImportWorldPresetConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.preset.ImportPresetConfigurationScreen' {
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Entry } from 'de.markusbordihn.easynpc.configui.client.screen.configuration.preset.ImportPresetConfigurationScreen.ImportFileSelectionList';
  import { Minecraft } from 'net.minecraft.client';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ImportFileSelectionList extends ObjectSelectionList<Entry> {}
  class ImportFileSelectionList extends ObjectSelectionList<Entry> {
    constructor(minecraft: Minecraft);
    get rowWidth(): number;
    isFocused(): boolean;
    renderSelectionList(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updatePresets(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.preset.ImportPresetConfigurationScreen.ImportFileSelectionList' {
  import { Entry as objectselectionlist_Entry } from 'ObjectSelectionList';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SkinModel } from 'de.markusbordihn.easynpc.data.skin';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Component } from 'net.minecraft.network.chat';

  interface Entry extends objectselectionlist_Entry<Entry> {}
  class Entry extends objectselectionlist_Entry<Entry> {
    constructor(resourceLocation: ResourceLocation, skinModel: SkinModel);
    get narration(): Component;
    mouseClicked(unused1: number, unused2: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, x: number, y: number, unused1: number, unused2: number, unused3: number, unused4: number, unused5: number, unused6: boolean, partialTicks: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.rotation' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DefaultRotationConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.rotation';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface DefaultRotationConfigurationScreen<T extends ConfigurationMenu = any> extends RotationConfigurationScreen<T> {}
  class DefaultRotationConfigurationScreen<T extends ConfigurationMenu = any> extends RotationConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface DefaultRotationConfigurationScreenWrapper extends DefaultRotationConfigurationScreen<DefaultRotationConfigurationMenuWrapper> {}
  class DefaultRotationConfigurationScreenWrapper extends DefaultRotationConfigurationScreen<DefaultRotationConfigurationMenuWrapper> {
    constructor(menu: DefaultRotationConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface RotationConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class RotationConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    renderDefaultScreenBg(guiGraphics: GuiGraphics, leftPos: number, topPos: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.scaling' {
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ScalingConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.scaling';

  interface ScalingConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class ScalingConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface ScalingConfigurationScreenWrapper extends ScalingConfigurationScreen<ScalingConfigurationMenuWrapper> {}
  class ScalingConfigurationScreenWrapper extends ScalingConfigurationScreen<ScalingConfigurationMenuWrapper> {
    constructor(menu: ScalingConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.skin' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { CustomSkinConfigurationMenuWrapper, DefaultSkinConfigurationMenuWrapper, NoneSkinConfigurationMenuWrapper, PlayerSkinConfigurationMenuWrapper, UrlSkinConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.skin';
  import { ConfigurationScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface CustomSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {}
  class CustomSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface CustomSkinConfigurationScreenWrapper extends CustomSkinConfigurationScreen<CustomSkinConfigurationMenuWrapper> {}
  class CustomSkinConfigurationScreenWrapper extends CustomSkinConfigurationScreen<CustomSkinConfigurationMenuWrapper> {
    constructor(menu: CustomSkinConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DefaultSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {}
  class DefaultSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DefaultSkinConfigurationScreenWrapper extends DefaultSkinConfigurationScreen<DefaultSkinConfigurationMenuWrapper> {}
  class DefaultSkinConfigurationScreenWrapper extends DefaultSkinConfigurationScreen<DefaultSkinConfigurationMenuWrapper> {
    constructor(menu: DefaultSkinConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface NoneSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {}
  class NoneSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface NoneSkinConfigurationScreenWrapper extends NoneSkinConfigurationScreen<NoneSkinConfigurationMenuWrapper> {}
  class NoneSkinConfigurationScreenWrapper extends NoneSkinConfigurationScreen<NoneSkinConfigurationMenuWrapper> {
    constructor(menu: NoneSkinConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface PlayerSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {}
  class PlayerSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface PlayerSkinConfigurationScreenWrapper extends PlayerSkinConfigurationScreen<PlayerSkinConfigurationMenuWrapper> {}
  class PlayerSkinConfigurationScreenWrapper extends PlayerSkinConfigurationScreen<PlayerSkinConfigurationMenuWrapper> {
    constructor(menu: PlayerSkinConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface SkinConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {}
  class SkinConfigurationScreen<T extends ConfigurationMenu = any> extends ConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface UrlSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {}
  class UrlSkinConfigurationScreen<T extends ConfigurationMenu = any> extends SkinConfigurationScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface UrlSkinConfigurationScreenWrapper extends UrlSkinConfigurationScreen<UrlSkinConfigurationMenuWrapper> {}
  class UrlSkinConfigurationScreenWrapper extends UrlSkinConfigurationScreen<UrlSkinConfigurationMenuWrapper> {
    constructor(menu: UrlSkinConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.configuration.trading' {
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { AdvancedTradingConfigurationMenuWrapper, BasicTradingConfigurationMenuWrapper, CustomTradingConfigurationMenuWrapper, NoneTradingConfigurationMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.configuration.trading';
  import { TradingType } from 'de.markusbordihn.easynpc.data.trading';
  import { ConfigurationContainerScreen } from 'de.markusbordihn.easynpc.configui.client.screen.configuration';

  interface AdvancedTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {}
  class AdvancedTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    containerTick(): void;
    get maxPages(): number;
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface AdvancedTradingConfigurationScreenWrapper extends AdvancedTradingConfigurationContainerScreen<AdvancedTradingConfigurationMenuWrapper> {}
  class AdvancedTradingConfigurationScreenWrapper extends AdvancedTradingConfigurationContainerScreen<AdvancedTradingConfigurationMenuWrapper> {
    constructor(menu: AdvancedTradingConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface BasicTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {}
  class BasicTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface BasicTradingConfigurationScreenWrapper extends BasicTradingConfigurationContainerScreen<BasicTradingConfigurationMenuWrapper> {}
  class BasicTradingConfigurationScreenWrapper extends BasicTradingConfigurationContainerScreen<BasicTradingConfigurationMenuWrapper> {
    constructor(menu: BasicTradingConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface CustomTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {}
  class CustomTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    static setFormerTradingType(dialogType: TradingType): void;
  }


  interface CustomTradingConfigurationScreenWrapper extends CustomTradingConfigurationContainerScreen<CustomTradingConfigurationMenuWrapper> {}
  class CustomTradingConfigurationScreenWrapper extends CustomTradingConfigurationContainerScreen<CustomTradingConfigurationMenuWrapper> {
    constructor(menu: CustomTradingConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface NoneTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {}
  class NoneTradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends TradingConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    static setFormerTradingType(dialogType: TradingType): void;
  }


  interface NoneTradingConfigurationScreenWrapper extends NoneTradingConfigurationContainerScreen<NoneTradingConfigurationMenuWrapper> {}
  class NoneTradingConfigurationScreenWrapper extends NoneTradingConfigurationContainerScreen<NoneTradingConfigurationMenuWrapper> {
    constructor(menu: NoneTradingConfigurationMenuWrapper, inventory: Inventory, component: Component);
  }


  interface TradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends ConfigurationContainerScreen<T> {}
  class TradingConfigurationContainerScreen<T extends ConfigurationMenu = any> extends ConfigurationContainerScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.action' {
  import { EditorScreen } from 'de.markusbordihn.easynpc.configui.client.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ActionDataEditorMenuWrapper, ActionDataEntryEditorMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.editor';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable, ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { ActionDataSet, ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';
  import { Minecraft } from 'net.minecraft.client';
  import { OnUp, OnDown, OnEdit, OnRemove } from 'de.markusbordihn.easynpc.configui.client.screen.editor.action.ActionDataListEntry';
  import { Entry } from 'ObjectSelectionList';

  interface ActionDataEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class ActionDataEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ActionDataEditorScreenWrapper extends ActionDataEditorContainerScreen<ActionDataEditorMenuWrapper> {}
  class ActionDataEditorScreenWrapper extends ActionDataEditorContainerScreen<ActionDataEditorMenuWrapper> {
    constructor(menu: ActionDataEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ActionDataEntryEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class ActionDataEntryEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    addActionEntryWidget<W extends GuiEventListener & Renderable>(widget: W): W;
    currentEventRequiresServerPlayer(): boolean;
    get font(): Font;
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface ActionDataEntryEditorScreenWrapper extends ActionDataEntryEditorContainerScreen<ActionDataEntryEditorMenuWrapper> {}
  class ActionDataEntryEditorScreenWrapper extends ActionDataEntryEditorContainerScreen<ActionDataEntryEditorMenuWrapper> {
    constructor(menu: ActionDataEntryEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ActionDataList extends ObjectSelectionList<ActionDataListEntry> {}
  class ActionDataList extends ObjectSelectionList<ActionDataListEntry> {
    constructor(actionDataSet: ActionDataSet, minecraft: Minecraft, width: number, height: number, left: number, top: number, bottom: number, entryHeight: number, onUp: OnUp, onDown: OnDown, onEdit: OnEdit, onRemove: OnRemove);
  }


  interface ActionDataListEntry extends Entry<ActionDataListEntry> {}
  class ActionDataListEntry extends Entry<ActionDataListEntry> {
    static readonly ID_LEFT_POS: number;
    static readonly TYPE_LEFT_POS: number;
    static readonly VALUE_LEFT_POS: number;
    static readonly OPTIONS_LEFT_POS: number;
    constructor(minecraft: Minecraft, actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, leftPos: number, topPos: number, onUp: OnUp, onDown: OnDown, onEdit: OnEdit, onRemove: OnRemove);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, entryId: number, top: number, left: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isSelected: boolean, partialTicks: number): void;
    renderSeparatorLines(guiGraphics: GuiGraphics, top: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.action.ActionDataListEntry' {
  import { ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';

  class OnUp {
    changeOrder(var1: ActionDataEntry): void;
  }


  class OnDown {
    changeOrder(var1: ActionDataEntry): void;
  }


  class OnEdit {
    edit(var1: ActionDataEntry): void;
  }


  class OnRemove {
    remove(var1: ActionDataEntry): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.action.entry' {
  import { ActionDataEntry, ActionDataSet } from 'de.markusbordihn.easynpc.data.action';
  import { ActionDataEntryEditorContainerScreen } from 'de.markusbordihn.easynpc.configui.client.screen.editor.action';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface CloseDialogEntry extends ActionEntryWidget {}
  class CloseDialogEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface CommandActionEntry extends ActionEntryWidget {}
  class CommandActionEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  class DialogCommandParser {
    static isDialogOpenCommand(command: string): boolean;
    static parseDialogCommand(command: string): ActionDataEntry;
  }


  interface InteractBlockEntry extends ActionEntryWidget {}
  class InteractBlockEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface OpenDefaultDialogEntry extends ActionEntryWidget {}
  class OpenDefaultDialogEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface OpenNamedDialogEntry extends ActionEntryWidget {}
  class OpenNamedDialogEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface OpenTradingScreenEntry extends ActionEntryWidget {}
  class OpenTradingScreenEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface ScoreboardEntry extends ActionEntryWidget {}
  class ScoreboardEntry extends ActionEntryWidget {
    constructor(actionDataEntry: ActionDataEntry, actionDataSet: ActionDataSet, screen: ActionDataEntryEditorContainerScreen<any>);
    get actionDataEntry(): ActionDataEntry;
    hasChanged(): boolean;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.condition' {
  import { EditorScreen } from 'de.markusbordihn.easynpc.configui.client.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ConditionDataEditorMenuWrapper, ConditionDataEntryEditorMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.editor';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Renderable, ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { ConditionDataSet, ConditionDataEntry } from 'de.markusbordihn.easynpc.data.condition';
  import { Minecraft } from 'net.minecraft.client';
  import { OnEdit, OnRemove } from 'de.markusbordihn.easynpc.configui.client.screen.editor.condition.ConditionDataListEntry';
  import { Entry } from 'ObjectSelectionList';

  interface ConditionDataEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class ConditionDataEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ConditionDataEditorContainerScreenWrapper extends ConditionDataEditorContainerScreen<ConditionDataEditorMenuWrapper> {}
  class ConditionDataEditorContainerScreenWrapper extends ConditionDataEditorContainerScreen<ConditionDataEditorMenuWrapper> {
    constructor(menu: ConditionDataEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ConditionDataEntryEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class ConditionDataEntryEditorContainerScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    addConditionEntryWidget<W extends GuiEventListener & Renderable>(widget: W): W;
    get font(): Font;
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface ConditionDataEntryEditorContainerScreenWrapper extends ConditionDataEntryEditorContainerScreen<ConditionDataEntryEditorMenuWrapper> {}
  class ConditionDataEntryEditorContainerScreenWrapper extends ConditionDataEntryEditorContainerScreen<ConditionDataEntryEditorMenuWrapper> {
    constructor(menu: ConditionDataEntryEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface ConditionDataList extends ObjectSelectionList<ConditionDataListEntry> {}
  class ConditionDataList extends ObjectSelectionList<ConditionDataListEntry> {
    constructor(conditionDataSet: ConditionDataSet, minecraft: Minecraft, width: number, height: number, left: number, top: number, bottom: number, entryHeight: number, onEdit: OnEdit, onRemove: OnRemove);
  }


  interface ConditionDataListEntry extends Entry<ConditionDataListEntry> {}
  class ConditionDataListEntry extends Entry<ConditionDataListEntry> {
    static readonly ID_LEFT_POS: number;
    static readonly TYPE_LEFT_POS: number;
    static readonly VALUE_LEFT_POS: number;
    static readonly OPTIONS_LEFT_POS: number;
    constructor(minecraft: Minecraft, conditionDataEntry: ConditionDataEntry, leftPos: number, topPos: number, onEdit: OnEdit, onRemove: OnRemove);
    get narration(): Component;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, entryId: number, top: number, left: number, entryWidth: number, entryHeight: number, mouseX: number, mouseY: number, isSelected: boolean, partialTicks: number): void;
    renderSeparatorLines(guiGraphics: GuiGraphics, top: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.condition.ConditionDataListEntry' {
  import { ConditionDataEntry } from 'de.markusbordihn.easynpc.data.condition';

  class OnEdit {
    edit(var1: ConditionDataEntry): void;
  }


  class OnRemove {
    remove(var1: ConditionDataEntry): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.condition.entry' {
  import { ConditionDataEntry, ConditionDataSet } from 'de.markusbordihn.easynpc.data.condition';
  import { ConditionDataEntryEditorContainerScreen } from 'de.markusbordihn.easynpc.configui.client.screen.editor.condition';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  class ConditionEntryWidget {
    constructor(conditionDataEntry: ConditionDataEntry, conditionDataSet: ConditionDataSet, screen: ConditionDataEntryEditorContainerScreen<any>);
    get conditionDataEntry(): ConditionDataEntry;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface ExecutionLimitConditionEntry extends ConditionEntryWidget {}
  class ExecutionLimitConditionEntry extends ConditionEntryWidget {
    constructor(conditionDataEntry: ConditionDataEntry, conditionDataSet: ConditionDataSet, screen: ConditionDataEntryEditorContainerScreen<any>);
    get conditionDataEntry(): ConditionDataEntry;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }


  interface ScoreboardConditionEntry extends ConditionEntryWidget {}
  class ScoreboardConditionEntry extends ConditionEntryWidget {
    constructor(conditionDataEntry: ConditionDataEntry, conditionDataSet: ConditionDataSet, screen: ConditionDataEntryEditorContainerScreen<any>);
    get conditionDataEntry(): ConditionDataEntry;
    init(editorLeft: number, editorTop: number): void;
    render(guiGraphics: GuiGraphics, editorLeft: number, editorTop: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.editor.dialog' {
  import { EditorScreen } from 'de.markusbordihn.easynpc.configui.client.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { DialogButtonEditorMenuWrapper, DialogEditorMenuWrapper, DialogTextEditorMenuWrapper } from 'de.markusbordihn.easynpc.configui.menu.editor';

  interface DialogButtonEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class DialogButtonEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface DialogButtonEditorScreenWrapper extends DialogButtonEditorScreen<DialogButtonEditorMenuWrapper> {}
  class DialogButtonEditorScreenWrapper extends DialogButtonEditorScreen<DialogButtonEditorMenuWrapper> {
    constructor(menu: DialogButtonEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DialogEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class DialogEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
    updateTick(): void;
  }


  interface DialogEditorScreenWrapper extends DialogEditorScreen<DialogEditorMenuWrapper> {}
  class DialogEditorScreenWrapper extends DialogEditorScreen<DialogEditorMenuWrapper> {
    constructor(menu: DialogEditorMenuWrapper, inventory: Inventory, component: Component);
  }


  interface DialogTextEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {}
  class DialogTextEditorScreen<T extends EditorMenu = any> extends EditorScreen<T> {
    constructor(menu: T, inventory: Inventory, component: Component);
    init(): void;
    render(guiGraphics: GuiGraphics, x: number, y: number, partialTicks: number): void;
  }


  interface DialogTextEditorScreenWrapper extends DialogTextEditorScreen<DialogTextEditorMenuWrapper> {}
  class DialogTextEditorScreenWrapper extends DialogTextEditorScreen<DialogTextEditorMenuWrapper> {
    constructor(menu: DialogTextEditorMenuWrapper, inventory: Inventory, component: Component);
  }

}

declare module 'de.markusbordihn.easynpc.configui.client.screen.preset' {
  import { CustomScreen } from 'de.markusbordihn.easynpc.configui.client.screen';
  import { PresetBrowserMenu } from 'de.markusbordihn.easynpc.configui.menu.preset';
  import { AdditionalScreenData } from 'de.markusbordihn.easynpc.configui.data.screen';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { PresetData, PresetMetadata, PresetType } from 'de.markusbordihn.easynpc.data.preset';
  import { ObjectSelectionList } from 'net.minecraft.client.gui.components';
  import { Minecraft } from 'net.minecraft.client';
  import { Entry } from 'ObjectSelectionList';

  interface PresetBrowserScreen extends CustomScreen<PresetBrowserMenu, AdditionalScreenData> {}
  class PresetBrowserScreen extends CustomScreen<PresetBrowserMenu, AdditionalScreenData> {
    constructor(menu: PresetBrowserMenu, inventory: Inventory, component: Component);
    isPauseScreen(): boolean;
    isSelected(preset: ResourceLocation): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, deltaX: number, deltaY: number): boolean;
    removed(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    selectEntry(entry: PresetListEntry): void;
  }


  class PresetDetailsView {
    static render(guiGraphics: GuiGraphics, font: Font, npc: EasyNPC<any>, presetData: PresetData, x: number, y: number, width: number, height: number): void;
  }


  class PresetInfoView {
    static render(guiGraphics: GuiGraphics, font: Font, preset: ResourceLocation, metadata: PresetMetadata, x: number, y: number, width: number, height: number): void;
  }


  interface PresetList extends ObjectSelectionList<PresetListEntry> {}
  class PresetList extends ObjectSelectionList<PresetListEntry> {
    constructor(minecraft: Minecraft, width: number, height: number, y0: number, itemHeight: number);
    addEntry(presetListEntry: PresetListEntry): number;
    get rowWidth(): number;
    removed(): void;
  }


  interface PresetListEntry extends Entry<PresetListEntry> {}
  class PresetListEntry extends Entry<PresetListEntry> {
    constructor(preset: ResourceLocation, metadata: PresetMetadata, presetType: PresetType, screen: PresetBrowserScreen);
    cleanup(): void;
    get metadata(): PresetMetadata;
    get narration(): Component;
    get preset(): ResourceLocation;
    get presetData(): PresetData;
    get presetType(): PresetType;
    get previewNPC(): EasyNPC<any>;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    render(guiGraphics: GuiGraphics, index: number, top: number, left: number, width: number, height: number, mouseX: number, mouseY: number, isMouseOver: boolean, partialTicks: number): void;
  }


  class PresetPreviewView {
    static render(guiGraphics: GuiGraphics, font: Font, npc: EasyNPC<any>, x: number, y: number, width: number, height: number, previewY: number, mouseX: number, mouseY: number): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.commands' {
  import { RegisterCommandsEvent } from 'net.neoforged.neoforge.event';
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CommandsEventHandler {
    static handleRegisterCommandsEvent(event: RegisterCommandsEvent): void;
  }


  class PresetBrowserCommand {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }

}

declare module 'de.markusbordihn.easynpc.configui.commands.manager' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';

  class CommandManager {
    static registerCommands(commandDispatcher: CommandDispatcher<CommandSourceStack>): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui' {
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { UUID } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Path } from 'java.nio.file';

  class ConfigUIClient {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class ConfigUIMain {
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_COMMAND: string;
    static readonly MOD_PREFIX: string;
    static readonly MOD_PREFIX_ID: string;
    static readonly LOG_ICON: string;
    static readonly LOG_NAME: string;
    static readonly LOG_REGISTER_PREFIX: string;
    static readonly EMPTY_UUID: UUID;
    static readonly TEXT_PREFIX: string;
    static readonly TEXT_CONFIG_PREFIX: string;
    static readonly TEXT_ITEM_PREFIX: string;
    static readonly MINECRAFT_PREFIX: string;
    static readonly MINECRAFT_RESOURCE_PREFIX: string;
    static readonly TEXTURE_CONFIGURATION: ResourceLocation;
    static readonly TEXTURE_DEMO_BACKGROUND: ResourceLocation;
    static readonly TEXTURE_INVENTORY: ResourceLocation;
    static readonly FONT_COLOR_BLACK: number;
    static readonly FONT_COLOR_DARK_GREEN: number;
    static readonly FONT_COLOR_DEFAULT: number;
    static readonly FONT_COLOR_GRAY: number;
    static readonly FONT_COLOR_GREEN: number;
    static readonly FONT_COLOR_LIGHT_GRAY: number;
    static readonly FONT_COLOR_RED: number;
    static readonly FONT_COLOR_WHITE: number;
    static readonly FONT_COLOR_YELLOW: number;
    static GAME_DIR: Path;
    static CONFIG_DIR: Path;
  }

}

declare module 'de.markusbordihn.easynpc.configui.data.custom' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CustomMenuType extends Enum<CustomMenuType> {}
  class CustomMenuType extends Enum<CustomMenuType> {
    static readonly PRESET_BROWSER: CustomMenuType;
    get name(): string;
    static valueOf(name: string): CustomMenuType;
    static values(): CustomMenuType[];
  }

}

declare module 'de.markusbordihn.easynpc.configui.data.editor' {
  import { Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List } from 'java.util';

  interface EditorType extends Enum<EditorType> {}
  class EditorType extends Enum<EditorType> {
    static readonly NONE: EditorType;
    static readonly ACTION_DATA: EditorType;
    static readonly ACTION_DATA_ENTRY: EditorType;
    static readonly CONDITION_DATA: EditorType;
    static readonly CONDITION_DATA_ENTRY: EditorType;
    static readonly DIALOG: EditorType;
    static readonly DIALOG_BUTTON: EditorType;
    static readonly DIALOG_TEXT: EditorType;
    static get(editorType: string): EditorType;
    get id(): ResourceLocation;
    get name(): string;
    static valueOf(name: string): EditorType;
    static values(): EditorType[];
  }

}

declare module 'de.markusbordihn.easynpc.configui.data.preset' {
  import { Enum } from 'java.lang';
  import { Set, List } from 'java.util';
  import { PresetType } from 'de.markusbordihn.easynpc.data.preset';

  interface PresetFilterType extends Enum<PresetFilterType> {}
  class PresetFilterType extends Enum<PresetFilterType> {
    static readonly ALL: PresetFilterType;
    static readonly CUSTOM: PresetFilterType;
    static readonly DATA: PresetFilterType;
    static readonly DEFAULT: PresetFilterType;
    static readonly LOCAL: PresetFilterType;
    static readonly WORLD: PresetFilterType;
    static get allFilters(): Set<PresetFilterType>;
    static get filterNames(): Set<string>;
    get presetType(): PresetType;
    matches(type: PresetType): boolean;
    static valueOf(name: string): PresetFilterType;
    static values(): PresetFilterType[];
  }

}

declare module 'de.markusbordihn.easynpc.configui.data.screen' {
  import { AdditionalScreenDataInterface } from 'de.markusbordihn.easynpc.data.screen';
  import { CompoundTag, ListTag } from 'net.minecraft.nbt';
  import { ActionEventType, ActionEventSet } from 'de.markusbordihn.easynpc.data.action';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { BaseAttributes } from 'de.markusbordihn.easynpc.data.attribute';
  import { ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { DialogDataSet } from 'de.markusbordihn.easynpc.data.dialog';
  import { EditorType } from 'de.markusbordihn.easynpc.configui.data.editor';
  import { ObjectiveDataSet } from 'de.markusbordihn.easynpc.data.objective';
  import { ScoreboardData } from 'de.markusbordihn.easynpc.data.scoreboard';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface AdditionalScreenData extends AdditionalScreenDataInterface {}
  class AdditionalScreenData extends AdditionalScreenDataInterface {
    constructor(compoundTag: CompoundTag);
    static addActionEventSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addActionEventType(compoundTag: CompoundTag, actionEventType: ActionEventType): void;
    static addBaseAttributes(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addConfigurationType(compoundTag: CompoundTag, configurationType: ConfigurationType): void;
    static addDialogDataSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addDialogDataSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): void;
    static addEditorType(compoundTag: CompoundTag, editorType: EditorType): void;
    static addObjectiveDataSet(compoundTag: CompoundTag, easyNPC: EasyNPC<any>): void;
    static addScoreboardData(compoundTag: CompoundTag, scoreboardData: ScoreboardData): void;
    get(dataTag: string): CompoundTag;
    get actionEventSet(): ActionEventSet;
    get actionEventType(): ActionEventType;
    get baseAttributes(): BaseAttributes;
    get configurationType(): ConfigurationType;
    get data(): CompoundTag;
    get dialogDataSet(): DialogDataSet;
    get editorType(): EditorType;
    get objectiveDataSet(): ObjectiveDataSet;
    get scoreboardData(): ScoreboardData;
    static getActionEventSet(compoundTag: CompoundTag): ActionEventSet;
    static getActionEventType(compoundTag: CompoundTag): ActionEventType;
    static getBaseAttributes(compoundTag: CompoundTag): BaseAttributes;
    static getConfigurationType(compoundTag: CompoundTag): ConfigurationType;
    static getDialogDataSet(compoundTag: CompoundTag): DialogDataSet;
    static getEditorType(compoundTag: CompoundTag): EditorType;
    getList(dataTag: string): ListTag;
    static getObjectiveDataSet(compoundTag: CompoundTag): ObjectiveDataSet;
    static getScoreboardData(compoundTag: CompoundTag): ScoreboardData;
    static hasActionEventSet(compoundTag: CompoundTag): boolean;
    static hasActionEventType(compoundTag: CompoundTag): boolean;
    static hasBaseAttributes(compoundTag: CompoundTag): boolean;
    static hasConfigurationType(compoundTag: CompoundTag): boolean;
    static hasDialogDataSet(compoundTag: CompoundTag): boolean;
    hasDialogDataSet(): boolean;
    static hasEditorType(compoundTag: CompoundTag): boolean;
    static hasObjectiveDataSet(compoundTag: CompoundTag): boolean;
    static hasScoreboardData(compoundTag: CompoundTag): boolean;
  }

}

declare module 'de.markusbordihn.easynpc.configui.debug' {
  import { Logger, Level } from 'org.apache.logging.log4j';

  class DebugManager {
    static checkForDebugLogging(loggerName: string): void;
    static enableDebugLevel(enable: boolean): void;
    static enableDebugLevel(loggerName: string, enable: boolean): void;
    static getLogLevel(loggerName: string): Level;
    static isDebugLevel(loggerName: string): boolean;
    static isDebugMode(): boolean;
    static isDevelopmentEnvironment(): boolean;
    static setDevelopmentEnvironment(isDevelopmentEnvironment: boolean): void;
    static setLogLevel(logger: Logger, logLevel: Level): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.gametest' {
  import { GameTestHelper } from 'net.minecraft.gametest.framework';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { EntityType, PathfinderMob } from 'net.minecraft.world.entity';
  import { EditorType } from 'de.markusbordihn.easynpc.configui.data.editor';
  import { EditorMenu } from 'de.markusbordihn.easynpc.configui.menu.editor';

  class ConfigurationScreenTest {
    testOpenAbilitiesAttributeConfigurationScreen(helper: GameTestHelper): void;
    testOpenAdvancedDialogConfigurationScreen(helper: GameTestHelper): void;
    testOpenAdvancedPoseConfigurationScreen(helper: GameTestHelper): void;
    testOpenAdvancedTradingConfigurationScreen(helper: GameTestHelper): void;
    testOpenAttackObjectiveConfigurationScreen(helper: GameTestHelper): void;
    testOpenBaseAttributeConfigurationScreen(helper: GameTestHelper): void;
    testOpenBasicActionConfigurationScreen(helper: GameTestHelper): void;
    testOpenBasicDialogConfigurationScreen(helper: GameTestHelper): void;
    testOpenBasicObjectiveConfigurationScreen(helper: GameTestHelper): void;
    testOpenBasicTradingConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomModelConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomPoseConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomPresetExportConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomPresetImportConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomSkinConfigurationScreen(helper: GameTestHelper): void;
    testOpenCustomTradingConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultModelConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultPoseConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultPositionConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultPresetImportConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultRotationConfigurationScreen(helper: GameTestHelper): void;
    testOpenDefaultSkinConfigurationScreen(helper: GameTestHelper): void;
    testOpenDialogActionConfigurationScreen(helper: GameTestHelper): void;
    testOpenDisplayAttributeConfigurationScreen(helper: GameTestHelper): void;
    testOpenDistanceActionConfigurationScreen(helper: GameTestHelper): void;
    testOpenEquipmentConfigurationScreen(helper: GameTestHelper): void;
    testOpenFollowObjectiveConfigurationScreen(helper: GameTestHelper): void;
    testOpenLocalPresetImportConfigurationScreen(helper: GameTestHelper): void;
    testOpenLookObjectiveConfigurationScreen(helper: GameTestHelper): void;
    testOpenMainConfigurationScreen(helper: GameTestHelper): void;
    testOpenNoneDialogConfigurationScreen(helper: GameTestHelper): void;
    testOpenNoneSkinConfigurationScreen(helper: GameTestHelper): void;
    testOpenNoneTradingConfigurationScreen(helper: GameTestHelper): void;
    testOpenPlayerSkinConfigurationScreen(helper: GameTestHelper): void;
    testOpenScalingConfigurationScreen(helper: GameTestHelper): void;
    testOpenUrlSkinConfigurationScreen(helper: GameTestHelper): void;
    testOpenWorldPresetExportConfigurationScreen(helper: GameTestHelper): void;
    testOpenWorldPresetImportConfigurationScreen(helper: GameTestHelper): void;
    testOpenYesNoDialogConfigurationScreen(helper: GameTestHelper): void;
  }


  class ConfigurationScreenTestHelper {
    static mockOpenConfigurationScreen(serverPlayer: ServerPlayer, configurationType: ConfigurationType, easyNPC: EasyNPC<any>, menuType: MenuType<ConfigurationMenu>): UUID;
    static testConfigurationScreen(helper: GameTestHelper, npcEntityType: EntityType<PathfinderMob>, configurationType: ConfigurationType, menuType: MenuType<ConfigurationMenu>): void;
  }


  class EditorScreenTest {
    testActionDataEditorScreen(helper: GameTestHelper): void;
    testActionDataEntryEditorScreen(helper: GameTestHelper): void;
    testDialogButtonEditorScreen(helper: GameTestHelper): void;
    testDialogEditorScreen(helper: GameTestHelper): void;
    testDialogTextEditorScreen(helper: GameTestHelper): void;
  }


  class EditorScreenTestHelper {
    static mockOpenEditorScreen(serverPlayer: ServerPlayer, editorType: EditorType, easyNPC: EasyNPC<any>, menuType: MenuType<EditorMenu>): UUID;
    static testEditorScreen(helper: GameTestHelper, npcEntityType: EntityType<PathfinderMob>, editorType: EditorType, menuType: MenuType<EditorMenu>): void;
  }


  class MenuManagerTest {
    testMissingConfigurationType(helper: GameTestHelper): void;
    testMissingEditorType(helper: GameTestHelper): void;
  }


  class SmokeTest {
    testModRegistered(helper: GameTestHelper): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.handler' {
  import { TradingDataCapable } from 'de.markusbordihn.easynpc.entity.easynpc.data';
  import { Container } from 'net.minecraft.world';

  class TradingContainerHandler {
    static setAdvancedTradingOffers(tradingData: TradingDataCapable<any>, container: Container): void;
    static setBasicTradingOffers(tradingData: TradingDataCapable<any>, container: Container): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.item.configuration' {
  import { Item, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { Properties, TooltipContext } from 'Item';
  import { Level } from 'net.minecraft.world.level';
  import { Entity, LivingEntity } from 'net.minecraft.world.entity';
  import { InteractionResult, InteractionHand, InteractionResultHolder } from 'net.minecraft.world';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface EasyNPCWandItem extends Item {}
  class EasyNPCWandItem extends Item {
    static readonly ID: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipList: Component[], tooltipFlag: TooltipFlag): void;
    interactLivingEntity(itemStack: ItemStack, player: Player, livingEntity: LivingEntity, interactionHand: InteractionHand): InteractionResult;
    inventoryTick(itemStack: ItemStack, level: Level, entity: Entity, slot: number, selected: boolean): void;
    isFoil(itemStack: ItemStack): boolean;
    useOn(userContext: UseOnContext): InteractionResult;
  }


  interface PresetBrowserItem extends Item {}
  class PresetBrowserItem extends Item {
    static readonly ID: string;
    constructor(properties: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, tooltipList: Component[], tooltipFlag: TooltipFlag): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }

}

declare module 'de.markusbordihn.easynpc.configui.item' {
  import { Items } from 'DeferredRegister';
  import { DeferredItem } from 'net.neoforged.neoforge.registries';

  class ModItems {
    static readonly ITEMS: Items;
    static readonly EASY_NPC_WAND: DeferredItem;
    static readonly PRESET_BROWSER: DeferredItem;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu' {
  import { UUID } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { AdditionalScreenData } from 'de.markusbordihn.easynpc.configui.data.screen';
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { ScreenMenuInterface } from 'de.markusbordihn.easynpc.menu';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ItemStack } from 'net.minecraft.world.item';
  import { FMLCommonSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { EditorMenu } from 'de.markusbordihn.easynpc.configui.menu.editor';
  import { EditorType } from 'de.markusbordihn.easynpc.configui.data.editor';
  import { CustomMenuType } from 'de.markusbordihn.easynpc.configui.data.custom';
  import { Logger } from 'org.apache.logging.log4j';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ActionEventType } from 'de.markusbordihn.easynpc.data.action';
  import { MenuProvider } from 'net.minecraft.world';
  import { DeferredRegister, DeferredHolder } from 'net.neoforged.neoforge.registries';

  class ClientConfigUIMenuManager {
    static clearMenuData(): void;
    static get additionalScreenData(): AdditionalScreenData;
    static get menuData(): CompoundTag;
    static get menuId(): UUID;
    static get screenData(): ScreenData;
    static hasAdditionalScreenData(): boolean;
    static setMenuData(menuId: UUID, menuData: CompoundTag): void;
  }


  interface ConfigUIMenu extends ScreenMenuInterface<AdditionalScreenData>, AbstractContainerMenu {}
  class ConfigUIMenu extends ScreenMenuInterface<AdditionalScreenData> {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
    get additionalScreenData(): AdditionalScreenData;
    get easyNPC(): EasyNPC<any>;
    get npcUUID(): UUID;
    get pageIndex(): number;
    get screenData(): ScreenData;
    quickMoveStack(player: Player, slotIndex: number): ItemStack;
    stillValid(player: Player): boolean;
  }


  interface MenuHandler extends MenuHandlerInterface {}
  class MenuHandler extends MenuHandlerInterface {
    getMenuTypeByConfigurationType(configurationType: ConfigurationType): MenuType<ConfigurationMenu>;
    getMenuTypeByCustomType(customMenuType: CustomMenuType): MenuType<ConfigUIMenu>;
    getMenuTypeByEditorType(editorType: EditorType): MenuType<EditorMenu>;
    static registerMenuHandler(event: FMLCommonSetupEvent): void;
  }


  class MenuHandlerInterface {
    static readonly log: Logger;
    getMenuTypeByConfigurationType(var1: ConfigurationType): MenuType<ConfigurationMenu>;
    getMenuTypeByCustomType(var1: CustomMenuType): MenuType<ConfigUIMenu>;
    getMenuTypeByEditorType(var1: EditorType): MenuType<EditorMenu>;
    openConfigurationMenu(configurationType: ConfigurationType, serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, pageIndex: number): void;
    openCustomMenu(customMenuType: CustomMenuType, serverPlayer: ServerPlayer): void;
    openEditorMenu(editorType: EditorType, serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, dialogId: UUID, dialogButtonId: UUID, actionDataEntryId: UUID, actionEventType: ActionEventType, configurationType: ConfigurationType, formerEditorType: EditorType, pageIndex: number): void;
    openEditorMenu(editorType: EditorType, serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, dialogId: UUID, pageIndex: number): void;
    openEditorMenu(editorType: EditorType, serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, dialogId: UUID, dialogButtonId: UUID, pageIndex: number): void;
    openEditorMenu(editorType: EditorType, serverPlayer: ServerPlayer, easyNPC: EasyNPC<any>, dialogId: UUID, dialogButtonId: UUID, actionDataEntryId: UUID, conditionDataEntryId: UUID, pageIndex: number, additionalSyncData: CompoundTag): void;
  }


  class MenuManager {
    static get menuHandler(): MenuHandlerInterface;
    static openMenu(npcUUID: UUID, menuProvider: MenuProvider, serverPlayer: ServerPlayer, data: CompoundTag): void;
    static openMenu(menuId: UUID, serverPlayer: ServerPlayer): void;
    static registerMenu(uuid: UUID, menuProvider: MenuProvider, serverPlayer: ServerPlayer): UUID;
    static registerMenuHandler(menuHandler: MenuHandlerInterface): void;
  }


  class ModMenuTypes {
    static readonly MENU_TYPES: DeferredRegister;
    static readonly ABILITIES_ATTRIBUTE_CONFIGURATION_MENU: DeferredHolder;
    static readonly ACTION_DATA_EDITOR_MENU: DeferredHolder;
    static readonly ACTION_DATA_ENTRY_EDITOR_MENU: DeferredHolder;
    static readonly CONDITION_DATA_EDITOR_MENU: DeferredHolder;
    static readonly CONDITION_DATA_ENTRY_EDITOR_MENU: DeferredHolder;
    static readonly ADVANCED_DIALOG_CONFIGURATION_MENU: DeferredHolder;
    static readonly ADVANCED_POSE_CONFIGURATION_MENU: DeferredHolder;
    static readonly ADVANCED_TRADING_CONFIGURATION_MENU: DeferredHolder;
    static readonly ATTACK_OBJECTIVE_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASE_ATTRIBUTE_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASIC_ACTION_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASIC_DIALOG_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASIC_OBJECTIVE_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASIC_POSE_CONFIGURATION_MENU: DeferredHolder;
    static readonly BASIC_TRADING_CONFIGURATION_MENU: DeferredHolder;
    static readonly COMBAT_ATTRIBUTE_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_POSE_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_EXPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_IMPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_SKIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_TRADING_CONFIGURATION_MENU: DeferredHolder;
    static readonly CUSTOM_MODEL_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_MODEL_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_POSE_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_POSITION_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_IMPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_ROTATION_CONFIGURATION_MENU: DeferredHolder;
    static readonly DEFAULT_SKIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly DIALOG_EDITOR_MENU: DeferredHolder;
    static readonly DIALOG_BUTTON_EDITOR_MENU: DeferredHolder;
    static readonly DIALOG_TEXT_EDITOR_MENU: DeferredHolder;
    static readonly DIALOG_ACTION_CONFIGURATION_MENU: DeferredHolder;
    static readonly DISPLAY_ATTRIBUTE_CONFIGURATION_MENU: DeferredHolder;
    static readonly DISTANCE_ACTION_CONFIGURATION_MENU: DeferredHolder;
    static readonly EQUIPMENT_CONFIGURATION_MENU: DeferredHolder;
    static readonly FOLLOW_OBJECTIVE_CONFIGURATION_MENU: DeferredHolder;
    static readonly LOCAL_IMPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly LOOK_OBJECTIVE_CONFIGURATION_MENU: DeferredHolder;
    static readonly MAIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly NONE_DIALOG_CONFIGURATION_MENU: DeferredHolder;
    static readonly NONE_SKIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly NONE_TRADING_CONFIGURATION_MENU: DeferredHolder;
    static readonly PLAYER_SKIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly PRESET_BROWSER_MENU: DeferredHolder;
    static readonly SCALING_CONFIGURATION_MENU: DeferredHolder;
    static readonly URL_SKIN_CONFIGURATION_MENU: DeferredHolder;
    static readonly WORLD_EXPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly WORLD_IMPORT_PRESET_CONFIGURATION_MENU: DeferredHolder;
    static readonly YES_NO_DIALOG_CONFIGURATION_MENU: DeferredHolder;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.action' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface BasicActionConfigurationMenuWrapper extends ConfigurationMenu {}
  class BasicActionConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DialogActionConfigurationMenuWrapper extends ConfigurationMenu {}
  class DialogActionConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DistanceActionConfigurationMenuWrapper extends ConfigurationMenu {}
  class DistanceActionConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.attribute' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface AbilitiesAttributeConfigurationMenuWrapper extends ConfigurationMenu {}
  class AbilitiesAttributeConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface BaseAttributeConfigurationMenuWrapper extends ConfigurationMenu {}
  class BaseAttributeConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface CombatAttributeConfigurationMenuWrapper extends ConfigurationMenu {}
  class CombatAttributeConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DisplayAttributeConfigurationMenuWrapper extends ConfigurationMenu {}
  class DisplayAttributeConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration' {
  import { ConfigUIMenu } from 'de.markusbordihn.easynpc.configui.menu';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MenuProvider } from 'net.minecraft.world';
  import { ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { Component } from 'net.minecraft.network.chat';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ConfigurationMenu extends ConfigUIMenu {}
  class ConfigurationMenu extends ConfigUIMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
  }


  class ConfigurationMenuHandler {
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    get displayName(): Component;
    get displayName(): Component;
    get displayName(): Component;
    static getMenuProvider(configurationType: ConfigurationType, easyNPC: EasyNPC<any>, menuType: MenuType<ConfigurationMenu>, screenData: ScreenData): MenuProvider;
    static getScreenData(configurationType: ConfigurationType, easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer, pageIndex: number): ScreenData;
    toString(): string;
    toString(): string;
    toString(): string;
    toString(): string;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.dialog' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface AdvancedDialogConfigurationMenuWrapper extends ConfigurationMenu {}
  class AdvancedDialogConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface BasicDialogConfigurationMenuWrapper extends ConfigurationMenu {}
  class BasicDialogConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface NoneDialogConfigurationMenuWrapper extends ConfigurationMenu {}
  class NoneDialogConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface YesNoDialogConfigurationMenuWrapper extends ConfigurationMenu {}
  class YesNoDialogConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.equipment' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Container, InteractionHand } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { EquipmentSlot } from 'net.minecraft.world.entity';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface EquipmentConfigurationMenu extends ConfigurationMenu {}
  class EquipmentConfigurationMenu extends ConfigurationMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);

    constructor(menuType: MenuType<any>, windowId: number, playerInventory: Inventory, armorContainer: Container, handContainer: Container, data: CompoundTag);
    loadArmor(): void;
    loadHand(): void;
    setArmorChanged(equipmentSlot: EquipmentSlot, slot: number, itemStack: ItemStack): void;
    setHandChanged(hand: InteractionHand, itemStack: ItemStack): void;
  }


  interface EquipmentConfigurationMenuWrapper extends EquipmentConfigurationMenu {}
  class EquipmentConfigurationMenuWrapper extends EquipmentConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.equipment.slot' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { EquipmentConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration.equipment';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Pair } from 'com.mojang.datafixers.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ArmorSlot extends Slot {}
  class ArmorSlot extends Slot {
    readonly slotIndex: number;
    constructor(menu: EquipmentConfigurationMenu, container: Container, slotIndex: number, x: number, y: number);
    get maxStackSize(): number;
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPickup(player: Player): boolean;
    mayPlace(itemStack: ItemStack): boolean;
    set(itemStack: ItemStack): void;
  }


  interface HandSlot extends Slot {}
  class HandSlot extends Slot {
    readonly slotIndex: number;
    constructor(menu: EquipmentConfigurationMenu, container: Container, slotIndex: number, x: number, y: number);
    get noItemIcon(): Pair<ResourceLocation, ResourceLocation>;
    mayPickup(player: Player): boolean;
    mayPlace(itemStack: ItemStack): boolean;
    set(itemStack: ItemStack): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.main' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface MainConfigurationMenuWrapper extends ConfigurationMenu {}
  class MainConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.model' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface CustomModelConfigurationMenuWrapper extends ConfigurationMenu {}
  class CustomModelConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DefaultModelConfigurationMenuWrapper extends ConfigurationMenu {}
  class DefaultModelConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.objective' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface AttackObjectiveConfigurationMenuWrapper extends ConfigurationMenu {}
  class AttackObjectiveConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface BasicObjectiveConfigurationMenuWrapper extends ConfigurationMenu {}
  class BasicObjectiveConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface FollowObjectiveConfigurationMenuWrapper extends ConfigurationMenu {}
  class FollowObjectiveConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface LookObjectiveConfigurationMenuWrapper extends ConfigurationMenu {}
  class LookObjectiveConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.pose' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface AdvancedPoseConfigurationMenuWrapper extends ConfigurationMenu {}
  class AdvancedPoseConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface BasicPoseConfigurationMenuWrapper extends ConfigurationMenu {}
  class BasicPoseConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface CustomPoseConfigurationMenuWrapper extends ConfigurationMenu {}
  class CustomPoseConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DefaultPoseConfigurationMenuWrapper extends ConfigurationMenu {}
  class DefaultPoseConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.position' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface DefaultPositionConfigurationMenuWrapper extends ConfigurationMenu {}
  class DefaultPositionConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.preset' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface ExportCustomPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ExportCustomPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ExportWorldPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ExportWorldPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ImportCustomPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ImportCustomPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ImportDefaultPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ImportDefaultPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ImportLocalPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ImportLocalPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ImportWorldPresetConfigurationMenuWrapper extends ConfigurationMenu {}
  class ImportWorldPresetConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.rotation' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface DefaultRotationConfigurationMenuWrapper extends ConfigurationMenu {}
  class DefaultRotationConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.scaling' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface ScalingConfigurationMenuWrapper extends ConfigurationMenu {}
  class ScalingConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.skin' {
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface CustomSkinConfigurationMenuWrapper extends ConfigurationMenu {}
  class CustomSkinConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DefaultSkinConfigurationMenuWrapper extends ConfigurationMenu {}
  class DefaultSkinConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface NoneSkinConfigurationMenuWrapper extends ConfigurationMenu {}
  class NoneSkinConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface PlayerSkinConfigurationMenuWrapper extends ConfigurationMenu {}
  class PlayerSkinConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface UrlSkinConfigurationMenuWrapper extends ConfigurationMenu {}
  class UrlSkinConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.trading' {
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Container } from 'net.minecraft.world';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration';

  interface AdvancedTradingConfigurationMenu extends TradingConfigurationMenu {}
  class AdvancedTradingConfigurationMenu extends TradingConfigurationMenu {
    static readonly SLOT_SIZE: number;
    static readonly TRADING_OFFERS_PER_PAGE: number;
    static readonly TRADING_SLOT_SIZE: number;
    static readonly TRADING_START_POSITION_X: number;
    static readonly TRADING_START_POSITION_Y: number;
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);

    constructor(menuType: MenuType<any>, windowId: number, playerInventory: Inventory, tradingContainer: Container, data: CompoundTag);
    get maxPages(): number;
    setTradingChanged(): void;
  }


  interface AdvancedTradingConfigurationMenuWrapper extends AdvancedTradingConfigurationMenu {}
  class AdvancedTradingConfigurationMenuWrapper extends AdvancedTradingConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface BasicTradingConfigurationMenu extends TradingConfigurationMenu {}
  class BasicTradingConfigurationMenu extends TradingConfigurationMenu {
    static readonly SLOT_SIZE: number;
    static readonly TRADING_SLOT_SIZE: number;
    static readonly TRADING_START_POSITION_X: number;
    static readonly TRADING_START_POSITION_Y: number;
    static readonly TRADING_START_POSITION_SECOND_ROW_X: number;
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);

    constructor(menuType: MenuType<any>, windowId: number, playerInventory: Inventory, tradingContainer: Container, data: CompoundTag);
    setTradingChanged(): void;
  }


  interface BasicTradingConfigurationMenuWrapper extends BasicTradingConfigurationMenu {}
  class BasicTradingConfigurationMenuWrapper extends BasicTradingConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface CustomTradingConfigurationMenuWrapper extends ConfigurationMenu {}
  class CustomTradingConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface NoneTradingConfigurationMenuWrapper extends ConfigurationMenu {}
  class NoneTradingConfigurationMenuWrapper extends ConfigurationMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface TradingConfigurationMenu extends ConfigurationMenu {}
  class TradingConfigurationMenu extends ConfigurationMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
    setTradingChanged(): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.configuration.trading.slot' {
  import { Slot } from 'net.minecraft.world.inventory';
  import { TradingConfigurationMenu } from 'de.markusbordihn.easynpc.configui.menu.configuration.trading';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ItemASlot extends Slot {}
  class ItemASlot extends Slot {
    constructor(menu: TradingConfigurationMenu, container: Container, index: number, x: number, y: number);
    set(itemStack: ItemStack): void;
  }


  interface ItemBSlot extends Slot {}
  class ItemBSlot extends Slot {
    constructor(menu: TradingConfigurationMenu, container: Container, index: number, x: number, y: number);
    set(itemStack: ItemStack): void;
  }


  interface ItemResultSlot extends Slot {}
  class ItemResultSlot extends Slot {
    constructor(menu: TradingConfigurationMenu, container: Container, index: number, x: number, y: number);
    set(itemStack: ItemStack): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.custom' {
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { CustomMenuType } from 'de.markusbordihn.easynpc.configui.data.custom';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { MenuProvider } from 'net.minecraft.world';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';

  class CustomMenuHandler {
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    static getMenuProvider(customMenuType: CustomMenuType, menuType: MenuType<any>, screenData: ScreenData): MenuProvider;
    static getScreenData(customMenuType: CustomMenuType, serverPlayer: ServerPlayer): ScreenData;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.editor' {
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { ConfigUIMenu } from 'de.markusbordihn.easynpc.configui.menu';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { MenuProvider } from 'net.minecraft.world';
  import { EditorType } from 'de.markusbordihn.easynpc.configui.data.editor';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ScreenData } from 'de.markusbordihn.easynpc.data.screen';
  import { Component } from 'net.minecraft.network.chat';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { UUID } from 'java.util';

  interface ActionDataEditorMenuWrapper extends EditorMenu {}
  class ActionDataEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ActionDataEntryEditorMenuWrapper extends EditorMenu {}
  class ActionDataEntryEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ConditionDataEditorMenuWrapper extends EditorMenu {}
  class ConditionDataEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface ConditionDataEntryEditorMenuWrapper extends EditorMenu {}
  class ConditionDataEntryEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DialogButtonEditorMenuWrapper extends EditorMenu {}
  class DialogButtonEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DialogEditorMenuWrapper extends EditorMenu {}
  class DialogEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface DialogTextEditorMenuWrapper extends EditorMenu {}
  class DialogTextEditorMenuWrapper extends EditorMenu {
    constructor(windowId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }


  interface EditorMenu extends ConfigUIMenu {}
  class EditorMenu extends ConfigUIMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
  }


  class EditorMenuHandler {
    createMenu(containerId: number, playerInventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    static getMenuProvider(editorType: EditorType, easyNPC: EasyNPC<any>, menuType: MenuType<EditorMenu>, screenData: ScreenData): MenuProvider;
    static getScreenData(editorType: EditorType, easyNPC: EasyNPC<LivingEntity>, dialogId: UUID, dialogButtonId: UUID, actionDataEntryId: UUID, conditionDataEntryId: UUID, pageIndex: number, additionalSyncData: CompoundTag): ScreenData;
    toString(): string;
  }

}

declare module 'de.markusbordihn.easynpc.configui.menu.preset' {
  import { ConfigUIMenu } from 'de.markusbordihn.easynpc.configui.menu';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { FriendlyByteBuf } from 'net.minecraft.network';

  interface PresetBrowserMenu extends ConfigUIMenu {}
  class PresetBrowserMenu extends ConfigUIMenu {
    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory);

    constructor(menuType: MenuType<any>, containerId: number, playerInventory: Inventory, data: CompoundTag);
  }


  interface PresetBrowserMenuWrapper extends PresetBrowserMenu {}
  class PresetBrowserMenuWrapper extends PresetBrowserMenu {
    constructor(containerId: number, playerInventory: Inventory, buffer: FriendlyByteBuf);
  }

}

declare module 'de.markusbordihn.easynpc.configui.network' {
  import { ClientNetworkMessageHandlerInterface, ServerNetworkMessageHandlerInterface } from 'de.markusbordihn.easynpc.configui.network.message';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { NetworkMessageRecord } from 'de.markusbordihn.easynpc.network.message';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Type } from 'CustomPacketPayload';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf, FriendlyByteBuf } from 'net.minecraft.network';
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Map } from 'java.util';
  import { Logger } from 'org.apache.logging.log4j';
  import { NetworkHandlerManagerType } from 'de.markusbordihn.easynpc.network';

  interface ClientNetworkMessageHandler extends ClientNetworkMessageHandlerInterface {}
  class ClientNetworkMessageHandler extends ClientNetworkMessageHandlerInterface {
    constructor();
  }


  interface NetworkHandler extends NetworkHandlerInterface {}
  class NetworkHandler extends NetworkHandlerInterface {
    constructor();
    addClientMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addRegisteredClientMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addRegisteredServerMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    addServerMessage<M extends NetworkMessageRecord>(messageID: Type<M>, networkMessage: Class<M>): void;
    get clientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredClientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredServerMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get serverMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    registerClientNetworkMessageHandler<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    static registerNetworkHandler(payloadHandlersEvent: RegisterPayloadHandlersEvent): void;
    registerServerNetworkMessageHandler<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    sendToPlayer<M extends NetworkMessageRecord>(networkMessageRecord: M, serverPlayer: ServerPlayer): void;
    sendToServer<M extends NetworkMessageRecord>(networkMessageRecord: M): void;
  }


  class NetworkHandlerInterface {
    static readonly log: Logger;
    static readonly LOG_PREFIX: string;
    static readonly PROTOCOL_VERSION: number;
    addClientMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addRegisteredClientMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addRegisteredServerMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    addServerMessage<M extends NetworkMessageRecord>(var1: Type<M>, var2: Class<M>): void;
    get clientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredClientMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get registeredServerMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    get serverMessages(): Map<Type<any>, Class<NetworkMessageRecord>>;
    getRegisteredClientMessage(messageID: Type<any>): Class<NetworkMessageRecord>;
    getRegisteredClientMessageId(networkMessage: Class<NetworkMessageRecord>): Type<any>;
    getRegisteredServerMessage(messageID: Type<any>): Class<NetworkMessageRecord>;
    getRegisteredServerMessageId(networkMessage: Class<NetworkMessageRecord>): Type<any>;
    hasClientMessage(messageID: Type<any>): boolean;
    hasRegisteredClientMessage(messageID: Type<any>): boolean;
    hasRegisteredClientMessage(networkMessage: Class<NetworkMessageRecord>): boolean;
    hasRegisteredServerMessage(messageID: Type<any>): boolean;
    hasRegisteredServerMessage(networkMessage: Class<NetworkMessageRecord>): boolean;
    hasServerMessage(messageID: Type<any>): boolean;
    logRegisterClientNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>): void;
    logRegisterClientNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>, registrationID: number): void;
    logRegisterServerNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>): void;
    logRegisterServerNetworkMessageHandler(messageID: Type<any>, networkMessage: Class<any>, registrationID: number): void;
    registerClientNetworkMessage<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    registerClientNetworkMessageHandler<M extends NetworkMessageRecord>(var1: Type<M>, var2: StreamCodec<RegistryFriendlyByteBuf, M>, var3: Class<M>, var4: Function<FriendlyByteBuf, M>): void;
    registerClientPayloadType<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>): void;
    registerServerNetworkMessage<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>, networkMessage: Class<M>, creator: Function<FriendlyByteBuf, M>): void;
    registerServerNetworkMessageHandler<M extends NetworkMessageRecord>(var1: Type<M>, var2: StreamCodec<RegistryFriendlyByteBuf, M>, var3: Class<M>, var4: Function<FriendlyByteBuf, M>): void;
    registerServerPayloadType<M extends NetworkMessageRecord>(type: Type<M>, codec: StreamCodec<RegistryFriendlyByteBuf, M>): void;
    sendMessageToPlayer(networkMessageRecord: NetworkMessageRecord, serverPlayer: ServerPlayer): boolean;
    sendMessageToServer(networkMessageRecord: NetworkMessageRecord): boolean;
    sendToPlayer<M extends NetworkMessageRecord>(var1: M, var2: ServerPlayer): void;
    sendToServer<M extends NetworkMessageRecord>(var1: M): void;
  }


  class NetworkHandlerManager {
    static get handler(): NetworkHandlerInterface;
    static isClientNetworkHandler(): boolean;
    static isServerNetworkHandler(): boolean;
    static registerClientNetworkHandler(): void;
    static registerHandler(networkHandler: NetworkHandlerInterface): void;
    static registerNetworkMessages(networkHandlerType: NetworkHandlerManagerType): void;
    static registerServerNetworkHandler(): void;
    static sendMessageToPlayer(networkMessageRecord: NetworkMessageRecord, serverPlayer: ServerPlayer): void;
    static sendMessageToServer(networkMessageRecord: NetworkMessageRecord): void;
  }


  class NetworkMessageHandlerManager {
    static get clientHandler(): ClientNetworkMessageHandlerInterface;
    static get serverHandler(): ServerNetworkMessageHandlerInterface;
    static registerClientHandler(networkMessageHandler: ClientNetworkMessageHandlerInterface): void;
    static registerServerHandler(networkMessageHandler: ServerNetworkMessageHandlerInterface): void;
  }


  interface ServerNetworkMessageHandler extends ServerNetworkMessageHandlerInterface {}
  class ServerNetworkMessageHandler extends ServerNetworkMessageHandlerInterface {
    constructor();
  }

}

declare module 'de.markusbordihn.easynpc.configui.network.message' {
  import { Logger } from 'org.apache.logging.log4j';
  import { UUID } from 'java.util';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { PresetExportFormat, PresetMetadata, PresetType, PresetData } from 'de.markusbordihn.easynpc.data.preset';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { EasyNPC } from 'de.markusbordihn.easynpc.entity.easynpc';
  import { ActionEventType, ActionDataSet, ActionDataEntry } from 'de.markusbordihn.easynpc.data.action';
  import { ObjectiveDataEntry } from 'de.markusbordihn.easynpc.data.objective';
  import { Profession } from 'de.markusbordihn.easynpc.data.profession';
  import { TradingType } from 'de.markusbordihn.easynpc.data.trading';
  import { DisplayAttributeType, NameVisibilityType } from 'de.markusbordihn.easynpc.data.display';
  import { Boolean, Integer, Double } from 'java.lang';
  import { EntityAttribute, CombatAttributeType, EnvironmentalAttributeType, InteractionAttributeType, MovementAttributeType } from 'de.markusbordihn.easynpc.data.attribute';
  import { ConfigurationType } from 'de.markusbordihn.easynpc.data.configuration';
  import { EditorType } from 'de.markusbordihn.easynpc.configui.data.editor';
  import { ConditionDataEntry } from 'de.markusbordihn.easynpc.data.condition';
  import { DialogButtonEntry, DialogDataSet, DialogDataEntry } from 'de.markusbordihn.easynpc.data.dialog';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SkinDataEntry } from 'de.markusbordihn.easynpc.data.skin';
  import { Pose, EquipmentSlot, EntityType } from 'net.minecraft.world.entity';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Attribute } from 'net.minecraft.world.entity.ai.attributes';
  import { ModelPartType, ModelAnimationBehavior } from 'de.markusbordihn.easynpc.data.model';
  import { CustomPosition } from 'de.markusbordihn.easynpc.data.position';
  import { CustomRotation } from 'de.markusbordihn.easynpc.data.rotation';
  import { CustomScale } from 'de.markusbordihn.easynpc.data.scale';
  import { RenderType } from 'de.markusbordihn.easynpc.data.render';

  class ClientNetworkMessageHandlerInterface {
    static readonly log: Logger;
    exportClientPreset(uuid: UUID, name: string, serverPlayer: ServerPlayer): void;
    exportClientPreset(uuid: UUID, name: string, serverPlayer: ServerPlayer, exportFormat: PresetExportFormat, metadata: PresetMetadata): void;
    openMenu(uuid: UUID, menuId: UUID, serverPlayer: ServerPlayer, data: CompoundTag): void;
    syncData(easyNPC: EasyNPC<any>, serverPlayer: ServerPlayer): void;
  }


  class ServerNetworkMessageHandlerInterface {
    static readonly log: Logger;
    actionEventChange(uuid: UUID, actionEventType: ActionEventType, actionDataSet: ActionDataSet): void;
    addOrUpdateObjective(uuid: UUID, objectiveDataEntry: ObjectiveDataEntry): void;
    changeDisplayAttribute(uuid: UUID, displayAttributeType: DisplayAttributeType, booleanValue: boolean): void;
    changeDisplayAttribute(uuid: UUID, displayAttributeType: DisplayAttributeType, integerValue: number): void;
    changeName(uuid: UUID, name: string, color: number, nameVisibilityType: NameVisibilityType): void;
    changeProfession(uuid: UUID, profession: Profession): void;
    changeTradingType(uuid: UUID, tradingType: TradingType): void;
    combatAttributeChange(uuid: UUID, attributeType: CombatAttributeType, booleanValue: boolean): void;
    combatAttributeChange(uuid: UUID, attributeType: CombatAttributeType, doubleValue: number): void;
    entityAttributeChange(uuid: UUID, entityAttribute: EntityAttribute, booleanValue: boolean): void;
    entityBaseAttributeChange(uuid: UUID, attribute: Attribute, value: number): void;
    environmentalAttributeChange(uuid: UUID, attributeType: EnvironmentalAttributeType, booleanValue: boolean): void;
    exportPreset(uuid: UUID, name: string): void;
    exportPreset(uuid: UUID, name: string, exportFormat: PresetExportFormat, metadata: PresetMetadata): void;
    exportWorldPreset(uuid: UUID, name: string): void;
    importCustomPreset(uuid: UUID, resourceLocation: ResourceLocation): void;
    importDefaultPreset(uuid: UUID, resourceLocation: ResourceLocation): void;
    importLocalPreset(uuid: UUID, compoundTag: CompoundTag, resourceLocation: ResourceLocation): void;
    importPreset(uuid: UUID, presetType: PresetType, resourceLocation: ResourceLocation): void;
    importPreset(uuid: UUID, presetType: PresetType, compoundTag: CompoundTag, resourceLocation: ResourceLocation): void;
    importWorldPreset(uuid: UUID, resourceLocation: ResourceLocation): void;
    interactionAttributeChange(uuid: UUID, attributeType: InteractionAttributeType, booleanValue: boolean): void;
    modelAnimationBehaviorChange(uuid: UUID, animationBehavior: ModelAnimationBehavior): void;
    modelPositionChange(uuid: UUID, modelPartType: ModelPartType, position: CustomPosition): void;
    modelRotationChange(uuid: UUID, modelPartType: ModelPartType, rotation: CustomRotation): void;
    modelScaleChange(uuid: UUID, modelPartType: ModelPartType, scale: CustomScale): void;
    modelVisibilityChange(uuid: UUID, equipmentSlot: EquipmentSlot, visible: boolean): void;
    modelVisibilityChange(uuid: UUID, modelPartType: ModelPartType, visible: boolean): void;
    movementAttributeChange(uuid: UUID, attributeType: MovementAttributeType, booleanValue: boolean): void;
    openActionDataEditor(uuid: UUID, actionEventType: ActionEventType, configurationType: ConfigurationType): void;
    openActionDataEditor(uuid: UUID, editorType: EditorType, dialogId: UUID, dialogButtonId: UUID): void;
    openActionDataEntryEditor(uuid: UUID, editorType: EditorType, dialogId: UUID, dialogButtonId: UUID, actionDataEntry: ActionDataEntry): void;
    openActionDataEntryEditor(uuid: UUID, actionEventType: ActionEventType, configurationType: ConfigurationType, actionDataEntry: ActionDataEntry): void;
    openConditionDataEditor(uuid: UUID, dialogId: UUID): void;
    openConditionDataEntryEditor(uuid: UUID, dialogId: UUID, conditionDataEntry: ConditionDataEntry): void;
    openConfiguration(uuid: UUID, configurationType: ConfigurationType, pageIndex: number): void;
    openConfiguration(uuid: UUID, configurationType: ConfigurationType): void;
    openDialogButtonEditor(uuid: UUID, dialogId: UUID, dialogButtonId: UUID): void;
    openDialogButtonEditor(uuid: UUID, dialogId: UUID): void;
    openDialogEditor(uuid: UUID, dialogId: UUID): void;
    openDialogEditor(uuid: UUID): void;
    openDialogTextEditor(uuid: UUID, dialogId: UUID): void;
    openMenu(uuid: UUID, menuId: UUID): void;
    poseChange(uuid: UUID, pose: Pose): void;
    positionChange(uuid: UUID, pos: Vec3): void;
    removeDialog(uuid: UUID, dialogId: UUID): void;
    removeDialogButton(uuid: UUID, dialogId: UUID, dialogButtonId: UUID): void;
    removeNPC(uuid: UUID): void;
    removeObjective(uuid: UUID, objectiveDataEntry: ObjectiveDataEntry): void;
    respawnNPC(uuid: UUID): void;
    saveDialog(uuid: UUID, dialogId: UUID, dialogData: DialogDataEntry): void;
    saveDialogButton(uuid: UUID, dialogId: UUID, dialogButtonId: UUID, dialogButtonEntry: DialogButtonEntry): void;
    saveDialogSet(uuid: UUID, dialogDataSet: DialogDataSet): void;
    setAdvancedTradingDemand(uuid: UUID, tradingOfferIndex: number, demand: number): void;
    setAdvancedTradingMaxUses(uuid: UUID, tradingOfferIndex: number, maxUses: number): void;
    setAdvancedTradingPriceMultiplier(uuid: UUID, tradingOfferIndex: number, priceMultiplier: number): void;
    setAdvancedTradingResetsEveryMin(uuid: UUID, resetsEveryMin: number): void;
    setAdvancedTradingRewardExp(uuid: UUID, tradingOfferIndex: number, xp: number): void;
    setBasicTradingMaxUses(uuid: UUID, maxUses: number): void;
    setBasicTradingResetsEveryMin(uuid: UUID, resetsEveryMin: number): void;
    setBasicTradingRewardExp(uuid: UUID, rewardExp: number): void;
    setRenderEntityType(uuid: UUID, entityType: EntityType<any>): void;
    setRenderType(uuid: UUID, renderType: RenderType): void;
    setSkin(uuid: UUID, skinDataEntry: SkinDataEntry): void;
    spawnPreset(presetType: PresetType, resourceLocation: ResourceLocation, useOriginalData: boolean): void;
    spawnPresetWithData(presetData: PresetData, useOriginalData: boolean): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.server.commands' {
  import { Command } from 'de.markusbordihn.easynpc.commands';
  import { ArgumentBuilder } from 'com.mojang.brigadier.builder';
  import { CommandSourceStack } from 'net.minecraft.commands';

  interface ConfigureCommand extends Command {}
  class ConfigureCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
  }


  interface DebugCommand extends Command {}
  class DebugCommand extends Command {
    static register(): ArgumentBuilder<CommandSourceStack, any>;
    static setDebug(context: CommandSourceStack, enable: boolean): number;
  }

}

declare module 'de.markusbordihn.easynpc.configui.tabs' {
  import { DisplayItemsGenerator, ItemDisplayParameters, Output } from 'CreativeModeTab';
  import { BuildCreativeModeTabContentsEvent } from 'net.neoforged.neoforge.event';

  interface ConfigItems extends DisplayItemsGenerator {}
  class ConfigItems extends DisplayItemsGenerator {
    accept(itemDisplayParameters: ItemDisplayParameters, output: Output): void;
  }


  class ModTabs {
    static handleCreativeModeTabRegister(event: BuildCreativeModeTabContentsEvent): void;
  }

}

declare module 'de.markusbordihn.easynpc.configui.validator' {
  import { URL } from 'java.net';

  class RemoteImageValidator {
    static isValidImage(remoteUrl: URL): boolean;
  }

}