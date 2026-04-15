declare module 'traben.entity_texture_features.compat' {
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class SodiumGetBufferInjector {
    static inject(provider: MultiBufferSource, renderLayer: RenderType, vertexConsumer: VertexConsumer): void;
  }

}

declare module 'traben.entity_texture_features.config' {
  import { TConfig } from 'traben.tconfig';
  import { IllegalPathMode, UpdateFrequency, EmissiveRenderModes, SkinTransparencyMode, DebugLogMode, SettingsButtonLocation, String2BooleanNullMap, String2EnumNullMap, RenderLayerOverride } from 'traben.entity_texture_features.config.ETFConfig';
  import { ObjectOpenHashSet, Object2IntOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { RandomPropertyFactory } from 'traben.entity_texture_features.features.property_reading.properties.RandomProperties';
  import { Entity } from 'net.minecraft.world.entity';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { TConfigEntryCategory } from 'traben.tconfig.gui.entries';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Set } from 'java.util';

  interface ETFConfig extends TConfig {}
  class ETFConfig extends TConfig {
    optifine_limitRandomVariantGapsBy10: boolean;
    optifine_allowWeirdSkipsInTrueRandom: boolean;
    optifine_preventBaseTextureInOptifineDirectory: boolean;
    illegalPathSupportMode: IllegalPathMode;
    enableCustomTextures: boolean;
    enableCustomBlockEntities: boolean;
    textureUpdateFrequency_V2: UpdateFrequency;
    enableEmissiveTextures: boolean;
    enableEnchantedTextures: boolean;
    enableEmissiveBlockEntities: boolean;
    emissiveRenderMode: EmissiveRenderModes;
    alwaysCheckVanillaEmissiveSuffix: boolean;
    enableArmorAndTrims: boolean;
    skinFeaturesEnabled: boolean;
    skinTransparencyMode: SkinTransparencyMode;
    skinTransparencyInExtraPixels: boolean;
    skinFeaturesEnableTransparency: boolean;
    skinFeaturesEnableFullTransparency: boolean;
    tryETFTransparencyForAllSkins: boolean;
    enableEnemyTeamPlayersSkinFeatures: boolean;
    enableBlinking: boolean;
    blinkFrequency: number;
    blinkLength: number;
    advanced_IncreaseCacheSizeModifier: number;
    debugLoggingMode: DebugLogMode;
    logTextureDataInitialization: boolean;
    hideConfigButton: boolean;
    configButtonLoc: SettingsButtonLocation;
    disableVanillaDirectoryVariantTextures: boolean;
    use3DSkinLayerPatch: boolean;
    enableFullBodyWardenTextures: boolean;
    entityEmissiveOverrides: String2BooleanNullMap;
    propertiesDisabled: ObjectOpenHashSet;
    propertyInvertUpdatingOverrides: ObjectOpenHashSet;
    entityRandomOverrides: String2BooleanNullMap;
    entityEmissiveBrightOverrides: String2EnumNullMap;
    entityRenderLayerOverrides: String2EnumNullMap;
    entityLightOverrides: Object2IntOpenHashMap;
    canDoCustomTextures(): boolean;
    canDoEmissiveTextures(): boolean;
    canPropertyUpdate(property: RandomPropertyFactory): boolean;
    get emissiveRenderMode(): EmissiveRenderModes;
    get gUIOptions(): TConfigEntryCategory;
    get modIcon(): ResourceLocation;
    get renderLayerOverride(): RenderLayerOverride;
    getLightOverride(entity: Entity, tickDelta: number, light: number): number;
    getLightOverrideBE(light: number): number;
    getLightOverrideBE(light: number, state: ETFEntityRenderState): number;
    isPropertyDisabled(property: RandomPropertyFactory): boolean;
  }


  class ETFConfigWarning {
    doesShowDisableButton(): boolean;
    get iD(): string;
    get subTitle(): string;
    get title(): string;
    isConditionMet(): boolean;
    testWarningAndApplyFixIfEnabled(): void;
  }


  class ETFConfigWarnings {
    static get registeredWarnings(): Set<ETFConfigWarning>;
    static registerConfigWarning(...warnings: ETFConfigWarning[]): void;
  }


  class ETFModMenu {
  }

}

declare module 'traben.entity_texture_features.config.ETFConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Object2BooleanOpenHashMap, Object2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.objects';

  interface IllegalPathMode extends Enum<IllegalPathMode> {}
  class IllegalPathMode extends Enum<IllegalPathMode> {
    static readonly None: IllegalPathMode;
    static readonly Entity: IllegalPathMode;
    static readonly All: IllegalPathMode;
    toString(): string;
    static valueOf(name: string): IllegalPathMode;
    static values(): IllegalPathMode[];
  }


  interface UpdateFrequency extends Enum<UpdateFrequency> {}
  class UpdateFrequency extends Enum<UpdateFrequency> {
    static readonly Never: UpdateFrequency;
    static readonly Slow: UpdateFrequency;
    static readonly Average: UpdateFrequency;
    static readonly Fast: UpdateFrequency;
    static readonly Instant: UpdateFrequency;
    get delay(): number;
    toString(): string;
    static valueOf(name: string): UpdateFrequency;
    static values(): UpdateFrequency[];
  }


  interface EmissiveRenderModes extends Enum<EmissiveRenderModes> {}
  class EmissiveRenderModes extends Enum<EmissiveRenderModes> {
    static readonly DULL: EmissiveRenderModes;
    static readonly BRIGHT: EmissiveRenderModes;
    toString(): string;
    static valueOf(name: string): EmissiveRenderModes;
    static values(): EmissiveRenderModes[];
  }


  interface SkinTransparencyMode extends Enum<SkinTransparencyMode> {}
  class SkinTransparencyMode extends Enum<SkinTransparencyMode> {
    static readonly VANILLA: SkinTransparencyMode;
    static readonly ETF_SKINS_ONLY: SkinTransparencyMode;
    static readonly ALL: SkinTransparencyMode;
    toString(): string;
    static valueOf(name: string): SkinTransparencyMode;
    static values(): SkinTransparencyMode[];
  }


  interface DebugLogMode extends Enum<DebugLogMode> {}
  class DebugLogMode extends Enum<DebugLogMode> {
    static readonly None: DebugLogMode;
    static readonly Log: DebugLogMode;
    static readonly Chat: DebugLogMode;
    toString(): string;
    static valueOf(name: string): DebugLogMode;
    static values(): DebugLogMode[];
  }


  interface SettingsButtonLocation extends Enum<SettingsButtonLocation> {}
  class SettingsButtonLocation extends Enum<SettingsButtonLocation> {
    static readonly OFF: SettingsButtonLocation;
    static readonly BOTTOM_RIGHT: SettingsButtonLocation;
    static readonly TOP_RIGHT: SettingsButtonLocation;
    static readonly TOP_LEFT: SettingsButtonLocation;
    static readonly BOTTOM_LEFT: SettingsButtonLocation;
    static valueOf(name: string): SettingsButtonLocation;
    static values(): SettingsButtonLocation[];
  }


  interface String2BooleanNullMap extends Object2BooleanOpenHashMap<string> {}
  class String2BooleanNullMap extends Object2BooleanOpenHashMap<string> {
    constructor();
    getNullable(s: string): OverrideBooleanType;
    putNullable(s: string, v: OverrideBooleanType): void;
  }


  interface String2EnumNullMap<E extends Enum<E> = any> extends Object2ObjectOpenHashMap<string, E> {}
  class String2EnumNullMap<E extends Enum<E> = any> extends Object2ObjectOpenHashMap<string, E> {
    getNullable(s: string): E;
    putNullable(s: string, v: E): void;
  }


  interface RenderLayerOverride extends Enum<RenderLayerOverride> {}
  class RenderLayerOverride extends Enum<RenderLayerOverride> {
    static readonly TRANSLUCENT: RenderLayerOverride;
    static readonly TRANSLUCENT_CULL: RenderLayerOverride;
    static readonly END: RenderLayerOverride;
    static readonly OUTLINE: RenderLayerOverride;
    toString(): string;
    static valueOf(name: string): RenderLayerOverride;
    static values(): RenderLayerOverride[];
  }


  interface OverrideBooleanType extends Enum<OverrideBooleanType> {}
  class OverrideBooleanType extends Enum<OverrideBooleanType> {
    static readonly TRUE: OverrideBooleanType;
    static readonly FALSE: OverrideBooleanType;
    toString(): string;
    static valueOf(name: string): OverrideBooleanType;
    static values(): OverrideBooleanType[];
  }

}

declare module 'traben.entity_texture_features.config.ETFConfigWarning' {
  import { ETFConfigWarning } from 'traben.entity_texture_features.config';
  import { Supplier } from 'java.util.function';
  import { Boolean, Runnable } from 'java.lang';

  interface Simple extends ETFConfigWarning {}
  class Simple extends ETFConfigWarning {
    readonly TITLE_TRANSLATION_KEY: string;
    readonly SUB_TITLE_TRANSLATION_KEY: string;
    readonly ID: string;
    constructor(id: string, condition: Supplier<boolean>, title_translation_key: string, sub_title_translation_key: string, fix: Runnable);

    constructor(id: string, modName: string, title_translation_key: string, sub_title_translation_key: string, fix: Runnable);
    doesShowDisableButton(): boolean;
    get iD(): string;
    get subTitle(): string;
    get title(): string;
    isConditionMet(): boolean;
    testWarningAndApplyFixIfEnabled(): void;
  }

}

