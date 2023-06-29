import { FC, ReactNode } from 'react'
import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { useElementCheckedAdapter } from '../../adapters/use-element-checked-adapter.ts'
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@mui/material'

export interface FocusedCheckboxProps
  extends Omit<CheckboxProps, 'value' | 'onChange'> {
  valueLens: BoundOptic<L.Lens<any, boolean>>
  helperText?: string
  error?: boolean
  children?: ReactNode
}

export const FocusedCheckbox: FC<FocusedCheckboxProps> = ({
  valueLens,
  error,
  helperText,
  children,
  ...props
}) => {
  const { value, handleChange, isError, errorMessage } =
    useElementCheckedAdapter(valueLens)

  const actualError = isError || error
  const actualHelperText = errorMessage ?? helperText
  const formTextHelper = actualHelperText != null && (
    <FormHelperText error={actualError}>{actualHelperText}</FormHelperText>
  )

  const checkbox = (
    <Checkbox checked={value} onChange={handleChange} {...props} />
  )

  if (children) {
    return (
      <>
        <FormControlLabel label={children} control={checkbox} />
        {formTextHelper}
      </>
    )
  } else {
    return (
      <>
        {checkbox}
        {formTextHelper}
      </>
    )
  }
}
