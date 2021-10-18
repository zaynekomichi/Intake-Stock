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
  IonCard,
  IonLabel,useIonAlert,IonAlert} from '@ionic/react';
import {flaskSharp,calendar,cart,clipboard,storefront,qrCode} from 'ionicons/icons';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [showAlert,setAlert] = useState(false);
  const [name,setName] = useState<string>("");
  const [quantity,setQuantity] = useState<number>();
  const [code,setCode] = useState<string>("");
  const [provider,setProvider] = useState<string>("");
  const [receive,setReceivedBy] = useState<string>("");
  const [rdate,setReceiveDate] = useState<string>("");
  const [notes,setNotes] = useState<string>("");
  const [showInfo,setInfo] = useState(false);
  const [allData,setData] = useState<any>([]);
  const [viewError,setError] = useState<string>("");
  const searchbar = document.querySelector('IonSearchbar');
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
          <IonList>
            {allData.map((items:any)=>{
              return(
                
                  <div key={items.id} onClick={()=>{
                    setName(items.productName);
                    setCode(items.Code);
                    setQuantity(items.Quantity);
                    setProvider(items.Provider);
                    setReceivedBy(items.ReceivedBy);
                    setReceiveDate(items.ReceiveDate);
                    setNotes(items.Notes);
                    setAlert(true);

                  }} className="specialList">
                    <div className="Header">
                      <img src="./assets/media/pills.png" className="List_img" alt="" />
                      <IonLabel className="Label">{items.productName}</IonLabel>
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
        <IonAlert
      isOpen={showAlert}
      header={name}
      message={`Product Code ${code} <br/>
      In stock ${quantity} <br/>
      Provider ${provider} <br/>
      Signed By ${receive} <br/>
      Date Signed ${rdate} <br/>
      Item  Notes <br/> ${notes} <br/> 

      `}
      buttons={[
         {
          text:'OK',
          role:'redirect',
          handler: redirect=>{
            setAlert(false);
          }
        }
        ]}
        
      />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

