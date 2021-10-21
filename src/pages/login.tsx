import { Redirect, Route,useHistory } from 'react-router-dom';
import {IonApp,IonPage,IonHeader,IonButton,useIonViewWillEnter,IonCard,IonToolbar,IonContent,IonTitle,IonInput,IonText,IonAlert,useIonAlert,IonIcon,IonLabel,IonRouterOutlet,IonTabBar,IonTabButton,IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle,qrCode,scanOutline,fileTrayFullOutline } from 'ionicons/icons';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {useForm,Controller} from 'react-hook-form';
import '@ionic/react/css/core.css';
import './login.css';

const Login: React.FC = () =>{

const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"onTouched",
    reValidateMode:"onChange"
  });
const [codeValue,setCode] = useState<string>("");
const history = useHistory();
useIonViewWillEnter(() => {
    setCode("");
});
const onSubmit=(data:any)=>{
  const code = data.code;
  axios.get('http://192.168.1.23/App_Data/Users.php',{
      params:{
        getUser:1,
        code:code,
      }
    })
    .then((response:any)=>{
      //assign response variable
      console.log(response);
      let parsed:any = response.data;

      //check if response contains any data
      if(parsed !== ''){
         localStorage.setItem('user',response.data);
         history.push('/tab1');
      }else{
         alert("Failed to login")
      }
    })
    .catch((error)=>{
      alert(error);
    });
}
return ( 
 <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Login</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonCard>
      <img src="./assets/media/Login.png" alt=""/>
      <div className="login_page">
      <form onSubmit={handleSubmit(onSubmit)} className="login_form">
        <IonInput type="password" placeholder="Login Code" {...register("code",{required:true})}className="login_input" onIonChange={e=>{setCode(e.detail.value!)}} value={codeValue}/>
        <IonButton type="submit" className="login_btn">Login</IonButton>
      </form>
      </div>
    </IonCard>
  </IonContent>
  </IonPage>
);
}

export default Login;
