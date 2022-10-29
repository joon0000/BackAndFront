import React, { useEffect, useState } from "react";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EmployeesInterface } from "../interfaces/IEmployee";
import { RolesInterface } from "../interfaces/IRole";
import { BookInterface } from "../interfaces/IBook";
import { UserInterface } from "../interfaces/IUser";

import {
    GetRoles,
    GetUsers,
    GetBook,
    CreateBorrows,
  } from "../services/HttpClientService";

  import { BorrowInterface } from "../interfaces/IBorrow";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BorrowCreate() {
    const [Books, setBooks] = useState<BookInterface[]>([]);
    const [roles, setRoles] = useState<RolesInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [borrow, setBorrow] = useState<Partial<BorrowInterface>>({  // return ค่าของ state หรือในการอัพเดทค่า
      DateTime: new Date(),
    });
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
      const name = event.target.name as keyof typeof borrow;
      setBorrow({
        ...borrow,
        [name]: event.target.value,
      });
    };
  
    const Check = (
  
    )=> {console.log(borrow)}
  
    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof borrow;
      const { value } = event.target;
      setBorrow({ ...borrow, [id]: value });
    };
    const handleInputChangenumber = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof borrow;
      const { value } = event.target;
      setBorrow({ ...borrow, [id]: value === "" ? "" : Number(value) });
    };
  
    const getUsers = async () => {
      let res = await GetUsers();
      if (res) {
        setUsers(res);
      }
    };
  
    const getRoles = async () => {
      let res = await GetRoles();
      if (res) {
        setRoles(res);
      }
    };
  
    
    const getBook = async () => {
      let res = await GetBook();   // let ประกาศว่า res ใช้ได้แค่ใน function
      if (res) {
        setBooks(res);
      }
    };
  
    //ใชช้งานเวลาเกิดทุกอย่างเปลี่ยนแปลง
    useEffect(() => {
      getUsers();
      getRoles();
      getBook();
    }, []);
    
    //แปลงเป็น Int
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };
   
    async function submit() {
      let data = {
        RoleID: convertType(borrow.RoleID),
        UserID: convertType(borrow.UserID),
        BookID: convertType(borrow.BookID),
        DateTime: borrow.DateTime,
  
      };
      console.log(data);
      let res = await CreateBorrows(data);
      if (res) {
        setSuccess(true);
      } else {
        setError(true);
      }
    }
  
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
                variant="h6"
                color="primary"
                gutterBottom
              >
                บันทึกการลงทะเบียนยืมคืนหนังสือ
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={3} sx={{ padding: 2 }}> 
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>UserID</p>
              <Select
                native
                value={borrow.UserID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UserID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหนังสือID
                </option>
                {users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Pin}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>Role</p>
              <Select
                native
                value={borrow.RoleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสิทธิการเข้าถึง
                </option>
                {roles.map((item: RolesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>BookID</p>
              <Select
                native
                value={borrow.BookID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BookID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหนังสือID
                </option>
                {Books.map((item: BookInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={borrow.DateTime}
                  onChange={(newValue) => {
                    setBorrow({
                      ...borrow,
                      DateTime: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/borrows"
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
  }
  
  export default BorrowCreate;