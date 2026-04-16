declare module 'de.odysseus.ithaka.digraph' {
  import { OptionalInt, Collection, Set, List, Iterator, Comparator } from 'java.util';
  import { Iterable } from 'java.lang';
  import { VertexMapFactory, EdgeMapFactory } from 'de.odysseus.ithaka.digraph.MapDigraph';

  interface Digraph<V = any> extends EdgeWeights<V> {}
  class Digraph<V = any> extends EdgeWeights<V> {
    add(var1: V): boolean;
    contains(var1: V, var2: V): boolean;
    contains(var1: V): boolean;
    get(var1: V, var2: V): OptionalInt;
    get edgeCount(): number;
    get vertexCount(): number;
    getOutDegree(var1: V): number;
    isAcyclic(): boolean;
    put(var1: V, var2: V, var3: number): OptionalInt;
    remove(var1: V, var2: V): OptionalInt;
    remove(var1: V): boolean;
    removeAll(var1: Collection<V>): void;
    reverse(): Digraph<V>;
    subgraph(var1: Set<V>): Digraph<V>;
    targets(var1: V): Iterable<V>;
    totalWeight(): number;
    vertices(): Iterable<V>;
  }


  interface DigraphAdapter<V = any> extends Digraph<V> {}
  class DigraphAdapter<V = any> extends Digraph<V> {
    constructor(delegate: Digraph<V>);
    add(vertex: V): boolean;
    contains(source: V, target: V): boolean;
    contains(vertex: V): boolean;
    equals(obj: any): boolean;
    get(source: V, target: V): OptionalInt;
    get edgeCount(): number;
    get vertexCount(): number;
    getOutDegree(vertex: V): number;
    hashCode(): number;
    isAcyclic(): boolean;
    put(source: V, target: V, edge: number): OptionalInt;
    remove(source: V, target: V): OptionalInt;
    remove(vertex: V): boolean;
    removeAll(vertices: Collection<V>): void;
    reverse(): Digraph<V>;
    subgraph(vertices: Set<V>): Digraph<V>;
    targets(source: V): Iterable<V>;
    toString(): string;
    totalWeight(): number;
    vertices(): Iterable<V>;
  }


  class DigraphFactory<G extends Digraph<any> = any> {
    create(): G;
  }


  class DigraphProvider<T = any, G extends Digraph<any> = any> {
    get(var1: T): G;
  }


  class Digraphs {
    static closure<V>(digraph: Digraph<V>, source: V): Set<V>;
    static copy<V, G extends Digraph<V>>(digraph: Digraph<V>, factory: DigraphFactory<G>): G;
    static dfs<V>(digraph: Digraph<V>, source: V, discovered: Set<V>, finished: Collection<V>): void;
    static dfs2<V>(digraph: Digraph<V>, source: V, discovered: Set<V>, finished: Collection<V>): void;
    static emptyDigraph<V>(): DoubledDigraph<V>;
    static isAcyclic<V>(digraph: Digraph<V>): boolean;
    static isEquivalent<V>(first: Digraph<V>, second: Digraph<V>, compareEdges: boolean): boolean;
    static isReachable<V>(digraph: Digraph<V>, source: V, target: V): boolean;
    static isStronglyConnected<V>(digraph: Digraph<V>): boolean;
    static isTriviallyAcyclic<V>(digraph: Digraph<V>): boolean;
    static reverse<V, G extends Digraph<V>>(digraph: Digraph<V>, factory: DigraphFactory<G>): G;
    static scc<V>(digraph: Digraph<V>): Set<V>[];
    static subgraph<V, G extends Digraph<V>>(digraph: Digraph<V>, vertices: Set<V>, factory: DigraphFactory<G>): G;
    static toposort<V>(digraph: Digraph<V>, descending: boolean): V[];
    static unmodifiableDigraph<V>(digraph: Digraph<V>): Digraph<V>;
    static wcc<V>(digraph: Digraph<V>): Set<V>[];
  }


  interface DoubledDigraph<V = any> extends Digraph<V> {}
  class DoubledDigraph<V = any> extends Digraph<V> {
    getInDegree(var1: V): number;
    reverse(): DoubledDigraph<V>;
    sources(var1: V): Iterable<V>;
  }


  interface DoubledDigraphAdapter<V = any> extends DoubledDigraph<V>, DigraphAdapter<V> {}
  class DoubledDigraphAdapter<V = any> extends DoubledDigraph<V> {
    constructor();

    constructor(factory: DigraphFactory<Digraph<V>>);
    add(vertex: V): boolean;
    static getAdapterFactory<V>(factory: DigraphFactory<Digraph<V>>): DigraphFactory<DoubledDigraphAdapter<V>>;
    getInDegree(vertex: V): number;
    hasNext(): boolean;
    hasNext(): boolean;
    iterator(): Iterator<V>;
    iterator(): Iterator<V>;
    next(): V;
    next(): V;
    put(source: V, target: V, edge: number): OptionalInt;
    remove(vertex: V): boolean;
    remove(): void;
    remove(): void;
    remove(source: V, target: V): OptionalInt;
    removeAll(vertices: Collection<V>): void;
    reverse(): DoubledDigraphAdapter<V>;
    sources(target: V): Iterable<V>;
    targets(source: V): Iterable<V>;
    toString(): string;
    toString(): string;
    vertices(): Iterable<V>;
  }


  class EdgeWeights<V = any> {
    static readonly UNIT_WEIGHT: OptionalInt;
    static readonly UNIT_WEIGHTS: EdgeWeights;
    get(var1: V, var2: V): OptionalInt;
  }


  interface EmptyDigraph<V = any> extends DoubledDigraph<V> {}
  class EmptyDigraph<V = any> extends DoubledDigraph<V> {
    add(vertex: any): boolean;
    contains(source: any, target: any): boolean;
    contains(vertex: any): boolean;
    get(source: any, target: any): OptionalInt;
    get edgeCount(): number;
    get vertexCount(): number;
    getInDegree(vertex: any): number;
    getOutDegree(vertex: any): number;
    isAcyclic(): boolean;
    put(source: V, target: V, edgeWeight: number): OptionalInt;
    remove(source: V, target: V): OptionalInt;
    remove(vertex: any): boolean;
    removeAll(vertices: Collection<V>): void;
    reverse(): DoubledDigraph<V>;
    sources(target: any): Iterable<V>;
    subgraph(vertices: Set<V>): Digraph<V>;
    targets(source: any): Iterable<V>;
    totalWeight(): number;
    vertices(): Iterable<V>;
  }


  interface MapDigraph<V = any> extends Digraph<V> {}
  class MapDigraph<V = any> extends Digraph<V> {
    constructor();

    constructor(comparator: Comparator<V>);

    constructor(vertexComparator: Comparator<V>, edgeComparator: Comparator<V>);

    constructor(vertexMapFactory: VertexMapFactory<V>, edgeMapFactory: EdgeMapFactory<V>);
    add(vertex: V): boolean;
    contains(source: V, target: V): boolean;
    contains(vertex: V): boolean;
    get(source: V, target: V): OptionalInt;
    static get defaultDigraphFactory<V>(): DigraphFactory<MapDigraph<V>>;
    get digraphFactory(): DigraphFactory<MapDigraph<V>>;
    get edgeCount(): number;
    get vertexCount(): number;
    static getMapDigraphFactory<V>(vertexMapFactory: VertexMapFactory<V>, edgeMapFactory: EdgeMapFactory<V>): DigraphFactory<MapDigraph<V>>;
    getOutDegree(vertex: V): number;
    hasNext(): boolean;
    hasNext(): boolean;
    isAcyclic(): boolean;
    iterator(): Iterator<V>;
    iterator(): Iterator<V>;
    next(): V;
    next(): V;
    put(source: V, target: V, weight: number): OptionalInt;
    remove(source: V, target: V): OptionalInt;
    remove(vertex: V): boolean;
    remove(): void;
    remove(): void;
    removeAll(vertices: Collection<V>): void;
    reverse(): MapDigraph<V>;
    subgraph(vertices: Set<V>): MapDigraph<V>;
    targets(source: V): Iterable<V>;
    toString(): string;
    toString(): string;
    toString(): string;
    totalWeight(): number;
    vertices(): Iterable<V>;
  }


  interface TrivialDigraph<V = any> extends DoubledDigraph<V> {}
  class TrivialDigraph<V = any> extends DoubledDigraph<V> {
    add(vertex: V): boolean;
    contains(source: any, target: any): boolean;
    contains(vertex: any): boolean;
    get(source: any, target: any): OptionalInt;
    get edgeCount(): number;
    get vertexCount(): number;
    getInDegree(vertex: any): number;
    getOutDegree(vertex: any): number;
    hasNext(): boolean;
    hasNext(): boolean;
    isAcyclic(): boolean;
    iterator(): Iterator<V>;
    iterator(): Iterator<V>;
    next(): V;
    next(): V;
    put(source: V, target: V, loopWeight: number): OptionalInt;
    remove(): void;
    remove(source: V, target: V): OptionalInt;
    remove(vertex: V): boolean;
    remove(): void;
    removeAll(vertices: Collection<V>): void;
    reverse(): DoubledDigraph<V>;
    sources(target: any): Iterable<V>;
    subgraph(vertices: Set<V>): Digraph<V>;
    targets(source: any): Iterable<V>;
    toString(): string;
    toString(): string;
    totalWeight(): number;
    vertices(): Iterable<V>;
  }


  interface UnmodifiableDigraph<V = any> extends DigraphAdapter<V> {}
  class UnmodifiableDigraph<V = any> extends DigraphAdapter<V> {
    constructor(digraph: Digraph<V>);
    add(vertex: V): boolean;
    put(source: V, target: V, edge: number): OptionalInt;
    remove(vertex: V): boolean;
    remove(source: V, target: V): OptionalInt;
    removeAll(vertices: Collection<V>): void;
  }

}

