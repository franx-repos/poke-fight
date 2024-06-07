import express from 'express';
import Pokemon from '../models/Pokemon.js';

const router = express.Router();

// Endpunkt zum Abrufen eines Pokémon aus der MongoDB
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpunkt zum Aktualisieren eines Pokémon in der MongoDB
router.put('/:id', async (req, res) => {
  try {
    const { xp, wins, losses } = req.body;
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      { xp, wins, losses },
      { new: true }
    );
    res.json(updatedPokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
