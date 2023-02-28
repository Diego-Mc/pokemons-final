import getCollection from '../../services/db.service.js'
import { ObjectId } from 'mongodb'
import { cacheService } from '../cache/cache.service.js'

async function query() {
  try {
    const collection = await getCollection('pokemon')
    const cache = await cacheService.getCache()
    var pokemons = await collection
      .aggregate([
        { $match: { _id: { $nin: cache } } },
        { $sample: { size: 5 } },
        { $sort: { 'name.english': 1 } },
      ])
      .toArray()
    pokemons = pokemons.map(_transformPokemon)
    await cacheService.updateCache(pokemons)
    return pokemons
  } catch (err) {
    console.log('cannot find pokemons', err)
    throw err
  }
}

async function getById(pokemonId) {
  try {
    const collection = await getCollection('pokemon')
    const pokemon = await collection.findOne({ _id: new ObjectId(pokemonId) })
    return _transformPokemon(pokemon)
  } catch (err) {
    console.log(`while finding pokemon ${pokemonId}`, err)
    throw err
  }
}

async function add(pokemon) {
  try {
    const collection = await getCollection('pokemon')
    await collection.insertOne(pokemon)
    return pokemon
  } catch (err) {
    logger.error('cannot insert pokemon', err)
    throw err
  }
}

//prettier-ignore
const _transformPokemon = (pokemon) => ({
  _id: pokemon._id,
  imgUrl: pokemon.imgUrl || `https://github.com/fanzeyi/pokemon.json/blob/master/images/${pokemon.id.toString().padStart(3, 0)}.png?raw=true`,
  name: pokemon.name.english,
  type: pokemon.type[0],
  base: pokemon.base,
})

export const pokemonService = {
  query,
  getById,
  add,
}
