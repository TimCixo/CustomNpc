declare module 'com.anar4732.opf.client' {
  import { SimpleTexture } from 'net.minecraft.client.renderer.texture';
  import { File } from 'java.io';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Runnable } from 'java.lang';
  import { OPFBlockEntity } from 'com.anar4732.opf';
  import { ResourceManager } from 'net.minecraft.server.packs.resources';
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { Context } from 'BlockEntityRendererProvider';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Direction } from 'net.minecraft.core';

  interface DownloadingTextureExtended extends SimpleTexture {}
  class DownloadingTextureExtended extends SimpleTexture {
    error: boolean;
    loaded: boolean;
    constructor(cacheFileIn: File, imageUrlIn: string, textureResourceLocation: ResourceLocation, processTaskIn: Runnable, frame: OPFBlockEntity);
    isGif(): boolean;
    load(manager: ResourceManager): void;
    tick(): void;
  }


  interface OPFRenderer extends BlockEntityRenderer<OPFBlockEntity> {}
  class OPFRenderer extends BlockEntityRenderer<OPFBlockEntity> {
    constructor(context: Context);
    static applyDirection(matrixStack: PoseStack, direction: Direction): void;
    get viewDistance(): number;
    render(frame: OPFBlockEntity, partialTicks: number, matrixStack: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
    shouldRenderOffScreen(te: OPFBlockEntity): boolean;
  }

}

declare module 'com.anar4732.opf.client.gui' {
  import { Button, AbstractSliderButton } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress, CreateNarration } from 'Button';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { OPFBlockEntity } from 'com.anar4732.opf';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface ExtendedButton extends Button {}
  class ExtendedButton extends Button {
    constructor(xPos: number, yPos: number, width: number, height: number, displayString: Component, handler: OnPress);

    constructor(xPos: number, yPos: number, width: number, height: number, displayString: Component, handler: OnPress, createNarration: CreateNarration);
  }


  interface GuiOPF extends Screen {}
  class GuiOPF extends Screen {
    sizeX: number;
    sizeY: number;
    constructor(te: OPFBlockEntity);
    init(): void;
    isPauseScreen(): boolean;
    onClose(): void;
    render(guiGraphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    tick(): void;
  }


  interface SpeedSlider extends AbstractSliderButton {}
  class SpeedSlider extends AbstractSliderButton {
    constructor(x: number, y: number, width: number, be: OPFBlockEntity);
  }


  interface WidgetSlider extends AbstractSliderButton {}
  class WidgetSlider extends AbstractSliderButton {
    constructor(x: number, y: number, width: number, be: OPFBlockEntity, XorY: boolean, parent: GuiOPF);
  }

}

declare module 'com.anar4732.opf.forge' {
  class OPFModForge {
    constructor();
  }

}

declare module 'com.anar4732.opf' {
  import { Block, EntityBlock, Rotation, Mirror, RenderShape } from 'net.minecraft.world.level.block';
  import { EnumProperty, BooleanProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Boolean } from 'java.lang';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { List } from 'java.util';
  import { Builder } from 'LootParams';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { DownloadingTextureExtended } from 'com.anar4732.opf.client';
  import { File } from 'java.io';
  import { TextureManager } from 'net.minecraft.client.renderer.texture';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { AABB } from 'net.minecraft.world.phys';
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { CommandSourceStack } from 'net.minecraft.commands';
  import { Logger } from 'org.apache.logging.log4j';
  import { CreativeNetwork, CreativePacket } from 'team.creative.creativecore.common.network';
  import { DeferredRegister, RegistrySupplier } from 'dev.architectury.registry.registries';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { AlignedBox } from 'team.creative.creativecore.common.util.math.box';
  import { Vector3d } from 'org.joml';

