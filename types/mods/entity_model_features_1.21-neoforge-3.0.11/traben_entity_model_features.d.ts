declare module 'traben.entity_model_features.config' {
  import { TConfig } from 'traben.tconfig';
  import { RenderModeChoice, VanillaModelRenderMode, ModelPrintMode, PhysicsModCompatChoice } from 'traben.entity_model_features.config.EMFConfig';
  import { UpdateFrequency, String2EnumNullMap } from 'ETFConfig';
  import { ObjectOpenHashSet } from 'it.unimi.dsi.fastutil.objects';
  import { EMFEntity } from 'traben.entity_model_features.utils';
  import { TConfigEntryCategory } from 'traben.tconfig.gui.entries';
  import { ResourceLocation } from 'net.minecraft.resources';

  interface EMFConfig extends TConfig {}
  class EMFConfig extends TConfig {
    logModelCreationData: boolean;
    debugOnRightClick: boolean;
    renderModeChoice: RenderModeChoice;
    vanillaModelHologramRenderMode_2: VanillaModelRenderMode;
    modelExportMode: ModelPrintMode;
    attemptPhysicsModPatch_2: PhysicsModCompatChoice;
    modelUpdateFrequency: UpdateFrequency;
    entityRenderModeOverrides: String2EnumNullMap;
    entityPhysicsModPatchOverrides: String2EnumNullMap;
    entityVanillaHologramOverrides: String2EnumNullMap;
    modelsNamesDisabled: ObjectOpenHashSet;
    allowEBEModConfigModify: boolean;
    animationLODDistance: number;
    retainDetailOnLowFps: boolean;
    retainDetailOnLargerMobs: boolean;
    animationFrameSkipDuringIrisShadowPass: boolean;
    preventFirstPersonHandAnimating: boolean;
    onlyClientPlayerModel: boolean;
    doubleChestAnimFix: boolean;
    enforceOptifineVariationRequiresDefaultModel: boolean;
    enforceOptifineVariationRequiresDefaultModel_v2: boolean;
    resetPlayerModelEachRender: boolean;
    resetPlayerModelEachRender_v2: boolean;
    onlyDebugRenderOnHover: boolean;
    enforceOptifineSubFoldersVariantOnly: boolean;
    enforceOptiFineAnimSyntaxLimits: boolean;
    allowOptifineFallbackProperties: boolean;
    showReloadErrorToast: boolean;
    exportRotations: boolean;
    get gUIOptions(): TConfigEntryCategory;
    get modIcon(): ResourceLocation;
    getPhysicsModModeFor(entity: EMFEntity): PhysicsModCompatChoice;
    getRenderModeFor(entity: EMFEntity): RenderModeChoice;
    getVanillaHologramModeFor(entity: EMFEntity): VanillaModelRenderMode;
    isModelDisabled(modelName: string): boolean;
  }


  class EMFModMenu {
  }

}

declare module 'traben.entity_model_features.config.EMFConfig' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface RenderModeChoice extends Enum<RenderModeChoice> {}
  class RenderModeChoice extends Enum<RenderModeChoice> {
    static readonly NORMAL: RenderModeChoice;
    static readonly GREEN: RenderModeChoice;
    static readonly LINES_AND_TEXTURE: RenderModeChoice;
    static readonly LINES_AND_TEXTURE_FLASH: RenderModeChoice;
    static readonly LINES: RenderModeChoice;
    static readonly NONE: RenderModeChoice;
    toString(): string;
    static valueOf(name: string): RenderModeChoice;
    static values(): RenderModeChoice[];
  }


  interface VanillaModelRenderMode extends Enum<VanillaModelRenderMode> {}
  class VanillaModelRenderMode extends Enum<VanillaModelRenderMode> {
    static readonly OFF: VanillaModelRenderMode;
    static readonly NORMAL: VanillaModelRenderMode;
    static readonly OFFSET: VanillaModelRenderMode;
    toString(): string;
    static valueOf(name: string): VanillaModelRenderMode;
    static values(): VanillaModelRenderMode[];
  }


  interface ModelPrintMode extends Enum<ModelPrintMode> {}
  class ModelPrintMode extends Enum<ModelPrintMode> {
    static readonly NONE: ModelPrintMode;
    static readonly LOG_ONLY: ModelPrintMode;
    static readonly LOG_AND_JEM: ModelPrintMode;
    static readonly ALL_LOG_ONLY: ModelPrintMode;
    static readonly ALL_LOG_AND_JEM: ModelPrintMode;
    doesAll(): boolean;
    doesJems(): boolean;
    doesLog(): boolean;
    toString(): string;
    static valueOf(name: string): ModelPrintMode;
    static values(): ModelPrintMode[];
  }


  interface PhysicsModCompatChoice extends Enum<PhysicsModCompatChoice> {}
  class PhysicsModCompatChoice extends Enum<PhysicsModCompatChoice> {
    static readonly OFF: PhysicsModCompatChoice;
    static readonly VANILLA: PhysicsModCompatChoice;
    static readonly CUSTOM: PhysicsModCompatChoice;
    toString(): string;
    static valueOf(name: string): PhysicsModCompatChoice;
    static values(): PhysicsModCompatChoice[];
  }

}

