import { useRef, useState } from "react";
import { Button } from "@mui/material";

export default function Login({data}){

const [loading, setLoading] = useState(false);
const name = useRef();
const password = useRef();
const [warn,setWarn] = useState("");

//here you have the login info you can send them or do what ever you want
const handler = (event)=>{
    event.preventDefault();
    const email = name.current.value;
    const pass = password.current.value;

    if(email===""||pass===""){
    setWarn( "One or more field is empty");return;}

    name.current.value = "";
    password.current.value = "";
        

    setLoading(true);
    fetch("http://localhost:8080/login",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({name:email,password:pass})})
        .then(e=>{if(e.status===200){e.json().then( da=>{ data(ps=>{if(email==="admin")return {changer:"admin",customer:da.name,customerId:da.id};return {changer:"customer",customer:da.name,customerId:da.id};})  }  )} else setWarn("Incorrect password or email");})
        .then(()=>setLoading(false))
        .catch((e)=>{setWarn("there is error");console.log(e)});
}

if(loading)
    return(<p>loading...</p>)

return(
        <div>
            <h4>Login</h4>
            <form>
                <label>E-mail: </label><br/>
                <input type = "email" ref = {name}/><br/><br/>
                <label>Password: </label><br/>
                <input type = "password" ref = {password}/><br/><br/>
                <label>{warn}</label><br/><br/>
                <Button variant="contained" type = "submit" onClick={handler}>Login</Button>
            </form>
        </div>
    );

}