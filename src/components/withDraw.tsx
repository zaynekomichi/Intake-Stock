import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { IonButton,IonAlert,IonList,IonLabel,IonItem,IonButtons,IonContent,IonHeader,IonIcon,IonPage,IonInput,IonRow, IonText,IonBadge,IonTitle,IonToolbar,IonSearchbar} from '@ionic/react';
import {calendar,cart,clipboard,storefront,qrCode, scanOutline, stopCircleOutline,search} from "ionicons/icons"
import axios from 'axios';
import {useEffect, useState} from "react";
import {useForm,Controller} from 'react-hook-form';
import {useHistory } from 'react-router-dom';

import './edititem.css';

const Take: React.FC = () => {
  const history:any = useHistory();
  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  const [showAlert,setAlert] = useState(false);
  const [showPrompt,setPrompt] = useState(false);
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
    axios.get('http://192.168.1.23/App_Data/InventorySearch.php',{
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

  const updateInventory =(id:any,value:any,old:any,user:any)=>{
    let remaining = parseInt(old)-value;
    console.log(remaining);
    if(value>parseInt(old)){
      alert("Cant withdraw more than current amount");
      setPrompt(true);
    }else{
     axios.get('http://192.168.1.23/App_Data/InventoryMulti.php',{
      params:{
        Withdraw:1,
        id:id,
        taken:value,
        remaining:remaining,
        user:user,
      },
    })
    .then((response:any)=>{
      if(response.data==1){
        setAlert(true);
      }else{
        alert("Failed!")
      }
    })
    .catch((error:any)=>{
      alert("Failed to save");
    });
  }
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Take Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <div className="Margins">
        <form onSubmit={handleSubmit(onSubmit)}>
        <IonInput type="text"  {...register("productName",{required:true})} placeholder="Search For Item To Take" onIonChange={e=>{setSearch(e.detail.value!)}} value={searchValue} className="top-search"/>
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
                  const remaining = items.Quantity;
                  setQuantity(items.Quantity);
                  localStorage.setItem('id',userId);
                  localStorage.setItem('quantity',remaining);
                  setPrompt(true);

                  }}>
              <div className="ListItems">
                      <img src="./assets/media/pills.png" className="List_img" alt="" />
                      <IonLabel className="Label"><b>{items.productName}</b></IonLabel>
                    </div>
                      <div>
                        <IonIcon icon={cart}/>
                        <IonText className="textPadding">{items.Quantity}</IonText>
                      </div> 
            </IonItem>
            )
        })}
        </IonList>
        </div>
         <IonAlert
      isOpen={showAlert}
      header={'Saved'}
      message={`Item deducted from database`}
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
          max:quantity,
          placeholder:'Enter number of items to restock',
          min:1,
        }
        ]}
      buttons={[
        {
          text:'OK',
          handler: (data:any)=>{
            if(data.Quantity>0){
              const dataValue:number = data.Quantity;
              const getId = localStorage.getItem('id');
              const all = localStorage.getItem('quantity');
              const user = localStorage.getItem('user');
              setPrompt(false);
              updateInventory(getId,dataValue,all,user);
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
    );
};

export default Take;
