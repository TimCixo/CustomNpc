declare module 'org.openzen.zencode.java' {
  import { Class, ClassLoader } from 'java.lang';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { LoadingModule } from 'org.openzen.zencode.java.JavaNativeLoader';
  import { ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { ScriptingEngineLogger } from 'org.openzen.zencode.java.logger';
  import { GlobalTypeRegistry } from 'org.openzen.zenscript.codemodel.type';
  import { Function } from 'java.util.function';
  import { InputStream } from 'java.io';
  import { ModuleLoader, BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { JavaNativeModule } from 'org.openzen.zencode.java.module';
  import { JavaNativeConverterBuilder } from 'org.openzen.zencode.java.module.converters';
  import { SemanticModule, FunctionParameter } from 'org.openzen.zenscript.codemodel';
  import { SourceFile } from 'org.openzen.zencode.shared';
  import { Map, List } from 'java.util';
  import { JavaBytecodeRunUnit } from 'org.openzen.zenscript.javabytecode';

  class JavaNativeLoader {
    constructor(classes: Class<any>, globals: Class<any>, logger: IZSLogger);
    addModule(pkg: ZSPackage, name: string, basePackage: string, ...dependencies: string[]): LoadingModule;
    load(): ScriptingEngine;
  }


  class ScriptingEngine {
    readonly logger: ScriptingEngineLogger;
    readonly registry: GlobalTypeRegistry;
    debug: boolean;
    constructor();

    constructor(logger: ScriptingEngineLogger);

    constructor(logger: ScriptingEngineLogger, resourceGetter: Function<string, InputStream>);
    createNativeModule(name: string, basePackage: string, ...dependencies: JavaNativeModule[]): JavaNativeModule;
    createNativeModule(name: string, basePackage: string, dependencies: JavaNativeModule[], nativeConverterBuilder: JavaNativeConverterBuilder): JavaNativeModule;
    createRunUnit(): JavaBytecodeRunUnit;
    createScriptedModule(name: string, sources: SourceFile[], ...dependencies: string[]): SemanticModule;
    createScriptedModule(name: string, sources: SourceFile[], bracketParser: BracketExpressionParser, scriptParameters: FunctionParameter[], ...dependencies: string[]): SemanticModule;
    get nativeModules(): JavaNativeModule[];
    get root(): ZSPackage;
    registerCompiled(module: SemanticModule): void;
    registerModule(name: string, zsPackage: ZSPackage, loader: ModuleLoader): void;
    registerNativeProvided(module: JavaNativeModule): void;
    run(): void;
    run(arguments: Map<FunctionParameter, any>): void;
    run(arguments: Map<FunctionParameter, any>, parentClassLoader: ClassLoader): void;
  }


  class ZenCodeGlobals {
  }


  class ZenCodeType {
  }

}

declare module 'org.openzen.zencode.java.JavaNativeLoader' {
  import { Consumer } from 'java.util.function';
  import { JavaNativeModule } from 'org.openzen.zencode.java.module';

  class LoadingModule {
    whenLoaded(consumer: Consumer<JavaNativeModule>): void;
  }

}

declare module 'org.openzen.zencode.java.logger' {
  import { ValidatorLogger } from 'org.openzen.zenscript.validator.logger';
  import { SourceFileLogger } from 'org.openzen.zencode.shared.logging';
  import { ParserLogger } from 'org.openzen.zenscript.parser.logger';
  import { PrintStream } from 'java.io';
  import { Throwable } from 'java.lang';
  import { CompileException, SourceFile } from 'org.openzen.zencode.shared';
  import { ValidationLogEntry } from 'org.openzen.zenscript.validator';

  interface ScriptingEngineLogger extends ValidatorLogger, SourceFileLogger, ParserLogger {}
  class ScriptingEngineLogger extends ValidatorLogger {
  }


  interface ScriptingEngineStreamLogger extends ScriptingEngineLogger {}
  class ScriptingEngineStreamLogger extends ScriptingEngineLogger {
    constructor(traceStream: PrintStream, debugStream: PrintStream, infoStream: PrintStream, warningStream: PrintStream, errorStream: PrintStream);

    constructor(normalStream: PrintStream, errorStream: PrintStream);

    constructor();
    debug(message: string): void;
    error(message: string): void;
    info(message: string): void;
    logCompileException(exception: CompileException): void;
    logSourceFile(file: SourceFile): void;
    logValidationError(errorEntry: ValidationLogEntry): void;
    logValidationWarning(warningEntry: ValidationLogEntry): void;
    throwingErr(message: string, throwable: Throwable): void;
    throwingWarn(message: string, throwable: Throwable): void;
    trace(message: string): void;
    warning(message: string): void;
  }

}

declare module 'org.openzen.zencode.java.module.converters' {
  import { AnnotatedElement, Type, Constructor, Method, AnnotatedType, Parameter, TypeVariable, Member } from 'java.lang.reflect';
  import { ElementType } from 'org.openzen.zencode.java.module.converters.JavaAnnotatedType';
  import { Class } from 'java.lang';
  import { Annotation } from 'java.lang.annotation';
  import { JavaNativeTypeConversionContext, JavaNativeModule, TypeVariableContext } from 'org.openzen.zencode.java.module';
  import { HighLevelDefinition, FunctionHeader, FunctionParameter, OperatorType, Module } from 'org.openzen.zenscript.codemodel';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { ExpansionDefinition, ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { ConstructorMember, MethodMember, OperatorMember, GetterMember, SetterMember, CasterMember } from 'org.openzen.zenscript.codemodel.member';
  import { JavaMethod, JavaClass } from 'org.openzen.zenscript.javashared';
  import { FunctionalMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';

  interface JavaAnnotatedType extends AnnotatedElement, Type {}
  class JavaAnnotatedType extends AnnotatedElement {
    static arrayOf(element: any[]): JavaAnnotatedType[];
    get annotatedElement(): AnnotatedElement;
    get annotations(): Annotation[];
    get declaredAnnotations(): Annotation[];
    get elementType(): ElementType;
    get type(): Type;
    get typeName(): string;
    getAnnotation<T extends Annotation>(annotationClass: Class<T>): T;
    getAnnotationsByType<T extends Annotation>(annotationClass: Class<T>): T[];
    getDeclaredAnnotation<T extends Annotation>(annotationClass: Class<T>): T;
    getDeclaredAnnotationsByType<T extends Annotation>(annotationClass: Class<T>): T[];
    isAnnotationPresent(annotationClass: Class<Annotation>): boolean;
    static of(element: any): JavaAnnotatedType;
    toString(): string;
  }


  class JavaNativeClassConverter {
    constructor(typeConverter: JavaNativeTypeConverter, memberConverter: JavaNativeMemberConverter, packageInfo: JavaNativePackageInfo, typeConversionContext: JavaNativeTypeConversionContext, headerConverter: JavaNativeHeaderConverter);
    convertClass(cls: Class<any>): HighLevelDefinition;
    getNameForScripts(cls: Class<any>): string;
    shouldLoadClass(cls: Class<any>): boolean;
    shouldLoadType(type: Type): boolean;
  }


  class JavaNativeConverter {
    readonly typeConverter: JavaNativeTypeConverter;
    readonly headerConverter: JavaNativeHeaderConverter;
    readonly memberConverter: JavaNativeMemberConverter;
    readonly classConverter: JavaNativeClassConverter;
    readonly globalConverter: JavaNativeGlobalConverter;
    readonly expansionConverter: JavaNativeExpansionConverter;
    constructor(typeConverter: JavaNativeTypeConverter, headerConverter: JavaNativeHeaderConverter, memberConverter: JavaNativeMemberConverter, classConverter: JavaNativeClassConverter, globalConverter: JavaNativeGlobalConverter, expansionConverter: JavaNativeExpansionConverter, typeConversionContext: JavaNativeTypeConversionContext);
    addClass(cls: Class<any>): HighLevelDefinition;
    registerBEP(bep: BracketExpressionParser): void;
  }


  class JavaNativeConverterBuilder {
    build(packageInfo: JavaNativePackageInfo, logger: IZSLogger, typeConversionContext: JavaNativeTypeConversionContext, module: JavaNativeModule): JavaNativeConverter;
  }


  class JavaNativeExpansionConverter {
    constructor(typeConverter: JavaNativeTypeConverter, logger: IZSLogger, packageInfo: JavaNativePackageInfo, memberConverter: JavaNativeMemberConverter, typeConversionContext: JavaNativeTypeConversionContext, headerConverter: JavaNativeHeaderConverter);
    convertExpansion(cls: Class<any>): ExpansionDefinition;
  }


  class JavaNativeGlobalConverter {
    constructor(typeConversionContext: JavaNativeTypeConversionContext, typeConverter: JavaNativeTypeConverter, memberConverter: JavaNativeMemberConverter);
    addGlobal(cls: Class<any>, definition: HighLevelDefinition): void;
  }


  class JavaNativeHeaderConverter {
    constructor(typeConverter: JavaNativeTypeConverter, packageInfo: JavaNativePackageInfo, typeConversionContext: JavaNativeTypeConversionContext);
    getDefaultValue(parameter: Parameter, type: TypeID, functionParameter: FunctionParameter): Expression;
    getHeader(context: TypeVariableContext, constructor: Constructor): FunctionHeader;
    getHeader(context: TypeVariableContext, method: Method): FunctionHeader;
    getHeader(context: TypeVariableContext, javaReturnType: AnnotatedType, javaParameters: Parameter[], javaTypeParameters: TypeVariable<Method>, exceptionTypes: AnnotatedType[]): FunctionHeader;
    getMethodModifiers(method: Member): number;
    setBEP(bep: BracketExpressionParser): void;
  }


  class JavaNativeMemberConverter {
    constructor(typeConverter: JavaNativeTypeConverter, typeConversionContext: JavaNativeTypeConversionContext, headerConverter: JavaNativeHeaderConverter);
    asCaster(context: TypeVariableContext, definition: HighLevelDefinition, method: Method, implicit: boolean): CasterMember;
    asConstructor(context: TypeVariableContext, definition: HighLevelDefinition, method: Constructor): ConstructorMember;
    asGetter(context: TypeVariableContext, definition: HighLevelDefinition, method: Method, getterName: string): GetterMember;
    asMethod(context: TypeVariableContext, definition: HighLevelDefinition, method: Method, methodName: string): MethodMember;
    asOperator(context: TypeVariableContext, definition: HighLevelDefinition, method: Method, operatorType: OperatorType): OperatorMember;
    asSetter(context: TypeVariableContext, definition: HighLevelDefinition, method: Method, setterName: string): SetterMember;
    getMethod(cls: JavaClass, constructor: Constructor): JavaMethod;
    getMethod(cls: JavaClass, method: Method, result: TypeID): JavaMethod;
    loadStaticMethod(method: Method, definition: HighLevelDefinition): FunctionalMemberRef;
    translateGetterName(name: string): string;
    translateSetterName(name: string): string;
  }


  class JavaNativePackageInfo {
    constructor(pkg: ZSPackage, basePackage: string, module: Module);
    get basePackage(): string;
    get module(): Module;
    get pkg(): ZSPackage;
    getPackage(className: string): ZSPackage;
    isInBasePackage(className: string): boolean;
  }


  class JavaNativeTypeConverter {
    constructor(typeConversionContext: JavaNativeTypeConversionContext, packageInfo: JavaNativePackageInfo, javaNativeModule: JavaNativeModule);
    getClassFromType(type: TypeID): Class<any>;
    getTypeFromName(className: string): TypeID;
    loadStoredType(context: TypeVariableContext, annotatedType: AnnotatedType): TypeID;
    loadStoredType(context: TypeVariableContext, parameter: Parameter): TypeID;
    loadType(context: TypeVariableContext, element: AnnotatedElement): TypeID;
    loadType(context: TypeVariableContext, annotatedType: JavaAnnotatedType): TypeID;
    loadType(context: TypeVariableContext, element: AnnotatedElement, nullable: boolean, unsigned: boolean): TypeID;
    loadType(context: TypeVariableContext, type: JavaAnnotatedType, nullable: boolean, unsigned: boolean): TypeID;
    setBEP(bep: BracketExpressionParser): void;
    setHeaderConverter(headerConverter: JavaNativeHeaderConverter): void;
  }

}

declare module 'org.openzen.zencode.java.module.converters.JavaAnnotatedType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface ElementType extends Enum<ElementType> {}
  class ElementType extends Enum<ElementType> {
    static readonly ANNOTATED_PARAMETERIZED_TYPE: ElementType;
    static readonly ANNOTATED_TYPE: ElementType;
    static readonly CLASS: ElementType;
    static readonly GENERIC_ARRAY: ElementType;
    static readonly PARAMETERIZED_TYPE: ElementType;
    static readonly TYPE_VARIABLE: ElementType;
    static readonly WILDCARD: ElementType;
    static valueOf(name: string): ElementType;
    static values(): ElementType[];
  }

}

declare module 'org.openzen.zencode.java.module' {
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { GlobalTypeRegistry, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { JavaNativeConverterBuilder, JavaNativePackageInfo } from 'org.openzen.zencode.java.module.converters';
  import { SemanticModule, ModuleSpace, HighLevelDefinition, Module, PackageDefinitions } from 'org.openzen.zenscript.codemodel';
  import { Class } from 'java.lang';
  import { FunctionalMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { Method, TypeVariable } from 'java.lang.reflect';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { JavaCompiledModule } from 'org.openzen.zenscript.javashared';
  import { Map } from 'java.util';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';

  class JavaNativeModule {
    constructor(logger: IZSLogger, pkg: ZSPackage, name: string, basePackage: string, registry: GlobalTypeRegistry, dependencies: JavaNativeModule[]);

    constructor(logger: IZSLogger, pkg: ZSPackage, name: string, basePackage: string, registry: GlobalTypeRegistry, dependencies: JavaNativeModule[], nativeConverterBuilder: JavaNativeConverterBuilder);
    addClass(cls: Class<any>): HighLevelDefinition;
    addGlobals(cls: Class<any>): void;
    get compiled(): JavaCompiledModule;
    get globals(): Map<string, ISymbol>;
    get module(): Module;
    loadStaticMethod(method: Method): FunctionalMemberRef;
    registerBEP(bep: BracketExpressionParser): void;
    toSemantic(space: ModuleSpace): SemanticModule;
  }


  class JavaNativeTypeConversionContext {
    readonly definitionByClass: Map;
    readonly globals: Map;
    readonly compiled: JavaCompiledModule;
    readonly context: TypeVariableContext;
    readonly registry: GlobalTypeRegistry;
    readonly packageDefinitions: PackageDefinitions;
    constructor(packageInfo: JavaNativePackageInfo, dependencies: JavaNativeModule[], registry: GlobalTypeRegistry);
  }


  class TypeVariableContext {
    get(variable: TypeVariable): TypeParameter;
    put(variable: TypeVariable, parameter: TypeParameter): void;
    putAllFrom(context: TypeVariableContext): void;
  }

}

declare module 'org.openzen.zencode.java.ZenCodeType' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface OperatorType extends Enum<OperatorType> {}
  class OperatorType extends Enum<OperatorType> {
    static readonly ADD: OperatorType;
    static readonly SUB: OperatorType;
    static readonly MUL: OperatorType;
    static readonly DIV: OperatorType;
    static readonly MOD: OperatorType;
    static readonly CAT: OperatorType;
    static readonly OR: OperatorType;
    static readonly AND: OperatorType;
    static readonly XOR: OperatorType;
    static readonly NEG: OperatorType;
    static readonly INVERT: OperatorType;
    static readonly NOT: OperatorType;
    static readonly INDEXSET: OperatorType;
    static readonly INDEXGET: OperatorType;
    static readonly CONTAINS: OperatorType;
    static readonly COMPARE: OperatorType;
    static readonly MEMBERGETTER: OperatorType;
    static readonly MEMBERSETTER: OperatorType;
    static readonly EQUALS: OperatorType;
    static readonly NOTEQUALS: OperatorType;
    static readonly SHL: OperatorType;
    static readonly SHR: OperatorType;
    static readonly ADDASSIGN: OperatorType;
    static readonly SUBASSIGN: OperatorType;
    static readonly MULASSIGN: OperatorType;
    static readonly DIVASSIGN: OperatorType;
    static readonly MODASSIGN: OperatorType;
    static readonly CATASSIGN: OperatorType;
    static readonly ORASSIGN: OperatorType;
    static readonly ANDASSIGN: OperatorType;
    static readonly XORASSIGN: OperatorType;
    static readonly SHLASSIGN: OperatorType;
    static readonly SHRASSIGN: OperatorType;
    static valueOf(name: string): OperatorType;
    static values(): OperatorType[];
  }

}

declare module 'org.openzen.zencode.shared' {
  import { Exception, Enum, Class } from 'java.lang';
  import { List } from 'java.util';
  import { EqualsComparable, Result } from 'stdlib';
  import { File, Reader } from 'java.io';

  class CharacterEntity {
    readonly charValue: string;
    readonly stringValue: string;
    constructor(stringValue: string, charValue: string);
    get charValue(): string;
    get stringValue(): string;
  }


  class CodePosition {
    static readonly BUILTIN: CodePosition;
    static readonly NATIVE: CodePosition;
    static readonly META: CodePosition;
    static readonly UNKNOWN: CodePosition;
    static readonly GENERATED: CodePosition;
    readonly file: SourceFile;
    readonly fromLine: number;
    readonly fromLineOffset: number;
    readonly toLine: number;
    readonly toLineOffset: number;
    constructor(file: SourceFile, fromLine: number, fromLineOffset: number, toLine: number, toLineOffset: number);
    get file(): SourceFile;
    get filename(): string;
    get fromLine(): number;
    get fromLineOffset(): number;
    get toLine(): number;
    get toLineOffset(): number;
    toShortString(): string;
    toString(): string;
    until(to: CodePosition): CodePosition;
    withLength(characters: number): CodePosition;
  }


  interface CompileException extends Exception {}
  class CompileException extends Exception {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);
    get code(): CompileExceptionCode;
    get message(): string;
    get position(): CodePosition;
    static internalError(message: string): CompileException;
  }


  interface CompileExceptionCode extends Enum<CompileExceptionCode> {}
  class CompileExceptionCode extends Enum<CompileExceptionCode> {
    static readonly UNEXPECTED_TOKEN: CompileExceptionCode;
    static readonly IMPORT_NOT_FOUND: CompileExceptionCode;
    static readonly NO_OUTER_BECAUSE_NOT_INNER: CompileExceptionCode;
    static readonly NO_OUTER_BECAUSE_STATIC: CompileExceptionCode;
    static readonly NO_OUTER_BECAUSE_OUTSIDE_TYPE: CompileExceptionCode;
    static readonly TYPE_ARGUMENTS_INVALID_NUMBER: CompileExceptionCode;
    static readonly TYPE_ARGUMENTS_NOT_INFERRABLE: CompileExceptionCode;
    static readonly USING_STATIC_ON_INSTANCE: CompileExceptionCode;
    static readonly CANNOT_ASSIGN: CompileExceptionCode;
    static readonly UNAVAILABLE_IN_CLOSURE: CompileExceptionCode;
    static readonly USING_PACKAGE_AS_EXPRESSION: CompileExceptionCode;
    static readonly USING_PACKAGE_AS_CALL_TARGET: CompileExceptionCode;
    static readonly USING_TYPE_AS_EXPRESSION: CompileExceptionCode;
    static readonly MEMBER_NO_SETTER: CompileExceptionCode;
    static readonly MEMBER_NO_GETTER: CompileExceptionCode;
    static readonly MEMBER_NOT_STATIC: CompileExceptionCode;
    static readonly MEMBER_IS_FINAL: CompileExceptionCode;
    static readonly MEMBER_DUPLICATE: CompileExceptionCode;
    static readonly CALL_AMBIGUOUS: CompileExceptionCode;
    static readonly CALL_NO_VALID_METHOD: CompileExceptionCode;
    static readonly ENUM_VALUE_DUPLICATE: CompileExceptionCode;
    static readonly INVALID_CAST: CompileExceptionCode;
    static readonly NO_SUCH_INNER_TYPE: CompileExceptionCode;
    static readonly NO_DOLLAR_HERE: CompileExceptionCode;
    static readonly UNSUPPORTED_XML_EXPRESSIONS: CompileExceptionCode;
    static readonly UNSUPPORTED_NAMED_ARGUMENTS: CompileExceptionCode;
    static readonly TYPE_CANNOT_UNITE: CompileExceptionCode;
    static readonly BRACKET_MULTIPLE_EXPRESSIONS: CompileExceptionCode;
    static readonly SUPER_CALL_NO_SUPERCLASS: CompileExceptionCode;
    static readonly LAMBDA_HEADER_INVALID: CompileExceptionCode;
    static readonly COALESCE_TARGET_NOT_OPTIONAL: CompileExceptionCode;
    static readonly MULTIPLE_MATCHING_HINTS: CompileExceptionCode;
    static readonly MISSING_MAP_KEY: CompileExceptionCode;
    static readonly NO_SUCH_MEMBER: CompileExceptionCode;
    static readonly USING_THIS_OUTSIDE_TYPE: CompileExceptionCode;
    static readonly USING_THIS_STATIC: CompileExceptionCode;
    static readonly UNDEFINED_VARIABLE: CompileExceptionCode;
    static readonly METHOD_BODY_REQUIRED: CompileExceptionCode;
    static readonly BREAK_OUTSIDE_LOOP: CompileExceptionCode;
    static readonly CONTINUE_OUTSIDE_LOOP: CompileExceptionCode;
    static readonly NO_SUCH_ITERATOR: CompileExceptionCode;
    static readonly NO_SUCH_TYPE: CompileExceptionCode;
    static readonly RETURN_VALUE_REQUIRED: CompileExceptionCode;
    static readonly RETURN_VALUE_VOID: CompileExceptionCode;
    static readonly INVALID_CONDITION: CompileExceptionCode;
    static readonly INTERNAL_ERROR: CompileExceptionCode;
    static readonly CANNOT_SET_FINAL_VARIABLE: CompileExceptionCode;
    static readonly MISSING_PARAMETER: CompileExceptionCode;
    static readonly STATEMENT_OUTSIDE_SWITCH_CASE: CompileExceptionCode;
    static readonly MISSING_VARIANT_CASEPARAMETERS: CompileExceptionCode;
    static readonly INVALID_SWITCH_CASE: CompileExceptionCode;
    static readonly TRY_CONVERT_OUTSIDE_FUNCTION: CompileExceptionCode;
    static readonly TRY_CONVERT_ILLEGAL_TARGET: CompileExceptionCode;
    static readonly TRY_RETHROW_NOT_A_RESULT: CompileExceptionCode;
    static readonly DIFFERENT_EXCEPTIONS: CompileExceptionCode;
    static readonly UNKNOWN_ANNOTATION: CompileExceptionCode;
    static readonly OVERRIDE_WITHOUT_BASE: CompileExceptionCode;
    static readonly OVERRIDE_AMBIGUOUS: CompileExceptionCode;
    static readonly OVERRIDE_CONSTRUCTOR: CompileExceptionCode;
    static readonly PRECOMPILE_FAILED: CompileExceptionCode;
    static readonly UNTYPED_EMPTY_ARRAY: CompileExceptionCode;
    static readonly UNTYPED_EMPTY_MAP: CompileExceptionCode;
    static readonly VAR_WITHOUT_TYPE_OR_INITIALIZER: CompileExceptionCode;
    static readonly NO_BRACKET_PARSER: CompileExceptionCode;
    static readonly INVALID_BRACKET_EXPRESSION: CompileExceptionCode;
    static readonly VARIANT_OPTION_NOT_AN_EXPRESSION: CompileExceptionCode;
    static readonly DUPLICATE_GLOBAL: CompileExceptionCode;
    static readonly CANNOT_INFER_RETURN_TYPE: CompileExceptionCode;
    static readonly INVALID_SUFFIX: CompileExceptionCode;
    static readonly NO_SUCH_MODULE: CompileExceptionCode;
    static readonly NO_SUCH_STORAGE_TYPE: CompileExceptionCode;
    static readonly INVALID_STORAGE_TYPE_ARGUMENTS: CompileExceptionCode;
    static readonly STORAGE_NOT_SUPPORTED: CompileExceptionCode;
    static readonly INCOMPATIBLE_STORAGE_TAG: CompileExceptionCode;
    static readonly INVALID_TYPE_ARGUMENTS: CompileExceptionCode;
    static readonly PARSE_ERROR: CompileExceptionCode;
    static valueOf(name: string): CompileExceptionCode;
    static values(): CompileExceptionCode[];
  }


  class ConcatMap<K extends EqualsComparable<K> = any, V = any> {
    concat(key: K, value: V): ConcatMap<K, V>;
    contains(key: K): boolean;
    static empty<K extends EqualsComparable<K>, V>(typeOfK: Class<K>, typeOfV: Class<V>): ConcatMap<K, V>;
    get isEmpty(): boolean;
    getAt(key: K): V;
    getOrDefault(key: K, defaultValue: V): V;
  }


  interface FileSourceFile extends SourceFile {}
  class FileSourceFile extends SourceFile {
    readonly name: string;
    readonly file: File;
    constructor(name: string, file: File);
    get filename(): string;
    open(): Reader;
    update(content: string): void;
  }


  interface LiteralSourceFile extends SourceFile {}
  class LiteralSourceFile extends SourceFile {
    readonly filename: string;
    constructor(filename: string, contents: string);
    get filename(): string;
    open(): Reader;
    update(contents: string): void;
  }


  class SourceFile {
    get filename(): string;
    get order(): number;
    open(): Reader;
    update(var1: string): void;
  }


  class StringExpansion {
    static capitalize(self: string): string;
    static escape(self: string, quote: string, escapeUnicode: boolean): string;
    static unescape(self: string): Result<string, string>;
  }


  class Tag {
  }


  class Taggable {
    addAllTagsFrom(other: Taggable): void;
    getTag<T extends Tag>(typeOfT: Class<T>): T;
    hasTag<T extends Tag>(typeOfT: Class<T>): boolean;
    setTag<T extends Tag>(typeOfT: Class<T>, tag: T): void;
  }


  interface VirtualSourceFile extends SourceFile {}
  class VirtualSourceFile extends SourceFile {
    readonly filename: string;
    constructor(filename: string);
    get filename(): string;
    open(): Reader;
    update(content: string): void;
  }

}

declare module 'org.openzen.zencode.shared.logging' {
  import { CompileException, SourceFile } from 'org.openzen.zencode.shared';
  import { Throwable } from 'java.lang';

  class CompileExceptionLogger {
    logCompileException(var1: CompileException): void;
  }


  class IZSLogger {
    debug(var1: string): void;
    error(var1: string): void;
    info(var1: string): void;
    throwingErr(var1: string, var2: Throwable): void;
    throwingWarn(var1: string, var2: Throwable): void;
    trace(var1: string): void;
    warning(var1: string): void;
  }


  class SourceFileLogger {
    logSourceFile(var1: SourceFile): void;
  }

}

declare module 'org.openzen.zenscript.codemodel' {
  import { Enum } from 'java.lang';
  import { List, Map } from 'java.util';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { TypeID, GlobalTypeRegistry, GenericTypeID, DefinitionTypeID, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { CallArguments, Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { CodePosition, Taggable, SourceFile, Tag } from 'org.openzen.zencode.shared';
  import { ParameterAnnotation, DefinitionAnnotation, AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { ZSPackage, MemberCollector, DefinitionVisitor, DefinitionVisitorWithContext, ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { IDefinitionMember, FieldMember } from 'org.openzen.zenscript.codemodel.member';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { State } from 'org.openzen.zenscript.codemodel.SemanticModule';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { ModuleContext } from 'org.openzen.zenscript.codemodel.context';

  class AccessScope {
    readonly module: Module;
    readonly definition: HighLevelDefinition;
    constructor(module: Module, definition: HighLevelDefinition);
    equals(obj: any): boolean;
    hasAccessTo(other: AccessScope, access: number): boolean;
    hashCode(): number;
  }


  interface CompareType extends Enum<CompareType> {}
  class CompareType extends Enum<CompareType> {
    static readonly LT: CompareType;
    static readonly GT: CompareType;
    static readonly EQ: CompareType;
    static readonly NE: CompareType;
    static readonly LE: CompareType;
    static readonly GE: CompareType;
    static valueOf(name: string): CompareType;
    static values(): CompareType[];
  }


  class FunctionHeader {
    readonly typeParameters: TypeParameter[];
    readonly parameters: FunctionParameter[];
    readonly thrownType: TypeID;
    readonly minParameters: number;
    readonly maxParameters: number;
    readonly hasUnknowns: boolean;
    constructor(returnType: TypeID);

    constructor(returnType: TypeID, ...parameterTypes: TypeID[]);

    constructor(returnType: TypeID, ...parameters: FunctionParameter[]);

    constructor(typeParameters: TypeParameter[], returnType: TypeID, thrownType: TypeID, ...parameters: FunctionParameter[]);
    accepts(scope: TypeScope, ...arguments: Expression[]): boolean;
    accepts(arguments: number): boolean;
    canOverride(scope: TypeScope, other: FunctionHeader): boolean;
    equals(o: any): boolean;
    explainWhyIncompatible(scope: TypeScope, arguments: CallArguments): string;
    fillGenericArguments(position: CodePosition, scope: TypeScope, arguments: TypeID[]): FunctionHeader;
    forLambda(lambdaHeader: FunctionHeader): FunctionHeader;
    forTypeParameterInference(): FunctionHeader;
    get canonical(): string;
    get canonicalWithoutReturnType(): string;
    get numberOfTypeParameters(): number;
    get returnType(): TypeID;
    get variadicParameter(): FunctionParameter;
    getParameter(isVariadic: boolean, index: number): FunctionParameter;
    getParameterType(isVariadic: boolean, index: number): TypeID;
    hasAnyDefaultValues(): boolean;
    hasInferenceBlockingTypeParameters(parameters: TypeParameter[]): boolean;
    hashCode(): number;
    inferFromOverride(registry: GlobalTypeRegistry, overridden: FunctionHeader): FunctionHeader;
    instanceForCall(position: CodePosition, registry: GlobalTypeRegistry, arguments: CallArguments): FunctionHeader;
    isDenormalized(): boolean;
    isEquivalentTo(other: FunctionHeader): boolean;
    isSimilarTo(other: FunctionHeader): boolean;
    isVariadic(): boolean;
    isVariadicCall(arguments: CallArguments, scope: TypeScope): boolean;
    isVariadicCall(arguments: CallArguments): boolean;
    matchesExactly(position: CodePosition, arguments: CallArguments, scope: TypeScope): boolean;
    matchesImplicitly(position: CodePosition, arguments: CallArguments, scope: TypeScope): boolean;
    normalize(registry: GlobalTypeRegistry): FunctionHeader;
    set returnType(returnType: TypeID);
    toString(): string;
    useTypeParameters(): boolean[];
    withGenericArguments(mapper: GenericMapper): FunctionHeader;
  }


  interface FunctionParameter extends Taggable {}
  class FunctionParameter extends Taggable {
    static readonly NONE: FunctionParameter[];
    readonly type: TypeID;
    readonly name: string;
    readonly variadic: boolean;
    annotations: ParameterAnnotation[];
    defaultValue: Expression;
    constructor(type: TypeID);

    constructor(type: TypeID, name: string);

    constructor(type: TypeID, name: string, defaultValue: Expression, variadic: boolean);

    constructor(type: TypeID, name: string, variadic: boolean);
    equals(obj: any): boolean;
    hashCode(): number;
    normalize(registry: GlobalTypeRegistry): FunctionParameter;
    toString(): string;
    withGenericArguments(mapper: GenericMapper): FunctionParameter;
  }


  class GenericMapper {
    static readonly EMPTY: GenericMapper;
    readonly position: CodePosition;
    readonly registry: GlobalTypeRegistry;
    constructor(position: CodePosition, registry: GlobalTypeRegistry, mapping: Map<TypeParameter, TypeID>);
    get mapping(): Map<TypeParameter, TypeID>;
    getInner(position: CodePosition, registry: GlobalTypeRegistry, mapping: Map<TypeParameter, TypeID>): GenericMapper;
    getInner(position: CodePosition, registry: GlobalTypeRegistry, parameters: TypeParameter[]): GenericMapper;
    map(original: TypeID): TypeID;
    map(original: TypeID[]): TypeID[];
    map(original: FunctionHeader): FunctionHeader;
    mapGeneric(type: GenericTypeID): TypeID;
    toString(): string;
  }


  class GenericName {
    readonly name: string;
    readonly arguments: TypeID[];
    constructor(name: string);

    constructor(name: string, arguments: TypeID[]);
    get numberOfArguments(): number;
    static getInnerType(registry: GlobalTypeRegistry, type: DefinitionTypeID, name: GenericName[], index: number): TypeID;
    hasArguments(): boolean;
    hasNoArguments(): boolean;
    toString(): string;
  }


  interface HighLevelDefinition extends Taggable {}
  class HighLevelDefinition extends Taggable {
    readonly position: CodePosition;
    readonly module: Module;
    readonly pkg: ZSPackage;
    readonly name: string;
    readonly modifiers: number;
    readonly members: List;
    typeParameters: TypeParameter[];
    annotations: DefinitionAnnotation[];
    outerDefinition: HighLevelDefinition;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(var1: DefinitionVisitor<T>): T;
    accept<C, R>(var1: C, var2: DefinitionVisitorWithContext<C, R>): R;
    addMember(member: IDefinitionMember): void;
    collectMembers(collector: MemberCollector): void;
    get accessScope(): AccessScope;
    get fields(): FieldMember[];
    get fullName(): string;
    get numberOfGenericParameters(): number;
    get superType(): TypeID;
    getInnerType(name: string): HighLevelDefinition;
    hasEmptyConstructor(): boolean;
    isAlias(): boolean;
    isExpansion(): boolean;
    isInnerDefinition(): boolean;
    isInterface(): boolean;
    isOuterOf(definition: HighLevelDefinition): boolean;
    isStatic(): boolean;
    isSubclassOf(other: HighLevelDefinition): boolean;
    normalize(scope: TypeScope): void;
    set superType(superType: TypeID);
    setOuterDefinition(outerDefinition: HighLevelDefinition): void;
    setTypeParameters(typeParameters: TypeParameter[]): void;
  }


  class Modifiers {
    static readonly PUBLIC: number;
    static readonly INTERNAL: number;
    static readonly PRIVATE: number;
    static readonly ABSTRACT: number;
    static readonly FINAL: number;
    static readonly CONST: number;
    static readonly CONST_OPTIONAL: number;
    static readonly STATIC: number;
    static readonly PROTECTED: number;
    static readonly IMPLICIT: number;
    static readonly VIRTUAL: number;
    static readonly EXTERN: number;
    static readonly OVERRIDE: number;
    static describe(modifiers: number): string;
    static hasAccess(modifiers: number): boolean;
    static isAbstract(modifiers: number): boolean;
    static isConst(modifiers: number): boolean;
    static isConstOptional(modifiers: number): boolean;
    static isExtern(modifiers: number): boolean;
    static isFinal(modifiers: number): boolean;
    static isImplicit(modifiers: number): boolean;
    static isInternal(modifiers: number): boolean;
    static isOverride(modifiers: number): boolean;
    static isPrivate(modifiers: number): boolean;
    static isProtected(modifiers: number): boolean;
    static isPublic(modifiers: number): boolean;
    static isStatic(modifiers: number): boolean;
    static isVirtual(modifiers: number): boolean;
  }


  class Module {
    static readonly BUILTIN: Module;
    readonly name: string;
    constructor(name: string);
    toString(): string;
  }


  class ModuleProcessor {
    process(var1: ScriptBlock): ScriptBlock;
    process(var1: HighLevelDefinition): void;
  }


  class ModuleSpace {
    readonly rootPackage: ZSPackage;
    readonly registry: GlobalTypeRegistry;
    readonly globalsPackage: ZSPackage;
    constructor(registry: GlobalTypeRegistry, annotations: AnnotationDefinition[]);
    addGlobal(name: string, global: ISymbol): void;
    addModule(name: string, dependency: SemanticModule): void;
    collectExpansions(): ExpansionDefinition[];
    collectGlobals(): Map<string, ISymbol>;
    collectPackages(): ZSPackage;
    get annotations(): AnnotationDefinition[];
    getModule(name: string): SemanticModule;
  }


  interface OperatorType extends Enum<OperatorType> {}
  class OperatorType extends Enum<OperatorType> {
    static readonly ADD: OperatorType;
    static readonly SUB: OperatorType;
    static readonly MUL: OperatorType;
    static readonly DIV: OperatorType;
    static readonly MOD: OperatorType;
    static readonly CAT: OperatorType;
    static readonly OR: OperatorType;
    static readonly AND: OperatorType;
    static readonly XOR: OperatorType;
    static readonly NEG: OperatorType;
    static readonly INVERT: OperatorType;
    static readonly NOT: OperatorType;
    static readonly INDEXSET: OperatorType;
    static readonly INDEXGET: OperatorType;
    static readonly CONTAINS: OperatorType;
    static readonly COMPARE: OperatorType;
    static readonly MEMBERGETTER: OperatorType;
    static readonly MEMBERSETTER: OperatorType;
    static readonly EQUALS: OperatorType;
    static readonly NOTEQUALS: OperatorType;
    static readonly SAME: OperatorType;
    static readonly NOTSAME: OperatorType;
    static readonly SHL: OperatorType;
    static readonly SHR: OperatorType;
    static readonly USHR: OperatorType;
    static readonly ADDASSIGN: OperatorType;
    static readonly SUBASSIGN: OperatorType;
    static readonly MULASSIGN: OperatorType;
    static readonly DIVASSIGN: OperatorType;
    static readonly MODASSIGN: OperatorType;
    static readonly CATASSIGN: OperatorType;
    static readonly ORASSIGN: OperatorType;
    static readonly ANDASSIGN: OperatorType;
    static readonly XORASSIGN: OperatorType;
    static readonly SHLASSIGN: OperatorType;
    static readonly SHRASSIGN: OperatorType;
    static readonly USHRASSIGN: OperatorType;
    static readonly INCREMENT: OperatorType;
    static readonly DECREMENT: OperatorType;
    static readonly RANGE: OperatorType;
    static readonly CONSTRUCTOR: OperatorType;
    static readonly DESTRUCTOR: OperatorType;
    static readonly CALL: OperatorType;
    static readonly CAST: OperatorType;
    static valueOf(name: string): OperatorType;
    static values(): OperatorType[];
  }


  class PackageDefinitions {
    add(definition: HighLevelDefinition): void;
    get all(): HighLevelDefinition[];
    getDefinition(name: string): HighLevelDefinition;
    registerExpansionsTo(expansions: ExpansionDefinition[]): void;
    registerTo(pkg: ZSPackage): void;
  }


  interface ScriptBlock extends Taggable {}
  class ScriptBlock extends Taggable {
    readonly file: SourceFile;
    readonly module: Module;
    readonly pkg: ZSPackage;
    readonly scriptHeader: FunctionHeader;
    readonly statements: List;
    constructor(file: SourceFile, module: Module, pkg: ZSPackage, scriptHeader: FunctionHeader, statements: Statement[]);
    normalize(scope: TypeScope): ScriptBlock;
    withStatements(newStatements: Statement[]): ScriptBlock;
  }


  class SemanticModule {
    static readonly NONE: SemanticModule[];
    readonly name: string;
    readonly dependencies: SemanticModule[];
    readonly parameters: FunctionParameter[];
    readonly state: State;
    readonly module: Module;
    readonly rootPackage: ZSPackage;
    readonly modulePackage: ZSPackage;
    readonly definitions: PackageDefinitions;
    readonly scripts: List;
    readonly globals: Map;
    readonly registry: GlobalTypeRegistry;
    readonly expansions: List;
    readonly annotations: AnnotationDefinition[];
    readonly logger: IZSLogger;
    constructor(module: Module, dependencies: SemanticModule[], parameters: FunctionParameter[], state: State, rootPackage: ZSPackage, modulePackage: ZSPackage, definitions: PackageDefinitions, scripts: ScriptBlock[], registry: GlobalTypeRegistry, expansions: ExpansionDefinition[], annotations: AnnotationDefinition[], logger: IZSLogger);
    get context(): ModuleContext;
    isValid(): boolean;
    normalize(): SemanticModule;
  }


  interface WhitespaceInfo extends Tag {}
  class WhitespaceInfo extends Tag {
    emptyLine: boolean;
    commentsBefore: string[];
    commentsAfter: string;
    constructor(emptyLine: boolean, commentsBefore: string[], commentsAfter: string);
    static from(whitespaceBefore: string, lineAfter: string, skipLineBefore: boolean): WhitespaceInfo;
  }


  interface WhitespacePostComment extends Tag {}
  class WhitespacePostComment extends Tag {
    readonly comments: string[];
    constructor(comments: string[]);
    static fromWhitespace(whitespace: string): WhitespacePostComment;
  }

}

declare module 'org.openzen.zenscript.codemodel.annotations' {
  import { List } from 'java.util';
  import { FunctionHeader, HighLevelDefinition, FunctionParameter, ModuleProcessor, ScriptBlock } from 'org.openzen.zenscript.codemodel';
  import { BaseScope, ExpressionScope, StatementScope } from 'org.openzen.zenscript.codemodel.scope';
  import { IDefinitionMember, FunctionalMember, GetterMember, SetterMember } from 'org.openzen.zenscript.codemodel.member';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { CodePosition, CompileExceptionCode, CompileException, Tag } from 'org.openzen.zencode.shared';
  import { CallArguments, Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { CodeSerializationInput, CodeSerializationOutput } from 'org.openzen.zenscript.codemodel.serialization';
  import { TypeContext, StatementContext, TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';

  class AnnotationDefinition {
    createForDefinition(var1: CodePosition, var2: CallArguments): DefinitionAnnotation;
    createForMember(var1: CodePosition, var2: CallArguments): MemberAnnotation;
    createForParameter(var1: CodePosition, var2: CallArguments): ParameterAnnotation;
    createForStatement(var1: CodePosition, var2: CallArguments): StatementAnnotation;
    deserializeForDefinition(var1: CodeSerializationInput, var2: TypeContext): DefinitionAnnotation;
    deserializeForMember(var1: CodeSerializationInput, var2: TypeContext, var3: IDefinitionMember): MemberAnnotation;
    deserializeForParameter(var1: CodeSerializationInput, var2: TypeContext): ParameterAnnotation;
    deserializeForStatement(var1: CodeSerializationInput, var2: StatementContext): StatementAnnotation;
    get annotationName(): string;
    getInitializers(var1: BaseScope): FunctionHeader[];
    getScopeForMember(var1: IDefinitionMember, var2: BaseScope): ExpressionScope;
    getScopeForParameter(var1: FunctionHeader, var2: FunctionParameter, var3: BaseScope): ExpressionScope;
    getScopeForStatement(var1: Statement, var2: StatementScope): ExpressionScope;
    getScopeForType(var1: HighLevelDefinition, var2: BaseScope): ExpressionScope;
  }


  interface AnnotationProcessor extends ModuleProcessor {}
  class AnnotationProcessor extends ModuleProcessor {
    constructor(context: TypeResolutionContext, expansions: ExpansionDefinition[]);
    process(block: ScriptBlock): ScriptBlock;
    process(definition: HighLevelDefinition): void;
  }


  class DefinitionAnnotation {
    static readonly NONE: DefinitionAnnotation[];
    apply(var1: HighLevelDefinition, var2: BaseScope): void;
    applyOnSubtype(var1: HighLevelDefinition, var2: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(var1: CodeSerializationOutput, var2: HighLevelDefinition, var3: TypeContext): void;
  }


  interface InvalidAnnotationDefinition extends AnnotationDefinition {}
  class InvalidAnnotationDefinition extends AnnotationDefinition {
    static readonly INSTANCE: InvalidAnnotationDefinition;
    createForDefinition(position: CodePosition, arguments: CallArguments): DefinitionAnnotation;
    createForMember(position: CodePosition, arguments: CallArguments): MemberAnnotation;
    createForParameter(position: CodePosition, arguments: CallArguments): ParameterAnnotation;
    createForStatement(position: CodePosition, arguments: CallArguments): StatementAnnotation;
    deserializeForDefinition(input: CodeSerializationInput, context: TypeContext): DefinitionAnnotation;
    deserializeForMember(input: CodeSerializationInput, context: TypeContext, member: IDefinitionMember): MemberAnnotation;
    deserializeForParameter(input: CodeSerializationInput, context: TypeContext): ParameterAnnotation;
    deserializeForStatement(input: CodeSerializationInput, context: StatementContext): StatementAnnotation;
    get annotationName(): string;
    getInitializers(scope: BaseScope): FunctionHeader[];
    getScopeForMember(member: IDefinitionMember, scope: BaseScope): ExpressionScope;
    getScopeForParameter(header: FunctionHeader, parameter: FunctionParameter, scope: BaseScope): ExpressionScope;
    getScopeForStatement(statement: Statement, scope: StatementScope): ExpressionScope;
    getScopeForType(definition: HighLevelDefinition, scope: BaseScope): ExpressionScope;
  }


  interface InvalidDefinitionAnnotation extends DefinitionAnnotation {}
  class InvalidDefinitionAnnotation extends DefinitionAnnotation {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);

    constructor(ex: CompileException);
    apply(definition: HighLevelDefinition, scope: BaseScope): void;
    applyOnSubtype(definition: HighLevelDefinition, scope: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(output: CodeSerializationOutput, definition: HighLevelDefinition, context: TypeContext): void;
  }


  interface InvalidMemberAnnotation extends MemberAnnotation {}
  class InvalidMemberAnnotation extends MemberAnnotation {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(ex: CompileException);
    apply(member: IDefinitionMember, scope: BaseScope): void;
    applyOnOverridingGetter(member: GetterMember, scope: BaseScope): void;
    applyOnOverridingMethod(member: FunctionalMember, scope: BaseScope): void;
    applyOnOverridingSetter(member: SetterMember, scope: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(output: CodeSerializationOutput, member: IDefinitionMember, context: TypeContext): void;
  }


  interface InvalidParameterAnnotation extends ParameterAnnotation {}
  class InvalidParameterAnnotation extends ParameterAnnotation {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);

    constructor(ex: CompileException);
    apply(): void;
    get definition(): AnnotationDefinition;
  }


  interface InvalidStatementAnnotation extends StatementAnnotation {}
  class InvalidStatementAnnotation extends StatementAnnotation {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);

    constructor(ex: CompileException);
    apply(statement: Statement, scope: StatementScope): Statement;
    get definition(): AnnotationDefinition;
  }


  class MemberAnnotation {
    static readonly NONE: MemberAnnotation[];
    apply(var1: IDefinitionMember, var2: BaseScope): void;
    applyOnOverridingGetter(var1: GetterMember, var2: BaseScope): void;
    applyOnOverridingMethod(var1: FunctionalMember, var2: BaseScope): void;
    applyOnOverridingSetter(var1: SetterMember, var2: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(var1: CodeSerializationOutput, var2: IDefinitionMember, var3: TypeContext): void;
  }


  interface NativeAnnotationDefinition extends AnnotationDefinition {}
  class NativeAnnotationDefinition extends AnnotationDefinition {
    static readonly INSTANCE: NativeAnnotationDefinition;
    createForDefinition(position: CodePosition, arguments: CallArguments): DefinitionAnnotation;
    createForMember(position: CodePosition, arguments: CallArguments): MemberAnnotation;
    createForParameter(position: CodePosition, arguments: CallArguments): ParameterAnnotation;
    createForStatement(position: CodePosition, arguments: CallArguments): StatementAnnotation;
    deserializeForDefinition(input: CodeSerializationInput, context: TypeContext): DefinitionAnnotation;
    deserializeForMember(input: CodeSerializationInput, context: TypeContext, member: IDefinitionMember): MemberAnnotation;
    deserializeForParameter(input: CodeSerializationInput, context: TypeContext): ParameterAnnotation;
    deserializeForStatement(input: CodeSerializationInput, context: StatementContext): StatementAnnotation;
    get annotationName(): string;
    getInitializers(scope: BaseScope): FunctionHeader[];
    getScopeForMember(member: IDefinitionMember, scope: BaseScope): ExpressionScope;
    getScopeForParameter(header: FunctionHeader, parameter: FunctionParameter, scope: BaseScope): ExpressionScope;
    getScopeForStatement(statement: Statement, scope: StatementScope): ExpressionScope;
    getScopeForType(definition: HighLevelDefinition, scope: BaseScope): ExpressionScope;
  }


  interface NativeDefinitionAnnotation extends DefinitionAnnotation {}
  class NativeDefinitionAnnotation extends DefinitionAnnotation {
    constructor(identifier: string);
    apply(definition: HighLevelDefinition, scope: BaseScope): void;
    applyOnSubtype(definition: HighLevelDefinition, scope: BaseScope): void;
    get definition(): AnnotationDefinition;
    get identifier(): string;
    serialize(output: CodeSerializationOutput, definition: HighLevelDefinition, context: TypeContext): void;
  }


  interface NativeMemberAnnotation extends MemberAnnotation {}
  class NativeMemberAnnotation extends MemberAnnotation {
    constructor(identifier: string);
    apply(member: IDefinitionMember, scope: BaseScope): void;
    applyOnOverridingGetter(member: GetterMember, scope: BaseScope): void;
    applyOnOverridingMethod(member: FunctionalMember, scope: BaseScope): void;
    applyOnOverridingSetter(member: SetterMember, scope: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(output: CodeSerializationOutput, member: IDefinitionMember, context: TypeContext): void;
  }


  interface NativeTag extends Tag {}
  class NativeTag extends Tag {
    readonly value: string;
    constructor(value: string);
  }


  class ParameterAnnotation {
    static readonly NONE: ParameterAnnotation[];
    apply(): void;
    get definition(): AnnotationDefinition;
  }


  interface PreconditionAnnotationDefinition extends AnnotationDefinition {}
  class PreconditionAnnotationDefinition extends AnnotationDefinition {
    static readonly INSTANCE: PreconditionAnnotationDefinition;
    createForDefinition(position: CodePosition, arguments: CallArguments): DefinitionAnnotation;
    createForMember(position: CodePosition, arguments: CallArguments): MemberAnnotation;
    createForParameter(position: CodePosition, arguments: CallArguments): ParameterAnnotation;
    createForStatement(position: CodePosition, arguments: CallArguments): StatementAnnotation;
    deserializeForDefinition(input: CodeSerializationInput, context: TypeContext): DefinitionAnnotation;
    deserializeForMember(input: CodeSerializationInput, context: TypeContext, member: IDefinitionMember): MemberAnnotation;
    deserializeForParameter(input: CodeSerializationInput, context: TypeContext): ParameterAnnotation;
    deserializeForStatement(input: CodeSerializationInput, context: StatementContext): StatementAnnotation;
    get annotationName(): string;
    getInitializers(scope: BaseScope): FunctionHeader[];
    getScopeForMember(member: IDefinitionMember, scope: BaseScope): ExpressionScope;
    getScopeForParameter(header: FunctionHeader, parameter: FunctionParameter, scope: BaseScope): ExpressionScope;
    getScopeForStatement(statement: Statement, scope: StatementScope): ExpressionScope;
    getScopeForType(definition: HighLevelDefinition, scope: BaseScope): ExpressionScope;
  }


  interface PreconditionForMethod extends MemberAnnotation {}
  class PreconditionForMethod extends MemberAnnotation {
    constructor(position: CodePosition, enforcement: string, condition: Expression, message: Expression);
    apply(member: IDefinitionMember, scope: BaseScope): void;
    applyOnOverridingGetter(member: GetterMember, scope: BaseScope): void;
    applyOnOverridingMethod(member: FunctionalMember, scope: BaseScope): void;
    applyOnOverridingSetter(member: SetterMember, scope: BaseScope): void;
    get definition(): AnnotationDefinition;
    serialize(output: CodeSerializationOutput, member: IDefinitionMember, context: TypeContext): void;
  }


  class StatementAnnotation {
    static readonly NONE: StatementAnnotation[];
    apply(var1: Statement, var2: StatementScope): Statement;
    get definition(): AnnotationDefinition;
  }

}

declare module 'org.openzen.zenscript.codemodel.context' {
  import { Module, HighLevelDefinition, GenericName, FunctionHeader, FunctionParameter, GenericMapper } from 'org.openzen.zenscript.codemodel';
  import { ZSPackage, ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { List, Map } from 'java.util';
  import { TypeID, DefinitionTypeID, GlobalTypeRegistry, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { VariantOptionSwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { LoopStatement, VarStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { LambdaClosure } from 'org.openzen.zenscript.codemodel.expression';
  import { TypeMembers } from 'org.openzen.zenscript.codemodel.type.member';

  class CompilingPackage {
    readonly module: Module;
    constructor(pkg: ZSPackage, module: Module);
    addPackage(name: string, package_: CompilingPackage): void;
    addType(name: string, type: CompilingType): void;
    get package(): ZSPackage;
    getImport(context: TypeResolutionContext, name: string[]): HighLevelDefinition;
    getOrCreatePackage(name: string): CompilingPackage;
    getType(context: TypeResolutionContext, name: GenericName[]): TypeID;
  }


  class CompilingType {
    getInner(var1: string): CompilingType;
    getInnerType(registry: GlobalTypeRegistry, name: GenericName[], index: number, outer: DefinitionTypeID): DefinitionTypeID;
    load(): HighLevelDefinition;
  }


  interface FileResolutionContext extends TypeResolutionContext {}
  class FileResolutionContext extends TypeResolutionContext {
    constructor(module: ModuleTypeResolutionContext, root: ZSPackage, modulePackage: CompilingPackage);
    addImport(name: string, definition: HighLevelDefinition): void;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    get typeRegistry(): GlobalTypeRegistry;
    getAnnotation(name: string): AnnotationDefinition;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface LocalTypeResolutionContext extends TypeResolutionContext {}
  class LocalTypeResolutionContext extends TypeResolutionContext {
    constructor(outer: TypeResolutionContext, type: CompilingType, parameters: TypeParameter[]);
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    get typeRegistry(): GlobalTypeRegistry;
    getAnnotation(name: string): AnnotationDefinition;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  class ModuleContext {
    readonly registry: GlobalTypeRegistry;
    readonly module: Module;
    readonly expansions: List;
    readonly root: ZSPackage;
    constructor(registry: GlobalTypeRegistry, module: Module, expansions: ExpansionDefinition[], root: ZSPackage);
  }


  interface ModuleTypeResolutionContext extends TypeResolutionContext {}
  class ModuleTypeResolutionContext extends TypeResolutionContext {
    constructor(registry: GlobalTypeRegistry, annotations: AnnotationDefinition[], rootPackage: ZSPackage, rootCompiling: CompilingPackage, globals: Map<string, ISymbol>);
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    get typeRegistry(): GlobalTypeRegistry;
    getAnnotation(name: string): AnnotationDefinition;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface StatementContext extends TypeContext {}
  class StatementContext extends TypeContext {
    variantOptionSwitchValue: VariantOptionSwitchValue;
    constructor(position: CodePosition, module: ModuleContext, thisType: TypeID);

    constructor(position: CodePosition, module: ModuleContext, thisType: TypeID, header: FunctionHeader);

    constructor(position: CodePosition, outer: TypeContext);

    constructor(outer: TypeContext);

    constructor(outer: TypeContext, header: FunctionHeader);

    constructor(position: CodePosition, outer: TypeContext, header: FunctionHeader);

    constructor(outer: StatementContext);

    constructor(outer: StatementContext, loop: LoopStatement);

    constructor(outer: StatementContext, lambdaHeader: FunctionHeader, lambdaClosure: LambdaClosure);
    add(variable: VarStatement): void;
    get lambdaClosure(): LambdaClosure;
    get lambdaOuter(): StatementContext;
    getLoop(id: number): LoopStatement;
    getLoopId(loop: LoopStatement): number;
    getParameter(id: number): FunctionParameter;
    getParameterIndex(parameter: FunctionParameter): number;
    getVariable(id: number): VarStatement;
    getVariableId(variable: VarStatement): number;
  }


  class TypeContext {
    readonly thisType: TypeID;
    readonly moduleContext: ModuleContext;
    constructor(context: ModuleContext, parameters: TypeParameter[], thisType: TypeID);

    constructor(position: CodePosition, context: ModuleContext, parameters: TypeParameter[], thisType: TypeID);

    constructor(outer: TypeContext, thisType: TypeID, ...inner: TypeParameter[]);

    constructor(position: CodePosition, outer: TypeContext, thisType: TypeID, ...inner: TypeParameter[]);

    constructor(position: CodePosition, outer: TypeContext, thisType: TypeID, inner: TypeParameter[]);
    static concat<T>(first: T[], second: T[]): T[];
    get mapper(): GenericMapper;
    get position(): CodePosition;
    getId(parameter: TypeParameter): number;
    getTypeMembers(type: TypeID): TypeMembers;
    getTypeParameter(index: number): TypeParameter;
  }


  class TypeResolutionContext {
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    get typeRegistry(): GlobalTypeRegistry;
    getAnnotation(var1: string): AnnotationDefinition;
    getType(var1: CodePosition, var2: GenericName[]): TypeID;
  }

}

declare module 'org.openzen.zenscript.codemodel.definition' {
  import { HighLevelDefinition, Module, FunctionHeader, GenericName } from 'org.openzen.zenscript.codemodel';
  import { TypeID, GlobalTypeRegistry } from 'org.openzen.zenscript.codemodel.type';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { List, Optional } from 'java.util';
  import { EnumConstantMember, CallerMember, IDefinitionMember } from 'org.openzen.zenscript.codemodel.member';
  import { TypeMemberGroup } from 'org.openzen.zenscript.codemodel.type.member';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { Option } from 'org.openzen.zenscript.codemodel.definition.VariantDefinition';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';

  interface AliasDefinition extends HighLevelDefinition {}
  class AliasDefinition extends HighLevelDefinition {
    type: TypeID;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    isStatic(): boolean;
    normalize(scope: TypeScope): void;
    setType(type: TypeID): void;
  }


  interface ClassDefinition extends HighLevelDefinition {}
  class ClassDefinition extends HighLevelDefinition {
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number);

    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): void;
  }


  class DefinitionVisitor<T = any> {
    visitAlias(var1: AliasDefinition): T;
    visitClass(var1: ClassDefinition): T;
    visitEnum(var1: EnumDefinition): T;
    visitExpansion(var1: ExpansionDefinition): T;
    visitFunction(var1: FunctionDefinition): T;
    visitInterface(var1: InterfaceDefinition): T;
    visitStruct(var1: StructDefinition): T;
    visitVariant(var1: VariantDefinition): T;
  }


  class DefinitionVisitorWithContext<C = any, R = any> {
    visitAlias(var1: C, var2: AliasDefinition): R;
    visitClass(var1: C, var2: ClassDefinition): R;
    visitEnum(var1: C, var2: EnumDefinition): R;
    visitExpansion(var1: C, var2: ExpansionDefinition): R;
    visitFunction(var1: C, var2: FunctionDefinition): R;
    visitInterface(var1: C, var2: InterfaceDefinition): R;
    visitStruct(var1: C, var2: StructDefinition): R;
    visitVariant(var1: C, var2: VariantDefinition): R;
  }


  interface EnumDefinition extends HighLevelDefinition {}
  class EnumDefinition extends HighLevelDefinition {
    asType: TypeID;
    enumConstants: List;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    addEnumConstant(constant: EnumConstantMember): void;
    collectMembers(collector: MemberCollector): void;
    normalize(scope: TypeScope): void;
  }


  interface ExpansionDefinition extends HighLevelDefinition {}
  class ExpansionDefinition extends HighLevelDefinition {
    target: TypeID;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
  }


  interface FunctionDefinition extends HighLevelDefinition {}
  class FunctionDefinition extends HighLevelDefinition {
    readonly callerGroup: TypeMemberGroup;
    header: FunctionHeader;
    caller: CallerMember;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);

    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, header: FunctionHeader, registry: GlobalTypeRegistry);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    setCode(statement: Statement): void;
    setHeader(registry: GlobalTypeRegistry, header: FunctionHeader): void;
  }


  interface InterfaceDefinition extends HighLevelDefinition {}
  class InterfaceDefinition extends HighLevelDefinition {
    readonly baseInterfaces: List;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    addBaseInterface(baseInterface: TypeID): void;
    isStatic(): boolean;
  }


  class MemberCollector {
    enumConstant(var1: EnumConstantMember): void;
    member(var1: IDefinitionMember): void;
    variantOption(var1: Option): void;
  }


  interface StructDefinition extends HighLevelDefinition {}
  class StructDefinition extends HighLevelDefinition {
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
  }


  interface VariantDefinition extends HighLevelDefinition {}
  class VariantDefinition extends HighLevelDefinition {
    readonly options: List;
    constructor(position: CodePosition, module: Module, pkg: ZSPackage, name: string, modifiers: number, outerDefinition: HighLevelDefinition);
    accept<T>(visitor: DefinitionVisitor<T>): T;
    accept<C, R>(context: C, visitor: DefinitionVisitorWithContext<C, R>): R;
    collectMembers(collector: MemberCollector): void;
  }


  class ZSPackage {
    readonly name: string;
    readonly fullName: string;
    readonly parent: ZSPackage;
    constructor(parent: ZSPackage, name: string);
    add(name: string, subPackage: ZSPackage): void;
    contains(name: string): boolean;
    static createRoot(): ZSPackage;
    get root(): ZSPackage;
    getDefinition(name: string): HighLevelDefinition;
    getImport(name: string[], depth: number): HighLevelDefinition;
    getMember(position: CodePosition, registry: GlobalTypeRegistry, name: GenericName): IPartialExpression;
    getOptional(name: string): Optional<ZSPackage>;
    getOptionalRecursive(name: string): Optional<ZSPackage>;
    getOrCreatePackage(name: string): ZSPackage;
    getRecursive(name: string): ZSPackage;
    getType(position: CodePosition, context: TypeResolutionContext, nameParts: GenericName[]): TypeID;
    getType(position: CodePosition, context: TypeResolutionContext, name: GenericName): TypeID;
    register(definition: HighLevelDefinition): void;
  }

}

declare module 'org.openzen.zenscript.codemodel.definition.VariantDefinition' {
  import { Taggable, CodePosition } from 'org.openzen.zencode.shared';
  import { VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { GenericMapper } from 'org.openzen.zenscript.codemodel';

  interface Option extends Taggable {}
  class Option extends Taggable {
    readonly position: CodePosition;
    readonly variant: VariantDefinition;
    readonly name: string;
    readonly ordinal: number;
    readonly types: TypeID[];
    constructor(position: CodePosition, variant: VariantDefinition, name: string, ordinal: number, types: TypeID[]);
    instance(variantType: TypeID, mapper: GenericMapper): VariantOptionRef;
  }

}

declare module 'org.openzen.zenscript.codemodel.expression' {
  import { CodePosition, CompileExceptionCode, CompileException } from 'org.openzen.zencode.shared';
  import { TypeScope, BaseScope } from 'org.openzen.zenscript.codemodel.scope';
  import { StatementTransformer, VarStatement, Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { ArrayTypeID, TypeID, GlobalTypeRegistry, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { FunctionHeader, FunctionParameter, CompareType, GenericName } from 'org.openzen.zenscript.codemodel';
  import { FunctionalMemberRef, CasterMemberRef, ConstMemberRef, FieldMemberRef, GetterMemberRef, ImplementationMemberRef, SetterMemberRef, VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { Call } from 'org.openzen.zenscript.codemodel.expression.CallTranslator';
  import { EnumConstantMember, IDefinitionMember } from 'org.openzen.zenscript.codemodel.member';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { List } from 'java.util';
  import { EnumDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { Consumer, BiFunction } from 'java.util.function';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { VariantOptionSwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { Case, SwitchedMatch } from 'org.openzen.zenscript.codemodel.expression.MatchExpression';

  interface AndAndExpression extends Expression {}
  class AndAndExpression extends Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(position: CodePosition, left: Expression, right: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ArrayExpression extends Expression {}
  class ArrayExpression extends Expression {
    readonly expressions: Expression[];
    readonly arrayType: ArrayTypeID;
    constructor(position: CodePosition, expressions: Expression[], type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  class CallArguments {
    static readonly EMPTY: CallArguments;
    readonly typeArguments: TypeID[];
    readonly arguments: Expression[];
    constructor(...arguments: Expression[]);

    constructor(typeArguments: TypeID[], arguments: Expression[]);

    constructor(...dummy: TypeID[]);
    get numberOfTypeArguments(): number;
    normalize(position: CodePosition, scope: TypeScope, header: FunctionHeader): CallArguments;
    transform(transformer: ExpressionTransformer): CallArguments;
  }


  interface CallExpression extends Expression {}
  class CallExpression extends Expression {
    readonly target: Expression;
    readonly member: FunctionalMemberRef;
    readonly arguments: CallArguments;
    readonly instancedHeader: FunctionHeader;
    constructor(position: CodePosition, target: Expression, member: FunctionalMemberRef, instancedHeader: FunctionHeader, arguments: CallArguments);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    evaluateStringConstant(): string;
    get firstArgument(): Expression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CallStaticExpression extends Expression {}
  class CallStaticExpression extends Expression {
    readonly member: FunctionalMemberRef;
    readonly target: TypeID;
    readonly arguments: CallArguments;
    readonly instancedHeader: FunctionHeader;
    constructor(position: CodePosition, target: TypeID, member: FunctionalMemberRef, instancedHeader: FunctionHeader, arguments: CallArguments);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  class CallTranslator {
    translate(var1: Call): Expression;
  }


  interface CapturedClosureExpression extends CapturedExpression {}
  class CapturedClosureExpression extends CapturedExpression {
    readonly value: CapturedExpression;
    constructor(position: CodePosition, value: CapturedExpression, closure: LambdaClosure);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<T>(visitor: CapturedExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): CapturedExpression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CapturedDirectExpression extends CapturedExpression {}
  class CapturedDirectExpression extends CapturedExpression {
    readonly value: Expression;
    constructor(position: CodePosition, closure: LambdaClosure, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<T>(visitor: CapturedExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): CapturedExpression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CapturedExpression extends Expression {}
  class CapturedExpression extends Expression {
    readonly closure: LambdaClosure;
    constructor(position: CodePosition, type: TypeID, closure: LambdaClosure);
    accept<T>(var1: CapturedExpressionVisitor<T>): T;
    accept<T>(var1: ExpressionVisitor<T>): T;
    accept<C, R>(var1: C, var2: ExpressionVisitorWithContext<C, R>): R;
    capture(position: CodePosition, closure: LambdaClosure): CapturedExpression;
    normalize(var1: TypeScope): CapturedExpression;
  }


  class CapturedExpressionVisitor<T = any> {
    visitCapturedDirect(var1: CapturedDirectExpression): T;
    visitCapturedLocal(var1: CapturedLocalVariableExpression): T;
    visitCapturedParameter(var1: CapturedParameterExpression): T;
    visitCapturedThis(var1: CapturedThisExpression): T;
    visitRecaptured(var1: CapturedClosureExpression): T;
  }


  interface CapturedLocalVariableExpression extends CapturedExpression {}
  class CapturedLocalVariableExpression extends CapturedExpression {
    readonly variable: VarStatement;
    constructor(position: CodePosition, variable: VarStatement, closure: LambdaClosure);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<T>(visitor: CapturedExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): CapturedExpression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CapturedParameterExpression extends CapturedExpression {}
  class CapturedParameterExpression extends CapturedExpression {
    readonly parameter: FunctionParameter;
    constructor(position: CodePosition, parameter: FunctionParameter, closure: LambdaClosure);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<T>(visitor: CapturedExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): CapturedExpression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CapturedThisExpression extends CapturedExpression {}
  class CapturedThisExpression extends CapturedExpression {
    constructor(position: CodePosition, type: TypeID, closure: LambdaClosure);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<T>(visitor: CapturedExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): CapturedExpression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CastExpression extends Expression {}
  class CastExpression extends Expression {
    readonly target: Expression;
    readonly member: CasterMemberRef;
    readonly isImplicit: boolean;
    constructor(position: CodePosition, target: Expression, member: CasterMemberRef, isImplicit: boolean);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CheckNullExpression extends Expression {}
  class CheckNullExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CoalesceExpression extends Expression {}
  class CoalesceExpression extends Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(position: CodePosition, left: Expression, right: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface CompareExpression extends Expression {}
  class CompareExpression extends Expression {
    readonly left: Expression;
    readonly right: Expression;
    readonly operator: FunctionalMemberRef;
    readonly comparison: CompareType;
    constructor(position: CodePosition, left: Expression, right: Expression, operator: FunctionalMemberRef, comparison: CompareType);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConditionalExpression extends Expression {}
  class ConditionalExpression extends Expression {
    readonly condition: Expression;
    readonly ifThen: Expression;
    readonly ifElse: Expression;
    constructor(position: CodePosition, condition: Expression, ifThen: Expression, ifElse: Expression, type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantBoolExpression extends Expression {}
  class ConstantBoolExpression extends Expression {
    readonly value: boolean;
    constructor(position: CodePosition, value: boolean);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantByteExpression extends Expression {}
  class ConstantByteExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantCharExpression extends Expression {}
  class ConstantCharExpression extends Expression {
    readonly value: string;
    constructor(position: CodePosition, value: string);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantDoubleExpression extends Expression {}
  class ConstantDoubleExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantFloatExpression extends Expression {}
  class ConstantFloatExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantIntExpression extends Expression {}
  class ConstantIntExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantLongExpression extends Expression {}
  class ConstantLongExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantSByteExpression extends Expression {}
  class ConstantSByteExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantShortExpression extends Expression {}
  class ConstantShortExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantStringExpression extends Expression {}
  class ConstantStringExpression extends Expression {
    readonly value: string;
    constructor(position: CodePosition, value: string);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    evaluateStringConstant(): string;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantUIntExpression extends Expression {}
  class ConstantUIntExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantULongExpression extends Expression {}
  class ConstantULongExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantUShortExpression extends Expression {}
  class ConstantUShortExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstantUSizeExpression extends Expression {}
  class ConstantUSizeExpression extends Expression {
    readonly value: number;
    constructor(position: CodePosition, value: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstExpression extends Expression {}
  class ConstExpression extends Expression {
    readonly constant: ConstMemberRef;
    constructor(position: CodePosition, constant: ConstMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    evaluateEnumConstant(): EnumConstantMember;
    evaluateStringConstant(): string;
    get member(): IDefinitionMember;
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstructorSuperCallExpression extends Expression {}
  class ConstructorSuperCallExpression extends Expression {
    readonly objectType: TypeID;
    readonly constructor: FunctionalMemberRef;
    readonly arguments: CallArguments;
    constructor(position: CodePosition, type: TypeID, constructor: FunctionalMemberRef, arguments: CallArguments);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ConstructorThisCallExpression extends Expression {}
  class ConstructorThisCallExpression extends Expression {
    readonly objectType: TypeID;
    readonly constructor: FunctionalMemberRef;
    readonly arguments: CallArguments;
    constructor(position: CodePosition, type: TypeID, constructor: FunctionalMemberRef, arguments: CallArguments);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface DummyExpression extends Expression {}
  class DummyExpression extends Expression {
    constructor(type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface EnumConstantExpression extends Expression {}
  class EnumConstantExpression extends Expression {
    readonly value: EnumConstantMember;
    constructor(position: CodePosition, type: TypeID, value: EnumConstantMember);

    constructor(position: CodePosition, registry: GlobalTypeRegistry, type: EnumDefinition, value: EnumConstantMember);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    evaluateEnumConstant(): EnumConstantMember;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface Expression extends IPartialExpression {}
  class Expression extends IPartialExpression {
    static readonly NONE: Expression[];
    readonly position: CodePosition;
    readonly type: TypeID;
    readonly thrownType: TypeID;
    constructor(position: CodePosition, type: TypeID, thrownType: TypeID);
    aborts(): boolean;
    accept<T>(var1: ExpressionVisitor<T>): T;
    accept<C, R>(var1: C, var2: ExpressionVisitorWithContext<C, R>): R;
    static binaryThrow(position: CodePosition, left: TypeID, right: TypeID): TypeID;
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    castExplicit(position: CodePosition, scope: TypeScope, asType: TypeID, optional: boolean): Expression;
    castImplicit(position: CodePosition, scope: TypeScope, asType: TypeID): Expression;
    eval(): Expression;
    evaluateEnumConstant(): EnumConstantMember;
    evaluateStringConstant(): string;
    forEachStatement(consumer: Consumer<Statement>): void;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    static multiThrow(position: CodePosition, expressions: Expression[]): TypeID;
    normalize(var1: TypeScope): Expression;
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(var1: ExpressionTransformer): Expression;
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ExpressionSymbol extends ISymbol {}
  class ExpressionSymbol extends ISymbol {
    constructor(functionParameter: BiFunction<CodePosition, BaseScope, IPartialExpression>);
    getExpression(position: CodePosition, scope: BaseScope, typeArguments: TypeID[]): IPartialExpression;
    getType(position: CodePosition, context: TypeResolutionContext, typeArguments: TypeID[]): TypeID;
  }


  class ExpressionTransformer {
    transform(var1: Expression): Expression;
  }


  class ExpressionVisitor<T = any> {
    visitAndAnd(var1: AndAndExpression): T;
    visitArray(var1: ArrayExpression): T;
    visitCall(var1: CallExpression): T;
    visitCallStatic(var1: CallStaticExpression): T;
    visitCapturedClosure(var1: CapturedClosureExpression): T;
    visitCapturedDirect(var1: CapturedDirectExpression): T;
    visitCapturedLocalVariable(var1: CapturedLocalVariableExpression): T;
    visitCapturedParameter(var1: CapturedParameterExpression): T;
    visitCapturedThis(var1: CapturedThisExpression): T;
    visitCast(var1: CastExpression): T;
    visitCheckNull(var1: CheckNullExpression): T;
    visitCoalesce(var1: CoalesceExpression): T;
    visitCompare(var1: CompareExpression): T;
    visitConditional(var1: ConditionalExpression): T;
    visitConst(var1: ConstExpression): T;
    visitConstantBool(var1: ConstantBoolExpression): T;
    visitConstantByte(var1: ConstantByteExpression): T;
    visitConstantChar(var1: ConstantCharExpression): T;
    visitConstantDouble(var1: ConstantDoubleExpression): T;
    visitConstantFloat(var1: ConstantFloatExpression): T;
    visitConstantInt(var1: ConstantIntExpression): T;
    visitConstantLong(var1: ConstantLongExpression): T;
    visitConstantSByte(var1: ConstantSByteExpression): T;
    visitConstantShort(var1: ConstantShortExpression): T;
    visitConstantString(var1: ConstantStringExpression): T;
    visitConstantUInt(var1: ConstantUIntExpression): T;
    visitConstantULong(var1: ConstantULongExpression): T;
    visitConstantUShort(var1: ConstantUShortExpression): T;
    visitConstantUSize(var1: ConstantUSizeExpression): T;
    visitConstructorSuperCall(var1: ConstructorSuperCallExpression): T;
    visitConstructorThisCall(var1: ConstructorThisCallExpression): T;
    visitEnumConstant(var1: EnumConstantExpression): T;
    visitFunction(var1: FunctionExpression): T;
    visitGetField(var1: GetFieldExpression): T;
    visitGetFunctionParameter(var1: GetFunctionParameterExpression): T;
    visitGetLocalVariable(var1: GetLocalVariableExpression): T;
    visitGetMatchingVariantField(var1: GetMatchingVariantField): T;
    visitGetStaticField(var1: GetStaticFieldExpression): T;
    visitGetter(var1: GetterExpression): T;
    visitGlobal(var1: GlobalExpression): T;
    visitGlobalCall(var1: GlobalCallExpression): T;
    visitInterfaceCast(var1: InterfaceCastExpression): T;
    visitInvalid(expression: InvalidExpression): T;
    visitInvalidAssign(expression: InvalidAssignExpression): T;
    visitIs(var1: IsExpression): T;
    visitMakeConst(var1: MakeConstExpression): T;
    visitMap(var1: MapExpression): T;
    visitMatch(var1: MatchExpression): T;
    visitNew(var1: NewExpression): T;
    visitNull(var1: NullExpression): T;
    visitOrOr(var1: OrOrExpression): T;
    visitPanic(var1: PanicExpression): T;
    visitPlatformSpecific(var1: Expression): T;
    visitPostCall(var1: PostCallExpression): T;
    visitRange(var1: RangeExpression): T;
    visitSameObject(var1: SameObjectExpression): T;
    visitSetField(var1: SetFieldExpression): T;
    visitSetFunctionParameter(var1: SetFunctionParameterExpression): T;
    visitSetLocalVariable(var1: SetLocalVariableExpression): T;
    visitSetStaticField(var1: SetStaticFieldExpression): T;
    visitSetter(var1: SetterExpression): T;
    visitStaticGetter(var1: StaticGetterExpression): T;
    visitStaticSetter(var1: StaticSetterExpression): T;
    visitSubtypeCast(var1: SubtypeCastExpression): T;
    visitSupertypeCast(var1: SupertypeCastExpression): T;
    visitThis(var1: ThisExpression): T;
    visitThrow(var1: ThrowExpression): T;
    visitTryConvert(var1: TryConvertExpression): T;
    visitTryRethrowAsException(var1: TryRethrowAsExceptionExpression): T;
    visitTryRethrowAsResult(var1: TryRethrowAsResultExpression): T;
    visitVariantValue(var1: VariantValueExpression): T;
    visitWrapOptional(var1: WrapOptionalExpression): T;
  }


  class ExpressionVisitorWithContext<C = any, R = any> {
    visitAndAnd(var1: C, var2: AndAndExpression): R;
    visitArray(var1: C, var2: ArrayExpression): R;
    visitCall(var1: C, var2: CallExpression): R;
    visitCallStatic(var1: C, var2: CallStaticExpression): R;
    visitCapturedClosure(var1: C, var2: CapturedClosureExpression): R;
    visitCapturedDirect(var1: C, var2: CapturedDirectExpression): R;
    visitCapturedLocalVariable(var1: C, var2: CapturedLocalVariableExpression): R;
    visitCapturedParameter(var1: C, var2: CapturedParameterExpression): R;
    visitCapturedThis(var1: C, var2: CapturedThisExpression): R;
    visitCast(var1: C, var2: CastExpression): R;
    visitCheckNull(var1: C, var2: CheckNullExpression): R;
    visitCoalesce(var1: C, var2: CoalesceExpression): R;
    visitCompare(var1: C, var2: CompareExpression): R;
    visitConditional(var1: C, var2: ConditionalExpression): R;
    visitConst(var1: C, var2: ConstExpression): R;
    visitConstantBool(var1: C, var2: ConstantBoolExpression): R;
    visitConstantByte(var1: C, var2: ConstantByteExpression): R;
    visitConstantChar(var1: C, var2: ConstantCharExpression): R;
    visitConstantDouble(var1: C, var2: ConstantDoubleExpression): R;
    visitConstantFloat(var1: C, var2: ConstantFloatExpression): R;
    visitConstantInt(var1: C, var2: ConstantIntExpression): R;
    visitConstantLong(var1: C, var2: ConstantLongExpression): R;
    visitConstantSByte(var1: C, var2: ConstantSByteExpression): R;
    visitConstantShort(var1: C, var2: ConstantShortExpression): R;
    visitConstantString(var1: C, var2: ConstantStringExpression): R;
    visitConstantUInt(var1: C, var2: ConstantUIntExpression): R;
    visitConstantULong(var1: C, var2: ConstantULongExpression): R;
    visitConstantUShort(var1: C, var2: ConstantUShortExpression): R;
    visitConstantUSize(var1: C, var2: ConstantUSizeExpression): R;
    visitConstructorSuperCall(var1: C, var2: ConstructorSuperCallExpression): R;
    visitConstructorThisCall(var1: C, var2: ConstructorThisCallExpression): R;
    visitEnumConstant(var1: C, var2: EnumConstantExpression): R;
    visitFunction(var1: C, var2: FunctionExpression): R;
    visitGetField(var1: C, var2: GetFieldExpression): R;
    visitGetFunctionParameter(var1: C, var2: GetFunctionParameterExpression): R;
    visitGetLocalVariable(var1: C, var2: GetLocalVariableExpression): R;
    visitGetMatchingVariantField(var1: C, var2: GetMatchingVariantField): R;
    visitGetStaticField(var1: C, var2: GetStaticFieldExpression): R;
    visitGetter(var1: C, var2: GetterExpression): R;
    visitGlobal(var1: C, var2: GlobalExpression): R;
    visitGlobalCall(var1: C, var2: GlobalCallExpression): R;
    visitInterfaceCast(var1: C, var2: InterfaceCastExpression): R;
    visitInvalid(var1: C, var2: InvalidExpression): R;
    visitInvalidAssign(var1: C, var2: InvalidAssignExpression): R;
    visitIs(var1: C, var2: IsExpression): R;
    visitMakeConst(var1: C, var2: MakeConstExpression): R;
    visitMap(var1: C, var2: MapExpression): R;
    visitMatch(var1: C, var2: MatchExpression): R;
    visitNew(var1: C, var2: NewExpression): R;
    visitNull(var1: C, var2: NullExpression): R;
    visitOrOr(var1: C, var2: OrOrExpression): R;
    visitPanic(var1: C, var2: PanicExpression): R;
    visitPlatformSpecific(var1: C, var2: Expression): R;
    visitPostCall(var1: C, var2: PostCallExpression): R;
    visitRange(var1: C, var2: RangeExpression): R;
    visitSameObject(var1: C, var2: SameObjectExpression): R;
    visitSetField(var1: C, var2: SetFieldExpression): R;
    visitSetFunctionParameter(var1: C, var2: SetFunctionParameterExpression): R;
    visitSetLocalVariable(var1: C, var2: SetLocalVariableExpression): R;
    visitSetStaticField(var1: C, var2: SetStaticFieldExpression): R;
    visitSetter(var1: C, var2: SetterExpression): R;
    visitStaticGetter(var1: C, var2: StaticGetterExpression): R;
    visitStaticSetter(var1: C, var2: StaticSetterExpression): R;
    visitSubtypeCast(var1: C, var2: SubtypeCastExpression): R;
    visitSupertypeCast(var1: C, var2: SupertypeCastExpression): R;
    visitThis(var1: C, var2: ThisExpression): R;
    visitThrow(var1: C, var2: ThrowExpression): R;
    visitTryConvert(var1: C, var2: TryConvertExpression): R;
    visitTryRethrowAsException(var1: C, var2: TryRethrowAsExceptionExpression): R;
    visitTryRethrowAsResult(var1: C, var2: TryRethrowAsResultExpression): R;
    visitVariantValue(var1: C, var2: VariantValueExpression): R;
    visitWrapOptional(var1: C, var2: WrapOptionalExpression): R;
  }


  interface FunctionExpression extends Expression {}
  class FunctionExpression extends Expression {
    readonly header: FunctionHeader;
    readonly closure: LambdaClosure;
    readonly body: Statement;
    constructor(position: CodePosition, type: TypeID, closure: LambdaClosure, header: FunctionHeader, body: Statement);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    asReturnExpression(...arguments: Expression[]): Expression;
    forEachStatement(consumer: Consumer<Statement>): void;
    isSimple(): boolean;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): FunctionExpression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetFieldExpression extends Expression {}
  class GetFieldExpression extends Expression {
    readonly target: Expression;
    readonly field: FieldMemberRef;
    constructor(position: CodePosition, target: Expression, field: FieldMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    capture(position: CodePosition, closure: LambdaClosure): CapturedExpression;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetFunctionParameterExpression extends Expression {}
  class GetFunctionParameterExpression extends Expression {
    readonly parameter: FunctionParameter;
    constructor(position: CodePosition, parameter: FunctionParameter);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    capture(position: CodePosition, closure: LambdaClosure): CapturedExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetLocalVariableExpression extends Expression {}
  class GetLocalVariableExpression extends Expression {
    readonly variable: VarStatement;
    constructor(position: CodePosition, variable: VarStatement);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    capture(position: CodePosition, closure: LambdaClosure): CapturedExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetMatchingVariantField extends Expression {}
  class GetMatchingVariantField extends Expression {
    readonly value: VariantOptionSwitchValue;
    readonly index: number;
    constructor(position: CodePosition, value: VariantOptionSwitchValue, index: number);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetStaticFieldExpression extends Expression {}
  class GetStaticFieldExpression extends Expression {
    readonly field: FieldMemberRef;
    constructor(position: CodePosition, field: FieldMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    capture(position: CodePosition, closure: LambdaClosure): CapturedExpression;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GetterExpression extends Expression {}
  class GetterExpression extends Expression {
    readonly target: Expression;
    readonly getter: GetterMemberRef;
    constructor(position: CodePosition, target: Expression, getter: GetterMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GlobalCallExpression extends Expression {}
  class GlobalCallExpression extends Expression {
    readonly name: string;
    readonly arguments: CallArguments;
    readonly resolution: Expression;
    constructor(position: CodePosition, name: string, arguments: CallArguments, resolution: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface GlobalExpression extends Expression {}
  class GlobalExpression extends Expression {
    readonly name: string;
    readonly resolution: Expression;
    constructor(position: CodePosition, name: string, resolution: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface InterfaceCastExpression extends Expression {}
  class InterfaceCastExpression extends Expression {
    readonly value: Expression;
    readonly implementation: ImplementationMemberRef;
    constructor(position: CodePosition, value: Expression, implementation: ImplementationMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface InvalidAssignExpression extends Expression {}
  class InvalidAssignExpression extends Expression {
    readonly target: InvalidExpression;
    readonly source: Expression;
    constructor(position: CodePosition, target: InvalidExpression, source: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface InvalidExpression extends Expression {}
  class InvalidExpression extends Expression {
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, type: TypeID, code: CompileExceptionCode, message: string);

    constructor(type: TypeID, cause: CompileException);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface IsExpression extends Expression {}
  class IsExpression extends Expression {
    readonly value: Expression;
    readonly isType: TypeID;
    constructor(position: CodePosition, value: Expression, type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  class LambdaClosure {
    readonly captures: List;
    add(capture: CapturedExpression): void;
  }


  interface MakeConstExpression extends Expression {}
  class MakeConstExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression, constType: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface MapExpression extends Expression {}
  class MapExpression extends Expression {
    readonly keys: Expression[];
    readonly values: Expression[];
    constructor(position: CodePosition, keys: Expression[], values: Expression[], type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface MatchExpression extends Expression {}
  class MatchExpression extends Expression {
    readonly value: Expression;
    readonly cases: Case[];
    constructor(position: CodePosition, value: Expression, type: TypeID, cases: Case[]);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    convertToSwitch(tempVariable: string): SwitchedMatch;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface NewExpression extends Expression {}
  class NewExpression extends Expression {
    readonly constructor: FunctionalMemberRef;
    readonly arguments: CallArguments;
    readonly instancedHeader: FunctionHeader;
    constructor(position: CodePosition, type: TypeID, constructor: FunctionalMemberRef, arguments: CallArguments);

    constructor(position: CodePosition, type: TypeID, constructor: FunctionalMemberRef, arguments: CallArguments, instancedHeader: FunctionHeader);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface NullExpression extends Expression {}
  class NullExpression extends Expression {
    constructor(position: CodePosition);

    constructor(position: CodePosition, optionalType: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface OrOrExpression extends Expression {}
  class OrOrExpression extends Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(position: CodePosition, left: Expression, right: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface PanicExpression extends Expression {}
  class PanicExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, type: TypeID, value: Expression);
    aborts(): boolean;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface PostCallExpression extends Expression {}
  class PostCallExpression extends Expression {
    readonly target: Expression;
    readonly member: FunctionalMemberRef;
    readonly instancedHeader: FunctionHeader;
    constructor(position: CodePosition, target: Expression, member: FunctionalMemberRef, instancedHeader: FunctionHeader);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface RangeExpression extends Expression {}
  class RangeExpression extends Expression {
    readonly from: Expression;
    readonly to: Expression;
    constructor(position: CodePosition, type: TypeID, from: Expression, to: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SameObjectExpression extends Expression {}
  class SameObjectExpression extends Expression {
    readonly left: Expression;
    readonly right: Expression;
    readonly inverted: boolean;
    constructor(position: CodePosition, left: Expression, right: Expression, inverted: boolean);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SetFieldExpression extends Expression {}
  class SetFieldExpression extends Expression {
    readonly target: Expression;
    readonly field: FieldMemberRef;
    readonly value: Expression;
    readonly parameter: FunctionParameter;
    constructor(position: CodePosition, target: Expression, field: FieldMemberRef, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SetFunctionParameterExpression extends Expression {}
  class SetFunctionParameterExpression extends Expression {
    readonly parameter: FunctionParameter;
    readonly value: Expression;
    constructor(position: CodePosition, parameter: FunctionParameter, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SetLocalVariableExpression extends Expression {}
  class SetLocalVariableExpression extends Expression {
    readonly variable: VarStatement;
    readonly value: Expression;
    constructor(position: CodePosition, variable: VarStatement, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SetStaticFieldExpression extends Expression {}
  class SetStaticFieldExpression extends Expression {
    readonly field: FieldMemberRef;
    readonly value: Expression;
    constructor(position: CodePosition, field: FieldMemberRef, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SetterExpression extends Expression {}
  class SetterExpression extends Expression {
    readonly target: Expression;
    readonly setter: SetterMemberRef;
    readonly value: Expression;
    constructor(position: CodePosition, target: Expression, setter: SetterMemberRef, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface StaticGetterExpression extends Expression {}
  class StaticGetterExpression extends Expression {
    readonly getter: GetterMemberRef;
    constructor(position: CodePosition, getter: GetterMemberRef);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface StaticSetterExpression extends Expression {}
  class StaticSetterExpression extends Expression {
    readonly setter: SetterMemberRef;
    readonly value: Expression;
    constructor(position: CodePosition, setter: SetterMemberRef, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SubtypeCastExpression extends Expression {}
  class SubtypeCastExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression, type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface SupertypeCastExpression extends Expression {}
  class SupertypeCastExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression, type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ThisExpression extends Expression {}
  class ThisExpression extends Expression {
    constructor(position: CodePosition, type: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface ThrowExpression extends Expression {}
  class ThrowExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, type: TypeID, value: Expression);
    aborts(): boolean;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface TryConvertExpression extends Expression {}
  class TryConvertExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, type: TypeID, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface TryRethrowAsExceptionExpression extends Expression {}
  class TryRethrowAsExceptionExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, type: TypeID, value: Expression, thrownType: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface TryRethrowAsResultExpression extends Expression {}
  class TryRethrowAsResultExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, type: TypeID, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface VariantValueExpression extends Expression {}
  class VariantValueExpression extends Expression {
    readonly option: VariantOptionRef;
    readonly arguments: Expression[];
    constructor(position: CodePosition, variantType: TypeID, option: VariantOptionRef);

    constructor(position: CodePosition, variantType: TypeID, option: VariantOptionRef, arguments: Expression[]);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    get numberOfArguments(): number;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }


  interface WrapOptionalExpression extends Expression {}
  class WrapOptionalExpression extends Expression {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression, optionalType: TypeID);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }

}

declare module 'org.openzen.zenscript.codemodel.expression.CallTranslator' {
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { Expression, CallArguments } from 'org.openzen.zenscript.codemodel.expression';
  import { FunctionHeader } from 'org.openzen.zenscript.codemodel';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';

  class Call {
    readonly position: CodePosition;
    readonly target: Expression;
    readonly instancedHeader: FunctionHeader;
    readonly arguments: CallArguments;
    readonly scope: TypeScope;
    constructor(position: CodePosition, target: Expression, instancedHeader: FunctionHeader, arguments: CallArguments, scope: TypeScope);
  }

}

declare module 'org.openzen.zenscript.codemodel.expression.MatchExpression' {
  import { SwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { Expression, ExpressionTransformer } from 'org.openzen.zenscript.codemodel.expression';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { VarStatement, SwitchStatement } from 'org.openzen.zenscript.codemodel.statement';

  class Case {
    readonly key: SwitchValue;
    readonly value: Expression;
    constructor(key: SwitchValue, value: Expression);
    normalize(scope: TypeScope): Case;
    transform(transformer: ExpressionTransformer): Case;
  }


  class SwitchedMatch {
    readonly result: VarStatement;
    readonly switchStatement: SwitchStatement;
    constructor(temp: VarStatement, switchStatement: SwitchStatement);
  }

}

declare module 'org.openzen.zenscript.codemodel.expression.switchvalue' {
  import { EnumConstantMember } from 'org.openzen.zenscript.codemodel.member';
  import { VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';

  interface CharSwitchValue extends SwitchValue {}
  class CharSwitchValue extends SwitchValue {
    readonly value: string;
    constructor(value: string);
    accept<T>(visitor: SwitchValueVisitor<T>): T;
    accept<C, R>(context: C, visitor: SwitchValueVisitorWithContext<C, R>): R;
  }


  interface EnumConstantSwitchValue extends SwitchValue {}
  class EnumConstantSwitchValue extends SwitchValue {
    readonly constant: EnumConstantMember;
    constructor(constant: EnumConstantMember);
    accept<T>(visitor: SwitchValueVisitor<T>): T;
    accept<C, R>(context: C, visitor: SwitchValueVisitorWithContext<C, R>): R;
  }


  interface IntSwitchValue extends SwitchValue {}
  class IntSwitchValue extends SwitchValue {
    readonly value: number;
    constructor(value: number);
    accept<T>(visitor: SwitchValueVisitor<T>): T;
    accept<C, R>(context: C, visitor: SwitchValueVisitorWithContext<C, R>): R;
  }


  interface StringSwitchValue extends SwitchValue {}
  class StringSwitchValue extends SwitchValue {
    readonly value: string;
    constructor(value: string);
    accept<T>(visitor: SwitchValueVisitor<T>): T;
    accept<C, R>(context: C, visitor: SwitchValueVisitorWithContext<C, R>): R;
  }


  class SwitchValue {
    accept<T>(var1: SwitchValueVisitor<T>): T;
    accept<C, R>(var1: C, var2: SwitchValueVisitorWithContext<C, R>): R;
  }


  class SwitchValueVisitor<T = any> {
    acceptChar(var1: CharSwitchValue): T;
    acceptEnumConstant(var1: EnumConstantSwitchValue): T;
    acceptInt(var1: IntSwitchValue): T;
    acceptString(var1: StringSwitchValue): T;
    acceptVariantOption(var1: VariantOptionSwitchValue): T;
  }


  class SwitchValueVisitorWithContext<C = any, R = any> {
    acceptChar(var1: C, var2: CharSwitchValue): R;
    acceptEnumConstant(var1: C, var2: EnumConstantSwitchValue): R;
    acceptInt(var1: C, var2: IntSwitchValue): R;
    acceptString(var1: C, var2: StringSwitchValue): R;
    acceptVariantOption(var1: C, var2: VariantOptionSwitchValue): R;
  }


  interface VariantOptionSwitchValue extends SwitchValue {}
  class VariantOptionSwitchValue extends SwitchValue {
    readonly option: VariantOptionRef;
    readonly parameters: string[];
    constructor(option: VariantOptionRef, parameters: string[]);
    accept<T>(visitor: SwitchValueVisitor<T>): T;
    accept<C, R>(context: C, visitor: SwitchValueVisitorWithContext<C, R>): R;
  }

}

declare module 'org.openzen.zenscript.codemodel.generic' {
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { LocalMemberCache, TypeMembers } from 'org.openzen.zenscript.codemodel.type.member';
  import { GenericMapper } from 'org.openzen.zenscript.codemodel';
  import { CodePosition, Taggable } from 'org.openzen.zencode.shared';
  import { List } from 'java.util';

  class GenericParameterBoundVisitor<T = any> {
    visitSuper(var1: ParameterSuperBound): T;
    visitType(var1: ParameterTypeBound): T;
  }


  class GenericParameterBoundVisitorWithContext<C = any, R = any> {
    visitSuper(var1: C, var2: ParameterSuperBound): R;
    visitType(var1: C, var2: ParameterTypeBound): R;
  }


  interface ParameterSuperBound extends TypeParameterBound {}
  class ParameterSuperBound extends TypeParameterBound {
    readonly type: TypeID;
    constructor(type: TypeID);
    accept<T>(visitor: GenericParameterBoundVisitor<T>): T;
    accept<C, R>(context: C, visitor: GenericParameterBoundVisitorWithContext<C, R>): R;
    get canonical(): string;
    instance(mapper: GenericMapper): TypeParameterBound;
    isObjectType(): boolean;
    matches(cache: LocalMemberCache, type: TypeID): boolean;
    registerMembers(cache: LocalMemberCache, type: TypeMembers): void;
  }


  interface ParameterTypeBound extends TypeParameterBound {}
  class ParameterTypeBound extends TypeParameterBound {
    readonly position: CodePosition;
    readonly type: TypeID;
    constructor(position: CodePosition, type: TypeID);
    accept<T>(visitor: GenericParameterBoundVisitor<T>): T;
    accept<C, R>(context: C, visitor: GenericParameterBoundVisitorWithContext<C, R>): R;
    get canonical(): string;
    instance(mapper: GenericMapper): TypeParameterBound;
    isObjectType(): boolean;
    matches(cache: LocalMemberCache, type: TypeID): boolean;
    registerMembers(cache: LocalMemberCache, members: TypeMembers): void;
  }


  interface TypeParameter extends Taggable {}
  class TypeParameter extends Taggable {
    static readonly NONE: TypeParameter[];
    readonly position: CodePosition;
    readonly name: string;
    readonly bounds: List;
    constructor(position: CodePosition, name: string);
    addBound(bound: TypeParameterBound): void;
    equals(o: any): boolean;
    get canonical(): string;
    hashCode(): number;
    isObjectType(): boolean;
    matches(cache: LocalMemberCache, type: TypeID): boolean;
    toString(): string;
  }


  class TypeParameterBound {
    accept<T>(var1: GenericParameterBoundVisitor<T>): T;
    accept<C, R>(var1: C, var2: GenericParameterBoundVisitorWithContext<C, R>): R;
    get canonical(): string;
    instance(var1: GenericMapper): TypeParameterBound;
    isObjectType(): boolean;
    matches(var1: LocalMemberCache, var2: TypeID): boolean;
    registerMembers(var1: LocalMemberCache, var2: TypeMembers): void;
  }

}

declare module 'org.openzen.zenscript.codemodel.member' {
  import { FunctionalMemberRef, DefinitionMemberRef, CasterMemberRef, GetterMemberRef, IteratorMemberRef, SetterMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { CodePosition, Taggable, Tag } from 'org.openzen.zencode.shared';
  import { HighLevelDefinition, FunctionHeader, GenericMapper, AccessScope, OperatorType, FunctionParameter } from 'org.openzen.zenscript.codemodel';
  import { BuiltinID, TypeMembers, TypeMemberPriority } from 'org.openzen.zenscript.codemodel.type.member';
  import { GlobalTypeRegistry, TypeID, DefinitionTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { Expression, NewExpression } from 'org.openzen.zenscript.codemodel.expression';
  import { MemberAnnotation } from 'org.openzen.zenscript.codemodel.annotations';
  import { Enum, Class } from 'java.lang';
  import { List, Map } from 'java.util';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';

  interface CallerMember extends FunctionalMember {}
  class CallerMember extends FunctionalMember {
    overrides: FunctionalMemberRef;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, header: FunctionHeader, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get kind(): FunctionalKind;
    get overrides(): DefinitionMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    setOverrides(registry: GlobalTypeRegistry, overrides: FunctionalMemberRef): void;
  }


  interface CasterMember extends FunctionalMember {}
  class CasterMember extends FunctionalMember {
    toType: TypeID;
    overrides: CasterMemberRef;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, toType: TypeID, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get kind(): FunctionalKind;
    get overrides(): CasterMemberRef;
    get targetType(): TypeID;
    isImplicit(): boolean;
    normalize(scope: TypeScope): void;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    setOverrides(registry: GlobalTypeRegistry, overrides: CasterMemberRef): void;
  }


  interface ConstMember extends PropertyMember {}
  class ConstMember extends PropertyMember {
    readonly name: string;
    value: Expression;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, name: string, type: TypeID, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(members: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }


  interface ConstructorMember extends FunctionalMember {}
  class ConstructorMember extends FunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, header: FunctionHeader, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get kind(): FunctionalKind;
    get overrides(): DefinitionMemberRef;
    isConstructorForwarded(): boolean;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }


  interface DefinitionMember extends IDefinitionMember, Taggable {}
  class DefinitionMember extends IDefinitionMember {
    readonly position: CodePosition;
    readonly definition: HighLevelDefinition;
    annotations: MemberAnnotation[];
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number);
    get annotations(): MemberAnnotation[];
    get definition(): HighLevelDefinition;
    get position(): CodePosition;
    get specifiedModifiers(): number;
    isExtern(): boolean;
    isFinal(): boolean;
    isPrivate(): boolean;
    isProtected(): boolean;
    isPublic(): boolean;
    isStatic(): boolean;
    toString(): string;
  }


  interface DestructorMember extends FunctionalMember {}
  class DestructorMember extends FunctionalMember {
    overrides: FunctionalMemberRef;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get kind(): FunctionalKind;
    get overrides(): DefinitionMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }


  class EnumConstantMember {
    readonly position: CodePosition;
    readonly definition: HighLevelDefinition;
    readonly name: string;
    readonly ordinal: number;
    value: Expression;
    constructor: NewExpression;
    constructor(position: CodePosition, definition: HighLevelDefinition, name: string, ordinal: number);
  }


  interface FieldMember extends PropertyMember {}
  class FieldMember extends PropertyMember {
    readonly name: string;
    readonly autoGetterAccess: number;
    readonly autoSetterAccess: number;
    readonly autoGetter: GetterMember;
    readonly autoSetter: SetterMember;
    initializer: Expression;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, name: string, thisType: TypeID, type: TypeID, registry: GlobalTypeRegistry, autoGetterAccess: number, autoSetterAccess: number, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get builtin(): BuiltinID;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    hasAutoGetter(): boolean;
    hasAutoSetter(): boolean;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(members: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    setInitializer(initializer: Expression): void;
  }


  interface FunctionalKind extends Enum<FunctionalKind> {}
  class FunctionalKind extends Enum<FunctionalKind> {
    static readonly CONSTRUCTOR: FunctionalKind;
    static readonly DESTRUCTOR: FunctionalKind;
    static readonly METHOD: FunctionalKind;
    static readonly OPERATOR: FunctionalKind;
    static readonly GETTER: FunctionalKind;
    static readonly SETTER: FunctionalKind;
    static readonly CALLER: FunctionalKind;
    static readonly CASTER: FunctionalKind;
    static readonly ITERATOR: FunctionalKind;
    static valueOf(name: string): FunctionalKind;
    static values(): FunctionalKind[];
  }


  interface FunctionalMember extends DefinitionMember {}
  class FunctionalMember extends DefinitionMember {
    readonly builtin: BuiltinID;
    header: FunctionHeader;
    body: Statement;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, header: FunctionHeader, builtin: BuiltinID);
    get builtin(): BuiltinID;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get kind(): FunctionalKind;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID): FunctionalMemberRef;
    ref(type: TypeID, mapper: GenericMapper): FunctionalMemberRef;
    setBody(body: Statement): void;
  }


  interface GetterMember extends PropertyMember {}
  class GetterMember extends PropertyMember {
    readonly name: string;
    body: Statement;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, name: string, type: TypeID, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): GetterMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): GetterMemberRef;
    registerTo(members: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    set overrides(override: GetterMemberRef);
    setBody(body: Statement): void;
  }


  class IDefinitionMember {
    accept<T>(var1: MemberVisitor<T>): T;
    accept<C, R>(var1: C, var2: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get accessScope(): AccessScope;
    get annotations(): MemberAnnotation[];
    get builtin(): BuiltinID;
    get definition(): HighLevelDefinition;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    get position(): CodePosition;
    get specifiedModifiers(): number;
    getTag<T extends Tag>(var1: Class<T>): T;
    hasTag<T extends Tag>(var1: Class<T>): boolean;
    isAbstract(): boolean;
    normalize(var1: TypeScope): void;
    ref(var1: TypeID, var2: GenericMapper): DefinitionMemberRef;
    registerTo(var1: TypeMembers, var2: TypeMemberPriority, var3: GenericMapper): void;
    setTag<T extends Tag>(var1: Class<T>, var2: T): void;
  }


  interface ImplementationMember extends DefinitionMember {}
  class ImplementationMember extends DefinitionMember {
    readonly type: TypeID;
    readonly members: List;
    readonly definitionBorrowedMembers: Map;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, type: TypeID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    addMember(member: IDefinitionMember): void;
    describe(): string;
    get builtin(): BuiltinID;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(members: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }


  class InnerDefinition {
    readonly definition: HighLevelDefinition;
    readonly outerTypeArguments: Map;
    constructor(definition: HighLevelDefinition);

    constructor(definition: HighLevelDefinition, outerTypeArguments: Map<TypeParameter, TypeID>);
    instance(registry: GlobalTypeRegistry, typeArguments: TypeID[], outer: DefinitionTypeID): DefinitionTypeID;
  }


  interface InnerDefinitionMember extends DefinitionMember {}
  class InnerDefinitionMember extends DefinitionMember {
    readonly innerDefinition: HighLevelDefinition;
    constructor(position: CodePosition, outer: HighLevelDefinition, modifiers: number, definition: HighLevelDefinition);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get builtin(): BuiltinID;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }


  interface IteratorMember extends FunctionalMember {}
  class IteratorMember extends FunctionalMember {
    body: Statement;
    overrides: IteratorMemberRef;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, iteratorTypes: TypeID[], registry: GlobalTypeRegistry, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get kind(): FunctionalKind;
    get loopVariableCount(): number;
    get loopVariableTypes(): TypeID[];
    get overrides(): DefinitionMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    set overrides(overrides: IteratorMemberRef);
    setContent(body: Statement): void;
  }


  class MemberVisitor<T = any> {
    visitCaller(var1: CallerMember): T;
    visitCaster(var1: CasterMember): T;
    visitConst(var1: ConstMember): T;
    visitConstructor(var1: ConstructorMember): T;
    visitCustomIterator(var1: IteratorMember): T;
    visitDestructor(var1: DestructorMember): T;
    visitField(var1: FieldMember): T;
    visitGetter(var1: GetterMember): T;
    visitImplementation(var1: ImplementationMember): T;
    visitInnerDefinition(var1: InnerDefinitionMember): T;
    visitMethod(var1: MethodMember): T;
    visitOperator(var1: OperatorMember): T;
    visitSetter(var1: SetterMember): T;
    visitStaticInitializer(var1: StaticInitializerMember): T;
  }


  class MemberVisitorWithContext<C = any, R = any> {
    visitCaller(var1: C, var2: CallerMember): R;
    visitCaster(var1: C, var2: CasterMember): R;
    visitConst(var1: C, var2: ConstMember): R;
    visitConstructor(var1: C, var2: ConstructorMember): R;
    visitDestructor(var1: C, var2: DestructorMember): R;
    visitField(var1: C, var2: FieldMember): R;
    visitGetter(var1: C, var2: GetterMember): R;
    visitImplementation(var1: C, var2: ImplementationMember): R;
    visitInnerDefinition(var1: C, var2: InnerDefinitionMember): R;
    visitIterator(var1: C, var2: IteratorMember): R;
    visitMethod(var1: C, var2: MethodMember): R;
    visitOperator(var1: C, var2: OperatorMember): R;
    visitSetter(var1: C, var2: SetterMember): R;
    visitStaticInitializer(var1: C, var2: StaticInitializerMember): R;
  }


  interface MethodMember extends FunctionalMember {}
  class MethodMember extends FunctionalMember {
    readonly name: string;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, name: string, header: FunctionHeader, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get kind(): FunctionalKind;
    get overrides(): FunctionalMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    setOverrides(registry: GlobalTypeRegistry, overrides: FunctionalMemberRef): void;
  }


  interface OperatorMember extends FunctionalMember {}
  class OperatorMember extends FunctionalMember {
    readonly operator: OperatorType;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, operator: OperatorType, header: FunctionHeader, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get canonicalName(): string;
    get effectiveModifiers(): number;
    get kind(): FunctionalKind;
    get overrides(): FunctionalMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    setOverrides(registry: GlobalTypeRegistry, overrides: FunctionalMemberRef): void;
  }


  interface PropertyMember extends DefinitionMember {}
  class PropertyMember extends DefinitionMember {
    readonly builtin: BuiltinID;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, type: TypeID, builtin: BuiltinID);
    get builtin(): BuiltinID;
    get type(): TypeID;
    set type(type: TypeID);
  }


  interface SetterMember extends PropertyMember {}
  class SetterMember extends PropertyMember {
    readonly name: string;
    body: Statement;
    parameter: FunctionParameter;
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, name: string, type: TypeID, builtin: BuiltinID);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): SetterMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(members: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
    set overrides(overrides: SetterMemberRef);
    setBody(body: Statement): void;
  }


  interface StaticInitializerMember extends DefinitionMember {}
  class StaticInitializerMember extends DefinitionMember {
    body: Statement;
    constructor(position: CodePosition, definition: HighLevelDefinition);
    accept<T>(visitor: MemberVisitor<T>): T;
    accept<C, R>(context: C, visitor: MemberVisitorWithContext<C, R>): R;
    describe(): string;
    get builtin(): BuiltinID;
    get effectiveModifiers(): number;
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    isAbstract(): boolean;
    normalize(scope: TypeScope): void;
    ref(type: TypeID, mapper: GenericMapper): DefinitionMemberRef;
    registerTo(type: TypeMembers, priority: TypeMemberPriority, mapper: GenericMapper): void;
  }

}

declare module 'org.openzen.zenscript.codemodel.member.ref' {
  import { CasterMember, IDefinitionMember, ConstMember, FieldMember, FunctionalMember, GetterMember, ImplementationMember, IteratorMember, PropertyMember, SetterMember, OperatorMember } from 'org.openzen.zenscript.codemodel.member';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { CodePosition, Tag } from 'org.openzen.zencode.shared';
  import { Class } from 'java.lang';
  import { Expression, CallArguments, CallTranslator } from 'org.openzen.zenscript.codemodel.expression';
  import { FunctionHeader, GenericMapper, OperatorType, CompareType } from 'org.openzen.zenscript.codemodel';
  import { MemberAnnotation } from 'org.openzen.zenscript.codemodel.annotations';
  import { BuiltinID } from 'org.openzen.zenscript.codemodel.type.member';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { Option } from 'org.openzen.zenscript.codemodel.definition.VariantDefinition';

  interface CasterMemberRef extends DefinitionMemberRef {}
  class CasterMemberRef extends DefinitionMemberRef {
    readonly member: CasterMember;
    readonly type: TypeID;
    readonly toType: TypeID;
    constructor(member: CasterMember, type: TypeID, toType: TypeID);
    cast(position: CodePosition, value: Expression, implicit: boolean): Expression;
    describe(): string;
    get annotations(): MemberAnnotation[];
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): IDefinitionMember;
    getTag<T extends Tag>(type: Class<T>): T;
    isImplicit(): boolean;
  }


  interface ConstMemberRef extends PropertyRef {}
  class ConstMemberRef extends PropertyRef {
    readonly member: ConstMember;
    constructor(owner: TypeID, member: ConstMember, mapper: GenericMapper);
    get overrides(): DefinitionMemberRef;
  }


  class DefinitionMemberRef {
    describe(): string;
    get annotations(): MemberAnnotation[];
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): IDefinitionMember;
    getTag<T extends Tag>(type: Class<T>): T;
    hasTag<T extends Tag>(type: Class<T>): boolean;
  }


  interface FieldMemberRef extends PropertyRef {}
  class FieldMemberRef extends PropertyRef {
    readonly member: FieldMember;
    constructor(owner: TypeID, member: FieldMember, mapper: GenericMapper);
    get overrides(): DefinitionMemberRef;
  }


  interface FunctionalMemberRef extends DefinitionMemberRef {}
  class FunctionalMemberRef extends DefinitionMemberRef {
    constructor(target: FunctionalMember, type: TypeID, mapper: GenericMapper);
    accepts(arguments: number): boolean;
    call(position: CodePosition, target: Expression, instancedHeader: FunctionHeader, arguments: CallArguments, scope: TypeScope): Expression;
    call(position: CodePosition, target: Expression, arguments: CallArguments, scope: TypeScope): Expression;
    callStatic(position: CodePosition, target: TypeID, instancedHeader: FunctionHeader, arguments: CallArguments, scope: TypeScope): Expression;
    callWithComparator(position: CodePosition, comparison: CompareType, target: Expression, instancedHeader: FunctionHeader, arguments: CallArguments, scope: TypeScope): Expression;
    describe(): string;
    equals(o: any): boolean;
    get annotations(): MemberAnnotation[];
    get builtin(): BuiltinID;
    get canonicalName(): string;
    get header(): FunctionHeader;
    get methodName(): string;
    get operator(): OperatorType;
    get overrides(): DefinitionMemberRef;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): FunctionalMember;
    getTag<T extends Tag>(cls: Class<T>): T;
    hashCode(): number;
    isCaller(): boolean;
    isConstructor(): boolean;
    isOperator(): boolean;
    isStatic(): boolean;
  }


  interface GetterMemberRef extends PropertyRef {}
  class GetterMemberRef extends PropertyRef {
    readonly member: GetterMember;
    constructor(owner: TypeID, member: GetterMember, mapper: GenericMapper);
    get(position: CodePosition, target: Expression): Expression;
    get overrides(): GetterMemberRef;
    getStatic(position: CodePosition): Expression;
  }


  interface ImplementationMemberRef extends DefinitionMemberRef {}
  class ImplementationMemberRef extends DefinitionMemberRef {
    readonly member: ImplementationMember;
    readonly implementsType: TypeID;
    constructor(member: ImplementationMember, owner: TypeID, implementsType: TypeID);
    describe(): string;
    get annotations(): MemberAnnotation[];
    get header(): FunctionHeader;
    get overrides(): DefinitionMemberRef;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): IDefinitionMember;
    getTag<T extends Tag>(type: Class<T>): T;
  }


  interface IteratorMemberRef extends DefinitionMemberRef {}
  class IteratorMemberRef extends DefinitionMemberRef {
    readonly target: IteratorMember;
    readonly types: TypeID[];
    constructor(target: IteratorMember, owner: TypeID, ...types: TypeID[]);
    describe(): string;
    get annotations(): MemberAnnotation[];
    get header(): FunctionHeader;
    get loopVariableCount(): number;
    get overrides(): DefinitionMemberRef;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): IDefinitionMember;
    getTag<T extends Tag>(type: Class<T>): T;
  }


  interface PropertyRef extends DefinitionMemberRef {}
  class PropertyRef extends DefinitionMemberRef {
    constructor(owner: TypeID, member: PropertyMember, mapper: GenericMapper);
    describe(): string;
    get annotations(): MemberAnnotation[];
    get header(): FunctionHeader;
    get ownerType(): TypeID;
    get position(): CodePosition;
    get target(): IDefinitionMember;
    get type(): TypeID;
    getTag<T extends Tag>(type: Class<T>): T;
    isFinal(): boolean;
    isStatic(): boolean;
  }


  interface SetterMemberRef extends PropertyRef {}
  class SetterMemberRef extends PropertyRef {
    readonly member: SetterMember;
    constructor(owner: TypeID, member: SetterMember, mapper: GenericMapper);
    get overrides(): SetterMemberRef;
  }


  interface TranslatedOperatorMemberRef extends FunctionalMemberRef {}
  class TranslatedOperatorMemberRef extends FunctionalMemberRef {
    constructor(member: OperatorMember, type: TypeID, mapper: GenericMapper, translator: CallTranslator);
    call(position: CodePosition, target: Expression, instancedHeader: FunctionHeader, arguments: CallArguments, scope: TypeScope): Expression;
    call(position: CodePosition, target: Expression, arguments: CallArguments, scope: TypeScope): Expression;
  }


  class VariantOptionRef {
    readonly variant: TypeID;
    readonly types: TypeID[];
    constructor(option: Option, variant: TypeID, types: TypeID[]);
    get name(): string;
    get option(): Option;
    get ordinal(): number;
    getParameterType(index: number): TypeID;
    getTag<T extends Tag>(type: Class<T>): T;
  }

}

declare module 'org.openzen.zenscript.codemodel.partial' {
  import { List } from 'java.util';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { Expression, CallArguments, LambdaClosure } from 'org.openzen.zenscript.codemodel.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { FunctionHeader, GenericName } from 'org.openzen.zenscript.codemodel';
  import { IDefinitionMember } from 'org.openzen.zenscript.codemodel.member';
  import { TypeMembers, TypeMemberGroup } from 'org.openzen.zenscript.codemodel.type.member';
  import { FunctionalMemberRef, VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { ZSPackage } from 'org.openzen.zenscript.codemodel.definition';

  class IPartialExpression {
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    call(var1: CodePosition, var2: TypeScope, var3: TypeID[], var4: CallArguments): Expression;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    eval(): Expression;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(var1: CodePosition, var2: TypeScope, var3: TypeID[], var4: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(var1: TypeScope, var2: TypeID[], var3: number): FunctionHeader[];
    predictCallTypes(var1: CodePosition, var2: TypeScope, var3: TypeID[], var4: number): TypeID[];
  }


  interface PartialDynamicMemberExpression extends IPartialExpression {}
  class PartialDynamicMemberExpression extends IPartialExpression {
    constructor(position: CodePosition, value: Expression, typeMembers: TypeMembers, member: string, scope: TypeScope);
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    eval(): Expression;
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialGlobalExpression extends IPartialExpression {}
  class PartialGlobalExpression extends IPartialExpression {
    constructor(position: CodePosition, name: string, resolution: IPartialExpression, typeArguments: TypeID[]);
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    eval(): Expression;
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialMemberGroupExpression extends IPartialExpression {}
  class PartialMemberGroupExpression extends IPartialExpression {
    constructor(position: CodePosition, scope: TypeScope, target: Expression, group: TypeMemberGroup, typeArguments: TypeID[], allowStaticMembers: boolean);

    constructor(position: CodePosition, scope: TypeScope, target: Expression, name: string, member: FunctionalMemberRef, typeArguments: TypeID[], allowStaticMembers: boolean);
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    eval(): Expression;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialPackageExpression extends IPartialExpression {}
  class PartialPackageExpression extends IPartialExpression {
    constructor(position: CodePosition, pkg: ZSPackage);
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    eval(): Expression;
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialStaticMemberGroupExpression extends IPartialExpression {}
  class PartialStaticMemberGroupExpression extends IPartialExpression {
    constructor(position: CodePosition, scope: TypeScope, target: TypeID, group: TypeMemberGroup, typeArguments: TypeID[]);
    assign(position: CodePosition, scope: TypeScope, value: Expression): Expression;
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    eval(): Expression;
    get assignHints(): TypeID[];
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialTypeExpression extends IPartialExpression {}
  class PartialTypeExpression extends IPartialExpression {
    constructor(position: CodePosition, type: TypeID, typeArguments: TypeID[]);
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    capture(position: CodePosition, closure: LambdaClosure): IPartialExpression;
    eval(): Expression;
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }


  interface PartialVariantOptionExpression extends IPartialExpression {}
  class PartialVariantOptionExpression extends IPartialExpression {
    constructor(position: CodePosition, scope: TypeScope, option: VariantOptionRef);
    call(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: CallArguments): Expression;
    eval(): Expression;
    get member(): IDefinitionMember;
    get typeArguments(): TypeID[];
    getMember(position: CodePosition, scope: TypeScope, hints: TypeID[], name: GenericName): IPartialExpression;
    getPossibleFunctionHeaders(scope: TypeScope, hints: TypeID[], arguments: number): FunctionHeader[];
    predictCallTypes(position: CodePosition, scope: TypeScope, hints: TypeID[], arguments: number): TypeID[];
  }

}

declare module 'org.openzen.zenscript.codemodel.scope' {
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { GenericName, FunctionHeader, GenericMapper, HighLevelDefinition } from 'org.openzen.zenscript.codemodel';
  import { LoopStatement, ForeachStatement, VarStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { TypeMembers, LocalMemberCache, TypeMemberPreparer } from 'org.openzen.zenscript.codemodel.type.member';
  import { TypeID, GlobalTypeRegistry, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { DollarEvaluator } from 'org.openzen.zenscript.codemodel.scope.BaseScope';
  import { ZSPackage, ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { List, Map } from 'java.util';
  import { AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { VariantOptionSwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { ImplementationMember } from 'org.openzen.zenscript.codemodel.member';
  import { LambdaClosure } from 'org.openzen.zenscript.codemodel.expression';

  interface BaseScope extends TypeScope {}
  class BaseScope extends TypeScope {
    get(var1: CodePosition, var2: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get typeRegistry(): GlobalTypeRegistry;
    getLoop(var1: string): LoopStatement;
    getOuterInstance(var1: CodePosition): IPartialExpression;
    getTypeMembers(type: TypeID): TypeMembers;
  }


  interface BlockScope extends StatementScope {}
  class BlockScope extends StatementScope {
    constructor(parent: StatementScope);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface DefinitionScope extends BaseScope {}
  class DefinitionScope extends BaseScope {
    constructor(outer: BaseScope, definition: HighLevelDefinition);

    constructor(outer: BaseScope, definition: HighLevelDefinition, withMembers: boolean);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface ExpressionScope extends BaseScope {}
  class ExpressionScope extends BaseScope {
    readonly hints: List;
    readonly genericInferenceMap: Map;
    constructor(outer: BaseScope);

    constructor(outer: BaseScope, hints: TypeID[]);

    constructor(scope: BaseScope, hint: TypeID);
    addMatchingVariantOption(name: string, index: number, value: VariantOptionSwitchValue): void;
    createInner(hints: TypeID[], dollar: DollarEvaluator): ExpressionScope;
    forCall(header: FunctionHeader): ExpressionScope;
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get resultTypeHints(): TypeID[];
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
    withHint(hint: TypeID): ExpressionScope;
    withHints(hints: TypeID[]): ExpressionScope;
    withoutHints(): ExpressionScope;
  }


  interface FileScope extends BaseScope {}
  class FileScope extends BaseScope {
    constructor(context: TypeResolutionContext, expansions: ExpansionDefinition[], globals: Map<string, ISymbol>);

    constructor(context: TypeResolutionContext, expansions: ExpansionDefinition[], globals: Map<string, ISymbol>, preparer: TypeMemberPreparer);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface ForeachScope extends StatementScope {}
  class ForeachScope extends StatementScope {
    constructor(statement: ForeachStatement, outer: StatementScope);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface FunctionScope extends StatementScope {}
  class FunctionScope extends StatementScope {
    constructor(position: CodePosition, outer: BaseScope, header: FunctionHeader);

    constructor(position: CodePosition, outer: BaseScope, header: FunctionHeader, dollar: DollarEvaluator);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface GlobalScriptScope extends StatementScope {}
  class GlobalScriptScope extends StatementScope {
    constructor(file: BaseScope, scriptHeader: FunctionHeader);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface ImplementationScope extends BaseScope {}
  class ImplementationScope extends BaseScope {
    constructor(outer: BaseScope, implementation: ImplementationMember);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface LambdaScope extends StatementScope {}
  class LambdaScope extends StatementScope {
    constructor(outer: BaseScope, closure: LambdaClosure, header: FunctionHeader);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface LoopScope extends StatementScope {}
  class LoopScope extends StatementScope {
    constructor(statement: LoopStatement, outer: StatementScope);
    get(position: CodePosition, name: GenericName): IPartialExpression;
    get dollar(): DollarEvaluator;
    get functionHeader(): FunctionHeader;
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get rootPackage(): ZSPackage;
    get thisType(): TypeID;
    getAnnotation(name: string): AnnotationDefinition;
    getLoop(name: string): LoopStatement;
    getOuterInstance(position: CodePosition): IPartialExpression;
    getType(position: CodePosition, name: GenericName[]): TypeID;
  }


  interface StatementScope extends BaseScope {}
  class StatementScope extends BaseScope {
    defineVariable(variable: VarStatement): void;
    get(position: CodePosition, name: GenericName): IPartialExpression;
  }


  interface TypeScope extends TypeResolutionContext {}
  class TypeScope extends TypeResolutionContext {
    get localTypeParameters(): GenericMapper;
    get memberCache(): LocalMemberCache;
    get preparer(): TypeMemberPreparer;
    get typeRegistry(): GlobalTypeRegistry;
    getTypeMembers(type: TypeID): TypeMembers;
  }

}

declare module 'org.openzen.zenscript.codemodel.scope.BaseScope' {
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';

  class DollarEvaluator {
    apply(var1: CodePosition): Expression;
  }

}

declare module 'org.openzen.zenscript.codemodel.SemanticModule' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface State extends Enum<State> {}
  class State extends Enum<State> {
    static readonly INVALID: State;
    static readonly ASSEMBLED: State;
    static readonly NORMALIZED: State;
    static readonly VALIDATED: State;
    static valueOf(name: string): State;
    static values(): State[];
  }

}

declare module 'org.openzen.zenscript.codemodel.serialization' {
  import { HighLevelDefinition, FunctionHeader } from 'org.openzen.zenscript.codemodel';
  import { DefinitionMemberRef, VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { TypeContext, StatementContext } from 'org.openzen.zenscript.codemodel.context';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { EnumConstantMember, IDefinitionMember } from 'org.openzen.zenscript.codemodel.member';
  import { AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { CallArguments, Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { SwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { Exception } from 'java.lang';

  class CodeSerializationInput {
    deserializeArguments(var1: StatementContext): CallArguments;
    deserializeExpression(var1: StatementContext): Expression;
    deserializeHeader(var1: TypeContext): FunctionHeader;
    deserializePosition(): CodePosition;
    deserializeStatement(var1: StatementContext): Statement;
    deserializeType(var1: TypeContext): TypeID;
    deserializeTypeParameter(var1: TypeContext): TypeParameter;
    deserializeTypeParameters(var1: TypeContext): TypeParameter[];
    enqueueCode(var1: DecodingOperation): void;
    enqueueMembers(var1: DecodingOperation): void;
    readAnnotationType(): AnnotationDefinition;
    readBool(): boolean;
    readByte(): number;
    readChar(): string;
    readDefinition(): HighLevelDefinition;
    readDouble(): number;
    readEnumConstant(var1: TypeContext): EnumConstantMember;
    readFloat(): number;
    readInt(): number;
    readLong(): number;
    readMember(var1: TypeContext, var2: TypeID): DefinitionMemberRef;
    readSByte(): number;
    readShort(): number;
    readString(): string;
    readUInt(): number;
    readULong(): number;
    readUShort(): number;
    readVariantOption(var1: TypeContext, var2: TypeID): VariantOptionRef;
  }


  class CodeSerializationOutput {
    enqueueCode(var1: EncodingOperation): void;
    enqueueMembers(var1: EncodingOperation): void;
    serialize(var1: TypeContext, var2: IDefinitionMember): void;
    serialize(var1: TypeContext, var2: TypeID): void;
    serialize(var1: TypeContext, var2: TypeParameter): void;
    serialize(var1: TypeContext, var2: TypeParameter[]): void;
    serialize(var1: CodePosition): void;
    serialize(var1: TypeContext, var2: FunctionHeader): void;
    serialize(var1: StatementContext, var2: CallArguments): void;
    serialize(var1: StatementContext, var2: Statement): void;
    serialize(var1: StatementContext, var2: Expression): void;
    serialize(var1: StatementContext, var2: SwitchValue): void;
    write(var1: HighLevelDefinition): void;
    write(var1: EnumConstantMember): void;
    write(var1: VariantOptionRef): void;
    write(var1: TypeContext, var2: DefinitionMemberRef): void;
    write(var1: AnnotationDefinition): void;
    writeBool(var1: boolean): void;
    writeByte(var1: number): void;
    writeChar(var1: string): void;
    writeDouble(var1: number): void;
    writeFloat(var1: number): void;
    writeInt(var1: number): void;
    writeLong(var1: number): void;
    writeSByte(var1: number): void;
    writeShort(var1: number): void;
    writeString(var1: string): void;
    writeUInt(var1: number): void;
    writeULong(var1: number): void;
    writeUShort(var1: number): void;
  }


  class DecodingOperation {
    decode(var1: CodeSerializationInput): void;
  }


  interface DeserializationException extends Exception {}
  class DeserializationException extends Exception {
    constructor(reason: string);

    constructor(reason: string, cause: Exception);
  }


  class EncodingOperation {
    encode(var1: CodeSerializationOutput): void;
  }

}

declare module 'org.openzen.zenscript.codemodel.statement' {
  import { CodePosition, ConcatMap, CompileExceptionCode, CompileException, Taggable } from 'org.openzen.zencode.shared';
  import { Consumer } from 'java.util.function';
  import { ExpressionTransformer, Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { IteratorMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { EqualsComparable } from 'stdlib';
  import { StatementAnnotation } from 'org.openzen.zenscript.codemodel.annotations';
  import { SwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { List } from 'java.util';

  interface BlockStatement extends Statement {}
  class BlockStatement extends Statement {
    readonly statements: Statement[];
    constructor(position: CodePosition, statements: Statement[]);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface BreakStatement extends Statement {}
  class BreakStatement extends Statement {
    readonly target: LoopStatement;
    constructor(position: CodePosition, target: LoopStatement);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  class CatchClause {
    readonly position: CodePosition;
    readonly content: Statement;
    readonly exceptionVariable: VarStatement;
    constructor(position: CodePosition, exceptionVariable: VarStatement, content: Statement);
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): CatchClause;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): CatchClause;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): CatchClause;
  }


  interface ContinueStatement extends Statement {}
  class ContinueStatement extends Statement {
    readonly target: LoopStatement;
    constructor(position: CodePosition, target: LoopStatement);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface DoWhileStatement extends LoopStatement {}
  class DoWhileStatement extends LoopStatement {
    readonly condition: Expression;
    content: Statement;
    constructor(position: CodePosition, label: string, condition: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface EmptyStatement extends Statement {}
  class EmptyStatement extends Statement {
    constructor(position: CodePosition);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface ExpressionStatement extends Statement {}
  class ExpressionStatement extends Statement {
    readonly expression: Expression;
    constructor(position: CodePosition, expression: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface ForeachStatement extends LoopStatement {}
  class ForeachStatement extends LoopStatement {
    readonly loopVariables: VarStatement[];
    readonly list: Expression;
    readonly iterator: IteratorMemberRef;
    content: Statement;
    constructor(position: CodePosition, loopVariables: VarStatement[], iterator: IteratorMemberRef, list: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface IfStatement extends Statement {}
  class IfStatement extends Statement {
    readonly condition: Expression;
    readonly onThen: Statement;
    readonly onElse: Statement;
    constructor(position: CodePosition, condition: Expression, onThen: Statement, onElse: Statement);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface InvalidStatement extends Statement {}
  class InvalidStatement extends Statement {
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);

    constructor(ex: CompileException);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface LockStatement extends Statement {}
  class LockStatement extends Statement {
    readonly object: Expression;
    readonly content: Statement;
    constructor(position: CodePosition, object: Expression, content: Statement);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface LoopStatement extends EqualsComparable<LoopStatement>, Statement {}
  class LoopStatement extends EqualsComparable<LoopStatement> {
    static readonly NONE: LoopStatement[];
    label: string;
    constructor(position: CodePosition, label: string, thrownType: TypeID);
    equals_(other: LoopStatement): boolean;
  }


  interface ReturnStatement extends Statement {}
  class ReturnStatement extends Statement {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
    withReturnType(scope: TypeScope, returnType: TypeID): Statement;
  }


  interface Statement extends Taggable {}
  class Statement extends Taggable {
    readonly position: CodePosition;
    readonly thrownType: TypeID;
    annotations: StatementAnnotation[];
    constructor(position: CodePosition, thrownType: TypeID);
    accept<T>(var1: StatementVisitor<T>): T;
    accept<C, R>(var1: C, var2: StatementVisitorWithContext<C, R>): R;
    forEachStatement(var1: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(var1: TypeScope, var2: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
    transform(var1: StatementTransformer, var2: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(var1: ExpressionTransformer, var2: ConcatMap<LoopStatement, LoopStatement>): Statement;
    withReturnType(scope: TypeScope, returnType: TypeID): Statement;
  }


  class StatementTransformer {
    transform(var1: Statement): Statement;
  }


  class StatementVisitor<T = any> {
    visitBlock(var1: BlockStatement): T;
    visitBreak(var1: BreakStatement): T;
    visitContinue(var1: ContinueStatement): T;
    visitDoWhile(var1: DoWhileStatement): T;
    visitEmpty(var1: EmptyStatement): T;
    visitExpression(var1: ExpressionStatement): T;
    visitForeach(var1: ForeachStatement): T;
    visitIf(var1: IfStatement): T;
    visitInvalid(statement: InvalidStatement): T;
    visitLock(var1: LockStatement): T;
    visitReturn(var1: ReturnStatement): T;
    visitSwitch(var1: SwitchStatement): T;
    visitThrow(var1: ThrowStatement): T;
    visitTryCatch(var1: TryCatchStatement): T;
    visitVar(var1: VarStatement): T;
    visitWhile(var1: WhileStatement): T;
  }


  class StatementVisitorWithContext<C = any, R = any> {
    visitBlock(var1: C, var2: BlockStatement): R;
    visitBreak(var1: C, var2: BreakStatement): R;
    visitContinue(var1: C, var2: ContinueStatement): R;
    visitDoWhile(var1: C, var2: DoWhileStatement): R;
    visitEmpty(var1: C, var2: EmptyStatement): R;
    visitExpression(var1: C, var2: ExpressionStatement): R;
    visitForeach(var1: C, var2: ForeachStatement): R;
    visitIf(var1: C, var2: IfStatement): R;
    visitInvalid(context: C, statement: InvalidStatement): R;
    visitLock(var1: C, var2: LockStatement): R;
    visitReturn(var1: C, var2: ReturnStatement): R;
    visitSwitch(var1: C, var2: SwitchStatement): R;
    visitThrow(var1: C, var2: ThrowStatement): R;
    visitTryCatch(var1: C, var2: TryCatchStatement): R;
    visitVar(var1: C, var2: VarStatement): R;
    visitWhile(var1: C, var2: WhileStatement): R;
  }


  class SwitchCase {
    readonly value: SwitchValue;
    readonly statements: Statement[];
    constructor(value: SwitchValue, statements: Statement[]);
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): SwitchCase;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): SwitchCase;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): SwitchCase;
  }


  interface SwitchStatement extends LoopStatement {}
  class SwitchStatement extends LoopStatement {
    readonly value: Expression;
    readonly cases: List;
    constructor(position: CodePosition, label: string, value: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface ThrowStatement extends Statement {}
  class ThrowStatement extends Statement {
    readonly value: Expression;
    constructor(position: CodePosition, value: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface TryCatchStatement extends Statement {}
  class TryCatchStatement extends Statement {
    readonly resource: VarStatement;
    readonly content: Statement;
    readonly catchClauses: List;
    readonly finallyClause: Statement;
    constructor(position: CodePosition, resource: VarStatement, content: Statement, catchClauses: CatchClause[], finallyClause: Statement);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface VariableID extends Taggable {}
  class VariableID extends Taggable {
  }


  interface VarStatement extends Statement {}
  class VarStatement extends Statement {
    readonly name: string;
    readonly type: TypeID;
    readonly initializer: Expression;
    readonly variable: VariableID;
    readonly isFinal: boolean;
    constructor(position: CodePosition, variable: VariableID, name: string, type: TypeID, initializer: Expression, isFinal: boolean);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): VarStatement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): VarStatement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): VarStatement;
    transform(transformer: StatementTransformer): Statement;
  }


  interface WhileStatement extends LoopStatement {}
  class WhileStatement extends LoopStatement {
    readonly condition: Expression;
    content: Statement;
    constructor(position: CodePosition, label: string, condition: Expression);
    accept<T>(visitor: StatementVisitor<T>): T;
    accept<C, R>(context: C, visitor: StatementVisitorWithContext<C, R>): R;
    forEachStatement(consumer: Consumer<Statement>): void;
    get returnType(): TypeID;
    normalize(scope: TypeScope, modified: ConcatMap<LoopStatement, LoopStatement>): Statement;
    transform(transformer: StatementTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): WhileStatement;
    transform(transformer: ExpressionTransformer, modified: ConcatMap<LoopStatement, LoopStatement>): WhileStatement;
    transform(transformer: StatementTransformer): Statement;
  }

}

declare module 'org.openzen.zenscript.codemodel.type' {
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { Exception, Enum, Class, Boolean, RuntimeException } from 'java.lang';
  import { GenericMapper, HighLevelDefinition, GenericName, FunctionHeader } from 'org.openzen.zenscript.codemodel';
  import { List, Map, Collection } from 'java.util';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { CodePosition, CompileExceptionCode } from 'org.openzen.zencode.shared';
  import { LocalMemberCache } from 'org.openzen.zenscript.codemodel.type.member';
  import { ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { Function } from 'java.util.function';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { BaseScope } from 'org.openzen.zenscript.codemodel.scope';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { Matching } from 'org.openzen.zenscript.codemodel.type.TypeMatcher';

  interface ArrayTypeID extends TypeID {}
  class ArrayTypeID extends TypeID {
    static readonly INT: ArrayTypeID;
    static readonly CHAR: ArrayTypeID;
    readonly elementType: TypeID;
    readonly dimension: number;
    constructor(registry: GlobalTypeRegistry, elementType: TypeID, dimension: number);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get defaultValue(): Expression;
    get normalized(): ArrayTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    removeOneDimension(): TypeID;
    toString(): string;
  }


  interface AssocTypeID extends TypeID {}
  class AssocTypeID extends TypeID {
    readonly keyType: TypeID;
    readonly valueType: TypeID;
    constructor(typeRegistry: GlobalTypeRegistry, keyType: TypeID, valueType: TypeID);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): AssocTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
  }


  interface BasicTypeID extends Enum<BasicTypeID> {}
  class BasicTypeID extends Enum<BasicTypeID> {
    static readonly VOID: BasicTypeID;
    static readonly NULL: BasicTypeID;
    static readonly BOOL: BasicTypeID;
    static readonly BYTE: BasicTypeID;
    static readonly SBYTE: BasicTypeID;
    static readonly SHORT: BasicTypeID;
    static readonly USHORT: BasicTypeID;
    static readonly INT: BasicTypeID;
    static readonly UINT: BasicTypeID;
    static readonly LONG: BasicTypeID;
    static readonly ULONG: BasicTypeID;
    static readonly USIZE: BasicTypeID;
    static readonly FLOAT: BasicTypeID;
    static readonly DOUBLE: BasicTypeID;
    static readonly CHAR: BasicTypeID;
    static readonly STRING: BasicTypeID;
    static readonly UNDETERMINED: BasicTypeID;
    accept(visitor: TypeVisitor<R>): R;
    accept(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get defaultValue(): Expression;
    get normalized(): BasicTypeID;
    hasDefaultValue(): boolean;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
    static valueOf(name: string): BasicTypeID;
    static values(): BasicTypeID[];
  }


  interface DefinitionTypeID extends TypeID {}
  class DefinitionTypeID extends TypeID {
    readonly definition: HighLevelDefinition;
    readonly typeArguments: TypeID[];
    readonly outer: DefinitionTypeID;
    constructor(typeRegistry: GlobalTypeRegistry, definition: HighLevelDefinition, typeArguments: TypeID[]);

    constructor(typeRegistry: GlobalTypeRegistry, definition: HighLevelDefinition, typeArguments: TypeID[], outer: DefinitionTypeID);

    constructor(definition: HighLevelDefinition);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    canCastImplicitFrom(other: TypeID): boolean;
    castImplicitFrom(position: CodePosition, value: Expression): Expression;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): TypeID;
    get typeParameterMapping(): Map<TypeParameter, TypeID>;
    getInnerType(name: GenericName, registry: GlobalTypeRegistry): DefinitionTypeID;
    getSuperType(registry: GlobalTypeRegistry): TypeID;
    hasDefaultValue(): boolean;
    hasTypeParameters(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isDefinition(definition: HighLevelDefinition): boolean;
    isEnum(): boolean;
    isOptional(): boolean;
    isValueType(): boolean;
    isVariant(): boolean;
    toString(): string;
  }


  interface FunctionTypeID extends TypeID {}
  class FunctionTypeID extends TypeID {
    readonly header: FunctionHeader;
    constructor(registry: GlobalTypeRegistry, header: FunctionHeader);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): FunctionTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
  }


  interface GenericMapTypeID extends TypeID {}
  class GenericMapTypeID extends TypeID {
    readonly value: TypeID;
    readonly key: TypeParameter;
    constructor(registry: GlobalTypeRegistry, value: TypeID, key: TypeParameter);
    accept<T>(visitor: TypeVisitor<T>): T;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    accept<R>(var1: TypeVisitor<R>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): GenericMapTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
  }


  interface GenericTypeID extends TypeID {}
  class GenericTypeID extends TypeID {
    readonly parameter: TypeParameter;
    constructor(parameter: TypeParameter);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): GenericTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isGeneric(): boolean;
    isOptional(): boolean;
    isValueType(): boolean;
    matches(cache: LocalMemberCache, type: TypeID): boolean;
    toString(): string;
  }


  class GlobalTypeRegistry {
    readonly stdlib: ZSPackage;
    constructor(stdlib: ZSPackage);
    get definitions(): Collection<DefinitionTypeID>;
    getArray(baseType: TypeID, dimension: number): ArrayTypeID;
    getAssociative(keyType: TypeID, valueType: TypeID): AssocTypeID;
    getForDefinition(definition: HighLevelDefinition, ...typeArguments: TypeID[]): DefinitionTypeID;
    getForDefinition(definition: HighLevelDefinition, typeArguments: TypeID[], outer: DefinitionTypeID): DefinitionTypeID;
    getForMyDefinition(definition: HighLevelDefinition): DefinitionTypeID;
    getFunction(header: FunctionHeader): FunctionTypeID;
    getGeneric(parameter: TypeParameter): GenericTypeID;
    getGenericMap(valueType: TypeID, key: TypeParameter): GenericMapTypeID;
    getIterator(loopTypes: TypeID[]): IteratorTypeID;
    getOptional(original: TypeID): TypeID;
    getRange(type: TypeID): RangeTypeID;
    internalize<T extends TypeID>(clazz: Class<T>, id: T): T;
    internalize<ID, TYPE extends TypeID>(typeClass: Class<TYPE>, id: ID, generator: Function<ID, TYPE>): TYPE;
  }


  interface InferenceBlockingTypeParameterVisitor extends TypeVisitor<boolean> {}
  class InferenceBlockingTypeParameterVisitor extends TypeVisitor<boolean> {
    constructor(parameters: TypeParameter[]);
    visitArray(array: ArrayTypeID): boolean;
    visitAssoc(assoc: AssocTypeID): boolean;
    visitBasic(basic: BasicTypeID): boolean;
    visitDefinition(definition: DefinitionTypeID): boolean;
    visitFunction(functionParameter: FunctionTypeID): boolean;
    visitGeneric(generic: GenericTypeID): boolean;
    visitGenericMap(map: GenericMapTypeID): boolean;
    visitInvalid(type: InvalidTypeID): boolean;
    visitIterator(iterator: IteratorTypeID): boolean;
    visitOptional(type: OptionalTypeID): boolean;
    visitRange(range: RangeTypeID): boolean;
  }


  interface InvalidTypeID extends TypeID {}
  class InvalidTypeID extends TypeID {
    readonly position: CodePosition;
    readonly code: CompileExceptionCode;
    readonly message: string;
    constructor(position: CodePosition, code: CompileExceptionCode, message: string);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): TypeID;
    hasDefaultValue(): boolean;
    instance(mapper: GenericMapper): TypeID;
    isValueType(): boolean;
    toString(): string;
  }


  class ISymbol {
    getExpression(var1: CodePosition, var2: BaseScope, var3: TypeID[]): IPartialExpression;
    getType(var1: CodePosition, var2: TypeResolutionContext, var3: TypeID[]): TypeID;
  }


  interface IteratorTypeID extends TypeID {}
  class IteratorTypeID extends TypeID {
    readonly iteratorTypes: TypeID[];
    constructor(registry: GlobalTypeRegistry, iteratorTypes: TypeID[]);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): IteratorTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
  }


  interface OptionalTypeID extends TypeID {}
  class OptionalTypeID extends TypeID {
    readonly baseType: TypeID;
    constructor(registry: GlobalTypeRegistry, baseType: TypeID);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get defaultValue(): Expression;
    get normalized(): TypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isGeneric(): boolean;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
    withoutOptional(): TypeID;
  }


  interface RangeTypeID extends TypeID {}
  class RangeTypeID extends TypeID {
    static readonly INT: RangeTypeID;
    static readonly USIZE: RangeTypeID;
    readonly baseType: TypeID;
    constructor(registry: GlobalTypeRegistry, baseType: TypeID);
    accept<R>(visitor: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(context: C, visitor: TypeVisitorWithContext<C, R, E>): R;
    equals(obj: any): boolean;
    extractTypeParameters(typeParameters: TypeParameter[]): void;
    get normalized(): RangeTypeID;
    hasDefaultValue(): boolean;
    hashCode(): number;
    instance(mapper: GenericMapper): TypeID;
    isOptional(): boolean;
    isValueType(): boolean;
    toString(): string;
  }


  class TypeID {
    static readonly NONE: TypeID[];
    accept<R>(var1: TypeVisitor<R>): R;
    accept<C, R, E extends Exception>(var1: C, var2: TypeVisitorWithContext<C, R, E>): R;
    canCastExplicitFrom(other: TypeID): boolean;
    canCastExplicitTo(other: TypeID): boolean;
    canCastImplicitFrom(other: TypeID): boolean;
    canCastImplicitTo(other: TypeID): boolean;
    castExplicitFrom(position: CodePosition, value: Expression): Expression;
    castExplicitTo(position: CodePosition, value: Expression, toOther: TypeID): Expression;
    castImplicitFrom(position: CodePosition, value: Expression): Expression;
    castImplicitTo(position: CodePosition, value: Expression, toType: TypeID): Expression;
    extractTypeParameters(var1: TypeParameter[]): void;
    get defaultValue(): Expression;
    get normalized(): TypeID;
    static getMapping(parameters: TypeParameter[], arguments: TypeID[]): Map<TypeParameter, TypeID>;
    static getSelfMapping(registry: GlobalTypeRegistry, parameters: TypeParameter[]): Map<TypeParameter, TypeID>;
    getSuperType(registry: GlobalTypeRegistry): TypeID;
    hasDefaultValue(): boolean;
    inferTypeParameters(cache: LocalMemberCache, targetType: TypeID): Map<TypeParameter, TypeID>;
    instance(var1: GenericMapper): TypeID;
    isDefinition(definition: HighLevelDefinition): boolean;
    isEnum(): boolean;
    isGeneric(): boolean;
    isOptional(): boolean;
    isValueType(): boolean;
    isVariant(): boolean;
    withoutOptional(): TypeID;
  }


  interface TypeMatcher extends TypeVisitorWithContext<Matching, boolean, RuntimeException> {}
  class TypeMatcher extends TypeVisitorWithContext<Matching, boolean, RuntimeException> {
    static match(cache: LocalMemberCache, type: TypeID, pattern: TypeID): Map<TypeParameter, TypeID>;
    visitArray(context: Matching, array: ArrayTypeID): boolean;
    visitAssoc(context: Matching, assoc: AssocTypeID): boolean;
    visitBasic(context: Matching, basic: BasicTypeID): boolean;
    visitDefinition(context: Matching, definition: DefinitionTypeID): boolean;
    visitFunction(context: Matching, functionParameter: FunctionTypeID): boolean;
    visitGeneric(context: Matching, generic: GenericTypeID): boolean;
    visitGenericMap(context: Matching, map: GenericMapTypeID): boolean;
    visitInvalid(context: Matching, invalid: InvalidTypeID): boolean;
    visitIterator(context: Matching, iterator: IteratorTypeID): boolean;
    visitOptional(context: Matching, type: OptionalTypeID): boolean;
    visitRange(context: Matching, range: RangeTypeID): boolean;
  }


  interface TypeSymbol extends ISymbol {}
  class TypeSymbol extends ISymbol {
    constructor(definition: HighLevelDefinition);
    getExpression(position: CodePosition, scope: BaseScope, typeArguments: TypeID[]): IPartialExpression;
    getType(position: CodePosition, context: TypeResolutionContext, typeArguments: TypeID[]): TypeID;
  }


  class TypeVisitor<T = any> {
    visitArray(var1: ArrayTypeID): T;
    visitAssoc(var1: AssocTypeID): T;
    visitBasic(var1: BasicTypeID): T;
    visitDefinition(var1: DefinitionTypeID): T;
    visitFunction(var1: FunctionTypeID): T;
    visitGeneric(var1: GenericTypeID): T;
    visitGenericMap(var1: GenericMapTypeID): T;
    visitInvalid(type: InvalidTypeID): T;
    visitIterator(var1: IteratorTypeID): T;
    visitOptional(var1: OptionalTypeID): T;
    visitRange(var1: RangeTypeID): T;
  }


  class TypeVisitorWithContext<C = any, R = any, E extends Exception = any> {
    visitArray(var1: C, var2: ArrayTypeID): R;
    visitAssoc(var1: C, var2: AssocTypeID): R;
    visitBasic(var1: C, var2: BasicTypeID): R;
    visitDefinition(var1: C, var2: DefinitionTypeID): R;
    visitFunction(var1: C, var2: FunctionTypeID): R;
    visitGeneric(var1: C, var2: GenericTypeID): R;
    visitGenericMap(var1: C, var2: GenericMapTypeID): R;
    visitInvalid(context: C, type: InvalidTypeID): R;
    visitIterator(var1: C, var2: IteratorTypeID): R;
    visitOptional(var1: C, var2: OptionalTypeID): R;
    visitRange(var1: C, var2: RangeTypeID): R;
  }

}

declare module 'org.openzen.zenscript.codemodel.type.member' {
  import { Enum, Void, RuntimeException } from 'java.lang';
  import { List, Set, Map } from 'java.util';
  import { GlobalTypeRegistry, TypeID, TypeVisitorWithContext, BasicTypeID, ArrayTypeID, AssocTypeID, GenericMapTypeID, InvalidTypeID, IteratorTypeID, FunctionTypeID, DefinitionTypeID, GenericTypeID, RangeTypeID, OptionalTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { FunctionalMemberRef, FieldMemberRef, GetterMemberRef, SetterMemberRef, ConstMemberRef, DefinitionMemberRef, CasterMemberRef, VariantOptionRef, IteratorMemberRef, ImplementationMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { FunctionHeader, CompareType, OperatorType, GenericName } from 'org.openzen.zenscript.codemodel';
  import { Expression, CallArguments } from 'org.openzen.zenscript.codemodel.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { FunctionalMember, IDefinitionMember, InnerDefinition, EnumConstantMember } from 'org.openzen.zenscript.codemodel.member';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';

  interface BuiltinID extends Enum<BuiltinID> {}
  class BuiltinID extends Enum<BuiltinID> {
    static readonly BOOL_NOT: BuiltinID;
    static readonly BOOL_AND: BuiltinID;
    static readonly BOOL_OR: BuiltinID;
    static readonly BOOL_XOR: BuiltinID;
    static readonly BOOL_EQUALS: BuiltinID;
    static readonly BOOL_NOTEQUALS: BuiltinID;
    static readonly BOOL_TO_STRING: BuiltinID;
    static readonly BOOL_PARSE: BuiltinID;
    static readonly BYTE_NOT: BuiltinID;
    static readonly BYTE_INC: BuiltinID;
    static readonly BYTE_DEC: BuiltinID;
    static readonly BYTE_ADD_BYTE: BuiltinID;
    static readonly BYTE_SUB_BYTE: BuiltinID;
    static readonly BYTE_MUL_BYTE: BuiltinID;
    static readonly BYTE_DIV_BYTE: BuiltinID;
    static readonly BYTE_MOD_BYTE: BuiltinID;
    static readonly BYTE_AND_BYTE: BuiltinID;
    static readonly BYTE_OR_BYTE: BuiltinID;
    static readonly BYTE_XOR_BYTE: BuiltinID;
    static readonly BYTE_SHL: BuiltinID;
    static readonly BYTE_SHR: BuiltinID;
    static readonly BYTE_COMPARE: BuiltinID;
    static readonly BYTE_TO_SBYTE: BuiltinID;
    static readonly BYTE_TO_SHORT: BuiltinID;
    static readonly BYTE_TO_USHORT: BuiltinID;
    static readonly BYTE_TO_INT: BuiltinID;
    static readonly BYTE_TO_UINT: BuiltinID;
    static readonly BYTE_TO_LONG: BuiltinID;
    static readonly BYTE_TO_ULONG: BuiltinID;
    static readonly BYTE_TO_USIZE: BuiltinID;
    static readonly BYTE_TO_FLOAT: BuiltinID;
    static readonly BYTE_TO_DOUBLE: BuiltinID;
    static readonly BYTE_TO_CHAR: BuiltinID;
    static readonly BYTE_TO_STRING: BuiltinID;
    static readonly BYTE_PARSE: BuiltinID;
    static readonly BYTE_PARSE_WITH_BASE: BuiltinID;
    static readonly BYTE_GET_MIN_VALUE: BuiltinID;
    static readonly BYTE_GET_MAX_VALUE: BuiltinID;
    static readonly SBYTE_NOT: BuiltinID;
    static readonly SBYTE_NEG: BuiltinID;
    static readonly SBYTE_INC: BuiltinID;
    static readonly SBYTE_DEC: BuiltinID;
    static readonly SBYTE_ADD_SBYTE: BuiltinID;
    static readonly SBYTE_SUB_SBYTE: BuiltinID;
    static readonly SBYTE_MUL_SBYTE: BuiltinID;
    static readonly SBYTE_DIV_SBYTE: BuiltinID;
    static readonly SBYTE_MOD_SBYTE: BuiltinID;
    static readonly SBYTE_AND_SBYTE: BuiltinID;
    static readonly SBYTE_OR_SBYTE: BuiltinID;
    static readonly SBYTE_XOR_SBYTE: BuiltinID;
    static readonly SBYTE_SHL: BuiltinID;
    static readonly SBYTE_SHR: BuiltinID;
    static readonly SBYTE_USHR: BuiltinID;
    static readonly SBYTE_COMPARE: BuiltinID;
    static readonly SBYTE_TO_BYTE: BuiltinID;
    static readonly SBYTE_TO_SHORT: BuiltinID;
    static readonly SBYTE_TO_USHORT: BuiltinID;
    static readonly SBYTE_TO_INT: BuiltinID;
    static readonly SBYTE_TO_UINT: BuiltinID;
    static readonly SBYTE_TO_LONG: BuiltinID;
    static readonly SBYTE_TO_ULONG: BuiltinID;
    static readonly SBYTE_TO_USIZE: BuiltinID;
    static readonly SBYTE_TO_FLOAT: BuiltinID;
    static readonly SBYTE_TO_DOUBLE: BuiltinID;
    static readonly SBYTE_TO_CHAR: BuiltinID;
    static readonly SBYTE_TO_STRING: BuiltinID;
    static readonly SBYTE_PARSE: BuiltinID;
    static readonly SBYTE_PARSE_WITH_BASE: BuiltinID;
    static readonly SBYTE_GET_MIN_VALUE: BuiltinID;
    static readonly SBYTE_GET_MAX_VALUE: BuiltinID;
    static readonly SHORT_NOT: BuiltinID;
    static readonly SHORT_NEG: BuiltinID;
    static readonly SHORT_INC: BuiltinID;
    static readonly SHORT_DEC: BuiltinID;
    static readonly SHORT_ADD_SHORT: BuiltinID;
    static readonly SHORT_SUB_SHORT: BuiltinID;
    static readonly SHORT_MUL_SHORT: BuiltinID;
    static readonly SHORT_DIV_SHORT: BuiltinID;
    static readonly SHORT_MOD_SHORT: BuiltinID;
    static readonly SHORT_AND_SHORT: BuiltinID;
    static readonly SHORT_OR_SHORT: BuiltinID;
    static readonly SHORT_XOR_SHORT: BuiltinID;
    static readonly SHORT_SHL: BuiltinID;
    static readonly SHORT_SHR: BuiltinID;
    static readonly SHORT_USHR: BuiltinID;
    static readonly SHORT_COMPARE: BuiltinID;
    static readonly SHORT_TO_BYTE: BuiltinID;
    static readonly SHORT_TO_SBYTE: BuiltinID;
    static readonly SHORT_TO_USHORT: BuiltinID;
    static readonly SHORT_TO_INT: BuiltinID;
    static readonly SHORT_TO_UINT: BuiltinID;
    static readonly SHORT_TO_LONG: BuiltinID;
    static readonly SHORT_TO_ULONG: BuiltinID;
    static readonly SHORT_TO_USIZE: BuiltinID;
    static readonly SHORT_TO_FLOAT: BuiltinID;
    static readonly SHORT_TO_DOUBLE: BuiltinID;
    static readonly SHORT_TO_CHAR: BuiltinID;
    static readonly SHORT_TO_STRING: BuiltinID;
    static readonly SHORT_PARSE: BuiltinID;
    static readonly SHORT_PARSE_WITH_BASE: BuiltinID;
    static readonly SHORT_GET_MIN_VALUE: BuiltinID;
    static readonly SHORT_GET_MAX_VALUE: BuiltinID;
    static readonly USHORT_NOT: BuiltinID;
    static readonly USHORT_INC: BuiltinID;
    static readonly USHORT_DEC: BuiltinID;
    static readonly USHORT_ADD_USHORT: BuiltinID;
    static readonly USHORT_SUB_USHORT: BuiltinID;
    static readonly USHORT_MUL_USHORT: BuiltinID;
    static readonly USHORT_DIV_USHORT: BuiltinID;
    static readonly USHORT_MOD_USHORT: BuiltinID;
    static readonly USHORT_AND_USHORT: BuiltinID;
    static readonly USHORT_OR_USHORT: BuiltinID;
    static readonly USHORT_XOR_USHORT: BuiltinID;
    static readonly USHORT_SHL: BuiltinID;
    static readonly USHORT_SHR: BuiltinID;
    static readonly USHORT_COMPARE: BuiltinID;
    static readonly USHORT_TO_BYTE: BuiltinID;
    static readonly USHORT_TO_SBYTE: BuiltinID;
    static readonly USHORT_TO_SHORT: BuiltinID;
    static readonly USHORT_TO_INT: BuiltinID;
    static readonly USHORT_TO_UINT: BuiltinID;
    static readonly USHORT_TO_LONG: BuiltinID;
    static readonly USHORT_TO_ULONG: BuiltinID;
    static readonly USHORT_TO_USIZE: BuiltinID;
    static readonly USHORT_TO_FLOAT: BuiltinID;
    static readonly USHORT_TO_DOUBLE: BuiltinID;
    static readonly USHORT_TO_CHAR: BuiltinID;
    static readonly USHORT_TO_STRING: BuiltinID;
    static readonly USHORT_PARSE: BuiltinID;
    static readonly USHORT_PARSE_WITH_BASE: BuiltinID;
    static readonly USHORT_GET_MIN_VALUE: BuiltinID;
    static readonly USHORT_GET_MAX_VALUE: BuiltinID;
    static readonly INT_NOT: BuiltinID;
    static readonly INT_NEG: BuiltinID;
    static readonly INT_INC: BuiltinID;
    static readonly INT_DEC: BuiltinID;
    static readonly INT_ADD_INT: BuiltinID;
    static readonly INT_ADD_USIZE: BuiltinID;
    static readonly INT_SUB_INT: BuiltinID;
    static readonly INT_MUL_INT: BuiltinID;
    static readonly INT_DIV_INT: BuiltinID;
    static readonly INT_MOD_INT: BuiltinID;
    static readonly INT_AND_INT: BuiltinID;
    static readonly INT_OR_INT: BuiltinID;
    static readonly INT_XOR_INT: BuiltinID;
    static readonly INT_SHL: BuiltinID;
    static readonly INT_SHR: BuiltinID;
    static readonly INT_USHR: BuiltinID;
    static readonly INT_COMPARE: BuiltinID;
    static readonly INT_TO_BYTE: BuiltinID;
    static readonly INT_TO_SBYTE: BuiltinID;
    static readonly INT_TO_SHORT: BuiltinID;
    static readonly INT_TO_USHORT: BuiltinID;
    static readonly INT_TO_UINT: BuiltinID;
    static readonly INT_TO_LONG: BuiltinID;
    static readonly INT_TO_ULONG: BuiltinID;
    static readonly INT_TO_USIZE: BuiltinID;
    static readonly INT_TO_FLOAT: BuiltinID;
    static readonly INT_TO_DOUBLE: BuiltinID;
    static readonly INT_TO_CHAR: BuiltinID;
    static readonly INT_TO_STRING: BuiltinID;
    static readonly INT_PARSE: BuiltinID;
    static readonly INT_PARSE_WITH_BASE: BuiltinID;
    static readonly INT_GET_MIN_VALUE: BuiltinID;
    static readonly INT_GET_MAX_VALUE: BuiltinID;
    static readonly INT_COUNT_LOW_ZEROES: BuiltinID;
    static readonly INT_COUNT_HIGH_ZEROES: BuiltinID;
    static readonly INT_COUNT_LOW_ONES: BuiltinID;
    static readonly INT_COUNT_HIGH_ONES: BuiltinID;
    static readonly INT_HIGHEST_ONE_BIT: BuiltinID;
    static readonly INT_LOWEST_ONE_BIT: BuiltinID;
    static readonly INT_HIGHEST_ZERO_BIT: BuiltinID;
    static readonly INT_LOWEST_ZERO_BIT: BuiltinID;
    static readonly INT_BIT_COUNT: BuiltinID;
    static readonly UINT_NOT: BuiltinID;
    static readonly UINT_INC: BuiltinID;
    static readonly UINT_DEC: BuiltinID;
    static readonly UINT_ADD_UINT: BuiltinID;
    static readonly UINT_SUB_UINT: BuiltinID;
    static readonly UINT_MUL_UINT: BuiltinID;
    static readonly UINT_DIV_UINT: BuiltinID;
    static readonly UINT_MOD_UINT: BuiltinID;
    static readonly UINT_AND_UINT: BuiltinID;
    static readonly UINT_OR_UINT: BuiltinID;
    static readonly UINT_XOR_UINT: BuiltinID;
    static readonly UINT_SHL: BuiltinID;
    static readonly UINT_SHR: BuiltinID;
    static readonly UINT_COMPARE: BuiltinID;
    static readonly UINT_TO_BYTE: BuiltinID;
    static readonly UINT_TO_SBYTE: BuiltinID;
    static readonly UINT_TO_SHORT: BuiltinID;
    static readonly UINT_TO_USHORT: BuiltinID;
    static readonly UINT_TO_INT: BuiltinID;
    static readonly UINT_TO_LONG: BuiltinID;
    static readonly UINT_TO_ULONG: BuiltinID;
    static readonly UINT_TO_USIZE: BuiltinID;
    static readonly UINT_TO_FLOAT: BuiltinID;
    static readonly UINT_TO_DOUBLE: BuiltinID;
    static readonly UINT_TO_CHAR: BuiltinID;
    static readonly UINT_TO_STRING: BuiltinID;
    static readonly UINT_PARSE: BuiltinID;
    static readonly UINT_PARSE_WITH_BASE: BuiltinID;
    static readonly UINT_GET_MIN_VALUE: BuiltinID;
    static readonly UINT_GET_MAX_VALUE: BuiltinID;
    static readonly UINT_COUNT_LOW_ZEROES: BuiltinID;
    static readonly UINT_COUNT_HIGH_ZEROES: BuiltinID;
    static readonly UINT_COUNT_LOW_ONES: BuiltinID;
    static readonly UINT_COUNT_HIGH_ONES: BuiltinID;
    static readonly UINT_HIGHEST_ONE_BIT: BuiltinID;
    static readonly UINT_LOWEST_ONE_BIT: BuiltinID;
    static readonly UINT_HIGHEST_ZERO_BIT: BuiltinID;
    static readonly UINT_LOWEST_ZERO_BIT: BuiltinID;
    static readonly UINT_BIT_COUNT: BuiltinID;
    static readonly LONG_NOT: BuiltinID;
    static readonly LONG_NEG: BuiltinID;
    static readonly LONG_INC: BuiltinID;
    static readonly LONG_DEC: BuiltinID;
    static readonly LONG_ADD_LONG: BuiltinID;
    static readonly LONG_SUB_LONG: BuiltinID;
    static readonly LONG_MUL_LONG: BuiltinID;
    static readonly LONG_DIV_LONG: BuiltinID;
    static readonly LONG_MOD_LONG: BuiltinID;
    static readonly LONG_AND_LONG: BuiltinID;
    static readonly LONG_OR_LONG: BuiltinID;
    static readonly LONG_XOR_LONG: BuiltinID;
    static readonly LONG_SHL: BuiltinID;
    static readonly LONG_SHR: BuiltinID;
    static readonly LONG_USHR: BuiltinID;
    static readonly LONG_COMPARE: BuiltinID;
    static readonly LONG_COMPARE_INT: BuiltinID;
    static readonly LONG_TO_BYTE: BuiltinID;
    static readonly LONG_TO_SBYTE: BuiltinID;
    static readonly LONG_TO_SHORT: BuiltinID;
    static readonly LONG_TO_USHORT: BuiltinID;
    static readonly LONG_TO_INT: BuiltinID;
    static readonly LONG_TO_UINT: BuiltinID;
    static readonly LONG_TO_ULONG: BuiltinID;
    static readonly LONG_TO_USIZE: BuiltinID;
    static readonly LONG_TO_FLOAT: BuiltinID;
    static readonly LONG_TO_DOUBLE: BuiltinID;
    static readonly LONG_TO_CHAR: BuiltinID;
    static readonly LONG_TO_STRING: BuiltinID;
    static readonly LONG_PARSE: BuiltinID;
    static readonly LONG_PARSE_WITH_BASE: BuiltinID;
    static readonly LONG_GET_MIN_VALUE: BuiltinID;
    static readonly LONG_GET_MAX_VALUE: BuiltinID;
    static readonly LONG_COUNT_LOW_ZEROES: BuiltinID;
    static readonly LONG_COUNT_HIGH_ZEROES: BuiltinID;
    static readonly LONG_COUNT_LOW_ONES: BuiltinID;
    static readonly LONG_COUNT_HIGH_ONES: BuiltinID;
    static readonly LONG_HIGHEST_ONE_BIT: BuiltinID;
    static readonly LONG_LOWEST_ONE_BIT: BuiltinID;
    static readonly LONG_HIGHEST_ZERO_BIT: BuiltinID;
    static readonly LONG_LOWEST_ZERO_BIT: BuiltinID;
    static readonly LONG_BIT_COUNT: BuiltinID;
    static readonly ULONG_NOT: BuiltinID;
    static readonly ULONG_INC: BuiltinID;
    static readonly ULONG_DEC: BuiltinID;
    static readonly ULONG_ADD_ULONG: BuiltinID;
    static readonly ULONG_SUB_ULONG: BuiltinID;
    static readonly ULONG_MUL_ULONG: BuiltinID;
    static readonly ULONG_DIV_ULONG: BuiltinID;
    static readonly ULONG_MOD_ULONG: BuiltinID;
    static readonly ULONG_AND_ULONG: BuiltinID;
    static readonly ULONG_OR_ULONG: BuiltinID;
    static readonly ULONG_XOR_ULONG: BuiltinID;
    static readonly ULONG_SHL: BuiltinID;
    static readonly ULONG_SHR: BuiltinID;
    static readonly ULONG_COMPARE: BuiltinID;
    static readonly ULONG_COMPARE_UINT: BuiltinID;
    static readonly ULONG_COMPARE_USIZE: BuiltinID;
    static readonly ULONG_TO_BYTE: BuiltinID;
    static readonly ULONG_TO_SBYTE: BuiltinID;
    static readonly ULONG_TO_SHORT: BuiltinID;
    static readonly ULONG_TO_USHORT: BuiltinID;
    static readonly ULONG_TO_INT: BuiltinID;
    static readonly ULONG_TO_UINT: BuiltinID;
    static readonly ULONG_TO_LONG: BuiltinID;
    static readonly ULONG_TO_USIZE: BuiltinID;
    static readonly ULONG_TO_FLOAT: BuiltinID;
    static readonly ULONG_TO_DOUBLE: BuiltinID;
    static readonly ULONG_TO_CHAR: BuiltinID;
    static readonly ULONG_TO_STRING: BuiltinID;
    static readonly ULONG_PARSE: BuiltinID;
    static readonly ULONG_PARSE_WITH_BASE: BuiltinID;
    static readonly ULONG_GET_MIN_VALUE: BuiltinID;
    static readonly ULONG_GET_MAX_VALUE: BuiltinID;
    static readonly ULONG_COUNT_LOW_ZEROES: BuiltinID;
    static readonly ULONG_COUNT_HIGH_ZEROES: BuiltinID;
    static readonly ULONG_COUNT_LOW_ONES: BuiltinID;
    static readonly ULONG_COUNT_HIGH_ONES: BuiltinID;
    static readonly ULONG_HIGHEST_ONE_BIT: BuiltinID;
    static readonly ULONG_LOWEST_ONE_BIT: BuiltinID;
    static readonly ULONG_HIGHEST_ZERO_BIT: BuiltinID;
    static readonly ULONG_LOWEST_ZERO_BIT: BuiltinID;
    static readonly ULONG_BIT_COUNT: BuiltinID;
    static readonly USIZE_NOT: BuiltinID;
    static readonly USIZE_INC: BuiltinID;
    static readonly USIZE_DEC: BuiltinID;
    static readonly USIZE_ADD_USIZE: BuiltinID;
    static readonly USIZE_SUB_USIZE: BuiltinID;
    static readonly USIZE_MUL_USIZE: BuiltinID;
    static readonly USIZE_DIV_USIZE: BuiltinID;
    static readonly USIZE_MOD_USIZE: BuiltinID;
    static readonly USIZE_AND_USIZE: BuiltinID;
    static readonly USIZE_OR_USIZE: BuiltinID;
    static readonly USIZE_XOR_USIZE: BuiltinID;
    static readonly USIZE_SHL: BuiltinID;
    static readonly USIZE_SHR: BuiltinID;
    static readonly USIZE_COMPARE: BuiltinID;
    static readonly USIZE_COMPARE_UINT: BuiltinID;
    static readonly USIZE_TO_BYTE: BuiltinID;
    static readonly USIZE_TO_SBYTE: BuiltinID;
    static readonly USIZE_TO_SHORT: BuiltinID;
    static readonly USIZE_TO_USHORT: BuiltinID;
    static readonly USIZE_TO_INT: BuiltinID;
    static readonly USIZE_TO_UINT: BuiltinID;
    static readonly USIZE_TO_LONG: BuiltinID;
    static readonly USIZE_TO_ULONG: BuiltinID;
    static readonly USIZE_TO_FLOAT: BuiltinID;
    static readonly USIZE_TO_DOUBLE: BuiltinID;
    static readonly USIZE_TO_CHAR: BuiltinID;
    static readonly USIZE_TO_STRING: BuiltinID;
    static readonly USIZE_PARSE: BuiltinID;
    static readonly USIZE_PARSE_WITH_BASE: BuiltinID;
    static readonly USIZE_GET_MIN_VALUE: BuiltinID;
    static readonly USIZE_GET_MAX_VALUE: BuiltinID;
    static readonly USIZE_COUNT_LOW_ZEROES: BuiltinID;
    static readonly USIZE_COUNT_HIGH_ZEROES: BuiltinID;
    static readonly USIZE_COUNT_LOW_ONES: BuiltinID;
    static readonly USIZE_COUNT_HIGH_ONES: BuiltinID;
    static readonly USIZE_HIGHEST_ONE_BIT: BuiltinID;
    static readonly USIZE_LOWEST_ONE_BIT: BuiltinID;
    static readonly USIZE_HIGHEST_ZERO_BIT: BuiltinID;
    static readonly USIZE_LOWEST_ZERO_BIT: BuiltinID;
    static readonly USIZE_BIT_COUNT: BuiltinID;
    static readonly USIZE_BITS: BuiltinID;
    static readonly FLOAT_NEG: BuiltinID;
    static readonly FLOAT_INC: BuiltinID;
    static readonly FLOAT_DEC: BuiltinID;
    static readonly FLOAT_ADD_FLOAT: BuiltinID;
    static readonly FLOAT_SUB_FLOAT: BuiltinID;
    static readonly FLOAT_MUL_FLOAT: BuiltinID;
    static readonly FLOAT_DIV_FLOAT: BuiltinID;
    static readonly FLOAT_MOD_FLOAT: BuiltinID;
    static readonly FLOAT_COMPARE: BuiltinID;
    static readonly FLOAT_TO_BYTE: BuiltinID;
    static readonly FLOAT_TO_SBYTE: BuiltinID;
    static readonly FLOAT_TO_SHORT: BuiltinID;
    static readonly FLOAT_TO_USHORT: BuiltinID;
    static readonly FLOAT_TO_INT: BuiltinID;
    static readonly FLOAT_TO_UINT: BuiltinID;
    static readonly FLOAT_TO_LONG: BuiltinID;
    static readonly FLOAT_TO_ULONG: BuiltinID;
    static readonly FLOAT_TO_USIZE: BuiltinID;
    static readonly FLOAT_TO_DOUBLE: BuiltinID;
    static readonly FLOAT_TO_STRING: BuiltinID;
    static readonly FLOAT_BITS: BuiltinID;
    static readonly FLOAT_FROM_BITS: BuiltinID;
    static readonly FLOAT_PARSE: BuiltinID;
    static readonly FLOAT_GET_MIN_VALUE: BuiltinID;
    static readonly FLOAT_GET_MAX_VALUE: BuiltinID;
    static readonly DOUBLE_NEG: BuiltinID;
    static readonly DOUBLE_INC: BuiltinID;
    static readonly DOUBLE_DEC: BuiltinID;
    static readonly DOUBLE_ADD_DOUBLE: BuiltinID;
    static readonly DOUBLE_SUB_DOUBLE: BuiltinID;
    static readonly DOUBLE_MUL_DOUBLE: BuiltinID;
    static readonly DOUBLE_DIV_DOUBLE: BuiltinID;
    static readonly DOUBLE_MOD_DOUBLE: BuiltinID;
    static readonly DOUBLE_COMPARE: BuiltinID;
    static readonly DOUBLE_TO_BYTE: BuiltinID;
    static readonly DOUBLE_TO_SBYTE: BuiltinID;
    static readonly DOUBLE_TO_SHORT: BuiltinID;
    static readonly DOUBLE_TO_USHORT: BuiltinID;
    static readonly DOUBLE_TO_INT: BuiltinID;
    static readonly DOUBLE_TO_UINT: BuiltinID;
    static readonly DOUBLE_TO_LONG: BuiltinID;
    static readonly DOUBLE_TO_ULONG: BuiltinID;
    static readonly DOUBLE_TO_USIZE: BuiltinID;
    static readonly DOUBLE_TO_FLOAT: BuiltinID;
    static readonly DOUBLE_TO_STRING: BuiltinID;
    static readonly DOUBLE_BITS: BuiltinID;
    static readonly DOUBLE_FROM_BITS: BuiltinID;
    static readonly DOUBLE_PARSE: BuiltinID;
    static readonly DOUBLE_GET_MIN_VALUE: BuiltinID;
    static readonly DOUBLE_GET_MAX_VALUE: BuiltinID;
    static readonly CHAR_ADD_INT: BuiltinID;
    static readonly CHAR_SUB_INT: BuiltinID;
    static readonly CHAR_SUB_CHAR: BuiltinID;
    static readonly CHAR_COMPARE: BuiltinID;
    static readonly CHAR_TO_BYTE: BuiltinID;
    static readonly CHAR_TO_SBYTE: BuiltinID;
    static readonly CHAR_TO_SHORT: BuiltinID;
    static readonly CHAR_TO_USHORT: BuiltinID;
    static readonly CHAR_TO_INT: BuiltinID;
    static readonly CHAR_TO_UINT: BuiltinID;
    static readonly CHAR_TO_LONG: BuiltinID;
    static readonly CHAR_TO_ULONG: BuiltinID;
    static readonly CHAR_TO_USIZE: BuiltinID;
    static readonly CHAR_TO_STRING: BuiltinID;
    static readonly CHAR_GET_MIN_VALUE: BuiltinID;
    static readonly CHAR_GET_MAX_VALUE: BuiltinID;
    static readonly CHAR_REMOVE_DIACRITICS: BuiltinID;
    static readonly CHAR_TO_LOWER_CASE: BuiltinID;
    static readonly CHAR_TO_UPPER_CASE: BuiltinID;
    static readonly STRING_CONSTRUCTOR_CHARACTERS: BuiltinID;
    static readonly STRING_ADD_STRING: BuiltinID;
    static readonly STRING_COMPARE: BuiltinID;
    static readonly STRING_LENGTH: BuiltinID;
    static readonly STRING_INDEXGET: BuiltinID;
    static readonly STRING_RANGEGET: BuiltinID;
    static readonly STRING_CHARACTERS: BuiltinID;
    static readonly STRING_ISEMPTY: BuiltinID;
    static readonly STRING_REMOVE_DIACRITICS: BuiltinID;
    static readonly STRING_TRIM: BuiltinID;
    static readonly STRING_TO_LOWER_CASE: BuiltinID;
    static readonly STRING_TO_UPPER_CASE: BuiltinID;
    static readonly STRING_CONTAINS_CHAR: BuiltinID;
    static readonly STRING_CONTAINS_STRING: BuiltinID;
    static readonly ASSOC_CONSTRUCTOR: BuiltinID;
    static readonly ASSOC_INDEXGET: BuiltinID;
    static readonly ASSOC_INDEXSET: BuiltinID;
    static readonly ASSOC_CONTAINS: BuiltinID;
    static readonly ASSOC_GETORDEFAULT: BuiltinID;
    static readonly ASSOC_SIZE: BuiltinID;
    static readonly ASSOC_ISEMPTY: BuiltinID;
    static readonly ASSOC_KEYS: BuiltinID;
    static readonly ASSOC_VALUES: BuiltinID;
    static readonly ASSOC_HASHCODE: BuiltinID;
    static readonly ASSOC_EQUALS: BuiltinID;
    static readonly ASSOC_NOTEQUALS: BuiltinID;
    static readonly ASSOC_SAME: BuiltinID;
    static readonly ASSOC_NOTSAME: BuiltinID;
    static readonly GENERICMAP_CONSTRUCTOR: BuiltinID;
    static readonly GENERICMAP_GETOPTIONAL: BuiltinID;
    static readonly GENERICMAP_PUT: BuiltinID;
    static readonly GENERICMAP_CONTAINS: BuiltinID;
    static readonly GENERICMAP_ADDALL: BuiltinID;
    static readonly GENERICMAP_SIZE: BuiltinID;
    static readonly GENERICMAP_ISEMPTY: BuiltinID;
    static readonly GENERICMAP_HASHCODE: BuiltinID;
    static readonly GENERICMAP_EQUALS: BuiltinID;
    static readonly GENERICMAP_NOTEQUALS: BuiltinID;
    static readonly GENERICMAP_SAME: BuiltinID;
    static readonly GENERICMAP_NOTSAME: BuiltinID;
    static readonly ARRAY_CONSTRUCTOR_SIZED: BuiltinID;
    static readonly ARRAY_CONSTRUCTOR_INITIAL_VALUE: BuiltinID;
    static readonly ARRAY_CONSTRUCTOR_LAMBDA: BuiltinID;
    static readonly ARRAY_CONSTRUCTOR_PROJECTED: BuiltinID;
    static readonly ARRAY_CONSTRUCTOR_PROJECTED_INDEXED: BuiltinID;
    static readonly ARRAY_INDEXGET: BuiltinID;
    static readonly ARRAY_INDEXSET: BuiltinID;
    static readonly ARRAY_INDEXGETRANGE: BuiltinID;
    static readonly ARRAY_CONTAINS: BuiltinID;
    static readonly ARRAY_LENGTH: BuiltinID;
    static readonly ARRAY_ISEMPTY: BuiltinID;
    static readonly ARRAY_HASHCODE: BuiltinID;
    static readonly ARRAY_EQUALS: BuiltinID;
    static readonly ARRAY_NOTEQUALS: BuiltinID;
    static readonly ARRAY_SAME: BuiltinID;
    static readonly ARRAY_NOTSAME: BuiltinID;
    static readonly SBYTE_ARRAY_AS_BYTE_ARRAY: BuiltinID;
    static readonly BYTE_ARRAY_AS_SBYTE_ARRAY: BuiltinID;
    static readonly SHORT_ARRAY_AS_USHORT_ARRAY: BuiltinID;
    static readonly USHORT_ARRAY_AS_SHORT_ARRAY: BuiltinID;
    static readonly INT_ARRAY_AS_UINT_ARRAY: BuiltinID;
    static readonly UINT_ARRAY_AS_INT_ARRAY: BuiltinID;
    static readonly LONG_ARRAY_AS_ULONG_ARRAY: BuiltinID;
    static readonly ULONG_ARRAY_AS_LONG_ARRAY: BuiltinID;
    static readonly FUNCTION_CALL: BuiltinID;
    static readonly FUNCTION_SAME: BuiltinID;
    static readonly FUNCTION_NOTSAME: BuiltinID;
    static readonly CLASS_DEFAULT_CONSTRUCTOR: BuiltinID;
    static readonly STRUCT_EMPTY_CONSTRUCTOR: BuiltinID;
    static readonly STRUCT_VALUE_CONSTRUCTOR: BuiltinID;
    static readonly ENUM_EMPTY_CONSTRUCTOR: BuiltinID;
    static readonly ENUM_NAME: BuiltinID;
    static readonly ENUM_ORDINAL: BuiltinID;
    static readonly ENUM_VALUES: BuiltinID;
    static readonly ENUM_TO_STRING: BuiltinID;
    static readonly ENUM_COMPARE: BuiltinID;
    static readonly OBJECT_HASHCODE: BuiltinID;
    static readonly OBJECT_SAME: BuiltinID;
    static readonly OBJECT_NOTSAME: BuiltinID;
    static readonly RANGE_FROM: BuiltinID;
    static readonly RANGE_TO: BuiltinID;
    static readonly OPTIONAL_IS_NULL: BuiltinID;
    static readonly OPTIONAL_IS_NOT_NULL: BuiltinID;
    static readonly ITERATOR_INT_RANGE: BuiltinID;
    static readonly ITERATOR_ARRAY_VALUES: BuiltinID;
    static readonly ITERATOR_ARRAY_KEY_VALUES: BuiltinID;
    static readonly ITERATOR_ASSOC_KEYS: BuiltinID;
    static readonly ITERATOR_ASSOC_KEY_VALUES: BuiltinID;
    static readonly ITERATOR_STRING_CHARS: BuiltinID;
    static readonly ITERATOR_ITERABLE: BuiltinID;
    static get(ordinal: number): BuiltinID;
    static valueOf(name: string): BuiltinID;
    static values(): BuiltinID[];
  }


  class LocalMemberCache {
    constructor(registry: GlobalTypeRegistry, expansions: ExpansionDefinition[]);
    get(type: TypeID): TypeMembers;
    get expansions(): ExpansionDefinition[];
    get registry(): GlobalTypeRegistry;
  }


  class TypeMember<T extends DefinitionMemberRef = any> {
    readonly priority: TypeMemberPriority;
    readonly member: T;
    constructor(priority: TypeMemberPriority, member: T);
    resolve(other: TypeMember<T>): TypeMember<T>;
  }


  interface TypeMemberBuilder extends TypeVisitorWithContext<Void, Void, RuntimeException> {}
  class TypeMemberBuilder extends TypeVisitorWithContext<Void, Void, RuntimeException> {
    constructor(registry: GlobalTypeRegistry, members: TypeMembers, cache: LocalMemberCache);
    visitArray(context: Void, array: ArrayTypeID): Void;
    visitAssoc(context: Void, assoc: AssocTypeID): Void;
    visitBasic(context: Void, basic: BasicTypeID): Void;
    visitDefinition(context: Void, definitionType: DefinitionTypeID): Void;
    visitFunction(context: Void, functionParameter: FunctionTypeID): Void;
    visitGeneric(context: Void, generic: GenericTypeID): Void;
    visitGenericMap(context: Void, map: GenericMapTypeID): Void;
    visitInvalid(context: Void, invalid: InvalidTypeID): Void;
    visitIterator(context: Void, iterator: IteratorTypeID): Void;
    visitOptional(context: Void, modified: OptionalTypeID): Void;
    visitRange(context: Void, range: RangeTypeID): Void;
  }


  class TypeMemberGroup {
    static readonly EMPTY: TypeMemberGroup;
    readonly isStatic: boolean;
    readonly name: string;
    constructor(isStatic: boolean, name: string);
    addMethod(method: FunctionalMemberRef, priority: TypeMemberPriority): void;
    call(position: CodePosition, scope: TypeScope, target: Expression, arguments: CallArguments, allowStaticUsage: boolean): Expression;
    callPostfix(position: CodePosition, scope: TypeScope, target: Expression): Expression;
    callStatic(position: CodePosition, target: TypeID, scope: TypeScope, arguments: CallArguments): Expression;
    callWithComparator(position: CodePosition, scope: TypeScope, target: Expression, arguments: CallArguments, compareType: CompareType): Expression;
    static forMethod(name: string, member: FunctionalMemberRef): TypeMemberGroup;
    get constant(): ConstMemberRef;
    get field(): FieldMemberRef;
    get methodMembers(): TypeMember<FunctionalMemberRef>[];
    get unaryMethod(): FunctionalMemberRef;
    getGetter(): GetterMemberRef;
    getMethod(header: FunctionHeader): FunctionalMemberRef;
    getOverride(position: CodePosition, scope: TypeScope, member: FunctionalMember): FunctionalMemberRef;
    getSetter(): SetterMemberRef;
    getStaticMethod(arguments: number, returnType: TypeID): FunctionalMemberRef;
    getter(position: CodePosition, scope: TypeScope, target: Expression, allowStaticUsage: boolean): Expression;
    hasMethod(header: FunctionHeader): boolean;
    hasMethods(): boolean;
    merge(other: TypeMemberGroup, priority: TypeMemberPriority): void;
    predictCallTypes(position: CodePosition, scope: TypeScope, typeHints: TypeID[], arguments: number): TypeID[];
    selectMethod(position: CodePosition, scope: TypeScope, arguments: CallArguments, allowNonStatic: boolean, allowStatic: boolean): FunctionalMemberRef;
    setConst(constant: ConstMemberRef, priority: TypeMemberPriority): void;
    setField(field: FieldMemberRef, priority: TypeMemberPriority): void;
    setGetter(getter: GetterMemberRef, priority: TypeMemberPriority): void;
    setSetter(setter: SetterMemberRef, priority: TypeMemberPriority): void;
    setter(position: CodePosition, scope: TypeScope, target: Expression, value: Expression, allowStaticUsage: boolean): Expression;
    staticGetter(position: CodePosition, scope: TypeScope): Expression;
    staticSetter(position: CodePosition, scope: TypeScope, value: Expression): Expression;
  }


  class TypeMemberPreparer {
    prepare(var1: IDefinitionMember): void;
  }


  interface TypeMemberPriority extends Enum<TypeMemberPriority> {}
  class TypeMemberPriority extends Enum<TypeMemberPriority> {
    static readonly BUILTIN_DEFAULT: TypeMemberPriority;
    static readonly FROM_TYPE_BOUNDS: TypeMemberPriority;
    static readonly INTERFACE: TypeMemberPriority;
    static readonly INHERITED: TypeMemberPriority;
    static readonly SPECIFIED: TypeMemberPriority;
    static valueOf(name: string): TypeMemberPriority;
    static values(): TypeMemberPriority[];
  }


  class TypeMembers {
    readonly type: TypeID;
    constructor(cache: LocalMemberCache, type: TypeID);
    addCaller(caller: FunctionalMemberRef, priority: TypeMemberPriority): void;
    addCaster(caster: CasterMemberRef, priority: TypeMemberPriority): void;
    addConst(member: ConstMemberRef): void;
    addConstructor(constructor: FunctionalMemberRef, priority: TypeMemberPriority): void;
    addConstructor(constructor: FunctionalMemberRef): void;
    addDestructor(destructor: FunctionalMemberRef, priority: TypeMemberPriority): void;
    addEnumMember(member: EnumConstantMember, priority: TypeMemberPriority): void;
    addField(member: FieldMemberRef, priority: TypeMemberPriority): void;
    addGetter(member: GetterMemberRef, priority: TypeMemberPriority): void;
    addImplementation(member: ImplementationMemberRef, priority: TypeMemberPriority): void;
    addInnerType(name: string, type: InnerDefinition): void;
    addIterator(iterator: IteratorMemberRef, priority: TypeMemberPriority): void;
    addMethod(name: string, member: FunctionalMemberRef, priority: TypeMemberPriority): void;
    addOperator(operator: OperatorType, member: FunctionalMemberRef): void;
    addOperator(operator: OperatorType, member: FunctionalMemberRef, priority: TypeMemberPriority): void;
    addSetter(member: SetterMemberRef, priority: TypeMemberPriority): void;
    addVariantOption(option: VariantOptionRef): void;
    borrowInterfaceMembersFromDefinition(implemented: Set<IDefinitionMember>, definitionMembers: TypeMembers): Map<DefinitionMemberRef, IDefinitionMember>;
    canCast(toType: TypeID): boolean;
    canCastImplicit(toType: TypeID): boolean;
    castExplicit(position: CodePosition, value: Expression, toType: TypeID, optional: boolean): Expression;
    castImplicit(position: CodePosition, value: Expression, toType: TypeID, implicit: boolean): Expression;
    compare(position: CodePosition, scope: TypeScope, operator: CompareType, left: Expression, right: Expression): Expression;
    copyMembersTo(other: TypeMembers, priority: TypeMemberPriority): void;
    extendsOrImplements(other: TypeID): boolean;
    extendsType(other: TypeID): boolean;
    get memberCache(): LocalMemberCache;
    get typeRegistry(): GlobalTypeRegistry;
    getBuiltin(builtin: BuiltinID): DefinitionMemberRef;
    getCaster(toType: TypeID): CasterMemberRef;
    getEnumMember(name: string): EnumConstantMember;
    getGroup(name: string): TypeMemberGroup;
    getGroup(operator: OperatorType): TypeMemberGroup;
    getImplicitCaster(toType: TypeID): CasterMemberRef;
    getInnerType(position: CodePosition, name: GenericName): DefinitionTypeID;
    getIterator(variables: number): IteratorMemberRef;
    getLoopTypes(variables: number): TypeID[];
    getMemberExpression(position: CodePosition, scope: TypeScope, target: Expression, name: GenericName, allowStatic: boolean): IPartialExpression;
    getOrCreateGroup(name: string, isStatic: boolean): TypeMemberGroup;
    getOrCreateGroup(operator: OperatorType): TypeMemberGroup;
    getStaticMemberExpression(position: CodePosition, scope: TypeScope, name: GenericName): IPartialExpression;
    getUnimplementedMembers(implemented: Set<IDefinitionMember>): IDefinitionMember[];
    getVariantOption(name: string): VariantOptionRef;
    hasInnerType(name: string): boolean;
    hasMember(name: string): boolean;
    hasOperator(operator: OperatorType): boolean;
    toString(): string;
    unary(position: CodePosition, scope: TypeScope, operator: OperatorType, value: Expression): Expression;
    union(other: TypeID): TypeID;
  }

}

declare module 'org.openzen.zenscript.codemodel.type.TypeMatcher' {
  import { LocalMemberCache } from 'org.openzen.zenscript.codemodel.type.member';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { Map } from 'java.util';

  class Matching {
    readonly cache: LocalMemberCache;
    readonly type: TypeID;
    readonly mapping: Map;
    constructor(cache: LocalMemberCache, type: TypeID);
    withType(type: TypeID): Matching;
  }

}

declare module 'org.openzen.zenscript.formatter' {
  import { DefinitionVisitor, ClassDefinition, InterfaceDefinition, EnumDefinition, StructDefinition, FunctionDefinition, ExpansionDefinition, AliasDefinition, VariantDefinition, ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { Void, StringBuilder, Enum } from 'java.lang';
  import { ExpressionVisitor, AndAndExpression, ArrayExpression, CompareExpression, CallExpression, CallStaticExpression, CapturedClosureExpression, CapturedDirectExpression, CapturedLocalVariableExpression, CapturedParameterExpression, CapturedThisExpression, CastExpression, CheckNullExpression, CoalesceExpression, ConditionalExpression, ConstExpression, ConstantBoolExpression, ConstantByteExpression, ConstantCharExpression, ConstantDoubleExpression, ConstantFloatExpression, ConstantIntExpression, ConstantLongExpression, ConstantSByteExpression, ConstantShortExpression, ConstantUSizeExpression, ConstantStringExpression, ConstantUIntExpression, ConstantULongExpression, ConstantUShortExpression, ConstructorThisCallExpression, ConstructorSuperCallExpression, EnumConstantExpression, FunctionExpression, GetFieldExpression, GetFunctionParameterExpression, GetLocalVariableExpression, GetMatchingVariantField, GetStaticFieldExpression, GetterExpression, GlobalExpression, GlobalCallExpression, InterfaceCastExpression, IsExpression, MakeConstExpression, MapExpression, MatchExpression, NewExpression, NullExpression, OrOrExpression, PanicExpression, Expression, PostCallExpression, RangeExpression, SameObjectExpression, SetFieldExpression, SetFunctionParameterExpression, SetLocalVariableExpression, SetStaticFieldExpression, SetterExpression, StaticGetterExpression, StaticSetterExpression, SupertypeCastExpression, SubtypeCastExpression, ThisExpression, ThrowExpression, TryConvertExpression, TryRethrowAsExceptionExpression, TryRethrowAsResultExpression, VariantValueExpression, WrapOptionalExpression, CallArguments } from 'org.openzen.zenscript.codemodel.expression';
  import { ExpressionString, FormattingSettings, Importer } from 'org.openzen.zenscript.formattershared';
  import { ScriptBlock, HighLevelDefinition, FunctionHeader, CompareType } from 'org.openzen.zenscript.codemodel';
  import { List } from 'java.util';
  import { TypeParameter, GenericParameterBoundVisitor, ParameterSuperBound, ParameterTypeBound } from 'org.openzen.zenscript.codemodel.generic';
  import { Statement, StatementVisitor, BlockStatement, BreakStatement, ContinueStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, ForeachStatement, IfStatement, LockStatement, ReturnStatement, SwitchStatement, ThrowStatement, TryCatchStatement, VarStatement, WhileStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { MemberVisitor, ConstMember, FieldMember, ConstructorMember, DestructorMember, MethodMember, GetterMember, SetterMember, OperatorMember, CasterMember, IteratorMember, CallerMember, ImplementationMember, InnerDefinitionMember, StaticInitializerMember } from 'org.openzen.zenscript.codemodel.member';
  import { SwitchValueVisitor, IntSwitchValue, CharSwitchValue, StringSwitchValue, EnumConstantSwitchValue, VariantOptionSwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { TypeVisitor, TypeID, BasicTypeID, ArrayTypeID, AssocTypeID, IteratorTypeID, FunctionTypeID, DefinitionTypeID, GenericTypeID, RangeTypeID, OptionalTypeID, GenericMapTypeID } from 'org.openzen.zenscript.codemodel.type';

  class CommentFormatter {
    static format(commentLines: string[]): string[];
  }


  interface DefinitionFormatter extends DefinitionVisitor<Void> {}
  class DefinitionFormatter extends DefinitionVisitor<Void> {
    constructor(settings: ScriptFormattingSettings, typeFormatter: TypeFormatter, indent: string);
    toString(): string;
    visitAlias(definition: AliasDefinition): Void;
    visitClass(definition: ClassDefinition): Void;
    visitEnum(definition: EnumDefinition): Void;
    visitExpansion(definition: ExpansionDefinition): Void;
    visitFunction(definition: FunctionDefinition): Void;
    visitInterface(definition: InterfaceDefinition): Void;
    visitStruct(definition: StructDefinition): Void;
    visitVariant(variant: VariantDefinition): Void;
  }


  interface ExpressionFormatter extends ExpressionVisitor<ExpressionString> {}
  class ExpressionFormatter extends ExpressionVisitor<ExpressionString> {
    readonly typeFormatter: TypeFormatter;
    readonly indent: string;
    constructor(settings: ScriptFormattingSettings, typeFormatter: TypeFormatter, indent: string);
    visitAndAnd(expression: AndAndExpression): ExpressionString;
    visitArray(expression: ArrayExpression): ExpressionString;
    visitCall(expression: CallExpression): ExpressionString;
    visitCallStatic(expression: CallStaticExpression): ExpressionString;
    visitCapturedClosure(expression: CapturedClosureExpression): ExpressionString;
    visitCapturedDirect(expression: CapturedDirectExpression): ExpressionString;
    visitCapturedLocalVariable(expression: CapturedLocalVariableExpression): ExpressionString;
    visitCapturedParameter(expression: CapturedParameterExpression): ExpressionString;
    visitCapturedThis(expression: CapturedThisExpression): ExpressionString;
    visitCast(expression: CastExpression): ExpressionString;
    visitCheckNull(expression: CheckNullExpression): ExpressionString;
    visitCoalesce(expression: CoalesceExpression): ExpressionString;
    visitCompare(expression: CompareExpression): ExpressionString;
    visitConditional(expression: ConditionalExpression): ExpressionString;
    visitConst(expression: ConstExpression): ExpressionString;
    visitConstantBool(expression: ConstantBoolExpression): ExpressionString;
    visitConstantByte(expression: ConstantByteExpression): ExpressionString;
    visitConstantChar(expression: ConstantCharExpression): ExpressionString;
    visitConstantDouble(expression: ConstantDoubleExpression): ExpressionString;
    visitConstantFloat(expression: ConstantFloatExpression): ExpressionString;
    visitConstantInt(expression: ConstantIntExpression): ExpressionString;
    visitConstantLong(expression: ConstantLongExpression): ExpressionString;
    visitConstantSByte(expression: ConstantSByteExpression): ExpressionString;
    visitConstantShort(expression: ConstantShortExpression): ExpressionString;
    visitConstantString(expression: ConstantStringExpression): ExpressionString;
    visitConstantUInt(expression: ConstantUIntExpression): ExpressionString;
    visitConstantULong(expression: ConstantULongExpression): ExpressionString;
    visitConstantUShort(expression: ConstantUShortExpression): ExpressionString;
    visitConstantUSize(expression: ConstantUSizeExpression): ExpressionString;
    visitConstructorSuperCall(expression: ConstructorSuperCallExpression): ExpressionString;
    visitConstructorThisCall(expression: ConstructorThisCallExpression): ExpressionString;
    visitEnumConstant(expression: EnumConstantExpression): ExpressionString;
    visitFunction(expression: FunctionExpression): ExpressionString;
    visitGetField(expression: GetFieldExpression): ExpressionString;
    visitGetFunctionParameter(expression: GetFunctionParameterExpression): ExpressionString;
    visitGetLocalVariable(expression: GetLocalVariableExpression): ExpressionString;
    visitGetMatchingVariantField(expression: GetMatchingVariantField): ExpressionString;
    visitGetStaticField(expression: GetStaticFieldExpression): ExpressionString;
    visitGetter(expression: GetterExpression): ExpressionString;
    visitGlobal(expression: GlobalExpression): ExpressionString;
    visitGlobalCall(expression: GlobalCallExpression): ExpressionString;
    visitInterfaceCast(expression: InterfaceCastExpression): ExpressionString;
    visitIs(expression: IsExpression): ExpressionString;
    visitMakeConst(expression: MakeConstExpression): ExpressionString;
    visitMap(expression: MapExpression): ExpressionString;
    visitMatch(expression: MatchExpression): ExpressionString;
    visitNew(expression: NewExpression): ExpressionString;
    visitNull(expression: NullExpression): ExpressionString;
    visitOrOr(expression: OrOrExpression): ExpressionString;
    visitPanic(expression: PanicExpression): ExpressionString;
    visitPlatformSpecific(expression: Expression): ExpressionString;
    visitPostCall(expression: PostCallExpression): ExpressionString;
    visitRange(expression: RangeExpression): ExpressionString;
    visitSameObject(expression: SameObjectExpression): ExpressionString;
    visitSetField(expression: SetFieldExpression): ExpressionString;
    visitSetFunctionParameter(expression: SetFunctionParameterExpression): ExpressionString;
    visitSetLocalVariable(expression: SetLocalVariableExpression): ExpressionString;
    visitSetStaticField(expression: SetStaticFieldExpression): ExpressionString;
    visitSetter(expression: SetterExpression): ExpressionString;
    visitStaticGetter(expression: StaticGetterExpression): ExpressionString;
    visitStaticSetter(expression: StaticSetterExpression): ExpressionString;
    visitSubtypeCast(expression: SubtypeCastExpression): ExpressionString;
    visitSupertypeCast(expression: SupertypeCastExpression): ExpressionString;
    visitThis(expression: ThisExpression): ExpressionString;
    visitThrow(expression: ThrowExpression): ExpressionString;
    visitTryConvert(expression: TryConvertExpression): ExpressionString;
    visitTryRethrowAsException(expression: TryRethrowAsExceptionExpression): ExpressionString;
    visitTryRethrowAsResult(expression: TryRethrowAsResultExpression): ExpressionString;
    visitVariantValue(expression: VariantValueExpression): ExpressionString;
    visitWrapOptional(expression: WrapOptionalExpression): ExpressionString;
  }


  class FileFormatter {
    constructor(settings: ScriptFormattingSettings);
    format(pkg: ZSPackage, script: ScriptBlock, definitions: HighLevelDefinition[]): string;
  }


  class FormattingUtils {
    static formatBody(output: StringBuilder, settings: ScriptFormattingSettings, indent: string, typeFormatter: TypeFormatter, body: Statement): void;
    static formatCall(result: StringBuilder, typeFormatter: TypeFormatter, expressionFormatter: ExpressionFormatter, arguments: CallArguments): void;
    static formatHeader(result: StringBuilder, settings: ScriptFormattingSettings, header: FunctionHeader, typeFormatter: TypeFormatter): void;
    static formatModifiers(output: StringBuilder, modifiers: number): void;
    static formatTypeParameters(result: StringBuilder, parameters: TypeParameter[], typeFormatter: TypeFormatter): void;
  }


  interface MemberFormatter extends MemberVisitor<Void> {}
  class MemberFormatter extends MemberVisitor<Void> {
    constructor(settings: ScriptFormattingSettings, output: StringBuilder, indent: string, typeFormatter: TypeFormatter);
    visitCaller(member: CallerMember): Void;
    visitCaster(member: CasterMember): Void;
    visitConst(member: ConstMember): Void;
    visitConstructor(member: ConstructorMember): Void;
    visitCustomIterator(member: IteratorMember): Void;
    visitDestructor(member: DestructorMember): Void;
    visitField(member: FieldMember): Void;
    visitGetter(member: GetterMember): Void;
    visitImplementation(implementation: ImplementationMember): Void;
    visitInnerDefinition(member: InnerDefinitionMember): Void;
    visitMethod(member: MethodMember): Void;
    visitOperator(member: OperatorMember): Void;
    visitSetter(member: SetterMember): Void;
    visitStaticInitializer(member: StaticInitializerMember): Void;
  }


  interface ParentStatementType extends Enum<ParentStatementType> {}
  class ParentStatementType extends Enum<ParentStatementType> {
    static readonly NONE: ParentStatementType;
    static readonly IF: ParentStatementType;
    static readonly IF_WITH_ELSE: ParentStatementType;
    static readonly ELSE: ParentStatementType;
    static readonly LOOP: ParentStatementType;
    static readonly TRY: ParentStatementType;
    static readonly CATCH: ParentStatementType;
    static readonly FINALLY: ParentStatementType;
    static valueOf(name: string): ParentStatementType;
    static values(): ParentStatementType[];
  }


  interface ScriptFormattingSettings extends FormattingSettings {}
  class ScriptFormattingSettings extends FormattingSettings {
    readonly showAnyInFunctionHeaders: boolean;
    readonly useSingleQuotesForStrings: boolean;
    readonly spaceBeforeLabelColon: boolean;
    readonly spaceAfterLabelColon: boolean;
    readonly bracketsAroundConditions: boolean;
    readonly ifElseForceBrackets: boolean;
    readonly ifElseAvoidBrackets: boolean;
    readonly loopForceBrackets: boolean;
    readonly loopAvoidBrackets: boolean;
    readonly tryCatchForceBrackets: boolean;
    readonly tryCatchAvoidBrackets: boolean;
    readonly ifSingleLineOnSameLine: boolean;
    readonly elseSingleLineOnSameLine: boolean;
    readonly loopSingleLineOnSameLine: boolean;
    readonly ifBracketOnSameLine: boolean;
    readonly elseBracketOnSameLine: boolean;
    readonly loopBracketOnSameLine: boolean;
    readonly tryCatchNewLine: boolean;
    readonly tryCatchBracketOnSameLine: boolean;
    readonly classBracketOnSameLine: boolean;
    readonly functionBracketOnSameLine: boolean;
    readonly lambdaMethodOnSameLine: boolean;
    getBlockSeparator(indent: string, position: ParentStatementType): string;
    getSingleLineSeparator(indent: string, position: ParentStatementType): string;
  }


  interface StatementFormatter extends StatementVisitor<Void> {}
  class StatementFormatter extends StatementVisitor<Void> {
    constructor(output: StringBuilder, indent: string, settings: ScriptFormattingSettings, expressionFormatter: ExpressionFormatter);
    toString(): string;
    visitBlock(statement: BlockStatement): Void;
    visitBreak(statement: BreakStatement): Void;
    visitContinue(statement: ContinueStatement): Void;
    visitDoWhile(statement: DoWhileStatement): Void;
    visitEmpty(statement: EmptyStatement): Void;
    visitExpression(statement: ExpressionStatement): Void;
    visitForeach(statement: ForeachStatement): Void;
    visitIf(statement: IfStatement): Void;
    visitLock(statement: LockStatement): Void;
    visitReturn(statement: ReturnStatement): Void;
    visitSwitch(statement: SwitchStatement): Void;
    visitThrow(statement: ThrowStatement): Void;
    visitTryCatch(statement: TryCatchStatement): Void;
    visitVar(statement: VarStatement): Void;
    visitWhile(statement: WhileStatement): Void;
  }


  interface SwitchValueFormatter extends SwitchValueVisitor<string> {}
  class SwitchValueFormatter extends SwitchValueVisitor<string> {
    constructor(settings: ScriptFormattingSettings);
    acceptChar(value: CharSwitchValue): string;
    acceptEnumConstant(value: EnumConstantSwitchValue): string;
    acceptInt(value: IntSwitchValue): string;
    acceptString(value: StringSwitchValue): string;
    acceptVariantOption(value: VariantOptionSwitchValue): string;
  }


  interface TypeFormatter extends TypeVisitor<string>, GenericParameterBoundVisitor<string> {}
  class TypeFormatter extends TypeVisitor<string> {
    constructor(settings: ScriptFormattingSettings, importer: Importer);
    format(type: TypeID): string;
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(type: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
    visitSuper(bound: ParameterSuperBound): string;
    visitType(bound: ParameterTypeBound): string;
  }


  interface ZenScriptOperator extends Enum<ZenScriptOperator> {}
  class ZenScriptOperator extends Enum<ZenScriptOperator> {
    static readonly ADD: ZenScriptOperator;
    static readonly SUB: ZenScriptOperator;
    static readonly MUL: ZenScriptOperator;
    static readonly DIV: ZenScriptOperator;
    static readonly MOD: ZenScriptOperator;
    static readonly CAT: ZenScriptOperator;
    static readonly OR: ZenScriptOperator;
    static readonly AND: ZenScriptOperator;
    static readonly XOR: ZenScriptOperator;
    static readonly NEG: ZenScriptOperator;
    static readonly NOT: ZenScriptOperator;
    static readonly INVERT: ZenScriptOperator;
    static readonly CONTAINS: ZenScriptOperator;
    static readonly EQUALS: ZenScriptOperator;
    static readonly NOTEQUALS: ZenScriptOperator;
    static readonly GREATER: ZenScriptOperator;
    static readonly LESS: ZenScriptOperator;
    static readonly GREATER_EQUALS: ZenScriptOperator;
    static readonly LESS_EQUALS: ZenScriptOperator;
    static readonly IS: ZenScriptOperator;
    static readonly SAME: ZenScriptOperator;
    static readonly NOTSAME: ZenScriptOperator;
    static readonly ASSIGN: ZenScriptOperator;
    static readonly ADDASSIGN: ZenScriptOperator;
    static readonly SUBASSIGN: ZenScriptOperator;
    static readonly MULASSIGN: ZenScriptOperator;
    static readonly DIVASSIGN: ZenScriptOperator;
    static readonly MODASSIGN: ZenScriptOperator;
    static readonly CATASSIGN: ZenScriptOperator;
    static readonly ORASSIGN: ZenScriptOperator;
    static readonly ANDASSIGN: ZenScriptOperator;
    static readonly XORASSIGN: ZenScriptOperator;
    static readonly ANDAND: ZenScriptOperator;
    static readonly OROR: ZenScriptOperator;
    static readonly TERNARY: ZenScriptOperator;
    static readonly COALESCE: ZenScriptOperator;
    static readonly INCREMENT: ZenScriptOperator;
    static readonly DECREMENT: ZenScriptOperator;
    static readonly MEMBER: ZenScriptOperator;
    static readonly RANGE: ZenScriptOperator;
    static readonly INDEX: ZenScriptOperator;
    static readonly CALL: ZenScriptOperator;
    static readonly CAST: ZenScriptOperator;
    static readonly PANIC: ZenScriptOperator;
    static readonly PRIMARY: ZenScriptOperator;
    static readonly FUNCTION: ZenScriptOperator;
    get operatorString(): string;
    get priority(): number;
    static getComparison(compare: CompareType): ZenScriptOperator;
    static valueOf(name: string): ZenScriptOperator;
    static values(): ZenScriptOperator[];
  }

}

declare module 'org.openzen.zenscript.formatter.ScriptFormattingSettings' {
  import { Builder as org_openzen_zenscript_formattershared_formattingsettings_Builder } from 'org.openzen.zenscript.formattershared.FormattingSettings';
  import { ScriptFormattingSettings } from 'org.openzen.zenscript.formatter';

  interface Builder extends org_openzen_zenscript_formattershared_formattingsettings_Builder<Builder> {}
  class Builder extends org_openzen_zenscript_formattershared_formattingsettings_Builder<Builder> {
    constructor();
    bracketsAroundConditions(brackets: boolean): Builder;
    build(): ScriptFormattingSettings;
    classBracketOnSameLine(sameLine: boolean): Builder;
    elseBracketOnSameLine(sameLine: boolean): Builder;
    elseSingleLineOnSameLine(sameLine: boolean): Builder;
    functionBracketOnSameLine(sameLine: boolean): Builder;
    ifBracketOnSameLine(sameLine: boolean): Builder;
    ifElseAvoidBrackets(avoid: boolean): Builder;
    ifElseForceBrackets(force: boolean): Builder;
    ifSingleLineOnSameLine(sameLine: boolean): Builder;
    lambdaMethodOnSameLine(sameLine: boolean): Builder;
    loopAvoidBrackets(avoid: boolean): Builder;
    loopBracketOnSameLine(sameLine: boolean): Builder;
    loopForceBrackets(force: boolean): Builder;
    loopSingleLineOnSameLine(sameLine: boolean): Builder;
    showAnyInFunctionHeaders(show: boolean): Builder;
    spaceAfterLabelColon(space: boolean): Builder;
    spaceBeforeLabelColon(space: boolean): Builder;
    tryCatchAvoidBrackets(avoid: boolean): Builder;
    tryCatchBracketOnSameLine(sameLine: boolean): Builder;
    tryCatchForceBrackets(force: boolean): Builder;
    tryCatchNewLine(newLine: boolean): Builder;
    useSingleQuotesForStrings(single: boolean): Builder;
  }

}

declare module 'org.openzen.zenscript.formattershared' {
  import { HighLevelDefinition } from 'org.openzen.zenscript.codemodel';
  import { StatementVisitor, LoopStatement, BlockStatement, BreakStatement, ContinueStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, ForeachStatement, IfStatement, LockStatement, ReturnStatement, SwitchStatement, ThrowStatement, TryCatchStatement, VarStatement, WhileStatement, Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { Void, StringBuilder } from 'java.lang';
  import { Formatter } from 'org.openzen.zenscript.formattershared.StatementFormatter';
  import { List } from 'java.util';

  class CommentFormatter {
    format(var1: string[]): string[];
  }


  class ExpressionString {
    readonly value: string;
    readonly priority: FormattableOperator;
    constructor(value: string, priority: FormattableOperator);
    static binary(left: ExpressionString, right: ExpressionString, operator: FormattableOperator): ExpressionString;
    toString(): string;
    unaryPostfix(operator: FormattableOperator): ExpressionString;
    unaryPostfix(operator: FormattableOperator, operatorString: string): ExpressionString;
    unaryPrefix(operator: FormattableOperator): ExpressionString;
    unaryPrefix(operator: FormattableOperator, operatorString: string): ExpressionString;
    wrapLeft(outer: FormattableOperator): string;
    wrapRight(outer: FormattableOperator): string;
  }


  class FormattableOperator {
    get operatorString(): string;
    get priority(): number;
    static shouldWrapLeft(inner: FormattableOperator, outer: FormattableOperator): boolean;
    static shouldWrapRight(inner: FormattableOperator, outer: FormattableOperator): boolean;
  }


  class FormattingSettings {
    readonly useTabs: boolean;
    readonly spacesPerTab: number;
    readonly indent: string;
    readonly commentFormatter: CommentFormatter;
  }


  class Importer {
    importDefinition(var1: HighLevelDefinition): string;
  }


  interface StatementFormatter extends StatementVisitor<Void>, StatementFormattingTarget {}
  class StatementFormatter extends StatementVisitor<Void> {
    constructor(output: StringBuilder, settings: FormattingSettings, formatter: Formatter, indent: string, innerLoop: LoopStatement);
    get indent(): string;
    get innerLoop(): LoopStatement;
    visitBlock(statement: BlockStatement): Void;
    visitBreak(statement: BreakStatement): Void;
    visitContinue(statement: ContinueStatement): Void;
    visitDoWhile(statement: DoWhileStatement): Void;
    visitEmpty(statement: EmptyStatement): Void;
    visitExpression(statement: ExpressionStatement): Void;
    visitForeach(statement: ForeachStatement): Void;
    visitIf(statement: IfStatement): Void;
    visitLock(statement: LockStatement): Void;
    visitReturn(statement: ReturnStatement): Void;
    visitSwitch(statement: SwitchStatement): Void;
    visitThrow(statement: ThrowStatement): Void;
    visitTryCatch(statement: TryCatchStatement): Void;
    visitVar(statement: VarStatement): Void;
    visitWhile(statement: WhileStatement): Void;
    writeBlock(lineBefore: string, contents: BlockStatement, lineAfter: string): void;
    writeInner(lineBefore: string, contents: Statement, loop: LoopStatement, lineAfter: string): void;
    writeInner(lineBefore: string, inlineContents: string[], contents: Statement, loop: LoopStatement, lineAfter: string): void;
    writeInnerMulti(lineBefore: string, contents: StatementFormattingSubBlock[], loop: LoopStatement, lineAfter: string): void;
    writeLine(line: string): void;
  }


  class StatementFormattingSubBlock {
    readonly header: string;
    readonly literalStatements: List;
    readonly statements: Statement[];
    constructor(header: string, literalStatements: string[], statements: Statement[]);
  }


  class StatementFormattingTarget {
    get indent(): string;
    get innerLoop(): LoopStatement;
    writeBlock(var1: string, var2: BlockStatement, var3: string): void;
    writeInner(var1: string, var2: Statement, var3: LoopStatement, var4: string): void;
    writeInner(var1: string, var2: string[], var3: Statement, var4: LoopStatement, var5: string): void;
    writeInnerMulti(var1: string, var2: StatementFormattingSubBlock[], var3: LoopStatement, var4: string): void;
    writeLine(var1: string): void;
  }

}

declare module 'org.openzen.zenscript.formattershared.FormattingSettings' {
  import { CommentFormatter, FormattingSettings } from 'org.openzen.zenscript.formattershared';

  class Builder<T extends Builder<T> = any> {
    constructor(commentFormatter: CommentFormatter);
    build(): FormattingSettings;
    spacesPerTabs(spaces: number): T;
    useTabs(tabs: boolean): T;
  }

}

declare module 'org.openzen.zenscript.formattershared.StatementFormatter' {
  import { LoopStatement, BlockStatement, BreakStatement, ContinueStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, ForeachStatement, IfStatement, LockStatement, ReturnStatement, SwitchStatement, ThrowStatement, TryCatchStatement, VarStatement, WhileStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { StatementFormattingTarget } from 'org.openzen.zenscript.formattershared';

  class Formatter {
    forLoop(var1: LoopStatement): Formatter;
    formatBlock(var1: StatementFormattingTarget, var2: BlockStatement): void;
    formatBreak(var1: StatementFormattingTarget, var2: BreakStatement): void;
    formatContinue(var1: StatementFormattingTarget, var2: ContinueStatement): void;
    formatDoWhile(var1: StatementFormattingTarget, var2: DoWhileStatement): void;
    formatEmpty(var1: StatementFormattingTarget, var2: EmptyStatement): void;
    formatExpression(var1: StatementFormattingTarget, var2: ExpressionStatement): void;
    formatForeach(var1: StatementFormattingTarget, var2: ForeachStatement): void;
    formatIf(var1: StatementFormattingTarget, var2: IfStatement): void;
    formatLock(var1: StatementFormattingTarget, var2: LockStatement): void;
    formatReturn(var1: StatementFormattingTarget, var2: ReturnStatement): void;
    formatSwitch(var1: StatementFormattingTarget, var2: SwitchStatement): void;
    formatThrow(var1: StatementFormattingTarget, var2: ThrowStatement): void;
    formatTryCatch(var1: StatementFormattingTarget, var2: TryCatchStatement): void;
    formatVar(var1: StatementFormattingTarget, var2: VarStatement): void;
    formatWhile(var1: StatementFormattingTarget, var2: WhileStatement): void;
  }

}

declare module 'org.openzen.zenscript.javabytecode.compiler' {
  import { TypeID, TypeVisitorWithContext, BasicTypeID, ArrayTypeID, AssocTypeID, GenericMapTypeID, IteratorTypeID, FunctionTypeID, DefinitionTypeID, GenericTypeID, RangeTypeID, OptionalTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { JavaBytecodeContext, JavaLocalVariableInfo } from 'org.openzen.zenscript.javabytecode';
  import { Type, ClassWriter, Label, ClassVisitor } from 'org.objectweb.asm';
  import { JavaCompiledModule, JavaMethod, JavaClass, JavaParameterInfo, JavaField } from 'org.openzen.zenscript.javashared';
  import { FunctionHeader, HighLevelDefinition } from 'org.openzen.zenscript.codemodel';
  import { List, Map } from 'java.util';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { SwitchValue, SwitchValueVisitor, IntSwitchValue, CharSwitchValue, StringSwitchValue, EnumConstantSwitchValue, VariantOptionSwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { Void, RuntimeException, Runnable, Boolean, Integer, Class } from 'java.lang';
  import { CapturedExpressionVisitor, ExpressionVisitor, CapturedThisExpression, CapturedParameterExpression, CapturedLocalVariableExpression, CapturedDirectExpression, CapturedClosureExpression, AndAndExpression, ArrayExpression, CompareExpression, CallExpression, CallStaticExpression, CastExpression, CheckNullExpression, CoalesceExpression, ConditionalExpression, ConstExpression, ConstantBoolExpression, ConstantByteExpression, ConstantCharExpression, ConstantDoubleExpression, ConstantFloatExpression, ConstantIntExpression, ConstantLongExpression, ConstantSByteExpression, ConstantShortExpression, ConstantStringExpression, ConstantUIntExpression, ConstantULongExpression, ConstantUShortExpression, ConstantUSizeExpression, ConstructorThisCallExpression, ConstructorSuperCallExpression, EnumConstantExpression, FunctionExpression, GetFieldExpression, GetFunctionParameterExpression, GetLocalVariableExpression, GetMatchingVariantField, GetStaticFieldExpression, GetterExpression, GlobalExpression, GlobalCallExpression, InterfaceCastExpression, IsExpression, MakeConstExpression, MapExpression, MatchExpression, NewExpression, NullExpression, OrOrExpression, PanicExpression, Expression, PostCallExpression, RangeExpression, SameObjectExpression, SetFieldExpression, SetFunctionParameterExpression, SetLocalVariableExpression, SetStaticFieldExpression, SetterExpression, StaticGetterExpression, StaticSetterExpression, SupertypeCastExpression, SubtypeCastExpression, ThisExpression, ThrowExpression, TryConvertExpression, TryRethrowAsExceptionExpression, TryRethrowAsResultExpression, VariantValueExpression, WrapOptionalExpression } from 'org.openzen.zenscript.codemodel.expression';
  import { ForeachStatement, StatementVisitor, BlockStatement, BreakStatement, ContinueStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, IfStatement, LockStatement, InvalidStatement, ReturnStatement, SwitchStatement, ThrowStatement, TryCatchStatement, VarStatement, WhileStatement, VariableID } from 'org.openzen.zenscript.codemodel.statement';
  import { PushOption } from 'org.openzen.zenscript.javabytecode.compiler.JavaModificationExpressionVisitor';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { LocalVariablesSorter } from 'org.objectweb.asm.commons';

  class ArrayHelperType {
    constructor(elementType: TypeID, context: JavaBytecodeContext);
    get aSMElementType(): Type;
    get withOneDimensionLess(): ArrayHelperType;
    newArray(javaWriter: JavaWriter): void;
  }


  class ArrayInitializerHelper {
  }


  class CompilerUtils {
    static calcAccess(modifiers: number): number;
    static getKeyForSwitch(expression: SwitchValue): number;
    static isLarge(type: TypeID): boolean;
    static isPrimitive(id: TypeID): boolean;
    static tagConstructorParameters(context: JavaBytecodeContext, module: JavaCompiledModule, definition: HighLevelDefinition, header: FunctionHeader, isEnum: boolean): void;
    static tagMethodParameters(context: JavaBytecodeContext, module: JavaCompiledModule, header: FunctionHeader, isStatic: boolean, baseTypeTypeParameters: TypeParameter[]): void;
    static writeDefaultFieldInitializers(context: JavaBytecodeContext, constructorWriter: JavaWriter, definition: HighLevelDefinition, staticFields: boolean): void;
  }


  interface JavaBoxingTypeVisitor extends TypeVisitorWithContext<TypeID, Void, RuntimeException> {}
  class JavaBoxingTypeVisitor extends TypeVisitorWithContext<TypeID, Void, RuntimeException> {
    constructor(writer: JavaWriter);
    visitArray(context: TypeID, array: ArrayTypeID): Void;
    visitAssoc(context: TypeID, assoc: AssocTypeID): Void;
    visitBasic(context: TypeID, basic: BasicTypeID): Void;
    visitDefinition(context: TypeID, definition: DefinitionTypeID): Void;
    visitFunction(context: TypeID, functionParameter: FunctionTypeID): Void;
    visitGeneric(context: TypeID, generic: GenericTypeID): Void;
    visitGenericMap(context: TypeID, map: GenericMapTypeID): Void;
    visitIterator(context: TypeID, iterator: IteratorTypeID): Void;
    visitOptional(context: TypeID, type: OptionalTypeID): Void;
    visitRange(context: TypeID, range: RangeTypeID): Void;
  }


  interface JavaCapturedExpressionVisitor extends CapturedExpressionVisitor<Void> {}
  class JavaCapturedExpressionVisitor extends CapturedExpressionVisitor<Void> {
    readonly expressionVisitor: ExpressionVisitor;
    constructor(expressionVisitor: ExpressionVisitor<Void>);
    visitCapturedDirect(expression: CapturedDirectExpression): Void;
    visitCapturedLocal(expression: CapturedLocalVariableExpression): Void;
    visitCapturedParameter(expression: CapturedParameterExpression): Void;
    visitCapturedThis(expression: CapturedThisExpression): Void;
    visitRecaptured(expression: CapturedClosureExpression): Void;
  }


  interface JavaClassWriter extends ClassWriter {}
  class JavaClassWriter extends ClassWriter {
    constructor(flags: number);
    static get super_classes(): Map<string, string>;
    static registerSuperClass(child: string, superClass: string): void;
  }


  class JavaForeachWriter {
    constructor(statementVisitor: JavaStatementVisitor, statement: ForeachStatement, start: Label, end: Label);
    visitArrayKeyValueIterator(): void;
    visitArrayValueIterator(): void;
    visitAssocKeyIterator(): void;
    visitAssocKeyValueIterator(): void;
    visitCustomIterator(): void;
    visitIntRange(type: RangeTypeID): void;
    visitIteratorIterator(targetType: Type): void;
    visitStringCharacterIterator(): void;
  }


  interface JavaModificationExpressionVisitor extends ExpressionVisitor<Void> {}
  class JavaModificationExpressionVisitor extends ExpressionVisitor<Void> {
    constructor(context: JavaBytecodeContext, module: JavaCompiledModule, javaWriter: JavaWriter, expressionVisitor: JavaExpressionVisitor, modification: Runnable, push: PushOption);
    visitAndAnd(expression: AndAndExpression): Void;
    visitArray(expression: ArrayExpression): Void;
    visitCall(expression: CallExpression): Void;
    visitCallStatic(expression: CallStaticExpression): Void;
    visitCapturedClosure(expression: CapturedClosureExpression): Void;
    visitCapturedDirect(expression: CapturedDirectExpression): Void;
    visitCapturedLocalVariable(expression: CapturedLocalVariableExpression): Void;
    visitCapturedParameter(expression: CapturedParameterExpression): Void;
    visitCapturedThis(expression: CapturedThisExpression): Void;
    visitCast(expression: CastExpression): Void;
    visitCheckNull(expression: CheckNullExpression): Void;
    visitCoalesce(expression: CoalesceExpression): Void;
    visitCompare(expression: CompareExpression): Void;
    visitConditional(expression: ConditionalExpression): Void;
    visitConst(expression: ConstExpression): Void;
    visitConstantBool(expression: ConstantBoolExpression): Void;
    visitConstantByte(expression: ConstantByteExpression): Void;
    visitConstantChar(expression: ConstantCharExpression): Void;
    visitConstantDouble(expression: ConstantDoubleExpression): Void;
    visitConstantFloat(expression: ConstantFloatExpression): Void;
    visitConstantInt(expression: ConstantIntExpression): Void;
    visitConstantLong(expression: ConstantLongExpression): Void;
    visitConstantSByte(expression: ConstantSByteExpression): Void;
    visitConstantShort(expression: ConstantShortExpression): Void;
    visitConstantString(expression: ConstantStringExpression): Void;
    visitConstantUInt(expression: ConstantUIntExpression): Void;
    visitConstantULong(expression: ConstantULongExpression): Void;
    visitConstantUShort(expression: ConstantUShortExpression): Void;
    visitConstantUSize(expression: ConstantUSizeExpression): Void;
    visitConstructorSuperCall(expression: ConstructorSuperCallExpression): Void;
    visitConstructorThisCall(expression: ConstructorThisCallExpression): Void;
    visitEnumConstant(expression: EnumConstantExpression): Void;
    visitFunction(expression: FunctionExpression): Void;
    visitGetField(expression: GetFieldExpression): Void;
    visitGetFunctionParameter(expression: GetFunctionParameterExpression): Void;
    visitGetLocalVariable(expression: GetLocalVariableExpression): Void;
    visitGetMatchingVariantField(expression: GetMatchingVariantField): Void;
    visitGetStaticField(expression: GetStaticFieldExpression): Void;
    visitGetter(expression: GetterExpression): Void;
    visitGlobal(expression: GlobalExpression): Void;
    visitGlobalCall(expression: GlobalCallExpression): Void;
    visitInterfaceCast(expression: InterfaceCastExpression): Void;
    visitIs(expression: IsExpression): Void;
    visitMakeConst(expression: MakeConstExpression): Void;
    visitMap(expression: MapExpression): Void;
    visitMatch(expression: MatchExpression): Void;
    visitNew(expression: NewExpression): Void;
    visitNull(expression: NullExpression): Void;
    visitOrOr(expression: OrOrExpression): Void;
    visitPanic(expression: PanicExpression): Void;
    visitPlatformSpecific(expression: Expression): Void;
    visitPostCall(expression: PostCallExpression): Void;
    visitRange(expression: RangeExpression): Void;
    visitSameObject(expression: SameObjectExpression): Void;
    visitSetField(expression: SetFieldExpression): Void;
    visitSetFunctionParameter(expression: SetFunctionParameterExpression): Void;
    visitSetLocalVariable(expression: SetLocalVariableExpression): Void;
    visitSetStaticField(expression: SetStaticFieldExpression): Void;
    visitSetter(expression: SetterExpression): Void;
    visitStaticGetter(expression: StaticGetterExpression): Void;
    visitStaticSetter(expression: StaticSetterExpression): Void;
    visitSubtypeCast(expression: SubtypeCastExpression): Void;
    visitSupertypeCast(expression: SupertypeCastExpression): Void;
    visitThis(expression: ThisExpression): Void;
    visitThrow(expression: ThrowExpression): Void;
    visitTryConvert(expression: TryConvertExpression): Void;
    visitTryRethrowAsException(expression: TryRethrowAsExceptionExpression): Void;
    visitTryRethrowAsResult(expression: TryRethrowAsResultExpression): Void;
    visitVariantValue(expression: VariantValueExpression): Void;
    visitWrapOptional(expression: WrapOptionalExpression): Void;
  }


  interface JavaNonPushingExpressionVisitor extends ExpressionVisitor<Void> {}
  class JavaNonPushingExpressionVisitor extends ExpressionVisitor<Void> {
    constructor(context: JavaBytecodeContext, module: JavaCompiledModule, javaWriter: JavaWriter, original: JavaExpressionVisitor);
    visitAndAnd(expression: AndAndExpression): Void;
    visitArray(expression: ArrayExpression): Void;
    visitCall(expression: CallExpression): Void;
    visitCallStatic(expression: CallStaticExpression): Void;
    visitCapturedClosure(expression: CapturedClosureExpression): Void;
    visitCapturedDirect(expression: CapturedDirectExpression): Void;
    visitCapturedLocalVariable(expression: CapturedLocalVariableExpression): Void;
    visitCapturedParameter(expression: CapturedParameterExpression): Void;
    visitCapturedThis(expression: CapturedThisExpression): Void;
    visitCast(expression: CastExpression): Void;
    visitCheckNull(expression: CheckNullExpression): Void;
    visitCoalesce(expression: CoalesceExpression): Void;
    visitCompare(expression: CompareExpression): Void;
    visitConditional(expression: ConditionalExpression): Void;
    visitConst(expression: ConstExpression): Void;
    visitConstantBool(expression: ConstantBoolExpression): Void;
    visitConstantByte(expression: ConstantByteExpression): Void;
    visitConstantChar(expression: ConstantCharExpression): Void;
    visitConstantDouble(expression: ConstantDoubleExpression): Void;
    visitConstantFloat(expression: ConstantFloatExpression): Void;
    visitConstantInt(expression: ConstantIntExpression): Void;
    visitConstantLong(expression: ConstantLongExpression): Void;
    visitConstantSByte(expression: ConstantSByteExpression): Void;
    visitConstantShort(expression: ConstantShortExpression): Void;
    visitConstantString(expression: ConstantStringExpression): Void;
    visitConstantUInt(expression: ConstantUIntExpression): Void;
    visitConstantULong(expression: ConstantULongExpression): Void;
    visitConstantUShort(expression: ConstantUShortExpression): Void;
    visitConstantUSize(expression: ConstantUSizeExpression): Void;
    visitConstructorSuperCall(expression: ConstructorSuperCallExpression): Void;
    visitConstructorThisCall(expression: ConstructorThisCallExpression): Void;
    visitEnumConstant(expression: EnumConstantExpression): Void;
    visitFunction(expression: FunctionExpression): Void;
    visitGetField(expression: GetFieldExpression): Void;
    visitGetFunctionParameter(expression: GetFunctionParameterExpression): Void;
    visitGetLocalVariable(expression: GetLocalVariableExpression): Void;
    visitGetMatchingVariantField(expression: GetMatchingVariantField): Void;
    visitGetStaticField(expression: GetStaticFieldExpression): Void;
    visitGetter(expression: GetterExpression): Void;
    visitGlobal(expression: GlobalExpression): Void;
    visitGlobalCall(expression: GlobalCallExpression): Void;
    visitInterfaceCast(expression: InterfaceCastExpression): Void;
    visitIs(expression: IsExpression): Void;
    visitMakeConst(expression: MakeConstExpression): Void;
    visitMap(expression: MapExpression): Void;
    visitMatch(expression: MatchExpression): Void;
    visitNew(expression: NewExpression): Void;
    visitNull(expression: NullExpression): Void;
    visitOrOr(expression: OrOrExpression): Void;
    visitPanic(expression: PanicExpression): Void;
    visitPlatformSpecific(expression: Expression): Void;
    visitPostCall(expression: PostCallExpression): Void;
    visitRange(expression: RangeExpression): Void;
    visitSameObject(expression: SameObjectExpression): Void;
    visitSetField(expression: SetFieldExpression): Void;
    visitSetFunctionParameter(expression: SetFunctionParameterExpression): Void;
    visitSetLocalVariable(expression: SetLocalVariableExpression): Void;
    visitSetStaticField(expression: SetStaticFieldExpression): Void;
    visitSetter(expression: SetterExpression): Void;
    visitStaticGetter(expression: StaticGetterExpression): Void;
    visitStaticSetter(expression: StaticSetterExpression): Void;
    visitSubtypeCast(expression: SubtypeCastExpression): Void;
    visitSupertypeCast(expression: SupertypeCastExpression): Void;
    visitThis(expression: ThisExpression): Void;
    visitThrow(expression: ThrowExpression): Void;
    visitTryConvert(expression: TryConvertExpression): Void;
    visitTryRethrowAsException(expression: TryRethrowAsExceptionExpression): Void;
    visitTryRethrowAsResult(expression: TryRethrowAsResultExpression): Void;
    visitVariantValue(expression: VariantValueExpression): Void;
    visitWrapOptional(expression: WrapOptionalExpression): Void;
  }


  class JavaScriptFile {
    readonly classWriter: JavaClassWriter;
    readonly scriptMethods: List;
    constructor(classWriter: JavaClassWriter);
  }


  interface JavaStatementVisitor extends StatementVisitor<boolean> {}
  class JavaStatementVisitor extends StatementVisitor<boolean> {
    readonly expressionVisitor: JavaExpressionVisitor;
    readonly nonPushingExpressionVisitor: JavaNonPushingExpressionVisitor;
    constructor(context: JavaBytecodeContext, module: JavaCompiledModule, javaWriter: JavaWriter);

    constructor(context: JavaBytecodeContext, expressionVisitor: JavaExpressionVisitor);
    end(): void;
    get javaWriter(): JavaWriter;
    start(): void;
    visitBlock(statement: BlockStatement): boolean;
    visitBreak(statement: BreakStatement): boolean;
    visitContinue(statement: ContinueStatement): boolean;
    visitDoWhile(statement: DoWhileStatement): boolean;
    visitEmpty(statement: EmptyStatement): boolean;
    visitExpression(statement: ExpressionStatement): boolean;
    visitForeach(statement: ForeachStatement): boolean;
    visitIf(statement: IfStatement): boolean;
    visitInvalid(statement: InvalidStatement): boolean;
    visitLock(statement: LockStatement): boolean;
    visitReturn(statement: ReturnStatement): boolean;
    visitSwitch(statement: SwitchStatement): boolean;
    visitThrow(statement: ThrowStatement): boolean;
    visitTryCatch(statement: TryCatchStatement): boolean;
    visitVar(statement: VarStatement): boolean;
    visitWhile(statement: WhileStatement): boolean;
  }


  interface JavaSwitchKeyVisitor extends SwitchValueVisitor<number> {}
  class JavaSwitchKeyVisitor extends SwitchValueVisitor<number> {
    static readonly INSTANCE: JavaSwitchKeyVisitor;
    acceptChar(value: CharSwitchValue): number;
    acceptEnumConstant(value: EnumConstantSwitchValue): number;
    acceptInt(value: IntSwitchValue): number;
    acceptString(value: StringSwitchValue): number;
    acceptVariantOption(value: VariantOptionSwitchValue): number;
  }


  class JavaSwitchLabel {
    readonly key: number;
    readonly label: Label;
    constructor(key: number, label: Label);
  }


  interface JavaTypeExpressionVisitor extends TypeVisitorWithContext<JavaWriter, Void, RuntimeException> {}
  class JavaTypeExpressionVisitor extends TypeVisitorWithContext<JavaWriter, Void, RuntimeException> {
    constructor(context: JavaBytecodeContext);
    visitArray(writer: JavaWriter, array: ArrayTypeID): Void;
    visitAssoc(writer: JavaWriter, assoc: AssocTypeID): Void;
    visitBasic(writer: JavaWriter, basic: BasicTypeID): Void;
    visitDefinition(writer: JavaWriter, definition: DefinitionTypeID): Void;
    visitFunction(writer: JavaWriter, functionParameter: FunctionTypeID): Void;
    visitGeneric(writer: JavaWriter, generic: GenericTypeID): Void;
    visitGenericMap(writer: JavaWriter, map: GenericMapTypeID): Void;
    visitIterator(writer: JavaWriter, iterator: IteratorTypeID): Void;
    visitOptional(writer: JavaWriter, type: OptionalTypeID): Void;
    visitRange(writer: JavaWriter, range: RangeTypeID): Void;
  }


  interface JavaUnboxingTypeVisitor extends TypeVisitorWithContext<TypeID, Void, RuntimeException> {}
  class JavaUnboxingTypeVisitor extends TypeVisitorWithContext<TypeID, Void, RuntimeException> {
    constructor(writer: JavaWriter);
    visitArray(context: TypeID, array: ArrayTypeID): Void;
    visitAssoc(context: TypeID, assoc: AssocTypeID): Void;
    visitBasic(context: TypeID, basic: BasicTypeID): Void;
    visitDefinition(context: TypeID, definition: DefinitionTypeID): Void;
    visitFunction(context: TypeID, functionParameter: FunctionTypeID): Void;
    visitGeneric(context: TypeID, generic: GenericTypeID): Void;
    visitGenericMap(context: TypeID, map: GenericMapTypeID): Void;
    visitIterator(context: TypeID, iterator: IteratorTypeID): Void;
    visitOptional(context: TypeID, type: OptionalTypeID): Void;
    visitRange(context: TypeID, range: RangeTypeID): Void;
  }


  class JavaWriter {
    readonly method: JavaMethod;
    readonly forDefinition: HighLevelDefinition;
    readonly clazzVisitor: ClassVisitor;
    constructor(logger: IZSLogger, position: CodePosition, visitor: ClassVisitor, nameVariables: boolean, method: JavaMethod, forDefinition: HighLevelDefinition, signature: string, exceptions: string[], ...annotations: string[]);

    constructor(logger: IZSLogger, position: CodePosition, visitor: ClassVisitor, nameVariables: boolean, method: JavaMethod, forDefinition: HighLevelDefinition, isExtension: boolean, signature: string, descriptor: string, exceptions: string[], ...annotations: string[]);

    constructor(logger: IZSLogger, position: CodePosition, visitor: ClassVisitor, method: JavaMethod, forDefinition: HighLevelDefinition, signature: string, exceptions: string[], ...annotations: string[]);
    aConstNull(): void;
    aThrow(): void;
    addVariableInfo(info: JavaLocalVariableInfo): void;
    arrayLength(): void;
    arrayLoad(type: Type): void;
    arrayStore(type: Type): void;
    biPush(value: number): void;
    checkCast(internalName: string): void;
    checkCast(type: Type): void;
    constant(value: any): void;
    constant(cls: Class<any>): void;
    constantClass(cls: JavaClass): void;
    createLabelName(): string;
    d2f(): void;
    d2i(): void;
    d2l(): void;
    dAdd(): void;
    dCmp(): void;
    dDiv(): void;
    dMul(): void;
    dNeg(): void;
    dRem(): void;
    dSub(): void;
    dup(): void;
    dup(type: Type): void;
    dup(large: boolean): void;
    dup2(): void;
    dup2X1(): void;
    dup2X2(): void;
    dupX1(): void;
    dupX1(tosLarge: boolean, large: boolean): void;
    dupX2(): void;
    enableDebug(): void;
    end(): void;
    f2d(): void;
    f2i(): void;
    f2l(): void;
    fAdd(): void;
    fCmp(): void;
    fDiv(): void;
    fMul(): void;
    fNeg(): void;
    fRem(): void;
    fSub(): void;
    get visitor(): LocalVariablesSorter;
    getField(owner: string, name: string, descriptor: string): void;
    getField(field: JavaField): void;
    getLocalVariable(variable: VariableID): JavaLocalVariableInfo;
    getNamedLabel(label: string): Label;
    getStaticField(owner: string, name: string, descriptor: string): void;
    getStaticField(field: JavaField): void;
    goTo(lbl: Label): void;
    i2b(): void;
    i2d(): void;
    i2f(): void;
    i2l(): void;
    i2s(): void;
    iAdd(): void;
    iAnd(): void;
    iConst0(): void;
    iConst1(): void;
    iDiv(): void;
    iMul(): void;
    iNeg(): void;
    iNot(): void;
    iOr(): void;
    iRem(): void;
    iShl(): void;
    iShr(): void;
    iSub(): void;
    iUShr(): void;
    iXor(): void;
    idec(local: number): void;
    ifACmpEq(lbl: Label): void;
    ifACmpNe(lbl: Label): void;
    ifEQ(lbl: Label): void;
    ifGE(lbl: Label): void;
    ifGT(lbl: Label): void;
    ifICmpEQ(lbl: Label): void;
    ifICmpGE(lbl: Label): void;
    ifICmpGT(lbl: Label): void;
    ifICmpLE(lbl: Label): void;
    ifICmpLT(lbl: Label): void;
    ifICmpNE(lbl: Label): void;
    ifLE(lbl: Label): void;
    ifLT(lbl: Label): void;
    ifNE(lbl: Label): void;
    ifNonNull(lbl: Label): void;
    ifNull(lbl: Label): void;
    iinc(local: number): void;
    iinc(local: number, increment: number): void;
    instanceOf(descriptor: string): void;
    instanceOf(type: Type): void;
    invertBoolean(): void;
    invokeInterface(method: JavaMethod): void;
    invokeSpecial(ownerInternalName: string, name: string, descriptor: string): void;
    invokeSpecial(owner: Class, name: string, descriptor: string): void;
    invokeSpecial(method: JavaMethod): void;
    invokeStatic(method: JavaMethod): void;
    invokeVirtual(method: JavaMethod): void;
    l2d(): void;
    l2f(): void;
    l2i(): void;
    lAdd(): void;
    lAnd(): void;
    lCmp(): void;
    lDiv(): void;
    lMul(): void;
    lNeg(): void;
    lNot(): void;
    lOr(): void;
    lRem(): void;
    lShl(): void;
    lShr(): void;
    lSub(): void;
    lUShr(): void;
    lXor(): void;
    label(label: Label): void;
    load(type: Type, local: number): void;
    load(parameter: JavaParameterInfo): void;
    load(localVariable: JavaLocalVariableInfo): void;
    loadInt(local: number): void;
    loadObject(local: number): void;
    local(type: Type): number;
    local(cls: Class): number;
    lookupSwitch(defaultLabel: Label, switchLabels: JavaSwitchLabel[]): void;
    nameParameter(modifier: number, name: string): void;
    nameVariable(local: number, name: string, start: Label, end: Label, type: Type): void;
    newArray(componentType: Type): void;
    newObject(internalName: string): void;
    newObject(cls: JavaClass): void;
    pop(): void;
    pop(large: boolean): void;
    pop2(): void;
    position(position: number): void;
    putField(owner: string, name: string, descriptor: string): void;
    putField(field: JavaField): void;
    putNamedLabel(lbl: Label, name: string): void;
    putStaticField(owner: string, name: string, descriptor: string): void;
    putStaticField(field: JavaField): void;
    ret(): void;
    returnInt(): void;
    returnObject(): void;
    returnType(type: Type): void;
    setLocalVariable(variable: VariableID, info: JavaLocalVariableInfo): void;
    siPush(value: number): void;
    start(): void;
    store(type: Type, local: number): void;
    store(parameter: JavaParameterInfo): void;
    store(localVariable: JavaLocalVariableInfo): void;
    storeInt(local: number): void;
    storeObject(local: number): void;
    stringAdd(): void;
    swap(): void;
    tryCatch(start: Label, end: Label, handler: Label, type: string): void;
    tryGetLocalVariable(variable: VariableID): JavaLocalVariableInfo;
  }

}

declare module 'org.openzen.zenscript.javabytecode.compiler.ArrayInitializerHelper' {
  import { ArrayHelperType } from 'org.openzen.zenscript.javabytecode.compiler';

  class InnermostFunction {
    apply(var1: ArrayHelperType, var2: number[]): void;
  }

}

declare module 'org.openzen.zenscript.javabytecode.compiler.definitions' {
  import { DefinitionVisitor, ClassDefinition, InterfaceDefinition, EnumDefinition, StructDefinition, FunctionDefinition, ExpansionDefinition, AliasDefinition, VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { JavaBytecodeContext } from 'org.openzen.zenscript.javabytecode';
  import { JavaClassWriter } from 'org.openzen.zenscript.javabytecode.compiler';
  import { MemberVisitor, ConstMember, FieldMember, ConstructorMember, DestructorMember, MethodMember, GetterMember, SetterMember, OperatorMember, CasterMember, IteratorMember, CallerMember, ImplementationMember, InnerDefinitionMember, StaticInitializerMember } from 'org.openzen.zenscript.codemodel.member';
  import { Void } from 'java.lang';
  import { ClassWriter } from 'org.objectweb.asm';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { HighLevelDefinition } from 'org.openzen.zenscript.codemodel';
  import { List } from 'java.util';

  interface JavaDefinitionVisitor extends DefinitionVisitor<number[]> {}
  class JavaDefinitionVisitor extends DefinitionVisitor<number[]> {
    constructor(context: JavaBytecodeContext, outerWriter: JavaClassWriter);
    visitAlias(definition: AliasDefinition): number[];
    visitClass(definition: ClassDefinition): number[];
    visitEnum(definition: EnumDefinition): number[];
    visitExpansion(definition: ExpansionDefinition): number[];
    visitFunction(definition: FunctionDefinition): number[];
    visitInterface(definition: InterfaceDefinition): number[];
    visitStruct(definition: StructDefinition): number[];
    visitVariant(variant: VariantDefinition): number[];
  }


  interface JavaExpansionMemberVisitor extends MemberVisitor<Void> {}
  class JavaExpansionMemberVisitor extends MemberVisitor<Void> {
    constructor(context: JavaBytecodeContext, writer: ClassWriter, expandedClass: TypeID, definition: HighLevelDefinition);
    end(): void;
    visitCaller(member: CallerMember): Void;
    visitCaster(member: CasterMember): Void;
    visitConst(member: ConstMember): Void;
    visitConstructor(member: ConstructorMember): Void;
    visitCustomIterator(member: IteratorMember): Void;
    visitDestructor(member: DestructorMember): Void;
    visitField(member: FieldMember): Void;
    visitGetter(member: GetterMember): Void;
    visitImplementation(member: ImplementationMember): Void;
    visitInnerDefinition(member: InnerDefinitionMember): Void;
    visitMethod(member: MethodMember): Void;
    visitOperator(member: OperatorMember): Void;
    visitSetter(member: SetterMember): Void;
    visitStaticInitializer(member: StaticInitializerMember): Void;
  }


  class JavaInitializedVariables {
    readonly fields: List;
    readonly owner: string;
    constructor(owner: string);

    constructor(fields: FieldMember[], owner: string);
  }

}

declare module 'org.openzen.zenscript.javabytecode.compiler.JavaModificationExpressionVisitor' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface PushOption extends Enum<PushOption> {}
  class PushOption extends Enum<PushOption> {
    static readonly NONE: PushOption;
    static readonly BEFORE: PushOption;
    static readonly AFTER: PushOption;
    static valueOf(name: string): PushOption;
    static values(): PushOption[];
  }

}

declare module 'org.openzen.zenscript.javabytecode' {
  import { JavaContext, JavaCompileSpace, JavaCompiledModule, JavaEnumMapper, JavaMethod, JavaParameterInfo } from 'org.openzen.zenscript.javashared';
  import { ZSPackage } from 'org.openzen.zenscript.codemodel.definition';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { Type, Label } from 'org.objectweb.asm';
  import { Module, FunctionParameter, SemanticModule } from 'org.openzen.zenscript.codemodel';
  import { Map, List } from 'java.util';
  import { ClassLoader } from 'java.lang';
  import { File } from 'java.io';

  interface JavaBytecodeContext extends JavaContext {}
  class JavaBytecodeContext extends JavaContext {
    readonly target: JavaBytecodeModule;
    constructor(target: JavaBytecodeModule, space: JavaCompileSpace, modulePackage: ZSPackage, basePackage: string, logger: IZSLogger);
    get lambdaCounter(): number;
    getDescriptor(type: TypeID): string;
    getInternalName(type: TypeID): string;
    getType(type: TypeID): Type;
    register(name: string, bytecode: number[]): void;
  }


  interface JavaBytecodeModule extends JavaCompiledModule {}
  class JavaBytecodeModule extends JavaCompiledModule {
    constructor(module: Module, parameters: FunctionParameter[], logger: IZSLogger);
    addClass(name: string, bytecode: number[]): void;
    addScript(method: JavaScriptMethod): void;
    get classes(): Map<string, number[]>;
    get scripts(): JavaScriptMethod[];
  }


  class JavaBytecodeRunUnit {
    constructor(logger: IZSLogger);
    add(module: JavaBytecodeModule): void;
    dump(directory: File): void;
    run(): void;
    run(arguments: Map<FunctionParameter, any>): void;
    run(arguments: Map<FunctionParameter, any>, parentClassLoader: ClassLoader): void;
  }


  class JavaCompiler {
    constructor(logger: IZSLogger);
    compile(packageName: string, module: SemanticModule, space: JavaCompileSpace, enumMapper: JavaEnumMapper): JavaBytecodeModule;
  }


  class JavaLocalVariableInfo {
    readonly type: Type;
    readonly local: number;
    readonly start: Label;
    readonly name: string;
    end: Label;
    constructor(type: Type, local: number, start: Label, name: string);

    constructor(type: Type, local: number, start: Label, name: string, end: Label);
  }


  class JavaScriptMethod {
    readonly method: JavaMethod;
    readonly parameters: FunctionParameter[];
    readonly parametersInfo: JavaParameterInfo[];
    constructor(method: JavaMethod, parameters: FunctionParameter[], parametersInfo: JavaParameterInfo[]);
  }

}

declare module 'org.openzen.zenscript.javabytecode.JavaBytecodeRunUnit' {
  import { ClassLoader, Class } from 'java.lang';

  interface ScriptClassLoader extends ClassLoader {}
  class ScriptClassLoader extends ClassLoader {
    constructor(parent: ClassLoader);
    loadClass(name: string): Class<any>;
  }

}

declare module 'org.openzen.zenscript.javashared.expressions' {
  import { Expression, ExpressionVisitor, ExpressionVisitorWithContext, ExpressionTransformer } from 'org.openzen.zenscript.codemodel.expression';
  import { FunctionTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { StatementTransformer } from 'org.openzen.zenscript.codemodel.statement';

  interface JavaFunctionInterfaceCastExpression extends Expression {}
  class JavaFunctionInterfaceCastExpression extends Expression {
    readonly value: Expression;
    readonly functionType: FunctionTypeID;
    constructor(position: CodePosition, type: FunctionTypeID, value: Expression);
    accept<T>(visitor: ExpressionVisitor<T>): T;
    accept<C, R>(context: C, visitor: ExpressionVisitorWithContext<C, R>): R;
    normalize(scope: TypeScope): Expression;
    transform(transformer: ExpressionTransformer): Expression;
    static transform(expressions: Expression[], transformer: ExpressionTransformer): Expression[];
    transform(transformer: StatementTransformer, expression: Expression): Expression;
  }

}

declare module 'org.openzen.zenscript.javashared' {
  import { Comparable, Void, Boolean } from 'java.lang';
  import { Kind } from 'org.openzen.zenscript.javashared.JavaClass';
  import { Module, FunctionParameter, HighLevelDefinition, FunctionHeader } from 'org.openzen.zenscript.codemodel';
  import { Option } from 'org.openzen.zenscript.codemodel.definition.VariantDefinition';
  import { ImplementationMember, IDefinitionMember, DefinitionMember, EnumConstantMember } from 'org.openzen.zenscript.codemodel.member';
  import { DefinitionMemberRef, VariantOptionRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { TypeParameter, TypeParameterBound, ParameterSuperBound, ParameterTypeBound } from 'org.openzen.zenscript.codemodel.generic';
  import { List, Optional, Map, Collection } from 'java.util';
  import { ExpansionDefinition, ZSPackage, EnumDefinition, DefinitionVisitor, ClassDefinition, InterfaceDefinition, StructDefinition, FunctionDefinition, AliasDefinition, VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { GlobalTypeRegistry, TypeID, FunctionTypeID, RangeTypeID, TypeVisitor, BasicTypeID, ArrayTypeID, AssocTypeID, GenericMapTypeID, IteratorTypeID, DefinitionTypeID, GenericTypeID, OptionalTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';
  import { Kind as org_openzen_zenscript_javashared_javamethod_Kind } from 'org.openzen.zenscript.javashared.JavaMethod';
  import { Expression, CastExpression, CallExpression } from 'org.openzen.zenscript.codemodel.expression';

  interface JavaClass extends Comparable<JavaClass> {}
  class JavaClass extends Comparable<JavaClass> {
    static readonly CLASS: JavaClass;
    static readonly ENUM: JavaClass;
    static readonly OBJECT: JavaClass;
    static readonly STRING: JavaClass;
    static readonly CLOSEABLE: JavaClass;
    static readonly MAP: JavaClass;
    static readonly HASHMAP: JavaClass;
    static readonly ITERATOR: JavaClass;
    static readonly ITERABLE: JavaClass;
    static readonly ARRAYS: JavaClass;
    static readonly BOOLEAN: JavaClass;
    static readonly BYTE: JavaClass;
    static readonly SHORT: JavaClass;
    static readonly INTEGER: JavaClass;
    static readonly LONG: JavaClass;
    static readonly FLOAT: JavaClass;
    static readonly DOUBLE: JavaClass;
    static readonly CHARACTER: JavaClass;
    static readonly COLLECTION: JavaClass;
    static readonly COLLECTIONS: JavaClass;
    static readonly SHARED: JavaClass;
    readonly outer: JavaClass;
    readonly pkg: string;
    readonly fullName: string;
    readonly internalName: string;
    readonly kind: Kind;
    empty: boolean;
    membersPrepared: boolean;
    constructor(pkg: string, name: string, kind: Kind);

    constructor(outer: JavaClass, name: string, kind: Kind);
    compareTo(o: JavaClass): number;
    static fromInternalName(internalName: string, kind: Kind): JavaClass;
    get className(): string;
    get name(): string;
    static getNameFromFile(filename: string): string;
    isEnum(): boolean;
    isInterface(): boolean;
  }


  class JavaCompiledModule {
    readonly module: Module;
    readonly scriptParameters: FunctionParameter[];
    constructor(module: Module, scriptParameters: FunctionParameter[]);
    addAllFrom(compiled: JavaCompiledModule): void;
    generateMappings(): string;
    get enumMapper(): JavaEnumMapper;
    get expansions(): ExpansionDefinition[];
    getClassInfo(definition: HighLevelDefinition): JavaClass;
    getExpansionClassInfo(definition: HighLevelDefinition): JavaClass;
    getFieldInfo(member: IDefinitionMember): JavaField;
    getImplementationInfo(member: ImplementationMember): JavaImplementation;
    getMethodInfo(member: DefinitionMemberRef): JavaMethod;
    getMethodInfo(member: IDefinitionMember): JavaMethod;
    getNativeClassInfo(definition: HighLevelDefinition): JavaNativeClass;
    getParameterInfo(parameter: FunctionParameter): JavaParameterInfo;
    getTypeParameterInfo(parameter: TypeParameter): JavaTypeParameterInfo;
    getVariantOption(option: Option): JavaVariantOption;
    hasClassInfo(definition: HighLevelDefinition): boolean;
    loadMappings(mappings: string): void;
    optClassInfo(definition: HighLevelDefinition): JavaClass;
    optFieldInfo(member: IDefinitionMember): JavaField;
    optMethodInfo(member: IDefinitionMember): JavaMethod;
    setClassInfo(definition: HighLevelDefinition, cls: JavaClass): void;
    setExpansionClassInfo(definition: HighLevelDefinition, cls: JavaClass): void;
    setFieldInfo(member: IDefinitionMember, field: JavaField): void;
    setImplementationInfo(member: ImplementationMember, implementation: JavaImplementation): void;
    setMethodInfo(member: IDefinitionMember, method: JavaMethod): void;
    setNativeClassInfo(definition: HighLevelDefinition, cls: JavaNativeClass): void;
    setParameterInfo(parameter: FunctionParameter, info: JavaParameterInfo): void;
    setTypeParameterInfo(parameter: TypeParameter, info: JavaTypeParameterInfo): void;
    setVariantOption(option: Option, value: JavaVariantOption): void;
  }


  class JavaCompileSpace {
    get registry(): GlobalTypeRegistry;
    getCompiled(var1: Module): JavaCompiledModule;
    register(var1: JavaCompiledModule): void;
  }


  class JavaContext {
    readonly modulePackage: ZSPackage;
    readonly basePackage: string;
    readonly logger: IZSLogger;
    constructor(space: JavaCompileSpace, modulePackage: ZSPackage, basePackage: string, logger: IZSLogger);
    addModule(module: Module, target: JavaCompiledModule): void;
    get registry(): GlobalTypeRegistry;
    getDescriptor(var1: TypeID): string;
    getEnumConstructorDescriptor(header: FunctionHeader): string;
    getFunction(type: FunctionTypeID): JavaSynthesizedFunctionInstance;
    getFunctionalInterface(type: TypeID): JavaMethod;
    getJavaClass(definition: HighLevelDefinition): JavaClass;
    getJavaExpansionClass(definition: HighLevelDefinition): JavaClass;
    getJavaField(member: IDefinitionMember): JavaField;
    getJavaField(member: DefinitionMemberRef): JavaField;
    getJavaImplementation(member: ImplementationMember): JavaImplementation;
    getJavaMethod(member: IDefinitionMember): JavaMethod;
    getJavaMethod(member: DefinitionMemberRef): JavaMethod;
    getJavaModule(module: Module): JavaCompiledModule;
    getJavaNativeClass(definition: HighLevelDefinition): JavaNativeClass;
    getJavaVariantOption(option: Option): JavaVariantOption;
    getJavaVariantOption(member: VariantOptionRef): JavaVariantOption;
    getMethodDescriptor(header: FunctionHeader): string;
    getMethodDescriptor(header: FunctionHeader, isEnumConstructor: boolean, expandedType: string): string;
    getMethodDescriptorConstructor(header: FunctionHeader, member: DefinitionMember): string;
    getMethodDescriptorExpansion(header: FunctionHeader, expandedType: TypeID): string;
    getMethodSignature(header: FunctionHeader): string;
    getMethodSignature(header: FunctionHeader, withGenerics: boolean): string;
    getMethodSignatureExpansion(header: FunctionHeader, expandedClass: TypeID): string;
    getPackageName(pkg: ZSPackage): string;
    getRange(type: RangeTypeID): JavaSynthesizedClass;
    getSignature(type: TypeID): string;
    hasJavaClass(definition: HighLevelDefinition): boolean;
    hasJavaField(member: DefinitionMemberRef): boolean;
    isGenericOrContainsGenericParameters(typeID: TypeID): boolean;
    optJavaClass(definition: HighLevelDefinition): JavaClass;
    setJavaClass(definition: HighLevelDefinition, cls: JavaClass): void;
    setJavaExpansionClass(definition: HighLevelDefinition, cls: JavaClass): void;
    setJavaNativeClass(definition: HighLevelDefinition, cls: JavaNativeClass): void;
  }


  class JavaEnumMapper {
    getMapping(member: EnumConstantMember): Optional<string>;
    getMappings(definition: EnumDefinition): Optional<Map<EnumConstantMember, string>>;
    merge(mapper: JavaEnumMapper): void;
    registerMapping(definition: EnumDefinition, member: EnumConstantMember, name: string): void;
  }


  class JavaField {
    readonly cls: JavaClass;
    readonly name: string;
    readonly descriptor: string;
    readonly signature: string;
    constructor(cls: JavaClass, name: string, descriptor: string);

    constructor(cls: JavaClass, name: string, descriptor: string, signature: string);
    getMapping(definition: JavaClass): string;
  }


  class JavaImplementation {
    readonly inline: boolean;
    readonly implementationClass: JavaClass;
    constructor(inline: boolean, implementationClass: JavaClass);
  }


  interface JavaMappingWriter extends DefinitionVisitor<Void> {}
  class JavaMappingWriter extends DefinitionVisitor<Void> {
    constructor(module: JavaCompiledModule);
    get output(): string;
    visitAlias(definition: AliasDefinition): Void;
    visitClass(definition: ClassDefinition): Void;
    visitEnum(definition: EnumDefinition): Void;
    visitExpansion(definition: ExpansionDefinition): Void;
    visitFunction(definition: FunctionDefinition): Void;
    visitInterface(definition: InterfaceDefinition): Void;
    visitStruct(definition: StructDefinition): Void;
    visitVariant(variant: VariantDefinition): Void;
  }


  class JavaMethod {
    readonly cls: JavaClass;
    readonly kind: org_openzen_zenscript_javashared_javamethod_Kind;
    readonly name: string;
    readonly compile: boolean;
    readonly translation: JavaNativeTranslation;
    readonly descriptor: string;
    readonly modifiers: number;
    readonly genericResult: boolean;
    readonly typeParameterArguments: boolean[];
    constructor(cls: JavaClass, kind: org_openzen_zenscript_javashared_javamethod_Kind, name: string, compile: boolean, descriptor: string, modifiers: number, genericResult: boolean);

    constructor(cls: JavaClass, kind: org_openzen_zenscript_javashared_javamethod_Kind, name: string, compile: boolean, descriptor: string, modifiers: number, genericResult: boolean, typeParameterArguments: boolean[]);

    constructor(translation: JavaNativeTranslation<any>);
    static getConstructor(cls: JavaClass, descriptor: string, modifiers: number): JavaMethod;
    static getDestructor(cls: JavaClass, modifiers: number): JavaMethod;
    static getInterface(cls: JavaClass, name: string, descriptor: string): JavaMethod;
    static getInterface(cls: JavaClass, name: string, descriptor: string, genericResult: boolean): JavaMethod;
    getMapping(definition: JavaClass): string;
    static getNativeConstructor(cls: JavaClass, descriptor: string): JavaMethod;
    static getNativeExpansion(cls: JavaClass, name: string, descriptor: string): JavaMethod;
    static getNativeStatic(cls: JavaClass, name: string, descriptor: string): JavaMethod;
    static getNativeVirtual(cls: JavaClass, name: string, descriptor: string): JavaMethod;
    static getStatic(cls: JavaClass, name: string, descriptor: string, modifiers: number): JavaMethod;
    static getStatic(cls: JavaClass, name: string, descriptor: string, modifiers: number, genericResult: boolean): JavaMethod;
    static getVirtual(cls: JavaClass, name: string, descriptor: string, modifiers: number): JavaMethod;
    static getVirtual(cls: JavaClass, name: string, descriptor: string, modifiers: number, genericResult: boolean): JavaMethod;
    isAbstract(): boolean;
  }


  class JavaModifiers {
    static readonly PUBLIC: number;
    static readonly PRIVATE: number;
    static readonly PROTECTED: number;
    static readonly STATIC: number;
    static readonly FINAL: number;
    static readonly SUPER: number;
    static readonly SYNCHRONIZED: number;
    static readonly OPEN: number;
    static readonly TRANSITIVE: number;
    static readonly VOLATILE: number;
    static readonly BRIDGE: number;
    static readonly STATIC_PHASE: number;
    static readonly VARARGS: number;
    static readonly TRANSIENT: number;
    static readonly NATIVE: number;
    static readonly INTERFACE: number;
    static readonly ABSTRACT: number;
    static readonly STRICT: number;
    static readonly SYNTHETIC: number;
    static readonly ANNOTATION: number;
    static readonly ENUM: number;
    static readonly MANDATED: number;
    static readonly MODULE: number;
    static getJavaModifiers(modifiers: number): number;
    static isStatic(modifiers: number): boolean;
  }


  class JavaNativeClass {
    readonly cls: JavaClass;
    readonly nonDestructible: boolean;
    constructor(cls: JavaClass);

    constructor(cls: JavaClass, nonDestructible: boolean);
    addConstructor(key: string, descriptor: string): void;
    addInstanceMethod(key: string, name: string, descriptor: string): void;
    addInstanceMethod(key: string, name: string, descriptor: string, genericReturnType: boolean): void;
    addMethod(key: string, method: JavaMethod): void;
    createInstanceMethod(name: string, descriptor: string): JavaMethod;
    createMethod(name: string, descriptor: string, instance: org_openzen_zenscript_javashared_javamethod_Kind): JavaMethod;
    createMethod(name: string, descriptor: string, instance: org_openzen_zenscript_javashared_javamethod_Kind, genericReturnType: boolean): JavaMethod;
    getMethod(name: string): JavaMethod;
  }


  class JavaNativeTranslation<T = any> {
    translate(var1: Expression, var2: JavaNativeTranslator<T>): T;
  }


  class JavaNativeTranslator<T = any> {
    arrayCopy(var1: Expression): T;
    arrayCopyResize(var1: CallExpression): T;
    arrayCopyTo(var1: CallExpression): T;
    bytesAsciiToString(var1: Expression): T;
    bytesUTF8ToString(var1: Expression): T;
    containsAsIndexOf(var1: Expression, var2: Expression): T;
    isEmptyAsLengthZero(var1: Expression): T;
    listToArray(var1: CastExpression): T;
    setToArray(var1: CastExpression): T;
    sorted(var1: Expression): T;
    sortedWithComparator(var1: Expression, var2: Expression): T;
    stringToAscii(var1: Expression): T;
    stringToUTF8(var1: Expression): T;
  }


  class JavaParameterInfo {
    readonly index: number;
    readonly typeDescriptor: string;
    constructor(index: number, typeDescriptor: string);
  }


  class JavaSynthesizedClass {
    readonly cls: JavaClass;
    readonly typeArguments: TypeID[];
    constructor(cls: JavaClass, typeArguments: TypeID[]);
  }


  class JavaSynthesizedFunction {
    readonly cls: JavaClass;
    readonly typeParameters: TypeParameter[];
    readonly header: FunctionHeader;
    readonly method: string;
    constructor(cls: JavaClass, parameters: TypeParameter[], header: FunctionHeader, method: string);
  }


  class JavaSynthesizedFunctionInstance {
    readonly typeArguments: TypeID[];
    constructor(functionParameter: JavaSynthesizedFunction, typeArguments: TypeID[]);
    get cls(): JavaClass;
    get header(): FunctionHeader;
    get method(): string;
  }


  class JavaSynthesizedRange {
    readonly cls: JavaClass;
    readonly typeParameters: TypeParameter[];
    readonly baseType: TypeID;
    constructor(cls: JavaClass, typeParameters: TypeParameter[], baseType: TypeID);
  }


  class JavaSyntheticClassGenerator {
    synthesizeFunction(var1: JavaSynthesizedFunction): void;
    synthesizeRange(var1: JavaSynthesizedRange): void;
  }


  interface JavaSyntheticTypeSignatureConverter extends TypeVisitor<string> {}
  class JavaSyntheticTypeSignatureConverter extends TypeVisitor<string> {
    readonly typeParameterList: List;
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(type: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
  }


  interface JavaTypeCheckIfGenericVisitor extends TypeVisitor<boolean> {}
  class JavaTypeCheckIfGenericVisitor extends TypeVisitor<boolean> {
    visitArray(array: ArrayTypeID): boolean;
    visitAssoc(assoc: AssocTypeID): boolean;
    visitBasic(basic: BasicTypeID): boolean;
    visitDefinition(definition: DefinitionTypeID): boolean;
    visitFunction(functionParameter: FunctionTypeID): boolean;
    visitGeneric(generic: GenericTypeID): boolean;
    visitGenericMap(map: GenericMapTypeID): boolean;
    visitIterator(iterator: IteratorTypeID): boolean;
    visitOptional(type: OptionalTypeID): boolean;
    visitRange(range: RangeTypeID): boolean;
  }


  interface JavaTypeDescriptorVisitor extends TypeVisitor<string> {}
  class JavaTypeDescriptorVisitor extends TypeVisitor<string> {
    constructor(context: JavaContext);
    process(type: TypeID): string;
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(modified: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
  }


  interface JavaTypeGenericVisitor extends TypeVisitor<string> {}
  class JavaTypeGenericVisitor extends TypeVisitor<string> {
    constructor(context: JavaContext);
    getGenericBounds(collection: Collection<TypeParameterBound>): string;
    getGenericMethodSignature(header: FunctionHeader): string;
    getGenericMethodSignature(header: FunctionHeader, addGenerics: boolean): string;
    getGenericSignature(...types: TypeID[]): string;
    getGenericSignature(...parameters: TypeParameter[]): string;
    getMethodSignatureExpansion(header: FunctionHeader, expandedClass: TypeID): string;
    getSignatureWithBound(type: TypeID): string;
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(type: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
    visitSuper(bound: ParameterSuperBound): string;
    visitType(bound: ParameterTypeBound): string;
  }


  class JavaTypeInfo {
    readonly primitive: boolean;
    static get(type: TypeID): JavaTypeInfo;
    static isPrimitive(type: TypeID): boolean;
  }


  interface JavaTypeInternalNameVisitor extends TypeVisitor<string> {}
  class JavaTypeInternalNameVisitor extends TypeVisitor<string> {
    constructor(context: JavaContext);
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(modified: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
  }


  interface JavaTypeNameVisitor extends TypeVisitor<string> {}
  class JavaTypeNameVisitor extends TypeVisitor<string> {
    static readonly INSTANCE: JavaTypeNameVisitor;
    process(type: TypeID): string;
    visitArray(array: ArrayTypeID): string;
    visitAssoc(assoc: AssocTypeID): string;
    visitBasic(basic: BasicTypeID): string;
    visitDefinition(definition: DefinitionTypeID): string;
    visitFunction(functionParameter: FunctionTypeID): string;
    visitGeneric(generic: GenericTypeID): string;
    visitGenericMap(map: GenericMapTypeID): string;
    visitIterator(iterator: IteratorTypeID): string;
    visitOptional(type: OptionalTypeID): string;
    visitRange(range: RangeTypeID): string;
  }


  class JavaTypeParameterInfo {
    readonly parameterIndex: number;
    readonly field: JavaField;
    constructor(parameterIndex: number);

    constructor(field: JavaField);

    constructor(parameterIndex: number, field: JavaField);
  }


  class JavaVariantOption {
    readonly variantClass: JavaClass;
    readonly variantOptionClass: JavaClass;
    constructor(variantClass: JavaClass, variantOptionClass: JavaClass);
  }


  interface SimpleJavaCompileSpace extends JavaCompileSpace {}
  class SimpleJavaCompileSpace extends JavaCompileSpace {
    constructor(registry: GlobalTypeRegistry);
    get registry(): GlobalTypeRegistry;
    getCompiled(module: Module): JavaCompiledModule;
    register(module: JavaCompiledModule): void;
  }

}

declare module 'org.openzen.zenscript.javashared.JavaClass' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Kind extends Enum<Kind> {}
  class Kind extends Enum<Kind> {
    static readonly CLASS: Kind;
    static readonly INTERFACE: Kind;
    static readonly ENUM: Kind;
    static readonly ARRAY: Kind;
    static valueOf(name: string): Kind;
    static values(): Kind[];
  }

}

declare module 'org.openzen.zenscript.javashared.JavaMethod' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Kind extends Enum<Kind> {}
  class Kind extends Enum<Kind> {
    static readonly STATIC: Kind;
    static readonly STATICINIT: Kind;
    static readonly INSTANCE: Kind;
    static readonly INTERFACE: Kind;
    static readonly EXPANSION: Kind;
    static readonly CONSTRUCTOR: Kind;
    static readonly COMPILED: Kind;
    static valueOf(name: string): Kind;
    static values(): Kind[];
  }

}

declare module 'org.openzen.zenscript.javashared.prepare' {
  import { MemberVisitor, ConstMember, FieldMember, ConstructorMember, DestructorMember, MethodMember, GetterMember, SetterMember, OperatorMember, CasterMember, IteratorMember, CallerMember, ImplementationMember, InnerDefinitionMember, StaticInitializerMember } from 'org.openzen.zenscript.codemodel.member';
  import { Void } from 'java.lang';
  import { JavaContext, JavaCompiledModule, JavaClass, JavaNativeClass } from 'org.openzen.zenscript.javashared';
  import { DefinitionVisitor, ClassDefinition, InterfaceDefinition, EnumDefinition, StructDefinition, FunctionDefinition, ExpansionDefinition, AliasDefinition, VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { HighLevelDefinition } from 'org.openzen.zenscript.codemodel';

  interface JavaPrepareClassMethodVisitor extends MemberVisitor<Void> {}
  class JavaPrepareClassMethodVisitor extends MemberVisitor<Void> {
    constructor(context: JavaContext, module: JavaCompiledModule, cls: JavaClass, nativeClass: JavaNativeClass, memberPreparer: JavaPrepareDefinitionMemberVisitor, startsEmpty: boolean);
    visitCaller(member: CallerMember): Void;
    visitCaster(member: CasterMember): Void;
    visitConst(member: ConstMember): Void;
    visitConstructor(member: ConstructorMember): Void;
    visitCustomIterator(member: IteratorMember): Void;
    visitDestructor(member: DestructorMember): Void;
    visitField(member: FieldMember): Void;
    visitGetter(member: GetterMember): Void;
    visitImplementation(member: ImplementationMember): Void;
    visitInnerDefinition(member: InnerDefinitionMember): Void;
    visitMethod(member: MethodMember): Void;
    visitOperator(member: OperatorMember): Void;
    visitSetter(member: SetterMember): Void;
    visitStaticInitializer(member: StaticInitializerMember): Void;
  }


  interface JavaPrepareDefinitionMemberVisitor extends DefinitionVisitor<JavaClass> {}
  class JavaPrepareDefinitionMemberVisitor extends DefinitionVisitor<JavaClass> {
    constructor(context: JavaContext, module: JavaCompiledModule);
    prepare(type: TypeID): void;
    prepare(definition: HighLevelDefinition): void;
    visitAlias(definition: AliasDefinition): JavaClass;
    visitClass(definition: ClassDefinition): JavaClass;
    visitEnum(definition: EnumDefinition): JavaClass;
    visitExpansion(definition: ExpansionDefinition): JavaClass;
    visitFunction(definition: FunctionDefinition): JavaClass;
    visitInterface(definition: InterfaceDefinition): JavaClass;
    visitStruct(definition: StructDefinition): JavaClass;
    visitVariant(variant: VariantDefinition): JavaClass;
  }


  interface JavaPrepareDefinitionVisitor extends DefinitionVisitor<JavaClass> {}
  class JavaPrepareDefinitionVisitor extends DefinitionVisitor<JavaClass> {
    constructor(context: JavaContext, module: JavaCompiledModule, filename: string, outerClass: JavaClass);

    constructor(context: JavaContext, module: JavaCompiledModule, filename: string, outerClass: JavaClass, className: string);
    prepare(type: TypeID): void;
    visitAlias(definition: AliasDefinition): JavaClass;
    visitClass(definition: ClassDefinition): JavaClass;
    visitEnum(definition: EnumDefinition): JavaClass;
    visitExpansion(definition: ExpansionDefinition): JavaClass;
    visitFunction(definition: FunctionDefinition): JavaClass;
    visitInterface(definition: InterfaceDefinition): JavaClass;
    visitStruct(definition: StructDefinition): JavaClass;
    visitVariant(variant: VariantDefinition): JavaClass;
  }


  interface JavaPrepareExpansionMethodVisitor extends MemberVisitor<Void> {}
  class JavaPrepareExpansionMethodVisitor extends MemberVisitor<Void> {
    constructor(context: JavaContext, module: JavaCompiledModule, cls: JavaClass, nativeClass: JavaNativeClass);
    visitCaller(member: CallerMember): Void;
    visitCaster(member: CasterMember): Void;
    visitConst(member: ConstMember): Void;
    visitConstructor(member: ConstructorMember): Void;
    visitCustomIterator(member: IteratorMember): Void;
    visitDestructor(member: DestructorMember): Void;
    visitField(member: FieldMember): Void;
    visitGetter(member: GetterMember): Void;
    visitImplementation(member: ImplementationMember): Void;
    visitInnerDefinition(member: InnerDefinitionMember): Void;
    visitMethod(member: MethodMember): Void;
    visitOperator(member: OperatorMember): Void;
    visitSetter(member: SetterMember): Void;
    visitStaticInitializer(member: StaticInitializerMember): Void;
  }

}

declare module 'org.openzen.zenscript.javashared.types' {
  import { FunctionTypeID, GlobalTypeRegistry, TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { Method } from 'java.lang.reflect';
  import { JavaMethod } from 'org.openzen.zenscript.javashared';
  import { FunctionHeader, GenericMapper } from 'org.openzen.zenscript.codemodel';
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { CodePosition } from 'org.openzen.zencode.shared';

  interface JavaFunctionalInterfaceTypeID extends FunctionTypeID {}
  class JavaFunctionalInterfaceTypeID extends FunctionTypeID {
    readonly functionalInterfaceMethod: Method;
    readonly method: JavaMethod;
    constructor(registry: GlobalTypeRegistry, header: FunctionHeader, functionalInterfaceMethod: Method, method: JavaMethod);
    canCastImplicitFrom(other: TypeID): boolean;
    canCastImplicitTo(other: TypeID): boolean;
    castImplicitFrom(position: CodePosition, value: Expression): Expression;
    castImplicitTo(position: CodePosition, value: Expression, other: TypeID): Expression;
    get normalized(): FunctionTypeID;
    instance(mapper: GenericMapper): TypeID;
  }

}

declare module 'org.openzen.zenscript.lexer' {
  import { Map, List } from 'java.util';
  import { Integer, Class, Comparable, Exception, Throwable, Enum } from 'java.lang';
  import { SourceFile, CodePosition } from 'org.openzen.zencode.shared';
  import { DFAState } from 'org.openzen.zenscript.lexer.DFA';
  import { Reader } from 'java.io';
  import { BracketExpressionParser } from 'org.openzen.zenscript.parser';
  import { WhitespaceInfo } from 'org.openzen.zenscript.codemodel';

  class CharReader {
    next(): number;
    peek(): number;
  }


  class CharStream {
    constructor(data: string);
    hasMore(): boolean;
    next(): string;
    optional(ch: string): boolean;
    optional(from: string, to: string): string;
    peek(): string;
    peek(ch: string): boolean;
    required(ch: string): void;
    required(from: string, to: string): string;
  }


  class CompiledDFA<T = any> {
    transitions: Map[];
    finals: T[];
    constructor(transitions: Map<number, number>, finals: T[]);
    static createLexerDFA<T extends TokenType & Comparable<T>>(tokenTypes: T[], tokenClass: Class<T>): CompiledDFA<T>;
    eval(value: string): T;
    matches(value: string): boolean;
    toString(): string;
  }


  interface CountingCharReader extends CharReader {}
  class CountingCharReader extends CharReader {
    constructor(reader: CharReader, file: SourceFile);
    get position(): CodePosition;
    next(): number;
    peek(): number;
  }


  class DFA<T = any> {
    static readonly NOFINAL: number;
    constructor(tokenClass: Class<T>, initial: DFAState<T>);
    compile(): CompiledDFA<T>;
    optimize(): DFA<T>;
    toString(): string;
  }


  interface LLParserTokenStream<TT extends TokenType = any, T extends Token<TT> = any> extends WhitespaceFilteringParser<TT, T> {}
  class LLParserTokenStream<TT extends TokenType = any, T extends Token<TT> = any> extends WhitespaceFilteringParser<TT, T> {
    constructor(stream: TokenStream<TT, T>);
    get position(): CodePosition;
    get positionBeforeWhitespace(): CodePosition;
    hasNext(): boolean;
    isNext(type: TT): boolean;
    next(): T;
    optional(type: TT): T;
    peek(): T;
    popMark(): void;
    pushMark(): void;
    recoverUntilBeforeToken(type: ZSTokenType): void;
    recoverUntilOnToken(type: ZSTokenType): void;
    recoverUntilTokenOrNewline(type: ZSTokenType): void;
    required(type: TT, error: string): T;
    reset(): void;
  }


  interface ParseException extends Exception {}
  class ParseException extends Exception {
    readonly position: CodePosition;
    readonly message: string;
    constructor(position: CodePosition, message: string);

    constructor(position: CodePosition, message: string, cause: Throwable);
  }


  interface ReaderCharReader extends CharReader {}
  class ReaderCharReader extends CharReader {
    constructor(reader: Reader);
    next(): number;
    peek(): number;
  }


  interface StringCharReader extends CharReader {}
  class StringCharReader extends CharReader {
    constructor(data: string);
    next(): number;
    peek(): number;
  }


  class Token<TT extends TokenType = any> {
    get content(): string;
    get type(): TT;
  }


  class TokenFactory<T = any, TT = any> {
    create(var1: TT, var2: string): T;
  }


  interface TokenParser<T extends Token<TT> = any, TT extends TokenType = any> extends TokenStream<TT, T> {}
  class TokenParser<T extends Token<TT> = any, TT extends TokenType = any> extends TokenStream<TT, T> {
    constructor(file: SourceFile, reader: CharReader, dfa: CompiledDFA<TT>, eof: TT, invalid: TT, factory: TokenFactory<T, TT>);

    constructor(file: SourceFile, data: string, dfa: CompiledDFA<TT>, eof: TT, invalid: TT, factory: TokenFactory<T, TT>);
    get eOF(): TT;
    get position(): CodePosition;
    hasNext(): boolean;
    next(): T;
  }


  class TokenStream<TT extends TokenType = any, T extends Token<TT> = any> {
    get eOF(): TT;
    get position(): CodePosition;
    next(): T;
  }


  class TokenType {
    get regexp(): string;
    isWhitespace(): boolean;
  }


  interface WhitespaceFilteringParser<TT extends TokenType = any, T extends Token<TT> = any> extends TokenStream<TT, T> {}
  class WhitespaceFilteringParser<TT extends TokenType = any, T extends Token<TT> = any> extends TokenStream<TT, T> {
    constructor(stream: TokenStream<TT, T>);
    get eOF(): TT;
    get lastWhitespace(): string;
    get position(): CodePosition;
    get positionBeforeWhitespace(): CodePosition;
    grabWhitespaceLine(): string;
    next(): T;
    peek(): T;
    replace(other: T): void;
    skipWhitespaceNewline(): void;
  }


  interface ZSToken extends Token<ZSTokenType> {}
  class ZSToken extends Token<ZSTokenType> {
    readonly type: ZSTokenType;
    readonly content: string;
    constructor(type: ZSTokenType, content: string);
    delete(offset: number, characters: number): ZSToken;
    get content(): string;
    get type(): ZSTokenType;
    insert(offset: number, value: string): ZSToken;
    toString(): string;
  }


  interface ZSTokenFactory extends TokenFactory<ZSToken, ZSTokenType> {}
  class ZSTokenFactory extends TokenFactory<ZSToken, ZSTokenType> {
    create(type: ZSTokenType, content: string): ZSToken;
  }


  interface ZSTokenParser extends LLParserTokenStream<ZSTokenType, ZSToken> {}
  class ZSTokenParser extends LLParserTokenStream<ZSTokenType, ZSToken> {
    readonly bracketParser: BracketExpressionParser;
    constructor(parser: TokenStream<ZSTokenType, ZSToken>, bracketParser: BracketExpressionParser);
    collectWhitespaceInfo(whitespace: string, skipLineBefore: boolean): WhitespaceInfo;
    static create(file: SourceFile, bracketParser: BracketExpressionParser): ZSTokenParser;
    static createRaw(file: SourceFile, reader: CharReader): TokenParser<ZSToken, ZSTokenType>;
    get errors(): ParseException[];
    get file(): SourceFile;
    logError(error: ParseException): void;
  }


  interface ZSTokenType extends Enum<ZSTokenType> {}
  class ZSTokenType extends Enum<ZSTokenType> {
    static readonly T_COMMENT_SCRIPT: ZSTokenType;
    static readonly T_COMMENT_SINGLELINE: ZSTokenType;
    static readonly T_COMMENT_MULTILINE: ZSTokenType;
    static readonly T_WHITESPACE_SPACE: ZSTokenType;
    static readonly T_WHITESPACE_TAB: ZSTokenType;
    static readonly T_WHITESPACE_NEWLINE: ZSTokenType;
    static readonly T_WHITESPACE_CARRIAGE_RETURN: ZSTokenType;
    static readonly T_IDENTIFIER: ZSTokenType;
    static readonly T_LOCAL_IDENTIFIER: ZSTokenType;
    static readonly T_FLOAT: ZSTokenType;
    static readonly T_PREFIXED_INT: ZSTokenType;
    static readonly T_INT: ZSTokenType;
    static readonly T_STRING_DQ: ZSTokenType;
    static readonly T_STRING_DQ_WYSIWYG: ZSTokenType;
    static readonly T_STRING_SQ: ZSTokenType;
    static readonly T_STRING_SQ_WYSIWYG: ZSTokenType;
    static readonly T_AOPEN: ZSTokenType;
    static readonly T_ACLOSE: ZSTokenType;
    static readonly T_SQOPEN: ZSTokenType;
    static readonly T_SQCLOSE: ZSTokenType;
    static readonly T_DOT3: ZSTokenType;
    static readonly T_DOT2: ZSTokenType;
    static readonly T_DOT: ZSTokenType;
    static readonly T_COMMA: ZSTokenType;
    static readonly T_INCREMENT: ZSTokenType;
    static readonly T_ADDASSIGN: ZSTokenType;
    static readonly T_ADD: ZSTokenType;
    static readonly T_DECREMENT: ZSTokenType;
    static readonly T_SUBASSIGN: ZSTokenType;
    static readonly T_SUB: ZSTokenType;
    static readonly T_CATASSIGN: ZSTokenType;
    static readonly T_CAT: ZSTokenType;
    static readonly T_MULASSIGN: ZSTokenType;
    static readonly T_MUL: ZSTokenType;
    static readonly T_DIVASSIGN: ZSTokenType;
    static readonly T_DIV: ZSTokenType;
    static readonly T_MODASSIGN: ZSTokenType;
    static readonly T_MOD: ZSTokenType;
    static readonly T_ORASSIGN: ZSTokenType;
    static readonly T_OROR: ZSTokenType;
    static readonly T_OR: ZSTokenType;
    static readonly T_ANDASSIGN: ZSTokenType;
    static readonly T_ANDAND: ZSTokenType;
    static readonly T_AND: ZSTokenType;
    static readonly T_XORASSIGN: ZSTokenType;
    static readonly T_XOR: ZSTokenType;
    static readonly T_COALESCE: ZSTokenType;
    static readonly T_OPTCALL: ZSTokenType;
    static readonly T_QUEST: ZSTokenType;
    static readonly T_COLON: ZSTokenType;
    static readonly T_BROPEN: ZSTokenType;
    static readonly T_BRCLOSE: ZSTokenType;
    static readonly T_SEMICOLON: ZSTokenType;
    static readonly T_LESSEQ: ZSTokenType;
    static readonly T_SHLASSIGN: ZSTokenType;
    static readonly T_SHL: ZSTokenType;
    static readonly T_LESS: ZSTokenType;
    static readonly T_GREATEREQ: ZSTokenType;
    static readonly T_USHR: ZSTokenType;
    static readonly T_USHRASSIGN: ZSTokenType;
    static readonly T_SHRASSIGN: ZSTokenType;
    static readonly T_SHR: ZSTokenType;
    static readonly T_GREATER: ZSTokenType;
    static readonly T_LAMBDA: ZSTokenType;
    static readonly T_EQUAL3: ZSTokenType;
    static readonly T_EQUAL2: ZSTokenType;
    static readonly T_ASSIGN: ZSTokenType;
    static readonly T_NOTEQUAL2: ZSTokenType;
    static readonly T_NOTEQUAL: ZSTokenType;
    static readonly T_NOT: ZSTokenType;
    static readonly T_DOLLAR: ZSTokenType;
    static readonly T_BACKTICK: ZSTokenType;
    static readonly K_IMPORT: ZSTokenType;
    static readonly K_ALIAS: ZSTokenType;
    static readonly K_CLASS: ZSTokenType;
    static readonly K_FUNCTION: ZSTokenType;
    static readonly K_INTERFACE: ZSTokenType;
    static readonly K_ENUM: ZSTokenType;
    static readonly K_STRUCT: ZSTokenType;
    static readonly K_EXPAND: ZSTokenType;
    static readonly K_VARIANT: ZSTokenType;
    static readonly K_ABSTRACT: ZSTokenType;
    static readonly K_FINAL: ZSTokenType;
    static readonly K_OVERRIDE: ZSTokenType;
    static readonly K_CONST: ZSTokenType;
    static readonly K_PRIVATE: ZSTokenType;
    static readonly K_PUBLIC: ZSTokenType;
    static readonly K_EXPORT: ZSTokenType;
    static readonly K_INTERNAL: ZSTokenType;
    static readonly K_STATIC: ZSTokenType;
    static readonly K_PROTECTED: ZSTokenType;
    static readonly K_IMPLICIT: ZSTokenType;
    static readonly K_VIRTUAL: ZSTokenType;
    static readonly K_EXTERN: ZSTokenType;
    static readonly K_IMMUTABLE: ZSTokenType;
    static readonly K_VAL: ZSTokenType;
    static readonly K_VAR: ZSTokenType;
    static readonly K_GET: ZSTokenType;
    static readonly K_IMPLEMENTS: ZSTokenType;
    static readonly K_SET: ZSTokenType;
    static readonly K_VOID: ZSTokenType;
    static readonly K_BOOL: ZSTokenType;
    static readonly K_BYTE: ZSTokenType;
    static readonly K_SBYTE: ZSTokenType;
    static readonly K_SHORT: ZSTokenType;
    static readonly K_USHORT: ZSTokenType;
    static readonly K_INT: ZSTokenType;
    static readonly K_UINT: ZSTokenType;
    static readonly K_LONG: ZSTokenType;
    static readonly K_ULONG: ZSTokenType;
    static readonly K_USIZE: ZSTokenType;
    static readonly K_FLOAT: ZSTokenType;
    static readonly K_DOUBLE: ZSTokenType;
    static readonly K_CHAR: ZSTokenType;
    static readonly K_STRING: ZSTokenType;
    static readonly K_IF: ZSTokenType;
    static readonly K_ELSE: ZSTokenType;
    static readonly K_DO: ZSTokenType;
    static readonly K_WHILE: ZSTokenType;
    static readonly K_FOR: ZSTokenType;
    static readonly K_THROW: ZSTokenType;
    static readonly K_PANIC: ZSTokenType;
    static readonly K_LOCK: ZSTokenType;
    static readonly K_TRY: ZSTokenType;
    static readonly K_CATCH: ZSTokenType;
    static readonly K_FINALLY: ZSTokenType;
    static readonly K_RETURN: ZSTokenType;
    static readonly K_BREAK: ZSTokenType;
    static readonly K_CONTINUE: ZSTokenType;
    static readonly K_SWITCH: ZSTokenType;
    static readonly K_CASE: ZSTokenType;
    static readonly K_DEFAULT: ZSTokenType;
    static readonly K_IN: ZSTokenType;
    static readonly K_IS: ZSTokenType;
    static readonly K_AS: ZSTokenType;
    static readonly K_MATCH: ZSTokenType;
    static readonly K_THROWS: ZSTokenType;
    static readonly K_SUPER: ZSTokenType;
    static readonly K_THIS: ZSTokenType;
    static readonly K_NULL: ZSTokenType;
    static readonly K_TRUE: ZSTokenType;
    static readonly K_FALSE: ZSTokenType;
    static readonly K_NEW: ZSTokenType;
    static readonly INVALID: ZSTokenType;
    static readonly EOF: ZSTokenType;
    get regexp(): string;
    isWhitespace(): boolean;
    static valueOf(name: string): ZSTokenType;
    static values(): ZSTokenType[];
  }

}

declare module 'org.openzen.zenscript.lexer.DFA' {
  class DFAState<T = any> {
    addTransition(label: number, next: DFAState<T>): void;
    get final(): T;
    set final(finalCode: T);
  }

}

declare module 'org.openzen.zenscript.parser' {
  import { ParsedExpression, ParsedCallArguments } from 'org.openzen.zenscript.parser.expression';
  import { CodePosition, SourceFile, CompileException } from 'org.openzen.zencode.shared';
  import { ZSTokenParser, ParseException } from 'org.openzen.zenscript.lexer';
  import { GlobalTypeRegistry, ISymbol } from 'org.openzen.zenscript.codemodel.type';
  import { FunctionalMemberRef } from 'org.openzen.zenscript.codemodel.member.ref';
  import { File, InputStream } from 'java.io';
  import { List, Map } from 'java.util';
  import { SemanticModule, ModuleSpace, FunctionParameter, HighLevelDefinition, FunctionHeader, PackageDefinitions, ScriptBlock } from 'org.openzen.zenscript.codemodel';
  import { ParserLogger } from 'org.openzen.zenscript.parser.logger';
  import { ZSPackage, ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { MemberAnnotation, DefinitionAnnotation, StatementAnnotation, ParameterAnnotation } from 'org.openzen.zenscript.codemodel.annotations';
  import { IDefinitionMember } from 'org.openzen.zenscript.codemodel.member';
  import { BaseScope, StatementScope } from 'org.openzen.zenscript.codemodel.scope';
  import { Statement } from 'org.openzen.zenscript.codemodel.statement';
  import { CompilingPackage, CompilingType, TypeResolutionContext, ModuleTypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { CompileExceptionLogger } from 'org.openzen.zencode.shared.logging';
  import { TypeMemberPreparer } from 'org.openzen.zenscript.codemodel.type.member';
  import { ParsedDefinitionMember } from 'org.openzen.zenscript.parser.member';

  class BracketExpressionParser {
    parse(var1: CodePosition, var2: ZSTokenParser): ParsedExpression;
  }


  interface EscapableBracketParser extends BracketExpressionParser {}
  class EscapableBracketParser extends BracketExpressionParser {
    constructor(registry: GlobalTypeRegistry, method: FunctionalMemberRef);
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface FolderPackage extends ModuleLoader {}
  class FolderPackage extends ModuleLoader {
    constructor(file: File);
    getFiles(parent: File, files: File[]): void;
    loadModule(space: ModuleSpace, name: string, bracketParser: BracketExpressionParser, dependencies: SemanticModule[], scriptParameters: FunctionParameter[], logger: ParserLogger): SemanticModule;
    loadModule(space: ModuleSpace, name: string, bracketParser: BracketExpressionParser, dependencies: SemanticModule[], scriptParameters: FunctionParameter[], pkg: ZSPackage, logger: ParserLogger): SemanticModule;
  }


  class ModuleLoader {
    loadModule(var1: ModuleSpace, var2: string, var3: BracketExpressionParser, var4: SemanticModule[], var5: FunctionParameter[], var6: ZSPackage, var7: ParserLogger): SemanticModule;
  }


  class ParsedAnnotation {
    static readonly NONE: ParsedAnnotation[];
    readonly position: CodePosition;
    readonly type: IParsedType;
    readonly arguments: ParsedCallArguments;
    constructor(position: CodePosition, type: IParsedType, arguments: ParsedCallArguments);
    static compileForDefinition(annotations: ParsedAnnotation[], definition: HighLevelDefinition, scope: BaseScope): DefinitionAnnotation[];
    compileForDefinition(definition: HighLevelDefinition, scope: BaseScope): DefinitionAnnotation;
    static compileForMember(annotations: ParsedAnnotation[], member: IDefinitionMember, scope: BaseScope): MemberAnnotation[];
    compileForMember(member: IDefinitionMember, scope: BaseScope): MemberAnnotation;
    static compileForParameter(annotations: ParsedAnnotation[], header: FunctionHeader, parameter: FunctionParameter, scope: BaseScope): ParameterAnnotation[];
    compileForParameter(header: FunctionHeader, parameter: FunctionParameter, scope: BaseScope): ParameterAnnotation;
    static compileForStatement(annotations: ParsedAnnotation[], statement: Statement, scope: StatementScope): StatementAnnotation[];
    compileForStatement(statement: Statement, scope: StatementScope): StatementAnnotation;
    static parseAnnotations(parser: ZSTokenParser): ParsedAnnotation[];
  }


  class ParsedDefinition {
    readonly position: CodePosition;
    readonly modifiers: number;
    readonly annotations: ParsedAnnotation[];
    readonly pkg: CompilingPackage;
    constructor(position: CodePosition, modifiers: number, pkg: CompilingPackage, annotations: ParsedAnnotation[]);
    compile(var1: BaseScope): void;
    get compiled(): HighLevelDefinition;
    get modifiers(): number;
    get name(): string;
    get position(): CodePosition;
    getCompiling(var1: TypeResolutionContext): CompilingType;
    linkTypes(var1: TypeResolutionContext): void;
    static parse(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedDefinition;
    registerMembers(var1: BaseScope, var2: PrecompilationState): void;
  }


  class ParsedFile {
    readonly file: SourceFile;
    constructor(file: SourceFile);
    compileCode(moduleContext: ModuleTypeResolutionContext, precompiler: PrecompilationState, rootPackage: ZSPackage, modulePackage: CompilingPackage, expansions: ExpansionDefinition[], scripts: ScriptBlock[], globals: Map<string, ISymbol>, scriptHeader: FunctionHeader, exceptionLogger: CompileExceptionLogger, importErrors: Map<string, CompileException>): void;
    static compileSyntaxToSemantic(dependencies: SemanticModule[], pkg: CompilingPackage, files: ParsedFile[], registry: ModuleSpace, parameters: FunctionParameter[], logger: ParserLogger): SemanticModule;
    compileTypes(moduleContext: ModuleTypeResolutionContext, rootPackage: ZSPackage, modulePackage: CompilingPackage, importErrors: Map<string, CompileException>): void;
    get errors(): ParseException[];
    hasErrors(): boolean;
    listDefinitions(definitions: PackageDefinitions): void;
    static parse(compilingPackage: CompilingPackage, bracketParser: BracketExpressionParser, file: File): ParsedFile;
    static parse(compilingPackage: CompilingPackage, bracketParser: BracketExpressionParser, filename: string, content: string): ParsedFile;
    static parse(compilingPackage: CompilingPackage, bracketParser: BracketExpressionParser, file: SourceFile): ParsedFile;
    static parse(compilingPackage: CompilingPackage, tokens: ZSTokenParser): ParsedFile;
    registerMembers(moduleContext: ModuleTypeResolutionContext, precompiler: PrecompilationState, rootPackage: ZSPackage, modulePackage: CompilingPackage, expansions: ExpansionDefinition[], globals: Map<string, ISymbol>, importErrors: Map<string, CompileException>): void;
    registerTypes(moduleContext: ModuleTypeResolutionContext, rootPackage: ZSPackage, modulePackage: CompilingPackage, importErrors: Map<string, CompileException>): void;
  }


  class ParsedImport {
    readonly position: CodePosition;
    constructor(position: CodePosition, relative: boolean, importName: string[], rename: string);
    get name(): string;
    get path(): string[];
    isRelative(): boolean;
    static parse(position: CodePosition, tokens: ZSTokenParser): ParsedImport;
    toString(): string;
  }


  interface PrecompilationState extends TypeMemberPreparer {}
  class PrecompilationState extends TypeMemberPreparer {
    end(member: ParsedDefinitionMember): void;
    precompile(member: IDefinitionMember): boolean;
    prepare(member: IDefinitionMember): void;
    register(definitionScope: BaseScope, member: ParsedDefinitionMember): void;
  }


  interface PrefixedBracketParser extends BracketExpressionParser {}
  class PrefixedBracketParser extends BracketExpressionParser {
    constructor(defaultParser: BracketExpressionParser);
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
    register(name: string, parser: BracketExpressionParser): void;
  }


  interface SimpleBracketParser extends BracketExpressionParser {}
  class SimpleBracketParser extends BracketExpressionParser {
    constructor(registry: GlobalTypeRegistry, method: FunctionalMemberRef);
    parse(position: CodePosition, tokens: ZSTokenParser): ParsedExpression;
  }


  interface ZippedPackage extends ModuleLoader {}
  class ZippedPackage extends ModuleLoader {
    constructor(input: InputStream);
    loadModule(space: ModuleSpace, name: string, bracketParser: BracketExpressionParser, dependencies: SemanticModule[], scriptParameters: FunctionParameter[], pkg: ZSPackage, logger: ParserLogger): SemanticModule;
  }

}

declare module 'org.openzen.zenscript.parser.definitions' {
  import { ParsedDefinition, ParsedAnnotation, PrecompilationState } from 'org.openzen.zenscript.parser';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { CompilingPackage, TypeResolutionContext, CompilingType } from 'org.openzen.zenscript.codemodel.context';
  import { ParsedDefinitionMember } from 'org.openzen.zenscript.parser.member';
  import { BaseScope, ExpressionScope } from 'org.openzen.zenscript.codemodel.scope';
  import { List } from 'java.util';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { HighLevelDefinition, FunctionHeader, FunctionParameter } from 'org.openzen.zenscript.codemodel';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { EnumDefinition, VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { EnumConstantMember } from 'org.openzen.zenscript.codemodel.member';
  import { DefinitionTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { TypeParameterBound, TypeParameter } from 'org.openzen.zenscript.codemodel.generic';
  import { Option } from 'org.openzen.zenscript.codemodel.definition.VariantDefinition';

  interface BaseParsedDefinition extends ParsedDefinition {}
  class BaseParsedDefinition extends ParsedDefinition {
    constructor(position: CodePosition, modifiers: number, pkg: CompilingPackage, annotations: ParsedAnnotation[]);
    addMember(member: ParsedDefinitionMember): void;
    compile(scope: BaseScope): void;
    getCompiling(context: TypeResolutionContext): CompilingType;
    linkTypes(context: TypeResolutionContext): void;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  interface ParsedAlias extends ParsedDefinition {}
  class ParsedAlias extends ParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, parameters: ParsedTypeParameter[], type: IParsedType, outerDefinition: HighLevelDefinition);
    compile(scope: BaseScope): void;
    get compiled(): HighLevelDefinition;
    getCompiling(context: TypeResolutionContext): CompilingType;
    linkTypes(context: TypeResolutionContext): void;
    static parseAlias(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedAlias;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  interface ParsedClass extends BaseParsedDefinition {}
  class ParsedClass extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, parameters: ParsedTypeParameter[], superclass: IParsedType, outerDefinition: HighLevelDefinition);
    get compiled(): HighLevelDefinition;
    static parseClass(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedClass;
  }


  interface ParsedEnum extends BaseParsedDefinition {}
  class ParsedEnum extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, outerDefinition: HighLevelDefinition, asType: IParsedType);
    addEnumValue(value: ParsedEnumConstant): void;
    compile(scope: BaseScope): void;
    get compiled(): HighLevelDefinition;
    static parseEnum(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedEnum;
  }


  class ParsedEnumConstant {
    readonly position: CodePosition;
    readonly name: string;
    readonly arguments: List;
    readonly value: ParsedExpression;
    constructor(position: CodePosition, definition: HighLevelDefinition, name: string, value: number, arguments: ParsedExpression[], expressionValue: ParsedExpression);
    compileCode(type: DefinitionTypeID, scope: ExpressionScope): void;
    get compiled(): EnumConstantMember;
    static parse(tokens: ZSTokenParser, definition: EnumDefinition, value: number): ParsedEnumConstant;
  }


  interface ParsedExpansion extends BaseParsedDefinition {}
  class ParsedExpansion extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], genericParameters: ParsedTypeParameter[], target: IParsedType, outerDefinition: HighLevelDefinition);
    get compiled(): HighLevelDefinition;
    linkTypesLocal(context: TypeResolutionContext): void;
    static parseExpansion(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedExpansion;
  }


  interface ParsedFunction extends ParsedDefinition {}
  class ParsedFunction extends ParsedDefinition {
    compile(scope: BaseScope): void;
    get compiled(): HighLevelDefinition;
    getCompiling(context: TypeResolutionContext): CompilingType;
    linkTypes(context: TypeResolutionContext): void;
    static parseFunction(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], parser: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedFunction;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  class ParsedFunctionHeader {
    readonly position: CodePosition;
    readonly genericParameters: List;
    readonly parameters: List;
    readonly returnType: IParsedType;
    readonly thrownType: IParsedType;
    constructor(position: CodePosition, parameters: ParsedFunctionParameter[], returnType: IParsedType);

    constructor(position: CodePosition, genericParameters: ParsedTypeParameter[], parameters: ParsedFunctionParameter[], returnType: IParsedType, thrownType: IParsedType);
    compile(context: TypeResolutionContext): FunctionHeader;
    static parse(tokens: ZSTokenParser): ParsedFunctionHeader;
  }


  class ParsedFunctionParameter {
    readonly annotations: ParsedAnnotation[];
    readonly name: string;
    readonly type: IParsedType;
    readonly defaultValue: ParsedExpression;
    readonly variadic: boolean;
    constructor(annotations: ParsedAnnotation[], name: string, type: IParsedType, defaultValue: ParsedExpression, variadic: boolean);
    compile(context: TypeResolutionContext): FunctionParameter;
    compileDefaultValue(scope: BaseScope, state: PrecompilationState): void;
  }


  class ParsedGenericBound {
    compile(var1: TypeResolutionContext): TypeParameterBound;
  }


  interface ParsedInterface extends BaseParsedDefinition {}
  class ParsedInterface extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, typeParameters: ParsedTypeParameter[], superInterfaces: IParsedType[], outerDefinition: HighLevelDefinition);
    get compiled(): HighLevelDefinition;
    linkTypesLocal(context: TypeResolutionContext): void;
    static parseInterface(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedInterface;
  }


  interface ParsedStruct extends BaseParsedDefinition {}
  class ParsedStruct extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, genericParameters: ParsedTypeParameter[], outerDefinition: HighLevelDefinition);
    get compiled(): HighLevelDefinition;
    static parseStruct(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedStruct;
  }


  interface ParsedSuperBound extends ParsedGenericBound {}
  class ParsedSuperBound extends ParsedGenericBound {
    readonly type: IParsedType;
    constructor(type: IParsedType);
    compile(context: TypeResolutionContext): TypeParameterBound;
  }


  interface ParsedTypeBound extends ParsedGenericBound {}
  class ParsedTypeBound extends ParsedGenericBound {
    readonly position: CodePosition;
    readonly type: IParsedType;
    constructor(position: CodePosition, type: IParsedType);
    compile(context: TypeResolutionContext): TypeParameterBound;
  }


  class ParsedTypeParameter {
    readonly position: CodePosition;
    readonly name: string;
    readonly bounds: List;
    readonly compiled: TypeParameter;
    constructor(position: CodePosition, name: string, bounds: ParsedGenericBound[]);
    static compile(context: TypeResolutionContext, compiled: TypeParameter[], parameters: ParsedTypeParameter[]): void;
    static getCompiled(parameters: ParsedTypeParameter[]): TypeParameter[];
    static parse(tokens: ZSTokenParser): ParsedTypeParameter;
    static parseAll(tokens: ZSTokenParser): ParsedTypeParameter[];
  }


  interface ParsedVariant extends BaseParsedDefinition {}
  class ParsedVariant extends BaseParsedDefinition {
    constructor(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], name: string, typeParameters: ParsedTypeParameter[], outerDefinition: HighLevelDefinition);
    addVariant(value: ParsedVariantOption): void;
    get compiled(): HighLevelDefinition;
    linkTypesLocal(context: TypeResolutionContext): void;
    static parseVariant(pkg: CompilingPackage, position: CodePosition, modifiers: number, annotations: ParsedAnnotation[], tokens: ZSTokenParser, outerDefinition: HighLevelDefinition): ParsedVariant;
  }


  class ParsedVariantOption {
    readonly position: CodePosition;
    readonly name: string;
    readonly ordinal: number;
    readonly types: List;
    constructor(position: CodePosition, name: string, ordinal: number, types: IParsedType[]);
    compile(variant: VariantDefinition, context: TypeResolutionContext): Option;
  }

}

declare module 'org.openzen.zenscript.parser.expression' {
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { IPartialExpression } from 'org.openzen.zenscript.codemodel.partial';
  import { ExpressionScope, BaseScope } from 'org.openzen.zenscript.codemodel.scope';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { ParsingOptions } from 'org.openzen.zenscript.parser.expression.ParsedExpression';
  import { Expression } from 'org.openzen.zenscript.codemodel.expression';
  import { SwitchValue } from 'org.openzen.zenscript.codemodel.expression.switchvalue';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { ParsedFunctionHeader, ParsedFunctionParameter } from 'org.openzen.zenscript.parser.definitions';
  import { List } from 'java.util';
  import { OperatorType, CompareType } from 'org.openzen.zenscript.codemodel';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { ParsedFunctionBody } from 'org.openzen.zenscript.parser.statements';
  import { Case } from 'org.openzen.zenscript.parser.expression.ParsedMatchExpression';

  interface ParsedDollarExpression extends ParsedExpression {}
  class ParsedDollarExpression extends ParsedExpression {
    constructor(position: CodePosition);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  class ParsedExpression {
    readonly position: CodePosition;
    constructor(position: CodePosition);
    compile(var1: ExpressionScope): IPartialExpression;
    compileKey(scope: ExpressionScope): Expression;
    compileToSwitchValue(type: TypeID, scope: ExpressionScope): SwitchValue;
    hasStrongType(): boolean;
    isCompatibleWith(scope: BaseScope, type: TypeID): boolean;
    static parse(parser: ZSTokenParser): ParsedExpression;
    static parse(parser: ZSTokenParser, options: ParsingOptions): ParsedExpression;
    toLambdaHeader(): ParsedFunctionHeader;
    toLambdaParameter(): ParsedFunctionParameter;
  }


  interface ParsedExpressionAndAnd extends ParsedExpression {}
  class ParsedExpressionAndAnd extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionArray extends ParsedExpression {}
  class ParsedExpressionArray extends ParsedExpression {
    static readonly compileOverrides: List;
    readonly contents: List;
    constructor(position: CodePosition, contents: ParsedExpression[]);
    compile(scope: ExpressionScope): IPartialExpression;
    compileKey(scope: ExpressionScope): Expression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionAssign extends ParsedExpression {}
  class ParsedExpressionAssign extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionBinary extends ParsedExpression {}
  class ParsedExpressionBinary extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression, operator: OperatorType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionBool extends ParsedExpression {}
  class ParsedExpressionBool extends ParsedExpression {
    constructor(position: CodePosition, value: boolean);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionBracket extends ParsedExpression {}
  class ParsedExpressionBracket extends ParsedExpression {
    expressions: List;
    constructor(position: CodePosition, expressions: ParsedExpression[]);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
    toLambdaHeader(): ParsedFunctionHeader;
  }


  interface ParsedExpressionCall extends ParsedExpression {}
  class ParsedExpressionCall extends ParsedExpression {
    constructor(position: CodePosition, receiver: ParsedExpression, arguments: ParsedCallArguments);
    compile(scope: ExpressionScope): IPartialExpression;
    compileToSwitchValue(type: TypeID, scope: ExpressionScope): SwitchValue;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionCast extends ParsedExpression {}
  class ParsedExpressionCast extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression, type: IParsedType, optional: boolean);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
    toLambdaHeader(): ParsedFunctionHeader;
    toLambdaParameter(): ParsedFunctionParameter;
  }


  interface ParsedExpressionCoalesce extends ParsedExpression {}
  class ParsedExpressionCoalesce extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionCompare extends ParsedExpression {}
  class ParsedExpressionCompare extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression, type: CompareType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionConditional extends ParsedExpression {}
  class ParsedExpressionConditional extends ParsedExpression {
    constructor(position: CodePosition, condition: ParsedExpression, ifThen: ParsedExpression, ifElse: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionFloat extends ParsedExpression {}
  class ParsedExpressionFloat extends ParsedExpression {
    readonly value: number;
    readonly suffix: string;
    constructor(position: CodePosition, value: string);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionFunction extends ParsedExpression {}
  class ParsedExpressionFunction extends ParsedExpression {
    readonly header: ParsedFunctionHeader;
    readonly body: ParsedFunctionBody;
    constructor(position: CodePosition, header: ParsedFunctionHeader, body: ParsedFunctionBody);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
    isCompatibleWith(scope: BaseScope, type: TypeID): boolean;
  }


  interface ParsedExpressionIndex extends ParsedExpression {}
  class ParsedExpressionIndex extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression, indexes: ParsedExpression[]);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionInt extends ParsedExpression {}
  class ParsedExpressionInt extends ParsedExpression {
    readonly negative: boolean;
    readonly value: number;
    readonly suffix: string;
    constructor(position: CodePosition, value: string);
    compile(scope: ExpressionScope): Expression;
    compileToSwitchValue(type: TypeID, scope: ExpressionScope): SwitchValue;
    hasStrongType(): boolean;
    static parsePrefixed(position: CodePosition, value: string): ParsedExpressionInt;
  }


  interface ParsedExpressionIs extends ParsedExpression {}
  class ParsedExpressionIs extends ParsedExpression {
    constructor(position: CodePosition, expression: ParsedExpression, type: IParsedType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionMap extends ParsedExpression {}
  class ParsedExpressionMap extends ParsedExpression {
    static readonly compileOverrides: List;
    readonly keys: List;
    readonly values: List;
    constructor(position: CodePosition, keys: ParsedExpression[], values: ParsedExpression[]);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionMember extends ParsedExpression {}
  class ParsedExpressionMember extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression, member: string, genericParameters: IParsedType[]);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionNull extends ParsedExpression {}
  class ParsedExpressionNull extends ParsedExpression {
    constructor(position: CodePosition);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionOpAssign extends ParsedExpression {}
  class ParsedExpressionOpAssign extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression, operator: OperatorType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionOrOr extends ParsedExpression {}
  class ParsedExpressionOrOr extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionOuter extends ParsedExpression {}
  class ParsedExpressionOuter extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionPostCall extends ParsedExpression {}
  class ParsedExpressionPostCall extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression, operator: OperatorType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionRange extends ParsedExpression {}
  class ParsedExpressionRange extends ParsedExpression {
    constructor(position: CodePosition, from: ParsedExpression, to: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionSame extends ParsedExpression {}
  class ParsedExpressionSame extends ParsedExpression {
    constructor(position: CodePosition, left: ParsedExpression, right: ParsedExpression, inverse: boolean);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionString extends ParsedExpression {}
  class ParsedExpressionString extends ParsedExpression {
    readonly value: string;
    readonly singleQuote: boolean;
    constructor(position: CodePosition, value: string, singleQuote: boolean);
    compile(scope: ExpressionScope): IPartialExpression;
    compileToSwitchValue(type: TypeID, scope: ExpressionScope): SwitchValue;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionSuper extends ParsedExpression {}
  class ParsedExpressionSuper extends ParsedExpression {
    constructor(position: CodePosition);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionThis extends ParsedExpression {}
  class ParsedExpressionThis extends ParsedExpression {
    constructor(position: CodePosition);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionUnary extends ParsedExpression {}
  class ParsedExpressionUnary extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression, operator: OperatorType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedExpressionVariable extends ParsedExpression {}
  class ParsedExpressionVariable extends ParsedExpression {
    readonly name: string;
    constructor(position: CodePosition, name: string, typeArguments: IParsedType[]);
    compile(scope: ExpressionScope): IPartialExpression;
    compileKey(scope: ExpressionScope): Expression;
    compileToSwitchValue(type: TypeID, scope: ExpressionScope): SwitchValue;
    hasStrongType(): boolean;
    toLambdaHeader(): ParsedFunctionHeader;
    toLambdaParameter(): ParsedFunctionParameter;
  }


  interface ParsedLocalVariableExpression extends ParsedExpression {}
  class ParsedLocalVariableExpression extends ParsedExpression {
    constructor(position: CodePosition, name: string);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedMatchExpression extends ParsedExpression {}
  class ParsedMatchExpression extends ParsedExpression {
    readonly value: ParsedExpression;
    readonly cases: List;
    constructor(position: CodePosition, value: ParsedExpression, cases: Case[]);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedNewExpression extends ParsedExpression {}
  class ParsedNewExpression extends ParsedExpression {
    constructor(position: CodePosition, type: IParsedType, arguments: ParsedCallArguments);
    static compile(position: CodePosition, type: TypeID, arguments: ParsedCallArguments, scope: ExpressionScope): Expression;
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedPanicExpression extends ParsedExpression {}
  class ParsedPanicExpression extends ParsedExpression {
    readonly value: ParsedExpression;
    constructor(position: CodePosition, value: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedThrowExpression extends ParsedExpression {}
  class ParsedThrowExpression extends ParsedExpression {
    readonly value: ParsedExpression;
    constructor(position: CodePosition, value: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedTryConvertExpression extends ParsedExpression {}
  class ParsedTryConvertExpression extends ParsedExpression {
    constructor(position: CodePosition, value: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedTryRethrowExpression extends ParsedExpression {}
  class ParsedTryRethrowExpression extends ParsedExpression {
    constructor(position: CodePosition, source: ParsedExpression);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }


  interface ParsedTypeExpression extends ParsedExpression {}
  class ParsedTypeExpression extends ParsedExpression {
    constructor(position: CodePosition, type: IParsedType);
    compile(scope: ExpressionScope): IPartialExpression;
    hasStrongType(): boolean;
  }

}

declare module 'org.openzen.zenscript.parser.expression.ParsedExpression' {
  class ParsingOptions {
    static readonly DEFAULT: ParsingOptions;
    readonly allowLambda: boolean;
    constructor(allowLambda: boolean);
  }

}

declare module 'org.openzen.zenscript.parser.expression.ParsedMatchExpression' {
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { Case as org_openzen_zenscript_codemodel_expression_matchexpression_Case } from 'org.openzen.zenscript.codemodel.expression.MatchExpression';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { ExpressionScope } from 'org.openzen.zenscript.codemodel.scope';

  class Case {
    readonly name: ParsedExpression;
    readonly value: ParsedExpression;
    constructor(name: ParsedExpression, body: ParsedExpression);
    compile(valueType: TypeID, scope: ExpressionScope): org_openzen_zenscript_codemodel_expression_matchexpression_Case;
  }

}

declare module 'org.openzen.zenscript.parser.logger' {
  import { IZSLogger, CompileExceptionLogger } from 'org.openzen.zencode.shared.logging';
  import { ParseException } from 'org.openzen.zenscript.lexer';

  interface ParserLogger extends IZSLogger, CompileExceptionLogger {}
  class ParserLogger extends IZSLogger {
    logParseException(exception: ParseException): void;
  }

}

declare module 'org.openzen.zenscript.parser.member' {
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { HighLevelDefinition, OperatorType } from 'org.openzen.zenscript.codemodel';
  import { ParsedAnnotation, ParsedDefinition, PrecompilationState } from 'org.openzen.zenscript.parser';
  import { ParsedFunctionHeader } from 'org.openzen.zenscript.parser.definitions';
  import { ParsedFunctionBody, ParsedStatement } from 'org.openzen.zenscript.parser.statements';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { FunctionalMember, ConstMember, IDefinitionMember, DestructorMember, FieldMember, GetterMember, ImplementationMember, InnerDefinitionMember, IteratorMember, SetterMember } from 'org.openzen.zenscript.codemodel.member';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { BaseScope } from 'org.openzen.zenscript.codemodel.scope';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { Map } from 'java.util';

  interface ParsedCaller extends ParsedFunctionalMember {}
  class ParsedCaller extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], header: ParsedFunctionHeader, body: ParsedFunctionBody);
    get compiled(): FunctionalMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedCaster extends ParsedFunctionalMember {}
  class ParsedCaster extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], type: IParsedType, body: ParsedFunctionBody);
    get compiled(): FunctionalMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedConst extends ParsedDefinitionMember {}
  class ParsedConst extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, annotations: ParsedAnnotation[], name: string, type: IParsedType, expression: ParsedExpression);
    compile(scope: BaseScope): void;
    get compiled(): ConstMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedConstructor extends ParsedFunctionalMember {}
  class ParsedConstructor extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], header: ParsedFunctionHeader, body: ParsedFunctionBody);
    get compiled(): FunctionalMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  class ParsedDefinitionMember {
    readonly definition: HighLevelDefinition;
    readonly annotations: ParsedAnnotation[];
    constructor(definition: HighLevelDefinition, annotations: ParsedAnnotation[]);
    compile(var1: BaseScope): void;
    get compiled(): IDefinitionMember;
    linkTypes(var1: TypeResolutionContext): void;
    static parse(tokens: ZSTokenParser, forDefinition: ParsedDefinition, forImplementation: ParsedImplementation): ParsedDefinitionMember;
    registerInnerTypes(innerTypes: Map<string, ParsedDefinition>): void;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  interface ParsedDestructor extends ParsedFunctionalMember {}
  class ParsedDestructor extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], body: ParsedFunctionBody);
    get compiled(): DestructorMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedField extends ParsedDefinitionMember {}
  class ParsedField extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, annotations: ParsedAnnotation[], name: string, type: IParsedType, expression: ParsedExpression, isFinal: boolean, autoGetter: number, autoSetter: number);
    compile(scope: BaseScope): void;
    get compiled(): FieldMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedFunctionalMember extends ParsedDefinitionMember {}
  class ParsedFunctionalMember extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], body: ParsedFunctionBody);
    compile(scope: BaseScope): void;
    get compiled(): FunctionalMember;
  }


  interface ParsedGetter extends ParsedDefinitionMember {}
  class ParsedGetter extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], name: string, type: IParsedType, body: ParsedFunctionBody);
    compile(scope: BaseScope): void;
    get compiled(): GetterMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedImplementation extends ParsedDefinitionMember {}
  class ParsedImplementation extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, annotations: ParsedAnnotation[], type: IParsedType);
    addMember(member: ParsedDefinitionMember): void;
    compile(scope: BaseScope): void;
    get compiled(): ImplementationMember;
    linkTypes(context: TypeResolutionContext): void;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  interface ParsedInnerDefinition extends ParsedDefinitionMember {}
  class ParsedInnerDefinition extends ParsedDefinitionMember {
    constructor(outer: HighLevelDefinition, definition: ParsedDefinition);
    compile(scope: BaseScope): void;
    get compiled(): InnerDefinitionMember;
    linkTypes(context: TypeResolutionContext): void;
    registerInnerTypes(inner: Map<string, ParsedDefinition>): void;
    registerMembers(scope: BaseScope, state: PrecompilationState): void;
  }


  interface ParsedIterator extends ParsedDefinitionMember {}
  class ParsedIterator extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, modifiers: number, annotations: ParsedAnnotation[], header: ParsedFunctionHeader, body: ParsedFunctionBody);
    compile(scope: BaseScope): void;
    get compiled(): IteratorMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedMethod extends ParsedFunctionalMember {}
  class ParsedMethod extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], name: string, header: ParsedFunctionHeader, body: ParsedFunctionBody);
    get compiled(): FunctionalMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedOperator extends ParsedFunctionalMember {}
  class ParsedOperator extends ParsedFunctionalMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], operator: OperatorType, header: ParsedFunctionHeader, body: ParsedFunctionBody);
    get compiled(): FunctionalMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedSetter extends ParsedDefinitionMember {}
  class ParsedSetter extends ParsedDefinitionMember {
    constructor(position: CodePosition, definition: HighLevelDefinition, implementation: ParsedImplementation, modifiers: number, annotations: ParsedAnnotation[], name: string, type: IParsedType, body: ParsedFunctionBody);
    compile(scope: BaseScope): void;
    get compiled(): SetterMember;
    linkTypes(context: TypeResolutionContext): void;
  }


  interface ParsedStaticInitializer extends ParsedDefinitionMember {}
  class ParsedStaticInitializer extends ParsedDefinitionMember {
    constructor(definition: HighLevelDefinition, position: CodePosition, annotations: ParsedAnnotation[], body: ParsedStatement);
    compile(scope: BaseScope): void;
    get compiled(): IDefinitionMember;
    linkTypes(context: TypeResolutionContext): void;
  }

}

declare module 'org.openzen.zenscript.parser.statements' {
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';
  import { CatchClause, Statement, SwitchCase } from 'org.openzen.zenscript.codemodel.statement';
  import { StatementScope } from 'org.openzen.zenscript.codemodel.scope';
  import { FunctionHeader, WhitespaceInfo, WhitespacePostComment } from 'org.openzen.zenscript.codemodel';
  import { ParsedExpression } from 'org.openzen.zenscript.parser.expression';
  import { ParsedAnnotation } from 'org.openzen.zenscript.parser';
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { List } from 'java.util';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';

  class ParsedCatchClause {
    readonly position: CodePosition;
    readonly exceptionName: string;
    readonly exceptionType: IParsedType;
    readonly content: ParsedStatement;
    constructor(position: CodePosition, exceptionName: string, exceptionType: IParsedType, content: ParsedStatement);
    compile(scope: StatementScope): CatchClause;
  }


  interface ParsedEmptyFunctionBody extends ParsedFunctionBody {}
  class ParsedEmptyFunctionBody extends ParsedFunctionBody {
    readonly position: CodePosition;
    constructor(position: CodePosition);
    compile(scope: StatementScope, header: FunctionHeader): Statement;
  }


  class ParsedFunctionBody {
    compile(var1: StatementScope, var2: FunctionHeader): Statement;
  }


  interface ParsedLambdaFunctionBody extends ParsedFunctionBody {}
  class ParsedLambdaFunctionBody extends ParsedFunctionBody {
    constructor(value: ParsedExpression);
    compile(scope: StatementScope, header: FunctionHeader): Statement;
  }


  class ParsedStatement {
    readonly position: CodePosition;
    readonly annotations: ParsedAnnotation[];
    readonly whitespace: WhitespaceInfo;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo);
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
    compile(var1: StatementScope): Statement;
    static parse(parser: ZSTokenParser): ParsedStatement;
    static parse(parser: ZSTokenParser, annotations: ParsedAnnotation[]): ParsedStatement;
    static parse(parser: ZSTokenParser, annotations: ParsedAnnotation[], isFirst: boolean): ParsedStatement;
    static parseBlock(parser: ZSTokenParser, annotations: ParsedAnnotation[], isFirst: boolean): ParsedStatementBlock;
    static parseFunctionBody(tokens: ZSTokenParser): ParsedFunctionBody;
    static parseLambdaBody(tokens: ZSTokenParser, inExpression: boolean): ParsedFunctionBody;
  }


  interface ParsedStatementBlock extends ParsedStatement {}
  class ParsedStatementBlock extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, postComment: WhitespacePostComment, statements: ParsedStatement[]);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementBreak extends ParsedStatement {}
  class ParsedStatementBreak extends ParsedStatement {
    readonly name: string;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, name: string);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementContinue extends ParsedStatement {}
  class ParsedStatementContinue extends ParsedStatement {
    readonly name: string;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, name: string);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementDoWhile extends ParsedStatement {}
  class ParsedStatementDoWhile extends ParsedStatement {
    readonly label: string;
    readonly content: ParsedStatement;
    readonly condition: ParsedExpression;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, label: string, content: ParsedStatement, condition: ParsedExpression);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementExpression extends ParsedStatement {}
  class ParsedStatementExpression extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, expression: ParsedExpression);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementForeach extends ParsedStatement {}
  class ParsedStatementForeach extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, varnames: string[], list: ParsedExpression, body: ParsedStatement);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementIf extends ParsedStatement {}
  class ParsedStatementIf extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, condition: ParsedExpression, onThen: ParsedStatement, onElse: ParsedStatement);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementLock extends ParsedStatement {}
  class ParsedStatementLock extends ParsedStatement {
    readonly object: ParsedExpression;
    readonly content: ParsedStatement;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, object: ParsedExpression, content: ParsedStatement);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementReturn extends ParsedStatement {}
  class ParsedStatementReturn extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, expression: ParsedExpression);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
    get expression(): ParsedExpression;
  }


  interface ParsedStatementsFunctionBody extends ParsedFunctionBody {}
  class ParsedStatementsFunctionBody extends ParsedFunctionBody {
    constructor(body: ParsedStatement);
    compile(scope: StatementScope, header: FunctionHeader): Statement;
  }


  interface ParsedStatementSwitch extends ParsedStatement {}
  class ParsedStatementSwitch extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, name: string, value: ParsedExpression, cases: ParsedSwitchCase[]);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementThrow extends ParsedStatement {}
  class ParsedStatementThrow extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, expression: ParsedExpression);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementTryCatch extends ParsedStatement {}
  class ParsedStatementTryCatch extends ParsedStatement {
    readonly resourceName: string;
    readonly resourceInitializer: ParsedExpression;
    readonly statement: ParsedStatement;
    readonly catchClauses: List;
    readonly finallyClause: ParsedStatement;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, resourceName: string, resourceInitializer: ParsedExpression, statement: ParsedStatement, catchClauses: ParsedCatchClause[], finallyClause: ParsedStatement);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementVar extends ParsedStatement {}
  class ParsedStatementVar extends ParsedStatement {
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, name: string, type: IParsedType, initializer: ParsedExpression, isFinal: boolean);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  interface ParsedStatementWhile extends ParsedStatement {}
  class ParsedStatementWhile extends ParsedStatement {
    readonly condition: ParsedExpression;
    readonly content: ParsedStatement;
    readonly label: string;
    constructor(position: CodePosition, annotations: ParsedAnnotation[], whitespace: WhitespaceInfo, label: string, condition: ParsedExpression, content: ParsedStatement);
    compile(scope: StatementScope): Statement;
    static compile(statements: ParsedStatement[], scope: StatementScope): Statement[];
  }


  class ParsedSwitchCase {
    readonly value: ParsedExpression;
    readonly statements: List;
    constructor(value: ParsedExpression);
    compile(type: TypeID, scope: StatementScope): SwitchCase;
  }

}

declare module 'org.openzen.zenscript.parser.type' {
  import { ZSTokenParser } from 'org.openzen.zenscript.lexer';
  import { List } from 'java.util';
  import { TypeID } from 'org.openzen.zenscript.codemodel.type';
  import { TypeResolutionContext } from 'org.openzen.zenscript.codemodel.context';
  import { AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { BaseScope } from 'org.openzen.zenscript.codemodel.scope';
  import { ParsedFunctionHeader, ParsedTypeParameter } from 'org.openzen.zenscript.parser.definitions';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { ParsedNamePart } from 'org.openzen.zenscript.parser.type.ParsedNamedType';
  import { Enum } from 'java.lang';

  class IParsedType {
    compile(var1: TypeResolutionContext): TypeID;
    compileAnnotation(scope: BaseScope): AnnotationDefinition;
    static compileList(typeParameters: IParsedType[], context: TypeResolutionContext): TypeID[];
    compileTypeArguments(scope: BaseScope): TypeID[];
    static compileTypes(typeParameters: IParsedType[], context: TypeResolutionContext): TypeID[];
    static parse(tokens: ZSTokenParser): IParsedType;
    static parseTypeArguments(tokens: ZSTokenParser): IParsedType[];
    static parseTypeArgumentsForCall(tokens: ZSTokenParser): IParsedType[];
    static tryParse(tokens: ZSTokenParser): IParsedType;
  }


  interface ParsedFunctionType extends IParsedType {}
  class ParsedFunctionType extends IParsedType {
    constructor(header: ParsedFunctionHeader);
    compile(context: TypeResolutionContext): TypeID;
  }


  interface ParsedNamedType extends IParsedType {}
  class ParsedNamedType extends IParsedType {
    readonly name: List;
    constructor(position: CodePosition, name: ParsedNamePart[]);
    compile(context: TypeResolutionContext): TypeID;
    compileAnnotation(scope: BaseScope): AnnotationDefinition;
    compileTypeArguments(scope: BaseScope): TypeID[];
    toString(): string;
  }


  interface ParsedOptionalType extends IParsedType {}
  class ParsedOptionalType extends IParsedType {
    constructor(type: IParsedType);
    compile(context: TypeResolutionContext): TypeID;
  }


  interface ParsedTypeArray extends IParsedType {}
  class ParsedTypeArray extends IParsedType {
    readonly baseType: IParsedType;
    readonly dimension: number;
    constructor(baseType: IParsedType, dimension: number);
    compile(context: TypeResolutionContext): TypeID;
  }


  interface ParsedTypeAssociative extends IParsedType {}
  class ParsedTypeAssociative extends IParsedType {
    readonly key: IParsedType;
    readonly value: IParsedType;
    constructor(key: IParsedType, value: IParsedType);
    compile(context: TypeResolutionContext): TypeID;
  }


  interface ParsedTypeBasic extends Enum<ParsedTypeBasic> {}
  class ParsedTypeBasic extends Enum<ParsedTypeBasic> {
    static readonly VOID: ParsedTypeBasic;
    static readonly BOOL: ParsedTypeBasic;
    static readonly BYTE: ParsedTypeBasic;
    static readonly SBYTE: ParsedTypeBasic;
    static readonly SHORT: ParsedTypeBasic;
    static readonly USHORT: ParsedTypeBasic;
    static readonly INT: ParsedTypeBasic;
    static readonly UINT: ParsedTypeBasic;
    static readonly LONG: ParsedTypeBasic;
    static readonly ULONG: ParsedTypeBasic;
    static readonly USIZE: ParsedTypeBasic;
    static readonly FLOAT: ParsedTypeBasic;
    static readonly DOUBLE: ParsedTypeBasic;
    static readonly CHAR: ParsedTypeBasic;
    static readonly STRING: ParsedTypeBasic;
    static readonly UNDETERMINED: ParsedTypeBasic;
    compile(context: TypeResolutionContext): TypeID;
    static valueOf(name: string): ParsedTypeBasic;
    static values(): ParsedTypeBasic[];
  }


  interface ParsedTypeGenericMap extends IParsedType {}
  class ParsedTypeGenericMap extends IParsedType {
    constructor(key: ParsedTypeParameter, value: IParsedType);
    compile(context: TypeResolutionContext): TypeID;
  }


  interface ParsedTypeRange extends IParsedType {}
  class ParsedTypeRange extends IParsedType {
    constructor(position: CodePosition, from: IParsedType, to: IParsedType);
    compile(context: TypeResolutionContext): TypeID;
  }

}

declare module 'org.openzen.zenscript.parser.type.ParsedNamedType' {
  import { List } from 'java.util';
  import { IParsedType } from 'org.openzen.zenscript.parser.type';

  class ParsedNamePart {
    readonly name: string;
    readonly typeArguments: List;
    constructor(name: string, genericArguments: IParsedType[]);
    toString(): string;
  }

}

declare module 'org.openzen.zenscript.validator.analysis' {
  import { FieldMember, EnumConstantMember } from 'org.openzen.zenscript.codemodel.member';
  import { VarStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { HighLevelDefinition, AccessScope, FunctionHeader } from 'org.openzen.zenscript.codemodel';

  class ExpressionScope {
    get accessScope(): AccessScope;
    get definition(): HighLevelDefinition;
    hasThis(): boolean;
    isConstructor(): boolean;
    isEnumConstantInitialized(var1: EnumConstantMember): boolean;
    isFieldInitialized(var1: FieldMember): boolean;
    isFirstStatement(): boolean;
    isLocalVariableInitialized(var1: VarStatement): boolean;
    isStaticInitializer(): boolean;
    markConstructorForwarded(): void;
  }


  class StatementScope {
    get accessScope(): AccessScope;
    get definition(): HighLevelDefinition;
    get functionHeader(): FunctionHeader;
    isConstructor(): boolean;
    isStatic(): boolean;
    isStaticInitializer(): boolean;
  }

}

declare module 'org.openzen.zenscript.validator.logger' {
  import { ValidationLogEntry } from 'org.openzen.zenscript.validator';
  import { IZSLogger } from 'org.openzen.zencode.shared.logging';

  class IZSValidationLogger {
    logValidationError(var1: ValidationLogEntry): void;
    logValidationLogEntry(entry: ValidationLogEntry): void;
    logValidationWarning(var1: ValidationLogEntry): void;
  }


  interface ValidatorLogger extends IZSValidationLogger, IZSLogger {}
  class ValidatorLogger extends IZSValidationLogger {
  }

}

declare module 'org.openzen.zenscript.validator' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Kind, Code } from 'org.openzen.zenscript.validator.ValidationLogEntry';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { GlobalTypeRegistry } from 'org.openzen.zenscript.codemodel.type';
  import { AnnotationDefinition } from 'org.openzen.zenscript.codemodel.annotations';
  import { ExpansionDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { SemanticModule, ScriptBlock, HighLevelDefinition } from 'org.openzen.zenscript.codemodel';
  import { ValidatorLogger } from 'org.openzen.zenscript.validator.logger';

  interface TypeContext extends Enum<TypeContext> {}
  class TypeContext extends Enum<TypeContext> {
    static readonly PARAMETER_TYPE: TypeContext;
    static readonly RETURN_TYPE: TypeContext;
    static readonly FIELD_TYPE: TypeContext;
    static readonly GETTER_TYPE: TypeContext;
    static readonly SETTER_TYPE: TypeContext;
    static readonly CASTER_TYPE: TypeContext;
    static readonly ITERATOR_TYPE: TypeContext;
    static readonly EXPANSION_TARGET_TYPE: TypeContext;
    static readonly OPTION_MEMBER_TYPE: TypeContext;
    static readonly CAST_TARGET_TYPE: TypeContext;
    static readonly TYPE_CHECK_TYPE: TypeContext;
    static readonly CONSTRUCTOR_TYPE: TypeContext;
    static valueOf(name: string): TypeContext;
    static values(): TypeContext[];
  }


  class ValidationLogEntry {
    readonly kind: Kind;
    readonly code: Code;
    readonly position: CodePosition;
    readonly message: string;
    constructor(kind: Kind, code: Code, position: CodePosition, message: string);
    toString(): string;
  }


  class ValidationSettings {
  }


  class Validator {
    readonly registry: GlobalTypeRegistry;
    readonly expansions: List;
    readonly annotations: AnnotationDefinition[];
    constructor(registry: GlobalTypeRegistry, expansions: ExpansionDefinition[], annotations: AnnotationDefinition[]);
    get log(): ValidationLogEntry[];
    hasErrors(): boolean;
    logError(code: Code, position: CodePosition, message: string): void;
    logWarning(code: Code, position: CodePosition, message: string): void;
    static validate(module: SemanticModule, logger: ValidatorLogger): SemanticModule;
    validate(script: ScriptBlock): void;
    validate(definition: HighLevelDefinition): void;
  }

}

declare module 'org.openzen.zenscript.validator.ValidationLogEntry' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface Kind extends Enum<Kind> {}
  class Kind extends Enum<Kind> {
    static readonly ERROR: Kind;
    static readonly WARNING: Kind;
    static valueOf(name: string): Kind;
    static values(): Kind[];
  }


  interface Code extends Enum<Code> {}
  class Code extends Enum<Code> {
    static readonly SUPERCLASS_NOT_A_CLASS: Code;
    static readonly SUPERCLASS_NOT_VIRTUAL: Code;
    static readonly INVALID_MODIFIER: Code;
    static readonly INVALID_IDENTIFIER: Code;
    static readonly DUPLICATE_FIELD_NAME: Code;
    static readonly DUPLICATE_MEMBER_NAME: Code;
    static readonly INVALID_TYPE: Code;
    static readonly DUPLICATE_PARAMETER_NAME: Code;
    static readonly INVALID_OPERAND_TYPE: Code;
    static readonly INVALID_TYPE_ARGUMENT: Code;
    static readonly INVALID_CALL_ARGUMENT: Code;
    static readonly VARIADIC_PARAMETER_MUST_BE_LAST: Code;
    static readonly CONSTRUCTOR_FORWARD_OUTSIDE_CONSTRUCTOR: Code;
    static readonly CONSTRUCTOR_FORWARD_NOT_FIRST_STATEMENT: Code;
    static readonly CONSTRUCTOR_FORWARD_MISSING: Code;
    static readonly DUPLICATE_CONSTRUCTOR: Code;
    static readonly DUPLICATE_METHOD: Code;
    static readonly BODY_REQUIRED: Code;
    static readonly INVALID_CONDITION_TYPE: Code;
    static readonly DUPLICATE_VARIABLE_NAME: Code;
    static readonly SCRIPT_CANNOT_RETURN: Code;
    static readonly INVALID_RETURN_TYPE: Code;
    static readonly TRY_CATCH_RESOURCE_REQUIRES_INITIALIZER: Code;
    static readonly TYPE_ALREADY_IMPLEMENTED: Code;
    static readonly THIS_IN_STATIC_SCOPE: Code;
    static readonly ENUM_CONSTANT_NOT_YET_INITIALIZED: Code;
    static readonly FIELD_NOT_YET_INITIALIZED: Code;
    static readonly LOCAL_VARIABLE_NOT_YET_INITIALIZED: Code;
    static readonly INVALID_SOURCE_TYPE: Code;
    static readonly SETTING_FINAL_FIELD: Code;
    static readonly SETTING_FINAL_VARIABLE: Code;
    static readonly INVALID_SUPERTYPE: Code;
    static readonly MULTIPLE_DESTRUCTORS: Code;
    static readonly PANIC_ARGUMENT_NO_STRING: Code;
    static readonly THROW_WITHOUT_THROWS: Code;
    static readonly DESTRUCTOR_CANNOT_THROW: Code;
    static readonly STATIC_INITIALIZER_CANNOT_THROW: Code;
    static readonly IMPLEMENTATION_NESTED: Code;
    static readonly OVERRIDE_MISSING_BASE: Code;
    static readonly INVALID_OVERRIDE: Code;
    static readonly SUPERTYPE_NOT_DESTRUCTIBLE: Code;
    static readonly INVALID_IMPLEMENTATION_TYPE: Code;
    static readonly INCOMPLETE_IMPLEMENTATION: Code;
    static readonly MATCHING_VARIANT_FIELD_INVALID: Code;
    static readonly DUPLICATE_DEFAULT_CASE: Code;
    static readonly DUPLICATE_CASE: Code;
    static readonly INCOMPLETE_MATCH: Code;
    static readonly INVALID_CASE: Code;
    static readonly INVALID_STORAGE_CAST: Code;
    static readonly INVALID_EXPRESSION: Code;
    static readonly INVALID_STATEMENT: Code;
    static readonly NO_ACCESS: Code;
    static readonly MUST_BE_STATIC: Code;
    static readonly MUST_NOT_BE_STATIC: Code;
    static valueOf(name: string): Code;
    static values(): Code[];
  }

}

declare module 'org.openzen.zenscript.validator.visitors' {
  import { Enum, Void, RuntimeException } from 'java.lang';
  import { List } from 'java.util';
  import { MemberVisitor, ConstMember, FieldMember, ConstructorMember, DestructorMember, MethodMember, GetterMember, SetterMember, EnumConstantMember, OperatorMember, CasterMember, IteratorMember, CallerMember, ImplementationMember, InnerDefinitionMember, StaticInitializerMember } from 'org.openzen.zenscript.codemodel.member';
  import { Validator, TypeContext } from 'org.openzen.zenscript.validator';
  import { HighLevelDefinition, FunctionHeader, AccessScope } from 'org.openzen.zenscript.codemodel';
  import { TypeScope } from 'org.openzen.zenscript.codemodel.scope';
  import { DefinitionVisitor, ClassDefinition, InterfaceDefinition, EnumDefinition, StructDefinition, FunctionDefinition, ExpansionDefinition, AliasDefinition, VariantDefinition } from 'org.openzen.zenscript.codemodel.definition';
  import { ExpressionVisitor, AndAndExpression, ArrayExpression, CompareExpression, CallExpression, CallStaticExpression, ConstExpression, CapturedClosureExpression, CapturedDirectExpression, CapturedLocalVariableExpression, CapturedParameterExpression, CapturedThisExpression, CastExpression, CheckNullExpression, CoalesceExpression, ConditionalExpression, ConstantBoolExpression, ConstantByteExpression, ConstantCharExpression, ConstantDoubleExpression, ConstantFloatExpression, ConstantIntExpression, ConstantLongExpression, ConstantSByteExpression, ConstantShortExpression, ConstantStringExpression, ConstantUIntExpression, ConstantULongExpression, ConstantUShortExpression, ConstantUSizeExpression, ConstructorThisCallExpression, ConstructorSuperCallExpression, EnumConstantExpression, FunctionExpression, GetFieldExpression, GetFunctionParameterExpression, GetLocalVariableExpression, GetMatchingVariantField, GetStaticFieldExpression, GetterExpression, GlobalExpression, GlobalCallExpression, InterfaceCastExpression, InvalidExpression, InvalidAssignExpression, IsExpression, MakeConstExpression, MapExpression, MatchExpression, NewExpression, NullExpression, OrOrExpression, PanicExpression, Expression, PostCallExpression, RangeExpression, SameObjectExpression, SetFieldExpression, SetFunctionParameterExpression, SetLocalVariableExpression, SetStaticFieldExpression, SetterExpression, StaticGetterExpression, StaticSetterExpression, SupertypeCastExpression, SubtypeCastExpression, ThisExpression, ThrowExpression, TryConvertExpression, TryRethrowAsExceptionExpression, TryRethrowAsResultExpression, VariantValueExpression, WrapOptionalExpression } from 'org.openzen.zenscript.codemodel.expression';
  import { ExpressionScope, StatementScope } from 'org.openzen.zenscript.validator.analysis';
  import { StatementVisitor, BlockStatement, BreakStatement, ContinueStatement, DoWhileStatement, EmptyStatement, ExpressionStatement, ForeachStatement, IfStatement, InvalidStatement, LockStatement, ReturnStatement, SwitchStatement, ThrowStatement, TryCatchStatement, VarStatement, WhileStatement } from 'org.openzen.zenscript.codemodel.statement';
  import { VariableSet } from 'org.openzen.zenscript.validator.visitors.StatementValidator';
  import { TypeVisitor, BasicTypeID, ArrayTypeID, AssocTypeID, IteratorTypeID, FunctionTypeID, DefinitionTypeID, GenericTypeID, RangeTypeID, OptionalTypeID, GenericMapTypeID, TypeVisitorWithContext, TypeID, InvalidTypeID } from 'org.openzen.zenscript.codemodel.type';
  import { CodePosition } from 'org.openzen.zencode.shared';
  import { LocalMemberCache } from 'org.openzen.zenscript.codemodel.type.member';
  import { TypeParameter } from 'org.openzen.zenscript.codemodel.generic';

  interface DefinitionMemberContext extends Enum<DefinitionMemberContext> {}
  class DefinitionMemberContext extends Enum<DefinitionMemberContext> {
    static readonly DEFINITION: DefinitionMemberContext;
    static readonly EXPANSION: DefinitionMemberContext;
    static readonly IMPLEMENTATION: DefinitionMemberContext;
    static valueOf(name: string): DefinitionMemberContext;
    static values(): DefinitionMemberContext[];
  }


  interface DefinitionMemberValidator extends MemberVisitor<Void> {}
  class DefinitionMemberValidator extends MemberVisitor<Void> {
    constructor(validator: Validator, definition: HighLevelDefinition, scope: TypeScope, context: DefinitionMemberContext);
    visitCaller(member: CallerMember): Void;
    visitCaster(member: CasterMember): Void;
    visitConst(member: ConstMember): Void;
    visitConstructor(member: ConstructorMember): Void;
    visitCustomIterator(member: IteratorMember): Void;
    visitDestructor(member: DestructorMember): Void;
    visitEnumConstant(member: EnumConstantMember): void;
    visitField(member: FieldMember): Void;
    visitGetter(member: GetterMember): Void;
    visitImplementation(implementation: ImplementationMember): Void;
    visitInnerDefinition(innerDefinition: InnerDefinitionMember): Void;
    visitMethod(member: MethodMember): Void;
    visitOperator(member: OperatorMember): Void;
    visitSetter(member: SetterMember): Void;
    visitStaticInitializer(member: StaticInitializerMember): Void;
  }


  interface DefinitionValidator extends DefinitionVisitor<Void> {}
  class DefinitionValidator extends DefinitionVisitor<Void> {
    constructor(validator: Validator);
    visitAlias(definition: AliasDefinition): Void;
    visitClass(definition: ClassDefinition): Void;
    visitEnum(definition: EnumDefinition): Void;
    visitExpansion(definition: ExpansionDefinition): Void;
    visitFunction(definition: FunctionDefinition): Void;
    visitInterface(definition: InterfaceDefinition): Void;
    visitStruct(definition: StructDefinition): Void;
    visitVariant(variant: VariantDefinition): Void;
  }


  interface ExpressionValidator extends ExpressionVisitor<Void> {}
  class ExpressionValidator extends ExpressionVisitor<Void> {
    constructor(validator: Validator, scope: ExpressionScope);
    visitAndAnd(expression: AndAndExpression): Void;
    visitArray(expression: ArrayExpression): Void;
    visitCall(expression: CallExpression): Void;
    visitCallStatic(expression: CallStaticExpression): Void;
    visitCapturedClosure(expression: CapturedClosureExpression): Void;
    visitCapturedDirect(expression: CapturedDirectExpression): Void;
    visitCapturedLocalVariable(expression: CapturedLocalVariableExpression): Void;
    visitCapturedParameter(expression: CapturedParameterExpression): Void;
    visitCapturedThis(expression: CapturedThisExpression): Void;
    visitCast(expression: CastExpression): Void;
    visitCheckNull(expression: CheckNullExpression): Void;
    visitCoalesce(expression: CoalesceExpression): Void;
    visitCompare(expression: CompareExpression): Void;
    visitConditional(expression: ConditionalExpression): Void;
    visitConst(expression: ConstExpression): Void;
    visitConstantBool(expression: ConstantBoolExpression): Void;
    visitConstantByte(expression: ConstantByteExpression): Void;
    visitConstantChar(expression: ConstantCharExpression): Void;
    visitConstantDouble(expression: ConstantDoubleExpression): Void;
    visitConstantFloat(expression: ConstantFloatExpression): Void;
    visitConstantInt(expression: ConstantIntExpression): Void;
    visitConstantLong(expression: ConstantLongExpression): Void;
    visitConstantSByte(expression: ConstantSByteExpression): Void;
    visitConstantShort(expression: ConstantShortExpression): Void;
    visitConstantString(expression: ConstantStringExpression): Void;
    visitConstantUInt(expression: ConstantUIntExpression): Void;
    visitConstantULong(expression: ConstantULongExpression): Void;
    visitConstantUShort(expression: ConstantUShortExpression): Void;
    visitConstantUSize(expression: ConstantUSizeExpression): Void;
    visitConstructorSuperCall(expression: ConstructorSuperCallExpression): Void;
    visitConstructorThisCall(expression: ConstructorThisCallExpression): Void;
    visitEnumConstant(expression: EnumConstantExpression): Void;
    visitFunction(expression: FunctionExpression): Void;
    visitGetField(expression: GetFieldExpression): Void;
    visitGetFunctionParameter(expression: GetFunctionParameterExpression): Void;
    visitGetLocalVariable(expression: GetLocalVariableExpression): Void;
    visitGetMatchingVariantField(expression: GetMatchingVariantField): Void;
    visitGetStaticField(expression: GetStaticFieldExpression): Void;
    visitGetter(expression: GetterExpression): Void;
    visitGlobal(expression: GlobalExpression): Void;
    visitGlobalCall(expression: GlobalCallExpression): Void;
    visitInterfaceCast(expression: InterfaceCastExpression): Void;
    visitInvalid(expression: InvalidExpression): Void;
    visitInvalidAssign(expression: InvalidAssignExpression): Void;
    visitIs(expression: IsExpression): Void;
    visitMakeConst(expression: MakeConstExpression): Void;
    visitMap(expression: MapExpression): Void;
    visitMatch(expression: MatchExpression): Void;
    visitNew(expression: NewExpression): Void;
    visitNull(expression: NullExpression): Void;
    visitOrOr(expression: OrOrExpression): Void;
    visitPanic(expression: PanicExpression): Void;
    visitPlatformSpecific(expression: Expression): Void;
    visitPostCall(expression: PostCallExpression): Void;
    visitRange(expression: RangeExpression): Void;
    visitSameObject(expression: SameObjectExpression): Void;
    visitSetField(expression: SetFieldExpression): Void;
    visitSetFunctionParameter(expression: SetFunctionParameterExpression): Void;
    visitSetLocalVariable(expression: SetLocalVariableExpression): Void;
    visitSetStaticField(expression: SetStaticFieldExpression): Void;
    visitSetter(expression: SetterExpression): Void;
    visitStaticGetter(expression: StaticGetterExpression): Void;
    visitStaticSetter(expression: StaticSetterExpression): Void;
    visitSubtypeCast(expression: SubtypeCastExpression): Void;
    visitSupertypeCast(expression: SupertypeCastExpression): Void;
    visitThis(expression: ThisExpression): Void;
    visitThrow(expression: ThrowExpression): Void;
    visitTryConvert(expression: TryConvertExpression): Void;
    visitTryRethrowAsException(expression: TryRethrowAsExceptionExpression): Void;
    visitTryRethrowAsResult(expression: TryRethrowAsResultExpression): Void;
    visitVariantValue(expression: VariantValueExpression): Void;
    visitWrapOptional(expression: WrapOptionalExpression): Void;
  }


  interface StatementValidator extends StatementVisitor<Void> {}
  class StatementValidator extends StatementVisitor<Void> {
    constructorForwarded: boolean;
    constructor(validator: Validator, scope: StatementScope);

    constructor(validator: Validator, scope: StatementScope, variableSet: VariableSet);
    visitBlock(block: BlockStatement): Void;
    visitBreak(statement: BreakStatement): Void;
    visitContinue(statement: ContinueStatement): Void;
    visitDoWhile(statement: DoWhileStatement): Void;
    visitEmpty(statement: EmptyStatement): Void;
    visitExpression(statement: ExpressionStatement): Void;
    visitForeach(statement: ForeachStatement): Void;
    visitIf(statement: IfStatement): Void;
    visitInvalid(statement: InvalidStatement): Void;
    visitLock(statement: LockStatement): Void;
    visitReturn(statement: ReturnStatement): Void;
    visitSwitch(statement: SwitchStatement): Void;
    visitThrow(statement: ThrowStatement): Void;
    visitTryCatch(statement: TryCatchStatement): Void;
    visitVar(statement: VarStatement): Void;
    visitWhile(statement: WhileStatement): Void;
  }


  interface SupertypeValidator extends TypeVisitor<Void> {}
  class SupertypeValidator extends TypeVisitor<Void> {
    constructor(validator: Validator, position: CodePosition, subtype: HighLevelDefinition);
    visitArray(array: ArrayTypeID): Void;
    visitAssoc(assoc: AssocTypeID): Void;
    visitBasic(basic: BasicTypeID): Void;
    visitDefinition(definition: DefinitionTypeID): Void;
    visitFunction(functionParameter: FunctionTypeID): Void;
    visitGeneric(generic: GenericTypeID): Void;
    visitGenericMap(map: GenericMapTypeID): Void;
    visitIterator(iterator: IteratorTypeID): Void;
    visitOptional(type: OptionalTypeID): Void;
    visitRange(range: RangeTypeID): Void;
  }


  interface TypeValidator extends TypeVisitorWithContext<TypeContext, Void, RuntimeException> {}
  class TypeValidator extends TypeVisitorWithContext<TypeContext, Void, RuntimeException> {
    constructor(validator: Validator, position: CodePosition);
    validate(context: TypeContext, type: TypeID): void;
    visitArray(context: TypeContext, array: ArrayTypeID): Void;
    visitAssoc(context: TypeContext, assoc: AssocTypeID): Void;
    visitBasic(context: TypeContext, basic: BasicTypeID): Void;
    visitDefinition(context: TypeContext, definition: DefinitionTypeID): Void;
    visitFunction(context: TypeContext, functionParameter: FunctionTypeID): Void;
    visitGeneric(context: TypeContext, generic: GenericTypeID): Void;
    visitGenericMap(context: TypeContext, map: GenericMapTypeID): Void;
    visitInvalid(context: TypeContext, type: InvalidTypeID): Void;
    visitIterator(context: TypeContext, iterator: IteratorTypeID): Void;
    visitOptional(context: TypeContext, type: OptionalTypeID): Void;
    visitRange(context: TypeContext, range: RangeTypeID): Void;
  }


  class ValidationUtils {
    static validateHeader(target: Validator, position: CodePosition, header: FunctionHeader, access: AccessScope): void;
    static validateHeader(target: Validator, position: CodePosition, header: FunctionHeader, access: AccessScope, localMemberCache: LocalMemberCache): void;
    static validateIdentifier(target: Validator, position: CodePosition, identifier: string): void;
    static validateModifiers(target: Validator, modifiers: number, allowedModifiers: number, position: CodePosition, error: string): void;
    static validateTypeArguments(target: Validator, position: CodePosition, typeParameters: TypeParameter[], typeArguments: TypeID[]): void;
    static validateValidOverride(target: Validator, position: CodePosition, scope: TypeScope, header: FunctionHeader, overridden: FunctionHeader): void;
  }

}