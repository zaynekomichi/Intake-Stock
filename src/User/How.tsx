import { IonContent,IonCard,IonCardHeader,IonCardContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowUpOutline, downloadOutline, fileTrayFullOutline, scanCircleOutline, search, storefrontOutline, text } from "ionicons/icons";
import { useState } from "react";
import { Text } from "./pageText";
import '../pages/Tab2.css';
import './How.css';

const How = ()=>{

    const [card_1, setCard1] =  useState(true);
    const [heading,setheading] = useState<string>();
    const [Info,setInfo] = useState<string>();
    const TextInject = (data:Number) =>{
        switch(data){
            case 1:
                setheading(Text[1].heading);
                setInfo(Text[1].Info);
                break;
            case 2:
                setheading(Text[2].heading);
                setInfo(Text[2].Info);
                break;
            case 3:
                setheading(Text[3].heading);
                setInfo(Text[3].Info);
                break;
            case 4:
                setheading(Text[4].heading);
                setInfo(Text[4].Info);
                break;
            case 5:
                setheading(Text[5].heading);
                setInfo(Text[5].Info);
                break;
            case 6:
                setheading(Text[6].heading);
                setInfo(Text[6].Info);
                break;
            default:
                setCard1(true);
        }
    }
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
                    <IonTitle>{heading}</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>
                        {Info}
                    </p>
                </IonCardContent>
            </IonCard> 
            </div>
                <div className='Lists'>
                <div className='cards_row' onClick={()=>
                {TextInject(1); setCard1(false);}}> 
                    <p>Getting started</p>
                    <IonIcon icon={storefrontOutline} size='large' />
                </div>
                <div className='cards_row' onClick={()=>{
                    TextInject(2); setCard1(false);}}>
                    <p>Inventory</p>
                    <IonIcon icon={fileTrayFullOutline} size='large' />
                </div>
                <div className='cards_row' onClick={()=>{
                    TextInject(3); setCard1(false);}}>
                    <p>Withdraw</p>
                    <IonIcon icon={downloadOutline} size='large' />
                </div>
                <div className='cards_row' onClick={()=>{
                    TextInject(4); setCard1(false);}}>
                    <p>Scan</p>
                    <IonIcon icon={scanCircleOutline} size='large' />
                </div>
                <div className='cards_row' onClick={()=>{
                    TextInject(5); setCard1(false);}}>
                    <p>Restock</p>
                    <IonIcon icon={arrowUpOutline} size='large' />
                </div>
                <div className='cards_row' onClick={()=>{
                    TextInject(6); setCard1(false);}}>
                    <p>Search</p>
                        <IonIcon icon={search} size='large' />
                </div>          
            </div>
            
            </IonContent>
        </IonPage>
    );
}

export default How;