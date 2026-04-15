declare module 'team.creative.creativecore.client' {
  import { CommandDispatcher } from 'com.mojang.brigadier';
  import { LocatedHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { CreativeBlockModel, CreativeItemModel } from 'team.creative.creativecore.client.render.model';
  import { ItemColors } from 'net.minecraft.client.color.item';
  import { Item } from 'net.minecraft.world.item';
  import { RegisterClientCommandsEvent, RegisterMenuScreensEvent } from 'net.neoforged.neoforge.client.event';
  import { FMLClientSetupEvent } from 'net.neoforged.fml.event.lifecycle';
  import { RegisterGeometryLoaders } from 'ModelEvent';
  import { ContainerScreenIntegration, ContainerIntegration } from 'team.creative.creativecore.common.gui.integration';
  import { Inventory } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Pre } from 'ClientTickEvent';

  class ClientLoader {
    onInitializeClient(): void;
    registerClientCommands<T>(dispatcher: CommandDispatcher<T>): void;
  }


  class CreativeCoreClient {
    static readonly BLOCK_MODEL_TYPES: LocatedHandlerRegistry;
    static readonly ITEM_MODEL_TYPES: LocatedHandlerRegistry;
    static clientTick(event: Pre): void;
    static commands(event: RegisterClientCommandsEvent): void;
    create(container: ContainerIntegration, inventory: Inventory, p_create_3_: Component): ContainerScreenIntegration;
    static get frameTime(): number;
    static init(event: FMLClientSetupEvent): void;
    static load(bus: IEventBus): void;
    static modelEvent(event: RegisterGeometryLoaders): void;
    static registerBlockModel(location: ResourceLocation, renderer: CreativeBlockModel): void;
    static registerClientConfig(modid: string): void;
    static registerItemColor(colors: ItemColors, item: Item): void;
    static registerItemModel(location: ResourceLocation, renderer: CreativeItemModel): void;
    static screenEvent(event: RegisterMenuScreensEvent): void;
  }

}

declare module 'team.creative.creativecore.client.render.box' {
  import { Facing } from 'team.creative.creativecore.common.util.math.base';
  import { VertexFormat, PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BlockPos } from 'net.minecraft.core';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { AlignedBox } from 'team.creative.creativecore.common.util.math.box';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Block } from 'net.minecraft.world.level.block';
  import { List } from 'java.util';
  import { RenderBoxFace } from 'team.creative.creativecore.client.render.face';
  import { Vec3d } from 'team.creative.creativecore.common.util.math.vec';
  import { LevelAccessor } from 'net.minecraft.world.level';
  import { BakedModel } from 'net.minecraft.client.resources.model';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { RandomSource } from 'net.minecraft.util';

  class QuadGeneratorContext {
    box: RenderBox;
    facing: Facing;
    color: number;
    format: VertexFormat;
    uvOffset: number;
    offset: BlockPos;
    shouldOverrideColor: boolean;
    quad: BakedQuad;
    scaleAndOffset: boolean;
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    sizeX: number;
    sizeY: number;
    sizeZ: number;
    uvInverted: boolean;
    sizeU: number;
    sizeV: number;
    clear(): void;
    hasBounds(): boolean;
    set(format: VertexFormat, box: RenderBox, facing: Facing, color: number): void;
    setBounds(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
    setQuad(quad: BakedQuad, overrideTint: boolean, defaultColor: number): void;
  }


  interface RenderBox extends AlignedBox {}
  class RenderBox extends AlignedBox {
    state: BlockState;
    color: number;
    keepVU: boolean;
    allowOverlap: boolean;
    doesNeedQuadUpdate: boolean;
    emissive: boolean;
    customData: any;
    constructor(cube: AlignedBox);

    constructor(cube: AlignedBox, box: RenderBox);

    constructor(cube: AlignedBox, state: BlockState);

    constructor(cube: AlignedBox, block: Block);

    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, state: BlockState);

    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, block: Block);
    countQuads(): number;
    deleteQuadCache(): void;
    get previewOffX(): number;
    get previewOffY(): number;
    get previewOffZ(): number;
    get previewScaleX(): number;
    get previewScaleY(): number;
    get previewScaleZ(): number;
    getBakedQuad(holder: QuadGeneratorContext, level: LevelAccessor, pos: BlockPos, offset: BlockPos, state: BlockState, blockModel: BakedModel, modelData: ModelData, facing: Facing, layer: RenderType, rand: RandomSource, overrideTint: boolean, defaultColor: number): BakedQuad[];
    getFace(facing: Facing): RenderBoxFace;
    getQuad(facing: Facing): any;
    intersectsWithFace(facing: Facing, holder: QuadGeneratorContext, offset: BlockPos): boolean;
    isTranslucent(): boolean;
    renderLines(pose: PoseStack, consumer: VertexConsumer, alpha: number): void;
    renderLines(pose: PoseStack, consumer: VertexConsumer, alpha: number, center: Vec3d, grow: number): void;
    renderPreview(pose: PoseStack, consumer: VertexConsumer, alpha: number): void;
    setColor(color: number): RenderBox;
    setFace(facing: Facing, face: RenderBoxFace): void;
    setKeepUV(keep: boolean): RenderBox;
    setQuad(facing: Facing, quads: BakedQuad[]): void;
    shouldRenderFace(facing: Facing): boolean;
  }

}

declare module 'team.creative.creativecore.client.render' {
  import { Font, GuiGraphics } from 'net.minecraft.client.gui';
  import { ItemStack } from 'net.minecraft.world.item';

  class CreativePlatformHooks {
    static backupRenderState(): void;
    static restoreRenderState(): void;
  }


  class GuiRenderHelper {
    static colorRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, color: number): void;
    static colorRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, color: number): void;
    static drawItemStack(graphics: GuiGraphics, stack: ItemStack, alpha: number): void;
    static drawStringCentered(graphics: GuiGraphics, text: string, width: number, height: number, color: number, shadow: boolean): void;
    static get font(): Font;
    static horizontalGradientMaskRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, color: number, mask: number): void;
    static horizontalGradientMaskRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, color: number, mask: number): void;
    static horizontalGradientRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, colorFrom: number, colorTo: number): void;
    static horizontalGradientRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, colorFrom: number, colorTo: number): void;
    static textureRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, u: number, v: number): void;
    static textureRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, u: number, v: number): void;
    static textureRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, u: number, v: number, u2: number, v2: number): void;
    static textureRect(graphics: GuiGraphics, x: number, y: number, width: number, height: number, u: number, v: number, u2: number, v2: number): void;
    static verticalGradientRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, colorFrom: number, colorTo: number): void;
    static verticalGradientRect(graphics: GuiGraphics, x: number, y: number, x2: number, y2: number, colorFrom: number, colorTo: number): void;
  }


  class VertexFormatUtils {
    static blockFormatIntSize(): number;
    static blockFormatSize(): number;
    static blockPositionOffset(): number;
    static blockUvOffset(): number;
    static update(): void;
  }

}

declare module 'team.creative.creativecore.client.render.face' {
  import { List } from 'java.util';
  import { VectorFan } from 'team.creative.creativecore.common.util.math.geo';

  class RenderBoxFace {
    static readonly RENDER: RenderBoxFace;
    static readonly NOT_RENDER: RenderBoxFace;
    get cachedFans(): VectorFan[];
    get scale(): number;
    hasCachedFans(): boolean;
    shouldRender(): boolean;
  }


  interface RenderBoxFaceSpecial extends RenderBoxFace {}
  class RenderBoxFaceSpecial extends RenderBoxFace {
    constructor(fans: VectorFan[], scale: number);
    get cachedFans(): VectorFan[];
    get scale(): number;
    hasCachedFans(): boolean;
    shouldRender(): boolean;
  }

}

declare module 'team.creative.creativecore.client.render.model' {
  import { Minecraft } from 'net.minecraft.client';
  import { ItemOverrides, BakedQuad, ItemTransforms } from 'net.minecraft.client.renderer.block.model';
  import { ModelResourceLocation, BakedModel } from 'net.minecraft.client.resources.model';
  import { List } from 'java.util';
  import { RenderBox } from 'team.creative.creativecore.client.render.box';
  import { Facing } from 'team.creative.creativecore.common.util.math.base';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { RandomSource } from 'net.minecraft.util';
  import { ItemStack, ItemDisplayContext } from 'net.minecraft.world.item';
  import { ModelData } from 'net.neoforged.neoforge.client.model.data';
  import { BlockAndTintGetter } from 'net.minecraft.world.level';
  import { BlockPos, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { TextureAtlasSprite } from 'net.minecraft.client.renderer.texture';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { IGeometryLoader } from 'net.neoforged.neoforge.client.model.geometry';
  import { JsonObject, JsonDeserializationContext } from 'com.google.gson';

  interface CreativeBakedBoxModel extends CreativeBakedModel {}
  class CreativeBakedBoxModel extends CreativeBakedModel {
    static mc: Minecraft;
    block: CreativeBlockModel;
    customOverride: ItemOverrides;
    constructor(location: ModelResourceLocation, item: CreativeItemBoxModel, block: CreativeBlockModel);
    static compileBoxes(boxes: RenderBox[], side: Facing, layer: RenderType, rand: RandomSource, item: boolean, baked: BakedQuad[]): BakedQuad[];
    getModelData(level: BlockAndTintGetter, pos: BlockPos, state: BlockState, modelData: ModelData): ModelData;
    getQuads(state: BlockState, direction: Direction, rand: RandomSource, extraData: ModelData, layer: RenderType): BakedQuad[];
    getQuads(state: BlockState, direction: Direction, rand: RandomSource): BakedQuad[];
    getRenderPasses(itemStack: ItemStack, fabulous: boolean): BakedModel[];
    translucent(): boolean;
  }


  interface CreativeBakedBoxModelTranslucent extends CreativeBakedBoxModel {}
  class CreativeBakedBoxModelTranslucent extends CreativeBakedBoxModel {
    constructor(location: ModelResourceLocation, item: CreativeItemBoxModel, block: CreativeBlockModel);
    getRenderTypes(itemStack: ItemStack, fabulous: boolean): RenderType[];
    translucent(): boolean;
  }


  interface CreativeBakedModel extends BakedModel {}
  class CreativeBakedModel extends BakedModel {
    readonly location: ModelResourceLocation;
    readonly item: CreativeItemModel;
    customOverride: ItemOverrides;
    constructor(location: ModelResourceLocation, item: CreativeItemModel);
    applyTransform(transformType: ItemDisplayContext, poseStack: PoseStack, applyLeftHandTransform: boolean): BakedModel;
    get (): BakedModel;
    get overrides(): ItemOverrides;
    get particleIcon(): TextureAtlasSprite;
    get transforms(): ItemTransforms;
    getQuads(state: BlockState, side: Direction, rand: RandomSource, data: ModelData, renderType: RenderType): BakedQuad[];
    getQuads(state: BlockState, direction: Direction, source: RandomSource): BakedQuad[];
    isCustomRenderer(): boolean;
    isGui3d(): boolean;
    useAmbientOcclusion(): boolean;
    usesBlockLight(): boolean;
  }


  interface CreativeBakedQuad extends BakedQuad {}
  class CreativeBakedQuad extends BakedQuad {
    readonly cube: RenderBox;
    constructor(vertices: number[], quad: BakedQuad, cube: RenderBox, tintedColor: number, shouldOverrideColor: boolean);

    constructor(vertices: number[], quad: BakedQuad, cube: RenderBox, tintedColor: number, shouldOverrideColor: boolean, facing: Direction);
    updateAlpha(): void;
  }


  class CreativeBlockModel {
    getBoxes(var1: BlockState, var2: ModelData, var3: RandomSource): RenderBox[];
    getModelData(var1: BlockAndTintGetter, var2: BlockPos, var3: BlockState, var4: ModelData): ModelData;
  }


  interface CreativeItemBoxModel extends CreativeItemModel {}
  class CreativeItemBoxModel extends CreativeItemModel {
    static readonly mc: Minecraft;
    static readonly EMPTY: CreativeItemBoxModel;
    constructor(location: ModelResourceLocation);
    create(block: CreativeBlockModel): CreativeBakedModel;
    getBoxes(var1: ItemStack, var2: boolean): RenderBox[];
    getCachedModel(translucent: boolean, stack: ItemStack, threaded: boolean): BakedQuad[];
    hasTranslucentLayer(stack: ItemStack): boolean;
    reload(): void;
    saveCachedModel(translucent: boolean, cachedQuads: BakedQuad[], stack: ItemStack, threaded: boolean): void;
  }


  class CreativeItemModel {
    constructor(location: ModelResourceLocation);
    applyCustomOpenGLHackery(pose: PoseStack, stack: ItemStack, context: ItemDisplayContext): void;
    create(block: CreativeBlockModel): CreativeBakedModel;
  }


  interface CreativeModelLoader extends IGeometryLoader<CreativeUnbakedModel> {}
  class CreativeModelLoader extends IGeometryLoader<CreativeUnbakedModel> {
    read(jsonObject: JsonObject, deserializationContext: JsonDeserializationContext): CreativeUnbakedModel;
  }


  class CreativeQuadLighter {
    setCustomTint(var1: number): void;
    setState(var1: BlockState): void;
  }

}

declare module 'team.creative.creativecore.client.render.text' {
  import { Align, VAlign } from 'team.creative.creativecore.common.gui';
  import { Component, FormattedText, Style } from 'net.minecraft.network.chat';
  import { List, Optional } from 'java.util';
  import { GuiGraphics, Font } from 'net.minecraft.client.gui';
  import { FormattedTextSplit } from 'team.creative.creativecore.client.render.text.CompiledText';
  import { AdvancedContent, FormattedSingleSink } from 'team.creative.creativecore.common.util.text.content';
  import { Iterable, Enum } from 'java.lang';
  import { DecimalFormat } from 'java.text';
  import { StringSplitter } from 'net.minecraft.client';

  class CompiledText {
    static readonly EMPTY: CompiledText;
    constructor(width: number, height: number);
    accept(style: Style, content: AdvancedContent): Optional;
    accept(style: Style, text: string): Optional;
    accept(style: Style, text: string): Optional<FormattedText>;
    contains(search: string): boolean;
    copy(): CompiledText;
    static createAnySize(): CompiledText;
    get defaultColor(): number;
    get maxHeight(): number;
    get maxWidth(): number;
    get scale(): number;
    get totalHeight(): number;
    get totalWidth(): number;
    get usedHeight(): number;
    get usedWidth(): number;
    render(graphics: GuiGraphics): void;
    sameDimensions(): CompiledText;
    set defaultColor(color: number);
    set maxHeight(height: number);
    set scale(scale: number);
    setAlign(align: Align): void;
    setDimension(width: number, height: number): void;
    setShadow(shadow: boolean): void;
    setText(component: Component): void;
    setText(components: Component[]): void;
    setVAlign(valign: VAlign): void;
    splitByWidth(text: FormattedText, width: number, style: Style, force: boolean): FormattedTextSplit;
    untrimmedContent(): Iterable<Component>;
  }


  class DebugTextRenderer {
    static readonly DECIMAL_FORMAT: DecimalFormat;
    constructor();
    detail(name: string, value: any): DebugTextRenderer;
    newLine(): DebugTextRenderer;
    render(font: Font, graphics: GuiGraphics): void;
    text(text: string): DebugTextRenderer;
  }


  interface Linebreaker extends Enum<Linebreaker> {}
  class Linebreaker extends Enum<Linebreaker> {
    static readonly WHITESPACE: Linebreaker;
    static readonly DOT: Linebreaker;
    static readonly SLASH: Linebreaker;
    static readonly BACKSLASH: Linebreaker;
    static readonly DASH: Linebreaker;
    static readonly UPPERCASE: Linebreaker;
    static valueOf(name: string): Linebreaker;
    static values(): Linebreaker[];
  }


  interface WidthLimitedCharSink extends FormattedSingleSink {}
  class WidthLimitedCharSink extends FormattedSingleSink {
    constructor(maxWidth: number, splitter: StringSplitter);
    accept(pos: number, style: Style, character: number): boolean;
    accept(style: Style, content: AdvancedContent): boolean;
    get position(): number;
    lastBreaker(): Linebreaker;
    lastBreakerPos(): number;
    resetPosition(): void;
  }

}

declare module 'team.creative.creativecore.client.render.text.CompiledText' {
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedText } from 'net.minecraft.network.chat';

  class CompiledLine {
    add(component: FormattedText): FormattedText;
    contains(search: string): boolean;
    render(graphics: GuiGraphics): void;
    updateDimension(width: number, height: number): void;
  }

}

declare module 'team.creative.creativecore.client.sound' {
  import { AbstractTickableSoundInstance, SoundInstance, Sound } from 'net.minecraft.client.resources.sounds';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { Entity } from 'net.minecraft.world.entity';
  import { CompletableFuture } from 'java.util.concurrent';
  import { AudioStream, SoundBufferLibrary } from 'net.minecraft.client.sounds';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface EntitySound extends AbstractTickableSoundInstance {}
  class EntitySound extends AbstractTickableSoundInstance {
    constructor(event: SoundEvent, entity: Entity, volume: number, pitch: number, category: SoundSource);
    tick(): void;
  }


  interface SpecialSoundInstance extends SoundInstance {}
  class SpecialSoundInstance extends SoundInstance {
    getAudioStream(var1: SoundBufferLibrary, var2: ResourceLocation, var3: boolean): CompletableFuture<AudioStream>;
    getStream(soundBuffers: SoundBufferLibrary, sound: Sound, looping: boolean): CompletableFuture<AudioStream>;
  }

}

declare module 'team.creative.creativecore.common.be' {
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Packet } from 'net.minecraft.network.protocol';
  import { ClientGamePacketListener, ClientboundBlockEntityDataPacket } from 'net.minecraft.network.protocol.game';
  import { Connection } from 'net.minecraft.network';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface BlockEntityCreative extends BlockEntity {}
  class BlockEntityCreative extends BlockEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    get updatePacket(): Packet<ClientGamePacketListener>;
    getUpdateTag(provider: Provider): CompoundTag;
    handleUpdate(var1: CompoundTag, var2: boolean): void;
    handleUpdateTag(tag: CompoundTag, lookupProvider: Provider): void;
    isClient(): boolean;
    markDirty(): void;
    onDataPacket(net: Connection, pkt: ClientboundBlockEntityDataPacket, lookupProvider: Provider): void;
  }

}

declare module 'team.creative.creativecore.common' {
  class CommonLoader {
    onInitialize(): void;
  }

}

declare module 'team.creative.creativecore.common.config.api' {
  import { Side } from 'team.creative.creativecore';

  class DecimalRangeSupplier {
    get max(): number;
    get min(): number;
  }


  interface IConfigObject extends ICreativeConfig {}
  class IConfigObject extends ICreativeConfig {
    isDefault(var1: Side): boolean;
    restoreDefault(var1: Side, var2: boolean): void;
  }


  class ICreativeConfig {
    configured(var1: Side): void;
  }


  class IntRangeSupplier {
    get max(): number;
    get min(): number;
  }

}

declare module 'team.creative.creativecore.common.config.converation' {
  import { Provider } from 'HolderLookup';
  import { JsonElement } from 'com.google.gson';
  import { Side } from 'team.creative.creativecore';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { IGuiConfigParent } from 'team.creative.creativecore.common.config.gui';
  import { List } from 'java.util';
  import { NamedList, Permission, ToggleableConfig } from 'team.creative.creativecore.common.config.premade';
  import { IntRangeSupplier, DecimalRangeSupplier } from 'team.creative.creativecore.common.config.api';
  import { Class, Boolean, Number } from 'java.lang';
  import { GuiSyncGlobalLayer } from 'team.creative.creativecore.common.gui.sync';

