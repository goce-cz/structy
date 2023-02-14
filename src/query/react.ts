import { Query } from './query'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Store, useSubscription } from '@spicy-hooks/observables'
import { useDependantState, useUpdatedRef } from '@spicy-hooks/core'
import { isFunction } from 'rxjs/internal/util/isFunction'

export function useResolvedQuery<P, C> (query: Query<P, C>, parent$: Store<P>): [value: C, setValue: Dispatch<SetStateAction<C>>] {
  const [snapshot, setSnapshot] = useDependantState(() => query.resolve(parent$.value), [query, parent$])
  const snapshotRef = useUpdatedRef(snapshot)

  useSubscription(parent$, {
    next: snapshot => setSnapshot(query.resolve(snapshot))
  }, [query])

  const setValue = useCallback<Dispatch<SetStateAction<C>>>(valueOrSetter => {
    const value = isFunction(valueOrSetter) ? valueOrSetter(snapshotRef.current) : valueOrSetter
    parent$.next(query.update(parent$.value, value))
  }, [])

  return [snapshot, setValue]
}
