import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback, useMemo } from 'react'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { LensInputAdapter } from './adapter.ts'
import { useErrorStateKeepingSetter } from './use-error-state-keeping-setter.ts'

export type ParseFn<T> = (stringValue: string) => T
export type FormatFn<T> = (value: T) => string

export const useElementValueAdapter = <T>(
  rawValueLens: BoundOptic<L.Lens<any, T>>,
  parseFn: ParseFn<T>,
  formatFn: FormatFn<T> = String
): LensInputAdapter<HTMLInputElement | HTMLTextAreaElement, string, T> => {
  const rawValue = useFocusedValue(rawValueLens)
  const value = useMemo(() => formatFn(rawValue), [rawValue, formatFn])
  const { setValue, errorState } = useErrorStateKeepingSetter(rawValueLens)
  const handleChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => setValue(parseFn(event.target.value)), [setValue, parseFn])
  return { value, handleChange, rawValue, setRawValue: setValue, ...errorState }
}
