import { describe, expect, it } from 'vitest'
import { ChainedQuery } from './query'
import { data, Data } from './data'
import { parseQuery } from './parser'

describe('parser', () => {
  it('works', () => {
    const query: ChainedQuery<Data, string> = parseQuery('items.[0].toppings.[id="5003"].type')

    expect(query.resolve(data)).toBe('Chocolate')
    expect(query.toString()).toBe('items.[0].toppings.[id="5003"].type')
  })
})
