import React, { useState, useEffect } from "react";
// import useFetchData from "./FetchData";
import Fighter from "./Fighter";
import FightButton from "./FightButton";
import useGetPokemonAndImage from "./GetNewPokemon";

function PokeFight() {
  // const { pokemons, isLoading } = useFetchData();
  const [fighter1Id, setFighter1Id] = useState(
    Math.floor(Math.random() * 809) + 1
  );
  const [fighter2Id, setFighter2Id] = useState(
    Math.floor(Math.random() * 809) + 1
  );
  const [winner, setWinner] = useState(null);

  const {
    randomPokemon: fighter1,
    pokemonImage: fighter1Image,
    isLoading: isLoading1,
    error: error1,
  } = useGetPokemonAndImage(fighter1Id);

  const {
    randomPokemon: fighter2,
    pokemonImage: fighter2Image,
    isLoading: isLoading2,
    error: error2,
  } = useGetPokemonAndImage(fighter2Id);

  const handleNewPokemon1 = (e) => {
    e.preventDefault();
    setFighter1Id(Math.floor(Math.random() * 809) + 1);
  };

  const handleNewPokemon2 = (e) => {
    e.preventDefault();
    setFighter2Id(Math.floor(Math.random() * 809) + 1);
  };

  useEffect(() => {}, [fighter1Id]);

  // useEffect(() => {
  //   if (!isLoading && pokemons.length > 1) {
  //     const randomIndex1 = Math.floor(Math.random() * pokemons.length);
  //     let randomIndex2;
  //     do {
  //       randomIndex2 = Math.floor(Math.random() * pokemons.length);
  //     } while (randomIndex1 === randomIndex2);

  //     setFighter1Id(pokemons[randomIndex1].id);
  //     setFighter2Id(pokemons[randomIndex2].id);
  //   }
  // }, [pokemons, isLoading]);

  if (error1 || error2) {
    return <div>Error: {error1 || error2}</div>;
  }
  if (!fighter1 || !fighter2) {
    return <div>No Pokémon data available</div>;
  }

  return (
    <>
      {isLoading1 || isLoading2 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="fightercontainer">
            <Fighter
              id={fighter1.id}
              name={fighter1.name.english}
              img={fighter1Image}
              attack={fighter1.base.Attack}
              spAttack={fighter1.base["Sp. Attack"]}
              speed={fighter1.base.Speed}
              defense={fighter1.base.Defense}
              spDefense={fighter1.base["Sp. Defense"]}
              experience={fighter1Image.base_experience}
              hp={fighter1.base.HP}
              isLoading={isLoading1}
              setNewPlayer={handleNewPokemon1}
            />
            <FightButton
              poke1={fighter1}
              poke2={fighter2}
              // pokemons={pokemons}
              setWinner={setWinner}
            />
            <Fighter
              id={fighter2.id}
              name={fighter2.name.english}
              img={fighter2Image}
              attack={fighter2.base.Attack}
              spAttack={fighter2.base["Sp. Attack"]}
              speed={fighter2.base.Speed}
              defense={fighter2.base.Defense}
              spDefense={fighter2.base["Sp. Defense"]}
              experience={fighter2Image.base_experience}
              hp={fighter2.base.HP}
              isLoading={isLoading2}
              setNewPlayer={handleNewPokemon2}
            />
          </div>
        </>
      )}
    </>
  );
}

export default PokeFight;
