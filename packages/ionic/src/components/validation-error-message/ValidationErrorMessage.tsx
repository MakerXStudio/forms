import { IonNote } from '@ionic/react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface ValidationErrorMessageProps {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const ValidationErrorMessage = ({
  message,
}: ValidationErrorMessageProps) => (
  <IonNote slot="error">{message?.toString()}</IonNote>
);
