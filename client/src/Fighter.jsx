import { useState, useEffect } from "react";

import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

function Fighter({
  id,
  name,
  img,
  attack,
  spAttack,
  speed,
  defense,
  spDefense,
  experience,
  hp,
  setNewPlayer,
  status,
}) {
  const imgSource =
    img?.sprites?.other?.dream_world.front_default ||
    img?.sprites?.other?.home.front_default;

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress <= 0) {
  //         return 100;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress - diff, 100);
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <Card
      key={id}
      id={id}
      sx={{
        minWidth: "40%",
        minHeight: "70%",
        margin: "3rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
      }}
    >
      <Typography
        className="headline"
        gutterBottom
        variant="h4"
        component="div"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8) ",
        }}
        padding="1rem"
        fontFamily="'Pokemon Solid', sans-serif"
        letterSpacing=".2rem"
        color="#FFCD09"
      >
        {name}
      </Typography>
      <CardMedia
        component="img"
        alt={name}
        image={imgSource}
        sx={{
          height: 300,
          width: "100%",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
        className={
          status === "attacker"
            ? "attacker-class"
            : status === "defender"
            ? "defender-class"
            : ""
        }
      />

      <CardContent
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8) ",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              Attack: {attack}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              S-Attack: {spAttack}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              Speed: {speed}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              Defense: {defense}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              S-Defense: {spDefense}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              XP: {experience}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
          paddingTop="1rem"
        >
          HP: {hp}
        </Typography>
        <BorderLinearProgress variant="determinate" value={hp} />
      </CardContent>
      <Button
        size="large"
        sx={{ color: "white" }}
        padding="1rem"
        onClick={setNewPlayer}
      >
        Get New Pokemon
      </Button>
    </Card>
  );
}

export default Fighter;
