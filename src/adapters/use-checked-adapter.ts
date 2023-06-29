import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback } from 'react'
import { useFocusedSetter } from '../focuses/use-focused-setter.ts'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { AdapterTuple } from './adapter-tuple.ts'

export const useCheckedAdapter = (
  boundOptic: BoundOptic<L.Lens<any, boolean>>
): AdapterTuple<HTMLInputElement, boolean> => {
  const checked = useFocusedValue(boundOptic)
  const setChecked = useFocusedSetter(boundOptic)
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setChecked(event.target.checked),
    [setChecked]
  )
  return [checked, handleChange, checked, setChecked]
}
