declare module 'stdlib' {
  import { Class, Enum, Exception, StringBuilder } from 'java.lang';
  import { Function, Predicate, Consumer } from 'java.util.function';
  import { FunctionUSizeTToU, FunctionUSizeTToBool, FunctionUSizeTToVoid } from 'zsynthetic';
  import { Map, List } from 'java.util';
  import { Discriminant } from 'stdlib.Result';

  class Arrays {
    static all<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): boolean;
    static all<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): boolean;
    static contains<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): boolean;
    static contains<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): boolean;
    static count<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): number;
    static count<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): number;
    static each<T>(typeOfT: Class<T>, self: T[], consumer: Consumer<T>): void;
    static each<T>(typeOfT: Class<T>, self: T[], consumer: FunctionUSizeTToVoid<T>): void;
    static filter<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): T[];
    static filter<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): T[];
    static first<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): T;
    static first<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): T;
    static getFirst<T>(typeOfT: Class<T>, self: T[]): T;
    static getLast<T>(typeOfT: Class<T>, self: T[]): T;
    static index<K, T>(typeOfT: Class<T>, self: T[], typeOfK: Class<K>, key: Function<T, K>): Map<K, T>;
    static last<T>(typeOfT: Class<T>, self: T[], predicate: Predicate<T>): T;
    static last<T>(typeOfT: Class<T>, self: T[], predicate: FunctionUSizeTToBool<T>): T;
    static map<U, T>(typeOfT: Class<T>, self: T[], typeOfU: Class<U>, projection: Function<T, U>): U[];
    static map<U, T>(typeOfT: Class<T>, self: T[], typeOfU: Class<U>, projection: FunctionUSizeTToU<T, U>): U[];
    static reverse<T>(typeOfT: Class<T>, self: T[]): void;
  }


  class Assoc {
  }


  class Chars {
    static times(self: string, number: number): string;
  }


  interface EnforcementLevel extends Enum<EnforcementLevel> {}
  class EnforcementLevel extends Enum<EnforcementLevel> {
    static readonly INFO: EnforcementLevel;
    static readonly ENFORCE: EnforcementLevel;
    static readonly PROVE: EnforcementLevel;
    static valueOf(name: string): EnforcementLevel;
    static values(): EnforcementLevel[];
  }


  class EqualsComparable<T = any> {
    equals_(var1: T): boolean;
  }


  class Hashable<T = any> {
    equals_(var1: T): boolean;
    hashCode(): number;
  }


  class Integers {
  }


  class Result<T = any, E = any> {
    expect(): T;
    get discriminant(): Discriminant;
    handle<X>(typeOfX: Class<X>, handler: Function<E, Result<T, X>>): Result<T, X>;
    orElse(other: T): T;
    orElse(other: Function<E, T>): T;
    then<R>(typeOfR: Class<R>, fn: Function<T, Result<R, E>>): Result<R, E>;
    static unwrap<T, E extends Exception>(typeOfT: Class<T>, typeOfE: Class<E>, self: Result<T, E>): T;
  }


  class StringBuildable {
    toString(var1: StringBuilder): void;
    toString(): string;
  }


  class StringBuilderExpansion {
    static append<T extends StringBuildable>(self: StringBuilder, typeOfT: Class<T>, values: T[], separator: string): StringBuilder;
    static append<T>(self: StringBuilder, typeOfT: Class<T>, values: T[], stringer: Function<T, string>, separator: string): StringBuilder;
    static shl(self: StringBuilder, value: StringBuildable): StringBuilder;
  }


  class Strings {
    static lpad(self: string, length: number, c: string): string;
    static rpad(self: string, length: number, c: string): string;
    static split(self: string, delimiter: string): string[];
  }


  class USize {
  }

}