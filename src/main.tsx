import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
