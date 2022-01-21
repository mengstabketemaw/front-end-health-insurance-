import { useEffect, useState } from "react"

export const useGetFetch = (uri)=>{
    const [data, setData] = useState();
    const [sd,setSd] = useState(1);


    useEffect(()=>{

        fetch(uri)
            .then(data=>data.json())
            .then(setData)
            .then(()=>setSd(3))
            .catch(e=>{setSd(2);console.log(e)});

    },[uri]);


    return [data,sd,setData];

}