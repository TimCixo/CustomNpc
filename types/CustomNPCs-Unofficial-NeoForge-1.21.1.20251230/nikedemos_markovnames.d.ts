declare module 'nikedemos.markovnames.generators' {
  import { MarkovDictionary } from 'nikedemos.markovnames';

  interface MarkovAncientGreek extends MarkovGenerator {}
  class MarkovAncientGreek extends MarkovGenerator {
    markov2: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovAztec extends MarkovGenerator {}
  class MarkovAztec extends MarkovGenerator {
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovCustomNPCsClassic extends MarkovGenerator {}
  class MarkovCustomNPCsClassic extends MarkovGenerator {
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  class MarkovGenerator {
    markov: MarkovDictionary;
    name: string;
    symbol: string;
    constructor(seqlen: number);

    constructor();
    feminize(element: string, flag: boolean): string;
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
    static load(): void;
    stylize(str: string): string;
  }


  interface MarkovJapanese extends MarkovGenerator {}
  class MarkovJapanese extends MarkovGenerator {
    markov2: MarkovDictionary;
    markov3: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovOldNorse extends MarkovGenerator {}
  class MarkovOldNorse extends MarkovGenerator {
    markov2: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovRoman extends MarkovGenerator {}
  class MarkovRoman extends MarkovGenerator {
    markov2: MarkovDictionary;
    markov3: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    feminize(element: string, flag: boolean): string;
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovSaami extends MarkovGenerator {}
  class MarkovSaami extends MarkovGenerator {
    markov2: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovSlavic extends MarkovGenerator {}
  class MarkovSlavic extends MarkovGenerator {
    constructor(seqlen: number);

    constructor();
    feminize(element: string, flag: boolean): string;
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovSpanish extends MarkovGenerator {}
  class MarkovSpanish extends MarkovGenerator {
    markov2: MarkovDictionary;
    markov3: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }


  interface MarkovWelsh extends MarkovGenerator {}
  class MarkovWelsh extends MarkovGenerator {
    markov2: MarkovDictionary;
    constructor(seqlen: number);

    constructor();
    fetch(gender: number): string;
    fetch(): string;
    static fetch(dictionary: number, gender: number): string;
  }

}

declare module 'nikedemos.markovnames' {
  import { Map, HashMap, Random } from 'java.util';

  class HashMap2D<T1 = any, T2 = any, T3 = any> {
    readonly mMap: Map;
    clear(): void;
    containsKeys(key1: T1, key2: T2): boolean;
    get(key1: T1, key2: T2): T3;
    put(key1: T1, key2: T2, value: T3): T3;
  }


  class Main {
    static readonly GENDER_RANDOM: number;
    static readonly GENDER_MALE: number;
    static readonly GENDER_FEMALE: number;
    static GENERATORS: HashMap;
    static main(args: string[]): void;
  }


  class MarkovDictionary {
    static readonly rng: Random;
    constructor(dictionary: string, seqlen: number);

    constructor(dictionary: string);
    applyDictionary(dictionaryFile: string, seqLen: number): void;
    generateWord(): string;
    getCapitalized(str: string): string;
    getPost(str: string): string;
    incrementSafe(str1: string, str2: string): void;
    static readFile(path: string): string;
  }


  interface MarkovDictionarySPA extends MarkovDictionary {}
  class MarkovDictionarySPA extends MarkovDictionary {
    constructor(dictionary: string, seqlen: number);
    getCapitalizedSPA(str: string): string;
    getPost(str: string): string;
  }

}