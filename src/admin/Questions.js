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


export default function Questions(){
const [datar,sd,setDatar] = useGetFetch(`http://localhost:8080/admin/questions`);
const [warn, setWarn] = useState("");


const handleSend =(e)=>{
    if(e.key !== "Enter") return;
    const id = e.target.name;
    const answer = e.target.value;
    if(answer.trim()==="")return;

    setWarn("Seending Answer...")

    fetch(`http://localhost:8080/admin/answer?questionid=${id}&comment=${answer}`)
    .then(e=>{if(e.status===200)setWarn("Operation Successfull"); else {setWarn("Can't Send Question");return;}})
    .catch(e=>{setWarn("Error see console for more info");console.log(e)});

    const nd = datar.map(element => {
        if(element.id==id)
                element.comment=answer;
        return element;
    });
    setDatar(nd);
    
}

if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)

return(
    <div>
        <h1>Questions Asked By The Customers</h1>
        <h4 color="red">{warn}</h4>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell>Question</StyledTableCell>
                    <StyledTableCell>Comment</StyledTableCell>
                    <StyledTableCell>Modify</StyledTableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                    {
                        datar.map((e,i)=>{
                            return(
                                <tr key={i}>
                                    <StyledTableCell>{e.date}</StyledTableCell>
                                    <StyledTableCell>{e.customer_id}</StyledTableCell>
                                    <StyledTableCell>{e.customer_name}</StyledTableCell>
                                    <StyledTableCell>{e.question}</StyledTableCell>
                                    <StyledTableCell>{e.comment}</StyledTableCell>
                                    <StyledTableCell><textarea name={e.id} onKeyPress={handleSend} type={"text"}/></StyledTableCell>
                                </tr>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);
}