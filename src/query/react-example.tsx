import {Data, Topping, ToppingType} from './data'
import {useFocusedSetter, useFocusedValue} from './react'
import {FC, useMemo} from 'react'
import {pipe} from "fp-ts/function";
import * as L from "monocle-ts/Lens";
import * as O from "monocle-ts/Optional";
import {BehaviorSubject} from "rxjs";
import {BoundLens, BoundOptional} from "./rxjs";
import {bindOptional, focusBoundOptics} from "./monocle";

declare const data$: BehaviorSubject<Data>
const boundOptics = pipe(
    L.id<Data>(),
    L.prop('items'),
    L.index(0),
    O.prop('toppings'),
    O.findFirst((t: Topping) => t.id === '5002'),
    O.prop('type'),
    bindOptional(data$)
)

const ToppingTypeEdit: FC<{ toppingTypeLens: BoundLens<unknown, ToppingType> }> = ({toppingTypeLens}) => {
    const type = useFocusedValue(toppingTypeLens)
    const setType = useFocusedSetter(toppingTypeLens)

    return (
        <label>Topping type
            <select value={type} onChange={event => setType(event.target.value as ToppingType)}>
                <option value="None">None</option>
                <option value="Glazed">Glazed</option>
                <option value="Sugar">Sugar</option>
                <option value="Powdered Sugar">Powdered Sugar</option>
                <option value="Chocolate with Sprinkles">Chocolate with Sprinkles</option>
                <option value="Maple">Maple</option>
                <option value="Regular">Regular</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Blueberry">Blueberry</option>
                <option value="Devil's Food">Devil's Food</option>
            </select>
        </label>
    )
}

const toppingTypeLens = pipe(
    L.id<Topping>(),
    L.prop('type')
)

const ToppingEditor: FC<{ toppingLens: BoundLens<unknown, Topping> }> = ({toppingLens}) => {
    const {toppingTypeOptics} = useMemo(() => ({
            toppingTypeOptics: focusBoundOptics(toppingLens, toppingTypeLens)
        }),
        [toppingLens]
    )
    return (
        <div>
            <ToppingTypeEdit toppingTypeLens={toppingTypeOptics}/>
        </div>
    )
}

const ToppingAdministration: FC<{ toppingsLens: BoundLens<unknown, Topping[]> }> = ({
                                                                                        toppingsLens
                                                                                    }) => {
    return (
        <Handl
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
