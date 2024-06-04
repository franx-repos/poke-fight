import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function FightButton({ poke1, poke2, setWinner }) {
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
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isFighting, poke1, poke2, setWinner]);

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
