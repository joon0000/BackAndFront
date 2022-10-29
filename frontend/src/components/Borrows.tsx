import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BorrowInterface } from "../interfaces/IBorrow";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  GetBorrows } from "../services/HttpClientService";
import moment from 'moment';
function Borrows() {
  const [borrows, setBorrows] = useState<BorrowInterface[]>([]);

  const getBorrows = async () => {
    let res = await  GetBorrows();
    if (res) {
      setBorrows(res);
      console.log(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 100 },
    {field: "User_PIN",headerName: "รหัสนักศึกษา",width: 150,valueFormatter: (params) => params.value.User_PIN,},
    {field: "Book_Name",headerName: "หนังสือ",width: 150,valueFormatter: (params) => params.value.Book_Name,},
    { field: "Role", headerName: "สิทธิการยืมหนังสือ", width: 100, valueFormatter: (params) => params.value.Name,}, 
    //{ field: "UserID", headerName: "บทบาท", width: 100 , valueFormatter: (params) => params.value.UserID,},
    { field: "BookID", headerName: "ไอดีหนังสือ", width: 100 , valueFormatter: (params) => params.value.BookID,}, 
    { field: "DateTime", headerName: "วันที่และเวลา", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss') },
  ];

  useEffect(() => {
    getBorrows();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลรายการยืมหนังสือ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/borrow/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={borrows}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Borrows;