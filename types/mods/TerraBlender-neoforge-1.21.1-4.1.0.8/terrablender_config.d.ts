declare module 'terrablender.config' {
  import { UnmodifiableConfig, CommentedConfig, ConfigFormat, UnmodifiableCommentedConfig } from 'com.electronwill.nightconfig.core';
  import { Predicate } from 'java.util.function';
  import { Number } from 'java.lang';
  import { Path } from 'java.nio.file';
  import { List, Map, Set } from 'java.util';
  import { Entry } from 'CommentedConfig';
  import { CommentNode } from 'UnmodifiableCommentedConfig';

  interface Config extends UnmodifiableConfig, CommentedConfig {}
  class Config extends UnmodifiableConfig {
    add<T>(key: string, defaultValue: T, comment: string): T;
    add<T>(key: string, defaultValue: T, comment: string, validator: Predicate<T>): T;
    add(path: string[], value: any): boolean;
    addNumber<T extends Number>(key: string, defaultValue: T, min: T, max: T, comment: string): T;
    clear(): void;
    clearComments(): void;
    commentMap(): Map<string, string>;
    configFormat(): ConfigFormat<any>;
    contains(path: string[]): boolean;
    containsComment(path: string[]): boolean;
    createSubConfig(): CommentedConfig;
    encode(): string;
    entrySet(): Set<Entry>;
    equals(obj: any): boolean;
    get comments(): Map<string, CommentNode>;
    get path(): Path;
    getComment(path: string[]): string;
    getRaw<T>(path: string[]): T;
    hashCode(): number;
    isEmpty(): boolean;
    load(): void;
    parse(toml: string): void;
    putAllComments(comments: Map<string, CommentNode>): void;
    putAllComments(commentedConfig: UnmodifiableCommentedConfig): void;
    read(): void;
    remove<T>(path: string[]): T;
    removeComment(path: string[]): string;
    set<T>(path: string[], value: any): T;
    setComment(path: string[], comment: string): string;
    size(): number;
    toString(): string;
    valueMap(): Map<string, any>;
    write(): void;
  }


  interface TerraBlenderConfig extends Config {}
  class TerraBlenderConfig extends Config {
    overworldRegionSize: number;
    netherRegionSize: number;
    vanillaOverworldRegionWeight: number;
    vanillaNetherRegionWeight: number;
    endHighlandsBiomeSize: number;
    endMidlandsBiomeSize: number;
    endEdgeBiomeSize: number;
    endIslandBiomeSize: number;
    vanillaEndHighlandsWeight: number;
    vanillaEndMidlandsWeight: number;
    vanillaEndBarrensWeight: number;
    vanillaSmallEndIslandsWeight: number;
    constructor(path: Path);
    load(): void;
  }

}