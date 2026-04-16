declare module 'org.anti_ad.a.a.a.a' {
  import { Set } from 'java.util';

  class a {
    static a(string: string, string2: string): boolean;
  }


  class b {
  }


  class c {
    constructor(string: string, string2: string);
    a(): string;
    b(): string;
    equals(object: any): boolean;
    hashCode(): number;
  }


  class d {
    constructor();

    constructor(set: Set);
    a(): Set;
  }

}

declare module 'org.anti_ad.a.b.a.a.a.a' {
  import { List, HashMap, Collection, BitSet, Set, Iterator } from 'java.util';
  import { l as org_anti_ad_a_b_a_a_a_c_l, a as org_anti_ad_a_b_a_a_a_c_a, f as org_anti_ad_a_b_a_a_a_c_f, d as org_anti_ad_a_b_a_a_a_c_d, b as org_anti_ad_a_b_a_a_a_c_b } from 'org.anti_ad.a.b.a.a.a.c';
  import { h_0 as org_anti_ad_a_b_a_a_a_h_0, r_0 as org_anti_ad_a_b_a_a_a_r_0, d_0 as org_anti_ad_a_b_a_a_a_d_0, k_0 as org_anti_ad_a_b_a_a_a_k_0, m_0 as org_anti_ad_a_b_a_a_a_m_0, z as org_anti_ad_a_b_a_a_a_z, g as org_anti_ad_a_b_a_a_a_g } from 'org.anti_ad.a.b.a.a.a';
  import { Enum, Comparable } from 'java.lang';
  import { a as org_anti_ad_a_b_a_a_a_b_a, d as org_anti_ad_a_b_a_a_a_b_d } from 'org.anti_ad.a.b.a.a.a.b';
  import { PrivilegedAction } from 'java.security';

  class a {
    readonly a: List;
    readonly b: List;
    c: am[];
    d: an[];
    readonly e: number;
    readonly f: number;
    g: number[];
    h: g_0[];
    readonly i: List;
    constructor(n2: number, n3: number);
    a(k2: k, h_02: org_anti_ad_a_b_a_a_a_h_0): org_anti_ad_a_b_a_a_a_c_l;
    a(k2: k): org_anti_ad_a_b_a_a_a_c_l;
    a(n2: number): y;
    a(): number;
    a(n2: number, m_02: org_anti_ad_a_b_a_a_a_h_0): org_anti_ad_a_b_a_a_a_c_l;
    b(k2: k): void;
  }


  interface aa extends u {}
  class aa extends u {
    j: ab;
    b(): number;
    b(n2: number): ac_0;
  }


  interface aa_0 extends k {}
  class aa_0 extends k {
    b(): number;
    b(n2: number): ac_0;
  }


  interface ab extends y {}
  class ab extends y {
    b(): number;
    b(n2: number): ac_0;
  }


  interface ab_0 extends y {}
  class ab_0 extends y {
    b(): number;
    b(n2: number): ac_0;
  }


  interface ac extends m {}
  class ac extends m {
    readonly a: number;
    constructor(k2: k, n2: number);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    b(): boolean;
    d(): au;
    toString(): string;
  }


  class ac_0 {
    d: k;
    a(): number;
    a(var1: number, var2: number, var3: number): boolean;
    b(): boolean;
    c(): org_anti_ad_a_b_a_a_a_c_l;
  }


  interface ad extends w {}
  class ad extends w {
    constructor(n2: number, r_02: org_anti_ad_a_b_a_a_a_r_0, n3: number, n4: number, ap2: ap, bl: boolean, n5: number, bl2: boolean);
  }


  interface ad_0 extends HashMap {}
  class ad_0 extends HashMap {
  }


  interface ae extends m {}
  class ae extends m {
    readonly a: number;
    readonly b: number;
    readonly c: boolean;
    constructor(k2: k, n2: number, n3: number, bl: boolean);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    b(): boolean;
    d(): av;
    toString(): string;
  }


  interface ae_0 extends ac_0 {}
  class ae_0 extends ac_0 {
    constructor(k2: k);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    toString(): string;
  }


  class ag {
    a(af2: af): af;
    b(af2: af): af;
  }


  interface ah extends Enum {}
  class ah extends Enum {
    static readonly a: number;
    static readonly b: number;
    static readonly c: number;
    static a(n2: number, hashMap: c): boolean;
    static a(object: c): boolean;
    static a(collection: Collection): number;
    static b(object: c): boolean;
    static b(object: Collection): boolean;
    static c(object: Collection): boolean;
    static c(object: c): Collection;
    static d(object: Collection): BitSet;
    static e(object: Collection): number;
  }


  interface ai extends org_anti_ad_a_b_a_a_a_c_a {}
  class ai extends org_anti_ad_a_b_a_a_a_c_a {
    static readonly a: ai;
    a(object: any, object2: any): boolean;
    a(object: any): number;
  }


  interface aj extends org_anti_ad_a_b_a_a_a_c_f {}
  class aj extends org_anti_ad_a_b_a_a_a_c_f {
    constructor();
  }


  interface ak extends y_0 {}
  class ak extends y_0 {
    constructor(d_02: org_anti_ad_a_b_a_a_a_d_0);
    a(r_02: org_anti_ad_a_b_a_a_a_r_0, n2: number, h_02: org_anti_ad_a_b_a_a_a_h_0): number;
  }


  interface al extends ac_0 {}
  class al extends ac_0 {
    constructor(k2: k, n2: number, n3: number);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    c(): org_anti_ad_a_b_a_a_a_c_l;
    toString(): string;
  }


  interface am extends k {}
  class am extends k {
    g: an;
    h: boolean;
    b(): number;
    b(n2: number): ac_0;
  }


  interface an extends k {}
  class an extends k {
    b(): number;
    b(n2: number): ac_0;
  }


  interface ao extends ac_0 {}
  class ao extends ac_0 {
    readonly a: number;
    b: k;
    constructor(am2: am, n2: number, n3: number, k2: k);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    b(): boolean;
  }


  class ap {
    a(var1: org_anti_ad_a_b_a_a_a_k_0, var2: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
    b(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): ap;
    static b(ap2: ap, ap3: ap): ap;
  }


