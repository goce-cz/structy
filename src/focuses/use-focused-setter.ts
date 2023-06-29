import { BoundOptic } from '../rxjs/bind-optic.ts'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { isNone } from 'fp-ts/Option'
import { isFunction } from '@spicy-hooks/utils'
import { isOptional, Optic } from '../monocle/optic.ts'

export const useFocusedSetter = <S, T>(
  boundOptic: BoundOptic<Optic<S, T>>
): Dispatch<SetStateAction<T>> => {
  return useCallback<Dispatch<SetStateAction<T>>>(
    (setStateAction) => {
      const { optic, store } = boundOptic
      const originalSource = store.getValue()
      let modifiedTarget: T
      if (isFunction(setStateAction)) {
        const originalSource = store.getValue()
        let originalTarget: T
        if (isOptional(optic)) {
          const option = optic.getOption(originalSource)
          if (isNone(option)) {
            throw new Error('not initialized') // TODO Handle differently?
          }
          originalTarget = option.value
        } else {
          originalTarget = optic.get(originalSource)
        }
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
