import { FormFieldHelperBase } from '@makerx/forms-core';
import {
  ArrayFormItems,
  ArrayFormItemsProps,
} from '../components/array-form-items/ArrayFormItems';
import {
  DateTimeFormItem,
  DateTimeFormItemProps,
} from '../components/date-time-form-item/DateTimeFormItem';
import {
  SelectFormItem,
  SelectFormItemOption,
  SelectFormItemProps,
} from '../components/select-form-item/SelectFormItem';
import {
  SubmitButton,
  SubmitButtonProps,
} from '../components/submit-button/SubmitButton';
import {
  TextArrayFormItem,
  TextArrayFormItemProps,
} from '../components/text-array-form-item/TextArrayFormItem';
import type { TextFormItemProps } from '../components/text-form-item/TextFormItem';
import { TextFormItem } from '../components/text-form-item/TextFormItem';
import type { TextareaFormItemProps } from '../components/textarea-form-item/TextareaFormItem';
import { TextareaFormItem } from '../components/textarea-form-item/TextareaFormItem';
import {
  TextfileFormItem,
  TextfileFormItemProps,
} from '../components/textfile-form-item/TextfileFormItem';

export class FormFieldHelper<
  TSchema extends Record<string, any>
> extends FormFieldHelperBase<TSchema> {
  /**
   * A single text field
   */
  textField(props: TextFormItemProps<TSchema>) {
    return <TextFormItem {...this.prefixFieldProp(props)} />;
  }

  /**
   * An array of textfields, allowing add/remove
   */
  textFields(props: TextArrayFormItemProps<TSchema>) {
    return <TextArrayFormItem {...this.prefixFieldProp(props)} />;
  }

  textareaField(props: TextareaFormItemProps<TSchema>) {
    return <TextareaFormItem {...this.prefixFieldProp(props)} />;
  }

  dateTimeField(props: DateTimeFormItemProps<TSchema>) {
    return <DateTimeFormItem {...this.prefixFieldProp(props)} />;
  }

  textFileFormField(props: TextfileFormItemProps<TSchema>) {
    return <TextfileFormItem {...props} />;
  }

  selectField(props: SelectFormItemProps<TSchema>) {
    return <SelectFormItem {...this.prefixFieldProp(props)} />;
  }

  array(props: ArrayFormItemsProps<TSchema>) {
    return <ArrayFormItems {...this.prefixFieldProp(props)} />;
  }

  submitButton(props: SubmitButtonProps) {
    return <SubmitButton {...props} />;
  }

  optionsForEnum<O extends object>(
    enumeration: O,
    includeEmpty?: boolean | string
  ): SelectFormItemOption[] {
    return [
      ...(includeEmpty
        ? [
            {
              label: typeof includeEmpty === 'string' ? includeEmpty : ' ',
              value: '',
            },
          ]
        : []),
      ...Object.keys(enumeration)
        .filter((k) => Number.isNaN(+k))
        .map((k) => ({
          label: k,
          value: (enumeration[k as keyof O] as any).toString?.() ?? '',
        })),
    ];
  }

  optionsForStringList(
    list: readonly string[],
    includeEmpty?: boolean | string
  ): SelectFormItemOption[] {
    return [
      ...(includeEmpty
        ? [
            {
              label: typeof includeEmpty === 'string' ? includeEmpty : ' ',
              value: '',
            },
          ]
        : []),
      ...list.map((o) => ({
        label: o,
        value: o,
      })),
    ];
  }
}
