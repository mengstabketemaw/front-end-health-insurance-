import { useState } from "react";
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



export default function Applied(){
const [warn, setWarn] = useState("");
const [datar,sd, setData] = useGetFetch(`http://localhost:8080/admin/appliedpolicies`)


   const handleDelete = (e)=>{
        const id = e.target.name;
        setWarn("deleteing.....")
        fetch(`http://localhost:8080/admin/deleteappliedpolicy?policyid=${id}`)
            .then(e=>{if(e.status===200)setWarn("Operation Successfull"); else {setWarn("Unsuccuessfull");return}})
            .catch(e=>{setWarn("Error see console for more info");console.log(e);return;});

        const nd = datar.filter(ele => ele.id != id);
        setData(nd);
        }

    const handleApprove = (e)=>{
        const id = e.target.name;
        setWarn("approving.....")
        fetch(`http://localhost:8080/admin/approve?policyid=${id}`)
            .then(e=>{if(e.status===200)setWarn("Operation Successfull"); else {setWarn("Unsuccuessfull");return}})
            .catch(e=>{setWarn("Error see console for more info");console.log(e)});

        const nd = datar.map((e,i)=>{
            if(e.id == id)
                return ({...e,status:"Approved"})
            return e;
        })
        setData(nd);
        
    }

    const handleDisapprove = (e)=>{
        const id = e.target.name;
        setWarn("disapproving.....")
        fetch(`http://localhost:8080/admin/disapprove?policyid=${id}`)
            .then(e=>{if(e.status===200)setWarn("Operation Successfull"); else {setWarn("Unsuccuessfull");return}})
            .catch(e=>{setWarn("Error see console for more info");console.log(e)});

        const nd = datar.map((e,i)=>{
            if(e.id==id)
                return ({...e,status:"Disapproved"})
            return e;
        })
        setData(nd);
    }

 if(sd===1)
     return <><p>loading...</p></>
 if(sd===2)
     return <p>There is error check console or try other operation</p>
 if(sd===3)
    return(
        <div>
            <h1>All Policies Applied For!</h1>
            <h4 color="red">{warn}</h4>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                 <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>A.Policy ID.</StyledTableCell>
                        <StyledTableCell>Customer ID</StyledTableCell>
                        <StyledTableCell>Customer Name</StyledTableCell>
                        <StyledTableCell>Policy</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Approve</StyledTableCell>
                        <StyledTableCell>Disapprove</StyledTableCell>
                        <StyledTableCell>Remove</StyledTableCell>
                 </TableRow>
                </TableHead>
               <TableBody>
                    {
                        datar.map((e,i)=>{
                            
                            return <StyledTableRow key = {i}>
                                <StyledTableCell>{e.date}</StyledTableCell>
                                <StyledTableCell>{e.id}</StyledTableCell>
                                <StyledTableCell>{e.customer_id}</StyledTableCell>
                                <StyledTableCell>{e.customer_name}</StyledTableCell>
                                <StyledTableCell>{e.policy}</StyledTableCell>
                                <StyledTableCell>{e.status}</StyledTableCell>
                                <StyledTableCell><button onClick={handleApprove} name = {e.id}>Approve</button></StyledTableCell>
                                <StyledTableCell><button onClick={handleDisapprove} name = {e.id}>Disapprove</button></StyledTableCell>
                                <StyledTableCell><button onClick={handleDelete} name = {e.id}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                        })
                    }
                  </TableBody>
             </Table>
        </TableContainer>>
        </div>
    );
   
}