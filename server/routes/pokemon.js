const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pokemon = require('../models/Pokemon');

// Abrufen eines Pokémon
router.get('/:id', async (req, res) => {
  try {
    let pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
     
      const response = await axios.get(`../data.js/${req.params.id}`);
      const apiData = response.data;

      // Neue Pokémon Daten 
      pokemon = new Pokemon({
        id: apiData.id,
        xp: 0,
        wins: 0,
        losses: 0
      });

      await pokemon.save();
    }
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//neue Werte ERfahrung des Pokemons
router.put('/:id', async (req, res) => {
  try {
    const { xp, wins, losses } = req.body;
    const updateFields = {};
    if (xp !== undefined) updateFields.xp = xp;
    if (wins !== undefined) updateFields.wins = wins;
    if (losses !== undefined) updateFields.losses = losses;

    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      { $inc: updateFields },
      { new: true }
    );
    res.json(updatedPokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
