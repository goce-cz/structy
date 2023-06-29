import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'

export type AdapterTuple<E extends Element, F = string, R = F> = readonly [
  formattedValue: F,
  handleChange: ChangeEventHandler<E>,
  rawValue: R,
  setRawValue: Dispatch<SetStateAction<R>>
]
