import * as L from 'monocle-ts/Lens'

export interface ValidationViolation {
  message: string
}

export class ValidationError extends Error {
  constructor(public readonly violations: ValidationViolation[]) {
    super(
      `Validation error:\n\t${violations
        .map(({ message }) => message)
        .join('\n\t')}`
    )
  }
}

export type Validator<T> = (value: T) => ValidationViolation[] | undefined

export const validatorLens = <T>(validator: Validator<T>) =>
  L.compose<T, T>(
    L.lens(
      (value) => value,
      (value) => () => {
        const violations = validator(value)
        if (violations?.length) {
          throw new ValidationError(violations)
        }
        return value
      }
    )
  )
