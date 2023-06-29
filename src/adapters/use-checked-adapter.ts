import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { ChangeEventHandler, useCallback } from 'react'
import { useFocusedSetter } from '../focuses/use-focused-setter.ts'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { LensInputAdapter } from './adapter-tuple.ts'
import { useErrorState } from './use-error-state.ts'

export const useCheckedAdapter = (
  checkedLens: BoundOptic<L.Lens<any, boolean>>
): LensInputAdapter<HTMLInputElement, boolean> => {
  const checked = useFocusedValue(checkedLens)
  const setChecked = useFocusedSetter(checkedLens)
  const { reportError, clearError, errorState } = useErrorState(
    checkedLens.store
  )
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      try {
        setChecked(event.target.checked)
        clearError()
      } catch (error) {
        reportError(error)
      }
    },
    [setChecked]
  )
  return {
    value: checked,
    handleChange,
    rawValue: checked,
    setRawValue: setChecked,
    ...errorState,
  }
}
