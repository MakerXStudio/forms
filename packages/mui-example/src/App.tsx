import { ValidatedForm, z, zfd } from '@makerx/forms-mui';
import FailIcon from '@mui/icons-material/Cancel';
import SuccessIcon from '@mui/icons-material/CheckCircle';
import { Container, Grid, Link, Stack, Typography } from '@mui/material';
import { formatISO, parseISO } from 'date-fns';

/**
 * Define schema
 */
export enum NumberEnum {
  One,
  Two,
  Three,
}

export enum StringEnum {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
}

export const StringEnumList = ['one', 'two', 'three'] as const;

export const formSchema = zfd.formData({
  myString: zfd.text(z.string().trim().min(1, 'Required')),
  myArray: zfd.repeatable(
    z
      .array(zfd.text(z.string().trim().min(1, 'Required')))
      .min(2, 'Must have at least 2 values')
  ),
  myDateTime: zfd.text(),
  myTextFile: zfd.text(z.string().optional()),
  myParagraph: zfd.text(),
  myEnum: zfd.text(z.enum(StringEnumList)),
  myNativeEnum: zfd.numeric(z.nativeEnum(NumberEnum)),
  myNativeStringEnum: zfd.text(z.nativeEnum(StringEnum).optional()),
  questions: z
    .array(
      z.object({
        questionTitle: zfd.text(z.string().trim().min(1, 'Required')),
        questionDescription: zfd.text(z.string().trim().optional()),
        answers: zfd.repeatable(
          z
            .array(zfd.text(z.string().trim().min(1, 'Required')))
            .min(2, 'Must have at least 2 answers')
        ),
      })
    )
    .min(1, 'Must have at least 1 question'),
});

/**
 * Initialise with defaults
 */
const defaultValues: z.infer<typeof formSchema> = {
  myString: '',
  myArray: ['one value'],
  myDateTime: '',
  myTextFile: '',
  myParagraph: '',
  myEnum: 'three',
  myNativeEnum: NumberEnum.Two,
  questions: [{ questionTitle: '', answers: [' ', ' '] }],
};

type Fields = z.infer<typeof formSchema>;

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
          <Typography sx={{ marginBottom: 2 }} variant="h5">
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
                hint: 'Some hint text',
                longHint: 'Some longer hint text',
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
              {helper.textFileFormField({
                label: 'Text file',
                field: 'myTextFile',
                hint: 'Upload a textfile here',
                longHint:
                  "Here is some more info that couldn't fit in the hint",
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.textareaField({
                label: 'A paragraph of text',
                field: 'myParagraph',
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.selectField({
                label: 'A string enum',
                field: 'myEnum',
                options: helper.optionsForStringList(StringEnumList),
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.selectField({
                label: 'A native number enum',
                field: 'myNativeEnum',
                options: helper.optionsForEnum(NumberEnum, '-- Select value'),
              })}
            </Grid>
            <Grid item xs={12}>
              {helper.selectField({
                label: 'A native string enum',
                field: 'myNativeStringEnum',
                options: helper.optionsForEnum(StringEnum, true),
              })}
            </Grid>

            <Grid item xs={12}>
              {helper.array({
                label: 'Questions',
                field: 'questions',
                minimumItemCount: 1,
                itemLabel: 'question',
                defaultAppendValue: { questionTitle: '', answers: [' ', ' '] },
                children: (index) => (
                  <>
                    {helper.textField({
                      label: 'Question or Category',
                      field: `questions.${index}.questionTitle`,
                    })}
                    {helper.textField({
                      label: 'Question description',
                      field: `questions.${index}.questionDescription`,
                    })}
                    {helper.textFields({
                      field: `questions.${index}.answers`,
                      label: 'Answers',
                      minimumItemCount: 2,
                    })}
                  </>
                ),
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
