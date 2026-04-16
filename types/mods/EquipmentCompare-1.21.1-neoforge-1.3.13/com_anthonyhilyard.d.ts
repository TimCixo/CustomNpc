declare module 'com.anthonyhilyard.equipmentcompare.compat' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class TrinketsHandler {
    static getTrinketsMatchingSlot(player: LivingEntity, stack: ItemStack): ItemStack[];
  }

}

declare module 'com.anthonyhilyard.equipmentcompare.config' {
  import { IcebergConfig } from 'com.anthonyhilyard.iceberg.config';
  import { Supplier } from 'java.util.function';
  import { IIcebergConfigSpecBuilder } from 'com.anthonyhilyard.iceberg.services';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';

  interface EquipmentCompareConfig extends IcebergConfig<EquipmentCompareConfig> {}
  class EquipmentCompareConfig extends IcebergConfig<EquipmentCompareConfig> {
    readonly defaultOn: Supplier;
    readonly strict: Supplier;
    readonly maxComparisons: Supplier;
    readonly badgeBackgroundColor: Supplier;
    readonly badgeBorderStartColor: Supplier;
    readonly badgeBorderEndColor: Supplier;
    readonly overrideBadgeText: Supplier;
    readonly badgeText: Supplier;
    readonly badgeTextColor: Supplier;
    readonly compareAccessories: Supplier;
    constructor(build: IIcebergConfigSpecBuilder);
    static get instance(): EquipmentCompareConfig;
    static isItemBlacklisted(itemStack: ItemStack, provider: Provider): boolean;
  }

}

declare module 'com.anthonyhilyard.equipmentcompare' {
  import { Logger } from 'org.apache.logging.log4j';
  import { KeyMapping } from 'net.minecraft.client';

  class EquipmentCompare {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static comparisonsActive: boolean;
    static readonly showComparisonTooltip: KeyMapping;
    static init(): void;
  }

}

declare module 'com.anthonyhilyard.equipmentcompare.gui' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Minecraft } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';

  class ComparisonTooltips {
    static get equippedBadge(): MutableComponent;
    static render(graphics: GuiGraphics, positioner: ClientTooltipPositioner, x: number, y: number, itemStack: ItemStack, minecraft: Minecraft, font: Font, screen: Screen): boolean;
  }

}

declare module 'com.anthonyhilyard.equipmentcompare.mixin' {
  import { ItemCombinerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { AnvilMenu } from 'net.minecraft.world.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CallbackInfoReturnable, CallbackInfo } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Boolean } from 'java.lang';
  import { Font } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { ClientTooltipComponent, ClientTooltipPositioner } from 'net.minecraft.client.gui.screens.inventory.tooltip';
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';

  interface AnvilScreenMixin extends ItemCombinerScreen<AnvilMenu> {}
  class AnvilScreenMixin extends ItemCombinerScreen<AnvilMenu> {
    constructor(itemCombinerMenu: AnvilMenu, inventory: Inventory, component: Component, resourceLocation: ResourceLocation);
    keyPressed(i: number, j: number, k: number, info: CallbackInfoReturnable<boolean>): void;
    keyReleased(i: number, j: number, k: number): boolean;
  }


  class GuiGraphicsEarlyMixin {
  }


  class GuiGraphicsMixin {
    renderTooltip(font: Font, itemStack: ItemStack, x: number, y: number, info: CallbackInfo): void;
    renderTooltipInternal(font: Font, components: ClientTooltipComponent[], x: number, y: number, positioner: ClientTooltipPositioner, info: CallbackInfo): void;
  }


  interface ScreenMixin extends AbstractContainerEventHandler {}
  class ScreenMixin extends AbstractContainerEventHandler {
    children(): GuiEventListener[];
    keyPressed(i: number, j: number, k: number, info: CallbackInfoReturnable<boolean>): void;
    keyReleased(i: number, j: number, k: number): boolean;
    screenClosed(info: CallbackInfo): void;
  }

}

declare module 'com.anthonyhilyard.equipmentcompare.neoforge.client' {
  class EquipmentCompareNeoForgeClient {
    constructor();
  }

}

declare module 'com.anthonyhilyard.equipmentcompare.neoforge.compat' {
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LivingEntity } from 'net.minecraft.world.entity';

  class CuriosHandler {
    static getCuriosMatchingSlot(player: LivingEntity, curio: ItemStack): ItemStack[];
  }

}