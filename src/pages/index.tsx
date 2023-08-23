import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { parseShopifyResponse, shopifyClient } from "../../lib/shopify";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  ListItemIcon,
  Modal,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "styled-jsx/style";
import Image from "next/image";

import Banner from "../assets/banner.jpg";
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = 240;

const navItems = [
  {
    name: "Search",
    icon: <SearchIcon htmlColor="#fff" />,
  },
  {
    name: "Cart",
    icon: <ShoppingBagIcon htmlColor="#fff" />,
  },
  {
    name: "Account",
    icon: <PermIdentityIcon htmlColor="#fff" />,
  },
  {
    name: "Wishlist",
    icon: <FavoriteIcon htmlColor="#fff" />,
  },
];

export default function DrawerAppBar(props) {
  const { products } = props;
  console.log(products);

  const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchBar, setSearchBar] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const isDesktop = useMediaQuery("(min-width:960px)");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <nav>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              LOGO
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Tooltip
                  title={item.name}
                  key={item.name}
                  onClick={() => {
                    if (item.name === "Search") {
                      setSearchBar(true);
                    } else if (item.name === "Cart") {
                      router.push("/cart");
                    }
                  }}
                >
                  <IconButton>{item.icon}</IconButton>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </nav>

      {/* main box container */}
      <Box
        component="main"
        sx={{
          p: isMobile ? 2 : isTablet ? 3 : isDesktop ? 0 : 0,
          mt: isMobile ? 4 : isTablet ? 5 : isDesktop ? 0 : 2,
        }}
      >
        {/* create a responsive banner image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: isDesktop ? 2 : 0,
          }}
        >
          <Image
            src={Banner}
            alt="banner"
            layout="responsive"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography variant={isMobile ? "h6" : "h5"} sx={{ ml: 8 }}>
          Featured Products
        </Typography>

        {/* create a resposive grid with 4*4 */}
        <Grid
          container
          spacing={4}
          rowGap={isMobile ? 0 : 1}
          sx={{
            mt: isMobile ? 0 : 2,
            p: isMobile ? 0 : 8,
            pt: 0,
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {products.map((product) => (
            <Grid key={product.handle} item xs={6} md={6} lg={3}>
              <Link
                href={`/products/${product.handle}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      transform: "scale(1.05)",
                      transition: "all 0.2s ease-in-out",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={300}
                    style={{ objectFit: "contain" }}
                    image={product.images[0]?.src}
                    alt={product.title}
                  />

                  <CardContent>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {product?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                      }}
                    >
                     From Rs. {product?.variants[0]?.price?.amount}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={searchBar} onClose={() => setSearchBar(false)}>
        <Box bgcolor={"#1976d2"} minHeight={"64px"}>
          <Grid container justifyContent={"center"}>
            <Grid xs={8} item md={4} borderColor={"#eee"} borderBottom={0}>
              <TextField
                label="Search"
                variant="filled"
                color="warning"
                fullWidth
                focused
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon htmlColor="#666" />
                    </IconButton>
                  ),
                  autoFocus: true,
                }}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#eee",
                  borderBottomColor: "#eee",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

export const getServerSideProps = async () => {
  // Fetch all the products
  const products = await shopifyClient.product.fetchAll();

  return {
    props: {
      products: parseShopifyResponse(products),
    },
  };
};