declare module 'traben.entity_model_features' {
  import { TConfigHandler } from 'traben.tconfig';
  import { EMFConfig } from 'traben.entity_model_features.config';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { Minecraft } from 'net.minecraft.client';
  import { EMFEntity, EMFDirectoryHandler } from 'traben.entity_model_features.utils';
  import { BooleanSupplier, Function, BiFunction } from 'java.util.function';
  import { SampledFloat } from 'net.minecraft.util.valueproviders';
  import { UniqueVariableFactory } from 'traben.entity_model_features.models.animation.math.variables.factories';
  import { Float, Boolean, Exception } from 'java.lang';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { List, Set, UUID, Map, ArrayList } from 'java.util';
  import { MethodFactory } from 'traben.entity_model_features.models.animation.math.methods.MethodRegistry';
  import { Entity } from 'net.minecraft.world.entity';
  import { BlockEntity, BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { ModelPart, ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { EntityModel } from 'net.minecraft.client.model';
  import { EMFModelPartRoot, EMFModelPart } from 'traben.entity_model_features.models.parts';
  import { EntityIntLRU } from 'traben.entity_texture_features.utils';
  import { Object2ObjectLinkedOpenHashMap, ObjectSet, Object2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { EMFJemData } from 'traben.entity_model_features.models.jem_objects';
  import { EMFModel_ID, EMFPartialArmor } from 'traben.entity_model_features.models';

  class EMF {
    static readonly EYES_FEATURE_LIGHT_VALUE: number;
    static readonly MOD_ID: string;
    static forgeHadLoadingError: boolean;
    static testedForge: boolean;
    static tempDisableModelModifications: boolean;
    static config(): TConfigHandler<EMFConfig>;
    get subTitle(): string;
    static getConfigScreen(parent: Screen): Screen;
    static getConfigScreen(ignored: Minecraft, parent: Screen): Screen;
    static init(): void;
    static testForForgeLoadingError(): boolean;
  }


  class EMFAnimationApi {
    static emfEntityOf(entity: Entity): EMFEntity;
    static emfEntityOf(blockEntity: BlockEntity): EMFEntity;
    static getApiVersion(): number;
    static getCurrentEMFVariantOfModel(model: EntityModel<any>): number;
    static getCurrentEntity(): EMFEntity;
    static isModelAnimatedByEMF(model: EntityModel<any>): boolean;
    static isModelCustomizedByEMF(model: EntityModel<any>): boolean;
    static isModelPartAnimatedByEMF(modelPart: ModelPart): boolean;
    static isModelPartCustomToEMF(modelPart: ModelPart): boolean;
    static lockEntityToVanillaModel(entityOrBlockEntity: EMFEntity): boolean;
    static pauseAllCustomAnimationsForEntity(entityOrBlockEntity: EMFEntity): boolean;
    static pauseCustomAnimationsForThesePartsOfEntity(entityOrBlockEntity: EMFEntity, ...parts: ModelPart[]): boolean;
    static registerAnimationBiFunction(sourceModId: string, methodName: string, methodExplanationTranslationKeyOrText: string, biFunction: BiFunction<number, number, number>): void;
    static registerAnimationBiFunction(sourceModId: string, methodName: string, biFunction: BiFunction<number, number, number>): void;
    static registerAnimationFunction(sourceModId: string, methodName: string, methodExplanationTranslationKeyOrText: string, functionParameter: Function<number, number>): void;
    static registerAnimationFunction(sourceModId: string, methodName: string, functionParameter: Function<number, number>): void;
    static registerAnimationMultiFunction(sourceModId: string, methodName: string, methodExplanationTranslationKeyOrText: string, multiFunction: Function<number[], number>): void;
    static registerAnimationMultiFunction(sourceModId: string, methodName: string, multiFunction: Function<number[], number>): void;
    static registerAnimationTriFunction(sourceModId: string, methodName: string, methodExplanationTranslationKeyOrText: string, triFunction: TriFunction<number, number, number, number>): void;
    static registerAnimationTriFunction(sourceModId: string, methodName: string, triFunction: TriFunction<number, number, number, number>): void;
    static registerCustomFunctionFactory(sourceModId: string, methodName: string, methodExplanationTranslationKeyOrText: string, factory: MethodFactory): void;
    static registerCustomFunctionFactory(sourceModId: string, methodName: string, factory: MethodFactory): void;
    static registerPauseCondition(shouldPause: Function<EMFEntity, boolean>): boolean;
    static registerSingletonAnimationVariable(sourceModId: string, variableName: string, variableExplanationTranslationKeyOrText: string, variableValueSupplier: BooleanSupplier): void;
    static registerSingletonAnimationVariable(sourceModId: string, variableName: string, variableExplanationTranslationKeyOrText: string, variableValueSupplier: SampledFloat): void;
    static registerSingletonAnimationVariable(sourceModId: string, variableName: string, variableValueSupplier: BooleanSupplier): void;
    static registerSingletonAnimationVariable(sourceModId: string, variableName: string, variableValueSupplier: SampledFloat): void;
    static registerUniqueAnimationVariableFactory(sourceModId: string, variableName: string, uniqueVariableFactory: UniqueVariableFactory): void;
    static registerVanillaModelCondition(shouldUseVanillaModel: Function<EMFEntity, boolean>): boolean;
    static resumeAllCustomAnimationsForEntity(entityOrBlockEntity: EMFEntity): boolean;
    static unlockEntityToVanillaModel(entityOrBlockEntity: EMFEntity): boolean;
  }


  interface EMFException extends Exception {}
  class EMFException extends Exception {
    constructor(s: string);
    record(): EMFException;
    static recordException<E extends Exception>(s: E): E;
    toString(): string;
  }


  class EMFInit {
    constructor();
  }


  class EMFManager {
    static lastCreatedRootModelPart: EMFModelPartRoot;
    readonly IS_PHYSICS_MOD_INSTALLED: boolean;
    readonly IS_EBE_INSTALLED: boolean;
    readonly lastModelRuleOfEntity: EntityIntLRU;
    readonly lastModelSuffixOfEntity: EntityIntLRU;
    readonly rootPartsPerEntityTypeForDebug: Object2ObjectLinkedOpenHashMap;
    readonly modelsAnnounced: ObjectSet;
    readonly rootPartsPerEntityTypeForVariation: Object2ObjectLinkedOpenHashMap;
    readonly cache_JemDataByFileName: Object2ObjectOpenHashMap;
    readonly cache_LayersByModelName: Object2ObjectOpenHashMap;
    readonly EBE_JEMS_FOUND_LAST: Set;
    entityForDebugPrint: UUID;
    entityRenderCount: number;
    isAnimationValidationPhase: boolean;
    currentSpecifiedModelLoading: string;
    currentBlockEntityTypeLoading: BlockEntityType;
    readonly loadingExceptions: List;
    get armorParts(): EMFPartialArmor;
    static get instance(): EMFManager;
    get resourcePackList(): ArrayList<string>;
    static getJemDataWithDirectory(jemDirectory: EMFDirectoryHandler, mobModelIDInfo: EMFModel_ID): EMFJemData;
    static getModelFromHierarchicalId(hierarchId: string, map: Map<string, EMFModelPart>): EMFModelPart;
    injectIntoModelRootGetter(layer: ModelLayerLocation, root: ModelPart): ModelPart;
    modifyEBEIfRequired(): void;
    receiveException(exception: Exception): void;
    reloadEnd(): void;
    static resetInstance(): void;
    setupAnimationsFromJemToModel(jemData: EMFJemData, emfRootPart: EMFModelPartRoot, variantNum: number): void;
    wasEBEModified(): boolean;
  }

}

declare module 'traben.entity_model_features.mixin.mixins.accessor' {
  import { Polygon } from 'ModelPart';
  import { Timer } from 'DeltaTracker';

  class AgeableMobRendererAccessor {
  }


  class CuboidAccessor {
    setMaxX(var1: number): void;
    setMaxY(var1: number): void;
    setMaxZ(var1: number): void;
    setMinX(var1: number): void;
    setMinY(var1: number): void;
    setMinZ(var1: number): void;
    setPolygons(var1: Polygon[]): void;
  }


  class MinecraftClientAccessor {
    get timer(): Timer;
  }


  class Mixin_GuiEntityTester {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.exporting' {
  import { IEMFUnmodifiedLayerRootGetter } from 'traben.entity_model_features.utils';
  import { Map } from 'java.util';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';

  class MixinBabyModelTransform {
  }


  interface MixinEntityModelSet extends IEMFUnmodifiedLayerRootGetter {}
  class MixinEntityModelSet extends IEMFUnmodifiedLayerRootGetter {
    roots: Map;
    emf$getUnmodifiedRoots(): Map<ModelLayerLocation, LayerDefinition>;
  }


  class MixinMeshTransformer {
  }

}

declare module 'traben.entity_model_features.mixin.mixins' {
  import { EMFEntity, IEMFCuboidDataSupplier, IEMFTextureSizeSupplier } from 'traben.entity_model_features.utils';
  import { Level } from 'net.minecraft.world.level';
  import { BlockEntityType } from 'net.minecraft.world.level.block.entity';
  import { BlockPos } from 'net.minecraft.core';
  import { BlockState } from 'net.minecraft.world.level.block.state';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Object2FloatOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { EntityType, Entity } from 'net.minecraft.world.entity';
  import { List, Map } from 'java.util';
  import { IEMFModel, IEMFModelNameContainer, EMFModel_ID } from 'traben.entity_model_features.models';
  import { EMFModelPartRoot } from 'traben.entity_model_features.models.parts';

  interface MixinBlockEntity extends EMFEntity {}
  class MixinBlockEntity extends EMFEntity {
    emf$age(): number;
    emf$getPitch(): number;
    emf$getTypeString(): string;
    emf$getVariableMap(): Object2FloatOpenHashMap<string>;
    emf$getVelocity(): Vec3;
    emf$getX(): number;
    emf$getY(): number;
    emf$getYaw(): number;
    emf$getZ(): number;
    emf$hasPassengers(): boolean;
    emf$hasVehicle(): boolean;
    emf$isAlive(): boolean;
    emf$isGlowing(): boolean;
    emf$isInLava(): boolean;
    emf$isInvisible(): boolean;
    emf$isOnFire(): boolean;
    emf$isOnGround(): boolean;
    emf$isSneaking(): boolean;
    emf$isSprinting(): boolean;
    emf$isTouchingWater(): boolean;
    emf$isWet(): boolean;
    emf$prevPitch(): number;
    emf$prevX(): number;
    emf$prevY(): number;
    emf$prevZ(): number;
    get blockPos(): BlockPos;
    get blockState(): BlockState;
    get level(): Level;
    get type(): BlockEntityType<any>;
  }


  class MixinBlockEntityRendererFactories {
  }


  class MixinCapeModels {
  }


  interface MixinEntity extends EMFEntity {}
  class MixinEntity extends EMFEntity {
    zo: number;
    yo: number;
    xo: number;
    xRotO: number;
    tickCount: number;
    xOld: number;
    yOld: number;
    zOld: number;
    emf$age(): number;
    emf$getPitch(): number;
    emf$getTypeString(): string;
    emf$getVariableMap(): Object2FloatOpenHashMap<string>;
    emf$getVelocity(): Vec3;
    emf$getX(): number;
    emf$getY(): number;
    emf$getYaw(): number;
    emf$getZ(): number;
    emf$hasPassengers(): boolean;
    emf$hasVehicle(): boolean;
    emf$isAlive(): boolean;
    emf$isGlowing(): boolean;
    emf$isInLava(): boolean;
    emf$isInvisible(): boolean;
    emf$isOnFire(): boolean;
    emf$isOnGround(): boolean;
    emf$isSneaking(): boolean;
    emf$isSprinting(): boolean;
    emf$isTouchingWater(): boolean;
    emf$isWet(): boolean;
    emf$prevPitch(): number;
    emf$prevX(): number;
    emf$prevY(): number;
    emf$prevZ(): number;
    equals(var1: any): boolean;
    get deltaMovement(): Vec3;
    get passengers(): Entity[];
    get type(): EntityType<any>;
    get x(): number;
    get y(): number;
    get z(): number;
    hasGlowingTag(): boolean;
    isAlive(): boolean;
    isCrouching(): boolean;
    isInLava(): boolean;
    isInWater(): boolean;
    isInWaterOrRain(): boolean;
    isInWaterRainOrBubble(): boolean;
    isInvisible(): boolean;
    isOnFire(): boolean;
    isPassenger(): boolean;
    isSprinting(): boolean;
    onGround(): boolean;
    position(): Vec3;
  }


  class MixinEntityModelLoader {
  }


  class MixinGameRenderer {
  }


  interface MixinModel extends IEMFModel {}
  class MixinModel extends IEMFModel {
    emf$getEMFRootModel(): EMFModelPartRoot;
    emf$isEMFModel(): boolean;
  }


  interface MixinModelPart$Cuboid extends IEMFCuboidDataSupplier {}
  class MixinModelPart$Cuboid extends IEMFCuboidDataSupplier {
    emf$getSizeAdd(): number[];
    emf$getTextureUV(): number[];
    emf$getTextureXY(): number[];
  }


  interface MixinModelPart extends IEMFModelNameContainer, IEMFTextureSizeSupplier {}
  class MixinModelPart extends IEMFModelNameContainer {
    children: Map;
    emf$getTextureSize(): number[];
    emf$insertKnownMappings(newName: EMFModel_ID): void;
    emf$setTextureSize(size: number[]): void;
  }


  class MixinModelPartData {
  }


  class MixinParrotEntityModel {
  }


  class MixinPlayerEntity {
  }


  class MixinResourceReloadEnd {
  }


  class MixinResourceReloadStart {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.optional' {
  import { EntityRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  interface MixinLivingEntityRenderer_ValueCapturing<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, EntityRenderer<T> {}
  class MixinLivingEntityRenderer_ValueCapturing<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.rendering.arrows' {
  import { IEMFCustomModelHolder } from 'traben.entity_model_features.utils';
  import { EMFModelPartRoot } from 'traben.entity_model_features.models.parts';
  import { EntityRenderer, ArrowRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';
  import { Context } from 'EntityRendererProvider';
  import { Arrow } from 'net.minecraft.world.entity.projectile';
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';

  interface MixinArrowRenderer extends IEMFCustomModelHolder {}
  class MixinArrowRenderer extends IEMFCustomModelHolder {
    emf$getModel(): EMFModelPartRoot;
    emf$setModel(model: EMFModelPartRoot): void;
  }


  interface MixinProjectileEntityRenderer<T extends AbstractArrow = any> extends EntityRenderer<T> {}
  class MixinProjectileEntityRenderer<T extends AbstractArrow = any> extends EntityRenderer<T> {
    constructor(context: Context);
  }


  interface MixinSpectralArrowRenderer extends IEMFCustomModelHolder, ArrowRenderer<Arrow> {}
  class MixinSpectralArrowRenderer extends IEMFCustomModelHolder {
    constructor(context: Context);
    emf$getModel(): EMFModelPartRoot;
    emf$setModel(model: EMFModelPartRoot): void;
  }


  interface MixinStuckArrowsFeatureRenderer<T extends LivingEntity = any, M extends PlayerModel<T> = any> extends RenderLayer<T, M> {}
  class MixinStuckArrowsFeatureRenderer<T extends LivingEntity = any, M extends PlayerModel<T> = any> extends RenderLayer<T, M> {
    constructor(renderer: RenderLayerParent<T, M>);
  }


  class Mixin_TridentRenderer_PassState {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.rendering.feature' {
  import { RenderLayer } from 'net.minecraft.client.renderer.entity.layers';
  import { Wolf } from 'net.minecraft.world.entity.animal';
  import { WolfModel } from 'net.minecraft.client.model';

  class MixinCreeperChargeFeatureRenderer {
  }


  class MixinEyesFeatureRenderer {
  }


  class MixinHeadFeatureRenderer {
  }


  class MixinHeldItemFeatureRenderer {
  }


  class MixinHumanoidArmorLayer {
  }


  class MixinSlimeOverlayFeatureRenderer {
  }


  interface MixinWolfCollarFeatureRenderer extends RenderLayer<Wolf, WolfModel> {}
  class MixinWolfCollarFeatureRenderer extends RenderLayer<Wolf, WolfModel> {
    constructor();
    get parentModel(): WolfModel<Wolf>;
  }

}

declare module 'traben.entity_model_features.mixin.mixins.rendering' {
  import { EntityRenderer, RenderLayerParent } from 'net.minecraft.client.renderer.entity';

  class MixinBannerRenderer {
  }


  class MixinBlockEntityRenderDispatcher {
  }


  class MixinBlockEntityWithoutLevelRenderer {
  }


  class MixinDragonRenderer {
  }


  class MixinEntityRenderDispatcher {
    distanceToSqr(var1: number, var3: number, var5: number): number;
  }


  class MixinEntityRenderers {
  }


  class MixinItemFrameEntityRenderer {
  }


  interface MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M>, EntityRenderer<T> {}
  class MixinLivingEntityRenderer<T extends LivingEntity = any, M extends EntityModel<T> = any> extends RenderLayerParent<T, M> {
  }


  class MixinPlayerEntityRenderer {
  }


  class Mixin_SpecialModelRenderers_SetCurrentSpecifiedModel {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.rendering.model' {
  import { IEMFWolfCollarHolder } from 'traben.entity_model_features.utils';
  import { WolfModel } from 'net.minecraft.client.model';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { Fireball } from 'net.minecraft.world.entity.projectile';

  class MixinArmadilloModel {
  }


  class MixinDragonModel {
  }


  class MixinVillagerModel {
  }


  interface MixinWolfEntityModel<T extends Wolf = any> extends IEMFWolfCollarHolder<T> {}
  class MixinWolfEntityModel<T extends Wolf = any> extends IEMFWolfCollarHolder<T> {
    emf$getCollarModel(): WolfModel<T>;
    emf$setCollarModel(model: WolfModel<T>): void;
  }


  class Mixin_ChickenRenderer_WarmModel {
  }


  class Mixin_EnderDragonFireball_Model {
    renderToBuffer(poseStack: PoseStack, vertexConsumer: VertexConsumer, i: number, j: number, k: number): void;
    setupAnim(entity: Fireball, f: number, g: number, h: number, i: number, j: number): void;
  }


  class Mixin_PigRenderer_WarmModel {
  }

}

declare module 'traben.entity_model_features.mixin.mixins.rendering.submits' {
  class Mixin_ChestSpecialRenderer_PassState {
  }


  class Mixin_GuiEntityRenderer {
  }


  class Mixin_ModelPartRenderer {
  }


  class Mixin_ModelRenderer {
  }


  class Mixin_ModelSubmit_AddBackupState {
  }

}

declare module 'traben.entity_model_features.mixin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

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

declare module 'traben.entity_model_features.models.animation' {
  import { Object2ObjectLinkedOpenHashMap, Object2ObjectOpenHashMap, ObjectSet } from 'it.unimi.dsi.fastutil.objects';
  import { EMFModelPart } from 'traben.entity_model_features.models.parts';
  import { EMFModelOrRenderVariable } from 'traben.entity_model_features.models.animation.math.variables';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { List } from 'java.util';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { EMFEntityRenderState } from 'traben.entity_model_features.models.animation.state';
  import { EMFEntity } from 'traben.entity_model_features.utils';
  import { IterationContext } from 'traben.entity_model_features.models.animation.EMFAnimationEntityContext';
  import { Pose } from 'PoseStack';
  import { PoseStack } from 'com.mojang.blaze3d.vertex';

  class EMFAnimation {
    readonly animKey: string;
    readonly expressionString: string;
    readonly modelName: string;
    temp_emfAnimationVariables: Object2ObjectLinkedOpenHashMap;
    temp_allPartsBySingleAndFullHeirachicalId: Object2ObjectOpenHashMap;
    constructor(partToApplyTo: EMFModelPart, modelOrRenderVariableToChange: EMFModelOrRenderVariable, animKey: string, initialExpression: string, modelName: string);
    calculateAndSet(): void;
    calculateAndSetIfNotPaused(paused: ModelPart[]): void;
    get lastResultOnly(): number;
    get resultViaCalculate(): number;
    initExpression(emfAnimationVariables: Object2ObjectLinkedOpenHashMap<string, EMFAnimation>, allPartByName: Object2ObjectOpenHashMap<string, EMFModelPart>): void;
    isValid(): boolean;
    isVar(): boolean;
    toString(): string;
  }


  class EMFAnimationEntityContext {
    static setInHand: boolean;
    static isFirstPersonHand: boolean;
    static setInItemFrame: boolean;
    static setIsOnHead: boolean;
    static setIsInGui: boolean;
    static lastFOV: number;
    static is_in_ground_override: boolean;
    static entitiesToForceVanillaModel: ObjectSet;
    static entitiesPausedParts: Object2ObjectOpenHashMap;
    static entitiesPaused: ObjectSet;
    static pauseListeners: List;
    static forceVanillaModelListeners: List;
    static anounceModels(assertEntity: EMFEntityRenderState): void;
    static doAnnounceModels(): boolean;
    static get age(): number;
    static get angerTime(): number;
    static get angerTimeStart(): number;
    static get dayCount(): number;
    static get dayTime(): number;
    static get deathTime(): number;
    static get dimension(): number;
    static get eMFEntity(): EMFEntity;
    static get emfState(): EMFEntityRenderState;
    static get entityPartsAnimPaused(): ModelPart[];
    static get entityRX(): number;
    static get entityRY(): number;
    static get entityX(): number;
    static get entityY(): number;
    static get entityZ(): number;
    static get fluidDepth(): number;
    static get fluidDepthDown(): number;
    static get fluidDepthUp(): number;
    static get frameCounter(): number;
    static get frameTime(): number;
    static get headPitch(): number;
    static get headYaw(): number;
    static get health(): number;
    static get heightAboveGround(): number;
    static get hurtTime(): number;
    static get id(): number;
    static get iterationContext(): IterationContext;
    static get leashX(): number;
    static get leashY(): number;
    static get leashZ(): number;
    static get limbAngle(): number;
    static get limbDistance(): number;
    static get maxHealth(): number;
    static get moveForward(): number;
    static get moveStrafe(): number;
    static get playerRX(): number;
    static get playerRY(): number;
    static get playerX(): number;
    static get playerY(): number;
    static get playerZ(): number;
    static get ruleIndex(): number;
    static get shadowOpacity(): number;
    static get shadowSize(): number;
    static get shadowX(): number;
    static get shadowZ(): number;
    static get swingProgress(): number;
    static get tickDelta(): number;
    static get time(): number;
    static getEntityVariable(variable: string, defaultValue: number): number;
    static getLayerFromRecentFactoryOrETFOverrideOrTranslucent(identifier: ResourceLocation): RenderType;
    static globalReset(): void;
    static incFrameCount(): void;
    static isAggressive(): boolean;
    static isAlive(): boolean;
    static isBurning(): boolean;
    static isChild(): boolean;
    static isClientHovered(): boolean;
    static isClimbing(): boolean;
    static isEntityAnimPaused(): boolean;
    static isEntityAnimPausedWrapped(): boolean;
    static isEntityForcedToVanillaModel(): boolean;
    static isGlowing(): boolean;
    static isHoldingItem(right: boolean): boolean;
    static isHurt(): boolean;
    static isInGround(): boolean;
    static isInGui(): boolean;
    static isInHand(): boolean;
    static isInItemFrame(): boolean;
    static isInLava(): boolean;
    static isInWater(): boolean;
    static isInvisible(): boolean;
    static isJumping(): boolean;
    static isLODSkippingThisFrame(): boolean;
    static isOnGround(): boolean;
    static isOnHead(): boolean;
    static isOnShoulder(): boolean;
    static isRidden(): boolean;
    static isRiding(): boolean;
    static isSitting(): boolean;
    static isSneaking(): boolean;
    static isSprinting(): boolean;
    static isSwingingArm(right: boolean): boolean;
    static isTamed(): boolean;
    static isUsingItem(): boolean;
    static isWet(): boolean;
    static reset(): void;
    static set headPitch(headPitch: number);
    static set headYaw(headYaw: number);
    static set iterationContext(context: IterationContext);
    static set leashX(leashX: number);
    static set leashY(leashY: number);
    static set leashZ(leashZ: number);
    static set limbAngle(limbAngle: number);
    static set limbDistance(limbDistance: number);
    static set shadowOpacity(shadowOpacity: number);
    static set shadowSize(shadowSize: number);
    static set shadowX(shadowX: number);
    static set shadowZ(shadowZ: number);
    static setCurrentEntityIteration(state: EMFEntityRenderState): void;
    static setCurrentEntityNoIteration(state: EMFEntityRenderState): void;
    static setCurrentEntityOnShoulder(onShoulder: boolean): void;
    static setEntityVariable(variable: string, value: number): void;
    static setLayerFactory(layerFactory: Function<ResourceLocation, RenderType>): void;
  }


  class EMFAttachments {
    pose: Pose;
    readonly right: boolean;
    constructor(x: number, y: number, z: number, right: boolean);
    setAttachment(entry: PoseStack): void;
  }

}

declare module 'traben.entity_model_features.models.animation.math' {
  import { EMFException } from 'traben.entity_model_features';
  import { ResultSupplier } from 'traben.entity_model_features.models.animation.math.MathValue';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { BooleanSupplier } from 'java.util.function';

  interface EMFMathException extends EMFException {}
  class EMFMathException extends EMFException {
    constructor(s: string);
  }


  interface MathBinaryExpressionComponent extends MathComponent, MathValue {}
  class MathBinaryExpressionComponent extends MathComponent {
    get result(): number;
    static getOptimizedExpression(first: MathComponent, action: MathOperator, second: MathComponent): MathComponent;
    toString(): string;
  }


  class MathComponent {
    get result(): number;
    isConstant(): boolean;
  }


  interface MathConstant extends MathComponent, MathValue {}
  class MathConstant extends MathComponent {
    static readonly ZERO_CONST: MathConstant;
    static readonly FALSE_CONST: MathConstant;
    constructor(number: number, isNegative: boolean);

    constructor(number: number);
    get result(): number;
    get resultSupplier(): ResultSupplier;
    isConstant(): boolean;
    makeNegative(): MathValue;
    toString(): string;
  }


  class MathExpressionParser {
    static readonly NULL_EXPRESSION: MathComponent;
    static getOptimizedExpression(expressionString: string, isNegative: boolean, calculationInstance: EMFAnimation): MathComponent;
    toString(): string;
  }


  interface MathMethod extends MathComponent, MathValue {}
  class MathMethod extends MathComponent {
  }


  interface MathOperator extends Enum<MathOperator> {}
  class MathOperator extends Enum<MathOperator> {
    static readonly ADD: MathOperator;
    static readonly SUBTRACT: MathOperator;
    static readonly MULTIPLY: MathOperator;
    static readonly DIVIDE: MathOperator;
    static readonly DIVISION_REMAINDER: MathOperator;
    static readonly COMMA: MathOperator;
    static readonly OPEN_BRACKET: MathOperator;
    static readonly CLOSED_BRACKET: MathOperator;
    static readonly NONE: MathOperator;
    static readonly AND: MathOperator;
    static readonly OR: MathOperator;
    static readonly LARGER_THAN: MathOperator;
    static readonly SMALLER_THAN: MathOperator;
    static readonly LARGER_THAN_OR_EQUALS: MathOperator;
    static readonly SMALLER_THAN_OR_EQUALS: MathOperator;
    static readonly EQUALS: MathOperator;
    static readonly NOT_EQUALS: MathOperator;
    static readonly BOOLEAN_CHAR: MathOperator;
    execute(first: MathComponent, second: MathComponent): number;
    get result(): number;
    static getAction(ch: string): MathOperator;
    isConstant(): boolean;
    static valueOf(name: string): MathOperator;
    static values(): MathOperator[];
  }


  interface MathValue extends MathComponent {}
  class MathValue extends MathComponent {
    static readonly TRUE: number;
    static readonly FALSE: number;
    static fromBoolean(value: boolean): number;
    static fromBoolean(value: BooleanSupplier): number;
    get result(): number;
    static invertBoolean(value: boolean): number;
    static invertBoolean(value: number): number;
    static invertBoolean(value: ResultSupplier): number;
    static invertBoolean(value: BooleanSupplier): number;
    static isBoolean(value: number): boolean;
    makeNegative(): MathValue;
    static toBoolean(value: number): boolean;
    static validateBoolean(value: number): number;
  }


  interface MathVariable extends MathComponent, MathValue {}
  class MathVariable extends MathComponent {
    constructor(variableName: string, isNegative: boolean, supplier: ResultSupplier);

    constructor(variableName: string, supplier: ResultSupplier);
    toString(): string;
  }

}

declare module 'traben.entity_model_features.models.animation.math.MathValue' {
  class ResultSupplier {
    get (): number;
  }

}

declare module 'traben.entity_model_features.models.animation.math.methods.emf' {
  import { MathMethod } from 'traben.entity_model_features.models.animation.math';
  import { List } from 'java.util';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';
  import { IfMethod, RandomMethod } from 'traben.entity_model_features.models.animation.math.methods.optifine';

  interface CatchMethod extends MathMethod {}
  class CatchMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface IfBMethod extends IfMethod {}
  class IfBMethod extends IfMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface KeyframeloopMethod extends MathMethod {}
  class KeyframeloopMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface KeyframeMethod extends MathMethod {}
  class KeyframeMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface NBTMethod extends MathMethod {}
  class NBTMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface RandomBMethod extends RandomMethod {}
  class RandomBMethod extends RandomMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }

}

declare module 'traben.entity_model_features.models.animation.math.methods' {
  import { Map, List } from 'java.util';
  import { Function, BiFunction } from 'java.util.function';
  import { Float } from 'java.lang';
  import { TriFunction } from 'org.apache.commons.lang3.function';
  import { MethodFactory } from 'traben.entity_model_features.models.animation.math.methods.MethodRegistry';

  class MethodRegistry {
    containsMethod(methodName: string): boolean;
    static get instance(): MethodRegistry;
    get methodExplanationTranslationKeys(): Map<string, string>;
    getMethodFactory(methodName: string): MethodFactory;
    registerAndWrapMethodFactory(methodName: string, explanationTranslationKey: string, factory: MethodFactory): void;
    registerSimpleMethodFactory(methodName: string, explanationTranslationKey: string, functionParameter: Function<number, number>): void;
    registerSimpleMethodFactory(methodName: string, explanationTranslationKey: string, functionParameter: BiFunction<number, number, number>): void;
    registerSimpleMethodFactory(methodName: string, explanationTranslationKey: string, functionParameter: TriFunction<number, number, number, number>): void;
    registerSimpleMultiMethodFactory(methodName: string, explanationTranslationKey: string, functionParameter: Function<number[], number>): void;
  }

}

declare module 'traben.entity_model_features.models.animation.math.methods.MethodRegistry' {
  import { MathMethod } from 'traben.entity_model_features.models.animation.math';
  import { List } from 'java.util';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';

  class MethodFactory {
    getMethod(var1: string[], var2: boolean, var3: EMFAnimation): MathMethod;
  }

}

declare module 'traben.entity_model_features.models.animation.math.methods.optifine' {
  import { MathMethod } from 'traben.entity_model_features.models.animation.math';
  import { List } from 'java.util';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';

  interface IfMethod extends MathMethod {}
  class IfMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface InMethod extends MathMethod {}
  class InMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface MaxMethod extends MathMethod {}
  class MaxMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface MinMethod extends MathMethod {}
  class MinMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface PrintBMethod extends MathMethod {}
  class PrintBMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface PrintMethod extends MathMethod {}
  class PrintMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
  }


  interface RandomMethod extends MathMethod {}
  class RandomMethod extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation);
    static optifineIntHash(x: number): number;
  }

}

declare module 'traben.entity_model_features.models.animation.math.methods.simple' {
  import { MathMethod } from 'traben.entity_model_features.models.animation.math';
  import { MethodFactory } from 'traben.entity_model_features.models.animation.math.methods.MethodRegistry';
  import { BiFunction, Function } from 'java.util.function';
  import { Float } from 'java.lang';
  import { List } from 'java.util';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';
  import { TriFunction } from 'org.apache.commons.lang3.function';

  interface BiFunctionMethods extends MathMethod {}
  class BiFunctionMethods extends MathMethod {
    static makeFactory(methodName: string, functionParameter: BiFunction<number, number, number>): MethodFactory;
  }


  interface FunctionMethods extends MathMethod {}
  class FunctionMethods extends MathMethod {
    static makeFactory(methodName: string, functionParameter: Function<number, number>): MethodFactory;
  }


  interface MultiFunctionMethods extends MathMethod {}
  class MultiFunctionMethods extends MathMethod {
    constructor(args: string[], isNegative: boolean, calculationInstance: EMFAnimation, functionParameter: Function<number[], number>);
    static cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number;
    static hermiteInterpolation(t: number, p0: number, p1: number, m0: number, m1: number): number;
    static makeFactory(methodName: string, functionParameter: Function<number[], number>): MethodFactory;
    static quadraticBezier(t: number, p0: number, p1: number, p2: number): number;
  }


  interface TriFunctionMethods extends MathMethod {}
  class TriFunctionMethods extends MathMethod {
    static easeInBack(t: number, start: number, end: number): number;
    static easeInBounce(t: number, start: number, end: number): number;
    static easeInCirc(t: number, start: number, end: number): number;
    static easeInCubic(t: number, start: number, end: number): number;
    static easeInElastic(t: number, start: number, end: number): number;
    static easeInExpo(t: number, start: number, end: number): number;
    static easeInOutBack(t: number, start: number, end: number): number;
    static easeInOutBounce(t: number, start: number, end: number): number;
    static easeInOutCirc(t: number, start: number, end: number): number;
    static easeInOutCubic(t: number, start: number, end: number): number;
    static easeInOutElastic(t: number, start: number, end: number): number;
    static easeInOutExpo(t: number, start: number, end: number): number;
    static easeInOutQuad(t: number, start: number, end: number): number;
    static easeInOutQuart(t: number, start: number, end: number): number;
    static easeInOutQuint(t: number, start: number, end: number): number;
    static easeInOutSine(t: number, start: number, end: number): number;
    static easeInQuad(t: number, start: number, end: number): number;
    static easeInQuart(t: number, start: number, end: number): number;
    static easeInQuint(t: number, start: number, end: number): number;
    static easeInSine(t: number, start: number, end: number): number;
    static easeOutBack(t: number, start: number, end: number): number;
    static easeOutBounce(t: number, start: number, end: number): number;
    static easeOutCirc(t: number, start: number, end: number): number;
    static easeOutCubic(t: number, start: number, end: number): number;
    static easeOutElastic(t: number, start: number, end: number): number;
    static easeOutExpo(t: number, start: number, end: number): number;
    static easeOutQuad(t: number, start: number, end: number): number;
    static easeOutQuart(t: number, start: number, end: number): number;
    static easeOutQuint(t: number, start: number, end: number): number;
    static easeOutSine(t: number, start: number, end: number): number;
    static makeFactory(methodName: string, functionParameter: TriFunction<number, number, number, number>): MethodFactory;
  }

}

declare module 'traben.entity_model_features.models.animation.math.variables' {
  import { Enum } from 'java.lang';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { EMFModelPart } from 'traben.entity_model_features.models.parts';
  import { List, Map } from 'java.util';
  import { UniqueVariableFactory } from 'traben.entity_model_features.models.animation.math.variables.factories';
  import { ResultSupplier } from 'traben.entity_model_features.models.animation.math.MathValue';
  import { BooleanSupplier } from 'java.util.function';
  import { MathComponent } from 'traben.entity_model_features.models.animation.math';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';

  interface EMFModelOrRenderVariable extends Enum<EMFModelOrRenderVariable> {}
  class EMFModelOrRenderVariable extends Enum<EMFModelOrRenderVariable> {
    static readonly TX: EMFModelOrRenderVariable;
    static readonly TY: EMFModelOrRenderVariable;
    static readonly TZ: EMFModelOrRenderVariable;
    static readonly RX: EMFModelOrRenderVariable;
    static readonly RY: EMFModelOrRenderVariable;
    static readonly RZ: EMFModelOrRenderVariable;
    static readonly SX: EMFModelOrRenderVariable;
    static readonly SY: EMFModelOrRenderVariable;
    static readonly SZ: EMFModelOrRenderVariable;
    static readonly VISIBLE: EMFModelOrRenderVariable;
    static readonly VISIBLE_BOXES: EMFModelOrRenderVariable;
    static readonly RENDER_shadow_size: EMFModelOrRenderVariable;
    static readonly RENDER_SHADOW_OPACITY: EMFModelOrRenderVariable;
    static readonly RENDER_SHADOW_X: EMFModelOrRenderVariable;
    static readonly RENDER_SHADOW_Z: EMFModelOrRenderVariable;
    static readonly RENDER_LEASH_X: EMFModelOrRenderVariable;
    static readonly RENDER_LEASH_Y: EMFModelOrRenderVariable;
    static readonly RENDER_LEASH_Z: EMFModelOrRenderVariable;
    static get(id: string): EMFModelOrRenderVariable;
    get value(): number;
    static getRenderVariable(id: string): EMFModelOrRenderVariable;
    getValue(var1: ModelPart): number;
    isBoolean(): boolean;
    isRenderVariable(): boolean;
    setValue(var1: EMFModelPart, var2: number): void;
    static valueOf(name: string): EMFModelOrRenderVariable;
    static values(): EMFModelOrRenderVariable[];
  }


  class VariableRegistry {
    static get instance(): VariableRegistry;
    get singletonVariableExplanationTranslationKeys(): Map<string, string>;
    get uniqueVariableFactories(): UniqueVariableFactory[];
    getVariable(variableName: string, isNegative: boolean, calculationInstance: EMFAnimation): MathComponent;
    registerContextVariable(factory: UniqueVariableFactory): void;
    registerSimpleBoolVariable(variableName: string, explanationTranslationKey: string, boolGetter: BooleanSupplier): void;
    registerSimpleFloatVariable(variableName: string, explanationTranslationKey: string, supplier: ResultSupplier): void;
  }

}

declare module 'traben.entity_model_features.models.animation.math.variables.factories' {
  import { ResultSupplier } from 'traben.entity_model_features.models.animation.math.MathValue';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';

  interface GlobalVariableFactory extends UniqueVariableFactory {}
  class GlobalVariableFactory extends UniqueVariableFactory {
    createsThisVariable(variableKey: string): boolean;
    get explanationTranslationKey(): string;
    get titleTranslationKey(): string;
    static getGlobalVariable(key: string): number;
    getSupplierOrNull(variableKey: string, calculationInstance: EMFAnimation): ResultSupplier;
    static setGlobalVariable(key: string, value: number): void;
  }


  interface ModelPartVariableFactory extends UniqueVariableFactory {}
  class ModelPartVariableFactory extends UniqueVariableFactory {
    createsThisVariable(variableKey: string): boolean;
    get explanationTranslationKey(): string;
    get titleTranslationKey(): string;
    getSupplierOrNull(variableKey: string, calculationInstance: EMFAnimation): ResultSupplier;
  }


  interface ModelVariableFactory extends UniqueVariableFactory {}
  class ModelVariableFactory extends UniqueVariableFactory {
    createsThisVariable(variableKey: string): boolean;
    get explanationTranslationKey(): string;
    get titleTranslationKey(): string;
    getSupplierOrNull(variableKey: string, calculationInstance: EMFAnimation): ResultSupplier;
  }


  interface RenderVariableFactory extends UniqueVariableFactory {}
  class RenderVariableFactory extends UniqueVariableFactory {
    createsThisVariable(variableKey: string): boolean;
    get explanationTranslationKey(): string;
    get titleTranslationKey(): string;
    getSupplierOrNull(variableKey: string, calculationInstance: EMFAnimation): ResultSupplier;
  }


  class UniqueVariableFactory {
    createsThisVariable(var1: string): boolean;
    equals(obj: any): boolean;
    get explanationTranslationKey(): string;
    get titleTranslationKey(): string;
    getSupplierOrNull(var1: string, var2: EMFAnimation): ResultSupplier;
  }

}

declare module 'traben.entity_model_features.models.animation.state' {
  import { ETFEntityRenderState, ETFEntityRenderStateViaReference } from 'traben.entity_texture_features.features.state';
  import { EMFEntity } from 'traben.entity_model_features.utils';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Object2FloatOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { Function } from 'java.util.function';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { RenderType } from 'net.minecraft.client.renderer';
  import { EMFAttachments } from 'traben.entity_model_features.models.animation';

  interface EMFEntityRenderState extends ETFEntityRenderState {}
  class EMFEntityRenderState extends ETFEntityRenderState {
    age(): number;
    emfEntity(): EMFEntity;
    emfVelocity(): Vec3;
    hasPassengers(): boolean;
    hasVehicle(): boolean;
    isAlive(): boolean;
    isGlowing(): boolean;
    isInLava(): boolean;
    isInvisible(): boolean;
    isOnFire(): boolean;
    isOnGround(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    isTouchingWater(): boolean;
    isWet(): boolean;
    layerFactory(): Function<ResourceLocation, RenderType>;
    leftArmOverride(): EMFAttachments;
    pitch(): number;
    prevPitch(): number;
    prevX(): number;
    prevY(): number;
    prevZ(): number;
    rightArmOverride(): EMFAttachments;
    setLayerFactory(var1: Function<ResourceLocation, RenderType>): void;
    setLeftArmOverride(var1: EMFAttachments): void;
    setRightArmOverride(var1: EMFAttachments): void;
    typeString(): string;
    variableMap(): Object2FloatOpenHashMap<string>;
    x(): number;
    y(): number;
    yaw(): number;
    z(): number;
  }


  interface EMFEntityRenderStateViaReference extends EMFEntityRenderState, ETFEntityRenderStateViaReference {}
  class EMFEntityRenderStateViaReference extends EMFEntityRenderState {
    constructor(emfEntity: EMFEntity);
    age(): number;
    emfEntity(): EMFEntity;
    emfVelocity(): Vec3;
    hasPassengers(): boolean;
    hasVehicle(): boolean;
    isAlive(): boolean;
    isGlowing(): boolean;
    isInLava(): boolean;
    isInvisible(): boolean;
    isOnFire(): boolean;
    isOnGround(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    isTouchingWater(): boolean;
    isWet(): boolean;
    layerFactory(): Function<ResourceLocation, RenderType>;
    leftArmOverride(): EMFAttachments;
    pitch(): number;
    prevPitch(): number;
    prevX(): number;
    prevY(): number;
    prevZ(): number;
    rightArmOverride(): EMFAttachments;
    setLayerFactory(layerFactory: Function<ResourceLocation, RenderType>): void;
    setLeftArmOverride(override: EMFAttachments): void;
    setRightArmOverride(override: EMFAttachments): void;
    typeString(): string;
    variableMap(): Object2FloatOpenHashMap<string>;
    x(): number;
    y(): number;
    yaw(): number;
    z(): number;
  }

}

declare module 'traben.entity_model_features.models' {
  import { Map } from 'java.util';
  import { Entry } from 'Map';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { Comparable } from 'java.lang';
  import { Consumer } from 'java.util.function';
  import { EMFModelPartRoot } from 'traben.entity_model_features.models.parts';

  class EMFModelMappings {
    static readonly UNKNOWN_MODEL_MAP_CACHE: Map;
    static readonly OPTIFINE_MODEL_MAP_CACHE: Map;
    static readonly genericNonPlayerBiped: Map;
    static exploreProvidedEntityModelAndExportIfNeeded(originalModel: ModelPart, mobId: EMFModel_ID, mobMap: Map<string, string>, exportOnlyFirstTime: boolean): Map<string, string>;
    static getMapOf(mobId: EMFModel_ID, root: ModelPart): Map<string, string>;
    static getMapOf(mobId: EMFModel_ID, root: ModelPart, exportOnlyFirstTime: boolean): Map<string, string>;
    static partMapping(optifineName: string): Entry<string, string>;
    static partMapping(optifineName: string, vanillaName: string): Entry<string, string>;
  }


  interface EMFModel_ID extends Comparable<EMFModel_ID> {}
  class EMFModel_ID extends Comparable<EMFModel_ID> {
    namespace: string;
    constructor(both: string);

    constructor(both: string, mapId: string);
    addFallbackModel(namespace: string, fileName: string): EMFModel_ID;
    addFallbackModel(namespace: string, fileName: string, first: boolean): EMFModel_ID;
    addFallbackModel(fileName: string): EMFModel_ID;
    areBothSame(): boolean;
    compareTo(o: EMFModel_ID): number;
    equals(o: any): boolean;
    finishAndPrepAutomatedFallbacks(): void;
    forEachFallback(action: Consumer<EMFModel_ID>): void;
    get displayFileName(): string;
    get fileName(): string;
    get mapId(): string;
    get namespace(): string;
    get nextFallbackModel(): EMFModel_ID;
    hasFallbackModels(): boolean;
    hashCode(): number;
    pushNewMainModelAddingOldAsFallback(fileName: string): EMFModel_ID;
    pushNewMainModelAndMapIdAddingOldAsFallback(both: string): EMFModel_ID;
    pushNewMainModelAndMapIdAddingOldAsFallback(fileName: string, mapId: string): EMFModel_ID;
    setBoth(both: string): EMFModel_ID;
    setBoth(fileName: string, mapId: string): EMFModel_ID;
    setFileName(fileName: string): EMFModel_ID;
    setMapIdAndAddFallbackModel(both: string): EMFModel_ID;
    setMapIdAndAddFallbackModel(mapId: string, fileName: string): EMFModel_ID;
    toString(): string;
  }


  class EMFPartialArmor {
    hasCustom(): boolean;
  }


  class IEMFModel {
    emf$getEMFRootModel(): EMFModelPartRoot;
    emf$isEMFModel(): boolean;
  }


  class IEMFModelNameContainer {
    emf$insertKnownMappings(var1: EMFModel_ID): void;
  }

}

declare module 'traben.entity_model_features.models.jem_objects' {
  import { LinkedList, LinkedHashMap, List } from 'java.util';
  import { EMFDirectoryHandler } from 'traben.entity_model_features.utils';
  import { EMFModel_ID } from 'traben.entity_model_features.models';
  import { ResourceLocation } from 'net.minecraft.resources';

  class EMFBoxData {
    textureOffset: number[];
    uvDown: number[];
    uvUp: number[];
    uvFront: number[];
    uvBack: number[];
    uvLeft: number[];
    uvRight: number[];
    uvNorth: number[];
    uvSouth: number[];
    uvWest: number[];
    uvEast: number[];
    coordinates: number[];
    sizeAdd: number;
    sizeAddX: number;
    sizeAddY: number;
    sizeAddZ: number;
    sizesAdd: number[];
    checkAndFixUVLegacyDirections(): void;
    prepare(invertX: boolean, invertY: boolean, invertZ: boolean): void;
    toString(): string;
  }


  class EMFJemData {
    texture: string;
    textureSize: number[];
    shadow_size: number;
    models: LinkedList;
    directoryContext: EMFDirectoryHandler;
    hasAttachments: boolean;
    get allTopLevelAnimationsByVanillaPartName(): LinkedHashMap<string, LinkedHashMap<string, string>[]>;
    get customTexture(): ResourceLocation;
    get mobModelIDInfo(): EMFModel_ID;
    prepare(directoryContext: EMFDirectoryHandler, mobModelIDInfo: EMFModel_ID): void;
    toString(): string;
    validateJemTexture(textureIn: string): ResourceLocation;
    validateJemTexture(textureIn: string, canRemoveRedundancy: boolean): ResourceLocation;
    validateResourcePathAndExists(pathIn: string, fileTypeExtension: string): ResourceLocation;
  }

}

declare module 'traben.entity_model_features.models.parts' {
  import { EMFPartData, EMFJemData } from 'traben.entity_model_features.models.jem_objects';
  import { PoseStack, VertexConsumer } from 'com.mojang.blaze3d.vertex';
  import { EMFModel_ID } from 'traben.entity_model_features.models';
  import { ModelPart } from 'net.minecraft.client.model.geom';
  import { EntityIntLRU } from 'traben.entity_texture_features.utils';
  import { EMFDirectoryHandler } from 'traben.entity_model_features.utils';
  import { ETFVariantSuffixProvider } from 'ETFApi';
  import { Collection, Map, UUID, List } from 'java.util';
  import { EMFAnimation } from 'traben.entity_model_features.models.animation';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Runnable } from 'java.lang';
  import { Int2ObjectOpenHashMap } from 'it.unimi.dsi.fastutil.ints';
  import { Cube } from 'ModelPart';

  interface EMFModelPartCustom extends EMFModelPart {}
  class EMFModelPartCustom extends EMFModelPart {
    readonly partToBeAttached: string;
    readonly id: string;
    readonly attach: boolean;
    constructor(emfPartData: EMFPartData, variant: number, part: string, id: string);
    processArmItemOverrides(matrices: PoseStack): void;
    render(matrices: PoseStack, vertices: VertexConsumer, light: number, overlay: number, k: number): void;
    resetPose(): void;
    toString(): string;
    toStringShort(): string;
  }


  interface EMFModelPartRoot extends EMFModelPartVanilla {}
  class EMFModelPartRoot extends EMFModelPartVanilla {
    readonly modelName: EMFModel_ID;
    readonly vanillaRoot: ModelPart;
    readonly entitySuffixMap: EntityIntLRU;
    directoryContext: EMFDirectoryHandler;
    variantTester: ETFVariantSuffixProvider;
    containsCustomModel: boolean;
    containsCustomAnims: boolean;
    constructor(mobNameForFileAndMap: EMFModel_ID, directoryContext: EMFDirectoryHandler, vanillaRoot: ModelPart, optifinePartNames: Collection<string>, mapForCreatedParts: Map<string, EMFModelPartVanilla>);
    addVariantOfJem(jemData: EMFJemData, variant: number): void;
    checkIfShouldExpireEntity(id: UUID): void;
    discoverAndInitVariants(fallbackPropertiesName: string): void;
    doVariantCheck(): void;
    get allVanillaPartsEMF(): Collection<EMFModelPartVanilla>;
    get topLevelJemTexture(): ResourceLocation;
    get vanillaFormatRoot(): ModelPart;
    hasAnimation(): boolean;
    receiveAnimations(variant: number, animationList: Collection<EMFAnimation>): void;
    resetVanillaPartsToDefaults(): void;
    setVariant1ToVanilla0(): void;
    toString(): string;
    toStringShort(): string;
    triggerManualAnimation(pose: PoseStack): void;
    tryRenderVanillaRootNormally(matrixStack: PoseStack, vertexConsumer: VertexConsumer, light: number, overlay: number): void;
  }


  interface EMFModelPartVanilla extends EMFModelPartWithState {}
  class EMFModelPartVanilla extends EMFModelPartWithState {
    constructor(name: string, vanillaPart: ModelPart, optifinePartNames: Collection<string>, allVanillaParts: Map<string, EMFModelPartVanilla>);
    get allEMFCustomChildren(): ModelPart[];
    receiveRootAnimationRunnable(variant: number, run: Runnable): void;
    render(matrices: PoseStack, vertices: VertexConsumer, light: number, overlay: number, k: number): void;
    setHideInTheseStates(variant: number): void;
    toString(): string;
    toStringShort(): string;
  }


  interface EMFModelPartWithState extends EMFModelPart {}
  class EMFModelPartWithState extends EMFModelPart {
    readonly allKnownStateVariants: Int2ObjectOpenHashMap;
    currentModelVariant: number;
    constructor(cuboids: Cube[], children: Map<string, ModelPart>);
    copyVariantTo(from: number, to: number): void;
    render(matrices: PoseStack, vertices: VertexConsumer, light: number, overlay: number, k: number): void;
    setVariantStateTo(newVariant: number): void;
  }

}

declare module 'traben.entity_model_features.models.parts.EMFModelPartCustom' {
  import { Cube } from 'ModelPart';
  import { Pose } from 'PoseStack';
  import { VertexConsumer } from 'com.mojang.blaze3d.vertex';

  interface EMFCube extends Cube {}
  class EMFCube extends Cube {
    compile(pose: Pose, vertexConsumer: VertexConsumer, i: number, j: number, k: number): void;
  }

}

declare module 'traben.entity_model_features.mod_compat' {
  import { BiConsumer, Consumer } from 'java.util.function';
  import { Properties, Map, Set } from 'java.util';
  import { Runnable } from 'java.lang';
  import { Component } from 'net.minecraft.network.chat';
  import { EMFEntity } from 'traben.entity_model_features.utils';

  interface EBEConfigModifier extends BiConsumer<Properties, Map>, Consumer<Runnable> {}
  class EBEConfigModifier extends BiConsumer<Properties, Map> {
    static chestsDisabled: boolean;
    static shulkerBoxesDisabled: boolean;
    static bellsDisabled: boolean;
    static bedsDisabled: boolean;
    static signsDisabled: boolean;
    static decoratedPotsDisabled: boolean;
    accept(overrideConfigValues: Properties, overrideReasons: Map<string, Component>): void;
    accept(ebeConfigReloader: Runnable): void;
    static modifyEBEConfig(ebeAffectingJemsFound: Set<string>): void;
  }


  class IrisShadowPassDetection {
    static get instance(): IrisShadowPassDetection;
    inShadowPass(): boolean;
    inShadowPass(): boolean;
  }


  class PALCompat {
    static shouldPauseEntityAnim(entity: EMFEntity): boolean;
  }

}

declare module 'traben.entity_model_features.propeties' {
  import { RandomProperty } from 'traben.entity_texture_features.features.property_reading.properties';
  import { Properties } from 'java.util';
  import { SimpleIntegerArrayProperty } from 'traben.entity_texture_features.features.property_reading.properties.generic_properties';

  interface EntityVariableBooleanProperty extends RandomProperty {}
  class EntityVariableBooleanProperty extends RandomProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): EntityVariableBooleanProperty;
  }


  interface EntityVariableFloatProperty extends RandomProperty {}
  class EntityVariableFloatProperty extends RandomProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): EntityVariableFloatProperty;
  }


  interface GlobalVariableBooleanProperty extends RandomProperty {}
  class GlobalVariableBooleanProperty extends RandomProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): GlobalVariableBooleanProperty;
  }


