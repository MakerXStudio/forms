import { IonContent, IonPage } from '@ionic/react';
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

function App() {
  const onSubmit = (data: z.infer<typeof formSchema>) =>
    console.log('Received data:', data);
  return (
    <IonPage>
      <IonContent>
        <ValidatedForm
          validator={formSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          {(helper) => (
            <div>
              <h3>ionic-example</h3>

              {/* {helper.textField({
                label: 'This is required',
                field: 'myString',
              })}
              {helper.textareaField({
                label: 'This is not required',
                field: 'myOptionalParagraph',
              })} */}

              {helper.submitButton({ label: 'Submit' })}
            </div>
          )}
        </ValidatedForm>
      </IonContent>
    </IonPage>
  );
}

export default App;