declare module 'de.odysseus.ithaka.digraph.io.dot' {
  import { Number, Iterable } from 'java.lang';
  import { Color } from 'java.awt';
  import { Writer } from 'java.io';
  import { DigraphProvider, Digraph } from 'de.odysseus.ithaka.digraph';

  class DotAttribute {
    constructor(name: string, value: string);

    constructor(name: string, value: Number);

    constructor(name: string, value: boolean);

    constructor(name: string, value: Color);
    get name(): string;
    get value(): string;
    write(writer: Writer): void;
  }


  class DotExporter {
    constructor();

    constructor(indent: string, newline: string);
    export<V, G extends Digraph<V>>(provider: DotProvider<V, G>, digraph: G, subgraphs: DigraphProvider<V, G>, writer: Writer): void;
  }


  class DotProvider<V = any, G extends Digraph<V> = any> {
    getDefaultEdgeAttributes(var1: G): Iterable<DotAttribute>;
    getDefaultGraphAttributes(var1: G): Iterable<DotAttribute>;
    getDefaultNodeAttributes(var1: G): Iterable<DotAttribute>;
    getEdgeAttributes(var1: V, var2: V, var3: number): Iterable<DotAttribute>;
    getNodeAttributes(var1: V): Iterable<DotAttribute>;
    getNodeId(var1: V): string;
    getSubgraphAttributes(var1: G, var2: V): Iterable<DotAttribute>;
  }

}

