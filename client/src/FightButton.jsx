import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function FightButton({
  poke1,
  poke2,
  currentHp1,
  currentHp2,
  setCurrentHp1,
  setCurrentHp2,
  setWinner,
  setStatus,
}) {
  const [fightResult, setFightResult] = useState([]);
  const [isFighting, setIsFighting] = useState(false);
  const [turn, setTurn] = useState(0);

  const calculateDamage = (attack, defense, baseDamage = 10) => {
    return Math.floor(
      (attack * baseDamage) / defense + Math.floor(Math.random() * 5)
    );
  };

  const attack = (attacker, defender, attackType, currentHp, setCurrentHp) => {
    const damage =
      attackType === "physical"
        ? calculateDamage(attacker.base.Attack, defender.base.Defense)
        : calculateDamage(
            attacker.base["Sp. Attack"],
            defender.base["Sp. Defense"]
          );
    const newHp = currentHp - damage;
    setCurrentHp(newHp);
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

        const [
          first,
          second,
          setFirstHp,
          setSecondHp,
          currentFirstHp,
          currentSecondHp,
        ] =
          poke1.base.Speed > poke2.base.Speed
            ? [
                poke1,
                poke2,
                setCurrentHp1,
                setCurrentHp2,
                currentHp1,
                currentHp2,
              ]
            : [
                poke2,
                poke1,
                setCurrentHp2,
                setCurrentHp1,
                currentHp2,
                currentHp1,
              ];

        const attacker = turn % 2 === 0 ? first : second;
        const defender = turn % 2 === 0 ? second : first;
        const currentAttackerHp =
          turn % 2 === 0 ? currentFirstHp : currentSecondHp;
        const setDefenderHp = turn % 2 === 0 ? setSecondHp : setFirstHp;
        const currentDefenderHp =
          turn % 2 === 0 ? currentSecondHp : currentFirstHp;

        const attackType = Math.random() < 0.5 ? "physical" : "special";
        const damage = attack(
          attacker,
          defender,
          attackType,
          currentDefenderHp,
          setDefenderHp
        );

        setStatus(attacker.name.english, defender.name.english);
        setFightResult((prevLog) => [
          ...prevLog,
          `attacker: ${attacker.name.english}
          attack type: ${attackType} 
          attack damage: ${damage}`,
        ]);

        if (currentDefenderHp - damage <= 0) {
          setFightResult((prevLog) => [
            ...prevLog,
            `${defender.name.english} is defeated. ${attacker.name.english} wins!`,
          ]);
          setWinner(attacker.name.english);
          setIsFighting(false);
          clearInterval(interval);
          return;
        }

        setTurn((prevTurn) => prevTurn + 1);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [
    isFighting,
    poke1,
    poke2,
    turn,
    currentHp1,
    currentHp2,
    setWinner,
    setStatus,
    setCurrentHp1,
    setCurrentHp2,
  ]);

  const handleFight = () => {
    if (!poke1 || !poke2) {
      console.error("Fehler: Pokémon-Daten sind nicht verfügbar.");
      return;
    }

    setFightResult([]);
    setIsFighting(true);
    setTurn(0);

    setCurrentHp1(poke1.base.HP);
    setCurrentHp2(poke2.base.HP);
  };
  console.log(isFighting);

  return (
    <>
      {isFighting ? (
        <Box
          className="highlight"
          component="section"
          sx={{ p: 5, marginTop: 6 }}
          minWidth="25%"
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
        </Box>
      ) : (
        <Box sx={{mt: "18%"}}>
          <img src="src\assets\Street_Fighter_VS_logo.png" alt="VS icon" />
          <button onClick={handleFight} disabled={isFighting}>
            Fight
          </button>
        </Box>
      )}
    </>
  );
}

export default FightButton;
