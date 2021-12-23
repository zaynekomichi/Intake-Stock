import { IonContent,IonCard,IonCardHeader,IonCardContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowUpOutline, downloadOutline, fileTrayFullOutline, scanCircleOutline, search, storefrontOutline } from "ionicons/icons";
import { useState } from "react";
import '../pages/Tab2.css';
import './How.css';

const How = ()=>{

    const [card_1, setCard1] =  useState(true);
    const [card_2, setCard2] =  useState(true);
    const [card_3, setCard3] =  useState(true);
    const [card_4, setCard4] =  useState(true);
    const [card_5, setCard5] =  useState(true);
    const [card_6, setCard6] =  useState(true);
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Guide</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <div hidden={card_1}>
            <IonCard>
                <IonCardHeader>
                    <IonTitle>Getting Started</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>
                        Welcome, congratulations on opening the app. That takes a lot of work.
                        Everything might seem complicated right now but it is easy. First off
                        start by exploring the applcation this helps you get a feel of what the app is about.
                        Dont be afraid to click buttons, you wont break anything. <b>Remember</b> to logout once you
                        are done using the application this will help keep check on the stock inventory, someone might and will 
                        use your account if you do not logout.
                    </p>
                </IonCardContent>
            </IonCard> 
            </div>
                <div className='Lists'>
                <div className='cards_row' onClick={()=>setCard1(false)}> 
                    <p>Getting started</p>
                    <IonIcon icon={storefrontOutline} size='large' />
                </div>
                <div className='cards_row'>
                    <p>Inventory</p>
                    <IonIcon icon={fileTrayFullOutline} size='large' />
                </div>
                <div className='cards_row'>
                    <p>Withdraw</p>
                    <IonIcon icon={downloadOutline} size='large' />
                </div>
                <div className='cards_row'>
                    <p>Scan</p>
                    <IonIcon icon={scanCircleOutline} size='large' />
                </div>
                <div className='cards_row'>
                    <p>Restock</p>
                    <IonIcon icon={arrowUpOutline} size='large' />
                </div>
                <div className='cards_row'>
                    <p>Search</p>
                        <IonIcon icon={search} size='large' />
                </div>          
            </div>
            
            </IonContent>
        </IonPage>
    );
}

export default How;