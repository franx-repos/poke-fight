import { Router } from 'express';
import { getPokemonByName, updateOrCreatePokemon, getPokemonByWins, getPokemonByLosses, getAllPokemon } from '../controller/pokemon.js';

const pokemonRouter = Router();

pokemonRouter.route('/')
  .get(getAllPokemon);

pokemonRouter.route('/wins')
  .get(getPokemonByWins);

pokemonRouter.route('/losses')
  .get(getPokemonByLosses);

pokemonRouter.route('/name/:name')
  .put(updateOrCreatePokemon);

export default pokemonRouter;