import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar,
  IonButton,
  IonText,
  IonInput,
  useIonViewWillEnter,
  IonList,
  IonItem,
  IonIcon,
  IonCard,
  IonBadge,
  IonLabel,useIonAlert,IonAlert} from '@ionic/react';
import {flaskSharp,calendar,cart,clipboard,storefront,qrCode,search} from 'ionicons/icons';
import {useState,useEffect} from 'react';
import {useForm,Controller} from 'react-hook-form';
import axios from 'axios';
import { Redirect, Route,useHistory } from 'react-router-dom';
import './Tab1.css';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [searchv, setSearch] = useState<string>("");
  const [showAlert,setAlert] = useState(false);
  const [name,setName] = useState<string>("");
  const [quantity,setQuantity] = useState<number>();
  const [code,setCode] = useState<string>("");
  const [provider,setProvider] = useState<string>("");
  const [receive,setReceivedBy] = useState<string>("");
  const [rdate,setReceiveDate] = useState<string>("");
  const [notes,setNotes] = useState<string>("");
  const [showInfo,setInfo] = useState(false);
  const [allData,setData] = useState<any>([]);
  const [searchData,setSearchData] = useState<any>([]);
  const [viewError,setError] = useState<string>("");
  const [viewSearchError,setSearchError] = useState<string>("");
  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  useIonViewWillEnter(() => {
    const user = localStorage.getItem('user');
    if(user===null){
      history.push("/login");
    }
    axios.get('http://192.168.1.23/App_Data/Inventory.php',{
      params:{
        getData:1,
      },
    })
    .then((response:any)=>{
      setData(response.data);
      setError("");
    })
    .catch((error:any)=>{
      setError("Server is offline");
    });
  });

  const onSubmit = (data:any) =>{
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
        setSearchData(data);
      setSearchError("");
      }else{
         setSearchData(data);
         setSearchError(`could not find ${searchv}`);
      }
    })
    .catch((error:any)=>{
      setError("Server is offline");
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)} className="align_search">
        <IonInput type="search" {...register("productName",{required:true})} onIonChange={e => setSearch(e.detail.value!)} name="productName" value={searchv} 
        placeholder="search" className="top-search"/>
        <IonButton type="submit"><IonIcon icon={search}/></IonButton>
        </form>
        {errors.productName && <IonBadge color="danger" className="general_padding">Product Name is required</IonBadge>}
        <div id="inv_main">
        {viewSearchError}
        <IonList>
        {searchData.map((items:any)=>{
          return(
            <IonItem key={items.id} onClick={()=>{
                    setName(items.productName);
                    setCode(items.Code);
                    setQuantity(items.Quantity);
                    setProvider(items.Provider);
                    setReceivedBy(items.ReceivedBy);
                    setReceiveDate(items.ReceiveDate);
                    setNotes(items.Notes);
                    setAlert(true);

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
          <h3>In-stock</h3>
          <div className="row_cards">
          {viewError}
          <IonList>
            {allData.map((items:any)=>{
              return(
                
                  <div key={items.id} onClick={()=>{
                    setName(items.productName);
                    setCode(items.Code);
                    setQuantity(items.Quantity);
                    setProvider(items.Provider);
                    setReceivedBy(items.ReceivedBy);
                    setReceiveDate(items.ReceiveDate);
                    setNotes(items.Notes);
                    setAlert(true);

                  }} className="specialList">
                    <div className="Header">
                      <img src="./assets/media/pills.png" className="List_img" alt="" />
                      <IonLabel className="Label">{items.productName}</IonLabel>
                    </div>
                    <br/>
                    <div className="itemsFlex">
                      <div>
                        <IonIcon icon={cart}/>
                        <IonText className="textPadding">{items.Quantity}</IonText>
                      </div>
                      <div>
                        <IonIcon icon={storefront}/>
                        <IonText className="textPadding">{items.Provider}</IonText>
                      </div>
                      <div>
                        <IonIcon icon={calendar}/>
                        <IonText className="textPadding">{items.ReceiveDate}</IonText>
                      </div> 
                    </div>
                  </div>
               
                )
              })}
           </IonList>
          </div>
        </div>
        <IonAlert
      isOpen={showAlert}
      header={name}
      message={`Product Code ${code} <br/>
      In stock ${quantity} <br/>
      Provider ${provider} <br/>
      Signed By ${receive} <br/>
      Date Signed ${rdate} <br/>
      Item  Notes <br/> ${notes} <br/> 

      `}
      buttons={[
         {
          text:'OK',
          role:'redirect',
          handler: redirect=>{
            setSearch("");
            setSearchData([]);
            setAlert(false);
          }
        }
        ]}
        
      />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