declare module 'traben.entity_texture_features.config.screens' {
  import { TConfigScreenMain, TConfigScreen } from 'traben.tconfig.gui';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { Quaternionf } from 'org.joml';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { ObjectOpenHashSet } from 'it.unimi.dsi.fastutil.objects';
  import { ETFConfigWarning } from 'traben.entity_texture_features.config';
  import { Set } from 'java.util';

  interface ETFConfigScreenMain extends TConfigScreenMain {}
  class ETFConfigScreenMain extends TConfigScreenMain {
    constructor(parent: Screen);
    static drawEntity(context: GuiGraphics, x: number, y: number, size: number, quaternionf: Quaternionf, quaternionf2: Quaternionf, entity: LivingEntity, mouseX: number, mouseY: number): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface ETFConfigScreenWarnings extends TConfigScreen {}
  class ETFConfigScreenWarnings extends TConfigScreen {
    constructor(parent: Screen, warningsFound: ObjectOpenHashSet<ETFConfigWarning>);
    static get ignoredWarnings(): Set<string>;
    onClose(): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }

}

declare module 'traben.entity_texture_features.config.screens.ETFConfigScreenMain' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { ResourceLocation } from 'net.minecraft.resources';

  class LogoCreeperRenderer {
    constructor();
    renderSimple(matrix: PoseStack, vcp: MultiBufferSource, texture: ResourceLocation): void;
  }

}

declare module 'traben.entity_texture_features.config.screens.ETFConfigScreenWarnings' {
  import { NoGUI } from 'traben.tconfig.TConfig';
  import { Set } from 'java.util';

  interface WarningConfig extends NoGUI {}
  class WarningConfig extends NoGUI {
    ignoredConfigIds: Set;
  }

}

declare module 'traben.entity_texture_features.config.screens.skin' {
  import { Boolean } from 'java.lang';
  import { ETFPlayerTexture } from 'traben.entity_texture_features.features.player';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { LivingEntity } from 'net.minecraft.world.entity';
  import { TConfigScreen } from 'traben.tconfig.gui';
  import { Button } from 'net.minecraft.client.gui.components';
  import { Component } from 'net.minecraft.network.chat';
  import { OnPress } from 'Button';

  interface ETFConfigScreenSkinTool extends ETFScreenOldCompat {}
  class ETFConfigScreenSkinTool extends ETFScreenOldCompat {
    originalEnableBlinking: boolean;
    thisETFPlayerTexture: ETFPlayerTexture;
    currentEditorSkin: NativeImage;
    flipView: boolean;
    constructor(parent: Screen);
    applyExistingOverlayToSkin(overlayTexture: ResourceLocation): void;
    drawEntity(context: GuiGraphics, x: number, y: number, size: number, mouseX: number, mouseY: number, entity: LivingEntity): void;
    static getPixelColour(choice: number): number;
    onClose(): void;
    printPlayerSkinCopy(): boolean;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface ETFConfigScreenSkinToolOutcome extends ETFScreenOldCompat {}
  class ETFConfigScreenSkinToolOutcome extends ETFScreenOldCompat {
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
    static uploadSkin(skinType: boolean): boolean;
  }


  interface ETFConfigScreenSkinToolPixelSelection extends ETFScreenOldCompat {}
  class ETFConfigScreenSkinToolPixelSelection extends ETFScreenOldCompat {
    drawEntity(context: GuiGraphics, x: number, y: number, size: number, mouseX: number, mouseY: number, entity: LivingEntity): void;
    render(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  interface ETFScreenOldCompat extends TConfigScreen {}
  class ETFScreenOldCompat extends TConfigScreen {
    static booleanAsOnOff(bool: boolean): string;
    getETFButton(x: number, y: number, width: number, height: number, buttonText: Component, onPress: OnPress): Button;
    getETFButton(x: number, y: number, width: number, height: number, buttonText: Component, onPress: OnPress, toolTipText: Component): Button;
    static renderGUITexture(context: GuiGraphics, texture: ResourceLocation, x1: number, y1: number, x2: number, y2: number): void;
  }

}

declare module 'traben.entity_texture_features.config.screens.skin.ETFConfigScreenSkinTool' {
  import { Enum } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { List } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface NoseType extends Enum<NoseType> {}
  class NoseType extends Enum<NoseType> {
    static readonly VILLAGER: NoseType;
    static readonly VILLAGER_TEXTURED: NoseType;
    static readonly VILLAGER_REMOVE: NoseType;
    static readonly VILLAGER_TEXTURED_REMOVE: NoseType;
    static readonly TEXTURED_1: NoseType;
    static readonly TEXTURED_2: NoseType;
    static readonly TEXTURED_3: NoseType;
    static readonly TEXTURED_4: NoseType;
    static readonly TEXTURED_5: NoseType;
    static readonly NONE: NoseType;
    appliesTextureOverlay(): boolean;
    get buttonText(): Component;
    get nosePixelColour(): number;
    getByColorId(id: number): NoseType;
    next(): NoseType;
    static valueOf(name: string): NoseType;
    static values(): NoseType[];
  }


  interface CoatStyle extends Enum<CoatStyle> {}
  class CoatStyle extends Enum<CoatStyle> {
    static readonly COPIED_THIN_TOP: CoatStyle;
    static readonly MOVED_THIN_TOP: CoatStyle;
    static readonly COPIED_FAT_TOP: CoatStyle;
    static readonly MOVED_FAT_TOP: CoatStyle;
    static readonly COPIED_THIN: CoatStyle;
    static readonly MOVED_THIN: CoatStyle;
    static readonly COPIED_FAT: CoatStyle;
    static readonly MOVED_FAT: CoatStyle;
    static readonly NONE: CoatStyle;
    static get(id: number): CoatStyle;
    get coatPixelColour(): number;
    get title(): Component;
    next(): CoatStyle;
    static valueOf(name: string): CoatStyle;
    static values(): CoatStyle[];
  }


  interface BlinkType extends Enum<BlinkType> {}
  class BlinkType extends Enum<BlinkType> {
    static readonly ONE_PIXEL: BlinkType;
    static readonly TWO_PIXEL: BlinkType;
    static readonly FOUR_PIXEL: BlinkType;
    static readonly WHOLE_FACE: BlinkType;
    static readonly WHOLE_FACE_TWO: BlinkType;
    static readonly NONE: BlinkType;
    static get(id: number): BlinkType;
    get blinkPixelColour(): number;
    get exampleOverlay(): ResourceLocation;
    get maxEyePixelHeight(): number;
    get title(): Component;
    next(): BlinkType;
    static valueOf(name: string): BlinkType;
    static values(): BlinkType[];
  }

}

declare module 'traben.entity_texture_features.config.screens.skin.ETFConfigScreenSkinToolPixelSelection' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface SelectionMode extends Enum<SelectionMode> {}
  class SelectionMode extends Enum<SelectionMode> {
    static readonly EMISSIVE: SelectionMode;
    static readonly ENCHANTED: SelectionMode;
    static valueOf(name: string): SelectionMode;
    static values(): SelectionMode[];
  }

}

declare module 'traben.entity_texture_features' {
  import { Logger } from 'org.slf4j';
  import { TConfigHandler } from 'traben.tconfig';
  import { ETFRenderStateInit } from 'traben.entity_texture_features.features.state.ETFEntityRenderState';
  import { Set, List, UUID } from 'java.util';
  import { ETFConfig, ETFConfigWarning } from 'traben.entity_texture_features.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { Component } from 'net.minecraft.network.chat';
  import { Path } from 'java.nio.file';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Entity } from 'net.minecraft.world.entity';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { Model } from 'net.minecraft.client.model';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { ETFVariantSuffixProvider } from 'traben.entity_texture_features.ETFApi';
  import { RandomPropertyFactory } from 'traben.entity_texture_features.features.property_reading.properties.RandomProperties';
  import { RuntimeException } from 'java.lang';

  class ETF {
    static readonly MOD_ID: string;
    static readonly LOGGER: Logger;
    static readonly EMISSIVE_FEATURE_LIGHT_VALUE: number;
    static warningConfigHandler: TConfigHandler;
    static IRIS_DETECTED: boolean;
    static etfRenderStateConstructor: ETFRenderStateInit;
    static SKIN_LAYERS_DETECTED: boolean;
    static configHandlers: Set;
    static config(): TConfigHandler<ETFConfig>;
    static get configDirectory(): Path;
    static getBiomeString(world: Level, pos: BlockPos): string;
    static getConfigScreen(parent: Screen): Screen;
    static getConfigScreen(ignored: Minecraft, parent: Screen): Screen;
    static getTextFromTranslation(translationKey: string): Component;
    static isFabric(): boolean;
    static isForge(): boolean;
    static isThisModLoaded(modId: string): boolean;
    static modsLoaded(): string[];
    static registerConfigHandler(configHandler: TConfigHandler<any>): void;
    static start(): void;
  }


