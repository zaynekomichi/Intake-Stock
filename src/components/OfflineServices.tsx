import axios from "axios";
import {address} from './AddressService';
export const UpdateNew= (data:any)=>{
    data.map((Items:any)=>{
        axios.get(`${address}App_Data/InventorySearch.php`,{
            params:{
                InsertData:1,
                productName:Items .name,
                quantity:Items.quantity,
                expireDate:Items.expire,
                receivedBy:Items.receivedBy,
                receiveDate:Items.receiveDate,
                code:Items.code,
                notes:Items.notes,
                provider:Items.provider
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
            })
    }).catch(()=>{
        alert("")
    });
}