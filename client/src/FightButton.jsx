import { useState, useEffect } from "react";

function FightButton({ pokeId1, pokeId2, pokemons, setWinner }) {
  const [fightResult, setFightResult] = useState([]);
  const [isFighting, setIsFighting] = useState(false);

  const calculateDamage = (attack, defense, baseDamage = 10) => {
    return Math.floor(
      (attack * baseDamage) / defense + Math.floor(Math.random() * 5)
    );
  };

  const attack = (attacker, defender, attackType) => {
    const damage =
      attackType === "physical"
        ? calculateDamage(attacker.base.Attack, defender.base.Defense)
        : calculateDamage(
            attacker.base["Sp. Attack"],
            defender.base["Sp. Defense"]
          );

    defender.currentHP -= damage;
    return damage;
  };

  useEffect(() => {
    let interval;
    if (isFighting) {
      interval = setInterval(() => {
        const poke1 = pokemons.find((poke) => poke.id === pokeId1);
        const poke2 = pokemons.find((poke) => poke.id === pokeId2);

        if (!poke1 || !poke2) {
          console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
          clearInterval(interval);
          return;
        }

        // Determine attack order
        const [first, second] =
          poke1.base.Speed > poke2.base.Speed ? [poke1, poke2] : [poke2, poke1];

        // First attack
        const firstAttackType = Math.random() < 0.5 ? "physical" : "special";
        let damage = attack(first, second, firstAttackType);
        setFightResult((prevLog) => [
          ...prevLog,
          `${first.name.english} attacks ${second.name.english} with a ${firstAttackType} attack causing ${damage} damage. ${second.name.english} HP is now ${second.currentHP}`,
        ]);

        if (second.currentHP <= 0) {
          setFightResult((prevLog) => [
            ...prevLog,
            `${second.name.english} is defeated. ${first.name.english} wins!`,
          ]);
          setWinner(first.name.english);
          setIsFighting(false);
          clearInterval(interval);
          return;
        }

        // Second attack
        const secondAttackType = Math.random() < 0.5 ? "physical" : "special";
        damage = attack(second, first, secondAttackType);
        setFightResult((prevLog) => [
          ...prevLog,
          `${second.name.english} attacks ${first.name.english} with a ${secondAttackType} attack causing ${damage} damage. ${first.name.english} HP is now ${first.currentHP}`,
        ]);

        if (first.currentHP <= 0) {
          setFightResult((prevLog) => [
            ...prevLog,
            `${first.name.english} is defeated. ${second.name.english} wins!`,
          ]);
          setWinner(second.name.english);
          setIsFighting(false);
          clearInterval(interval);
          return;
        }
      }, 1000); // Interval of 500ms for each step in the fight
    }
    return () => clearInterval(interval);
  }, [isFighting, pokeId1, pokeId2, pokemons, setWinner]);

  const handleFight = () => {
    const poke1 = pokemons.find((poke) => poke.id === pokeId1);
    const poke2 = pokemons.find((poke) => poke.id === pokeId2);

    if (!poke1 || !poke2) {
      console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
      return;
    }

    // Initialize HP
    poke1.currentHP = poke1.base.HP;
    poke2.currentHP = poke2.base.HP;

    setFightResult([]);
    setIsFighting(true);
  };

  return (
    <div>
      <button onClick={handleFight} disabled={isFighting}>
        Kampf Starten
      </button>
      {fightResult.length > 0 && (
        <div>
          <h1 className="highlight">Kampfprotokoll:</h1>
          <ul>
            {fightResult.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FightButton;

// import { useState } from "react";

// function FightButton({ pokeId1, pokeId2, pokemons, setWinner }) {
//   const [fightResult, setFightResult] = useState(null);

//   const handleFight = () => {
//     const poke1 = pokemons.find((poke) => poke.id === pokeId1);
//     const poke2 = pokemons.find((poke) => poke.id === pokeId2);

//     if (!poke1 || !poke2) {
//       console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
//       return;
//     }

//     const poke1Strength =
//       poke1.base.Attack +
//       poke1.base.Defense +
//       poke1.base["Sp. Attack"] +
//       poke1.base["Sp. Defense"] +
//       poke1.base.Speed;

//     const poke2Strength =
//       poke2.base.Attack +
//       poke2.base.Defense +
//       poke2.base["Sp. Attack"] +
//       poke2.base["Sp. Defense"] +
//       poke2.base.Speed;

//     let winnerName;

//     if (poke1Strength > poke2Strength) {
//       winnerName = poke1.name.english;
//     } else if (poke1Strength < poke2Strength) {
//       winnerName = poke2.name.english;
//     } else {
//       winnerName = "Unentschieden";
//     }

//     setWinner(winnerName);
//     setFightResult(`Der Gewinner ist: ${winnerName}`);
//   };

//   return (
//     <div>
//       <button onClick={handleFight}>Kampf Starten</button>
//       {fightResult && (
//         <div>
//           <h1 className="highlight">{fightResult}</h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FightButton;