  class ETFApi {
    static readonly ETFApiVersion: number;
    static readonly ETF_GENERIC_UUID: UUID;
    static readonly ETF_SPAWNER_MARKER: number;
    static getETFConfigObject: ETFConfig;
    static get copyOfETFConfigObject(): ETFConfig;
    static get defaultETFConfigObject(): ETFConfig;
    static get eTFConfigObject(): ETFConfig;
    static getBlockEntityTypeToTranslationKey(type: BlockEntityType<any>): string;
    static getCurrentETFEmissiveTextureOfBlockEntityOrNull(entity: BlockEntity, defaultTexture: ResourceLocation): ResourceLocation;
    static getCurrentETFEmissiveTextureOfEntityOrNull(entity: Entity, defaultTexture: ResourceLocation): ResourceLocation;
    static getCurrentETFVariantTextureOfBlockEntity(entity: BlockEntity, defaultTexture: ResourceLocation): ResourceLocation;
    static getCurrentETFVariantTextureOfBlockEntity(entity: BlockEntity, defaultTexture: ResourceLocation, specifiedUUID: UUID): ResourceLocation;
    static getCurrentETFVariantTextureOfEntity(entity: Entity, defaultTexture: ResourceLocation): ResourceLocation;
    static getCurrentETFVariantTextureOfEntity(entity: BlockEntity, defaultTexture: ResourceLocation, ignore: UUID): ResourceLocation;
    static getLastMatchingRuleOfBlockEntity(entity: BlockEntity): number;
    static getLastMatchingRuleOfEntity(entity: Entity): number;
    static getUUIDForBlockEntity(blockEntity: BlockEntity): UUID;
    static getVariantSupplierOrNull(propertiesFileIdentifier: ResourceLocation, vanillaIdentifier: ResourceLocation, ...suffixKeys: string[]): ETFVariantSuffixProvider;
    static registerCustomETFConfigWarning(yourModId: string, ...warnings: ETFConfigWarning[]): void;
    static registerCustomRandomPropertyFactory(yourModId: string, ...factories: RandomPropertyFactory[]): void;
    static renderETFEmissiveModel(entity: Entity, defaultTextureOfEntity: ResourceLocation, matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, model: Model): void;
    static renderETFEmissiveModel(entity: BlockEntity, defaultTextureOfEntity: ResourceLocation, matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, model: Model): void;
    static renderETFEmissiveModelPart(entity: Entity, defaultTextureOfEntity: ResourceLocation, matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, modelPart: ModelPart): void;
    static renderETFEmissiveModelPart(entity: BlockEntity, defaultTextureOfEntity: ResourceLocation, matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, modelPart: ModelPart): void;
    static resetETF(): void;
    static saveETFConfigChangesAndResetETF(): void;
    static set eTFConfigObject(newETFConfig: ETFConfig);
    static stateOfEntityOrEntityState(entity: any): ETFEntityRenderState;
  }


  interface ETFException extends RuntimeException {}
  class ETFException extends RuntimeException {
    constructor(message: string);
  }


  class ETFInit {
    constructor();
  }

}

declare module 'traben.entity_texture_features.ETFApi' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { UUID } from 'java.util';
  import { IntOpenHashSet } from 'it.unimi.dsi.fastutil.ints';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { EntityRandomSeedFunction } from 'traben.entity_texture_features.ETFApi.ETFVariantSuffixProvider';

  class ETFVariantSuffixProvider {
    entityCanUpdate(var1: UUID): boolean;
    get allSuffixes(): IntOpenHashSet;
    getSuffixForBlockEntity(entityToBeTested: BlockEntity): number;
    getSuffixForETFEntity(var1: ETFEntityRenderState): number;
    getSuffixForEntity(entityToBeTested: Entity): number;
    static getVariantProviderOrNull(propertiesFileIdentifier: ResourceLocation, vanillaIdentifier: ResourceLocation, ...suffixKeyName: string[]): ETFVariantSuffixProvider;
    setRandomSupplier(var1: EntityRandomSeedFunction): void;
    size(): number;
  }

}

declare module 'traben.entity_texture_features.ETFApi.ETFVariantSuffixProvider' {
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';

  class EntityRandomSeedFunction {
    toInt(var1: ETFEntityRenderState): number;
  }

}

declare module 'traben.entity_texture_features.features' {
  import { ObjectOpenHashSet, Object2ReferenceOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { ETFLruCache, EntityIntLRU } from 'traben.entity_texture_features.utils';
  import { ArrayList, UUID, Properties } from 'java.util';
  import { Boolean } from 'java.lang';
  import { ETFTexture } from 'traben.entity_texture_features.features.texture_handlers';
  import { EmissiveRenderModes } from 'traben.entity_texture_features.config.ETFConfig';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ETFPlayerTexture, ETFPlayerEntity } from 'traben.entity_texture_features.features.player';
  import { Player } from 'net.minecraft.world.entity.player';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Supplier } from 'java.util.function';
  import { RenderType, MultiBufferSource } from 'net.minecraft.client.renderer';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class ETFManager {
    readonly EMISSIVE_SUFFIX_LIST: ObjectOpenHashSet;
    readonly PLAYER_TEXTURE_MAP: ETFLruCache;
    readonly KNOWN_RESOURCEPACK_ORDER: ArrayList;
    readonly ENTITY_TYPE_IGNORE_PARTICLES: ObjectOpenHashSet;
    readonly ETF_TEXTURE_CACHE: Object2ReferenceOpenHashMap;
    readonly LAST_SUFFIX_OF_ENTITY: EntityIntLRU;
    readonly LAST_RULE_INDEX_OF_ENTITY: EntityIntLRU;
    readonly ETF_DIRECTORY_CACHE: Object2ReferenceOpenHashMap;
    ENTITY_DEBUG: UUID;
    mooshroomBrownCustomShroomExists: boolean;
    mooshroomRedCustomShroomExists: boolean;
    redMooshroomAlt: ETFTexture;
    brownMooshroomAlt: ETFTexture;
    doTheBigBoyPrintoutKronk(): void;
    static get emissiveMode(): EmissiveRenderModes;
    static get errorETFTexture(): ETFTexture;
    get generalPrintout(): string;
    static get instance(): ETFManager;
    getETFTextureNoVariation(vanillaIdentifier: ResourceLocation): ETFTexture;
    getETFTextureVariant(vanillaIdentifier: ResourceLocation, entity: ETFEntityRenderState): ETFTexture;
    getPlayerTexture(player: Player, rendererGivenSkin: ResourceLocation): ETFPlayerTexture;
    getPlayerTexture(player: ETFPlayerEntity, rendererGivenSkin: ResourceLocation): ETFPlayerTexture;
    grabSpecialProperties(props: Properties, entity: ETFEntityRenderState): void;
    markEntityForDebugPrint(uuid: UUID): void;
    static resetInstance(): void;
  }


  class ETFRenderContext {
    static renderingFeatures: boolean;
    static allowAllRandom(): void;
    static allowOnlyPropertiesRandom(): void;
    static allowRenderLayerTextureModify(): void;
    static allowTexturePatching(): void;
    static cacheEntityNBTForFrame(entityUUID: UUID, computeNBT: Supplier<CompoundTag>): CompoundTag;
    static canRenderInBrightMode(): boolean;
    static decrementCurrentModelPartDepth(): void;
    static endSpecialRenderOverlayPhase(): void;
    static get currentEntityState(): ETFEntityRenderState;
    static get currentModelPartDepth(): number;
    static incrementCurrentModelPartDepth(): void;
    static insertETFDataIntoVertexConsumer(provider: MultiBufferSource, renderLayer: RenderType, vertexConsumer: VertexConsumer): void;
    static isAllowedToPatch(): boolean;
    static isAllowedToRenderLayerTextureModify(): boolean;
    static isCurrentlyRenderingEntity(): boolean;
    static isIsInSpecialRenderOverlayPhase(): boolean;
    static isRandomLimitedToProperties(): boolean;
    static isRenderingFeatures(): boolean;
    static modifyRenderLayerIfRequired(value: RenderType): RenderType;
    static preventRenderLayerTextureModify(): void;
    static preventTexturePatching(): void;
    static reset(): void;
    static resetCurrentModelPartDepth(): void;
    static setCurrentEntity(currentEntity: ETFEntityRenderState): void;
    static setRenderingFeatures(renderingFeatures: boolean): void;
    static shouldEmissiveUseCullingLayer(): boolean;
    static startSpecialRenderOverlayPhase(): void;
  }

}

declare module 'traben.entity_texture_features.features.ETFManager' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TextureSource extends Enum<TextureSource> {}
  class TextureSource extends Enum<TextureSource> {
    static readonly ENTITY: TextureSource;
    static readonly BLOCK_ENTITY: TextureSource;
    static readonly ENTITY_FEATURE: TextureSource;
    static valueOf(name: string): TextureSource;
    static values(): TextureSource[];
  }

}

