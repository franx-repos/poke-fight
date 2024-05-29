import { useState, useEffect } from "react";
import axios from "axios";

function useGetPokemon(pokeId) {
  const [randomPokemon, setRandomPokemon] = useState(null);
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
  }, [pokeId]);

  return { randomPokemon, isLoading, error };
}

function Fighter({ onPokemonChange }) {
  const [pokeId, setPokeId] = useState(Math.floor(Math.random() * 809) + 1);
  const { randomPokemon, isLoading, error } = useGetPokemon(pokeId);

  useEffect(() => {
    if (randomPokemon) {
      onPokemonChange(randomPokemon.id); // Hier wird die ID an die übergeordnete Komponente übergeben
    }
  }, [randomPokemon, onPokemonChange]);

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
    <>
      <h2>{randomPokemon.name.english}</h2>
      <div key={randomPokemon.id} id={randomPokemon.id}>
        <p>Attack: {randomPokemon.base.Attack}</p>
        <p>S-Attack: {randomPokemon.base["Sp. Attack"]}</p>
        <p>Speed: {randomPokemon.base.Speed}</p>
      </div>
      <div>
        <p>Defense: {randomPokemon.base.Defense}</p>
        <p>S-Defense: {randomPokemon.base["Sp. Defense"]}</p>
        <p>XP: {/* Insert XP value here if available */}</p>
      </div>
      <p>HP: {randomPokemon.base.HP}</p>
      <button onClick={handleNewPokemon}>Get New Pokemon</button>
    </>
  );
}

export default Fighter;