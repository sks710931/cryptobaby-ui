import { Grid, IconButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import logo from "../assets/logo.jpg";
import icons from "../assets/icons.gif";
import { Salecard } from "../components/Salecard";
import { Box } from "@mui/system";
import twitter from "../assets/twitter.png"
import opensea from "../assets/opensea.png"
import discord from "../assets/discord.png"
import telegram from "../assets/telegram.png"

export const Home = () => {
  const classes = UseStyle();
  return (
    <div className={classes.main}>
      <div
        style={{ width: "100%", height: "100%", backdropFilter: "blur(16px)" }}
      >
        <Grid container spacing={2}>
          <Grid item className="top" xs={12}>
            <div className={classes.center}>
              <img src={logo} alt="logo" className={classes.logo} />
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.center}>
              <img src={icons} alt="logo" className={classes.icons} />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Salecard />
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.center}>
              <img src={icons} alt="logo" className={classes.iconsInvert} />
            </div>
          </Grid>
          
          <Grid item xs={12} md={3} lg={4}></Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={()=> window.open("https://opensea.io/collection/cbaby", "_blank")}>
                <img  src={opensea} alt="opensea" />
              </IconButton>
              <IconButton onClick={()=> window.open("https://twitter.com/cryptobabyverse", "_blank")}>
                <img src={twitter} alt="opensea" />
              </IconButton>
              <IconButton onClick={()=> window.open("https://discord.gg/9gKzx9wvFe", "_blank")}>
                <img src={discord} alt="opensea" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>
      </div>
    </div>
  );
};

const UseStyle = makeStyles((theme: Theme) => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    background:
      "radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    marginTop: 16,
  },
  center: {
    width: "100%",
    textAlign: "center",
  },
  logo: {
    width: "230px",
    height: "230px",
    borderRadius: "50%",
    marginTop: "48px",
    marginBottom: "40px",
    boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 15px;",
    border: "1px solid #ffffff60",
  },
  icons: {
    maxWidth: "210px",
    height: "auto",
    borderRadius: "50%",
    marginTop: "25px",
    border: "1px solid #ffffff20",
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 15px;",
  },
  iconsInvert: {
    maxWidth: "230px",
    height: "auto",
    borderRadius: "50%",
    marginTop: "24px",
    border: "1px solid #ffffff20",
    transform: "scaleX(-1)",
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 15px;",
  },
  footer: {
    maxWidth: "840px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "16px",
  },
}));
