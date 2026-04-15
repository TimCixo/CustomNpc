declare module 'dev.latvian.mods.rhino' {
  import { Class, StringBuilder, CharSequence, ClassLoader, Iterable, Boolean, RuntimeException, Enum, Integer, Double, Number, Throwable } from 'java.lang';
  import { TypeInfo, VariableTypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Set, List, Iterator, Collection, Map, ListIterator, Comparator } from 'java.util';
  import { Accessible } from 'dev.latvian.mods.rhino.CachedFieldInfo';
  import { Accessible as dev_latvian_mods_rhino_cachedmethodinfo_Accessible } from 'dev.latvian.mods.rhino.CachedMethodInfo';
  import { Member, Constructor, Executable, Field, AccessibleObject, Method } from 'java.lang.reflect';
  import { ScriptNode, AstRoot, AstNode, Comment, Scope } from 'dev.latvian.mods.rhino.ast';
  import { TypeWrappers } from 'dev.latvian.mods.rhino.util.wrap';
  import { Lookup } from 'MethodHandles';
  import { MethodHandle } from 'java.lang.invoke';
  import { Func } from 'dev.latvian.mods.rhino.CustomFunction';
  import { Slot, SlotAccess } from 'dev.latvian.mods.rhino.ScriptableObject';
  import { DefaultValueTypeHint, DataObject } from 'dev.latvian.mods.rhino.util';
  import { Entry } from 'dev.latvian.mods.rhino.Hashtable';
  import { Consumer, Supplier } from 'java.util.function';
  import { Closeable, Reader, InputStream, PrintWriter, PrintStream } from 'java.io';
  import { Itr } from 'dev.latvian.mods.rhino.IteratorLikeIterable';
  import { FieldInfo, MethodInfo } from 'dev.latvian.mods.rhino.JavaMembers';
  import { ArrayIteratorType } from 'dev.latvian.mods.rhino.NativeArrayIterator';
  import { Type } from 'dev.latvian.mods.rhino.NativeCollectionIterator';
  import { JsonElement } from 'com.google.gson';
  import { Entry as map_Entry } from 'Map';
  import { Iterator as dev_latvian_mods_rhino_objtointmap_Iterator } from 'dev.latvian.mods.rhino.ObjToIntMap';
  import { MessageProvider } from 'dev.latvian.mods.rhino.ScriptRuntime';
  import { Builtins } from 'dev.latvian.mods.rhino.TopLevel';
  import { RegExp } from 'dev.latvian.mods.rhino.regexp';
  import { CommentType } from 'dev.latvian.mods.rhino.Token';

  interface Arguments extends IdScriptableObject {}
  class Arguments extends IdScriptableObject {
    constructor(activation: NativeCall, cx: Context);
    delete(cx: Context, index: number): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, key: Symbol): void;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, key: any): any;
    get className(): string;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
  }


  interface ArrowFunction extends BaseFunction {}
  class ArrowFunction extends BaseFunction {
    constructor(cx: Context, scope: Scriptable, targetFunction: Callable, boundThis: Scriptable);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    construct(cx: Context, scope: Scriptable, args: any[]): Scriptable;
    get arity(): number;
    get length(): number;
    hasInstance(cx: Context, instance: Scriptable): boolean;
    toString(): string;
  }


  interface BaseFunction extends Function, IdScriptableObject {}
  class BaseFunction extends Function {
    constructor();

    constructor(isGenerator: boolean);

    constructor(scope: Scriptable, prototype: Scriptable);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    construct(cx: Context, scope: Scriptable, args: any[]): Scriptable;
    createObject(cx: Context, scope: Scriptable): Scriptable;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get arity(): number;
    get className(): string;
    get functionName(): string;
    get length(): number;
    get typeOf(): MemberType;
    hasInstance(cx: Context, instance: Scriptable): boolean;
    setImmunePrototypeProperty(value: any): void;
    toString(): string;
  }


  class BeanProperty {
  }


  interface BoundFunction extends BaseFunction {}
  class BoundFunction extends BaseFunction {
    constructor(cx: Context, scope: Scriptable, targetFunction: Callable, boundThis: Scriptable, boundArgs: any[]);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, extraArgs: any[]): any;
    construct(cx: Context, scope: Scriptable, extraArgs: any[]): Scriptable;
    get length(): number;
    hasInstance(cx: Context, instance: Scriptable): boolean;
  }


  class CachedClassInfo {
    readonly storage: CachedClassStorage;
    readonly type: Class;
    readonly modifiers: number;
    readonly isInterface: boolean;
    constructor(storage: CachedClassStorage, type: Class<any>);
    appendDebugType(builder: StringBuilder): void;
    get constructors(): CachedConstructorInfo[];
    get debugInfo(): string[];
    get declaredFields(): CachedFieldInfo[];
    get declaredMethods(): CachedMethodInfo[];
    get interfaces(): CachedClassInfo[];
    get remapPrefixes(): Set<string>;
    get superclass(): CachedClassInfo;
    get typeInfo(): TypeInfo;
    getAccessibleFields(cache: boolean): Accessible[];
    getAccessibleMethods(cache: boolean): dev_latvian_mods_rhino_cachedmethodinfo_Accessible[];
    getMethod(name: string, params: Class<any>): CachedMethodInfo;
    toString(): string;
  }


  class CachedClassStorage {
    static readonly GLOBAL_PUBLIC: CachedClassStorage;
    static readonly GLOBAL_PROTECTED: CachedClassStorage;
    readonly objectClass: CachedClassInfo;
    readonly includeProtected: boolean;
    constructor(includeProtected: boolean);
    get(type: Class<any>): CachedClassInfo;
    getDebugClassName(type: Class<any>): string;
    include(type: Class<any>, member: Member): boolean;
    isVisible(modifiers: number): boolean;
  }


  interface CachedConstructorInfo extends CachedExecutableInfo {}
  class CachedConstructorInfo extends CachedExecutableInfo {
    constructor(parent: CachedClassInfo, constructor: Constructor<any>);
    get cached(): Constructor<any>;
    invoke(cx: Context, scope: Scriptable, instance: any, ...args: any[]): any;
    invoke(cx: Context, scope: Scriptable, instance: any, args: any[]): any;
  }


  interface CachedExecutableInfo extends CachedMemberInfo {}
  class CachedExecutableInfo extends CachedMemberInfo {
    constructor(parent: CachedClassInfo, e: Executable);
    appendDebugParams(builder: StringBuilder): void;
    get cached(): Executable;
    get parameters(): CachedParameters;
    get returnType(): TypeInfo;
    get signature(): MethodSignature;
    invoke(cx: Context, scope: Scriptable, instance: any, args: any[]): any;
    toString(): string;
    transformArgs(cx: Context, instance: any, parameters: CachedParameters, args: any[]): any[];
  }


  interface CachedFieldInfo extends CachedMemberInfo {}
  class CachedFieldInfo extends CachedMemberInfo {
    constructor(parent: CachedClassInfo, f: Field);
    get(cx: Context, instance: any): any;
    get cached(): Field;
    get type(): TypeInfo;
    set(cx: Context, instance: any, value: any): void;
  }


  class CachedMemberInfo {
    readonly parent: CachedClassInfo;
    readonly originalName: string;
    readonly modifiers: number;
    readonly isStatic: boolean;
    readonly isFinal: boolean;
    readonly isNative: boolean;
    constructor(parent: CachedClassInfo, member: AccessibleObject, originalName: string, modifiers: number);
    get cached(): AccessibleObject;
    get declaringClass(): CachedClassInfo;
    get name(): string;
    toString(): string;
  }


  interface CachedMethodInfo extends CachedExecutableInfo {}
  class CachedMethodInfo extends CachedExecutableInfo {
    constructor(parent: CachedClassInfo, m: Method);
    get cached(): Method;
    get returnType(): TypeInfo;
    invoke(cx: Context, scope: Scriptable, instance: any, ...args: any[]): any;
    invoke(cx: Context, scope: Scriptable, instance: any, args: any[]): any;
  }


  class Callable {
    call(var1: Context, var2: Scriptable, var3: Scriptable, var4: any[]): any;
  }


  interface CodeGenerator extends Icode {}
  class CodeGenerator extends Icode {
    compile(compilerEnv: CompilerEnvirons, tree: ScriptNode, returnFunction: boolean, cx: Context): InterpreterData;
  }


  class CompilerEnvirons {
    get errorReporter(): ErrorReporter;
    initFromContext(cx: Context): void;
    isStrictMode(): boolean;
    set errorReporter(errorReporter: ErrorReporter);
  }


  class ConsString {
    static flatten(left: CharSequence, right: CharSequence): string;
  }


  class ConstProperties {
    defineConst(var1: Context, var2: string, var3: Scriptable): void;
    isConst(var1: string): boolean;
    putConst(var1: Context, var2: string, var3: Scriptable, var4: any): void;
  }


  class ContextAction<T = any> {
    run(var1: Context): T;
  }


  class ContextFactory {
    enter(): Context;
    get cachedClassStorage(): CachedClassStorage;
    get instanceStaticFallback(): boolean;
    get methodHandlesLookup(): Lookup;
    get typeWrappers(): TypeWrappers;
    getDefaultRecordProperties(type: Class<any>): any[];
    getRecordConstructor(type: Class<any>): MethodHandle;
    registerDefaultRecordProperties(record: Record): void;
    set instanceStaticFallback(value: boolean);
  }


  interface CustomFunction extends BaseFunction {}
  class CustomFunction extends BaseFunction {
    constructor(functionName: string, func: Func, argTypes: TypeInfo[]);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get functionName(): string;
  }


  class CustomProperty {
    get(var1: Context): any;
  }


  interface DefaultErrorReporter extends ErrorReporter {}
  class DefaultErrorReporter extends ErrorReporter {
    error(cx: Context, message: string, sourceURI: string, line: number, lineText: string, lineOffset: number): void;
    runtimeError(cx: Context, message: string, sourceURI: string, line: number, lineText: string, lineOffset: number): EvaluatorException;
    warning(message: string, sourceURI: string, line: number, lineText: string, lineOffset: number): void;
  }


  interface DefiningClassLoader extends GeneratedClassLoader, ClassLoader {}
  class DefiningClassLoader extends GeneratedClassLoader {
    constructor();

    constructor(parentLoader: ClassLoader);
    defineClass(name: string, data: number[]): Class<any>;
    linkClass(cl: Class<any>): void;
    loadClass(name: string, resolve: boolean): Class<any>;
  }


  class DToA {
  }


  interface EcmaError extends RhinoException {}
  class EcmaError extends RhinoException {
    details(): string;
    get errorMessage(): string;
    get name(): string;
  }


  interface EmbeddedSlotMap extends SlotMap {}
  class EmbeddedSlotMap extends SlotMap {
    addSlot(newSlot: Slot): void;
    get(key: any, index: number, accessType: SlotAccess): Slot;
    isEmpty(): boolean;
    iterator(): Iterator<Slot>;
    query(key: any, index: number): Slot;
    remove(key: any, index: number, cx: Context): void;
    size(): number;
  }


  class EqualObjectGraphs {
  }


  class ErrorReporter {
    error(var1: Context, var2: string, var3: string, var4: number, var5: string, var6: number): void;
    runtimeError(var1: Context, var2: string, var3: string, var4: number, var5: string, var6: number): EvaluatorException;
    warning(var1: string, var2: string, var3: number, var4: string, var5: number): void;
  }


  interface ES6Generator extends IdScriptableObject {}
  class ES6Generator extends IdScriptableObject {
    constructor(scope: Scriptable, functionParameter: NativeFunction, savedState: any, cx: Context);
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface ES6Iterator extends IdScriptableObject {}
  class ES6Iterator extends IdScriptableObject {
    static readonly NEXT_METHOD: string;
    static readonly DONE_PROPERTY: string;
    static readonly RETURN_PROPERTY: string;
    static readonly VALUE_PROPERTY: string;
    static readonly RETURN_METHOD: string;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
  }


  class Evaluator {
    captureStackInfo(var1: Context, var2: RhinoException): void;
    compile(var1: CompilerEnvirons, var2: ScriptNode, var3: boolean, var4: Context): any;
    createFunctionObject(var1: Context, var2: Scriptable, var3: any, var4: any): Function;
    createScriptObject(var1: any, var2: any): Script;
    getPatchedStack(var1: RhinoException, var2: string): string;
    getScriptStack(var1: RhinoException): string[];
    getSourcePositionFromStack(var1: Context, var2: number[]): string;
    setEvalScriptFlag(var1: Script): void;
  }


  interface EvaluatorException extends RhinoException {}
  class EvaluatorException extends RhinoException {
    constructor(cx: Context, detail: string);

    constructor(cx: Context, detail: string, sourceName: string, lineNumber: number);

    constructor(cx: Context, detail: string, sourceName: string, lineNumber: number, lineSource: string, columnNumber: number);
  }


  class ExternalArrayData {
    get arrayLength(): number;
    getArrayElement(var1: number): any;
    setArrayElement(var1: number, var2: any): void;
  }


  interface FieldAndMethods extends NativeJavaMethod {}
  class FieldAndMethods extends NativeJavaMethod {
    fieldInfo: CachedFieldInfo;
    javaObject: any;
    getDefaultValue(cx: Context, hint: DefaultValueTypeHint): any;
    static getDefaultValue(object: Scriptable, typeHint: DefaultValueTypeHint, cx: Context): any;
  }


  interface Function extends Scriptable, Callable {}
  class Function extends Scriptable {
    call(var1: Context, var2: Scriptable, var3: Scriptable, var4: any[]): any;
    construct(var1: Context, var2: Scriptable, var3: any[]): Scriptable;
  }


  interface FunctionObject extends BaseFunction {}
  class FunctionObject extends BaseFunction {
    static readonly JAVA_UNSUPPORTED_TYPE: number;
    static readonly JAVA_STRING_TYPE: number;
    static readonly JAVA_INT_TYPE: number;
    static readonly JAVA_BOOLEAN_TYPE: number;
    static readonly JAVA_DOUBLE_TYPE: number;
    static readonly JAVA_SCRIPTABLE_TYPE: number;
    static readonly JAVA_OBJECT_TYPE: number;
    constructor(name: string, methodOrConstructor: CachedExecutableInfo, scope: Scriptable, cx: Context);
    addAsConstructor(scope: Scriptable, prototype: Scriptable, cx: Context): void;
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    static convertArg(cx: Context, scope: Scriptable, arg: any, typeTag: number): any;
    createObject(cx: Context, scope: Scriptable): Scriptable;
    get arity(): number;
    get functionName(): string;
    get length(): number;
    static getTypeTag(type: Class<any>): number;
  }


  class GeneratedClassLoader {
    defineClass(var1: string, var2: number[]): Class<any>;
    linkClass(var1: Class<any>): void;
  }


  class GeneratorState {
    static readonly GENERATOR_SEND: number;
    static readonly GENERATOR_THROW: number;
    static readonly GENERATOR_CLOSE: number;
  }


  interface HashSlotMap extends SlotMap {}
  class HashSlotMap extends SlotMap {
    addSlot(newSlot: Slot): void;
    get(key: any, index: number, accessType: SlotAccess): Slot;
    isEmpty(): boolean;
    iterator(): Iterator<Slot>;
    query(key: any, index: number): Slot;
    remove(key: any, index: number, cx: Context): void;
    size(): number;
  }


  interface Hashtable extends Iterable<Entry> {}
  class Hashtable extends Iterable<Entry> {
    constructor(cx: Context);
    clear(cx: Context): void;
    delete(cx: Context, key: any): any;
    get(cx: Context, key: any): any;
    has(cx: Context, key: any): boolean;
    iterator(): Iterator<Entry>;
    put(cx: Context, key: any, value: any): void;
    size(): number;
  }


  class Icode {
  }


  interface IdEnumeration extends Consumer<any> {}
  class IdEnumeration extends Consumer<any> {
    tempResult: any;
    accept(o: any): void;
    changeObject(cx: Context): void;
    getId(cx: Context): any;
    getValue(cx: Context): any;
    next(cx: Context): boolean;
    nextExec(cx: Context, scope: Scriptable): any;
  }


  class IdEnumerationIterator {
    enumerationIteratorHasNext(var1: Context, var2: Consumer<any>): boolean;
    enumerationIteratorNext(var1: Context, var2: Consumer<any>): boolean;
  }


  class IdFunctionCall {
    execIdCall(var1: IdFunctionObject, var2: Context, var3: Scriptable, var4: Scriptable, var5: any[]): any;
  }


  interface IdFunctionObject extends BaseFunction {}
  class IdFunctionObject extends BaseFunction {
    constructor(idcall: IdFunctionCall, tag: any, id: number, arity: number);

    constructor(idcall: IdFunctionCall, tag: any, id: number, name: string, arity: number, scope: Scriptable);
    addAsProperty(target: Scriptable, cx: Context): void;
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    createObject(cx: Context, scope: Scriptable): Scriptable;
    exportAsScopeProperty(cx: Context): void;
    get arity(): number;
    get functionName(): string;
    get length(): number;
    get tag(): any;
    getPrototype(cx: Context): Scriptable;
    hasTag(tag: any): boolean;
    initFunction(name: string, scope: Scriptable): void;
    markAsConstructor(prototypeProperty: Scriptable): void;
    methodId(): number;
    unknown(): RuntimeException;
  }


  interface IdFunctionObjectES6 extends IdFunctionObject {}
  class IdFunctionObjectES6 extends IdFunctionObject {
    constructor(idcall: IdFunctionCall, tag: any, id: number, name: string, arity: number, scope: Scriptable);
  }


  interface IdScriptableObject extends IdFunctionCall, ScriptableObject {}
  class IdScriptableObject extends IdFunctionCall {
    constructor();

    constructor(scope: Scriptable, prototype: Scriptable);
    activatePrototypeMap(maxPrototypeId: number): void;
    defineOwnProperty(cx: Context, key: any, desc: ScriptableObject): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, key: Symbol): void;
    delete(cx: Context, index: number): void;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    exportAsJSClass(maxPrototypeId: number, scope: Scriptable, sealed: boolean, cx: Context): IdFunctionObject;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: any): any;
    getAttributes(cx: Context, name: string): number;
    getAttributes(cx: Context, key: Symbol): number;
    getAttributes(cx: Context, index: number): number;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    hasPrototypeMap(): boolean;
    initPrototypeConstructor(f: IdFunctionObject, cx: Context): void;
    initPrototypeMethod(tag: any, id: number, name: string, arity: number, cx: Context): IdFunctionObject;
    initPrototypeMethod(tag: any, id: number, propertyName: string, functionName: string, arity: number, cx: Context): IdFunctionObject;
    initPrototypeMethod(tag: any, id: number, key: Symbol, functionName: string, arity: number, cx: Context): IdFunctionObject;
    initPrototypeValue(id: number, name: string, value: any, attributes: number): void;
    initPrototypeValue(id: number, key: Symbol, value: any, attributes: number): void;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    setAttributes(cx: Context, name: string, attributes: number): void;
    setAttributes(cx: Context, index: number, attributes: number): void;
    setAttributes(cx: Context, key: Symbol, attributes: number): void;
  }


  class ImplementationVersion {
    static get (): string;
  }


  class InterfaceAdapter {
    invoke(cx: Context, target: any, topScope: Scriptable, thisObject: any, method: Method, args: any[]): any;
  }


  interface InterpretedFunction extends Script, NativeFunction {}
  class InterpretedFunction extends Script {
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    exec(cx: Context, scope: Scriptable): any;
    get functionName(): string;
    isScript(): boolean;
    resumeGenerator(cx: Context, scope: Scriptable, operation: number, state: any, value: any): any;
  }


  interface Interpreter extends Evaluator, Icode {}
  class Interpreter extends Evaluator {
    captureStackInfo(cx: Context, ex: RhinoException): void;
    compile(compilerEnv: CompilerEnvirons, tree: ScriptNode, returnFunction: boolean, cx: Context): any;
    createFunctionObject(cx: Context, scope: Scriptable, bytecode: any, staticSecurityDomain: any): Function;
    createScriptObject(bytecode: any, staticSecurityDomain: any): Script;
    getPatchedStack(ex: RhinoException, nativeStackTrace: string): string;
    getScriptStack(ex: RhinoException): string[];
    getScriptStackElements(ex: RhinoException): ScriptStackElement[][];
    getSourcePositionFromStack(cx: Context, linep: number[]): string;
    static resumeGenerator(cx: Context, scope: Scriptable, operation: number, savedState: any, value: any): any;
    setEvalScriptFlag(script: Script): void;
  }


  class InterpreterData {
    get functionCount(): number;
    get functionName(): string;
    get paramAndVarCount(): number;
    get parent(): InterpreterData;
    getFunction(index: number): InterpreterData;
    getParamOrVarConst(index: number): boolean;
    icodeHashCode(): number;
  }


  interface IRFactory extends Parser {}
  class IRFactory extends Parser {
    constructor(cx: Context);

    constructor(cx: Context, env: CompilerEnvirons);

    constructor(cx: Context, env: CompilerEnvirons, errorReporter: ErrorReporter);
    transform(node: AstNode): Node;
    transformTree(root: AstRoot): ScriptNode;
  }


  interface IteratorLikeIterable extends Iterable<any>, Closeable {}
  class IteratorLikeIterable extends Iterable<any> {
    constructor(cx: Context, scope: Scriptable, target: any);
    close(): void;
    iterator(): Itr;
  }


  interface JavaAdapter extends IdFunctionCall {}
  class JavaAdapter extends IdFunctionCall {
    static callMethod(cx: Context, thisObj: Scriptable, f: Function, args: any[], argsToWrap: number): any;
    static convertResult(cx: Context, result: any, c: Class<any>): any;
    static createAdapterCode(functionNames: ObjToIntMap, adapterName: string, superClass: Class<any>, interfaces: Class<any>, scriptClassName: string, cx: Context): number[];
    static createAdapterWrapper(obj: Scriptable, adapter: any, cx: Context): Scriptable;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    static getAdapterSelf(adapterClass: Class<any>, adapter: any): any;
    static getFunction(obj: Scriptable, functionName: string, cx: Context): Function;
    static init(cx: Context, scope: Scriptable, sealed: boolean): void;
    static runScript(script: Script, cx: Context): Scriptable;
  }


  class JavaMembers {
    get(scope: Scriptable, name: string, javaObject: any, isStatic: boolean, cx: Context): any;
    get accessibleConstructors(): Constructor<any>[];
    getAccessibleFields(cx: Context, includeProtected: boolean): Collection<FieldInfo>;
    getAccessibleMethods(cx: Context, includeProtected: boolean): Collection<MethodInfo>;
    getFieldAndMethodsObjects(scope: Scriptable, javaObject: any, isStatic: boolean, cx: Context): Map<string, FieldAndMethods>;
    getIds(isStatic: boolean): any[];
    has(cx: Context, name: string, isStatic: boolean): boolean;
    static javaSignature(type: Class<any>): string;
    static liveConnectSignature(argTypes: Class<any>[]): string;
    static lookupClass(cx: Context, scope: Scriptable, dynamicType: Class<any>, staticType: Class<any>, includeProtected: boolean): JavaMembers;
    put(scope: Scriptable, name: string, javaObject: any, value: any, isStatic: boolean, cx: Context): void;
  }


  interface JavaScriptException extends RhinoException {}
  class JavaScriptException extends RhinoException {
    constructor(cx: Context, value: any, sourceName: string, lineNumber: number);
    details(): string;
    get value(): any;
  }


  class Kit {
    static addListener(bag: any, listener: any): any;
    static classOrNull(className: string): Class<any>;
    static classOrNull(loader: ClassLoader, className: string): Class<any>;
    static codeBug(): RuntimeException;
    static codeBug(msg: string): RuntimeException;
    static getListener(bag: any, index: number): any;
    static makeHashKeyFromPair(key1: any, key2: any): any;
    static readReader(reader: Reader): string;
    static readStream(is: InputStream, initialBufferCapacity: number): number[];
    static removeListener(bag: any, listener: any): any;
    static xDigitToInt(c: number, accumulator: number): number;
  }


  class MemberBox {
    wrappedExecutable: WrappedExecutable;
    get info(): CachedExecutableInfo;
    parameters(): CachedParameters;
    toString(): string;
  }


  interface MemberType extends Enum<MemberType> {}
  class MemberType extends Enum<MemberType> {
    static readonly UNDEFINED: MemberType;
    static readonly OBJECT: MemberType;
    static readonly FUNCTION: MemberType;
    static readonly SYMBOL: MemberType;
    static readonly STRING: MemberType;
    static readonly NUMBER: MemberType;
    static readonly BOOLEAN: MemberType;
    static get(value: any, cx: Context): MemberType;
    toString(): string;
    static valueOf(name: string): MemberType;
    static values(): MemberType[];
  }


  interface NativeArray extends List, DataObject, IdScriptableObject {}
  class NativeArray extends List {
    constructor(cx: Context, lengthArg: number);

    constructor(cx: Context, array: any[]);
    add(o: any): void;
    add(o: any): boolean;
    add(index: number, element: any): void;
    addAll(c: Collection): boolean;
    addAll(index: number, c: Collection): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: Collection): boolean;
    createDataObject<T>(instanceFactory: Supplier<T>, cx: Context): T;
    createDataObjectList<T>(instanceFactory: Supplier<T>, cx: Context): T[];
    delete(cx: Context, index: number): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, key: Symbol): void;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(index: number, cx: Context): any;
    get(index: number): any;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, key: any): any;
    get className(): string;
    get length(): number;
    getAttributes(cx: Context, index: number): number;
    getAttributes(cx: Context, name: string): number;
    getAttributes(cx: Context, key: Symbol): number;
    getIds(cx: Context, nonEnumerable: boolean, getSymbols: boolean): any[];
    getIds(cx: Context): any[];
    getIndexIds(cx: Context): number[];
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    hasNext(): boolean;
    hasPrevious(): boolean;
    indexOf(o: any): number;
    isDataObjectList(): boolean;
    isEmpty(): boolean;
    iterator(): Iterator;
    lastIndexOf(o: any): number;
    listIterator(): ListIterator;
    listIterator(start: number): ListIterator;
    next(): any;
    nextIndex(): number;
    previous(): any;
    previousIndex(): number;
    put(cx: Context, id: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    remove(): void;
    remove(o: any): boolean;
    remove(index: number): any;
    removeAll(c: Collection): boolean;
    retainAll(c: Collection): boolean;
    set(o: any): void;
    set(index: number, element: any): any;
    size(): number;
    subList(fromIndex: number, toIndex: number): List;
    toArray(): any[];
    toArray(a: any[]): any[];
    toString(): string;
  }


  interface NativeArrayIterator extends ES6Iterator {}
  class NativeArrayIterator extends ES6Iterator {
    constructor(cx: Context, scope: Scriptable, arrayLike: Scriptable, type: ArrayIteratorType);
    get className(): string;
  }


  interface NativeBoolean extends IdScriptableObject {}
  class NativeBoolean extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    getDefaultValue(cx: Context, typeHint: DefaultValueTypeHint): any;
    static getDefaultValue(object: Scriptable, typeHint: DefaultValueTypeHint, cx: Context): any;
  }


  interface NativeCall extends IdScriptableObject {}
  class NativeCall extends IdScriptableObject {
    defineAttributesForArguments(cx: Context): void;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeCallSite extends IdScriptableObject {}
  class NativeCallSite extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    toString(): string;
  }


  interface NativeCollectionIterator extends ES6Iterator {}
  class NativeCollectionIterator extends ES6Iterator {
    constructor(tag: string);

    constructor(scope: Scriptable, className: string, type: Type, iterator: Iterator<Entry>, cx: Context);
    get className(): string;
  }


  interface NativeDate extends IdScriptableObject {}
  class NativeDate extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    getDefaultValue(cx: Context, typeHint: DefaultValueTypeHint): any;
    static getDefaultValue(object: Scriptable, typeHint: DefaultValueTypeHint, cx: Context): any;
  }


  interface NativeError extends IdScriptableObject {}
  class NativeError extends IdScriptableObject {
    static readonly DEFAULT_STACK_LIMIT: number;
    constructor(cx: Context);
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    getStackDelegated(cx: Context, target: Scriptable): any;
    setStackDelegated(cx: Context, target: Scriptable, value: any): any;
    setStackProvider(re: RhinoException, cx: Context): void;
    toString(): string;
  }


  interface NativeFunction extends BaseFunction {}
  class NativeFunction extends BaseFunction {
    get arity(): number;
    get length(): number;
    initScriptFunction(cx: Context, scope: Scriptable): void;
    initScriptFunction(cx: Context, scope: Scriptable, es6GeneratorFunction: boolean): void;
    resumeGenerator(cx: Context, scope: Scriptable, operation: number, state: any, value: any): any;
  }


  interface NativeGlobal extends IdFunctionCall {}
  class NativeGlobal extends IdFunctionCall {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    static init(cx: Context, scope: Scriptable, sealed: boolean): void;
  }


  interface NativeGSON extends NativeJSON {}
  class NativeGSON extends NativeJSON {
    static stringify0(cx: Context, v: any): JsonElement;
    stringifyJSON(value: any, replacer: any, space: any, cx: Context): string;
  }


  interface NativeIterator extends IdScriptableObject {}
  class NativeIterator extends IdScriptableObject {
    static readonly ITERATOR_PROPERTY_NAME: string;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    static getStopIterationObject(scope: Scriptable, cx: Context): any;
  }


  interface NativeJavaArray extends SymbolScriptable, NativeJavaObject {}
  class NativeJavaArray extends SymbolScriptable {
    constructor(scope: Scriptable, array: any, type: TypeInfo, cx: Context);
    delete(cx: Context, key: Symbol): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, index: number): void;
    get(cx: Context, id: string, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get className(): string;
    getDefaultValue(cx: Context, hint: DefaultValueTypeHint): any;
    getIds(cx: Context): any[];
    getPrototype(cx: Context): Scriptable;
    has(cx: Context, id: string, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    hasInstance(cx: Context, value: Scriptable): boolean;
    put(cx: Context, id: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
    unwrap(): any;
  }


  interface NativeJavaClass extends Function, NativeJavaObject {}
  class NativeJavaClass extends Function {
    constructor(cx: Context, scope: Scriptable, cl: Class<any>);

    constructor(cx: Context, scope: Scriptable, cl: Class<any>, isAdapter: boolean);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    construct(cx: Context, scope: Scriptable, args: any[]): Scriptable;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get className(): string;
    get classObject(): Class<any>;
    getDefaultValue(cx: Context, hint: DefaultValueTypeHint): any;
    getIds(cx: Context): any[];
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    hasInstance(cx: Context, value: Scriptable): boolean;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    toString(): string;
  }


  interface NativeJavaConstructor extends BaseFunction {}
  class NativeJavaConstructor extends BaseFunction {
    constructor(ctor: MemberBox);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get functionName(): string;
    toString(): string;
  }


  interface NativeJavaList extends NativeJavaObject {}
  class NativeJavaList extends NativeJavaObject {
    readonly list: List;
    readonly listType: TypeInfo;
    constructor(cx: Context, scope: Scriptable, jo: any, list: List, type: TypeInfo);
    delete(cx: Context, index: number): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, key: Symbol): void;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, name: string, start: Scriptable): any;
    get className(): string;
    getIds(cx: Context): any[];
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    has(cx: Context, name: string, start: Scriptable): boolean;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
  }


  interface NativeJavaMap extends NativeJavaObject {}
  class NativeJavaMap extends NativeJavaObject {
    readonly map: Map;
    readonly mapKeyType: TypeInfo;
    readonly mapValueType: TypeInfo;
    constructor(cx: Context, scope: Scriptable, jo: any, map: Map, type: TypeInfo);
    delete(cx: Context, name: string): void;
    delete(cx: Context, index: number): void;
    delete(cx: Context, key: Symbol): void;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get className(): string;
    getIds(cx: Context): any[];
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
  }


  interface NativeJavaMethod extends BaseFunction {}
  class NativeJavaMethod extends BaseFunction {
    methods: MemberBox[];
    constructor(method: CachedMethodInfo, name: string);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get functionName(): string;
    toString(): string;
  }


  interface NativeJavaObject extends Scriptable, SymbolScriptable, Wrapper {}
  class NativeJavaObject extends Scriptable {
    constructor(scope: Scriptable, javaObject: any, typeInfo: TypeInfo, cx: Context);

    constructor(scope: Scriptable, javaObject: any, typeInfo: TypeInfo, isAdapter: boolean, cx: Context);
    addCustomMember(member: CustomMember): void;
    addCustomProperty(name: string, type: TypeInfo, getter: CustomProperty): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, key: Symbol): void;
    delete(cx: Context, index: number): void;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get className(): string;
    get parentScope(): Scriptable;
    get typeMapping(): Map<VariableTypeInfo, TypeInfo>;
    getDefaultValue(cx: Context, hint: DefaultValueTypeHint): any;
    getIds(cx: Context): any[];
    getPrototype(cx: Context): Scriptable;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    hasInstance(cx: Context, value: Scriptable): boolean;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    set parentScope(m: Scriptable);
    setPrototype(m: Scriptable): void;
    unwrap(): any;
  }


  interface NativeJSON extends IdScriptableObject {}
  class NativeJSON extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    static parse(cx: Context, scope: Scriptable, jtext: string, reviver: Callable): any;
    static stringify(value: any, replacer: any, space: any, cx: Context): string;
    stringifyJSON(value: any, replacer: any, space: any, cx: Context): string;
  }


  interface NativeMap extends IdScriptableObject {}
  class NativeMap extends IdScriptableObject {
    constructor(cx: Context);
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeMath extends IdScriptableObject {}
  class NativeMath extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeNumber extends IdScriptableObject {}
  class NativeNumber extends IdScriptableObject {
    static readonly MAX_SAFE_INTEGER: number;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    get typeOf(): MemberType;
    toString(): string;
  }


  interface NativeObject extends Map, DataObject, IdScriptableObject {}
  class NativeObject extends Map {
    readonly factory: ContextFactory;
    constructor(factory: ContextFactory);
    clear(): void;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    createDataObject<T>(instanceFactory: Supplier<T>, cx: Context): T;
    createDataObjectList<T>(instanceFactory: Supplier<T>, cx: Context): T[];
    entrySet(): Set<map_Entry<any, any>>;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get(key: any): any;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: any): any;
    get className(): string;
    isDataObjectList(): boolean;
    keySet(): Set<any>;
    put(key: any, value: any): any;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    putAll(m: Map): void;
    remove(key: any): any;
    toString(): string;
    values(): Collection<any>;
  }


  interface NativeSet extends IdScriptableObject {}
  class NativeSet extends IdScriptableObject {
    constructor(cx: Context);
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeString extends Wrapper, IdScriptableObject {}
  class NativeString extends Wrapper {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, key: any): any;
    get className(): string;
    get typeOf(): MemberType;
    getAttributes(cx: Context, index: number): number;
    getAttributes(cx: Context, name: string): number;
    getAttributes(cx: Context, key: Symbol): number;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    toCharSequence(): CharSequence;
    toString(): string;
    unwrap(): any;
  }


  interface NativeStringIterator extends ES6Iterator {}
  class NativeStringIterator extends ES6Iterator {
    get className(): string;
  }


  interface NativeSymbol extends Symbol, IdScriptableObject {}
  class NativeSymbol extends Symbol {
    static readonly CLASS_NAME: string;
    constructor(s: NativeSymbol);
    static construct(cx: Context, scope: Scriptable, args: any[]): NativeSymbol;
    equals(x: any): boolean;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
    get typeOf(): MemberType;
    hashCode(): number;
    static init(cx: Context, scope: Scriptable, sealed: boolean): void;
    isSymbol(): boolean;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    toString(): string;
  }


  interface NativeWeakMap extends IdScriptableObject {}
  class NativeWeakMap extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeWeakSet extends IdScriptableObject {}
  class NativeWeakSet extends IdScriptableObject {
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get className(): string;
  }


  interface NativeWith extends Scriptable, SymbolScriptable, IdFunctionCall {}
  class NativeWith extends Scriptable {
    delete(cx: Context, id: string): void;
    delete(cx: Context, key: Symbol): void;
    delete(cx: Context, index: number): void;
    execIdCall(f: IdFunctionObject, cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    get(cx: Context, id: string, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get className(): string;
    get parentScope(): Scriptable;
    getDefaultValue(cx: Context, typeHint: DefaultValueTypeHint): any;
    getIds(cx: Context): any[];
    getPrototype(cx: Context): Scriptable;
    has(cx: Context, id: string, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    hasInstance(cx: Context, value: Scriptable): boolean;
    put(cx: Context, id: string, start: Scriptable, value: any): void;
    put(cx: Context, symbol: Symbol, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    set parentScope(parent: Scriptable);
    setPrototype(prototype: Scriptable): void;
  }


  interface Node extends Iterable<Node> {}
  class Node extends Iterable<Node> {
    static readonly FUNCTION_PROP: number;
    static readonly LOCAL_PROP: number;
    static readonly LOCAL_BLOCK_PROP: number;
    static readonly REGEXP_PROP: number;
    static readonly CASEARRAY_PROP: number;
    static readonly TARGETBLOCK_PROP: number;
    static readonly VARIABLE_PROP: number;
    static readonly ISNUMBER_PROP: number;
    static readonly DIRECTCALL_PROP: number;
    static readonly SPECIALCALL_PROP: number;
    static readonly SKIP_INDEXES_PROP: number;
    static readonly OBJECT_IDS_PROP: number;
    static readonly INCRDECR_PROP: number;
    static readonly CATCH_SCOPE_PROP: number;
    static readonly LABEL_ID_PROP: number;
    static readonly MEMBER_TYPE_PROP: number;
    static readonly NAME_PROP: number;
    static readonly CONTROL_BLOCK_PROP: number;
    static readonly PARENTHESIZED_PROP: number;
    static readonly GENERATOR_END_PROP: number;
    static readonly DESTRUCTURING_ARRAY_LENGTH: number;
    static readonly DESTRUCTURING_NAMES: number;
    static readonly DESTRUCTURING_PARAMS: number;
    static readonly JSDOC_PROP: number;
    static readonly EXPRESSION_CLOSURE_PROP: number;
    static readonly DESTRUCTURING_SHORTHAND: number;
    static readonly ARROW_FUNCTION_PROP: number;
    static readonly TEMPLATE_LITERAL_PROP: number;
    static readonly LAST_PROP: number;
    static readonly BOTH: number;
    static readonly LEFT: number;
    static readonly RIGHT: number;
    static readonly NON_SPECIALCALL: number;
    static readonly SPECIALCALL_EVAL: number;
    static readonly SPECIALCALL_WITH: number;
    static readonly DECR_FLAG: number;
    static readonly POST_FLAG: number;
    static readonly PROPERTY_FLAG: number;
    static readonly ATTRIBUTE_FLAG: number;
    static readonly DESCENDANTS_FLAG: number;
    static readonly END_UNREACHED: number;
    static readonly END_DROPS_OFF: number;
    static readonly END_RETURNS: number;
    static readonly END_RETURNS_VALUE: number;
    static readonly END_YIELDS: number;
    constructor(nodeType: number);

    constructor(nodeType: number, child: Node);

    constructor(nodeType: number, left: Node, right: Node);

    constructor(nodeType: number, left: Node, mid: Node, right: Node);

    constructor(nodeType: number, line: number);

    constructor(nodeType: number, child: Node, line: number);

    constructor(nodeType: number, left: Node, right: Node, line: number);

    constructor(nodeType: number, left: Node, mid: Node, right: Node, line: number);
    addChildAfter(newChild: Node, node: Node): void;
    addChildBefore(newChild: Node, node: Node): void;
    addChildToBack(child: Node): void;
    addChildToFront(child: Node): void;
    addChildrenToBack(children: Node): void;
    addChildrenToFront(children: Node): void;
    get double(): number;
    get firstChild(): Node;
    get jsDoc(): string;
    get jsDocNode(): Comment;
    get lastChild(): Node;
    get lastSibling(): Node;
    get lineno(): number;
    get next(): Node;
    get scope(): Scope;
    get string(): string;
    get type(): number;
    getChildBefore(child: Node): Node;
    getExistingIntProp(propType: number): number;
    getIntProp(propType: number, defaultValue: number): number;
    getProp(propType: number): any;
    hasChildren(): boolean;
    hasConsistentReturnUsage(): boolean;
    hasSideEffects(): boolean;
    iterator(): Iterator<Node>;
    labelId(): number;
    labelId(labelId: number): void;
    static newNumber(number: number): Node;
    static newString(str: string): Node;
    static newString(type: number, str: string): Node;
    static newTarget(): Node;
    putIntProp(propType: number, prop: number): void;
    putProp(propType: number, prop: any): void;
    removeChild(child: Node): void;
    removeChildren(): void;
    removeProp(propType: number): void;
    replaceChild(child: Node, newChild: Node): void;
    replaceChildAfter(prevChild: Node, newChild: Node): void;
    resetTargets(): void;
    set double(number: number);
    set jsDocNode(jsdocNode: Comment);
    set lineno(lineno: number);
    set scope(s: Scope);
    set string(s: string);
    set type(type: number);
    toString(): string;
  }


  class NodeTransformer {
    transform(tree: ScriptNode, env: CompilerEnvirons): void;
    transform(tree: ScriptNode, inStrictMode: boolean, env: CompilerEnvirons): void;
  }


  class ObjArray {
    add(value: any): void;
    add(index: number, value: any): void;
    clear(): void;
    get(index: number): any;
    indexOf(obj: any): number;
    isEmpty(): boolean;
    isSealed(): boolean;
    lastIndexOf(obj: any): number;
    peek(): any;
    pop(): any;
    push(value: any): void;
    remove(index: number): void;
    seal(): void;
    set(index: number, value: any): void;
    setSize(newSize: number): void;
    size(): number;
    toArray(): any[];
    toArray(array: any[]): void;
    toArray(array: any[], offset: number): void;
  }


  class ObjToIntMap {
    constructor();

    constructor(keyCountHint: number);
    clear(): void;
    get(key: any, defaultValue: number): number;
    get keys(): any[];
    getExisting(key: any): number;
    getKeys(array: any[], offset: number): void;
    has(key: any): boolean;
    intern(keyArg: any): any;
    isEmpty(): boolean;
    newIterator(): dev_latvian_mods_rhino_objtointmap_Iterator;
    put(key: any, value: number): void;
    remove(key: any): void;
    size(): number;
  }


  class Parser {
    static readonly ARGC_LIMIT: number;
    static readonly CLEAR_TI_MASK: number;
    static readonly TI_AFTER_EOL: number;
    static readonly TI_CHECK_LABEL: number;
    constructor(cx: Context);

    constructor(cx: Context, compilerEnv: CompilerEnvirons);

    constructor(cx: Context, compilerEnv: CompilerEnvirons, errorReporter: ErrorReporter);
    eof(): boolean;
    inUseStrictDirective(): boolean;
    parse(sourceString: string, sourceURI: string, lineno: number): AstRoot;
    setDefaultUseStrictDirective(useStrict: boolean): void;
  }


  class Ref {
    delete(cx: Context): boolean;
    get(var1: Context): any;
    has(cx: Context): boolean;
    set(var1: Context, var2: any): any;
    set(cx: Context, scope: Scriptable, value: any): any;
  }


  interface RefCallable extends Callable {}
  class RefCallable extends Callable {
    refCall(var1: Context, var2: Scriptable, var3: any[]): Ref;
  }


  class ResolvedOverload {
    equals(other: any): boolean;
    hashCode(): number;
  }


  interface RhinoException extends RuntimeException {}
  class RhinoException extends RuntimeException {
    columnNumber(): number;
    details(): string;
    get message(): string;
    get scriptStack(): ScriptStackElement[];
    get scriptStackTrace(): string;
    getScriptStack(limit: number, hideFunction: string): ScriptStackElement[];
    getScriptStackTrace(limit: number, functionName: string): string;
    initColumnNumber(columnNumber: number): void;
    initLineNumber(lineNumber: number): void;
    initLineSource(lineSource: string): void;
    initSourceName(sourceName: string): void;
    lineNumber(): number;
    lineSource(): string;
    printStackTrace(s: PrintWriter): void;
    printStackTrace(s: PrintStream): void;
    sourceName(): string;
  }


  class Script {
    exec(var1: Context, var2: Scriptable): any;
  }


  interface Scriptable extends IdEnumerationIterator {}
  class Scriptable extends IdEnumerationIterator {
    static readonly NOT_FOUND: any;
    delete(var1: Context, var2: string): void;
    delete(var1: Context, var2: number): void;
    enumerationIteratorHasNext(cx: Context, currentId: Consumer<any>): boolean;
    enumerationIteratorNext(cx: Context, currentId: Consumer<any>): boolean;
    get(var1: Context, var2: string, var3: Scriptable): any;
    get(var1: Context, var2: number, var3: Scriptable): any;
    get className(): string;
    get parentScope(): Scriptable;
    get typeOf(): MemberType;
    getAllIds(cx: Context): any[];
    getDefaultValue(var1: Context, var2: DefaultValueTypeHint): any;
    getIds(var1: Context): any[];
    getPrototype(var1: Context): Scriptable;
    has(var1: Context, var2: string, var3: Scriptable): boolean;
    has(var1: Context, var2: number, var3: Scriptable): boolean;
    hasInstance(var1: Context, var2: Scriptable): boolean;
    put(var1: Context, var2: string, var3: Scriptable, var4: any): void;
    put(var1: Context, var2: number, var3: Scriptable, var4: any): void;
    set parentScope(var1: Scriptable);
    setPrototype(var1: Scriptable): void;
  }


  interface ScriptableObject extends Scriptable, SymbolScriptable, ConstProperties {}
  class ScriptableObject extends Scriptable {
    static readonly EMPTY: number;
    static readonly READONLY: number;
    static readonly DONTENUM: number;
    static readonly PERMANENT: number;
    static readonly UNINITIALIZED_CONST: number;
    static readonly CONST: number;
    constructor();

    constructor(scope: Scriptable, prototype: Scriptable);
    associateValue(key: any, value: any): any;
    avoidObjectDetection(): boolean;
    defineConst(cx: Context, name: string, start: Scriptable): void;
    static defineConstProperty(destination: Scriptable, propertyName: string, cx: Context): void;
    defineFunctionProperties(cx: Context, names: string[], clazz: Class<any>, attributes: number): void;
    defineOwnProperties(cx: Context, props: ScriptableObject): void;
    defineOwnProperty(cx: Context, id: any, desc: ScriptableObject): void;
    static defineProperty(destination: Scriptable, propertyName: string, value: any, attributes: number, cx: Context): void;
    defineProperty(cx: Context, propertyName: string, value: any, attributes: number): void;
    defineProperty(cx: Context, key: Symbol, value: any, attributes: number): void;
    defineProperty(cx: Context, propertyName: string, clazz: Class<any>, attributes: number): void;
    defineProperty(cx: Context, propertyName: string, delegateTo: any, getter: WrappedExecutable, setter: WrappedExecutable, attributes: number): void;
    delete(cx: Context, name: string): void;
    delete(cx: Context, index: number): void;
    delete(cx: Context, key: Symbol): void;
    static deleteProperty(obj: Scriptable, name: string, cx: Context): boolean;
    static deleteProperty(obj: Scriptable, index: number, cx: Context): boolean;
    get(cx: Context, name: string, start: Scriptable): any;
    get(cx: Context, index: number, start: Scriptable): any;
    get(cx: Context, key: Symbol, start: Scriptable): any;
    get(cx: Context, key: any): any;
    get className(): string;
    get externalArrayData(): ExternalArrayData;
    get externalArrayLength(): any;
    get parentScope(): Scriptable;
    get typeOf(): MemberType;
    getAllIds(cx: Context): any[];
    static getArrayPrototype(scope: Scriptable, cx: Context): Scriptable;
    getAssociatedValue(key: any): any;
    getAttributes(cx: Context, name: string): number;
    getAttributes(cx: Context, index: number): number;
    getAttributes(cx: Context, sym: Symbol): number;
    static getClassPrototype(scope: Scriptable, className: string, cx: Context): Scriptable;
    static getDefaultValue(object: Scriptable, typeHint: DefaultValueTypeHint, cx: Context): any;
    getDefaultValue(cx: Context, typeHint: DefaultValueTypeHint): any;
    static getFunctionPrototype(scope: Scriptable, cx: Context): Scriptable;
    static getGeneratorFunctionPrototype(scope: Scriptable, cx: Context): Scriptable;
    getGetterOrSetter(name: string, index: number, isSetter: boolean): any;
    getIds(cx: Context): any[];
    static getObjectPrototype(scope: Scriptable, cx: Context): Scriptable;
    static getProperty(obj: Scriptable, name: string, cx: Context): any;
    static getProperty(obj: Scriptable, key: Symbol, cx: Context): any;
    static getProperty(obj: Scriptable, index: number, cx: Context): any;
    static getPropertyIds(cx: Context, obj: Scriptable): any[];
    getPrototype(cx: Context): Scriptable;
    static getTopLevelScope(obj: Scriptable): Scriptable;
    static getTopScopeValue(scope: Scriptable, key: any, cx: Context): any;
    has(cx: Context, name: string, start: Scriptable): boolean;
    has(cx: Context, index: number, start: Scriptable): boolean;
    has(cx: Context, key: Symbol, start: Scriptable): boolean;
    hasInstance(cx: Context, instance: Scriptable): boolean;
    static hasProperty(obj: Scriptable, name: string, cx: Context): boolean;
    static hasProperty(obj: Scriptable, index: number, cx: Context): boolean;
    static hasProperty(obj: Scriptable, key: Symbol, cx: Context): boolean;
    isConst(name: string): boolean;
    isEmpty(): boolean;
    isExtensible(): boolean;
    isSealed(cx: Context): boolean;
    preventExtensions(): void;
    put(cx: Context, name: string, start: Scriptable, value: any): void;
    put(cx: Context, index: number, start: Scriptable, value: any): void;
    put(cx: Context, key: Symbol, start: Scriptable, value: any): void;
    putConst(cx: Context, name: string, start: Scriptable, value: any): void;
    static putConstProperty(obj: Scriptable, name: string, value: any, cx: Context): void;
    static putProperty(obj: Scriptable, name: string, value: any, cx: Context): void;
    static putProperty(obj: Scriptable, key: Symbol, value: any, cx: Context): void;
    static putProperty(obj: Scriptable, index: number, value: any, cx: Context): void;
    static redefineProperty(obj: Scriptable, name: string, isConst: boolean, cx: Context): void;
    sealObject(cx: Context): void;
    set parentScope(m: Scriptable);
    setAttributes(cx: Context, name: string, attributes: number): void;
    setAttributes(cx: Context, index: number, attributes: number): void;
    setAttributes(cx: Context, key: Symbol, attributes: number): void;
    setExternalArrayData(cx: Context, array: ExternalArrayData): void;
    setGetterOrSetter(cx: Context, name: string, index: number, getterOrSetter: Callable, isSetter: boolean): void;
    setPrototype(m: Scriptable): void;
    size(): number;
  }


  class ScriptRuntime {
    static readonly EMPTY_OBJECTS: any[];
    static readonly EMPTY_STRINGS: string[];
    static readonly BooleanClass: Class;
    static readonly ByteClass: Class;
    static readonly CharacterClass: Class;
    static readonly ClassClass: Class;
    static readonly DoubleClass: Class;
    static readonly FloatClass: Class;
    static readonly IntegerClass: Class;
    static readonly LongClass: Class;
    static readonly NumberClass: Class;
    static readonly ObjectClass: Class;
    static readonly ShortClass: Class;
    static readonly StringClass: Class;
    static readonly DateClass: Class;
    static readonly ContextClass: Class;
    static readonly FunctionClass: Class;
    static readonly ScriptableObjectClass: Class;
    static readonly ScriptableClass: Class;
    static readonly NaN: number;
    static readonly NaNobj: number;
    static readonly negativeZero: number;
    static readonly zeroObj: number;
    static readonly negativeZeroObj: number;
    static readonly ENUMERATE_KEYS: number;
    static readonly ENUMERATE_VALUES: number;
    static readonly ENUMERATE_ARRAY: number;
    static readonly ENUMERATE_KEYS_NO_ITERATOR: number;
    static readonly ENUMERATE_VALUES_NO_ITERATOR: number;
    static readonly ENUMERATE_ARRAY_NO_ITERATOR: number;
    static readonly ENUMERATE_VALUES_IN_ORDER: number;
    static readonly messageProvider: MessageProvider;
    static add(cx: Context, val1: any, val2: any): any;
    static add(cx: Context, val1: CharSequence, val2: any): string;
    static add(cx: Context, val1: any, val2: CharSequence): string;
    static applyOrCall(cx: Context, scope: Scriptable, isApply: boolean, thisObj: Scriptable, args: any[]): any;
    static bind(cx: Context, scope: Scriptable, id: string): Scriptable;
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    static callIterator(cx: Context, scope: Scriptable, obj: any): any;
    static callRef(cx: Context, thisObj: Scriptable, functionParameter: Callable, args: any[]): Ref;
    static callSpecial(cx: Context, scope: Scriptable, fun: Callable, thisObj: Scriptable, args: any[], callerThis: Scriptable, callType: number, filename: string, lineNumber: number): any;
    static cmp_LE(cx: Context, val1: any, val2: any): boolean;
    static cmp_LT(cx: Context, val1: any, val2: any): boolean;
    static constructError(cx: Context, error: string, message: string): EcmaError;
    static constructError(cx: Context, error: string, message: string, lineNumberDelta: number): EcmaError;
    static constructError(cx: Context, error: string, message: string, sourceName: string, lineNumber: number, lineSource: string, columnNumber: number): EcmaError;
    static createArrowFunctionActivation(cx: Context, scope: Scriptable, funObj: NativeFunction, args: any[], isStrict: boolean): Scriptable;
    static createFunctionActivation(cx: Context, scope: Scriptable, funObj: NativeFunction, args: any[], isStrict: boolean): Scriptable;
    static delete(cx: Context, scope: Scriptable, obj: any, id: any, isName: boolean): any;
    static deleteObjectElem(cx: Context, target: Scriptable, elem: any): boolean;
    static elemIncrDecr(cx: Context, obj: any, index: any, scope: Scriptable, incrDecrMask: number): any;
    static enterActivationFunction(cx: Context, scope: Scriptable): void;
    static enterDotQuery(value: any, scope: Scriptable, cx: Context): Scriptable;
    static enterWith(cx: Context, scope: Scriptable, obj: any): Scriptable;
    static enumInit(cx: Context, scope: Scriptable, value: any, enumType: number): IdEnumeration;
    static eq(cx: Context, x: any, y: any): boolean;
    static errorWithClassName(msg: string, val: any, cx: Context): RuntimeException;
    static escapeAndWrapString(s: string): string;
    static escapeString(s: string, escapeQuote: string): string;
    static evalSpecial(cx: Context, scope: Scriptable, thisArg: any, args: any[], filename: string, lineNumber: number): any;
    static exitActivationFunction(cx: Context): void;
    get length(): number;
    static getArrayElements(cx: Context, object: Scriptable): any[];
    static getElemFunctionAndThis(cx: Context, scope: Scriptable, obj: any, elem: any): Callable;
    static getLibraryScopeOrNull(scope: Scriptable, cx: Context): ScriptableObject;
    static getMessage(messageId: string, arguments: any[]): string;
    static getMessage0(messageId: string): string;
    static getMessage1(messageId: string, arg1: any): string;
    static getMessage2(messageId: string, arg1: any, arg2: any): string;
    static getMessage3(messageId: string, arg1: any, arg2: any, arg3: any): string;
    static getMessage4(messageId: string, arg1: any, arg2: any, arg3: any, arg4: any): string;
    static getNameFunctionAndThis(cx: Context, scope: Scriptable, name: string): Callable;
    static getObjectElem(cx: Context, scope: Scriptable, obj: any, elem: any): any;
    static getObjectElem(cx: Context, obj: Scriptable, elem: any): any;
    static getObjectIndex(cx: Context, scope: Scriptable, obj: any, dblIndex: number): any;
    static getObjectIndex(cx: Context, obj: Scriptable, index: number): any;
    static getObjectProp(cx: Context, scope: Scriptable, obj: any, property: string): any;
    static getObjectProp(cx: Context, obj: Scriptable, property: string): any;
    static getObjectPropNoWarn(cx: Context, scope: Scriptable, obj: any, property: string): any;
    static getObjectPropOptional(cx: Context, scope: Scriptable, obj: any, property: string): any;
    static getPropFunctionAndThis(cx: Context, scope: Scriptable, obj: any, property: string): Callable;
    static getTemplateLiteralCallSite(cx: Context, scope: Scriptable, strings: any[], index: number): Scriptable;
    static getTopLevelProp(cx: Context, scope: Scriptable, id: string): any;
    static getValueFunctionAndThis(cx: Context, value: any): Callable;
    static hasObjectElem(cx: Context, target: Scriptable, elem: any): boolean;
    static in(cx: Context, a: any, b: any): boolean;
    static indexFromString(str: string): number;
    static initFunction(cx: Context, scope: Scriptable, functionParameter: NativeFunction, type: number, fromEvalCode: boolean): void;
    static initSafeStandardObjects(cx: Context, scope: ScriptableObject, sealed: boolean): ScriptableObject;
    static initScript(cx: Context, scope: Scriptable, funObj: NativeFunction, thisObj: Scriptable, evalScript: boolean): void;
    static initStandardObjects(cx: Context, scope: ScriptableObject, sealed: boolean): ScriptableObject;
    static instanceOf(cx: Context, a: any, b: any): boolean;
    static isArrayObject(obj: any): boolean;
    static isIteratorDone(cx: Context, result: any): boolean;
    static isJSLineTerminator(c: number): boolean;
    static isJSWhitespaceOrLineTerminator(c: number): boolean;
    static isNaN(n: any): boolean;
    static isObject(value: any): boolean;
    static isPrimitive(obj: any): boolean;
    static isRhinoRuntimeType(cl: Class<any>): boolean;
    static jsDelegatesTo(cx: Context, lhs: Scriptable, rhs: Scriptable): boolean;
    static lastUint32Result(cx: Context): number;
    static leaveDotQuery(scope: Scriptable): Scriptable;
    static leaveWith(scope: Scriptable): Scriptable;
    static name(cx: Context, scope: Scriptable, name: string): any;
    static nameIncrDecr(cx: Context, scopeChain: Scriptable, id: string, incrDecrMask: number): any;
    static newArrayLiteral(cx: Context, scope: Scriptable, objects: any[], skipIndices: number[]): Scriptable;
    static newBuiltinObject(cx: Context, scope: Scriptable, type: Builtins, args: any[]): Scriptable;
    static newCatchScope(cx: Context, scope: Scriptable, t: Throwable, lastCatchScope: Scriptable, exceptionName: string): Scriptable;
    static newObject(cx: Context, scope: Scriptable, constructorName: string, args: any[]): Scriptable;
    static newObject(fun: any, cx: Context, scope: Scriptable, args: any[]): Scriptable;
    static newObjectLiteral(cx: Context, scope: Scriptable, propertyIds: any[], propertyValues: any[], getterSetters: number[]): Scriptable;
    static newSpecial(cx: Context, scope: Scriptable, fun: any, args: any[], callType: number): any;
    static notFoundError(cx: Context, object: Scriptable, property: string): RuntimeException;
    static notFunctionError(cx: Context, value: any): RuntimeException;
    static notFunctionError(cx: Context, value: any, messageHelper: any): RuntimeException;
    static notFunctionError(cx: Context, obj: any, value: any, propertyName: string): RuntimeException;
    static numberToString(cx: Context, d: number, base: number): string;
    static padArguments(args: any[], count: number): any[];
    static propIncrDecr(cx: Context, scope: Scriptable, obj: any, id: string, incrDecrMask: number): any;
    static rangeError(cx: Context, message: string): EcmaError;
    static refDel(cx: Context, ref: Ref): any;
    static refGet(cx: Context, ref: Ref): any;
    static refIncrDecr(cx: Context, scope: Scriptable, ref: Ref, incrDecrMask: number): any;
    static refSet(cx: Context, scope: Scriptable, ref: Ref, value: any): any;
    static same(cx: Context, x: any, y: any): boolean;
    static sameZero(cx: Context, x: any, y: any): boolean;
    static setBuiltinProtoAndParent(cx: Context, scope: Scriptable, object: ScriptableObject, type: Builtins): void;
    static setConst(cx: Context, bound: Scriptable, value: any, id: string): any;
    static setFunctionProtoAndParent(cx: Context, scope: Scriptable, fn: BaseFunction): void;
    static setFunctionProtoAndParent(cx: Context, scope: Scriptable, fn: BaseFunction, es6GeneratorFunction: boolean): void;
    static setName(cx: Context, scope: Scriptable, bound: Scriptable, value: any, id: string): any;
    static setObjectElem(cx: Context, scope: Scriptable, obj: any, elem: any, value: any): any;
    static setObjectElem(cx: Context, obj: Scriptable, elem: any, value: any): any;
    static setObjectIndex(cx: Context, scope: Scriptable, obj: any, dblIndex: number, value: any): any;
    static setObjectIndex(cx: Context, obj: Scriptable, index: number, value: any): any;
    static setObjectProp(cx: Context, scope: Scriptable, obj: any, property: string, value: any): any;
    static setObjectProp(cx: Context, obj: Scriptable, property: string, value: any): any;
    static setObjectProtoAndParent(cx: Context, scope: Scriptable, object: ScriptableObject): void;
    static setRegExpProxy(cx: Context, proxy: RegExp): void;
    static shallowEq(cx: Context, x: any, y: any): boolean;
    static specialRef(cx: Context, scope: Scriptable, obj: any, specialProperty: string): Ref;
    static storeUint32Result(cx: Context, value: number): void;
    static strictSetName(cx: Context, scope: Scriptable, bound: Scriptable, value: any, id: string): any;
    static testUint32String(str: string): number;
    static throwCustomError(cx: Context, scope: Scriptable, constructorName: string, message: string): JavaScriptException;
    static throwError(cx: Context, scope: Scriptable, message: string): JavaScriptException;
    static toBoolean(cx: Context, val: any): boolean;
    static toCharSequence(cx: Context, val: any): CharSequence;
    static toInt32(cx: Context, val: any): number;
    static toInt32(cx: Context, args: any[], index: number): number;
    static toInt32(d: number): number;
    static toInteger(cx: Context, val: any): number;
    static toInteger(d: number): number;
    static toInteger(cx: Context, args: any[], index: number): number;
    static toIterator(cx: Context, scope: Scriptable, obj: Scriptable, keyOnly: boolean): Scriptable;
    static toLength(cx: Context, args: any[], index: number): number;
    static toNumber(cx: Context, val: any): number;
    static toNumber(cx: Context, args: any[], index: number): number;
    static toNumber(cx: Context, s: string): number;
    static toObject(cx: Context, scope: Scriptable, val: any): Scriptable;
    static toObjectOrNull(cx: Context, obj: any): Scriptable;
    static toObjectOrNull(cx: Context, obj: any, scope: Scriptable): Scriptable;
    static toPrimitive(cx: Context, val: any): any;
    static toPrimitive(cx: Context, val: any, typeHint: DefaultValueTypeHint): any;
    static toString(cx: Context, val: any): string;
    static toString(cx: Context, args: any[], index: number): string;
    static toString(cx: Context, val: number): string;
    static toUint16(cx: Context, val: any): string;
    static toUint32(d: number): number;
    static toUint32(cx: Context, val: any): number;
    static typeError(cx: Context, message: string): EcmaError;
    static typeError0(cx: Context, messageId: string): EcmaError;
    static typeError1(cx: Context, messageId: string, arg1: any): EcmaError;
    static typeError2(cx: Context, messageId: string, arg1: any, arg2: any): EcmaError;
    static typeError3(cx: Context, messageId: string, arg1: string, arg2: string, arg3: string): EcmaError;
    static typeErrorThrower(cx: Context): BaseFunction;
    static typeof(cx: Context, value: any): MemberType;
    static typeofName(cx: Context, scope: Scriptable, id: string): MemberType;
    static undefCallError(cx: Context, object: any, id: any): RuntimeException;
    static undefReadError(cx: Context, object: any, id: any): RuntimeException;
    static undefWriteError(cx: Context, object: any, id: any, value: any): RuntimeException;
    static updateDotQuery(value: boolean, scope: Scriptable): any;
    static wrapException(cx: Context, scope: Scriptable, t: Throwable): Scriptable;
    static wrapNumber(x: number): Number;
    static wrapRegExp(cx: Context, scope: Scriptable, compiled: any): Scriptable;
  }


  class ScriptRuntimeES6 {
    static requireObjectCoercible(cx: Context, val: any, idFuncObj: IdFunctionObject): any;
  }


  class ScriptStackElement {
    readonly fileName: string;
    readonly functionName: string;
    readonly lineNumber: number;
    constructor(fileName: string, functionName: string, lineNumber: number);
    renderJavaStyle(sb: StringBuilder): void;
    renderMozillaStyle(sb: StringBuilder): void;
    toString(): string;
  }


  interface SlotMap extends Iterable<Slot> {}
  class SlotMap extends Iterable<Slot> {
    addSlot(var1: Slot): void;
    get(var1: any, var2: number, var3: SlotAccess): Slot;
    isEmpty(): boolean;
    query(var1: any, var2: number): Slot;
    remove(var1: any, var2: number, var3: Context): void;
    size(): number;
  }


  interface SlotMapContainer extends SlotMap {}
  class SlotMapContainer extends SlotMap {
    addSlot(newSlot: Slot): void;
    dirtySize(): number;
    get(key: any, index: number, accessType: SlotAccess): Slot;
    isEmpty(): boolean;
    iterator(): Iterator<Slot>;
    query(key: any, index: number): Slot;
    readLock(): number;
    remove(key: any, index: number, cx: Context): void;
    size(): number;
    unlockRead(stamp: number): void;
  }


  class Sorting {
    static get (): Sorting;
    hybridSort(a: any[], cmp: Comparator<any>): void;
    insertionSort(a: any[], cmp: Comparator<any>): void;
    median(a: any[], start: number, end: number, cmp: Comparator<any>): number;
  }


  interface SpecialRef extends Ref {}
  class SpecialRef extends Ref {
    delete(cx: Context): boolean;
    get(cx: Context): any;
    has(cx: Context): boolean;
    set(cx: Context, value: any): any;
    set(cx: Context, scope: Scriptable, value: any): any;
  }


  class Symbol {
  }


  interface SymbolKey extends Symbol {}
  class SymbolKey extends Symbol {
    static readonly ITERATOR: SymbolKey;
    static readonly TO_STRING_TAG: SymbolKey;
    static readonly SPECIES: SymbolKey;
    static readonly HAS_INSTANCE: SymbolKey;
    static readonly IS_CONCAT_SPREADABLE: SymbolKey;
    static readonly IS_REGEXP: SymbolKey;
    static readonly TO_PRIMITIVE: SymbolKey;
    static readonly MATCH: SymbolKey;
    static readonly REPLACE: SymbolKey;
    static readonly SEARCH: SymbolKey;
    static readonly SPLIT: SymbolKey;
    static readonly UNSCOPABLES: SymbolKey;
    constructor(name: string);
    equals(o: any): boolean;
    get name(): string;
    hashCode(): number;
    toString(): string;
  }


  class SymbolScriptable {
    delete(var1: Context, var2: Symbol): void;
    get(var1: Context, var2: Symbol, var3: Scriptable): any;
    has(var1: Context, var2: Symbol, var3: Scriptable): boolean;
    put(var1: Context, var2: Symbol, var3: Scriptable, var4: any): void;
  }


  class Token {
    static readonly ERROR: number;
    static readonly EOF: number;
    static readonly EOL: number;
    static readonly FIRST_BYTECODE_TOKEN: number;
    static readonly ENTERWITH: number;
    static readonly LEAVEWITH: number;
    static readonly RETURN: number;
    static readonly GOTO: number;
    static readonly IFEQ: number;
    static readonly IFNE: number;
    static readonly SETNAME: number;
    static readonly BITOR: number;
    static readonly BITXOR: number;
    static readonly BITAND: number;
    static readonly EQ: number;
    static readonly NE: number;
    static readonly LT: number;
    static readonly LE: number;
    static readonly GT: number;
    static readonly GE: number;
    static readonly LSH: number;
    static readonly RSH: number;
    static readonly URSH: number;
    static readonly ADD: number;
    static readonly SUB: number;
    static readonly MUL: number;
    static readonly DIV: number;
    static readonly MOD: number;
    static readonly NOT: number;
    static readonly BITNOT: number;
    static readonly POS: number;
    static readonly NEG: number;
    static readonly NEW: number;
    static readonly DELPROP: number;
    static readonly TYPEOF: number;
    static readonly GETPROP: number;
    static readonly GETPROPNOWARN: number;
    static readonly SETPROP: number;
    static readonly GETELEM: number;
    static readonly SETELEM: number;
    static readonly CALL: number;
    static readonly NAME: number;
    static readonly NUMBER: number;
    static readonly STRING: number;
    static readonly NULL: number;
    static readonly THIS: number;
    static readonly FALSE: number;
    static readonly TRUE: number;
    static readonly SHEQ: number;
    static readonly SHNE: number;
    static readonly REGEXP: number;
    static readonly BINDNAME: number;
    static readonly THROW: number;
    static readonly RETHROW: number;
    static readonly IN: number;
    static readonly INSTANCEOF: number;
    static readonly LOCAL_LOAD: number;
    static readonly GETVAR: number;
    static readonly SETVAR: number;
    static readonly CATCH_SCOPE: number;
    static readonly ENUM_INIT_KEYS: number;
    static readonly ENUM_INIT_VALUES: number;
    static readonly ENUM_INIT_ARRAY: number;
    static readonly ENUM_INIT_VALUES_IN_ORDER: number;
    static readonly ENUM_NEXT: number;
    static readonly ENUM_ID: number;
    static readonly THISFN: number;
    static readonly RETURN_RESULT: number;
    static readonly ARRAYLIT: number;
    static readonly OBJECTLIT: number;
    static readonly GET_REF: number;
    static readonly SET_REF: number;
    static readonly DEL_REF: number;
    static readonly REF_CALL: number;
    static readonly REF_SPECIAL: number;
    static readonly YIELD: number;
    static readonly STRICT_SETNAME: number;
    static readonly NULLISH_COALESCING: number;
    static readonly POW: number;
    static readonly OPTIONAL_CHAINING: number;
    static readonly GETOPTIONAL: number;
    static readonly LAST_BYTECODE_TOKEN: number;
    static readonly TRY: number;
    static readonly SEMI: number;
    static readonly LB: number;
    static readonly RB: number;
    static readonly LC: number;
    static readonly RC: number;
    static readonly LP: number;
    static readonly RP: number;
    static readonly COMMA: number;
    static readonly ASSIGN: number;
    static readonly ASSIGN_BITOR: number;
    static readonly ASSIGN_BITXOR: number;
    static readonly ASSIGN_BITAND: number;
    static readonly ASSIGN_LSH: number;
    static readonly ASSIGN_RSH: number;
    static readonly ASSIGN_URSH: number;
    static readonly ASSIGN_ADD: number;
    static readonly ASSIGN_SUB: number;
    static readonly ASSIGN_MUL: number;
    static readonly ASSIGN_DIV: number;
    static readonly ASSIGN_MOD: number;
    static readonly FIRST_ASSIGN: number;
    static readonly LAST_ASSIGN: number;
    static readonly HOOK: number;
    static readonly COLON: number;
    static readonly OR: number;
    static readonly AND: number;
    static readonly INC: number;
    static readonly DEC: number;
    static readonly DOT: number;
    static readonly FUNCTION: number;
    static readonly EXPORT: number;
    static readonly IMPORT: number;
    static readonly IF: number;
    static readonly ELSE: number;
    static readonly SWITCH: number;
    static readonly CASE: number;
    static readonly DEFAULT: number;
    static readonly WHILE: number;
    static readonly DO: number;
    static readonly FOR: number;
    static readonly BREAK: number;
    static readonly CONTINUE: number;
    static readonly VAR: number;
    static readonly WITH: number;
    static readonly CATCH: number;
    static readonly FINALLY: number;
    static readonly VOID: number;
    static readonly RESERVED: number;
    static readonly EMPTY: number;
    static readonly BLOCK: number;
    static readonly LABEL: number;
    static readonly TARGET: number;
    static readonly LOOP: number;
    static readonly EXPR_VOID: number;
    static readonly EXPR_RESULT: number;
    static readonly JSR: number;
    static readonly SCRIPT: number;
    static readonly TYPEOFNAME: number;
    static readonly USE_STACK: number;
    static readonly SETPROP_OP: number;
    static readonly SETELEM_OP: number;
    static readonly LOCAL_BLOCK: number;
    static readonly SET_REF_OP: number;
    static readonly TO_OBJECT: number;
    static readonly TO_DOUBLE: number;
    static readonly GET: number;
    static readonly SET: number;
    static readonly LET: number;
    static readonly CONST: number;
    static readonly SETCONST: number;
    static readonly SETCONSTVAR: number;
    static readonly ARRAYCOMP: number;
    static readonly LETEXPR: number;
    static readonly WITHEXPR: number;
    static readonly COMMENT: number;
    static readonly GENEXPR: number;
    static readonly METHOD: number;
    static readonly ARROW: number;
    static readonly YIELD_STAR: number;
    static readonly TEMPLATE_LITERAL: number;
    static readonly TEMPLATE_CHARS: number;
    static readonly TEMPLATE_LITERAL_SUBST: number;
    static readonly TAGGED_TEMPLATE_LITERAL: number;
    static readonly LAST_TOKEN: number;
    static isValidToken(code: number): boolean;
    static name(token: number): string;
    static typeToName(token: number): string;
  }


  class TokenStream {
    get commentType(): CommentType;
    get cursor(): number;
    get tokenBeg(): number;
    get tokenEnd(): number;
    get tokenLength(): number;
  }


  interface TopLevel extends IdScriptableObject {}
  class TopLevel extends IdScriptableObject {
    cacheBuiltins(scope: Scriptable, sealed: boolean, cx: Context): void;
    get className(): string;
    static getBuiltinCtor(cx: Context, scope: Scriptable, type: Builtins): Function;
    getBuiltinCtor(type: Builtins): BaseFunction;
    static getBuiltinPrototype(scope: Scriptable, type: Builtins, cx: Context): Scriptable;
    getBuiltinPrototype(cx: Context, type: Builtins): Scriptable;
  }


  class UintMap {
    constructor();

    constructor(initialCapacity: number);
    clear(): void;
    get keys(): number[];
    getExistingInt(key: number): number;
    getInt(key: number, defaultValue: number): number;
    getObject(key: number): any;
    has(key: number): boolean;
    isEmpty(): boolean;
    put(key: number, value: any): void;
    put(key: number, value: number): void;
    remove(key: number): void;
    size(): number;
  }


  class Undefined {
    static readonly SCRIPTABLE_INSTANCE: Scriptable;
    static readonly INSTANCE: any;
    equals(obj: any): boolean;
    hashCode(): number;
    static isUndefined(obj: any): boolean;
    toString(): string;
  }


  class UniqueTag {
    static readonly NOT_FOUND: UniqueTag;
    static readonly NULL_VALUE: UniqueTag;
    static readonly DOUBLE_MARK: UniqueTag;
    toString(): string;
  }


  class VMBridge {
    static getInterfaceProxyHelper(cx: Context, interfaces: Class<any>): any;
    static newInterfaceProxy(proxyHelper: any, adapter: InterfaceAdapter, target: any, topScope: Scriptable, cx: Context): any;
    static tryToMakeAccessible(target: any, accessible: AccessibleObject): boolean;
  }


  interface WrappedException extends EvaluatorException {}
  class WrappedException extends EvaluatorException {
    constructor(cx: Context, exception: Throwable);
    get wrappedException(): Throwable;
  }


  class WrappedExecutable {
    construct(cx: Context, scope: Scriptable, args: any[]): any;
    get returnType(): TypeInfo;
    invoke(var1: Context, var2: Scriptable, var3: any, var4: any[]): any;
    isStatic(): boolean;
    unwrap(): CachedExecutableInfo;
  }


  class Wrapper {
    unwrap(): any;
    static unwrapped(o: any): any;
  }

}

declare module 'dev.latvian.mods.rhino.ast' {
  import { List, SortedSet, Map } from 'java.util';
  import { Node, Context, EvaluatorException, ErrorReporter } from 'dev.latvian.mods.rhino';
  import { Comparable, RuntimeException } from 'java.lang';
  import { CommentType } from 'dev.latvian.mods.rhino.Token';
  import { Type } from 'dev.latvian.mods.rhino.ast.ParseProblem';

  interface ArrayComprehension extends Scope {}
  class ArrayComprehension extends Scope {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addLoop(acl: ArrayComprehensionLoop): void;
    get filter(): AstNode;
    get filterLp(): number;
    get filterRp(): number;
    get ifPosition(): number;
    get loops(): ArrayComprehensionLoop[];
    get result(): AstNode;
    set filter(filter: AstNode);
    set filterLp(lp: number);
    set filterRp(rp: number);
    set ifPosition(ifPosition: number);
    set loops(loops: ArrayComprehensionLoop[]);
    set result(result: AstNode);
  }


  interface ArrayComprehensionLoop extends ForInLoop {}
  class ArrayComprehensionLoop extends ForInLoop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get body(): AstNode;
    set body(body: AstNode);
  }


  interface ArrayLiteral extends DestructuringForm, AstNode {}
  class ArrayLiteral extends DestructuringForm {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addElement(element: AstNode): void;
    get destructuringLength(): number;
    get elements(): AstNode[];
    get size(): number;
    get skipCount(): number;
    getElement(index: number): AstNode;
    isDestructuring(): boolean;
    set destructuringLength(destructuringLength: number);
    set elements(elements: AstNode[]);
    set skipCount(count: number);
    setIsDestructuring(destructuring: boolean): void;
  }


  interface Assignment extends InfixExpression {}
  class Assignment extends InfixExpression {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, left: AstNode, right: AstNode);

    constructor(left: AstNode, right: AstNode);

    constructor(operator: number, left: AstNode, right: AstNode, operatorPos: number);
  }


  interface AstNode extends Comparable<AstNode>, Node {}
  class AstNode extends Comparable<AstNode> {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addChild(kid: AstNode): void;
    static codeBug(): RuntimeException;
    compareTo(other: AstNode): number;
    depth(): number;
    get absolutePosition(): number;
    get astRoot(): AstRoot;
    get enclosingFunction(): FunctionNode;
    get enclosingScope(): Scope;
    get inlineComment(): AstNode;
    get length(): number;
    get lineno(): number;
    get parent(): AstNode;
    get position(): number;
    hasSideEffects(): boolean;
    set inlineComment(inlineComment: AstNode);
    set length(length: number);
    set parent(parent: AstNode);
    set position(position: number);
    setBounds(position: number, end: number): void;
    setRelative(parentPosition: number): void;
    shortName(): string;
  }


  interface AstRoot extends ScriptNode {}
  class AstRoot extends ScriptNode {
    constructor();

    constructor(pos: number);
    addComment(comment: Comment): void;
    get comments(): SortedSet<Comment>;
    set comments(comments: SortedSet<Comment>);
  }


  class AstSymbol {
    constructor(declType: number, name: string);
    get containingTable(): Scope;
    get declType(): number;
    get declTypeName(): string;
    get index(): number;
    get name(): string;
    set containingTable(containingTable: Scope);
    set declType(declType: number);
    set index(index: number);
    set name(name: string);
    toString(): string;
  }


  interface Block extends AstNode {}
  class Block extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addStatement(statement: AstNode): void;
  }


  interface BreakStatement extends Jump {}
  class BreakStatement extends Jump {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get breakLabel(): Name;
    get breakTarget(): AstNode;
    set breakLabel(label: Name);
    set breakTarget(target: Jump);
  }


  interface CatchClause extends AstNode {}
  class CatchClause extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get body(): Block;
    get catchCondition(): AstNode;
    get ifPosition(): number;
    get lp(): number;
    get rp(): number;
    get varName(): Name;
    set body(body: Block);
    set catchCondition(catchCondition: AstNode);
    set ifPosition(ifPosition: number);
    set lp(lp: number);
    set rp(rp: number);
    set varName(varName: Name);
    setParens(lp: number, rp: number): void;
  }


  interface Comment extends AstNode {}
  class Comment extends AstNode {
    constructor(pos: number, len: number, type: CommentType, value: string);
    get commentType(): CommentType;
    get value(): string;
    set commentType(type: CommentType);
    set value(commentString: string);
  }


  interface ConditionalExpression extends AstNode {}
  class ConditionalExpression extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get colonPosition(): number;
    get falseExpression(): AstNode;
    get questionMarkPosition(): number;
    get testExpression(): AstNode;
    get trueExpression(): AstNode;
    hasSideEffects(): boolean;
    set colonPosition(colonPosition: number);
    set falseExpression(falseExpression: AstNode);
    set questionMarkPosition(questionMarkPosition: number);
    set testExpression(testExpression: AstNode);
    set trueExpression(trueExpression: AstNode);
  }


  interface ContinueStatement extends Jump {}
  class ContinueStatement extends Jump {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(label: Name);

    constructor(pos: number, label: Name);

    constructor(pos: number, len: number, label: Name);
    get label(): Name;
    get target(): Loop;
    set label(label: Name);
    set target(target: Loop);
  }


  class DestructuringForm {
    isDestructuring(): boolean;
    setIsDestructuring(var1: boolean): void;
  }


  interface DoLoop extends Loop {}
  class DoLoop extends Loop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get condition(): AstNode;
    get whilePosition(): number;
    set condition(condition: AstNode);
    set whilePosition(whilePosition: number);
  }


  interface ElementGet extends AstNode {}
  class ElementGet extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(target: AstNode, element: AstNode);
    get element(): AstNode;
    get lb(): number;
    get rb(): number;
    get target(): AstNode;
    set element(element: AstNode);
    set lb(lb: number);
    set rb(rb: number);
    set target(target: AstNode);
    setParens(lb: number, rb: number): void;
  }


  interface EmptyExpression extends AstNode {}
  class EmptyExpression extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
  }


  interface EmptyStatement extends AstNode {}
  class EmptyStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
  }


  interface ErrorCollector extends IdeErrorReporter {}
  class ErrorCollector extends IdeErrorReporter {
    error(cx: Context, message: string, sourceName: string, line: number, lineSource: string, lineOffset: number): void;
    error(message: string, sourceName: string, fileOffset: number, length: number): void;
    get errors(): ParseProblem[];
    runtimeError(cx: Context, message: string, sourceName: string, line: number, lineSource: string, lineOffset: number): EvaluatorException;
    toString(): string;
    warning(message: string, sourceName: string, line: number, lineSource: string, lineOffset: number): void;
    warning(message: string, sourceName: string, offset: number, length: number): void;
  }


  interface ErrorNode extends AstNode {}
  class ErrorNode extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get message(): string;
    set message(message: string);
  }


  interface ExpressionStatement extends AstNode {}
  class ExpressionStatement extends AstNode {
    constructor();

    constructor(expr: AstNode, hasResult: boolean);

    constructor(expr: AstNode);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, expr: AstNode);
    get expression(): AstNode;
    hasSideEffects(): boolean;
    set expression(expression: AstNode);
    setHasResult(): void;
  }


  interface ForInLoop extends Loop {}
  class ForInLoop extends Loop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get eachPosition(): number;
    get inPosition(): number;
    get iteratedObject(): AstNode;
    getIterator(): AstNode;
    isForEach(): boolean;
    isForOf(): boolean;
    set eachPosition(eachPosition: number);
    set inPosition(inPosition: number);
    set iteratedObject(object: AstNode);
    setIsForEach(isForEach: boolean): void;
    setIsForOf(isForOf: boolean): void;
    setIterator(iterator: AstNode): void;
  }


  interface ForLoop extends Loop {}
  class ForLoop extends Loop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get condition(): AstNode;
    get increment(): AstNode;
    get initializer(): AstNode;
    set condition(condition: AstNode);
    set increment(increment: AstNode);
    set initializer(initializer: AstNode);
  }


  interface FunctionCall extends AstNode {}
  class FunctionCall extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addArgument(arg: AstNode): void;
    get arguments(): AstNode[];
    get lp(): number;
    get rp(): number;
    get target(): AstNode;
    set arguments(arguments: AstNode[]);
    set lp(lp: number);
    set rp(rp: number);
    set target(target: AstNode);
    setParens(lp: number, rp: number): void;
  }


  interface FunctionNode extends ScriptNode {}
  class FunctionNode extends ScriptNode {
    static readonly FUNCTION_STATEMENT: number;
    static readonly FUNCTION_EXPRESSION: number;
    static readonly FUNCTION_EXPRESSION_STATEMENT: number;
    static readonly ARROW_FUNCTION: number;
    constructor();

    constructor(pos: number);

    constructor(pos: number, name: Name);
    addFunction(fnNode: FunctionNode): number;
    addLiveLocals(node: Node, locals: number[]): void;
    addParam(param: AstNode): void;
    addResumptionPoint(target: Node): void;
    get body(): AstNode;
    get functionName(): Name;
    get functionType(): number;
    get liveLocals(): Map<Node, number[]>;
    get lp(): number;
    get memberExprNode(): AstNode;
    get name(): string;
    get params(): AstNode[];
    get resumptionPoints(): Node[];
    get rp(): number;
    isES6Generator(): boolean;
    isExpressionClosure(): boolean;
    isGenerator(): boolean;
    isGetterMethod(): boolean;
    isMethod(): boolean;
    isNormalMethod(): boolean;
    isParam(node: AstNode): boolean;
    isSetterMethod(): boolean;
    requiresActivation(): boolean;
    set body(body: AstNode);
    set functionName(name: Name);
    set functionType(type: number);
    set lp(lp: number);
    set memberExprNode(node: AstNode);
    set params(params: AstNode[]);
    set rp(rp: number);
    setFunctionIsGetterMethod(): void;
    setFunctionIsNormalMethod(): void;
    setFunctionIsSetterMethod(): void;
    setIsES6Generator(): void;
    setIsExpressionClosure(isExpressionClosure: boolean): void;
    setIsGenerator(): void;
    setParens(lp: number, rp: number): void;
    setRequiresActivation(): void;
  }


  interface GeneratorExpression extends Scope {}
  class GeneratorExpression extends Scope {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addLoop(acl: GeneratorExpressionLoop): void;
    get filter(): AstNode;
    get filterLp(): number;
    get filterRp(): number;
    get ifPosition(): number;
    get loops(): GeneratorExpressionLoop[];
    get result(): AstNode;
    set filter(filter: AstNode);
    set filterLp(lp: number);
    set filterRp(rp: number);
    set ifPosition(ifPosition: number);
    set loops(loops: GeneratorExpressionLoop[]);
    set result(result: AstNode);
  }


  interface GeneratorExpressionLoop extends ForInLoop {}
  class GeneratorExpressionLoop extends ForInLoop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    isForEach(): boolean;
    setIsForEach(isForEach: boolean): void;
  }


  interface IdeErrorReporter extends ErrorReporter {}
  class IdeErrorReporter extends ErrorReporter {
    error(var1: string, var2: string, var3: number, var4: number): void;
    error(var1: Context, var2: string, var3: string, var4: number, var5: string, var6: number): void;
    warning(var1: string, var2: string, var3: number, var4: number): void;
    warning(var1: string, var2: string, var3: number, var4: string, var5: number): void;
  }


  interface IfStatement extends AstNode {}
  class IfStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get condition(): AstNode;
    get elseKeyWordInlineComment(): AstNode;
    get elsePart(): AstNode;
    get elsePosition(): number;
    get lp(): number;
    get rp(): number;
    get thenPart(): AstNode;
    set condition(condition: AstNode);
    set elseKeyWordInlineComment(elseKeyWordInlineComment: AstNode);
    set elsePart(elsePart: AstNode);
    set elsePosition(elsePosition: number);
    set lp(lp: number);
    set rp(rp: number);
    set thenPart(thenPart: AstNode);
    setParens(lp: number, rp: number): void;
  }


  interface InfixExpression extends AstNode {}
  class InfixExpression extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, left: AstNode, right: AstNode);

    constructor(left: AstNode, right: AstNode);

    constructor(operator: number, left: AstNode, right: AstNode, operatorPos: number);
    get left(): AstNode;
    get operator(): number;
    get operatorPosition(): number;
    get right(): AstNode;
    hasSideEffects(): boolean;
    set left(left: AstNode);
    set operator(operator: number);
    set operatorPosition(operatorPosition: number);
    set right(right: AstNode);
    setLeftAndRight(left: AstNode, right: AstNode): void;
  }


  interface Jump extends AstNode {}
  class Jump extends AstNode {
    target: Node;
    constructor();

    constructor(nodeType: number);

    constructor(type: number, lineno: number);

    constructor(type: number, child: Node);

    constructor(type: number, child: Node, lineno: number);
    get continue(): Node;
    get default(): Node;
    get finally(): Node;
    get jumpStatement(): Jump;
    get loop(): Jump;
    set continue(continueTarget: Node);
    set default(defaultTarget: Node);
    set finally(finallyTarget: Node);
    set jumpStatement(jumpStatement: Jump);
    set loop(loop: Jump);
  }


  interface KeywordLiteral extends AstNode {}
  class KeywordLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, nodeType: number);
    isBooleanLiteral(): boolean;
    setType(nodeType: number): KeywordLiteral;
  }


  interface Label extends Jump {}
  class Label extends Jump {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, name: string);
    get name(): string;
    set name(name: string);
    toString(): string;
  }


  interface LabeledStatement extends AstNode {}
  class LabeledStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addLabel(label: Label): void;
    get firstLabel(): Label;
    get labels(): Label[];
    get statement(): AstNode;
    getLabelByName(name: string): Label;
    hasSideEffects(): boolean;
    set labels(labels: Label[]);
    set statement(statement: AstNode);
  }


  interface LetNode extends Scope {}
  class LetNode extends Scope {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get body(): AstNode;
    get lp(): number;
    get rp(): number;
    get variables(): VariableDeclaration;
    set body(body: AstNode);
    set lp(lp: number);
    set rp(rp: number);
    set variables(variables: VariableDeclaration);
    setParens(lp: number, rp: number): void;
  }


  interface Loop extends Scope {}
  class Loop extends Scope {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get body(): AstNode;
    get lp(): number;
    get rp(): number;
    set body(body: AstNode);
    set lp(lp: number);
    set rp(rp: number);
    setParens(lp: number, rp: number): void;
  }


  interface Name extends AstNode {}
  class Name extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, name: string);

    constructor(pos: number, name: string);
    get definingScope(): Scope;
    get identifier(): string;
    get scope(): Scope;
    isLocalName(): boolean;
    length(): number;
    set identifier(identifier: string);
    set scope(s: Scope);
    toString(): string;
  }


  interface NewExpression extends FunctionCall {}
  class NewExpression extends FunctionCall {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get initializer(): ObjectLiteral;
    set initializer(initializer: ObjectLiteral);
  }


  class NodeVisitor {
    visit(var1: AstNode): boolean;
  }


  interface NumberLiteral extends AstNode {}
  class NumberLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, value: string);

    constructor(pos: number, value: string, number: number);

    constructor(number: number);
    get number(): number;
    get value(): string;
    set number(value: number);
    set value(value: string);
    toString(): string;
  }


  interface ObjectLiteral extends DestructuringForm, AstNode {}
  class ObjectLiteral extends DestructuringForm {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addElement(element: ObjectProperty): void;
    get elements(): ObjectProperty[];
    isDestructuring(): boolean;
    set elements(elements: ObjectProperty[]);
    setIsDestructuring(destructuring: boolean): void;
  }


  interface ObjectProperty extends InfixExpression {}
  class ObjectProperty extends InfixExpression {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    isGetterMethod(): boolean;
    isMethod(): boolean;
    isNormalMethod(): boolean;
    isSetterMethod(): boolean;
    setIsGetterMethod(): void;
    setIsNormalMethod(): void;
    setIsSetterMethod(): void;
    setNodeType(nodeType: number): void;
  }


  interface ParenthesizedExpression extends AstNode {}
  class ParenthesizedExpression extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(expr: AstNode);

    constructor(pos: number, len: number, expr: AstNode);
    get expression(): AstNode;
    set expression(expression: AstNode);
  }


  class ParseProblem {
    constructor(type: Type, message: string, sourceName: string, offset: number, length: number);
    get fileOffset(): number;
    get length(): number;
    get message(): string;
    get sourceName(): string;
    get type(): Type;
    set fileOffset(offset: number);
    set length(length: number);
    set message(msg: string);
    set sourceName(name: string);
    set type(type: Type);
    toString(): string;
  }


  interface PropertyGet extends InfixExpression {}
  class PropertyGet extends InfixExpression {
    constructor(target: AstNode, property: Name, dotPosition: number);
    get property(): Name;
    get target(): AstNode;
    set property(property: Name);
    set target(target: AstNode);
  }


  interface RegExpLiteral extends AstNode {}
  class RegExpLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get flags(): string;
    get value(): string;
    set flags(flags: string);
    set value(value: string);
  }


  interface ReturnStatement extends AstNode {}
  class ReturnStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, returnValue: AstNode);
    get returnValue(): AstNode;
    set returnValue(returnValue: AstNode);
  }


  interface Scope extends Jump {}
  class Scope extends Jump {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addChildScope(child: Scope): void;
    clearParentScope(): void;
    get childScopes(): Scope[];
    get parentScope(): Scope;
    get statements(): AstNode[];
    get symbolTable(): Map<string, AstSymbol>;
    get top(): ScriptNode;
    getDefiningScope(name: string): Scope;
    getSymbol(name: string): AstSymbol;
    static joinScopes(source: Scope, dest: Scope): void;
    putSymbol(symbol: AstSymbol): void;
    replaceWith(newScope: Scope): void;
    set parentScope(parentScope: Scope);
    set symbolTable(table: Map<string, AstSymbol>);
    set top(top: ScriptNode);
    static splitScope(scope: Scope): Scope;
  }


  interface ScriptNode extends Scope {}
  class ScriptNode extends Scope {
    constructor();

    constructor(pos: number);
    addFunction(fnNode: FunctionNode): number;
    addRegExp(re: RegExpLiteral): void;
    addTemplateLiteral(templateLiteral: TemplateLiteral): void;
    flattenSymbolTable(flattenAllTables: boolean): void;
    get baseLineno(): number;
    get endLineno(): number;
    get functionCount(): number;
    get functions(): FunctionNode[];
    get nextTempName(): string;
    get paramAndVarConst(): boolean[];
    get paramAndVarCount(): number;
    get paramAndVarNames(): string[];
    get paramCount(): number;
    get regexpCount(): number;
    get sourceName(): string;
    get symbols(): AstSymbol[];
    get templateLiteralCount(): number;
    getFunctionNode(i: number): FunctionNode;
    getIndexForNameNode(nameNode: Node): number;
    getParamOrVarName(index: number): string;
    getRegexpFlags(index: number): string;
    getRegexpString(index: number): string;
    getTemplateLiteralStrings(index: number): TemplateCharacters[];
    isInStrictMode(): boolean;
    set baseLineno(lineno: number);
    set endLineno(lineno: number);
    set sourceName(sourceName: string);
    set symbols(symbols: AstSymbol[]);
    setInStrictMode(inStrictMode: boolean): void;
  }


  interface StringLiteral extends AstNode {}
  class StringLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get quoteCharacter(): string;
    get value(): string;
    getValue(includeQuotes: boolean): string;
    set quoteCharacter(c: string);
    set value(value: string);
    toString(): string;
  }


  interface SwitchCase extends AstNode {}
  class SwitchCase extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addStatement(statement: AstNode): void;
    get expression(): AstNode;
    get statements(): AstNode[];
    isDefault(): boolean;
    set expression(expression: AstNode);
    set statements(statements: AstNode[]);
  }


  interface SwitchStatement extends Jump {}
  class SwitchStatement extends Jump {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addCase(switchCase: SwitchCase): void;
    get cases(): SwitchCase[];
    get expression(): AstNode;
    get lp(): number;
    get rp(): number;
    set cases(cases: SwitchCase[]);
    set expression(expression: AstNode);
    set lp(lp: number);
    set rp(rp: number);
    setParens(lp: number, rp: number): void;
  }


  interface TaggedTemplateLiteral extends AstNode {}
  class TaggedTemplateLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get target(): AstNode;
    get templateLiteral(): AstNode;
    set target(target: AstNode);
    set templateLiteral(templateLiteral: AstNode);
  }


  interface TemplateCharacters extends AstNode {}
  class TemplateCharacters extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get rawValue(): string;
    get value(): string;
    set rawValue(rawValue: string);
    set value(value: string);
  }


  interface TemplateLiteral extends AstNode {}
  class TemplateLiteral extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addElement(element: AstNode): void;
    get elements(): AstNode[];
    get size(): number;
    get substitutions(): AstNode[];
    get templateStrings(): TemplateCharacters[];
    getElement(index: number): AstNode;
    set elements(elements: AstNode[]);
  }


  interface ThrowStatement extends AstNode {}
  class ThrowStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(expr: AstNode);

    constructor(pos: number, expr: AstNode);

    constructor(pos: number, len: number, expr: AstNode);
    get expression(): AstNode;
    set expression(expression: AstNode);
  }


  interface TryStatement extends AstNode {}
  class TryStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addCatchClause(clause: CatchClause): void;
    get catchClauses(): CatchClause[];
    get finallyBlock(): AstNode;
    get finallyPosition(): number;
    get tryBlock(): AstNode;
    set catchClauses(catchClauses: CatchClause[]);
    set finallyBlock(finallyBlock: AstNode);
    set finallyPosition(finallyPosition: number);
    set tryBlock(tryBlock: AstNode);
  }


  interface UnaryExpression extends AstNode {}
  class UnaryExpression extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(operator: number, operatorPosition: number, operand: AstNode);

    constructor(operator: number, operatorPosition: number, operand: AstNode, postFix: boolean);
    get operand(): AstNode;
    get operator(): number;
    isPostfix(): boolean;
    isPrefix(): boolean;
    set operand(operand: AstNode);
    set operator(operator: number);
    setIsPostfix(isPostfix: boolean): void;
  }


  interface VariableDeclaration extends AstNode {}
  class VariableDeclaration extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    addVariable(v: VariableInitializer): void;
    get variables(): VariableInitializer[];
    isConst(): boolean;
    isLet(): boolean;
    isStatement(): boolean;
    isVar(): boolean;
    set variables(variables: VariableInitializer[]);
    setIsStatement(isStatement: boolean): void;
    setType(type: number): Node;
  }


  interface VariableInitializer extends AstNode {}
  class VariableInitializer extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get initializer(): AstNode;
    get target(): AstNode;
    isDestructuring(): boolean;
    set initializer(initializer: AstNode);
    set target(target: AstNode);
    setNodeType(nodeType: number): void;
  }


  interface WhileLoop extends Loop {}
  class WhileLoop extends Loop {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get condition(): AstNode;
    set condition(condition: AstNode);
  }


  interface WithStatement extends AstNode {}
  class WithStatement extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);
    get expression(): AstNode;
    get lp(): number;
    get rp(): number;
    get statement(): AstNode;
    set expression(expression: AstNode);
    set lp(lp: number);
    set rp(rp: number);
    set statement(statement: AstNode);
    setParens(lp: number, rp: number): void;
  }


  interface Yield extends AstNode {}
  class Yield extends AstNode {
    constructor();

    constructor(pos: number);

    constructor(pos: number, len: number);

    constructor(pos: number, len: number, value: AstNode, isStar: boolean);
    get value(): AstNode;
    set value(expr: AstNode);
  }

}

