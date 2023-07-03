import { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { BehaviorSubject } from 'rxjs'
import { AdapterErrorState } from '../../adapters/use-error-state.ts'

export interface AdapterErrorStateWithOrigin {
  errorState: AdapterErrorState
  origin: {}
}

export type ErrorFormatter = (error: Error) => ReactNode

export const defaultErrorFormatter: ErrorFormatter = (error) => error.message

export interface AdapterErrorBoundaryContextValue {
  errorState$: BehaviorSubject<AdapterErrorStateWithOrigin>
  formatError: ErrorFormatter
  clearError: () => void
}

const NO_ERROR_STATE: AdapterErrorStateWithOrigin = {
  origin: {},
  errorState: { isError: false },
}

const createNewAdapterErrorBoundaryContextValue = (
  errorFormatter: ErrorFormatter
): AdapterErrorBoundaryContextValue => {
  const errorState$ = new BehaviorSubject<AdapterErrorStateWithOrigin>(
    NO_ERROR_STATE
  )
  return {
    errorState$,
    formatError: errorFormatter,
    clearError: () => errorState$.next(NO_ERROR_STATE),
  }
}

const AdapterErrorBoundaryContext =
  createContext<AdapterErrorBoundaryContextValue>(
    createNewAdapterErrorBoundaryContextValue(defaultErrorFormatter)
  )

export const AdapterErrorBoundary: FC<{
  children: ReactNode
  errorFormatter?: ErrorFormatter
}> = ({ children, errorFormatter = defaultErrorFormatter }) => {
  const boundaryContextValue = useMemo(
    () => createNewAdapterErrorBoundaryContextValue(errorFormatter),
    []
  )
  return (
    <AdapterErrorBoundaryContext.Provider value={boundaryContextValue}>
      {children}
    </AdapterErrorBoundaryContext.Provider>
  )
}

export const useClosestAdapterErrorBoundary = () =>
  useContext(AdapterErrorBoundaryContext)