  interface GlobalVariableFloatProperty extends RandomProperty {}
  class GlobalVariableFloatProperty extends RandomProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): GlobalVariableFloatProperty;
  }


  interface ModelRuleIndexProperty extends SimpleIntegerArrayProperty {}
  class ModelRuleIndexProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ModelRuleIndexProperty;
  }


  interface ModelSuffixProperty extends SimpleIntegerArrayProperty {}
  class ModelSuffixProperty extends SimpleIntegerArrayProperty {
    get propertyIds(): string[];
    static getPropertyOrNull(properties: Properties, propertyNum: number): ModelSuffixProperty;
  }

}

declare module 'traben.entity_model_features.utils' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { ETFEntity } from 'traben.entity_texture_features.utils';
  import { Vec3 } from 'net.minecraft.world.phys';
  import { Object2FloatOpenHashMap } from 'it.unimi.dsi.fastutil.objects';
  import { EMFModelPartRoot } from 'traben.entity_model_features.models.parts';
  import { ModelLayerLocation } from 'net.minecraft.client.model.geom';
  import { EMFPartData } from 'traben.entity_model_features.models.jem_objects';
  import { Set, Map } from 'java.util';
  import { EMFEntityRenderState } from 'traben.entity_model_features.models.animation.state';
  import { LayerDefinition } from 'net.minecraft.client.model.geom.builders';
  import { WolfModel } from 'net.minecraft.client.model';

  class EMFDirectoryHandler {
    readonly namespace: string;
    readonly rawFileName: string;
    readonly isSubFolder: boolean;
    static basic(filename: string): EMFDirectoryHandler;
    get fileNameWithType(): string;
    get finalFileLocation(): string;
    static getDirectoryManagerOrNull(printing: boolean, namespace: string, modelFileName: string, suffixAndFileType: string): EMFDirectoryHandler;
    getRelativeDirectoryLocationNoValidation(fileName: string): string;
    getRelativeFilePossiblyEMFOverridden(jpmOrVariantFileNameWithSuffixAndFileType: string): ResourceLocation;
    packIndex(): number;
    toString(): string;
    validForThisBase(propertiesOrSecond: EMFDirectoryHandler): boolean;
  }


  interface EMFEntity extends ETFEntity {}
  class EMFEntity extends ETFEntity {
    emf$age(): number;
    emf$getPitch(): number;
    emf$getTypeString(): string;
    emf$getVariableMap(): Object2FloatOpenHashMap<string>;
    emf$getVelocity(): Vec3;
    emf$getX(): number;
    emf$getY(): number;
    emf$getYaw(): number;
    emf$getZ(): number;
    emf$hasPassengers(): boolean;
    emf$hasVehicle(): boolean;
    emf$isAlive(): boolean;
    emf$isGlowing(): boolean;
    emf$isInLava(): boolean;
    emf$isInvisible(): boolean;
    emf$isOnFire(): boolean;
    emf$isOnGround(): boolean;
    emf$isSneaking(): boolean;
    emf$isSprinting(): boolean;
    emf$isTouchingWater(): boolean;
    emf$isWet(): boolean;
    emf$prevPitch(): number;
    emf$prevX(): number;
    emf$prevY(): number;
    emf$prevZ(): number;
  }


  class EMFUtils {
    static chat(message: string): void;
    static getArrowOrNull(layer: ModelLayerLocation): EMFModelPartRoot;
    static getIdUnique(known: Set<string>, desired: string): string;
    static log(message: string): void;
    static log(message: string, inChat: boolean): void;
    static log(message: string, inChat: boolean, noPrefix: boolean): void;
    static logError(message: string): void;
    static logError(message: string, inChat: boolean): void;
    static logWarn(message: string): void;
    static logWarn(message: string, inChat: boolean): void;
    static overrideMessage(originalClass: string, overriddenClassFromMod: string, wasReverted: boolean): void;
    static readModelPart(location: ResourceLocation): EMFPartData;
    static res(fullPath: string): ResourceLocation;
    static res(namespace: string, path: string): ResourceLocation;
  }


  class HoldsBackupEMFRenderState {
    emf$getState(): EMFEntityRenderState;
    emf$setState(var1: EMFEntityRenderState): void;
  }


  class IEMFCuboidDataSupplier {
    emf$getSizeAdd(): number[];
    emf$getTextureUV(): number[];
    emf$getTextureXY(): number[];
  }


  class IEMFCustomModelHolder {
    emf$getModel(): EMFModelPartRoot;
    emf$hasModel(): boolean;
    emf$setModel(var1: EMFModelPartRoot): void;
  }


  class IEMFTextureSizeSupplier {
    emf$getTextureSize(): number[];
    emf$setTextureSize(var1: number[]): void;
  }


  class IEMFUnmodifiedLayerRootGetter {
    emf$getUnmodifiedRoots(): Map<ModelLayerLocation, LayerDefinition>;
  }


  class IEMFWolfCollarHolder<T extends Wolf = any> {
    emf$getCollarModel(): WolfModel<T>;
    emf$hasCollarModel(): boolean;
    emf$setCollarModel(var1: WolfModel<T>): void;
  }

}

declare module 'traben.entity_model_features.utils.EMFDirectoryHandler' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface EMFDirectory extends Enum<EMFDirectory> {}
  class EMFDirectory extends Enum<EMFDirectory> {
    static readonly EMF: EMFDirectory;
    static readonly EMF_SUB: EMFDirectory;
    static readonly OPTIFINE: EMFDirectory;
    static readonly OPTIFINE_SUB: EMFDirectory;
    fallback(): EMFDirectory;
    getAsDirectory(var1: string, var2: string): string;
    override(): EMFDirectory;
    static valueOf(name: string): EMFDirectory;
    static values(): EMFDirectory[];
  }

}