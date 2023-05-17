import { IonItem, IonLabel, IonNote } from '@ionic/react';
import { useFieldMetaData } from '@makerx/forms-core';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form/dist/types/path';
import { ValidationErrorMessage } from '../validation-error-message/ValidationErrorMessage';

export interface FormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> {
  className?: string;
  children: ReactElement;
  label: string;
  hint?: string;
  field: FieldPath<TSchema>;
  disabled?: boolean;
}

export function FormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({ className, label, hint, children, field }: FormItemProps<TSchema>) {
  const {
    formState: { touchedFields },
    getFieldState,
  } = useFormContext();
  const { required } = useFieldMetaData(field);
  const error = getFieldState(field)?.error;
  return (
    <IonItem
      fill="solid"
      className={clsx(
        className,
        error ? 'ion-invalid' : 'ion-valid',
        touchedFields[field] && 'ion-touched'
      )}
    >
      <IonLabel position="stacked">
        {label}
        {!required && ' (optional)'}
      </IonLabel>
      {children &&
        cloneElement(children, { className: clsx(children.props.className) })}
      <IonNote slot="helper">{hint}</IonNote>
      {error && <ValidationErrorMessage message={error?.message} />}
    </IonItem>
  );
}
