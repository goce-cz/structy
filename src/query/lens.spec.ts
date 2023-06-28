import * as L from 'monocle-ts/Lens'
import * as O from 'monocle-ts/Optional'
import {pipe} from "fp-ts/function";
import {data, Data, Topping} from "./data";
import {describe, expect, it} from "vitest";
import {isSome} from "fp-ts/Option";

describe('Lens', () => {
    it('should get', () => {
        const typeOfToppingID5002OfFirstItem = pipe(
            L.id<Data>(),
            L.prop('items'),
            L.index(0),
            O.prop('toppings'),
            O.findFirst((t: Topping) => t.id === '5002'),
            O.prop('type')
        )

        const typeOption = typeOfToppingID5002OfFirstItem.getOption(data)
        expect(isSome(typeOption)).toBe(true)
        expect(isSome(typeOption) && typeOption.value).toBe('Glazed')

        const modifiedData = typeOfToppingID5002OfFirstItem.set('Sugar')(data)
        expect(modifiedData).toEqual({
            ...modifiedData,
            items: [{
                ...modifiedData.items[0],
                toppings: [
                    ...modifiedData.items[0].toppings.map(t => t.id === '5002' ? {...t, type: 'Sugar'} : t)
                ]
            }]
        })
    })
})

