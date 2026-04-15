declare module 'kroppeb.stareval.element' {
  interface AccessibleExpressionElement extends ExpressionElement {}
  class AccessibleExpressionElement extends ExpressionElement {
  }


  class Element {
  }


  interface ExpressionElement extends Element {}
  class ExpressionElement extends Element {
  }


  interface PriorityOperatorElement extends Element {}
  class PriorityOperatorElement extends Element {
    get priority(): number;
    resolveWith(var1: ExpressionElement): ExpressionElement;
  }

}

declare module 'kroppeb.stareval.element.token' {
  import { BinaryOp, UnaryOp } from 'kroppeb.stareval.parser';
  import { AccessibleExpressionElement, ExpressionElement, Element, PriorityOperatorElement } from 'kroppeb.stareval.element';
  import { UnaryExpressionElement } from 'kroppeb.stareval.element.tree';

  interface BinaryOperatorToken extends Token {}
  class BinaryOperatorToken extends Token {
    readonly op: BinaryOp;
    constructor(op: BinaryOp);
    toString(): string;
  }


  interface IdToken extends AccessibleExpressionElement, Token {}
  class IdToken extends AccessibleExpressionElement {
    constructor(id: string);
    get id(): string;
    toString(): string;
  }


  interface NumberToken extends ExpressionElement, Token {}
  class NumberToken extends ExpressionElement {
    constructor(number: string);
    get number(): string;
    toString(): string;
  }


  interface Token extends Element {}
  class Token extends Element {
    toString(): string;
  }


  interface UnaryOperatorToken extends PriorityOperatorElement, Token {}
  class UnaryOperatorToken extends PriorityOperatorElement {
    constructor(op: UnaryOp);
    get priority(): number;
    resolveWith(right: ExpressionElement): UnaryExpressionElement;
    toString(): string;
  }

}

declare module 'kroppeb.stareval.element.tree.partial' {
  import { PriorityOperatorElement, ExpressionElement, Element } from 'kroppeb.stareval.element';
  import { BinaryOp } from 'kroppeb.stareval.parser';
  import { BinaryExpressionElement } from 'kroppeb.stareval.element.tree';
  import { List } from 'java.util';

  interface PartialBinaryExpression extends PriorityOperatorElement, PartialExpression {}
  class PartialBinaryExpression extends PriorityOperatorElement {
    constructor(left: ExpressionElement, op: BinaryOp);
    get priority(): number;
    resolveWith(right: ExpressionElement): BinaryExpressionElement;
    toString(): string;
  }


  interface PartialExpression extends Element {}
  class PartialExpression extends Element {
    toString(): string;
  }


  interface UnfinishedArgsExpression extends PartialExpression {}
  class UnfinishedArgsExpression extends PartialExpression {
    readonly tokens: List;
    toString(): string;
  }

}

declare module 'kroppeb.stareval.exception' {
  import { Exception, Throwable } from 'java.lang';

  interface MissingTokenException extends ParseException {}
  class MissingTokenException extends ParseException {
    constructor(message: string, index: number);
  }


  interface ParseException extends Exception {}
  class ParseException extends Exception {
    constructor();

    constructor(message: string);

    constructor(message: string, cause: Throwable);

    constructor(cause: Throwable);

    constructor(message: string, cause: Throwable, enableSuppression: boolean, writableStackTrace: boolean);
  }


  interface UnexpectedCharacterException extends ParseException {}
  class UnexpectedCharacterException extends ParseException {
    constructor(expected: string, actual: string, index: number);

    constructor(actual: string, index: number);

    constructor(expected: string, actual: string, index: number);
  }


  interface UnexpectedEndingException extends ParseException {}
  class UnexpectedEndingException extends ParseException {
    constructor();

    constructor(message: string);
  }


  interface UnexpectedTokenException extends ParseException {}
  class UnexpectedTokenException extends ParseException {
    constructor(message: string, index: number);
  }

}

