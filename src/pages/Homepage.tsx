import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetCryptosQuery } from "../app/features/cryptoAPI";
//styles
import { HomeHeading, HomeShowMoreBtn } from "./Homepage.styles";
import { Cryptocurrencies, News } from "./index";
import { Loading } from "../components";

function Homepage() {
  const { data, error, isLoading } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (!globalStats) return <Loading />;
  if (isLoading) return <Loading />;
  return (
    <div>
      <Paper sx={{ margin: "4rem auto 10rem", padding: "4rem 4rem 6rem" }}>
        <Typography
          gutterBottom
          variant="h2"
          color="primary"
          component="div"
          align="center"
        >
          Global Crypto stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Total Cryptocurrencies</Typography>
            <p>{globalStats.total}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Total Exchanges</Typography>
            <p>{millify(globalStats.totalExchanges)}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Total Market Cap:</Typography>
            <p>{millify(globalStats.totalMarketCap)}</p>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Total Markets</Typography>
            <p>{millify(globalStats.totalMarkets)}</p>
          </Grid>
        </Grid>
      </Paper>
      <HomeHeading>
        <h2>Top 10 cryptocurrencies in the world</h2>
        <HomeShowMoreBtn>
          <Link to="/cryptocurrencies">Show more</Link>
        </HomeShowMoreBtn>
      </HomeHeading>
      <Cryptocurrencies simplified />
      <HomeHeading>
        <h2>Latest Crypto News</h2>
        <HomeShowMoreBtn>
          <Link to="/news">Show more</Link>
        </HomeShowMoreBtn>
      </HomeHeading>
      <News simplified />
    </div>
  );
}

export default Homepage;