declare module 'dev.latvian.mods.rhino.ast.AstNode' {
  import { Comparator } from 'java.util';
  import { AstNode } from 'dev.latvian.mods.rhino.ast';

  interface PositionComparator extends Comparator<AstNode> {}
  class PositionComparator extends Comparator<AstNode> {
    compare(n1: AstNode, n2: AstNode): number;
  }

}

declare module 'dev.latvian.mods.rhino.ast.FunctionNode' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Form extends Enum<Form> {}
  class Form extends Enum<Form> {
    static readonly FUNCTION: Form;
    static readonly GETTER: Form;
    static readonly SETTER: Form;
    static readonly METHOD: Form;
    static valueOf(name: string): Form;
    static values(): Form[];
  }

}

declare module 'dev.latvian.mods.rhino.ast.ParseProblem' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly Error: Type;
    static readonly Warning: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.latvian.mods.rhino.CachedConstructorInfo' {
  import { CachedConstructorInfo, MethodSignature } from 'dev.latvian.mods.rhino';

  class Accessible {
    get info(): CachedConstructorInfo;
    get name(): string;
    get signature(): MethodSignature;
  }

}

declare module 'dev.latvian.mods.rhino.CachedFieldInfo' {
  import { CachedFieldInfo } from 'dev.latvian.mods.rhino';

