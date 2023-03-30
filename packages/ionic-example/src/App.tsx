import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from '@ionic/react';
import { ValidatedForm, z, zfd } from '@makerx/forms-ionic';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

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
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="6" sizeLg="5" sizeXl="4">
              <ValidatedForm
                validator={formSchema}
                onSubmit={onSubmit}
                defaultValues={defaultValues}
              >
                {(helper) => (
                  <div>
                    <h2>
                      <a href="https://www.npmjs.com/package/@makerx/forms-ionic">
                        @makerx/forms-ionic
                      </a>{' '}
                      demo
                    </h2>
                    <p>
                      <a href="https://github.com/MakerXStudio/forms/tree/main/packages/ionic-example">
                        source
                      </a>
                      {' | '}
                      <a href="https://github.com/MakerXStudio/forms/tree/main/packages/ionic">
                        docs
                      </a>
                    </p>

                    {helper.textField({
                      label: 'This is required',
                      field: 'myString',
                    })}
                    {helper.textareaField({
                      label: 'This is not required',
                      field: 'myOptionalParagraph',
                    })}
                    <IonGrid>
                      <IonRow class="ion-align-items-center">
                        <IonCol size="auto">
                          {helper.submitButton({ label: 'Submit' })}
                        </IonCol>
                        <IonCol>
                          {helper.formContext.formState.isSubmitted &&
                            (helper.formContext.formState.isSubmitSuccessful ? (
                              <IonIcon
                                style={{ marginTop: 6 }}
                                icon={checkmarkCircle}
                                size="large"
                                color="success"
                              />
                            ) : (
                              <IonIcon
                                style={{ marginTop: 6 }}
                                icon={closeCircle}
                                size="large"
                                color="danger"
                              />
                            ))}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                )}
              </ValidatedForm>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default App;
