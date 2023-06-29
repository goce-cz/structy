import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { FC } from 'react'
import { useValueAdapter } from '../../adapters/use-value-adapter.ts'

export const TextInput: FC<{
  valueLens: BoundOptic<L.Lens<any, string>>
}> = ({ valueLens }) => {
  const { value, handleChange, isError, errorMessage } = useValueAdapter(
    valueLens,
    String
  )

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      {isError && <div>{errorMessage}</div>}
    </>
  )
}