declare module 'de.odysseus.ithaka.digraph.io.tgf' {
  import { Digraph } from 'de.odysseus.ithaka.digraph';
  import { Writer } from 'java.io';

  class TgfExporter {
    constructor();

    constructor(newline: string);
    export<V>(provider: TgfLabelProvider<V>, digraph: Digraph<V>, writer: Writer): void;
  }


  class TgfLabelProvider<V = any> {
    getEdgeLabel(var1: number): string;
    getVertexLabel(var1: V): string;
  }

}

declare module 'de.odysseus.ithaka.digraph.MapDigraph' {
  import { Map } from 'java.util';
  import { Object2IntMap } from 'it.unimi.dsi.fastutil.objects';

  class VertexMapFactory<V = any> {
    create(): Map<V, Object2IntMap<V>>;
  }


  class EdgeMapFactory<V = any> {
    create(var1: V): Object2IntMap<V>;
  }

}

declare module 'de.odysseus.ithaka.digraph.util.fas' {
  import { Digraph, EdgeWeights, UnmodifiableDigraph } from 'de.odysseus.ithaka.digraph';
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface AbstractFeedbackArcSetProvider extends FeedbackArcSetProvider {}
  class AbstractFeedbackArcSetProvider extends FeedbackArcSetProvider {
    getFeedbackArcSet<V>(digraph: Digraph<V>, weights: EdgeWeights<V>, policy: FeedbackArcSetPolicy): FeedbackArcSet<V>;
  }


  interface FeedbackArcSet<V = any> extends UnmodifiableDigraph<V> {}
  class FeedbackArcSet<V = any> extends UnmodifiableDigraph<V> {
    constructor(feedback: Digraph<V>, weight: number, policy: FeedbackArcSetPolicy, exact: boolean);
    static empty<V>(policy: FeedbackArcSetPolicy): FeedbackArcSet<V>;
    get policy(): FeedbackArcSetPolicy;
    get weight(): number;
    isExact(): boolean;
  }


  interface FeedbackArcSetPolicy extends Enum<FeedbackArcSetPolicy> {}
  class FeedbackArcSetPolicy extends Enum<FeedbackArcSetPolicy> {
    static readonly MIN_SIZE: FeedbackArcSetPolicy;
    static readonly MIN_WEIGHT: FeedbackArcSetPolicy;
    static valueOf(name: string): FeedbackArcSetPolicy;
    static values(): FeedbackArcSetPolicy[];
  }


  class FeedbackArcSetProvider {
    getFeedbackArcSet<V>(var1: Digraph<V>, var2: EdgeWeights<V>, var3: FeedbackArcSetPolicy): FeedbackArcSet<V>;
  }


  interface SimpleFeedbackArcSetProvider extends AbstractFeedbackArcSetProvider {}
  class SimpleFeedbackArcSetProvider extends AbstractFeedbackArcSetProvider {
    constructor();

    constructor(numberOfThreads: number);
  }

}

declare module 'de.odysseus.ithaka.digraph.util.fas.AbstractFeedbackArcSetProvider' {
  import { Callable } from 'java.util.concurrent';
  import { FeedbackArcSet } from 'de.odysseus.ithaka.digraph.util.fas';

  interface FeedbackTask<V = any> extends Callable<FeedbackArcSet> {}
  class FeedbackTask<V = any> extends Callable<FeedbackArcSet> {
    call(): FeedbackArcSet<V>;
  }

}