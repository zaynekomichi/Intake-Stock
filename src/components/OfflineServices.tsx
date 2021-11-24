import axios from "axios";
import {address} from './AddressService';
export const UpdateNew=(data:any)=>{
  let Failed = [];
    data.map((Items:any)=>{
         axios.get(`${address}App_Data/InsertInventory.php`,{
            params:{
                InsertData:1,
                productName:Items.productName,
                quantity:Items.Quantity,
                expireDate:Items.ExpireDate,
                receivedBy:Items.ReceivedBy,
                receiveDate:Items.ReceiveDate,
                code:Items.Code,
                notes:Items.Notes,
                provider:Items.Provider
            },
          })
          .then((response:any)=>{
            if(response.data==1){
               console.log('updated');
              }else if(response.data==2){
                return (alert(`${Items.productName} code is already in the database cannot add duplicate code`));
              }else{
                alert("Failed")
              }
            }).catch((error)=>{
                let catche = {
                "productName":Items .name,
                "quantity":Items.quantity,
                "expireDate":Items.expire,
                "receivedBy":Items.receivedBy,
                "receiveDate":Items.receiveDate,
                "code":Items.code,
                "notes":Items.notes,
                "provider":Items.provider
                }
                Failed.push(catche);
            });
    });
    localStorage.removeItem("NewData");
    localStorage.setItem("NewData","[]");
  }

export const OfflineSearch=(SearchData:string,setSearchData:any)=>{
  let Data:any = localStorage.getItem("Offline");
  Data = JSON.parse(Data);
  const Filtered = Data.filter((name:any)=>name.productName.startsWith(SearchData));
  setSearchData(Filtered);
}