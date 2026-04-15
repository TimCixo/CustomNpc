declare module 'stdlib.Result' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';
  import { Result } from 'stdlib';

  interface Discriminant extends Enum<Discriminant> {}
  class Discriminant extends Enum<Discriminant> {
    static readonly Ok: Discriminant;
    static readonly Error: Discriminant;
    static valueOf(name: string): Discriminant;
    static values(): Discriminant[];
  }


  interface Ok<T = any, E = any> extends Result<T, E> {}
  class Ok<T = any, E = any> extends Result<T, E> {
    readonly value: T;
    constructor(value: T);
    get discriminant(): Discriminant;
  }


  interface Error<T = any, E = any> extends Result<T, E> {}
  class Error<T = any, E = any> extends Result<T, E> {
    readonly value: E;
    constructor(value: E);
    get discriminant(): Discriminant;
  }

}