import { Redirect, Route } from 'react-router-dom';
import { IonContent,IonAlert,IonList,IonItem,IonLabel,useIonViewWillEnter, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import {useState,useEffect} from 'react';
import {address} from '../components/AddressService';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import './Tab2.css';
import { UpdateInventoryItem } from '../components/OfflineServices';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [showAlert,setAlert] = useState(false);
  const [allData,setData] = useState([]);
  const [viewError,setError] = useState<string>("");
  const [name,setName] = useState<string>("");
  const [quantity,setQuantity] = useState<number>();
  const [code,setCode] = useState<string>("");
  const [tdate,setDate] = useState<string>("");
  const [username,setUser] = useState<string>("");
  const [ttime,setTime] = useState<string>("");
  useIonViewWillEnter(() => {
    const user = localStorage.getItem('user');
    if(user===null){
      history.push("/login");
    }
    axios.get(`${address}App_Data/InventoryHistory.php`,{
      params:{
        getData:1,
      },
    })
    .then((response:any)=>{
      setData(response.data);
      setError("");
      let GetWithdrawals:any = localStorage.getItem("WithdrawData");
      GetWithdrawals = JSON.parse(GetWithdrawals);
      UpdateInventoryItem(GetWithdrawals);
    })
    .catch((error:any)=>{
      setError("Server is offline");
    });
  });
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
                <p>Restock</p>
              </IonButton>
              </div>
              <div>
              <IonButton href='/withDraw'>
                <img src="./assets/media/down.png" alt=""/>
                <p>Withdraw</p>
              </IonButton>
              </div>
            </div>
            <h4>Checkout List</h4>
            <div id="CheckoutList">
              <IonList className="roundList">
              {allData.map((items:any)=>{
                return(
                  <IonItem key={items.id} onClick = {()=>{
                    setName(items.productName);
                    setCode(items.Code);
                    setUser(items.User);
                    setQuantity(items.Quantity);
                    setDate(items.TakeoutDate);
                    setTime(items.TakeoutTime);
                    setAlert(true);
                  }}>
                    <IonLabel>{items.User} took {items.Quantity} quantities  of {items.productName}</IonLabel>
                  </IonItem>
                  );
              })}
              </IonList>
            </div>
          </div>
        </div>
        <IonAlert
      isOpen={showAlert}
      header={name}
      message={`
      Product Code ${code} <br/>
      ${username} took ${quantity} quantities <br/>
      Date Taken ${tdate} <br />
      Time Taken ${ttime} 
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

export default Tab2;
