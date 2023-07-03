import * as L from 'monocle-ts/Lens'

export type Validator<T> = (newValue: T, originalValue: T) => void

export const validatorLens = <T>(validator: Validator<T>) =>
  L.compose<T, T>(
    L.lens(
      (value) => value,
      (newValue) => (originalValue) => {
        validator(newValue, originalValue)
        return newValue
      }
    )
  )