declare module 'traben.entity_texture_features.features.player' {
  import { ETFEntity } from 'traben.entity_texture_features.utils';
  import { Entity } from 'net.minecraft.world.entity';
  import { Player, Inventory, PlayerModelPart } from 'net.minecraft.world.entity.player';
  import { Component } from 'net.minecraft.network.chat';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { MeshDefinition, CubeDeformation } from 'net.minecraft.client.model.geom.builders';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource } from 'net.minecraft.client.renderer';
  import { SkullModelBase } from 'net.minecraft.client.model';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ETFTexture } from 'traben.entity_texture_features.features.texture_handlers';
  import { NoseType } from 'traben.entity_texture_features.config.screens.skin.ETFConfigScreenSkinTool';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';

  interface ETFPlayerEntity extends ETFEntity {}
  class ETFPlayerEntity extends ETFEntity {
    etf$getEntity(): Entity;
    etf$getInventory(): Inventory;
    etf$getName(): Component;
    etf$getUuidAsString(): string;
    etf$isPartVisible(var1: PlayerModelPart): boolean;
    etf$isTeammate(var1: Player): boolean;
  }


  interface ETFPlayerFeatureRenderer<T extends Player = any, M extends PlayerModel<T> = any> extends RenderLayer<T, M> {}
  class ETFPlayerFeatureRenderer<T extends Player = any, M extends PlayerModel<T> = any> extends RenderLayer<T, M> {
    constructor(context: RenderLayerParent<T, M>);
    static getModelData(dilation: CubeDeformation): MeshDefinition;
    render(matrices: PoseStack, submit: MultiBufferSource, light: number, entity: T, limbAngle: number, limbDistance: number, tickDelta: number, animationProgress: number, headYaw: number, headPitch: number): void;
    renderFeatures(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, light: number, model: M, playerTexture: ETFPlayerTexture): void;
    static renderSkullFeatures(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, light: number, skullModel: SkullModelBase, playerTexture: ETFPlayerTexture, yaw: number): void;
  }


  class ETFPlayerSkinHolder {
    etf$getETFPlayerTexture(): ETFPlayerTexture;
  }


  class ETFPlayerTexture {
    static readonly SKIN_NAMESPACE: string;
    static clientPlayerOriginalSkinImageForTool: NativeImage;
    static remappingETFSkin: boolean;
    baseEnchantIdentifier: ResourceLocation;
    baseEnchantBlinkIdentifier: ResourceLocation;
    baseEnchantBlink2Identifier: ResourceLocation;
    texturedNoseIdentifier: ResourceLocation;
    texturedNoseIdentifierEmissive: ResourceLocation;
    texturedNoseIdentifierEnchanted: ResourceLocation;
    hasVillagerNose: boolean;
    hasFeatures: boolean;
    coatStyle: number;
    coatLength: number;
    blinkType: number;
    blinkHeight: number;
    hasEmissives: boolean;
    hasEnchant: boolean;
    etfTextureOfFinalBaseSkin: ETFTexture;
    noseType: NoseType;
    player: ETFPlayerEntity;
    wasForcedSolid: boolean;
    shouldRetryOnFail: boolean;
    constructor(player: ETFPlayerEntity, rendererGivenSkin: ResourceLocation);

    constructor();
    canUseFeaturesForThisPlayer(): boolean;
    changeSkinToThisForTool(image: NativeImage): void;
    checkTexture(skipSkinLoad: boolean): void;
    get baseHeadTextureIdentifierOrNullForVanilla(): ResourceLocation;
    get baseTextureEmissiveIdentifierOrNullForNone(): ResourceLocation;
    get original(): ResourceLocation;
    getBaseTextureIdentifierOrNullForVanilla(player: Player): ResourceLocation;
    getBaseTextureIdentifierOrNullForVanilla(player: ETFEntityRenderState): ResourceLocation;
    static getSkinNumberToPixelColour(color: number): number;
    static getSkinPixelColourToNumber(color: number): number;
    isCorrectObjectForThisSkin(check: ResourceLocation): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.etf_properties' {
  import { BooleanProperty, StringArrayOrRegexProperty, FloatRangeFromStringArrayProperty, SimpleIntegerArrayProperty } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties';
  import { Properties } from 'java.util';
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';
  import { BlocksProperty, NBTProperty } from 'traben.entity_texture_features.features.property_reading.properties.optifine_properties';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';

  interface AngryProperty extends BooleanProperty {}
  class AngryProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): AngryProperty;
  }


  interface BiomeTagProperty extends RandomProperty {}
  class BiomeTagProperty extends RandomProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BiomeTagProperty;
  }


  interface BlockAboveProperty extends BlocksProperty {}
  class BlockAboveProperty extends BlocksProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
  }


  interface BlockAboveSolidProperty extends BlocksProperty {}
  class BlockAboveSolidProperty extends BlocksProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
  }


  interface BlockBelowProperty extends BlocksProperty {}
  class BlockBelowProperty extends BlocksProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
  }


  interface BlockBelowSolidProperty extends BlocksProperty {}
  class BlockBelowSolidProperty extends BlocksProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
  }


  interface BlockSpawnedProperty extends BlocksProperty {}
  class BlockSpawnedProperty extends BlocksProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
  }


  interface ChargedCreeperProperty extends BooleanProperty {}
  class ChargedCreeperProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ChargedCreeperProperty;
  }


  interface ClientPlayerProperty extends BooleanProperty {}
  class ClientPlayerProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ClientPlayerProperty;
  }


  interface CreativeProperty extends BooleanProperty {}
  class CreativeProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): CreativeProperty;
  }


  interface DimensionProperty extends StringArrayOrRegexProperty {}
  class DimensionProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): DimensionProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
  }


  interface DistanceToPlayerProperty extends FloatRangeFromStringArrayProperty {}
  class DistanceToPlayerProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): DistanceToPlayerProperty;
  }


  interface ItemProperty extends StringArrayOrRegexProperty {}
  class ItemProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ItemProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface JumpProperty extends FloatRangeFromStringArrayProperty {}
  class JumpProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): JumpProperty;
  }


  interface LightProperty extends SimpleIntegerArrayProperty {}
  class LightProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): LightProperty;
  }


  interface LlamaInventoryProperty extends SimpleIntegerArrayProperty {}
  class LlamaInventoryProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): LlamaInventoryProperty;
  }


  interface MaxHealthProperty extends FloatRangeFromStringArrayProperty {}
  class MaxHealthProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MaxHealthProperty;
  }


  interface MovingProperty extends BooleanProperty {}
  class MovingProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MovingProperty;
  }


  interface NBTClientProperty extends NBTProperty {}
  class NBTClientProperty extends NBTProperty {
    static getPropertyOrNull(properties: Properties, propertyNum: number): NBTProperty;
  }


  interface PandaGeneProperty extends StringArrayOrRegexProperty {}
  class PandaGeneProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): PandaGeneProperty;
  }


  interface PlayerCreatedProperty extends BooleanProperty {}
  class PlayerCreatedProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): PlayerCreatedProperty;
  }


  interface ScreamingGoatProperty extends BooleanProperty {}
  class ScreamingGoatProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ScreamingGoatProperty;
  }


  interface SpawnerProperty extends BooleanProperty {}
  class SpawnerProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): SpawnerProperty;
  }


  interface SpeedProperty extends FloatRangeFromStringArrayProperty {}
  class SpeedProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): SpeedProperty;
  }


  interface TeammateProperty extends BooleanProperty {}
  class TeammateProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TeammateProperty;
  }


  interface TeamProperty extends StringArrayOrRegexProperty {}
  class TeamProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TeamProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
  }


  interface TemperatureProperty extends FloatRangeFromStringArrayProperty {}
  class TemperatureProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TemperatureProperty;
  }


  interface TextureRuleIndexProperty extends SimpleIntegerArrayProperty {}
  class TextureRuleIndexProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TextureRuleIndexProperty;
  }


  interface TextureSuffixProperty extends SimpleIntegerArrayProperty {}
  class TextureSuffixProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TextureSuffixProperty;
  }


  interface VariantProperty extends StringArrayOrRegexProperty {}
  class VariantProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): VariantProperty;
    getValueFromEntity(state: ETFEntityRenderState): string;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.etf_properties.external' {
  import { SimpleIntegerArrayProperty, BooleanProperty, StringArrayOrRegexProperty, SemVerRangeFromStringArrayProperty, FloatRangeFromStringArrayProperty } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties';
  import { Properties } from 'java.util';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { NBTProperty } from 'traben.entity_texture_features.features.property_reading.properties.optifine_properties';

  interface ClientGameModeProperty extends SimpleIntegerArrayProperty {}
  class ClientGameModeProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ClientGameModeProperty;
  }


  interface DifficultyProperty extends SimpleIntegerArrayProperty {}
  class DifficultyProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): DifficultyProperty;
  }


  interface HardcoreProperty extends BooleanProperty {}
  class HardcoreProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): HardcoreProperty;
  }


  interface HourProperty extends SimpleIntegerArrayProperty {}
  class HourProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): HourProperty;
  }


  interface LanguageProperty extends StringArrayOrRegexProperty {}
  class LanguageProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): LanguageProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
  }


  interface MinecraftVersionProperty extends SemVerRangeFromStringArrayProperty {}
  class MinecraftVersionProperty extends SemVerRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MinecraftVersionProperty;
  }


  interface MinuteProperty extends SimpleIntegerArrayProperty {}
  class MinuteProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MinuteProperty;
  }


  interface ModLoadedProperty extends StringArrayOrRegexProperty {}
  class ModLoadedProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ModLoadedProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
    testEntity(entity: ETFEntityRenderState, isUpdate: boolean): boolean;
  }


  interface MonthDayProperty extends SimpleIntegerArrayProperty {}
  class MonthDayProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MonthDayProperty;
  }


  interface MonthProperty extends SimpleIntegerArrayProperty {}
  class MonthProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MonthProperty;
  }


  interface NBTVehicleProperty extends NBTProperty {}
  class NBTVehicleProperty extends NBTProperty {
    static getPropertyOrNull(properties: Properties, propertyNum: number): NBTProperty;
  }


  interface RegionalDifficultyProperty extends FloatRangeFromStringArrayProperty {}
  class RegionalDifficultyProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): RegionalDifficultyProperty;
  }


  interface SecondProperty extends SimpleIntegerArrayProperty {}
  class SecondProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): SecondProperty;
  }


  interface WeekDayProperty extends SimpleIntegerArrayProperty {}
  class WeekDayProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): WeekDayProperty;
  }


  interface YearDayProperty extends SimpleIntegerArrayProperty {}
  class YearDayProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): YearDayProperty;
  }


  interface YearProperty extends SimpleIntegerArrayProperty {}
  class YearProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): YearProperty;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.generic_properties' {
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';
  import { Boolean, Float, Long, Integer } from 'java.lang';
  import { Properties } from 'java.util';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { SemVerNumber } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties.SemVerRangeFromStringArrayProperty';
  import { IntRange } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties.SimpleIntegerArrayProperty';
  import { RegexAndPatternPropertyMatcher } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties.StringArrayOrRegexProperty';

  interface BooleanProperty extends RandomProperty {}
  class BooleanProperty extends RandomProperty {
    static getGenericBooleanThatCanNull(props: Properties, num: number, ...propertyNames: string[]): boolean;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface FloatRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<number> {}
  class FloatRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<number> {
  }


  interface LongRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<Long> {}
  class LongRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<Long> {
  }


  interface NumberRangeFromStringArrayProperty<N extends Number = any> extends RandomProperty {}
  class NumberRangeFromStringArrayProperty<N extends Number = any> extends RandomProperty {
    readonly originalInput: string;
    get propertyIds(): string[];
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface SemVerRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<SemVerNumber> {}
  class SemVerRangeFromStringArrayProperty extends NumberRangeFromStringArrayProperty<SemVerNumber> {
  }


  interface SimpleIntegerArrayProperty extends RandomProperty {}
  class SimpleIntegerArrayProperty extends RandomProperty {
    static getGenericIntegerSplitWithRanges(props: Properties, num: number, ...propertyNames: string[]): number[];
    static getIntRange(rawRange: string): IntRange;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface StringArrayOrRegexProperty extends RandomProperty {}
  class StringArrayOrRegexProperty extends RandomProperty {
    static getStringMatcher_Regex_Pattern_List_Single(propertyLine: string): RegexAndPatternPropertyMatcher;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.generic_properties.NumberRangeFromStringArrayProperty' {
  class RangeTester<N = any> {
    isValueWithinRangeOrEqual(var1: N): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.generic_properties.SemVerRangeFromStringArrayProperty' {
  import { Number } from 'java.lang';

  interface SemVerNumber extends Number {}
  class SemVerNumber extends Number {
    constructor(value: string);
    betweenInclusive(smaller: SemVerNumber, larger: SemVerNumber): boolean;
    doubleValue(): number;
    floatValue(): number;
    intValue(): number;
    largerThan(other: SemVerNumber): boolean;
    largerThanOrEqual(other: SemVerNumber): boolean;
    longValue(): number;
    sameAs(other: SemVerNumber): boolean;
    smallerThan(other: SemVerNumber): boolean;
    smallerThanOrEqual(other: SemVerNumber): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.generic_properties.SimpleIntegerArrayProperty' {
  import { Integer } from 'java.lang';

  class IntRange {
    constructor(left: number, right: number);
    get allWithinRangeAsList(): number[];
    get higher(): number;
    get lower(): number;
    isWithinRange(value: number): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.generic_properties.StringArrayOrRegexProperty' {
  class RegexAndPatternPropertyMatcher {
    testString(var1: string): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.optifine_properties' {
  import { BooleanProperty, StringArrayOrRegexProperty, FloatRangeFromStringArrayProperty, SimpleIntegerArrayProperty, LongRangeFromStringArrayProperty } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties';
  import { Properties } from 'java.util';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';
  import { CompoundTag } from 'net.minecraft.nbt';

  interface BabyProperty extends BooleanProperty {}
  class BabyProperty extends BooleanProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BabyProperty;
  }


  interface BiomeProperty extends StringArrayOrRegexProperty {}
  class BiomeProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BiomeProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
  }


  interface BlocksProperty extends StringArrayOrRegexProperty {}
  class BlocksProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): BlocksProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface ColorProperty extends StringArrayOrRegexProperty {}
  class ColorProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ColorProperty;
  }


  interface HealthProperty extends FloatRangeFromStringArrayProperty {}
  class HealthProperty extends FloatRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): HealthProperty;
  }


  interface HeightProperty extends SimpleIntegerArrayProperty {}
  class HeightProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): HeightProperty;
  }


  interface MoonPhaseProperty extends SimpleIntegerArrayProperty {}
  class MoonPhaseProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): MoonPhaseProperty;
  }


  interface NameProperty extends StringArrayOrRegexProperty {}
  class NameProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): NameProperty;
    getValueFromEntity(etfEntity: ETFEntityRenderState): string;
  }


  interface NBTProperty extends RandomProperty {}
  class NBTProperty extends RandomProperty {
    formatNbtPretty(nbt: CompoundTag): string;
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): NBTProperty;
  }


  interface ProfessionProperty extends StringArrayOrRegexProperty {}
  class ProfessionProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ProfessionProperty;
    testEntityInternal(entity: ETFEntityRenderState): boolean;
  }


  interface SizeProperty extends SimpleIntegerArrayProperty {}
  class SizeProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): SizeProperty;
  }


  interface TimeOfDayProperty extends LongRangeFromStringArrayProperty {}
  class TimeOfDayProperty extends LongRangeFromStringArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): TimeOfDayProperty;
  }


  interface WeatherProperty extends StringArrayOrRegexProperty {}
  class WeatherProperty extends StringArrayOrRegexProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): WeatherProperty;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties' {
  import { Consumer } from 'java.util.function';
  import { RandomPropertyFactory } from 'traben.entity_texture_features.features.property_reading.properties.RandomProperties';
  import { Properties } from 'java.util';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';

  class RandomProperties {
    static forEachProperty(consumer: Consumer<RandomPropertyFactory>): void;
    static getAllRegisteredRandomPropertiesOfIndex(properties: Properties, propertyNum: number): RandomProperty[];
    static register(...properties: RandomPropertyFactory[]): void;
  }


  class RandomProperty {
    cacheEntityInitialResult(entity: ETFEntityRenderState): void;
    canPropertyUpdate(): boolean;
    get propertyId(): string;
    get propertyIds(): string[];
    static readPropertiesOrThrow(properties: Properties, propertyNum: number, ...propertyId: string[]): string;
    setCanUpdate(canUpdate: boolean): void;
    testEntity(entity: ETFEntityRenderState, isUpdate: boolean): boolean;
    toString(): string;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.RandomProperties' {
  import { BiFunction } from 'java.util.function';
  import { Properties } from 'java.util';
  import { Integer } from 'java.lang';
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';

  class RandomPropertyFactory {
    get explanationTranslationKey(): string;
    get propertyId(): string;
    getPropertyOrNull(var1: Properties, var2: number): RandomProperty;
    static of(id: string, explanationKey: string, factory: BiFunction<Properties, number, RandomProperty>): RandomPropertyFactory;
    static of(id: string, explanationKey: string, factory: BiFunction<Properties, number, RandomProperty>, isSpawnLocked: boolean): RandomPropertyFactory;
    updatesOverTime(): boolean;
  }

}

