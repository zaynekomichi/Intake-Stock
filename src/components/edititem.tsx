import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { 
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonSearchbar
 } from '@ionic/react';
import { scanOutline, stopCircleOutline } from "ionicons/icons"
import {useEffect, useState} from "react";
import './edititem.css';

const EditItem: React.FC = () => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restock Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar></IonSearchbar>
        <div className="alignGeneral">
          <IonText>Items running low</IonText>
        </div>
      </IonContent>
    </IonPage>
    );
};

export default EditItem;
