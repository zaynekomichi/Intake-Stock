import { IonContent,IonButton, IonHeader,useIonViewWillEnter, IonPage, IonTitle, IonToolbar,IonText,IonIcon, IonList, IonItem} from '@ionic/react';
import {logOut,informationCircleOutline,helpOutline, documentTextOutline, cloudOutline, business, businessOutline, lockClosed, lockClosedOutline, hammerOutline} from 'ionicons/icons'
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [allData,setData] = useState<any>([]);
  const [user,setUser]=useState<string>("");
  const history = useHistory();
  useIonViewWillEnter(() => {
    const user = localStorage.getItem('user');
    if(user===null){
      history.push("/login");
    }else{
      setUser(user);
    }

    let parsed:any = localStorage.getItem("NewData");
  parsed = JSON.parse(parsed);
  setData(parsed);
  });
  
  const logout=()=>{
    localStorage.removeItem('user');
    history.push("/login");
  }

  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='generalflex'>
          <IonTitle>{user}</IonTitle>
          <IonIcon icon={logOut} size='large' color="primary" onClick={()=>{logout()}}/>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="background">
      <div className="generalAlignment">
      <div>
        <img src="./assets/media/logout.png" alt="" />
      </div>
      <div>
      <p >
      Welcome, congratulations on opening the app. That takes a lot of work.Everything might seem complicated
       right now but it is easy. First offstart by exploring the applcation this helps you get a feel of what
        the app is about.Dont be afraid to click buttons, you wont break anything. Remember to logout once you
        re done using the application this will help keep check on the stock inventory, someone might and will
         use your account if you do not logout.'
      </p>
      </div>
      </div>
     
      {/* <IonList>
        <IonItem onClick={()=>history.push('/How')}><IonIcon icon={informationCircleOutline} size='large'/>&nbsp;<IonText>How To Use App</IonText> </IonItem>
        <IonItem onClick={()=>history.push('/Storage')}><IonIcon icon={cloudOutline} size='large'/>&nbsp;<IonText>Storage</IonText></IonItem>
        <IonItem onClick={()=>history.push('/Troubleshoot')}><IonIcon icon={hammerOutline} size='large'/>&nbsp;<IonText> Troubleshooting</IonText></IonItem>
        <IonItem onClick={()=>history.push('/Terms')}><IonIcon icon={documentTextOutline} size='large'/> &nbsp;<IonText></IonText>Terms and conditions</IonItem>
        <IonItem onClick={()=>history.push('/Help')}><IonIcon icon={helpOutline} size='large'/> &nbsp;<IonText>Help</IonText></IonItem>
        <IonItem onClick={()=>history.push('/Security')}><IonIcon icon={lockClosedOutline} size='large'/>&nbsp;<IonText> Security</IonText></IonItem>
        <IonItem onClick={()=>history.push('/About')}><IonIcon icon={businessOutline} size='large'/>&nbsp;<IonText> About</IonText></IonItem>
      </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
