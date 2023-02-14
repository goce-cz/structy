import { describe, expect, it } from 'vitest'
import {
  arrayPredicateQuery,
  arrayIndexQuery,
  bindQuery,
  ChainedQuery,
  chainQueries,
  propertyQuery,
  Query, materializeQuery
} from './query'
import { data, Data } from './data'

describe('query', () => {
  it('works', () => {
    const query: ChainedQuery<Data, string> = chainQueries(
      propertyQuery('items'),
      arrayIndexQuery(0),
      propertyQuery('toppings'),
      arrayPredicateQuery(topping => topping.id === '5003'),
      propertyQuery('type')
    )

    expect(query.resolve(data)).toBe('Chocolate')
  })
})
