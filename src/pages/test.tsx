import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar,IonButton,IonText,IonInput,useIonViewWillEnter,IonList,IonItem,IonIcon, IonCard,IonBadge,IonLabel,useIonAlert,IonAlert} from '@ionic/react';
import {flaskSharp,calendar,cart,clipboard,storefront,qrCode,search} from 'ionicons/icons';
import {useState,useEffect} from 'react';
import db from '../components/Firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';




const Testing:React.FC = () =>{
  const [getUsers,setUsers] = useState<any>([]);
   const getCities=async(db)=> {
    const Users = collection(db, 'Inventory');
    const usersSnapshot = await getDocs(Users);
    const cityList = await usersSnapshot.docs.map(doc=> doc.data());
    // const Users = collection(db, 'Inventory');
    // const usersSnapshot = await getDocs(Users);
    // const cityList = usersSnapshot.docs.map(doc=> doc.data());
    let auth = cityList;
    console.log(auth);
    return cityList;
}

getCities(db);
  return(
    <h1>Hello</h1>
    
    );
}

export default Testing;