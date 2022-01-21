import Home from "./home/Home"
import Customer from "./customer/Customer";
import Admin from "./admin/Admin";
import { useState } from "react";


function App() {

const [customerData,setCustomerData] = useState({changer:"home",customer:"",customerId:0});

const logOut = ()=>{
setCustomerData({changer:"home",customerId:0,customer:""})
}



  return(
      customerData.changer==="home"?<Home data={setCustomerData}/>:
      customerData.changer==="admin"?<Admin logoutHandler={e=>logOut()}/>:
      <Customer dataleg={customerData} logoutHandler={e=>logOut()}/>
  );


}

export default App;
