declare module 'fabric.com.cursee.disenchanting_table.client' {
  class ClientConfig {
    static render_block_particles: boolean;
    static render_experience_cost: boolean;
    static render_table_item: boolean;
    static onLoad(): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.client.gui.screens' {
  import { class_4894, class_1661, class_2561, class_310, class_465, class_2960 } from 'net.minecraft';
  import { DisenchantingMenu, DisenchantingTableMenu } from 'fabric.com.cursee.disenchanting_table.core.world.inventory';

  interface DisenchantingMenuScreen extends class_4894<DisenchantingMenu> {}
  class DisenchantingMenuScreen extends class_4894<DisenchantingMenu> {
    constructor($$0: DisenchantingMenu, $$1: class_1661, $$2: class_2561);
    method_25410(minecraft: class_310, width: number, height: number): void;
  }


  interface DisenchantingTableScreen extends class_465<DisenchantingTableMenu> {}
  class DisenchantingTableScreen extends class_465<DisenchantingTableMenu> {
    static readonly DISENCHANTING_TABLE_LOCATION: class_2960;
    constructor(menu: DisenchantingTableMenu, inventory: class_1661, title: class_2561);
    method_25410(minecraft: class_310, width: number, height: number): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.client.network.packet' {
  import { FabricConfigSyncS2CPacket, FabricItemSyncS2CPacket } from 'fabric.com.cursee.disenchanting_table.core.network.packet';
  import { Context } from 'ClientPlayNetworking';

  class FabricConfigSyncClientHandler {
    static handle(packet: FabricConfigSyncS2CPacket, context: Context): void;
  }


  class FabricItemSyncClientHandler {
    static handle(packet: FabricItemSyncS2CPacket, context: Context): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.client.renderer.blockentity' {
  import { class_827, class_4587, class_4597 } from 'net.minecraft';
  import { DisenchantingTableBlockEntity } from 'fabric.com.cursee.disenchanting_table.core.world.block.entity';
  import { class_5615 } from 'class_5614';

  interface DisenchantingTableRenderer extends class_827<DisenchantingTableBlockEntity> {}
  class DisenchantingTableRenderer extends class_827<DisenchantingTableBlockEntity> {
    constructor(context: class_5615);
    render(table: DisenchantingTableBlockEntity, v: number, poseStack: class_4587, multiBufferSource: class_4597, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table' {
  import { Logger } from 'org.slf4j';
  import { class_2960 } from 'net.minecraft';
  import { ClientModInitializer, ModInitializer } from 'net.fabricmc.api';
  import { MinecraftServer } from 'net.minecraft.server';

  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly MOD_PUBLISHER: string;
    static readonly MOD_URL: string;
    static readonly LOG: Logger;
  }


  class DisenchantingTable {
    static identifier(path: string): class_2960;
    static init(): void;
  }


  class DisenchantingTableClient {
    static init(): void;
  }


  interface DisenchantingTableClientFabric extends ClientModInitializer {}
  class DisenchantingTableClientFabric extends ClientModInitializer {
    onInitializeClient(): void;
  }


  interface DisenchantingTableFabric extends ModInitializer {}
  class DisenchantingTableFabric extends ModInitializer {
    onInitialize(): void;
  }


  class DisenchantingTableServer {
    static init(): void;
  }


  class DisenchantingTableServerFabric {
    static SERVER: MinecraftServer;
    constructor(server: MinecraftServer);
    get server(): MinecraftServer;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core' {
  class CommonConfig {
    static onLoad(): void;
  }


  class ServerConfig {
    static automatic_disenchanting: boolean;
    static resets_repair_cost: boolean;
    static requires_experience: boolean;
    static uses_points: boolean;
    static experience_cost: number;
    static onLoad(): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.network' {
  import { class_3222, class_8710 } from 'net.minecraft';

  class FabricNetwork {
    static init(): void;
    static sendToPlayer(player: class_3222, packet: class_8710): void;
    static sendToServer(packet: class_8710): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.network.FabricNetwork' {
  import { class_9139 } from 'net.minecraft';
  import { class_9154 } from 'class_8710';

