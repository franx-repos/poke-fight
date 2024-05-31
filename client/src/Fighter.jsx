import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

function useGetPokemonAndImage(pokeId) {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [pokemonImage, setPokemonImage] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [pokemonResponse, imageResponse] = await Promise.all([
          axios.get(`http://localhost:8000/pokemons/${pokeId}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`),
        ]);
        setRandomPokemon(pokemonResponse.data);
        setPokemonImage(imageResponse.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pokeId]);

  return { randomPokemon, pokemonImage, isLoading, error };
}

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
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemon.id}.svg`}
        //   src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/823.gif"
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
