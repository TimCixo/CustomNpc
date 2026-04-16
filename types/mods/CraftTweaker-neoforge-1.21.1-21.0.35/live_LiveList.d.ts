declare module 'live.LiveList' {
  class Listener<T = any> {
    onChanged(var1: number, var2: T, var3: T): void;
    onInserted(var1: number, var2: T): void;
    onRemoved(var1: number, var2: T): void;
  }

}