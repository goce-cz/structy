import * as L from 'monocle-ts/Lens'

export type Validator<T> = (value: T) => void

export const validatorLens = <T>(validator: Validator<T>) =>
  L.compose<T, T>(
    L.lens(
      (value) => value,
      (value) => () => {
        validator(value)
        return value
      }
    )
  )
