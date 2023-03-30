import { zodResolver } from '@hookform/resolvers/zod';
import type { MutableRefObject } from 'react';
import React, { createContext, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type {
  DefaultValues,
  UseFormReturn,
  ValidationMode,
} from 'react-hook-form/dist/types/form';
import type { z } from 'zod';
import { FormFieldHelperBase } from '../util/FormFieldHelperBase';

type Validator =
  | z.ZodEffects<z.ZodObject<Record<string, z.ZodTypeAny>>, unknown, unknown>
  | undefined;
const ValidatorContext = createContext<Validator>(undefined);
const ValidatorContextProvider = ValidatorContext.Provider;
export const useFormValidator = () => useContext(ValidatorContext);

export interface ValidatedFormProps<
  TSchema extends Record<string, unknown>,
  K extends FormFieldHelperBase<TSchema>
> {
  className?: string;
  children: React.ReactNode | ((helper: K) => React.ReactNode);
  validator: z.ZodEffects<
    z.ZodObject<Record<keyof TSchema, z.ZodTypeAny>>,
    TSchema,
    unknown
  >;
  defaultValues?: DefaultValues<TSchema>;
  mode?: keyof ValidationMode | undefined;
  onSubmit?(values: TSchema): void | Promise<void>;
  formContextRef?: MutableRefObject<UseFormReturn<TSchema> | undefined>;
}

export const ValidatedFormFactory =
  <
    TSchema extends Record<string, unknown>,
    K extends FormFieldHelperBase<TSchema>
  >(
    formFieldHelperFactory: new (formContext: UseFormReturn<TSchema>) => K
  ) =>
  ({
    className,
    children,
    validator,
    defaultValues,
    mode = 'onBlur',
    onSubmit,
    formContextRef,
  }: ValidatedFormProps<TSchema, K>) => {
    const formContext = useForm<TSchema>({
      resolver: zodResolver(validator),
      defaultValues,
      mode,
    });
    if (formContextRef) formContextRef.current = formContext;

    return (
      <ValidatorContextProvider value={validator}>
        <FormProvider {...formContext}>
          <form
            className={className}
            onSubmit={onSubmit && formContext.handleSubmit(onSubmit)}
          >
            {typeof children === 'function'
              ? children(new formFieldHelperFactory(formContext))
              : children}
          </form>
        </FormProvider>
      </ValidatorContextProvider>
    );
  };
