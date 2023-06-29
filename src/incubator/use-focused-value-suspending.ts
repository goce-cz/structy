import { useState } from 'react'
import { isNone, isSome, Option, some } from 'fp-ts/Option'
import { isOptional, Optic } from '../monocle/optic.ts'
import { BoundOptic } from '../rxjs/bind-optic.ts'
import { useSubscription } from '@spicy-hooks/observables'

const getOption = <S, T>(source: S, optic: Optic<S, T>) =>
  isOptional(optic) ? optic.getOption(source) : some(optic.get(source))

export const getValueOrSuspend = <S, T>({
  optic,
  store,
}: BoundOptic<Optic<S, T>>): T => {
  const initialOption = getOption(store.getValue(), optic)
  if (isNone(initialOption)) {
    throw new Promise((resolve) => {
      const subscription = store.subscribe({
        next: (source) => {
          const newOption = getOption(source, optic)
          if (isSome(newOption)) {
            subscription.unsubscribe()
            resolve(newOption.value)
          }
        },
      })
    })
  }

  return initialOption.value
}

export const useFocusedValueSuspending = <S, T>({
  optic,
  store,
}: BoundOptic<Optic<S, T>>): T => {
  const [option, setOption] = useState<Option<T>>(() =>
    getOption(store.getValue(), optic)
  )

  if (isNone(option)) {
    throw new Promise((resolve) => {
      const subscription = store.subscribe({
        next: (source) => {
          const newOption = getOption(source, optic)
          if (isSome(newOption)) {
            subscription.unsubscribe()
            resolve(undefined)
          }
        },
      })
    })
  }

  useSubscription(
    store,
    {
      next: (value) => setOption(getOption(value, optic)),
    },
    [optic]
  )

  return option.value
}
