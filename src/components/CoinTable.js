import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider } from "@emotion/react";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithComms } from "./Banner/Carousel";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const history = useNavigate();

  const fetchCoins = async () => {
    try{
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    }
    catch(error){
      console.error(error.message)
    }
  };

  console.log(coins);
  useEffect(() => {
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);


  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },

  });

  const myStyles = {
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  };

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  console.log(handleSearch(), "filterdata");

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          className="table"
          variant="h4"
          style={{ margin: 18, fontFamily: "Monserrat" }}
        >
          Crypto Currency Price by Market Cap
        </Typography>

        <TextField
          id="outlined-basic"
          label="search for a crypto currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {" "}
                  {["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = coins.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => history(`/coins/${row.id}`)}
                        style={myStyles.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.image}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol}{""}
                          {numberWithComms(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: profit > 0 ? "rgb(14,203,129" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol}{""}
                          {numberWithComms(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          size="large"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 400);
          }}
          sx={{ "& .MuiPaginationItem-root": { color: "gold" } }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;
