import { Store } from '@spicy-hooks/observables'
import { Data } from './data'
import { arrayIndexQuery, arrayPredicateQuery, ChainedQuery, chainQueries, propertyQuery, Query } from './query'
import { useQueryState } from './react'
import { FC } from 'react'

declare const store: Store<Data>
const query: ChainedQuery<Data, string> = chainQueries(
  propertyQuery('items'),
  arrayIndexQuery(0),
  propertyQuery('toppings'),
  arrayPredicateQuery(topping => topping.id === '5003'),
  propertyQuery('type')
)

const TypeEdit: FC = () => {
  const [type, setType] = useQueryState(query, store)
  return (
    <input type="text" value={type} onChange={event => setType(event.target.value)}/>
  )
}
/*

const useItemQuery = createUseContext<Query<Data, Item>>({contextName: 'ItemQuery', nonNull: true})
const useToppingQuery = createUseContext<Query<Data, Item>>({contextName: 'ToppingQuery', nonNull: true})


const ItemElement: FC<> = ({data}) => {

}
const ItemList: FC<{data: Data}> = ({data}) => {
  return (
    <div>
      {data.items.map(item => (
        <useItemQuery.Provider value={arrayPredicateQuery<Data,Item>(it => it.id === item.id)}
      ))}
    </div>
  )
}

function TypeEdit2() {
  const [type, setType] = useQueryState(query, store)
  return (
    <input type="text" value={type} onChange={event => setType(event.target.value)}/>
  )
}
*/
