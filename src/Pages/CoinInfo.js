import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, createTheme, styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from '../components/SelectButton';

const CoinInfo = (coin) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [loader, setLoader] = useState(true);
  const {currency} = CryptoState();

  const fetchHistoricData = async () => {
    try{
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricalData(data.prices);
      console.log(data);
    }
    catch(error){
      console.error(error.message);
    }
    finally{
      setLoader(false);
    }
    
  };
  // console.log(coin, "coin data is fetching");
  
  useEffect(()=>{
    fetchHistoricData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[days]);
  
  console.log(historicalData, "historical data");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const RootContainer = styled("div")(({theme})=>({
    width:"75%",
    display:"flex",
    flexDirection:"coloum",
    justifyContent:"center",
    alignItems:"center",
    margin:25,
    padding:40,
    [theme.breakpoints.down("md")]:{
      width: "100%",
      marginTop:25,
      padding:20,
      paddingTop:0,
    }
  }))

  return (
    <ThemeProvider theme={darkTheme}>
      <RootContainer>
        {historicalData.length === 0 ||loader ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={100}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours() - 12}:${date.getMinutes()} AM`;

                  return date === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{ elements: { point: { radius: 1 } } }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setLoader(true);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </RootContainer>
    </ThemeProvider>
  );
}

export default CoinInfo