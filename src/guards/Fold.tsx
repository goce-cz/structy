import { ReactNode, useMemo } from 'react'
import { BoundOptic } from '../rxjs/bind-optic.ts'
import * as O from 'monocle-ts/Optional'
import * as L from 'monocle-ts/Lens'
import { isNone } from 'fp-ts/lib/Option'
import { useIsSome } from '../focuses/use-is-some.ts'
import { pipeBoundOptic } from '../rxjs/pipe-bound-optic.ts'

interface FoldProps<S, T> {
  optionalOptic: BoundOptic<O.Optional<S, T>>
  children: (lens: BoundOptic<L.Lens<S, T>>) => ReactNode
  fallback?: ReactNode
}

const optionalToLens =
  <S, T>() =>
  (sa: O.Optional<S, T>) =>
    L.lens<S, T>(
      (s: S) => {
        const option = sa.getOption(s)
        if (isNone(option)) {
          throw new Error(
            `to convert an optional to a lens, the optional must be defined at the focus`
          )
        }
        return option.value
      },
      (t: T) => (s: S) => sa.set(t)(s)
    )

export const Fold = <S, T>({
  optionalOptic,
  children,
  fallback,
}: FoldProps<S, T>) => {
  const some = useIsSome(optionalOptic)
  const lens = useMemo(
    () => pipeBoundOptic(optionalOptic, optionalToLens()),
    [optionalOptic]
  )

  if (some) {
    return children(lens)
  } else {
    return fallback ?? null
  }
}
