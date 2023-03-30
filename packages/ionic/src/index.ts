import { useFieldMetaData, ValidatedFormFactory, z, zfd } from '@makerx/forms-core';
import type { FormItemProps } from './components/form-item/FormItem';
import { SubmitButton } from './components/submit-button/SubmitButton';
import { ValidationErrorMessage } from './components/validation-error-message/ValidationErrorMessage';
import { FormFieldHelper as FormFieldHelperBase } from './util/FormFieldHelper';

const ValidatedForm = ValidatedFormFactory(FormFieldHelperBase);

export { ValidatedForm, FormFieldHelperBase, zfd, z, ValidatedFormFactory, useFieldMetaData, ValidationErrorMessage, SubmitButton };
export type { FormItemProps };

