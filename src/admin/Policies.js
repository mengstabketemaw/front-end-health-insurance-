import { useRef, useState } from "react";
import { useGetFetch } from "../hooks/fetchhooks";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Policies(){
    const [datar,sd,setDatar] = useGetFetch(`http://localhost:8080/customer/available`);
    const [warn,setWarn] = useState("");
    const [warn2,setWarn2] = useState("");
    const pname = useRef();
    const cat = useRef();
    const pre = useRef();
    const ten = useRef();

    const handleDelete = (e)=>{
        const id = e.target.name;
        setWarn2("....")
        fetch(`http://localhost:8080/admin/deletepolicy?policyid=${id}`)
            .then(e=>{if(e.status===200)setWarn2("Operation Successfull"); else {setWarn2("cannot delete");return;}})
            .catch(e=>{setWarn2("Error see console for more info");console.log(e)});
        //here lay a delete request 
        const nd = datar.filter((e)=>e.id!=id)
        setDatar(nd);
    };
    
    const handleAdd=(e)=>{
        e.preventDefault();
        const name = pname.current.value;
        const catagory = cat.current.value;
        const premium = pre.current.value;
        const tenure = ten.current.value;

        if(name===""||catagory===""||premium===""||tenure===""){setWarn("one or more field are empty");return;}

        setWarn("Adding....")
        fetch(`http://localhost:8080/admin/addpolicy`,{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify({name,catagory,premium,tenure})})
            .then(e=>{if(e.status==200)setWarn("Policy added"); else {setWarn("Policy is NOT_ADDED");return;}})
            .catch(e=>{setWarn("there is error check the console for more info");console.log(e)});

        setDatar([...datar,{id:datar.length,name,catagory,premium,tenure}]);
        pname.current.value="";
        cat.current.value="";
        pre.current.value="";
        ten.current.value="";

    };
    
if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)   
    return (
        <div>
            <h1>All Policies</h1>
            <h4 color="red">{warn2}</h4>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                 <TableRow>
                   <StyledTableCell>Policy ID.</StyledTableCell>
                   <StyledTableCell>Policy Name</StyledTableCell>
                   <StyledTableCell>Catagory</StyledTableCell>
                   <StyledTableCell>Premium</StyledTableCell>
                   <StyledTableCell>Tenure</StyledTableCell>
                   <StyledTableCell>Remove</StyledTableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
    
                {
                    datar.map((e,i)=>{
    
                        return(
                            <StyledTableRow key = {i}>
                                <StyledTableCell>{e.id}</StyledTableCell>
                                <StyledTableCell>{e.name}</StyledTableCell>
                                <StyledTableCell>{e.catagory}</StyledTableCell>
                                <StyledTableCell>{e.premium}</StyledTableCell>
                                <StyledTableCell>{e.tenure}</StyledTableCell>
                                <StyledTableCell><button onClick={handleDelete} name = {e.id}>DELETE</button></StyledTableCell>
                            </StyledTableRow>
    
                        );
    
                    })
                }
                </TableBody>
            </Table>
        </TableContainer>
            <h2>Add Policy</h2>
            <form>
                <label>Policy Name:</label> <br/><input ref = {pname} type={"text"}/><br/><br/>
                <label>Catagory:</label> <br/><input ref = {cat} type={"text"}/><br/><br/>
                <label>Premium:</label><br/> <input ref = {pre} type={"number"}/><br/><br/>
                <label>Tenure:</label><br/> <input ref = {ten} type={"number"}/><br/><br/>
                <label>{warn}</label><br/>
                <button onClick={handleAdd} type={"submit"}>Add</button>
            </form>
            
        </div>
    );
    }