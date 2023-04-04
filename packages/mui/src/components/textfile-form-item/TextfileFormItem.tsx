import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form/dist/types/path';
import { FormItem } from '../form-item/FormItem';
import type { TextfileFieldProps } from './TextfileField';
import { TextfileField } from './TextfileField';

export interface TextfileFormItemProps<TSchema extends Record<string, unknown>>
  extends Omit<TextfileFieldProps, 'value' | 'onChange' | 'className'> {
  className?: string;
  label: string;
  field: FieldPath<TSchema>;
  hint?: string;
  longHint?: string;
}

export function TextfileFormItem<TSchema extends Record<string, unknown>>({
  className,
  label,
  field,
  hint,
  longHint,
  ...fieldProps
}: TextfileFormItemProps<TSchema>) {
  const { setValue, setError, clearErrors, getValues } =
    useFormContext<TSchema>();

  const onChange = useCallback(
    (value: string | Error) => {
      if (value instanceof Error) {
        setError(field, value);
      } else {
        clearErrors(field);
        setValue(field, value as any);
      }
    },
    [clearErrors, field, setError, setValue]
  );

  return (
    <FormItem label={label} field={field} hint={hint} longHint={longHint}>
      <TextfileField
        value={getValues(field) as string}
        onChange={onChange}
        {...fieldProps}
      />
    </FormItem>
  );
}
