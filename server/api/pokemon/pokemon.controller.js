import { pokemonService } from './pokemon.service.js'

async function getPokemons(req, res) {
  try {
    const pokemons = await pokemonService.query()
    res.json(pokemons)
  } catch (err) {
    console.error('Failed to get pokemons', err)
    res.status(500).send({ err: 'Failed to get pokemons' })
  }
}

async function getPokemonById(req, res) {
  try {
    const pokemonId = req.params.id
    const pokemon = await pokemonService.getById(pokemonId)
    res.json(pokemon)
  } catch (err) {
    console.error('Failed to get pokemon', err)
    res.status(500).send({ err: 'Failed to get pokemon' })
  }
}

async function addPokemon(req, res) {
  try {
    const pokemon = req.body
    const addedPokemon = await pokemonService.add(pokemon)
    res.json(addedPokemon)
  } catch (err) {
    logger.error('Failed to add pokemon', pokemon)
    res.status(500).send({ err: 'Failed to add pokemon' })
  }
}

export const pokemonController = {
  getPokemons,
  getPokemonById,
  addPokemon,
}
