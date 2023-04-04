import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { FormItemProps } from '../form-item/FormItem';
import { FormItem } from '../form-item/FormItem';
import { ValidationErrorMessage } from '../validation-error-message/ValidationErrorMessage';

export type TextArrayFormItemProps<
  TSchema extends Record<string, any> = Record<string, any>
> = Omit<FormItemProps<TSchema>, 'children'> & {
  minimumItemCount: number;
};

export function TextArrayFormItem<
  TSchema extends Record<string, any> = Record<string, any>
>({
  field,
  disabled,
  label,
  className,
  hint,
  longHint,
  minimumItemCount,
}: TextArrayFormItemProps<TSchema>) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: field,
    rules: {
      required: true,
    },
  });

  const addOption = () => {
    // @ts-expect-error typescript doesn't like this but it works
    append(' ');
  };

  return (
    <FormItem
      field={field}
      label={label}
      hint={hint}
      longHint={longHint}
      disabled={disabled}
      className={className}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map(({ id }, ix) => (
          <Controller
            key={id}
            name={`${field}.${ix}`}
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
              const {
                formState: { errors },
              } = useFormContext();
              const errorMessage = errors[field]
                ? // @ts-expect-error typescript doesn't like this but it works
                  errors[field][ix]?.message
                : '';

              return (
                <div>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      fullWidth
                      error={!!errorMessage}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                    {fields.length > minimumItemCount && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => remove(ix)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  {errorMessage && (
                    <ValidationErrorMessage message={errorMessage} />
                  )}
                </div>
              );
            }}
          />
        ))}
        <div>
          <Button variant="contained" onClick={addOption}>
            Add another option
          </Button>
        </div>
      </Box>
    </FormItem>
  );
}
