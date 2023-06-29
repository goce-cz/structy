import { filter, map, pipe } from 'rxjs'
import * as L from 'monocle-ts/Lens'
import * as O from 'monocle-ts/Optional'
import { isSome, Option, Some } from 'fp-ts/Option'

export const focusLens = <S, T>(lens: L.Lens<S, T>) =>
  map<S, T>((source) => lens.get(source))

export const focusOptional = <S, T>(optional: O.Optional<S, T>) =>
  map<S, Option<T>>((source) => optional.getOption(source))

export const someOnly = <T>() =>
  pipe(
    filter<Option<T>>((option) => isSome(option)),
    map((option) => (option as Some<T>).value)
  )
