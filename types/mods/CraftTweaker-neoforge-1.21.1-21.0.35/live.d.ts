declare module 'live' {
  import { ListenerHandle } from 'listeners';
  import { FunctionBoolBoolToVoid, FunctionIntIntToVoid } from 'zsynthetic';
  import { BiConsumer, Function, Predicate } from 'java.util.function';
  import { AutoCloseable, Iterable } from 'java.lang';
  import { Iterator, Comparator } from 'java.util';
  import { Listener } from 'live.LiveList';

  interface ImmutableLiveBool extends LiveBool {}
  class ImmutableLiveBool extends LiveBool {
    static readonly TRUE: ImmutableLiveBool;
    static readonly FALSE: ImmutableLiveBool;
    readonly value: boolean;
    addListener(listener: FunctionBoolBoolToVoid): ListenerHandle<FunctionBoolBoolToVoid>;
    get value(): boolean;
  }


  interface ImmutableLiveObject<T = any> extends LiveObject<T> {}
  class ImmutableLiveObject<T = any> extends LiveObject<T> {
    readonly value: T;
    constructor(value: T);
    addListener(listener: BiConsumer<T, T>): ListenerHandle<BiConsumer<T, T>>;
    get value(): T;
  }


  interface ImmutableLiveString extends LiveString {}
  class ImmutableLiveString extends LiveString {
    readonly value: string;
    constructor(value: string);
    addListener(listener: BiConsumer<string, string>): ListenerHandle<BiConsumer<string, string>>;
    get value(): string;
  }


  interface InverseLiveBool extends LiveBool {}
  class InverseLiveBool extends LiveBool {
    constructor(source: LiveBool);
    addListener(listener: FunctionBoolBoolToVoid): ListenerHandle<FunctionBoolBoolToVoid>;
    get value(): boolean;
  }


  interface LiveArrayList<T = any> extends MutableLiveList<T>, AutoCloseable {}
  class LiveArrayList<T = any> extends MutableLiveList<T> {
    add(value: T): void;
    addListener(listener: Listener<T>): ListenerHandle<Listener<T>>;
    clear(): void;
    close(): void;
    get length(): number;
    getAt(index: number): T;
    indexOf(value: T): number;
    insert(index: number, value: T): void;
    iterator(): Iterator<T>;
    remove(index: number): void;
    remove(value: T): void;
    setAt(index: number, value: T): void;
  }


  class LiveBool {
    addListener(var1: FunctionBoolBoolToVoid): ListenerHandle<FunctionBoolBoolToVoid>;
    get value(): boolean;
  }


  interface LiveConcatList<T = any> extends AutoCloseable, LiveList<T> {}
  class LiveConcatList<T = any> extends AutoCloseable {
    constructor(a: LiveList<T>, b: LiveList<T>);
    addListener(listener: Listener<T>): ListenerHandle<Listener<T>>;
    close(): void;
    get length(): number;
    getAt(index: number): T;
    indexOf(value: T): number;
    iterator(): Iterator<T>;
  }


  interface LiveEmptyList<T = any> extends LiveList<T> {}
  class LiveEmptyList<T = any> extends LiveList<T> {
    addListener(listener: Listener<T>): ListenerHandle<Listener<T>>;
    close(): void;
    static get <T>(): LiveEmptyList<T>;
    get length(): number;
    getAt(index: number): T;
    indexOf(value: T): number;
    iterator(): Iterator<T>;
  }


  class LiveInt {
    addListener(var1: FunctionIntIntToVoid): ListenerHandle<FunctionIntIntToVoid>;
    get value(): number;
    set value(var1: number);
  }


  interface LiveList<T = any> extends AutoCloseable, Iterable<T> {}
  class LiveList<T = any> extends AutoCloseable {
    addListener(var1: Listener<T>): ListenerHandle<Listener<T>>;
    close(): void;
    get length(): number;
    getAt(var1: number): T;
    indexOf(var1: T): number;
  }


  interface LiveMappedList<T = any, U = any> extends AutoCloseable, LiveList<U> {}
  class LiveMappedList<T = any, U = any> extends AutoCloseable {
    constructor(original: LiveList<T>, projection: Function<T, U>);
    addListener(listener: Listener<U>): ListenerHandle<Listener<U>>;
    close(): void;
    get length(): number;
    getAt(index: number): U;
    indexOf(value: U): number;
    iterator(): Iterator<U>;
  }


  class LiveObject<T = any> {
    addListener(var1: BiConsumer<T, T>): ListenerHandle<BiConsumer<T, T>>;
    get value(): T;
  }


  interface LivePredicateBool<T = any> extends LiveBool, AutoCloseable, BiConsumer<T, T> {}
  class LivePredicateBool<T = any> extends LiveBool {
    constructor(source: LiveObject<T>, predicate: Predicate<T>);
    accept(oldValue: T, newValue: T): void;
    addListener(listener: FunctionBoolBoolToVoid): ListenerHandle<FunctionBoolBoolToVoid>;
    close(): void;
    get value(): boolean;
  }


  interface LivePrefixedList<T = any> extends LiveList<T> {}
  class LivePrefixedList<T = any> extends LiveList<T> {
    constructor(prefix: T, values: LiveList<T>);
    addListener(listener: Listener<T>): ListenerHandle<Listener<T>>;
    close(): void;
    get length(): number;
    getAt(index: number): T;
    indexOf(value: T): number;
    iterator(): Iterator<T>;
  }


  class LiveString {
    addListener(var1: BiConsumer<string, string>): ListenerHandle<BiConsumer<string, string>>;
    get value(): string;
  }


  interface MutableLiveBool extends LiveBool {}
  class MutableLiveBool extends LiveBool {
    setValue(var1: boolean): void;
    toggle(): void;
  }


  interface MutableLiveInt extends LiveInt {}
  class MutableLiveInt extends LiveInt {
    setValue(var1: number): void;
  }


  interface MutableLiveList<T = any> extends AutoCloseable, LiveList<T> {}
  class MutableLiveList<T = any> extends AutoCloseable {
    add(var1: T): void;
    clear(): void;
    close(): void;
    insert(var1: number, var2: T): void;
    remove(var1: number): void;
    remove(var1: T): void;
    setAt(var1: number, var2: T): void;
  }


  interface MutableLiveObject<T = any> extends LiveObject<T> {}
  class MutableLiveObject<T = any> extends LiveObject<T> {
    setValue(var1: T): void;
  }


  interface MutableLiveString extends LiveString {}
  class MutableLiveString extends LiveString {
    setValue(var1: string): void;
  }


  interface SimpleLiveBool extends MutableLiveBool {}
  class SimpleLiveBool extends MutableLiveBool {
    constructor(value: boolean);
    addListener(listener: FunctionBoolBoolToVoid): ListenerHandle<FunctionBoolBoolToVoid>;
    get value(): boolean;
    set value(value: boolean);
  }


  interface SimpleLiveInt extends MutableLiveInt {}
  class SimpleLiveInt extends MutableLiveInt {
    constructor(value: number);
    addListener(listener: FunctionIntIntToVoid): ListenerHandle<FunctionIntIntToVoid>;
    get value(): number;
    set value(value: number);
  }


  interface SimpleLiveObject<T = any> extends MutableLiveObject<T> {}
  class SimpleLiveObject<T = any> extends MutableLiveObject<T> {
    constructor(value: T);
    addListener(listener: BiConsumer<T, T>): ListenerHandle<BiConsumer<T, T>>;
    get value(): T;
    set value(value: T);
  }


  interface SimpleLiveString extends MutableLiveString {}
  class SimpleLiveString extends MutableLiveString {
    constructor(value: string);
    addListener(listener: BiConsumer<string, string>): ListenerHandle<BiConsumer<string, string>>;
    get value(): string;
    set value(value: string);
  }


  interface SortedLiveList<T = any> extends LiveList<T>, Listener<T> {}
  class SortedLiveList<T = any> extends LiveList<T> {
    constructor(original: LiveList<T>, ordering: Comparator<T>);
    addListener(listener: Listener<T>): ListenerHandle<Listener<T>>;
    close(): void;
    get length(): number;
    getAt(index: number): T;
    indexOf(value: T): number;
    iterator(): Iterator<T>;
    onChanged(index: number, oldValue: T, newValue: T): void;
    onInserted(index: number, value: T): void;
    onRemoved(index: number, oldValue: T): void;
  }

}