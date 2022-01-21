import { useState } from "react";
import Applied from "./Applied";
import Policy from "../customer/Policy";
import Customers from "./Customers";
import Questions from "./Questions";
import Policies from "./Policies";
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




export default function Admin({logoutHandler}){
    const [current, setCurrent]= useState("");

    const handleCustomers = ()=> {setCurrent("customers");};
    const handlePolicies = ()=> {setCurrent("policies")};
    const handleApplied = ()=> {setCurrent("applied")};
    const handleCatagory = ()=> {setCurrent("catagory")};
    const handleQuestions = ()=> {setCurrent("questions")};
    const handleLogout = ()=> {logoutHandler()}
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
              <Item><h1>Health Insurance Managment System</h1></Item>
          </Grid>
          <Grid item xs={12}>
              <Item><h3>Wellcome ADMIN</h3></Item>
          </Grid>

          <Grid item xs={12}>
             <Item>
        <button className="homebutton" onClick={handleCustomers}>Customers</button>
        <button className="homebutton" onClick={handlePolicies}>Policies</button>
        <button className="homebutton" onClick={handleApplied}>Policies Applied For</button>
        <button className="homebutton" onClick={handleCatagory}>Catagory</button>
        <button className="homebutton" onClick={handleQuestions}>Questions</button>
        <button className="homebutton" onClick={handleLogout}>Logout</button>
            </Item>
        </Grid>
        <Grid item xs={12}>
            <Item>   
                {
                current===""?<></>:
                current==="customers"?<Customers />:
                current==="policies"?<Policies/>:
                current==="applied"?<Applied />:
                current==="catagory"?<Policy />:
                <Questions/>
                }         
           </Item>
        </Grid>
   </Grid>
 </Box>
    );
}