  class Packets {
    static readonly CONFIG_SYNC_CODEC: class_9139;
    static readonly CONFIG_SYNC_ID: class_9154;
    static readonly ITEM_SYNC_CODEC: class_9139;
    static readonly ITEM_SYNC_ID: class_9154;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.network.packet' {
  import { class_8710, class_9129, class_1297, class_3218, class_2338, class_2371, class_1799 } from 'net.minecraft';
  import { class_9154 } from 'class_8710';
  import { Context } from 'ClientPlayNetworking';

  interface FabricConfigSyncS2CPacket extends class_8710 {}
  class FabricConfigSyncS2CPacket extends class_8710 {
    automatic_disenchanting: boolean;
    resets_repair_cost: boolean;
    requires_experience: boolean;
    uses_points: boolean;
    experience_cost: number;
    constructor(automatic_disenchanting: boolean, resets_repair_cost: boolean, requires_experience: boolean, uses_points: boolean, experience_cost: number);
    static createAndSend(entity: class_1297, level: class_3218): void;
    handle(context: Context): void;
    method_56479(): class_9154<class_8710>;
    static read(data: class_9129): FabricConfigSyncS2CPacket;
    write(data: class_9129): void;
  }


  interface FabricItemSyncS2CPacket extends class_8710 {}
  class FabricItemSyncS2CPacket extends class_8710 {
    readonly blockPosition: class_2338;
    readonly size: number;
    readonly inventory: class_2371;
    constructor(blockPos: class_2338, size: number, inventory: class_2371<class_1799>);
    handle(context: Context): void;
    method_56479(): class_9154<class_8710>;
    static read(data: class_9129): FabricItemSyncS2CPacket;
    write(data: class_9129): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.registry' {
  import { class_2591, class_2960, class_2248, class_1792, class_3917, class_1761 } from 'net.minecraft';
  import { BiConsumer } from 'java.util.function';

  class ModBlockEntities {
    static readonly DISENCHANTING_TABLE: class_2591;
    static register(consumer: BiConsumer<class_2591<any>, class_2960>): void;
  }


  class ModBlocks {
    static readonly DISENCHANTING_TABLE: class_2248;
    static register(consumer: BiConsumer<class_2248, class_2960>): void;
  }


  class ModItems {
    static register(consumer: BiConsumer<class_1792, class_2960>): void;
  }


  class ModMenus {
    static readonly DISENCHANTING_TABLE: class_3917;
    static readonly DISENCHANTING_MENU: class_3917;
    static register(consumer: BiConsumer<class_3917<any>, class_2960>): void;
  }


  class ModRegistryFabric {
    static register(): void;
  }


  class ModTabs {
    static readonly DISENCHANTING_TABLE: class_1761;
    static register(consumer: BiConsumer<class_1761, class_2960>): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.util' {
  import { class_1799, class_1657, class_2586 } from 'net.minecraft';

  class DisenchantmentHelper {
    static canDisenchant(stack: class_1799): boolean;
  }


  class ExperienceHelper {
    static addExperienceLevels(player: class_1657, amount: number): void;
    static addExperiencePoints(player: class_1657, amount: number): void;
    static deductExperienceLevels(player: class_1657, amount: number): void;
    static deductExperiencePoints(player: class_1657, amount: number): void;
    static getExperiencePointsFromLevel(level: number): number;
    static getHighestExperienceAtLevel(level: number): number;
    static getLevelFromExperiencePoints(amount: number): number;
    static getTotalPlayerExperiencePoints(player: class_1657): number;
    static hasEnoughExperienceLevels(player: class_1657, amount: number): boolean;
    static hasEnoughExperiencePoints(player: class_1657, amount: number): boolean;
  }


  class S2CBlockEntityUpdatePacket {
    static sendToClients(blockEntity: class_2586): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.world.block' {
  import { class_2248, class_2343, class_2753, class_2586, class_2338, class_2680, class_5558, class_1937, class_2591, class_1750, class_2470, class_2415, class_5819, class_265, class_1922, class_3726 } from 'net.minecraft';

