# @makerx/forms

Add typed & validated forms to your React app quickly. Currently supports ionic [(demo)](https://makerxstudio.github.io/forms/ionic-example) & mui [(demo)](https://makerxstudio.github.io/forms/mui-example)

## Installation

### mui

```bash
npm i @makerx/forms-mui react-hook-form
```

#### Example

![Example](mui-example.png?raw=true)

```tsx
import { ValidatedForm, z, zfd } from '@makerx/forms-mui';
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

          {helper.submitButton({ label: 'Submit' })}
        </>
      )}
    </ValidatedForm>
  );
}
```

[Styled example](https://github.com/MakerXStudio/forms/blob/main/packages/mui-example/src/App.tsx) | [Live demo](https://makerxstudio.github.io/forms/mui-example)

### ionic

```bash
npm i @makerx/forms-ionic react-hook-form
```

#### Example

![Example](ionic-example.png?raw=true)

```tsx
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { ValidatedForm, z, zfd } from '@makerx/forms-ionic';

/**
 * Define schema
 */
export const formSchema = zfd.formData({
  myString: zfd.text(z.string().trim().min(1, 'Required')),
  myOptionalParagraph: zfd.text(z.string().optional()),
});

/**
 * Initialise with defaults
 */
const defaultValues: z.infer<typeof formSchema> = {
  myString: '',
  myOptionalParagraph: 'something already here',
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
        <div>
          <h2>ionic-example</h2>

          {helper.textField({
            label: 'This is required',
            field: 'myString',
          })}
          {helper.textareaField({
            label: 'This is not required',
            field: 'myOptionalParagraph',
          })}

          {helper.submitButton({ label: 'Submit' })}
        </div>
      )}
    </ValidatedForm>
  );
}

export default App;
```

[Styled example](https://github.com/MakerXStudio/forms/blob/main/packages/ionic-example/src/App.tsx) | [Live demo](https://makerxstudio.github.io/forms/ionic-example)