  class Accessible {
    get info(): CachedFieldInfo;
    get name(): string;
  }

}

declare module 'dev.latvian.mods.rhino.CachedMethodInfo' {
  import { CachedMethodInfo, MethodSignature } from 'dev.latvian.mods.rhino';

  class Accessible {
    get info(): CachedMethodInfo;
    get name(): string;
    get signature(): MethodSignature;
  }

}

declare module 'dev.latvian.mods.rhino.classfile' {
  import { MHandle } from 'dev.latvian.mods.rhino.classfile.ClassFileWriter';
  import { OutputStream } from 'java.io';

  class ByteCode {
    static readonly NOP: number;
    static readonly ACONST_NULL: number;
    static readonly ICONST_M1: number;
    static readonly ICONST_0: number;
    static readonly ICONST_1: number;
    static readonly ICONST_2: number;
    static readonly ICONST_3: number;
    static readonly ICONST_4: number;
    static readonly ICONST_5: number;
    static readonly LCONST_0: number;
    static readonly LCONST_1: number;
    static readonly FCONST_0: number;
    static readonly FCONST_1: number;
    static readonly FCONST_2: number;
    static readonly DCONST_0: number;
    static readonly DCONST_1: number;
    static readonly BIPUSH: number;
    static readonly SIPUSH: number;
    static readonly LDC: number;
    static readonly LDC_W: number;
    static readonly LDC2_W: number;
    static readonly ILOAD: number;
    static readonly LLOAD: number;
    static readonly FLOAD: number;
    static readonly DLOAD: number;
    static readonly ALOAD: number;
    static readonly ILOAD_0: number;
    static readonly ILOAD_1: number;
    static readonly ILOAD_2: number;
    static readonly ILOAD_3: number;
    static readonly LLOAD_0: number;
    static readonly LLOAD_1: number;
    static readonly LLOAD_2: number;
    static readonly LLOAD_3: number;
    static readonly FLOAD_0: number;
    static readonly FLOAD_1: number;
    static readonly FLOAD_2: number;
    static readonly FLOAD_3: number;
    static readonly DLOAD_0: number;
    static readonly DLOAD_1: number;
    static readonly DLOAD_2: number;
    static readonly DLOAD_3: number;
    static readonly ALOAD_0: number;
    static readonly ALOAD_1: number;
    static readonly ALOAD_2: number;
    static readonly ALOAD_3: number;
    static readonly IALOAD: number;
    static readonly LALOAD: number;
    static readonly FALOAD: number;
    static readonly DALOAD: number;
    static readonly AALOAD: number;
    static readonly BALOAD: number;
    static readonly CALOAD: number;
    static readonly SALOAD: number;
    static readonly ISTORE: number;
    static readonly LSTORE: number;
    static readonly FSTORE: number;
    static readonly DSTORE: number;
    static readonly ASTORE: number;
    static readonly ISTORE_0: number;
    static readonly ISTORE_1: number;
    static readonly ISTORE_2: number;
    static readonly ISTORE_3: number;
    static readonly LSTORE_0: number;
    static readonly LSTORE_1: number;
    static readonly LSTORE_2: number;
    static readonly LSTORE_3: number;
    static readonly FSTORE_0: number;
    static readonly FSTORE_1: number;
    static readonly FSTORE_2: number;
    static readonly FSTORE_3: number;
    static readonly DSTORE_0: number;
    static readonly DSTORE_1: number;
    static readonly DSTORE_2: number;
    static readonly DSTORE_3: number;
    static readonly ASTORE_0: number;
    static readonly ASTORE_1: number;
    static readonly ASTORE_2: number;
    static readonly ASTORE_3: number;
    static readonly IASTORE: number;
    static readonly LASTORE: number;
    static readonly FASTORE: number;
    static readonly DASTORE: number;
    static readonly AASTORE: number;
    static readonly BASTORE: number;
    static readonly CASTORE: number;
    static readonly SASTORE: number;
    static readonly POP: number;
    static readonly POP2: number;
    static readonly DUP: number;
    static readonly DUP_X1: number;
    static readonly DUP_X2: number;
    static readonly DUP2: number;
    static readonly DUP2_X1: number;
    static readonly DUP2_X2: number;
    static readonly SWAP: number;
    static readonly IADD: number;
    static readonly LADD: number;
    static readonly FADD: number;
    static readonly DADD: number;
    static readonly ISUB: number;
    static readonly LSUB: number;
    static readonly FSUB: number;
    static readonly DSUB: number;
    static readonly IMUL: number;
    static readonly LMUL: number;
    static readonly FMUL: number;
    static readonly DMUL: number;
    static readonly IDIV: number;
    static readonly LDIV: number;
    static readonly FDIV: number;
    static readonly DDIV: number;
    static readonly IREM: number;
    static readonly LREM: number;
    static readonly FREM: number;
    static readonly DREM: number;
    static readonly INEG: number;
    static readonly LNEG: number;
    static readonly FNEG: number;
    static readonly DNEG: number;
    static readonly ISHL: number;
    static readonly LSHL: number;
    static readonly ISHR: number;
    static readonly LSHR: number;
    static readonly IUSHR: number;
    static readonly LUSHR: number;
    static readonly IAND: number;
    static readonly LAND: number;
    static readonly IOR: number;
    static readonly LOR: number;
    static readonly IXOR: number;
    static readonly LXOR: number;
    static readonly IINC: number;
    static readonly I2L: number;
    static readonly I2F: number;
    static readonly I2D: number;
    static readonly L2I: number;
    static readonly L2F: number;
    static readonly L2D: number;
    static readonly F2I: number;
    static readonly F2L: number;
    static readonly F2D: number;
    static readonly D2I: number;
    static readonly D2L: number;
    static readonly D2F: number;
    static readonly I2B: number;
    static readonly I2C: number;
    static readonly I2S: number;
    static readonly LCMP: number;
    static readonly FCMPL: number;
    static readonly FCMPG: number;
    static readonly DCMPL: number;
    static readonly DCMPG: number;
    static readonly IFEQ: number;
    static readonly IFNE: number;
    static readonly IFLT: number;
    static readonly IFGE: number;
    static readonly IFGT: number;
    static readonly IFLE: number;
    static readonly IF_ICMPEQ: number;
    static readonly IF_ICMPNE: number;
    static readonly IF_ICMPLT: number;
    static readonly IF_ICMPGE: number;
    static readonly IF_ICMPGT: number;
    static readonly IF_ICMPLE: number;
    static readonly IF_ACMPEQ: number;
    static readonly IF_ACMPNE: number;
    static readonly GOTO: number;
    static readonly JSR: number;
    static readonly RET: number;
    static readonly TABLESWITCH: number;
    static readonly LOOKUPSWITCH: number;
    static readonly IRETURN: number;
    static readonly LRETURN: number;
    static readonly FRETURN: number;
    static readonly DRETURN: number;
    static readonly ARETURN: number;
    static readonly RETURN: number;
    static readonly GETSTATIC: number;
    static readonly PUTSTATIC: number;
    static readonly GETFIELD: number;
    static readonly PUTFIELD: number;
    static readonly INVOKEVIRTUAL: number;
    static readonly INVOKESPECIAL: number;
    static readonly INVOKESTATIC: number;
    static readonly INVOKEINTERFACE: number;
    static readonly INVOKEDYNAMIC: number;
    static readonly NEW: number;
    static readonly NEWARRAY: number;
    static readonly ANEWARRAY: number;
    static readonly ARRAYLENGTH: number;
    static readonly ATHROW: number;
    static readonly CHECKCAST: number;
    static readonly INSTANCEOF: number;
    static readonly MONITORENTER: number;
    static readonly MONITOREXIT: number;
    static readonly WIDE: number;
    static readonly MULTIANEWARRAY: number;
    static readonly IFNULL: number;
    static readonly IFNONNULL: number;
    static readonly GOTO_W: number;
    static readonly JSR_W: number;
    static readonly BREAKPOINT: number;
    static readonly IMPDEP1: number;
    static readonly IMPDEP2: number;
    static readonly T_BOOLEAN: number;
    static readonly T_CHAR: number;
    static readonly T_FLOAT: number;
    static readonly T_DOUBLE: number;
    static readonly T_BYTE: number;
    static readonly T_SHORT: number;
    static readonly T_INT: number;
    static readonly T_LONG: number;
    static readonly MH_GETFIELD: number;
    static readonly MH_GETSTATIC: number;
    static readonly MH_PUTFIELD: number;
    static readonly MH_PUTSTATIC: number;
    static readonly MH_INVOKEVIRTUAL: number;
    static readonly MH_INVOKESTATIC: number;
    static readonly MH_INVOKESPECIAL: number;
    static readonly MH_NEWINVOKESPECIAL: number;
    static readonly MH_INVOKEINTERFACE: number;
  }