declare module 'traben.entity_texture_features.features.property_reading.properties.RandomProperty' {
  import { Exception } from 'java.lang';

  interface RandomPropertyException extends Exception {}
  class RandomPropertyException extends Exception {
    constructor(reason: string);
  }

}

declare module 'traben.entity_texture_features.features.property_reading' {
  import { ETFVariantSuffixProvider } from 'traben.entity_texture_features.ETFApi';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { List, Properties, UUID, Set } from 'java.util';
  import { BiConsumer } from 'java.util.function';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { IntOpenHashSet } from 'it.unimi.dsi.fastutil.ints';
  import { EntityRandomSeedFunction } from 'ETFApi.ETFVariantSuffixProvider';
  import { EntityRandomSeedFunction as traben_entity_texture_features_etfapi_etfvariantsuffixprovider_EntityRandomSeedFunction } from 'traben.entity_texture_features.ETFApi.ETFVariantSuffixProvider';
  import { Integer } from 'java.lang';
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';
  import { EntityBooleanLRU } from 'traben.entity_texture_features.utils';

  interface PropertiesRandomProvider extends ETFVariantSuffixProvider {}
  class PropertiesRandomProvider extends ETFVariantSuffixProvider {
    entityCanUpdate(uuid: UUID): boolean;
    get allSuffixes(): IntOpenHashSet;
    get packName(): string;
    static getAllValidPropertyObjects(properties: Properties, propertiesFilePath: ResourceLocation, ...suffixToTest: string[]): RandomPropertyRule[];
    getSuffixForETFEntity(entityToBeTested: ETFEntityRenderState): number;
    isHigherPackThan(packNameOther: string): boolean;
    static of(initialPropertiesFileIdentifier: ResourceLocation, vanillaIdentifier: ResourceLocation, ...suffixKeyName: string[]): PropertiesRandomProvider;
    setOnMeetsRuleHook(onMeetsRule: BiConsumer<ETFEntityRenderState, RandomPropertyRule>): void;
    setRandomSupplier(entityRandomSeedFunction: EntityRandomSeedFunction): void;
    setRandomSupplier(var1: traben_entity_texture_features_etfapi_etfvariantsuffixprovider_EntityRandomSeedFunction): void;
    size(): number;
  }


