declare module 'com.cicada.chimes.block' {
  import { Properties } from 'BlockBehaviour';
  import { VoxelShape, CollisionContext } from 'net.minecraft.world.phys.shapes';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockGetter, Level, LevelAccessor, LevelReader } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { RandomSource } from 'net.minecraft.util';
  import { BlockEntity, BlockEntityType, BlockEntityTicker } from 'net.minecraft.world.level.block.entity';
  import { BooleanProperty, DirectionProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { LivingEntity, Entity } from 'net.minecraft.world.entity';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { BlockPlaceContext } from 'net.minecraft.world.item.context';
  import { RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { BaseEntityBlock, SimpleWaterloggedBlock, RenderShape } from 'net.minecraft.world.level.block';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionResult } from 'net.minecraft.world';
  import { BlockHitResult } from 'net.minecraft.world.phys';
  import { Projectile } from 'net.minecraft.world.entity.projectile';

  interface AmethystWindChimeBlock extends WindChimeBlock {}
  class AmethystWindChimeBlock extends WindChimeBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, randomSource: RandomSource): void;
    getShape(p_60555_: BlockState, p_60556_: BlockGetter, p_60557_: BlockPos, p_60558_: CollisionContext): VoxelShape;
    newBlockEntity(p_152198_: BlockPos, p_152199_: BlockState): BlockEntity;
    playChimeSound(world: Level, pos: BlockPos): void;
  }


  interface BambooWindChimeBlock extends CarvedBambooWindChimeBlock {}
  class BambooWindChimeBlock extends CarvedBambooWindChimeBlock {
    static readonly WATERLOGGED: BooleanProperty;
    static readonly FACING: DirectionProperty;
    static readonly HALF: EnumProperty;
    static readonly PLACEMENT: EnumProperty;
    constructor(properties: Properties);
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
  }


  interface CarvedBambooWindChimeBlock extends WindChimeTyableBlock {}
  class CarvedBambooWindChimeBlock extends WindChimeTyableBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, randomSource: RandomSource): void;
    getShape(p_60555_: BlockState, p_60556_: BlockGetter, p_60557_: BlockPos, p_60558_: CollisionContext): VoxelShape;
    newBlockEntity(p_152198_: BlockPos, p_152199_: BlockState): BlockEntity;
    playChimeSound(world: Level, pos: BlockPos): void;
    playTieSound(world: Level, pos: BlockPos): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  class ChimesBlocks {
    static readonly BAMBOO_WIND_CHIME: BambooWindChimeBlock;
    static readonly CARVED_BAMBOO_WIND_CHIME: CarvedBambooWindChimeBlock;
    static readonly IRON_WIND_CHIME: IronWindChimeBlock;
    static readonly COPPER_WIND_CHIME: CopperWindChimeBlock;
    static readonly AMETHYST_WIND_CHIME: AmethystWindChimeBlock;
    static readonly GLASS_WIND_BELL: WindBellBlock;
    static readonly BAMBOOITEM: Item;
    static readonly IRONITEM: Item;
    static readonly CARVEDITEM: Item;
    static readonly COPPERITEM: Item;
    static readonly AMETHYSTITEM: Item;
    static readonly GLASSBELLSITEM: Item;
    static BAMBOO_WIND_CHIME_BLOCK_ENTITY: BlockEntityType;
    static IRON_WIND_CHIME_BLOCK_ENTITY: BlockEntityType;
    static COPPER_WIND_CHIME_BLOCK_ENTITY: BlockEntityType;
    static AMETHYST_WIND_CHIME_BLOCK_ENTITY: BlockEntityType;
    static WIND_BELL_BLOCK_ENTITY: BlockEntityType;
    static GLASS_WIND_BELL_CUSTOM: RecipeSerializer;
  }


  class ChimesBlocksNeoForged {
    static readonly BLOCKS: DeferredRegister;
    static readonly ITEMS: DeferredRegister;
    static readonly BLOCK_ENTITIES: DeferredRegister;
    static readonly RECIPES: DeferredRegister;
    static registerBlockEntities(): void;
    static registerBlocks(): void;
    static registerItems(): void;
    static registerRecipes(): void;
  }


  interface CopperWindChimeBlock extends WindChimeTyableBlock {}
  class CopperWindChimeBlock extends WindChimeTyableBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, randomSource: RandomSource): void;
    getShape(state: BlockState, blockGetter: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(p_152198_: BlockPos, p_152199_: BlockState): BlockEntity;
    playChimeSound(world: Level, pos: BlockPos): void;
    playTieSound(world: Level, pos: BlockPos): void;
  }


  interface IronWindChimeBlock extends WindChimeTyableBlock {}
  class IronWindChimeBlock extends WindChimeTyableBlock {
    constructor(properties: Properties);
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, randomSource: RandomSource): void;
    getShape(state: BlockState, getter: BlockGetter, pos: BlockPos, context: CollisionContext): VoxelShape;
    newBlockEntity(p_152198_: BlockPos, p_152199_: BlockState): BlockEntity;
    playChimeSound(world: Level, pos: BlockPos): void;
    playTieSound(world: Level, pos: BlockPos): void;
  }


  interface WindBellBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class WindBellBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    animateTick(stateIn: BlockState, level: Level, pos: BlockPos, randomSource: RandomSource): void;
    attack(state: BlockState, level: Level, pos: BlockPos, player: Player): void;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    chime(world: Level, pos: BlockPos): boolean;
    getCloneItemStack($$0: LevelReader, $$1: BlockPos, $$2: BlockState): ItemStack;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(blockState: BlockState): RenderShape;
    getShape(blockState: BlockState, blockGetter: BlockGetter, blockPos: BlockPos, collisionContext: CollisionContext): VoxelShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(p_153212_: Level, p_153213_: BlockState, p_153214_: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(p_152198_: BlockPos, p_152199_: BlockState): BlockEntity;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    setPlacedBy(p_48668_: Level, p_48669_: BlockPos, p_48670_: BlockState, p_48671_: LivingEntity, p_48672_: ItemStack): void;
    triggerEvent(state: BlockState, worldIn: Level, pos: BlockPos, id: number, param: number): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
    useWithoutItem(state: BlockState, worldIn: Level, pos: BlockPos, player: Player, result: BlockHitResult): InteractionResult;
  }


  interface WindChimeBlock extends SimpleWaterloggedBlock, BaseEntityBlock {}
  class WindChimeBlock extends SimpleWaterloggedBlock {
    static readonly WATERLOGGED: BooleanProperty;
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    constructor(properties: Properties);
    attack(state: BlockState, level: Level, pos: BlockPos, player: Player): void;
    canSurvive(state: BlockState, worldIn: LevelReader, pos: BlockPos): boolean;
    entityInside(p_60495_: BlockState, p_60496_: Level, p_60497_: BlockPos, p_60498_: Entity): void;
    getFluidState(state: BlockState): FluidState;
    getRenderShape(p_49753_: BlockState): RenderShape;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    getTicker<T extends BlockEntity>(p_153212_: Level, p_153213_: BlockState, p_153214_: BlockEntityType<T>): BlockEntityTicker<T>;
    newBlockEntity(p_153215_: BlockPos, p_153216_: BlockState): BlockEntity;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    playChimeSound(world: Level, pos: BlockPos): void;
    playTieSound(world: Level, pos: BlockPos): void;
    playerDestroy(worldIn: Level, player: Player, pos: BlockPos, state: BlockState, te: BlockEntity, stack: ItemStack): void;
    playerWillDestroy(worldIn: Level, pos: BlockPos, state: BlockState, player: Player): BlockState;
    setChiming(state: BlockState, level: Level, pos: BlockPos): void;
    setPlacedBy(worldIn: Level, pos: BlockPos, state: BlockState, placer: LivingEntity, stack: ItemStack): void;
    triggerEvent(state: BlockState, worldIn: Level, pos: BlockPos, id: number, param: number): boolean;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }


  interface WindChimeTyableBlock extends WindChimeBlock {}
  class WindChimeTyableBlock extends WindChimeBlock {
    constructor(properties: Properties);
    attack(state: BlockState, level: Level, pos: BlockPos, player: Player): void;
    changeState(state: BlockState, world: Level, pos: BlockPos): BlockState;
    getStateForPlacement(context: BlockPlaceContext): BlockState;
    onProjectileHit(worldIn: Level, state: BlockState, hit: BlockHitResult, projectile: Projectile): void;
    updateShape(stateIn: BlockState, facing: Direction, facingState: BlockState, worldIn: LevelAccessor, currentPos: BlockPos, facingPos: BlockPos): BlockState;
  }

}

