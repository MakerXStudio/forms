import { IonButton } from '@ionic/react';
import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type SubmitButtonProps = {
  className?: string;
  label?: React.ReactNode;
} & Parameters<typeof IonButton>[0];

export function SubmitButton({ className, label, ...rest }: SubmitButtonProps) {
  const { formState } = useFormContext();
  return (
    <IonButton
      type="submit"
      className={clsx(className)}
      disabled={formState?.isSubmitting}
      {...rest}
    >
      {label}
    </IonButton>
  );
}
