import { useClosestAdapterErrorBoundary } from './components/system/AdapterErrorBoundary.tsx'
import { useSubscription } from '@spicy-hooks/observables'
import { useMemo } from 'react'
import { debounceTime } from 'rxjs'

export const useAutoHideErrors = (delay: number) => {
  const { errorState$, clearError } = useClosestAdapterErrorBoundary()
  const debouncedErrorState = useMemo(
    () => errorState$.pipe(debounceTime(delay)),
    [errorState$, delay]
  )
  useSubscription(
    debouncedErrorState,
    {
      next: ({ errorState }) => {
        if (errorState.isError) {
          clearError()
        }
      },
    },
    [clearError]
  )
}