declare module 'com.cicada.chimes.block.entity' {
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { AABB } from 'net.minecraft.world.phys';
  import { Provider } from 'HolderLookup';
  import { RandomSource } from 'net.minecraft.util';

  interface WindBellBE extends BlockEntity {}
  class WindBellBE extends BlockEntity {
    chimeTicks: number;
    isSwinging: boolean;
    constructor(p_155173_: BlockPos, p_155174_: BlockState);
    chime(): void;
    fromItem(p_187454_: ItemStack): void;
    get item(): ItemStack;
    get renderBoundingBox(): AABB;
    get updatePacket(): ClientboundBlockEntityDataPacket;
    getUpdateTag(provider: Provider): CompoundTag;
    removeComponentsFromTag(compoundTag: CompoundTag): void;
    tick(): void;
    triggerEvent(id: number, type: number): boolean;
  }


  interface WindChimeBE extends BlockEntity {}
  class WindChimeBE extends BlockEntity {
    interactTicks: number;
    velocityTicks: number;
    silenceTicks: number;
    isSwinging: boolean;
    constructor(tileEntityTypeIn: BlockEntityType<any>, p_155173_: BlockPos, p_155174_: BlockState);
    broadcastAmbientChiming(randomSource: RandomSource): void;
    chime(): void;
    get weatherTime(): number;
    tick(): void;
    triggerEvent(id: number, type: number): boolean;
  }

}

