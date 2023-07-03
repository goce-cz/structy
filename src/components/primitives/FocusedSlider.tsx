import { Lens } from 'monocle-ts/Lens'
import { useCallback } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import { FormHelperText, Slider, SliderProps } from '@mui/material'
import { useCaughtSetter } from '../../adapters/use-caught-setter.ts'
import { useFocusedValue } from '../../focuses/use-focused-value.ts'

export interface FocusedSliderProps<T extends number | number[]>
  extends Omit<SliderProps, 'value' | 'onChange'> {
  valueLens: BoundOptic<Lens<any, T>>
  helperText?: string
  error?: boolean
}

export const FocusedSlider = <T extends number | number[]>({
  valueLens,
  error,
  helperText,
  ...props
}: FocusedSliderProps<T>) => {
  const value = useFocusedValue(valueLens)
  const {
    setValue,
    errorState: { errorMessage, isError },
  } = useCaughtSetter(valueLens)
  const handleChange = useCallback(
    (_: unknown, value: number | number[]) => {
      setValue(value as T)
    },
    [setValue]
  )

  const actualError = isError || error
  const actualHelperText = errorMessage ?? helperText
  return (
    <>
      <Slider value={value} onChange={handleChange} {...props} />
      {actualHelperText != null && (
        <FormHelperText error={actualError}>{actualHelperText}</FormHelperText>
      )}
    </>
  )
}
