import { Redirect, Route } from 'react-router-dom';
import { IonContent,IonAlert,IonList,IonItem,IonLabel, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div id="inv_main">
          <h3>Choose Code Type</h3>
          <div className="Lists">
            <div className="cards_row">
              <img src="./assets/media/barcode.png" alt="Barcode"/>
               <p >Barcode Reader</p>
              <IonButton color="primary" href='/scan'>
                <img src="./assets/media/right-arrow.png"  alt="Arrow" />
              </IonButton>
            </div>
            <div className="cards_row">
              <img src="./assets/media/qr-code.png" alt="QRcode"/>
              <p>QRcode Reader</p>
              <IonButton color="primary" href='/scan'>
                <img src="./assets/media/right-arrow.png" alt="Arrow"/>
              </IonButton>
            </div>
            <div className="BigShadow">
              <div>
              <IonButton href='/addnew'>
                <img src="./assets/media/add.png" alt=""/>
                <p>Add Item</p>
                 </IonButton>
              </div>
              <div>
              <IonButton href='/edititem'>
                <img src="./assets/media/edit.png" alt=""/>
                <p>Restock Item</p>
              </IonButton>
              </div>
            </div>
            <h4>Checkout List</h4>
            <div id="CheckoutList">
              <IonList>
                <IonItem>
                  <IonLabel>Senzeni Took 2qty of Magnesum oxide</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Trina Took 10 qty of Magnesum sulphate</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Kirtsy Took 34 qty of Antredipozol</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Mr Repo Took 2 qty of Doplomethazine</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Senzeni Took 2 qty of Magnesum sulphate</IonLabel>
                </IonItem>
              </IonList>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
