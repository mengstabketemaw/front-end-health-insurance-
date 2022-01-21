import { useState } from "react";
import Available from "./Available";
import Ask from "./Ask"
import Applied from "./Applied"
import Policy from "./Policy";
import Total from "./Total";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cyan } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor:cyan,
}));




export default function Customer({dataleg,logoutHandler}){
const [current, setCurrent]= useState("");

localStorage.setItem("customerId",dataleg.customerId)
localStorage.setItem("customer",dataleg.customer)

const handleAvp = ()=> {setCurrent("available");};
const handleAp = ()=> {setCurrent("applied")};
const handlePc = ()=> {setCurrent("policy")};
const handleTqa = ()=> {setCurrent("total")};
const handleAq = ()=> {setCurrent("ask")};
const handleLogout = ()=>{logoutHandler()} //pls solve the variable names.

return(
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <Item><h1>Health Insurance Managment System</h1></Item>
        </Grid>
        <Grid item xs={12}>
        <Item><h3>Wellcome {dataleg.customer}</h3></Item>
        </Grid>

        <Grid item xs={12}>
            <Item>
                <button className = {"homebutton"}  onClick={handleAvp}>Available Policy</button>
                <button className = {"homebutton"}  onClick={handleAp}>Applied Policy</button>
                <button className = {"homebutton"}  onClick={handlePc}>Policy Catagory</button>
                <button className = {"homebutton"}  onClick={handleTqa}>Total Question Asked</button>
                <button className = {"homebutton"}  onClick={handleAq}>Ask Question</button>
                <button className = {"homebutton"}  onClick={handleLogout}>Logout</button>
            </Item>
        </Grid>
   
        <Grid item xs={12}>
            <Item>
                {
                current===""?<></>:
                current==="available"?<Available/>:
                current==="applied"?<Applied customerId={dataleg.customerId} />:
                current==="policy"?<Policy />:
                current==="total"?<Total customerId={dataleg.customerId} />:
                <Ask data={dataleg}/>
                }
                
            </Item>
        </Grid>
  
   </Grid>
 </Box>
);

}