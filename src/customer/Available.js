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


export default function Available(){
const [warn, setWarn] = useState("");
const [data,sd] = useGetFetch(`http://localhost:8080/customer/available`)
const customerId = localStorage.getItem("customerId");


const handleApply = (e)=>{
    const policy = e.target.name;
    setWarn("Appling........")
        fetch(`http://localhost:8080/customer/${customerId}/apply?policy=${policy}`) 
        .then(e=>{if(e.status===200)setWarn("Policy Applied Successfully"); else setWarn("Policy didin't applyed") })
        .catch((e)=>{setWarn("connection error, see console");console.log(e)});

}

if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)
return (
    <div>
        <h1>Available Policies</h1>
        <h4 color="red">{warn}</h4>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                 <TableRow>
                    <StyledTableCell>Policy Id.</StyledTableCell>
                    <StyledTableCell>Policy Name</StyledTableCell>
                    <StyledTableCell>Catagory</StyledTableCell>
                    <StyledTableCell>Premium</StyledTableCell>
                    <StyledTableCell>Tenure</StyledTableCell>
                    <StyledTableCell>Apply</StyledTableCell>
                 </TableRow>
                </TableHead>
                <TableBody>
            {
                data.map((e,i)=>{

                    return(
                        <StyledTableRow key = {i}>
                            <StyledTableCell>{e.id}</StyledTableCell>
                            <StyledTableCell>{e.name}</StyledTableCell>
                            <StyledTableCell>{e.catagory}</StyledTableCell>
                            <StyledTableCell>{e.premium}</StyledTableCell>
                            <StyledTableCell>{e.tenure}</StyledTableCell>
                            <StyledTableCell><button onClick={handleApply} name = {e.name}>Apply</button>  </StyledTableCell>
                      </StyledTableRow>
                    );

                })
            }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);
}