import { ValidatedForm, z, zfd } from '@makerx/forms-mui';
import FailIcon from '@mui/icons-material/Cancel';
import SuccessIcon from '@mui/icons-material/CheckCircle';
import { Container, Grid, Link, Stack, Typography } from '@mui/material';
import { formatISO, parseISO } from 'date-fns';

/**
 * Define schema
 */
export const formSchema = zfd.formData({
  myString: zfd.text(z.string().trim().min(1, 'Required')),
  myArray: zfd.repeatable(
    z
      .array(zfd.text(z.string().trim().min(1, 'Required')))
      .min(2, 'Must have at least 2 values')
  ),
  myDateTime: zfd.text(),
});

/**
 * Initialise with defaults
 */
const defaultValues: z.infer<typeof formSchema> = {
  myString: '',
  myArray: ['one value'],
  myDateTime: '',
};

/**
 * Render form
 */
function App() {
  const onSubmit = (data: z.infer<typeof formSchema>) =>
    console.log('Received data:', data);

  return (
    <ValidatedForm
      validator={formSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      {(helper) => (
        <Container sx={{ marginTop: 3 }} maxWidth="xs">
          <Typography variant="h5">
            <Link href="https://www.npmjs.com/package/@makerx/forms-mui">
              @makerx/forms-mui
            </Link>{' '}
            demo
          </Typography>
          <div>
            <Typography>
              <Link href="https://github.com/MakerXStudio/forms/tree/main/packages/mui-example">
                source
              </Link>
              {' | '}
              <Link href="https://github.com/MakerXStudio/forms/tree/main/packages/mui">
                docs
              </Link>
            </Typography>
          </div>
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
              <Stack direction="row" spacing={1} alignItems="center">
                {helper.submitButton({ label: 'Submit' })}
                {helper.formContext.formState.isSubmitted &&
                  (helper.formContext.formState.isSubmitSuccessful ? (
                    <SuccessIcon color="success" />
                  ) : (
                    <FailIcon color="error" />
                  ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </ValidatedForm>
  );
}

export default App;
