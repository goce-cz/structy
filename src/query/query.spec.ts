import { describe, expect, it } from 'vitest'
import { bindQuery, ChainedQuery, chainQueries, propertyQuery } from './query'

interface Leaf {
  value: number
}

interface Sub {
  leaf: Leaf
}

interface Root {
  sub: Sub
}

interface Data {
  root: Root
}

const data: Data = {
  root: {
    sub: {
      leaf: {
        value: 3
      }
    }
  }
}

describe('query', () => {
  it('works', () => {
    const query: ChainedQuery<Data, number> = chainQueries(
      propertyQuery('root'),
      propertyQuery('sub'),
      propertyQuery('leaf'),
      propertyQuery('value')
    )

    let val: Data = data

    const boundQuery = bindQuery(query, () => val, value => {val = value})
    expect(boundQuery.resolve()).toBe(3)

    console.log(query.resolveChain(data,true))
    console.log(JSON.stringify(query.update(data,4),null, 2))
    expect(query.update(data,4)).toMatchObject({
      root: {
        sub: {
          leaf: {
            value: 4
          }
        }
      }
    })

  })
})
