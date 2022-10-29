import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ProblemInterface } from "../interfaces/IProblem";
import { ReadingZoneInterface } from "../interfaces/IReadingZone";
import { ToiletInterface } from "../interfaces/IToilet";
import { ResearchRoomsInterface } from "../interfaces/IResearchRoom";
import { ComputersInterface } from "../interfaces/IComputer";
import { PlaceClassInterface } from "../interfaces/IPlaceClass";

import {
  GetUsers,
  GetProblems,
  GetReadingZones,
  GetToilets,
  GetResearchRooms,
  GetComputers,
  GetPlace_Classes,
  CreateProblemReports,
  
} from "../services/HttpClientService";

import { ProblemReportInterface } from "../interfaces/IProblemReport";
import { UserInterface } from "../interfaces/IUser";
import ProblemReports from "./ProblemReport";
import { Console } from "console";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProblemReportCreate() {
  const [users, setUsers] = useState<UserInterface>();
  const [problems, setProblems] = useState<ProblemInterface[]>([]);
  const [readingzones, setReadingZones ] = useState<ReadingZoneInterface[]>([]);
  const [toilets, setToilets] = useState<ToiletInterface[]>([]);
  const [researchrooms, setResearchRooms] = useState<ResearchRoomsInterface[]>([]);
  const [computers, setComputers] = useState<ComputersInterface[]>([]);
  const [place_classes, setPlace_Classes] = useState<PlaceClassInterface[]>([]);
  const [problemreports, setProblemreports] = useState<Partial<ProblemReportInterface>>({Place_Class_ID:0,Date:new Date()});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  
  const handleChange = (event: SelectChangeEvent) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    const name = event.target.name as keyof typeof problemreports;
    setProblemreports({
      ...problemreports,
      [name]: event.target.value,
    });
  };


  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof problemreports;
    const { value } = event.target;
    setProblemreports({ ...problemreports, [id]: value });
  };

  /* 
  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof problemreports;
    const { value } = event.target;
    setProblemreports({ ...problemreports, [id]: value === "" ? "" : Number(value) });
  }; */


  const getUsers = async () => {
    let res = await GetUsers();
    if (res) {
      setUsers(res);
    }
  };

  const getProblems = async () => {
    let res = await GetProblems();
    if (res) {
      setProblems(res);
    }
  };

  const getReadingZones = async () => {
    let res = await GetReadingZones();
    if (res) {
      setReadingZones(res);
    }
  };

  const getToilets = async () => {
    let res = await GetToilets();
    if (res) {
      setToilets(res);
    }
  };

  const getResearchRooms = async () => {
    let res = await GetResearchRooms();
    if (res) {
      setResearchRooms(res);
    }
  };

  const getComputers = async () => {
    let res = await GetComputers();
    if (res) {
      setComputers(res);
    }
  };
  const getPlace_Classes = async () => {
    let res = await GetPlace_Classes();
    if (res) {
      setPlace_Classes(res);
    }
  };

  useEffect(() => {
    getUsers();
    getPlace_Classes();
    getProblems();
   
  }, []);
  
  function Check(){

    if(problemreports.Place_Class_ID == 0){
      return 0
    }
    else if(problemreports.Place_Class_ID == 1){

      return 1
    }
    else if(problemreports.Place_Class_ID == 2){

      return 2
    }
    else if(problemreports.Place_Class_ID == 3){

      return 3
    }
    else if(problemreports.Place_Class_ID == 4){
      return 4
    }
    
  }

  useEffect(() => {
    setReadingZones([]);
    setToilets([]);
    setResearchRooms([]);
    setComputers([]);
    
    if(Check()==0){
      console.log(problemreports.Place_Class_ID)
      console.log("Cond 0 check")
      setReadingZones([]);
      setToilets([]);
      setResearchRooms([]);
      setComputers([]);
    }
    if(Check()==1){
      console.log(problemreports.Place_Class_ID)
      console.log("Cond 1 check")
      getReadingZones();
      setToilets([]);
      setResearchRooms([]);
      setComputers([]);
    }
    if(Check()==2){
      console.log(problemreports.Place_Class_ID)
      console.log("Cond 2 check")
      setReadingZones([]);
      getToilets();
      setResearchRooms([]);
      setComputers([]);
    }
    if(Check()==3){
      console.log(problemreports.Place_Class_ID)
      console.log("Cond 3 check")
      setReadingZones([]);
      setToilets([]);
      getResearchRooms();
      setComputers([]);
      
    }
    if(Check()==4){
      console.log(problemreports.Place_Class_ID)
      console.log("Cond 4 check")
      setResearchRooms([]);
      setReadingZones([]);
      setToilets([]);
      getComputers();
    
    }
  }, [problemreports.Place_Class_ID]);

  
  var x =0;
 /*  x= Check(); */
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  }; 


  async function submit() {
    let data = {
      USER_ID: convertType(localStorage.getItem("id") as string),
      Problem_ID: convertType(problemreports.Problem_ID),
      RdZone_id: convertType(problemreports.RdZone_id),
      Tlt_id: convertType(problemreports.Tlt_id),
      ReschRoom_id: convertType(problemreports.ReschRoom_id),
      Com_id: convertType(problemreports.Com_id),
      Place_Class_ID: convertType(problemreports.Place_Class_ID),
      Comment: problemreports.Comment, 
      Date: problemreports.Date,

    };
    console.log(data);
    let res = await CreateProblemReports(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
    console.log(data);
  }

/*===============================================================================================*/ 
  return (
    <Container maxWidth="md">
    <Snackbar
      open={success}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
      </Alert>
    </Snackbar>
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        บันทึกข้อมูลไม่สำเร็จ
      </Alert>
    </Snackbar>
    <Paper>
      <Box
        display="flex"
        sx={{
          marginTop: 2,
        }}
      >
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            gutterBottom
          >
          --------------------------บันทึกคำแจ้ง-----------------------------
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={2} sx={{ padding: 3 }}>


        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>Place Class</p>
            <Select
              native
              value={problemreports.Place_Class_ID + ""}
              onChange={handleChange}
              inputProps={{
                name: "Place_Class_ID",
              }}
            >
          
                <option  value={0} key={0}>
                เลือกหมวดหมู่สถานที่
                </option>
              {place_classes.map((item: PlaceClassInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
                  ))}
    
            </Select>
          </FormControl>
        </Grid>
        

        
    
 {/*=============================== ลองใส่ชื่อปัญหาเฉยๆ อย่าเผลอลบ!! ===============================*/}
        
      
         <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>ReadingZone name</p>
            <Select
              native
              value={problemreports.RdZone_id + ""}
              onChange={handleChange}
              inputProps={{
                name: "RdZone_id",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกชื่อสถานที่
              </option>
              {readingzones.map((item: ReadingZoneInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid> 
    
     
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>Toilet name</p>
            <Select
              native
              value={problemreports.Tlt_id + ""}
              onChange={handleChange}
              inputProps={{
                name: "Tlt_id",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกชื่อสถานที่
              </option>
              {toilets.map((item: ToiletInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      

         <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>ResearchRoom No.</p>
            <Select
              native
              value={problemreports.ReschRoom_id + ""}
              onChange={handleChange}
              inputProps={{
                name: "ReschRoom_id",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกชื่อสถานที่
              </option>
              {researchrooms.map((item: ResearchRoomsInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
    

    
         <Grid item xs={4} >
          <FormControl fullWidth variant="outlined">
            <p>Computer name</p>
            <Select
              native
              value={problemreports.Com_id + ""}
              onChange={handleChange}
              inputProps={{
                name: "Com_id",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกชื่อสถานที่
              </option>
              {computers.map((item: ComputersInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Comp_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
  

{/*=============================== ข้างบน ลองใส่ชื่อปัญหาเฉยๆ อย่าเผลอลบ!! ==========================*/}

        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>Problem</p>
            <Select
              native
              value={problemreports.Problem_ID + ""}
              onChange={handleChange}
              inputProps={{
                name: "Problem_ID",
              }}
            >
            <option aria-label="None" value="">
                กรุณาเลือกปัญหา
              </option>
              {problems.map((item: ProblemInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>


        </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
                <p>Comment</p>
                <TextField
                    //id="outlined-password-input"
                    //label="Password"
                    //type="password"
                    //autoComplete="current-password"
                    id="Comment"
                    variant="outlined"
                    type="string"
                    size="medium"
                    //placeholder="กรุณากรอกข้อมูลชื่อ"
                    value={problemreports.Comment || ""}
                    onChange={handleInputChange}
                />

            </FormControl>
          </Grid>


        <Grid item xs={2.5}>
                  <FormControl fullWidth variant="outlined">
                    <p>Date</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker disabled
                        value={problemreports.Date}
                        onChange={(newValue) => {
                          setProblemreports({
                            ...problemreports,
                            Date: newValue,
                          });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/problemreports"
            variant="contained"
            color="inherit"
          >
            กลับ
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={submit}
            variant="contained"
            color="primary"
          >
            บันทึก

          
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
  );
/*===============================================================================================*/ 
}

export default ProblemReportCreate; 