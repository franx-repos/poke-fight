import { useState, useEffect } from "react";
import axios from "axios";

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
export default useGetPokemonAndImage;
