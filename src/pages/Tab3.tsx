import { IonContent,IonIcon, IonHeader,useIonViewWillEnter, IonPage, IonTitle, IonToolbar, IonSearchbar,IonText,IonList,IonItem,IonLabel } from '@ionic/react';
import {settings,person,personCircle, cloudDownload,helpCircle,informationCircle, analytics,documentText,flash} from 'ionicons/icons';
import {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user,setUser]=useState<string>("");
  const history = useHistory();
  useIonViewWillEnter(() => {
    const user = localStorage.getItem('user');
    if(user===null){
      history.push("/login");
    }else{
      setUser(user);
    }
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className="generalAlignment">
      <div>
        <IonIcon icon={personCircle}  className='generalIconSize'/>
      </div>
      <div>
        <IonText className="general_text">Hello {user}</IonText>
      </div>
      </div>
      <div className="general_shadow"> 
        <IonList className="general_list_styling">
          <IonItem>
            <IonIcon icon={settings}/>
            <IonLabel className="generalLabel"> Settings</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={person}/>
            <IonLabel className="generalLabel"> Account Info</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={cloudDownload}/>
            <IonLabel className="generalLabel">Data Recovery</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={helpCircle}/>
            <IonLabel className="generalLabel">How to use app</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={informationCircle}/>
            <IonLabel className="generalLabel">FAQ</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={analytics}/>
            <IonLabel className="generalLabel">App Usage</IonLabel>
          </IonItem>
          <IonItem>
          <IonIcon icon={documentText}/>
            <IonLabel className="generalLabel">License</IonLabel>
          </IonItem>
           <IonItem>
           <IonIcon icon={flash}/>
            <IonLabel className="generalLabel">About</IonLabel>
          </IonItem>
        </IonList>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