  class ClassFileField {
  }


  class ClassFileMethod {
  }


  class ClassFileWriter {
    static readonly ACC_PUBLIC: number;
    static readonly ACC_PRIVATE: number;
    static readonly ACC_PROTECTED: number;
    static readonly ACC_STATIC: number;
    static readonly ACC_FINAL: number;
    static readonly ACC_SUPER: number;
    static readonly ACC_SYNCHRONIZED: number;
    static readonly ACC_VOLATILE: number;
    static readonly ACC_TRANSIENT: number;
    static readonly ACC_NATIVE: number;
    static readonly ACC_ABSTRACT: number;
    constructor(className: string, superClassName: string, sourceFileName: string);
    acquireLabel(): number;
    add(theOpCode: number): void;
    add(theOpCode: number, theOperand: number): void;
    add(theOpCode: number, theOperand1: number, theOperand2: number): void;
    add(theOpCode: number, className: string): void;
    add(theOpCode: number, className: string, fieldName: string, fieldType: string): void;
    addALoad(local: number): void;
    addAStore(local: number): void;
    addDLoad(local: number): void;
    addDStore(local: number): void;
    addExceptionHandler(startLabel: number, endLabel: number, handlerLabel: number, catchClassName: string): void;
    addFLoad(local: number): void;
    addFStore(local: number): void;
    addField(fieldName: string, type: string, flags: number): void;
    addField(fieldName: string, type: string, flags: number, value: number): void;
    addField(fieldName: string, type: string, flags: number, value: number): void;
    addField(fieldName: string, type: string, flags: number, value: number): void;
    addILoad(local: number): void;
    addIStore(local: number): void;
    addInterface(interfaceName: string): void;
    addInvoke(theOpCode: number, className: string, methodName: string, methodType: string): void;
    addInvokeDynamic(methodName: string, methodType: string, bsm: MHandle, ...bsmArgs: any[]): void;
    addLLoad(local: number): void;
    addLStore(local: number): void;
    addLineNumberEntry(lineNumber: number): void;
    addLoadConstant(k: number): void;
    addLoadConstant(k: number): void;
    addLoadConstant(k: number): void;
    addLoadConstant(k: number): void;
    addLoadConstant(k: string): void;
    addLoadThis(): void;
    addPush(k: number): void;
    addPush(k: boolean): void;
    addPush(k: number): void;
    addPush(k: number): void;
    addPush(k: string): void;
    addTableSwitch(low: number, high: number): number;
    addVariableDescriptor(name: string, type: string, startPC: number, register: number): void;
    adjustStackTop(delta: number): void;
    static classNameToSignature(name: string): string;
    get className(): string;
    get currentCodeOffset(): number;
    get stackTop(): number;
    getLabelPC(label: number): number;
    isUnderStringSizeLimit(k: string): boolean;
    markHandler(theLabel: number): void;
    markLabel(label: number): void;
    markLabel(label: number, stackTop: number): void;
    markTableSwitchCase(switchStart: number, caseIndex: number): void;
    markTableSwitchCase(switchStart: number, caseIndex: number, stackTop: number): void;
    markTableSwitchDefault(switchStart: number): void;
    set stackTop(n: number);
    setFlags(flags: number): void;
    setTableSwitchJump(switchStart: number, caseIndex: number, jumpTarget: number): void;
    startMethod(methodName: string, type: string, flags: number): void;
    stopMethod(maxLocals: number): void;
    toByteArray(): number[];
    write(oStream: OutputStream): void;
  }


