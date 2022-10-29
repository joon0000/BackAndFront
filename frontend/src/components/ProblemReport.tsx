import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProblemReportInterface } from "../interfaces/IProblemReport";
import { GetProblemReports } from "../services/HttpClientService";
import moment from 'moment';

function ProblemReports() {
  const [ProblemReports, setProblemReports] = useState<ProblemReportInterface[]>([]);

  useEffect(() => {
    getProblemReports();
  }, []);

  const getProblemReports = async () => {
    let res = await GetProblemReports();
    if (res) {
      setProblemReports(res);
    } 
  }

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "USER_ID",
      headerName: "USER_ID",
      width: 150,
      valueFormatter: (params) => params.value.USER_ID,
    },
    {
      field: "Problem",
      headerName: "Problem",
      width: 150,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "RdZone",
      headerName: "ReadingZone",
      width: 150,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Tlt",
      headerName: "Toilet",
      width: 150,
      valueFormatter: (params) => params.value.Name,
    },
    {
        field: "ReschRoom",
        headerName: "ResearchRoom No.",
        width: 150,
        valueFormatter: (params) => params.value.Name,
        
    },
      {
        field: "Com",
        headerName: "Computer",
        width: 150,
        valueFormatter: (params) => params.value.Comp_name,
      },
      {
        field: "Place_Class",
        headerName: "Place_Class",
        width: 150,
        valueFormatter: (params) => params.value.Name,
      },
      {field: "Comment",
      headerName: "Comment",
      width: 350,
      valueFormatter: (params) => params.value.Comment,
      },
      {field: "Date",
      headerName: "Date",
      width: 251,
      valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm:ss')
      },
    /* { field: "WatchedTime", headerName: "วันที่และเวลา", width: 250 }, */
  ];

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
              ข้อมูลตารางบันทึกการเเจ้งปัญหา
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/problemreports/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={ProblemReports}
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

export default ProblemReports;