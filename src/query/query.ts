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

export function arrayPredicateQuery <T, S extends T> (predicate: (value: T, index: number, obj: T[]) => value is S): Query<T[], S>
export function arrayPredicateQuery <T> (predicate: (value: T, index: number, obj: T[]) => boolean): Query<T[], T>
export function arrayPredicateQuery (predicate: (value: unknown, index: number, obj: unknown[]) => boolean): Query<unknown[], unknown> {
  return {
    resolve: (parent) => parent.find(predicate),
    update: (parent, value) => parent.map((element, index) => predicate(element, index, parent) ? value : element)
  }
}

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
export function chainQueries<P, T1, T2, T3, T4, T5> (query1: Query<P, T1>, query2: Query<T1, T2>, query3: Query<T2, T3>, query4: Query<T3, T4>, query5: Query<T4, T5>): ChainedQuery<P, T5>
export function chainQueries<P, T1, T2, T3, T4, T5, T6> (query1: Query<P, T1>, query2: Query<T1, T2>, query3: Query<T2, T3>, query4: Query<T3, T4>, query5: Query<T4, T5>, query6: Query<T5, T6>): ChainedQuery<P, T6>
export function chainQueries<P,C> (...queries: Query<unknown, unknown>[]): ChainedQuery<P, C>
export function chainQueries (...queries: Query<unknown, unknown>[]): ChainedQuery<unknown, unknown> {
  const resolve = (parent: unknown) => queries.reduce((lastParent, query) => query.resolve(lastParent), parent)
  const resolveChain = (parent: unknown, flatten: boolean) => {
    const chain: unknown[] = []
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
    return chain as [unknown,...unknown[]]
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
  const boundQuery: BoundQuery<C> = {
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

export interface MaterializeQuery<C> {
  value: C
  update: (value: C) => void
}

export function materializeQuery<P, C> (query: Query<P, C>, parentValue: P, setter: (value: P) => void): MaterializeQuery<C> {
  return {
    value: query.resolve(parentValue),
    update: (value: C) => setter(query.update(parentValue, value))
  }
}
