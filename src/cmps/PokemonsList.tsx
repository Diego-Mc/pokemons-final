import Link from 'next/link'
import React from 'react'
import { PokemonState } from 'types'
import { PokemonPreview } from './PokemonPreview'
import styles from '@/styles/PokemonList.module.css'

interface PokemonsListProps {
  pokemons: PokemonState[]
}

export const PokemonsList: React.FC<PokemonsListProps> = ({ pokemons }) => {
  return (
    <section className={styles.pokemonList}>
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon._id}
          href="/pokemon/[pokemonId]"
          style={{ textDecoration: 'none' }}
          as={`/pokemon/${pokemon._id}`}>
          <PokemonPreview pokemon={pokemon} />
        </Link>
      ))}
    </section>
  )
}
export default PokemonsList
