import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';

export type TextFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> & Partial<TextFieldProps>;

export function TextFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  longHint,
  ...inputProps
}: TextFormItemProps<TSchema>) {
  const { control, getFieldState } = useFormContext();
  const error = getFieldState(field).error;
  return (
    <FormItem
      field={field}
      label={label}
      hint={hint}
      longHint={longHint}
      disabled={disabled}
      className={className}
    >
      <Controller
        name={field}
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <TextField
            fullWidth
            {...inputProps}
            error={!!error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
            inputProps={{ 'aria-label': label }}
          />
        )}
      />
    </FormItem>
  );
}
