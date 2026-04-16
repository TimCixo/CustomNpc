declare module 'listeners' {
  import { AutoCloseable } from 'java.lang';
  import { Consumer } from 'java.util.function';

  interface DummyListenerHandle<T = any> extends ListenerHandle<T>, AutoCloseable {}
  class DummyListenerHandle<T = any> extends ListenerHandle<T> {
    readonly listener: T;
    constructor(listener: T);
    close(): void;
    get listener(): T;
  }


  interface ListenerHandle<T = any> extends AutoCloseable {}
  class ListenerHandle<T = any> extends AutoCloseable {
    close(): void;
    get listener(): T;
  }


  class ListenerList<T = any> {
    static readonly PRIORITY_HIGH: number;
    static readonly PRIORITY_DEFAULT: number;
    static readonly PRIORITY_LOW: number;
    accept(consumer: Consumer<T>): void;
    add(listener: T): ListenerHandle<T>;
    add(listener: T, priority: number): ListenerHandle<T>;
    clear(): void;
    get isEmpty(): boolean;
  }

}