import { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import parse from "html-react-parser";
import { useGetCryptoDetailsQuery } from "../app/features/cryptoAPI";
import { Loading } from "../components";
import { lightBlue, cyan } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import MultilineChartOutlinedIcon from "@mui/icons-material/MultilineChartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  ListValue,
  CoinLinksListItem,
  StatsListItem,
  ListTitle,
  DetailsHeading,
} from "./CryptoDetails.styles";

function CryptoDetails() {
  const timePeriodsArr = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const { coinId } = useParams<{ coinId: string }>();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails = data?.data?.coin;
  if (!cryptoDetails) return <Loading />;
  if (isFetching) return <Loading />;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "Rank",
      value: cryptoDetails.rank,
      icon: <BarChartOutlinedIcon />,
    },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <MultilineChartOutlinedIcon />,
    },

    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrendingUpOutlinedIcon />,
    },
  ];

  const otherStats = [
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <LocalAtmOutlinedIcon />,
    },
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FunctionsOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <LocalAtmOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
  ];

  return (
    <div style={{ margin: "30px" }}>
      <DetailsHeading>
        <Typography gutterBottom variant="h3" color={lightBlue[700]}>
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </Typography>

        <Typography paragraph style={{ opacity: "0.8" }} gutterBottom>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Typography>
      </DetailsHeading>
      <Box sx={{ width: 300, m: "30px 0" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={timePeriod}
            label="Select Time"
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {timePeriodsArr.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/*chart*/}
      <Grid
        container
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={5}>
          <div>
            <Typography variant="h5" color={lightBlue[600]}>
              {cryptoDetails.name} Value Statistics
            </Typography>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          {stats.map(({ icon, title, value }) => (
            <StatsListItem key={title}>
              <ListTitle>
                <p>{icon}</p>
                <p>{title}</p>
              </ListTitle>
              <ListValue>{value}</ListValue>
            </StatsListItem>
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <div>
            <Typography variant="h5" color={lightBlue[600]}>
              Other Stats Info
            </Typography>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          {otherStats.map(({ icon, title, value }) => (
            <StatsListItem key={title}>
              <ListTitle>
                <p>{icon}</p>
                <p>{title}</p>
              </ListTitle>
              <ListValue>{value}</ListValue>
            </StatsListItem>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={8} sx={{ mt: 3 }}>
        <Grid item xs={12} lg={7}>
          <Typography variant="h3" color={cyan[700]}>
            What is {cryptoDetails.name}?
          </Typography>
          {parse(cryptoDetails.description)}
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Typography variant="h4" color={cyan[700]}>
            {cryptoDetails.name} Links
          </Typography>
          {cryptoDetails?.links?.map((link) => (
            <CoinLinksListItem key={link.url}>
              <p>{link.type}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </CoinLinksListItem>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CryptoDetails;
