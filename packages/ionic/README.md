## @makerx/forms-ionic

### Installation

```bash
npm i @makerx/forms-ionic react-hook-form
```

### Example

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