declare module 'com.cicada.chimes.block.entity.WindChimeBE' {
  import { WindChimeBE } from 'com.cicada.chimes.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface IronBE extends WindChimeBE {}
  class IronBE extends WindChimeBE {
    constructor(p_155173_: BlockPos, p_155174_: BlockState);
  }


  interface CopperBE extends WindChimeBE {}
  class CopperBE extends WindChimeBE {
    constructor(p_155173_: BlockPos, p_155174_: BlockState);
  }


  interface BambooBE extends WindChimeBE {}
  class BambooBE extends WindChimeBE {
    constructor(p_155173_: BlockPos, p_155174_: BlockState);
  }


  interface AmethystBE extends WindChimeBE {}
  class AmethystBE extends WindChimeBE {
    constructor(p_155173_: BlockPos, p_155174_: BlockState);
  }

}

declare module 'com.cicada.chimes' {
  import { SoundEvent } from 'net.minecraft.sounds';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { BooleanProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  class Chimes {
    static readonly MODID: string;
  }


  class ChimesNeoForged {
    constructor();
  }


  class ChimesSounds {
    static readonly BAMBOOCHIME: SoundEvent;
    static readonly BAMBOOCHIMING: SoundEvent;
    static readonly BAMBOOTIE: SoundEvent;
    static readonly IRONCHIME: SoundEvent;
    static readonly IRONCHIMING: SoundEvent;
    static readonly IRONTIE: SoundEvent;
    static readonly COPPERCHIME: SoundEvent;
    static readonly COPPERCHIMING: SoundEvent;
    static readonly COPPERTIE: SoundEvent;
    static readonly AMETHYSTTWINKLE: SoundEvent;
    static readonly AMETHYSTTWINKLING: SoundEvent;
    static readonly GLASSCHIME: SoundEvent;
    static readonly AMBIENTWIND: SoundEvent;
    static createSoundEvent(name: string): SoundEvent;
  }


  class ChimesSoundsNeoForged {
    static readonly SOUND_EVENT: DeferredRegister;
    static registerSounds(): void;
  }


  class ChimesStates {
    static readonly SILENCED: BooleanProperty;
    static readonly PLACEMENT: EnumProperty;
  }


  interface Placement extends Enum<Placement> {}
  class Placement extends Enum<Placement> {
    static readonly NATURAL: Placement;
    static readonly DIRECTIONAL: Placement;
    get serializedName(): string;
    static valueOf(name: string): Placement;
    static values(): Placement[];
  }

}

declare module 'com.cicada.chimes.ChimesNeoForged' {
  import { RegisterLayerDefinitions, RegisterRenderers } from 'EntityRenderersEvent';

