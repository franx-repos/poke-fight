import express from 'express';
import Pokemon from '../models/Pokemon.js';

const router = express.Router();

// Endpunkt zum Abrufen oder Aktualisieren eines Pokémon in der MongoDB
router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { xp, wins, losses } = req.body;

    // Überprüfen, ob ein Pokémon mit der angegebenen ID vorhanden ist
    let pokemon = await Pokemon.findOne({ id });

    if (!pokemon) {
      // Wenn kein Pokémon mit der angegebenen ID gefunden wurde, erstelle ein neues
      pokemon = new Pokemon({
        id,
        xp,
        wins,
        losses
      });

      // Speichern Sie das neue Pokémon in der Datenbank
      await pokemon.save();
      res.status(201).json(pokemon); // Rückgabe mit Statuscode 201 für "Created"
    } else {
      // Wenn ein Pokémon mit der angegebenen ID gefunden wurde, aktualisieren Sie seine Daten
      pokemon.xp = xp;
      pokemon.wins = wins;
      pokemon.losses = losses;

      // Speichern Sie die aktualisierten Daten in der Datenbank
      await pokemon.save();
      res.json(pokemon); // Rückgabe mit Statuscode 200 für "OK"
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