  interface OPFBlock extends EntityBlock, Block {}
  class OPFBlock extends EntityBlock {
    static readonly FACING: EnumProperty;
    static readonly ATTACHED: BooleanProperty;
    static readonly VISIBLE: BooleanProperty;
    constructor(dummy: boolean, floor: boolean, id: string);
    findMainTE(world: Level, pos: BlockPos): OPFBlockEntity;
    getDrops(state: BlockState, builder: Builder): ItemStack[];
    getRenderShape(state: BlockState): RenderShape;
    getShape(state: BlockState, worldIn: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    mirror(state: BlockState, mirrorIn: Mirror): BlockState;
    newBlockEntity(pos: BlockPos, state: BlockState): BlockEntity;
    playerWillDestroy(world: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    propagatesSkylightDown(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos): boolean;
    rotate(state: BlockState, rot: Rotation): BlockState;
    setPlacedBy(world: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface OPFBlockEntity extends BlockEntity {}
  class OPFBlockEntity extends BlockEntity {
    static readonly DEFAULT_URL: string;
    static readonly MAX_SIZE: number;
    url: string;
    sizeX: number;
    sizeY: number;
    flippedX: boolean;
    flippedY: boolean;
    onFloor: boolean;
    oldUrl: string;
    speed: number;
    textureWorker: DownloadingTextureExtended;
    static cacheDir: File;
    static textureManager: TextureManager;
    textureLocation: ResourceLocation;
    constructor(blockPos: BlockPos, state: BlockState);
    get updatePacket(): ClientboundBlockEntityDataPacket;
    static getBoundingBox(frame: OPFBlockEntity): AABB;
    getUpdateTag(provider: Provider): CompoundTag;
    isTextureLoaded(): boolean;
    loadAdditional(compound: CompoundTag, provider: Provider): void;
    loadTexture(): void;
    removeBlocks(): void;
    removeBlocks(oldSizeX: number, oldSizeY: number): void;
    saveAdditional(compound: CompoundTag, provider: Provider): void;
    sendToClients(): void;
    setRemoved(): void;
    shouldLoadTexture(): boolean;
    tickTexture(): void;
    updateBlocks(): void;
    updateBlocks(oldSizeX: number, oldSizeY: number): void;
    updateTextureIfNeeded(): void;
  }


  class OPFCommand {
    static register(cd: CommandDispatcher<CommandSourceStack>): void;
  }


  class OPFMod {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly NETWORK: CreativeNetwork;
    static readonly BLOCKS: DeferredRegister;
    static readonly BLOCK_OPF: RegistrySupplier;
    static readonly BLOCK_OPF_DUMMY: RegistrySupplier;
    static readonly BLOCK_OPF_DUMMY_FLOOR: RegistrySupplier;
    static readonly ITEMS: DeferredRegister;
    static readonly ITEM_OPF: RegistrySupplier;
    static readonly BLOCK_ENTITY_TYPES: DeferredRegister;
    static readonly BE_OPF: RegistrySupplier;
    static init(): void;
  }


  interface PacketOPFUpdate extends CreativePacket {}
  class PacketOPFUpdate extends CreativePacket {
    pos: BlockPos;
    nbt: CompoundTag;
    oldSizeX: number;
    oldSizeY: number;
    sizeX: number;
    sizeY: number;
    oldStitch: boolean;
    stitch: boolean;
    oldVisible: boolean;
    visible: boolean;
    constructor();

    constructor(te: OPFBlockEntity, oldSizeX: number, oldSizeY: number, sizeX: number, sizeY: number, oldStitch: boolean, stitch: boolean, oldVisible: boolean, visible: boolean);
    executeClient(player: Player): void;
    executeServer(serverPlayer: ServerPlayer): void;
  }


  class Utils {
    static applyCubeRotation(cube: AlignedBox, direction: Direction, center: Vector3d): void;
    static applyVectorRotation(vector: Vector3d, direction: Direction): Vector3d;
    static rotateCube(cube: AlignedBox, direction: Direction): AlignedBox;
    static rotateCube(cube: AlignedBox, direction: Direction, center: Vector3d): AlignedBox;
    static toVoxelShape(box: AlignedBox): VoxelShape;
  }

}

declare module 'com.anar4732.opf.OPFMod' {
  class Client {
    static initializeClient(): void;
  }

}

declare module 'com.anar4732.opf.OPFMod.Client' {
  import { OPFBlockEntity } from 'com.anar4732.opf';

  class OpenGUI {
    constructor(te: OPFBlockEntity);
  }

}