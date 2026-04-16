declare module 'net.darkhax.enchdesc.common.api' {
  import { ItemStack } from 'net.minecraft.world.item';

  class ContextProvider {
    enchdesc$getStack(): ItemStack;
    enchdesc$setStack(var1: ItemStack): void;
  }

}

declare module 'net.darkhax.enchdesc.common.impl' {
  import { Component, Style } from 'net.minecraft.network.chat';
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Holder } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Consumer } from 'java.util.function';

  class Config {
    enabled: boolean;
    only_on_books: boolean;
    only_in_enchanting_table: boolean;
    require_keybind: boolean;
    activate_text: Component;
    prefix: Component;
    suffix: Component;
    style: Style;
  }


  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly LOG: Logger;
    static id(path: string): ResourceLocation;
  }


  class EnchdescMod {
    canDisplayDescription(stack: ItemStack): boolean;
    static get instance(): EnchdescMod;
    get keybindText(): Component;
    init(): void;
    insertDescriptions(enchantment: Holder<Enchantment>, level: number, lines: Consumer<Component>): void;
    isKeybindConditionMet(): boolean;
    revertContext(stack: ItemStack): void;
    setupContext(stack: ItemStack): void;
  }

}

declare module 'net.darkhax.enchdesc.common.mixin.patch' {
  import { ContextProvider } from 'net.darkhax.enchdesc.common.api';
  import { ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { TooltipContext } from 'Item';
  import { Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { Provider } from 'HolderLookup';
  import { HolderSet, Holder } from 'net.minecraft.core';
  import { Enchantment } from 'net.minecraft.world.item.enchantment';
  import { Iterator, List } from 'java.util';
  import { ObjectIterator } from 'it.unimi.dsi.fastutil.objects';
  import { Entry } from 'Object2IntMap';
  import { Player } from 'net.minecraft.world.entity.player';

  interface MixinItemEnchants extends ContextProvider {}
  class MixinItemEnchants extends ContextProvider {
    enchdesc$getStack(): ItemStack;
    enchdesc$setStack(stack: ItemStack): void;
    sortedEnchantment(context: TooltipContext, tooltips: Consumer<Component>, flag: TooltipFlag, cbi: CallbackInfo, lookup: Provider, sorted: HolderSet<Enchantment>, iter: Iterator<Holder<Enchantment>>, enchantment: Holder<Enchantment>, level: number): void;
    unsortedEnchantment(context: TooltipContext, tooltips: Consumer<Component>, flag: TooltipFlag, cbi: CallbackInfo, lookup: Provider, sorted: HolderSet<Enchantment>, iter: ObjectIterator<Holder<Enchantment>>, entry: Entry<Holder<Enchantment>>, enchantment: Holder<Enchantment>): void;
  }


  class MixinItemStack {
    afterEnchantmentTooltips(context: TooltipContext, player: Player, flags: TooltipFlag, cbi: CallbackInfoReturnable<Component[]>, lines: Component[]): void;
    beforeEnchantmentTooltips(context: TooltipContext, player: Player, flags: TooltipFlag, cbi: CallbackInfoReturnable<Component[]>): void;
  }

}

declare module 'net.darkhax.enchdesc.impl' {
  import { IEventBus } from 'net.neoforged.bus.api';

  class NeoForgeMod {
    constructor(eventBus: IEventBus);
  }

}