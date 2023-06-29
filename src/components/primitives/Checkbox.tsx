import { FC, ReactNode } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { useCheckedAdapter } from '../../adapters/use-checked-adapter.ts'

export const Checkbox: FC<{
  checkedLens: BoundOptic<L.Lens<any, boolean>>
  children: ReactNode
}> = ({ checkedLens, children }) => {
  const { value, handleChange, isError, errorMessage } =
    useCheckedAdapter(checkedLens)

  return (
    <label>
      <input type="checkbox" checked={value} onChange={handleChange} />
      {children}
      {isError && <div>{errorMessage}</div>}
    </label>
  )
}
