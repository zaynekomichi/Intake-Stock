import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar,
  IonText,
  useIonViewWillEnter,
  IonList,
  IonItem,
  IonIcon,
  IonLabel } from '@ionic/react';
import {flaskSharp,calendar,cart,clipboard,storefront,qrCode} from 'ionicons/icons';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [allData,setData] = useState<any>([]);
  const [viewError,setError] = useState<string>("");
  useIonViewWillEnter(() => {
    axios.get('http://192.168.1.23/App_Data/Inventory.php',{
      params:{
        getData:1,
      },
    })
    .then((response:any)=>{
      setData(response.data);
      console.log(allData)
      setError("");
    })
    .catch((error:any)=>{
      setError("Server is offline");
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar></IonSearchbar>
        <div id="inv_main">
          <h3>In-stock</h3>
          <div className="row_cards">
          {viewError}
          <IonList >
            {allData.map((items:any)=>{
              return(
                
                  <div key={items.id} className="specialList">
                    <div>
                      <IonIcon icon={flaskSharp} className="iconSize" />
                      <IonLabel>{items.productName}</IonLabel>
                    </div>
                    <br/>
                    <div className="itemsFlex">
                      <div>
                        <IonIcon icon={cart}/>
                        <IonText className="textPadding">{items.Quantity}</IonText>
                      </div>
                      <div>
                        <IonIcon icon={storefront}/>
                        <IonText className="textPadding">{items.Provider}</IonText>
                      </div>
                      <div>
                        <IonIcon icon={calendar}/>
                        <IonText className="textPadding">{items.ReceiveDate}</IonText>
                      </div> 
                    </div>
                  </div>
               
                )
              })}
           </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

