import { useState,useRef } from "react";
import { Button } from "@mui/material";

export default function ForgetPassword(){
    const [loading, setLoading] = useState(false);
    const name = useRef();
    const phone = useRef();
    const [warn,setWarn] = useState("");
    
    //here you have the login info you can send them or do what ever you want
    const handler = (event)=>{
        event.preventDefault();
        const email = name.current.value;
        const ph = phone.current.value;
        
        if(email.trim()===""||ph.trim()===""){setWarn("one or more field are empty");return}

        name.current.value = "";
        phone.current.value = "";

        setLoading(true);
        fetch("http://localhost:8080/forgetpassword",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:ph})})
                .then(e=>{if(e.status===200){ e.json().then( da=>{setWarn("your password is : "+da.password)} ) } else setWarn("autherntication error(change your email or password)");})
                .then(()=>setLoading(false))
                .catch((e)=>{setWarn("there is error");console.log(e)});

    }
    

    if(loading)
        return(<p>loading...</p>)

    return(
            <div>
                <h4>Forget Password</h4>
                <form>
                    <label>E-mail: </label><br/>
                    <input type = "email" ref = {name}/><br/><br/>
                    <label>Phone Number: </label><br/>
                    <input type = "number" ref = {phone}/><br/>
                    <label>{warn}</label><br/><br/>
                    <Button variant="contained" type = "submit" onClick={handler}>Get Password</Button>
                </form>
            </div>
        );
    
    }