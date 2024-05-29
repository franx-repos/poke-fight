import { useEffect } from "react";
import useGetPokemon from "./GetFighter";
// import PropTypes from "prop-types";

function Fighter({ availablePokemons }) {
  const pokeId = Math.floor(Math.random() * 809) + 1;
  const { randomPokemon, isLoading, error } = useGetPokemon(pokeId);

  useEffect(() => {
    if (randomPokemon) {
      console.log(randomPokemon);
    }
  }, [randomPokemon]);

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
    </>
  );
}

// Fighter.propTypes = {
//   availablePokemons: PropTypes.number.isRequired,
// };

export default Fighter;
