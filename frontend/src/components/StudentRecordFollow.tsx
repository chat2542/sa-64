import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import { StudentRecordInterface } from "../models/IStudentRecord";

 

const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { minWidth: 650},

   tableSpace: {marginTop: 20},

 })

);

 

function StudentRecordFollow() {

 const classes = useStyles();

 const [student, setStudents] = React.useState<StudentRecordInterface[]>([]);

 

 const getUsers = async () => {

   const apiUrl = "http://localhost:8080/student_records";

   const requestOptions = {

     method: "GET",

     headers: { "Content-Type": "application/json" },

   };

 

   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

        setStudents(res.data);

       } else {

         console.log("else");

       }

     });

 };

 

 useEffect(() => {

    getUsers();

 }, []);

 

 return (

   <div>

     <Container className={classes.container} maxWidth="md">

       <Box display="flex">

         <Box flexGrow={1}>

           <Typography

             component="h2"

             variant="h6"

             color="primary"

             gutterBottom

           >

           </Typography>

         </Box>

         <Box>

           <Button

             component={RouterLink}

             to="/create"

             variant="contained"

             color="primary"

           >

            บันทึกระเบียนประวัตินักศึกษา

           </Button>

         </Box>

       </Box>

       <TableContainer component={Paper} className={classes.tableSpace}>

         <Table className={classes.table} aria-label="simple table">

           <TableHead>

             <TableRow>

               <TableCell align="center" width="10%">

                 ลำดับที่

               </TableCell>

               <TableCell align="center" width="20%">

                 รหัสนักศึกษา

               </TableCell>

               <TableCell align="center" width="20%">

                 คำนำหน้า

               </TableCell>

               <TableCell align="center" width="20%">

                 ชื่อ

               </TableCell>

               <TableCell align="center" width="20%">

                 นามสกุล

               </TableCell>

               <TableCell align="center" width="25%">

                 เลขบัตรประชาชน

               </TableCell>

               <TableCell align="center" width="15%">

                 คณะวิชา

               </TableCell>

               <TableCell align="center" width="15%">

                 สาขาวิชา

               </TableCell>

               <TableCell align="center" width="25%">

                 อาจารย์ที่ปรึกษา

               </TableCell>

             </TableRow>

           </TableHead>

           <TableBody>

             {student.map((students: StudentRecordInterface) => (

               <TableRow key={students.ID}>

                 <TableCell align="right">{students.ID}</TableCell>

                 <TableCell align="left">{students.Code}</TableCell>

                 <TableCell align="left" size="medium">

                   {students.Prefix}

                 </TableCell>

                 <TableCell align="left" size="medium">

                   {students.FirstName}

                 </TableCell>

                 <TableCell align="left" size="medium">

                   {students.LastName}

                 </TableCell>

                 <TableCell align="left">{students.PersonalId}</TableCell>

                 <TableCell align="left">{students.Department.Faculty.Name}</TableCell>

                 <TableCell align="left">{students.Department.Name}</TableCell>

                 <TableCell align="center">{students.Advisor.TeacherName}</TableCell>

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default StudentRecordFollow;