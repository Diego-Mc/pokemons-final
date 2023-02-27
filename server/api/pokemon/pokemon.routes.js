import express from 'express'
import { pokemonController } from './pokemon.controller.js'

const { getPokemons, getPokemonById } = pokemonController

const router = express.Router()

router.get('/', getPokemons)
router.get('/:id', getPokemonById)

export default router
