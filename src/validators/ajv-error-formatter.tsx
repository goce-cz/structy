import { ErrorFormatter } from '../components/system/AdapterErrorBoundary.tsx'
import { CustomMessageHandler } from './ajv-custom-error-message.tsx'
import { AjvValidationError } from './ajv-validator.ts'

export const ajvErrorFormatter =
  (
    fallbackFormatter: ErrorFormatter,
    customMessageHandler: CustomMessageHandler
  ): ErrorFormatter =>
  (error) => {
    if (error instanceof AjvValidationError) {
      return customMessageHandler(error.errors).map((message, index) => (
        <span key={index}>{message}</span>
      ))
    } else {
      return fallbackFormatter(error)
    }
  }
