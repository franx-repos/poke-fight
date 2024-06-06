import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function FightButton({ poke1, poke2, setWinner, setStatus }) {
  const [fightResult, setFightResult] = useState([]);
  const [isFighting, setIsFighting] = useState(false);
  const [turn, setTurn] = useState(0);

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
        if (!poke1 || !poke2) {
          console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
          clearInterval(interval);
          return;
        }

        // Determine attack order
        const [first, second] =
          poke1.base.Speed > poke2.base.Speed ? [poke1, poke2] : [poke2, poke1];

        // Determine current attacker and defender based on the turn
        const attacker = turn % 2 === 0 ? first : second;
        const defender = turn % 2 === 0 ? second : first;

        // Perform attack
        const attackType = Math.random() < 0.5 ? "physical" : "special";
        const damage = attack(attacker, defender, attackType);

        // Set status
        setStatus(attacker.name.english, defender.name.english);

        setFightResult((prevLog) => [
          ...prevLog,
          `${attacker.name.english} attacks ${defender.name.english} with a ${attackType} attack causing ${damage} damage. ${defender.name.english} HP is now ${defender.currentHP}`,
        ]);

        if (defender.currentHP <= 0) {
          setFightResult((prevLog) => [
            ...prevLog,
            `${defender.name.english} is defeated. ${attacker.name.english} wins!`,
          ]);
          setWinner(attacker.name.english);
          setIsFighting(false);
          clearInterval(interval);
          return;
        }

        // Update turn for the next attack
        setTurn((prevTurn) => prevTurn + 1);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isFighting, poke1, poke2, turn, setWinner, setStatus]);

  const handleFight = () => {
    if (!poke1 || !poke2) {
      console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
      return;
    }

    // Initialize HP
    poke1.currentHP = poke1.base.HP;
    poke2.currentHP = poke2.base.HP;

    setFightResult([]);
    setIsFighting(true);
    setTurn(0); // Reset turn
  };

  return (
    <Box
      className="highlight"
      component="section"
      sx={{ p: 5, marginTop: 6 }}
      minWidth="35%"
      height="36.5rem"
      overflow={"auto"}
    >
      {fightResult.length > 0 && (
        <Box component="section">
          <h2>Battle course:</h2>
          <List>
            {fightResult.map((entry, index) => (
              <ListItem key={index}>{entry}</ListItem>
            ))}
          </List>
        </Box>
      )}
      <button onClick={handleFight} disabled={isFighting}>
        Fight
      </button>
    </Box>
  );
}

export default FightButton;
