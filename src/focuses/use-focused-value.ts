import { Lens } from 'monocle-ts/Lens'
import { BoundOptic } from '../rxjs/bind-optic.ts'
import { useDependantState } from '@spicy-hooks/core'
import { useSubscription } from '@spicy-hooks/observables'

export const useFocusedValue = <S, T>({
  optic,
  store,
}: BoundOptic<Lens<S, T>>): T => {
  const [snapshot, setSnapshot] = useDependantState<T>(
    () => optic.get(store.getValue()),
    [optic, store]
  )

  useSubscription(
    store,
    {
      next: (value) => setSnapshot(optic.get(value)),
    },
    [optic]
  )

  return snapshot
}
