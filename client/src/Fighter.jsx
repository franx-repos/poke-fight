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

function Fighter() {
  const [pokeId, setPokeId] = useState(Math.floor(Math.random() * 809) + 1);
  const { randomPokemon, pokemonImage, isLoading, error } =
    useGetPokemonAndImage(pokeId);
  const imgSource =
    pokemonImage.sprites?.other?.dream_world.front_default ||
    pokemonImage.sprites?.other?.home.front_default;
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
      <div key={randomPokemon.id} id={randomPokemon.id}>
        <h2>{randomPokemon.name.english}</h2>
        <img
          src={imgSource}
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemon.id}.svg`}
          alt={randomPokemon.name.english}
          width="100%"
        />
        <div>
          <p>Attack: {randomPokemon.base.Attack}</p>
          <p>S-Attack: {randomPokemon.base["Sp. Attack"]}</p>
          <p>Speed: {randomPokemon.base.Speed}</p>
        </div>
        <div>
          <p>Defense: {randomPokemon.base.Defense}</p>
          <p>S-Defense: {randomPokemon.base["Sp. Defense"]}</p>
          <p>XP: {pokemonImage.base_experience}</p>
        </div>
        <p>HP: {randomPokemon.base.HP}</p>
        <button onClick={handleNewPokemon}>Get New Pokemon</button>
      </div>
    </>
  );
}

export default Fighter;
