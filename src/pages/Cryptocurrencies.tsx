import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../app/features/cryptoAPI";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Loading } from "../components";
import { Currency } from "../app/features/types";

function Cryptocurrencies({ simplified }: { simplified?: boolean }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);

  // const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [cryptos, setCryptos] = useState<Currency[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptoList?.data?.coins) {
      setCryptos(cryptoList?.data?.coins);
    }
    const filteredData = cryptoList?.data?.coins.filter((currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setCryptos(filteredData as Currency[]);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loading />;
  return (
    <div>
      {!simplified && (
        <>
          <Typography
            style={{ padding: "1rem 0", textAlign: "center" }}
            color="primary"
            gutterBottom
            variant="h2"
          >
            List of main cryptocurrencies
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto 30px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Search Cryptocurrency"
              variant="outlined"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              style={{ width: "300px" }}
            />
          </Box>
        </>
      )}

      <Grid container spacing={3}>
        {cryptos &&
          cryptos?.map((currency) => (
            <Grid item key={currency.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, minWidth: 275, margin: "0 auto" }}>
                <Link to={`/crypto/${currency.id}`}>
                  <CardActionArea>
                    <CardContent>
                      <div
                        className="card-top-container"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          noWrap
                        >
                          {`${currency.rank}. ${currency.name}`}
                        </Typography>
                        <img
                          src={currency.iconUrl}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            margin: "5px",
                          }}
                        />
                      </div>
                      <Divider />
                      <p>Price: {millify(currency.price)}</p>
                      <p>Market Cap: {millify(currency.marketCap)}</p>
                      <p>Daily Change: {currency.change}%</p>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Cryptocurrencies;
