import React from "react";
import parse from "html-react-parser";
import millify from "millify";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Loading } from "../components";
import { useGetCryptoExchangesQuery } from "../app/features/cryptoAPI";
import { Exchange } from "../app/features/types";

function RenderARow({ row, index }: { row: Exchange; index: number }) {
  const [open, setOpen] = React.useState(false);
  const evenRow = index % 2 === 0;

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: evenRow ? "#e0e0e0" : "#fafafa",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography component="span" variant="h6">
            {row.rank}.
          </Typography>
          <Avatar
            alt={row.name}
            src={row.iconUrl}
            sx={{ m: { xs: "0 0.5rem", md: "0 1rem" } }}
          />
          <Typography component="span">{row.name}</Typography>
        </TableCell>
        <TableCell align="right">${millify(row.volume)}</TableCell>
        <TableCell align="right">{millify(row.numberOfMarkets)}</TableCell>
        <TableCell align="right">{millify(row.marketShare)}%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: 1 }}>
              <Typography variant="body2" gutterBottom component="div">
                {parse(`${row.description}`)}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchanges = data?.data?.exchanges;
  if (isFetching) return <Loading />;
  if (!exchanges) return <Loading />;

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Exchanges</TableCell>
            <TableCell align="right">24h Trade volume</TableCell>
            <TableCell align="right">Markets</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map((row, index) => (
            <RenderARow key={row.name} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
