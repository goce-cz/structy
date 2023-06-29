import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback, useMemo } from 'react'
import { useFocusedSetter } from '../focuses/use-focused-setter.ts'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { AdapterTuple } from './adapter-tuple.ts'

export type ParseFn<T> = (stringValue: string) => T
export type FormatFn<T> = (value: T) => string

export const useValueAdapter = <T>(
  boundOptic: BoundOptic<L.Lens<any, T>>,
  parseFn: ParseFn<T>,
  formatFn: FormatFn<T> = String
): AdapterTuple<HTMLInputElement | HTMLTextAreaElement, string, T> => {
  const value = useFocusedValue(boundOptic)
  const formattedValue = useMemo(() => formatFn(value), [value, formatFn])
  const setValue = useFocusedSetter(boundOptic)
  const handleChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => setValue(parseFn(event.target.value)), [setValue, parseFn])
  return [formattedValue, handleChange, value, setValue]
}
