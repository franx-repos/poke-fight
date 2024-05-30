import React, { useState } from "react";

function FightButton({ pokeId1, pokeId2, pokemons, setWinner }) {
  const [fightResult, setFightResult] = useState(null);

  const handleFight = () => {
    const poke1 = pokemons.find((poke) => poke.id === pokeId1);
    const poke2 = pokemons.find((poke) => poke.id === pokeId2);

    if (!poke1 ||!poke2) {
      console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
      return;
    }

    const poke1Strength =
      poke1.base.Attack +
      poke1.base.Defense +
      poke1.base["Sp. Attack"] +
      poke1.base["Sp. Defense"] +
      poke1.base.Speed;

    const poke2Strength =
      poke2.base.Attack +
      poke2.base.Defense +
      poke2.base["Sp. Attack"] +
      poke2.base["Sp. Defense"] +
      poke2.base.Speed;

    let winnerName;

    if (poke1Strength > poke2Strength) {
      winnerName = poke1.name.english;
    } else if (poke1Strength < poke2Strength) {
      winnerName = poke2.name.english;
    } else {
      winnerName = "Unentschieden";
    }

    setWinner(winnerName);
    setFightResult(`Der Gewinner ist: ${winnerName}`);
  };

  return (
    <div>
      <button onClick={handleFight}>Kampf Starten</button>
      {fightResult && <div>{fightResult}</div>}
    </div>
  );
}

export default FightButton;