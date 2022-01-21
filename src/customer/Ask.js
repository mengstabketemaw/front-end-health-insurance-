import { useRef, useState } from "react"


export default function Ask(){
    const question = useRef();
    const [warn,setWarn] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = ()=>{
        const q = question.current.value;
        if(q.trim()===""){  setWarn("what...."); return;} 
        
        const id = localStorage.getItem("customerId");
        setLoading(true);
        fetch(`http://localhost:8080/customer/${id}/ask?question=${q}`)
            .then(e=>{if(e.status===200)setWarn("Question Sent"); else setWarn("Somthing is Wrong")})
            .then(()=>setLoading(false))
            .catch(console.log);

            question.current.value = ""
    }

    if(loading)
        return(<p>Sending pls waite....</p>)

    return <div>
        <h1>Ask Admin Question</h1>
        <label>Question: </label>
        <textarea ref = {question} type={"text"}/><br/><br/>
        <label>{warn}</label><br/>
        <button onClick={handleAsk}>Send</button>
    </div>
}