import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { 
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonAlert,
  useIonAlert
 } from '@ionic/react';
import {Storage} from '@capacitor/storage';
import { Redirect, Route,useHistory } from 'react-router-dom';
import { scanOutline, stopCircleOutline } from "ionicons/icons"
import {useEffect, useState} from "react";
import axios from 'axios';
import {address} from './AddressService';
import '../pages/scan.css';
const Restock: React.FC = ()=> {
let history:any = useHistory();
let id:any = localStorage.getItem('id');
const [quantityValue,setQuantity] = useState<number>();
const [nextPrompt,setNextPrompt] = useState(false);
const [showPrompt,setPrompt] = useState(true);
const [err, setErr] = useState<String>()
const [hideBg,setHideBg] = useState("")
const [showAlert,setAlert] = useState(false)

const SendWithoutCode =()=>{
    const AllData:any = localStorage.getItem('quantity');
    const parsed = JSON.parse(AllData);
    const expire:any = parsed.expire;
    const quantity:any = parsed.quantity;
      axios.get(`${address}App_Data/InventoryUpdate.php`,{
      params:{
        restockNoCode:1,
        id:id,
        expireDate:expire,
        quantity:quantity,
      },
    })
    .then((response:any)=>{
      if(response.data==1){
        setAlert(true);
        localStorage.removeItem('quantity');
      }else{
        alert(`${response.data}`)
      }
    })
    .catch((error:any)=>{
      alert("Failed to save");
    });
}
const startScan = async () => {
  BarcodeScanner.hideBackground() // make background of WebView transparent
  setHideBg("hideBg")

  const result = await BarcodeScanner.startScan() // start scanning and wait for a result
  stopScan()

  // if the result has content
  if (result.hasContent) {
    console.log(result.content)
    let code:any = result.content;
    let AllData:any = localStorage.getItem('quantity');
    const parsed = JSON.parse(AllData);
    const expire = parsed.expire;
    const quantity = parsed.quantity;
    console.log(parsed);
      axios.get(`${address}App_Data/InventoryUpdate.php`,{
      params:{
        restock:1,
        id:id,
        code:code,
        expireDate:expire,
        quantity:quantity,
      },
    })
    .then((response:any)=>{
      if(response.data==1){
        setAlert(true);
        localStorage.removeItem('quantity');
      }else{
        alert("Failed!")
      }
    })
    .catch((error:any)=>{
      alert("Failed to save");
    });
  }
}

const stopScan = () => {
  BarcodeScanner.showBackground()
  BarcodeScanner.stopScan()
  setHideBg("")
}

const [present] = useIonAlert()

useEffect(() => {
  const checkPermission = async () => {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true })

      if (status.granted) {
        return true
      }
      return false
     } catch (Error) {
       setErr("Not Implemented in web version");
      }
  }

  checkPermission()

  return () => {}
}, [])

if (err) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow>
          <IonText color="danger">{err}</IonText>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">Scan</IonTitle>
        <IonButtons slot="end">
          <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
            <IonIcon icon={stopCircleOutline} slot="start" />
            Stop Scan
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className={hideBg}>
      <IonButton
        className="start-scan-button"
        hidden={!!hideBg}
        onClick={startScan}
      >
        <IonIcon icon={scanOutline} slot="start" />
        Start Scan
      </IonButton>
      <div hidden={!hideBg} className="scan-box" />
      <IonAlert
      isOpen={showAlert}
      header={'Saved'}
      message={`Restock successful`}
      buttons={[
        {
          text:'OK',
          role:'redirect',
          handler: redirect=>{
            history.push("/tab2")
          }
        }
        ]}
        
      />
       <IonAlert
      isOpen={showPrompt}
      header={'Quantity'}
      message={`Enter stock amount and Expiry Date`}
      inputs={[
        {
          name:'Quantity',
          type:'number',
          placeholder:'Enter number of items to restock',
          min:1,
        },
        {
          name:'Expire',
          label:'Expiry Date',
          type:'date',
        },
        ]}
      buttons={[
        {
          text:'OK',
          handler: (data:any)=>{
            if(data.Quantity>0 && data.Expire !== ''){
              const dataValue = {quantity:data.Quantity,expire:data.Expire}
              localStorage.setItem('quantity',JSON.stringify(dataValue));
              setNextPrompt(true);
            }else{
              alert("Enter All all the fields!");
              setPrompt(false);
              setPrompt(true);
            }
          }
        }
        ]}
        
      />

      <IonAlert  isOpen={nextPrompt}
      header={'Quantity'}
      message={'Is there a code on the item'}
      buttons={[
        {
          text:'No',
          handler: ()=>{
            SendWithoutCode()
          }
        },
        {
          text:'Yes',
          handler:()=>{
            setNextPrompt(false)
          }
        }
        ]}
         />
    </IonContent>
  </IonPage>
)
};

export default Restock;
