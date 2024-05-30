import { useState } from "react";
import useFetchData from "./FetchData";
import Fighter from "./Fighter";

function PokeFight() {
  const { pokemons, isLoading } = useFetchData();
  const pokeAmount = pokemons.length;
  console.log(pokeAmount);
  //   const [num, setNum] = useState(0);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>PokeFight</div>
      <div className="fightercontainer">
        <Fighter availablePokemons={pokeAmount} />
        <Fighter />
      </div>
    </>
  );
}

export default PokeFight;
