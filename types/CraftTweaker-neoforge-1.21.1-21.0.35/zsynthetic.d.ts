declare module 'zsynthetic' {
  import { Result } from 'stdlib';

  class ArrayHelpers {
    static containsChar(haystack: string[], needle: string): boolean;
  }


  class FunctionBoolBoolToVoid {
    invoke(var1: boolean, var2: boolean): void;
  }


  class FunctionIntIntToVoid {
    invoke(var1: number, var2: number): void;
  }


  class FunctionIntTToBool<T = any> {
    invoke(var1: number, var2: T): boolean;
  }


  class FunctionIntTToU<U = any, T = any> {
    invoke(var1: number, var2: T): U;
  }


  class FunctionIntTToVoid<T = any> {
    invoke(var1: number, var2: T): void;
  }


  class FunctionStringStringToVoid {
    invoke(var1: string, var2: string): void;
  }


  class FunctionTToBool<T = any> {
    invoke(var1: T): boolean;
  }


  class FunctionTToResultWithUV<R = any, E = any, T = any> {
    invoke(var1: T): Result<R, E>;
  }


  class FunctionTToU<U = any, T = any> {
    invoke(var1: T): U;
  }


  class FunctionTToVoid<T = any> {
    invoke(var1: T): void;
  }


  class FunctionTTToVoid<T = any> {
    invoke(var1: T, var2: T): void;
  }


  class FunctionUSizeTToBool<T = any> {
    invoke(var1: number, var2: T): boolean;
  }


  class FunctionUSizeTToU<T = any, U = any> {
    invoke(var1: number, var2: T): U;
  }


  class FunctionUSizeTToVoid<T = any> {
    invoke(var1: number, var2: T): void;
  }


  class Shared<T extends AutoCloseable = any> {
    constructor(value: T);
    addRef(): void;
    release(): void;
  }

}