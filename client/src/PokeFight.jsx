import { useState } from "react";
import useFetchData from "./FetchData";
import Fighter from "./Fighter";

function PokeFight() {
  const { pokemons, isLoading } = useFetchData();
  const pokeAmount = pokemons.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="arena">
        <Fighter />
        <Fighter />
      </div>
    </>
  );
}

export default PokeFight;
