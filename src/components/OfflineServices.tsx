import axios from "axios";
import {address} from './AddressService';
import { useHistory } from 'react-router-dom';


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
              alert("Failed. Contact  Adminstrator");
            });
    });
    localStorage.removeItem("NewData");
    localStorage.setItem("NewData","[]");
  }


  export const UpdateInventoryItem=(data:any)=>{
    console.log(data);
   data.map((data:any)=>{
    axios.get(`${address}App_Data/InventoryMulti.php`,{
      params:{
        Withdraw:1,
        id:data.id,
        taken:data.value,
        remaining:data.remaining,
        user:data.user,
      },
    })
    .then((response:any)=>{
      if(response.data==1){
       console.log(response);
      }else{
        alert("Failed!")
      }
    })
    .catch((error:any)=>{
      alert("Failed. Contact  Adminstrator");
    });
   });
   localStorage.removeItem("WithdrawData");
   localStorage.setItem("WithdrawData","[]");
  }

export const OfflineSearch=(SearchData:string,setSearchData:any)=>{
  let Data:any = localStorage.getItem("Offline");
  Data = JSON.parse(Data);
  const Filtered = Data.filter((name:any)=>name.productName.toLowerCase().startsWith(SearchData));
  setSearchData(Filtered);
}

export const OfflineCodeSearch=(SearchData:string)=>{
  //const history = useHistory();
  let Data:any = localStorage.getItem("Offline");
  Data = JSON.parse(Data);
  console.log(Data.Code);
  const Filtered = Data.filter((name:any)=>name.Code.startsWith(SearchData));
  let First:any = Filtered[0];
  let lengthf = Filtered.length;
  if (lengthf<=0){
   return false;
  }else{
    localStorage.setItem('changeInventory',JSON.stringify(First));
    return true;
  }
}