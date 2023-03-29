import type { Components } from '@ionic/core/dist/types/components';
import { IonInput } from '@ionic/react';
import { useFieldMetaData } from '@makerx/forms-core';
import { Controller, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';

export type TextFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> & Partial<Components.IonInput>;

export function TextFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  ...inputProps
}: TextFormItemProps<TSchema>) {
  const { control } = useFormContext();
  const { required } = useFieldMetaData(field);
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
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <IonInput
            {...inputProps}
            required={required}
            onIonChange={onChange}
            onIonBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
          />
        )}
      />
    </FormItem>
  );
}
