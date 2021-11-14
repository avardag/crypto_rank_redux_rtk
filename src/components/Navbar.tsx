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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
  const links = [
    {
      to: "/",
      title: "Home",
      icon: <HomeOutlinedIcon />,
    },
    {
      to: "/cryptocurrencies",
      title: "Cryptocurrencies",
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      to: "/exchanges",
      title: "Exchanges",
      icon: <LocalAtmOutlinedIcon />,
    },
    {
      to: "/news",
      title: "News",
      icon: <LightbulbOutlinedIcon />,
    },
  ];
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
      {links.map((link) => (
        <MenuItem key={link.title} component={Link} to={link.to} sx={{ p: 2 }}>
          <ListItemIcon>{link.icon}</ListItemIcon>

          <Typography>{link.title}</Typography>
        </MenuItem>
      ))}
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
            }}
          >
            <StyledLink to="/">ReduxCoin</StyledLink>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Button
                size="large"
                color="inherit"
                component={Link}
                to={link.to}
                key={link.title}
              >
                {link.icon}
                <Typography>{link.title}</Typography>
              </Button>
            ))}
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
