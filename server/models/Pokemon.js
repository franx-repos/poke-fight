import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  xp: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