declare module 'kroppeb.stareval.expression' {
  import { Type, FunctionContext, FunctionReturn, TypedFunction } from 'kroppeb.stareval.function';
  import { Collection } from 'java.util';

  interface BasicVariableExpression extends VariableExpression {}
  class BasicVariableExpression extends VariableExpression {
    constructor(name: string, type: Type);
    evaluateTo(c: FunctionContext, r: FunctionReturn): void;
    partialEval(context: FunctionContext, functionReturn: FunctionReturn): Expression;
  }


  interface CallExpression extends Expression {}
  class CallExpression extends Expression {
    constructor(functionParameter: TypedFunction, arguments: Expression[]);
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    listVariables(variables: Collection<VariableExpression>): void;
    partialEval(context: FunctionContext, functionReturn: FunctionReturn): Expression;
  }


  interface ConstantExpression extends Expression {}
  class ConstantExpression extends Expression {
    get type(): Type;
    listVariables(variables: Collection<VariableExpression>): void;
  }


  class Expression {
    evaluateTo(var1: FunctionContext, var2: FunctionReturn): void;
    listVariables(var1: Collection<VariableExpression>): void;
    partialEval(context: FunctionContext, functionReturn: FunctionReturn): Expression;
  }


  interface VariableExpression extends Expression {}
  class VariableExpression extends Expression {
    listVariables(variables: Collection<VariableExpression>): void;
  }

}

declare module 'kroppeb.stareval.function' {
  import { Parameter } from 'kroppeb.stareval.function.TypedFunction';
  import { Expression, ConstantExpression } from 'kroppeb.stareval.expression';
  import { Map, List } from 'java.util';
  import { Supplier } from 'java.util.function';
  import { Boolean, Int, Float, Primitive } from 'kroppeb.stareval.function.Type';
  import { UniformType } from 'net.irisshaders.iris.gl.uniform';

  interface AbstractTypedFunction extends TypedFunction {}
  class AbstractTypedFunction extends TypedFunction {
    constructor(returnType: Type, parameters: Parameter[], priority: number, isPure: boolean);

    constructor(returnType: Type, parameterType: Type[]);
    equals(obj: any): boolean;
    get parameters(): Parameter[];
    get returnType(): Type;
    hashCode(): number;
    isPure(): boolean;
    priority(): number;
    toString(): string;
  }


  interface B2BFunction extends TypedFunction {}
  class B2BFunction extends TypedFunction {
    eval(var1: boolean): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface BasicFunctionContext extends FunctionContext {}
  class BasicFunctionContext extends FunctionContext {
    getVariable(name: string): Expression;
    hasVariable(name: string): boolean;
    setFloatVariable(name: string, value: number): void;
    setIntVariable(name: string, value: number): void;
    setVariable(name: string, value: Expression): void;
  }


