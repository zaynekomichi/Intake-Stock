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
import axios from 'axios';
import {address} from '../components/AddressService';
import {useHistory} from 'react-router-dom';
import { scanOutline, stopCircleOutline,flashlight } from "ionicons/icons"
import {useEffect, useState} from "react";
import './scan.css';
import { OfflineCodeSearch } from '../components/OfflineServices';

const Scan: React.FC = () => {
const history = useHistory();
const [codeData, setData] = useState<any>();
const [showAlert,setAlert] = useState(false);
const [err, setErr] = useState<String>()
const [hideBg,setHideBg] = useState("")

const startScan = async () => {
  BarcodeScanner.hideBackground() // make background of WebView transparent
  setHideBg("hideBg")

  const result = await BarcodeScanner.startScan() // start scanning and wait for a result
  stopScan()

  // if the result has content
  if (result.hasContent) {
    let code:any = result.content;
    setData(code);
    axios.get(`${address}App_Data/GetInventory.php`,{
      params:{
        getCodeItem:1,
        code:code,
      }
    })
    .then((response:any)=>{
      //assign response variable
      let parsed:any = response.data;

      //check if response contains any data
      if(parsed !== null){
        if(code === parsed.Code){
           localStorage.setItem('changeInventory',JSON.stringify(response.data));
           history.push('./withDrawItem');
         }else{
           setAlert(true);
         }
      }else{
         setAlert(true);
      }
    })
    .catch((error)=>{
      let a = OfflineCodeSearch(code);
      if(a === true){
        console.log('found'); 
        history.push('/withDrawItem');
      }else if(a === false){
        setAlert(true);
      }else{
        alert("Ran into a problem");
      }
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
       setErr("Not implemented in web version")
       //console.log(Error)
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
      header={'Not Found'}
      message={`${codeData} Item was not found in Database `}
      buttons={[
        {
          text:'OK',
          role:'redirect',
          handler: redirect=>{
            setAlert(false)
          }
        }
        ]}
        
      />
    </IonContent>
  </IonPage>
)
};

export default Scan;
