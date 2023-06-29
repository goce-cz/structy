import { ReactNode, useMemo } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { elementIncluded } from '../../monocle/element-included.ts'
import { Checkbox } from './Checkbox.tsx'
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

  return <Checkbox checkedLens={includedOptic}>{children}</Checkbox>
}
