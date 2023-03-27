import { ValidatedForm } from '@makerx/forms-mui';
import { Container, Grid } from '@mui/material';
import { formatISO, parseISO } from 'date-fns';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const formSchema = zfd.formData({
  myString: zfd.text(z.string().trim().min(1, 'Required')),
  myArray: zfd.repeatable(
    z
      .array(zfd.text(z.string().trim().min(1, 'Required')))
      .min(2, 'Must have at least 2 values')
  ),
  myDateTime: z.date({ invalid_type_error: 'Required' }),
});

type FormType = z.infer<typeof formSchema>;

const defaultValues: FormType = {
  myString: '',
  myArray: ['one value'],
  // TODO: fix this type error
  myDateTime: null as unknown as Date,
};

function App() {
  const onSubmit = (data: FormType) => console.log('Received data:', data);

  return (
    <ValidatedForm
      validator={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      {(helper) => (
        <Container maxWidth="xs">
          <Grid sx={{ padding: 2 }} container spacing={2}>
            <Grid item xs={12}>
              {helper.textField({
                label: 'This is required',
                field: 'myString',
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.textFields({
                label: 'Should be two or more',
                field: 'myArray',
                minimumItemCount: 2,
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.dateTimeField({
                label: 'Date',
                field: 'myDateTime',
                fromISO: parseISO,
                toISO: formatISO,
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.submitButton({ label: 'Submit' })}
            </Grid>
          </Grid>
        </Container>
      )}
    </ValidatedForm>
  );
}

export default App;