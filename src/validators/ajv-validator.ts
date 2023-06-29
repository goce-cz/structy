import { ValidateFunction } from 'ajv'
import { Validator } from './validator-lens.ts'

export const ajvValidator =
  <T>(compiledSchema: ValidateFunction<T>): Validator<T> =>
  (value) => {
    if (!compiledSchema(value)) {
      return compiledSchema.errors?.map(({ message, ...rest }) => ({
        ...rest,
        message: message ?? 'error',
      }))
    }
  }
