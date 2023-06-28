import {Lens} from 'monocle-ts/Lens'
import {BoundOptic} from './bound-optic'
import { useSubscription } from './mocks/use-subscription'
import {useDependantState} from "@spicy-hooks/core";

export const useFocusedValue = <S,T>({optic, store}: BoundOptic<Lens<S,T>>): T => {
  const [snapshot, setSnapshot] = useDependantState<T>(() => optic.get(store.getValue()),[optic, store])

  useSubscription(store, {
    next: value => setSnapshot(optic.get(value))
  },[optic])

  return snapshot
}