  class RandomPropertyRule {
    readonly ruleNumber: number;
    readonly propertyFile: string;
    constructor(propertiesFile: string, ruleNumber: number, suffixes: number[], weights: number[], ...properties: RandomProperty[]);
    cacheEntityInitialResultsOfNonUpdatingProperties(entity: ETFEntityRenderState): void;
    doesEntityMeetConditionsOfThisCase(etfEntity: ETFEntityRenderState, isUpdate: boolean, UUID_CaseHasUpdateablesCustom: EntityBooleanLRU): boolean;
    get suffixSet(): Set<number>;
    getVariantSuffixFromThisCase(seed: number): number;
    isAlwaysMet(): boolean;
  }


  interface TrueRandomProvider extends ETFVariantSuffixProvider {}
  class TrueRandomProvider extends ETFVariantSuffixProvider {
    entityCanUpdate(uuid: UUID): boolean;
    get allSuffixes(): IntOpenHashSet;
    get packName(): string;
    getSuffixForETFEntity(entityToBeTested: ETFEntityRenderState): number;
    static of(vanillaIdentifier: ResourceLocation): TrueRandomProvider;
    setRandomSupplier(entityRandomSeedFunction: EntityRandomSeedFunction): void;
    setRandomSupplier(var1: traben_entity_texture_features_etfapi_etfvariantsuffixprovider_EntityRandomSeedFunction): void;
    size(): number;
  }

}

declare module 'traben.entity_texture_features.features.state' {
  import { UUID } from 'java.util';
  import { EntityType, Pose, Entity } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { Team } from 'net.minecraft.world.scores';
  import { Iterable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ETFEntity } from 'traben.entity_texture_features.utils';
  import { ETFRenderStateInit } from 'traben.entity_texture_features.features.state.ETFEntityRenderState';

  class ETFEntityRenderState {
    armorItems(): Iterable<ItemStack>;
    blockPos(): BlockPos;
    blockY(): number;
    canRenderBright(): boolean;
    customName(): Component;
    distanceTo(var1: Entity): number;
    entity(): ETFEntity;
    entityKey(): string;
    entityType(): EntityType<any>;
    static forEntity(entity: ETFEntity): ETFEntityRenderState;
    handItems(): Iterable<ItemStack>;
    hasCustomName(): boolean;
    isBlockEntity(): boolean;
    itemsEquipped(): Iterable<ItemStack>;
    nbt(): CompoundTag;
    optifineId(): number;
    pose(): Pose;
    scoreboardTeam(): Team;
    static setEtfRenderStateConstructor(reason: string, init: ETFRenderStateInit): void;
    uuid(): UUID;
    velocity(): Vec3;
    world(): Level;
  }


  interface ETFEntityRenderStateViaReference extends ETFEntityRenderState {}
  class ETFEntityRenderStateViaReference extends ETFEntityRenderState {
    constructor(entity: ETFEntity);
    armorItems(): Iterable<ItemStack>;
    blockPos(): BlockPos;
    blockY(): number;
    canRenderBright(): boolean;
    customName(): Component;
    distanceTo(other: Entity): number;
    entity(): ETFEntity;
    entityKey(): string;
    entityType(): EntityType<any>;
    handItems(): Iterable<ItemStack>;
    hasCustomName(): boolean;
    isBlockEntity(): boolean;
    itemsEquipped(): Iterable<ItemStack>;
    nbt(): CompoundTag;
    optifineId(): number;
    pose(): Pose;
    scoreboardTeam(): Team;
    uuid(): UUID;
    velocity(): Vec3;
    world(): Level;
  }


  class HoldsETFRenderState {
    etf$getState(): ETFEntityRenderState;
    etf$initState(var1: ETFEntity): void;
  }

}

declare module 'traben.entity_texture_features.features.state.ETFEntityRenderState' {
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { ETFEntity } from 'traben.entity_texture_features.utils';

  class ETFRenderStateInit {
    make(var1: ETFEntity): ETFEntityRenderState;
  }

}

declare module 'traben.entity_texture_features.features.texture_handlers' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { Model } from 'net.minecraft.client.model';
  import { Holder } from 'net.minecraft.core';
  import { ArmorMaterial } from 'net.minecraft.world.item';
  import { ArmorTrim } from 'net.minecraft.world.item.armortrim';
  import { Enum } from 'java.lang';
  import { Object2ReferenceOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { List } from 'java.util';
  import { TextureAtlasSprite, SpriteContents } from 'net.minecraft.client.renderer.texture';
  import { Resource } from 'net.minecraft.server.packs.resources';
  import { TextureReturnState } from 'traben.entity_texture_features.features.texture_handlers.ETFTexture';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { EmissiveRenderModes } from 'traben.entity_texture_features.config.ETFConfig';

  class ETFArmorHandler {
    end(): void;
    getBaseTexture(vanilla: ResourceLocation): ResourceLocation;
    renderBaseEmissive(matrices: PoseStack, vertexConsumers: MultiBufferSource, model: Model, red: number, green: number, blue: number): void;
    renderTrimEmissive(matrices: PoseStack, vertexConsumers: MultiBufferSource, model: Model): void;
    setTrim(armorMaterial: Holder<ArmorMaterial>, trim: ArmorTrim, leggings: boolean): void;
    start(): void;
  }


  interface ETFDirectory extends Enum<ETFDirectory> {}
  class ETFDirectory extends Enum<ETFDirectory> {
    static readonly DOES_NOT_EXIST: ETFDirectory;
    static readonly ETF: ETFDirectory;
    static readonly OLD_OPTIFINE: ETFDirectory;
    static readonly OPTIFINE: ETFDirectory;
    static readonly VANILLA: ETFDirectory;
    doesReplace(): boolean;
    static get cache(): Object2ReferenceOpenHashMap<ResourceLocation, ETFDirectory>;
    static getDirectoryOf(vanillaIdentifier: ResourceLocation): ETFDirectory;
    static getDirectoryVersionOf(vanillaIdentifier: ResourceLocation): ResourceLocation;
    static getIdentifierAsDirectory(identifier: ResourceLocation, directory: ETFDirectory): ResourceLocation;
    static valueOf(name: string): ETFDirectory;
    static values(): ETFDirectory[];
  }


  class ETFSprite {
    readonly isETFAltered: boolean;
    constructor(originalSprite: TextureAtlasSprite, etfTexture: ETFTexture, isNotVariant: boolean);
    get emissive(): TextureAtlasSprite;
    get spriteVariant(): TextureAtlasSprite;
    isEmissive(): boolean;
    static load(id: ResourceLocation, resource: Resource): SpriteContents;
  }


  class ETFTexture {
    static readonly PATCH_NAMESPACE_PREFIX: string;
    readonly thisIdentifier: ResourceLocation;
    currentTextureState: TextureReturnState;
    eSuffix: string;
    constructor(variantIdentifier: ResourceLocation);
    assertPatchedTextures(): void;
    canPatch(): boolean;
    doesBlink(): boolean;
    doesBlink2(): boolean;
    exists(): boolean;
    get emissiveIdentifierOfCurrentState(): ResourceLocation;
    get enchantIdentifierOfCurrentState(): ResourceLocation;
    getEmissiveRenderLayer(model: Model): RenderType;
    getEmissiveRenderLayer(model: Model, modeToUsePossiblyManuallyChosen: EmissiveRenderModes): RenderType;
    getEmissiveVertexConsumer(vertexConsumerProvider: MultiBufferSource, model: Model, modeToUsePossiblyManuallyChosen: EmissiveRenderModes): VertexConsumer;
    getPaintingSprite(originalSprite: TextureAtlasSprite, originalID: ResourceLocation): ETFSprite;
    getTextureIdentifier(entity: ETFEntityRenderState): ResourceLocation;
    isEmissive(): boolean;
    isEnchanted(): boolean;
    static manual(modifiedSkinIdentifier: ResourceLocation, blinkIdentifier: ResourceLocation, blink2Identifier: ResourceLocation, emissiveIdentifier: ResourceLocation, blinkEmissiveIdentifier: ResourceLocation, blink2EmissiveIdentifier: ResourceLocation, enchantIdentifier: ResourceLocation, blinkenchantIdentifier: ResourceLocation, blink2enchantIdentifier: ResourceLocation, patchIdentifier: ResourceLocation, blinkpatchIdentifier: ResourceLocation, blink2patchIdentifier: ResourceLocation): ETFTexture;
    static manual(modifiedSkinIdentifier: ResourceLocation, emissiveIdentifier: ResourceLocation, enchantIdentifier: ResourceLocation): ETFTexture;
    static ofUnmodifiable(identifier: ResourceLocation, emissiveIdentifier: ResourceLocation): ETFTexture;
    static patchTextureToRemoveZFightingWithOtherTexture(baseImage: NativeImage, otherImage: NativeImage): void;
    renderEmissive(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, modelPart: ModelPart): void;
    renderEmissive(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, modelPart: ModelPart, modeToUsePossiblyManuallyChosen: EmissiveRenderModes): void;
    renderEmissive(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, model: Model): void;
    renderEmissive(matrixStack: PoseStack, vertexConsumerProvider: MultiBufferSource, model: Model, modeToUsePossiblyManuallyChosen: EmissiveRenderModes): void;
    setGUIBlink(): void;
    toString(): string;
  }

}

