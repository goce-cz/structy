import { AdapterErrorState } from './adapter-tuple.ts'
import { useCallback, useRef, useState } from 'react'
import { Observable } from 'rxjs'
import { useSubscription } from '@spicy-hooks/observables'
import { useClosestAdapterErrorBoundary } from '../components/system/AdapterErrorBoundary.tsx'

export interface AdapterErrorStateController {
  errorState: AdapterErrorState
  reportError: (error: any) => void
  clearError: () => void
}

const NO_ERROR: AdapterErrorState = { isError: false }

export const useErrorState = (
  resetSignal$: Observable<unknown>
): AdapterErrorStateController => {
  const boundary = useClosestAdapterErrorBoundary()

  const resetIdentityRef = useRef({})
  const [errorState, setErrorState] = useState<AdapterErrorState>(NO_ERROR)
  const reportError = useCallback(
    (error: any) => {
      const e = error instanceof Error ? error : new Error(String(error))
      const newErrorState: AdapterErrorState = {
        isError: true,
        error: e,
        errorMessage: boundary.formatError(error),
      }
      boundary.errorState$.next({
        identity: resetIdentityRef.current,
        errorState: newErrorState,
      })
      setErrorState(newErrorState)
    },
    [setErrorState, boundary]
  )

  const clearError = useCallback(() => {
    boundary.errorState$.next({
      identity: resetIdentityRef.current,
      errorState: NO_ERROR,
    })
    setErrorState(NO_ERROR)
  }, [setErrorState])

  useSubscription(
    resetSignal$,
    {
      next: clearError,
    },
    [clearError]
  )

  useSubscription(
    boundary.errorState$,
    {
      next: ({ identity }) => {
        if (identity !== resetIdentityRef.current) {
          setErrorState(NO_ERROR)
        }
      },
    },
    [setErrorState]
  )

  return {
    errorState,
    reportError,
    clearError,
  }
}
