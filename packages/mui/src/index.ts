import { ValidatedFormFactory, z, zfd } from '@makerx/forms-core';
import {
  FormItem,
  FormItemProps as FormItemPropsBase,
} from './components/form-item/FormItem';
import { FormFieldHelper as FormFieldHelperBase } from './util/FormFieldHelper';

const ValidatedForm = ValidatedFormFactory(FormFieldHelperBase);

export type FormItemProps = FormItemPropsBase;

export {
  FormItem,
  ValidatedForm,
  FormFieldHelperBase,
  zfd,
  z,
  ValidatedFormFactory,
};
