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

export const pokemonController = {
  getPokemons,
  getPokemonById,
}
