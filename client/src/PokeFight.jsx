import React, { useState, useEffect } from "react";
import useFetchData from "./FetchData";
import Fighter from "./Fighter";
import FightButton from "./FightButton";

function PokeFight() {
  const { pokemons, isLoading } = useFetchData();
  const [fighter1Id, setFighter1Id] = useState(null);
  const [fighter2Id, setFighter2Id] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isLoading && pokemons.length > 1) {
      const randomIndex1 = Math.floor(Math.random() * pokemons.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * pokemons.length);
      } while (randomIndex1 === randomIndex2);

      setFighter1Id(pokemons[randomIndex1].id);
      setFighter2Id(pokemons[randomIndex2].id);
    }
  }, [pokemons, isLoading]);

  return (
    <>
      <div>PokeFight</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <div className="fightercontainer">
            <Fighter pokeId={fighter1Id} onPokemonChange={setFighter1Id} />
            <FightButton
              pokeId1={fighter1Id}
              pokeId2={fighter2Id}
              pokemons={pokemons}
              setWinner={setWinner}
            />
            <Fighter pokeId={fighter2Id} onPokemonChange={setFighter2Id} />
          </div>
        </>
      )}
    </>
  );
}

export default PokeFight;
