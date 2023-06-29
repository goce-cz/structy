import { pipe } from 'fp-ts/lib/function'
import { Optic } from '../monocle/optic.ts'
import { bindOptic, BoundOptic } from './bind-optic.ts'

export function pipeBoundOptic<A extends Optic<any, any>>(
  a: BoundOptic<A>
): BoundOptic<A>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>
>(a: BoundOptic<A>, ab: (a: A) => B): BoundOptic<B>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>
>(a: BoundOptic<A>, ab: (a: A) => B, bc: (b: B) => C): BoundOptic<C>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): BoundOptic<D>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): BoundOptic<E>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): BoundOptic<F>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): BoundOptic<G>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): BoundOptic<H>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): BoundOptic<I>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): BoundOptic<J>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): BoundOptic<K>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): BoundOptic<L>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): BoundOptic<M>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): BoundOptic<N>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): BoundOptic<O>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>,
  P extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): BoundOptic<P>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>,
  P extends Optic<any, any>,
  Q extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): BoundOptic<Q>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>,
  P extends Optic<any, any>,
  Q extends Optic<any, any>,
  R extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): BoundOptic<R>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>,
  P extends Optic<any, any>,
  Q extends Optic<any, any>,
  R extends Optic<any, any>,
  S extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): BoundOptic<S>
export function pipeBoundOptic<
  A extends Optic<any, any>,
  B extends Optic<any, any>,
  C extends Optic<any, any>,
  D extends Optic<any, any>,
  E extends Optic<any, any>,
  F extends Optic<any, any>,
  G extends Optic<any, any>,
  H extends Optic<any, any>,
  I extends Optic<any, any>,
  J extends Optic<any, any>,
  K extends Optic<any, any>,
  L extends Optic<any, any>,
  M extends Optic<any, any>,
  N extends Optic<any, any>,
  O extends Optic<any, any>,
  P extends Optic<any, any>,
  Q extends Optic<any, any>,
  R extends Optic<any, any>,
  S extends Optic<any, any>,
  T extends Optic<any, any>
>(
  a: BoundOptic<A>,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): BoundOptic<T>

export function pipeBoundOptic(
  boundOptic: BoundOptic<any>,
  ...optics: Array<(a: any) => any>
): BoundOptic<any> {
  return bindOptic(
    // @ts-expect-error The `pipe` is strictly typed, but implemented as a variadic function
    pipe(boundOptic.optic, ...(optics as any)),
    boundOptic.store
  )
}
