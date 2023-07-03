import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import { useFocusedValue } from '../focuses/use-focused-value.ts'
import { useCaughtSetter } from './use-caught-setter.ts'
import { AdapterErrorState } from './use-error-state.ts'

export interface ElementValueAdapter extends AdapterErrorState {
  value: boolean
  handleChange: ChangeEventHandler<HTMLInputElement>
  setValue: Dispatch<SetStateAction<boolean>>
}

export const useElementCheckedAdapter = (
  checkedLens: BoundOptic<L.Lens<any, boolean>>
): ElementValueAdapter => {
  const checked = useFocusedValue(checkedLens)
  const { setValue, errorState } = useCaughtSetter(checkedLens)

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setValue(event.target.checked),
    [setValue]
  )
  return {
    value: checked,
    handleChange,
    setValue,
    ...errorState,
  }
}