  class ConstantEntry {
    equals(obj: any): boolean;
    hashCode(): number;
  }


  class ConstantPool {
  }


  class ExceptionTableEntry {
  }


  class FieldOrMethodRef {
    equals(obj: any): boolean;
    get className(): string;
    get name(): string;
    get type(): string;
    hashCode(): number;
  }


  class SuperBlock {
    toString(): string;
  }


  class TypeInfo {
  }

}

declare module 'dev.latvian.mods.rhino.classfile.ClassFileWriter' {
  import { RuntimeException } from 'java.lang';

  class StackMapTable {
  }


  interface ClassFileFormatException extends RuntimeException {}
  class ClassFileFormatException extends RuntimeException {
  }


  class BootstrapEntry {
    equals(obj: any): boolean;
    hashCode(): number;
  }


  class MHandle {
    constructor(tag: number, owner: string, name: string, desc: string);
    equals(obj: any): boolean;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.rhino.CustomFunction' {
  import { Context } from 'dev.latvian.mods.rhino';

  class Func {
    call(var1: Context, var2: any[]): any;
  }


  interface NoArgFunc extends Func {}
  class NoArgFunc extends Func {
    call(var1: Context): any;
    call(cx: Context, args: any[]): any;
  }

}

declare module 'dev.latvian.mods.rhino.ES6Generator' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface State extends Enum<State> {}
  class State extends Enum<State> {
    static readonly SUSPENDED_START: State;
    static readonly SUSPENDED_YIELD: State;
    static readonly EXECUTING: State;
    static readonly COMPLETED: State;
    static valueOf(name: string): State;
    static values(): State[];
  }


