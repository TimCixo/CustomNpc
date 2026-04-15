declare module 'earcut4j' {
  import { List } from 'java.util';
  import { Integer } from 'java.lang';
  import { Node } from 'earcut4j.Earcut';

  class Earcut {
    compare(o1: Node, o2: Node): number;
    static earcut(data: number[]): number[];
    static earcut(data: number[], holeIndices: number[], dim: number): number[];
  }

}