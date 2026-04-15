declare module 'dev.uncandango.kubejstweaks' {
  import { Logger } from 'org.slf4j';
  import { IEventBus } from 'net.neoforged.bus.api';
  import { ModContainer } from 'net.neoforged.fml';
  import { Path } from 'java.nio.file';

  class Config {
  }


  class KubeJSTweaks {
    static readonly MODID: string;
    static readonly LOGGER: Logger;
    constructor(modEventBus: IEventBus, modContainer: ModContainer);
    static get local(): Path;
  }

}

declare module 'dev.uncandango.kubejstweaks.impl' {
  import { CloseableResourceManager, Resource } from 'net.minecraft.server.packs.resources';
  import { PackType, PackResources } from 'net.minecraft.server.packs';
  import { List, Set, Optional, Map } from 'java.util';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Predicate } from 'java.util.function';
  import { Stream } from 'java.util.stream';

  interface TempResourceManager extends CloseableResourceManager {}
  class TempResourceManager extends CloseableResourceManager {
    constructor(type: PackType, packs: PackResources[]);
    close(): void;
    get namespaces(): Set<string>;
    getResource(location: ResourceLocation): Optional<Resource>;
    getResourceStack(location: ResourceLocation): Resource[];
    listPacks(): Stream<PackResources>;
    listResourceStacks(path: string, filter: Predicate<ResourceLocation>): Map<ResourceLocation, Resource[]>;
    listResources(path: string, filter: Predicate<ResourceLocation>): Map<ResourceLocation, Resource>;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.codec' {
  import { Map } from 'java.util';
  import { Codec } from 'com.mojang.serialization';

  class CodecScanner {
    static readonly codecFields: Map;
    static scanVanilla(): void;
  }


  class RandomCodecs {
    static readonly WEIGHTED_LIST_BLOCKPREDICATE_CODEC: Codec;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.debug' {
  import { Map, Set, Collection } from 'java.util';
  import { Entry } from 'Map';
  import { BiConsumer, BiFunction, Function } from 'java.util.function';

  interface WrappedMap<K = any, V = any> extends Map<K, V> {}
  class WrappedMap<K = any, V = any> extends Map<K, V> {
    constructor(wrapped: Map<K, V>);
    clear(): void;
    compute(key: K, remappingFunction: BiFunction<K, V, V>): V;
    computeIfAbsent(key: K, mappingFunction: Function<K, V>): V;
    computeIfPresent(key: K, remappingFunction: BiFunction<K, V, V>): V;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    entrySet(): Set<Entry<K, V>>;
    forEach(action: BiConsumer<K, V>): void;
    get(key: any): V;
    getOrDefault(key: any, defaultValue: V): V;
    isEmpty(): boolean;
    keySet(): Set<K>;
    merge(key: K, value: V, remappingFunction: BiFunction<V, V, V>): V;
    put(key: K, value: V): V;
    putAll(m: Map<K, V>): void;
    putIfAbsent(key: K, value: V): V;
    remove(key: any): V;
    remove(key: any, value: any): boolean;
    replace(key: K, oldValue: V, newValue: V): boolean;
    replace(key: K, value: V): V;
    replaceAll(functionParameter: BiFunction<K, V, V>): void;
    size(): number;
    values(): Collection<V>;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.event' {
  import { Deque, List, Map } from 'java.util';
  import { LoggingOut, LoggingIn } from 'ClientPlayerNetworkEvent';
  import { OnDatapackSyncEvent } from 'net.neoforged.neoforge.event';
  import { KubeEvent } from 'dev.latvian.mods.kubejs.event';
  import { Supplier } from 'java.util.function';
  import { KubeDataGenerator } from 'dev.latvian.mods.kubejs.generator';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonElement, JsonObject } from 'com.google.gson';
  import { Stream } from 'java.util.stream';
  import { RecipeEntry } from 'dev.uncandango.kubejstweaks.kubejs.event.PreRecipeEventJS';

  class ClientEvents {
    static readonly MESSAGES: Deque;
    static onDataPackSync(event: OnDatapackSyncEvent): void;
    static onPlayerLogin(event: LoggingIn): void;
    static onPlayerLogout(event: LoggingOut): void;
  }


  interface CompatibilityEventJS extends KubeEvent {}
  class CompatibilityEventJS extends KubeEvent {
    addIncompatibility(message: string, reason: string): void;
    checkModLoaded(mod: string, reason: string): void;
    checkModVersion(mod: string, version: string, reason: string): void;
    get messages(): string[];
  }


  interface NoOpEventJS extends KubeEvent {}
  class NoOpEventJS extends KubeEvent {
    static readonly NO_OP_CONDITION_OPS: Supplier;
    constructor(generator: KubeDataGenerator);
    biomeModifiers(id: ResourceLocation): void;
    json(id: ResourceLocation, json: JsonElement): void;
    lootTables(id: ResourceLocation): void;
    lootTablesBlock(id: ResourceLocation): void;
    static mergeJson(first: JsonObject, second: JsonObject): void;
    recipes(id: ResourceLocation): void;
  }


  interface PreRecipeEventJS extends KubeEvent {}
  class PreRecipeEventJS extends KubeEvent {
    constructor(recipeJsons: Map<ResourceLocation, JsonElement>);
    disable(obj: any): void;
    dumpErroringRecipes(): void;
    fixCondition(obj: any): void;
    fixItemAtKey(obj: any, key: string): void;
    getEntry(obj: any): Stream<RecipeEntry>;
    ignoreWarning(obj: any): void;
    static shouldIgnoreWarning(rl: ResourceLocation): boolean;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.event' {
  import { KubeEvent, EventGroup, EventHandler } from 'dev.latvian.mods.kubejs.event';
  import { Codec } from 'com.mojang.serialization';

  class CommonEvents {
    static listenKubeEvent(): void;
    static onGenerateData(event: KubeEvent): any;
  }


  class KJSTEvents {
    static readonly GROUP: EventGroup;
    static readonly schema: EventHandler;
    static readonly noOp: EventHandler;
    static readonly preRecipes: EventHandler;
    static readonly compatibility: EventHandler;
  }


  interface RegisterCodecEventJS extends KubeEvent {}
  class RegisterCodecEventJS extends KubeEvent {
    registerCodec<T>(clazz: string, codec: Codec<T>): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.mixin.core.main' {
  import { JavaWrapperExtension } from 'dev.uncandango.kubejstweaks.mixin.extension';
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';
  import { RecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';
  import { Map, List } from 'java.util';
  import { MapCodec } from 'com.mojang.serialization';
  import { Key, Value } from 'RecipeComponentBuilder';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KubeRecipe } from 'dev.latvian.mods.kubejs.recipe';
  import { TypeInfoBase, TypeInfo } from 'dev.latvian.mods.rhino.type';

  class CachedTagLookupMixin<T = any> {
  }


  class ClientAssetPacksMixin {
  }


  class ContextMixin {
  }


  class DataExportMixin {
  }


  class EitherRecipeComponentMixin {
  }


  class EMIRemoveEntriesKubeEventMixin {
  }


  class EntityArrayListMixin {
  }


  class EnumComponentMixin {
  }


  class ExDeorumKubeJsPluginMixin {
  }


  interface JavaWrapperMixin extends JavaWrapperExtension {}
  class JavaWrapperMixin extends JavaWrapperExtension {
  }


  class JsonRecipeSchemaLoaderMixin {
  }


  class JsonRecipeSchemaLoaderMixin2 {
  }


  class KubedexHighlightMixin {
  }


  interface KubeJEIPluginMixin extends IModPlugin {}
  class KubeJEIPluginMixin extends IModPlugin {
    onRuntimeUnavailable(): void;
  }


  class KubeJSEMIPluginMixin {
  }


  class KubeJSPathsMixin {
  }


  class KubeRecipeMixin {
    id: ResourceLocation;
    json: JsonObject;
  }


  class MobEffectBuilderMixin {
  }


  interface RecipeComponentBuilderMixin extends RecipeComponent<Map> {}
  class RecipeComponentBuilderMixin extends RecipeComponent<Map> {
    keys: List;
    mapCodec(): MapCodec<Map<Key, Value>>;
    wrap(cx: Context, recipe: KubeRecipe, from: any): Map<Key, Value>;
  }


  class RecipeKeyMixin {
    functionNames: List;
    name: string;
  }


  class RecipeManagerMixin {
  }


  class RecipeSchemaStorageMixin {
  }


  class RecipesKubeEventMixin {
    originalRecipes: Map;
  }


  class RecipeTypeFunctionMixin {
  }


  class RegistryAccessContainerMixin {
  }


  interface RegistryComponentMixin<T = any> extends RecipeComponent<T> {}
  class RegistryComponentMixin<T = any> extends RecipeComponent<T> {
    isEmpty(value: T): boolean;
  }


  class ScannerMixin {
  }


  class ServerPackMixin {
  }


  class ServerScriptManagerMixin {
  }


  class ShapedKubeRecipeMixin {
  }


  interface TagKeyComponentMixin<T = any> extends RecipeComponent<T> {}
  class TagKeyComponentMixin<T = any> extends RecipeComponent<T> {
    isEmpty(value: T): boolean;
  }


  class TheurgyRecipeSchemaMixin {
  }


  class TypeConsolidatorMixin {
  }


  class TypesMixin {
  }


  interface VariableTypeInfo2Mixin extends TypeInfoBase {}
  class VariableTypeInfo2Mixin extends TypeInfoBase {
    get bounds(): TypeInfo[];
    shouldConvert(): boolean;
  }


  interface VariableTypeInfoMixin extends TypeInfoBase {}
  class VariableTypeInfoMixin extends TypeInfoBase {
    shouldConvert(): boolean;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.mixin.core.main.JsonRecipeSchemaLoaderMixin' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  class RecipeSchemaBuilderAccessor {
    kjstweaks$getId(): ResourceLocation;
    kjstweaks$getJson(): JsonObject;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.mixin.core.main.MobEffectBuilderMixin' {
  class BasicMobEffectAccessor {
    kjstweaks$applyAttributeModifications(): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.mixin.core.main.RecipeComponentBuilderMixin' {
  class MapCodecMixin {
  }


  class ValueMixin {
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs71.plugin' {
  import { KubeJSPlugin } from 'dev.latvian.mods.kubejs.plugin';
  import { RecipeComponentFactoryRegistry } from 'dev.latvian.mods.kubejs.recipe.schema';
  import { EventGroupRegistry } from 'dev.latvian.mods.kubejs.event';
  import { TypeDescriptionRegistry, ScriptManager, BindingRegistry } from 'dev.latvian.mods.kubejs.script';
  import { ProbeJSPlugin } from 'moe.wolfgirl.probejs.plugin';
  import { ScriptDump, TypeScriptFile } from 'moe.wolfgirl.probejs.lang.typescript';
  import { Map, Set } from 'java.util';
  import { ClassPath } from 'moe.wolfgirl.probejs.lang.java.clazz';
  import { Class } from 'java.lang';

  interface KJSTPlugin extends KubeJSPlugin {}
  class KJSTPlugin extends KubeJSPlugin {
    afterInit(): void;
    afterScriptsLoaded(manager: ScriptManager): void;
    registerBindings(bindings: BindingRegistry): void;
    registerEvents(registry: EventGroupRegistry): void;
    registerRecipeComponents(registry: RecipeComponentFactoryRegistry): void;
    registerTypeDescriptions(registry: TypeDescriptionRegistry): void;
  }


  interface KJSTProbeJSPlugin extends ProbeJSPlugin {}
  class KJSTProbeJSPlugin extends ProbeJSPlugin {
    modifyClasses(scriptDump: ScriptDump, globalClasses: Map<ClassPath, TypeScriptFile>): void;
    provideJavaClass(scriptDump: ScriptDump): Set<Class<any>>;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs72.codec' {
  import { Codec } from 'com.mojang.serialization';

  class KJSTweaksCodecs {
    static readonly CODEC_CLASS: Codec;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs72.event' {
  import { KubeEvent, EventGroup, EventHandler } from 'dev.latvian.mods.kubejs.event';
  import { Codec } from 'com.mojang.serialization';

  class CommonEvents {
    static listenKubeEvent(): void;
    static onGenerateData(event: KubeEvent): any;
  }


  class KJSTEvents {
    static readonly GROUP: EventGroup;
    static readonly schema: EventHandler;
    static readonly noOp: EventHandler;
    static readonly preRecipes: EventHandler;
    static readonly compatibility: EventHandler;
  }


  interface RegisterCodecEventJS extends KubeEvent {}
  class RegisterCodecEventJS extends KubeEvent {
    registerCodec<T>(clazz: string, codec: Codec<T>): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs72.mixin.core.main' {
  import { RecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';
  import { List, Map } from 'java.util';
  import { MapCodec, DynamicOps, DataResult, MapLike, RecordBuilder } from 'com.mojang.serialization';
  import { Value } from 'CustomObjectRecipeComponent';
  import { RecipeScriptContext, KubeRecipe } from 'dev.latvian.mods.kubejs.recipe';
  import { Stream } from 'java.util.stream';
  import { ErrorStack, RegistryAccessContainer, RegistryOpsContainer } from 'dev.latvian.mods.kubejs.util';
  import { Context } from 'dev.latvian.mods.rhino';
  import { IModPlugin } from 'mezz.jei.api';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { JsonObject } from 'com.google.gson';

  class ClientAssetPacksMixin {
  }


  interface CustomObjectRecipeComponentMixin extends RecipeComponent<List> {}
  class CustomObjectRecipeComponentMixin extends RecipeComponent<List> {
    mapCodec(): MapCodec<Value[]>;
    wrap(cx: RecipeScriptContext, from: any): Value[];
  }


  interface CustomObjectRecipeComponentMixin2 extends RecipeComponent<List> {}
  class CustomObjectRecipeComponentMixin2 extends RecipeComponent<List> {
    cx(): Context;
    decode<T>(ops: DynamicOps<T>, input: MapLike<T>): DataResult<Value[]>;
    encode<T>(input: Value[], ops: DynamicOps<T>, prefix: RecordBuilder<T>): RecordBuilder<T>;
    errors(): ErrorStack;
    keys<T>(ops: DynamicOps<T>): Stream<T>;
    mapCodec(): MapCodec<Value[]>;
    ops(): RegistryOpsContainer;
    recipe(): KubeRecipe;
    registries(): RegistryAccessContainer;
  }


  class EMIRemoveEntriesKubeEventMixin {
  }


  class EnumComponentMixin {
  }


  class EnumComponentMixin2 {
  }


  class JsonRecipeSchemaLoaderMixin {
  }


  class JsonRecipeSchemaLoaderMixin2 {
  }


  interface KubeJEIPluginMixin extends IModPlugin {}
  class KubeJEIPluginMixin extends IModPlugin {
    onRuntimeUnavailable(): void;
  }


  class KubeJSEMIPluginMixin {
  }


  class KubeRecipeMixin {
    id: ResourceLocation;
    json: JsonObject;
  }


  class RecipeManagerMixin {
  }


  class RecipeSchemaStorageMixin {
  }


  class RecipesKubeEventMixin {
    originalRecipes: Map;
  }


  class ServerPackMixin {
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs72.mixin.core.main.CustomObjectRecipeComponentMixin' {
  import { KubeRecipe } from 'dev.latvian.mods.kubejs.recipe';
  import { ErrorStack, RegistryAccessContainer, RegistryOpsContainer } from 'dev.latvian.mods.kubejs.util';
  import { Context } from 'dev.latvian.mods.rhino';

  class MapCodecMixin {
    cx(): Context;
    errors(): ErrorStack;
    ops(): RegistryOpsContainer;
    recipe(): KubeRecipe;
    registries(): RegistryAccessContainer;
  }


  class ValueMixin {
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.kjs72.plugin' {
  import { KubeJSPlugin } from 'dev.latvian.mods.kubejs.plugin';
  import { RecipeComponentTypeRegistry } from 'dev.latvian.mods.kubejs.recipe.component';
  import { EventGroupRegistry } from 'dev.latvian.mods.kubejs.event';
  import { TypeDescriptionRegistry, ScriptManager, BindingRegistry } from 'dev.latvian.mods.kubejs.script';
  import { ProbeJSPlugin } from 'moe.wolfgirl.probejs.plugin';
  import { ScriptDump, TypeScriptFile } from 'moe.wolfgirl.probejs.lang.typescript';
  import { Map, Set } from 'java.util';
  import { ClassPath } from 'moe.wolfgirl.probejs.lang.java.clazz';
  import { Class } from 'java.lang';

  interface KJSTPlugin extends KubeJSPlugin {}
  class KJSTPlugin extends KubeJSPlugin {
    afterInit(): void;
    afterScriptsLoaded(manager: ScriptManager): void;
    registerBindings(bindings: BindingRegistry): void;
    registerEvents(registry: EventGroupRegistry): void;
    registerRecipeComponents(registry: RecipeComponentTypeRegistry): void;
    registerTypeDescriptions(registry: TypeDescriptionRegistry): void;
  }


  interface KJSTProbeJSPlugin extends ProbeJSPlugin {}
  class KJSTProbeJSPlugin extends ProbeJSPlugin {
    modifyClasses(scriptDump: ScriptDump, globalClasses: Map<ClassPath, TypeScriptFile>): void;
    provideJavaClass(scriptDump: ScriptDump): Set<Class<any>>;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.plugin' {
  import { WeakReference } from 'java.lang.ref';
  import { CloseableResourceManager } from 'net.minecraft.server.packs.resources';
  import { JsonElement } from 'com.google.gson';
  import { Context } from 'dev.latvian.mods.rhino';
  import { KJSTPackType } from 'dev.uncandango.kubejstweaks.kubejs.plugin.KJSTPluginUtils';
  import { Class, Void } from 'java.lang';
  import { Callable, Executor } from 'java.util.concurrent';
  import { Consumer } from 'java.util.function';

  class KJSTPluginUtils {
    static SERVER_PACK_RESOURCES: WeakReference;
    static CLIENT_PACK_RESOURCES: CloseableResourceManager;
    static TEMPORARY_SERVER_PACK_RESOURCES: CloseableResourceManager;
    static curseForgeGetEndpoint(url: string, executor: Executor, callback: Consumer<JsonElement>): void;
    static getClass(obj: any): Class<any>;
    static getSuperclass(object: any): Class<any>;
    static readJsonFromMod(cx: Context, modId: string, id: string): JsonElement;
    static readJsonFromMod(cx: Context, modId: string, id: string, type: KJSTPackType): JsonElement;
    static runIfModPresent(cx: Context, modId: string, versionRange: string, runnable: Callable<Void>): void;
    static runIfModPresent(cx: Context, modId: string, runnable: Callable<Void>): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.plugin.KJSTPluginUtils' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface KJSTPackType extends Enum<KJSTPackType> {}
  class KJSTPackType extends Enum<KJSTPackType> {
    static readonly ASSETS: KJSTPackType;
    static readonly DATA: KJSTPackType;
    static valueOf(name: string): KJSTPackType;
    static values(): KJSTPackType[];
  }

}

declare module 'dev.uncandango.kubejstweaks.kubejs.schema' {
  import { List } from 'java.util';
  import { Event } from 'net.neoforged.bus.api';
  import { ThreadLocal, Class } from 'java.lang';
  import { JsonElement } from 'com.google.gson';
  import { DataResult, Decoder } from 'com.mojang.serialization';

  class CodecNode {
    parent: CodecNode;
    childs: List;
    value: Event;
    constructor(value: Event);
    static flattenNodes(nodes: CodecNode[]): CodecNode[];
    hasSameKeyAndDecoder(node: CodecNode): boolean;
    isSibling(node: CodecNode): boolean;
    setChilds(childs: CodecNode[]): void;
    setParent(parent: CodecNode): void;
  }


  class CodecParsedListener {
    static readonly enabled: ThreadLocal;
    static codecParsed(event: Event): void;
    static getDecoder(event: Event): Decoder<any>;
    static getDepth(event: Event): number;
    static getInput(event: Event): JsonElement;
    static getName(event: Event): string;
    static getParentClass(event: Event): Class<any>;
    static getResult(event: Event): DataResult<any>;
    static setResult(event: Event, result: DataResult<any>): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin.annotation' {
  import { AnnotationData } from 'ModFileScanData';

  class Helper {
    static getValue<T>(annotation: AnnotationData, fieldName: string): T;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin.asm' {
  import { ITransformer, ITransformerVotingContext, TransformerVoteResult, TargetType } from 'cpw.mods.modlauncher.api';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Set } from 'java.util';
  import { Target } from 'ITransformer';

  interface ListRecipeComponentTransformers extends ITransformer<ClassNode> {}
  class ListRecipeComponentTransformers extends ITransformer<ClassNode> {
    static readonly TARGET_CLASS: string;
    castVote(context: ITransformerVotingContext): TransformerVoteResult;
    get targetType(): TargetType<ClassNode>;
    targets(): Set<Target<ClassNode>>;
    static transform(classNode: ClassNode): void;
    transform(input: ClassNode, context: ITransformerVotingContext): ClassNode;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin' {
  import { ClassNode, MethodNode, AbstractInsnNode, LocalVariableNode } from 'org.objectweb.asm.tree';
  import { ListRecipeComponent } from 'dev.latvian.mods.kubejs.recipe.component';
  import { ITransformer } from 'cpw.mods.modlauncher.api';
  import { Predicate } from 'java.util.function';

  class ConditionalMixinManager {
    constructor();
    shouldLoad(mixinClassName: string): boolean;
  }


  class Utils {
    static findNthInstruction(methodNode: MethodNode, predicate: Predicate<AbstractInsnNode>, nth: number): AbstractInsnNode;
    static findTargetMethod(transformer: ITransformer<MethodNode>, owner: ClassNode): MethodNode;
    static getRecipeListComponent(args: any[]): ListRecipeComponent;
    static insertLocalVariableAtIndex(methodNode: MethodNode, localVariableNode: LocalVariableNode): void;
    static saveClassToDisk(targetClass: ClassNode, path: string): void;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin.core.main' {
  import { TypeInfoBase, TypeInfo } from 'dev.latvian.mods.rhino.type';

  class BalmClientRuntimeSpiMixin {
  }


  class ContextFactoryMixin {
  }


  class InterpreterMixin {
  }


  class NativeJavaMapMixin {
  }


  class NativeJavaMethodMixin {
  }


  class PlatHelperImplMixin {
    static isDev(): boolean;
  }


  class RecipeComponentValueMapMixin {
  }


  class TooltipProvidersMixin {
  }


  class TypeConsolidatorMixin {
  }


  class TypesMixin {
  }


  interface VariableTypeInfo2Mixin extends TypeInfoBase {}
  class VariableTypeInfo2Mixin extends TypeInfoBase {
    get bounds(): TypeInfo[];
    shouldConvert(): boolean;
  }


  interface VariableTypeInfoMixin extends TypeInfoBase {}
  class VariableTypeInfoMixin extends TypeInfoBase {
    shouldConvert(): boolean;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin.core.plugin' {
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';

  interface KJSTMixinPlugin extends IMixinConfigPlugin {}
  class KJSTMixinPlugin extends IMixinConfigPlugin {
    acceptTargets(myTargets: Set<string>, otherTargets: Set<string>): void;
    get mixins(): string[];
    get refMapperConfig(): string;
    onLoad(mixinPackage: string): void;
    postApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    preApply(targetClassName: string, targetClass: ClassNode, mixinClassName: string, mixinInfo: IMixinInfo): void;
    shouldApplyMixin(targetClassName: string, mixinClassName: string): boolean;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin.extension' {
  import { Context } from 'dev.latvian.mods.rhino';
  import { Class } from 'java.lang';

  class JavaWrapperExtension {
    static cast<T>(cx: Context, targetClass: Class<T>, object: any): T;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin_sq.adjuster' {
  import { MixinAnnotationAdjuster } from 'com.bawnorton.mixinsquared.api';
  import { AdjustableAnnotationNode } from 'com.bawnorton.mixinsquared.adjuster.tools';
  import { List } from 'java.util';
  import { MethodNode } from 'org.objectweb.asm.tree';

  interface KJSTMixinAdjuster extends MixinAnnotationAdjuster {}
  class KJSTMixinAdjuster extends MixinAnnotationAdjuster {
    adjust(targetClassNames: string[], mixinClassName: string, handlerNode: MethodNode, annotationNode: AdjustableAnnotationNode): AdjustableAnnotationNode;
  }

}

declare module 'dev.uncandango.kubejstweaks.mixin_sq.canceller' {
  import { MixinCanceller } from 'com.bawnorton.mixinsquared.api';
  import { List } from 'java.util';

  interface KJSTMixinCanceller extends MixinCanceller {}
  class KJSTMixinCanceller extends MixinCanceller {
    shouldCancel(targetClassNames: string[], mixinClassName: string): boolean;
  }

}