  class YieldStarResult {
    constructor(result: any);
  }

}

declare module 'dev.latvian.mods.rhino.GeneratorState' {
  import { RuntimeException } from 'java.lang';

  interface GeneratorClosedException extends RuntimeException {}
  class GeneratorClosedException extends RuntimeException {
  }

}

declare module 'dev.latvian.mods.rhino.Hashtable' {
  class Entry {
    equals(o: any): boolean;
    hashCode(): number;
    key(): any;
    value(): any;
  }

}

declare module 'dev.latvian.mods.rhino.IteratorLikeIterable' {
  import { Iterator } from 'java.util';

  interface Itr extends Iterator<any> {}
  class Itr extends Iterator<any> {
    hasNext(): boolean;
    next(): any;
  }

}

declare module 'dev.latvian.mods.rhino.JavaAdapter' {
  class JavaAdapterSignature {
    equals(obj: any): boolean;
    hashCode(): number;
  }

}

declare module 'dev.latvian.mods.rhino.JavaMembers' {
  import { Accessible } from 'dev.latvian.mods.rhino.CachedFieldInfo';
  import { Field, Method } from 'java.lang.reflect';
  import { Accessible as dev_latvian_mods_rhino_cachedmethodinfo_Accessible } from 'dev.latvian.mods.rhino.CachedMethodInfo';

