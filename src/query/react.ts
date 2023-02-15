import { Query } from './query'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useSubscription } from '@spicy-hooks/observables'
import { useDependantState, useUpdatedRef } from '@spicy-hooks/core'
import { isFunction } from '@spicy-hooks/utils'
import { BehaviorSubject } from 'rxjs'

export function useQueryState<P, C> (query: Query<P, C>, parent$: BehaviorSubject<P>): [value: C, setValue: Dispatch<SetStateAction<C>>] {
  const [snapshot, setSnapshot] = useDependantState(() => query.resolve(parent$.getValue()), [query, parent$])
  const snapshotRef = useUpdatedRef(snapshot)

  useSubscription(parent$, {
    next: snapshot => setSnapshot(query.resolve(snapshot))
  }, [query])

  const setValue = useCallback<Dispatch<SetStateAction<C>>>(valueOrSetter => {
    const value = isFunction(valueOrSetter) ? valueOrSetter(snapshotRef.current) : valueOrSetter
    parent$.next(query.update(parent$.getValue(), value))
  }, [])

  return [snapshot, setValue]
}