declare module 'traben.entity_texture_features.features.texture_handlers.ETFTexture' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface TextureReturnState extends Enum<TextureReturnState> {}
  class TextureReturnState extends Enum<TextureReturnState> {
    static readonly NORMAL: TextureReturnState;
    static readonly NORMAL_PATCHED: TextureReturnState;
    static readonly BLINK: TextureReturnState;
    static readonly BLINK_PATCHED: TextureReturnState;
    static readonly BLINK2: TextureReturnState;
    static readonly BLINK2_PATCHED: TextureReturnState;
    static readonly APPLY_PATCH: TextureReturnState;
    static readonly APPLY_BLINK: TextureReturnState;
    static readonly APPLY_BLINK2: TextureReturnState;
    toString(): string;
    static valueOf(name: string): TextureReturnState;
    static values(): TextureReturnState[];
  }

}

declare module 'traben.entity_texture_features.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  class CancelTarget {
  }


  interface Plugin extends IMixinConfigPlugin {}
  class Plugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.accessor' {
  import { List } from 'java.util';
  import { FormattedCharSequence } from 'net.minecraft.util';

  class TooltipAccessor {
    setCachedTooltip(var1: FormattedCharSequence[]): void;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.entity.block' {
  import { BlockEntityRenderer } from 'net.minecraft.client.renderer.blockentity';
  import { SkullBlockEntity } from 'net.minecraft.world.level.block.entity';

  class MixinMobSpawnerLogic {
  }


  interface MixinSkullBlockEntityRenderer extends BlockEntityRenderer<SkullBlockEntity> {}
  class MixinSkullBlockEntityRenderer extends BlockEntityRenderer<SkullBlockEntity> {
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.entity.misc' {
  import { Monster } from 'net.minecraft.world.entity.monster';
  import { ETFEntity } from 'traben.entity_texture_features.utils';
  import { BlockEntityType, BlockEntity } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { Level } from 'net.minecraft.world.level';
  import { EntityType, Entity, Pose } from 'net.minecraft.world.entity';
  import { UUID } from 'java.util';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { Team, PlayerTeam } from 'net.minecraft.world.scores';
  import { Iterable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Squid } from 'net.minecraft.world.entity.animal';
  import { ETFPlayerEntity } from 'traben.entity_texture_features.features.player';
  import { Inventory, PlayerModelPart, Player } from 'net.minecraft.world.entity.player';
  import { BlockState } from 'net.minecraft.world.level.block.state';

  interface MixinBlazeEntity extends Monster {}
  class MixinBlazeEntity extends Monster {
  }


  interface MixinBlockEntity extends ETFEntity {}
  class MixinBlockEntity extends ETFEntity {
    etf$canBeBright(): boolean;
    etf$distanceTo(entity: Entity): number;
    etf$getArmorItems(): Iterable<ItemStack>;
    etf$getBlockPos(): BlockPos;
    etf$getBlockY(): number;
    etf$getCustomName(): Component;
    etf$getEntityKey(): string;
    etf$getHandItems(): Iterable<ItemStack>;
    etf$getItemsEquipped(): Iterable<ItemStack>;
    etf$getNbt(): CompoundTag;
    etf$getOptifineId(): number;
    etf$getPose(): Pose;
    etf$getScoreboardTeam(): Team;
    etf$getType(): EntityType<any>;
    etf$getUuid(): UUID;
    etf$getVelocity(): Vec3;
    etf$getWorld(): Level;
    etf$hasCustomName(): boolean;
    etf$isBlockEntity(): boolean;
    get blockPos(): BlockPos;
    get level(): Level;
    get type(): BlockEntityType<any>;
  }


  class MixinBlockEntityRenderDispatcher {
  }


  class MixinBlockEntityRenderState {
  }


  interface MixinEntity extends ETFEntity {}
  class MixinEntity extends ETFEntity {
    blockPosition(): BlockPos;
    distanceTo(var1: Entity): number;
    etf$canBeBright(): boolean;
    etf$distanceTo(entity: Entity): number;
    etf$getArmorItems(): Iterable<ItemStack>;
    etf$getBlockPos(): BlockPos;
    etf$getBlockY(): number;
    etf$getCustomName(): Component;
    etf$getEntityKey(): string;
    etf$getHandItems(): Iterable<ItemStack>;
    etf$getItemsEquipped(): Iterable<ItemStack>;
    etf$getNbt(): CompoundTag;
    etf$getOptifineId(): number;
    etf$getPose(): Pose;
    etf$getScoreboardTeam(): Team;
    etf$getType(): EntityType<any>;
    etf$getUuid(): UUID;
    etf$getVelocity(): Vec3;
    etf$getWorld(): Level;
    etf$hasCustomName(): boolean;
    etf$isBlockEntity(): boolean;
    get blockY(): number;
    get customName(): Component;
    get deltaMovement(): Vec3;
    get pose(): Pose;
    get team(): PlayerTeam;
    get type(): EntityType<any>;
    get uUID(): UUID;
    hasCustomName(): boolean;
    level(): Level;
  }


  class MixinEntityRenderDispatcher {
  }


  class MixinEntityRenderState {
  }


  interface MixinGlowSquidEntity extends Squid {}
  class MixinGlowSquidEntity extends Squid {
    constructor(entityType: EntityType<Squid>, world: Level);
  }


  class MixinMob_LeashNBTFix {
  }


  interface MixinPhantomEntity extends Entity {}
  class MixinPhantomEntity extends Entity {
  }


  interface MixinPlayerEntity extends ETFPlayerEntity, Entity {}
  class MixinPlayerEntity extends ETFPlayerEntity {
    constructor(type: EntityType<any>, world: Level);
    etf$getEntity(): Entity;
    etf$getInventory(): Inventory;
    etf$getName(): Component;
    etf$getUuidAsString(): string;
    etf$isPartVisible(part: PlayerModelPart): boolean;
    etf$isTeammate(player: Player): boolean;
    get inventory(): Inventory;
    get name(): Component;
    isModelPartShown(var1: PlayerModelPart): boolean;
  }


  interface MixinSkullBlockEntity extends ETFPlayerEntity, BlockEntity {}
  class MixinSkullBlockEntity extends ETFPlayerEntity {
    constructor(type: BlockEntityType<any>, pos: BlockPos, state: BlockState);
    etf$getEntity(): Entity;
    etf$getInventory(): Inventory;
    etf$getName(): Component;
    etf$getUuidAsString(): string;
    etf$isPartVisible(part: PlayerModelPart): boolean;
    etf$isTeammate(player: Player): boolean;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.entity.renderer.feature' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  class MixinElytraFeatureRenderer<T extends LivingEntity = any> {
  }


  class MixinEyeFeatureRenderer {
  }


  class MixinMooshroomMushroomFeatureRenderer {
  }


  interface MixinShoulderParrotFeatureRenderer<T extends Player = any> extends RenderLayer<T, PlayerModel> {}
  class MixinShoulderParrotFeatureRenderer<T extends Player = any> extends RenderLayer<T, PlayerModel> {
    constructor(context: RenderLayerParent<T, PlayerModel<T>>);
  }


  interface MixinWardenExtraTextureParts<T extends Warden = any, M extends WardenModel<T> = any> extends RenderLayer<T, M> {}
  class MixinWardenExtraTextureParts<T extends Warden = any, M extends WardenModel<T> = any> extends RenderLayer<T, M> {
    constructor();
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.entity.renderer' {
  import { EntityRenderer, RenderLayerParent, LivingEntityRenderer } from 'net.minecraft.client.renderer.entity';
  import { EnderDragon } from 'net.minecraft.world.entity.boss.enderdragon';
  import { Painting } from 'net.minecraft.world.entity.decoration';
  import { AbstractClientPlayer } from 'net.minecraft.client.player';
  import { PlayerModel } from 'net.minecraft.client.model';
  import { ETFPlayerSkinHolder, ETFPlayerTexture } from 'traben.entity_texture_features.features.player';
  import { Context } from 'EntityRendererProvider';

  class MixinEndCrystalRenderer {
  }


  interface MixinEnderDragonEntityRenderer extends EntityRenderer<EnderDragon> {}
  class MixinEnderDragonEntityRenderer extends EntityRenderer<EnderDragon> {
  }


  class MixinEntityRenderer<T extends Entity = any> {
  }


  class MixinIllusionerRenderer {
  }


  interface MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, EntityRenderer<T> {}
  class MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
  }


  interface MixinPaintingEntityRenderer extends EntityRenderer<Painting> {}
  class MixinPaintingEntityRenderer extends EntityRenderer<Painting> {
  }


  interface MixinPlayerEntityRenderer extends ETFPlayerSkinHolder, LivingEntityRenderer<AbstractClientPlayer, PlayerModel> {}
  class MixinPlayerEntityRenderer extends ETFPlayerSkinHolder {
    constructor(ctx: Context, model: PlayerModel<AbstractClientPlayer>, shadowRadius: number);
    etf$getETFPlayerTexture(): ETFPlayerTexture;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins' {
  import { ETFVertexConsumer, ETFRenderLayerWithTexture } from 'traben.entity_texture_features.utils';
  import { ETFTexture } from 'traben.entity_texture_features.features.texture_handlers';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { CompositeState } from 'RenderType';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { GuiGraphics } from 'net.minecraft.client.gui';

  interface MixinBufferBuilder extends ETFVertexConsumer {}
  class MixinBufferBuilder extends ETFVertexConsumer {
    etf$getETFTexture(): ETFTexture;
    etf$getProvider(): MultiBufferSource;
    etf$getRenderLayer(): RenderType;
    etf$initETFVertexConsumer(provider: MultiBufferSource, renderLayer: RenderType): void;
  }


  class MixinIdentifier {
  }


  class MixinModelPart {
    render(var1: PoseStack, var2: VertexConsumer, var3: number, var4: number, var5: number): void;
  }


  interface MixinMultiPhase extends ETFRenderLayerWithTexture {}
  class MixinMultiPhase extends ETFRenderLayerWithTexture {
    state: CompositeState;
    etf$getId(): Optional<ResourceLocation>;
  }


  interface MixinPackScreen extends Screen {}
  class MixinPackScreen extends Screen {
    renderWidget(context: GuiGraphics, mouseX: number, mouseY: number, delta: number): void;
  }


  class MixinPlayerSkinTexture {
  }


  class MixinRenderLayer {
  }


  class MixinSpriteIdentifier {
  }


  class MixinVertexConsumerProvider$Immediate {
  }


  interface MixinVertexMultiConsumer$Double extends ETFVertexConsumer {}
  class MixinVertexMultiConsumer$Double extends ETFVertexConsumer {
    etf$getETFTexture(): ETFTexture;
    etf$getProvider(): MultiBufferSource;
    etf$getRenderLayer(): RenderType;
    etf$initETFVertexConsumer(provider: MultiBufferSource, renderLayer: RenderType): void;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.mods.imediatelyfast' {
  class MixinBatchableBufferSource {
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.mods.iris' {
  import { ETFRenderLayerWithTexture } from 'traben.entity_texture_features.utils';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { Optional } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';

  class MixinFullyBufferedMultiBufferSource {
  }


  interface MixinInnerWrappedRenderType extends ETFRenderLayerWithTexture {}
  class MixinInnerWrappedRenderType extends ETFRenderLayerWithTexture {
    etf$getId(): Optional<ResourceLocation>;
    unwrap(): RenderType;
  }


  interface MixinOuterWrappedRenderType extends ETFRenderLayerWithTexture {}
  class MixinOuterWrappedRenderType extends ETFRenderLayerWithTexture {
    etf$getId(): Optional<ResourceLocation>;
    unwrap(): RenderType;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.mods.iris.old' {
  class MixinFullyBufferedMultiBufferSource {
  }


  class MixinInnerWrappedRenderType {
  }


  class MixinOuterWrappedRenderType {
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.mods.skin_layers' {
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class MixinCustomizableModelPart {
    render(var1: ModelPart, var2: PoseStack, var3: VertexConsumer, var4: number, var5: number, var6: number): void;
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.mods.sodium' {
  import { PoseStack } from 'com.mojang.blaze3d.vertex';
  import { VertexBufferWriter } from 'net.caffeinemc.mods.sodium.api.vertex.buffer';
  import { ModelPart } from 'net.minecraft.client.model.geom';

  class MixinModelPartSodium {
    static render(matrixStack: PoseStack, writer: VertexBufferWriter, part: ModelPart, light: number, overlay: number, color: number): void;
  }


  class MixinSodiumBufferBuilder {
  }

}

declare module 'traben.entity_texture_features.mixin.mixins.reloading' {
  class MixinMinecraftClient {
  }


  class MixinResourceReload {
  }

}

declare module 'traben.entity_texture_features.utils' {
  import { Object2BooleanLinkedOpenHashMap, Object2IntLinkedOpenHashMap, Object2ObjectLinkedOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { UUID, Optional, Properties, List } from 'java.util';
  import { ETFEntityRenderState } from 'traben.entity_texture_features.features.state';
  import { EntityType, Entity, Pose } from 'net.minecraft.world.entity';
  import { Level } from 'net.minecraft.world.level';
  import { BlockPos } from 'net.minecraft.core';
  import { CompoundTag } from 'net.minecraft.nbt';
  import { Component } from 'net.minecraft.network.chat';
  import { Team } from 'net.minecraft.world.scores';
  import { Iterable } from 'java.lang';
  import { ItemStack } from 'net.minecraft.world.item';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { NativeImage } from 'com.mojang.blaze3d.platform';
  import { ETFTexture } from 'traben.entity_texture_features.features.texture_handlers';
  import { MultiBufferSource, RenderType } from 'net.minecraft.client.renderer';
  import { RenderMethodForOverlay } from 'traben.entity_texture_features.utils.ETFUtils2';

  interface EntityBooleanLRU extends Object2BooleanLinkedOpenHashMap<UUID> {}
  class EntityBooleanLRU extends Object2BooleanLinkedOpenHashMap<UUID> {
    constructor(capacity: number);

    constructor();
    getBoolean(k: any): boolean;
    put(uuid: UUID, v: boolean): boolean;
  }


  interface EntityIntLRU extends Object2IntLinkedOpenHashMap<UUID> {}
  class EntityIntLRU extends Object2IntLinkedOpenHashMap<UUID> {
    constructor(capacity: number);

    constructor();
    getInt(k: any): number;
    put(uuid: UUID, v: number): number;
  }


  class ETFEntity {
    etf$canBeBright(): boolean;
    etf$distanceTo(var1: Entity): number;
    etf$getArmorItems(): Iterable<ItemStack>;
    etf$getBlockPos(): BlockPos;
    etf$getBlockY(): number;
    etf$getCustomName(): Component;
    etf$getETFRenderState(): ETFEntityRenderState;
    etf$getEntityKey(): string;
    etf$getHandItems(): Iterable<ItemStack>;
    etf$getItemsEquipped(): Iterable<ItemStack>;
    etf$getNbt(): CompoundTag;
    etf$getOptifineId(): number;
    etf$getPose(): Pose;
    etf$getScoreboardTeam(): Team;
    etf$getType(): EntityType<any>;
    etf$getUuid(): UUID;
    etf$getVelocity(): Vec3;
    etf$getWorld(): Level;
    etf$hasCustomName(): boolean;
    etf$isBlockEntity(): boolean;
  }


  interface ETFLruCache<X = any, Y = any> extends Object2ObjectLinkedOpenHashMap<X, Y> {}
  class ETFLruCache<X = any, Y = any> extends Object2ObjectLinkedOpenHashMap<X, Y> {
    constructor();
    get(key: any): Y;
    put(key: X, value: Y): Y;
    removeEntryOnly(key: X): void;
  }


  class ETFRenderLayerWithTexture {
    etf$getId(): Optional<ResourceLocation>;
  }


  class ETFUtils2 {
    static addVariantNumberSuffix(identifier: ResourceLocation, variant: number): ResourceLocation;
    static addVariantNumberSuffix(identifierString: string, variant: number): string;
    static checkModCompatibility(): void;
    static emptyNativeImage(): NativeImage;
    static emptyNativeImage(Width: number, Height: number): NativeImage;
    static getETFVariantNotNullForInjector(identifier: ResourceLocation): ResourceLocation;
    static getNativeImageElseNull(identifier: ResourceLocation): NativeImage;
    static getPixel(image: NativeImage, x: number, y: number): number;
    static logError(obj: string): void;
    static logError(obj: string, inChat: boolean): void;
    static logMessage(obj: string): void;
    static logMessage(obj: string, inChat: boolean): void;
    static logWarn(obj: string): void;
    static logWarn(obj: string, inChat: boolean): void;
    static printDebugImage(image: NativeImage): void;
    static readAndReturnAllLayeredPropertiesElseNull(path: ResourceLocation): Properties[];
    static readAndReturnPropertiesElseNull(path: ResourceLocation): Properties;
    static registerNativeImageToIdentifier(image: NativeImage, identifier: ResourceLocation): boolean;
    static renderEmissive(texture: ETFTexture, provider: MultiBufferSource, renderer: RenderMethodForOverlay): boolean;
    static renderEnchanted(texture: ETFTexture, provider: MultiBufferSource, light: number, renderer: RenderMethodForOverlay): boolean;
    static replaceIdentifier(id: ResourceLocation, regex: string, replace: string): ResourceLocation;
    static res(fullPath: string): ResourceLocation;
    static res(namespace: string, path: string): ResourceLocation;
    static returnNameOfHighestPackFromTheseMultiple(packNameList: string[]): string;
    static returnNameOfHighestPackFromTheseTwo(pack1: string, pack2: string): string;
    static setPixel(image: NativeImage, x: number, y: number, color: number): void;
  }


  class ETFVertexConsumer {
    etf$getETFTexture(): ETFTexture;
    etf$getProvider(): MultiBufferSource;
    etf$getRenderLayer(): RenderType;
    etf$initETFVertexConsumer(var1: MultiBufferSource, var2: RenderType): void;
  }

}

declare module 'traben.entity_texture_features.utils.ETFUtils2' {
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  class RenderMethodForOverlay {
    render(var1: VertexConsumer, var2: number): void;
  }

}