  class FieldInfo {
    readonly cached: Accessible;
    readonly field: Field;
    readonly name: string;
    constructor(cached: Accessible);
  }


  class MethodInfo {
    readonly cached: dev_latvian_mods_rhino_cachedmethodinfo_Accessible;
    readonly method: Method;
    readonly name: string;
    readonly hidden: boolean;
    constructor(cached: dev_latvian_mods_rhino_cachedmethodinfo_Accessible);
  }

}

declare module 'dev.latvian.mods.rhino.json' {
  import { Scriptable, Context } from 'dev.latvian.mods.rhino';

  class JsonParser {
    constructor(scope: Scriptable);
    parseValue(cx: Context, json: string): any;
  }

}

declare module 'dev.latvian.mods.rhino.json.JsonParser' {
  import { Exception } from 'java.lang';

  interface ParseException extends Exception {}
  class ParseException extends Exception {
  }

}

declare module 'dev.latvian.mods.rhino.NativeArrayIterator' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ArrayIteratorType extends Enum<ArrayIteratorType> {}
  class ArrayIteratorType extends Enum<ArrayIteratorType> {
    static readonly ENTRIES: ArrayIteratorType;
    static readonly KEYS: ArrayIteratorType;
    static readonly VALUES: ArrayIteratorType;
    static valueOf(name: string): ArrayIteratorType;
    static values(): ArrayIteratorType[];
  }

}

declare module 'dev.latvian.mods.rhino.NativeCollectionIterator' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Type extends Enum<Type> {}
  class Type extends Enum<Type> {
    static readonly KEYS: Type;
    static readonly VALUES: Type;
    static readonly BOTH: Type;
    static valueOf(name: string): Type;
    static values(): Type[];
  }

}

declare module 'dev.latvian.mods.rhino.NativeIterator' {
  import { NativeObject, Context, Scriptable } from 'dev.latvian.mods.rhino';

  interface StopIteration extends NativeObject {}
  class StopIteration extends NativeObject {
    constructor(cx: Context);

    constructor(cx: Context, val: any);
    get className(): string;
    get value(): any;
    hasInstance(cx: Context, instance: Scriptable): boolean;
  }


  class WrappedJavaIterator {
    __iterator__(b: boolean): any;
    next(): any;
  }

}

declare module 'dev.latvian.mods.rhino.NativeObject' {
  import { AbstractSet, Iterator, AbstractCollection } from 'java.util';
  import { Entry } from 'dev.latvian.mods.rhino';
  import { Entry as map_Entry } from 'Map';

  interface KeySet extends AbstractSet<any> {}
  class KeySet extends AbstractSet<any> {
    contains(key: any): boolean;
    hasNext(): boolean;
    iterator(): Iterator<any>;
    next(): any;
    remove(): void;
    size(): number;
  }


  interface ValueCollection extends AbstractCollection<any> {}
  class ValueCollection extends AbstractCollection<any> {
    hasNext(): boolean;
    iterator(): Iterator<any>;
    next(): any;
    remove(): void;
    size(): number;
  }


  interface EntrySet extends AbstractSet<Entry> {}
  class EntrySet extends AbstractSet<Entry> {
    equals(other: any): boolean;
    get key(): any;
    get value(): any;
    hasNext(): boolean;
    hashCode(): number;
    iterator(): Iterator<map_Entry<any, any>>;
    next(): map_Entry<any, any>;
    remove(): void;
    set value(value2: any);
    size(): number;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.rhino.Node' {
  import { Iterator } from 'java.util';
  import { Node } from 'dev.latvian.mods.rhino';

