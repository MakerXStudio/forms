import { FormFieldHelperBase } from '@makerx/forms-core';
import {
  DateTimeFormItem,
  DateTimeFormItemProps,
} from '../components/date-time-form-item/DateTimeFormItem';
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

  submitButton(props: SubmitButtonProps) {
    return <SubmitButton {...props} />;
  }
}
