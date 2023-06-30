import { ValidateFunction } from 'ajv'
import { Validator } from './validator-lens.ts'
import { ErrorObject } from 'ajv/lib/types'

export class AjvValidationError extends Error {
  constructor(public readonly errors: ErrorObject[]) {
    super(`validation failed: ${errors.map((e) => e.message).join(', ')}`)
  }
}

export const ajvValidator =
  <T>(compiledSchema: ValidateFunction<T>): Validator<T> =>
  (value) => {
    if (!compiledSchema(value)) {
      throw new AjvValidationError(compiledSchema.errors ?? [])
    }
  }
