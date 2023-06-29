import { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { AdapterErrorState } from '../../adapters/adapter-tuple.ts'
import { BehaviorSubject } from 'rxjs'

export interface IdentifiableAdapterErrorState {
  errorState: AdapterErrorState
  identity: {}
}

export type ErrorFormatter = (error: Error) => string

export const defaultErrorFormatter: ErrorFormatter = (error) => error.message

export interface AdapterErrorBoundaryContextValue {
  errorState$: BehaviorSubject<IdentifiableAdapterErrorState>
  formatError: ErrorFormatter
  clearError: () => void
}

const NO_ERROR_STATE: IdentifiableAdapterErrorState = {
  identity: {},
  errorState: { isError: false },
}

const createNewAdapterErrorBoundaryContextValue = (
  errorFormatter: ErrorFormatter
): AdapterErrorBoundaryContextValue => {
  const errorState$ = new BehaviorSubject<IdentifiableAdapterErrorState>(
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
