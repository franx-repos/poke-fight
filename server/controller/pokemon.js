import Pokemon from '../models/Pokemon.js';


export const getPokemonByName = async (req, res) => {
  try {
    const name = req.params.name;
    const pokemon = await Pokemon.findOne({ name });
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrCreatePokemon = async (req, res) => {
  try {
    const name = req.params.name;
    const { xp, wins, losses } = req.body;
    let pokemon = await Pokemon.findOne({ name });

    if (pokemon) {
      pokemon.xp = xp || pokemon.xp;
      pokemon.wins = wins || pokemon.wins;
      pokemon.losses = losses || pokemon.losses;
    } else {
      pokemon = new Pokemon({ name, xp: xp || 0, wins: wins || 0, losses: losses || 0 });
    }

    const updatedPokemon = await pokemon.save();
    res.json(updatedPokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPokemonByWins = async (req, res) => {
  try {
    const pokemon = await Pokemon.find().sort({ wins: -1 });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPokemonByLosses = async (req, res) => {
  try {
    const pokemon = await Pokemon.find().sort({ losses: -1 });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};