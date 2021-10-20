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
  IonSearchbar,
  IonCard,
  IonInput,
  IonTextarea,
  IonCardHeader,
  IonBadge,
  IonAlert,useIonAlert
 } from '@ionic/react';
import axios from 'axios';
import { scanOutline, stopCircleOutline } from "ionicons/icons";
import {useHistory,Route,Redirect} from 'react-router-dom';
import {useForm,Controller} from 'react-hook-form';
import {flaskSharp,calendar,cart,clipboard,storefront,qrCode,book} from 'ionicons/icons';
import {useEffect, useState} from "react";
import './withDrawItem.css';

const Withdraw: React.FC = () => {
const [idData, setId] = useState<any>();
const [productData, setProductData] = useState("");
const [amountData, setAmountData] = useState<number>();
const [remainingData, setAmountLeftData] = useState<any>();
const [showAlert,setAlert] = useState(false);
let WithdrawItems:any = localStorage.getItem('changeInventory');
const Items = JSON.parse(WithdrawItems);
let history:any = useHistory();
const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  const onSubmit = (data:any) =>{
    let WithdrawItems:any = localStorage.getItem('changeInventory');
    const Items = JSON.parse(WithdrawItems);
    const productName = Items.productName;
    const NewQuantity =parseInt(Items.Quantity)-data.quantity;
    const taken = data.quantity;
    const provider = Items.provider;
    const receivedBy = Items.receivedBy;
    const receiveDate = Items.receiveDate;
    const notes = Items.notes;
    setId(Items.id);
    setProductData(productName);
    setAmountData(taken);
    setAmountLeftData(NewQuantity);
    setAlert(true);
  }
  const sendData = ()=>{   
  let user:any = localStorage.getItem('user'); 
    axios.get('http://192.168.1.23/App_Data/InventoryMulti.php',{
      params:{
        Withdraw:1,
        id:idData,
        taken:amountData,
        remaining:remainingData,
        user:user,
      }
    }).then((response)=>{
      if(response.data === 1){
      history.push('/tab1');
      }else{
        alert(response.data);
        console.log(response.data);
      }
    }).catch((error)=>{
      alert("Network Error");
    });
  }
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Withdraw </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonCard className="generalCard">
        <IonHeader>
          <h3>Take {Items.productName}</h3>
          <img src="./assets/media/withdraw.png" alt=""/>
        </IonHeader>
       
          <IonInput {...register("quantity",{required:true,min:1,max:Items.Quantity})} type="number" className="cardInput" placeholder="Enter number of Items you want to take"/>
          {errors.quantity && <IonBadge color="danger" className="general_padding">Quantity cant be empty,equal to zero or more than stock</IonBadge>}
          <IonButton className="generalBtn" onClick={handleSubmit(onSubmit)}>Checkout</IonButton>
        <div className="flexGeneral">
          <div>
            <IonIcon icon={cart}/>
            <IonText className="textPadding">{Items.Quantity}</IonText>
          </div>
          <div>
            <IonIcon icon={storefront}/>
            <IonText className="textPadding">{Items.Provider}</IonText>
          </div>
          <div>
            <IonIcon icon={calendar}/>
            <IonText className="textPadding">{Items.ReceiveDate}</IonText>
          </div> 
        </div>
        <div className="Notes">
            <IonIcon icon={book}/>
            <IonText className="textPadding">Notes</IonText>
            <IonTextarea className="cardInput" readonly={true}>{Items.Notes}</IonTextarea>
          </div>
      </IonCard>
      <IonAlert
      isOpen={showAlert}
      header={'Checkout'}
      message={`Are you sure you want to take ${amountData} items from ${productData} stock?`}
      buttons={[
        {
           text:'Cancel',
          role:'redirect',
          handler: redirect=>{
           setAlert(false);
          }
        },
         {
          text:'OK',
          role:'redirect',
          handler: redirect=>{
            sendData();
          }
        }
        ]}
        
      />
      </IonContent>
    </IonPage>
    );
};

export default Withdraw;
