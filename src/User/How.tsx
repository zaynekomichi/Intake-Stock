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
            <div hidden={card_1}>
            <IonCard>
                <IonCardHeader>
                    <IonTitle>Getting Started</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
            </IonCard> 
            </div>
            </IonContent>
        </IonPage>
    );
}

export default How;