import { useState, useEffect } from "react";
import useGetPokemonAndImage from "./GetNewPokemon";
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

function Fighter({ onPokemonChange }) {
  const [pokeId, setPokeId] = useState(Math.floor(Math.random() * 809) + 1);
  const { randomPokemon, pokemonImage, isLoading, error } =
    useGetPokemonAndImage(pokeId);

  useEffect(() => {
    if (randomPokemon) {
      onPokemonChange(randomPokemon.id); // Hier wird die ID an die übergeordnete Komponente übergeben
    }
  }, [randomPokemon, onPokemonChange]);

  const imgSource =
    pokemonImage?.sprites?.other?.dream_world.front_default ||
    pokemonImage?.sprites?.other?.home.front_default;
  const handleNewPokemon = () => {
    setPokeId(Math.floor(Math.random() * 809) + 1);
  };

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress <= 0) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress - diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!randomPokemon) {
    return <div>No Pokémon data available</div>;
  }

  return (
    <Card
      key={randomPokemon.id}
      id={randomPokemon.id}
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
        {randomPokemon.name.english}
      </Typography>
      <CardMedia
        component="img"
        alt={randomPokemon.name.english}
        image={imgSource}
        sx={{
          height: 300,
          width: "100%",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
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
              Attack: {randomPokemon.base.Attack}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              S-Attack: {randomPokemon.base["Sp. Attack"]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              Speed: {randomPokemon.base.Speed}
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
              Defense: {randomPokemon.base.Defense}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              S-Defense: {randomPokemon.base["Sp. Defense"]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
              textAlign="left"
              paddingLeft="1rem"
            >
              XP: {pokemonImage.base_experience}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
          paddingTop="1rem"
        >
          HP: {randomPokemon.base.HP}
        </Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
      </CardContent>
      <Button
        size="large"
        sx={{ color: "white" }}
        padding="1rem"
        onClick={handleNewPokemon}
      >
        Get New Pokemon
      </Button>
    </Card>
  );
}

export default Fighter;
