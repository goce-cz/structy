import { FC } from 'react'
import { useClosestAdapterErrorBoundary } from '../system/AdapterErrorBoundary.tsx'
import { useSnapshot } from '@spicy-hooks/observables'
import { Alert } from '@mui/material'

export const ErrorToast: FC = () => {
  const { errorState$, clearError } = useClosestAdapterErrorBoundary()
  const [{ errorState }] = useSnapshot(errorState$)

  if (!errorState.isError) {
    return null
  }

  return (
    <Alert severity="error" onClose={clearError}>
      {errorState.errorMessage}
    </Alert>
  )
}
