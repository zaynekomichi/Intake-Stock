import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { IonButton,IonList,IonLabel,IonItem,IonButtons,IonContent,IonHeader,IonIcon,IonPage,IonInput,IonRow, IonText,IonBadge,IonTitle,IonToolbar,IonSearchbar} from '@ionic/react';
import {calendar,cart,clipboard,storefront,qrCode, scanOutline, stopCircleOutline,search} from "ionicons/icons"
import axios from 'axios';
import {address} from './AddressService';
import {useEffect, useState} from "react";
import {useForm,Controller} from 'react-hook-form';
import {useHistory } from 'react-router-dom';

import './edititem.css';

const EditItem: React.FC = () => {
  const history:any = useHistory();
  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  const [searchValue,setSearch] = useState<string>("");
  const [results,setResults] = useState([]);
  const [viewError,setError] = useState<string>("");
  const [name,setName] = useState<string>("");
  const [quantity,setQuantity] = useState<number>();
  const [code,setCode] = useState<string>("");
  const [provider,setProvider] = useState<string>("");
  const [receive,setReceivedBy] = useState<string>("");
  const [rdate,setReceiveDate] = useState<string>("");
  const [notes,setNotes] = useState<string>("");

  const onSubmit =(data:any)=>{
    const userData:any = data.productName;
    axios.get(`${address}App_Data/InventorySearch.php`,{
      params:{
        getData:1,
        name:userData,
      },
    })
    .then((response:any)=>{
      const data = response.data;
      if(data.length>0){
        setResults(data);
      setError("");
      }else{
         setResults(data);
         setError(`could not find ${searchValue}`);
      }
    })
    .catch((error:any)=>{
      setError("Server is offline");
    });
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restock Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <div className="Margins">
        <form onSubmit={handleSubmit(onSubmit)}>
        <IonInput type="text"  {...register("productName",{required:true})} placeholder="Search For Item To Restock" onIonChange={e=>{setSearch(e.detail.value!)}} value={searchValue} className="top-search"/>
        <IonButton type="submit" className="searchBtn"><IonIcon icon={search}/></IonButton>
        </form>
       </div>
        <div className="alignGeneral">
        {errors.productName && <IonBadge color="danger" className="general_padding">Product Name is required</IonBadge>}
        {viewError}
        <IonList>
        {results.map((items:any)=>{
          return(
            <IonItem key={items.id} onClick={()=>{
                  const userId = items.id;
                  localStorage.setItem('id',userId);
                  history.push("/restockScan");
                  }}>
              <div className="ListItems">
                      <img src="./assets/media/pills.png" className="List_img" alt="" />
                      <IonLabel className="Label"><b>{items.productName}</b></IonLabel>
                    </div>
                      <div>
                        <IonIcon icon={qrCode}/>
                        <IonText className="textPadding">{items.Code}</IonText>
                      </div> 
            </IonItem>
            )
        })}
        </IonList>
        </div>
      </IonContent>
    </IonPage>
    );
};

export default EditItem;
