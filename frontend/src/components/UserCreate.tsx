import React from 'react'

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

import Snackbar from "@material-ui/core/Snackbar";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { UsersInterface } from "../models/IUser";

import NativeSelect from '@material-ui/core/NativeSelect';
import { InputLabel } from "@material-ui/core";


function Alert(props: AlertProps) {

 return <MuiAlert elevation={6} variant="filled" {...props} />;

}


const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   root: {flexGrow: 1},

   container: {marginTop: theme.spacing(2)},

   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},

 })

);


function UserCreate() {

 const classes = useStyles();

 const [user, setUser] = React.useState<Partial<UsersInterface>>({});

 const [success, setSuccess] = React.useState(false);

 const [error, setError] = React.useState(false);


 const handleClose = (event?: React.SyntheticEvent, reason?: string) => {

   if (reason === "clickaway") {

     return;

   }

   setSuccess(false);

   setError(false);

 };

 const handleInputChange = (

   event: React.ChangeEvent<{ id?: string; value: any }>

 ) => {

   const id = event.target.id as keyof typeof UserCreate;

   const { value } = event.target;

   setUser({ ...user, [id]: value });

 };


 function submit() {

   let data = {

     Name: user.Name ?? "",

     IDCard: user.IDCard ?? "",

     Faculty: user.Faculty ?? "",

     Department: typeof user.Department ?? "",

     Advisor: typeof user.Advisor ?? "",

   };


   const apiUrl = "http://localhost:8080/users";

   const requestOptions = {

     method: "POST",

     headers: { "Content-Type": "application/json" },

     body: JSON.stringify(data),

   };


   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       if (res.data) {

         setSuccess(true);

       } else {

         setError(true);

       }

     });

 }


 return (

   <Container className={classes.container} maxWidth="md">
     
     <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>

       <Alert onClose={handleClose} severity="success">

         บันทึกข้อมูลสำเร็จ

       </Alert>

     </Snackbar>

     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

       <Alert onClose={handleClose} severity="error">

         บันทึกข้อมูลไม่สำเร็จ

       </Alert>

     </Snackbar>

     <Paper className={classes.paper}>
         <Box display="flex">
          <Box flexGrow={0.14}>
            <Typography
              component="h4"
              align="center"
              variant="h6"
            >
            B1
            </Typography>
          </Box>
         </Box>

            <br/>
            <br/>

       <Box display="flex">
         <Box flexGrow={1}>

           <Typography

             component="h2"

             align="center"

             variant="h6"

             color="primary"

             gutterBottom

           >

            ประวัติข้อมูลนักศึกษา

            <br/>
            <br/>

           </Typography>

         </Box>

       </Box>

       <Divider />

       <br/>

       <Grid container spacing={3} className={classes.root}>

         <Grid item xs={6}>

           <p>ชื่อ - นามสกุล</p>

         </Grid>

         <Grid item xs={6}>

           <FormControl fullWidth variant="outlined">

             <TextField

               id="Name"

               variant="outlined"

               type="string"

               size="small"

               value={user.Name || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={6}>
              <p>เลขบัตรประชาชน</p>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">

             <TextField

               id="IDCard"

               variant="outlined"

               type="number"

               size="small"

               value={user.IDCard || ""}

               onChange={handleInputChange}

             />

           </FormControl>

         </Grid>

         <Grid item xs={6}>
            <p>คณะวิชา</p>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <InputLabel htmlFor="faculty-native-simple"></InputLabel>
             <NativeSelect

              onChange={handleInputChange}
              inputProps={{
                name:'name',
                id:'faculty-native-simple',
              }}
             >
              <option value=""></option>
              <option value="Engineering">Institute of Engineering</option>
              <option value="Science">Institute of Science</option>
              <option value="Agricultural">Institute of Agricultural Technology</option>
              <option value="Social">Institute of Social Technology</option>
             </NativeSelect>
           </FormControl>

         </Grid>

         <Grid item xs={6}>
            <p>สาขาวิชา</p>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <InputLabel htmlFor="department-native-simple"></InputLabel>
             <NativeSelect

              onChange={handleInputChange}
              inputProps={{
                name:'name',
                id:'department-native-simple',
              }}
             >
              <option value=""></option>
              <option value="CPE">Computer Engineering</option>
              <option value="CE">Chemical Engineering</option>
              <option value="IT">Information Technology</option>
             </NativeSelect>
           </FormControl>

         </Grid>

         <Grid item xs={6}>
            <p>อาจารย์ที่ปรึกษา</p>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">

             <InputLabel htmlFor="advisor-native-simple"></InputLabel>
             <NativeSelect
             
              onChange={handleInputChange}
              inputProps={{
                name:'name',
                id:'advisor-native-simple',
              }}
             >
              <option value=""></option>
              <option value="Arnon">Arnon Arnan</option>
              <option value="Supatra">Supatra Sangdown</option>
              <option value="Chaiwat">Chaiwat Rakdee</option>
             </NativeSelect>

           </FormControl>

         </Grid>

         <Grid item xs={12}>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="primary"

           >

             บันทึกประวัติข้อมูลนักศึกษา

           </Button>

         </Grid>

       </Grid>

     </Paper>

   </Container>

 );

}


export default UserCreate;