  interface ConfigTypeArray extends ConfigTypeConveration {}
  class ConfigTypeArray extends ConfigTypeConveration {
    areEqual(one: any, two: any, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: any, defaultValue: any, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: any, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): any;
    set(key: ConfigKey, value: any): any;
    writeElement(provider: Provider, value: any, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface ConfigTypeList extends ConfigTypeConveration<List> {}
  class ConfigTypeList extends ConfigTypeConveration<List> {
    areEqual(one: List, two: List, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    createList(key: ConfigKey, expectedSize: number): List;
    loadValue(value: List, defaultValue: List, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: List, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): List;
    restoreDefault(value: List, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    set(key: ConfigKey, value: List): List;
    writeElement(provider: Provider, value: List, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface ConfigTypeNamedList<T extends NamedList = any> extends ConfigTypeConveration<T> {}
  class ConfigTypeNamedList<T extends NamedList = any> extends ConfigTypeConveration<T> {
    areEqual(one: T, two: T, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: T, defaultValue: T, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: NamedList, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): T;
    restoreDefault(value: T, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    set(key: ConfigKey, value: T): T;
    writeElement(provider: Provider, value: T, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  class ConfigTypeNumber {
    createControls(parent: GuiParent, key: ConfigKey): void;
    createControls(parent: GuiParent, key: ConfigKey): void;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    static getDecimalRangeSupplier(clazz: Class): DecimalRangeSupplier;
    static getIntRangeSupplier(clazz: Class): IntRangeSupplier;
    static init(): void;
    isDecimal(clazz: Class): boolean;
    loadValue(value: boolean, parent: GuiParent): void;
    loadValue(value: Number, parent: GuiParent): void;
    parseDecimal(clazz: Class, decimal: number): Number;
    parseInt(clazz: Class, number: number): Number;
    parseNumber(clazz: Class, text: string): Number;
    readElement(key: ConfigKey, defaultValue: boolean, side: Side, element: JsonElement): boolean;
    readElement(key: ConfigKey, defaultValue: Number, side: Side, element: JsonElement): Number;
    set(key: ConfigKey, value: boolean): boolean;
    set(key: ConfigKey, value: Number): Number;
    writeElement(value: boolean, key: ConfigKey, side: Side): JsonElement;
    writeElement(value: Number, key: ConfigKey, side: Side): JsonElement;
  }


  interface ConfigTypePermission extends ConfigTypeNamedList<Permission> {}
  class ConfigTypePermission extends ConfigTypeNamedList<Permission> {
    static readonly PERMISSION_DIALOG: GuiSyncGlobalLayer;
    areEqual(one: Permission, two: Permission, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: Permission, defaultValue: Permission, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    shouldSave(value: Permission, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): boolean;
  }


  interface ConfigTypeToggleable extends ConfigTypeConveration<ToggleableConfig> {}
  class ConfigTypeToggleable extends ConfigTypeConveration<ToggleableConfig> {
    areEqual(one: ToggleableConfig, two: ToggleableConfig, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: ToggleableConfig, defaultValue: ToggleableConfig, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: ToggleableConfig, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): ToggleableConfig;
    set(key: ConfigKey, value: ToggleableConfig): ToggleableConfig;
    writeElement(provider: Provider, value: ToggleableConfig, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }

}

declare module 'team.creative.creativecore.common.config.converation.ConfigTypePermission' {
  import { GuiButton } from 'team.creative.creativecore.common.gui.control.simple';
  import { Permission } from 'team.creative.creativecore.common.config.premade';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { ConfigTypePermission } from 'team.creative.creativecore.common.config.converation';
  import { IGuiConfigParent } from 'team.creative.creativecore.common.config.gui';
  import { Side } from 'team.creative.creativecore';

  interface GuiPermissionConfigButton extends GuiButton {}
  class GuiPermissionConfigButton extends GuiButton {
    value: Permission;
    defaultValue: Permission;
    key: ConfigKey;
    configTypePerm: ConfigTypePermission;
    configParent: IGuiConfigParent;
    readonly side: Side;
    constructor(name: string, configTypePerm: ConfigTypePermission, key: ConfigKey, configParent: IGuiConfigParent, side: Side);
    setNewValue(permission: Permission): void;
  }

}

declare module 'team.creative.creativecore.common.config.converation.registry' {
  import { ConfigTypeConveration } from 'team.creative.creativecore.common.config.converation';
  import { RegistryObjectConfig, RegistryObjectListConfig, RegistryTagConfig, RegistryTagListConfig } from 'team.creative.creativecore.common.config.premade.registry';
  import { Provider } from 'HolderLookup';
  import { JsonElement } from 'com.google.gson';
  import { Side } from 'team.creative.creativecore';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { IGuiConfigParent } from 'team.creative.creativecore.common.config.gui';
  import { FilteredHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { Registry } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { HashMapList } from 'team.creative.creativecore.common.util.type.map';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';

  interface ConfigTypeRegistryObject extends ConfigTypeConveration<RegistryObjectConfig> {}
  class ConfigTypeRegistryObject extends ConfigTypeConveration<RegistryObjectConfig> {
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: RegistryObjectConfig, defaultValue: RegistryObjectConfig, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: RegistryObjectConfig, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): RegistryObjectConfig;
    set(key: ConfigKey, value: RegistryObjectConfig): RegistryObjectConfig;
    writeElement(provider: Provider, value: RegistryObjectConfig, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface ConfigTypeRegistryObjectList extends ConfigTypeConveration<RegistryObjectListConfig> {}
  class ConfigTypeRegistryObjectList extends ConfigTypeConveration<RegistryObjectListConfig> {
    areEqual(one: RegistryObjectListConfig, two: RegistryObjectListConfig, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: RegistryObjectListConfig, defaultValue: RegistryObjectListConfig, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: RegistryObjectListConfig, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): RegistryObjectListConfig;
    set(key: ConfigKey, value: RegistryObjectListConfig): RegistryObjectListConfig;
    writeElement(provider: Provider, value: RegistryObjectListConfig, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface ConfigTypeRegistryTag extends ConfigTypeConveration<RegistryTagConfig> {}
  class ConfigTypeRegistryTag extends ConfigTypeConveration<RegistryTagConfig> {
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: RegistryTagConfig, defaultValue: RegistryTagConfig, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: RegistryTagConfig, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): RegistryTagConfig;
    set(key: ConfigKey, value: RegistryTagConfig): RegistryTagConfig;
    writeElement(provider: Provider, value: RegistryTagConfig, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface ConfigTypeRegistryTagList extends ConfigTypeConveration<RegistryTagListConfig> {}
  class ConfigTypeRegistryTagList extends ConfigTypeConveration<RegistryTagListConfig> {
    areEqual(one: RegistryTagListConfig, two: RegistryTagListConfig, key: ConfigKey, side: Side): boolean;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    loadValue(value: RegistryTagListConfig, defaultValue: RegistryTagListConfig, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    readElement(provider: Provider, defaultValue: RegistryTagListConfig, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): RegistryTagListConfig;
    set(key: ConfigKey, value: RegistryTagListConfig): RegistryTagListConfig;
    writeElement(provider: Provider, value: RegistryTagListConfig, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  class GuiRegistryObjectHandler {
    static readonly REGISTRY: FilteredHandlerRegistry;
    createControls(var1: GuiParent, var2: Registry): void;
    createControls(parent: GuiParent, registry: Registry): void;
    loadValue(var1: GuiParent, var2: Registry, var3: ResourceLocation): void;
    loadValue(parent: GuiParent, registry: Registry, location: ResourceLocation): void;
    saveValue(var1: GuiParent, var2: Registry): ResourceLocation;
    saveValue(parent: GuiParent, registry: Registry): ResourceLocation;
  }


  class GuiRegistryTagHandler {
    static readonly REGISTRY: FilteredHandlerRegistry;
    collect(player: Player): HashMapList<string, ItemStack>;
    createControls(var1: GuiParent, var2: Registry): void;
    createControls(parent: GuiParent, registry: Registry): void;
    loadValue(var1: GuiParent, var2: Registry, var3: TagKey): void;
    loadValue(parent: GuiParent, registry: Registry, tag: TagKey): void;
    saveValue(var1: GuiParent, var2: Registry): TagKey;
    saveValue(parent: GuiParent, registry: Registry): TagKey;
  }

}

declare module 'team.creative.creativecore.common.config.core' {
  import { TriPredicate } from 'team.creative.creativecore.common.util.type';
  import { Side } from 'team.creative.creativecore';
  import { Class } from 'java.lang';
  import { Field } from 'java.lang.reflect';

  class ConfigEqualChecker {
    equals(one: any, two: any, side: Side, registry: ICreativeRegistry): boolean;
    register(clazz: Class, registry: ICreativeRegistry): TriPredicate<any, any, Side>;
  }


  class ICreativeRegistry {
    equals(one: any, two: any, side: Side): boolean;
    get equalChecker(): ConfigEqualChecker;
    is(var1: Field): boolean;
    is(field: Field, side: Side): boolean;
  }

}

declare module 'team.creative.creativecore.common.config.event' {
  import { File } from 'java.io';
  import { Logger } from 'org.apache.logging.log4j';
  import { OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Load } from 'LevelEvent';
  import { ServerAboutToStartEvent } from 'net.neoforged.neoforge.event.server';
  import { MinecraftServer } from 'net.minecraft.server';
  import { ICreativeConfigHolder } from 'team.creative.creativecore.common.config.holder';
  import { Provider } from 'HolderLookup';
  import { Side } from 'team.creative.creativecore';
  import { JsonWriter } from 'com.google.gson.stream';
  import { Number } from 'java.lang';
  import { List } from 'java.util';
  import { Dist } from 'net.neoforged.api.distmarker';

  class ConfigEventHandler {
    constructor(CONFIG_DIRECTORY: File, LOGGER: Logger);
    isOwner(player: ServerPlayer): boolean;
    isSynchronizedWithServer(key: string): boolean;
    load(provider: Provider, modid: string, side: Side): void;
    load(provider: Provider, side: Side): void;
    static loadClientFieldList(holder: ICreativeConfigHolder): string[];
    loadClientFields(): void;
    loadLevel(event: Load): void;
    modFileExist(modid: string, side: Dist): boolean;
    playerLoggedIn(event: OnDatapackSyncEvent): void;
    save(provider: Provider, modid: string, side: Side): void;
    save(provider: Provider, side: Side): void;
    static saveClientFieldList(holder: ICreativeConfigHolder, enabled: string[]): void;
    saveClientFields(): void;
    startServer(event: ServerAboutToStartEvent): void;
    sync(server: MinecraftServer, holder: ICreativeConfigHolder): void;
    sync(holder: ICreativeConfigHolder, player: ServerPlayer): void;
    syncAll(server: MinecraftServer): void;
    syncAll(player: ServerPlayer): void;
    value(value: number): JsonWriter;
    value(value: Number): JsonWriter;
  }

}

declare module 'team.creative.creativecore.common.config.field' {
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';
  import { Type } from 'java.lang.reflect';

  class ConfigField {
    get (): any;
    get genericType(): Type;
    get type(): Class;
    getAnnotation<T extends Annotation>(var1: Class<T>): T;
    set (var1: any);
  }


  interface ConfigFieldDynamic extends ConfigField {}
  class ConfigFieldDynamic extends ConfigField {
    constructor(value: any);
    get (): any;
    get genericType(): Type;
    get type(): Class;
    getAnnotation<T extends Annotation>(annotationClass: Class<T>): T;
    set (value: any);
  }


  interface ConfigFieldTyped extends ConfigField {}
  class ConfigFieldTyped extends ConfigField {
    constructor(value: any, type: Type, clazz: Class);
    get (): any;
    get genericType(): Type;
    get type(): Class;
    getAnnotation<T extends Annotation>(annotationClass: Class<T>): T;
    set (value: any);
  }

}

declare module 'team.creative.creativecore.common.config.group' {
  import { List } from 'java.util';
  import { PlayerSelector } from 'team.creative.creativecore.common.util.player';
  import { Player } from 'net.minecraft.world.entity.player';

  class Usergroup {
    filters: List;
    constructor();

    constructor(...selectors: PlayerSelector[]);
    is(player: Player): boolean;
  }

}

declare module 'team.creative.creativecore.common.config.gui' {
  import { GuiLayer, GuiParent } from 'team.creative.creativecore.common.gui';
  import { CheckTree } from 'team.creative.creativecore.common.util.type.tree';
  import { ICreativeConfigHolder } from 'team.creative.creativecore.common.config.holder';
  import { CheckTreeEntry } from 'team.creative.creativecore.common.util.type.tree.CheckTree';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { Side } from 'team.creative.creativecore';
  import { List } from 'java.util';
  import { GuiCreativeIngredientHandler, CreativeIngredient } from 'team.creative.creativecore.common.util.ingredient';
  import { GuiRow } from 'team.creative.creativecore.common.gui.control.parent';
  import { ConfigKeyType } from 'team.creative.creativecore.common.config.key';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { GuiTextfield, GuiLabel, GuiButton } from 'team.creative.creativecore.common.gui.control.simple';
  import { Runnable } from 'java.lang';
  import { GuiSyncGlobalLayer } from 'team.creative.creativecore.common.gui.sync';
  import { Component } from 'net.minecraft.network.chat';
  import { PlayerSelector } from 'team.creative.creativecore.common.util.player';
  import { NamedHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { GuiControlChangedEvent } from 'team.creative.creativecore.common.gui.event';
  import { PlayerSelectorAnd, PlayerSelectorOr, PlayerSelectorNot, PlayerSelectorLevel, PlayerSelectorGamemode, PlayerSelectorCommandSelector } from 'team.creative.creativecore.common.util.player.PlayerSelector';
  import { Provider } from 'HolderLookup';
  import { GuiPermissionConfigButton } from 'team.creative.creativecore.common.config.converation.ConfigTypePermission';
  import { Permission } from 'team.creative.creativecore.common.config.premade';

  interface ClientSyncGuiLayer extends GuiLayer {}
  class ClientSyncGuiLayer extends GuiLayer {
    readonly tree: CheckTree;
    readonly root: ICreativeConfigHolder;
    currentView: CheckTreeEntry;
    changed: boolean;
    nextAction: number;
    force: boolean;
    constructor(holder: ICreativeConfigHolder);
    closeTopLayer(): void;
    create(): void;
    load(entry: CheckTreeEntry): void;
    save(): void;
  }


  interface ConfigGuiLayer extends GuiLayer {}
  class ConfigGuiLayer extends GuiLayer {
    ROOT: JsonObject;
    side: Side;
    readonly rootHolder: ICreativeConfigHolder;
    holder: ICreativeConfigHolder;
    nextAction: number;
    force: boolean;
    constructor(holder: ICreativeConfigHolder, side: Side);
    closeTopLayer(): void;
    create(): void;
    loadHolder(holder: ICreativeConfigHolder): void;
    savePage(): void;
    sendUpdate(): void;
  }


  interface FullItemDialogGuiLayer extends GuiLayer {}
  class FullItemDialogGuiLayer extends GuiLayer {
    static latest: List;
    button: GuiInfoStackButton;
    handler: GuiCreativeIngredientHandler;
    constructor();
    create(): void;
  }


  interface GuiConfigControl extends IGuiConfigParent, GuiRow {}
  class GuiConfigControl extends IGuiConfigParent {
    readonly field: ConfigKeyType;
    readonly side: Side;
    constructor(field: ConfigKeyType, side: Side, width: number, showReset: boolean);

    constructor(field: ConfigKeyType, side: Side, caption: string, comment: string);

    constructor(field: ConfigKeyType, side: Side, caption: string, comment: string, width: number, showReset: boolean);
    changed(): void;
    get controlFormatting(): ControlFormatting;
    get customData(): any;
    init(initalValue: JsonElement): void;
    init(): void;
    isDefault(): boolean;
    reset(): void;
    save(): JsonElement;
    set customData(object: any);
    updateButton(): void;
  }


  interface GuiConfigSubControl extends GuiParent {}
  class GuiConfigSubControl extends GuiParent {
    nameField: GuiTextfield;
    nameLabel: GuiLabel;
    defaultHolder: boolean;
    constructor(name: string);
    addNameTextfield(name: string): void;
    addNameUnmodifieable(name: string): void;
    get controlFormatting(): ControlFormatting;
    get name(): string;
  }


  interface GuiConfigSubControlHolder extends GuiConfigSubControl {}
  class GuiConfigSubControlHolder extends GuiConfigSubControl {
    holder: ICreativeConfigHolder;
    value: any;
    constructor(name: string, holder: ICreativeConfigHolder, value: any, side: Side, updateListener: Runnable);
    createControls(): void;
    load(holder: ICreativeConfigHolder, value: any): void;
    save(): void;
    updateButton(): void;
  }


  interface GuiConfigSubControlNested extends GuiConfigSubControl {}
  class GuiConfigSubControlNested extends GuiConfigSubControl {
    holder: ICreativeConfigHolder;
    value: any;
    constructor(name: string, holder: ICreativeConfigHolder, value: any, side: Side, updateListener: Runnable, invisiblePanel: boolean);
    addNameTextfield(name: string): void;
    addNameUnmodifieable(name: string): void;
    createControls(): void;
    get controlFormatting(): ControlFormatting;
    load(holder: ICreativeConfigHolder, value: any): void;
    save(): JsonObject;
    updateButton(): void;
  }


  interface GuiInfoStackButton extends GuiButton {}
  class GuiInfoStackButton extends GuiButton {
    static readonly ITEM_DIALOG: GuiSyncGlobalLayer;
    constructor(name: string, info: CreativeIngredient);
    get (): CreativeIngredient;
    static getLabelText(value: CreativeIngredient): Component[];
    set (info: CreativeIngredient);
  }


  interface GuiPlayerSelectorButton extends GuiButton {}
  class GuiPlayerSelectorButton extends GuiButton {
    static readonly PLAYER_SELECTOR: GuiSyncGlobalLayer;
    constructor(name: string, info: PlayerSelector);
    get (): PlayerSelector;
    static getLabelText(value: PlayerSelector): string;
    set (info: PlayerSelector);
  }


  class GuiPlayerSelectorHandler<T extends PlayerSelector = any> {
    static readonly REGISTRY: NamedHandlerRegistry;
    createControls(var1: PlayerSelectorDialog, var2: PlayerSelector): void;
    createControls(gui: PlayerSelectorDialog, selector: PlayerSelector): void;
    createControls(gui: PlayerSelectorDialog, selector: PlayerSelector): void;
    createControls(gui: PlayerSelectorDialog, selector: PlayerSelector): void;
    createControls(gui: PlayerSelectorDialog, selector: PlayerSelector): void;
    static get(selector: PlayerSelector): GuiPlayerSelectorHandler;
    get name(): string;
    onChanged(gui: PlayerSelectorDialog, event: GuiControlChangedEvent): void;
    parseSelector(var1: PlayerSelectorDialog): T;
    parseSelector(selectors: PlayerSelector[]): PlayerSelectorAnd;
    parseSelector(selectors: PlayerSelector[]): PlayerSelectorOr;
    parseSelector(gui: PlayerSelectorDialog): PlayerSelectorNot;
    parseSelector(gui: PlayerSelectorDialog): PlayerSelectorLevel;
    parseSelector(gui: PlayerSelectorDialog): PlayerSelectorGamemode;
    parseSelector(gui: PlayerSelectorDialog): PlayerSelectorCommandSelector;
  }


  class IGuiConfigParent {
    changed(): void;
    get customData(): any;
    provider(): Provider;
    set customData(var1: any);
  }


  interface PermissionGuiLayer extends GuiLayer {}
  class PermissionGuiLayer extends GuiLayer {
    button: GuiPermissionConfigButton;
    constructor();
    changed(): void;
    changed(): void;
    closeTopLayer(): void;
    create(): void;
    save(): Permission;
  }


  interface PlayerSelectorDialog extends GuiLayer {}
  class PlayerSelectorDialog extends GuiLayer {
    button: GuiPlayerSelectorButton;
    handler: GuiPlayerSelectorHandler;
    constructor();
    create(): void;
  }

}

declare module 'team.creative.creativecore.common.config.gui.ClientSyncGuiLayer' {
  import { GuiCheckBox } from 'team.creative.creativecore.common.gui.control.simple';
  import { CheckTreeEntry } from 'team.creative.creativecore.common.util.type.tree.CheckTree';

  interface GuiTreeCheckBox extends GuiCheckBox {}
  class GuiTreeCheckBox extends GuiCheckBox {
    readonly entry: CheckTreeEntry;
    constructor(entry: CheckTreeEntry);
    mouseClicked(x: number, y: number, button: number): boolean;
  }

}

declare module 'team.creative.creativecore.common.config.gui.GuiPlayerSelectorHandler' {
  import { GuiPlayerSelectorHandler, PlayerSelectorDialog } from 'team.creative.creativecore.common.config.gui';
  import { PlayerSelector } from 'team.creative.creativecore.common.util.player';

  interface GuiPlayerSelectorHandlerMultiple<T extends PlayerSelector = any> extends GuiPlayerSelectorHandler<T> {}
  class GuiPlayerSelectorHandlerMultiple<T extends PlayerSelector = any> extends GuiPlayerSelectorHandler<T> {
    createControls(gui: PlayerSelectorDialog, selector: PlayerSelector): void;
    getChildren(selector: PlayerSelector): PlayerSelector[];
    parseSelector(gui: PlayerSelectorDialog): T;
    parseSelector(var1: PlayerSelector[]): T;
  }

}

declare module 'team.creative.creativecore.common.config.gui.PermissionGuiLayer' {
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { Provider } from 'HolderLookup';
  import { ConfigHolderObject } from 'team.creative.creativecore.common.config.holder';
  import { List } from 'java.util';
  import { GuiTextfield, GuiButton } from 'team.creative.creativecore.common.gui.control.simple';

  interface PermissionGuiGroupSimple extends PermissionGuiGroup {}
  class PermissionGuiGroupSimple extends PermissionGuiGroup {
    control: GuiParent;
    readonly defaultValue: any;
    constructor(group: string, defaultValue: any);
    isDefault(): boolean;
    save(): any;
  }


  interface PermissionGuiGroupMulti extends PermissionGuiGroup {}
  class PermissionGuiGroupMulti extends PermissionGuiGroup {
    readonly provider: Provider;
    readonly holder: ConfigHolderObject;
    readonly controls: List;
    textfield: GuiTextfield;
    constructor(provider: Provider, group: string, holder: ConfigHolderObject);
    isDefault(): boolean;
    save(): any;
  }


  class PermissionGuiGroup {
    readonly originalGroup: string;
    textfield: GuiTextfield;
    resetButton: GuiButton;
    constructor(group: string);
    get title(): string;
    isDefault(): boolean;
    isDefaultGroup(): boolean;
    reset(): void;
    save(): any;
    updateResetButton(): void;
  }

}

declare module 'team.creative.creativecore.common.config.holder' {
  import { ConfigSynchronization } from 'team.creative.creativecore.common.config.sync';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { Collection, List } from 'java.util';
  import { Side } from 'team.creative.creativecore';
  import { Provider } from 'HolderLookup';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { ICreativeRegistry, ConfigEqualChecker } from 'team.creative.creativecore.common.config.core';
  import { Field } from 'java.lang.reflect';
  import { Class } from 'java.lang';
  import { Predicate } from 'java.util.function';
  import { IConfigObject } from 'team.creative.creativecore.common.config.api';

  interface ConfigHolder<T extends ConfigKey = any> extends ICreativeConfigHolder {}
  class ConfigHolder<T extends ConfigKey = any> extends ICreativeConfigHolder {
    readonly synchronization: ConfigSynchronization;
    readonly parent: ICreativeConfigHolder;
    readonly path: string[];
    constructor(parent: ICreativeConfigHolder, key: string, synchronization: ConfigSynchronization);
    fields(): Collection<ConfigKey>;
    get(key: string): any;
    get registry(): ICreativeRegistry;
    getField(key: string): ConfigKey;
    isDefault(side: Side): boolean;
    isEmpty(side: Side): boolean;
    isEmptyWithoutForce(side: Side): boolean;
    load(provider: Provider, loadDefault: boolean, ignoreRestart: boolean, json: JsonObject, side: Side): void;
    names(): Collection<string>;
    parent(): ICreativeConfigHolder;
    path(): string[];
    restoreDefault(side: Side, ignoreRestart: boolean): void;
    save(provider: Provider, saveDefault: boolean, ignoreRestart: boolean, side: Side): JsonObject;
    synchronization(): ConfigSynchronization;
  }


  interface ConfigHolderDynamic extends ConfigHolder<ConfigKey> {}
  class ConfigHolderDynamic extends ConfigHolder<ConfigKey> {
    constructor(parent: ICreativeConfigHolder, key: string, synchronization: ConfigSynchronization);
    configured(side: Side): void;
    registerField(key: string, field: Field, object: any): void;
    registerField(key: string, field: Field, object: any, synchronization: ConfigSynchronization, requiresRestart: boolean): void;
    registerField(key: string, field: Field, object: any, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean): void;
    registerFolder(key: string): ConfigHolderDynamic;
    registerFolder(key: string, synchronization: ConfigSynchronization): ConfigHolderDynamic;
    registerValue(key: string, defaultValue: any): ConfigHolderDynamic;
    registerValue(key: string, defaultValue: any, synchronization: ConfigSynchronization, requiresRestart: boolean): ConfigHolderDynamic;
    registerValue(key: string, defaultValue: any, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean): ConfigHolderDynamic;
  }


  interface ConfigHolderObject extends ConfigHolder<ConfigKey> {}
  class ConfigHolderObject extends ConfigHolder<ConfigKey> {
    readonly object: any;
    constructor(parent: ICreativeConfigHolder, synchronization: ConfigSynchronization, key: string, object: any);

    constructor(parent: ICreativeConfigHolder, synchronization: ConfigSynchronization, key: string, object: any, defaultReference: any);
    static collectFields(clazz: Class, fields: Field[], registry: ICreativeRegistry): Field[];
    configured(side: Side): void;
    static createUnrelated(registry: ICreativeRegistry, side: Side, value: any): ConfigHolderObject;
    static createUnrelated(registry: ICreativeRegistry, side: Side, value: any, defaultReference: any): ConfigHolderObject;
    get registry(): ICreativeRegistry;
    load(provider: Provider, loadDefault: boolean, ignoreRestart: boolean, json: JsonObject, side: Side): void;
    restoreDefault(side: Side, ignoreRestart: boolean): void;
  }


  interface CreativeConfigRegistry extends ICreativeRegistry, ConfigHolderDynamic {}
  class CreativeConfigRegistry extends ICreativeRegistry {
    static readonly ROOT: CreativeConfigRegistry;
    static readonly FIELD_PREDICATE: Predicate;
    static readonly EQUAL_CHECKER: ConfigEqualChecker;
    findKey(path: string[]): ConfigKey;
    followPath(...path: string[]): ICreativeConfigHolder;
    get equalChecker(): ConfigEqualChecker;
    get registry(): ICreativeRegistry;
    is(field: Field): boolean;
    is(field: Field, side: Side): boolean;
    static load(provider: Provider, modid: string, side: Side): void;
    load(provider: Provider, loadDefault: boolean, ignoreRestart: boolean, json: JsonObject, side: Side): void;
    registerValue(key: string, defaultValue: any): ConfigHolderDynamic;
    registerValue(key: string, defaultValue: any, synchronization: ConfigSynchronization, requiresRestart: boolean): ConfigHolderDynamic;
    registerValue(key: string, defaultValue: any, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean): ConfigHolderDynamic;
    removeField(modid: string): boolean;
  }


  interface ICreativeConfigHolder extends IConfigObject {}
  class ICreativeConfigHolder extends IConfigObject {
    fields(): Collection<ConfigKey>;
    get(var1: string): any;
    get name(): string;
    get registry(): ICreativeRegistry;
    getField(var1: string): ConfigKey;
    isEmpty(var1: Side): boolean;
    isEmptyWithoutForce(var1: Side): boolean;
    load(var1: Provider, var2: boolean, var3: boolean, var4: JsonObject, var5: Side): void;
    names(): Collection<string>;
    parent(): ICreativeConfigHolder;
    path(): string[];
    static read(provider: Provider, holder: ICreativeConfigHolder, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side): void;
    save(var1: Provider, var2: boolean, var3: boolean, var4: Side): JsonObject;
    synchronization(): ConfigSynchronization;
    static write(provider: Provider, holder: ICreativeConfigHolder, saveDefault: boolean, ignoreRestart: boolean, side: Side): JsonElement;
  }

}

declare module 'team.creative.creativecore.common.config.key' {
  import { ConfigSynchronization } from 'team.creative.creativecore.common.config.sync';
  import { ConfigField } from 'team.creative.creativecore.common.config.field';
  import { ICreativeConfigHolder } from 'team.creative.creativecore.common.config.holder';
  import { Field } from 'java.lang.reflect';
  import { Side } from 'team.creative.creativecore';
  import { ConfigTypeConveration } from 'team.creative.creativecore.common.config.converation';
  import { Provider } from 'HolderLookup';
  import { JsonElement } from 'com.google.gson';
  import { GuiConfigSubControl, IGuiConfigParent } from 'team.creative.creativecore.common.config.gui';
  import { ICreativeRegistry } from 'team.creative.creativecore.common.config.core';

  class ConfigKey {
    readonly name: string;
    readonly synchronization: ConfigSynchronization;
    readonly requiresRestart: boolean;
    readonly hideFromGUI: boolean;
    forceSynchronization: boolean;
    constructor(field: ConfigField, name: string, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean);
    converation(): ConfigTypeConveration;
    copy(var1: Provider, var2: Side): any;
    create(var1: IGuiConfigParent, var2: string, var3: Side): GuiConfigSubControl;
    equals(obj: any): boolean;
    field(): ConfigField;
    forceValue(var1: any, var2: Side): void;
    get (): any;
    get registry(): ICreativeRegistry;
    hashCode(): number;
    holder(): ICreativeConfigHolder;
    is(side: Side): boolean;
    isDefault(var1: Side): boolean;
    isDefault(var1: any, var2: Side): boolean;
    isFolder(): boolean;
    isWithoutForce(side: Side): boolean;
    load(var1: IGuiConfigParent, var2: GuiConfigSubControl, var3: Side): void;
    static of(parentHolder: ICreativeConfigHolder, field: Field, name: string, defaultValue: any, sync: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean, parent: any): ConfigKey;
    static of(parent: ICreativeConfigHolder, field: ConfigField, name: string, defaultValue: any, sync: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean): ConfigKey;
    static ofArrayType(key: ConfigKey, side: Side): ConfigKey;
    static ofGenericType(key: ConfigKey, side: Side): ConfigKey;
    static ofType(key: ConfigKey, field: ConfigField, side: Side): ConfigKey;
    read(var1: Provider, var2: boolean, var3: boolean, var4: JsonElement, var5: Side): void;
    restoreDefault(var1: Side, var2: boolean): void;
    save(var1: GuiConfigSubControl, var2: IGuiConfigParent, var3: Side): void;
    toString(): string;
    triggerConfigured(var1: Side): void;
    write(var1: Provider, var2: boolean, var3: boolean, var4: Side): JsonElement;
  }


  interface ConfigKeyHolder extends ConfigKey {}
  class ConfigKeyHolder extends ConfigKey {
    constructor(holder: ICreativeConfigHolder, field: ConfigField, name: string, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean);
    converation(): ConfigTypeConveration;
    copy(provider: Provider, side: Side): any;
    create(configParent: IGuiConfigParent, name: string, side: Side): GuiConfigSubControl;
    forceValue(object: any, side: Side): void;
    get registry(): ICreativeRegistry;
    holder(): ICreativeConfigHolder;
    isDefault(side: Side): boolean;
    isDefault(value: any, side: Side): boolean;
    isFolder(): boolean;
    load(configParent: IGuiConfigParent, control: GuiConfigSubControl, side: Side): void;
    read(provider: Provider, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side): void;
    restoreDefault(side: Side, ignoreRestart: boolean): void;
    save(control: GuiConfigSubControl, configParent: IGuiConfigParent, side: Side): void;
    triggerConfigured(side: Side): void;
    write(provider: Provider, saveDefault: boolean, ignoreRestart: boolean, side: Side): JsonElement;
  }


  interface ConfigKeyType extends ConfigKey {}
  class ConfigKeyType extends ConfigKey {
    readonly registry: ICreativeRegistry;
    readonly converation: ConfigTypeConveration;
    readonly defaultValue: any;
    constructor(field: ConfigField, name: string, defaultValue: any, synchronization: ConfigSynchronization, requiresRestart: boolean, hideFromGUI: boolean, registry: ICreativeRegistry);
    converation(): ConfigTypeConveration;
    copy(provider: Provider, side: Side): any;
    create(configParent: IGuiConfigParent, name: string, side: Side): GuiConfigSubControl;
    forceValue(object: any, side: Side): void;
    get registry(): ICreativeRegistry;
    holder(): ICreativeConfigHolder;
    isDefault(side: Side): boolean;
    isDefault(value: any, side: Side): boolean;
    isFolder(): boolean;
    load(configParent: IGuiConfigParent, control: GuiConfigSubControl, side: Side): void;
    read(provider: Provider, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side): void;
    restoreDefault(side: Side, ignoreRestart: boolean): void;
    save(control: GuiConfigSubControl, configParent: IGuiConfigParent, side: Side): void;
    triggerConfigured(side: Side): void;
    write(provider: Provider, saveDefault: boolean, ignoreRestart: boolean, side: Side): JsonElement;
  }

}

declare module 'team.creative.creativecore.common.config.premade.curve' {
  import { ICreativeConfig } from 'team.creative.creativecore.common.config.api';
  import { Random } from 'java.util';
  import { IntMinMax, DecimalMinMax } from 'team.creative.creativecore.common.config.premade';
  import { Side } from 'team.creative.creativecore';

  class Curve {
    valueAt(var1: number): number;
  }


  interface DecimalCurve extends ICreativeConfig, Curve {}
  class DecimalCurve extends ICreativeConfig {
    min: number;
    minValue: number;
    max: number;
    maxValue: number;
    constructor(min: number, minValue: number, max: number, maxValue: number);

    constructor(rand: Random, duration: IntMinMax, intensity: DecimalMinMax);

    constructor(rand: Random, duration: IntMinMax, intensity: number);
    configured(side: Side): void;
    valueAt(x: number): number;
  }


  interface IntCurve extends ICreativeConfig, Curve {}
  class IntCurve extends ICreativeConfig {
    min: number;
    minValue: number;
    max: number;
    maxValue: number;
    constructor(min: number, minValue: number, max: number, maxValue: number);
    configured(side: Side): void;
    valueAt(x: number): number;
  }


  interface LinearCurve extends ICreativeConfig, Curve {}
  class LinearCurve extends ICreativeConfig {
    value: number;
    constructor(value: number);
    configured(side: Side): void;
    valueAt(x: number): number;
  }

}

declare module 'team.creative.creativecore.common.config.premade' {
  import { ICreativeConfig, IConfigObject } from 'team.creative.creativecore.common.config.api';
  import { Random, LinkedHashMap, Set } from 'java.util';
  import { Side } from 'team.creative.creativecore';
  import { RegistryObjectConfig } from 'team.creative.creativecore.common.config.premade.registry';
  import { Registry } from 'net.minecraft.core';
  import { MobEffect, MobEffectInstance } from 'net.minecraft.world.effect';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entry } from 'Map';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Entity } from 'net.minecraft.world.entity';
  import { SoundSource } from 'net.minecraft.sounds';
  import { Level } from 'net.minecraft.world.level';

  interface DecimalMinMax extends ICreativeConfig {}
  class DecimalMinMax extends ICreativeConfig {
    min: number;
    max: number;
    constructor(min: number, max: number);
    configured(side: Side): void;
    next(rand: Random): number;
    spanLength(): number;
  }


  interface IntMinMax extends ICreativeConfig {}
  class IntMinMax extends ICreativeConfig {
    min: number;
    max: number;
    constructor(min: number, max: number);
    configured(side: Side): void;
    next(rand: Random): number;
    spanLength(): number;
  }


  class MobEffectConfig {
    effect: RegistryObjectConfig;
    amplifier: number;
    duration: number;
    hideParticles: boolean;
    constructor(registry: Registry<MobEffect>, effect: ResourceLocation, amplifier: number, duration: number, hideParticles: boolean);
    create(): MobEffectInstance;
    equals(obj: any): boolean;
  }


  interface NamedList<T = any> extends LinkedHashMap<string, T> {}
  class NamedList<T = any> extends LinkedHashMap<string, T> {
    entrySet(): Set<Entry<string, T>>;
    keySet(): Set<string>;
  }


  interface Permission<T = any> extends NamedList<T> {}
  class Permission<T = any> extends NamedList<T> {
    constructor(defaultValue: T);
    add(usergroup: string, value: T): Permission<T>;
    get(player: Player): T;
    get(key: any): T;
    get default(): T;
    getDirect(key: any): T;
    getOrDefault(key: any, defaultValue: T): T;
    put(key: string, value: T): T;
  }


  interface SelectableConfig<T = any> extends IConfigObject {}
  class SelectableConfig<T = any> extends IConfigObject {
    constructor(selected: number, ...array: T[]);
    configured(side: Side): void;
    get (): T;
    get array(): T[];
    get selected(): number;
    isDefault(side: Side): boolean;
    reset(): void;
    restoreDefault(side: Side, ignoreRestart: boolean): void;
    select(index: number): void;
    updateArray(array: T[], fallBack: T): void;
  }


  class SoundConfig {
    event: ResourceLocation;
    volume: number;
    pitch: number;
    constructor(location: ResourceLocation, volume: number, pitch: number);

    constructor(location: ResourceLocation);
    equals(obj: any): boolean;
    play(entity: Entity, category: SoundSource): void;
    play(level: Level, x: number, y: number, z: number, category: SoundSource): void;
  }


  interface ToggleableConfig<T = any> extends ICreativeConfig {}
  class ToggleableConfig<T = any> extends ICreativeConfig {
    readonly value: T;
    constructor(value: T);

    constructor(value: T, enabled: boolean);
    configured(side: Side): void;
    equals(obj: any): boolean;
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
  }

}

declare module 'team.creative.creativecore.common.config.premade.registry' {
  import { ICreativeConfig } from 'team.creative.creativecore.common.config.api';
  import { Registry, Holder } from 'net.minecraft.core';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Side } from 'team.creative.creativecore';
  import { Iterable } from 'java.lang';
  import { Iterator } from 'java.util';
  import { TagKey } from 'net.minecraft.tags';

  interface RegistryObjectConfig<T = any> extends ICreativeConfig {}
  class RegistryObjectConfig<T = any> extends ICreativeConfig {
    readonly registry: Registry;
    location: ResourceLocation;
    value: T;
    constructor(registry: Registry<T>, location: ResourceLocation);
    configured(side: Side): void;
    equals(obj: any): boolean;
    get holder(): Holder<T>;
  }


  interface RegistryObjectListConfig<T = any> extends Iterable<T> {}
  class RegistryObjectListConfig<T = any> extends Iterable<T> {
    readonly registry: Registry;
    constructor(registry: Registry<T>);
    add(location: ResourceLocation): void;
    contains(location: ResourceLocation): boolean;
    getLocation(index: number): ResourceLocation;
    iterator(): Iterator<T>;
    locations(): Iterable<ResourceLocation>;
    size(): number;
  }


  class RegistryTagConfig<T = any> {
    readonly registry: Registry;
    tag: TagKey;
    constructor(registry: Registry<T>, tag: TagKey<T>);
    equals(obj: any): boolean;
  }


  interface RegistryTagListConfig<T = any> extends Iterable<TagKey> {}
  class RegistryTagListConfig<T = any> extends Iterable<TagKey> {
    readonly registry: Registry;
    constructor(registry: Registry<T>);
    add(tag: TagKey): void;
    get(index: number): TagKey<T>;
    iterator(): Iterator<TagKey<T>>;
    size(): number;
  }

}

declare module 'team.creative.creativecore.common.config.premade.registry.RegistryObjectListConfig' {
  import { ResourceLocation } from 'net.minecraft.resources';

  class RegistryHolder {
    readonly location: ResourceLocation;
    constructor(location: ResourceLocation);
    equals(obj: any): boolean;
    get (): T;
    hashCode(): number;
  }

}

declare module 'team.creative.creativecore.common.config.sync' {
  import { Enum } from 'java.lang';
  import { Side } from 'team.creative.creativecore';
  import { List } from 'java.util';
  import { CreativePacket } from 'team.creative.creativecore.common.network';
  import { JsonObject } from 'com.google.gson';
  import { ICreativeConfigHolder } from 'team.creative.creativecore.common.config.holder';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { CheckTree } from 'team.creative.creativecore.common.util.type.tree';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { CheckTreeEntry } from 'team.creative.creativecore.common.util.type.tree.CheckTree';
  import { Provider } from 'HolderLookup';

  interface ConfigSynchronization extends Enum<ConfigSynchronization> {}
  class ConfigSynchronization extends Enum<ConfigSynchronization> {
    static readonly CLIENT: ConfigSynchronization;
    static readonly UNIVERSAL: ConfigSynchronization;
    static readonly SERVER: ConfigSynchronization;
    useFolder(var1: boolean, var2: Side): boolean;
    useValue(var1: boolean, var2: Side): boolean;
    static valueOf(name: string): ConfigSynchronization;
    static values(): ConfigSynchronization[];
  }


  interface ConfigurationChangePacket extends CreativePacket {}
  class ConfigurationChangePacket extends CreativePacket {
    path: string[];
    json: JsonObject;
    constructor(holder: ICreativeConfigHolder, json: JsonObject);

    constructor();
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
  }


  interface ConfigurationClientPacket extends CreativePacket {}
  class ConfigurationClientPacket extends CreativePacket {
    path: string[];
    enabled: List;
    constructor(holder: ICreativeConfigHolder, tree: CheckTree<ConfigKey>);

    constructor(holder: ICreativeConfigHolder);

    constructor();
    buildClientFieldList(entry: CheckTreeEntry, list: string[]): string[];
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
    run(): ICreativeConfigHolder;
  }


  interface ConfigurationPacket extends CreativePacket {}
  class ConfigurationPacket extends CreativePacket {
    path: string[];
    json: JsonObject;
    ignoreRestart: boolean;
    constructor(provider: Provider, holder: ICreativeConfigHolder, ignoreRestart: boolean);

    constructor();
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
    static updateGui(player: Player): void;
  }

}

declare module 'team.creative.creativecore.common.gui' {
  import { Enum, Iterable, Class } from 'java.lang';
  import { List, Iterator } from 'java.util';
  import { GuiSizeRule, GuiFlow } from 'team.creative.creativecore.common.gui.flow';
  import { Provider } from 'HolderLookup';
  import { Component, MutableComponent } from 'net.minecraft.network.chat';
  import { IGuiIntegratedParent } from 'team.creative.creativecore.common.gui.integration';
  import { GuiStyle, ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { GuiEvent, GuiTooltipEvent, GuiControlClickEvent, GuiControlChangedEvent } from 'team.creative.creativecore.common.gui.event';
  import { StyleDisplay } from 'team.creative.creativecore.common.gui.style.display';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Player } from 'net.minecraft.world.entity.player';
  import { SoundInstance } from 'net.minecraft.client.resources.sounds';
  import { Reference } from 'Holder';
  import { SoundEvent } from 'net.minecraft.sounds';
  import { IGuiInventory } from 'team.creative.creativecore.common.gui.control.inventory';
  import { GuiManagerType } from 'team.creative.creativecore.common.gui.manager.GuiManager';
  import { GuiManager, GuiManagerItem } from 'team.creative.creativecore.common.gui.manager';
  import { GuiSyncHolderLayer } from 'team.creative.creativecore.common.gui.sync.GuiSyncHolder';
  import { Options } from 'net.minecraft.client';
  import { Supplier, Consumer } from 'java.util.function';

  interface Align extends Enum<Align> {}
  class Align extends Enum<Align> {
    static readonly LEFT: Align;
    static readonly CENTER: Align;
    static readonly RIGHT: Align;
    static readonly STRETCH: Align;
    static valueOf(name: string): Align;
    static values(): Align[];
  }


  class GuiControl {
    readonly rect: GuiControlRect;
    readonly name: string;
    enabled: boolean;
    preferred: GuiSizeRule;
    expandableX: boolean;
    expandableY: boolean;
    visible: boolean;
    constructor(name: string);
    charTyped(codePoint: string, modifiers: number): boolean;
    closed(): void;
    createChildRect(contentRect: Rect, scale: number, xOffset: number, yOffset: number): Rect;
    get contentOffset(): number;
    get controlFormatting(): ControlFormatting;
    get integratedParent(): IGuiIntegratedParent;
    get layer(): GuiLayer;
    get nestedName(): string;
    get parent(): IGuiParent;
    get player(): Player;
    get style(): GuiStyle;
    get tooltip(): Component[];
    getBackground(style: GuiStyle, display: StyleDisplay): StyleDisplay;
    getBorder(style: GuiStyle, display: StyleDisplay): StyleDisplay;
    getTooltipEvent(x: number, y: number): GuiTooltipEvent;
    hasGui(): boolean;
    hasLayer(): boolean;
    init(): void;
    is(name: string): boolean;
    is(...name: string[]): boolean;
    isClient(): boolean;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
    isInteractable(): boolean;
    isParent(parent: IGuiParent): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDoubleClicked(x: number, y: number, button: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number, time: number): void;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, delta: number): boolean;
    static playSound(sound: SoundInstance): void;
    static playSound(sound: Reference<SoundEvent>): void;
    static playSound(event: SoundEvent): void;
    static playSound(event: SoundEvent, volume: number, pitch: number): void;
    static playSound(event: Reference<SoundEvent>, volume: number, pitch: number): void;
    provider(): Provider;
    raiseEvent(event: GuiEvent): void;
    reflow(): void;
    render(graphics: GuiGraphics, controlRect: Rect, realRect: Rect, scale: number, mouseX: number, mouseY: number): void;
    set parent(parent: IGuiParent);
    set tooltip(tooltip: Component[]);
    setDim(width: number, height: number): GuiControl;
    setDim(dim: GuiSizeRule): GuiControl;
    setEnabled(enabled: boolean): GuiControl;
    setExpandable(): GuiControl;
    setExpandableX(): GuiControl;
    setExpandableY(): GuiControl;
    setFixed(): GuiControl;
    setFixedX(): GuiControl;
    setFixedY(): GuiControl;
    setTooltip(translate: string): GuiControl;
    setUnexpandable(): GuiControl;
    setUnexpandableX(): GuiControl;
    setUnexpandableY(): GuiControl;
    setVisible(visible: boolean): GuiControl;
    testForDoubleClick(x: number, y: number, button: number): boolean;
    tick(): void;
    toLayerRect(rect: Rect): Rect;
    toScreenRect(rect: Rect): Rect;
    static translatable(text: string): MutableComponent;
    static translatable(text: string, ...parameters: any[]): MutableComponent;
    static translate(text: string): string;
    static translate(text: string, ...parameters: any[]): string;
    static translateOrDefault(text: string, defaultText: string): string;
  }


  class GuiControlRect {
    constructor(control: GuiControl);
    addHeight(additional: number, availableHeight: number): number;
    addWidth(additional: number, availableWidth: number): number;
    flowX(): void;
    flowY(): void;
    get bottom(): number;
    get contentHeight(): number;
    get contentWidth(): number;
    get height(): number;
    get right(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    static getMaxHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMaxHeight(availableHeight: number): number;
    static getMaxWidth(control: GuiControl, availableWidth: number): number;
    getMaxWidth(availableWidth: number): number;
    static getMinHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMinHeight(availableHeight: number): number;
    static getMinWidth(control: GuiControl, availableWidth: number): number;
    getMinWidth(availableWidth: number): number;
    static getPreferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    getPreferredHeight(availableHeight: number): number;
    static getPreferredWidth(control: GuiControl, availableWidth: number): number;
    getPreferredWidth(availableWidth: number): number;
    inside(x: number, y: number): boolean;
    insideLocalPos(x: number, y: number): boolean;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
    isMaxHeight(availableHeight: number): boolean;
    isMaxWidth(availableWidth: number): boolean;
    rectCopy(): Rect;
    set bottom(y: number);
    set right(x: number);
    set x(x: number);
    set y(y: number);
    setHeight(height: number, availableHeight: number): number;
    setWidth(width: number, availableWidth: number): number;
    toString(): string;
  }


  interface GuiLayer extends GuiParent {}
  class GuiLayer extends GuiParent {
    static readonly MINIMUM_OUTER_SPACING: number;
    style: GuiStyle;
    constructor(name: string);

    constructor(name: string, width: number, height: number);
    becameTopLayer(): void;
    closeLayerUsingEscape(): boolean;
    closed(): void;
    create(): void;
    get controlFormatting(): ControlFormatting;
    get height(): number;
    get layer(): GuiLayer;
    get settings(): Options;
    get style(): GuiStyle;
    get syncHolder(): GuiSyncHolderLayer;
    get width(): number;
    getOrCreate<T extends GuiManager>(type: GuiManagerType<T>): T;
    has(type: GuiManagerType): boolean;
    has(name: string): boolean;
    hasGrayBackground(): boolean;
    hasLayer(): boolean;
    init(): void;
    inventoriesToExract(): Iterable<IGuiInventory>;
    inventoriesToInsert(): Iterable<IGuiInventory>;
    itemManager(): GuiManagerItem;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    managers(): Iterable<GuiManager>;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseReleased(x: number, y: number, button: number): void;
    reflow(): void;
    reinit(): void;
    tick(): void;
    toLayerRect(control: GuiControl, rect: Rect): Rect;
    toLayerRect(rect: Rect): Rect;
  }


  interface GuiParent extends IGuiParent, Iterable<GuiControl>, GuiControl {}
  class GuiParent extends IGuiParent {
    flow: GuiFlow;
    align: Align;
    valign: VAlign;
    spacing: number;
    constructor(name: string, flow: GuiFlow);

    constructor(name: string, flow: GuiFlow, valign: VAlign);

    constructor(name: string, flow: GuiFlow, align: Align);

    constructor(name: string, flow: GuiFlow, align: Align, valign: VAlign);

    constructor(name: string);

    constructor();

    constructor(flow: GuiFlow);
    add(control: GuiControl): GuiParent;
    add(...controls: GuiControl[]): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(...controls: GuiControl[]): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    charTyped(codePoint: string, modifiers: number): boolean;
    clear(): void;
    clearEvents(): void;
    closeLayer(layer: GuiLayer): void;
    closeThisLayer(): void;
    closeTopLayer(): void;
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get<T extends GuiControl>(name: string): T;
    get<T extends GuiControl>(name: string, clazz: Class<T>): T;
    get controlFormatting(): ControlFormatting;
    get nestedName(): string;
    get offsetX(): number;
    get offsetY(): number;
    getTooltipEvent(x: number, y: number): GuiTooltipEvent;
    has(name: string): boolean;
    init(): void;
    insertControlAfter<T extends GuiControl>(reference: GuiControl, toInsert: T): T;
    insertControlBefore<T extends GuiControl>(reference: GuiControl, toInsert: T): T;
    isClient(): boolean;
    isContainer(): boolean;
    isEmpty(): boolean;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
    isMouseOverHovered(x: number, y: number): boolean;
    iterator(): Iterator<GuiControl>;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDoubleClicked(x: number, y: number, button: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number, time: number): void;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, delta: number): boolean;
    raiseEvent(event: GuiEvent): void;
    registerEvent<T extends GuiEvent>(clazz: Class<T>, action: Consumer<T>): void;
    registerEventChanged(consumer: Consumer<GuiControlChangedEvent>): void;
    registerEventClick(consumer: Consumer<GuiControlClickEvent>): void;
    remove(control: GuiControl): boolean;
    remove(...include: string[]): void;
    removeExclude(...exclude: string[]): void;
    replace(oldControl: GuiControl, newControl: GuiControl): boolean;
    scaleFactor(): number;
    scaleFactorInv(): number;
    setAlign(align: Align): GuiParent;
    setFlow(flow: GuiFlow): GuiParent;
    setScale(scale: number): GuiParent;
    setSpacing(spacing: number): GuiParent;
    setVAlign(valign: VAlign): GuiParent;
    size(): number;
    testForDoubleClick(x: number, y: number, button: number): boolean;
    tick(): void;
    toLayerRect(control: GuiControl, rect: Rect): Rect;
    toLayerRect(rect: Rect): Rect;
    toScreenRect(control: GuiControl, rect: Rect): Rect;
    toScreenRect(rect: Rect): Rect;
  }


  class IGuiParent {
    closeLayer(var1: GuiLayer): void;
    closeTopLayer(): void;
    get integratedParent(): IGuiIntegratedParent;
    get player(): Player;
    hasGui(): boolean;
    isClient(): boolean;
    isContainer(): boolean;
    isParent(var1: IGuiParent): boolean;
    raiseEvent(var1: GuiEvent): void;
    reflow(): void;
    toLayerRect(var1: GuiControl, var2: Rect): Rect;
    toScreenRect(var1: GuiControl, var2: Rect): Rect;
  }


  class IScaleableGuiScreen {
    clientTick(): void;
    get height(): number;
    get width(): number;
    getMaxScale(displayWidth: number, displayHeight: number): number;
  }


  interface VAlign extends Enum<VAlign> {}
  class VAlign extends Enum<VAlign> {
    static readonly TOP: VAlign;
    static readonly CENTER: VAlign;
    static readonly BOTTOM: VAlign;
    static readonly STRETCH: VAlign;
    static valueOf(name: string): VAlign;
    static values(): VAlign[];
  }

}

declare module 'team.creative.creativecore.common.gui.control.collection' {
  import { GuiScrollY } from 'team.creative.creativecore.common.gui.control.parent';
  import { Predicate, Supplier, Function } from 'java.util.function';
  import { TextMapBuilder, IComponentMap } from 'team.creative.creativecore.common.util.text';
  import { Object2BooleanMap } from 'it.unimi.dsi.fastutil.objects';
  import { GuiParent, GuiControl } from 'team.creative.creativecore.common.gui';
  import { Iterable, Class } from 'java.lang';
  import { GuiLabel, GuiRowLabel } from 'team.creative.creativecore.common.gui.control.simple';
  import { ExtensionDirection } from 'team.creative.creativecore.common.gui.extension.GuiExtensionCreator';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { CompiledText } from 'team.creative.creativecore.client.render.text';
  import { GuiExtensionCreator } from 'team.creative.creativecore.common.gui.extension';
  import { Component } from 'net.minecraft.network.chat';
  import { NamedTree } from 'team.creative.creativecore.common.util.type.tree';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { StackCollector } from 'team.creative.creativecore.common.gui.control.collection.GuiStackSelector';
  import { ItemStack } from 'net.minecraft.world.item';
  import { HashMapList } from 'team.creative.creativecore.common.util.type.map';

  interface GuiCheckList<T = any> extends GuiScrollY {}
  class GuiCheckList<T = any> extends GuiScrollY {
    readonly modifiable: boolean;
    canBeModified: Predicate;
    constructor(name: string, modifiable: boolean, map: TextMapBuilder<T>, selected: Object2BooleanMap<T>);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    allItems(): Iterable<T>;
    checked(index: number): boolean;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get(index: number): T;
    get<T extends GuiControl>(name: string): T;
    get<T extends GuiControl>(name: string, clazz: Class<T>): T;
    indexOf(value: T): number;
    isEmpty(): boolean;
    reflowInternal(): void;
    removeItem(index: number): void;
    selectedItems(): Iterable<T>;
    set(map: TextMapBuilder<T>, selected: Object2BooleanMap<T>): void;
    size(): number;
  }


  interface GuiComboBox<K = any> extends GuiLabel {}
  class GuiComboBox<K = any> extends GuiLabel {
    constructor(name: string, selected: K, builder: IComponentMap<K>);

    constructor(name: string, builder: IComponentMap<K>);
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    hasSearchbar(): boolean;
    indexOf(key: K): number;
    lines(): Iterable<CompiledText>;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    next(): void;
    preferredHeight(width: number, availableHeight: number): number;
    preferredWidth(availableWidth: number): number;
    previous(): void;
    select(index: number): void;
    select(key: K): void;
    selected(): K;
    selected(defaultValue: K): K;
    selectedIndex(): number;
    set(builder: IComponentMap<K>): void;
    setDirection(direction: ExtensionDirection): GuiComboBox;
    setSearchbar(searchbar: boolean): GuiComboBox;
  }


  interface GuiComboBoxExtension extends GuiListBoxBase<GuiRowLabel> {}
  class GuiComboBoxExtension extends GuiListBoxBase<GuiRowLabel> {
    creator: GuiExtensionCreator;
    search: string;
    constructor(name: string, creator: GuiExtensionCreator<GuiComboBox<any>, GuiComboBoxExtension>);
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    reloadControls(): void;
  }


  interface GuiComboBoxFlexible<K = any> extends GuiComboBox<K> {}
  class GuiComboBoxFlexible<K = any> extends GuiComboBox<K> {
    constructor(name: string, lines: TextMapBuilder<K>, functionParameter: Function<K, Component>);
    forceSelect(key: K): void;
    select(index: number): void;
    selected(): K;
  }


  interface GuiComboBoxTree<K = any> extends GuiLabel {}
  class GuiComboBoxTree<K = any> extends GuiLabel {
    constructor(name: string, selected: K, data: NamedTree<K>, title: Function<string, Component>);

    constructor(name: string, data: NamedTree<K>, title: Function<string, Component>);
    get controlFormatting(): ControlFormatting;
    hasSearchbar(): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    select(path: string, key: K): void;
    select(key: K): void;
    selected(): K;
    selected(defaultValue: K): K;
    set(data: NamedTree<K>): void;
    setDirection(direction: ExtensionDirection): GuiComboBoxTree;
    setSearchbar(searchbar: boolean): GuiComboBoxTree;
  }


  interface GuiListBoxBase<T extends GuiControl = any> extends GuiScrollY {}
  class GuiListBoxBase<T extends GuiControl = any> extends GuiScrollY {
    readonly modifiable: boolean;
    canBeModified: Predicate;
    constructor(name: string, modifiable: boolean, entries: T[]);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addAllItems(entries: T[]): void;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addItem(entry: T): void;
    clearItems(): void;
    flowY(width: number, height: number, preferred: number): void;
    get(index: number): T;
    get<T extends GuiControl>(name: string): T;
    get<T extends GuiControl>(name: string, clazz: Class<T>): T;
    isEmpty(): boolean;
    items(): Iterable<T>;
    reflowInternal(): void;
    removeItem(index: number): void;
    size(): number;
  }


  interface GuiStackSelector extends GuiLabel {}
  class GuiStackSelector extends GuiLabel {
    readonly player: Player;
    constructor(name: string, player: Player, collector: StackCollector, searchbar: boolean);

    constructor(name: string, player: Player, collector: StackCollector);
    static contains(search: string, stack: ItemStack): boolean;
    get controlFormatting(): ControlFormatting;
    get player(): Player;
    get selected(): ItemStack;
    get stacks(): HashMapList<string, ItemStack>;
    static getItemName(stack: ItemStack): string;
    hasSearchbar(): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    selectFirst(): boolean;
    set selected(stack: ItemStack);
    setSearchbar(searchbar: boolean): GuiStackSelector;
    setSelectedForce(stack: ItemStack): boolean;
    setWidth(width: number): GuiStackSelector;
    updateCollectedStacks(): void;
  }


  interface GuiStackSelectorExtension extends GuiScrollY {}
  class GuiStackSelectorExtension extends GuiScrollY {
    creator: GuiExtensionCreator;
    constructor(name: string, player: Player, creator: GuiExtensionCreator<GuiStackSelector, GuiStackSelectorExtension>);
    flowX(width: number, preferred: number): void;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    reflowInternal(): void;
    reloadControls(): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.collection.GuiCheckList' {
  import { GuiRow } from 'team.creative.creativecore.common.gui.control.parent';
  import { GuiButton, GuiCheckBox } from 'team.creative.creativecore.common.gui.control.simple';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface GuiCheckListRow extends GuiRow {}
  class GuiCheckListRow extends GuiRow {
    readonly value: T;
    readonly removeButton: GuiButton;
    readonly checkBox: GuiCheckBox;
    constructor(value: T, title: Component[], selected: boolean);
  }

}

declare module 'team.creative.creativecore.common.gui.control.collection.GuiListBoxBase' {
  import { GuiButton } from 'team.creative.creativecore.common.gui.control.simple';

  interface GuiButtonRemove extends GuiButton {}
  class GuiButtonRemove extends GuiButton {
    index: number;
    constructor(index: number);
  }

}

declare module 'team.creative.creativecore.common.gui.control.collection.GuiStackSelector' {
  import { HashMapList } from 'team.creative.creativecore.common.util.type.map';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Player } from 'net.minecraft.world.entity.player';

  class StackCollector {
    selector: StackSelector;
    constructor(selector: StackSelector);
    collect(var1: Player): HashMapList<string, ItemStack>;
  }


  interface GuiBlockSelector extends SearchSelector {}
  class GuiBlockSelector extends SearchSelector {
    allow(stack: ItemStack): boolean;
  }


  interface SearchSelector extends StackSelector {}
  class SearchSelector extends StackSelector {
    search: string;
    allow(stack: ItemStack): boolean;
  }


  class StackSelector {
    allow(var1: ItemStack): boolean;
  }


  interface CreativeCollector extends InventoryCollector {}
  class CreativeCollector extends InventoryCollector {
    constructor(selector: StackSelector);
    collect(player: Player): HashMapList<string, ItemStack>;
  }


  interface InventoryCollector extends StackCollector {}
  class InventoryCollector extends StackCollector {
    constructor(selector: StackSelector);
    collect(player: Player): HashMapList<string, ItemStack>;
  }

}

declare module 'team.creative.creativecore.common.gui.control' {
  import { GuiControl } from 'team.creative.creativecore.common.gui';

  interface GuiFocusControl extends GuiControl {}
  class GuiFocusControl extends GuiControl {
    constructor(name: string);
    focus(): void;
    isFocused(): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
  }

}

declare module 'team.creative.creativecore.common.gui.control.inventory' {
  import { GuiParent, GuiControl } from 'team.creative.creativecore.common.gui';
  import { Container } from 'net.minecraft.world';
  import { BiFunction, Consumer, Supplier } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { Slot } from 'net.minecraft.world.inventory';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiManagerItem } from 'team.creative.creativecore.common.gui.manager';
  import { List, BitSet } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiSyncGlobal } from 'team.creative.creativecore.common.gui.sync';

  interface GuiInventoryGrid extends IGuiInventory, GuiParent {}
  class GuiInventoryGrid extends IGuiInventory {
    readonly container: Container;
    constructor(name: string, container: Container);

    constructor(name: string, container: Container, cols: number);

    constructor(name: string, container: Container, cols: number, rows: number);

    constructor(name: string, container: Container, cols: number, rows: number, slotFactory: BiFunction<Container, number, Slot>);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addListener(slot: Consumer<GuiSlot>): GuiInventoryGrid;
    disableSlot(index: number): GuiInventoryGrid;
    flowX(width: number, preferred: number): void;
    flowY(witdh: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    getSlot(index: number): GuiSlot;
    inventorySize(): number;
    setChanged(): void;
    setChanged(slotIndex: number): void;
    tick(): void;
  }


  interface GuiInventoryGridPreview extends GuiParent {}
  class GuiInventoryGridPreview extends GuiParent {
    readonly container: Container;
    constructor(name: string, container: Container);

    constructor(name: string, container: Container, cols: number);

    constructor(name: string, container: Container, cols: number, rows: number);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    flowX(width: number, preferred: number): void;
    flowY(witdh: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
  }


  interface GuiPlayerInventoryGrid extends GuiInventoryGrid {}
  class GuiPlayerInventoryGrid extends GuiInventoryGrid {
    constructor(player: Player);
    moveInside(toAdd: ItemStack, slot: number): ItemStack;
  }


  interface GuiSlot extends GuiSlotBase {}
  class GuiSlot extends GuiSlotBase {
    readonly slot: Slot;
    draggedIndex: number;
    constructor(container: Container, index: number);

    constructor(name: string, container: Container, index: number);

    constructor(slot: Slot);

    constructor(name: string, slot: Slot);
    changed(): void;
    get stack(): ItemStack;
    insert(stack: ItemStack): ItemStack;
    inventory(): IGuiInventory;
    itemManager(): GuiManagerItem;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseScrolled(x: number, y: number, delta: number): boolean;
    onSendUpdate(): void;
    tick(): void;
  }


  interface GuiSlotBase extends GuiControl {}
  class GuiSlotBase extends GuiControl {
    static readonly SLOT_SIZE: number;
    constructor(name: string);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get stack(): ItemStack;
    get tooltip(): Component[];
    init(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    tick(): void;
  }


  interface GuiSlotViewer extends GuiSlotBase {}
  class GuiSlotViewer extends GuiSlotBase {
    stack: ItemStack;
    constructor(name: string, stack: ItemStack);

    constructor(stack: ItemStack);
    get stack(): ItemStack;
    mouseClicked(x: number, y: number, button: number): boolean;
  }


  class IGuiInventory {
    static readonly SYNC: GuiSyncGlobal;
    static readonly SYNC_ALL: GuiSyncGlobal;
    extract(toDrain: ItemStack): void;
    getSlot(var1: number): GuiSlot;
    insert(toAdd: ItemStack, useEmptySlot: boolean): void;
    insert(toAdd: ItemStack, useEmptySlot: boolean, start: number, endExclusive: number): void;
    insertClever(toAdd: ItemStack): void;
    insertClever(toAdd: ItemStack, start: number, endExclusive: number): void;
    inventorySize(): number;
    moveInside(toAdd: ItemStack, slot: number): ItemStack;
    setChanged(): void;
    setChanged(var1: number): void;
    sync(set: BitSet): void;
    syncAll(): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.menu' {
  import { GuiScrollY } from 'team.creative.creativecore.common.gui.control.parent';
  import { NamedTree } from 'team.creative.creativecore.common.util.type.tree';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { GuiExtensionCreator } from 'team.creative.creativecore.common.gui.extension';
  import { GuiControl } from 'team.creative.creativecore.common.gui';
  import { Function, BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';

  interface GuiMenu<T = any> extends GuiScrollY {}
  class GuiMenu<T = any> extends GuiScrollY {
    constructor(tree: NamedTree<T>);
    closed(): void;
    get controlFormatting(): ControlFormatting;
    isRoot(): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    parentCreator(): GuiExtensionCreator<GuiControl, GuiMenu>;
    root(): GuiMenuRoot<T>;
  }


  interface GuiMenuRoot<T = any> extends GuiMenu<T> {}
  class GuiMenuRoot<T = any> extends GuiMenu<T> {
    constructor(tree: NamedTree<T>, parent: GuiExtensionCreator<GuiControl, GuiMenu>, title: Function<string, Component>, clicked: BiConsumer<string, T>);
    isRoot(): boolean;
    parentCreator(): GuiExtensionCreator<GuiControl, GuiMenu>;
    root(): GuiMenuRoot<T>;
    select(path: string, value: T): void;
    translate(path: string, hasValue: boolean): Component;
    static translate(text: string): string;
    static translate(text: string, ...parameters: any[]): string;
  }


  interface GuiMenuSub<T = any> extends GuiMenu<T> {}
  class GuiMenuSub<T = any> extends GuiMenu<T> {
    constructor(root: GuiMenuRoot<T>, tree: NamedTree<T>, parent: GuiExtensionCreator<GuiMenu, GuiMenu>);
    isRoot(): boolean;
    parentCreator(): GuiExtensionCreator<GuiControl, GuiMenu>;
    root(): GuiMenuRoot<T>;
  }

}

declare module 'team.creative.creativecore.common.gui.control.menu.GuiMenu' {
  import { GuiLabel } from 'team.creative.creativecore.common.gui.control.simple';
  import { NamedTree } from 'team.creative.creativecore.common.util.type.tree';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';

  interface GuiMenuEntry extends GuiLabel {}
  class GuiMenuEntry extends GuiLabel {
    folder: NamedTree;
    constructor(name: string, folder: NamedTree<T>);
    get controlFormatting(): ControlFormatting;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.parent' {
  import { GuiParent, GuiControl, VAlign, Align } from 'team.creative.creativecore.common.gui';
  import { GuiFlow, GuiSizeRule } from 'team.creative.creativecore.common.gui.flow';
  import { GuiLabel } from 'team.creative.creativecore.common.gui.control.simple';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { Supplier } from 'java.util.function';
  import { SmoothValue } from 'team.creative.creativecore.common.util.math.vec';
  import { ControlStyleFace } from 'team.creative.creativecore.common.gui.style.ControlFormatting';
  import { Iterable } from 'java.lang';
  import { GuiBorderlessButton } from 'team.creative.creativecore.common.gui.control.simple.GuiTabButton';

  interface GuiColumn extends GuiParent {}
  class GuiColumn extends GuiParent {
    constructor();

    constructor(flow: GuiFlow);

    constructor(width: number);

    constructor(width: number, flow: GuiFlow);
  }


  interface GuiLabeledControl extends GuiParent {}
  class GuiLabeledControl extends GuiParent {
    readonly label: GuiLabel;
    constructor(text: Component, control: GuiControl);

    constructor(translate: string, control: GuiControl);

    constructor(control: GuiControl);
    get innerControl<C extends GuiControl>(): C;
    setTitle(component: Component): GuiLabeledControl;
    setTitle(components: Component[]): GuiLabeledControl;
    setTooltip(tooltip: Component[]): GuiLabeledControl;
    setTooltip(text: string): GuiLabeledControl;
    setTranslate(translate: string): GuiLabeledControl;
    setTranslate(translate: string, ...params: any[]): GuiLabeledControl;
  }


  interface GuiLeftRightBox extends GuiRow {}
  class GuiLeftRightBox extends GuiRow {
    constructor();
    addColumn(col: GuiColumn): GuiRow;
    addLeft(control: GuiControl): GuiLeftRightBox;
    addRight(control: GuiControl): GuiLeftRightBox;
    isExpandableX(): boolean;
    setVAlign(valign: VAlign): GuiLeftRightBox;
  }


  interface GuiPanel extends GuiParent {}
  class GuiPanel extends GuiParent {
    constructor(name: string, flow: GuiFlow);

    constructor(name: string, flow: GuiFlow, valign: VAlign);

    constructor(name: string, flow: GuiFlow, align: Align, valign: VAlign);

    constructor(name: string);

    constructor();

    constructor(flow: GuiFlow);
    get controlFormatting(): ControlFormatting;
  }


  interface GuiRow extends GuiParent {}
  class GuiRow extends GuiParent {
    constructor();

    constructor(...cols: GuiColumn[]);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addColumn(col: GuiColumn): GuiRow;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    colCount(): number;
    getCol(index: number): GuiColumn;
    removeCol(index: number): GuiColumn;
  }


  interface GuiScrollX extends GuiParent {}
  class GuiScrollX extends GuiParent {
    maxScroll: number;
    scrolled: SmoothValue;
    dragged: boolean;
    scrollbarHeight: number;
    hoveredScroll: boolean;
    constructor();

    constructor(name: string);
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get offsetX(): number;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, scrolled: number): boolean;
    needsScrollbar(): boolean;
    onScrolled(): void;
    scroll(scrolled: number): void;
    setDim(width: number, height: number): GuiScrollX;
    setDim(dim: GuiSizeRule): GuiScrollX;
    setExpandable(): GuiScrollX;
    setHover(hover: boolean): GuiScrollX;
    setHovered(): GuiScrollX;
  }


  interface GuiScrollXY extends GuiParent {}
  class GuiScrollXY extends GuiParent {
    maxScrollX: number;
    scrolledX: SmoothValue;
    draggedX: boolean;
    maxScrollY: number;
    scrolledY: SmoothValue;
    draggedY: boolean;
    scrollbarThickness: number;
    scrollbarFace: ControlStyleFace;
    alternativeScrolling: boolean;
    constructor();

    constructor(name: string);

    constructor(name: string, flow: GuiFlow);
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get offsetX(): number;
    get offsetY(): number;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, scrolled: number): boolean;
    needsScrollbarX(): boolean;
    needsScrollbarY(): boolean;
    onScrolledX(): void;
    onScrolledY(): void;
    scroll(scrolled: number): void;
  }


  interface GuiScrollY extends GuiParent {}
  class GuiScrollY extends GuiParent {
    maxScroll: number;
    scrolled: SmoothValue;
    dragged: boolean;
    scrollbarWidth: number;
    hoveredScroll: boolean;
    constructor();

    constructor(name: string);
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get offsetY(): number;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, scrolled: number): boolean;
    needsScrollbar(): boolean;
    onScrolled(): void;
    scroll(scrolled: number): void;
    setDim(width: number, height: number): GuiScrollY;
    setDim(dim: GuiSizeRule): GuiScrollY;
    setExpandable(): GuiScrollY;
    setHover(hover: boolean): GuiScrollY;
    setHovered(): GuiScrollY;
  }


  interface GuiTable extends GuiParent {}
  class GuiTable extends GuiParent {
    constructor(name: string);

    constructor();

    constructor(...rows: GuiRow[]);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addRow(row: GuiRow): GuiTable;
    flowX(width: number, preferred: number): void;
    setExpandable(): GuiTable;
  }


  interface GuiTableScrollable extends GuiParent {}
  class GuiTableScrollable extends GuiParent {
    constructor();

    constructor(name: string);
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addRow(row: GuiRow): GuiTableScrollable;
    contentRows(): Iterable<GuiRow>;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get topRow(): GuiRow;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
    removeContentCol(index: number): void;
    setExpandable(): GuiTableScrollable;
  }


  interface GuiTabs extends GuiParent {}
  class GuiTabs extends GuiParent {
    constructor(name: string);
    createTab(component: Component): GuiParent;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    getTab(index: number): GuiParent;
    getTabButton(index: number): GuiBorderlessButton;
    index(): number;
    select(select: number): void;
  }


  interface GuiTabsMapped<K = any> extends GuiTabs {}
  class GuiTabsMapped<K = any> extends GuiTabs {
    constructor(name: string);
    createTab(component: Component): GuiParent;
    createTab(key: K, component: Component): GuiParent;
    get selected(): K;
    getSelected(defaultValue: K): K;
    select(key: K): void;
    select(select: number): void;
  }


  interface GuiTopBottomBox extends GuiParent {}
  class GuiTopBottomBox extends GuiParent {
    readonly top: GuiParent;
    readonly bottom: GuiParent;
    constructor();
    add(control: GuiControl): GuiParent;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addBottom(control: GuiControl): GuiTopBottomBox;
    addHover(control: GuiControl): GuiParent;
    addHover(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    addTop(control: GuiControl): GuiTopBottomBox;
  }

}

declare module 'team.creative.creativecore.common.gui.control.parent.GuiColumn' {
  import { GuiColumn } from 'team.creative.creativecore.common.gui.control.parent';
  import { GuiFlow } from 'team.creative.creativecore.common.gui.flow';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';

  interface GuiColumnHeader extends GuiColumn {}
  class GuiColumnHeader extends GuiColumn {
    constructor();

    constructor(flow: GuiFlow);

    constructor(width: number);

    constructor(width: number, flow: GuiFlow);
    get controlFormatting(): ControlFormatting;
  }

}

declare module 'team.creative.creativecore.common.gui.control.parent.GuiTable' {
  import { GuiControlRect, GuiControl } from 'team.creative.creativecore.common.gui';
  import { List } from 'java.util';

  interface GuiTableGroup extends GuiControlRect {}
  class GuiTableGroup extends GuiControlRect {
    readonly controls: List;
    constructor();
    flowX(): void;
    flowY(): void;
    getMaxHeight(availableHeight: number): number;
    static getMaxHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMaxWidth(availableWidth: number): number;
    static getMaxWidth(control: GuiControl, availableWidth: number): number;
    getMinHeight(availableHeight: number): number;
    static getMinHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMinWidth(availableWidth: number): number;
    static getMinWidth(control: GuiControl, availableWidth: number): number;
    getPreferredHeight(availableHeight: number): number;
    static getPreferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    getPreferredWidth(availableWidth: number): number;
    static getPreferredWidth(control: GuiControl, availableWidth: number): number;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
    setHeight(height: number, availableHeight: number): number;
    setWidth(width: number, availableWidth: number): number;
    setX(x: number): void;
    setY(y: number): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.parent.GuiTabs' {
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiBorderlessButton } from 'team.creative.creativecore.common.gui.control.simple.GuiTabButton';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';

  interface GuiTabBar extends GuiParent {}
  class GuiTabBar extends GuiParent {
    constructor(name: string);
    addTab(component: Component, index: number): void;
    get controlFormatting(): ControlFormatting;
    getTab(index: number): GuiBorderlessButton;
    highlight(index: number): void;
    removeTab(index: number): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.simple' {
  import { Consumer, Supplier, LongConsumer, LongSupplier, Predicate } from 'java.util.function';
  import { Integer, Boolean } from 'java.lang';
  import { ControlFormatting, Icon, GuiStyle } from 'team.creative.creativecore.common.gui.style';
  import { TextMapBuilder, IComponentMap } from 'team.creative.creativecore.common.util.text';
  import { StyleDisplay } from 'team.creative.creativecore.common.gui.style.display';
  import { Color } from 'team.creative.creativecore.common.util.type';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { GuiSizeRule } from 'team.creative.creativecore.common.gui.flow';
  import { ColorPart } from 'team.creative.creativecore.common.util.mc.ColorUtils';
  import { GuiParent, GuiControl, Align, VAlign, IGuiParent, GuiLayer } from 'team.creative.creativecore.common.gui';
  import { GuiEvent } from 'team.creative.creativecore.common.gui.event';
  import { DecimalFormat } from 'java.text';
  import { CompiledText } from 'team.creative.creativecore.client.render.text';
  import { DoubleValueParser, LongValueParser, IntValueParser } from 'team.creative.creativecore.common.gui.parser';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { GuiFocusControl } from 'team.creative.creativecore.common.gui.control';

  interface GuiArraySlider extends GuiSteppedSlider {}
  class GuiArraySlider extends GuiSteppedSlider {
    values: string[];
    constructor(name: string, value: string, ...values: string[]);

    constructor(name: string);
    get (): string;
    get textByValue(): string;
    select(value: string): void;
    setValues(values: string[]): void;
  }


  interface GuiButton extends GuiLabel {}
  class GuiButton extends GuiLabel {
    constructor(name: string, pressed: Consumer<number>);
    get controlFormatting(): ControlFormatting;
    mouseClicked(x: number, y: number, button: number): boolean;
    setPressed(pressed: Consumer<number>): void;
  }


  interface GuiButtonContext extends GuiButton {}
  class GuiButtonContext extends GuiButton {
    constructor(name: string, map: TextMapBuilder<Consumer<number>>);
    get controlFormatting(): ControlFormatting;
    mouseMoved(x: number, y: number): void;
    mouseMoved(x: number, y: number): void;
  }


  interface GuiButtonHold extends GuiButton {}
  class GuiButtonHold extends GuiButton {
    static readonly INITIAL_WAIT: number;
    static readonly CONTINOUS_WAIT: number;
    clicked: number;
    inital: boolean;
    wait: number;
    constructor(name: string, pressed: Consumer<number>);
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    tick(): void;
  }


  interface GuiButtonHoldSlim extends GuiButtonHold {}
  class GuiButtonHoldSlim extends GuiButtonHold {
    constructor(name: string, pressed: Consumer<number>);
    get controlFormatting(): ControlFormatting;
  }


  interface GuiButtonIcon extends GuiIcon {}
  class GuiButtonIcon extends GuiIcon {
    constructor(name: string, icon: Icon, pressed: Consumer<number>);
    get controlFormatting(): ControlFormatting;
    getBackground(style: GuiStyle, display: StyleDisplay): StyleDisplay;
    mouseClicked(x: number, y: number, button: number): boolean;
    set controlFormatting(formatting: ControlFormatting);
    setColor(color: Color): GuiButtonIcon;
    setIcon(icon: Icon): GuiButtonIcon;
    setShadow(colorShadow: Color): GuiButtonIcon;
    setSquared(squared: boolean): GuiButtonIcon;
  }


  interface GuiCheckBox extends GuiLabel {}
  class GuiCheckBox extends GuiLabel {
    static readonly CHECKBOX_WIDTH: number;
    value: boolean;
    partial: boolean;
    changed: Consumer;
    constructor(name: string, value: boolean);
    consumeChanged(changed: Consumer<boolean>): GuiCheckBox;
    get controlFormatting(): ControlFormatting;
    mouseClicked(x: number, y: number, button: number): boolean;
    set(value: boolean): void;
    setTitle(component: Component): GuiCheckBox;
    setTitle(components: Component[]): GuiCheckBox;
    setTranslate(translate: string): GuiCheckBox;
    setTranslate(translate: string, ...params: any[]): GuiLabel;
  }


  interface GuiCheckButtonIcon extends GuiButtonIcon {}
  class GuiCheckButtonIcon extends GuiButtonIcon {
    value: boolean;
    constructor(name: string, on: Icon, off: Icon, state: boolean);

    constructor(name: string, on: Icon, off: Icon, state: boolean, pressed: Consumer<number>);
    get state(): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    set state(value: boolean);
    setColor(color: Color): GuiCheckButtonIcon;
    setDim(dim: GuiSizeRule): GuiCheckButtonIcon;
    setDim(width: number, height: number): GuiCheckButtonIcon;
    setOffIcon(icon: Icon): GuiCheckButtonIcon;
    setOnIcon(icon: Icon): GuiCheckButtonIcon;
    setShadow(shadow: Color): GuiCheckButtonIcon;
    setSquared(squared: boolean): GuiCheckButtonIcon;
  }


  interface GuiColoredSteppedSlider extends GuiSteppedSlider {}
  class GuiColoredSteppedSlider extends GuiSteppedSlider {
    picker: GuiColorPicker;
    part: ColorPart;
    constructor(name: string, picker: GuiColorPicker, part: ColorPart);
    setValue(value: number): void;
  }


  interface GuiColorPicker extends GuiParent {}
  class GuiColorPicker extends GuiParent {
    color: Color;
    constructor(name: string, color: Color, hasAlpha: boolean, alphaMin: number);
    get controlFormatting(): ControlFormatting;
    onColorChanged(): void;
    setColor(color: Color): void;
  }


  interface GuiColorPlate extends GuiControl {}
  class GuiColorPlate extends GuiControl {
    constructor(name: string, color: Color);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get color(): Color;
    get controlFormatting(): ControlFormatting;
    init(): void;
    set color(color: Color);
    tick(): void;
  }


  interface GuiCounter extends GuiParent {}
  class GuiCounter extends GuiParent {
    min: number;
    max: number;
    readonly buttons: GuiParent;
    textfield: GuiTextfield;
    readonly buttonsFormatting: ControlFormatting;
    constructor(name: string, value: number);

    constructor(name: string, value: number, min: number, max: number);

    constructor(name: string, value: number, min: number, max: number, buttonsFormatting: ControlFormatting);
    add(control: GuiControl): GuiCounter;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    get minusButton(): GuiButtonHoldSlim;
    get plusButton(): GuiButtonHoldSlim;
    get value(): number;
    isExpandableX(): boolean;
    raiseEvent(event: GuiEvent): void;
    resetTextfield(): void;
    set value(value: number);
    setSpacing(spacing: number): GuiCounter;
    stepDown(value: number): number;
    stepUp(value: number): number;
  }


  interface GuiCounterDecimal extends GuiParent {}
  class GuiCounterDecimal extends GuiParent {
    static readonly FORMAT: DecimalFormat;
    min: number;
    max: number;
    readonly buttons: GuiParent;
    textfield: GuiTextfield;
    stepAmount: number;
    readonly buttonsFormatting: ControlFormatting;
    constructor(name: string, value: number);

    constructor(name: string, value: number, min: number, max: number);

    constructor(name: string, value: number, min: number, max: number, buttonsFormatting: ControlFormatting);
    add(control: GuiControl): GuiCounterDecimal;
    add(conditional: boolean, controlSupplier: Supplier<GuiControl>): GuiParent;
    get controlFormatting(): ControlFormatting;
    get controlFormatting(): ControlFormatting;
    get controlFormatting(): ControlFormatting;
    get format(): DecimalFormat;
    get minusButton(): GuiButtonHoldSlim;
    get plusButton(): GuiButtonHoldSlim;
    get value(): number;
    isExpandableX(): boolean;
    raiseEvent(event: GuiEvent): void;
    resetTextfield(): void;
    set value(value: number);
    setSpacing(spacing: number): GuiCounterDecimal;
    setStep(amount: number): GuiCounterDecimal;
    stepDown(): void;
    stepUp(): void;
  }


  interface GuiDuration extends GuiParent {}
  class GuiDuration extends GuiParent {
    static readonly TICKS_PER_SECOND: number;
    static readonly TICKS_PER_MINUTE: number;
    static readonly TICKS_PER_HOUR: number;
    static readonly TICKS_PER_DAY: number;
    constructor(name: string, ticks: number, showDays: boolean, showHours: boolean, showMinutes: boolean, showSeconds: boolean);
    get duration(): number;
    set duration(ticks: number);
  }


  interface GuiIcon extends GuiControl {}
  class GuiIcon extends GuiControl {
    constructor(name: string, icon: Icon);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    getBackground(style: GuiStyle, display: StyleDisplay): StyleDisplay;
    init(): void;
    setColor(color: Color): GuiIcon;
    setDim(width: number, height: number): GuiIcon;
    setDim(dim: GuiSizeRule): GuiIcon;
    setIcon(icon: Icon): GuiIcon;
    setShadow(shadowColor: Color): GuiIcon;
    setSquared(squared: boolean): GuiIcon;
    tick(): void;
  }


  interface GuiLabel extends GuiControl {}
  class GuiLabel extends GuiControl {
    constructor(name: string);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    init(): void;
    setAlign(align: Align): GuiLabel;
    setDefaultColor(color: number): GuiLabel;
    setDropShadow(shadow: boolean): GuiLabel;
    setScale(scale: number): GuiLabel;
    setText(text: CompiledText): GuiLabel;
    setTitle(component: Component): GuiLabel;
    setTitle(components: Component[]): GuiLabel;
    setTranslate(translate: string): GuiLabel;
    setTranslate(translate: string, ...params: any[]): GuiLabel;
    setVAlign(valgin: VAlign): GuiLabel;
    tick(): void;
  }


  interface GuiLabelHover extends GuiLabel {}
  class GuiLabelHover extends GuiLabel {
    darken: number;
    constructor(name: string);
  }


  interface GuiProgressbar extends GuiControl {}
  class GuiProgressbar extends GuiControl {
    pos: number;
    max: number;
    showToolTip: boolean;
    readonly parser: DoubleValueParser;
    constructor(name: string, pos: number, max: number);

    constructor(name: string, pos: number, max: number, valueParser: DoubleValueParser);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get percentage(): number;
    get tooltip(): Component[];
    init(): void;
    tick(): void;
  }


  interface GuiRowLabel extends GuiLabel {}
  class GuiRowLabel extends GuiLabel {
    readonly index: number;
    readonly consumer: Consumer;
    readonly selected: boolean;
    constructor(name: string, index: number, selected: boolean, consumer: Consumer<number>);
    mouseClicked(x: number, y: number, button: number): boolean;
    set(text: CompiledText): GuiRowLabel;
  }


  interface GuiSeekBar extends GuiControl {}
  class GuiSeekBar extends GuiControl {
    timeUpdate: LongConsumer;
    lastTimeUpdate: LongConsumer;
    readonly parser: LongValueParser;
    grabbedSlider: boolean;
    constructor(name: string, posSupplier: LongSupplier, maxSupplier: LongSupplier);

    constructor(name: string, posSupplier: LongSupplier, maxSupplier: LongSupplier, parser: LongValueParser);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    init(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    setOnLastTimeUpdate(consumer: LongConsumer): GuiSeekBar;
    setOnTimeUpdate(consumer: LongConsumer): GuiSeekBar;
    setPosition(value: number): void;
    setTooltip(tooltip: Component[]): GuiSeekBar;
    setTooltip(translate: string): GuiControl;
    tick(): void;
  }


  interface GuiShowItem extends GuiControl {}
  class GuiShowItem extends GuiControl {
    stack: ItemStack;
    constructor(name: string);

    constructor(name: string, stack: ItemStack);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    init(): void;
    tick(): void;
  }


  interface GuiSlider extends IGuiParent, GuiControl {}
  class GuiSlider extends IGuiParent {
    sliderSize: number;
    constructor(name: string, value: number, min: number, max: number);

    constructor(name: string, value: number, min: number, max: number, parser: DoubleValueParser);
    charTyped(codePoint: string, modifiers: number): boolean;
    closeLayer(layer: GuiLayer): void;
    closeTextField(): void;
    closeTopLayer(): void;
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get maxValue(): number;
    get minValue(): number;
    get percentage(): number;
    get textByValue(): string;
    get textfieldValue(): string;
    get value(): number;
    init(): void;
    isContainer(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    looseFocus(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    set maxValue(maxValue: number);
    set minValue(minValue: number);
    set value(value: number);
    setEnabled(enabled: boolean): GuiControl;
    setMaxSlider(slider: GuiSlider): GuiSlider;
    setMinSlider(slider: GuiSlider): GuiSlider;
    setSliderSize(size: number): GuiSlider;
    tick(): void;
    toLayerRect(control: GuiControl, rect: Rect): Rect;
    toLayerRect(rect: Rect): Rect;
    toScreenRect(control: GuiControl, rect: Rect): Rect;
    toScreenRect(rect: Rect): Rect;
  }


  interface GuiStateButton<K = any> extends GuiButton {}
  class GuiStateButton<K = any> extends GuiButton {
    constructor(name: string, map: IComponentMap<K>);

    constructor(name: string, index: number, map: IComponentMap<K>);

    constructor(name: string, value: K, map: IComponentMap<K>);
    closed(): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    indexOf(key: K): number;
    next(): void;
    preferredHeight(width: number, availableHeight: number): number;
    preferredWidth(availableWidth: number): number;
    previous(): void;
    select(index: number): void;
    select(key: K): void;
    selected(): K;
    selected(defaultValue: K): K;
    set(builder: IComponentMap<K>): void;
    tick(): void;
  }


  interface GuiStateButtonIcon extends GuiButtonIcon {}
  class GuiStateButtonIcon extends GuiButtonIcon {
    readonly states: Icon[];
    constructor(name: string, ...icons: Icon[]);
    get state(): number;
    mouseClicked(x: number, y: number, button: number): boolean;
    nextState(): void;
    previousState(): void;
    set state(index: number);
    setColor(color: Color): GuiStateButtonIcon;
    setControlFormatting(formatting: ControlFormatting): GuiStateButtonIcon;
    setShadow(shadow: Color): GuiStateButtonIcon;
  }


  interface GuiSteppedSlider extends GuiSlider {}
  class GuiSteppedSlider extends GuiSlider {
    constructor(name: string, value: number, min: number, max: number);

    constructor(name: string, value: number, min: number, max: number, parser: IntValueParser);
    get intMaxValue(): number;
    get intMinValue(): number;
    get intValue(): number;
    get maxValue(): number;
    get minValue(): number;
    get textByValue(): string;
    get textfieldValue(): string;
    get value(): number;
    mouseMoved(x: number, y: number): void;
    mouseScrolled(x: number, y: number, scrolled: number): boolean;
    set maxValue(maxValue: number);
    set minValue(minValue: number);
    set value(value: number);
    stepDown(): void;
    stepUp(): void;
  }


  interface GuiTabButton<K = any> extends GuiParent {}
  class GuiTabButton<K = any> extends GuiParent {
    static readonly BUTTON_ACTIVE: ControlFormatting;
    static readonly BUTTON_INACTIVE: ControlFormatting;
    constructor(name: string, states: IComponentMap);

    constructor(name: string, index: number, map: IComponentMap);
    get controlFormatting(): ControlFormatting;
    index(): number;
    indexOf(key: K): number;
    next(): void;
    previous(): void;
    select(index: number): void;
    select(key: K): void;
    selected(): K;
    selected(defaultValue: K): K;
    set(builder: IComponentMap<K>): void;
  }


  interface GuiTextfield extends GuiFocusControl {}
  class GuiTextfield extends GuiFocusControl {
    constructor(name: string);

    constructor(name: string, text2: string);

    constructor(name: string, text2: string, maxStringLength: number);
    canWrite(): boolean;
    charTyped(codePoint: string, modifiers: number): boolean;
    clampCursorPosition(pos: number): void;
    closed(): void;
    deleteFromCursor(num: number): void;
    deleteWords(num: number): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get cursorPosition(): number;
    get selectedText(): string;
    get text(): string;
    getNthWordFromCursor(numWords: number): number;
    init(): void;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(mouseX: number, mouseY: number, button: number): boolean;
    moveCursorBy(num: number): void;
    parseDouble(): number;
    parseFloat(): number;
    parseInteger(): number;
    set cursorPosition(pos: number);
    set text(textIn: string);
    setCursorPositionEnd(): void;
    setCursorPositionZero(): void;
    setDim(width: number, height: number): GuiTextfield;
    setDim(width: number): GuiTextfield;
    setDim(dim: GuiSizeRule): GuiControl;
    setFloatOnly(): GuiTextfield;
    setMaxStringLength(length: number): GuiTextfield;
    setNumbersIncludingNegativeOnly(): GuiTextfield;
    setNumbersOnly(): GuiTextfield;
    setSelectionPos(position: number): void;
    setSuggestion(p_195612_1_: string): GuiTextfield;
    setValidator(validatorIn: Predicate<string>): void;
    tick(): void;
    writeText(textToWrite: string): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.simple.GuiTabButton' {
  import { GuiButton } from 'team.creative.creativecore.common.gui.control.simple';
  import { Consumer } from 'java.util.function';
  import { Integer } from 'java.lang';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';

  interface GuiBorderlessButton<K = any> extends GuiButton {}
  class GuiBorderlessButton<K = any> extends GuiButton {
    active: boolean;
    constructor(name: string, pressed: Consumer<number>, value: K);
    get controlFormatting(): ControlFormatting;
  }

}

declare module 'team.creative.creativecore.common.gui.control.timeline' {
  import { GuiParent, GuiControl } from 'team.creative.creativecore.common.gui';
  import { StyleDisplay } from 'team.creative.creativecore.common.gui.style.display';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';
  import { MutableComponent, Component } from 'net.minecraft.network.chat';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { List } from 'java.util';
  import { Iterable, Double, Comparable } from 'java.lang';

  class GuiAnimationHandler {
    get (): number;
    loop(var1: boolean): void;
    pause(): void;
    play(): void;
    set (var1: number);
    stop(): void;
  }


  interface GuiTimeline extends GuiParent {}
  class GuiTimeline extends GuiParent {
    cursorHighlight: StyleDisplay;
    readonly handler: GuiAnimationHandler;
    constructor(handler: GuiAnimationHandler);
    addGuiTimelineChannel(title: MutableComponent, channel: GuiTimelineChannel): GuiTimelineChannel;
    adjustKeyPositionX(key: GuiTimelineKey): void;
    adjustKeysPositionX(): void;
    deselect(): void;
    get controlFormatting(): ControlFormatting;
    get duration(): number;
    getTimeAt(x: number): number;
    getTimeAtAimed(x: number): number;
    isExpandableX(): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseScrolled(x: number, y: number, delta: number): boolean;
    removeChannel(channel: GuiTimelineChannel): void;
    render(graphics: GuiGraphics, controlRect: Rect, realRect: Rect, scale: number, mouseX: number, mouseY: number): void;
    scroll(scrolled: number): void;
    scrolled(width: number, x: number, delta: number): void;
    scrolledX(): number;
    selectKey(key: GuiTimelineKey): void;
    set duration(duration: number);
    setSidebarWidth(sidebarWidth: number): void;
  }


  interface GuiTimelineChannel<T = any> extends GuiParent {}
  class GuiTimelineChannel<T = any> extends GuiParent {
    readonly timeline: GuiTimeline;
    sidebarTitle: GuiControl;
    constructor(timeline: GuiTimeline);
    addKey(tick: number, value: T): GuiTimelineKey<T>;
    addKeyFixed(tick: number, value: T): GuiTimelineChannel<T>;
    deslect(): void;
    dragKey(key: GuiTimelineKey<T>): void;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    get first(): GuiTimelineKey<T>;
    get last(): GuiTimelineKey<T>;
    get offsetX(): number;
    isChannelEmpty(): boolean;
    isSpaceFor(key: GuiTimelineKey<T>, tick: number): boolean;
    keys(): Iterable<GuiTimelineKey<T>>;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, delta: number): boolean;
    movedKey(key: GuiTimelineKey<T>): void;
    removeChannel(): void;
    removeKey(key: GuiTimelineKey<T>): void;
    select(key: GuiTimelineKey<T>): void;
    setTooltip(tooltip: Component[]): GuiTimelineChannel<T>;
    setTooltip(translate: string): GuiControl;
  }


  interface GuiTimelineChannelDouble extends GuiTimelineChannel<number> {}
  class GuiTimelineChannelDouble extends GuiTimelineChannel<number> {
    constructor(timeline: GuiTimeline);
  }


  interface GuiTimelineKey<T = any> extends Comparable<GuiTimelineKey>, GuiControl {}
  class GuiTimelineKey<T = any> extends Comparable<GuiTimelineKey> {
    static readonly DRAG_TIME: number;
    channel: GuiTimelineChannel;
    modifiable: boolean;
    tick: number;
    value: T;
    constructor(channel: GuiTimelineChannel, tick: number, value: T);
    closed(): void;
    compareTo(o: GuiTimelineKey): number;
    createChildRect(contentRect: Rect, scale: number, xOffset: number, yOffset: number): Rect;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get controlFormatting(): ControlFormatting;
    init(): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number, time: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    removeKey(): void;
    render(graphics: GuiGraphics, controlRect: Rect, realRect: Rect, scale: number, mouseX: number, mouseY: number): void;
    setSelected(selected: boolean): void;
    tick(): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.timeline.GuiTimeline' {
  import { GuiColumnHeader } from 'team.creative.creativecore.common.gui.control.parent.GuiColumn';
  import { GuiControlEvent } from 'team.creative.creativecore.common.gui.event';
  import { GuiTimelineKey, GuiTimeline } from 'team.creative.creativecore.common.gui.control.timeline';

  interface GuiTimelineHeader extends GuiColumnHeader {}
  class GuiTimelineHeader extends GuiColumnHeader {
    dragged: boolean;
    constructor();
    flowX(width: number, preferred: number): void;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    mouseScrolled(x: number, y: number, delta: number): boolean;
  }


  interface KeySelectedEvent extends GuiControlEvent<GuiTimelineKey> {}
  class KeySelectedEvent extends GuiControlEvent<GuiTimelineKey> {
    constructor(source: GuiTimelineKey);
    cancelable(): boolean;
  }


  interface NoKeySelectedEvent extends GuiControlEvent<GuiTimeline> {}
  class NoKeySelectedEvent extends GuiControlEvent<GuiTimeline> {
    constructor(timeline: GuiTimeline);
    cancelable(): boolean;
  }

}

declare module 'team.creative.creativecore.common.gui.control.tree' {
  import { GuiScrollXY } from 'team.creative.creativecore.common.gui.control.parent';
  import { Iterable } from 'java.lang';
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ControlFormatting } from 'team.creative.creativecore.common.gui.style';

  interface GuiTree extends GuiScrollXY {}
  class GuiTree extends GuiScrollXY {
    constructor(name: string);

    constructor(name: string, searchbar: boolean);
    allItems(): Iterable<GuiTreeItem>;
    endDrag(): boolean;
    flowX(width: number, preferred: number): void;
    flowY(width: number, height: number, preferred: number): void;
    get first(): GuiTreeItem;
    hasCheckboxes(): boolean;
    hasCheckboxesPartial(): boolean;
    isDragged(): boolean;
    itemsChecked(): Iterable<GuiTreeItem>;
    keepSelected(): GuiTree;
    mouseClicked(x: number, y: number, button: number): boolean;
    moveDown(): boolean;
    moveUp(): boolean;
    performModication(item: GuiTreeItem, position: GuiTreeDragPosition): boolean;
    reflowTree(): void;
    root(): GuiTreeItem;
    select(item: GuiTreeItem): void;
    selectFirst(): boolean;
    selected(): GuiTreeItem;
    setCheckboxes(checkboxes: boolean, partial: boolean): GuiTree;
    setLineThickness(thickness: number): void;
    setRootVisibility(visible: boolean): GuiTree;
    startDrag(item: GuiTreeItem): void;
    updateTree(): void;
  }


  interface GuiTreeItem extends GuiParent {}
  class GuiTreeItem extends GuiParent {
    readonly tree: GuiTree;
    constructor(name: string, tree: GuiTree);
    addItem(item: GuiTreeItem): void;
    added(): void;
    clearItems(): void;
    get controlFormatting(): ControlFormatting;
    get level(): number;
    get parentItem(): GuiTreeItem;
    getItem(index: number): GuiTreeItem;
    indexOf(item: GuiTreeItem): number;
    insertItem(before: GuiTreeItem, item: GuiTreeItem): void;
    insertItem(index: number, item: GuiTreeItem): void;
    insertItemAfter(before: GuiTreeItem, item: GuiTreeItem): void;
    insertItemAfter(index: number, item: GuiTreeItem): void;
    isAtLeastPartiallyChecked(): boolean;
    isChecked(): boolean;
    isChild(item: GuiTreeItem): boolean;
    isMoving(): boolean;
    items(): Iterable<GuiTreeItem>;
    itemsChecked(): Iterable<GuiTreeItem>;
    itemsCount(): number;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDoubleClicked(x: number, y: number, button: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    opened(): boolean;
    removeItem(item: GuiTreeItem): boolean;
    removed(): void;
    resetCheckboxPartial(): void;
    selected(): boolean;
    setMoving(moving: boolean): void;
    setTitle(component: Component): GuiTreeItem;
    setTitle(components: Component[]): GuiTreeItem;
    setTranslate(translate: string): GuiTreeItem;
    testForDoubleClick(x: number, y: number, button: number): boolean;
    toggle(): void;
  }

}

declare module 'team.creative.creativecore.common.gui.control.tree.GuiTree' {
  import { GuiControlChangedEvent } from 'team.creative.creativecore.common.gui.event';
  import { GuiTreeItem, GuiTree } from 'team.creative.creativecore.common.gui.control.tree';

  interface GuiTreeSelectionChanged extends GuiControlChangedEvent {}
  class GuiTreeSelectionChanged extends GuiControlChangedEvent {
    readonly previousSelected: GuiTreeItem;
    readonly selected: GuiTreeItem;
    constructor(tree: GuiTree, previousSelected: GuiTreeItem, selected: GuiTreeItem);
  }

}

declare module 'team.creative.creativecore.common.gui.control.tree.GuiTreeDragPosition' {
  import { Enum } from 'java.lang';
  import { GuiTreeItem } from 'team.creative.creativecore.common.gui.control.tree';
  import { List } from 'java.util';

  interface ItemPosition extends Enum<ItemPosition> {}
  class ItemPosition extends Enum<ItemPosition> {
    static readonly ABOVE: ItemPosition;
    static readonly IN: ItemPosition;
    static readonly BELOW: ItemPosition;
    insert(var1: GuiTreeItem, var2: GuiTreeItem): void;
    static valueOf(name: string): ItemPosition;
    static values(): ItemPosition[];
  }

}

declare module 'team.creative.creativecore.common.gui.creator' {
  import { GuiLayer } from 'team.creative.creativecore.common.gui';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Player } from 'net.minecraft.world.entity.player';
  import { NamedHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { GuiCreatorItem, GuiCreatorBlock } from 'team.creative.creativecore.common.gui.creator.GuiCreator';
  import { BiFunction } from 'java.util.function';

  class BlockGuiCreator {
    create(var1: CompoundTag, var2: Level, var3: BlockPos, var4: BlockState, var5: Player): GuiLayer;
  }


  class GuiCreator {
    static readonly REGISTRY: NamedHandlerRegistry;
    static readonly ITEM_OPENER: GuiCreatorItem;
    static readonly BLOCK_OPENER: GuiCreatorBlock;
    readonly function: BiFunction;
    constructor(functionParameter: BiFunction<CompoundTag, Player, GuiLayer>);
    get name(): string;
    static openClientSide(layer: GuiLayer): void;
    static register<T extends GuiCreator>(name: string, creator: T): T;
  }


  class ItemGuiCreator {
    create(var1: CompoundTag, var2: Player): GuiLayer;
  }

}

declare module 'team.creative.creativecore.common.gui.creator.GuiCreator' {
  import { GuiCreator } from 'team.creative.creativecore.common.gui.creator';
  import { Player } from 'net.minecraft.world.entity.player';
  import { InteractionHand } from 'net.minecraft.world';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { BlockPos } from 'net.minecraft.core';
  import { BiFunction } from 'java.util.function';
  import { GuiLayer } from 'team.creative.creativecore.common.gui';

  interface GuiCreatorItem extends GuiCreator {}
  class GuiCreatorItem extends GuiCreator {
    constructor();
    open(player: Player, hand: InteractionHand): void;
    open(nbt: CompoundTag, player: Player, hand: InteractionHand): void;
  }


  interface GuiCreatorBlock extends GuiCreator {}
  class GuiCreatorBlock extends GuiCreator {
    constructor();
    open(player: Player, pos: BlockPos): void;
    open(nbt: CompoundTag, player: Player, pos: BlockPos): void;
  }


  interface GuiCreatorBasic extends GuiCreator {}
  class GuiCreatorBasic extends GuiCreator {
    constructor(functionParameter: BiFunction<CompoundTag, Player, GuiLayer>);
    open(player: Player): void;
    open(nbt: CompoundTag, player: Player): void;
  }

}

declare module 'team.creative.creativecore.common.gui.dialog' {
  import { GuiLayer } from 'team.creative.creativecore.common.gui';
  import { DialogButton } from 'team.creative.creativecore.common.gui.dialog.DialogGuiLayer';
  import { BiConsumer } from 'java.util.function';
  import { Component } from 'net.minecraft.network.chat';
  import { GuiSyncGlobalLayer } from 'team.creative.creativecore.common.gui.sync';
  import { IGuiIntegratedParent } from 'team.creative.creativecore.common.gui.integration';

  interface DialogGuiLayer extends GuiLayer {}
  class DialogGuiLayer extends GuiLayer {
    buttons: DialogButton[];
    onClicked: BiConsumer;
    title: Component;
    constructor(name: string, title: Component, onClicked: BiConsumer<DialogGuiLayer, DialogButton>, ...buttons: DialogButton[]);
    closeDialog(button: DialogButton): void;
    create(): void;
  }


  class GuiDialogHandler {
    static readonly DIALOG_HANDLER: GuiSyncGlobalLayer;
    static init(): void;
    static openDialog(parent: IGuiIntegratedParent, name: string, onClicked: BiConsumer<DialogGuiLayer, DialogButton>, ...buttons: DialogButton[]): GuiLayer;
    static openDialog(parent: IGuiIntegratedParent, name: string, title: Component, onClicked: BiConsumer<DialogGuiLayer, DialogButton>, ...buttons: DialogButton[]): GuiLayer;
  }

}

declare module 'team.creative.creativecore.common.gui.dialog.DialogGuiLayer' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface DialogButton extends Enum<DialogButton> {}
  class DialogButton extends Enum<DialogButton> {
    static readonly OK: DialogButton;
    static readonly YES: DialogButton;
    static readonly NO: DialogButton;
    static readonly MAYBE: DialogButton;
    static readonly CANCEL: DialogButton;
    static readonly ABORT: DialogButton;
    static readonly CONFIRM: DialogButton;
    static valueOf(name: string): DialogButton;
    static values(): DialogButton[];
  }

}

declare module 'team.creative.creativecore.common.gui.event' {
  import { GuiControl } from 'team.creative.creativecore.common.gui';
  import { Class } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { GuiSlider, GuiTextfield } from 'team.creative.creativecore.common.gui.control.simple';
  import { List } from 'java.util';
  import { Component } from 'net.minecraft.network.chat';

  interface GuiControlChangedEvent<T extends GuiControl = any> extends GuiControlEvent<T> {}
  class GuiControlChangedEvent<T extends GuiControl = any> extends GuiControlEvent<T> {
    constructor(control: T);
    cancelable(): boolean;
  }


  interface GuiControlClickEvent extends GuiControlEvent {}
  class GuiControlClickEvent extends GuiControlEvent {
    readonly button: number;
    readonly doubleClick: boolean;
    constructor(control: GuiControl, button: number, doubleClick: boolean);
    cancelable(): boolean;
  }


  interface GuiControlEvent<T extends GuiControl = any> extends GuiEvent {}
  class GuiControlEvent<T extends GuiControl = any> extends GuiEvent {
    readonly control: T;
    constructor(control: T);
  }


  class GuiEvent {
    cancel(): void;
    cancelable(): boolean;
    isCanceled(): boolean;
  }


  class GuiEventManager {
    clear(): void;
    raiseEvent(event: GuiEvent): void;
    registerEvent<T extends GuiEvent>(clazz: Class<T>, action: Consumer<T>): void;
  }


  interface GuiSliderUpdateEvent extends GuiControlChangedEvent<GuiSlider> {}
  class GuiSliderUpdateEvent extends GuiControlChangedEvent<GuiSlider> {
    constructor(control: GuiSlider);
  }


  interface GuiTextUpdateEvent extends GuiControlChangedEvent<GuiTextfield> {}
  class GuiTextUpdateEvent extends GuiControlChangedEvent<GuiTextfield> {
    constructor(control: GuiTextfield);
  }


  interface GuiTooltipEvent extends GuiControlEvent {}
  class GuiTooltipEvent extends GuiControlEvent {
    readonly tooltip: List;
    constructor(control: GuiControl, tooltip: Component[]);
    cancelable(): boolean;
  }

}

declare module 'team.creative.creativecore.common.gui.event.GuiEventManager' {
  import { Class } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { GuiEvent } from 'team.creative.creativecore.common.gui.event';

  class GuiEventHandler<T extends GuiEvent = any> {
    constructor(clazz: Class<T>, action: Consumer<T>);
    react(event: GuiEvent): void;
  }

}

declare module 'team.creative.creativecore.common.gui.extension' {
  import { Function } from 'java.util.function';
  import { ExtensionDirection } from 'team.creative.creativecore.common.gui.extension.GuiExtensionCreator';
  import { GuiControl } from 'team.creative.creativecore.common.gui';

  class GuiExtensionCreator<P extends GuiControl = any, T extends GuiControl = any> {
    readonly parent: P;
    constructor(parent: P);
    checkShouldClose(): boolean;
    close(): void;
    get (): T;
    hasExtension(): boolean;
    hasLostFocus(): boolean;
    markKeptFocus(): void;
    markLostFocus(): void;
    open(extension: T): void;
    open(extension: T, direction: ExtensionDirection): void;
    open(extension: T, reference: GuiControl, direction: ExtensionDirection): void;
    toggle(factory: Function<GuiExtensionCreator, T>): void;
    toggle(factory: Function<GuiExtensionCreator, T>, direction: ExtensionDirection): void;
  }

}

declare module 'team.creative.creativecore.common.gui.extension.GuiExtensionCreator' {
  import { Enum } from 'java.lang';
  import { GuiLayer, GuiControlRect } from 'team.creative.creativecore.common.gui';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { List } from 'java.util';

  interface ExtensionDirection extends Enum<ExtensionDirection> {}
  class ExtensionDirection extends Enum<ExtensionDirection> {
    static readonly BELOW_OR_ABOVE: ExtensionDirection;
    static readonly BELOW_OR_ABOVE_ANY_SIZE: ExtensionDirection;
    static readonly RIGHT: ExtensionDirection;
    apply(var1: GuiLayer, var2: GuiControlRect, var3: Rect, var4: number): void;
    static valueOf(name: string): ExtensionDirection;
    static values(): ExtensionDirection[];
  }

}

declare module 'team.creative.creativecore.common.gui.flow' {
  import { List } from 'java.util';
  import { GuiControlRect, Align, VAlign, GuiControl } from 'team.creative.creativecore.common.gui';

  class GuiFlow {
    static readonly STACK_X: GuiStackX;
    static readonly FIT_X: GuiFlowFitX;
    static readonly STACK_Y: GuiStackY;
    static areChildrenExpandableX(controls: GuiControlRect[]): boolean;
    static areChildrenExpandableY(controls: GuiControlRect[]): boolean;
    flowX(var1: GuiControlRect[], var2: number, var3: Align, var4: number, var5: number, var6: boolean): void;
    flowY(var1: GuiControlRect[], var2: number, var3: VAlign, var4: number, var5: number, var6: number, var7: boolean): void;
    minHeight(var1: GuiControlRect[], var2: number, var3: number, var4: number): number;
    minWidth(var1: GuiControlRect[], var2: number, var3: number): number;
    preferredHeight(var1: GuiControlRect[], var2: number, var3: number, var4: number): number;
    preferredWidth(var1: GuiControlRect[], var2: number, var3: number): number;
  }


  interface GuiFlowFitX extends GuiStackX {}
  class GuiFlowFitX extends GuiStackX {
    flowX(controls: GuiControlRect[], spacing: number, align: Align, width: number, preferred: number, endless: boolean): void;
    flowY(controls: GuiControlRect[], spacing: number, valign: VAlign, width: number, height: number, preferred: number, endless: boolean): void;
    minHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
    minWidth(controls: GuiControlRect[], spacing: number, availableWidth: number): number;
    preferredHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
  }


  class GuiSizeRule {
    maxHeight(var1: GuiControl, var2: number, var3: number): number;
    maxWidth(var1: GuiControl, var2: number): number;
    minHeight(var1: GuiControl, var2: number, var3: number): number;
    minWidth(var1: GuiControl, var2: number): number;
    preferredHeight(var1: GuiControl, var2: number, var3: number): number;
    preferredWidth(var1: GuiControl, var2: number): number;
  }


  interface GuiStackX extends GuiFlow {}
  class GuiStackX extends GuiFlow {
    flowX(controls: GuiControlRect[], spacing: number, align: Align, width: number, preferred: number, endless: boolean): void;
    flowY(controls: GuiControlRect[], spacing: number, valign: VAlign, width: number, height: number, preferred: number, endless: boolean): void;
    minHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
    minWidth(controls: GuiControlRect[], spacing: number, availableWidth: number): number;
    preferredHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
    preferredWidth(controls: GuiControlRect[], spacing: number, availableWidth: number): number;
  }


  interface GuiStackY extends GuiFlow {}
  class GuiStackY extends GuiFlow {
    flowX(controls: GuiControlRect[], spacing: number, align: Align, width: number, preferred: number, endless: boolean): void;
    flowY(controls: GuiControlRect[], spacing: number, valign: VAlign, width: number, height: number, preferred: number, endless: boolean): void;
    minHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
    minWidth(controls: GuiControlRect[], spacing: number, availableWidth: number): number;
    preferredHeight(controls: GuiControlRect[], spacing: number, width: number, availableHeight: number): number;
    preferredWidth(controls: GuiControlRect[], spacing: number, availableWidth: number): number;
  }

}

declare module 'team.creative.creativecore.common.gui.flow.GuiFlowFitX' {
  import { GuiControlRect, VAlign, GuiControl } from 'team.creative.creativecore.common.gui';
  import { List } from 'java.util';

  interface GuiRowControl extends GuiControlRect {}
  class GuiRowControl extends GuiControlRect {
    constructor(controls: GuiControlRect[], spacing: number, valign: VAlign, width: number);
    flowX(): void;
    flowY(): void;
    get contentHeight(): number;
    get contentWidth(): number;
    getMaxHeight(availableHeight: number): number;
    static getMaxHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMaxWidth(availableWidth: number): number;
    static getMaxWidth(control: GuiControl, availableWidth: number): number;
    getMinHeight(availableHeight: number): number;
    static getMinHeight(control: GuiControl, width: number, availableHeight: number): number;
    getMinWidth(availableWidth: number): number;
    static getMinWidth(control: GuiControl, availableWidth: number): number;
    getPreferredHeight(availableHeight: number): number;
    static getPreferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    getPreferredWidth(availableWidth: number): number;
    static getPreferredWidth(control: GuiControl, availableWidth: number): number;
    isExpandableX(): boolean;
    isExpandableY(): boolean;
  }

}

declare module 'team.creative.creativecore.common.gui.flow.GuiSizeRule' {
  import { GuiSizeRule } from 'team.creative.creativecore.common.gui.flow';
  import { GuiControl } from 'team.creative.creativecore.common.gui';

  interface GuiSizeRatioRules extends GuiSizeRule {}
  class GuiSizeRatioRules extends GuiSizeRule {
    minWidth: number;
    width: number;
    maxWidth: number;
    minHeight: number;
    height: number;
    maxHeight: number;
    constructor();

    constructor(width: number, height: number);
    heightRatio(value: number): GuiSizeRatioRules;
    maxHeight(value: number): GuiSizeRatioRules;
    maxHeight(control: GuiControl, width: number, availableHeight: number): number;
    maxWidth(value: number): GuiSizeRatioRules;
    maxWidth(control: GuiControl, availableWidth: number): number;
    minHeight(value: number): GuiSizeRatioRules;
    minHeight(control: GuiControl, width: number, availableHeight: number): number;
    minWidth(value: number): GuiSizeRatioRules;
    minWidth(control: GuiControl, availableWidth: number): number;
    preferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    preferredWidth(control: GuiControl, availableWidth: number): number;
    widthRatio(value: number): GuiSizeRatioRules;
  }


  interface GuiSizeRules extends GuiSizeRule {}
  class GuiSizeRules extends GuiSizeRule {
    minWidth: number;
    prefWidth: number;
    maxWidth: number;
    minHeight: number;
    prefHeight: number;
    maxHeight: number;
    maxHeight(value: number): GuiSizeRules;
    maxHeight(control: GuiControl, width: number, availableHeight: number): number;
    maxWidth(value: number): GuiSizeRules;
    maxWidth(control: GuiControl, availableWidth: number): number;
    minHeight(value: number): GuiSizeRules;
    minHeight(control: GuiControl, width: number, availableHeight: number): number;
    minWidth(value: number): GuiSizeRules;
    minWidth(control: GuiControl, availableWidth: number): number;
    prefHeight(value: number): GuiSizeRules;
    prefWidth(value: number): GuiSizeRules;
    preferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    preferredWidth(control: GuiControl, availableWidth: number): number;
  }


  interface GuiRatioDimension extends GuiSizeRule {}
  class GuiRatioDimension extends GuiSizeRule {
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);
    maxHeight(control: GuiControl, width: number, availableHeight: number): number;
    maxWidth(control: GuiControl, availableWidth: number): number;
    minHeight(control: GuiControl, width: number, availableHeight: number): number;
    minWidth(control: GuiControl, availableWidth: number): number;
    preferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    preferredWidth(control: GuiControl, availableWidth: number): number;
  }


  interface GuiFixedDimension extends GuiSizeRule {}
  class GuiFixedDimension extends GuiSizeRule {
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);

    constructor(width: number);
    maxHeight(control: GuiControl, width: number, availableHeight: number): number;
    maxWidth(control: GuiControl, availableWidth: number): number;
    minHeight(control: GuiControl, width: number, availableHeight: number): number;
    minWidth(control: GuiControl, availableWidth: number): number;
    preferredHeight(control: GuiControl, width: number, availableHeight: number): number;
    preferredWidth(control: GuiControl, availableWidth: number): number;
  }

}

declare module 'team.creative.creativecore.common.gui.integration' {
  import { AbstractContainerMenu, MenuType } from 'net.minecraft.world.inventory';
  import { Player, Inventory } from 'net.minecraft.world.entity.player';
  import { GuiLayer, IScaleableGuiScreen, IGuiParent, GuiControl } from 'team.creative.creativecore.common.gui';
  import { List } from 'java.util';
  import { CreativePacket } from 'team.creative.creativecore.common.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Provider } from 'HolderLookup';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Pre } from 'RenderFrameEvent';
  import { Minecraft } from 'net.minecraft.client';
  import { Class } from 'java.lang';
  import { GuiEvent } from 'team.creative.creativecore.common.gui.event';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { GuiEventListener } from 'net.minecraft.client.gui.components.events';
  import { NarratableEntry, NarrationElementOutput } from 'net.minecraft.client.gui.narration';
  import { NarrationPriority } from 'NarratableEntry';

  interface ContainerIntegration extends IGuiIntegratedParent, AbstractContainerMenu {}
  class ContainerIntegration extends IGuiIntegratedParent {
    constructor(type: MenuType<ContainerIntegration>, id: number, player: Player, layer: GuiLayer);

    constructor(type: MenuType<ContainerIntegration>, id: number, player: Player);
    broadcastChanges(): void;
    closeLayer(layer: GuiLayer): void;
    closeLayer(layer: number): void;
    closeTopLayer(): void;
    get layers(): GuiLayer[];
    get player(): Player;
    get topLayer(): GuiLayer;
    isClient(): boolean;
    isContainer(): boolean;
    openLayer(layer: GuiLayer): void;
    provider(): Provider;
    quickMoveStack(p_38941_: Player, p_38942_: number): ItemStack;
    removed(playerIn: Player): void;
    send(packet: CreativePacket): void;
    stillValid(playerIn: Player): boolean;
    tick(): void;
  }


  interface ContainerScreenIntegration extends IScaleableGuiScreen, AbstractContainerScreen<ContainerIntegration> {}
  class ContainerScreenIntegration extends IScaleableGuiScreen {
    constructor(screenContainer: ContainerIntegration, inv: Inventory);
    charTyped(codePoint: string, modifiers: number): boolean;
    clientTick(): void;
    get height(): number;
    get width(): number;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number): boolean;
    mouseMoved(x: number, y: number): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
  }


  class GuiEventHandler {
    static onTick(tick: Pre): void;
    static queueScreen(displayScreen: Screen): void;
  }


  interface GuiScreenIntegration extends IGuiIntegratedParent, IScaleableGuiScreen, Screen {}
  class GuiScreenIntegration extends IGuiIntegratedParent {
    readonly mc: Minecraft;
    constructor(layer: GuiLayer);
    charTyped(codePoint: string, modifiers: number): boolean;
    clientTick(): void;
    closeLayer(layer: GuiLayer): void;
    closeLayer(layer: number): void;
    closeTopLayer(): void;
    get height(): number;
    get layers(): GuiLayer[];
    get player(): Player;
    get topLayer(): GuiLayer;
    get width(): number;
    isClient(): boolean;
    isContainer(): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseMoved(x: number, y: number): void;
    openLayer(layer: GuiLayer): void;
    provider(): Provider;
    removed(): void;
    render(graphics: GuiGraphics, mouseX: number, mouseY: number, partialTicks: number): void;
    render(graphics: GuiGraphics, screen: Screen, listener: ScreenEventListener, mouseX: number, mouseY: number): void;
    send(message: CreativePacket): void;
  }


  interface IGuiIntegratedParent extends IGuiParent {}
  class IGuiIntegratedParent extends IGuiParent {
    static readonly EMPTY: GuiLayer;
    closeLayer(var1: number): void;
    closeLayer(var1: GuiLayer): void;
    get(control: string): GuiControl;
    get integratedParent(): IGuiIntegratedParent;
    get layers(): GuiLayer[];
    get topLayer(): GuiLayer;
    hasGui(): boolean;
    isOpen(clazz: Class<GuiLayer>): boolean;
    isParent(parent: IGuiParent): boolean;
    openLayer(var1: GuiLayer): void;
    provider(): Provider;
    raiseEvent(event: GuiEvent): void;
    reflow(): void;
    render(graphics: GuiGraphics, screen: Screen, listener: ScreenEventListener, mouseX: number, mouseY: number): void;
    send(var1: CreativePacket): void;
    toLayerRect(control: GuiControl, rect: Rect): Rect;
    toScreenRect(control: GuiControl, rect: Rect): Rect;
  }


  interface ScreenEventListener extends GuiEventListener, NarratableEntry {}
  class ScreenEventListener extends GuiEventListener {
    static readonly DOUBLE_CLICK_TIME: number;
    constructor(gui: IGuiIntegratedParent, screen: Screen);
    charTyped(codePoint: string, modifiers: number): boolean;
    get eventTime(): number;
    get offsetX(): number;
    get offsetY(): number;
    isFocused(): boolean;
    isMouseOver(mouseX: number, mouseY: number): boolean;
    keyPressed(keyCode: number, scanCode: number, modifiers: number): boolean;
    keyReleased(keyCode: number, scanCode: number, modifiers: number): boolean;
    mouseClicked(x: number, y: number, button: number): boolean;
    mouseDragged(x: number, y: number, button: number, dragX: number, dragY: number): boolean;
    mouseMoved(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): boolean;
    mouseScrolled(x: number, y: number, deltaX: number, deltaY: number): boolean;
    narrationPriority(): NarrationPriority;
    setFocused(focused: boolean): void;
    tick(): void;
    updateNarration(p_169152_: NarrationElementOutput): void;
  }

}

declare module 'team.creative.creativecore.common.gui.manager' {
  import { NamedHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { GuiManagerType } from 'team.creative.creativecore.common.gui.manager.GuiManager';
  import { GuiLayer } from 'team.creative.creativecore.common.gui';
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { SlotAccess } from 'net.minecraft.world.entity';
  import { Slot } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'net.minecraft.world.item';
  import { GuiSlot } from 'team.creative.creativecore.common.gui.control.inventory';

  class GuiManager {
    static readonly REGISTRY: NamedHandlerRegistry;
    static readonly ITEM: GuiManagerType;
    readonly layer: GuiLayer;
    constructor(layer: GuiLayer);
    closed(): void;
    mouseClickedOutside(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    static register<T extends GuiManager>(name: string, managerClass: Class<T>, factory: Function<GuiLayer, T>): GuiManagerType<T>;
    renderOverlay(graphics: GuiGraphics, layer: GuiLayer, mouseX: number, mouseY: number): void;
    tick(): void;
  }


  interface GuiManagerItem extends GuiManager {}
  class GuiManagerItem extends GuiManager {
    handAccess: SlotAccess;
    constructor(layer: GuiLayer);
    abortDrag(): void;
    addToDrag(slot: GuiSlot): void;
    additionalDragCount(index: number): number;
    closed(): void;
    endDrag(): void;
    static freeSpace(slot: Slot, hand: ItemStack): number;
    get hand(): ItemStack;
    isDragged(): boolean;
    modifyDrag(slot: GuiSlot): void;
    mouseClickedOutside(x: number, y: number): void;
    mouseReleased(x: number, y: number, button: number): void;
    renderOverlay(graphics: GuiGraphics, layer: GuiLayer, mouseX: number, mouseY: number): void;
    set hand(stack: ItemStack);
    setHandChanged(): void;
    startDrag(slot: GuiSlot, rightClick: boolean, stackSize: number): void;
    tick(): void;
  }

}

declare module 'team.creative.creativecore.common.gui.packet' {
  import { Tag, CompoundTag } from 'net.minecraft.nbt';
  import { GuiControl } from 'team.creative.creativecore.common.gui';
  import { GuiSyncControl, GuiSync } from 'team.creative.creativecore.common.gui.sync';
  import { Player } from 'net.minecraft.world.entity.player';
  import { IGuiIntegratedParent } from 'team.creative.creativecore.common.gui.integration';
  import { CreativePacket } from 'team.creative.creativecore.common.network';
  import { ItemStack } from 'net.minecraft.world.item';
  import { ContainerSlotView } from 'team.creative.creativecore.common.util.inventory';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { GuiCreator } from 'team.creative.creativecore.common.gui.creator';

  interface ControlSyncPacket extends LayerPacket {}
  class ControlSyncPacket extends LayerPacket {
    path: string;
    control: string;
    tag: Tag;
    constructor(control: GuiControl, sync: GuiSyncControl, tag: Tag);

    constructor();
    execute(player: Player, container: IGuiIntegratedParent): void;
    execute(player: Player): void;
  }


  interface ImmediateItemStackPacket extends CreativePacket {}
  class ImmediateItemStackPacket extends CreativePacket {
    stack: ItemStack;
    index: number;
    constructor(view: ContainerSlotView);

    constructor(index: number, stack: ItemStack);

    constructor();
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
  }


  interface LayerClosePacket extends LayerPacket {}
  class LayerClosePacket extends LayerPacket {
    index: number;
    constructor(index: number);

    constructor();
    execute(player: Player, container: IGuiIntegratedParent): void;
    execute(player: Player): void;
  }


  interface LayerPacket extends CreativePacket {}
  class LayerPacket extends CreativePacket {
    execute(var1: Player, var2: IGuiIntegratedParent): void;
    execute(player: Player): void;
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
  }


  interface OpenGuiPacket extends CreativePacket {}
  class OpenGuiPacket extends CreativePacket {
    name: string;
    nbt: CompoundTag;
    constructor();

    constructor(name: string, nbt: CompoundTag);
    executeClient(player: Player): void;
    executeServer(player: ServerPlayer): void;
    static openGuiOnServer(creator: GuiCreator, nbt: CompoundTag, player: ServerPlayer): void;
  }


  interface SyncPacket extends LayerPacket {}
  class SyncPacket extends LayerPacket {
    path: string;
    tag: Tag;
    constructor(sync: GuiSync, tag: Tag);

    constructor();
    execute(player: Player, container: IGuiIntegratedParent): void;
    execute(player: Player): void;
  }

}

declare module 'team.creative.creativecore.common.gui.parser' {
  class DoubleValueParser {
    static readonly NONE: DoubleValueParser;
    static readonly BLOCKS: DoubleValueParser;
    static readonly PERCENT: DoubleValueParser;
    static readonly ANGLE: DoubleValueParser;
    parse(var1: number, var3: number): string;
  }


  class IntValueParser {
    static readonly NONE: IntValueParser;
    static readonly PIXELS: IntValueParser;
    static readonly BLOCKS: IntValueParser;
    parse(var1: number, var2: number): string;
  }


  class LongValueParser {
    static readonly NONE: LongValueParser;
    static readonly TIME: LongValueParser;
    static readonly TIME_DURATION: LongValueParser;
    static readonly TIME_TICK: LongValueParser;
    static readonly TIME_DURATION_TICK: LongValueParser;
    parse(var1: number, var3: number): string;
  }


  class ShortValueParser {
    parse(var1: number, var2: number): string;
  }

}

declare module 'team.creative.creativecore.common.gui.style' {
  import { ControlStyleBorder, ControlStyleFace } from 'team.creative.creativecore.common.gui.style.ControlFormatting';
  import { ResourceLocation } from 'net.minecraft.resources';

  class ControlFormatting {
    static readonly PROGRESSBAR: ControlFormatting;
    static readonly CLICKABLE: ControlFormatting;
    static readonly CLICKABLE_SMALL_PADDING: ControlFormatting;
    static readonly CLICKABLE_NO_PADDING: ControlFormatting;
    static readonly CLICKABLE_INACTIVE: ControlFormatting;
    static readonly CLICKABLE_INACTIVE_SMALL_PADDING: ControlFormatting;
    static readonly CLICKABLE_INACTIVE_NO_PADDING: ControlFormatting;
    static readonly CLICKABLE_NO_BORDER: ControlFormatting;
    static readonly HEADER: ControlFormatting;
    static readonly NESTED: ControlFormatting;
    static readonly NESTED_NO_PADDING: ControlFormatting;
    static readonly GUI: ControlFormatting;
    static readonly TRANSPARENT: ControlFormatting;
    static readonly TRANSPARENT_NO_DISABLE: ControlFormatting;
    static readonly SLOT: ControlFormatting;
    static readonly OUTLINE: ControlFormatting;
    readonly border: ControlStyleBorder;
    readonly padding: number;
    readonly face: ControlStyleFace;
    readonly hasDisabledEffect: boolean;
    constructor(border: ControlStyleBorder, padding: number, face: ControlStyleFace);

    constructor(border: ControlStyleBorder, padding: number, face: ControlStyleFace, hasDisabledEffect: boolean);
  }


  class GuiStyleUtils {
    static readonly DEFAULT_STYLE_LOCATION: ResourceLocation;
    static readonly GUI_ASSETS: ResourceLocation;
  }

}

declare module 'team.creative.creativecore.common.gui.style.ControlFormatting' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ControlStyleBorder extends Enum<ControlStyleBorder> {}
  class ControlStyleBorder extends Enum<ControlStyleBorder> {
    static readonly BIG: ControlStyleBorder;
    static readonly SMALL: ControlStyleBorder;
    static readonly NONE: ControlStyleBorder;
    static valueOf(name: string): ControlStyleBorder;
    static values(): ControlStyleBorder[];
  }


  interface ControlStyleFace extends Enum<ControlStyleFace> {}
  class ControlStyleFace extends Enum<ControlStyleFace> {
    static readonly BAR: ControlStyleFace;
    static readonly CLICKABLE: ControlStyleFace;
    static readonly CLICKABLE_INACTIVE: ControlStyleFace;
    static readonly HEADER_BACKGROUND: ControlStyleFace;
    static readonly NESTED_BACKGROUND: ControlStyleFace;
    static readonly BACKGROUND: ControlStyleFace;
    static readonly SLOT: ControlStyleFace;
    static readonly NONE: ControlStyleFace;
    static readonly DISABLED: ControlStyleFace;
    static valueOf(name: string): ControlStyleFace;
    static values(): ControlStyleFace[];
  }

}

declare module 'team.creative.creativecore.common.gui.style.display' {
  import { Color } from 'team.creative.creativecore.common.util.type';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Rect } from 'team.creative.creativecore.common.util.math.geo';
  import { GuiControlRect } from 'team.creative.creativecore.common.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Class } from 'java.lang';

  interface DisplayColor extends StyleDisplay {}
  class DisplayColor extends StyleDisplay {
    color: number;
    constructor();

    constructor(color: number);

    constructor(r: number, g: number, b: number, a: number);

    constructor(color: Color);

    constructor(red: number, green: number, blue: number, alpha: number);
    render(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    render(graphics: GuiGraphics, width: number, height: number): void;
    render(graphics: GuiGraphics, origin: Rect, rect: Rect): void;
    render(graphics: GuiGraphics, rect: GuiControlRect): void;
    set(color: number): void;
    set(r: number, g: number, b: number, a: number): void;
    set(color: Color): void;
  }


  interface DisplayTexture extends StyleDisplay {}
  class DisplayTexture extends StyleDisplay {
    location: ResourceLocation;
    u: number;
    v: number;
    constructor();

    constructor(location: ResourceLocation, u: number, v: number);
    render(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    render(graphics: GuiGraphics, width: number, height: number): void;
    render(graphics: GuiGraphics, origin: Rect, rect: Rect): void;
    render(graphics: GuiGraphics, rect: GuiControlRect): void;
  }


  interface DisplayTextureRepeat extends DisplayTexture {}
  class DisplayTextureRepeat extends DisplayTexture {
    w: number;
    h: number;
    constructor();

    constructor(location: ResourceLocation, u: number, v: number, width: number, height: number);
    render(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    render(graphics: GuiGraphics, width: number, height: number): void;
    render(graphics: GuiGraphics, origin: Rect, rect: Rect): void;
    render(graphics: GuiGraphics, rect: GuiControlRect): void;
  }


  interface DisplayTextureStretch extends DisplayTexture {}
  class DisplayTextureStretch extends DisplayTexture {
    w: number;
    h: number;
    constructor();

    constructor(location: ResourceLocation, u: number, v: number, width: number, height: number);
    render(graphics: GuiGraphics, x: number, y: number, width: number, height: number): void;
    render(graphics: GuiGraphics, width: number, height: number): void;
    render(graphics: GuiGraphics, origin: Rect, rect: Rect): void;
    render(graphics: GuiGraphics, rect: GuiControlRect): void;
  }


  class StyleDisplay {
    static readonly NONE: StyleDisplay;
    static registerType(id: string, clazz: Class<StyleDisplay>): void;
    render(graphics: GuiGraphics, width: number, height: number): void;
    render(graphics: GuiGraphics, origin: Rect, rect: Rect): void;
    render(graphics: GuiGraphics, rect: GuiControlRect): void;
    render(var1: GuiGraphics, var2: number, var4: number, var6: number, var8: number): void;
  }

}

declare module 'team.creative.creativecore.common.gui.style.display.StyleDisplay' {
  import { JsonDeserializer, JsonElement, JsonDeserializationContext } from 'com.google.gson';
  import { StyleDisplay } from 'team.creative.creativecore.common.gui.style.display';
  import { Type } from 'java.lang.reflect';

  interface StyleDisplayDeserializer extends JsonDeserializer<StyleDisplay> {}
  class StyleDisplayDeserializer extends JsonDeserializer<StyleDisplay> {
    deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): StyleDisplay;
  }

}

declare module 'team.creative.creativecore.common.gui.sync' {
  import { IGuiIntegratedParent } from 'team.creative.creativecore.common.gui.integration';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { GuiSyncHolderGlobal } from 'team.creative.creativecore.common.gui.sync.GuiSyncHolder';
  import { GuiLayer } from 'team.creative.creativecore.common.gui';

  class GuiSync<T extends Tag = any> {
    readonly holder: GuiSyncHolder;
    readonly name: string;
    receive(var1: IGuiIntegratedParent, var2: T): void;
    syncPath(): string;
  }


  class GuiSyncControl<C extends GuiControl = any, T extends Tag = any> {
    readonly holder: GuiSyncHolder;
    readonly name: string;
    receive(var1: C, var2: T): void;
    syncPath(): string;
  }


  interface GuiSyncGlobal<C extends GuiControl = any, T extends Tag = any> extends GuiSyncControl<C, T> {}
  class GuiSyncGlobal<C extends GuiControl = any, T extends Tag = any> extends GuiSyncControl<C, T> {
    receive(control: C, tag: T): void;
    send(control: C, tag: T): void;
    sendAndExecute(control: C, tag: T): void;
  }


  interface GuiSyncGlobalLayer<T extends GuiLayer = any> extends GuiSync<CompoundTag> {}
  class GuiSyncGlobalLayer<T extends GuiLayer = any> extends GuiSync<CompoundTag> {
    open(parent: IGuiIntegratedParent, tag: CompoundTag): T;
    receive(parent: IGuiIntegratedParent, tag: CompoundTag): void;
  }


  class GuiSyncHolder {
    static readonly GLOBAL: GuiSyncHolderGlobal;
    static followPath(path: string, parent: IGuiIntegratedParent): GuiSync;
    static followPathControl(path: string, parent: IGuiIntegratedParent): GuiSyncControl;
    getControlSync(var1: string): GuiSyncControl;
    getSync(var1: string): GuiSync;
    path(): string;
  }


  interface GuiSyncLocal<T extends Tag = any> extends GuiSyncControl<GuiLayer, T> {}
  class GuiSyncLocal<T extends Tag = any> extends GuiSyncControl<GuiLayer, T> {
    receive(layer: GuiLayer, tag: T): void;
    send(tag: T): void;
    sendAndExecute(layer: GuiLayer, tag: T): void;
  }


  interface GuiSyncLocalLayer<T extends GuiLayer = any> extends GuiSyncControl<GuiLayer, CompoundTag> {}
  class GuiSyncLocalLayer<T extends GuiLayer = any> extends GuiSyncControl<GuiLayer, CompoundTag> {
    open(tag: CompoundTag): T;
    receive(layer: GuiLayer, tag: CompoundTag): void;
  }

}

declare module 'team.creative.creativecore.common.gui.sync.GuiSyncHolder' {
  import { GuiSyncHolder, GuiSyncGlobal, GuiSyncGlobalLayer, GuiSync, GuiSyncControl, GuiSyncLocal, GuiSyncLocalLayer } from 'team.creative.creativecore.common.gui.sync';
  import { BiConsumer, BiFunction, Consumer, Function } from 'java.util.function';
  import { GuiControl, GuiLayer } from 'team.creative.creativecore.common.gui';
  import { Tag, CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';

  interface GuiSyncHolderGlobal extends GuiSyncHolder {}
  class GuiSyncHolderGlobal extends GuiSyncHolder {
    getControlSync(id: string): GuiSyncControl;
    getSync(id: string): GuiSync;
    layer<T extends GuiLayer>(id: string, creator: BiFunction<Provider, CompoundTag, T>): GuiSyncGlobalLayer<T>;
    path(): string;
    register<C extends GuiControl, T extends Tag>(id: string, consumer: BiConsumer<C, T>): GuiSyncGlobal<C, T>;
  }


  interface GuiSyncHolderLayer extends GuiSyncHolder {}
  class GuiSyncHolderLayer extends GuiSyncHolder {
    readonly parent: GuiLayer;
    constructor(layer: GuiLayer);
    getControlSync(id: string): GuiSyncControl;
    getSync(id: string): GuiSync;
    layer<T extends GuiLayer>(id: string, creator: Function<CompoundTag, T>): GuiSyncLocalLayer<T>;
    path(): string;
    register<T extends Tag>(id: string, consumer: Consumer<T>): GuiSyncLocal<T>;
  }

}

declare module 'team.creative.creativecore.common.level' {
  import { BlockGetter, LevelAccessor, Level } from 'net.minecraft.world.level';
  import { BlockPos, RegistryAccess, Holder, Direction } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { FluidState, Fluid } from 'net.minecraft.world.level.material';
  import { IVecOrigin } from 'team.creative.creativecore.common.util.math.matrix';
  import { Vec3d } from 'team.creative.creativecore.common.util.math.vec';
  import { Entity } from 'net.minecraft.world.entity';
  import { List, Collection } from 'java.util';
  import { AABB, Vec3 } from 'net.minecraft.world.phys';
  import { Predicate } from 'java.util.function';
  import { EntityTypeTest } from 'net.minecraft.world.level.entity';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ChunkAccess, ChunkSource } from 'net.minecraft.world.level.chunk';
  import { ChunkStatus } from 'net.minecraft.world.level.chunk.status';
  import { Types } from 'Heightmap';
  import { BiomeManager, Biome } from 'net.minecraft.world.level.biome';
  import { DimensionType } from 'net.minecraft.world.level.dimension';
  import { LevelLightEngine } from 'net.minecraft.world.level.lighting';
  import { WorldBorder } from 'net.minecraft.world.level.border';
  import { LevelTickAccess } from 'net.minecraft.world.ticks';
  import { Block } from 'net.minecraft.world.level.block';
  import { LevelData } from 'net.minecraft.world.level.storage';
  import { DifficultyInstance } from 'net.minecraft.world';
  import { MinecraftServer } from 'net.minecraft.server';
  import { RandomSource } from 'net.minecraft.util';
  import { SoundEvent, SoundSource } from 'net.minecraft.sounds';
  import { ParticleOptions } from 'net.minecraft.core.particles';
  import { FeatureFlagSet } from 'net.minecraft.world.flag';
  import { GameEvent } from 'net.minecraft.world.level.gameevent';
  import { Context } from 'GameEvent';

  interface BlockGetterFake extends BlockGetter {}
  class BlockGetterFake extends BlockGetter {
    parent: BlockGetter;
    pos: BlockPos;
    fakeState: BlockState;
    get height(): number;
    get minBuildHeight(): number;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getFluidState(pos: BlockPos): FluidState;
    set(world: BlockGetter, pos: BlockPos, fakeState: BlockState): void;
  }


  interface IOrientatedLevel extends LevelAccessor {}
  class IOrientatedLevel extends LevelAccessor {
    get holder(): Entity;
    get origin(): IVecOrigin;
    set holder(var1: Entity);
    set origin(var1: Vec3d);
    unload(): void;
  }


  interface ISubLevel extends IOrientatedLevel {}
  class ISubLevel extends IOrientatedLevel {
    get parent(): Level;
    get realLevel(): Level;
    transformToRealWorld(pos: BlockPos): BlockPos;
  }


  interface LevelAccessorFake extends LevelAccessor {}
  class LevelAccessorFake extends LevelAccessor {
    addParticle(p_46783_: ParticleOptions, p_46784_: number, p_46785_: number, p_46786_: number, p_46787_: number, p_46788_: number, p_46789_: number): void;
    destroyBlock(p_46957_: BlockPos, p_46958_: boolean, p_46959_: Entity, p_46960_: number): boolean;
    dimensionType(): DimensionType;
    enabledFeatures(): FeatureFlagSet;
    gameEvent(event: Holder<GameEvent>, vec: Vec3, context: Context): void;
    get biomeManager(): BiomeManager;
    get blockTicks(): LevelTickAccess<Block>;
    get chunkSource(): ChunkSource;
    get fluidTicks(): LevelTickAccess<Fluid>;
    get levelData(): LevelData;
    get lightEngine(): LevelLightEngine;
    get random(): RandomSource;
    get seaLevel(): number;
    get server(): MinecraftServer;
    get skyDarken(): number;
    get worldBorder(): WorldBorder;
    getBlockEntity(pos: BlockPos): BlockEntity;
    getBlockState(pos: BlockPos): BlockState;
    getChunk(p_46823_: number, p_46824_: number, p_46825_: ChunkStatus, p_46826_: boolean): ChunkAccess;
    getCurrentDifficultyAt(p_46800_: BlockPos): DifficultyInstance;
    getEntities(p_45936_: Entity, p_45937_: AABB, p_45938_: Predicate<Entity>): Entity[];
    getEntities<T extends Entity>(p_151464_: EntityTypeTest<Entity, T>, p_151465_: AABB, p_151466_: Predicate<T>): T[];
    getFluidState(pos: BlockPos): FluidState;
    getHeight(p_46827_: Types, p_46828_: number, p_46829_: number): number;
    getShade(p_45522_: Direction, p_45523_: boolean): number;
    getUncachedNoiseBiome(p_46809_: number, p_46810_: number, p_46811_: number): Holder<Biome>;
    isClientSide(): boolean;
    isFluidAtPosition(p_151584_: BlockPos, p_151585_: Predicate<FluidState>): boolean;
    isStateAtPosition(p_46938_: BlockPos, p_46939_: Predicate<BlockState>): boolean;
    levelEvent(p_46771_: Player, p_46772_: number, p_46773_: BlockPos, p_46774_: number): void;
    nextSubTickCount(): number;
    playSound(p_46775_: Player, p_46776_: BlockPos, p_46777_: SoundEvent, p_46778_: SoundSource, p_46779_: number, p_46780_: number): void;
    players(): Player[];
    registryAccess(): RegistryAccess;
    removeBlock(p_46951_: BlockPos, p_46952_: boolean): boolean;
    set(level: Level, pos: BlockPos, state: BlockState): void;
    setBlock(p_46947_: BlockPos, p_46948_: BlockState, p_46949_: number, p_46950_: number): boolean;
  }


  class NeighborUpdateCollector {
    constructor(level: Level, positions: Collection<BlockPos>);

    constructor();
    add(level: Level, pos: BlockPos): void;
    add(be: BlockEntity): void;
    add(level: Level, positions: Collection<BlockPos>): void;
    process(level: Level): void;
    process(): void;
  }

}

declare module 'team.creative.creativecore.common.loader' {
  import { ItemEntity } from 'net.minecraft.world.entity.item';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';

  interface ForgeLoaderUtils extends ILoaderUtils {}
  class ForgeLoaderUtils extends ILoaderUtils {
    fireItemPickupPost(item: ItemEntity, player: Player, copy: ItemStack): void;
    fireItemPickupPre(item: ItemEntity, player: Player): number;
    getLifeSpan(item: ItemEntity): number;
  }


  class ILoaderUtils {
    fireItemPickupPost(var1: ItemEntity, var2: Player, var3: ItemStack): void;
    fireItemPickupPre(var1: ItemEntity, var2: Player): number;
    getLifeSpan(var1: ItemEntity): number;
  }


  class UniEvent {
    cancel(): void;
    cancelable(): boolean;
  }

}

declare module 'team.creative.creativecore.common.network' {
  import { BundlePacket, Packet, PacketType, PacketFlow } from 'net.minecraft.network.protocol';
  import { Iterable, Class, RuntimeException } from 'java.lang';
  import { Logger } from 'org.apache.logging.log4j';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Field } from 'java.lang.reflect';
  import { RegisterPayloadHandlersEvent } from 'net.neoforged.neoforge.network.event';
  import { Supplier } from 'java.util.function';
  import { ServerPlayer } from 'net.minecraft.server.level';
  import { Level, LevelAccessor } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { LevelChunk } from 'net.minecraft.world.level.chunk';
  import { Entity } from 'net.minecraft.world.entity';
  import { MinecraftServer } from 'net.minecraft.server';
  import { NetworkFieldType } from 'team.creative.creativecore.common.network.type';
  import { RegistryFriendlyByteBuf, PacketListener } from 'net.minecraft.network';
  import { Type } from 'CustomPacketPayload';
  import { List } from 'java.util';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { ByteBuf } from 'io.netty.buffer';
  import { CustomPacketPayload } from 'net.minecraft.network.protocol.common.custom';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Side } from 'team.creative.creativecore';

  interface BundlePacketWrapper<T extends PacketListener = any> extends BundlePacket<T> {}
  class BundlePacketWrapper<T extends PacketListener = any> extends BundlePacket<T> {
    constructor(list: Iterable<Packet<T>>);
    handle(listener: T): void;
    type(): PacketType<BundlePacket<T>>;
  }


  class CreativeNetwork {
    constructor(version: number, logger: Logger, location: ResourceLocation);
    getType(clazz: Class<CreativePacket>): CreativeNetworkPacket;
    static isSideOnlyPresent(field: Field): boolean;
    register(event: RegisterPayloadHandlersEvent): void;
    registerType<T extends CreativePacket>(classType: Class<T>, supplier: Supplier<T>): void;
    sendToClient(message: CreativePacket, player: ServerPlayer): void;
    sendToClient(message: CreativePacket, level: Level, pos: BlockPos): void;
    sendToClient(message: CreativePacket, chunk: LevelChunk): void;
    sendToClientAll(server: MinecraftServer, message: CreativePacket): void;
    sendToClientTracking(message: CreativePacket, entity: Entity): void;
    sendToClientTrackingAndSelf(message: CreativePacket, entity: Entity): void;
    sendToServer(message: CreativePacket): void;
  }


  class CreativeNetworkField {
    readonly field: Field;
    nullable: boolean;
    readonly type: NetworkFieldType;
    constructor(field: Field, type: NetworkFieldType);
    static create(field: Field): CreativeNetworkField;
    read(packet: CreativePacket, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(packet: CreativePacket, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
  }


  class CreativeNetworkPacket<T extends CreativePacket = any> {
    readonly sid: Type;
    readonly cid: Type;
    readonly classType: Class;
    readonly supplier: Supplier;
    parsers: List;
    readonly fabric: boolean;
    constructor(id: ResourceLocation, classType: Class<T>, supplier: Supplier<T>, fabric: boolean);
    read(buffer: RegistryFriendlyByteBuf, flow: PacketFlow): T;
    write(packet: T, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
  }


  class CreativeNetworkUtils {
    static flatten<T extends PacketListener>(packets: Iterable<Packet<T>>): Packet<T>[];
    static getPacketCodec(buffer: RegistryFriendlyByteBuf, flow: PacketFlow): StreamCodec<ByteBuf, Packet<PacketListener>>;
  }


  interface CreativePacket extends CustomPacketPayload {}
  class CreativePacket extends CustomPacketPayload {
    execute(player: Player): void;
    executeClient(var1: Player): void;
    executeServer(var1: ServerPlayer): void;
    requiresClient(player: Player): void;
    requiresServer(player: Player): void;
    type(): Type<CustomPacketPayload>;
  }


  interface InvalidSideException extends RuntimeException {}
  class InvalidSideException extends RuntimeException {
    constructor(side: Side);

    constructor(client: boolean);

    constructor(level: LevelAccessor);

    constructor(player: Player);
  }

}

declare module 'team.creative.creativecore.common.network.type' {
  import { Class, Iterable } from 'java.lang';
  import { Type, Field } from 'java.lang.reflect';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { PacketFlow, Packet } from 'net.minecraft.network.protocol';
  import { StreamCodec } from 'net.minecraft.network.codec';
  import { Bunch } from 'team.creative.creativecore.common.util.type';
  import { Collection } from 'java.util';
  import { Tag } from 'net.minecraft.nbt';
  import { BiPredicate } from 'java.util.function';

  class NetworkFieldType<T = any> {
    read(var1: Class, var2: Type, var3: RegistryFriendlyByteBuf, var4: PacketFlow): T;
    write(var1: T, var2: Class, var3: Type, var4: RegistryFriendlyByteBuf, var5: PacketFlow): void;
  }


  interface NetworkFieldTypeClass<T = any> extends NetworkFieldType<T> {}
  class NetworkFieldTypeClass<T = any> extends NetworkFieldType<T> {
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): T;
    write(content: T, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
  }


  class NetworkFieldTypes {
    static get(field: Field): NetworkFieldType;
    static get<T>(classType: Class<T>): NetworkFieldType<T>;
    static get(classType: Class, genericType: Type): NetworkFieldType;
    static read<T>(clazz: Class<T>, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): T;
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): any;
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): any;
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): any;
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): Tag;
    read(classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): Packet;
    static readIntArray(buffer: RegistryFriendlyByteBuf): number[];
    static readMany<T>(clazz: Class<T>, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): Iterable<T>;
    static register<T>(parser: NetworkFieldType<T>, classType: Class<T>): void;
    static register<T>(parser: NetworkFieldType<T>, ...classType: Class<T>[]): void;
    static register<T>(parser: NetworkFieldTypeSpecial): void;
    static registerAndCodec<T>(parser: NetworkFieldTypeClass<T>, classType: Class<T>): StreamCodec<RegistryFriendlyByteBuf, T>;
    static write<T>(clazz: Class<T>, object: T, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(content: any, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(content: any, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(content: any, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(content: Tag, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    write(content: Packet, classType: Class, genericType: Type, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    static writeIntArray(array: number[], buffer: RegistryFriendlyByteBuf): void;
    static writeMany<T>(clazz: Class<T>, bunch: Bunch<T>, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    static writeMany<T>(clazz: Class<T>, collection: Collection<T>, buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
    static writeMany<T>(clazz: Class<T>, collection: T[], buffer: RegistryFriendlyByteBuf, flow: PacketFlow): void;
  }


  interface NetworkFieldTypeSpecial<T = any> extends NetworkFieldType<T> {}
  class NetworkFieldTypeSpecial<T = any> extends NetworkFieldType<T> {
    readonly predicate: BiPredicate;
    constructor(predicate: BiPredicate<Class, Type>);
  }

}

declare module 'team.creative.creativecore.common.util.argument' {
  import { ArgumentType } from 'com.mojang.brigadier.arguments';
  import { List, Collection } from 'java.util';
  import { CommandContext } from 'com.mojang.brigadier.context';
  import { StringReader } from 'com.mojang.brigadier';

  interface StringArrayArgumentType extends ArgumentType<string[]> {}
  class StringArrayArgumentType extends ArgumentType<string[]> {
    static readonly EXAMPLES: List;
    get examples(): Collection<string>;
    static getStringArray(context: CommandContext<any>, name: string): string[];
    parse(reader: StringReader): string[];
    static stringArray(): StringArrayArgumentType;
  }

}

declare module 'team.creative.creativecore.common.util' {
  import { CompoundTag } from 'net.minecraft.nbt';

  class CompoundSerializer {
    write(): CompoundTag;
  }

}

declare module 'team.creative.creativecore.common.util.filter' {
  import { Class } from 'java.lang';
  import { CompoundSerializer } from 'team.creative.creativecore.common.util';
  import { CompoundTag } from 'net.minecraft.nbt';

  class BiFilter<T = any, U = any> {
    static readonly SERIALIZER: BiFilterSerializer;
    static and<T, U>(...filters: BiFilter<T, U>[]): BiFilter<T, U>;
    is(var1: T, var2: U): boolean;
    static not<T, U>(filter: BiFilter<T, U>): BiFilter<T, U>;
    static or<T, U>(...filters: BiFilter<T, U>[]): BiFilter<T, U>;
  }


  class BiFilterSerializer {
    read(tag: CompoundTag): BiFilter;
    register<V extends BiFilter & CompoundSerializer>(id: string, clazz: Class<V>): BiFilterSerializer;
    write(filter: BiFilter): CompoundTag;
  }


  class Filter<T = any> {
    static readonly SERIALIZER: FilterSerializer;
    static and<T>(...filters: Filter<T>[]): Filter<T>;
    is(var1: T): boolean;
    static not<T>(filter: Filter<T>): Filter<T>;
    static or<T>(...filters: Filter<T>[]): Filter<T>;
  }


  class FilterSerializer {
    read(tag: CompoundTag): Filter;
    register<V extends Filter & CompoundSerializer>(id: string, clazz: Class<V>): FilterSerializer;
    write(filter: Filter): CompoundTag;
  }

}

declare module 'team.creative.creativecore.common.util.filter.premade' {
  import { Filter } from 'team.creative.creativecore.common.util.filter';
  import { Block } from 'net.minecraft.world.level.block';
  import { Class } from 'java.lang';
  import { Property } from 'net.minecraft.world.level.block.state.properties';
  import { TagKey } from 'net.minecraft.tags';
  import { Item } from 'net.minecraft.world.item';

  class BlockFilters {
    static and(...filters: Filter<Block>[]): Filter<Block>;
    static block(block: Block): Filter<Block>;
    static blocks(...blocks: Block[]): Filter<Block>;
    static instance(clazz: Class<Block>): Filter<Block>;
    static not(filter: Filter<Block>): Filter<Block>;
    static or(...filters: Filter<Block>[]): Filter<Block>;
    static property(property: Property<any>): Filter<Block>;
    static tag(tag: TagKey<Block>): Filter<Block>;
  }


  class ItemFilters {
    static and(...filters: Filter<Item>[]): Filter<Item>;
    static instance(clazz: Class<Item>): Filter<Item>;
    static item(item: Item): Filter<Item>;
    static items(...items: Item[]): Filter<Item>;
    static not(filter: Filter<Item>): Filter<Item>;
    static or(...filters: Filter<Item>[]): Filter<Item>;
  }

}

declare module 'team.creative.creativecore.common.util.ingredient' {
  import { NamedTypeRegistry, NamedHandlerRegistry } from 'team.creative.creativecore.common.util.registry';
  import { Class } from 'java.lang';
  import { Function } from 'java.util.function';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { ItemStack, Item } from 'net.minecraft.world.item';
  import { Component } from 'net.minecraft.network.chat';
  import { JsonElement } from 'com.google.gson';
  import { Side } from 'team.creative.creativecore';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { GuiParent } from 'team.creative.creativecore.common.gui';
  import { IGuiConfigParent } from 'team.creative.creativecore.common.config.gui';
  import { Block } from 'net.minecraft.world.level.block';
  import { TagKey } from 'net.minecraft.tags';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { GuiControlChangedEvent } from 'team.creative.creativecore.common.gui.event';

  class CreativeIngredient {
    static readonly REGISTRY: NamedTypeRegistry;
    copy(): CreativeIngredient;
    createControls(parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: any): boolean;
    equals(var1: CreativeIngredient): boolean;
    get example(): ItemStack;
    is(var1: ItemStack): boolean;
    is(var1: CreativeIngredient): boolean;
    static load(provider: Provider, nbt: CompoundTag): CreativeIngredient;
    loadValue(value: CreativeIngredient, defaultValue: CreativeIngredient, parent: GuiParent, configParent: IGuiConfigParent, key: ConfigKey, side: Side): void;
    static parse(object: any): CreativeIngredient;
    readElement(provider: Provider, defaultValue: CreativeIngredient, loadDefault: boolean, ignoreRestart: boolean, element: JsonElement, side: Side, key: ConfigKey): CreativeIngredient;
    static registerType<T extends CreativeIngredient>(id: string, classType: Class<T>, parser: Function<any, T>): void;
    save(provider: Provider): CompoundTag;
    set(key: ConfigKey, value: CreativeIngredient): CreativeIngredient;
    writeElement(provider: Provider, value: CreativeIngredient, saveDefault: boolean, ignoreRestart: boolean, side: Side, key: ConfigKey): JsonElement;
  }


  interface CreativeIngredientBlock extends CreativeIngredient {}
  class CreativeIngredientBlock extends CreativeIngredient {
    block: Block;
    constructor(block: Block);

    constructor();
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    is(info: CreativeIngredient): boolean;
    is(stack: ItemStack): boolean;
  }


  interface CreativeIngredientBlockTag extends CreativeIngredient {}
  class CreativeIngredientBlockTag extends CreativeIngredient {
    tag: TagKey;
    constructor(tag: TagKey<Block>);

    constructor();
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    is(stack: ItemStack): boolean;
    is(info: CreativeIngredient): boolean;
  }


  interface CreativeIngredientFuel extends CreativeIngredient {}
  class CreativeIngredientFuel extends CreativeIngredient {
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    is(stack: ItemStack): boolean;
    is(info: CreativeIngredient): boolean;
  }


  interface CreativeIngredientItem extends CreativeIngredient {}
  class CreativeIngredientItem extends CreativeIngredient {
    item: Item;
    constructor(item: Item);

    constructor();
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    is(info: CreativeIngredient): boolean;
    is(stack: ItemStack): boolean;
  }


  interface CreativeIngredientItemStack extends CreativeIngredient {}
  class CreativeIngredientItemStack extends CreativeIngredient {
    stack: ItemStack;
    constructor(stack: ItemStack);

    constructor(stack: ItemStack, included: ResourceLocation[]);

    constructor();
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    get included(): ResourceLocation[];
    is(info: CreativeIngredient): boolean;
    is(stack: ItemStack): boolean;
  }


  interface CreativeIngredientItemTag extends CreativeIngredient {}
  class CreativeIngredientItemTag extends CreativeIngredient {
    tag: TagKey;
    constructor(tag: TagKey<Item>);

    constructor();
    copy(): CreativeIngredient;
    description(): Component;
    descriptionDetail(): Component;
    equals(object: CreativeIngredient): boolean;
    equals(object: any): boolean;
    get example(): ItemStack;
    is(stack: ItemStack): boolean;
    is(info: CreativeIngredient): boolean;
  }


  class GuiCreativeIngredientHandler {
    static readonly REGISTRY: NamedHandlerRegistry;
    canHandle(var1: CreativeIngredient): boolean;
    canHandle(info: CreativeIngredient): boolean;
    canHandle(info: CreativeIngredient): boolean;
    canHandle(info: CreativeIngredient): boolean;
    canHandle(info: CreativeIngredient): boolean;
    createControls(var1: GuiParent, var2: CreativeIngredient): void;
    createControls(gui: GuiParent, info: CreativeIngredient): void;
    createControls(gui: GuiParent, info: CreativeIngredient): void;
    createControls(gui: GuiParent, info: CreativeIngredient): void;
    createControls(gui: GuiParent, info: CreativeIngredient): void;
    static find(info: CreativeIngredient): GuiCreativeIngredientHandler;
    onChanged(gui: GuiParent, event: GuiControlChangedEvent): void;
    onChanged(gui: GuiParent, event: GuiControlChangedEvent): void;
    onChanged(gui: GuiParent, event: GuiControlChangedEvent): void;
    onChanged(gui: GuiParent, event: GuiControlChangedEvent): void;
    parseControls(var1: GuiParent): CreativeIngredient;
    parseControls(gui: GuiParent): CreativeIngredient;
    parseControls(gui: GuiParent): CreativeIngredient;
    parseControls(gui: GuiParent): CreativeIngredient;
    parseControls(gui: GuiParent): CreativeIngredient;
  }

}

declare module 'team.creative.creativecore.common.util.ingredient.GuiCreativeIngredientHandler' {
  import { GuiCheckList } from 'team.creative.creativecore.common.gui.control.collection';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { List } from 'java.util';
  import { TextMapBuilder } from 'team.creative.creativecore.common.util.text';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface GuiDataCheckList extends GuiCheckList<DataComponentType> {}
  class GuiDataCheckList extends GuiCheckList<DataComponentType> {
    included: List;
    constructor(name: string, modifiable: boolean, map: TextMapBuilder<DataComponentType<any>>, included: ResourceLocation[]);
    get configuredIncluded(): ResourceLocation[];
    includes(type: DataComponentType<any>): boolean;
  }

}

declare module 'team.creative.creativecore.common.util.inventory' {
  import { Player } from 'net.minecraft.world.entity.player';
  import { Container, SimpleContainer } from 'net.minecraft.world';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Provider } from 'HolderLookup';
  import { CreativeIngredient } from 'team.creative.creativecore.common.util.ingredient';
  import { ArrayList } from 'java.util';

  class ContainerSlotView {
    static readonly EMPTY: ContainerSlotView;
    readonly player: Player;
    readonly container: Container;
    readonly index: number;
    constructor(player: Player, container: Container, index: number);
    changed(): void;
    get (): ItemStack;
    static mainHand(player: Player): ContainerSlotView;
    static offHand(player: Player): ContainerSlotView;
    set (stack: ItemStack);
  }


  class InventoryUtils {
    static addItemStackToInventory(inventory: Container, stack: ItemStack): boolean;
    static cleanInventory(inventory: Container): void;
    compare(arg0: ItemStack, arg1: ItemStack): number;
    compare(arg0: ItemStack, arg1: ItemStack): number;
    static consume(info: CreativeIngredient, inventory: Container): number;
    static consume(info: CreativeIngredient, inventory: Container, consumed: ArrayList<ItemStack>): number;
    static consumeItemStack(inventory: Container, stack: ItemStack): boolean;
    static getAmount(inventory: Container, stack: ItemStack): number;
    static isItemStackEqual(stackA: ItemStack, stackB: ItemStack): boolean;
    static load(provider: Provider, nbt: CompoundTag): SimpleContainer;
    static load(provider: Provider, nbt: CompoundTag, length: number): SimpleContainer;
    static save(provider: Provider, basic: SimpleContainer): CompoundTag;
    static sortInventory(inventory: Container, alphabetical: boolean): void;
    static toString(inventory: Container): string;
  }

}

declare module 'team.creative.creativecore.common.util.math.base' {
  import { Enum } from 'java.lang';
  import { Axis as direction_Axis } from 'Direction';
  import { Mirror } from 'net.minecraft.world.level.block';
  import { IntMatrix3c } from 'team.creative.creativecore.common.util.math.matrix';
  import { Vec3i, BlockPos, SectionPos, Direction } from 'net.minecraft.core';
  import { MutableBlockPos } from 'BlockPos';
  import { ChunkPos } from 'net.minecraft.world.level';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { Vector3d, Vector3f } from 'org.joml';
  import { Vec3d, Vec3f } from 'team.creative.creativecore.common.util.math.vec';
  import { List } from 'java.util';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { Axis as com_mojang_math_Axis } from 'com.mojang.math';

  interface Axis extends Enum<Axis> {}
  class Axis extends Enum<Axis> {
    static readonly X: Axis;
    static readonly Y: Axis;
    static readonly Z: Axis;
    facing(var1: boolean): Facing;
    static get(axis: direction_Axis): Axis;
    get(var1: number, var3: number, var5: number): number;
    get(var1: number, var2: number, var3: number): number;
    get(var1: number, var2: number, var3: number): number;
    get(var1: Vec3i): number;
    get(var1: ChunkPos): number;
    get(var1: Vec3): number;
    get(var1: Vector3d): number;
    get(var1: Vector3f): number;
    get(var1: T, var2: T, var3: T): T;
    get matrix(): IntMatrix3c;
    static getMirrorAxis(mirrorIn: Mirror): Axis;
    mirror(facing: Facing): Facing;
    mirror(facing: Direction): Direction;
    mirror(var1: Vec3i): Vec3i;
    mirror(var1: BlockPos): BlockPos;
    mirror(vec: Vec3d): void;
    mirror(vec: Vec3f): void;
    one(): Axis;
    set(var1: Vec3i, var2: number): Vec3i;
    set(var1: BlockPos, var2: number): BlockPos;
    set(var1: MutableBlockPos, var2: number): void;
    set(var1: SectionPos, var2: number): SectionPos;
    set(var1: ChunkPos, var2: number): ChunkPos;
    set(var1: Vec3, var2: number): Vec3;
    set(var1: Vector3d, var2: number): void;
    set(var1: Vector3f, var2: number): void;
    static third(one: Axis, two: Axis): Axis;
    toVanilla(): direction_Axis;
    transform(matrix: IntMatrix3c): Axis;
    two(): Axis;
    static valueOf(name: string): Axis;
    static values(): Axis[];
  }


  interface Facing extends Enum<Facing> {}
  class Facing extends Enum<Facing> {
    static readonly DOWN: Facing;
    static readonly UP: Facing;
    static readonly NORTH: Facing;
    static readonly SOUTH: Facing;
    static readonly WEST: Facing;
    static readonly EAST: Facing;
    static direction(pos: Vec3i, second: Vec3i): Facing;
    static get(index: number): Facing;
    static get(direction: Direction): Facing;
    static get(axis: Axis, positive: boolean): Facing;
    get(var1: AABB): number;
    get(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): number;
    get(var1: number, var3: number, var5: number, var7: number, var9: number, var11: number): number;
    get(var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): number;
    get uAxis(): Axis;
    get vAxis(): Axis;
    static getHorizontal(index: number): Facing;
    getU(x: number, y: number, z: number): number;
    getV(x: number, y: number, z: number): number;
    static nearest(vec: Vec3f): Facing;
    static nearest(x: number, y: number, z: number): Facing;
    static of(player: Player): Facing;
    static ofNormal(vec: Vec3i): Facing;
    offset(): number;
    offset(axis: Axis): number;
    one(): Axis;
    opposite(): Facing;
    rotation(): com_mojang_math_Axis;
    set(var1: AABB, var2: number): AABB;
    toVanilla(): Direction;
    transform(matrix: IntMatrix3c): Facing;
    translate(): Component;
    two(): Axis;
    static valueOf(name: string): Facing;
    static values(): Facing[];
  }

}

declare module 'team.creative.creativecore.common.util.math.box' {
  import { AABB, BlockHitResult, Vec3 } from 'net.minecraft.world.phys';
  import { Axis } from 'Direction';
  import { Axis as team_creative_creativecore_common_util_math_base_Axis, Facing } from 'team.creative.creativecore.common.util.math.base';
  import { Iterable, Enum, Boolean, Double } from 'java.lang';
  import { BlockPos, Vec3i, Direction } from 'net.minecraft.core';
  import { Vec3d, Vec3f, Vec2d } from 'team.creative.creativecore.common.util.math.vec';
  import { IVecOrigin, Matrix3, IntMatrix3c } from 'team.creative.creativecore.common.util.math.matrix';
  import { CollisionCoordinator } from 'team.creative.creativecore.common.util.math.collision';
  import { VoxelShape, SliceShape, DiscreteVoxelShape } from 'net.minecraft.world.phys.shapes';
  import { List, Iterator, Optional } from 'java.util';
  import { Vector3d } from 'org.joml';
  import { Rotation } from 'team.creative.creativecore.common.util.math.transformation';
  import { DoubleList } from 'it.unimi.dsi.fastutil.doubles';
  import { DoubleLineConsumer } from 'Shapes';

  class ABB {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number);

    constructor(bb: AABB);

    constructor(bb: ABB);
    calculateAxisOffset(axis: team_creative_creativecore_common_util_math_base_Axis, one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis, other: AABB, offset: number): number;
    static clip(boxes: Iterable<ABB>, pos: Vec3, look: Vec3, blockPos: BlockPos): BlockHitResult;
    contains(vec: Vec3d): boolean;
    contains(vec: Vec3): boolean;
    contains(x: number, y: number, z: number): boolean;
    copy(): ABB;
    corner(corner: BoxCorner): Vec3d;
    cornerValue(bb: AABB, corner: BoxCorner, axis: team_creative_creativecore_common_util_math_base_Axis): number;
    cornerX(corner: BoxCorner): number;
    cornerY(corner: BoxCorner): number;
    cornerZ(corner: BoxCorner): number;
    static createEmptyBox(): ABB;
    createRotatedSurrounding(coordinator: CollisionCoordinator): ABB;
    createRotatedSurroundingInverseInternal(coordinator: CollisionCoordinator): ABB;
    equals(bb: AABB): boolean;
    equals(obj: any): boolean;
    get(bb: AABB, facing: Facing): number;
    get(facing: Facing): number;
    get center(): Vec3;
    get corners(): Vec3d[];
    getOuterCorner(facing: Facing, origin: IVecOrigin, minOne: number, minTwo: number, maxOne: number, maxTwo: number): Vec3d[];
    getRotatedCorners(origin: IVecOrigin): Vec3d[];
    include(vec: Vec3d): void;
    include(facing: Facing, value: number): void;
    intersects(bb: AABB): boolean;
    intersects(bb: ABB): boolean;
    intersects(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
    intersects(vec1: Vec3, vec2: Vec3): boolean;
    intersectsPrecise(bb: AABB): boolean;
    intersectsWithAxis(axis: team_creative_creativecore_common_util_math_base_Axis, bb2: AABB): boolean;
    intersectsWithAxis(axis: team_creative_creativecore_common_util_math_base_Axis, bb2: ABB): boolean;
    intersectsWithAxis(one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis, valueOne: number, valueTwo: number): boolean;
    static max(bb: AABB, axis: Axis): number;
    static max(bb: AABB, axis: team_creative_creativecore_common_util_math_base_Axis): number;
    max(axis: Axis): number;
    max(axis: team_creative_creativecore_common_util_math_base_Axis): number;
    static min(bb: AABB, axis: Axis): number;
    static min(bb: AABB, axis: team_creative_creativecore_common_util_math_base_Axis): number;
    min(axis: Axis): number;
    min(axis: team_creative_creativecore_common_util_math_base_Axis): number;
    move(x: number, y: number, z: number): void;
    moveCopy(x: number, y: number, z: number): ABB;
    rayTrace(pos: Vec3, look: Vec3, blockPos: BlockPos): BlockHitResult;
    toString(): string;
    toVanilla(): AABB;
  }


  interface ABBs extends Iterable<ABB> {}
  class ABBs extends Iterable<ABB> {
    constructor(shape: VoxelShape);

    constructor(bb: AABB);

    constructor(bb: ABB);
    addNonOverlapping(bbs: Iterable<ABB>): void;
    addNonOverlapping(bb: ABB): void;
    addNonOverlappingVanilla(bbs: Iterable<AABB>): void;
    addShape(shape: VoxelShape): void;
    static cutOut(result: ABB[], bb: ABB, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
    cutOut(bbs: Iterable<ABB>): void;
    cutOut(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): void;
    cutOutVanilla(bbs: Iterable<AABB>): void;
    get boxes(): ABB[];
    intersection(bbs: Iterable<ABB>): void;
    intersectionVanilla(bbs: Iterable<AABB>): void;
    isEmpty(): boolean;
    iterator(): Iterator<ABB>;
    optimize(): void;
  }


  class AlignedBox {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number);

    constructor(box: AABB);

    constructor();

    constructor(cube: AlignedBox);
    add(x: number, y: number, z: number): void;
    add(vec: Vector3d): void;
    add(vec: Vec3i): void;
    get(facing: Facing): number;
    get bB(): AABB;
    get center(): Vec3d;
    get offset(): BlockPos;
    get size(): Vec3d;
    getBB(pos: BlockPos): AABB;
    getCorner(corner: BoxCorner): Vec3f;
    getMax(axis: team_creative_creativecore_common_util_math_base_Axis): number;
    getMin(axis: team_creative_creativecore_common_util_math_base_Axis): number;
    getSize(axis: team_creative_creativecore_common_util_math_base_Axis): number;
    grow(axis: team_creative_creativecore_common_util_math_base_Axis, value: number): void;
    rotate(rotation: Rotation, center: Vec3f): void;
    rotate(matrix: Matrix3, center: Vec3f): void;
    scale(scale: number): void;
    set(x: number, y: number, z: number, x2: number, y2: number, z2: number): void;
    set(facing: Facing, value: number): void;
    setMax(axis: team_creative_creativecore_common_util_math_base_Axis, value: number): void;
    setMin(axis: team_creative_creativecore_common_util_math_base_Axis, value: number): void;
    shrink(axis: team_creative_creativecore_common_util_math_base_Axis, value: number): void;
    sub(x: number, y: number, z: number): void;
    sub(vec: Vector3d): void;
    sub(vec: Vec3i): void;
    toString(): string;
    voxelShape(): VoxelShape;
    voxelShape(pos: BlockPos): VoxelShape;
  }


  interface BoxCorner extends Enum<BoxCorner> {}
  class BoxCorner extends Enum<BoxCorner> {
    static readonly EUN: BoxCorner;
    static readonly EUS: BoxCorner;
    static readonly EDN: BoxCorner;
    static readonly EDS: BoxCorner;
    static readonly WUN: BoxCorner;
    static readonly WUS: BoxCorner;
    static readonly WDN: BoxCorner;
    static readonly WDS: BoxCorner;
    static faceCorners(facing: Facing): BoxCorner[];
    facingTo(corner: BoxCorner): Facing;
    get(bb: ABB): Vec3d;
    get(bb: AABB): Vec3d;
    static getCorner(x: Facing, y: Facing, z: Facing): BoxCorner;
    static getCornerUnsorted(a: Facing, b: Facing, c: Facing): BoxCorner;
    getFacing(axis: team_creative_creativecore_common_util_math_base_Axis): Facing;
    isFacing(facing: Facing): boolean;
    isFacingPositive(axis: team_creative_creativecore_common_util_math_base_Axis): boolean;
    mirror(axis: team_creative_creativecore_common_util_math_base_Axis): BoxCorner;
    rotate(rotation: Rotation): BoxCorner;
    set(bb: ABB, vec: Vec3d): void;
    set(bb: AABB, vec: Vec3d): void;
    transform(matrix: IntMatrix3c): BoxCorner;
    static valueOf(name: string): BoxCorner;
    static values(): BoxCorner[];
  }


  interface BoxesVoxelShape extends SliceShape {}
  class BoxesVoxelShape extends SliceShape {
    static readonly DISCRETE_SHAPE: DiscreteVoxelShape;
    boxes: List;
    bounds(): AABB;
    clip(pos: Vec3, look: Vec3, block: BlockPos): BlockHitResult;
    closestPointTo(vec: Vec3): Optional<Vec3>;
    collide(axis: Axis, other: AABB, distance: number): number;
    static create(boxes: ABB[]): BoxesVoxelShape;
    static create(box: ABB): BoxesVoxelShape;
    static createVanilla(boxes: AABB[]): BoxesVoxelShape;
    forAllBoxes(consumer: DoubleLineConsumer): void;
    forAllEdges(consumer: DoubleLineConsumer): void;
    getCoords(axis: Axis): DoubleList;
    getFaceShape(direction: Direction): VoxelShape;
    intersectsWith(bb: AABB): boolean;
    isEmpty(): boolean;
    max(axis: Axis): number;
    max(axis: Axis, one: number, two: number): number;
    min(axis: Axis): number;
    min(axis: Axis, one: number, two: number): number;
    move(x: number, y: number, z: number): VoxelShape;
    onlyKeepIntersecting(bb: AABB): boolean;
    optimize(): VoxelShape;
    requiresAdvancedEntityStep(): boolean;
    toAabbs(): AABB[];
    toString(): string;
  }


  interface BoxFace extends Enum<BoxFace> {}
  class BoxFace extends Enum<BoxFace> {
    static readonly EAST: BoxFace;
    static readonly WEST: BoxFace;
    static readonly UP: BoxFace;
    static readonly DOWN: BoxFace;
    static readonly SOUTH: BoxFace;
    static readonly NORTH: BoxFace;
    static ensureSameLength(one: Vec3f, two: Vec3f): void;
    first(corners: Vec3d[]): Vec3d;
    static get(facing: Facing): BoxFace;
    static get(axis: team_creative_creativecore_common_util_math_base_Axis, direction: boolean): BoxFace;
    get corners(): BoxCorner[];
    get facing(): Facing;
    get one(): team_creative_creativecore_common_util_math_base_Axis;
    get texU(): Facing;
    get texUAxis(): team_creative_creativecore_common_util_math_base_Axis;
    get texV(): Facing;
    get texVAxis(): team_creative_creativecore_common_util_math_base_Axis;
    get two(): team_creative_creativecore_common_util_math_base_Axis;
    getCornerInQuestion(first: boolean, inverted: boolean): BoxCorner;
    static getTraingleNormal(triangle: BoxCorner[], corners: Vec3f[]): Vec3f;
    getTriangleFirst(inverted: boolean): BoxCorner[];
    getTriangleSecond(inverted: boolean): BoxCorner[];
    static getVecArray(corners: BoxCorner[], vecs: Vec3f[]): Vec3f[];
    isFacingOutwards(first: boolean, inverted: boolean, normal: Vec3f): boolean;
    normal(corners: Vec3d[]): Vec3d;
    static valueOf(name: string): BoxFace;
    static values(): BoxFace[];
  }


  class BoxPlane {
    readonly face: BoxFace;
    readonly normal: Vec3d;
    readonly origin: Vec3d;
    constructor(corners: Vec3d[], face: BoxFace);
    static createOppositePlane(axis: team_creative_creativecore_common_util_math_base_Axis, direction: Vec3d, corners: Vec3d[]): BoxPlane;
    static createPlane(axis: team_creative_creativecore_common_util_math_base_Axis, direction: Vec3d, corners: Vec3d[]): BoxPlane;
    getIntersectingScale(rayOrigin: Vec3d, ray: Vec3d): number;
    static linePlaneIntersection(ray: Vec3d, rayOrigin: Vec3d, normal: Vec3d, origin: Vec3d): number;
  }


  class BoxUtils {
    static calculateAxisOffset(axis: team_creative_creativecore_common_util_math_base_Axis, one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis, bb: AABB, other: AABB, offset: number): number;
    static corner(bb: AABB, corner: BoxCorner): Vec3d;
    static cornerValue(bb: AABB, corner: BoxCorner, axis: team_creative_creativecore_common_util_math_base_Axis): number;
    static cornerX(bb: AABB, corner: BoxCorner): number;
    static cornerY(bb: AABB, corner: BoxCorner): number;
    static cornerZ(bb: AABB, corner: BoxCorner): number;
    static equals(a: number, b: number, deviation: number): boolean;
    static get(bb: AABB, facing: Facing): number;
    static getCorners(bb: AABB): Vec3d[];
    static getIntersectionVolume(bb: AABB, other: ABB): number;
    static getRotatedCorners(bb: AABB, origin: IVecOrigin): Vec3d[];
    static greaterEquals(a: number, b: number, deviation: number): boolean;
    static includeMaxRotationInBox(box: ABB, vec: Vec3d, axis: team_creative_creativecore_common_util_math_base_Axis, coordinator: CollisionCoordinator): void;
    static includeMaxRotationInBoxInverse(box: ABB, vec: Vec3d, axis: team_creative_creativecore_common_util_math_base_Axis, coordinator: CollisionCoordinator): void;
    static insideRect(one: number, two: number, minOne: number, minTwo: number, maxOne: number, maxTwo: number): boolean;
    static intersectsWithAxis(bb: AABB, other: AABB, one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis): boolean;
    static intersectsWithAxis(bb: AABB, one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis, valueOne: number, valueTwo: number): boolean;
    static max(bb: AABB, axis: Axis): number;
    static max(bb: AABB, axis: team_creative_creativecore_common_util_math_base_Axis): number;
    static min(bb: AABB, axis: Axis): number;
    static min(bb: AABB, axis: team_creative_creativecore_common_util_math_base_Axis): number;
  }


  interface OBB extends ABB {}
  class OBB extends ABB {
    origin: IVecOrigin;
    constructor(bb: ABB, origin: IVecOrigin);

    constructor(bb: AABB, origin: IVecOrigin);
    calculateAxisOffset(axis: team_creative_creativecore_common_util_math_base_Axis, one: team_creative_creativecore_common_util_math_base_Axis, two: team_creative_creativecore_common_util_math_base_Axis, other: AABB, offset: number): number;
    static calculateDistanceFromPlane(positive: boolean, closestValue: number, vec: Vec2d, firstAxisValue: number, secondAxisValue: number, outerCornerAxis: number): number;
    calculateDistanceRotated(other: AABB, axis: team_creative_creativecore_common_util_math_base_Axis, offset: number): number;
    copy(): OBB;
    intersectsPrecise(bb: AABB): boolean;
    toString(): string;
  }

}

declare module 'team.creative.creativecore.common.util.math.collision' {
  import { AABB } from 'net.minecraft.world.phys';
  import { Facing, Axis } from 'team.creative.creativecore.common.util.math.base';
  import { Vec3d, Vec2d, Vec2f, Vec3f } from 'team.creative.creativecore.common.util.math.vec';
  import { BoxCorner, ABB } from 'team.creative.creativecore.common.util.math.box';
  import { Boolean, Double } from 'java.lang';
  import { Matrix3, IVecOrigin, Matrix4 } from 'team.creative.creativecore.common.util.math.matrix';
  import { List } from 'java.util';

  class CollidingPlane {
    static readonly accuracySteps: number;
    readonly bb: AABB;
    readonly facing: Facing;
    readonly cache: PlaneCache;
    constructor(bb: AABB, facing: Facing, cache: PlaneCache, corners: Vec3d[], planeCorners: BoxCorner[]);
    binarySearch(value: number, toCheck: AABB, checkRadiusSquared: number, center: Vec3d, coordinator: CollisionCoordinator): number;
    static getDirection(coordinator: CollisionCoordinator, cache: PlaneCache, center: Vec3d): Facing;
    intersects(toCheck: AABB, checkRadiusSquared: number, center: Vec3d, t: number, coordinator: CollisionCoordinator): boolean;
    isInFront(vec: Vec3d): boolean;
  }


  class CollisionCoordinator {
    readonly rotX: number;
    readonly rotY: number;
    readonly rotZ: number;
    readonly offX: number;
    readonly offY: number;
    readonly offZ: number;
    rotationX: Matrix3;
    rotationY: Matrix3;
    rotationZ: Matrix3;
    rotationXInv: Matrix3;
    rotationYInv: Matrix3;
    rotationZInv: Matrix3;
    translation: Vec3d;
    readonly hasRotX: boolean;
    readonly hasRotY: boolean;
    readonly hasRotZ: boolean;
    readonly hasOffX: boolean;
    readonly hasOffY: boolean;
    readonly hasOffZ: boolean;
    readonly hasTranslation: boolean;
    readonly hasOneRotation: boolean;
    readonly hasRotation: boolean;
    readonly isSimple: boolean;
    constructor(offX: number, offY: number, offZ: number, rotX: number, rotY: number, rotZ: number, origin: IVecOrigin);
    computeInverseSurroundingBoxInternal(box: ABB): ABB;
    computeSurroundingBox(box: ABB): ABB;
    finish(): void;
    get(delta: number): Matrix4;
    get numberOfHalfRotations(): number;
    getInverted(delta: number): Matrix4;
    getRotationDegree(axis: Axis): number;
    getRotationMatrix(axis: Axis): Matrix3;
    getRotationMatrixInv(axis: Axis): Matrix3;
    hasOnlyTranslation(): boolean;
    moved(): IVecOrigin;
    original(): IVecOrigin;
    transform(vec: Vec3d, delta: number): void;
    transform(matrix: Matrix4, vec: Vec3d): void;
    transformInverted(vec: Vec3d, delta: number): void;
  }


  class IntersectionHelper {
    static cutMinMax(minOne: number, minTwo: number, maxOne: number, maxTwo: number, corners: Vec2d[]): Vec2d[];
    static cutMinMax(one: Axis, two: Axis, minOne: number, minTwo: number, maxOne: number, maxTwo: number, corners: Vec3f[]): Vec2f[];
  }


  class MatrixUtils {
    static createIdentityMatrix(): Matrix3;
    static createRotationMatrix(rotX: number, rotY: number, rotZ: number): Matrix3;
    static createRotationMatrixAndTranslation(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): Matrix4;
    static createRotationMatrixAndTranslationRadians(x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): Matrix4;
    static createRotationMatrixX(angle: number): Matrix3;
    static createRotationMatrixXRadians(radians: number): Matrix3;
    static createRotationMatrixY(angle: number): Matrix3;
    static createRotationMatrixYRadians(radians: number): Matrix3;
    static createRotationMatrixZ(angle: number): Matrix3;
    static createRotationMatrixZRadians(radians: number): Matrix3;
    static mul(matrix: Matrix4, matrix2: Matrix3): void;
  }


  class PlaneCache {
    readonly planes: CollidingPlane[];
    readonly center: Vec3d;
    readonly radiusSquared: number;
    readonly bb: AABB;
    constructor(box: AABB, coordinator: CollisionCoordinator);
    getPushOutScale(minScale: number, fakeBox: ABB, pushVec: Vec3d): number;
  }

}

declare module 'team.creative.creativecore.common.util.math.geo' {
  import { Vec3d, Vec3f, Vec2d, Vec2f } from 'team.creative.creativecore.common.util.math.vec';
  import { Facing, Axis } from 'team.creative.creativecore.common.util.math.base';
  import { Boolean, Double, Float } from 'java.lang';
  import { Vector3d, Matrix4f } from 'org.joml';
  import { GuiControlRect } from 'team.creative.creativecore.common.gui';
  import { QuadGeneratorContext } from 'team.creative.creativecore.client.render.box';
  import { List } from 'java.util';
  import { BakedQuad } from 'net.minecraft.client.renderer.block.model';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { BiConsumer } from 'java.util.function';
  import { Pose } from 'PoseStack';

  class NormalPlaneD {
    readonly normal: Vec3d;
    readonly origin: Vec3d;
    constructor(origin: Vec3d, normal: Vec3d);

    constructor(origin: Vec3f, normal: Vec3f);

    constructor(facing: Facing);

    constructor(axis: Axis, value: number, facing: Facing);
    cuts(strip: VectorFan): boolean;
    intersect(start: Vec3d, end: Vec3d): Vec3d;
    intersect(ray: Ray3d): Vec3d;
    isInFront(vec: Vec3d): boolean;
    isInFront(vec: Vec3d, epsilon: number): boolean;
    isInFront(vec: Vec3f): boolean;
    isInFront(vec: Vec3f, epsilon: number): boolean;
    isInvalid(): boolean;
    project(one: Axis, two: Axis, axis: Axis, valueOne: number, valueTwo: number): number;
    toFloat(): NormalPlaneF;
    toString(): string;
  }


  class NormalPlaneF {
    readonly normal: Vec3f;
    readonly origin: Vec3f;
    constructor(origin: Vec3f, normal: Vec3f);

    constructor(facing: Facing);

    constructor(axis: Axis, value: number, facing: Facing);
    cuts(strip: VectorFan): boolean;
    intersect(start: Vec3f, end: Vec3f): Vec3f;
    intersect(ray: Ray3f): Vec3f;
    isFacing(facing: Facing): boolean;
    isInFront(vec: Vec3f): boolean;
    isInFront(vec: Vec3f, epsilon: number): boolean;
    isInvalid(): boolean;
    project(one: Axis, two: Axis, axis: Axis, valueOne: number, valueTwo: number): number;
    toString(): string;
  }


  class Ray2d {
    originOne: number;
    originTwo: number;
    directionOne: number;
    directionTwo: number;
    one: Axis;
    two: Axis;
    constructor(one: Axis, two: Axis, origin: Vec3d, directionOne: number, directionTwo: number);

    constructor(one: Axis, two: Axis, startOne: number, startTwo: number, endOne: number, endTwo: number);
    get(axis: Axis, value: number): number;
    get(t: number): Vec2d;
    getDirection(axis: Axis): number;
    getFloat(t: number): Vec2f;
    getOrigin(axis: Axis): number;
    getOther(axis: Axis): Axis;
    getT(axis: Axis, value: number): number;
    getWithLimits(axis: Axis, value: number): number;
    getWithLimits(axis: Axis, value: number, min: number, max: number): number;
    intersect(start: Vec3f, end: Vec3f, thirdValue: number): Vec3f;
    intersect(line: Ray2d, thirdValue: number): Vector3d;
    intersectWhen(line: Ray2d): number;
    isCoordinateOnLine(one: number, two: number): boolean;
    isCoordinateOnLine(one: number, two: number): boolean;
    isCoordinateToTheRight(one: number, two: number): boolean;
    isCoordinateToTheRight(one: number, two: number): boolean;
    set(one: Axis, two: Axis, startOne: number, startTwo: number, endOne: number, endTwo: number): void;
    set(one: Axis, two: Axis, first: Vec3f, second: Vec3f): void;
    toString(): string;
  }


  class Ray3d {
    readonly origin: Vec3d;
    readonly direction: Vec3d;
    constructor(start: Vec3d, end: Vec3d);

    constructor(start: Vec3d, end: Vec3d, normalize: boolean);

    constructor(origin: Vec3d, facing: Facing);
    get(t: number): Vector3d;
    getT(axis: Axis, value: number): number;
    set(x: number, y: number, z: number, x2: number, y2: number, z2: number): void;
  }


  class Ray3f {
    readonly origin: Vec3f;
    readonly direction: Vec3f;
    constructor(start: Vec3f, end: Vec3f);

    constructor(origin: Vec3f, facing: Facing);
    get(t: number): Vec3f;
    getT(axis: Axis, value: number): number;
    set(x: number, y: number, z: number, x2: number, y2: number, z2: number): void;
  }


  class Rect {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    constructor(x: number, y: number, x2: number, y2: number);
    child(x: number, y: number, width: number, height: number): Rect;
    child(rect: Rect, scale: number, xOffset: number, yOffset: number): Rect;
    child(rect: GuiControlRect, scale: number, xOffset: number, yOffset: number): Rect;
    copy(): Rect;
    get height(): number;
    static get screenRect(): Rect;
    get width(): number;
    getSize(axis: Axis): number;
    grow(grow: number): void;
    inside(x: number, y: number): boolean;
    intersection(other: Rect): Rect;
    intersects(other: Rect): boolean;
    move(x: number, y: number): void;
    scale(scale: number): void;
    scissor(): void;
    shrink(shrink: number): void;
    toString(): string;
  }


  class VectorFan {
    static readonly EPSILON: number;
    constructor(coords: Vec3f[]);
    add(list: Vec3f[], toAdd: Vec3f): void;
    calculateIntercept(ray: Ray3f): Vec3d;
    copy(): VectorFan;
    count(): number;
    createNormal(): Vec3f;
    createPlane(): NormalPlaneF;
    createPlane(holder: QuadGeneratorContext): NormalPlaneF;
    cut(plane: NormalPlaneF): VectorFan;
    cut2d(cutters: VectorFan[], one: Axis, two: Axis, inverse: boolean, takeInner: boolean): VectorFan[];
    cut2d(cutter: VectorFan, one: Axis, two: Axis, inverse: boolean, takeInner: boolean): VectorFan[];
    cutWithoutCopy(planes: NormalPlaneF[]): boolean;
    cutWithoutCopy(planes: NormalPlaneD[]): boolean;
    cutWithoutCopy(plane: NormalPlaneF): void;
    cutWithoutCopy(plane: NormalPlaneD): void;
    divide(ratio: number): void;
    equals(obj: any): boolean;
    equalsIgnoreOrder(other: VectorFan, toIgnore: Axis): boolean;
    forAllEdges(consumer: BiConsumer<Vec3f, Vec3f>): void;
    generate(holder: QuadGeneratorContext, quads: BakedQuad[]): void;
    get(index: number): Vec3f;
    get coords(): Vec3f[];
    intersect2d(other: VectorFan, one: Axis, two: Axis, inverse: boolean, episilon: number): boolean;
    intersects(plane1: NormalPlaneF, plane2: NormalPlaneF): boolean;
    isEmpty(): boolean;
    isInside(shapes: NormalPlaneF[][]): boolean;
    static isInside(shape: NormalPlaneF[], before: Vec3f, vec: Vec3f, beforeOutside: boolean, outside: boolean, currentPlane: number): boolean;
    static isInside(shape: NormalPlaneF[], vec: Vec3f, toSkip: number): boolean;
    move(x: number, y: number, z: number): void;
    renderLines(pose: Pose, consumer: VertexConsumer, red: number, green: number, blue: number, alpha: number): void;
    renderLines(pose: Pose, consumer: VertexConsumer, red: number, green: number, blue: number, alpha: number, center: Vec3d, dGrow: number): void;
    renderLines(pose: Pose, consumer: VertexConsumer, offX: number, offY: number, offZ: number, scaleX: number, scaleY: number, scaleZ: number, red: number, green: number, blue: number, alpha: number): void;
    renderLines(pose: Pose, consumer: VertexConsumer, offX: number, offY: number, offZ: number, scaleX: number, scaleY: number, scaleZ: number, red: number, green: number, blue: number, alpha: number, center: Vec3d, dGrow: number): void;
    renderPreview(matrix: Matrix4f, consumer: VertexConsumer, red: number, green: number, blue: number, alpha: number): void;
    renderPreview(matrix: Matrix4f, consumer: VertexConsumer, offX: number, offY: number, offZ: number, scaleX: number, scaleY: number, scaleZ: number, red: number, green: number, blue: number, alpha: number): void;
    scale(ratio: number): void;
    set(fan: VectorFan): void;
    set(coords: Vec3f[]): void;
    toString(): string;
  }

}

declare module 'team.creative.creativecore.common.util.math.geo.VectorFan' {
  import { Exception } from 'java.lang';

  interface ParallelException extends Exception {}
  class ParallelException extends Exception {
  }

}

declare module 'team.creative.creativecore.common.util.math.interpolation' {
  import { List } from 'java.util';
  import { Tension } from 'team.creative.creativecore.common.util.math.interpolation.HermiteInterpolation';
  import { TupleList } from 'team.creative.creativecore.common.util.type.list';
  import { Double } from 'java.lang';

  interface CosineInterpolation<T extends VecNd = any> extends Interpolation<T> {}
  class CosineInterpolation<T extends VecNd = any> extends Interpolation<T> {
    constructor(...points: T[]);

    constructor(times: number[], ...points: T[]);

    constructor(points: T[]);

    constructor(times: number[], points: T[]);
    estimateDistance(): number[];
    valueAt(mu: number, pointIndex: number, pointIndexNext: number, dim: number): number;
  }


  interface CubicInterpolation<T extends VecNd = any> extends Interpolation<T> {}
  class CubicInterpolation<T extends VecNd = any> extends Interpolation<T> {
    beginVec: T;
    endVec: T;
    constructor(times: number[], points: T[]);

    constructor(points: T[]);

    constructor(before: T, points: T[], after: T);

    constructor(times: number[], before: T, points: T[], after: T);

    constructor(...points: T[]);
    estimateDistance(): number[];
    valueAt(mu: number, pointIndex: number, pointIndexNext: number, dim: number): number;
  }


  interface HermiteInterpolation<T extends VecNd = any> extends CubicInterpolation<T> {}
  class HermiteInterpolation<T extends VecNd = any> extends CubicInterpolation<T> {
    tension: Tension;
    bias: number;
    constructor(times: number[], points: T[], bias: number, tension: Tension);

    constructor(times: number[], points: T[], tension: Tension);

    constructor(times: number[], points: T[]);

    constructor(bias: number, tension: Tension, ...points: T[]);

    constructor(bias: number, tension: Tension, points: T[]);

    constructor(bias: number, tension: Tension, before: T, points: T[], after: T);

    constructor(times: number[], bias: number, tension: Tension, before: T, points: T[], after: T);

    constructor(tension: Tension, ...points: T[]);

    constructor(tension: Tension, points: T[]);

    constructor(...points: T[]);

    constructor(points: T[]);

    constructor(before: T, points: T[], after: T);

    constructor(times: number[], before: T, points: T[], after: T);
    valueAt(mu: number, pointIndex: number, pointIndexNext: number, dim: number): number;
  }


  class Interpolation<T extends VecNd = any> {
    constructor(times: number[], points: T[]);

    constructor(points: TupleList<number, T>);

    constructor(times: number[], points: T[]);

    constructor(points: T[]);

    constructor(...points: T[]);
    estimateDistance(): number[];
    valueAt(t: number): T;
    valueAt(var1: number, var3: number, var4: number, var5: number): number;
  }


  interface LinearInterpolation<T extends VecNd = any> extends Interpolation<T> {}
  class LinearInterpolation<T extends VecNd = any> extends Interpolation<T> {
    constructor(times: number[], points: T[]);

    constructor(...points: T[]);

    constructor(times: number[], points: T[]);

    constructor(points: T[]);

    constructor(points: TupleList<number, T>);
    estimateDistance(): number[];
    valueAt(mu: number, pointIndex: number, pointIndexNext: number, dim: number): number;
  }

}

declare module 'team.creative.creativecore.common.util.math.interpolation.HermiteInterpolation' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Tension extends Enum<Tension> {}
  class Tension extends Enum<Tension> {
    static readonly High: Tension;
    static readonly Normal: Tension;
    static readonly Low: Tension;
    static valueOf(name: string): Tension;
    static values(): Tension[];
  }

}

declare module 'team.creative.creativecore.common.util.math' {
  class Maths {
    static readonly EPSILON: number;
    static readonly EPSILON_UP: number;
    static readonly EPSILON_DOUBLE: number;
    static readonly EPSILON_UP_DOUBLE: number;
    static readonly EPSILON_PRECISE: number;
    static readonly EPSILON_PRECISE_UP: number;
    static readonly EPSILON_PRECISE_DOUBLE: number;
    static readonly EPSILON_PRECISE_UP_DOUBLE: number;
    static equals(a: number, b: number): boolean;
    static equals(a: number, b: number, epsilon: number): boolean;
    static equals(a: number, b: number): boolean;
    static equals(a: number, b: number, epsilon: number): boolean;
    static greaterThanAndEquals(a: number, b: number): boolean;
    static max(a: number, b: number, c: number): number;
    static max(a: number, b: number, c: number): number;
    static max(a: number, b: number, c: number): number;
    static max(a: number, b: number, c: number): number;
    static min(a: number, b: number, c: number): number;
    static min(a: number, b: number, c: number): number;
    static min(a: number, b: number, c: number): number;
    static min(a: number, b: number, c: number): number;
    static msToTick(ms: number): number;
    static round(value: number): number;
    static round(value: number): number;
    static safeDivide(v1: number, v2: number): number;
    static safePercent(v1: number, v2: number): number;
    static safeRound(value: number): number;
    static smallerThanAndEquals(a: number, b: number): boolean;
    static tickToMs(ticks: number): number;
  }


  class TimeMath {
    static timestamp(time: number): string;
  }

}

declare module 'team.creative.creativecore.common.util.math.matrix' {
  import { Vec3d, Vec3f, Vec4d } from 'team.creative.creativecore.common.util.math.vec';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { Axis } from 'team.creative.creativecore.common.util.math.base';
  import { BlockPos, Vec3i } from 'net.minecraft.core';
  import { Vector3d } from 'org.joml';
  import { Vec3, AABB } from 'net.minecraft.world.phys';
  import { ABB } from 'team.creative.creativecore.common.util.math.box';

  interface ChildVecOrigin extends VecOrigin {}
  class ChildVecOrigin extends VecOrigin {
    parent: IVecOrigin;
    constructor(parent: IVecOrigin, center: Vec3d);
    get parent(): IVecOrigin;
    hasChanged(): boolean;
    onlyRotateWithoutCenter(vec: Vec3d): void;
    setupRenderingInternal(matrixStack: PoseStack, camX: number, camY: number, camZ: number, partialTicks: number): void;
    transformPointToFakeWorld(vec: Vec3d): void;
    transformPointToFakeWorld(pos: BlockPos): BlockPos;
    transformPointToFakeWorld(vec: Vector3d): Vector3d;
    transformPointToFakeWorld(vec: Vec3): Vec3;
    transformPointToWorld(vec: Vec3d): void;
    transformPointToWorld(pos: BlockPos): BlockPos;
    transformPointToWorld(vec: Vector3d): Vector3d;
    transformPointToWorld(vec: Vec3): Vec3;
    translationCombined(axis: Axis): number;
  }


  interface IntMatrix3 extends IntMatrix3c {}
  class IntMatrix3 extends IntMatrix3c {
    constructor();

    constructor(array: number[]);

    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);

    constructor(matrix: IntMatrix3c);

    constructor(m1: IntMatrix3c, m2: IntMatrix3c);
    equals(object: any): boolean;
    get asArray(): number[];
    getX(vec: number[]): number;
    getX(vec: Vec3i): number;
    getX(x: number, y: number, z: number): number;
    getX(x: number, y: number, z: number): number;
    getX<T>(x: T, y: T, z: T): T;
    getY(vec: number[]): number;
    getY(vec: Vec3i): number;
    getY(x: number, y: number, z: number): number;
    getY(x: number, y: number, z: number): number;
    getY<T>(x: T, y: T, z: T): T;
    getZ(vec: number[]): number;
    getZ(vec: Vec3i): number;
    getZ(x: number, y: number, z: number): number;
    getZ(x: number, y: number, z: number): number;
    getZ<T>(x: T, y: T, z: T): T;
    invertedX(): boolean;
    invertedY(): boolean;
    invertedZ(): boolean;
    isIdentity(): boolean;
    m00(): number;
    m01(): number;
    m02(): number;
    m10(): number;
    m11(): number;
    m12(): number;
    m20(): number;
    m21(): number;
    m22(): number;
    mul(right: IntMatrix3c): IntMatrix3c;
    mul(right: IntMatrix3c, dest: IntMatrix3): IntMatrix3c;
    toString(): string;
    transform(vec: BlockPos): BlockPos;
    transform(vec: Vec3i): Vec3i;
    transform(vec: Vec3): Vec3;
    transform(triple: Vec3d): void;
    transform(triple: Vec3f): void;
  }


  class IntMatrix3c {
    static readonly IDENTIY: IntMatrix3;
    get asArray(): number[];
    getX(var1: number[]): number;
    getX(var1: Vec3i): number;
    getX(var1: number, var2: number, var3: number): number;
    getX(var1: number, var3: number, var5: number): number;
    getX<T>(var1: T, var2: T, var3: T): T;
    getY(var1: number[]): number;
    getY(var1: Vec3i): number;
    getY(var1: number, var2: number, var3: number): number;
    getY(var1: number, var3: number, var5: number): number;
    getY<T>(var1: T, var2: T, var3: T): T;
    getZ(var1: number[]): number;
    getZ(var1: Vec3i): number;
    getZ(var1: number, var2: number, var3: number): number;
    getZ(var1: number, var3: number, var5: number): number;
    getZ<T>(var1: T, var2: T, var3: T): T;
    invertedX(): boolean;
    invertedY(): boolean;
    invertedZ(): boolean;
    isIdentity(): boolean;
    m00(): number;
    m01(): number;
    m02(): number;
    m10(): number;
    m11(): number;
    m12(): number;
    m20(): number;
    m21(): number;
    m22(): number;
    transform(var1: BlockPos): BlockPos;
    transform(var1: Vec3i): Vec3i;
    transform(var1: Vec3): Vec3;
    transform(var1: Vec3d): void;
    transform(var1: Vec3f): void;
  }


  class IVecOrigin {
    center(): Vec3d;
    copy(): IVecOrigin;
    get parent(): IVecOrigin;
    getAABB(box: AABB): ABB;
    getAABB(box: ABB): ABB;
    getOBB(box: AABB): ABB;
    getOBB(box: ABB): ABB;
    hasChanged(): boolean;
    isRotated(): boolean;
    off(var1: number, var3: number, var5: number): void;
    offX(): number;
    offX(var1: number): void;
    offXLast(): number;
    offY(): number;
    offY(var1: number): void;
    offYLast(): number;
    offZ(): number;
    offZ(var1: number): void;
    offZLast(): number;
    onlyRotateWithoutCenter(vec: Vec3d): void;
    rot(var1: number, var3: number, var5: number): void;
    rotX(): number;
    rotX(var1: number): void;
    rotXLast(): number;
    rotY(): number;
    rotY(var1: number): void;
    rotYLast(): number;
    rotZ(): number;
    rotZ(var1: number): void;
    rotZLast(): number;
    rotation(): Matrix3;
    rotationInv(): Matrix3;
    set(origin: IVecOrigin): void;
    setCenter(var1: Vec3d): void;
    setupRendering(matrixStack: PoseStack, camX: number, camY: number, camZ: number, partialTicks: number): void;
    setupRenderingInternal(matrixStack: PoseStack, camX: number, camY: number, camZ: number, partialTicks: number): void;
    tick(): void;
    transformPointToFakeWorld(pos: BlockPos): BlockPos;
    transformPointToFakeWorld(vec: Vec3d): void;
    transformPointToFakeWorld(vec: Vector3d): Vector3d;
    transformPointToFakeWorld(vec: Vec3): Vec3;
    transformPointToWorld(pos: BlockPos): BlockPos;
    transformPointToWorld(vec: Vec3d): void;
    transformPointToWorld(vec: Vector3d): Vector3d;
    transformPointToWorld(vec: Vec3): Vec3;
    translation(): Vec3d;
    translationCombined(axis: Axis): number;
  }


  class Matrix3 {
    m00: number;
    m01: number;
    m02: number;
    m10: number;
    m11: number;
    m12: number;
    m20: number;
    m21: number;
    m22: number;
    constructor();

    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);

    constructor(matrix: Matrix3);
    add(scalar: number): void;
    add(m1: Matrix3): void;
    determinant(): number;
    equals(m1: Matrix3): boolean;
    equals(t1: any): boolean;
    get scale(): number;
    getElement(row: number, column: number): number;
    invert(): void;
    invert(m: Matrix3): void;
    mul(scalar: number): void;
    mul(m1: Matrix3): void;
    mulNormalize(m1: Matrix3): void;
    normalize(): void;
    normalizeCP(): void;
    rotX(angle: number): void;
    rotY(angle: number): void;
    rotZ(angle: number): void;
    set(m1: Matrix3): void;
    set(scale: number): void;
    set scale(scale: number);
    setElement(row: number, column: number, value: number): void;
    setIdentity(): void;
    sub(m1: Matrix3): void;
    toString(): string;
    transform(t: Vec3d): void;
    transform(t: Vec3f): void;
    transpose(): void;
  }


  class Matrix4 {
    m00: number;
    m01: number;
    m02: number;
    m03: number;
    m10: number;
    m11: number;
    m12: number;
    m13: number;
    m20: number;
    m21: number;
    m22: number;
    m23: number;
    m30: number;
    m31: number;
    m32: number;
    m33: number;
    constructor(var1: number, var3: number, var5: number, var7: number, var9: number, var11: number, var13: number, var15: number, var17: number, var19: number, var21: number, var23: number, var25: number, var27: number, var29: number, var31: number);

    constructor(var1: number[]);

    constructor(var1: Matrix4);

    constructor(var1: Matrix3, var2: Vec3d, var3: number);

    constructor();
    add(var1: number): void;
    add(var1: number, var3: Matrix4): void;
    add(var1: Matrix4, var2: Matrix4): void;
    add(var1: Matrix4): void;
    clone(): any;
    determinant(): number;
    epsilonEquals(var1: Matrix4, var2: number): boolean;
    epsilonEquals(var1: Matrix4, var2: number): boolean;
    equals(var1: Matrix4): boolean;
    equals(var1: any): boolean;
    get(var1: Matrix3): void;
    get(var1: Matrix3, var2: Vec3d): number;
    get(var1: Vec3d): void;
    get m00(): number;
    get m01(): number;
    get m02(): number;
    get m03(): number;
    get m10(): number;
    get m11(): number;
    get m12(): number;
    get m13(): number;
    get m20(): number;
    get m21(): number;
    get m22(): number;
    get m23(): number;
    get m30(): number;
    get m31(): number;
    get m32(): number;
    get m33(): number;
    get scale(): number;
    getColumn(var1: number, var2: Vec4d): void;
    getColumn(var1: number, var2: number[]): void;
    getElement(var1: number, var2: number): number;
    getRotationScale(var1: Matrix3): void;
    getRow(var1: number, var2: Vec4d): void;
    getRow(var1: number, var2: number[]): void;
    hashCode(): number;
    invert(var1: Matrix4): void;
    invert(): void;
    mul(var1: number): void;
    mul(var1: number, var3: Matrix4): void;
    mul(var1: Matrix4): void;
    mul(var1: Matrix4, var2: Matrix4): void;
    mulTransposeBoth(var1: Matrix4, var2: Matrix4): void;
    mulTransposeLeft(var1: Matrix4, var2: Matrix4): void;
    mulTransposeRight(var1: Matrix4, var2: Matrix4): void;
    negate(): void;
    negate(var1: Matrix4): void;
    rotX(var1: number): void;
    rotY(var1: number): void;
    rotZ(var1: number): void;
    set(var1: number[]): void;
    set(var1: Matrix3): void;
    set(var1: Matrix4): void;
    set(var1: number): void;
    set(var1: Vec3d): void;
    set(var1: number, var3: Vec3d): void;
    set(var1: Vec3d, var2: number): void;
    set(var1: Matrix3, var2: Vec3d, var3: number): void;
    set m00(var1: number);
    set m01(var1: number);
    set m02(var1: number);
    set m03(var1: number);
    set m10(var1: number);
    set m11(var1: number);
    set m12(var1: number);
    set m13(var1: number);
    set m20(var1: number);
    set m21(var1: number);
    set m22(var1: number);
    set m23(var1: number);
    set m30(var1: number);
    set m31(var1: number);
    set m32(var1: number);
    set m33(var1: number);
    set scale(var1: number);
    setColumn(var1: number, var2: number, var4: number, var6: number, var8: number): void;
    setColumn(var1: number, var2: Vec4d): void;
    setColumn(var1: number, var2: number[]): void;
    setElement(var1: number, var2: number, var3: number): void;
    setIdentity(): void;
    setRotation(var1: Matrix3): void;
    setRotationScale(var1: Matrix3): void;
    setRow(var1: number, var2: number, var4: number, var6: number, var8: number): void;
    setRow(var1: number, var2: Vec4d): void;
    setRow(var1: number, var2: number[]): void;
    setTranslation(var1: Vec3d): void;
    setZero(): void;
    sub(var1: Matrix4, var2: Matrix4): void;
    sub(var1: Matrix4): void;
    toString(): string;
    transform(var1: Vec4d, var2: Vec4d): void;
    transform(var1: Vec4d): void;
    transform(var1: Vec3d, var2: Vec3d): void;
    transform(var1: Vec3d): void;
    transform(var1: Vec3f, var2: Vec3f): void;
    transform(var1: Vec3f): void;
    transpose(): void;
    transpose(var1: Matrix4): void;
  }


  interface VecOrigin extends IVecOrigin {}
  class VecOrigin extends IVecOrigin {
    constructor(center: Vec3d);
    center(): Vec3d;
    copy(): IVecOrigin;
    get parent(): IVecOrigin;
    isRotated(): boolean;
    off(x: number, y: number, z: number): void;
    offX(): number;
    offX(value: number): void;
    offXLast(): number;
    offY(): number;
    offY(value: number): void;
    offYLast(): number;
    offZ(): number;
    offZ(value: number): void;
    offZLast(): number;
    rot(x: number, y: number, z: number): void;
    rotX(): number;
    rotX(value: number): void;
    rotXLast(): number;
    rotY(): number;
    rotY(value: number): void;
    rotYLast(): number;
    rotZ(): number;
    rotZ(value: number): void;
    rotZLast(): number;
    rotation(): Matrix3;
    rotationInv(): Matrix3;
    setCenter(vec: Vec3d): void;
    tick(): void;
    translation(): Vec3d;
  }

}

declare module 'team.creative.creativecore.common.util.math.transformation' {
  import { Enum } from 'java.lang';
  import { Facing, Axis } from 'team.creative.creativecore.common.util.math.base';
  import { Vec3d, Vec3f } from 'team.creative.creativecore.common.util.math.vec';
  import { List } from 'java.util';
  import { Direction, Vec3i, BlockPos } from 'net.minecraft.core';
  import { Axis as direction_Axis } from 'Direction';
  import { Rotation as net_minecraft_world_level_block_Rotation } from 'net.minecraft.world.level.block';
  import { IntMatrix3c } from 'team.creative.creativecore.common.util.math.matrix';
  import { Vec3 } from 'net.minecraft.world.phys';

  interface BooleanRotation extends Enum<BooleanRotation> {}
  class BooleanRotation extends Enum<BooleanRotation> {
    static readonly X_PP: BooleanRotation;
    static readonly X_NP: BooleanRotation;
    static readonly X_NN: BooleanRotation;
    static readonly X_PN: BooleanRotation;
    static readonly Y_PP: BooleanRotation;
    static readonly Y_PN: BooleanRotation;
    static readonly Y_NN: BooleanRotation;
    static readonly Y_NP: BooleanRotation;
    static readonly Z_PP: BooleanRotation;
    static readonly Z_NP: BooleanRotation;
    static readonly Z_NN: BooleanRotation;
    static readonly Z_PN: BooleanRotation;
    clockwise(): BooleanRotation;
    clockwiseMaxFacing(): Facing;
    counterClockwise(): BooleanRotation;
    counterMaxClockwiseFacing(): Facing;
    static get(axis: Axis, vec: Vec3d): BooleanRotation;
    is(vec: Vec3d): boolean;
    static valueOf(name: string): BooleanRotation;
    static values(): BooleanRotation[];
  }


  class Mirror {
    static mirror(facing: Direction, axis: direction_Axis): Direction;
    static mirror(vec: Vec3i, axis: direction_Axis): Vec3i;
    static mirror(vec: BlockPos, axis: direction_Axis): BlockPos;
    static mirror(vec: Vec3d, axis: direction_Axis): void;
    static mirror(vec: Vec3f, axis: direction_Axis): void;
  }


  interface Rotation extends Enum<Rotation> {}
  class Rotation extends Enum<Rotation> {
    static readonly X_CLOCKWISE: Rotation;
    static readonly X_COUNTER_CLOCKWISE: Rotation;
    static readonly Y_CLOCKWISE: Rotation;
    static readonly Y_COUNTER_CLOCKWISE: Rotation;
    static readonly Z_CLOCKWISE: Rotation;
    static readonly Z_COUNTER_CLOCKWISE: Rotation;
    get matrix(): IntMatrix3c;
    static getRotation(axis: Axis, clockwise: boolean): Rotation;
    static getRotation(rotationIn: net_minecraft_world_level_block_Rotation): Rotation;
    static getRotationCount(rotationIn: net_minecraft_world_level_block_Rotation): number;
    mirror(axis: Axis): Rotation;
    static ofNormal(vec: Vec3i): Rotation;
    opposite(): Rotation;
    rotate(facing: Facing): Facing;
    rotate(axis: Axis): Axis;
    rotate(by: Rotation): Rotation;
    transform(matrix: IntMatrix3c): Rotation;
    transform(vec: BlockPos): BlockPos;
    transform(vec: Vec3i): Vec3i;
    transform(vec: Vec3): Vec3;
    transform(vec: Vec3d): void;
    transform(vec: Vec3f): void;
    static valueOf(name: string): Rotation;
    static values(): Rotation[];
  }

}

declare module 'team.creative.creativecore.common.util.math.utils' {
  import { Boolean } from 'java.lang';

  class BooleanUtils {
    static any(state: boolean[]): boolean;
    static asArray(value: boolean): boolean[];
    static boolToInt(state: boolean[]): number;
    static copy(state: boolean[]): boolean[];
    static countTrue(...array: boolean[]): number;
    static equals(state: boolean[], state2: boolean[]): boolean;
    static explicitOneFalse(...array: boolean[]): boolean;
    static explicitOneTrue(...array: boolean[]): boolean;
    static getRequiredBandwidth(number: number): number;
    static intToBool(number: number, state: boolean[]): void;
    static isFalse(value: boolean): boolean;
    static isTrue(value: boolean): boolean;
    static or(state: boolean[], state2: boolean[]): void;
    static print(state: boolean[]): string;
    static reset(state: boolean[]): void;
    static set(state: boolean[], newState: boolean[]): void;
    static toBits(number: number, bandwidth: number): boolean[];
    static toInt(value: boolean): number;
    static toNumber(b: boolean[]): number;
  }


  class IntegerUtils {
    static bitIs(number: number, index: number): boolean;
    static print(number: number): string;
    static set(number: number, index: number, value: boolean): number;
    static set(number: number, index: number): number;
    static unset(number: number, index: number): number;
  }

}

declare module 'team.creative.creativecore.common.util.math.vec' {
  import { List } from 'java.util';
  import { BitRange } from 'team.creative.creativecore.common.util.math.vec.RangedBitSet';
  import { Axis } from 'team.creative.creativecore.common.util.math.base';
  import { Vec3i, BlockPos } from 'net.minecraft.core';
  import { Vector3d, Vector3f } from 'org.joml';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Class } from 'java.lang';
  import { MutableBlockPos } from 'BlockPos';
  import { Axis as direction_Axis } from 'Direction';

  class RangedBitSet {
    constructor(min: number, max: number);
    add(value: number): void;
    get max(): number;
    get min(): number;
    get ranges(): BitRange[];
  }


  class SmoothValue {
    readonly time: number;
    constructor(time: number, initalValue: number);

    constructor(time: number);
    add(value: number): void;
    aimed(): number;
    current(): number;
    set(value: number): void;
    setStart(value: number): void;
    tick(): void;
  }


  interface Vec1d extends VecNd<Vec1d> {}
  class Vec1d extends VecNd<Vec1d> {
    x: number;
    constructor();

    constructor(x: number);

    constructor(vec: Vec1d);
    add(vec: Vec1d): void;
    angle(vec: Vec1d): number;
    copy(): Vec1d;
    dimensions(): number;
    distance(vec: Vec1d): number;
    distanceSqr(vec: Vec1d): number;
    dot(vec: Vec1d): number;
    epsilonEquals(var1: Vec1d, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec1d): void;
    set(dim: number, value: number): void;
    set(axis: Axis, value: number): void;
    sub(vec: Vec1d): void;
  }


  interface Vec1f extends VecNf<Vec1f> {}
  class Vec1f extends VecNf<Vec1f> {
    x: number;
    constructor();

    constructor(x: number);

    constructor(vec: Vec1f);
    add(vec: Vec1f): void;
    angle(vec: Vec1f): number;
    copy(): Vec1f;
    dimensions(): number;
    distance(vec: Vec1f): number;
    distanceSqr(vec: Vec1f): number;
    dot(vec: Vec1f): number;
    epsilonEquals(var1: Vec1f, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec1f): void;
    set(dim: number, value: number): void;
    set(axis: Axis, value: number): void;
    sub(vec: Vec1f): void;
  }


  interface Vec2d extends VecNd<Vec2d> {}
  class Vec2d extends VecNd<Vec2d> {
    x: number;
    y: number;
    constructor();

    constructor(x: number, y: number);

    constructor(vec: Vec2d);
    add(x: number, y: number): void;
    add(vec: Vec2d): void;
    angle(vec: Vec2d): number;
    copy(): Vec2d;
    dimensions(): number;
    distance(vec: Vec2d): number;
    distanceSqr(vec: Vec2d): number;
    dot(vec: Vec2d): number;
    epsilonEquals(var1: Vec2d, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec2d): void;
    set(x: number, y: number): void;
    set(dim: number, value: number): void;
    set(axis: Axis, value: number): void;
    sub(x: number, y: number): void;
    sub(vec: Vec2d): void;
  }


  interface Vec2f extends VecNf<Vec2f> {}
  class Vec2f extends VecNf<Vec2f> {
    x: number;
    y: number;
    constructor();

    constructor(x: number, y: number);

    constructor(vec: Vec2f);
    add(x: number, y: number): void;
    add(vec: Vec2f): void;
    angle(vec: Vec2f): number;
    copy(): Vec2f;
    dimensions(): number;
    distance(vec: Vec2f): number;
    distanceSqr(vec: Vec2f): number;
    dot(vec: Vec2f): number;
    epsilonEquals(var1: Vec2f, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec2f): void;
    set(dim: number, value: number): void;
    set(axis: Axis, value: number): void;
    sub(x: number, y: number): void;
    sub(vec: Vec2f): void;
  }


  interface Vec3d extends VecNd<Vec3d> {}
  class Vec3d extends VecNd<Vec3d> {
    x: number;
    y: number;
    z: number;
    constructor();

    constructor(vec: Vec3i);

    constructor(x: number, y: number, z: number);

    constructor(vec: Vec3d);

    constructor(vec: Vec3f);

    constructor(vec: Vector3d);

    constructor(vec: Vec3);

    constructor(step: Vector3f);
    add(vec: Vec3d): void;
    angle(vec: Vec3d): number;
    copy(): Vec3d;
    cross(vec1: Vec3d, vec2: Vec3d): void;
    dimensions(): number;
    distance(vec: Vec3): number;
    distance(vec: Vec3d): number;
    distance(x: number, y: number, z: number): number;
    distanceSqr(vec: Vec3d): number;
    distanceSqr(x: number, y: number, z: number): number;
    dot(vec: Vec3d): number;
    epsilonEquals(var1: Vec3d, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec3d): void;
    set(vec: Vec3): void;
    set(x: number, y: number, z: number): void;
    set(axis: Axis, value: number): void;
    set(dim: number, value: number): void;
    sub(vec: Vec3d): void;
    toBlockPos(): BlockPos;
    toVanilla(): Vec3;
  }


  interface Vec3f extends VecNf<Vec3f> {}
  class Vec3f extends VecNf<Vec3f> {
    x: number;
    y: number;
    z: number;
    constructor();

    constructor(x: number, y: number, z: number);

    constructor(vec: Vec3f);

    constructor(vec: Vector3f);

    constructor(vec: Vec3d);
    add(vec: Vec3f): void;
    angle(vec: Vec3f): number;
    copy(): Vec3f;
    cross(vec1: Vec3f, vec2: Vec3f): void;
    dimensions(): number;
    distance(vec: Vec3f): number;
    distanceSqr(vec: Vec3f): number;
    dot(vec: Vec3f): number;
    epsilonEquals(var1: Vec3f, var2: number): boolean;
    equals(obj: any): boolean;
    get(axis: Axis): number;
    get(dim: number): number;
    length(): number;
    lengthSquared(): number;
    scale(dScale: number): void;
    set(vec: Vec3f): void;
    set(x: number, y: number, z: number): void;
    set(dim: number, value: number): void;
    set(axis: Axis, value: number): void;
    sub(vec: Vec3f): void;
    toVanilla(): Vector3d;
  }


  interface Vec4d extends VecNd<Vec4d> {}
  class Vec4d extends VecNd<Vec4d> {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor();

    constructor(x: number, y: number, z: number, w: number);

    constructor(vec: Vec3d, w: number);

    constructor(vec: Vec4d);
    add(vec: Vec4d): void;
    angle(vec: Vec4d): number;
    copy(): Vec4d;
    dimensions(): number;
    distance(vec: Vec4d): number;
    distanceSqr(vec: Vec4d): number;
    dot(vec: Vec4d): number;
    epsilonEquals(var1: Vec4d, var2: number): boolean;
    equals(obj: any): boolean;
    get(dim: number): number;
    get(axis: Axis): number;
    length(): number;
    lengthSquared(): number;
    scale(scale: number): void;
    set(vec: Vec4d): void;
    set(x: number, y: number, z: number, w: number): void;
    set(axis: Axis, value: number): void;
    set(dim: number, value: number): void;
    sub(vec: Vec4d): void;
  }


  class VecNd<T extends VecNd = any> {
    constructor();

    constructor(vec: T);
    add(var1: T): void;
    add(origin: T, vec: T): void;
    angle(var1: T): number;
    copy(): T;
    static createEmptyVec<T extends VecNd>(className: Class<T>): T;
    dimensions(): number;
    distance(var1: T): number;
    distanceSqr(var1: T): number;
    dot(var1: T): number;
    epsilonEquals(var1: T, var2: number): boolean;
    epsilonEquals(vec: T): boolean;
    equals(var1: any): boolean;
    get(axis: Axis): number;
    get(var1: number): number;
    invert(): void;
    length(): number;
    lengthSquared(): number;
    static load(array: number[]): VecNd;
    normalize(): void;
    scale(var1: number): void;
    set(var1: T): void;
    set(axis: Axis, value: number): void;
    set(var1: number, var2: number): void;
    sub(var1: T): void;
    sub(origin: T, vec: T): void;
    toLong(): number[];
    toString(): string;
  }


  class VecNf<T extends VecNf = any> {
    constructor();

    constructor(vec: T);
    add(var1: T): void;
    add(origin: T, vec: T): void;
    angle(var1: T): number;
    copy(): T;
    dimensions(): number;
    distance(var1: T): number;
    distanceSqr(var1: T): number;
    dot(var1: T): number;
    epsilonEquals(var1: T, var2: number): boolean;
    epsilonEquals(vec: T): boolean;
    equals(var1: any): boolean;
    get(axis: Axis): number;
    get(var1: number): number;
    invert(): void;
    length(): number;
    lengthSquared(): number;
    normalize(): void;
    scale(var1: number): void;
    set(var1: T): void;
    set(axis: Axis, value: number): void;
    set(var1: number, var2: number): void;
    sub(var1: T): void;
    sub(origin: T, vec: T): void;
    toString(): string;
  }


  class VectorUtils {
    static equals(number: number, number2: number): boolean;
    static equals(number: number, number2: number): boolean;
    static get(axis: Axis, vec: Vector3d): number;
    static get(axis: Axis, vec: Vec3): number;
    static get(axis: direction_Axis, vec: Vec3): number;
    static get(axis: Axis, vec: Vector3f): number;
    static get(axis: Axis, vec: Vec3i): number;
    static get(axis: Axis, x: number, y: number, z: number): number;
    static get(axis: Axis, x: number, y: number, z: number): number;
    static get(axis: Axis, x: number, y: number, z: number): number;
    static get(axis: direction_Axis, x: number, y: number, z: number): number;
    static get(axis: direction_Axis, x: number, y: number, z: number): number;
    static get(axis: direction_Axis, x: number, y: number, z: number): number;
    static greaterEquals(number: number, number2: number): boolean;
    static greaterEquals(number: number, number2: number): boolean;
    static isZero(number: number): boolean;
    static isZero(number: number): boolean;
    static set(vec: Vector3d, value: number, axis: Axis): Vector3d;
    static set(vec: Vec3, value: number, axis: Axis): Vec3;
    static set(vec: MutableBlockPos, value: number, axis: Axis): void;
    static set(vec: Vec3i, value: number, axis: Axis): Vec3i;
    static set(vec: BlockPos, value: number, axis: Axis): BlockPos;
    static smallerEquals(number: number, number2: number): boolean;
    static smallerEquals(number: number, number2: number): boolean;
  }

}

declare module 'team.creative.creativecore.common.util.mc' {
  import { Vector3d } from 'org.joml';
  import { JsonObject, JsonElement } from 'com.google.gson';
  import { CompoundTag, Tag } from 'net.minecraft.nbt';
  import { Level, GameType, LevelAccessor } from 'net.minecraft.world.level';
  import { List } from 'java.util';
  import { ItemStack } from 'net.minecraft.world.item';
  import { BlockPos } from 'net.minecraft.core';
  import { Player } from 'net.minecraft.world.entity.player';
  import { Path } from 'java.nio.file';
  import { PackType, PackResources } from 'net.minecraft.server.packs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Container } from 'net.minecraft.world';
  import { Resource } from 'net.minecraft.server.packs.resources';
  import { Predicate } from 'java.util.function';
  import { IItemHandler } from 'net.neoforged.neoforge.items';

  class ColorUtils {
    static readonly WHITE: number;
    static readonly RED: number;
    static readonly GREEN: number;
    static readonly BLUE: number;
    static readonly LIGHT_BLUE: number;
    static readonly ORANGE: number;
    static readonly YELLOW: number;
    static readonly CYAN: number;
    static readonly MAGENTA: number;
    static readonly BLACK: number;
    static readonly GRAY: number;
    static readonly DARK_GRAY: number;
    static alpha(color: number): number;
    static alphaF(color: number): number;
    static blend(i1: number, i2: number): number;
    static blend(i1: number, i2: number, ratio: number): number;
    static blue(color: number): number;
    static blueF(color: number): number;
    static green(color: number): number;
    static greenF(color: number): number;
    static isDefault(color: number): boolean;
    static isInvisible(color: number): boolean;
    static isTransparent(color: number): boolean;
    static red(color: number): number;
    static redF(color: number): number;
    static rgb(red: number, green: number, blue: number): number;
    static rgb(red: number, green: number, blue: number): number;
    static rgba(red: number, green: number, blue: number, alpha: number): number;
    static rgba(red: number, green: number, blue: number, alpha: number): number;
    static setAlpha(color: number, alpha: number): number;
    static substract(source: number, value: number): number;
    static toVec(color: number): Vector3d;
  }


  class JsonUtils {
    static cleanUp(json: JsonObject): boolean;
    static get(root: JsonObject, path: string[]): JsonObject;
    static of(compound: CompoundTag): JsonObject;
    static of(tag: Tag): JsonElement;
    static set(root: JsonObject, path: string[], key: string, element: JsonElement): void;
    static tryGet(root: JsonObject, path: string[]): JsonObject;
  }


  class LanguageUtils {
    static can(name: string): boolean;
    static translate(name: string): string;
    static translate(name: string, ...args: any[]): string;
    static translateOr(name: string, defaultString: string): string;
  }


  class LevelUtils {
    static dropItem(level: Level, stacks: ItemStack[], pos: BlockPos): void;
    static dropItem(level: Level, stack: ItemStack, pos: BlockPos): void;
    static dropItem(player: Player, stack: ItemStack): void;
    static dropItem(player: Player, stacks: ItemStack[]): void;
  }


  class NBTUtils {
    static mergeNotOverwrite(base: CompoundTag, toInsert: CompoundTag): CompoundTag;
    static of(o: JsonObject): CompoundTag;
    static of(o: JsonObject, compound: CompoundTag): CompoundTag;
    static of(element: JsonElement): Tag;
  }


  class PlatformResourceUtils {
    static length(path: Path): number;
    static resolvePath(type: PackType, source: PackResources, location: ResourceLocation, parts: string[]): Path;
  }


  class PlayerUtils {
    static addOrDrop(player: Player, stack: ItemStack): void;
    static addOrDrop(player: Player, container: Container): void;
    static getGameType(player: Player): GameType;
    static getPersistentData(player: Player): CompoundTag;
    static getReach(player: Player): number;
    static isAdventure(player: Player): boolean;
  }


  class ResourceUtils {
    static length(type: PackType, resource: Resource, location: ResourceLocation): number;
    static length(type: PackType, source: PackResources, location: ResourceLocation): number;
  }


  class StackUtils {
    static collect(stack: ItemStack, predicate: Predicate<ItemStack>, stacks: ItemStack[]): void;
    static collect(inventory: IItemHandler, predicate: Predicate<ItemStack>, stacks: ItemStack[]): void;
  }


  class TickUtils {
    static getFrameTime(level: LevelAccessor): number;
  }


  class TooltipUtils {
    static print(value: number): string;
    static print(value: number): string;
    static print(value: number): string;
    static printColor(color: number): string;
    static printRoman(input: number): string;
  }

}

declare module 'team.creative.creativecore.common.util.mc.ColorUtils' {
  import { Enum } from 'java.lang';
  import { Color } from 'team.creative.creativecore.common.util.type';
  import { List } from 'java.util';

  interface ColorPart extends Enum<ColorPart> {}
  class ColorPart extends Enum<ColorPart> {
    static readonly RED: ColorPart;
    static readonly GREEN: ColorPart;
    static readonly BLUE: ColorPart;
    static readonly ALPHA: ColorPart;
    get(var1: Color): number;
    set(var1: Color, var2: number): void;
    static valueOf(name: string): ColorPart;
    static values(): ColorPart[];
  }

}

declare module 'team.creative.creativecore.common.util.player' {
  import { NamedTypeRegistry } from 'team.creative.creativecore.common.util.registry';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ConfigKey } from 'team.creative.creativecore.common.config.key';
  import { Side } from 'team.creative.creativecore';
  import { JsonElement } from 'com.google.gson';
  import { GuiParent } from 'team.creative.creativecore.common.gui';

  class PlayerSelector {
    static readonly REGISTRY: NamedTypeRegistry;
    createControls(parent: GuiParent, key: ConfigKey): void;
    info(): string;
    is(var1: Player): boolean;
    loadValue(value: PlayerSelector, parent: GuiParent): void;
    static read(nbt: CompoundTag): PlayerSelector;
    readElement(key: ConfigKey, defaultValue: PlayerSelector, side: Side, element: JsonElement): PlayerSelector;
    readFromNBT(var1: CompoundTag): void;
    set(key: ConfigKey, value: PlayerSelector): PlayerSelector;
    writeElement(value: PlayerSelector, key: ConfigKey, side: Side): JsonElement;
    writeToNBT(nbt: CompoundTag): CompoundTag;
  }

}

declare module 'team.creative.creativecore.common.util.player.PlayerSelector' {
  import { PlayerSelector } from 'team.creative.creativecore.common.util.player';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { GameType } from 'net.minecraft.world.level';

  interface PlayerSelectorAnd extends PlayerSelector {}
  class PlayerSelectorAnd extends PlayerSelector {
    selectors: PlayerSelector[];
    constructor();

    constructor(...selector: PlayerSelector[]);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }


  interface PlayerSelectorOr extends PlayerSelector {}
  class PlayerSelectorOr extends PlayerSelector {
    selectors: PlayerSelector[];
    constructor();

    constructor(...selector: PlayerSelector[]);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }


  interface PlayerSelectorNot extends PlayerSelector {}
  class PlayerSelectorNot extends PlayerSelector {
    selector: PlayerSelector;
    constructor();

    constructor(selector: PlayerSelector);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }


  interface PlayerSelectorLevel extends PlayerSelector {}
  class PlayerSelectorLevel extends PlayerSelector {
    permissionLevel: number;
    constructor();

    constructor(permissionLevel: number);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }


  interface PlayerSelectorGamemode extends PlayerSelector {}
  class PlayerSelectorGamemode extends PlayerSelector {
    type: GameType;
    constructor();

    constructor(type: GameType);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }


  interface PlayerSelectorCommandSelector extends PlayerSelector {}
  class PlayerSelectorCommandSelector extends PlayerSelector {
    pattern: string;
    constructor();

    constructor(pattern: string);
    info(): string;
    is(player: Player): boolean;
    readFromNBT(nbt: CompoundTag): void;
  }

}

declare module 'team.creative.creativecore.common.util.registry' {
  import { ICreativeRegistry, ConfigEqualChecker } from 'team.creative.creativecore.common.config.core';
  import { Predicate, Supplier } from 'java.util.function';
  import { Field } from 'java.lang.reflect';
  import { Class, Iterable } from 'java.lang';
  import { Provider } from 'HolderLookup';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Side } from 'team.creative.creativecore';
  import { GuiConfigSubControlNested } from 'team.creative.creativecore.common.config.gui';
  import { Filter } from 'team.creative.creativecore.common.util.filter';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Collection, Set } from 'java.util';
  import { Entry } from 'Map';

  interface ConfigTypeRegistry<T = any> extends ICreativeRegistry {}
  class ConfigTypeRegistry<T = any> extends ICreativeRegistry {
    static readonly DEFAULT_FIELD_PREDICATE: Predicate;
    contains(clazz: Class<T>): boolean;
    create(name: string, data: T, side: Side): GuiConfigSubControlNested;
    createDefault(id: string): T;
    get equalChecker(): ConfigEqualChecker;
    getId(clazz: Class<T>): string;
    is(field: Field): boolean;
    is(field: Field, side: Side): boolean;
    load(provider: Provider, nbt: CompoundTag, side: Side): T;
    loadOrCreateDefault(provider: Provider, nbt: CompoundTag, id: string, side: Side): T;
    register<C extends T>(id: string, clazz: Class<C>, defaultReference: C, factory: Supplier<C>): void;
    save(provider: Provider, data: T, nbt: CompoundTag, side: Side): CompoundTag;
    setFieldPredicate(fieldPredicate: Predicate<Field>): ConfigTypeRegistry<T>;
    setKeepUnrelatedData(keep: boolean): ConfigTypeRegistry<T>;
  }


  class FilteredHandlerRegistry<U = any, T = any> {
    constructor(handler: T);
    allowOverwrite(): FilteredHandlerRegistry<U, T>;
    get(value: U): T;
    get default(): T;
    handlers(): Iterable<T>;
    register(value: U, handler: T): void;
    register(filter: Filter<U>, handler: T): void;
  }


  class LocatedHandlerRegistry<T = any> {
    constructor(handler: T);
    allowOverwrite(): LocatedHandlerRegistry<T>;
    contains(id: ResourceLocation): boolean;
    entrySet(): Set<Entry<ResourceLocation, T>>;
    get(id: ResourceLocation): T;
    get default(): T;
    getLocation(type: T): ResourceLocation;
    getOrThrow(id: ResourceLocation): T;
    keys(): Collection<ResourceLocation>;
    register(id: ResourceLocation, handler: T): void;
    registerDefault(id: ResourceLocation, handler: T): void;
    values(): Collection<T>;
  }


  class NamedClassBoundHandlerRegistry<C = any, T = any> {
    allowOverwrite(): NamedClassBoundHandlerRegistry<C, T>;
    classes(): Set<Class<C>>;
    static clearRegistry(registry: NamedClassBoundHandlerRegistry): void;
    contains(id: string): boolean;
    contains(clazz: Class): boolean;
    entrySet(): Set<Entry<string, T>>;
    get(id: string): T;
    get(clazz: Class<C>): T;
    get default(): T;
    getId(type: T): string;
    getId(clazz: Class<C>): string;
    getOrThrow(id: string): T;
    getOrThrow(clazz: Class<C>): T;
    keys(): Collection<string>;
    register(id: string, clazz: Class, handler: T): void;
    registerDefault(id: string, clazz: Class<C>, handler: T): void;
    values(): Collection<T>;
  }


  class NamedHandlerRegistry<T = any> {
    constructor(handler: T);
    allowOverwrite(): NamedHandlerRegistry<T>;
    static clearRegistry(registry: NamedHandlerRegistry): void;
    contains(id: string): boolean;
    entrySet(): Set<Entry<string, T>>;
    get(id: string): T;
    get default(): T;
    getId(type: T): string;
    getOrThrow(id: string): T;
    keys(): Collection<string>;
    register(id: string, handler: T): void;
    registerDefault(id: string, handler: T): void;
    values(): Collection<T>;
  }


  class NamedTypeRegistry<T = any> {
    addConstructorPattern(...classes: Class[]): NamedTypeRegistry<T>;
    allowOverwrite(): NamedTypeRegistry<T>;
    contains(id: string): boolean;
    create(id: string, ...objects: any[]): T;
    createSafe(ifFailed: Class<T>, id: string, ...objects: any[]): T;
    entrySet(): Set<Entry<string, Class<T>>>;
    get(id: string): Class<T>;
    getId(type: T): string;
    getId(type: Class<T>): string;
    getIdOrDefault(type: T, defaultValue: string): string;
    keys(): Collection<string>;
    register(id: string, type: Class<T>): void;
    values(): Collection<Class<T>>;
  }

}

declare module 'team.creative.creativecore.common.util.registry.exception' {
  import { Exception } from 'java.lang';

  interface IdNotFoundException extends RegistryException {}
  class IdNotFoundException extends RegistryException {
    constructor(id: string);
  }


  interface RegistryException extends Exception {}
  class RegistryException extends Exception {
    constructor(msg: string);
  }

}

declare module 'team.creative.creativecore.common.util.registry.NamedTypeRegistry' {
  import { RegistryException } from 'team.creative.creativecore.common.util.registry.exception';
  import { Class } from 'java.lang';

  interface ConstructorNotFoundException extends RegistryException {}
  class ConstructorNotFoundException extends RegistryException {
    constructor(objects: any[]);
  }


  interface ConstructorForbiddenException extends RegistryException {}
  class ConstructorForbiddenException extends RegistryException {
    constructor(classes: Class[], clazz: Class);
  }

}

declare module 'team.creative.creativecore.common.util.text' {
  import { Component, Style, ComponentContents, FormattedText } from 'net.minecraft.network.chat';
  import { FormattedSingleSink, AdvancedContent, AdvancedContentConsumer } from 'team.creative.creativecore.common.util.text.content';
  import { Optional, Set, List, Collection, Iterator } from 'java.util';
  import { StringSplitter } from 'net.minecraft.client';
  import { WidthProvider } from 'StringSplitter';
  import { Font } from 'net.minecraft.client.gui';
  import { Entry } from 'Map';
  import { TupleList } from 'team.creative.creativecore.common.util.type.list';
  import { CompiledText } from 'team.creative.creativecore.client.render.text';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Predicate, Function } from 'java.util.function';
  import { Iterable } from 'java.lang';

  class AdvancedComponentHelper {
    static readonly SPLITTER: AdvancedStringSplitter;
    accept(style: Style, content: AdvancedContent): Optional;
    accept(style: Style, content: string): Optional;
    static copy(component: Component): Component;
    static iterateFormatted(text: Component, style: Style, sink: FormattedSingleSink): boolean;
    static visit<T>(text: Component, consumer: AdvancedContentConsumer<T>, defaultStyle: Style): Optional<T>;
    static visit<T>(content: ComponentContents, consumer: AdvancedContentConsumer<T>, style: Style): Optional<T>;
  }


  interface AdvancedStringSplitter extends StringSplitter {}
  class AdvancedStringSplitter extends StringSplitter {
    readonly width: WidthProvider;
    readonly lineHeight: number;
    constructor(font: Font);
    accept(style: Style, content: AdvancedContent): boolean;
    accept(index: number, style: Style, character: number): boolean;
    stringWidth(text: FormattedText): number;
  }


  class IComponentMap<K = any> {
    build(): TupleList<K, CompiledText>;
    entrySet(): Set<Entry<K, Component[]>>;
    keys(): K[];
    values(): Collection<Component[]>;
  }


  class TextBuilder {
    constructor();

    constructor(components: Component[]);

    constructor(text: string);
    add(component: Component): TextBuilder;
    bool(value: boolean): TextBuilder;
    build(): Component[];
    color(color: number): TextBuilder;
    newLine(): TextBuilder;
    number(number: number): TextBuilder;
    number(number: number, rounded: boolean): TextBuilder;
    number(number: number): TextBuilder;
    number(number: number, rounded: boolean): TextBuilder;
    stack(stack: ItemStack): TextBuilder;
    text(text: string): TextBuilder;
    translate(text: string): TextBuilder;
    translate(text: string, ...param: any[]): TextBuilder;
    translateIfCan(text: string): TextBuilder;
  }


  interface TextMapBuilder<K = any> extends IComponentMap<K> {}
  class TextMapBuilder<K = any> extends IComponentMap<K> {
    addComponent(key: K, component: Component): TextMapBuilder<K>;
    addComponent(array: K[], toComponent: Function<K, Component>): TextMapBuilder<K>;
    addComponent(collection: Iterable<K>, toComponent: Function<K, Component>): TextMapBuilder<K>;
    addComponent(collection: Iterator<K>, toComponent: Function<K, Component>): TextMapBuilder<K>;
    addComponents(collection: Iterable<K>, toComponent: Function<K, Component[]>): TextMapBuilder<K>;
    addEntrySet(map: Set<Entry<string, K>>, toComponent: Function<Entry<string, K>, Component>): TextMapBuilder<K>;
    build(): TupleList<K, CompiledText>;
    entrySet(): Set<Entry<K, Component[]>>;
    first(): K;
    keys(): K[];
    setFilter(predicate: Predicate<string>): TextMapBuilder<K>;
    size(): number;
    values(): Collection<Component[]>;
  }

}

declare module 'team.creative.creativecore.common.util.text.content' {
  import { ComponentContents, Style, FormattedText } from 'net.minecraft.network.chat';
  import { Optional } from 'java.util';
  import { WidthProvider } from 'StringSplitter';
  import { StyledContentConsumer, ContentConsumer } from 'FormattedText';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { FormattedCharSink } from 'net.minecraft.util';

  interface AdvancedContent extends ComponentContents {}
  class AdvancedContent extends ComponentContents {
    asText(): FormattedText;
    height(): number;
    visit<T>(consumer: AdvancedContentConsumer<T>, style: Style): Optional<T>;
    width(var1: WidthProvider, var2: Style): number;
  }


  interface AdvancedContentConsumer<T = any> extends StyledContentConsumer<T> {}
  class AdvancedContentConsumer<T = any> extends StyledContentConsumer<T> {
    accept(var1: Style, var2: AdvancedContent): Optional<T>;
    accept(var1: Style, var2: string): Optional<T>;
  }


  interface AdvancedFormattedText extends FormattedText {}
  class AdvancedFormattedText extends FormattedText {
    height(): number;
    render(var1: GuiGraphics, var2: number): void;
    visit<T>(consumer: ContentConsumer<T>): Optional<T>;
    visit<T>(consumer: StyledContentConsumer<T>, style: Style): Optional<T>;
    width(var1: WidthProvider, var2: Style): number;
  }


  interface FormattedSingleSink extends FormattedCharSink {}
  class FormattedSingleSink extends FormattedCharSink {
    accept(var1: number, var2: Style, var3: number): boolean;
    accept(var1: Style, var2: AdvancedContent): boolean;
  }

}

declare module 'team.creative.creativecore.common.util.type' {
  import { Iterable, Enum } from 'java.lang';
  import { Vec3i } from 'net.minecraft.core';
  import { Vector3d } from 'org.joml';
  import { Vec3d } from 'team.creative.creativecore.common.util.math.vec';
  import { List } from 'java.util';

  interface Bunch<T = any> extends Iterable<T> {}
  class Bunch<T = any> extends Iterable<T> {
    size(): number;
  }


  class Color {
    static readonly NONE: Color;
    static readonly WHITE: Color;
    static readonly RED: Color;
    static readonly GREEN: Color;
    static readonly BLUE: Color;
    static readonly LIGHT_BLUE: Color;
    static readonly ORANGE: Color;
    static readonly YELLOW: Color;
    static readonly CYAN: Color;
    static readonly MAGENTA: Color;
    static readonly BLACK: Color;
    constructor();

    constructor(color: Color);

    constructor(color: number);

    constructor(r: number, g: number, b: number);

    constructor(r: number, g: number, b: number);

    constructor(r: number, g: number, b: number);

    constructor(r: number, g: number, b: number, a: number);

    constructor(r: number, g: number, b: number, a: number);

    constructor(r: number, g: number, b: number, a: number);

    constructor(vec: Vec3i);

    constructor(vec: Vector3d);
    blend(color: Color): void;
    blend(color: Color, ratio: number): void;
    static blend(color1: Color, color2: Color): Color;
    static blend(color1: Color, color2: Color, ratio: number): Color;
    static blend(i1: number, i2: number): number;
    static blend(i1: number, i2: number, ratio: number): number;
    get(type: ColorType): number;
    get alpha(): number;
    get alphaDecimal(): number;
    get blue(): number;
    get blueDecimal(): number;
    get green(): number;
    get greenDecimal(): number;
    get red(): number;
    get redDecimal(): number;
    getDecimal(type: ColorType): number;
    glColor(): void;
    isDefault(): boolean;
    isInvisible(): boolean;
    static isInvisible(color: number): boolean;
    isTransparent(): boolean;
    static isTransparent(color: number): boolean;
    isWhite(): boolean;
    static isWhite(color: number): boolean;
    set(color: Color): void;
    set(type: ColorType, value: number): void;
    set(type: ColorType, value: number): void;
    set alpha(a: number);
    set blue(b: number);
    set green(g: number);
    set red(r: number);
    setAlpha(a: number): void;
    setBlue(b: number): void;
    setGreen(g: number): void;
    setRed(r: number): void;
    toInt(): number;
    toVec(): Vec3d;
  }


  interface ColorType extends Enum<ColorType> {}
  class ColorType extends Enum<ColorType> {
    static readonly RED: ColorType;
    static readonly GREEN: ColorType;
    static readonly BLUE: ColorType;
    static readonly ALPHA: ColorType;
    get brightest(): number;
    static valueOf(name: string): ColorType;
    static values(): ColorType[];
  }


  class RunnableReturn {
    run(): boolean;
  }


  class TriPredicate<T = any, U = any, V = any> {
    test(var1: T, var2: U, var3: V): boolean;
  }

}

declare module 'team.creative.creativecore.common.util.type.itr' {
  import { ListIterator, Iterator, List } from 'java.util';
  import { Iterable, Class } from 'java.lang';
  import { Predicate, Function, Consumer } from 'java.util.function';

  interface ArrayIterator<T = any> extends IterableIterator<T> {}
  class ArrayIterator<T = any> extends IterableIterator<T> {
    readonly content: T[];
    constructor(...content: T[]);
    hasNext(): boolean;
    next(): T;
  }


  interface ArrayOffsetIterator<T = any> extends IterableIterator<T> {}
  class ArrayOffsetIterator<T = any> extends IterableIterator<T> {
    readonly content: T[];
    constructor(offset: number, ...content: T[]);
    hasNext(): boolean;
    next(): T;
  }


  interface ComputeNextIterator<T = any> extends IterableIterator<T> {}
  class ComputeNextIterator<T = any> extends IterableIterator<T> {
    hasNext(): boolean;
    next(): T;
  }


  interface ComputeNextListIterator<T = any> extends ListIterator<T> {}
  class ComputeNextListIterator<T = any> extends ListIterator<T> {
    hasNext(): boolean;
    hasPrevious(): boolean;
    next(): T;
    previous(): T;
  }


  interface ConsecutiveIterator<T = any> extends IterableIterator<T> {}
  class ConsecutiveIterator<T = any> extends IterableIterator<T> {
    readonly itrs: Iterator[];
    constructor(...itrs: Iterator<T>[]);

    constructor(...itrs: Iterable<T>[]);
    hasNext(): boolean;
    next(): T;
  }


  interface ConsecutiveListIterator<T = any> extends ListIterator<T> {}
  class ConsecutiveListIterator<T = any> extends ListIterator<T> {
    readonly itrs: ListIterator[];
    constructor(...itrs: ListIterator<T>[]);

    constructor(nestedList: T[][]);
    add(e: T): void;
    goEnd(): ConsecutiveListIterator;
    hasNext(): boolean;
    hasPrevious(): boolean;
    next(): T;
    nextIndex(): number;
    previous(): T;
    previousIndex(): number;
    remove(): void;
    set(e: T): void;
  }


  interface FilterIterator<T = any> extends ComputeNextIterator<T> {}
  class FilterIterator<T = any> extends ComputeNextIterator<T> {
    constructor(iterable: Iterable, clazz: Class);

    constructor(iterable: Iterator, clazz: Class);

    constructor(iterable: Iterable<E>, predicate: Predicate<E>);

    constructor(iterator: Iterator<E>, predicate: Predicate<E>);
    static skipNull<T>(itr: Iterator<T>): FilterIterator<T>;
  }


  interface FilterListIterator<T = any> extends ComputeNextListIterator<T> {}
  class FilterListIterator<T = any> extends ComputeNextListIterator<T> {
    constructor(iterable: List, clazz: Class);

    constructor(iterable: ListIterator, clazz: Class);

    constructor(iterable: T[], predicate: Predicate<T>);

    constructor(iterator: ListIterator<T>, predicate: Predicate<T>);
    add(e: T): void;
    nextIndex(): number;
    previousIndex(): number;
    remove(): void;
    set(e: T): void;
    static skipNull<T>(itr: ListIterator<T>): FilterListIterator<T>;
  }


  interface FunctionIterator<T = any> extends IterableIterator<T> {}
  class FunctionIterator<T = any> extends IterableIterator<T> {
    constructor(itr: Iterator<V>, func: Function<V, T>);

    constructor(itr: Iterable<V>, func: Function<V, T>);
    hasNext(): boolean;
    next(): T;
  }


  interface FunctionNonNullIterator<T = any> extends ComputeNextIterator<T> {}
  class FunctionNonNullIterator<T = any> extends ComputeNextIterator<T> {
    constructor(itr: Iterator<V>, func: Function<V, T>);

    constructor(itr: Iterable<V>, func: Function<V, T>);
  }


  interface InverseArrayIterator<T = any> extends IterableIterator<T> {}
  class InverseArrayIterator<T = any> extends IterableIterator<T> {
    readonly content: T[];
    constructor(content: T[]);
    hasNext(): boolean;
    next(): T;
  }


  interface InverseConsecutiveIterator<T = any> extends IterableIterator<T> {}
  class InverseConsecutiveIterator<T = any> extends IterableIterator<T> {
    readonly itrs: Iterator[];
    constructor(...itrs: Iterator<T>[]);

    constructor(...itrs: Iterable<T>[]);
    hasNext(): boolean;
    next(): T;
  }


  interface InverseListIterator<T = any> extends IterableIterator<T> {}
  class InverseListIterator<T = any> extends IterableIterator<T> {
    readonly content: List;
    constructor(content: T[]);
    hasNext(): boolean;
    next(): T;
  }


  interface IterableIterator<T = any> extends Iterable<T>, Iterator<T> {}
  class IterableIterator<T = any> extends Iterable<T> {
    iterator(): Iterator<T>;
  }


  interface NestedFunctionIterator<T = any> extends IterableIterator<T> {}
  class NestedFunctionIterator<T = any> extends IterableIterator<T> {
    readonly itr: Iterator;
    readonly function: Function;
    constructor(itrs: Iterable<V>, func: Function<V, Iterable<T>>);

    constructor(itrs: Iterator<V>, func: Function<V, Iterable<T>>);
    hasNext(): boolean;
    next(): T;
  }


  interface NestedIterator<T = any> extends IterableIterator<T> {}
  class NestedIterator<T = any> extends IterableIterator<T> {
    readonly itr: Iterator;
    constructor(itrs: Iterator<Iterable<T>>);

    constructor(itrs: Iterable<Iterable<T>>);
    hasNext(): boolean;
    next(): T;
  }


  interface SingleIterator<E = any> extends IterableIterator<E> {}
  class SingleIterator<E = any> extends IterableIterator<E> {
    constructor(element: E);
    forEachRemaining(action: Consumer<E>): void;
    hasNext(): boolean;
    next(): E;
    remove(): void;
  }


  interface TreeIterator<T = any> extends IterableIterator<T> {}
  class TreeIterator<T = any> extends IterableIterator<T> {
    constructor(start: T, functionParameter: Function<T, Iterator<T>>);
    hasNext(): boolean;
    next(): T;
  }

}

declare module 'team.creative.creativecore.common.util.type.list' {
  import { Iterable, Cloneable } from 'java.lang';
  import { ToIntFunction, Predicate, IntConsumer, Consumer, UnaryOperator } from 'java.util.function';
  import { Collection, List, Iterator, ArrayList, Comparator, Set, AbstractList, RandomAccess, Spliterator } from 'java.util';
  import { Entry } from 'Map';
  import { Serializable } from 'java.io';
  import { RegistryObjectListConfig, RegistryTagListConfig } from 'team.creative.creativecore.common.config.premade.registry';
  import { TagKey } from 'net.minecraft.tags';
  import { Block } from 'net.minecraft.world.level.block';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Item, ItemStack } from 'net.minecraft.world.item';

  interface BucketList<T = any> extends Iterable<T> {}
  class BucketList<T = any> extends Iterable<T> {
    constructor();

    constructor(initialBucketSize: number);

    constructor(content: Iterable<T>, bucketSorter: ToIntFunction<T>);
    add(bucket: number, element: T): void;
    addAll(content: Iterable<T>, bucketSorter: ToIntFunction<T>): void;
    bucketCount(): number;
    buckets(): Iterable<Iterable<T>>;
    clear(): void;
    inverseIterator(): Iterator<T>;
    iterator(): Iterator<T>;
    remove(bucket: number, element: T): void;
    removeAll(bucket: number, elements: Collection<T>): void;
    removeBucket(bucket: number): T[];
    removeBuckets(): void;
    size(): number;
  }


  interface CopyArrayCollection<E = any> extends Collection<E>, Cloneable {}
  class CopyArrayCollection<E = any> extends Collection<E> {
    static readonly SOFT_MAX_ARRAY_LENGTH: number;
    constructor();

    constructor(initialCapacity: number);

    constructor(element: E);

    constructor(c: Collection<E>);

    constructor(c: Iterable<E>);

    constructor(...toCopyIn: E[]);
    add(e: E): boolean;
    addAll(c: Collection<E>): boolean;
    clear(): void;
    clone(): any;
    contains(o: any): boolean;
    containsAll(c: Collection<any>): boolean;
    ensureCapacity(minCapacity: number): void;
    equals(o: any): boolean;
    first(): E;
    hasNext(): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
    static newLength(oldLength: number, minGrowth: number, prefGrowth: number): number;
    next(): E;
    remove(): void;
    remove(o: any): boolean;
    removeAll(c: Collection<any>): boolean;
    removeIf(filter: Predicate<E>): boolean;
    retainAll(c: Collection<any>): boolean;
    size(): number;
    toArray(): any[];
    toArray<T>(a: T[]): T[];
    toString(): string;
    trimToSize(): void;
  }


  interface IndexedCollector<T = any> extends Iterable<T> {}
  class IndexedCollector<T = any> extends Iterable<T> {
    add(index: number, element: T): void;
    add(element: T): void;
    clear(): void;
    endSection(): void;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    sectionIterator(consumer: IntConsumer): Iterator<T>;
    startSection(index: number): void;
  }


  interface MarkIterator<T = any> extends Iterator<T> {}
  class MarkIterator<T = any> extends Iterator<T> {
    mark(): void;
  }


  interface MarkList<T = any> extends Iterable<T> {}
  class MarkList<T = any> extends Iterable<T> {
    static readonly EMPTY: MarkList;
    constructor(content: T[]);
    allIgnoreMark(): Iterable<T>;
    clear(): void;
    getIgnoreMark(index: number): T;
    hasNext(): boolean;
    is(index: number): boolean;
    isEmpty(): boolean;
    iterator(): MarkIterator<T>;
    mark(index: number): void;
    mark(): void;
    next(): T;
    remaing(): number;
    reset(index: number): void;
    sizeIgnoreMark(): number;
  }


  interface Pair<K = any, V = any> extends Entry<K, V> {}
  class Pair<K = any, V = any> extends Entry<K, V> {
    readonly key: K;
    value: V;
    constructor(key: K, value: V);
    equals(obj: any): boolean;
    get key(): K;
    get value(): V;
    hashCode(): number;
    is(key: K): boolean;
    set value(value: V);
    toString(): string;
  }


  interface PairList<K = any, V = any> extends ArrayList<Pair> {}
  class PairList<K = any, V = any> extends ArrayList<Pair> {
    constructor();

    constructor(list: Pair<K, V>[]);
    add(e: Pair<K, V>): boolean;
    add(index: number, element: Pair<K, V>): void;
    add(key: K, value: V): boolean;
    addAll(c: Collection<Pair<K, V>>): boolean;
    addAll(index: number, c: Collection<Pair<K, V>>): boolean;
    clear(): void;
    containsKey(key: K): boolean;
    get first(): Pair<K, V>;
    get last(): Pair<K, V>;
    getPair(key: K): Pair<K, V>;
    getValue(key: K): V;
    indexOfKey(key: K): number;
    keys(): Set<K>;
    remove(index: number): Pair<K, V>;
    remove(o: any): boolean;
    removeAll(c: Collection<any>): boolean;
    removeIf(filter: Predicate<Pair<K, V>>): boolean;
    removeKey(key: K): boolean;
    retainAll(c: Collection<any>): boolean;
    set(key: K, value: V): void;
    set(index: number, element: Pair<K, V>): Pair<K, V>;
    setKey(index: number, key: K): void;
    sort(c: Comparator<Pair<K, V>>): void;
    values(): V[];
  }


  interface SingletonList<E = any> extends RandomAccess, Serializable, AbstractList<E> {}
  class SingletonList<E = any> extends RandomAccess {
    constructor(obj: E);
    characteristics(): number;
    contains(obj: any): boolean;
    estimateSize(): number;
    forEach(action: Consumer<E>): void;
    forEachRemaining(consumer: Consumer<E>): void;
    get(index: number): E;
    iterator(): Iterator<E>;
    removeIf(filter: Predicate<E>): boolean;
    replaceAll(operator: UnaryOperator<E>): void;
    setElement(element: E): SingletonList<E>;
    size(): number;
    sort(c: Comparator<E>): void;
    spliterator(): Spliterator<E>;
    tryAdvance(consumer: Consumer<E>): boolean;
    trySplit(): Spliterator<E>;
  }


  class SortingBlockList {
    blocks: RegistryObjectListConfig;
    tags: RegistryTagListConfig;
    add(tag: TagKey<Block>): SortingBlockList;
    add(block: Block): SortingBlockList;
    is(state: BlockState): boolean;
    is(block: Block): boolean;
  }


  class SortingList {
    entries: List;
    isWhitelist: boolean;
    constructor(list: SortingList);

    constructor();

    constructor(isWhitelist: boolean);
    addSortingByBlock(block: Block): void;
    addSortingByBlockTag(tag: TagKey<Block>): void;
    addSortingByItem(item: Item): void;
    addSortingByItemStack(stack: ItemStack): void;
    addSortingByItemTag(tag: TagKey<Item>): void;
    addSortingObject(object: any): void;
    addSortingObjects(...objects: any[]): void;
    canPass(object: any): boolean;
    canPass(stack: ItemStack): boolean;
    isBlacklist(): boolean;
    isWhitelist(): boolean;
    setBlacklist(): void;
    setListType(isWhitelist: boolean): void;
    setWhitelist(): void;
  }


  interface Tuple<K = any, V = any> extends Entry<K, V> {}
  class Tuple<K = any, V = any> extends Entry<K, V> {
    key: K;
    value: V;
    constructor(key: K, value: V);
    equals(obj: any): boolean;
    get key(): K;
    get value(): V;
    hashCode(): number;
    is(key: K): boolean;
    set value(value: V);
    toString(): string;
  }


  interface TupleList<K = any, V = any> extends ArrayList<Tuple> {}
  class TupleList<K = any, V = any> extends ArrayList<Tuple> {
    constructor();

    constructor(capacity: number);

    constructor(list: Tuple<K, V>[]);
    add(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    findTuple(key: K): Tuple<K, V>;
    findValue(key: K): V;
    indexOfKey(key: K): number;
    keys(): Iterable<K>;
    values(): Iterable<V>;
  }

}

declare module 'team.creative.creativecore.common.util.type.map' {
  import { Iterable, Double, Float, Integer } from 'java.lang';
  import { Function, BiConsumer } from 'java.util.function';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Tuple } from 'team.creative.creativecore.common.util.type.list';
  import { Iterator, List, HashMap, Map, ArrayList, Set, Collection, LinkedHashMap } from 'java.util';
  import { DecimalFormat } from 'java.text';
  import { Entry } from 'Map';

  interface ChunkLayerMap<T = any> extends Iterable<T> {}
  class ChunkLayerMap<T = any> extends Iterable<T> {
    constructor(map: ChunkLayerMap<T>);

    constructor(factory: Function<RenderType, T>);

    constructor();
    clear(): void;
    containsKey(layer: RenderType): boolean;
    get(layer: RenderType): T;
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    put(layer: RenderType, element: T): T;
    remove(layer: RenderType): T;
    size(): number;
    toString(): string;
    tuples(): Iterable<Tuple<RenderType, T>>;
  }


  interface ChunkLayerMapList<T = any> extends Iterable<T> {}
  class ChunkLayerMapList<T = any> extends Iterable<T> {
    constructor(map: ChunkLayerMapList<T>);

    constructor();
    add(layer: RenderType, element: T): void;
    clear(): void;
    consumeEachLayer(consumer: BiConsumer<RenderType, List>): void;
    containsKey(layer: RenderType): boolean;
    getOrCreate(layer: RenderType): T[];
    isEmpty(): boolean;
    iterator(): Iterator<T>;
    remove(layer: RenderType): T[];
    size(): number;
    toString(): string;
    tuples(): Iterable<Tuple<RenderType, T[]>>;
  }


  interface HashMapDouble<K = any> extends HashMap<K, number> {}
  class HashMapDouble<K = any> extends HashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
    scale(scale: number): void;
    toString(): string;
    toString(df: DecimalFormat): string;
  }


  interface HashMapFloat<K = any> extends HashMap<K, number> {}
  class HashMapFloat<K = any> extends HashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
    scale(scale: number): void;
    toString(): string;
    toString(df: DecimalFormat): string;
  }


  interface HashMapInteger<K = any> extends HashMap<K, number> {}
  class HashMapInteger<K = any> extends HashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
    scale(scale: number): void;
  }


  interface HashMapList<K = any, V = any> extends Iterable<V> {}
  class HashMapList<K = any, V = any> extends Iterable<V> {
    constructor();

    constructor(object: HashMapList<K, V>);
    add(key: K, values: V[]): void;
    add(key: K, values: Collection<V>): void;
    add(key: K, value: V): void;
    clear(): void;
    contains(value: V): boolean;
    contains(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    entrySet(): Set<Entry<K, ArrayList<V>>>;
    get(key: K): ArrayList<V>;
    get first(): V;
    hasNext(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<V>;
    keyOf(search: V): K;
    keySet(): Set<K>;
    next(): V;
    remove(): void;
    removeKey(key: K): ArrayList<V>;
    removeValue(key: K, value: V): boolean;
    removeValue(value: V): boolean;
    size(): number;
    sizeOfValues(): number;
    toString(): string;
    tryGet(key: K): V[];
    values(): Collection<ArrayList<V>>;
  }


  interface LinkedHashMapDouble<K = any> extends LinkedHashMap<K, number> {}
  class LinkedHashMapDouble<K = any> extends LinkedHashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
    toString(): string;
    toString(df: DecimalFormat): string;
  }


  interface LinkedHashMapFloat<K = any> extends LinkedHashMap<K, number> {}
  class LinkedHashMapFloat<K = any> extends LinkedHashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
    toString(): string;
    toString(df: DecimalFormat): string;
  }


  interface LinkedHashMapInteger<K = any> extends LinkedHashMap<K, number> {}
  class LinkedHashMapInteger<K = any> extends LinkedHashMap<K, number> {
    constructor();

    constructor(paramMap: Map<K, number>);
    put(paramK: K, paramV: number): number;
    putAll(paramMap: Map<K, number>): void;
  }

}

declare module 'team.creative.creativecore.common.util.type.set' {
  import { Iterable, Integer } from 'java.lang';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Iterator } from 'java.util';
  import { MutableBlockPos } from 'BlockPos';
  import { Vector2i } from 'org.joml';

  interface CubeBitSet extends Iterable<MutableBlockPos> {}
  class CubeBitSet extends Iterable<MutableBlockPos> {
    static readonly CHUNK_BITS: number;
    clear(x: number, y: number, z: number): void;
    clear(): void;
    clearIncludingSize(): void;
    count(): number;
    flip(x: number, y: number, z: number): void;
    get(x: number, y: number, z: number): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<MutableBlockPos>;
    load(nbt: CompoundTag): void;
    save(): CompoundTag;
    set(x: number, y: number, z: number): void;
    set(x: number, y: number, z: number, value: boolean): void;
    toString(): string;
  }


  interface LineBitSet extends Iterable<number> {}
  class LineBitSet extends Iterable<number> {
    static readonly CHUNK_BITS: number;
    clear(x: number): void;
    clear(): void;
    clearIncludingSize(): void;
    count(): number;
    flip(x: number): void;
    get(x: number): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<number>;
    load(nbt: CompoundTag): void;
    save(): CompoundTag;
    set(x: number): void;
    set(x: number, value: boolean): void;
    toString(): string;
  }


  interface QuadBitSet extends Iterable<Vector2i> {}
  class QuadBitSet extends Iterable<Vector2i> {
    static readonly CHUNK_BITS: number;
    clear(x: number, y: number): void;
    clear(): void;
    clearIncludingSize(): void;
    count(): number;
    flip(x: number, y: number): void;
    get(x: number, y: number): boolean;
    isEmpty(): boolean;
    iterator(): Iterator<Vector2i>;
    load(nbt: CompoundTag): void;
    save(): CompoundTag;
    set(x: number, y: number): void;
    set(x: number, y: number, value: boolean): void;
    toString(): string;
  }

}

declare module 'team.creative.creativecore.common.util.type.tree' {
  import { BiConsumer, Function } from 'java.util.function';
  import { CheckTreeEntry } from 'team.creative.creativecore.common.util.type.tree.CheckTree';
  import { Boolean, Iterable } from 'java.lang';
  import { Collection, List, Set } from 'java.util';
  import { Entry } from 'Map';

  class CheckTree<T = any> {
    readonly setter: BiConsumer;
    readonly getter: Function;
    readonly getChildren: Function;
    readonly root: CheckTreeEntry;
    constructor(root: T, setter: BiConsumer<T, boolean>, getter: Function<T, boolean>, getChildren: Function<T, Collection<T>>);

    constructor(rootFields: T[], setter: BiConsumer<T, boolean>, getter: Function<T, boolean>, getChildren: Function<T, Collection<T>>);
    apply(): void;
    reload(): void;
  }


  class NamedTree<T = any> {
    value: T;
    constructor();
    add(path: string, value: T): T;
    children(): Collection<NamedTree<T>>;
    entries(): Set<Entry<string, NamedTree<T>>>;
    findPath(value: T): string;
    first(): T;
    folder(path: string): NamedTree<T>;
    folderForce(path: string): NamedTree<T>;
    get(path: string): T;
    hasChildren(): boolean;
    path(): string;
    toString(): string;
    values(): Iterable<T>;
  }

}

declare module 'team.creative.creativecore.common.util.type.tree.CheckTree' {
  import { List } from 'java.util';
  import { CheckTree } from 'team.creative.creativecore.common.util.type.tree';

  class CheckTreeEntry {
    readonly parent: CheckTreeEntry;
    readonly content: T;
    children: List;
    constructor(this$0: CheckTree, children: T[]);

    constructor(this$0: CheckTree, parent: CheckTreeEntry, content: T);
    disable(): void;
    enable(): void;
    isChildEnabled(): boolean;
    isEnabled(): boolean;
    toggle(): void;
  }

}

declare module 'team.creative.creativecore.common.util.unsafe' {
  import { Unsafe } from 'sun.misc';
  import { Class } from 'java.lang';

  class CreativeHackery {
    static allocateInstance<T>(clazz: Class<T>): T;
    run(): Unsafe;
  }

}

declare module 'team.creative.creativecore' {
  import { Logger } from 'org.apache.logging.log4j';
  import { CreativeNetwork } from 'team.creative.creativecore.common.network';
  import { ConfigEventHandler } from 'team.creative.creativecore.common.config.event';
  import { MenuType } from 'net.minecraft.world.inventory';
  import { GuiCreatorBasic } from 'team.creative.creativecore.common.gui.creator.GuiCreator';
  import { DeferredRegister, RegisterEvent } from 'net.neoforged.neoforge.registries';
  import { Supplier, Consumer } from 'java.util.function';
  import { ContainerIntegration } from 'team.creative.creativecore.common.gui.integration';
  import { Inventory, Player } from 'net.minecraft.world.entity.player';
  import { RegistryFriendlyByteBuf } from 'net.minecraft.network';
  import { ILoaderUtils } from 'team.creative.creativecore.common.loader';
  import { NamedList } from 'team.creative.creativecore.common.config.premade';
  import { GuiSyncGlobal } from 'team.creative.creativecore.common.gui.sync';
  import { CommonLoader } from 'team.creative.creativecore.common';
  import { ClientLoader } from 'team.creative.creativecore.client';
  import { Runnable, Enum } from 'java.lang';
  import { ServerLevel } from 'net.minecraft.server.level';
  import { LevelAccessor, Level } from 'net.minecraft.world.level';
  import { Event } from 'net.neoforged.bus.api';
  import { Fluid } from 'net.minecraft.world.level.material';
  import { BlockPos } from 'net.minecraft.core';
  import { Entity } from 'net.minecraft.world.entity';
  import { KeyMapping } from 'net.minecraft.client';
  import { List } from 'java.util';

  class CreativeCore {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    static readonly CONFIG: CreativeCoreConfig;
    static readonly NETWORK: CreativeNetwork;
    static CONFIG_HANDLER: ConfigEventHandler;
    static GUI_CONTAINER: MenuType;
    static readonly CONFIG_OPEN: GuiCreatorBasic;
    static readonly CONFIG_CLIENT_SYNC_OPEN: GuiCreatorBasic;
    static readonly COMMAND_ARGUMENT_TYPES: DeferredRegister;
    static readonly STRING_ARRAY_ARGUMENT_TYPE: Supplier;
    constructor();
    create(windowId: number, playerInv: Inventory, extraData: RegistryFriendlyByteBuf): ContainerIntegration;
    create(windowId: number, playerInv: Inventory): ContainerIntegration;
    static loader(): ICreativeLoader;
    registerMenus(event: RegisterEvent): void;
    static utils(): ILoaderUtils;
  }


  class CreativeCoreConfig {
    maxGuiScale: number;
    usergroups: NamedList;
    constructor();
    is(player: Player, usergroup: string): boolean;
  }


  class CreativeCoreGuiRegistry {
    static readonly HAND: GuiSyncGlobal;
    static readonly DROP: GuiSyncGlobal;
    static readonly DROP_HAND: GuiSyncGlobal;
    static readonly INSERT: GuiSyncGlobal;
    static readonly EXTRACT: GuiSyncGlobal;
    static readonly DUPLICATE: GuiSyncGlobal;
    static readonly SWAP: GuiSyncGlobal;
    static readonly SPREAD: GuiSyncGlobal;
    static init(): void;
  }


  interface CreativeForgeLoader extends ICreativeLoader {}
  class CreativeForgeLoader extends ICreativeLoader {
    get effectiveSide(): Side;
    get overallSide(): Side;
    getFluidViscosityMultiplier(fluid: Fluid, level: Level): number;
    getFriction(level: LevelAccessor, pos: BlockPos, entity: Entity): number;
    isModLoaded(modid: string): boolean;
    postForge(event: Event): void;
    register(loader: CommonLoader): void;
    registerClient(loader: ClientLoader): void;
    registerClientRenderGui(run: Consumer): void;
    registerClientRenderStart(run: Runnable): void;
    registerClientStarted(run: Runnable): void;
    registerClientTick(run: Runnable): void;
    registerKeybind(supplier: Supplier<KeyMapping>): void;
    registerLevelTick(consumer: Consumer<ServerLevel>): void;
    registerLevelTickStart(consumer: Consumer<ServerLevel>): void;
    registerListener(consumer: Consumer): void;
    registerListener<T>(var1: Consumer<T>): void;
    registerLoadLevel(consumer: Consumer<LevelAccessor>): void;
    registerUnloadLevel(consumer: Consumer<LevelAccessor>): void;
  }


  class ICreativeLoader {
    get effectiveSide(): Side;
    get overallSide(): Side;
    getFluidViscosityMultiplier(var1: Fluid, var2: Level): number;
    getFriction(var1: LevelAccessor, var2: BlockPos, var3: Entity): number;
    isModLoaded(var1: string): boolean;
    loadCommon(): void;
    postForge(var1: Event): void;
    register(var1: CommonLoader): void;
    registerClient(var1: ClientLoader): void;
    registerClientRenderGui(var1: Consumer): void;
    registerClientRenderStart(var1: Runnable): void;
    registerClientStarted(var1: Runnable): void;
    registerClientTick(var1: Runnable): void;
    registerKeybind(var1: Supplier<KeyMapping>): void;
    registerLevelTick(var1: Consumer<ServerLevel>): void;
    registerLevelTickStart(var1: Consumer<ServerLevel>): void;
    registerListener<T>(var1: Consumer<T>): void;
    registerLoadLevel(var1: Consumer<LevelAccessor>): void;
    registerUnloadLevel(var1: Consumer<LevelAccessor>): void;
  }


  interface Side extends Enum<Side> {}
  class Side extends Enum<Side> {
    static readonly CLIENT: Side;
    static readonly SERVER: Side;
    isClient(): boolean;
    isServer(): boolean;
    static valueOf(name: string): Side;
    static values(): Side[];
  }

}

declare module 'team.creative.creativecore.mixin' {
  import { PackType } from 'net.minecraft.server.packs';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { SharedZipFileAccess } from 'FilePackResources';
  import { ThreadLocal } from 'java.lang';
  import { QuadLighter } from 'net.neoforged.neoforge.client.model.lighting';
  import { Path } from 'java.nio.file';
  import { CreativeQuadLighter } from 'team.creative.creativecore.client.render.model';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { ZipFile } from 'java.util.zip';
  import { WidthProvider } from 'StringSplitter';
  import { Map, List } from 'java.util';
  import { DiscreteVoxelShape } from 'net.minecraft.world.phys.shapes';

  class FilePackResourcesAccessor {
    static callGetPathFromLocation(type: PackType, location: ResourceLocation): string;
    get zipFileAccess(): SharedZipFileAccess;
  }


  class ForgeModelBlockRendererAccessor {
    get flatLighter(): ThreadLocal<QuadLighter>;
    get smoothLighter(): ThreadLocal<QuadLighter>;
  }


  class MouseHandlerAccessor {
    get lastHandleMovementTime(): number;
  }


  class PathPackResourcesAccessor {
    get root(): Path;
  }


  interface QuadLighterMixin extends CreativeQuadLighter {}
  class QuadLighterMixin extends CreativeQuadLighter {
    customTint: number;
    cachedTintIndex: number;
    cachedTintColor: number[];
    getColorMultiplierHook(tint: number, info: CallbackInfoReturnable): void;
    setCustomTint(tint: number): void;
    setState(var1: BlockState): void;
  }


  class ShapesMixin {
  }


  class SharedZipFileAccessAccessor {
    callGetOrCreateZipFile(): ZipFile;
  }


  class StringSplitterAccessor {
    get widthProvider(): WidthProvider;
  }


  class VanillaPackResourcesAccessor {
    get pathsForType(): Map<PackType, Path[]>;
  }


  class VoxelShapeAccessor {
    setShape(var1: DiscreteVoxelShape): void;
  }

}

declare module 'team.creative.creativecore.reflection' {
  import { Field, Method } from 'java.lang.reflect';
  import { Class } from 'java.lang';

  class ReflectionHelper {
    static findField<T>(clazz: Class<T>, offical: string, obfuscated: string): Field;
    static findField<T>(clazz: Class<T>, offical: string): Field;
    static findMethod(clazz: Class<any>, methodName: string, ...parameterTypes: Class<any>[]): Method;
  }

}