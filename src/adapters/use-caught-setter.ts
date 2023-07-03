import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { useFocusedSetter } from '../focuses/use-focused-setter.ts'
import {
  AdapterErrorStateController,
  useErrorState,
} from './use-error-state.ts'
import { Dispatch, SetStateAction, useCallback } from 'react'

interface AdapterErrorStateControllerWithSetter<T>
  extends AdapterErrorStateController {
  setValue: Dispatch<SetStateAction<T>>
}

export const useCaughtSetter = <T>(
  valueLens: BoundOptic<L.Lens<any, T>>
): AdapterErrorStateControllerWithSetter<T> => {
  const setValueRaw = useFocusedSetter(valueLens)
  const errorStateController = useErrorState(valueLens.store)
  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      try {
        setValueRaw(value)
        errorStateController.clearError()
      } catch (error) {
        errorStateController.reportError(error)
      }
    },
    [
      setValueRaw,
      errorStateController.reportError,
      errorStateController.clearError,
    ]
  )
  return {
    ...errorStateController,
    setValue,
  }
}
