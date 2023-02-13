// export type SkipFirst<T extends (unknown | never)[]> = T extends [unknown, ...infer R] ? R : []
// export type TupleLength<T extends (unknown | never)[]> = T extends { length: infer L } ? L : never;
// export type Resolver<T, A extends (unknown | never)[]> = (chain: A) => [T, ...A]
// export type Updater<T, A extends (unknown | never)[]> = (chain: A, value: T) => A[0]
// export type PickLast<T extends (unknown | never)[]> = T[TupleLength<SkipFirst<T>>]
//
// export interface Query<T, A extends unknown[]> {
//   resolve: Resolver<T, A>
//   update: Updater<T, A>
// }
//
// export const propertyQuery = <O extends object, A extends [O, ...unknown[]], K extends keyof O> (propertyName: K): Query<O[K], A> => ({
//   resolve: (chain) => [chain[0][propertyName], ...chain],
//   update: ([parent, ...ancestors], value) => ({ ...parent, [propertyName]: value })
// })
// function chainQueries<A extends unknown[], T1, T2, T3> (query1: Query<T1, A>, query2: Query<T2, [T1, ...A]>, query3: Query<T3, [T2, ...A]>): Query<T3, [T2, T1, ...A]>
// function chainQueries(...queries: Query<any, any>[]): Query<any, any> {
//   const reversedQueries = queries.reverse()
//   return ({
//     resolve: chain => queries.reduce((lastChain, query) => query.resolve(lastChain), chain),
//     update: (chain, value) => {
//       const lastChain = chain.slice()
//       let lastValue = value
//       for (let i = queries.length -1; i >= 0; i--) {
//         const query = queries[i]
//         lastValue = query.update(lastChain, lastValue)
//         lastChain.pop()
//       }
//       reversedQueries.reduce((lastChain, query) => {
//         chain
//         query.update()
//       }, chain)
//     }
//   })
// }
//
// type X = [string, {}, number]
// type Y = SkipFirst<X>
// type L = X['length']
// type Z = PickLast<X>
//

import { q } from 'vitest/dist/types-aac763a5'

export type Resolver<P, C> = (parent: P) => C
export type Updater<P, C> = (parent: P, value: C) => P

export interface Query<P, C> {
  resolve: Resolver<P, C>
  update: Updater<P, C>
}

export const propertyQuery = <P extends object, K extends keyof P> (propertyName: K): Query<P, P[K]> => ({
  resolve: (parent) => parent[propertyName],
  update: (parent, value) => ({ ...parent, [propertyName]: value })
})

export const arrayIndexQuery = <P extends unknown[], I extends number> (elementIndex: I): Query<P, P[I]> => ({
  resolve: (parent) => parent[elementIndex],
  update: (parent, value) => parent.map((element, index) => elementIndex === index ? value : element) as P
})

export const arrayFindQuery = <P extends unknown[], I extends number> (predicate: (value: P[number], index: number, obj: P) => boolean): Query<P, P[I]> => ({
  resolve: (parent) => parent.find(predicate as any),
  update: (parent, value) => parent.map((element, index) => predicate(element, index, parent) ? value : element) as P
})

export interface ChainedQuery<P, C> extends Query<P, C> {
  resolveChain: (parent: P, flatten: boolean) => [C, ...unknown[]]
}

export function isChainedQuery<P, C> (query: Query<P, C>): query is ChainedQuery<P, C> {
  return 'resolveChain' in query
}

export function chainQueries<P, T1> (query1: Query<P, T1>): ChainedQuery<P, T1>
export function chainQueries<P, T1, T2> (query1: Query<P, T1>, query2: Query<T1, T2>): ChainedQuery<P, T2>
export function chainQueries<P, T1, T2, T3> (query1: Query<P, T1>, query2: Query<T1, T2>, query3: Query<T2, T3>): ChainedQuery<P, T3>
export function chainQueries<P, T1, T2, T3, T4> (query1: Query<P, T1>, query2: Query<T1, T2>, query3: Query<T2, T3>, query4: Query<T3, T4>): ChainedQuery<P, T4>
export function chainQueries<P, T1, T2, T3, T4, T5> (query1: Query<P, T1>, query2: Query<T1, T2>, query3: Query<T2, T3>, query4: Query<T3, T4>, query5: Query<T3, T5>): ChainedQuery<P, T5>
export function chainQueries (...queries: Query<any, any>[]): ChainedQuery<any, any> {
  const resolve = (parent: any) => queries.reduce((lastParent, query) => query.resolve(lastParent), parent)
  const resolveChain = (parent: any, flatten: boolean) => {
    const chain: any[] = []
    let lastParent = parent
    for (const query of queries) {
      if (flatten && isChainedQuery(query)) {
        chain.push(...query.resolveChain(lastParent, flatten))
        lastParent = chain[chain.length]
      } else {
        lastParent = query.resolve(lastParent)
        chain.push(lastParent)
      }
    }
    return chain as [any, unknown[]]
  }
  return ({
    resolve,
    resolveChain,
    update: (parent, value) => {
      const chain = [parent, ...resolveChain(parent, false)]
      let lastValue = value
      for (let i = queries.length - 1; i >= 0; i--) {
        const query = queries[i]
        lastValue = query.update(chain[i], lastValue)
      }
      return lastValue
    }
  })
}

export interface BoundQuery<C> {
  resolve: () => C
  update: (value: C) => void
}

export interface BoundChainedQuery<C> extends BoundQuery<C> {
  resolveChain: (flatten: boolean) => [C, ...unknown[]]
}

export function bindQuery<P, C> (query: ChainedQuery<P, C>, getter: () => P, setter: (value: P) => void): BoundChainedQuery<C>
export function bindQuery<P, C> (query: Query<P, C>, getter: () => P, setter: (value: P) => void): BoundQuery<C>
export function bindQuery<P, C> (query: Query<P, C>, getter: () => P, setter: (value: P) => void): BoundQuery<C> | BoundChainedQuery<C> {
  const boundQuery = {
    resolve: () => query.resolve(getter()),
    update: (value: C) => setter(query.update(getter(), value))
  }

  if (isChainedQuery(query)) {
    return {
      ...boundQuery,
      resolveChain: flatten => query.resolveChain(getter(), flatten)
    }
  } else {
    return boundQuery
  }
}
