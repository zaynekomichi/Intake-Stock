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
import {address} from '../components/AddressService';
import './scan.css';
const ScanNew: React.FC = ()=> {
let history:any = useHistory();
let info:any = localStorage.getItem('name');
let results:any = JSON.parse(info);
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
    results.Scan = result.content;
    let name:string = results.productName;
    let quantity:string = results.quantity;
    let expireDate:string = results.expire;
    let receivedBy:string = results.receivedBy;
    let receiveDate:string = results.receiveDate;
    let code:string = results.Scan;
    let notes:string = results.notes;
    let provider:string = results.provider;
      axios.get(`${address}App_Data/InsertInventory.php`,{
      params:{
        InsertData:1,
        productName:name,
        quantity:quantity,
        expireDate:expireDate,
        receivedBy:receivedBy,
        receiveDate:receiveDate,
        code:code,
        notes:notes,
        provider:provider
      },
    })
    .then((response:any)=>{
      if(response.data==1){
        setAlert(true);
      }else if(response.data==2){
        alert("! Duplicate, can not have different items with the same code");
      }else{
        alert("Failed")
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
     } catch (err) {
       //console.log(err)
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
      message={`${results.productName} has been successfully saved`}
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
    </IonContent>
  </IonPage>
)
};

export default ScanNew;
