import express from 'express'
import { pokemonController } from './pokemon.controller.js'

const { getPokemons, getPokemonById, addPokemon } = pokemonController

const router = express.Router()

router.get('/', getPokemons)
router.get('/:id', getPokemonById)
router.post('/', addPokemon)

export default router