  interface DisenchantingTableBlock extends class_2343, class_2248 {}
  class DisenchantingTableBlock extends class_2343 {
    static readonly FACING: class_2753;
    constructor();
    method_10123(blockPos: class_2338, blockState: class_2680): class_2586;
    method_31645<T extends class_2586>(level: class_1937, state: class_2680, blockEntityType: class_2591<T>): class_5558<T>;
    method_9496(state: class_2680, level: class_1937, pos: class_2338, random: class_5819): void;
    method_9498(state: class_2680): boolean;
    method_9530(state: class_2680, level: class_1922, pos: class_2338, context: class_3726): class_265;
    method_9536(state: class_2680, world: class_1937, pos: class_2338, newState: class_2680, isMoving: boolean): void;
    method_9569(state: class_2680, mirror: class_2415): class_2680;
    method_9572(state: class_2680, world: class_1937, pos: class_2338): number;
    method_9598(state: class_2680, rotation: class_2470): class_2680;
    method_9605(context: class_1750): class_2680;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.world.block.entity' {
  import { ExposedSimpleInventoryBlockEntity } from 'fabric.com.cursee.disenchanting_table.core.world.block.entity.util';
  import { class_3908, class_2338, class_2680, class_2561, class_1703, class_1661, class_1657, class_1799, class_2350, class_1937 } from 'net.minecraft';

  interface DisenchantingTableBlockEntity extends class_3908, ExposedSimpleInventoryBlockEntity {}
  class DisenchantingTableBlockEntity extends class_3908 {
    static readonly INPUT_SLOT: number;
    static readonly EXTRA_SLOT: number;
    static readonly OUTER_SLOT: number;
    static readonly SLOT_COUNT: number;
    constructor(pos: class_2338, blockState: class_2680);
    createMenu(i: number, inventory: class_1661, player: class_1657): class_1703;
    get renderStack(): class_1799;
    get signal(): number;
    method_5431(): void;
    method_5437(index: number, stack: class_1799): boolean;
    method_5443(player: class_1657): boolean;
    method_5476(): class_2561;
    method_5493(index: number, stack: class_1799, direction: class_2350): boolean;
    removeNormalBook(): void;
    static tickClient(level: class_1937, pos: class_2338, state: class_2680, table: DisenchantingTableBlockEntity): void;
    static tickServer(level: class_1937, pos: class_2338, state: class_2680, table: DisenchantingTableBlockEntity): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.world.block.entity.util' {
  import { class_1278, class_1799, class_1657, class_1792, class_2350, class_2586, class_2591, class_2338, class_2680, class_2487, class_2596, class_2602, class_3829, class_2371, class_1263 } from 'net.minecraft';
  import { Set } from 'java.util';
  import { class_7874 } from 'class_7225';

  interface ExposedSimpleInventoryBlockEntity extends class_1278, SimpleInventoryBlockEntity {}
  class ExposedSimpleInventoryBlockEntity extends class_1278 {
    method_18861(item: class_1792): number;
    method_18862(set: Set<class_1792>): boolean;
    method_5432(player: class_1657): void;
    method_5434(index: number, count: number): class_1799;
    method_5435(player: class_1657): void;
    method_5437(index: number, stack: class_1799): boolean;
    method_5438(index: number): class_1799;
    method_5439(): number;
    method_5441(index: number): class_1799;
    method_5442(): boolean;
    method_5443(player: class_1657): boolean;
    method_5444(): number;
    method_5447(index: number, stack: class_1799): void;
    method_5492(index: number, stack: class_1799, direction: class_2350): boolean;
    method_5493(index: number, stack: class_1799, direction: class_2350): boolean;
    method_5494(side: class_2350): number[];
  }


  interface ModBlockEntity extends class_2586 {}
  class ModBlockEntity extends class_2586 {
    constructor(type: class_2591<any>, pos: class_2338, state: class_2680);
    method_16887(registries: class_7874): class_2487;
    method_38235(): class_2596<class_2602>;
    readPacketNBT(cmp: class_2487, registries: class_7874): void;
    writePacketNBT(cmp: class_2487, registries: class_7874): void;
  }


