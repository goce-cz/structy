import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback } from 'react'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { LensInputAdapter } from './adapter.ts'
import { useErrorStateKeepingSetter } from './use-error-state-keeping-setter.ts'

export const useElementCheckedAdapter = (
  checkedLens: BoundOptic<L.Lens<any, boolean>>
): LensInputAdapter<HTMLInputElement, boolean> => {
  const checked = useFocusedValue(checkedLens)
  const { setValue, errorState } = useErrorStateKeepingSetter(checkedLens)

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setValue(event.target.checked),
    [setValue]
  )
  return {
    value: checked,
    handleChange,
    rawValue: checked,
    setRawValue: setValue,
    ...errorState,
  }
}
