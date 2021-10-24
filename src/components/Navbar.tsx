import * as React from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import icon from "../images/cryptocurrency.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));

export default function Navbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //MOBILE MENU
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <HomeOutlinedIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <TrendingUpOutlinedIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <LocalAtmOutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "rgb(0, 21, 41)" }}>
        <Toolbar>
          {/*<IconButton*/}
          {/*  size="large"*/}
          {/*  edge="start"*/}
          {/*  color="inherit"*/}
          {/*  aria-label="open drawer"*/}
          {/*  sx={{ mr: 2 }}*/}
          {/*>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <Avatar src={icon} />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "info.main",
            }}
          >
            <StyledLink to="/">ReduxCoin</StyledLink>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button size="large" color="inherit" component={Link} to="/">
              <HomeOutlinedIcon />
              <Typography>Home</Typography>
            </Button>
            <Button
              size="large"
              color="inherit"
              component={Link}
              to="/cryptocurrencies"
            >
              <TrendingUpOutlinedIcon />

              <Typography>Cryptocurrencies</Typography>
            </Button>
            <Button
              size="large"
              color="inherit"
              component={Link}
              to="/exchanges"
            >
              <LocalAtmOutlinedIcon />

              <Typography>Exchanges</Typography>
            </Button>
            <Button size="large" color="inherit" component={Link} to="/news">
              <LightbulbOutlinedIcon />

              <Typography>News</Typography>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
