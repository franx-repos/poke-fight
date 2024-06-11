import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  xp: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

export default mongoose.model('Pokemon', pokemonSchema);
