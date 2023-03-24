import { ValidatedForm } from '@makerx/forms-mui';
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
  myDateTime: zfd.text(),
});

function App() {
  const onSubmit = (data: z.infer<typeof formSchema>) =>
    console.log('Received data:', data);

  return (
    <ValidatedForm validator={formSchema} onSubmit={onSubmit}>
      {(helper) => (
        <>
          {helper.textField({
            label: 'This is required',
            field: 'myString',
          })}

          {helper.textFields({
            label: 'Should be two or more',
            field: 'myArray',
            minimumItemCount: 2,
          })}

          {helper.dateTimeField({
            label: 'Date',
            field: 'myDateTime',
            fromISO: parseISO,
            toISO: formatISO,
          })}
        </>
      )}
    </ValidatedForm>
  );
}

export default App;
