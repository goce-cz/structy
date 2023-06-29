import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'

export interface AdapterErrorState {
  isError: boolean
  errorMessage?: string
  error?: Error
}

export interface LensInputAdapter<E extends Element, F = string, R = F>
  extends AdapterErrorState {
  value: F
  handleChange: ChangeEventHandler<E>
  rawValue: R
  setRawValue: Dispatch<SetStateAction<R>>
}
