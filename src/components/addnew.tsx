import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { personCircle,qrCode,scanOutline,fileTrayFullOutline,checkmarkDoneOutline } from 'ionicons/icons';
import { IonSelect,IonSelectOption,IonButton,IonButtons,IonContent,IonHeader,IonIcon,IonPage,IonRow,IonText,IonTitle,IonToolbar,IonInput,IonTextarea,IonAlert,IonBadge,IonRouterOutlet} from '@ionic/react';
import './addnew.css';
import { IonReactRouter } from '@ionic/react-router';
import {useState,useEffect} from 'react';
import {useHistory,Route,Redirect} from 'react-router-dom';
import {useForm,Controller} from 'react-hook-form';
import axios from 'axios';
import ScanNew from '../pages/scanNew';
import {Storage} from '@capacitor/storage'

const AddNew: React.FC = () => {
  const [viewAlert,setAlert] = useState(false);
  const [product,setProduct] = useState<string>("");
  const [code,setCode] = useState<string>("");
  let history:any = useHistory();
  let user:any = localStorage.getItem('user');
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
    const code = data.code;
    localStorage.setItem('name',JSON.stringify(data));
    setProduct(productName);
    if(code==="Yes"){
      history.push("/scanNew");
    }else if(code==="No"){
      axios.get('http://192.168.1.23/App_Data/InsertInventory.php',{
      params:{
        InsertData:1,
        productName:productName,
        quantity:quantity,
        receivedBy:receivedBy,
        receiveDate:receiveDate,
        code:"None",
        notes:notes,
        provider:provider
      },
    })
    .then((response:any)=>{
      if(response.data==1){
        setAlert(true);
      }else{
        alert("Failed");
      }
    })
    .catch((error:any)=>{
      alert("Network Error");
    });
    }

  }

  return(
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Add new item</IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent>
      <form className="AddNew" onSubmit={handleSubmit(onSubmit)}>
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
         <IonInput {...register("receivedBy")} type="text" placeholder="Received By"  readonly id='receivedBy'className="Ion_Input" value={user} />
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
      <div className="general_Padding">
        <IonSelect {...register("code",{required:true})} okText="Okay" cancelText="Dismiss" placeholder="Does item have code" value={code} onIonChange={e=>{setCode(e.detail.value!)}} className="Ion_Input">
              <IonSelectOption>Yes</IonSelectOption>
              <IonSelectOption>No</IonSelectOption>
          </IonSelect>
        {errors.receiveDate && <IonBadge color="danger" className="general_padding">Date of receival is required</IonBadge>}
      </div>
       <div className='CentreItems'>
         <IonButton fill="outline" type="submit">
          <IonIcon icon={checkmarkDoneOutline}/>
          Verify
         </IonButton>
       </div>
       </form>
        <IonAlert
      isOpen={viewAlert}
      header={'Saved'}
      message={`${product} has been successfully saved`}
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
    );
};

export default AddNew;
