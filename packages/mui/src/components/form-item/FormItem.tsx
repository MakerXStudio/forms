import { useFieldMetaData } from '@makerx/forms-core';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { InputLabel, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form/dist/types/path';
import { ValidationErrorMessage } from '../validation-error-message/ValidationErrorMessage';

export interface FormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> {
  className?: string;
  children: ReactElement;
  label: string;
  hint?: string;
  longHint?: string;
  field: FieldPath<TSchema>;
  disabled?: boolean;
}

export function FormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  className,
  label,
  hint,
  children,
  field,
  longHint,
}: FormItemProps<TSchema>) {
  const { getFieldState } = useFormContext();
  const { required } = useFieldMetaData(field);
  const { error } = getFieldState(field);
  const errorMessage = error?.message;
  return (
    <div>
      <InputLabel className="text-black">
        {label}
        {!required && ' (optional)'}
        {longHint && (
          <Tooltip title={longHint}>
            <InfoOutlinedIcon
              sx={{ verticalAlign: 'bottom', marginLeft: 0.5 }}
            />
          </Tooltip>
        )}
      </InputLabel>
      {children &&
        cloneElement(children, { className: clsx(children.props.className) })}
      {hint && (
        <div>
          <Typography variant="caption" className="text-gray-600">
            {hint}
          </Typography>
        </div>
      )}
      {errorMessage && <ValidationErrorMessage message={errorMessage} />}
    </div>
  );
}
