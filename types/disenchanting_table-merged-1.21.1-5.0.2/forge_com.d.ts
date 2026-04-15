declare module 'forge.com.cursee.disenchanting_table.client' {
  class ClientConfig {
    static render_block_particles: boolean;
    static render_experience_cost: boolean;
    static render_table_item: boolean;
    static onLoad(): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.client.gui.screens' {
  import { ItemCombinerScreen, AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { DisenchantingMenu, DisenchantingTableMenu } from 'forge.com.cursee.disenchanting_table.core.world.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Minecraft } from 'net.minecraft.client';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface DisenchantingMenuScreen extends ItemCombinerScreen<DisenchantingMenu> {}
  class DisenchantingMenuScreen extends ItemCombinerScreen<DisenchantingMenu> {
    constructor($$0: DisenchantingMenu, $$1: Inventory, $$2: Component);
    resize(minecraft: Minecraft, width: number, height: number): void;
  }


  interface DisenchantingTableScreen extends AbstractContainerScreen<DisenchantingTableMenu> {}
  class DisenchantingTableScreen extends AbstractContainerScreen<DisenchantingTableMenu> {
    static readonly DISENCHANTING_TABLE_LOCATION: ResourceLocation;
    constructor(menu: DisenchantingTableMenu, inventory: Inventory, title: Component);
    resize(minecraft: Minecraft, width: number, height: number): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.client.network.packet' {
  import { ForgeConfigSyncS2CPacket, ForgeItemSyncS2CPacket } from 'forge.com.cursee.disenchanting_table.core.network.packet';
  import { Context } from 'CustomPayloadEvent';

  class ForgeConfigSyncClientHandler {
    static handle(packet: ForgeConfigSyncS2CPacket, context: Context): void;
  }


  class ForgeItemSyncClientHandler {
    static handle(packet: ForgeItemSyncS2CPacket, context: Context): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.client.renderer.blockentity' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { DisenchantingTableBlockEntity } from 'forge.com.cursee.disenchanting_table.core.world.block.entity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';

  interface DisenchantingTableRenderer extends BlockEntityRenderer<DisenchantingTableBlockEntity> {}
  class DisenchantingTableRenderer extends BlockEntityRenderer<DisenchantingTableBlockEntity> {
    constructor(context: Context);
    render(table: DisenchantingTableBlockEntity, v: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, packedLight: number, packedOverlay: number): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table' {
  import { Logger } from 'org.slf4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IEventBus } from 'net.minecraftforge.eventbus.api';
  import { FMLJavaModLoadingContext } from 'net.minecraftforge.fml.javafmlmod';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ServerAboutToStartEvent } from 'net.minecraftforge.event.server';

  class Constants {
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly MOD_PUBLISHER: string;
    static readonly MOD_URL: string;
    static readonly LOG: Logger;
  }


  class DisenchantingTable {
    static identifier(path: string): ResourceLocation;
    static init(): void;
  }


  class DisenchantingTableClient {
    static init(): void;
  }


  class DisenchantingTableClientForge {
  }


  class DisenchantingTableForge {
    static EVENT_BUS: IEventBus;
    constructor(context: FMLJavaModLoadingContext);

    constructor();
  }


  class DisenchantingTableServer {
    static init(): void;
  }


  class DisenchantingTableServerForge {
    static SERVER: MinecraftServer;
    constructor(event: ServerAboutToStartEvent);
    static get server(): MinecraftServer;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core' {
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

declare module 'forge.com.cursee.disenchanting_table.core.network' {
  import { Type } from 'CustomPacketPayload';
  import { ServerPlayer } from 'net.minecraft.server.level';

  class ForgeNetwork {
    static readonly CONFIG_SYNC_ID: Type;
    static readonly ITEM_SYNC_ID: Type;
    static init(): void;
    static sendToPlayer<MSG>(player: ServerPlayer, message: MSG): void;
    static sendToServer<MSG>(message: MSG): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.network.packet' {
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { Type } from 'CustomPacketPayload';
  import { Context } from 'CustomPayloadEvent';
  import { BlockPos, NonNullList } from 'net.minecraft.core';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface ForgeConfigSyncS2CPacket extends CustomPacketPayload {}
  class ForgeConfigSyncS2CPacket extends CustomPacketPayload {
    readonly automatic_disenchanting: boolean;
    readonly resets_repair_cost: boolean;
    readonly requires_experience: boolean;
    readonly uses_points: boolean;
    readonly experience_cost: number;
    constructor(automatic_disenchanting: boolean, resets_repair_cost: boolean, requires_experience: boolean, uses_points: boolean, experience_cost: number);

    constructor(data: RegistryFriendlyByteBuf);
    static createAndSend(entity: Entity, level: Level): void;
    handle(context: Context): void;
    toBytes(data: RegistryFriendlyByteBuf): void;
    type(): Type<CustomPacketPayload>;
  }


  interface ForgeItemSyncS2CPacket extends CustomPacketPayload {}
  class ForgeItemSyncS2CPacket extends CustomPacketPayload {
    readonly blockPosition: BlockPos;
    readonly size: number;
    readonly inventory: NonNullList;
    constructor(blockPos: BlockPos, size: number, inventory: NonNullList<ItemStack>);

    constructor(data: RegistryFriendlyByteBuf);
    static createAndSend(serverPlayer: ServerPlayer, inventory: NonNullList<ItemStack>, blockPos: BlockPos): void;
    handle(context: Context): void;
    toBytes(data: RegistryFriendlyByteBuf): void;
    type(): Type<CustomPacketPayload>;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.registry' {
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BiConsumer } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Block } from 'net.minecraft.world.level.block';
  import { Item, CreativeModeTab } from 'net.minecraft.world.item';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { IEventBus } from 'net.minecraftforge.eventbus.api';

  class ModBlockEntities {
    static readonly DISENCHANTING_TABLE: BlockEntityType;
    static register(consumer: BiConsumer<BlockEntityType<any>, ResourceLocation>): void;
  }


  class ModBlocks {
    static readonly DISENCHANTING_TABLE: Block;
    static register(consumer: BiConsumer<Block, ResourceLocation>): void;
  }


  class ModItems {
    static register(consumer: BiConsumer<Item, ResourceLocation>): void;
  }


  class ModMenus {
    static readonly DISENCHANTING_TABLE: MenuType;
    static readonly DISENCHANTING_MENU: MenuType;
    static register(consumer: BiConsumer<MenuType<any>, ResourceLocation>): void;
  }


  class ModRegistryForge {
    static register(modEventBus: IEventBus): void;
  }


  class ModTabs {
    static readonly DISENCHANTING_TABLE: CreativeModeTab;
    static register(consumer: BiConsumer<CreativeModeTab, ResourceLocation>): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.util' {
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';

  class DisenchantmentHelper {
    static canDisenchant(stack: ItemStack): boolean;
  }


  class ExperienceHelper {
    static addExperienceLevels(player: Player, amount: number): void;
    static addExperiencePoints(player: Player, amount: number): void;
    static deductExperienceLevels(player: Player, amount: number): void;
    static deductExperiencePoints(player: Player, amount: number): void;
    static getExperiencePointsFromLevel(level: number): number;
    static getHighestExperienceAtLevel(level: number): number;
    static getLevelFromExperiencePoints(amount: number): number;
    static getTotalPlayerExperiencePoints(player: Player): number;
    static hasEnoughExperienceLevels(player: Player, amount: number): boolean;
    static hasEnoughExperiencePoints(player: Player, amount: number): boolean;
  }


  class S2CBlockEntityUpdatePacket {
    static sendToClients(blockEntity: BlockEntity): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.world.block' {
  import { Block, EntityBlock, Rotation, Mirror } from 'net.minecraft.world.level.block';
  import { DirectionProperty } from 'net.minecraft.world.level.block.state.properties';
  import { BlockEntity, BlockEntityTicker, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Level, BlockGetter } from 'net.minecraft.world.level';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { RandomSource } from 'net.minecraft.util';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';

  interface DisenchantingTableBlock extends EntityBlock, Block {}
  class DisenchantingTableBlock extends EntityBlock {
    static readonly FACING: DirectionProperty;
    constructor();
    animateTick(state: BlockState, level: Level, pos: BlockPos, random: RandomSource): void;
    getAnalogOutputSignal(state: BlockState, world: Level, pos: BlockPos): number;
    getShape(state: BlockState, level: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(level: Level, state: BlockState, blockEntityType: BlockEntityType<T>): BlockEntityTicker<T>;
    hasAnalogOutputSignal(state: BlockState): boolean;
    mirror(state: BlockState, mirror: Mirror): BlockState;
    newBlockEntity(blockPos: BlockPos, blockState: BlockState): BlockEntity;
    onRemove(state: BlockState, world: Level, pos: BlockPos, newState: BlockState, isMoving: boolean): void;
    rotate(state: BlockState, rotation: Rotation): BlockState;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.world.block.entity' {
  import { ExposedSimpleInventoryBlockEntity } from 'forge.com.cursee.disenchanting_table.core.world.block.entity.util';
  import { MenuProvider } from 'net.minecraft.world';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Level } from 'net.minecraft.world.level';

  interface DisenchantingTableBlockEntity extends MenuProvider, ExposedSimpleInventoryBlockEntity {}
  class DisenchantingTableBlockEntity extends MenuProvider {
    static readonly INPUT_SLOT: number;
    static readonly EXTRA_SLOT: number;
    static readonly OUTER_SLOT: number;
    static readonly SLOT_COUNT: number;
    constructor(pos: BlockPos, blockState: BlockState);
    canPlaceItem(index: number, stack: ItemStack): boolean;
    canTakeItemThroughFace(index: number, stack: ItemStack, direction: Direction): boolean;
    createMenu(i: number, inventory: Inventory, player: Player): AbstractContainerMenu;
    get displayName(): Component;
    get renderStack(): ItemStack;
    get signal(): number;
    removeNormalBook(): void;
    setChanged(): void;
    stillValid(player: Player): boolean;
    static tickClient(level: Level, pos: BlockPos, state: BlockState, table: DisenchantingTableBlockEntity): void;
    static tickServer(level: Level, pos: BlockPos, state: BlockState, table: DisenchantingTableBlockEntity): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.world.block.entity.util' {
  import { WorldlyContainer, Clearable, Container } from 'net.minecraft.world';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Set } from 'java.util';
  import { Direction, BlockPos, NonNullList } from 'net.minecraft.core';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener } from 'net.minecraft.network.protocol.game';

  interface ExposedSimpleInventoryBlockEntity extends WorldlyContainer, SimpleInventoryBlockEntity {}
  class ExposedSimpleInventoryBlockEntity extends WorldlyContainer {
    canPlaceItem(index: number, stack: ItemStack): boolean;
    canPlaceItemThroughFace(index: number, stack: ItemStack, direction: Direction): boolean;
    canTakeItemThroughFace(index: number, stack: ItemStack, direction: Direction): boolean;
    countItem(item: Item): number;
    get containerSize(): number;
    get maxStackSize(): number;
    getItem(index: number): ItemStack;
    getSlotsForFace(side: Direction): number[];
    hasAnyOf(set: Set<Item>): boolean;
    isEmpty(): boolean;
    removeItem(index: number, count: number): ItemStack;
    removeItemNoUpdate(index: number): ItemStack;
    setItem(index: number, stack: ItemStack): void;
    startOpen(player: Player): void;
    stillValid(player: Player): boolean;
    stopOpen(player: Player): void;
  }


  interface ModBlockEntity extends BlockEntity {}
  class ModBlockEntity extends BlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(registries: Provider): CompoundTag;
    readPacketNBT(cmp: CompoundTag, registries: Provider): void;
    writePacketNBT(cmp: CompoundTag, registries: Provider): void;
  }


  interface SimpleInventoryBlockEntity extends Clearable, ModBlockEntity {}
  class SimpleInventoryBlockEntity extends Clearable {
    clearContent(): void;
    static copyFromInv(inv: Container): NonNullList<ItemStack>;
    static copyToInv(src: NonNullList<ItemStack>, dest: Container): void;
    get itemHandler(): Container;
    inventorySize(): number;
    readPacketNBT(tag: CompoundTag, registries: Provider): void;
    setInventory(items: NonNullList<ItemStack>): void;
    writePacketNBT(tag: CompoundTag, registries: Provider): void;
  }

}

declare module 'forge.com.cursee.disenchanting_table.core.world.inventory' {
  import { ItemCombinerMenu, DataSlot, ContainerLevelAccess, AbstractContainerMenu, ContainerData } from 'net.minecraft.world.inventory';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { Container } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';

  interface DisenchantingMenu extends ItemCombinerMenu {}
  class DisenchantingMenu extends ItemCombinerMenu {
    cost: number;
    readonly mayPickup: DataSlot;
    constructor(containerIndex: number, inventory: Inventory);

    constructor(containerIndex: number, inventory: Inventory, access: ContainerLevelAccess);
    createResult(): void;
    hasResult(): boolean;
  }


  interface DisenchantingTableMenu extends AbstractContainerMenu {}
  class DisenchantingTableMenu extends AbstractContainerMenu {
    constructor(containerID: number, inventory: Inventory);

    constructor(containerID: number, inventory: Inventory, container: Container, containerData: ContainerData);
    get resultSlot(): number;
    getSlotToQuickMoveTo(stack: ItemStack): number;
    mayPlace(stack: ItemStack): boolean;
    mayPlace(stack: ItemStack): boolean;
    quickMoveStack(player: Player, index: number): ItemStack;
    stillValid(player: Player): boolean;
  }

}

declare module 'forge.com.cursee.disenchanting_table.mixin' {
  class ForgeTitleScreenMixin {
  }


  class MinecraftMixin {
  }

}

declare module 'forge.com.cursee.disenchanting_table.platform' {
  import { IPlatformHelper } from 'forge.com.cursee.disenchanting_table.platform.services';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NonNullList, BlockPos } from 'net.minecraft.core';
  import { ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BiFunction, Supplier } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Integer, Class } from 'java.lang';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { DisplayItemsGenerator } from 'CreativeModeTab';

  interface ForgePlatformHelper extends IPlatformHelper {}
  class ForgePlatformHelper extends IPlatformHelper {
    blockEntityType<T extends BlockEntity>(constructor: BiFunction<BlockPos, BlockState, T>, ...validBlocks: Block[]): BlockEntityType<T>;
    creativeModeTab(icon: Supplier<ItemStack>, title: Component, displayItemsGenerator: DisplayItemsGenerator): CreativeModeTab;
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(modId: string): boolean;
    registerMenu<T extends AbstractContainerMenu>(menuConstructor: BiFunction<number, Inventory, T>, flagSet: FeatureFlagSet): MenuType<T>;
    registerScreen<M extends AbstractContainerMenu, S extends AbstractContainerScreen<M>>(menuType: MenuType<M>, screenConstructor: TriFunction<M, Inventory, Component, S>): void;
    sendItemSyncToClient(serverPlayer: ServerPlayer, inventory: NonNullList<ItemStack>, blockPos: BlockPos): void;
  }


  class Services {
    static readonly PLATFORM: IPlatformHelper;
    static load<T>(clazz: Class<T>): T;
  }

}

declare module 'forge.com.cursee.disenchanting_table.platform.services' {
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { NonNullList, BlockPos } from 'net.minecraft.core';
  import { ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BiFunction, Supplier } from 'java.util.function';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { MenuType, AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { Integer } from 'java.lang';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { TriFunction } from 'com.cursee.monolib.core.util';
  import { Component } from 'net.minecraft.network.chat';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { DisplayItemsGenerator } from 'CreativeModeTab';

  class IPlatformHelper {
    blockEntityType<T extends BlockEntity>(var1: BiFunction<BlockPos, BlockState, T>, ...var2: Block[]): BlockEntityType<T>;
    creativeModeTab(var1: Supplier<ItemStack>, var2: Component, var3: DisplayItemsGenerator): CreativeModeTab;
    get environmentName(): string;
    get gameDirectory(): string;
    get platformName(): string;
    isClientSide(): boolean;
    isDevelopmentEnvironment(): boolean;
    isModLoaded(var1: string): boolean;
    registerMenu<T extends AbstractContainerMenu>(var1: BiFunction<number, Inventory, T>, var2: FeatureFlagSet): MenuType<T>;
    registerScreen<M extends AbstractContainerMenu, S extends AbstractContainerScreen<M>>(var1: MenuType<M>, var2: TriFunction<M, Inventory, Component, S>): void;
    sendItemSyncToClient(var1: ServerPlayer, var2: NonNullList<ItemStack>, var3: BlockPos): void;
  }

}