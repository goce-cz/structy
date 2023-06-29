import { FC } from 'react'
import { useClosestAdapterErrorBoundary } from '../system/AdapterErrorBoundary.tsx'
import { useSnapshot } from '@spicy-hooks/observables'

export const ErrorToast: FC = () => {
  const { errorState$, clearError } = useClosestAdapterErrorBoundary()
  const [{ errorState }] = useSnapshot(errorState$)

  if (!errorState.isError) {
    return null
  }

  return (
    <div>
      <span>{errorState.errorMessage}</span>
      <button onClick={clearError}>X</button>
    </div>
  )
}
