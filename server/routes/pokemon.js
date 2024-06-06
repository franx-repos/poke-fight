import express from 'express';
import Pokemon from '../models/Pokemon.js';
import pokemons from '../data.js';

const router = express.Router();

// Endpunkt zum Abrufen eines Pokémon
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const pokemonFromFile = pokemons.find(pokemon => pokemon.id === id);
    if (!pokemonFromFile) {
      return res.status(404).send({ error: "Pokémon not found" });
    }

    let pokemon = await Pokemon.findOne({ id: id });
    if (!pokemon) {
      // Neues Pokémon-Dokument erstellen
      pokemon = new Pokemon({
        id: id,
        xp: 0,
        wins: 0,
        losses: 0
      });

      await pokemon.save();
    }

    res.json({
      ...pokemonFromFile,
      xp: pokemon.xp,
      wins: pokemon.wins,
      losses: pokemon.losses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpunkt zum Aktualisieren eines Pokémon
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { xp, wins, losses } = req.body;
    const updateFields = {};
    if (xp !== undefined) updateFields.xp = xp;
    if (wins !== undefined) updateFields.wins = wins;
    if (losses !== undefined) updateFields.losses = losses;

    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: id },
      { $inc: updateFields },
      { new: true }
    );
    res.json(updatedPokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
