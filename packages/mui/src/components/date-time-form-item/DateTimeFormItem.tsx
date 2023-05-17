import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';

export type DateTimeConverters = {
  toISO: (v: Date) => string;
  fromISO: (v: string) => Date;
};

export type DateTimeFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> &
  DateTimePickerProps<Date> &
  DateTimeConverters;

export function DateTimeFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  longHint,
  fromISO,
  toISO,
  ...dateTimePickerProps
}: DateTimeFormItemProps<TSchema>) {
  const { control, getFieldState } = useFormContext();
  const error = Boolean(getFieldState(field)?.error);
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
        render={({ field: { onChange, value } }) => {
          return (
            <DateTimePicker
              {...dateTimePickerProps}
              onChange={(v) => v && onChange(toISO(v))}
              value={value ? fromISO(value) : null}
              slotProps={{
                textField: {
                  inputProps: { 'aria-label': label },
                  fullWidth: true,
                  error,
                },
              }}
            />
          );
        }}
      />
    </FormItem>
  );
}
