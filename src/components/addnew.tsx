import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { personCircle,qrCode,scanOutline,fileTrayFullOutline,checkmarkDoneOutline } from 'ionicons/icons';
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
  IonInput,
  IonTextarea,
  IonAlert,
  IonBadge,
  IonRouterOutlet
 } from '@ionic/react';
import './addnew.css';
import { IonReactRouter } from '@ionic/react-router';
import {useState,useEffect} from 'react';
import {useHistory,Route,Redirect} from 'react-router-dom';
import {useForm,Controller} from 'react-hook-form';
import ScanNew from '../pages/scanNew';
import {Storage} from '@capacitor/storage'

const AddNew: React.FC = () => {
  let history:any = useHistory();
  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  const onSubmit = (data:any) =>{
    const productName = data.productName;
    const quantity = data.quantity;
    const provider = data.provider;
    const receivedBy = data.receivedBy;
    const receiveDate = data.receiveDate;
    const notes = data.notes;
    localStorage.setItem('name',JSON.stringify(data));
    history.push("scanNew");

  }

  return(
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Add new item</IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="general_Padding">
        <IonInput {...register("productName",{required:true})} type="text" placeholder="Product Name"   id='productName'  className="Ion_Input"/>
        {errors.productName && <IonBadge color="danger" className="general_padding">Product Name is required</IonBadge>}
      </div>
      <div className="general_Padding">
        <IonInput {...register("quantity",{required:true})} type="number" placeholder="Quantity"  id='quantity'  className="Ion_Input"/>
        {errors.quantity && <IonBadge color="danger" className="general_padding">Quantity is required</IonBadge>}
      </div>
       <div className="general_Padding">
         <IonInput {...register("provider",{required:true})} type="text" placeholder="Provider" id='provider' className="Ion_Input"/>
        {errors.provider && <IonBadge color="danger" className="general_padding">Provider Name is required</IonBadge>}
       </div>
       <div className="general_Padding">
         <IonInput {...register("receivedBy",{required:true})} type="text" placeholder="Received By"  id='receivedBy'className="Ion_Input"/>
        {errors.receivedBy && <IonBadge color="danger" className="general_padding">Person who received items is required</IonBadge>}
       </div>
        <div className="general_Padding">
        <IonTextarea {...register("notes",{required:true})} placeholder="Notes"  id='receiveDate'  className="Ion_Input"/>
        {errors.receiveDate && <IonBadge color="danger" className="general_padding">Notes required, if none indicate none</IonBadge>}
      </div>
       <div className="general_Padding">
        <IonInput {...register("receiveDate",{required:true})} type="date" placeholder="Stock Date"  id='receiveDate'  className="Ion_Input"/>
        {errors.receiveDate && <IonBadge color="danger" className="general_padding">Date of receival is required</IonBadge>}
      </div>
       <div className='CentreItems'>
         <IonButton fill="outline" type="submit">
          <IonIcon icon={checkmarkDoneOutline}/>
          Verify
         </IonButton>
       </div>
       </form>
      </IonContent>
    </IonPage>
    );
};

export default AddNew;
