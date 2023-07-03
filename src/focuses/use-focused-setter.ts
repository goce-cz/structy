import { BoundOptic } from '../rxjs/bind-optic.ts'
import { Dispatch, SetStateAction, useCallback } from 'react'
import * as L from 'monocle-ts/Lens'
import { isFunction } from '@spicy-hooks/utils'

export const useFocusedSetter = <S, T>(
  boundOptic: BoundOptic<L.Lens<S, T>>
): Dispatch<SetStateAction<T>> => {
  return useCallback<Dispatch<SetStateAction<T>>>(
    (setStateAction) => {
      const { optic, store } = boundOptic
      const originalSource = store.getValue()
      let modifiedTarget: T
      if (isFunction(setStateAction)) {
        const originalSource = store.getValue()
        const originalTarget = optic.get(originalSource)
        modifiedTarget = setStateAction(originalTarget)
      } else {
        modifiedTarget = setStateAction
      }
      const modifiedSource = optic.set(modifiedTarget)(originalSource)
      store.next(modifiedSource)
    },
    [boundOptic]
  )
}
