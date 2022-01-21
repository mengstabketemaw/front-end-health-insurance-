import Login from "./Login";
import Signup from "./Signup"
import ForgetPassword from "./ForgetPassword"
import { useState } from "react";
import Contactus from "./Contactus";
import AboutUs from "./AboutUs";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Home.css"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home({data}){

const [whichForm,setWhichForm] = useState("login");
const handleForget = ()=>setWhichForm("forget");
const handleSignup = ()=>setWhichForm("signup");
const handleLogin = ()=>setWhichForm("login");
    return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
              <Grid item xs={12}>
                  <Item><h1>Health Insurance Managment System</h1></Item>
              </Grid>
                   

               <Grid item xs={12}>
                <Item>
                <button className = {"homebutton"} onClick = {handleSignup}>SignUp</button>
                <button className = {"homebutton"} onClick={handleForget}>Forget Password</button>
                <button className = {"homebutton"} onClick={handleLogin}>Login</button>


            {
                whichForm === "login" ? <Login data={data}/> :
                whichForm === "signup" ? <Signup data={setWhichForm}/> :
                <ForgetPassword/>
            }
             </Item>
               </Grid>
                       
            <Grid item xs={4}>
                <Accordion>
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content"   id="panel1a-header"  >
                         <Typography>Contact us</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {<Contactus/>}
                    </AccordionDetails>
                </Accordion>
            </Grid>
         </Grid>
        </Box>
    );

}