  interface aq extends at {}
  class aq extends at {
    readonly a: ap[];
    constructor(object: ap, ap2: ap);
    a(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
    b(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): ap;
    static b(ap2: ap, ap3: ap): ap;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface ar extends ap {}
  class ar extends ap {
    static readonly a: ar;
    a(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
  }


  interface as extends at {}
  class as extends at {
    readonly a: ap[];
    constructor(object: ap, ap2: ap);
    a(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
    b(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): ap;
    static b(ap2: ap, ap3: ap): ap;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface at extends ap {}
  class at extends ap {
  }


  interface au extends Comparable, ap {}
  class au extends Comparable {
    constructor(n2: number);
    a(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
    b(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): ap;
    static b(ap2: ap, ap3: ap): ap;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface av extends ap {}
  class av extends ap {
    constructor(n2: number, n3: number, bl: boolean);
    a(k_02: org_anti_ad_a_b_a_a_a_k_0, m_02: org_anti_ad_a_b_a_a_a_m_0): boolean;
    static a(ap2: ap, ap3: ap): ap;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface aw extends ac_0 {}
  class aw extends ac_0 {
    constructor(k2: k, l2: org_anti_ad_a_b_a_a_a_c_l);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    c(): org_anti_ad_a_b_a_a_a_c_l;
    toString(): string;
  }


  interface ax extends af {}
  class ax extends af {
    readonly b: af;
    readonly c: number;
    static a(af2: af, n2: number): ax;
    a(n2: number): af;
    b(): number;
    b(n2: number): number;
    equals(object: any): boolean;
    toString(): string;
  }


  interface ay extends u {}
  class ay extends u {
    b(): number;
    b(n2: number): ac_0;
  }


  interface az extends y {}
  class az extends y {
    g: aa_0;
    j: boolean;
    b(): number;
    b(n2: number): ac_0;
  }


  interface a_0 extends ac_0 {}
  class a_0 extends ac_0 {
    constructor(k2: k);

    constructor(k2: k, n2: number);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    b(): boolean;
    d(): number;
    toString(): string;
  }


  class b {
    readonly a: k;
    readonly b: number;
    c: af;
    d: number;
    readonly e: ap;
    constructor(k2: k, n2: number, af2: af);

    constructor(k2: k, n2: number, af2: af, ap2: ap);

    constructor(b2: b, k2: k);

    constructor(b2: b, k2: k, ap2: ap);

    constructor(b2: b, ap2: ap);

    constructor(b2: b, k2: k, ax2: ax);

    constructor(b2: b, k2: k, af2: af, ap2: ap);
    a(): boolean;
    a(b2: b): boolean;
    b(): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface b_0 extends w {}
  class b_0 extends w {
    constructor(n2: number, c2: c, r_02: org_anti_ad_a_b_a_a_a_r_0, n3: number, n4: number, bl: boolean);
  }


  interface c extends Set {}
  class c extends Set {
    a: d;
    b: number;
    d: boolean;
    e: boolean;
    readonly f: boolean;
    constructor(bl: boolean);

    constructor();
    a(b2: b): boolean;
    a(b2: b, object: org_anti_ad_a_b_a_a_a_c_d): boolean;
    a(): BitSet;
    a(y_02: y_0): void;
    add(object: any): boolean;
    addAll(object: Collection): boolean;
    b(): boolean;
    c(): void;
    clear(): void;
    contains(object: any): boolean;
    containsAll(collection: Collection): boolean;
    equals(object: any): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    iterator(): Iterator;
    remove(object: any): boolean;
    removeAll(collection: Collection): boolean;
    retainAll(collection: Collection): boolean;
    size(): number;
    toArray(objectArray: any[]): any[];
    toString(): string;
  }


  class c_0 {
    constructor(a2: a);
    a(object: k, object2: org_anti_ad_a_b_a_a_a_h_0): org_anti_ad_a_b_a_a_a_c_l;
  }


  interface d extends org_anti_ad_a_b_a_a_a_c_b {}
  class d extends org_anti_ad_a_b_a_a_a_c_b {
    constructor(a2: org_anti_ad_a_b_a_a_a_c_a);
  }


  interface d_0 extends b {}
  class d_0 extends b {
    constructor(k2: k, n2: number, z2: z);

    constructor(d_02: d_0, k2: k);

    constructor(d_02: d_0, k2: k, h_02: h_0);

    constructor(d_02: d_0, k2: k, af2: af);
    a(b2: b): boolean;
    a(): boolean;
    c(): h_0;
    d(): boolean;
    hashCode(): number;
  }


  interface e extends org_anti_ad_a_b_a_a_a_c_a {}
  class e extends org_anti_ad_a_b_a_a_a_c_a {
    static readonly a: e;
    a(object: any, object2: any): boolean;
    a(object: any): number;
  }


  interface e_0 extends j {}
  class e_0 extends j {
    constructor(z2: org_anti_ad_a_b_a_a_a_z, a2: a, aArray: a[], ag2: ag);
    a(object: org_anti_ad_a_b_a_a_a_g, n2: number): number;
    a(): void;
    a(g2: org_anti_ad_a_b_a_a_a_g): string;
    a(n2: number): void;
    a(af2: af): af;
    b(n2: number): void;
    b(g2: org_anti_ad_a_b_a_a_a_g): void;
    b(): ag;
    c(): number;
    d(): number;
  }


  interface f extends d {}
  class f extends d {
    constructor();
  }


  class f_0 {
  }


  class g {
    static a(): g;
    b(): boolean;
    c(): boolean;
    d(): void;
  }


  class g_0 {
    a(): boolean;
    a(var1: org_anti_ad_a_b_a_a_a_z): void;
  }


  class h {
    constructor();

    constructor(g2: g);
    a(object: string[]): a;
  }


  class h_0 {
    static a(g_0Array: h_0, g_02: g_0): h_0;
    a(n2: number): h_0;
    a(z2: org_anti_ad_a_b_a_a_a_z, g2: org_anti_ad_a_b_a_a_a_g, n2: number): void;
    equals(object: any): boolean;
    hashCode(): number;
  }


  class i {
  }


  class j {
    static readonly a: org_anti_ad_a_b_a_a_a_b_d;
    readonly b: a;
    constructor(a2: a, ag2: ag);
    a(): void;
    a(af2: af): af;
    b(): ag;
  }


  interface j_0 extends g_0 {}
  class j_0 extends g_0 {
    constructor(n2: number);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  class k {
    a: a;
    b: number;
    c: number;
    d: boolean;
    f: org_anti_ad_a_b_a_a_a_c_l;
    a(): number;
    a(object: ac_0): void;
    a(n2: number): ac_0;
    b(n2: number): ac_0;
    b(): number;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface k_0 extends g_0 {}
  class k_0 extends g_0 {
    constructor(n2: number, n3: number);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
  }


  interface l extends Enum {}
  class l extends Enum {
    static readonly a: number;
    static readonly b: number;
    static a(): number[];
  }


  interface l_0 extends g_0 {}
  class l_0 extends g_0 {
    constructor(n2: number, g_02: g_0);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    b(): number;
    c(): g_0;
    equals(object: any): boolean;
    hashCode(): number;
  }


  interface m extends ac_0 {}
  class m extends ac_0 {
    constructor(k2: k);
  }


  interface m_0 extends g_0 {}
  class m_0 extends g_0 {
    constructor(n2: number);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface n extends ac_0 {}
  class n extends ac_0 {
    readonly a: number;
    readonly b: number;
    constructor(k2: k, n2: number, n3: number, bl: boolean);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    b(): boolean;
    toString(): string;
  }


  interface n_0 extends g_0 {}
  class n_0 extends g_0 {
    static readonly a: n_0;
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface o extends w {}
  class o extends w {
    constructor(n2: number, c2: c, bitSet: BitSet, r_02: org_anti_ad_a_b_a_a_a_r_0, n3: number, n4: number, bl: boolean);
  }


  interface o_0 extends g_0 {}
  class o_0 extends g_0 {
    static readonly a: o_0;
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface p extends af {}
  class p extends af {
    readonly a: af[];
    readonly b: number[];
    constructor(ax2: ax);

    constructor(afArray: af[], nArray: number[]);
    a(): boolean;
    a(n2: number): af;
    b(): number;
    b(n2: number): number;
    equals(object: any): boolean;
    toString(): string;
  }


  interface p_0 extends g_0 {}
  class p_0 extends g_0 {
    constructor(n2: number);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface q extends ac_0 {}
  class q extends ac_0 {
    readonly a: number;
    constructor(k2: k, n2: number);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    c(): org_anti_ad_a_b_a_a_a_c_l;
    toString(): string;
  }


  interface q_0 extends g_0 {}
  class q_0 extends g_0 {
    static readonly a: q_0;
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface r extends u {}
  class r extends u {
    b(): number;
    b(n2: number): ac_0;
  }


  interface r_0 extends g_0 {}
  class r_0 extends g_0 {
    constructor(n2: number);
    a(): boolean;
    a(z2: org_anti_ad_a_b_a_a_a_z): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface s extends k {}
  class s extends k {
    b(): number;
    b(n2: number): ac_0;
  }


  interface s_0 extends w {}
  class s_0 extends w {
    constructor(n2: number, n3: number, r_02: org_anti_ad_a_b_a_a_a_r_0, n4: number, n5: number, bl: boolean);
  }


  interface t extends k {}
  class t extends k {
    g: u;
    b(): number;
    b(n2: number): ac_0;
  }


  interface t_0 extends k {}
  class t_0 extends k {
    g: k;
    b(): number;
    b(n2: number): ac_0;
  }


  interface u extends y {}
  class u extends y {
    g: t;
  }


  interface u_0 extends aw {}
  class u_0 extends aw {
    constructor(k2: k, l2: org_anti_ad_a_b_a_a_a_c_l);
    a(): number;
    a(n2: number, n3: number, n4: number): boolean;
    toString(): string;
  }


  interface v extends w {}
  class v extends w {
    constructor(n2: number, c2: c, r_02: org_anti_ad_a_b_a_a_a_r_0, n3: number, n4: number);
  }


  interface v_0 extends c {}
  class v_0 extends c {
    constructor();
  }


  class w {
    constructor(n2: number, c2: c, r_02: org_anti_ad_a_b_a_a_a_r_0, n3: number, n4: number, bl: boolean);
  }


  interface w_0 extends d {}
  class w_0 extends d {
    constructor();
  }


  class x {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: s_0;
    g: number;
    h: number;
    i: number;
    j: s_0;
    readonly k: List;
    readonly l: List;
    readonly m: List;
    readonly n: List;
    o: number;
    p: number;
    q: number;
    r: number;
    constructor(n2: number);
    toString(): string;
  }


  class x_0 {
    constructor(ak2: ak);
  }


  interface y extends k {}
  class y extends k {
    h: number;
    i: boolean;
  }


  interface z extends ax {}
  class z extends ax {
    static readonly a: z;
    a(): boolean;
    a(n2: number): af;
    static a(af2: af, n2: number): ax;
    b(): number;
    b(n2: number): number;
    equals(object: any): boolean;
    toString(): string;
  }


  interface z_0 extends PrivilegedAction {}
  class z_0 extends PrivilegedAction {
    run(): any;
  }

}

declare module 'org.anti_ad.a.b.a.a.a' {
  import { a as org_anti_ad_a_b_a_a_a_b_a } from 'org.anti_ad.a.b.a.a.a.b';
  import { BitSet, List, Collection, Map } from 'java.util';
  import { c as org_anti_ad_a_b_a_a_a_a_c, a as org_anti_ad_a_b_a_a_a_a_a, x_0, j as org_anti_ad_a_b_a_a_a_a_j } from 'org.anti_ad.a.b.a.a.a.a';
  import { k as org_anti_ad_a_b_a_a_a_c_k, l as org_anti_ad_a_b_a_a_a_c_l, o as org_anti_ad_a_b_a_a_a_c_o, j as org_anti_ad_a_b_a_a_a_c_j } from 'org.anti_ad.a.b.a.a.a.c';
  import { RulesParser } from 'org.anti_ad.mc.ipnext.gen';
  import { e as org_anti_ad_a_b_a_a_a_d_e, i as org_anti_ad_a_b_a_a_a_d_i, b as org_anti_ad_a_b_a_a_a_d_b, d as org_anti_ad_a_b_a_a_a_d_d, g as org_anti_ad_a_b_a_a_a_d_g, f as org_anti_ad_a_b_a_a_a_d_f } from 'org.anti_ad.a.b.a.a.a.d';
  import { b as org_anti_ad_a_b_a_a_a_d_a_b } from 'org.anti_ad.a.b.a.a.a.d.a';
  import { PrintStream, Serializable } from 'java.io';
  import { Class, RuntimeException, Enum } from 'java.lang';
  import { CharBuffer } from 'java.nio';
  import { CopyOnWriteArrayList } from 'java.util.concurrent';

  class a {
    reportAmbiguity(var1: d_0, var2: org_anti_ad_a_b_a_a_a_b_a, var3: number, var4: number, var5: boolean, var6: BitSet, var7: org_anti_ad_a_b_a_a_a_a_c): void;
    reportAttemptingFullContext(var1: d_0, var2: org_anti_ad_a_b_a_a_a_b_a, var3: number, var4: number, var5: BitSet, var6: org_anti_ad_a_b_a_a_a_a_c): void;
    reportContextSensitivity(var1: d_0, var2: org_anti_ad_a_b_a_a_a_b_a, var3: number, var4: number, var5: number, var6: org_anti_ad_a_b_a_a_a_a_c): void;
    syntaxError(var1: k_0, var2: any, var3: number, var4: number, var5: string, var6: j_0): void;
  }


  interface a_0 extends j_0 {}
  class a_0 extends j_0 {
    constructor(z2: z, g2: g, n2: number, c2: org_anti_ad_a_b_a_a_a_a_c);
    toString(): string;
  }


  class b {
    a(): void;
    a(var1: d_0): o_0;
    a(var1: d_0, var2: j_0): void;
    b(var1: d_0): void;
    b(): boolean;
    b(var1: d_0, var2: j_0): void;
    c(): void;
  }


  interface b_0 extends q_0 {}
  class b_0 extends q_0 {
    constructor(list: List);
    get charPositionInLine(): number;
    get inputStream(): g;
    get line(): number;
    get sourceName(): string;
    get tokenFactory(): p_0;
    nextToken(): o_0;
    set tokenFactory(p_02: p_0);
  }


  interface c extends g {}
  class c extends g {
    constructor();

    constructor(string: string);
    a(): void;
    a(n2: number): number;
    a(k2: org_anti_ad_a_b_a_a_a_c_k): string;
    b(): number;
    b(n2: number): void;
    c(): number;
    d(): string;
    toString(): string;
  }


  interface c_0 extends j_0 {}
  class c_0 extends j_0 {
    constructor(rulesParser: RulesParser);

    constructor(d_02: d_0, r_02: r_0, o_02: o_0, o_03: o_0, c2: org_anti_ad_a_b_a_a_a_a_c, h_02: h_0);
    b(): o_0;
  }


  interface d extends u {}
  class d extends u {
    a(object: d_0, j_02: j_0): void;
    a(object: d_0): o_0;
    a(): void;
    b(d_02: d_0): void;
    b(): boolean;
    b(object: d_0, object2: j_0): void;
  }


  interface d_0 extends k_0 {}
  class d_0 extends k_0 {
    constructor(r_02: r_0);
    addParseListener(e2: org_anti_ad_a_b_a_a_a_d_e): void;
    compileParseTreePattern(string: string, n2: number): org_anti_ad_a_b_a_a_a_d_a_b;
    compileParseTreePattern(string: string, n2: number, z2: z): org_anti_ad_a_b_a_a_a_d_a_b;
    consume(): o_0;
    createErrorNode(h_02: h_0, o_02: o_0): org_anti_ad_a_b_a_a_a_d_b;
    createTerminalNode(h_02: h_0, o_02: o_0): org_anti_ad_a_b_a_a_a_d_i;
    dumpDFA(): void;
    dumpDFA(printStream: PrintStream): void;
    enterOuterAlt(h_02: h_0, n2: number): void;
    enterRecursionRule(h_02: h_0, n2: number): void;
    enterRecursionRule(h_02: h_0, n2: number, n3: number, n4: number): void;
    enterRule(h_02: h_0, n2: number, n3: number): void;
    exitRule(): void;
    get aTNWithBypassAlts(): org_anti_ad_a_b_a_a_a_a_a;
    get buildParseTree(): boolean;
    get context(): h_0;
    get currentToken(): o_0;
    get dFAStrings(): List;
    get errorHandler(): b;
    get expectedTokens(): org_anti_ad_a_b_a_a_a_c_l;
    get expectedTokensWithinCurrentRule(): org_anti_ad_a_b_a_a_a_c_l;
    get inputStream(): r_0;
    get numberOfSyntaxErrors(): number;
    get parseInfo(): x_0;
    get parseListeners(): List;
    get precedence(): number;
    get ruleContext(): h_0;
    get ruleInvocationStack(): List;
    get sourceName(): string;
    get tokenFactory(): p_0;
    get tokenStream(): r_0;
    get trimParseTree(): boolean;
    getInvokingContext(n2: number): h_0;
    getRuleIndex(object: string): number;
    getRuleInvocationStack(m_02: m_0): List;
    inContext(string: string): boolean;
    isExpectedToken(n2: number): boolean;
    isMatchedEOF(): boolean;
    isTrace(): boolean;
    match(n2: number): o_0;
    matchWildcard(): o_0;
    notifyErrorListeners(string: string): void;
    notifyErrorListeners(o_02: o_0, string: string, j_02: j_0): void;
    precpred(m_02: m_0, n2: number): boolean;
    pushNewRecursionContext(h_02: h_0, n2: number, n3: number): void;
    removeParseListener(e2: org_anti_ad_a_b_a_a_a_d_e): void;
    removeParseListeners(): void;
    reset(): void;
    set buildParseTree(bl: boolean);
    set context(h_02: h_0);
    set errorHandler(b2: b);
    set inputStream(x2: x);
    set tokenFactory(p_02: p_0);
    set tokenStream(r_02: r_0);
    set trimParseTree(bl: boolean);
    setProfile(bl: boolean): void;
    setTrace(bl: boolean): void;
    unrollRecursionContexts(h_02: h_0): void;
  }


  interface e extends a {}
  class e extends a {
    reportAmbiguity(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, bl: boolean, bitSet: BitSet, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    reportAttemptingFullContext(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, bitSet: BitSet, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    reportContextSensitivity(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, n4: number, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    syntaxError(k_02: k_0, object: any, n2: number, n3: number, string: string, j_02: j_0): void;
  }


  interface e_0 extends org_anti_ad_a_b_a_a_a_d_e {}
  class e_0 extends org_anti_ad_a_b_a_a_a_d_e {
    constructor(d_02: d_0);
    enterEveryRule(h_02: h_0): void;
    exitEveryRule(h_02: h_0): void;
    visitErrorNode(b2: org_anti_ad_a_b_a_a_a_d_b): void;
    visitTerminal(i2: org_anti_ad_a_b_a_a_a_d_i): void;
  }


  interface f extends r_0 {}
  class f extends r_0 {
    constructor(q_02: q_0);
    a(): void;
    a(n2: number): number;
    a(object: o_0, object2: o_0): string;
    b(): number;
    b(n2: number): void;
    c(): number;
    d(n2: number): o_0;
    d(): string;
    e(): q_0;
    f(n2: number): o_0;
  }


  interface f_0 extends org_anti_ad_a_b_a_a_a_d_e {}
  class f_0 extends org_anti_ad_a_b_a_a_a_d_e {
    static readonly a: f_0;
    enterEveryRule(h_02: h_0): void;
    exitEveryRule(h_02: h_0): void;
    visitErrorNode(b2: org_anti_ad_a_b_a_a_a_d_b): void;
    visitTerminal(i2: org_anti_ad_a_b_a_a_a_d_i): void;
  }


  interface g extends x {}
  class g extends x {
    a(var1: org_anti_ad_a_b_a_a_a_c_k): string;
    a(): void;
    a(var1: number): number;
  }


  interface g_0 extends d_0 {}
  class g_0 extends d_0 {
    constructor(string: string, s_02: s_0, object: Collection, a2: org_anti_ad_a_b_a_a_a_a_a, s2: s);
    a(n2: number): h_0;
    enterRecursionRule(h_02: h_0, n2: number, n3: number, n4: number): void;
    enterRecursionRule(h_02: h_0, n2: number): void;
    get aTN(): org_anti_ad_a_b_a_a_a_a_a;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get tokenNames(): string[];
    get vocabulary(): s_0;
    reset(): void;
  }


  class h {
    a(): number;
    static a(n2: number): j;
    b(): number;
  }


  interface h_0 extends m_0 {}
  class h_0 extends m_0 {
    static readonly EMPTY: h_0;
    children: List;
    start: o_0;
    stop: o_0;
    exception: j_0;
    constructor();

    constructor(h_02: h_0, n2: number);
    addAnyChild(d2: org_anti_ad_a_b_a_a_a_d_d): org_anti_ad_a_b_a_a_a_d_d;
    addChild(m_02: m_0): m_0;
    addChild(i2: org_anti_ad_a_b_a_a_a_d_i): org_anti_ad_a_b_a_a_a_d_i;
    addChild(object: o_0): org_anti_ad_a_b_a_a_a_d_i;
    addErrorNode(b2: org_anti_ad_a_b_a_a_a_d_b): org_anti_ad_a_b_a_a_a_d_b;
    addErrorNode(object: o_0): org_anti_ad_a_b_a_a_a_d_b;
    copyFrom(object: h_0): void;
    enterRule(e2: org_anti_ad_a_b_a_a_a_d_e): void;
    exitRule(e2: org_anti_ad_a_b_a_a_a_d_e): void;
    get childCount(): number;
    get parent(): h_0;
    get ruleContext(): m_0;
    get sourceInterval(): org_anti_ad_a_b_a_a_a_c_k;
    get start(): o_0;
    get stop(): o_0;
    getChild(n2: number): org_anti_ad_a_b_a_a_a_d_d;
    getChild(clazz: Class, n2: number): org_anti_ad_a_b_a_a_a_d_d;
    getRuleContext(clazz: Class, n2: number): h_0;
    getRuleContexts(clazz: Class): List;
    getToken(n2: number, n3: number): org_anti_ad_a_b_a_a_a_d_i;
    getTokens(n2: number): List;
    removeLastChild(): void;
    toInfoString(object: d_0): string;
  }


  class i {
  }


  interface i_0 extends a {}
  class i_0 extends a {
    constructor(collection: Collection);
    reportAmbiguity(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, bl: boolean, bitSet: BitSet, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    reportAttemptingFullContext(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, bitSet: BitSet, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    reportContextSensitivity(d_02: d_0, a2: org_anti_ad_a_b_a_a_a_b_a, n2: number, n3: number, n4: number, c2: org_anti_ad_a_b_a_a_a_a_c): void;
    syntaxError(k_02: k_0, object: any, n2: number, n3: number, string: string, j_02: j_0): void;
  }


  class j {
    a(): h;
    a(object: CharBuffer): void;
  }


  interface j_0 extends RuntimeException {}
  class j_0 extends RuntimeException {
    constructor(k_02: k_0, x2: x, h_02: h_0);

    constructor(string: string, g_02: g_0, r_02: r_0, h_02: h_0);
    a(): x;
    c(): org_anti_ad_a_b_a_a_a_c_l;
    d(): o_0;
  }


  interface k extends Enum {}
  class k extends Enum {
    static readonly a: number;
    static readonly b: number;
    static readonly c: number;
    static a(): number[];
  }


  class k_0 {
    static readonly EOF: number;
    action(m_02: m_0, n2: number, n3: number): void;
    addErrorListener(a2: a): void;
    get aTN(): org_anti_ad_a_b_a_a_a_a_a;
    get errorListenerDispatch(): a;
    get errorListeners(): List;
    get grammarFileName(): string;
    get inputStream(): x;
    get interpreter(): org_anti_ad_a_b_a_a_a_a_j;
    get parseInfo(): x_0;
    get ruleIndexMap(): Map;
    get ruleNames(): string[];
    get serializedATN(): string;
    get state(): number;
    get tokenFactory(): p_0;
    get tokenNames(): string[];
    get tokenTypeMap(): Map;
    get vocabulary(): s_0;
    getErrorHeader(j_02: j_0): string;
    getTokenErrorDisplay(o_02: o_0): string;
    getTokenType(object: string): number;
    precpred(m_02: m_0, n2: number): boolean;
    removeErrorListener(a2: a): void;
    removeErrorListeners(): void;
    sempred(m_02: m_0, n2: number, n3: number): boolean;
    set inputStream(var1: x);
    set interpreter(j2: org_anti_ad_a_b_a_a_a_a_j);
    set state(n2: number);
    set tokenFactory(var1: p_0);
  }


  interface l extends g {}
  class l extends g {
    static a(h2: h, string: string): l;
    a(): void;
    a(var1: org_anti_ad_a_b_a_a_a_c_k): string;
    a(var1: number): number;
    b(): number;
    b(n2: number): void;
    c(): number;
    d(): string;
    toString(): string;
  }


  interface l_0 extends CopyOnWriteArrayList {}
  class l_0 extends CopyOnWriteArrayList {
  }


  class m {
  }


  interface m_0 extends org_anti_ad_a_b_a_a_a_d_g {}
  class m_0 extends org_anti_ad_a_b_a_a_a_d_g {
    parent: m_0;
    invokingState: number;
    constructor();

    constructor(m_02: m_0, n2: number);
    accept(f2: org_anti_ad_a_b_a_a_a_d_f): any;
    depth(): number;
    get altNumber(): number;
    get childCount(): number;
    get parent(): m_0;
    get payload(): m_0;
    get ruleContext(): m_0;
    get ruleIndex(): number;
    get sourceInterval(): org_anti_ad_a_b_a_a_a_c_k;
    get text(): string;
    getChild(n2: number): org_anti_ad_a_b_a_a_a_d_d;
    isEmpty(): boolean;
    set altNumber(n2: number);
    set parent(m_02: m_0);
    toString(): string;
    toString(k_02: k_0): string;
    toString(list: List): string;
    toString(object: k_0, m_02: m_0): string;
    toString(list: List, m_02: m_0): string;
    toStringTree(object: d_0): string;
    toStringTree(list: List): string;
    toStringTree(): string;
  }


  interface n extends l {}
  class n extends l {
    a(k2: org_anti_ad_a_b_a_a_a_c_k): string;
    a(n2: number): number;
    static a(h2: h, string: string): l;
    a(): void;
  }


  class n_0 {
    static a(string: string, string2: string): void;
  }


  interface o extends l {}
  class o extends l {
    a(k2: org_anti_ad_a_b_a_a_a_c_k): string;
    a(n2: number): number;
    static a(h2: h, string: string): l;
    a(): void;
  }


  class o_0 {
    a(): number;
    b(): string;
    c(): number;
    d(): number;
    e(): number;
    f(): number;
    g(): number;
    h(): number;
    i(): q_0;
    j(): g;
  }


  interface p extends l {}
  class p extends l {
    a(k2: org_anti_ad_a_b_a_a_a_c_k): string;
    a(n2: number): number;
    static a(h2: h, string: string): l;
    a(): void;
  }


  class p_0 {
    a(var1: org_anti_ad_a_b_a_a_a_c_o, var2: number, var3: string, var4: number, var5: number, var6: number, var7: number, var8: number): q;
  }


  interface q extends Serializable, u_0 {}
  class q extends Serializable {
    constructor(n2: number);

    constructor(o2: org_anti_ad_a_b_a_a_a_c_o, n2: number, n3: number, n4: number, n5: number);
    a(): number;
    a(n2: number): void;
    a(string: string): void;
    b(): string;
    b(n2: number): void;
    c(): number;
    c(n2: number): void;
    d(): number;
    e(): number;
    f(): number;
    g(): number;
    h(): number;
    i(): q_0;
    j(): g;
    toString(): string;
  }


  class q_0 {
    get charPositionInLine(): number;
    get inputStream(): g;
    get line(): number;
    get sourceName(): string;
    get tokenFactory(): p_0;
    nextToken(): o_0;
    set tokenFactory(var1: p_0);
  }


  interface r extends p_0 {}
  class r extends p_0 {
    static readonly a: r;
    constructor();
    a(object: org_anti_ad_a_b_a_a_a_c_o, n2: number, string: string, n3: number, n4: number, n5: number, n6: number, n7: number): q;
  }


  interface r_0 extends x {}
  class r_0 extends x {
    a(var1: o_0, var2: o_0): string;
    a(): void;
    a(var1: number): number;
    d(var1: number): o_0;
    d(): string;
    e(): q_0;
    f(var1: number): o_0;
  }


  interface s extends f {}
  class s extends f {
    constructor(q_02: q_0);
    f(n2: number): o_0;
  }


  class s_0 {
    a(var1: number): string;
    b(var1: number): string;
    c(var1: number): string;
  }


  interface t extends e {}
  class t extends e {
    static readonly a: t;
    syntaxError(k_02: k_0, object: any, n2: number, n3: number, string: string, j_02: j_0): void;
  }


  interface t_0 extends s_0 {}
  class t_0 extends s_0 {
    static readonly a: t_0;
    constructor(stringArray: string[], stringArray2: string[]);
    static a(stringArray: string[]): t_0;
    a(n2: number): string;
    b(n2: number): string;
    c(n2: number): string;
  }


  interface u extends b {}
  class u extends b {
    a(): void;
    a(d_02: d_0, object: j_0): void;
    a(object: d_0): o_0;
    b(): boolean;
    b(object: d_0, object2: j_0): void;
    b(d_02: d_0): void;
    c(): void;
  }


  interface u_0 extends o_0 {}
  class u_0 extends o_0 {
    c(var1: number): void;
    c(): number;
  }


  interface v extends j_0 {}
  class v extends j_0 {
    constructor(g_02: g_0);

    constructor(g_02: g_0, string: string);
  }


  interface w extends j_0 {}
  class w extends j_0 {
    constructor(d_02: d_0);

    constructor(d_02: d_0, n2: number, h_02: h_0);
  }


  class x {
    a(): void;
    a(var1: number): number;
    b(): number;
    b(var1: number): void;
    c(): number;
    d(): string;
  }


  interface y extends h_0 {}
  class y extends h_0 {
    constructor();

    constructor(h_02: h_0, n2: number, n3: number);
    get ruleIndex(): number;
  }


  interface z extends q_0, k_0 {}
  class z extends q_0 {
    static readonly DEFAULT_MODE: number;
    static readonly MORE: number;
    static readonly SKIP: number;
    static readonly DEFAULT_TOKEN_CHANNEL: number;
    static readonly HIDDEN: number;
    static readonly MIN_CHAR_VALUE: number;
    static readonly MAX_CHAR_VALUE: number;
    _input: g;
    _token: o_0;
    _tokenStartCharIndex: number;
    _tokenStartLine: number;
    _tokenStartCharPositionInLine: number;
    _hitEOF: boolean;
    _channel: number;
    _type: number;
    readonly _modeStack: org_anti_ad_a_b_a_a_a_c_j;
    _mode: number;
    _text: string;
    constructor();

    constructor(g2: g);
    emit(o_02: o_0): void;
    emit(): o_0;
    emitEOF(): o_0;
    get allTokens(): List;
    get channel(): number;
    get channelNames(): string[];
    get charIndex(): number;
    get charPositionInLine(): number;
    get inputStream(): g;
    get line(): number;
    get modeNames(): string[];
    get sourceName(): string;
    get text(): string;
    get token(): o_0;
    get tokenFactory(): p_0;
    get tokenNames(): string[];
    get type(): number;
    getCharErrorDisplay(n2: number): string;
    getErrorDisplay(object: string): string;
    getErrorDisplay(n2: number): string;
    mode(n2: number): void;
    more(): void;
    nextToken(): o_0;
    notifyListeners(a_02: a_0): void;
    popMode(): number;
    pushMode(n2: number): void;
    recover(a_02: a_0): void;
    recover(j_02: j_0): void;
    reset(): void;
    set channel(n2: number);
    set charPositionInLine(n2: number);
    set inputStream(x2: x);
    set line(n2: number);
    set text(string: string);
    set token(o_02: o_0);
    set tokenFactory(p_02: p_0);
    set type(n2: number);
    skip(): void;
  }

}

declare module 'org.anti_ad.a.b.a.a.a.b' {
  import { Map, Comparator } from 'java.util';
  import { y, c as org_anti_ad_a_b_a_a_a_a_c, h_0, ap } from 'org.anti_ad.a.b.a.a.a.a';
  import { s_0 } from 'org.anti_ad.a.b.a.a.a';

  class a {
    readonly a: Map;
    b: d;
    readonly c: number;
    readonly d: y;
    constructor(object: y, n2: number);
    a(): boolean;
    a(s_02: s_0): string;
    toString(): string;
  }


  interface b extends Comparator {}
  class b extends Comparator {
  }


  class c {
    constructor(a2: a, s_02: s_0);
    toString(): string;
  }


  class d {
    a: number;
    b: org_anti_ad_a_b_a_a_a_a_c;
    c: d[];
    d: boolean;
    e: number;
    f: h_0;
    g: boolean;
    h: e[];
    constructor();

    constructor(c2: org_anti_ad_a_b_a_a_a_a_c);
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  class e {
    a: ap;
    b: number;
    constructor(ap2: ap, n2: number);
    toString(): string;
  }

}

declare module 'org.anti_ad.a.b.a.a.a.c' {
  import { Set, Iterator, Collection, Map, List } from 'java.util';
  import { af, ai, ap } from 'org.anti_ad.a.b.a.a.a.a';
  import { s_0, j_0 } from 'org.anti_ad.a.b.a.a.a';
  import { Serializable } from 'java.io';
  import { CancellationException } from 'java.util.concurrent';

  interface a extends e {}
  class a extends e {
  }


  interface b extends Set {}
  class b extends Set {
    constructor();

    constructor(a2: a, n2: number);
    add(object: any): boolean;
    addAll(object: Collection): boolean;
    b(objectArray: any): any;
    clear(): void;
    contains(object: any): boolean;
    containsAll(object: Collection): boolean;
    equals(object: any): boolean;
    hashCode(): number;
    isEmpty(): boolean;
    iterator(): Iterator;
    remove(object: any): boolean;
    removeAll(object: Collection): boolean;
    retainAll(collection: Collection): boolean;
    size(): number;
    toArray(): any[];
    toArray(objectArray: any[]): any[];
    toString(): string;
  }


  interface c extends Iterator {}
  class c extends Iterator {
    constructor(b2: b, objectArray: any[]);
    hasNext(): boolean;
    next(): any;
    remove(): void;
  }


  class d {
    a(af2: af, af3: af, af4: af): any;
    a(object: af, af2: af): any;
  }


  class e {
    a(var1: any): number;
    a(var1: any, var2: any): boolean;
  }


  interface f extends Map {}
  class f extends Map {
    constructor(ai2: ai);
    clear(): void;
    containsKey(object: any): boolean;
    containsValue(object: any): boolean;
    entrySet(): Set;
    equals(object: any): boolean;
    get(object: any): any;
    hashCode(): number;
    isEmpty(): boolean;
    keySet(): Set;
    put(object: any, object2: any): any;
    putAll(map: Map): void;
    remove(object: any): any;
    size(): number;
    toString(): string;
    values(): Collection;
  }


  class g {
    readonly a: any;
    b: any;
    constructor(object: any, object2: any);
    toString(): string;
  }


  class h {
    a(): boolean;
    b(): List;
  }


  class i {
    a(n2: number): void;
    a(): boolean;
    b(n2: number): number;
    b(): number;
    c(n2: number): number;
    c(): void;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface j extends i {}
  class j extends i {
    d(): number;
    e(): number;
  }


  class k {
    static readonly a: k;
    b: number;
    c: number;
    constructor(n2: number, n3: number);
    static a(n2: number, n3: number): k;
    a(k2: k): boolean;
    b(k2: k): boolean;
    c(k2: k): boolean;
    d(k2: k): k;
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface l extends h {}
  class l extends h {
    constructor(...nArray: number[]);
    static a(n2: number): l;
    static a(n2: number, n3: number): l;
    a(object: l): l;
    a(): boolean;
    a(s_02: s_0): string;
    b(n2: number): void;
    b(n2: number, n3: number): void;
    b(l2: l): l;
    b(): List;
    c(n2: number): boolean;
    c(): number;
    d(): number;
    e(): void;
    equals(object: any): boolean;
    f(): void;
    hashCode(): number;
    toString(): string;
  }


  class m {
    static a(n2: number, n3: number): number;
    static a(n2: number, object: any): number;
    static a(apArray: ap[], n2: number): number;
    static b(n2: number, n3: number): number;
  }


  interface n extends a {}
  class n extends a {
    static readonly a: n;
    a(object: any): number;
    a(object: any, object2: any): boolean;
  }


  interface o extends Serializable {}
  class o extends Serializable {
    readonly a: any;
    readonly b: any;
    constructor(object: any, object2: any);
    equals(object: any): boolean;
    hashCode(): number;
    toString(): string;
  }


  interface p extends CancellationException {}
  class p extends CancellationException {
    constructor();

    constructor(j_02: j_0);
  }


  class q {
    static a(iterator: Iterator, string: string): string;
    static a(object: string): string;
  }

}

declare module 'org.anti_ad.a.b.a.a.a.d.a' {
  import { h_0, z, d_0, o_0, q_0, g as org_anti_ad_a_b_a_a_a_g, q } from 'org.anti_ad.a.b.a.a.a';
  import { RuntimeException, Throwable } from 'java.lang';

  class a {
  }


  class b {
    constructor(c2: c, string: string, n2: number, h_02: h_0);
  }


  class c {
    constructor(z2: z, d_02: d_0);
    a(string: string, n2: number): b;
  }


  interface d extends RuntimeException {}
  class d extends RuntimeException {
    constructor(throwable: Throwable);
  }


  interface e extends RuntimeException {}
  class e extends RuntimeException {
  }


  interface f extends o_0 {}
  class f extends o_0 {
    constructor(string: string, n2: number, string2: string);
    a(): number;
    b(): string;
    c(): number;
    d(): number;
    e(): number;
    f(): number;
    g(): number;
    h(): number;
    i(): q_0;
    j(): org_anti_ad_a_b_a_a_a_g;
    toString(): string;
  }


  interface g extends a {}
  class g extends a {
    constructor(string: string, string2: string);
    a(): string;
    b(): string;
    toString(): string;
  }


  interface h extends a {}
  class h extends a {
    constructor(string: string);
    a(): string;
    toString(): string;
  }


  interface i extends q {}
  class i extends q {
    constructor(string: string, n2: number, string2: string);
    b(): string;
    b(n2: number): void;
    toString(): string;
  }

}

declare module 'org.anti_ad.a.b.a.a.a.d' {
  import { o_0, m_0, h_0 } from 'org.anti_ad.a.b.a.a.a';
  import { List } from 'java.util';

  interface a extends f {}
  class a extends f {
    visit(d2: d): any;
    visitChildren(g2: g): any;
    visitErrorNode(b2: b): any;
    visitTerminal(i2: i): any;
  }


  interface b extends i {}
  class b extends i {
  }


  interface c extends b, j {}
  class c extends b {
    constructor(o_02: o_0);
    accept(f2: f): any;
  }


  interface d extends h {}
  class d extends h {
    accept(var1: f): any;
    get text(): string;
    getChild(var1: number): d;
    setParent(var1: m_0): void;
  }


  class e {
    enterEveryRule(var1: h_0): void;
    exitEveryRule(var1: h_0): void;
    visitErrorNode(var1: b): void;
    visitTerminal(var1: i): void;
  }


  class f {
    visitChildren(var1: g): any;
    visitErrorNode(var1: b): any;
    visitTerminal(var1: i): any;
  }


  interface g extends d {}
  class g extends d {
  }


  interface h extends k {}
  class h extends k {
  }


  interface i extends d {}
  class i extends d {
    a(): o_0;
  }


  interface j extends i {}
  class j extends i {
    constructor(o_02: o_0);
    a(): o_0;
    accept(f2: f): any;
    get childCount(): number;
    get text(): string;
    getChild(n2: number): d;
    setParent(m_02: m_0): void;
    toString(): string;
  }


  class k {
    get childCount(): number;
    get payload(): any;
    getChild(var1: number): k;
  }


  class l {
    static a(k2: k, list: List): string;
  }

}

declare module 'org.anti_ad.mc.ipn.api.access' {
  import { Map, List } from 'java.util';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class IContainerClicker {
    click(var1: number, var2: number): void;
    executeClicks(var1: Map): void;
    executeQClicks(var1: Map): void;
    executeSwapClicks(var1: Map): void;
    leftClick(var1: number): void;
    qClick(var1: number): void;
    rightClick(var1: number): void;
    shiftClick(var1: number): void;
    swap(var1: number, var2: number): void;
  }


  interface IPN$Companion$DummyIPN extends IPN {}
  class IPN$Companion$DummyIPN extends IPN {
    get containerClicker(): IContainerClicker;
    get lockedSlots(): List;
  }


  class IPN$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    get instance(): IPN;
    static get instance$annotations(): void;
  }


  class IPN {
    static readonly Companion: IPN$Companion;
    static access$get_IPN$cp(): IPN;
    static access$set_IPN$cp(iPN: IPN): void;
    get containerClicker(): IContainerClicker;
    static get instance(): IPN;
    get lockedSlots(): List;
  }

}

declare module 'org.anti_ad.mc.ipn.api' {
  import { Enum } from 'java.lang';
  import { List } from 'java.util';

  interface IPNButton extends Enum<IPNButton> {}
  class IPNButton extends Enum<IPNButton> {
    static readonly MOVE_TO_CONTAINER: IPNButton;
    static readonly MOVE_TO_PLAYER: IPNButton;
    static readonly SORT: IPNButton;
    static readonly SORT_COLUMNS: IPNButton;
    static readonly SORT_ROWS: IPNButton;
    static readonly CONTINUOUS_CRAFTING: IPNButton;
    static readonly PROFILE_SELECTOR: IPNButton;
    static readonly SHOW_EDITOR: IPNButton;
    static readonly SETTINGS: IPNButton;
    static readonly VILLAGER_DO_GLOBAL_TRADES: IPNButton;
    static readonly VILLAGER_DO_GLOBAL_TRADES1: IPNButton;
    static readonly VILLAGER_DO_GLOBAL_TRADES2: IPNButton;
    static readonly VILLAGER_DO_LOCAL_TRADES: IPNButton;
    static readonly VILLAGER_DO_LOCAL_TRADES1: IPNButton;
    static readonly VILLAGER_DO_LOCAL_TRADES2: IPNButton;
    static readonly VILLAGER_GLOBAL_BOOKMARK: IPNButton;
    static readonly VILLAGER_LOCAL_BOOKMARK: IPNButton;
    static readonly SORT_PLAYER: IPNButton;
    static readonly SORT_COLUMNS_PLAYER: IPNButton;
    static readonly SORT_ROWS_PLAYER: IPNButton;
    static valueOf(name: string): IPNButton;
    static values(): IPNButton[];
  }

}

declare module 'org.anti_ad.mc.ipn.events.api' {
  import { Function0 } from 'kotlin.jvm.functions';

  class Action {
    doIt(var1: any): any;
  }


  class ActionExecutor$PredicateActionBuilder {
    condition: Function0;
    action: Action;
    constructor(actionExecutor: ActionExecutor);
    action(action: Action): ActionExecutor$PredicateActionBuilder;
    build(): void;
    get condition(): Function0;
    getAction(): Action;
    predicate(function0: Function0): ActionExecutor$PredicateActionBuilder;
    set condition(function0: Function0);
    setAction(action: Action): void;
  }


  class ActionExecutor {
    static access$add(actionExecutor: ActionExecutor, action: Action, function0: Function0): void;
    doIt(object: any): any;
    get adder(): ActionExecutor$PredicateActionBuilder;
  }


  interface PredicateActionGroup extends Action, ActionExecutor {}
  class PredicateActionGroup extends Action {
    constructor(function0: Function0);
    doIt(object: any): any;
    get predicate(): Function0;
  }


  interface SimpleActionExecutor extends ActionExecutor {}
  class SimpleActionExecutor extends ActionExecutor {
  }

}

declare module 'org.anti_ad.mc.ipn.features.scrolling' {
  class ScrollingUtils$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'org.anti_ad.mc.ipnext.access' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Map } from 'java.util';
  import { IContainerClicker } from 'org.anti_ad.mc.ipn.api.access';

  class IPNImpl$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    addTickAction(function0: Function0): void;
    init(): void;
    onTickInGame(): void;
  }


  class IPNImplKt {
    static access$getInterval(): number;
    static access$swapSlots(n2: number, n3: number): void;
    static access$translateMap(map: Map): Map;
    static access$translateMapValueToSlot(map: Map): Map;
  }


  interface PContainerClicker extends IContainerClicker {}
  class PContainerClicker extends IContainerClicker {
    click(n2: number, n3: number): void;
    executeClicks(map: Map): void;
    executeQClicks(map: Map): void;
    executeSwapClicks(map: Map): void;
    leftClick(n2: number): void;
    qClick(n2: number): void;
    rightClick(n2: number): void;
    shiftClick(n2: number): void;
    swap(n2: number, n3: number): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.compat.integrations' {
  class Integrations {
    static readonly INSTANCE: Integrations;
    get carpetEmptyShulkersStackSize(): number;
    init(): boolean;
    isEasyShulkerBoxesLoaded(): boolean;
  }

}

declare module 'org.anti_ad.mc.ipnext.config' {
  import { FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { Function0 } from 'kotlin.jvm.functions';
  import { Rule } from 'org.anti_ad.mc.ipnext.item.rule';
  import { BaseConfigScreenSettings } from 'org.anti_ad.mc.common.gui.screen';
  import { List, TimerTask } from 'java.util';
  import { ConfigSaveLoadManager, ConfigOptionDelegateProvider, ConfigDeclaration, ConfigDeclarationBuilder } from 'org.anti_ad.mc.common.config.builder';
  import { Component } from 'net.minecraft.network.chat';
  import { Savable } from 'org.anti_ad.mc.common';
  import { ConfigHotkey, ConfigKeyToggleBoolean, ConfigButton, ConfigString, ConfigBoolean } from 'org.anti_ad.mc.common.config.options';
  import { IConfigOption } from 'org.anti_ad.mc.common.config';
  import { Path } from 'java.nio.file';
  import { ConfigButtonInfo, ConfigButtonClickHandler, CustomButtonWidget } from 'org.anti_ad.mc.common.gui.widgets';

  interface AutoRefillSettings$AUTOREFILL_BLACKLIST$2 extends Function0, FunctionReferenceImpl {}
  class AutoRefillSettings$AUTOREFILL_BLACKLIST$2 extends Function0 {
    invoke(): void;
  }


  class ConfigEnumsExtKt$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  class ConfigEnumsExtKt {
    static rule(sortingMethodIndividual: SortingMethodIndividual, string: string): Rule;
  }


  class ConfigEnumsKt {
  }


  interface ConfigScreenSettings extends BaseConfigScreenSettings {}
  class ConfigScreenSettings extends BaseConfigScreenSettings {
    static readonly INSTANCE: ConfigScreenSettings;
    get configDeclarations(): List;
    get configLabelsPrefix(): string;
    get configOptionsPrefix(): string;
    get configScreenTitle(): Component;
    get configs(): List;
    get onClosed(): Function0;
    get openConfigHotkey(): ConfigHotkey;
    get saveLoadManager(): ConfigSaveLoadManager;
    get saveManager(): Savable;
  }


  class ConfigScreenSettingsKt {
  }


  class ConfigsKt {
    static sameAs(configDeclaration: ConfigDeclaration, iConfigOption: IConfigOption): ConfigOptionDelegateProvider;
  }


  class CustomConfigButtonKt {
    static access$getConfigFolder$p(): Path;
    static get profileFilePath(): Path;
  }


  interface DefaultDelegatedConfigButtonInfo extends ConfigButtonInfo {}
  class DefaultDelegatedConfigButtonInfo extends ConfigButtonInfo {
    get delegate(): ConfigButtonClickHandler;
    onClick(customButtonWidget: CustomButtonWidget): void;
    set delegate(configButtonClickHandler: ConfigButtonClickHandler);
  }


  interface EditProfiles extends ConfigDeclaration {}
  class EditProfiles extends ConfigDeclaration {
    static readonly INSTANCE: EditProfiles;
    get builder(): ConfigDeclarationBuilder;
    get eNABLE_PROFILES(): ConfigKeyToggleBoolean;
    get iNCLUDE_CUSTOM_NAME(): ConfigBoolean;
    get oPEN_CONFIG_PROFILES_HELP(): ConfigButton;
    get oPEN_SERVER_PROFILES(): ConfigButton;
    get pROFILES_PER_SERVER(): ConfigBoolean;
    get qUICK_SLOT_10_PROFILE(): ConfigString;
    get qUICK_SLOT_1_PROFILE(): ConfigString;
    get qUICK_SLOT_2_PROFILE(): ConfigString;
    get qUICK_SLOT_3_PROFILE(): ConfigString;
    get qUICK_SLOT_4_PROFILE(): ConfigString;
    get qUICK_SLOT_5_PROFILE(): ConfigString;
    get qUICK_SLOT_6_PROFILE(): ConfigString;
    get qUICK_SLOT_7_PROFILE(): ConfigString;
    get qUICK_SLOT_8_PROFILE(): ConfigString;
    get qUICK_SLOT_9_PROFILE(): ConfigString;
  }


  interface ExportHints extends ConfigButtonInfo {}
  class ExportHints extends ConfigButtonInfo {
    constructor(bl: boolean);
    get asInternal(): boolean;
    get buttonText(): string;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface Features extends ConfigDeclaration {}
  class Features extends ConfigDeclaration {
    static readonly INSTANCE: Features;
    get builder(): ConfigDeclarationBuilder;
    get eNABLE_AUTO_REFILL(): ConfigKeyToggleBoolean;
    get eNABLE_LOCK_SLOTS(): ConfigKeyToggleBoolean;
    get eNABLE_PROFILES(): ConfigKeyToggleBoolean;
    get eNABLE_SORTING_AND_MOVING(): ConfigKeyToggleBoolean;
    get hIGHLIGHT_FOUSED_ITEMS(): ConfigKeyToggleBoolean;
    get iTEM_SCROLLING(): ConfigKeyToggleBoolean;
    get vILLAGER_TRADING_ENABLE(): ConfigKeyToggleBoolean;
  }


  interface GenerateRuleListButtonInfo extends DefaultDelegatedConfigButtonInfo {}
  class GenerateRuleListButtonInfo extends DefaultDelegatedConfigButtonInfo {
    static readonly INSTANCE: GenerateRuleListButtonInfo;
    get buttonText(): string;
    get delegate(): ConfigButtonClickHandler;
    set delegate(configButtonClickHandler: ConfigButtonClickHandler);
  }


  interface GenerateTagVanillaTxtButtonInfo extends DefaultDelegatedConfigButtonInfo {}
  class GenerateTagVanillaTxtButtonInfo extends DefaultDelegatedConfigButtonInfo {
    static readonly INSTANCE: GenerateTagVanillaTxtButtonInfo;
    get buttonText(): string;
    get delegate(): ConfigButtonClickHandler;
    set delegate(configButtonClickHandler: ConfigButtonClickHandler);
  }


  interface Hotkeys extends ConfigDeclaration {}
  class Hotkeys extends ConfigDeclaration {
    static readonly INSTANCE: Hotkeys;
    get aPPLY_PROFILE(): ConfigHotkey;
    get aUTO_REFILL_GAME_TOGGLE_FOR_SLOT(): ConfigHotkey;
    get aUTO_REFILL_GUI_TOGGLE_FOR_SLOT(): ConfigHotkey;
    get builder(): ConfigDeclarationBuilder;
    get cOPY_COMPONENTS(): ConfigHotkey;
    get cOPY_ITEM_ID(): ConfigHotkey;
    get dO_GLOBAL_TRADE(): ConfigHotkey;
    get dO_GLOBAL_TRADE1(): ConfigHotkey;
    get dO_GLOBAL_TRADE2(): ConfigHotkey;
    get dO_LOCAL_TRADE(): ConfigHotkey;
    get dO_LOCAL_TRADE1(): ConfigHotkey;
    get dO_LOCAL_TRADE2(): ConfigHotkey;
    get dUMP_ITEM_NBT_TO_CHAT(): ConfigHotkey;
    get gLOBAL_BOOKMARK_TRADE(): ConfigHotkey;
    get gLOBAL_BOOKMARK_TRADE1(): ConfigHotkey;
    get gLOBAL_BOOKMARK_TRADE2(): ConfigHotkey;
    get lOCAL_BOOKMARK_TRADE(): ConfigHotkey;
    get lOCAL_BOOKMARK_TRADE1(): ConfigHotkey;
    get lOCAL_BOOKMARK_TRADE2(): ConfigHotkey;
    get mOVE_ALL_ITEMS(): ConfigHotkey;
    get nEXT_PROFILE(): ConfigHotkey;
    get oPEN_CONFIG_MENU(): ConfigHotkey;
    get oPEN_GUI_EDITOR(): ConfigHotkey;
    get pREV_PROFILE(): ConfigHotkey;
    get pROFILE_1(): ConfigHotkey;
    get pROFILE_10(): ConfigHotkey;
    get pROFILE_2(): ConfigHotkey;
    get pROFILE_3(): ConfigHotkey;
    get pROFILE_4(): ConfigHotkey;
    get pROFILE_5(): ConfigHotkey;
    get pROFILE_6(): ConfigHotkey;
    get pROFILE_7(): ConfigHotkey;
    get pROFILE_8(): ConfigHotkey;
    get pROFILE_9(): ConfigHotkey;
    get rELOAD_CUSTOM_CONFIGS(): ConfigHotkey;
    get sAVE_AS_PROFILE(): ConfigHotkey;
    get sCROLL_TO_CHEST(): ConfigHotkey;
    get sCROLL_TO_INVENTORY(): ConfigHotkey;
    get sORT_INVENTORY(): ConfigHotkey;
    get sORT_INVENTORY_IN_COLUMNS(): ConfigHotkey;
    get sORT_INVENTORY_IN_ROWS(): ConfigHotkey;
    get tHROW_ALL_ITEMS(): ConfigHotkey;
  }


  interface LockedSlotsSettings$LOCKED_SLOTS_EMPTY_HOTBAR_BLACKLIST$2 extends Function0, FunctionReferenceImpl {}
  class LockedSlotsSettings$LOCKED_SLOTS_EMPTY_HOTBAR_BLACKLIST$2 extends Function0 {
    invoke(): void;
  }


  interface OpenConfigFolderButtonInfo extends ConfigButtonInfo {}
  class OpenConfigFolderButtonInfo extends ConfigButtonInfo {
    static readonly INSTANCE: OpenConfigFolderButtonInfo;
    get buttonText(): string;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface OpenProfilesConfigButtonInfo extends ConfigButtonInfo {}
  class OpenProfilesConfigButtonInfo extends ConfigButtonInfo {
    static readonly INSTANCE: OpenProfilesConfigButtonInfo;
    get buttonText(): string;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface OpenProfilesHelpButtonInfo extends ConfigButtonInfo {}
  class OpenProfilesHelpButtonInfo extends ConfigButtonInfo {
    static readonly INSTANCE: OpenProfilesHelpButtonInfo;
    get buttonText(): string;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface ReloadRuleFileButtonInfo$onClick$lambda$0$$inlined$schedule$1 extends TimerTask {}
  class ReloadRuleFileButtonInfo$onClick$lambda$0$$inlined$schedule$1 extends TimerTask {
    constructor(customButtonWidget: CustomButtonWidget);
    run(): void;
  }


  interface ReloadRuleFileButtonInfo extends ConfigButtonInfo {}
  class ReloadRuleFileButtonInfo extends ConfigButtonInfo {
    static readonly INSTANCE: ReloadRuleFileButtonInfo;
    get buttonText(): string;
    get delegate(): ConfigButtonClickHandler;
    onClick(customButtonWidget: CustomButtonWidget): void;
    set delegate(configButtonClickHandler: ConfigButtonClickHandler);
  }


  interface ScrollSettings extends ConfigDeclaration {}
  class ScrollSettings extends ConfigDeclaration {
    static readonly INSTANCE: ScrollSettings;
    get builder(): ConfigDeclarationBuilder;
    get dIRECTION_ABSOLUTE(): ConfigBoolean;
    get dISABLE_FOR_NON_EMPTY_BUNDLES(): ConfigBoolean;
    get sCROLL_AUTO_PICKUP_NEXT_FOR_SINGLE(): ConfigBoolean;
    get sCROLL_FULL_STACK(): ConfigHotkey;
    get sCROLL_LEAVE_LAST(): ConfigHotkey;
    get sCROLL_SPREAD(): ConfigHotkey;
    get sCROLL_THROW(): ConfigHotkey;
    get tEMP_DISABLE(): ConfigHotkey;
  }


  interface SortSettings$CATEGORY_ORIGINAL_ORDER$2 extends Function0, FunctionReferenceImpl {}
  class SortSettings$CATEGORY_ORIGINAL_ORDER$2 extends Function0 {
    invoke(): void;
  }


  interface SortSettings$CATEGORY_PRIORITY_LIST$2 extends Function0, FunctionReferenceImpl {}
  class SortSettings$CATEGORY_PRIORITY_LIST$2 extends Function0 {
    invoke(): void;
  }


  interface Tweaks extends ConfigDeclaration {}
  class Tweaks extends ConfigDeclaration {
    static readonly INSTANCE: Tweaks;
    get builder(): ConfigDeclarationBuilder;
    get cONTAINER_SWIPE_MOVING_ITEMS(): ConfigKeyToggleBoolean;
    get pREVENT_CLOSE_GUI_DROP_ITEM(): ConfigKeyToggleBoolean;
    get sWIPE_MOVE_CRAFTING_RESULT_SLOT(): ConfigKeyToggleBoolean;
  }

}

declare module 'org.anti_ad.mc.ipnext.config.defaults' {
  class OverridesKt {
    static readonly AUTO_REFILL_WAIT_TICK_DEFAULT: number;
    static readonly AUTO_REFILL_WAIT_TICK_MINIMUM: number;
  }

}

declare module 'org.anti_ad.mc.ipnext.debug' {
  import { ConfigButtonInfo, ConfigButtonClickHandler, CustomButtonWidget } from 'org.anti_ad.mc.common.gui.widgets';
  import { Path } from 'java.nio.file';
  import { Comparator } from 'java.util';
  import { Function0 } from 'kotlin.jvm.functions';

  interface AbstractBlockScreenScriptGenerator extends ConfigButtonInfo {}
  class AbstractBlockScreenScriptGenerator extends ConfigButtonInfo {
    get buttonText(): string;
    get fileAllItems(): Path;
    get fileBlocks(): Path;
    get fileEntities(): Path;
    get fileItems(): Path;
    get fileMulti(): Path;
    get fileNamespaces(): Path;
    get fileScript(): Path;
    get fileUnknown(): Path;
  }


  interface BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$1 extends Comparator {}
  class BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$2 extends Comparator {}
  class BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$2 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$3 extends Comparator {}
  class BlocksWithScreensUtilsKt$generateCommands$$inlined$sortedByDescending$3 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface GenerateRuleListButtonInfoDelegate extends ConfigButtonClickHandler {}
  class GenerateRuleListButtonInfoDelegate extends ConfigButtonClickHandler {
    static readonly INSTANCE: GenerateRuleListButtonInfoDelegate;
    onClick(object: Function0): void;
  }


  interface GenerateTagsAsJson extends AbstractBlockScreenScriptGenerator {}
  class GenerateTagsAsJson extends AbstractBlockScreenScriptGenerator {
    static readonly INSTANCE: GenerateTagsAsJson;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface GenerateTagVanillaTxtButtonInfoDelegate extends ConfigButtonClickHandler {}
  class GenerateTagVanillaTxtButtonInfoDelegate extends ConfigButtonClickHandler {
    static readonly INSTANCE: GenerateTagVanillaTxtButtonInfoDelegate;
    get fileDatapack(): Path;
    onClick(object: Function0): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.event' {
  import { Runnable, Integer } from 'java.lang';
  import { PClientEventHandler } from 'org.anti_ad.mc.ipnext.specific.event';
  import { Function0, Function3, Function2 } from 'kotlin.jvm.functions';
  import { Slot } from 'net.minecraft.world.inventory';
  import { ItemStack } from 'org.anti_ad.mc.ipnext.item';
  import { List } from 'java.util';
  import { FunctionReferenceImpl, DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Point, Line } from 'org.anti_ad.mc.common.math2d';
  import { ObservableProperty } from 'kotlin.properties';
  import { ProfileItemData } from 'org.anti_ad.mc.ipnext.profiles.config';

  interface AnvilHandler$FirstStageRunnable$run$1$secondStageRunnable$1$run$1$lastRunnable$1 extends Runnable {}
  class AnvilHandler$FirstStageRunnable$run$1$secondStageRunnable$1$run$1$lastRunnable$1 extends Runnable {
    run(): void;
  }


  interface ClientEventHandler extends PClientEventHandler {}
  class ClientEventHandler extends PClientEventHandler {
    static readonly INSTANCE: ClientEventHandler;
    onCrafted(): void;
    onJoinGame(): void;
    onJoinWorld(): void;
    onTick(): void;
    onTickPre(): void;
  }


  class ClientInitHandler {
    static readonly INSTANCE: ClientInitHandler;
    onTickPre(): void;
    register(function0: Function0): boolean;
    unregister(function0: Function0): boolean;
  }


  class ContinuousCraftingHandler$IItemSlotMonitor {
    get slot(): Slot;
    get storedItem(): ItemStack;
    save(): void;
    set storedItem(var1: ItemStack);
  }


  class ContinuousCraftingHandler$IMonitor {
    autoRefill(): boolean;
    get containerSlots(): List;
    get ingredientSlots(): List;
    get playerSlotIndices(): List;
    get slotMonitors(): List;
    save(): void;
    shouldHandle(var1: ItemStack, var2: ItemStack, var3: Slot): boolean;
  }


  class ContinuousCraftingHandler {
    static readonly INSTANCE: ContinuousCraftingHandler;
    get processingClick(): boolean;
    onCrafted(): void;
    onTickInGame(): void;
    set processingClick(bl: boolean);
  }


  class CuttersDispatcher {
    static readonly INSTANCE: CuttersDispatcher;
    addHandler(cutterCraftingHandlerBase: CutterCraftingHandlerBase): void;
    isAnyOldScreen(): boolean;
    isAnyRefillTick(): boolean;
    isAnySkipTick(): boolean;
    isAnyStillCrafting(): boolean;
    onCrafted(): void;
    onTickInGame(): void;
  }


  interface LockSlotsHandler$drawBackground$2 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawBackground$2 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, point2: Point): void;
  }


  interface LockSlotsHandler$drawConfig$1 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawConfig$1 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, point2: Point): void;
  }


  interface LockSlotsHandler$drawConfig$2 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawConfig$2 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, point2: Point): void;
  }


  interface LockSlotsHandler$drawForeground$2 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawForeground$2 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, point2: Point): void;
  }


  interface LockSlotsHandler$drawHotSprite$drawLockedSprite$1 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawHotSprite$drawLockedSprite$1 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, n2: number): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface LockSlotsHandler$drawHotSprite$drawLockedSprite$2 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawHotSprite$drawLockedSprite$2 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, n2: number): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface LockSlotsHandler$drawHotSprite$drawLockedSprite$3 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawHotSprite$drawLockedSprite$3 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, n2: number): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface LockSlotsHandler$drawHotSprite$drawLockedSprite$4 extends Function3, FunctionReferenceImpl {}
  class LockSlotsHandler$drawHotSprite$drawLockedSprite$4 extends Function3 {
    invoke(nativeContext: NativeContext, point: Point, n2: number): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface LockSlotsHandler$special$$inlined$detectable$1 extends ObservableProperty {}
  class LockSlotsHandler$special$$inlined$detectable$1 extends ObservableProperty {
    constructor(object: any);
  }


  class LockSlotsHandler$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  class MouseTracer {
    static readonly INSTANCE: MouseTracer;
    get asLine(): Line;
    get lastLocation(): Point;
    get lastX(): number;
    get lastY(): number;
    get location(): Point;
    get x(): number;
    get y(): number;
    onTick(): void;
  }


  interface ProfileSwitchHandler$ProfileMonitor$findAndSwap$swapWith$1 extends Function2, FunctionReferenceImpl {}
  class ProfileSwitchHandler$ProfileMonitor$findAndSwap$swapWith$1 extends Function2 {
    invoke(profileItemData: ProfileItemData, list: List): number;
  }


  class Sounds$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    registerAll(): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.event.autorefill' {
  import { Function0 } from 'kotlin.jvm.functions';
  import { Comparator } from 'java.util';
  import { Holder, DefaultedRegistry } from 'net.minecraft.core';
  import { TagKey } from 'net.minecraft.tags';

  class AutoRefillHandler$IdAndIndex {
    constructor(function0: Function0, function02: Function0);
    get id(): Function0;
    get index(): Function0;
  }


  interface AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$1 extends Comparator {}
  class AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$1 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$2 extends Comparator {}
  class AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$2 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$3 extends Comparator {}
  class AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$3 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$4 extends Comparator {}
  class AutoRefillHandler$ItemSlotMonitor$Companion$findCorrespondingSlot$$inlined$thenComparator$4 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  class AutoRefillHandler$ItemSlotMonitor$Companion$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
    static readonly $EnumSwitchMapping$1: number[];
  }


  class AutoRefillHandler$ItemSlotMonitor$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  class AutoRefillHandler$WatchIds {
    static readonly INSTANCE: AutoRefillHandler$WatchIds;
    static readonly MAIN_HAND_OFFSET: number;
    equals(object: any): boolean;
    get chest(): AutoRefillHandler$IdAndIndex;
    get feet(): AutoRefillHandler$IdAndIndex;
    get head(): AutoRefillHandler$IdAndIndex;
    get legs(): AutoRefillHandler$IdAndIndex;
    get mainHandSelected(): AutoRefillHandler$IdAndIndex;
    get offHand(): AutoRefillHandler$IdAndIndex;
    hashCode(): number;
    toString(): string;
  }


  class SpecificItemSlotMonitor$DefaultImpls {
    static getEntry(specificItemSlotMonitor: SpecificItemSlotMonitor, defaultedRegistry: DefaultedRegistry, object: any): Holder;
    static isIn(specificItemSlotMonitor: SpecificItemSlotMonitor, holder: Holder, tagKey: TagKey): boolean;
  }


  class SpecificItemSlotMonitor {
    getEntry(var1: DefaultedRegistry, var2: any): Holder;
    isIn(var1: Holder, var2: TagKey): boolean;
  }

}

declare module 'org.anti_ad.mc.ipnext.event.villagers' {
  import { GeneratedSerializer, SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { Encoder, Decoder, CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { KSerializer } from 'kotlinx.serialization';
  import { DefaultConstructorMarker, FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { Map, TimerTask, List, Timer } from 'java.util';
  import { Lazy } from 'kotlin';
  import { Function1, Function2 } from 'kotlin.jvm.functions';
  import { Path } from 'java.nio.file';
  import { Tag } from 'net.minecraft.nbt';
  import { MerchantScreen } from 'net.minecraft.client.gui.screens.inventory';

  interface Config$$serializer extends GeneratedSerializer {}
  class Config$$serializer extends GeneratedSerializer {
    static readonly INSTANCE: Config$$serializer;
    childSerializers(): KSerializer[];
    deserialize(decoder: Decoder): Config;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, config: Config): void;
  }


  class Config$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    serializer(): KSerializer;
  }


  class Config {
    static readonly Companion: Config$Companion;
    constructor(map: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map);

    constructor(map: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(n2: number, map: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): Lazy[];
    asSanitized(): Config;
    cleanDirty(): void;
    clear(): void;
    component1(): Map;
    component2(): Map;
    component3(): Map;
    component4(): Map;
    component5(): Map;
    component6(): Map;
    copy(map: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map): Config;
    static copy$default(config: Config, map: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map, n2: number, object: any): Config;
    copyFrom(config: Config): void;
    equals(object: any): boolean;
    get globalBookmarks(): Map;
    get globalBookmarks1(): Map;
    get globalBookmarks2(): Map;
    get localBookmarks(): Map;
    get localBookmarks1(): Map;
    get localBookmarks2(): Map;
    get sync(): any;
    static get sync$annotations(): void;
    hashCode(): number;
    isDirty(): boolean;
    static isDirty$annotations(): void;
    markDirty(): void;
    toString(): string;
    static write$Self$neoforge_1_21_1(config: Config, compositeEncoder: CompositeEncoder, serialDescriptor: SerialDescriptor): void;
  }


  interface VillagerDataManager$saveIfDirty$lambda$0$$inlined$timer$1 extends TimerTask {}
  class VillagerDataManager$saveIfDirty$lambda$0$$inlined$timer$1 extends TimerTask {
    constructor(function1: Function1);
    run(): void;
  }


  interface VillagerDataManager$saveIfDirty$task$1 extends Function1 {}
  class VillagerDataManager$saveIfDirty$task$1 extends Function1 {
    get maxTimesEmpty(): number;
    get timesEmpty(): number;
    invoke(object: TimerTask): void;
    set timesEmpty(n2: number);
  }


  class VillagerDataManager {
    static readonly INSTANCE: VillagerDataManager;
    static access$getConfig$p(): Config;
    static access$getTimerSync$p(): any;
    static access$save(villagerDataManager: VillagerDataManager, config: Config): void;
    addGlobal(string: string, villagerTradeData: VillagerTradeData): void;
    addGlobal1(string: string, villagerTradeData: VillagerTradeData): void;
    addGlobal2(string: string, villagerTradeData: VillagerTradeData): void;
    addLocal(string: string, villagerTradeData: VillagerTradeData): void;
    addLocal1(string: string, villagerTradeData: VillagerTradeData): void;
    addLocal2(string: string, villagerTradeData: VillagerTradeData): void;
    checkOldConfig(): boolean;
    get saveTimer(): Timer;
    getGlobal(string: string): List;
    getGlobal1(string: string): List;
    getGlobal2(string: string): List;
    getLocal(string: string): List;
    getLocal1(string: string): List;
    getLocal2(string: string): List;
    init(path: Path, bl: boolean): void;
    removeGlobal(string: string, villagerTradeData: VillagerTradeData): void;
    removeGlobal1(string: string, villagerTradeData: VillagerTradeData): void;
    removeGlobal2(string: string, villagerTradeData: VillagerTradeData): void;
    removeLocal(string: string, villagerTradeData: VillagerTradeData): void;
    removeLocal1(string: string, villagerTradeData: VillagerTradeData): void;
    removeLocal2(string: string, villagerTradeData: VillagerTradeData): void;
    saveIfDirty(): void;
    set saveTimer(timer2: Timer);
  }


  interface VillagerTradeData$$serializer extends GeneratedSerializer {}
  class VillagerTradeData$$serializer extends GeneratedSerializer {
    static readonly INSTANCE: VillagerTradeData$$serializer;
    childSerializers(): KSerializer[];
    deserialize(decoder: Decoder): VillagerTradeData;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, villagerTradeData: VillagerTradeData): void;
  }


  class VillagerTradeData$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    serializer(): KSerializer;
  }


  class VillagerTradeData {
    static readonly Companion: VillagerTradeData$Companion;
    constructor(string: string, object: string, string2: string, string3: string, string4: string, string5: string);

    constructor(string: string, string2: string, string3: string, string4: string, string5: string, string6: string, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(n2: number, object: string, string: string, string2: string, string3: string, string4: string, string5: string, serializationConstructorMarker: SerializationConstructorMarker);
    component1(): string;
    component2(): string;
    component3(): string;
    component4(): string;
    component5(): string;
    component6(): string;
    copy(string: string, string2: string, string3: string, string4: string, string5: string, string6: string): VillagerTradeData;
    static copy$default(villagerTradeData: VillagerTradeData, string: string, string2: string, string3: string, string4: string, string5: string, string6: string, n2: number, object: any): VillagerTradeData;
    equals(object: any): boolean;
    get price1Nbt(): Tag;
    static get price1Nbt$annotations(): void;
    get price2Nbt(): Tag;
    static get price2Nbt$annotations(): void;
    get priceItem1(): string;
    get priceItem1NBT(): string;
    get priceItem2(): string;
    get priceItem2NBT(): string;
    get resultItem(): string;
    get resultItemNBT(): string;
    get resultNbt(): Tag;
    static get resultNbt$annotations(): void;
    hashCode(): number;
    toString(): string;
    static write$Self$neoforge_1_21_1(villagerTradeData: VillagerTradeData, compositeEncoder: CompositeEncoder, serialDescriptor: SerialDescriptor): void;
  }


  interface VillagerTradeManager$doTrades$1 extends Function2, FunctionReferenceImpl {}
  class VillagerTradeManager$doTrades$1 extends Function2 {
    invoke(merchantScreen: MerchantScreen, list: List): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.gen' {
  import { z, s_0, g, h_0, d_0, r_0 } from 'org.anti_ad.a.b.a.a.a';
  import { a } from 'org.anti_ad.a.b.a.a.a.a';
  import { i, e, f, b, a as org_anti_ad_a_b_a_a_a_d_a } from 'org.anti_ad.a.b.a.a.a.d';
  import { List } from 'java.util';
  import { ScriptContext, ProfileContext, SlotsDefContext, SlotDefContext, ItemDefContext, ItemNameContext, CustomNameContext, ComponentsContext, ComponentContext, NameContext, SlotnameContext, ActiveSlotNameContext } from 'ProfilesParser';
  import { CustomRuleEOFContext, SubRuleEOFContext, HeadContext, SubRuleContext, SubRuleIdentifierContext, ArgumentsContext, PairContext } from 'RulesParser';

  class ModInfo {
    static readonly INSTANCE: ModInfo;
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MOD_VERSION: string;
    static readonly MOD_LOADER: string;
    static readonly GIT_HASH: string;
    static readonly CURSEFORGE_URL: string;
    static readonly MODRINTH_URL: string;
  }


  interface ProfilesLexer extends z {}
  class ProfilesLexer extends z {
    static readonly WS: number;
    static readonly PROFILE: number;
    static readonly ACTIVATE: number;
    static readonly HOT1: number;
    static readonly HOT2: number;
    static readonly HOT3: number;
    static readonly HOT4: number;
    static readonly HOT5: number;
    static readonly HOT6: number;
    static readonly HOT7: number;
    static readonly HOT8: number;
    static readonly HOT9: number;
    static readonly CHESTPLATE: number;
    static readonly LEGS: number;
    static readonly FEET: number;
    static readonly HEAD: number;
    static readonly OFFHAND: number;
    static readonly COMMA: number;
    static readonly LPAREN: number;
    static readonly RPAREN: number;
    static readonly LBRACK: number;
    static readonly RBRACK: number;
    static readonly LBRACE: number;
    static readonly RBRACE: number;
    static readonly DQUOTE: number;
    static readonly LID: number;
    static readonly COLON: number;
    static readonly ARROW: number;
    static readonly Level: number;
    static readonly Id: number;
    static readonly NamespacedId: number;
    static readonly STRING: number;
    static channelNames: string[];
    static modeNames: string[];
    static readonly ruleNames: string[];
    static readonly VOCABULARY: s_0;
    static readonly tokenNames: string[];
    static readonly _serializedATN: string;
    static readonly _ATN: a;
    constructor(g2: g);
    get aTN(): a;
    get channelNames(): string[];
    get grammarFileName(): string;
    get modeNames(): string[];
    get ruleNames(): string[];
    get serializedATN(): string;
    get tokenNames(): string[];
    get vocabulary(): s_0;
  }


  interface ProfilesParser$ActiveSlotNameContext extends h_0 {}
  class ProfilesParser$ActiveSlotNameContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    HOT1(): i;
    HOT2(): i;
    HOT3(): i;
    HOT4(): i;
    HOT5(): i;
    HOT6(): i;
    HOT7(): i;
    HOT8(): i;
    HOT9(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$ComponentContext extends h_0 {}
  class ProfilesParser$ComponentContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    NamespacedId(): i;
    accept(f2: f): any;
    customName(): ProfilesParser$CustomNameContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$ComponentsContext extends h_0 {}
  class ProfilesParser$ComponentsContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    COMMA(): List;
    COMMA(n2: number): i;
    LBRACK(): i;
    RBRACK(): i;
    accept(f2: f): any;
    component(): List;
    component(n2: number): ProfilesParser$ComponentContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$CustomNameContext extends h_0 {}
  class ProfilesParser$CustomNameContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    LPAREN(): i;
    RPAREN(): i;
    STRING(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$ItemDefContext extends h_0 {}
  class ProfilesParser$ItemDefContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    ARROW(): i;
    accept(f2: f): any;
    components(): ProfilesParser$ComponentsContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    itemName(): ProfilesParser$ItemNameContext;
  }


  interface ProfilesParser$ItemNameContext extends h_0 {}
  class ProfilesParser$ItemNameContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    NamespacedId(): i;
    accept(f2: f): any;
    customName(): ProfilesParser$CustomNameContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$NameContext extends h_0 {}
  class ProfilesParser$NameContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    COLON(): i;
    LID(): i;
    NamespacedId(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$ProfileContext extends h_0 {}
  class ProfilesParser$ProfileContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    ACTIVATE(): i;
    Id(): i;
    PROFILE(): i;
    accept(f2: f): any;
    activeSlotName(): ProfilesParser$ActiveSlotNameContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    slotsDef(): ProfilesParser$SlotsDefContext;
  }


  interface ProfilesParser$ScriptContext extends h_0 {}
  class ProfilesParser$ScriptContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    EOF(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    profile(): List;
    profile(n2: number): ProfilesParser$ProfileContext;
  }


  interface ProfilesParser$SlotDefContext extends h_0 {}
  class ProfilesParser$SlotDefContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    itemDef(): List;
    itemDef(n2: number): ProfilesParser$ItemDefContext;
    slotname(): ProfilesParser$SlotnameContext;
  }


  interface ProfilesParser$SlotnameContext extends h_0 {}
  class ProfilesParser$SlotnameContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    CHESTPLATE(): i;
    FEET(): i;
    HEAD(): i;
    HOT1(): i;
    HOT2(): i;
    HOT3(): i;
    HOT4(): i;
    HOT5(): i;
    HOT6(): i;
    HOT7(): i;
    HOT8(): i;
    HOT9(): i;
    LEGS(): i;
    OFFHAND(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface ProfilesParser$SlotsDefContext extends h_0 {}
  class ProfilesParser$SlotsDefContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    slotDef(): List;
    slotDef(n2: number): ProfilesParser$SlotDefContext;
  }


  interface ProfilesParser extends d_0 {}
  class ProfilesParser extends d_0 {
    static readonly WS: number;
    static readonly PROFILE: number;
    static readonly ACTIVATE: number;
    static readonly HOT1: number;
    static readonly HOT2: number;
    static readonly HOT3: number;
    static readonly HOT4: number;
    static readonly HOT5: number;
    static readonly HOT6: number;
    static readonly HOT7: number;
    static readonly HOT8: number;
    static readonly HOT9: number;
    static readonly CHESTPLATE: number;
    static readonly LEGS: number;
    static readonly FEET: number;
    static readonly HEAD: number;
    static readonly OFFHAND: number;
    static readonly COMMA: number;
    static readonly LPAREN: number;
    static readonly RPAREN: number;
    static readonly LBRACK: number;
    static readonly RBRACK: number;
    static readonly LBRACE: number;
    static readonly RBRACE: number;
    static readonly DQUOTE: number;
    static readonly LID: number;
    static readonly COLON: number;
    static readonly ARROW: number;
    static readonly Level: number;
    static readonly Id: number;
    static readonly NamespacedId: number;
    static readonly STRING: number;
    static readonly RULE_script: number;
    static readonly RULE_profile: number;
    static readonly RULE_slotsDef: number;
    static readonly RULE_slotDef: number;
    static readonly RULE_itemDef: number;
    static readonly RULE_itemName: number;
    static readonly RULE_customName: number;
    static readonly RULE_components: number;
    static readonly RULE_component: number;
    static readonly RULE_name: number;
    static readonly RULE_slotname: number;
    static readonly RULE_activeSlotName: number;
    static readonly ruleNames: string[];
    static readonly VOCABULARY: s_0;
    static readonly tokenNames: string[];
    static readonly _serializedATN: string;
    static readonly _ATN: a;
    constructor(r_02: r_0);
    activeSlotName(): ProfilesParser$ActiveSlotNameContext;
    component(): ProfilesParser$ComponentContext;
    components(): ProfilesParser$ComponentsContext;
    customName(): ProfilesParser$CustomNameContext;
    get aTN(): a;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    get tokenNames(): string[];
    get vocabulary(): s_0;
    itemDef(): ProfilesParser$ItemDefContext;
    itemName(): ProfilesParser$ItemNameContext;
    profile(): ProfilesParser$ProfileContext;
    script(): ProfilesParser$ScriptContext;
    slotDef(): ProfilesParser$SlotDefContext;
    slotname(): ProfilesParser$SlotnameContext;
    slotsDef(): ProfilesParser$SlotsDefContext;
  }


  interface ProfilesParserBaseListener extends ProfilesParserListener {}
  class ProfilesParserBaseListener extends ProfilesParserListener {
    enterActiveSlotName(profilesParser$ActiveSlotNameContext: ProfilesParser$ActiveSlotNameContext): void;
    enterActiveSlotName(var1: ActiveSlotNameContext): void;
    enterComponent(profilesParser$ComponentContext: ProfilesParser$ComponentContext): void;
    enterComponent(var1: ComponentContext): void;
    enterComponents(profilesParser$ComponentsContext: ProfilesParser$ComponentsContext): void;
    enterComponents(var1: ComponentsContext): void;
    enterCustomName(profilesParser$CustomNameContext: ProfilesParser$CustomNameContext): void;
    enterCustomName(var1: CustomNameContext): void;
    enterEveryRule(h_02: h_0): void;
    enterItemDef(profilesParser$ItemDefContext: ProfilesParser$ItemDefContext): void;
    enterItemDef(var1: ItemDefContext): void;
    enterItemName(profilesParser$ItemNameContext: ProfilesParser$ItemNameContext): void;
    enterItemName(var1: ItemNameContext): void;
    enterName(profilesParser$NameContext: ProfilesParser$NameContext): void;
    enterName(var1: NameContext): void;
    enterProfile(profilesParser$ProfileContext: ProfilesParser$ProfileContext): void;
    enterProfile(var1: ProfileContext): void;
    enterScript(profilesParser$ScriptContext: ProfilesParser$ScriptContext): void;
    enterScript(var1: ScriptContext): void;
    enterSlotDef(profilesParser$SlotDefContext: ProfilesParser$SlotDefContext): void;
    enterSlotDef(var1: SlotDefContext): void;
    enterSlotname(profilesParser$SlotnameContext: ProfilesParser$SlotnameContext): void;
    enterSlotname(var1: SlotnameContext): void;
    enterSlotsDef(profilesParser$SlotsDefContext: ProfilesParser$SlotsDefContext): void;
    enterSlotsDef(var1: SlotsDefContext): void;
    exitActiveSlotName(profilesParser$ActiveSlotNameContext: ProfilesParser$ActiveSlotNameContext): void;
    exitActiveSlotName(var1: ActiveSlotNameContext): void;
    exitComponent(profilesParser$ComponentContext: ProfilesParser$ComponentContext): void;
    exitComponent(var1: ComponentContext): void;
    exitComponents(profilesParser$ComponentsContext: ProfilesParser$ComponentsContext): void;
    exitComponents(var1: ComponentsContext): void;
    exitCustomName(profilesParser$CustomNameContext: ProfilesParser$CustomNameContext): void;
    exitCustomName(var1: CustomNameContext): void;
    exitEveryRule(h_02: h_0): void;
    exitItemDef(profilesParser$ItemDefContext: ProfilesParser$ItemDefContext): void;
    exitItemDef(var1: ItemDefContext): void;
    exitItemName(profilesParser$ItemNameContext: ProfilesParser$ItemNameContext): void;
    exitItemName(var1: ItemNameContext): void;
    exitName(profilesParser$NameContext: ProfilesParser$NameContext): void;
    exitName(var1: NameContext): void;
    exitProfile(profilesParser$ProfileContext: ProfilesParser$ProfileContext): void;
    exitProfile(var1: ProfileContext): void;
    exitScript(profilesParser$ScriptContext: ProfilesParser$ScriptContext): void;
    exitScript(var1: ScriptContext): void;
    exitSlotDef(profilesParser$SlotDefContext: ProfilesParser$SlotDefContext): void;
    exitSlotDef(var1: SlotDefContext): void;
    exitSlotname(profilesParser$SlotnameContext: ProfilesParser$SlotnameContext): void;
    exitSlotname(var1: SlotnameContext): void;
    exitSlotsDef(profilesParser$SlotsDefContext: ProfilesParser$SlotsDefContext): void;
    exitSlotsDef(var1: SlotsDefContext): void;
    visitErrorNode(b2: b): void;
    visitTerminal(i2: i): void;
  }


  interface ProfilesParserBaseVisitor extends ProfilesParserVisitor, org_anti_ad_a_b_a_a_a_d_a {}
  class ProfilesParserBaseVisitor extends ProfilesParserVisitor {
    visitActiveSlotName(profilesParser$ActiveSlotNameContext: ProfilesParser$ActiveSlotNameContext): any;
    visitComponent(profilesParser$ComponentContext: ProfilesParser$ComponentContext): any;
    visitComponents(profilesParser$ComponentsContext: ProfilesParser$ComponentsContext): any;
    visitCustomName(profilesParser$CustomNameContext: ProfilesParser$CustomNameContext): any;
    visitItemDef(profilesParser$ItemDefContext: ProfilesParser$ItemDefContext): any;
    visitItemName(profilesParser$ItemNameContext: ProfilesParser$ItemNameContext): any;
    visitName(profilesParser$NameContext: ProfilesParser$NameContext): any;
    visitProfile(profilesParser$ProfileContext: ProfilesParser$ProfileContext): any;
    visitScript(profilesParser$ScriptContext: ProfilesParser$ScriptContext): any;
    visitSlotDef(profilesParser$SlotDefContext: ProfilesParser$SlotDefContext): any;
    visitSlotname(profilesParser$SlotnameContext: ProfilesParser$SlotnameContext): any;
    visitSlotsDef(profilesParser$SlotsDefContext: ProfilesParser$SlotsDefContext): any;
  }


  interface ProfilesParserListener extends e {}
  class ProfilesParserListener extends e {
    enterActiveSlotName(var1: ActiveSlotNameContext): void;
    enterComponent(var1: ComponentContext): void;
    enterComponents(var1: ComponentsContext): void;
    enterCustomName(var1: CustomNameContext): void;
    enterItemDef(var1: ItemDefContext): void;
    enterItemName(var1: ItemNameContext): void;
    enterName(var1: NameContext): void;
    enterProfile(var1: ProfileContext): void;
    enterScript(var1: ScriptContext): void;
    enterSlotDef(var1: SlotDefContext): void;
    enterSlotname(var1: SlotnameContext): void;
    enterSlotsDef(var1: SlotsDefContext): void;
    exitActiveSlotName(var1: ActiveSlotNameContext): void;
    exitComponent(var1: ComponentContext): void;
    exitComponents(var1: ComponentsContext): void;
    exitCustomName(var1: CustomNameContext): void;
    exitItemDef(var1: ItemDefContext): void;
    exitItemName(var1: ItemNameContext): void;
    exitName(var1: NameContext): void;
    exitProfile(var1: ProfileContext): void;
    exitScript(var1: ScriptContext): void;
    exitSlotDef(var1: SlotDefContext): void;
    exitSlotname(var1: SlotnameContext): void;
    exitSlotsDef(var1: SlotsDefContext): void;
  }


  interface ProfilesParserVisitor extends f {}
  class ProfilesParserVisitor extends f {
    visitActiveSlotName(var1: ProfilesParser$ActiveSlotNameContext): any;
    visitComponent(var1: ProfilesParser$ComponentContext): any;
    visitComponents(var1: ProfilesParser$ComponentsContext): any;
    visitCustomName(var1: ProfilesParser$CustomNameContext): any;
    visitItemDef(var1: ProfilesParser$ItemDefContext): any;
    visitItemName(var1: ProfilesParser$ItemNameContext): any;
    visitName(var1: ProfilesParser$NameContext): any;
    visitProfile(var1: ProfilesParser$ProfileContext): any;
    visitScript(var1: ProfilesParser$ScriptContext): any;
    visitSlotDef(var1: ProfilesParser$SlotDefContext): any;
    visitSlotname(var1: ProfilesParser$SlotnameContext): any;
    visitSlotsDef(var1: ProfilesParser$SlotsDefContext): any;
  }


  interface RulesLexer extends z {}
  class RulesLexer extends z {
    static readonly WS: number;
    static readonly AT: number;
    static readonly ERR: number;
    static readonly REVERSE: number;
    static readonly DOUBLE_COLON: number;
    static readonly HASHTAG: number;
    static readonly NamespacedId: number;
    static readonly OPEN: number;
    static readonly NBT: number;
    static readonly WS_mSubRule: number;
    static readonly RuleName: number;
    static readonly Parameter: number;
    static readonly EQUAL: number;
    static readonly CLOSE: number;
    static readonly WS_mArgs: number;
    static readonly COMMA: number;
    static readonly WS_mArg: number;
    static readonly Argument: number;
    static readonly mDeclareName: number;
    static readonly mSubRule: number;
    static readonly mSubRuleName: number;
    static readonly mArgs: number;
    static readonly mArg: number;
    static channelNames: string[];
    static modeNames: string[];
    static readonly ruleNames: string[];
    static readonly VOCABULARY: s_0;
    static readonly tokenNames: string[];
    static readonly _serializedATN: string;
    static readonly _ATN: a;
    constructor(g2: g);
    get aTN(): a;
    get channelNames(): string[];
    get grammarFileName(): string;
    get modeNames(): string[];
    get ruleNames(): string[];
    get serializedATN(): string;
    get tokenNames(): string[];
    get vocabulary(): s_0;
  }


  interface RulesParser$ArgumentsContext extends h_0 {}
  class RulesParser$ArgumentsContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    CLOSE(): i;
    COMMA(): List;
    COMMA(n2: number): i;
    OPEN(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    pair(): List;
    pair(n2: number): RulesParser$PairContext;
  }


  interface RulesParser$CustomRuleEOFContext extends h_0 {}
  class RulesParser$CustomRuleEOFContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    head(): RulesParser$HeadContext;
    subRuleEOF(): RulesParser$SubRuleEOFContext;
  }


  interface RulesParser$HeadContext extends h_0 {}
  class RulesParser$HeadContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    AT(): i;
    RuleName(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface RulesParser$PairContext extends h_0 {}
  class RulesParser$PairContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    Argument(): i;
    EQUAL(): i;
    Parameter(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface RulesParser$SubRuleContext extends h_0 {}
  class RulesParser$SubRuleContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    REVERSE(): i;
    accept(f2: f): any;
    arguments(): RulesParser$ArgumentsContext;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    subRuleIdentifier(): RulesParser$SubRuleIdentifierContext;
  }


  interface RulesParser$SubRuleEOFContext extends h_0 {}
  class RulesParser$SubRuleEOFContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    EOF(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
    subRule(): List;
    subRule(n2: number): RulesParser$SubRuleContext;
  }


  interface RulesParser$SubRuleIdentifierContext extends h_0 {}
  class RulesParser$SubRuleIdentifierContext extends h_0 {
    constructor(h_02: h_0, n2: number);
    AT(): i;
    DOUBLE_COLON(): i;
    HASHTAG(): i;
    NBT(): i;
    NamespacedId(): i;
    RuleName(): i;
    accept(f2: f): any;
    enterRule(e2: e): void;
    exitRule(e2: e): void;
    get ruleIndex(): number;
  }


  interface RulesParser extends d_0 {}
  class RulesParser extends d_0 {
    static readonly WS: number;
    static readonly AT: number;
    static readonly ERR: number;
    static readonly REVERSE: number;
    static readonly DOUBLE_COLON: number;
    static readonly HASHTAG: number;
    static readonly NamespacedId: number;
    static readonly OPEN: number;
    static readonly NBT: number;
    static readonly WS_mSubRule: number;
    static readonly RuleName: number;
    static readonly Parameter: number;
    static readonly EQUAL: number;
    static readonly CLOSE: number;
    static readonly WS_mArgs: number;
    static readonly COMMA: number;
    static readonly WS_mArg: number;
    static readonly Argument: number;
    static readonly RULE_customRuleEOF: number;
    static readonly RULE_subRuleEOF: number;
    static readonly RULE_head: number;
    static readonly RULE_subRule: number;
    static readonly RULE_subRuleIdentifier: number;
    static readonly RULE_arguments: number;
    static readonly RULE_pair: number;
    static readonly ruleNames: string[];
    static readonly VOCABULARY: s_0;
    static readonly tokenNames: string[];
    static readonly _serializedATN: string;
    static readonly _ATN: a;
    constructor(r_02: r_0);
    arguments(): RulesParser$ArgumentsContext;
    customRuleEOF(): RulesParser$CustomRuleEOFContext;
    get aTN(): a;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    get tokenNames(): string[];
    get vocabulary(): s_0;
    head(): RulesParser$HeadContext;
    pair(): RulesParser$PairContext;
    subRule(): RulesParser$SubRuleContext;
    subRuleEOF(): RulesParser$SubRuleEOFContext;
    subRuleIdentifier(): RulesParser$SubRuleIdentifierContext;
  }


  interface RulesParserBaseListener extends RulesParserListener {}
  class RulesParserBaseListener extends RulesParserListener {
    enterArguments(rulesParser$ArgumentsContext: RulesParser$ArgumentsContext): void;
    enterArguments(var1: ArgumentsContext): void;
    enterCustomRuleEOF(rulesParser$CustomRuleEOFContext: RulesParser$CustomRuleEOFContext): void;
    enterCustomRuleEOF(var1: CustomRuleEOFContext): void;
    enterEveryRule(h_02: h_0): void;
    enterHead(rulesParser$HeadContext: RulesParser$HeadContext): void;
    enterHead(var1: HeadContext): void;
    enterPair(rulesParser$PairContext: RulesParser$PairContext): void;
    enterPair(var1: PairContext): void;
    enterSubRule(rulesParser$SubRuleContext: RulesParser$SubRuleContext): void;
    enterSubRule(var1: SubRuleContext): void;
    enterSubRuleEOF(rulesParser$SubRuleEOFContext: RulesParser$SubRuleEOFContext): void;
    enterSubRuleEOF(var1: SubRuleEOFContext): void;
    enterSubRuleIdentifier(rulesParser$SubRuleIdentifierContext: RulesParser$SubRuleIdentifierContext): void;
    enterSubRuleIdentifier(var1: SubRuleIdentifierContext): void;
    exitArguments(rulesParser$ArgumentsContext: RulesParser$ArgumentsContext): void;
    exitArguments(var1: ArgumentsContext): void;
    exitCustomRuleEOF(rulesParser$CustomRuleEOFContext: RulesParser$CustomRuleEOFContext): void;
    exitCustomRuleEOF(var1: CustomRuleEOFContext): void;
    exitEveryRule(h_02: h_0): void;
    exitHead(rulesParser$HeadContext: RulesParser$HeadContext): void;
    exitHead(var1: HeadContext): void;
    exitPair(rulesParser$PairContext: RulesParser$PairContext): void;
    exitPair(var1: PairContext): void;
    exitSubRule(rulesParser$SubRuleContext: RulesParser$SubRuleContext): void;
    exitSubRule(var1: SubRuleContext): void;
    exitSubRuleEOF(rulesParser$SubRuleEOFContext: RulesParser$SubRuleEOFContext): void;
    exitSubRuleEOF(var1: SubRuleEOFContext): void;
    exitSubRuleIdentifier(rulesParser$SubRuleIdentifierContext: RulesParser$SubRuleIdentifierContext): void;
    exitSubRuleIdentifier(var1: SubRuleIdentifierContext): void;
    visitErrorNode(b2: b): void;
    visitTerminal(i2: i): void;
  }


  interface RulesParserBaseVisitor extends RulesParserVisitor, org_anti_ad_a_b_a_a_a_d_a {}
  class RulesParserBaseVisitor extends RulesParserVisitor {
    visitArguments(rulesParser$ArgumentsContext: RulesParser$ArgumentsContext): any;
    visitCustomRuleEOF(rulesParser$CustomRuleEOFContext: RulesParser$CustomRuleEOFContext): any;
    visitHead(rulesParser$HeadContext: RulesParser$HeadContext): any;
    visitPair(rulesParser$PairContext: RulesParser$PairContext): any;
    visitSubRule(rulesParser$SubRuleContext: RulesParser$SubRuleContext): any;
    visitSubRuleEOF(rulesParser$SubRuleEOFContext: RulesParser$SubRuleEOFContext): any;
    visitSubRuleIdentifier(rulesParser$SubRuleIdentifierContext: RulesParser$SubRuleIdentifierContext): any;
  }


  interface RulesParserListener extends e {}
  class RulesParserListener extends e {
    enterArguments(var1: ArgumentsContext): void;
    enterCustomRuleEOF(var1: CustomRuleEOFContext): void;
    enterHead(var1: HeadContext): void;
    enterPair(var1: PairContext): void;
    enterSubRule(var1: SubRuleContext): void;
    enterSubRuleEOF(var1: SubRuleEOFContext): void;
    enterSubRuleIdentifier(var1: SubRuleIdentifierContext): void;
    exitArguments(var1: ArgumentsContext): void;
    exitCustomRuleEOF(var1: CustomRuleEOFContext): void;
    exitHead(var1: HeadContext): void;
    exitPair(var1: PairContext): void;
    exitSubRule(var1: SubRuleContext): void;
    exitSubRuleEOF(var1: SubRuleEOFContext): void;
    exitSubRuleIdentifier(var1: SubRuleIdentifierContext): void;
  }


  interface RulesParserVisitor extends f {}
  class RulesParserVisitor extends f {
    visitArguments(var1: RulesParser$ArgumentsContext): any;
    visitCustomRuleEOF(var1: RulesParser$CustomRuleEOFContext): any;
    visitHead(var1: RulesParser$HeadContext): any;
    visitPair(var1: RulesParser$PairContext): any;
    visitSubRule(var1: RulesParser$SubRuleContext): any;
    visitSubRuleEOF(var1: RulesParser$SubRuleEOFContext): any;
    visitSubRuleIdentifier(var1: RulesParser$SubRuleIdentifierContext): any;
  }

}

declare module 'org.anti_ad.mc.ipnext.gui.base' {
  import { IdentifierHolder, Sprite } from 'org.anti_ad.mc.common.vanilla.render.glue';
  import { Point } from 'org.anti_ad.mc.common.math2d';
  import { Map, Set } from 'java.util';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';

  class InventoryOverlay$Companion {
  }


  class InventoryOverlay {
    static readonly Companion: InventoryOverlay$Companion;
    static readonly COMP_TEXTURE: IdentifierHolder;
    static readonly compBackgroundSprite: Sprite;
    static readonly internal8x8: Point;
    drawBackground(var1: NativeContext): void;
    drawConfig(var1: NativeContext): void;
    drawForeground(var1: NativeContext): void;
    get backgroundSprite(): Sprite;
    get eightByEight(): Point;
    get enabledBackground(): boolean;
    get enabledForeground(): boolean;
    get slotLocations(): Map;
    get tEXTURE(): IdentifierHolder;
    onBackgroundRender(var1: NativeContext): void;
    onForegroundRender(var1: NativeContext): void;
    onPostRender(var1: NativeContext): void;
    postRender(var1: NativeContext): void;
    processSwipe(var1: Set, var2: AbstractContainerScreen, var3: number): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.gui' {
  import { Page, Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { List } from 'java.util';
  import { DefaultConstructorMarker, PropertyReference0Impl } from 'kotlin.jvm.internal';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { BaseDebugScreen } from 'org.anti_ad.mc.common.gui.debug';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { GuiGraphics } from 'net.minecraft.client.gui';
  import { NativeContext, NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { MainKeybind } from 'org.anti_ad.mc.common.input';
  import { Hintable } from 'org.anti_ad.mc.ipnext.gui.widgets';
  import { ConfigBoolean } from 'org.anti_ad.mc.common.config.options';
  import { Boolean } from 'java.lang';
  import { BaseOverlay } from 'org.anti_ad.mc.common.gui.screen';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { HintClassData } from 'org.anti_ad.mc.ipnext.integration';

  interface DebugScreen$addContent$1 extends Page {}
  class DebugScreen$addContent$1 extends Page {
    get content(): List;
    get widget(): Widget;
    preRender(n2: number, n3: number, f2: number): void;
  }


  class DebugScreen$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    get storedPageIndex(): number;
    set storedPageIndex(n2: number);
  }


  interface DebugScreen$PageContainer$content$d$1$1 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$1 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$10 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$10 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$12 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$12 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$13 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$13 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$14 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$14 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$15 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$15 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$16 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$16 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$17 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$17 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$18 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$18 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$19 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$19 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$2 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$2 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$20 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$20 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$21 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$21 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$22 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$22 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$23 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$23 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$3 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$3 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$4 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$4 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$5 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$5 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$6 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$6 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$7 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$7 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$8 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$8 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageContainer$content$d$1$9 extends PropertyReference0Impl {}
  class DebugScreen$PageContainer$content$d$1$9 extends PropertyReference0Impl {
    get (): any;
  }


  interface DebugScreen$PageScreenInfo extends Page {}
  class DebugScreen$PageScreenInfo extends Page {
    constructor(debugScreen: DebugScreen);
    containerStringOf(abstractContainerMenu: AbstractContainerMenu, string: string): string;
    get container(): string;
    get content(): List;
    get focusedSlot(): string;
    get screen(): string;
    get screenContainer(): string;
  }


  interface DebugScreen extends BaseDebugScreen {}
  class DebugScreen extends BaseDebugScreen {
    static readonly Companion: DebugScreen$Companion;
    constructor();
    static access$getStoredPageIndex$cp(): number;
    static access$setStoredPageIndex$cp(n2: number): void;
    addContent(function1: Function1, page: Page): Page;
    closeScreen(): void;
    renderBackground(guiGraphics: GuiGraphics, n2: number, n3: number, f2: number): void;
  }


  interface GUIDEEditorScreen$7 extends Widget {}
  class GUIDEEditorScreen$7 extends Widget {
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
  }


  class GUIDEEditorScreen$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    static access$isVisible(gUIDEEditorScreen$Companion: GUIDEEditorScreen$Companion, hintable: Hintable): boolean;
    static access$whenAtLeastOneVisible(gUIDEEditorScreen$Companion: GUIDEEditorScreen$Companion, list: List, function0: Function0): void;
    get sHIFT(): MainKeybind;
  }


  interface GUIDEEditorScreen$EditorConfigBoolean extends ConfigBoolean {}
  class GUIDEEditorScreen$EditorConfigBoolean extends ConfigBoolean {
    constructor(gUIDEEditorScreen: GUIDEEditorScreen, string: string, bl: boolean, bl2: boolean, bl3: boolean, function1: Function1);
    get hidden(): boolean;
    get key(): string;
    get value(): boolean;
    get valueSetEvent(): Function1;
    set hidden(bl: boolean);
    set key(string: string);
    set value(bl: boolean);
    setValue(object: any): void;
  }


  class GUIDEEditorScreen$Options {
    constructor(gUIDEEditorScreen: GUIDEEditorScreen);
    get containerForceOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get containerIgnoreOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get containerPlayerSideOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get screenDisableSwipe(): GUIDEEditorScreen$EditorConfigBoolean;
    get screenForceOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get screenIgnoreOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get screenPlayerSideOption(): GUIDEEditorScreen$EditorConfigBoolean;
    get screenShowProfileSelectorOption(): GUIDEEditorScreen$EditorConfigBoolean;
  }


  interface GUIDEEditorScreen extends BaseOverlay {}
  class GUIDEEditorScreen extends BaseOverlay {
    static readonly Companion: GUIDEEditorScreen$Companion;
    static readonly NAME_ROOT: string;
    static readonly DESCRIPTION_ROOT: string;
    static readonly CATEGORY_ROOT: string;
    constructor(object: Screen, abstractContainerMenu: AbstractContainerMenu, object2: List);
    static access$getContainer$p(gUIDEEditorScreen: GUIDEEditorScreen): AbstractContainerMenu;
    static access$getContainerHints$p(gUIDEEditorScreen: GUIDEEditorScreen): HintClassData;
    static access$getSHIFT$cp(): MainKeybind;
    static access$getScreenHints$p(gUIDEEditorScreen: GUIDEEditorScreen): HintClassData;
    static access$isVanillaContainer$p(gUIDEEditorScreen: GUIDEEditorScreen): boolean;
    static access$isVanillaScreen$p(gUIDEEditorScreen: GUIDEEditorScreen): boolean;
    closeScreen(): void;
    keyPressed(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    keyReleased(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    onTick(): void;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.gui.inject.base' {
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { NativeContext, NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { Widget, IPNButtonWidget } from 'org.anti_ad.mc.common.gui.widgets';
  import { AbstractContainerScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { List } from 'java.util';
  import { FunctionReferenceImpl, DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Hintable, Hintable$HintManagementRenderer } from 'org.anti_ad.mc.ipnext.gui.widgets';
  import { HintClassData, ButtonPositionHint } from 'org.anti_ad.mc.ipnext.integration';
  import { IdentifierHolder } from 'org.anti_ad.mc.common.vanilla.render.glue';
  import { Point } from 'org.anti_ad.mc.common.math2d';

  interface CheckBoxWidget extends SortButtonWidget {}
  class CheckBoxWidget extends SortButtonWidget {
    constructor(function1: Function1);

    constructor(function0: Function0);

    constructor();
    get highlightEnabled(): boolean;
    get highlightTooltip(): string;
    get highlightTx(): number;
    get highlightTy(): number;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set highlightEnabled(bl: boolean);
    set highlightTooltip(string: string);
    set highlightTx(n2: number);
    set highlightTy(n2: number);
  }


  interface InsertableWidget extends Widget {}
  class InsertableWidget extends Widget {
    get container(): AbstractContainerMenu;
    get hintableList(): List;
    get screen(): AbstractContainerScreen;
    get snapableList(): List;
    postBackgroundRender(var1: NativeContext, var2: number, var3: number, var4: number): void;
    postForegroundRender(var1: NativeContext, var2: number, var3: number, var4: number): void;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
  }


  interface ProfileButtonWidget extends SortButtonWidget {}
  class ProfileButtonWidget extends SortButtonWidget {
    constructor(function1: Function1);

    constructor(function0: Function0);

    constructor();
    get visible(): boolean;
    mouseClicked(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    set visible(bl: boolean);
  }


  interface SettingsWidget$init$1$1 extends Function0, FunctionReferenceImpl {}
  class SettingsWidget$init$1$1 extends Function0 {
    invoke(): void;
  }


  class SettingsWidget$InitWidgets {
    constructor(hintable: SettingsWidget);
    reHint(): void;
  }


  interface SettingsWidget extends Hintable, InsertableWidget {}
  class SettingsWidget extends Hintable {
    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData);

    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    get container(): AbstractContainerMenu;
    get hintManagementRenderer(): Hintable$HintManagementRenderer;
    get hints(): ButtonPositionHint;
    get rehint(): Function0;
    get screen(): AbstractContainerScreen;
    get underManagement(): boolean;
    init(): void;
    onClick(): void;
    postBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    postForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set hintManagementRenderer(hintable$HintManagementRenderer: Hintable$HintManagementRenderer);
    set hints(buttonPositionHint: ButtonPositionHint);
    set rehint(function0: Function0);
    set underManagement(bl: boolean);
  }


  class SortButtonWidget$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
  }


  interface SortButtonWidget extends TexturedButtonWidget {}
  class SortButtonWidget extends TexturedButtonWidget {
    static readonly Companion: SortButtonWidget$Companion;
    hints: ButtonPositionHint;
    constructor(function1: Function1);

    constructor(function0: Function0);

    constructor();
    get hintManagementRenderer(): Hintable$HintManagementRenderer;
    get hints(): ButtonPositionHint;
    get hoveringTexturePt(): Point;
    get id(): string;
    get texture(): IdentifierHolder;
    get texturePt(): Point;
    get visible(): boolean;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set hintManagementRenderer(hintable$HintManagementRenderer: Hintable$HintManagementRenderer);
    set hints(buttonPositionHint: ButtonPositionHint);
    set id(string: string);
    set visible(bl: boolean);
  }


  interface TexturedButtonWidget extends Hintable, IPNButtonWidget {}
  class TexturedButtonWidget extends Hintable {
    constructor(function1: Function1);

    constructor(function0: Function0);

    constructor();
    get hints(): ButtonPositionHint;
    get hoveringTexturePt(): Point;
    get texture(): IdentifierHolder;
    get texturePt(): Point;
    get tooltipText(): string;
    get tooltipTextSource(): Function0;
    get tx(): number;
    get ty(): number;
    get underManagement(): boolean;
    mouseClicked(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    mouseScrolled(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, d2: number, d3: number): boolean;
    renderButton(nativeContext: NativeContext, bl: boolean): void;
    set hints(var1: ButtonPositionHint);
    set tooltipText(string: string);
    set tooltipTextSource(function0: Function0);
    set tx(n2: number);
    set ty(n2: number);
    set underManagement(bl: boolean);
  }


  interface VillagerBookmarkButtonWidget extends SortButtonWidget {}
  class VillagerBookmarkButtonWidget extends SortButtonWidget {
    constructor(function0: Function0, function1: Function1);

    constructor(function0: Function0, function02: Function0);

    constructor(function0: Function0);
    get checked(): Function0;
    get checkedPt(): Point;
    get colorSource(): Function0;
    get ctx(): number;
    get cty(): number;
    get hoveringTexturePt(): Point;
    get visible(): boolean;
    get visibleOverride(): Function1;
    renderButton(nativeContext: NativeContext, bl: boolean): void;
    set checked(function0: Function0);
    set ctx(n2: number);
    set cty(n2: number);
    set visible(bl: boolean);
    set visibleOverride(function1: Function1);
  }

}

declare module 'org.anti_ad.mc.ipnext.gui.inject' {
  import { List, Set } from 'java.util';
  import { AbstractContainerScreen, MerchantScreen } from 'net.minecraft.client.gui.screens.inventory';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { NativeContext, NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { FunctionReferenceImpl, DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { InsertableWidget } from 'org.anti_ad.mc.ipnext.gui.inject.base';
  import { Hintable, Hintable$HintManagementRenderer } from 'org.anti_ad.mc.ipnext.gui.widgets';
  import { HintClassData, ButtonPositionHint } from 'org.anti_ad.mc.ipnext.integration';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';
  import { ScreenEventListener } from 'org.anti_ad.mc.common';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { CustomButtonWidget, Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { BiFlex } from 'org.anti_ad.mc.common.gui.layout';
  import { ObservableProperty } from 'kotlin.properties';

  class ContainerScreenEventHandler {
    static readonly INSTANCE: ContainerScreenEventHandler;
    get currentWidgets(): List;
    get widgetPoints(): Set;
    onBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    onForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    onScreenInit(abstractContainerScreen: AbstractContainerScreen, object: Function1): void;
    onScreenRemoved(abstractContainerScreen: AbstractContainerScreen): void;
    postRender(nativeContext: NativeContext): void;
    preRender(): void;
    set currentWidgets(list: List);
    showEditor(): void;
  }


  interface EditorWidget$init$1$1 extends Function0, FunctionReferenceImpl {}
  class EditorWidget$init$1$1 extends Function0 {
    invoke(): void;
  }


  class EditorWidget$InitWidgets {
    constructor(hintable: EditorWidget);
    reHint(): void;
  }


  interface EditorWidget extends Hintable, InsertableWidget {}
  class EditorWidget extends Hintable {
    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData);

    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    addHintable(insertableWidget: InsertableWidget): boolean;
    get container(): AbstractContainerMenu;
    get hintManagementRenderer(): Hintable$HintManagementRenderer;
    get hints(): ButtonPositionHint;
    get rehint(): Function0;
    get screen(): AbstractContainerScreen;
    get underManagement(): boolean;
    init(): void;
    postBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    postForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set hintManagementRenderer(hintable$HintManagementRenderer: Hintable$HintManagementRenderer);
    set hints(buttonPositionHint: ButtonPositionHint);
    set rehint(function0: Function0);
    set underManagement(bl: boolean);
    showEditorScreen(): void;
  }


  interface InsertWidgetHandler extends ScreenEventListener {}
  class InsertWidgetHandler extends ScreenEventListener {
    static readonly INSTANCE: InsertWidgetHandler;
    charTyped(nativeInputContextBase: NativeInputContextBase, c2: string, n2: number): boolean;
    get currentScreen(): Screen;
    get currentWidgets(): List;
    insertWidget(list: List): void;
    keyPressed(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    keyReleased(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    mouseClicked(nativeInputContextBase: NativeInputContextBase, d2: number, d3: number, n2: number): boolean;
    mouseDragged(nativeInputContextBase: NativeInputContextBase, d2: number, d3: number, n2: number, d4: number, d5: number): boolean;
    mouseRelease(nativeInputContextBase: NativeInputContextBase, d2: number, d3: number, n2: number): boolean;
    mouseScrolled(nativeInputContextBase: NativeInputContextBase, d2: number, d3: number, d4: number, d5: number): boolean;
    onClientInit(): void;
    preScreenRender(): void;
    resize(n2: number, n3: number): void;
    set currentScreen(screen: Screen);
    set currentWidgets(list: List);
  }


  interface ProfilesUICollectionWidget$ActiveProfileButtonWidget extends CustomButtonWidget {}
  class ProfilesUICollectionWidget$ActiveProfileButtonWidget extends CustomButtonWidget {
    constructor(profilesUICollectionWidget: ProfilesUICollectionWidget, function0: Function0);
    get text(): string;
    get tooltipText(): string;
    get vText(): string;
    get visible(): boolean;
    mouseClicked(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number, n4: number): boolean;
    render(object: NativeContext, n2: number, n3: number, f2: number): void;
    set text(string: string);
    set tooltipText(string: string);
    set vText(string: string);
    set visible(bl: boolean);
  }


  class ProfilesUICollectionWidget$InitWidgets {
    constructor(object: ProfilesUICollectionWidget);
  }


  interface ProfilesUICollectionWidget$InnerFlex extends Widget {}
  class ProfilesUICollectionWidget$InnerFlex extends Widget {
    constructor(profilesUICollectionWidget: ProfilesUICollectionWidget);
    get flex(): BiFlex;
  }


  interface ProfilesUICollectionWidget extends Hintable, InsertableWidget {}
  class ProfilesUICollectionWidget extends Hintable {
    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData);

    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    static access$getCurrentProfileName(profilesUICollectionWidget: ProfilesUICollectionWidget): string;
    static access$getTypes$p(profilesUICollectionWidget: ProfilesUICollectionWidget): Set;
    get container(): AbstractContainerMenu;
    get hintManagementRenderer(): Hintable$HintManagementRenderer;
    get hints(): ButtonPositionHint;
    get screen(): AbstractContainerScreen;
    get underManagement(): boolean;
    get visible(): boolean;
    get visibleSource(): Function0;
    init(): void;
    moveDown(n2: number): void;
    moveUp(n2: number): void;
    postBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    postForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set hintManagementRenderer(hintable$HintManagementRenderer: Hintable$HintManagementRenderer);
    set hints(buttonPositionHint: ButtonPositionHint);
    set underManagement(bl: boolean);
    set visible(bl: boolean);
    set visibleSource(function0: Function0);
  }


  interface ScreenEventHandler$special$$inlined$detectable$1 extends ObservableProperty {}
  class ScreenEventHandler$special$$inlined$detectable$1 extends ObservableProperty {
    constructor(object: any);
  }


  class ScreenEventHandler {
    static readonly INSTANCE: ScreenEventHandler;
    onScreenInit(screen: Screen, function1: Function1): void;
    onScreenRemoved(screen: Screen): void;
    postRender(nativeContext: NativeContext): void;
    preRender(nativeContext: NativeContext): void;
  }


  interface SortingButtonCollectionWidget$init$1$1 extends Function0, FunctionReferenceImpl {}
  class SortingButtonCollectionWidget$init$1$1 extends Function0 {
    invoke(): void;
  }


  interface SortingButtonCollectionWidget$InitWidgets$dummyRenderUpdater$1 extends Widget {}
  class SortingButtonCollectionWidget$InitWidgets$dummyRenderUpdater$1 extends Widget {
    get buttons(): List;
    get originalVisibles(): List;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
  }


  interface SortingButtonCollectionWidget$InitWidgets$MoveButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {}
  class SortingButtonCollectionWidget$InitWidgets$MoveButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {
    constructor(sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets, bl: boolean);

    constructor(sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
  }


  interface SortingButtonCollectionWidget$InitWidgets$SortButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {}
  class SortingButtonCollectionWidget$InitWidgets$SortButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {
    constructor(sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets, bl: boolean);
  }


  interface SortingButtonCollectionWidget$InitWidgets$SortInColumnButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {}
  class SortingButtonCollectionWidget$InitWidgets$SortInColumnButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {
    constructor(sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets, bl: boolean);
  }


  interface SortingButtonCollectionWidget$InitWidgets$SortInRowButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {}
  class SortingButtonCollectionWidget$InitWidgets$SortInRowButton extends SortingButtonCollectionWidget$InitWidgets$AutoHideSortButton {
    constructor(sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets, bl: boolean);
  }


  interface SortingButtonCollectionWidget$InitWidgets$special$$inlined$detectable$1 extends ObservableProperty {}
  class SortingButtonCollectionWidget$InitWidgets$special$$inlined$detectable$1 extends ObservableProperty {
    constructor(object: any, sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets);
  }


  interface SortingButtonCollectionWidget$InitWidgets$special$$inlined$detectable$2 extends ObservableProperty {}
  class SortingButtonCollectionWidget$InitWidgets$special$$inlined$detectable$2 extends ObservableProperty {
    constructor(object: any, sortingButtonCollectionWidget$InitWidgets: SortingButtonCollectionWidget$InitWidgets);
  }


  class SortingButtonCollectionWidget$InitWidgets$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface SortingButtonCollectionWidget extends InsertableWidget {}
  class SortingButtonCollectionWidget extends InsertableWidget {
    constructor(abstractContainerScreen: AbstractContainerScreen, hintClassData: HintClassData);
    get container(): AbstractContainerMenu;
    get hints(): HintClassData;
    get initialized(): boolean;
    get rehint(): Function0;
    get screen(): AbstractContainerScreen;
    init(): void;
    postBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    postForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    render(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set initialized(bl: boolean);
    set rehint(function0: Function0);
  }


  interface VillagerOverlayWidget$init$1$1 extends Function0, FunctionReferenceImpl {}
  class VillagerOverlayWidget$init$1$1 extends Function0 {
    invoke(): void;
  }


  interface VillagerOverlayWidget extends InsertableWidget {}
  class VillagerOverlayWidget extends InsertableWidget {
    constructor(merchantScreen: MerchantScreen, hintClassData: HintClassData);

    constructor(merchantScreen: MerchantScreen, hintClassData: HintClassData, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    get container(): AbstractContainerMenu;
    get initialized(): boolean;
    get rehint(): Function0;
    get screen(): MerchantScreen;
    init(): void;
    postBackgroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    postForegroundRender(nativeContext: NativeContext, n2: number, n3: number, f2: number): void;
    set initialized(bl: boolean);
    set rehint(function0: Function0);
  }

}

declare module 'org.anti_ad.mc.ipnext.gui.widgets' {
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { Widget } from 'org.anti_ad.mc.common.gui.widgets';
  import { ButtonPositionHint } from 'org.anti_ad.mc.ipnext.integration';

  class Hintable$DefaultImpls {
    static moveDown(hintable: Hintable, n2: number): void;
    static moveLeft(hintable: Hintable, n2: number): void;
    static moveRight(hintable: Hintable, n2: number): void;
    static moveUp(hintable: Hintable, n2: number): void;
    static renderUnderManagement(hintable: Hintable, nativeContext: NativeContext): void;
  }


  class Hintable$HintManagementRenderer {
    constructor(hintable: Hintable);
    get alphaChannel(): number;
    get pingStep(): number;
    get step(): number;
    get target(): Hintable;
    get tick(): number;
    get widget(): Widget;
    renderUnderManagement(nativeContext: NativeContext): void;
    set alphaChannel(n2: number);
    set pingStep(n2: number);
    set step(n2: number);
    set tick(n2: number);
  }


  class Hintable {
    get hintManagementRenderer(): Hintable$HintManagementRenderer;
    get hints(): ButtonPositionHint;
    get underManagement(): boolean;
    moveDown(var1: number): void;
    moveLeft(var1: number): void;
    moveRight(var1: number): void;
    moveUp(var1: number): void;
    renderUnderManagement(var1: NativeContext): void;
    set hintManagementRenderer(var1: Hintable$HintManagementRenderer);
    set hints(var1: ButtonPositionHint);
    set underManagement(var1: boolean);
  }

}

declare module 'org.anti_ad.mc.ipnext.input' {
  import { IInputHandler } from 'org.anti_ad.mc.common';
  import { NativeInputContextBase } from 'org.anti_ad.mc.common.gui';
  import { AdaptedFunctionReference, FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { AbstractContainerMenu } from 'net.minecraft.world.inventory';

  interface CancellableInputHandler extends IInputHandler {}
  class CancellableInputHandler extends IInputHandler {
    static readonly INSTANCE: CancellableInputHandler;
    onInput(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number): boolean;
  }


  interface InputHandler extends IInputHandler {}
  class InputHandler extends IInputHandler {
    static readonly INSTANCE: InputHandler;
    onClientInit(): void;
    onInput(nativeInputContextBase: NativeInputContextBase, n2: number, n3: number): boolean;
  }


  interface InventoryInputHandler$onInput$1$1 extends Function1, AdaptedFunctionReference {}
  class InventoryInputHandler$onInput$1$1 extends Function1 {
    invoke(abstractContainerMenu: AbstractContainerMenu): void;
  }


  interface InventoryInputHandler$onInput$1$10 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$10 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$2 extends Function1, AdaptedFunctionReference {}
  class InventoryInputHandler$onInput$1$2 extends Function1 {
    invoke(abstractContainerMenu: AbstractContainerMenu): void;
  }


  interface InventoryInputHandler$onInput$1$3 extends Function1, AdaptedFunctionReference {}
  class InventoryInputHandler$onInput$1$3 extends Function1 {
    invoke(abstractContainerMenu: AbstractContainerMenu): void;
  }


  interface InventoryInputHandler$onInput$1$4 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$4 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$5 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$5 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$6 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$6 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$7 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$7 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$8 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$8 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler$onInput$1$9 extends Function0, FunctionReferenceImpl {}
  class InventoryInputHandler$onInput$1$9 extends Function0 {
    invoke(): void;
  }


  interface InventoryInputHandler extends IInputHandler {}
  class InventoryInputHandler extends IInputHandler {
    static readonly INSTANCE: InventoryInputHandler;
    onInput(object: NativeInputContextBase, n2: number, n3: number): boolean;
  }

}

declare module 'org.anti_ad.mc.ipnext.integration' {
  import { GeneratedSerializer, SerializationConstructorMarker } from 'kotlinx.serialization.internal';
  import { Encoder, Decoder, CompositeEncoder } from 'kotlinx.serialization.encoding';
  import { SerialDescriptor } from 'kotlinx.serialization.descriptors';
  import { KSerializer } from 'kotlinx.serialization';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { EnumEntries } from 'kotlin.enums';
  import { Map, Set } from 'java.util';
  import { IPNButton } from 'org.anti_ad.mc.ipn.api';
  import { Lazy } from 'kotlin';
  import { Path } from 'java.nio.file';
  import { Class, Throwable } from 'java.lang';
  import { Function3, Function0 } from 'kotlin.jvm.functions';
  import { Json } from 'kotlinx.serialization.json';

  interface ButtonPositionHint$$serializer extends GeneratedSerializer {}
  class ButtonPositionHint$$serializer extends GeneratedSerializer {
    static readonly INSTANCE: ButtonPositionHint$$serializer;
    childSerializers(): KSerializer[];
    deserialize(decoder: Decoder): ButtonPositionHint;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, buttonPositionHint: ButtonPositionHint): void;
  }


  class ButtonPositionHint$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    serializer(): KSerializer;
  }


  class ButtonPositionHint {
    static readonly Companion: ButtonPositionHint$Companion;
    constructor(n2: number, n3: number, n4: number, bl: boolean);

    constructor(n2: number, n3: number, n4: number, bl: boolean, n5: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(n2: number, n3: number, n4: number, n5: number, bl: boolean, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    component1(): number;
    component2(): number;
    component3(): number;
    component4(): boolean;
    copy(n2: number, n3: number, n4: number, bl: boolean): ButtonPositionHint;
    static copy$default(buttonPositionHint: ButtonPositionHint, n2: number, n3: number, n4: number, bl: boolean, n5: number, object: any): ButtonPositionHint;
    equals(object: any): boolean;
    get bottom(): number;
    get dirty(): boolean;
    static get dirty$annotations(): void;
    get hide(): boolean;
    get horizontalOffset(): number;
    get top(): number;
    hashCode(): number;
    set bottom(n2: number);
    set dirty(bl: boolean);
    set hide(bl: boolean);
    set horizontalOffset(n2: number);
    set top(n2: number);
    toString(): string;
    static write$Self$neoforge_1_21_1(buttonPositionHint: ButtonPositionHint, compositeEncoder: CompositeEncoder, serialDescriptor: SerialDescriptor): void;
  }


  interface HintClassData$$serializer extends GeneratedSerializer {}
  class HintClassData$$serializer extends GeneratedSerializer {
    static readonly INSTANCE: HintClassData$$serializer;
    childSerializers(): KSerializer[];
    deserialize(decoder: Decoder): HintClassData;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, hintClassData: HintClassData): void;
  }


  class HintClassData$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    serializer(): KSerializer;
  }


  class HintClassData$EntriesMappings {
    static readonly entries$0: EnumEntries;
  }


  class HintClassData {
    static readonly Companion: HintClassData$Companion;
    constructor(bl: boolean, bl2: boolean, bl3: boolean, map: Map, set: Set, bl4: boolean, bl5: boolean, bl6: boolean);

    constructor(bl: boolean, bl2: boolean, bl3: boolean, map: Map, set: Set, bl4: boolean, bl5: boolean, bl6: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(n2: number, bl: boolean, bl2: boolean, bl3: boolean, map: Map, set: Set, bl4: boolean, bl5: boolean, bl6: boolean, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    static access$get$childSerializers$cp(): Lazy[];
    areButtonsMoved(): boolean;
    changeId(string: string): void;
    component1(): boolean;
    component2(): boolean;
    component3(): boolean;
    component4(): Map;
    component5(): Set;
    component6(): boolean;
    component7(): boolean;
    component8(): boolean;
    copy(bl: boolean, bl2: boolean, bl3: boolean, map: Map, set: Set, bl4: boolean, bl5: boolean, bl6: boolean): HintClassData;
    static copy$default(hintClassData: HintClassData, bl: boolean, bl2: boolean, bl3: boolean, map: Map, set: Set, bl4: boolean, bl5: boolean, bl6: boolean, n2: number, object: any): HintClassData;
    copyOnlyChanged(): Map;
    dirty(): boolean;
    equals(object: any): boolean;
    fillMissingHints(): void;
    get avoidShiftClick(): boolean;
    get buttonHints(): Map;
    get disableFastSwipe(): boolean;
    get force(): boolean;
    get ignore(): boolean;
    get ignoreCraftingGrid(): boolean;
    get playerSideOnly(): boolean;
    get slotIgnoreInventoryTypes(): Set;
    hasInfo(): boolean;
    hashCode(): number;
    hintFor(iPNButton: IPNButton): ButtonPositionHint;
    markAsDirty(): void;
    readId(): string;
    set disableFastSwipe(bl: boolean);
    set force(bl: boolean);
    set ignore(bl: boolean);
    set playerSideOnly(bl: boolean);
    toString(): string;
    static write$Self$neoforge_1_21_1(hintClassData: HintClassData, compositeEncoder: CompositeEncoder, serialDescriptor: SerialDescriptor): void;
  }


  class HintsManagerNG {
    static readonly INSTANCE: HintsManagerNG;
    getHints(clazz: Class): HintClassData;
    init(path: Path, path2: Path, bl: boolean): void;
    isFastSwipeDisabled(clazz: Class): boolean;
    isPlayerSideOnly(clazz: Class): boolean;
    saveAllAsIntegrated(object: MergePriority): void;
    saveAllAsSeparate(object: MergePriority): void;
    saveDirty(hintClassData: HintClassData, hintClassData2: HintClassData): void;
    upgradeOldConfig(object: Path, object2: Path): void;
  }


  class HintsManagerNGKt {
  }


  class MiscKt {
    static get json(): Json;
    static logError(throwable: Throwable, string: string, bl: boolean): void;
    static tryLog(string: string, bl: boolean, function3: Function3, object: Function0): any;
  }


  interface SlotIntegrationData$$serializer extends GeneratedSerializer {}
  class SlotIntegrationData$$serializer extends GeneratedSerializer {
    static readonly INSTANCE: SlotIntegrationData$$serializer;
    childSerializers(): KSerializer[];
    deserialize(decoder: Decoder): SlotIntegrationData;
    get descriptor(): SerialDescriptor;
    serialize(encoder: Encoder, slotIntegrationData: SlotIntegrationData): void;
  }


  class SlotIntegrationData$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    serializer(): KSerializer;
  }


  class SlotIntegrationData {
    static readonly Companion: SlotIntegrationData$Companion;
    constructor(bl: boolean);

    constructor(bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor(n2: number, bl: boolean, serializationConstructorMarker: SerializationConstructorMarker);

    constructor();
    component1(): boolean;
    copy(bl: boolean): SlotIntegrationData;
    static copy$default(slotIntegrationData: SlotIntegrationData, bl: boolean, n2: number, object: any): SlotIntegrationData;
    equals(object: any): boolean;
    get ignore(): boolean;
    hashCode(): number;
    set ignore(bl: boolean);
    toString(): string;
    static write$Self$neoforge_1_21_1(slotIntegrationData: SlotIntegrationData, compositeEncoder: CompositeEncoder, serialDescriptor: SerialDescriptor): void;
  }


  class SlotIntegrationHints {
    static readonly INSTANCE: SlotIntegrationHints;
    hintFor(string: string): SlotIntegrationData;
    init(path: Path, path2: Path, bl: boolean): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.inventory.action' {
  import { IntRange } from 'kotlin.ranges';
  import { List, Map, Collection } from 'java.util';
  import { Integer } from 'java.lang';
  import { Default } from 'Random';

  class GroupInColumnsCalculator$ColumnsCandidate$Cell {
    constructor(columnsCandidate: GroupInColumnsCalculator$ColumnsCandidate, n2: number, n3: number, n4: number);
    get columnIndex(): number;
    get index(): number;
    get occupied(): boolean;
    get room(): number;
    get rowIndex(): number;
    get slotIndex(): number;
    get slotIndices(): IntRange;
    get slotX(): number;
    get slotY(): number;
    set occupied(bl: boolean);
  }


  class GroupInColumnsCalculator$ColumnsCandidate {
    constructor(iterable: List, iterator: List, n2: number);
    addCellsForIndex(n2: number): boolean;
    apply(): List;
    connected(iterable: List): boolean;
    findCellsForRoom(n2: number): List;
    findEmptyCell(): boolean;
    get allowBroken(): boolean;
    get brokenGroups(): number;
    get cellIndex(): number;
    get cells(): List;
    get columnWidths(): List;
    get eachCellsList(): List;
    get height(): number;
    get slotCountPairList(): List;
    get succeeded(): boolean;
    get width(): number;
    set allowBroken(bl: boolean);
    set brokenGroups(n2: number);
    set cellIndex(n2: number);
  }


  class GroupInColumnsCalculator {
    constructor(list: List, n2: number, n3: number);
    calc(): List;
    get height(): number;
    get slotCountPairList(): List;
    get width(): number;
  }


  class MiscKt {
    static access$getRandom$p(): Default;
    static distribute(list: List): List;
    static distribute(n2: number, n3: number): List;
    static distributeMonotonic(list: List): List;
    static distributeMonotonic(n2: number, n3: number): List;
    static fillOne(list: List): List;
    static fillOne(n2: number, n3: number, n4: number): List;
    static flatten(collection: List, serializable: number): List;
    static flatten$default(list: List, n2: number, n3: number, object: any): List;
    static pack(n2: number, n3: number): List;
    static spreadItemCount(list: List): List;
    static spreadSlot(list: List, n2: number): List;
    static spreadSlot$default(list: List, n2: number, n3: number, object: any): List;
  }


  class PostActions {
    static readonly INSTANCE: PostActions;
    groupInColumns(list: List, n2: number, n3: number): List;
    groupInRows(list: List, n2: number, n3: number): List;
  }


  class PostActionsKt {
    static access$asIndicesTranspose(list: List, n2: number, n3: number): List;
    static access$connected(collection: Collection): boolean;
    static access$group(list: List): Map;
  }


  class RandFixedSum$Constraint {
    constructor(n2: number, n3: number);
    get max(): number;
    get min(): number;
  }


  class RandFixedSum {
    static readonly INSTANCE: RandFixedSum;
    randfixedsum(n2: number, n3: number, n4: number): List;
    randfixedsum(list: List, n2: number): List;
  }


  class SubTrackerActionsKt$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }

}

declare module 'org.anti_ad.mc.ipnext.inventory' {
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { ContainerSandbox } from 'org.anti_ad.mc.ipnext.inventory.sandbox';
  import { ItemTracker, SubTracker, MutableItemTracker, MutableSubTracker } from 'org.anti_ad.mc.ipnext.inventory.data';
  import { AbstractContainerMenu, ClickType } from 'net.minecraft.world.inventory';
  import { List, Comparator, TimerTask, Iterator, Map, Set } from 'java.util';
  import { Pair } from 'kotlin';
  import { ObjectRef } from 'Ref';
  import { Runnable, Class } from 'java.lang';
  import { NativeContext } from 'org.anti_ad.mc.common.gui';
  import { HintClassData } from 'org.anti_ad.mc.ipnext.integration';
  import { LogMessage, LogLevel } from 'LogBase';
  import { IntRange } from 'kotlin.ranges';

  class AdvancedContainer$AdvancedContainerDsl {
    constructor(advancedContainer: AdvancedContainer);
    get(areaType: AreaType): ItemArea;
  }


  class AdvancedContainer$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    create(): AdvancedContainer;
    invoke(bl: boolean, function1: Function1): void;
    static invoke$default(object: AdvancedContainer$Companion, bl: boolean, function1: Function1, n2: number, object2: any): void;
    tracker(bl: boolean, bl2: boolean, function1: Function1): void;
    static tracker$default(advancedContainer$Companion: AdvancedContainer$Companion, bl: boolean, bl2: boolean, function1: Function1, n2: number, object: any): void;
  }


  interface AdvancedContainer$SandboxDsl extends AdvancedContainer$AdvancedContainerDsl {}
  class AdvancedContainer$SandboxDsl extends AdvancedContainer$AdvancedContainerDsl {
    constructor(advancedContainer: AdvancedContainer, containerSandbox: ContainerSandbox);
    get sandbox(): ContainerSandbox;
    get sandboxTracker(): ItemTracker;
    getAsSubTracker(itemArea: ItemArea): SubTracker;
  }


  interface AdvancedContainer$TrackerDsl extends AdvancedContainer$AdvancedContainerDsl {}
  class AdvancedContainer$TrackerDsl extends AdvancedContainer$AdvancedContainerDsl {
    constructor(advancedContainer: AdvancedContainer, mutableItemTracker: MutableItemTracker);
    get tracker(): MutableItemTracker;
    getAsSubTracker(itemArea: ItemArea): MutableSubTracker;
  }


  interface AreaType$Companion$inSlots$1 extends AreaType {}
  class AreaType$Companion$inSlots$1 extends AreaType {
    getItemArea(object: AbstractContainerMenu, list: List): ItemArea;
  }


  interface AreaType$Companion$match$1 extends AreaType {}
  class AreaType$Companion$match$1 extends AreaType {
    getItemArea(object: AbstractContainerMenu, list: List): ItemArea;
  }


  interface AreaType$Companion$playerInvSlots$2 extends AreaType {}
  class AreaType$Companion$playerInvSlots$2 extends AreaType {
    getItemArea(object: AbstractContainerMenu, object2: List): ItemArea;
  }


  class AreaType$Companion {
    inSlots(bl: boolean, function0: Function0): AreaType;
    static inSlots$default(areaType$Companion: AreaType$Companion, bl: boolean, function0: Function0, n2: number, object: any): AreaType;
    match(bl: boolean, function1: Function1): AreaType;
    static match$default(areaType$Companion: AreaType$Companion, bl: boolean, function1: Function1, n2: number, object: any): AreaType;
    playerInvSlots(nArray: number[], bl: boolean): AreaType;
    playerInvSlots(bl: boolean, function0: Function0): AreaType;
    static playerInvSlots$default(areaType$Companion: AreaType$Companion, nArray: number[], bl: boolean, n2: number, object: any): AreaType;
    static playerInvSlots$default(areaType$Companion: AreaType$Companion, bl: boolean, function0: Function0, n2: number, object: any): AreaType;
  }


  class AreaType$DefaultImpls {
    static minus(areaType: AreaType, areaType2: AreaType): AreaType;
    static plus(areaType: AreaType, areaType2: AreaType): AreaType;
  }


  interface AreaType$minus$1 extends AreaType {}
  class AreaType$minus$1 extends AreaType {
    getItemArea(abstractContainerMenu: AbstractContainerMenu, list: List): ItemArea;
  }


  interface AreaType$plus$1 extends AreaType {}
  class AreaType$plus$1 extends AreaType {
    getItemArea(abstractContainerMenu: AbstractContainerMenu, list: List): ItemArea;
  }


  class AreaType {
    static readonly Companion: AreaType$Companion;
    getItemArea(var1: AbstractContainerMenu, var2: List): ItemArea;
    minus(var1: AreaType): AreaType;
    plus(var1: AreaType): AreaType;
  }


  interface AreaTypes$itemStorage$1 extends AreaType {}
  class AreaTypes$itemStorage$1 extends AreaType {
    static readonly INSTANCE: AreaTypes$itemStorage$1;
    getItemArea(object: AbstractContainerMenu, list: List): ItemArea;
  }


  interface AreaTypes$sortableItemStorage$1 extends AreaType {}
  class AreaTypes$sortableItemStorage$1 extends AreaType {
    static readonly INSTANCE: AreaTypes$sortableItemStorage$1;
    getItemArea(object: AbstractContainerMenu, list: List): ItemArea;
  }


  interface AreaTypesKt$isRectangular$$inlined$sortedBy$1 extends Comparator {}
  class AreaTypesKt$isRectangular$$inlined$sortedBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface AreaTypesKt$isRectangular$lambda$3$$inlined$sortedBy$1 extends Comparator {}
  class AreaTypesKt$isRectangular$lambda$3$$inlined$sortedBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  class AreaTypesKt {
    static access$isRectangular(list: List): Pair;
    static access$toPointList(list: List): List;
  }


  interface ContainerClicker$executeClicks$$inlined$timer$default$1 extends TimerTask {}
  class ContainerClicker$executeClicks$$inlined$timer$default$1 extends TimerTask {
    constructor(abstractContainerMenu: AbstractContainerMenu, containerClicker$Highlight: ContainerClicker$Highlight, objectRef: ObjectRef, iterator: Iterator);
    run(): void;
  }


  interface ContainerClicker$executeClicks$3$1 extends Runnable {}
  class ContainerClicker$executeClicks$3$1 extends Runnable {
    run(): void;
  }


  interface ContainerClicker$executeQClicks$$inlined$timer$default$1 extends TimerTask {}
  class ContainerClicker$executeQClicks$$inlined$timer$default$1 extends TimerTask {
    constructor(abstractContainerMenu: AbstractContainerMenu, containerClicker$Highlight: ContainerClicker$Highlight, objectRef: ObjectRef, iterator: Iterator);
    run(): void;
  }


  interface ContainerClicker$executeQClicks$3$1 extends Runnable {}
  class ContainerClicker$executeQClicks$3$1 extends Runnable {
    run(): void;
  }


  interface ContainerClicker$executeSwapClicks$$inlined$timer$default$1 extends TimerTask {}
  class ContainerClicker$executeSwapClicks$$inlined$timer$default$1 extends TimerTask {
    constructor(abstractContainerMenu: AbstractContainerMenu, containerClicker$Highlight: ContainerClicker$Highlight, containerClicker$Highlight2: ContainerClicker$Highlight, objectRef: ObjectRef, iterator: Iterator);
    run(): void;
  }


  interface ContainerClicker$executeSwapClicks$3$1 extends Runnable {}
  class ContainerClicker$executeSwapClicks$3$1 extends Runnable {
    run(): void;
  }


  class ContainerClicker$Highlight {
    constructor(n2: number);
    get id(): number;
    set id(n2: number);
  }


  class ContainerClicker {
    static readonly INSTANCE: ContainerClicker;
    static access$getHighlights$p(): Set;
    static access$swapClick(containerClicker: ContainerClicker, n2: number, n3: number): void;
    click(n2: number, n3: number): void;
    executeClicks(object: List, n2: number): void;
    executeQClicks(iterator: Map, n2: number): void;
    executeSwapClicks(iterator: Map, n2: number): void;
    genericClick(n2: number, n3: number, clickType: ClickType): void;
    genericClick(abstractContainerMenu: AbstractContainerMenu, n2: number, n3: number, clickType: ClickType, bl: boolean): void;
    static genericClick$default(containerClicker: ContainerClicker, abstractContainerMenu: AbstractContainerMenu, n2: number, n3: number, clickType: ClickType, bl: boolean, n4: number, object: any): void;
    get doSendContentUpdates(): boolean;
    leftClick(n2: number): void;
    postScreenRender(nativeContext: NativeContext): void;
    qClick(n2: number): void;
    rightClick(n2: number): void;
    sendContentUpdates(): void;
    set doSendContentUpdates(bl: boolean);
    shiftClick(n2: number): void;
    swap(n2: number, n3: number): void;
  }


  class ContainerTypes {
    static readonly INSTANCE: ContainerTypes;
    addContainersSource(function0: Function0): void;
    deregister(clazz: Class): void;
    getTypes(abstractContainerMenu: AbstractContainerMenu, object: HintClassData): Set;
    static getTypes$default(containerTypes: ContainerTypes, abstractContainerMenu: AbstractContainerMenu, hintClassData: HintClassData, n2: number, object: any): Set;
    static init(): void;
    match(set: Set, object: Set, object2: Set): boolean;
    static match$default(containerTypes: ContainerTypes, set: Set, set2: Set, set3: Set, n2: number, object: any): boolean;
    reset(): void;
  }


  class ContainerTypesKt {
    static get nonStorage(): Set;
    static get playerOnly(): Set;
    static get simple(): Set;
  }


  interface GeneralInventoryActions$doSort$$inlined$listenLog$1 extends Function1 {}
  class GeneralInventoryActions$doSort$$inlined$listenLog$1 extends Function1 {
    static readonly INSTANCE: GeneralInventoryActions$doSort$$inlined$listenLog$1;
    invoke(logMessage: LogMessage): void;
  }


  interface GeneralInventoryActions$doSort$$inlined$listenLog$2 extends Function1 {}
  class GeneralInventoryActions$doSort$$inlined$listenLog$2 extends Function1 {
    constructor(logLevel: LogLevel, function1: Function1);
    invoke(logMessage: LogMessage): void;
  }


  class ItemArea$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    static access$minus(itemArea$Companion: ItemArea$Companion, itemArea: ItemArea, itemArea2: ItemArea): ItemArea;
    static access$plus(itemArea$Companion: ItemArea$Companion, itemArea: ItemArea, itemArea2: ItemArea): ItemArea;
    invoke(list: List, list2: List, bl: boolean): ItemArea;
    static invoke$default(itemArea$Companion: ItemArea$Companion, list: List, list2: List, bl: boolean, n2: number, object: any): ItemArea;
  }


  class ItemArea {
    static readonly Companion: ItemArea$Companion;
    constructor(list: List);

    constructor(list: List, list2: List, bl: boolean);

    constructor(list: List, list2: List, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    static access$getFromSlotLocations$p(itemArea: ItemArea): List;
    get height(): number;
    get orderSensitive(): boolean;
    get slotIndices(): List;
    get width(): number;
    isEmpty(): boolean;
    isRectangular(): boolean;
    minus(itemArea: ItemArea): ItemArea;
    plus(itemArea: ItemArea): ItemArea;
    set orderSensitive(bl: boolean);
  }


  class PlayerSlotIds {
    constructor(intRange: IntRange, intRange2: IntRange, n2: number, function0: Function0);

    constructor(intRange: IntRange, intRange2: IntRange, n2: number, function0: Function0, n3: number, defaultConstructorMarker: DefaultConstructorMarker);

    constructor();
    component1(): IntRange;
    component2(): IntRange;
    component3(): number;
    component4(): Function0;
    copy(intRange: IntRange, intRange2: IntRange, n2: number, function0: Function0): PlayerSlotIds;
    static copy$default(playerSlotIds: PlayerSlotIds, intRange: IntRange, intRange2: IntRange, n2: number, function0: Function0, n3: number, object: any): PlayerSlotIds;
    equals(object: any): boolean;
    get hotbarInvSlots(): IntRange;
    get mainhandInvSlot(): Function0;
    get offhandInvSlot(): number;
    get storageInvSlots(): IntRange;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'org.anti_ad.mc.ipnext.inventory.data' {
  import { Bucket, MutableBucket } from 'org.anti_ad.mc.ipnext.util';
  import { ItemStack, ItemType, MutableItemStack } from 'org.anti_ad.mc.ipnext.item';
  import { List, Set, Iterator, Map } from 'java.util';
  import { CountSink } from 'org.anti_ad.mc.ipnext.item.rule';
  import { Function1 } from 'kotlin.jvm.functions';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Grouping } from 'kotlin.collections';
  import { Iterable } from 'java.lang';

  class ExtensionsKt {
    static collect(itemTracker: ItemTracker): ItemBucket;
  }


  class ItemBucket$Companion {
    invoke(): ItemBucket;
  }


  interface ItemBucket extends Bucket {}
  class ItemBucket extends Bucket {
    static readonly Companion: ItemBucket$Companion;
    contains(var1: ItemStack): boolean;
    contains(var1: CountSink): boolean;
    contains(var1: CountSink, var2: number): boolean;
    containsAll(var1: List): boolean;
    containsAll(var1: Bucket): boolean;
    copy(): ItemBucket;
    copyAsMutable(): MutableItemBucket;
    minus(var1: ItemBucket): ItemBucket;
  }


  class ItemStackListExtensionsKt {
    static collect(list: List): ItemBucket;
    static copyAsMutable(iterable: List): List;
    static filterNotEmpty(object: List): List;
    static itemTypes(iterable: List, bl: boolean): Set;
    static itemTypes$default(list: List, bl: boolean, n2: number, object: any): Set;
    static processAndCollect(object: List, function1: Function1): ItemBucket;
    static stat(list: List): ItemStat;
  }


  class ItemStat$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    invoke(list: List): ItemStat;
  }


  class ItemStat$GroupEntry {
    constructor(itemType: ItemType);
    add(n2: number, itemStack: ItemStack): void;
    get itemCount(): number;
    get itemType(): ItemType;
    get minSlotCount(): number;
    get slotCount(): number;
    get slotIndices(): List;
    set itemCount(n2: number);
    set slotCount(n2: number);
  }


  interface ItemStat$special$$inlined$groupingBy$1 extends Grouping {}
  class ItemStat$special$$inlined$groupingBy$1 extends Grouping {
    constructor(iterable: Iterable);
    keyOf(object: any): any;
    sourceIterator(): Iterator;
  }


  class ItemStat {
    static readonly Companion: ItemStat$Companion;
    constructor(iterable2: List);
    get groupEntries(): List;
    get itemGroups(): Map;
    get itemTypes(): Set;
    get totalItemCount(): number;
    get totalMaxSlotCount(): number;
    get totalMinSlotCount(): number;
    get totalSlotCount(): number;
  }


  class ItemTracker {
    copyAsMutable(): MutableItemTracker;
    get cursor(): ItemStack;
    get slots(): List;
    get thrownItems(): ItemBucket;
    subTracker(): SubTracker;
    subTracker(var1: List): SubTracker;
  }


  interface MutableItemBucket extends ItemBucket, MutableBucket {}
  class MutableItemBucket extends ItemBucket {
    constructor();
    accumulateCount(object: ItemType): number;
    accumulateCount(countSink: CountSink): number;
    accumulateCount(var1: any): number;
    add(itemStack: ItemStack): boolean;
    add(countSink: CountSink): boolean;
    add(countSink: CountSink, n2: number): boolean;
    addAll(object: List): void;
    addAll(object: Bucket): boolean;
    contains(itemStack: ItemStack): boolean;
    contains(countSink: CountSink): boolean;
    contains(countSink: CountSink, n2: number): boolean;
    containsAll(object: List): boolean;
    containsAll(iterator: Bucket): boolean;
    copy(): ItemBucket;
    copyAsMutable(): MutableItemBucket;
    minus(itemBucket: ItemBucket): ItemBucket;
    remove(itemStack: ItemStack): boolean;
    remove(countSink: CountSink): boolean;
    remove(countSink: CountSink, n2: number): boolean;
    removeAll(object: List): void;
    removeAll(object: Bucket): boolean;
    toString(): string;
  }


  interface MutableItemTracker extends ItemTracker {}
  class MutableItemTracker extends ItemTracker {
    constructor(mutableItemStack: MutableItemStack, list: List, mutableItemBucket: MutableItemBucket);

    constructor(mutableItemStack: MutableItemStack, list: List, mutableItemBucket: MutableItemBucket, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    copyAsMutable(): MutableItemTracker;
    equals(object: any): boolean;
    get cursor(): MutableItemStack;
    get slots(): List;
    get thrownItems(): MutableItemBucket;
    hashCode(): number;
    subTracker(): MutableSubTracker;
    subTracker(list: List): MutableSubTracker;
    toString(): string;
  }


  interface MutableSubTracker extends SubTracker {}
  class MutableSubTracker extends SubTracker {
    constructor(mutableItemTracker: MutableItemTracker, list: List);
    get indexedSlots(): List;
    get mainTracker(): MutableItemTracker;
    get slotIndices(): List;
    get slots(): List;
    plus(object: SubTracker): MutableSubTracker;
  }


  class SubTracker {
    get indexedSlots(): List;
    get mainTracker(): ItemTracker;
    get slotIndices(): List;
    get slots(): List;
    plus(var1: SubTracker): SubTracker;
  }

}

declare module 'org.anti_ad.mc.ipnext.inventory.sandbox' {
  import { List } from 'java.util';
  import { MutableItemTracker } from 'org.anti_ad.mc.ipnext.inventory.data';
  import { Function1 } from 'kotlin.jvm.functions';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';

  class ContainerSandboxKt {
    static toList(sandboxClick: SandboxClick): List;
  }


  class ItemPlanner {
    constructor(mutableItemTracker: MutableItemTracker);
    get clicks(): List;
    sandbox(function1: Function1): void;
    tracker(object: Function1): void;
  }


  class SandboxClick {
    constructor(n2: number, n3: number, n4: number, sandboxClick: SandboxClick);

    constructor(n2: number, n3: number, n4: number, sandboxClick: SandboxClick, n5: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): number;
    component2(): number;
    component3(): number;
    component4(): SandboxClick;
    copy(n2: number, n3: number, n4: number, sandboxClick: SandboxClick): SandboxClick;
    static copy$default(sandboxClick: SandboxClick, n2: number, n3: number, n4: number, sandboxClick2: SandboxClick, n5: number, object: any): SandboxClick;
    equals(object: any): boolean;
    get button(): number;
    get clickIndex(): number;
    get previousClick(): SandboxClick;
    get slotIndex(): number;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'org.anti_ad.mc.ipnext.inventory.sandbox.diffcalculator' {
  import { ContainerSandbox } from 'org.anti_ad.mc.ipnext.inventory.sandbox';
  import { ItemTracker, ItemStat } from 'org.anti_ad.mc.ipnext.inventory.data';
  import { ItemStack, ItemType } from 'org.anti_ad.mc.ipnext.item';
  import { Function1, Function2, Function0 } from 'kotlin.jvm.functions';
  import { Boolean, RuntimeException, Comparable, Integer } from 'java.lang';
  import { IntRange } from 'kotlin.ranges';
  import { List, Comparator } from 'java.util';
  import { FunctionReferenceImpl, DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { CountSink, CountSource } from 'org.anti_ad.mc.ipnext.item.rule';
  import { Pair } from 'kotlin';

  class DiffCalculator {
    static readonly INSTANCE: DiffCalculator;
    apply(containerSandbox: ContainerSandbox, itemTracker: ItemTracker): void;
  }


  class DiffCalculatorInstance$CompareSlotDsl {
    constructor(diffCalculatorInstance: DiffCalculatorInstance, n2: number);
    get bothEmpty(): boolean;
    get bothNotEmpty(): boolean;
    get equals(): boolean;
    get equalsType(): boolean;
    get g(): number;
    get goal(): ItemStack;
    get n(): number;
    get now(): ItemStack;
    get slotIndex(): number;
    leftClick(): void;
    repeatRightClick(n2: number): void;
    rightClick(): void;
  }


  interface DiffCalculatorInstance$filtered$1 extends Function1 {}
  class DiffCalculatorInstance$filtered$1 extends Function1 {
    static readonly INSTANCE: DiffCalculatorInstance$filtered$1;
    invoke(diffCalculatorInstance$CompareSlotDsl: DiffCalculatorInstance$CompareSlotDsl): boolean;
  }


  class DiffCalculatorInstance {
    constructor(containerSandbox: ContainerSandbox, itemTracker: ItemTracker);
    filtered(function1: Function1): List;
    static filtered$default(diffCalculatorInstance: DiffCalculatorInstance, function1: Function1, n2: number, object: any): List;
    get cursorGoal(): ItemStack;
    get cursorNow(): ItemStack;
    get goalTracker(): ItemTracker;
    get indices(): IntRange;
    get nowTracker(): ItemTracker;
    get sandbox(): ContainerSandbox;
    increaseLoopCount(): void;
    run(): void;
  }


  class DiffCalculatorKt {
  }


  interface DiffCalculatorUtil$Companion extends DiffCalculatorUtil {}
  class DiffCalculatorUtil$Companion extends DiffCalculatorUtil {
  }


  class DiffCalculatorUtil$DefaultImpls {
    static calcRank(diffCalculatorUtil: DiffCalculatorUtil, n2: number, n3: number): number;
    static canRight(diffCalculatorUtil: DiffCalculatorUtil, n2: number, n3: number): boolean;
    static clickCountLowerBound(diffCalculatorUtil: DiffCalculatorUtil, n2: number, n3: number): number;
    static clickCountSingleSlotToLess(diffCalculatorUtil: DiffCalculatorUtil, n2: number, n3: number): number;
    static clickCountUpperBound(diffCalculatorUtil: DiffCalculatorUtil, n2: number, n3: number): number;
  }


  class DiffCalculatorUtil {
    static readonly Companion: DiffCalculatorUtil$Companion;
    calcRank(var1: number, var2: number): number;
    canRight(var1: number, var2: number): boolean;
    clickCountLowerBound(var1: number, var2: number): number;
    clickCountSingleSlotToLess(var1: number, var2: number): number;
    clickCountUpperBound(var1: number, var2: number): number;
  }


  interface GenericDiffCalculatorInstance$run$1 extends Function2, FunctionReferenceImpl {}
  class GenericDiffCalculatorInstance$run$1 extends Function2 {
    static readonly INSTANCE: GenericDiffCalculatorInstance$run$1;
    invoke(containerSandbox: ContainerSandbox, itemTracker: ItemTracker): SimpleDiffCalculatorInstance;
  }


  interface GenericDiffCalculatorInstance$run$2 extends Function2, FunctionReferenceImpl {}
  class GenericDiffCalculatorInstance$run$2 extends Function2 {
    static readonly INSTANCE: GenericDiffCalculatorInstance$run$2;
    invoke(containerSandbox: ContainerSandbox, itemTracker: ItemTracker): ScoreBasedSingleDiffCalculatorInstance;
  }


  interface GenericDiffCalculatorInstance$run$3 extends Function2, FunctionReferenceImpl {}
  class GenericDiffCalculatorInstance$run$3 extends Function2 {
    static readonly INSTANCE: GenericDiffCalculatorInstance$run$3;
    invoke(containerSandbox: ContainerSandbox, itemTracker: ItemTracker): ScoreBasedDualDiffCalculatorInstance;
  }


  class GenericDiffCalculatorInstance$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface NoRoomException extends RuntimeException {}
  class NoRoomException extends RuntimeException {
    constructor(string: string);
  }


  class ScoreBasedDualDiffCalculatorInstance$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface ScoreBasedDualDiffCalculatorInstance extends SimpleDiffCalculatorInstance {}
  class ScoreBasedDualDiffCalculatorInstance extends SimpleDiffCalculatorInstance {
    constructor(containerSandbox: ContainerSandbox, itemTracker: ItemTracker);
    doItemType(object3: ItemType): void;
    get statGoal(): ItemStat;
    run(): void;
    runFinal(): void;
    toSlot(diffCalculatorInstance$CompareSlotDsl: DiffCalculatorInstance$CompareSlotDsl): SingleType$Slot;
  }


  class ScoreBasedDualDiffCalculatorInstanceKt {
  }


  interface ScoreBasedSingleDiffCalculatorInstance extends SimpleDiffCalculatorInstance {}
  class ScoreBasedSingleDiffCalculatorInstance extends SimpleDiffCalculatorInstance {
    constructor(containerSandbox: ContainerSandbox, itemTracker: ItemTracker);
    get statGoal(): ItemStat;
    run(): void;
    runFinal(): void;
  }


  interface SimpleClickCount extends Comparable {}
  class SimpleClickCount extends Comparable {
    compareTo(simpleClickCount: SimpleClickCount): number;
    get clicks(): List;
    get size(): number;
  }


  class SimpleClickEntry {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
  }


  class SingleType$Click {
    constructor(n2: number, singleType$Slot: SingleType$Slot, singleType$Button: SingleType$Button, singleType$Click: SingleType$Click);

    constructor(n2: number, slot: SingleType$Slot, button: SingleType$Button, singleType$Click: SingleType$Click, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): number;
    component2(): SingleType$Slot;
    component3(): SingleType$Button;
    component4(): SingleType$Click;
    copy(n2: number, singleType$Slot: SingleType$Slot, singleType$Button: SingleType$Button, singleType$Click: SingleType$Click): SingleType$Click;
    static copy$default(singleType$Click: SingleType$Click, n2: number, slot: SingleType$Slot, button: SingleType$Button, singleType$Click2: SingleType$Click, n3: number, object: any): SingleType$Click;
    equals(object: any): boolean;
    get button(): SingleType$Button;
    get clickIndex(): number;
    get previousClick(): SingleType$Click;
    get slot(): SingleType$Slot;
    hashCode(): number;
    toString(): string;
  }


  interface SingleType$Node$hashCode$2 extends Function0, FunctionReferenceImpl {}
  class SingleType$Node$hashCode$2 extends Function0 {
    invoke(): number;
  }


  class SingleType$Node$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  class SingleType$Slot$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface SingleType$Slot extends CountSink {}
  class SingleType$Slot extends CountSink {
    constructor(n2: number, n3: number);
    click(n2: number, singleType$Button: SingleType$Button, n3: number): Pair;
    component1(): number;
    component2(): number;
    copy(n2: number, n3: number): SingleType$Slot;
    static copy$default(singleType$Slot: SingleType$Slot, n2: number, n3: number, n4: number, object: any): SingleType$Slot;
    equals(object: any): boolean;
    get g(): number;
    get n(): number;
    get rank(): number;
    hashCode(): number;
    isGoal(): boolean;
    setCountSource(countSource: CountSource): void;
    toString(): string;
  }


  interface SingleType$special$$inlined$compareBy$1 extends Comparator {}
  class SingleType$special$$inlined$compareBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface SingleType$special$$inlined$thenBy$1 extends Comparator {}
  class SingleType$special$$inlined$thenBy$1 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface SingleType extends DiffCalculatorUtil {}
  class SingleType extends DiffCalculatorUtil {
    static readonly INSTANCE: SingleType;
    constructClickPath(singleType$Node: SingleType$Node): List;
    get nodeComparator(): Comparator;
    get rankAfterAllowed(): List;
    solve(singleType$Node: SingleType$Node): List;
    toList(singleType$Click: SingleType$Click): List;
  }

}

declare module 'org.anti_ad.mc.ipnext' {
  import { URL } from 'java.net';
  import { TimerTask, List, Timer } from 'java.util';
  import { Runnable } from 'java.lang';
  import { SemVer, InfoManagerBase } from 'org.anti_ad.mc.common.moreinfo';
  import { Function3, Function0 } from 'kotlin.jvm.functions';
  import { ConfigButtonInfo, CustomButtonWidget } from 'org.anti_ad.mc.common.gui.widgets';
  import { LogBase } from 'org.anti_ad.mc.common';
  import { ReentrantReadWriteLock } from 'java.util.concurrent.locks';

  class InventoryProfilesKt {
    static get versionCheckUrl(): URL;
    static init(): void;
  }


  interface IPNInfoManager$doCheckVersion$$inlined$timer$default$1 extends TimerTask {}
  class IPNInfoManager$doCheckVersion$$inlined$timer$default$1 extends TimerTask {
    run(): void;
  }


  interface IPNInfoManager$doCheckVersion$1$1$1$1 extends Runnable {}
  class IPNInfoManager$doCheckVersion$1$1$1$1 extends Runnable {
    run(): void;
  }


  interface IPNInfoManager$doCheckVersion$1$1$invoke$$inlined$timer$default$1 extends TimerTask {}
  class IPNInfoManager$doCheckVersion$1$1$invoke$$inlined$timer$default$1 extends TimerTask {
    constructor(semVer: SemVer);
    run(): void;
  }


  interface IPNInfoManager$doCheckVersion$1$1 extends Function3 {}
  class IPNInfoManager$doCheckVersion$1$1 extends Function3 {
    static readonly INSTANCE: IPNInfoManager$doCheckVersion$1$1;
    invoke(semVer: SemVer, object: SemVer, bl: boolean): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface IPNInfoManager$doSessionKeepAlive$$inlined$timer$default$1 extends TimerTask {}
  class IPNInfoManager$doSessionKeepAlive$$inlined$timer$default$1 extends TimerTask {
    run(): void;
  }


  interface IPNInfoManager$doSessionKeepAlive$1$1 extends Function3 {}
  class IPNInfoManager$doSessionKeepAlive$1$1 extends Function3 {
    static readonly INSTANCE: IPNInfoManager$doSessionKeepAlive$1$1;
    invoke(semVer: SemVer, semVer2: SemVer, bl: boolean): void;
    invoke(object: any, object2: any, object3: any): any;
  }


  interface IPNInfoManager$DoVersionCheckButtonInfo extends ConfigButtonInfo {}
  class IPNInfoManager$DoVersionCheckButtonInfo extends ConfigButtonInfo {
    static readonly INSTANCE: IPNInfoManager$DoVersionCheckButtonInfo;
    get buttonText(): string;
    onClick(customButtonWidget: CustomButtonWidget): void;
  }


  interface IPNInfoManager extends InfoManagerBase {}
  class IPNInfoManager extends InfoManagerBase {
    static readonly INSTANCE: IPNInfoManager;
    static access$getPlayerId$p(): Function0;
    static access$getSession$p(): string;
    checkVersion(uRL: URL, string: string, string2: string, function3: Function3): void;
    doCheckVersion(): void;
    doSessionKeepAlive(): void;
    get loader(): string;
    get mcVersion(): string;
    get modId(): string;
    get modName(): string;
    get version(): string;
    isEnabled(): Function0;
    set loader(string: string);
    set mcVersion(string: string);
    set modId(string: string);
    set modName(string: string);
    set version(string: string);
    setEnabled(function0: Function0): void;
  }


  interface Log extends LogBase {}
  class Log extends LogBase {
    static readonly INSTANCE: Log;
  }


  class ModInfo {
    static readonly INSTANCE: ModInfo;
    static readonly MOD_ID: string;
    static readonly MOD_NAME: string;
    static readonly MINECRAFT_VERSION: number;
    get mOD_VERSION(): string;
    get modVersion(): string;
    set mOD_VERSION(string: string);
  }


  interface NotificationManager$addNotification$1$1$1 extends Runnable {}
  class NotificationManager$addNotification$1$1$1 extends Runnable {
    static readonly INSTANCE: NotificationManager$addNotification$1$1$1;
    run(): void;
  }


  interface NotificationManager$addNotification$lambda$0$$inlined$schedule$1 extends TimerTask {}
  class NotificationManager$addNotification$lambda$0$$inlined$schedule$1 extends TimerTask {
    run(): void;
  }


  class NotificationManager {
    static readonly INSTANCE: NotificationManager;
    static access$getNotifications$p(): List;
    static access$getReadWriteLock$p(): ReentrantReadWriteLock;
    static access$getTimer$p(): Timer;
    static access$setTimer$p(timer2: Timer): void;
    addNotification(object: string): void;
  }


  class PlatformSpecificInitKt {
    static specificInit(): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.item' {
  import { Comparator, List } from 'java.util';
  import { Slot } from 'net.minecraft.world.inventory';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { CreativeModeTab, ItemStack as net_minecraft_world_item_ItemStack } from 'net.minecraft.world.item';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { Void, Boolean, Number, Comparable } from 'java.lang';
  import { NbtPath } from 'NbtPathArgument';
  import { DataComponentType } from 'net.minecraft.core.component';
  import { Tag, CompoundTag } from 'net.minecraft.nbt';

  interface ComponentUtils$comparatorFor$$inlined$compareBy$1 extends Comparator {}
  class ComponentUtils$comparatorFor$$inlined$compareBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$compareComponents$$inlined$sortedBy$1 extends Comparator {}
  class ComponentUtils$compareComponents$$inlined$sortedBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$compareComponents$$inlined$sortedBy$2 extends Comparator {}
  class ComponentUtils$compareComponents$$inlined$sortedBy$2 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$1 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$1 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$2 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$2 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$3 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$3 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$4 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$4 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$5 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$5 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$6 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$6 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$7 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$7 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$8 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$8 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$compareBy$9 extends Comparator {}
  class ComponentUtils$special$$inlined$compareBy$9 extends Comparator {
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$thenBy$1 extends Comparator {}
  class ComponentUtils$special$$inlined$thenBy$1 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$thenBy$2 extends Comparator {}
  class ComponentUtils$special$$inlined$thenBy$2 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  interface ComponentUtils$special$$inlined$thenComparator$1 extends Comparator {}
  class ComponentUtils$special$$inlined$thenComparator$1 extends Comparator {
    constructor(comparator: Comparator);
    compare(object: any, object2: any): number;
  }


  class ComponentUtils$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface ImmutableItemStack extends ItemStack {}
  class ImmutableItemStack extends ItemStack {
    constructor(itemType: ItemType, n2: number, slot: Slot);

    constructor(itemType: ItemType, n2: number, slot: Slot, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    get count(): number;
    get itemType(): ItemType;
    get sourceSlot(): Slot;
    set sourceSlot(slot: Slot);
  }


  interface ItemGroupComparator extends Comparator {}
  class ItemGroupComparator extends Comparator {
    compare(creativeModeTab: CreativeModeTab, creativeModeTab2: CreativeModeTab): number;
  }


  class ItemStack$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    invoke(itemType: ItemType, n2: number): ItemStack;
  }


  interface ItemStack extends ImmutableItemStack, MutableItemStack {}
  class ItemStack extends ImmutableItemStack {
    static readonly Companion: ItemStack$Companion;
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    component1(): ItemType;
    component2(): number;
    copyAsMutable(): MutableItemStack;
    equals(object: any): boolean;
    get count(): number;
    get itemType(): ItemType;
    get overstacked(): boolean;
    get overstackedAndNotManageable(): boolean;
    get sourceSlot(): Slot;
    hashCode(): number;
    set sourceSlot(var1: Slot);
    toString(): string;
  }


  class ItemStackExtensionsKt {
    static empty(mutableItemStack$Companion: MutableItemStack$Companion): MutableItemStack;
    static getEMPTY(itemStack$Companion: ItemStack$Companion): ItemStack;
    static getRoom(itemStack: ItemStack): number;
    static getVanillaStack(itemStack: ItemStack): net_minecraft_world_item_ItemStack;
    static isEmpty(itemStack: ItemStack): boolean;
    static isFull(itemStack: ItemStack): boolean;
    static isNotFull(itemStack: ItemStack): boolean;
    static setEmpty(mutableItemStack: MutableItemStack): void;
    static splitHalfTo(mutableItemStack: MutableItemStack, mutableItemStack2: MutableItemStack): void;
    static stackableWith(itemStack: ItemStack, itemStack2: ItemStack): boolean;
    static swapWith(mutableItemStack: MutableItemStack, mutableItemStack2: MutableItemStack): void;
    static transferNTo(mutableItemStack: MutableItemStack, mutableItemStack2: MutableItemStack, n2: number): void;
    static transferOneTo(mutableItemStack: MutableItemStack, mutableItemStack2: MutableItemStack): void;
    static transferTo(mutableItemStack: MutableItemStack, mutableItemStack2: MutableItemStack): void;
  }


  interface ItemType$1 extends Function1 {}
  class ItemType$1 extends Function1 {
    static readonly INSTANCE: ItemType$1;
    invoke(itemType: ItemType): Void;
  }


  class ItemType$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
  }


  interface ItemTypeExtensionsKt$EMPTY$1 extends Function0 {}
  class ItemTypeExtensionsKt$EMPTY$1 extends Function0 {
    static readonly INSTANCE: ItemTypeExtensionsKt$EMPTY$1;
    invoke(): boolean;
  }


  class ItemTypeExtensionsObject {
    static readonly INSTANCE: ItemTypeExtensionsObject;
    defaultOrderListChanged(): void;
    get translationKeysPriorityList(): List;
    makeDefaultList(): string;
    priorityListChanged(): void;
  }


  class MutableItemStack$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
  }


  interface MutableItemStack extends ItemStack {}
  class MutableItemStack extends ItemStack {
    static readonly Companion: MutableItemStack$Companion;
    constructor(itemType: ItemType, n2: number, slot: Slot);

    constructor(itemType: ItemType, n2: number, slot: Slot, n3: number, defaultConstructorMarker: DefaultConstructorMarker);
    get count(): number;
    get itemType(): ItemType;
    get sourceSlot(): Slot;
    set count(n2: number);
    set itemType(itemType: ItemType);
    set sourceSlot(slot: Slot);
  }


  class NbtUtils$NbtPath$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    of(string: string): NbtUtils$NbtPath;
  }


  class NbtUtils$NbtPath {
    static readonly Companion: NbtUtils$NbtPath$Companion;
    constructor(nbtPath: NbtPath);
    get value(): NbtPath;
    getTags(object: ItemType, object2: DataComponentType): List;
  }


  class NbtUtils$WrappedTag {
    constructor(tag: Tag);
    copy(): NbtUtils$WrappedTag;
    get asCompound(): CompoundTag;
    get asDouble(): number;
    get asList(): List;
    get asListComparable(): List;
    get asListUnwrapped(): List;
    get asNumber(): Number;
    get asString(): string;
    get value(): Tag;
    isCompound(): boolean;
    isList(): boolean;
    isNumber(): boolean;
    isString(): boolean;
    sameType(nbtUtils$WrappedTag: NbtUtils$WrappedTag): boolean;
  }


  interface PotionEffect extends Comparable {}
  class PotionEffect extends Comparable {
    constructor(string: string, n2: number, n3: number);
    compareTo(potionEffect: PotionEffect): number;
    component1(): string;
    component2(): number;
    component3(): number;
    copy(string: string, n2: number, n3: number): PotionEffect;
    static copy$default(potionEffect: PotionEffect, string: string, n2: number, n3: number, n4: number, object: any): PotionEffect;
    equals(object: any): boolean;
    get amplifier(): number;
    get duration(): number;
    get effect(): string;
    hashCode(): number;
    toString(): string;
  }

}

declare module 'org.anti_ad.mc.ipnext.item.rule' {
  import { List, Comparator } from 'java.util';
  import { Function2 } from 'kotlin.jvm.functions';
  import { ItemType } from 'org.anti_ad.mc.ipnext.item';

  class ArgumentMap {
    contains(string: string): boolean;
    defineParameter(parameter: Parameter, object: any): void;
    defineParameter(parameter: Parameter): void;
    defineParametersFrom(argumentMap: ArgumentMap): void;
    dumpAsPairList(): List;
    get(parameter: Parameter): any;
    get missingParameters(): List;
    isDefaultValue(parameter: Parameter): boolean;
    setArgumentsFrom(argumentMap: ArgumentMap): void;
    trySetArgument(parameter: Parameter, object: string): boolean;
  }


  class ArgumentType {
    parse(var1: string): any;
    toString(var1: any): string;
  }


  interface BaseRule extends Rule {}
  class BaseRule extends Rule {
    constructor();
    compare(itemType: ItemType, itemType2: ItemType): number;
    get arguments(): ArgumentMap;
    get comparator(): Function2;
    set comparator(function2: Function2);
  }


  class CountSink {
    setCountSource(var1: CountSource): void;
  }


  class CountSource {
    accumulateCount(var1: any): number;
  }


  interface EmptyRule extends Rule {}
  class EmptyRule extends Rule {
    static readonly INSTANCE: EmptyRule;
    compare(itemType: ItemType, itemType2: ItemType): number;
    get arguments(): ArgumentMap;
  }


  interface MutableEmptyRule extends BaseRule {}
  class MutableEmptyRule extends BaseRule {
  }


  class Parameter {
    constructor(string: string, argumentType: ArgumentType);
    get argumentType(): ArgumentType;
    get name(): string;
  }


  interface Rule extends Comparator {}
  class Rule extends Comparator {
    compare(var1: ItemType, var2: ItemType): number;
    get arguments(): ArgumentMap;
  }


  class Tag {
  }

}

declare module 'org.anti_ad.mc.ipnext.item.rule.file' {
  import { FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { Function2 } from 'kotlin.jvm.functions';
  import { Integer, RuntimeException } from 'java.lang';
  import { ItemType } from 'org.anti_ad.mc.ipnext.item';
  import { BaseRule, Rule, Parameter } from 'org.anti_ad.mc.ipnext.item.rule';
  import { List, Map, Set } from 'java.util';

  interface CustomRule$1 extends Function2, FunctionReferenceImpl {}
  class CustomRule$1 extends Function2 {
    invoke(itemType: ItemType, itemType2: ItemType): number;
  }


  interface CustomRule extends BaseRule {}
  class CustomRule extends BaseRule {
    constructor(list: List);
  }


  interface MissingParameterException extends RuntimeException {}
  class MissingParameterException extends RuntimeException {
    constructor(string: string);
  }


  class RuleDefinition {
    constructor(string: string, list: List);
    createCustomRule(): CustomRule;
    get ruleList(): List;
    get ruleName(): string;
    get status(): RuleDefinition$Status;
  }


  class RuleFile {
    constructor(string: string, string2: string, bl: boolean);
    get fileName(): string;
    get rulesMap(): Map;
    parseContent(): void;
  }


  class RuleFileRegister$RuleFinder {
    constructor(string: string, bl: boolean);
    get fromUserInput(): boolean;
    get ruleName(): string;
    searchCustomRule(): RuleDefinition;
  }


  class RuleFileRegister {
    static readonly INSTANCE: RuleFileRegister;
    static access$getRuleFiles$p(): List;
    get loadedFileNames(): Set;
    getCustomRule(string: string, bl: boolean): CustomRule;
    getCustomRuleOrEmpty(string: string): Rule;
    getNativeRule(string: string): Rule;
    getParameter(string: string): Parameter;
    reloadRuleFiles(list: List, bl: boolean): void;
  }


  interface SelfReferenceException extends RuntimeException {}
  class SelfReferenceException extends RuntimeException {
    constructor(string: string);
  }


  class SubRuleDefinition {
    constructor(object: string, iterator: string, object2: List);
    get arguments(): List;
    get name(): string;
    get prefix(): string;
    toRule(): Rule;
  }

}

declare module 'org.anti_ad.mc.ipnext.item.rule.natives' {
  import { FunctionReferenceImpl, DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Function2, Function0, Function1 } from 'kotlin.jvm.functions';
  import { Integer, Number } from 'java.lang';
  import { ItemType } from 'org.anti_ad.mc.ipnext.item';
  import { List, Map, Comparator, Set } from 'java.util';
  import { MutableEmptyRule, BaseRule, Parameter } from 'org.anti_ad.mc.ipnext.item.rule';
  import { Match } from 'org.anti_ad.mc.ipnext.item.rule.parameter';
  import { ItemEnchantments } from 'net.minecraft.world.item.enchantment';
  import { HolderSet } from 'net.minecraft.core';
  import { Provider } from 'HolderLookup';
  import { ResourceKey } from 'net.minecraft.resources';
  import { TagKey } from 'net.minecraft.tags';
  import { ByPropertyName } from 'org.anti_ad.mc.common.extensions';

  interface AllComponentsRule extends NativeRule {}
  class AllComponentsRule extends NativeRule {
    constructor();
  }


  interface BooleanBasedRule$2$2 extends Function2, FunctionReferenceImpl {}
  class BooleanBasedRule$2$2 extends Function2 {
    invoke(itemType: ItemType, itemType2: ItemType): number;
  }


  interface BooleanBasedRule$2$3 extends Function2, FunctionReferenceImpl {}
  class BooleanBasedRule$2$3 extends Function2 {
    invoke(itemType: ItemType, itemType2: ItemType): number;
  }


  interface BooleanBasedRule extends TypeBasedRule {}
  class BooleanBasedRule extends TypeBasedRule {
    constructor();
    andValue(function2: Function2): void;
    get valueOf(): Function2;
    set valueOf(function2: Function2);
  }


  interface ByNbtRule$1$2 extends Function2, FunctionReferenceImpl {}
  class ByNbtRule$1$2 extends Function2 {
    invoke(itemType: ItemType, itemType2: ItemType): number;
  }


  interface ByNbtRule extends NativeRule {}
  class ByNbtRule extends NativeRule {
    constructor();
    compareByNbtPath(itemType: ItemType, itemType2: ItemType): number;
    get dummies(): List;
    get dummyNumberRule(): NumberBasedRule;
    get dummyStringRule(): StringBasedRule;
    get initialized(): boolean;
    initializeDummyArguments(): void;
    set initialized(bl: boolean);
  }


  interface DefinedNativeRulesKt$accumulated_count$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$accumulated_count$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$accumulated_count$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$components_comparator$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$components_comparator$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$components_comparator$2;
    invoke(): AllComponentsRule;
  }


  interface DefinedNativeRulesKt$component_by_nbt$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$component_by_nbt$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$component_by_nbt$2;
    invoke(): ByNbtRule;
  }


  interface DefinedNativeRulesKt$component_match_nbt$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$component_match_nbt$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$component_match_nbt$2;
    invoke(): MatchNbtRule;
  }


  interface DefinedNativeRulesKt$component_nbt_comparator$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$component_nbt_comparator$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$component_nbt_comparator$2;
    invoke(): NbtComparatorRule;
  }


  interface DefinedNativeRulesKt$creative_menu_group_index$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$creative_menu_group_index$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$creative_menu_group_index$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$custom_name$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$custom_name$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$custom_name$2;
    invoke(): StringBasedRule;
  }


  interface DefinedNativeRulesKt$damage$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$damage$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$damage$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$display_name$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$display_name$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$display_name$2;
    invoke(): StringBasedRule;
  }


  interface DefinedNativeRulesKt$durability$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$durability$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$durability$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$enchantments_score$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$enchantments_score$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$enchantments_score$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$enchantments_tooltip_order$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$enchantments_tooltip_order$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$enchantments_tooltip_order$2;
    invoke(): EnchantmentsOrder;
  }


  interface DefinedNativeRulesKt$has_custom_name$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$has_custom_name$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$has_custom_name$2;
    invoke(): BooleanBasedRule;
  }


  interface DefinedNativeRulesKt$is_damageable$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$is_damageable$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$is_damageable$2;
    invoke(): BooleanBasedRule;
  }


  interface DefinedNativeRulesKt$is_item$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$is_item$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$is_item$2;
    invoke(): SimpleParameterBasedRule;
  }


  interface DefinedNativeRulesKt$is_tag$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$is_tag$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$is_tag$2;
    invoke(): MatchNbtRule;
  }


  interface DefinedNativeRulesKt$item_id$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$item_id$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$item_id$2;
    invoke(): StringBasedRule;
  }


  interface DefinedNativeRulesKt$max_damage$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$max_damage$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$max_damage$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$none$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$none$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$none$2;
    invoke(): MutableEmptyRule;
  }


  interface DefinedNativeRulesKt$potion_effect$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$potion_effect$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$potion_effect$2;
    invoke(): PotionEffectRule;
  }


  interface DefinedNativeRulesKt$potion_name$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$potion_name$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$potion_name$2;
    invoke(): StringBasedRule;
  }


  interface DefinedNativeRulesKt$raw_id$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$raw_id$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$raw_id$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$search_tab_index$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$search_tab_index$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$search_tab_index$2;
    invoke(): NumberBasedRule;
  }


  interface DefinedNativeRulesKt$translated_name$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$translated_name$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$translated_name$2;
    invoke(): StringBasedRule;
  }


  interface DefinedNativeRulesKt$translation_key$2 extends Function0, FunctionReferenceImpl {}
  class DefinedNativeRulesKt$translation_key$2 extends Function0 {
    static readonly INSTANCE: DefinedNativeRulesKt$translation_key$2;
    invoke(): StringBasedRule;
  }


  interface EnchantmentsOrder$1 extends Function2, FunctionReferenceImpl {}
  class EnchantmentsOrder$1 extends Function2 {
    invoke(itemType: ItemType, itemType2: ItemType): number;
  }


  interface EnchantmentsOrder extends SpecificEnchantmentOrder, NativeRule {}
  class EnchantmentsOrder extends SpecificEnchantmentOrder {
    constructor();
    compareItems(itemType: ItemType, itemType2: ItemType): number;
  }


  interface NativeRule extends BaseRule {}
  class NativeRule extends BaseRule {
  }


  interface NativeRuleKt$compareByMatch$1 extends Function2 {}
  class NativeRuleKt$compareByMatch$1 extends Function2 {
    static readonly INSTANCE: NativeRuleKt$compareByMatch$1;
    invoke(object: any, object2: any): number;
  }


  class NativeRuleKt {
    static compareByMatch(object: any, object2: any, function1: Function1, match2: Match, function2: Function2): number;
    static compareByMatch$default(object: any, object2: any, function1: Function1, match2: Match, function2: Function2, n2: number, object3: any): number;
    static compareByMatchSeparate(object: any, object2: any, function1: Function1, match2: Match, function2: Function2, function22: Function2): number;
    static compareByMatchSeparate(object: any, object2: any, bl: boolean, bl2: boolean, match2: Match, function2: Function2, function22: Function2): number;
    static compareByMatchSeparate$default(object: any, object2: any, function1: Function1, match2: Match, function2: Function2, function22: Function2, n2: number, object3: any): number;
    static compareByMatchSeparate$default(object: any, object2: any, bl: boolean, bl2: boolean, match2: Match, function2: Function2, function22: Function2, n2: number, object3: any): number;
  }


  class NativeRules {
    static readonly INSTANCE: NativeRules;
    get map(): Map;
  }


  interface NumberBasedRule extends TypeBasedRule {}
  class NumberBasedRule extends TypeBasedRule {
    constructor();
    compareNumber(number: Number, number2: Number): number;
    get valueOf(): Function2;
    set valueOf(function2: Function2);
  }


  interface PotionEffectRule extends NativeRule {}
  class PotionEffectRule extends NativeRule {
    constructor();
  }


  interface SpecificEnchantmentOrder$Companion$sortByListOrder$lambda$0$$inlined$compareBy$1 extends Comparator {}
  class SpecificEnchantmentOrder$Companion$sortByListOrder$lambda$0$$inlined$compareBy$1 extends Comparator {
    constructor(list: List);
    compare(object: any, object2: any): number;
  }


  class SpecificEnchantmentOrder$Companion {
    sortByListOrder(collection: Set, list: List): List;
  }


  class SpecificEnchantmentOrder$DefaultImpls {
    static compareEnchantments(object: SpecificEnchantmentOrder, object2: ItemEnchantments, object3: ItemEnchantments): number;
    static getSize(specificEnchantmentOrder: SpecificEnchantmentOrder, itemEnchantments: ItemEnchantments): number;
    static getTooltipOrderList(specificEnchantmentOrder: SpecificEnchantmentOrder, provider: Provider, resourceKey: ResourceKey, tagKey: TagKey): HolderSet;
  }


  interface StringBasedRule extends TypeBasedRule {}
  class StringBasedRule extends TypeBasedRule {
    constructor();
    compareString(string: string, string2: string): number;
    get valueOf(): Function2;
    set valueOf(function2: Function2);
  }


  interface TypeBasedRule extends NativeRule {}
  class TypeBasedRule extends NativeRule {
    get valueOf(): Function2;
    set valueOf(var1: Function2);
  }


  interface TypeBasedRuleProvider extends ByPropertyName {}
  class TypeBasedRuleProvider extends ByPropertyName {
    constructor(function0: Function0, function2: Function2, list: List, list2: List);

    constructor(function0: Function0, function2: Function2, list: List, list2: List, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    get args(): List;
    get postActions(): List;
    param(parameter: Parameter, object: any): TypeBasedRuleProvider;
    param(parameter: Parameter): TypeBasedRuleProvider;
    post(function1: Function1): TypeBasedRuleProvider;
  }

}

declare module 'org.anti_ad.mc.ipnext.item.rule.parameter' {
  import { ArgumentType, Rule } from 'org.anti_ad.mc.ipnext.item.rule';
  import { Boolean, Class, Enum } from 'java.lang';
  import { ResourceLocation } from 'net.minecraft.resources';
  import { DefaultConstructorMarker } from 'kotlin.jvm.internal';
  import { Item } from 'net.minecraft.world.item';
  import { ItemType, NbtUtils$NbtPath } from 'org.anti_ad.mc.ipnext.item';
  import { List, Map } from 'java.util';
  import { Tag } from 'net.minecraft.nbt';

  interface BooleanArgumentType extends ArgumentType {}
  class BooleanArgumentType extends ArgumentType {
    static readonly INSTANCE: BooleanArgumentType;
    parse(string: string): boolean;
    toString(bl: boolean): string;
    toString(object: any): string;
  }


  interface EnumArgumentType extends ArgumentType {}
  class EnumArgumentType extends ArgumentType {
    constructor(clazz: Class);
    get enumClass(): Class;
    parse(string: string): Enum;
    toString(enum_: Enum): string;
    toString(var1: any): string;
  }


  interface IdentifierArgumentType extends ArgumentType {}
  class IdentifierArgumentType extends ArgumentType {
    static readonly INSTANCE: IdentifierArgumentType;
    parse(string: string): ResourceLocation;
    toString(resourceLocation: ResourceLocation): string;
    toString(var1: any): string;
  }


  interface ItemNameArgumentType extends ArgumentType {}
  class ItemNameArgumentType extends ArgumentType {
    static readonly INSTANCE: ItemNameArgumentType;
    parse(string: string): ItemTypeMatcher;
    toString(itemTypeMatcher: ItemTypeMatcher): string;
    toString(var1: any): string;
  }


  class ItemTypeMatcher$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    forItem(string: string): ItemTypeMatcher;
    forTag(string: string): ItemTypeMatcher;
  }


  interface ItemTypeMatcher$IsItem extends ItemTypeMatcher {}
  class ItemTypeMatcher$IsItem extends ItemTypeMatcher {
    constructor(resourceLocation: ResourceLocation);
    get identifier(): ResourceLocation;
    get item(): Item;
    match(itemType: ItemType): boolean;
  }


  interface ItemTypeMatcher$IsTag extends ItemTypeMatcher {}
  class ItemTypeMatcher$IsTag extends ItemTypeMatcher {
    constructor(resourceLocation: ResourceLocation);
    get identifier(): ResourceLocation;
    get tag(): List;
    match(itemType: ItemType): boolean;
  }


  interface ItemTypeMatcher extends ItemTypeMatcher$IsItem, ItemTypeMatcher$IsTag {}
  class ItemTypeMatcher extends ItemTypeMatcher$IsItem {
    static readonly Companion: ItemTypeMatcher$Companion;
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    get identifier(): ResourceLocation;
    match(var1: ItemType): boolean;
  }


  class NativeParameters {
    static readonly INSTANCE: NativeParameters;
    get map(): Map;
  }


  interface NbtArgumentType extends ArgumentType {}
  class NbtArgumentType extends ArgumentType {
    static readonly INSTANCE: NbtArgumentType;
    parse(string: string): Tag;
    toString(tag: Tag): string;
    toString(var1: any): string;
  }


  interface NbtPathArgumentType extends ArgumentType {}
  class NbtPathArgumentType extends ArgumentType {
    static readonly INSTANCE: NbtPathArgumentType;
    parse(string: string): NbtUtils$NbtPath;
    toString(nbtUtils$NbtPath: NbtUtils$NbtPath): string;
    toString(var1: any): string;
  }


  class RequireNbt$WhenMappings {
    static readonly $EnumSwitchMapping$0: number[];
  }


  interface RuleArgumentType extends ArgumentType {}
  class RuleArgumentType extends ArgumentType {
    static readonly INSTANCE: RuleArgumentType;
    parse(string: string): Rule;
    toString(rule: Rule): string;
    toString(var1: any): string;
  }


  interface StringArgumentType extends ArgumentType {}
  class StringArgumentType extends ArgumentType {
    static readonly INSTANCE: StringArgumentType;
    parse(string: string): string;
    toString(string: string): string;
    toString(var1: any): string;
  }


  interface TagNameArgumentType extends ArgumentType {}
  class TagNameArgumentType extends ArgumentType {
    static readonly INSTANCE: TagNameArgumentType;
    parse(string: string): ItemTypeMatcher;
    toString(itemTypeMatcher: ItemTypeMatcher): string;
    toString(var1: any): string;
  }

}

declare module 'org.anti_ad.mc.ipnext.mixin' {
  import { Key } from 'InputConstants';
  import { Player } from 'net.minecraft.world.entity.player';
  import { ItemStack } from 'net.minecraft.world.item';
  import { CallbackInfo, CallbackInfoReturnable } from 'org.spongepowered.asm.mixin.injection.callback';
  import { IMixinItemGroup } from 'org.anti_ad.mc.ipnext.mixinhelpers';
  import { TradeOfferButton } from 'MerchantScreen';
  import { LocalPlayer } from 'net.minecraft.client.player';
  import { Options } from 'net.minecraft.client';
  import { Screen } from 'net.minecraft.client.gui.screens';
  import { ClickType } from 'net.minecraft.world.inventory';
  import { NonNullList } from 'net.minecraft.core';

  class IMixinKeyBinding {
    get keyCode(): Key;
    get pressed(): boolean;
    get timesPressed(): number;
    set pressed(var1: boolean);
    set timesPressed(var1: number);
  }


  class MixinAbstractContainerScreen {
  }


  class MixinAnvilMenu {
    onTakeOutputPost(player: Player, itemStack: ItemStack, callbackInfo: CallbackInfo): void;
    onTakeOutputPre(player: Player, itemStack: ItemStack, callbackInfo: CallbackInfo): void;
  }


  class MixinClientPacketListener {
  }


  class MixinInGameHud {
  }


  interface MixinItemGroup extends IMixinItemGroup {}
  class MixinItemGroup extends IMixinItemGroup {
    get iPNPriorityIndex(): number;
    set iPNPriorityIndex(n2: number);
  }


  class MixinMerchantScreen {
    tradeOfferButtons: TradeOfferButton[];
  }


  class MixinMinecraftClient {
    player: LocalPlayer;
    options: Options;
    screen: Screen;
    handleInputEvents(object: CallbackInfo): void;
  }


  class MixinMultiPlayerGameMode {
    clickSlot(n2: number, n3: number, n4: number, clickType: ClickType, player: Player, callbackInfo: CallbackInfo): void;
    clickSlotPre(n2: number, n3: number, n4: number, clickType: ClickType, player: Player, callbackInfo: CallbackInfo): void;
  }


  class MixinPlayerController {
    clickCreativeStack(itemStack: ItemStack, n2: number, callbackInfo: CallbackInfo): void;
    pickItem(n2: number, callbackInfo: CallbackInfo): void;
  }


  class MixinPlayerInventory {
    items: NonNullList;
    addStackPost(itemStack: ItemStack, callbackInfoReturnable: CallbackInfoReturnable): void;
    addStackPre(itemStack: ItemStack, callbackInfoReturnable: CallbackInfoReturnable): void;
    getEmptySlot(callbackInfoReturnable: CallbackInfoReturnable): void;
    setPickedItemPost(itemStack: ItemStack, callbackInfo: CallbackInfo): void;
    setPickedItemPre(itemStack: ItemStack, callbackInfo: CallbackInfo): void;
  }


  class MixinScreenHandler {
    internalOnSlotClickBegin(n2: number, n3: number, n4: number, clickType: ClickType, player: Player, callbackInfo: CallbackInfo): void;
    postInternalOnSlotClickBegin(n2: number, n3: number, n4: number, clickType: ClickType, player: Player, callbackInfo: CallbackInfo): void;
  }


  class MixinServerBoundInteractPacket {
  }


  class MixinTraderTileEntityBase {
    openTradingGUI(player: Player, callbackInfoReturnable: CallbackInfoReturnable): void;
  }


  class MixinVirtualMouseHandler {
  }

}

declare module 'org.anti_ad.mc.ipnext.mixinhelpers' {
  class IMixinItemGroup {
    get iPNPriorityIndex(): number;
    set iPNPriorityIndex(n2: number);
  }

}

declare module 'org.anti_ad.mc.ipnext.neoforge' {
  import { Pre, Post } from 'ClientTickEvent';
  import { LoggingIn } from 'ClientPlayerNetworkEvent';
  import { Load } from 'LevelEvent';
  import { ItemCraftedEvent } from 'PlayerEvent';
  import { Post as screenevent_init_Post } from 'ScreenEvent.Init';
  import { Pre as screenevent_render_Pre, Post as screenevent_render_Post } from 'ScreenEvent.Render';
  import { Background, Foreground } from 'ContainerScreenEvent.Render';
  import { Pre as screenevent_keypressed_Pre } from 'ScreenEvent.KeyPressed';
  import { Closing } from 'ScreenEvent';
  import { IMixinConfigPlugin, IMixinInfo } from 'org.spongepowered.asm.mixin.extensibility';
  import { Set, List } from 'java.util';
  import { ClassNode } from 'org.objectweb.asm.tree';
  import { Runnable } from 'java.lang';

  class ForgeEventHandler {
    clientClick(pre: Pre): void;
    clientClick(post: Post): void;
    joinWorld(load: Load): void;
    onBackgroundRender(background: Background): void;
    onCrafted(itemCraftedEvent: ItemCraftedEvent): void;
    onForegroundRender(foreground: Foreground): void;
    onGuiKeyPressedPre(pre: screenevent_keypressed_Pre): void;
    onInitGuiPost(post: screenevent_init_Post): void;
    onPlayerLogInEvent(loggingIn: LoggingIn): void;
    onScreenClose(closing: Closing): void;
    postScreenRender(post: screenevent_render_Post): void;
    preScreenRender(pre: screenevent_render_Pre): void;
  }


  class IPNForgeModInit {
    constructor();
  }


  interface IPNMixinPlugin extends IMixinConfigPlugin {}
  class IPNMixinPlugin extends IMixinConfigPlugin {
    constructor();
    acceptTargets(set: Set, set2: Set): void;
    get mixins(): List;
    get refMapperConfig(): string;
    onLoad(string: string): void;
    postApply(string: string, classNode: ClassNode, string2: string, iMixinInfo: IMixinInfo): void;
    preApply(string: string, classNode: ClassNode, string2: string, iMixinInfo: IMixinInfo): void;
    shouldApplyMixin(string: string, string2: string): boolean;
  }


  interface KotlinClientInit extends Runnable {}
  class KotlinClientInit extends Runnable {
    run(): void;
  }


  interface KotlinServerInit extends Runnable {}
  class KotlinServerInit extends Runnable {
    run(): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.parser' {
  import { d_0, e, k_0, j_0, g, r_0 } from 'org.anti_ad.a.b.a.a.a';
  import { Function1, Function0 } from 'kotlin.jvm.functions';
  import { Path } from 'java.nio.file';
  import { List, BitSet } from 'java.util';
  import { a } from 'org.anti_ad.a.b.a.a.a.b';
  import { c } from 'org.anti_ad.a.b.a.a.a.a';
  import { Savable } from 'org.anti_ad.mc.common';
  import { LogMessage, LogLevel } from 'LogBase';
  import { ConfigButtonClickHandler } from 'org.anti_ad.mc.common.gui.widgets';
  import { FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { RulesLexer, RulesParser } from 'org.anti_ad.mc.ipnext.gen';
  import { RuleDefinition } from 'org.anti_ad.mc.ipnext.item.rule.file';
  import { IndentedData } from 'org.anti_ad.mc.common.util';
  import { RuntimeException } from 'java.lang';
  import { Rule } from 'org.anti_ad.mc.ipnext.item.rule';

  class AntlrExtensionsKt {
    static parseBy(object: string, object2: Function1, function1: Function1, n2: number): d_0;
    static parseBy$default(string: string, function1: Function1, function12: Function1, n2: number, n3: number, object: any): d_0;
  }


  class CustomDataFileLoader {
    static readonly INSTANCE: CustomDataFileLoader;
    doSanityCheck(): boolean;
    load(): void;
    reload(bl: boolean): void;
  }


  class CustomDataFileLoaderKt {
    static access$getConfigFolder$p(): Path;
    static access$getDefinedLoaders$p(): List;
    static access$getFiles(string: string): List;
  }


  interface ErrorListener extends e {}
  class ErrorListener extends e {
    static readonly INSTANCE: ErrorListener;
    reportAmbiguity(d_02: d_0, a2: a, n2: number, n3: number, bl: boolean, bitSet: BitSet, c2: c): void;
    syntaxError(k_02: k_0, object: any, n2: number, n3: number, string: string, j_02: j_0): void;
  }


  interface HintsLoader extends Loader {}
  class HintsLoader extends Loader {
    static readonly INSTANCE: HintsLoader;
    doSanityCheck(): boolean;
    load(): void;
    reload(bl: boolean): void;
  }


  class Loader {
    doSanityCheck(): boolean;
    load(): void;
    reload(var1: boolean): void;
  }


  interface LockSlotsLoader extends Savable, Loader {}
  class LockSlotsLoader extends Savable {
    static readonly INSTANCE: LockSlotsLoader;
    doSanityCheck(): boolean;
    get file(): Path;
    get fileOld(): Path;
    load(): void;
    reload(bl: boolean): void;
    save(): void;
  }


  interface ProfilesLoader extends Savable, Loader {}
  class ProfilesLoader extends Savable {
    static readonly INSTANCE: ProfilesLoader;
    doSanityCheck(): boolean;
    get file(): Path;
    get oldfile(): Path;
    get profiles(): List;
    get savedProfiles(): List;
    load(): void;
    reload(bl: boolean): void;
    save(): void;
  }


  interface RefillSlotsLoader extends Savable, Loader {}
  class RefillSlotsLoader extends Savable {
    static readonly INSTANCE: RefillSlotsLoader;
    doSanityCheck(): boolean;
    get file(): Path;
    load(): void;
    reload(bl: boolean): void;
    save(): void;
  }


  interface ReloadRuleFileButtonInfoDelegate$onClick$$inlined$listenLog$1 extends Function1 {}
  class ReloadRuleFileButtonInfoDelegate$onClick$$inlined$listenLog$1 extends Function1 {
    static readonly INSTANCE: ReloadRuleFileButtonInfoDelegate$onClick$$inlined$listenLog$1;
    invoke(logMessage: LogMessage): void;
  }


  interface ReloadRuleFileButtonInfoDelegate$onClick$$inlined$listenLog$2 extends Function1 {}
  class ReloadRuleFileButtonInfoDelegate$onClick$$inlined$listenLog$2 extends Function1 {
    constructor(logLevel: LogLevel, function1: Function1);
    invoke(logMessage: LogMessage): void;
  }


  interface ReloadRuleFileButtonInfoDelegate extends ConfigButtonClickHandler {}
  class ReloadRuleFileButtonInfoDelegate extends ConfigButtonClickHandler {
    static readonly INSTANCE: ReloadRuleFileButtonInfoDelegate;
    onClick(function0: Function0): void;
  }


  interface RuleLoader extends Loader {}
  class RuleLoader extends Loader {
    static readonly INSTANCE: RuleLoader;
    static readonly internalFileDisplayName: string;
    doSanityCheck(): boolean;
    load(): void;
    reload(bl: boolean): void;
  }


  interface RuleParser$parseRuleDefinition$parser$1 extends Function1, FunctionReferenceImpl {}
  class RuleParser$parseRuleDefinition$parser$1 extends Function1 {
    static readonly INSTANCE: RuleParser$parseRuleDefinition$parser$1;
    invoke(g2: g): RulesLexer;
  }


  interface RuleParser$parseRuleDefinition$parser$2 extends Function1, FunctionReferenceImpl {}
  class RuleParser$parseRuleDefinition$parser$2 extends Function1 {
    static readonly INSTANCE: RuleParser$parseRuleDefinition$parser$2;
    invoke(r_02: r_0): RulesParser;
  }


  interface RuleParser$parseSubRule$1 extends Function1, FunctionReferenceImpl {}
  class RuleParser$parseSubRule$1 extends Function1 {
    static readonly INSTANCE: RuleParser$parseSubRule$1;
    invoke(g2: g): RulesLexer;
  }


  interface RuleParser$parseSubRule$2 extends Function1, FunctionReferenceImpl {}
  class RuleParser$parseSubRule$2 extends Function1 {
    static readonly INSTANCE: RuleParser$parseSubRule$2;
    invoke(r_02: r_0): RulesParser;
  }


  class RuleParser {
    static readonly INSTANCE: RuleParser;
    parseRuleDefinition(object: IndentedData): RuleDefinition;
    parseSubRule(object: string): List;
  }


  interface SlotSettingsLoader extends Loader {}
  class SlotSettingsLoader extends Loader {
    static readonly INSTANCE: SlotSettingsLoader;
    doSanityCheck(): boolean;
    load(): void;
    reload(bl: boolean): void;
  }


  interface SyntaxErrorException extends RuntimeException {}
  class SyntaxErrorException extends RuntimeException {
    constructor(n2: number, n3: number, string: string);
    component1(): number;
    component2(): number;
    component3(): string;
    copy(n2: number, n3: number, string: string): SyntaxErrorException;
    static copy$default(syntaxErrorException: SyntaxErrorException, n2: number, n3: number, string: string, n4: number, object: any): SyntaxErrorException;
    equals(object: any): boolean;
    get line(): number;
    get msg(): string;
    get pos(): number;
    hashCode(): number;
    toString(): string;
  }


  class TemporaryRuleParser {
    static readonly INSTANCE: TemporaryRuleParser;
    onReload(): void;
    parse(string: string): Rule;
  }


  interface VillagerBookmarksLoader extends Savable, Loader {}
  class VillagerBookmarksLoader extends Savable {
    static readonly INSTANCE: VillagerBookmarksLoader;
    doSanityCheck(): boolean;
    get path(): Path;
    load(): void;
    reload(bl: boolean): void;
    save(): void;
  }

}

declare module 'org.anti_ad.mc.ipnext.profiles.config' {
  import { ResourceLocation } from 'net.minecraft.resources';
  import { Tag } from 'net.minecraft.nbt';
  import { List } from 'java.util';
  import { DefaultConstructorMarker, FunctionReferenceImpl } from 'kotlin.jvm.internal';
  import { Function1 } from 'kotlin.jvm.functions';
  import { ProfilesLexer, ProfilesParser } from 'org.anti_ad.mc.ipnext.gen';
  import { g, r_0 } from 'org.anti_ad.a.b.a.a.a';

  class ProfileComponentData {
    constructor(resourceLocation: ResourceLocation, tag: Tag);
    component1(): ResourceLocation;
    component2(): Tag;
    copy(resourceLocation: ResourceLocation, tag: Tag): ProfileComponentData;
    static copy$default(profileComponentData: ProfileComponentData, resourceLocation: ResourceLocation, tag: Tag, n2: number, object: any): ProfileComponentData;
    equals(object: any): boolean;
    get componentNbt(): Tag;
    get id(): ResourceLocation;
    hashCode(): number;
    toString(): string;
  }


  class ProfileData {
    constructor(string: string, profileSlotId: ProfileSlotId, list: List, bl: boolean);

    constructor(string: string, profileSlotId: ProfileSlotId, list: List, bl: boolean, n2: number, defaultConstructorMarker: DefaultConstructorMarker);
    component1(): string;
    component2(): ProfileSlotId;
    component3(): List;
    component4(): boolean;
    copy(string: string, profileSlotId: ProfileSlotId, list: List, bl: boolean): ProfileData;
    static copy$default(profileData: ProfileData, string: string, profileSlotId: ProfileSlotId, list: List, bl: boolean, n2: number, object: any): ProfileData;
    equals(object: any): boolean;
    get active(): ProfileSlotId;
    get name(): string;
    get slots(): List;
    get valid(): boolean;
    hashCode(): number;
    toString(): string;
  }


  class ProfileItemData {
    constructor(string: string, string2: string, list: List);
    component1(): string;
    component2(): string;
    component3(): List;
    copy(string: string, string2: string, list: List): ProfileItemData;
    static copy$default(profileItemData: ProfileItemData, string: string, string2: string, list: List, n2: number, object: any): ProfileItemData;
    equals(object: any): boolean;
    get components(): List;
    get customName(): string;
    get itemId(): string;
    hashCode(): number;
    toString(): string;
  }


  interface ProfilesConfig$getProfiles$1 extends Function1, FunctionReferenceImpl {}
  class ProfilesConfig$getProfiles$1 extends Function1 {
    static readonly INSTANCE: ProfilesConfig$getProfiles$1;
    invoke(g2: g): ProfilesLexer;
  }


  interface ProfilesConfig$getProfiles$2 extends Function1, FunctionReferenceImpl {}
  class ProfilesConfig$getProfiles$2 extends Function1 {
    static readonly INSTANCE: ProfilesConfig$getProfiles$2;
    invoke(r_02: r_0): ProfilesParser;
  }


  class ProfilesConfig {
    static readonly INSTANCE: ProfilesConfig;
    asString(object: List): string;
    getProfiles(string: string): List;
    parseRuleDefinition(string: string): void;
  }


  class ProfileSlot {
    constructor(profileSlotId: ProfileSlotId, list: List);
    component1(): ProfileSlotId;
    component2(): List;
    copy(profileSlotId: ProfileSlotId, list: List): ProfileSlot;
    static copy$default(profileSlot: ProfileSlot, profileSlotId: ProfileSlotId, list: List, n2: number, object: any): ProfileSlot;
    equals(object: any): boolean;
    get id(): ProfileSlotId;
    get items(): List;
    hashCode(): number;
    toString(): string;
  }


  class ProfileSlotId$Companion {
    constructor(defaultConstructorMarker: DefaultConstructorMarker);
    valueOf(n2: number): ProfileSlotId;
    valueOfOrFAKE(string: string): ProfileSlotId;
  }

}

declare module 'org.anti_ad.mc.ipnext.specific.event' {
  import { MutableComponent } from 'net.minecraft.network.chat';
  import { SemVer } from 'org.anti_ad.mc.common.moreinfo';

  class PClientEventHandler$DefaultImpls {
    static createChatMessage(pClientEventHandler: PClientEventHandler, semVer: SemVer): MutableComponent;
  }


  class PClientEventHandler {
    createChatMessage(var1: SemVer): MutableComponent;
  }

}

declare module 'org.anti_ad.mc.ipnext.specific' {
  import { NativeContext } from 'org.anti_ad.mc.common.gui';

  class SmallHelpersKt {
    static getAsOverlayContext(nativeContext: NativeContext): NativeContext;
    static initInfoManager(): void;
    static serverIdentifier(bl: boolean): string;
  }

}

declare module 'org.anti_ad.mc.ipnext.util' {
  import { CountSource, CountSink } from 'org.anti_ad.mc.ipnext.item.rule';
  import { Set, Map } from 'java.util';

  interface Bucket extends CountSource {}
  class Bucket extends CountSource {
    accumulateCount(var1: CountSink): number;
    accumulateCount(var1: any): number;
    contains(var1: CountSink): boolean;
    contains(var1: CountSink, var2: number): boolean;
    containsAll(var1: Bucket): boolean;
    count(var1: CountSink): number;
    get asMap(): Map;
    get elementSet(): Set;
    get entrySet(): Set;
    get size(): number;
    isEmpty(): boolean;
  }


  interface MutableBucket extends Bucket {}
  class MutableBucket extends Bucket {
    constructor();
    accumulateCount(countSink: CountSink): number;
    accumulateCount(var1: any): number;
    add(countSink: CountSink): boolean;
    add(countSink: CountSink, n2: number): boolean;
    addAll(object: Bucket): boolean;
    clear(): void;
    contains(countSink: CountSink): boolean;
    contains(countSink: CountSink, n2: number): boolean;
    containsAll(iterator: Bucket): boolean;
    copyAsMutable(): MutableBucket;
    count(countSink: CountSink): number;
    equals(object: any): boolean;
    get asMap(): Map;
    get elementSet(): Set;
    get entrySet(): Set;
    get size(): number;
    hashCode(): number;
    isEmpty(): boolean;
    remove(countSink: CountSink): boolean;
    remove(countSink: CountSink, n2: number): boolean;
    removeAll(object: Bucket): boolean;
  }

}