import { useRef,useState } from "react";


export default function Contactus(){
    const name = useRef();
    const fullname = useRef();
    const comment = useRef();
    const [warn,setWarn] = useState("");
    
    //here you have the login info you can send them or do what ever you want
    const handler = (event)=>{
        event.preventDefault();
        const email = name.current.value;
        const fname = fullname.current.value;
        const com = comment.current.value;
        
        if(email===""||fname===""||com===""){
        setWarn( "one or more field is empty");
        }
        console.log(email + fname+com);
        name.current.value = "";
        fullname.current.value = "";
        comment.current.value = "";

        setWarn("your comment has been sent to the developers! TanQ");
    }
    
    return(
            <div>
                <h4>Contact Us</h4>
                <form>
    
                    <label>Full Name: </label>
                    <input type = "text" ref = {fullname}/><br/><br/>

                    <label>E-mail: </label>
                    <input type = "email" ref = {name}/><br/><br/>
    
                    <label>Comment: </label>
                    <input type = "text"  ref = {comment}/><br/><br/>

                    <label>{warn}</label><br/><br/>
                    <button type = "submit" onClick={handler}>Send</button>
                </form>
            </div>
        );
    
    }