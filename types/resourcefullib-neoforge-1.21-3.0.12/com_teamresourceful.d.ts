declare module 'com.teamresourceful.resourcefullib.client' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { AutoCloseable } from 'java.lang';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Quaternionf, Matrix4f } from 'org.joml';
  import { Pose } from 'PoseStack';

  interface CloseablePoseStack extends AutoCloseable, PoseStack {}
  class CloseablePoseStack extends AutoCloseable {
    constructor(stack: PoseStack);

    constructor(graphics: GuiGraphics);

    constructor();
    clear(): boolean;
    close(): void;
    last(): Pose;
    mulPose(quaternion: Quaternionf): void;
    mulPose(matrix4f: Matrix4f): void;
    popPose(): void;
    pushPose(): void;
    rotateAround(quaternionf: Quaternionf, f: number, g: number, h: number): void;
    scale(f: number, g: number, h: number): void;
    setIdentity(): void;
    translate(d: number, e: number, f: number): void;
    translate(f: number, g: number, h: number): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.components' {
  import { Cursor } from 'com.teamresourceful.resourcefullib.client.screens.CursorScreen';
  import { AbstractButton, Renderable, AbstractWidget } from 'net.minecraft.client.gui.components';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { AbstractContainerEventHandler, GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { LayoutElement } from 'net.minecraft.client.gui.layouts';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';
  import { Consumer } from 'java.util.function';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';

  class CursorWidget {
    get cursor(): Cursor;
  }


  interface ImageButton extends AbstractButton {}
  class ImageButton extends AbstractButton {
    constructor(x: number, y: number, width: number, height: number);
    getTexture(var1: number, var2: number): ResourceLocation;
    getU(var1: number, var2: number): number;
    getV(var1: number, var2: number): number;
    renderWidget(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  interface ParentWidget extends Renderable, LayoutElement, NarratableEntry, AbstractContainerEventHandler {}
  class ParentWidget extends Renderable {
    readonly renderables: List;
    constructor(x: number, y: number);
    children(): GuiEventListener[];
    get height(): number;
    get rectangle(): ScreenRectangle;
    get width(): number;
    get x(): number;
    get y(): number;
    isActive(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    narrationPriority(): NarrationPriority;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set height(height: number);
    set width(width: number);
    set x(x: number);
    set y(y: number);
    setActive(active: boolean): void;
    setFocused(focused: boolean): void;
    updateNarration(output: NarrationElementOutput): void;
    visitWidgets(consumer: Consumer<AbstractWidget>): void;
  }


  interface SelectedImageButton extends ImageButton {}
  class SelectedImageButton extends ImageButton {
    constructor(x: number, y: number, u: number, v: number, selected: boolean, texture: ResourceLocation);
    getTexture(mouseX: number, mouseY: number): ResourceLocation;
    getU(mouseX: number, mouseY: number): number;
    getV(mouseX: number, mouseY: number): number;
    onPress(): void;
    setSelected(selected: boolean): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.components.selection' {
  import { GuiEventListener, AbstractContainerEventHandler } from 'net.minecraft.client.gui.components.events';
  import { Renderable } from 'net.minecraft.client.gui.components';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { Consumer } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { List } from 'java.util';
  import { NarrationPriority } from 'NarratableEntry';

  interface ListEntry extends GuiEventListener {}
  class ListEntry extends GuiEventListener {
  }


  interface SelectionList<T extends ListEntry = any> extends Renderable, NarratableEntry, AbstractContainerEventHandler {}
  class SelectionList<T extends ListEntry = any> extends Renderable {
    constructor(x: number, y: number, width: number, height: number, itemHeight: number, onSelection: Consumer<T>);

    constructor(x: number, y: number, width: number, height: number, itemHeight: number, onSelection: Consumer<T>, relativeClicks: boolean);
    addEntry(entry: T): void;
    children(): T[];
    ensureVisible(entry: T): void;
    get hovered(): T;
    get scrollAmount(): number;
    get selected(): T;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(key: number, point: number, mod: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    mouseReleased(mouseX: number, mouseY: number, button: number): boolean;
    mouseScrolled(mouseX: number, mouseY: number, horizontalScroll: number, verticalScroll: number): boolean;
    narrationPriority(): NarrationPriority;
    removeEntry(entry: T): boolean;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    set selected(entry: T);
    updateEntries(entries: T[]): void;
    updateNarration(output: NarrationElementOutput): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.fluid.data' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { Minecraft, Camera } from 'net.minecraft.client';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { Vector3f } from 'org.joml';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { FogMode } from 'FogRenderer';
  import { FogShape } from 'com.mojang.blaze3d.shaders';
  import { Builder } from 'com.teamresourceful.resourcefullib.client.fluid.data.ClientFluidProperties';

  class ClientFluidProperties {
    static builder(): Builder;
    flowing(var1: BlockAndTintGetter, var2: BlockPos, var3: FluidState): ResourceLocation;
    modifyFogColor(camera: Camera, partialTick: number, level: ClientLevel, renderDistance: number, darkenWorldAmount: number, fluidFogColor: Vector3f): Vector3f;
    modifyFogRender(camera: Camera, mode: FogMode, renderDistance: number, partialTick: number, nearDistance: number, farDistance: number, shape: FogShape): void;
    overlay(var1: BlockAndTintGetter, var2: BlockPos, var3: FluidState): ResourceLocation;
    renderFluid(pos: BlockPos, world: BlockAndTintGetter, vertexConsumer: VertexConsumer, blockState: BlockState, fluidState: FluidState, sprites: Function<ResourceLocation, TextureAtlasSprite>): boolean;
    renderOverlay(minecraft: Minecraft, stack: PoseStack): void;
    screenOverlay(): ResourceLocation;
    still(var1: BlockAndTintGetter, var2: BlockPos, var3: FluidState): ResourceLocation;
    tintColor(var1: BlockAndTintGetter, var2: BlockPos, var3: FluidState): number;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.fluid.data.ClientFluidProperties' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Function3, Function6 } from 'com.mojang.datafixers.util';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { Integer, Boolean } from 'java.lang';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Function } from 'java.util.function';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { ClientFluidProperties } from 'com.teamresourceful.resourcefullib.client.fluid.data';

  class Builder {
    build(): ClientFluidProperties;
    flowing(flowing: ResourceLocation): Builder;
    flowing(view: BlockAndTintGetter, pos: BlockPos, state: FluidState): ResourceLocation;
    overlay(overlay: ResourceLocation): Builder;
    overlay(view: BlockAndTintGetter, pos: BlockPos, state: FluidState): ResourceLocation;
    renderFluid(renderFluid: Function6<BlockPos, BlockAndTintGetter, VertexConsumer, BlockState, FluidState, Function<ResourceLocation, TextureAtlasSprite>, boolean>): Builder;
    renderFluid(pos: BlockPos, world: BlockAndTintGetter, vertexConsumer: VertexConsumer, blockState: BlockState, fluidState: FluidState, sprites: Function<ResourceLocation, TextureAtlasSprite>): boolean;
    screenOverlay(screenOverlay: ResourceLocation): Builder;
    screenOverlay(): ResourceLocation;
    still(still: ResourceLocation): Builder;
    still(view: BlockAndTintGetter, pos: BlockPos, state: FluidState): ResourceLocation;
    tintColor(tintColor: Function3<BlockAndTintGetter, BlockPos, FluidState, number>): Builder;
    tintColor(tintColor: number): Builder;
    tintColor(view: BlockAndTintGetter, pos: BlockPos, state: FluidState): number;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.fluid.registry' {
  import { ResourcefulRegistry, RegistryEntry, HolderRegistryEntry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { ClientFluidProperties } from 'com.teamresourceful.resourcefullib.client.fluid.data';
  import { Builder } from 'com.teamresourceful.resourcefullib.client.fluid.data.ClientFluidProperties';
  import { Supplier } from 'java.util.function';
  import { Collection } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface ResourcefulClientFluidRegistry extends ResourcefulRegistry<ClientFluidProperties> {}
  class ResourcefulClientFluidRegistry extends ResourcefulRegistry<ClientFluidProperties> {
    constructor(modid: string);
    static get(id: ResourceLocation): ClientFluidProperties;
    get entries(): Collection<RegistryEntry<ClientFluidProperties>>;
    init(): void;
    register(id: string, builder: Builder): RegistryEntry<ClientFluidProperties>;
    register<I extends ClientFluidProperties>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
    register<I extends T>(var1: string, var2: Supplier<I>): RegistryEntry<I>;
    registerHolder(id: string, supplier: Supplier<ClientFluidProperties>): HolderRegistryEntry<ClientFluidProperties>;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.highlights.base' {
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  class Highlightable {
    getHighlight(var1: Level, var2: BlockPos, var3: BlockState): Highlight;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.highlights' {
  import { SimpleJsonResourceReloadListener } from 'net.minecraft.server.packs.resources';
  import { Codec } from 'com.mojang.serialization';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Entity } from 'net.minecraft.world.entity';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface HighlightHandler extends SimpleJsonResourceReloadListener {}
  class HighlightHandler extends SimpleJsonResourceReloadListener {
    static readonly HIGHLIGHT_CODEC: Codec;
    constructor();
    static onBlockHighlight(cameraPos: Vec3, cameraEntity: Entity, stack: PoseStack, blockPos: BlockPos, state: BlockState, consumer: VertexConsumer): boolean;
    static setColor(value: number): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.highlights.state' {
  import { Codec } from 'com.mojang.serialization';
  import { List } from 'java.util';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';

  class StateVariant {
    static stateCodec(block: Block): Codec<BlockState[]>;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.registry' {
  import { ResourcefulRegistry } from 'com.teamresourceful.resourcefullib.common.registry';

  class ResourcefulClientRegistries {
    static create<D, T extends ResourcefulRegistry<D>>(type: ResourcefulClientRegistryType<D, T>, id: string): T;
  }


  class ResourcefulClientRegistryType<D = any, T extends ResourcefulRegistry<D> = any> {
    static readonly FLUID: ResourcefulClientRegistryType;
    toString(): string;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.scissor' {
  class ScissorBoxStack {
    pop(): void;
    push(x: number, y: number, width: number, height: number): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.screens' {
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Cursor } from 'com.teamresourceful.resourcefullib.client.screens.CursorScreen';
  import { List } from 'java.util';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { Screen } from 'net.minecraft.client.gui.screens';

  interface AbstractContainerCursorScreen<T extends AbstractContainerMenu = any> extends CursorScreen, AbstractContainerScreen<T> {}
  class AbstractContainerCursorScreen<T extends AbstractContainerMenu = any> extends CursorScreen {
    constructor(abstractContainerMenu: T, inventory: Inventory, component: Component);
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, f: number): void;
    setCursor(cursor: Cursor): void;
    setCursor(listeners: GuiEventListener[], mouseX: number, mouseY: number): void;
  }


  interface BaseCursorScreen extends CursorScreen, Screen {}
  class BaseCursorScreen extends CursorScreen {
    actuallyRender(graphics: GuiGraphics, i: number, j: number, f: number): void;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, f: number): void;
    setCursor(cursor: Cursor): void;
    setCursor(listeners: GuiEventListener[], mouseX: number, mouseY: number): void;
  }


  class CursorScreen {
    setCursor(var1: Cursor): void;
    setCursor(listeners: GuiEventListener[], mouseX: number, mouseY: number): void;
  }


  interface HistoryScreen extends ScreenHistory, Screen {}
  class HistoryScreen extends ScreenHistory {
    canGoBack(): boolean;
    get lastScreen(): Screen;
    set lastScreen(screen: Screen);
  }


  interface PriorityScreen extends BaseCursorScreen {}
  class PriorityScreen extends BaseCursorScreen {
    children(): GuiEventListener[];
  }


  class ScreenHistory {
    canGoBack(): boolean;
    get lastScreen(): Screen;
    goBack(): void;
    set lastScreen(var1: Screen);
  }

}

declare module 'com.teamresourceful.resourcefullib.client.screens.CursorScreen' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Cursor extends Enum<Cursor> {}
  class Cursor extends Enum<Cursor> {
    static readonly DEFAULT: Cursor;
    static readonly POINTER: Cursor;
    static readonly DISABLED: Cursor;
    static readonly TEXT: Cursor;
    static readonly CROSSHAIR: Cursor;
    static readonly RESIZE_EW: Cursor;
    static readonly RESIZE_NS: Cursor;
    static readonly RESIZE_NWSE: Cursor;
    static readonly RESIZE_NESW: Cursor;
    static readonly RESIZE_ALL: Cursor;
    static valueOf(name: string): Cursor;
    static values(): Cursor[];
  }

}

declare module 'com.teamresourceful.resourcefullib.client.screens.state' {
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { Class } from 'java.lang';

  class PageState<T = any> {
    createScreen(var1: T): Screen;
  }


  class ScreenState {
    createScreen(): Screen;
  }


  class ScreenStateManager {
    static getOrAddState<T extends ScreenState>(id: ResourceLocation, defaultState: Supplier<T>, clazz: Class<T>): T;
    static getScreen(id: ResourceLocation, defaultScreen: Supplier<Screen>): Screen;
    static getState(id: ResourceLocation): ScreenState;
    static updateState<T extends ScreenState>(id: ResourceLocation, state: T): T;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.sysinfo' {
  import { Consumer } from 'java.util.function';

  class SystemInfo {
    static addBuilder(category: string, builder: Consumer<SystemInfoBuilder>): void;
    static buildForDiscord(): string;
  }

}

declare module 'com.teamresourceful.resourcefullib.client.utils' {
  import { Cursor } from 'com.teamresourceful.resourcefullib.client.screens.CursorScreen';
  import { Rect2i } from 'net.minecraft.client.renderer';
  import { Minecraft } from 'net.minecraft.client';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Vector2ic } from 'org.joml';
  import { ClosingScissorBox, CloseableScissorStack, ScissorBoxStack } from 'com.teamresourceful.resourcefullib.client.scissor';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ScreenRectangle } from 'net.minecraft.client.gui.navigation';

  class CursorUtils {
    static setCrosshair(): void;
    static setCursor(state: boolean, cursor: Cursor): void;
    static setDefault(): void;
    static setDisabled(): void;
    static setPointing(): void;
    static setResizeAll(): void;
    static setResizeEastWest(): void;
    static setResizeNorthEastSouthWest(): void;
    static setResizeNorthSouth(): void;
    static setResizeNorthWestSouthEast(): void;
    static setText(): void;
  }


  class RenderUtils {
    static createScissor(minecraft: Minecraft, graphics: GuiGraphics, x: number, y: number, width: number, height: number): CloseableScissorStack;
    static createScissorBox(minecraft: Minecraft, stack: PoseStack, x: number, y: number, width: number, height: number): ClosingScissorBox;
    static createScissorBoxStack(scissorStack: ScissorBoxStack, minecraft: Minecraft, stack: PoseStack, x: number, y: number, width: number, height: number): CloseableScissorStack;
    static getScissorRect(minecraft: Minecraft, stack: PoseStack, x: number, y: number, width: number, height: number): Rect2i;
    static getTranslation(stack: PoseStack): Vector2ic;
  }


  class ScreenUtils {
    static clearTooltip(): void;
    static inBounds(rectangle: ScreenRectangle, x: number, y: number): boolean;
    static sendClick(containerId: number, buttonId: number): void;
    static sendCommand(command: string): void;
    static setTooltip(stack: ItemStack): void;
    static setTooltip(component: Component): void;
    static setTooltip(component: Component[]): void;
    static setTooltip(stack: ItemStack, replace: boolean): void;
    static setTooltip(component: Component, replace: boolean): void;
    static setTooltip(component: Component[], replace: boolean): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common' {
  import { RegistryAccess } from 'net.minecraft.core';

  class ApiProxy {
    get registryAccess(): RegistryAccess;
    static getRegistry(): RegistryAccess;
    static hasProxy(): boolean;
    static setInstance(instance: ApiProxy): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.ApiProxy' {
  class Storage {
  }

}

declare module 'com.teamresourceful.resourcefullib.common.bytecodecs' {
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { Optional } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ByteBuf } from 'io.netty.buffer';
  import { ResourceKey } from 'net.minecraft.resources';
  import { Registry, IdMap } from 'net.minecraft.core';
  import { Pair, Either } from 'com.mojang.datafixers.util';
  import { FriendlyByteBuf, RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { StreamCodec } from 'net.minecraft.network.codec';

  interface CompoundTagByteCodec extends ByteCodec<Optional> {}
  class CompoundTagByteCodec extends ByteCodec<Optional> {
    static readonly INSTANCE: CompoundTagByteCodec;
    decode(buffer: ByteBuf): Optional<CompoundTag>;
    encode(value: Optional<CompoundTag>, buffer: ByteBuf): void;
  }


  class ExtraByteCodecs {
    static readonly RESOURCE_LOCATION: ByteCodec;
    static readonly DIMENSION: ByteCodec;
    static readonly BLOCK_POS: ByteCodec;
    static readonly CHUNK_POS: ByteCodec;
    static readonly SECTION_POS: ByteCodec;
    static readonly GLOBAL_POS: ByteCodec;
    static readonly VECTOR_3F: ByteCodec;
    static readonly NULLABLE_COMPOUND_TAG: ByteCodec;
    static readonly NONNULL_COMPOUND_TAG: ByteCodec;
    static readonly COMPOUND_TAG: ByteCodec;
    static readonly COMPONENT: ByteCodec;
    static readonly ITEM: ByteCodec;
    static readonly FLUID: ByteCodec;
    static readonly ITEM_STACK: ByteCodec;
    static readonly INGREDIENT: ByteCodec;
    static either<A, B>(first: ByteCodec<A>, second: ByteCodec<B>): ByteCodec<Either<A, B>>;
    static pair<A, B>(first: ByteCodec<A>, second: ByteCodec<B>): ByteCodec<Pair<A, B>>;
    static registry<T>(map: IdMap<T>): ByteCodec<T>;
    static resourceKey<T, R extends Registry<T>>(registry: ResourceKey<R>): ByteCodec<ResourceKey<T>>;
    static toFriendly(buffer: ByteBuf): FriendlyByteBuf;
    static toRegistry(buffer: ByteBuf): RegistryFriendlyByteBuf;
  }


  class StreamCodecByteCodec {
    static of<T>(codec: StreamCodec<ByteBuf, T>): ByteCodec<T>;
    static ofFriendly<T>(codec: StreamCodec<FriendlyByteBuf, T>): ByteCodec<T>;
    static ofRegistry<T>(codec: StreamCodec<RegistryFriendlyByteBuf, T>): ByteCodec<T>;
    static to<T>(codec: ByteCodec<T>): StreamCodec<ByteBuf, T>;
    static toFriendly<T>(codec: ByteCodec<T>): StreamCodec<FriendlyByteBuf, T>;
    static toRegistry<T>(codec: ByteCodec<T>): StreamCodec<RegistryFriendlyByteBuf, T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.caches' {
  import { BiFunction, Function } from 'java.util.function';
  import { Map } from 'java.util';
  import { Pair } from 'com.mojang.datafixers.util';

  interface CacheableBiFunction<T = any, U = any, R = any> extends BiFunction<T, U, R>, CachingFunction {}
  class CacheableBiFunction<T = any, U = any, R = any> extends BiFunction<T, U, R> {
    constructor(functionParameter: BiFunction<T, U, R>, cache: Map<Pair<T, U>, R>);

    constructor(functionParameter: BiFunction<T, U, R>);
    apply(t: T, u: U): R;
    clear(): void;
    static concurrent<T, U, R>(functionParameter: BiFunction<T, U, R>): CacheableBiFunction<T, U, R>;
  }


  interface CacheableFunction<T = any, R = any> extends Function<T, R>, CachingFunction {}
  class CacheableFunction<T = any, R = any> extends Function<T, R> {
    constructor(functionParameter: Function<T, R>, cache: Map<T, R>);

    constructor(functionParameter: Function<T, R>);
    apply(t: T): R;
    clear(): void;
    static concurrent<T, R>(functionParameter: Function<T, R>): CacheableFunction<T, R>;
  }


  class CachingFunction {
    clear(): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.bounds' {
  import { Codec } from 'com.mojang.serialization';
  import { UniformInt, UniformFloat } from 'net.minecraft.util.valueproviders';

  class UniformedNumberCodecs {
    static readonly FLOAT_CODEC: Codec;
    static readonly INT_CODEC: Codec;
    static get intCodec(): Codec<UniformInt>;
    static rangedUniformFloatCodec(min: number, max: number): Codec<UniformFloat>;
    static rangedUniformIntCodec(min: number, max: number): Codec<UniformInt>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { PrimitiveCodec } from 'com.mojang.serialization.codecs';
  import { Function, ToDoubleFunction } from 'java.util.function';
  import { Optional, Set } from 'java.util';
  import { WeightedCollection } from 'com.teamresourceful.resourcefullib.common.collections';
  import { Registry } from 'net.minecraft.core';
  import { JsonElement } from 'com.google.gson';
  import { Either, Pair } from 'com.mojang.datafixers.util';
  import { Class, Enum } from 'java.lang';
  import { Reader, Writer } from 'com.teamresourceful.resourcefullib.common.codecs.PrimitiveCodecHelper';

  class CodecExtras {
    static readonly NON_NEGATIVE_DOUBLE: Codec;
    static readonly POSITIVE_DOUBLE: Codec;
    static readonly NON_POSITIVE_DOUBLE: Codec;
    static readonly NEGATIVE_DOUBLE: Codec;
    static readonly DOUBLE_UNIT_INTERVAL: Codec;
    static readonly NON_NEGATIVE_FLOAT: Codec;
    static readonly POSITIVE_FLOAT: Codec;
    static readonly NON_POSITIVE_FLOAT: Codec;
    static readonly NEGATIVE_FLOAT: Codec;
    static readonly FLOAT_UNIT_INTERVAL: Codec;
    static readonly NON_NEGATIVE_INT: Codec;
    static readonly POSITIVE_INT: Codec;
    static readonly NON_POSITIVE_INT: Codec;
    static readonly NEGATIVE_INT: Codec;
    static readonly INT_UNIT_INTERVAL: Codec;
    static readonly NUMBER: PrimitiveCodec;
    static eitherLeft<S>(eitherCodec: Codec<Either<S, S>>): Codec<S>;
    static eitherRight<S>(eitherCodec: Codec<Either<S, S>>): Codec<S>;
    static linkedSet<T>(codec: Codec<T>): Codec<Set<T>>;
    static optionalFor<O, A>(getter: Function<O, A>): Function<O, Optional<A>>;
    static passthrough<T>(encoder: Function<T, JsonElement>, decoder: Function<JsonElement, T>): Codec<T>;
    static registryId<T>(registry: Registry<T>): Codec<T>;
    static set<T>(codec: Codec<T>): Codec<Set<T>>;
    static weightedCollection<T>(codec: Codec<T>, weighter: ToDoubleFunction<T>): Codec<WeightedCollection<T>>;
  }


  interface EnumCodec<T extends Enum<T> = any> extends Codec<T> {}
  class EnumCodec<T extends Enum<T> = any> extends Codec<T> {
    decode<T1>(ops: DynamicOps<T1>, input: T1): DataResult<Pair<T, T1>>;
    encode<T1>(input: T, ops: DynamicOps<T1>, prefix: T1): DataResult<T1>;
    static of<T extends Enum<T>>(clazz: Class<T>): EnumCodec<T>;
    static ofRepresentable<T extends Enum<T>>(clazz: Class<T>, getter: Function<string, T>): EnumCodec<T>;
  }


  class PrimitiveCodecHelper {
    static create<T>(reader: Reader<T>, writer: Writer<T>, name: string): PrimitiveCodec<T>;
    read<I>(ops: DynamicOps<I>, input: I): DataResult<T>;
    toString(): string;
    write<I>(ops: DynamicOps<I>, value: T): I;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.deferred' {
  import { Supplier } from 'java.util.function';
  import { DynamicOps, Codec, DataResult } from 'com.mojang.serialization';
  import { Pair } from 'com.mojang.datafixers.util';

  interface Deferred<E = any> extends Supplier<E> {}
  class Deferred<E = any> extends Supplier<E> {
    get (): E;
    static of<V, T>(ops: DynamicOps<T>, codec: Codec<V>, input: T): Deferred<V>;
  }


  interface DeferredCodec<E = any> extends Codec<Deferred> {}
  class DeferredCodec<E = any> extends Codec<Deferred> {
    constructor(codec: Codec<E>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<Deferred<E>, T>>;
    encode<T>(input: Deferred<E>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.maps' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { Map } from 'java.util';
  import { Function } from 'java.util.function';
  import { Pair } from 'com.mojang.datafixers.util';

  interface DispatchMapCodec<K = any, V = any> extends Codec<Map> {}
  class DispatchMapCodec<K = any, V = any> extends Codec<Map> {
    constructor(keyCodec: Codec<K>, valueCodec: Function<K, Codec<V>>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<Map<K, V>, T>>;
    encode<T>(input: Map<K, V>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    static of<A, B>(keyCodec: Codec<A>, valueCodec: Function<A, Codec<B>>): DispatchMapCodec<A, B>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.predicates.properties' {
  import { Codec } from 'com.mojang.serialization';
  import { StateDefinition, StateHolder } from 'net.minecraft.world.level.block.state';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { Comparable } from 'java.lang';
  import { Optional } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';

  class PropertyMatcher {
    static readonly CODEC: Codec;
    codec(): Codec<PropertyMatcher>;
    match<S extends StateHolder<any, S>>(name: string, definition: StateDefinition<any, S>, holder: S): boolean;
    match<T extends Comparable<T>>(var1: StateHolder<any, any>, var2: Property<T>): boolean;
    value(var1: RandomSource): Optional<string>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.PrimitiveCodecHelper' {
  import { DataResult, DynamicOps } from 'com.mojang.serialization';

  class Reader<T = any> {
    read<I>(var1: DynamicOps<I>, var2: I): DataResult<T>;
  }


  class Writer<T = any> {
    write<I>(var1: DynamicOps<I>, var2: T): I;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.recipes' {
  import { Codec } from 'com.mojang.serialization';

  class ItemStackCodec {
    static readonly CODEC: Codec;
  }


  class LazyHolders {
    static readonly LAZY_ITEM: Codec;
    static readonly LAZY_BLOCK: Codec;
    static readonly LAZY_FLUID: Codec;
    static readonly LAZY_ENTITY: Codec;
    static readonly LAZY_EFFECT: Codec;
    static readonly LAZY_SOUND: Codec;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.tags' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { HolderSet, Registry } from 'net.minecraft.core';
  import { Pair } from 'com.mojang.datafixers.util';

  interface HolderSetCodec<E = any> extends Codec<HolderSet> {}
  class HolderSetCodec<E = any> extends Codec<HolderSet> {
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<HolderSet<E>, T>>;
    encode<T>(set: HolderSet<E>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
    static of<E>(registry: Registry<E>): HolderSetCodec<E>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.codecs.yabn' {
  import { ListBuilder, DynamicOps, DataResult, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { YabnElement, YabnObject, YabnPrimitive } from 'com.teamresourceful.yabn.elements';
  import { UnaryOperator, Consumer, BiConsumer } from 'java.util.function';
  import { Stream } from 'java.util.stream';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Number, Boolean } from 'java.lang';
  import { List } from 'java.util';
  import { AbstractStringBuilder } from 'RecordBuilder';

  interface YabnArrayBuilder extends ListBuilder<YabnElement> {}
  class YabnArrayBuilder extends ListBuilder<YabnElement> {
    add(value: YabnElement): ListBuilder<YabnElement>;
    add(value: DataResult<YabnElement>): ListBuilder<YabnElement>;
    build(prefix: YabnElement): DataResult<YabnElement>;
    mapError(onError: UnaryOperator<string>): ListBuilder<YabnElement>;
    ops(): DynamicOps<YabnElement>;
    withErrorsFrom(result: DataResult<any>): ListBuilder<YabnElement>;
  }


  interface YabnObjectMapLike extends MapLike<YabnElement> {}
  class YabnObjectMapLike extends MapLike<YabnElement> {
    constructor(yabnObject: YabnObject);
    entries(): Stream<Pair<YabnElement, YabnElement>>;
    get(key: YabnElement): YabnElement;
    get(key: string): YabnElement;
  }


  interface YabnOps extends DynamicOps<YabnElement> {}
  class YabnOps extends DynamicOps<YabnElement> {
    static readonly INSTANCE: YabnOps;
    static readonly COMPRESSED: YabnOps;
    compressMaps(): boolean;
    convertTo<U>(outOps: DynamicOps<U>, input: YabnElement): U;
    createBoolean(value: boolean): YabnElement;
    createList(input: Stream<YabnElement>): YabnElement;
    createMap(map: Stream<Pair<YabnElement, YabnElement>>): YabnElement;
    createNumeric(i: Number): YabnElement;
    createString(value: string): YabnElement;
    empty(): YabnElement;
    static getAsString(primitive: YabnPrimitive): string;
    getBooleanValue(input: YabnElement): DataResult<boolean>;
    getList(input: YabnElement): DataResult<Consumer<Consumer<YabnElement>>>;
    getMap(input: YabnElement): DataResult<MapLike<YabnElement>>;
    getMapEntries(input: YabnElement): DataResult<Consumer<BiConsumer<YabnElement, YabnElement>>>;
    getMapValues(input: YabnElement): DataResult<Stream<Pair<YabnElement, YabnElement>>>;
    getNumberValue(input: YabnElement): DataResult<Number>;
    getStream(input: YabnElement): DataResult<Stream<YabnElement>>;
    getStringValue(input: YabnElement): DataResult<string>;
    listBuilder(): ListBuilder<YabnElement>;
    mapBuilder(): RecordBuilder<YabnElement>;
    mergeToList(list: YabnElement, value: YabnElement): DataResult<YabnElement>;
    mergeToList(list: YabnElement, values: YabnElement[]): DataResult<YabnElement>;
    mergeToMap(map: YabnElement, key: YabnElement, value: YabnElement): DataResult<YabnElement>;
    mergeToMap(map: YabnElement, values: MapLike<YabnElement>): DataResult<YabnElement>;
    remove(input: YabnElement, key: string): YabnElement;
    toString(): string;
  }


  interface YabnRecordBuilder extends AbstractStringBuilder<YabnElement, YabnObject> {}
  class YabnRecordBuilder extends AbstractStringBuilder<YabnElement, YabnObject> {
  }

}

declare module 'com.teamresourceful.resourcefullib.common.collections' {
  import { AbstractList, List, Collection, Random, NavigableMap, Iterator } from 'java.util';
  import { RandomSource } from 'net.minecraft.util';
  import { WeightedCollectionRandom } from 'com.teamresourceful.resourcefullib.common.collections.WeightedCollection';
  import { Double } from 'java.lang';
  import { BiConsumer, ToDoubleFunction } from 'java.util.function';
  import { Stream, Collector } from 'java.util.stream';

  interface CycleableList<E = any> extends SelectableList<E> {}
  class CycleableList<E = any> extends SelectableList<E> {
    constructor();
    next(): void;
  }


  interface SelectableList<E = any> extends AbstractList<E> {}
  class SelectableList<E = any> extends AbstractList<E> {
    constructor(defaultValue: E, list: E[]);
    add(index: number, element: E): void;
    get(index: number): E;
    get selected(): E;
    get selectedIndex(): number;
    static of<E>(pDefaultValue: E, ...pElements: E[]): SelectableList<E>;
    remove(index: number): E;
    set(pIndex: number, pValue: E): E;
    set selectedIndex(index: number);
    size(): number;
  }


  interface WeightedCollection<E = any> extends Collection<E> {}
  class WeightedCollection<E = any> extends Collection<E> {
    constructor();

    constructor(random: Random);

    constructor(random: RandomSource);

    constructor(random: WeightedCollectionRandom);
    add(weight: number, result: E): WeightedCollection<E>;
    add(e: E): boolean;
    addAll(c: Collection<E>): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    equals(o: any): boolean;
    forEachWithSelf(action: BiConsumer<WeightedCollection<E>, E>): void;
    get(index: number): E;
    get map(): NavigableMap<number, E>;
    get total(): number;
    getAdjustedWeight(weight: number): number;
    static getCollector<T>(weightGetter: ToDoubleFunction<T>): Collector<T, any, WeightedCollection<T>>;
    hashCode(): number;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
    next(): E;
    static of<T>(collection: Collection<T>, weightGetter: ToDoubleFunction<T>): WeightedCollection<T>;
    remove(o: any): boolean;
    removeAll(c: Collection<any>): boolean;
    retainAll(c: Collection<any>): boolean;
    setRandom(random: WeightedCollectionRandom): void;
    setRandom(random: Random): void;
    setRandom(random: RandomSource): void;
    size(): number;
    stream(): Stream<E>;
    toArray(): any[];
    toArray<T>(a: T[]): T[];
  }

}

declare module 'com.teamresourceful.resourcefullib.common.collections.WeightedCollection' {
  class WeightedCollectionRandom {
    nextDouble(): number;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.color' {
  import { Codec, DataResult, Dynamic } from 'com.mojang.serialization';
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { Consumer } from 'java.util.function';
  import { TextColor, Style } from 'net.minecraft.network.chat';

  class Color {
    static readonly CODEC: Codec;
    static readonly DEFAULT: Color;
    static readonly RAINBOW: Color;
    static readonly BYTE_CODEC: ByteCodec;
    static readonly RGB_CODEC: Codec;
    constructor(value: number);

    constructor(r: number, g: number, b: number, a: number);
    static createNamedColor(name: string, value: number): Color;
    static createPulsingColor(name: string, startingValue: number, editorConsumer: Consumer<MutableColor>): Color;
    static decodeColor(dynamic: Dynamic<any>): DataResult<Color>;
    equals(obj: any): boolean;
    get asStyle(): Style;
    get floatAlpha(): number;
    get floatBlue(): number;
    get floatGreen(): number;
    get floatRed(): number;
    get intAlpha(): number;
    get intBlue(): number;
    get intGreen(): number;
    get intRed(): number;
    get textColor(): TextColor;
    get value(): number;
    getRGBComponents(compArray: number[]): number[];
    hashCode(): number;
    static initRainbow(): void;
    isDefault(): boolean;
    isRainbow(): boolean;
    isSpecial(): boolean;
    static parse(color: string): Color;
    static parseColor(color: string): number;
    toString(): string;
    static tryParse(color: string): Color;
    withAlpha(alpha: number): Color;
  }


  class ConstantColors {
    static readonly aliceblue: Color;
    static readonly antiquewhite: Color;
    static readonly aqua: Color;
    static readonly aquamarine: Color;
    static readonly azure: Color;
    static readonly beige: Color;
    static readonly bisque: Color;
    static readonly black: Color;
    static readonly blanchedalmond: Color;
    static readonly blue: Color;
    static readonly blueviolet: Color;
    static readonly brown: Color;
    static readonly burlywood: Color;
    static readonly cadetblue: Color;
    static readonly chartreuse: Color;
    static readonly chocolate: Color;
    static readonly coral: Color;
    static readonly cornflowerblue: Color;
    static readonly cornsilk: Color;
    static readonly crimson: Color;
    static readonly cyan: Color;
    static readonly darkblue: Color;
    static readonly darkcyan: Color;
    static readonly darkgoldenrod: Color;
    static readonly darkgray: Color;
    static readonly darkgreen: Color;
    static readonly darkgrey: Color;
    static readonly darkkhaki: Color;
    static readonly darkmagenta: Color;
    static readonly darkolivegreen: Color;
    static readonly darkorange: Color;
    static readonly darkorchid: Color;
    static readonly darkred: Color;
    static readonly darksalmon: Color;
    static readonly darkseagreen: Color;
    static readonly darkslateblue: Color;
    static readonly darkslategray: Color;
    static readonly darkslategrey: Color;
    static readonly darkturquoise: Color;
    static readonly darkviolet: Color;
    static readonly deeppink: Color;
    static readonly deepskyblue: Color;
    static readonly dimgray: Color;
    static readonly dimgrey: Color;
    static readonly dodgerblue: Color;
    static readonly firebrick: Color;
    static readonly floralwhite: Color;
    static readonly forestgreen: Color;
    static readonly fuchsia: Color;
    static readonly gainsboro: Color;
    static readonly ghostwhite: Color;
    static readonly goldenrod: Color;
    static readonly gold: Color;
    static readonly gray: Color;
    static readonly green: Color;
    static readonly greenyellow: Color;
    static readonly grey: Color;
    static readonly honeydew: Color;
    static readonly hotpink: Color;
    static readonly indianred: Color;
    static readonly indigo: Color;
    static readonly ivory: Color;
    static readonly khaki: Color;
    static readonly lavenderblush: Color;
    static readonly lavender: Color;
    static readonly lawngreen: Color;
    static readonly lemonchiffon: Color;
    static readonly lightblue: Color;
    static readonly lightcoral: Color;
    static readonly lightcyan: Color;
    static readonly lightgoldenrodyellow: Color;
    static readonly lightgray: Color;
    static readonly lightgreen: Color;
    static readonly lightgrey: Color;
    static readonly lightpink: Color;
    static readonly lightsalmon: Color;
    static readonly lightseagreen: Color;
    static readonly lightskyblue: Color;
    static readonly lightslategray: Color;
    static readonly lightslategrey: Color;
    static readonly lightsteelblue: Color;
    static readonly lightyellow: Color;
    static readonly lime: Color;
    static readonly limegreen: Color;
    static readonly linen: Color;
    static readonly magenta: Color;
    static readonly maroon: Color;
    static readonly mediumaquamarine: Color;
    static readonly mediumblue: Color;
    static readonly mediumorchid: Color;
    static readonly mediumpurple: Color;
    static readonly mediumseagreen: Color;
    static readonly mediumslateblue: Color;
    static readonly mediumspringgreen: Color;
    static readonly mediumturquoise: Color;
    static readonly mediumvioletred: Color;
    static readonly midnightblue: Color;
    static readonly mintcream: Color;
    static readonly mistyrose: Color;
    static readonly moccasin: Color;
    static readonly navajowhite: Color;
    static readonly navy: Color;
    static readonly oldlace: Color;
    static readonly olive: Color;
    static readonly olivedrab: Color;
    static readonly orange: Color;
    static readonly orangered: Color;
    static readonly orchid: Color;
    static readonly palegoldenrod: Color;
    static readonly palegreen: Color;
    static readonly paleturquoise: Color;
    static readonly palevioletred: Color;
    static readonly papayawhip: Color;
    static readonly peachpuff: Color;
    static readonly peru: Color;
    static readonly pink: Color;
    static readonly plum: Color;
    static readonly powderblue: Color;
    static readonly purple: Color;
    static readonly rebeccapurple: Color;
    static readonly red: Color;
    static readonly rosybrown: Color;
    static readonly royalblue: Color;
    static readonly saddlebrown: Color;
    static readonly salmon: Color;
    static readonly sandybrown: Color;
    static readonly seagreen: Color;
    static readonly seashell: Color;
    static readonly sienna: Color;
    static readonly silver: Color;
    static readonly skyblue: Color;
    static readonly slateblue: Color;
    static readonly slategray: Color;
    static readonly slategrey: Color;
    static readonly snow: Color;
    static readonly springgreen: Color;
    static readonly steelblue: Color;
    static readonly tan: Color;
    static readonly teal: Color;
    static readonly thistle: Color;
    static readonly tomato: Color;
    static readonly turquoise: Color;
    static readonly violet: Color;
    static readonly wheat: Color;
    static readonly white: Color;
    static readonly whitesmoke: Color;
    static readonly yellow: Color;
    static readonly yellowgreen: Color;
  }


  interface MutableColor extends Color {}
  class MutableColor extends Color {
    setBlue(b: number): void;
    setGreen(g: number): void;
    setRed(r: number): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.datagen' {
  import { RecipeBuilder } from 'net.minecraft.data.recipes';
  import { Criterion } from 'net.minecraft.advancements';

  interface CodecRecipeBuilder extends RecipeBuilder {}
  class CodecRecipeBuilder extends RecipeBuilder {
    group(string: string): RecipeBuilder;
    unlockedBy(string: string, criterion: Criterion<any>): RecipeBuilder;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.exceptions' {
  import { RuntimeException, IllegalAccessException, Throwable } from 'java.lang';

  interface NotImplementedException extends RuntimeException {}
  class NotImplementedException extends RuntimeException {
    constructor();
  }


  interface UtilityClassException extends IllegalAccessException {}
  class UtilityClassException extends IllegalAccessException {
    constructor();
  }


  interface ValidationException extends RuntimeException {}
  class ValidationException extends RuntimeException {
    constructor(message: string);

    constructor(cause: Throwable);
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid.data' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { FlowingFluid } from 'net.minecraft.world.level.material';
  import { Item, Rarity } from 'net.minecraft.world.item';
  import { LiquidBlock } from 'net.minecraft.world.level.block';
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { Builder } from 'com.teamresourceful.resourcefullib.common.fluid.data.FluidProperties';

  class FluidData {
    block(): Supplier<LiquidBlock>;
    bucket(): Supplier<Item>;
    data<T>(): T;
    flowing(): Supplier<FlowingFluid>;
    id(): ResourceLocation;
    properties(): FluidProperties;
    setBlock(var1: Supplier<LiquidBlock>): void;
    setBucket(var1: Supplier<Item>): void;
    setFlowing(var1: Supplier<FlowingFluid>): void;
    setStill(var1: Supplier<FlowingFluid>): void;
    still(): Supplier<FlowingFluid>;
  }


  class FluidProperties {
    adjacentPathType(): PathType;
    static builder(): Builder;
    canConvertToSource(): boolean;
    canDrown(): boolean;
    canExtinguish(): boolean;
    canHydrate(): boolean;
    canPlace(): boolean;
    canPushEntity(): boolean;
    canSwim(): boolean;
    density(): number;
    dropOff(): number;
    explosionResistance(): number;
    fallDistanceModifier(): number;
    flowing(): ResourceLocation;
    lightLevel(): number;
    motionScale(): number;
    overlay(): ResourceLocation;
    pathType(): PathType;
    rarity(): Rarity;
    screenOverlay(): ResourceLocation;
    slopeFindDistance(): number;
    sounds(): FluidSounds;
    still(): ResourceLocation;
    supportsBoating(): boolean;
    temperature(): number;
    tickDelay(): number;
    tintColor(): number;
    viscosity(): number;
  }


  interface InternalFluidData extends FluidData {}
  class InternalFluidData extends FluidData {
    constructor(id: ResourceLocation, properties: FluidProperties, data: Supplier<any>);

    constructor(id: ResourceLocation, properties: FluidProperties);
    block(): Supplier<LiquidBlock>;
    bucket(): Supplier<Item>;
    data<T>(): T;
    flowing(): Supplier<FlowingFluid>;
    id(): ResourceLocation;
    properties(): FluidProperties;
    setBlock(block: Supplier<LiquidBlock>): void;
    setBucket(bucket: Supplier<Item>): void;
    setFlowing(flowing: Supplier<FlowingFluid>): void;
    setStill(still: Supplier<FlowingFluid>): void;
    still(): Supplier<FlowingFluid>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid.data.FluidProperties' {
  import { PathType } from 'net.minecraft.world.level.pathfinder';
  import { Rarity } from 'net.minecraft.world.item';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FluidProperties } from 'com.teamresourceful.resourcefullib.common.fluid.data';

  class Builder {
    adjacentPathType(adjacentPathType: PathType): Builder;
    build(): FluidProperties;
    canConvertToSource(canConvertToSource: boolean): Builder;
    canDrown(canDrown: boolean): Builder;
    canExtinguish(canExtinguish: boolean): Builder;
    canHydrate(canHydrate: boolean): Builder;
    canPushEntity(canPushEntity: boolean): Builder;
    canSwim(canSwim: boolean): Builder;
    density(density: number): Builder;
    disablePlacing(): Builder;
    dropOff(dropOff: number): Builder;
    explosionResistance(explosionResistance: number): Builder;
    fallDistanceModifier(fallDistanceModifier: number): Builder;
    flowing(flowing: ResourceLocation): Builder;
    lightLevel(lightLevel: number): Builder;
    motionScale(motionScale: number): Builder;
    overlay(overlay: ResourceLocation): Builder;
    pathType(pathType: PathType): Builder;
    rarity(rarity: Rarity): Builder;
    screenOverlay(screenOverlay: ResourceLocation): Builder;
    slopeFindDistance(slopeFindDistance: number): Builder;
    sounds(sound: string, soundEvent: SoundEvent): Builder;
    still(still: ResourceLocation): Builder;
    supportsBoating(supportsBoating: boolean): Builder;
    temperature(temperature: number): Builder;
    tickRate(tickRate: number): Builder;
    tintColor(tintColor: number): Builder;
    viscosity(viscosity: number): Builder;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid.neoforge' {
  import { FluidType, FluidStack } from 'net.neoforged.neoforge.fluids';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { FluidProperties } from 'com.teamresourceful.resourcefullib.common.fluid.data';
  import { Consumer } from 'java.util.function';
  import { IClientFluidTypeExtensions } from 'net.neoforged.neoforge.client.extensions.common';
  import { FluidState } from 'net.minecraft.world.level.material';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Minecraft, Camera } from 'net.minecraft.client';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Vector3f } from 'org.joml';
  import { ClientLevel } from 'net.minecraft.client.multiplayer';
  import { FogMode } from 'FogRenderer';
  import { FogShape } from 'com.mojang.blaze3d.shaders';

  interface ResourcefulFluidType extends FluidType {}
  class ResourcefulFluidType extends FluidType {
    constructor(id: ResourceLocation, props: FluidProperties);
    get flowingTexture(): ResourceLocation;
    get overlayTexture(): ResourceLocation;
    get stillTexture(): ResourceLocation;
    get tintColor(): number;
    getFlowingTexture(stack: FluidStack): ResourceLocation;
    getFlowingTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getOverlayTexture(stack: FluidStack): ResourceLocation;
    getOverlayTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getStillTexture(stack: FluidStack): ResourceLocation;
    getStillTexture(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): ResourceLocation;
    getTintColor(stack: FluidStack): number;
    getTintColor(state: FluidState, getter: BlockAndTintGetter, pos: BlockPos): number;
    initializeClient(consumer: Consumer<IClientFluidTypeExtensions>): void;
    modifyFogColor(camera: Camera, partialTick: number, level: ClientLevel, renderDistance: number, darkenWorldAmount: number, fluidFogColor: Vector3f): Vector3f;
    modifyFogRender(camera: Camera, mode: FogMode, renderDistance: number, partialTick: number, nearDistance: number, farDistance: number, shape: FogShape): void;
    renderFluid(fluidState: FluidState, getter: BlockAndTintGetter, pos: BlockPos, vertexConsumer: VertexConsumer, blockState: BlockState): boolean;
    renderOverlay(mc: Minecraft, poseStack: PoseStack): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid.registry' {
  import { ResourcefulRegistry, RegistryEntry, HolderRegistryEntry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { FluidData, FluidProperties } from 'com.teamresourceful.resourcefullib.common.fluid.data';
  import { Supplier } from 'java.util.function';
  import { Builder } from 'com.teamresourceful.resourcefullib.common.fluid.data.FluidProperties';

  interface ResourcefulFluidRegistry extends ResourcefulRegistry<FluidData> {}
  class ResourcefulFluidRegistry extends ResourcefulRegistry<FluidData> {
    register<I extends FluidData>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
    register(var1: string, var2: FluidProperties): RegistryEntry<FluidData>;
    register(id: string, builder: Builder): RegistryEntry<FluidData>;
    register<I extends T>(var1: string, var2: Supplier<I>): RegistryEntry<I>;
    registerHolder(id: string, supplier: Supplier<FluidData>): HolderRegistryEntry<FluidData>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid' {
  import { BucketItem, ItemStack, Item } from 'net.minecraft.world.item';
  import { FluidData } from 'com.teamresourceful.resourcefullib.common.fluid.data';
  import { Properties } from 'Item';
  import { InteractionResultHolder, InteractionHand } from 'net.minecraft.world';
  import { Level, LevelReader } from 'net.minecraft.world.level';
  import { Player } from 'net.minecraft.world.entity.player';
  import { FlowingFluid, Fluid } from 'net.minecraft.world.level.material';
  import { Optional } from 'java.util';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { LiquidBlock } from 'net.minecraft.world.level.block';
  import { Properties as blockbehaviour_Properties } from 'BlockBehaviour';

  interface ResourcefulBucketItem extends BucketItem {}
  class ResourcefulBucketItem extends BucketItem {
    constructor(data: FluidData, properties: Properties);
    use(level: Level, player: Player, hand: InteractionHand): InteractionResultHolder<ItemStack>;
  }


  interface ResourcefulFlowingFluid extends FlowingFluid {}
  class ResourcefulFlowingFluid extends FlowingFluid {
    constructor(data: FluidData);
    get bucket(): Item;
    get data(): FluidData;
    get flowing(): Fluid;
    get pickupSound(): Optional<SoundEvent>;
    get source(): Fluid;
    getTickDelay(levelReader: LevelReader): number;
    isSame(fluid: Fluid): boolean;
  }


  interface ResourcefulLiquidBlock extends LiquidBlock {}
  class ResourcefulLiquidBlock extends LiquidBlock {
    constructor(data: FluidData, properties: blockbehaviour_Properties);
  }

}

declare module 'com.teamresourceful.resourcefullib.common.fluid.ResourcefulFlowingFluid' {
  import { ResourcefulFlowingFluid } from 'com.teamresourceful.resourcefullib.common.fluid';
  import { FluidData } from 'com.teamresourceful.resourcefullib.common.fluid.data';
  import { FluidState } from 'net.minecraft.world.level.material';

  interface Still extends ResourcefulFlowingFluid {}
  class Still extends ResourcefulFlowingFluid {
    constructor(data: FluidData);
    getAmount(state: FluidState): number;
    isSource(state: FluidState): boolean;
  }


  interface Flowing extends ResourcefulFlowingFluid {}
  class Flowing extends ResourcefulFlowingFluid {
    constructor(data: FluidData);
    getAmount(state: FluidState): number;
    isSource(state: FluidState): boolean;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.inventory' {
  import { ContainerData } from 'net.minecraft.world.inventory';

  interface IntContainerData extends ContainerData {}
  class IntContainerData extends ContainerData {
    constructor(size: number);
    get(index: number): number;
    get count(): number;
    get size(): number;
    getInt(index: number): number;
    set(index: number, value: number): void;
    setInt(index: number, value: number): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.item' {
  import { Supplier, Function } from 'java.util.function';
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Optional } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Codec } from 'com.mojang.serialization';
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { DataComponentType } from 'net.minecraft.core.component';

  interface LazyHolder<T = any> extends Supplier<T> {}
  class LazyHolder<T = any> extends Supplier<T> {
    constructor(registry: Registry<T>, id: ResourceLocation);
    get (): T;
    get id(): ResourceLocation;
    get registry(): Registry<T>;
    static map<T>(registry: Registry<T>): Function<ResourceLocation, LazyHolder<T>>;
    static of<R>(registry: Registry<R>, id: ResourceLocation): LazyHolder<R>;
    static of<R>(registry: Registry<R>, value: R): LazyHolder<R>;
  }


  class OptionalItemStack {
    static empty(): Optional<ItemStack>;
    static of(stack: ItemStack): Optional<ItemStack>;
    static ofNullable(stack: ItemStack): Optional<ItemStack>;
  }


  class ResourcefulComponentType<T = any> {
    build(): DataComponentType<T>;
    cacheEncoding(): ResourcefulComponentType<T>;
    networkSynchronized(codec: ByteCodec<T>): ResourcefulComponentType<T>;
    persistent(codec: Codec<T>): ResourcefulComponentType<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.item.tabs' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Supplier } from 'java.util.function';
  import { List } from 'java.util';
  import { ItemLike } from 'net.minecraft.world.level';
  import { ItemStack, CreativeModeTab } from 'net.minecraft.world.item';
  import { ResourcefulRegistry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { Stream } from 'java.util.stream';

  class ResourcefulCreativeModeTab {
    readonly id: ResourceLocation;
    icon: Supplier;
    hideScrollBar: boolean;
    hideTitle: boolean;
    readonly contents: List;
    constructor(id: ResourceLocation);
    addContent(content: Supplier<Stream<ItemStack>>): ResourcefulCreativeModeTab;
    addRegistry<I extends ItemLike, T extends ResourcefulRegistry<I>>(registry: T): ResourcefulCreativeModeTab;
    addStack(stack: Supplier<ItemStack>): ResourcefulCreativeModeTab;
    addStack(stack: ItemStack): ResourcefulCreativeModeTab;
    addStack(item: ItemLike): ResourcefulCreativeModeTab;
    build(): CreativeModeTab;
    hideScrollBar(): ResourcefulCreativeModeTab;
    hideTitle(): ResourcefulCreativeModeTab;
    setItemIcon(icon: Supplier<ItemLike>): ResourcefulCreativeModeTab;
    setStackIcon(icon: Supplier<ItemStack>): ResourcefulCreativeModeTab;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.lib' {
  import { Logger } from 'org.slf4j';
  import { Gson } from 'com.google.gson';

  class Constants {
    static readonly LOGGER: Logger;
    static readonly GSON: Gson;
    static readonly PRETTY_GSON: Gson;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.menu' {
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { FriendlyByteBuf } from 'net.minecraft.network';
  import { MenuProvider } from 'net.minecraft.world';
  import { ServerPlayer } from 'net.minecraft.server.level';

  interface CodecMenuContentSerializer<T extends MenuContent<T> = any> extends MenuContentSerializer<T> {}
  class CodecMenuContentSerializer<T extends MenuContent<T> = any> extends MenuContentSerializer<T> {
    codec(): ByteCodec<T>;
    from(buffer: FriendlyByteBuf): T;
    to(buffer: FriendlyByteBuf, content: T): void;
  }


  interface ContentMenuProvider<C extends MenuContent<C> = any> extends MenuProvider {}
  class ContentMenuProvider<C extends MenuContent<C> = any> extends MenuProvider {
    createContent(var1: ServerPlayer): C;
    openMenu(player: ServerPlayer): void;
    resetMouseOnOpen(): boolean;
  }


  class MenuContent<T extends MenuContent<T> = any> {
    serializer(): MenuContentSerializer<T>;
  }


  class MenuContentSerializer<T extends MenuContent<T> = any> {
    from(var1: FriendlyByteBuf): T;
    to(var1: FriendlyByteBuf, var2: T): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt' {
  import { Tag, CompoundTag, ByteTag, ShortTag, IntTag, LongTag, FloatTag, DoubleTag, StringTag, ListTag } from 'net.minecraft.nbt';
  import { Function, BiConsumer, Supplier, BiFunction } from 'java.util.function';
  import { Byte, Short, Integer, Long, Float, Double, Class } from 'java.lang';
  import { List, Map, Collection } from 'java.util';

  class NbtReader<I = any, T extends Tag = any> {
    castRead(instance: I, tag: Tag): void;
    read(var1: I, var2: T): void;
    setDefault(var1: I): void;
    type(): number;
    write(var1: I): T;
  }


  interface ObjectTagReader<I = any> extends NbtReader<I, CompoundTag> {}
  class ObjectTagReader<I = any> extends NbtReader<I, CompoundTag> {
    constructor(defaultReaders: boolean);
    addReader(key: string, reader: NbtReader<I, Tag>): void;
    read(instance: I, tag: CompoundTag): void;
    setDefault(instance: I): void;
    type(): number;
    write(instance: I): CompoundTag;
    write(instance: I, tag: CompoundTag): void;
  }


  class ObjectTagReaders {
    static create<I>(defaultReaders: boolean): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key: string, reader: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>, key6: string, reader6: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>, key6: string, reader6: NbtReader<I, Tag>, key7: string, reader7: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>, key6: string, reader6: NbtReader<I, Tag>, key7: string, reader7: NbtReader<I, Tag>, key8: string, reader8: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>, key6: string, reader6: NbtReader<I, Tag>, key7: string, reader7: NbtReader<I, Tag>, key8: string, reader8: NbtReader<I, Tag>, key9: string, reader9: NbtReader<I, Tag>): ObjectTagReader<I>;
    static create<I>(defaultReaders: boolean, key1: string, reader1: NbtReader<I, Tag>, key2: string, reader2: NbtReader<I, Tag>, key3: string, reader3: NbtReader<I, Tag>, key4: string, reader4: NbtReader<I, Tag>, key5: string, reader5: NbtReader<I, Tag>, key6: string, reader6: NbtReader<I, Tag>, key7: string, reader7: NbtReader<I, Tag>, key8: string, reader8: NbtReader<I, Tag>, key9: string, reader9: NbtReader<I, Tag>, key10: string, reader10: NbtReader<I, Tag>): ObjectTagReader<I>;
  }


  interface TagReader<I = any, T extends Tag = any> extends NbtReader<I, T> {}
  class TagReader<I = any, T extends Tag = any> extends NbtReader<I, T> {
    constructor(type: number, writer: Function<I, T>, reader: BiConsumer<I, T>, defaultCreator: Supplier<T>);
    static byteTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>): TagReader<I, ByteTag>;
    static byteTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>, defaultValue: number): TagReader<I, ByteTag>;
    static doubleTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>): TagReader<I, DoubleTag>;
    static doubleTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>, defaultValue: number): TagReader<I, DoubleTag>;
    static floatTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>): TagReader<I, FloatTag>;
    static floatTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>, defaultValue: number): TagReader<I, FloatTag>;
    static intTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>): TagReader<I, IntTag>;
    static intTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>, defaultValue: number): TagReader<I, IntTag>;
    static longTag<I>(writer: Function<I, Long>, reader: BiConsumer<I, Long>): TagReader<I, LongTag>;
    static longTag<I>(writer: Function<I, Long>, reader: BiConsumer<I, Long>, defaultValue: number): TagReader<I, LongTag>;
    read(instance: I, tag: T): void;
    setDefault(instance: I): void;
    static shortTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>): TagReader<I, ShortTag>;
    static shortTag<I>(writer: Function<I, number>, reader: BiConsumer<I, number>, defaultValue: number): TagReader<I, ShortTag>;
    static stringTag<I>(writer: Function<I, string>, reader: BiConsumer<I, string>): TagReader<I, StringTag>;
    static stringTag<I>(writer: Function<I, string>, reader: BiConsumer<I, string>, defaultValue: string): TagReader<I, StringTag>;
    type(): number;
    write(instance: I): T;
  }


  class TagUtils {
    static fromListTag<T extends Tag>(list: ListTag, tagClass: Class<T>): T[];
    static mapTag<K, V>(tag: CompoundTag, keyMapper: Function<string, K>, valueMapper: BiFunction<string, CompoundTag, V>): Map<K, V>;
    static mapToCollection<C extends Collection<T>, T>(collection: Supplier<C>, list: ListTag, mapper: Function<Tag, T>): C;
    static mapToListTag<T>(collection: Collection<T>, mapper: Function<T, Tag>): ListTag;
    static tagWithData(key: string, tag: Tag): CompoundTag;
    static toListTag<T extends Tag>(tags: T[]): ListTag;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators' {
  import { Codec, DataResult, DynamicOps } from 'com.mojang.serialization';
  import { Pair } from 'com.mojang.datafixers.util';
  import { Predicate, Consumer } from 'java.util.function';
  import { Tag } from 'net.minecraft.nbt';
  import { AddCallback } from 'com.teamresourceful.resourcefullib.common.nbt.validators.ValidatorCodec';

  interface FullValidatorCodec extends Codec<Validator> {}
  class FullValidatorCodec extends Codec<Validator> {
    static readonly CODEC: Codec;
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<Validator<any>, T>>;
    encode<T>(input: Validator<any>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
  }


  interface Validator<T extends Tag = any> extends Predicate<T> {}
  class Validator<T extends Tag = any> extends Predicate<T> {
    static readonly CODEC: Codec;
    id(): string;
    testAndValidate(tag: Tag): boolean;
    type(): TagValidationType;
  }


  interface ValidatorCodec<I extends Tag = any> extends Codec<Validator> {}
  class ValidatorCodec<I extends Tag = any> extends Codec<Validator> {
    constructor(defaultCodec: Codec<Validator<I>>, consumer: Consumer<AddCallback<I>>);
    decode<T>(ops: DynamicOps<T>, input: T): DataResult<Pair<Validator<I>, T>>;
    encode<T>(input: Validator<I>, ops: DynamicOps<T>, prefix: T): DataResult<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators.list' {
  import { Validator, TagValidationType } from 'com.teamresourceful.resourcefullib.common.nbt.validators';
  import { CollectionTag } from 'net.minecraft.nbt';
  import { Codec } from 'com.mojang.serialization';

  interface ListValidator extends Validator<CollectionTag> {}
  class ListValidator extends Validator<CollectionTag> {
    static readonly CODEC: Codec;
    type(): TagValidationType;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators.numeric' {
  import { Validator, TagValidationType } from 'com.teamresourceful.resourcefullib.common.nbt.validators';
  import { NumericTag } from 'net.minecraft.nbt';
  import { Codec } from 'com.mojang.serialization';

  interface NumericValidator extends Validator<NumericTag> {}
  class NumericValidator extends Validator<NumericTag> {
    static readonly CODEC: Codec;
    type(): TagValidationType;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators.object' {
  import { Validator, TagValidationType } from 'com.teamresourceful.resourcefullib.common.nbt.validators';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Codec } from 'com.mojang.serialization';

  interface ObjectValidator extends Validator<CompoundTag> {}
  class ObjectValidator extends Validator<CompoundTag> {
    static readonly CODEC: Codec;
    type(): TagValidationType;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators.string' {
  import { Validator, TagValidationType } from 'com.teamresourceful.resourcefullib.common.nbt.validators';
  import { StringTag } from 'net.minecraft.nbt';
  import { Codec } from 'com.mojang.serialization';

  interface StringValidator extends Validator<StringTag> {}
  class StringValidator extends Validator<StringTag> {
    static readonly CODEC: Codec;
    type(): TagValidationType;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.nbt.validators.ValidatorCodec' {
  import { Codec } from 'com.mojang.serialization';
  import { Validator } from 'com.teamresourceful.resourcefullib.common.nbt.validators';

  class AddCallback<T extends Tag = any> {
    add(var1: string, var2: Codec<Validator<T>>): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.network.base' {
  import { Runnable, Class } from 'java.lang';
  import { Function, Consumer, BiConsumer } from 'java.util.function';
  import { Packet } from 'com.teamresourceful.resourcefullib.common.network';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { NetworkPacketPayload } from 'com.teamresourceful.resourcefullib.common.network.internal';
  import { Type } from 'CustomPacketPayload';

  interface ClientboundPacketType<T extends Packet<T> = any> extends PacketType<T> {}
  class ClientboundPacketType<T extends Packet<T> = any> extends PacketType<T> {
    handle(var1: T): Runnable;
  }


  class NetworkHandle {
    static handle<T extends Packet<T>>(handler: Consumer<T>): Function<T, Runnable>;
    static handle<T extends Packet<T>, O>(processor: Function<T, O>, handler: Consumer<O>): Function<T, Runnable>;
    static handle<T extends Packet<T>>(handler: BiConsumer<T, Player>): Function<T, Consumer<Player>>;
    static handle<T extends Packet<T>, O>(processor: Function<T, O>, handler: BiConsumer<O, Player>): Function<T, Consumer<Player>>;
  }


  class Networking {
    canSendToPlayer(var1: ServerPlayer, var2: PacketType<any>): boolean;
    register<T extends Packet<T>>(var1: ClientboundPacketType<T>): void;
    register<T extends Packet<T>>(var1: ServerboundPacketType<T>): void;
    sendToPlayer<T extends Packet<T>>(var1: T, var2: ServerPlayer): void;
    sendToServer<T extends Packet<T>>(var1: T): void;
  }


  class PacketType<T extends Packet<T> = any> {
    codec(type: Type<NetworkPacketPayload<T>>): StreamCodec<RegistryFriendlyByteBuf, NetworkPacketPayload<T>>;
    decode(var1: RegistryFriendlyByteBuf): T;
    encode(var1: T, var2: RegistryFriendlyByteBuf): void;
    id(): ResourceLocation;
    type(): Class<T>;
    type(channel: ResourceLocation): Type<NetworkPacketPayload<T>>;
  }


  interface ServerboundPacketType<T extends Packet<T> = any> extends PacketType<T> {}
  class ServerboundPacketType<T extends Packet<T> = any> extends PacketType<T> {
    handle(var1: T): Consumer<Player>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.network.defaults' {
  import { PacketType } from 'com.teamresourceful.resourcefullib.common.network.base';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { Supplier } from 'java.util.function';

  interface AbstractPacketType<T extends Packet<T> = any> extends PacketType<T> {}
  class AbstractPacketType<T extends Packet<T> = any> extends PacketType<T> {
    constructor(id: ResourceLocation);

    constructor(clazz: Class<T>, id: ResourceLocation);
    id(): ResourceLocation;
  }


  interface CodecPacketType<T extends Packet<T> = any> extends AbstractPacketType<T> {}
  class CodecPacketType<T extends Packet<T> = any> extends AbstractPacketType<T> {
    constructor(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(clazz: Class<T>, id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(id: ResourceLocation, codec: ByteCodec<T>);

    constructor(clazz: Class<T>, id: ResourceLocation, codec: ByteCodec<T>);
    decode(buffer: RegistryFriendlyByteBuf): T;
    encode(message: T, buffer: RegistryFriendlyByteBuf): void;
  }


  interface DatalessPacketType<T extends Packet<T> = any> extends AbstractPacketType<T> {}
  class DatalessPacketType<T extends Packet<T> = any> extends AbstractPacketType<T> {
    constructor(id: ResourceLocation, factory: Supplier<T>);

    constructor(clazz: Class<T>, id: ResourceLocation, factory: Supplier<T>);
    decode(buffer: RegistryFriendlyByteBuf): T;
    encode(message: T, buffer: RegistryFriendlyByteBuf): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.network.defaults.CodecPacketType' {
  import { CodecPacketType } from 'com.teamresourceful.resourcefullib.common.network.defaults';
  import { ServerboundPacketType, ClientboundPacketType } from 'com.teamresourceful.resourcefullib.common.network.base';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { Function, Consumer } from 'java.util.function';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Packet } from 'com.teamresourceful.resourcefullib.common.network';
  import { Runnable } from 'java.lang';

  interface Server<T extends Packet<T> = any> extends ServerboundPacketType<T>, CodecPacketType<T> {}
  class Server<T extends Packet<T> = any> extends ServerboundPacketType<T> {
    constructor(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(id: ResourceLocation, codec: ByteCodec<T>);
    static create<T extends Packet<T>>(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>, handler: Function<T, Consumer<Player>>, message: T): Server<T>;
    static create<T extends Packet<T>>(id: ResourceLocation, codec: ByteCodec<T>, handler: Function<T, Consumer<Player>>, message: T): Server<T>;
  }


  interface Client<T extends Packet<T> = any> extends ClientboundPacketType<T>, CodecPacketType<T> {}
  class Client<T extends Packet<T> = any> extends ClientboundPacketType<T> {
    constructor(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>);

    constructor(id: ResourceLocation, codec: ByteCodec<T>);
    static create<T extends Packet<T>>(id: ResourceLocation, codec: StreamCodec<RegistryFriendlyByteBuf, T>, handler: Function<T, Runnable>, message: T): Client<T>;
    static create<T extends Packet<T>>(id: ResourceLocation, codec: ByteCodec<T>, handler: Function<T, Runnable>, message: T): Client<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.network.neoforge' {
  import { Networking, ClientboundPacketType, ServerboundPacketType, PacketType } from 'com.teamresourceful.resourcefullib.common.network.base';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Packet } from 'com.teamresourceful.resourcefullib.common.network';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';

  interface NeoForgeNetworking extends Networking {}
  class NeoForgeNetworking extends Networking {
    constructor(channel: ResourceLocation, protocolVersion: number, optional: boolean);
    canSendToPlayer(player: ServerPlayer, type: PacketType<any>): boolean;
    onNetworkSetup(event: RegisterPayloadHandlersEvent): void;
    register<T extends Packet<T>>(type: ClientboundPacketType<T>): void;
    register<T extends Packet<T>>(type: ServerboundPacketType<T>): void;
    sendToPlayer<T extends Packet<T>>(message: T, player: ServerPlayer): void;
    sendToServer<T extends Packet<T>>(message: T): void;
    static setupNetwork(event: RegisterPayloadHandlersEvent): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.network' {
  import { PacketType } from 'com.teamresourceful.resourcefullib.common.network.base';

  class Packet<T extends Packet<T> = any> {
    type(): PacketType<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.recipe' {
  import { Recipe, RecipeSerializer, RecipeType } from 'net.minecraft.world.item.crafting';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { MapCodec } from 'com.mojang.serialization';
  import { ByteCodec } from 'com.teamresourceful.bytecodecs.base';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';

  interface CodecRecipe<C extends RecipeInput = any> extends Recipe<C> {}
  class CodecRecipe<C extends RecipeInput = any> extends Recipe<C> {
    assemble(container: C, provider: Provider): ItemStack;
    canCraftInDimensions(pWidth: number, pHeight: number): boolean;
    getResultItem(provider: Provider): ItemStack;
    getSerializer(): RecipeSerializer<any>;
    isSpecial(): boolean;
    serializer(): CodecRecipeSerializer<CodecRecipe<C>>;
  }


  interface CodecRecipeSerializer<R extends Recipe<any> = any> extends RecipeSerializer<R> {}
  class CodecRecipeSerializer<R extends Recipe<any> = any> extends RecipeSerializer<R> {
    constructor(recipeType: RecipeType<R>, jsonCodec: MapCodec<R>, networkCodec: ByteCodec<R>);

    constructor(recipeType: RecipeType<R>, jsonCodec: MapCodec<R>, networkCodec: StreamCodec<RegistryFriendlyByteBuf, R>);
    codec(): MapCodec<R>;
    streamCodec(): StreamCodec<RegistryFriendlyByteBuf, R>;
    type(): RecipeType<R>;
  }


  interface CodecRecipeType<T extends CodecRecipe<any> = any> extends RecipeType<T> {}
  class CodecRecipeType<T extends CodecRecipe<any> = any> extends RecipeType<T> {
    static of<T extends CodecRecipe<any>>(id: string): CodecRecipeType<T>;
    toString(): string;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.recipe.ingredient' {
  import { Predicate } from 'java.util.function';
  import { ItemStack } from 'net.minecraft.world.item';
  import { List } from 'java.util';
  import { Ingredient } from 'net.minecraft.world.item.crafting';

  interface CodecIngredient<T extends CodecIngredient<T> = any> extends Predicate<ItemStack> {}
  class CodecIngredient<T extends CodecIngredient<T> = any> extends Predicate<ItemStack> {
    get stacks(): ItemStack[];
    isComplex(): boolean;
    serializer(): CodecIngredientSerializer<T>;
    test(var1: ItemStack): boolean;
  }


  class IngredientHelper {
    static getIngredient<T extends CodecIngredient<T>>(ingredient: T): Ingredient;
    static registerIngredient<C extends CodecIngredient<C>, T extends CodecIngredientSerializer<C>>(serializer: T): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.registry' {
  import { Class } from 'java.lang';
  import { Supplier } from 'java.util.function';
  import { Holder, Registry } from 'net.minecraft.core';
  import { Entry, ItemLikeEntry } from 'com.teamresourceful.resourcefullib.common.registry.ItemLikeResourcefulRegistry';
  import { Collection, List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Stream } from 'java.util.stream';

  interface EnumResourcefulRegistryChild<E extends Enum<E> = any, T = any> extends ResourcefulRegistryChild<T> {}
  class EnumResourcefulRegistryChild<E extends Enum<E> = any, T = any> extends ResourcefulRegistryChild<T> {
    constructor(enumClass: Class<E>, parent: ResourcefulRegistry<T>);
    getEntries(enumValue: E): RegistryEntries<T>;
    register<I extends T>(enumValue: E, id: string, supplier: Supplier<I>): RegistryEntry<I>;
    register<I extends T>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
  }


  interface HolderRegistryEntry<T = any> extends RegistryEntry<T> {}
  class HolderRegistryEntry<T = any> extends RegistryEntry<T> {
    get (): T;
    holder(): Holder<T>;
  }


  interface ItemLikeResourcefulRegistry<T extends ItemLike = any> extends ResourcefulRegistry<T> {}
  class ItemLikeResourcefulRegistry<T extends ItemLike = any> extends ResourcefulRegistry<T> {
    constructor(registry: Registry<T>, id: string);
    get entries(): Collection<RegistryEntry<T>>;
    get itemLikeEntries(): Collection<ItemLikeEntry<T>>;
    init(): void;
    register<I extends T>(id: string, supplier: Supplier<I>): Entry<I>;
    registerHolder(id: string, supplier: Supplier<T>): HolderRegistryEntry<T>;
  }


  class RegistryEntries<T = any> {
    add<I extends T, E extends RegistryEntry<I>>(entry: E): E;
    get entries(): RegistryEntry<T>[];
  }


  interface RegistryEntry<T = any> extends Supplier<T> {}
  class RegistryEntry<T = any> extends Supplier<T> {
    get (): T;
    get id(): ResourceLocation;
  }


  class ResourcefulRegistry<T = any> {
    boundStream(): Stream<T>;
    get entries(): Collection<RegistryEntry<T>>;
    init(): void;
    register<I extends T>(var1: string, var2: Supplier<I>): RegistryEntry<I>;
    registerHolder(var1: string, var2: Supplier<T>): HolderRegistryEntry<T>;
    stream(): Stream<RegistryEntry<T>>;
  }


  interface ResourcefulRegistryChild<T = any> extends ResourcefulRegistry<T> {}
  class ResourcefulRegistryChild<T = any> extends ResourcefulRegistry<T> {
    constructor(parent: ResourcefulRegistry<T>);
    get entries(): Collection<RegistryEntry<T>>;
    init(): void;
    register<I extends T>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
    registerHolder(id: string, supplier: Supplier<T>): HolderRegistryEntry<T>;
  }


  class ResourcefulRegistryType<D = any, T extends ResourcefulRegistry<D> = any> {
    static readonly FLUID: ResourcefulRegistryType;
    toString(): string;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.registry.ItemLikeResourcefulRegistry' {
  import { RegistryEntry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { ItemLike } from 'net.minecraft.world.level';

  interface ItemLikeEntry<T extends ItemLike = any> extends RegistryEntry<T>, ItemLike {}
  class ItemLikeEntry<T extends ItemLike = any> extends RegistryEntry<T> {
  }

}

declare module 'com.teamresourceful.resourcefullib.common.registry.neoforge' {
  import { HolderRegistryEntry, RegistryEntry, ResourcefulRegistry } from 'com.teamresourceful.resourcefullib.common.registry';
  import { DeferredHolder } from 'net.neoforged.neoforge.registries';
  import { Holder, Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ResourcefulFluidRegistry } from 'com.teamresourceful.resourcefullib.common.fluid.registry';
  import { FluidData, FluidProperties } from 'com.teamresourceful.resourcefullib.common.fluid.data';
  import { Collection } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Builder } from 'com.teamresourceful.resourcefullib.common.fluid.data.FluidProperties';

  interface NeoForgeHolderRegistryEntry<R = any> extends HolderRegistryEntry<R> {}
  class NeoForgeHolderRegistryEntry<R = any> extends HolderRegistryEntry<R> {
    constructor(object: DeferredHolder<R, R>);
    get id(): ResourceLocation;
    holder(): Holder<R>;
  }


  interface NeoForgeRegistryEntry<R = any, T extends R = any> extends RegistryEntry<T> {}
  class NeoForgeRegistryEntry<R = any, T extends R = any> extends RegistryEntry<T> {
    constructor(object: DeferredHolder<R, T>);
    get (): T;
    get id(): ResourceLocation;
  }


  interface NeoForgeResourcefulFluidRegistry extends ResourcefulFluidRegistry {}
  class NeoForgeResourcefulFluidRegistry extends ResourcefulFluidRegistry {
    constructor(id: string);
    get entries(): Collection<RegistryEntry<FluidData>>;
    init(): void;
    register(name: string, properties: FluidProperties): RegistryEntry<FluidData>;
    register<I extends FluidData>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
    register(id: string, builder: Builder): RegistryEntry<FluidData>;
    register<I extends T>(var1: string, var2: Supplier<I>): RegistryEntry<I>;
  }


  interface NeoForgeResourcefulRegistry<T = any> extends ResourcefulRegistry<T> {}
  class NeoForgeResourcefulRegistry<T = any> extends ResourcefulRegistry<T> {
    constructor(registry: Registry<T>, id: string);
    get entries(): Collection<RegistryEntry<T>>;
    init(): void;
    register<I extends T>(id: string, supplier: Supplier<I>): RegistryEntry<I>;
    registerHolder(id: string, supplier: Supplier<T>): HolderRegistryEntry<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.utils' {
  import { Predicate, Supplier, BiConsumer, Function, Consumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { Class, Enum, Runnable, Boolean, Number } from 'java.lang';
  import { Field } from 'java.lang.reflect';
  import { Path } from 'java.nio.file';
  import { Reader, InputStream } from 'java.io';
  import { PackResources, PackType, PackLocationInfo } from 'net.minecraft.server.packs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { IoSupplier } from 'net.minecraft.server.packs.resources';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { ResourceOutput } from 'PackResources';
  import { Set, Optional, List } from 'java.util';
  import { MetadataSectionSerializer } from 'net.minecraft.server.packs.metadata';
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Level } from 'net.minecraft.world.level';
  import { HandlerType } from 'com.teamresourceful.resourcefullib.common.utils.SaveHandler';
  import { DimensionDataStorage } from 'net.minecraft.world.level.storage';
  import { ScheduledFuture, TimeUnit } from 'java.util.concurrent';
  import { Unsafe } from 'sun.misc';
  import { HttpResponse } from 'java.net.http';
  import { BodyHandler } from 'HttpResponse';

  class CommonUtils {
    static generate<T>(validator: Predicate<T>, getter: Supplier<T>): T;
    static serverTranslatable(key: string, ...args: any[]): Component;
  }


  class EnumBuilder<T extends Enum<T> = any> {
    constructor(enumClass: Class<T>, id: string);
    static addArrayValue<T>(data: Field, object: Class<T>, arrayEntry: T): void;
    build(): T;
    static of<T extends Enum<T>>(enumClass: Class<T>, id: string): EnumBuilder<T>;
    withArg(type: Class<any>, arg: any): EnumBuilder<T>;
  }


  class FileUtils {
    static copyDefaultFiles(dataPath: string, targetPath: Path, modRoot: Path, filter: Predicate<Path>): void;
    static isJson(f: Path): boolean;
    static setupDevResources(devPath: string, parser: BiConsumer<Reader, string>, modRoot: Path, filter: Predicate<Path>): void;
    static streamFilesAndParse(source: Path, parser: BiConsumer<Reader, string>, filter: Predicate<Path>): void;
  }


  interface GenericMemoryPack extends PackResources {}
  class GenericMemoryPack extends PackResources {
    close(): void;
    getMetadataSection<T>(serializer: MetadataSectionSerializer<T>): T;
    getNamespaces(type: PackType): Set<string>;
    getResource(type: PackType, location: ResourceLocation): IoSupplier<InputStream>;
    getRootResource(...files: string[]): IoSupplier<InputStream>;
    listResources(type: PackType, namespace: string, path: string, output: ResourceOutput): void;
    location(): PackLocationInfo;
    packId(): string;
    putData(type: PackType, location: ResourceLocation, supplier: IoSupplier<InputStream>): void;
    putJson(type: PackType, location: ResourceLocation, json: JsonElement): void;
  }


  class GsonHelpers {
    static parseJson(json: string): Optional<JsonObject>;
  }


  interface SaveHandler extends SavedData {}
  class SaveHandler extends SavedData {
    static handle<T extends SaveHandler>(level: Level, getter: Function<Level, T>, operation: Consumer<T>): void;
    loadData(var1: CompoundTag): void;
    static read<T extends SaveHandler>(level: Level, type: HandlerType<T>, id: string): T;
    static read<T extends SaveHandler>(storage: DimensionDataStorage, factory: HandlerType<T>, id: string): T;
    save(tag: CompoundTag, provider: Provider): CompoundTag;
    saveData(var1: CompoundTag): void;
  }


  class Scheduling {
    static schedule(runnable: Runnable, delay: number, timeUnit: TimeUnit): ScheduledFuture<any>;
    static schedule(runnable: Runnable, delay: number, peroid: number, timeUnit: TimeUnit): ScheduledFuture<any>;
  }


  interface TriState extends Enum<TriState> {}
  class TriState extends Enum<TriState> {
    static readonly TRUE: TriState;
    static readonly FALSE: TriState;
    static readonly UNDEFINED: TriState;
    isDefined(): boolean;
    isFalse(): boolean;
    isTrue(): boolean;
    isUndefined(): boolean;
    map(value: boolean): boolean;
    static map(state: TriState, value: TriState): TriState;
    static of(value: boolean): TriState;
    static of(value: boolean): TriState;
    static of(number: Number, i: T): TriState;
    static valueOf(name: string): TriState;
    static values(): TriState[];
  }


  class UnsafeUtils {
    static getField(clazz: Class<any>, predicate: Predicate<Field>): Field;
    static getStaticField(clazz: Class<any>, fieldName: string): any;
    static getStaticField(clazz: Class<any>, field: Field): any;
    static hasField(instance: any, fieldName: string): boolean;
    static setField(instance: any, fieldName: string, value: any): void;
    static setField(instance: any, field: Field, value: any): void;
    static setStaticField(clazz: Class<any>, fieldName: string, value: any): void;
    static unsafe(): Unsafe;
  }


  class WebUtils {
    static get(url: string, onlySuccess: boolean): string;
    static get(url: string): string;
    static get<T>(url: string, handler: BodyHandler<T>): Optional<HttpResponse<T>>;
    static getJson(url: string, onlySuccess: boolean): JsonObject;
    static getJson(url: string): JsonObject;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.utils.files' {
  import { SavedData } from 'net.minecraft.world.level.saveddata';
  import { Supplier } from 'java.util.function';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { Factory } from 'com.teamresourceful.resourcefullib.common.utils.files.CodecSavedData';
  import { Codec } from 'com.mojang.serialization';
  import { Path } from 'java.nio.file';

  interface CodecSavedData<T = any> extends Supplier<T>, SavedData {}
  class CodecSavedData<T = any> extends Supplier<T> {
    static create<T>(codec: Codec<T>, path: string): Factory<T>;
    get (): T;
    isDirty(): boolean;
    save(tag: CompoundTag, provider: Provider): CompoundTag;
    set (data: T);
  }


  class GlobalStorage {
    static getCacheDirectory(modid: string): Path;
    static getDataDirectory(modid: string): Path;
    static init(): void;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.utils.files.CodecSavedData' {
  import { Supplier } from 'java.util.function';
  import { CodecSavedData } from 'com.teamresourceful.resourcefullib.common.utils.files';
  import { ServerLevel } from 'net.minecraft.server.level';

  class Factory<T = any> {
    alwaysDirty(): Factory<T>;
    clean(): Factory<T>;
    create(level: ServerLevel): CodecSavedData<T>;
    defaultValue(defaultValue: Supplier<T>): Factory<T>;
    global(): Factory<T>;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.utils.modinfo' {
  import { List } from 'java.util';
  import { Path } from 'java.nio.file';

  class ModInfo {
    displayName(): string;
    get paths(): Path[];
    id(): string;
    version(): string;
  }


  class ModInfoUtils {
    static get loadedMods(): number;
    static getModInfo(id: string): ModInfo;
    static isMixinModLoaded(id: string): boolean;
    static isModLoaded(id: string): boolean;
  }

}

declare module 'com.teamresourceful.resourcefullib.common.utils.neoforge' {
  import { GenericMemoryPack } from 'com.teamresourceful.resourcefullib.common.utils';

  interface HiddenGenericMemoryPack extends GenericMemoryPack {}
  class HiddenGenericMemoryPack extends GenericMemoryPack {
    isHidden(): boolean;
  }

}

declare module 'com.teamresourceful.resourcefullib.mixins.neoforge' {
  import { Fluid } from 'net.minecraft.world.level.material';
  import { FluidType } from 'net.neoforged.neoforge.fluids';

  interface ResourcefulFlowingFluidMixin extends Fluid {}
  class ResourcefulFlowingFluidMixin extends Fluid {
    get fluidType(): FluidType;
  }

}

declare module 'com.teamresourceful.resourcefullib.neoforge' {
  import { ApiProxy } from 'com.teamresourceful.resourcefullib.common';
  import { RegistryAccess } from 'net.minecraft.core';
  import { AddPackFindersEvent } from 'net.neoforged.neoforge.event';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { RegisterClientReloadListenersEvent, RegisterClientCommandsEvent } from 'net.neoforged.neoforge.client.event';
  import { Block } from 'RenderHighlightEvent';

  interface NeoForgeClientApiProxy extends ApiProxy {}
  class NeoForgeClientApiProxy extends ApiProxy {
    static readonly INSTANCE: NeoForgeClientApiProxy;
    get registryAccess(): RegistryAccess;
  }


  class NeoForgeResourcePackHandler {
    static load(): void;
    static onRegisterPackFinders(event: AddPackFindersEvent): void;
  }


  interface NeoForgeServerApiProxy extends ApiProxy {}
  class NeoForgeServerApiProxy extends ApiProxy {
    static readonly INSTANCE: NeoForgeServerApiProxy;
    get registryAccess(): RegistryAccess;
  }


  class ResourcefulLibNeoForge {
    constructor(bus: IEventBus);
    static onNetworkSetup(event: RegisterPayloadHandlersEvent): void;
  }


  class ResourcefulLibNeoForgeClient {
    static init(modEventBus: IEventBus): void;
    static onClientCommandRegister(event: RegisterClientCommandsEvent): void;
    static onClientReloadListeners(event: RegisterClientReloadListenersEvent): void;
    static onHighlight(event: Block): void;
  }

}

declare module 'com.teamresourceful.resourcefullib' {
  class ResourcefulLib {
    static readonly MOD_ID: string;
    static init(): void;
  }

}