import { useState } from "react";
import { useGetNewsQuery } from "../app/features/cryptoNews";
import { Loading } from "../components";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardActionArea, CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";

import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useGetCryptosQuery } from "../app/features/cryptoAPI";

const demoImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/633px-Cryptocurrency_Logo.svg.png";

function News({ simplified }: { simplified?: boolean }) {
  let count = simplified ? 6 : 24;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: news, isFetching } = useGetNewsQuery({
    newsCategory,
    count,
  });
  const { data: cryptos } = useGetCryptosQuery(100);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setNewsCategory(event.target.value as string);
  };

  if (!news?.value) return <Loading />;
  if (isFetching) return <Loading />;
  return (
    <div>
      {!simplified && (
        <>
          <Typography
            style={{ padding: "1rem 0", textAlign: "center" }}
            gutterBottom
            color="primary"
            variant="h2"
          >
            Latest Cryptocurrency news
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
            <FormControl style={{ width: "300px" }}>
              <InputLabel id="demo-simple-select-label">
                Cryptocurrency
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newsCategory}
                label="CryptoCurrency"
                onChange={handleSelectChange}
              >
                {cryptos?.data?.coins.map((currency) => (
                  <MenuItem value={currency.name}>{currency.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      <Grid container spacing={3}>
        {news &&
          news.value?.map((newsP) => (
            <Grid item key={newsP.url} xs={12} sm={6} md={6} lg={4}>
              <a href={`${newsP.url}`} target="_blank" rel="noreferrer">
                <Card sx={{ maxWidth: 345, minWidth: 275, height: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="120"
                      image={newsP.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        {newsP.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {newsP.description.length > 100
                          ? `${newsP.description.substring(0, 100)}...`
                          : newsP.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Avatar
                      // sx={{ width: 24, height: 24 }}
                      src={
                        newsP.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Typography variant="body2" color="text.secondary">
                      {newsP.provider[0]?.name}
                    </Typography>
                  </CardActions>
                </Card>
              </a>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default News;
