import { Store } from '@spicy-hooks/observables'
import { Data } from './data'
import { arrayIndexQuery, arrayPredicateQuery, ChainedQuery, chainQueries, propertyQuery } from './query'
import { useResolvedQuery } from './react'

declare const store: Store<Data>
const query: ChainedQuery<Data, string> = chainQueries(
  propertyQuery('items'),
  arrayIndexQuery(0),
  propertyQuery('toppings'),
  arrayPredicateQuery(topping => topping.id === '5003'),
  propertyQuery('type')
)

function TypeEdit() {
  const [type, setType] = useResolvedQuery(query, store)
  return (
    <input type="text" value={type} onChange={event => setType(event.target.value)}/>
  )
}
