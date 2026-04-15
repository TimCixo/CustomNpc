declare module 'com.lootintegrations.config' {
  import { ICommonConfig } from 'com.cupboard.config';
  import { JsonObject } from 'com.google.gson';

  interface CommonConfiguration extends ICommonConfig {}
  class CommonConfiguration extends ICommonConfig {
    showcontainerloottable: boolean;
    debugOutput: boolean;
    skipMapItems: boolean;
    skipExistingItems: boolean;
    moddedItemWeight: number;
    deserialize(data: JsonObject): void;
    serialize(): JsonObject;
  }

}

declare module 'com.lootintegrations.event' {
  import { AddReloadListenerEvent } from 'net.neoforged.neoforge.event';
  import { RightClickBlock } from 'PlayerInteractEvent';

  class EventHandler {
    static onAddReloadListenerEvent(event: AddReloadListenerEvent): void;
    static playerClickBlockEvent(event: RightClickBlock): void;
  }

}

declare module 'com.lootintegrations.loot' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Map, List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { LootContext, LootTable } from 'net.minecraft.world.level.storage.loot';
  import { JsonElement } from 'com.google.gson';
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { TagKey } from 'net.minecraft.tags';

  class GlobalLootModifierIntegration {
    lootTableId: ResourceLocation;
    integratedTables: Map;
    doApply(generatedLoot: ItemStack[], context: LootContext, lootTable: LootTable): void;
    static read(location: ResourceLocation, data: JsonElement): GlobalLootModifierIntegration;
  }


  class INoMapContext {
    areMapsDisabled(): boolean;
    disabledMaps(): void;
  }


  interface LootModifierManager extends SimpleJsonResourceReloadListener {}
  class LootModifierManager extends SimpleJsonResourceReloadListener {
    static readonly lootOptionsMap: Map;
    static readonly IGNORED_FOR_LOOT: TagKey;
    constructor();
    static applyTo(context: LootContext, items: ItemStack[], lootTable: LootTable): void;
  }

}

declare module 'com.lootintegrations' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CupboardConfig } from 'com.cupboard.config';
  import { Random } from 'java.util';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LootTable } from 'net.minecraft.world.level.storage.loot';
  import { MinecraftServer } from 'net.minecraft.server';

  class LootintegrationsMod {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static config: CupboardConfig;
    static rand: Random;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    static getLootTableId(table: LootTable, server: MinecraftServer): ResourceLocation;
    static resFor(path: string): ResourceLocation;
  }

}

declare module 'com.lootintegrations.mixin' {
  import { INoMapContext } from 'com.lootintegrations.loot';
  import { LootContext } from 'net.minecraft.world.level.storage.loot';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';

  class ExplorationFunctionMixin {
  }


  interface LootContextMixin extends INoMapContext {}
  class LootContextMixin extends INoMapContext {
    areMapsDisabled(): boolean;
    disabledMaps(): void;
  }


  class LootTableLootIntegrations {
    on(context: LootContext, cir: CallbackInfoReturnable<ItemStack[]>): void;
  }

}