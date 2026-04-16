declare module 'jeresources.collection' {
  import { LinkedList, List } from 'java.util';
  import { Trade } from 'jeresources.collection.TradeList';
  import { AbstractVillagerEntry } from 'jeresources.entry';
  import { ItemStack } from 'net.minecraft.world.item';
  import { IFocus } from 'mezz.jei.api.recipe';
  import { ItemListing } from 'VillagerTrades';

  interface TradeList extends LinkedList<Trade> {}
  class TradeList extends LinkedList<Trade> {
    constructor(entry: AbstractVillagerEntry<any>);
    addITradeList(itemListings: ItemListing[]): void;
    get costAs(): ItemStack[];
    get costBs(): ItemStack[];
    get results(): ItemStack[];
    getFocusedList(focus: IFocus<ItemStack>): TradeList;
    getSubListBuy(itemStack: ItemStack): TradeList;
    getSubListSell(itemStack: ItemStack): TradeList;
  }

}

declare module 'jeresources.collection.TradeList' {
  import { ItemStack } from 'net.minecraft.world.item';

  class Trade {
    buysItem(itemStack: ItemStack): boolean;
    get maxCostA(): ItemStack;
    get maxCostB(): ItemStack;
    get maxResult(): ItemStack;
    get minCostA(): ItemStack;
    get minCostB(): ItemStack;
    get minResult(): ItemStack;
    sellsItem(itemStack: ItemStack): boolean;
    toString(): string;
  }

}