  interface SimpleInventoryBlockEntity extends class_3829, ModBlockEntity {}
  class SimpleInventoryBlockEntity extends class_3829 {
    static copyFromInv(inv: class_1263): class_2371<class_1799>;
    static copyToInv(src: class_2371<class_1799>, dest: class_1263): void;
    get itemHandler(): class_1263;
    inventorySize(): number;
    method_5448(): void;
    readPacketNBT(tag: class_2487, registries: class_7874): void;
    setInventory(items: class_2371<class_1799>): void;
    writePacketNBT(tag: class_2487, registries: class_7874): void;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.core.world.inventory' {
  import { class_4861, class_3915, class_1661, class_3914, class_1703, class_1263, class_3913, class_1799, class_1657 } from 'net.minecraft';

  interface DisenchantingMenu extends class_4861 {}
  class DisenchantingMenu extends class_4861 {
    cost: number;
    readonly mayPickup: class_3915;
    constructor(containerIndex: number, inventory: class_1661);

    constructor(containerIndex: number, inventory: class_1661, access: class_3914);
    hasResult(): boolean;
    method_24928(): void;
  }


  interface DisenchantingTableMenu extends class_1703 {}
  class DisenchantingTableMenu extends class_1703 {
    constructor(containerID: number, inventory: class_1661);

    constructor(containerID: number, inventory: class_1661, container: class_1263, containerData: class_3913);
    get resultSlot(): number;
    getSlotToQuickMoveTo(stack: class_1799): number;
    method_7597(player: class_1657): boolean;
    method_7601(player: class_1657, index: number): class_1799;
    method_7680(stack: class_1799): boolean;
    method_7680(stack: class_1799): boolean;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.mixin' {
  class FabricTitleScreenMixin {
  }


  class MinecraftMixin {
  }

}

declare module 'fabric.com.cursee.disenchanting_table.platform' {
  import { IPlatformHelper } from 'fabric.com.cursee.disenchanting_table.platform.services';
  import { class_3222, class_2371, class_1799, class_2338, class_2591, class_2680, class_2248, class_2586, class_3917, class_1661, class_7699, class_1703, class_2561, class_465, class_1761 } from 'net.minecraft';
  import { BiFunction, Supplier } from 'java.util.function';
  import { Integer, Class } from 'java.lang';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { class_7914 } from 'class_1761';

  interface FabricPlatformHelper extends IPlatformHelper {}
  class FabricPlatformHelper extends IPlatformHelper {
    blockEntityType<T extends class_2586>(constructor: BiFunction<class_2338, class_2680, T>, ...validBlocks: class_2248[]): class_2591<T>;
    creativeModeTab(icon: Supplier<class_1799>, title: class_2561, displayItemsGenerator: class_7914): class_1761;
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    registerMenu<T extends class_1703>(menuConstructor: BiFunction<number, class_1661, T>, flagSet: class_7699): class_3917<T>;
    registerScreen<M extends class_1703, S extends class_465<M>>(menuType: class_3917<M>, screenConstructor: TriFunction<M, class_1661, class_2561, S>): void;
    sendItemSyncToClient(serverPlayer: class_3222, inventory: class_2371<class_1799>, blockPos: class_2338): void;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'fabric.com.cursee.disenchanting_table.platform.services' {
  import { class_3222, class_2371, class_1799, class_2338, class_2591, class_2680, class_2248, class_2586, class_3917, class_1661, class_7699, class_1703, class_2561, class_465, class_1761 } from 'net.minecraft';
  import { BiFunction, Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { class_7914 } from 'class_1761';

  class IPlatformHelper {
    blockEntityType<T extends class_2586>(var1: BiFunction<class_2338, class_2680, T>, ...var2: class_2248[]): class_2591<T>;
    creativeModeTab(var1: Supplier<class_1799>, var2: class_2561, var3: class_7914): class_1761;
    get environmentName(): string;
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    registerMenu<T extends class_1703>(var1: BiFunction<number, class_1661, T>, var2: class_7699): class_3917<T>;
    registerScreen<M extends class_1703, S extends class_465<M>>(var1: class_3917<M>, var2: TriFunction<M, class_1661, class_2561, S>): void;
    sendItemSyncToClient(var1: class_3222, var2: class_2371<class_1799>, var3: class_2338): void;
  }

}