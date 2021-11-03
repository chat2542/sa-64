import React from 'react'
import { useEffect } from 'react';
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
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UsersInterface } from "../models/IUser";
import { FacultyInterface } from '../models/IFaculty';
import { DepartmentInterface } from '../models/IDepartment';
import { StudentRecordInterface } from '../models/IStudentRecord';
import { AdvisorInterface } from '../models/IAdvisor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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


function StudentRecord() {
  const classes = useStyles();

 const [faculty, setFaculty] = React.useState<FacultyInterface[]>([]);
 const [selectFaculty, setSelectFaculty] = React.useState<Partial<FacultyInterface>>({});
 const [department, setDepartment] = React.useState<DepartmentInterface[]>([]);
 const [advisor, setAdvisor] = React.useState<AdvisorInterface[]>([]);
 const [studentrecord, setStudentrecord] = React.useState<Partial<StudentRecordInterface>>({});
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);

 const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
   if (reason === "clickaway") {
     return;
   }
   setSuccess(false);
   setError(false);
 };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
     const name = event.target.name as keyof typeof studentrecord;
     setStudentrecord({...studentrecord, [name]: event.target.value,});
  };

  const handleFacultyChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof selectFaculty;
    setSelectFaculty({...selectFaculty, [name]: event.target.value,});
  };

  const getFaculty = async () => {
    const apiUrl = "http://localhost:8080/faculties";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFaculty(res.data);
        } else {
          console.log("else");
        }
      });
  };
  
  const getDepartmentFromFacultyID = async () => {
    const apiUrl = "http://localhost:8080/departments/selectFaculty/" + selectFaculty.ID;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDepartment(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getAdvisor = async () => {
    const apiUrl = "http://localhost:8080/advisors";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAdvisor(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getLogin = async() => {
    const apiUrl = "http://localhost:8080/student_records/1";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStudentrecord({...studentrecord, ["Code"]: res.data.Code,});
        } else {
          console.log("else");
        }
      });
  }


  function submit() {
    let data = {
      Prefix: studentrecord.Prefix,
      FirstName: studentrecord.FirstName,
      LastName: studentrecord.LastName,
      PersonalId: studentrecord.PersonalId,
      Code: "B6104887",
      DepartmentID: studentrecord.DepartmentID,
      AdvisorID: studentrecord.AdvisorID,
      LoginID: 1,
    };

    const apiUrl = "http://localhost:8080/student_records";
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

  useEffect(() => {
    getFaculty();
    getAdvisor();
    getLogin();
  }, []);

  console.log("studentrecord", studentrecord);

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


       <br/>

       
       <Grid container spacing={3} className={classes.root}>
         <Grid item xs={6}>
           <p>คำนำหน้า</p>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
              <Select
                value={studentrecord.Prefix}
                onChange={handleChange}
                inputProps={{name: "Prefix"}}
              >
                  <MenuItem value="">
                    กรุณาเลือกคำนำหน้า
                  </MenuItem>
                  <MenuItem value="Mr.">
                    Mr.
                  </MenuItem>
                  <MenuItem value="Miss">
                    Miss
                  </MenuItem>
              </Select>
           </FormControl>
         </Grid>
        </Grid>

       <Grid container spacing={3} className={classes.root}>
         <Grid item xs={6}>
           <p>ชื่อ</p>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Name"
               variant="outlined"
               type="string"
               size="medium"
               value={studentrecord.FirstName || ""}
               inputProps={{name: "FirstName"}}
               onChange={handleChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <p>นามสกุล</p>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Name"
               variant="outlined"
               type="string"
               size="medium"
               value={studentrecord.LastName || ""}
               inputProps={{name: "LastName"}}
               onChange={handleChange}
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
              <p>เลขบัตรประชาชน</p>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <TextField
               id="Name"
               variant="outlined"
               type="string"
               size="medium"
               value={studentrecord.PersonalId || ""}
               inputProps={{name: "PersonalId"}}
               onChange={handleChange}
             />
           </FormControl>
         </Grid>

          <Grid item xs={6}>
            <p>คณะวิชา</p>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={selectFaculty?.ID}
                onChange={handleFacultyChange}
                inputProps={{name: "ID"}}
              >
                  <MenuItem aria-label="None" value="">
                    กรุณาเลือกคณะ
                  </MenuItem>
                  {faculty.map((item: FacultyInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
         </Grid>

         <Grid item xs={6}>
            <p>สาขาวิชา</p>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={studentrecord.DepartmentID}
                onChange={handleChange}
                onOpen={getDepartmentFromFacultyID}
                inputProps={{name: "DepartmentID"}}
              >
                  <MenuItem aria-label="None" value="">
                    กรุณาเลือกสาขาวิชา
                  </MenuItem>
                  {department.map((item: DepartmentInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
         </Grid>

         <Grid item xs={6}>
            <p>อาจารย์ที่ปรึกษา</p>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={studentrecord.AdvisorID}
                onChange={handleChange}
                inputProps={{name: "AdvisorID"}}
              >
                  <MenuItem aria-label="None" value="">
                    กรุณาเลือกอาจารย์ที่ปรึกษา
                  </MenuItem>
                  {advisor.map((item: AdvisorInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.TeacherName}
                    </MenuItem>
                  ))}
              </Select>
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


export default StudentRecord;