import {
  arrayIndexQuery,
  arrayMatchQuery,
  ChainedQuery,
  chainQueries,
  propertyQuery,
  Query
} from './query'

type ResolvedPropertySegment<P, K> = K extends keyof P ? P[K] : never
type ResolvedArraySegment<P, T> = P extends unknown[]
  ? (
    T extends `${infer K}=${infer V}`
      ? ResolvedArrayMatchSegment<P, K, V>
      : ResolvedArrayIndexSegment<P, T>
    )
  : never

type IfAssignable<R, L, T> = R extends L ? T : never

type ResolvedArrayIndexSegment<P extends unknown[], I> = P extends unknown[] ? P[number] : never
type ResolvedArrayMatchSegment<P extends unknown[], K, V> = K extends keyof P[number]
  ? V extends `"${string}"`
    ? IfAssignable<string, P[number][K], P[number]>
    : V extends `${number}`
      ? IfAssignable<number, P[number][K], P[number]>
      : never
  : never

type ResolvedSegment<P, T> = T extends `[${infer A}]`
  ? ResolvedArraySegment<P, A>
  : ResolvedPropertySegment<P, T>

type ResolvedSegments<P, T> = T extends `${infer A}.${infer B}`
  ? ResolvedSegments<ResolvedSegments<P, A>, B>
  : ResolvedSegment<P, T>

const arrayMatchPattern = /^\[([^=\]]+)=("([^"]+)"|([0-9.]+))]$/
const arrayIndexPattern = /^\[([0-9]+)]$/

export function parseQuery<P, S extends string> (text: S): ChainedQuery<P, ResolvedSegments<P, S>> {
  const segments = text.split('.')
  const queries = segments.map<Query<any, any>>(segment => {
    if (segment.startsWith('[')) {
      const [, index] = arrayIndexPattern.exec(segment) ?? []
      if (index !== undefined) {
        return arrayIndexQuery(Number(index))
      }
      const [, key, , stringValue, numericValue] = arrayMatchPattern.exec(segment) ?? []
      if (key !== undefined) {
        const value = stringValue ?? Number(numericValue)
        return arrayMatchQuery<any, string, any>(key, value)
      }
    } else if (segment.length > 0) {
      return propertyQuery<any, string>(segment)
    }
    throw new Error(`invalid query segment '${segment}'`)
  })
  return chainQueries(...queries)
}
