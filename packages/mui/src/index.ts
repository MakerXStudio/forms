import { ValidatedFormFactory } from '@makerx/forms-core';
import { FormFieldHelper } from './util/FormFieldHelper';

const ValidatedForm = ValidatedFormFactory(FormFieldHelper);

export { ValidatedForm, FormFieldHelper };
