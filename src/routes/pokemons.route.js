import express from 'express';
const pokemonsRouter = express.Router(); 
import mesFonctions from '../controllers/pokemons.controller.js'

pokemonsRouter.get('/liste', mesFonctions.afficherPokemonListeType);
pokemonsRouter.get('/:id', mesFonctions.afficherPokemon);
pokemonsRouter.post('/', mesFonctions.ajouterPokemon);

export default pokemonsRouter;
