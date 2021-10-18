import { IonContent,IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar,IonText,IonList,IonItem,IonLabel } from '@ionic/react';
import {settings,person,personCircle, cloudDownload,helpCircle,informationCircle, analytics,documentText,flash} from 'ionicons/icons';
import './Tab3.css';

export const Show: React.FC = () => {
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>HellOo</IonText>
        {alert("hey")}
        <IonText></IonText>
      </IonContent>
    </IonPage>
  );
};
