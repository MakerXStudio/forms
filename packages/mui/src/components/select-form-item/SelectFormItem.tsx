import { MenuItem, Select, SelectProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';
import { useFormFieldError } from '@makerx/forms-core';

export interface SelectFormItemOption {
  value: string;
  label: string;
}

export type SelectFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> &
  Partial<SelectProps> & {
    options: SelectFormItemOption[];
  };

export function SelectFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  longHint,
  options,
  ...inputProps
}: SelectFormItemProps<TSchema>) {
  const { control } = useFormContext();
  const error = useFormFieldError(field);
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
          <Select
            fullWidth
            {...inputProps}
            error={!!error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
            inputProps={{ 'aria-label': label }}
          >
            {options.map((o) => (
              <MenuItem value={o.value} key={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormItem>
  );
}