  interface NodeIterator extends Iterator<Node> {}
  class NodeIterator extends Iterator<Node> {
    constructor();
    hasNext(): boolean;
    next(): Node;
    remove(): void;
  }

}

declare module 'dev.latvian.mods.rhino.ObjToIntMap' {
  class Iterator {
    done(): boolean;
    get key(): any;
    get value(): number;
    next(): void;
    set value(value: number);
    start(): void;
  }

}

declare module 'dev.latvian.mods.rhino.regexp' {
  import { BaseFunction, Context, Scriptable } from 'dev.latvian.mods.rhino';

  class CompilerState {
  }


  class GlobData {
  }


  interface NativeRegExpCtor extends BaseFunction {}
  class NativeRegExpCtor extends BaseFunction {
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
    construct(cx: Context, scope: Scriptable, args: any[]): Scriptable;
    get arity(): number;
    get functionName(): string;
    get length(): number;
  }


  class REBackTrackData {
  }


  class RECharSet {
  }


  class RECompiled {
  }


  class RegExp {
    static readonly RA_MATCH: number;
    static readonly RA_REPLACE: number;
    static readonly RA_SEARCH: number;
    action(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[], actionType: number): any;
    compileRegExp(cx: Context, source: string, flags: string): any;
    find_split(cx: Context, scope: Scriptable, target: string, separator: string, reObj: Scriptable, ip: number[], matchlen: number[], matched: boolean[], parensp: String[][]): number;
    isRegExp(obj: Scriptable): boolean;
    js_split(cx: Context, scope: Scriptable, target: string, args: any[]): any;
    wrapRegExp(cx: Context, scope: Scriptable, compiled: any): Scriptable;
  }


  class REGlobalData {
  }


  class RENode {
  }


  class REProgState {
  }


  class SubString {
    constructor();

    constructor(str: string);

    constructor(source: string, start: number, len: number);
    toString(): string;
  }

}

declare module 'dev.latvian.mods.rhino.ScriptableObject' {
  import { Enum } from 'java.lang';
  import { List, Comparator } from 'java.util';
  import { Serializable } from 'java.io';

  class Slot {
  }


  interface SlotAccess extends Enum<SlotAccess> {}
  class SlotAccess extends Enum<SlotAccess> {
    static readonly QUERY: SlotAccess;
    static readonly MODIFY: SlotAccess;
    static readonly MODIFY_CONST: SlotAccess;
    static readonly MODIFY_GETTER_SETTER: SlotAccess;
    static readonly CONVERT_ACCESSOR_TO_DATA: SlotAccess;
    static valueOf(name: string): SlotAccess;
    static values(): SlotAccess[];
  }


  interface GetterSlot extends Slot {}
  class GetterSlot extends Slot {
  }


  interface KeyComparator extends Comparator<any>, Serializable {}
  class KeyComparator extends Comparator<any> {
    compare(o1: any, o2: any): number;
  }

}

declare module 'dev.latvian.mods.rhino.ScriptRuntime' {
  import { Callable, Context, Scriptable } from 'dev.latvian.mods.rhino';

  class StringIdOrIndex {
  }


  interface NoSuchMethodShim extends Callable {}
  class NoSuchMethodShim extends Callable {
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
  }


  class MessageProvider {
    getMessage(var1: string, var2: any[]): string;
  }

}

declare module 'dev.latvian.mods.rhino.Token' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface CommentType extends Enum<CommentType> {}
  class CommentType extends Enum<CommentType> {
    static readonly LINE: CommentType;
    static readonly BLOCK_COMMENT: CommentType;
    static readonly JSDOC: CommentType;
    static readonly HTML: CommentType;
    static valueOf(name: string): CommentType;
    static values(): CommentType[];
  }

}

declare module 'dev.latvian.mods.rhino.TopLevel' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Builtins extends Enum<Builtins> {}
  class Builtins extends Enum<Builtins> {
    static readonly Object: Builtins;
    static readonly Array: Builtins;
    static readonly Function: Builtins;
    static readonly String: Builtins;
    static readonly Number: Builtins;
    static readonly Boolean: Builtins;
    static readonly RegExp: Builtins;
    static readonly Error: Builtins;
    static readonly Symbol: Builtins;
    static readonly GeneratorFunction: Builtins;
    static valueOf(name: string): Builtins;
    static values(): Builtins[];
  }


  interface NativeErrors extends Enum<NativeErrors> {}
  class NativeErrors extends Enum<NativeErrors> {
    static readonly Error: NativeErrors;
    static readonly EvalError: NativeErrors;
    static readonly RangeError: NativeErrors;
    static readonly ReferenceError: NativeErrors;
    static readonly SyntaxError: NativeErrors;
    static readonly TypeError: NativeErrors;
    static readonly URIError: NativeErrors;
    static readonly InternalError: NativeErrors;
    static readonly JavaException: NativeErrors;
    static valueOf(name: string): NativeErrors;
    static values(): NativeErrors[];
  }

}

declare module 'dev.latvian.mods.rhino.type' {
  import { OptionallyConsolidatable } from 'dev.latvian.mods.rhino.type.TypeInfoBase';
  import { Class, StringBuilder } from 'java.lang';
  import { Collection, Set, List, Map } from 'java.util';
  import { TypeWrapperFactory } from 'dev.latvian.mods.rhino.util.wrap';
  import { Context } from 'dev.latvian.mods.rhino';
  import { Component, Data } from 'dev.latvian.mods.rhino.type.RecordTypeInfo';
  import { Type } from 'java.lang.reflect';

  interface ArrayTypeInfo extends OptionallyConsolidatable {}
  class ArrayTypeInfo extends OptionallyConsolidatable {
    append(ctx: TypeStringContext, sb: StringBuilder): void;
    asClass(): Class<any>;
    collectContainedComponentClasses(classes: Collection<Class<any>>): void;
    componentType(): TypeInfo;
    equals(obj: any): boolean;
    get containedComponentClasses(): Set<Class<any>>;
    hashCode(): number;
    signature(): string;
    toString(): string;
  }


  interface BasicClassTypeInfo extends ClassTypeInfo {}
  class BasicClassTypeInfo extends ClassTypeInfo {
  }


  interface ClassTypeInfo extends TypeInfoBase {}
  class ClassTypeInfo extends TypeInfoBase {
    append(ctx: TypeStringContext, sb: StringBuilder): void;
    asClass(): Class<any>;
    equals(o: any): boolean;
    get containedComponentClasses(): Set<Class<any>>;
    hashCode(): number;
    isBoolean(): boolean;
    isByte(): boolean;
    isCharacter(): boolean;
    isDouble(): boolean;
    isFloat(): boolean;
    isInt(): boolean;
    isLong(): boolean;
    isShort(): boolean;
    isVoid(): boolean;
    shouldConvert(): boolean;
    toString(): string;
  }


  interface EnumTypeInfo extends TypeWrapperFactory<any>, ClassTypeInfo {}
  class EnumTypeInfo extends TypeWrapperFactory<any> {
    enumConstants(): any[];
    static getName(e: any): string;
    wrap(cx: Context, from: any, target: TypeInfo): any;
  }


  interface InterfaceTypeInfo extends ClassTypeInfo {}
  class InterfaceTypeInfo extends ClassTypeInfo {
    isFunctionalInterface(): boolean;
  }


  interface NoTypeInfo extends TypeInfo {}
  class NoTypeInfo extends TypeInfo {
    append(ctx: TypeStringContext, sb: StringBuilder): void;
    asArray(): TypeInfo;
    asClass(): Class<any>;
    collectContainedComponentClasses(classes: Collection<Class<any>>): void;
    equals(obj: any): boolean;
    get containedComponentClasses(): Set<Class<any>>;
    hashCode(): number;
    shouldConvert(): boolean;
    toString(): string;
    withParams(...params: TypeInfo[]): TypeInfo;
  }


  interface ParameterizedTypeInfo extends OptionallyConsolidatable {}
  class ParameterizedTypeInfo extends OptionallyConsolidatable {
    append(ctx: TypeStringContext, sb: StringBuilder): void;
    asClass(): Class<any>;
    collectContainedComponentClasses(classes: Collection<Class<any>>): void;
    enumConstants(): any[];
    equals(object: any): boolean;
    hashCode(): number;
    is(info: TypeInfo): boolean;
    isFunctionalInterface(): boolean;
    newArray(length: number): any;
    param(index: number): TypeInfo;
    params(): TypeInfo[];
    rawType(): TypeInfo;
    recordComponents(): Map<string, Component>;
    signature(): string;
    toString(): string;
    withParams(...params: TypeInfo[]): TypeInfo;
  }


  interface PrimitiveClassTypeInfo extends ClassTypeInfo {}
  class PrimitiveClassTypeInfo extends ClassTypeInfo {
    createDefaultValue(): any;
    isPrimitive(): boolean;
  }


  interface RecordTypeInfo extends TypeWrapperFactory<any>, ClassTypeInfo {}
  class RecordTypeInfo extends TypeWrapperFactory<any> {
    createCombinedType(...preference: TypeInfo[]): TypeInfo;
    createInstance(cx: Context, map: Map<any, any>): any;
    createInstance(cx: Context, ...objects: any[]): any;
    get arrayTypeInfo(): JSFixedArrayTypeInfo;
    get data(): Data;
    get objectTypeInfo(): JSObjectTypeInfo;
    recordComponents(): Map<string, Component>;
    static setGlobalDefaultValue<T>(type: Class<T>, value: T): void;
    wrap(cx: Context, from: any, target: TypeInfo): any;
  }


  interface TypeInfoBase extends TypeInfo {}
  class TypeInfoBase extends TypeInfo {
    asArray(): TypeInfo;
    newArray(length: number): any;
  }


  class TypeStringContext {
    static readonly DEFAULT: TypeStringContext;
    append(sb: StringBuilder, type: TypeInfo): void;
    appendClassName(sb: StringBuilder, type: ClassTypeInfo): void;
    appendSpace(sb: StringBuilder): void;
    toString(info: TypeInfo): string;
  }


  class TypeUtils {
    static getComponentType(type: Type, fallback: Type): Type;
    static getRawType(type: Type): Class<any>;
  }


  interface VariableTypeInfo extends TypeInfoBase {}
  class VariableTypeInfo extends TypeInfoBase {
    asClass(): Class<any>;
    consolidate(mapping: Map<VariableTypeInfo, TypeInfo>): TypeInfo;
    get bounds(): TypeInfo[];
    get mainBound(): TypeInfo;
    get name(): string;
    shouldConvert(): boolean;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.rhino.type.TypeInfoBase' {
  import { TypeInfoBase, TypeInfo, VariableTypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Map } from 'java.util';

  interface OptionallyConsolidatable extends TypeInfoBase {}
  class OptionallyConsolidatable extends TypeInfoBase {
    consolidate(mapping: Map<VariableTypeInfo, TypeInfo>): TypeInfo;
  }

}

declare module 'dev.latvian.mods.rhino.util' {
  import { Context, NativeArray, Scriptable, BaseFunction } from 'dev.latvian.mods.rhino';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { List, HashMap, AbstractList, Set, Collection } from 'java.util';
  import { Iterable, Enum } from 'java.lang';
  import { Supplier, Function } from 'java.util.function';
  import { Callback } from 'dev.latvian.mods.rhino.util.DynamicFunction';

  class ArrayValueProvider {
    static readonly EMPTY: ArrayValueProvider;
    createArray(cx: Context, target: TypeInfo): any;
    createList(cx: Context, target: TypeInfo): any;
    createSet(cx: Context, target: TypeInfo): any;
    static fromIterable(iterable: Iterable<any>): ArrayValueProvider;
    static fromJavaList(list: any[], errorSource: any): ArrayValueProvider;
    static fromNativeArray(array: NativeArray): ArrayValueProvider;
    getArrayValue(var1: Context, var2: number): any;
    getErrorSource(var1: Context): any;
    getLength(var1: Context): number;
  }


  interface ClassVisibilityContext extends Enum<ClassVisibilityContext> {}
  class ClassVisibilityContext extends Enum<ClassVisibilityContext> {
    static readonly UNKNOWN: ClassVisibilityContext;
    static readonly MEMBER: ClassVisibilityContext;
    static readonly CLASS_IN_PACKAGE: ClassVisibilityContext;
    static readonly ARGUMENT: ClassVisibilityContext;
    static readonly EXCEPTION: ClassVisibilityContext;
    static valueOf(name: string): ClassVisibilityContext;
    static values(): ClassVisibilityContext[];
  }


  class CustomJavaToJsWrapper {
    convertJavaToJs(var1: Context, var2: Scriptable, var3: TypeInfo): Scriptable;
  }


  class DataObject {
    createDataObject<T>(var1: Supplier<T>, var2: Context): T;
    createDataObjectList<T>(var1: Supplier<T>, var2: Context): T[];
    isDataObjectList(): boolean;
  }


  interface DefaultValueTypeHint extends Enum<DefaultValueTypeHint> {}
  class DefaultValueTypeHint extends Enum<DefaultValueTypeHint> {
    static readonly STRING: DefaultValueTypeHint;
    static readonly NUMBER: DefaultValueTypeHint;
    static readonly BOOLEAN: DefaultValueTypeHint;
    static readonly FUNCTION: DefaultValueTypeHint;
    static readonly CLASS: DefaultValueTypeHint;
    toString(): string;
    static valueOf(name: string): DefaultValueTypeHint;
    static values(): DefaultValueTypeHint[];
  }


  class Deletable {
    static deleteObject(o: any): void;
    onDeletedByJS(): void;
  }


  interface DynamicFunction extends BaseFunction {}
  class DynamicFunction extends BaseFunction {
    constructor(f: Callback);
    call(cx: Context, scope: Scriptable, thisObj: Scriptable, args: any[]): any;
  }


  interface DynamicMap<V = any> extends HashMap<string, V> {}
  class DynamicMap<V = any> extends HashMap<string, V> {
    constructor(f: Function<string, V>);
    containsKey(name: any): boolean;
    get(key: any): V;
  }


  interface JavaSetWrapper<T = any> extends AbstractList<T> {}
  class JavaSetWrapper<T = any> extends AbstractList<T> {
    readonly set: Set;
    constructor(set: Set<T>);
    add(t: T): boolean;
    add(index: number, element: T): void;
    addAll(c: Collection<T>): boolean;
    addAll(index: number, c: Collection<T>): boolean;
    clear(): void;
    get(index: number): T;
    remove(index: number): T;
    remove(o: any): boolean;
    set(index: number, element: T): T;
    size(): number;
  }


  class RemappedEnumConstant {
    get remappedEnumConstantName(): string;
  }


  class SpecialEquality {
    static checkSpecialEquality(cx: Context, o: any, o1: any, shallow: boolean): boolean;
    specialEquals(cx: Context, o: any, shallow: boolean): boolean;
  }


  class ToStringJS {
    static toStringJS(cx: Context, o: any): string;
    toStringJS(cx: Context): string;
  }

}

declare module 'dev.latvian.mods.rhino.util.DynamicFunction' {
  class Callback {
    call(var1: any[]): any;
  }

}

declare module 'dev.latvian.mods.rhino.util.wrap' {
  import { Context } from 'dev.latvian.mods.rhino';
  import { TypeInfo } from 'dev.latvian.mods.rhino.type';
  import { Map } from 'java.util';
  import { Class } from 'java.lang';

  interface DirectTypeWrapperFactory<T = any> extends TypeWrapperFactory<T> {}
  class DirectTypeWrapperFactory<T = any> extends TypeWrapperFactory<T> {
    wrap(var1: any): T;
    wrap(cx: Context, from: any, target: TypeInfo): T;
  }


  class TypeWrapperFactory<T = any> {
    wrap(var1: Context, var2: any, var3: TypeInfo): T;
  }


  class TypeWrappers {
    readonly wrappers: Map;
    getWrapperFactory(from: any, target: TypeInfo): TypeWrapperFactory<any>;
    hasWrapper(from: any, target: TypeInfo): boolean;
    register<T>(target: Class<T>, validator: TypeWrapperValidator, factory: TypeWrapperFactory<T>): void;
    register<T>(target: Class<T>, factory: TypeWrapperFactory<T>): void;
    registerDirect<T>(target: Class<T>, validator: TypeWrapperValidator, factory: DirectTypeWrapperFactory<T>): void;
    registerDirect<T>(target: Class<T>, factory: DirectTypeWrapperFactory<T>): void;
  }


  class TypeWrapperValidator {
    static readonly ALWAYS_VALID: TypeWrapperValidator;
    isValid(var1: any, var2: TypeInfo): boolean;
  }

}

declare module 'dev.latvian.mods.rhino.v8dtoa' {
  class CachedPowers {
  }


  class DiyFp {
    toString(): string;
  }


  class DoubleConversion {
    static doubleToInt32(x: number): number;
  }


  class DoubleHelper {
  }


  class FastDtoa {
    static dtoa(v: number, buffer: FastDtoaBuilder): boolean;
    static numberToString(v: number): string;
    static numberToString(v: number, buffer: FastDtoaBuilder): boolean;
  }


  class FastDtoaBuilder {
    format(): string;
    reset(): void;
    toString(): string;
  }

}

declare module 'dev.latvian.mods.rhino.v8dtoa.CachedPowers' {
  class CachedPower {
  }

}