  class ClientModEvents {
    static registerLayerDefinitions(event: RegisterLayerDefinitions): void;
    static registerRenderers(event: RegisterRenderers): void;
  }

}

declare module 'com.cicada.chimes.client.renderer' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { Material } from 'net.minecraft.client.resources.model';
  import { Context } from 'BlockEntityRendererProvider';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { AmethystBE, BambooBE, CopperBE, IronBE } from 'com.cicada.chimes.block.entity.WindChimeBE';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { WindBellBE } from 'com.cicada.chimes.block.entity';
  import { AABB } from 'net.minecraft.world.phys';
  import { EnumProperty, DirectionProperty } from 'net.minecraft.world.level.block.state.properties';

  interface AmethystBERenderer extends BlockEntityRenderer<AmethystBE> {}
  class AmethystBERenderer extends BlockEntityRenderer<AmethystBE> {
    static AMETHYST_CHIMES_RENDERER: ModelLayerLocation;
    static readonly AMETHYST: Material;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    get viewDistance(): number;
    render(p_112307_: AmethystBE, p_112308_: number, stack: PoseStack, buffer: MultiBufferSource, p_112311_: number, p_112312_: number): void;
  }


  interface BambooBERenderer extends BlockEntityRenderer<BambooBE> {}
  class BambooBERenderer extends BlockEntityRenderer<BambooBE> {
    static BAMBOO_CHIMES_LAYER: ModelLayerLocation;
    static readonly BAMBOO: Material;
    static readonly BAMBOO_PRE: Material;
    static readonly CARVED: Material;
    static readonly CARVED_PRE: Material;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    get viewDistance(): number;
    render(tileEntityIn: BambooBE, partialTicks: number, matrixStackIn: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }


  interface CopperBERenderer extends BlockEntityRenderer<CopperBE> {}
  class CopperBERenderer extends BlockEntityRenderer<CopperBE> {
    static COPPER_CHIMES_LAYER: ModelLayerLocation;
    static readonly COPPER: Material;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    get viewDistance(): number;
    render(tileEntityIn: CopperBE, partialTicks: number, matrixStackIn: PoseStack, buffer: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }


  interface GlassBERenderer extends BlockEntityRenderer<WindBellBE> {}
  class GlassBERenderer extends BlockEntityRenderer<WindBellBE> {
    static GLASS_CHIMES_LAYER: ModelLayerLocation;
    static readonly GLASS: Material;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    get viewDistance(): number;
    getRenderBoundingBox(blockEntity: WindBellBE): AABB;
    render(blockEntity: WindBellBE, f: number, poseStack: PoseStack, multiBufferSource: MultiBufferSource, i: number, j: number): void;
  }


  interface IronBERenderer extends BlockEntityRenderer<IronBE> {}
  class IronBERenderer extends BlockEntityRenderer<IronBE> {
    static readonly HALF: EnumProperty;
    static readonly FACING: DirectionProperty;
    static IRON_CHIMES_LAYER: ModelLayerLocation;
    static readonly IRON: Material;
    constructor(context: Context);
    static createBodyLayer(): LayerDefinition;
    get viewDistance(): number;
    render(tileEntityIn: IronBE, partialTicks: number, matrixStackIn: PoseStack, bufferIn: MultiBufferSource, combinedLightIn: number, combinedOverlayIn: number): void;
  }

}

declare module 'com.cicada.chimes.component' {
  import { DataComponentType } from 'net.minecraft.core.component';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';

  class ChimesComponents {
    static GLASS_BELL_BASE_COLOR: DataComponentType;
    static GLASS_BELL_TAG_COLOR: DataComponentType;
  }


