import { useState, useEffect } from "react";
import axios from "axios";

function useGetPokemon(pokeId) {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/pokemons/${pokeId}`
        );
        setRandomPokemon(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { randomPokemon, isLoading };
}

export default useGetPokemon;
