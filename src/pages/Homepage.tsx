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

function Homepage() {
  const { data, error, isLoading } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;
  if (!globalStats) return <div>Loading</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <div>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" component="div" align={"center"}>
          Global Crypto stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography>Total Cryptocurrencies</Typography>
            <p>{globalStats.total}</p>
          </Grid>
          <Grid item md={6}>
            <Typography>Total Exchanges</Typography>
            <p>{millify(globalStats.totalExchanges)}</p>
          </Grid>
          <Grid item md={6}>
            <Typography>Total Market Cap:</Typography>
            <p>{millify(globalStats.totalMarketCap)}</p>
          </Grid>
          <Grid item md={6}>
            <Typography>Total 24h Volume</Typography>
            <p>{millify(globalStats.total24hVolume)}</p>
          </Grid>
          <Grid item md={6}>
            <Typography>Total Markets</Typography>
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
      <Cryptocurrencies />
      <HomeHeading>
        <h2>Latest Crypto News</h2>
        <HomeShowMoreBtn>
          <Link to="/news">Show more</Link>
        </HomeShowMoreBtn>
      </HomeHeading>
      <News />
    </div>
  );
}

export default Homepage;
