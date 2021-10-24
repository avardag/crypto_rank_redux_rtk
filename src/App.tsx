import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Navbar } from "./components";
import {
  News,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Homepage,
} from "./pages";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/exchanges">
            <Exchanges />
          </Route>
          <Route exact path="/cryptocurrencies">
            <Cryptocurrencies />
          </Route>
          <Route exact path="/crypto/:coinId">
            <CryptoDetails />
          </Route>
          <Route exact path="/news">
            <News />
          </Route>
        </Switch>
      </div>
      <div className="footer">
        <Typography variant={"h5"} style={{ textAlign: "center" }}>
          Copyright © 2021
          <Link to="/">Cryptoverse Inc.</Link> <br />
          All Rights Reserved.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item>
            <Link to="/">Home</Link>
          </Grid>
          <Grid item>
            <Link to="/exchanges">Exchanges</Link>
          </Grid>
          <Grid item>
            <Link to="/news">News</Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
