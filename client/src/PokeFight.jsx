import React, { useState, useEffect } from "react";
import useGetPokemonAndImage from "./GetNewPokemon";
import Fighter from "./Fighter";
import FightButton from "./FightButton";

function PokeFight() {
  // const { pokemons, isLoading } = useFetchData();
  const [fighter1, setFighter1] = useState({});
  const [fighter2, setFighter2] = useState({});
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setFighter1(useGetPokemonAndImage(Math.floor(Math.random() * 809) + 1));
  }, [fighter1, fighter2, isLoading]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="arena fightercontainer">
            <Fighter pokeId={fighter1} onPokemonChange={setFighter1} />
            <FightButton
              pokeId1={fighter1}
              pokeId2={fighter2}
              // pokemons={pokemons}
              setWinner={setWinner}
            />
            <Fighter pokeId={fighter2} onPokemonChange={setFighter2} />
          </div>
        </>
      )}
    </>
  );
}

export default PokeFight;