  class ChimesComponentsNeoForged {
    static readonly COMPONENT_TYPES: DeferredRegister;
    static registerChimesComponents(): void;
  }

}

declare module 'com.cicada.chimes.event' {
  import { RegisterParticleProvidersEvent } from 'net.neoforged.neoforge.client.event';
  import { BuildCreativeModeTabContentsEvent } from 'net.neoforged.neoforge.event';
  import { ItemStack } from 'net.minecraft.world.item';
  import { DirectionProperty, EnumProperty } from 'net.minecraft.world.level.block.state.properties';
  import { RightClickBlock } from 'PlayerInteractEvent';

  class EventsMod {
    static addCustomWindBell(stack: ItemStack, base: string, sailTag: string): ItemStack;
    static buildContents(event: BuildCreativeModeTabContentsEvent): void;
    static onParticleTypeRegistry(event: RegisterParticleProvidersEvent): void;
  }


  class EventsNeoForged {
    static readonly FACING: DirectionProperty;
    static readonly HALF: EnumProperty;
    static rightClick(event: RightClickBlock): void;
  }

}

declare module 'com.cicada.chimes.item.recipe' {
  import { CustomRecipe, CraftingBookCategory, CraftingInput, RecipeType, RecipeSerializer } from 'net.minecraft.world.item.crafting';
  import { Level } from 'net.minecraft.world.level';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';

  interface WindBellCustomRecipe extends CustomRecipe {}
  class WindBellCustomRecipe extends CustomRecipe {
    constructor(p_249010_: CraftingBookCategory);
    assemble(p_343633_: CraftingInput, p_332698_: Provider): ItemStack;
    canCraftInDimensions(p_43999_: number, p_44000_: number): boolean;
    get serializer(): RecipeSerializer<any>;
    get type(): RecipeType<any>;
    matches(input: CraftingInput, p_44003_: Level): boolean;
  }

}

declare module 'com.cicada.chimes.item' {
  import { BlockItem, ItemStack, TooltipFlag } from 'net.minecraft.world.item';
  import { WindBellBlock } from 'com.cicada.chimes.block';
  import { Properties, TooltipContext } from 'Item';
  import { InteractionResultHolder, InteractionHand, InteractionResult } from 'net.minecraft.world';
  import { Level } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { UseOnContext } from 'net.minecraft.world.item.context';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface WindBellItem extends BlockItem {}
  class WindBellItem extends BlockItem {
    constructor(p_40565_: WindBellBlock, p_40566_: Properties);
    appendHoverText(itemStack: ItemStack, tooltipContext: TooltipContext, list: Component[], tooltipFlag: TooltipFlag): void;
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
    useOn(context: UseOnContext): InteractionResult;
    washOffDye(level: Level, player: Player, hand: InteractionHand): void;
  }

}

declare module 'com.cicada.chimes.particle' {
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { DeferredRegister } from 'net.neoforged.neoforge.registries';
  import { TextureSheetParticle, ParticleRenderType } from 'net.minecraft.client.particle';

  class ChimesParticles {
    static LEAF: SimpleParticleType;
  }


  class ChimesParticlesNeoForged {
    static readonly PARTICLES: DeferredRegister;
    static registerParticles(): void;
  }


  interface LeafParticle extends TextureSheetParticle {}
  class LeafParticle extends TextureSheetParticle {
    get renderType(): ParticleRenderType;
    tick(): void;
  }

}

declare module 'com.cicada.chimes.particle.LeafParticle' {
  import { ParticleProvider, SpriteSet, Particle } from 'net.minecraft.client.particle';
  import { SimpleParticleType } from 'net.minecraft.core.particles';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';

  interface Factory extends ParticleProvider<SimpleParticleType> {}
  class Factory extends ParticleProvider<SimpleParticleType> {
    constructor(sprite: SpriteSet);
    createParticle(typeIn: SimpleParticleType, level: ClientLevel, x: number, y: number, z: number, xSpeed: number, ySpeed: number, zSpeed: number): Particle;
  }

}