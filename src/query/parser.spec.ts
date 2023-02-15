import { describe, expect, it } from 'vitest'
import { ChainedQuery } from './query'
import { data, Data, Item } from './data'
import { parseQuery } from './parser'

describe('parser', () => {
  it('parses index access', () => {
    const query: ChainedQuery<Data, Item> = parseQuery('items.[0]')
    expect(query.resolve(data)).toBe(data.items[0])
  })
  it('parses numeric predicates', () => {
    const query: ChainedQuery<Data, Item> = parseQuery('items.[id=1]')
    expect(query.resolve(data)).toBe(data.items[0])
  })
  it('parses decimal predicates', () => {
    // @ts-expect-error Unfortunately the parser chokes on decimal numbers (both the type inference and runtime)
    const query: ChainedQuery<Data, Item> = parseQuery('items.[ppu=0.55]')
    expect(query.resolve(data)).toBe(data.items[0])
  })
  it('parses string predicates with periods', () => {
    // @ts-expect-error Unfortunately the parser chokes on periods in string predicates (both the type inference and runtime)
    const query: ChainedQuery<Data, Item> = parseQuery('items.[type="main.sub"]')
    expect(query.resolve(data)).toBe(data.items[0])
  })
  it('parses complex queries', () => {
    const query: ChainedQuery<Data, string> = parseQuery('items.[0].toppings.[id="5003"].type')

    expect(query.resolve(data)).toBe('Chocolate')
    expect(query.toString()).toBe('items.[0].toppings.[id="5003"].type')
  })

  it('is type safe', () => {
    // @ts-expect-error
    const query1: ChainedQuery<Data, string> = parseQuery('items.[0].toppings.[Xid="5003"].type')
    // @ts-expect-error
    const query2: ChainedQuery<Data, string> = parseQuery('items.[0].toppings.[id="5003"].Xtype')
    // @ts-expect-error
    const query3: ChainedQuery<Data, string> = parseQuery('items.[0].toppings.[id=5003].type')
  })
})
