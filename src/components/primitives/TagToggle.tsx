import { ReactNode, useMemo } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { elementIncluded } from '../../monocle/element-included.ts'
import { FocusedCheckbox } from './FocusedCheckbox.tsx'
import { pipeBoundOptic } from '../../rxjs/pipe-bound-optic.ts'

export interface TagToggleProps<T> {
  tag: T
  children: ReactNode
  listLens: BoundOptic<L.Lens<any, readonly T[]>>
}

export const TagToggle = <T,>({
  tag,
  listLens,
  children,
}: TagToggleProps<T>) => {
  const includedOptic = useMemo(
    () => pipeBoundOptic(listLens, elementIncluded(tag)),
    [listLens, tag]
  )

  return <FocusedCheckbox valueLens={includedOptic}>{children}</FocusedCheckbox>
}
