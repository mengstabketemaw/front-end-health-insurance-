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



export default function Applied({customerId}){

const [data, sd] = useGetFetch(`http://localhost:8080/customer/${customerId}/applied`);

if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)
return (
        <div>
            <h1>Applied Policies</h1>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                 <TableRow>
                   <StyledTableCell>Applied Policy Id.</StyledTableCell>
                   <StyledTableCell>Policy</StyledTableCell>
                   <StyledTableCell>Status</StyledTableCell>
                   <StyledTableCell>Applied Date</StyledTableCell>
               </TableRow>
               </TableHead>
                <TableBody>
                {
                    data.map((e,i)=>{
    
                        return(

                            <TableRow>
                                <StyledTableCell>{e.id}</StyledTableCell>
                                <StyledTableCell>{e.policy}</StyledTableCell>
                                <StyledTableCell>{e.status}</StyledTableCell>
                                <StyledTableCell>{e.date}</StyledTableCell>
                              </TableRow>
    
                        );
    
                    })
                }
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}