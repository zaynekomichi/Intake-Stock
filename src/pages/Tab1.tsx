import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonText,
  IonInput,
  useIonViewWillEnter,
  IonList,
  IonIcon,
  IonBadge,
  IonLabel,IonAlert, IonFab, IonFabButton} from '@ionic/react';
import {calendar,cart,wifi,globeOutline,storefront,search} from 'ionicons/icons';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {address} from '../components/AddressService';
import { UpdateNew } from '../components/OfflineServices';
import { OfflineSearch } from '../components/OfflineServices';
import './Tab1.css';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [OnlineColor,setColor] = useState<string>("");
  const [Online,setOnline] = useState(wifi);
  const [searchv, setSearch] = useState<string>("");
  const [showAlert,setAlert] = useState(false);
  const [name,setName] = useState<string>("");
  const [exp,setExp] = useState<string>("");
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
  const TodaysDate = new Date();
  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
  useIonViewWillEnter(() => {
    const user = localStorage.getItem('user');
   // const user = localStorage.getItem('user');
    if(user===null){
      history.push("/login");
    }

    let parsed:any = localStorage.getItem("NewData");
    axios.get(`${address}App_Data/Inventory.php`,{
      params:{
        getData:1,
      },
    })
    .then((response:any)=>{
      setOnline(wifi);
      setColor("");
      localStorage.setItem("Offline",JSON.stringify(response.data));
      setData(response.data);
      setError("");
      if(parsed !== null){
        parsed = JSON.parse(parsed);
        UpdateNew(parsed);
      }
    })
    .catch((error:any)=>{
      setOnline(globeOutline);
      setColor("danger");
      setError("");
      let data:any = localStorage.getItem("Offline");
      let setIt = JSON.parse(data);
      setData(setIt);
    });
  });

  const onSubmit = (data:any) =>{
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
        setSearchData(data);
        console.log(searchData);
      setSearchError("");
      }else{
         setSearchData(data);
         setSearchError(`could not find ${searchv}`);
      }
    })
    .catch((error:any)=>{
      OfflineSearch(userData,setSearchData);
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
        <IonButton type="submit" className="sbtn"><IonIcon icon={search}/></IonButton>
        </form>
        {errors.productName && <IonBadge color="danger" className="general_padding">Product Name is required</IonBadge>}
        <div id="inv_main">
        {viewSearchError}
        <IonList>
        {searchData.map((items:any)=>{
          if(items.Quantity<=5){
                items.Quantity = <IonBadge color="danger"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }

              if(items.Quantity>10){
                items.Quantity = <IonBadge color="success"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }

              let expiryDate:any = new Date(items.ExpireDate);
              let currentDate:any =new Date();
              let DateSub = expiryDate-currentDate;
              if(DateSub<2548931590 && DateSub>0){
                items.ExpireDate = <IonBadge className="textPadding" color="warning"><IonIcon icon={calendar}/>Expiring On {items.ExpireDate}</IonBadge>
              }

              if(TodaysDate>=new Date(items.ExpireDate)){
                items.ExpireDate = <IonBadge className="textPadding" color="danger"><IonIcon icon={calendar}/>Expired On {items.ExpireDate}</IonBadge>
              }
              if(TodaysDate<new Date(items.ExpireDate)){
                items.ExpireDate = <IonBadge className="textPadding" color="success"><IonIcon icon={calendar}/>Expiry On {items.ExpireDate}</IonBadge>
              }

              if(items.Quantity<=10 && items.Quantity>5){
                items.Quantity = <IonBadge color="warning"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }
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

                  }}>
              <div className="ListItems">
                      <div className="Header"> 
                      <img src="./assets/media/pills.png" className="List_img" alt="" />     
                      <IonLabel className="SearchLabel">{items.productName}</IonLabel>
                      </div>
                      <br/>
                      <div className="itemsFlex">
                        <div>{items.Quantity}</div>
                        <div><IonIcon icon={storefront}/>{items.Provider}</div>
                        <div>{items.ExpireDate}</div>
                       
                       
                        
                      </div> 
            </div>
            </div>
            )
        })}
        </IonList>
          <h3>In-stock</h3>
          <div className="row_cards">
          {viewError}
          <IonList>
            {allData.map((items:any)=>{
              let expiryDate:any = new Date(items.ExpireDate);
              let currentDate:any =new Date();
              let DateSub = expiryDate-currentDate;
              if(DateSub<2548931590 && DateSub>0){
                items.ExpireDate = <IonBadge className="textPadding" color="warning"><IonIcon icon={calendar}/>Expiring On {items.ExpireDate}</IonBadge>
              }

              if(TodaysDate>=new Date(items.ExpireDate)){
                items.ExpireDate = <IonBadge className="textPadding" color="danger"><IonIcon icon={calendar}/>Expired On {items.ExpireDate}</IonBadge>
              }
              if(TodaysDate<new Date(items.ExpireDate)){
                items.ExpireDate = <IonBadge className="textPadding" color="success"><IonIcon icon={calendar}/>Expiry On {items.ExpireDate}</IonBadge>
              }

              if(items.Quantity<=10 && items.Quantity>5){
                items.Quantity = <IonBadge color="warning"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }

               if(items.Quantity<=5){
                items.Quantity = <IonBadge color="danger"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }

              if(items.Quantity>10){
                items.Quantity = <IonBadge color="success"><IonIcon icon={cart}/>{items.Quantity}</IonBadge>
              }

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
                        {items.Quantity}
                      </div>
                      <div>
                        <IonIcon icon={storefront}/>
                        <IonText className="textPadding">{items.Provider}</IonText>
                      </div>
                      <div>
                        {items.ExpireDate}
                      </div> 
                    </div>
                  </div>
               
                )
              })}
           </IonList>
          </div>
         
        </div>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton color={OnlineColor}> 
            <IonIcon icon={Online} />
          </IonFabButton>
        </IonFab>
        <IonAlert
      isOpen={showAlert}
      header={name}
      message={`Product Code ${code} <br/>
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

