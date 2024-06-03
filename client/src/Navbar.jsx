import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar sx={{ backgroundColor: "rgba(0, 0, 0, 1)" }}>
      <Toolbar>
        <Typography
          className="headline"
          variant="h4"
          component="div"
          padding="1rem"
          fontFamily="'Pokemon Solid', sans-serif"
          letterSpacing=".2rem"
          color="#FFCD09"
          sx={{
            flexGrow: 1,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            mt: -2,
          }}
        >
          PokeFight
        </Typography>
        <Box sx={{ display: "flex" }}>
          <img src="./assets/Arena.png" alt="" />
          <Button
            component={NavLink}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              position: "relativ",
              right: "90%",
            }}
            exact
          >
            Arena
          </Button>
          <Button
            component={NavLink}
            to="/leaderboard"
            sx={{
              color: "white",
              textDecoration: "none",
              position: "relative",
              right: "25%",
            }}
          >
            Leaderboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
