import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ComputerIcon from '@mui/icons-material/Computer';
import FlagIcon from '@mui/icons-material/Flag';


import Home from "./components/Home";
import SignIn from "./components/SignIn";

import BookCreate from "./components/BookCreate";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
import Books from "./components/Books";

import ReservationCreate from "./components/ReservationCreate";
import Reservations from "./components/Reservations";

import Computer_reservationCreate from "./components/Computer_reservationCreate";
import Computer_reservations from "./components/Computer_reservations";


import Borrows from "./components/Borrows";
import BorrowCreate from "./components/BorrowCreate";

import Bills from "./components/Bills";
import BillCreate from "./components/BillCreate";
import StorefrontIcon from '@mui/icons-material/Storefront';

import ProblemReportCreate from "./components/ProblemReportCreate";
import ProblemReport from "./components/ProblemReport";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" ,role: "user"},
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" ,role: "admin"},
  { name: "ลงทะเบียนหนังสือ", icon: <MenuBookRoundedIcon />, path: "/books",role: "admin"},
  { name: "ลงทะเบียนสมาชิก", icon: <PeopleIcon />, path: "/users",role: "admin"},
  { name: "จองห้องค้นคว้า", icon: <MeetingRoomIcon />, path: "/researchroomreservationrecords" ,role: "user"},
  { name: "จองเข้าใช้คอมพิวเตอร์", icon: <ComputerIcon />, path: "/computer_reservations" ,role: "user"},
  { name: "ยืมหนังสือ", icon: <AddCircleIcon />, path: "/borrows",role: "admin" },
  { name: "ระบบใบแจ้งค่าใช้จ่าย", icon: <StorefrontIcon />, path: "/bills" ,role : "admin"},
  { name: "Problem Report", icon: <FlagIcon />, path: "/problemreports" ,role: "user"},
  // { name: "หนังสือ", icon: <PeopleIcon />, path: "/books",role:"employee"},
  // { name: "สมาชิก", icon: <PeopleIcon />, path: "/users",role:"student"},
  //{ name: "การเข้าชมวีดีโอ", icon: <YouTubeIcon />, path: "/watch_videos" },
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  //const [email, setEmail] = useState<string | null>();
  const [role, setRole] = useState<String| null>();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    //const email= localStorage.getItem("email");
    const role = localStorage.getItem("role")
    //console.log(email)
    if (token) {
      setToken(token);
      setRole(role);
    }
  }, []);
  

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  // if(email == "sirinya@mail.com"){
  //   const menu =[
  //     { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  //     { name: "หนังสือ", icon: <PeopleIcon />, path: "/books"},
  //   ]
  // }
  // const menu =[
  //   { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  //   { name: "สมาชิก", icon: <PeopleIcon />, path: "/users",email : "preechapat@mail.com"},
  // ]
  // }
  // const menu = {
  //   if(email == "sirinya@mail.com"){
  //       return 
  //   }
  // }
  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ระบบห้องสมุด
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => (
                 //email == item.email &&
                 role == item.role &&
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>

              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/book/create" element={<BookCreate/>} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/create" element={<UserCreate />} />
                <Route path="/researchroomreservationrecords" element={<Reservations />} />
                <Route path="/researchroomreservationrecords/create" element={<ReservationCreate />} />
                <Route path="/computer_reservations" element={<Computer_reservations />} />
                <Route path="/computer_reservations/create" element={<Computer_reservationCreate />} />
                <Route path="/borrows" element={<Borrows />} />
                <Route path="/borrow/create" element={<BorrowCreate />} />
                <Route path="/bills" element={<Bills/>} />
                <Route path="/createbills" element={<BillCreate/>} />
      
                <Route path="/problemreports" element={<ProblemReport />} />
                <Route path="/problemreports/create" element={<ProblemReportCreate />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}


export default App;