import getCollection from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const SAMPLE_USER_CACHE_ID = '63fbbec2cc900c8914c8eab4'

async function getCache() {
  try {
    const collection = await getCollection('cache')
    const { cache } = await collection.findOne({
      _id: new ObjectId(SAMPLE_USER_CACHE_ID),
    })

    return cache || []
  } catch (err) {
    console.log('cannot get cache', err)
    throw err
  }
}

async function updateCache(pokemons) {
  try {
    const collection = await getCollection('cache')
    await collection.updateOne(
      { _id: new ObjectId(SAMPLE_USER_CACHE_ID) },
      { $push: { cache: { $each: pokemons.map(({ _id }) => _id) } } }
    )
  } catch (err) {
    console.log(`while updating cache`, err)
    throw err
  }
}

export const cacheService = {
  getCache,
  updateCache,
}
