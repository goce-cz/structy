import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback, useMemo } from 'react'
import { useFocusedSetter } from '../focuses/use-focused-setter.ts'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { LensInputAdapter } from './adapter-tuple.ts'
import { useErrorState } from './use-error-state.ts'

export type ParseFn<T> = (stringValue: string) => T
export type FormatFn<T> = (value: T) => string

export const useValueAdapter = <T>(
  rawValueLens: BoundOptic<L.Lens<any, T>>,
  parseFn: ParseFn<T>,
  formatFn: FormatFn<T> = String
): LensInputAdapter<HTMLInputElement | HTMLTextAreaElement, string, T> => {
  const rawValue = useFocusedValue(rawValueLens)
  const value = useMemo(() => formatFn(rawValue), [rawValue, formatFn])
  const setRawValue = useFocusedSetter(rawValueLens)
  const { errorState, reportError, clearError } = useErrorState(
    rawValueLens.store
  )
  const handleChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(
    (event) => {
      try {
        setRawValue(parseFn(event.target.value))
        clearError()
      } catch (error) {
        reportError(error)
      }
    },
    [setRawValue, parseFn]
  )
  return { value, handleChange, rawValue, setRawValue, ...errorState }
}
