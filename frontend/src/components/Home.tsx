import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function Home() {
  return (
    <div>
    <Container maxWidth="md">
    
    <Card sx={{ maxWidth:750 }}>
    <CardMedia
          component="img"
          height="550"
          image="https://media.cntraveler.com/photos/5e73a851a32d290008f50901/5:4/w_2080,h_1664,c_limit/Tianjin%20Binhai%20Library%20cr%20Ossip%20van%20Duivenbode.jpg"
          //image="https://scontent.fnak3-1.fna.fbcdn.net/v/t1.15752-9/312321772_1122851631951086_3382521877105808554_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHbx6fuNz_qrXOAM-gFWLlvm1MGzh-skpebUwbOH6ySl28PylUU-wazu36Ht_aHC_hDD79GxLnbewruFUaYD8-5&_nc_ohc=ReMoyAvY9n8AX_lV4lL&tn=NQjrPmRHZIU87l1x&_nc_ht=scontent.fnak3-1.fna&oh=03_AdRxFBOQhcM_SR-Egin0fUsO5v4EpEMQdkdLErHPBlfM-Q&oe=637E0AB8"
          alt="green iguana"
        />
    </Card>
    <Typography variant="h1" gutterBottom>
        Welcome to library
      </Typography>
    </Container>
    
    </div>
  )
}

    
export default Home