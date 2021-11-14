import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
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

const Footer = styled.div`
  background-color: rgb(0, 21, 41);
  color: white;
  padding: 1.5rem 0;
  margin-top: 1rem;
`;
const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <MainContainer>
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
      </MainContainer>
      <Footer>
        <Typography variant={"h5"} align="center">
          Copyright © 2021 <Link to="/">ReduxCoin Inc.</Link> <br />
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
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Grid>
          <Grid item>
            <Link to="/exchanges">Exchanges</Link>
          </Grid>
          <Grid item>
            <Link to="/news">News</Link>
          </Grid>
        </Grid>
      </Footer>
    </div>
  );
}

export default App;
