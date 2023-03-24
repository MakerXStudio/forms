import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';

export type DateTimeConverters = {
  toISO: (v: Date) => string;
  fromISO: (v: string) => Date;
};

export type DateTimeFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> & DateTimeConverters;

export function DateTimeFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  fromISO,
  toISO,
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
            <div className="flex gap-4">
              <DateTimePicker
                onChange={(v) => v && onChange(toISO(v))}
                value={fromISO(value)}
                slotProps={{
                  textField: { inputProps: { 'aria-label': label } },
                }}
              />
            </div>
          );
        }}
      />
    </FormItem>
  );
}