  interface BB2BFunction extends TypedFunction {}
  class BB2BFunction extends TypedFunction {
    eval(var1: boolean, var2: boolean): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface F2FFunction extends TypedFunction {}
  class F2FFunction extends TypedFunction {
    eval(var1: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface F2IFunction extends TypedFunction {}
  class F2IFunction extends TypedFunction {
    eval(var1: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface FF2BFunction extends TypedFunction {}
  class FF2BFunction extends TypedFunction {
    eval(var1: number, var2: number): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface FF2FFunction extends TypedFunction {}
  class FF2FFunction extends TypedFunction {
    eval(var1: number, var2: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface FFF2BFunction extends TypedFunction {}
  class FFF2BFunction extends TypedFunction {
    eval(var1: number, var2: number, var3: number): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface FFF2FFunction extends TypedFunction {}
  class FFF2FFunction extends TypedFunction {
    eval(var1: number, var2: number, var3: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  class FunctionContext {
    getVariable(var1: string): Expression;
    hasVariable(var1: string): boolean;
  }


  class FunctionResolver {
    constructor(functions: Map<string, Map<Type, TypedFunction[]>>, dynamicFunctions: Map<string, Map<Type, Supplier<TypedFunction>[]>>);
    logAllFunctions(): void;
    resolve(name: string, returnType: Type): TypedFunction[];
  }


  class FunctionReturn {
    booleanReturn: boolean;
    byteReturn: number;
    shortReturn: number;
    intReturn: number;
    longReturn: number;
    floatReturn: number;
    doubleReturn: number;
    objectReturn: any;
  }


  interface I2FFunction extends TypedFunction {}
  class I2FFunction extends TypedFunction {
    eval(var1: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface I2IFunction extends TypedFunction {}
  class I2IFunction extends TypedFunction {
    eval(var1: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface II2BFunction extends TypedFunction {}
  class II2BFunction extends TypedFunction {
    eval(var1: number, var2: number): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface II2IFunction extends TypedFunction {}
  class II2IFunction extends TypedFunction {
    eval(var1: number, var2: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface III2BFunction extends TypedFunction {}
  class III2BFunction extends TypedFunction {
    eval(var1: number, var2: number, var3: number): boolean;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface III2IFunction extends TypedFunction {}
  class III2IFunction extends TypedFunction {
    eval(var1: number, var2: number, var3: number): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  class Type {
    static readonly Boolean: Boolean;
    static readonly Int: Int;
    static readonly Float: Float;
    static readonly BooleanParameter: Parameter;
    static readonly IntParameter: Parameter;
    static readonly FloatParameter: Parameter;
    static readonly AllPrimitives: Primitive[];
    static convert(type: Type): UniformType;
    createArray(var1: number): any;
    createConstant(var1: FunctionReturn): ConstantExpression;
    getValueFromArray(var1: any, var2: number, var3: FunctionReturn): void;
    setValueFromReturn(var1: any, var2: number, var3: FunctionReturn): void;
    toString(): string;
  }


  class TypedFunction {
    evaluateTo(var1: Expression[], var2: FunctionContext, var3: FunctionReturn): void;
    static format(functionParameter: TypedFunction, name: string): string;
    get parameters(): Parameter[];
    get returnType(): Type;
    isPure(): boolean;
    priority(): number;
  }


  interface V2FFunction extends TypedFunction {}
  class V2FFunction extends TypedFunction {
    eval(): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }


  interface V2IFunction extends TypedFunction {}
  class V2IFunction extends TypedFunction {
    eval(): number;
    evaluateTo(params: Expression[], context: FunctionContext, functionReturn: FunctionReturn): void;
    get parameters(): Parameter[];
    get returnType(): Type;
  }

}

declare module 'kroppeb.stareval.function.FunctionResolver' {
  import { TypedFunction, Type, FunctionResolver } from 'kroppeb.stareval.function';
  import { Supplier } from 'java.util.function';

  class Builder {
    add<T extends TypedFunction>(name: string, functionParameter: T): void;
    addDynamic<T extends TypedFunction>(name: string, returnType: Type, functionParameter: Supplier<T>): void;
    addDynamicFunction(name: string, returnType: Type, functionParameter: Supplier<TypedFunction>): void;
    addFunction(name: string, functionParameter: TypedFunction): void;
    build(): FunctionResolver;
  }

}

declare module 'kroppeb.stareval.function.Type' {
  import { ConstantExpression } from 'kroppeb.stareval.expression';
  import { FunctionReturn, FunctionContext, Type } from 'kroppeb.stareval.function';

  interface Int extends Primitive {}
  class Int extends Primitive {
    createArray(length: number): any;
    createConstant(functionReturn: FunctionReturn): ConstantExpression;
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    getValueFromArray(array: any, index: number, value: FunctionReturn): void;
    setValueFromReturn(array: any, index: number, value: FunctionReturn): void;
    toString(): string;
  }


  interface Boolean extends Primitive {}
  class Boolean extends Primitive {
    createArray(length: number): any;
    createConstant(functionReturn: FunctionReturn): ConstantExpression;
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    getValueFromArray(array: any, index: number, value: FunctionReturn): void;
    setValueFromReturn(array: any, index: number, value: FunctionReturn): void;
    toString(): string;
  }


  interface Float extends Primitive {}
  class Float extends Primitive {
    createArray(length: number): any;
    createConstant(functionReturn: FunctionReturn): ConstantExpression;
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    getValueFromArray(array: any, index: number, value: FunctionReturn): void;
    setValueFromReturn(array: any, index: number, value: FunctionReturn): void;
    toString(): string;
  }


  interface Primitive extends Type {}
  class Primitive extends Type {
  }


  interface ObjectType extends Type {}
  class ObjectType extends Type {
    createArray(length: number): any;
    createConstant(functionReturn: FunctionReturn): ConstantExpression;
    evaluateTo(context: FunctionContext, functionReturn: FunctionReturn): void;
    getValueFromArray(array: any, index: number, value: FunctionReturn): void;
    setValueFromReturn(array: any, index: number, value: FunctionReturn): void;
    toString(): string;
  }

}

declare module 'kroppeb.stareval.function.TypedFunction' {
  import { Type } from 'kroppeb.stareval.function';

  class Parameter {
    constructor(type: Type, isConstant: boolean);

    constructor(type: Type);
    constant(): boolean;
    equals(obj: any): boolean;
    hashCode(): number;
    type(): Type;
  }

}

declare module 'kroppeb.stareval.parser' {
  import { ExpressionElement } from 'kroppeb.stareval.element';

  class OpResolver<T = any> {
  }


  class Parser {
    static parse(input: string, options: ParserOptions): ExpressionElement;
  }


  class ParserOptions {
  }


  class StringReader {
    constructor(string: string);
    canRead(): boolean;
    get currentIndex(): number;
    mark(): void;
    peek(): string;
    read(): string;
    read(c: string): void;
    skipOneCharacter(): void;
    skipWhitespace(): void;
    substring(): string;
    tryRead(c: string): boolean;
  }


  class Tokenizer {
  }

}

declare module 'kroppeb.stareval.parser.OpResolver' {
  import { OpResolver } from 'kroppeb.stareval.parser';

  interface SingleDualChar<T = any> extends OpResolver<T> {}
  class SingleDualChar<T = any> extends OpResolver<T> {
  }


  interface DualChar<T = any> extends OpResolver<T> {}
  class DualChar<T = any> extends OpResolver<T> {
  }


  interface SingleChar<T = any> extends OpResolver<T> {}
  class SingleChar<T = any> extends OpResolver<T> {
  }


  class Builder<T = any> {
    build(): OpResolver<T>;
    multiChar(trailing: string, op: T): void;
    singleChar(op: T): void;
  }

}

declare module 'kroppeb.stareval.parser.ParserOptions' {
  import { UnaryOp, BinaryOp, ParserOptions } from 'kroppeb.stareval.parser';

  class TokenRules {
    static readonly DEFAULT: TokenRules;
    isAccessPart(c: string): boolean;
    isAccessStart(c: string): boolean;
    isIdPart(c: string): boolean;
    isIdStart(c: string): boolean;
    static isLetter(c: string): boolean;
    static isLowerCaseLetter(c: string): boolean;
    static isNumber(c: string): boolean;
    isNumberPart(c: string): boolean;
    isNumberStart(c: string): boolean;
    static isUpperCaseLetter(c: string): boolean;
  }


  class Builder {
    addBinaryOp(s: string, op: BinaryOp): void;
    addUnaryOp(s: string, op: UnaryOp): void;
    build(): ParserOptions;
    setTokenRules(tokenRules: TokenRules): void;
  }

}

declare module 'kroppeb.stareval' {
  import { Consumer } from 'java.util.function';

  class Util {
    static make<T>(item: T, init: Consumer<T>): T;
  }

}