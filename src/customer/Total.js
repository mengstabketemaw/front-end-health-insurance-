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


export default function Total({customerId}){
const [data,sd] = useGetFetch(`http://localhost:8080/customer/${customerId}/questions`);


if(sd===1)
    return <><p>loading...</p></>
if(sd===2)
    return <p>There is error check console or try other operation</p>
if(sd===3)
    return(
        <div>
            <h1>Total Question Asked</h1>

            <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                     <TableHead>
                         <TableRow>
                            <StyledTableCell>Asked Date</StyledTableCell>
                            <StyledTableCell>Question Asked</StyledTableCell>
                            <StyledTableCell>Admin Comment</StyledTableCell>
                         </TableRow>
                     </TableHead>

                <TableBody>
                    {
                        data.map((e,i)=>{
                            return <TableRow key={i}>
                                <StyledTableCell>{e.date}</StyledTableCell>
                                <StyledTableCell>{e.question}</StyledTableCell>
                                <StyledTableCell>{e.comment}</StyledTableCell>
                            </TableRow>
                        })
                    }
                </TableBody>

            </Table>
        </TableContainer>
        </div>
    );
}