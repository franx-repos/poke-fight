import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { 
    english: { type: String, required: true },
    japanese: String,
    chinese: String,
    french: String
  },
  base: {
    HP: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    'Sp. Attack': { type: Number, required: true },
    'Sp. Defense': { type: Number, required: true },
    Speed: { type: Number, required: true }
  },
  xp: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
export default Pokemon;
