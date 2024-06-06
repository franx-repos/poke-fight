const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  xp: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
