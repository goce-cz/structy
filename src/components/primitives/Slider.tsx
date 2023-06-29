import { Lens } from 'monocle-ts/Lens'
import { FC } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import { useValueAdapter } from '../../adapters/use-value-adapter.ts'

export interface SliderProps {
  valueLens: BoundOptic<Lens<any, number>>
}

export const Slider: FC<SliderProps> = ({ valueLens }) => {
  const { value, handleChange, isError, errorMessage } = useValueAdapter(
    valueLens,
    Number
  )

  return (
    <>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
      />
      {isError && <div>{errorMessage}</div>}
    </>
  )
}
