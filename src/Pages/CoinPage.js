import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { CircularProgress, styled, Typography } from "@mui/material";
import { numberWithComms } from "../components/Banner/Carousel";

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const { id } = useParams();


  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try{
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    }
    catch(error){
      console.error(error.message)
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RootContainer = styled("div")(({ theme }) => ({
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const RootSideBar = styled("div")(({ theme }) => ({
    width: "100%",
    height:"90vh",
    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    // },
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const RootMarket = styled("div")(({ theme }) => ({
    // alignSelf: "start",
    width:"100%",
    padding: 25,
    paddingTop: 10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  const myStyles = {
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      display:"flex",
      
      flexDirection: "row",
      alignItems: "center",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "center",
    },
  };

  // if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  // if (!coin) return (
  //   <CircularProgress style={{ color: "gold", width:"100%", display:"flex",justifyContent:"center",alignItems:"center" }} size={100} thickness={1} />
  // );

  return (
    <RootContainer>
      <RootSideBar>
        {!coin ? (
          <CircularProgress
            style={{
              color: "gold",
            }}
            size={100}
            thickness={2}
          />
        ) : (
          <>
            <img
              src={coin?.image.large}
              alt={coin?.image.large}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <Typography variant="h3" style={myStyles.heading}></Typography>
            <Typography variant="subtitle1" style={myStyles.description}>
              {coin?.description.en.split(". ")[0]}
            </Typography>

            <RootMarket>
              <span style={{ display: "flex", marginRight: 20 }}>
                <Typography variant="h6" style={myStyles.heading}>
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
                  {coin?.market_cap_rank}
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h6" style={myStyles.heading}>
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
                  {symbol}{" "}
                  {numberWithComms(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography variant="h6" style={myStyles.heading}>
                  Market Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
                  {symbol}{" "}
                  {numberWithComms(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </Typography>
              </span>
            </RootMarket>
          </>
        )}
      </RootSideBar>
      {/* <CoinInfo coin={coin} /> */}
    </RootContainer>
  );
};

export default CoinPage;
