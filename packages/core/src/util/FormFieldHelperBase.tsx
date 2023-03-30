import { UseFormReturn } from 'react-hook-form';

export class FormFieldHelperBase<TSchema extends Record<string, any>> {
  private readonly fieldPrefix: string;
  constructor(
    public formContext: UseFormReturn<TSchema>,
    { fieldPrefix }: { fieldPrefix?: string } = {}
  ) {
    this.fieldPrefix = fieldPrefix ? `${fieldPrefix}.` : '';
  }

  protected prefixFieldProp<T extends { field: string & keyof TSchema }>(
    props: T
  ) {
    return {
      ...props,
      field: `${this.fieldPrefix}${props.field}`,
    };
  }
}
