import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { useCaughtSetter } from './use-caught-setter.ts'
import { AdapterErrorState } from './use-error-state.ts'

export type ParseFn<T> = (stringValue: string) => T
export type FormatFn<T> = (value: T) => string

export type ElementWithValue = HTMLInputElement | HTMLTextAreaElement

export interface ElementValueAdapter<T = string> extends AdapterErrorState {
  value: string
  handleChange: ChangeEventHandler<ElementWithValue>
  rawValue: T
  setRawValue: Dispatch<SetStateAction<T>>
}

export const useElementValueAdapter = <T>(
  rawValueLens: BoundOptic<L.Lens<any, T>>,
  parseFn: ParseFn<T>,
  formatFn: FormatFn<T> = String
): ElementValueAdapter<T> => {
  const rawValue = useFocusedValue(rawValueLens)
  const value = useMemo(() => formatFn(rawValue), [rawValue, formatFn])
  const { setValue, errorState } = useCaughtSetter(rawValueLens)
  const handleChange = useCallback<ChangeEventHandler<ElementWithValue>>(
    (event) => setValue(parseFn(event.target.value)),
    [setValue, parseFn]
  )
  return { value, handleChange, rawValue, setRawValue: setValue, ...errorState }
}
