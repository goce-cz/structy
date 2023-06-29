import { BoundOptic } from '../../rxjs/bind-optic.ts'
import * as L from 'monocle-ts/Lens'
import { FC } from 'react'
import { useElementValueAdapter } from '../../adapters/use-element-value-adapter.ts'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export interface FocusedTextFieldProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  valueLens: BoundOptic<L.Lens<any, string>>
}

export const FocusedTextField: FC<FocusedTextFieldProps> = ({
  valueLens,
  error,
  helperText,
  ...props
}) => {
  const { value, handleChange, isError, errorMessage } = useElementValueAdapter(
    valueLens,
    String
  )

  return (
    <TextField
      value={value}
      onChange={handleChange}
      error={isError || error}
      helperText={errorMessage ?? helperText}
      {...props}
    />
  )
}
