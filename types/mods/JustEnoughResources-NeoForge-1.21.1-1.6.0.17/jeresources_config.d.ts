declare module 'jeresources.config' {
  import { List } from 'java.util';

  class Settings {
    static ITEMS_PER_ROW: number;
    static ITEMS_PER_COLUMN: number;
    static useDIYdata: boolean;
    static excludedEnchants: string[];
    static hiddenCategories: string[];
    static showDevData: boolean;
    static disableLootManagerReloading: boolean;
    static excludedDimensions: List;
    static reload(): void;
  }

}