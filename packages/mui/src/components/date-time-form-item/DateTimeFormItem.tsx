import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';

export type DateTimeFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> & DateTimePickerProps<Date>;

export function DateTimeFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  ...dateTimePickerProps
}: DateTimeFormItemProps<TSchema>) {
  const { control } = useFormContext();

  return (
    <FormItem
      field={field}
      label={label}
      hint={hint}
      disabled={disabled}
      className={className}
    >
      <Controller
        name={field}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DateTimePicker
              {...dateTimePickerProps}
              onChange={onChange}
              value={value}
              slotProps={{
                textField: {
                  inputProps: { 'aria-label': label },
                  fullWidth: true,
                },
              }}
            />
          );
        }}
      />
    </FormItem>
  );
}
