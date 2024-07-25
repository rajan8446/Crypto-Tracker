import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';


const Header = () => {
    const history = useNavigate();

    const {currency, setCurrency} = CryptoState();
    console.log(currency)
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                className="typo"
                onClick={() => history("/")}
                variant="h6"
              >
                Crypto Tracker
              </Typography>
              <Select
              value={currency}
                variant="outlined"
                style={{ width: 100, height: 40, marginRight: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="INR" >INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
}

export default Header