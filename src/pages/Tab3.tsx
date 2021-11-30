import { IonContent,IonIcon,IonButton, IonHeader,useIonViewWillEnter, IonPage, IonTitle, IonToolbar, IonSearchbar,IonText,IonList,IonItem,IonLabel } from '@ionic/react';
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
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="background">
      <div className="generalAlignment">
      <div>
        <img src="./assets/media/logout.png" alt="" />
      </div>
      <div>
        <IonText className="general_text">Hello {user}</IonText>
      </div>
      <div>
        <IonText>Please logout when you are done using the application to protect your account</IonText>
      </div>
      <div>
        <IonButton className="btn" onClick={()=>{logout()}}>LOGOUT</IonButton>
      </div>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
