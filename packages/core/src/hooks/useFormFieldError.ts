import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form/dist/types/errors'

export const useFormFieldError = (field: string): FieldError | undefined => {
  const {
    formState: { errors },
  } = useFormContext()
  return field.split('.').reduce((acc: any, cur) => acc?.[cur], errors)
}
