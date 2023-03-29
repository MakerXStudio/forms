import { IonItem, IonSkeletonText } from '@ionic/react'

export default function SkeletonFormItem() {
  return (
    <IonItem fill="solid">
      <IonSkeletonText animated class="ion-text-center" style={{ height: '50%', margin: '1.7em 0' }}></IonSkeletonText>
    </IonItem>
  )
}
