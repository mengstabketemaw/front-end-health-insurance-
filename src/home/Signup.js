import { useRef,useState } from "react";
import { Button } from "@mui/material";

export default function SignUp({setWhichForm}){

    const [loading, setLoading] = useState(false);
    const name = useRef();
    const password = useRef();
    const confpassword = useRef();
    const fullname = useRef();
    const phone = useRef();
    const [warn,setWarn] = useState("");
    
    //here you have the login info you can send them or do what ever you want

    const handler = (event)=>{
        event.preventDefault();
        const email = name.current.value;
        const pass = password.current.value;
        const confpass = confpassword.current.value;
        const fname = fullname.current.value;
        const ph = phone.current.value;

        if(pass!==confpass||email===""||pass===""||fname===""||ph===""){setWarn("Password doesn't match");return;}


        name.current.value = "";
        password.current.value = "";
        confpassword.current.value = "";
        fullname.current.value = "";
        phone.current.value = "";

        setLoading(true);
        fetch("http://localhost:8080/signup",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({name:fname,email,phone:ph,password:pass})})
                .then(e=>{if(e.status===200)setWarn("Successfully Registered"); else setWarn("autherntication error(change your email or password)");})
                .then(()=>setLoading(false))
                .catch((e)=>{setWarn("there is error");console.log(e)});
        
    }
    
    if(loading===true)
        return (<p>loading...</p>);

    return(
            <div>
                <h4>SignUp</h4>
                <form>
    
                    <label>Full Name: </label><br/>
                    <input type = "text" ref = {fullname}/><br/><br/>

                    <label>E-mail: </label><br/>
                    <input type = "email" ref = {name}/><br/><br/>

                    <label>Password: </label><br/>
                    <input type = "password" ref = {password}/><br/><br/>
                    <label>Confirm Password: </label><br/>
                    <input type = "password" ref = {confpassword}/><br/><br/>

                    <label>Phone Number: </label><br/>
                    <input type = "number" ref = {phone}/><br/><br/>

                    <label>{warn}</label><br/><br/>
                    <Button variant="contained" type = "submit" onClick={handler}>Register</Button>
                </form>
            </div>
        );
    }