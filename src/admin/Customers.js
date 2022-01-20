import { useState,useEffect } from "react";
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


export default function Customers(){
const [datar,sd,setDatar] = useGetFetch(`http://localhost:8080/admin/customers`);
const [warn, setWarn] = useState("");

const handleDelete = (e)=>{
    const id = e.target.name;
    setWarn("....");
    fetch(`http://localhost:8080/admin/delete?customerid=${id}`)
        .then(e=>{if(e.status===200)setWarn("Operation Successfull");else {setWarn("cannot delete");return;}})
        .catch((e)=>{console.log(e);setWarn("there is error check console for more information")});
    const nd = datar.filter((e)=>e.id!=id);
    setDatar(nd);

}

if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)
return (
    <div>
        <h1>All Customers/USER Registerd To The System</h1>
        <h4 color="red">{warn}</h4>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                 <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Phone</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                  datar.map((e,i)=>{
                      return <StyledTableRow key = {i}>
                          <StyledTableCell>{e.fullname}</StyledTableCell>
                          <StyledTableCell>{e.email}</StyledTableCell>
                          <StyledTableCell>{e.phone}</StyledTableCell>
                          <StyledTableCell><button onClick={handleDelete} name = {e.id}>DELETE</button></StyledTableCell>
                          </StyledTableRow>
                  })  
                }
            </TableBody>
            </Table>
        </TableContainer>
        
    </div>
);
}