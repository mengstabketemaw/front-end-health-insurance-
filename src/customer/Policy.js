import { Paper } from "@mui/material";
import { useState } from "react";
import { useGetFetch } from "../hooks/fetchhooks";


export default function Policy(){
const [selected,setSelected] = useState(false);
const [data,sd] = useGetFetch(`http://localhost:8080/customer/catagory`);
const [policyD,setPolicyD] = useState();


const handlePolicy = (e)=>{
    const index = e.target.name;
    setPolicyD(data[index]);
    setSelected(true);
};

if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)
    return (
        <div>
            <h1>Policies Catagory</h1>
            {
                data.map((e,i)=>{
                    return(
                        <button className = {"homebutton2"} key={i} onClick = {handlePolicy} name = {i}>{e.name}</button>
                    );
                })
            }
            <Paper elevation={3}>
            {

                (function(){
                    if(selected)
                        return <>
                            <h1>Policy : {policyD.name}</h1>
                            <h3>Price : {policyD.price} Birr</h3>
                            <h3>Duration : {policyD.duration} month</h3>
                            <h3>Description : {policyD.description}</h3>
                        </>
                })()
            
            }
            </Paper>
        </div>
    );





}