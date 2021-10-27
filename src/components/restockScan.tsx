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
const [showPrompt,setPrompt] = useState(true);
const [err, setErr] = useState<String>()
const [hideBg,setHideBg] = useState("")
const [showAlert,setAlert] = useState(false)
const startScan = async () => {
  BarcodeScanner.hideBackground() // make background of WebView transparent
  setHideBg("hideBg")

  const result = await BarcodeScanner.startScan() // start scanning and wait for a result
  stopScan()

  // if the result has content
  if (result.hasContent) {
    console.log(result.content)
    let code:any = result.content;
    let quantity:any = localStorage.getItem('quantity');
      axios.get(`${address}App_Data/InventoryUpdate.php`,{
      params:{
        restock:1,
        id:id,
        code:code,
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
      message={`Enter stock amount`}
      inputs={[
        {
          name:'Quantity',
          type:'number',
          placeholder:'Enter number of items to restock',
          min:1,
        }
        ]}
      buttons={[
        {
          text:'OK',
          handler: (data:any)=>{
            if(data.Quantity>0){
              const dataValue = data.Quantity;
              localStorage.setItem('quantity',dataValue);
            }else{
              alert("Enter Stock Quantity!");
              setPrompt(false);
              setPrompt(true);
            }
          }
        }
        ]}
        
      />
    </IonContent>
  </IonPage>
)
};

export default Restock;
